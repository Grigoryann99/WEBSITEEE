'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search } from 'lucide-react';
import { destinationFlag } from '@/lib/country-flags';
import { destinationHref, type DestinationOption, type JourneyParams } from '@/lib/destinations';

export default function DestinationChooser({ options, mode, preferences, selectedId }: {
    options: DestinationOption[]; mode: 'plan' | 'concierge'; preferences: JourneyParams; selectedId: string | null;
}) {
    const [query, setQuery] = useState('');
    const selected = options.find(option => option.id === selectedId);
    const results = options.filter(option => `${option.name} ${option.country} ${option.searchTerms}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
    const guideHref = selected ? destinationHref(selected.guideHref, selected.id, preferences) : '';
    return <section className="mx-auto max-w-6xl px-5 pb-20" data-testid="destination-chooser">
        <p className="concierge-eyebrow">Your journey starts with a place</p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">{selected ? `Discover ${selected.name}.` : 'Where will your next story begin?'}</h1>
        <p className="mt-5 max-w-2xl leading-relaxed text-ink-500">Choose your destination to see the guides and planning tools available for your journey.</p>
        {selected && <div className="mt-8 rounded-[30px] border border-sky-200 bg-white p-6 shadow-soft sm:p-8">
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs text-sky-700">Country guide available</span>
            <h2 className="mt-4 font-serif text-3xl">Start exploring {selected.name}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-500">Discover the highlights and travel tips in our {selected.name} guide, or explore ideas with our AI companion. The full day-by-day planner and venue map currently focus on Rome.</p>
            <Link href={guideHref} className="concierge-button concierge-button-primary mt-5">Explore the {selected.name} guide<ArrowRight size={16} /></Link>
            <Link href={destinationHref('/concierge', selected.id, preferences)} className="concierge-button ml-0 mt-3 sm:ml-3">Ask about {selected.name}<ArrowRight size={16} /></Link>
        </div>}
        {selectedId && !selected && <p role="status" className="mt-7 rounded-[22px] border border-sky-200 bg-white p-5 text-sm text-ink-500">This destination is not in our directory. Choose a destination below to continue.</p>}
        <label className="mt-9 flex max-w-xl items-center gap-3 rounded-full border border-sky-200 bg-white px-5 py-3.5"><Search aria-hidden="true" size={19} className="text-sky-700" /><input aria-label="Search destinations" className="min-w-0 flex-1 bg-transparent outline-none" placeholder="Search a country, city or landmark" value={query} onChange={event => setQuery(event.target.value)} /></label>
        <p className="mt-4 text-xs text-ink-500">{results.length} destinations · Each card shows what is available</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map(option => <Link key={option.id} href={destinationHref(`/${mode}`, option.id, preferences)} className="group flex min-w-0 flex-col rounded-[26px] border border-sky-100 bg-white p-5 transition-colors hover:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-600">
                <div className="flex items-center gap-3"><Image src={destinationFlag(option.guideHref)} alt="" width={32} height={24} unoptimized className="h-6 w-8 object-contain" /><h2 className="min-w-0 flex-1 font-serif text-2xl">{option.name}</h2><ArrowRight aria-hidden="true" size={17} className="shrink-0 text-sky-700" /></div>
                <p className="mt-3 text-sm text-ink-500">{option.kind === 'city' ? `${option.country} · City companion` : 'Country guide'}</p>
                <span className={`mt-4 w-fit rounded-full px-3 py-1 text-xs ${option.planning ? 'bg-sky-100 text-sky-800' : 'bg-cream text-ink-500'}`}>{option.planning ? 'Guide · Map · Trip planner' : 'Highlights & travel tips'}</span>
            </Link>)}
        </div>
        {!results.length && <p role="status" className="mt-5 rounded-[22px] bg-white p-6 text-ink-500">No destination found. Try another city or country name.</p>}
    </section>;
}
