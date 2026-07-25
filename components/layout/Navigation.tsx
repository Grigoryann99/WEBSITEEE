'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { name: 'Home', href: '/', id: 'home' },
    { name: 'Destinations', href: '/destinations', id: 'destinations' },
    { name: 'Blog', href: '/blog', id: 'blog' },
    { name: 'About', href: '/about', id: 'about' },
    { name: 'Support', href: '/support', id: 'support' },
];

export default function Navigation() {
    const pathname = usePathname();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeId, setActiveId] = useState('home');

    // Indicator pill position state for desktop nav
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
        left: 0,
        width: 0,
        opacity: 0,
    });

    const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

    // Keep activeId in sync with route path
    useEffect(() => {
        if (pathname === '/') {
            setActiveId('home');
        } else if (pathname.startsWith('/destinations')) {
            setActiveId('destinations');
        } else if (pathname.startsWith('/blog')) {
            setActiveId('blog');
        } else if (pathname.startsWith('/about')) {
            setActiveId('about');
        } else if (pathname.startsWith('/support')) {
            setActiveId('support');
        }
    }, [pathname]);

    // Handle scroll to change nav style
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Recalculate indicator position on active/hovered link change
    useEffect(() => {
        const targetId = hoveredId || activeId;
        const activeEl = linkRefs.current[targetId];

        if (activeEl) {
            setIndicatorStyle({
                left: activeEl.offsetLeft,
                width: activeEl.offsetWidth,
                opacity: 1,
            });
        } else {
            setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
        }
    }, [activeId, hoveredId, pathname]);

    // Lock body scroll when mobile menu is open
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

    const handleNavLinkClick = (id: string) => {
        setActiveId(id);
        setIsMenuOpen(false);
    };

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActiveId('home');
        setIsMenuOpen(false);
        if (pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.location.href = '/';
        }
    };

    // Mobile menu Framer Motion variants
    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.05, duration: 0.25, ease: 'easeOut' }
        })
    };

    return (
        <>
            {/* ── TOP NAVIGATION BAR ─────────────────────────────────────────────── */}
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl'
                        : 'bg-black/50 backdrop-blur-lg border-b border-white/10 py-5'
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
                            className="font-montserrat tracking-[0.22em] font-semibold transition-all duration-300 select-none text-white text-base"
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
                            className="absolute -bottom-0.5 h-[2px] rounded-full pointer-events-none bg-brand-accent"
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

                    {/* RIGHT SIDE: Hamburger Button */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-white/20 text-white hover:bg-white/10 bg-black/40 backdrop-blur-md transition-all duration-200 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                            onClick={() => setIsMenuOpen(v => !v)}
                            aria-label="Toggle navigation menu"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-nav"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {isMenuOpen
                                    ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <X size={20} className="text-brand-accent" />
                                      </motion.span>
                                    : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <Menu size={20} className="text-white" />
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
                        className="fixed inset-0 z-40 lg:hidden flex flex-col pt-[84px] bg-[#0A0A0A]/95 backdrop-blur-2xl overflow-y-auto"
                    >
                        <div className="flex flex-col gap-2.5 px-5 pt-4 pb-8">
                            {navLinks.map((link, i) => {
                                const isActive = link.id === activeId ||
                                    (link.id === 'destinations' && pathname.startsWith('/destinations'));

                                return (
                                    <motion.div key={link.id} custom={i} variants={itemVariants} initial="hidden" animate="show">
                                        <Link
                                            href={link.href}
                                            onClick={() => { handleNavLinkClick(link.id); }}
                                            aria-current={isActive ? 'page' : undefined}
                                            className={`flex items-center justify-between w-full px-5 py-3.5 rounded-xl border
                                                transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-accent
                                                ${isActive
                                                    ? 'bg-brand-accent/20 border-brand-accent/50 text-brand-accent font-medium'
                                                    : 'bg-white/[0.08] border-white/15 text-white hover:bg-white/15 active:bg-white/20 font-medium'
                                                }`}
                                        >
                                            <span className="font-sans text-[13px] font-medium tracking-[0.18em] uppercase">{link.name}</span>
                                            {isActive && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(29,158,117,1.0)]" />
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
