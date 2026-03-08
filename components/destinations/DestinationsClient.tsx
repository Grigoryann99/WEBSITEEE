'use client';

import { useState, useMemo } from 'react';
import SearchBar from '@/components/destinations/SearchBar';
import DestinationCard from '@/components/destinations/DestinationCard';
import PlaceCard from '@/components/destinations/PlaceCard';
import RestaurantCard from '@/components/destinations/RestaurantCard';
import TravelCostCard from '@/components/destinations/TravelCostCard';
import ActivityCard from '@/components/destinations/ActivityCard';
import Link from 'next/link';

// Shared interfaces from page.tsx (exported over there or defined here)
export interface DestinationUI {
    city: string;
    country: string;
    image: string;
    description: string;
    landmarks?: string[];
}

export interface PlaceUI {
    title: string;
    image: string;
    rating: number;
    description: string;
}

export interface RestaurantUI {
    name: string;
    cuisine: string;
    rating: number;
    priceLevel: string;
}

export interface CostUI {
    city: string;
    cost: string;
}

export interface ActivityUI {
    category: string;
    activities: string[];
}

export interface DestinationsPageData {
    popularDestinations?: DestinationUI[];
    bestPlacesToVisit?: PlaceUI[];
    bestRestaurants?: RestaurantUI[];
    bestPlacesToRelax?: PlaceUI[];
    travelCosts?: CostUI[];
    thingsToDo?: ActivityUI[];
}

interface DestinationsClientProps {
    initialData: DestinationsPageData;
}

export default function DestinationsClient({ initialData }: DestinationsClientProps) {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter destinations based on search query (matches city, country, or landmarks)
    const filteredDestinations = useMemo(() => {
        const items = initialData?.popularDestinations || [];
        if (!searchQuery.trim()) return items;
        const query = searchQuery.toLowerCase();
        return items.filter(d =>
            (d.city?.toLowerCase() || '').includes(query) ||
            (d.country?.toLowerCase() || '').includes(query) ||
            (d.landmarks || []).some(landmark => landmark.toLowerCase().includes(query))
        );
    }, [initialData?.popularDestinations, searchQuery]);

    // Filter places based on search query (matches title or description)
    const filteredPlaces = useMemo(() => {
        const items = initialData?.bestPlacesToVisit || [];
        if (!searchQuery.trim()) return items;
        const query = searchQuery.toLowerCase();
        return items.filter(p =>
            (p.title?.toLowerCase() || '').includes(query) ||
            (p.description?.toLowerCase() || '').includes(query)
        );
    }, [initialData?.bestPlacesToVisit, searchQuery]);

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-brand-light font-sans selection:bg-brand-accent selection:text-white">

            {/* 1. Hero Section */}
            <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20">
                <div className="absolute inset-0 z-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop"
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]" />
                </div>

                <div className="relative z-10 text-center w-full max-w-4xl mx-auto">
                    <p className="font-sans text-brand-accent tracking-[0.3em] text-xs sm:text-sm uppercase mb-6 animate-fade-in-up">
                        Your Journey Begins Here
                    </p>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-brand-light mb-8 leading-tight tracking-wider drop-shadow-2xl">
                        Explore Destinations
                    </h1>
                    <p className="font-light text-brand-light/70 text-lg md:text-xl max-w-2xl mx-auto mb-12">
                        Immerse yourself in spectacular landscapes, culinary masterpieces, and rejuvenating retreats across the globe.
                    </p>
                    {/* Pass state control to the SearchBar */}
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                </div>
            </section>

            {/* Container for content sections */}
            <div className="max-w-7xl mx-auto px-6 space-y-32 py-20">

                {/* 2. Popular Destinations */}
                <section>
                    <div className="mb-12 md:mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl text-brand-light mb-4">Popular Destinations</h2>
                        <div className="w-24 h-1 bg-brand-accent" />
                        {searchQuery && (
                            <p className="text-brand-light/40 mt-4 text-sm font-light">
                                Showing results for &quot;{searchQuery}&quot;
                            </p>
                        )}
                    </div>

                    {filteredDestinations.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 hover-group">
                            {filteredDestinations.map((dest, i) => {
                                const countrySlug = dest.country.toLowerCase().replace(' ', '_');
                                return (
                                    <Link key={i} href={`/countries/${countrySlug}`} className="block">
                                        <DestinationCard {...dest} />
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-brand-light/40 italic">No destinations found matching your search.</p>
                    )}
                </section>

                {/* 3. Best Places to Visit */}
                <section>
                    <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h2 className="font-serif text-4xl md:text-5xl text-brand-light mb-4">Iconic Landmarks</h2>
                            <div className="w-24 h-1 bg-brand-accent mb-4" />
                            <p className="text-brand-light/60 font-light max-w-xl">
                                Discover the world&apos;s most breathtaking architectural wonders and historical sites.
                            </p>
                        </div>
                    </div>
                    {filteredPlaces.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredPlaces.map((place, i) => (
                                <PlaceCard key={i} {...place} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-brand-light/40 italic">No landmarks found matching your search.</p>
                    )}
                </section>

                {/* The rest of the page remains static from initialLoad (for now) */}

                {/* 4. Best Restaurants */}
                <section className="bg-[#111] -mx-6 px-6 py-24 border-y border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-mesh-luxury opacity-10 pointer-events-none" />
                    <div className="max-w-7xl mx-auto relative z-10 w-full">
                        <div className="mb-16 text-center">
                            <h2 className="font-serif text-4xl md:text-5xl text-brand-light mb-6">Culinary Excellence</h2>
                            <p className="text-brand-light/60 font-light max-w-2xl mx-auto">
                                Savor masterful creations at the world&apos;s most prestigious dining establishments.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {(initialData?.bestRestaurants || []).map((rest, i) => (
                                <RestaurantCard key={i} {...rest} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. Best Places to Relax */}
                <section>
                    <div className="mb-12 md:mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl text-brand-light mb-4">Sanctuaries of Serenity</h2>
                        <div className="w-24 h-1 bg-brand-accent mb-4" />
                        <p className="text-brand-light/60 font-light max-w-xl">
                            Escape the noise and find profound tranquility in these stunning natural retreats.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {(initialData?.bestPlacesToRelax || []).map((place, i) => (
                            <PlaceCard key={i} {...place} />
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                    {/* 6. Typical Travel Costs */}
                    <section className="lg:col-span-5">
                        <div className="mb-12">
                            <h2 className="font-serif text-4xl text-brand-light mb-4">Investment Estimates</h2>
                            <p className="text-brand-light/50 font-sans text-sm tracking-wide">
                                Average daily budget per capita, excluding long-haul flights.
                            </p>
                        </div>
                        <div className="flex flex-col">
                            {(initialData?.travelCosts || []).map((cost, i) => (
                                <TravelCostCard key={i} {...cost} index={i} />
                            ))}
                        </div>
                    </section>

                    {/* 7. Things To Do */}
                    <section className="lg:col-span-7">
                        <div className="mb-12">
                            <h2 className="font-serif text-4xl text-brand-light mb-4">Curated Experiences</h2>
                            <p className="text-brand-light/50 font-sans text-sm tracking-wide">
                                Elevate your journey with exclusive activities tailored to your passions.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {(initialData?.thingsToDo || []).map((activity, i) => (
                                <ActivityCard key={i} {...activity} />
                            ))}
                        </div>
                    </section>
                </div>

            </div>
        </main>
    );
}
