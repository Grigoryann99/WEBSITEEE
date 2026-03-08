import type { Metadata } from "next";
import { Cormorant, Inter, Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: 'swap',
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "VeloraTravel",
  description: "Curated Escapes and Luxury Travel Experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${inter.variable} ${montserrat.variable} ${roboto.variable} antialiased bg-brand-dark text-brand-light font-sans`}
      >
        <Navigation />
        <SmoothScroll>
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
