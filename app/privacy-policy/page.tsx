import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronDown, Clock3, ShieldCheck } from 'lucide-react';
import CookieSettings from '@/components/layout/CookieSettings';
import styles from './privacy.module.css';

export const metadata: Metadata = {
    alternates: { canonical: '/privacy-policy' },
    title: 'Privacy Policy | VeloraTravel',
    description: 'Learn how VeloraTravel collects, uses, and protects your personal information.',
};

const LAST_UPDATED = 'August 17, 2026';

const SECTIONS = [
    {
        title: '1. Information We Collect',
        content: `You can browse public guides without an account. If you sign in through an enabled identity provider, we use your account identifier and supplied profile information to provide saved places and personal journeys. We store the plans, currency preference, concierge requests and planning quote requests you choose to save. Contact forms collect the name, email address and message you submit.

When personal AI planning is enabled, your request and the relevant Rome catalog are sent to Groq to generate suggestions. Do not include passport numbers, payment details or other sensitive information in a planning request. Your saved journeys and conversations are restricted to your account through database access policies.

We also automatically collect certain technical information when you visit, including: IP address, browser type and version, pages viewed, time spent on pages, referring URLs, and device information. This information is collected through standard web server logs and analytics tools.

We may collect cookies and similar tracking technologies as described in our Cookie Policy.`
    },
    {
        title: '2. How We Use Your Information',
        content: `We use the information we collect to:

• Respond to contact form submissions and inquiries
• Analyze Site traffic and usage patterns to improve content and user experience
• Detect and prevent fraudulent or abusive behavior
• Comply with legal obligations

We do not sell, rent, or trade your personal information to third parties for their marketing purposes.`
    },
    {
        title: '3. Cookies and Tracking Technologies',
        content: `We use cookies and similar technologies to improve your browsing experience. Cookies are small text files stored on your device by your browser.

We use:
• Essential cookies: necessary for the Site to function correctly
• Analytics cookies: help us understand how visitors interact with the Site (e.g., Google Analytics)
• Preference cookies: remember your settings and preferences

You can control cookie preferences through your browser settings or through our Cookie Consent banner. See our Cookie Policy for full details.`
    },
    {
        title: '4. Third-Party Services',
        content: `Our Site may link to external websites and services. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.

We use the following third-party services:
• Google Analytics: for website traffic analysis (governed by Google's Privacy Policy)
• Google AdSense: for displaying advertisements (governed by Google's Privacy Policy)
• Unsplash and similar image services: for photography

When we serve advertisements through Google AdSense, Google may use cookies and device identifiers to show you relevant ads. You can opt out of personalized advertising at: https://www.google.com/settings/ads`
    },
    {
        title: '5. Data Retention',
        content: `We retain contact form submissions for up to 12 months to respond to and follow up on inquiries. Analytics data is retained according to the third-party provider's policies (typically 14–26 months for Google Analytics).

We do not retain data longer than necessary for its stated purpose.`
    },
    {
        title: '6. Your Rights (GDPR / UK GDPR)',
        content: `If you are located in the European Economic Area or United Kingdom, you have the following rights:

• Right to access: You can request a copy of the personal data we hold about you.
• Right to rectification: You can request correction of inaccurate data.
• Right to erasure: You can request deletion of your data.
• Right to restrict processing: You can request we limit how we use your data.
• Right to data portability: You can request your data in a portable format.
• Right to object: You can object to processing based on legitimate interests.

To exercise any of these rights, please contact us at the address below. We will respond within 30 days.`
    },
    {
        title: '7. Children\'s Privacy',
        content: `Our Site is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will delete it promptly.`
    },
    {
        title: '8. Security',
        content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.`
    },
    {
        title: '9. Changes to This Policy',
        content: `We may update this Privacy Policy from time to time. The date at the top of this page reflects the most recent revision. Continued use of the Site after changes are posted constitutes your acceptance of the updated policy.`
    },
    {
        title: '10. Support',
        content: `If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us through our Support page at /support or email us directly at support@veloratravel.org.

We will respond to all privacy-related inquiries within 30 days.`
    }
];

const sectionId = (title: string) => title.replace(/^\d+\.\s*/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');

function Contents() {
    return (
        <ol className={styles.contentsList}>
            {SECTIONS.map((section, index) => (
                <li key={section.title}>
                    <a href={`#${sectionId(section.title)}`}>
                        <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                        <span>{section.title.replace(/^\d+\.\s*/, '')}</span>
                    </a>
                </li>
            ))}
        </ol>
    );
}

