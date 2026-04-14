"use client";

import { useEffect, useRef, useState } from "react";

export function AlumniSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

  // IntersectionObserver for scroll reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Alumni CTA Section */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
        <div
          ref={sectionRef}
          className="alumni-cta relative overflow-hidden border border-border bg-surface p-10 md:p-16 cursor-pointer"
          onClick={() => setShowModal(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setShowModal(true); }}
        >
          {/* Decorative accent line at top */}
          <div className="alumni-accent-line absolute top-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gold" />

          {/* Content */}
          <div className="flex flex-col items-center text-center gap-4 md:flex-row md:text-left md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
                Our Legacy
              </p>
              <h2 className="mt-2 font-display text-3xl uppercase tracking-tight md:text-4xl">
                Past Members & Alumni
              </h2>
              <p className="mt-3 max-w-lg text-muted leading-relaxed">
                Over the years, Spartan Racing has developed 100+ engineers who now
                work at Tesla, Apple, SpaceX, Boeing, and more. Explore our alumni network.
              </p>
            </div>

            {/* Arrow CTA */}
            <div className="alumni-arrow flex items-center gap-3 font-display text-lg uppercase tracking-tight text-gold">
              <span>View Alumni</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Modal */}
      {showModal && (
        <div
          className="alumni-modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setShowModal(false)}
        >
          <div
            className="alumni-modal relative mx-4 w-full max-w-md border border-border bg-elevated p-10 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 font-mono text-sm text-muted hover:text-foreground"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Accent line */}
            <div className="mx-auto mb-6 h-[2px] w-12 bg-gold" />

            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
              Alumni Directory
            </p>
            <h3 className="mt-3 font-display text-3xl uppercase tracking-tight">
              Coming Soon
            </h3>
            <p className="mt-4 text-muted leading-relaxed">
              We&apos;re building a comprehensive alumni directory showcasing past
              members and their journeys. Check back soon.
            </p>

            {/* Decorative bottom line */}
            <div className="mt-8 h-[1px] w-full bg-border" />
            <p className="mt-4 font-mono text-xs text-muted/60 uppercase tracking-widest">
              Spartan Racing
            </p>
          </div>
        </div>
      )}
    </>
  );
}
