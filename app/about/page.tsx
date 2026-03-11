import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | VeloraTravel',
    description: 'Learn about VeloraTravel — our story, our mission, and the people who curate the world\'s finest travel experiences for discerning travelers.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-brand-light">
            {/* Hero */}
            <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/5 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <p className="font-sans text-brand-accent tracking-[0.3em] text-xs uppercase mb-6">Our Story</p>
                    <h1 className="font-serif text-5xl md:text-7xl text-brand-light mb-8 leading-tight tracking-wide">
                        About VeloraTravel
                    </h1>
                    <p className="font-sans text-brand-light/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
                        We believe travel is not a product to be purchased — it is an experience to be curated, a story to be lived, and a perspective to be changed.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="max-w-4xl mx-auto px-6 pb-24">
                <div className="space-y-16">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="font-serif text-3xl md:text-4xl text-brand-light mb-6">Who We Are</h2>
                            <div className="space-y-4 font-sans text-brand-light/70 font-light leading-relaxed">
                                <p>
                                    VeloraTravel is a luxury travel platform founded by a team of passionate explorers who spent years visiting the destinations we now share with you. We are not a booking engine — we are curators, storytellers, and advocates for meaningful travel.
                                </p>
                                <p>
                                    Our name, Velora, comes from the Latin root meaning "to carry swiftly" — reflecting our mission to carry our community to the world's most extraordinary places, swiftly and with purpose.
                                </p>
                                <p>
                                    Every destination we feature, every country page we build, and every article we write comes from genuine experience or rigorous research. We believe the internet has too many travel websites that aggregate information without insight. We aim to be different.
                                </p>
                            </div>
                        </div>
                        <div className="bg-[#141414] border border-white/5 rounded-3xl p-8">
                            <div className="space-y-8">
                                {[
                                    { number: '10+', label: 'Countries Featured' },
                                    { number: '50+', label: 'Curated Destinations' },
                                    { number: '10k+', label: 'Monthly Readers' },
                                    { number: '100%', label: 'Independent & Ad-Free Research' },
                                ].map((stat) => (
                                    <div key={stat.label} className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                                        <p className="font-serif text-4xl text-brand-accent mb-1">{stat.number}</p>
                                        <p className="font-sans text-sm text-brand-light/50 tracking-wider uppercase">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Values */}
                    <div>
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-light mb-10 text-center">Our Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: 'Authenticity',
                                    desc: 'We only feature destinations we would genuinely recommend to a close friend. No paid placements, no undisclosed partnerships.'
                                },
                                {
                                    title: 'Depth',
                                    desc: 'Surface-level travel guides are everywhere. We go deeper — the history, the culture, the practical reality, and the experiences that matter.'
                                },
                                {
                                    title: 'Sustainability',
                                    desc: 'We believe in travel that enriches local communities and preserves the places it visits. We highlight responsible operators and ethical practices.'
                                },
                            ].map((v) => (
                                <div key={v.title} className="bg-[#141414] border border-white/5 rounded-2xl p-8">
                                    <h3 className="font-serif text-xl text-brand-accent mb-4">{v.title}</h3>
                                    <p className="font-sans text-sm text-brand-light/60 font-light leading-relaxed">{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* What We Do */}
                    <div>
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-light mb-6">What We Offer</h2>
                        <div className="space-y-4 font-sans text-brand-light/70 font-light leading-relaxed">
                            <p>
                                VeloraTravel offers a curated library of destination guides, travel tips, and editorial articles across the world's most sought-after locations. Our <strong className="text-brand-light font-normal">Destinations</strong> section provides deep-dive guides for major travel regions, while our <strong className="text-brand-light font-normal">Country Pages</strong> offer structured information about visa requirements, best seasons, and must-see attractions for each destination.
                            </p>
                            <p>
                                Our <strong className="text-brand-light font-normal">Blog</strong> publishes original articles written by our editorial team — practical guides, top lists, and destination-specific deep dives designed to genuinely help you plan better trips.
                            </p>
                            <p>
                                We are continuously expanding our coverage. If there is a destination you would like us to feature, or if you have feedback about our existing content, we would love to hear from you via our <a href="/support" className="text-brand-accent hover:text-brand-light transition-colors underline underline-offset-4">Support page</a>.
                            </p>
                        </div>
                    </div>

                    {/* Contact CTA */}
                    <div className="bg-[#141414] border border-brand-accent/20 rounded-3xl p-10 text-center">
                        <h3 className="font-serif text-2xl text-brand-light mb-4">Travel Questions?</h3>
                        <p className="font-sans text-brand-light/60 font-light mb-8 max-w-md mx-auto">
                            Our team is happy to answer your travel questions and help you plan your next journey.
                        </p>
                        <a
                            href="/support"
                            className="inline-block font-sans text-xs tracking-widest uppercase border border-brand-accent text-brand-accent px-8 py-4 rounded-full hover:bg-brand-accent hover:text-brand-dark transition-all duration-300"
                        >
                            Get in Touch
                        </a>
                    </div>

                </div>
            </section>
        </main>
    );
}
