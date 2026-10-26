import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-blockchain-digital-currency-platform` — softsuave.com's
 * Blockchain Digital Currency Platform case study
 * (https://www.softsuave.com/case-study-blockchain-digital-currency-platform),
 * rebuilt on the site's case-study template the way
 * `saas-platform-for-corporate-banking.ts` is (one of live's short-form case
 * studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Overview" and
 * "Key Features" point lists (the features keep live's bold lead-in labels),
 * the "Industry" line ("Fin Tech", as live spells it), the "View Full Case
 * Study" button and the related-case-study heading. That
 * includes live's typo "TFacilitates". As on the other short-form pages, the
 * H1 is set the way the Vehicle Intelligence hero is, with no hero image
 * (live's page has none), "Industry" is the hero's fact, and the two lists
 * are sections (`section1`, `section2` — live has no ids). The PDF is live's,
 * self-hosted at live's path
 * (`public/assets/case-studies/blockchain-powered-digital-currency-platform.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const blockchainCurrencyMeta = {
  path: "/case-study-blockchain-digital-currency-platform",
  /** Live's `<title>`, verbatim. */
  title: "Blockchain Digital Currency Platform [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Explore how Soft Suave built a secure, scalable digital currency platform using blockchain technology to enable seamless, transparent financial transactions.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/blockchain-powered-digital-currency-platform.pdf";

export const blockchainCurrencyCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Blockchain Digital", "Currency Platform"],
    accent: "Blockchain",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "Fin Tech" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(blockchainCurrencyMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Overview",
      title: "Overview",
      list: [
        "The solution is a blockchain-based digital currency platform designed for financial institutions, payment providers, and fintechs.",
        "It enables secure digital transactions, tokenized deposits, and withdrawals.",
        "Built on a permissioned blockchain, it ensures regulatory compliance while supporting multi-token and role-based access.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Key Features",
      title: "Key Features",
      list: [
        {
          lead: "Data & Insights - ",
          text: "Provides real-time monitoring, reporting, and analytics for financial transactions.",
        },
        { lead: "Rule Management - ", text: "Enables dynamic transaction controls and policy configurations." },
        {
          lead: "Onboarding - ",
          text: "Streamlined user verification and onboarding process with automated KYC.",
        },
        {
          lead: "Wallet Management - ",
          text: "Supports custodial/non-custodial wallets and multi-token transactions.",
        },
        {
          lead: "Transaction Management - ",
          // Live's wording, "TFacilitates" included.
          text: "TFacilitates on-chain and off-chain fund movements, deposits, and withdrawals.",
        },
        {
          lead: "Multi-Token Support - ",
          text: "Manages various digital currencies including utility, deposit, and linked tokens.",
        },
        {
          lead: "Role & Access Management - ",
          text: "Secure authentication with defined permissions for admins, tenants, and users.",
        },
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Overview and Key Features — no claim the case
    // study doesn't make.
    body: "Download the full case study to see how a permissioned blockchain enabled tokenized deposits, multi-token wallets and compliant digital transactions.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "blockchain-powered-digital-currency-platform.pdf",
    requirement: "Case study download: requested the Blockchain Digital Currency Platform case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Blockchain Digital Currency Platform",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Blockchain Digital Currency Platform case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(blockchainCurrencyMeta.path),
};
