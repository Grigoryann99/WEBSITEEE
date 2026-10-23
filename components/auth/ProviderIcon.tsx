export default function ProviderIcon({ provider }: { provider: 'google' | 'apple' | 'azure' }) {
    if (provider === 'google') return <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
        <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.89-1.74 2.98-4.31 2.98-7.36Z" />
        <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.41l-3.24-2.51c-.9.6-2.04.96-3.38.96-2.61 0-4.82-1.76-5.61-4.12H3.04v2.59A10 10 0 0 0 12 22Z" />
        <path fill="#FBBC05" d="M6.39 13.92a6 6 0 0 1 0-3.84V7.49H3.04a10 10 0 0 0 0 9.02l3.35-2.59Z" />
        <path fill="#EA4335" d="M12 5.96c1.47 0 2.79.51 3.82 1.51l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.96 5.49l3.35 2.59C7.18 7.72 9.39 5.96 12 5.96Z" />
    </svg>;
    if (provider === 'azure') return <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
        <path fill="#F25022" d="M2 2h9v9H2z" /><path fill="#7FBA00" d="M13 2h9v9h-9z" />
        <path fill="#00A4EF" d="M2 13h9v9H2z" /><path fill="#FFB900" d="M13 13h9v9h-9z" />
    </svg>;
    return <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#25343F]" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.06 7.3c1.35.07 2.29.76 3.08.82 1.18-.24 2.31-.94 3.57-.85 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.08ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z" />
    </svg>;
}
