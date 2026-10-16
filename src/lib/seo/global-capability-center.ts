import 'server-only';

/**
 * JSON-LD for `/global-capability-center`: softsuave.com's own schema for this page,
 * verbatim (review: "Schemas must be updated; remove the unnecessary ones —
 * implement the live page schema"). The live page's HTML carries a lone WebPage block; each
 * is copied here as served, in the order served, and renders as its own
 * <script>.
 *
 * As on the other live-schema pages, the rest of what an SEO tool reports on
 * the live page is not the page's own: its site Organization is injected by
 * the shared GTM container and its address microdata sits in the footer. So
 * the route is in `PAGES_WITH_OWN_SITE_GRAPH` (the layout adds no Organization
 * or WebSite) and the footer keeps its address microdata, as live's does.
 */
export const GCC_LIVE_LD: readonly object[] = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Global Capability Centers: Enhancing Operational Excellence and Innovation",
    "url": "https://www.softsuave.com/global-capability-center",
    "description": "Learn how establishing Global Capability Centers can streamline operations, drive innovation, and provide strategic advantages in the global market.",
    "publisher": {
      "@type": "Organization",
      "name": "Soft Suave",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.softsuave.com/blog/wp-content/uploads/2024/11/SS_logo_color-191x42.webp"
      }
    }
  }
];
