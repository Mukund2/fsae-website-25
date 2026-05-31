"use client";

export function CarShowcase() {
  return (
    <section className="relative w-full overflow-hidden bg-background" style={{ height: "100vh" }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero-broll.mp4"
      />
    </section>
  );
}
