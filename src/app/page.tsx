import { CarShowcase } from "@/components/home/car-showcase";
import { Results } from "@/components/home/results";

import { SponsorStrip } from "@/components/home/sponsor-strip";
import { Newsletter } from "@/components/home/newsletter";
import { ImageSlideshow } from "@/components/home/image-slideshow";
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
        <ImageSlideshow />
        <Newsletter />
        <JoinUs />
      </div>
    </>
  );
}
