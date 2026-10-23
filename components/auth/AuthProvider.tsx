'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { browserSupabase } from '@/lib/supabase/client';
import { supabaseConfigured } from '@/lib/supabase/config';
import { isCurrency } from '@/lib/currency/config';
import { useCurrency } from '@/components/currency/CurrencyProvider';
import SignInDialog from './SignInDialog';

type AuthState = { user: User | null; loading: boolean; signIn: () => void; signOut: () => Promise<void> };
const Context = createContext<AuthState | null>(null);
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(supabaseConfigured);
    const [open, setOpen] = useState(false);
    const { setCurrency } = useCurrency();
    const signIn = useCallback(() => setOpen(true), []);
    useEffect(() => {
        const client = browserSupabase();
        if (!client) return;
        let cancelled = false;
        client.auth.getUser().then(({ data }) => { if (!cancelled) { setUser(data.user); setLoading(false); } }).catch(() => { if (!cancelled) setLoading(false); });
        const { data } = client.auth.onAuthStateChange((_event, session) => { setUser(session?.user || null); setLoading(false); if (session?.user) setOpen(false); });
        return () => { cancelled = true; data.subscription.unsubscribe(); };
    }, []);
    useEffect(() => {
        if (!user) return;
        let active = true;
        browserSupabase()?.from('profiles').select('currency').eq('id', user.id).maybeSingle().then(({ data }) => { if (active && isCurrency(data?.currency)) setCurrency(data.currency); });
        const sync = (event: Event) => {
            const currency: unknown = (event as CustomEvent).detail;
            if (isCurrency(currency)) void browserSupabase()?.from('profiles').upsert({ id: user.id, currency });
        };
        window.addEventListener('velora:currency', sync);
        return () => { active = false; window.removeEventListener('velora:currency', sync); };
    }, [user, setCurrency]);
    const signOut = async () => { const { error } = await browserSupabase()!.auth.signOut(); if (error) throw error; setUser(null); };
    return <Context.Provider value={{ user, loading, signIn, signOut }}>{children}{open && <SignInDialog onClose={() => setOpen(false)} />}</Context.Provider>;
}
export function useAuth() { const ctx = useContext(Context); if (!ctx) throw new Error('AuthProvider missing'); return ctx; }
