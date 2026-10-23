import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronDown, MapPin } from 'lucide-react';
import { checkedOn, type VillaGuide } from '@/data/villasData';

export default function VillaGuideCard({ villa }: { villa: VillaGuide }) {
    return (
        <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[30px] border border-sky-100 bg-white shadow-soft">
            <figure>
                <div className="relative aspect-[4/3] overflow-hidden bg-sky-100">
                    <Image src={villa.media.src} alt={villa.media.alt} fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.035]" />
                    <span className="absolute left-4 top-4 max-w-[calc(100%-32px)] rounded-pill border border-white/70 bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink">{villa.setting}</span>
                    <span className="absolute bottom-3 left-4 rounded-pill bg-ink/80 px-3 py-1.5 text-[10px] font-medium text-white">{villa.media.label}</span>
                </div>
                <figcaption className="px-5 pt-3 text-[10px] leading-relaxed text-ink-500 sm:px-6">{villa.media.caption}</figcaption>
            </figure>
            <div className="flex flex-1 flex-col p-5 pt-4 sm:p-6 sm:pt-4">
                <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-500"><MapPin size={14} className="mt-0.5 shrink-0 text-sky-700" aria-hidden="true" />{villa.location}</p>
                <h2 className="mt-3 font-serif text-[28px] leading-tight tracking-tight text-ink">{villa.name}</h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-500">{villa.description}</p>
                <details className="mt-5 border-y border-sky-100">
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 py-3 text-sm font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 [&::-webkit-details-marker]:hidden">Before you choose<ChevronDown size={16} className="shrink-0 text-sky-700" aria-hidden="true" /></summary>
                    <dl className="space-y-4 pb-5 text-sm leading-relaxed">
                        <div><dt className="font-medium text-ink">Who to consider it for</dt><dd className="mt-1 text-ink-500">{villa.goodFor}</dd></div>
                        <div><dt className="font-medium text-ink">Check before booking</dt><dd className="mt-1 text-ink-500">{villa.checkBeforeBooking}</dd></div>
                    </dl>
                </details>
                <div className="mt-auto pt-5">
                    <a href={villa.officialUrl} target="_blank" rel="noopener noreferrer" aria-label={`${villa.name}: official accommodation website (opens in a new tab)`} className="concierge-button concierge-button-primary w-full !justify-between !px-5">Official website<ArrowUpRight size={17} aria-hidden="true" /></a>
                    <Link href={villa.destinationHref} className="mt-3 flex min-h-11 items-center justify-between gap-3 rounded-xl px-1 text-sm font-medium text-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Explore the destination<ArrowRight size={16} aria-hidden="true" /></Link>
                    <p className="mt-4 border-t border-sky-100 pt-4 text-[10px] leading-relaxed text-ink-500">Source: {villa.sourceName}<br />Checked <time dateTime={checkedOn}>11 October 2026</time> · Confirm current rates with the operator.</p>
                </div>
            </div>
        </article>
    );
}
