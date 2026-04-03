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

function animateElement(
  el: HTMLElement,
  from: { x?: number; y?: number; opacity?: number },
  to: { x?: number; y?: number; opacity?: number },
  duration: number,
  delay: number
) {
  const startX = from.x ?? 0;
  const startY = from.y ?? 0;
  const startO = from.opacity ?? 0;
  const endX = to.x ?? 0;
  const endY = to.y ?? 0;
  const endO = to.opacity ?? 1;

  el.style.opacity = String(startO);
  el.style.transform = `translate(${startX}px, ${startY}px)`;

  setTimeout(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentX = startX + (endX - startX) * eased;
      const currentY = startY + (endY - startY) * eased;
      const currentO = startO + (endO - startO) * eased;

      el.style.opacity = String(currentO);
      el.style.transform = `translate(${currentX}px, ${currentY}px)`;

      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, delay);
}

export function CarShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animEls = section.querySelectorAll<HTMLElement>("[data-anim]");
    animEls.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateX(-40px)";
    });

    const statEls = section.querySelectorAll<HTMLElement>("[data-stat]");
    statEls.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translate(0px, 30px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animEls.forEach((el, i) => {
              animateElement(
                el,
                { x: -40, opacity: 0 },
                { x: 0, opacity: 1 },
                600,
                i * 100
              );
            });

            statEls.forEach((el, i) => {
              animateElement(
                el,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1 },
                600,
                300 + i * 100
              );
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
    <section ref={sectionRef} className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-20 lg:px-12 lg:pt-32 lg:pb-28">
        {/* Top: heading left, description right */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div data-anim>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
              Formula SAE
            </span>
            <h2 className="mt-3 font-display text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.95] tracking-tight">
              <span className="font-bold text-foreground">Spartan Racing</span>
              <br />
              <span className="font-light text-foreground/40">Built to Win</span>
            </h2>
          </div>
          <p data-anim className="max-w-md font-body text-base leading-relaxed text-muted lg:pb-2">
            San Jos&eacute; State University&apos;s Formula SAE team designs,
            builds, and races high-performance electric vehicles. Over 100
            members push the boundaries of engineering every season.
          </p>
        </div>

        {/* 3D Car Model */}
        <div data-anim className="mt-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <HeroScene />
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-12">
          {STATS.map((stat) => (
            <div key={stat.label} data-stat>
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
    </section>
  );
}
