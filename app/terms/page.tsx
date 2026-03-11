import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | VeloraTravel',
    description: 'Read the Terms of Service for using the VeloraTravel website.',
};

const LAST_UPDATED = 'March 10, 2025';

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-brand-light">
            <section className="max-w-3xl mx-auto px-6 pt-40 pb-24">
                <p className="font-sans text-brand-accent tracking-[0.3em] text-xs uppercase mb-6">Legal</p>
                <h1 className="font-serif text-4xl md:text-5xl text-brand-light mb-4">Terms of Service</h1>
                <p className="font-sans text-brand-light/50 text-sm mb-12">Last updated: {LAST_UPDATED}</p>

                <div className="space-y-10 font-sans text-brand-light/70 font-light leading-relaxed">
                    <p>
                        Please read these Terms of Service (&quot;Terms&quot;) carefully before using the VeloraTravel website (&quot;the Site&quot;). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.
                    </p>

                    {[
                        {
                            title: '1. Use of the Site',
                            content: `VeloraTravel provides travel information, editorial content, destination guides, and news aggregation for informational purposes only. The Site is intended for personal, non-commercial use.

You agree not to:
• Use the Site for any unlawful purpose
• Reproduce, duplicate, or copy material from the Site without permission
• Use automated tools to scrape or collect data from the Site
• Attempt to interfere with the Site's operation or security
• Post or transmit harmful, offensive, or misleading content`
                        },
                        {
                            title: '2. Intellectual Property',
                            content: `All content on this Site — including text, images, graphics, logos, and design — is the property of VeloraTravel or its content suppliers and is protected by applicable intellectual property laws.

You may share individual articles or pages for personal use provided you credit VeloraTravel and link back to the original page. Commercial reproduction or redistribution of any content requires prior written permission.

External images are sourced from Unsplash, Pexels, and Wikimedia Commons under their respective licenses.`
                        },
                        {
                            title: '3. Accuracy of Information',
                            content: `Travel information changes frequently. Visa requirements, prices, opening hours, and travel conditions described on this Site may have changed since publication.

VeloraTravel makes reasonable efforts to ensure accuracy but cannot guarantee that all information is current, complete, or free from error. Always verify critical travel information (visas, entry requirements, safety conditions) with official government sources before travel.

Nothing on this Site constitutes professional travel, legal, medical, or financial advice.`
                        },
                        {
                            title: '4. External Links',
                            content: `The Site may contain links to third-party websites. These links are provided for your convenience and do not constitute an endorsement of those sites. VeloraTravel is not responsible for the content, privacy practices, or availability of external sites.

The Global News section aggregates content from third-party RSS feeds. VeloraTravel is not responsible for the accuracy or content of third-party articles.`
                        },
                        {
                            title: '5. Advertising',
                            content: `VeloraTravel may display advertisements through Google AdSense and other advertising networks. These ads are served by third parties whose privacy practices are governed by their own policies. VeloraTravel does not control the content of third-party advertisements.

Clicking on advertisements may take you to external websites. VeloraTravel is not responsible for the content or practices of advertised sites.`
                        },
                        {
                            title: '6. Disclaimer of Warranties',
                            content: `The Site is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. VeloraTravel does not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.

Your use of the Site is at your sole risk.`
                        },
                        {
                            title: '7. Limitation of Liability',
                            content: `To the fullest extent permitted by law, VeloraTravel shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the Site or its content.

This includes, without limitation, damages arising from reliance on travel information that proves to be inaccurate or out of date.`
                        },
                        {
                            title: '8. Contact Form',
                            content: `By submitting our contact form, you consent to VeloraTravel processing your submitted information (name, email, message) for the purpose of responding to your inquiry. We will not use this information for marketing without your explicit consent.`
                        },
                        {
                            title: '9. Changes to Terms',
                            content: `We may update these Terms at any time. The date at the top of this page reflects the most recent revision. Continued use of the Site after changes are posted means you accept the updated Terms.`
                        },
                        {
                            title: '10. Governing Law',
                            content: `These Terms are governed by and construed in accordance with applicable law. Any disputes arising from these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the relevant courts.`
                        },
                        {
                            title: '11. Contact',
                            content: `If you have questions about these Terms, please contact us via our Support page at /support.`
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
