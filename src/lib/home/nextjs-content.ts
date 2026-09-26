/**
 * Copy for the "Next.js Development" landing page
 * (`/nextjs-development-company`).
 *
 * Every heading, paragraph and list item below is the approved marketing copy
 * supplied for this page, reproduced verbatim. Shapes match the prop types
 * exported by the shared landing sections in `components/landing/*`, so each
 * section is `<Component content={…} />` with no adapter in between.
 *
 * Two bands are the homepage's own sections rendered verbatim (see the route),
 * as the brief asks: the clients band and the testimonials + closing CTA.
 *
 * Two small, deliberate departures from the source copy, both noted here
 * rather than silently applied:
 *
 *  - `nxMeta.title` omits the " | Soft Suave" suffix the brief's title carries.
 *    Every content module on this surface stores the bare title and the route
 *    appends the suffix once (`${nxMeta.title} | Soft Suave`), so the page's
 *    rendered title is unchanged — only where the "| Soft Suave" text lives
 *    in the source differs.
 *
 *  - The Technology Stack table's "Testing" row reads as one sentence in the
 *    source ("Unit, integration, and end-to-end testing"). The shared
 *    `landing/tech-stack` component renders a list of named tools per
 *    category, the way every other row here already is, so that sentence is
 *    split into its three named practices rather than rendered as a single
 *    long chip.
 *
 * Images: hand-placed under `public/images/landing/nextjs/`, the convention
 * for landing-page art. All eight are free-licence Pexels photographs cropped
 * to each slot; ids, source URLs and blur placeholders are in that folder's
 * `credits.json`.
 */

import { partnerHeroBadges } from "./hero-badges";
import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesCarouselContent } from "@/components/common/services-carousel";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { CardGridContent } from "@/components/landing/industries";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { FaqContent } from "@/components/landing/faq";

export const nxMeta = {
  slug: "nextjs-development-company",
  path: "/nextjs-development-company",
  title: "Next.js Development Company for Modern Web Apps",
  description:
    "Build and improve React-based web products with a Next.js development company backed by 13+ years of technology expertise. Plan your project with Soft Suave.",
} as const;

export const nxHero: HeroContent = {
  // The H1, split so the last line takes the coral accent.
  titleLines: ["Next.js Development Company", "for Flexible Web Platforms"],
  body: [
    "As a reliable Next.js development company, Soft Suave builds web apps for businesses that need flexible rendering, organized React architecture, and dependable connections with existing systems. Our team combines Next.js, TypeScript, server-side rendering, REST APIs, and GraphQL to shape web products around your users, content, and specific operational workflows.",
    "Tell us what you plan to build, and we will outline a suitable path for your Next.js product development.",
  ],
  points: [
    "React and Next.js Expertise",
    "Flexible Rendering Strategies",
    "Structured Application Routing",
    "Connected Backend Systems",
    "13+ Years of Technology Expertise",
  ],
  badges: partnerHeroBadges,
  form: {
    eyebrow: "Business Enquiry",
    title: "Let's Discuss Your Project",
    note: "Alert: This form is for business, not candidates. To apply for jobs,",
    // The brief's own "click here" wording, made a real link rather than dead
    // text — Career is a live-site page this app does not serve itself, so
    // `SiteLink` sends it there.
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "The product you have in mind, the rendering behaviour it needs, any systems it has to connect to, and whether this is a new build or an existing React app to migrate.",
    subject: "Next.js Development enquiry",
  },
  image: {
    src: "/images/landing/nextjs/hero.webp",
    width: 1920,
    height: 1080,
    alt: "A developer coding a Next.js application on a laptop",
    blurDataURL:
      "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADwAQCdASoQAAkAA4BaJYwCdAEN5vpjuCAA/u5uJUr7L/jKufs4mwK21tkyNuKa9kIPjZ76kQgiNcLpSa9EmzZp+UvFf4PBshrjHVE4tAYbSAAA",
  },
};

