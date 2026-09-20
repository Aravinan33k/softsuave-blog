/**
 * Copy for the "TypeScript Development" landing page
 * (`/typescript-development-company`).
 *
 * Every heading, paragraph and list item below is the approved marketing copy
 * supplied for this page, reproduced verbatim. Shapes match the prop types
 * exported by the shared landing sections in `components/landing/*` and
 * `components/common/*`, so each section is `<Component content={…} />` with
 * no adapter in between.
 *
 * Two bands are the homepage's own sections rendered verbatim (see the route),
 * as the brief asks: the clients band and the testimonials + closing CTA.
 *
 * The Technology table's "Testing and Code Quality" row is already a plain
 * comma list in the source ("Unit testing, integration testing, ESLint") —
 * unlike the Next.js brief's version of this row, which was one grammatical
 * sentence and needed rewriting to split. This one only needed splitting on
 * its commas, so its items keep the source's own lower-case phrasing for the
 * two practice names alongside the properly-cased "ESLint".
 *
 * `txMeta.title` omits the " | Soft Suave" suffix the brief's title carries —
 * every content module on this surface stores the bare title and the route
 * appends the suffix once, so the rendered title is unchanged.
 *
 * Images: reused bundled art already in this repo (the convention this branch
 * used before Pexels sourcing became the norm for a page) — swap for
 * Pexels-sourced photos if asked, the way the Next.js page's were.
 */

import { partnerHeroBadges } from "./hero-badges";
import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesCarouselContent } from "@/components/common/services-carousel";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { CardGridContent } from "@/components/landing/industries";
import type { TechStackContent } from "@/components/home/tech-stack";
import type { FaqContent } from "@/components/landing/faq";

export const txMeta = {
  slug: "typescript-development-company",
  path: "/typescript-development-company",
  title: "TypeScript Development Company for Web Apps",
  description:
    "Work with a TypeScript development company backed by 13+ years of technology expertise for application development, migration, integration, and support.",
} as const;

export const txHero: HeroContent = {
  // The H1, split so the last line takes the coral accent.
  titleLines: ["TypeScript Development Company", "for Business-Critical Applications"],
  body: [
    "As applications grow, inconsistent data handling and complex code patterns can slow development. Soft Suave is a reliable TypeScript development company that improves code structure, strengthens type safety, simplifies maintenance, and aligns implementation with your application architecture and established engineering standards.",
    "Explain your current challenges or product plans, and we will recommend a practical TypeScript development path for your application.",
  ],
  points: [
    "13+ Years of Technology Expertise",
    "Full-Stack TypeScript Development",
    "JavaScript-to-TypeScript Modernization",
    "React, Angular, Vue.js, and Node.js Expertise",
    "400+ AI & Engineering Specialists",
  ],
  badges: partnerHeroBadges,
  form: {
    eyebrow: "Business Enquiry",
    title: "Let's Discuss Your Project",
    note: "Alert: This form is for business, not candidates. To apply for jobs,",
    // The brief's own "click here" wording, made a real link rather than dead
    // text — the same pattern the Next.js page's hero uses.
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "The application or codebase you have in mind, whether this is a new build or an existing JavaScript project to migrate, and which parts of the stack it touches.",
    subject: "TypeScript Development enquiry",
  },
  image: {
    src: "/images/four/svc-web.webp",
    width: 587,
    height: 410,
    alt: "A TypeScript application under development on a developer's screen",
  },
};

export const txOverview: OverviewContent = {
  eyebrow: "Overview",
  title: "TypeScript Development for Structured Application Code",
  paragraphs: [
    "TypeScript adds a type system to JavaScript, helping developers identify mismatched values and understand how different parts of an application connect. It brings greater consistency to growing codebases and makes development, reviews, and maintenance easier to manage.",
    "Soft Suave provides TypeScript development services for new applications and established JavaScript products. Our work can include setting project standards, defining types for application data, updating selected modules, improving existing code, and coordinating type definitions across user interfaces, backend services, and APIs.",
    "TypeScript adoption does not need to cover the entire application at once. We can introduce it gradually into an existing JavaScript codebase or use it from the beginning, depending on your application, dependencies, release schedule, and team readiness.",
  ],
  image: {
    src: "/images/landing/services/svc-consulting-discovery.webp",
    width: 640,
    height: 427,
    alt: "Planning a gradual TypeScript adoption across an existing codebase",
  },
};

