import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { cars } from "@/data/cars";

export const metadata: Metadata = {
  title: "Cars | SJSU Spartan Racing",
  description: "Explore the garage — every car designed and built by SJSU Spartan Racing.",
};

export default function CarsPage() {
  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[50vh] items-center bg-surface pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-display text-5xl uppercase tracking-tight md:text-7xl">
            The <span className="text-gold">Garage</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            From combustion to electric — a legacy of innovation on four wheels.
          </p>
        </div>
      </section>

      {/* Car Grid */}
      <Section>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <Link
              key={car.slug}
              href={`/cars/${car.slug}`}
              className="group relative overflow-hidden rounded-lg bg-surface transition-all hover:bg-elevated"
            >
              <div className="aspect-video w-full bg-elevated transition-transform group-hover:scale-105">
                <div className="flex h-full items-center justify-center">
                  <span className="font-display text-2xl text-muted/20">{car.name}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl uppercase">{car.name}</h3>
                  <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold">
                    {car.type}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">{car.year}</p>
                <p className="mt-3 line-clamp-2 text-sm text-muted">{car.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
