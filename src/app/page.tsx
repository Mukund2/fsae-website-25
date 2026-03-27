import { Hero } from "@/components/home/hero";
import { CarShowcase } from "@/components/home/car-showcase";
import { SponsorStrip } from "@/components/home/sponsor-strip";
import { JoinUs } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CarShowcase />
      <SponsorStrip />
      <JoinUs />
    </>
  );
}
