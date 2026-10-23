import type { Metadata } from 'next';
import Link from 'next/link';
import { romeCatalog } from '@/lib/content/repository';
import { photoFor } from '@/lib/places/catalog';

export const metadata: Metadata = { title: 'Photography credits', description: 'Photography sources, creators and licences for the Rome city companion.' };

export default function ImageCreditsPage() {
    const entries = romeCatalog.entries.filter(entry => photoFor(entry.place.id));
    return <main className="mx-auto max-w-5xl px-5 pb-20 pt-32 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-sky-700">THE ROME COMPANION</p>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Photography, with credit.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-ink-500">Images of places, nearby streets and travel inspiration. Neighbourhood and illustrative photographs are labelled wherever they appear; they do not show the venue itself. Older photographs may differ from what you see today.</p>
        <Link href="/destinations/italy/rome" className="mt-5 inline-block text-sm text-sky-700 underline">Back to the Rome companion</Link>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">{entries.map(({ place, media }) => media && <article key={place.id} id={place.id} className="scroll-mt-28 rounded-3xl border border-sky-100 bg-white/80 p-6">
            <h2 className="font-serif text-xl">{place.name}</h2>
            <p className="mt-3 text-xs leading-6 text-ink-500">{media.credit}</p>
            {media.caption && <p className="mt-2 text-xs leading-6 text-ink-500">{media.caption}</p>}
            {media.representative && <p className="mt-2 text-xs font-medium text-sky-700">{media.context === 'area' ? 'Neighbourhood photograph — not the venue.' : 'Illustrative photograph — not the venue.'}</p>}
            {media.changes && <p className="mt-2 text-xs leading-6 text-ink-500">{media.changes}{media.license?.includes('BY-SA') ? ` This adapted image is shared under ${media.license}.` : ''}</p>}
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-sky-700">
                {media.creditUrl && <a href={media.creditUrl} target="_blank" rel="noopener noreferrer" className="underline">Original source & attribution</a>}
                {media.licenseUrl && <a href={media.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline">{media.license || 'Licence'}</a>}
                {media.src.startsWith('/images/places/rome/') && <a href={media.src} className="underline">View local image</a>}
            </div>
        </article>)}</div>
    </main>;
}
