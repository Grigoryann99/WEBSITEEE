import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ContactCTA() {
    return (
        <section className="relative w-full py-32 overflow-hidden mt-20">
            {/* Background Setup */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/destinations/santorini_1.jpg" // Known high-quality asset
                    alt="Travel Inspiration"
                    fill
                    className="object-cover opacity-30 scale-105" // Slight scale for parallax feeling
                />
                <div className="absolute inset-0 bg-brand-dark/80 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/50 to-transparent z-10" />
            </div>

            <div className="container relative z-20 px-4 md:px-8 mx-auto max-w-7xl">
                <div className="max-w-2xl">
                    <p className="font-inter text-brand-accent tracking-[0.3em] text-sm uppercase mb-6 flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-brand-accent block"></span>
                        Keep Exploring
                    </p>

                    <h2 className="font-serif text-[48px] md:text-[64px] leading-[1.1] tracking-wide text-white mb-8 drop-shadow-xl">
                        Not ready to book? <br />
                        <span className="text-white/70 italic">Find your inspiration.</span>
                    </h2>

                    <p className="font-inter text-white/60 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl">
                        Browse our curated collection of extraordinary destinations and exclusive villas to spark your next adventure.
                    </p>

                    <div className="flex flex-wrap gap-6">
                        <Link
                            href="/destinations"
                            className="group relative overflow-hidden bg-brand-light text-brand-dark px-10 py-4 rounded-full font-inter font-medium tracking-wide text-sm transition-transform duration-300 hover:scale-105 inline-flex items-center gap-3"
                        >
                            <span className="relative z-10">Explore Destinations</span>
                            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-custom" />
                        </Link>

                        <Link
                            href="/#villas"
                            className="group relative overflow-hidden bg-transparent border border-white/20 text-white px-10 py-4 rounded-full font-inter font-medium tracking-wide text-sm transition-all duration-300 hover:border-brand-accent hover:bg-brand-accent/5 inline-flex items-center"
                        >
                            View Villa Collection
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
