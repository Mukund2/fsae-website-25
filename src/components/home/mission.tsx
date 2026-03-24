"use client";

import Image from "next/image";
import { Section } from "@/components/layout/section";

export function Mission() {
  return (
    <Section className="relative overflow-hidden">
      <div className="relative grid items-center gap-10 md:grid-cols-5 md:gap-16">
        {/* Large photo — 60% */}
        <div className="relative aspect-[4/3] overflow-hidden md:col-span-3">
          <Image
            src="/images/cars/car-1.jpg"
            alt="SJSU Spartan Racing car E227 at autocross competition"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>

        {/* Text — 40% */}
        <div className="md:col-span-2">
          <h2 className="font-display text-4xl uppercase tracking-tight text-foreground md:text-5xl">
            Built by students.
            <br />
            <span className="text-gold">Driven to compete.</span>
          </h2>
          <div className="mt-6 h-px w-24 bg-gradient-to-r from-gold to-transparent" />
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Since 1991, we&apos;ve designed and built 16 formula-style race cars.
            Every bolt, every weld, every line of code — done by San&nbsp;Jos&eacute;
            State students who learn by building something real.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            We compete in Formula SAE against 120+ university teams worldwide,
            tested on engineering design, cost analysis, and raw performance.
          </p>
        </div>
      </div>
    </Section>
  );
}
