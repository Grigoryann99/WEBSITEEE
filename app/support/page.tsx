import { Metadata } from 'next';
import AuroraBorealisBackground from '@/components/contact/AuroraBorealisBackground';
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
        <div className="relative min-h-screen text-[#0F172A] bg-[#F8FAF9]">
            {/* Dynamic Light Aurora Background */}
            <AuroraBorealisBackground />

            {/* Page Content */}
            <div className="relative z-10">
                <SupportHero />
                <SupportCategories />
                <FAQSection />
                <SupportForm />
                <SupportAdditional />
            </div>
        </div>
    );
}
