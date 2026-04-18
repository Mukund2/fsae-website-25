"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white">
      <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function animateElement(
  el: HTMLElement,
  from: { y?: number; opacity?: number },
  to: { y?: number; opacity?: number },
  duration: number,
  delay: number
) {
  const startY = from.y ?? 0;
  const startO = from.opacity ?? 0;
  const endY = to.y ?? 0;
  const endO = to.opacity ?? 1;

  el.style.opacity = String(startO);
  el.style.transform = `translateY(${startY}px)`;

  setTimeout(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentY = startY + (endY - startY) * eased;
      const currentO = startO + (endO - startO) * eased;

      el.style.opacity = String(currentO);
      el.style.transform = `translateY(${currentY}px)`;

      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, delay);
}

export function JoinUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animEls = section.querySelectorAll<HTMLElement>("[data-anim]");
    animEls.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animEls.forEach((el, i) => {
              animateElement(el, { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, 600, i * 150);
            });
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
    <section ref={sectionRef} id="join-us" className="grid w-full grid-cols-1 md:grid-cols-2">
      {/* Left: Join the Team */}
      <div className="relative min-h-[50vh] overflow-hidden">
        <Image
          src="/images/team/lucid-visit.jpg"
          alt="Spartan Racing team at Lucid Motors"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 flex min-h-[50vh] flex-col items-start justify-end p-10 lg:p-16">
          <h3 data-anim className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.95] tracking-tight text-white">
            Join the Team
          </h3>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc5dX8x-oh8OP0M61hb4o8S3POhIpPr7bCrbw0sXiaoXK3l6g/viewform"
            target="_blank"
            rel="noopener noreferrer"
            data-anim
            className="mt-8 inline-flex items-center gap-3 bg-gold px-8 py-4 font-mono text-[13px] uppercase tracking-[0.15em] text-white"
          >
            Join Us
            <ArrowIcon />
          </a>
        </div>
      </div>

      {/* Right: Support Us */}
      <div className="relative min-h-[50vh] overflow-hidden">
        <Image
          src="/images/sr16/car-action-4.jpg"
          alt="Support Spartan Racing"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 flex min-h-[50vh] flex-col items-start justify-end p-10 lg:p-16">
          <h3 data-anim className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.95] tracking-tight text-white">
            Support Us
          </h3>
          <a
            href="/support"
            data-anim
            className="mt-8 inline-flex items-center gap-3 bg-gold px-8 py-4 font-mono text-[13px] uppercase tracking-[0.15em] text-white"
          >
            Donate
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
