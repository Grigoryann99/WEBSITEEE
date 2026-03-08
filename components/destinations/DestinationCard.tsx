import { useState } from 'react';
import Image from 'next/image';

interface DestinationCardProps {
    city: string;
    country: string;
    image: string;
    description: string;
}

export default function DestinationCard({ city, country, image, description }: DestinationCardProps) {
    // Ordered array of image sources to attempt
    const fallbackSources = [
        image,
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop',
        '/images/placeholder.jpg'
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
        <div className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

            {/* Skeleton loading background */}
            <div className={`absolute inset-0 bg-[#222] animate-pulse ${isLoaded ? 'hidden' : 'block'}`} />

            <div className="absolute inset-0">
                {currentSrc && (
                    <Image
                        src={currentSrc}
                        alt={`${city}, ${country}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={`object-cover transition-all duration-700 ease-in-out group-hover:scale-110 
                            ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
                        onLoad={() => setIsLoaded(true)}
                        onError={handleError}
                    />
                )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-brand-accent text-xs tracking-[0.2em] font-sans uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {country}
                </p>
                <h3 className="text-3xl font-serif text-brand-light mb-3">
                    {city}
                </h3>
                <p className="text-brand-light/70 text-sm font-sans font-light line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                    {description}
                </p>
            </div>

            {/* Outline highlight effect on hover */}
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-3xl transition-colors duration-500 pointer-events-none" />
        </div>
    );
}
