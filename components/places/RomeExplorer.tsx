'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Map as MapIcon, Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { filterPlaces, romePlaces } from '@/lib/places/catalog';
import { INTERESTS, SECTION_META, type Section } from '@/lib/places/types';
import PriceTag from '@/components/currency/PriceTag';

import { fadeUp, useMotionLevel } from '@/lib/motion';
import CityMap from './CityMap';
import PlacePhoto from './PlacePhoto';
import PlaceDetails from './PlaceDetails';
import { matchesShoppingCategory, SHOPPING_CATEGORIES } from '@/lib/places/shopping';
import { readJourneySelection } from '@/lib/journey-search';
import JourneyPreferences from '@/components/search/JourneyPreferences';

export default function RomeExplorer({ shoppingOnly = false }: { shoppingOnly?: boolean }) {
    const params = useSearchParams(), router = useRouter(), path = usePathname();
    const [details, setDetails] = useState<string | null>(null), [mapVisible, setMapVisible] = useState(false);
    const level = useMotionLevel();
    const mapSelection = useRef<string | null>(null);
    const selectedId = params.get('place');
    useEffect(() => {
        if (selectedId !== mapSelection.current) setDetails(romePlaces.some(place => place.id === selectedId) ? selectedId : null);
        mapSelection.current = null;
    }, [selectedId]);
    const section = shoppingOnly ? 'shop' : params.get('section') || 'all';
    const shopType = section === 'shop' ? params.get('shopType') || '' : '';
    const query = params.get('q') || '', district = params.get('district') || '', price = params.get('price') || '', interest = params.get('interest') || '';
    const preferredInterests = params.get('interests') || '';
    const preferences = readJourneySelection(Object.fromEntries(params));
    const budgetEur = preferences.budgetEur, travelers = preferences.travelers;
    const visible = useMemo(() => filterPlaces(romePlaces, { section, query, district, price, interest, budgetEur, travelers }).filter(place => matchesShoppingCategory(place, shopType) && (!preferredInterests || preferredInterests.split(',').some(value => place.interests.some(item => item === value)))), [section, query, district, price, interest, preferredInterests, shopType, budgetEur, travelers]);
    const planQuery = new URLSearchParams({ destination: 'italy/rome' });
    for (const key of ['start', 'end', 'days', 'travelers', 'budgetEur', 'interests', 'place']) { const value = params.get(key); if (value) planQuery.set(key, value); }
    const districts = Array.from(new Set(romePlaces.filter(place => !shoppingOnly || place.section === 'shop').map(place => place.district))).sort();
    const update = (key: string, value: string) => {
        const next = new URLSearchParams(params.toString());
        if (value) next.set(key, value); else next.delete(key);
        if (key !== 'place') next.delete('place');
        if (key === 'interest') next.delete('interests');
        router.replace(`${path}${next.size ? `?${next}` : ''}`, { scroll: false });
    };
    const current = romePlaces.find(place => place.id === details);
    const clearFilters = () => {
        const next = new URLSearchParams(params.toString());
        for (const key of ['section', 'q', 'district', 'price', 'interest', 'interests', 'place', 'shopType', 'budgetEur']) next.delete(key);
        router.replace(`${path}${next.size ? `?${next}` : ''}`, { scroll: false });
    };
    return <>
        <section className="mx-auto max-w-[1440px] px-5 py-9 sm:px-8" id="rome-explorer">
            <JourneyPreferences params={Object.fromEntries(params)} destinationId="italy/rome" city />
            <div className="mb-7 flex flex-wrap items-end justify-between gap-5"><div><p className="concierge-eyebrow">{shoppingOnly ? 'Find something worth bringing home' : 'A city, at your pace'}</p><h2 className="mt-2 font-serif text-3xl sm:text-4xl">{shoppingOnly ? 'Your shopping shortlist.' : 'Make room for Rome.'}</h2></div><Link href={`/plan?${planQuery}`} className="concierge-button">Build your days<ArrowRight size={16} /></Link></div>
            {!shoppingOnly && <div className="flex flex-wrap gap-2" aria-label="Place categories">{(['all', ...Object.keys(SECTION_META)] as const).map(key => <button key={key} type="button" aria-pressed={section === key} onClick={() => update('section', key === 'all' ? '' : key)} className={`concierge-tab ${section === key ? 'concierge-tab-active' : ''}`}>{key === 'all' ? 'All places' : SECTION_META[key as Section].label}</button>)}</div>}
            {section === 'shop' && <div className="mt-4 flex flex-wrap gap-2" aria-label="Shopping categories">{[{ id: '', label: 'All shops' }, ...SHOPPING_CATEGORIES].map(category => <button key={category.id} type="button" aria-pressed={shopType === category.id} className={`concierge-tab ${shopType === category.id ? 'concierge-tab-active' : ''}`} onClick={() => update('shopType', category.id)}>{category.label}</button>)}</div>}
            <div className="my-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <form className="flex min-w-0 items-center gap-2 rounded-pill border border-sky-200 bg-white px-4" onSubmit={event => { event.preventDefault(); update('q', String(new FormData(event.currentTarget).get('q') || '')); }}><Search size={17} className="shrink-0 text-sky-700" /><input key={params.get('q')} name="q" defaultValue={params.get('q') || ''} placeholder="A place, a dish, a neighbourhood" aria-label="Search Rome places" className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none" /><button className="text-sky-700" aria-label="Search" type="submit"><ArrowRight size={16} /></button></form>
                <select aria-label="Neighbourhood" value={params.get('district') || ''} onChange={event => update('district', event.target.value)} className="concierge-input"><option value="">Every neighbourhood</option>{districts.map(district => <option key={district}>{district}</option>)}</select>
                <select aria-label="Price level" value={params.get('price') || ''} onChange={event => update('price', event.target.value)} className="concierge-input"><option value="">Any price level</option>{[1, 2, 3, 4].map(value => <option value={value} key={value}>Up to {'€'.repeat(value)}</option>)}</select>
                <select aria-label="Interest" value={params.get('interest') || ''} onChange={event => update('interest', event.target.value)} className="concierge-input"><option value="">Every kind of day</option>{INTERESTS.map(interest => <option key={interest} value={interest}>{interest.charAt(0).toUpperCase() + interest.slice(1)}</option>)}</select>
            </div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-500"><p aria-live="polite">{visible.length} places · prices are planning estimates</p><button className="underline" onClick={clearFilters}>Clear filters</button></div>
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.82fr)]">
                <div className={`${mapVisible ? 'hidden lg:grid' : 'grid'} gap-5 sm:grid-cols-2`}>
                    {visible.map(place => <motion.article key={place.id} variants={fadeUp(level)} initial="hidden" whileInView="show" viewport={{ once: true }} className={`overflow-hidden rounded-card border bg-white p-3 shadow-soft ${selectedId === place.id ? 'border-sky-600 ring-2 ring-sky-200' : 'border-sky-100'}`}>
                        <button className="block h-44 w-full overflow-hidden rounded-card text-left" aria-label={`View ${place.name}`} onClick={() => { update('place', place.id); setDetails(place.id); }}><PlacePhoto id={place.id} name={place.name} /></button>
                        <div className="p-3"><p className="text-[10px] font-semibold uppercase tracking-wider text-sky-700">{place.subcategory} · {place.district}</p><h3 className="mt-3 font-serif text-xl leading-snug">{place.name}</h3><p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-500">{place.summary}</p><p className="mt-4 text-sm font-medium"><PriceTag {...place.price} approximate={place.price.status !== 'verified'} /></p><p className="mt-1 text-xs text-ink-500">{place.price.unit}</p>
                        <div className="mt-5 flex items-center justify-between gap-2"><button className="rounded-pill px-1 py-2 text-sm font-semibold text-sky-700" onClick={() => { update('place', place.id); setDetails(place.id); }}>Explore place →</button><button className="concierge-icon-button" aria-label={`Locate ${place.name}`} onClick={() => { mapSelection.current = place.id; update('place', place.id); setMapVisible(true); }}><MapIcon size={17} /></button></div></div>
                    </motion.article>)}
                    {!visible.length && <div className="rounded-card border border-sky-200 bg-white p-8 sm:col-span-2"><h3 className="font-serif text-2xl">A little more room to explore.</h3><p className="mt-3 text-sm text-ink-500">Try another neighbourhood or clear a filter to find more places.</p></div>}
                </div>
                <aside className={`${mapVisible ? 'block' : 'hidden'} sticky top-24 h-[65dvh] min-h-[360px] lg:block`}><CityMap places={visible} selectedId={selectedId} onSelect={id => { update('place', id); setDetails(id); }} /><p className="mt-3 px-2 text-xs text-ink-500">Select a pin to explore. Location markers do not show a walking route.</p></aside>
            </div>
            <p className="mt-9 text-xs leading-relaxed text-ink-400">Currency values and prices are planning estimates. Prices and hours should be confirmed with the linked venue.</p>
        </section>
        <button className="fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-pill bg-ink px-6 py-3 text-sm text-white shadow-lift lg:hidden" onClick={() => setMapVisible(!mapVisible)}>{mapVisible ? <X size={16} /> : <MapIcon size={16} />}{mapVisible ? 'Show places' : 'Show map'}</button>
        {current && <PlaceDetails key={current.id} place={current} onClose={() => { setDetails(null); update('place', ''); }} />}
    </>;
}
