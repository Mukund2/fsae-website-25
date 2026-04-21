"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

function ArrowIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="text-current">
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
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="join-us" className="grid w-full grid-cols-1 md:grid-cols-2">
      {/* Left: Join the Team */}
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSc5dX8x-oh8OP0M61hb4o8S3POhIpPr7bCrbw0sXiaoXK3l6g/viewform"
        target="_blank"
        rel="noopener noreferrer"
        className="cta-panel group relative min-h-[55vh] overflow-hidden"
      >
        <Image
          src="/images/team/lucid-visit.jpg"
          alt="Spartan Racing team at Lucid Motors"
          fill
          className="object-cover cta-panel-img"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Gradient overlay — heavy at bottom for text, light elsewhere to show image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex min-h-[55vh] flex-col justify-end p-8 lg:p-12">
          <div>
            <h3
              data-anim
              className="font-display font-bold uppercase italic leading-[0.9] tracking-tight text-white"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Join the<br />Team
            </h3>
            <div data-anim className="mt-6 flex items-center gap-3 text-gold">
              <span className="font-display text-[13px] uppercase tracking-[0.15em]">
                Apply Now
              </span>
              <ArrowIcon size={18} />
            </div>
          </div>
        </div>
      </a>

      {/* Right: Support Us */}
      <a
        href="/support"
        className="cta-panel group relative min-h-[55vh] overflow-hidden"
      >
        <Image
          src="/images/sr16/car-action-4.jpg"
          alt="Support Spartan Racing"
          fill
          className="object-cover cta-panel-img"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex min-h-[55vh] flex-col justify-end p-8 lg:p-12">
          <div>
            <h3
              data-anim
              className="font-display font-bold uppercase italic leading-[0.9] tracking-tight text-white"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Support<br />Our Mission
            </h3>
            <div data-anim className="mt-6 flex items-center gap-3 text-gold">
              <span className="font-display text-[13px] uppercase tracking-[0.15em]">
                Donate
              </span>
              <ArrowIcon size={18} />
            </div>
          </div>
        </div>
      </a>
    </section>
  );
}
