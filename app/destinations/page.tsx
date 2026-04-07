'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Compass, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TravelStyleQuiz from '@/components/destinations/TravelStyleQuiz';
import {
    globalDestinations,
    destinationCategories,
    categoryTags,
    featuredBanners,
    inspirationCards,
    travelTips,
    frequentlyAskedQuestions
} from '@/lib/destinationsData';

export default function DestinationsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [activeFaq, setActiveFaq] = useState<string | null>(null);
    const [currentBannerIdx, setCurrentBannerIdx] = useState(0);

    // Auto-rotate featured banner
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBannerIdx((prev) => (prev + 1) % featuredBanners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Filter destinations based on search and category
    const filteredDestinations = useMemo(() => {
        let results = globalDestinations;
        
        if (selectedCategory) {
            results = results.filter(d => {
                const tags = categoryTags[d.id];
                if (tags) {
                    return tags.includes(selectedCategory);
                }
                return d.category === selectedCategory;
            });
        }
        
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            results = results.filter(d =>
                d.name.toLowerCase().includes(q)
            );
        }
        
        return results;
    }, [searchQuery, selectedCategory]);

    const clearAllFilters = () => {
        setSearchQuery('');
        setSelectedCategory(null);
    };

    const toggleCategory = (id: string) => {
        if (selectedCategory === id) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(id);
            if (typeof window !== 'undefined' && window.innerWidth < 768) {
                const grid = document.getElementById('directory-grid');
                if (grid) grid.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const toggleFaq = (id: string) => {
        setActiveFaq(activeFaq === id ? null : id);
    };

    return (
        <main className="min-h-screen bg-[#000000] text-white font-sans selection:bg-[#1D9E75]/30 overflow-hidden">

            {/* 1. HERO SECTION */}
            <section className="relative h-screen min-h-[600px] flex items-center justify-center pt-20">
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
                    <Image
                        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop"
                        alt="Global Travel Destinations"
                        fill
                        className="object-cover scale-105 animate-slow-pan"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/90 via-[#000000]/60 to-[#000000]" />
                </div>

                <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center pb-24 md:pb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="font-sans text-[#1D9E75] tracking-[0.3em] text-xs md:text-sm uppercase mb-6 inline-flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-[#1D9E75]/50" />
                            Discover the World
                            <span className="w-8 h-[1px] bg-[#1D9E75]/50" />
                        </p>
                        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-8 tracking-tight drop-shadow-2xl">
                            Explore <br className="md:hidden" /> Destinations
                        </h1>
                        <p className="font-sans text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12">
                            Curated intelligence on 50 of the world&apos;s most captivating locations. Find your next extraordinary journey.
                        </p>

                        {/* Live Search */}
                        <div className="relative max-w-xl mx-auto">
                            <input
                                type="text"
                                placeholder="Search by country name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-14 pr-6 text-white placeholder:text-white/30 focus:outline-none focus:border-[#1D9E75]/50 focus:bg-white/10 transition-all backdrop-blur-md"
                            />
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1D9E75]" />
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
                >
                    <span className="text-[10px] uppercase tracking-widest hidden md:block">Scroll</span>
                    <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-[#1D9E75]/50 to-transparent hidden md:block" />
                </motion.div>
            </section>

            {/* TRAVEL STYLE QUIZ */}
            <section className="mb-[80px]">
                <TravelStyleQuiz />
            </section>

            {/* FEATURED DESTINATION BANNER (Auto-rotating) */}
            <section className="mb-[80px] w-full">
                <div className="relative h-[400px] w-full overflow-hidden">
                    <AnimatePresence initial={false}>
                        <motion.div
                            key={currentBannerIdx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={featuredBanners[currentBannerIdx].image}
                                alt={featuredBanners[currentBannerIdx].name}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                            
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                                <motion.span
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="text-[10px] uppercase tracking-[0.3em] font-sans text-white/70 mb-4 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm"
                                >
                                    Featured Destination
                                </motion.span>
                                <motion.h2
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                    className="font-serif text-5xl md:text-7xl text-white mb-4 drop-shadow-xl"
                                >
                                    Discover {featuredBanners[currentBannerIdx].name}
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                    className="font-sans text-white/80 text-lg font-light max-w-xl mb-8 drop-shadow-md"
                                >
                                    {featuredBanners[currentBannerIdx].headline}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.6 }}
                                >
                                    <Link
                                        href={featuredBanners[currentBannerIdx].href}
                                        className="inline-flex items-center gap-2 bg-[#1D9E75] text-black font-semibold uppercase tracking-widest text-xs px-8 py-4 rounded-full hover:bg-white transition-colors duration-300"
                                    >
                                        Explore Now <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* CATEGORY FILTERS */}
            <section className="relative z-20 max-w-7xl mx-auto px-6 mb-[80px]">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                    {/* "All" button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        onClick={() => setSelectedCategory(null)}
                        className={`relative z-10 bg-[#0a0a0a] border rounded-xl py-4 px-2 text-center hover:bg-[#141414] transition-all group cursor-pointer ${
                            selectedCategory === null
                            ? 'border-[#1D9E75] ring-1 ring-[#1D9E75]/30'
                            : 'border-white/10 hover:border-[#1D9E75]/30'
                        }`}
                    >
                        <div className={`text-xl mb-2 transition-transform duration-300 ${
                            selectedCategory === null ? 'scale-110' : 'group-hover:scale-110'
                        }`}>
                            🌍
                        </div>
                        <h3 className={`font-sans text-xs uppercase tracking-widest transition-colors ${
                            selectedCategory === null ? 'text-[#1D9E75] font-semibold' : 'text-white/60 font-medium'
                        }`}>
                            All
                        </h3>
                    </motion.div>

                    {destinationCategories.map((cat, i) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.6 }}
                            onClick={() => toggleCategory(cat.id)}
                            className={`relative z-10 bg-[#0a0a0a] border rounded-xl py-4 px-2 text-center hover:bg-[#141414] transition-all group cursor-pointer ${
                                selectedCategory === cat.id 
                                ? 'border-[#1D9E75] ring-1 ring-[#1D9E75]/30' 
                                : 'border-white/10 hover:border-[#1D9E75]/30'
                            }`}
                        >
                            <div className={`text-xl mb-2 transition-transform duration-300 ${
                                selectedCategory === cat.id ? 'scale-110' : 'group-hover:scale-110'
                            }`}>
                                {cat.icon}
                            </div>
                            <h3 className={`font-sans text-xs uppercase tracking-widest transition-colors ${
                                selectedCategory === cat.id ? 'text-[#1D9E75] font-semibold' : 'text-white/60 font-medium'
                            }`}>
                                {cat.title}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* MAGAZINE DIRECTORY HEADER */}
            <section className="max-w-[1600px] mx-auto px-6 mb-12">
                <div className="flex flex-col items-center text-center">
                    <p className="font-sans text-[#1D9E75] tracking-[0.3em] text-[10px] uppercase mb-4 font-semibold">
                        EXPLORE THE WORLD
                    </p>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                        50 Extraordinary Destinations
                    </h2>
                    <p className="font-sans text-white/50 font-light text-lg mb-8 max-w-2xl">
                        A curated archive of the world's most compelling regions, ready for your next adventure.
                    </p>
                    <div className="w-[40px] h-[2px] bg-[#1D9E75] mb-8" />
                    
                    <div className="flex items-center gap-4 w-full">
                        <div className="flex-grow h-px bg-white/5" />
                        <p className="font-sans text-white/40 text-[11px] tracking-[0.2em] uppercase whitespace-nowrap">
                            Showing <span className="text-[#1D9E75] font-semibold">{filteredDestinations.length}</span> Results
                        </p>
                        <div className="flex-grow h-px bg-white/5" />
                    </div>
                </div>
            </section>

            {/* MAGAZINE DIRECTORY GRID */}
            <section id="directory-grid" className="max-w-[1600px] mx-auto px-6 mb-[80px]">
                {filteredDestinations.length === 0 ? (
                    <div className="text-center py-32 border border-white/5 bg-[#0a0a0a]">
                        <Compass className="w-12 h-12 text-white/20 mx-auto mb-4" />
                        <h3 className="font-serif text-2xl text-white mb-2">No Destinations Found</h3>
                        <p className="text-white/50 mb-6">Try adjusting your search or filter.</p>
                        <button
                            onClick={clearAllFilters}
                            className="text-xs uppercase tracking-widest text-[#1D9E75] hover:text-white underline underline-offset-4 transition-colors"
                        >
                            Clear All Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[3px]">
                        {/* 
                          MAGAZINE GRID PATTERN IMPLEMENTATION:
                          Row 1: 1 large (span 2), 2 small (span 1 each)
                          Row 2: 4 equal (technically 3 equal cards in a different setup, but 4-col allows simple mapping. We'll implement cycle)
                          Since it's dynamic data, we map grid column spans cyclically based on index.
                          Cycle length = 7 items
                          0: col-span-2, large (500px)
                          1: col-span-1, medium (350px) / small depending on row break, we'll keep heights fixed classes.
                          2: col-span-1, 
                          3: col-span-1
                          4: col-span-1
                          5: col-span-2, large
                          6: col-span-2, large
                        */}
                        <AnimatePresence mode="popLayout">
                            {filteredDestinations.map((dest, i) => {
                                // Determine classes based on index cycle
                                const cycle = i % 7;
                                let spanClass = "col-span-1 md:col-span-1 xl:col-span-1";
                                let heightClass = "h-[280px] md:h-[350px]";
                                
                                if (cycle === 0) {
                                    spanClass = "col-span-1 md:col-span-2 xl:col-span-2";
                                    heightClass = "h-[350px] md:h-[500px]";
                                } else if (cycle === 5 || cycle === 6) {
                                    spanClass = "col-span-1 md:col-span-2 xl:col-span-2";
                                    heightClass = "h-[350px] md:h-[400px]";
                                }

                                return (
                                    <motion.div
                                        key={dest.id}
                                        layout
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                        className={`${spanClass} ${heightClass} relative group overflow-hidden bg-[#0a0a0a] block`}
                                    >
                                        <Link
                                            href={`/countries/${dest.name.toLowerCase().replace(/ /g, '_')}`}
                                            className="block w-full h-full"
                                        >
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={dest.image}
                                                    alt={dest.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    priority={i < 4}
                                                    loading={i < 4 ? undefined : "lazy"}
                                                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.05]"
                                                />
                                            </div>

                                            {/* Top-to-Bottom Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-colors duration-400 group-hover:from-black" />

                                            {/* Badges container (Top) */}
                                            <div className="absolute top-0 left-0 right-0 p-5 md:p-6 flex justify-between items-start">
                                                {dest.region && (
                                                    <span className="inline-block px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-[9px] uppercase tracking-widest font-sans text-white/90">
                                                        {dest.region}
                                                    </span>
                                                )}
                                                {/* Budget Badge (moved to bottom right for standard layout, but we'll adapt) */}
                                            </div>

                                            {/* Info container (Bottom) */}
                                            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex justify-between items-end">
                                                <div>
                                                    <h3 className="font-serif text-3xl md:text-4xl text-white leading-tight drop-shadow-md">
                                                        {dest.name}
                                                    </h3>
                                                </div>
                                                
                                                <div className="text-right flex flex-col items-end gap-3">
                                                    {/* Hover 'Explore' indicator */}
                                                    <div className="overflow-hidden">
                                                        <span className="flex items-center gap-2 text-[10px] tracking-widest uppercase font-sans font-semibold text-[#1D9E75] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                                                            Explore <ArrowRight className="w-3 h-3" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Edge border instead of radius */}
                                            <div className="absolute inset-0 border border-white/5 pointer-events-none" />
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </section>


            {/* 5. TRAVEL INSPIRATION */}
            <section className="py-24 max-w-7xl mx-auto px-6 mb-[80px]">
                <div className="text-center mb-16">
                    <p className="font-sans text-[#1D9E75] tracking-[0.2em] text-[10px] uppercase mb-4">Curated Collections</p>
                    <h2 className="font-serif text-4xl md:text-5xl text-white">Travel Inspiration</h2>
                </div>

                <div className="
                    flex gap-[3px] overflow-x-auto pb-4
                    sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0
                    lg:grid-cols-3
                    [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                ">
                    {inspirationCards.map((card, i) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: Math.min(i, 5) * 0.08, duration: 0.5 }}
                            className="group relative flex-shrink-0 w-[280px] sm:w-auto h-[400px] bg-[#0a0a0a] overflow-hidden cursor-pointer"
                        >
                            <Link href={card.href} className="block w-full h-full">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 50vw, 33vw"
                                    loading="lazy"
                                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                                />

                                <span className="absolute top-5 left-5 z-20 text-[9px] uppercase tracking-widest font-sans font-medium text-white bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1">
                                    {card.tag}
                                </span>

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 group-hover:from-black transition-opacity duration-300" />
                                <div className="absolute inset-0 border border-white/5 pointer-events-none" />

                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <h3 className="font-serif text-2xl text-white drop-shadow-lg leading-snug mb-4 transition-transform duration-300 ease-out group-hover:-translate-y-1">
                                        {card.title}
                                    </h3>
                                    <span className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase font-sans font-semibold text-[#1D9E75] opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                                        Explore Article <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>


            {/* 6. TRAVEL TIPS */}
            <section className="py-24 bg-[#050505] border-y border-white/5 mb-[80px]">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="font-serif text-4xl md:text-5xl text-white mb-16 text-center">Expert Travel Tips</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[3px]">
                        {travelTips.map((tip, i) => (
                            <motion.div
                                key={tip.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-[#0a0a0a] border border-white/5 p-10 hover:bg-[#0f0f0f] transition-colors"
                            >
                                <span className="text-[#1D9E75] font-serif text-5xl opacity-40 block mb-6 drop-shadow-md">0{i + 1}</span>
                                <h3 className="font-serif text-2xl text-white mb-4">{tip.title}</h3>
                                <p className="font-sans text-white/50 font-light leading-relaxed text-sm">
                                    {tip.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. FAQ SECTION */}
            <section className="py-24 max-w-4xl mx-auto px-6 mb-[80px]">
                <div className="text-center mb-16">
                    <p className="font-sans text-[#1D9E75] tracking-[0.2em] text-[10px] uppercase mb-4">Common Questions</p>
                    <h2 className="font-serif text-4xl md:text-5xl text-white">Travel FAQ</h2>
                </div>

                <div className="space-y-2">
                    {frequentlyAskedQuestions.map((faq, i) => (
                        <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="border border-white/5 bg-[#0a0a0a] overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFaq(faq.id)}
                                className="w-full text-left px-8 py-6 flex justify-between items-center hover:bg-white/[0.03]"
                            >
                                <h3 className="font-serif text-xl text-white/90 pr-8">{faq.question}</h3>
                                <ChevronDown className={`w-5 h-5 text-[#1D9E75] transition-transform duration-300 ${activeFaq === faq.id ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {activeFaq === faq.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-8 pb-6 font-sans text-white/50 font-light text-sm leading-relaxed border-t border-white/5 pt-6">
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
            <section className="relative py-40 border-t border-white/5 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop"
                        alt="Flight wing luxury travel"
                        fill
                        className="object-cover opacity-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-[#000000]" />
                </div>
                <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                    <h2 className="font-serif text-5xl md:text-7xl text-white mb-8 leading-tight">
                        Start Planning Your Dream Journey
                    </h2>
                    <p className="font-sans text-white/50 text-lg mb-12 max-w-xl mx-auto font-light">
                        Get in touch with our curatorial team to begin crafting your next extraordinary escape.
                    </p>
                    <Link
                        href="/support"
                        className="inline-flex items-center justify-center gap-3 bg-[#1D9E75] text-[#000000] px-10 py-5 rounded-none text-[10px] tracking-widest uppercase font-bold hover:bg-white hover:scale-105 transition-all"
                    >
                        Explore the World <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

        </main>
    );
}
