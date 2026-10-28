/**
 * Copy for the "Hire Anthropic Developers" landing page
 * (`/hire-anthropic-developers`).
 *
 * A clone of the Vue.js page (`/vuejs-development-company`): same sections,
 * same order, same shared components — only the words differ. Shapes match the
 * prop types exported by the shared landing sections, so each section is
 * `<Component content={…} />` with no adapter in between.
 *
 * The clients band, the testimonials and the closing CTA are the homepage's
 * own sections rendered verbatim (see the route), unchanged from the Vue page.
 *
 * Deliberate departures from the source, noted rather than silently applied:
 *
 *  - `anthropicMeta.title` omits the " | Soft Suave" suffix the brief's SEO
 *    title carries; the route appends it once, so the rendered title is
 *    unchanged.
 *
 *  - The brief gives no eyebrows, form label or mid-page CTA href; those
 *    follow the Vue page.
 *
 *  - The brief's Card 5 link text ("Learn more about Enterprise Assistants and
 *    Workflow Automation") has no slot in the services carousel, and the Vue
 *    page shows no per-card link, so it is not rendered.
 *
 * Images: the hero and overview are this page's own files in
 * public/images/landing/. The service cards are still PLACEHOLDERS reusing the
 * Vue page's `vue-svc-*` slots with alt text rewritten for this page.
 */

import { partnerHeroBadges } from "./hero-badges";
import { landingImage } from "./overview-images";
import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesCarouselContent } from "@/components/common/services-carousel";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { CardGridContent } from "@/components/landing/industries";
import type { TechStackContent } from "@/components/home/tech-stack";
import type { FaqContent } from "@/components/landing/faq";

/** Placeholder: a Vue page image under this page's own alt text. */
function placeholder<T extends { alt: string }>(img: T | undefined, alt: string): T | undefined {
  return img ? { ...img, alt } : undefined;
}

export const anthropicMeta = {
  slug: "hire-anthropic-developers",
  path: "/hire-anthropic-developers",
  title: "Hire Anthropic Developers",
  description:
    "Build AI applications, agents, and workflows with Claude and the Anthropic API. Work with a team backed by 13+ years of technology expertise. Discuss your project with Soft Suave.",
} as const;

export const anthropicHero: HeroContent = {
  // The H1, split so the last line takes the coral accent.
  titleLines: ["Anthropic Developer Services", "for Claude-Powered Applications"],
  body: [
    "Soft Suave delivers Anthropic development services for building Claude-powered applications, AI agents, document workflows, and internal assistants. Our developers use the Claude API with Python, TypeScript, REST APIs, and Model Context Protocol (MCP) to create solutions that fit your product architecture and business requirements.",
    "Share your use case, discuss the technical approach, and receive a practical roadmap for building or improving your Claude-based application.",
  ],
  points: [
    "Claude API and SDK Expertise",
    "AI Agent and Tool-Use Development",
    "Secure Enterprise Integration",
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
    requirementPlaceholder: "What do you want to build with Claude?",
    subject: "Anthropic Development enquiry",
  },
  image: {
    src: "/images/landing/anthropic_developers_cover.webp",
    width: 1774,
    height: 887,
    alt: "A developer building a Claude-powered AI application on a laptop",
  },
};

export const anthropicOverview: OverviewContent = {
  eyebrow: "Overview",
  title: "Anthropic Development for Business-Focused AI Products",
  paragraphs: [
    "Anthropic builds Claude, a family of AI models known for strong reasoning, long-context understanding, coding ability, and careful handling of instructions. Through the Claude API, teams can add capabilities such as summarization, document analysis, conversational assistants, code generation, and multi-step agents to their own products and workflows.",
    "As an Anthropic development company, Soft Suave supports use-case discovery, prompt and system design, API integration, evaluation, deployment, and ongoing optimization. We can build new Claude-powered products, add AI features to existing platforms, or replace fragile, hard-to-maintain AI prototypes with production-ready systems.",
    "With 13+ years of technology expertise and delivery presence across Chennai, Bengaluru, and the United States, Soft Suave works closely with your product and engineering teams. Our developers follow your engineering standards and align AI work with your data, security requirements, and user needs.",
  ],
  image: {
    src: "/images/landing/anthropic_development_overview.webp",
    width: 1080,
    height: 720,
    alt: "A product team planning a Claude-powered AI application together around a laptop",
  },
};

