import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-legal-violation-tracking-application` — softsuave.com's Legal
 * Violation Tracking Application case study
 * (https://www.softsuave.com/case-study-legal-violation-tracking-application),
 * rebuilt on the site's case-study template the way
 * `smart-warranty-document-management.ts` is (one of live's short-form case
 * studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Client
 * Overview" paragraph (one paragraph on live, not a point list, so it is the
 * section's body here), the "Client Requirements" list, the "Industry" line
 * ("Human Resources" — live's page, though its listing card files the study
 * under On-Demand), the "View Full Case Study" button and the related-case-
 * study heading. As on the other short-form pages, the H1 is
 * set the way the Vehicle Intelligence hero is, with no hero image (live's
 * page has none), "Industry" is the hero's fact, and the two blocks are
 * sections (`section1`, `section2` — live has no ids). The PDF is live's,
 * self-hosted at live's path
 * (`public/assets/case-studies/legal-violation-tracking-application.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const legalViolationMeta = {
  path: "/case-study-legal-violation-tracking-application",
  /** Live's `<title>`, verbatim. */
  title: "Legal Violation Tracking Application Development [Case Study]",
  /** Live's meta description, verbatim (without the stray `"` after its tag's value). */
  description:
    "Legal Violation Tracking Application Development case study revealing how technology transformed compliance, auditing, and reporting.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/legal-violation-tracking-application.pdf";

export const legalViolationCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Legal Violation", "Tracking Application"],
    accent: "Legal Violation",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "Human Resources" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(legalViolationMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      body: [
        "The legal violation tracking application was associated with the government of a powerful country in Middle-east. The client wanted to track the violations happening in their country and report it with the help of an Application. A handy and robust mobile app in the hands of secret agents who tag the exact location when they come across an illegal action. Admin will share those reports with the local officials to take over. Overall, the client wanted a national security app that keeps all the legal violation on track.",
      ],
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "Develop innovative solutions to stop illegal activities and violations",
        "Develop iOS application and admin website to track and report, respectively.",
        "Develop tags to be integrated into real-time maps to report violations",
        "Display the violation reports as a dashboard to the Admin.",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Client Overview and Client Requirements — no
    // claim the case study doesn't make.
    body: "Download the full case study to see how we built an iOS app and admin website to tag violations on real-time maps and report them on a dashboard.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "legal-violation-tracking-application.pdf",
    requirement: "Case study download: requested the Legal Violation Tracking Application case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Legal Violation Tracking Application",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Legal Violation Tracking Application case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(legalViolationMeta.path),
};
