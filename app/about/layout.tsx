import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | VeloraTravel',
    description: 'Learn about VeloraTravel — our story, our mission, and the people who curate the world\'s finest travel experiences for discerning travelers.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
