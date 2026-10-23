'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Bookmark, Check, ChevronRight, CircleHelp, Globe2, Loader2, LockKeyhole, LogOut, Mail, Map, Search, Settings2, ShieldCheck, Sparkles, UserRound, X } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { browserSupabase } from '@/lib/supabase/client';
import { useCurrency } from '@/components/currency/CurrencyProvider';
import CurrencySwitcher from '@/components/currency/CurrencySwitcher';
import { useDisplayPreferences } from '@/components/preferences/DisplayPreferences';
import SignInDialog from './SignInDialog';
import styles from './SettingsWorkspace.module.css';

const sections = [
    { id: 'general', name: 'General', subtitle: 'Reading, display & motion', icon: Settings2 },
    { id: 'account', name: 'Account', subtitle: 'Your profile & sign-in', icon: UserRound },
    { id: 'travel', name: 'Travel preferences', subtitle: 'Currency & your notebook', icon: Globe2 },
    { id: 'privacy', name: 'Privacy & cookies', subtitle: 'Your choices, explained', icon: ShieldCheck },
] as const;
type Section = typeof sections[number]['id'];
const searchable = [
    { section: 'general', title: 'AI message text size', detail: 'Standard or large text in concierge replies' },
    { section: 'general', title: 'Interface motion', detail: 'Animations, smooth scrolling and background videos' },
    { section: 'account', title: 'Profile name', detail: 'Update the name shown in your account' },
    { section: 'account', title: 'Email and password', detail: 'Sign-in email and password reset' },
    { section: 'travel', title: 'Display currency', detail: 'Prices and planning estimates in your currency' },
    { section: 'travel', title: 'Journeys and saved places', detail: 'Return to your travel notebook' },
    { section: 'privacy', title: 'Cookie preferences', detail: 'Essential and optional analytics cookies' },
    { section: 'privacy', title: 'AI conversations and privacy', detail: 'How your messages are used' },
] satisfies { section: Section; title: string; detail: string }[];

