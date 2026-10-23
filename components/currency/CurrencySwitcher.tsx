'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { CURRENCIES, CURRENCY_META } from '@/lib/currency/config';
import { useCurrency } from './CurrencyProvider';
import { easeOut } from '@/lib/motion';

export default function CurrencySwitcher({ tone = 'light', placement = 'bottom' }: { tone?: 'light' | 'dark' | 'glass'; placement?: 'top' | 'bottom' }) {
    const { currency, setCurrency } = useCurrency();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        ref.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.focus();
        const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { setOpen(false); ref.current?.querySelector<HTMLButtonElement>('#currency-switcher')?.focus(); }
            if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
            const options = Array.from(ref.current?.querySelectorAll<HTMLButtonElement>('[role="option"]') || []);
            if (!options.length || !ref.current?.contains(document.activeElement)) return;
            e.preventDefault();
            const index = options.findIndex(option => option === document.activeElement);
            const next = e.key === 'Home' ? 0 : e.key === 'End' ? options.length - 1 : (index + (e.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length;
            options[next].focus();
        };
        document.addEventListener('mousedown', onDown);
        document.addEventListener('keydown', onKey);
        return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
    }, [open]);


    const btnTone = tone === 'dark'
        ? 'bg-black/40 text-white border-white/20 hover:bg-black/60'
        : tone === 'glass'
            ? 'bg-[#EAF1F4]/85 text-[#2E3D48] border-white/65 shadow-[0_3px_10px_rgba(47,67,81,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] hover:bg-[#F3F7F9]'
            : 'bg-white/90 text-ink border-sky-200 hover:bg-white';

    return (
        <div ref={ref} className="relative">
            <button
                id="currency-switcher"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(v => !v)}
                className={`focus-ring flex items-center gap-1.5 rounded-pill border px-3.5 py-2 text-[12px] font-semibold tracking-wide backdrop-blur-md transition-colors ${btnTone}`}
            >
                <span>{CURRENCY_META[currency].symbol}</span>
                <span>{currency}</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: placement === 'top' ? 6 : -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: placement === 'top' ? 6 : -6, scale: 0.97 }}
                        transition={{ duration: 0.22, ease: easeOut }}
                        className={`absolute right-0 z-[60] w-64 rounded-modal border border-sky-100 bg-white p-2 text-ink shadow-lift ${placement === 'top' ? 'bottom-[calc(100%+8px)] origin-bottom-right' : 'top-[calc(100%+8px)] origin-top-right'}`}
                    >
                        <ul role="listbox" aria-label="Display currency" className="max-h-80 overflow-auto no-scrollbar">
                            {CURRENCIES.map(c => (
                                <li key={c}>
                                    <button
                                        id={`currency-option-${c}`}
                                        role="option"
                                        aria-selected={c === currency}
                                        type="button"
                                        onClick={() => { setCurrency(c); setOpen(false); }}
                                        className={`focus-ring flex w-full items-center gap-3 rounded-chip px-3 py-2.5 text-left text-sm transition-colors ${c === currency ? 'bg-sky-50 font-semibold' : 'hover:bg-cream'}`}
                                    >
                                        <span className="w-9 text-xs font-bold text-sky-700">{c}</span>
                                        <span className="flex-1 text-ink-500">{CURRENCY_META[c].label}</span>
                                        {c === currency && <Check className="h-4 w-4 text-sky-600" />}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
