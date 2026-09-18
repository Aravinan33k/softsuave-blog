/**
 * Copy for the "Product Engineering Services" landing page
 * (`/product-engineering-services`).
 *
 * The live page has six well-developed service sections (consulting,
 * architecture, UI/UX, development, testing and delivery, deployment and
 * maintenance) and a five-step approach, but its prose is dated and it carries
 * no industries, technologies, testimonials or FAQs. The six services and the
 * five-step process are preserved in substance and rewritten; the missing
 * sections are built from company-level facts published elsewhere on the site.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { ProcessContent } from "@/components/landing/process";
import type { CtaBandContent } from "@/components/landing/cta-band";
import { sharedHeroBadges } from "./delivery-shared";

export const prodMeta = {
  slug: "product-engineering-services",
  path: "/product-engineering-services",
  title: "Product Engineering Services",
  description:
    "Take a product from idea to market and keep it improving. End-to-end product engineering — consulting, architecture, UI/UX, development, QA and deployment.",
} as const;

export const prodHero: HeroContent = {
  eyebrow: "Product Engineering",
  titleLines: ["Product Engineering", "From Idea to Market"],
  body: [
    "Building a product is not the same as building software to a specification. Scope moves as you learn, architecture has to survive decisions not yet made, and the work does not stop at launch — it starts compounding there.",
    "Soft Suave supports products across the full lifecycle: validating the concept, designing the architecture, building and testing iteratively, releasing, and continuing to improve against what real usage shows. One team from discovery through to the version nobody planned for at the start.",
  ],
  points: [
    "Consulting, architecture, UI/UX, build, QA and support",
    "Agile delivery in reviewable increments",
    "Reduced total cost of ownership",
    "Faster time to market",
    "13+ Years of product engineering experience",
  ],
  badges: sharedHeroBadges,
  form: {
    eyebrow: "Business Enquiry",
    title: "Get a free rough quote in 24 hours",
    note: "Tell us about the product, where it is today, and where it needs to be. We come back with an approach, a team shape, and an indicative estimate. Everything stays under NDA.",
    submit: "Send requirements",
    sending: "Opening your mail…",
    requirementLabel: "Tell us about your product",
    requirementPlaceholder:
      "What it does, who it is for, what exists already, and what you are trying to reach — a first release, a rebuild, or the next stage of growth.",
    subject: "Product engineering enquiry",
  },
  image: {
    src: "/images/four/work-9.png",
    width: 1536,
    height: 1024,
    alt: "A product engineering team moving a concept from design through build to release",
  },
};

export const prodOverview: OverviewContent = {
  eyebrow: "The Short Answer",
  title: "What Product Engineering Services Cover",
  paragraphs: [
    "Product engineering is the discipline of taking a product idea through validation, design, build, release, and continued evolution — treating it as a thing that lives and changes rather than a project that finishes. It spans business analysis, architecture, design, development, quality engineering, deployment, and the operational work that follows.",
    "The distinction from project-based development matters commercially. A project optimises for delivering an agreed scope on time. Product engineering optimises for the product being viable, maintainable, and improvable over years — which changes how you architect, how much you invest in testing, and what counts as done.",
    "Soft Suave works alongside your product team to turn an idea into something marketable in the most effective way available, then keeps it improving. Where scope is not yet defined, our consultants work with you to establish business objectives and requirements before engineering begins, so the first build is against a real specification rather than an assumption.",
  ],
  pullQuote:
    "A product is never finished. Engineering it well means the tenth release costs less than the second, not more.",
};

export const prodServices: ServicesContent = {
  eyebrow: "Core Services",
  title: "Our Product Engineering Services",
  body: "End-to-end coverage across the product lifecycle. Engage across all six, or bring us in at the stage where your team needs depth it does not currently have.",
  items: [
    {
      name: "Product Consulting",
      tag: "Consulting",
      body: "We help you shape the idea and validate the concept, then advise on product strategy, launch approach, and roadmap. Where scope is undefined, our consultants work with you to establish business objectives and software requirements, applying software engineering and business analysis practice to produce precise, buildable specifications rather than a wish list.",
    },
    {
      name: "Product Architecture",
      tag: "Architecture",
      body: "We design architectures that hold up as the business changes — defining the programs, work assignments, and processes a product needs, and documenting them so risks surface in the early phases when mitigating them is still cheap. Our design and technology consultants help select the right approach across software, mobile, web, and embedded applications.",
    },
    {
      name: "Product UI/UX Design",
      tag: "Design",
      body: "Interfaces designed to engage the people who will actually use them. We build clickable wireframes and functional prototypes to simulate and test experiences before committing to code, clarifying interactions and access roles per user type. Research and interviews establish real requirements, and designs are delivered compatible with desktop, mobile, and tablet.",
    },
    {
      name: "Product Development",
      tag: "Build",
      body: "Iterative scrum delivery across sprints, each carrying design, implementation, testing, feedback, and release. The emphasis is on eliminating complexity early rather than paying it down later, which is what keeps a product fast to change at version ten instead of only at version two.",
    },
    {
      name: "Product Testing & Delivery",
      tag: "Quality",
      body: "Unit testing isolates changes without disturbing surrounding code; manual review catches what automation misses and supports stability across releases; automated QA expands coverage continuously alongside development. Together they let the team release in short cycles with confidence rather than a pre-launch freeze.",
    },
    {
      name: "Product Deployment & Maintenance",
      tag: "Deploy & Run",
      body: "Continuous integration and deployment keep releases stable and frequent, supporting earlier product-to-market and faster return. After launch, periodic maintenance addresses emerging issues and applies permanent fixes to critical problems, so the product does not quietly age out of supportability.",
    },
  ],
};

export const prodProcess: ProcessContent = {
  eyebrow: "How We Deliver",
  title: "Our Step-by-Step Product Approach",
  body: "Five stages, run iteratively rather than once. Each produces something reviewable, so direction can change on evidence instead of at the end.",
  steps: [
    {
      n: "01",
      image: {
        src: "/images/four/prod-step-1.webp",
        width: 1200,
        height: 900,
        alt: "Planning in a product engineering programme",
      },
      name: "Planning",
      body: "Discovery workshops define the challenges, gather requirements, and establish what success looks like — including what the product does not need to do, which is usually the more useful half of the conversation.",
    },
    {
      n: "02",
      image: {
        src: "/images/four/prod-step-2.webp",
        width: 1200,
        height: 900,
        alt: "Development in a product engineering programme",
      },
      name: "Development",
      body: "Work is planned into sprints and built iteratively, each sprint producing working software your stakeholders can assess and react to rather than a status report about progress.",
    },
    {
      n: "03",
      image: {
        src: "/images/four/prod-step-3.webp",
        width: 1200,
        height: 900,
        alt: "Deployment in a product engineering programme",
      },
      name: "Deployment",
      body: "Continuous integration and deployment move validated work into the target environment predictably, so releasing is a routine operation rather than an event the team braces for.",
    },
    {
      n: "04",
      image: {
        src: "/images/four/prod-step-4.webp",
        width: 1200,
        height: 900,
        alt: "Performance in a product engineering programme",
      },
      name: "Performance",
      body: "Defects are resolved, quality analysis is applied, and performance is tuned against real conditions — the stage where a product that works becomes a product that holds up under load.",
    },
    {
      n: "05",
      image: {
        src: "/images/four/prod-step-5.webp",
        width: 1200,
        height: 900,
        alt: "Evolution in a product engineering programme",
      },
      name: "Evolution",
      body: "The product improves against what customers actually do with it. Roadmap priorities are revisited as usage data accumulates, which is the whole reason to engineer for change in the first place.",
    },
  ],
};

export const prodBenefits: CardGridContent = {
  eyebrow: "Outcomes",
  title: "What Product Engineering Should Deliver",
  body: "Engaging a product engineering partner should change specific, measurable things about how your product gets built and how much it costs to keep building.",
  items: [
    {
      name: "Reduced Total Cost of Ownership",
      icon: "coins",
      body: "Architecture and test coverage designed for change mean the cost of each subsequent release falls rather than climbs as the codebase grows.",
    },
    {
      name: "Reduced Time-to-Market",
      icon: "gauge",
      body: "Iterative delivery and continuous deployment shorten the distance between a decision and it being live, which matters most when you are still learning what the product should be.",
    },
    {
      name: "Flexibility to Technology Shifts",
      icon: "globe",
      body: "Products built with clean boundaries adapt to mobile, cloud, SaaS, and AI capability as those become relevant, instead of requiring a rebuild each time the landscape moves.",
    },
    {
      name: "Scalability Designed In",
      icon: "book",
      body: "Architecture that anticipates growth avoids the rewrite that otherwise arrives exactly when traction makes it most expensive and most disruptive to attempt.",
    },
    {
      name: "Risk Surfaced Early",
      icon: "shield",
      body: "Architecture documentation and prototyping identify problems in the initial phases, when changing direction costs a conversation rather than a quarter.",
    },
    {
      name: "A Product Your Team Can Own",
      icon: "users",
      body: "Documentation, tests, and clean structure are deliverables, so your engineers can take the product forward without depending on us indefinitely.",
    },
  ],
};

export const prodMidCta: CtaBandContent = {
  eyebrow: "Validate First",
  title: "Have an Idea but No Defined Scope Yet?",
  body: "That is what the consulting stage is for. Our team will work through the business objectives and requirements with you, and you get a buildable specification — whether or not we build it.",
  cta: { label: "Book a free consultation", href: "#enquiry" },
};

export const prodEngagement: CardGridContent = {
  eyebrow: "Engagement Models",
  title: "Ways to Engage Us on Your Product",
  body: "Products change shape as they mature, and so should the commercial structure around them. Most engagements start in one model and move to another.",
  items: [
    {
      name: "Dedicated Product Team",
      body: "A standing cross-functional team — engineering, QA, design — working only on your product and accumulating the domain context that makes each release faster than the last.",
    },
    {
      name: "Time and Material",
      body: "Pay for effort actually used, with priorities re-cut sprint to sprint. The natural fit while the product is still being discovered and fixed scope would only generate change requests.",
    },
    {
      name: "Fixed Bid",
      body: "A defined budget against an agreed scope, with milestones and acceptance criteria. Suits a well-specified first release or a discrete phase where cost certainty matters more than flexibility.",
    },
  ],
};
