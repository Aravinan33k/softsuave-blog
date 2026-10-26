import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-digital-advertising-in-public-spaces` — softsuave.com's
 * Digital Advertising in Public Spaces case study
 * (https://www.softsuave.com/case-study-digital-advertising-in-public-spaces),
 * rebuilt on the site's case-study template the way
 * `smart-warranty-document-management.ts` is (one of live's short-form case
 * studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Client
 * Overview" and "Key Features" point lists (the features keep live's bold
 * lead-in labels, "User Management " without the dash the others carry), the
 * "Industry" line, the "View Full Case Study" button and the related-case-study
 * heading. That includes live's typo "target abroadaudience"
 * in the Overview's last point. As on the other short-form pages, the H1 is
 * set the way the Vehicle Intelligence hero is, with no hero image (live's
 * page has none), "Industry" is the hero's fact, and the two lists are
 * sections (`section1`, `section2` — live has no ids). The PDF is live's,
 * self-hosted at live's path
 * (`public/assets/case-studies/digital-advertisements-in-public-spaces.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const digitalAdvertisingMeta = {
  path: "/case-study-digital-advertising-in-public-spaces",
  /** Live's `<title>`, verbatim. */
  title: "Digital Advertising in Public Spaces [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Discover how Soft Suave transformed public space advertising with smart digital solutions that improved ad targeting, engagement, and real-time control.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/digital-advertisements-in-public-spaces.pdf";

export const digitalAdvertisingCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Digital Advertising", "in Public Spaces"],
    accent: "Digital Advertising",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "On-Demand" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(digitalAdvertisingMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      list: [
        "Our client specializes in digital advertisement platform, available in major cities like Chicago, NYC, DC, and Boston.",
        "The platform provides real-time monitoring, analytics, and reporting to track ad performance, serving businesses, building owners, and advertisers.",
        "The platform enables property owners and businesses to manage advertising screens in public spaces.",
        // Live's wording, typo included.
        "It streamlines ad placement and monetization, allowing advertisers to target abroadaudience.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Key Features",
      title: "Key Features",
      list: [
        { lead: "Venue Management - ", text: "Enables admins to manage screen details and configure venues for content display" },
        {
          lead: "Ad Creation and Management - ",
          text: "Provides tools to create, manage ads, track performance, and monitor subscriptions.",
        },
        {
          lead: "Tech Visit Tracking - ",
          text: "Enables admins to schedule, track technical visits, manage expenses, and gather post-visit feedback.",
        },
        {
          lead: "User Management ",
          text: "Admins can create, delete, transfer accounts, and assign roles to manage secure platform access.",
        },
        {
          lead: "Lead Management and Synchronization - ",
          text: "Admins can filter leads, sync data with maps, and manage real-time screen availability.",
        },
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Client Overview and Key Features — no claim
    // the case study doesn't make.
    body: "Download the full case study to see how we built a platform to manage public ad screens and venues, run ads and track their performance in real time.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "digital-advertisements-in-public-spaces.pdf",
    requirement: "Case study download: requested the Digital Advertising in Public Spaces case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Digital Advertising in Public Spaces",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Digital Advertising in Public Spaces case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(digitalAdvertisingMeta.path),
};
