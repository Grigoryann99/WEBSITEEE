import HeroScroll from "@/components/scrollytelling/HeroScroll";
import VillaTransition from "@/components/scrollytelling/VillaTransition";
import VillaGallery from "@/components/media/VillaGallery";
import DestinationGlobe from "@/components/media/DestinationGlobe";
import Link from "next/link";
import { Star, Book, Globe } from "lucide-react";

function WelcomeSection() {
  return (
    <section className="bg-[#050505] text-brand-light py-32 px-6">
      <div className="max-w-[700px] mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-10">
          Welcome to <span className="text-brand-accent">VeloraTravel</span>
        </h2>
        <div className="font-sans font-light text-brand-light/70 text-lg leading-relaxed space-y-6 mb-16">
          <p>
            <span className="text-brand-accent font-normal">VeloraTravel</span> is a luxury travel inspiration and planning platform dedicated to the world&apos;s most extraordinary destinations. We curate private villas, destination guides, and editorial travel content to help discerning travelers plan their next unforgettable journey.
          </p>
          <p>
            From overwater sanctuaries in the Maldives to alpine retreats in the Swiss Alps, our collection spans 50+ destinations across 6 continents. Whether you are planning a honeymoon, a family escape, or a solo adventure, <span className="text-brand-accent font-normal">VeloraTravel</span> offers the inspiration and practical guidance to make it exceptional.
          </p>
          <p>
            Explore our destination guides, browse our luxury villa collection, or read our Travel Journal for expert tips and insider knowledge from around the world.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/destinations" className="bg-brand-accent text-[#0a0a0a] px-8 py-4 rounded-full text-xs font-sans tracking-widest uppercase font-semibold hover:bg-white transition-all w-full sm:w-auto">
            Explore Destinations
          </Link>
          <a href="#villas" className="border border-brand-accent text-brand-accent px-8 py-4 rounded-full text-xs font-sans tracking-widest uppercase font-semibold hover:bg-brand-accent hover:text-[#0a0a0a] transition-all w-full sm:w-auto">
            Browse Villas
          </a>
          <Link href="/blog" className="border border-white/20 text-white px-8 py-4 rounded-full text-xs font-sans tracking-widest uppercase font-semibold hover:bg-white/10 transition-all w-full sm:w-auto">
            Read the Journal
          </Link>
        </div>
      </div>
    </section>
  );
}

function MiniStatsSection() {
  return (
    <section className="bg-[#0a0a0a] py-16 border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
        <div className="py-4 md:py-0 flex flex-col items-center">
          <span className="font-serif text-5xl text-brand-accent mb-2">50+</span>
          <span className="font-sans text-brand-light/60 tracking-widest uppercase text-sm">Destinations Covered</span>
        </div>
        <div className="py-4 md:py-0 flex flex-col items-center">
          <span className="font-serif text-5xl text-brand-accent mb-2">9</span>
          <span className="font-sans text-brand-light/60 tracking-widest uppercase text-sm">Luxury Villas</span>
        </div>
        <div className="py-4 md:py-0 flex flex-col items-center">
          <span className="font-serif text-5xl text-brand-accent mb-2">6</span>
          <span className="font-sans text-brand-light/60 tracking-widest uppercase text-sm">Travel Categories</span>
        </div>
      </div>
    </section>
  );
}

function WhyVeloraTravel() {
  return (
    <section className="bg-[#050505] py-32 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center text-white mb-16">Why VeloraTravel</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#111] border border-white/5 rounded-2xl p-8 hover:border-brand-accent/40 transition-colors">
            <Star className="w-8 h-8 text-brand-accent mb-6" />
            <h3 className="font-serif text-2xl text-white mb-4">Expert Curation</h3>
            <p className="font-sans text-brand-light/60 leading-relaxed font-light">
              Every destination, villa, and travel guide on VeloraTravel is handpicked by our editorial team. We feature only places we would genuinely recommend to a close friend — no paid placements, ever.
            </p>
          </div>
          <div className="bg-[#111] border border-white/5 rounded-2xl p-8 hover:border-brand-accent/40 transition-colors">
            <Book className="w-8 h-8 text-brand-accent mb-6" />
            <h3 className="font-serif text-2xl text-white mb-4">Honest Guides</h3>
            <p className="font-sans text-brand-light/60 leading-relaxed font-light">
              No paid placements, no sponsored rankings. Our destination guides give you real practical advice — honest seasonal insights, visa info, and local knowledge you will not find in a generic travel blog.
            </p>
          </div>
          <div className="bg-[#111] border border-white/5 rounded-2xl p-8 hover:border-brand-accent/40 transition-colors">
            <Globe className="w-8 h-8 text-brand-accent mb-6" />
            <h3 className="font-serif text-2xl text-white mb-4">50+ Destinations</h3>
            <p className="font-sans text-brand-light/60 leading-relaxed font-light">
              From the temples of Kyoto to the beaches of the Maldives, we cover 50 of the world&apos;s most extraordinary destinations with deep, researched editorial content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <div id="home">
        <HeroScroll />
      </div>
      
      <WelcomeSection />
      <MiniStatsSection />
      
      <div id="villas">
        <VillaTransition />
        <VillaGallery />
      </div>

      <WhyVeloraTravel />
      
      <div id="destinations">
        <DestinationGlobe />
      </div>
    </main>
  );
}
