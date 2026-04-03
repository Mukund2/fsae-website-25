"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

const STATS = [
  { value: "3.2s", label: "0-60 mph" },
  { value: "485", label: "lbs curb weight" },
  { value: "80kW", label: "peak power" },
  { value: "85", label: "mph top speed" },
] as const;

export function CarShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const stats = statsRef.current;
    if (!section || !content || !stats) return;

    // Initial state: content off-screen right
    content.style.opacity = "0";
    content.style.transform = "translateX(120px)";

    // Stats hidden, scaled down
    const statEls = stats.querySelectorAll<HTMLElement>(".stat-item");
    statEls.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "scale(0.3) translateY(40px)";
    });

    // Slide in animation using rAF
    const animateSlideIn = (
      el: HTMLElement,
      delay: number,
      fromX: number,
      duration = 500
    ) => {
      setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);

          el.style.opacity = String(eased);
          el.style.transform = `translateX(${fromX * (1 - eased)}px)`;

          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, delay);
    };

    // Slam animation: fast scale + overshoot for a snap/drop feel
    const animateSlam = (el: HTMLElement, delay: number) => {
      setTimeout(() => {
        const start = performance.now();
        const duration = 300;
        const tick = (now: number) => {
          const elapsed = now - start;
          const t = Math.min(elapsed / duration, 1);

          // Back-ease-out: overshoots to ~1.08 then settles to 1.0
          const c1 = 1.7;
          const c3 = c1 + 1;
          const eased = 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);

          const opacity = Math.min(t * 4, 1); // fast fade in
          const scaleVal = 0.3 + 0.7 * eased;
          const yOffset = 40 * (1 - eased);

          el.style.opacity = String(opacity);
          el.style.transform = `scale(${scaleVal}) translateY(${yOffset}px)`;

          if (t < 1) requestAnimationFrame(tick);
          else {
            el.style.opacity = "1";
            el.style.transform = "scale(1) translateY(0)";
          }
        };
        requestAnimationFrame(tick);
      }, delay);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Slide in right column
            animateSlideIn(content, 0, 120);

            // Slam in stats with stagger
            statEls.forEach((el, i) => {
              animateSlam(el, 200 + i * 100);
            });

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
      <div className="mx-auto max-w-7xl px-6 py-32 lg:px-12 lg:py-40">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          {/* LEFT: 3D Car Model, no box, naturally integrated */}
          <div className="flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-[520px]">
              <HeroScene />
            </div>
          </div>

          {/* RIGHT: Text content */}
          <div ref={contentRef} className="flex flex-col justify-center">
            <h2 className="font-display text-[clamp(3rem,6vw,5.5rem)] uppercase leading-[0.95] tracking-tight text-foreground">
              Built to Win
            </h2>

            {/* Stats grid - slams in */}
            <div
              ref={statsRef}
              className="mt-14 grid grid-cols-2 gap-x-12 gap-y-10"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="stat-item">
                  <span className="block font-display text-[clamp(2rem,4vw,3.2rem)] leading-none tracking-tight text-gold">
                    {stat.value}
                  </span>
                  <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    {stat.label}
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
