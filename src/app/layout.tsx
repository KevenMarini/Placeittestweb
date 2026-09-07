import type { Metadata } from "next";
import { Chakra_Petch, Space_Mono, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const chakraPetch = Chakra_Petch({
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlaceIT - IEEE PCS Ideathon",
  description: "PlaceIT is the flagship ideathon by IEEE PCS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${chakraPetch.variable} ${spaceMono.variable} ${inter.variable} h-full antialiased bg-navy text-off-white`}
    >
      <body className="min-h-full flex flex-col font-sans pt-16 relative">
        <Navbar />
        <main className="flex-grow relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
