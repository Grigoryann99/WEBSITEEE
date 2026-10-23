'use client';
import { useEffect, useState } from 'react';
import Script from 'next/script';
export default function ConsentScripts() {
    const [accepted, setAccepted] = useState(false);
    useEffect(() => {
        const sync = () => { try { setAccepted(localStorage.getItem('velora_cookie_consent') === 'accepted'); } catch { setAccepted(false); } };
        sync(); window.addEventListener('velora:consent', sync); window.addEventListener('storage', sync);
        return () => { window.removeEventListener('velora:consent', sync); window.removeEventListener('storage', sync); };
    }, []);
    if (!accepted) return null;
    return <><Script src="https://www.googletagmanager.com/gtag/js?id=G-9GPGCR7W9T" strategy="afterInteractive" /><Script id="google-analytics-consented" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('consent','default',{'ad_storage':'granted','analytics_storage':'granted','ad_user_data':'granted','ad_personalization':'granted'}); gtag('js',new Date()); gtag('config','G-9GPGCR7W9T');`}</Script><Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1654457169304666" crossOrigin="anonymous" strategy="afterInteractive" /></>;
}
