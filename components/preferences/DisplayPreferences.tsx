'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MotionConfig } from 'framer-motion';

type Preferences = { chatTextSize: 'standard' | 'large'; motion: 'system' | 'reduced' };
const defaults: Preferences = { chatTextSize: 'standard', motion: 'system' };
const key = 'velora.display-preferences';
function read(value: unknown): Preferences {
    if (!value || typeof value !== 'object') return defaults;
    const data = value as Record<string, unknown>;
    return { chatTextSize: data.chatTextSize === 'large' ? 'large' : 'standard', motion: data.motion === 'reduced' ? 'reduced' : 'system' };
}
type Value = Preferences & { reducedMotion: boolean; persistent: boolean; update: (patch: Partial<Preferences>) => void };
const Context = createContext<Value | null>(null);

export function DisplayPreferencesProvider({ children }: { children: React.ReactNode }) {
    const [preferences, setPreferences] = useState<Preferences>(defaults);
    const [deviceReducedMotion, setDeviceReducedMotion] = useState(false);
    const [ready, setReady] = useState(false);
    const [persistent, setPersistent] = useState(true);
    useEffect(() => {
        try { setPreferences(read(JSON.parse(localStorage.getItem(key) || 'null'))); } catch { setPersistent(false); }
        setReady(true);
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => setDeviceReducedMotion(media.matches);
        sync();
        // Older iOS browsers expose MediaQueryList's legacy listener API only.
        if (typeof media.addEventListener === 'function') media.addEventListener('change', sync);
        else media.addListener(sync);
        const storage = (event: StorageEvent) => {
            if (event.key !== key) return;
            try { setPreferences(read(JSON.parse(event.newValue || 'null'))); } catch { /* keep valid current choices */ }
        };
        window.addEventListener('storage', storage);
        return () => {
            if (typeof media.removeEventListener === 'function') media.removeEventListener('change', sync);
            else media.removeListener(sync);
            window.removeEventListener('storage', storage);
        };
    }, []);
    const reducedMotion = preferences.motion === 'reduced' || deviceReducedMotion;
    useEffect(() => {
        document.documentElement.dataset.veloraReduceMotion = String(reducedMotion);
        if (preferences.chatTextSize === 'large') document.documentElement.style.setProperty('--velora-chat-text-size', '16px');
        else document.documentElement.style.removeProperty('--velora-chat-text-size');
        if (ready) {
            try { localStorage.setItem(key, JSON.stringify(preferences)); setPersistent(true); } catch { setPersistent(false); }
        }
    }, [preferences, reducedMotion, ready]);
    const update = useCallback((patch: Partial<Preferences>) => setPreferences(current => read({ ...current, ...patch })), []);
    const value = useMemo(() => ({ ...preferences, reducedMotion, persistent, update }), [preferences, reducedMotion, persistent, update]);
    return <Context.Provider value={value}><MotionConfig reducedMotion={reducedMotion ? 'always' : 'user'}>{children}</MotionConfig></Context.Provider>;
}

export function useDisplayPreferences() {
    const value = useContext(Context);
    if (!value) throw new Error('Display preferences provider missing');
    return value;
}
