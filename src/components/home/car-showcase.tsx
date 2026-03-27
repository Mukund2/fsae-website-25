"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

const FEATURES = [
  "Carbon fiber monocoque",
  "Custom aero package",
  "Student-designed ECU",
  "CNC-machined uprights",
  "In-house wiring harness",
  "3D-printed intake manifold",
] as const;

export function CarShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Scroll-reveal animation via IntersectionObserver
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = [
      { el: labelRef.current, delay: 0 },
      { el: headingRef.current, delay: 150, typewriter: true },
      { el: descRef.current, delay: 300 },
      { el: statsRef.current, delay: 450 },
    ];

    // Set initial hidden state
    for (const { el, typewriter } of targets) {
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
        if (typewriter) {
          el.textContent = "";
        }
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

    const HEADING_TEXT = "Built to Win";

    const typewriterAnimate = (el: HTMLElement, delay: number) => {
      setTimeout(() => {
        // Fade in the element first
        el.style.opacity = "1";
        el.style.transform = "translateY(0px)";

        let charIndex = 0;
        const cursorSpan = document.createElement("span");
        cursorSpan.textContent = "|";
        cursorSpan.className = "typewriter-cursor";

        const typeNext = () => {
          if (charIndex <= HEADING_TEXT.length) {
            el.textContent = HEADING_TEXT.slice(0, charIndex);
            el.appendChild(cursorSpan);
            charIndex++;
            setTimeout(typeNext, 80);
          } else {
            // Typing complete — add gold underline
            const underline = document.createElement("div");
            underline.className = "heading-underline";
            el.parentElement?.insertBefore(underline, el.nextSibling);

            // Fade out cursor after 1 second
            setTimeout(() => {
              const fadeStart = performance.now();
              const fadeDuration = 500;
              const fadeTick = (now: number) => {
                const elapsed = now - fadeStart;
                const progress = Math.min(elapsed / fadeDuration, 1);
                cursorSpan.style.opacity = String(1 - progress);
                if (progress < 1) {
                  requestAnimationFrame(fadeTick);
                } else {
                  cursorSpan.remove();
                }
              };
              requestAnimationFrame(fadeTick);
            }, 1000);
          }
        };

        typeNext();
      }, delay);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            for (const { el, delay, typewriter } of targets) {
              if (el) {
                if (typewriter) {
                  typewriterAnimate(el, delay);
                } else {
                  animateIn(el, delay);
                }
              }
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
    <>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typewriter-cursor {
          animation: blink 0.7s step-end infinite;
          color: #b8860b;
          font-weight: 300;
          margin-left: 2px;
        }
        @keyframes grow-underline {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .heading-underline {
          height: 3px;
          background: linear-gradient(90deg, #b8860b, #d4a843);
          margin-top: 8px;
          transform-origin: left;
          animation: grow-underline 0.6s ease-out forwards;
          border-radius: 2px;
          width: 100%;
          max-width: 280px;
        }
      `}</style>
      <section ref={sectionRef} className="w-full bg-background">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* LEFT COLUMN — 3D Car Model */}
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-[500px] overflow-hidden">
                <HeroScene />
              </div>
            </div>

            {/* RIGHT COLUMN — Text Content */}
            <div className="flex flex-col justify-center">
              <span
                ref={labelRef}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
              >
                SR-16 / CURRENT BUILD
              </span>

              <h2
                ref={headingRef}
                className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[1.1] tracking-tight text-foreground"
              >
                Built to Win
              </h2>

              <p
                ref={descRef}
                className="mt-6 font-body text-base leading-relaxed text-muted"
              >
                Every component engineered with purpose. From the carbon fiber
                monocoque to the custom-machined uprights, our cars represent
                thousands of hours of student-led design, analysis, and
                fabrication.
              </p>

              {/* FEATURE LIST */}
              <div
                ref={statsRef}
                className="mt-10 grid grid-cols-2 gap-x-8 gap-y-3"
              >
                {FEATURES.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <span className="block h-1 w-1 rounded-full bg-muted" />
                    <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-muted">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
