import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-ai-powered-multi-cloud-management` — softsuave.com's
 * AI-Powered Multi-Cloud Management case study
 * (https://www.softsuave.com/case-study-ai-powered-multi-cloud-management),
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
 * (`public/assets/case-studies/montycloud.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const multiCloudMeta = {
  path: "/case-study-ai-powered-multi-cloud-management",
  /** Live's `<title>`, verbatim. */
  title: "AI-Powered Multi-Cloud Management [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Explore how AI-driven automation enhanced multi-cloud efficiency, security, and cost optimization with centralized control, compliance, and scalable integration.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/montycloud.pdf";

export const multiCloudCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["AI-Powered Multi-Cloud", "Management"],
    accent: "AI-Powered Multi-Cloud",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "On-Demand" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(multiCloudMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Overview",
      title: "Overview",
      list: [
        "This project involved developing a powerful AI-enabled cloud management platform to streamline multi-cloud operations.",
        "With features like centralized dashboards, policy automation, cost tracking, and security enforcement, the platform helps IT teams reduce complexity, optimize expenses, and ensure compliance.",
        "Designed for scalability and integration, it supports Well-Architected Reviews and multi-tenant environments for maximum flexibility.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        { lead: "Centralized Cloud Management: ", text: "Unified multi-cloud management platform." },
        { lead: "Automation of Cloud Operations: ", text: "AI-driven provisioning, security, and compliance." },
        { lead: "Cost Optimization: ", text: "Real-time monitoring and cost-reduction tools." },
        { lead: "Security & Compliance: ", text: "Automated regulatory adherence for standards." },
        { lead: "Multi-Tenancy Support: ", text: "Multi-org management with custom billing." },
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Overview and Client Requirements — no claim
    // the case study doesn't make.
    body: "Download the full case study to see how we built an AI cloud management platform that automates operations, cuts costs and enforces security and compliance.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "montycloud.pdf",
    requirement: "Case study download: requested the AI-Powered Multi-Cloud Management case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – AI-Powered Multi-Cloud Management",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the AI-Powered Multi-Cloud Management case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(multiCloudMeta.path),
};
