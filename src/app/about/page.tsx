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
      {/* Subteam cards */}
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-24 md:pb-32">
        <div className="mb-10 hero-fade-in" style={{ animationDelay: "0.1s" }}>
          <h1 className="font-display font-bold uppercase italic text-foreground text-5xl tracking-tight md:text-7xl">
            Spartan Racing
          </h1>
          <p
            className="text-gold italic text-3xl md:text-4xl mt-1"
            style={{ fontFamily: "var(--font-script), serif" }}
          >
            Subteams
          </p>
        </div>
        <SubteamGrid subteams={subteams} />
      </section>
    </>
  );
}
