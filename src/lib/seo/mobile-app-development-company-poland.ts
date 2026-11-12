import "server-only";

/**
 * JSON-LD for `/mobile-app-development-company-poland`: softsuave.com's own
 * schema for this page, verbatim. The live page's HTML carries exactly one
 * block — this FAQPage — copied here as served (generated from the live
 * source, not retyped), including the fifth question's trailing space.
 *
 * As on the live page, two answers here are shorter than the visible ones:
 * Q1 stops before the visible five-item list, and Q3 carries only the second
 * of the visible answer's three list items. Both texts are kept exactly as
 * published — see `maplFaqs` in lib/home/mobile-app-poland-content.ts.
 *
 * Nothing else is the page's own: its Organization is injected by the shared
 * GTM container (which this site loads too), and its address microdata sits
 * in the footer. So the route is in `PAGES_WITH_OWN_SITE_GRAPH` (the layout
 * adds no Organization or WebSite) and the footer keeps its microdata.
 */
export const maplFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What Should an App Requirements Document Contain?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The App requirements document is your app's blueprint. It contains a description of your app, goals, specifications, features, and technical details."
      }
    },
    {
      "@type": "Question",
      "name": "What Are the Benefits of Using Soft Suave for Mobile App Development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Soft Suave has been one of the top app development companies in Poland for almost decades. With that experience and expertise, the Soft Suave application development team are outstanding challenge-loving geeks who can fulfill your business and Market goals with customer satisfaction."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to develop an app?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We can develop a small app in 2 months, a mid-sized app might take 3-3.5 months, and we might complete a large app in 5-6 months."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between cross-platform and multi-platform app development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In cross-platform development, the host architecture differs from the target platform. Essentially, the target application will not run on the host development system. Multi-platform means you can build executable targets that can run on both the host and the target."
      }
    },
    {
      "@type": "Question",
      "name": "Why should you choose an Outsourcing app development agency in Poland instead of an In-house? ",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Outsourcing mobile app development offers so many benefits over developing in-house. Offshore development is less time-consuming, fast launch, and provides reliable software quality."
      }
    }
  ]
};
