import type { CaseStudyContent } from "@/components/case-study/case-study";
import { HERO_PLATFORM_ICONS as P, platformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-postguard-compliance-ai` — softsuave.com's PostGuard case study
 * (https://www.softsuave.com/case-study-postguard-compliance-ai), rebuilt on
 * the site's case-study template the way `vehicle-intelligence.ts` is.
 *
 * Every line of copy is the live page's, verbatim: hero, the six numbered
 * sections and their cards, the pull quote, the twelve features, the four
 * figures, the download panel and modal, and the related-case-study heading. Section ids
 * are live's (`#section1`…`#section6`). The images and the PDF are live's,
 * self-hosted (`public/images/case-studies/postguard-compliance-ai/`,
 * `public/assets/case-studies/`).
 *
 * Not carried over: live's `<title>` "PostGuard{Case Study}", set here in the
 * case-study pages' own "… Case Study | Soft Suave" form — see
 * `postGuardMeta`; live's PDF link, `PostGuard_case_study.pdf`, which 404s —
 * the file it means is served as `PostGuard_Case_Study.pdf`, and that is the
 * path kept here; and live's commented-out benchmark disclaimer under the
 * figures, which never renders there.
 */

export const postGuardMeta = {
  path: "/case-study-postguard-compliance-ai",
  title: "PostGuard Case Study",
  /** Live's meta description, verbatim. */
  description:
    "See how Soft Suave built PostGuard, an AI-powered compliance analysis platform that evaluates sponsored influencer content against ingested rulebooks in seconds.",
} as const;

const IMG = "/images/case-studies/postguard-compliance-ai";
const PDF = "/assets/case-studies/PostGuard_Case_Study.pdf";

export const postGuardCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1 — plain, highlighted, then the smaller sub-tag — set as one
    // headline line over the sub-tag, as the Vehicle Intelligence hero is.
    titleLines: ["An AI-Powered Compliance Analysis Platform", "for Influencer Marketing"],
    accent: "Compliance Analysis Platform",
    titleSubLast: true,
    body: [
      "Automatically evaluating sponsored social media content — text, images and video — against an organisation's ingested compliance rulebook, returning a clear verdict with confidence score and cited violations in seconds, with an AI assistant for compliant post planning and plain-English rule management.",
    ],
    points: [],
    facts: [
      { label: "Industry :", value: "Marketing & Advertising Compliance" },
      platformFact([P.Web]),
    ],
    aside: {
      src: `${IMG}/dashboard.webp`,
      width: 1414,
      height: 1006,
      alt: "PostGuard Compliance Check screen on a desktop monitor showing an uploaded video post marked Needs Revision at 90% confidence, with the AI analysis citing a high-severity content violation",
      blurDataURL:
        "data:image/webp;base64,UklGRswAAABXRUJQVlA4WAoAAAAQAAAADwAACgAAQUxQSF4AAAABZ6CYkSQ4Oj2rcTnsew02IkIfyc0aAKwi224SigIcEAX4QQAOuoREAg7yTb0RQDmuQERE/2MLUlCYLoiS3BUByd180d1E8b7+B/P3/iSBv3gBfGntUltbGFO1TW4MVlA4IEgAAADwAQCdASoQAAsABUB8JZwAAvh2Eg5rPEAA/uIkGoco/sTpSBaMWmeCeGgcpZr4fFctY2HX/YWYPLm5cLPAiHyLpQmUt30AAAA=",
    },
    image: {
      src: `${IMG}/hero-bg.webp`,
      width: 1672,
      height: 941,
      // Decorative backdrop: the dashboard beside the copy is the hero's image.
      alt: "",
      blurDataURL: "data:image/webp;base64,UklGRiYAAABXRUJQVlA4IBoAAAAwAQCdASoQAAkABUB8JaQAA3AA/vDFI4AAAA==",
    },
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "About the Client",
      kicker: "01 — About the Client",
      title: "Where every sponsored post is a compliance decision",
      body: [
        "The client operates in influencer marketing, where sponsored content has become a primary advertising channel — and a growing regulatory risk. Brands, agencies and influencers must ensure every sponsored post complies with advertising regulations, such as disclosure requirements, and each platform's own guidelines. Until now that review was largely manual: slow, inconsistent, expensive and unable to scale with campaign volume, with compliance teams checking posts against lengthy rule documents and holding up campaign timelines.",
      ],
    },
    {
      id: "section2",
      nav: "The Challenge",
      kicker: "02 — The Challenge",
      title: "Manual review couldn't keep up",
      body: [
        "Sponsored content review had to keep pace with campaign volume while staying consistent and defensible across every platform, country, and content format — text, image, and video alike.",
      ],
      cards: {
        variant: "plain",
        items: [
          {
            name: "Slow, unscalable review",
            body: "Manual compliance review of sponsored posts was slow and didn't scale with campaign volume — every campaign queued behind a human bottleneck.",
          },
          {
            name: "Inconsistent judgements",
            body: "Review outcomes varied between reviewers, creating inconsistency across campaigns and real audit risk when decisions were questioned.",
          },
          {
            name: "Rules differ everywhere",
            body: "Rules change by platform and by country — Instagram is not YouTube — making manual cross-referencing of the right market's rules error-prone.",
          },
          {
            name: "Visual content unchecked",
            body: "Images and video were rarely reviewed with the same rigour as text captions, and updating the compliance rulebook itself was a technical, manual process.",
          },
        ],
      },
    },
    {
      id: "section3",
      nav: "The Solution",
      kicker: "03 — The Solution",
      title: "A RAG engine with a human in the loop",
      body: [
        "Soft Suave delivered PostGuard as a RAG-based compliance platform: compliance PDFs are ingested into a searchable knowledge base, and a two-phase AI pipeline — a reasoning step followed by a structured assessment — evaluates every post against the most relevant rules, returning consistent, explainable verdicts in seconds.",
      ],
      cards: {
        variant: "icon",
        items: [
          {
            name: "Compliance Analysis Engine",
            body: "Every submitted post — text, images and video — is judged against the right platform's and country's rules, returning APPROVED, PLEDGE or REJECTED with a confidence score, cited violations and a full analysis breakdown.",
          },
          {
            name: "Multi-Mode AI Chat Assistant",
            body: "A FAQ assistant answers compliance questions grounded in the knowledge base, Post Planner plans compliant posts with live web search, and All Rounder classifies each question and routes it to the right mode automatically.",
          },
          {
            name: "Plain-English Rule Management",
            body: "Admins add, update or delete rules in free text; the system semantically matches the request against existing rules and generates a structured change proposal that takes effect only after explicit admin review and approval.",
          },
        ],
      },
      quote:
        "\"Every sponsored post judged in seconds against the right market's rules — explainable, auditable and always under human control.\"",
    },
    {
      id: "section4",
      nav: "Key Feature",
      kicker: "04 — Key Features",
      title: "Twelve capabilities, one platform",
      body: [
        "The platform integrates a two-phase AI analysis pipeline, semantic rule retrieval, and multimodal review into a unified system. These capabilities enable consistent, explainable compliance verdicts and governed rule management across every campaign.",
      ],
      list: [
        "Two-Phase AI Analysis Pipeline",
        "Tri-State Verdicts with Confidence Scores",
        "Semantic Rule Retrieval (RAG)",
        "Multimodal Analysis (Text, Image, Video)",
        "PDF Rulebook Ingestion & Semantic Chunking",
        "Multi-Mode AI Chat Assistant",
        "Real-Time Streaming Responses",
        "Human-in-the-Loop Rule Approvals",
        "Platform- & Country-Specific Rules",
        "Result Caching & Duplicate Handling",
        "Token Usage & Cost Estimation",
        "Rate Limiting & Graceful Degradation",
      ],
      image: {
        src: `${IMG}/platform.webp`,
        width: 1679,
        height: 937,
        alt: "PostGuard pipeline: text, image and video posts flow through AI content analysis against the compliance rulebook to rule checks and a final verdict on the Compliance Check screen",
        blurDataURL:
          "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAAAQAgCdASoQAAkABUB8JYwCdAEfp0jjIuYAAP7vY1/J2MdGpISXR2+lozcnRteWUzwAYtIdwkZKvtU6jAtMj3M5b9agAA==",
      },
    },
    {
      id: "section5",
      nav: "Results & Impact",
      kicker: "05 — Results & Impact",
      title: "Built to move compliance from days to seconds",
      body: [
        "PostGuard had to be more than accurate — it had to be defensible, replacing days-long manual review with an explainable, auditable AI-driven process that scales with campaign volume.",
      ],
      stats: [
        { value: "67%", label: "Faster document review reported for comparable GenAI review deployments" },
        { value: "42–68%", label: "Operational cost reduction reported for automated compliance processes" },
        { value: "90%+", label: "AI review accuracy achieved in benchmark GenAI document-review programmes" },
        { value: "20×", label: "Daily review throughput versus manual processing in benchmark automation deployments" },
      ],
    },
    {
      id: "section6",
      nav: "Why Soft Suave",
      kicker: "06 — Why Soft Suave",
      title: "Explainable AI, governed end to end",
      body: [
        "PostGuard had to be more than accurate — it had to be defensible. Soft Suave engineered explainability and governance into every layer: verdicts grounded in retrieved rules with cited violations, a PLEDGE state and confidence scores routing uncertain cases to humans, rule changes and verdicts persisted for audit and dispute resolution, and an async-first architecture that keeps the core compliance check available even when optional services degrade — with per-request token tracking and model-level cost estimates keeping AI spend transparent.",
      ],
    },
  ],

  download: {
    navLabel: "Download",
    body: "Download this practical case study to learn how PostGuard automatically evaluates sponsored influencer content against an organisation's ingested compliance rulebook — returning a clear, cited verdict in seconds.",
    label: "Download Case Study",
    pdf: PDF,
    fileName: "PostGuard_Case_Study.pdf",
    requirement:
      "Case study download: requested the PostGuard case study (An AI-Powered Compliance Analysis Platform for Influencer Marketing) PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – PostGuard",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the PostGuard case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(postGuardMeta.path),
};
