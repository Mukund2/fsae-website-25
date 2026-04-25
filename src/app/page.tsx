import { CarShowcase } from "@/components/home/car-showcase";
import { Results } from "@/components/home/results";

import { SponsorStrip } from "@/components/home/sponsor-strip";
import { Newsletter } from "@/components/home/newsletter";
import { JoinUs } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <CarShowcase />
      <div className="relative z-10">
        <Results />
        {/* Gradient: Results bg → Sponsor Strip bg */}
        <div className="h-24 md:h-32" style={{ background: "linear-gradient(to bottom, var(--background), #F5F5F5)" }} />
        <SponsorStrip />
        {/* Gradient: Sponsor Strip bg → Newsletter bg */}
        <div className="h-16 md:h-24" style={{ background: "linear-gradient(to bottom, #F5F5F5, #FFFFFF)" }} />
        <Newsletter />
        <JoinUs />
      </div>
    </>
  );
}
