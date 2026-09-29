import 'server-only';

/**
 * Service, WebPage and FAQPage JSON-LD for `/typescript-development-company`,
 * transcribed verbatim from the approved SEO spec (29 Sep: "remove the extra
 * schemas and update the ones in the sheet"). With the spec's Organization
 * (`softSuaveOrganizationLd`, emitted by the page) these four are the page's
 * entire structured data — the route is in `PAGES_WITH_OWN_SITE_GRAPH`, so the
 * layout adds no WebSite or second Organization.
 *
 * URLs are absolute and production-canonical, like `ai-page-schema.ts`. The
 * spec's dummy OG image path is real: it serves
 * `public/assets/images/typescript-development-company-og.webp`.
 */

export const txServiceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.softsuave.com/typescript-development-company#service",
  "name": "TypeScript Development Services",
  "serviceType": "TypeScript Application Development",
  "description": "TypeScript development services covering custom applications, JavaScript-to-TypeScript migration, typed frontend development, Node.js backend development, API contract integration, maintenance, and codebase improvement.",
  "url": "https://www.softsuave.com/typescript-development-company",
  "image": "https://www.softsuave.com/assets/images/typescript-development-company-og.webp",
  "provider": {
    "@id": "https://www.softsuave.com/#organization"
  },
  "areaServed": "Worldwide",
  "audience": {
    "@type": "BusinessAudience",
    "name": "Startups, SMBs, product teams, engineering leaders, and enterprises building or modernizing TypeScript applications"
  },
  "mainEntityOfPage": {
    "@id": "https://www.softsuave.com/typescript-development-company#webpage"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "TypeScript Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom TypeScript Application Development",
          "description": "TypeScript applications with structured data models, reusable modules, framework integrations, and code organization aligned with functional and technical requirements."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "JavaScript-to-TypeScript Migration",
          "description": "Incremental conversion of JavaScript code through module prioritization, compiler configuration, type-gap resolution, testing, and preservation of working application behavior."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Typed Frontend Application Development",
          "description": "Typed frontend interfaces using React, Angular, Vue.js, or Next.js with organized component properties, application state, API responses, and utilities."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "TypeScript Backend Development with Node.js",
          "description": "Node.js backend services developed in TypeScript with structured request handling, data models, business logic, authentication, and system integrations."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Type Definitions and API Contract Integration",
          "description": "Typed REST and GraphQL contracts that define payloads, responses, errors, and shared structures across client and server applications."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "TypeScript Maintenance and Codebase Improvement",
          "description": "TypeScript maintenance covering compiler settings, dependencies, outdated types, duplicated definitions, test coverage, refactoring, and planned application improvements."
        }
      }
    ]
  }
} as const;

export const txWebPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.softsuave.com/typescript-development-company#webpage",
  "url": "https://www.softsuave.com/typescript-development-company",
  "name": "TypeScript Development Company for Web Apps | Soft Suave",
  "description": "Work with a TypeScript development company backed by 13+ years of technology expertise for application development, migration, integration, and support.",
  "inLanguage": "en",
  "dateModified": "2026-09-15",
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "@id": "https://www.softsuave.com/typescript-development-company#primaryimage",
    "url": "https://www.softsuave.com/assets/images/typescript-development-company-og.webp",
    "contentUrl": "https://www.softsuave.com/assets/images/typescript-development-company-og.webp",
    "caption": "TypeScript Development Company for Business-Critical Applications"
  },
  "mainEntity": {
    "@id": "https://www.softsuave.com/typescript-development-company#service"
  },
  "about": {
    "@id": "https://www.softsuave.com/typescript-development-company#service"
  },
  "publisher": {
    "@id": "https://www.softsuave.com/#organization"
  }
} as const;

export const txFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.softsuave.com/typescript-development-company#faq",
  "url": "https://www.softsuave.com/typescript-development-company",
  "name": "Common Questions About TypeScript Development",
  "isPartOf": {
    "@id": "https://www.softsuave.com/typescript-development-company#webpage"
  },
  "about": {
    "@id": "https://www.softsuave.com/typescript-development-company#service"
  },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What can a TypeScript web development company build?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A TypeScript web development company can build web applications, frontend interfaces, Node.js services, APIs, dashboards, portals, and platforms. The appropriate solution depends on your technology stack, application responsibilities, integration requirements, team practices, and the codebase's expected size and maintenance needs."
      }
    },
    {
      "@type": "Question",
      "name": "Why use TypeScript instead of plain JavaScript?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TypeScript adds static type checking and related development tools to JavaScript. It can make data structures and function expectations clearer across a codebase. Whether it fits depends on project complexity, team experience, existing code, frameworks, build processes, and maintenance plans."
      }
    },
    {
      "@type": "Question",
      "name": "Can TypeScript be introduced into an existing application?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. TypeScript can be adopted gradually because JavaScript and TypeScript files can coexist during migration. Teams can begin with selected modules, shared interfaces, or new features before expanding coverage according to technical priorities, dependencies, testing, and available team development capacity."
      }
    },
    {
      "@type": "Question",
      "name": "How does TypeScript work across frontend and backend?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TypeScript can define shared models and interfaces across browser applications and Node.js services. Teams may reuse selected types while keeping runtime responsibilities separate. The technical architecture should account for validation, API boundaries, build configurations, deployment environments, and independent release requirements."
      }
    },
    {
      "@type": "Question",
      "name": "Can TypeScript integrate with REST and GraphQL APIs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. TypeScript can describe request and response structures used with REST and GraphQL integrations. Types support development-time checks, while runtime validation remains a separate requirement. Integration planning should address authentication, errors, optional fields, versioning, generated types, and clear backend ownership."
      }
    },
    {
      "@type": "Question",
      "name": "How much do TypeScript development services cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TypeScript development costs depend on application scope, existing code quality, migration depth, integrations, testing requirements, frameworks, team responsibilities, and delivery expectations. Project pricing is confirmed after requirements and scope are reviewed."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a TypeScript migration take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Migration timelines depend on codebase size, JavaScript patterns, framework versions, dependency compatibility, test coverage, compiler settings, and the amount of refactoring required. A realistic schedule is confirmed after the discovery discussion and may involve staged conversion rather than one release."
      }
    },
    {
      "@type": "Question",
      "name": "Do you maintain and improve existing TypeScript applications?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We can review an existing TypeScript application and support defect resolution, dependency updates, type improvements, refactoring, testing, integrations, and new features. The maintenance plan is based on codebase condition, priorities, access, release procedures, and responsibilities shared with your team."
      }
    }
  ]
} as const;
