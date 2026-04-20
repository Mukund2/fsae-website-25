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
      {/* Single continuous section with asphalt texture from hero to finish */}
      <section className="relative overflow-hidden" style={{
        backgroundColor: "#e8e4dc",
        backgroundImage: `
          radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px),
          radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)
        `,
        backgroundSize: "4px 4px, 8px 8px",
        backgroundPosition: "0 0, 2px 2px",
      }}>

        {/* ── Hand-drawn illustrations layer ── */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 2000" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.06" stroke="#1a1a1a" strokeLinecap="round" strokeLinejoin="round">
              {/* Tire tracks - left side, wobbly hand-drawn feel */}
              <path d="M120 0 Q115 80,125 160 Q118 240,128 320 Q120 400,126 480 Q119 560,127 640 Q121 720,125 800 Q118 880,126 960 Q120 1040,128 1120 Q121 1200,125 1280 Q119 1360,127 1440 Q120 1520,126 1600 Q118 1680,125 1760 Q121 1840,124 1920 Q120 1960,122 2000" strokeWidth="3" strokeDasharray="8 12" />
              <path d="M135 0 Q130 80,140 160 Q133 240,143 320 Q135 400,141 480 Q134 560,142 640 Q136 720,140 800 Q133 880,141 960 Q135 1040,143 1120 Q136 1200,140 1280 Q134 1360,142 1440 Q135 1520,141 1600 Q133 1680,140 1760 Q136 1840,139 1920 Q135 1960,137 2000" strokeWidth="2" strokeDasharray="6 14" />

              {/* Tire tracks - right side */}
              <path d="M870 0 Q876 80,864 160 Q872 240,862 320 Q869 400,865 480 Q874 560,863 640 Q868 720,866 800 Q875 880,864 960 Q870 1040,862 1120 Q868 1200,866 1280 Q874 1360,863 1440 Q870 1520,865 1600 Q873 1680,866 1760 Q869 1840,867 1920 Q872 1960,869 2000" strokeWidth="3" strokeDasharray="8 12" />
              <path d="M855 0 Q861 80,849 160 Q857 240,847 320 Q854 400,850 480 Q859 560,848 640 Q853 720,851 800 Q860 880,849 960 Q855 1040,847 1120 Q853 1200,851 1280 Q859 1360,848 1440 Q855 1520,850 1600 Q858 1680,851 1760 Q854 1840,852 1920 Q857 1960,854 2000" strokeWidth="2" strokeDasharray="6 14" />

              {/* Cactus 1 - top left, saguaro style */}
              <g transform="translate(60, 280)" strokeWidth="2.5">
                <path d="M0 60 Q-1 40, 0 10 Q1 5, 0 0" />
                <path d="M0 35 Q-8 30, -14 20 Q-15 15, -14 10" />
                <path d="M0 25 Q6 22, 12 15 Q13 10, 12 6" />
                <path d="M-2 60 L2 60" />
              </g>

              {/* Cactus 2 - right side, smaller prickly pear */}
              <g transform="translate(920, 550)" strokeWidth="2">
                <ellipse cx="0" cy="0" rx="8" ry="12" />
                <ellipse cx="-10" cy="-14" rx="6" ry="9" transform="rotate(-15)" />
                <ellipse cx="9" cy="-12" rx="5" ry="8" transform="rotate(10)" />
                <path d="M0 12 L0 18" />
              </g>

              {/* Cactus 3 - left side, mid page */}
              <g transform="translate(40, 900)" strokeWidth="2.5">
                <path d="M0 45 Q-1 25, 0 5 Q1 2, 0 0" />
                <path d="M0 28 Q-10 24, -16 16 Q-17 12, -15 8" />
                <path d="M0 18 Q8 14, 14 8 Q15 5, 13 2" />
                <path d="M-2 45 L2 45" />
              </g>

              {/* Desert mountains - background horizon, very subtle */}
              <g transform="translate(0, 160)" strokeWidth="1.5" opacity="0.5">
                <path d="M0 40 L40 15 L70 30 L120 5 L180 25 L230 8 L280 22 L340 3 L400 18 L450 10 L500 28 L560 6 L620 20 L680 12 L740 30 L800 8 L860 24 L920 10 L960 18 L1000 40" />
              </g>

              {/* Autocross cones scattered */}
              <g strokeWidth="2">
                {/* Cone 1 */}
                <g transform="translate(180, 480)">
                  <path d="M-5 10 L0 -4 L5 10 Z" />
                  <path d="M-6 10 L6 10" />
                </g>
                {/* Cone 2 */}
                <g transform="translate(820, 720)">
                  <path d="M-5 10 L0 -4 L5 10 Z" />
                  <path d="M-6 10 L6 10" />
                </g>
                {/* Cone 3 */}
                <g transform="translate(150, 1100)">
                  <path d="M-4 8 L0 -3 L4 8 Z" />
                  <path d="M-5 8 L5 8" />
                </g>
                {/* Cone 4 - knocked over */}
                <g transform="translate(850, 1350) rotate(70)">
                  <path d="M-4 8 L0 -3 L4 8 Z" />
                  <path d="M-5 8 L5 8" />
                </g>
              </g>

              {/* Small dust clouds / puffs */}
              <g strokeWidth="1.5" opacity="0.4">
                <path d="M200 620 Q205 615, 212 616 Q218 614, 222 618 Q226 615, 230 618" />
                <path d="M780 380 Q785 375, 792 376 Q798 374, 802 378" />
                <path d="M170 1500 Q175 1495, 182 1496 Q188 1494, 192 1498 Q196 1495, 200 1498" />
              </g>

              {/* Skid marks - more organic */}
              <g strokeWidth="1.5" opacity="0.6">
                <path d="M280 300 Q300 308, 320 312" />
                <path d="M700 680 Q720 688, 740 690" />
                <path d="M240 1200 Q260 1208, 280 1212" />
                <path d="M750 1600 Q770 1605, 790 1610" />
              </g>

              {/* Cactus 4 - far right, bottom area */}
              <g transform="translate(940, 1400)" strokeWidth="2">
                <path d="M0 35 Q-1 18, 0 3 Q1 1, 0 0" />
                <path d="M0 20 Q-7 17, -11 11 Q-12 8, -10 5" />
                <path d="M-2 35 L2 35" />
              </g>

              {/* Small rocks/pebbles */}
              <g strokeWidth="1.5" opacity="0.3">
                <ellipse cx="100" cy="650" rx="4" ry="2" />
                <ellipse cx="900" cy="450" rx="3" ry="1.5" />
                <ellipse cx="80" cy="1250" rx="5" ry="2" />
                <ellipse cx="930" cy="1050" rx="3" ry="2" />
                <ellipse cx="160" cy="1750" rx="4" ry="1.5" />
              </g>

              {/* Finish flag doodle near bottom */}
              <g transform="translate(60, 1850)" strokeWidth="2">
                <path d="M0 20 L0 0" />
                <path d="M0 0 L12 2 L12 10 L0 8" />
                <path d="M3 1 L3 5 M6 2 L6 6 M9 3 L9 7" />
              </g>
            </g>
          </svg>
        </div>

        {/* ── Hero area ── */}
        <div className="relative pt-32 pb-16">
          <div className="mx-auto max-w-7xl px-6">
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
        </div>

        {/* ── Timeline area ── */}
        <div className="relative py-12">
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
