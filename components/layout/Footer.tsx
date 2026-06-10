import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer id="footer" className="bg-[#F5F5F5] pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">

                            <div className="font-montserrat text-3xl tracking-widest text-brand-dark flex items-center">
                                VELORA<span className="text-brand-accent">.</span>
                            </div>
                        </div>
                        <p className="font-sans text-brand-dark/60 font-light max-w-sm leading-relaxed mb-8">
                            Curating the world&apos;s most exclusive sanctuaries for discerning travelers.
                            Elevating escapism into an art form.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-sans uppercase tracking-widest text-xs text-brand-dark mb-6">Explore</h4>
                        <ul className="space-y-4 font-sans font-light text-brand-dark/60 text-sm">
                            <li>
                                <Link href="/about" className="hover:text-brand-accent transition-colors duration-300">
                                    Our Story
                                </Link>
                            </li>
                            <li>
                                <Link href="/destinations" className="hover:text-brand-accent transition-colors duration-300">
                                    Destinations
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-brand-accent transition-colors duration-300">
                                    Travel Journal
                                </Link>
                            </li>
                            <li>
                                <Link href="/support" className="hover:text-brand-accent transition-colors duration-300">
                                    Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-sans uppercase tracking-widest text-xs text-brand-dark mb-6">Legal</h4>
                        <ul className="space-y-4 font-sans font-light text-brand-dark/60 text-sm">
                            <li>
                                <Link href="/privacy-policy" className="hover:text-brand-accent transition-colors duration-300">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-brand-accent transition-colors duration-300">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="hover:text-brand-accent transition-colors duration-300">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-sans text-brand-dark/40 tracking-wider border-t border-black/5">
                    <p>&copy; {new Date().getFullYear()} VeloraTravel. All rights reserved.</p>
                    <p className="mt-2 md:mt-0 font-sans text-brand-dark/30 text-[10px] tracking-widest uppercase">Curated Luxury Travel</p>
                </div>
            </div>
        </footer>
    );
}
