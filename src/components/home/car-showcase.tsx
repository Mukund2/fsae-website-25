"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold">
      <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CARDS = [
  { title: "Racing", href: "/racing", image: "/images/flickr/driver-day-6.jpg" },
  { title: "Our Cars", href: "/cars", image: "/images/flickr/driver-day-1.jpg" },
  { title: "The Team", href: "/about", image: "/images/flickr/driver-day-2.jpg" },
] as const;

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

      el.style.opacity = String(startO + (endO - startO) * eased);
      el.style.transform = `translate(${startX + (endX - startX) * eased}px, ${startY + (endY - startY) * eased}px)`;

      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, delay);
}

export function CarShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animEls = section.querySelectorAll<HTMLElement>("[data-anim]");
    animEls.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translate(-40px, 0px)";
    });

    const cardEls = section.querySelectorAll<HTMLElement>("[data-card]");
    cardEls.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translate(40px, 0px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animEls.forEach((el, i) => {
              animateElement(el, { x: -40, opacity: 0 }, { x: 0, opacity: 1 }, 600, i * 100);
            });
            cardEls.forEach((el, i) => {
              animateElement(el, { x: 40, opacity: 0 }, { x: 0, opacity: 1 }, 600, 200 + i * 120);
            });
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
        {/* Two-column: Car LEFT, Image cards RIGHT */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* LEFT: 3D Car Model */}
          <div data-anim className="relative aspect-square w-full overflow-hidden lg:aspect-auto lg:min-h-[500px]">
            <HeroScene />
          </div>

          {/* RIGHT: Stacked image cards */}
          <div className="flex flex-col gap-4">
            {CARDS.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                data-card
                className="group relative aspect-[3/1] overflow-hidden"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-5">
                  <span className="font-display text-lg font-bold uppercase tracking-tight text-white">
                    {card.title}
                  </span>
                  <ArrowIcon />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
