"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    content.style.opacity = "0";
    content.style.transform = "translateY(30px)";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const start = performance.now();
            const duration = 700;
            const tick = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              content.style.opacity = String(eased);
              content.style.transform = `translateY(${30 * (1 - eased)}px)`;
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[60vh] w-full overflow-hidden">
      {/* Full-width team photo as background */}
      <Image
        src="/images/team/team-1.jpg"
        alt="SJSU Spartan Racing team"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/40" />

      {/* Content overlaid on left */}
      <div ref={contentRef} className="relative z-10 flex min-h-[60vh] items-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-12">
          <div className="max-w-lg">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
              Who We Are
            </span>

            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] uppercase leading-[1.1] tracking-tight text-foreground">
              100+ students building race cars since 1989
            </h2>

            <p className="mt-6 font-body text-base leading-relaxed text-muted">
              Spartan Racing is the Formula SAE team at San Jos&eacute; State
              University. We design, build, and race formula-style electric
              vehicles. Over 100 members across 8 subteams turn classroom
              knowledge into real-world performance every year.
            </p>

            <Link
              href="/about"
              className="mt-8 inline-block font-mono text-[13px] uppercase tracking-[0.15em] text-foreground hover:text-gold"
            >
              Meet the team &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
