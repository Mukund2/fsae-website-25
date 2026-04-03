"use client";

import { useState, useCallback } from "react";

const newsletters = [
  {
    date: "March 2026",
    headlines: ["System Spotlights", "What's Next?", "Sponsor Recognition"],
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_234414049a954679966f200b229aee64.pdf",
  },
  {
    date: "February 2026",
    headlines: ["Ready to Build", "Alumni Driver Day", "Subteam Spotlight"],
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_96fb6ce5ecbf4feab0491278f70f07e0.pdf",
  },
  {
    date: "Winter 2026",
    headlines: ["2026 Team Resolutions", "Support Manufacturing Season"],
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_23a0bf9e19ea4f34abb5746375101d73.pdf",
  },
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
.flip-out {
  animation: flipOut 0.35s ease-in forwards;
}
.flip-in {
  animation: flipIn 0.35s ease-out forwards;
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
    if (currentPage < newsletters.length - 1) goToPage(currentPage + 1);
  };

  const issue = newsletters[currentPage];

  return (
    <section className="relative w-full bg-background py-28 md:py-36">
      <style dangerouslySetInnerHTML={{ __html: keyframesStyle }} />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
          Newsletters
        </span>

        {/* Flipbook container */}
        <div className="mt-12 flex items-center justify-center gap-8">
          {/* Left arrow */}
          <button
            onClick={prev}
            disabled={currentPage === 0 || isAnimating}
            aria-label="Previous newsletter"
            className="flex h-10 w-10 shrink-0 items-center justify-center text-foreground/40 hover:text-foreground disabled:opacity-10 disabled:cursor-not-allowed"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Newsletter card */}
          <div
            className={`relative flex h-[460px] w-[320px] flex-col justify-between border border-border bg-surface p-10 sm:h-[520px] sm:w-[380px] ${animClass}`}
            style={{ transformOrigin: "center center" }}
          >
            {/* Top section */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                {issue.date}
              </p>

              <h3 className="mt-8 font-display text-3xl uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
                Spartan Racing
                <br />
                Newsletter
              </h3>
            </div>

            {/* Headlines */}
            <div className="flex flex-col gap-3">
              {issue.headlines.map((headline) => (
                <p
                  key={headline}
                  className="font-mono text-[12px] uppercase tracking-[0.15em] text-foreground/50"
                >
                  {headline}
                </p>
              ))}
            </div>

            {/* Bottom: Read link + page number */}
            <div className="flex items-end justify-between">
              <a
                href={issue.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] uppercase tracking-[0.15em] text-gold hover:text-foreground"
              >
                Read More
              </a>
              <span className="font-mono text-[10px] text-foreground/30">
                {currentPage + 1} / {newsletters.length}
              </span>
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            disabled={currentPage === newsletters.length - 1 || isAnimating}
            aria-label="Next newsletter"
            className="flex h-10 w-10 shrink-0 items-center justify-center text-foreground/40 hover:text-foreground disabled:opacity-10 disabled:cursor-not-allowed"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Page indicators */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {newsletters.map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              aria-label={`Go to newsletter ${i + 1}`}
              className={`h-1.5 w-1.5 rounded-full ${
                i === currentPage ? "bg-gold" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
