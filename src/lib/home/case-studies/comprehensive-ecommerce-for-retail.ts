import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-comprehensive-ecommerce-for-retail` — softsuave.com's
 * Comprehensive eCommerce for Retail case study
 * (https://www.softsuave.com/case-study-comprehensive-ecommerce-for-retail),
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
 * (`public/assets/case-studies/comprehensive-ecommerce-solution.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * Related lane: the shared, position-based one (`related.ts`) — the
 * previous study and the next four in the case-study listing.
 */

export const comprehensiveEcommerceMeta = {
  path: "/case-study-comprehensive-ecommerce-for-retail",
  /** Live's `<title>`, verbatim. */
  title: "Comprehensive eCommerce for Retail [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Discover how Soft Suave optimized retail operations with a full-featured eCommerce solution, enhancing inventory control, sales, and customer experience.",
} as const;

const PDF = "/assets/case-studies/comprehensive-ecommerce-solution.pdf";

export const comprehensiveEcommerceCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Comprehensive eCommerce", "for Retail"],
    accent: "Comprehensive eCommerce",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "eCommerce" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(comprehensiveEcommerceMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      list: [
        "Our client is a leading multi-brand retail chain specializing in mobile phones, electronic gadgets, and home appliances.",
        "They offer a diverse range of products from top brands and are renowned for their customer-centric approach, providing a 'live demo' experience in-store.",
        "Along with an extensive network of physical stores, the client has a strong online presence, ensuring seamless access to products for customers nationwide.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "Efficient Inventory Management",
        "Seamless Coupon & Offer Management",
        "Robust Seller & Account Management",
        "Comprehensive User & Role Management",
        "Streamlined Product Approval Process",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Client Overview and Client Requirements — no
    // claim the case study doesn't make.
    body: "Download the full case study to see how we built an eCommerce platform for a multi-brand retail chain, streamlining inventory, offers, sellers and product approvals.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "comprehensive-ecommerce-solution.pdf",
    requirement: "Case study download: requested the Comprehensive eCommerce for Retail case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Comprehensive eCommerce for Retail",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Comprehensive eCommerce for Retail case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(comprehensiveEcommerceMeta.path),
};
