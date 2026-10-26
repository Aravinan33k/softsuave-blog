import 'server-only';

/**
 * JSON-LD for `/case-study-wellpet-ai-smart-wellness-platform`: softsuave.com's
 * own schema for this page, verbatim. The live page's HTML carries exactly one
 * JSON-LD block — this NewsArticle — copied as served, quirks included (the
 * blog-author URL). Its `image` is the page's share card, which this site
 * hosts at the same path (`public/assets/case-studies/`).
 *
 * As with the Vehicle Intelligence page, the route is in
 * `PAGES_WITH_OWN_SITE_GRAPH`, so the layout adds no Organization or WebSite.
 */
export const wellPetArticleLd = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "WellPet AI Smart Wellness Platform",
  "image": [
    "https://www.softsuave.com/assets/case-studies/well-pet-og.webp"
  ],
  "datePublished": "2026-08-14T08:00:00+08:00",
  "dateModified": "2026-08-14T09:20:00+08:00",
  "author": [{
    "@type": "Person",
    "name": "Veera S",
    "url": "https://www.softsuave.com/blog/author/admin/"
  }]
} as const;
