import type { Metadata } from 'next';
import PlaceCollection from '@/components/places/PlaceCollection';
export const metadata: Metadata = { title: 'Saved places', robots: { index: false, follow: false } };
export default function SavedPage() { return <PlaceCollection />; }
