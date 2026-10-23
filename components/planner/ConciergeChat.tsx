'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Compass, Globe2, Landmark, Loader2, MapPin, Send, Sparkles } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { destinationHref, type DestinationOption, type JourneyParams } from '@/lib/destinations';
import type { GuideReference } from '@/lib/concierge-guide';
import { destinationFlag } from '@/lib/country-flags';
import styles from './ConciergeChat.module.css';
import { clientJson } from '@/lib/client-json';
import { useDisplayPreferences } from '@/components/preferences/DisplayPreferences';
type ChatMessage = { role: 'user' | 'assistant'; content: string; places?: GuideReference[] };
const suggestions = [
    { title: 'Find my kind of place', description: 'Art, culture & quieter corners', question: 'I love art and quiet places. Where should I start?', icon: Landmark },
    { title: 'Help me choose', description: 'Compare the highlights', question: 'Help me choose between the main sights.', icon: Compass },
    { title: 'Before I go', description: 'A few useful travel tips', question: 'What should I know before visiting?', icon: Globe2 },
];
const localPhotos: Record<string, string> = { 'italy/rome': '/images/countries/rome.jpg', france: '/images/countries/paris.jpg', japan: '/images/countries/mount-fuji.jpg', greece: '/images/countries/greece.jpg' };
export default function ConciergeChat({ options, initialDestination, preferences, configured }: {
    options: DestinationOption[]; initialDestination: string | null; preferences: JourneyParams; configured: boolean;
}) {
    const { user, loading, signIn } = useAuth();
    const [destination, setDestination] = useState(options.some(option => option.id === initialDestination) ? initialDestination! : '');
    const [draft, setDraft] = useState(''), [messages, setMessages] = useState<ChatMessage[]>([]);
    const [busy, setBusy] = useState(false), [error, setError] = useState('');
    const requestVersion = useRef(0);
    const request = useRef<AbortController | null>(null);
    const sending = useRef(false);
    const previousUser = useRef<string | null>(null);
    const { reducedMotion } = useDisplayPreferences();
    useEffect(() => () => { requestVersion.current++; request.current?.abort(); }, []);
    useEffect(() => {
        requestVersion.current++; request.current?.abort(); sending.current = false;
        setMessages([]); setError(''); setBusy(false);
        if (previousUser.current || !user?.id) setDraft('');
        previousUser.current = user?.id || null;
    }, [user?.id]);
    const conversation = useRef<HTMLDivElement>(null);
    const questionInput = useRef<HTMLTextAreaElement>(null);
    const [photoFailed, setPhotoFailed] = useState(false);
    useEffect(() => {
        const element = conversation.current;
        if ((messages.length || busy) && element) element.scrollTo({ top: element.scrollHeight, behavior: reducedMotion ? 'auto' : 'smooth' });
    }, [messages.length, busy, reducedMotion]);
    const selected = options.find(option => option.id === destination);
    const photo = !photoFailed && selected ? localPhotos[selected.id] || selected.image.replace(/([?&])w=\d+/, '$1w=900') : '/images/journeys-coast-desktop.webp';
    const send = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!destination || draft.trim().length < 3 || sending.current || loading || !configured) return;
        if (!user) { signIn(); return; }
        const version = requestVersion.current, message = draft.trim();
        const history = messages.slice(-8).map(({ role, content }) => ({ role, content }));
        sending.current = true;
        const controller = new AbortController();
        request.current = controller;
        setBusy(true); setError('');
        try {
            const { response, data } = await clientJson<{ answer: string; places?: GuideReference[]; error?: string }>('/api/concierge/guide', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ destinationId: destination, message, history }) }, { signal: controller.signal });
            if (version !== requestVersion.current) return;
            if (!response.ok) { if (response.status === 401) signIn(); throw new Error(data.error || 'Your concierge could not answer.'); }
            setMessages(current => [...current.slice(-18), { role: 'user', content: message }, { role: 'assistant', content: data.answer, places: data.places }]); setDraft('');
        } catch (caught) { if (version === requestVersion.current) setError(caught instanceof Error ? caught.message : 'Could not connect. Please try again.'); }
        finally { if (version === requestVersion.current) { sending.current = false; request.current = null; setBusy(false); } }
    };
    const changeDestination = (id: string) => {
        requestVersion.current++;
        request.current?.abort(); sending.current = false;
        setDestination(id); setMessages([]); setDraft(''); setError(''); setBusy(false); setPhotoFailed(false);
        window.history.replaceState(null, '', destinationHref('/concierge', id || null, preferences));
    };
    return <div data-testid="concierge-chat" className={styles.page}>
        <header className={styles.pageHeading}>
            <div><span className={styles.eyebrow}><Sparkles size={13} aria-hidden="true" /> YOUR AI TRAVEL COMPANION</span><h1>A little conversation.<br className={styles.mobileBreak} />{' '}<em>A world of possibility.</em></h1></div>
            <p>Less searching. More discovering.<br />Let’s find the places that feel like you.</p>
        </header>
        <div className={styles.workspace}>
            <aside className={styles.inspiration} aria-label="Travel inspiration">
                <Image key={photo} src={photo} alt={selected && !photoFailed ? `${selected.name} travel inspiration` : 'The sunlit Amalfi coast, Italy'} fill sizes="(max-width: 700px) 100vw, 420px" priority unoptimized onError={() => setPhotoFailed(true)} className={styles.destinationPhoto} />
                <div className={styles.photoShade} />
                <div className={styles.photoTop}><span><Compass size={14} aria-hidden="true" /> THE WORLD, AT YOUR PACE</span><span>{options.length} destinations</span></div>
                <div className={styles.photoContent}>
                    <span className={styles.photoEyebrow}>{selected ? 'YOUR NEXT CHAPTER' : 'FOLLOW YOUR CURIOSITY'}</span>
                    <h2>{selected ? <>Let’s discover<br /><em>{selected.name}.</em></> : <>Somewhere new.<br /><em>Something you.</em></>}</h2>
                    <p>{selected ? 'The landmarks, the little details, the places worth making time for. Let’s explore them together.' : 'A quiet escape, a cultural detour, or a city you’ve always dreamed of. Start with a place. Make it yours.'}</p>
                    <Link href={selected?.guideHref || '/destinations'} className={styles.photoLink}>{selected ? `Explore ${selected.name}` : 'Browse destinations'}<ArrowUpRight size={17} aria-hidden="true" /></Link>
                </div>
                <div className={styles.photoBottom}><MapPin size={13} aria-hidden="true" /><span>{selected && !photoFailed ? selected.kind === 'city' ? `${selected.name}, ${selected.country}` : selected.name : 'Amalfi Coast, Italy · Travel inspiration'}</span></div>
            </aside>

            <section aria-label="Travel concierge conversation" className={styles.chat}>
                <header className={styles.chatHeader}><span className={styles.avatar}><Sparkles size={22} strokeWidth={1.4} aria-hidden="true" /></span><div><h2>Velora Concierge</h2><p>Your ideas. A journey that fits.</p></div><span className={styles.aiBadge}><Sparkles size={11} aria-hidden="true" /> AI companion</span></header>
                <div className={styles.destinationBar}>
                    <div className={styles.destinationLabel}><MapPin size={15} aria-hidden="true" /><label htmlFor="concierge-destination">Where are we going?</label></div>
                    <div className={styles.selectWrap}>{selected && <Image src={destinationFlag(selected.guideHref)} alt="" width={22} height={16} unoptimized />}<select id="concierge-destination" aria-label="Concierge destination" value={destination} onChange={event => changeDestination(event.target.value)}><option value="">Choose a country or city</option>{options.map(option => <option key={option.id} value={option.id}>{option.name}{option.kind === 'city' ? `, ${option.country}` : ''}</option>)}</select><ChevronDown size={14} aria-hidden="true" /></div>
                </div>
                {initialDestination && !options.some(option => option.id === initialDestination) && !selected && <p role="status" className={styles.notice}>That destination is not available. Choose one of our country guides.</p>}
                <div ref={conversation} data-lenis-prevent className={styles.conversation} role="log" aria-label="Concierge messages" aria-live="polite" aria-relevant="additions text" aria-busy={busy}>
                    {!messages.length && <div className={styles.welcome}>
                        <span className={styles.welcomeLabel}>A CONVERSATION BEFORE THE JOURNEY</span>
                        <h3>{selected ? <>What draws you to <em>{selected.name}?</em></> : <>Hello, traveler.<br /><em>What’s calling you?</em></>}</h3>
                        <p>{selected ? 'Tell me what you enjoy. We can compare the highlights, explore the guide and find your starting point.' : 'Choose a destination above, then tell me what you love. A few ideas to get us started:'}</p>
                        <div className={styles.suggestions}>{suggestions.map(({ title, description, question, icon: Icon }) => <button key={title} disabled={busy} onClick={() => { setDraft(question); questionInput.current?.focus({ preventScroll: true }); }}><span className={styles.suggestionIcon}><Icon size={17} strokeWidth={1.5} aria-hidden="true" /></span><span><strong>{title}</strong><small>{description}</small></span><ArrowUpRight size={14} className={styles.suggestionArrow} aria-hidden="true" /></button>)}</div>
                    </div>}
                    {messages.map((message, index) => <article key={index} className={message.role === 'user' ? styles.userMessage : styles.assistantMessage}><span className={styles.messageAuthor}>{message.role === 'user' ? 'You' : <><Sparkles size={12} aria-hidden="true" /> Velora Concierge</>}</span><p>{message.content}</p>{!!message.places?.length && <div className={styles.places}>{message.places.map(place => <Link key={place.id} href={place.href}><span><strong>{place.name}</strong><small>{place.description}</small></span><ArrowUpRight size={15} aria-hidden="true" /></Link>)}</div>}</article>)}
                    {busy && <p role="status" className={styles.thinking}><Loader2 size={16} aria-hidden="true" />Looking through the {selected?.name} guide…</p>}
                </div>
                <form onSubmit={send} className={styles.composer}>
                    <div className={styles.inputBox}><label htmlFor="concierge-question" className="sr-only">Your travel question</label><textarea ref={questionInput} id="concierge-question" rows={2} minLength={3} maxLength={2000} value={draft} disabled={busy} onChange={event => setDraft(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} placeholder={selected ? `What would you love to discover in ${selected.name}?` : 'Tell me what you have in mind…'} /><button type="submit" aria-label={busy ? 'Waiting for concierge' : user ? 'Send message' : 'Sign in and chat'} disabled={busy || loading || !configured || !selected || draft.trim().length < 3}>{busy ? <Loader2 size={18} className={styles.spinner} /> : <Send size={18} />}</button></div>
                    <div className={styles.composerMeta}><span>{!selected ? 'Choose a destination to begin.' : !user ? <button type="button" onClick={signIn} disabled={loading}>Sign in to start your conversation <ArrowUpRight size={12} aria-hidden="true" /></button> : 'Your conversation stays in this tab.'}</span><span><Check size={12} aria-hidden="true" /> Guide-based AI</span></div>
                    {error && <p role="alert" className={styles.error}>{error}</p>}
                    {!configured && <p role="status" className={styles.notice}>The AI connection is not configured yet. You can still browse the destination guides.</p>}
                    <p className={styles.disclosure}>Messages are sent to our AI provider. Guides may be incomplete or outdated; confirm prices and hours. <Link href="/privacy-policy">Privacy</Link></p>
                </form>
            </section>
        </div>
        <div className={styles.afterword}><p><Compass size={16} aria-hidden="true" />A little inspiration now. Your own itinerary next.</p><div><Link href={destinationHref('/plan', destination || null, preferences)}>Open trip planner <ArrowRight size={14} aria-hidden="true" /></Link>{selected?.planning && <Link href={destinationHref('/concierge/itinerary', destination, preferences)}><Sparkles size={14} aria-hidden="true" />Create an AI itinerary</Link>}</div></div>
    </div>;
}
