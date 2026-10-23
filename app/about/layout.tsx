import { Metadata } from 'next';

export const metadata: Metadata = {
    alternates: { canonical: '/about' },
    title: 'About',
    description: 'Meet Yura Grigoryan, founder of VeloraTravel, and discover the idea behind our destination guides, AI travel companion and personal planning tools.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
