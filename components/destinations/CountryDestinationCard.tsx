'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CountryDestinationCardProps {
    name: string;
    city: string;
    country: string;
    description: string;
    image: string;
    category?: string;
    whyVisit?: string;
    bestTime?: string;
    insiderTip?: string;
    howToGetThere?: string;
    cost?: string;
}

export default function CountryDestinationCard({ 
    name, city, country, image, description,
    category, whyVisit, bestTime, insiderTip, howToGetThere, cost
}: CountryDestinationCardProps) {
    // Unique seeded fallback so every card shows a different image on failure
    const seedSlug = encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'));
    const fallbackSources = [
        image,                                                                           // 1. Primary: specific destination photo
        `https://picsum.photos/seed/${seedSlug}/800/600`,                               // 2. Unique seeded fallback
        `https://picsum.photos/seed/${encodeURIComponent(city.toLowerCase())}/800/600`, // 3. City-seeded fallback
        '/images/placeholder.jpg'                                                        // 4. Local last resort
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleError = () => {
        if (currentImageIndex < fallbackSources.length - 1) {
            setCurrentImageIndex(prev => prev + 1);
        }
    };

    const currentSrc = fallbackSources[currentImageIndex];

    return (
        <div className="group flex flex-col bg-[#141414] rounded-3xl overflow-hidden border border-white/5 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="relative aspect-video overflow-hidden bg-[#222]">
                {/* Skeleton Loading Placeholder */}
                <div className={`absolute inset-0 bg-[#222] animate-pulse ${isLoaded ? 'hidden' : 'block'}`} />

                {currentSrc && (
                    <Image
                        src={currentSrc}
                        alt={`${name}, ${city}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={`object-cover transition-all duration-700 ease-in-out group-hover:scale-110 
                            ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
                        onLoad={() => setIsLoaded(true)}
                        onError={handleError}
                    />
                )}
            </div>

            <div className="flex flex-col flex-grow p-6">
                <div className="mb-3">
                    <p className="text-brand-accent text-xs tracking-widest uppercase font-sans mb-1">
                        {category ? `${category} | ` : ''}{city}, {country}
                    </p>
                    <h4 className="font-serif text-2xl text-brand-light">{name}</h4>
                </div>
                <p className="font-sans text-sm text-brand-light/60 font-light leading-relaxed mb-4 flex-grow">
                    {description}
                </p>

                {(whyVisit || bestTime || insiderTip) && (
                    <div className="space-y-3 mb-6 font-sans text-xs text-brand-light/70 bg-[#1a1a1a] p-4 rounded-xl border border-white/5 shadow-inner leading-relaxed">
                        {whyVisit && <p><strong className="text-brand-light font-medium">Why Visit:</strong> {whyVisit}</p>}
                        {bestTime && <p><strong className="text-brand-light font-medium">Best Time:</strong> {bestTime}</p>}
                        {howToGetThere && <p><strong className="text-brand-light font-medium">Transport:</strong> {howToGetThere}</p>}
                        {cost && <p><strong className="text-brand-light font-medium">Cost:</strong> {cost}</p>}
                        {insiderTip && <p className="pt-1"><strong className="text-brand-accent font-medium">💡 Insider Tip:</strong> {insiderTip}</p>}
                    </div>
                )}

                <button className="text-left font-sans text-xs tracking-widest uppercase text-brand-accent hover:text-brand-light transition-colors duration-300 w-fit mt-auto">
                    Explore Details
                </button>
            </div>
        </div>
    );
}
