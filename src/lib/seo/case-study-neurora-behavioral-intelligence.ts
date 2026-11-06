import 'server-only';

/**
 * JSON-LD for `/case-study-neurora-behavioral-intelligence`: softsuave.com's
 * own schema for this page, verbatim. The live page's HTML carries exactly one
 * JSON-LD block — this NewsArticle — copied as served, quirks included (2015
 * dates, the blog-author URL). Its `image` is the page's share card, which this
 * site hosts at the same path (`public/assets/case-studies/`).
 *
 * As with the Vehicle Intelligence page, the route is in
 * `PAGES_WITH_OWN_SITE_GRAPH`, so the layout adds no Organization or WebSite.
 */
export const neuroraBehavioralIntelligenceArticleLd = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Neurora Behavioral Intelligence",
  "image": [
    "https://www.softsuave.com/assets/case-studies/NI-sample-og.webp"
  ],
  "datePublished": "2015-02-05T08:00:00+08:00",
  "dateModified": "2015-02-05T09:20:00+08:00",
  "author": [{
    "@type": "Person",
    "name": "Veera S",
    "url": "https://www.softsuave.com/blog/author/admin/"
  }]
} as const;
