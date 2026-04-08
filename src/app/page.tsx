import { Hero } from "@/components/home/hero";
import { CarShowcase } from "@/components/home/car-showcase";
import { Results } from "@/components/home/results";
import { Mission } from "@/components/home/mission";
import { SponsorStrip } from "@/components/home/sponsor-strip";
import { Newsletter } from "@/components/home/newsletter";
import { JoinUs } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CarShowcase />
      <Results />
      <Mission />
      <SponsorStrip />
      <Newsletter />
      <JoinUs />
    </>
  );
}
