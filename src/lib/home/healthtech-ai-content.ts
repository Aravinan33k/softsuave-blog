/**
 * Copy for the "AI Solutions in HealthTech" landing page
 * (`/ai-solutions-in-healthtech`).
 *
 * Follows the live softsuave.com page: its H1, its five solution cards, its six
 * "where AI changes healthcare" areas, its six benefits and its FAQ set are all
 * carried over.
 *
 * The live page ships no process section, so this page has none either. An
 * earlier draft added one; it was removed to keep the page's sections matched
 * to the live page's.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { FaqContent } from "@/components/landing/faq";
import { industryHeroBadges, industryEnquiryForm, NDA_NOTE } from "./industry-shared";

export const healthtechMeta = {
  slug: "ai-solutions-in-healthtech",
  path: "/ai-solutions-in-healthtech",
  title: "AI Solutions in HealthTech",
  description:
    "Custom HealthTech AI development from Soft Suave — patient intake and risk assessment, clinical analysis and reporting, decision support, and virtual patient assistants, built to HIPAA-aligned data handling and integrated with your EHR.",
} as const;

export const healthtechHero: HeroContent = {
  eyebrow: "HealthTech",
  titleLines: ["AI Solutions Shaping", "The Future of Healthcare"],
  body: [
    "Automate the administrative load, surface what clinicians need at the point of decision, and give patients a way to get answers without waiting for a callback. We build HealthTech AI that works inside your EHR and your existing clinical workflow.",
    "Healthcare is the sector where a wrong answer has the highest cost, so every system we build keeps a clinician in the loop on clinical decisions and carries the data handling that patient information legally requires.",
  ],
  points: [
    "Patient intake and risk assessment",
    "Clinical analysis, imaging and reporting",
    "Decision support and prescription safety",
    "HIPAA-aligned data handling",
    "Integrates with existing EHR systems",
  ],
  badges: industryHeroBadges,
  form: industryEnquiryForm({
    title: "Plan your HealthTech AI build",
    note: NDA_NOTE,
    requirementLabel: "What should the system do?",
    requirementPlaceholder:
      "The clinical or administrative workflow you want to improve, the EHR and systems it must integrate with, and the regulatory regime you operate under.",
    subject: "HealthTech AI solutions enquiry",
  }),
  image: {
    src: "/images/four/ind-healthtech-hero.webp",
    width: 1200,
    height: 860,
    alt: "Clinical staff reviewing patient data on AI-assisted healthcare monitoring systems",
  },
};

export const healthtechOverview: OverviewContent = {
  eyebrow: "The Short Answer",
  title: "Where AI Earns Its Place in Healthcare",
  paragraphs: [
    "A large share of clinical time goes on work that is not clinical — intake forms, documentation, prior authorisation, discharge paperwork, chasing results. That is the first and least controversial place AI belongs, because automating it returns time to patient care without putting a model anywhere near a diagnosis.",
    "The second place is decision support: surfacing the relevant history, flagging a dangerous drug interaction, or highlighting a finding on an image that warrants a closer look. Here the model's job is to raise something for a clinician to judge, not to judge it — a distinction that governs how we build and how we evaluate.",
    "Both depend on getting patient data handling right first. Access control, de-identification, audit logging, and lawful basis are not a compliance layer added at the end; they determine what data can be used to train at all, which is why they are settled before any modelling begins.",
  ],
  pullQuote:
    "In healthcare the model raises the question. The clinician still answers it — and the system has to be built so that stays true.",
};

export const healthtechServices: ServicesContent = {
  eyebrow: "What We Build",
  title: "HealthTech AI Solutions Soft Suave Delivers",
  body: "Five solution areas spanning the patient journey, from the first intake form to post-discharge follow-up. Each is built to sit inside your existing clinical systems rather than beside them.",
  items: [
    {
      name: "AI-Powered Patient Intake & Risk Assessment",
      tag: "Intake",
      body: "Streamline intake, aggregate pre-consultation data from across records, and surface health risks early — so the clinician arrives at the appointment with the history already assembled rather than assembling it live.",
    },
    {
      name: "Intelligent Clinical Analysis & Reporting",
      tag: "Diagnostics",
      body: "Analyse medical data, generate structured reports, and process images and documents to support faster diagnosis, with findings presented for clinical confirmation rather than issued as conclusions.",
    },
    {
      name: "Automated Discharge & Virtual Patient Support",
      tag: "Patient Care",
      body: "Automate discharge documentation, manage follow-up scheduling, and give patients an assistant that answers common questions around the clock, escalating anything clinical to a human.",
    },
    {
      name: "Smart Decision Support & Prescription Safety",
      tag: "Safety",
      body: "Real-time support at the point of decision, including interaction and dosage checks that flag prescription errors before they reach a patient — the use case where AI's value is measured in harm avoided.",
    },
    {
      name: "Optimised Staff Scheduling & Resource Management",
      tag: "Operations",
      body: "Workforce planning and resource allocation that respond to actual demand patterns, ward occupancy, and skill mix, rather than to a roster template written for an average week that never occurs.",
    },
  ],
};

export const healthtechBenefits: CardGridContent = {
  eyebrow: "Benefits",
  title: "What HealthTech AI Changes",
  body: "The gains providers report first are rarely diagnostic. They are time returned to clinicians, errors caught earlier, and patients who can get an answer without a queue.",
  items: [
    {
      name: "Clinical Time Returned",
      icon: "gauge",
      body: "Automating intake, documentation, and discharge paperwork reduces the administrative load that currently competes with patient contact for a clinician's day.",
    },
    {
      name: "Earlier, Better-Supported Detection",
      icon: "shield",
      body: "Imaging analysis and predictive models flag findings and at-risk patients earlier, improving the odds on conditions where the outcome depends heavily on when it was caught.",
    },
    {
      name: "Fewer Preventable Errors",
      icon: "book",
      body: "Interaction, dosage, and allergy checks run on every prescription rather than on the ones someone thought to double-check, catching the mistakes that fatigue produces.",
    },
    {
      name: "Patients Who Can Self-Serve",
      icon: "users",
      body: "Virtual assistants handle scheduling, reminders, and routine questions around the clock, which reduces inbound call volume and the missed appointments that follow from unanswered ones.",
    },
    {
      name: "Capacity Matched to Demand",
      icon: "coins",
      body: "Scheduling and resource models reduce both the overtime of an understaffed shift and the cost of an overstaffed one, which is where most operational savings in a provider actually sit.",
    },
  ],
};

export const healthtechSegments: CardGridContent = {
  eyebrow: "Where AI Applies",
  title: "How AI Is Changing Healthcare Delivery",
  body: "Six areas where healthcare organisations are deploying AI today, ordered roughly by how readily each one clears a clinical governance review.",
  items: [
    {
      name: "Automating Administrative Work",
      body: "Intake, coding, prior authorisation, and discharge documentation — the highest-volume, lowest-risk starting point, and the one that returns clinical time fastest.",
    },
    {
      name: "Enhancing Diagnostics",
      body: "Imaging and signal analysis that flags findings for a radiologist or clinician to confirm, improving throughput and consistency on high-volume reads.",
    },
    {
      name: "Predicting and Preventing Deterioration",
      body: "Risk models over vitals, history, and pathology that identify patients likely to deteriorate or readmit, moving intervention earlier in the course.",
    },
    {
      name: "Personalising Treatment Plans",
      body: "Matching therapy to the individual patient's history, comorbidities, and response data rather than to the modal patient a protocol was written for.",
    },
    {
      name: "Accelerating Drug Discovery",
      body: "Candidate screening, target identification, and trial cohort selection, where model-led search narrows an intractably large space to a testable one.",
    },
    {
      name: "Virtual Care & Patient Assistants",
      body: "Round-the-clock triage support, medication reminders, and follow-up that keeps contact with a patient between appointments rather than only at them.",
    },
  ],
};

export const healthtechMidCta: CtaBandContent = {
  eyebrow: "Talk It Through",
  title: "Not Sure Where AI Fits in Your Clinical Workflow?",
  body: "The safest first build is almost always administrative rather than diagnostic. A short conversation will identify which part of your workflow returns the most clinical time for the least governance friction.",
  cta: { label: "Book a free consultation", href: "#enquiry" },
};

export const healthtechFaqs: FaqContent = {
  eyebrow: "FAQs",
  title: "FAQs About AI in HealthTech",
  body: "Common questions from clinical, product, and compliance leaders evaluating AI for a healthcare product or provider organisation.",
  items: [
    {
      q: "How do you ensure HIPAA compliance and patient data privacy?",
      a: "Protected health information is minimised, de-identified wherever the use case allows, and kept inside your security boundary by default. Access is role-controlled and logged, retention and deletion run as scheduled jobs rather than policies, and business associate obligations are agreed before any data moves. Where production data cannot leave your environment at all, we develop against synthetic or de-identified data and train inside your infrastructure.",
    },
    {
      q: "Can AI be integrated into our existing EHR and clinical systems?",
      a: "Yes. Models are deployed as services your EHR calls through its integration interfaces, so findings and automations appear inside the system clinicians already use rather than in a separate tool they would have to remember to open. A separate interface is the most reliable way to guarantee a clinical AI system goes unused.",
    },
    {
      q: "How accurate are AI diagnostic models compared with human specialists?",
      a: "On narrow, well-defined tasks with large labelled datasets — certain imaging reads in particular — published results show models matching or exceeding specialist performance. That does not generalise to open-ended clinical judgement, and it does not remove the need for oversight. We build these systems to raise findings for confirmation, and we evaluate them on the error type that matters for the specific pathway rather than on headline accuracy.",
    },
    {
      q: "What data is needed to train a medical AI model?",
      a: "Typically annotated images, structured records, lab results, and clinical notes, in enough volume and variety to represent the population the model will serve. Representativeness matters more than raw size: a model trained on one demographic or one scanner generation degrades on another, which is why cohort composition is assessed during data governance rather than discovered after deployment.",
    },
    {
      q: "Can AI diagnostic systems work in remote or low-resource settings?",
      a: "Yes, and this is one of the stronger arguments for them. Where specialist availability is the constraint rather than equipment, a model that screens and prioritises can extend reach considerably. Deployment in these settings needs attention to offline operation and intermittent connectivity, which changes the architecture and should be stated as a requirement up front.",
    },
    {
      q: "How do you keep a clinician in control of clinical decisions?",
      a: "Clinical outputs are presented as findings to confirm, not as decisions already taken, and the interface makes overriding straightforward rather than a fight against a default. Override rates are monitored, both as a safety signal and because a rising override rate is usually the first sign that a model has drifted away from the population it was validated on.",
    },
    {
      q: "How long does it take to build a HealthTech AI solution?",
      a: "The modelling is rarely the long pole — data access and governance are. An organisation with a clean, accessible, well-governed data estate can move quickly; one where records sit across systems with inconsistent coding spends most of the effort before training starts. We size that work explicitly in discovery so the timeline reflects your actual position.",
      link: {
        label: "Book a free consultation",
        href: "https://www.softsuave.com/30-min-free-consultation",
        tail: "and we will scope it against your systems.",
      },
    },
    {
      q: "What does a custom HealthTech AI solution cost?",
      a: "Cost tracks scope, integration surface, and the state of your data far more than it tracks model complexity. A focused administrative automation integrated with one system is a different proposition from a validated clinical decision support tool spanning several. We scope both explicitly rather than quoting a range that would not survive contact with your requirements.",
    },
  ],
};