export const anthropicServices: ServicesCarouselContent = {
  eyebrow: "Services",
  title: "Anthropic Development Services for AI Applications",
  body: "Our Anthropic development services help businesses build reliable, secure, and maintainable Claude-powered solutions that meet technical requirements and support long-term product goals.",
  // PLACEHOLDER images on every card — replace each with its own artwork.
  items: [
    {
      name: "Custom Claude Application Development",
      body: "Build custom applications powered by Claude, with well-designed prompts, structured outputs, streaming responses, and an architecture aligned with your business workflows.",
      image: placeholder(landingImage("vue-svc-custom"), "Code for a custom Claude-powered application in an editor"),
    },
    {
      name: "Claude API Integration Services",
      body: "Connect Claude to your existing products, CRMs, databases, and third-party tools through the Anthropic API, with authentication, error handling, rate-limit management, and usage monitoring built in.",
      image: placeholder(landingImage("vue-svc-spa"), "A Claude API integration running across several devices"),
    },
    {
      name: "AI Agent and MCP Development",
      body: "Develop Claude-based agents that use tools, call APIs, and complete multi-step tasks. We build custom Model Context Protocol (MCP) servers that give Claude secure access to your systems and data.",
      image: placeholder(landingImage("vue-svc-migration"), "Engineers designing an AI agent workflow together at a screen"),
      // No "Learn more" (30 Sep request): an empty href stops the carousel
      // auto-linking the name to /agentic-ai-development-services.
      href: "",
    },
    {
      name: "RAG and Document Intelligence",
      body: "Create retrieval-augmented generation pipelines and document workflows that let Claude answer questions, extract data, and summarize contracts, reports, and knowledge bases with source-grounded responses.",
      image: placeholder(landingImage("vue-svc-portal"), "A dashboard presenting data extracted from business documents"),
      // No "Learn more" (30 Sep request): an empty href stops the carousel
      // auto-linking the name to /rag-development-services.
      href: "",
    },
    {
      name: "Enterprise Assistants and Workflow Automation",
      body: "Develop internal assistants and automations for support, sales, operations, and engineering teams. They connect with your existing tools and respect user roles and data permissions.",
      image: placeholder(landingImage("vue-svc-ecommerce"), "An internal AI assistant automating a business workflow on a laptop"),
    },
    {
      name: "Claude Support, Evaluation and Optimization",
      body: "Maintain and improve Claude applications through prompt refinement, evaluation suites, model upgrades, cost and latency optimization, monitoring, and expanded test coverage.",
      image: placeholder(landingImage("vue-svc-support"), "A developer monitoring and optimizing a live Claude application"),
    },
  ],
};

/** The mid-page band between the services and the why-us section. */
export const anthropicPlanCta: CtaBandContent = {
  eyebrow: "Next Step",
  title: "Planning a Claude or Anthropic Development Project?",
  body: "Whether you are building a new AI product, adding Claude to an existing platform, or moving an AI prototype into production, our team can recommend an approach based on your requirements and architecture.",
  cta: { label: "Discuss Your Anthropic Project", href: "/contact" },
};

export const anthropicWhyUs: CardGridContent = {
  eyebrow: "Why Choose Us",
  title: "Why Choose Soft Suave for Anthropic Development?",
  body: "Work with a team that combines Claude API capability, broader engineering support, clear collaboration, and experience delivering software for startups and businesses with different technical requirements, product goals, and delivery needs.",
  items: [
    {
      name: "13+ Years of Technology Expertise",
      body: "Bring 13+ years of technology expertise to every stage of Claude application development.",
    },
    {
      name: "400+ AI & Engineering Specialists",
      body: "Access broader engineering support across AI, backend, cloud, data, testing, and integrations.",
    },
    {
      name: "Claude Development Across Product Stages",
      body: "Prototype, build, integrate, and optimize Claude applications according to your product priorities.",
    },
    {
      name: "Coordination With Your Existing Team",
      body: "Coordinate directly with product owners, designers, backend engineers, security teams, and QA.",
    },
    {
      name: "Delivery Presence Across Key Locations",
      body: "Our delivery presence across Chennai, Bengaluru, and the US supports clear communication and coordination.",
    },
    {
      name: "Support Beyond Initial Launch",
      body: "Continue with monitoring, model upgrades, prompt tuning, and feature improvements after release.",
    },
  ],
};

