"use client";

import Image from "next/image";
import { Section } from "@/components/layout/section";
import { RevealText } from "@/components/animation/reveal-text";
import { StaggerChildren } from "@/components/animation/stagger-children";
import {
  Compass,
  DollarSign,
  Briefcase,
  Zap,
  CircleDot,
  Route,
  Flag,
  Trophy,
  Medal,
  Award,
  Star,
} from "lucide-react";

/* ── Event card data ────────────────────────────────────── */

const fsaeEvents = [
  {
    icon: Compass,
    name: "Design Event",
    description:
      "Present your car\u2019s engineering to a panel of industry judges",
    type: "static" as const,
  },
  {
    icon: DollarSign,
    name: "Cost Report",
    description:
      "Demonstrate cost-effective manufacturing and design choices",
    type: "static" as const,
  },
  {
    icon: Briefcase,
    name: "Business Presentation",
    description:
      "Present a business case for manufacturing 1,000 units/year",
    type: "static" as const,
  },
  {
    icon: Zap,
    name: "Acceleration",
    description: "0\u201375 m straight-line sprint testing raw power",
    type: "dynamic" as const,
  },
  {
    icon: CircleDot,
    name: "Skid Pad",
    description: "Figure-8 course testing cornering capability",
    type: "dynamic" as const,
  },
  {
    icon: Route,
    name: "Autocross",
    description: "Single-lap timed course testing overall performance",
    type: "dynamic" as const,
  },
  {
    icon: Flag,
    name: "Endurance",
    description: "22 km race testing reliability, speed, and fuel efficiency",
    type: "dynamic" as const,
  },
];

/* ── Key results data ───────────────────────────────────── */

const keyResults = [
  {
    year: "2025",
    highlight: "2nd Overall Michigan FSAE",
    details: ["1st Endurance", "Best Aero Vehicle"],
    icon: Medal,
  },
  {
    year: "2024",
    highlight: "5th Overall Michigan",
    details: ["1st Cummins Innovation", "1st EV SoCal Shootout"],
    icon: Trophy,
  },
  {
    year: "2021",
    highlight: "2nd Overall Michigan",
    details: ["1st Endurance", "SRE-5 debut"],
    icon: Medal,
  },
  {
    year: "2015",
    highlight: "1st Overall FSAE Competition",
    details: ["SR-7"],
    icon: Trophy,
  },
  {
    year: "2008",
    highlight: "Rookie of the Year",
    details: ["SR-1"],
    icon: Star,
  },
];

/* ── Component ──────────────────────────────────────────── */

export function RacingContent() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden pb-16 pt-32">
        {/* Background image */}
        <Image
          src="/images/events/comp-1.jpg"
          alt="Spartan Racing competing at Formula SAE"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />

        <div className="relative mx-auto max-w-7xl px-6">
          <span className="mb-4 inline-block font-mono text-xs uppercase tracking-[0.25em] text-gold">
            Formula SAE
          </span>
          <RevealText
            as="h1"
            className="font-display text-5xl uppercase tracking-tight md:text-7xl lg:text-8xl"
          >
            Competition
          </RevealText>
          <RevealText
            as="p"
            className="mt-4 max-w-2xl text-lg text-muted md:text-xl"
            delay={0.3}
          >
            Designing, building, and racing formula-style cars against the best
            university engineering teams in the world.
          </RevealText>
        </div>
      </section>

      {/* ── What is Formula SAE? ─────────────────────── */}
      <Section>
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Text column */}
          <StaggerChildren className="flex flex-col gap-6">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
              The Competition
            </span>
            <RevealText
              as="h2"
              className="font-display text-3xl uppercase tracking-tight md:text-4xl"
            >
              What is Formula SAE?
            </RevealText>
            <p className="leading-relaxed text-muted">
              Formula SAE is the world&apos;s premier student engineering
              competition, organized by SAE International. Each year, university
              teams design, build, and race a small formula-style vehicle,
              evaluated across engineering design, cost efficiency, business
              viability, and on-track performance.
            </p>
            <p className="leading-relaxed text-muted">
              Over 600 teams from six continents participate, making it one of
              the most competitive and respected engineering challenges in
              academia. Spartan Racing has represented San Jos&eacute; State
              University in this competition since 2008.
            </p>
          </StaggerChildren>

          {/* Image column */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="/images/events/comp-2.jpg"
              alt="Spartan Racing car on track at Formula SAE competition"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-foreground/10" />
          </div>
        </div>
      </Section>

      {/* ── Events ───────────────────────────────────── */}
      <Section className="bg-surface">
        <div className="mx-auto max-w-7xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
            7 Scored Events
          </span>
          <RevealText
            as="h2"
            className="mt-2 font-display text-3xl uppercase tracking-tight md:text-4xl"
          >
            Events
          </RevealText>
          <p className="mt-4 max-w-xl text-muted">
            Teams are scored across static and dynamic events, testing every
            aspect of the vehicle and team.
          </p>

          {/* Static events label */}
          <p className="mb-4 mt-12 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
            Static Events
          </p>
          <StaggerChildren
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.06}
          >
            {fsaeEvents
              .filter((e) => e.type === "static")
              .map((event) => {
                const Icon = event.icon;
                return (
                  <div
                    key={event.name}
                    className="racing-card group rounded-lg border border-border bg-elevated p-6"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-gold/10">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="font-display text-lg uppercase">
                      {event.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {event.description}
                    </p>
                  </div>
                );
              })}
          </StaggerChildren>

          {/* Dynamic events label */}
          <p className="mb-4 mt-10 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
            Dynamic Events
          </p>
          <StaggerChildren
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            staggerDelay={0.06}
          >
            {fsaeEvents
              .filter((e) => e.type === "dynamic")
              .map((event) => {
                const Icon = event.icon;
                return (
                  <div
                    key={event.name}
                    className="racing-card group rounded-lg border border-border bg-elevated p-6"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-gold/10">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="font-display text-lg uppercase">
                      {event.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {event.description}
                    </p>
                  </div>
                );
              })}
          </StaggerChildren>
        </div>
      </Section>

      {/* ── Our Results ──────────────────────────────── */}
      <Section>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
          Key Achievements
        </span>
        <RevealText
          as="h2"
          className="mt-2 font-display text-3xl uppercase tracking-tight md:text-4xl"
        >
          Our Results
        </RevealText>

        <StaggerChildren className="mt-12 space-y-0" staggerDelay={0.1}>
          {keyResults.map((result, idx) => {
            const Icon = result.icon;
            return (
              <div
                key={result.year + result.highlight}
                className="racing-result group relative flex gap-6 border-l-2 border-border py-8 pl-8 md:gap-10"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-10 h-4 w-4 rounded-full border-2 border-gold bg-background" />

                {/* Year */}
                <span className="shrink-0 font-display text-4xl text-gold md:text-5xl">
                  {result.year}
                </span>

                {/* Content */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-gold" />
                    <h3 className="font-display text-xl uppercase md:text-2xl">
                      {result.highlight}
                    </h3>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {result.details.map((detail) => (
                      <span
                        key={detail}
                        className="rounded-full bg-gold/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-gold"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </StaggerChildren>
      </Section>
    </>
  );
}
