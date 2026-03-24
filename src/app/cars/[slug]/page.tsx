import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/section";
import { cars } from "@/data/cars";

interface CarDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: CarDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = cars.find((c) => c.slug === slug);
  if (!car) return { title: "Car Not Found" };
  return {
    title: `${car.name} | SJSU Spartan Racing`,
    description: car.description,
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { slug } = await params;
  const car = cars.find((c) => c.slug === slug);
  if (!car) notFound();

  const currentIndex = cars.findIndex((c) => c.slug === slug);
  const prevCar = currentIndex > 0 ? cars[currentIndex - 1] : null;
  const nextCar = currentIndex < cars.length - 1 ? cars[currentIndex + 1] : null;

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-end bg-surface pb-12 pt-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <span className="text-sm uppercase tracking-widest text-gold">{car.type} · {car.year}</span>
          <h1 className="mt-2 font-display text-5xl uppercase tracking-tight md:text-8xl">
            {car.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{car.description}</p>
        </div>
      </section>

      {/* Specs */}
      <Section>
        <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
          Technical <span className="text-gold">Specs</span>
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {car.specs.map((spec) => (
            <div key={spec.label} className="flex justify-between rounded-lg bg-surface p-4">
              <span className="text-sm uppercase tracking-wider text-muted">{spec.label}</span>
              <span className="font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Navigation */}
      <Section>
        <div className="flex items-center justify-between border-t border-border pt-8">
          {prevCar ? (
            <Link href={`/cars/${prevCar.slug}`} className="group text-left">
              <span className="text-xs uppercase tracking-widest text-muted">Previous</span>
              <p className="font-display text-xl uppercase text-gold transition-colors group-hover:text-gold/80">
                {prevCar.name}
              </p>
            </Link>
          ) : <div />}
          {nextCar ? (
            <Link href={`/cars/${nextCar.slug}`} className="group text-right">
              <span className="text-xs uppercase tracking-widest text-muted">Next</span>
              <p className="font-display text-xl uppercase text-gold transition-colors group-hover:text-gold/80">
                {nextCar.name}
              </p>
            </Link>
          ) : <div />}
        </div>
      </Section>
    </>
  );
}
