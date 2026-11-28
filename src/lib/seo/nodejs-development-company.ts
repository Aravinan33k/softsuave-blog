import 'server-only';

/**
 * JSON-LD for `/nodejs-development-company`: softsuave.com's own schema for this page, verbatim (13 Oct review: "need
 * to update the schema"). The live page's HTML carries two JSON-LD blocks —
 * this Service and this FAQPage — copied here as served.
 *
 * The rest of what an SEO tool reports on the live page is not the page's
 * own: its Organization is injected by the shared GTM container (which this
 * site loads too), and its address microdata sits in the footer. So the route
 * is in `PAGES_WITH_OWN_SITE_GRAPH` (the layout adds no Organization or
 * WebSite) and the footer keeps its address microdata, as live's does.
 */

export const njServiceLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "ServiceType": "Software",
      "name": "Best Nodejs Development Company in India",
      "url": "https://www.softsuave.com/nodejs-development-company",
      "description": "Join hands with the best NodeJS web development company in India, Soft Suave to build custom web apps using top-notch Node js development services",
      "image": "https://www.softsuave.com/assets/new-formate/nodejs/nodejs-img.svg",
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

export const njFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why should I choose Soft Suave over other Node.js development companies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To stand out from other Node.js development companies, Soft Suave always provides personalized services to clients and helps them have a good online presence."
      }
    },
    {
      "@type": "Question",
      "name": "How to hire a cost-effective Node.js application development team?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When you hire a Node.js application development team with limited resources, go for a company that specializes in developing Apps for startups and SMBs. Also, the location plays a crucial role. For instance, an Indian Node.js development company like Soft Suave will be much more affordable than an American company."
      }
    },
    {
      "@type": "Question",
      "name": "Can you sign a Non-disclosure agreement (NDA) for my project?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, it's a mandatory step we follow before commencing the project. By signing an NDA, we ensure utmost confidentiality and commitment."
      }
    },
    {
      "@type": "Question",
      "name": "What are the benefits of using Node.js for web app development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When you work with a competent NodeJs Web Development Company, you can get these advantages of NodeJS,"
      }
    },
    {
      "@type": "Question",
      "name": "How much does it cost to develop a Node.js Project?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every project is different, hence, one price doesn't fit all. However, the cost is determined based on"
      }
    }
  ]
};
