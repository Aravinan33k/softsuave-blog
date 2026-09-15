import type { NextConfig } from 'next';
import { homepageEnabled } from './src/lib/flags';
import { HIRE_PATHS } from './src/lib/home/hire-skills';

const isProd = process.env.NODE_ENV === 'production';

// Content-Security-Policy. Our public pages are static/ISR, so per-request
// nonces aren't viable — inline scripts/styles are allowed instead (Next
// hydration + JSON-LD + inline analytics snippets). 'unsafe-eval' is dev-only
// (Turbopack/React refresh). External analytics providers need their domains
// added to script-src/connect-src.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'", // allow same-origin theme-preview iframe
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline'${isProd ? '' : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // HSTS only in production (HTTPS). Harmless-but-pointless over dev HTTP.
  ...(isProd
    ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }]
    : []),
];

// This app owns the whole site, not a subpath of it: "/" is the marketing
// homepage (app/(marketing)), "/blog" the post archive, "/<slug>" every post and
// page, "/admin" the dashboard. There is no `basePath` — the reverse proxy hands
// over the domain root (see deploy/nginx.example.conf), so routes, assets and
// stored media URLs are all served from where they are written.
//
// It was briefly mounted at basePath '/blog' instead, with the archive on "/".
// The redirects below retire the URLs that mount published.

// Routes in app/(marketing): the homepage plus the service landing pages. They
// ship together behind NEXT_PUBLIC_HOMEPAGE_ENABLED — add a new service page's
// path here when you add the route, or it goes live ahead of the homepage.
// Mirrored by MARKETING_PATHS in src/themes/softsuave/nav-data.ts, which decides
// whether the nav links to them locally or out to the live site.
const MARKETING_ROUTES = [
  '/',
  '/ai-development-service',
  '/contact',
  '/awards-recognition',
  '/custome-ai-developement',
  '/generative-ai-development-company',
  '/agentic-ai-development-services',
  // Delivery-model and engineering-service pages. Their slugs match live pages
  // on softsuave.com, so while the flag is off these routes hand the visitor to
  // /blog here and the nav points at the live equivalents (see MARKETING_PATHS
  // in src/themes/softsuave/nav-data.ts) — which is the whole point of the gate:
  // the new versions ship with the homepage, not ahead of it.
  '/global-capability-center',
  '/offshore-software-development-company',
  '/it-staff-augmentation-services',
  '/it-outsourcing-company-india',
  '/legacy-modernization-services',
  '/product-engineering-services',
  '/cloud-computing',
  // Industry AI pages. Same reasoning as the delivery pages above: their slugs
  // match live softsuave.com URLs, so while the flag is off these routes hand
  // the visitor to /blog and the nav points at the live equivalents.
  '/fintech-ai-solutions',
  '/ai-solutions-in-healthtech',
  '/ai-solutions-in-edutech',
  '/ai-solutions-for-ecommerce',
  '/ai-in-logistics',
  '/ai-solutions-for-telecom',
  '/ai-solutions-for-construction',
  // Company pages.
  '/about',
  // The 24 hire-by-skill pages, from their own registry. Same reasoning as the
  // delivery pages above: their slugs match live softsuave.com URLs, so while
  // the flag is off these routes hand the visitor to /blog and the nav points
  // at the live equivalents.
  ...HIRE_PATHS,
];

// How many workers `next build` may use to prerender pages in parallel.
//
// Next defaults this to the machine's CPU count. That became a problem when the
// seven service pages started rendering the homepage's own section components:
// each of those scenes (the industries fan, the pinned case-study lane, the
// stats odometer) is heavy to prerender, and eight such pages building at once
// across eleven workers exhausted the heap — the build died with
// "Zone Allocation failed - process out of memory" partway through static
// generation. Raising --max-old-space-size does not help, because the limit is
// total machine memory divided across workers, not any single worker's ceiling.
//
// Two is what reliably completes here. Set NEXT_BUILD_CPUS higher on a CI
// machine with more memory to get the parallelism back — this is a resource
// cap, not a correctness requirement, so nothing breaks by changing it.
const buildCpus = Number(process.env.NEXT_BUILD_CPUS) || 2;

const nextConfig: NextConfig = {
  experimental: { cpus: buildCpus },
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the workspace root. Turbopack otherwise walks up looking for one and
  // latches onto whatever stray package.json lives in the user's home directory
  // — it warns and ignores it, but leaving the root ambiguous means file
  // watching and module resolution are only accidentally scoped to this project.
  turbopack: { root: import.meta.dirname },
  // Allow next/image to optimize our own uploads (STORAGE_DRIVER=local) and
  // Cloudinary-hosted media (STORAGE_DRIVER=cloudinary). This Next build 400s
  // local optimizer requests unless localPatterns permits them explicitly —
  // which also covers the marketing homepage's bundled art in /public/images
  // and /public/brand. Every pattern pins `search: ''` so the optimizer only
  // ever serves these exact paths.
  images: {
    localPatterns: [
      { pathname: '/uploads/**', search: '' },
      { pathname: '/images/**', search: '' },
      { pathname: '/brand/**', search: '' },
    ],
    remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' }],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  // Redirects are matched before the filesystem, so the "/" rule below wins over
  // app/(marketing)/page.tsx without that route having to know about the flag.
  async redirects() {
    return [
      // While the homepage is unreleased the whole marketing surface hands the
      // visitor to the archive — "/" and every service page in app/(marketing),
      // which share its route group, theme and release flag. Listing them here is
      // what makes `navHref` in themes/softsuave/nav-data.ts honest: it sends
      // those links to the live site precisely because these routes are built but
      // not served yet.
      //
      // `permanent: false` (307) is load-bearing: browsers and search engines
      // cache a 301 indefinitely, so shipping one here would keep sending people
      // to /blog long after the homepage goes live — the one thing this staging
      // must not do. With the flag on there are no rules and the pages render.
      ...(homepageEnabled
        ? []
        : MARKETING_ROUTES.map((source) => ({ source, destination: '/blog', permanent: false }))),

      // Retire the subpath mount's URLs. Under basePath '/blog' every post,
      // taxonomy and asset answered one level deeper than it does now, and those
      // URLs were live long enough to be linked and indexed.
      //
      // Order matters — Next matches top-down, so the specific paths must come
      // before the catch-all slug rule. None of these can match bare "/blog":
      // every source requires at least one segment after it, so the archive
      // itself is never redirected onto itself.
      //
      // 302 for /blog/admin, deliberately: unlike content URLs it carries no SEO
      // weight, and a cached 301 on an admin entry point is unrevokable.
      { source: '/blog/admin/:path*', destination: '/admin/:path*', permanent: false },
      { source: '/blog/uploads/:path*', destination: '/uploads/:path*', permanent: true },
      { source: '/blog/category/:slug', destination: '/category/:slug', permanent: true },
      { source: '/blog/tag/:slug', destination: '/tag/:slug', permanent: true },
      { source: '/blog/search', destination: '/search', permanent: true },
      // Posts and pages. Single-segment only: a deeper path was never a valid
      // route under the mount either, so it should 404 rather than redirect.
      { source: '/blog/:slug', destination: '/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
