"use client";

import { motion } from "motion/react";
import { Section } from "@/components/layout/section";
import { useInView } from "@/hooks/use-in-view";

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
    description:
      "Our 16th generation electric formula car, designed and manufactured entirely by students.",
    span: "2",
  },
  {
    title: "Competition",
    value: "Formula SAE",
    description:
      "Competing against 120+ university teams in engineering design, cost, and performance events.",
    span: "1",
  },
  {
    title: "Founded",
    value: "1991",
    description:
      "Over three decades of engineering excellence and hands-on education at San Jose State.",
    span: "1",
  },
  {
    title: "Team Size",
    value: "100+",
    description:
      "Mechanical, electrical, software, and business students working together across 7 subteams.",
    span: "2",
  },
];

function Card({
  card,
  index,
  isInView,
}: {
  card: HighlightCard;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-sm border border-border bg-surface p-8 transition-colors hover:border-gold/30 ${
        card.span === "2" ? "md:col-span-2" : "md:col-span-1"
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.1,
      }}
    >
      {/* Gold accent line */}
      <div className="absolute left-0 top-0 h-0.5 w-full bg-gradient-to-r from-gold/0 via-gold to-gold/0 opacity-0 transition-opacity group-hover:opacity-100" />

      <span className="text-xs uppercase tracking-widest text-gold">
        {card.title}
      </span>
      <div className="mt-3 font-display text-4xl uppercase tracking-tight md:text-5xl">
        {card.value}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {card.description}
      </p>
    </motion.div>
  );
}

export function Highlights() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <Section>
      <div
        ref={ref}
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {highlights.map((card, i) => (
          <Card key={card.title} card={card} index={i} isInView={isInView} />
        ))}
      </div>
    </Section>
  );
}
