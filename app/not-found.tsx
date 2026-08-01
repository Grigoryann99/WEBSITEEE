import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Page Not Found | VeloraTravel',
    description: 'The page you are looking for could not be found. Explore our curated travel guides and destinations.',
};

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
                {/* Large 404 */}
                <p className="font-serif text-[10rem] md:text-[14rem] leading-none text-white/5 font-bold select-none">
                    404
                </p>

                {/* Content */}
                <div className="-mt-16 md:-mt-24">
                    <p className="font-sans text-brand-accent tracking-[0.3em] text-xs uppercase mb-6">
                        Page Not Found
                    </p>
                    <h1 className="font-serif text-3xl md:text-5xl text-white mb-6 leading-tight">
                        This destination doesn&apos;t exist — yet
                    </h1>
                    <p className="font-sans text-white/50 font-light text-lg mb-12 max-w-lg mx-auto">
                        The page you&apos;re looking for may have been moved or no longer exists. 
                        Let us help you find your next extraordinary journey.
                    </p>

                    {/* Navigation links */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="px-8 py-4 bg-brand-accent text-white rounded-full text-sm font-sans tracking-widest uppercase hover:bg-brand-accent/90 transition-all"
                        >
                            Back to Home
                        </Link>
                        <Link
                            href="/destinations"
                            className="px-8 py-4 border border-white/20 text-white rounded-full text-sm font-sans tracking-widest uppercase hover:bg-white/5 transition-all"
                        >
                            Explore Destinations
                        </Link>
                        <Link
                            href="/blog"
                            className="px-8 py-4 border border-white/20 text-white rounded-full text-sm font-sans tracking-widest uppercase hover:bg-white/5 transition-all"
                        >
                            Travel Journal
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
