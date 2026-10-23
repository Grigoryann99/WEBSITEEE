'use client';

import { formatMoney, type CurrencyCode } from '@/lib/currency/config';
import { useCurrency } from './CurrencyProvider';

type Props = {
    min?: number;
    max?: number;
    currency: CurrencyCode;
    approximate?: boolean;
    free?: boolean;
    className?: string;
    showOriginal?: boolean;
};

/**
 * Shows a price converted into the user's selected currency.
 * The original local price stays available (tooltip + optional inline line).
 */
export default function PriceTag({ min, max, currency, approximate, free, className = '', showOriginal = true }: Props) {
    const { currency: target, convertFrom } = useCurrency();

    if (free) return <span className={className}>{approximate ? 'Free entry · confirm extras' : 'Free'}</span>;
    if (min == null && max == null) return <span className={`${className} text-ink-400`}>Price not confirmed</span>;

    const lo = min ?? max!;
    const hi = max ?? min!;
    const fmt = (n: number, c: CurrencyCode) => formatMoney(n, c);

    const original = lo === hi ? fmt(lo, currency) : `${fmt(lo, currency)}–${fmt(hi, currency)}`;
    const cLo = convertFrom(lo, currency);
    const cHi = convertFrom(hi, currency);
    const converted = lo === hi ? fmt(cLo, target) : `${fmt(cLo, target)}–${fmt(cHi, target)}`;
    const same = target === currency;
    const prefix = approximate || !same ? '≈ ' : '';

    return (
        <span className={className} title={same ? undefined : `Local price: ${original}`}>
            {prefix}{same ? original : converted}
            {showOriginal && !same && (
                <span className="ml-1.5 text-[0.85em] font-normal text-ink-500">({approximate ? '≈ ' : ''}{original} local)</span>
            )}
        </span>
    );
}
