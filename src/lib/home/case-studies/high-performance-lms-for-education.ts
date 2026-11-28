import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-high-performance-lms-for-education` — softsuave.com's
 * High-Performance LMS for Education case study
 * (https://www.softsuave.com/case-study-high-performance-lms-for-education),
 * rebuilt on the site's case-study template the way
 * `parksafe-community-vehicle-alert-app.ts` is (one of live's short-form case
 * studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Overview" and
 * "Client Requirements" point lists, the "Industry" line, the "View Full Case
 * Study" button and the related-case-study heading. As on the
 * other short-form pages, the H1 is set the way the Vehicle Intelligence hero
 * is, with no hero image (live's page has none), "Industry" is the hero's
 * fact, and the two lists are sections (`section1`, `section2` — live has no
 * ids). The PDF is live's, self-hosted at live's path
 * (`public/assets/case-studies/elevating-learning-management-system.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const lmsEducationMeta = {
  path: "/case-study-high-performance-lms-for-education",
  /** Live's `<title>`, verbatim. */
  title: "High-Performance LMS for Education [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "See how Soft Suave developed a high-performance learning management system to elevate digital education, improve access, and enhance learning outcomes.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/elevating-learning-management-system.pdf";

export const lmsEducationCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["High-Performance LMS", "for Education"],
    accent: "High-Performance LMS",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "Edu Tech" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(lmsEducationMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Overview",
      title: "Overview",
      list: [
        "The client required a smart Learning Management System (LMS) to manage daily operations efficiently for school management, teachers, and students.",
        "The solution aimed to simplify administrative tasks, improve teaching workflows, and enhance student learning experiences with real-time tools for content creation, assessments, communication, and analytics.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "Automate administrative tasks such as scheduling, progress tracking, and reporting.",
        "Equip teachers with tools for lesson planning, content creation, and assessments.",
        "Provide students with an intuitive platform for accessing learning materials and tracking academic progress.",
        "Ensure compliance with NEP 2020 and NCF 2022 educational standards.",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Overview and Client Requirements — no claim
    // the case study doesn't make.
    body: "Download the full case study to see how one LMS automated school administration and gave teachers and students real-time tools, in line with NEP 2020 and NCF 2022.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "elevating-learning-management-system.pdf",
    requirement: "Case study download: requested the High-Performance LMS for Education case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – High-Performance LMS for Education",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the High-Performance LMS for Education case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(lmsEducationMeta.path),
};
