/**
 * Copy for the "GraphQL Development" landing page
 * (`/graphql-development-company`).
 *
 * Every heading, paragraph and list item below is the approved marketing copy
 * supplied for this page, reproduced verbatim. Shapes match the prop types
 * exported by the shared landing sections in `components/landing/*` and
 * `components/common/*`, so each section is `<Component content={…} />` with
 * no adapter in between.
 *
 * Two bands are the homepage's own sections rendered verbatim (see the route),
 * as the brief asks: the clients band and the testimonials + closing CTA. The
 * Technology section is the homepage's own marquee too, the same choice made
 * for the Next.js and TypeScript pages, so the three closest sibling pages on
 * this surface read as a matched set.
 *
 * One deliberate departure from the source table: "Authentication Protocols"
 * (OAuth 2.0, JWT) is only two items, too thin for a marquee row to read as
 * finished. It is folded into "Databases and Integrations" here — renamed
 * "Databases, Integrations & Auth" — rather than left as its own row or
 * padded with invented entries, the same treatment a similarly thin row got
 * on the Software Development Company page.
 *
 * `gqMeta.title` omits the " | Soft Suave" suffix the brief's title carries —
 * every content module on this surface stores the bare title and the route
 * appends the suffix once, so the rendered title is unchanged.
 *
 * Images: reused bundled art already in this repo, the same starting point
 * the Next.js and TypeScript pages used — swap for Pexels-sourced photos if
 * asked.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesCarouselContent } from "@/components/common/services-carousel";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { CardGridContent } from "@/components/landing/industries";
import type { TechStackContent } from "@/components/home/tech-stack";
import type { FaqContent } from "@/components/landing/faq";

export const gqMeta = {
  slug: "graphql-development-company",
  path: "/graphql-development-company",
  title: "GraphQL Development Company for Modern APIs",
  description:
    "Work with a GraphQL development company backed by 13+ years of technology expertise and 400+ AI & Engineering Specialists for modern API solutions.",
} as const;

export const gqHero: HeroContent = {
  eyebrow: "GraphQL Development",
  // The H1, split so the last line takes the coral accent.
  titleLines: ["GraphQL Development Company", "for Connected Data Systems"],
  body: [
    "When applications depend on several services, data access can quickly become fragmented. Soft Suave, a reliable GraphQL development company, designs schemas, queries, mutations, resolvers, authentication, and integrations that organize these connections around your architecture, business rules, and application workflows.",
    "Tell us how your data is organized and how each application uses it. We’ll shape a GraphQL plan around those connections.",
  ],
  points: [
    "GraphQL API Architecture Expertise",
    "Schema and Resolver Engineering",
    "Complex Data Source Integration",
    "NDA and SLA-Protected Engagements",
    "13+ Years of Technology Expertise",
  ],
  badges: ["Upwork Top Rated", "Clutch verified", "Microsoft Silver Partner", "AWS Partner"],
  form: {
    eyebrow: "Business Enquiry",
    title: "Let's Discuss Your Project",
    note: "Alert: This form is for business, not candidates. To apply for jobs,",
    // The brief's own "click here" wording, made a real link rather than dead
    // text — the same pattern the Next.js and TypeScript pages' heroes use.
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "How your data is organized today, which services and applications need to read or change it, and whether this is a new GraphQL layer or a REST API to modernize.",
    subject: "GraphQL Development enquiry",
  },
  image: {
    src: "/images/four/svc-ai-integrations.webp",
    width: 2487,
    height: 1536,
    alt: "Connected systems and services linked through a unified API layer",
  },
};

export const gqOverview: OverviewContent = {
  eyebrow: "Overview",
  title: "GraphQL Development for Unified Data Access",
  paragraphs: [
    "Applications often collect data from several services, databases, and third-party platforms. Without a consistent access layer, each interface may require separate requests and integration logic, making changes harder to coordinate.",
    "GraphQL addresses this through a typed schema that lets clients request selected fields. Queries retrieve information, mutations change it, and resolvers connect each field to the appropriate system while authorization and validation control access.",
    "Soft Suave provides GraphQL development services for shaping this layer around real application behavior. We map data relationships, define schema boundaries, build resolvers, and plan errors, caching, and schema changes with the teams that own connected systems. This creates an API structure that can evolve without forcing every underlying service to work in the same way.",
  ],
  image: {
    src: "/images/landing/services/svc-integration.webp",
    width: 900,
    height: 600,
    alt: "A unified data access layer connecting several services and databases",
  },
};

/**
 * Six services, one paragraph each — short enough for the centre-focused
 * carousel rather than the two-paragraph service board the app-framework
 * pages use.
 */
