import 'server-only';

/**
 * Service, WebPage and FAQPage JSON-LD for `/graphql-development-company`,
 * transcribed verbatim from the approved SEO spec (29 Sep: "remove the extra
 * schemas and update the ones in the sheet"). With the spec's Organization
 * (`softSuaveOrganizationLd`, emitted by the page) these four are the page's
 * entire structured data — the route is in `PAGES_WITH_OWN_SITE_GRAPH`, so the
 * layout adds no WebSite or second Organization.
 *
 * URLs are absolute and production-canonical, like `ai-page-schema.ts`. The
 * spec's placeholder image URL is kept exactly as written and made real: it
 * serves `public/path-to-final-graphql-og-image.webp`.
 */

export const gqServiceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.softsuave.com/graphql-development-company#service",
  "name": "GraphQL Development Services",
  "serviceType": "GraphQL API Development",
  "description": "GraphQL development services for designing schemas, queries, mutations, resolvers, authentication, and integrations that provide structured access to connected databases, services, APIs, and business systems.",
  "url": "https://www.softsuave.com/graphql-development-company",
  "image": "https://www.softsuave.com/path-to-final-graphql-og-image.webp",
  "provider": {
    "@id": "https://www.softsuave.com/#organization"
  },
  "areaServed": "Worldwide",
  "audience": {
    "@type": "BusinessAudience",
    "name": "Startups, enterprises, product teams, and engineering teams"
  },
  "mainEntityOfPage": {
    "@id": "https://www.softsuave.com/graphql-development-company#webpage"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "GraphQL Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "GraphQL API Architecture and Schema Design",
          "description": "GraphQL schema design covering object relationships, queries, mutations, naming conventions, client requirements, application domains, and existing data structures."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Resolver and Backend Development",
          "description": "Custom GraphQL resolver development connecting operations with databases, internal services, business logic, authentication rules, validation processes, and existing backend capabilities."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "GraphQL Integration With Existing Systems",
          "description": "GraphQL integrations with REST services, databases, content platforms, third-party tools, and internal applications using planned transformation and integration logic."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "REST-to-GraphQL API Modernization",
          "description": "Phased REST-to-GraphQL modernization through schema design, resolver development, testing, client coordination, and gradual migration of selected API operations."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "GraphQL Performance and Query Review",
          "description": "GraphQL performance reviews covering query patterns, resolver behavior, data loading, caching, pagination, request limits, and API-layer performance risks."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "GraphQL API Support and Maintenance",
          "description": "Ongoing GraphQL API maintenance covering schema updates, resolver changes, dependency reviews, issue resolution, integration adjustments, testing improvements, and documentation updates."
        }
      }
    ]
  }
} as const;

export const gqWebPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.softsuave.com/graphql-development-company#webpage",
  "url": "https://www.softsuave.com/graphql-development-company",
  "name": "GraphQL Development Company for Modern APIs | Soft Suave",
  "description": "Work with a GraphQL development company backed by 13+ years of technology expertise and 400+ AI & Engineering Specialists for modern API solutions.",
  "inLanguage": "en",
  "dateModified": "2026-09-15",
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "@id": "https://www.softsuave.com/graphql-development-company#primaryimage",
    "url": "https://www.softsuave.com/path-to-final-graphql-og-image.webp",
    "contentUrl": "https://www.softsuave.com/path-to-final-graphql-og-image.webp",
    "caption": "GraphQL Development Company for Modern APIs"
  },
  "mainEntity": {
    "@id": "https://www.softsuave.com/graphql-development-company#service"
  },
  "about": {
    "@id": "https://www.softsuave.com/graphql-development-company#service"
  },
  "publisher": {
    "@id": "https://www.softsuave.com/#organization"
  }
} as const;

export const gqFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.softsuave.com/graphql-development-company#faq",
  "url": "https://www.softsuave.com/graphql-development-company",
  "name": "Frequently Asked Questions About GraphQL Development",
  "inLanguage": "en",
  "isPartOf": {
    "@id": "https://www.softsuave.com/graphql-development-company#webpage"
  },
  "about": {
    "@id": "https://www.softsuave.com/graphql-development-company#service"
  },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does a GraphQL development company build?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A GraphQL development company can design schemas, build API layers, develop resolvers, connect data sources, integrate applications, and modernize selected REST operations. The final architecture depends on client requirements, backend systems, data ownership, authorization rules, and expected API usage patterns."
      }
    },
    {
      "@type": "Question",
      "name": "When should a business consider using GraphQL?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GraphQL may suit products where multiple clients need different views of connected application data or where frontend teams require flexible queries. The decision should consider API complexity, caching, authorization, backend ownership, operational tooling, team experience, and long-term schema management needs."
      }
    },
    {
      "@type": "Question",
      "name": "Can GraphQL work with our existing databases and APIs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. GraphQL resolvers can connect with SQL databases, NoSQL databases, REST services, internal APIs, and third-party platforms. The implementation should preserve data ownership, enforce authorization, validate inputs, handle failures, and prevent the GraphQL layer from duplicating unnecessary business logic elsewhere."
      }
    },
    {
      "@type": "Question",
      "name": "Can we introduce GraphQL without replacing REST?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. GraphQL can be introduced alongside existing REST endpoints, allowing selected clients or workflows to migrate gradually. A phased approach should identify suitable operations, define schemas, coordinate frontend changes, monitor usage, and keep unaffected REST services available while adoption progresses."
      }
    },
    {
      "@type": "Question",
      "name": "How do you manage GraphQL schema changes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Schema changes should be planned around compatibility, ownership, and client usage. Teams can add fields, mark outdated fields as deprecated, document replacements, monitor active queries, and coordinate removals carefully. The process should avoid unexpected disruption for applications using existing operations."
      }
    },
    {
      "@type": "Question",
      "name": "How much do GraphQL development services cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GraphQL development costs depend on schema complexity, data sources, resolver logic, integrations, authorization, testing, existing APIs, and business operational requirements. Project pricing is confirmed after requirements and scope are reviewed."
      }
    },
    {
      "@type": "Question",
      "name": "How long does GraphQL API development take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Delivery timelines depend on schema scope, data-source complexity, integrations, authorization rules, testing requirements, client coordination, and available resources. A realistic schedule is confirmed after the discovery discussion. A new API, phased REST migration, and focused integration require different delivery plans."
      }
    },
    {
      "@type": "Question",
      "name": "Do you maintain existing GraphQL APIs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We can maintain GraphQL APIs through schema updates, resolver changes, issue resolution, dependency reviews, integration adjustments, query analysis, testing improvements, and documentation. We begin by reviewing the API architecture, connected systems, deployment process, release procedures, priorities, and shared responsibilities."
      }
    }
  ]
} as const;