export const nxOverview: OverviewContent = {
  eyebrow: "Overview",
  title: "Next.js Development Built Around Your Product Needs",
  paragraphs: [
    "Next.js is a React framework supporting server-rendered, statically generated, and interactive experiences. Teams use it to organize routes, manage data delivery, build reusable interfaces, and handle products where content, performance, and maintainability influence planning.",
    "Our Next.js development services cover the complete project lifecycle, from planning and architecture to development, integrations, testing, deployment, and continued support. We tailor the approach to your application requirements, existing systems, technical priorities, and preferred way of working.",
    "Your product team receives direct coordination throughout planning and delivery. Backed by 13+ years of technology expertise and delivery presence across Chennai, Bengaluru, and the United States, our developers adapt to your workflows, technical standards, review practices, and release expectations during development.",
  ],
  image: {
    src: "/images/landing/nextjs/overview.webp",
    width: 1400,
    height: 1050,
    alt: "A workflow view across tablet and screens, connected systems feeding one product",
    blurDataURL:
      "data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAAAQAgCdASoQAAwAA4BaJbACdH8AENk+k5NAAP7qIgNiWp7Kilef4vmxcrl/9SaL3puErUMoyZEW7jHLemk2LhxHNkONX35n7QB7H4+CEIr2WkiO2DhQOeOGO4pirEJgsJ4iP4ry/GaQAAAA",
  },
};

/**
 * Six services, one paragraph each — short enough for the centre-focused
 * carousel rather than the two-paragraph service board the app-framework
 * pages use.
 */
export const nxServices: ServicesCarouselContent = {
  eyebrow: "Services",
  title: "Next.js Development Services for Product Teams",
  body: "Our Next.js development services help product teams build, enhance, and modernize web applications with scalable architecture, seamless integrations, reliable deployment, and long-term maintainability.",
  items: [
    {
      name: "Custom Next.js Application Development",
      body: "Turn product requirements into Next.js applications with clear route structures, reusable React components, connected data sources, and maintainable frontend foundations.",
      image: {
        src: "/images/landing/nextjs/svc-custom.webp",
        alt: "Application code in an editor during a Next.js build",
      },
    },
    {
      name: "Server-Rendered Website Development",
      body: "Develop content-rich websites using server rendering, static generation, caching approaches, and routing choices suited to publishing workflows and update frequency.",
      image: {
        src: "/images/landing/nextjs/svc-ssr.webp",
        alt: "A content-rich website design open on screen",
      },
    },
    {
      name: "Next.js Ecommerce Development",
      body: "Build responsive Next.js ecommerce applications with product catalogs, search, customer accounts, checkout workflows, content systems, and commerce API integrations.",
      image: {
        src: "/images/landing/nextjs/svc-ecommerce.webp",
        alt: "An online checkout screen on a laptop",
      },
    },
    {
      name: "SaaS Portal and Dashboard Development",
      body: "Build SaaS portals and dashboards with authentication, permissions, subscriptions, business data, and application workflows organized around specific user role requirements.",
      image: {
        src: "/images/landing/nextjs/svc-saas.webp",
        alt: "A tablet showing a web analytics dashboard with graphs and charts",
      },
    },
    {
      name: "React-to-Next.js Modernization and Migration",
      body: "Move established React applications toward Next.js through staged architecture changes, route planning, integration reviews, component reuse, testing, and deployment preparation.",
      image: {
        src: "/images/landing/nextjs/svc-migration.webp",
        alt: "Two developers reviewing code on a large screen during a migration",
      },
    },
    {
      name: "Next.js Optimization and Ongoing Support",
      body: "Review rendering behavior, dependencies, routes, integrations, and frontend code to resolve issues, improve maintainability, and support planned future product changes.",
      image: {
        src: "/images/landing/nextjs/svc-support.webp",
        alt: "An engineer monitoring live systems on a laptop in a server room",
      },
    },
  ],
};

/** The mid-page band between the services and the why-us section. */
export const nxPlanCta: CtaBandContent = {
  eyebrow: "Next Step",
  title: "Have a Next.js Product Ready for Development?",
  body: "Tell us what you want to build or improve. We’ll assess your technical needs and recommend a clear path for moving the Next.js project forward.",
  cta: { label: "Plan Your Next.js Project", href: "#enquiry" },
};

export const nxWhyUs: CardGridContent = {
  eyebrow: "Why Choose Us",
  title: "Why Work With Soft Suave for Next.js Development?",
  body: "Choose a technology partner that understands Next.js architecture, React development, integration planning, and the coordination required to move web products from defined requirements through dependable releases and continued improvement cycles.",
  items: [
    {
      name: "Experience Across Technology Projects",
      body: "Benefit from 13+ years of experience supporting technology projects from planning through delivery.",
    },
    {
      name: "Cross-Functional Engineering Support",
      body: "Work with 400+ AI & Engineering Specialists covering diverse technologies and project requirements.",
    },
    {
      name: "Support Across the Product Lifecycle",
      body: "Receive continued support from initial planning and development through deployment, maintenance, and future updates.",
    },
    {
      name: "Collaboration That Fits Your Workflows",
      body: "Keep collaboration aligned with your workflows through clear communication, regular reviews, and defined responsibilities.",
    },
    {
      name: "Coordinated Global Delivery Presence",
      body: "Delivery presence across Chennai, Bengaluru, and the United States supports coordinated project communication.",
    },
    {
      name: "Continued Improvement After Deployment",
      body: "Continue resolving issues, updating dependencies, and improving features after the initial release.",
    },
  ],
};

