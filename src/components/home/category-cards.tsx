"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Racing",
    href: "/racing",
    image: "/images/flickr/comp-action-4.jpg",
    alt: "Spartan Racing car in competition",
    yellowTint: false,
  },
  {
    title: "Our Cars",
    href: "/cars",
    image: "/images/flickr/sr16-hero.jpg",
    alt: "SR16 on track",
    yellowTint: true,
  },
  {
    title: "The Team",
    href: "/about",
    image: "/images/flickr/team-hero.jpg",
    alt: "Spartan Racing team group photo",
    yellowTint: false,
  },
];

export function CategoryCards() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>(".category-card");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            card.classList.add("revealed");
            observer.unobserve(card);
          }
        }
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background pt-28 pb-32 lg:pt-40 lg:pb-44">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Asymmetric header — title left-heavy (1.25fr), copy in narrow right (0.75fr) */}
        <div className="mb-12 grid grid-cols-1 gap-6 lg:mb-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end lg:gap-12">
          <div>
            <p
              className="mb-4 font-mono uppercase text-foreground/50"
              style={{ fontSize: "10px", letterSpacing: "0.32em" }}
            >
              §03 — Inside the team
            </p>
            <h2
              className="font-display font-bold uppercase italic leading-[0.9] tracking-tight text-gold"
              style={{ fontSize: "clamp(2.5rem, 6.6vw, 5rem)" }}
            >
              About Us
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-foreground/60 lg:pb-3 lg:text-right">
            From design and manufacturing to data and strategy, every member plays a critical role in putting our car on track.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="category-card image-cinematic group relative block aspect-[3/4] w-full overflow-hidden sm:aspect-[3/4]"
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={cat.image}
                  alt={cat.alt}
                  fill
                  className={`object-cover category-card-img${cat.yellowTint ? " sepia-[.50] saturate-200 hue-rotate-[-10deg]" : ""}`}
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>

              {/* Yellow tint overlay for gold car effect */}
              {cat.yellowTint && (
                <div className="absolute inset-0 bg-yellow-500/15 mix-blend-multiply" />
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Title + arrow bottom */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 lg:p-6">
                <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold uppercase leading-none tracking-tight text-white">
                  {cat.title}
                </h3>

                {/* Arrow */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 28 28"
                  fill="none"
                  className="text-gold category-card-arrow flex-shrink-0"
                >
                  <path
                    d="M7 21L21 7M21 7H11M21 7V17"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
