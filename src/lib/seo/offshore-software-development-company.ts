import 'server-only';

/**
 * JSON-LD for `/offshore-software-development-company`: softsuave.com's own schema for this page,
 * verbatim (review: "Schemas must be updated; remove the unnecessary ones —
 * implement the live page schema"). The live page's HTML carries a lone Service block; each
 * is copied here as served, in the order served, and renders as its own
 * <script>.
 *
 * The last block, a FAQPage, is not in the live HTML: softsuave.com's Google
 * Tag Manager adds it after load, on this URL only (verified by loading the
 * live page with GTM blocked — it disappears). That tag never fires here, so
 * the block is carried by the page itself to match what live shows (review:
 * "schema is not same for the existing live page schema"). Its questions are
 * the tag's own and appear on neither page's visible FAQ. Once this site runs
 * on www.softsuave.com, that GTM tag must be paused or it will add a second
 * copy.
 *
 * As on the other live-schema pages, the rest of what an SEO tool reports on
 * the live page is not the page's own: its site Organization is injected by
 * the shared GTM container and its address microdata sits in the footer. So
 * the route is in `PAGES_WITH_OWN_SITE_GRAPH` (the layout adds no Organization
 * or WebSite) and the footer keeps its address microdata, as live's does.
 */
export const OFFSHORE_LIVE_LD: readonly object[] = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Offshore Software Development Services",
    "description": "Softsuave offers expert offshore software development services to help businesses reduce costs, scale quickly, and deliver high-quality software solutions. Hire skilled developers from Softsuave to build custom applications tailored to your needs.",
    "serviceType": "Offshore Software Development",
    "provider": {
      "@type": "Organization",
      "name": "Softsuave Technologies",
      "url": "https://www.softsuave.com",
      "logo": "https://www.softsuave.com/new-assets/common/images/softsuave_logo.webp",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+1 (410) 220-6301",
          "contactType": "Sales",
          "areaServed": "US",
          "availableLanguage": [
            "English"
          ]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+91 99527 32708",
          "contactType": "Sales",
          "areaServed": "IN",
          "availableLanguage": [
            "English"
          ]
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3210 Vogel Rd",
        "addressLocality": "Ellicott City",
        "addressRegion": "Maryland",
        "postalCode": "21043",
        "addressCountry": "US"
      },
      "sameAs": [
        "https://www.linkedin.com/company/softsuave",
        "https://www.facebook.com/Softsuave"
      ]
    },
    "areaServed": [
      "US",
      "UK",
      "CA",
      "IN",
      "AU",
      "FR",
      "DE",
      "ES"
    ],
    "url": "https://www.softsuave.com/offshore-software-development-company/",
    "offers": {
      "@type": "Offer",
      "price": "Custom Pricing",
      "priceCurrency": "USD",
      "url": "https://www.softsuave.com/offshore-software-development-company/",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2025-12-31",
      "description": "Affordable and flexible offshore development services tailored to your project needs. Request a quote for your requirements today."
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why should I choose Soft Suave as my offshore development partner?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Soft Suave excels as a trusted offshore software development service provider with 12+ years of experience, a team of 400+ skilled developers, and a proven track record of 1,250+ successful projects. We offer cost-effective, scalable, and high-quality solutions with complete transparency and flexibility."
        }
      },
      {
        "@type": "Question",
        "name": "Can I try offshore development services before long-term commitment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide a 40-hour risk-free trial, which allows you to experience our expertise before making a long-term commitment."
        }
      },
      {
        "@type": "Question",
        "name": "Does Soft Suave ensure the security and confidentiality of my project?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we sign NDAs or SLAs with our clients to ensure the security and confidentiality of the project."
        }
      },
      {
        "@type": "Question",
        "name": "Will time zone differences affect the Offshore Software Development Services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To prevent time zone differences from affecting the project's progress, we offer 4 to 6 hours of overlapping time zone support."
        }
      },
      {
        "@type": "Question",
        "name": "How much will the offshore development services cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The cost of offshore development services will vary depending on different factors like the technology used, the experience of the developers, the complexity of the project, etc. But our base price starts at an affordable $14/hour."
        }
      }
    ]
  }
];
