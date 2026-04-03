"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = [
      { el: imageRef.current, delay: 0 },
      { el: labelRef.current, delay: 100 },
      { el: headingRef.current, delay: 200 },
      { el: bodyRef.current, delay: 350 },
    ];

    for (const { el } of targets) {
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
            for (const { el, delay } of targets) {
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
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Left: Image */}
          <div
            ref={imageRef}
            className="relative aspect-[4/3] overflow-hidden border border-border"
          >
            <Image
              src="/images/team/team-1.jpg"
              alt="SJSU Spartan Racing team working on the car"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right: Text */}
          <div>
            <span
              ref={labelRef}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C8952E]"
            >
              About Us
            </span>

            <h2
              ref={headingRef}
              className="mt-4 font-display text-[clamp(1.5rem,3vw,2.5rem)] uppercase leading-[1.2] tracking-tight text-foreground"
            >
              Design. Build. Test. Compete.
            </h2>

            <div ref={bodyRef}>
              <p className="mt-6 font-body text-base leading-relaxed text-muted">
                Spartan Racing is the student-run Formula SAE team at
                San&nbsp;Jos&eacute; State University. Since 1989, we&apos;ve
                designed, built, and raced formula-style electric vehicles,
                pushing the boundaries of student engineering. With over 100
                members across 8 subteams, we turn classroom knowledge into
                real-world performance.
              </p>

              <Link
                href="/about"
                className="mt-6 inline-block font-mono text-[13px] uppercase tracking-[0.15em] text-foreground"
              >
                Learn more about our team &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
