import { Metadata } from 'next';
import ContactHero from '@/components/contact/ContactHero';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import ContactCTA from '@/components/contact/ContactCTA';

export const metadata: Metadata = {
    title: 'Contact Us | VeloraTravel',
    description: 'Get in touch with our luxury travel specialists to curate your perfect escape.',
};

export default function ContactPage() {
    return (
        <div className="bg-brand-dark min-h-screen pt-20"> {/* pt-20 to account for fixed navigation */}
            <ContactHero />

            <section className="container mx-auto max-w-7xl px-4 md:px-8 py-20 lg:py-32 relative z-30 -mt-10 lg:-mt-20">
                <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
                    <div className="w-full lg:w-5/12 xl:w-1/3 flex flex-col justify-start pt-10">
                        <h2 className="font-serif text-[40px] md:text-[56px] leading-[1.1] tracking-wide text-white mb-6">
                            Let&apos;s talk <br className="hidden lg:block" /> about your next journey.
                        </h2>
                        <p className="font-inter text-white/60 font-light leading-relaxed mb-12 max-w-md">
                            Whether you seek a secluded villa in the Mediterranean or a bespoke adventure across continents, our advisors are at your service.
                        </p>

                        <ContactInfo />
                    </div>

                    <div className="w-full lg:w-7/12 xl:w-2/3">
                        <ContactForm />
                    </div>
                </div>
            </section>

            <ContactCTA />
        </div>
    );
}
