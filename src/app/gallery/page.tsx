import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery | SJSU Spartan Racing",
  description:
    "Browse photos from SJSU Spartan Racing — cars, events, and behind-the-scenes.",
};

const sr16Photos = [
  { src: "/images/sr16/car-action-1.jpg", alt: "SR16 in action — shot 1" },
  { src: "/images/sr16/car-action-2.jpg", alt: "SR16 in action — shot 2" },
  { src: "/images/sr16/car-action-3.jpg", alt: "SR16 in action — shot 3" },
  { src: "/images/sr16/car-action-4.jpg", alt: "SR16 in action — shot 4" },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative flex min-h-[45vh] items-end pb-16 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/80 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,168,67,0.08)_0%,_transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold hero-fade-in">
            Photos
          </p>
          <h1
            className="mt-3 font-display text-5xl uppercase tracking-tight md:text-7xl hero-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Gallery
          </h1>
        </div>
      </section>

      {/* Flickr link */}
      <section className="mx-auto max-w-7xl px-6 pb-16 text-center">
        <p className="text-lg text-muted">
          View our complete photo library on Flickr
        </p>
        <Link
          href="https://www.flickr.com/photos/89473850@N02/albums/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block border border-gold bg-gold/10 px-8 py-3 font-mono text-sm uppercase tracking-widest text-gold hover:bg-gold/20"
        >
          Browse on Flickr
        </Link>
      </section>

      {/* SR16 photo grid */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
        <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
          SR16
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {sr16Photos.map((photo) => (
            <div key={photo.src} className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
