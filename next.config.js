/** @type {import('next').NextConfig} */
const nextConfig = {
  // The parent folder has its own package-lock.json, so Next guesses the
  // workspace root is one level up. Pin it to this app instead — otherwise file
  // tracing walks the whole `Crosswild ` folder (including the image archives).
  outputFileTracingRoot: __dirname,
  reactStrictMode: false,
  async redirects() {
    return [
      // ── Page renames ──
      // /services now has its own page — no redirect needed
      { source: '/gallery',        destination: '/image-gallery', permanent: true },
      { source: '/our-process',    destination: '/our_process',   permanent: true },
      // Typo fix: old URL was /desclaimer — now /disclaimer (308 permanent redirect)
      { source: '/desclaimer',     destination: '/disclaimer',    permanent: true },
      // ── Case-sensitivity fixes (old site used uppercase letters in slugs) ──
      { source: '/bags-manufacturer-in-Jodhpur',              destination: '/bags-manufacturer-in-jodhpur',              permanent: true },
      { source: '/tshirt-manufacturer-wholesaler-in-Kota',    destination: '/tshirt-manufacturer-wholesaler-in-kota',    permanent: true },
      { source: '/bags-manufacturing-company-in-Kota',        destination: '/bags-manufacturing-company-in-kota',        permanent: true },
      // ── Clean URL migration ──
      // Old plural /categories/<slug> → new singular /category/<slug>
      // Legacy /products?category=X&sub=Y is handled in src/middleware.ts so
      // the orphan query string gets stripped instead of carried over.
      { source: '/categories/:slug',  destination: '/category/:slug', permanent: true },
    ];
  },

  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com';

    // Location SEO pages — served without /locations/ prefix (matches production URLs)
    const locationSlugs = [
      'tshirt-manufacturer-in-jodhpur',
      'bags-manufacturer-in-jodhpur',
      'cap-printing-manufacturer-jodhpur',
      'uniform-manufacturer-jodhpur',
      'tshirt-manufacturer-in-indore',
      'bag-manufacturer-in-indore',
      'uniform-manufacturer-in-indore',
      'bags-manufacturing-company-in-udaipur',
      'tshirt-manufacturer-wholesaler-in-udaipur',
      'tshirt-manufacturer-wholesaler-in-kota',
      'bags-manufacturing-company-in-kota',
      'tshirt-manufacturer-wholesaler-in-sikar',
      'bags-manufacturing-company-in-sikar',
    ];

    return [
      { source: '/api/:path*', destination: `${backendUrl}/api/:path*` },
      ...locationSlugs.map((slug) => ({
        source: `/${slug}`,
        destination: `/locations/${slug}`,
      })),
    ];
  },
  async headers() {
    return [
      {
        // Security headers for all routes
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // Cache static images
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache Next.js static assets
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "**.ibb.co",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        // Cloudflare R2 — where the backend uploads images (STORAGE_DRIVER=r2).
        // Matches R2_PUBLIC_BASE in the backend env; pinned to this bucket rather
        // than **.r2.dev so the image optimizer can't be pointed at other buckets.
        protocol: "https",
        hostname: "pub-e632e16b74374ce8bb6fc4f36b6e36a7.r2.dev",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.thecrosswild.com",
      },
      {
        protocol: "https",
        hostname: "thecrosswild.com",
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
