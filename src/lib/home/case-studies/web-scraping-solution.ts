import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-web-scraping-solution` — softsuave.com's Web Scraping Solution
 * For Logistics Business case study
 * (https://www.softsuave.com/case-study-web-scraping-solution), rebuilt on the
 * site's case-study template the way `parksafe-community-vehicle-alert-app.ts`
 * is (one of live's short-form case studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Client
 * Overview" and "Client Requirements" text (paragraphs on live, not point
 * lists, so they are the sections' bodies here, as on the Legal Violation
 * page), the "Industry" line, the "View Full Case Study" button and the
 * related-case-study heading. That includes live's "MongoDB's
 * .However". As on the other short-form pages, the H1 is set the way the
 * Vehicle Intelligence hero is, with no hero image (live's page has none),
 * "Industry" is the hero's fact, and the two blocks are sections
 * (`section1`, `section2` — live has no ids). The PDF is live's, self-hosted
 * at live's path (`public/assets/case-studies/web-scrapping-solution.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const webScrapingMeta = {
  path: "/case-study-web-scraping-solution",
  /** Live's `<title>`, verbatim. */
  title: "Explore Web Scraping App Development [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Web scraping app development case studies highlighting how businesses gained insights, boosted productivity, and scaled operations.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/web-scrapping-solution.pdf";

export const webScrapingCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Web Scraping Solution", "For Logistics Business"],
    accent: "Web Scraping",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "Logistics" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(webScrapingMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      body: [
        "Our client is a cloud-based logistics management solution targeting businesses that ship goods, including manufacturers, retailers, and e-commerce companies. They were founded in 2018, and focus on cloud-based solutions with features like shipment tracking, automated alerts, contract rate management, and collaboration tools addressing the growing need for streamlined visibility and cost savings in freight transportation.",
      ],
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      body: [
        "The client faced significant challenges in organizing their collected data. With data coming from various companies in different formats, checking its status was difficult. The inconsistent formats made storing and retrieving the data challenging.",
        // Live's wording, "MongoDB's .However" included.
        "Initially, their web application used ReactJS, NodeJS and MongoDB's .However limitations in scalability made it unable to handle large loads. When millions of data entries were loaded, the database struggled, leading to reduced web app performance and numerous user complaints.",
        "To address these issues, the client required a solution to improve the web app's performance and scalability. They also requested a web scraping solution to automatically run in the background, mining data from dynamic sources and consolidating it on a single platform.",
      ],
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Client Overview and Client Requirements — no
    // claim the case study doesn't make.
    body: "Download the full case study to see how a background web scraping solution consolidated data from dynamic sources and helped a logistics web app scale.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "web-scrapping-solution.pdf",
    requirement: "Case study download: requested the Web Scraping Solution For Logistics Business case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Web Scraping Solution For Logistics Business",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Web Scraping Solution For Logistics Business case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(webScrapingMeta.path),
};
