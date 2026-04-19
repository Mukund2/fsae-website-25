"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { cars } from "@/data/cars";

// The SVG path that defines the curving racetrack
// Sways left/right with varying amplitude for organic feel
const TRACK_PATH = `
  M 100 0
  C 100 40, 145 80, 145 120
  C 145 160, 55 200, 55 240
  C 55 280, 150 320, 150 360
  C 150 400, 45 440, 45 480
  C 45 520, 155 560, 155 600
  C 155 640, 50 680, 50 720
  C 50 760, 148 800, 148 840
  C 148 880, 52 920, 52 960
  C 52 1000, 145 1040, 145 1080
  C 145 1120, 55 1160, 55 1200
  C 55 1240, 150 1280, 150 1320
  C 150 1360, 48 1400, 48 1440
  C 48 1480, 152 1520, 152 1560
  C 152 1600, 50 1640, 50 1680
  C 50 1720, 148 1760, 148 1800
  C 148 1840, 55 1880, 55 1920
  C 55 1960, 100 1980, 100 2000
`;

function RacetrackSurface() {
  return (
    <svg
      className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block"
      width="200"
      preserveAspectRatio="none"
      viewBox="0 0 200 2000"
      style={{ height: "100%" }}
    >
      <defs>
        <path id="track-path" d={TRACK_PATH} />
      </defs>

      {/* Layer 1: White edge lines (widest) */}
      <use
        href="#track-path"
        stroke="#E0E0E0"
        strokeWidth="42"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Layer 2: Asphalt surface */}
      <use
        href="#track-path"
        stroke="#2a2a2a"
        strokeWidth="36"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Layer 3: Subtle gray texture on asphalt */}
      <use
        href="#track-path"
        stroke="#333"
        strokeWidth="34"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />

      {/* Layer 4: White dashed center line */}
      <use
        href="#track-path"
        stroke="#fff"
        strokeWidth="1.5"
        strokeDasharray="10 16"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

