"use client";

import { Suspense, useEffect, useRef, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

// Public reveal: Friday April 25, 2026 at 1:00 PM PT
const UNVEIL_DATE = new Date("2026-04-25T13:00:00-07:00");

function useCountdown(target: Date) {
  const calc = useCallback(() => {
    const now = Date.now();
    const diff = Math.max(0, target.getTime() - now);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    const done = diff === 0;
    return { days, hours, minutes, seconds, done };
  }, [target]);

  const [time, setTime] = useState<{ days: number; hours: number; minutes: number; seconds: number; done: boolean } | null>(null);

  useEffect(() => {
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);

  return time ?? { days: 0, hours: 0, minutes: 0, seconds: 0, done: false };
}

/* ── Confetti particle system ── */
interface ConfettiPiece {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  vr: number;
  color: string;
  size: number;
  opacity: number;
}

function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pieces = useRef<ConfettiPiece[]>([]);
  const spawned = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    if (!spawned.current) {
      spawned.current = true;
      const colors = ["#C2850C", "#D4980F", "#FFD700", "#0055A2", "#FFFFFF", "#E8C547"];
      for (let i = 0; i < 200; i++) {
        pieces.current.push({
          x: Math.random() * window.innerWidth,
          y: -Math.random() * window.innerHeight,
          r: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 3 + 2,
          vr: (Math.random() - 0.5) * 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 8 + 4,
          opacity: 1,
        });
      }
    }

    let rafId = 0;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pieces.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.vr;
        p.vy += 0.04; // gravity
        if (p.y > canvas.height) p.opacity *= 0.98;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }
      pieces.current = pieces.current.filter((p) => p.opacity > 0.01);
      if (pieces.current.length > 0) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-30"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

function CarModel({ scrollProgress }: { scrollProgress: number }) {
  const { scene } = useGLTF("/models/sr17.glb");
  const fixed = useRef(false);
  const wheelPivots = useRef<THREE.Group[]>([]);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (fixed.current) return;
    fixed.current = true;

    const wheelMeshes: THREE.Mesh[] = [];

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const mat = child.material as THREE.MeshStandardMaterial;

      const name = child.name.toLowerCase();
      if (
        name.includes("wheel") ||
        name.includes("tire") ||
        name.includes("rim") ||
        name.includes("tyre")
      ) {
        wheelMeshes.push(child);
      }

      if (!mat?.color) return;

      const isWheel = name.includes("wheel") || name.includes("tire") || name.includes("rim") || name.includes("tyre");

      const r = mat.color.r,
        g = mat.color.g,
        b = mat.color.b;

      // Tires / rubber — matte black, distinct from body
      if (isWheel) {
        mat.color.set(0x111111);
        mat.roughness = 0.95;
        mat.metalness = 0;
        mat.needsUpdate = true;
        return;
      }

      // Already-dark parts — keep dark but add slight sheen for definition
      if (r < 0.15 && g < 0.15 && b < 0.15) {
        mat.color.set(0x222222);
        mat.roughness = 0.35;
        mat.metalness = 0.1;
        mat.needsUpdate = true;
        return;
      }

      // Former gold / orange accent parts — now all black
      if (r > 0.5 && g > 0.2 && g < 0.6 && b < 0.2) {
        mat.color.set(0x1a1a1a);
        mat.roughness = 0.3;
        mat.metalness = 0.3;
        mat.needsUpdate = true;
        return;
      }

      // Everything else — dark charcoal with slight metallic sheen
      mat.color.set(0x2a2a2a);
      mat.roughness = 0.4;
      mat.metalness = 0.2;
      mat.needsUpdate = true;
    });

    const pivots: THREE.Group[] = [];
    for (const mesh of wheelMeshes) {
      mesh.geometry.computeBoundingBox();
      const center = new THREE.Vector3();
      mesh.geometry.boundingBox!.getCenter(center);
      mesh.geometry.translate(-center.x, -center.y, -center.z);

      const pivot = new THREE.Group();
      pivot.position.copy(mesh.position).add(center);
      pivot.scale.copy(mesh.scale);

      mesh.parent!.add(pivot);
      mesh.position.set(0, 0, 0);
      mesh.scale.set(1, 1, 1);
      pivot.add(mesh);

      pivots.push(pivot);
    }
    wheelPivots.current = pivots;
  }, [scene]);

  const prevProgress = useRef(scrollProgress);
  useFrame(() => {
    const scrollDelta = scrollProgress - prevProgress.current;
    prevProgress.current = scrollProgress;

    // Spin wheels proportional to scroll
    if (Math.abs(scrollDelta) > 0.0001) {
      for (const pivot of wheelPivots.current) {
        pivot.rotation.z += scrollDelta * 80;
      }
    }

    if (!groupRef.current) return;

    // Phase 1 (0–0.4): Car enters from right to center
    // Phase 2 (0.4–0.7): Car rotates to face viewer
    // Phase 3 (0.7–1): Car stays, section scrolls away

    // X position: enter from right, settle at center
    const driveProgress = Math.min(scrollProgress / 0.4, 1);
    const eased = 1 - Math.pow(1 - driveProgress, 3);
    const targetX = 7 - eased * 7; // 7 → 0
    groupRef.current.position.x = targetX;

    // Y rotation: rotate to face viewer between 0.4 and 0.7
    const rotateStart = 0.4;
    const rotateEnd = 0.7;
    const rotateProgress = Math.max(0, Math.min(1, (scrollProgress - rotateStart) / (rotateEnd - rotateStart)));
    const rotateEased = 1 - Math.pow(1 - rotateProgress, 3);
    // Rotate from side view (default ~0) to facing viewer (~Math.PI/2.5 = ~72deg)
    groupRef.current.rotation.y = rotateEased * (Math.PI / 2.5);
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

export function CarShowcase() {
  // Outer wrapper ref for scroll tracking (tall element)
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = wrapper.getBoundingClientRect();
        const windowH = window.innerHeight;
        // scrollable distance = wrapper height - viewport height (the sticky travel)
        const scrollableDistance = rect.height - windowH;
        // How far we've scrolled into the wrapper
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const { days, hours, minutes, seconds, done } = useCountdown(UNVEIL_DATE);

  const countdownBlocks = [
    { value: hours, label: "Hours" },
    { value: minutes, label: "Min" },
    { value: seconds, label: "Sec" },
  ];

  // Car only visible once we've started scrolling into the pinned section
  const carVisible = scrollProgress > 0.02;

  return (
    <div ref={wrapperRef} className="relative bg-background" style={{ height: "300vh" }}>
      <section
        className="sticky top-0 w-full overflow-hidden bg-background"
        style={{ height: "100vh" }}
      >
        {/* Confetti when countdown is done */}
        {done && <ConfettiCanvas />}

        {/* Big countdown behind the car */}
        <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center">
          {!done && (
            <div className="flex items-center gap-2 lg:gap-4">
              {countdownBlocks.map((block, i) => (
                <div key={block.label} className="flex items-baseline">
                  <div className="flex flex-col items-center">
                    <span
                      className="font-body font-black tabular-nums text-foreground/[0.07]"
                      style={{
                        fontSize: "clamp(6rem, 14vw, 16rem)",
                        fontVariantNumeric: "tabular-nums",
                        lineHeight: 1,
                        fontFamily: "var(--font-body), system-ui, sans-serif",
                      }}
                      suppressHydrationWarning
                    >
                      {String(block.value).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/20" style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                      {block.label}
                    </span>
                  </div>
                  {i < countdownBlocks.length - 1 && (
                    <span
                      className="font-black text-foreground/[0.05]"
                      style={{ fontSize: "clamp(4rem, 10vw, 12rem)", lineHeight: 1, fontFamily: "var(--font-body), system-ui, sans-serif" }}
                    >
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {done && (
            <p
              className="font-display text-2xl uppercase tracking-[0.2em] text-gold/70 md:text-3xl"
            >
              Revealed Privately — Public Access Coming Soon
            </p>
          )}
        </div>

        {/* 3D Canvas — car drives in and rotates, blurred so no parts can be made out */}
        <div
          className="relative z-10 w-full"
          style={{
            height: "100vh",
            opacity: carVisible ? 1 : 0,
            filter: "blur(20px)",
            WebkitFilter: "blur(20px)",
          }}
        >
          <Canvas
            camera={{ position: [0, 0.8, 4], fov: 40 }}
            gl={{ alpha: true }}
            style={{ background: "transparent" }}
          >
            {/* Ambient — soft base fill */}
            <ambientLight intensity={1.2} />
            {/* Key light — top right */}
            <directionalLight position={[5, 6, 4]} intensity={2.5} />
            {/* Fill light — left side to define edges */}
            <directionalLight position={[-4, 3, 2]} intensity={1.2} />
            {/* Rim light — behind and above for edge separation */}
            <directionalLight position={[0, 4, -4]} intensity={1.5} />
            {/* Ground bounce — subtle uplight */}
            <directionalLight position={[0, -2, 3]} intensity={0.6} />
            {/* Side accent — catch the body panels */}
            <directionalLight position={[6, 1, -1]} intensity={0.8} />
            <Suspense fallback={null}>
              <CarModel scrollProgress={scrollProgress} />
            </Suspense>
          </Canvas>
        </div>
      </section>
    </div>
  );
}
