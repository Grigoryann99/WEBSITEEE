'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import NavbarAccountMenu from '@/components/auth/NavbarAccountMenu';
import { useAuth } from '@/components/auth/AuthProvider';
import { easeOut } from '@/lib/motion';
import ConciergeMenu from './ConciergeMenu';

const navLinks = [
    { name: 'Destinations', href: '/destinations', id: 'destinations' },
    { name: 'Plan a trip', href: '/plan', id: 'plan' },
    { name: 'Concierge', href: '/concierge', id: 'concierge' },
];

export default function Navigation() {
    const pathname = usePathname();
    const { user, signIn, signOut } = useAuth();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
    const [isAtTop, setIsAtTop] = useState(true);
    const [hasEntered, setHasEntered] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setHasEntered(true), 1600);
        return () => clearTimeout(timer);
    }, []);

    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    useEffect(() => { if (!user) setIsAccountOpen(false); }, [user]);

    /* ── Scroll direction detection ────────────────────────── */
    const handleScroll = useCallback(() => {
        if (ticking.current) return;
        ticking.current = true;

        requestAnimationFrame(() => {
            const currentY = window.scrollY;
            const atTop = currentY < 30;

            setIsAtTop(atTop);

            if (!atTop) {
                if (currentY > lastScrollY.current + 8) {
                    setScrollDirection('down');
                } else if (currentY < lastScrollY.current - 8) {
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

    /* ── Lock body scroll when drawer open ─────────────────── */
    useEffect(() => {
        if (!isMenuOpen) return;
        const overflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && !document.querySelector('#concierge-menu-drawer [aria-haspopup="listbox"][aria-expanded="true"]')) setIsMenuOpen(false);
        };
        document.addEventListener('keydown', onKey);
        return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', onKey); };
    }, [isMenuOpen]);

    const closeMenu = () => setIsMenuOpen(false);

    const navVisible = isAtTop || scrollDirection === 'up' || isMenuOpen || isAccountOpen;

    return (
        <>
            {/* ── FLOATING GLASS CAPSULE NAVBAR (STATE 1) ─────────── */}
            <motion.header
                initial={{ y: -45, opacity: 0, filter: 'blur(16px)' }}
                animate={{
                    y: navVisible ? 0 : -80,
                    opacity: navVisible ? 1 : 0,
                    filter: navVisible ? 'blur(0px)' : 'blur(8px)',
                }}
                transition={{
                    duration: hasEntered ? 0.35 : 1.4,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="fixed top-4 sm:top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
            >
                <nav
                    aria-label="Main Navigation"
                    className="concierge-navbar pointer-events-auto flex w-full max-w-[1040px] items-center justify-between gap-2 rounded-pill px-3 py-2.5 sm:gap-4 sm:px-6 sm:py-3"
                >
                    {/* LEFT — Brand Logo */}
                    <Link
                        href="/"
                        aria-label="VeloraTravel Home"
                        className="group flex items-center gap-2.5 rounded-pill py-1 outline-none focus-visible:ring-2 focus-visible:ring-sky-500 sm:px-2"
                    >
                        <Image
                            src="/logo.svg"
                            alt="Velora Travel"
                            width={32}
                            height={32}
                            className="h-7 w-7 sm:h-8 sm:w-8 object-contain transition-transform group-hover:scale-105"
                            priority
                        />
                        <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.16em] text-[#2E3D48] uppercase">
                            Velora<span className="text-[#617C8C] font-sans text-sm ml-0.5">.</span>
                        </span>
                    </Link>

                    {/* CENTER — Navigation Links (Desktop) */}
                    <div className="hidden items-center gap-6 lg:flex xl:gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                            return (
                                <Link
                                    key={link.id}
                                    href={link.href}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={`rounded-pill px-1 py-2 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                                        isActive
                                            ? 'font-semibold text-[#25343F]'
                                            : 'text-[#35444F] hover:text-[#172630]'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}

                    </div>

                    {/* RIGHT — Auth Pill & Menu Trigger */}
                    <div className="flex items-center gap-2 sm:gap-2.5">
                        {user ? (
                            <NavbarAccountMenu user={user} open={isAccountOpen} onOpenChange={setIsAccountOpen} onSignOut={signOut} />
                        ) : (
                            <button
                                type="button"
                                onClick={signIn}
                                aria-label="Sign In"
                                className="hidden min-h-11 items-center justify-center rounded-pill bg-[#354653] px-5 text-sm font-medium text-[#F5F7F8] shadow-[0_4px_12px_rgba(40,58,71,0.16)] transition-colors hover:bg-[#273945] focus-visible:ring-2 focus-visible:ring-[#617C8C] sm:inline-flex"
                            >
                                Sign In
                            </button>
                        )}

                        {/* Drawer Toggle Button */}
                        <button
                            type="button"
                            onClick={() => { setIsAccountOpen(false); setIsMenuOpen(true); }}
                            aria-label="Open Menu Drawer"
                            aria-expanded={isMenuOpen}
                            aria-controls="concierge-menu-drawer"
                            className="flex h-11 w-11 items-center justify-center rounded-full text-[#35444F] transition-colors hover:bg-white/35 hover:text-[#172630] focus-visible:ring-2 focus-visible:ring-[#617C8C]"
                        >
                            <Menu className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* ── SLIDE-OVER CONCIERGE MENU DRAWER (STATE 2) ──────── */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={closeMenu}
                            className="fixed inset-0 z-[60] bg-ink/30 backdrop-blur-sm"
                        />

                        {/* Slide-over panel */}
                        <motion.aside
                            id="concierge-menu-drawer"
                            aria-label="More navigation" role="dialog" aria-modal="true"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.35, ease: easeOut }}
                            className="fixed inset-y-3 right-3 z-[70] flex w-[calc(100%-24px)] max-w-[420px] flex-col overflow-hidden rounded-[32px] border border-white/90 bg-[#FDFBF6] shadow-2xl"
                        >
                            <ConciergeMenu onClose={closeMenu} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
