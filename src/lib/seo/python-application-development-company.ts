import 'server-only';

/**
 * JSON-LD for `/python-application-development-company`: softsuave.com's own
 * schema for this page, verbatim (30 Sep request: "update the PHP & Python
 * pages schemas with live website schemas"). The live page's HTML carries
 * exactly one JSON-LD block — this Service graph, with no FAQPage (the page
 * has no FAQ) — copied here as served, including its `ServiceType`
 * capitalisation and its SVG `image`.
 *
 * As on the mobile app pages, the rest of what an SEO tool reports on the live
 * page is not the page's own: its Organization is injected by the shared GTM
 * container (which this site loads too), and its address microdata sits in the
 * footer. So the route is in `PAGES_WITH_OWN_SITE_GRAPH` (the layout adds no
 * Organization or WebSite) and the footer keeps its address microdata, as
 * live's does.
 */
export const pyServiceLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "ServiceType": "Software",
      "name": "Best Python Development Company in India",
      "url": "https://www.softsuave.com/python-application-development-company",
      "description": "Join hands with the best Python web development company in India, Soft Suave to build custom web apps using top-notch python web development services",
      "image": "https://www.softsuave.com/assets/new-formate/python/python-img.svg",
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
} as const;
