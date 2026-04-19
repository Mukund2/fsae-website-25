"use client";

import { useEffect, useRef, useCallback, useState } from "react";

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

/* ── Gold bar reveal animation ── */
function revealRow(row: HTMLElement, delay: number) {
  const content = row.querySelector<HTMLElement>("[data-content]");
  const bar = row.querySelector<HTMLElement>("[data-bar]");
  if (!content || !bar) return;

  content.style.opacity = "0";
  content.style.transform = "translateX(-60px)";
  bar.style.transform = "scaleX(0)";
  bar.style.transformOrigin = "left";

  setTimeout(() => {
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
        content.style.opacity = "1";
        content.style.transform = "translateX(-40px)";
        bar.style.transformOrigin = "right";

        const phase2Start = performance.now();
        const barOutDuration = 400;
        const contentSlideDuration = 500;

        const tickPhase2 = (now2: number) => {
          const elapsed2 = now2 - phase2Start;
          const pBar = Math.min(elapsed2 / barOutDuration, 1);
          const easedBar = 1 - Math.pow(1 - pBar, 3);
          bar.style.transform = `scaleX(${1 - easedBar})`;

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

/* ── Glitch text on hover ── */
const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@&%!?";

function GlitchText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const startGlitch = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const chars = text.split("");
    const totalDuration = 400;
    const stepsPerChar = 3;
    let step = 0;
    const totalSteps = chars.length * stepsPerChar;

    const tick = () => {
      step++;
      const resolved = Math.floor((step / totalSteps) * chars.length);
      const next = chars.map((ch, i) => {
        if (ch === " " || ch === "—") return ch;
        if (i < resolved) return ch;
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      });
      setDisplay(next.join(""));

      if (step < totalSteps) {
        timeoutRef.current = setTimeout(() => {
          rafRef.current = requestAnimationFrame(tick);
        }, totalDuration / totalSteps);
      } else {
        setDisplay(text);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [text]);

  const stopGlitch = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDisplay(text);
  }, [text]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <span
      className={className}
      style={style}
      onMouseEnter={startGlitch}
      onMouseLeave={stopGlitch}
    >
      {display}
    </span>
  );
}

export function Results() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rows = section.querySelectorAll<HTMLElement>("[data-row]");
    rows.forEach((el) => {
      const content = el.querySelector<HTMLElement>("[data-content]");
      if (content) content.style.opacity = "0";
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
              animateElement(el, { x: -40, opacity: 0 }, { x: 0, opacity: 1 }, 600, i * 120);
            });
            rows.forEach((el, i) => {
              revealRow(el, 350 + i * 120);
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
      className="relative w-full overflow-hidden"
      style={{ background: "#0e0e0e" }}
    >
      {/* ── Title block ── */}
      <div className="px-6 lg:px-14 pt-20 pb-10 md:pt-26 md:pb-13">
        <div data-header>
          <h2
            className="font-display font-bold uppercase leading-[0.9] tracking-tight text-white"
            style={{ fontSize: "clamp(2.5rem, 6.6vw, 5rem)", fontStyle: "italic" }}
          >
            Track Record
          </h2>
          <p
            className="leading-[0.9] tracking-tight"
            style={{
              fontSize: "clamp(2.5rem, 6.6vw, 5rem)",
              fontStyle: "italic",
              color: "#C8A24E",
              fontFamily: "var(--font-script), serif",
            }}
          >
            Highlights
          </p>
        </div>
      </div>

      {/* ── Column headers ── */}
      <div
        data-header
        className="hidden md:grid items-end pb-3 mb-0 px-6 lg:px-14"
        style={{
          gridTemplateColumns: "1fr 220px 140px 85px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <span
          className="font-display font-bold uppercase"
          style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#8A7A50" }}
        >
          Event
        </span>
        <span
          className="font-display font-bold uppercase"
          style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#8A7A50" }}
        >
          Competition
        </span>
        <span
          className="font-display font-bold uppercase text-right"
          style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#8A7A50" }}
        >
          Finish
        </span>
        <span
          className="font-display font-bold uppercase text-right"
          style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#8A7A50" }}
        >
          Year
        </span>
      </div>

      {/* ── Result rows ── */}
      <div className="flex flex-col">
        {results.map((result) => (
          <div
            key={`${result.competition}-${result.event}-${result.year}`}
            data-row
            className="relative overflow-hidden"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
          >
            {/* Gold reveal bar */}
            <div
              data-bar
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                transform: "scaleX(0)",
                transformOrigin: "left",
                background: "linear-gradient(90deg, #C8A24E, #D4B05A)",
              }}
            />

            {/* Desktop row */}
            <div
              data-content
              className="hidden md:grid items-center px-6 lg:px-14 group/row cursor-default"
              style={{
                gridTemplateColumns: "1fr 220px 140px 85px",
                minHeight: "clamp(66px, 9vw, 83px)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "linear-gradient(90deg, #C8A24E, #D4B05A)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <GlitchText
                text={result.event}
                className="font-display font-black uppercase text-white tracking-wide group-hover/row:text-[#0e0e0e]"
                style={{
                  fontSize: "clamp(1.15rem, 2.6vw, 1.8rem)",
                  fontStyle: "italic",
                  letterSpacing: "0.02em",
                }}
              />

              <span
                className="font-display font-medium uppercase text-white/70 group-hover/row:text-[#0e0e0e]/60"
                style={{ fontSize: "0.68rem", letterSpacing: "0.15em" }}
              >
                {result.competition}
              </span>

              <span
                className="font-display font-black text-right group-hover/row:text-[#0e0e0e]"
                style={{
                  fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                  fontStyle: "italic",
                  color: "#C8A24E",
                }}
              >
                {result.result.replace(/(\d+)(ST|ND|RD|TH)/i, "$1")}
                <span
                  className="font-display font-bold uppercase"
                  style={{
                    fontSize: "0.5em",
                    verticalAlign: "super",
                    lineHeight: 1,
                  }}
                >
                  {result.result.match(/(ST|ND|RD|TH)/i)?.[0] ?? ""}
                </span>
              </span>

              <span
                className="font-display font-medium text-white/50 text-right tabular-nums group-hover/row:text-[#0e0e0e]/50"
                style={{ fontSize: "0.8rem" }}
              >
                {result.year}
              </span>
            </div>

            {/* Mobile row */}
            <div
              data-content
              className="flex md:hidden items-center justify-between px-5 py-5"
            >
              <div className="flex-1 min-w-0">
                <h3
                  className="font-display font-black uppercase text-white tracking-wide truncate"
                  style={{
                    fontSize: "0.95rem",
                    fontStyle: "italic",
                  }}
                >
                  {result.event}
                </h3>
                <p
                  className="mt-1 font-display font-medium uppercase text-white/50"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.15em" }}
                >
                  {result.competition} · {result.year}
                </p>
              </div>
              <span
                className="ml-4 font-display font-black flex-shrink-0"
                style={{
                  fontSize: "1.25rem",
                  fontStyle: "italic",
                  color: "#C8A24E",
                }}
              >
                {result.result.replace(/(\d+)(ST|ND|RD|TH)/i, "$1")}
                <span
                  className="font-display font-bold uppercase"
                  style={{
                    fontSize: "0.5em",
                    verticalAlign: "super",
                    lineHeight: 1,
                  }}
                >
                  {result.result.match(/(ST|ND|RD|TH)/i)?.[0] ?? ""}
                </span>
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
