import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-tech-driven-workforce-development-platform` — softsuave.com's
 * Tech-Driven Workforce Development Platform case study
 * (https://www.softsuave.com/case-study-tech-driven-workforce-development-platform),
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
 * self-hosted at live's path (`public/assets/case-studies/tnsdc.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const workforceDevelopmentMeta = {
  path: "/case-study-tech-driven-workforce-development-platform",
  /** Live's `<title>`, verbatim. */
  title: "Tech-Driven Workforce Development Platform [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Discover how a digital platform transformed skill development with end-to-end training, assessment, and placement management across web and mobile apps.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/tnsdc.pdf";

export const workforceDevelopmentCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Tech-Driven Workforce", "Development Platform"],
    accent: "Tech-Driven Workforce",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "On-Demand" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(workforceDevelopmentMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Overview",
      title: "Overview",
      list: [
        "This project focused on building a modern platform for workforce development aimed at enhancing employability through industry-relevant training programs.",
        "The system supports complete candidate lifecycle management—from enrollment and training to assessment and placement—via integrated web and mobile applications, improving operational efficiency and accessibility for all stakeholders.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "End-to-end skill development and program management",
        "Scalable, secure, and high-performance infrastructure",
        "Intelligent candidate evaluation and employment mapping",
        "User-friendly dashboards and reporting tools",
        "Smooth integration with third-party systems",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Overview and Client Requirements — no claim
    // the case study doesn't make.
    body: "Download the full case study to see how we built a web and mobile platform that manages every candidate from enrollment and training to assessment and placement.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "tnsdc.pdf",
    requirement: "Case study download: requested the Tech-Driven Workforce Development Platform case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Tech-Driven Workforce Development Platform",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Tech-Driven Workforce Development Platform case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(workforceDevelopmentMeta.path),
};
