"use client";

import { useEffect, useRef } from "react";

export function CarShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    if (!section || !overlay) return;

    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
        overlay.style.opacity = String(progress * 0.6);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-background" style={{ height: "200vh" }}>
      <section className="sticky top-0 w-full overflow-hidden" style={{ height: "100vh" }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hero-broll.mp4"
        />
        {/* Scroll-driven darken overlay */}
        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 bg-black"
          style={{ opacity: 0 }}
        />
      </section>
    </div>
  );
}
