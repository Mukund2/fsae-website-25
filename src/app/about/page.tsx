import { Metadata } from "next";
import { subteams } from "@/data/team";
import { SubteamGrid } from "@/components/about/subteam-grid";

export const metadata: Metadata = {
  title: "Subteams | SJSU Spartan Racing",
  description:
    "Meet the 8 subteams behind SJSU Spartan Racing, from Aerodynamics to R&D, every group plays a critical role in building a competitive formula-style race car.",
};

export default function SubteamsPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative flex min-h-[40vh] items-center pt-32 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/80 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,85,162,0.06)_0%,_transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <h1
            className="font-display font-bold uppercase italic leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "#B8860B" }}
          >
            Subteams
          </h1>
        </div>
      </section>

      {/* Subteam cards */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
        <SubteamGrid subteams={subteams} />
      </section>
    </>
  );
}
