import type { Metadata } from 'next';
import CustomPlanRequest from '@/components/planner/CustomPlanRequest';
export const metadata: Metadata = { title: 'A journey planned around you', alternates: { canonical: '/plan/custom' } };
export default function CustomPage() { return <main className="concierge-surface min-h-screen px-5 pb-20 pt-32"><div className="mx-auto max-w-3xl"><p className="concierge-eyebrow">A more personal itinerary</p><h1 className="mt-4 font-serif text-4xl sm:text-6xl">Let the details<br /><em>come together.</em></h1><p className="mt-5 text-ink-500">Tell us about the journey you have in mind.</p><CustomPlanRequest /></div></main>; }
