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

    const [scrollY, setScrollY] = useState(0);

    // ─── Scroll handler ───────────────────────────────────────────────────────
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            if (y > 100) setIsVisible(y < lastScrollY || isMenuOpen);
            else         setIsVisible(true);
            setIsScrolled(y > 60);
            setScrollY(y);
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

    // Compute smooth opacity: 0..1 over first 80px of scroll
    const bgOpacity = Math.min(scrollY / 80, 1);
    
    // Check if current route has a dark hero header at the top
    const hasDarkHero = pathname === '/' || pathname.startsWith('/destinations') || pathname.startsWith('/countries/') || pathname.startsWith('/support') || (pathname.startsWith('/blog/') && pathname !== '/blog');
    const useDarkText = isScrolled || isMenuOpen || !hasDarkHero;

    const navBgStyle: React.CSSProperties = isMenuOpen
        ? {
            backgroundColor: 'rgba(10, 10, 10, 0.88)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }
        : {
            backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.65)' : 'rgba(0, 0, 0, 0.35)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          };

    return (
        <>
            {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
            <motion.nav
                initial={false}
                animate={{ y: isVisible ? 0 : '-100%', opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={navBgStyle}
                className={`fixed top-0 w-full z-50 transition-[border-color,box-shadow,padding] duration-500 border-b border-white/10
                    ${isScrolled || isMenuOpen
                        ? 'shadow-[0_8px_32px_rgba(0,0,0,0.35)] py-3.5'
                        : 'shadow-none py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-6">

                    {/* LOGO */}
                    <a
                        href="#"
                        onClick={handleLogoClick}
                        aria-label="Go to homepage"
                        className="flex items-center gap-2.5 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-lg"
                    >

                        <img
                            src="/logo.svg"
                            alt="VeloraTravel logo"
                            className={`transition-all duration-300 ${isScrolled ? 'h-8' : 'h-9'}`}
                            style={{ background: 'transparent' }}
                        />
                        <span
                            className="font-montserrat tracking-[0.22em] font-semibold transition-all duration-300 select-none text-white"
                        >
                            VELORA<span className="text-brand-accent">.</span>
                        </span>
                    </a>

                    {/* DESKTOP NAV — Inter 18px Medium */}
                    <div
                        className="hidden lg:flex items-center gap-2 relative"
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        {/* Sliding bottom underline indicator */}
                        <motion.span
                            animate={{
                                left:    indicatorStyle.left,
                                width:   indicatorStyle.width,
                                opacity: indicatorStyle.opacity,
                            }}
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                            className={`absolute -bottom-0.5 h-[2px] rounded-full pointer-events-none bg-brand-accent`}
                        />

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
                                    className={`relative px-4 py-2 font-sans text-[11px] font-medium tracking-[0.2em] uppercase
                                        transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm
                                        ${
                                            isActive
                                                ? 'text-white font-medium'
                                                : 'text-white/70 hover:text-white font-medium'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* RIGHT SIDE: CTA + Hamburger */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            className={`lg:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-white/20 text-white hover:bg-white/10 bg-black/30 backdrop-blur-md
                                transition-all duration-200 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-brand-accent`}
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
                                        <Menu size={18} className="text-white" />
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
                        className="fixed inset-0 z-40 lg:hidden flex flex-col pt-[72px] bg-white/98 backdrop-blur-2xl overflow-y-auto"
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
                                                    : 'bg-black/[0.02] border-black/5 text-brand-dark/75 active:bg-black/10'
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
