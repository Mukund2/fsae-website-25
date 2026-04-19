"use client";

import { useEffect, useRef } from "react";

const results = [
  {
    stat: "1st",
    event: "Overall",
    competition: "FSAE Lincoln 2015",
    color: "#0055A2", // SJSU blue - top achievement
  },
  {
    stat: "1st",
    event: "Endurance",
    competition: "Michigan FSAE 2025",
    color: "#B8965A", // Gold
  },
  {
    stat: "2nd",
    event: "Overall",
    competition: "Michigan FSAE 2025",
    color: "#0055A2", // Blue
  },
  {
    stat: "1st",
    event: "Endurance",
    competition: "Michigan FSAE 2021",
    color: "#B8965A", // Gold
  },
  {
    stat: "1st",
    event: "Innovation Award",
    competition: "Michigan FSAE 2024",
    color: "#C45A2D", // Warm bronze/red accent
  },
  {
    stat: "1st",
    event: "EV, SoCal Shootout",
    competition: "2024 (x2)",
    color: "#2D8C5A", // Racing green
  },
];

function animateElement(
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

      el.style.opacity = String(startO + (endO - startO) * eased);
      el.style.transform = `translate(${startX + (endX - startX) * eased}px, ${startY + (endY - startY) * eased}px) scale(${startS + (endS - startS) * eased})`;

      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, delay);
}

export function Results() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rows = section.querySelectorAll<HTMLElement>("[data-row]");
    rows.forEach((el) => {
      el.style.opacity = "0";
    });
    const header = section.querySelector<HTMLElement>("[data-header]");
    if (header) header.style.opacity = "0";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (header) {
              animateElement(
                header,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1 },
                500,
                0
              );
            }
            rows.forEach((el, i) => {
              animateElement(
                el,
                { x: -80, opacity: 0 },
                { x: 0, opacity: 1 },
                450,
                200 + i * 120
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
    <section ref={sectionRef} className="relative w-full bg-[#0C0C14]">
      {/* Smooth gradient fade */}
      <div
        className="absolute left-0 right-0 top-0 -translate-y-full pointer-events-none"
        style={{
          height: "160px",
          background: "linear-gradient(to bottom, transparent, #0C0C14)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* Header - massive, aggressive */}
        <div data-header className="mb-8 md:mb-12">
          <h2 className="font-display text-[clamp(3.5rem,8vw,7rem)] font-bold uppercase leading-[0.85] tracking-tighter text-white">
            Track
            <br />
            <span className="text-gold">Record</span>
          </h2>
        </div>

        {/* Leaderboard rows */}
        <div className="flex flex-col gap-[3px]">
          {results.map((result, i) => (
            <div
              key={`${result.competition}-${result.event}`}
              data-row
              className="relative flex items-stretch overflow-hidden"
              style={{ minHeight: "72px" }}
            >
              {/* Color bar - fills the entire left portion like F1 team color */}
              <div
                className="flex items-center gap-3 md:gap-5 px-4 md:px-6 flex-1"
                style={{ background: result.color }}
              >
                {/* Rank number */}
                <span className="font-display text-3xl md:text-4xl font-bold text-white/40 w-[36px] md:w-[44px] flex-shrink-0">
                  {i + 1}
                </span>

                {/* Event name - big and bold */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg md:text-2xl font-bold uppercase tracking-wide text-white truncate">
                    {result.event}
                  </h3>
                  <span className="block font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-white/60">
                    {result.competition}
                  </span>
                </div>
              </div>

              {/* Stat number - white block on the right */}
              <div className="flex w-[90px] md:w-[130px] flex-shrink-0 items-center justify-center bg-white">
                <span className="font-display text-2xl md:text-4xl font-bold uppercase tracking-tight text-[#0C0C14]">
                  {result.stat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
