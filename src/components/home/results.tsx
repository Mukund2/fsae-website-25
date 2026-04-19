"use client";

import { useEffect, useRef } from "react";

const results = [
  {
    stat: "1ST",
    event: "OVERALL",
    competition: "FSAE LINCOLN 2015",
    color: "#0055A2",
    colorDark: "#003D7A",
  },
  {
    stat: "1ST",
    event: "ENDURANCE",
    competition: "MICHIGAN FSAE 2025",
    color: "#B8965A",
    colorDark: "#8E7343",
  },
  {
    stat: "2ND",
    event: "OVERALL",
    competition: "MICHIGAN FSAE 2025",
    color: "#0055A2",
    colorDark: "#003D7A",
  },
  {
    stat: "1ST",
    event: "ENDURANCE",
    competition: "MICHIGAN FSAE 2021",
    color: "#B8965A",
    colorDark: "#8E7343",
  },
  {
    stat: "1ST",
    event: "INNOVATION AWARD",
    competition: "MICHIGAN FSAE 2024",
    color: "#C43C2D",
    colorDark: "#9A2E22",
  },
  {
    stat: "1ST",
    event: "EV \u2014 SOCAL SHOOTOUT",
    competition: "2024 (x2)",
    color: "#1A8B52",
    colorDark: "#146B3F",
  },
];

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
    rows.forEach((el) => { el.style.opacity = "0"; });
    const header = section.querySelector<HTMLElement>("[data-header]");
    if (header) header.style.opacity = "0";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (header) {
              animateElement(header, { x: -40, opacity: 0 }, { x: 0, opacity: 1 }, 500, 0);
            }
            rows.forEach((el, i) => {
              animateElement(el, { x: -100, opacity: 0 }, { x: 0, opacity: 1 }, 400, 250 + i * 100);
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
    <section ref={sectionRef} className="relative w-full overflow-hidden" style={{ background: "linear-gradient(180deg, #0D1117 0%, #101820 100%)" }}>
      {/* Smooth gradient fade from page bg */}
      <div
        className="absolute left-0 right-0 top-0 -translate-y-full pointer-events-none"
        style={{ height: "160px", background: "linear-gradient(to bottom, transparent, #0D1117)" }}
      />

      {/* Diagonal red accent slashes - top right corner like F1 */}
      <div className="absolute top-0 right-0 w-[300px] h-[200px] pointer-events-none overflow-hidden">
        <div className="absolute" style={{ top: "-20px", right: "-60px", width: "200px", height: "400px", background: "linear-gradient(155deg, transparent 44%, rgba(196,60,45,0.25) 45%, rgba(196,60,45,0.25) 47%, transparent 48%)" }} />
        <div className="absolute" style={{ top: "-20px", right: "-30px", width: "200px", height: "400px", background: "linear-gradient(155deg, transparent 44%, rgba(196,60,45,0.15) 45%, rgba(196,60,45,0.15) 47%, transparent 48%)" }} />
      </div>

      {/* Diagonal accent - bottom left */}
      <div className="absolute bottom-0 left-0 w-[200px] h-[150px] pointer-events-none overflow-hidden">
        <div className="absolute" style={{ bottom: "-20px", left: "-40px", width: "200px", height: "300px", background: "linear-gradient(155deg, transparent 44%, rgba(196,60,45,0.12) 45%, rgba(196,60,45,0.12) 47%, transparent 48%)" }} />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
        {/* F1 broadcast-style header */}
        <div data-header className="mb-6 md:mb-10">
          <div className="flex items-end gap-4 md:gap-6">
            <div>
              <p className="font-display text-[11px] md:text-sm font-bold uppercase tracking-[0.2em] text-white/40">
                Spartan Racing
              </p>
              <h2
                className="font-display font-bold uppercase leading-[0.82] tracking-tight text-white"
                style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", fontStyle: "italic" }}
              >
                Track
                <br />
                Record
              </h2>
            </div>
            <div className="hidden md:block mb-2">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
                Key Results
              </p>
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "#C43C2D" }}>
                2015 &mdash; 2025
              </p>
            </div>
          </div>
        </div>

        {/* F1-style leaderboard */}
        <div className="flex flex-col gap-[2px]">
          {results.map((result, i) => (
            <div
              key={`${result.competition}-${result.event}`}
              data-row
              className="relative flex items-stretch"
              style={{ height: "clamp(64px, 10vw, 82px)" }}
            >
              {/* Rank number column - dark */}
              <div
                className="flex w-[44px] md:w-[56px] flex-shrink-0 items-center justify-center"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <span
                  className="font-display font-bold text-white/30"
                  style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", fontStyle: "italic" }}
                >
                  {i + 1}
                </span>
              </div>

              {/* Team color bar with event name */}
              <div
                className="flex flex-1 items-center px-4 md:px-6 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${result.color} 0%, ${result.colorDark} 100%)`,
                }}
              >
                {/* Subtle diagonal texture inside the bar */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "repeating-linear-gradient(135deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 21px)",
                  }}
                />

                <div className="relative flex items-center gap-3 md:gap-5 w-full">
                  {/* Event name - massive bold italic */}
                  <h3
                    className="font-display font-bold uppercase text-white truncate"
                    style={{ fontSize: "clamp(1.1rem, 3vw, 1.8rem)", fontStyle: "italic", letterSpacing: "0.02em" }}
                  >
                    {result.event}
                  </h3>

                  {/* Competition - small text, right aligned on desktop */}
                  <span className="hidden md:block ml-auto font-mono text-[10px] uppercase tracking-[0.1em] text-white/50 flex-shrink-0">
                    {result.competition}
                  </span>
                </div>
              </div>

              {/* Points/stat column - white background, dark text like F1 */}
              <div
                className="flex w-[72px] md:w-[100px] flex-shrink-0 items-center justify-center relative"
                style={{ background: "#E8E8E8" }}
              >
                {/* Skewed left edge for that F1 cut feel */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-3 -translate-x-full"
                  style={{
                    background: "#E8E8E8",
                    clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                  }}
                />
                <span
                  className="font-display font-bold uppercase text-[#0D1117] relative z-10"
                  style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", fontStyle: "italic" }}
                >
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
