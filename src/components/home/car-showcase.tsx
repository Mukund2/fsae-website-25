"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

const STATS = [
  { value: "3.2s", label: "0-60 MPH" },
  { value: "375 lb", label: "CURB WEIGHT" },
  { value: "80 hp", label: "PEAK POWER" },
  { value: "85 mph", label: "TOP SPEED" },
] as const;

export function CarShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<HTMLDivElement>(null);

  const [HeroScene, setHeroScene] = useState<ComponentType | null>(null);

  // Dynamically import the 3D model component
  useEffect(() => {
    import("./hero-scene").then((mod) => setHeroScene(() => mod.default));
  }, []);

  // Scroll-reveal animation via IntersectionObserver
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = [
      { el: leftRef.current, delay: 0 },
      { el: labelRef.current, delay: 200 },
      { el: headingRef.current, delay: 300 },
      { el: descRef.current, delay: 400 },
      { el: statsRef.current, delay: 500 },
      { el: sketchRef.current, delay: 600 },
    ];

    // Set initial hidden state
    for (const { el } of targets) {
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
      }
    }

    const animateIn = (el: HTMLElement, delay: number) => {
      setTimeout(() => {
        const start = performance.now();
        const duration = 600;

        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);

          el.style.opacity = String(eased);
          el.style.transform = `translateY(${24 * (1 - eased)}px)`;

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
      }, delay);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            for (const { el, delay } of targets) {
              if (el) animateIn(el, delay);
            }
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-background">
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT COLUMN — 3D Car Model */}
          <div
            ref={leftRef}
            className="flex items-center justify-center"
          >
            <div className="relative aspect-square w-full max-w-[500px]">
              {/* Subtle radial glow behind the model */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)",
                }}
              />
              {HeroScene && <HeroScene />}
            </div>
          </div>

          {/* RIGHT COLUMN — Text Content */}
          <div className="flex flex-col justify-center">
            <span
              ref={labelRef}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
            >
              SR-17 / 2024 SEASON
            </span>

            <h2
              ref={headingRef}
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] uppercase leading-[1.1] tracking-tight text-foreground"
            >
              The Fastest Formula SAE Car in the World
            </h2>

            <p
              ref={descRef}
              className="mt-6 font-body text-base leading-relaxed text-muted"
            >
              Engineered from the ground up by San José State University
              students. The SR-17 pushes the boundaries of what a student-built
              race car can achieve — lighter, faster, and more refined than
              ever.
            </p>

            {/* STATS GRID */}
            <div
              ref={statsRef}
              className="mt-10 grid grid-cols-2 gap-6"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="border border-border p-6"
                >
                  <div className="font-mono text-[clamp(1.5rem,3vw,2.5rem)] font-light text-foreground">
                    {stat.value}
                  </div>
                  <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* SKETCH PLACEHOLDERS */}
            <div ref={sketchRef} className="mt-10 flex gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex aspect-[3/2] flex-1 items-center justify-center border border-border bg-surface"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted/40">
                    SKETCH
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
