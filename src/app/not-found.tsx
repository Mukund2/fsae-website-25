import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 pt-20 text-center animate-[fadeIn_0.6s_ease-out]">
      <h1 className="font-display text-[10rem] leading-none text-gold sm:text-[14rem]">
        404
      </h1>
      <h2 className="mt-2 font-display text-2xl uppercase tracking-widest text-foreground sm:text-3xl">
        Page Not Found
      </h2>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-gold px-8 py-3 font-display text-sm uppercase tracking-widest text-white"
      >
        Back to Home
      </Link>
    </div>
  );
}
