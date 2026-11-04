import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-digitizing-product-inspections` — softsuave.com's Digitizing
 * Product Inspections case study
 * (https://www.softsuave.com/case-study-digitizing-product-inspections),
 * rebuilt on the site's case-study template the way
 * `saas-platform-for-corporate-banking.ts` is (one of live's short-form case
 * studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Overview" and
 * "Client Requirements" point lists, the "Industry" line, the "View Full Case
 * Study" button and the related-case-study heading — "errorprone" included,
 * as live prints it. As on the other short-form pages, the H1 is set the way
 * the Vehicle Intelligence hero is, with no hero image (live's page has
 * none), "Industry" is the hero's fact, and the two lists are sections
 * (`section1`, `section2` — live has no ids). The PDF is live's, self-hosted
 * at live's path
 * (`public/assets/case-studies/standardize-product-inspection.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * Related lane: the shared, position-based one (`related.ts`) — the
 * previous study and the next four in the case-study listing.
 */

export const productInspectionsMeta = {
  path: "/case-study-digitizing-product-inspections",
  /** Live's `<title>`, verbatim. */
  title: "Digitizing Product Inspections [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Discover how Soft Suave replaced manual processes with a digital inspection platform to standardize product checks and boost operational efficiency.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/standardize-product-inspection.pdf";

export const productInspectionsCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Digitizing", "Product Inspections"],
    accent: "Digitizing",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "Manufacturing" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(productInspectionsMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Overview",
      title: "Overview",
      list: [
        // Live's wording, "errorprone" included.
        "Traditional factory inspections were manual, time-consuming, and errorprone.",
        "Our solution, a mobile-first inspection app, digitizes the entire process by enabling real-time tracking, barcode-based product validation, automated reporting, and structured grievance management.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "The client needed a digital solution to replace manual factory inspections that enables real-time tracking, barcode-based product validation, and automated compliance reporting.",
        "They required a centralized system to standardize audit processes, ensure accurate product verification, and simplify issue resolution.",
        "The solution had to be user-friendly for field inspectors, provide instant data updates, and allow admins to monitor audits, assign tasks, and manage reports efficiently.",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Overview and Client Requirements — no claim
    // the case study doesn't make.
    body: "Download the full case study to see how a mobile-first app replaced manual factory inspections with barcode validation, real-time tracking and automated reports.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "standardize-product-inspection.pdf",
    requirement: "Case study download: requested the Digitizing Product Inspections case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Digitizing Product Inspections",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Digitizing Product Inspections case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(productInspectionsMeta.path),
};