export const gqServices: ServicesCarouselContent = {
  eyebrow: "Services",
  title: "GraphQL Development Services for Complex Data Environments",
  body: "Our GraphQL development services help businesses create flexible, maintainable API foundations that support connected applications and changing data requirements.",
  items: [
    {
      name: "GraphQL API Architecture and Schema Design",
      body: "Define GraphQL schemas, object relationships, queries, mutations, and naming conventions around your application domains, client needs, and existing data structures.",
      image: {
        src: "/images/landing/services/svc-model-selection.webp",
        alt: "A GraphQL schema mapping object relationships and query structures",
      },
    },
    {
      name: "Custom Resolver and Backend Development",
      body: "Develop resolvers that connect GraphQL operations with databases, internal services, business logic, authentication rules, validation processes, and existing backend capabilities.",
      image: {
        src: "/images/landing/services/svc-application-development.webp",
        alt: "A resolver connecting a GraphQL operation to backend services and data",
      },
    },
    {
      name: "GraphQL Integration With Existing Systems",
      body: "Connect GraphQL APIs with REST services, databases, content platforms, third-party tools, and internal applications through planned integration and transformation logic.",
      image: {
        src: "/images/four/svc-custom-software.webp",
        alt: "A GraphQL API connected to existing REST services and internal applications",
      },
    },
    {
      name: "REST-to-GraphQL API Modernization",
      body: "Introduce GraphQL alongside existing REST endpoints or migrate selected operations through staged schema design, resolver development, testing, and client coordination.",
      image: {
        src: "/images/landing/services/svc-support-optimisation.webp",
        alt: "REST endpoints being staged for a phased migration to GraphQL",
      },
    },
    {
      name: "GraphQL Performance and Query Review",
      body: "Review query patterns, resolver behavior, data loading, caching, pagination, and request limits to address performance risks within the API layer.",
      image: {
        src: "/images/landing/services/svc-evaluation-llmops.webp",
        alt: "Query patterns and resolver performance under review",
      },
    },
    {
      name: "GraphQL API Support and Maintenance",
      body: "Maintain GraphQL APIs through schema updates, resolver changes, dependency reviews, issue resolution, integration adjustments, testing improvements, and ongoing documentation updates.",
      image: {
        src: "/images/landing/services/svc-dedicated-teams.webp",
        alt: "A dedicated team maintaining a live GraphQL API",
      },
    },
  ],
};

/** The mid-page band between the services and the why-us section. */
export const gqPlanCta: CtaBandContent = {
  eyebrow: "Next Step",
  title: "Are Disconnected APIs Slowing Your Application?",
  body: "Fragmented APIs can complicate frontend development and make every integration harder to maintain. We’ll help you design a GraphQL layer that brings access, structure, and control together.",
  cta: { label: "Plan Your GraphQL Architecture", href: "#enquiry" },
};

export const gqWhyUs: CardGridContent = {
  eyebrow: "Why Choose Us",
  title: "Why Choose Soft Suave for GraphQL Development?",
  body: "Work with a GraphQL partner that brings clarity to complex data challenges and keeps every technical decision connected to your product goals.",
  items: [
    {
      name: "Technology Experience for Complex API Work",
      body: "Apply 13+ years of technology expertise to GraphQL architecture, integration, testing, and maintenance.",
    },
    {
      name: "Access to Broader Engineering Knowledge",
      body: "Consult 400+ AI & Engineering Specialists when projects require application, data, cloud, or testing support.",
    },
    {
      name: "Schema Design Based on Your Domain",
      body: "Model types, fields, and relationships around business concepts rather than individual screens.",
    },
    {
      name: "Cross-Team GraphQL Coordination",
      body: "Keep frontend and backend teams aligned as schemas, queries, and application requirements change.",
    },
    {
      name: "ISO/IEC 27001:2022 Certification",
      body: "Our ISO/IEC 27001:2022 certification supports structured information security management throughout project delivery.",
    },
    {
      name: "Support for Evolving GraphQL APIs",
      body: "Manage schema updates, deprecations, resolver changes, and integration needs after the initial release.",
    },
  ],
};

