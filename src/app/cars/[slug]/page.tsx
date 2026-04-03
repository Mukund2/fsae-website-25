import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/section";
import { cars } from "@/data/cars";
import { RevealText } from "@/components/animation/reveal-text";

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
    description: `${car.name} (${car.years})${car.motor ? ` - ${car.motor}` : ""}`,
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { slug } = await params;
  const car = cars.find((c) => c.slug === slug);
  if (!car) notFound();

  const currentIndex = cars.findIndex((c) => c.slug === slug);
  const prevCar = currentIndex > 0 ? cars[currentIndex - 1] : null;
  const nextCar = currentIndex < cars.length - 1 ? cars[currentIndex + 1] : null;

  const specs = [
    car.motor ? { label: "Motor / Engine", value: car.motor } : null,
    car.power ? { label: "Power", value: car.power } : null,
    car.torque ? { label: "Torque", value: car.torque } : null,
    car.battery ? { label: "Battery", value: car.battery } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden pb-12 pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/90 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(212,168,67,0.06)_0%,_transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-6">
          <span className="inline-block bg-gold/10 px-4 py-1.5 text-sm uppercase tracking-widest text-gold">
            {car.years}
          </span>
          <RevealText
            as="h1"
            className="mt-4 font-display text-5xl uppercase tracking-tight md:text-8xl"
          >
            {car.name}
          </RevealText>
        </div>
      </section>

      {/* Car image if available */}
      {car.image && (
        <Section>
          <div className="relative aspect-video w-full overflow-hidden bg-surface">
            <Image
              src={car.image}
              alt={car.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
          </div>
        </Section>
      )}

      {/* Specs */}
      {specs.length > 0 && (
        <Section>
          <RevealText
            as="h2"
            className="font-display text-3xl uppercase tracking-tight md:text-4xl"
          >
            Specifications
          </RevealText>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="border border-surface bg-surface p-5"
              >
                <span className="text-xs uppercase tracking-widest text-muted/70">
                  {spec.label}
                </span>
                <p className="mt-1 font-display text-xl uppercase tracking-tight md:text-2xl">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Navigation */}
      <Section>
        <div className="flex items-center justify-between border-t border-surface pt-8">
          {prevCar ? (
            <Link href={`/cars/${prevCar.slug}`} className="group text-left">
              <span className="text-xs uppercase tracking-widest text-muted">Previous</span>
              <p className="font-display text-xl uppercase text-gold">
                {prevCar.name}
              </p>
            </Link>
          ) : <div />}
          {nextCar ? (
            <Link href={`/cars/${nextCar.slug}`} className="group text-right">
              <span className="text-xs uppercase tracking-widest text-muted">Next</span>
              <p className="font-display text-xl uppercase text-gold">
                {nextCar.name}
              </p>
            </Link>
          ) : <div />}
        </div>
      </Section>
    </>
  );
}
