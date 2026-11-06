import 'server-only';

/**
 * JSON-LD for `/case-study-vehicle-intelligence`: softsuave.com's own schema
 * for this page, verbatim. The live page's HTML carries exactly one JSON-LD
 * block — this NewsArticle — copied as served, quirks included (2015 dates,
 * the blog-author URL). Its `image` is the page's share card, which this site
 * hosts at the same path (`public/assets/case-studies/`).
 *
 * The Organization an SEO tool also reports on the live page is not the
 * page's own: the shared GTM container injects it (it loads here too). So the
 * route is in `PAGES_WITH_OWN_SITE_GRAPH` (the layout adds no Organization or
 * WebSite) and the footer keeps its address microdata, as live's does.
 */
export const vehicleIntelligenceArticleLd = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Vehicle Intelligence",
  "image": [
    "https://www.softsuave.com/assets/case-studies/vehicle-intelligence-og.webp"
  ],
  "datePublished": "2015-02-05T08:00:00+08:00",
  "dateModified": "2015-02-05T09:20:00+08:00",
  "author": [{
    "@type": "Person",
    "name": "Veera S",
    "url": "https://www.softsuave.com/blog/author/admin/"
  }]
} as const;
