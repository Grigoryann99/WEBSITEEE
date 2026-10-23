'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ImageIcon } from 'lucide-react';
import PriceTag from '@/components/currency/PriceTag';

const HIGHLIGHTS = [
    { id: 'colosseum', title: 'The Colosseum', category: 'Ancient Rome', section: 'see', image: '/images/attractions/italy-colosseum.jpg', alt: 'The exterior arches of the Colosseum in Rome', min: 18, max: 24, layout: 'lg:col-span-6 lg:row-span-2', featured: true },
    { id: 'vatican-museums', title: 'Vatican Museums', category: 'Art & history', section: 'see', image: '/images/attractions/italy-vatican-museums-sistine-chapel.optimized.webp', alt: 'The painted ceiling and walls of the Sistine Chapel', min: 20, max: 25, layout: 'lg:col-span-6', featured: false },
    { id: 'roscioli-salumeria', title: 'Roscioli', category: 'Eat & drink', section: 'eat', image: '/images/rome-edit/roman-pasta.jpg', alt: 'An illustrative plate of pasta, not photographed at Roscioli', min: 45, max: 75, layout: 'lg:col-span-3', featured: false },
    { id: 'trastevere-walk', title: 'Trastevere', category: 'Neighbourhood walks', section: 'see', image: '/images/rome-edit/trastevere.optimized.webp', alt: 'The fountain and square of Santa Maria in Trastevere, Rome', min: undefined, max: undefined, layout: 'lg:col-span-3', featured: false },
];

export default function CuratedHighlights() {
    const [failedPhotos, setFailedPhotos] = useState<string[]>([]);
    return (
        <section data-testid="rome-edit" aria-labelledby="rome-edit-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mb-8 flex flex-col justify-between gap-6 sm:mb-10 md:flex-row md:items-end">
                <div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#52758D]">City companion · Rome, Italy</p>
                    <h2 id="rome-edit-title" className="font-serif text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">Rome, your way.</h2>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-500">Ancient wonders, good food and evenings worth wandering.</p>
                </div>
                <Link href="/destinations/italy/rome" className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-5 self-start rounded-full border border-sky-200/80 bg-[#DCEFFB] px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 md:self-auto">
                    Explore Rome <ArrowRight aria-hidden="true" size={18} className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
                </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[310px] lg:grid-cols-12 xl:auto-rows-[330px]">
                {HIGHLIGHTS.map(item => (
                    <Link key={item.id} href={`/destinations/italy/rome?section=${item.section}&place=${item.id}`} className={`group flex min-w-0 flex-col overflow-hidden rounded-[30px] border border-[#D7E5EC] bg-[#FFFCF7] shadow-[0_7px_24px_rgba(30,53,70,0.045)] transition-shadow hover:shadow-[0_12px_32px_rgba(30,53,70,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 ${item.layout}`}>
                        <div className={`relative min-h-[220px] flex-1 overflow-hidden bg-[#E6EFF1] lg:min-h-0 ${item.featured ? 'h-[340px] sm:h-auto sm:min-h-[280px]' : 'h-[230px] sm:h-auto'}`}>
                            {failedPhotos.includes(item.id) ? <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-3 px-6 text-center text-ink-500"><ImageIcon aria-hidden="true" size={28} /><span className="text-sm">Explore {item.title}</span></div> : <Image src={item.image} alt={item.alt} fill sizes={item.featured || item.id === 'vatican-museums' ? '(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw' : '(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw'} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transform-none" onError={() => setFailedPhotos(previous => previous.includes(item.id) ? previous : [...previous, item.id])} />}
                            {item.id === 'roscioli-salumeria' && <span className="absolute bottom-3 left-3 rounded-full bg-cream/95 px-2.5 py-1 text-[10px] text-ink-600">Food inspiration</span>}
                        </div>
                        <div className={`relative flex min-w-0 items-center justify-between gap-3 px-5 py-4 ${item.featured ? 'sm:py-5' : ''}`}>
                            <div className="min-w-0">
                                <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.19em] text-[#52758D]">{item.category}</p>
                                <h3 className={`font-serif leading-tight text-ink ${item.featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>{item.title}</h3>
                                <p className="mt-2 text-xs leading-relaxed text-ink-500">{item.min == null ? 'Free to explore · extras separate' : <><PriceTag min={item.min} max={item.max} currency="EUR" approximate showOriginal={false} /> <span className="whitespace-nowrap">· estimate</span></>}</p>
                            </div>
                            <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-200/80 bg-[#DCEFFB] text-ink transition-colors group-hover:bg-sky-200"><ArrowRight size={18} /></span>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="mt-7 flex items-center justify-center gap-4 text-center">
                <span aria-hidden="true" className="hidden h-px w-12 bg-[#CDDDE5] sm:block" />
                <p className="font-serif text-base italic text-ink-500 sm:text-lg">A little history. A good table. A slower evening.</p>
                <span aria-hidden="true" className="hidden h-px w-12 bg-[#CDDDE5] sm:block" />
            </div>
        </section>
    );
}
