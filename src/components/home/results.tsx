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
          background: "linear-gradient(90deg, #C2850C, #D4980F)",
        }}
      />

      {/* Desktop row */}
      <div
        data-content
        className="hidden md:grid items-center px-6 lg:px-14 cursor-default"
        style={{
          gridTemplateColumns: "1fr 220px 140px 85px",
          minHeight: "clamp(66px, 9vw, 83px)",
          background: hovered ? "linear-gradient(90deg, #C2850C, #D4980F)" : "transparent",
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
            color: hovered ? "#0e0e0e" : "#C2850C",
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
          style={{ fontSize: "1.25rem", fontStyle: "italic", color: "#C2850C" }}
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
      className="relative w-full bg-background py-12 md:py-20"
    >
    <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
    <div className="relative overflow-hidden" style={{ background: "#0e0e0e" }}>
      {/* ── Pulsating wave lines ── */}
      <style>{`
        @keyframes waveLine1 {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-12px); }
        }
        @keyframes waveLine2 {
          0%, 100% { opacity: 0.6; transform: translateY(0); }
          50% { opacity: 0.3; transform: translateY(10px); }
        }
        @keyframes waveLine3 {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 0.9; transform: translateY(-14px); }
        }
        @keyframes waveLine4 {
          0%, 100% { opacity: 0.5; transform: translateY(0); }
          50% { opacity: 0.25; transform: translateY(8px); }
        }
        @keyframes waveLine5 {
          0%, 100% { opacity: 0.35; transform: translateY(0); }
          50% { opacity: 0.85; transform: translateY(-10px); }
        }
        @keyframes waveLine6 {
          0%, 100% { opacity: 0.45; transform: translateY(0); }
          50% { opacity: 0.2; transform: translateY(12px); }
        }
        @keyframes waveLine7 {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 0.75; transform: translateY(-8px); }
        }
        @keyframes waveLine8 {
          0%, 100% { opacity: 0.5; transform: translateY(0); }
          50% { opacity: 0.9; transform: translateY(-11px); }
        }
        @keyframes waveLine9 {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50% { opacity: 0.2; transform: translateY(9px); }
        }
        @keyframes waveLine10 {
          0%, 100% { opacity: 0.35; transform: translateY(0); }
          50% { opacity: 0.8; transform: translateY(-13px); }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Line 1 */}
        <svg className="absolute w-full" style={{ top: "5%", left: 0, height: "40px", animationName: "waveLine1", animationDuration: "7s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }} viewBox="0 0 1440 40" preserveAspectRatio="none" fill="none">
          <path d="M0 20C180 8 360 32 540 20C720 8 900 32 1080 20C1260 8 1380 28 1440 20" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" />
        </svg>
        {/* Line 2 */}
        <svg className="absolute w-full" style={{ top: "15%", left: 0, height: "40px", animationName: "waveLine2", animationDuration: "9s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }} viewBox="0 0 1440 40" preserveAspectRatio="none" fill="none">
          <path d="M0 20C240 6 480 34 720 20C960 6 1200 34 1440 20" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        </svg>
        {/* Line 3 */}
        <svg className="absolute w-full" style={{ top: "26%", left: 0, height: "40px", animationName: "waveLine3", animationDuration: "11s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }} viewBox="0 0 1440 40" preserveAspectRatio="none" fill="none">
          <path d="M0 22C300 10 600 34 900 18C1100 6 1300 30 1440 22" stroke="rgba(255,255,255,0.18)" strokeWidth="3" />
        </svg>
        {/* Line 4 */}
        <svg className="absolute w-full" style={{ top: "37%", left: 0, height: "40px", animationName: "waveLine4", animationDuration: "13s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }} viewBox="0 0 1440 40" preserveAspectRatio="none" fill="none">
          <path d="M0 18C200 30 400 8 600 22C800 36 1000 10 1200 24C1350 32 1420 16 1440 20" stroke="rgba(255,255,255,0.13)" strokeWidth="2" />
        </svg>
        {/* Line 5 */}
        <svg className="absolute w-full" style={{ top: "48%", left: 0, height: "40px", animationName: "waveLine5", animationDuration: "10s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }} viewBox="0 0 1440 40" preserveAspectRatio="none" fill="none">
          <path d="M0 20C160 32 320 8 480 20C640 32 800 8 960 20C1120 32 1280 8 1440 20" stroke="rgba(255,255,255,0.16)" strokeWidth="2.5" />
        </svg>
        {/* Line 6 */}
        <svg className="absolute w-full" style={{ top: "58%", left: 0, height: "40px", animationName: "waveLine6", animationDuration: "8s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }} viewBox="0 0 1440 40" preserveAspectRatio="none" fill="none">
          <path d="M0 20C200 10 400 30 600 20C800 10 1000 30 1200 20C1350 12 1420 28 1440 20" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
        </svg>
        {/* Line 7 */}
        <svg className="absolute w-full" style={{ top: "68%", left: 0, height: "40px", animationName: "waveLine7", animationDuration: "12s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }} viewBox="0 0 1440 40" preserveAspectRatio="none" fill="none">
          <path d="M0 22C280 8 560 36 840 20C1020 8 1260 32 1440 18" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5" />
        </svg>
        {/* Line 8 */}
        <svg className="absolute w-full" style={{ top: "78%", left: 0, height: "40px", animationName: "waveLine8", animationDuration: "9.5s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }} viewBox="0 0 1440 40" preserveAspectRatio="none" fill="none">
          <path d="M0 18C180 30 360 10 540 22C720 34 900 12 1080 24C1260 34 1380 14 1440 20" stroke="rgba(255,255,255,0.17)" strokeWidth="3" />
        </svg>
        {/* Line 9 */}
        <svg className="absolute w-full" style={{ top: "87%", left: 0, height: "40px", animationName: "waveLine9", animationDuration: "14s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }} viewBox="0 0 1440 40" preserveAspectRatio="none" fill="none">
          <path d="M0 20C320 6 640 34 960 20C1120 12 1300 30 1440 22" stroke="rgba(255,255,255,0.13)" strokeWidth="2" />
        </svg>
        {/* Line 10 */}
        <svg className="absolute w-full" style={{ top: "95%", left: 0, height: "40px", animationName: "waveLine10", animationDuration: "11.5s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }} viewBox="0 0 1440 40" preserveAspectRatio="none" fill="none">
          <path d="M0 22C240 10 480 32 720 18C960 6 1200 30 1440 20" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" />
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
              color: "#C2850C",
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
          style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#8B6914" }}
        >
          Event
        </span>
        <span
          className="font-display font-bold uppercase"
          style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#8B6914" }}
        >
          Competition
        </span>
        <span
          className="font-display font-bold uppercase text-right"
          style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#8B6914" }}
        >
          Finish
        </span>
        <span
          className="font-display font-bold uppercase text-right"
          style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#8B6914" }}
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
    </div>
    </div>
    </section>
  );
}
