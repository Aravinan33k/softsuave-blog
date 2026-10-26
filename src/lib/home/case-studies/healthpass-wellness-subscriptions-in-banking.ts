import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-healthpass-wellness-subscriptions-in-banking` — softsuave.com's
 * HealthPass Wellness Subscriptions in Banking case study
 * (https://www.softsuave.com/case-study-healthpass-wellness-subscriptions-in-banking),
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
 * live's, self-hosted at live's path (`public/assets/case-studies/hsbc.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const healthPassMeta = {
  path: "/case-study-healthpass-wellness-subscriptions-in-banking",
  /** Live's `<title>`, verbatim. */
  title: "HealthPass Wellness Subscriptions in Banking [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Discover how HealthPass integrates flexible wellness subscriptions into a banking app, offering secure access to video consultations, doctor networks, and health e-shop benefits.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/hsbc.pdf";

export const healthPassCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["HealthPass Wellness", "Subscriptions in Banking"],
    accent: "HealthPass",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "Fintech" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(healthPassMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Overview",
      title: "Overview",
      list: [
        "HealthPass is a wellness subscription feature built into a banking app, allowing users to access personalized health services with ease.",
        "It connects financial and healthcare needs by offering flexible plans for individuals and families, including video consultations, doctor networks, and exclusive e-shop perks—all with seamless, secure subscription management.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "Tiered, customizable health subscription plans for individuals and families",
        "Secure onboarding and multi-member subscription management",
        "Access to video consultations and private doctor networks",
        "Integration of a health-focused e-shop",
        "Flexible payment options (monthly and annual billing)",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Overview and Client Requirements — no claim
    // the case study doesn't make.
    body: "Download the full case study to see how a banking app added tiered health plans with video consultations, doctor networks and a wellness e-shop.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "hsbc.pdf",
    requirement: "Case study download: requested the HealthPass Wellness Subscriptions in Banking case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – HealthPass Wellness Subscriptions in Banking",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the HealthPass Wellness Subscriptions in Banking case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(healthPassMeta.path),
};
