import { Metadata } from 'next';
import SupportHero from '@/components/contact/SupportHeroV2';
import SupportCategories from '@/components/contact/SupportCategoriesV2';
import FAQSection from '@/components/contact/FAQSectionV2';
import SupportForm from '@/components/contact/SupportFormV2';
import SupportAdditional from '@/components/contact/SupportAdditionalV2';

export const metadata: Metadata = {
    title: 'Support Center | VeloraTravel',
    description: 'Get help using VeloraTravel, explore destinations, and contact support for travel information and website assistance.',
};

export default function ContactPage() {
    return (
        <div className="bg-[#F9F9F9] min-h-screen">
            <SupportHero />
            <SupportCategories />
            <FAQSection />
            <SupportForm />
            <SupportAdditional />
        </div>
    );
}
