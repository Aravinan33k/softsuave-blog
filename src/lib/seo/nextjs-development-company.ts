import 'server-only';

/**
 * Service, WebPage and FAQPage JSON-LD for `/nextjs-development-company`,
 * transcribed verbatim from the approved SEO spec (29 Sep: "remove the extra
 * schemas and update the ones in the sheet"). With the spec's Organization
 * (`softSuaveOrganizationLd`, emitted by the page) these four are the page's
 * entire structured data — the route is in `PAGES_WITH_OWN_SITE_GRAPH`, so the
 * layout adds no WebSite or second Organization.
 *
 * URLs are absolute and production-canonical, like `ai-page-schema.ts`. The
 * spec's dummy OG image path is real: it serves
 * `public/assets/images/nextjs-development-company-og.webp`.
 */

export const nxServiceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.softsuave.com/nextjs-development-company#service",
  "name": "Next.js Development Services",
  "serviceType": "Next.js Web Application Development",
  "description": "Next.js development services covering custom applications, server-rendered websites, ecommerce platforms, SaaS portals, dashboards, React-to-Next.js migration, performance optimization, maintenance, and ongoing support.",
  "url": "https://www.softsuave.com/nextjs-development-company",
  "image": "https://www.softsuave.com/assets/images/nextjs-development-company-og.webp",
  "provider": {
    "@id": "https://www.softsuave.com/#organization"
  },
  "areaServed": "Worldwide",
  "audience": {
    "@type": "BusinessAudience",
    "name": "Startups, SMBs, product teams, engineering leaders, and enterprises building or modernizing Next.js web applications"
  },
  "mainEntityOfPage": {
    "@id": "https://www.softsuave.com/nextjs-development-company#webpage"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Next.js Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Next.js Application Development",
          "description": "Custom Next.js applications with organized routes, reusable components, connected data sources, integrations, and maintainable frontend architecture."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Server-Rendered Website Development",
          "description": "Content-rich websites using server-side rendering, static generation, caching, and routing approaches aligned with publishing workflows and content-update requirements."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Next.js Ecommerce Development",
          "description": "Responsive Next.js ecommerce applications with product catalogs, search, customer accounts, checkout workflows, content systems, and commerce API integrations."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "SaaS Portal and Dashboard Development",
          "description": "Next.js SaaS portals and dashboards with authentication, permissions, subscriptions, business data, and workflows organized around defined user roles."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "React-to-Next.js Modernization and Migration",
          "description": "Migration of established React applications to Next.js through staged architecture changes, route planning, component reuse, testing, and deployment preparation."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Next.js Optimization and Ongoing Support",
          "description": "Next.js support covering rendering reviews, dependency updates, route improvements, integration changes, issue resolution, refactoring, and planned product enhancements."
        }
      }
    ]
  }
} as const;

export const nxWebPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.softsuave.com/nextjs-development-company#webpage",
  "url": "https://www.softsuave.com/nextjs-development-company",
  "name": "Next.js Development Company for Modern Web Apps | Soft Suave",
  "description": "Build and improve React-based web products with a Next.js development company backed by 13+ years of technology expertise. Plan your project with Soft Suave.",
  "inLanguage": "en",
  "dateModified": "2026-09-15",
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "@id": "https://www.softsuave.com/nextjs-development-company#primaryimage",
    "url": "https://www.softsuave.com/assets/images/nextjs-development-company-og.webp",
    "contentUrl": "https://www.softsuave.com/assets/images/nextjs-development-company-og.webp",
    "caption": "Next.js Development Company for Flexible Web Platforms"
  },
  "mainEntity": {
    "@id": "https://www.softsuave.com/nextjs-development-company#service"
  },
  "about": {
    "@id": "https://www.softsuave.com/nextjs-development-company#service"
  },
  "publisher": {
    "@id": "https://www.softsuave.com/#organization"
  }
} as const;

export const nxFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.softsuave.com/nextjs-development-company#faq",
  "url": "https://www.softsuave.com/nextjs-development-company",
  "name": "Common Questions About Next.js Development",
  "isPartOf": {
    "@id": "https://www.softsuave.com/nextjs-development-company#webpage"
  },
  "about": {
    "@id": "https://www.softsuave.com/nextjs-development-company#service"
  },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of products are suitable for Next.js?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Next.js suits content platforms, ecommerce applications, SaaS products, portals, dashboards, and other React-based web experiences. Suitability depends on required rendering behavior, content changes, user interactions, integrations, deployment constraints, available team skills, and how the application will be maintained over time."
      }
    },
    {
      "@type": "Question",
      "name": "What should I evaluate in a Next.js web development company?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Evaluate a Next.js web development company by examining its React knowledge, architecture process, rendering decisions, integration experience, testing approach, and communication practices. Ask how the team handles requirements, documents decisions, manages releases, and supports the application after deployment in practice."
      }
    },
    {
      "@type": "Question",
      "name": "Which rendering approaches does Next.js support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Next.js supports server-side rendering, static generation, incremental static regeneration, and client-side rendering. The appropriate approach can differ by route as well as content type. Selection should consider freshness, personalization, performance requirements, infrastructure, caching, data access, and the application's operating model and priorities."
      }
    },
    {
      "@type": "Question",
      "name": "Can Next.js work with our current APIs and backend?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Next.js can use REST, GraphQL, authentication providers, payment services, content management systems, and custom APIs. Integration planning should review contracts, permissions, data handling, error states, caching, backend ownership, and how each connected service behaves during deployment and update cycles."
      }
    },
    {
      "@type": "Question",
      "name": "Can an existing React application move to Next.js?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. An existing React application can move to Next.js through a complete rebuild or a phased transition. We assess components, routes, state management, dependencies, APIs, testing coverage, deployment processes, and technical constraints before recommending the migration sequence for your product."
      }
    },
    {
      "@type": "Question",
      "name": "What determines the cost of Next.js development services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Next.js development costs vary with product scope, route complexity, rendering needs, integrations, existing code, testing depth, team responsibilities, and deployment requirements. The pricing is validated after requirements and scope are examined. Developer-hiring rates are not applied to complete development projects."
      }
    },
    {
      "@type": "Question",
      "name": "What affects a Next.js project delivery schedule?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Next.js project schedules depend on scope, technical complexity, integrations, content requirements, testing, and available resources. A realistic schedule is confirmed after the discovery discussion. New platforms, focused frontend changes, and phased migrations each require different planning and delivery timeline expectations."
      }
    },
    {
      "@type": "Question",
      "name": "Can Soft Suave maintain an existing Next.js application?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Soft Suave can maintain existing Next.js applications through issue resolution, dependency updates, rendering reviews, integration changes, refactoring, testing improvements, and feature development. We first review the codebase, deployment process, priorities, access requirements, and clearly define shared responsibilities with your team."
      }
    }
  ]
} as const;
