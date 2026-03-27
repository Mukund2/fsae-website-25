import Image from "next/image";
import { Section } from "@/components/layout/section";
import { cars } from "@/data/cars";
import { RevealText } from "@/components/animation/reveal-text";

export default function CarsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/80 to-background" />
        <div className="relative mx-auto max-w-7xl px-6">
          <RevealText
            as="h1"
            className="font-display text-5xl uppercase tracking-tight md:text-7xl"
          >
            Our Cars
          </RevealText>
          <RevealText
            as="p"
            className="mt-4 max-w-2xl text-lg text-muted"
          >
            21 cars. Three decades of engineering. From a senior project to
            electric racecars.
          </RevealText>
        </div>
      </section>

      {/* Car List */}
      <Section>
        <div className="flex flex-col gap-6">
          {cars.map((car, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={car.slug}
                className={`flex flex-col overflow-hidden rounded-lg border border-surface bg-elevated md:flex-row ${
                  !isEven ? "md:flex-row-reverse" : ""
                }`}
                style={{
                  opacity: 1,
                  animation: `carFadeIn 0.4s ease-out ${i * 0.03}s both`,
                }}
              >
                {/* Image */}
                <div className="relative aspect-video w-full shrink-0 bg-surface md:aspect-auto md:w-2/5">
                  {car.image ? (
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  ) : (
                    <div className="flex h-full min-h-[200px] items-center justify-center">
                      <span className="font-display text-4xl uppercase text-muted/20">
                        {car.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
                  <p className="text-sm font-medium uppercase tracking-widest text-gold">
                    {car.years}
                  </p>
                  <h2 className="mt-1 font-display text-3xl uppercase tracking-tight md:text-4xl">
                    {car.name}
                  </h2>

                  {/* Specs row */}
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    {car.motor && (
                      <div>
                        <span className="text-xs uppercase tracking-wider text-muted">
                          Motor
                        </span>
                        <p className="text-sm font-medium">{car.motor}</p>
                      </div>
                    )}
                    {car.power && (
                      <div>
                        <span className="text-xs uppercase tracking-wider text-muted">
                          Power
                        </span>
                        <p className="text-sm font-medium">{car.power}</p>
                      </div>
                    )}
                    {car.torque && (
                      <div>
                        <span className="text-xs uppercase tracking-wider text-muted">
                          Torque
                        </span>
                        <p className="text-sm font-medium">{car.torque}</p>
                      </div>
                    )}
                    {car.battery && (
                      <div>
                        <span className="text-xs uppercase tracking-wider text-muted">
                          Battery
                        </span>
                        <p className="text-sm font-medium">{car.battery}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <style>{`
          @keyframes carFadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </Section>
    </>
  );
}
