"use client";

import { Section } from "@/components/layout/section";
import { RevealText } from "@/components/animation/reveal-text";

export function Mission() {
  return (
    <Section className="relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute -left-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-gold/[0.03] blur-[100px]" aria-hidden="true" />

      <div className="relative grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <RevealText
            as="h2"
            className="font-display text-4xl uppercase tracking-tight md:text-5xl"
          >
            {"Engineering "}
          </RevealText>
          <RevealText
            as="span"
            className="font-display text-4xl uppercase tracking-tight text-gold md:text-5xl"
            delay={0.2}
          >
            Excellence
          </RevealText>
          {/* Decorative gold rule */}
          <div className="mt-6 h-px w-24 bg-gradient-to-r from-gold to-transparent" />
        </div>
        <RevealText
          as="p"
          className="text-lg leading-relaxed text-muted"
          delay={0.3}
        >
          SJSU Spartan Racing is a student-run engineering team that designs, builds, and races a formula-style race car every year. We compete in the Formula SAE competition series, pushing the boundaries of what&apos;s possible with innovation, teamwork, and relentless drive.
        </RevealText>
      </div>
    </Section>
  );
}
