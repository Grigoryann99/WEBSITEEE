const nextConfig = {
    images: {
        domains: [
            "images.unsplash.com",
            "source.unsplash.com",
            "upload.wikimedia.org",
            "images.pexels.com"
        ]
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
