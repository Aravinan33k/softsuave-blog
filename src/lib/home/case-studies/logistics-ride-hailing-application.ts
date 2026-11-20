import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-logistics-ride-hailing-application` — softsuave.com's Logistics
 * Ride Hailing Application case study
 * (https://www.softsuave.com/case-study-logistics-ride-hailing-application),
 * rebuilt on the site's case-study template the way
 * `parksafe-community-vehicle-alert-app.ts` is (one of live's short-form case
 * studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Client
 * Overview" paragraph (one paragraph on live, not a point list, so it is the
 * section's body here, as on the Legal Violation page), the "Client
 * Requirements" list, the "Industry" line ("Transportation" — live's page,
 * though its listing card files the study under Logistics), the "View Full
 * Case Study" button and the related-case-study heading. As
 * on the other short-form pages, the H1 is set the way the Vehicle
 * Intelligence hero is, with no hero image (live's page has none), "Industry"
 * is the hero's fact, and the two blocks are sections (`section1`,
 * `section2` — live has no ids). The PDF is live's, self-hosted at live's
 * path (`public/assets/case-studies/logistics-ride-hailing-application.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const rideHailingMeta = {
  path: "/case-study-logistics-ride-hailing-application",
  /** Live's `<title>`, verbatim. */
  title: "Logistics Ride Hailing Software Development [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Logistics Ride Hailing Software Development case study revealing how technology transformed last-mile delivery and ride operations.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/logistics-ride-hailing-application.pdf";

export const rideHailingCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Logistics Ride Hailing", "Application"],
    accent: "Ride Hailing",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "Transportation" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(rideHailingMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      body: [
        "Our client was a leading taxi service provider company in the United States. The company was dedicated to provide seamless and quality taxi services to the customers in the United States. The client wanted to develop a real time transportation and logistics supported ride hailing mobile application for Android and iOS platform that facilitates customers to book a cab that transports goods from one place to another seamlessly and also provide ride-hailing service for the customers to travel from one place to another.",
      ],
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "Develop a taxi-hailing application and bid based product transportation application.",
        "Develop a rider app and driver app for native iOS and native Android platforms.",
        "Integrate Google maps, live tracking, and profile updation features.",
        "Develop a web application for the admin to manage all the activities solely.",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Client Overview and Client Requirements — no
    // claim the case study doesn't make.
    body: "Download the full case study to see how native rider and driver apps with live tracking and an admin web app brought taxi rides and bid-based goods transport together.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "logistics-ride-hailing-application.pdf",
    requirement: "Case study download: requested the Logistics Ride Hailing Application case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Logistics Ride Hailing Application",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Logistics Ride Hailing Application case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(rideHailingMeta.path),
};
