"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const InlineFlipbook = dynamic(
  () => import("./inline-flipbook").then((m) => m.InlineFlipbook),
  { ssr: false }
);

const newsletters = [
  // 2026
  {
    date: "March 2026",
    title: "Into the Electric",
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_234414049a954679966f200b229aee64.pdf",
  },
  {
    date: "February 2026",
    title: "Design to Reality",
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_96fb6ce5ecbf4feab0491278f70f07e0.pdf",
  },
  {
    date: "New Year 2026",
    title: "2026 Team Resolutions",
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_23a0bf9e19ea4f34abb5746375101d73.pdf",
  },
  // 2025
  {
    date: "Fall 2025",
    title: "November Update",
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_22de078a7a1c4559bbc9a270aafac172.pdf",
  },
  {
    date: "Summer 2025",
    title: "Competition Recap",
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_60b226acddbe413ea91fa95a9902aaf8.pdf",
  },
  {
    date: "Spring 2025",
    title: "March Update",
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_989138bdf1b340248759424b3ba49d62.pdf",
  },
  {
    date: "Winter 2025",
    title: "February Update",
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_d3576df32e2b430bb50838aa571d41c7.pdf",
  },
  // 2024
  {
    date: "Winter 2024",
    title: "December Update",
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_814e7aff58694194af605109541a320c.pdf",
  },
  {
    date: "Fall 2024",
    title: "November Update",
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_eef97411dfc64ad0be10f122537649a6.pdf",
  },
  {
    date: "March 2024",
    title: "Spring Update",
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_dfb20c3c8d334851a785a4e3841833dc.pdf",
  },
  // 2023
  {
    date: "February 2023",
    title: "Winter Update",
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_b484c3b3d7e34c8cacc1061a74791660.pdf",
  },
  // 2022–23
  {
    date: "March–June 2023",
    title: "Season Recap",
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_b8f2c6d86e4942cf9f8f46eac23f80c0.pdf",
  },
  // 2021–22
  {
    date: "Nov 2021–Feb 2022",
    title: "Winter Recap",
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_a76ccd1b40ae48a9a4ed5d29d73b1267.pdf",
  },
  {
    date: "October 2021",
    title: "Inaugural Issue",
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_be2da463627d4fdf9d63a8fcf717baaa.pdf",
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
    <section ref={sectionRef} className="w-full bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div data-anim="left">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Newsletter
          </p>
          <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3.5rem)] uppercase leading-[0.95] tracking-tight">
            <span className="font-bold text-foreground">Up 2</span>
            <br />
            <span className="font-light text-foreground/40">Speed</span>
          </h2>
        </div>

        {/* Newsletter tabs */}
        <div className="mt-8 -mx-6 px-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-2" style={{ minWidth: "max-content" }}>
          {newsletters.map((nl, i) => (
            <button
              key={nl.date}
              data-anim="up"
              onClick={() => setActive(i)}
              className={cn(
                "newsletter-tab flex shrink-0 flex-col items-start border px-4 py-2.5 text-left",
                active === i
                  ? "border-gold bg-gold/5"
                  : "border-border"
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
