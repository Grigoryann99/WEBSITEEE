'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CountryDestinationCardProps {
    name: string;
    city: string;
    country: string;
    description: string;
    image: string;
}

export default function CountryDestinationCard({ name, city, country, image, description }: CountryDestinationCardProps) {
    // Ordered array of image sources to attempt exactly as requested
    const fallbackSources = [
        image,  // 1. Initial image prop
        'https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=800&auto=format&fit=crop', // 4. Generic/Wikimedia/Pexels proxy
        '/images/placeholder.jpg' // 5. Local Fallback
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
                    <p className="text-brand-accent text-xs tracking-widest uppercase font-sans mb-1">{city}, {country}</p>
                    <h4 className="font-serif text-2xl text-brand-light">{name}</h4>
                </div>
                <p className="font-sans text-sm text-brand-light/60 font-light leading-relaxed mb-6 flex-grow">
                    {description}
                </p>

                <button className="text-left font-sans text-xs tracking-widest uppercase text-brand-accent hover:text-brand-light transition-colors duration-300 w-fit">
                    Explore Details
                </button>
            </div>
        </div>
    );
}
