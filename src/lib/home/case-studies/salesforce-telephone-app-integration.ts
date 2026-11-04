import type { CaseStudyContent } from "@/components/case-study/case-study";
import { HERO_PLATFORM_ICONS as P, platformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-salesforce-telephone-app-integration` — softsuave.com's
 * A Cloud-based Integration Telephone App case study
 * (https://www.softsuave.com/case-study-salesforce-telephone-app-integration),
 * rebuilt on the site's case-study template the way
 * `job-progress-tracking.ts` is (one of live's older, plainly headed case
 * studies).
 *
 * Every line of copy is the live page's, verbatim and in live's order — hero,
 * the six section headings, paragraphs, every list item, the six key-feature
 * lines, the closing download band and the related-case-study heading. That
 * includes live's "Build Open CTI" and "could get the better of", and its
 * `<title>`'s "Salseforce". The key features — an icon and a sentence each on
 * live — are the template's logo tiles in their wide form (`techWide`), with
 * live's icons; "Technologies Used" is live's single diagram. Section ids are
 * live's (`#section1`…`#section6`).
 *
 * The images, icons and PDF are live's, self-hosted
 * (`public/images/case-studies/salesforce-telephone-app-integration/`,
 * `public/assets/case-studies/`); the PDF keeps live's path.
 *
 * Related lane: the shared, position-based one (`related.ts`) — the
 * previous study and the next four in the case-study listing.
 *
 * Not carried over: live's hero backdrop (the hero is set like the Vehicle
 * Intelligence one); what live leaves commented out, so never renders — the
 * Android platform mark, a paragraph and three list items from other case
 * studies, an image, and a whole tech-stack and app-features block from the
 * Digital Banking page; and the images' terse alts, described here instead.
 */

