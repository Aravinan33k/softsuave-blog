import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-area-mapping-solution` — softsuave.com's Area Mapping Solution
 * For A Solar Business case study
 * (https://www.softsuave.com/case-study-area-mapping-solution), rebuilt on the
 * site's case-study template the way `smart-warranty-document-management.ts`
 * is (one of live's short-form case studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Client
 * Overview" and "Client Requirements" point lists, the "Industry" line, the
 * "View Full Case Study" button and the related-case-study heading — and the `<title>`, misspelling ("Maping") included. As on the
 * other short-form pages, the H1 is set the way the Vehicle Intelligence hero
 * is, with no hero image (live's page has none), "Industry" is the hero's
 * fact, and the two lists are sections (`section1`, `section2` — live has no
 * ids). The PDF is live's, self-hosted at live's path
 * (`public/assets/case-studies/area-mapping-solution.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const areaMappingMeta = {
  path: "/case-study-area-mapping-solution",
  /** Live's `<title>`, verbatim (its "Maping" typo included). */
  title: "Explore Area Maping solution Development [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Area Mapping Solution Development case study highlighting custom geospatial tools that enhanced accuracy, decision-making, and usability.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/area-mapping-solution.pdf";

export const areaMappingCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Area Mapping Solution", "For A Solar Business"],
    accent: "Area Mapping Solution",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "On-Demand" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(areaMappingMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      list: [
        "Our client, established in 2020, specializes in providing solar energy solutions, emphasizing home energy efficiency and sustainable power.",
        "Established to help homeowners transition to cleaner energy forms, they offer comprehensive consultations and installations, ensuring energy savings and reduced utility bills.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "The client faced challenges in efficiently reaching users due to a lack of area mapping and real-time user status monitoring. This resulted in delays in engaging potential users and managing existing ones, leading to decreased user acquisition rates.",
        "The primary difficulty was ensuring the prompt reach of service providers to users' doorsteps, hindered by the absence of area mapping functionality and real-time user status monitoring. As a consequence, managing existing users' status became challenging, potentially resulting in lost opportunities due to delays in assigning sales personnel.",
        "Objectives of the client involve implementing a system to match users with service providers within a 50km radius. Service providers would visit users at their doorstep to assess needs and policies, creating customized quotations accordingly.",
        "The aim is to streamline the process of connecting users with suitable service providers while ensuring personalized service delivery.",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Client Overview and Client Requirements — no
    // claim the case study doesn't make.
    body: "Download the full case study to see how area mapping and real-time user status helped a solar business match homeowners with service providers within 50km.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "area-mapping-solution.pdf",
    requirement: "Case study download: requested the Area Mapping Solution For A Solar Business case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Area Mapping Solution For A Solar Business",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Area Mapping Solution For A Solar Business case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(areaMappingMeta.path),
};
