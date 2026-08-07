'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Youtube, Facebook, ArrowUpRight } from 'lucide-react';

const navLinks = [
    { name: 'Destinations', href: '/destinations', description: 'Curated intelligence on 50+ countries' },
    { name: 'Luxury Villas', href: '/villas', description: 'Exclusive private estates & sanctuaries' },
    { name: 'Travel Journal', href: '/blog', description: 'Stories, itineraries & wisdom' },
    { name: 'About Us', href: '/about', description: 'The VeloraTravel sanctuary' },
    { name: 'Support', href: '/support', description: 'Contact our concierge' },
];

export default function Navigation() {
    const pathname = usePathname();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isScrollHidden, setIsScrollHidden] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const lastScrollY = useRef(0);

    // Smart Scroll Direction Detection
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            setIsScrolled(currentScrollY > 20);

            if (currentScrollY > 100) {
                if (currentScrollY > lastScrollY.current + 5) {
                    // Scrolling DOWN -> Hide background / navbar
                    setIsScrollHidden(true);
                } else if (currentScrollY < lastScrollY.current - 5) {
                    // Scrolling UP -> Reveal background / navbar
                    setIsScrollHidden(false);
                }
            } else {
                setIsScrollHidden(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when overlay menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <>
            {/* ── TOP NAVIGATION BAR ─────────────────────────────────────────────── */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: isScrollHidden && !isMenuOpen ? -100 : 0,
                    opacity: isScrollHidden && !isMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
                    isScrolled
                        ? 'bg-[#0F172A]/90 backdrop-blur-md border-b border-white/10 py-4 shadow-xl'
                        : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6'
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
                    
                    {/* LEFT: Hamburger Menu Toggle Button */}
                    <div className="flex items-center gap-3 w-1/4 justify-start">
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            aria-label="Open Navigation Menu"
                            className="group flex items-center gap-3 text-white focus:outline-none"
                        >
                            <div className="flex flex-col justify-center gap-1.5 w-6 h-6">
                                <span className="w-6 h-[2px] bg-white transition-transform duration-300 group-hover:scale-x-110 group-hover:bg-[#E11D48]" />
                                <span className="w-4 h-[2px] bg-white transition-transform duration-300 group-hover:w-6 group-hover:bg-[#E11D48]" />
                            </div>
                            <span className="hidden sm:inline font-sans text-xs font-semibold tracking-[0.2em] uppercase text-white/90 group-hover:text-[#E11D48] transition-colors">
                                Menu
                            </span>
                        </button>
                    </div>

                    {/* CENTER: Brand Logo */}
                    <div className="w-2/4 flex justify-center text-center">
                        <Link
                            href="/"
                            className="inline-flex flex-col items-center group outline-none"
                        >
                            <span className="font-serif text-2xl md:text-3xl tracking-widest text-white font-bold group-hover:text-rose-100 transition-colors">
                                VELORA<span className="text-[#E11D48]">.</span>
                            </span>
                            <span className="font-sans text-[8px] md:text-[9px] tracking-[0.35em] text-white/70 uppercase">
                                Luxury Travel
                            </span>
                        </Link>
                    </div>

                    {/* RIGHT: Book Now Outline CTA Button */}
                    <div className="w-1/4 flex justify-end items-center">
                        <Link
                            href="/destinations"
                            className="inline-flex items-center justify-center px-5 py-2 md:px-6 md:py-2.5 rounded-none border border-white/80 hover:border-[#E11D48] text-white hover:text-white bg-transparent hover:bg-[#E11D48]/90 font-sans text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 shadow-sm"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            </motion.nav>

            {/* ── LUXURY SPLIT OVERLAY MENU (3rd Screenshot Style) ──────────────── */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-50 flex overflow-hidden bg-[#0F172A]"
                    >
                        {/* LEFT HALF (Desktop Visual Backdrop) */}
                        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-black">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop"
                                alt="Luxury Resort Backdrop"
                                className="w-full h-full object-cover opacity-60 scale-105 animate-slow-pan"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-black/40" />
                            
                            <div className="absolute bottom-16 left-16 right-16 text-white space-y-4">
                                <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#E11D48] font-bold">
                                    VeloraTravel Sanctuary
                                </span>
                                <h3 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-white/95">
                                    Where Luxury Meets The Horizon
                                </h3>
                                <p className="font-sans text-white/70 text-sm max-w-md font-light">
                                    Discover handpicked villas, private islands, and curated travel intelligence across 50+ countries.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT HALF (Menu Content Panel) */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full lg:w-1/2 min-h-screen bg-[#8B5CF6]/15 lg:bg-[#0F172A] backdrop-blur-2xl flex flex-col justify-between p-8 md:p-14 overflow-y-auto border-l border-white/10 text-white"
                            style={{
                                background: 'linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)'
                            }}
                        >
                            {/* Top Bar inside Overlay */}
                            <div className="flex items-center justify-between pb-8 border-b border-white/10">
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-2 text-white/80 hover:text-white font-sans text-xs tracking-[0.2em] uppercase font-semibold group"
                                >
                                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300 text-[#E11D48]" />
                                    <span>Close</span>
                                </button>

                                <Link
                                    href="/destinations"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="px-5 py-2 border border-white/70 hover:border-[#E11D48] text-white hover:bg-[#E11D48] font-sans text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300"
                                >
                                    Book Now
                                </Link>
                            </div>

                            {/* Main Navigation Links */}
                            <div className="py-10 space-y-6">
                                {navLinks.map((link, idx) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.08 + 0.1 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="group flex flex-col space-y-1"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className={`font-serif text-3xl md:text-5xl font-light transition-colors duration-300 ${
                                                        isActive ? 'text-[#E11D48] font-normal' : 'text-white/90 group-hover:text-[#E11D48]'
                                                    }`}>
                                                        {link.name}
                                                    </span>
                                                    <ArrowUpRight size={22} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-[#E11D48]" />
                                                </div>
                                                <span className="font-sans text-xs text-white/50 font-light tracking-wide group-hover:text-white/80 transition-colors">
                                                    {link.description}
                                                </span>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Bottom Panel: Socials & Accreditation */}
                            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                {/* Social icons */}
                                <div className="flex items-center gap-4 text-white/70">
                                    <a href="#" className="hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                                        <Instagram size={18} />
                                    </a>
                                    <a href="#" className="hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                                        <Youtube size={18} />
                                    </a>
                                    <a href="#" className="hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                                        <Facebook size={18} />
                                    </a>
                                </div>

                                {/* Trust badge */}
                                <div className="text-right">
                                    <span className="font-sans text-[10px] tracking-[0.2em] text-white/40 uppercase block">
                                        Recommended on TripAdvisor
                                    </span>
                                    <span className="font-serif text-sm text-white/80">
                                        VeloraTravel Experience ★★★★★
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
