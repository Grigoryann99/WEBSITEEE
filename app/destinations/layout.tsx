import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Explore 50+ Global Destinations — Travel Guides | VeloraTravel',
    description: 'Browse our curated directory of 50+ world-class destinations across 6 continents. Find in-depth travel guides, insider tips, and expert recommendations for your next luxury journey.',
};

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
