import { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { faqs } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ | SJSU Spartan Racing",
  description: "Frequently asked questions about SJSU Spartan Racing.",
};

const categories = [...new Set(faqs.map((f) => f.category))];

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[40vh] items-center bg-surface pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-display text-5xl uppercase tracking-tight md:text-7xl">
            <span className="text-gold">FAQ</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Got questions? We&apos;ve got answers.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      {categories.map((category) => (
        <Section key={category}>
          <h2 className="font-display text-2xl uppercase tracking-tight md:text-3xl">
            <span className="text-gold">{category}</span>
          </h2>
          <div className="mt-8 space-y-4">
            {faqs
              .filter((f) => f.category === category)
              .map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-lg border border-border bg-surface"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-6 font-medium transition-colors hover:text-gold">
                    {faq.question}
                    <span className="ml-4 text-gold transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-muted leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
          </div>
        </Section>
      ))}
    </>
  );
}
