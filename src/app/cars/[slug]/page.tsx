import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/section";
import { cars } from "@/data/cars";
import { RevealText } from "@/components/animation/reveal-text";
import { StaggerChildren } from "@/components/animation/stagger-children";

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

// Determine which spec cells should span 2 columns for bento layout
function getSpanClass(index: number, total: number): string {
  // Make the first spec (usually Motor/Engine) span 2 columns
  if (index === 0) return "sm:col-span-2";
  // If we have an odd remaining count after the first, make the last one span 2
  const remaining = total - 1;
  if (remaining % 2 !== 0 && index === total - 1) return "sm:col-span-2";
  // Also make the description-heavy spec (usually Suspension) span 2 cols
  if (index === total - 1 && total > 6) return "sm:col-span-2";
  return "";
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
      <section className="relative flex min-h-[60vh] items-end overflow-hidden pb-12 pt-24">
        {/* Layered gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/90 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(212,168,67,0.06)_0%,_transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-6">
          <span className="inline-block rounded-full bg-gold/10 px-4 py-1.5 text-sm uppercase tracking-widest text-gold">
            {car.type} · {car.year}
          </span>
          <RevealText
            as="h1"
            className="mt-4 font-display text-5xl uppercase tracking-tight md:text-8xl"
            delay={0.1}
          >
            {car.name}
          </RevealText>
          <RevealText
            as="p"
            className="mt-4 max-w-2xl text-lg text-muted"
            delay={0.4}
          >
            {car.description}
          </RevealText>
        </div>
      </section>

      {/* Angular Divider */}
      <div className="relative h-16 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <svg
          className="absolute -top-px left-0 w-full text-surface"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <polygon points="0,0 1200,0 1200,30 600,60 0,30" />
        </svg>
      </div>

      {/* Specs — Bento Grid */}
      <Section>
        <RevealText
          as="h2"
          className="font-display text-3xl uppercase tracking-tight md:text-4xl"
        >
          Technical Specs
        </RevealText>
        <StaggerChildren
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.05}
        >
          {car.specs.map((spec, i) => (
            <div
              key={spec.label}
              className={`group rounded-lg border border-border bg-surface p-5 transition-all duration-300 hover:border-gold/30 hover:bg-elevated ${getSpanClass(i, car.specs.length)}`}
            >
              <span className="text-xs uppercase tracking-widest text-muted/70">
                {spec.label}
              </span>
              <p className="mt-1 font-display text-xl uppercase tracking-tight md:text-2xl">
                {spec.value}
              </p>
            </div>
          ))}
        </StaggerChildren>
      </Section>

      {/* Angular Divider */}
      <div className="relative h-12 overflow-hidden">
        <svg
          className="absolute -top-px left-0 w-full text-border/30"
          viewBox="0 0 1200 48"
          preserveAspectRatio="none"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <line x1="0" y1="24" x2="550" y2="24" />
          <polyline points="550,24 600,4 650,24" />
          <line x1="650" y1="24" x2="1200" y2="24" />
        </svg>
      </div>

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
