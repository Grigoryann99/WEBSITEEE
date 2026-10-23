import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight, BookOpen, Coffee, ShoppingBag } from 'lucide-react';
import RomeExplorer from '@/components/places/RomeExplorer';
import { romePlaces } from '@/lib/places/catalog';

export const metadata: Metadata = {
    title: 'Shopping in Rome · local shops, books & gifts',
    description: 'Explore Rome markets, coffee shops, bookshops, boutiques and outlets. Find addresses, official sources and shopping stops for your own itinerary.',
    alternates: { canonical: '/destinations/italy/rome/shopping' },
};

export default function RomeShoppingPage() {
    const count = romePlaces.filter(place => place.section === 'shop').length;
    return <main className="concierge-surface min-h-screen pb-16 pt-28">
        <header className="mx-auto max-w-[1440px] px-5 sm:px-8">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-xs text-ink-500"><Link href="/destinations">Destinations</Link><span>/</span><Link href="/destinations/italy/rome">Rome</Link><span>/ Shopping</span></nav>
            <div className="grid overflow-hidden rounded-[32px] border border-sky-100 bg-white lg:grid-cols-[1.25fr_1fr]">
                <div className="px-6 py-10 sm:p-12 lg:p-16">
                    <p className="concierge-eyebrow">The Rome shopping edit · {count} places</p>
                    <h1 className="mt-5 max-w-xl font-serif text-5xl leading-[1.05] sm:text-6xl">A little Rome.<br /><em className="text-sky-700">To take home.</em></h1>
                    <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-500">A notebook for the next chapter. Coffee for someone you miss. A boutique discovered between the sights. Make shopping part of your journey.</p>
                    <div className="mt-7 flex flex-wrap gap-3"><a href="#rome-explorer" className="concierge-button concierge-button-primary">Explore the shops <ShoppingBag size={16} /></a><Link href="/destinations/italy/rome/gifts" className="concierge-button">Find a gift <ArrowUpRight size={16} /></Link></div>
                </div>
                <div className="grid content-center gap-3 bg-sky-50 p-6 sm:p-10">
                    {[
                        { icon: Coffee, title: 'For the food lover', text: 'Coffee, deli counters and pantry gifts.', category: 'food' },
                        { icon: BookOpen, title: 'For the thoughtful gift', text: 'Bookshops, paper and travel journals.', category: 'paper' },
                        { icon: ShoppingBag, title: 'For a style detour', text: 'Boutiques, department stores and outlets.', category: 'fashion' },
                    ].map(item => <Link key={item.category} href={`?shopType=${item.category}#rome-explorer`} className="group flex items-center gap-4 rounded-[22px] border border-white bg-white/90 p-5 transition-colors hover:bg-white"><span className="rounded-2xl bg-sky-100 p-3 text-sky-700"><item.icon size={22} /></span><span className="min-w-0 flex-1"><span className="block font-serif text-xl">{item.title}</span><span className="mt-1 block text-sm text-ink-500">{item.text}</span></span><ArrowUpRight size={18} className="shrink-0 text-sky-700" /></Link>)}
                </div>
            </div>
            <div className="mt-5 flex flex-wrap justify-between gap-3 px-2 text-xs leading-relaxed text-ink-500"><p>Save a shop, find it on the map, or add a stop to your day.</p><Link href="/concierge?destination=italy%2Frome" className="font-medium text-sky-700 underline">Ask AI about shopping in Rome →</Link></div>
        </header>
        <Suspense fallback={<p className="p-8 text-center">Loading Rome shops…</p>}><RomeExplorer shoppingOnly /></Suspense>
        <section className="mx-auto max-w-[1440px] px-5 sm:px-8">
            <div className="grid gap-6 rounded-[28px] border border-sky-100 bg-white p-6 sm:p-8 md:grid-cols-3">
                <div><h2 className="font-serif text-xl">Buy with a little care.</h2><p className="mt-3 text-sm leading-relaxed text-ink-500">Check the maker, materials and final price. A Roman address does not mean every product was made locally.</p></div>
                <div><h2 className="font-serif text-xl">Make room in your day.</h2><p className="mt-3 text-sm leading-relaxed text-ink-500">Markets and independent shops can have different opening days. Outlet transfers need extra time; map pins are location guides.</p></div>
                <div><h2 className="font-serif text-xl">Bring it home well.</h2><p className="mt-3 text-sm leading-relaxed text-ink-500">Keep receipts and check return terms. Before buying food or liquids, confirm the rules for your journey and destination.</p></div>
            </div>
        </section>
    </main>;
}
