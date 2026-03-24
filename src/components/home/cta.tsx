import Image from "next/image";

export function CTA() {
  return (
    <section className="relative overflow-hidden">
      {/* Background photo */}
      <div className="relative flex min-h-[60vh] items-center justify-center px-6 py-24">
        <Image
          src="/images/team/team-1.jpg"
          alt="SJSU Spartan Racing car on Sonoma raceway"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center">
          <h2 className="font-display text-5xl uppercase tracking-tight text-white md:text-7xl lg:text-8xl">
            Join Spartan Racing
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80 md:text-xl">
            Be part of something extraordinary. No experience required — just
            passion and dedication.
          </p>
          <div className="mt-10">
            <a
              href="/join"
              className="glow-gold inline-block bg-gold px-12 py-5 font-display text-xl uppercase tracking-wider text-white hover:bg-gold/90"
            >
              Get Involved
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
