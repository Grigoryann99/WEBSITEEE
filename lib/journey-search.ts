import type { JourneyParams } from './destinations';
import { INTERESTS } from './places/types';
import { travelDays } from './travel-dates';

export type SearchDestination = { name: string; route: string; city?: boolean; searchTerms?: string };
export type JourneySelection = { start: string; end: string; travelers: number; budgetEur: number | null; interests: string[]; price: string };

const normalized = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().trim();
export function searchDestinations(destinations: SearchDestination[], query: string) {
    const words = normalized(query).split(/\s+/).filter(Boolean);
    return destinations.filter(item => words.every(word => normalized(`${item.name} ${item.searchTerms || ''}`).includes(word)));
}

/** Validate public URL preferences before displaying them or prefilling controls. */
export function readJourneySelection(params: JourneyParams): JourneySelection {
    const text = (key: string) => typeof params[key] === 'string' ? params[key] as string : '';
    const start = text('start'), end = text('end'), days = travelDays(start, end);
    const people = Number(text('travelers'));
    const amount = text('budgetEur'), budget = Number(amount);
    return {
        start: days && days <= 21 ? start : '', end: days && days <= 21 ? end : '',
        travelers: Number.isInteger(people) && people >= 1 && people <= 20 ? people : 2,
        budgetEur: amount.trim() !== '' && Number.isFinite(budget) && budget >= 0 && budget <= 1000000 ? budget : null,
        interests: text('interests').split(',').filter((value, index, all) => INTERESTS.some(interest => interest === value) && all.indexOf(value) === index),
        price: /^[1-4]$/.test(text('price')) ? text('price') : '',
    };
}

export function journeySearchParams(destination: SearchDestination, selection: JourneySelection) {
    const safe = readJourneySelection({ ...selection, travelers: String(selection.travelers), budgetEur: selection.budgetEur === null ? '' : String(selection.budgetEur), interests: selection.interests.join(',') });
    const params = new URLSearchParams({ destination: destination.route.replace('/destinations/', ''), travelers: String(safe.travelers) });
    if (safe.start && safe.end) { params.set('start', safe.start); params.set('end', safe.end); params.set('days', String(travelDays(safe.start, safe.end))); }
    if (safe.budgetEur !== null) params.set('budgetEur', String(safe.budgetEur));
    if (safe.interests.length) params.set('interests', safe.interests.join(','));
    if (safe.price) params.set('price', safe.price);
    return params;
}
