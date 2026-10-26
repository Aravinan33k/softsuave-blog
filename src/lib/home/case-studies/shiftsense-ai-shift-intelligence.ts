import type { CaseStudyContent } from "@/components/case-study/case-study";
import { HERO_PLATFORM_ICONS as P } from "./platform-icons";

/**
 * `/case-study-shiftsense-ai-shift-intelligence` — softsuave.com's ShiftSense
 * case study (https://www.softsuave.com/case-study-shiftsense-ai-shift-intelligence),
 * rebuilt on the site's case-study template the way `vehicle-intelligence.ts`
 * is.
 *
 * Every line of copy is the live page's, verbatim: hero (including its H1
 * sub-tag "… for LNG Platform"), the six numbered sections and their cards,
 * the pull quote, the twelve features, the four figures, the download panel
 * and modal, and the related-case-study heading and card blurbs (live's own
 * five, which leave ShiftSense out). Live's Results section has no intro
 * paragraph, so neither does this one. Section ids are live's
 * (`#section1`…`#section6`). The images and the PDF are live's, self-hosted
 * (`public/images/case-studies/shiftsense-ai-shift-intelligence/`,
 * `public/assets/case-studies/`); the PDF keeps live's path.
 *
 * Not carried over: the hero image's `alt="health-care"`, and live's `<title>`
 * "ShiftSense AI Shift Intelligence | Case Study", set here in the case-study
 * pages' own "… Case Study | Soft Suave" form — see `shiftSenseMeta`.
 */

export const shiftSenseMeta = {
  path: "/case-study-shiftsense-ai-shift-intelligence",
  title: "ShiftSense AI Shift Intelligence Case Study",
  /** Live's meta description, verbatim. */
  description:
    "See how Soft Suave built ShiftSense, an AI-powered Shift Intelligence & Digital Logbook platform turning free-text LNG operational logs into instant summaries, source-cited answers, and early-warning insight.",
} as const;

const IMG = "/images/case-studies/shiftsense-ai-shift-intelligence";
const PDF = "/assets/case-studies/ShiftSense_Case_Study.pdf";

