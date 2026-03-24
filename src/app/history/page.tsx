"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/layout/section";
import { timeline } from "@/data/timeline";
import { RevealText } from "@/components/animation/reveal-text";

gsap.registerPlugin(ScrollTrigger);

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
        className={`h-4 w-4 rounded-full border-2 transition-all duration-500 ${
          isInView
            ? "border-gold bg-gold shadow-[0_0_12px_rgba(212,168,67,0.6),_0_0_24px_rgba(212,168,67,0.3)]"
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
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView
            ? "translateX(0)"
            : `translateX(${isEven ? "-40px" : "40px"})`,
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
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
            Three decades of innovation, competition, and Spartan spirit.
          </RevealText>
        </div>
      </section>

      {/* Timeline */}
      <Section>
        <div ref={timelineRef} className="relative">
          {/* Center line — background track */}
          <div className="absolute left-4 top-0 h-full w-px bg-border/30 md:left-1/2" />

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
