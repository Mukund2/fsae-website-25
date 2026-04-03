import Image from "next/image";

export function ImageBreak() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative aspect-[21/9] w-full">
        <Image
          src="/images/cars/car-2.jpg"
          alt="Spartan Racing cars on the track"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40" />
      </div>
    </section>
  );
}
