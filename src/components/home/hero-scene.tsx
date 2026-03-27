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

      // Dark carbon fiber look — visible on white background
      child.material = new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        roughness: 0.5,
        metalness: 0.15,
      });
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
      <ambientLight intensity={0.4} />
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
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.2}
      />
    </Canvas>
  );
}
