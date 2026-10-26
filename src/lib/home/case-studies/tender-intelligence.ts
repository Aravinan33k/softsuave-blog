import type { CaseStudyContent } from "@/components/case-study/case-study";
import { HERO_PLATFORM_ICONS as P } from "./platform-icons";

/**
 * `/case-study-tender-intelligence` — softsuave.com's Tender Intelligence case
 * study (https://www.softsuave.com/case-study-tender-intelligence), rebuilt on
 * the site's case-study template the way `vehicle-intelligence.ts` is.
 *
 * Every line of copy is the live page's, verbatim: hero, the six numbered
 * sections and their cards, the pull quote, the twelve features, the four
 * figures, the download panel and modal, and the related-case-study heading
 * and card blurbs (live's own five, which leave Tender out). That includes the
 * Challenge heading, which live shares with the Neurora page. Section ids are
 * live's (`#section1`…`#section6`). The images and the PDF are live's,
 * self-hosted (`public/images/case-studies/tender-intelligence/`,
 * `public/assets/case-studies/`); the PDF keeps live's path.
 *
 * Not carried over: the hero image's `alt="health-care"`, and live's `<title>`
 * "Tender Intelligence | Case Study", set here in the case-study pages' own
 * "… Case Study | Soft Suave" form — see `tenderMeta`.
 */

export const tenderMeta = {
  path: "/case-study-tender-intelligence",
  title: "Tender Intelligence Case Study",
  /** Live's meta description, verbatim. */
  description:
    "See how Soft Suave built an on-premises AI platform automating tender strategy, evaluation, and audit for a leading LNG operator in Oman.",
} as const;

const IMG = "/images/case-studies/tender-intelligence";
const PDF = "/assets/case-studies/Tender_Intelligence_Case_Study.pdf";

