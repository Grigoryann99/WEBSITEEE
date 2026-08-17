import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Luxury Villas — 60 Private Residences Worldwide | VeloraTravel',
    description: 'Discover our handpicked collection of 60 luxury private villas across 51 iconic destinations — from overwater bungalows in the Maldives to alpine retreats in Switzerland.',
};

export default function VillasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
