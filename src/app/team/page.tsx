import { Metadata } from "next";
import { TeamContent } from "@/components/team/team-content";
import { AlumniSection } from "@/components/team/alumni-section";

export const metadata: Metadata = {
  title: "Leads | SJSU Spartan Racing",
  description:
    "Meet the executive board and subteam leads of SJSU Spartan Racing.",
};

export default function TeamPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative flex min-h-[40vh] items-center pt-32 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/80 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,85,162,0.06)_0%,_transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <span
            className="text-[clamp(1.4rem,3vw,2rem)] italic text-gold hero-fade-in"
            style={{ fontFamily: "var(--font-script), serif" }}
          >
            Meet the Team
          </span>
          <h1
            className="mt-3 font-display text-5xl font-bold uppercase italic tracking-tight md:text-7xl hero-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Our Leads
          </h1>
        </div>
      </section>

      {/* Executive Board & Subteam Leads with animations */}
      <TeamContent />

      {/* Alumni Section */}
      <AlumniSection />
    </>
  );
}
