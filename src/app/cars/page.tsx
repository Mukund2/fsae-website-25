"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { cars } from "@/data/cars";

function RacetrackCar() {
  const carRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const car = carRef.current;
    const track = trackRef.current;
    if (!car || !track) return;

    let currentTop = 0;
    let raf: number;

    const tick = () => {
      const rect = track.getBoundingClientRect();
      const trackTop = rect.top;
      const trackHeight = rect.height;
      const viewH = window.innerHeight;

      // Progress: 0 when track top is at viewport bottom, 1 when track bottom is at viewport top
      const rawProgress = (viewH - trackTop) / (trackHeight + viewH);
      const progress = Math.max(0, Math.min(1, rawProgress));

      // Map progress to vertical position within the track
      const targetTop = progress * trackHeight;
      currentTop += (targetTop - currentTop) * 0.1;

      car.style.top = `${currentTop}px`;
      car.style.opacity = progress > 0.02 && progress < 0.98 ? "1" : "0";

      // Slight rotation based on movement speed
      const velocity = targetTop - currentTop;
      car.style.transform = `translateX(-50%) rotate(${velocity * 0.3}deg)`;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {/* The track line */}
      <div
        ref={trackRef}
        className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
        style={{
          background: "repeating-linear-gradient(to bottom, #D4A843 0px, #D4A843 8px, transparent 8px, transparent 20px)",
        }}
      />
      {/* The car */}
      <div
        ref={carRef}
        className="absolute left-1/2 top-0 z-20 hidden md:block"
        style={{ opacity: 0 }}
      >
        <svg viewBox="0 0 24 44" width="24" height="44">
          {/* Car body */}
          <rect x="4" y="6" width="16" height="32" rx="8" fill="#D4A843" />
          {/* Nose */}
          <rect x="7" y="0" width="10" height="10" rx="4" fill="#D4A843" />
          {/* Wheels */}
          <rect x="1" y="12" width="5" height="8" rx="2" fill="#1A1A1A" />
          <rect x="18" y="12" width="5" height="8" rx="2" fill="#1A1A1A" />
          <rect x="1" y="28" width="5" height="8" rx="2" fill="#1A1A1A" />
          <rect x="18" y="28" width="5" height="8" rx="2" fill="#1A1A1A" />
          {/* Cockpit */}
          <rect x="8" y="14" width="8" height="10" rx="3" fill="#111" />
        </svg>
      </div>
    </>
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
        <div className="relative mx-auto max-w-5xl px-6">
          <RacetrackCar />

          <div className="flex flex-col gap-0">
            {cars.map((car, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={car.slug}
                  className="relative grid grid-cols-1 md:grid-cols-[1fr_60px_1fr] md:gap-0"
                >
                  {/* Left content (or empty) */}
                  <div className={`${isLeft ? "md:pr-8" : "md:order-3 md:pl-8"} py-6`}>
                    {isLeft && (
                      <TimelineCard car={car} align="right" index={i} />
                    )}
                    {!isLeft && <div className="hidden md:block" />}
                  </div>

                  {/* Center dot */}
                  <div className="relative hidden items-center justify-center md:flex">
                    <div className="z-10 h-4 w-4 rounded-full border-2 border-gold bg-background" />
                  </div>

                  {/* Right content (or empty) */}
                  <div className={`${!isLeft ? "md:pl-8" : "md:order-3 md:pr-8"} py-6`}>
                    {!isLeft && (
                      <TimelineCard car={car} align="left" index={i} />
                    )}
                    {isLeft && <div className="hidden md:block" />}
                  </div>

                  {/* Mobile: show card regardless of side */}
                  <div className="md:hidden">
                    <TimelineCard car={car} align="left" index={i} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes timelineCardIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

function TimelineCard({ car, align, index }: { car: typeof cars[number]; align: "left" | "right"; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.style.animation = `timelineCardIn 0.5s ease-out ${index * 0.05}s forwards`;
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`border border-border bg-elevated p-5 ${align === "right" ? "md:text-right" : ""}`}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
        {car.years}
      </p>
      <h2 className="mt-1 font-display text-2xl uppercase tracking-tight md:text-3xl">
        {car.name}
      </h2>

      {/* Image */}
      {car.image && (
        <div className="relative mt-3 aspect-video overflow-hidden bg-surface">
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
            loading="eager"
          />
        </div>
      )}

      {/* Specs */}
      <div className={`mt-3 flex flex-wrap gap-x-4 gap-y-1 ${align === "right" ? "md:justify-end" : ""}`}>
        {car.motor && (
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
  );
}
