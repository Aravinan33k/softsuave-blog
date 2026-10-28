import type { CaseStudyContent } from "@/components/case-study/case-study";
import { HERO_PLATFORM_ICONS as P, platformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-ticket-management-system` — softsuave.com's Advanced Ticket
 * Management App case study
 * (https://www.softsuave.com/case-study-ticket-management-system), rebuilt on
 * the site's case-study template the way
 * `telehealth-consultation-platform-for-doctors.ts` is (one of live's older,
 * plainly headed case studies).
 *
 * Every line of copy is the live page's, verbatim and in live's order — hero,
 * the four section headings, paragraphs, every list item, the four solution
 * labels and their descriptions, the closing download band and the
 * related-case-study heading. That includes live's quirks:
 * the Approach paragraph and the download band's line both speak of
 * healthcare and a telehealth app (carried over from live's Telehealth
 * page), and the third solution label ends in a full stop. The Solutions
 * labels-with-descriptions are set as the template's icon cards. Section ids
 * are live's (`#section1`…`#section4`).
 *
 * The images and PDF are live's, self-hosted
 * (`public/images/case-studies/ticket-management-system/`,
 * `public/assets/case-studies/`); the PDF keeps live's path.
 *
 * Not carried over: live's hero backdrop (the hero is set like the Vehicle
 * Intelligence one); what live leaves commented out, so never renders — the
 * iOS platform mark, a stray paragraph in Client Requirement, two in
 * Challenges, one in Approach, two items in Solutions, and a technology grid
 * and two "Bringing Delight" blocks from other case studies; and the images'
 * terse alts, described here instead.
 */

