import { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { team, subteams } from "@/data/team";
import { RevealText } from "@/components/animation/reveal-text";
import { StaggerChildren } from "@/components/animation/stagger-children";

export const metadata: Metadata = {
  title: "About | SJSU Spartan Racing",
  description: "Meet the team behind SJSU Spartan Racing — our mission, executive board, and subteams.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center pt-24 overflow-hidden">
        {/* Gradient overlay background */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/80 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,168,67,0.08)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <RevealText
            as="h1"
            className="font-display text-5xl uppercase tracking-tight md:text-7xl"
          >
            About Us
          </RevealText>
          <RevealText
            as="p"
            className="mt-4 max-w-2xl text-lg text-muted"
            delay={0.3}
          >
            We are a multidisciplinary team of engineers, designers, and business minds united by a passion for motorsport and innovation.
          </RevealText>
        </div>
      </section>

      {/* Mission */}
      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <StaggerChildren className="flex flex-col justify-center gap-6">
            <RevealText
              as="h2"
              className="font-display text-3xl uppercase tracking-tight md:text-4xl"
            >
              Our Mission
            </RevealText>
            <p className="text-muted leading-relaxed">
              SJSU Spartan Racing exists to provide students with hands-on engineering experience
              that bridges the gap between classroom theory and real-world application. Through the
              design, manufacturing, and testing of a competitive formula-style race car, our members
              develop technical skills, leadership abilities, and professional networks that prepare
              them for careers in engineering and beyond.
            </p>
          </StaggerChildren>
          <div className="flex items-center justify-center rounded-lg bg-elevated p-12">
            <p className="font-display text-2xl uppercase text-muted/30">Team Photo</p>
          </div>
        </div>
      </Section>

      {/* Executive Board */}
      <Section className="bg-surface">
        <RevealText
          as="h2"
          className="font-display text-3xl uppercase tracking-tight md:text-4xl"
        >
          Executive Board
        </RevealText>
        <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.08}>
          {team.map((member) => (
            <div
              key={member.name}
              className="group relative overflow-hidden rounded-lg bg-elevated p-6 border border-transparent transition-all duration-300 hover:scale-[1.03] hover:border-gold/40 hover:shadow-[0_0_20px_rgba(212,168,67,0.15)]"
            >
              <div className="mb-4 aspect-square w-full rounded-lg bg-background transition-transform duration-300 group-hover:scale-[1.02]" />
              <h3 className="font-display text-xl uppercase">{member.name}</h3>
              <p className="text-sm text-gold">{member.role}</p>
            </div>
          ))}
        </StaggerChildren>
      </Section>

      {/* Subteams */}
      <Section>
        <RevealText
          as="h2"
          className="font-display text-3xl uppercase tracking-tight md:text-4xl"
        >
          Our Subteams
        </RevealText>
        <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
          {subteams.map((sub) => (
            <div
              key={sub.name}
              className="rounded-lg border border-border bg-surface p-8 transition-all duration-300 hover:border-gold/50 hover:shadow-[0_0_15px_rgba(212,168,67,0.1)]"
            >
              <h3 className="font-display text-2xl uppercase">{sub.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{sub.description}</p>
            </div>
          ))}
        </StaggerChildren>
      </Section>
    </>
  );
}
