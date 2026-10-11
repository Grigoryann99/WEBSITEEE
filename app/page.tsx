import HeroScroll from "@/components/scrollytelling/HeroScroll";
import VillaGallery from "@/components/media/VillaGallery";
import DestinationGlobe from "@/components/media/DestinationGlobe";
import Link from "next/link";
import SeoTextBlock from "@/components/shared/SeoTextBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const homeSeoContent = [
  "At VeloraTravel, we believe that true luxury is found in the extraordinary. Our curated collection of global destinations is designed for the discerning traveler who seeks more than just a vacation. From the pristine, sun-drenched beaches of the Maldives to the rugged, awe-inspiring peaks of the Swiss Alps, every location we feature has been hand-selected to offer an unparalleled travel experience. We understand that our clientele values privacy, exclusivity, and flawless service, which is why our portfolio focuses on private villas, hidden estates, and boutique sanctuaries that remain untouched by mass tourism.",
  "Planning a luxury getaway requires meticulous attention to detail and a deep understanding of what makes a destination truly special. Whether you are searching for a romantic honeymoon retreat, a sprawling family estate in Tuscany, or an adventurous safari lodge in South Africa, VeloraTravel provides comprehensive insights and insider knowledge. Our travel journals and destination guides go beyond the ordinary, uncovering secret local restaurants, exclusive cultural experiences, and the best times to visit to avoid the crowds.",
  "In a world where time is the ultimate luxury, we streamline the inspiration process. Our immersive platform allows you to explore over 50 global destinations across 6 continents from the comfort of your home. We are constantly expanding our portfolio, ensuring that our recommendations remain fresh, relevant, and aligned with the highest standards of luxury hospitality. Discover your next unforgettable journey with VeloraTravel and elevate the way you explore the world."
];

// ─── Editorial Welcome (Singita-style) ────────────────────────────────────────
function WelcomeSection() {
  return (
    <section
      className="welcome-section relative text-[#0F172A] py-28 md:py-40 px-6 overflow-hidden animate-vivid-gradient"
      style={{
        background: 'linear-gradient(-45deg, #D1FAE5, #FEF3C7, #E0F2FE, #F3E8FF)',
      }}
    >
      {/* Background Soft Glow Orbs — static radial gradients instead of blur+pulse */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
        <div
          className="absolute top-0 left-1/4 w-[550px] h-[550px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)', transform: 'translateZ(0)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)', transform: 'translateZ(0)' }}
        />
        <div
          className="absolute top-1/3 right-10 w-[450px] h-[450px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)', transform: 'translateZ(0)' }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Eyebrow */}
        <p className="font-sans text-[#059669] tracking-[0.3em] text-[10px] uppercase mb-10 flex items-center gap-4 font-bold">
          <span className="w-10 h-[2px] bg-[#059669] block" />
          Curated for the Discerning Traveller
        </p>

        {/* Large editorial serif headline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          <div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#0F172A] leading-[1.05] tracking-tight mb-0 font-semibold">
              Where luxury meets
              <em className="not-italic text-[#059669] font-normal"> the extraordinary.</em>
            </h2>
          </div>
          <div className="space-y-6">
            <p className="font-sans font-medium text-[#1E293B] text-base md:text-lg leading-relaxed">
              VeloraTravel is a luxury travel inspiration platform dedicated to the world&apos;s most extraordinary destinations — private villas, curated guides, and editorial content for discerning travelers planning their next unforgettable journey.
            </p>
            <p className="font-sans font-medium text-[#1E293B] text-base leading-relaxed">
              From overwater sanctuaries in the Maldives to alpine retreats in the Swiss Alps, our collection spans 50+ destinations across 6 continents.
            </p>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-3 text-[#0F172A] border-b-2 border-[#0F172A] pb-1 font-sans text-xs tracking-[0.18em] uppercase font-bold hover:border-[#059669] hover:text-[#059669] transition-all duration-300 group"
            >
              Explore All Destinations
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}



// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <div id="home" className="home-section-fade relative">
        <HeroScroll />
      </div>

      <WelcomeSection />


      {/* Villas anchor lives inside VillaGallery itself */}
      <VillaGallery />

      <div id="destinations">
        <DestinationGlobe />
      </div>

      <SeoTextBlock 
        title="Elevating the Art of Luxury Travel" 
        content={homeSeoContent} 
      />
    </>
  );
}
