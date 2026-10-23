import { placeById, orderStops } from '@/lib/places/catalog';

export const giftIdeas = [
    { id: 'cheese', name: 'A small piece of pecorino', category: 'food', min: 8, max: 18, placeIds: ['volpetti', 'antica-caciara'], tip: 'Ask about vacuum packing and your destination’s food import rules.' },
    { id: 'pantry', name: 'Pasta or a pantry gift', category: 'food', min: 5, max: 15, placeIds: ['campo-de-fiori-market', 'volpetti'], tip: 'Compare weight, ingredients and the final price on the label.' },
    { id: 'cosmetics', name: 'Soap or a small herbal gift', category: 'cosmetics', min: 8, max: 20, placeIds: ['ai-monasteri'], tip: 'Confirm the ingredients, size and actual shelf price.' },
    { id: 'souvenir', name: 'A small market souvenir', category: 'souvenir', min: 5, max: 15, placeIds: ['porta-portese', 'campo-de-fiori-market'], tip: 'Check market days and ask where the item was made.' },
    { id: 'deli', name: 'A small deli selection', category: 'food', min: 15, max: 30, placeIds: ['roscioli-salumeria', 'volpetti'], tip: 'Ask for a quote for the whole package before ordering.' },
] as const;

export function suggestGifts(budgetEur: number, category: string, count = 1) {
    if (!Number.isFinite(budgetEur) || budgetEur <= 0 || !Number.isInteger(count) || count < 1) return [];
    return giftIdeas.filter(idea => (category === 'all' || idea.category === category) && idea.max * count <= budgetEur);
}

export function giftStops(ids: string[]) {
    return orderStops(Array.from(new Set(ids)).flatMap(id => placeById.has(id) ? [placeById.get(id)!] : []));
}
