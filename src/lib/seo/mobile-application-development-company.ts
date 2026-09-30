import 'server-only';

/**
 * JSON-LD for `/mobile-application-development-company`: softsuave.com's own
 * schema for this page, verbatim (30 Sep request: "implement that same
 * schema"). The live page's HTML carries exactly one block — this FAQPage —
 * copied here as served, including its first question's trailing space and
 * the two answers that stop where the live page's bullet lists begin.
 *
 * The rest of what an SEO tool reports on the live page is not the page's own:
 * its Organization is injected by the shared GTM container (which this site
 * loads too), and its address microdata sits in the footer. So the route is in
 * `PAGES_WITH_OWN_SITE_GRAPH` (the layout adds no Organization or WebSite) and
 * the footer keeps its address microdata, as live's does.
 */
export const madFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to choose a reliable partner for mobile app development services? ",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While choosing your mobile app development agency, the five things you should examine are,"
      }
    },
    {
      "@type": "Question",
      "name": "Why Soft Suave for mobile app development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Having 10+ years of an extraordinary journey and being awarded as top mobile App development company by Top developers, GoodFirms, selectedfirms, etc, we make sure our Apps are an instant hit and have high productivity and efficiency. Moreover, our premium App support ensures its continuous operation and success."
      }
    },
    {
      "@type": "Question",
      "name": "Which tools do you use for project management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "At Soft Suave, we use reliable project management tools like JIRA, Trello, ClickUp, Redmine, and Aasana, which come in handy for proper planning, assigning tasks, setting deadlines, and tracking the time spent."
      }
    },
    {
      "@type": "Question",
      "name": "Will you provide any support after completing my project successfully?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, of course, we always seek a long-term relationship with our clients. Hence, we make sure our Apps are bug-free and achieve their goals consistently by providing constant support & maintenance services."
      }
    },
    {
      "@type": "Question",
      "name": "What are the benefits of outsourcing mobile app development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The global market size of outsourced services keeps on expanding because enterprises get the benefits of"
      }
    }
  ]
} as const;