export const tenderCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1 — plain, highlighted, then the smaller sub-tag — set as one
    // headline line over the sub-tag, as the Vehicle Intelligence hero is.
    titleLines: ["An AI Powered", "Contract & Tender Management Lifecycle Platform"],
    accent: "AI Powered",
    titleSubLast: true,
    body: [
      "From Contract Strategy to Closure — AI-assisted drafting, deterministic evaluation, and an immutable, timestamped audit trail across a ten-phase tender lifecycle. Delivered entirely on-premises for a leading LNG operator in Oman, with sealed-bid integrity preserved and full English and Arabic support throughout.",
    ],
    points: [],
    facts: [
      { label: "Industry :", value: "Energy / Oil & Gas" },
      { label: "Platform : ", value: "Web", icons: [P.Web] },
    ],
    aside: {
      src: `${IMG}/dashboard.webp`,
      width: 1419,
      height: 923,
      alt: "Tender management dashboard on a desktop monitor showing active tenders, items awaiting review and the tender pipeline by stage",
      blurDataURL:
        "data:image/webp;base64,UklGRqIAAABXRUJQVlA4WAoAAAAQAAAADwAACQAAQUxQSEQAAAABd6CQjSQ4tq/N+hzARUTg9CynUCWhKpKdJjhBBU7igIkLrOAEC/mmC6gqqoSI/k9AKls31pbnrj7xP03YLJICkN4IAFZQOCA4AAAAEAIAnQEqEAAKAAOAWiWMAsOxDvmfu6duAAD9x8h1dCaY8WR4BpA+sRnerhOs8H1wUZCPSs4oAAA=",
    },
    image: {
      src: `${IMG}/hero-bg.webp`,
      width: 1672,
      height: 941,
      // Decorative backdrop: the dashboard beside the copy is the hero's image.
      alt: "",
      blurDataURL: "data:image/webp;base64,UklGRigAAABXRUJQVlA4IBwAAAAwAQCdASoQAAkABIBaJaQAA3AA/vTPhRSuAAAA",
    },
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "About the Client",
      kicker: "01 — About the Client",
      title: "Procurement at enterprise scale",
      body: [
        "A leading LNG operator in Oman runs complex, high-value tenders across its supply chain under strict governance. It set out to build an AI-powered contract and tender management platform spanning the full lifecycle—from Contract Strategy through evaluation and award to closure—while keeping every record on-premises, preserving sealed-bid integrity, and maintaining an immutable audit trail at every step. Five stakeholder personas, two languages, and zero tolerance for untraceable decisions set the bar for delivery.",
      ],
    },
    {
      id: "section2",
      nav: "The Challenge",
      kicker: "02 — The Challenge",
      title: "Four problems across the tender lifecycle",
      body: [
        "Enterprise tendering involves high stakes and strict governance — slow manual cycles, inconsistent scoring, and zero tolerance for untraceable decisions. Building a reliable platform required solving these challenges while preserving sealed-bid integrity and full bilingual, on-premises compliance.",
      ],
      cards: {
        variant: "plain",
        items: [
          {
            name: "Slow, manual tender cycles",
            body: "Multi-stage tendering with hand-drafted documents and manual handoffs stretched cycle times and made progress hard to trace.",
          },
          {
            name: "Inconsistent, subjective scoring",
            body: "Evaluation varied by evaluator and by tender, risking unfair, non-repeatable, and hard-to-defend award decisions.",
          },
          {
            name: "Audit, compliance & sealed bids",
            body: "Every action needed an immutable trail, strict bidder anonymity, and evidence-linked rationale for full accountability.",
          },
          {
            name: "Strict residency, bilingual UI",
            body: "All data had to stay on-premises with zero external transfer, plus full English and Arabic right-to-left support.",
          },
        ],
      },
    },
    {
      id: "section3",
      nav: "The Solution",
      kicker: "03 — The Solution",
      title: "One platform, the full tender lifecycle",
      body: [
        "Soft Suave designed a single AI platform where AI recommends and people decide — combining AI-assisted strategy generation, deterministic evaluation, and airtight sealed-bid governance on the client’s own infrastructure. It automates a ten-phase tender lifecycle end to end, with every stage human-reviewed and fully audit-logged.",
      ],
      cards: {
        variant: "icon",
        items: [
          {
            name: "AI-Assisted Contract Strategy",
            body: "Contract Holders generate the CIF, SOW, and up to seven strategic artifacts—grounded in the client's historical data and confirmed through mandatory human review—kicking off a ten-phase lifecycle automated end to end.",
          },
          {
            name: "Deterministic Evaluation Engine",
            body: "Technical and commercial scores are calculated using approved matrices on a fixed scale, with commercial evaluation delivered through nine sequential AI agents—evidence-traceable, reproducible, and always decided by people.",
          },
          {
            name: "Sealed-Bid Governance & Audit",
            body: "Bidder anonymisation, review-only governance, and an immutable, timestamped audit of every change, decision, and rationale—end to end, entirely on-premises, in English and Arabic.",
          },
        ],
      },
      quote:
        "\"AI recommends, humans decide—deterministic scoring, evidence-linked justifications, and an immutable, timestamped audit trail behind every award.\"",
    },
    {
      id: "section4",
      nav: "Key Feature",
      kicker: "04 — Key Features",
      title: "Built for governance and scale",
      body: [
        "The platform integrates AI-assisted document generation, deterministic scoring, and immutable audit logging into a unified system. These capabilities enable consistent evaluation, sealed-bid governance, and bilingual support across every phase of the tender lifecycle.",
      ],
      list: [
        "AI Document Generation (CIF, SOW, ITT)",
        "Deterministic Scoring Matrices",
        "One-Click Evidence Links",
        "Review-Only Governance",
        "Immutable, Timestamped Audit Trail",
        "Sealed-Bid Anonymisation",
        "AI-Suggested Bidder Shortlists",
        "Comment-as-Prompt Draft Regeneration",
        "Nine-Agent Commercial Evaluation",
        "On-Premises Data Platform Integration",
        "Bilingual English / Arabic (RTL)",
        "Multi-Format Reports & KPIs",
      ],
      image: {
        src: `${IMG}/platform.webp`,
        width: 1672,
        height: 941,
        alt: "Tender management dashboard ringed by its twelve capabilities, from AI document generation and scoring matrices to bilingual reports and KPIs",
        blurDataURL:
          "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADwAQCdASoQAAkAA4BaJYgCdADw2X5vWeAA/vV+XIXK5f0URoTiA6eee0sCOEAD5dfkXfkux+JYW7J+9TKj+ehLN5FTLsrT8CaXQkxMEAA=",
      },
    },
    {
      id: "section5",
      nav: "Results & Impact",
      kicker: "05 — Results & Impact",
      title: "Engineered from strategy to award",
      body: [
        "The shift from manual, subjective tendering to a deterministic AI-driven process gave the client faster cycle times, repeatable evaluation outcomes, and complete audit confidence — without compromising sealed-bid integrity or data residency requirements.",
      ],
      stats: [
        { value: "50–60%", label: "Targeted reduction in tender cycle time across the full lifecycle." },
        { value: "73%", label: "Contract cycle-time cut reported in a published AI deployment (45 to 12 days)" },
        { value: "40%", label: "Typical contract-lifecycle time reduction reported for AI-powered CLM platforms" },
        { value: "30%", label: "Of manually drafted contracts contain errors — the risk deterministic evaluation removes" },
      ],
    },
    {
      id: "section6",
      nav: "Why Soft Suave",
      kicker: "06 — Why Soft Suave",
      title: "Enterprise AI, built for auditability",
      body: [
        "The client needed far more than automation—a deterministic evaluation engine, a nine-agent commercial pipeline, sealed-bid governance, and an immutable audit trail, all running on-premises with full English and Arabic support. Soft Suave delivered the architectural depth and delivery discipline to make it real, with AI kept firmly in a recommend-and-assist role and every decision owned by an authorised human—so every award the platform helps produce is repeatable, evidence-linked, and defensible.",
      ],
    },
  ],

  download: {
    navLabel: "Download",
    body: "Download this practical case study to learn how our AI platform automates tender strategy, evaluation, and audit trails for enterprise procurement teams.",
    label: "Download Case Study",
    pdf: PDF,
    fileName: "Tender_Intelligence_Case_Study.pdf",
    requirement:
      "Case study download: requested the Tender Intelligence case study (An AI Powered Contract & Tender Management Lifecycle Platform) PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Tender Intelligence",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Tender Intelligence case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // Live's "Related Case Studies" carousel: its heading, standfirst and five
  // cards (Tender itself is not among them), each with live's own short
  // blurb. The images are the ones the case-study index already ships.
  related: {
    eyebrow: "Related Case Studies",
    title: "Real-World Impact Through Digital Transformation",
    body: "Explore how we help startups and SMBs grow, launch successful products, and solve challenges with tech and strategy—backed by real results in every case study.",
    tileCta: "View Case Study",
    items: [
      {
        title: "An AI-Powered Shift Intelligence and Digital Logbook Platform for LNG Operations",
        body: "Soft Suave built an on-premises AI platform that turns free-text operational logs into instant shift summaries and source-cited answers, in English and Arabic.",
        image: { src: "/images/case-studies/shift-sense-cs.webp", alt: "AI-Powered Shift Intelligence & Digital Logbook Platform" },
        href: "/case-study-shiftsense-ai-shift-intelligence",
      },
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
