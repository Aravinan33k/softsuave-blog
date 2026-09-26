/**
 * Copy for the "FinTech AI Solutions" landing page (`/fintech-ai-solutions`).
 *
 * Shapes match the prop types exported by `components/landing/*`, so each
 * section is `<Component content={…} />` with no adapter.
 *
 * Content follows the live softsuave.com page: its H1, its ten solution cards,
 * its sub-sector list, its benefits and its FAQs are all carried over. Two
 * deliberate departures:
 *
 * - The live page's eleven process steps collapse to six. Several of the eleven
 *   describe the same phase from different angles ("Defining Objectives and
 *   Requirements" and "Solution Design and Development" both sit inside
 *   scoping), and a landing page listing eleven near-identical steps reads as
 *   padding rather than method.
 * - The live page's one-line card copy is expanded into the fuller, more
 *   specific voice the delivery pages use. No new capability, metric or
 *   certification is claimed — only what the live page already states.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { ProcessContent } from "@/components/landing/process";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { FaqContent } from "@/components/landing/faq";
import { industryHeroBadges, industryEnquiryForm, NDA_NOTE } from "./industry-shared";
import { overviewImage } from "./overview-images";

export const fintechMeta = {
  slug: "fintech-ai-solutions",
  path: "/fintech-ai-solutions",
  title: "Fintech AI Development Services",
  description:
    "Custom fintech AI from Soft Suave — credit risk and underwriting models, real-time fraud detection, conversational banking assistants and RegTech automation.",
} as const;

export const fintechHero: HeroContent = {
  titleLines: ["Fintech AI Development Services", "to Power Digital Innovation"],
  body: [
    "Unlock smarter financial products through AI that works on your own data. We build credit scoring, fraud detection, and customer-facing assistants that run inside your existing core banking, payments, and compliance stack rather than alongside it.",
    "Every model ships with the monitoring, audit trail, and regulatory reporting a financial institution has to be able to show — because in this sector an accurate model you cannot evidence is not a shippable model.",
  ],
  points: [
    "Credit risk, underwriting and fraud models",
    "Real-time transaction monitoring",
    "RegTech and compliance automation",
    "Integrates with core banking via API",
    "ISO/IEC 27001:2022 certified delivery",
  ],
  badges: industryHeroBadges,
  form: industryEnquiryForm({
    title: "Plan your FinTech AI build",
    note: NDA_NOTE,
    requirementLabel: "What should the system do?",
    requirementPlaceholder:
      "The decision or workflow you want to automate, the core systems it has to talk to, your data volumes, and the regulations you operate under.",
    subject: "FinTech AI solutions enquiry",
  }),
  image: {
    src: "/images/four/ind-fintech-hero.webp",
    width: 1200,
    height: 860,
    alt: "Financial analysts reviewing AI-driven risk and transaction data on trading screens",
  },
};

export const fintechOverview: OverviewContent = {
  image: overviewImage("fintech-ai-solutions"),
  eyebrow: "The Short Answer",
  title: "What AI Actually Changes in Financial Services",
  paragraphs: [
    "Most financial institutions already hold the data that would make their decisions better — years of transactions, applications, repayments, and support conversations. What they lack is a way to act on it at the speed a customer expects, inside systems designed to be correct rather than fast.",
    "AI in fintech is the layer that closes that gap: scoring an application in seconds instead of days, flagging a fraudulent transaction while it is still authorising, and answering a customer at midnight without a queue. None of that requires replacing the core — it requires models that read from it and write decisions back into it.",
    "The constraint that shapes every build here is evidence. A credit decision has to be explainable to a regulator, a fraud block has to be reviewable by an analyst, and a model that drifts has to be caught before it reaches a customer. We build for that from the first sprint rather than retrofitting it before an audit.",
  ],
  pullQuote:
    "In financial services, a model you cannot explain is a model you cannot deploy. Accuracy is the easy half.",
};

export const fintechServices: ServicesContent = {
  eyebrow: "What We Build",
  title: "Fintech AI Solutions Soft Suave Delivers",
  body: "Ten solution areas across lending, payments, markets and compliance. They are listed separately because most engagements start with one, prove it against a measured baseline, and extend from there.",
  items: [
    {
      name: "Intelligent Credit Risk & Underwriting",
      tag: "Risk",
      body: "AI-driven credit scoring and underwriting that accelerate approvals while reducing defaults, carrying the feature-level explanations an adverse-action notice and a model risk review both require.",
    },
    {
      name: "Real-Time Fraud Detection & Transaction Monitoring",
      tag: "Fraud",
      body: "Score every transaction as it authorises and flag anomalies against behavioural baselines rather than static rules, with analyst review queues built in so a false positive is a minor delay rather than a lost customer.",
    },
    {
      name: "Conversational AI & Virtual Financial Assistants",
      tag: "Service",
      body: "Assistants that answer balance, transaction, and product questions around the clock, escalate cleanly when confidence drops, and stay inside the disclosure rules governing what an institution may tell a customer without a human.",
    },
    {
      name: "Personalised Product Recommendation",
      tag: "Growth",
      body: "Analyse behaviour, life stage, and stated goals to recommend products a customer is actually eligible for, improving conversion without the mis-selling exposure that comes from recommending on margin alone.",
    },
    {
      name: "Algorithmic Trading & Portfolio Optimisation",
      tag: "Markets",
      body: "Strategies that react to market movement within your risk mandate, with position limits, kill switches, and backtest-to-live consistency checks treated as part of the system rather than as policy around it.",
    },
    {
      name: "Big Data Analytics & Financial Dashboards",
      tag: "Analytics",
      body: "Turn transaction, ledger, and customer data into dashboards your finance and risk teams act on directly, with the lineage to trace any figure back to the records that produced it.",
    },
    {
      name: "AI-Powered Compliance Automation (RegTech)",
      tag: "RegTech",
      body: "Automate transaction monitoring, suspicious-activity reporting, and KYC refresh cycles, with rule changes versioned so you can show a regulator what the system checked and from when.",
    },
    {
      name: "Intelligent Process Automation",
      tag: "Automation",
      body: "Combine RPA with document AI to clear the paperwork-heavy middle office — statements, mandates, claims, onboarding packs — extracting and validating data that currently moves by rekeying.",
    },
    {
      name: "Predictive Risk & Stress Testing",
      tag: "Modelling",
      body: "Simulate portfolio behaviour under scenarios you define, forecast concentration and liquidity risk, and stress-test against conditions that have not occurred yet but plausibly could.",
    },
    {
      name: "Embedded Finance & Smart Payments",
      tag: "Payments",
      body: "Put secure payment and lending journeys inside someone else's product, with the routing, risk checks, and reconciliation that make an embedded flow behave like a first-party one.",
    },
  ],
};

export const fintechBenefits: CardGridContent = {
  eyebrow: "Benefits",
  title: "What Fintech AI Changes for the Business",
  body: "The gains that show up on a P&L rather than in a model scorecard — faster decisions, fewer losses, and a cost base that stops scaling linearly with volume.",
  items: [
    {
      name: "Faster, Better-Evidenced Decisions",
      icon: "gauge",
      body: "Applications that took days of manual review clear in seconds, and every decision carries the feature attribution needed to defend it to a customer, an auditor, or a regulator.",
    },
    {
      name: "Lower Fraud Losses",
      icon: "shield",
      body: "Behavioural monitoring catches account takeover and payment fraud that static rules miss, while review queues stop false positives turning into abandoned transactions.",
    },
    {
      name: "Operating Cost That Stops Tracking Volume",
      icon: "coins",
      body: "Automating document handling, monitoring, and tier-one support breaks the link between transaction growth and headcount growth across the middle and back office.",
    },
    {
      name: "Compliance as a Running System",
      icon: "book",
      body: "Monitoring, reporting, and audit trails run continuously rather than being assembled ahead of an examination, which shortens both the preparation and the findings list.",
    },
    {
      name: "Products That Adapt to the Customer",
      icon: "users",
      body: "Recommendations and servicing that respond to actual behaviour rather than segment averages, raising conversion and retention without adding advisory headcount.",
    },
  ],
};

export const fintechSegments: CardGridContent = {
  eyebrow: "Who We Build For",
  title: "Financial Sectors We Develop AI Solutions For",
  body: "The regulatory surface and the available data differ sharply across these, so the approach does too — a lender's model risk problem is not a payment processor's latency problem.",
  items: [
    {
      name: "Commercial Banks & Credit Unions",
      body: "Core-integrated scoring, monitoring, and servicing AI that has to coexist with systems of record measured in decades rather than release cycles.",
    },
    {
      name: "Insurance Companies & Brokers",
      body: "Underwriting support, claims triage, and fraud detection across document-heavy workflows where most of the signal sits in unstructured text.",
    },
    {
      name: "Neobanks & Digital-First Banks",
      body: "Onboarding, KYC, and support automation for institutions whose cost advantage depends on never building a branch-scale operations team.",
    },
    {
      name: "Capital Markets & Investment Management",
      body: "Signal research, portfolio optimisation, and trade surveillance, with the backtest discipline and audit trail a regulated trading operation is examined on.",
    },
    {
      name: "Payment Processors",
      body: "Real-time authorisation scoring and reconciliation at volumes where a few milliseconds of added latency is a commercial problem, not just a technical one.",
    },
    {
      name: "Lending & Mortgage Institutions",
      body: "Document extraction, affordability assessment, and portfolio risk modelling across origination journeys that still run largely on PDFs.",
    },
    {
      name: "P2P Lending & Crowdfunding",
      body: "Borrower scoring and platform-level risk management for marketplaces carrying counterparty risk without a traditional balance sheet.",
    },
    {
      name: "Crypto & Blockchain Platforms",
      body: "On-chain analytics, transaction monitoring, and compliance tooling for platforms operating under rules that are still being written.",
    },
  ],
};

export const fintechProcess: ProcessContent = {
  eyebrow: "How We Deliver",
  title: "Our Fintech AI Development Process",
  body: "Six stages, each ending in something you can evaluate — a scoped problem, a measured model, a passed security review — so you are never waiting until the end to find out whether it works.",
  steps: [
    {
      n: "01",
      image: {
        src: "/images/four/fintech-step-1.webp",
        width: 1200,
        height: 900,
        alt: "Discovery and Use-Case Definition in a fintech AI project",
      },
      name: "Discovery & Use-Case Definition",
      body: "We work out which decision is actually being made, who makes it today, what it costs when it is wrong, and what a good outcome would be worth. Use cases that cannot answer those four questions do not proceed to build.",
    },
    {
      n: "02",
      image: {
        src: "/images/four/fintech-step-2.webp",
        width: 1200,
        height: 900,
        alt: "Data Assessment and Preparation in a fintech AI project",
      },
      name: "Data Assessment & Preparation",
      body: "We audit what data exists, how it is labelled, where it is held, and what may lawfully be used for modelling, then build the pipelines that make it trainable. This is routinely the longest stage, and pretending otherwise is how fintech AI projects fail.",
    },
    {
      n: "03",
      image: {
        src: "/images/four/fintech-step-3.webp",
        width: 1200,
        height: 900,
        alt: "Model Development and Training in a fintech AI project",
      },
      name: "Model Development & Training",
      body: "We build and tune models against a held-out set defined before training starts, testing for accuracy and for disparate impact across protected characteristics — which in lending is a legal requirement rather than a refinement.",
    },
    {
      n: "04",
      image: {
        src: "/images/four/fintech-step-4.webp",
        width: 1200,
        height: 900,
        alt: "Validation and Explainability in a fintech AI project",
      },
      name: "Validation & Explainability",
      body: "Independent evaluation against the benchmark agreed in discovery, plus the feature-attribution layer that lets an analyst see why a decision came out as it did. A model that passes accuracy but fails explainability does not ship.",
    },
    {
      n: "05",
      image: {
        src: "/images/four/fintech-step-5.webp",
        width: 1200,
        height: 900,
        alt: "Integration and Secure Deployment in a fintech AI project",
      },
      name: "Integration & Secure Deployment",
      body: "We wire the model into your core systems through APIs, deploy inside your security boundary, and put in place the access control, encryption, and logging an ISO 27001-certified delivery process requires.",
    },
    {
      n: "06",
      image: {
        src: "/images/four/fintech-step-6.webp",
        width: 1200,
        height: 900,
        alt: "Monitoring and Continuous Improvement in a fintech AI project",
      },
      name: "Monitoring & Continuous Improvement",
      body: "Live monitoring for accuracy, latency, and drift, with alerting when a model's behaviour moves away from its validated baseline — and a retraining path ready before that happens rather than after.",
    },
  ],
};

export const fintechMidCta: CtaBandContent = {
  eyebrow: "Talk It Through",
  title: "Not Sure Which Fintech AI Use Case to Start With?",
  body: "The right first build is usually the decision you make most often and trust least. A short conversation will narrow it to one, with a view on the data you would need to support it.",
  cta: { label: "Book a free consultation", href: "#enquiry" },
};

export const fintechFaqs: FaqContent = {
  eyebrow: "FAQs",
  title: "FAQs About AI in Fintech",
  body: "Common questions from product, risk, and engineering leaders evaluating AI for a regulated financial product.",
  items: [
    {
      q: "How do you ensure compliance with GDPR, PCI-DSS, and local financial regulation?",
      a: "Compliance is designed into the build rather than reviewed at the end: data minimisation and lawful-basis decisions taken before training, cardholder data kept out of model features entirely where PCI-DSS scope would otherwise expand, retention and deletion implemented as running jobs rather than policies, and an audit trail of what the system checked and when. Jurisdiction-specific obligations — data residency, local reporting formats, sector rules — are scoped during discovery, because they change the architecture rather than the paperwork.",
    },
    {
      q: "Can AI solutions integrate with our existing core banking platform?",
      a: "Yes, and this is the normal case rather than the exception. Models are deployed as services your core calls through APIs, with middleware handling translation where the core speaks an older protocol. We do not require a core replacement, because the institutions most likely to benefit from AI scoring are precisely the ones least able to replace a system of record mid-programme.",
    },
    {
      q: "How does AI improve fraud detection compared with a rules engine?",
      a: "A rules engine catches the fraud you have already seen and written a rule for. A model scores each transaction against the behavioural baseline for that customer, device, and merchant, so novel patterns surface as anomalies before anyone has characterised them. In practice the two run together: rules handle known-bad cases deterministically, and the model covers the space rules cannot enumerate.",
    },
    {
      q: "What programming languages and frameworks do you use?",
      a: "Python for modelling, with PyTorch and scikit-learn depending on whether the problem is deep-learning-shaped or tabular — and in fintech it is usually tabular, where gradient boosting still outperforms. Serving is typically FastAPI. Where the surrounding estate is Java or .NET, models are served over APIs rather than rewritten, so the language of your core does not constrain the language of the model.",
    },
    {
      q: "How do you handle model explainability for regulators?",
      a: "Every decision the system issues carries feature-level attribution showing which inputs drove it and in which direction, retained alongside the decision itself. For credit decisions that is what an adverse-action notice is built from; for model risk review it is what lets a validator reproduce the reasoning. Where a use case cannot tolerate a black box at all, we use inherently interpretable model classes rather than post-hoc explanations.",
    },
    {
      q: "How do you prevent bias in credit and underwriting models?",
      a: "Protected characteristics are excluded as features and — more importantly — proxies for them are tested for, because a postcode can encode ethnicity as effectively as a direct field. We measure outcome disparity across groups on a held-out set before deployment and monitor it in production, since a model can pass a fairness test at launch and drift past it as the applicant population changes.",
    },
    {
      q: "What does a fintech AI project cost, and how long does it take?",
      a: "Both depend far more on your data than on the model. An institution with clean, labelled, accessible history reaches a validated model quickly; one whose data sits across several systems with inconsistent definitions spends most of the effort before modelling starts. Rather than quote a standard figure, we size the data work explicitly during discovery so the estimate reflects your actual starting position.",
      link: {
        label: "Book a free consultation",
        href: "https://www.softsuave.com/30-min-free-consultation",
        tail: "and we will scope it against your systems.",
      },
    },
    {
      q: "How do you keep our financial data secure during development?",
      a: "Soft Suave operates an ISO/IEC 27001:2022-certified information security management system, and fintech engagements inherit it: access control, device management, and offboarding are governed processes with audit trails. Where production data cannot leave your environment, we develop against synthetic or masked data and train inside your boundary — the default for most regulated engagements rather than an exception made on request.",
    },
  ],
};
