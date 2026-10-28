import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-project-&-compliance-workflow-transformation` — softsuave.com's
 * Project & Compliance Workflow Transformation case study
 * (https://www.softsuave.com/case-study-project-&-compliance-workflow-transformation),
 * rebuilt on the site's case-study template the way
 * `smart-warranty-document-management.ts` is (one of live's short-form case
 * studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Client
 * Overview" and "Client Requirements" point lists, the "Industry" line, the
 * "View Full Case Study" button and the related-case-study heading. That includes the Overview's third point ("…overbooked tables,
 * mismanaged orders…"), which live carries over from its Restaurant Workflow
 * page. As on the other short-form pages, the H1 is set the way the Vehicle
 * Intelligence hero is, with no hero image (live's page has none), "Industry"
 * is the hero's fact, and the two lists are sections (`section1`, `section2`
 * — live has no ids). The PDF is live's, self-hosted at live's path
 * (`public/assets/case-studies/transformed-project-workflows.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const projectComplianceMeta = {
  path: "/case-study-project-&-compliance-workflow-transformation",
  /** Live's `<title>`, verbatim. */
  title: "Project & Compliance Workflow Transformation [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "See how Soft Suave streamlined complex project workflows and automated compliance management to improve accuracy, tracking, and operational efficiency.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/transformed-project-workflows.pdf";

export const projectComplianceCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Project & Compliance", "Workflow Transformation"],
    accent: "Project & Compliance",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "On-Demand" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(projectComplianceMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      list: [
        "The client is a leading business process outsourcing (BPO) advisory firm, helping businesses optimize customer support, sales, and back-office operations.",
        "Their operations include overseeing construction-related projects, ensuring compliance with local building regulations, and managing internal teams responsible for project coordination and permit approvals.",
        "Their outdated system relied on manual processes, causing issues like overbooked tables, mismanaged orders, and poor communication.",
        "To maintain high standards of operational efficiency and compliance, they required a robust, scalable system to manage their workflows effectively.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "Automated permit & Compliance tracking",
        "Robust project & Client management",
        "Proposal & Scope of work management",
        "Time tracking & Employee allocation",
        "Dynamic reporting & Insights",
        "Customizable template builder",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Client Overview and Client Requirements — no
    // claim the case study doesn't make.
    body: "Download the full case study to see how we gave a BPO advisory firm one scalable system for permits, compliance, projects, proposals, time tracking and reporting.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "transformed-project-workflows.pdf",
    requirement: "Case study download: requested the Project & Compliance Workflow Transformation case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Project & Compliance Workflow Transformation",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Project & Compliance Workflow Transformation case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(projectComplianceMeta.path),
};
