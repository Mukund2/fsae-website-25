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

const PAGE_SIZE = 5;

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
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]));
  const [pageIndex, setPageIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const totalPages = Math.ceil(newsletters.length / PAGE_SIZE);

  const handleSelect = (i: number) => {
    setActive(i);
    setLoaded((prev) => {
      if (prev.has(i)) return prev;
      return new Set(prev).add(i);
    });
  };

  const handlePrevPage = () => {
    setPageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setPageIndex((prev) => Math.min(totalPages - 1, prev + 1));
  };

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

  // Current page of newsletters to display
  const sideCards = newsletters.slice(
    pageIndex * PAGE_SIZE,
    pageIndex * PAGE_SIZE + PAGE_SIZE
  );

  return (
    <>
      <style>{`
        @keyframes newsletter-bar-jut {
          0% { padding-left: 20px; border-left-color: transparent; }
          100% { padding-left: 32px; border-left-color: #C8A24E; }
        }
        @keyframes newsletter-bar-retract {
          0% { padding-left: 32px; border-left-color: #C8A24E; }
          100% { padding-left: 20px; border-left-color: transparent; }
        }
        .newsletter-bar:not(.newsletter-bar-active):hover {
          animation: newsletter-bar-jut 0.25s ease-out forwards;
        }
        .newsletter-bar:not(.newsletter-bar-active):not(:hover) {
          animation: newsletter-bar-retract 0.2s ease-out forwards;
        }
        .newsletter-bar-active {
          padding-left: 32px;
          border-left-color: #C8A24E;
        }
      `}</style>
      <section ref={sectionRef} className="w-full bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* Header */}
          <div data-anim="left" className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display font-bold uppercase italic leading-[0.9] tracking-tight" style={{ fontSize: "clamp(2.5rem, 6.6vw, 5rem)", color: "#C8A24E" }}>
                Newsletters
              </h2>
            </div>

            {/* Pagination arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={pageIndex === 0}
                className="flex h-10 w-10 items-center justify-center border border-gold text-gold disabled:opacity-20 disabled:cursor-not-allowed"
                aria-label="Previous newsletters"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M12 15L7 10L12 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={handleNextPage}
                disabled={pageIndex >= totalPages - 1}
                className="flex h-10 w-10 items-center justify-center border border-gold text-gold disabled:opacity-20 disabled:cursor-not-allowed"
                aria-label="Next newsletters"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M8 5L13 10L8 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* McLaren-style layout: flipbook left, card stack right */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Active newsletter flipbook */}
            <div data-anim="left" className="lg:w-[58%] flex-shrink-0">
              <div className="relative">
                {newsletters.map((nl, i) =>
                  loaded.has(i) ? (
                    <div key={nl.pdf} style={{ display: active === i ? "block" : "none" }}>
                      <InlineFlipbook pdfUrl={nl.pdf} />
                    </div>
                  ) : null
                )}
              </div>
              {/* Active newsletter info below flipbook */}
              <div className="mt-4 flex items-center gap-3">
                <span className="font-display text-[11px] uppercase tracking-[0.2em] text-gold">
                  {newsletters[active].date}
                </span>
                <span className="font-display text-sm font-bold uppercase tracking-tight text-foreground">
                  {newsletters[active].title}
                </span>
              </div>
            </div>

            {/* Right: Stacked newsletter cards */}
            <div data-anim="up" className="flex flex-col gap-[2px] lg:w-[42%]">
              {sideCards.map((nl, idx) => {
                const globalIdx = pageIndex * PAGE_SIZE + idx;
                return (
                  <button
                    key={nl.date}
                    onClick={() => handleSelect(globalIdx)}
                    className={cn(
                      "newsletter-bar group relative flex items-stretch text-left border-l-4 overflow-hidden",
                      active === globalIdx
                        ? "newsletter-bar-active border-l-gold"
                        : "border-l-transparent"
                    )}
                  >
                    {/* Content */}
                    <div className="flex-1 px-5 py-5">
                      <span className={cn(
                        "font-display text-[10px] uppercase tracking-[0.2em]",
                        active === globalIdx ? "text-gold" : "text-muted"
                      )}>
                        {nl.date}
                      </span>
                      <h3 className={cn(
                        "mt-2 font-display text-lg font-bold uppercase tracking-tight leading-tight",
                        active === globalIdx ? "text-foreground" : "text-foreground/70"
                      )}>
                        {nl.title}
                      </h3>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center pr-4">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={cn(
                        active === globalIdx ? "text-gold" : "text-foreground/30 group-hover:text-gold"
                      )}>
                        <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
