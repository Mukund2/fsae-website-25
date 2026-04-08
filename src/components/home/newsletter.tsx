"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const InlineFlipbook = dynamic(
  () => import("./inline-flipbook").then((m) => m.InlineFlipbook),
  { ssr: false }
);

const newsletters = [
  {
    date: "March 2026",
    title: "System Spotlights",
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_234414049a954679966f200b229aee64.pdf",
  },
  {
    date: "February 2026",
    title: "Ready to Build",
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_96fb6ce5ecbf4feab0491278f70f07e0.pdf",
  },
  {
    date: "New Year 2026",
    title: "2026 Team Resolutions",
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_23a0bf9e19ea4f34abb5746375101d73.pdf",
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

export function Newsletter() {
  const [active, setActive] = useState(0);
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
              const dir = el.getAttribute("data-anim");
              if (dir === "left") {
                animateElement(el, { x: -40, opacity: 0 }, { x: 0, opacity: 1 }, 600, i * 100);
              } else {
                animateElement(el, { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, 600, i * 100);
              }
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

  const current = newsletters[active];

  return (
    <section ref={sectionRef} className="w-full bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div data-anim="left">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Newsletter
          </p>
          <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3.5rem)] uppercase leading-[0.95] tracking-tight">
            <span className="font-bold text-foreground">Up to</span>
            <br />
            <span className="font-light text-foreground/40">Speed</span>
          </h2>
        </div>

        {/* Newsletter tabs */}
        <div data-anim="up" className="mt-8 flex flex-wrap gap-3">
          {newsletters.map((nl, i) => (
            <button
              key={nl.date}
              onClick={() => setActive(i)}
              className={cn(
                "flex flex-col items-start border px-5 py-3 text-left",
                active === i
                  ? "border-gold bg-gold/5"
                  : "border-border hover:border-foreground/20"
              )}
            >
              <span
                className={cn(
                  "font-mono text-[10px] uppercase tracking-[0.2em]",
                  active === i ? "text-gold" : "text-muted"
                )}
              >
                {nl.date}
              </span>
              <span
                className={cn(
                  "mt-1 font-display text-sm uppercase tracking-tight",
                  active === i ? "text-foreground" : "text-foreground/60"
                )}
              >
                {nl.title}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-2 h-px w-full bg-border/50" />

        {/* Inline flipbook */}
        <div data-anim="up" className="mt-10">
          <InlineFlipbook key={current.pdf} pdfUrl={current.pdf} />
        </div>
      </div>
    </section>
  );
}
