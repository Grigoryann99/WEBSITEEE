import type { Metadata } from "next";
import { Cormorant, Inter, Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";

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
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1654457169304666"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "VeloraTravel",
              "url": "https://veloratravel.org",
              "logo": "https://veloratravel.org/logo.png",
              "sameAs": [
                "https://www.instagram.com/veloratravel",
                "https://www.facebook.com/veloratravel"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "support@veloratravel.org"
              }
            })
          }}
        />
      </head>
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
        <CookieBanner />
      </body>
    </html>
  );
}
