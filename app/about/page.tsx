import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bookmark, Compass, MessageCircle, Sparkles } from 'lucide-react';
import styles from './about.module.css';

const tools = [
    { number: '01', icon: Compass, title: 'Find a place that speaks to you.', description: 'Explore country guides, discover highlights and find a starting point for your next journey.', href: '/destinations', label: 'Explore destinations' },
    { number: '02', icon: MessageCircle, title: 'Talk through the possibilities.', description: 'Ask the AI companion about a destination, compare ideas and explore what suits your interests.', href: '/concierge', label: 'Meet your concierge' },
    { number: '03', icon: Bookmark, title: 'Make the journey your own.', description: 'Save places to your account. Use the Rome trip planner to arrange your days and compare estimated costs.', href: '/plan', label: 'Explore planning tools' },
];

export default function AboutPage() {
    return (
        <div className={styles.surface}>
            <div className={styles.page}>
                <header className={styles.hero}>
                    <p className={styles.eyebrow}>THE IDEA BEHIND VELORA</p>
                    <h1>A more personal way<br />to <em>plan a journey.</em></h1>
                    <div className={styles.heroBottom}>
                        <p>A place for your curiosity, your interests and the journey you want to make.</p>
                        <a href="#founder" className={styles.textLink}>Meet the founder <ArrowRight size={16} /></a>
                    </div>
                </header>
                <section className={styles.founder} id="founder" aria-labelledby="founder-title">
                    <figure className={styles.portrait}>
                        <Image src="/images/about/yura-grigoryan.optimized.webp" alt="Yura Grigoryan, founder of VeloraTravel" fill sizes="(max-width: 700px) 90vw, 500px" priority className={styles.portraitImage} />
                        <figcaption><span>THE PERSON BEHIND THE IDEA</span><strong>Yura Grigoryan</strong><p>Founder of VeloraTravel</p></figcaption>
                    </figure>
                    <div className={styles.story}>
                        <p className={styles.eyebrow}>A NOTE FROM THE FOUNDER</p>
                        <h2 id="founder-title">Every journey starts<br />with <em>an idea.</em></h2>
                        <div className={styles.storyCopy}>
                            <p>I created VeloraTravel to help people turn travel ideas into plans that suit their interests, time and budget.</p>
                            <p>Velora brings destination guides, an AI travel companion and personal planning tools together. I’m building it step by step, with the aim of making travel planning clearer and more enjoyable.</p>
                        </div>
                        <div className={styles.signature}><span>Yura Grigoryan</span><small>Founder of VeloraTravel</small></div>
                    </div>
                </section>
                <section className={styles.tools} aria-labelledby="tools-title">
                    <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>FROM AN IDEA TO YOUR OWN ADVENTURE</p><h2 id="tools-title">A little help along the way.</h2></div><p>Explore. Ask questions.<br />Bring your plans together.</p></div>
                    <div className={styles.toolGrid}>{tools.map(({ number, icon: Icon, title, description, href, label }) => (
                        <article className={styles.tool} key={number}>
                            <div className={styles.toolTop}><span className={styles.icon}><Icon size={23} strokeWidth={1.5} /></span><span>{number}</span></div>
                            <h3>{title}</h3><p>{description}</p><Link href={href} className={styles.textLink}>{label}<ArrowRight size={16} /></Link>
                        </article>
                    ))}</div>
                </section>
                <aside className={styles.honesty} aria-labelledby="honesty-title"><Sparkles size={23} strokeWidth={1.5} /><div><h3 id="honesty-title">Growing thoughtfully, one step at a time.</h3><p>Country guides and AI conversations are available across our destination collection. The full day-by-day planner currently focuses on Rome. Guides and AI suggestions are a starting point: confirm current prices, opening hours and availability before you travel.</p></div></aside>
                <section className={styles.invitation} aria-labelledby="invitation-title">
                    <Image src="/images/travel-hero-coast-desktop.webp" alt="A quiet coastline beside turquoise water" fill sizes="(max-width: 1100px) 100vw, 1120px" className={styles.coast} />
                    <div className={styles.invitationContent}><p className={styles.eyebrow}>YOUR NEXT CHAPTER</p><h2 id="invitation-title">Where will curiosity<br />take you?</h2><div className={styles.actions}><Link className={styles.primary} href="/destinations">Explore destinations <ArrowRight size={17} /></Link><Link className={styles.lightLink} href="/concierge">Let’s talk about your trip <ArrowRight size={16} /></Link></div></div>
                </section>
            </div>
        </div>
    );
}
