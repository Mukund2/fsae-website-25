"use client";

import { useEffect, useRef } from "react";
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
      <section className="flex h-[75vh] items-center bg-surface pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="sr-reveal font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Recruitment
          </p>
          <h1 className="sr-reveal mt-3 font-display text-5xl uppercase tracking-tight md:text-7xl" data-delay="0.1">
            <span className="font-bold">Join</span>
            <br />
            <span className="font-light text-foreground/40">Us</span>
          </h1>
          <p className="sr-reveal mt-4 max-w-2xl text-lg text-muted" data-delay="0.2">
            Be part of something bigger. Build a race car. Launch your career.
          </p>
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
        <h2 className="sr-slide-left font-display text-3xl uppercase tracking-tight md:text-4xl">
          <span className="font-bold">Why</span>{" "}
          <span className="font-light text-foreground/40">Spartan Racing?</span>
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
        <h2 className="sr-slide-left font-display text-3xl uppercase tracking-tight md:text-5xl">
          <span className="font-bold">Ready to</span>
          <br />
          <span className="font-light text-foreground/40">Apply?</span>
        </h2>
        <p className="sr-reveal mx-auto mt-4 max-w-xl text-muted" data-delay="0.2">
          Fill out our interest form and we&apos;ll reach out with next steps. Recruitment is ongoing. Apply anytime.
        </p>
        <div className="mt-8">
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
        <h2 className="sr-slide-left font-display text-3xl uppercase tracking-tight md:text-4xl">
          <span className="font-bold">Get in</span>{" "}
          <span className="font-light text-foreground/40">Touch</span>
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div className="sr-reveal">
            <h3 className="font-display text-lg uppercase text-muted">
              Email
            </h3>
            <a
              href="mailto:sjsu.fsae@gmail.com"
              className="inline-flex items-center gap-2 text-gold hover:underline"
            >
              sjsu.fsae@gmail.com
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
