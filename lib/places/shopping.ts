import type { Place } from './types';

export const SHOPPING_CATEGORIES = [
    { id: 'food', label: 'Food & coffee' },
    { id: 'fashion', label: 'Fashion & outlets' },
    { id: 'cosmetics', label: 'Beauty & herbal gifts' },
    { id: 'paper', label: 'Books & stationery' },
    { id: 'markets', label: 'Markets & vintage' },
] as const;

export function matchesShoppingCategory(place: Place, category: string) {
    if (!category) return true;
    if (place.section !== 'shop') return false;
    if (category === 'paper') return ['feltrinelli-argentina', 'fabriano-babuino'].includes(place.id);
    if (category === 'markets') return ['campo-de-fiori-market', 'testaccio-market', 'porta-portese'].includes(place.id);
    return place.giftTags?.some(tag => tag === category) ?? false;
}
