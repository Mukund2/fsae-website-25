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
          <h1
            className="font-display font-bold uppercase italic leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "#D4960A" }}
          >
            Leads
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
