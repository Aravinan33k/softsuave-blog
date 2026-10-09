import 'server-only';

/**
 * JSON-LD for `/software-development-company`: softsuave.com's own schema
 * for this page, verbatim (6 Oct request: "Schema must be updated; remove the
 * unnecessary ones"). The live page's HTML carries exactly one JSON-LD block
 * — this Service graph, with no FAQPage — copied here as served, quirks
 * included: the `ServiceType` capitalisation, and a `url`/`image` naming
 * `software-development-company-india` rather than this page's own path.
 *
 * As on the PHP and Python pages, the rest of what an SEO tool reports on the
 * live page is not the page's own: its Organization is injected by the shared
 * GTM container (which this site loads too), and its address microdata sits in
 * the footer. So the route is in `PAGES_WITH_OWN_SITE_GRAPH` (the layout adds
 * no Organization or WebSite) and the footer keeps its address microdata, as
 * live's does.
 */
export const sdServiceLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "ServiceType": "Software",
      "name": "Best Custom Software Development Company In India",
      "url": "https://www.softsuave.com/software-development-company-india",
      "description": "As a leading custom software development company, Soft Suave delivers custom solutions that meet your business needs, on time and within budget.",
      "image": "https://www.softsuave.com/assets/images/software-development-company-india.jpg",
      "areaServed": [
        "US",
        "CA",
        "UK",
        "AU",
        "FR",
        "IT",
        "DE",
        "ES"
      ],
      "provider": {
        "@type": "Organization",
        "name": "Soft Suave Technologies",
        "@id": "https://www.softsuave.com/"
      }
    }
  ]
};