/**
 * Six services, one paragraph each — short enough for the centre-focused
 * carousel rather than the two-paragraph service board the app-framework
 * pages use.
 */
export const txServices: ServicesCarouselContent = {
  eyebrow: "Services",
  title: "TypeScript Development Services Across Your Stack",
  body: "Use our TypeScript development services to organize code, define interfaces, modernize JavaScript systems, and maintain engineering practices across frontend and backend projects.",
  items: [
    {
      name: "Custom TypeScript Application Development",
      body: "Develop TypeScript applications with data models, reusable modules, framework integrations, and code structures aligned with your functional and technical requirements.",
      image: {
        src: "/images/landing/services/svc-application-development.webp",
        alt: "A TypeScript application taking shape from data models to interface",
      },
    },
    {
      name: "JavaScript-to-TypeScript Migration",
      body: "Convert JavaScript code incrementally by prioritizing modules, configuring compiler rules, resolving type gaps, and preserving working application behavior during migration.",
      image: {
        src: "/images/landing/services/svc-support-optimisation.webp",
        alt: "An existing JavaScript codebase being staged for TypeScript migration",
      },
    },
    {
      name: "Typed Frontend Application Development",
      body: "Build typed interfaces with React, Angular, Vue.js, or Next.js while organizing component properties, application state, API responses, and frontend utilities.",
      image: {
        src: "/images/four/svc-custom-software.webp",
        alt: "A typed frontend interface built with component properties and application state",
      },
    },
    {
      name: "TypeScript Backend Development with Node.js",
      body: "Create Node.js services in TypeScript with structured request handling, data models, business logic, authentication flows, integrations, and maintainable server-side modules.",
      image: {
        src: "/images/landing/services/svc-integration.webp",
        alt: "A Node.js backend service structured around typed data models",
      },
    },
    {
      name: "Type Definitions and API Contract Integration",
      body: "Connect applications using typed REST or GraphQL contracts that describe payloads, responses, errors, and structures across client and server code.",
      image: {
        src: "/images/landing/services/svc-model-selection.webp",
        alt: "A typed API contract describing payloads and responses between client and server",
      },
    },
    {
      name: "TypeScript Maintenance and Codebase Improvement",
      body: "Review compiler settings, dependencies, outdated types, duplicated definitions, test coverage, and complex modules before planning focused maintenance or refactoring work.",
      image: {
        src: "/images/landing/services/svc-evaluation-llmops.webp",
        alt: "A TypeScript codebase's compiler settings and dependencies under review",
      },
    },
  ],
};

/** The mid-page band between the services and the why-us section. */
export const txPlanCta: CtaBandContent = {
  eyebrow: "Next Step",
  title: "Is Your Codebase Becoming Harder to Maintain?",
  body: "Growing complexity can slow releases and lead to unnecessary rework. Share your application challenges, and we’ll recommend a practical TypeScript approach for your codebase and development goals.",
  cta: { label: "Plan Your TypeScript Project", href: "#enquiry" },
};

export const txWhyUs: CardGridContent = {
  eyebrow: "Why Choose Us",
  title: "Why Choose Soft Suave for TypeScript Development?",
  body: "Work with a team that understands how TypeScript decisions affect application structure, developer collaboration, API contracts, testing, and maintenance across frontend and backend systems throughout an evolving long-term product lifecycle.",
  items: [
    {
      name: "13+ Years Supporting Technology Delivery",
      body: "Use 13+ years of technology expertise when planning and delivering TypeScript application work.",
    },
    {
      name: "400+ AI & Engineering Specialists",
      body: "Reach 400+ AI & Engineering Specialists for additional frontend, backend, data, cloud, or testing knowledge.",
    },
    {
      name: "Support for Gradual TypeScript Adoption",
      body: "Introduce TypeScript by module, feature, or service according to your migration priorities.",
    },
    {
      name: "Alignment With Existing Engineering Practices",
      body: "Match established repositories, review standards, release workflows, and documentation expectations.",
    },
    {
      name: "Coordination Across Delivery Locations",
      body: "Delivery presence across Chennai, Bengaluru, and the United States supports coordinated communication.",
    },
    {
      name: "Maintenance Beyond the Initial Release",
      body: "Address type issues, dependency changes, refactoring needs, and planned improvements after deployment.",
    },
  ],
};

