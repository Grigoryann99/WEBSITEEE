import { z } from 'zod';
import { placeById } from '@/lib/places/catalog';
import { travelDays } from '@/lib/travel-dates';
import { INTERESTS } from '@/lib/places/types';

export const itemSchema = z.object({
    id: z.string().uuid(),
    placeId: z.string().refine(id => placeById.has(id), 'Unknown place'),
    day: z.number().int().min(1).max(21),
    quantity: z.number().int().min(1).max(100),
    quote: z.number().finite().min(0).max(1000000).nullable(),
    billing: z.enum(['person', 'group', 'room-night', 'bed-night', 'unconfirmed']),
});
export type PlanItem = z.infer<typeof itemSchema>;
export const planSchema = z.object({
    // Old saved Rome plans predate destination identity; keep them readable.
    destinationId: z.literal('italy/rome').optional(),
    title: z.string().trim().min(1).max(120),
    days: z.number().int().min(1).max(21),
    travelers: z.number().int().min(1).max(20),
    budget: z.number().finite().min(0).max(1000000),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    interests: z.array(z.enum(INTERESTS)).max(10).optional(),
    items: z.array(itemSchema).max(100),
}).strict().superRefine((plan, ctx) => {
    if ((plan.startDate || plan.endDate) && travelDays(plan.startDate || '', plan.endDate || '') !== plan.days) ctx.addIssue({ code: 'custom', message: 'Check the journey dates and day count' });
    if (new Set(plan.items.map(item => item.id)).size !== plan.items.length) ctx.addIssue({ code: 'custom', message: 'Duplicate plan item' });
    if (plan.items.some(item => item.day > plan.days)) ctx.addIssue({ code: 'custom', message: 'A stop is outside the trip dates' });
    if (plan.items.some(item => item.billing === 'unconfirmed' && item.quote !== null)) ctx.addIssue({ code: 'custom', message: 'Choose a quote basis' });
});
export type TripPlan = z.infer<typeof planSchema>;
export const emptyPlan: TripPlan = { destinationId: 'italy/rome', title: 'My Rome journey', days: 3, travelers: 2, budget: 0, items: [] };

export function makePlanItem(placeId: string, day = 1): PlanItem {
    const place = placeById.get(placeId);
    if (!place) throw new Error('Unknown place');
    const billing = place.section === 'stay' || place.section === 'shop' ? 'unconfirmed' : place.price.unit === 'per car' ? 'group' : 'person';
    return { id: crypto.randomUUID(), placeId, day, quantity: 1, quote: null, billing };
}

/** Combined attraction access is charged once per traveller for the same day. */
export function calculatePlan(plan: TripPlan) {
    let min = 0, max = 0, missing = 0;
    const covered = new Set<string>();
    const details = plan.items.map(item => {
        const place = placeById.get(item.placeId);
        if (!place || item.billing === 'unconfirmed' || ((place.section === 'stay' || place.section === 'shop') && item.quote === null)) { missing++; return { id: item.id, min: 0, max: 0, missing: true, included: false }; }
        const estimatedBasis = place.price.unit === 'per car' ? 'group' : 'person';
        if (item.quote === null && item.billing !== estimatedBasis) { missing++; return { id: item.id, min: 0, max: 0, missing: true, included: false }; }
        const combined = ['colosseum', 'roman-forum'].includes(item.placeId) && item.quote === null && item.billing === 'person';
        const ticketKey = `${item.day}:colosseum-forum:${item.quantity}`;
        if (combined && covered.has(ticketKey)) return { id: item.id, min: 0, max: 0, missing: false, included: true };
        if (combined) covered.add(ticketKey);
        const low = item.quote ?? place.price.min;
        const high = item.quote ?? place.price.max ?? place.price.min;
        if (low == null || high == null) { missing++; return { id: item.id, min: 0, max: 0, missing: true, included: false }; }
        const multiplier = item.quantity * (item.billing === 'person' || item.billing === 'bed-night' ? plan.travelers : 1);
        const lineMin = low * multiplier, lineMax = high * multiplier;
        min += lineMin; max += lineMax;
        return { id: item.id, min: lineMin, max: lineMax, missing: false, included: false };
    });
    return { min, max, missing, details, overBudget: plan.budget > 0 && max > plan.budget };
}
