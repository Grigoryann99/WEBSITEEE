'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeId, setActiveId] = useState('');
    const pathname = usePathname();
    const router = useRouter();

    const navLinks = [
        { name: 'Home', href: '/', id: 'home' },
        { name: 'Destinations', href: '/destinations', id: 'destinations' },
        { name: 'Blog', href: '/blog', id: 'blog' },
        { name: 'About', href: '/about', id: 'about' },
        { name: 'Support', href: '/support', id: 'contact' },
    ];

    // Initialize active state based on route
    useEffect(() => {
        if (pathname?.startsWith('/destinations')) {
            setActiveId('destinations');
        } else if (pathname?.startsWith('/blog')) {
            setActiveId('blog');
        } else if (pathname === '/about') {
            setActiveId('about');
        } else if (pathname === '/support') {
            setActiveId('contact');
        } else if (pathname === '/') {
            if (!activeId || !['contact', 'villas'].includes(activeId)) {
                setActiveId('home');
            }
        }
    }, [pathname, activeId]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Visibility logic
            if (currentScrollY > 100) {
                if (currentScrollY > lastScrollY && !isMenuOpen) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            } else {
                setIsVisible(true);
            }

            // Glassmorphism activation
            setIsScrolled(currentScrollY > 20);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isMenuOpen]);

    // Active Section Highlighting
    useEffect(() => {
        if (pathname !== '/') return;

        const sections = ['home', 'villas', 'footer'];
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id === 'footer' ? 'contact' : entry.target.id;
                    setActiveId(id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [pathname]);

    const handleLogoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveId('home');
        } else {
            router.push('/');
        }
    }, [pathname, router]);

    const handleNavLinkClick = (id: string) => {
        setActiveId(id);
        if (isMenuOpen) setIsMenuOpen(false);
    };

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-700 ease-luxury
                    ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} 
                    ${isScrolled || isMenuOpen
                        ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3 sm:py-4'
                        : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6 sm:py-8'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    
                    {/* LOGO */}
                    <a
                        href="#"
                        onClick={handleLogoClick}
                        className="flex items-center gap-2 group transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-lg"
                        aria-label="Go to homepage"
                    >
                        <div className="relative">
                            <Image
                                src="/logo_final.png"
                                alt="Velora Logo"
                                width={isScrolled ? 48 : 56}
                                height={isScrolled ? 48 : 56}
                                className="w-auto h-auto transition-all duration-500 relative z-10"
                            />
                        </div>
                        <div className={`font-montserrat tracking-[0.25em] font-semibold flex items-center transition-all duration-300 ${isScrolled ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'} text-brand-light`}>
                            VELORA<span className="text-brand-accent">.</span>
                        </div>
                    </a>

                    {/* DESKTOP LINKS */}
                    <div className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-2 py-1.5 shadow-inner backdrop-blur-md">
                        {navLinks.map((link) => {
                            let isActive = false;
                            if (link.id === 'destinations') {
                                isActive = pathname?.startsWith('/destinations') || false;
                            } else if (link.id === 'contact') {
                                isActive = pathname === '/support' || (pathname === '/' && activeId === 'contact');
                            } else {
                                isActive = activeId === link.id;
                            }

                            return (
                                <Link
                                    key={link.id}
                                    href={link.href}
                                    onClick={() => handleNavLinkClick(link.id)}
                                    // Pill style active state
                                    className={`relative px-5 py-2 rounded-full font-sans text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand-accent flex items-center justify-center
                                        ${isActive 
                                            ? 'bg-brand-accent/20 text-brand-accent shadow-[0_0_15px_rgba(29,158,117,0.3)]' 
                                            : 'text-brand-light/70 hover:text-brand-light hover:-translate-y-0.5 hover:bg-white/5'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* CTA BUTTON & MOBILE MENU TOGGLE */}
                    <div className="flex items-center gap-4">
                        <Link 
                            href="/destinations"
                            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-brand-accent text-[#0a0a0a] font-sans text-xs uppercase tracking-[0.15em] font-semibold rounded-full hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_15px_rgba(29,158,117,0.4)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.3)] outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                            aria-label="Start your journey"
                        >
                            Start Journey
                        </Link>

                        <button
                            className="lg:hidden p-2 rounded-xl border border-white/10 bg-white/5 text-brand-light transition-all active:scale-95 hover:bg-white/10 outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle mobile menu"
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <X size={22} className="text-brand-accent" /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* MOBILE MENU DROPDOWN */}
            <div
                className={`fixed inset-0 z-40 lg:hidden flex flex-col justify-start pt-28 px-6 bg-[#0a0a0a]/95 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
                    isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-8 pointer-events-none'
                }`}
            >
                <div className="flex flex-col gap-4 mb-10 w-full">
                    {navLinks.map((link, index) => {
                        let isActive = false;
                        if (link.id === 'destinations') {
                            isActive = pathname?.startsWith('/destinations') || false;
                        } else if (link.id === 'contact') {
                            isActive = pathname === '/support' || (pathname === '/' && activeId === 'contact');
                        } else {
                            isActive = activeId === link.id;
                        }

                        return (
                            <Link
                                key={link.id}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-500 transform
                                    ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}
                                    ${isActive 
                                        ? 'bg-brand-accent/10 border-brand-accent/40 text-brand-accent' 
                                        : 'bg-white/5 border-white/5 text-brand-light/80 hover:bg-white/10'
                                    }`}
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                <span className="font-serif text-2xl">{link.name}</span>
                                {isActive && <div className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(29,158,117,0.8)]" />}
                            </Link>
                        );
                    })}
                </div>

                <div 
                    className={`w-full mt-auto mb-12 transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: '300ms' }}
                >
                    <Link
                        href="/destinations"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center w-full py-4 bg-brand-accent text-[#0a0a0a] rounded-full font-sans tracking-[0.2em] uppercase font-semibold text-sm shadow-[0_4px_20px_rgba(29,158,117,0.4)]"
                    >
                        Start Journey
                    </Link>
                </div>
            </div>
        </>
    );
}
