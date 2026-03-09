'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CountryHeroImageProps {
    src: string;
    countryName: string;
}

export default function CountryHeroImage({ src, countryName }: CountryHeroImageProps) {
    const seedSlug = encodeURIComponent(countryName.toLowerCase().replace(/\s+/g, '-'));

    const fallbackSources = [
        src,
        `https://picsum.photos/seed/${seedSlug}-landscape/1600/900`,
        `https://picsum.photos/seed/${seedSlug}/1600/900`,
    ];

    const [index, setIndex] = useState(0);

    const handleError = () => {
        if (index < fallbackSources.length - 1) {
            setIndex(prev => prev + 1);
        }
    };

    return (
        <Image
            src={fallbackSources[index]}
            alt={`Explore ${countryName}`}
            fill
            className="object-cover opacity-60"
            priority
            onError={handleError}
        />
    );
}
