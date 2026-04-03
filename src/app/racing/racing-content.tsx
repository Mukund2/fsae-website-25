"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/* ── Scroll reveal hook (IntersectionObserver + RAF, no CSS transitions) ── */

function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(".sr-reveal");

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
    description:
      "Present your car's engineering to a panel of industry judges who have decades of motorsport and automotive experience. Teams must justify every design choice — from suspension geometry to aerodynamic philosophy — proving that their vehicle represents the best solution to the design brief.",
    image: "/images/sr16/car-action-2.jpg",
    imageAlt: "Spartan Racing car showing design details",
  },
  {
    name: "Cost Report",
    tagline: "Every dollar justified.",
    description:
      "Demonstrate cost-effective manufacturing and material choices with a comprehensive Bill of Materials. Teams document every component, process, and assembly step, proving they can build a competitive vehicle within real-world budget constraints. Judges evaluate both accuracy and the team's understanding of manufacturing economics.",
    image: "/images/events/comp-2.jpg",
    imageAlt: "Team working on cost analysis and car assembly",
  },
];

const dynamicEvents = [
  {
    name: "Acceleration",
    tagline: "75 meters. Full send.",
    description:
      "A 75-meter straight-line sprint from a standing start, testing raw power delivery, traction control, and launch strategy. The difference between first and last is often less than a second. Every detail matters — gear ratios, tire compound, driver reaction time.",
    image: "/images/sr16/car-action-1.jpg",
    imageAlt: "Spartan Racing car launching off the line",
  },
  {
    name: "Skid Pad",
    tagline: "Lateral grip, measured.",
    description:
      "A figure-eight course that isolates lateral acceleration and cornering capability. The car runs two laps in each direction, and only the fastest lap counts. This event strips away everything except mechanical grip, tire performance, and suspension tuning.",
    image: "/images/sr16/car-action-3.jpg",
    imageAlt: "Car cornering on the skid pad course",
  },
  {
    name: "Autocross",
    tagline: "One lap. One chance.",
    description:
      "A single-lap timed run through a tight road course defined by cones. Autocross tests the full dynamic package — acceleration, braking, cornering, and driver skill — in one concentrated effort. The fastest autocross time also sets the starting order for Endurance.",
    image: "/images/sr16/car-action-4.jpg",
    imageAlt: "Car navigating the autocross cone course",
  },
  {
    name: "Endurance",
    tagline: "22 kilometers. No margin for error.",
    description:
      "The defining event of Formula SAE — a 22-kilometer extended race that tests reliability, speed, fuel efficiency, and driver endurance. Cars must survive a mandatory driver change at the halfway point. Mechanical failures here are season-ending. This is where championships are won and lost.",
    image: "/images/cars/car-1.jpg",
    imageAlt: "Spartan Racing car during endurance race",
  },
];

/* ── Key results data ─────────────────────────────────────────────────── */

const keyResults = [
  {
    stat: "2nd",
    label: "Overall",
    context: "Michigan FSAE 2025",
    sub: ["1st Endurance", "Best Aero Vehicle"],
  },
  {
    stat: "5th",
    label: "Overall",
    context: "Michigan FSAE 2024",
    sub: ["1st Cummins Innovation"],
  },
  {
    stat: "2nd",
    label: "Overall",
    context: "Michigan FSAE 2021",
    sub: ["1st Endurance"],
  },
  {
    stat: "1st",
    label: "Overall",
    context: "FSAE Competition 2015",
    sub: [],
  },
];

/* ── Component ─────────────────────────────────────────────────────────── */

