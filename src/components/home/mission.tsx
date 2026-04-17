"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

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

export function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
              const direction = el.getAttribute("data-anim");
              if (direction === "left") {
                animateElement(el, { x: -40, opacity: 0 }, { x: 0, opacity: 1 }, 600, i * 100);
              } else if (direction === "right") {
                animateElement(el, { x: 40, opacity: 0 }, { x: 0, opacity: 1 }, 600, i * 100);
              } else {
                animateElement(el, { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, 600, i * 100);
              }
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

  // Parallax scroll effect on background image
  useEffect(() => {
    const imageEl = imageRef.current;
    if (!imageEl) return;

    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const rect = imageEl.getBoundingClientRect();
        const viewH = window.innerHeight;
        // Only apply when section is in view
        if (rect.bottom > 0 && rect.top < viewH) {
          const progress = (viewH - rect.top) / (viewH + rect.height);
          const shift = (progress - 0.5) * 60; // -30px to +30px
          imageEl.style.transform = `translateY(${shift}px) scale(1.08)`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial position

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] w-full overflow-hidden bg-[#1A1A1A]"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
    >
      {/* Background image with parallax */}
      <div ref={imageRef} className="absolute inset-[-30px]" style={{ willChange: "transform" }}>
        <Image
          src="/images/flickr/driver-day-4.jpg"
          alt="SJSU Spartan Racing team"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[70vh] flex-col justify-between">
        <div className="mx-auto w-full max-w-7xl px-6 pt-16 lg:px-12 lg:pt-24">
          <div className="flex flex-col justify-between gap-8 lg:flex-row">
            {/* Heading top-left */}
            <div data-anim="left">
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.95] tracking-tight text-white">
                <span className="font-bold">Who We Are</span>
              </h2>
            </div>

            {/* Description top-right */}
            <p data-anim="right" className="max-w-md font-body text-base leading-relaxed text-white/70 lg:pt-4">
              Spartan Racing is the Formula SAE team at San Jos&eacute; State
              University. We design, build, and race formula-style electric
              vehicles. Over 100 members across 8 subteams turn classroom
              knowledge into real-world performance every year.
            </p>
          </div>
        </div>

        {/* CTA bottom-right */}
        <div className="mx-auto w-full max-w-7xl px-6 pb-16 lg:px-12 lg:pb-24">
          <div className="flex justify-end">
            <Link
              href="/about"
              data-anim="up"
              className="group inline-flex items-center gap-3 bg-gold px-8 py-4 font-mono text-[13px] uppercase tracking-[0.15em] text-white"
            >
              Meet the Team
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white">
                <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
