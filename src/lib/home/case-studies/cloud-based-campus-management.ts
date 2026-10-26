import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-cloud-based-campus-management` — softsuave.com's Cloud-Based
 * Campus Management case study
 * (https://www.softsuave.com/case-study-cloud-based-campus-management),
 * rebuilt on the site's case-study template the way
 * `high-performance-lms-for-education.ts` is (one of live's short-form case
 * studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Client
 * Overview" and "Client Requirements" point lists, the "Industry" line, the
 * "View Full Case Study" button and the related-case-study heading — the Overview's naming of the client's product ("Camu") included,
 * as live publishes it. As on the other short-form pages, the H1 is set the
 * way the Vehicle Intelligence hero is, with no hero image (live's page has
 * none), "Industry" is the hero's fact, and the two lists are sections
 * (`section1`, `section2` — live has no ids). The PDF is live's, self-hosted
 * at live's path
 * (`public/assets/case-studies/cloud-integrated-campus-management-system.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const campusManagementMeta = {
  path: "/case-study-cloud-based-campus-management",
  /** Live's `<title>`, verbatim. */
  title: "Cloud-Based Campus Management Platform [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Learn how Soft Suave modernized campus operations with a cloud-integrated system that streamlined administration, student data, and academic workflows.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/cloud-integrated-campus-management-system.pdf";

export const campusManagementCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Cloud-Based", "Campus Management"],
    accent: "Cloud-Based",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "Edu Tech" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(campusManagementMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      list: [
        "Our client offers a cloud-based campus management solution that streamlines academic and administrative processes.",
        "It integrates tools like SIS, LMS, and OBE features, supporting CBCS and offering modules for exam management, analytics, and virtual classrooms.",
        "Used by over 550 institutions in 11 countries, Camu aims to improve academic performance, enhance efficiency, and provide a seamless digital experience for students, teachers, and administrators.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "Integrated System",
        "Streamlined Processes",
        "Virtual Education",
        "Live Data Analytics",
        "Adaptable Framework",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Client Overview and Client Requirements — no
    // claim the case study doesn't make.
    body: "Download the full case study to see how one cloud platform brought SIS, LMS, exams, analytics and virtual classrooms together for 550+ institutions.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "cloud-integrated-campus-management-system.pdf",
    requirement: "Case study download: requested the Cloud-Based Campus Management case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Cloud-Based Campus Management",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Cloud-Based Campus Management case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(campusManagementMeta.path),
};