export const shiftSenseCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1 — plain, highlighted, then the smaller sub-tag — set as one
    // headline line over the sub-tag, as the Vehicle Intelligence hero is.
    titleLines: ["An AI Powered Shift Intelligence", "and Digital Logbook Platform for LNG Platform"],
    accent: "Shift Intelligence",
    titleSubLast: true,
    body: [
      "Turning thousands of free-text operational log entries into instant shift summaries, source-cited answers and early-warning insight — engineered for a fully air-gapped, safety-critical plant, in English and Arabic.",
    ],
    points: [],
    facts: [
      { label: "Industry :", value: "Energy / Oil & Gas" },
      { label: "Platform : ", value: "Web", icons: [P.Web] },
    ],
    aside: {
      src: `${IMG}/dashboard.webp`,
      width: 1477,
      height: 1018,
      alt: "ShiftSense system-monitoring dashboard on a desktop monitor showing logbook activity this shift, user metrics, an online-users trend and case-type distribution",
      blurDataURL:
        "data:image/webp;base64,UklGRsIAAABXRUJQVlA4WAoAAAAQAAAADwAACgAAQUxQSEMAAAABYBxJUhtylb42RB+RPWD2g0shIibgiTGUvQ+3CVV7U6OZhCiKpD4DApFmqksgIckbSKQZG5b0gHVJB5d21/8fvUsBAFZQOCBYAAAAEAIAnQEqEAALAAOAWiUAToAh4LuOXkalQAD+yg9haBSSNOgvIOJb4fKGJ88nrE7COrEeUee+i66abOkjW7qVFNKr3pSZuSsGlQnJ4jttehByi8s8sdQAAA==",
    },
    image: {
      src: `${IMG}/hero-bg.webp`,
      width: 1672,
      height: 941,
      // Decorative backdrop: the dashboard beside the copy is the hero's image.
      alt: "",
      blurDataURL: "data:image/webp;base64,UklGRioAAABXRUJQVlA4IB4AAAAwAQCdASoQAAkAA4BaJaQAA3AA/vUApVekStgAAAA=",
    },
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "About the Client",
      kicker: "01 — About the Client",
      title: "Where every 12-hour shift ends in a critical handover",
      body: [
        "The client is a leading LNG producer in the Middle East, operating a multi-train liquefaction plant that runs around the clock on 12-hour shifts. Every shift generates a dense trail of digital logbook entries — activities, critical alarms, safety observations and follow-up actions — held in the plant's electronic logbook and enterprise data platform. A bilingual workforce of operators, supervisors and superintendents depends on that record twice a day, when one crew hands the plant over to the next.",
      ],
    },
    {
      id: "section2",
      nav: "The Challenge",
      kicker: "02 — The Challenge",
      title: "Four barriers between the logbook and the decision",
      body: [
        "Critical operational knowledge lived inside years of free-text log entries, scattered across a system built for record-keeping, not for answers. Turning that history into a reliable shift-intelligence platform meant closing four gaps between the logbook and the people who depend on it every shift.",
      ],
      cards: {
        variant: "plain",
        items: [
          {
            name: "Slow, manual handovers",
            body: "Writing and reading shift summaries by hand consumed valuable time at the busiest moment of every shift — and quality depended on the individual.",
          },
          {
            name: "Buried operational knowledge",
            body: "Answers lived inside years of free-text log entries. Finding \"when did this trip last happen?\" meant scrolling history, not asking a question.",
          },
          {
            name: "Actions lost between shifts",
            body: "Follow-up actions crossed shift boundaries without clear ownership or tracking, so recurring issues kept resurfacing unnoticed.",
          },
          {
            name: "Strict data boundaries",
            body: "An air-gapped perimeter ruled out cloud AI entirely — and the platform had to serve English and Arabic users as equals, with full auditability.",
          },
        ],
      },
    },
    {
      id: "section3",
      nav: "The Solution",
      kicker: "03 — The Solution",
      title: "Three AI modules on one governed platform",
      body: [
        "Soft Suave delivered ShiftSense as a standalone, read-only intelligence layer over the plant's existing logbook and enterprise data platform — an on-premises LLM with retrieval-augmented generation, a near-real-time Spark-to-Iceberg data pipeline, and role-based dashboards for nine personas. It never writes back to source systems.",
      ],
      cards: {
        variant: "icon",
        items: [
          {
            name: "Shift Summaries & Handover",
            body: "Auto-generated at end of shift and on demand — activities, critical alarms, pending actions and safety observations, on the plant's own template, exportable to PDF, Excel and Word.",
          },
          {
            name: "Bilingual AI Assistant",
            body: "Plain-language questions over the full operational history — typed or spoken — with every answer citing shift date, timestamp and record ID, and a click-through to the original entry.",
          },
          {
            name: "Actions, Trends & Reporting",
            body: "A full pending-action lifecycle with overdue alerting, recurring-issue detection, KPI and trend dashboards with drill-down, predictive insight, and scheduled management reports.",
          },
        ],
      },
      quote:
        "\"One on-premises AI brain — summaries, answers and insight, with every response traceable to a dated, timestamped source record.\"",
    },
    {
      id: "section4",
      nav: "Key Feature",
      kicker: "04 — Key Features",
      title: "Twelve capabilities, one platform",
      body: [
        "ShiftSense integrates bilingual AI summarization, retrieval-augmented answers, and near-real-time operational analytics into a single governed platform. These capabilities give plant teams instant, source-cited insight across every shift, in English and Arabic.",
      ],
      list: [
        "AI Shift Summaries (End-of-Shift + On-Demand)",
        "Bilingual AI Assistant (English + Arabic, Text & Voice)",
        "Source-Cited Answers (Date · Timestamp · Record ID)",
        "Pending-Actions Module (Lifecycle & Overdue Alerts)",
        "Analytics, Trends & Predictive Insight",
        "On-Demand & Scheduled Reports (PDF / Excel / Word Export)",
        "In-App & Email Notifications",
        "Role-Based Access & Custom Roles (RBAC)",
        "Dashboard Configuration & Personalization",
        "Near-Real-Time Data Pipeline (~1-Minute Refresh)",
        "Immutable Audit Trail & AI Observability (RAGAS)",
        "Feedback & Continuous Improvement (Human-Gated)",
      ],
      image: {
        src: `${IMG}/platform.webp`,
        width: 1672,
        height: 941,
        alt: "ShiftSense AI Shift Intelligence platform on tablet and phone in front of an LNG plant, beside its twelve capabilities",
        blurDataURL:
          "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAADwAQCdASoQAAkAA4BaJZQCdAD0kBqvXKAA/vhtA90eejWLFoTfrFJMMYeiDuAazqcEINcbJOgizlTqojqjjXZrI/Qwj+1AAAA=",
      },
    },
    {
      id: "section5",
      nav: "Results & Impact",
      kicker: "05 — Results & Impact",
      title: "Built to move the numbers that matter on the plant floor",
      stats: [
        { value: "≥95%", label: "AI answer accuracy — English and Arabic measured independently" },
        { value: "<3 sec", label: "Assistant response latency on plant-wide queries" },
        { value: "~1 min", label: "From new log entry to searchable, AI-ready insight" },
        { value: "500+", label: "Concurrent users supported without degradation" },
      ],
    },
    {
      id: "section6",
      nav: "Why Soft Suave",
      kicker: "06 — Why Soft Suave",
      title: "AI-platform depth, delivered with discipline",
      body: [
        "The client demanded far more than a chatbot — a production LLM platform inside a zero-egress perimeter, Arabic treated as a first-class language with its own accuracy gate, a near-real-time lakehouse pipeline, and governance aligned to ISO/IEC 42001, NIST AI RMF, OWASP LLM Top 10 and ISO/IEC 27001. Soft Suave delivered the architectural depth and delivery discipline to make it real: every answer source-cited, every interaction immutably audited, and every improvement to the AI human-approved and quality-gated before it ships.",
      ],
    },
  ],

  download: {
    navLabel: "Download",
    body: "Download this practical case study to learn how our AI-powered Shift Intelligence platform turns free-text operational logs into instant summaries, source-cited answers, and early-warning insight — fully on-premises, in English and Arabic.",
    label: "Download Case Study",
    pdf: PDF,
    fileName: "ShiftSense_Case_Study.pdf",
    requirement:
      "Case study download: requested the ShiftSense AI Shift Intelligence case study (An AI Powered Shift Intelligence and Digital Logbook Platform) PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – ShiftSense AI Shift Intelligence",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the ShiftSense AI Shift Intelligence case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // Live's "Related Case Studies" carousel: its heading, standfirst and five
  // cards (ShiftSense itself is not among them), each with live's own short
  // blurb. The images are the ones the case-study index already ships.
  related: {
    eyebrow: "Related Case Studies",
    title: "Real-World Impact Through Digital Transformation",
    body: "Explore how we help startups and SMBs grow, launch successful products, and solve challenges with tech and strategy—backed by real results in every case study.",
    tileCta: "View Case Study",
    items: [
      {
        title: "An AI Content Production Programme for Enterprise Strategic Communications",
        body: "Soft Suave built an AI content programme that speeds up campaign production and delivers bilingual English-Arabic content at scale.",
        image: { src: "/images/case-studies/brand-forge-cs.webp", alt: "AI Content Production Programme" },
        href: "/case-study-brand-forge",
      },
      {
        title: "AI-Driven Incident Management and Compliance Optimization for Offshore Operations",
        body: "Soft Suave automates incident classification, emergency response, and compliance tracking to keep offshore operations faster, safer, and audit-ready.",
        image: { src: "/images/case-studies/safe-ops-cs.webp", alt: "AI-Driven Incident Management Platform" },
        href: "/case-study-safeops-ai-incident-management",
      },
      {
        title: "AI-Powered Contract & Tender Management Lifecycle Platform",
        body: "Soft Suave built an AI platform that automates tender evaluation and keeps an immutable audit trail for enterprise procurement.",
        image: { src: "/images/case-studies/tender-intelligence-cs.webp", alt: "Tender Intelligence Platform" },
        href: "/case-study-tender-intelligence",
      },
      {
        title: "AI-Powered Onboarding and Configuration Assist for a Logistics Management Platform",
        body: "Soft Suave embeds an always-available AI assistant that guides logistics customers through setup, validates inputs, and cuts onboarding time in half.",
        image: { src: "/images/case-studies/ai-assist-cs.webp", alt: "Logistics Management Platform" },
        href: "/case-study-ai-assist-logistics-onboarding",
      },
      {
        title: "An AI-Powered Smart Wellness Platform Revolutionizing Pet Healthcare",
        body: "Soft Suave brings AI health assessments, digital records, and preventive care together to help pet parents and vets catch concerns early.",
        image: { src: "/images/case-studies/well-pet-cs.webp", alt: "Pet Care Application" },
        href: "/case-study-wellpet-ai-smart-wellness-platform",
      },
    ],
  },
};
