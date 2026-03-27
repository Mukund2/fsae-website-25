"use client";

import { useEffect, useRef } from "react";

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const container = containerRef.current;
    if (!container) return;

    // Import model-viewer FIRST, then create the element
    // This avoids a race condition where the element is created
    // before the custom element is registered
    import("@google/model-viewer").then(() => {
      if (!container.isConnected) return;

      const mv = document.createElement("model-viewer");
      mv.setAttribute("src", "/models/sr17.glb");
      mv.setAttribute("auto-rotate", "");
      mv.setAttribute("auto-rotate-delay", "0");
      mv.setAttribute("rotation-per-second", "6deg");
      mv.setAttribute("camera-orbit", "45deg 55deg 2m");
      mv.setAttribute("field-of-view", "40deg");
      mv.setAttribute("shadow-intensity", "1");
      mv.setAttribute("exposure", "1.8");
      mv.setAttribute("shadow-softness", "1");
      mv.setAttribute("environment-image", "legacy");
      mv.setAttribute("interaction-prompt", "none");
      mv.setAttribute("tone-mapping", "commerce");
      mv.style.width = "100%";
      mv.style.height = "100%";
      mv.style.display = "block";
      mv.style.setProperty("--poster-color", "transparent");

      // Fix the invisible model: override mirror materials at runtime
      // The GLB has roughness=0 (perfect mirror) + no base color (white)
      // which makes it invisible on light backgrounds
      mv.addEventListener("load", () => {
        try {
          const model = (mv as any).model;
          if (!model?.materials) return;

          for (const mat of model.materials) {
            const pbr = mat.pbrMetallicRoughness;
            if (!pbr) continue;

            const [r, g, b] = pbr.baseColorFactor;

            // White/unset materials → dark carbon fiber gray
            if (r > 0.9 && g > 0.9 && b > 0.9) {
              pbr.setBaseColorFactor([0.06, 0.06, 0.06, 1]);
            }

            // Fix mirror surfaces — add roughness
            if (pbr.roughnessFactor < 0.1) {
              pbr.setRoughnessFactor(0.35);
            }
          }
        } catch {
          // model API may not be available in all versions
        }
      });

      const style = document.createElement("style");
      style.textContent = `
        model-viewer { --poster-color: transparent; }
        model-viewer::part(default-progress-bar) { display: none; }
      `;
      container.appendChild(style);
      container.appendChild(mv);
    });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    />
  );
}
