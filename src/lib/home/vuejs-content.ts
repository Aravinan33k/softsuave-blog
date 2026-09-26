/**
 * Copy for the "Vue.js Development" landing page
 * (`/vuejs-development-company`).
 *
 * Every heading, paragraph and list item below is the approved marketing copy
 * from the "Vue.js development" tab of the landing-page content doc,
 * reproduced verbatim — including its SEO title, meta description and
 * suggested URL. Shapes match the prop types exported by the shared landing
 * sections, so each section is `<Component content={…} />` with no adapter in
 * between. The page is built the same way as its siblings from the same doc
 * (`/nextjs-development-company`, `/typescript-development-company`,
 * `/graphql-development-company`).
 *
 * Three bands are the homepage's own sections rendered verbatim (see the
 * route), as the doc asks: the clients band, the testimonials, and the closing
 * CTA.
 *
 * Deliberate departures from the source, noted rather than silently applied:
 *
 *  - `vueMeta.title` omits the " | Soft Suave" suffix the doc's SEO title
 *    carries; the route appends it once, so the rendered title is unchanged.
 *
 *  - The Technologies table's "Testing" row is one sentence in the source
 *    ("Unit, integration, and end-to-end testing"). The tech marquee renders
 *    named items per category, so it is split into its three practices — the
 *    same treatment the Next.js page gave the identical row.
 *
 *  - The doc gives no eyebrow for the mid-page CTA, nor a placeholder for the
 *    form's requirement field; both follow the sibling pages' pattern.
 *
 * Images: Pexels photographs from the image pipeline — slots `vuejs-hero`,
 * `ov-vuejs-development-company` and `vue-svc-*` in
 * content/images.manifest.json.
 */

import { partnerHeroBadges } from "./hero-badges";
import { landingImage, landingPhoto, overviewImage } from "./overview-images";
import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesCarouselContent } from "@/components/common/services-carousel";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { CardGridContent } from "@/components/landing/industries";
import type { TechStackContent } from "@/components/home/tech-stack";
import type { FaqContent } from "@/components/landing/faq";

export const vueMeta = {
  slug: "vuejs-development-company",
  path: "/vuejs-development-company",
  title: "Vue.js Development Company for Web Apps",
  description:
    "Build modern web applications with a Vue.js development company backed by 13+ years of technology expertise. Discuss your project with Soft Suave.",
} as const;

export const vueHero: HeroContent = {
  // The H1, split so the last line takes the coral accent.
  titleLines: ["Vue.js Development Company", "for Modern Web Applications"],
  body: [
    "Soft Suave delivers Vue.js development services for building new web applications, modernizing interfaces, developing reusable components, and integrating backend systems. Our developers use Vue.js with JavaScript, TypeScript, REST APIs, and GraphQL to create solutions that align with your product architecture and business requirements.",
    "Share your requirements, discuss the technical approach, and receive a practical roadmap for building or improving your Vue.js application.",
  ],
  points: [
    "Vue.js and TypeScript Expertise",
    "Reusable Component Development",
    "API and Backend Integration",
    "Flexible Project Delivery",
    "13+ Years of Technology Expertise",
  ],
  badges: partnerHeroBadges,
  form: {
    eyebrow: "Business Enquiry",
    title: "Let's Discuss Your Project",
    note: "Alert: This form is for business, not candidates. To apply for jobs,",
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "The application you have in mind, the systems and APIs it connects to, and whether this is a new Vue.js build or an existing frontend to modernize.",
    subject: "Vue.js Development enquiry",
  },
  image: landingPhoto("vuejs-hero"),
};

