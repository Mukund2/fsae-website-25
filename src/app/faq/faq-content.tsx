"use client";

import { useState, useRef, useEffect } from "react";
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
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [answer, isOpen]);

  return (
    <div
      className={`border bg-surface ${
        isOpen ? "border-gold/40" : "border-border"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between p-6 text-left font-medium transition-colors hover:text-gold"
      >
        <span className={isOpen ? "text-gold" : ""}>{question}</span>
        <span
          className="ml-4 flex-shrink-0 transition-transform duration-300 ease-out"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <ChevronDown
            className={`h-5 w-5 transition-colors duration-300 ${
              isOpen ? "text-gold" : "text-muted"
            }`}
          />
        </span>
      </button>
      <div
        style={{
          height: isOpen ? contentHeight : 0,
          opacity: isOpen ? 1 : 0,
          transition: "height 0.3s ease-out, opacity 0.3s ease-out",
          overflow: "hidden",
        }}
      >
        <div ref={contentRef}>
          <div className="border-t border-gold/10 px-6 pb-6 pt-4 leading-relaxed text-muted">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQContent() {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [fadeKey, setFadeKey] = useState(0);
  const [visible, setVisible] = useState(true);

  function handleCategoryChange(category: string) {
    if (category === activeCategory) return;
    setVisible(false);
    setTimeout(() => {
      setActiveCategory(category);
      setFadeKey((k) => k + 1);
      setVisible(true);
    }, 200);
  }

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
              onClick={() => handleCategoryChange(category)}
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
        <div
          key={fadeKey}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
          }}
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
        </div>
      </Section>
    </>
  );
}
