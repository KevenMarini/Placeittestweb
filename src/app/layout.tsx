import type { Metadata } from "next";
import { Caveat, Plus_Jakarta_Sans, Courier_Prime } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-marker",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const courierPrime = Courier_Prime({
  variable: "--font-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://placeittestweb.vercel.app"),
  title: "PlaceIT 5.0 - IEEE PCS Ideathon",
  description: "PlaceIT 5.0 is the flagship ideathon by IEEE PCS.",
  openGraph: {
    title: "PlaceIT 5.0 - IEEE PCS Ideathon",
    description: "PlaceIT 5.0 is the flagship ideathon by IEEE PCS.",
    images: ["/opengraph-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PlaceIT 5.0 - IEEE PCS Ideathon",
    description: "PlaceIT 5.0 is the flagship ideathon by IEEE PCS.",
    images: ["/twitter-image.jpg"],
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
      className={`${caveat.variable} ${plusJakarta.variable} ${courierPrime.variable} h-full antialiased text-ink bg-canvas`}
    >
      <body className="min-h-full flex flex-col font-sans pt-16 relative bg-canvas">
        <Navbar />
        <main className="flex-grow relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
