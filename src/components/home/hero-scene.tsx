"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  ContactShadows,
  Float,
  useGLTF,
  MeshReflectorMaterial,
} from "@react-three/drei";

// Preload the model
useGLTF.preload("/models/sr17.glb");

function SR17Model() {
  const { scene } = useGLTF("/models/sr17.glb");

  return (
    <primitive
      object={scene}
      scale={0.8}
      position={[0, 0.1, 0]}
      rotation={[0, Math.PI / 4, 0]}
    />
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight
        position={[5, 8, 5]}
        angle={0.4}
        penumbra={0.8}
        intensity={1.5}
        castShadow
        color="#D4A843"
      />
      <spotLight
        position={[-5, 5, -3]}
        angle={0.5}
        penumbra={1}
        intensity={0.8}
        color="#4488ff"
      />
      <pointLight position={[0, 3, 0]} intensity={0.3} color="#ffffff" />

      <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.3}>
        <Suspense fallback={null}>
          <SR17Model />
        </Suspense>
      </Float>

      <ContactShadows
        position={[0, -0.1, 0]}
        opacity={0.6}
        scale={8}
        blur={2.5}
        far={3}
        color="#D4A843"
      />

      {/* Reflective ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[20, 20]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={0.5}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0a0a0a"
          metalness={0.5}
          mirror={0.5}
        />
      </mesh>

      <Environment preset="night" />

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.8}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [3.5, 2, 3.5], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
