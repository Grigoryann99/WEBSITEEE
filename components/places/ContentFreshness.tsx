'use client';

import { useEffect, useState } from 'react';
import { contentForPlace, romeCatalog } from '@/lib/content/repository';
import { fieldReview } from '@/lib/content/freshness';

export default function ContentFreshness({ placeId }: { placeId: string }) {
    const [today, setToday] = useState<string | null>(null);
    useEffect(() => {
        const sync = () => setToday(new Date().toISOString().slice(0, 10));
        sync(); window.addEventListener('focus', sync);
        return () => window.removeEventListener('focus', sync);
    }, []);
    const entry = contentForPlace(placeId);
    if (!entry) return null;
    const reviews = today ? (['price', 'hours'] as const).filter(field => field !== 'hours' || entry.place.hours)
        .map(field => fieldReview(entry, field, romeCatalog.reviewPolicy, today)) : [];
    return <div className="mb-4 rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
        <p className="font-medium text-ink-900">Know before you go</p>
        <p className="mt-1">Research compiled {entry.place.lastChecked}. Confirm prices and opening times with the venue before visiting.</p>
        {reviews.length > 0 && <dl className="mt-3 grid gap-3 sm:grid-cols-2">{reviews.map(review => <div key={review.field}>
            <dt className="font-medium text-ink-700">{review.field === 'price' ? 'Price source check' : 'Opening hours source check'}</dt>
            <dd className="mt-1">{review.status === 'unverified' ? 'Awaiting a source check.' : <>Checked {review.checkedOn}. {review.status === 'due' ? 'Review due — please reconfirm.' : `Next review by ${review.dueOn}.`}</>}</dd>
        </div>)}</dl>}
    </div>;
}
