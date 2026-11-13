import "server-only";

/**
 * JSON-LD for `/mobile-app-development-company-germany`: softsuave.com's
 * own schema for this page, verbatim. The live page's HTML carries exactly
 * one block — this FAQPage — copied here as served (generated from the live
 * source, not retyped). Its questions and answers match the page's visible
 * FAQ word for word (`madeFaqs` in lib/home/mobile-app-germany-content.ts).
 *
 * Nothing else is the page's own: its Organization is injected by the shared
 * GTM container (which this site loads too), and its address microdata sits
 * in the footer. So the route is in `PAGES_WITH_OWN_SITE_GRAPH` (the layout
 * adds no Organization or WebSite) and the footer keeps its microdata.
 */
export const madeFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long will it take to build and launch my app?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No one can predict the accurate amount of time consumed for developing and deploying the mobile app just by having an idea. Your app idea, platforms, budget, general and custom features, Discussions while developing the app, Mobile app testing, and bug fixing. There are more and more processes involved. It will be good if you consult with our experts to know the approximate time for your requirements for app development."
      }
    },
    {
      "@type": "Question",
      "name": "What if we don't have a fully formed app idea?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Don't worry, Soft Suave’s app development team can make you a mobile app idea that will be a suitable and trustable digital asset for your business."
      }
    },
    {
      "@type": "Question",
      "name": "Will You Sign an NDA for app development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can count on us to keep your mobile app development private and out of competitors' prying eyes while we are developing it."
      }
    },
    {
      "@type": "Question",
      "name": "Do I Need to Test My App?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mobile apps should be tested. There’s no doubt. A small bug can sometimes ruin the entire project; the app can be unqualified or poorly reviewed after launch."
      }
    },
    {
      "@type": "Question",
      "name": "Can I get a preview of the app while it is in development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you will be provided with a prototype that is basically a low-fidelity design of a mobile app. You can give feedback for each update."
      }
    }
  ]
};
