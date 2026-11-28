import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-ai-powered-business-intelligence-insights` — softsuave.com's
 * AI-Powered Business Intelligence Insights case study
 * (https://www.softsuave.com/case-study-ai-powered-business-intelligence-insights),
 * rebuilt on the site's case-study template the way
 * `smart-warranty-document-management.ts` is (one of live's On-Demand
 * short-form case studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Overview" and
 * "Client Requirements" point lists (the requirements keep live's bold
 * lead-in labels), the "Industry" line, the "View Full Case Study" button and
 * the related-case-study heading. The H1 is set the way the
 * Vehicle Intelligence hero is, with no hero image (live's page has none),
 * "Industry" is the hero's fact, and the two lists are sections (`section1`,
 * `section2` — live has no ids). The PDF is live's, self-hosted at live's path
 * (`public/assets/case-studies/chat-for-ai.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const businessIntelligenceMeta = {
  path: "/case-study-ai-powered-business-intelligence-insights",
  /** Live's `<title>`, verbatim. */
  title: "AI-Powered Business Intelligence Insights [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "See how fine-tuning a large language model enabled natural language interaction with databases, automating reporting and enhancing business intelligence efficiency.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/chat-for-ai.pdf";

export const businessIntelligenceCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["AI-Powered Business", "Intelligence Insights"],
    accent: "AI-Powered Business",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "On-Demand" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(businessIntelligenceMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Overview",
      title: "Overview",
      list: [
        "The project focused on enhancing business intelligence through a fine-tuned large language model (LLM), enabling users to interact with databases and generate reports using natural language.",
        "By understanding the database schema and curating quality training data, the system delivers accurate, context-aware insights and simplifies data access for business users.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        {
          lead: "Tailored Reports: ",
          text: "Generates tailored reports based on user-defined time ranges, filters, and grouping criteria.",
        },
        {
          lead: "Data Visualizations: ",
          text: "Creates charts and graphs from user queries for clear data visualization.",
        },
        {
          lead: "On-Demand Query Execution: ",
          text: "Converts natural language queries into SQL to quickly fetch relevant data.",
        },
        {
          lead: "Real-Time Insights: ",
          text: "Provides real-time answers and reports, enhancing decision-making speed and accuracy.",
        },
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Overview and Client Requirements — no claim
    // the case study doesn't make.
    body: "Download the full case study to see how a fine-tuned LLM turned plain-English questions into SQL, reports and charts, giving business users real-time insights.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "chat-for-ai.pdf",
    requirement: "Case study download: requested the AI-Powered Business Intelligence Insights case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – AI-Powered Business Intelligence Insights",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the AI-Powered Business Intelligence Insights case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(businessIntelligenceMeta.path),
};
