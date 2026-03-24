"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/layout/section";

interface HighlightCard {
  title: string;
  value: string;
  description: string;
  span?: "1" | "2";
}

const highlights: HighlightCard[] = [
  {
    title: "Latest Car",
    value: "SR-16e",
    description: "Our 16th generation electric formula car, designed and manufactured entirely by students.",
    span: "2",
  },
  {
    title: "Competition",
    value: "Formula SAE",
    description: "Competing against 120+ university teams in engineering design, cost, and performance events.",
    span: "1",
  },
  {
    title: "Founded",
    value: "1991",
    description: "Over three decades of engineering excellence and hands-on education at San Jose State.",
    span: "1",
  },
  {
    title: "Team Size",
    value: "100+",
    description: "Mechanical, electrical, software, and business students working together across 7 subteams.",
    span: "2",
  },
];

function Card({ card, index }: { card: HighlightCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-sm border border-border bg-gradient-to-br from-surface to-elevated/50 p-8 transition-colors hover:border-gold/30 ${
        card.span === "2" ? "md:col-span-2" : "md:col-span-1"
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`,
      }}
    >
      <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-gold/60 via-gold/20 to-transparent" />
      <div className="absolute left-0 top-0 h-0.5 w-full bg-gradient-to-r from-gold/0 via-gold to-gold/0 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="text-xs uppercase tracking-widest text-gold">{card.title}</span>
      <div className="mt-3 font-display text-5xl uppercase tracking-tight md:text-6xl">{card.value}</div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{card.description}</p>
    </div>
  );
}

export function Highlights() {
  return (
    <Section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {highlights.map((card, i) => (
          <Card key={card.title} card={card} index={i} />
        ))}
      </div>
    </Section>
  );
}
