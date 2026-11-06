import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-centralized-shipment-tracking` — softsuave.com's Centralized
 * Shipment Tracking case study
 * (https://www.softsuave.com/case-study-centralized-shipment-tracking),
 * rebuilt on the site's case-study template the way
 * `parksafe-community-vehicle-alert-app.ts` is (one of live's short-form case
 * studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Client
 * Overview" and "Client Requirements" point lists, the "Industry" line, the
 * "View Full Case Study" button and the related-case-study heading. That includes "realtime" and "carrieragnostic", which live prints
 * without their hyphens. As on the other short-form pages, the H1 is set the
 * way the Vehicle Intelligence hero is, with no hero image (live's page has
 * none), "Industry" is the hero's fact, and the two lists are sections
 * (`section1`, `section2` — live has no ids). The PDF is live's, self-hosted
 * at live's path
 * (`public/assets/case-studies/shipment-tracking-for-global-logistics.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const shipmentTrackingMeta = {
  path: "/case-study-centralized-shipment-tracking",
  /** Live's `<title>`, verbatim. */
  title: "Centralized Shipment Tracking Platform [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "See how Soft Suave improved global logistics by developing a centralized shipment tracking system that enhanced visibility, accuracy, and delivery speed.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/shipment-tracking-for-global-logistics.pdf";

export const shipmentTrackingCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Centralized", "Shipment Tracking"],
    accent: "Centralized",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "Logistics" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(shipmentTrackingMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      list: [
        "Our client offers a cloud-based logistics platform that enhances freight visibility and control.",
        // Live's wording — "realtime" and "carrieragnostic" unhyphenated.
        "It integrates data to streamline operations, featuring realtime tracking, automated cost management, and workflow automation.",
        "Advanced tools like predictive ETAs and freight auditing improve coordination and reduce costs.",
        "Its flexible, carrieragnostic design ensures seamless system compatibility.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "Shipment Consolidation",
        "Advanced Data Extraction",
        "Scalable Database",
        "Comprehensive Modules",
        "Real-time Tracking",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Client Overview and Client Requirements — no
    // claim the case study doesn't make.
    body: "Download the full case study to see how a cloud logistics platform consolidates shipments, extracts data at scale and tracks freight in real time.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "shipment-tracking-for-global-logistics.pdf",
    requirement: "Case study download: requested the Centralized Shipment Tracking case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Centralized Shipment Tracking",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Centralized Shipment Tracking case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(shipmentTrackingMeta.path),
};
