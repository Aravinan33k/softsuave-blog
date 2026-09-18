/**
 * Copy for the "Cloud Computing Services" landing page (`/cloud-computing`).
 *
 * The live page is short: a hero, a benefits list, a four-part strategic
 * approach (cloud type, options, budget, technology selection), four services
 * (cloud app development, migration, integration and consolidation, cloud
 * security), the three service models, and a platform list. All of that is
 * carried over and rewritten; the process, industries, engagement models,
 * testimonials and FAQs the page lacks are built from company-level facts
 * published elsewhere on the site.
 *
 * One live claim is deliberately dropped: ".NET, JEE, and LAMP" as the cloud
 * application stack. It dates the page badly and is contradicted by the
 * technology stack the rest of the site publishes.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { ProcessContent } from "@/components/landing/process";
import type { CtaBandContent } from "@/components/landing/cta-band";
import { sharedHeroBadges } from "./delivery-shared";

export const cloudMeta = {
  slug: "cloud-computing",
  path: "/cloud-computing",
  title: "Cloud Computing Services",
  description:
    "Cloud strategy, migration, application development and security from Soft Suave. Lower IT costs and modernize infrastructure across AWS, Azure and Google Cloud.",
} as const;

export const cloudHero: HeroContent = {
  titleLines: ["Cloud Computing Services", "That Lower the Cost of Running IT"],
  body: [
    "Cloud gives you flexible, low-cost access to IT resources without the upfront hardware investment — but only if the migration is planned around how your applications actually behave. Lifting the wrong workload can cost more than the infrastructure it replaced.",
    "Soft Suave assesses your infrastructure, applications, processes, and policies before recommending anything, then handles cloud strategy, migration, application development, integration, and security across AWS, Azure, Google Cloud, and hybrid environments.",
  ],
  points: [
    "Assessment before migration, always",
    "Public, private or hybrid — chosen on requirements",
    "Cloud-native development and legacy migration",
    "24/7-monitored cloud security services",
    "AWS Partner · Microsoft Partner",
  ],
  badges: sharedHeroBadges,
  form: {
    eyebrow: "Business Enquiry",
    title: "Plan your cloud migration",
    note: "Tell us what you run today and what is driving the move. We come back with an assessment approach, a target architecture, and an indicative estimate. Everything stays under NDA.",
    submit: "Send requirements",
    sending: "Opening your mail…",
    requirementLabel: "What do you need from the cloud?",
    requirementPlaceholder:
      "Your current infrastructure, the applications involved, what is driving the change — cost, scale, resilience — and any compliance constraints.",
    subject: "Cloud computing enquiry",
  },
  image: {
    src: "/images/four/work-3.webp",
    width: 800,
    height: 1000,
    alt: "Cloud infrastructure and deployment pipelines visualised across connected environments",
  },
};

export const cloudOverview: OverviewContent = {
  eyebrow: "The Short Answer",
  title: "What Cloud Computing Services Cover",
  paragraphs: [
    "Cloud computing gives organisations instant access to flexible, low-cost IT resources, removing the large upfront hardware investment and the capacity planning that goes with it. Businesses adopt it for flexibility, better access to their IT assets, and a lower cost of running the business.",
    "In practice a cloud engagement spans several things: deciding which model fits, moving existing workloads, building new applications designed for cloud from the start, connecting cloud services to what stays on-premise, and securing the result. Skipping the assessment and starting with the migration is the most common and most expensive mistake.",
    "Soft Suave provides end-to-end application integration through cloud services, beginning with a strategic assessment of your infrastructure, applications, processes, and policies before any deployment decision is made — so the target architecture reflects your actual workloads rather than a reference diagram.",
  ],
  pullQuote:
    "Cloud reduces cost when workloads are matched to the right service. Lifted unchanged, it frequently increases it.",
};

export const cloudBenefits: CardGridContent = {
  eyebrow: "Benefits",
  title: "Why Businesses Move to the Cloud",
  body: "The case for cloud is usually made on cost, but the operational benefits tend to matter more over time. These are the ones that hold up.",
  items: [
    {
      name: "Lower Initial and Ongoing Cost",
      icon: "coins",
      body: "No large upfront hardware purchase and no maintenance of physical infrastructure, replacing capital expenditure with operating cost that tracks what you actually consume.",
    },
    {
      name: "Access From Anywhere",
      icon: "globe",
      body: "Applications and data reachable from any location at any time, which turns distributed teams and remote working into a configuration question rather than an infrastructure project.",
    },
    {
      name: "Elastic Capacity",
      icon: "gauge",
      body: "Scale capacity up during peaks and back down afterwards, so you stop provisioning permanently for a load that occurs a few days a year.",
    },
    {
      name: "Better Security Posture",
      icon: "shield",
      body: "Access to platform security capabilities, patching cadence, and certification that few organisations can match on their own hardware — provided the configuration is done properly.",
    },
    {
      name: "Easier Disaster Recovery",
      icon: "book",
      body: "Backup, replication, and recovery become configurable services with testable recovery objectives, rather than a secondary site and a procedure nobody has rehearsed.",
    },
    {
      name: "Faster Delivery",
      icon: "users",
      body: "Environments provision in minutes, so development, testing, and release stop waiting on infrastructure — usually the largest hidden cost of on-premise delivery.",
    },
  ],
};

export const cloudServices: ServicesContent = {
  eyebrow: "Core Services",
  title: "Our Cloud Computing Services",
  body: "Four services covering the lifecycle from a first migration through to running a secure, optimised cloud estate.",
  items: [
    {
      name: "Cloud Consulting & Strategy",
      tag: "Strategy",
      body: "We assess your infrastructure, applications, processes, and policies, then recommend the cloud model, the target architecture, and the sequence. This includes the honest part — which workloads should move, which should be re-engineered first, and which should not move at all.",
    },
    {
      name: "Cloud Migration",
      tag: "Migration",
      body: "Existing workloads and data moved into the cloud with minimal manual intervention, using automated tooling and third-party integrations where they fit. Migrations are rehearsed against production-like volumes so the cutover window is a measured figure rather than a hopeful estimate.",
    },
    {
      name: "Cloud Application Development",
      tag: "Build",
      body: "New applications built for cloud from the start — designed around managed services, elastic scaling, and deployment automation — plus the modernization of legacy applications so they can take advantage of the platform rather than merely run on it.",
    },
    {
      name: "Integration & Consolidation",
      tag: "Integration",
      body: "Existing infrastructure connected to public or private cloud so the combined estate delivers against business goals and satisfies compliance requirements, rather than leaving two environments that have to be operated and reconciled separately.",
    },
    {
      name: "Cloud Security Services",
      tag: "Security",
      body: "Managed cloud security monitored around the clock across any cloud environment, with controls customised to each organisation's security and compliance obligations rather than applied from a standard template.",
    },
    {
      name: "Cloud Cost Optimisation",
      tag: "Cost",
      body: "Right-sizing, reserved capacity planning, storage tiering, and workload scheduling to bring spend in line with usage — the work that most often pays for the engagement that produced it.",
    },
  ],
};

export const cloudServiceModels: CardGridContent = {
  eyebrow: "Service Models",
  title: "Cloud Service Models We Deliver On",
  body: "The three standard layers, and what engaging us at each one actually involves.",
  items: [
    {
      name: "Software-as-a-Service (SaaS)",
      body: "Enterprise mobility in the cloud through mobile and on-demand software platforms, plus building, deploying, and managing multi-tenant applications delivered to your users as a service.",
    },
    {
      name: "Platform-as-a-Service (PaaS)",
      body: "Multi-tenant applications delivered independently of the underlying platform, giving development teams managed runtimes, data services, and deployment pipelines instead of servers to maintain.",
    },
    {
      name: "Infrastructure-as-a-Service (IaaS)",
      body: "Storage, compute, servers, and networking consumed as services through partner providers, so operational elements are outsourced while you keep control of the stack running on them.",
    },
  ],
};

export const cloudProcess: ProcessContent = {
  eyebrow: "How We Deliver",
  title: "Our Cloud Engagement Process",
  body: "Assessment, planning, deployment, and optimisation — with each stage producing a decision point rather than a commitment to everything that follows.",
  steps: [
    {
      n: "01",
      image: {
        src: "/images/four/cloud-step-1.webp",
        width: 1200,
        height: 900,
        alt: "Assessment and Discovery in a cloud migration programme",
      },
      name: "Assessment & Discovery",
      body: "We review current infrastructure, application architecture, dependencies, data volumes, processes, and policies, and establish what is actually driving the move — cost, scale, resilience, or compliance.",
    },
    {
      n: "02",
      image: {
        src: "/images/four/cloud-step-2.webp",
        width: 1200,
        height: 900,
        alt: "Cloud Model and Technology Selection in a cloud migration programme",
      },
      name: "Cloud Model & Technology Selection",
      body: "Public, private, or hybrid is decided against your requirements, then the technology stack is selected within your budget, including disaster recovery, backup, and test and development environments.",
    },
    {
      n: "03",
      image: {
        src: "/images/four/cloud-step-3.webp",
        width: 1200,
        height: 900,
        alt: "Architecture and Budget Planning in a cloud migration programme",
      },
      name: "Architecture & Budget Planning",
      body: "We design the target architecture, model the running cost against expected usage, and sequence the migration so dependencies are respected and the highest-value workloads move first.",
    },
    {
      n: "04",
      image: {
        src: "/images/four/cloud-step-4.webp",
        width: 1200,
        height: 900,
        alt: "Migration and Deployment in a cloud migration programme",
      },
      name: "Migration & Deployment",
      body: "Workloads move in planned waves with rehearsed data migration and defined rollback, so each wave is independently verifiable instead of the whole estate moving on one night.",
    },
    {
      n: "05",
      image: {
        src: "/images/four/cloud-step-5.webp",
        width: 1200,
        height: 900,
        alt: "Optimisation and Managed Security in a cloud migration programme",
      },
      name: "Optimisation & Managed Security",
      body: "Once running, we right-size resources, tune cost and performance against real usage, and operate security monitoring — the stage where the projected savings actually materialise.",
    },
  ],
};

export const cloudMidCta: CtaBandContent = {
  eyebrow: "Start With an Assessment",
  title: "Not Sure Which Workloads Should Move?",
  body: "That is the question the assessment answers, and it is worth answering before committing to a platform. Our consulting team will review your infrastructure and applications and tell you what we find.",
  cta: { label: "Book a free consultation", href: "#enquiry" },
};
