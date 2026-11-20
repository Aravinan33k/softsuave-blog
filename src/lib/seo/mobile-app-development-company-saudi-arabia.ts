import "server-only";

/**
 * JSON-LD for `/mobile-app-development-company-saudi-arabia`: softsuave.com's
 * own schema for this page, verbatim. The live page's HTML carries exactly
 * one block — this FAQPage — copied here as served (generated from the live
 * source, not retyped).
 *
 * It matches the visible FAQ but for one character, on the live page itself:
 * the third answer ends "…useful for users" here and "…useful for users." on
 * screen. Both are kept as published — see `masaFaqs` in
 * lib/home/mobile-app-saudi-arabia-content.ts.
 *
 * Nothing else is the page's own: its Organization is injected by the shared
 * GTM container (which this site loads too), and its address microdata sits
 * in the footer. So the route is in `PAGES_WITH_OWN_SITE_GRAPH` (the layout
 * adds no Organization or WebSite) and the footer keeps its microdata.
 */
export const masaFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can you make apps useful for the Saudi people?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As we have worked on numerous projects in Saudi Arabia, we know exactly what kind of apps are needed here, and we know how to design a mobile application following certain rules."
      }
    },
    {
      "@type": "Question",
      "name": "How much does it cost to develop an app?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The cost of your mobile app depends on its requirements. The price also includes technology, features, additional UI/UX changes, App store submissions, developers, and so on. Once you consult with our experts, you will know the approximate cost of the app."
      }
    },
    {
      "@type": "Question",
      "name": "Do you have an in-house design team?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we have an in-house design team in Saudi Arabia. Throughout the app creation process, they ensure the solution is useful for users"
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer mobile app support services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Even after the completion of mobile app development, you can always come to our team for maintenance and support. We are available 24/7 to fix any issues for you."
      }
    },
    {
      "@type": "Question",
      "name": "Why do top brands trust Soft Suave?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Since we strive to provide the best services to all of our clients, our happy clients are always satisfied with our service and the powerful, advanced, useful, and profit-generating products we provide. It is thanks to our app development experts that we have become a top mobile app development company in Saudi Arabia."
      }
    }
  ]
};
