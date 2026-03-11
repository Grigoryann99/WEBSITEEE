import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cookie Policy | VeloraTravel',
    description: 'Learn how VeloraTravel uses cookies and how you can manage your preferences.',
};

const LAST_UPDATED = 'March 10, 2025';

export default function CookiesPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-brand-light">
            <section className="max-w-3xl mx-auto px-6 pt-40 pb-24">
                <p className="font-sans text-brand-accent tracking-[0.3em] text-xs uppercase mb-6">Legal</p>
                <h1 className="font-serif text-4xl md:text-5xl text-brand-light mb-4">Cookie Policy</h1>
                <p className="font-sans text-brand-light/50 text-sm mb-12">Last updated: {LAST_UPDATED}</p>

                <div className="space-y-10 font-sans text-brand-light/70 font-light leading-relaxed">
                    <p>
                        This Cookie Policy explains what cookies are, how VeloraTravel uses them, and your choices regarding cookies. By using our website, you consent to the use of cookies in accordance with this policy.
                    </p>

                    {[
                        {
                            title: '1. What Are Cookies?',
                            content: `Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work efficiently and to provide information to the website owner.

Cookies do not contain personally identifiable information on their own, but information we store about you may be linked to information stored in cookies.`,
                        },
                        {
                            title: '2. Types of Cookies We Use',
                            content: `We use the following categories of cookies:

Strictly Necessary Cookies
These cookies are essential for the website to function. Without them, services you have requested (such as form submissions) cannot be provided. These cookies do not require your consent under GDPR.

Analytics Cookies
We use Google Analytics to understand how visitors use our website. These cookies collect information about pages visited, time spent on pages, and how visitors found the site. This data is aggregated and anonymous. Cookie examples: _ga, _gid (Google Analytics).

Advertising Cookies
If Google AdSense advertisements are displayed on our site, Google may place advertising cookies on your device to show you relevant ads based on your browsing history. Cookie examples: IDE, NID (Google advertising).

Preference Cookies
These cookies remember your choices and settings (for example, your cookie consent preference) so you do not need to re-enter them on each visit.`,
                        },
                        {
                            title: '3. Third-Party Cookies',
                            content: `Some cookies on our site are set by third-party services:

• Google Analytics: analytics and usage tracking
• Google AdSense: advertising and ad personalization
• Unsplash: image delivery (may set session cookies)

These third parties have their own privacy policies governing their use of cookies. We encourage you to review:
• Google's Privacy Policy: https://policies.google.com/privacy
• Google's Ad settings: https://www.google.com/settings/ads`,
                        },
                        {
                            title: '4. How Long Cookies Last',
                            content: `Cookies vary in duration:

Session cookies: deleted when you close your browser
Persistent cookies: remain on your device for a set period or until manually deleted

Google Analytics cookies (_ga) last up to 2 years. Advertising cookies (IDE) last up to 13 months. Consent cookies last up to 12 months.`,
                        },
                        {
                            title: '5. Your Cookie Choices',
                            content: `You have several options for controlling cookies:

Cookie Consent Banner: When you first visit our site, you will see a cookie consent banner allowing you to accept all cookies or manage your preferences.

Browser Settings: Most browsers allow you to control cookies through your browser settings. You can set your browser to refuse all cookies, accept only certain cookies, or be notified when cookies are set. However, disabling cookies may affect the functionality of our website.

Google Analytics Opt-Out: Install the Google Analytics Opt-out Browser Add-on: https://tools.google.com/dlpage/gaoptout

Ad Personalization: Manage your Google ad preferences at: https://www.google.com/settings/ads`,
                        },
                        {
                            title: '6. Updates to This Policy',
                            content: `We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our practices. The date at the top of this page shows when the policy was last updated.`,
                        },
                        {
                            title: '7. Contact Us',
                            content: `If you have questions about our use of cookies, please contact us through our Support page at /support.`,
                        },
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
