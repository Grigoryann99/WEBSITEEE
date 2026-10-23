import { jsonLd } from '@/lib/json-ld';
import type { Metadata } from "next";
import { Playfair_Display, Inter, Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import { CurrencyProvider } from '@/components/currency/CurrencyProvider';
import { AuthProvider } from '@/components/auth/AuthProvider';
import ConsentScripts from '@/components/layout/ConsentScripts';
import FloatingConcierge from '@/components/planner/FloatingConcierge';
import { DisplayPreferencesProvider } from '@/components/preferences/DisplayPreferences';

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "500",
  style: ["normal", "italic"],
  variable: "--font-playfair",
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
  metadataBase: new URL('https://veloratravel.org'),
  title: {
    default: "VeloraTravel — Curated Luxury Travel Guides & Destinations",
    template: "%s | VeloraTravel",
  },
  description: "Discover expertly curated travel guides, luxury destination insights, and insider tips for 50+ countries. Plan your next extraordinary journey with VeloraTravel.",
  keywords: ["travel guides", "luxury travel", "destination guides", "travel tips", "curated travel experiences", "best places to visit"],
  authors: [{ name: "VeloraTravel", url: "https://veloratravel.org" }],
  creator: "VeloraTravel",
  publisher: "VeloraTravel",
  icons: {
    icon: '/logo.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://veloratravel.org',
    siteName: 'VeloraTravel',
    title: 'VeloraTravel — Curated Luxury Travel Guides & Destinations',
    description: 'Discover expertly curated travel guides, luxury destination insights, and insider tips for 50+ countries.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VeloraTravel — Curated Luxury Travel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VeloraTravel — Curated Luxury Travel Guides',
    description: 'Discover expertly curated travel guides for 50+ countries.',
    images: ['/og-image.jpg'],
    creator: '@veloratravel',
  },
  verification: {
    google: "PqeUm5izo6iBy7_ViFaOQG7PmnNl3Wvs8A2y40AV8ss",
  },
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "VeloraTravel",
              "url": "https://veloratravel.org",
              "logo": "https://veloratravel.org/logo.svg",
              "sameAs": [
                "https://www.instagram.com/velorashow?igsh=MW1jZzkxYTY2cWlmcA==",
                "https://youtube.com/@velorashow1?si=UPuwLPXV3KRKcO1_"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "support@veloratravel.org"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "VeloraTravel",
              "url": "https://veloratravel.org/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://veloratravel.org/destinations?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} ${montserrat.variable} ${roboto.variable} antialiased bg-brand-light text-brand-dark font-sans`}
      >
        <DisplayPreferencesProvider><CurrencyProvider><AuthProvider>
        <Navigation />
        <SmoothScroll>
          <div className="min-h-screen">
            {children}
          </div>
          <Footer />
        </SmoothScroll>
        <CookieBanner />
        <FloatingConcierge />
        <ConsentScripts />
        </AuthProvider></CurrencyProvider></DisplayPreferencesProvider>
      </body>
    </html>
  );
}
