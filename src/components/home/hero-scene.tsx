"use client";

import { useEffect, useRef } from "react";

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    // model-viewer is a web component — import it once to register the custom element
    import("@google/model-viewer");
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create the model-viewer element directly (avoids SSR issues with custom elements)
    const mv = document.createElement("model-viewer");
    mv.setAttribute("src", "/models/sr17.glb");
    mv.setAttribute("auto-rotate", "");
    mv.setAttribute("auto-rotate-delay", "0");
    mv.setAttribute("rotation-per-second", "6deg");
    mv.setAttribute("camera-orbit", "30deg 60deg auto");
    mv.setAttribute("field-of-view", "40deg");
    mv.setAttribute("shadow-intensity", "0.4");
    mv.setAttribute("exposure", "1.0");
    mv.setAttribute("environment-image", "neutral");
    mv.setAttribute("interaction-prompt", "none");
    mv.style.width = "100%";
    mv.style.height = "100%";
    mv.style.display = "block";
    mv.style.setProperty("--poster-color", "transparent");

    container.appendChild(mv);

    return () => {
      container.removeChild(mv);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    />
  );
}
