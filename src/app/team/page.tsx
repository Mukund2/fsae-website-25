import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leads | SJSU Spartan Racing",
  description:
    "Meet the executive board and subteam leads of SJSU Spartan Racing.",
};

interface Lead {
  name: string;
  role: string;
  linkedin?: string;
}

const executiveBoard: Lead[] = [
  { name: "Hiren Patel", role: "Chief Engineer", linkedin: "https://www.linkedin.com/in/hirenspatel1" },
  { name: "Will Kittinger", role: "President", linkedin: "https://www.linkedin.com/in/william-kittinger/" },
  { name: "Ally Almiranez", role: "Treasurer", linkedin: "https://www.linkedin.com/in/ally-almiranez" },
  { name: "Angel Lopez", role: "Project Manager", linkedin: "https://www.linkedin.com/in/angel-lopez200" },
  { name: "Aidan Garcia", role: "Safety Officer", linkedin: "https://www.linkedin.com/in/aidan-garcia-000b1832a/" },
];

const subteamLeads: Lead[] = [
  { name: "Damon Haberman", role: "Aerodynamics Lead", linkedin: "https://www.linkedin.com/in/damon-haberman" },
  { name: "Hayat Dlala", role: "Business Lead", linkedin: "https://www.linkedin.com/in/hayat-dlala" },
  { name: "Emmett Miura", role: "Chassis Lead", linkedin: "https://www.linkedin.com/in/emmett-miura-6b0416284/" },
  { name: "William La Poll", role: "Electronics Lead", linkedin: "https://www.linkedin.com/in/william-la-poll-69428633b" },
  { name: "Harleen Sandhu", role: "Software Lead" },
  { name: "Nicholas Ng", role: "Suspension Lead", linkedin: "https://www.linkedin.com/in/nicholasng762/" },
  { name: "Aidan Garcia", role: "Powertrain Co-Lead", linkedin: "https://www.linkedin.com/in/aidan-garcia-000b1832a/" },
  { name: "Kevin Hong", role: "Powertrain Co-Lead", linkedin: "https://www.linkedin.com/in/kevinh0ng" },
  { name: "Shaun Gilmore", role: "Research & Development Lead", linkedin: "https://www.linkedin.com/in/shaun-gilmore-32g" },
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

function LeadCard({ name, role, linkedin }: Lead) {
  return (
    <div className="border border-border bg-elevated p-6">
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
            className="mt-1 text-muted transition-colors hover:text-gold"
            aria-label={`${name} on LinkedIn`}
          >
            <LinkedInIcon />
          </a>
        )}
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative flex min-h-[50vh] items-center pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/80 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,128,0,0.06)_0%,_transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold hero-fade-in">
            Leadership
          </p>
          <h1
            className="mt-3 font-display text-5xl uppercase tracking-tight md:text-7xl hero-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="font-bold">Our</span>
            <br />
            <span className="font-light text-foreground/40">Leads</span>
          </h1>
          <p
            className="mt-4 max-w-xl text-lg leading-relaxed text-muted hero-fade-in"
            style={{ animationDelay: "0.25s" }}
          >
            The people steering Spartan Racing forward, from strategy and
            operations to every subteam on the shop floor.
          </p>
        </div>
      </section>

      {/* Executive Board */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:pb-24">
        <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
          Executive Board
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {executiveBoard.map((member) => (
            <LeadCard key={member.name + member.role} {...member} />
          ))}
        </div>
      </section>

      {/* Subteam Leads */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
        <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
          Subteam Leads
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subteamLeads.map((member) => (
            <LeadCard key={member.name + member.role} {...member} />
          ))}
        </div>
      </section>
    </>
  );
}
