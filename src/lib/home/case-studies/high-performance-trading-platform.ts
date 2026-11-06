import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-high-performance-trading-platform` — softsuave.com's
 * High-Performance Trading Platform case study
 * (https://www.softsuave.com/case-study-high-performance-trading-platform),
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
 * live's, self-hosted at live's path
 * (`public/assets/case-studies/tradesocio.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const tradingPlatformMeta = {
  path: "/case-study-high-performance-trading-platform",
  /** Live's `<title>`, verbatim. */
  title: "High-Performance Trading Platform [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Explore how a front-end trading solution enhances operational efficiency with real-time market analysis, trade execution, portfolio management, and seamless backend integration.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/tradesocio.pdf";

export const tradingPlatformCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["High-Performance", "Trading Platform"],
    accent: "High-Performance",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "Fintech" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(tradingPlatformMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Overview",
      title: "Overview",
      list: [
        "This trading solution is a robust front-end application designed for real-time market analysis, fast trade execution, and portfolio management.",
        "It integrates with the client’s backend systems while keeping development responsibilities focused on the frontend, ensuring performance, clarity, and streamlined operations for active traders.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "Secure login and user authentication",
        "Real-time trading interface",
        "Charting and market analysis tools",
        "Watchlist and equity tracking",
        "Trade execution with position and order management",
        "Stop Loss / Take Profit (SL/TP) automation",
        "Historical trade records and performance tracking",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Overview and Client Requirements — no claim
    // the case study doesn't make.
    body: "Download the full case study to see how a fast front-end gave active traders real-time charts, trade execution, SL/TP automation and portfolio tracking.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "tradesocio.pdf",
    requirement: "Case study download: requested the High-Performance Trading Platform case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – High-Performance Trading Platform",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the High-Performance Trading Platform case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(tradingPlatformMeta.path),
};
