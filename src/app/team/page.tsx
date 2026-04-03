import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leads | SJSU Spartan Racing",
  description:
    "Meet the executive board and subteam leads of SJSU Spartan Racing.",
};

const executiveBoard = [
  { name: "Hiren Patel", role: "Chief Engineer" },
  { name: "Will Kittinger", role: "President" },
  { name: "Ally Almiranez", role: "Treasurer" },
  { name: "Angel Lopez", role: "Project Manager" },
  { name: "Aidan Garcia", role: "Safety Officer" },
];

const subteamLeads = [
  { name: "Damon Haberman", role: "Aerodynamics Lead" },
  { name: "Hayat Dlala", role: "Business Lead" },
  { name: "Emmett Miura", role: "Chassis Lead" },
  { name: "William La Poll", role: "Electronics Lead" },
  { name: "Harleen Sandhu", role: "Software Lead" },
  { name: "Nicholas Ng", role: "Suspension Lead" },
  { name: "Aidan Garcia", role: "Powertrain Co-Lead" },
  { name: "Kevin Hong", role: "Powertrain Co-Lead" },
  { name: "Shaun Gilmore", role: "Research & Development Lead" },
];

function LeadCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="border border-border bg-elevated p-6">
      <p className="font-display text-xl uppercase tracking-tight">{name}</p>
      <p className="mt-1 font-mono text-sm text-muted">{role}</p>
    </div>
  );
}

export default function TeamPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative flex min-h-[45vh] items-end pb-16 pt-32 overflow-hidden">
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
            Our Leads
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
            <LeadCard key={member.name + member.role} name={member.name} role={member.role} />
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
            <LeadCard key={member.name + member.role} name={member.name} role={member.role} />
          ))}
        </div>
      </section>
    </>
  );
}