export default function SettingsWorkspace() {
    const { user, loading, signIn, signOut } = useAuth();
    const { currency, convertFrom, fx } = useCurrency();
    const preferences = useDisplayPreferences();
    const [section, setSection] = useState<Section>('general');
    const [query, setQuery] = useState('');
    const [name, setName] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');
    const [resetOpen, setResetOpen] = useState(false);
    const activeRequest = useRef(0);
    const rawName: unknown = user?.user_metadata?.full_name || user?.user_metadata?.name;
    const currentName = typeof rawName === 'string' ? rawName : '';
    const invalidate = useCallback(() => { activeRequest.current++; }, []);
    const selected = sections.find(item => item.id === section)!;
    const results = searchable.filter(item => `${item.title} ${item.detail} ${item.section}`.toLowerCase().includes(query.trim().toLowerCase()));
    useEffect(() => {
        const update = () => { const hash = window.location.hash.slice(1); setSection(sections.some(item => item.id === hash) ? hash as Section : 'general'); };
        update(); window.addEventListener('hashchange', update);
        return () => window.removeEventListener('hashchange', update);
    }, []);
    useEffect(() => { setName(currentName); }, [currentName]);
    useEffect(() => { setError(''); setNotice(''); setBusy(false); setResetOpen(false); invalidate(); return invalidate; }, [user?.id, invalidate]);
    const navigate = (id: Section, fromSearch = false) => {
        setSection(id); setQuery(''); setError(''); setNotice('');
        window.history.replaceState(null, '', `${window.location.pathname}#${id}`);
        if (fromSearch) requestAnimationFrame(() => document.getElementById('settings-section-title')?.focus({ preventScroll: true }));
    };
    const saveName = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const value = name.trim();
        const client = browserSupabase();
        if (!user || !client || busy || !value || value.length > 60) return;
        const version = ++activeRequest.current;
        setBusy(true); setError(''); setNotice('');
        try {
            const { error: profileError } = await client.auth.updateUser({ data: { full_name: value } });
            if (version !== activeRequest.current) return;
            if (profileError) throw profileError;
            setNotice('Your profile name has been updated.');
        } catch { if (version === activeRequest.current) setError('Your name could not be updated. Please try again.'); }
        finally { if (version === activeRequest.current) setBusy(false); }
    };

    return <main className={styles.surface}><div className={styles.page}>
        <header className={styles.pageHeader}><div><span className={styles.eyebrow}>YOUR VELORA, YOUR WAY</span><h1>The little details.</h1><p>A few preferences for a journey that feels like you.</p></div><Link href="/account" className={styles.back}><ArrowLeft size={14} aria-hidden="true" />Your travel notebook</Link></header>
        <div className={styles.workspace}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarBrand}><span><Settings2 size={20} aria-hidden="true" /></span><div><strong>Settings</strong><small>Make yourself at home.</small></div></div>
                <div className={styles.search}><Search size={15} aria-hidden="true" /><label htmlFor="settings-search" className="sr-only">Search settings</label><input id="settings-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search settings" maxLength={100} />{query && <button onClick={() => setQuery('')} aria-label="Clear settings search"><X size={13} /></button>}</div>
                <p className={styles.navLabel}>PREFERENCES</p>
                <nav aria-label="Settings sections">{sections.map(item => <a key={item.id} href={`#${item.id}`} aria-current={!query && item.id === section ? 'page' : undefined} onClick={event => { event.preventDefault(); navigate(item.id); }}><item.icon size={17} strokeWidth={1.6} aria-hidden="true" /><span>{item.name}</span><ChevronRight size={13} aria-hidden="true" /></a>)}</nav>
                <div className={styles.sidebarBottom}><span>Need a little help?</span><Link href="/support"><CircleHelp size={15} aria-hidden="true" />Help & support<ArrowUpRight size={13} aria-hidden="true" /></Link><p>Thoughtful travel starts with the details.</p></div>
            </aside>

            <section className={styles.content} aria-labelledby="settings-section-title">
                <header className={styles.contentHeader}><span className={styles.sectionIcon}>{query ? <Search size={21} aria-hidden="true" /> : <selected.icon size={21} strokeWidth={1.5} aria-hidden="true" />}</span><div><span className={styles.eyebrow}>{query ? 'FIND A SETTING' : 'PERSONAL PREFERENCES'}</span><h2 id="settings-section-title" tabIndex={-1}>{query ? 'Search results' : selected.name}</h2><p>{query ? `Results for “${query}”` : selected.subtitle}</p></div></header>
                {query ? <div className={styles.results}>{results.length ? results.map(item => <button key={item.title} onClick={() => navigate(item.section, true)}><span><strong>{item.title}</strong><small>{item.detail}</small></span><ArrowRight size={16} aria-hidden="true" /></button>) : <div className={styles.noResults}><Search size={27} aria-hidden="true" /><h3>No settings found</h3><p>Try “currency”, “password” or “cookies”.</p></div>}</div> : <>
                    {section === 'general' && <>
                        <div className={styles.infoBanner}><Sparkles size={17} aria-hidden="true" /><div><strong>A familiar look. A little more you.</strong><p>Velora’s soft colors stay consistent. Adjust how you read and move through the site.</p></div></div>
                        <div className={styles.settingGroup}><h3>READING & DISPLAY</h3><div className={styles.row}><div><h4>AI message text size</h4><p>Choose a comfortable size for replies in both concierge chats.</p></div><div className={styles.segmented} role="group" aria-label="AI message text size"><button aria-pressed={preferences.chatTextSize === 'standard'} onClick={() => preferences.update({ chatTextSize: 'standard' })}>Standard</button><button aria-pressed={preferences.chatTextSize === 'large'} onClick={() => preferences.update({ chatTextSize: 'large' })}>Large</button></div></div>
                        <div className={styles.preview}><span className={styles.previewLabel}><Sparkles size={12} aria-hidden="true" />TEXT PREVIEW</span><p>Tell me what you love. We’ll find a place to start.</p></div></div>
                        <div className={styles.settingGroup}><h3>MOTION & COMFORT</h3><div className={styles.row}><div><h4>Interface motion</h4><p>Reduce page transitions, smooth scrolling and automatic homepage videos.</p></div><div className={styles.segmented} role="group" aria-label="Interface motion"><button aria-pressed={preferences.motion === 'system'} onClick={() => preferences.update({ motion: 'system' })}>Use device</button><button aria-pressed={preferences.motion === 'reduced'} onClick={() => preferences.update({ motion: 'reduced' })}>Reduce</button></div></div><p className={styles.footnote}>{preferences.reducedMotion ? 'Reduced motion is currently active.' : 'Your device currently allows standard motion.'} The 3D globe has its own rotation controls.</p></div>
                        <div className={styles.localNote}><Check size={14} aria-hidden="true" />{preferences.persistent ? 'Reading and motion choices are saved automatically in this browser.' : 'Choices apply here, but browser storage is unavailable.'}</div>
                    </>}

                    {section === 'account' && (loading ? <p role="status" className={styles.status}>Checking your account…</p> : !user ? <div className={styles.signInCard}><span><UserRound size={28} strokeWidth={1.3} aria-hidden="true" /></span><h3>A place that’s yours.</h3><p>Sign in to manage your profile, keep your saved places and return to your journeys.</p><button className={styles.primary} onClick={signIn}>Sign in to your account<ArrowRight size={15} aria-hidden="true" /></button></div> : <>
                        <div className={styles.settingGroup}><h3>YOUR PROFILE</h3><form onSubmit={saveName}><label htmlFor="settings-name" className={styles.fieldLabel}>Display name</label><div className={styles.nameForm}><input id="settings-name" autoComplete="name" value={name} maxLength={60} required disabled={busy} onChange={event => setName(event.target.value)} placeholder="How should we call you?" /><button className={styles.secondary} type="submit" disabled={busy || !name.trim() || name.trim() === currentName}>{busy ? <Loader2 size={14} className={styles.spinner} /> : <Check size={14} />}Save name</button></div><p className={styles.footnote}>Used in your personal notebook and account menu.</p></form><div className={styles.row}><div><h4>Sign-in email</h4><p>Your email is managed through your sign-in method.</p></div><span className={styles.email}><Mail size={13} aria-hidden="true" />{user.email || 'No email supplied'}</span></div></div>
                        <div className={styles.settingGroup}><h3>ACCOUNT ACCESS</h3><div className={styles.row}><div><h4>Password</h4><p>Request a secure email link to choose a new password.</p></div><button className={styles.secondary} onClick={() => setResetOpen(true)}><LockKeyhole size={14} aria-hidden="true" />Reset password</button></div><div className={styles.row}><div><h4>Sign out</h4><p>Leave your account on this browser.</p></div><button className={styles.textButton} disabled={busy} onClick={async () => { setBusy(true); setError(''); try { await signOut(); } catch { setError('Could not sign out. Please try again.'); } finally { setBusy(false); } }}><LogOut size={14} aria-hidden="true" />Sign out</button></div></div>
                    </>)}

                    {section === 'travel' && <>
                        <div className={styles.settingGroup}><h3>PRICES & CURRENCY</h3><div className={styles.row}><div><h4>Display currency</h4><p>Use your preferred currency for price and budget estimates.</p></div><CurrencySwitcher /></div><div className={styles.currencyPreview}><Globe2 size={23} strokeWidth={1.4} aria-hidden="true" /><div><span>EXAMPLE CONVERSION</span><p>€100 <ArrowRight size={14} aria-hidden="true" /><strong>{new Intl.NumberFormat('en', { style: 'currency', currency, maximumFractionDigits: 2 }).format(convertFrom(100, 'EUR'))}</strong></p><small>{fx.stale ? 'Using a saved estimate.' : 'Using the available reference rates.'} Actual charges may differ.</small></div></div></div>
                        <div className={styles.settingGroup}><h3>YOUR TRAVEL NOTEBOOK</h3><Link className={styles.linkRow} href="/account#my-trips"><span className={styles.linkIcon}><Map size={18} aria-hidden="true" /></span><span><strong>My journeys</strong><small>Build your days and continue your saved plans.</small></span><ArrowUpRight size={16} aria-hidden="true" /></Link><Link className={styles.linkRow} href="/account/saved"><span className={styles.linkIcon}><Bookmark size={18} aria-hidden="true" /></span><span><strong>Saved places</strong><small>The places you’d love to come back to.</small></span><ArrowUpRight size={16} aria-hidden="true" /></Link></div>
                    </>}

                    {section === 'privacy' && <>
                        <div className={styles.infoBanner}><ShieldCheck size={19} aria-hidden="true" /><div><strong>Your choices should be clear.</strong><p>Manage cookies and understand how the travel tools use your information.</p></div></div>
                        <div className={styles.settingGroup}><h3>COOKIES</h3><div className={styles.row}><div><h4>Cookie preferences</h4><p>Reopen the cookie banner to choose essential cookies only or accept optional cookies.</p></div><button className={styles.secondary} onClick={() => window.dispatchEvent(new Event('velora:cookie-settings'))}>Manage cookies<ArrowUpRight size={14} aria-hidden="true" /></button></div></div>
                        <div className={styles.settingGroup}><h3>AI & YOUR INFORMATION</h3><div className={styles.privacyCopy}><h4>Concierge conversations</h4><p>Your messages are sent to our AI provider to answer travel questions. Guide chats currently stay in the open tab and are not saved as account conversation history.</p><p>Saved journeys and saved places belong to your account. You can manage them from your travel notebook.</p></div><Link href="/privacy-policy" className={styles.linkRow}><span className={styles.linkIcon}><ShieldCheck size={18} aria-hidden="true" /></span><span><strong>Privacy Policy</strong><small>How VeloraTravel handles your information.</small></span><ArrowUpRight size={16} aria-hidden="true" /></Link><Link href="/cookies" className={styles.linkRow}><span className={styles.linkIcon}><Settings2 size={18} aria-hidden="true" /></span><span><strong>Cookie Policy</strong><small>More about the cookies used on the site.</small></span><ArrowUpRight size={16} aria-hidden="true" /></Link></div>
                    </>}
                    {error && <p role="alert" className={styles.error}>{error}</p>}{notice && <p role="status" className={styles.notice}><Check size={14} aria-hidden="true" />{notice}</p>}
                </>}
            </section>
        </div>
        <p className={styles.pageFooter}>VeloraTravel · Thoughtful journeys, personal details.</p>
        {resetOpen && <SignInDialog initialMode="reset" initialEmail={user?.email || ''} onClose={() => setResetOpen(false)} />}
    </div></main>;
}
