import { notFound } from 'next/navigation';
import { countries } from '@/lib/countryData';
import CountryDestinationCard from '@/components/destinations/CountryDestinationCard';
import { Metadata } from 'next';
import Image from 'next/image';

interface CountryPageProps {
    params: {
        country: string;
    };
}

export async function generateMetadata(
    { params }: CountryPageProps
): Promise<Metadata> {
    const countryKey = params.country.toLowerCase();
    const data = countries[countryKey];

    if (!data) {
        return {
            title: 'Country Not Found | Velora Travel'
        };
    }

    return {
        title: `Explore ${data.name} | Velora Travel`,
        description: data.description,
    };
}

export default function CountryPage({ params }: CountryPageProps) {
    const countryKey = params.country.toLowerCase();
    const data = countries[countryKey];

    if (!data) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-brand-light font-sans selection:bg-brand-accent selection:text-white">
            {/* 1. Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={data.heroImage}
                        alt={`Explore ${data.name}`}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/20 to-[#0a0a0a]" />
                </div>

                <div className="relative z-10 text-center w-full max-w-4xl mx-auto px-6 mt-16">
                    <p className="font-sans text-brand-accent tracking-[0.3em] text-xs sm:text-sm uppercase mb-4 animate-fade-in-up">
                        Discover
                    </p>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-brand-light mb-6 leading-tight tracking-wider drop-shadow-2xl">
                        {data.name}
                    </h1>
                    <p className="font-light text-brand-light/80 text-lg md:text-xl max-w-2xl mx-auto">
                        {data.description}
                    </p>
                </div>
            </section>

            {/* Container for content sections */}
            <div className="max-w-7xl mx-auto px-6 space-y-24 py-20">
                {/* 2. Top Destinations */}
                <section>
                    <div className="mb-12">
                        <h2 className="font-serif text-4xl md:text-5xl text-brand-light mb-4">Top Destinations</h2>
                        <div className="w-24 h-1 bg-brand-accent" />
                        <p className="text-brand-light/60 font-light mt-4 max-w-xl">
                            Explore our curated selection of landmarks and cities you must visit.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.destinations.map((dest, i) => (
                            <CountryDestinationCard key={i} {...dest} />
                        ))}
                    </div>
                </section>

                {/* 3. Travel Tips */}
                <section className="bg-[#111] -mx-6 px-6 py-16 border-y border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-mesh-luxury opacity-10 pointer-events-none" />
                    <div className="max-w-7xl mx-auto relative z-10">
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-light mb-8">Travel Tips for {data.name}</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {data.tips.map((tip, i) => (
                                <li key={i} className="flex items-start bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 shadow-sm">
                                    <span className="text-brand-accent font-serif text-2xl mr-4 leading-none">{i + 1}.</span>
                                    <p className="font-sans text-brand-light/80 text-sm font-light">
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
