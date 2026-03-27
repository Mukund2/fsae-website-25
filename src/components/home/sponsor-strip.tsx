const SPONSORS = [
  "SolidWorks",
  "Ansys",
  "Lincoln Electric",
  "Altium",
  "Brembo",
  "SKF",
] as const;

export function SponsorStrip() {
  return (
    <section className="w-full bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center font-display text-[clamp(1rem,2vw,1.2rem)] uppercase tracking-[0.2em] text-muted">
          Trusted by Our Sponsors
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-12">
          {SPONSORS.map((name) => (
            <span
              key={name}
              className="font-display text-lg uppercase tracking-wider text-muted/50"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
