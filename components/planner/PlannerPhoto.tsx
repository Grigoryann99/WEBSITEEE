'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { photoFor } from '@/lib/places/catalog';

const localPhotos: Record<string, string> = {
    colosseum: '/images/attractions/italy-colosseum.jpg',
    pantheon: '/images/planner/pantheon.webp',
    'trevi-fountain': '/images/countries/rome.jpg',
    'vatican-museums': '/images/attractions/italy-vatican-museums-sistine-chapel.optimized.webp',
    'trastevere-walk': '/images/rome-edit/trastevere.optimized.webp',
    'roscioli-salumeria': '/images/rome-edit/roman-pasta.jpg',
};
export default function PlannerPhoto({ id, name }: { id: string; name: string }) {
    const [failed, setFailed] = useState(false);
    const media = photoFor(id);
    const src = media?.src.startsWith('/') ? media.src : localPhotos[id] || media?.src;
    return <span className="relative block h-full w-full overflow-hidden rounded-[18px] bg-[#E5EFF3]">
        {src && !failed ? <Image src={src} alt={media?.alt || (media?.representative ? `Illustrative photograph for ${name}` : name)} fill sizes="(max-width: 640px) 80px, 120px" className="object-cover" onError={() => setFailed(true)} /> : <span className="absolute inset-0 flex items-center justify-center text-[#718C9A]"><ImageIcon aria-hidden="true" size={24} /><span className="sr-only">Photo unavailable</span></span>}
        {media?.representative && src && !failed && <span aria-hidden="true" className="absolute bottom-1 left-1 rounded bg-white/95 px-1 text-[8px] leading-4 text-ink">{media.context === 'area' ? 'Area view' : 'Illustration'}</span>}
    </span>;
}