/**
 * Eight categories from the source table, rendered through the homepage's own
 * marquee — the same choice made for the Next.js page's technology section,
 * so the two most closely related pages on this surface read as a matched
 * pair. Every group holds 3+ items, so none needs folding into another to
 * avoid a thin-looking row.
 *
 * Names go straight to `components/home/tech-logo.tsx`; most resolve to a
 * real brand mark. "REST services" and "GraphQL services" are the source's
 * own phrases, not brand names, so they fall back to the shared generic
 * glyph, the same as any other page's non-brand entries.
 */
export const txTech: TechStackContent = {
  eyebrow: "Technologies",
  title: "Technologies Used Across TypeScript Development",
  body: "Explore the technologies we use to turn TypeScript projects into reliable, adaptable, and maintainable applications.",
  groups: [
    { name: "Core Language and Runtime", items: ["TypeScript", "JavaScript", "Node.js"] },
    { name: "Frontend Frameworks", items: ["React", "Angular", "Vue.js", "Next.js"] },
    { name: "APIs and Schemas", items: ["REST", "GraphQL", "JSON", "OpenAPI"] },
    { name: "Backend Development", items: ["Node.js", "REST services", "GraphQL services"] },
    { name: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB"] },
    // Already a comma list in the source, not a sentence — split as given,
    // keeping its own lower-case phrasing for the two practice names.
    { name: "Testing and Code Quality", items: ["Unit testing", "integration testing", "ESLint"] },
    { name: "DevOps and Deployment", items: ["Docker", "Kubernetes", "CI/CD"] },
    { name: "Cloud Platforms", items: ["AWS", "Microsoft Azure", "Google Cloud"] },
  ],
};

export const txFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "Common Questions About TypeScript Development",
  body: "Find answers about TypeScript adoption, development, JavaScript migration, API typing, project costs, delivery timelines, and maintenance.",
  items: [
    {
      q: "What can a TypeScript web development company build?",
      a: "A TypeScript web development company can build web applications, frontend interfaces, Node.js services, APIs, dashboards, portals, and platforms. The appropriate solution depends on your technology stack, application responsibilities, integration requirements, team practices, and the codebase’s expected size and maintenance needs.",
    },
    {
      q: "Why use TypeScript instead of plain JavaScript?",
      a: "TypeScript adds static type checking and related development tools to JavaScript. It can make data structures and function expectations clearer across a codebase. Whether it fits depends on project complexity, team experience, existing code, frameworks, build processes, and maintenance plans.",
    },
    {
      q: "Can TypeScript be introduced into an existing application?",
      a: "Yes. TypeScript can be adopted gradually because JavaScript and TypeScript files can coexist during migration. Teams can begin with selected modules, shared interfaces, or new features before expanding coverage according to technical priorities, dependencies, testing, and available team development capacity.",
    },
    {
      q: "How does TypeScript work across frontend and backend?",
      a: "TypeScript can define shared models and interfaces across browser applications and Node.js services. Teams may reuse selected types while keeping runtime responsibilities separate. The technical architecture should account for validation, API boundaries, build configurations, deployment environments, and independent release requirements.",
    },
    {
      q: "Can TypeScript integrate with REST and GraphQL APIs?",
      a: "Yes. TypeScript can describe request and response structures used with REST and GraphQL integrations. Types support development-time checks, while runtime validation remains a separate requirement. Integration planning should address authentication, errors, optional fields, versioning, generated types, and clear backend ownership.",
    },
    {
      q: "How much do TypeScript development services cost?",
      a: "TypeScript development costs depend on application scope, existing code quality, migration depth, integrations, testing requirements, frameworks, team responsibilities, and delivery expectations. Project pricing is confirmed after requirements and scope are reviewed.",
    },
    {
      q: "How long does a TypeScript migration take?",
      a: "Migration timelines depend on codebase size, JavaScript patterns, framework versions, dependency compatibility, test coverage, compiler settings, and the amount of refactoring required. A realistic schedule is confirmed after the discovery discussion and may involve staged conversion rather than one release.",
    },
    {
      q: "Do you maintain and improve existing TypeScript applications?",
      a: "Yes. We can review an existing TypeScript application and support defect resolution, dependency updates, type improvements, refactoring, testing, integrations, and new features. The maintenance plan is based on codebase condition, priorities, access, release procedures, and responsibilities shared with your team.",
    },
  ],
};
