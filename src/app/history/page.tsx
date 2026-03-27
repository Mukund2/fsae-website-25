"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/layout/section";
import { timeline } from "@/data/timeline";
import { RevealText } from "@/components/animation/reveal-text";

gsap.registerPlugin(ScrollTrigger);

/* Inject keyframe animations for timeline nodes (no CSS transitions) */
if (typeof document !== "undefined") {
  const id = "history-keyframes";
  if (!document.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-40px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes slideInRight {
        from { opacity: 0; transform: translateX(40px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes dotPulse {
        from { transform: scale(0.6); opacity: 0.5; }
        to   { transform: scale(1); opacity: 1; }
      }
      @keyframes carIdle {
        0%, 100% { filter: drop-shadow(0 0 6px rgba(212,168,67,0.4)); }
        50% { filter: drop-shadow(0 0 12px rgba(212,168,67,0.7)); }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ── Racetrack Car Component ── */
function RacetrackCar({ timelineRef }: { timelineRef: React.RefObject<HTMLDivElement | null> }) {
  const carRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const currentTop = useRef(0);
  const targetTop = useRef(0);

  const updateCarPosition = useCallback(() => {
    const car = carRef.current;
    const tl = timelineRef.current;
    if (!car || !tl) {
      rafRef.current = requestAnimationFrame(updateCarPosition);
      return;
    }

    const tlRect = tl.getBoundingClientRect();
    const viewportH = window.innerHeight;

    /* Calculate scroll progress through the timeline section (0 → 1) */
    const tlTop = tlRect.top;
    const tlBottom = tlRect.bottom;
    const tlHeight = tlRect.height;

    /* Timeline enters view when its top reaches bottom of viewport,
       and exits when its bottom reaches top of viewport */
    const scrolled = viewportH - tlTop;
    const totalTravel = tlHeight + viewportH;
    const rawProgress = scrolled / totalTravel;
    const progress = Math.max(0, Math.min(1, rawProgress));

    /* Map progress to a vertical position within the viewport.
       Car stays within 15% → 85% of viewport height */
    const minTop = viewportH * 0.15;
    const maxTop = viewportH * 0.85;
    targetTop.current = minTop + progress * (maxTop - minTop);

    /* Smooth lerp for fluid movement (no CSS transitions!) */
    currentTop.current += (targetTop.current - currentTop.current) * 0.12;

    /* Apply position directly via DOM (no React re-renders) */
    car.style.top = `${currentTop.current}px`;

    /* Slight rotation based on velocity for a "steering" feel */
    const velocity = targetTop.current - currentTop.current;
    const rotation = Math.max(-8, Math.min(8, velocity * 0.3));
    car.style.transform = `translateX(-50%) rotate(${rotation}deg)`;

    /* Opacity: fade in/out at edges */
    const opacity = progress <= 0.01 || progress >= 0.99 ? 0 : 1;
    car.style.opacity = String(opacity);

    rafRef.current = requestAnimationFrame(updateCarPosition);
  }, [timelineRef]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(updateCarPosition);
    return () => cancelAnimationFrame(rafRef.current);
  }, [updateCarPosition]);

  return (
    <div
      ref={carRef}
      className="pointer-events-none fixed z-50 hidden md:block"
      style={{
        left: "50%",
        top: "0px",
        opacity: "0",
        willChange: "top, transform, opacity",
        animation: "carIdle 2s ease-in-out infinite",
      }}
    >
      {/* Top-down race car silhouette */}
      <svg viewBox="0 0 20 40" width="20" height="40">
        {/* Body */}
        <rect x="2" y="5" width="16" height="30" rx="8" fill="#D4A843" />
        {/* Nose */}
        <rect x="5" y="0" width="10" height="8" rx="3" fill="#D4A843" />
        {/* Front-left wheel */}
        <rect x="0" y="10" width="4" height="8" rx="1" fill="#333" />
        {/* Front-right wheel */}
        <rect x="16" y="10" width="4" height="8" rx="1" fill="#333" />
        {/* Rear-left wheel */}
        <rect x="0" y="25" width="4" height="8" rx="1" fill="#333" />
        {/* Rear-right wheel */}
        <rect x="16" y="25" width="4" height="8" rx="1" fill="#333" />
      </svg>
    </div>
  );
}

/* ── Pit Stop Markers (shown along the center track line on desktop) ── */
function PitStopMarkers({ count }: { count: number }) {
  return (
    <div className="absolute left-1/2 top-0 hidden h-full w-0 md:block">
      {Array.from({ length: count }).map((_, i) => {
        /* Distribute pit-stop markers evenly along the track */
        const pct = (i / (count - 1)) * 100;
        return (
          <div
            key={i}
            className="absolute -translate-x-1/2"
            style={{ top: `${pct}%`, left: 0 }}
          >
            <div className="h-2 w-2 rounded-full bg-gold/30" />
          </div>
        );
      })}
    </div>
  );
}

function TimelineDot() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute left-4 top-0 z-10 -translate-x-1/2 md:left-1/2">
      <div
        className={`h-4 w-4 rounded-full border-2 ${
          isInView
            ? "border-gold bg-gold shadow-[0_0_12px_rgba(212,168,67,0.6),_0_0_24px_rgba(212,168,67,0.3)] animate-[dotPulse_0.5s_ease-out_forwards]"
            : "border-gold/50 bg-background"
        }`}
      />
    </div>
  );
}

function TimelineNode({
  event,
  index,
}: {
  event: (typeof timeline)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Dot */}
      <TimelineDot />

      {/* Content */}
      <div
        className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? "md:pr-16" : "md:pl-16"}`}
        style={
          isInView
            ? { animation: `${isEven ? "slideInLeft" : "slideInRight"} 0.6s ease-out forwards` }
            : { opacity: 0 }
        }
      >
        <RevealText
          as="span"
          className="font-display text-3xl text-gold"
        >
          {String(event.year)}
        </RevealText>
        <h3 className="mt-1 font-display text-xl uppercase">{event.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{event.description}</p>
      </div>
    </div>
  );
}

export default function HistoryPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 0.5,
          },
        }
      );
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Racetrack car — fixed position, moves with scroll via RAF */}
      <RacetrackCar timelineRef={timelineRef} />

      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/80 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,168,67,0.08)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <RevealText
            as="h1"
            className="font-display text-5xl uppercase tracking-tight md:text-7xl"
          >
            Our History
          </RevealText>
          <RevealText
            as="p"
            className="mt-4 max-w-2xl text-lg text-muted"
            delay={0.3}
          >
            From 1989 to today — decades of innovation, competition, and Spartan spirit.
          </RevealText>
        </div>
      </section>

      {/* Timeline */}
      <Section>
        <div ref={timelineRef} className="relative">
          {/* Center line — background track (dashed racetrack style on desktop) */}
          <div className="absolute left-4 top-0 h-full w-px bg-border/30 md:left-1/2" />
          <div
            className="absolute left-4 top-0 hidden h-full md:left-1/2 md:block"
            style={{
              width: "1px",
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(212,168,67,0.15) 0px, rgba(212,168,67,0.15) 8px, transparent 8px, transparent 16px)",
            }}
          />

          {/* Pit stop markers at each milestone */}
          <PitStopMarkers count={timeline.length} />

          {/* Center line — animated fill */}
          <div
            ref={lineRef}
            className="absolute left-4 top-0 h-full w-px origin-top bg-gold/60 md:left-1/2"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="space-y-16">
            {timeline.map((event, i) => (
              <TimelineNode key={event.year + event.title} event={event} index={i} />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
