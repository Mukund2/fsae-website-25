import { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { timeline } from "@/data/timeline";

export const metadata: Metadata = {
  title: "History | SJSU Spartan Racing",
  description: "The history of SJSU Spartan Racing — from our founding to the present day.",
};

export default function HistoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[50vh] items-center bg-surface pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-display text-5xl uppercase tracking-tight md:text-7xl">
            Our <span className="text-gold">History</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Three decades of innovation, competition, and Spartan spirit.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <Section>
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2" />

          <div className="space-y-16">
            {timeline.map((event, i) => (
              <div
                key={event.year + event.title}
                className={`relative flex flex-col md:flex-row ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 top-0 z-10 -translate-x-1/2 md:left-1/2">
                  <div className="h-4 w-4 rounded-full border-2 border-gold bg-background" />
                </div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                  <span className="font-display text-3xl text-gold">{event.year}</span>
                  <h3 className="mt-1 font-display text-xl uppercase">{event.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
