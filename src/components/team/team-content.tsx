"use client";

import { useEffect, useRef } from "react";

interface Lead {
  name: string;
  role: string;
  description?: string;
  linkedin?: string;
}

const executiveBoard: Lead[] = [
  { name: "Hiren Patel", role: "Chief Engineer", linkedin: "https://www.linkedin.com/in/hirenspatel1", description: "Oversees all engineering operations and ensures technical excellence across every subsystem on the car." },
  { name: "Will Kittinger", role: "President", linkedin: "https://www.linkedin.com/in/william-kittinger/", description: "Leads the team's strategic vision, manages club operations, and serves as the primary representative to SJSU and sponsors." },
  { name: "Ally Almiranez", role: "Treasurer", linkedin: "https://www.linkedin.com/in/ally-almiranez", description: "Manages the team's finances, budgeting, and fund allocation across all subteams and operations." },
  { name: "Angel Lopez", role: "Project Manager", linkedin: "https://www.linkedin.com/in/angel-lopez200", description: "Coordinates project timelines, tracks milestones, and ensures the team stays on schedule for competition deadlines." },
  { name: "Aidan Garcia", role: "Safety Officer", linkedin: "https://www.linkedin.com/in/aidan-garcia-000b1832a/", description: "Ensures all team activities, shop operations, and vehicle systems meet FSAE safety requirements and regulations." },
];

const subteamLeads: Lead[] = [
  { name: "Damon Haberman", role: "Aerodynamics Lead", linkedin: "https://www.linkedin.com/in/damon-haberman", description: "Leads the design and optimization of aerodynamic components including wings, canards, and undertray." },
  { name: "Hayat Dlala", role: "Business Lead", linkedin: "https://www.linkedin.com/in/hayat-dlala", description: "Drives sponsorship acquisition, marketing strategy, and business presentations for competition." },
  { name: "Emmett Miura", role: "Chassis Lead", linkedin: "https://www.linkedin.com/in/emmett-miura-6b0416284/", description: "Designs and manufactures the vehicle's structural frame, optimizing for stiffness, weight, and manufacturability." },
  { name: "William La Poll", role: "Electronics Lead", linkedin: "https://www.linkedin.com/in/william-la-poll-69428633b", description: "Oversees all electrical systems including wiring harnesses, PCB design, and sensor integration." },
  { name: "Harleen Sandhu", role: "Software Lead", description: "Manages embedded software development, data acquisition systems, and telemetry solutions." },
  { name: "Nicholas Ng", role: "Suspension Lead", linkedin: "https://www.linkedin.com/in/nicholasng762/", description: "Designs suspension geometry, steering systems, and brake components for optimal vehicle dynamics." },
  { name: "Aidan Garcia", role: "Powertrain Co-Lead", linkedin: "https://www.linkedin.com/in/aidan-garcia-000b1832a/", description: "Co-leads the electric powertrain development including motor selection, accumulator design, and drivetrain." },
  { name: "Kevin Hong", role: "Powertrain Co-Lead", linkedin: "https://www.linkedin.com/in/kevinh0ng", description: "Co-leads powertrain integration, focusing on power delivery, efficiency, and thermal management systems." },
  { name: "Shaun Gilmore", role: "Research & Development Lead", linkedin: "https://www.linkedin.com/in/shaun-gilmore-32g", description: "Spearheads multi-year R&D projects and experimental technologies for future Spartan Racing vehicles." },
];

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="inline-block"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function LeadCard({ name, role, description, linkedin }: Lead) {
  return (
    <div className="lead-card group relative border border-border bg-elevated p-6 overflow-hidden">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-xl uppercase tracking-tight">{name}</p>
          <p className="mt-1 font-mono text-sm text-muted">{role}</p>
        </div>
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 text-muted lead-card-linkedin"
            aria-label={`${name} on LinkedIn`}
            onClick={(e) => e.stopPropagation()}
          >
            <LinkedInIcon />
          </a>
        )}
      </div>
      {/* Hover description overlay */}
      {description && (
        <div className="lead-card-desc absolute inset-0 flex items-center bg-surface/95 p-6 opacity-0 pointer-events-none">
          <div>
            <p className="font-display text-sm uppercase tracking-tight text-gold">{role}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">{description}</p>
          </div>
        </div>
      )}
      {/* Gold accent line at bottom */}
      <div className="lead-card-accent absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gold" />
    </div>
  );
}

function LeadGrid({ leads, gridId }: { leads: Lead[]; gridId: string }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(".lead-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            const index = Number(card.dataset.index ?? 0);
            requestAnimationFrame(() => {
              card.style.animationDelay = `${index * 0.08}s`;
              card.classList.add("revealed");
            });
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {leads.map((member, i) => (
        <div key={`${gridId}-${member.name}-${member.role}`} data-index={i} className="lead-card-wrapper">
          <LeadCard {...member} />
        </div>
      ))}
    </div>
  );
}

export function TeamContent() {
  return (
    <>
      {/* Executive Board */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:pb-24">
        <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
          Executive Board
        </h2>
        <LeadGrid leads={executiveBoard} gridId="exec" />
      </section>

      {/* Subteam Leads */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
        <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
          Subteam Leads
        </h2>
        <LeadGrid leads={subteamLeads} gridId="sub" />
      </section>
    </>
  );
}
