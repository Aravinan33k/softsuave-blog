/**
 * Copy for the "Offshore Software Development Company" landing page
 * (`/offshore-software-development-company`).
 *
 * The live page is already thorough — nine services, three engagement models, a
 * five-stage process, six industries, a governance section, six differentiators,
 * and eight FAQs. This module keeps that structure and its claims, tightening
 * the prose and moving the governance block into the overview's pull quote and
 * a dedicated card grid, which reads better than the live page's wall of text.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { ProcessContent } from "@/components/landing/process";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { FaqContent } from "@/components/landing/faq";
import { sharedHeroBadges } from "./delivery-shared";

export const offMeta = {
  slug: "offshore-software-development-company",
  path: "/offshore-software-development-company",
  title: "Offshore Software Development Company",
  description:
    "Soft Suave builds and modernizes software worldwide — experienced offshore engineering teams, flexible engagement models, ISO/IEC 27001:2022-certified delivery.",
} as const;

export const offHero: HeroContent = {
  titleLines: ["Offshore Software Development", "Company for Global Businesses"],
  body: [
    "Soft Suave is an offshore software development company that builds and modernizes software for startups, scaling businesses, and established organizations worldwide. We pair experienced engineering teams with flexible delivery models shaped around your actual project requirements.",
    "Share your requirements and we will outline the capabilities, the delivery approach, and the next steps for your project.",
  ],
  points: [
    "13+ Years of Technology Expertise",
    "400+ AI & Engineering Specialists",
    "Web, Mobile, AI & Modernization Capabilities",
    "Fixed Bid, Time & Material, or Dedicated Team",
    "ISO/IEC 27001:2022-Certified Delivery",
  ],
  badges: sharedHeroBadges,
  form: {
    eyebrow: "Business Enquiry",
    title: "Get a free rough quote in 24 hours",
    note: "Share your requirements and we come back with a delivery approach, a team shape, and an indicative estimate. Everything stays under NDA.",
    submit: "Send requirements",
    sending: "Opening your mail…",
    requirementLabel: "What do you need built?",
    requirementPlaceholder:
      "The product or system, the platforms it runs on, what it has to integrate with, and your target timeline.",
    subject: "Offshore software development enquiry",
  },
  image: {
    src: "/images/four/svc-custom-software.webp",
    width: 1200,
    height: 860,
    alt: "An offshore software engineering team working across shared screens and code reviews",
  },
};

export const offOverview: OverviewContent = {
  eyebrow: "The Short Answer",
  title: "What an Offshore Software Development Company Does",
  paragraphs: [
    "An offshore software development company designs, builds, modernizes, and supports software using delivery teams based outside the buyer's primary market. Soft Suave works with organizations that need to create new applications, improve existing products, connect business systems, or extend their own delivery capacity across web, mobile, cloud, and AI.",
    "Depending on what you need, that can mean a defined project with agreed milestones, an evolving development engagement, or an ongoing team that works to your roadmap. The right structure depends on your scope, how much flexibility you need, what your internal team already covers, and how closely you want to be involved in delivery decisions.",
    "The purpose is not simply to move development somewhere cheaper. A suitable offshore partner has to provide technical fit, transparent delivery practices, clear commercial terms, documentation, quality controls, and real evidence of its capabilities — which is what the sections below set out.",
  ],
  pullQuote:
    "Moving development offshore only works when the delivery practices move with it. Location is the smallest part of the decision.",
};

export const offServices: ServicesContent = {
  eyebrow: "Core Services",
  title: "Offshore Software Development Services",
  body: "We cover the full product lifecycle — building new applications, and modernizing, integrating, testing, and maintaining existing ones. Each service is planned around your business workflows, technical environment, delivery responsibilities, and engagement structure.",
  items: [
    {
      name: "Custom Software Development",
      tag: "Build",
      body: "Internal platforms, customer-facing applications, and specialised workflows, planned around your users, integrations, data, architecture, and operating environment rather than adapted from a template.",
    },
    {
      name: "Web Application Development",
      tag: "Web",
      body: "Responsive web applications for customer experiences, portals, marketplaces, and internal operations — frontend, backend, architecture, APIs, integrations, testing, deployment, and ongoing enhancement.",
    },
    {
      name: "Mobile Application Development",
      tag: "Mobile",
      body: "Native and cross-platform applications for iOS and Android covering customer experiences, operational tools, and platform extensions, through API integration, testing, release preparation, and maintenance.",
    },
    {
      name: "Custom AI Development",
      tag: "AI",
      body: "Generative AI, machine learning, natural language processing, LLM fine-tuning, predictive analytics, and computer vision, built against your data and integrated into the workflows that already exist.",
    },
    {
      name: "Software Product Engineering",
      tag: "Product",
      body: "Products supported from requirements and architecture through iterative development, testing, release, and continuing enhancement, with technical execution aligned to the roadmap and delivery priorities.",
    },
    {
      name: "Legacy Modernization",
      tag: "Modernize",
      body: "Existing applications, interfaces, and architectures modernized through codebase improvement, platform migration, integration changes, and interface renewal, sequenced so critical workflows keep running.",
    },
    {
      name: "Software Integration Services",
      tag: "Integration",
      body: "Applications, APIs, databases, cloud services, and approved third-party platforms connected after reviewing the available interfaces, data movement, dependencies, and access requirements across your environment.",
    },
    {
      name: "Quality Engineering & Testing",
      tag: "Quality",
      body: "Functional, integration, performance, regression, and automated testing applied throughout delivery, with test planning, defect reporting, and validation against agreed functional and technical requirements.",
    },
    {
      name: "Maintenance & Enhancements",
      tag: "Support",
      body: "Released software kept current through issue resolution, monitoring, compatibility updates, and feature enhancement, with responsibilities, support periods, and response expectations confirmed per engagement.",
    },
  ],
};

export const offModels: CardGridContent = {
  eyebrow: "Engagement Models",
  title: "Choose the Right Offshore Engagement Model",
  body: "Pick the structure that matches your scope, delivery priorities, the flexibility you need, and how closely you want to be involved. The model can change as the engagement matures.",
  items: [
    {
      name: "Dedicated Team",
      icon: "users",
      body: "A team assigned to your roadmap and working only on it, with agreed roles and collaboration practices. Best when requirements are continuous and you want the same engineers accumulating context over time.",
    },
    {
      name: "Time and Material",
      icon: "gauge",
      body: "You pay for the time and resources actually used, and priorities can be re-cut sprint to sprint. Best when the scope will genuinely evolve and fixing it up front would only produce a change-request queue.",
    },
    {
      name: "Fixed Bid",
      icon: "coins",
      body: "A defined budget against clearly established requirements, with agreed milestones and acceptance criteria. Best when scope is stable and well understood, and you need cost certainty more than flexibility.",
    },
  ],
};

export const offProcess: ProcessContent = {
  eyebrow: "How We Deliver",
  title: "How Our Offshore Development Process Works",
  body: "Our agile process gives you visibility at every stage rather than a single handover at the end. Each stage is a defined point for technical decisions, review, and alignment with your stakeholders. AI pair programming, automated test generation, LLM-assisted code review, and AI-monitored CI/CD support the engineering work without replacing human judgment or stakeholder approval.",
  steps: [
    {
      n: "01",
      image: {
        src: "/images/four/off-step-1.webp",
        width: 1200,
        height: 900,
        alt: "Requirements and Engagement Planning in an offshore development engagement",
      },
      name: "Requirements & Engagement Planning",
      body: "We clarify business objectives, users, functional requirements, technical dependencies, responsibilities, delivery expectations, and which engagement model actually suits the work.",
    },
    {
      n: "02",
      image: {
        src: "/images/four/off-step-2.webp",
        width: 1200,
        height: 900,
        alt: "Architecture and Delivery Preparation in an offshore development engagement",
      },
      name: "Architecture & Delivery Preparation",
      body: "We review application architecture, technologies, environments, integrations, data requirements, dependencies, and access needs, then agree the initial plan for building and reviewing the software.",
    },
    {
      n: "03",
      image: {
        src: "/images/four/off-step-3.webp",
        width: 1200,
        height: 900,
        alt: "Iterative Development in an offshore development engagement",
      },
      name: "Iterative Development",
      body: "Engineers build approved functionality in manageable increments. Regular reviews let your stakeholders assess completed work, clarify requirements, and adjust upcoming priorities where the model allows.",
    },
    {
      n: "04",
      image: {
        src: "/images/four/off-step-4.webp",
        width: 1200,
        height: 900,
        alt: "Testing and Review in an offshore development engagement",
      },
      name: "Testing & Review",
      body: "Functional, integration, regression, performance, and automated testing are applied as the project requires. Code review and stakeholder review support validation before release is approved.",
    },
    {
      n: "05",
      image: {
        src: "/images/four/off-step-5.webp",
        width: 1200,
        height: 900,
        alt: "Release and Continuing Improvement in an offshore development engagement",
      },
      name: "Release & Continuing Improvement",
      body: "Approved software is prepared for release in the agreed environment. Continuing work can include monitoring, issue resolution, maintenance, compatibility updates, and planned feature enhancement.",
    },
  ],
};

export const offGovernance: CardGridContent = {
  eyebrow: "Governance",
  title: "Quality, Governance and Intellectual Property",
  body: "Code quality, IP ownership, and delivery governance are settled in the engagement terms rather than assumed from a service description. These are the controls that apply, and the points at which they are agreed.",
  items: [
    {
      name: "Defined Delivery Governance",
      body: "Responsibilities, review points, communication expectations, access requirements, and delivery documentation are clarified before work starts, matched to the project and your level of involvement.",
    },
    {
      name: "Code Review and Testing",
      body: "Code reviews and project-appropriate testing identify defects, keep implementation consistent, and validate work against agreed requirements rather than against a general standard of done.",
    },
    {
      name: "Documentation and Handoff",
      body: "Documentation supports technical understanding, handoffs, deployment, and continuing development, so the work remains maintainable by whoever holds it next — including your own engineers.",
    },
    {
      name: "Source Code Ownership",
      body: "You own the source code and repositories produced during the engagement. Access permissions, confidentiality expectations, and handoff responsibilities are agreed in writing before work begins.",
    },
    {
      name: "Certified Information Security",
      body: "Our ISO/IEC 27001:2022-certified information security management system supports structured security practices across development and delivery, with project-specific requirements reviewed separately.",
    },
    {
      name: "Change Control",
      body: "Changed requirements are assessed for their effect on scope, schedule, responsibilities, and commercial terms — formally under Fixed Bid, and within the agreed operating model under the other structures.",
    },
  ],
};

export const offMidCta: CtaBandContent = {
  eyebrow: "Choose With Confidence",
  title: "Not Sure Which Engagement Model Fits Your Project?",
  body: "Tell us about your project, technical requirements, expected timeline, and delivery preferences. Our experts will explain each model and help you pick the approach that actually suits the work.",
  cta: { label: "Talk to our experts", href: "#enquiry" },
};
export const offFaqs: FaqContent = {
  eyebrow: "FAQs",
  title: "Offshore Software Development FAQs",
  body: "Clear answers to the questions that come up most before, during, and after an offshore engagement.",
  items: [
    {
      q: "How quickly can an offshore team start?",
      a: "A team can start once the required skills, responsibilities, availability, engagement model, and commercial terms are confirmed. How long that takes depends on the roles involved and the team composition needed — a familiar stack staffs faster than a scarce specialism — so we give you a realistic date after the initial review rather than a standard one up front.",
    },
    {
      q: "Can an offshore team work alongside our existing in-house developers?",
      a: "Yes, and most of our engagements work this way. It runs on defined responsibilities, shared delivery priorities, agreed communication routines, and coordinated reviews. The model supports filling specific technical roles or adding a broader team, without the offshore group having to replace your internal engineers.",
    },
    {
      q: "How is progress reported during an engagement?",
      a: "Through an agreed communication and review process rather than one mandated toolset. Updates typically cover completed work, current priorities, dependencies, identified risks, decisions that need your input, and upcoming activities — enough for your stakeholders to see where delivery stands without a weekly archaeology exercise.",
    },
    {
      q: "What happens if project requirements change mid-engagement?",
      a: "Changes are assessed for their effect on delivery, scope, schedule, responsibilities, and commercial terms. Under Fixed Bid that means a formal scope review, because the price was set against the original scope. Under Time and Material or a Dedicated Team, priorities can be adjusted within the agreed operating model without renegotiating the contract.",
    },
    {
      q: "Who owns the source code and repositories?",
      a: "You do, on terms confirmed before work begins. Access permissions, confidentiality expectations, and handoff responsibilities are agreed alongside ownership, so both sides know exactly what transfers and when — rather than discovering the answer at the end of the engagement.",
    },
    {
      q: "How are developers matched to our technical requirements?",
      a: "By reviewing the required skills, relevant experience, project context, responsibilities, collaboration expectations, and engagement model together. The matching conversation is where you confirm whether the proposed capabilities genuinely fit your application, architecture, and workflows — it is not a CV drop.",
    },
    {
      q: "What support is available after release?",
      a: "Post-release support can cover monitoring, issue resolution, maintenance, compatibility updates, and continuing feature work. The responsibilities, duration, communication process, and commercial terms are confirmed per engagement, against the software actually released and what your operations need from it.",
    },
    {
      q: "How do we move from an initial discussion to a signed engagement?",
      a: "We discuss your requirements, review the capabilities needed, choose an engagement model, and confirm scope and commercial terms. Once responsibilities and working arrangements are agreed, the engagement is signed and delivery begins. How long that takes depends on your project and your internal approval process.",
      link: {
        label: "Book a 30-minute consultation",
        href: "https://www.softsuave.com/30-min-free-consultation",
        tail: "to start that conversation.",
      },
    },
  ],
};
