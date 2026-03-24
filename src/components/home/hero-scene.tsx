"use client";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  ContactShadows,
  Float,
  MeshReflectorMaterial,
} from "@react-three/drei";

/**
 * Geometric formula car placeholder.
 * Replace the <FormulaCarPlaceholder /> with:
 *   const { scene } = useGLTF("/models/car.glb");
 *   return <primitive object={scene} />;
 */
function FormulaCarPlaceholder() {
  const gold = "#D4A843";
  const body = "#1a1a1a";
  const darkMetal = "#2a2a2a";

  return (
    <group position={[0, 0.35, 0]} scale={0.8}>
      {/* Main body / monocoque */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[1.6, 0.25, 0.7]} />
        <meshStandardMaterial color={body} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Nose cone */}
      <mesh position={[1.2, 0.15, 0]} rotation={[0, 0, -Math.PI / 12]}>
        <boxGeometry args={[0.9, 0.15, 0.45]} />
        <meshStandardMaterial color={body} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Nose tip */}
      <mesh position={[1.75, 0.1, 0]}>
        <boxGeometry args={[0.3, 0.08, 0.2]} />
        <meshStandardMaterial color={gold} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Cockpit opening */}
      <mesh position={[-0.1, 0.35, 0]}>
        <boxGeometry args={[0.5, 0.15, 0.4]} />
        <meshStandardMaterial color={darkMetal} metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Roll hoop */}
      <mesh position={[-0.35, 0.45, 0]}>
        <boxGeometry args={[0.08, 0.25, 0.35]} />
        <meshStandardMaterial color={gold} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Engine cover / rear */}
      <mesh position={[-0.7, 0.2, 0]}>
        <boxGeometry args={[0.7, 0.2, 0.6]} />
        <meshStandardMaterial color={body} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Rear diffuser */}
      <mesh position={[-1.1, 0.08, 0]}>
        <boxGeometry args={[0.15, 0.12, 0.7]} />
        <meshStandardMaterial color={darkMetal} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Front wing */}
      <mesh position={[1.7, -0.02, 0]}>
        <boxGeometry args={[0.35, 0.03, 1.1]} />
        <meshStandardMaterial color={gold} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Front wing endplates */}
      {[-1, 1].map((side) => (
        <mesh key={`fwe-${side}`} position={[1.7, 0.02, side * 0.55]}>
          <boxGeometry args={[0.35, 0.1, 0.03]} />
          <meshStandardMaterial color={gold} metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Rear wing main plane */}
      <mesh position={[-1.2, 0.6, 0]}>
        <boxGeometry args={[0.25, 0.03, 0.9]} />
        <meshStandardMaterial color={gold} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Rear wing endplates */}
      {[-1, 1].map((side) => (
        <mesh key={`rwe-${side}`} position={[-1.2, 0.55, side * 0.45]}>
          <boxGeometry args={[0.3, 0.15, 0.03]} />
          <meshStandardMaterial color={body} metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* Side pods */}
      {[-1, 1].map((side) => (
        <mesh key={`sp-${side}`} position={[0.1, 0.12, side * 0.5]}>
          <boxGeometry args={[0.9, 0.18, 0.25]} />
          <meshStandardMaterial color={body} metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* Gold side pod accent strips */}
      {[-1, 1].map((side) => (
        <mesh key={`sps-${side}`} position={[0.1, 0.22, side * 0.62]}>
          <boxGeometry args={[0.85, 0.02, 0.02]} />
          <meshStandardMaterial
            color={gold}
            metalness={0.9}
            roughness={0.1}
            emissive={gold}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {/* Wheels */}
      {[
        [1.1, -0.05, 0.5],
        [1.1, -0.05, -0.5],
        [-0.8, -0.05, 0.5],
        [-0.8, -0.05, -0.5],
      ].map(([x, y, z], i) => (
        <group key={`wheel-${i}`} position={[x, y, z]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.12, 16]} />
            <meshStandardMaterial color="#111" metalness={0.5} roughness={0.6} />
          </mesh>
          {/* Wheel rim accent */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.13, 8]} />
            <meshStandardMaterial color={gold} metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Suspension arms (simplified) */}
      {[
        [1.1, 0.05, 0.35],
        [1.1, 0.05, -0.35],
        [-0.8, 0.05, 0.35],
        [-0.8, 0.05, -0.35],
      ].map(([x, y, z], i) => (
        <mesh key={`susp-${i}`} position={[x, y, z]}>
          <boxGeometry args={[0.04, 0.04, 0.2]} />
          <meshStandardMaterial color={darkMetal} metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
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
        <FormulaCarPlaceholder />
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
