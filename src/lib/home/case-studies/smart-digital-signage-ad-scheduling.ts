import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-smart-digital-signage-with-advanced-ad-scheduling` —
 * softsuave.com's Smart Digital Signage with Advanced Ad Scheduling case study
 * (https://www.softsuave.com/case-study-smart-digital-signage-with-advanced-ad-scheduling),
 * rebuilt on the site's case-study template the way
 * `smart-warranty-document-management.ts` is (one of live's On-Demand
 * short-form case studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Overview" and
 * "Client Requirements" point lists, the "Industry" line, the "View Full Case
 * Study" button and the related-case-study heading. The H1 is
 * set the way the Vehicle Intelligence hero is, with no hero image (live's
 * page has none), "Industry" is the hero's fact, and the two lists are
 * sections (`section1`, `section2` — live has no ids). The PDF is live's,
 * self-hosted at live's path (`public/assets/case-studies/signedge.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const digitalSignageMeta = {
  path: "/case-study-smart-digital-signage-with-advanced-ad-scheduling",
  /** Live's `<title>`, verbatim. */
  title: "Smart Digital Signage with Advanced Ad Scheduling [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Learn how advanced scheduling and campaign controls improved mobile and TV ad delivery with seamless integration into an existing digital signage platform.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/signedge.pdf";

export const digitalSignageCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Smart Digital Signage", "with Advanced Ad Scheduling"],
    accent: "Smart Digital Signage",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "On-Demand" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(digitalSignageMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Overview",
      title: "Overview",
      list: [
        "The project enhanced an existing digital signage application by introducing “Capsuling” — a robust feature for advanced ad scheduling and campaign management.",
        "This addition allowed precise control over ad timing, improved campaign effectiveness, and ensured reliable delivery across mobile and TV platforms.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "Advanced ad scheduling and time-based control",
        "Management of ad occurrences within set durations",
        "Integration of the \"Capsuling\" feature for complex scheduling",
        "Seamless compatibility with current mobile and TV apps",
        "Consistent ad playback and performance across all devices",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Overview and Client Requirements — no claim
    // the case study doesn't make.
    body: "Download the full case study to see how “Capsuling” brought precise ad scheduling and campaign control to a digital signage platform across mobile and TV.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "signedge.pdf",
    requirement: "Case study download: requested the Smart Digital Signage with Advanced Ad Scheduling case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Smart Digital Signage with Advanced Ad Scheduling",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Smart Digital Signage with Advanced Ad Scheduling case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(digitalSignageMeta.path),
};
