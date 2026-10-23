'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, Eye, EyeOff, Loader2, Mail } from 'lucide-react';
import Dialog from '@/components/ui/Dialog';
import { browserSupabase } from '@/lib/supabase/client';
import { authProviders, safeReturnPath, supabaseConfigured } from '@/lib/supabase/config';
import ProviderIcon from './ProviderIcon';
import styles from './EmailAuth.module.css';

type Mode = 'signin' | 'signup' | 'reset';

export default function SignInDialog({ onClose, initialMode = 'signin', initialEmail = '' }: { onClose: () => void; initialMode?: Mode; initialEmail?: string }) {
    const [mode, setMode] = useState<Mode>(initialMode);
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [sent, setSent] = useState(false);
    const mounted = useRef(true);
    const previousMode = useRef<Mode>('signin');
    const emailInput = useRef<HTMLInputElement>(null);
    const successHeading = useRef<HTMLHeadingElement>(null);
    useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
    useEffect(() => {
        if (sent) successHeading.current?.focus({ preventScroll: true });
        else if (previousMode.current !== mode) emailInput.current?.focus({ preventScroll: true });
        previousMode.current = mode;
    }, [mode, sent]);

    const changeMode = (next: Mode) => { setMode(next); setError(''); setSent(false); setPassword(''); setShowPassword(false); };
    const callback = (reset = false) => {
        const url = new URL('/auth/callback', window.location.origin);
        url.searchParams.set('next', reset ? '/auth/reset-password' : safeReturnPath(window.location.pathname + window.location.search));
        return url.toString();
    };
    const google = async () => {
        const client = browserSupabase();
        if (!client || busy) return;
        setBusy(true); setError('');
        try {
            const { error: authError } = await client.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: callback() } });
            if (authError) throw authError;
        } catch { if (mounted.current) { setError('Google sign-in could not start. Please try again.'); setBusy(false); } }
    };
    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const client = browserSupabase();
        if (!client || busy) return;
        setBusy(true); setError('');
        try {
            if (mode === 'reset') {
                const { error: authError } = await client.auth.resetPasswordForEmail(email.trim(), { redirectTo: callback(true) });
                if (authError) throw authError;
                if (mounted.current) setSent(true);
            } else if (mode === 'signup') {
                const { data, error: authError } = await client.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: callback() } });
                if (authError) throw authError;
                if (!mounted.current) return;
                setPassword('');
                if (data.session) onClose();
                else setSent(true);
            } else {
                const { error: authError } = await client.auth.signInWithPassword({ email: email.trim(), password });
                if (authError) throw authError;
                if (mounted.current) { setPassword(''); onClose(); }
            }
        } catch (caught) {
            if (!mounted.current) return;
            const code = caught && typeof caught === 'object' && 'code' in caught ? String(caught.code) : '';
            if (code === 'email_not_confirmed') setError('Please confirm your email using the link in your inbox before signing in.');
            else if (code === 'over_email_send_rate_limit' || code === 'over_request_rate_limit') setError('Too many attempts. Please wait a few minutes and try again.');
            else if (code === 'weak_password') setError('Please choose a stronger password with letters, numbers and symbols.');
            else if (code === 'email_provider_disabled') setError('Email sign-in is temporarily unavailable. Please use Google or try again later.');
            else setError(mode === 'signin' ? 'Could not sign in. Check your email and password, or reset your password.' : 'Could not complete your request. Please check your details and try again.');
        } finally { if (mounted.current) setBusy(false); }
    };

    return <Dialog title={mode === 'reset' ? 'A fresh start.' : 'Your journey, saved'} onClose={onClose}>
        <div className={styles.auth}>
            <p className={styles.intro}>{mode === 'reset' ? 'Enter your email and we’ll send you a link to choose a new password.' : 'Keep your favorite places and travel plans together. Pick up where you left off, on any device.'}</p>
            {sent ? <div role="status" className={styles.success}>
                <span className={styles.successIcon}><Mail size={26} strokeWidth={1.4} aria-hidden="true" /></span>
                <h3 ref={successHeading} tabIndex={-1}>Check your inbox</h3>
                <p>{mode === 'reset' ? 'If an account exists for this email, you’ll receive a password reset link.' : 'If confirmation is needed for this address, you’ll receive an email with a link to activate your account.'}</p>
                <span className={styles.emailAddress}>{email}</span>
                <p className={styles.small}>Check your spam folder too. Open the link in this browser to finish.</p>
                <button type="button" onClick={() => changeMode('signin')} className={styles.primary}>Back to sign in<ArrowRight size={15} aria-hidden="true" /></button>
            </div> : <>
                {mode !== 'reset' && <>
                    <div className={styles.tabs} role="group" aria-label="Email account options"><button type="button" aria-pressed={mode === 'signin'} disabled={busy} onClick={() => changeMode('signin')}>Sign in</button><button type="button" aria-pressed={mode === 'signup'} disabled={busy} onClick={() => changeMode('signup')}>Create account</button></div>
                    {authProviders.includes('google') && <><button type="button" className={styles.google} disabled={busy || !supabaseConfigured} onClick={google}><ProviderIcon provider="google" /><span>Continue with Google</span><span aria-hidden="true" /></button><div className={styles.divider}><span>or continue with email</span></div></>}
                </>}
                <form onSubmit={submit} className={styles.form} aria-busy={busy}>
                    <label htmlFor="auth-email">Email address</label>
                    <input ref={emailInput} id="auth-email" type="email" autoComplete="email" inputMode="email" required maxLength={254} value={email} disabled={busy} placeholder="you@example.com" onChange={event => setEmail(event.target.value)} />
                    {mode !== 'reset' && <>
                        <div className={styles.passwordLabel}><label htmlFor="auth-password">Password</label>{mode === 'signin' && <button type="button" disabled={busy} onClick={() => changeMode('reset')}>Forgot password?</button>}</div>
                        <div className={styles.passwordWrap}><input id="auth-password" type={showPassword ? 'text' : 'password'} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} required minLength={mode === 'signup' ? 8 : 1} maxLength={128} value={password} disabled={busy} placeholder={mode === 'signup' ? 'Create a password' : 'Your password'} aria-describedby={mode === 'signup' ? 'auth-password-help' : undefined} onChange={event => setPassword(event.target.value)} /><button type="button" className={styles.reveal} disabled={busy} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={() => setShowPassword(value => !value)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>
                        {mode === 'signup' && <p id="auth-password-help" className={styles.hint}>At least 8 characters. Use a mix of letters, numbers and symbols.</p>}
                    </>}
                    {error && <p role="alert" className={styles.error}>{error}</p>}
                    {!supabaseConfigured && <p role="status" className={styles.error}>Account sign-in is being connected. Please try again later.</p>}
                    <button type="submit" className={styles.primary} disabled={busy || !supabaseConfigured}>{busy ? <><Loader2 size={17} className={styles.spinner} aria-hidden="true" />Please wait…</> : <>{mode === 'signup' ? 'Create account' : mode === 'reset' ? 'Send reset link' : 'Sign in with email'}<ArrowRight size={16} aria-hidden="true" /></>}</button>
                </form>
                {mode === 'reset' && <button type="button" className={styles.back} disabled={busy} onClick={() => changeMode('signin')}><ArrowLeft size={14} aria-hidden="true" />Back to sign in</button>}
            </>}
            <p className={styles.legal}><CheckCircle2 size={12} aria-hidden="true" /><span>Read our <Link href="/privacy-policy" onClick={onClose}>Privacy Policy</Link> and <Link href="/terms" onClick={onClose}>Terms of Service</Link>.</span></p>
        </div>
    </Dialog>;
}
