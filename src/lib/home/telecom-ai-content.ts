/**
 * Copy for the "AI Solutions for Telecom" landing page
 * (`/ai-solutions-for-telecom`).
 *
 * Follows the live softsuave.com page: its H1, its five solution cards, its six
 * "significant AI uses in telecom" areas, its six benefits and its FAQ set are
 * all carried over. The live page ships no process section, so this page has
 * none either — an earlier draft added one and it was removed.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { FaqContent } from "@/components/landing/faq";
import { industryHeroBadges, industryEnquiryForm, NDA_NOTE } from "./industry-shared";
import { overviewImage } from "./overview-images";

export const telecomMeta = {
  slug: "ai-solutions-for-telecom",
  path: "/ai-solutions-for-telecom",
  title: "AI Solutions for Telecom",
  description:
    "Custom telecom AI from Soft Suave — network optimisation, predictive maintenance, fault detection, revenue assurance and AI-powered customer support.",
} as const;

export const telecomHero: HeroContent = {
  titleLines: ["Enhancing Telecom Efficiency", "with AI"],
  body: [
    "From network optimisation and predictive maintenance to fraud detection and customer service, we build AI that keeps a telecom operation running closer to its capacity and further from its failure modes.",
    "Telecom generates more operational telemetry than almost any other sector. The constraint has never been data — it is having systems that act on it inside the window where acting still prevents the outage.",
  ],
  points: [
    "Network optimisation and traffic management",
    "Predictive maintenance on infrastructure",
    "Automated fault detection and resolution",
    "Fraud detection and revenue assurance",
    "AI-powered customer support and personalisation",
  ],
  badges: industryHeroBadges,
  form: industryEnquiryForm({
    title: "Plan your telecom AI build",
    note: NDA_NOTE,
    requirementLabel: "What should the system do?",
    requirementPlaceholder:
      "The network or customer problem you want solved, your OSS/BSS and network management systems, subscriber scale, and the data you already collect.",
    subject: "Telecom AI solutions enquiry",
  }),
  image: {
    src: "/images/four/ind-telecom-hero.webp",
    width: 1200,
    height: 860,
    alt: "Telecom network operations centre monitoring infrastructure with AI-driven analytics",
  },
};

export const telecomOverview: OverviewContent = {
  image: overviewImage("ai-solutions-for-telecom"),
  eyebrow: "The Short Answer",
  title: "What AI Changes for a Network Operator",
  paragraphs: [
    "A telecom network already emits everything needed to predict its own failures — performance counters, alarms, traffic patterns, equipment telemetry. What operators have historically lacked is a way to separate the signals that precede an outage from the thousands that precede nothing at all.",
    "That is the core application: moving from alarms that report a fault to models that anticipate one. A base station degrading over days looks like noise in a dashboard and looks like a pattern to a model trained on every previous degradation, and the difference between those two readings is a planned intervention rather than an outage.",
    "The second application is commercial rather than technical. Churn, fraud, and revenue leakage are all detectable in usage data well before they show up in a monthly report, and all three respond to being caught early — which makes them unusually good candidates for models operating on data the network already produces.",
  ],
  pullQuote:
    "The network has been telling you it was about to fail. The question has only ever been whether anything was listening at the right resolution.",
};

export const telecomServices: ServicesContent = {
  eyebrow: "What We Build",
  title: "Telecom AI Solutions Soft Suave Delivers",
  body: "Five solution areas spanning the network itself, the operations around it, and the customers on it.",
  items: [
    {
      name: "Network Optimisation & Predictive Maintenance",
      tag: "Network",
      body: "Traffic management that allocates capacity where demand is forming, and predictive maintenance that identifies degrading infrastructure while intervention is still a scheduled job rather than an incident.",
    },
    {
      name: "Automated Fault Detection & Resolution",
      tag: "Operations",
      body: "Automated detection, correlation, and where safe, resolution of faults — collapsing the alarm storms that follow a single root cause into one actionable incident rather than a thousand tickets.",
    },
    {
      name: "AI-Powered Customer Support & Personalisation",
      tag: "Service",
      body: "Support that resolves the routine tier-one volume instantly and consistently, with personalisation that tailors plans and offers to actual usage rather than to a segment the customer was assigned years ago.",
    },
    {
      name: "Fraud Detection & Revenue Assurance",
      tag: "Revenue",
      body: "Real-time detection of subscription fraud, SIM-box bypass, and usage anomalies, alongside billing validation that catches the leakage sitting between what was delivered and what was invoiced.",
    },
    {
      name: "Intelligent Automation & Service Efficiency",
      tag: "Automation",
      body: "AI-driven automation across provisioning, billing, and field operations, so the workflows that scale with subscriber count stop requiring headcount that scales with it too.",
    },
  ],
};

export const telecomBenefits: CardGridContent = {
  eyebrow: "Benefits",
  title: "What Telecom AI Changes",
  body: "Gains measured where operators already measure — availability, mean time to repair, churn, ARPU, and revenue leakage.",
  items: [
    {
      name: "Higher Network Availability",
      icon: "globe",
      body: "Predictive maintenance and traffic optimisation reduce both unplanned outages and the congestion that degrades service without ever registering as a fault.",
    },
    {
      name: "Faster Fault Resolution",
      icon: "gauge",
      body: "Automated detection and correlation cut mean time to repair by identifying root cause instead of leaving an engineer to infer it from the symptoms a hundred alarms describe.",
    },
    {
      name: "Protected Revenue",
      icon: "shield",
      body: "Real-time fraud detection and billing validation recover leakage that periodic audits find months later, by which time the traffic is long settled.",
    },
    {
      name: "Lower Cost to Serve",
      icon: "coins",
      body: "Automating tier-one support and routine provisioning breaks the link between subscriber growth and operational headcount, which is where operator margin is won or lost.",
    },
    {
      name: "Reduced Churn",
      icon: "users",
      body: "Usage and experience signals identify subscribers likely to leave while retention still has options, rather than at the point they call to cancel.",
    },
  ],
};

export const telecomSegments: CardGridContent = {
  eyebrow: "Where AI Applies",
  title: "How AI Is Changing Telecom",
  body: "Six areas where operators and service providers are deploying AI against data their networks already produce.",
  items: [
    {
      name: "Intelligent Network Optimisation",
      body: "Capacity and traffic allocation that respond to demand as it forms, improving throughput and latency without additional spectrum or hardware.",
    },
    {
      name: "Proactive Predictive Maintenance",
      body: "Equipment telemetry analysed for the degradation patterns that precede failure, converting outages into planned maintenance windows.",
    },
    {
      name: "Real-Time Fraud Detection",
      body: "Subscription fraud, bypass, and usage anomalies caught as they happen rather than in a reconciliation cycle weeks later.",
    },
    {
      name: "AI-Powered Virtual Assistants",
      body: "Support agents that handle billing, diagnostics, and provisioning queries around the clock, escalating with full context rather than restarting the conversation.",
    },
    {
      name: "Personalised Experience Management",
      body: "Plan, offer, and content recommendations driven by actual usage patterns, improving both take-up and the perception that the operator understands the customer.",
    },
    {
      name: "Revenue Assurance Systems",
      body: "Continuous validation that what was delivered matches what was rated and billed, across interconnect, roaming, and retail streams.",
    },
  ],
};

export const telecomMidCta: CtaBandContent = {
  eyebrow: "Talk It Through",
  title: "Not Sure Whether to Start With the Network or the Customer?",
  body: "Predictive maintenance pays back on availability; churn and fraud models pay back on revenue. A short conversation about where your losses concentrate will point to the first build.",
  cta: { label: "Book a free consultation", href: "#enquiry" },
};

export const telecomFaqs: FaqContent = {
  eyebrow: "FAQs",
  title: "FAQs About AI in Telecom",
  body: "Common questions from network, operations, and product leaders evaluating AI for a telecom estate.",
  items: [
    {
      q: "Do we need to rebuild our platform to add AI, or can it sit on existing systems?",
      a: "It sits on top. Models consume data your OSS/BSS and network management systems already produce and return predictions through APIs, so no core replacement is involved. This is also the only realistic option: a live network cannot be rebuilt to accommodate an analytics layer, and any approach requiring that should be treated with suspicion.",
    },
    {
      q: "What AI models are used for predictive maintenance and fraud detection?",
      a: "Predictive maintenance typically uses time-series and survival models over equipment telemetry, looking for degradation signatures ahead of failure. Fraud detection uses anomaly detection against per-subscriber behavioural baselines, because fraud patterns change faster than any rule set maintained by hand. Customer support uses NLP over interaction history. Most deployments run several models with different update cadences.",
    },
    {
      q: "How does AI reduce network downtime in practice?",
      a: "Two ways. It predicts failures far enough ahead that repair becomes planned work, and it collapses alarm storms into a single identified root cause so engineers spend their time fixing rather than diagnosing. The second effect is frequently the larger one, because mean time to repair in a large network is dominated by locating the fault rather than correcting it.",
    },
    {
      q: "Can AI reduce churn, and how reliable is the prediction?",
      a: "Churn models built on usage, experience, and billing signals reliably identify elevated risk, and the accuracy is usually good enough to prioritise retention spend far better than tenure-based segmentation does. What they cannot do is tell you the customer will definitely leave, so the value comes from ranking who to contact rather than from certainty about any individual.",
    },
    {
      q: "How do you handle subscriber data privacy?",
      a: "Subscriber data is personal data, and usage records are among the more sensitive categories, so processing runs under GDPR or the local equivalent with lawful basis established before modelling. We minimise and pseudonymise wherever the use case allows, keep processing inside your environment where regulation or licence conditions require it, and apply the access control and audit logging expected under an ISO/IEC 27001:2022-certified delivery process.",
    },
    {
      q: "Can smaller operators and MVNOs use AI affordably?",
      a: "Yes, particularly for customer-facing use cases. Support automation, churn prediction, and fraud detection all work at MVNO scale because they operate on subscriber behaviour rather than on network element telemetry. Deep network optimisation is harder without owning the infrastructure that generates the data, so the achievable scope depends on what your operating model actually gives you visibility of.",
    },
    {
      q: "How is telecom AI different from general software development?",
      a: "Scale and consequence. Telemetry arrives at volumes that make naive architectures impossible, and a system acting on a live network can degrade service for a region if it is wrong. That drives the practices described in our process — offline validation against historical incidents, shadow-mode running, and explicit limits on what the system may act on without a human.",
    },
    {
      q: "How long does a telecom AI project take?",
      a: "Data access is usually the long pole rather than modelling. Where telemetry is already centralised at adequate resolution, a predictive maintenance model can be validated relatively quickly; where it is aggregated across several element managers with inconsistent retention, most of the effort goes into making it trainable. We assess that in discovery so the timeline is grounded in your estate rather than a standard figure.",
      link: {
        label: "Book a free consultation",
        href: "https://www.softsuave.com/30-min-free-consultation",
        tail: "and we will scope it against your network.",
      },
    },
  ],
};
