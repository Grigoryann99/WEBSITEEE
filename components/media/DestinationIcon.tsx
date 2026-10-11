type DestinationIconProps = { variant: number };

/** Separate SVG layers let the illustration move while its frame stays still. */
export default function DestinationIcon({ variant }: DestinationIconProps) {
    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {variant === 0 && <>
                <circle cx="20" cy="20" r="14" />
                <path d="M20 6v3M20 31v3M6 20h3M31 20h3" />
                <g className="destination-icon-part compass-needle">
                    <path d="m26 14-4 8-8 4 4-8 8-4Z" />
                    <path d="m18 18 4 4" />
                </g>
                <circle cx="20" cy="20" r="1" fill="currentColor" stroke="none" />
            </>}
            {variant === 1 && <>
                <g className="destination-icon-part mountain-sun">
                    <circle cx="29" cy="11" r="3.5" />
                    <path d="M29 4V2M36 11h2M34 6l1.5-1.5M24 6l-1.5-1.5" />
                </g>
                <path d="m4 32 11-21 9 16 5-9 7 14H4Z" fill="#dceffb" />
                <path d="m11 19 4 2 3-3M25 25l4 1 2-3M4 34h32" />
            </>}
            {variant === 2 && <>
                <ellipse className="destination-icon-part pin-ripple" cx="20" cy="33" rx="9" ry="3" />
                <g className="destination-icon-part map-marker">
                    <path d="M30 16c0 8-10 15-10 15S10 24 10 16a10 10 0 0 1 20 0Z" fill="#dceffb" />
                    <circle cx="20" cy="16" r="3.5" />
                </g>
            </>}
            {variant === 3 && <>
                <path d="m5 24 3-14h7l3 14M22 24l3-14h7l3 14M10 10V7h3v3M27 10V7h3v3M18 18h4M18 24h4" />
                <circle cx="11.5" cy="26" r="7" />
                <circle cx="28.5" cy="26" r="7" />
                <g className="destination-icon-part binocular-glints">
                    <path d="M8 26a3.5 3.5 0 0 1 3.5-3.5M25 26a3.5 3.5 0 0 1 3.5-3.5" />
                </g>
            </>}
            {variant === 4 && <>
                <path d="M20 23v13M20 32c-7 0-10-4-10-7 5 0 8 2 10 7ZM20 30c6 0 9-3 9-6-4 0-7 2-9 6Z" />
                <g className="destination-icon-part flower-petals">
                    <path d="M20 12c-6-9-11-4-8 1-10-1-10 6-3 8-5 8 1 11 6 5 3 10 10 7 9 0 9 5 12-2 6-6 10-4 6-10-1-8 0-10-7-9-9 0Z" />
                </g>
                <circle cx="20" cy="19" r="3.5" fill="#dceffb" />
            </>}
        </svg>
    );
}
