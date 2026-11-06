import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-custom-business-management-platform` — softsuave.com's Custom
 * Business Management Platform case study
 * (https://www.softsuave.com/case-study-custom-business-management-platform),
 * rebuilt on the site's case-study template the way
 * `smart-warranty-document-management.ts` is (one of live's On-Demand
 * short-form case studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Client
 * Overview" and "Client Requirements" point lists (the requirements keep
 * live's bold lead-in labels), the "Industry" line, the "View Full Case Study"
 * button and the related-case-study heading — live's slips
 * included ("end-toend", "checkins", the first requirement's missing full
 * stop). The one liberty: live runs four of its bold labels straight into
 * their text with no space (`<b>Employee Tracking</b>Integrates…`, which
 * reads "Employee TrackingIntegrates"); here each label is followed by a
 * space. No words are added. The H1 is set the way the Vehicle Intelligence
 * hero is, with no hero image (live's page has none), "Industry" is the
 * hero's fact, and the two lists are sections (`section1`, `section2` — live
 * has no ids). The PDF is live's, self-hosted at live's path
 * (`public/assets/case-studies/business-operations-with-custom-management-platform.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const businessManagementMeta = {
  path: "/case-study-custom-business-management-platform",
  /** Live's `<title>`, verbatim — "| Case Study", not the "[Case Study]" its siblings use. */
  title: "Custom Business Management Platform | Case Study",
  /** Live's meta description, verbatim. */
  description:
    "Discover how Soft Suave transformed business operations with a custom management platform, improving efficiency, scalability, and workflow optimization.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/business-operations-with-custom-management-platform.pdf";

export const businessManagementCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Custom Business", "Management Platform"],
    accent: "Custom Business",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "On-Demand" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(businessManagementMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      list: [
        "Our client provides advanced smart metering solutions, including prepaid systems, turnkey projects, and end-toend AMI solutions.",
        "They specialize in modular smart meters with wireless reading and smart grid support, enabling real-time energy monitoring.",
        "They also offer consulting, installation, and smart infrastructure implementation services for utilities.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        {
          lead: "Integrated Business Solution - ",
          text: "Shift from costly, rigid systems to a unified, cost-effective platform for savings",
        },
        {
          lead: "Integrated Business Solution Customer Relations and ticketing ",
          text: "A system to manage customer interactions, ticketing, and optimize collections.",
        },
        {
          lead: "Project Planning & Tracking ",
          text: "Manages project milestones, timesheets, and billing efficiently.",
        },
        {
          lead: "Employee Tracking ",
          text: "Integrates location-based checkins for accurate tracking and accountability.",
        },
        {
          lead: "Web and Mobile Accessibility ",
          text: "The platform should offer web and mobile access with real-time data sync for flexibility.",
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
    body: "Download the full case study to see how one platform brought CRM, ticketing, project tracking and employee check-ins together for a smart metering company.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "business-operations-with-custom-management-platform.pdf",
    requirement: "Case study download: requested the Custom Business Management Platform case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Custom Business Management Platform",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Custom Business Management Platform case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(businessManagementMeta.path),
};
