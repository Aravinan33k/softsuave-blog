import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-intuitive-online-shopping-platform` — softsuave.com's Intuitive
 * Online Shopping Platform case study
 * (https://www.softsuave.com/case-study-intuitive-online-shopping-platform),
 * rebuilt on the site's case-study template the way
 * `subscription-management-for-customer-growth.ts` is (one of live's
 * short-form case studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Client
 * Overview" and "Client Requirements" point lists, the "Industry" line, the
 * "View Full Case Study" button and the related-case-study heading. As on the Subscription Management page, the H1 is set the way the
 * Vehicle Intelligence hero is, with no hero image (live's page has none),
 * "Industry" is the hero's fact, and the two lists are sections (`section1`,
 * `section2` — live has no ids). The PDF is live's, self-hosted at live's path
 * (`public/assets/case-studies/online-shopping-with-effortless-transactions.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * Related lane: the shared, position-based one (`related.ts`) — the
 * previous study and the next four in the case-study listing.
 */

export const intuitiveShoppingMeta = {
  path: "/case-study-intuitive-online-shopping-platform",
  /** Live's `<title>`, verbatim. */
  title: "Intuitive Online Shopping Platform [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "See how Soft Suave redefined online shopping with a user-friendly platform that simplified transactions, boosted engagement, and enhanced conversion rates.",
} as const;

const PDF = "/assets/case-studies/online-shopping-with-effortless-transactions.pdf";

export const intuitiveShoppingCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Intuitive Online Shopping", "Platform"],
    accent: "Intuitive Online Shopping",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "eCommerce" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(intuitiveShoppingMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      list: [
        "The client aims to revolutionize e-commerce with an intuitive platform for seamless product management, order handling, and secure transactions.",
        "It empowers sellers with efficient inventory tracking and automated sales, while ensuring a smooth, secure shopping experience for buyers.",
        "The focus on user engagement and operational efficiency drives the platform’s innovation and scalability.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "Seamless User Onboarding",
        "Efficient Product Management",
        "Streamlined Order Handling",
        "Automated Seller and Product Approval",
        "Enhanced Buyer Experience",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Client Overview and Client Requirements — no
    // claim the case study doesn't make.
    body: "Download the full case study to see how we built an intuitive shopping platform with easy onboarding, efficient product and order management, and secure checkout.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "online-shopping-with-effortless-transactions.pdf",
    requirement: "Case study download: requested the Intuitive Online Shopping Platform case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Intuitive Online Shopping Platform",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Intuitive Online Shopping Platform case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(intuitiveShoppingMeta.path),
};
