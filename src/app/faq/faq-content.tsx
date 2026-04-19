"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { RevealText } from "@/components/animation/reveal-text";
import { StaggerChildren } from "@/components/animation/stagger-children";
import { faqs } from "@/data/faq";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

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
        className="flex w-full cursor-pointer items-center justify-between p-6 text-left font-medium hover:text-gold"
      >
        <span className={isOpen ? "text-gold" : ""}>{question}</span>
        <span
          className="ml-4 flex-shrink-0"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            animation: isOpen ? "faqChevronOpen 0.3s ease-out forwards" : "faqChevronClose 0.3s ease-out forwards",
          }}
        >
          <ChevronDown
            className={`h-5 w-5 ${
              isOpen ? "text-gold" : "text-muted"
            }`}
          />
        </span>
      </button>
      <div
        style={{
          height: isOpen ? contentHeight : 0,
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
          animation: isOpen ? "faqExpand 0.3s ease-out forwards" : "faqCollapse 0.3s ease-out forwards",
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

/* Inject keyframe animations for FAQ accordion (no CSS transitions) */
if (typeof document !== "undefined") {
  const id = "faq-keyframes";
  if (!document.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes faqChevronOpen {
        from { transform: rotate(0deg); }
        to { transform: rotate(180deg); }
      }
      @keyframes faqChevronClose {
        from { transform: rotate(180deg); }
        to { transform: rotate(0deg); }
      }
      @keyframes faqExpand {
        from { height: 0; opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes faqCollapse {
        from { opacity: 1; }
        to { height: 0; opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

export function FAQContent() {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [fadeKey, setFadeKey] = useState(0);
  const [visible, setVisible] = useState(true);
  const heroRef = useScrollReveal();
  const tabsRef = useScrollReveal();

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
      <section ref={heroRef as React.RefObject<HTMLElement>} className="relative flex min-h-[40vh] items-center pt-24 overflow-hidden">
        <Image
          src="/images/flickr/comp-action-3.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative mx-auto max-w-7xl px-6">
          <span
            data-anim="up"
            className="text-[clamp(1.4rem,3vw,2rem)] italic text-gold"
            style={{ fontFamily: "var(--font-script), serif" }}
          >
            Got Questions?
          </span>
          <h1
            data-anim="up"
            className="mt-3 font-display text-5xl font-bold uppercase italic tracking-tight md:text-7xl"
          >
            FAQ
          </h1>
          <p
            data-anim="up"
            className="mt-4 max-w-2xl text-lg text-muted"
          >
            We&apos;ve got answers.
          </p>
        </div>
        </section>

      {/* Category Tabs */}
      <Section>
        <div ref={tabsRef as React.RefObject<HTMLDivElement>} className="mb-12 flex flex-wrap gap-2">
          {categories.map((category, i) => (
            <button
              key={category}
              data-anim="up"
              onClick={() => handleCategoryChange(category)}
              className={`rounded-full px-5 py-2 font-display text-sm uppercase tracking-widest ${
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
          }}
          className={visible ? "hero-fade-in" : ""}
        >
          <h2
            className="font-display text-2xl uppercase tracking-tight md:text-3xl"
          >
            {activeCategory}
          </h2>
          <div className="mt-8 space-y-4">
            {faqs
              .filter((f) => f.category === activeCategory)
              .map((faq, i) => (
                <div
                  key={faq.question}
                  className="stagger-item revealed"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <FAQItem
                    question={faq.question}
                    answer={faq.answer}
                  />
                </div>
              ))}
          </div>
        </div>
      </Section>
    </>
  );
}
