import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | VeloraTravel',
    description: 'Learn how VeloraTravel collects, uses, and protects your personal information.',
};

const LAST_UPDATED = 'March 10, 2025';

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-brand-light">
            <section className="max-w-3xl mx-auto px-6 pt-40 pb-24">
                <p className="font-sans text-brand-accent tracking-[0.3em] text-xs uppercase mb-6">Legal</p>
                <h1 className="font-serif text-4xl md:text-5xl text-brand-light mb-4">Privacy Policy</h1>
                <p className="font-sans text-brand-light/50 text-sm mb-12">Last updated: {LAST_UPDATED}</p>

                <div className="space-y-10 font-sans text-brand-light/70 font-light leading-relaxed">

                    <div>
                        <p>
                            VeloraTravel (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, store, and share your information when you visit our website at VeloraTravel (&quot;the Site&quot;) and outlines your privacy rights.
                        </p>
                        <p className="mt-4">
                            Please read this policy carefully. If you disagree with its terms, please stop using the Site.
                        </p>
                    </div>

                    {[
                        {
                            title: '1. Information We Collect',
                            content: `We collect information you provide directly, such as when you fill out our Contact form (name, email address, and message content). We do not require account creation to use the Site.

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
                            title: '10. Contact Us',
                            content: `If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us through our Contact page at /contact.

We will respond to all privacy-related inquiries within 30 days.`
                        }
                    ].map((section) => (
                        <div key={section.title}>
                            <h2 className="font-serif text-xl text-brand-light mb-4">{section.title}</h2>
                            <div className="space-y-3">
                                {section.content.split('\n\n').map((para, i) => (
                                    <p key={i} className="whitespace-pre-line">{para}</p>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            </section>
        </main>
    );
}
