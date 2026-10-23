'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Bookmark, Compass, Globe2, Loader2, LogOut, Map, MapPin, Plus, RefreshCw, Settings2, Sparkles } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { browserSupabase } from '@/lib/supabase/client';
import { placeById } from '@/lib/places/catalog';
import { useCurrency } from '@/components/currency/CurrencyProvider';
import CurrencySwitcher from '@/components/currency/CurrencySwitcher';
import styles from './AccountWorkspace.module.css';

const inspiration = [
    { title: 'Rome, at your own pace', subtitle: 'Italy · City companion', image: '/images/countries/rome.jpg', href: '/destinations/italy/rome' },
    { title: 'A little French inspiration', subtitle: 'France · Country guide', image: '/images/countries/paris.jpg', href: '/destinations/france' },
    { title: 'Find your way to Japan', subtitle: 'Japan · Country guide', image: '/images/countries/mount-fuji.jpg', href: '/destinations/japan' },
];

export default function AccountWorkspace() {
    const { user, signIn, signOut, loading } = useAuth();
    const { currency } = useCurrency();
    const [trips, setTrips] = useState<{ id: string; title: string }[]>([]);
    const [saved, setSaved] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [sessionError, setSessionError] = useState('');
    const [dataLoading, setDataLoading] = useState(true);
    const [retry, setRetry] = useState(0);
    const [signingOut, setSigningOut] = useState(false);
    const rawName: unknown = user?.user_metadata?.full_name || user?.user_metadata?.name;
    const name = typeof rawName === 'string' && rawName.trim() ? rawName.trim().split(/\s+/)[0].slice(0, 35) : 'traveler';
    const initial = (typeof rawName === 'string' && rawName.trim() ? rawName : user?.email || 'V').trim().charAt(0).toUpperCase();
    const savedPlaces = saved.flatMap(id => { const place = placeById.get(id); return place ? [place] : []; });
    const awaitingData = loading || dataLoading;
    const count = (value: number) => !user || awaitingData || error ? '—' : value;

    useEffect(() => {
        setTrips([]); setSaved([]); setError(''); setDataLoading(Boolean(user));
        if (!user) return;
        const client = browserSupabase();
        if (!client) { setError('Your account is unavailable right now.'); setDataLoading(false); return; }
        let active = true;
        Promise.all([
            client.from('trips').select('id,title').eq('user_id', user.id).order('updated_at', { ascending: false }),
            client.from('saved_places').select('place_id').eq('user_id', user.id),
        ]).then(([plans, places]) => {
            if (!active) return;
            if (plans.error || places.error) setError('Your account data could not be loaded. Please try again.');
            else { setTrips(plans.data || []); setSaved((places.data || []).map(row => row.place_id)); }
        }).catch(() => { if (active) setError('Your account is unavailable right now.'); })
            .finally(() => { if (active) setDataLoading(false); });
        return () => { active = false; };
    }, [user, retry]);
    useEffect(() => {
        if (!user || !['#my-trips', '#preferences'].includes(window.location.hash)) return;
        document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: 'start', behavior: 'auto' });
    }, [user]);

    return <main className={styles.surface}><div className={styles.page}>
        <header className={styles.profileBar}>
            <div className={styles.profile}><span className={styles.avatar} aria-hidden="true">{user ? initial : <Compass size={24} strokeWidth={1.4} />}</span><div><span className={styles.eyebrow}>YOUR PERSONAL TRAVEL SPACE</span><h1>{user ? `Welcome back, ${name}.` : 'Your travel notebook.'}</h1><p>Your places. Your plans. Your next chapter.</p></div></div>
            {user ? <div className={styles.session}><span>{user.email}</span><button disabled={signingOut} onClick={async () => { setSigningOut(true); setSessionError(''); try { await signOut(); } catch { setSessionError('Could not sign out. Try again.'); } finally { setSigningOut(false); } }}><LogOut size={14} aria-hidden="true" />{signingOut ? 'Signing out…' : 'Sign out'}</button></div> : <button className={styles.secondary} disabled={loading} onClick={signIn}>{loading ? 'Checking account…' : 'Sign in to your notebook'}<ArrowRight size={14} aria-hidden="true" /></button>}
        </header>

        <section className={styles.hero} aria-labelledby="next-chapter-title">
            <Image src="/images/journeys-coast-desktop.webp" alt="Sunlit coastal scenery on the Amalfi Coast, Italy" fill priority sizes="(max-width: 700px) 100vw, 1100px" className={styles.heroPhoto} unoptimized />
            <div className={styles.heroShade} />
            <div className={styles.heroCopy}><span className={styles.heroLabel}><Sparkles size={12} aria-hidden="true" /> A LITTLE CURIOSITY GOES A LONG WAY</span><h2 id="next-chapter-title">{trips.length ? <>Ready for your<br /><em>next chapter?</em></> : <>Make room for<br /><em>your next adventure.</em></>}</h2><p>Start with a place. Add the things you love.<br />Leave a little room for discovery.</p><div className={styles.heroActions}><Link href={trips.length ? `/plan/${trips[0].id}` : '/plan'} className={styles.primary}>{trips.length ? 'Continue your latest journey' : 'Plan a journey'}<ArrowRight size={15} aria-hidden="true" /></Link><Link href="/concierge" className={styles.heroChat}><Sparkles size={14} aria-hidden="true" />Ask your concierge</Link></div></div>
            <span className={styles.photoCaption}><MapPin size={12} aria-hidden="true" />Amalfi Coast, Italy · Inspiration for the road ahead</span>
        </section>

        <div className={styles.overview} aria-label="Your travel notebook overview"><div><span className={styles.statIcon}><Map size={18} aria-hidden="true" /></span><span><strong>{count(trips.length)}</strong><small>Journeys in your notebook</small></span></div><div><span className={styles.statIcon}><Bookmark size={18} aria-hidden="true" /></span><span><strong>{count(saved.length)}</strong><small>Places saved for later</small></span></div><div><span className={styles.statIcon}><Globe2 size={18} aria-hidden="true" /></span><span><strong>{currency}</strong><small>Your display currency</small></span></div></div>
        {error && <div role="alert" className={styles.error}><span>{error}</span><button onClick={() => setRetry(value => value + 1)}><RefreshCw size={13} aria-hidden="true" />Try again</button></div>}
        {sessionError && <div role="alert" className={styles.error}><span>{sessionError}</span><button onClick={() => setSessionError('')}>Dismiss</button></div>}

        <div className={styles.collections}>
            <section id="my-trips" className={styles.collection} aria-labelledby="my-trips-title">
                <header className={styles.sectionHeader}><div><Map size={18} aria-hidden="true" /><h2 id="my-trips-title">My journeys</h2></div><Link href="/plan" aria-label="Create a new journey" className={styles.add}><Plus size={17} /></Link></header>
                {awaitingData ? <div role="status" className={styles.loading}><Loader2 size={17} />Loading your journeys…</div> : error ? <p className={styles.unavailable}>Your journeys will appear here when your account reconnects.</p> : trips.length ? <><div className={styles.tripList}>{trips.slice(0, 4).map((trip, index) => <Link key={trip.id} href={`/plan/${trip.id}`}><span className={styles.tripIcon}><MapPin size={18} strokeWidth={1.4} aria-hidden="true" /></span><span><strong>{trip.title}</strong><small>{index === 0 ? 'Most recently updated' : 'Saved journey'} · Open itinerary</small></span><ArrowUpRight size={16} aria-hidden="true" /></Link>)}</div>{trips.length > 4 && <div className={styles.moreTrips}><details><summary>Show {trips.length - 4} more journeys</summary>{trips.slice(4).map(trip => <Link href={`/plan/${trip.id}`} key={trip.id}>{trip.title}<ArrowUpRight size={14} /></Link>)}</details></div>}</> : <div className={styles.emptyJourney}><div className={styles.journeyIllustration} aria-hidden="true"><span /><MapPin size={20} /><span /><Compass size={26} /><span /></div><h3>{user ? 'Your next story starts here.' : 'Keep your journeys close.'}</h3><p>{user ? 'Turn a few ideas into days you’ll look forward to. Your saved plans will be waiting right here.' : 'Sign in to save your travel plans and return to them whenever inspiration calls.'}</p>{user ? <Link href="/plan" className={styles.primary}>Create your first journey<ArrowRight size={14} aria-hidden="true" /></Link> : <button disabled={loading} onClick={signIn} className={styles.primary}>Sign in to save journeys<ArrowRight size={14} aria-hidden="true" /></button>}</div>}
            </section>

            <section className={styles.collection} aria-labelledby="saved-places-title">
                <header className={styles.sectionHeader}><div><Bookmark size={18} aria-hidden="true" /><h2 id="saved-places-title">Saved places</h2></div>{user && <Link href="/account/saved" className={styles.textLink}>View collection<ArrowUpRight size={13} aria-hidden="true" /></Link>}</header>
                {awaitingData ? <div role="status" className={styles.loading}><Loader2 size={17} />Loading your places…</div> : error ? <p className={styles.unavailable}>Your saved places will appear here when your account reconnects.</p> : saved.length ? <><div className={styles.savedList}>{savedPlaces.slice(0, 4).map(place => <Link key={place.id} href={`/destinations/italy/rome?section=${encodeURIComponent(place.section)}&place=${encodeURIComponent(place.id)}`}><span className={styles.savedIcon}><Bookmark size={16} aria-hidden="true" /></span><span><strong>{place.name}</strong><small>{place.district} · Rome, Italy</small></span><ArrowUpRight size={15} aria-hidden="true" /></Link>)}</div>{savedPlaces.length < saved.length && <p className={styles.unavailable}>Some saved places are no longer in the current guide.</p>}</> : <div className={styles.emptySaved}><div className={styles.bookmarkIllustration} aria-hidden="true"><span /><Bookmark size={29} strokeWidth={1.25} /><span /></div><h3>A place for your discoveries.</h3><p>{user ? 'Tap the bookmark on a place in the Rome guide. Keep the ones you’d love to come back to.' : 'Keep the places that catch your eye in one collection. Sign in when you’re ready to save them.'}</p><Link href="/destinations/italy/rome" className={styles.secondary}>Explore the Rome guide<ArrowUpRight size={14} aria-hidden="true" /></Link></div>}
            </section>
        </div>

        <section id="preferences" className={styles.preferences} aria-labelledby="preferences-title"><div className={styles.preferenceCopy}><span className={styles.preferenceIcon}><Settings2 size={20} strokeWidth={1.5} aria-hidden="true" /></span><div><h2 id="preferences-title">The little details, your way.</h2><p>Display prices in your preferred currency across Velora. <Link href="/account/settings">All settings ↗</Link></p></div></div><div className={styles.currency}><span>DISPLAY CURRENCY</span><CurrencySwitcher placement="top" /></div></section>

        <section className={styles.inspiration} aria-labelledby="account-inspiration-title"><header><div><span className={styles.eyebrow}>A LITTLE INSPIRATION</span><h2 id="account-inspiration-title">Where curiosity takes you.</h2></div><Link href="/destinations" className={styles.textLink}>All destinations<ArrowRight size={14} aria-hidden="true" /></Link></header><div className={styles.inspirationGrid}>{inspiration.map(item => <Link key={item.href} href={item.href} className={styles.inspirationCard}><div className={styles.inspirationPhoto}><Image src={item.image} alt="" fill sizes="(max-width: 700px) 85vw, 360px" unoptimized /></div><div className={styles.inspirationText}><span><small>{item.subtitle}</small><h3>{item.title}</h3></span><span className={styles.photoArrow}><ArrowUpRight size={16} aria-hidden="true" /></span></div></Link>)}</div></section>
    </div></main>;
}
