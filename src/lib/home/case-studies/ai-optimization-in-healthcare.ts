import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-ai-optimization-in-healthcare` — softsuave.com's AI
 * Optimization in Healthcare case study
 * (https://www.softsuave.com/case-study-ai-optimization-in-healthcare),
 * rebuilt on the site's case-study template the way
 * `subscription-management-for-customer-growth.ts` is (one of live's
 * short-form case studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Client
 * Overview" and "Client Requirements" point lists (the requirements keep
 * live's bold lead-in labels), the "Industry" line, the "View Full Case
 * Study" button and the related-case-study heading. As on the
 * Subscription Management page, the H1 is set the way the Vehicle
 * Intelligence hero is, with no hero image (live's page has none), "Industry"
 * is the hero's fact, and the two lists are sections (`section1`, `section2`
 * — live has no ids). The PDF is live's, self-hosted at live's path
 * (`public/assets/case-studies/revitalizing-ai-in-healthcare.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 */

export const aiHealthcareMeta = {
  path: "/case-study-ai-optimization-in-healthcare",
  /** Live's `<title>`, verbatim. */
  title: "AI Optimization in Healthcare [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "See how Soft Suave enhanced AI performance for a healthcare platform, improving speed, accuracy, and reliability in critical clinical operations.",
} as const;

const PDF = "/assets/case-studies/revitalizing-ai-in-healthcare.pdf";

export const aiHealthcareCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["AI Optimization", "in Healthcare"],
    accent: "AI Optimization",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "Healthtech" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(aiHealthcareMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      list: [
        "The client is a healthcare technology company founded in 2020, specializing in artificial intelligence to improve healthcare management.",
        "They serve hospitals and insurers, focusing on AI-driven solutions for post-discharge patient care and management, and healthcare process optimization.",
        "They partnered with us to optimize their infrastructure for enhanced efficiency, scalability, and seamless healthcare service delivery.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        {
          lead: "Performance Optimization - ",
          text: "Improve system speed and reduce API response times for seamless user interactions.",
        },
        {
          lead: "Database Optimization - ",
          text: "Restructure the database for faster queries and improved data retrieval.",
        },
        {
          lead: "Scalability Enhancement - ",
          text: "Ensure the platform handles growing traffic without performance loss.",
        },
        {
          lead: "Efficient API Management - ",
          text: "Optimize API calls and integrations for efficient data processing and communication.",
        },
        {
          lead: "Enhanced User Experience - ",
          text: "Improve navigation, reduce lag, and enhance interface responsiveness for users.",
        },
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Client Overview and Client Requirements — no
    // claim the case study doesn't make.
    body: "Download the full case study to see how we optimized an AI healthcare platform's performance, database and APIs to scale with growing traffic for hospitals and insurers.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "revitalizing-ai-in-healthcare.pdf",
    requirement: "Case study download: requested the AI Optimization in Healthcare case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – AI Optimization in Healthcare",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the AI Optimization in Healthcare case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(aiHealthcareMeta.path),
};
