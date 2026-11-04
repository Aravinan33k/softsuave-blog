import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-streamlining-publication-workflows-with-integrated-tracking` —
 * softsuave.com's Streamlining Publication Workflows case study
 * (https://www.softsuave.com/case-study-streamlining-publication-workflows-with-integrated-tracking),
 * rebuilt on the site's case-study template the way
 * `subscription-management-for-customer-growth.ts` is (one of live's
 * short-form case studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Client
 * Overview" and "Key Features" point lists, the "Industry" line, the "View
 * Full Case Study" button and the related-case-study heading.
 * As on the Subscription Management page, the H1 is set the way the Vehicle
 * Intelligence hero is, with no hero image (live's page has none), "Industry"
 * is the hero's fact, and the two lists are sections (`section1`, `section2`
 * — live has no ids). The PDF is live's, self-hosted at live's path
 * (`public/assets/case-studies/tnq.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const publicationWorkflowsMeta = {
  path: "/case-study-streamlining-publication-workflows-with-integrated-tracking",
  /** Live's `<title>`, verbatim. */
  title: "Streamlining Publication Workflows with Integrated Tracking [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Discover how a leading scholarly publisher enhanced production efficiency with a centralized system for article and issue tracking, Active Directory integration, and seamless workload management across teams.",
} as const;

const PDF = "/assets/case-studies/tnq.pdf";

export const publicationWorkflowsCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Streamlining Publication Workflows", "with Integrated Tracking"],
    accent: "Publication Workflows",
    titleSubLast: true,
    // The headline is long enough to wrap at the default size; fit it to one
    // line like the other short-form heroes.
    titleFit: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "On-Demand" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(publicationWorkflowsMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      list: [
        "The client is a prominent publishing organisation focused on scholarly content, specifically articles and issues.",
        "Their production department needed a unified platform to manage and monitor workflows for multiple publications efficiently.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Key Features",
      title: "Key Features",
      list: [
        "Centralized tracking for article and issue production.",
        "Seamless integration with Active Directory for secure user authentication.",
        "Automated daily data imports from the Snowflake data source.",
        "Task assignment and milestone progress tracking for articles and issues.",
        "Comprehensive user and journal management features.",
        "Role-based access control to ensure data security.",
        "Tools to facilitate balanced workload distribution across production teams.",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Client Overview and Key Features — no claim
    // the case study doesn't make.
    body: "Download the full case study to see how we gave a scholarly publisher one platform to track articles and issues, assign tasks and balance team workloads.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "tnq.pdf",
    requirement:
      "Case study download: requested the Streamlining Publication Workflows with Integrated Tracking case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Streamlining Publication Workflows with Integrated Tracking",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Streamlining Publication Workflows case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(publicationWorkflowsMeta.path),
};
