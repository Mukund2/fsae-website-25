"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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
      "Engineering, business, design. We need diverse skills to build a winning team.",
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

function OrangeArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold">
      <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Scroll reveal hook ── */
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

export function JoinContent() {
  const ref = useScrollReveal();

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="flex min-h-[50vh] items-center bg-surface pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <span
            className="sr-reveal text-[clamp(1.4rem,3vw,2rem)] italic text-gold"
            style={{ fontFamily: "var(--font-script), serif" }}
          >
            Be Part of Something
          </span>
          <h1 className="sr-reveal mt-3 font-display text-5xl font-bold uppercase italic tracking-tight md:text-7xl" data-delay="0.1">
            Join Us
          </h1>
          <p className="sr-reveal mt-4 max-w-2xl text-lg text-muted" data-delay="0.2">
            Be part of something bigger. Build a race car. Launch your career.
          </p>
        </div>
      </section>

      {/* Stats Row */}
      <Section className="border-b border-border">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="sr-reveal text-center" data-delay={String(i * 0.1)}>
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

      {/* Team photo */}
      <section className="relative w-full">
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <Image
            src="/images/flickr/join-team.jpg"
            alt="Spartan Racing team"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Why Join */}
      <Section>
        <span
          className="sr-slide-left text-[clamp(1.2rem,2.5vw,1.8rem)] italic text-gold"
          style={{ fontFamily: "var(--font-script), serif" }}
        >
          Why Us?
        </span>
        <h2 className="sr-slide-left mt-2 font-display text-3xl font-bold uppercase italic tracking-tight md:text-4xl">
          <span>Why </span>
          <span className="text-gold">Spartan</span>{" "}
          <span className="text-blue">Racing?</span>
        </h2>
        <StaggerChildren
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {whyCards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="sr-reveal group border border-border bg-surface p-8 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
              >
                <div className="flex items-start justify-between">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center bg-gold/10 group-hover:bg-gold/20">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <OrangeArrow />
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
        <span
          className="sr-slide-left text-[clamp(1.2rem,2.5vw,1.8rem)] italic text-gold"
          style={{ fontFamily: "var(--font-script), serif" }}
        >
          Take the Next Step
        </span>
        <h2 className="sr-slide-left mt-2 font-display text-3xl font-bold uppercase italic tracking-tight md:text-5xl">
          Ready to Apply?
        </h2>
        <p className="sr-reveal mx-auto mt-4 max-w-xl text-muted" data-delay="0.2">
          Fill out our interest form and we&apos;ll reach out with next steps. Recruitment is ongoing. Apply anytime.
        </p>
        <div className="sr-reveal mt-8" data-delay="0.3">
          <MagneticButton>
            <a
              href="https://forms.gle/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold px-8 py-4 font-display text-lg uppercase tracking-wider text-background hover:bg-gold/90"
            >
              Apply Now
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-background">
                <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </MagneticButton>
        </div>
      </Section>

      {/* Contact */}
      <Section>
        <span
          className="sr-slide-left text-[clamp(1.2rem,2.5vw,1.8rem)] italic text-gold"
          style={{ fontFamily: "var(--font-script), serif" }}
        >
          Reach Out
        </span>
        <h2 className="sr-slide-left mt-2 font-display text-3xl font-bold uppercase italic tracking-tight md:text-4xl">
          Get in Touch
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div className="sr-reveal">
            <h3 className="font-display text-lg uppercase text-muted">
              Email
            </h3>
            <a
              href="mailto:sjsuformulasae@gmail.com"
              className="inline-flex items-center gap-2 text-gold hover:underline"
            >
              sjsuformulasae@gmail.com
              <OrangeArrow />
            </a>
          </div>
          <div className="sr-reveal" data-delay="0.1">
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
    </div>
  );
}
