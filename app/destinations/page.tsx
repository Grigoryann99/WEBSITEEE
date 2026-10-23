'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Compass, Sparkles, ArrowRight } from 'lucide-react';
import { globalDestinations } from '@/lib/destinationsData';
import SeoTextBlock from '@/components/shared/SeoTextBlock';
import dynamic from 'next/dynamic';
const EarthExplorer = dynamic(() => import('@/components/destinations/EarthExplorer'), { ssr: false });

const CONTINENT_PILLS = ['All', 'Europe', 'Asia', 'Americas', 'Middle East', 'Africa'] as const;

const destinationsSeoContent = [
    "Exploring the world's finest destinations requires more than just a map; it requires expert curation and transparent local insight. At VeloraTravel, our destination guides are meticulously crafted to highlight the absolute best each country and city has to offer across 50+ countries and 6 continents.",
    "Our approach to travel is rooted in authenticity and reliability. From securing access to ancient landmarks in Rome to discovering coastal enclaves in the Mediterranean or tranquil mountain retreats in the Alps, our directory connects you with verified attractions, transparent pricing estimates, and practical transit advice.",
    "Explore our curated countries, discover emerging destinations, and use our personal concierge tools to build your ideal itinerary."
];

export default function DestinationsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedContinent, setSelectedContinent] = useState<string>('All');

    const filteredDestinations = useMemo(() => {
        let results = globalDestinations;

        if (selectedContinent !== 'All') {
            results = results.filter(d => d.region === selectedContinent);
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            results = results.filter(d =>
                d.name.toLowerCase().includes(q) ||
                (d.description && d.description.toLowerCase().includes(q)) ||
                (d.region && d.region.toLowerCase().includes(q))
            );
        }

        return results;
    }, [searchQuery, selectedContinent]);

    return (
        <main className="min-h-screen bg-cream text-ink pt-28 pb-20 selection:bg-sky-200">
            {/* 1. Header Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 text-center pt-8 pb-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-sky-100 text-sky-800 text-xs font-semibold uppercase tracking-wider mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    Global Intelligence Directory
                </div>
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold text-ink tracking-tight">
                    Curated Destinations
                </h1>
                <p className="text-ink-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
                    Explore 50+ hand-selected countries and cities. Verified sights, local culture, and smart travel recommendations.
                </p>

            </section>

            <EarthExplorer />

            <section id="destination-directory" aria-label="Filter destinations" className="mx-auto mb-10 max-w-6xl px-4 sm:px-6">
                {/* Filter and Search Bar Container */}
                <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
                    {/* Continent Filter Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-pill bg-white/90 border border-sky-100 shadow-soft">
                        {CONTINENT_PILLS.map((pill) => {
                            const isSelected = selectedContinent === pill;
                            return (
                                <button
                                    key={pill}
                                    type="button"
                                    onClick={() => setSelectedContinent(pill)}
                                    className={`px-4 py-2 rounded-pill text-xs sm:text-sm font-semibold transition-all ${
                                        isSelected
                                            ? 'bg-ink text-white shadow-xs'
                                            : 'text-ink-500 hover:text-ink hover:bg-cream-100'
                                    }`}
                                >
                                    {pill}
                                </button>
                            );
                        })}
                    </div>

                    {/* Search Field */}
                    <div className="relative w-full md:w-72">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search countries..."
                            className="w-full bg-white border border-sky-100/90 rounded-pill py-2.5 pl-10 pr-4 text-xs sm:text-sm text-ink placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-soft"
                        />
                        <Search className="w-4 h-4 text-sky-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                </div>
            </section>

            {/* 2. Featured Pilot Destination Banner (Rome) */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
                <div className="relative rounded-[32px] overflow-hidden bg-white border border-sky-100/80 shadow-lift p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative w-full md:w-1/2 h-64 sm:h-72 rounded-card overflow-hidden">
                        <Image
                            src="/images/attractions/italy-colosseum.jpg"
                            alt="Rome Italy"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 rounded-pill bg-white/90 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-sky-800 shadow-xs">
                                ★ Pilot Concierge City
                            </span>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
                            Italy · Full Workspace Active
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ink mt-2">
                            Rome & Ancient Lazio
                        </h2>
                        <p className="text-sm text-ink-500 mt-3 leading-relaxed">
                            Our first fully verified city guide: 38 curated sights, restaurants, markets, and transit options with live interactive mapping and instant currency recalculation.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href="/destinations/italy/rome"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-ink text-white font-semibold text-xs sm:text-sm hover:bg-ink-700 transition-colors shadow-sm"
                            >
                                <span>Launch Rome Workspace</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/destinations/italy/rome/gifts"
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-pill bg-cream text-ink-700 font-semibold text-xs sm:text-sm hover:bg-cream-200 transition-colors border border-cream-300"
                            >
                                Gift Finder
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Responsive Destination Cards Grid (~30px rounded corners) */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between mb-8">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-400">
                        Showing {filteredDestinations.length} Destination{filteredDestinations.length === 1 ? '' : 's'}
                    </p>
                </div>

                {filteredDestinations.length === 0 ? (
                    <div className="text-center py-24 rounded-card bg-white border border-sky-100 p-8">
                        <Compass className="w-10 h-10 text-sky-600 mx-auto mb-3" />
                        <h3 className="font-serif text-xl font-semibold text-ink">No destinations matched your criteria</h3>
                        <p className="text-sm text-ink-400 mt-1">Try resetting the filter or searching for another region.</p>
                        <button
                            type="button"
                            onClick={() => { setSelectedContinent('All'); setSearchQuery(''); }}
                            className="mt-4 px-4 py-2 rounded-pill bg-ink text-white text-xs font-semibold hover:bg-ink-700 transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                        {filteredDestinations.map((dest) => {
                            const linkHref = `/destinations/${dest.name.toLowerCase().replace(/ /g, '-')}`;

                            return (
                                <Link
                                    key={dest.id}
                                    href={linkHref}
                                    className="group flex flex-col rounded-card bg-white border border-sky-100/90 overflow-hidden shadow-soft hover:shadow-lift hover:-translate-y-1.5 transition-all duration-300"
                                >
                                    {/* Card Image */}
                                    <div className="relative h-56 w-full overflow-hidden bg-sky-50">
                                        <Image
                                            src={dest.image}
                                            alt={dest.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />

                                        {/* Region Chip */}
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2.5 py-1 rounded-pill bg-white/90 backdrop-blur-md text-[11px] font-semibold text-ink shadow-xs">
                                                {dest.region || 'Global'}
                                            </span>
                                        </div>

                                        {/* Name overlay */}
                                        <div className="absolute bottom-3 left-4 right-4">
                                            <h3 className="font-serif text-2xl font-bold text-white drop-shadow-sm">
                                                {dest.name}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-5 flex-1 flex flex-col justify-between">
                                        <p className="text-xs text-ink-500 leading-relaxed line-clamp-3">
                                            {dest.description}
                                        </p>

                                        <div className="mt-5 pt-4 border-t border-sky-100/70 flex items-center justify-between">
                                            <span className="text-[11px] font-semibold text-sky-700 uppercase tracking-wider">
                                                Curated Guide
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-cream text-ink text-xs font-semibold group-hover:bg-ink group-hover:text-white transition-colors border border-cream-300">
                                                <span>Explore</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* 4. SEO Editorial Block */}
            <div className="mt-20">
                <SeoTextBlock title="World-Class Travel Destination Intelligence" content={destinationsSeoContent} />
            </div>
        </main>
    );
}
