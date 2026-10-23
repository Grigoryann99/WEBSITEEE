import { jsonLd } from '@/lib/json-ld';
import { availablePhoto } from '@/lib/attraction-photos';
import { notFound } from 'next/navigation';
import { countries } from '@/lib/countryData';
import CountryDestinationCard from '@/components/destinations/CountryDestinationCard';
import CountryHeroImage from '@/components/countries/CountryHeroImage';
import { Metadata } from 'next';
import MaldivesExperience from '@/components/countries/MaldivesExperience';
import Link from 'next/link';
import { destinationHref, type JourneyParams } from '@/lib/destinations';
import JourneyPreferences from '@/components/search/JourneyPreferences';

interface CountryPageProps {
    searchParams: Promise<JourneyParams>;
    params: Promise<{
        country: string;
    }>;
}

export async function generateMetadata(
    { params: pendingParams }: CountryPageProps
): Promise<Metadata> {
    const params = await pendingParams;
    const countryKey = params.country.toLowerCase().replace(/-/g, '_');
    const data = Object.prototype.hasOwnProperty.call(countries, countryKey) ? countries[countryKey] : undefined;

    if (!data) {
        return {
            title: 'Country Not Found', alternates: { canonical: null }
        };
    }

    return {
        title: `Explore ${data.name}`,
        description: data.description,
        alternates: { canonical: `/destinations/${countryKey.replace(/_/g, '-')}` },
        openGraph: { title: `Explore ${data.name}`, description: data.description, url: `/destinations/${countryKey.replace(/_/g, '-')}`, images: [data.heroImage] },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function CountryPage({ params: pendingParams, searchParams: pendingSearch }: CountryPageProps) {
    const params = await pendingParams;
    const countryKey = params.country.toLowerCase().replace(/-/g, '_');
    const data = Object.prototype.hasOwnProperty.call(countries, countryKey) ? countries[countryKey] : undefined;

    if (!data) {
        notFound();
    }

    const searchParams = await pendingSearch;
    return (
        <main className="min-h-screen bg-[#F9F9F9] text-brand-dark font-sans selection:bg-brand-accent selection:text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: jsonLd({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://veloratravel.org/"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Destinations",
                                "item": "https://veloratravel.org/destinations"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": data.name,
                                "item": `https://veloratravel.org/destinations/${countryKey.replace(/_/g, '-')}`
                            }
                        ]
                    })
                }}
            />
            {/* 1. Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <CountryHeroImage src={data.heroImage} countryName={data.name} />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-transparent" />
                </div>

                <div className="relative z-10 text-center w-full max-w-4xl mx-auto px-6 mt-16">
                    <p className="font-sans text-brand-accent tracking-[0.3em] text-xs sm:text-sm uppercase mb-4 animate-fade-in-up">
                        Discover
                    </p>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight tracking-wider drop-shadow-md">
                        {data.name}
                    </h1>
                    <p className="font-light text-white/85 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-sm">
                        {data.description}
                    </p>
                </div>
            </section>

            <section id="journey-results" className="mx-auto max-w-7xl scroll-mt-28 px-6 pt-10"><JourneyPreferences params={searchParams} destinationId={countryKey.replace(/_/g, '-')} /><div className="flex flex-wrap items-center justify-between gap-5 rounded-[30px] border border-sky-200 bg-white p-6 text-ink"><div><p className="concierge-eyebrow">Country guide</p><p className="mt-2 max-w-xl text-sm text-ink-500">Explore the highlights below. Choose a city to see which planning tools are available.</p></div><div className="flex flex-wrap gap-3"><Link className="concierge-button" href={destinationHref('/plan', countryKey.replace(/_/g, '-'), searchParams)}>Plan a trip</Link><Link className="concierge-button" href={destinationHref('/concierge', countryKey.replace(/_/g, '-'), searchParams)}>Ask the AI concierge</Link></div></div></section>
            {/* Container for content sections */}
            <div className="max-w-7xl mx-auto px-6 space-y-24 py-20">
                {countryKey === 'italy' && <section className="rounded-[30px] border border-sky-200 bg-sky-50 p-7 text-ink"><p className="concierge-eyebrow">Your city companion</p><h2 className="mt-3 font-serif text-3xl">Make room for Rome.</h2><p className="mt-4 max-w-xl text-ink-500">Explore restaurants, landmarks, local shops and stays, then arrange your own days.</p><Link href={destinationHref('/destinations/italy/rome', 'italy/rome', searchParams)} className="concierge-button concierge-button-primary mt-5">Open the Rome guide →</Link></section>}
                {countryKey === 'maldives' && <MaldivesExperience />}
                {/* 2. Top Destinations */}
                <section id="country-highlights"><span id={countryKey === 'maldives' ? 'maldives-highlights' : undefined} />
                    <div className="mb-12 text-left">
                        <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-4">Top Destinations</h2>
                        <div className="w-24 h-1 bg-brand-accent" />
                        <p className="text-brand-dark/60 font-light mt-4 max-w-xl">
                            Explore our curated selection of landmarks and cities you must visit.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {data.destinations.map((dest, i) => (
                            <CountryDestinationCard
                                key={i}
                                name={dest.name}
                                location={`${dest.city}, ${dest.country}`}
                                category={dest.category || 'Historical'}
                                description={dest.description}
                                whyVisit={dest.whyVisit || dest.description}
                                bestTime={dest.bestTime || 'April - October'}
                                insiderTip={dest.insiderTip || 'Book tickets in advance to avoid long lines.'}
                                imageUrl={availablePhoto(dest.image || '/images/placeholder.optimized.webp')}
                            />
                        ))}
                    </div>
                </section>

                {/* 3. Travel Tips */}
                <section className="bg-white -mx-6 px-6 py-16 border-y border-black/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-mesh-luxury opacity-10 pointer-events-none" />
                    <div className="max-w-7xl mx-auto relative z-10 text-left">
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-8">Travel Tips for {data.name}</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {data.tips.map((tip, i) => (
                                <li key={i} className="flex items-start bg-[#F9F9F9] p-6 rounded-2xl border border-black/5 shadow-sm">
                                    <span className="text-brand-accent font-serif text-2xl mr-4 leading-none">{i + 1}.</span>
                                    <p className="font-sans text-brand-dark/80 text-sm font-light">
                                        {tip}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
        </main>
    );
}
