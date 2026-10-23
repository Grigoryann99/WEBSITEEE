'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { photoFor } from '@/lib/places/catalog';
export default function PlacePhoto({ id, name, credit = false }: { id: string; name: string; credit?: boolean }) {
    const media = photoFor(id); const [failed, setFailed] = useState(false);
    return <div className="relative h-full min-h-44 overflow-hidden rounded-[30px] bg-gradient-to-br from-sky-100 via-cream to-sky-200">
        {media && !failed ? <Image src={media.src} alt={media.alt || (media.representative ? `Illustrative scene for ${name}` : name)} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" onError={() => setFailed(true)} className="object-cover" /> : <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-sky-700"><MapPin size={30} /><span className="text-xs">Explore {name}</span></div>}
        {media?.representative && !failed && <span className="absolute top-3 left-3 max-w-[90%] rounded-pill bg-white/95 px-3 py-1 text-[10px] text-ink">{media.context === 'area' ? 'Neighbourhood view · not the venue' : 'Illustrative photograph · not the venue'}</span>}
        {credit && media && !failed && <Link href={`/image-credits#${id}`} target="_blank" rel="noopener noreferrer" className="absolute bottom-3 right-3 rounded-chip bg-white/95 px-3 py-2 text-[10px] text-ink underline">Photo credit & licence</Link>}
    </div>;
}
