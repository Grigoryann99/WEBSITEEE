import { villasData } from '@/data/villasData';
import VillaGuideCard from '@/components/media/VillaGuideCard';
import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Where to Stay — Curated Accommodation Research | VeloraTravel',
    description: 'Compare boutique stays, private villas, and hotels with transparent questions to ask before booking.',
    alternates: { canonical: '/stay' },
};

const checklist = [
    ['Total price & hidden fees', 'Request a quotation for your exact dates and party size, including local city taxes, mandatory transfers, and resort fees. Compare the full stay cost rather than an introductory nightly rate.'],
    ['Layout & room configuration', 'Verify the floor plan, bed arrangement, elevator access, steps, and distance to shared dining. Inquire about accessibility and noise insulation before confirming.'],
    ['Location & arrival transfers', 'Check how you reach the property from the airport or central station, transit schedules, and late-night check-in protocols. Island and mountain lodges frequently require pre-arranged shuttles.'],
    ['Cancellation & inclusions', 'Review deposit rules, refund windows, and cancellation policies. Obtain written confirmation of meal plans, breakfast inclusions, and amenities.'],
];

export default function StayPage() {
    return (
        <main className="min-h-screen bg-cream text-ink pt-28 pb-20 selection:bg-sky-200">
            {/* Featured Properties Grid */}
            <section aria-label="Accommodation shortlist" className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                            Featured Global Retreats
                        </h1>
                        <p className="text-xs sm:text-sm text-ink-500 mt-1">
                            Three different settings. Find a stay that fits your kind of journey.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                    {villasData.map((villa) => (
                        <VillaGuideCard key={villa.id} villa={villa} />
                    ))}
                </div>
            </section>

            {/* Checklist: Before you choose a stay */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16" aria-labelledby="checklist-title">
                <div className="rounded-[32px] bg-white border border-sky-100 p-8 sm:p-12 shadow-soft">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-sky-50 text-sky-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-sky-200/60">
                        <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                        Traveler Protection
                    </div>
                    <h2 id="checklist-title" className="font-serif text-3xl sm:text-4xl font-semibold text-ink">
                        4 Questions to Confirm Before Booking
                    </h2>
                    <p className="text-sm text-ink-500 mt-2 max-w-2xl leading-relaxed">
                        Avoid surprise charges and logistical mismatches by asking these essential questions directly to the operator.
                    </p>

                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                        {checklist.map(([title, text]) => (
                            <div key={title} className="rounded-card border border-sky-100 bg-cream-100/60 p-6">
                                <h3 className="font-serif text-lg font-semibold text-ink">{title}</h3>
                                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-500">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Editorial Disclosure */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-xs text-ink-500 leading-relaxed">
                <p>
                    VeloraTravel is an independent travel intelligence platform. We do not manage properties or process direct hotel payments. Rates, availability, and inclusions must always be confirmed directly with the official property operator.
                </p>
            </section>
        </main>
    );
}
