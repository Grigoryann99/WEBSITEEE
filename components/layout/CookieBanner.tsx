'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('velora_cookie_consent');
        if (!consent) {
            // Slight delay so it doesn't flash immediately on load
            const timer = setTimeout(() => setVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const accept = () => {
        localStorage.setItem('velora_cookie_consent', 'accepted');
        setVisible(false);
    };

    const decline = () => {
        localStorage.setItem('velora_cookie_consent', 'essential_only');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-fade-in-up">
            <div className="max-w-4xl mx-auto bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center backdrop-blur-xl">
                {/* Icon */}
                <div className="flex-shrink-0 text-2xl">🍪</div>

                {/* Text */}
                <div className="flex-grow">
                    <p className="font-sans font-medium text-brand-light text-sm mb-1">We use cookies</p>
                    <p className="font-sans text-brand-light/50 text-xs font-light leading-relaxed">
                        We use cookies to improve your experience and for analytics. By clicking &quot;Accept All&quot;, you consent to our use of cookies.{' '}
                        <Link href="/cookies" className="text-brand-accent underline underline-offset-2 hover:text-brand-light transition-colors">
                            Cookie Policy
                        </Link>{' '}·{' '}
                        <Link href="/privacy-policy" className="text-brand-accent underline underline-offset-2 hover:text-brand-light transition-colors">
                            Privacy Policy
                        </Link>
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
                    <button
                        onClick={decline}
                        className="font-sans text-xs tracking-widest uppercase text-brand-light/50 border border-white/10 px-5 py-3 rounded-full hover:border-white/30 hover:text-brand-light transition-all duration-300 whitespace-nowrap"
                    >
                        Essential Only
                    </button>
                    <button
                        onClick={accept}
                        className="font-sans text-xs tracking-widest uppercase bg-brand-accent text-brand-dark px-5 py-3 rounded-full hover:bg-brand-accent/90 transition-all duration-300 whitespace-nowrap font-medium"
                    >
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
}
