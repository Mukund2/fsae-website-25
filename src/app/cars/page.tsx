"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cars } from "@/data/cars";

function RacetrackCar() {
  const carRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const car = carRef.current;
    if (!car) return;

    let lastScrollY = window.scrollY;
    let currentRotation = 0;
    let raf: number;

    const tick = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 1 : -1; // 1 = down, -1 = up
      const speed = Math.abs(scrollY - lastScrollY);
      lastScrollY = scrollY;

      // Car stays fixed in center of viewport — track moves past it
      // Rotate car based on scroll direction (180 = pointing down, 0 = pointing up)
      const targetRotation = direction > 0 ? 180 : 0;
      currentRotation += (targetRotation - currentRotation) * 0.15;

      // Add slight wobble based on speed
      const wobble = Math.sin(scrollY * 0.02) * 3;

      car.style.transform = `translateX(-50%) rotate(${currentRotation + wobble}deg)`;
      car.style.opacity = speed > 0 ? "1" : "0.6";

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={carRef}
      className="fixed left-1/2 top-1/2 z-30 hidden -translate-y-1/2 md:block"
      style={{ opacity: 0.6 }}
    >
      <svg viewBox="0 0 28 48" width="28" height="48">
        {/* Car body */}
        <rect x="5" y="6" width="18" height="34" rx="9" fill="#D4A843" />
        {/* Nose cone */}
        <path d="M9 6 L14 0 L19 6" fill="#D4A843" />
        {/* Wheels */}
        <rect x="1" y="12" width="5" height="9" rx="2" fill="#1A1A1A" />
        <rect x="22" y="12" width="5" height="9" rx="2" fill="#1A1A1A" />
        <rect x="1" y="29" width="5" height="9" rx="2" fill="#1A1A1A" />
        <rect x="22" y="29" width="5" height="9" rx="2" fill="#1A1A1A" />
        {/* Cockpit */}
        <ellipse cx="14" cy="20" rx="5" ry="6" fill="#111" />
        {/* Rear wing */}
        <rect x="3" y="38" width="22" height="3" rx="1" fill="#333" />
      </svg>
    </div>
  );
}

function StartFinishLine({ type }: { type: "start" | "finish" }) {
  return (
    <div className="relative mx-auto hidden w-16 md:block">
      <div className="mx-auto flex h-8 w-12 flex-wrap overflow-hidden border border-foreground/20">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className={`h-2 w-3 ${(Math.floor(i / 4) + (i % 4)) % 2 === 0 ? "bg-foreground" : "bg-white"}`}
          />
        ))}
      </div>
      <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
        {type}
      </p>
    </div>
  );
}

export default function CarsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center overflow-hidden bg-[#0A0A0A] pt-24">
        <div className="relative mx-auto max-w-7xl px-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
            1989 — Present
          </p>
          <h1
            className="mt-3 font-display text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.95] text-white"
            style={{ opacity: 0, animation: "heroFadeIn 0.8s ease-out 0.3s forwards" }}
          >
            The Garage
          </h1>
          <p
            className="mt-4 max-w-lg font-body text-lg text-white/60"
            style={{ opacity: 0, animation: "heroFadeIn 0.8s ease-out 0.6s forwards" }}
          >
            21 cars. Three decades of engineering. From a senior project to championship-winning electric racecars.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative bg-background py-20">
        <RacetrackCar />

        {/* Track line with curves */}
        <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 md:block">
          {/* Track surface — dark asphalt stripe */}
          <div className="absolute inset-0 bg-foreground/10" />
          {/* Center dashes — white lane markings */}
          <div
            className="absolute inset-0"
            style={{
              background: "repeating-linear-gradient(to bottom, transparent 0px, transparent 12px, #D4A843 12px, #D4A843 24px)",
              opacity: 0.4,
            }}
          />
          {/* Track edge lines */}
          <div className="absolute -left-2 top-0 h-full w-px bg-foreground/5" />
          <div className="absolute -right-2 top-0 h-full w-px bg-foreground/5" />
        </div>

        <div className="mx-auto max-w-5xl px-6">
          {/* Start line */}
          <StartFinishLine type="start" />

          <div className="mt-12 flex flex-col gap-8 md:gap-4">
            {cars.map((car, i) => {
              const isLeft = i % 2 === 0;
              return (
                <TimelineEntry key={car.slug} car={car} isLeft={isLeft} index={i} />
              );
            })}
          </div>

          {/* Finish line */}
          <div className="mt-12">
            <StartFinishLine type="finish" />
          </div>
        </div>
      </section>

      <style>{`
        @keyframes timelineCardIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

function TimelineEntry({ car, isLeft, index }: { car: typeof cars[number]; isLeft: boolean; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.style.animation = `timelineCardIn 0.5s ease-out forwards`;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Center dot */}
      <div className="absolute left-1/2 top-8 z-10 hidden -translate-x-1/2 md:block">
        <div className="h-3 w-3 rounded-full border-2 border-gold bg-background" />
      </div>

      {/* Card — positioned left or right */}
      <div
        className={`md:w-[calc(50%-2rem)] ${isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}
      >
        <div className="border border-border bg-elevated p-5">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                {car.years}
              </p>
              <h2 className="mt-1 font-display text-2xl uppercase tracking-tight md:text-3xl">
                {car.name}
              </h2>
            </div>
            {car.battery && (
              <span className="hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-gold/60 sm:inline">
                Electric
              </span>
            )}
          </div>

          {car.image && (
            <div className="relative mt-3 aspect-video overflow-hidden bg-surface">
              <Image
                src={car.image}
                alt={car.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
                loading="eager"
              />
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
            {car.motor && car.motor !== "Senior Project" && (
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                {car.motor}
              </span>
            )}
            {car.power && (
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                {car.power}
              </span>
            )}
            {car.torque && (
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                {car.torque}
              </span>
            )}
            {car.battery && (
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                {car.battery}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
