import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer id="footer" className="bg-brand-dark pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <Image
                                src="/logo_final.png"
                                alt="Velora Logo"
                                width={64}
                                height={64}
                                className="w-16 h-auto mb-[2px]"
                            />
                            <div className="font-montserrat text-3xl tracking-widest text-brand-light flex items-center">
                                VELORA<span className="text-brand-accent">.</span>
                            </div>
                        </div>
                        <p className="font-sans text-brand-light/60 font-light max-w-sm leading-relaxed mb-8">
                            Curating the world&apos;s most exclusive sanctuaries for discerning travelers.
                            Elevating escapism into an art form.
                        </p>
                        
                        <div className="flex items-center space-x-4">
                            <a 
                                href="https://www.youtube.com/@VeloraShow1" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-light/60 hover:text-brand-accent hover:border-brand-accent transition-all duration-300"
                                aria-label="YouTube Channel"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-sans uppercase tracking-widest text-xs text-brand-light mb-6">Explore</h4>
                        <ul className="space-y-4 font-sans font-light text-brand-light/60 text-sm">
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
                        <h4 className="font-sans uppercase tracking-widest text-xs text-brand-light mb-6">Legal</h4>
                        <ul className="space-y-4 font-sans font-light text-brand-light/60 text-sm">
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

                <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-sans text-brand-light/40 tracking-wider border-t border-white/5">
                    <p>&copy; {new Date().getFullYear()} VeloraTravel. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy-policy" className="hover:text-brand-accent transition-colors duration-300">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-brand-accent transition-colors duration-300">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-brand-accent transition-colors duration-300">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
