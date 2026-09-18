/**
 * Copy for the "AI in Logistics" landing page (`/ai-in-logistics`).
 *
 * Follows the live softsuave.com page: its H1, its five solution cards, its six
 * "where AI revolutionises logistics" areas, its six benefits and its FAQ set
 * are all carried over. The live page ships no process section, so this page
 * has none either — an earlier draft added one and it was removed.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { FaqContent } from "@/components/landing/faq";
import { industryHeroBadges, industryEnquiryForm, NDA_NOTE } from "./industry-shared";

export const logisticsMeta = {
  slug: "ai-in-logistics",
  path: "/ai-in-logistics",
  title: "AI in Logistics & Supply Chain",
  description:
    "Custom logistics AI from Soft Suave — route and delivery optimisation, freight cost control, predictive tracking, warehouse automation and demand forecasting.",
} as const;

export const logisticsHero: HeroContent = {
  eyebrow: "Logistics",
  titleLines: ["AI in Logistics:", "Transforming Supply Chain Efficiency"],
  body: [
    "Optimise routes, predict demand, and see where every shipment actually is. We build logistics AI that integrates with the WMS, TMS, and ERP systems already running your operation, rather than asking you to replace them.",
    "This is a sector where the returns are unusually easy to verify: fuel, miles, dwell time, on-time delivery, and stock cover are all measured already, so an optimisation either shows up in them or it does not.",
  ],
  points: [
    "Route, load and delivery optimisation",
    "Freight audit and cost control",
    "Real-time tracking with predictive alerts",
    "Demand forecasting and inventory balance",
    "Integrates with WMS, TMS, ERP and fleet systems",
  ],
  badges: industryHeroBadges,
  form: industryEnquiryForm({
    title: "Plan your logistics AI build",
    note: NDA_NOTE,
    requirementLabel: "What should the system do?",
    requirementPlaceholder:
      "The operational problem you want solved, your fleet or network size, the WMS/TMS/ERP systems in use, and the volumes involved.",
    subject: "Logistics AI solutions enquiry",
  }),
  image: {
    src: "/images/four/ind-logistics-hero.webp",
    width: 1200,
    height: 860,
    alt: "Warehouse and freight operations coordinated through AI-driven logistics systems",
  },
};

export const logisticsOverview: OverviewContent = {
  eyebrow: "The Short Answer",
  title: "What AI Changes in Supply Chain Operations",
  paragraphs: [
    "Logistics is a sequence of decisions made under uncertainty — how much stock to hold, which vehicle takes which drop, when a part will fail, whether a shipment will arrive. Each one is currently made on experience and a spreadsheet, and each one is a place where a model that has seen every previous instance does measurably better.",
    "Routing and forecasting are where this starts, because both are well-defined optimisation problems with clean feedback: you find out whether the route was good and whether the forecast was right. That makes them straightforward to prove and straightforward to improve.",
    "The harder and more valuable change is visibility. Most supply chain failures are not surprises so much as things nobody saw in time — a delayed inbound, a vehicle about to fail, a line about to stock out. Predictive monitoring turns those from incidents into decisions taken a day earlier, which is usually the difference between a cost and a crisis.",
  ],
  pullQuote:
    "Most supply chain failures were visible in the data before they were visible in the operation. The gap between those two moments is the whole opportunity.",
};

export const logisticsServices: ServicesContent = {
  eyebrow: "What We Build",
  title: "Logistics AI Solutions Soft Suave Delivers",
  body: "Five solution areas spanning freight, fleet, warehouse, and documentation — the four places where logistics cost and logistics delay actually accumulate.",
  items: [
    {
      name: "AI-Powered Freight & Cost Optimisation",
      tag: "Cost",
      body: "Automated freight audit, load optimisation, and cost control that catch billing errors and under-filled vehicles — the two leaks that are largest in aggregate and least visible on any single invoice.",
    },
    {
      name: "Intelligent Route & Delivery Optimisation",
      tag: "Routing",
      body: "Route planning that accounts for traffic patterns, time windows, vehicle constraints, and driver hours, cutting fuel and miles while improving the on-time performance that last-mile customers judge you on.",
    },
    {
      name: "AI-Driven Tracking & Monitoring",
      tag: "Visibility",
      body: "Real-time shipment visibility with predictive alerts that flag a delay before it breaches a commitment, plus incident analytics that identify the lanes and handoffs where problems repeat.",
    },
    {
      name: "Smart Document & Data Management",
      tag: "Documents",
      body: "Automated extraction and validation across bills of lading, customs paperwork, and proof of delivery, turning a document flow that currently moves by rekeying into structured data your systems can act on.",
    },
    {
      name: "Fleet Management & Predictive Maintenance",
      tag: "Fleet",
      body: "Vehicle telemetry analysed for early signs of failure, so maintenance happens on a planned stop rather than a roadside one, alongside utilisation and yard management that reduce idle assets.",
    },
  ],
};

export const logisticsBenefits: CardGridContent = {
  eyebrow: "Benefits",
  title: "What Logistics AI Changes",
  body: "Gains that show up in fuel, miles, dwell time, stock cover, and on-time delivery — all numbers an operation already reports weekly.",
  items: [
    {
      name: "Lower Cost Per Delivery",
      icon: "coins",
      body: "Better routing and load consolidation cut fuel and mileage on the same volume, which is the most direct cost reduction available in any transport operation.",
    },
    {
      name: "Supply Chain You Can See",
      icon: "globe",
      body: "Real-time tracking and predictive alerts replace status-by-phone-call with a live position, so exceptions are managed while there is still time to act on them.",
    },
    {
      name: "Inventory Matched to Demand",
      icon: "book",
      body: "Forecasting that reads seasonality and trend rather than trailing averages reduces both stockouts and the working capital tied up in cover that was never needed.",
    },
    {
      name: "Warehouse Throughput",
      icon: "gauge",
      body: "Intelligent picking sequences, slotting, and task allocation raise throughput on the same footprint and headcount, which defers the capital cost of more space.",
    },
    {
      name: "Fewer Unplanned Failures",
      icon: "shield",
      body: "Predictive maintenance converts roadside breakdowns and unplanned downtime into scheduled work, protecting both service levels and asset life.",
    },
  ],
};

export const logisticsSegments: CardGridContent = {
  eyebrow: "Where AI Applies",
  title: "How AI Is Changing Logistics",
  body: "Six areas where logistics operators are deploying AI, from the well-established to the more recent.",
  items: [
    {
      name: "Predictive Demand Forecasting",
      body: "Anticipating volume by lane, site, and season so capacity and stock are positioned before demand arrives rather than after it is missed.",
    },
    {
      name: "Route Optimisation & Fleet Management",
      body: "Planning that respects real constraints — windows, capacities, driver hours, traffic — and replans when the day departs from the plan, as it does.",
    },
    {
      name: "Warehouse Automation & Robotics",
      body: "Picking, sorting, and slotting driven by models rather than fixed layouts, raising throughput without proportional headcount.",
    },
    {
      name: "Risk Management & Disruption Response",
      body: "Identifying exposure across suppliers, lanes, and carriers, and modelling the impact of a disruption before deciding how to reroute around it.",
    },
    {
      name: "Real-Time Shipment Tracking",
      body: "Live position and predicted arrival across a multi-carrier network, including the legs where a partner's visibility ends and yours has to infer.",
    },
    {
      name: "Fraud Detection & Cargo Security",
      body: "Anomaly detection across billing, routing, and handling that surfaces both freight invoice fraud and the deviations that precede cargo loss.",
    },
  ],
};

export const logisticsMidCta: CtaBandContent = {
  eyebrow: "Talk It Through",
  title: "Not Sure Whether Routing or Forecasting Comes First?",
  body: "It depends on whether your cost problem is in the vehicles or in the warehouse. A short conversation about where your margin is going will usually settle it.",
  cta: { label: "Book a free consultation", href: "#enquiry" },
};

export const logisticsFaqs: FaqContent = {
  eyebrow: "FAQs",
  title: "FAQs About AI in Logistics",
  body: "Common questions from operations, supply chain, and technology leaders evaluating AI for a logistics network.",
  items: [
    {
      q: "Can AI logistics software integrate with our existing WMS, TMS, ERP or fleet systems?",
      a: "Yes, and it has to — replacing an operational system to add optimisation is almost never justified. We integrate through APIs and, where a system is older, through file or database-level connectors. The practical constraint is usually not the interface but the data quality behind it, which is why systems assessment comes before design.",
    },
    {
      q: "How much can AI realistically reduce logistics costs?",
      a: "It depends entirely on how much slack is in the current operation. A network already running sophisticated route planning has less headroom than one planning manually, and a fleet with disciplined maintenance gains less from prediction than one running to failure. Rather than quote a percentage, we size the specific opportunity against your own historical data during discovery, because a generic figure tells you nothing about your operation.",
    },
    {
      q: "How does predictive analytics improve delivery planning?",
      a: "By turning planning from reactive into anticipatory. Forecasting expected volume by lane and day lets capacity be committed early at better rates; predicting traffic and dwell patterns produces routes that survive contact with the actual day; and flagging shipments likely to miss a window allows intervention while the options are still cheap. The gain is mostly in decisions made earlier rather than decisions made better.",
    },
    {
      q: "Can AI improve warehouse picking accuracy and throughput?",
      a: "Yes. Models optimise pick sequences and slotting so high-velocity items sit where they minimise travel, and task allocation responds to live workload rather than a fixed assignment. Where robotics are in place, models coordinate them; where they are not, the gains come from better sequencing alone, which needs no capital spend and is usually the right first step.",
    },
    {
      q: "What technologies do you use for logistics AI?",
      a: "Machine learning for forecasting and predictive maintenance, mathematical optimisation for routing and load planning — which is a different discipline from ML and frequently confused with it — computer vision for scanning, damage detection, and yard monitoring, and NLP for document extraction. Most real deployments combine several, because a routing problem is an optimisation problem with ML-estimated inputs.",
    },
    {
      q: "How do you handle data privacy and security in logistics AI?",
      a: "Commercial data — rates, volumes, customer addresses — is treated as confidential and handled under GDPR where personal data is involved, which includes driver telematics. Encryption, role-based access, and audit logging are standard, and delivery runs under Soft Suave's ISO/IEC 27001:2022-certified management system. Where carrier or customer contracts restrict data movement, we deploy inside your environment.",
    },
    {
      q: "Does this work for a smaller fleet, or only at network scale?",
      a: "Route optimisation and predictive maintenance both work at modest fleet sizes, because the gains come from better decisions per vehicle rather than from statistical scale. Demand forecasting is the one that genuinely needs volume — with sparse history a model has little to learn from, and a simpler method is often the honest recommendation.",
    },
    {
      q: "How long does a logistics AI project take?",
      a: "The modelling is usually not the constraint; data access and integration are. A network with well-maintained telematics and a modern TMS moves quickly, while one where operational history sits across several systems with inconsistent identifiers spends most of the effort before modelling starts. We size that explicitly in discovery so the timeline reflects your estate.",
      link: {
        label: "Book a free consultation",
        href: "https://www.softsuave.com/30-min-free-consultation",
        tail: "and we will scope it against your network.",
      },
    },
  ],
};
