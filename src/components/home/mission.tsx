"use client";

import { Section } from "@/components/layout/section";
import { RevealText } from "@/components/animation/reveal-text";

export function Mission() {
  return (
    <Section>
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
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
