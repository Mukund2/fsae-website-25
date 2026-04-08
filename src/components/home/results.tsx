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
      "Fastest and most reliable car in the 22km endurance race — the most demanding event in competition",
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
    event: "EV — SoCal Shootout",
    competition: "2024 (x2)",
    description:
      "Won the top EV spot at SoCal Shootout twice in the same year",
  },
];

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
    <section ref={sectionRef} className="w-full bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        {/* Section header */}
        <div data-anim="left" className="mb-16">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Competition
          </p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.95] tracking-tight text-foreground">
            Track Record
          </h2>
        </div>

        {/* Results list */}
        <div className="border-t border-border">
          {results.map((result, i) => (
            <div
              key={`${result.competition}-${result.event}`}
              data-anim="up"
              className="grid grid-cols-1 gap-4 border-b border-border py-8 md:grid-cols-[120px_1fr] md:gap-8 md:py-10"
            >
              {/* Stat */}
              <div className="flex items-baseline gap-3 md:block">
                <span className="font-display text-5xl uppercase tracking-tight text-gold md:text-6xl">
                  {result.stat}
                </span>
              </div>

              {/* Details */}
              <div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <h3 className="font-display text-xl uppercase tracking-wide text-foreground md:text-2xl">
                    {result.event}
                  </h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    {result.competition}
                  </span>
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
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
  );
}
