import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Compass } from 'lucide-react';
import CookieSettings from './CookieSettings';

const explore = [
    { label: 'Destinations', href: '/destinations' },
    { label: 'Rome city guide', href: '/destinations/italy/rome' },
    { label: 'Where to stay', href: '/stay' },
    { label: 'Travel guides', href: '/guides' },
];
const journey = [
    { label: 'Plan a journey', href: '/plan' },
    { label: 'Ask concierge', href: '/concierge' },
    { label: 'Our story', href: '/about' },
    { label: 'Help & support', href: '/support' },
];

export default function Footer() {
    return <footer id="footer" className="bg-cream px-3 pb-4 pt-8 text-[#354653] sm:px-6 sm:pb-6">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[32px] border border-white/90 bg-[radial-gradient(ellipse_at_0%_0%,#D8E6EC_0%,transparent_55%),radial-gradient(ellipse_at_100%_100%,#DFE9EB_0%,transparent_55%),linear-gradient(120deg,#EAF0F1,#F5F1E8_65%,#E7EEF0)] px-6 pb-5 pt-9 shadow-[0_8px_35px_-22px_#35465330] sm:px-10 sm:pt-12 lg:px-16">
            <div className="flex flex-wrap items-end justify-between gap-7 border-b border-[#A8BCC6]/30 pb-9 sm:pb-11">
                <div><p className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6A8492]"><Compass size={14} strokeWidth={1.5} />Your next journey</p><h2 className="font-serif text-[38px] leading-[1.12] tracking-tight text-[#2E3D48] sm:text-5xl lg:text-[56px]">Where will you<br /><em className="text-[#6A8796]">go next?</em></h2></div>
                <div className="flex flex-wrap items-center gap-3 pb-1"><Link href="/destinations" className="group inline-flex min-h-12 items-center gap-7 rounded-pill bg-[#354653] px-6 text-sm font-medium text-white shadow-[0_4px_14px_#35465320] transition-colors hover:bg-[#273945] focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2">Explore destinations<ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" /></Link><Link href="/plan" className="group inline-flex min-h-12 items-center gap-5 rounded-pill border border-white/90 bg-white/45 px-5 text-sm font-medium text-[#354653] transition-colors hover:bg-white/80 focus-visible:ring-2 focus-visible:ring-sky-600">Build a journey<ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" /></Link></div>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-9 py-9 lg:grid-cols-[1.5fr_1fr_1fr] lg:py-11">
                <div className="col-span-2 lg:col-span-1"><Link href="/" className="group inline-flex items-center gap-2.5 rounded-pill font-serif text-[27px] tracking-tight text-[#2E3D48]"><Image src="/logo.svg" alt="Velora Travel" width={32} height={32} className="h-8 w-8 object-contain transition-transform group-hover:scale-105" /><span>Velora Travel<span className="text-[#7C9BAA]">.</span></span></Link><p className="mt-4 max-w-[270px] text-sm leading-relaxed text-[#617987]">Places to discover.<br />Details to travel well.</p><p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-[#7D929E]">A little curiosity goes a long way.</p></div>
                {[{ title: 'Explore', items: explore }, { title: 'Your journey', items: journey }].map(group => <nav key={group.title} aria-label={'Footer ' + group.title}><p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6F8794]">{group.title}</p><ul className="space-y-0.5">{group.items.map(item => <li key={item.href}><Link href={item.href} className="group inline-flex min-h-9 items-center gap-3 rounded-pill py-1 text-sm text-[#405B6A] transition-colors hover:text-[#172E3D] focus-visible:ring-2 focus-visible:ring-sky-600">{item.label}<ArrowUpRight size={12} className="text-[#8CA2AF] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" /></Link></li>)}</ul></nav>)}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-[#A8BCC6]/30 pt-5 text-[11px] text-[#6B828F]"><p>© {new Date().getFullYear()} VeloraTravel</p><nav aria-label="Legal and privacy" className="flex flex-wrap items-center gap-x-5 gap-y-3"><Link href="/privacy-policy" className="rounded-pill hover:text-[#2E3D48]">Privacy</Link><Link href="/terms" className="rounded-pill hover:text-[#2E3D48]">Terms</Link><Link href="/cookies" className="rounded-pill hover:text-[#2E3D48]">Cookies</Link><Link href="/image-credits" className="rounded-pill hover:text-[#2E3D48]">Photo credits</Link><CookieSettings /></nav></div>
        </div>
    </footer>;
}
