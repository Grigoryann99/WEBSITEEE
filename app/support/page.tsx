import { Metadata } from 'next';
import SupportWorkspace from '@/components/support/SupportWorkspace';

export const metadata: Metadata = {
    alternates: { canonical: '/support' },
    title: 'Support & Verification Center | VeloraTravel',
    description: 'Get concierge assistance, browse travel planning FAQs, or report inaccurate venue prices and schedules.',
};

export default function SupportPage() {
    return (
        <main className="min-h-screen bg-cream text-ink pt-24 pb-16 selection:bg-sky-200">
            <SupportWorkspace />
        </main>
    );
}
