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
      <CarShowcase />
      {/* Smooth fade from showcase bg to results dark */}
      <div className="h-24 bg-gradient-to-b from-background to-[#0e0e0e]" />
      <Results />
      {/* Smooth fade from results dark to category cards light */}
      <div className="h-24 bg-gradient-to-b from-[#0e0e0e] to-background" />
      <CategoryCards />
      <SponsorStrip />
      {/* Smooth fade into darker newsletter area */}
      <div className="h-24 bg-gradient-to-b from-background to-[#F0F0F0]" />
      <Newsletter />
      {/* Fade from newsletter into the CTA */}
      <div className="h-16 bg-gradient-to-b from-[#F0F0F0] to-background" />
      <JoinUs />
    </>
  );
}
