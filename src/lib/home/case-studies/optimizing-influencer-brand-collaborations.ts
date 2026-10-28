import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-optimizing-influencer-and-brand-collaborations` —
 * softsuave.com's Optimizing Influencer and Brand Collaborations case study
 * (https://www.softsuave.com/case-study-optimizing-influencer-and-brand-collaborations),
 * rebuilt on the site's case-study template the way
 * `smart-warranty-document-management.ts` is (one of live's On-Demand
 * short-form case studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Overview" and
 * "Client Requirements" point lists, the "Industry" line, the "View Full Case
 * Study" button and the related-case-study heading. The H1 is
 * set the way the Vehicle Intelligence hero is, with no hero image (live's
 * page has none), "Industry" is the hero's fact, and the two lists are
 * sections (`section1`, `section2` — live has no ids). The PDF is live's,
 * self-hosted at live's path (`public/assets/case-studies/syme.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const influencerBrandMeta = {
  path: "/case-study-optimizing-influencer-and-brand-collaborations",
  /** Live's `<title>`, verbatim. */
  title: "Optimizing Influencer and Brand Collaborations [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Explore how a dynamic platform connects influencers and brands through real-time offer management, user profiles, and seamless communication features.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/syme.pdf";

export const influencerBrandCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Optimizing Influencer", "and Brand Collaborations"],
    accent: "Optimizing Influencer",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "On-Demand" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(influencerBrandMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Overview",
      title: "Overview",
      list: [
        "The platform enables streamlined collaboration between influencers and brands by allowing companies to create, manage, and track offers, while influencers can browse, accept, and fulfill them.",
        "With built-in authentication, profile management, chat integration, and offer tracking, the system simplifies end-to-end campaign execution.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "Secure user authentication",
        "Custom offer creation and management tools",
        "Role-based access for influencers and companies",
        "Real-time chat for smooth collaboration",
        "Profile and account management features",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Overview and Client Requirements — no claim
    // the case study doesn't make.
    body: "Download the full case study to see how we built a platform where brands create and track offers and influencers accept them, with built-in chat and profiles.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "syme.pdf",
    requirement: "Case study download: requested the Optimizing Influencer and Brand Collaborations case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Optimizing Influencer and Brand Collaborations",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Optimizing Influencer and Brand Collaborations case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(influencerBrandMeta.path),
};
