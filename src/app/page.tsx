import { Hero } from "@/components/home/hero";
import { StatsBar } from "@/components/home/stats-bar";
import { CarShowcase } from "@/components/home/car-showcase";
import { Highlights } from "@/components/home/highlights";
import { Mission } from "@/components/home/mission";
import { SponsorStrip } from "@/components/home/sponsor-strip";
import { JoinUs } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <CarShowcase />
      <Highlights />
      <Mission />
      <SponsorStrip />
      <JoinUs />
    </>
  );
}
