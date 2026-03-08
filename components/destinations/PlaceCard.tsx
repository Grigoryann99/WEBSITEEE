import { Star } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface PlaceCardProps {
    title: string;
    image: string;
    rating: number;
    description: string;
}

export default function PlaceCard({ title, image, rating, description }: PlaceCardProps) {
    // Ordered array of image sources to attempt
    const fallbackSources = [
        image,
        'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop',
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
        <div className="group flex flex-col bg-[#141414] rounded-3xl overflow-hidden border border-white/5 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="relative aspect-video overflow-hidden bg-[#222]">
                {/* Skeleton loading background via bg-[#222] above */}

                {currentSrc && (
                    <Image
                        src={currentSrc}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className={`object-cover transition-all duration-700 ease-in-out group-hover:scale-110 
                            ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
                        onLoad={() => setIsLoaded(true)}
                        onError={handleError}
                    />
                )}

                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 z-10">
                    <Star className="w-3.5 h-3.5 fill-brand-accent text-brand-accent" />
                    <span className="text-white text-xs font-sans font-medium">{rating}</span>
                </div>
            </div>
            <div className="flex flex-col flex-grow p-6">
                <h4 className="font-serif text-2xl text-brand-light mb-3">{title}</h4>
                <p className="font-sans text-sm text-brand-light/60 font-light leading-relaxed mb-6 flex-grow">
                    {description}
                </p>

                <button className="text-left font-sans text-xs tracking-widest uppercase text-brand-accent hover:text-brand-light transition-colors duration-300 w-fit">
                    View Details
                </button>
            </div>
        </div>
    );
}