export default function PrivacyPolicyPage() {
    return (
        <main id="privacy-top" className={styles.page}>
            <div className={styles.container}>
                <header className={styles.hero}>
                    <div className={styles.heroCopy}>
                        <div className={styles.eyebrow}><ShieldCheck size={15} aria-hidden="true" /> LEGAL & PRIVACY</div>
                        <h1>Privacy Policy<span className={styles.titleDot}>.</span></h1>
                        <p className={styles.subtitle}>Your information. Your choices.<br />A little clarity for the journey ahead.</p>
                        <div className={styles.updated}><Clock3 size={14} aria-hidden="true" /> Last updated: <time dateTime="2026-08-17">{LAST_UPDATED}</time></div>
                    </div>
                    <div className={styles.heroAside}>
                        <div className={styles.shield}><ShieldCheck strokeWidth={1.1} aria-hidden="true" /></div>
                        <Link href="/support">Have a privacy question? <ArrowUpRight size={16} aria-hidden="true" /></Link>
                    </div>
                </header>

                <div className={styles.layout}>
                    <aside className={styles.sidebar}>
                        <nav aria-label="Privacy policy sections" className={styles.desktopContents}>
                            <p className={styles.navLabel}>ON THIS PAGE</p>
                            <Contents />
                        </nav>
                        <details className={styles.mobileContents}>
                            <summary>On this page <span>10 sections <ChevronDown size={16} aria-hidden="true" /></span></summary>
                            <nav aria-label="Privacy policy sections"><Contents /></nav>
                        </details>
                        <div className={styles.sidebarNote}>
                            <p>Looking for something else?</p>
                            <Link href="/terms">Terms of service <ArrowUpRight size={14} aria-hidden="true" /></Link>
                            <Link href="/cookies">Cookie policy <ArrowUpRight size={14} aria-hidden="true" /></Link>
                        </div>
                    </aside>

                    <article aria-label="Privacy policy" className={styles.paper}>
                        <div className={styles.intro}>
                            <span className={styles.smallLabel}>BEFORE WE BEGIN</span>
                        <p>
                            VeloraTravel (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, store, and share your information when you visit our website at VeloraTravel (&quot;the Site&quot;) and outlines your privacy rights.
                        </p>
                        <p className="mt-4">
                            Please read this policy carefully. If you disagree with its terms, please stop using the Site.
                        </p>

                        </div>
                        {SECTIONS.map((section, index) => (
                            <section id={sectionId(section.title)} key={section.title} className={styles.policySection} aria-labelledby={`${sectionId(section.title)}-heading`}>
                                <div className={styles.sectionHeading}>
                                    <span className={styles.sectionNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                                    <h2 id={`${sectionId(section.title)}-heading`}>{section.title.replace(/^\d+\.\s*/, '')}</h2>
                                </div>
                                <div className={styles.sectionBody}>
                                    {section.content.split('\n\n').map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))}
                                </div>
                            </section>
                        ))}
                        <div className={styles.paperFooter}><span>VeloraTravel · Legal</span><a href="#privacy-top">Back to top ↑</a></div>
                    </article>
                </div>

                <section className={styles.help} aria-labelledby="privacy-help">
                    <div><span className={styles.smallLabel}>HERE TO HELP</span><h2 id="privacy-help">Let’s make things clear.</h2><p>Questions about your information or this policy? Get in touch.</p></div>
                    <div className={styles.helpActions}><Link href="/support" className={styles.supportButton}>Contact support <ArrowRight size={16} aria-hidden="true" /></Link><CookieSettings /></div>
                </section>
            </div>
        </main>
    );
}
