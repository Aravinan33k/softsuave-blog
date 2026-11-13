import "server-only";

/**
 * JSON-LD for `/mobile-app-development-company-dubai`: softsuave.com's own
 * schema for this page, verbatim. The live page's HTML carries exactly one
 * block — this FAQPage — copied here as served (generated from the live
 * source, not retyped).
 *
 * Two of its answers differ slightly from the page's visible FAQ, on the
 * live page itself: Q4 reads "to make us a top mobile app development
 * company" here and "for making us the best mobile app development company"
 * on screen, and Q5 has "free 30 minutes consultation" here and "Free 30
 * minutes consultation" on screen. Both are kept exactly as published (the
 * brief: copy the content and keep every schema field unchanged) — see
 * `madubaiFaqs` in lib/home/mobile-app-dubai-content.ts.
 *
 * Nothing else is the page's own: its Organization is injected by the shared
 * GTM container (which this site loads too), and its address microdata sits
 * in the footer. So the route is in `PAGES_WITH_OWN_SITE_GRAPH` (the layout
 * adds no Organization or WebSite) and the footer keeps its microdata.
 */
export const madubaiFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does it cost to develop an app?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your mobile app requirements determine the cost of the app. It also includes the technology we choose, features and additional UI/UX changes, App store submissions, the cost for the development team, and so on. You will know the approximate cost of the app once you consult with our experts."
      }
    },
    {
      "@type": "Question",
      "name": "Do you have an in-house design team?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. we have a dedicated in-house design team in Dubai. They oversee the entire app creation process and ensure the solution is useful to users at all times."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer mobile app support services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We have the mobile app maintenance and support team 24/7 even after the completion of mobile app development, you can always come to our team to fix the issues."
      }
    },
    {
      "@type": "Question",
      "name": "Why do top brands trust Soft Suave?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Because we are invested to deliver the best of all service to all of our clients, our happy clients are always satisfied with our service with the powerful, advanced, useful, and profit-earning product to own for their business. Thanks to our app development experts to make us a top mobile app development company in Dubai which is recognized for the best assistance."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer free mobile app development consultations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Of course, we do. You can get a free 30 minutes consultation with our mobile app development experts from Dubai anytime, to get a clear idea for developing your long-lasting fruitful mobile apps."
      }
    }
  ]
};
