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
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const features = featuresRef.current;
    if (!section || !content || !features) return;

    // Initial state: content off-screen to the right
    content.style.opacity = "0";
    content.style.transform = "translateX(120px)";

    // Feature lines hidden
    const featureEls = features.querySelectorAll<HTMLElement>(".feature-line");
    featureEls.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateX(60px)";
    });

    const animateSlideIn = (el: HTMLElement, delay: number, fromX: number) => {
      setTimeout(() => {
        const start = performance.now();
        const duration = 500;

        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Fast ease-out
          const eased = 1 - Math.pow(1 - progress, 4);

          el.style.opacity = String(eased);
          el.style.transform = `translateX(${fromX * (1 - eased)}px)`;

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
            // Slide in main content block
            animateSlideIn(content, 0, 120);

            // Slide in each feature line with stagger
            featureEls.forEach((el, i) => {
              animateSlideIn(el, 300 + i * 80, 60);
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

  return (
    <section ref={sectionRef} className="w-full bg-background">
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: 3D Car Model, no box, naturally integrated */}
          <div className="flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-[500px] overflow-hidden">
              <HeroScene />
            </div>
          </div>

          {/* RIGHT: Text content, slides in from right */}
          <div ref={contentRef} className="flex flex-col justify-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
              SR-16 / Current Build
            </span>

            <h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[1.1] tracking-tight text-foreground">
              Built to Win
            </h2>

            <p className="mt-6 font-body text-base leading-relaxed text-muted">
              Every component engineered with purpose. From the carbon fiber
              monocoque to the custom-machined uprights, our cars represent
              thousands of hours of student-led design, analysis, and
              fabrication.
            </p>

            {/* Feature lines, no bullets, each slides in */}
            <div ref={featuresRef} className="mt-10 flex flex-col gap-3">
              {FEATURES.map((feature) => (
                <div
                  key={feature}
                  className="feature-line border-b border-border pb-3"
                >
                  <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-foreground/70">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
