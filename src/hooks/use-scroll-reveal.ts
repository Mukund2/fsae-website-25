"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shared animation helper using requestAnimationFrame.
 * Supports x, y, opacity, and scale transforms with cubic ease-out.
 */
export function animateElement(
  el: HTMLElement,
  from: { x?: number; y?: number; opacity?: number; scale?: number },
  to: { x?: number; y?: number; opacity?: number; scale?: number },
  duration: number,
  delay: number
) {
  const startX = from.x ?? 0;
  const startY = from.y ?? 0;
  const startO = from.opacity ?? 0;
  const startS = from.scale ?? 1;
  const endX = to.x ?? 0;
  const endY = to.y ?? 0;
  const endO = to.opacity ?? 1;
  const endS = to.scale ?? 1;

  el.style.opacity = String(startO);
  el.style.transform = `translate(${startX}px, ${startY}px) scale(${startS})`;

  setTimeout(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentX = startX + (endX - startX) * eased;
      const currentY = startY + (endY - startY) * eased;
      const currentO = startO + (endO - startO) * eased;
      const currentS = startS + (endS - startS) * eased;

      el.style.opacity = String(currentO);
      el.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentS})`;

      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, delay);
}

/**
 * Hook that observes a section and auto-animates children with [data-anim] attributes.
 *
 * Supported data-anim values:
 *  - "up" (default) -- slide up + fade
 *  - "left"         -- slide from left + fade
 *  - "right"        -- slide from right + fade
 *  - "scale"        -- scale up + slide up + fade
 *  - "card"         -- scale up + slide up + fade (alias for scale with slightly different params)
 */
export function useScrollReveal(options?: { threshold?: number; rootMargin?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const animEls = section.querySelectorAll<HTMLElement>("[data-anim]");
    animEls.forEach((el) => {
      el.style.opacity = "0";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animEls.forEach((el, i) => {
              const direction = el.getAttribute("data-anim");
              const delay = i * 100;

              if (direction === "left") {
                animateElement(el, { x: -40, opacity: 0 }, { x: 0, opacity: 1 }, 600, delay);
              } else if (direction === "right") {
                animateElement(el, { x: 40, opacity: 0 }, { x: 0, opacity: 1 }, 600, delay);
              } else if (direction === "scale") {
                animateElement(el, { y: 30, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1 }, 700, delay);
              } else if (direction === "card") {
                animateElement(el, { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1 }, 700, i * 120);
              } else {
                // "up" or any other value
                animateElement(el, { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, 600, delay);
              }
            });
            observer.disconnect();
          }
        }
      },
      { threshold: options?.threshold ?? 0.15, rootMargin: options?.rootMargin }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/**
 * Simple boolean visibility hook (original API preserved for backward compatibility).
 */
export function useScrollRevealSimple(options?: { threshold?: number; rootMargin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: options?.threshold ?? 0.1, rootMargin: options?.rootMargin ?? "0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  return { ref, isVisible };
}
