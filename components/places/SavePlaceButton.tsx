'use client';
import { useEffect, useRef, useState } from 'react';
import { Bookmark } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { browserSupabase } from '@/lib/supabase/client';

export default function SavePlaceButton({ placeId }: { placeId: string }) {
    const { user, signIn, loading: accountLoading } = useAuth();
    const userId = user?.id;
    const table = 'saved_places';
    const on = 'Saved', off = 'Save place', Icon = Bookmark;
    const err = 'Could not update your saved places. Please try again.';
    const [active, setActive] = useState(false), [busy, setBusy] = useState(false), [error, setError] = useState('');
    const [ready, setReady] = useState(false), [retry, setRetry] = useState(0);
    const version = useRef(0), changing = useRef(false);
    useEffect(() => {
        const current = ++version.current;
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);
        changing.current = false; setBusy(false); setActive(false); setReady(false); setError('');
        if (userId) {
            const load = async () => {
                try {
                    const client = browserSupabase(); if (!client) throw new Error();
                    const { data, error: loadError } = await client.from(table).select('place_id').eq('user_id', userId).eq('place_id', placeId).abortSignal(controller.signal).maybeSingle();
                    if (loadError) throw loadError;
                    if (current === version.current) { setActive(Boolean(data)); setReady(true); }
                } catch { if (current === version.current) setError('Could not check whether this place is saved. Please try again.'); }
                finally { clearTimeout(timer); }
            };
            void load();
        } else clearTimeout(timer);
        return () => { version.current = current + 1; controller.abort(); clearTimeout(timer); };
    }, [placeId, userId, table, retry]);
    return <div><button type="button" className="concierge-button" aria-pressed={active} disabled={accountLoading || busy || Boolean(user && !ready)} onClick={async () => {
        if (!user) { signIn(); return; }
        if (!ready || changing.current) return;
        const client = browserSupabase(); if (!client) return;
        changing.current = true;
        const current = version.current, wasActive = active;
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);
        setBusy(true); setError('');
        try {
            const { error: updateError } = wasActive ? await client.from(table).delete().eq('user_id', user.id).eq('place_id', placeId).abortSignal(controller.signal) : await client.from(table).upsert({ user_id: user.id, place_id: placeId }, { onConflict: 'user_id,place_id', ignoreDuplicates: true }).abortSignal(controller.signal);
            if (updateError) throw updateError;
            if (current === version.current) setActive(!wasActive);
        } catch { if (current === version.current) { setError(err); setReady(false); } }
        finally { clearTimeout(timer); if (current === version.current) { changing.current = false; setBusy(false); } }
    }}><Icon size={17} fill={active ? 'currentColor' : 'none'} />{busy ? 'Updating…' : user && !ready && !error ? 'Checking saved place…' : active ? on : off}</button>{error && <div role="alert" className="mt-2 text-xs text-red-700"><p>{error}</p><button type="button" onClick={() => setRetry(value => value + 1)} className="mt-2 min-h-9 underline">Try again</button></div>}</div>;
}
