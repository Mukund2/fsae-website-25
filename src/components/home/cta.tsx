import { Section } from "@/components/layout/section";

export function CTA() {
  return (
    <Section className="relative overflow-hidden text-center">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-[500px] w-[500px] rounded-full bg-gold/[0.06] blur-[120px]" />
      </div>

      <div className="relative z-10">
        <h2 className="font-display text-5xl uppercase tracking-tight md:text-7xl lg:text-8xl">
          Join <span className="text-gradient-gold">Spartan Racing</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted md:text-xl">
          Be part of something extraordinary. No experience required — just
          passion and dedication.
        </p>
        <div className="mt-10">
          <a
            href="/join"
            className="glow-gold inline-block rounded-none bg-gold px-12 py-5 font-display text-xl uppercase tracking-wider text-background transition-all hover:bg-gold/90 hover:shadow-[0_0_50px_rgba(212,168,67,0.4)]"
          >
            Get Involved
          </a>
        </div>
      </div>
    </Section>
  );
}
