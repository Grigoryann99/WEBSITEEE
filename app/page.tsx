import type { Metadata } from "next";
import HeroConcierge from "@/components/home/HeroConcierge";
import CuratedHighlights from "@/components/home/CuratedHighlights";
import DestinationGlobe from "@/components/media/DestinationGlobe";
import SeoTextBlock from "@/components/shared/SeoTextBlock";
import { countries } from '@/lib/countryData';
import { destinationOptions } from '@/lib/destination-options';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  title: 'VeloraTravel — Curated Luxury Travel Concierge & Verified Guides',
  description: 'Your destination. Your budget. Your kind of journey. Explore country guides, discover travel highlights and choose the planning tools available for your destination.',
};

const homeSeoContent = [
  "Explore country guides across more than 50 destinations, with ideas for landmarks, local culture and places to stay. Start with the country you want to discover, then explore its highlights and travel tips.",
  "Planning tools are available by city. Our Rome city companion brings together a venue catalog, an interactive map, gift suggestions and a day-by-day planner. Other destinations currently offer country guides; their availability is shown before you start planning.",
  "Keep your preferred currency as you explore. Venue prices and opening hours may change, so confirm details with the original source before booking."
];

export default function Home() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      {/* 1. Cinematic Hero with Floating Capsule Search Bar */}
      <HeroConcierge destinations={destinationOptions().map(option => ({ name: option.kind === 'city' ? `${option.name}, ${option.country}` : option.name, route: option.guideHref, city: option.kind === 'city', searchTerms: option.searchTerms }))} />

      {/* 3. Photographic country collection */}
      <section id="destinations" aria-labelledby="global-collection-title" className="mx-auto max-w-[1536px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <DestinationGlobe countryCount={Object.keys(countries).length} />
      </section>

      {/* City planning is currently available for Rome. */}
      <CuratedHighlights />

      {/* 4. SEO Editorial Knowledge Block */}
      <SeoTextBlock
        title="Elevating the Art of Curated Travel"
        content={homeSeoContent}
      />
    </main>
  );
}
