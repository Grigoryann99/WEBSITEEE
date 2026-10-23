const nextConfig = {
    poweredByHeader: false,
    distDir: process.env.NEXT_BUILD_DIR || '.next',
    async headers() {
        return [{ source: '/:path*', headers: [
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
            { key: 'Content-Security-Policy', value: "base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'" },
            { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
            ...(process.env.NODE_ENV === 'production' ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000' }] : []),
        ] }];
    },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'plus.unsplash.com' },
            { protocol: 'https', hostname: 'source.unsplash.com' },
            { protocol: 'https', hostname: 'upload.wikimedia.org' },
            { protocol: 'https', hostname: 'thumb.wikimedia.org' },
            { protocol: 'https', hostname: 'images.pexels.com' },
            { protocol: 'https', hostname: 'picsum.photos' },
            { protocol: 'https', hostname: 'loremflickr.com' },
        ]
    },
};

export default nextConfig;
