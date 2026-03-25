"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const dracoRef = useRef<DRACOLoader | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;

    // Persist renderer/draco across strict-mode remounts
    if (!rendererRef.current) {
      rendererRef.current = new THREE.WebGLRenderer({ canvas, antialias: true });
    }
    const renderer = rendererRef.current;
    renderer.setClearColor(0xfafaf8, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 3, 3);
    camera.lookAt(0, 0, 0);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(5, 10, 5);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-5, 5, -3);
    scene.add(fillLight);
    scene.add(new THREE.HemisphereLight(0xffffff, 0xdddddd, 0.4));

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize);

    if (!dracoRef.current) {
      dracoRef.current = new DRACOLoader();
      dracoRef.current.setDecoderPath("/draco/gltf/");
      dracoRef.current.preload();
    }

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoRef.current);

    let model: THREE.Group | null = null;
    loader.load(
      "/models/sr17.glb",
      (gltf) => {
        if (disposed) return;
        model = gltf.scene;

        // Override all-white materials with dark metallic
        const mat = new THREE.MeshStandardMaterial({
          color: 0x1a1a1a,
          metalness: 0.6,
          roughness: 0.35,
          side: THREE.DoubleSide,
        });
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).material = mat;
          }
        });

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        model.position.sub(center);
        scene.add(model);

        // Top-down elevated camera
        const maxDim = Math.max(size.x, size.z);
        const dist = maxDim * 1.8;
        camera.position.set(-dist * 0.2, dist * 0.85, dist * 0.35);
        camera.lookAt(0, 0, 0);
        resize();
      },
      undefined,
      (err) => {
        if (!disposed) console.error("GLB load error:", err);
      }
    );

    // Idle rotation
    const t0 = performance.now();
    let animId = 0;
    function animate() {
      if (disposed) return;
      animId = requestAnimationFrame(animate);
      if (model) {
        model.rotation.y = ((performance.now() - t0) / 1000) * ((Math.PI * 2) / 60);
      }
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      disposed = true;
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
