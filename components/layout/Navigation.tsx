'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, Instagram } from 'lucide-react';

/* ── Menu link data ────────────────────────────────────────── */
const menuLinks = [
    { name: 'Destinations', href: '/destinations', id: 'destinations' },
    { name: 'Luxury Villas', href: '/villas', id: 'villas' },
    { name: 'Travel Journal', href: '/blog', id: 'blog' },
    { name: 'About', href: '/about', id: 'about' },
    { name: 'Support', href: '/support', id: 'support' },
];

const socialLinks = [
    { name: 'Instagram', href: '#' },
    { name: 'Pinterest', href: '#' },
    { name: 'Twitter', href: '#' },
];

/* ── Menu images ───────────────────────────────────────────── */
const menuImages = [
    '/for foto menu.jpeg',
];

export default function Navigation() {
    const pathname = usePathname();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
    const [isAtTop, setIsAtTop] = useState(true);
    const [hoveredLink, setHoveredLink] = useState<number | null>(null);
    const [currentImageIdx, setCurrentImageIdx] = useState(0);

    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    /* ── Scroll direction detection ────────────────────────── */
    const handleScroll = useCallback(() => {
        if (ticking.current) return;
        ticking.current = true;

        requestAnimationFrame(() => {
            const currentY = window.scrollY;
            const atTop = currentY < 30;

            setIsAtTop(atTop);

            if (!atTop) {
                if (currentY > lastScrollY.current + 5) {
                    setScrollDirection('down');
                } else if (currentY < lastScrollY.current - 5) {
                    setScrollDirection('up');
                }
            } else {
                setScrollDirection('up');
            }

            lastScrollY.current = currentY;
            ticking.current = false;
        });
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    /* ── Lock body scroll when menu open ───────────────────── */
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    /* ── Rotate menu background image on hover ─────────────── */
    useEffect(() => {
        if (hoveredLink !== null) {
            setCurrentImageIdx(hoveredLink % menuImages.length);
        }
    }, [hoveredLink]);

    const closeMenu = () => setIsMenuOpen(false);

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsMenuOpen(false);
        if (pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.location.href = '/';
        }
    };

    /* ── Navbar visibility logic ───────────────────────────── */
    const navVisible = isAtTop || scrollDirection === 'up' || isMenuOpen;
    const showBg = !isAtTop && scrollDirection === 'up';

    /* ── Animation Variants ────────────────────────────────── */
    const easeOut = [0.22, 1, 0.36, 1] as const;

    const overlayVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.5, ease: easeOut } },
        exit: { opacity: 0, transition: { duration: 0.4, ease: easeOut } },
    };

    const leftPanelVariants = {
        hidden: { x: '-100%', opacity: 0 },
        show: { x: 0, opacity: 1, transition: { duration: 0.6, ease: easeOut, delay: 0.1 } },
        exit: { x: '-100%', opacity: 0, transition: { duration: 0.4, ease: easeOut } },
    };

    const rightPanelVariants = {
        hidden: { x: '100%', opacity: 0 },
        show: { x: 0, opacity: 1, transition: { duration: 0.6, ease: easeOut, delay: 0.05 } },
        exit: { x: '100%', opacity: 0, transition: { duration: 0.4, ease: easeOut } },
    };

    const linkItemVariants = {
        hidden: { opacity: 0, x: 40 },
        show: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: { duration: 0.45, ease: easeOut, delay: 0.25 + i * 0.07 },
        }),
        exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
    };

    return (
        <>
            {/* ── TOP NAVIGATION BAR ────────────────────────────────── */}
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{
                    y: navVisible ? 0 : -80,
                    opacity: navVisible ? 1 : 0,
                }}
                transition={{ duration: 0.45, ease: easeOut }}
                className="fixed top-0 left-0 right-0 z-50"
                style={{ willChange: 'transform, opacity' }}
            >
                {/* Background layer — separate for smooth transitions */}
                <div
                    className="absolute inset-0 transition-all duration-500 ease-out"
                    style={{
                        backgroundColor: showBg ? 'rgba(10, 10, 10, 0.75)' : 'transparent',
                        backdropFilter: showBg ? 'blur(20px) saturate(1.4)' : 'none',
                        WebkitBackdropFilter: showBg ? 'blur(20px) saturate(1.4)' : 'none',
                        borderBottom: showBg ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
                    }}
                />

                {/* Nav content */}
                <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between h-[72px] lg:h-[80px]">

                    {/* LEFT — Hamburger */}
                    <button
                        onClick={() => setIsMenuOpen(v => !v)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMenuOpen}
                        className="group flex items-center gap-3 px-3.5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 hover:border-white/40 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand-accent shadow-lg"
                    >
                        <div className="w-6 h-6 flex flex-col items-center justify-center gap-[6px]">
                            <motion.span
                                animate={isMenuOpen ? { rotate: 45, y: 8.5 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.3, ease: easeOut }}
                                className="block w-6 h-[2.5px] bg-white rounded-full origin-center shadow-sm"
                            />
                            <motion.span
                                animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.2 }}
                                className="block w-6 h-[2.5px] bg-white rounded-full origin-center shadow-sm"
                            />
                            <motion.span
                                animate={isMenuOpen ? { rotate: -45, y: -8.5 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.3, ease: easeOut }}
                                className="block w-6 h-[2.5px] bg-white rounded-full origin-center shadow-sm"
                            />
                        </div>
                        <span className="hidden lg:inline-block font-sans text-[12px] font-semibold tracking-[0.2em] uppercase text-white transition-colors duration-300">
                            {isMenuOpen ? 'Close' : 'Menu'}
                        </span>
                    </button>

                    {/* CENTER — Logo */}
                    <a
                        href="/"
                        onClick={handleLogoClick}
                        aria-label="Go to homepage"
                        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-lg"
                    >
                        <img
                            src="/logo.svg"
                            alt="VeloraTravel logo"
                            className="h-8 lg:h-9 transition-all duration-300"
                            style={{ background: 'transparent' }}
                        />
                        <span className="font-montserrat tracking-[0.22em] font-semibold text-white text-sm lg:text-base select-none whitespace-nowrap">
                            VELORA<span className="text-brand-accent">.</span>
                        </span>
                    </a>

                    {/* RIGHT — Book Now CTA */}
                    <Link
                        href="/villas"
                        className="group relative px-4 py-2 lg:px-6 lg:py-2.5 border border-white/30 rounded-full
                            font-sans text-[10px] lg:text-[11px] font-medium tracking-[0.2em] uppercase text-white
                            hover:border-brand-accent hover:text-brand-accent
                            active:scale-95 transition-all duration-300 outline-none
                            focus-visible:ring-2 focus-visible:ring-brand-accent"
                    >
                        <span className="relative z-10">Book Now</span>
                        <div className="absolute inset-0 rounded-full bg-brand-accent/0 group-hover:bg-brand-accent/10 transition-colors duration-300" />
                    </Link>
                </div>
            </motion.nav>

            {/* ── SPLIT OVERLAY MENU ───────────────────────────────── */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        key="menu-overlay"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="fixed inset-0 z-40 flex"
                    >
                        {/* LEFT — Image Panel (hidden on mobile) */}
                        <motion.div
                            variants={leftPanelVariants}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="hidden lg:block relative w-[65%] overflow-hidden"
                        >
                            {/* Rotating background images */}
                            {menuImages.map((src, i) => (
                                <div
                                    key={src}
                                    className="absolute inset-0 transition-opacity duration-700 ease-out"
                                    style={{ opacity: i === currentImageIdx ? 1 : 0 }}
                                >
                                    <img
                                        src={src}
                                        alt="Travel destination"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}



                            {/* Bottom tagline */}
                            <div className="absolute bottom-12 left-10 right-10">
                                <p className="font-serif text-3xl text-white/90 leading-snug italic font-light">
                                    Discover the world&apos;s<br />most extraordinary places
                                </p>
                                <div className="mt-4 w-12 h-[1px] bg-brand-accent/60" />
                            </div>
                        </motion.div>

                        {/* RIGHT — Menu Content */}
                        <motion.div
                            variants={rightPanelVariants}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="relative w-full lg:w-[35%] bg-[#0a1f3a] flex flex-col overflow-y-auto"
                        >
                            {/* Navigation links */}
                            <nav className="flex-1 flex flex-col px-8 sm:px-12 lg:px-16 pt-24 pb-8 min-h-screen lg:min-h-0">
                                <div className="my-auto space-y-1">
                                    {menuLinks.map((link, i) => {
                                        const isActive = pathname === link.href ||
                                            (link.id === 'destinations' && pathname.startsWith('/destinations')) ||
                                            (link.id === 'blog' && pathname.startsWith('/blog')) ||
                                            (link.id === 'villas' && pathname.startsWith('/villas'));

                                        return (
                                            <motion.div
                                                key={link.id}
                                                custom={i}
                                                variants={linkItemVariants}
                                                initial="hidden"
                                                animate="show"
                                                exit="exit"
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={closeMenu}
                                                    onMouseEnter={() => setHoveredLink(i)}
                                                    onMouseLeave={() => setHoveredLink(null)}
                                                    className={`group flex items-center gap-4 py-4 lg:py-5 transition-all duration-300 ${
                                                        isActive ? 'text-brand-accent' : 'text-white/80 hover:text-white'
                                                    }`}
                                                >
                                                    {/* Link name */}
                                                    <span className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-light tracking-wide group-hover:translate-x-3 transition-transform duration-500 ease-out">
                                                        {link.name}
                                                    </span>

                                                    {/* Arrow on hover */}
                                                    <motion.span
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{
                                                            opacity: hoveredLink === i ? 1 : 0,
                                                            x: hoveredLink === i ? 0 : -10,
                                                        }}
                                                        transition={{ duration: 0.3 }}
                                                        className="ml-auto text-brand-accent"
                                                    >
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </motion.span>

                                                    {/* Active dot */}
                                                    {isActive && (
                                                        <span className="ml-auto w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_12px_rgba(31,180,180,0.6)]" />
                                                    )}
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Bottom Icons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                    className="mt-8 flex justify-end gap-5"
                                >
                                    <a
                                        href="https://www.instagram.com/velorashow?igsh=MW1jZzkxYTY2cWlmcA=="
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram"
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-brand-accent hover:border-brand-accent hover:text-white transition-all duration-300 active:scale-90"
                                    >
                                        <Instagram size={18} strokeWidth={1.5} />
                                    </a>
                                    <a
                                        href="https://youtube.com/@velorashow1?si=UPuwLPXV3KRKcO1_"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="YouTube"
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-brand-accent hover:border-brand-accent hover:text-white transition-all duration-300 active:scale-90"
                                    >
                                        <Youtube size={18} strokeWidth={1.5} />
                                    </a>
                                </motion.div>
                            </nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
