import 'server-only';

/**
 * JSON-LD for `/php-application-development-company`: softsuave.com's own
 * schema for this page, verbatim (30 Sep request: "update the PHP & Python
 * pages schemas with live website schemas"). The live page's HTML carries
 * exactly two JSON-LD blocks — this Service graph and this FAQPage — copied
 * here as served, including the Service's `ServiceType` capitalisation and
 * the fourth question's leading space.
 *
 * As on the mobile app pages, the rest of what an SEO tool reports on the live
 * page is not the page's own: its Organization is injected by the shared GTM
 * container (which this site loads too), and its address microdata sits in the
 * footer. So the route is in `PAGES_WITH_OWN_SITE_GRAPH` (the layout adds no
 * Organization or WebSite) and the footer keeps its address microdata, as
 * live's does.
 */
export const phpServiceLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "ServiceType": "Software",
      "name": "PHP Development Company in India, USA | PHP Web Development Firm India",
      "url": "https://www.softsuave.com/php-application-development-company",
      "description": "Searching PHP Development Company in India? Soft Suave is an award winning PHP Web Development Company in India offering dynamic & customized PHP development services.",
      "image": "https://www.softsuave.com/assets/new-formate/PHP/php-content.webp",
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

export const phpFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the benefits of using PHP for web development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Since PHP is an open-source, platform-independent, flexible, high-performing, and user-friendly technology, you can develop successful applications that will be loved by users in an easy way."
      }
    },
    {
      "@type": "Question",
      "name": "How to select the right PHP development company?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When you choose a <b>PHP development company</b>, you should examine what development methodology they follow - Is it flexible? and how experienced they are. Moreover, focus on the strength of the company, reviews of past clients, etc."
      }
    },
    {
      "@type": "Question",
      "name": "What are the benefits of outsourcing PHP website development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Outsourcing to a reliable <b>PHP web development company</b> like Soft Suave has the following benefits,"
      }
    },
    {
      "@type": "Question",
      "name": " How much does it cost to develop a PHP website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on some crucial factors like development platform, App categories, App complexity, country of the agency, and the number of features. The best way to know the exact cost is to talk with our experts."
      }
    },
    {
      "@type": "Question",
      "name": "Can you help to redesign my website to the latest PHP version?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. In fact, migration service is one where our developers excel. Hence, we can effectively redesign your existing website to the latest PHP version. However, we need all the details about the website. Connect with us via Soft Suave chat system, phone, email, or filling the contact us form. Our dedicated project manager will schedule a meeting and collect all the necessary details. After analyzing them, we'll upgrade your site with our strong PHP team."
      }
    }
  ]
} as const;