export const vueOverview: OverviewContent = {
  eyebrow: "Overview",
  title: "Vue.js Development for Business-Focused Web Products",
  paragraphs: [
    "Vue.js is a JavaScript framework for building user interfaces and web applications. Its component-based structure helps teams create reusable interface elements and maintain consistent experiences across dashboards, portals, ecommerce platforms, and other interactive systems.",
    "As a leading Vue.js development company, Soft Suave supports technical planning, interface development, API integration, testing, deployment, and ongoing improvement. We can build new applications, introduce Vue.js into existing systems, or modernize frontends that have become difficult to maintain.",
    "With 13+ years of technology expertise and delivery presence across Chennai, Bengaluru, and the United States, Soft Suave works closely with your product and engineering teams. Our developers follow your engineering standards and align frontend work with APIs, data flows, and user needs.",
  ],
  image: overviewImage("vuejs-development-company"),
};

export const vueServices: ServicesCarouselContent = {
  eyebrow: "Services",
  title: "Vue.js Development Services for Web Applications",
  body: "Our Vue.js development services help businesses build and improve reliable, maintainable web applications that meet technical requirements and support long-term product goals.",
  items: [
    {
      name: "Custom Vue.js Web Application Development",
      body: "Build custom Vue.js web applications with reusable components, responsive interfaces, API integrations, and frontend architecture aligned with your business workflows.",
      image: landingImage("vue-svc-custom"),
    },
    {
      name: "Vue.js Single-Page Application Development",
      body: "Develop responsive Vue.js single-page applications with routing, state management, API communication, and smooth navigation across complex user interactions and workflows.",
      image: landingImage("vue-svc-spa"),
    },
    {
      name: "Vue.js Ecommerce Frontend Development",
      body: "Create Vue.js ecommerce frontends with intuitive product discovery, customer accounts, responsive checkout experiences, and reliable connections to existing commerce platforms.",
      image: landingImage("vue-svc-ecommerce"),
    },
    {
      name: "Enterprise Portal and Dashboard Development",
      body: "Develop Vue.js portals and dashboards that present business data clearly, support user roles, and connect with existing enterprise applications securely.",
      image: landingImage("vue-svc-portal"),
    },
    {
      name: "Vue.js Migration and Integration Services",
      body: "Modernize existing frontends or integrate Vue.js with backend platforms, APIs, authentication systems, and third-party tools through carefully planned development stages.",
      image: landingImage("vue-svc-migration"),
    },
    {
      name: "Vue.js Support and Maintenance",
      body: "Maintain and improve Vue.js applications through issue resolution, dependency updates, performance reviews, integration changes, refactoring, and expanded automated test coverage.",
      image: landingImage("vue-svc-support"),
    },
  ],
};

/** The mid-page band between the services and the why-us section. */
export const vuePlanCta: CtaBandContent = {
  eyebrow: "Next Step",
  title: "Planning a Vue.js Development Project?",
  body: "Whether you are building a new application, modernizing a frontend, or improving an existing product, our team can recommend an approach based on your requirements and architecture.",
  cta: { label: "Discuss Your Vue.js Project", href: "#enquiry" },
};

export const vueWhyUs: CardGridContent = {
  eyebrow: "Why Choose Us",
  title: "Why Choose Soft Suave for Vue.js Development?",
  body: "Work with a team that combines Vue.js capability, broader engineering support, clear collaboration, and experience delivering software for startups and businesses with different technical requirements, product goals, and delivery needs.",
  items: [
    {
      name: "13+ Years of Technology Expertise",
      body: "Bring 13+ years of technology expertise to every stage of Vue.js application development.",
    },
    {
      name: "400+ AI & Engineering Specialists",
      body: "Access broader engineering support across frontend, backend, cloud, data, testing, and integrations.",
    },
    {
      name: "Vue.js Development Across Product Stages",
      body: "Build, modernize, migrate, and maintain Vue.js applications according to your product priorities.",
    },
    {
      name: "Coordination With Your Existing Team",
      body: "Coordinate directly with product owners, designers, backend engineers, and QA teams.",
    },
    {
      name: "Delivery Presence Across Key Locations",
      body: "Our delivery presence across Chennai, Bengaluru, and the US supports clear communication and coordination.",
    },
    {
      name: "Support Beyond Initial Application Release",
      body: "Continue with maintenance, updates, performance reviews, and feature improvements after launch.",
    },
  ],
};

