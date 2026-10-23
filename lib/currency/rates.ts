import 'server-only';
import fallback from '@/data/fx-fallback.json';
import { CURRENCIES, ratesAreOld, type CurrencyCode, type FxPayload } from './config';

const SOURCE = 'open.er-api.com (ExchangeRate-API)';
const REVALIDATE_SECONDS = 60 * 60 * 6;

// Last successful live payload in this server instance — used before the bundled snapshot.
let lastGood: FxPayload | null = null;

function pick(rates: Record<string, number>): Record<CurrencyCode, number> | null {
    const out = {} as Record<CurrencyCode, number>;
    for (const c of CURRENCIES) {
        const v = rates[c];
        if (typeof v !== 'number' || !Number.isFinite(v) || v <= 0) return null;
        out[c] = v;
    }
    return out;
}

export async function getRates(): Promise<FxPayload> {
    try {
        const res = await fetch('https://open.er-api.com/v6/latest/EUR', {
            next: { revalidate: REVALIDATE_SECONDS },
            signal: AbortSignal.timeout(6000),
        });
        if (!res.ok) throw new Error(`FX HTTP ${res.status}`);
        const json = (await res.json()) as { result?: string; base_code?: string; rates?: Record<string, number>; time_last_update_unix?: number };
        if (json.result !== 'success' || json.base_code !== 'EUR' || !json.rates || !Number.isFinite(json.time_last_update_unix)) throw new Error('FX payload invalid');
        const rates = pick(json.rates);
        if (!rates || rates.EUR !== 1) throw new Error('FX payload missing currencies');
        const ratesDate = new Date(json.time_last_update_unix! * 1000).toISOString();
        lastGood = {
            base: 'EUR',
            rates,
            ratesDate,
            fetchedAt: new Date().toISOString(),
            stale: ratesAreOld(ratesDate),
            source: SOURCE,
        };
        return lastGood;
    } catch {
        if (lastGood) return { ...lastGood, stale: true };
        return {
            base: 'EUR',
            rates: fallback.rates as Record<CurrencyCode, number>,
            ratesDate: fallback.ratesDate,
            fetchedAt: fallback.ratesDate,
            stale: true,
            source: SOURCE,
        };
    }
}
