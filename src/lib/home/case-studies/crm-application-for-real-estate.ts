import type { CaseStudyContent } from "@/components/case-study/case-study";
import { HERO_PLATFORM_ICONS as P, platformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-crm-application-for-real-estate` — softsuave.com's Real Estate
 * CRM Platform case study
 * (https://www.softsuave.com/case-study-crm-application-for-real-estate),
 * rebuilt on the site's case-study template the way
 * `ticket-management-system.ts` is (one of live's older, plainly headed case
 * studies).
 *
 * Every line of copy is the live page's, verbatim and in live's order — hero,
 * the six section headings, paragraphs, every list item, the technology names
 * and their links, the closing download band and the related-case-study
 * heading. That includes live's quirks: two sections are
 * named differently in the contents list than in their heading ("Technology
 * Used" / "Technologies & Frameworks", "Soft Suave’s Solution" / "Soft Suave
 * Solutions"), and the first technology tile reads "ionic" over Angular's
 * logo and links to the Ionic hiring page, the other two to the Android one.
 * Section ids are live's (`#section1`…`#section6`).
 *
 * The images and PDF are live's, self-hosted
 * (`public/images/case-studies/crm-application-for-real-estate/`,
 * `public/assets/case-studies/`); the PDF keeps live's path. The technology
 * logos are the ones the earlier clones already ship.
 *
 * Not carried over: live's hero backdrop (the hero is set like the Vehicle
 * Intelligence one); what live leaves commented out, so never renders — the
 * Android platform mark, stray paragraphs and list items from other case
 * studies in four sections, and a duplicate "Bringing Delight" block; and
 * the images' terse alts ("ecommerce"), described here instead.
 */

