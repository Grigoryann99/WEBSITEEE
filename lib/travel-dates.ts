export type TravelDates = { start: string; end: string };
export function dateKey(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function parseTravelDate(value: string): Date | null {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const date = new Date(`${value}T12:00:00Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : null;
}
export function travelDays(start: string, end: string): number | null {
    const first = parseTravelDate(start), last = parseTravelDate(end);
    if (!first || !last || last < first) return null;
    return Math.round((last.getTime() - first.getTime()) / 86400000) + 1;
}
export function dateLabel(value: string, long = false): string {
    const date = parseTravelDate(value);
    return date ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: long ? 'long' : 'short', ...(long ? { year: 'numeric' as const } : {}), timeZone: 'UTC' }).format(date) : '';
}
export function endForDays(start: string, days: number): string | undefined {
    const date = parseTravelDate(start);
    if (!date) return undefined;
    date.setUTCDate(date.getUTCDate() + days - 1);
    return date.toISOString().slice(0, 10);
}
