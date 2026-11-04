import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-ai-powered-education-solutions` — softsuave.com's AI-Powered
 * Education Solutions case study
 * (https://www.softsuave.com/case-study-ai-powered-education-solutions),
 * rebuilt on the site's case-study template the way
 * `high-performance-lms-for-education.ts` is (one of live's short-form case
 * studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Client
 * Overview" and "Client Requirements" point lists, the "Industry" line ("Edu
 * tech", as live cases it), the "View Full Case Study" button and the
 * related-case-study heading — the Overview's second point
 * without a closing full stop, as on live. As on the other short-form pages,
 * the H1 is set the way the Vehicle Intelligence hero is, with no hero image
 * (live's page has none), "Industry" is the hero's fact, and the two lists
 * are sections (`section1`, `section2` — live has no ids). The PDF is live's,
 * self-hosted at live's path
 * (`public/assets/case-studies/education-through-ai-solutions.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const aiEducationMeta = {
  path: "/case-study-ai-powered-education-solutions",
  /** Live's `<title>`, verbatim. */
  title: "AI-Powered Education Solutions [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Learn how Soft Suave transformed the education sector with AI-driven solutions that enhance learning experiences, engagement, and student outcomes.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/education-through-ai-solutions.pdf";

export const aiEducationCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["AI-Powered", "Education Solutions"],
    accent: "AI-Powered",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "Edu tech" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(aiEducationMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      list: [
        "The Client, an education technology provider, sought to develop a cutting-edge platform that integrates AI-driven assistance into teaching and learning.",
        "The goal was to enhance classroom engagement and provide teachers with intuitive tools for assignment creation, feedback, and student progress monitoring",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "A scalable, AI-powered platform for teachers and students.",
        "Customizable assignment and assessment tools.",
        "Seamless class creation and student-teacher interaction.",
        "Role-based access control for students, teachers, admins, and parents.",
        "Integration with external APIs for ChatGPT-driven AI assistance.",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Client Overview and Client Requirements — no
    // claim the case study doesn't make.
    body: "Download the full case study to see how ChatGPT-driven assistance gave teachers smart tools for assignments, feedback and tracking student progress.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "education-through-ai-solutions.pdf",
    requirement: "Case study download: requested the AI-Powered Education Solutions case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – AI-Powered Education Solutions",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the AI-Powered Education Solutions case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(aiEducationMeta.path),
};