/**
 * Eight categories from the source table. Names go straight to
 * `components/home/tech-logo.tsx`; most resolve to a real brand mark, and
 * generic practice names (SSR, App Router, API gateways, the three testing
 * disciplines) fall back to the shared generic glyph, the same as any other
 * page's non-brand entries.
 */
export const nxTech: TechStackContent = {
  eyebrow: "Technologies",
  title: "Technology Stack for Next.js Product Development",
  body: "We use a suitable technology stack to build secure, scalable, and maintainable Next.js applications based on your project requirements.",
  groups: [
    {
      name: "Frontend Development",
      items: ["Next.js", "React", "JavaScript", "TypeScript", "HTML5", "CSS3"],
    },
    { name: "Rendering and Routing", items: ["SSR", "SSG", "ISR", "App Router"] },
    { name: "APIs and Integrations", items: ["REST", "GraphQL", "JSON", "API gateways"] },
    { name: "Backend Platforms", items: ["Node.js", ".Net", "Java", "Python", "PHP"] },
    { name: "Databases", items: ["PostgreSQL", "MySql", "MongoDB"] },
    // Split from the source's one sentence into its three named practices —
    // see the module docblock.
    { name: "Testing", items: ["Unit Testing", "Integration Testing", "End-to-End Testing"] },
    { name: "DevOps and Deployment", items: ["Docker", "Kubernetes", "CI/CD"] },
    { name: "Cloud Platforms", items: ["AWS", "Microsoft Azure", "Google Cloud"] },
  ],
};

export const nxFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "Common Questions About Next.js Development",
  body: "Review common questions about Next.js applications, rendering choices, integrations, migration, project pricing, delivery schedules, and support.",
  items: [
    {
      q: "What types of products are suitable for Next.js?",
      a: "Next.js suits content platforms, ecommerce applications, SaaS products, portals, dashboards, and other React-based web experiences. Suitability depends on required rendering behavior, content changes, user interactions, integrations, deployment constraints, available team skills, and how the application will be maintained over time.",
    },
    {
      q: "What should I evaluate in a Next.js web development company?",
      a: "Evaluate a Next.js web development company by examining its React knowledge, architecture process, rendering decisions, integration experience, testing approach, and communication practices. Ask how the team handles requirements, documents decisions, manages releases, and supports the application after deployment in practice.",
    },
    {
      q: "Which rendering approaches does Next.js support?",
      a: "Next.js supports server-side rendering, static generation, incremental static regeneration, and client-side rendering. The appropriate approach can differ by route as well as content type. Selection should consider freshness, personalization, performance requirements, infrastructure, caching, data access, and the application’s operating model and priorities.",
    },
    {
      q: "Can Next.js work with our current APIs and backend?",
      a: "Yes. Next.js can use REST, GraphQL, authentication providers, payment services, content management systems, and custom APIs. Integration planning should review contracts, permissions, data handling, error states, caching, backend ownership, and how each connected service behaves during deployment and update cycles.",
    },
    {
      q: "Can an existing React application move to Next.js?",
      a: "Yes. An existing React application can move to Next.js through a complete rebuild or a phased transition. We assess components, routes, state management, dependencies, APIs, testing coverage, deployment processes, and technical constraints before recommending the migration sequence for your product.",
    },
    {
      q: "What determines the cost of Next.js development services?",
      a: "Next.js development costs vary with product scope, route complexity, rendering needs, integrations, existing code, testing depth, team responsibilities, and deployment requirements. The pricing is validated after requirements and scope are examined. Developer-hiring rates are not applied to complete development projects.",
    },
    {
      q: "What affects a Next.js project delivery schedule?",
      a: "Next.js project schedules depend on scope, technical complexity, integrations, content requirements, testing, and available resources. A realistic schedule is confirmed after the discovery discussion. New platforms, focused frontend changes, and phased migrations each require different planning and delivery timeline expectations.",
    },
    {
      q: "Can Soft Suave maintain an existing Next.js application?",
      a: "Yes. Soft Suave can maintain existing Next.js applications through issue resolution, dependency updates, rendering reviews, integration changes, refactoring, testing improvements, and feature development. We first review the codebase, deployment process, priorities, access requirements, and clearly define shared responsibilities with your team.",
    },
  ],
};
