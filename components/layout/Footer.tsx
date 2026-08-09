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
                        <p className="font-sans text-brand-dark/60 font-light max-w-sm leading-relaxed mb-6">
                            Curating the world&apos;s most exclusive sanctuaries for discerning travelers.
                            Elevating escapism into an art form.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://www.instagram.com/velorashow?igsh=MW1jZzkxYTY2cWlmcA=="
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-black/5 text-brand-dark hover:bg-brand-accent hover:text-white transition-all duration-300"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                                </svg>
                            </a>
                            <a
                                href="https://youtube.com/@velorashow1?si=UPuwLPXV3KRKcO1_"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-black/5 text-brand-dark hover:bg-brand-accent hover:text-white transition-all duration-300"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                                    <polygon points="10 15 15 12 10 9 10 15"/>
                                </svg>
                            </a>
                        </div>
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
