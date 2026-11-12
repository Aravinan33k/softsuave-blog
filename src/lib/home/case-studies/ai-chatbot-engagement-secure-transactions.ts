import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-ai-chatbot-for-engagement-and-secure-transactions` —
 * softsuave.com's AI Chatbot for Engagement and Secure Transactions case study
 * (https://www.softsuave.com/case-study-ai-chatbot-for-engagement-and-secure-transactions),
 * rebuilt on the site's case-study template the way
 * `smart-warranty-document-management.ts` is (one of live's On-Demand
 * short-form case studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Overview" and
 * "Client Requirements" point lists, the "Industry" line, the "View Full Case
 * Study" button and the related-case-study heading. The H1 is
 * set the way the Vehicle Intelligence hero is, with no hero image (live's
 * page has none), "Industry" is the hero's fact, and the two lists are
 * sections (`section1`, `section2` — live has no ids). The PDF is live's,
 * self-hosted at live's path (`public/assets/case-studies/eaglebot.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const aiChatbotMeta = {
  path: "/case-study-ai-chatbot-for-engagement-and-secure-transactions",
  /** Live's `<title>`, verbatim. */
  title: "AI Chatbot for Engagement and Secure Transactions [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Discover how an AI-powered chatbot enhances user engagement with intelligent content, secure authentication, API integration, and smooth payment processing.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/eaglebot.pdf";

export const aiChatbotCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["AI Chatbot", "for Engagement and Secure Transactions"],
    accent: "AI Chatbot",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "On-Demand" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(aiChatbotMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Overview",
      title: "Overview",
      list: [
        "This project features a sophisticated AI chatbot built to automate interactions and streamline user experiences.",
        "Integrated with third-party APIs and cloud platforms, the chatbot supports secure login, payment handling, and AI-generated content.",
        "Designed for scalability and ease of use, it brings together automation and personalization in a modern, web-based interface.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "Seamless integration with external APIs and services",
        "Secure user authentication system",
        "Reliable payment processing functionality",
        "Landing page for app downloads and customer support",
        "AI-powered content and image generation",
        "Scalable infrastructure for flexible deployment",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Overview and Client Requirements — no claim
    // the case study doesn't make.
    body: "Download the full case study to see how we built an AI chatbot with secure login, payment handling and AI content generation on a scalable, integrated platform.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "eaglebot.pdf",
    requirement: "Case study download: requested the AI Chatbot for Engagement and Secure Transactions case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – AI Chatbot for Engagement and Secure Transactions",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the AI Chatbot for Engagement and Secure Transactions case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(aiChatbotMeta.path),
};
