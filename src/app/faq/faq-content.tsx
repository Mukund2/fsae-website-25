"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Section } from "@/components/layout/section";
import { RevealText } from "@/components/animation/reveal-text";
import { StaggerChildren } from "@/components/animation/stagger-children";
import { faqs } from "@/data/faq";
import { ChevronDown } from "lucide-react";

const categories = [...new Set(faqs.map((f) => f.category))];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`rounded-lg border bg-surface transition-colors duration-300 ${
        isOpen ? "border-gold/40" : "border-border"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between p-6 text-left font-medium transition-colors hover:text-gold"
      >
        <span className={isOpen ? "text-gold" : ""}>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="ml-4 flex-shrink-0"
        >
          <ChevronDown
            className={`h-5 w-5 transition-colors duration-300 ${
              isOpen ? "text-gold" : "text-muted"
            }`}
          />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-gold/10 px-6 pb-6 pt-4 leading-relaxed text-muted">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQContent() {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[40vh] items-center bg-surface pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <RevealText
            as="h1"
            className="font-display text-5xl uppercase tracking-tight md:text-7xl"
          >
            FAQ
          </RevealText>
          <RevealText
            as="p"
            className="mt-4 max-w-2xl text-lg text-muted"
            delay={0.3}
          >
            Got questions? We&apos;ve got answers.
          </RevealText>
        </div>
      </section>

      {/* Category Tabs */}
      <Section>
        <div className="mb-12 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2 font-display text-sm uppercase tracking-widest transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gold text-background"
                  : "border border-border bg-surface text-muted hover:border-gold/30 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <RevealText
              as="h2"
              className="font-display text-2xl uppercase tracking-tight md:text-3xl"
            >
              {activeCategory}
            </RevealText>
            <StaggerChildren className="mt-8 space-y-4" staggerDelay={0.08}>
              {faqs
                .filter((f) => f.category === activeCategory)
                .map((faq) => (
                  <FAQItem
                    key={faq.question}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
            </StaggerChildren>
          </motion.div>
        </AnimatePresence>
      </Section>
    </>
  );
}
