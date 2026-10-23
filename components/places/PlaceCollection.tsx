'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Bookmark, ArrowUpRight, X } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { browserSupabase } from '@/lib/supabase/client';
import { placeById } from '@/lib/places/catalog';
import PlacePhoto from './PlacePhoto';

export default function PlaceCollection() {
    const { user, signIn, loading } = useAuth();
    const userId = user?.id;
    const table = 'saved_places', eyebrow = 'Your notebook', title = 'Saved places', Icon = Bookmark;
    const empty = 'Nothing saved yet. Tap the bookmark on any place to keep it here.';
    const [ids, setIds] = useState<string[] | null>(null), [error, setError] = useState('');
    const [retry, setRetry] = useState(0), [removing, setRemoving] = useState<string[]>([]);
    const version = useRef(0), pending = useRef(new Set<string>());
    useEffect(() => {
        const current = ++version.current;
        pending.current.clear(); setRemoving([]);
        setIds(null); setError(''); if (!userId) return;
        const client = browserSupabase(); if (!client) { setError('Your account is unavailable right now.'); return; }
        const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 15000);
        const load = async () => {
            try {
                const { data, error } = await client.from(table).select('place_id').eq('user_id', userId).order('created_at', { ascending: false }).abortSignal(controller.signal);
                if (error) throw error;
                if (current === version.current) setIds((data || []).map(row => row.place_id));
            } catch { if (current === version.current) setError('Could not load your places. Please try again.'); }
            finally { clearTimeout(timer); }
        };
        void load();
        return () => { version.current = current + 1; controller.abort(); clearTimeout(timer); };
    }, [userId, table, retry]);
    const remove = async (id: string) => {
        const client = browserSupabase(); if (!client || !user) return;
        if (pending.current.has(id)) return;
        pending.current.add(id); setRemoving(list => [...list, id]); setError('');
        const current = version.current;
        const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 15000);
        try {
            const { error } = await client.from(table).delete().eq('user_id', user.id).eq('place_id', id).abortSignal(controller.signal);
            if (error) throw error;
            if (current === version.current) setIds(list => (list || []).filter(x => x !== id));
        } catch { if (current === version.current) setError('Could not remove this place. Please try again.'); }
        finally { clearTimeout(timer); if (current === version.current) { pending.current.delete(id); setRemoving(list => list.filter(value => value !== id)); } }
    };
    const places = (ids || []).map(id => placeById.get(id)).filter(Boolean) as NonNullable<ReturnType<typeof placeById.get>>[];
    return <main className="concierge-surface min-h-screen px-5 pb-20 pt-32"><div className="mx-auto max-w-5xl">
        <p className="concierge-eyebrow">{eyebrow}</p>
        <h1 className="mt-4 flex items-center gap-4 font-serif text-4xl sm:text-6xl"><Icon size={38} strokeWidth={1.4} className="text-sky-700" />{title}</h1>
        <div className="mt-6 flex flex-wrap gap-3"><Link href="/account" className="concierge-button">My notebook</Link></div>
        {!user ? <div className="mt-8 rounded-card border border-sky-200 bg-white p-8"><p className="max-w-lg text-ink-500">Sign in to see your {title.toLowerCase()} on any device.</p><button className="concierge-button concierge-button-primary mt-6" onClick={signIn} disabled={loading}>{loading ? 'Checking your account…' : 'Sign in'}</button></div>
            : ids === null && !error ? <p className="mt-8 text-sm text-ink-500">Loading…</p>
            : !places.length && !error ? <div className="mt-8 rounded-card bg-white p-8"><p className="max-w-lg text-ink-500">{empty}</p><Link href="/destinations/italy/rome" className="concierge-button concierge-button-primary mt-6">Explore Rome</Link></div>
            : <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{places.map(place => { return <li key={place.id} className="group relative overflow-hidden rounded-card bg-white shadow-sm">
                <Link href={`/destinations/italy/rome?section=${encodeURIComponent(place.section)}&place=${encodeURIComponent(place.id)}`} className="block"><div className="relative h-44 bg-sky-50"><PlacePhoto id={place.id} name={place.name} /></div>
                    <div className="p-5"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-500">{place.subcategory} · {place.district}</p><h2 className="mt-2 flex items-center justify-between gap-3 font-serif text-xl">{place.name}<ArrowUpRight size={16} /></h2></div></Link>
                <button type="button" aria-label={`Remove ${place.name}`} disabled={removing.includes(place.id)} onClick={() => remove(place.id)} className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-500 shadow-sm hover:bg-white disabled:opacity-40"><X size={16} /></button>
            </li>; })}</ul>}
        {user && ids && places.length < ids.length && <p className="mt-5 text-sm text-ink-500">Some saved places are no longer in the current guide.</p>}
        {error && <div role="alert" className="mt-5 text-red-700"><p>{error}</p><button type="button" onClick={() => setRetry(value => value + 1)} className="mt-2 min-h-10 text-sm underline">Reload saved places</button></div>}
    </div></main>;
}
