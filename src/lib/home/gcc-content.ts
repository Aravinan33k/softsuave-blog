/**
 * Copy for the "Global Capability Center" landing page (`/global-capability-center`).
 *
 * Shapes match the prop types exported by `components/landing/*`, so each
 * section is `<Component content={…} />` with no adapter. Content is the live
 * page's, reorganised and expanded: the live page ships a hero, a three-card
 * "why us", a five-step setup sequence, three benefits, and a six-segment "who
 * should consider this" block, but no engagement models, technologies or FAQs.
 * Those are added here from company-level facts published elsewhere on the
 * site (team size, certification, delivery locations, engagement structures)
 * rather than invented.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { ProcessContent } from "@/components/landing/process";
import type { CtaBandContent } from "@/components/landing/cta-band";
import { sharedHeroBadges } from "./delivery-shared";

export const gccMeta = {
  slug: "global-capability-center",
  path: "/global-capability-center",
  title: "Global Capability Center (GCC) Services",
  description:
    "Set up and run your own Global Capability Center in India — entity setup, infrastructure, hiring and daily operations, with your team under your control.",
} as const;

export const gccHero: HeroContent = {
  titleLines: ["Global Capability Center", "Services"],
  body: [
    "Build your own offshore engineering centre in India without standing up a legal entity, an office, and a hiring function from scratch. Soft Suave handles company registration, infrastructure, recruitment, and daily operations, while the team works to your roadmap and your standards.",
    "You get the cost base and talent depth of an India delivery centre with the control of an in-house team — and a defined path to taking the centre fully in-house when you are ready.",
  ],
  points: [
    "End-to-end GCC setup and operations",
    "Legal, tax and statutory compliance handled",
    "400+ AI & engineering specialists to recruit from",
    "Chennai, Bengaluru and US delivery presence",
    "Build-Operate-Transfer path to full ownership",
  ],
  badges: sharedHeroBadges,
  form: {
    eyebrow: "Business Enquiry",
    title: "Plan your Global Capability Center",
    note: "Tell us the roles, scale, and timeline you have in mind and we come back with a setup plan, an operating model, and an indicative cost structure. Everything stays under NDA.",
    submit: "Send requirements",
    sending: "Opening your mail…",
    requirementLabel: "What do you want your GCC to do?",
    requirementPlaceholder:
      "Functions you want to move offshore, roles and headcount, target timeline, and where your existing teams sit.",
    subject: "Global Capability Center enquiry",
  },
  image: {
    src: "/images/four/svc-gcc.webp",
    width: 1200,
    height: 860,
    alt: "A distributed engineering team collaborating across a global capability centre",
  },
};

export const gccOverview: OverviewContent = {
  eyebrow: "The Short Answer",
  title: "What Is a Global Capability Center?",
  paragraphs: [
    "A Global Capability Center (GCC) is an offshore entity a company owns and operates itself, staffed with full-time employees who work only on that company's products and processes. It is the alternative to outsourcing: instead of buying delivery from a vendor, you build the delivery capability, and it stays yours.",
    "GCC-as-a-Service removes the hard part of doing that. Soft Suave sets up the legal entity, the office and IT infrastructure, and the recruitment pipeline, then runs the payroll, facilities, and employee-experience functions day to day. Your engineering leadership sets priorities, owns the roadmap, and manages the team directly.",
    "Because the centre is designed around your workflows rather than a generic service catalogue, it integrates with the systems, tooling, and release processes you already run. When the centre is mature, the entity and the team can transfer to you outright.",
  ],
  pullQuote:
    "The point of a GCC is not cheaper delivery. It is delivery capability you own, at a cost base you could not build at home.",
};

export const gccServices: ServicesContent = {
  eyebrow: "What We Handle",
  title: "Simplify Your GCC Setup with Our Expertise",
  body: "Standing up an offshore capability centre touches company law, tax, real estate, IT, recruitment, and HR before a single line of code is written. Soft Suave runs all five workstreams so your leadership team can concentrate on what the centre is being built to deliver.",
  items: [
    {
      name: "Legal Establishment & Regulatory Compliance",
      tag: "Legal & Compliance",
      body: "From company registration through to financial, tax, and statutory filings, we manage the legal formation of your entity in India and keep it compliant as it operates — so the setup is clean from day one rather than remediated later.",
    },
    {
      name: "Infrastructure Setup & Management",
      tag: "Infrastructure",
      body: "Office space, network, hardware, security controls, and the development tooling your teams need, specified and commissioned to your standards so the centre is operational rather than merely incorporated.",
    },
    {
      name: "Staffing & Talent Strategy",
      tag: "Talent",
      body: "Our recruitment function sources leadership and engineering talent matched to your technology stack and your culture, drawing on the same pipeline behind our 400+ specialist bench rather than starting a search from zero.",
    },
    {
      name: "Operations Excellence",
      tag: "Operations",
      body: "Payroll, employee value proposition, employer branding, onsite support, and workspace management run continuously, so retention and day-to-day employee experience are managed functions rather than an afterthought.",
    },
    {
      name: "Process Automation & Optimization",
      tag: "Automation",
      body: "We automate the repeatable parts of running the centre and give you real-time visibility into headcount, delivery, and cost, alongside a documented knowledge base that survives individual departures.",
    },
  ],
};
export const gccProcess: ProcessContent = {
  eyebrow: "How We Deliver",
  title: "How We Set Up Your Capability Center",
  body: "Each stage has a defined output and a decision point, so you are approving a centre as it takes shape rather than waiting for a handover at the end.",
  steps: [
    {
      n: "01",
      image: {
        src: "/images/four/gcc-step-1.webp",
        width: 1200,
        height: 900,
        alt: "Mapping which functions move offshore",
      },
      name: "Discovery & Operating Model",
      body: "We map which functions move offshore, the roles and headcount they need, reporting lines, and the governance model — then agree what your leadership retains and what we operate.",
    },
    {
      n: "02",
      image: {
        src: "/images/four/gcc-step-2.webp",
        width: 1200,
        height: 900,
        alt: "Company registration and statutory compliance",
      },
      name: "Entity Formation & Compliance",
      body: "Company registration, tax and statutory registrations, banking, and the policy set the entity needs to employ people legally in India, completed before the first offer letter goes out.",
    },
    {
      n: "03",
      image: {
        src: "/images/four/gcc-step-3.webp",
        width: 1200,
        height: 900,
        alt: "Infrastructure and security commissioned",
      },
      name: "Infrastructure & Security Setup",
      body: "Workspace, network, devices, access control, and your development and deployment tooling are commissioned and security-reviewed so engineers are productive on day one.",
    },
    {
      n: "04",
      image: {
        src: "/images/four/gcc-step-4.webp",
        width: 1200,
        height: 900,
        alt: "Sourcing and onboarding engineers",
      },
      name: "Hiring & Onboarding",
      body: "We source, screen, and present candidates for your interview loops — you make the hiring decisions — then run onboarding, tooling access, and the ramp-up plan for each new joiner.",
    },
    {
      n: "05",
      image: {
        src: "/images/four/gcc-step-5.webp",
        width: 1200,
        height: 900,
        alt: "Running the centre against agreed SLAs",
      },
      name: "Operate, Optimise & Transfer",
      body: "The centre runs under agreed SLAs and reporting while we optimise cost, retention, and process. When it is mature, the entity and team transfer to you on the schedule agreed at the start.",
    },
  ],
};

export const gccBenefits: CardGridContent = {
  eyebrow: "Benefits",
  title: "What a GCC Gives You",
  body: "Centralising engineering and operations in a capability centre changes your cost structure, your access to talent, and how quickly you can put a team on a new initiative.",
  items: [
    {
      name: "Improved Financial Flexibility",
      icon: "coins",
      imageId: "gcc-benefit-1",
      body: "Reduce fixed costs and free capital for other strategic initiatives, with a cost structure that scales against headcount rather than a vendor's margin.",
    },
    {
      name: "Customised Resources",
      icon: "users",
      imageId: "gcc-benefit-2",
      body: "Shape the team around emerging business needs instead of a fixed service catalogue, keeping capability aligned to your strategic objectives as they shift.",
    },
    {
      name: "Accelerated Time-to-Market",
      icon: "gauge",
      imageId: "gcc-benefit-3",
      body: "Deploy teams and ship solutions faster, because hiring, onboarding, and environment setup are already-running functions rather than a new project each time.",
    },
    {
      name: "Deeper Talent Access",
      icon: "globe",
      imageId: "gcc-benefit-4",
      body: "Recruit from India's engineering market across web, mobile, cloud, data, QA, and AI — roles that are scarce or prohibitively expensive in many home markets.",
    },
    {
      name: "Retained Institutional Knowledge",
      icon: "book",
      imageId: "gcc-benefit-5",
      body: "Full-time employees working only on your products accumulate domain knowledge that stays with you, unlike project staff who rotate off at the end of a contract.",
    },
    {
      name: "Direct Operational Control",
      icon: "shield",
      imageId: "gcc-benefit-6",
      body: "Your leadership sets priorities, runs the ceremonies, and manages performance directly — the governance of an in-house team, not a vendor relationship.",
    },
  ],
};

export const gccAudience: CardGridContent = {
  eyebrow: "Who It Fits",
  title: "Who Should Consider GCC-as-a-Service?",
  body: "GCC-as-a-Service suits organisations looking to centralise global operations, deepen collaboration, and improve efficiency. These are the profiles it most often fits.",
  items: [
    {
      name: "Multinational Corporations",
      body: "Centralise finance, IT, R&D, and HR functions in one capability centre, driving innovation and reducing cost across markets rather than duplicating support functions region by region.",
    },
    {
      name: "Startups & Mid-Sized Businesses",
      body: "Scale engineering efficiently while conserving capital, with the flexibility to grow or contract headcount as funding and roadmap priorities change.",
    },
    {
      name: "Technology Companies",
      body: "Tap India's engineering talent pool for R&D, product development, and platform support, adding capacity in roles that are hard to fill in the home market.",
    },
    {
      name: "Financial & Banking Sector",
      body: "Streamline operations, strengthen compliance workflows, and centralise data and analytics capability with the access controls and auditability the sector requires.",
    },
    {
      name: "Healthcare & Life Sciences",
      body: "Support research, clinical trial operations, and data management with specialist talent, under data-handling controls scoped to the regulations you operate within.",
    },
    {
      name: "Retail & E-commerce",
      body: "Centralise customer support, logistics coordination, supply-chain systems, and analytics to improve customer experience while reducing the cost of running them.",
    },
  ],
};

export const gccMidCta: CtaBandContent = {
  eyebrow: "Talk It Through",
  title: "Not Sure Whether a GCC or a Dedicated Team Is Right?",
  body: "The answer usually comes down to how long you need the capacity and whether the knowledge has to stay with you. A short conversation with our team will make the trade-off concrete for your situation.",
  cta: { label: "Book a free consultation", href: "#enquiry" },
};
