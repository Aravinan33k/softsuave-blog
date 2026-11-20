import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-restaurant-workflow-optimization` — softsuave.com's Restaurant
 * Workflow Optimization case study
 * (https://www.softsuave.com/case-study-restaurant-workflow-optimization),
 * rebuilt on the site's case-study template the way
 * `smart-warranty-document-management.ts` is (one of live's short-form case
 * studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Client
 * Overview" and "Client Requirements" point lists, the "Industry" line, the
 * "View Full Case Study" button and the related-case-study heading. As on the other short-form pages, the H1 is set the way the Vehicle
 * Intelligence hero is, with no hero image (live's page has none), "Industry"
 * is the hero's fact, and the two lists are sections (`section1`, `section2`
 * — live has no ids). The PDF is live's, self-hosted at live's path
 * (`public/assets/case-studies/improving-workflow-in-restaurant.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const restaurantWorkflowMeta = {
  path: "/case-study-restaurant-workflow-optimization",
  /** Live's `<title>`, verbatim (no space before the bracket, as live). */
  title: "Restaurant Workflow Optimization Platform[Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Learn how Soft Suave implemented tech-driven solutions to streamline restaurant operations, improve order management, and boost staff efficiency.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/improving-workflow-in-restaurant.pdf";

export const restaurantWorkflowCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Restaurant Workflow", "Optimization"],
    accent: "Restaurant Workflow",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "On-Demand" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(restaurantWorkflowMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      list: [
        "Our client, a leading restaurant chain, aimed to improve operational efficiency and enhance the dining experience.",
        "With multiple locations and a growing customer base, they struggled with reservations, customer preferences, staff schedules, and order workflows.",
        "Their outdated system relied on manual processes, causing issues like overbooked tables, mismanaged orders, and poor communication.",
        "To stay competitive, they needed a centralized solution that could automate operations, offer real-time insights, and provide a seamless experience across web and mobile platforms.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        "Dashboard",
        "Calendar Module",
        "Mailbox Integration",
        "Customer Management",
        "Employee Management",
        "Customizable App Settings",
        "Smart Menus",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Client Overview and Client Requirements — no
    // claim the case study doesn't make.
    body: "Download the full case study to see how we gave a restaurant chain one web and mobile platform for reservations, customers, staff schedules, orders and smart menus.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "improving-workflow-in-restaurant.pdf",
    requirement: "Case study download: requested the Restaurant Workflow Optimization case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Restaurant Workflow Optimization",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Restaurant Workflow Optimization case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(restaurantWorkflowMeta.path),
};
