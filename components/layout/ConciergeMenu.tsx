'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, BookOpen, Bookmark, Compass, BedDouble, HelpCircle, LogOut, Map, Settings2, Sparkles, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import CurrencySwitcher from '@/components/currency/CurrencySwitcher';
import { useAuth } from '@/components/auth/AuthProvider';

const links = [
    { name: 'Destinations', detail: 'Find your next stop', href: '/destinations', icon: Compass },
    { name: 'Plan a trip', detail: 'Build your days, your way', href: '/plan', icon: Map },
    { name: 'Where to stay', detail: 'Hotels, villas & quiet retreats', href: '/stay', icon: BedDouble },
    { name: 'Travel guides', detail: 'The details that make a difference', href: '/guides', icon: BookOpen },
    { name: 'Your concierge', detail: 'A little help shaping your days', href: '/concierge', icon: Sparkles },
];
const collection = [
    { name: 'Saved places', detail: 'Kept for your journey', href: '/account/saved', icon: Bookmark },
    { name: 'Settings', detail: 'Your account & preferences', href: '/account/settings', icon: Settings2 },
];
export default function ConciergeMenu({ onClose }: { onClose: () => void }) {
    const { user, signIn, signOut } = useAuth();
    const path = usePathname(), panel = useRef<HTMLDivElement>(null), close = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const previous = document.activeElement as HTMLElement | null;
        close.current?.focus();
        const trap = (event: KeyboardEvent) => {
            if (event.key !== 'Tab') return;
            const nodes = Array.from(panel.current?.querySelectorAll<HTMLElement>('a[href],button:not(:disabled)') || []);
            const first = nodes[0], last = nodes[nodes.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        };
        document.addEventListener('keydown', trap);
        return () => { document.removeEventListener('keydown', trap); if (previous?.isConnected) previous.focus(); };
    }, []);
    return <div ref={panel} className="flex h-full min-h-0 flex-col bg-[linear-gradient(155deg,#EFF5F7_0%,#FDFBF6_42%,#F8F7F2_100%)] text-[#2E3D48]">
        <header className="flex shrink-0 items-center justify-between gap-4 px-6 pb-4 pt-6 sm:px-7"><div><Link href="/" onClick={onClose} className="group inline-flex items-center gap-2.5 rounded-pill font-serif text-2xl tracking-tight"><Image src="/logo.svg" alt="Velora Travel" width={28} height={28} className="h-7 w-7 object-contain transition-transform group-hover:scale-105" /><span>Velora Travel<span className="text-[#7697A5]">.</span></span></Link><p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#6F8794]">A world worth exploring</p></div><button ref={close} type="button" aria-label="Close Menu" onClick={onClose} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/90 bg-white/65 text-[#526A78] shadow-sm transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-sky-600"><X size={19} /></button></header>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4 sm:px-6">
            <Link href="/destinations/italy/rome" onClick={onClose} className="group relative mb-5 mt-1 block h-36 overflow-hidden rounded-[26px] bg-[#354653] outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2"><Image src="/images/countries/rome.jpg" alt="Trevi Fountain in Rome" fill sizes="400px" className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" /><span className="absolute inset-0 bg-gradient-to-t from-[#152B39]/95 via-[#152B39]/45 to-[#152B39]/15" /><span className="absolute inset-x-5 bottom-5"><span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-white/85">The city companion · Italy</span><span className="mt-2 flex items-end justify-between gap-4"><span className="max-w-[220px] font-serif text-[25px] leading-[1.12] text-white">Rome, at your<br /><em>own pace.</em></span><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/15 text-white backdrop-blur-sm transition-colors group-hover:bg-white/25"><ArrowUpRight size={18} /></span></span></span></Link>
            <p className="mb-2 px-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#81939E]">Discover & plan</p>
            <nav aria-label="Explore and plan" className="space-y-1">{links.map(link => { const Icon = link.icon; const active = path === link.href || path.startsWith(`${link.href}/`); return <Link key={link.href} href={link.href} onClick={onClose} aria-current={active ? 'page' : undefined} className={`group flex items-center gap-3 rounded-[22px] p-3 transition-colors focus-visible:ring-2 focus-visible:ring-sky-600 ${active ? 'bg-[#DDEBF1]/75' : 'hover:bg-white/80'}`}><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-white/80 bg-[#E6EFF2] text-[#56798B]"><Icon size={18} strokeWidth={1.6} /></span><span className="min-w-0 flex-1"><span className="block text-sm font-medium">{link.name}</span><span className="mt-0.5 block text-[11px] text-[#7B8C97]">{link.detail}</span></span><ArrowRight size={15} className="text-[#A4B4BC] transition-transform group-hover:translate-x-0.5" /></Link>; })}
            </nav>
            <p className="mb-2 mt-5 px-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#81939E]">Your collection</p>
            <nav aria-label="Your collection" className="space-y-1">{collection.map(link => { const Icon = link.icon; const active = path === link.href; return <Link key={link.href} href={link.href} onClick={onClose} aria-current={active ? 'page' : undefined} className={`group flex items-center gap-3 rounded-[22px] p-3 transition-colors focus-visible:ring-2 focus-visible:ring-sky-600 ${active ? 'bg-[#DDEBF1]/75' : 'hover:bg-white/80'}`}><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-white/80 bg-[#E6EFF2] text-[#56798B]"><Icon size={18} strokeWidth={1.6} /></span><span className="min-w-0 flex-1"><span className="block text-sm font-medium">{link.name}</span><span className="mt-0.5 block text-[11px] text-[#7B8C97]">{link.detail}</span></span><ArrowRight size={15} className="text-[#A4B4BC] transition-transform group-hover:translate-x-0.5" /></Link>; })}</nav>
            <Link href="/support" onClick={onClose} className="mt-3 inline-flex min-h-11 items-center gap-2.5 rounded-pill px-3 text-xs text-[#7B8C97] transition-colors hover:text-[#354653]"><HelpCircle size={15} />Help & support<ArrowUpRight size={13} /></Link>
        </div>
        <footer className="shrink-0 border-t border-white/90 bg-white/50 px-6 pb-6 pt-4 sm:px-7"><div className="mb-4 flex items-center justify-between gap-3"><span className="text-[11px] text-[#7B8C97]">Your currency</span><CurrencySwitcher tone="glass" placement="top" /></div>{user ? <><Link href="/account" onClick={onClose} className="flex min-h-12 items-center justify-between gap-3 rounded-pill bg-[#354653] px-5 text-sm font-medium text-white shadow-sm">My journeys<ArrowRight size={17} /></Link><button type="button" onClick={async () => { await signOut(); onClose(); }} className="mt-2 flex min-h-9 w-full items-center justify-center gap-2 rounded-pill text-xs text-[#7B8C97]"><LogOut size={13} />Sign out</button></> : <><button type="button" onClick={() => { onClose(); signIn(); }} className="flex min-h-12 w-full items-center justify-between gap-3 rounded-pill bg-[#354653] px-5 text-sm font-medium text-white shadow-[0_5px_15px_#35465320] transition-colors hover:bg-[#273945]">Sign in to save your journey<ArrowRight size={17} /></button><p className="mt-3 text-center text-[10px] text-[#8B9AA3]">Your places. Your plans. All together.</p></>}</footer>
    </div>;
}
