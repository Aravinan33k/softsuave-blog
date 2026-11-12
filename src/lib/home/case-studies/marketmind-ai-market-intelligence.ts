import type { CaseStudyContent } from "@/components/case-study/case-study";
import { HERO_PLATFORM_ICONS as P, platformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-marketmind-ai-market-intelligence` — softsuave.com's MarketMind
 * case study
 * (https://www.softsuave.com/case-study-marketmind-ai-market-intelligence),
 * rebuilt on the site's case-study template the way `vehicle-intelligence.ts`
 * is.
 *
 * Every line of copy is the live page's, verbatim: hero, the six numbered
 * sections and their cards, the pull quote, the twelve features, the four
 * figures, the download panel and modal, and the related-case-study heading. Section ids
 * are live's (`#section1`…`#section6`). The images and the PDF are live's,
 * self-hosted (`public/images/case-studies/marketmind-ai-market-intelligence/`,
 * `public/assets/case-studies/`); the PDF keeps live's path.
 *
 * Not carried over: the hero image's `alt="health-care"`; live's `<title>`
 * "MarketMind AI Multi-Tenant Market Intelligence{Case Study}", set here in
 * the case-study pages' own "… Case Study | Soft Suave" form — see
 * `marketMindMeta`; and what live leaves commented out, so never renders —
 * the Android and iOS platform marks, the solution cards' bracketed sublines
 * ("(5 Agent Types)" …) and the benchmark disclaimer under the figures. The
 * Results section has no standfirst on live, so it has none here.
 */

export const marketMindMeta = {
  path: "/case-study-marketmind-ai-market-intelligence",
  title: "MarketMind AI Market Intelligence Case Study",
  /** Live's meta description, verbatim. */
  description:
    "See how Soft Suave built MarketMind, an AI-native multi-tenant market intelligence platform letting trading and analyst teams query their own data, news feeds and research in plain English.",
} as const;

const IMG = "/images/case-studies/marketmind-ai-market-intelligence";
const PDF = "/assets/case-studies/MarketMind_Case_Study.pdf";

export const marketMindCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1 — plain, highlighted, then the smaller sub-tag — set as one
    // headline line over the sub-tag, as the Vehicle Intelligence hero is.
    titleLines: ["AI Native Multi-Tenant Market Intelligence", "for Traders & Analysts"],
    accent: "Market Intelligence",
    titleSubLast: true,
    body: [
      "Letting each client organisation onboard its own market data, automate news and research collection, and ask questions in plain English — with an AI orchestrator coordinating specialised agents so every answer is grounded in the firm's own data, under strict tenant isolation.",
    ],
    points: [],
    facts: [
      { label: "Industry :", value: "FinTech & Capital Markets" },
      platformFact([P.Web]),
    ],
    aside: {
      src: `${IMG}/dashboard.webp`,
      width: 1536,
      height: 1024,
      alt: "MarketMind overview dashboard on a desktop monitor showing market indices, news sentiment, the AI agent orchestrator answering a trader's question and an AI assistant panel",
      blurDataURL:
        "data:image/webp;base64,UklGRrgAAABXRUJQVlA4WAoAAAAQAAAADwAACgAAQUxQSEQAAAABYBvZtpKfCxHEXzr9c7th6MStHO7DpYSImIC86V43hSPlmWT0r+SbXNZXEj35Ez/d8wOFUScAmMkFAJJW16ys6ypTV1ZQOCBOAAAAsAEAnQEqEAALAAVAfCWMAsOxDdxGmAD+0rAIOZekqZdV7qatA3jX2H80NR1pkV3MPy7Cp7Bv//En8ZbS4mKQyytLrR7yuv8Y3aIwAAAA",
    },
    image: {
      src: `${IMG}/hero-bg.webp`,
      width: 1672,
      height: 941,
      // Decorative backdrop: the dashboard beside the copy is the hero's image.
      alt: "",
      blurDataURL: "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoQAAkABUB8JaQAA3AA/vDBoAA=",
    },
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "About the Client",
      kicker: "01 — About the Client",
      title: "Where speed of insight is the edge",
      body: [
        "The client serves traders and market analysts in finance, trading and commodities markets — users who depend on fast, accurate intelligence drawn from internal market data, research documents, news feeds and external data services. The competitive edge lies in how quickly raw information becomes decision-ready insight. And because one platform serves multiple client organisations at once, financial-institution-grade security, strict organisation-level data isolation and role-based access were table stakes from day one.",
      ],
    },
    {
      id: "section2",
      nav: "The Challenge",
      kicker: "02 — The Challenge",
      title: "Insight was scattered, slow and hard to trust",
      body: [
        "Market intelligence existed, but reaching it was the problem — locked behind specialist tooling, scattered across sources, and impossible to hand to a generic AI assistant without risking both accuracy and tenant data isolation.",
      ],
      cards: {
        variant: "plain",
        items: [
          {
            name: "Scattered market intelligence",
            body: "Market intelligence sat across databases, documents, news feeds and external services, with no unified access point for the people who needed it.",
          },
          {
            name: "Insight gated by specialists",
            body: "Extracting insight required SQL, scripting or waiting on analysts and IT — slowing trading decisions at the moments speed mattered most.",
          },
          {
            name: "Manual news monitoring",
            body: "Traders scanned news feeds themselves, so valuable market signals were missed entirely or acted on too late to be useful.",
          },
          {
            name: "Generic AI can't be trusted",
            body: "Generic AI assistants aren't grounded in the organisation's own data — and serving multiple firms demands strict isolation that ad-hoc tools can't provide.",
          },
        ],
      },
    },
    {
      id: "section3",
      nav: "The Solution",
      kicker: "03 — The Solution",
      title: "Agent intelligence over the firm's own data",
      body: [
        "Soft Suave delivered MarketMind as an enterprise-grade, multi-tenant cloud platform: an AI orchestrator dynamically coordinates specialised agents — data querying, document retrieval, external API calls, business rules and formula execution — so a trader's plain-English question is answered from real organisational data, never generic model knowledge.",
      ],
      cards: {
        variant: "icon",
        items: [
          {
            name: "Agent Orchestration Layer",
            body: "An AI orchestrator interprets each question and coordinates the right agents in real time — querying data, retrieving documents, calling external APIs, applying business rules and executing formulas — composing one grounded, traceable answer.",
          },
          {
            name: "Newsfeed Intelligence Pipeline",
            body: "Traders register RSS feeds and schedules themselves; the platform scrapes articles on schedule, distils them into structured insights and stores them in a dedicated insights layer — instantly queryable through the AI.",
          },
          {
            name: "Multi-Tenant Knowledge Base",
            body: "Uploaded PDFs and scraped news are automatically chunked, embedded and made semantically searchable per organisation — with strict tenant isolation, role-based access and dual authentication for human and system users.",
          },
        ],
      },
      quote:
        "\"Plain-English questions, answers grounded in the firm's own data — delivered with the isolation and auditability financial institutions demand.\"",
    },
    {
      id: "section4",
      nav: "Key Feature",
      kicker: "04 — Key Features",
      title: "Twelve capabilities, one platform",
      body: [
        "MarketMind combines natural-language querying, dynamic agent orchestration, and a tenant-isolated knowledge base into a single platform. These capabilities let traders and analysts get grounded, traceable answers from their own data — with the security and access controls financial institutions require.",
      ],
      list: [
        "Natural-Language Market Queries",
        "Dynamic AI Agent Orchestration",
        "Automated PDF & News Ingestion (RAG)",
        "Semantic Search over Firm Knowledge",
        "Self-Configured RSS News Pipelines",
        "Org-Defined Business Rules & Formulas",
        "Strict Organisation-Level Data Isolation",
        "Role-Based Access for Three Roles",
        "Dual Authentication (Sign-On + API Keys)",
        "Three Independently Scalable Services",
        "Distributed Tracing & AI Cost Tracking",
        "Automated CI/CD for Every Service",
      ],
      image: {
        src: `${IMG}/platform.webp`,
        width: 1535,
        height: 1024,
        alt: "MarketMind dashboard ringed by its twelve capabilities, from natural-language market queries and agent orchestration to data isolation and automated CI/CD",
        blurDataURL:
          "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADQAQCdASoQAAsABUB8JZwAAvmFZUtqAAD+7dDlihVTrCtGBEfpG1Igte0qHtBAcn3Sj0p2qAAAAA==",
      },
    },
    {
      id: "section5",
      nav: "Results & Impact",
      kicker: "05 — Results & Impact",
      title: "What comparable analytics platforms deliver",
      stats: [
        { value: "35%", label: "Analyst time saved on data analysis in a benchmark cloud-analytics deployment" },
        { value: "50%", label: "Time saved on data preparation and processing tasks in the same study" },
        { value: "209%", label: "Three-year ROI measured for a comparable cloud analytics platform" },
        { value: "<6 mo", label: "Payback period reported for comparable analytics platform investments" },
      ],
    },
    {
      id: "section6",
      nav: "Why Soft Suave",
      kicker: "06 — Why Soft Suave",
      title: "Enterprise AI, isolated by design",
      body: [
        "A multi-tenant AI platform for financial institutions lives or dies on trust. Soft Suave engineered that trust in from the start: organisation-level data isolation enforced at every layer, role-based access, secrets held in a managed store and never in code, dual authentication for human and system users, and every request traced end-to-end with AI token usage tracked per tenant. Three independently scalable services with asynchronous messaging keep trading-desk queries responsive while ingestion runs in the background — and automated CI/CD ships every change repeatably and safely.",
      ],
    },
  ],

  download: {
    navLabel: "Download",
    body: "Download this practical case study to learn how our AI-native multi-tenant platform grounds every trading and research answer in the firm's own data, with financial-institution-grade isolation.",
    label: "Download Case Study",
    pdf: PDF,
    fileName: "MarketMind_Case_Study.pdf",
    requirement:
      "Case study download: requested the MarketMind case study (AI Native Multi-Tenant Market Intelligence for Traders & Analysts) PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – MarketMind",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the MarketMind case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(marketMindMeta.path),
};
