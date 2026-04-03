"use client";

import { useState, useCallback } from "react";

const pages = [
  { issue: "Issue #1", season: "Spring 2025", color: "#C8A850" },
  { issue: "Issue #2", season: "Fall 2024", color: "#A0C4FF" },
  { issue: "Issue #3", season: "Spring 2024", color: "#BDB2FF" },
  { issue: "Issue #4", season: "Fall 2023", color: "#FFD6A5" },
];

const keyframesStyle = `
@keyframes flipOut {
  from { transform: perspective(1200px) rotateY(0deg); opacity: 1; }
  to { transform: perspective(1200px) rotateY(-90deg); opacity: 0; }
}
@keyframes flipIn {
  from { transform: perspective(1200px) rotateY(90deg); opacity: 0; }
  to { transform: perspective(1200px) rotateY(0deg); opacity: 1; }
}
@keyframes dotPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}
.flip-out {
  animation: flipOut 0.35s ease-in forwards;
}
.flip-in {
  animation: flipIn 0.35s ease-out forwards;
}
.dot-active {
  animation: dotPulse 0.4s ease-in-out;
}
`;

export function Newsletter() {
  const [currentPage, setCurrentPage] = useState(0);
  const [animClass, setAnimClass] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const goToPage = useCallback(
    (next: number) => {
      if (isAnimating || next === currentPage) return;
      setIsAnimating(true);
      setAnimClass("flip-out");

      setTimeout(() => {
        setCurrentPage(next);
        setAnimClass("flip-in");

        setTimeout(() => {
          setAnimClass("");
          setIsAnimating(false);
        }, 350);
      }, 350);
    },
    [isAnimating, currentPage]
  );

  const prev = () => {
    if (currentPage > 0) goToPage(currentPage - 1);
  };

  const next = () => {
    if (currentPage < pages.length - 1) goToPage(currentPage + 1);
  };

  const page = pages[currentPage];

  return (
    <section className="relative w-full bg-[#0A0A0A] py-24">
      <style dangerouslySetInnerHTML={{ __html: keyframesStyle }} />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section label */}
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
          Our Newsletter
        </span>

        <h2 className="mt-4 font-display text-[clamp(1.5rem,3vw,2.5rem)] uppercase leading-[1.1] tracking-tight text-white">
          The Spartan Standard
        </h2>

        {/* Flipbook container */}
        <div className="mt-12 flex items-center justify-center gap-6">
          {/* Left arrow */}
          <button
            onClick={prev}
            disabled={currentPage === 0 || isAnimating}
            aria-label="Previous page"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Page card */}
          <div
            className={`relative flex h-[420px] w-[300px] flex-col items-center justify-center rounded-none border border-white/10 bg-[#1E1E1E] sm:h-[480px] sm:w-[340px] ${animClass}`}
            style={{ transformOrigin: "center center" }}
          >
            {/* Decorative top rule */}
            <div
              className="mb-6 h-px w-16"
              style={{ backgroundColor: page.color }}
            />

            {/* Issue number */}
            <span
              className="font-mono text-[11px] uppercase tracking-[0.25em]"
              style={{ color: page.color }}
            >
              {page.issue}
            </span>

            {/* Title */}
            <h3 className="mt-4 text-center font-display text-2xl uppercase leading-tight tracking-tight text-white sm:text-3xl">
              The Spartan
              <br />
              Standard
            </h3>

            {/* Season */}
            <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.15em] text-white/40">
              {page.season}
            </p>

            {/* Decorative bottom rule */}
            <div
              className="mt-6 h-px w-16"
              style={{ backgroundColor: page.color }}
            />

            {/* Bottom corner page number */}
            <span className="absolute bottom-5 right-6 font-mono text-[10px] text-white/20">
              {currentPage + 1} / {pages.length}
            </span>
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            disabled={currentPage === pages.length - 1 || isAnimating}
            aria-label="Next page"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Page indicators */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              aria-label={`Go to page ${i + 1}`}
              className={`h-2 w-2 rounded-full ${
                i === currentPage
                  ? `bg-gold ${animClass === "" ? "dot-active" : ""}`
                  : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
