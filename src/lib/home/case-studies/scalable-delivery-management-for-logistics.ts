import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-scalable-delivery-mangement-for-logistics` — softsuave.com's
 * Scalable Delivery Management for Logistics case study
 * (https://www.softsuave.com/case-study-scalable-delivery-mangement-for-logistics
 * — live's slug, "mangement" misspelling included), rebuilt on the site's
 * case-study template the way `parksafe-community-vehicle-alert-app.ts` is
 * (one of live's short-form case studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Overview" and
 * "Client Requirements" point lists (the requirements keep live's bold
 * lead-in labels), the "Industry" line, the "View Full Case Study" button and
 * the related-case-study heading. That includes live's typo
 * "endto-end". The first Overview point's closing "Admin, Driver, and Loader."
 * is bold on live; the template's list bolds only a leading label, so the
 * words are kept and the emphasis is not. As on the other short-form pages,
 * the H1 is set the way the Vehicle Intelligence hero is, with no hero image
 * (live's page has none), "Industry" is the hero's fact, and the two lists
 * are sections (`section1`, `section2` — live has no ids). The PDF is live's,
 * self-hosted at live's path
 * (`public/assets/case-studies/scalable-delivery-management-solution.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const deliveryManagementMeta = {
  path: "/case-study-scalable-delivery-mangement-for-logistics",
  /** Live's `<title>`, verbatim. */
  title: "Scalable Delivery Management for Logistics [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Learn how Soft Suave boosted logistics efficiency with a scalable delivery management solution that optimized dispatching, tracking, and real-time coordination.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/scalable-delivery-management-solution.pdf";

export const deliveryManagementCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Scalable Delivery Management", "for Logistics"],
    accent: "Delivery Management",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "Logistics" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(deliveryManagementMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Overview",
      title: "Overview",
      list: [
        // Live bolds "Admin, Driver, and Loader." — see the note above.
        "We built a comprehensive delivery management solution, consisting of a web app and three specialised mobile apps designed for different user roles: Admin, Driver, and Loader.",
        "Each app provides tailored tools to meet the specific needs of its users, ensuring efficient, real-time control over logistics operations.",
        // Live's wording, "endto-end" included.
        "This setup supports endto-end visibility and management across the entire delivery process, allowing users to respond swiftly to issues and maintain high service reliability.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        {
          lead: "System Development - ",
          text: "Needed a custom-built logistics solution from scratch, accessible on both web and mobile.",
        },
        {
          lead: "Real-Time Delivery Tracking - ",
          text: "Required live tracking of shipments to quickly respond to delivery issues.",
        },
        {
          lead: "Alerts & Notifications - ",
          text: "Flexible alerts for delays, damages, and incomplete deliveries to keep the team informed.",
        },
        { lead: "User-Friendly Design - ", text: "Easy, intuitive interfaces for users with minimal training." },
        {
          lead: "Integration Compatibility - ",
          text: "The system must work with existing barcoding, labelling, and logistics tools.",
        },
        { lead: "Scalable & Flexible - ", text: "Adaptable design for future growth and changing needs." },
        {
          lead: "Continuous Improvement - ",
          text: "Built to support updates, with an eye on improving logistics processes.",
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
    body: "Download the full case study to see how a web app and three role-based mobile apps gave admins, drivers and loaders real-time control over every delivery.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "scalable-delivery-management-solution.pdf",
    requirement: "Case study download: requested the Scalable Delivery Management for Logistics case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Scalable Delivery Management for Logistics",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Scalable Delivery Management for Logistics case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(deliveryManagementMeta.path),
};
