import Image from 'next/image';
import Link from 'next/link';

export default function AuthorBox() {
    return (
        <section className="mt-16 pt-10 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-start gap-6 bg-[#141414] border border-white/5 rounded-3xl p-8">
                {/* Author avatar */}
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-brand-accent/30">
                    <Image
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
                        alt="Elena Morozova — VeloraTravel Editor-in-Chief"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Author info */}
                <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-serif text-xl text-brand-light">Elena Morozova</h3>
                        <span className="text-[9px] font-sans uppercase tracking-widest text-brand-accent border border-brand-accent/30 px-2 py-0.5 rounded-full">
                            Editor-in-Chief
                        </span>
                    </div>
                    <p className="font-sans text-brand-light/60 text-sm font-light leading-relaxed mb-4">
                        Elena is a luxury travel writer and the founder of VeloraTravel. With over 12 years of 
                        experience exploring 45+ countries — from private island resorts in the Maldives to 
                        hidden ryokans in rural Japan — she brings deeply personal, expert-level insights to 
                        every guide. Her work has been featured in Condé Nast Traveller and Travel + Leisure.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/about"
                            className="font-sans text-xs tracking-widest uppercase text-brand-accent hover:text-brand-light transition-colors duration-300 inline-flex items-center gap-2"
                        >
                            About the Author <span>→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
