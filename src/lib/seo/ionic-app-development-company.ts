import 'server-only';

/**
 * JSON-LD for `/ionic-app-development-company`: softsuave.com's own schema for
 * this page, verbatim (30 Sep request: "update this page schema with live
 * website schema"). The live page's HTML carries exactly two JSON-LD blocks —
 * this Service graph and this FAQPage — copied here as served, including the
 * Service's `ServiceType` capitalisation and its SVG `image`.
 *
 * As on the Android, iOS, React Native, Flutter and Mobile App pages, the rest
 * of what an SEO tool reports on the live page is not the page's own: its
 * Organization is injected by the shared GTM container (which this site loads
 * too), and its address microdata sits in the footer. So the route is in
 * `PAGES_WITH_OWN_SITE_GRAPH` (the layout adds no Organization or WebSite) and
 * the footer keeps its address microdata, as live's does.
 */
export const ionServiceLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "ServiceType": "Software",
      "name": "Best Ionic Development Company in India",
      "url": "https://www.softsuave.com/ionic-app-development-company",
      "description": "Looking for an ionic development company in India & USA that suits your budget? Build mobile Apps by outsourcing ionic development services from Soft Suave.",
      "image": "https://www.softsuave.com/assets/new-formate/ionic/ionic-img.svg",
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

export const ionFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why should we hire Soft Suave for ionic App development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Soft Suave is a leading Ionic App development company operating for more than 9 years. We have clients all around the world and a track record of delivering best-in-class Apps that will be successful in the market."
      }
    },
    {
      "@type": "Question",
      "name": "Why should I choose an ionic framework for mobile App development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ionic is a powerful framework that offers great flexibility, vast Cordova plugins, and large community support. Besides, it saves a lot of time and effort during the Ionic mobile App development process.\n"
      }
    },
    {
      "@type": "Question",
      "name": "What are the benefits of outsourcing ionic App development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When you outsource Ionic App development to a trusted company like Soft Suave, you get these benefits\n"
      }
    },
    {
      "@type": "Question",
      "name": "How much does it cost to develop an Ionic App?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every project is different, hence, one price doesn't fit all. However, the Ionic mobile App development cost is determined based on your requirements."
      }
    }
  ]
} as const;
