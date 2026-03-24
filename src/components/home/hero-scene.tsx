"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

interface HeroSceneProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeroScene({ containerRef }: HeroSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    model: THREE.Group | null;
    animId: number;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setClearColor(0x0a0a0a, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight2.position.set(-3, 4, -5);
    scene.add(dirLight2);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
    scene.add(hemi);

    // Store refs
    sceneRef.current = { renderer, scene, camera, model: null, animId: 0 };

    // Resize handler
    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize);

    // Scroll tracking
    let scrollProgress = 0;
    function handleScroll() {
      const scrollContainer = containerRef.current;
      if (!scrollContainer) return;
      const rect = scrollContainer.getBoundingClientRect();
      const scrollable = scrollContainer.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      scrollProgress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Load model
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load("/models/sr17.glb", (gltf) => {
      const model = gltf.scene;

      // Center at origin
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      model.position.sub(center);
      // Lower the car slightly so it sits in the bottom half of the viewport
      model.position.y -= size.y * 0.3;

      scene.add(model);
      if (sceneRef.current) sceneRef.current.model = model;

      // Position camera — 3/4 front view, slightly elevated
      const maxDim = Math.max(size.x, size.z);
      const dist = maxDim * 2.2;
      camera.position.set(dist * 0.6, dist * 0.35, dist * 0.75);
      camera.lookAt(0, -size.y * 0.15, 0);

    });

    // Animation loop
    function animate() {
      const id = requestAnimationFrame(animate);
      if (sceneRef.current) sceneRef.current.animId = id;

      // Rotate model with scroll
      if (sceneRef.current?.model) {
        sceneRef.current.model.rotation.y = scrollProgress * Math.PI * 2;
      }

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animId);
      }
      renderer.dispose();
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
