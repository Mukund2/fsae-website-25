"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { cars } from "@/data/cars";

// The SVG path that defines the curving racetrack
// Sways left/right with varying amplitude for organic feel
// Consistent S-curve with uniform amplitude so road width stays the same
const TRACK_PATH = `
  M 100 0
  C 100 30, 130 60, 130 100
  C 130 140, 70 180, 70 220
  C 70 260, 130 300, 130 340
  C 130 380, 70 420, 70 460
  C 70 500, 130 540, 130 580
  C 130 620, 70 660, 70 700
  C 70 740, 130 780, 130 820
  C 130 860, 70 900, 70 940
  C 70 980, 130 1020, 130 1060
  C 130 1100, 70 1140, 70 1180
  C 70 1220, 130 1260, 130 1300
  C 130 1340, 70 1380, 70 1420
  C 70 1460, 130 1500, 130 1540
  C 130 1580, 70 1620, 70 1660
  C 70 1700, 130 1740, 130 1780
  C 130 1820, 70 1860, 70 1900
  C 70 1940, 100 1970, 100 2000
`;

function RacetrackSurface() {
  return (
    <svg
      className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block"
      preserveAspectRatio="none"
      viewBox="0 0 200 2000"
      style={{ height: "100%", width: "120px" }}
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

      // Clamp Y to stay within viewport (with padding)
      const clampedY = Math.max(80, Math.min(viewH - 40, screenY));

      // Calculate path angle for steering
      const nextPoint = path.getPointAtLength(Math.min(progress * totalLen + 5, totalLen));
      const pathAngle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

      // Flip 180 if scrolling up
      const directionOffset = facingDown ? 90 : -90;
      const targetAngle = pathAngle + directionOffset;
      currentAngle += (targetAngle - currentAngle) * 0.15;

      // Car follows the track position, clamped to viewport
      car.style.position = "fixed";
      car.style.left = `${screenX}px`;
      car.style.top = `${clampedY}px`;
      car.style.transform = `translate(-50%, -50%) rotate(${currentAngle}deg)`;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={carRef} className="z-30 hidden md:block" style={{ position: "fixed" }}>
      <svg viewBox="0 0 28 48" width="22" height="38">
        <rect x="5" y="6" width="18" height="34" rx="9" fill="#D4A843" />
        <path d="M9 6 L14 0 L19 6" fill="#D4A843" />
        <rect x="1" y="12" width="5" height="9" rx="2" fill="#1a1a1a" />
        <rect x="22" y="12" width="5" height="9" rx="2" fill="#1a1a1a" />
        <rect x="1" y="29" width="5" height="9" rx="2" fill="#1a1a1a" />
        <rect x="22" y="29" width="5" height="9" rx="2" fill="#1a1a1a" />
        <ellipse cx="14" cy="20" rx="4" ry="5" fill="#B8962E" />
        <rect x="3" y="38" width="22" height="3" rx="1" fill="#1a1a1a" />
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

      <section className="relative py-12 overflow-hidden" style={{
        backgroundColor: "#e8e4dc",
        backgroundImage: `
          radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px),
          radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)
        `,
        backgroundSize: "4px 4px, 8px 8px",
        backgroundPosition: "0 0, 2px 2px",
      }}>
        {/* Tire track marks */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true">
          <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            {/* Left tire track */}
            <path d="M15 0 Q12 25, 18 50 Q14 75, 16 100" stroke="#000" strokeWidth="0.8" fill="none" strokeDasharray="2 3" />
            <path d="M16.5 0 Q13.5 25, 19.5 50 Q15.5 75, 17.5 100" stroke="#000" strokeWidth="0.4" fill="none" strokeDasharray="1.5 4" />
            {/* Right tire track */}
            <path d="M83 0 Q86 25, 80 50 Q84 75, 82 100" stroke="#000" strokeWidth="0.8" fill="none" strokeDasharray="2 3" />
            <path d="M84.5 0 Q87.5 25, 81.5 50 Q85.5 75, 83.5 100" stroke="#000" strokeWidth="0.4" fill="none" strokeDasharray="1.5 4" />
            {/* Faint diagonal skid marks */}
            <path d="M30 15 Q35 18, 38 22" stroke="#000" strokeWidth="0.3" fill="none" />
            <path d="M65 45 Q70 48, 73 52" stroke="#000" strokeWidth="0.3" fill="none" />
            <path d="M25 70 Q30 73, 33 77" stroke="#000" strokeWidth="0.3" fill="none" />
            <path d="M72 85 Q77 88, 80 92" stroke="#000" strokeWidth="0.3" fill="none" />
          </svg>
        </div>
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

  // Slight random rotation for organic Polaroid feel
  const rotation = isLeft ? -1.5 : 1.5;

  // Combine specs into a single Sharpie line
  const specs = [car.motor, car.power, car.torque, car.battery]
    .filter((s): s is string => !!s && s !== "Senior Project")
    .join(" · ");

  return (
    <div ref={ref} className="relative">
      <div
        className={`md:w-[calc(50%-3rem)] ${
          isLeft ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"
        }`}
      >
        {/* Polaroid card */}
        <div
          className="bg-white p-3 pb-20 shadow-lg relative"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Photo with vintage filter */}
          {car.image ? (
            <div className="relative aspect-[4/3] overflow-hidden bg-surface">
              <Image
                src={car.image}
                alt={car.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
                loading="eager"
                style={{ filter: `sepia(0.15) contrast(${car.slug === "sr-16" || car.slug === "sr-15" ? "0.85" : "1.05"}) saturate(0.9) brightness(${car.slug === "sr-16" || car.slug === "sr-15" ? "1.5" : "1.02"})` }}
              />
              {/* Slight warm overlay for vintage feel */}
              <div className="absolute inset-0 bg-amber-100/10 mix-blend-multiply" />
            </div>
          ) : (
            <div className="aspect-[4/3] bg-surface flex items-center justify-center">
              <span className="text-foreground/20 text-4xl" style={{ fontFamily: "var(--font-marker)" }}>
                {car.name}
              </span>
            </div>
          )}

          {/* Sharpie-style text on the white border */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
            <h2
              className="text-[1.3rem] text-foreground/90 md:text-[1.5rem]"
              style={{ fontFamily: "var(--font-marker)" }}
            >
              {car.name}
            </h2>
            <p
              className="mt-0.5 text-[0.7rem] text-foreground/50"
              style={{ fontFamily: "var(--font-marker)" }}
            >
              {car.years}{specs ? ` · ${specs}` : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