export const salesforceTelephoneMeta = {
  path: "/case-study-salesforce-telephone-app-integration",
  /** Live's `<title>`, verbatim ("Salseforce" included). */
  title: "Salseforce telephone application integration [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Explore Salesforce telephone application integration case study showing how seamless connectivity improved customer service and sales operations.",
  /** Live's `og:title` / `twitter:title`, verbatim — not its `<title>`. */
  socialTitle: "Salseforce telephone application integration case study",
  /** Live's `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const IMG = "/images/case-studies/salesforce-telephone-app-integration";
const ICON = `${IMG}/icons`;
const PDF = "/assets/case-studies/salesforce-telephone-app-integration.pdf";

const icon = (file: string) => ({ src: `${ICON}/${file}`, width: 100, height: 100 });

export const salesforceTelephoneCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["A Cloud-based Integration", "Telephone App"],
    accent: "Cloud-based",
    titleSubLast: true,
    body: [
      "Soft Suave developed an app that integrates with Salesforce and provides seamless telephone communication. The app’s powerful cloud-based in-company upshot with extensive integration capabilities cuts operating costs and offers great flexibility.",
    ],
    points: [],
    facts: [
      { label: "Industry :", value: "Tele Communications" },
      // Live shows Web; its Android mark is commented out.
      platformFact([P.Web]),
    ],
    aside: {
      src: `${IMG}/hero.webp`,
      width: 1440,
      height: 849,
      alt: "A laptop showing a Salesforce contact record with an incoming-call panel offering Answer, Decline and Divert to Voicemail, and logged phone-system calls in the activity timeline",
      blurDataURL:
        "data:image/webp;base64,UklGRq4AAABXRUJQVlA4WAoAAAAQAAAADwAACAAAQUxQSEQAAAABd8A2AMCy0di2irVjIyLA5crLfwy/jCZWQE5ba0IIIYcQcsgghxByyGSfwxCGMIn2awQR/Z8AXgDQJHfuj+xxNGqmA1ZQOCBEAAAA8AEAnQEqEAAJAAOAWiWUAuwBEOM35XvAAP6ahQ6PcskYlmhgqs7r5iUAXew6G5ZK7Qwogs9Wu2mwomLlh2IHIwjvuAA=",
    },
    // No backdrop photo: the hero stands on the flat dark surface, the laptop
    // beside the copy its image.
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Overview",
      title: "Overview",
      body: [
        "Our client is a leading cloud communications services company based out of Spain. Their powerful cloud-based in-company product with extensive integration capabilities cuts operating costs and offers great flexibility.",
        "They are licensed, and award-winning operators specialized in telecommunications service consulting, management of smart communications and offer customized corporate services in cloud computing technology.",
      ],
    },
    {
      id: "section2",
      nav: "Requirements",
      title: "Requirements",
      body: [
        "The client wanted an App that integrates with Salesforce and offers seamless cloud-based telephone communication.",
      ],
      list: [
        "Establish CTI (Computer Telephony Integration) with Salesforce.",
        "Internal and external communication from a single platform.",
        "Unification of Salesforce contacts with open CTI.",
        "Generate unique extension numbers for all contacts in Salesforce.",
        "Click to dial for instant call connectivity.",
        "Features to add contact and check call history effortlessly.",
      ],
      listSingle: true,
    },
    {
      id: "section3",
      nav: "Challenges Faced By Soft Suave",
      title: "Challenges Faced By Soft Suave",
      body: [
        "Developing cloud-based software is no easy task. Our developers faced few challenges during the development but could get the better of with experience and expertise.",
      ],
      list: [
        "Passing the security review while working on the test class.",
        "Covering a minimum of 75% code during the development of Salesforce's test class.",
        "Building a test environment was a challenge.",
      ],
      listSingle: true,
    },
    {
      id: "section4",
      nav: "Solution Offered By Soft Suave",
      title: "Solution Offered By Soft Suave",
      body: [
        "The development team at Soft Suave leveraged all the tech expertise and built a cloud-based telephony system that integrated well with Salesforce.",
      ],
      list: [
        "Developed Visualforce Pages to access, display and update the organization’s data.",
        "Executed flow and transaction control statements using Apex Class.",
        "Build Open CTI to allow the app to make calls from Salesforce directly.",
        "Facilitated creation of unique extension numbers for the contact list.",
        "Apex triggers were added to validate extension field edit by the administrator.",
        "Executed click to dial feature to make users attempt a call with a single click.",
        "Configured availability and unavailability status update on the contact list.",
        "Leveraged Aura component for building interactive UI.",
        "Established seamless communication between agents within the team.",
      ],
      listSingle: true,
    },
    {
      id: "section5",
      nav: "Key Features of the Software",
      title: "Key Features of the Software",
      tech: [
        { name: "Used to enter a phone number (via button click and keyboard) to make calls.", logo: icon("dial-pad-1.svg") },
        {
          name: "Lists all visible agents along with their details such as name, extension, avatar, and status.",
          logo: icon("agent-list.svg"),
        },
        { name: "Lists all the services assigned to the current agent along with their status.", logo: icon("service123.svg") },
        { name: "Lists all the contacts fetched from the CRM contact object.", logo: icon("contact-book-123.svg") },
        { name: "Shows all the ongoing calls (on-call / on-hold) of the current agent.", logo: icon("phone-call-123.svg") },
        {
          name: "Lists all the external (calls not made to extensions) inbound and outbound calls.",
          logo: icon("file-123.svg"),
        },
      ],
      techWide: true,
    },
    {
      id: "section6",
      nav: "Technologies Used",
      title: "Technologies Used",
      image: {
        src: `${IMG}/technologies.webp`,
        width: 746,
        height: 598,
        alt: "Salesforce at the centre of an arc linking the technologies used: Open CTI - JavaScript API, Visualforce, Apex Class, Lightning framework and SOQL",
        blurDataURL:
          "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAAAQAgCdASoQAA0AA4BaJZwAAu19vC8rJ38AAP74uazN8CCcz+wV8Z3ffJ/B33g4GCj3ZbzVnYMNNkakfirxMNSAOgFhexAAAAA=",
      },
    },
  ],

  download: {
    navLabel: "Download",
    // Live's closing band, verbatim.
    body: "Reduce operating costs with a cloud-based telephone app integration. Download the case study to learn more.",
    label: "Download Case Study",
    pdf: PDF,
    fileName: "salesforce-telephone-app-integration.pdf",
    requirement: "Case study download: requested the Salesforce Telephone App Integration case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – A Cloud-based Integration Telephone App",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Cloud-based Integration Telephone App case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(salesforceTelephoneMeta.path),
};
