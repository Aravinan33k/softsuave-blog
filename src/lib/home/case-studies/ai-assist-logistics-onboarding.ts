import type { CaseStudyContent } from "@/components/case-study/case-study";
import { HERO_PLATFORM_ICONS as P, platformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-ai-assist-logistics-onboarding` — softsuave.com's AI Assist
 * case study (https://www.softsuave.com/case-study-ai-assist-logistics-onboarding),
 * rebuilt on the site's case-study template the way `vehicle-intelligence.ts`
 * is.
 *
 * Every line of copy is the live page's, verbatim: hero (including its H1
 * sub-tag "for a Logistics Management Platform"), the six numbered sections
 * and their cards, the pull quote, the twelve features, the four figures, the
 * download panel and modal, and the related-case-study heading. Live's Results section
 * has no intro paragraph, so neither does this one. Section ids are live's
 * (`#section1`…`#section6`). The images and the PDF are live's, self-hosted
 * (`public/images/case-studies/ai-assist-logistics-onboarding/`,
 * `public/assets/case-studies/`); the PDF keeps live's path.
 *
 * Not carried over: the hero image's `alt="health-care"`, and live's `<title>`
 * "AI Assist Logistics Onboarding | Case Study", set here in the case-study
 * pages' own "… Case Study | Soft Suave" form — see `aiAssistMeta`.
 */

export const aiAssistMeta = {
  path: "/case-study-ai-assist-logistics-onboarding",
  title: "AI Assist Logistics Onboarding Case Study",
  /** Live's meta description, verbatim. */
  description:
    "See how Soft Suave built AI Assist, an AI-powered onboarding and configuration assistant embedded in a logistics management platform, guiding users through setup and validating inputs in real time.",
} as const;

const IMG = "/images/case-studies/ai-assist-logistics-onboarding";
const PDF = "/assets/case-studies/AI_Assist_Logistics_Case_Study.pdf";

export const aiAssistCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1 — plain, highlighted, then the smaller sub-tag — set as one
    // headline line over the sub-tag, as the Vehicle Intelligence hero is.
    titleLines: ["AI Powered Onboarding and Configuration Assist", "for a Logistics Management Platform"],
    accent: "and Configuration Assist",
    titleSubLast: true,
    body: [
      "An always-available AI assistant embedded in a logistics management platform — guiding users through account creation, warehouse configuration, carrier connections, integrations and subscription setup, detecting skipped steps and validating inputs in real time so every customer reaches a complete, correct configuration faster.",
    ],
    points: [],
    facts: [
      { label: "Industry :", value: "Logistics" },
      platformFact([P.Web]),
    ],
    aside: {
      src: `${IMG}/dashboard.webp`,
      width: 1536,
      height: 1024,
      alt: "AI Assist onboarding chatbot inside the logistics management platform, guiding a user through setup",
      blurDataURL:
        "data:image/webp;base64,UklGRs4AAABXRUJQVlA4WAoAAAAQAAAADwAACgAAQUxQSFEAAAABcBXbttOgBoQxCMFWqoZXLeRhIdx9fl6zEBET8PiVq1tKub4ekySEAIveGv3kpvwQKPl7SErub0hCEojkb1O/ASOQ9rOOEM/6WOr1nfN7W2oAVlA4IFYAAADwAQCdASoQAAsAA4BaJYgAAuiu56JB2GAA/q32QdrL7OXXUDvROmkMaYKw4962y506O9ZLBhaXmTC8vsfXOFkHDs0t2r7WvWje4fNwbf9xWsNxXZAAAA==",
    },
    image: {
      src: `${IMG}/hero-bg.webp`,
      width: 1672,
      height: 941,
      // Decorative backdrop: the dashboard beside the copy is the hero's image.
      alt: "",
      blurDataURL: "data:image/webp;base64,UklGRiYAAABXRUJQVlA4IBoAAAAwAQCdASoQAAkAA4BaJaQAA3AA/vUqeAAAAA==",
    },
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "About the Client",
      kicker: "01 — About the Client",
      title: "Supply chains at scale, from retail to automotive",
      body: [
        "The client operates in the global logistics and transportation sector, providing comprehensive supply chain solutions across industries such as retail, automotive and consumer goods. Serving both large enterprises and SMEs, with a strong presence in North America and Europe, the client is known for operational efficiency, reliability and its ability to optimise supply chains. Their logistics management platform is the front door for every new customer — which made slow, confusing onboarding a direct brake on growth.",
      ],
    },
    {
      id: "section2",
      nav: "The Challenge",
      kicker: "02 — The Challenge",
      title: "Onboarding was slowing every new customer down",
      body: [
        "Getting a new customer live on the platform meant navigating multiple configurations with little guidance — and every gap in that journey either surfaced as a support ticket or, worse, as an operational issue further down the line.",
      ],
      cards: {
        variant: "plain",
        items: [
          {
            name: "Complex onboarding",
            body: "Users faced multiple configurations without sufficient guidance, leading to delays before the platform could deliver any value.",
          },
          {
            name: "Support overload",
            body: "Support teams handled excessive setup and configuration queries, pulling effort away from higher-value customer work.",
          },
          {
            name: "Incomplete setup",
            body: "Critical steps were often skipped during configuration, surfacing later as operational issues in live logistics workflows.",
          },
          {
            name: "No progress visibility",
            body: "There was no system to track user progress through setup or to identify where customers were getting stuck.",
          },
        ],
      },
    },
    {
      id: "section3",
      nav: "The Solution",
      kicker: "03 — The Solution",
      title: "An assistant that gets every user to done",
      body: [
        "Soft Suave integrated AI Assist into the client's logistics management platform as a floating, always-available in-app chatbot — guiding users through every critical setup step, detecting skipped steps, validating inputs in real time, and drawing on platform documentation and historical usage to answer questions in context.",
      ],
      cards: {
        variant: "icon",
        items: [
          {
            name: "Guided Onboarding Chatbot",
            body: "Walks users step by step through account creation, warehouse setup, carrier connections, integrations, user management and subscription setup — always available inside the product, right where the work happens.",
          },
          {
            name: "Smart Validation & Nudges",
            body: "Detects skipped steps, validates user inputs as they're entered and proactively prompts users to complete configurations — catching gaps before they become operational issues.",
          },
          {
            name: "Context-Aware Answers",
            body: "Pulls relevant guidance from platform documentation and historical usage, so contextual help reflects both how the product works and how users actually configure it.",
          },
        ],
      },
      quote:
        "\"Static support became proactive, contextual AI guidance — faster user activation, more accurate configurations and less overhead for support teams.\"",
    },
    {
      id: "section4",
      nav: "Key Feature",
      kicker: "04 — Key Features",
      title: "Twelve capabilities, one platform",
      body: [
        "AI Assist combines a guided in-app chatbot, real-time validation, and documentation-grounded answers into a single onboarding layer. These capabilities help every new customer reach a complete, correct configuration faster, with administrators gaining full visibility into the process.",
      ],
      list: [
        "Floating In-App AI Chatbot",
        "Guided Account & Warehouse Setup",
        "Carrier Connection Guidance",
        "User Management & Subscription Setup",
        "Skipped-Step Detection",
        "Real-Time Input Validation",
        "Grounded in Platform Documentation",
        "Learns from Historical Usage",
        "Proactive Configuration Prompts",
        "Smart Shipping Automation (ERP Write-Back)",
        "Advanced Shipping Rule Engine",
        "Secure Multi-Tenant Access (RBAC)",
      ],
      image: {
        src: `${IMG}/platform.webp`,
        width: 1563,
        height: 872,
        alt: "AI Assist logistics onboarding platform interface",
        blurDataURL:
          "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADwAQCdASoQAAkAA4BaJQBOgCIj+spal0AA/viSdze6gzxDeShzJMpdMq4jumIgDRGIPcObZNHgAA==",
      },
    },
    {
      id: "section5",
      nav: "Results & Impact",
      kicker: "05 — Results & Impact",
      title: "Faster activation, fewer tickets, cleaner setups",
      stats: [
        { value: "50%", label: "Reduction in onboarding time for new platform customers" },
        { value: "40%", label: "Lower support ticket volume for setup and configuration queries" },
        { value: "30%", label: "Improvement in configuration accuracy across critical setup steps" },
        { value: "25%", label: "Better visibility into user progress for administrators" },
      ],
    },
    {
      id: "section6",
      nav: "Why Soft Suave",
      kicker: "06 — Why Soft Suave",
      title: "Applied AI that ships inside real products",
      body: [
        "This engagement wasn't a standalone chatbot — it was AI embedded inside a live logistics platform used by enterprises and SMEs across North America and Europe. Soft Suave designed AI Assist to work the way the product works: grounded in the platform's own documentation and usage history, aware of each user's setup state, validating real inputs in real time, and nudging users forward without getting in their way. The result replaced static support with proactive guidance — and laid a foundation for future AI enhancements driven by automation and data-driven learning.",
      ],
    },
  ],

  download: {
    navLabel: "Download",
    body: "Download this practical case study to learn how our AI-powered onboarding assistant guides every new customer through setup, validates inputs in real time, and cuts support overhead for logistics platforms.",
    label: "Download Case Study",
    pdf: PDF,
    fileName: "AI_Assist_Logistics_Case_Study.pdf",
    requirement:
      "Case study download: requested the AI Assist Logistics Onboarding case study (AI Powered Onboarding and Configuration Assist for a Logistics Management Platform) PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – AI Assist Logistics Onboarding",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the AI Assist Logistics Onboarding case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(aiAssistMeta.path),
};
