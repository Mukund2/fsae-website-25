import { Section } from "@/components/layout/section";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-svh items-center justify-center overflow-hidden bg-background">
        <div className="relative z-10 text-center">
          <h1 className="font-display text-[clamp(3rem,12vw,10rem)] uppercase leading-[0.9] tracking-tight">
            <span className="text-gold">Spartan</span>{" "}
            <span className="text-foreground">Racing</span>
          </h1>
          <p className="mt-4 text-lg text-muted md:text-xl">
            San José State University Formula SAE
          </p>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="h-12 w-6 rounded-full border-2 border-muted/30 p-1">
            <div className="h-2 w-1.5 mx-auto rounded-full bg-gold animate-bounce" />
          </div>
        </div>
      </section>

      {/* Mission */}
      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <h2 className="font-display text-4xl uppercase tracking-tight md:text-5xl">
            Engineering <span className="text-gold">Excellence</span>
          </h2>
          <p className="text-lg leading-relaxed text-muted">
            SJSU Spartan Racing is a student-run engineering team that designs, builds, and races
            a formula-style race car every year. We compete in the Formula SAE competition series,
            pushing the boundaries of what&apos;s possible with innovation, teamwork, and relentless drive.
          </p>
        </div>
      </Section>

      {/* Stats Bar */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4 md:py-16">
          {[
            { value: "35+", label: "Years Active" },
            { value: "16", label: "Cars Built" },
            { value: "100+", label: "Team Members" },
            { value: "7", label: "Subteams" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-4xl text-gold md:text-5xl">{stat.value}</div>
              <div className="mt-2 text-sm uppercase tracking-widest text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Section className="text-center">
        <h2 className="font-display text-4xl uppercase tracking-tight md:text-6xl">
          Join <span className="text-gold">Spartan Racing</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
          Be part of something extraordinary. No experience required — just passion and dedication.
        </p>
        <a
          href="/join"
          className="mt-8 inline-block rounded-none bg-gold px-8 py-4 font-display text-lg uppercase tracking-wider text-background transition-colors hover:bg-gold/90"
        >
          Get Involved
        </a>
      </Section>
    </>
  );
}
