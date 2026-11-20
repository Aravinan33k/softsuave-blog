import "server-only";

/**
 * JSON-LD for `/mobile-app-development-company-south-africa`: softsuave.com's
 * own schema for this page, verbatim. The live page's HTML carries exactly
 * one block — this FAQPage — copied here as served (generated from the live
 * source, not retyped).
 *
 * It matches the visible FAQ but for case in one answer, on the live page
 * itself: the third answer names "flutter, react native, and ionic" here and
 * "Flutter, React Native, and Ionic" on screen. Both are kept as published —
 * see `mazaFaqs` in lib/home/mobile-app-south-africa-content.ts.
 *
 * Nothing else is the page's own: its Organization is injected by the shared
 * GTM container (which this site loads too), and its address microdata sits
 * in the footer. So the route is in `PAGES_WITH_OWN_SITE_GRAPH` (the layout
 * adds no Organization or WebSite) and the footer keeps its microdata.
 */
export const mazaFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why trust Soft Suave?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our clients are always happy with our service and the powerful, advanced, useful, and profit-generating products we provide because we strive to provide the best service to them. We have become a successful mobile app development firm in South Africa because of our app development experts."
      }
    },
    {
      "@type": "Question",
      "name": "I’ve got an idea, where do I start?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our South African mobile app development experts offer free 30-minute consultations anytime, so you can get a clearer vision of how to build your mobile app through the idea."
      }
    },
    {
      "@type": "Question",
      "name": "Can you build apps for both iOS and Android?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Cross-platform app can be developed by our mobile app development company that can be used for both Android and iOS devices. Java is the best language for developing these kinds of apps. Also, flutter, react native, and ionic are among the best technologies for building mobile apps."
      }
    },
    {
      "@type": "Question",
      "name": "Can I upgrade my existing mobile app?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can change the designs, technology, features even the core elements to make it more advanced that compatible with the latest technology through our Legacy Modernization service."
      }
    }
  ]
};
