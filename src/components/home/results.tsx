"use client";

import { useEffect, useRef } from "react";

const results = [
  {
    event: "OVERALL",
    competition: "FSAE LINCOLN",
    year: "2015",
    result: "1ST",
  },
  {
    event: "ENDURANCE",
    competition: "MICHIGAN FSAE",
    year: "2025",
    result: "1ST",
  },
  {
    event: "OVERALL",
    competition: "MICHIGAN FSAE",
    year: "2025",
    result: "2ND",
  },
  {
    event: "ENDURANCE",
    competition: "MICHIGAN FSAE",
    year: "2021",
    result: "1ST",
  },
  {
    event: "INNOVATION AWARD",
    competition: "MICHIGAN FSAE",
    year: "2024",
    result: "1ST",
  },
  {
    event: "EV — SOCAL SHOOTOUT",
    competition: "SOCAL SHOOTOUT",
    year: "2024",
    result: "1ST",
  },
];

/**
 * Gold bar reveal animation:
 * 1. Gold bar covers the row (scaleX 1)
 * 2. Row content slides in from left behind the bar
 * 3. Gold bar sweeps right and disappears (translateX 100%)
 * 4. Row content is revealed
 */
function revealRow(row: HTMLElement, delay: number) {
  const content = row.querySelector<HTMLElement>("[data-content]");
  const bar = row.querySelector<HTMLElement>("[data-bar]");
  if (!content || !bar) return;

  // Initial state: content hidden left, bar ready
  content.style.opacity = "0";
  content.style.transform = "translateX(-60px)";
  bar.style.transform = "scaleX(0)";
  bar.style.transformOrigin = "left";

  setTimeout(() => {
    // Phase 1: Gold bar sweeps in from left (covers row)
    const barInStart = performance.now();
    const barInDuration = 350;

    const tickBarIn = (now: number) => {
      const elapsed = now - barInStart;
      const p = Math.min(elapsed / barInDuration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      bar.style.transform = `scaleX(${eased})`;

      if (p < 1) {
        requestAnimationFrame(tickBarIn);
      } else {
        // Phase 2: Content appears, bar sweeps out to right
        content.style.opacity = "1";
        content.style.transform = "translateX(-40px)";
        bar.style.transformOrigin = "right";

        const phase2Start = performance.now();
        const barOutDuration = 400;
        const contentSlideDuration = 500;

        const tickPhase2 = (now2: number) => {
          const elapsed2 = now2 - phase2Start;

          // Bar sweeps out
          const pBar = Math.min(elapsed2 / barOutDuration, 1);
          const easedBar = 1 - Math.pow(1 - pBar, 3);
          bar.style.transform = `scaleX(${1 - easedBar})`;

          // Content slides in
          const pContent = Math.min(elapsed2 / contentSlideDuration, 1);
          const easedContent = 1 - Math.pow(1 - pContent, 3);
          content.style.transform = `translateX(${-40 * (1 - easedContent)}px)`;

          if (pBar < 1 || pContent < 1) {
            requestAnimationFrame(tickPhase2);
          }
        };
        requestAnimationFrame(tickPhase2);
      }
    };
    requestAnimationFrame(tickBarIn);
  }, delay);
}

function animateElement(
  el: HTMLElement,
  from: { x?: number; opacity?: number },
  to: { x?: number; opacity?: number },
  duration: number,
  delay: number
) {
  const startX = from.x ?? 0;
  const startO = from.opacity ?? 0;
  const endX = to.x ?? 0;
  const endO = to.opacity ?? 1;

  el.style.opacity = String(startO);
  el.style.transform = `translateX(${startX}px)`;

  setTimeout(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      el.style.opacity = String(startO + (endO - startO) * eased);
      el.style.transform = `translateX(${startX + (endX - startX) * eased}px)`;

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
      const content = el.querySelector<HTMLElement>("[data-content]");
      if (content) {
        content.style.opacity = "0";
      }
    });
    const headers = section.querySelectorAll<HTMLElement>("[data-header]");
    headers.forEach((el) => {
      el.style.opacity = "0";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            headers.forEach((el, i) => {
              animateElement(
                el,
                { x: -40, opacity: 0 },
                { x: 0, opacity: 1 },
                500,
                i * 100
              );
            });
            rows.forEach((el, i) => {
              revealRow(el, 300 + i * 120);
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
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#111111]"
    >
      {/* Section title — constrained width */}
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-10 md:pt-28 md:pb-14">
        <div data-header>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/30">
            Spartan Racing
          </p>
          <h2
            className="mt-2 font-display font-bold uppercase leading-none tracking-tight text-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            Track Record
          </h2>
        </div>
      </div>

      {/* Table header — full width */}
      <div
        data-header
        className="hidden md:grid items-end border-b border-white/10 pb-3 mb-0 px-8 lg:px-16"
        style={{
          gridTemplateColumns: "80px 1fr 240px 140px 100px",
        }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
          #
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
          Event
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
          Competition
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 text-right">
          Finish
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 text-right">
          Year
        </span>
      </div>

      {/* Result rows — full width, edge to edge */}
      <div className="flex flex-col">
        {results.map((result, i) => (
          <div
            key={`${result.competition}-${result.event}-${result.year}`}
            data-row
            className="relative border-b border-white/[0.06] overflow-hidden"
          >
            {/* Gold reveal bar */}
            <div
              data-bar
              className="absolute inset-0 z-10 bg-gold pointer-events-none"
              style={{ transform: "scaleX(0)", transformOrigin: "left" }}
            />

            {/* Desktop row content */}
            <div
              data-content
              className="hidden md:grid items-center px-8 lg:px-16 group/row cursor-default hover:bg-gold"
              style={{
                gridTemplateColumns: "80px 1fr 240px 140px 100px",
                minHeight: "clamp(68px, 10vw, 88px)",
              }}
            >
              <span
                className="font-display font-bold text-white/15 group-hover/row:text-black/20"
                style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3
                className="font-display font-bold uppercase text-white tracking-wide group-hover/row:text-black"
                style={{ fontSize: "clamp(1.2rem, 2.8vw, 1.9rem)" }}
              >
                {result.event}
              </h3>

              <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 group-hover/row:text-black/60">
                {result.competition}
              </span>

              <span
                className="font-display font-bold text-gold text-right group-hover/row:text-black"
                style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)" }}
              >
                {result.result}
              </span>

              <span className="font-mono text-sm text-white/40 text-right tabular-nums group-hover/row:text-black/60">
                {result.year}
              </span>
            </div>

            {/* Mobile row content */}
            <div
              data-content
              className="flex md:hidden items-center justify-between px-6 py-5"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base font-bold uppercase text-white tracking-wide truncate">
                  {result.event}
                </h3>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-white/30">
                  {result.competition} · {result.year}
                </p>
              </div>
              <span className="ml-4 font-display text-xl font-bold text-gold flex-shrink-0">
                {result.result}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom spacing */}
      <div className="h-16 md:h-24" />
    </section>
  );
}
