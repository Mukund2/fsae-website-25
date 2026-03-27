"use client";

import { useEffect, useRef } from "react";

export function JoinUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll<HTMLElement>("[data-reveal]");

    // Set initial hidden state via direct DOM manipulation
    elements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          elements.forEach((el) => {
            const delay = Number(el.dataset.reveal) || 0;

            setTimeout(() => {
              requestAnimationFrame(() => {
                const start = performance.now();
                const duration = 600;

                function animate(now: number) {
                  const elapsed = now - start;
                  const progress = Math.min(elapsed / duration, 1);
                  // cubic ease-out: 1 - (1 - t)^3
                  const eased = 1 - Math.pow(1 - progress, 3);

                  el.style.opacity = String(eased);
                  el.style.transform = `translateY(${24 * (1 - eased)}px)`;

                  if (progress < 1) {
                    requestAnimationFrame(animate);
                  }
                }

                requestAnimationFrame(animate);
              });
            }, delay);
          });

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="join-us"
      className="bg-surface px-6 py-28 lg:py-32"
    >
      <div className="mx-auto max-w-5xl text-center">
        <p
          data-reveal="0"
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted"
        >
          GET INVOLVED
        </p>

        <h2
          data-reveal="150"
          className="mt-6 font-display text-[clamp(3rem,8vw,7rem)] uppercase leading-[1.05] tracking-tight text-foreground"
        >
          Join Spartan Racing
        </h2>

        <p
          data-reveal="300"
          className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-muted"
        >
          No experience required — just passion and dedication. Be part of
          something extraordinary.
        </p>

        <div data-reveal="450">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc5dX8x-oh8OP0M61hb4o8S3POhIpPr7bCrbw0sXiaoXK3l6g/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block border border-white/20 px-8 py-3 font-mono text-[13px] uppercase tracking-[0.15em] text-foreground"
          >
            APPLY NOW
          </a>

          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
            Applications open year-round
          </p>
        </div>
      </div>
    </section>
  );
}
