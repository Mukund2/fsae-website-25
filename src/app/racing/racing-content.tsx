"use client";

import { Section } from "@/components/layout/section";
import { RevealText } from "@/components/animation/reveal-text";
import { StaggerChildren } from "@/components/animation/stagger-children";
import { competitions } from "@/data/competitions";
import { Trophy, Medal, Award, MapPin, Calendar } from "lucide-react";

function PlaceBadge({ place }: { place: number }) {
  if (place === 1) {
    return (
      <div className="flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1">
        <Trophy className="h-4 w-4 text-gold" />
        <span className="font-display text-lg text-gold">1st</span>
      </div>
    );
  }
  if (place === 2) {
    return (
      <div className="flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1">
        <Medal className="h-4 w-4 text-gold/80" />
        <span className="font-display text-lg text-gold/80">2nd</span>
      </div>
    );
  }
  if (place === 3) {
    return (
      <div className="flex items-center gap-2 rounded-full bg-gold/8 px-3 py-1">
        <Award className="h-4 w-4 text-gold/60" />
        <span className="font-display text-lg text-gold/60">3rd</span>
      </div>
    );
  }
  return (
    <span className="font-display text-lg">#{place}</span>
  );
}

export function RacingContent() {
  const [latest, ...rest] = competitions;

  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[50vh] items-center bg-surface pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <RevealText
            as="h1"
            className="font-display text-5xl uppercase tracking-tight md:text-7xl"
          >
            Race Results
          </RevealText>
          <RevealText
            as="p"
            className="mt-4 max-w-2xl text-lg text-muted"
            delay={0.3}
          >
            Competing against the best university engineering teams in the world.
          </RevealText>
        </div>
      </section>

      {/* Featured Latest Result */}
      <Section>
        <RevealText
          as="h2"
          className="font-display text-2xl uppercase tracking-tight text-muted md:text-3xl"
        >
          Latest Competition
        </RevealText>
        <div className="mt-8 overflow-hidden rounded-xl border-2 border-gold/30 bg-surface p-8 shadow-lg shadow-gold/5 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-display text-5xl text-gold md:text-6xl">
                  {latest.year}
                </span>
                {latest.car && (
                  <span className="rounded bg-gold/10 px-3 py-1 font-display text-sm uppercase tracking-widest text-gold">
                    {latest.car}
                  </span>
                )}
              </div>
              <h3 className="mt-2 font-display text-2xl uppercase md:text-3xl">
                {latest.competition}
              </h3>
              <div className="mt-2 flex items-center gap-2 text-muted">
                <MapPin className="h-4 w-4" />
                <span>{latest.location}</span>
              </div>
            </div>
            {latest.overallPlace && (
              <div className="text-right">
                <span className="text-sm uppercase tracking-widest text-muted">
                  Overall
                </span>
                <div className="mt-1">
                  {latest.overallPlace <= 3 ? (
                    <PlaceBadge place={latest.overallPlace} />
                  ) : (
                    <span className="font-display text-5xl">
                      #{latest.overallPlace}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {latest.events.length > 0 && (
            <StaggerChildren
              className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
              staggerDelay={0.06}
            >
              {latest.events.map((event) => (
                <div
                  key={event.name}
                  className="group flex items-center justify-between rounded-lg bg-background p-4 transition-all duration-300 hover:bg-background/80 hover:shadow-md"
                >
                  <div>
                    <span className="text-sm text-muted">{event.name}</span>
                    {event.score && (
                      <span className="ml-2 text-xs text-muted/50">
                        {event.score}pts
                      </span>
                    )}
                  </div>
                  <PlaceBadge place={event.place} />
                </div>
              ))}
            </StaggerChildren>
          )}
        </div>
      </Section>

      {/* Past Results */}
      <Section>
        <RevealText
          as="h2"
          className="font-display text-2xl uppercase tracking-tight text-muted md:text-3xl"
        >
          Competition History
        </RevealText>
        <StaggerChildren className="mt-8 space-y-6" staggerDelay={0.1}>
          {rest.map((comp) => (
            <div
              key={comp.year + comp.competition}
              className="group rounded-lg border border-border bg-surface p-8 transition-all duration-300 hover:border-gold/20 hover:shadow-md hover:shadow-gold/5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-3xl text-gold">
                      {comp.year}
                    </span>
                    {comp.car && (
                      <span className="rounded bg-gold/10 px-2 py-0.5 font-display text-xs uppercase tracking-widest text-gold/70">
                        {comp.car}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1 font-display text-xl uppercase">
                    {comp.competition}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted">
                    <MapPin className="h-3 w-3" />
                    <span>{comp.location}</span>
                  </div>
                </div>
                {comp.overallPlace && (
                  <div className="text-right">
                    <span className="text-sm uppercase tracking-widest text-muted">
                      Overall
                    </span>
                    <div className="mt-1">
                      {comp.overallPlace <= 3 ? (
                        <PlaceBadge place={comp.overallPlace} />
                      ) : (
                        <span className="font-display text-4xl">
                          #{comp.overallPlace}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {comp.events.length > 0 && (
                <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {comp.events.map((event) => (
                    <div
                      key={event.name}
                      className="flex items-center justify-between rounded bg-background p-3 transition-colors duration-200 hover:bg-background/80"
                    >
                      <span className="text-sm text-muted">{event.name}</span>
                      <PlaceBadge place={event.place} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </StaggerChildren>
      </Section>
    </>
  );
}
