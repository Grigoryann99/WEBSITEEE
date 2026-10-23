'use client';
import { useEffect, useRef, useState, useTransition } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Search, Users, Wallet, ArrowRight, Check, ChevronDown } from 'lucide-react';
import { destinationFlag } from '@/lib/country-flags';
import Dialog from '@/components/ui/Dialog';
import styles from './JourneySearch.module.css';
import TravelCalendar from './TravelCalendar';
import { BudgetDialog, TravelersDialog } from './JourneyFields';
import { dateLabel, dateKey, type TravelDates } from '@/lib/travel-dates';
import { convert, formatMoney } from '@/lib/currency/config';
import { useCurrency } from '@/components/currency/CurrencyProvider';
import { journeySearchParams, readJourneySelection, searchDestinations, type SearchDestination } from '@/lib/journey-search';
export type { SearchDestination } from '@/lib/journey-search';

export default function JourneySearch({ destinations, interests, suggestedDestination }: { destinations: SearchDestination[]; interests: string[]; suggestedDestination?: SearchDestination | null }) {
    const router = useRouter();
    const { currency, fx } = useCurrency();
    const [destination, setDestination] = useState<SearchDestination | null>(null);
    const [picker, setPicker] = useState<'destination' | 'dates' | 'travelers' | 'budget' | null>(null);
    const [query, setQuery] = useState('');
    const [dates, setDates] = useState<TravelDates>({ start: '', end: '' });
    const [travelers, setTravelers] = useState(2), [budgetEur, setBudgetEur] = useState<number | null>(null);
    const [restoredInterests, setRestoredInterests] = useState<string[] | null>(null), [restoredPrice, setRestoredPrice] = useState('');
    const previousInterests = useRef(interests.join(','));
    const [error, setError] = useState('');
    const [ready, setReady] = useState(false);
    const [navigating, startTransition] = useTransition();
    useEffect(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const values: Record<string, string> = {};
            params.forEach((value, key) => { values[key] = value; });
            const restored = readJourneySelection(values);
            const id = params.get('destination');
            setDestination(destinations.find(item => item.route === `/destinations/${id}`) || null);
            if (restored.start >= dateKey(new Date())) setDates({ start: restored.start, end: restored.end });
            setTravelers(restored.travelers); setBudgetEur(restored.budgetEur);
            if (params.has('interests')) setRestoredInterests(restored.interests);
            setRestoredPrice(restored.price);
        } catch {
            // Restoring optional URL preferences must not leave every control disabled.
            setError('Your previous search could not be restored. Please choose your preferences again.');
        } finally { setReady(true); }
    }, [destinations]);
    useEffect(() => {
        if (previousInterests.current === interests.join(',')) return;
        previousInterests.current = interests.join(',');
        setRestoredInterests(null); setRestoredPrice('');
    }, [interests]);
    useEffect(() => { if (suggestedDestination) { setDestination(suggestedDestination); setError(''); } }, [suggestedDestination]);
    const results = searchDestinations(destinations, query);
    const field = 'flex min-h-16 w-full min-w-0 items-center gap-3 rounded-[22px] px-4 py-3 text-left transition-colors hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-sky-600';
    const open = (value: typeof picker) => { setError(''); setPicker(value); if (value === 'destination') setQuery(''); };
    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!destination) { setError('Choose a city or country to start exploring.'); open('destination'); return; }
        if (dates.start && dates.start < dateKey(new Date())) { setError('Your departure date has passed. Choose new dates or use flexible dates.'); setPicker('dates'); return; }
        const keys: Record<string, string[]> = { 'Art & Culture': ['art', 'history'], 'Local Cuisine': ['food'], 'Hidden Gems': ['local'], Romantic: ['romance'], 'Relaxed Stroll': ['relaxed'] };
        const selected = restoredInterests ?? Array.from(new Set(interests.flatMap(interest => keys[interest] || [])));
        const params = journeySearchParams(destination, { ...dates, travelers, budgetEur, interests: selected, price: interests.includes('Budget-Friendly') ? '1' : restoredPrice });
        // Keep the original selection when returning from a guide or using Edit search.
        window.history.replaceState(null, '', `/?${params}#journey-search`);
        startTransition(() => router.push(`${destination.route}?${params}${destination.city ? '#rome-explorer' : '#journey-results'}`));
    };
    const budgetLabel = budgetEur === null ? 'Optional' : formatMoney(convert(budgetEur, 'EUR', currency, fx.rates), currency);
    return <div id="journey-search" className="scroll-mt-28">
        <div className="mx-auto w-full max-w-5xl rounded-[32px] border border-white/80 bg-white/95 p-2.5 text-ink shadow-[0_20px_50px_rgba(15,27,45,0.22)] backdrop-blur-xl sm:p-3 lg:rounded-pill">
            <form aria-label="Find your journey" aria-busy={!ready || navigating} onSubmit={submit}><fieldset disabled={!ready || navigating} className="min-w-0"><div className={styles.fields}>
                <button type="button" className={`${field} ${styles.destination}`} aria-label={destination ? `Destination: ${destination.name}` : 'Choose destination'} aria-haspopup="dialog" aria-expanded={picker === 'destination'} onClick={() => open('destination')}><MapPin size={18} className="shrink-0 text-sky-600" /><span className="min-w-0 flex-1"><span className="block text-[10px] font-bold uppercase tracking-wider text-ink-400">Where to?</span><span className="block truncate text-sm font-semibold" title={destination?.name}>{destination?.name || 'Choose destination'}</span></span><ChevronDown size={14} className="shrink-0 text-ink-400" /></button>
                <button type="button" className={`${field} ${styles.dates}`} aria-label={dates.start ? `Travel dates: ${dateLabel(dates.start)} – ${dateLabel(dates.end)}` : 'Add travel dates'} aria-haspopup="dialog" aria-expanded={picker === 'dates'} onClick={() => open('dates')}><Calendar size={18} className="shrink-0 text-sky-600" /><span className="min-w-0 flex-1"><span className="block text-[10px] font-bold uppercase tracking-wider text-ink-400">When?</span><span className={`block truncate text-sm font-semibold ${dates.start ? '' : 'text-ink-400'}`} title={dates.start ? `${dateLabel(dates.start, true)} – ${dateLabel(dates.end, true)}` : undefined}>{dates.start ? `${dateLabel(dates.start)} – ${dateLabel(dates.end)}` : 'Add dates'}</span></span></button>
                <button type="button" className={field} aria-label={`Travelers: ${travelers}`} aria-haspopup="dialog" aria-expanded={picker === 'travelers'} onClick={() => open('travelers')}><Users size={18} className="shrink-0 text-sky-600" /><span className="min-w-0 flex-1"><span className="block text-[10px] font-bold uppercase tracking-wider text-ink-400">Travelers</span><span className="block truncate text-sm font-semibold">{travelers} {travelers === 1 ? 'traveler' : 'travelers'}</span></span><ChevronDown size={14} className="shrink-0 text-ink-400" /></button>
                <button type="button" className={field} aria-label={`Group budget: ${budgetLabel}`} aria-haspopup="dialog" aria-expanded={picker === 'budget'} onClick={() => open('budget')}><Wallet size={18} className="shrink-0 text-sky-600" /><span className="min-w-0 flex-1"><span className="block text-[10px] font-bold uppercase tracking-wider text-ink-400">Budget ({currency})</span><span className={`block truncate text-sm font-semibold ${budgetEur === null ? 'text-ink-400' : ''}`} title={budgetLabel}>{budgetLabel}</span></span></button>
                <button type="submit" aria-label={ready ? 'Start Exploring' : 'Loading search'} className={styles.submit + " flex min-h-14 items-center justify-center gap-2 self-center rounded-pill bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-ink-700 disabled:cursor-wait disabled:opacity-60 sm:col-span-2 lg:col-span-1"}><Search size={17} />{!ready ? 'Loading…' : navigating ? 'Exploring…' : 'Explore'}</button>
            </div></fieldset></form>
        </div>
        {error && <p role="alert" className="mx-auto mt-3 max-w-xl rounded-2xl bg-white px-4 py-3 text-sm text-ink">{error}</p>}
        {picker === 'dates' && <TravelCalendar value={dates} onChange={setDates} onClose={() => setPicker(null)} />}
        {picker === 'travelers' && <TravelersDialog value={travelers} onChange={setTravelers} onClose={() => setPicker(null)} />}
        {picker === 'budget' && <BudgetDialog value={budgetEur} onChange={setBudgetEur} onClose={() => setPicker(null)} />}
        {picker === 'destination' && <Dialog title="Where would you like to go?" onClose={() => setPicker(null)}>
            <form onSubmit={event => { event.preventDefault(); if (results.length === 1) { setDestination(results[0]); setPicker(null); setError(''); } }}>
                <label className="mb-4 flex items-center gap-3 rounded-pill border border-sky-200 bg-white px-4"><Search size={18} className="text-sky-600" /><input data-dialog-autofocus value={query} onChange={event => setQuery(event.target.value)} placeholder="Search Paris, Japan, Rome…" aria-label="Search destinations" className="min-w-0 flex-1 bg-transparent py-3 outline-none" /></label>
                <p aria-live="polite" className="mb-3 text-xs text-ink-500">{query ? `${results.length} matching guides` : 'Choose a city companion or country guide. Search also finds cities inside country guides.'}</p>
                <div className="max-h-[45dvh] space-y-2 overflow-auto overscroll-contain pr-1">{results.map(item => <button key={item.route} type="button" className="flex w-full items-center gap-3 rounded-[22px] border border-sky-100 bg-white p-4 text-left hover:bg-sky-50 focus-visible:ring-2 focus-visible:ring-sky-600" onClick={() => { setDestination(item); setPicker(null); setError(''); }}><span aria-hidden="true" className="flex h-9 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50"><Image src={destinationFlag(item.route)} alt="" width={28} height={22} unoptimized className="h-[22px] w-7 object-contain" /></span><span className="min-w-0 flex-1"><span className="block text-sm font-medium">{item.name}</span><span className="mt-1 block text-xs text-ink-500">{item.city ? 'City guide · map · trip planner' : 'Country guide · highlights & travel tips'}</span></span>{item.route === destination?.route ? <Check size={17} /> : <ArrowRight size={17} />}</button>)}{!results.length && <p className="rounded-[22px] bg-white p-5 text-sm text-ink-500">No matching guide yet. Try another city or country.</p>}</div>
            </form>
        </Dialog>}
    </div>;
}
