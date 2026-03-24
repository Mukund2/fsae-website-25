import { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { competitions } from "@/data/competitions";

export const metadata: Metadata = {
  title: "Racing | SJSU Spartan Racing",
  description: "Competition results and achievements from SJSU Spartan Racing.",
};

export default function RacingPage() {
  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[50vh] items-center bg-surface pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-display text-5xl uppercase tracking-tight md:text-7xl">
            Race <span className="text-gold">Results</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Competing against the best university engineering teams in the world.
          </p>
        </div>
      </section>

      {/* Results */}
      <Section>
        <div className="space-y-12">
          {competitions.map((comp) => (
            <div key={comp.year + comp.competition} className="rounded-lg border border-border bg-surface p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="font-display text-3xl text-gold">{comp.year}</span>
                  <h3 className="mt-1 font-display text-xl uppercase">{comp.competition}</h3>
                  <p className="text-sm text-muted">{comp.location}</p>
                </div>
                {comp.overallPlace && (
                  <div className="text-right">
                    <span className="text-sm uppercase tracking-widest text-muted">Overall</span>
                    <div className={`font-display text-4xl ${comp.overallPlace <= 3 ? "text-gold" : ""}`}>
                      #{comp.overallPlace}
                    </div>
                  </div>
                )}
              </div>

              {comp.events.length > 0 && (
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {comp.events.map((event) => (
                    <div key={event.name} className="flex items-center justify-between rounded bg-background p-3">
                      <span className="text-sm text-muted">{event.name}</span>
                      <span className={`font-display text-lg ${event.place <= 3 ? "text-gold" : ""}`}>
                        #{event.place}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
