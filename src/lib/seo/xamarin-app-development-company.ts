import 'server-only';

/**
 * JSON-LD for `/xamarin-app-development-company`: softsuave.com's own schema
 * for this page, verbatim (30 Sep request: "update this page schema with live
 * website schema"). The live page's HTML carries exactly two JSON-LD blocks —
 * this Product and this BreadcrumbList — and, unlike its sibling mobile pages,
 * no Service or FAQPage. Copied as served, including the Product's
 * `http://schema.org/` context, its description (which reads as another
 * page's: "Get a Dedicated Development Team on Contract…") and its
 * AggregateRating, and the trail's four items (Home › Mobile App ›
 * Cross-platform › Xamarin Development).
 *
 * As on the Android, iOS, React Native, Flutter, Ionic and Mobile App pages,
 * the rest of what an SEO tool reports on the live page is not the page's own:
 * its Organization is injected by the shared GTM container (which this site
 * loads too), and its address microdata sits in the footer. So the route is in
 * `PAGES_WITH_OWN_SITE_GRAPH` (the layout adds no Organization or WebSite) and
 * the footer keeps its address microdata, as live's does.
 */
export const xamProductLd = {
  "@context": "http://schema.org/",
  "@type": "Product",
  "name": "Soft Suave Technologies",
  "description": "Get a Dedicated Development Team on Contract for your projects. Hire a top-notch development team for efficient and cost-effective solutions.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "ratingCount": "87"
  }
} as const;

export const xamBreadcrumbLd = {
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.softsuave.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Mobile App",
      "item": "https://www.softsuave.com/mobile-application-development-company"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Cross-platform",
      "item": "https://www.softsuave.com/cross-platform-application-development-company"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Xamarin Development",
      "item": "https://www.softsuave.com/xamarin-app-development-company"
    }
  ]
} as const;