export const ticketManagementMeta = {
  path: "/case-study-ticket-management-system",
  /** Live's `<title>`, verbatim (its "Exlpore" typo included). */
  title: "Exlpore Ticket Management System [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Ticket Management System case study highlighting custom solutions that simplified issue tracking, automated workflows, and improved service.",
  /** Live's `og:title` / `twitter:title`, verbatim — not its `<title>`. */
  socialTitle: "Exlpore Ticket Management System case study",
  /** Live's `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const IMG = "/images/case-studies/ticket-management-system";
const PDF = "/assets/case-studies/ticket-management-system.pdf";

export const ticketManagementCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Advanced Ticket Management App", "for Risk-Free Transactions"],
    accent: "Ticket Management App",
    titleSubLast: true,
    body: [
      "Soft Suave developed futuristic mobile and web applications, you can manage tickets and customer relationships on the go. We Advanced their needs and made the existing application more user-friendly and simple to manage with cost-effective solutions.",
    ],
    points: [],
    facts: [
      { label: "Industry :", value: "Real Estate" },
      // Live shows Android and Web; its iOS mark is commented out.
      platformFact([P.Android, P.Web]),
    ],
    aside: {
      src: `${IMG}/hero.webp`,
      width: 560,
      height: 617,
      alt: "Two phone screens of the property app: a Find Your Best Property home screen with recommended homes, and a Filters screen for sale or rent, property type, price range and bedrooms",
      blurDataURL:
        "data:image/webp;base64,UklGRsYAAABXRUJQVlA4WAoAAAAQAAAADgAADwAAQUxQSDwAAAABYBMAYJL5hsbhI6J2IAN9XBO4OwSICAFBoQVuILohRjdt4mzaDNZ0wX+3cPqv4N19b9xVh8OmMRV9wwFWUDggZAAAAPABAJ0BKg8AEAADgFoljAAC3W3TF7umAAD+yP/z/xJNuLZTpvgxGu4+9uz07bAdbN6nO9+XnNi7A/B4Xb0gV/45wzuqMYYi6QOnKW7on8vFQt3X/bziYQ1QpQBaK8VsRcUAAAA=",
    },
    // No backdrop photo: the hero stands on the flat dark surface, the phones
    // beside the copy its image.
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Requirement",
      title: "Client Requirement",
      body: [
        "Our client is one of the top companies in the Real Estate industry, who combines protection and technological innovation in the house rental and property market in Malaysia and serves customers like property owners, landlords and tenants. The client came with requirements to enhance features in their Web Application and Mobile application.",
        "Then as the Client was using multiple third party applications like JIRA & HUBSPOT, that were expensive and had fewer options they came up with a requirement to build an in-house Ticket Management System and CRM application to cut back their prices and have several customized features as per their business needs. The client also wanted to modify their front-end from Thymeleaf framework to React.",
      ],
      image: {
        src: `${IMG}/requirement.webp`,
        width: 537,
        height: 602,
        alt: "Two phone screens of the property app: the home screen with property search, quick links and recommended homes, and the Filters screen for property type, price range and bedrooms",
        blurDataURL:
          "data:image/webp;base64,UklGRroAAABXRUJQVlA4WAoAAAAQAAAADQAADwAAQUxQSDwAAAABZ6CgbSM3d3vfIXs2HxHxLvDwU6oTAlFtGyohgCOLEiqooY0M9szMj2U5ASL6PwENmCphLXz5bSwSmQ5WUDggWAAAANABAJ0BKg4AEAADgFollAAC907BL9RwAP71T7T/llWZxNVVEyowWfu5xZierYrgOpz6TP0MSLAHNcutNC/9Ig/Ad6JlX8+59oOMtJWFBxCFcFtYWOrtlgA=",
      },
    },
    {
      id: "section2",
      nav: "Challenges",
      title: "Challenges",
      list: [
        "Bug fixes were essential before beginning with the feature enhancements in their Web Application",
        "As several developers were operating Frontend and Backend on the Single Application Development, communication and coordination were very important.",
        "Starting from scratch to develop an app with the same features as their third party app and several customized feature was a challenging task.",
        "Creating Customized CRM application with trigger alerts for a few personalized features.",
        "Creating innovative features for the customer usage of the Mobile Application.",
      ],
      listSingle: true,
    },
    {
      id: "section3",
      nav: "Soft Suave's Approach",
      title: "Soft Suave's Approach",
      body: [
        "Promoting healthcare through innovative healthcare solutions is an ambiguous task. The development team at Soft Suave overcame all the hassles with the help of proficient tech expertise and experience.",
      ],
      list: [
        "Soft Suave completed the Backend coding in the Ticket Management System and later started few front-end functionalities to work, which made it easy for the opposite developers to work Frontend with ease",
        "Soft Suave designed several backend and frontend features in the mobile app that helped in streamlining the activities for the customers.",
        "CRM application with many customized features was built in accordance with the requirement of the client.",
        "Soft Suave’s developer was urged to be hired by the client to work alongside their other group of developers behind the Application.",
      ],
      listSingle: true,
    },
    {
      id: "section4",
      nav: "Soft Suave Solutions",
      title: "Soft Suave Solutions",
      cards: {
        variant: "icon",
        items: [
          {
            name: "Customer Relationship Management",
            body: "Soft Suave designed several backend and frontend features in the mobile app that helped in streamlining the activities for the customers.",
          },
          {
            name: "Ticket Management System – Home Application",
            body: "KANBAN – An In-house Application for ticket management system was built with many innovative features designed to meet various needs.",
          },
          {
            name: "Mobile Application Enhancements.",
            body: "A Dedicated developer was assigned by Soft Suave to work frontend and backend for the changes shared by the client.",
          },
          {
            name: "Smooth Transition in Front-end",
            body: "An expert team was assigned to make the switching process easier and smoother from Thymeleaf framework to React. The transition was a great success.",
          },
        ],
      },
      image: {
        src: `${IMG}/solutions.webp`,
        width: 566,
        height: 587,
        alt: "Two phone screens of the property app: the Filters screen, and a property list for Roncesvalles, Toronto showing apartments with monthly rent, rooms and floor area",
        blurDataURL:
          "data:image/webp;base64,UklGRroAAABXRUJQVlA4WAoAAAAQAAAADgAADwAAQUxQSDkAAAABb6CgjRQ2+OylAVkYICLifW+EuYmUCYwiSVK0jAbWxKoiZ9iariXdP6L/sYDykZ5kJZn/0+a0DzAAVlA4IFoAAACwAQCdASoPABAAA4BaJZQAAsb0jwEGAP71Pgn7fO3mF7qiv52YxEupqjhGkt9hMb/p46kI7dvJixo+7qJvF7ApEa+oahCtFAJeLndDzpuyx5IGNW74KQ1HgAA=",
      },
    },
  ],

  download: {
    navLabel: "Download",
    // Live's closing band, verbatim — its telehealth wording included.
    body: "Check out our case study on developing a custom telehealth app now to learn how to navigate and other technical details.",
    label: "Download Case Study",
    pdf: PDF,
    fileName: "ticket-management-system.pdf",
    requirement: "Case study download: requested the Advanced Ticket Management App case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Advanced Ticket Management App for Risk-Free Transactions",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Advanced Ticket Management App case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(ticketManagementMeta.path),
};
