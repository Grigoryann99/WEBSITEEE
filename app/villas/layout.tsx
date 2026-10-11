import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Villas & Chalet Stays — Comparison and Booking Checklist | VeloraTravel',
    description: 'Compare Soneva Fushi, Six Senses Zil Pasyon, and The Lodge in Verbier using official sources, suitability notes, and practical questions to ask before booking.',
};

export default function VillasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
