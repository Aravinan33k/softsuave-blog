import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-savings-solution-for-better-financial-management` —
 * softsuave.com's Savings Solution for Better Financial Management case study
 * (https://www.softsuave.com/case-study-savings-solution-for-better-financial-management),
 * rebuilt on the site's case-study template the way
 * `saas-platform-for-corporate-banking.ts` is (one of live's short-form case
 * studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Client
 * Overview" and "Client Requirements" point lists (the requirements end
 * without full stops, as on live), the "Industry" line, the "View Full Case
 * Study" button and the related-case-study heading. That
 * includes the Overview's second point, which live carries over word for word
 * from its HealthPass page (video consultations, doctor networks, e-shop
 * perks). As on the other short-form pages, the H1 is set the way the Vehicle
 * Intelligence hero is, with no hero image (live's page has none), "Industry"
 * is the hero's fact, and the two lists are sections (`section1`, `section2`
 * — live has no ids). The PDF is live's, self-hosted at live's path
 * (`public/assets/case-studies/quber.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const savingsSolutionMeta = {
  path: "/case-study-savings-solution-for-better-financial-management",
  /** Live's `<title>`, verbatim. */
  title: "Savings Solution for Better Financial Management [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Learn how a savings app helps users in Canada and the US reach their financial goals through real-time dashboards, group saving tools, and secure banking integrations.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/quber.pdf";

export const savingsSolutionCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Savings Solution for Better", "Financial Management"],
    accent: "Savings Solution",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "Fintech" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(savingsSolutionMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      list: [
        "The client provides a savings platform aimed at helping users across Canada and the United States build financial discipline.",
        // Live's wording, carried over from its HealthPass page.
        "It connects financial and healthcare needs by offering flexible plans for individuals and families, including video consultations, doctor networks, and exclusive e-shop perks—all with seamless, secure subscription management.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "Real-time financial dashboard with key performance metrics",
        "Intuitive interface for personal and group savings goals",
        "Secure banking API integration for data aggregation and transfers",
        "Notifications and messaging to keep users engaged and informed",
        "Admin tools to manage user participation and challenge setups",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Client Overview and Client Requirements — no
    // claim the case study doesn't make.
    body: "Download the full case study to see how real-time dashboards, group savings goals and secure banking integrations help users in Canada and the US save.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "quber.pdf",
    requirement: "Case study download: requested the Savings Solution for Better Financial Management case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Savings Solution for Better Financial Management",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Savings Solution for Better Financial Management case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(savingsSolutionMeta.path),
};
