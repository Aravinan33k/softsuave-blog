import 'server-only';

/**
 * Service, WebPage and FAQPage JSON-LD for `/vuejs-development-company`,
 * transcribed verbatim from the approved SEO spec (29 Sep review: "remove the
 * extra schemas and update the ones in the sheet"). With the spec's
 * Organization (`softSuaveOrganizationLd`, emitted by the page) these four are
 * the page's entire structured data — the route is in
 * `PAGES_WITH_OWN_SITE_GRAPH`, so the layout adds no WebSite or second
 * Organization.
 *
 * URLs are absolute and production-canonical, like `ai-page-schema.ts`. The
 * spec's dummy OG image path is real: it serves
 * `public/assets/images/vuejs-development-company-og.webp`.
 */

export const vueServiceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.softsuave.com/vuejs-development-company#service",
  "name": "Vue.js Development Services",
  "serviceType": "Vue.js Web Application Development",
  "description": "Vue.js development services covering custom web applications, single-page applications, ecommerce frontends, enterprise portals, dashboards, frontend modernization, system integration, support, and maintenance.",
  "url": "https://www.softsuave.com/vuejs-development-company",
  "image": "https://www.softsuave.com/assets/images/vuejs-development-company-og.webp",
  "provider": {
    "@id": "https://www.softsuave.com/#organization"
  },
  "areaServed": "Worldwide",
  "audience": {
    "@type": "BusinessAudience",
    "name": "Startups, SMBs, product teams, engineering leaders, and enterprises building or modernizing web applications"
  },
  "mainEntityOfPage": {
    "@id": "https://www.softsuave.com/vuejs-development-company#webpage"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Vue.js Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Vue.js Web Application Development",
          "description": "Custom Vue.js web applications with reusable components, responsive interfaces, API integrations, and frontend architecture aligned with business workflows."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Vue.js Single-Page Application Development",
          "description": "Vue.js single-page applications with responsive interfaces, routing, state management, API communication, and smooth navigation across complex workflows."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Vue.js Ecommerce Frontend Development",
          "description": "Vue.js ecommerce frontends with product discovery, customer accounts, responsive checkout experiences, and connections to existing commerce platforms."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Enterprise Portal and Dashboard Development",
          "description": "Vue.js portals and dashboards that present business data, support different user roles, and connect securely with enterprise applications."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Vue.js Migration and Integration Services",
          "description": "Frontend modernization and Vue.js integration with backend platforms, APIs, authentication systems, databases, and third-party services."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Vue.js Support and Maintenance",
          "description": "Vue.js application support covering issue resolution, dependency updates, performance reviews, integration changes, refactoring, testing, and feature improvements."
        }
      }
    ]
  }
} as const;

export const vueWebPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.softsuave.com/vuejs-development-company#webpage",
  "url": "https://www.softsuave.com/vuejs-development-company",
  "name": "Vue.js Development Company for Web Apps | Soft Suave",
  "description": "Build modern web applications with a Vue.js development company backed by 13+ years of technology expertise. Discuss your project with Soft Suave.",
  "inLanguage": "en",
  "dateModified": "2026-09-15",
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "@id": "https://www.softsuave.com/vuejs-development-company#primaryimage",
    "url": "https://www.softsuave.com/assets/images/vuejs-development-company-og.webp",
    "contentUrl": "https://www.softsuave.com/assets/images/vuejs-development-company-og.webp",
    "caption": "Vue.js Development Company for Modern Web Applications"
  },
  "mainEntity": {
    "@id": "https://www.softsuave.com/vuejs-development-company#service"
  },
  "about": {
    "@id": "https://www.softsuave.com/vuejs-development-company#service"
  },
  "publisher": {
    "@id": "https://www.softsuave.com/#organization"
  }
} as const;

export const vueFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.softsuave.com/vuejs-development-company#faq",
  "url": "https://www.softsuave.com/vuejs-development-company",
  "name": "Frequently Asked Questions About Vue.js Development",
  "isPartOf": {
    "@id": "https://www.softsuave.com/vuejs-development-company#webpage"
  },
  "about": {
    "@id": "https://www.softsuave.com/vuejs-development-company#service"
  },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What applications can a Vue.js development company build?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Vue.js development company can build single-page applications, SaaS interfaces, ecommerce storefronts, customer portals, internal dashboards, and administration systems. The right application structure depends on your users, workflows, data sources, integrations, rendering requirements, and plans for future development over time."
      }
    },
    {
      "@type": "Question",
      "name": "How should I choose a Vue.js app development company?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Choose a Vue JS app development company by reviewing its experience, architectural approach, integration capabilities, testing practices, communication process, and support model. The company should understand your systems and explain how it will structure, deliver, document, and maintain the application."
      }
    },
    {
      "@type": "Question",
      "name": "Can Vue.js integrate with our existing backend and APIs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Vue.js can connect with REST APIs, GraphQL APIs, authentication services, payment systems, content platforms, and custom backends. The integration approach depends on your API contracts, security requirements, data flows, error-handling rules, and the backend technologies already supporting the application."
      }
    },
    {
      "@type": "Question",
      "name": "Can you migrate an existing application to Vue.js?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We can assess the frontend and plan a complete or phased Vue.js migration. The assessment covers the current framework, reusable business logic, dependencies, API connections, test coverage, deployment process, and areas that should remain unchanged during the modernization work."
      }
    },
    {
      "@type": "Question",
      "name": "How much do Vue.js development services cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vue.js development costs depend on application scope, interface complexity, integrations, existing code quality, testing requirements, team responsibilities, and the delivery approach. Project pricing is confirmed after requirements and scope are reviewed."
      }
    },
    {
      "@type": "Question",
      "name": "How long does Vue.js application development take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Delivery timelines depend on the project scope, complexity, integrations, and resource requirements. A realistic schedule is confirmed after the discovery discussion. A focused interface update will require a different plan from a new application, enterprise portal, or phased frontend migration."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide Vue.js maintenance after launch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Support can include defect resolution, dependency updates, feature enhancements, integration changes, performance review, and codebase improvements. We review the existing application and agree on priorities, access requirements, release procedures, and the responsibilities clearly shared between your team and ours."
      }
    },
    {
      "@type": "Question",
      "name": "Is Vue.js suitable for an existing enterprise application?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vue.js can suit enterprise applications when its component model, ecosystem, and integration approach align with the system's architecture and maintenance needs. We evaluate frontend complexity, backend dependencies, security requirements, release constraints, and internal development standards before recommending an implementation approach."
      }
    }
  ]
} as const;
