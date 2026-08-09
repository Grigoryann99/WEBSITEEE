import HeroScroll from "@/components/scrollytelling/HeroScroll";
import VillaTransition from "@/components/scrollytelling/VillaTransition";
import VillaGallery from "@/components/media/VillaGallery";
import DestinationGlobe from "@/components/media/DestinationGlobe";
import Link from "next/link";

// ─── Editorial Welcome (Singita-style) ────────────────────────────────────────
function WelcomeSection() {
  return (
    <section
      className="relative text-[#0F172A] py-28 md:py-40 px-6 border-b border-black/10 overflow-hidden animate-vivid-gradient"
      style={{
        background: 'linear-gradient(-45deg, #D1FAE5, #FEF3C7, #E0F2FE, #F3E8FF)',
      }}
    >
      {/* Background Soft Vivid Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
        <div className="absolute top-0 left-1/4 w-[550px] h-[550px] bg-[#10B981]/40 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#F59E0B]/40 rounded-full blur-[110px] animate-pulse" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#8B5CF6]/35 rounded-full blur-[90px]" />
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
      <div id="home">
        <HeroScroll />
      </div>

      <WelcomeSection />


      {/* Villas anchor lives inside VillaGallery itself */}
      <VillaTransition />
      <VillaGallery />

      <div id="destinations">
        <DestinationGlobe />
      </div>
    </>
  );
}
