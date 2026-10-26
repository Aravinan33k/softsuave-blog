import type { CaseStudyContent } from "@/components/case-study/case-study";
import { listingPlatformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-smart-movie-ticketing-with-real-time-booking` — softsuave.com's
 * Smart Movie Ticketing with Real-Time Booking case study
 * (https://www.softsuave.com/case-study-smart-movie-ticketing-with-real-time-booking),
 * rebuilt on the site's case-study template the way
 * `smart-warranty-document-management.ts` is (one of live's On-Demand
 * short-form case studies).
 *
 * Every line of copy is the live page's, verbatim: the H1, the "Client
 * Overview" and "Client Requirements" point lists (the requirements keep
 * live's bold lead-in labels), the "Industry" line, the "View Full Case Study"
 * button and the related-case-study heading. The H1 is set the
 * way the Vehicle Intelligence hero is, with no hero image (live's page has
 * none), "Industry" is the hero's fact, and the two lists are sections
 * (`section1`, `section2` — live has no ids). The PDF is live's, self-hosted
 * at live's path
 * (`public/assets/case-studies/movie-ticketing-with-real-time-booking.pdf`).
 *
 * Live's download panel has no paragraph; the one here is written for this
 * site (see `download.body`) — the page's only copy that is not live's.
 *
 * The related lane is the shared, position-based one (`related.ts`): the
 * previous study and the next four in the case-study listing.
 */

export const movieTicketingMeta = {
  path: "/case-study-smart-movie-ticketing-with-real-time-booking",
  /** Live's `<title>`, verbatim. */
  title: "Smart Movie Ticketing with Real-Time Booking [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Explore how Soft Suave redefined movie ticketing by enabling real-time booking and Quick Book features to streamline user experience and boost engagement.",
  /** Live's only Open Graph tag, `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const PDF = "/assets/case-studies/movie-ticketing-with-real-time-booking.pdf";

export const movieTicketingCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Smart Movie Ticketing", "with Real-Time Booking"],
    accent: "Smart Movie Ticketing",
    titleSubLast: true,
    // Live's page has no hero paragraph and no image.
    body: [],
    points: [],
    facts: [
      { label: "Industry :", value: "On-Demand" },
      // Live's page shows no platforms; these are its listing card's.
      listingPlatformFact(movieTicketingMeta.path),
    ],
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      list: [
        "The client, a renowned cinema operator managing multiple theaters across various locations, recognized the shifting preferences of modern audiences.",
        "With increasing demand for online bookings and personalized experiences, they needed a digital solution that could cater to tech-savvy customers while optimizing backend operations.",
        "Their goal was to provide moviegoers with a fast, intuitive, and visually engaging platform that would simplify ticket purchases, integrate with third-party movie databases, and offer exclusive loyalty rewards—setting a new benchmark for the industry.",
      ],
      listSingle: true,
    },
    {
      id: "section2",
      nav: "Client Requirements",
      title: "Client Requirements",
      list: [
        {
          lead: "Seamless Web & Mobile Booking - ",
          text: "A responsive platform allowing users to book tickets effortlessly.",
        },
        {
          lead: "Real-time Showtimes & Seat Selection - ",
          text: "Live integration with external databases for accurate movie schedules and seat updates.",
        },
        {
          lead: "Multi-payment Gateway Support - ",
          text: "Integration of various payment options, including digital wallets and UPI.",
        },
        {
          lead: "Automated Pricing & Discounts - ",
          text: "AI-driven dynamic pricing and promotional offers based on demand.",
        },
        {
          lead: "Loyalty & Personalization Features - ",
          text: "Rewards, offers, and personalized recommendations to enhance user engagement.",
        },
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's panel is the button alone; this three-line lead-in is written
    // here, from the page's own Client Overview and Client Requirements — no
    // claim the case study doesn't make.
    body: "Download the full case study to see how we built a cinema booking platform with real-time showtimes and seats, multiple payment options and loyalty rewards.",
    label: "View Full Case Study",
    pdf: PDF,
    fileName: "movie-ticketing-with-real-time-booking.pdf",
    requirement: "Case study download: requested the Smart Movie Ticketing with Real-Time Booking case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Smart Movie Ticketing with Real-Time Booking",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Smart Movie Ticketing with Real-Time Booking case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(movieTicketingMeta.path),
};
