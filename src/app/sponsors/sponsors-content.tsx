"use client";

import { Section } from "@/components/layout/section";
import { RevealText } from "@/components/animation/reveal-text";
import { StaggerChildren } from "@/components/animation/stagger-children";
import { MagneticButton } from "@/components/animation/magnetic-button";
import { AngularDivider } from "@/components/shared/angular-divider";
import { sponsors } from "@/data/sponsors";

const tierOrder = ["platinum", "gold", "silver", "bronze"] as const;
const tierStyles = {
  platinum: "lg:grid-cols-2 gap-8",
  gold: "lg:grid-cols-3 gap-6",
  silver: "grid-cols-2 lg:grid-cols-4 gap-4",
  bronze: "grid-cols-3 lg:grid-cols-6 gap-4",
};

const tierLabels: Record<string, string> = {
  platinum: "Platinum",
  gold: "Gold",
  silver: "Silver",
  bronze: "Bronze",
};

export function SponsorsContent() {
  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[50vh] items-center bg-surface pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <RevealText
            as="h1"
            className="font-display text-5xl uppercase tracking-tight md:text-7xl"
          >
            Our Sponsors
          </RevealText>
          <RevealText
            as="p"
            className="mt-4 max-w-2xl text-lg text-muted"
            delay={0.3}
          >
            We couldn&apos;t do it without the generous support of our partners.
          </RevealText>
        </div>
      </section>

      {/* Sponsor Tiers */}
      {tierOrder.map((tier, tierIndex) => {
        const tierSponsors = sponsors.filter((s) => s.tier === tier);
        if (tierSponsors.length === 0) return null;

        return (
          <div key={tier}>
            {tierIndex > 0 && (
              <AngularDivider className="text-surface" />
            )}
            <Section>
              <RevealText
                as="h2"
                className="font-display text-3xl uppercase tracking-tight md:text-4xl"
              >
                {`${tierLabels[tier]} Partners`}
              </RevealText>
              <StaggerChildren
                className={`mt-8 grid ${tierStyles[tier]}`}
                staggerDelay={0.08}
              >
                {tierSponsors.map((sponsor) => (
                  <a
                    key={sponsor.name}
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center rounded-lg border border-border bg-surface p-6 text-center transition-all duration-300 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/5"
                  >
                    <div className="flex h-20 w-full items-center justify-center rounded bg-background transition-all duration-500 grayscale group-hover:grayscale-0">
                      <span className="text-sm text-muted/40 transition-colors duration-300 group-hover:text-gold/60">
                        {sponsor.name}
                      </span>
                    </div>
                    {sponsor.description && (
                      <p className="mt-4 text-sm text-muted transition-colors duration-300 group-hover:text-foreground/80">
                        {sponsor.description}
                      </p>
                    )}
                  </a>
                ))}
              </StaggerChildren>
            </Section>
          </div>
        );
      })}

      {/* CTA */}
      <AngularDivider className="text-surface" />
      <Section className="text-center">
        <RevealText
          as="h2"
          className="font-display text-3xl uppercase tracking-tight md:text-5xl"
        >
          Become a Sponsor
        </RevealText>
        <RevealText
          as="p"
          className="mx-auto mt-4 max-w-xl text-lg text-muted"
          delay={0.2}
        >
          Partner with the next generation of engineers. Contact us to learn about sponsorship opportunities.
        </RevealText>
        <div className="mt-8">
          <MagneticButton>
            <a
              href="mailto:sjsu.fsae@gmail.com"
              className="inline-block bg-gold px-8 py-4 font-display text-lg uppercase tracking-wider text-background transition-colors hover:bg-gold/90"
            >
              Contact Us
            </a>
          </MagneticButton>
        </div>
      </Section>
    </>
  );
}
