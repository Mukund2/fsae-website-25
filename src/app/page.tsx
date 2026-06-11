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
        {/* Short gradient blending Results bg → Sponsor Strip bg. Kept small so
            the space above the "Thank you to our Sponsors" heading stays balanced
            with the space below the sponsor logos. */}
        <div className="h-8 md:h-10" style={{ background: "linear-gradient(to bottom, var(--background), #F5F5F5)" }} />
        <SponsorStrip />
        <ImageSlideshow />
        <Newsletter />
        <JoinUs />
      </div>
    </>
  );
}