export function RacingContent() {
  const ref = useScrollReveal();

  return (
    <div ref={ref}>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden pb-16 pt-32">
        <Image
          src="/images/events/comp-1.jpg"
          alt="Spartan Racing competing at Formula SAE"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />

        <div className="relative mx-auto max-w-7xl px-6">
          <span className="sr-reveal mb-4 inline-block font-mono text-xs uppercase tracking-[0.25em] text-[#0EA5E9]">
            Formula SAE
          </span>
          <h1 className="sr-reveal font-display text-5xl uppercase tracking-tight md:text-7xl lg:text-8xl" data-delay="0.1">
            Competition
          </h1>
          <p className="sr-reveal mt-4 max-w-2xl text-lg text-muted md:text-xl" data-delay="0.25">
            Designing, building, and racing formula-style cars against the best
            university engineering teams in the world.
          </p>
        </div>
      </section>

      {/* ── What is Formula SAE? ───────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <span className="sr-reveal font-mono text-xs uppercase tracking-[0.25em] text-gold">
              The Competition
            </span>
            <h2 className="sr-reveal font-display text-3xl uppercase tracking-tight md:text-4xl" data-delay="0.1">
              What is Formula SAE?
            </h2>
            <p className="sr-reveal leading-relaxed text-muted" data-delay="0.2">
              Formula SAE is the world&apos;s premier student engineering
              competition, organized by SAE International. Each year, university
              teams design, build, and race a small formula-style vehicle,
              evaluated across engineering design, cost efficiency, and on-track
              performance.
            </p>
            <p className="sr-reveal leading-relaxed text-muted" data-delay="0.3">
              Over 600 teams from six continents participate, making it one of
              the most competitive and respected engineering challenges in
              academia. Spartan Racing has represented San Jos&eacute; State
              University in this competition since 2008.
            </p>
          </div>

          <div className="sr-reveal relative aspect-[4/3] overflow-hidden" data-delay="0.15">
            <Image
              src="/images/events/comp-2.jpg"
              alt="Spartan Racing car on track at Formula SAE competition"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── STATIC EVENTS heading ──────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="flex items-center gap-6">
          <span className="sr-reveal font-mono text-xs uppercase tracking-[0.25em] text-gold">
            Static Events
          </span>
          <div className="sr-reveal h-px flex-1 bg-border" data-delay="0.1" />
        </div>
      </section>

      {/* ── Static Event: Design ───────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div className="flex flex-col gap-5">
            <span className="sr-reveal font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
              01
            </span>
            <h2 className="sr-reveal font-display text-4xl uppercase tracking-tight md:text-5xl lg:text-6xl" data-delay="0.05">
              {staticEvents[0].name}
            </h2>
            <p className="sr-reveal font-display text-lg text-gold md:text-xl" data-delay="0.1">
              {staticEvents[0].tagline}
            </p>
            <p className="sr-reveal leading-relaxed text-muted" data-delay="0.15">
              {staticEvents[0].description}
            </p>
          </div>
          <div className="sr-reveal relative aspect-[4/3] overflow-hidden" data-delay="0.1">
            <Image
              src={staticEvents[0].image}
              alt={staticEvents[0].imageAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Static Event: Cost Report ──────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div className="sr-reveal relative aspect-[4/3] overflow-hidden md:order-1" data-delay="0.1">
            <Image
              src={staticEvents[1].image}
              alt={staticEvents[1].imageAlt}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-5 md:order-2">
            <span className="sr-reveal font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
              02
            </span>
            <h2 className="sr-reveal font-display text-4xl uppercase tracking-tight md:text-5xl lg:text-6xl" data-delay="0.05">
              {staticEvents[1].name}
            </h2>
            <p className="sr-reveal font-display text-lg text-gold md:text-xl" data-delay="0.1">
              {staticEvents[1].tagline}
            </p>
            <p className="sr-reveal leading-relaxed text-muted" data-delay="0.15">
              {staticEvents[1].description}
            </p>
          </div>
        </div>
      </section>

      {/* ── Full-bleed divider image ───────────────────────── */}
      <section className="sr-reveal relative h-[50vh] w-full overflow-hidden md:h-[60vh]">
        <Image
          src="/images/cars/car-2.jpg"
          alt="Spartan Racing car on track"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="sr-reveal font-mono text-xs uppercase tracking-[0.3em] text-white/70" data-delay="0.1">
              From static to
            </p>
            <p className="sr-reveal font-display text-5xl uppercase tracking-tight text-white md:text-7xl" data-delay="0.2">
              Dynamic
            </p>
          </div>
        </div>
      </section>

      {/* ── DYNAMIC EVENTS heading ─────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pb-8 pt-20 md:pt-32">
        <div className="flex items-center gap-6">
          <span className="sr-reveal font-mono text-xs uppercase tracking-[0.25em] text-gold">
            Dynamic Events
          </span>
          <div className="sr-reveal h-px flex-1 bg-border" data-delay="0.1" />
        </div>
      </section>

      {/* ── Dynamic events: alternating layout ─────────────── */}
      {dynamicEvents.map((event, idx) => {
        const number = String(idx + 3).padStart(2, "0");
        const imageFirst = idx % 2 !== 0;

        return (
          <section key={event.name} className="mx-auto max-w-7xl px-6 py-16 md:py-24">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
              {imageFirst ? (
                <>
                  <div className="sr-reveal relative aspect-[4/3] overflow-hidden md:order-1" data-delay="0.1">
                    <Image
                      src={event.image}
                      alt={event.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-5 md:order-2">
                    <span className="sr-reveal font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
                      {number}
                    </span>
                    <h2 className="sr-reveal font-display text-4xl uppercase tracking-tight md:text-5xl lg:text-6xl" data-delay="0.05">
                      {event.name}
                    </h2>
                    <p className="sr-reveal font-display text-lg text-gold md:text-xl" data-delay="0.1">
                      {event.tagline}
                    </p>
                    <p className="sr-reveal leading-relaxed text-muted" data-delay="0.15">
                      {event.description}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-5">
                    <span className="sr-reveal font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
                      {number}
                    </span>
                    <h2 className="sr-reveal font-display text-4xl uppercase tracking-tight md:text-5xl lg:text-6xl" data-delay="0.05">
                      {event.name}
                    </h2>
                    <p className="sr-reveal font-display text-lg text-gold md:text-xl" data-delay="0.1">
                      {event.tagline}
                    </p>
                    <p className="sr-reveal leading-relaxed text-muted" data-delay="0.15">
                      {event.description}
                    </p>
                  </div>
                  <div className="sr-reveal relative aspect-[4/3] overflow-hidden" data-delay="0.1">
                    <Image
                      src={event.image}
                      alt={event.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </>
              )}
            </div>
          </section>
        );
      })}

      {/* ── Results section ─────────────────────────────────── */}
      <section className="bg-surface py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <span className="sr-reveal font-mono text-xs uppercase tracking-[0.25em] text-gold">
            Key Achievements
          </span>
          <h2 className="sr-reveal mt-2 font-display text-3xl uppercase tracking-tight md:text-4xl" data-delay="0.1">
            Our Results
          </h2>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {keyResults.map((result, idx) => (
              <div
                key={result.context}
                className="sr-reveal flex flex-col border-t-2 border-gold pt-6"
                data-delay={String(idx * 0.1)}
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-6xl tracking-tight md:text-7xl">
                    {result.stat}
                  </span>
                  <span className="font-display text-2xl uppercase text-muted md:text-3xl">
                    {result.label}
                  </span>
                </div>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {result.context}
                </p>
                {result.sub.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {result.sub.map((s) => (
                      <span
                        key={s}
                        className="bg-gold/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-gold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
