"use client";

import { Section } from "@/components/layout/section";
import { RevealText } from "@/components/animation/reveal-text";
import { StaggerChildren } from "@/components/animation/stagger-children";
import { MagneticButton } from "@/components/animation/magnetic-button";
import { Counter } from "@/components/animation/counter";
import {
  Wrench,
  Users,
  MapPin,
  Trophy,
  Palette,
  Rocket,
  type LucideIcon,
} from "lucide-react";

interface WhyCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

const whyCards: WhyCard[] = [
  {
    title: "Hands-On Experience",
    description:
      "Design, manufacture, and test real engineering systems. No textbook can replace building a race car.",
    icon: Wrench,
  },
  {
    title: "Industry Connections",
    description:
      "Our alumni work at Tesla, Apple, SpaceX, Boeing, and more. Build your network while building a car.",
    icon: Users,
  },
  {
    title: "Competition Travel",
    description:
      "Represent SJSU at national FSAE competitions. Test your skills against 100+ university teams.",
    icon: MapPin,
  },
  {
    title: "Leadership Growth",
    description:
      "Lead a subteam, manage projects, and develop skills that set you apart in any career.",
    icon: Trophy,
  },
  {
    title: "All Majors Welcome",
    description:
      "Engineering, business, design — we need diverse skills to build a winning team.",
    icon: Palette,
  },
  {
    title: "No Experience Needed",
    description:
      "We teach everything from scratch. Your enthusiasm matters more than your resume.",
    icon: Rocket,
  },
];

const stats = [
  { value: 100, suffix: "+", label: "Alumni at Top Companies" },
  { value: 30, suffix: "+", label: "Years of Racing" },
  { value: 8, suffix: "", label: "Competitions Attended" },
  { value: 6, suffix: "", label: "Engineering Subteams" },
];

export function JoinContent() {
  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[50vh] items-center bg-surface pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <RevealText
            as="h1"
            className="font-display text-5xl uppercase tracking-tight md:text-7xl"
          >
            Join Us
          </RevealText>
          <RevealText
            as="p"
            className="mt-4 max-w-2xl text-lg text-muted"
            delay={0.3}
          >
            Be part of something bigger. Build a race car. Launch your career.
          </RevealText>
        </div>
      </section>

      {/* Stats Row */}
      <Section className="border-b border-border">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                className="font-display text-4xl text-gold md:text-5xl"
              />
              <p className="mt-2 text-sm uppercase tracking-widest text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Join */}
      <Section>
        <RevealText
          as="h2"
          className="font-display text-3xl uppercase tracking-tight md:text-4xl"
        >
          Why Spartan Racing?
        </RevealText>
        <StaggerChildren
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {whyCards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group rounded-lg border border-border bg-surface p-8 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 transition-colors duration-300 group-hover:bg-gold/20">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-display text-xl uppercase">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </StaggerChildren>
      </Section>

      {/* Apply CTA */}
      <Section className="bg-surface text-center">
        <RevealText
          as="h2"
          className="font-display text-3xl uppercase tracking-tight md:text-5xl"
        >
          Ready to Apply?
        </RevealText>
        <RevealText
          as="p"
          className="mx-auto mt-4 max-w-xl text-muted"
          delay={0.2}
        >
          Fill out our interest form and we&apos;ll reach out with next steps. Recruitment is ongoing — apply anytime.
        </RevealText>
        <div className="mt-8">
          <MagneticButton>
            <a
              href="https://forms.gle/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold px-8 py-4 font-display text-lg uppercase tracking-wider text-background transition-colors hover:bg-gold/90"
            >
              Apply Now
            </a>
          </MagneticButton>
        </div>
      </Section>

      {/* Contact */}
      <Section>
        <RevealText
          as="h2"
          className="font-display text-3xl uppercase tracking-tight md:text-4xl"
        >
          Get in Touch
        </RevealText>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-display text-lg uppercase text-muted">
              Email
            </h3>
            <a
              href="mailto:sjsu.fsae@gmail.com"
              className="text-gold hover:underline"
            >
              sjsu.fsae@gmail.com
            </a>
          </div>
          <div>
            <h3 className="font-display text-lg uppercase text-muted">
              Location
            </h3>
            <p>San Jos&eacute; State University</p>
            <p className="text-muted">
              One Washington Square, San Jos&eacute;, CA 95192
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