function RacetrackCar() {
  const carRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<SVGPathElement | null>(null);
  const trackLengthRef = useRef(0);

  useEffect(() => {
    const car = carRef.current;
    if (!car) return;

    // Get the SVG path element
    const pathEl = document.querySelector("#track-path") as SVGPathElement | null;
    if (!pathEl) return;
    trackRef.current = pathEl;
    trackLengthRef.current = pathEl.getTotalLength();

    // Get the SVG element to map coordinates
    const svgEl = pathEl.closest("svg");
    if (!svgEl) return;

    let lastScrollY = window.scrollY;
    let facingDown = true;
    let currentAngle = 180;
    let raf: number;

    const tick = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;

      if (Math.abs(delta) > 1) {
        facingDown = delta > 0;
      }
      lastScrollY = scrollY;

      const path = trackRef.current;
      const totalLen = trackLengthRef.current;
      if (!path || !totalLen) {
        raf = requestAnimationFrame(tick);
        return;
      }

      // Calculate scroll progress through the timeline section
      const timelineSection = svgEl.closest("section");
      if (!timelineSection) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const rect = timelineSection.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewH = window.innerHeight;

      // Progress: 0 at section top, 1 at section bottom
      let progress = -sectionTop / (sectionHeight - viewH);
      progress = Math.max(0, Math.min(1, progress));

      // Get point on path
      const point = path.getPointAtLength(progress * totalLen);

      // Convert SVG coordinates to screen coordinates
      const svgRect = svgEl.getBoundingClientRect();
      const svgViewBox = svgEl.viewBox.baseVal;
      const scaleX = svgRect.width / svgViewBox.width;
      const scaleY = svgRect.height / svgViewBox.height;

      const screenX = svgRect.left + point.x * scaleX;
      const screenY = svgRect.top + point.y * scaleY;

      // Calculate path angle for steering
      const nextPoint = path.getPointAtLength(Math.min(progress * totalLen + 5, totalLen));
      const pathAngle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

      // Flip 180 if scrolling up
      const directionOffset = facingDown ? 90 : -90;
      const targetAngle = pathAngle + directionOffset;
      currentAngle += (targetAngle - currentAngle) * 0.15;

      car.style.position = "fixed";
      car.style.left = `${screenX}px`;
      car.style.top = `${screenY}px`;
      car.style.transform = `translate(-50%, -50%) rotate(${currentAngle}deg)`;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={carRef} className="z-30 hidden md:block" style={{ position: "fixed" }}>
      <svg viewBox="0 0 28 48" width="20" height="34">
        <rect x="5" y="6" width="18" height="34" rx="9" fill="#111" />
        <path d="M9 6 L14 0 L19 6" fill="#111" />
        <rect x="1" y="12" width="5" height="9" rx="2" fill="#000" />
        <rect x="22" y="12" width="5" height="9" rx="2" fill="#000" />
        <rect x="1" y="29" width="5" height="9" rx="2" fill="#000" />
        <rect x="22" y="29" width="5" height="9" rx="2" fill="#000" />
        <ellipse cx="14" cy="20" rx="4" ry="5" fill="#333" />
        <rect x="3" y="38" width="22" height="3" rx="1" fill="#000" />
      </svg>
    </div>
  );
}

function CheckeredLine({ label }: { label: string }) {
  return (
    <div className="relative mx-auto hidden w-full max-w-[60px] md:block">
      <div className="mx-auto flex h-4 w-14 flex-wrap overflow-hidden">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 ${
              (Math.floor(i / 7) + (i % 7)) % 2 === 0 ? "bg-black" : "bg-white"
            }`}
          />
        ))}
      </div>
      <p className="mt-2 text-center font-display text-[8px] uppercase tracking-[0.3em] text-foreground/40">
        {label}
      </p>
    </div>
  );
}

export default function CarsPage() {
  return (
    <>
      <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-surface pt-32 pb-16">
        <div className="relative mx-auto max-w-7xl px-6">
          <span
            className="text-[clamp(1.4rem,3vw,2rem)] italic text-gold"
            style={{ fontFamily: "var(--font-script), serif" }}
          >
            1989 &ndash; Present
          </span>
          <h1
            className="mt-3 font-display text-[clamp(3rem,7vw,6rem)] font-bold uppercase italic leading-[0.95] text-foreground"
            style={{ opacity: 0, animation: "heroFadeIn 0.8s ease-out 0.3s forwards" }}
          >
            Our Cars
          </h1>
          <p
            className="mt-4 max-w-lg font-body text-lg text-foreground/60"
            style={{ opacity: 0, animation: "heroFadeIn 0.8s ease-out 0.6s forwards" }}
          >
            Every car we&apos;ve ever built, from SR-0 to SR-16.
          </p>
        </div>
      </section>

      <section className="relative bg-surface py-12 overflow-hidden">
        <RacetrackCar />
        <RacetrackSurface />

        <div className="mx-auto max-w-5xl px-6">
          <CheckeredLine label="start" />

          <div className="mt-12 flex flex-col gap-0">
            {cars.map((car, i) => (
              <TimelineEntry key={car.slug} car={car} isLeft={i % 2 === 0} />
            ))}
          </div>

          <div className="mt-12">
            <CheckeredLine label="finish" />
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

function TimelineEntry({
  car,
  isLeft,
}: {
  car: (typeof cars)[number];
  isLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.style.animation = "timelineCardIn 0.5s ease-out forwards";
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
      <div
        className={`md:w-[calc(50%-3rem)] ${
          isLeft ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"
        }`}
      >
        <div className="timeline-card border border-border/60 bg-elevated p-4 shadow-sm" style={{ borderColor: 'rgba(200, 168, 78, 0.1)' }}>
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="font-display text-[11px] uppercase tracking-[0.2em] text-foreground/40">
                {car.years}
              </p>
              <h2 className="mt-1 font-display text-2xl uppercase tracking-tight md:text-3xl">
                {car.name}
              </h2>
            </div>
            {car.battery && (
              <span className="hidden whitespace-nowrap font-display text-[10px] uppercase tracking-wider text-muted sm:inline">
                EV
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
              <span className="font-display text-[11px] uppercase tracking-[0.15em] text-muted">
                {car.motor}
              </span>
            )}
            {car.power && (
              <span className="font-display text-[11px] uppercase tracking-[0.15em] text-muted">
                {car.power}
              </span>
            )}
            {car.torque && (
              <span className="font-display text-[11px] uppercase tracking-[0.15em] text-muted">
                {car.torque}
              </span>
            )}
            {car.battery && (
              <span className="font-display text-[11px] uppercase tracking-[0.15em] text-muted">
                {car.battery}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
