'use client';

import { useEffect, useRef, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bookmark, LogOut, Map, Settings } from 'lucide-react';

const accountLinks = [
    { label: 'My trips', href: '/account#my-trips', icon: Map },
    { label: 'Saved places', href: '/account/saved', icon: Bookmark },
    { label: 'Account', href: '/account/settings#account', icon: Settings },
];

export default function NavbarAccountMenu({ user, open, onOpenChange, onSignOut }: {
    user: User; open: boolean; onOpenChange: (open: boolean) => void; onSignOut: () => Promise<void>;
}) {
    const root = useRef<HTMLDivElement>(null), trigger = useRef<HTMLButtonElement>(null);
    const pathname = usePathname();
    const [failedAvatar, setFailedAvatar] = useState(false), [busy, setBusy] = useState(false), [error, setError] = useState('');
    const name = typeof user.user_metadata?.full_name === 'string' ? user.user_metadata.full_name : 'Traveler';
    const rawAvatar: unknown = user.user_metadata?.avatar_url || user.user_metadata?.picture;
    const avatar = typeof rawAvatar === 'string' && /^https:\/\//i.test(rawAvatar) ? rawAvatar : null;
    const initial = (name === 'Traveler' ? user.email || name : name).trim().charAt(0).toUpperCase();

    useEffect(() => { onOpenChange(false); }, [pathname, onOpenChange]);
    useEffect(() => { setFailedAvatar(false); }, [avatar]);
    useEffect(() => {
        if (!open) return;
        setError('');
        const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) onOpenChange(false); };
        const escape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') { event.preventDefault(); onOpenChange(false); trigger.current?.focus(); }
        };
        document.addEventListener('pointerdown', outside);
        document.addEventListener('keydown', escape);
        return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
    }, [open, onOpenChange]);

    return <div ref={root} className="relative" onBlur={event => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) onOpenChange(false);
    }}>
        <button ref={trigger} type="button" aria-label="Open account shortcuts" aria-expanded={open} aria-controls="navbar-account-shortcuts" onClick={() => onOpenChange(!open)} className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-white/90 bg-[#354653] text-sm font-semibold text-white shadow-[0_4px_12px_rgba(40,58,71,0.16)] transition-shadow hover:ring-2 hover:ring-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
            {avatar && !failedAvatar ? <>
                {/* Provider avatars stay unoptimized and never send a referrer. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={avatar} alt="" referrerPolicy="no-referrer" onError={() => setFailedAvatar(true)} className="h-full w-full object-cover" />
            </> : <span aria-hidden="true">{initial}</span>}
        </button>
        {open && <div id="navbar-account-shortcuts" className="absolute right-0 top-[calc(100%+14px)] w-[min(280px,calc(100vw-88px))] overflow-hidden rounded-[26px] border border-white/90 bg-[#FBF9F3] p-2 text-[#354653] shadow-[0_16px_48px_rgba(30,53,70,0.2)]">
            <div className="border-b border-[#DEE8EC] px-3 py-3"><p className="break-words text-sm font-semibold">{name}</p><p className="mt-1 text-[11px] text-[#718391]">Your travel notebook</p></div>
            <nav aria-label="Account shortcuts" className="space-y-1 py-2">{accountLinks.map(link => <Link key={link.href} href={link.href} onClick={() => onOpenChange(false)} className="flex min-h-11 items-center gap-3 rounded-[18px] px-3 py-2 text-sm transition-colors hover:bg-[#E3F0F8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"><link.icon aria-hidden="true" size={17} strokeWidth={1.6} />{link.label}</Link>)}</nav>
            <div className="border-t border-[#DEE8EC] pt-1"><button type="button" disabled={busy} className="flex min-h-11 w-full items-center gap-3 rounded-[18px] px-3 py-2 text-left text-sm text-[#718391] transition-colors hover:bg-white disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600" onClick={async () => {
                setBusy(true); setError('');
                try { await onSignOut(); onOpenChange(false); }
                catch { setError('Could not sign out. Please try again.'); }
                finally { setBusy(false); }
            }}><LogOut aria-hidden="true" size={17} strokeWidth={1.6} />{busy ? 'Signing out…' : 'Sign out'}</button></div>
            {error && <p role="alert" className="px-3 py-2 text-xs text-red-700">{error}</p>}
        </div>}
    </div>;
}
