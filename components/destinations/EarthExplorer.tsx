'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Globe2, Play, Sparkles } from 'lucide-react';

type Country = { id: string; iso2: string; name: string; flag: string; image: string; description: string; cities: string[]; guideHref: string; planningCity: { name: string; id: string; href: string } | null };
export default function EarthExplorer() {
    const [countries, setCountries] = useState<Country[]>([]), [selectedId, setSelectedId] = useState('');
    const [enabled, setEnabled] = useState(false), [nearby, setNearby] = useState(false), [ready, setReady] = useState(false);
    const [notice, setNotice] = useState(''), [error, setError] = useState(false), [imageError, setImageError] = useState(false);
    const frame = useRef<HTMLIFrameElement>(null), section = useRef<HTMLElement>(null), selection = useRef('');
    const selected = countries.find(country => country.id === selectedId);
    useEffect(() => {
        let active = true;
        fetch('/earth/destinations.json').then(response => { if (!response.ok) throw Error('Directory unavailable'); return response.json(); }).then(data => { if (active) setCountries(data.countries); }).catch(() => { if (active) setError(true); });
        if (window.matchMedia('(min-width: 768px)').matches && !(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) setEnabled(true);
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) setNearby(true);
            frame.current?.contentWindow?.postMessage({ type: 'velora-earth-visibility', visible: entries[0].isIntersecting }, window.location.origin);
        }, { rootMargin: '160px' });
        if (section.current) observer.observe(section.current);
        return () => { active = false; observer.disconnect(); };
    }, []);
    useEffect(() => {
        const message = (event: MessageEvent) => {
            if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
            if (event.data?.type === 'velora-earth-ready') {
                setReady(true); setError(false);
                if (selection.current) frame.current?.contentWindow?.postMessage({ type: 'velora-earth-focus', id: selection.current }, window.location.origin);
            }
            if (event.data?.type === 'velora-earth-select' && countries.some(country => country.id === event.data.id)) { selection.current = event.data.id; setSelectedId(event.data.id); setImageError(false); setNotice(''); }
            if (event.data?.type === 'velora-earth-unsupported' && typeof event.data.name === 'string') setNotice(`We don’t have a guide for ${event.data.name} yet. Choose a destination from the list to explore our available guides.`);
            if (event.data?.type === 'velora-earth-error') setError(true);
        };
        window.addEventListener('message', message);
        return () => window.removeEventListener('message', message);
    }, [countries]);
    const choose = (id: string) => {
        selection.current = id; setSelectedId(id); setImageError(false); setNotice('');
        if (ready) frame.current?.contentWindow?.postMessage({ type: 'velora-earth-focus', id }, window.location.origin);
    };
    return <section ref={section} id="earth-explorer" data-testid="earth-explorer" aria-labelledby="earth-explorer-title" className="mx-auto mb-12 max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 px-1"><div><p className="concierge-eyebrow">Follow your curiosity</p><h2 id="earth-explorer-title" className="mt-3 font-serif text-3xl sm:text-4xl">One world. Your next chapter.</h2></div><p className="max-w-sm text-sm leading-relaxed text-ink-500">Turn the globe. Find a place that calls to you.<br />Then make the journey your own.</p></div>
        <div className="overflow-hidden rounded-[34px] border border-sky-100 bg-white shadow-[0_16px_60px_#28465B0C] lg:grid lg:grid-cols-[1.4fr_1fr]">
            <div data-testid="earth-stage" className="relative min-h-[390px] overflow-hidden bg-[#091A29] sm:min-h-[550px] lg:min-h-[610px]">
                {enabled && nearby ? <iframe ref={frame} src="/earth-explorer.html" title="Interactive Earth globe" className="absolute inset-0 h-full w-full border-0" loading="lazy" /> : <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-7 text-center text-white"><div aria-hidden="true" className="h-48 w-48 rounded-full bg-cover bg-center shadow-[0_0_38px_#73BAED25]" style={{ backgroundImage: "url('/earth/poster.webp')" }} /><div><p className="font-serif text-3xl">The world, within reach.</p><p className="mt-3 text-sm text-sky-100">Explore in 3D, or choose a country from the list.</p></div><button type="button" onClick={() => setEnabled(true)} className="inline-flex min-h-11 items-center gap-3 rounded-full border border-white/40 bg-white/10 px-5 text-sm backdrop-blur-md"><Play size={15} />Explore the globe</button></div>}
            </div>
            <div className="flex min-w-0 flex-col p-6 sm:p-8 lg:p-9">
                <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-500" htmlFor="earth-country">Your next destination</label><select id="earth-country" aria-label="Globe destination" className="concierge-input mt-3 !rounded-[18px] text-sm" value={selectedId} onChange={event => choose(event.target.value)}><option value="" disabled>Choose a country</option>{countries.map(country => <option key={country.id} value={country.id}>{country.name}</option>)}</select>
                {notice && <p role="status" className="mt-4 rounded-[18px] bg-sky-50 p-4 text-xs leading-relaxed text-ink-500">{notice}</p>}
                {error && <p role="status" className="mt-4 text-xs leading-relaxed text-ink-500">The 3D view is unavailable. You can still select a country here or browse the directory below.</p>}
                {selected ? <div className="mt-6" aria-live="polite">
                    <div className="relative h-36 overflow-hidden rounded-[22px] bg-sky-50 sm:h-40">{!imageError && <Image src={selected.image} alt={selected.name} fill unoptimized sizes="440px" className="object-cover" onError={() => setImageError(true)} />}<div className="absolute inset-0 bg-gradient-to-t from-[#152B3999] to-transparent" /><span className="absolute bottom-3 left-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-medium text-ink">Country guide</span></div>
                    <div className="mt-5 flex items-center gap-3"><Image src={selected.flag} alt="" width={30} height={24} unoptimized className="h-6 w-[30px] object-contain" /><h3 className="font-serif text-3xl">{selected.name}</h3></div><p className="mt-3 text-sm leading-relaxed text-ink-500">{selected.description}</p>
                    <p className="mt-5 text-[10px] font-semibold uppercase tracking-wider text-ink-400">Cities & places to explore</p><div className="mt-2 flex flex-wrap gap-2">{selected.cities.slice(0, 4).map(city => <Link href={`${selected.guideHref}#country-highlights`} key={city} className="rounded-full border border-sky-100 bg-sky-50/60 px-3 py-1.5 text-xs text-ink-500 hover:bg-sky-100">{city}</Link>)}</div>
                    <div className="mt-6 flex flex-wrap gap-2"><Link href={selected.guideHref} className="concierge-button concierge-button-primary !min-h-10 !px-4 !text-xs">Open guide<ArrowRight size={14} /></Link><Link href={`/concierge?destination=${encodeURIComponent(selected.id)}`} className="concierge-button !min-h-10 !px-4 !text-xs"><Sparkles size={14} />Ask AI</Link></div>
                    {selected.planningCity && <Link href={selected.planningCity.href} className="mt-4 inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-sky-800">Open the {selected.planningCity.name} city companion<ArrowUpRight size={14} /></Link>}
                </div> : <div className="flex flex-1 flex-col justify-center py-10"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-sky-700"><Globe2 size={23} /></span><h3 className="mt-5 font-serif text-3xl leading-tight">A whole world<br /><em>of possibilities.</em></h3><p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">Select a country on Earth or in the list above. Discover its highlights, explore cities and talk through your ideas with your AI concierge.</p><p className="mt-6 text-xs text-sky-800">{countries.length || '51'} country guides · One place to start</p></div>}
            </div>
        </div>
    </section>;
}
