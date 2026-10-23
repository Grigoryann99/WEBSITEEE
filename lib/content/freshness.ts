import type { CatalogEntry, CatalogSnapshot, ReviewField } from './schema';

export function nextReviewDate(checkedOn: string | null, intervalDays: number): string | null {
    if (!checkedOn) return null;
    const date = new Date(`${checkedOn}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() + intervalDays);
    return date.toISOString().slice(0, 10);
}
export function fieldReview(entry: CatalogEntry, field: ReviewField, policy: CatalogSnapshot['reviewPolicy'], today: string) {
    const check = entry.checks[field];
    const dueOn = nextReviewDate(check.checkedOn, policy[field]);
    return { field, checkedOn: check.checkedOn, sourceUrl: check.sourceUrl, dueOn,
        status: !check.checkedOn ? 'unverified' as const : dueOn! <= today ? 'due' as const : 'current' as const };
}
export function reviewQueue(snapshot: CatalogSnapshot, today: string) {
    return snapshot.entries.flatMap(entry => (Object.keys(entry.checks) as ReviewField[])
        .filter(field => field !== 'hours' || Boolean(entry.place.hours))
        .map(field => ({ destinationId: snapshot.destination.id, placeId: entry.place.id, name: entry.place.name,
            ...fieldReview(entry, field, snapshot.reviewPolicy, today) })))
        .filter(task => task.status !== 'current')
        .sort((a, b) => (a.dueOn || '').localeCompare(b.dueOn || '') || a.placeId.localeCompare(b.placeId) || a.field.localeCompare(b.field));
}
