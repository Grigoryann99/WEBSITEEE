'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import fallback from '@/data/fx-fallback.json';
import {
    convert,
    isCurrency,
    isFxPayload,
    ratesAreOld,
    type CurrencyCode,
    type FxPayload,
} from '@/lib/currency/config';

type CurrencyContextValue = {
    currency: CurrencyCode;
    setCurrency: (c: CurrencyCode) => void;
    fx: FxPayload;
    loading: boolean;
    convertFrom: (amount: number, from: CurrencyCode) => number;
};

const STORAGE_KEY = 'velora.currency';

const initialFx: FxPayload = {
    base: 'EUR',
    rates: fallback.rates as Record<CurrencyCode, number>,
    ratesDate: fallback.ratesDate,
    fetchedAt: fallback.ratesDate,
    stale: true,
    source: 'open.er-api.com (ExchangeRate-API)',
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrencyState] = useState<CurrencyCode>('EUR');
    const [fx, setFx] = useState<FxPayload>(initialFx);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (isCurrency(saved)) setCurrencyState(saved);
            const cached: unknown = JSON.parse(localStorage.getItem('velora.fx') || 'null');
            if (isFxPayload(cached)) setFx({ ...cached, stale: true });
        } catch { /* Storage is optional. */ }

        let cancelled = false;
        const controller = new AbortController();
        fetch('/api/fx', { signal: controller.signal })
            .then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
            .then((data: unknown) => {
                if (!isFxPayload(data)) throw new Error('Invalid exchange rates');
                const checked = { ...data, stale: data.stale || ratesAreOld(data.ratesDate) };
                if (!cancelled) setFx(checked);
                try { if (!checked.stale) localStorage.setItem('velora.fx', JSON.stringify(checked)); } catch { /* optional cache */ }
            })
            .catch(() => { /* keep bundled snapshot, already flagged stale */ })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; controller.abort(); };
    }, []);

    const setCurrency = useCallback((c: CurrencyCode) => {
        setCurrencyState(c);
        try { localStorage.setItem(STORAGE_KEY, c); } catch { /* selection still works */ }
        window.dispatchEvent(new CustomEvent('velora:currency', { detail: c }));
    }, []);

    const convertFrom = useCallback(
        (amount: number, from: CurrencyCode) => convert(amount, from, currency, fx.rates),
        [currency, fx.rates],
    );

    const value = useMemo(() => ({ currency, setCurrency, fx, loading, convertFrom }), [currency, setCurrency, fx, loading, convertFrom]);

    return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
    const ctx = useContext(CurrencyContext);
    if (!ctx) throw new Error('useCurrency must be used inside <CurrencyProvider>');
    return ctx;
}
