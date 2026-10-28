import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-all-in-one-financial-management-app` — softsuave.com's
 * All-in-One Financial Management App case study
 * (https://www.softsuave.com/case-study-all-in-one-financial-management-app),
 * rebuilt on the site's case-study template the way
 * `saas-platform-for-corporate-banking.ts` is (one of live's short-form case
 * studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Overview" and
 * "Client Requirements" point lists (the requirements end without full stops,
 * as on live), the "Industry" line, the "View Full Case Study" button and the
 * related-case-study heading. As on the other short-form
 * pages, the H1 is set the way the Vehicle Intelligence hero is, with no hero
 * image (live's page has none), "Industry" is the hero's fact, and the two
 * lists are sections (`section1`, `section2` — live has no ids). The PDF is
 * live's, self-hosted at live's path (`public/assets/case-studies/abcd.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const financialManagementAppMeta = {
  path: "/case-study-all-in-one-financial-management-app",
  /** Live's `<title>`, verbatim. */
  title: "All-in-One Financial Management App [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Discover how a modern financial app combines insurance, loans, investments, and credit tracking into one secure, intuitive platform with real-time insights and seamless user experience.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/abcd.pdf";

export const financialManagementAppCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["All-in-One Financial", "Management App"],
    accent: "All-in-One",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "Fintech" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(financialManagementAppMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Overview",
      title: "Overview",
      list: [
        "A user-centric financial platform that delivers a wide range of services including insurance, loans, investments, and real-time credit score tracking.",
        "With phone number-based login, a centralized dashboard, and secure third-party payment integrations, the app offers a smooth and personalized financial journey.",
        "Its intuitive interface and responsive service callbacks create a streamlined experience for users at every step.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "A suite of diverse financial solutions including credit, investment, and insurance",
        "Compliance with financial regulations and data privacy standards",
        "A trustworthy, secure experience to build user confidence",
        "Seamless digital interface with easy onboarding and navigation",
        "Features to improve customer awareness and engagement",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Overview and Client Requirements — no claim
    // the case study doesn't make.
    body: "Download the full case study to see how one secure app brought insurance, loans, investments and real-time credit score tracking together on a single dashboard.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "abcd.pdf",
    requirement: "Case study download: requested the All-in-One Financial Management App case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – All-in-One Financial Management App",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the All-in-One Financial Management App case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(financialManagementAppMeta.path),
};
