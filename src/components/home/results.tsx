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

function animateElement(
  el: HTMLElement,
  from: { y?: number; opacity?: number },
  to: { y?: number; opacity?: number },
  duration: number,
  delay: number
) {
  const startY = from.y ?? 0;
  const startO = from.opacity ?? 0;
  const endY = to.y ?? 0;
  const endO = to.opacity ?? 1;

  el.style.opacity = String(startO);
  el.style.transform = `translateY(${startY}px)`;

  setTimeout(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      el.style.opacity = String(startO + (endO - startO) * eased);
      el.style.transform = `translateY(${startY + (endY - startY) * eased}px)`;

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
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1 },
                500,
                i * 100
              );
            });
            rows.forEach((el, i) => {
              animateElement(
                el,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1 },
                400,
                200 + i * 80
              );
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
      {/* Decorative pit board — the sign held over the pit wall during races */}
      <div
        className="pointer-events-none absolute right-8 top-16 z-20 hidden select-none lg:block"
        style={{ transform: "rotate(4deg)" }}
      >
        <div
          className="flex flex-col items-center rounded-sm border-2 border-white/20 bg-black px-8 py-6 shadow-2xl"
          style={{
            minWidth: "160px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
          }}
        >
          {/* Position */}
          <span
            className="font-display font-bold leading-none text-gold"
            style={{ fontSize: "4.5rem" }}
          >
            P1
          </span>
          {/* Divider */}
          <div className="my-2 h-px w-full bg-white/20" />
          {/* Lap / gap info */}
          <span className="font-mono text-sm font-bold tracking-wider text-white/70">
            LAP 22
          </span>
          <span className="mt-1 font-mono text-xs tracking-wider text-green-400">
            +3.2s
          </span>
          {/* Team marker */}
          <div className="mt-3 h-1.5 w-full rounded-full bg-gold" />
        </div>
        {/* Board handle */}
        <div className="mx-auto h-16 w-2 bg-white/10 rounded-b" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* Section title */}
        <div data-header className="mb-10 md:mb-14">
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

        {/* Desktop table header */}
        <div
          data-header
          className="hidden md:grid items-end border-b border-white/10 pb-3 mb-1"
          style={{
            gridTemplateColumns: "60px 1fr 220px 120px 80px",
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

        {/* Result rows */}
        <div className="flex flex-col">
          {results.map((result, i) => (
            <div
              key={`${result.competition}-${result.event}-${result.year}`}
              data-row
              className="group/row border-b border-white/[0.06] hover:border-transparent cursor-default"
            >
              {/* Desktop row */}
              <div
                className="hidden md:grid items-center px-4 -mx-4 rounded-sm group-hover/row:bg-gold"
                style={{
                  gridTemplateColumns: "60px 1fr 220px 120px 80px",
                  minHeight: "clamp(64px, 9vw, 80px)",
                }}
              >
                <span
                  className="font-display font-bold text-white/15 group-hover/row:text-black/20"
                  style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3
                  className="font-display font-bold uppercase text-white tracking-wide group-hover/row:text-black"
                  style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.7rem)" }}
                >
                  {result.event}
                </h3>

                <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 group-hover/row:text-black/60">
                  {result.competition}
                </span>

                <span
                  className="font-display font-bold text-gold text-right group-hover/row:text-black"
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
                >
                  {result.result}
                </span>

                <span className="font-mono text-sm text-white/40 text-right tabular-nums group-hover/row:text-black/60">
                  {result.year}
                </span>
              </div>

              {/* Mobile row */}
              <div className="flex md:hidden items-center justify-between py-5">
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
      </div>
    </section>
  );
}
