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

    // Map pathname/sections to internal IDs
    const navLinks = [
        { name: 'Home', href: '/', id: 'home' },
        { name: 'Global News', href: '/news', id: 'news' },
        { name: 'Destinations', href: '/destinations', id: 'destinations' },
        { name: 'Blog', href: '/blog', id: 'blog' },
        { name: 'About', href: '/about', id: 'about' },
        { name: 'Contact Us', href: '/contact', id: 'contact' },
    ];

    // Initialize active state based on route
    useEffect(() => {
        if (pathname === '/news') {
            setActiveId('news');
        } else if (pathname === '/destinations') {
            setActiveId('destinations');
        } else if (pathname === '/contact') {
            setActiveId('contact');
        } else if (pathname === '/') {
            // Default to home on homepage if no specific section is tracked yet
            if (!activeId || !['contact', 'villas'].includes(activeId)) {
                setActiveId('home');
            }
        }
    }, [pathname, activeId]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Visibility logic: hide on scroll down, show on scroll up
            if (currentScrollY > 100) {
                if (currentScrollY > lastScrollY && !isMenuOpen) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            } else {
                setIsVisible(true);
            }

            // Style logic: dynamic transparency and shadow
            setIsScrolled(currentScrollY > 50);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isMenuOpen]);

    // Intersection Observer for Active Section Highlighting (Homepage only)
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
                className={`fixed top-0 w-full z-50 transition-all duration-700 ease-luxury px-6 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                    } ${isScrolled || isMenuOpen
                        ? 'bg-[#0f0f0f] py-4 shadow-md'
                        : 'bg-transparent py-8'
                    }`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <a
                        href="#"
                        onClick={handleLogoClick}
                        className="flex items-center space-x-1.5 group transition-all duration-300"
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
                        <div className={`font-montserrat tracking-widest flex items-center transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-2xl'} text-brand-light`}>
                            VELORA<span className="text-brand-accent">.</span>
                        </div>
                    </a>

                    <div className="hidden md:flex space-x-10 items-center text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-brand-light/70">
                        {navLinks.map((link) => {
                            let isActive = false;
                            if (link.id === 'destinations') {
                                isActive = pathname?.startsWith('/destinations') || false;
                            } else if (link.id === 'contact') {
                                isActive = pathname === '/contact' || (pathname === '/' && activeId === 'contact');
                            } else {
                                isActive = activeId === link.id;
                            }
                            const activeClass = 'text-brand-light';

                            return (
                                <Link
                                    key={link.id}
                                    href={link.href}
                                    onClick={() => handleNavLinkClick(link.id)}
                                    className={`relative py-2 transition-all duration-300 hover:${activeClass} group ${isActive ? `text-brand-accent !${activeClass}` : ''}`}
                                >
                                    {link.name}
                                    <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-brand-accent transform transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`}></span>
                                </Link>
                            );
                        })}


                    </div>

                    <button
                        className="md:hidden p-2 rounded-full transition-colors text-brand-light hover:bg-brand-light/5"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black z-40 transition-all duration-500 ease-custom md:hidden flex flex-col justify-center items-center space-y-12 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                {navLinks.map((link, index) => (
                    <a
                        key={link.id}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`font-serif text-5xl text-brand-light hover:text-brand-accent transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        {link.name}
                    </a>
                ))}

            </div>
        </>
    );
}
