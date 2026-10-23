import { contentForPlace, romeCatalogPlaces as romePlaces } from '@/lib/content/repository';
import type { Place, PlaceMedia } from './types';

export { romePlaces };
export const placeById = new Map(romePlaces.map(place => [place.id, place]));
/** Unknown destinations have no catalog; never substitute Rome for them. */
export function catalogForDestination(destinationId: string): readonly Place[] {
    return destinationId === 'italy/rome' ? romePlaces : [];
}

export function photoFor(placeId: string): PlaceMedia | null {
    const image = contentForPlace(placeId)?.media;
    if (!image || /coat.of.arms|logo_|\.svg/i.test(image.src)) return null;
    return image;
}

export function fitsSpendingBudget(place: Place, budgetEur: number | null | undefined, travelers = 2) {
    if (budgetEur == null || !Number.isFinite(budgetEur) || budgetEur < 0 || place.section === 'shop' || place.section === 'stay' || place.price.currency !== 'EUR') return true;
    if (place.price.free || place.price.min == null) return true;
    const people = Number.isInteger(travelers) && travelers >= 1 && travelers <= 20 ? travelers : 2;
    return place.price.min * (place.price.unit === 'per car' ? 1 : people) <= budgetEur;
}

export function filterPlaces(places: Place[], filters: { section?: string; query?: string; district?: string; price?: string; interest?: string; budgetEur?: number | null; travelers?: number }) {
    const query = (filters.query || '').trim().toLocaleLowerCase();
    return places.filter(place => (!filters.section || filters.section === 'all' || place.section === filters.section)
        && (!filters.district || place.district === filters.district)
        && (!filters.price || place.priceLevel <= Number(filters.price))
        && (!filters.interest || place.interests.some(interest => interest === filters.interest))
        && fitsSpendingBudget(place, filters.budgetEur, filters.travelers)
        && (!query || `${place.name} ${place.summary} ${place.subcategory} ${place.district} ${place.address || ''} ${(place.giftTags || []).join(' ')}`.toLocaleLowerCase().includes(query)));
}

export function distanceKm(a: readonly number[], b: readonly number[]): number {
    const rad = (degrees: number) => degrees * Math.PI / 180;
    const value = Math.sin(rad(b[0] - a[0]) / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(rad(b[1] - a[1]) / 2) ** 2;
    return 6371 * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}

export function orderStops(places: Place[]): Place[] {
    if (!places.length) return [];
    const remaining = places.slice(1);
    const ordered = [places[0]];
    while (remaining.length) {
        remaining.sort((a, b) => distanceKm(ordered[ordered.length - 1].coords, a.coords) - distanceKm(ordered[ordered.length - 1].coords, b.coords));
        ordered.push(remaining.shift()!);
    }
    return ordered;
}
