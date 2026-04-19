"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Racing",
    href: "/racing",
    image: "/images/flickr/comp-action-2.jpg",
    alt: "Spartan Racing car in competition",
  },
  {
    title: "Our Cars",
    href: "/cars",
    image: "/images/sr16/car-action-1.jpg",
    alt: "SR16 on track",
  },
  {
    title: "The Team",
    href: "/about",
    image: "/images/team/team-group.jpg",
    alt: "Spartan Racing team group photo",
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
    <section ref={sectionRef} className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* McLaren-style header */}
        <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <Image
                src="/images/sr-logo.png"
                alt="Spartan Racing"
                width={28}
                height={28}
                className="h-7 w-auto"
              />
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-foreground/60">
                2026
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-black uppercase leading-[0.9] tracking-tight text-foreground">
              Spartan Racing
            </h2>
            <p
              className="font-display text-[clamp(2.2rem,5vw,4rem)] font-black uppercase leading-[0.9] tracking-tight text-foreground/30"
            >
              Teams
            </p>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-foreground/60 lg:text-right">
            From design and manufacturing to data and strategy — every member plays a critical role in putting our car on track.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="category-card group relative block aspect-[3/4] w-full overflow-hidden sm:aspect-[3/4]"
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={cat.image}
                  alt={cat.alt}
                  fill
                  className="object-cover category-card-img"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>

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
