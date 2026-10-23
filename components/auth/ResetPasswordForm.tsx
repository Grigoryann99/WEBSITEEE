'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { browserSupabase } from '@/lib/supabase/client';
import styles from './EmailAuth.module.css';

export default function ResetPasswordForm() {
    const { user, loading, signIn } = useAuth();
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [saved, setSaved] = useState(false);
    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const client = browserSupabase();
        if (!client || !user || busy) return;
        if (password !== confirmation) { setError('Your passwords do not match. Please try again.'); return; }
        setBusy(true); setError('');
        try {
            const { error: authError } = await client.auth.updateUser({ password });
            if (authError) throw authError;
            setPassword(''); setConfirmation(''); setSaved(true);
        } catch { setError('Could not update your password. Use a strong, new password, or request another reset link.'); }
        finally { setBusy(false); }
    };
    return <div className={styles.auth}>{loading ? <p role="status" className={styles.intro}>Checking your reset link…</p> : saved ? <div role="status" className={styles.success}><span className={styles.successIcon}><CheckCircle2 size={26} /></span><h3>Password updated</h3><p>Your new password is ready to use.</p><Link href="/account" className={styles.primary}>Open my account<ArrowRight size={16} /></Link></div> : !user ? <><p className={styles.intro}>Open the password reset link from your inbox in the same browser. If the link has expired, request a new one from “Forgot password?”.</p><button className={styles.primary} onClick={signIn}>Back to sign in<ArrowRight size={16} /></button></> : <><p className={styles.intro}>Choose a new password for your VeloraTravel account.</p><form onSubmit={submit} className={styles.form}><label htmlFor="new-password">New password</label><input id="new-password" type="password" autoComplete="new-password" minLength={8} maxLength={128} required value={password} disabled={busy} onChange={event => setPassword(event.target.value)} /><p className={styles.hint}>At least 8 characters. Use letters, numbers and symbols.</p><label htmlFor="confirm-password" className="mt-5">Confirm new password</label><input id="confirm-password" type="password" autoComplete="new-password" minLength={8} maxLength={128} required value={confirmation} disabled={busy} onChange={event => setConfirmation(event.target.value)} />{error && <p role="alert" className={styles.error}>{error}</p>}<button className={styles.primary} type="submit" disabled={busy}>{busy ? <Loader2 size={17} className={styles.spinner} /> : <ArrowRight size={16} />}{busy ? 'Saving…' : 'Save new password'}</button></form></>}</div>;
}
