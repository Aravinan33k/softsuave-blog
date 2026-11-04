import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-smart-warranty-and-document-management-app` — softsuave.com's
 * Smart Warranty and Document Management App case study
 * (https://www.softsuave.com/case-study-smart-warranty-and-document-management-app),
 * rebuilt on the site's case-study template the way
 * `subscription-management-for-customer-growth.ts` is (one of live's
 * short-form case studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Overview" and
 * "Integrations" point lists (the integrations keep live's bold lead-in
 * labels), the "Industry" line, the "View Full Case Study" button and the
 * related-case-study heading. As on the Subscription
 * Management page, the H1 is set the way the Vehicle Intelligence hero is,
 * with no hero image (live's page has none), "Industry" is the hero's fact,
 * and the two lists are sections (`section1`, `section2` — live has no ids).
 * The PDF is live's, self-hosted at live's path
 * (`public/assets/case-studies/azzetta.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const smartWarrantyMeta = {
  path: "/case-study-smart-warranty-and-document-management-app",
  /** Live's `<title>`, verbatim. */
  title: "Smart Warranty and Document Management App [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "A unified mobile and web platform for managing appliance warranties, insurance, and document expirations, integrated with Digilocker, calendar scheduling, and reminders.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/azzetta.pdf";

export const smartWarrantyCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Smart Warranty", "and Document Management App"],
    accent: "Smart Warranty",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "On-Demand" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(smartWarrantyMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Overview",
      title: "Overview",
      list: [
        "This solution consists of a mobile app and an admin web panel that helps users manage appliance warranties, purchase insurance, and track document expirations.",
        "It includes integrations with Digilocker, calendar scheduling, and geo-location services to offer a secure and seamless user experience.",
        "The platform supports both personal and administrative needs, offering robust functionality for users and centralized control for admins.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Integrations",
      title: "Integrations",
      list: [
        { lead: "Digilocker API: ", text: "For secure document management and retrieval." },
        { lead: "Google Calendar API: ", text: "For scheduling reminders and events." },
        { lead: "Geo-location Services: ", text: "Tracks user locations and adds geo-coordinates to images." },
        { lead: "Insurance API: ", text: "Users can purchase insurance policies directly through the app." },
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Overview and Integrations — no claim the case
    // study doesn't make.
    body: "Download the full case study to see how we built a mobile app and admin panel to manage warranties, insurance and documents, with Digilocker and calendar integrations.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "azzetta.pdf",
    requirement: "Case study download: requested the Smart Warranty and Document Management App case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Smart Warranty and Document Management App",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Smart Warranty and Document Management App case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(smartWarrantyMeta.path),
};
