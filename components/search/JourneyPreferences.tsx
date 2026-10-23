'use client';
import Link from 'next/link';
import { Calendar, Users, Wallet } from 'lucide-react';
import { readJourneySelection } from '@/lib/journey-search';
import { dateLabel, travelDays } from '@/lib/travel-dates';
import { convert, formatMoney } from '@/lib/currency/config';
import { useCurrency } from '@/components/currency/CurrencyProvider';
import type { JourneyParams } from '@/lib/destinations';

export default function JourneyPreferences({ params, destinationId, city = false }: { params: JourneyParams; destinationId: string; city?: boolean }) {
    const selection = readJourneySelection(params);
    const { currency, fx } = useCurrency();
    if (!['travelers', 'start', 'end', 'budgetEur', 'interests', 'price'].some(key => typeof params[key] === 'string' && params[key] !== '')) return null;
    const query = new URLSearchParams({ destination: destinationId, travelers: String(selection.travelers) });
    if (selection.start) { query.set('start', selection.start); query.set('end', selection.end); }
    if (selection.budgetEur !== null) query.set('budgetEur', String(selection.budgetEur));
    if (selection.interests.length) query.set('interests', selection.interests.join(','));
    if (selection.price) query.set('price', selection.price);
    return <section aria-label="Your search preferences" className="my-6 rounded-[26px] border border-sky-200 bg-white p-5 text-ink sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-sm font-semibold">Your journey preferences</h2><div className="flex gap-4 text-xs font-semibold text-sky-700"><Link href={`/?${query}#journey-search`} className="underline">Edit search</Link><Link href={`/destinations/${destinationId}`} className="underline">Clear search</Link></div></div>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm"><span className="inline-flex items-center gap-2"><Calendar size={16} />{selection.start ? `${dateLabel(selection.start)} – ${dateLabel(selection.end)} · ${travelDays(selection.start, selection.end)} days` : 'Flexible dates'}</span><span className="inline-flex items-center gap-2"><Users size={16} />{selection.travelers} {selection.travelers === 1 ? 'traveler' : 'travelers'}</span><span className="inline-flex items-center gap-2"><Wallet size={16} />{selection.budgetEur !== null ? `${formatMoney(convert(selection.budgetEur, 'EUR', currency, fx.rates), currency)} group spending budget` : 'No budget set'}</span></div>
        {selection.interests.length > 0 && <p className="mt-3 text-xs capitalize text-ink-500">Interests: {selection.interests.join(' · ')}</p>}
        <p className="mt-4 text-xs leading-relaxed text-ink-500">{city ? 'Starting activity, meal and transport estimates are compared with your group budget, one stop at a time. Shops and stays still need a quote. Use the planner to check the combined cost.' : 'These preferences are kept for the planning tools. Country highlights are not filtered by dates or budget because this guide has no live price or availability feed.'} Dates do not confirm opening hours or availability.</p>
    </section>;
}
