import Link from 'next/link';
import { villasData } from '@/data/villasData';
import VillaGuideCard from './VillaGuideCard';

export default function VillaGallery() {
    return (
        <section id="villas" className="border-t border-slate-100 bg-[#F9F9F9] px-6 py-24 text-brand-dark md:py-32">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">Places to stay</p>
                    <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl">Villas & Chalet Inspiration</h2>
                    <p className="mt-6 text-lg leading-relaxed text-slate-600">Compare three real properties, see who each may suit, and find the questions to ask before booking. Follow the official websites for current rates and availability.</p>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">{villasData.map(villa => <VillaGuideCard key={villa.id} villa={villa} />)}</div>
                <div className="mt-10 text-center"><Link href="/villas" className="font-semibold text-brand-accent underline underline-offset-4">Read the stay comparison & booking checklist →</Link></div>
            </div>
        </section>
    );
}
