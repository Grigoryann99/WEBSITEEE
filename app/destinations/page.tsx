'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Compass, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    globalDestinations,
    destinationCategories,
    featuredDestination,
    inspirationCards,
    travelTips,
    frequentlyAskedQuestions
} from '@/lib/destinationsData';

export default function DestinationsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFaq, setActiveFaq] = useState<string | null>(null);

    // Filter destinations based on search
    const filteredDestinations = useMemo(() => {
        if (!searchQuery) return globalDestinations;
        const q = searchQuery.toLowerCase();
        return globalDestinations.filter(d =>
            d.name.toLowerCase().includes(q) ||
            (d.country && d.country.toLowerCase().includes(q)) ||
            d.description.toLowerCase().includes(q)
        );
    }, [searchQuery]);

    const toggleFaq = (id: string) => {
        setActiveFaq(activeFaq === id ? null : id);
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-brand-light font-sans selection:bg-brand-accent/30 overflow-hidden">

            {/* 1. HERO SECTION */}
            <section className="relative h-screen min-h-[600px] flex items-center justify-center pt-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop"
                        alt="Global Travel Destinations"
                        fill
                        className="object-cover scale-105 animate-slow-pan"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/50 to-[#0a0a0a]" />
                </div>

                <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center pb-24 md:pb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="font-sans text-brand-accent tracking-[0.3em] text-xs md:text-sm uppercase mb-6 inline-flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-brand-accent/50" />
                            Discover the World
                            <span className="w-8 h-[1px] bg-brand-accent/50" />
                        </p>
                        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-brand-light mb-8 tracking-tight drop-shadow-2xl">
                            Explore <br className="md:hidden" /> Destinations
                        </h1>
                        <p className="font-sans text-brand-light/70 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12">
                            Curated intelligence on 50 of the world&apos;s most captivating locations. Find your next extraordinary journey.
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-xl mx-auto">
                            <input
                                type="text"
                                placeholder="Search by country, city, or experience..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-14 pr-6 text-brand-light placeholder:text-brand-light/30 focus:outline-none focus:border-brand-accent/50 focus:bg-white/10 transition-all backdrop-blur-md"
                            />
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-accent" />
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-light/40"
                >
                    <span className="text-[10px] uppercase tracking-widest hidden md:block">Scroll</span>
                    <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-brand-accent/50 to-transparent hidden md:block" />
                </motion.div>
            </section>

            {/* 3. DESTINATION CATEGORIES */}
            <div className="relative z-20 bg-[#0a0a0a] overflow-hidden">
                <section className="relative -mt-16 max-w-7xl mx-auto px-6 pb-16 pt-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {destinationCategories.map((cat, i) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="relative z-10 bg-[#141414] backdrop-blur-xl border border-white/5 rounded-2xl p-6 text-center hover:border-brand-accent/30 hover:-translate-y-1 transition-all group cursor-pointer shadow-xl shadow-black/40"
                            >
                                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{cat.icon}</div>
                                <h3 className="font-serif text-lg text-brand-light mb-2">{cat.title}</h3>
                                <p className="text-[10px] text-brand-light/40 uppercase tracking-wider group-hover:text-brand-accent transition-colors">Explore →</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            {/* 2. GLOBAL DESTINATIONS GRID (50 Items) */}
            <section className="max-w-[1600px] mx-auto px-6 mb-32">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="font-serif text-4xl md:text-5xl text-brand-light mb-4">
                            Global Directory
                        </h2>
                        <p className="font-sans text-brand-light/50 font-light max-w-xl">
                            {searchQuery
                                ? `Found ${filteredDestinations.length} destinations matching "${searchQuery}"`
                                : 'A comprehensive collection of 50 iconic global destinations.'}
                        </p>
                    </div>
                </div>

                {filteredDestinations.length === 0 ? (
                    <div className="text-center py-32 border border-white/5 rounded-3xl bg-[#141414]">
                        <Compass className="w-12 h-12 text-brand-light/20 mx-auto mb-4" />
                        <h3 className="font-serif text-2xl text-brand-light mb-2">No Destinations Found</h3>
                        <p className="text-brand-light/50">Try adjusting your search terms.</p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="mt-6 text-xs uppercase tracking-widest text-brand-accent hover:text-brand-light underline underline-offset-4"
                        >
                            Clear Search
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredDestinations.map((dest, i) => (
                            <motion.div
                                key={dest.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: (Math.min(i, 8) * 0.05) }}
                            >
                                <Link
                                    href={`/countries/${dest.name.toLowerCase().replace(/ /g, '_')}`}
                                    className="group block relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#141414] border border-white/5"
                                >
                                    <div className="relative w-full h-full overflow-hidden">
                                        <Image
                                            src={dest.image}
                                            alt={dest.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            priority={i < 4}
                                            loading={i < 4 ? undefined : "lazy"}
                                            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                                            onError={(e) => {
                                                const target = e.currentTarget as HTMLImageElement;
                                                target.srcset = "";
                                                if (!target.src.includes('picsum.photos')) {
                                                    target.src = `https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800`; // Global travel fallback
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.4)] via-black/10 to-transparent transition-opacity group-hover:opacity-80" />

                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                            <div className="flex items-center gap-2 mb-3">
                                                <MapPin className="w-4 h-4 text-brand-accent" />
                                                <p className="text-[10px] uppercase font-sans tracking-widest text-brand-accent">
                                                    {dest.country || 'Destination'}
                                                </p>
                                            </div>
                                            <h3 className="font-serif text-3xl text-brand-light mb-3">
                                                {dest.name}
                                            </h3>
                                            <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                                                <p className="text-sm font-sans text-brand-light/70 font-light leading-relaxed mb-6 line-clamp-2">
                                                    {dest.description}
                                                </p>
                                                <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-brand-light border-b border-brand-accent pb-1">
                                                    Explore <ArrowRight className="w-3 h-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* 4. FEATURED DESTINATION */}
            <section className="py-32 bg-[#141414] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden"
                        >
                            <Image
                                src={featuredDestination.image}
                                alt={featuredDestination.name}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                loading="lazy"
                                className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                                onError={(e) => {
                                    const target = e.currentTarget as HTMLImageElement;
                                    target.srcset = "";
                                    if (!target.src.includes('picsum.photos')) {
                                        target.src = `https://picsum.photos/seed/kyotojapan/1024/1024`;
                                    }
                                }}
                            />
                            <div className="absolute inset-0 border border-white/10 rounded-3xl z-10 pointer-events-none" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        >
                            <p className="font-sans text-brand-accent tracking-[0.2em] text-xs uppercase mb-4">Featured Highlight</p>
                            <h2 className="font-serif text-5xl md:text-6xl text-brand-light mb-6 tracking-tight">
                                {featuredDestination.name}
                            </h2>
                            <h3 className="text-xl md:text-2xl font-serif text-brand-light/80 mb-8 italic">
                                &quot;{featuredDestination.headline}&quot;
                            </h3>
                            <p className="font-sans text-brand-light/60 font-light leading-relaxed mb-10 text-lg">
                                {featuredDestination.description}
                            </p>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                                {featuredDestination.highlights.map((h, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-sans text-brand-light/80">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                                        {h}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/countries/japan"
                                className="inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-brand-accent hover:scale-105 transition-all"
                            >
                                Discover Japan <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 5. TRAVEL INSPIRATION */}
            <section className="py-32 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="font-sans text-brand-accent tracking-[0.2em] text-xs uppercase mb-4">Curated Collections</p>
                    <h2 className="font-serif text-4xl md:text-5xl text-brand-light">Travel Inspiration</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {inspirationCards.map((card, i) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative aspect-video sm:aspect-square rounded-2xl overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                loading="lazy"
                                className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                                onError={(e) => {
                                    const target = e.currentTarget as HTMLImageElement;
                                    target.srcset = "";
                                    if (!target.src.includes('picsum.photos')) {
                                        target.src = `https://picsum.photos/seed/${card.id}/800/800`;
                                    }
                                }}
                            />
                            <div className="absolute inset-0 bg-[rgba(0,0,0,0.35)] group-hover:bg-black/20 transition-colors duration-300" />
                            <div className="absolute inset-0 p-6 flex items-end">
                                <div>
                                    <h3 className="font-serif text-2xl text-white drop-shadow-lg leading-snug">{card.title}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 6. TRAVEL TIPS */}
            <section className="py-32 bg-[#141414] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="font-serif text-4xl md:text-5xl text-brand-light mb-16 text-center">Expert Travel Tips</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {travelTips.map((tip, i) => (
                            <motion.div
                                key={tip.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 hover:border-brand-accent/20 transition-colors"
                            >
                                <span className="text-brand-accent font-serif text-5xl opacity-20 block mb-4">0{i + 1}</span>
                                <h3 className="font-serif text-2xl text-brand-light mb-4">{tip.title}</h3>
                                <p className="font-sans text-brand-light/60 font-light leading-relaxed text-sm">
                                    {tip.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. FAQ SECTION */}
            <section className="py-32 max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="font-sans text-brand-accent tracking-[0.2em] text-xs uppercase mb-4">Common Questions</p>
                    <h2 className="font-serif text-4xl md:text-5xl text-brand-light">Travel FAQ</h2>
                </div>

                <div className="space-y-4">
                    {frequentlyAskedQuestions.map((faq, i) => (
                        <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="border border-white/10 rounded-2xl bg-[#141414] overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFaq(faq.id)}
                                className="w-full text-left px-8 py-6 flex justify-between items-center hover:bg-white/[0.02]"
                            >
                                <h3 className="font-serif text-xl text-brand-light pr-8">{faq.question}</h3>
                                <ChevronDown className={`w-5 h-5 text-brand-accent transition-transform duration-300 ${activeFaq === faq.id ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {activeFaq === faq.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-8 pb-6 font-sans text-brand-light/60 font-light text-sm leading-relaxed border-t border-white/5 pt-6">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 8. CALL TO ACTION */}
            <section className="relative py-40 border-t border-white/10 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop"
                        alt="Flight wing luxury travel"
                        fill
                        className="object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a]" />
                </div>
                <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                    <h2 className="font-serif text-5xl md:text-7xl text-brand-light mb-8">
                        Start Planning Your Dream Journey
                    </h2>
                    <p className="font-sans text-brand-light/60 text-lg mb-12">
                        Get in touch with our curatorial team to begin crafting your next extraordinary escape.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-3 bg-brand-accent text-[#0a0a0a] px-10 py-5 rounded-full text-sm tracking-widest uppercase font-semibold hover:bg-white hover:scale-105 transition-all shadow-xl shadow-brand-accent/20"
                    >
                        Explore the World <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

        </main>
    );
}
