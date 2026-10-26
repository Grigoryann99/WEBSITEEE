'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ImageIcon } from 'lucide-react';

const destinations = [
    { name: 'Maldives', theme: 'Island escapes', href: '/destinations/maldives', flag: 'mv', image: '/images/attractions/maldives-baros.jpg', alt: 'Overwater villas above a turquoise lagoon in the Maldives', position: '50% 50%' },
    { name: 'Switzerland', theme: 'Alpine adventures', href: '/destinations/switzerland', flag: 'ch', image: '/images/attractions/switzerland-grindelwald.jpg', alt: 'Alpine peaks and wooden chalets in Grindelwald, Switzerland', position: '50% 50%' },
    { name: 'Greece', theme: 'Islands & culture', href: '/destinations/greece', flag: 'gr', image: '/images/attractions/greece-santorini.jpg', alt: 'Blue church domes and the Aegean Sea in Santorini, Greece', position: '70% 50%' },
    { name: 'South Africa', theme: 'Nature & wildlife', href: '/destinations/south-africa', flag: 'za', image: '/images/countries/south-africa-cape-town-coast.webp', alt: 'Cape Town’s Atlantic coastline, mountain slopes and winding coastal road in South Africa', position: '50% 65%' },
    { name: 'Japan', theme: 'Cities & traditions', href: '/destinations/japan', flag: 'jp', image: '/images/inspiration/japan-temples.optimized.webp', alt: 'The Golden Pavilion reflected in a pond in Kyoto, Japan', position: '50% 60%' },
];

export default function DestinationGlobe({ countryCount }: { countryCount: number }) {
    const [failedPhotos, setFailedPhotos] = useState<string[]>([]);
    return (
        <div data-testid="destination-inspiration">
            <div className="mb-8 flex flex-col justify-between gap-6 sm:mb-10 xl:flex-row xl:items-end">
                <div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#52758D]">Global collection</p>
                    <h2 id="global-collection-title" className="max-w-3xl font-serif text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">A world worth exploring.</h2>
                    <p className="mt-4 text-base leading-relaxed text-ink-500">Find the places that feel like you.</p>
                </div>
                <div className="flex flex-wrap items-center gap-5 xl:pb-1">
                    <Link href="/destinations" className="group inline-flex min-h-12 items-center justify-center gap-5 rounded-full border border-sky-200/80 bg-[#DCEFFB] px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600">
                        Browse all destinations <ArrowRight aria-hidden="true" size={18} className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
                    </Link>
                    <span className="border-l border-[#CDDDE5] py-2 pl-5 text-sm text-ink-500">{countryCount} countries</span>
                </div>
            </div>

            <p className="mb-3 text-xs text-ink-500 sm:hidden">Swipe to explore the collection →</p>
            <ul aria-label="Featured countries" data-lenis-prevent className="grid snap-x snap-mandatory auto-cols-[85%] grid-flow-col gap-4 overflow-x-auto rounded-[30px] pb-3 sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-2 sm:overflow-visible sm:pb-0 md:grid-cols-3 lg:grid-cols-5">
                {destinations.map(destination => (
                    <li key={destination.flag} className="min-w-0 snap-start">
                        <Link href={destination.href} className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[30px] border border-[#D7E5EC] bg-[#FFFCF7] shadow-[0_6px_20px_rgba(30,53,70,0.04)] transition-shadow hover:shadow-[0_12px_28px_rgba(30,53,70,0.13)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-sky-600">
                            <div className="relative aspect-[4/5] overflow-hidden bg-[#E6EFF1] lg:aspect-[3/5]">
                                {failedPhotos.includes(destination.flag) ? <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink-500"><ImageIcon aria-hidden="true" size={28} /><span className="text-sm">Discover {destination.name}</span></div> : <Image src={destination.image} alt={destination.alt} fill unoptimized={destination.flag === 'za'} sizes="(min-width: 1536px) 285px, (min-width: 1024px) 20vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 85vw" style={{ objectPosition: destination.position }} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transform-none" onError={() => setFailedPhotos(previous => previous.includes(destination.flag) ? previous : [...previous, destination.flag])} />}
                            </div>
                            <div className="relative -mt-5 grid min-h-[102px] flex-1 grid-cols-[34px_minmax(0,1fr)_28px] items-center gap-2 rounded-t-[28px] border-t border-white/90 bg-[#FFFCF7]/95 px-3 py-5 backdrop-blur-md lg:grid-cols-[34px_minmax(0,1fr)] xl:grid-cols-[36px_minmax(0,1fr)_30px]">
                                <span aria-hidden="true" className="flex h-9 w-[34px] items-center justify-center rounded-xl bg-[#E2F0F8] xl:w-9">
                                    <Image src={`/images/flags/${destination.flag}.svg`} alt="" width={26} height={22} unoptimized className="h-[22px] w-[26px] object-contain drop-shadow-sm" />
                                </span>
                                <div className="min-w-0">
                                    <h3 className="font-serif text-[18px] leading-tight text-ink xl:text-xl">{destination.name}</h3>
                                    <p className="mt-1.5 text-[11px] leading-relaxed text-ink-500 xl:text-xs">{destination.theme}</p>
                                </div>
                                <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DCEFFB] text-ink transition-colors group-hover:bg-sky-200 lg:hidden xl:flex xl:h-[30px] xl:w-[30px]"><ArrowRight size={16} /></span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="mt-8 flex items-center justify-center gap-5 text-center sm:mt-10">
                <span aria-hidden="true" className="hidden h-px max-w-48 flex-1 bg-[#CDDDE5] sm:block" />
                <p className="font-serif text-base italic text-ink-500 sm:text-lg">Somewhere new. Something unforgettable.</p>
                <span aria-hidden="true" className="hidden h-px max-w-48 flex-1 bg-[#CDDDE5] sm:block" />
            </div>
        </div>
    );
}
