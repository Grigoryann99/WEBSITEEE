import { Metadata } from 'next';
import SupportHero from '@/components/contact/SupportHero';
import SupportSearch from '@/components/contact/SupportSearch';
import SupportCategories from '@/components/contact/SupportCategories';
import FAQSection from '@/components/contact/FAQSection';
import SupportForm from '@/components/contact/SupportForm';
import SupportAdditional from '@/components/contact/SupportAdditional';

export const metadata: Metadata = {
    title: 'Support Center | VeloraTravel',
    description: 'Get help using VeloraTravel, explore destinations, and contact support for travel information and website assistance.',
};

export default function ContactPage() {
    return (
        <div className="bg-brand-dark min-h-screen">
            <SupportHero />
            <SupportSearch />
            <SupportCategories />
            <FAQSection />
            <SupportForm />
            <SupportAdditional />
        </div>
    );
}
