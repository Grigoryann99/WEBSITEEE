'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CountryDestinationCardProps {
    name: string;
    city: string;
    country: string;
    description: string;
    image?: string;
    category?: string;
    whyVisit?: string;
    bestTime?: string;
    insiderTip?: string;
    howToGetThere?: string;
    cost?: string;
    unsplashQuery?: string;
}

export default function CountryDestinationCard({ 
    name, city, country, image, description,
    category, whyVisit, bestTime, insiderTip, howToGetThere, cost, unsplashQuery
}: CountryDestinationCardProps) {
    const [fetchedImage, setFetchedImage] = useState<string | null>(null);
    const [photographer, setPhotographer] = useState<string | null>(null);
    const [isFetching, setIsFetching] = useState(!image);

    useEffect(() => {
        if (image) return;

        const cacheKey = `unsplash_${name}_${city}_${country}`;
        const cachedUrl = sessionStorage.getItem(cacheKey + '_url');
        const cachedPhotographer = sessionStorage.getItem(cacheKey + '_photographer');

        if (cachedUrl) {
            setFetchedImage(cachedUrl);
            setPhotographer(cachedPhotographer);
            setIsFetching(false);
            return;
        }

        const fetchImage = async () => {
            const queryToUse = unsplashQuery || `${name} ${city} ${country}`;
            const query = encodeURIComponent(queryToUse);
            try {
                const res = await fetch(`/api/attraction-photo?q=${query}`);
                const data = await res.json();
                if (data.url) {
                    setFetchedImage(data.url + '&w=800&q=80'); // ensure formatting
                    setPhotographer(data.photographer);
                    sessionStorage.setItem(cacheKey + '_url', data.url + '&w=800&q=80');
                    if (data.photographer) {
                        sessionStorage.setItem(cacheKey + '_photographer', data.photographer);
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsFetching(false);
            }
        };

        fetchImage();
    }, [image, name, city, country, unsplashQuery]);

    const seedSlug = encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'));
    const fallbackSources = [
        image,
        fetchedImage,
        `https://picsum.photos/seed/${seedSlug}/800/600`,
        `https://picsum.photos/seed/${encodeURIComponent(city.toLowerCase())}/800/600`,
        '/images/placeholder.jpg'
    ].filter(Boolean) as string[];

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
            <div className="relative aspect-video flex-shrink-0 bg-[#222]">
                <div className={`absolute inset-0 bg-[#222] animate-pulse ${isLoaded && !isFetching ? 'hidden' : 'block'}`} />

                {currentSrc && !isFetching && (
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
                
                {photographer && !isFetching && (
                    <div className="absolute bottom-2 right-2 z-10">
                        <p className="text-[10px] text-white/50 bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                            Photo by {photographer} on Unsplash
                        </p>
                    </div>
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
