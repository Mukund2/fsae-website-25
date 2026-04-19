"use client";

import { useEffect, useRef, useState } from "react";

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
    event: "EV, SOCAL SHOOTOUT",
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

/* ── Roll text on hover ── */
function RollText({ text, className, style, rolling }: { text: string; className?: string; style?: React.CSSProperties; rolling: boolean }) {
  const [state, setState] = useState<"idle" | "up" | "down">("idle");
  const prevRolling = useRef(false);

  useEffect(() => {
    if (rolling && !prevRolling.current) setState("up");
    if (!rolling && prevRolling.current) setState("down");
    prevRolling.current = rolling;
  }, [rolling]);

  return (
    <span
      className={className}
      style={{
        ...style,
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom",
        position: "relative",
      }}
    >
      <span
        style={{
          display: "block",
          position: "relative",
          animationName: state === "up" ? "rollUp" : state === "down" ? "rollDown" : "none",
          animationDuration: "0.22s",
          animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          animationFillMode: "forwards",
        }}
        onAnimationEnd={() => { if (state === "down") setState("idle"); }}
      >
        {text}
        <span
          aria-hidden
          style={{
            display: "block",
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
          }}
        >
          {text}
        </span>
      </span>
    </span>
  );
}

function ResultRow({ result }: { result: typeof results[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
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
        className="hidden md:grid items-center px-6 lg:px-14 cursor-default"
        style={{
          gridTemplateColumns: "1fr 220px 140px 85px",
          minHeight: "clamp(66px, 9vw, 83px)",
          background: hovered ? "linear-gradient(90deg, #C8A24E, #D4B05A)" : "transparent",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <RollText
          text={result.event}
          rolling={hovered}
          className="font-display font-black uppercase tracking-wide"
          style={{
            fontSize: "clamp(1.15rem, 2.6vw, 1.8rem)",
            fontStyle: "italic",
            letterSpacing: "0.02em",
            color: hovered ? "#0e0e0e" : "#ffffff",
          }}
        />

        <span
          className="font-display font-medium uppercase"
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.15em",
            color: hovered ? "rgba(14,14,14,0.6)" : "rgba(255,255,255,0.7)",
          }}
        >
          {result.competition}
        </span>

        <span
          className="font-display font-black text-right"
          style={{
            fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
            fontStyle: "italic",
            color: hovered ? "#0e0e0e" : "#C8A24E",
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
          className="font-display font-medium text-right tabular-nums"
          style={{
            fontSize: "0.8rem",
            color: hovered ? "rgba(14,14,14,0.5)" : "rgba(255,255,255,0.5)",
          }}
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
            style={{ fontSize: "0.95rem", fontStyle: "italic" }}
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
          style={{ fontSize: "1.25rem", fontStyle: "italic", color: "#C8A24E" }}
        >
          {result.result.replace(/(\d+)(ST|ND|RD|TH)/i, "$1")}
          <span
            className="font-display font-bold uppercase"
            style={{ fontSize: "0.5em", verticalAlign: "super", lineHeight: 1 }}
          >
            {result.result.match(/(ST|ND|RD|TH)/i)?.[0] ?? ""}
          </span>
        </span>
      </div>
    </div>
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
      {/* ── Pulsating wave background ── */}
      <style>{`
        @keyframes wavePulse1 {
          0%, 100% { opacity: 0.6; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.08); }
        }
        @keyframes wavePulse2 {
          0%, 100% { opacity: 1; transform: scaleY(1.05); }
          50% { opacity: 0.5; transform: scaleY(0.95); }
        }
        @keyframes wavePulse3 {
          0%, 100% { opacity: 0.7; transform: scaleY(0.95); }
          50% { opacity: 1; transform: scaleY(1.1); }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Wave 1 — top area */}
        <svg
          className="absolute w-full"
          style={{
            top: "10%",
            left: 0,
            height: "220px",
            animationName: "wavePulse1",
            animationDuration: "8s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            transformOrigin: "center center",
          }}
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 120C240 40 480 180 720 100C960 20 1200 160 1440 80V220H0Z"
            fill="rgba(255,255,255,0.025)"
          />
          <path
            d="M0 160C200 100 400 200 720 130C1040 60 1240 170 1440 120V220H0Z"
            fill="rgba(255,255,255,0.015)"
          />
        </svg>

        {/* Wave 2 — middle area */}
        <svg
          className="absolute w-full"
          style={{
            top: "40%",
            left: 0,
            height: "250px",
            animationName: "wavePulse2",
            animationDuration: "11s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            transformOrigin: "center center",
          }}
          viewBox="0 0 1440 250"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 80C360 160 720 20 1080 100C1260 140 1380 60 1440 90V250H0Z"
            fill="rgba(255,255,255,0.03)"
          />
          <path
            d="M0 140C180 80 540 190 900 110C1140 60 1320 150 1440 100V250H0Z"
            fill="rgba(255,255,255,0.02)"
          />
        </svg>

        {/* Wave 3 — bottom area */}
        <svg
          className="absolute w-full"
          style={{
            bottom: "0",
            left: 0,
            height: "200px",
            animationName: "wavePulse3",
            animationDuration: "14s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            transformOrigin: "center center",
          }}
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 60C300 140 600 20 900 80C1200 140 1350 40 1440 70V200H0Z"
            fill="rgba(255,255,255,0.025)"
          />
          <path
            d="M0 100C240 40 480 150 720 90C960 30 1200 130 1440 60V200H0Z"
            fill="rgba(255,255,255,0.018)"
          />
        </svg>
      </div>

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
          <ResultRow key={`${result.competition}-${result.event}-${result.year}`} result={result} />
        ))}
      </div>

      {/* Bottom spacing */}
      <div className="h-16 md:h-24" />
    </section>
  );
}
