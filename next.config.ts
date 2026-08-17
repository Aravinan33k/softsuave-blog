import type { NextConfig } from 'next';

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

// This app is mounted as a SUBPATH of the existing softsuave.com site: the
// reverse proxy sends /blog/* here and everything else to the current website.
// basePath makes Next prefix every route, asset and internal <Link> with it, so
// the app keeps using root-relative paths internally ("/", "/my-post", "/admin")
// while the browser only ever sees /blog/... — no per-link rewriting needed.
//
// Because of this the marketing homepage in app/(marketing) is NOT reachable in
// this deployment: /blog is the deepest the proxy hands over, so there is no way
// for this app to own the site root. The existing homepage keeps serving it.
const BASE_PATH = '/blog';

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
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
      // Under basePath these assets are served prefixed. Both forms are allowed so
      // the optimizer accepts stored URLs whether or not they carry the subpath.
      { pathname: `${BASE_PATH}/uploads/**`, search: '' },
      { pathname: `${BASE_PATH}/images/**`, search: '' },
      { pathname: `${BASE_PATH}/brand/**`, search: '' },
    ],
    remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' }],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  // Redirects are matched before the filesystem, so this wins over
  // app/(marketing)/page.tsx without that route having to know about the flag.
  //
  // While the homepage is unreleased, "/" hands the visitor to the blog archive.
  // `permanent: false` (307) is load-bearing: browsers and search engines cache
  // a 301 indefinitely, so shipping one here would keep sending people to /blog
  // long after the homepage goes live — the one thing this staging must not do.
  // No "/" → "/blog" redirect any more. Under basePath, "/" IS the public /blog,
  // so that redirect would now send /blog to /blog/blog. The admin needs no rule
  // either: basePath already publishes app "/admin" at /blog/admin, natively and
  // without a redirect hop, so internal links stay client-side navigable.
  //
  // What remains is the archive's own address. The archive route is app/blog, so
  // basePath alone would publish it at /blog/blog; this collapses that onto the
  // clean /blog the proxy hands over.
  async redirects() {
    return [
      // Public /blog/blog → /blog, so the archive has exactly one URL. Permanent
      // is safe here: /blog/blog is a new address that has never been published.
      { source: '/blog', destination: '/', permanent: true },
      // Bare "/" — i.e. OUTSIDE basePath — hands over to the archive. `basePath:
      // false` opts this rule out of the prefix, which redirects allow (rewrites to
      // internal routes do not). In production the proxy never sends "/" here, so
      // this is inert; in local dev it stops localhost:3100 being a dead 404.
      { source: '/', destination: BASE_PATH, permanent: false, basePath: false },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Public /blog (app "/") serves the archive. Rewritten rather than moved
        // so app/(marketing) can keep owning "/" for a future root deployment.
        { source: '/', destination: '/blog' },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
