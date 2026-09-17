/**
 * Copy for the "IT Outsourcing Company in India" landing page
 * (`/it-outsourcing-company-india`).
 *
 * The live page's distinguishing section is its destination comparison — India
 * against Poland, Mexico, the Philippines and Vietnam across cost, talent,
 * overlap, and fit. That is a four-value-column table, which is the reason
 * `components/landing/comparison.tsx` takes a variable column count rather than
 * a fixed pair. Everything else follows the live structure: overview, services,
 * when-it-fits, engagement models, process, collaboration, industries, why us,
 * tech, case studies, testimonials and FAQs.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { ProcessContent } from "@/components/landing/process";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { ComparisonContent } from "@/components/landing/comparison";
import type { FaqContent } from "@/components/landing/faq";
import { sharedHeroBadges } from "./delivery-shared";

export const itoMeta = {
  slug: "it-outsourcing-company-india",
  path: "/it-outsourcing-company-india",
  title: "IT Outsourcing Company in India",
  description:
    "Move technology initiatives forward with an experienced IT outsourcing company in India. Soft Suave combines software, AI, QA, cloud, and modernization expertise with flexible engagement models and a 4–6 hour global work overlap.",
} as const;

export const itoHero: HeroContent = {
  eyebrow: "IT Outsourcing",
  titleLines: ["IT Outsourcing Company", "in India"],
  body: [
    "Move critical technology initiatives forward with an IT outsourcing partner that brings software, AI, QA, cloud, and modernization capability under one engagement — shaped around your roadmap, your systems, and your delivery priorities.",
    "We start by understanding your scope, what your internal team retains, and where capacity actually runs out, then recommend the engagement structure that fits. Not every requirement should be outsourced the same way.",
  ],
  points: [
    "Software, AI, QA, Cloud & Modernization",
    "400+ AI & Engineering Specialists",
    "Project, Dedicated Team or Staff Augmentation",
    "4–6 Hour Global Working-Hour Overlap",
    "ISO/IEC 27001:2022 Certified",
  ],
  badges: sharedHeroBadges,
  form: {
    eyebrow: "Business Enquiry",
    title: "Scope your outsourcing engagement",
    note: "Share your scope, the roles you need, and what your internal team will keep. We come back with a recommended model and an indicative estimate. Everything stays under NDA.",
    submit: "Send requirements",
    sending: "Opening your mail…",
    requirementLabel: "What do you want to outsource?",
    requirementPlaceholder:
      "The initiative, the systems involved, which responsibilities stay in-house, and the timeline you are working to.",
    subject: "IT outsourcing enquiry",
  },
  image: {
    src: "/images/four/story.webp",
    width: 1400,
    height: 900,
    alt: "Distributed engineering and delivery teams coordinating an outsourced technology programme",
  },
};

export const itoOverview: OverviewContent = {
  eyebrow: "The Short Answer",
  title: "What Does an IT Outsourcing Company in India Do?",
  paragraphs: [
    "IT outsourcing assigns defined technology responsibilities to an external partner while you keep agreed strategic and operational control. What transfers is delivery execution — not direction, and not ownership of the outcome.",
    "India is the most common destination for it because of a combination that is hard to find elsewhere: a very large engineering talent market spanning web, mobile, cloud, AI, data, QA, and enterprise technologies; a mature delivery ecosystem with established security and contracting practice; and a working day that overlaps usefully with both Europe and, with planning, the United States.",
    "Soft Suave provides complete project outsourcing, dedicated development teams, and staff augmentation, drawing on 13+ years of delivery across industries. The section below sets out when each of those structures is the right one, because choosing the wrong structure is the most common reason outsourcing disappoints.",
  ],
  pullQuote:
    "Outsourcing well is mostly a scoping problem. Decide what you are keeping before you decide who gets the rest.",
};

export const itoServices: ServicesContent = {
  eyebrow: "Core Services",
  title: "IT Outsourcing Services We Provide",
  body: "One partner across the technology functions most often outsourced together, so integration between them is not your coordination problem.",
  items: [
    {
      name: "Custom Software Development",
      tag: "Build",
      body: "Custom applications, platforms, and APIs built around specific business workflows, covering architecture, development, integration, testing, deployment, and planned improvement across the lifecycle.",
    },
    {
      name: "Product Engineering Services",
      tag: "Product",
      body: "Product requirements turned into maintainable systems through discovery, planning, architecture, feature development, integration, testing, and release support, tracking a roadmap that keeps moving.",
    },
    {
      name: "Web Application Development",
      tag: "Web",
      body: "Responsive web applications for customer, employee, and operational workflows — frontend interfaces, backend services, APIs, databases, integrations, testing, deployment, and ongoing enhancement.",
    },
    {
      name: "Mobile Application Development",
      tag: "Mobile",
      body: "Native and cross-platform applications for Android and iOS in Swift, Kotlin, Flutter, and React Native, covering architecture, API integration, testing, release, and continuing improvement.",
    },
    {
      name: "AI Development and Integration",
      tag: "AI",
      body: "Custom models, generative AI, intelligent automation, and predictive systems applied to workflows where they genuinely help, with requirements and implementation boundaries defined during discovery.",
    },
    {
      name: "QA and Software Testing",
      tag: "Quality",
      body: "Functional, integration, regression, performance, and automated testing, with scope, environments, acceptance criteria, defect handling, and reporting agreed for each engagement rather than assumed.",
    },
    {
      name: "Legacy Modernization & Integration",
      tag: "Modernize",
      body: "Aging applications, services, and architectures updated while critical workflows keep running — code improvement, cloud migration, API enablement, interface renewal, and system integration.",
    },
    {
      name: "Cloud and DevOps Engineering",
      tag: "Cloud & DevOps",
      body: "Cloud environments, deployment pipelines, infrastructure automation, monitoring, and release practice, with responsibilities defined against your platforms, access policies, and internal operations.",
    },
  ],
};

export const itoFit: CardGridContent = {
  eyebrow: "When It Fits",
  title: "When IT Outsourcing to India Makes Sense",
  body: "Outsourcing is the right answer when your roadmap needs more delivery capacity, specialist expertise, or clearer project structure than your internal team can currently provide. These are the situations where it usually works.",
  items: [
    {
      name: "A Skills Gap on a Planned Initiative",
      icon: "users",
      body: "Your roadmap includes work your team does not have the expertise for, and building that expertise internally would take longer than the initiative allows.",
    },
    {
      name: "Priorities Exceed Capacity",
      icon: "gauge",
      body: "The backlog is well understood and agreed, but there are not enough engineers to execute it inside the window the business needs.",
    },
    {
      name: "A Defined Project Needs an Owner",
      icon: "book",
      body: "A discrete piece of work needs agreed ownership, milestones, and accountability rather than being squeezed between competing internal priorities.",
    },
    {
      name: "Legacy Systems Need Modernizing",
      icon: "globe",
      body: "Applications need re-platforming, integrating, or re-architecting — specialist, time-boxed work that rarely justifies permanent headcount.",
    },
    {
      name: "Development and Testing Must Scale Together",
      icon: "shield",
      body: "Adding developers alone would just move the bottleneck to QA, so both capabilities need to expand at the same time.",
    },
    {
      name: "Flexibility Before Permanent Hiring",
      icon: "coins",
      body: "You need delivery capacity now but are not ready to commit to permanent headcount until the roadmap or the funding picture settles.",
    },
  ],
};

export const itoDestinations: ComparisonContent = {
  eyebrow: "Destination Comparison",
  title: "How Does India Compare With Other Outsourcing Destinations?",
  body: "India is not automatically the right answer — it depends on whether you are optimising for cost, seniority, or real-time overlap. Here is an honest comparison across the destinations most often shortlisted against it.",
  columns: ["India", "Poland", "Mexico", "Philippines", "Vietnam"],
  rows: [
    {
      area: "Cost positioning",
      values: ["Lower", "Moderate to high", "Moderate", "Lower", "Lower"],
    },
    {
      area: "Engineering talent",
      values: [
        "Very large market across web, mobile, cloud, AI, data, QA, and enterprise technologies",
        "Strong senior engineering and enterprise technology expertise",
        "Growing software and product engineering market",
        "Established technology, QA, support, and English-language delivery talent",
        "Growing engineering market with strong software development capacity",
      ],
    },
    {
      area: "Working-hour alignment",
      values: [
        "Strong UK overlap, partial US overlap with planned schedules",
        "Strong UK and European overlap; limited US overlap",
        "Strong US working-hour alignment",
        "Limited natural US overlap, often supported through shifted schedules",
        "Limited natural US and UK overlap without adjusted schedules",
      ],
    },
    {
      area: "Best suited for",
      values: [
        "Multiple engineering roles, broad technology coverage, and scalable delivery teams",
        "Complex engineering projects needing experienced teams and close European collaboration",
        "US companies prioritising real-time collaboration and nearshore delivery",
        "QA, support, operations, and teams needing strong English communication",
        "Cost-conscious development and larger engineering delivery requirements",
      ],
    },
  ],
};

export const itoModels: CardGridContent = {
  eyebrow: "Engagement Models",
  title: "Choose the Right IT Outsourcing Model",
  body: "The structure should follow from how stable your scope is, how many roles you need, and how much delivery ownership you want to retain.",
  items: [
    {
      name: "Complete Project Outsourcing",
      body: "For a defined product, platform, modernization, or integration requirement. Scope, milestones, responsibilities, and delivery expectations are agreed for the project, and we own execution against them.",
    },
    {
      name: "Dedicated Development Team",
      body: "For an ongoing product roadmap needing multiple roles. A defined team works across the roadmap with agreed responsibilities and collaboration practices, and stays with the product as it evolves.",
    },
    {
      name: "Staff Augmentation",
      body: "For an existing team that needs one or more additional specialists. Selected engineers extend your current capacity while your organisation keeps responsibility for priorities and direction.",
    },
  ],
};

export const itoProcess: ProcessContent = {
  eyebrow: "How We Deliver",
  title: "Our IT Outsourcing Process",
  body: "Five stages from first conversation to running engagement, each with a defined output — so scope, responsibilities, and commercial terms are settled before delivery starts rather than during it.",
  steps: [
    {
      n: "01",
      image: {
        src: "/images/four/ito-step-1.webp",
        width: 1200,
        height: 900,
        alt: "Discuss the Requirements in an IT outsourcing engagement",
      },
      name: "Discuss the Requirements",
      body: "We clarify business goals, project scope, required roles, technical constraints, existing systems, expected outcomes, and — just as importantly — which responsibilities your internal team will retain.",
    },
    {
      n: "02",
      image: {
        src: "/images/four/ito-step-2.webp",
        width: 1200,
        height: 900,
        alt: "Select the Engagement Model in an IT outsourcing engagement",
      },
      name: "Select the Engagement Model",
      body: "Complete project outsourcing, a dedicated team, or staff augmentation, chosen against ownership, scope stability, internal capacity, and how involved you want to be in delivery decisions.",
    },
    {
      n: "03",
      image: {
        src: "/images/four/ito-step-3.webp",
        width: 1200,
        height: 900,
        alt: "Confirm Scope and Responsibilities in an IT outsourcing engagement",
      },
      name: "Confirm Scope and Responsibilities",
      body: "Deliverables, roles, milestones, dependencies, communication practices, acceptance expectations, and commercial terms are documented so both sides understand how the engagement will actually operate.",
    },
    {
      n: "04",
      image: {
        src: "/images/four/ito-step-4.webp",
        width: 1200,
        height: 900,
        alt: "Begin Delivery in an IT outsourcing engagement",
      },
      name: "Begin Delivery",
      body: "Approved access, communication channels, development environments, repositories, tracking tools, and the delivery workflow are established for the agreed scope before the first sprint.",
    },
    {
      n: "05",
      image: {
        src: "/images/four/ito-step-5.webp",
        width: 1200,
        height: 900,
        alt: "Review and Improve in an IT outsourcing engagement",
      },
      name: "Review and Improve",
      body: "Progress is monitored, completed work demonstrated, risks addressed, and changing priorities reviewed through the agreed governance and change process rather than ad hoc.",
    },
  ],
};

export const itoCollaboration: CardGridContent = {
  eyebrow: "Working Together",
  title: "Collaboration Across Teams and Time Zones",
  body: "Distributed delivery works when communication windows, decision ownership, tooling, and escalation paths are established at the start. These are the practices we set up before delivery begins.",
  items: [
    {
      name: "4–6 Hour Working Overlap",
      body: "We maintain a 4–6 hour overlap with your working day so planning, reviews, demonstrations, and decisions happen live rather than accruing a day of latency each time.",
    },
    {
      name: "Defined Decision Ownership",
      body: "Who decides what is agreed up front, so work does not stall waiting for an approval nobody knew they owned — the most common cause of lost days in distributed teams.",
    },
    {
      name: "Shared Tracking and Tooling",
      body: "We work in your tracking systems and repositories where possible, so progress is visible to your stakeholders continuously rather than summarised in a status call.",
    },
    {
      name: "Written Documentation by Default",
      body: "Decisions, context, and technical rationale are written down, preserving visibility outside overlapping hours and surviving the handoffs that distributed work inevitably involves.",
    },
    {
      name: "Scheduled Reviews and Demos",
      body: "Regular demonstrations of working software give your stakeholders something concrete to react to, which surfaces misunderstandings far earlier than written status does.",
    },
    {
      name: "Multi-Location Delivery Presence",
      body: "Delivery across Chennai, Bengaluru, and the United States, so escalation and account coordination are available inside your own business hours.",
    },
  ],
};

export const itoMidCta: CtaBandContent = {
  eyebrow: "Scope It Properly",
  title: "Not Sure What You Should Outsource?",
  body: "The hardest part is usually deciding what stays in-house. Talk it through with our team and we will map your scope against the three engagement models before you commit to any of them.",
  cta: { label: "Talk to our experts", href: "#enquiry" },
};
export const itoFaqs: FaqContent = {
  eyebrow: "FAQs",
  title: "IT Outsourcing FAQs",
  body: "The questions we are asked most by companies evaluating outsourcing to India for the first time.",
  items: [
    {
      q: "What IT outsourcing services does Soft Suave provide?",
      a: "Software engineering, web and mobile development, AI development and integration, QA and testing, legacy modernization, system integration, and cloud and DevOps engineering. Most engagements combine several of these, which is usually the point — coordinating them across separate vendors is work you would otherwise absorb yourself.",
    },
    {
      q: "How much does IT outsourcing to India cost?",
      a: "It depends on scope, the roles required, team size, engagement model, integration complexity, testing depth, security requirements, and schedule. Any figure quoted before those are known is a guess. We confirm pricing after reviewing requirements and scope, which typically takes one working session plus a follow-up.",
      link: {
        label: "Get a rough quote in 24 hours",
        href: "https://www.softsuave.com/free-quote",
      },
    },
    {
      q: "What is the difference between outsourcing and staff augmentation?",
      a: "Outsourcing assigns responsibility for defined work to an external partner, who owns delivery against agreed scope and milestones. Staff augmentation adds specialists to your team while your organisation retains responsibility for priorities, direction, and delivery. The test is whether you want to review an outcome or direct the work day to day.",
    },
    {
      q: "How do outsourced teams collaborate with US, UK, or other global companies?",
      a: "Through scheduled meetings, shared tracking tools, written documentation, regular demonstrations, and defined escalation paths, all established before delivery starts. We maintain a 4–6 hour working-hour overlap so planning and decisions happen live. Outside that window, documentation and tracking carry the context rather than a daily handoff call.",
    },
    {
      q: "How are security and intellectual property handled?",
      a: "Through contracts, NDAs, access controls, defined development practices, and a documented offboarding process. You own the intellectual property produced during the engagement, on terms agreed before work begins. Soft Suave maintains an ISO/IEC 27001:2022-certified information security management system covering data handling, access, and device management.",
    },
    {
      q: "Can we begin with one developer or a small team?",
      a: "Yes, and it is often the sensible way in. Start with one engineer or a small team, confirm the working relationship is what you expected, then expand. Eligible engagements can include a 40-hour risk-free trial once suitability is confirmed, which gives you real output to judge rather than a reference call.",
    },
    {
      q: "How long does it take to begin an outsourcing engagement?",
      a: "It depends on how clear the requirements are, the engagement type, availability of the specific skills, your internal review and approval process, and access and onboarding steps. Requirement clarity is usually the largest variable, not our availability. We confirm a realistic plan once those are understood.",
    },
    {
      q: "Should we outsource a project or hire a dedicated team?",
      a: "Outsource the project when scope and deliverables are clear and you want accountability for an outcome. Choose a dedicated team when you need multiple roles supporting ongoing development against priorities that will keep changing — a fixed scope would only generate a change-request queue. If you are between the two, the dedicated team is usually the safer choice, because it degrades more gracefully when scope moves.",
    },
  ],
};
