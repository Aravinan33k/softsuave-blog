/**
 * The `hire-angularjs-developers` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-angularjs-developers/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all twenty.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { webExplore } from "../hire-explore";
import { partnerTable } from "../hire-comparison";
import { CURATED_STEPS } from "../hire-blocks";
import { YEARS_PLUS } from "../../company-figures";

export const skill: HireSkill = {
  closingCtaIcon: true,
  clientsWideTitle: true,
  slug: "hire-angularjs-developers",
  key: "angular",
  name: "Angular",
  role: "Angular Developers",
  metaTitle: "Hire Angularjs Developers India – Top 1% Programmers",
  metaDescription:
    "Hire expert AngularJS developers in India with 40 hours of free trial. Access the top 3% of developers for custom, high-performance web solutions.",
  serviceType: "Angular development staffing",
  // Matches the live page's own breadcrumb trail exactly: Home › Hire
  // Developers › Angular Developers.
  showBreadcrumb: true,
  breadcrumbParents: [{ name: "Hire Developers", path: "/hire-dedicated-developers" }],
  ctaLabel: "Hire Angular developers",

  order: [
    "applications",
    "combinations",
    "midCta",
    "techStack",
    "whyUs",
    "comparison",
    "process",
    "exploreMore",
    "testimonials",
    "faq",
  ],

  hero: {
    titleLines: ["Hire Angular Developers", "In India"],
    accent: "Angular Developers",
    body: [
      "Soft Suave offers Angular developers from India who help companies build scalable and feature-rich web applications. Access specialists in Angular, TypeScript, RxJS, dashboards, enterprise platforms, and modern frontend architecture.",
      "See why businesses choose Soft Suave for their Angular developer hiring.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Angular Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      submitHover: 'black',
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Angular requirement.",
      subject: "Angular Developers enquiry",
      alert: sharedHeroAlert,
    },
    // A photo for this technology, darkened by the strong veil `HirePage`
    // applies (review: "update the images and add a black gradient").
    image: {
      src: "/images/landing/hs-angular-hero.webp",
      width: 1800,
      height: 900,
      alt: "HTML markup open in a dark-themed code editor",
      blurDataURL:
        "data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAABwAQCdASoQAAsAA4BaJaVefAGIAAD+9FoKscpdHQakztadfbqvfjauJmBwAA==",
    },
  },

  applications: {
    wideHead: true,
    carousel: true,
    eyebrow: "What We Build",
    title: "Applications That Our Developers Build Using Angular",
    body: "Build various high-performance applications by accessing our offshore Angular developers",
    items: [
      {
        name: "Single Page Applications (SPAs)",
        body: "SPAs are created using Angular, and they are web applications that load a single HTML page. With every click of the mouse, only a small part of the page gets loaded, so the page loads faster, and performance is more efficient.",
      },
      {
        name: "Progressive Web Applications (PWAs)",
        body: "PWAs run on multiple platforms from a single codebase, work offline, and load pretty fast. Thanks to its superior UX, it also increases engagement and is highly responsive.",
      },
      {
        name: "Enterprise Web Apps",
        body: "They are cutting-edge software solutions for big companies, using Angular for smooth interfaces and better performance. It allows for cost and time savings for modern businesses.",
      },
      {
        name: "E-commerce Platforms",
        body: "E-commerce platforms are online stores powered by Angular, which load fast and update content dynamically for great user experiences. Allows a faster buying process, is flexible for customers, and is affordable for businesses.",
      },
      {
        name: "Content Management Systems",
        body: "These platforms are used for managing content, and have simple interfaces, but optimized workflows. They support various content and features like SEO optimization, user permissions, etc.",
      },
      {
        name: "Real-Time Dashboards",
        body: "These are live data tools that show instant insights for quick decisions and better productivity. They help businesses improve productivity by monitoring performance.",
      },
      {
        name: "Social Networking Sites",
        body: "These are online platforms that offer personalized features that connect people worldwide. It improves engagement through interactive features like groups and events, thus increasing user interaction.",
      },
    ],
  },

  combinations: {
    wideHead: true,
    eyebrow: "Tech Combinations",
    title: "Tech Combinations Our Developers Use",
    body: "Hire Angular Developers who can utilize various tech combinations to personalize your solutions",
    items: [
      {
        name: "Angular + Node",
        body: "Angular and Node complement each other's strengths and weaknesses. They enable full-stack Javascript development allowing real-time features and interactive applications.",
      },
      {
        name: "Angular + Laravel",
        body: "Laravel's structure and features complement Angular's front-end capabilities, ensuring smooth operations and a simplified development process. Both follow the MVC architecture for security.",
      },
      {
        name: "Angular + PHP",
        body: "Using Angular with PHP allows developers to choose different tools for different parts of the web app. It can be used to build tailored and scalable web applications.",
      },
      {
        name: "Angular + Django",
        body: "Django is fast, offers versatile features, and is secure and scalable. Paired with Angular's abilities to create appealing UI and cross-platform solutions across Mac and Windows, this combo delivers impressive web applications.",
      },
      {
        name: "Angular + ASP.NET Core",
        body: "They work together to make sure proper communication is maintained between the front-end and back-end. By hiring Angular developers from us, building complex web apps becomes easier.",
      },
      {
        name: "Angular + AWS",
        body: "By using Angular with AWS, you can strengthen your web app and store data in the cloud. Our remote angular developers ensure that your web app operates smoothly by using AWS, even with heavy traffic.",
      },
    ],
  },

  midCta: {
    title: "Interested in Hiring AngularJS Developers on Contract?",
    body: "Access offshore Angular developers in india who work remotely with you. Contact us to view ratecard.",
    cta: { label: "Request Rate Card", href: "/contact" },
  },

  techStack: {
    wideHead: true,
    eyebrow: "Technology",
    title: "Tech Stack - Our Developer's Skillset",
    body: "Discover our developers' proficiency across a wide range of frameworks, libraries, databases, and tools, ensuring top-notch solutions for your projects.",
    groups: [
      { name: "Frameworks", items: ["Angular JS", "Angular 2+", "NGRX (Angular + Redux)"] },
      {
        name: "Libraries",
        items: [
          "RxJs",
          "NG-Bootstrap",
          "PrimeNG",
          "Angular Material",
          "Bootstrap 3+",
          "Syncfusion",
          "KendoUI",
          "FullCalendar",
        ],
      },
      {
        name: "Databases",
        items: ["PostgreSQL", "RethinkDB", "MongoDB", "Firebase", "CouchDB", "MySQL"],
      },
      { name: "Tools & Utilities", items: ["VS Code", "Sublime", "Webstorm"] },
    ],
  },

  whyUs: {
    wideHead: true,
    // Live closes this band on "Contact us" (review: "CTA button missing").
    cta: { label: "Contact us", href: "/contact" },
    eyebrow: "Why Soft Suave",
    title: "Why Hire Angular Developers From Soft Suave?",
    body: "Using the skills of offshore AngularJS developers can be highly beneficial for your web application needs. Let us tell you why!",
    items: [
      {
        name: `${YEARS_PLUS} Years of Average Experience`,
        body: "Our Angular developer's years of experience in the field help us deliver custom-made, quality solutions- on time, every time.",
        icon: "book",
      },
      {
        name: "Defined Talent Screening",
        body: "Our developers are carefully selected through an extensive screening process, so we lend only the best talents for your requirements.",
        icon: "users",
      },
      {
        name: "Transparency & Integrity",
        body: "Our agile approach allows for transparency in the development process, helping you to view your app status anytime.",
        icon: "shield",
      },
      {
        name: "Free No-Obligation Quote",
        body: "Talk to us about your ideas, project details, and requirements, and get an immediate price quote for free.",
        icon: "coins",
      },
      {
        name: "Engagement Model Flexibility",
        body: "We understand the need for flexible resource engagements and offer a three-part engagement model: full-time, part-time, and milestone.",
        icon: "gauge",
      },
      {
        name: "Time Zone Flexibility",
        body: "As the time zone difference poses a great challenge, our developers adjust their working hours to work collaboratively with you on projects.",
        icon: "globe",
      },
    ],
  },

  comparison: {
    ...partnerTable("Choose the Right Angular Development Partner"),
    wideHead: true,
  },

  process: {
    wideHead: true,
    eyebrow: "Hiring Process",
    title: "The 4-step Angular Developer Hiring Process",
    body: "Onboarding developers has never been easier. With this simple 4-step process, find the resource who is the perfect fit for your team!",
    steps: CURATED_STEPS,
  },

  exploreMore: {
    ...webExplore,
    wideHead: true,
  },

  faq: {
    wideHead: true,
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    body: "Know more about our processes and how we work, with the help of the following FAQs.",
    // Matches the live page's own link, inside the Angular-vs-React answer
    // (review: "internal links missing in the FAQs"). Live links to its own
    // blog, which this app does not host, so the link goes to
    // softsuave.com's post directly.
    links: [
      {
        text: "Angular versus React and guidance on making the right choice",
        href: "https://www.softsuave.com/blog/angular-vs-react-which-framework-to-choose/",
      },
    ],
    items: [
      {
        q: "What do developers use AngularJS for?",
        a: "Developers utilize AngularJS to construct dynamic web apps with rich user interaction—specifically, single-page applications. This framework simplifies development by providing a structured way to code and handle user input.",
      },
      {
        q: "How do I test your AngularJS developer's expertise?",
        a: "You can do that by conducting technical interviews and coding tests. Assess their understanding of AngularJS architecture, component building, and data binding. Review portfolios, and past projects for relevant expertise.",
      },
      {
        q: "How much does it cost to hire AngularJS Developers?",
        a: "Hiring costs fluctuate depending on project complexity, and developer aptitude. Soft Suave offers transparent, tailored pricing—balancing cost effectiveness, and quality.",
      },
      {
        q: "Can I hire AngularJS developers in less than 48 hours through Soft Suave?",
        a: "Yes, you can. Our team of highly skilled AngularJS developers can start working with you within 48 hours.",
      },
      {
        q: "What if I am not satisfied with the hired AngularJS app developer's work?",
        a: "Our client's satisfaction is our priority. Any concerns will be immediately discussed and addressed. We ensure to provide proper support until project requirements are met to satisfaction.",
      },
      {
        q: "Do your developers follow Agile methodologies like Scrum or Kanban?",
        a: "Depending on the project, our developers follow either Scrum or Kanban and foster collaboration and adaptability throughout the development process.",
      },
      {
        q: "What tools and frameworks do your developers use for building Angular applications?",
        a: "Our developers use Angular CLI and TypeScript to create Angular apps efficiently. They rely on Angular Material for high-quality UI components and RxJS for handling asynchronous operations. They prefer Visual Studio Code (VS Code) as their coding environment.",
      },
      {
        q: "How will communication between my team and your AngularJS developers be facilitated?",
        a: "Soft Suave ensures clear communication through dedicated project managers and collaboration tools like Slack, Skype, and Zoom. We prioritize real-time feedback and progress tracking.",
      },
      {
        q: "What are the differences between Angular and React, and how should I choose?",
        a: "Angular provides a full-fledged framework with extensive tools for building complex applications, while React offers a flexible library optimized for fast UI updates through its virtual DOM. The choice between Angular and React should be based on project requirements, team skills, and scalability needs. Check out our detailed blog for insights on Angular versus React and guidance on making the right choice.",
      },
      {
        q: "Why should startups consider hiring offshore Angular developers?",
        a: "Angular offers numerous advantages for startups looking to develop efficient, scalable web applications. It supports rapid development with features like two-way data binding and dependency injection, making it easier to manage large projects. Angular's robust structure and backing by Google ensure it is a reliable choice for enterprises aiming for high performance and maintainability. For more understanding of why startups should opt for offshore Angular developers, refer to our comprehensive blog.",
      },
    ],
  },
};
