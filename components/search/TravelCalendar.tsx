'use client';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Dialog from '@/components/ui/Dialog';
import { dateKey, dateLabel, travelDays, type TravelDates } from '@/lib/travel-dates';

export default function TravelCalendar({ value, onChange, onClose }: { value: TravelDates; onChange: (dates: TravelDates) => void; onClose: () => void }) {
    const today = dateKey(new Date());
    const currentMonth = new Date(`${today.slice(0, 7)}-01T12:00:00`);
    const [month, setMonth] = useState(() => value.start >= today ? new Date(`${value.start.slice(0, 7)}-01T12:00:00`) : currentMonth);
    const [draft, setDraft] = useState(value), [hover, setHover] = useState(''), [error, setError] = useState('');
    const grid = useRef<HTMLDivElement>(null);
    const count = travelDays(draft.start, draft.end);
    const select = (day: string) => {
        setError(''); setHover('');
        if (!draft.start || draft.end || day < draft.start) setDraft({ start: day, end: '' });
        else if ((travelDays(draft.start, day) || 0) > 21) setError('Choose up to 21 days for one journey.');
        else setDraft({ start: draft.start, end: day });
    };
    const nextMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1, 12);
    const heading = (date: Date) => new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
    return <Dialog title="Choose your dates" onClose={onClose} wide>
        <div className="rounded-[26px] bg-white p-0 sm:p-5">
            <div className="mb-6 flex items-center justify-between gap-3"><button type="button" className="concierge-icon-button disabled:opacity-30" disabled={month <= currentMonth} aria-label="Previous month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1, 12))}><ChevronLeft size={19} /></button><p className="text-center text-sm text-ink-500" aria-live="polite">{draft.end ? 'Your dates are selected' : draft.start ? 'Now choose your return date' : 'Choose your departure date'}</p><button type="button" className="concierge-icon-button" aria-label="Next month" onClick={() => setMonth(nextMonth)}><ChevronRight size={19} /></button></div>
            <div ref={grid} className="grid gap-8 md:grid-cols-2" onKeyDown={event => {
                const source = event.target as HTMLElement, key = source.dataset.date;
                if (!key || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
                event.preventDefault();
                const next = new Date(`${key}T12:00:00`);
                next.setDate(next.getDate() + ({ ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[event.key] || 0));
                grid.current?.querySelector<HTMLButtonElement>(`[data-date="${dateKey(next)}"]:not(:disabled)`)?.focus();
            }}>
                {[month, nextMonth].map((date, monthIndex) => {
                    const year = date.getFullYear(), index = date.getMonth();
                    const offset = new Date(year, index, 1, 12).getDay(), length = new Date(year, index + 1, 0, 12).getDate();
                    return <section key={`${year}-${index}`} aria-label={heading(date)} className={monthIndex ? 'hidden md:block' : undefined}><h3 className="mb-5 text-center !font-sans text-lg !font-semibold">{heading(date)}</h3><div className="grid grid-cols-7 gap-0.5 sm:gap-2">{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => <span key={day} className="mb-2 text-center text-xs font-semibold text-ink-500">{day}</span>)}
                        {Array.from({ length: offset }, (_, i) => <span key={`blank-${i}`} aria-hidden="true" />)}
                        {Array.from({ length }, (_, i) => {
                            const key = dateKey(new Date(year, index, i + 1, 12));
                            const past = key < today, endpoint = key === draft.start || key === draft.end;
                            const previewEnd = draft.end || (hover >= draft.start ? hover : '');
                            const inside = draft.start && previewEnd && key > draft.start && key < previewEnd;
                            return <button key={key} type="button" data-date={key} aria-label={dateLabel(key, true)} aria-pressed={endpoint} aria-current={key === today ? 'date' : undefined} disabled={past} onClick={() => select(key)} onMouseEnter={() => { if (!draft.end) setHover(key); }} onMouseLeave={() => setHover('')} className={`relative flex aspect-square min-h-9 items-center justify-center rounded-[14px] text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 sm:min-h-11 ${past ? 'text-ink-400/50' : endpoint ? 'bg-[#354653] font-semibold text-white' : inside ? 'bg-sky-100 text-ink' : 'bg-[#F5F6F6] text-ink hover:bg-sky-100'}`}>{i + 1}{key === today && <span className={`absolute bottom-1 h-1 w-1 rounded-full ${endpoint ? 'bg-white' : 'bg-ink'}`} />}</button>;
                        })}</div></section>;
                })}
            </div>
            <div className="sticky bottom-0 z-10 mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-sky-100 bg-white py-3 sm:mt-6 sm:pt-5"><div aria-live="polite"><p className="text-sm font-medium">{draft.start ? `${dateLabel(draft.start)}${draft.end ? ` – ${dateLabel(draft.end)}` : ' · select return'}` : 'Flexible dates'}</p><p className="mt-1 text-xs text-ink-500">{count ? `${count} days · ${count - 1} nights` : 'Up to 21 days per journey. Dates do not check availability.'}</p>{error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}</div><div className="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:gap-3"><button type="button" className="rounded-pill px-3 py-3 text-sm underline" onClick={() => { onChange({ start: '', end: '' }); onClose(); }}>Flexible dates</button><button type="button" disabled={!count} className="concierge-button concierge-button-primary !px-7" onClick={() => { onChange(draft); onClose(); }}>Apply dates</button></div></div>
        </div>
    </Dialog>;
}
