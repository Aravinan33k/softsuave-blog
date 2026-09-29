import 'server-only';

/**
 * Service, WebPage and FAQPage JSON-LD for `/postgresql-development-company`,
 * transcribed verbatim from the approved SEO spec (29 Sep review: "remove the
 * extra schemas and update the ones in the sheet"). With the spec's
 * Organization (`softSuaveOrganizationLd`, emitted by the page) these four are
 * the page's entire structured data — the route is in
 * `PAGES_WITH_OWN_SITE_GRAPH`, so the layout adds no WebSite or second
 * Organization.
 *
 * URLs are absolute and production-canonical, like `ai-page-schema.ts`. The
 * spec's placeholder image URL is kept exactly as written and made real: it
 * serves `public/path-to-final-postgresql-og-image.webp`.
 */

export const pgServiceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.softsuave.com/postgresql-development-company#service",
  "name": "PostgreSQL Development Services",
  "serviceType": "PostgreSQL Database Development",
  "description": "PostgreSQL development services for database architecture, schema design, migrations, performance reviews, application integrations, and ongoing support aligned with business and application requirements.",
  "url": "https://www.softsuave.com/postgresql-development-company",
  "image": "https://www.softsuave.com/path-to-final-postgresql-og-image.webp",
  "provider": {
    "@id": "https://www.softsuave.com/#organization"
  },
  "areaServed": "Worldwide",
  "audience": {
    "@type": "BusinessAudience",
    "name": "Startups, enterprises, product teams, application teams, and data engineering teams"
  },
  "mainEntityOfPage": {
    "@id": "https://www.softsuave.com/postgresql-development-company#webpage"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "PostgreSQL Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom PostgreSQL Database Development",
          "description": "Custom PostgreSQL development covering structured schemas, stored procedures, functions, constraints, and data models designed around application workflows and business rules."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "PostgreSQL Schema and Architecture Design",
          "description": "PostgreSQL architecture planning covering tables, relationships, indexes, partitions, access patterns, data integrity, reporting requirements, and future database changes."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "PostgreSQL Migration and Modernization",
          "description": "PostgreSQL migration and modernization through database assessment, data mapping, compatibility reviews, staged migration, validation, and coordinated cutover."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "PostgreSQL Query and Performance Review",
          "description": "PostgreSQL performance reviews covering execution plans, indexing, joins, query patterns, configuration, resource usage, bottlenecks, and focused performance improvements."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "PostgreSQL Application Integration",
          "description": "PostgreSQL integrations with backend services, APIs, reporting tools, cloud platforms, and third-party systems using methods suited to the application architecture."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "PostgreSQL Support and Maintenance",
          "description": "PostgreSQL support covering issue resolution, version upgrades, backup reviews, monitoring adjustments, query changes, security updates, and database documentation."
        }
      }
    ]
  }
} as const;

export const pgWebPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.softsuave.com/postgresql-development-company#webpage",
  "url": "https://www.softsuave.com/postgresql-development-company",
  "name": "PostgreSQL Development Company for Reliable Databases",
  "description": "Build dependable databases with Soft Suave, a PostgreSQL development company backed by 13+ years of technology expertise and 400+ AI & Engineering Specialists.",
  "inLanguage": "en",
  "dateModified": "2026-09-15",
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "@id": "https://www.softsuave.com/postgresql-development-company#primaryimage",
    "url": "https://www.softsuave.com/path-to-final-postgresql-og-image.webp",
    "contentUrl": "https://www.softsuave.com/path-to-final-postgresql-og-image.webp",
    "caption": "PostgreSQL Development Company for Reliable Databases"
  },
  "mainEntity": {
    "@id": "https://www.softsuave.com/postgresql-development-company#service"
  },
  "about": {
    "@id": "https://www.softsuave.com/postgresql-development-company#service"
  },
  "publisher": {
    "@id": "https://www.softsuave.com/#organization"
  }
} as const;

export const pgFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.softsuave.com/postgresql-development-company#faq",
  "url": "https://www.softsuave.com/postgresql-development-company",
  "name": "Frequently Asked Questions About PostgreSQL Development",
  "inLanguage": "en",
  "isPartOf": {
    "@id": "https://www.softsuave.com/postgresql-development-company#webpage"
  },
  "about": {
    "@id": "https://www.softsuave.com/postgresql-development-company#service"
  },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What services does a PostgreSQL development company offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A PostgreSQL development company can design schemas, develop queries and functions, integrate applications, plan migrations, review performance, and maintain database environments. Services depend on your application architecture, data relationships, current workloads, operational requirements, existing technology landscape, and database ownership model."
      }
    },
    {
      "@type": "Question",
      "name": "Is PostgreSQL suitable for business applications?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. PostgreSQL supports transactional applications, content platforms, business systems, analytics workloads, geospatial solutions, and data-intensive business products. Suitability depends on data structure, query patterns, availability expectations, integration requirements, team capabilities, operational constraints, and how the application is expected to evolve."
      }
    },
    {
      "@type": "Question",
      "name": "Can PostgreSQL work with our current applications and APIs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. PostgreSQL can connect with web applications, mobile backends, APIs, reporting platforms, data pipelines, and third-party systems. Integration planning should address connection management, authentication, transaction boundaries, data formats, error handling, synchronization needs, and ownership of business logic across connected components."
      }
    },
    {
      "@type": "Question",
      "name": "Can you migrate our existing database to PostgreSQL?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We can assess your current database and plan a complete or phased PostgreSQL migration. The process considers schemas, data types, stored logic, existing dependencies, application compatibility, downtime constraints, validation requirements, rollback planning, and the sequence for moving workloads safely."
      }
    },
    {
      "@type": "Question",
      "name": "Can your PostgreSQL specialists work with our internal team?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Our PostgreSQL specialists can coordinate with internal developers, infrastructure teams, product owners, and external vendors. Responsibilities, communication methods, access requirements, review processes, and release activities are agreed early so database work remains aligned with wider application and business priorities."
      }
    },
    {
      "@type": "Question",
      "name": "How much do PostgreSQL development services cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PostgreSQL development costs depend on database scope, schema complexity, data volume, integrations, migration requirements, performance work, testing, and operational responsibilities. We confirm project pricing after reviewing requirements and scope."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a PostgreSQL development project take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Delivery timelines depend on the project scope, complexity, integrations, and resource requirements. A realistic schedule is confirmed after the discovery discussion. A new database design, targeted performance review, application integration, and staged migration each require different planning and implementation schedules."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide PostgreSQL support after deployment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Support can include issue resolution, query reviews, database upgrades, backup checks, monitoring adjustments, schema changes, and documentation updates. We first review your environment, access arrangements, deployment process, priorities, and the responsibilities clearly shared between your team and our engineers."
      }
    }
  ]
} as const;
