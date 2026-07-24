import HeroScroll from "@/components/scrollytelling/HeroScroll";
import VillaTransition from "@/components/scrollytelling/VillaTransition";
import VillaGallery from "@/components/media/VillaGallery";
import DestinationGlobe from "@/components/media/DestinationGlobe";
import Link from "next/link";

// ─── Editorial Welcome (Singita-style) ────────────────────────────────────────
function WelcomeSection() {
  return (
    <section
      className="relative text-brand-dark py-28 md:py-40 px-6 border-b border-black/5 overflow-hidden"
      style={{
        background: 'linear-gradient(-45deg, #FAF7F2, #E8F4EE, #F8F2E4, #EBF1F7)',
        backgroundSize: '400% 400%',
        animation: 'smoothGradient4Color 18s ease infinite'
      }}
    >
      {/* Background Soft Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#1D9E75]/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[550px] h-[550px] bg-[#C5A059]/15 rounded-full blur-[130px] animate-pulse" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Eyebrow */}
        <p className="font-sans text-brand-accent tracking-[0.3em] text-[10px] uppercase mb-10 flex items-center gap-4 font-semibold">
          <span className="w-10 h-[2px] bg-brand-accent block" />
          Curated for the Discerning Traveller
        </p>

        {/* Large editorial serif headline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          <div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-brand-dark leading-[1.05] tracking-tight mb-0 font-normal">
              Where luxury meets
              <em className="not-italic text-brand-dark/50 font-light"> the extraordinary.</em>
            </h2>
          </div>
          <div className="space-y-6">
            <p className="font-sans font-normal text-brand-dark/80 text-base md:text-lg leading-relaxed">
              VeloraTravel is a luxury travel inspiration platform dedicated to the world&apos;s most extraordinary destinations — private villas, curated guides, and editorial content for discerning travelers planning their next unforgettable journey.
            </p>
            <p className="font-sans font-normal text-brand-dark/80 text-base leading-relaxed">
              From overwater sanctuaries in the Maldives to alpine retreats in the Swiss Alps, our collection spans 50+ destinations across 6 continents.
            </p>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-3 text-brand-dark border-b-2 border-brand-dark/40 pb-1 font-sans text-xs tracking-[0.18em] uppercase font-semibold hover:border-brand-accent hover:text-brand-accent transition-all duration-300 group"
            >
              Explore All Destinations
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes smoothGradient4Color {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}

// ─── Editorial Stats Strip ────────────────────────────────────────────────────
function MiniStatsSection() {
  return (
    <section
      className="py-0 border-b border-black/5 relative overflow-hidden backdrop-blur-md"
      style={{
        background: 'linear-gradient(90deg, #F5F2EC, #EBF3EF, #F6F1E7, #EEF2F6)',
        backgroundSize: '300% 300%',
        animation: 'smoothGradient4Color 15s ease infinite'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 divide-x divide-black/10 relative z-10">
        {[
          { value: '50+', label: 'Destinations' },
          { value: '9',   label: 'Private Villas' },
          { value: '6',   label: 'Travel Styles' },
        ].map((s) => (
          <div key={s.label} className="py-10 md:py-14 flex flex-col items-center gap-1">
            <span className="font-serif text-4xl md:text-5xl text-brand-dark font-medium">{s.value}</span>
            <span className="font-sans text-brand-dark/70 tracking-[0.22em] uppercase text-[9px] md:text-[10px] font-medium">{s.label}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes smoothGradient4Color {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
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
      <MiniStatsSection />

      {/* Villas anchor lives inside VillaGallery itself */}
      <VillaTransition />
      <VillaGallery />

      <div id="destinations">
        <DestinationGlobe />
      </div>
    </>
  );
}
