import { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { team, subteams } from "@/data/team";

export const metadata: Metadata = {
  title: "About | SJSU Spartan Racing",
  description: "Meet the team behind SJSU Spartan Racing — our mission, executive board, and subteams.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[50vh] items-center bg-surface pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-display text-5xl uppercase tracking-tight md:text-7xl">
            About <span className="text-gold">Us</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            We are a multidisciplinary team of engineers, designers, and business minds united by
            a passion for motorsport and innovation.
          </p>
        </div>
      </section>

      {/* Mission */}
      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
              Our <span className="text-gold">Mission</span>
            </h2>
            <p className="mt-6 text-muted leading-relaxed">
              SJSU Spartan Racing exists to provide students with hands-on engineering experience
              that bridges the gap between classroom theory and real-world application. Through the
              design, manufacturing, and testing of a competitive formula-style race car, our members
              develop technical skills, leadership abilities, and professional networks that prepare
              them for careers in engineering and beyond.
            </p>
          </div>
          <div className="flex items-center justify-center rounded-lg bg-elevated p-12">
            <p className="font-display text-2xl uppercase text-muted/30">Team Photo</p>
          </div>
        </div>
      </Section>

      {/* Executive Board */}
      <Section className="bg-surface">
        <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
          Executive <span className="text-gold">Board</span>
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="group relative overflow-hidden rounded-lg bg-elevated p-6 transition-colors hover:bg-elevated/80"
            >
              <div className="mb-4 aspect-square w-full rounded-lg bg-background" />
              <h3 className="font-display text-xl uppercase">{member.name}</h3>
              <p className="text-sm text-gold">{member.role}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Subteams */}
      <Section>
        <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
          Our <span className="text-gold">Subteams</span>
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subteams.map((sub) => (
            <div
              key={sub.name}
              className="rounded-lg border border-border bg-surface p-8 transition-colors hover:border-gold/30"
            >
              <h3 className="font-display text-2xl uppercase">{sub.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{sub.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
