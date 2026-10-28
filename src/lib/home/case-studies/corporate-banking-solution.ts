import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-corporate-banking-solution` — softsuave.com's Optimizing
 * Corporate Banking with the Rocket Account Solution case study
 * (https://www.softsuave.com/case-study-corporate-banking-solution), rebuilt
 * on the site's case-study template the way
 * `saas-platform-for-corporate-banking.ts` is (one of live's short-form case
 * studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Client
 * Overview" and "Client Requirements" text (paragraphs on live, not point
 * lists, so they are the sections' bodies here, as on the Web Scraping page),
 * the "Industry" line ("Fin Tech", as live spells it), the "View Full Case
 * Study" button and the related-case-study heading. As on the
 * other short-form pages, the H1 is set the way the Vehicle Intelligence hero
 * is, with no hero image (live's page has none), "Industry" is the hero's
 * fact, and the two blocks are sections (`section1`, `section2` — live has
 * no ids). The PDF is live's, self-hosted at live's path
 * (`public/assets/case-studies/corporate-banking-solution.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const rocketAccountMeta = {
  path: "/case-study-corporate-banking-solution",
  /** Live's `<title>`, verbatim — "| Case Study", not the usual "[Case Study]". */
  title: "Optimizing Corporate Banking with the Rocket Account Solution | Case Study",
  /** Live's meta description, verbatim. */
  description:
    "Discover how Soft Suave helped a top financial institution boost liquidity and earnings with its innovative Rocket Account solution for corporate banking.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/corporate-banking-solution.pdf";

export const rocketAccountCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Optimizing Corporate Banking", "with the Rocket Account Solution"],
    accent: "Corporate Banking",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "Fin Tech" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(rocketAccountMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      body: [
        "This case study explores how a leading financial institution used a custom-built innovative corporate banking solution, known as the Rocket Account.",
        "The project aimed to address the challenge of optimizing corporate financial management, specifically focusing on enhancing liquidity and maximizing earnings.",
        "By implementing a tailored solution that integrated advanced features such as automated fund sweeps into fixed deposits and comprehensive financial insights, the institution successfully improved client engagement, operational efficiency, and overall financial performance.",
      ],
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      body: [
        "The client required a web-based solution to manage corporate accounts effectively, allowing businesses to optimize their idle funds without sacrificing liquidity. The need for a more automated and efficient financial management system led to the development of the Rocket Account.",
      ],
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Client Overview and Client Requirements — no
    // claim the case study doesn't make.
    body: "Download the full case study to see how automated sweeps into fixed deposits helped corporate clients put idle funds to work without losing liquidity.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "corporate-banking-solution.pdf",
    requirement: "Case study download: requested the Optimizing Corporate Banking with the Rocket Account Solution case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Optimizing Corporate Banking with the Rocket Account Solution",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Rocket Account case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(rocketAccountMeta.path),
};
