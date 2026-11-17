/**
 * The `hire-nodejs-developers` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-nodejs-developers/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all twenty.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { webExplore } from "../hire-explore";
import { partnerTable } from "../hire-comparison";
import { CURATED_STEPS } from "../hire-blocks";
import { CLIENTS_PLUS, HOURLY_RATE, YEARS_PLUS } from "../../company-figures";

export const skill: HireSkill = {
  slug: "hire-nodejs-developers",
  key: "nodejs",
  name: "Node.js",
  role: "Node.js Developers",
  metaTitle: `Hire NodeJS Developers in India - Trusted By ${CLIENTS_PLUS} Clients`,
  metaDescription:
    `Hire dedicated Node.js developers for scalable APIs and backend systems. Onboard in 48 hours with a 40-hour risk-free trial. Rates from ${HOURLY_RATE}.`,
  serviceType: "Node.js development staffing",
  // Matches the live page's own breadcrumb trail exactly: Home › Hire
  // Developers › Node.js Developers.
  showBreadcrumb: true,
  breadcrumbParents: [{ name: "Hire Developers", path: "/hire-dedicated-developers" }],
  ctaLabel: "Hire Node.js developers",

  order: [
    "applications",
    "combinations",
    "services",
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
    titleLines: ["Hire Node.js Developers", "In India"],
    accent: "Node.js Developers",
    body: [
      `Soft Suave provides pre-vetted Node.js developers experienced in Express.js, NestJS, MongoDB, and scalable backend systems, matched to your project within 48 hours. Every engagement starts with a 40-hour risk-free trial, with rates from ${HOURLY_RATE} and no long-term contract required until you're satisfied.`,
      "Here is how Soft Suave engineers your Node.js success.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Node.js Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Node.js requirement.",
      subject: "Node.js Developers enquiry",
      alert: sharedHeroAlert,
    },
    // A photo for this technology, darkened by the strong veil `HirePage`
    // applies (review: "update the images and add a black gradient").
    image: {
      src: "/images/landing/hs-node-hero.webp",
      width: 1800,
      height: 900,
      alt: "Server chassis lit blue in a dark data center",
      blurDataURL:
        "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADQAQCdASoQAAsAA4BaJbACdADc+C+SAAD+waGZnhnehndSF3yKlj7JcDWA8FgVzTWdvkXYeEP02Uv+zU1KH95F+HZAAA==",
    },
  },

  applications: {
    eyebrow: "What We Build",
    title: "Applications That Our Developers Build Using NodeJS",
    body: "Build and utilize various high-performance web applications with our developer's expertise",
    items: [
      {
        name: "Web Applications",
        body: "We develop web apps with NodeJS, ensuring smooth experiences across devices. From e-commerce sites to social networks, our developers use NodeJS for high-performance web solutions tailored to your needs.",
      },
      {
        name: "API Development",
        body: "You can hire our NodeJS developer to build scalable APIs with NodeJS for seamless application integration and communication. Whether it's connecting services or enabling real-time interactions, our API development ensures smooth connectivity.",
      },
      {
        name: "Real-time Applications",
        body: "We specialize in real-time apps using NodeJS for instant user communication. From chat apps to live streaming, our developers create high-performance solutions that meet user demands.",
      },
      {
        name: "Network Applications",
        body: "Our developers use NodeJS for efficient data transmission in network apps. From file sharing to multiplayer games, we utilize NodeJS and its event-driven architecture to create scalable apps.",
      },
      {
        name: "Data Streaming Applications",
        body: "As one of the top NodeJS development companies, we develop data streaming apps with NodeJS for real-time data processing. Whether it's video streaming or financial analysis, our developers ensure seamless data streaming and processing.",
      },
      {
        name: "IoT Applications",
        body: "We enable IoT connectivity with NodeJS. From smart homes to industrial monitoring, our developers utilize NodeJS and its lightweight nature to create scalable IoT solutions.",
      },
      {
        name: "Single-page Applications (SPAs)",
        body: "We build fast SPAs using NodeJS for quick loading times. From portfolios to dashboards, our developers utilize NodeJS and its asynchronous programming functionality to ensure smooth user experiences.",
      },
      {
        name: "Social & Interactive Apps",
        body: "We create engaging social apps with NodeJS for real-time interactions. Whether it's social networks or multiplayer games, our developers use NodeJS to build interactive experiences.",
      },
      {
        name: "Multimedia Apps",
        body: "We develop multimedia apps with NodeJS for efficient processing. From media streaming to video editing, our developers ensure high-performance solutions with NodeJS.",
      },
      {
        name: "Real-time Collaboration Tools",
        body: "We build collaboration tools with NodeJS for seamless teamwork. Whether it's project management or document editing, our developers use NodeJS to enable real-time collaboration.",
      },
    ],
  },

  combinations: {
    eyebrow: "Tech Combinations",
    title: "Tech Combinations Our Developers Use",
    body: "Technology Combinations our developers use to develop high-performing and scalable NodeJS apps",
    items: [
      {
        name: "NodeJS + ReactJS",
        body: "We combine NodeJS's powerful backend for scalability with ReactJS's dynamic and user-friendly front-end development. This duo ensures a seamless user experience and efficient data handling.",
      },
      {
        name: "NodeJS + AngularJS",
        body: "Our developers can leverage NodeJS on the backend for security and scalability while utilizing AngularJS's well-defined framework for building feature-rich web applications.",
      },
      {
        name: "NodeJS + VueJS",
        body: "NodeJS provides a robust backend, while VueJS's versatility and ease of use allow for the rapid development of interactive web interfaces within a NodeJS environment.",
      },
      {
        name: "NodeJS + ExpressJS",
        body: "Our developers utilize this combination to build fast APIs, and they use NodeJS for scalability and ExpressJS for simplified development.",
      },
      {
        name: "NodeJS + Koa",
        body: "Koa's lightweight nature allows for detailed control over the application logic, perfect for building complex and tailored APIs alongside the scalability of NodeJS.",
      },
      {
        name: "NodeJS + NestJS",
        body: "NestJS is a framework for building efficient and scalable server-side applications. Together with NodeJS, it utilizes JavaScript's versatility to create robust backend solutions.",
      },
    ],
  },

  services: {
    eyebrow: "Why NodeJS",
    title: "Why We Recommend NodeJS for Building Web Applications?",
    body: "With a diverse set of tools out there for building web applications, why should you choose NodeJS?",
    items: [
      {
        name: "Handles Traffic Spikes",
        body: "NodeJS lets your web app handle massive user surges without crashing. It scales smoothly, keeping things fast and responsive as your user base grows.",
      },
      {
        name: "Real-Time Features",
        body: "Want instant chat or live editing? NodeJS lets us build them! This keeps users engaged and productive.",
      },
      {
        name: "Streams Data Smoothly",
        body: "Apps usually deal with constant data flow, like in live video. NodeJS excels at handling this data for uninterrupted processing, so hire a NodeJS developer and procure quality solutions.",
      },
      {
        name: "Easy API Creation",
        body: "NodeJS simplifies building APIs, the messengers between different parts of your app. This allows for seamless data exchange.",
      },
      {
        name: "Faster Development",
        body: "NodeJS allows for quicker development by handling multiple requests at once. Get your app launched faster!",
      },
      {
        name: "Perfect for SPAs",
        body: "NodeJS is great for building Single-Page Applications (SPAs), web apps that load everything on one page. We handle the backend for a smooth user experience.",
      },
    ],
  },

  midCta: {
    title: "Looking for offshore NodeJS developers?",
    body: "Soft Suave offers a team of experts to fit your needs. Get a free 7-day trial today!",
    cta: { label: "Request Rate Card", href: "/contact" },
  },

  techStack: {
    eyebrow: "Technology",
    title: "Tech Stack - Our Developer's Skillset",
    body: "Discover our developers' proficiency across a wide range of frameworks, libraries, databases, and tools, ensuring top-notch solutions for your projects",
    groups: [
      {
        name: "Frameworks",
        items: ["Express.js", "Hapi.js", "Nest.js", "Total.js", "Koa.js", "Loopback.js"],
      },
      {
        name: "Libraries",
        items: [
          "Node cron",
          "Passport",
          "Lodash",
          "PM2",
          "Nodemailer",
          "Babel",
          "Unload",
          "Webpack",
          "Feathers.io",
          "Axios",
        ],
      },
      { name: "Databases", items: ["Redis", "Firebase", "MongoDB", "PostgreSQL", "MySQL"] },
      { name: "ORM", items: ["Typeform", "Mongoose", "Sequelize"] },
    ],
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "Why Hire NodeJS Developer From Soft Suave?",
    body: "Using the skills of dedicated NodeJS developers in India can be highly beneficial for your web application needs. Let us tell you why",
    items: [
      {
        name: `${YEARS_PLUS} Years of Average Experience`,
        body: "Our seasoned NodeJS developers make use of their in-depth knowledge to deliver exceptional applications, on time, every time.",
        icon: "book",
      },
      {
        name: "Defined Talent Screening",
        body: "We thoroughly vet candidates and select only the most skilled NodeJS developers to ensure your project's success.",
        icon: "users",
      },
      {
        name: "NodeJS Development",
        body: "Our agile approach keeps you informed throughout the NodeJS development process, with flexible engagement models and time zone adjustments for a smooth experience.",
        icon: "gauge",
      },
    ],
  },

  comparison: partnerTable("Choose the Right NodeJS Development Partner"),

  process: {
    eyebrow: "Hiring Process",
    title: "The 4-step NodeJS Developer Hiring Process",
    body: "Onboarding developers has never been easier. With this simple 4-step process, find the resource who is the perfect fit for your team!",
    steps: CURATED_STEPS,
  },

  exploreMore: webExplore,

  faq: {
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    body: "Know more about our processes and how we work, with the help of the following FAQs.",
    items: [
      {
        q: "How much does it cost to hire a Node.js developer from Soft Suave?",
        a: `Rates start from ${HOURLY_RATE}, below the $25/hour median rate for Node.js developers on Upwork ($18–$38/hr typical range). Every engagement starts with a 40-hour risk-free trial before any monthly commitment.`,
      },
      {
        q: "Is there a free trial period available?",
        a: "Yes — every engagement starts with a 40-hour risk-free trial so you can evaluate real work before committing.",
      },
      {
        q: "How do I test your Node.js developer's expertise?",
        a: "Through technical interviews on core Node.js concepts, code review of past work, and portfolio analysis of relevant experience.",
      },
      {
        q: "Do you provide an NDA for my project?",
        a: "Absolutely. Soft Suave prioritizes confidentiality — we sign a standard non-disclosure agreement (NDA) before starting any project to protect your intellectual property.",
      },
      {
        q: "Will I have full ownership of my source code?",
        a: "Yes, absolutely. The intellectual property rights, including the source code, belong entirely to you upon project completion.",
      },
      {
        q: "What happens if I want to change developers mid-project?",
        a: "You can request a replacement developer at no extra cost during or after the trial period, re-matched based on your feedback.",
      },
      {
        q: "How long do you offer post-launch support and maintenance?",
        a: "We provide ongoing post-launch support and maintenance to keep your application running smoothly, with terms scoped to your specific project.",
      },
      {
        q: "How do I track the development progress of my Node.js project?",
        a: "Soft Suave prioritizes transparency — we use project management tools to give you real-time visibility into progress.",
      },
    ],
  },
};