/** The source table's eight categories, in its order. */
export const vueTech: TechStackContent = {
  eyebrow: "Technologies",
  title: "Technologies Used for Vue.js Application Development",
  body: "We select frontend, integration, backend, testing, and cloud technologies according to your application architecture, existing systems, product requirements, and long-term maintenance needs throughout development, deployment, and ongoing support after launch.",
  groups: [
    { name: "Frontend Development", items: ["Vue.js", "JavaScript", "TypeScript"] },
    { name: "Structure and Styling", items: ["HTML5", "CSS3", "Sass"] },
    { name: "APIs and Integrations", items: ["REST", "GraphQL", "JSON", "API gateways"] },
    { name: "Backend Platforms", items: ["Node.js", ".NET", "Java", "Python", "PHP"] },
    { name: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB"] },
    // Split from the source's one sentence — see the module docblock.
    { name: "Testing", items: ["Unit Testing", "Integration Testing", "End-to-End Testing"] },
    { name: "DevOps and Deployment", items: ["Docker", "Kubernetes", "CI/CD"] },
    { name: "Cloud Platforms", items: ["AWS", "Microsoft Azure", "Google Cloud"] },
  ],
};

export const vueFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "Frequently Asked Questions About Vue.js Development",
  body: "Find answers to common questions about Vue.js development, project costs, integrations, modernization, collaboration, and ongoing support.",
  items: [
    {
      q: "What applications can a Vue.js development company build?",
      a: "A Vue.js development company can build single-page applications, SaaS interfaces, ecommerce storefronts, customer portals, internal dashboards, and administration systems. The right application structure depends on your users, workflows, data sources, integrations, rendering requirements, and plans for future development over time.",
    },
    {
      q: "How should I choose a Vue.js app development company?",
      a: "Choose a Vue JS app development company by reviewing its experience, architectural approach, integration capabilities, testing practices, communication process, and support model. The company should understand your systems and explain how it will structure, deliver, document, and maintain the application.",
    },
    {
      q: "Can Vue.js integrate with our existing backend and APIs?",
      a: "Yes. Vue.js can connect with REST APIs, GraphQL APIs, authentication services, payment systems, content platforms, and custom backends. The integration approach depends on your API contracts, security requirements, data flows, error-handling rules, and the backend technologies already supporting the application.",
    },
    {
      q: "Can you migrate an existing application to Vue.js?",
      a: "Yes. We can assess the frontend and plan a complete or phased Vue.js migration. The assessment covers the current framework, reusable business logic, dependencies, API connections, test coverage, deployment process, and areas that should remain unchanged during the modernization work.",
    },
    {
      q: "How much do Vue.js development services cost?",
      a: "Vue.js development costs depend on application scope, interface complexity, integrations, existing code quality, testing requirements, team responsibilities, and the delivery approach. Project pricing is confirmed after requirements and scope are reviewed.",
    },
    {
      q: "How long does Vue.js application development take?",
      a: "Delivery timelines depend on the project scope, complexity, integrations, and resource requirements. A realistic schedule is confirmed after the discovery discussion. A focused interface update will require a different plan from a new application, enterprise portal, or phased frontend migration.",
    },
    {
      q: "Do you provide Vue.js maintenance after launch?",
      a: "Yes. Support can include defect resolution, dependency updates, feature enhancements, integration changes, performance review, and codebase improvements. We review the existing application and agree on priorities, access requirements, release procedures, and the responsibilities clearly shared between your team and ours.",
    },
    {
      q: "Is Vue.js suitable for an existing enterprise application?",
      a: "Vue.js can suit enterprise applications when its component model, ecosystem, and integration approach align with the system’s architecture and maintenance needs. We evaluate frontend complexity, backend dependencies, security requirements, release constraints, and internal development standards before recommending an implementation approach.",
    },
  ],
};
