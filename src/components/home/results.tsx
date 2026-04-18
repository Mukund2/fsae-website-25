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
              if (direction === "slam") {
                animateElement(
                  el,
                  { y: -30, opacity: 0, scale: 1.1 },
                  { y: 0, opacity: 1, scale: 1 },
                  400,
                  i * 100
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
        @keyframes rowPulse {
          0% { box-shadow: inset 0 0 0 0 rgba(184, 150, 90, 0); }
          50% { box-shadow: inset 0 0 30px 0 rgba(184, 150, 90, 0.06); }
          100% { box-shadow: inset 0 0 0 0 rgba(184, 150, 90, 0); }
        }
        .result-row:hover {
          animation: rowPulse 1.5s ease-in-out infinite;
        }
      `}</style>

      <section ref={sectionRef} className="relative w-full bg-[#111]">
        {/* Smooth gradient fade */}
        <div
          className="absolute left-0 right-0 top-0 -translate-y-full pointer-events-none"
          style={{
            height: "160px",
            background: "linear-gradient(to bottom, transparent, #111)",
          }}
        />

        {/* Diagonal accent lines in background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -right-20 -top-20 w-[400px] h-[400px]"
            style={{
              background: "linear-gradient(135deg, transparent 48%, rgba(184,150,90,0.08) 49%, rgba(184,150,90,0.08) 51%, transparent 52%)",
            }}
          />
          <div
            className="absolute -left-20 -bottom-20 w-[300px] h-[300px]"
            style={{
              background: "linear-gradient(135deg, transparent 48%, rgba(184,150,90,0.05) 49%, rgba(184,150,90,0.05) 51%, transparent 52%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          {/* Header - F1 style bold */}
          <div data-anim="up" className="mb-10">
            <h2 className="font-display text-[clamp(3rem,6vw,5.5rem)] font-bold uppercase leading-[0.9] tracking-tight text-white">
              Track
              <br />
              <span className="text-gold">Record</span>
            </h2>
          </div>

          {/* F1-style leaderboard table */}
          <div className="overflow-hidden">
            {results.map((result, i) => (
              <div
                key={`${result.competition}-${result.event}`}
                data-anim="slam"
                className="result-row relative flex items-stretch border-b border-white/5"
              >
                {/* Rank number - big bold italic style */}
                <div className="flex w-[60px] md:w-[80px] flex-shrink-0 items-center justify-center bg-white/[0.03]">
                  <span className="font-display text-2xl md:text-3xl font-bold text-white/30">
                    {i + 1}
                  </span>
                </div>

                {/* Main content row */}
                <div className="flex flex-1 items-center py-4 md:py-5">
                  {/* Event name - bold, uppercase, dominant */}
                  <div className="flex-1 px-4 md:px-6">
                    <h3 className="font-display text-base md:text-xl font-bold uppercase tracking-wide text-white">
                      {result.event}
                    </h3>
                    <span className="mt-0.5 block font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/35">
                      {result.competition}
                    </span>
                  </div>

                  {/* Description - hidden on mobile */}
                  <p className="hidden lg:block flex-1 px-4 text-[13px] leading-relaxed text-white/30">
                    {result.description}
                  </p>
                </div>

                {/* Stat badge - colored accent block on the right, F1 style */}
                <div
                  className="flex w-[80px] md:w-[110px] flex-shrink-0 items-center justify-center"
                  style={{
                    background: result.stat === "1st"
                      ? "linear-gradient(135deg, #B8965A, #9A7D45)"
                      : result.stat === "2nd"
                        ? "linear-gradient(135deg, #7A7A7A, #5A5A5A)"
                        : "linear-gradient(135deg, #8B6B3D, #6B5230)",
                  }}
                >
                  <span className="font-display text-xl md:text-3xl font-bold uppercase text-white">
                    {result.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
