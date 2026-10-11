import Link from 'next/link';
import { villasData } from '@/data/villasData';
import VillaGuideCard from '@/components/media/VillaGuideCard';

const checklist = [
    ['Total price', 'Request a quotation for your dates and party size, including taxes, transfers, meals, and mandatory charges. Compare the full stay cost rather than a headline nightly rate.'],
    ['Layout and accessibility', 'Check the floor plan, bed configuration, steps, and distance to shared facilities. Ask about accessibility needs before paying a deposit.'],
    ['Location and transfers', 'Confirm how you reach the property, the last transfer time, and what happens if your flight is delayed. Island and mountain stays can require additional travel arrangements.'],
    ['Cancellation and inclusions', 'Read the deposit, refund, and cancellation terms. Get written confirmation of meal plans, activities, and services rather than assuming they are included.'],
];
export default function VillasPage() {
    return (
        <main className="min-h-screen bg-[#F9F9F9] text-brand-dark">
            <header className="mb-12 bg-brand-dark px-6 pb-16 pt-36 text-center text-white sm:pt-44">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">Accommodation research</p>
                <h1 className="mx-auto mt-5 max-w-4xl font-serif text-5xl leading-tight sm:text-6xl">Compare Villas & Chalet Stays</h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">Start with three real properties and compare their setting, accommodation choices, and the details to confirm before booking.</p>
            </header>
            <section aria-label="Accommodation shortlist" className="mx-auto max-w-7xl px-6 pb-16">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">{villasData.map(villa => <VillaGuideCard key={villa.id} villa={villa} />)}</div>
            </section>
            <section className="mx-auto max-w-7xl px-6 pb-20" aria-labelledby="checklist-title">
                <h2 id="checklist-title" className="font-serif text-3xl sm:text-4xl">Before you choose a stay</h2>
                <div className="mt-8 grid gap-6 md:grid-cols-2">{checklist.map(([title, text]) => <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 leading-relaxed text-slate-600">{text}</p></div>)}</div>
            </section>
            <section className="bg-white px-6 py-16">
                <div className="mx-auto max-w-3xl">
                    <h2 className="font-serif text-3xl">How we prepared this shortlist</h2>
                    <p className="mt-5 leading-relaxed text-slate-600">Property descriptions were checked against the linked operators&apos; accommodation pages on 11 October 2026. The shortlist compares two island settings with an Alpine chalet. Suitability notes and booking questions are our editorial guidance; this is not a firsthand stay review.</p>
                    <p className="mt-4 leading-relaxed text-slate-600">VeloraTravel is an independent travel information site. We do not manage these properties or take accommodation bookings. These are direct official links, not paid placements or affiliate links. Rates, availability, and inclusions should be confirmed with the operator for your dates.</p>
                    <Link href="/destinations" className="mt-6 inline-block font-semibold text-brand-accent underline underline-offset-4">Explore destination guides →</Link>
                </div>
            </section>
        </main>
    );
}
