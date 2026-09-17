/**
 * Copy for the "Legacy Modernization Services" landing page
 * (`/legacy-modernization-services`).
 *
 * The live page is one of the thinnest on the site: a hero, some market
 * context, four service blurbs (re-hosting, re-architecture, modernization,
 * roadmap), and no process, industries, technologies, testimonials or FAQs.
 * Its substantive content is preserved — including the "7 Rs" framing, which
 * the live page states as "re-code, renew, replace, retire, re-platform,
 * re-engineer, or re-architect" — and the missing sections are built from
 * company-level facts published elsewhere on the site rather than invented.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { CtaBandContent } from "@/components/landing/cta-band";
import { sharedHeroBadges } from "./delivery-shared";

export const legacyMeta = {
  slug: "legacy-modernization-services",
  path: "/legacy-modernization-services",
  title: "Legacy Application Modernization Services",
  description:
    "Modernize legacy applications without stopping the business. Soft Suave assesses, re-platforms, re-architects, and re-engineers aging systems — with a staged roadmap that keeps critical workflows running throughout.",
} as const;

export const legacyHero: HeroContent = {
  eyebrow: "Legacy Modernization",
  titleLines: ["Legacy Modernization", "Without Stopping the Business"],
  body: [
    "Aging applications rarely fail outright. They get expensive to maintain, hard to hire for, slow to change, and increasingly difficult to secure — until a system that still technically works becomes the main constraint on what the business can do next.",
    "Soft Suave assesses your applications down to component level, then recommends what to re-host, re-platform, re-architect, re-engineer, replace, or retire. The roadmap is staged so critical workflows keep running while the change happens underneath them.",
  ],
  points: [
    "Component-level application assessment first",
    "Re-host, re-platform, re-architect or re-engineer",
    "Staged delivery — no big-bang cutover",
    "Cloud migration and API enablement",
    "ISO/IEC 27001:2022-certified delivery",
  ],
  badges: sharedHeroBadges,
  form: {
    eyebrow: "Business Enquiry",
    title: "Get a modernization assessment",
    note: "Tell us what you are running and what is hurting. We come back with an assessment approach, a staged roadmap, and an indicative estimate. Everything stays under NDA.",
    submit: "Send requirements",
    sending: "Opening your mail…",
    requirementLabel: "What system needs modernizing?",
    requirementPlaceholder:
      "The application and its stack, roughly how old it is, what is driving the change, and which workflows cannot be interrupted.",
    subject: "Legacy modernization enquiry",
  },
  image: {
    src: "/images/four/svc-modernization.webp",
    width: 1200,
    height: 860,
    alt: "Engineers re-architecting a legacy enterprise system onto modern cloud infrastructure",
  },
};

export const legacyOverview: OverviewContent = {
  eyebrow: "The Short Answer",
  title: "What Legacy Application Modernization Involves",
  paragraphs: [
    "Legacy modernization is the work of bringing an existing application onto current technology, architecture, and infrastructure without losing the business logic it encodes. That logic is usually the most valuable thing in the system and the least well documented — which is why modernization is an engineering problem before it is a migration problem.",
    "The decision is rarely all-or-nothing. Each component can be re-hosted with minimal change, re-platformed onto managed services, re-architected for scale, re-engineered where the logic itself is the problem, replaced with a product, or retired if nothing depends on it any more. Getting that classification right is most of the value of an assessment.",
    "Without adequate planning there is significant risk attached to modernizing a system in production. Our approach is to investigate the application to its most elementary level first, so the roadmap reflects what the code actually does rather than what the documentation claims.",
  ],
  pullQuote:
    "The riskiest legacy system is not the one that breaks. It is the one nobody currently employed fully understands.",
  image: {
    src: "/images/four/work-6.webp",
    width: 800,
    height: 1000,
    alt: "Legacy enterprise system being modernized with cloud and AI tooling",
  },
};

export const legacyDrivers: CardGridContent = {
  eyebrow: "Why Modernize",
  title: "What Usually Forces the Decision",
  body: "Modernization projects almost always start from one of a handful of pressures. Naming which one you are under matters, because it determines what a successful outcome actually looks like.",
  items: [
    {
      name: "Rising Maintenance Cost",
      icon: "coins",
      body: "Older hardware, unsupported runtimes, and specialist licences get more expensive every year, while an increasing share of engineering time goes to keeping the system upright rather than improving it.",
    },
    {
      name: "Change Is Too Slow",
      icon: "gauge",
      body: "Tightly coupled, under-tested systems make every change risky, so delivery slows and the backlog of things the business wants grows faster than the team can clear it.",
    },
    {
      name: "Security and Compliance Exposure",
      icon: "shield",
      body: "Unsupported components stop receiving patches, and audit requirements around access, encryption, and data handling become difficult to satisfy on architecture designed before them.",
    },
    {
      name: "Hiring Has Become Hard",
      icon: "users",
      body: "The talent market for aging stacks shrinks year on year, concentrating operational knowledge in fewer people and making every departure a material risk.",
    },
    {
      name: "Integration Is Blocked",
      icon: "globe",
      body: "Systems without APIs cannot participate in modern workflows, so data gets moved by export, batch job, or manual process — each one a source of latency and error.",
    },
    {
      name: "Scale or Availability Limits",
      icon: "book",
      body: "Architecture designed for predictable on-premise load struggles with variable demand, and scaling means buying capacity for the peak rather than paying for what is used.",
    },
  ],
};

export const legacyServices: ServicesContent = {
  eyebrow: "Core Services",
  title: "Our Legacy Modernization Services",
  body: "Four services covering the range from lowest-risk lift to full re-engineering. Most programmes use more than one, applied to different components of the same system.",
  items: [
    {
      name: "Strategic Modernization Roadmap",
      tag: "Strategy",
      body: "Discovery, analysis, and planning that map the current state against a target architecture, classify each component by the treatment it needs, and sequence the work so dependencies and business risk are respected rather than discovered mid-migration.",
    },
    {
      name: "Application Re-hosting",
      tag: "Re-host",
      body: "The safest and most cost-effective route: moving applications locked inside complex or aging infrastructure onto modern hosting with minimal code change. Often the right first stage, buying time and reducing infrastructure cost before deeper work begins.",
    },
    {
      name: "Application Re-architecture",
      tag: "Re-architect",
      body: "Converting a system to modern architecture while preserving the business logic inside it — decomposing monoliths, introducing APIs, and enabling cloud, virtualization, and mobile deployment so the architecture can support growth rather than cap it.",
    },
    {
      name: "Application Modernization & Migration",
      tag: "Migrate",
      body: "Improving durability, usability, functionality, and availability: refreshing user experience and workflows, integrating systems that were never designed to talk to each other, and supporting the migration continuously rather than at a single cutover point.",
    },
  ],
};

export const legacyMidCta: CtaBandContent = {
  eyebrow: "Start With an Assessment",
  title: "Not Sure Whether to Modernize or Replace?",
  body: "That question is usually answered by what the assessment finds in the business logic, not by the age of the stack. Talk it through with our team before committing to either path.",
  cta: { label: "Book a free consultation", href: "#enquiry" },
};