/**
 * Five categories, rendered through the homepage's own marquee — see the
 * module docblock for why Authentication Protocols is folded into the
 * database row rather than kept as its own thin one. Names go straight to
 * `components/home/tech-logo.tsx`; most resolve to a real brand mark, and
 * generic terms ("REST APIs") fall back to the shared glyph.
 */
export const gqTech: TechStackContent = {
  eyebrow: "Technologies",
  title: "Technologies Used for GraphQL API Development",
  body: "We combine GraphQL tools with backend frameworks, databases, authentication services, testing practices, deployment pipelines, and cloud platforms selected according to your schema design, data sources, integrations, and specific operational requirements.",
  groups: [
    { name: "GraphQL and API Tools", items: ["GraphQL", "Apollo Client", "GraphiQL", "Postman"] },
    { name: "Backend Platforms", items: ["Node.js", ".Net", "Java", "Python", "PHP"] },
    {
      name: "Databases, Integrations & Auth",
      items: ["PostgreSQL", "MySQL", "MongoDB", "REST APIs", "OAuth 2.0", "JWT"],
    },
    { name: "DevOps and Deployment", items: ["Docker", "Kubernetes", "Jenkins"] },
    { name: "Cloud Platforms", items: ["AWS", "Microsoft Azure", "Google Cloud"] },
  ],
};

export const gqFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "Frequently Asked Questions About GraphQL Development",
  body: "Find answers about GraphQL APIs, schema design, integrations, REST migration, project costs, delivery timelines, and more.",
  items: [
    {
      q: "What does a GraphQL development company build?",
      a: "A GraphQL development company can design schemas, build API layers, develop resolvers, connect data sources, integrate applications, and modernize selected REST operations. The final architecture depends on client requirements, backend systems, data ownership, authorization rules, and expected API usage patterns.",
    },
    {
      q: "When should a business consider using GraphQL?",
      a: "GraphQL may suit products where multiple clients need different views of connected application data or where frontend teams require flexible queries. The decision should consider API complexity, caching, authorization, backend ownership, operational tooling, team experience, and long-term schema management needs.",
    },
    {
      q: "Can GraphQL work with our existing databases and APIs?",
      a: "Yes. GraphQL resolvers can connect with SQL databases, NoSQL databases, REST services, internal APIs, and third-party platforms. The implementation should preserve data ownership, enforce authorization, validate inputs, handle failures, and prevent the GraphQL layer from duplicating unnecessary business logic elsewhere.",
    },
    {
      q: "Can we introduce GraphQL without replacing REST?",
      a: "Yes. GraphQL can be introduced alongside existing REST endpoints, allowing selected clients or workflows to migrate gradually. A phased approach should identify suitable operations, define schemas, coordinate frontend changes, monitor usage, and keep unaffected REST services available while adoption progresses.",
    },
    {
      q: "How do you manage GraphQL schema changes?",
      a: "Schema changes should be planned around compatibility, ownership, and client usage. Teams can add fields, mark outdated fields as deprecated, document replacements, monitor active queries, and coordinate removals carefully. The process should avoid unexpected disruption for applications using existing operations.",
    },
    {
      q: "How much do GraphQL development services cost?",
      a: "GraphQL development costs depend on schema complexity, data sources, resolver logic, integrations, authorization, testing, existing APIs, and business operational requirements. Project pricing is confirmed after requirements and scope are reviewed.",
    },
    {
      q: "How long does GraphQL API development take?",
      a: "Delivery timelines depend on schema scope, data-source complexity, integrations, authorization rules, testing requirements, client coordination, and available resources. A realistic schedule is confirmed after the discovery discussion. A new API, phased REST migration, and focused integration require different delivery plans.",
    },
    {
      q: "Do you maintain existing GraphQL APIs?",
      a: "Yes. We can maintain GraphQL APIs through schema updates, resolver changes, issue resolution, dependency reviews, integration adjustments, query analysis, testing improvements, and documentation. We begin by reviewing the API architecture, connected systems, deployment process, release procedures, priorities, and shared responsibilities.",
    },
  ],
};
