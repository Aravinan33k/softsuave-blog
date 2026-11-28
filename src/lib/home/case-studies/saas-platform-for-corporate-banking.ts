import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-saas-platform-for-corporate-banking` — softsuave.com's SaaS
 * Platform for Corporate Banking case study
 * (https://www.softsuave.com/case-study-saas-platform-for-corporate-banking),
 * rebuilt on the site's case-study template the way
 * `high-performance-lms-for-education.ts` is (one of live's short-form case
 * studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Overview" and
 * "Client Requirements" point lists (the requirements keep live's bold
 * "Label:" lead-ins, and end without full stops, as on live), the "Industry"
 * line, the "View Full Case Study" button and the related-case-study heading. As on the other short-form pages, the H1 is set the way the
 * Vehicle Intelligence hero is, with no hero image (live's page has none),
 * "Industry" is the hero's fact, and the two lists are sections (`section1`,
 * `section2` — live has no ids). The PDF is live's, self-hosted at live's
 * path (`public/assets/case-studies/igtb.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const corporateBankingSaasMeta = {
  path: "/case-study-saas-platform-for-corporate-banking",
  /** Live's `<title>`, verbatim. */
  title: "SaaS Platform for Corporate Banking [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Explore a secure SaaS solution for corporate banking that streamlines account management, payments, loans, and communication for large organizations across web and mobile platforms.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/igtb.pdf";

export const corporateBankingSaasCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["SaaS Platform", "for Corporate Banking"],
    accent: "SaaS Platform",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "Fintech" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(corporateBankingSaasMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Overview",
      title: "Overview",
      list: [
        "A scalable, secure SaaS platform built for corporate banking, available on both web and mobile.",
        "Designed to serve large organizations, it consolidates financial operations like account management, payments, loan tracking, and secure messaging into a single, user-friendly system tailored for complex business needs.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        {
          lead: "Account Management: ",
          text: "Manages savings, current, card, and investment accounts with full transaction tracking",
        },
        {
          lead: "Payments: ",
          text: "Supports transfers, bill payments, bulk transactions, and scheduling with strong security",
        },
        { lead: "Loan Management (ICL): ", text: "Tracks inter-company loans and ensures compliance" },
        { lead: "Sweeps: ", text: "Automates fund transfers based on predefined balance rules" },
        { lead: "Contact Management: ", text: "Maintains centralized client information with relationship history" },
        {
          lead: "Messaging Center: ",
          text: "Enables secure internal/external communications with audit-ready message logs",
        },
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Overview and Client Requirements — no claim
    // the case study doesn't make.
    body: "Download the full case study to see how one secure SaaS platform brought accounts, payments, inter-company loans, sweeps and messaging together for corporate banking.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "igtb.pdf",
    requirement: "Case study download: requested the SaaS Platform for Corporate Banking case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – SaaS Platform for Corporate Banking",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the SaaS Platform for Corporate Banking case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(corporateBankingSaasMeta.path),
};