/** The brief's eight categories, in its order. */
export const anthropicTech: TechStackContent = {
  eyebrow: "Technologies",
  title: "Technologies Used for Anthropic Application Development",
  body: "We select AI, integration, backend, data, testing, and cloud technologies according to your application architecture, existing systems, product requirements, and long-term maintenance needs throughout development, deployment, and ongoing support after launch.",
  groups: [
    {
      name: "Claude and Anthropic Platform",
      items: ["Claude API", "Claude Agent SDK", "Tool Use", "Prompt Caching", "Batch Processing"],
    },
    { name: "Models", items: ["Claude Opus", "Claude Sonnet", "Claude Haiku"] },
    { name: "Languages and SDKs", items: ["Python", "TypeScript", "JavaScript", "Anthropic SDKs"] },
    { name: "Integrations and Protocols", items: ["MCP", "REST", "GraphQL", "Webhooks", "JSON Schema"] },
    { name: "Retrieval and Data", items: ["Vector Databases", "PostgreSQL", "MongoDB", "Elasticsearch"] },
    {
      name: "Testing and Evaluation",
      items: ["Prompt Evaluation", "Regression Testing", "Integration Testing", "End-to-End Testing"],
    },
    { name: "DevOps and Deployment", items: ["Docker", "Kubernetes", "CI/CD"] },
    {
      name: "Cloud Platforms",
      items: ["AWS (Amazon Bedrock)", "Google Cloud (Vertex AI)", "Microsoft Azure"],
    },
  ],
};

export const anthropicFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "Frequently Asked Questions About Anthropic Development",
  body: "Find answers to common questions about Claude development, project costs, integrations, security, collaboration, and ongoing support.",
  items: [
    {
      q: "What can an Anthropic development company build?",
      a: "An Anthropic development company can build AI assistants, document processing tools, customer support automation, coding tools, research assistants, and multi-step agents. The right solution depends on your users, data sources, accuracy needs, integrations, and plans for future development.",
    },
    {
      q: "How should I choose a Claude development company?",
      a: "Review its experience with production AI systems, its approach to evaluation and testing, its security practices, its integration capabilities, and its support model. The company should explain how it will design, measure, deploy, and maintain the application.",
    },
    {
      q: "Can Claude integrate with our existing systems and APIs?",
      a: "Yes. Claude can connect to REST APIs, databases, internal tools, and third-party services through tool use and MCP servers. The approach depends on your API contracts, security requirements, data flows, and error-handling rules.",
    },
    {
      q: "Which Claude model should we use?",
      a: "It depends on the task. Larger models suit complex reasoning and agentic work. Smaller models suit high-volume, low-latency tasks at lower cost. We test candidate models against your real data before recommending one.",
    },
    {
      q: "How do you keep our data secure when using Claude?",
      a: "We design integrations around least-privilege access, controlled data sharing, and secrets management. Where needed, we can deploy through cloud platforms such as AWS or Google Cloud to fit your compliance and data-residency requirements. Soft Suave is ISO/IEC 27001:2022 certified.",
    },
    {
      q: "How do you reduce hallucinations and improve accuracy?",
      a: "We combine retrieval from your trusted data, structured outputs, clear prompt design, and evaluation suites that test the system against real scenarios. Human review steps can be added for high-risk decisions.",
    },
    {
      q: "How much do Claude development services cost?",
      a: "Costs depend on project scope, integration complexity, data preparation, evaluation needs, and the delivery approach. Ongoing model usage costs are separate and depend on volume and model choice. Project pricing is confirmed after requirements are reviewed.",
    },
    {
      q: "How long does Claude application development take?",
      a: "Timelines depend on scope, complexity, integrations, and resources. A realistic schedule is confirmed after the discovery discussion. A focused proof of concept needs a different plan from a production agent platform or enterprise rollout.",
    },
  ],
};