export const crmRealEstateMeta = {
  path: "/case-study-crm-application-for-real-estate",
  /** Live's `<title>`, verbatim. */
  title: "Explore Real estate CRM Development [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Real Estate CRM Development case study highlighting tailored solutions that improved automation, reporting, and real estate workflows.",
  /** Live's `og:title` / `twitter:title`, verbatim — not its `<title>`. */
  socialTitle: "Explore Real estate CRM Development case study",
  /** Live's `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const IMG = "/images/case-studies/crm-application-for-real-estate";
const TECH = "/images/case-studies/technologies";
const PDF = "/assets/case-studies/crm-software-for-realestate-management.pdf";

export const crmRealEstateCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Real Estate CRM Platform", "for better Process Tracking"],
    accent: "CRM Platform",
    titleSubLast: true,
    body: [
      "Soft Suave designed and developed a real estate Management App Real estate owners can use a CRM application.",
    ],
    points: [],
    facts: [
      { label: "Industry :", value: "Real Estate" },
      // Live shows iOS and Web; its Android mark is commented out.
      platformFact([P.iOS, P.Web]),
    ],
    aside: {
      src: `${IMG}/hero.webp`,
      width: 500,
      height: 498,
      alt: "Two phone screens of the real estate app: a property list for Calabasas, California with monthly rents, and a listing's details with map, nearby and street views and a Check Availability button",
      blurDataURL:
        "data:image/webp;base64,UklGRiIBAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSHIAAAABcFpt27I8BxodEtFlDzaw5JrItgGM8NOosICNACu4TuB89r7nXSEiJqAxdnt+LPaTYgj4KTIZVkqp36ar6HTZUerBTakZk7lSHaag6CjjUTswO8rj2ILkF5RsIRmJspJnAPhSF2cNIDd0O75IZ34rAQBWUDggigAAAHACAJ0BKhAAEAADgFollAARADxrwh81OcmRWRgA/uI+21nWqIXOfG0r8d43xgrqVBPuMQpzh2osp+sv2yetRHABBA8V21cN790lAvzNnCz/+SdA6VlraYWDc+weJzFLnwiRbSbfvqfj14+0Jrq2fxoeshoZD+wGx2tjMZDZ0Fdmt+fR7qLoCAAAAA==",
    },
    // No backdrop photo: the hero stands on the flat dark surface, the phones
    // beside the copy its image.
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      body: [
        "The client was a leading digitalization company in France that offers digitalization in design and marketing phases for residential, commercial and urban real estate. The customers of the clients were the leading real estate companies around the world.",
        "The business goal of the client was to build CRM for real estate owners, Web, iOS & Desktop applications for real estate management, and implement 360-degree view on real estate properties.",
      ],
      image: {
        src: `${IMG}/overview.webp`,
        width: 456,
        height: 494,
        alt: "Two phone screens of the real estate app: a property list for Calabasas, California, and its Sort by sheet with newest, price, beds and size options",
        blurDataURL:
          "data:image/webp;base64,UklGRq4AAABXRUJQVlA4WAoAAAAQAAAADgAADwAAQUxQSDQAAAABYFpbe5MdoruLjWsDJ8AKLFGXqBZc/X6LjogJmK7vmVz48gs3F9yJFtF/Z0aZYPZr/AE6VlA4IFQAAACwAQCdASoPABAAA4BaJaQAAp1yhl0AAP7yic7V15Jb1c/v51fRLGYvIIeD82xFAR6+C3DEdScJz8QcMk9CU4EKj8eD+4fcy3+/p2wXiKM1hOOgAAA=",
      },
    },
    {
      id: "section2",
      nav: "Client Requirement",
      title: "Client Requirement",
      list: [
        "The client wanted to build a Web application, Desktop application, and an iOS application for real estate management.",
        "Build a CRM application for Real Estate owners to track the progress of their respective properties.",
        "Develop automated loggers to track changes that happen within the Database.",
      ],
      listSingle: true,
    },
    {
      id: "section3",
      nav: "Existing Challenges",
      title: "Existing Challenges",
      list: [
        "The lack of digital view – 360-degree view declined the sales numbers.",
        "Many customers refused to seal a deal due to lack of PDF viewer for property document and contract document.",
        "The application was built using Firebase thus, database download and storage was a challenge.",
        "Lack of back-end support created a lot of confusion during implementation.",
      ],
      listSingle: true,
    },
    {
      id: "section4",
      nav: "Technology Used",
      title: "Technologies & Frameworks",
      tech: [
        // Live's label over Angular's logo, as live has it.
        { name: "ionic", logo: { src: `${TECH}/angular.svg`, width: 20, height: 22 }, href: "/hire-ionic-developers" },
        { name: "Firebase", logo: { src: `${TECH}/firebase.svg`, width: 64, height: 64 }, href: "/hire-android-developers" },
        { name: "Electron", logo: { src: `${TECH}/electron.svg`, width: 64, height: 64 }, href: "/hire-android-developers" },
      ],
    },
    {
      id: "section5",
      nav: "Soft Suave’s Solution",
      title: "Soft Suave Solutions",
      body: [
        "The innovative developers at Soft Suave developed solutions that were affordable for the client and fulfilled all the primary business goals.",
      ],
      list: [
        "The developers created a 360-degree view for client’s properties. This digitalization allowed customers to have a detailed picture of the properties.",
        "CRM was developed successfully to manage the client’s properties effectively.",
        "iOS application was developed with minimalistic features to keep track of all the online activities.",
        "Loggers were created to track the modifications in the Database. As there was no server support, cloud function was used to develop automated logger entry.",
        "The proficient developers at Soft Suave used SQL lite to make the application usable in Offline.",
      ],
      listSingle: true,
      image: {
        src: `${IMG}/solutions.webp`,
        width: 463,
        height: 490,
        alt: "Two phone screens of the real estate app: a listing's details with rent, beds, baths, description and listing agent, and the Calabasas, California property list",
        blurDataURL:
          "data:image/webp;base64,UklGRrYAAABXRUJQVlA4WAoAAAAQAAAADgAADwAAQUxQSC4AAAABUBoAIHODH3aUPeAKumM1L+ir7tnkiJgALFcOY1tdaGtR7dF8md5lu/FAyJUBVlA4IGIAAACwAQCdASoPABAAA4BaJYwAAugyWOnQAP39P0il9OUMLneF91Hdye15/wMcriJa79doTT6pcdh1DmH+M8DaJSGfp/V5mR1LKd0Z8v4EeQlqje3+q+vwTLENZz3sL96ikgAAAA==",
      },
    },
    {
      id: "section6",
      nav: "Bringing Delight to the Client",
      title: "Bringing Delight to the Client",
      body: [
        "The team of skilful developers at Soft Suave went the extra mile and provided innovative and delightful solutions to the client.",
      ],
      list: [
        "Offline app usage was initiated to allow customers to use the application even without the internet. In addition, SQL lite was integrated for high-performance.",
        "Separate web apps for client’s internal and external usage was developed. Admins used the internal app to manage clients and clients used external app in the form of a dedicated web app to hunt properties.",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    // Live's closing band, verbatim.
    body: "Learn how a Real Estate CRM platform improves process tracking in this case study. Manage leads, listings, and transactions and get valuable insights.",
    label: "Download Case Study",
    pdf: PDF,
    fileName: "crm-software-for-realestate-management.pdf",
    requirement: "Case study download: requested the Real Estate CRM Platform case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Real Estate CRM Platform for better Process Tracking",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Real Estate CRM Platform case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(crmRealEstateMeta.path),
};
