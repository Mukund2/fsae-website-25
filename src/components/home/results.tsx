"use client";

import { useEffect, useRef } from "react";

const results = [
  {
    stat: "1st",
    event: "Overall",
    competition: "FSAE Lincoln 2015",
    description:
      "First place finish against 100+ university teams worldwide",
  },
  {
    stat: "1st",
    event: "Endurance",
    competition: "Michigan FSAE 2025",
    description:
      "Fastest and most reliable car in the 22km endurance race, the most demanding event in competition",
  },
  {
    stat: "2nd",
    event: "Overall",
    competition: "Michigan FSAE 2025",
    description:
      "Runner-up out of 120 teams, also awarded Best Aerodynamics Vehicle",
  },
  {
    stat: "1st",
    event: "Endurance",
    competition: "Michigan FSAE 2021",
    description:
      "First running electric car in team history dominated the endurance event, finishing 2nd overall",
  },
  {
    stat: "1st",
    event: "Cummins Innovation Award",
    competition: "Michigan FSAE 2024",
    description:
      "Recognized for the most innovative engineering solution at competition, placed 5th overall",
  },
  {
    stat: "1st",
    event: "EV, SoCal Shootout",
    competition: "2024 (x2)",
    description:
      "Won the top EV spot at SoCal Shootout twice in the same year",
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

export function Results() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
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
              if (direction === "slide-left") {
                animateElement(
                  el,
                  { x: -200, opacity: 0 },
                  { x: 0, opacity: 1 },
                  700,
                  i * 150
                );
              } else if (direction === "slide-right") {
                animateElement(
                  el,
                  { x: 200, opacity: 0 },
                  { x: 0, opacity: 1 },
                  700,
                  i * 150
                );
              } else {
                animateElement(
                  el,
                  { y: 30, opacity: 0 },
                  { y: 0, opacity: 1 },
                  600,
                  i * 100
                );
              }
            });
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes strip-glow {
          0% { box-shadow: 0 0 0 0 rgba(184, 150, 90, 0); }
          50% { box-shadow: 0 0 24px 2px rgba(184, 150, 90, 0.12); }
          100% { box-shadow: 0 0 0 0 rgba(184, 150, 90, 0); }
        }
        .result-strip:hover {
          animation: strip-glow 1.5s ease-in-out infinite;
        }
        @keyframes gold-text-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(184, 150, 90, 0.3); }
          50% { text-shadow: 0 0 40px rgba(184, 150, 90, 0.5); }
        }
        .gold-glow {
          animation: gold-text-glow 3s ease-in-out infinite;
        }
      `}</style>

      <section ref={sectionRef} className="relative w-full bg-[#1C1917]">
        {/* Smooth gradient fade from warm background into dark section */}
        <div
          className="absolute left-0 right-0 top-0 -translate-y-full pointer-events-none"
          style={{
            height: "160px",
            background: "linear-gradient(to bottom, transparent, #1C1917)",
          }}
        />

        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          {/* Section header */}
          <div data-anim="up" className="mb-16">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.95] tracking-tight text-white">
              Track Record
            </h2>
          </div>

          {/* Result strips */}
          <div className="flex flex-col gap-3">
            {results.map((result, i) => (
              <div
                key={`${result.competition}-${result.event}`}
                data-anim={i % 2 === 0 ? "slide-left" : "slide-right"}
                className="result-strip relative flex items-center overflow-hidden bg-[#292524]"
                style={{
                  borderLeft: i % 2 === 0 ? "3px solid #B8965A" : "none",
                  borderRight: i % 2 !== 0 ? "3px solid #B8965A" : "none",
                  minHeight: "88px",
                }}
              >
                {/* Stat number */}
                <div className="flex-shrink-0 w-[100px] md:w-[140px] flex items-center justify-center px-4">
                  <span className="gold-glow font-display text-3xl md:text-5xl uppercase tracking-tight text-gold font-bold">
                    {result.stat}
                  </span>
                </div>

                {/* Divider */}
                <div className="h-10 w-px bg-white/10 flex-shrink-0" />

                {/* Event + competition */}
                <div className="flex-shrink-0 w-[180px] md:w-[280px] px-5 md:px-6">
                  <h3 className="font-display text-sm md:text-base uppercase tracking-wide text-white leading-tight">
                    {result.event}
                  </h3>
                  <span className="mt-0.5 block font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/50">
                    {result.competition}
                  </span>
                </div>

                {/* Divider */}
                <div className="hidden md:block h-10 w-px bg-white/10 flex-shrink-0" />

                {/* Description */}
                <p className="hidden md:block flex-1 px-6 text-sm leading-relaxed text-white/45">
                  {result.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
