"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

function CarModel() {
  const { scene } = useGLTF("/models/sr17.glb");
  const fixed = useRef(false);

  useEffect(() => {
    if (fixed.current) return;
    fixed.current = true;

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const mat = child.material as THREE.MeshStandardMaterial;
      if (!mat?.color) return;

      const r = mat.color.r,
        g = mat.color.g,
        b = mat.color.b;

      // Keep near-black materials (tires, chassis, frame, dark parts)
      if (r < 0.15 && g < 0.15 && b < 0.15) {
        mat.roughness = Math.max(mat.roughness, 0.4);
        mat.metalness = 0;
        mat.needsUpdate = true;
        return;
      }

      // Keep existing orange/gold accents from the model
      if (r > 0.5 && g > 0.2 && g < 0.6 && b < 0.2) {
        mat.color.set(0xD4700A);
        mat.roughness = 0.3;
        mat.metalness = 0.1;
        mat.needsUpdate = true;
        return;
      }

      // Mid-tone grays and other colors -> dark carbon fiber
      mat.color.set(0x1a1a1a);
      mat.roughness = 0.5;
      mat.metalness = 0.15;
      mat.needsUpdate = true;
    });
  }, [scene]);

  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [2.5, 1.5, 3], fov: 45 }}
      gl={{ alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, 2, -2]} intensity={0.3} />
      <Suspense fallback={null}>
        <CarModel />
      </Suspense>
      <OrbitControls
        autoRotate
        autoRotateSpeed={1.5}
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.2}
      />
    </Canvas>
  );
}
