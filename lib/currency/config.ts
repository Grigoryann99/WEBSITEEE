export const CURRENCIES = ['USD', 'EUR', 'AMD', 'RUB', 'GBP', 'CHF', 'AED', 'JPY', 'CNY', 'TRY'] as const;
export type CurrencyCode = (typeof CURRENCIES)[number];

export const CURRENCY_META: Record<CurrencyCode, { symbol: string; label: string; decimals: number }> = {
    USD: { symbol: '$', label: 'US Dollar', decimals: 2 },
    EUR: { symbol: '€', label: 'Euro', decimals: 2 },
    AMD: { symbol: '֏', label: 'Armenian Dram', decimals: 0 },
    RUB: { symbol: '₽', label: 'Russian Ruble', decimals: 2 },
    GBP: { symbol: '£', label: 'British Pound', decimals: 2 },
    CHF: { symbol: 'CHF', label: 'Swiss Franc', decimals: 2 },
    AED: { symbol: 'AED', label: 'UAE Dirham', decimals: 2 },
    JPY: { symbol: '¥', label: 'Japanese Yen', decimals: 0 },
    CNY: { symbol: 'CN¥', label: 'Chinese Yuan', decimals: 2 },
    TRY: { symbol: '₺', label: 'Turkish Lira', decimals: 2 },
};

export function isCurrency(value: unknown): value is CurrencyCode {
    return typeof value === 'string' && (CURRENCIES as readonly string[]).includes(value);
}

export type FxPayload = {
    base: 'EUR';
    rates: Record<CurrencyCode, number>;
    /** When the upstream provider last updated the rates (ISO). */
    ratesDate: string;
    /** When our server fetched them (ISO). */
    fetchedAt: string;
    /** True when live refresh failed and we fell back to the last known rates. */
    stale: boolean;
    source: string;
};

/** Convert an amount between two currencies using EUR-based rates. */
export function convert(amount: number, from: CurrencyCode, to: CurrencyCode, rates: Record<CurrencyCode, number>): number {
    if (!Number.isFinite(amount) || !Number.isFinite(rates[from]) || rates[from] <= 0 || !Number.isFinite(rates[to]) || rates[to] <= 0) throw new Error('Invalid currency amount or rate');
    if (from === to) return amount;
    const inEur = amount / rates[from];
    return inEur * rates[to];
}

/** Round to a human-friendly figure so converted ranges don't look falsely precise. */
export function friendlyRound(value: number): number {
    if (Math.abs(value) < 100) return Number(value.toPrecision(4));
    if (value < 1000) return Math.round(value / 5) * 5;
    if (value < 10000) return Math.round(value / 50) * 50;
    return Math.round(value / 500) * 500;
}

export function formatMoney(value: number, currency: CurrencyCode): string {
    const meta = CURRENCY_META[currency];
    const n = new Intl.NumberFormat('en-US', value > 0 && value < 1 ? { maximumSignificantDigits: 3 } : { maximumFractionDigits: meta.decimals }).format(value);
    return meta.symbol.length === 1 ? `${meta.symbol}${n}` : `${n} ${meta.symbol}`;
}

export function isFxPayload(value: unknown): value is FxPayload {
    if (!value || typeof value !== 'object') return false;
    const data = value as FxPayload;
    return data.base === 'EUR' && typeof data.stale === 'boolean' && typeof data.source === 'string'
        && Number.isFinite(Date.parse(data.ratesDate)) && Number.isFinite(Date.parse(data.fetchedAt))
        && CURRENCIES.every(code => typeof data.rates?.[code] === 'number' && Number.isFinite(data.rates[code]) && data.rates[code] > 0)
        && data.rates.EUR === 1;
}

export function ratesAreOld(date: string, now = Date.now()): boolean {
    const stamp = Date.parse(date);
    return !Number.isFinite(stamp) || stamp > now + 300000 || now - stamp > 48 * 60 * 60 * 1000;
}
