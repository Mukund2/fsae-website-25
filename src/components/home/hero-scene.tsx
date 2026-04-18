"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

function CarModel() {
  const { scene } = useGLTF("/models/sr17.glb");
  const fixed = useRef(false);
  const wheelPivots = useRef<THREE.Group[]>([]);

  useEffect(() => {
    if (fixed.current) return;
    fixed.current = true;

    const wheelMeshes: THREE.Mesh[] = [];

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const mat = child.material as THREE.MeshStandardMaterial;

      // Collect wheel meshes by name
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

      // Keep existing orange/gold accents from the model -> warm gold to match real car
      if (r > 0.5 && g > 0.2 && g < 0.6 && b < 0.2) {
        mat.color.set(0xC8A020);
        mat.roughness = 0.3;
        mat.metalness = 0.15;
        mat.needsUpdate = true;
        return;
      }

      // Mid-tone grays and other colors -> dark carbon fiber
      mat.color.set(0x1a1a1a);
      mat.roughness = 0.5;
      mat.metalness = 0.15;
      mat.needsUpdate = true;
    });

    // For each wheel mesh, center geometry at origin and wrap in a pivot group
    // so rotation spins the wheel in place instead of orbiting the node origin
    const pivots: THREE.Group[] = [];
    for (const mesh of wheelMeshes) {
      mesh.geometry.computeBoundingBox();
      const center = new THREE.Vector3();
      mesh.geometry.boundingBox!.getCenter(center);

      // Shift geometry so its center is at (0,0,0)
      mesh.geometry.translate(-center.x, -center.y, -center.z);

      // Create a pivot group at the geometry's original center
      const pivot = new THREE.Group();
      pivot.position.copy(mesh.position).add(center);
      pivot.scale.copy(mesh.scale);

      // Reparent: insert pivot between parent and mesh
      mesh.parent!.add(pivot);
      mesh.position.set(0, 0, 0);
      mesh.scale.set(1, 1, 1);
      pivot.add(mesh);

      pivots.push(pivot);
    }
    wheelPivots.current = pivots;
  }, [scene]);

  // Rotate wheel pivots around Z axis (the axle direction in this model)
  useFrame((_state, delta) => {
    for (const pivot of wheelPivots.current) {
      pivot.rotation.z -= delta * 3;
    }
  });

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
