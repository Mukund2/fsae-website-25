"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

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
              if (direction === "left") {
                animateElement(
                  el,
                  { x: -40, opacity: 0 },
                  { x: 0, opacity: 1 },
                  600,
                  i * 100
                );
              } else if (direction === "card") {
                animateElement(
                  el,
                  { y: 40, opacity: 0, scale: 0.95 },
                  { y: 0, opacity: 1, scale: 1 },
                  700,
                  i * 120
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
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Inject keyframes for card hover glow */}
      <style jsx global>{`
        @keyframes results-card-glow {
          0% { box-shadow: 0 0 0 0 rgba(200, 168, 78, 0); }
          50% { box-shadow: 0 0 20px 2px rgba(200, 168, 78, 0.15); }
          100% { box-shadow: 0 0 0 0 rgba(200, 168, 78, 0); }
        }
        .results-card:hover {
          animation: results-card-glow 1.5s ease-in-out infinite;
        }
        @keyframes gold-text-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(200, 168, 78, 0.3); }
          50% { text-shadow: 0 0 40px rgba(200, 168, 78, 0.5); }
        }
        .gold-glow {
          animation: gold-text-glow 3s ease-in-out infinite;
        }
      `}</style>

      <section ref={sectionRef} className="relative w-full bg-[#0A0F1C]">
        {/* Angled top divider */}
        <div
          className="absolute left-0 right-0 top-0 -translate-y-full"
          style={{
            height: "80px",
            background: "linear-gradient(to bottom, var(--background), #0A0F1C)",
            clipPath: "polygon(0 0, 100% 60%, 100% 100%, 0 100%)",
          }}
        />

        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          {/* Section header */}
          <div data-anim="left" className="mb-16">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-gold">
              Competition
            </p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.95] tracking-tight text-white">
              Track{" "}
              <span className="text-gold">Record</span>
            </h2>
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {results.map((result, i) => (
              <div
                key={`${result.competition}-${result.event}`}
                data-anim="card"
                className="results-card relative rounded-sm border border-white/10 border-l-gold border-l-[3px] bg-[#111827] p-6 md:p-8"
              >
                {/* Stat */}
                <span className="gold-glow font-display text-6xl uppercase tracking-tight text-gold md:text-7xl">
                  {result.stat}
                </span>

                {/* Details */}
                <div className="mt-4">
                  <h3 className="font-display text-lg uppercase tracking-wide text-white md:text-xl">
                    {result.event}
                  </h3>
                  <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                    {result.competition}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {result.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* View full results link */}
          <div data-anim="up" className="mt-12 flex justify-end">
            <Link
              href="/racing"
              className="group inline-flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.15em] text-gold"
            >
              View Full Results
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="text-gold"
              >
                <path
                  d="M5 15L15 5M15 5H8M15 5V12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
