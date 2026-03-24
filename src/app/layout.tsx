import type { Metadata } from "next";
import { bebasNeue, inter } from "@/lib/fonts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NoiseOverlay } from "@/components/shared/noise-overlay";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SJSU Spartan Racing | Formula SAE",
    template: "%s | SJSU Spartan Racing",
  },
  description:
    "San José State University Formula SAE Racing Team — Engineering excellence since 1991.",
  metadataBase: new URL("https://sjsuformulasae.com"),
  openGraph: {
    title: "SJSU Spartan Racing",
    description: "San José State University Formula SAE Racing Team",
    siteName: "SJSU Spartan Racing",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <SmoothScrollProvider>
          <NoiseOverlay />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
