import { Hero } from "@/components/home/hero";
import { CarShowcase } from "@/components/home/car-showcase";
import { Results } from "@/components/home/results";
import { CategoryCards } from "@/components/home/category-cards";

import { SponsorStrip } from "@/components/home/sponsor-strip";
import { Newsletter } from "@/components/home/newsletter";
import { JoinUs } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="relative z-10 bg-background">
        <CarShowcase />
        <Results />
        <CategoryCards />
        <SponsorStrip />
        <Newsletter />
        <JoinUs />
      </div>
    </>
  );
}
