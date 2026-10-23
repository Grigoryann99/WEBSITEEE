'use client';
export function track(type: 'place_view' | 'partner_click' | 'trip_created' | 'concierge_plan_generated', fields: Record<string, string | number> = {}) {
    try {
        if (localStorage.getItem('velora_cookie_consent') !== 'accepted') return;
        const target = window as Window & { gtag?: (...args: unknown[]) => void };
        target.gtag?.('event', type, fields);
    } catch { /* analytics must never interrupt a journey */ }
}
