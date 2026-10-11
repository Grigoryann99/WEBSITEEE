import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { checkedOn, type VillaGuide } from '@/data/villasData';

export default function VillaGuideCard({ villa }: { villa: VillaGuide }) {
    return (
        <article className="flex h-full min-w-0 flex-col rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">{villa.setting}</p>
            <h3 className="mt-4 font-serif text-3xl leading-tight text-brand-dark">{villa.name}</h3>
            <p className="mt-3 flex items-start gap-2 text-sm text-slate-600"><MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />{villa.location}</p>
            <p className="mt-6 text-sm leading-relaxed text-slate-700">{villa.description}</p>
            <dl className="my-6 space-y-5 text-sm leading-relaxed">
                <div><dt className="font-semibold text-brand-dark">Who to consider it for</dt><dd className="mt-1 text-slate-600">{villa.goodFor}</dd></div>
                <div><dt className="font-semibold text-brand-dark">Check before booking</dt><dd className="mt-1 text-slate-600">{villa.checkBeforeBooking}</dd></div>
            </dl>
            <div className="mt-auto border-t border-slate-100 pt-5">
                <a href={villa.officialUrl} target="_blank" rel="noopener noreferrer" aria-label={villa.name + ': official accommodation website (opens in a new tab)'} className="inline-flex items-center gap-2 font-semibold text-brand-accent underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Official accommodation website <ArrowUpRight size={16} aria-hidden="true" /></a>
                <p className="mt-3 text-xs leading-relaxed text-slate-500">Source: {villa.sourceName}<br />Checked <time dateTime={checkedOn}>11 October 2026</time></p>
                <Link href={villa.destinationHref} className="mt-4 inline-block text-sm text-brand-dark underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Explore the destination →</Link>
            </div>
        </article>
    );
}
