/**
 * softsuave.com's site-wide Organization JSON-LD — the block its GTM
 * container (GTM-TWMFSDC) injects into every page — copied VERBATIM from the
 * rendered DOM of live's case-study pages (ParkSafe, Smart Warranty; 26 Oct).
 *
 * Live's case-study pages carry no JSON-LD in their HTML; this block arrives
 * only once GTM runs, so view-source, crawlers that don't execute it and any
 * visitor whose blocker stops GTM see none. A page that must carry its
 * Organization in the HTML emits this (`<JsonLd data={liveSiteOrganizationLd} />`)
 * — the same content live shows, not the richer `organizationLd`
 * (`lib/seo/organization.ts`) the marketing layout uses elsewhere. GTM still
 * injects its own copy once it loads, so such a page ends with two identical
 * Organization blocks, as the spec pages that emit `softSuaveOrganizationLd`
 * do; search engines merge identical nodes.
 *
 * Kept as live has it, quirks included: no `@id`, phone numbers in display
 * format, and the Instagram profile listed twice in `sameAs`.
 */
export const liveSiteOrganizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Soft Suave Technologies",
  "url": "https://www.softsuave.com/",
  "logo": "https://www.softsuave.com/new-assets/common/images/softsuave_logo.webp",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91 99527 32708",
      "contactType": "sales",
      "areaServed": "IN",
      "availableLanguage": ["en", "Tamil", "Hindi"],
    },
    {
      "@type": "ContactPoint",
      "telephone": "+1 (410) 220-6301",
      "contactType": "sales",
      "areaServed": "US",
      "availableLanguage": "en",
    },
  ],
  "sameAs": [
    "https://in.linkedin.com/company/softsuave",
    "https://www.instagram.com/softsuavetech/",
    "https://www.instagram.com/softsuavetech/",
    "https://www.facebook.com/softsuave/",
    "https://www.youtube.com/@softsuave",
  ],
} as const;
