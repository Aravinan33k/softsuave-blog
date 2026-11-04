import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-ai-driven-equipment-&-workforce-optimization` — softsuave.com's
 * AI-Driven Equipment & Workforce Optimization case study
 * (https://www.softsuave.com/case-study-ai-driven-equipment-&-workforce-optimization),
 * rebuilt on the site's case-study template the way
 * `subscription-management-for-customer-growth.ts` is (one of live's
 * short-form case studies). The `&` in the path is live's, kept so the URL
 * matches.
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Client
 * Overview" and "Key Features" point lists, the "Industry" line, the "View
 * Full Case Study" button and the related-case-study heading.
 * As on the Subscription Management page, the H1 is set the way the Vehicle
 * Intelligence hero is, with no hero image (live's page has none), "Industry"
 * is the hero's fact, and the two lists are sections (`section1`, `section2`
 * — live has no ids). The PDF is live's, self-hosted at live's path
 * (`public/assets/case-studies/urmilla.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const equipmentWorkforceMeta = {
  path: "/case-study-ai-driven-equipment-&-workforce-optimization",
  /** Live's `<title>`, verbatim. */
  title: "AI-Driven Equipment & Workforce Optimization [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Discover how a leading construction equipment rental company optimized field operations using AI-powered geofencing, digital log sheets, real-time machine insights, and centralized asset tracking to boost productivity across construction, mining, and energy sectors.",
} as const;

const PDF = "/assets/case-studies/urmilla.pdf";

export const equipmentWorkforceCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["AI-Driven Equipment", "& Workforce Optimization"],
    accent: "AI-Driven Equipment",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "On-Demand" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(equipmentWorkforceMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      list: [
        "A prominent construction equipment rental company with a wide fleet that includes earthmoving machines, bridge cranes, piling rigs, dozers, and excavators.",
        "They serve industries such as construction, mining, logistics, and energy, helping clients maximize operational productivity and equipment utilization.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Key Features",
      title: "Key Features",
      list: [
        "Accurate tracking of equipment usage and location across multiple sites.",
        "Automated, reliable attendance logging for field workforce.",
        "Elimination of manual errors in capturing machine readings and logs.",
        "Real-time visibility into machine performance, maintenance needs, and operational status.",
        "Streamlined inventory management and procurement workflows.",
        "Centralized system for equipment and maintenance tracking to reduce downtime and improve asset longevity.",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Client Overview and Key Features — no claim
    // the case study doesn't make.
    body: "Download the full case study to see how we gave an equipment rental company real-time visibility into its machines, maintenance and field workforce.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "urmilla.pdf",
    requirement: "Case study download: requested the AI-Driven Equipment & Workforce Optimization case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – AI-Driven Equipment & Workforce Optimization",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the AI-Driven Equipment & Workforce Optimization case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(equipmentWorkforceMeta.path),
};
