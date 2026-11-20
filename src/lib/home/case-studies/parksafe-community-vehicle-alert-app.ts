import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-parksafe-community-vehicle-alert-app` — softsuave.com's
 * ParkSafe Community Vehicle Alert App case study
 * (https://www.softsuave.com/case-study-parksafe-community-vehicle-alert-app),
 * rebuilt on the site's case-study template the way
 * `smart-warranty-document-management.ts` is (one of live's short-form case
 * studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Overview" and
 * "Client Requirements" point lists, the "Industry" line, the "View Full Case
 * Study" button and the related-case-study heading. As on the
 * other short-form pages, the H1 is set the way the Vehicle Intelligence hero
 * is, with no hero image (live's page has none), "Industry" is the hero's
 * fact, and the two lists are sections (`section1`, `section2` — live has no
 * ids). The PDF is live's, self-hosted at live's path
 * (`public/assets/case-studies/parkinghero.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const parkSafeMeta = {
  path: "/case-study-parksafe-community-vehicle-alert-app",
  /** Live's `<title>`, verbatim. */
  title: "ParkSafe Community Vehicle Alert App [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Discover how a QR-enabled web app empowers communities to report parked vehicle issues, enhancing safety and reducing costs for car owners with real-time SMS alerts and anonymous reporting.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/parkinghero.pdf";

export const parkSafeCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["ParkSafe Community", "Vehicle Alert App"],
    accent: "ParkSafe",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "Logistics" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(parkSafeMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Overview",
      title: "Overview",
      list: [
        "This web app helps vehicle owners stay informed about issues like tickets, towing, or damage through community-supported reports.",
        "Using secure QR codes and anonymous alerts, it improves parking safety and management.",
        "Designed for cities, communities, and businesses, the solution offers real-time notifications and an easy-to-use interface for both owners and passersby.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "Complete web app with real-time vehicle issue alerts.",
        "SMS notifications to inform owners immediately.",
        "QR code system for effortless, anonymous reporting.",
        "Community engagement features to reward helpful users.",
        "Clean, intuitive interface for all user types (owners and reporters).",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Overview and Client Requirements — no claim
    // the case study doesn't make.
    body: "Download the full case study to see how QR codes, anonymous reports and real-time SMS alerts keep vehicle owners informed about tickets, towing and damage.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "parkinghero.pdf",
    requirement: "Case study download: requested the ParkSafe Community Vehicle Alert App case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – ParkSafe Community Vehicle Alert App",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the ParkSafe Community Vehicle Alert App case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(parkSafeMeta.path),
};
