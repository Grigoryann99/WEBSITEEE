import { z } from 'zod';
import { placeById, distanceKm } from '@/lib/places/catalog';
export const conciergeRequestSchema = z.object({ destinationId: z.literal('italy/rome'), message: z.string().trim().min(10).max(2000), days: z.number().int().min(1).max(7), travelers: z.number().int().min(1).max(20), budgetEur: z.number().finite().min(0).max(1000000) }).strict();
export const conciergeResultSchema = z.object({ days: z.array(z.object({ day: z.number().int().min(1).max(7), items: z.array(z.string().refine(id => placeById.has(id), 'Unknown place')).min(1).max(6) })).min(1).max(7) });
export function validateConciergeResult(value: unknown, days: number) {
    const result = conciergeResultSchema.parse(value);
    if (result.days.length !== days || result.days.some((day, i) => day.day !== i + 1)) throw new Error('Unexpected day count');
    const seen = new Set<string>();
    result.days.forEach(day => {
        if (new Set(day.items).size !== day.items.length) throw new Error('Duplicate stop');
        let minutes = 0;
        day.items.forEach((id, index) => {
            const place = placeById.get(id)!;
            if (place.section === 'stay') throw new Error('Accommodation needs a separate quote');
            if (place.section === 'see' && seen.has(id)) throw new Error('Repeated attraction');
            seen.add(id); minutes += place.duration || (place.section === 'eat' ? 75 : 45);
            if (index) minutes += distanceKm(placeById.get(day.items[index - 1])!.coords, place.coords) / 3 * 60;
        });
        if (minutes > 600) throw new Error('Day is too crowded');
    });
    return result;
}
