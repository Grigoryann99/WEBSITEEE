'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Check, ChevronDown, Loader2, MessageCircle, Minus, Send, Sparkles, X } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import type { GuideReference } from '@/lib/concierge-guide';
import styles from './FloatingConciergeChat.module.css';
import { useDisplayPreferences } from '@/components/preferences/DisplayPreferences';

type Option = { id: string; name: string };
type Message = { role: 'user' | 'assistant'; content: string; places?: GuideReference[] };
const prompts = ['What should I see first?', 'A relaxed day out', 'Local travel tips'];

export default function FloatingConciergeChat({ options, configured }: { options: Option[]; configured: boolean }) {
    const { user, loading, signIn } = useAuth();
    const pathname = usePathname();
    const { reducedMotion } = useDisplayPreferences();
    const compactLauncher = pathname === '/plan' || pathname.startsWith('/plan/') || pathname === '/destinations/italy/rome' || pathname.startsWith('/destinations/italy/rome/');
    const [open, setOpen] = useState(false);
    const [destination, setDestination] = useState('');
    const [draft, setDraft] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [pending, setPending] = useState('');
    const [error, setError] = useState('');
    const [cookieHeight, setCookieHeight] = useState(0);
    const [welcomeVisible, setWelcomeVisible] = useState(false);
    const [introduced, setIntroduced] = useState(false);
    const welcomeSeen = useRef(false);
    const dismissWelcome = useCallback(() => {
        welcomeSeen.current = true;
        setWelcomeVisible(false);
    }, []);
    useEffect(() => {
        if (pathname !== '/' || open || welcomeSeen.current) {
            setIntroduced(true);
            setWelcomeVisible(false);
            return;
        }
        const timer = window.setTimeout(() => {
            welcomeSeen.current = true;
            setIntroduced(true);
            setWelcomeVisible(true);
        }, 2800);
        return () => window.clearTimeout(timer);
    }, [pathname, open]);
    const request = useRef<AbortController | null>(null);
    const version = useRef(0);
    const launcher = useRef<HTMLButtonElement>(null);
    const selection = useRef<HTMLSelectElement>(null);
    const textarea = useRef<HTMLTextAreaElement>(null);
    const conversation = useRef<HTMLDivElement>(null);
    const selected = options.find(option => option.id === destination);
    const busy = Boolean(pending);
    const invalidateRequest = useCallback(() => { version.current++; request.current?.abort(); }, []);

    useEffect(() => {
        const onCookieSize = (event: Event) => setCookieHeight(Number((event as CustomEvent<number>).detail) || 0);
        window.addEventListener('velora:cookie-height', onCookieSize);
        return () => window.removeEventListener('velora:cookie-height', onCookieSize);
    }, []);

    useEffect(() => {
        // Follow a guide on first opening; never replace an ongoing conversation on navigation.
        if (!open || destination || messages.length) return;
        const query = new URLSearchParams(window.location.search).get('destination');
        const guide = pathname === '/destinations/italy/rome' || pathname.startsWith('/destinations/italy/rome/') ? 'italy/rome' : pathname.startsWith('/destinations/') ? pathname.slice('/destinations/'.length).replace(/\/$/, '') : '';
        const id = options.find(option => option.id === (query || guide))?.id;
        if (id) setDestination(id);
    }, [open, pathname, destination, messages.length, options]);

    useEffect(() => {
        if (open) selection.current?.focus({ preventScroll: true });
    }, [open]);

    useEffect(() => {
        const element = conversation.current;
        if (open && element) element.scrollTo({ top: messages.length || pending ? element.scrollHeight : 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    }, [messages.length, pending, open, reducedMotion]);

    useEffect(() => {
        invalidateRequest();
        setMessages([]); setDraft(''); setPending(''); setError('');
        return invalidateRequest;
    }, [user?.id, invalidateRequest]);

    const close = () => { setOpen(false); launcher.current?.focus({ preventScroll: true }); };
    const changeDestination = (id: string) => {
        invalidateRequest();
        setDestination(id); setMessages([]); setDraft(''); setPending(''); setError('');
    };
    const send = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selected || draft.trim().length < 3 || busy || loading || !configured) return;
        if (!user) { signIn(); return; }
        const message = draft.trim();
        const currentVersion = ++version.current;
        const controller = new AbortController();
        request.current = controller;
        const timeout = window.setTimeout(() => controller.abort(), 45000);
        setPending(message); setError('');
        try {
            const response = await fetch('/api/concierge/guide', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal,
                body: JSON.stringify({ destinationId: selected.id, message, history: messages.slice(-8).map(({ role, content }) => ({ role, content })) }),
            });
            const data = await response.json();
            if (currentVersion !== version.current) return;
            if (!response.ok) { if (response.status === 401) signIn(); throw new Error(data.error || 'Could not get an answer. Please try again.'); }
            setMessages(previous => [...previous.slice(-18), { role: 'user', content: message }, { role: 'assistant', content: data.answer, places: data.places }]);
            setDraft('');
        } catch (caught) {
            if (currentVersion === version.current) setError(controller.signal.aborted ? 'The connection timed out. Please try again.' : caught instanceof Error ? caught.message : 'Could not connect. Please try again.');
        } finally {
            window.clearTimeout(timeout);
            if (currentVersion === version.current) { setPending(''); request.current = null; }
        }
    };

    if (pathname === '/concierge' || pathname === '/account/settings' || (pathname === '/' && !introduced)) return null;

    return <div className={`${styles.widget} ${pathname === '/' ? styles.arrival : ''}`} style={{ '--cookie-height': `${cookieHeight}px` } as CSSProperties}>
        {welcomeVisible && !open && pathname === '/' && <aside className={styles.greeting} aria-label="Welcome from Velora AI">
            <button type="button" className={styles.greetingClose} onClick={dismissWelcome} aria-label="Dismiss welcome message"><X size={16} /></button>
            <span className={styles.greetingLabel}><Sparkles size={14} aria-hidden="true" />YOUR TRAVEL COMPANION</span>
            <div role="status"><h2>Welcome to VeloraTravel.</h2><p>I’m Velora, your AI travel companion. Where would you like to go?</p></div>
            <button type="button" className={styles.greetingAction} onClick={() => { dismissWelcome(); setOpen(true); }}>Let’s explore <ArrowUpRight size={15} aria-hidden="true" /></button>
        </aside>}
        {open && <section id="floating-concierge" role="dialog" aria-modal="false" aria-labelledby="floating-concierge-title" className={styles.panel} data-lenis-prevent onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); close(); } }}>
            <header className={styles.header}>
                <span className={styles.avatar}><Sparkles size={21} aria-hidden="true" /></span>
                <div className={styles.identity}><h2 id="floating-concierge-title">Velora Concierge</h2><p>AI travel companion</p></div>
                <button onClick={close} className={styles.iconButton} aria-label="Minimize AI chat"><Minus size={20} /></button>
            </header>
            <div className={styles.destination}>
                <label htmlFor="floating-chat-destination">LET’S EXPLORE</label>
                <div className={styles.selectWrap}><select ref={selection} id="floating-chat-destination" value={destination} onChange={event => changeDestination(event.target.value)}><option value="">Choose a country or city</option>{options.map(option => <option value={option.id} key={option.id}>{option.name}</option>)}</select><ChevronDown size={14} aria-hidden="true" /></div>
            </div>
            <div ref={conversation} className={styles.conversation} role="log" aria-label="AI travel conversation" aria-live="polite" aria-relevant="additions text" aria-busy={busy} data-lenis-prevent>
                {!messages.length && !busy && <div className={styles.welcome}>
                    <h3>Welcome to VeloraTravel.</h3>
                    <p>{selected ? `I’m Velora, your AI travel companion. Let’s explore ${selected.name}. Tell me what you enjoy, and we’ll find a starting point together.` : 'I’m Velora, your AI travel companion. Choose a destination and tell me what you enjoy. We’ll find a starting point for your journey together.'}</p>
                    <div className={styles.prompts}>{prompts.map(prompt => <button key={prompt} onClick={() => { setDraft(prompt); textarea.current?.focus({ preventScroll: true }); }}>{prompt}<ArrowUpRight size={13} aria-hidden="true" /></button>)}</div>
                </div>}
                {messages.map((message, index) => <article key={index} className={message.role === 'user' ? styles.userMessage : styles.aiMessage}>
                    <span className={styles.messageAuthor}>{message.role === 'user' ? 'You' : 'Velora AI'}</span><p>{message.content}</p>
                    {!!message.places?.length && <div className={styles.places}>{message.places.map(place => <Link href={place.href} key={place.id}>{place.name}<ArrowUpRight size={14} aria-hidden="true" /></Link>)}</div>}
                </article>)}
                {busy && <><article className={styles.userMessage}><span className={styles.messageAuthor}>You</span><p>{pending}</p></article><p className={styles.thinking} role="status"><Loader2 size={15} aria-hidden="true" />Looking through the guide…</p></>}
            </div>
            <form onSubmit={send} className={styles.composer}>
                {error && <p role="alert" className={styles.error}>{error}</p>}
                {!configured && <p role="status" className={styles.error}>AI chat is temporarily unavailable. Please browse our destination guides.</p>}
                <label htmlFor="floating-chat-question" className="sr-only">Your travel question</label>
                <div className={styles.inputWrap}><textarea ref={textarea} id="floating-chat-question" rows={2} minLength={3} maxLength={2000} value={draft} disabled={busy} onChange={event => setDraft(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} placeholder={selected ? `Ask about ${selected.name}…` : 'What would you like to discover?'} /><button type="submit" aria-label={busy ? 'Waiting for AI answer' : user ? 'Send travel question' : 'Sign in to chat'} disabled={busy || loading || !configured || !selected || draft.trim().length < 3}>{busy ? <Loader2 size={18} className={styles.spinner} /> : <Send size={18} />}</button></div>
                <div className={styles.composerMeta}><span>{!selected ? 'Choose a destination to start.' : !user ? 'Sign in to send your question.' : 'Conversation stays in this tab.'}</span>{selected && <span><Check size={11} aria-hidden="true" />Guide-based AI</span>}</div>
                {!user && selected && <button type="button" className={styles.signIn} disabled={loading} onClick={signIn}>Sign in to chat <ArrowUpRight size={13} aria-hidden="true" /></button>}
                <p className={styles.disclosure}>Messages go to our AI provider. Guides may be outdated; confirm prices and hours. <Link href="/privacy-policy">Privacy</Link></p>
            </form>
        </section>}
        <button ref={launcher} onClick={() => { if (open) close(); else { dismissWelcome(); setOpen(true); } }} className={`${styles.launcher} ${open ? styles.launcherOpen : ''} ${compactLauncher ? styles.compactLauncher : ''}`} aria-label={open ? 'Close AI travel chat' : 'Open AI travel chat'} title={open ? 'Close chat' : 'Ask Velora AI'} aria-expanded={open} aria-controls="floating-concierge"><span className={styles.launcherIcon}>{open ? <Minus size={22} /> : <MessageCircle size={23} />}</span><span className={compactLauncher ? 'sr-only' : undefined}>{open ? 'Close chat' : 'Ask Velora AI'}</span>{!open && !compactLauncher && <Sparkles size={14} className={styles.launcherSparkle} aria-hidden="true" />}</button>
    </div>;
}
