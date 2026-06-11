import type { Metadata } from "next";
import { displayFont, bodyFont, monoFont } from "@/lib/fonts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NoiseOverlay } from "@/components/shared/noise-overlay";
import { CartProvider } from "@/context/cart-context";
import { CartDrawer } from "@/components/merch/cart-drawer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SJSU Spartan Racing | Formula SAE",
    template: "%s | SJSU Spartan Racing",
  },
  description:
    "San José State University Formula SAE Racing Team. Engineering excellence since 1989.",
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
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <CartProvider>
          <a href="#main-content" className="skip-nav">
            Skip to main content
          </a>
          <NoiseOverlay />
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
