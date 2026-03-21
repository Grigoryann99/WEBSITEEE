'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

const navLinks = [
    { name: 'Home',         href: '/',            id: 'home'         },
    { name: 'Destinations', href: '/destinations', id: 'destinations' },
    { name: 'Blog',         href: '/blog',         id: 'blog'         },
    { name: 'About',        href: '/about',        id: 'about'        },
    { name: 'Support',      href: '/support',      id: 'contact'      },
];

function getActiveId(pathname: string, sectionId: string): string {
    if (pathname.startsWith('/destinations')) return 'destinations';
    if (pathname.startsWith('/blog'))         return 'blog';
    if (pathname === '/about')               return 'about';
    if (pathname === '/support')             return 'contact';
    return sectionId || 'home';
}

export default function Navigation() {
    const [isScrolled,  setIsScrolled]  = useState(false);
    const [isVisible,   setIsVisible]   = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMenuOpen,  setIsMenuOpen]  = useState(false);
    const [sectionId,   setSectionId]   = useState('home');
    const [hoveredId,   setHoveredId]   = useState<string | null>(null);

    const pathname = usePathname();
    const router   = useRouter();

    // Derived active id (single source of truth)
    const activeId = getActiveId(pathname, sectionId);

    // ─── Scroll handler ───────────────────────────────────────────────────────
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            if (y > 100) setIsVisible(y < lastScrollY || isMenuOpen);
            else         setIsVisible(true);
            setIsScrolled(y > 20);
            setLastScrollY(y);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [lastScrollY, isMenuOpen]);

    // ─── Intersection observer (homepage sections only) ───────────────────────
    useEffect(() => {
        if (pathname !== '/') return;
        const ids = ['home', 'villas', 'footer'];
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => {
                if (e.isIntersecting)
                    setSectionId(e.target.id === 'footer' ? 'contact' : e.target.id);
            }),
            { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
        );
        ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
        return () => obs.disconnect();
    }, [pathname]);

    // ─── Logo click ───────────────────────────────────────────────────────────
    const handleLogoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (pathname === '/') { window.scrollTo({ top: 0, behavior: 'smooth' }); setSectionId('home'); }
        else router.push('/');
    }, [pathname, router]);

    // ─── Nav link click ───────────────────────────────────────────────────────
    const handleNavLinkClick = (id: string) => {
        setSectionId(id);
        setIsMenuOpen(false);
    };

    // ─── Animated indicator helpers ───────────────────────────────────────────
    // We track the position of each link button so the underline can slide.
    const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

    useEffect(() => {
        const targetId = hoveredId ?? activeId;
        const el = linkRefs.current[targetId];
        if (!el) return;
        const parent = el.parentElement;
        if (!parent) return;
        const pRect = parent.getBoundingClientRect();
        const eRect = el.getBoundingClientRect();
        setIndicatorStyle({
            left:    eRect.left - pRect.left,
            width:   eRect.width,
            opacity: 1,
        });
    }, [hoveredId, activeId]);

    // ─── Variants ─────────────────────────────────────────────────────────────
    const mobileMenuVariants: Variants = {
        hidden: { opacity: 0, y: -16 },
        show:   { opacity: 1, y: 0 },
        exit:   { opacity: 0, y: -12 },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -12 },
        show:   { opacity: 1, x: 0 },
    };

    const getItemDelay = (i: number) => ({ delay: i * 0.055, duration: 0.4, ease: 'easeOut' } as const);

    return (
        <>
            {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
            <motion.nav
                initial={false}
                animate={{ y: isVisible ? 0 : '-100%', opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 w-full z-50 transition-[background,border,shadow,padding] duration-500
                    ${isScrolled || isMenuOpen
                        ? 'bg-[#0a0a0a]/85 backdrop-blur-2xl shadow-[0_4px_32px_rgba(0,0,0,0.6)] py-5'
                        : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-8'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-6">

                    {/* LOGO */}
                    <a
                        href="#"
                        onClick={handleLogoClick}
                        aria-label="Go to homepage"
                        className="flex items-center gap-5 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-lg p-1"
                    >
                        <Image
                            src="/logo_final.png"
                            alt="Velora"
                            width={isScrolled ? 60 : 84}
                            height={isScrolled ? 60 : 84}
                            className="w-auto h-auto transition-all duration-500 object-contain"
                            priority
                        />
                        <span className={`font-montserrat tracking-[0.22em] font-semibold transition-all duration-300 select-none
                            ${isScrolled ? 'text-2xl md:text-3xl' : 'text-3xl md:text-5xl'} text-white uppercase`}
                        >
                            VELORA<span className="text-brand-accent">.</span>
                        </span>
                    </a>

                    {/* DESKTOP NAV */}
                    <div
                        className="hidden lg:flex items-center relative"
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        {/* Sliding background indicator */}
                        <motion.div
                            animate={indicatorStyle}
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                            className="absolute h-[calc(100%-8px)] top-1 rounded-full bg-white/8 pointer-events-none"
                        />

                        {/* Sliding bottom underline (active only) */}
                        {/* Rendered via same spring on indicatorStyle so they move together */}

                        <div className="flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-full px-2 py-2 backdrop-blur-sm">
                            {navLinks.map((link) => {
                                const isActive = link.id === activeId ||
                                    (link.id === 'destinations' && pathname.startsWith('/destinations'));

                                return (
                                    <Link
                                        key={link.id}
                                        href={link.href}
                                        ref={(el) => { linkRefs.current[link.id] = el; }}
                                        onClick={() => handleNavLinkClick(link.id)}
                                        onMouseEnter={() => setHoveredId(link.id)}
                                        aria-current={isActive ? 'page' : undefined}
                                        className={`relative px-4 py-1.5 rounded-full font-sans text-[11px] tracking-[0.14em] uppercase font-medium
                                            transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand-accent
                                            ${isActive
                                                ? 'text-brand-accent'
                                                : 'text-white/60 hover:text-white'
                                            }`}
                                    >
                                        {link.name}

                                        {/* Active animated underline */}
                                        <motion.span
                                            animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                            style={{ originX: 0.5 }}
                                            className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-brand-accent"
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT SIDE: CTA + Hamburger */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            className={`lg:hidden w-9 h-9 flex items-center justify-center rounded-xl border
                                border-white/[0.12] text-white/80 transition-all duration-200 active:scale-95
                                hover:bg-white/[0.08] outline-none focus-visible:ring-2 focus-visible:ring-brand-accent
                                ${isMenuOpen ? 'bg-white/10' : 'bg-white/[0.04]'}`}
                            onClick={() => setIsMenuOpen(v => !v)}
                            aria-label="Toggle navigation menu"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-nav"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {isMenuOpen
                                    ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <X size={18} className="text-brand-accent" />
                                      </motion.span>
                                    : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <Menu size={18} />
                                      </motion.span>
                                }
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* ── MOBILE MENU ─────────────────────────────────────────────────── */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        id="mobile-nav"
                        key="mobile-menu"
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="fixed inset-0 z-40 lg:hidden flex flex-col pt-[72px] bg-[#070707]/96 backdrop-blur-2xl overflow-y-auto"
                    >
                        <div className="flex flex-col gap-2 px-5 pt-6 pb-4">
                            {navLinks.map((link, i) => {
                                const isActive = link.id === activeId ||
                                    (link.id === 'destinations' && pathname.startsWith('/destinations'));

                                return (
                                    <motion.div key={link.id} custom={i} variants={itemVariants} initial="hidden" animate="show">
                                        <Link
                                            href={link.href}
                                            onClick={() => { handleNavLinkClick(link.id); }}
                                            aria-current={isActive ? 'page' : undefined}
                                            className={`flex items-center justify-between w-full px-5 py-4 rounded-2xl border
                                                transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-accent
                                                ${isActive
                                                    ? 'bg-brand-accent/10 border-brand-accent/35 text-brand-accent'
                                                    : 'bg-white/[0.04] border-white/[0.07] text-white/75 active:bg-white/10'
                                                }`}
                                        >
                                            <span className="font-serif text-xl">{link.name}</span>
                                            {isActive && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(29,158,117,0.9)]" />
                                            )}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
