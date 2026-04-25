"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/* ── Scroll reveal hook (IntersectionObserver + RAF, no CSS transitions) ── */

function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(".sr-reveal, .sr-slide-left");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseFloat(el.dataset.delay || "0") * 1000;
            setTimeout(() => {
              el.classList.add("sr-revealed");
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}

/* ── Event data ────────────────────────────────────────────────────────── */

const staticEvents = [
  {
    name: "Design",
    tagline: "Defend every decision.",
    image: "/images/flickr/design-1.jpg",
    imageAlt: "Spartan Racing car showing design details",
  },
  {
    name: "Cost Report",
    tagline: "Every dollar justified.",
    image: "/images/flickr/cost-report-1.jpg",
    imageAlt: "Team working on cost analysis and car assembly",
  },
];

const dynamicEvents = [
  {
    name: "Acceleration",
    tagline: "75 meters. Full send.",
    image: "/images/flickr/acceleration-1.jpg",
    imageAlt: "Spartan Racing car launching off the line",
  },
  {
    name: "Skid Pad",
    tagline: "Lateral grip, measured.",
    image: "/images/flickr/skidpad-1.jpg",
    imageAlt: "Car cornering on the skid pad course",
  },
  {
    name: "Autocross",
    tagline: "One lap. One chance.",
    image: "/images/flickr/autocross-1.jpg",
    imageAlt: "Car navigating the autocross cone course",
  },
  {
    name: "Endurance",
    tagline: "22 km. No margin for error.",
    image: "/images/flickr/endurance.jpg",
    imageAlt: "Spartan Racing car during endurance race",
  },
];

/* ── Component ─────────────────────────────────────────────────────────── */

export function RacingContent() {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="bg-background">
      {/* ── Hero (compact) ─────────────────────────────────── */}
      <section className="relative flex min-h-[40vh] items-end overflow-hidden pt-28 pb-12">
        <Image
          src="/images/flickr/comp-action-1.jpg"
          alt="Spartan Racing competing at Formula SAE"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
          <h1 className="sr-reveal font-display text-4xl font-bold uppercase italic tracking-tight sm:text-5xl md:text-7xl">
            The Competition
          </h1>
          <p className="sr-reveal mt-3 max-w-xl text-base text-muted md:text-lg" data-delay="0.15">
            Designing, building, and racing formula-style cars against the best
            university engineering teams in the world.
          </p>
        </div>
      </section>

      {/* ── What is Formula SAE? (compact intro) ──────────── */}
      <section className="relative mx-auto max-w-7xl px-6 pt-16 pb-12">
        {/* gold blob */}
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-[300px] w-[500px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(212,168,67,0.07) 0%, transparent 70%)",
          }}
        />
        <h2 className="sr-reveal font-display text-2xl font-bold uppercase italic tracking-tight md:text-3xl">
          What is Formula SAE?
        </h2>
        <p className="sr-reveal mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base" data-delay="0.1">
          Formula SAE is the world&apos;s premier student engineering
          competition, organized by SAE International. Over 600 teams from six
          continents design, build, and race small formula-style vehicles,
          evaluated across engineering design, cost efficiency, and on-track
          performance. Spartan Racing has represented San Jos&eacute; State
          University since 2008.
        </p>
      </section>

      {/* ── Static Events ─────────────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-6 pt-8 pb-10">
        <div className="flex items-center gap-4 pb-6">
          <span
            className="sr-slide-left font-display text-[clamp(1rem,2vw,1.4rem)] italic text-gold"
          >
            Static Events
          </span>
          <div className="sr-reveal h-px flex-1 bg-border" data-delay="0.1" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {staticEvents.map((event, idx) => (
            <div
              key={event.name}
              className="sr-reveal group relative aspect-[4/3] overflow-hidden rounded-sm"
              data-delay={String(idx * 0.1)}
            >
              <Image
                src={event.image}
                alt={event.imageAlt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white md:text-2xl">
                  {event.name}
                </h3>
                <p className="mt-1 text-sm text-white/70">{event.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dynamic Events ────────────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-6 pt-8 pb-20">
        {/* gold blob */}
        <div
          className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(212,168,67,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="flex items-center gap-4 pb-6">
          <span
            className="sr-slide-left font-display text-[clamp(1rem,2vw,1.4rem)] italic text-gold"
          >
            Dynamic Events
          </span>
          <div className="sr-reveal h-px flex-1 bg-border" data-delay="0.1" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {dynamicEvents.map((event, idx) => (
            <div
              key={event.name}
              id={event.name.toLowerCase().replace(/\s+/g, "-")}
              className="sr-reveal group relative aspect-[3/2] overflow-hidden rounded-sm"
              data-delay={String(idx * 0.08)}
            >
              <Image
                src={event.image}
                alt={event.imageAlt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white md:text-2xl">
                  {event.name}
                </h3>
                <p className="mt-1 text-sm text-white/70">{event.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
