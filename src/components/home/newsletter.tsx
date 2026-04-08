"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const PdfFlipbook = dynamic(
  () => import("./pdf-flipbook").then((m) => m.PdfFlipbook),
  { ssr: false }
);

const newsletters = [
  {
    date: "March 2026",
    title: "System Spotlights",
    headlines: ["System Spotlights", "What's Next?", "Sponsor Recognition"],
    image: "/images/sr16/car-action-1.jpg",
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_234414049a954679966f200b229aee64.pdf",
  },
  {
    date: "February 2026",
    title: "Ready to Build",
    headlines: ["Ready to Build", "Alumni Driver Day", "Subteam Spotlight"],
    image: "/images/sr16/car-action-2.jpg",
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_96fb6ce5ecbf4feab0491278f70f07e0.pdf",
  },
  {
    date: "Winter 2026",
    title: "2026 Team Resolutions",
    headlines: ["2026 Team Resolutions", "Support Manufacturing Season"],
    image: "/images/sr16/car-action-3.jpg",
    pdf: "https://www.sjsuformulasae.com/_files/ugd/dfb2a6_23a0bf9e19ea4f34abb5746375101d73.pdf",
  },
];

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold">
      <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
  const [featured, setFeatured] = useState(0);
  const [flipbookPdf, setFlipbookPdf] = useState<{ url: string; title: string } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const prev = useCallback(() => {
    setFeatured((c) => (c > 0 ? c - 1 : c));
  }, []);

  const next = useCallback(() => {
    setFeatured((c) => (c < newsletters.length - 1 ? c + 1 : c));
  }, []);

  const openFlipbook = useCallback((pdf: string, title: string) => {
    setFlipbookPdf({ url: pdf, title });
  }, []);

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
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const issue = newsletters[featured];
  const sideIssues = newsletters.filter((_, i) => i !== featured);

  return (
    <>
      <section ref={sectionRef} className="w-full bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* Header row */}
          <div className="flex items-end justify-between">
            <div data-anim="left">
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] uppercase leading-[0.95] tracking-tight">
                <span className="font-bold text-foreground">Latest</span>
                <br />
                <span className="font-light text-foreground/40">Newsletters</span>
              </h2>
            </div>

            {/* Arrows */}
            <div data-anim="up" className="flex items-center gap-3">
              <button
                onClick={prev}
                disabled={featured === 0}
                aria-label="Previous newsletter"
                className="flex h-12 w-12 items-center justify-center border border-gold text-gold disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={next}
                disabled={featured === newsletters.length - 1}
                aria-label="Next newsletter"
                className="flex h-12 w-12 items-center justify-center border border-gold text-gold disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Cards layout */}
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Featured (left, large) */}
            <button
              onClick={() => openFlipbook(issue.pdf, issue.title)}
              data-anim="up"
              className="group relative col-span-1 flex flex-col overflow-hidden bg-[#1A1A1A] text-left lg:col-span-3"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={issue.image}
                  alt={issue.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-8">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
                    {issue.date}
                  </span>
                  <h3 className="mt-3 font-display text-2xl uppercase tracking-tight text-white sm:text-3xl">
                    {issue.title}
                  </h3>
                </div>
                <div className="mt-6 flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-gold">
                  Read Newsletter
                  <ArrowIcon />
                </div>
              </div>
            </button>

            {/* Side cards (right, stacked) */}
            <div className="col-span-1 flex flex-col gap-6 lg:col-span-2">
              {sideIssues.map((nl) => (
                <button
                  key={nl.date}
                  onClick={() => openFlipbook(nl.pdf, nl.title)}
                  data-anim="up"
                  className="group flex flex-1 flex-col justify-between border border-border p-6 text-left"
                >
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
                      {nl.date}
                    </span>
                    <h4 className="mt-2 font-display text-xl uppercase tracking-tight text-foreground">
                      {nl.title}
                    </h4>
                    <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                      {nl.headlines.join(" / ")}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-end">
                    <ArrowIcon />
                  </div>
                </button>
              ))}

              {/* Third card: view all */}
              <a
                href="https://www.sjsuformulasae.com/newsletters"
                target="_blank"
                rel="noopener noreferrer"
                data-anim="up"
                className="flex flex-1 items-center justify-between border border-border p-6"
              >
                <span className="font-mono text-[13px] uppercase tracking-[0.15em] text-foreground">
                  View All Newsletters
                </span>
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Flipbook modal */}
      {flipbookPdf && (
        <PdfFlipbook
          pdfUrl={flipbookPdf.url}
          title={flipbookPdf.title}
          onClose={() => setFlipbookPdf(null)}
        />
      )}
    </>
  );
}
