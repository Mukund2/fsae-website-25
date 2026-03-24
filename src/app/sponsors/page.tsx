import { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { sponsors } from "@/data/sponsors";

export const metadata: Metadata = {
  title: "Sponsors | SJSU Spartan Racing",
  description: "Our sponsors make it all possible. Partner with SJSU Spartan Racing.",
};

const tierOrder = ["platinum", "gold", "silver", "bronze"] as const;
const tierStyles = {
  platinum: "lg:grid-cols-2 gap-8",
  gold: "lg:grid-cols-3 gap-6",
  silver: "grid-cols-2 lg:grid-cols-4 gap-4",
  bronze: "grid-cols-3 lg:grid-cols-6 gap-4",
};

export default function SponsorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[50vh] items-center bg-surface pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-display text-5xl uppercase tracking-tight md:text-7xl">
            Our <span className="text-gold">Sponsors</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            We couldn&apos;t do it without the generous support of our partners.
          </p>
        </div>
      </section>

      {/* Sponsor Tiers */}
      {tierOrder.map((tier) => {
        const tierSponsors = sponsors.filter((s) => s.tier === tier);
        if (tierSponsors.length === 0) return null;

        return (
          <Section key={tier}>
            <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
              <span className="text-gold capitalize">{tier}</span> Partners
            </h2>
            <div className={`mt-8 grid ${tierStyles[tier]}`}>
              {tierSponsors.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="flex flex-col items-center rounded-lg border border-border bg-surface p-6 text-center transition-colors hover:border-gold/30"
                >
                  <div className="flex h-20 w-full items-center justify-center rounded bg-background">
                    <span className="text-sm text-muted/40">{sponsor.name}</span>
                  </div>
                  {sponsor.description && (
                    <p className="mt-4 text-sm text-muted">{sponsor.description}</p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        );
      })}

      {/* CTA */}
      <Section className="text-center">
        <h2 className="font-display text-3xl uppercase tracking-tight md:text-5xl">
          Become a <span className="text-gold">Sponsor</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
          Partner with the next generation of engineers. Contact us to learn about sponsorship opportunities.
        </p>
        <a
          href="mailto:sjsu.fsae@gmail.com"
          className="mt-8 inline-block bg-gold px-8 py-4 font-display text-lg uppercase tracking-wider text-background transition-colors hover:bg-gold/90"
        >
          Contact Us
        </a>
      </Section>
    </>
  );
}
