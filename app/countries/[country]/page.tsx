import { notFound, permanentRedirect } from 'next/navigation';
import { countries } from '@/lib/countryData';
export default async function LegacyCountry({ params: pendingParams }: { params: Promise<{ country: string }> }) {
    const params = await pendingParams;
    const key = params.country.toLowerCase().replace(/-/g, '_');
    if (!Object.prototype.hasOwnProperty.call(countries, key)) notFound();
    permanentRedirect(`/destinations/${key.replace(/_/g, '-')}`);
}
