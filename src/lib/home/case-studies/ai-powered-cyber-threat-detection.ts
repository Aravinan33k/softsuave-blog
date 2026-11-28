import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-ai-powered-cyber-theart-detection` — softsuave.com's AI-Powered
 * Cyber Threat Detection case study
 * (https://www.softsuave.com/case-study-ai-powered-cyber-theart-detection),
 * rebuilt on the site's case-study template the way
 * `smart-warranty-document-management.ts` is (one of live's On-Demand
 * short-form case studies). The path's "theart" is live's misspelling, kept
 * so the URL — and every link to it — matches.
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Client
 * Overview" and "Client Requirements" point lists, the "Industry" line, the
 * "View Full Case Study" button and the related-case-study heading. The H1 is set the way the Vehicle Intelligence hero is, with no hero
 * image (live's page has none), "Industry" is the hero's fact, and the two
 * lists are sections (`section1`, `section2` — live has no ids). The PDF is
 * live's, self-hosted at live's path
 * (`public/assets/case-studies/cyber-threat-detection-with-ai.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const cyberThreatMeta = {
  path: "/case-study-ai-powered-cyber-theart-detection",
  /** Live's `<title>`, verbatim. */
  title: "AI-Powered Cyber Threat Detection [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Discover how Soft Suave used AI and real-time analytics to enhance cyber threat detection, improve response times, and strengthen security infrastructure.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/cyber-threat-detection-with-ai.pdf";

export const cyberThreatCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["AI-Powered Cyber Threat", "Detection"],
    accent: "AI-Powered Cyber Threat",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "On-Demand" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(cyberThreatMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      list: [
        "Our client delivers agentless, AI-powered cybersecurity for midmarket enterprises.",
        "Their flagship product uses AI and machine learning for asset discovery, network segmentation, and anomaly detection—enhancing security without the complexity or high costs.",
        "Enigma AI automates key functions, ensuring strong defense with minimal overhead.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "Integrated Security",
        "Smart Detection",
        "Seamless Adaptability",
        "Real-Time Intelligence",
        "Smart Protection",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Client Overview and Client Requirements — no
    // claim the case study doesn't make.
    body: "Download the full case study to see how agentless AI brings asset discovery, network segmentation and anomaly detection to midmarket enterprises at low overhead.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "cyber-threat-detection-with-ai.pdf",
    requirement: "Case study download: requested the AI-Powered Cyber Threat Detection case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – AI-Powered Cyber Threat Detection",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the AI-Powered Cyber Threat Detection case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(cyberThreatMeta.path),
};
