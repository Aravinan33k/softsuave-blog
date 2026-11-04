import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-subscription-management-for-customer-growth` — softsuave.com's
 * Subscription Management case study
 * (https://www.softsuave.com/case-study-subscription-management-for-customer-growth),
 * rebuilt on the site's case-study template.
 *
 * One of live's short-form case studies: an H1, an "Overview" and a "Client
 * Requirements" point list, an "Industry" line, a "View Full Case Study"
 * button with the download form beside it, and the related lane — no hero
 * copy, platform marks, images or section anchors. Every line of copy is the
 * live page's, verbatim. Here the H1 is set the way the Vehicle Intelligence
 * hero is, "Industry" is the hero's fact, the two lists are sections
 * (`section1`, `section2` — live has no ids), and the button's label is
 * live's on the closing panel. Live's panel has no paragraph; the one here is
 * written for this site (see `download.body`) — the page's only copy that is
 * not live's.
 *
 * The hero image is the one softsuave.com's case-study index (and this
 * page's own commented-out related card) uses for this study,
 * `ecommerce-3.webp`, which the index here already ships — live's page has
 * no image of its own. The PDF is live's, self-hosted at live's path
 * (`public/assets/case-studies/phoenix.pdf`).
 *
 * Related lane: the shared, position-based one (`related.ts`) — the
 * previous study and the next four in the case-study listing.
 */

export const subscriptionManagementMeta = {
  path: "/case-study-subscription-management-for-customer-growth",
  /** Live's `<title>`, verbatim. */
  title: "Subscription Management for Customer Growth [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Learn how a subscription platform helped businesses streamline customer management, boost recurring revenue, and integrate secure payments with advanced analytics.",
} as const;

const PDF = "/assets/case-studies/phoenix.pdf";

export const subscriptionManagementCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Subscription Management", "for Customer Growth"],
    accent: "Subscription Management",
    titleSubLast: true,
    // Live's page has no hero paragraph.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "eCommerce" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(subscriptionManagementMeta.path),
    ],
    // No image (review: "remove the hero section image"), as live's page has
    // none.
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Overview",
      title: "Overview",
      list: [
        "The solution is a flexible subscription management platform designed for businesses with a tiered structure.",
        "It supports online sales, recurring payments, and customer engagement through an organized system of Clients, Stores, and Users.",
        "With customizable permission levels and integrated payment tools, the platform empowers businesses to scale efficiently.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "Centralized system for managing customers, subscriptions, and transactions",
        "Integration with multiple payment gateways",
        "Secure storage for customer payment data",
        "Chargeback prevention and dispute resolution tools",
        "Customizable checkout experience",
        "Logging and analytics for performance insights",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this lead-in was written here (review:
    // "this section looks empty"), from the page's own Overview and Client
    // Requirements — no claim the case study doesn't make.
    body: "Download the full case study to see how our subscription platform brought customers, payments and checkout together for a tiered business, securely and at scale.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "phoenix.pdf",
    requirement: "Case study download: requested the Subscription Management for Customer Growth case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Subscription Management for Customer Growth",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Subscription Management for Customer Growth case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(subscriptionManagementMeta.path),
};
