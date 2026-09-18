/**
 * Copy for the "AI Solutions for Construction" landing page
 * (`/ai-solutions-for-construction`).
 *
 * Follows the live softsuave.com page: its H1, its nine solution cards, its six
 * "where AI applies" areas, its five benefits and its FAQ set are all carried
 * over. The live page's nine solutions collapse to seven here — its "Smart
 * Scheduling" and "Automated Task Allocation" cards describe the same capability
 * from the project and the worker side, as do "Safety First" and "Predictive
 * Project Oversight" on risk.
 *
 * The live page ships no process section, so this page has none either — an
 * earlier draft added one and it was removed.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { FaqContent } from "@/components/landing/faq";
import { industryHeroBadges, industryEnquiryForm, NDA_NOTE } from "./industry-shared";

export const constructionMeta = {
  slug: "ai-solutions-for-construction",
  path: "/ai-solutions-for-construction",
  title: "AI Solutions for Construction",
  description:
    "Custom construction AI from Soft Suave — scheduling and delay forecasting, site safety monitoring, procurement optimisation and predictive equipment maintenance.",
} as const;

export const constructionHero: HeroContent = {
  titleLines: ["AI-Driven Innovation", "for the Future of Construction"],
  body: [
    "Redefine on-site efficiency with AI that anticipates risk, optimises workflows, and supports safer, faster, more cost-predictable delivery. We build construction software that works from initial design through to final handover.",
    "Construction is the sector where the cost of finding out late is highest. A schedule slip identified in week four is a resequencing decision; the same slip found in week twenty is a claim.",
  ],
  points: [
    "Scheduling and delay forecasting",
    "Site safety monitoring and risk detection",
    "Resource, procurement and waste optimisation",
    "Document parsing and contract automation",
    "Predictive equipment maintenance",
  ],
  badges: industryHeroBadges,
  form: industryEnquiryForm({
    title: "Plan your construction AI build",
    note: NDA_NOTE,
    requirementLabel: "What should the system do?",
    requirementPlaceholder:
      "The project or site problem you want solved, the ERP and project management tools you run, portfolio size, and what site data you already capture.",
    subject: "Construction AI solutions enquiry",
  }),
  image: {
    src: "/images/four/ind-construction-hero.webp",
    width: 1200,
    height: 860,
    alt: "Construction site planning and progress supported by AI monitoring technology",
  },
};

export const constructionOverview: OverviewContent = {
  eyebrow: "The Short Answer",
  title: "What AI Changes on a Construction Project",
  paragraphs: [
    "Construction runs on estimates made early, under uncertainty, that then govern a project for years. Schedules, costs, and resource plans are all built from experience and historical judgement — which is exactly the kind of prediction that improves when a model has seen every project the business has delivered rather than the handful any one planner remembers.",
    "The most valuable application is early warning. Delay and cost overrun almost never arrive without precursors: a trade falling behind, an approval cycle stretching, a material lead time slipping. Surfacing those while resequencing is still possible is worth far more than the reporting accuracy that most construction software competes on.",
    "The second is safety, where computer vision over site imagery can flag hazards and non-compliance continuously rather than at inspection intervals. This is the application with the clearest moral case and, given the cost of a serious incident, one of the clearest financial ones.",
  ],
  pullQuote:
    "A slip found in week four is a resequencing decision. The same slip found in week twenty is a claim.",
};

export const constructionServices: ServicesContent = {
  eyebrow: "What We Build",
  title: "Construction AI Solutions Soft Suave Delivers",
  body: "Seven solution areas across planning, site, commercial, and asset management — the places where construction margin is most often lost.",
  items: [
    {
      name: "Smart Scheduling & Workforce Allocation",
      tag: "Planning",
      body: "Automated project scheduling and resource allocation that assign work by skill, availability, and current workload, and resequence when the programme moves — which it does.",
    },
    {
      name: "Site Safety Monitoring & Risk Detection",
      tag: "Safety",
      body: "Computer vision and predictive analytics over site imagery that identify hazards, PPE non-compliance, and unsafe conditions continuously, rather than at the intervals a manual inspection regime can cover.",
    },
    {
      name: "Resource Planning & Procurement Optimisation",
      tag: "Materials",
      body: "Demand modelling across the programme that minimises waste, times procurement against real lead times, and reduces both the cost of expediting and the cost of material sitting unused on site.",
    },
    {
      name: "Design Simulation & Clash Detection",
      tag: "Design",
      body: "AI-supported simulation and modelling that raise design precision and catch conflicts before they reach site, where the cost of correcting them multiplies.",
    },
    {
      name: "Predictive Project Oversight & Delay Forecasting",
      tag: "Risk",
      body: "Cost and deadline forecasting with intelligent alerting, so a programme drifting toward overrun is flagged while resequencing is still an option rather than after the milestone is missed.",
    },
    {
      name: "Document Intelligence & Contract Automation",
      tag: "Documents",
      body: "Automated parsing of drawings, specifications, RFIs, and contracts, with compliance checks that accelerate review across the document volume a large project generates.",
    },
    {
      name: "Property Visualisation & Lifecycle Intelligence",
      tag: "Sales",
      body: "Virtual property visualisation with CRM-integrated lead scoring and predictive lifecycle tracking, for developers whose sales cycle runs alongside the build rather than after it.",
    },
  ],
};

export const constructionBenefits: CardGridContent = {
  eyebrow: "Benefits",
  title: "What Construction AI Changes",
  body: "Gains measured against the four things every project is judged on — programme, cost, safety record, and rework.",
  items: [
    {
      name: "Programmes That Hold",
      icon: "gauge",
      body: "Automated scheduling and delay forecasting surface slippage early enough to resequence, which is the difference between an adjusted programme and a contractual claim.",
    },
    {
      name: "Fewer Incidents on Site",
      icon: "shield",
      body: "Continuous hazard and compliance monitoring covers the hours between inspections, which is when most unsafe conditions actually develop.",
    },
    {
      name: "Less Material Waste",
      icon: "coins",
      body: "Demand-matched procurement and resource planning reduce both over-ordering and the expediting costs that follow under-ordering, on a cost line where small percentages are large sums.",
    },
    {
      name: "Less Rework",
      icon: "book",
      body: "Design simulation and clash detection catch conflicts before they are built, where correction costs a drawing revision rather than a demolition.",
    },
    {
      name: "Equipment That Stays Available",
      icon: "globe",
      body: "Predictive maintenance on plant converts breakdowns that stop a critical-path activity into servicing scheduled around it.",
    },
  ],
};

export const constructionSegments: CardGridContent = {
  eyebrow: "Where AI Applies",
  title: "How AI Is Changing Construction",
  body: "Six areas where contractors and developers are deploying AI, ordered roughly by how readily each fits existing site practice.",
  items: [
    {
      name: "Project Scheduling & Delay Forecasting",
      body: "Programme modelling that learns from completed projects to predict where the current one will slip, and how a resequence would propagate.",
    },
    {
      name: "Site Safety & Risk Detection",
      body: "Vision-based monitoring for hazards, exclusion-zone breaches, and PPE compliance, running continuously across the working day.",
    },
    {
      name: "Automated Progress Tracking",
      body: "Site imagery and survey data compared against the model and the programme, replacing progress estimates with measured completion.",
    },
    {
      name: "Predictive Maintenance & Plant Monitoring",
      body: "Telemetry from plant and equipment analysed for failure signatures, so servicing is planned around the critical path rather than dictated by it.",
    },
    {
      name: "Smart Resource Allocation",
      body: "Labour, plant, and material distributed across a portfolio by modelled need rather than by the standing allocation each site negotiated.",
    },
    {
      name: "Quality Control & Defect Detection",
      body: "Automated inspection of work in place against specification, catching defects at the stage where correction is still inexpensive.",
    },
  ],
};

export const constructionMidCta: CtaBandContent = {
  eyebrow: "Talk It Through",
  title: "Not Sure Whether to Start With Safety or Scheduling?",
  body: "Safety monitoring is faster to deploy and easier to justify; scheduling forecasts move more money. A short conversation about your recent projects will indicate which fits your data today.",
  cta: { label: "Book a free consultation", href: "#enquiry" },
};

export const constructionFaqs: FaqContent = {
  eyebrow: "FAQs",
  title: "FAQs About AI in Construction",
  body: "Common questions from contractors, developers, and construction technology leaders evaluating AI for project delivery.",
  items: [
    {
      q: "Can AI integrate with our existing ERP and project management tools?",
      a: "Yes. We integrate with ERP, project management, and BIM tooling through APIs and connectors, so forecasts and alerts appear in the systems your commercial and delivery teams already work in. Replacing a construction ERP to add analytics is almost never justified, and the integration is rarely the hard part — data consistency across projects usually is.",
    },
    {
      q: "What if most of our site data is on paper or in photographs?",
      a: "That is the normal starting position, and it shapes the sequence rather than preventing the project. Document AI and computer vision extract a great deal from drawings, dockets, and site imagery, and where a genuine gap exists we would rather introduce a light capture step than train a model on data that does not represent the site. We assess this explicitly before design, because discovering it later is what derails these projects.",
    },
    {
      q: "How accurate is AI delay and cost forecasting?",
      a: "Accuracy depends almost entirely on how many comparable completed projects you can train on and how consistently they were recorded. A contractor with years of well-structured project history in a consistent sector gets useful forecasts; one with a handful of very different projects gets a model that mostly reflects its own uncertainty. We validate against your completed projects first and will say if the data does not support it.",
    },
    {
      q: "How does AI improve site safety in practice?",
      a: "Computer vision over existing site cameras detects PPE non-compliance, exclusion-zone breaches, and unsafe working at height continuously rather than during inspections. The value is coverage: a safety officer sees a fraction of the working day, and most unsafe conditions develop in the rest of it. Alerts go to a supervisor for judgement rather than triggering automatic action.",
    },
    {
      q: "Can AI help with predictive maintenance on plant and equipment?",
      a: "Yes, where the plant emits telemetry or can be retrofitted to. Models identify the patterns that precede failure, allowing servicing to be scheduled around the critical path instead of interrupting it. For older plant without instrumentation, usage-hours-based modelling is a cruder but still useful substitute.",
    },
    {
      q: "Do you modernise existing systems or only build new ones?",
      a: "Both, and modernising is more common. Most construction businesses already run an ERP, a project management tool, and some BIM capability; the gap is usually that these systems record what happened rather than predict what will. Adding a predictive layer over existing systems is faster and far less disruptive than replacing tooling mid-programme.",
    },
    {
      q: "How do you handle data privacy and site imagery?",
      a: "Site imagery containing workers is personal data under GDPR and equivalent regimes, so safety monitoring is built with that as a design constraint — processing minimised, retention limited, and identification avoided where the safety use case does not require it. Commercial project data is handled under Soft Suave's ISO/IEC 27001:2022-certified management system, with deployment inside your environment where contracts require it.",
    },
    {
      q: "Can smaller contractors benefit, or is this only for large projects?",
      a: "Safety monitoring and document automation work at any size, because they operate on a single site's data rather than on portfolio history. Delay and cost forecasting is the one that genuinely needs volume — with few completed projects to learn from, a model has little to generalise from, and we would recommend starting elsewhere rather than building something your history cannot support.",
      link: {
        label: "Book a free consultation",
        href: "https://www.softsuave.com/30-min-free-consultation",
        tail: "and we will scope it against your project data.",
      },
    },
  ],
};
