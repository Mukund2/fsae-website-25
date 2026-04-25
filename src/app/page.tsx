import { CarShowcase } from "@/components/home/car-showcase";
import { Results } from "@/components/home/results";

import { SponsorStrip } from "@/components/home/sponsor-strip";
import { Newsletter } from "@/components/home/newsletter";
import { JoinUs } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <CarShowcase />
      <div className="relative z-10 bg-background">
        <Results />
        <SponsorStrip />
        <Newsletter />
        <JoinUs />
      </div>
    </>
  );
}
