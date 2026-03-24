import { Hero } from "@/components/home/hero";
import { Mission } from "@/components/home/mission";
import { Highlights } from "@/components/home/highlights";
import { StatsBar } from "@/components/home/stats-bar";
import { SponsorStrip } from "@/components/home/sponsor-strip";
import { CTA } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Mission />
      <Highlights />
      <StatsBar />
      <SponsorStrip />
      <CTA />
    </>
  );
}
