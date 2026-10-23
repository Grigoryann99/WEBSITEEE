'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);
    const banner = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = banner.current;
        const report = () => window.dispatchEvent(new CustomEvent('velora:cookie-height', { detail: element ? Math.ceil(window.innerHeight - element.getBoundingClientRect().top) : 0 }));
        report();
        if (!element) return;
        const observer = new ResizeObserver(report);
        observer.observe(element);
        window.addEventListener('resize', report);
        return () => { observer.disconnect(); window.removeEventListener('resize', report); window.dispatchEvent(new CustomEvent('velora:cookie-height', { detail: 0 })); };
    }, [visible]);

    useEffect(() => {
        let consent = null;
        try { consent = localStorage.getItem('velora_cookie_consent'); } catch { /* ask without storage */ }
        const reopen = () => setVisible(true);
        window.addEventListener('velora:cookie-settings', reopen);
        if (!consent) {
            // Slight delay so it doesn't flash immediately on load
            const timer = setTimeout(() => setVisible(true), 1500);
            return () => { clearTimeout(timer); window.removeEventListener('velora:cookie-settings', reopen); };
        }
        return () => window.removeEventListener('velora:cookie-settings', reopen);
    }, []);

    const accept = () => {
        try { localStorage.setItem('velora_cookie_consent', 'accepted'); } catch { /* storage unavailable */ }
        window.dispatchEvent(new Event('velora:consent'));
        setVisible(false);
    };

    const decline = () => {
        const target = window as Window & { gtag?: (...args: unknown[]) => void };
        target.gtag?.('consent', 'update', { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
        document.cookie.split(';').forEach(cookie => {
            const name = cookie.trim().split('=')[0];
            if (!/^(_ga|_gid|_gat|__gads|__gpi)/.test(name)) return;
            ['', window.location.hostname, `.${window.location.hostname}`].forEach(domain => { document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ''}`; });
        });
        try { localStorage.setItem('velora_cookie_consent', 'essential_only'); } catch { /* storage unavailable */ }
        window.dispatchEvent(new Event('velora:consent'));
        // Reload after revocation so previously loaded third-party scripts stop executing.
        if (document.querySelector('#google-analytics-consented')) window.location.reload();
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div ref={banner} className={styles.position}>
            <section className={styles.banner} aria-labelledby="cookie-choices-title" aria-describedby="cookie-choices-description" data-lenis-prevent>
                <div className={styles.icon} aria-hidden="true"><Cookie size={24} strokeWidth={1.5} /></div>
                <div className={styles.copy}>
                    <h2 id="cookie-choices-title">Your cookie choices</h2>
                    <p id="cookie-choices-description">We use cookies to improve your experience and understand how the site is used. Choose essential cookies only, or accept all cookies.</p>
                    <div className={styles.links}>
                        <Link href="/cookies">Cookie policy</Link>
                        <span aria-hidden="true">·</span>
                        <Link href="/privacy-policy">Privacy policy</Link>
                    </div>
                </div>
                <div className={styles.actions}>
                    <button onClick={decline} className={styles.essential}>Essential only</button>
                    <button onClick={accept} className={styles.accept}>Accept all</button>
                </div>
            </section>
        </div>
    );
}
