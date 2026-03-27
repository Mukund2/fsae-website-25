"use client";

import { useEffect, useRef } from "react";

const NEWSLETTERS = [
  {
    month: "March 2026",
    topics: [
      "System Spotlights",
      "What\u2019s Next?",
      "Sponsor Recognition",
    ],
  },
  {
    month: "February 2026",
    topics: [
      "Ready to Build",
      "Alumni Driver Day",
      "Subteam Spotlight",
    ],
  },
  {
    month: "Winter 2026",
    topics: [
      "2026 Team Resolutions",
      "Support Spartan Racing",
      "Manufacturing Season",
    ],
  },
] as const;

export function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const allTargets = [
      { el: headingRef.current, delay: 0 },
      ...cardsRef.current.map((el, i) => ({ el, delay: 150 + i * 120 })),
    ];

    for (const { el } of allTargets) {
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
      }
    }

    const animateIn = (el: HTMLElement, delay: number) => {
      setTimeout(() => {
        const start = performance.now();
        const duration = 600;

        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);

          el.style.opacity = String(eased);
          el.style.transform = `translateY(${24 * (1 - eased)}px)`;

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
      }, delay);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            for (const { el, delay } of allTargets) {
              if (el) animateIn(el, delay);
            }
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-background">
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12 lg:py-32">
        <span
          ref={headingRef}
          className="mb-12 block text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
        >
          Latest Updates
        </span>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {NEWSLETTERS.map((item, i) => (
            <div
              key={item.month}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="border border-border p-6"
            >
              <h3 className="font-display text-lg uppercase tracking-tight text-foreground">
                {item.month}
              </h3>

              <ul className="mt-4 space-y-2">
                {item.topics.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-start gap-2 font-body text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-muted" />
                    {topic}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="mt-6 inline-block font-mono text-[13px] uppercase tracking-[0.15em] text-foreground"
              >
                Read More &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
