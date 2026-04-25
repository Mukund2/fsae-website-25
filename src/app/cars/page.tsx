export default function CarsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 pt-20 text-center animate-[fadeIn_0.6s_ease-out]">
      <span className="font-display text-[clamp(1.4rem,3vw,2rem)] italic text-gold">
        Our Cars
      </span>
      <h1 className="mt-3 font-display text-5xl font-bold uppercase italic tracking-tight md:text-7xl">
        Coming Soon
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
        Check back soon.
      </p>
    </div>
  );
}
