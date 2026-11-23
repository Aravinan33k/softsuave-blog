/**
 * The `hire-react-native-developers` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-react-native-developers/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all twenty.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { mobileExplore } from "../hire-explore";
import { PARTNER_TABLE_INTRO } from "../hire-comparison";
import { techSteps, techWhy } from "../hire-blocks";
import { HOURLY_RATE, SPECIALISTS_PLUS } from "../../company-figures";

export const skill: HireSkill = {
  closingCtaIcon: true,
  clientsWideTitle: true,
  slug: "hire-react-native-developers",
  key: "react-native",
  name: "React Native",
  role: "React Native Developers",
  metaTitle: `Hire React Native Developers in India | ${HOURLY_RATE}, 40-Hr Trial`,
  metaDescription:
    "Hire React Native developers in India from Soft Suave — save 60% on costs, start with a 40-hour risk-free trial, and build secure, high-performing apps.",
  serviceType: "React Native development staffing",
  ctaLabel: "Hire React Native developers",

  /** The comparison table comes *before* the rate band on this page. */
  order: [
    "overview",
    "services",
    "comparison",
    "midCta",
    "process",
    "whyUs",
    "exploreMore",
    "testimonials",
    "faq",
  ],

  hero: {
    titleLines: ["Hire React Native Developers", "in India on Contract"],
    accent: "React Native Developers",
    body: [
      `Soft Suave provides pre-vetted React Native developers experienced in cross-platform iOS and Android app development, UI/UX, plugin development, and legacy app migration. Every engagement starts with a 40-hour risk-free trial, with rates from ${HOURLY_RATE} and no long-term contract required until you're satisfied.`,
      "All your React Native hiring problem ends right here.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top React Native in India",
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
      requirementPlaceholder: "Tell us about your React Native requirement.",
      subject: "React Native Developers enquiry",
      alert: sharedHeroAlert,
    },
    // A photo for this technology, darkened by the strong veil `HirePage`
    // applies (review: "update the images and add a black gradient").
    image: {
      src: "/images/landing/hs-react-native-hero.webp",
      width: 1800,
      height: 900,
      alt: "Mobile UI code beside an app preview on screen",
      blurDataURL:
        "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADwAQCdASoQAAsAA4BaJZQAAiGwNlcbcagA/ublYCamdpA+pNtKBDVfvyZlu7PbUHLd9odbs6M8EhzJIQC7ba71ra2IEX+WS67mQAAA",
    },
  },

  overview: {
    wideHead: true,
    // Portrait, run the full height of the copy beside it (8 Oct review:
    // "resize the image to match the section") — the same photo, cut taller.
    image: {
      src: "/images/landing/ov-hire-react-native-developers-tall.webp",
      width: 1000,
      height: 1250,
      alt: "Developer building a cross-platform app on phone and laptop",
      blurDataURL:
        "data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAAAwAgCdASoQAAsAA4BaJYgC7AYwd2128Mmg4AD+62Fel6PWmhxL/WJxydf2cXo9sY3lV6P3dw7damCaY4Fa1jZnv1NhIheIpfoGBTstmnKTfm8tbef53aqKWLR6EU8V8lka0FimJX2ONsD7HR+A8PTbAAA=",
      column: true,
    },
    eyebrow: "Overview",
    title: "Hire Dedicated Team Of React Native Developers",
    paragraphs: [
      `Soft Suave is a renowned web and mobile app development company that houses more than ${SPECIALISTS_PLUS} top-ranked developers in India. Besides, Soft Suave also employs top mobile app developers that are experts in all the latest technologies to deliver amazing cross-platform apps and robust native mobile apps according to business requirements.`,
      "Our premium React Native app developers use cutting-edge technology to deliver outstanding applications that are innovative and high-performing at the same time. You can expect quality results in no time if you hire our dedicated React Native developer.",
      "The code reusability in React Native allows our React Native app developers to develop intuitive apps in both iOS and Android platforms in no time. They can easily raise the bar by competing with Native apps in the market and win with the same cross-platform application. Our testimonials and client reviews are a witness to the quality of work our expert React Native app programmers provide to our clients. Hire from Soft Suave and harness the top-tier React Native developers in India to accomplish your business goals at the most economical price.",
    ],
  },

  services: {
    wideHead: true,
    eyebrow: "Expertise",
    title: "Expertise of Our React Native Developers",
    body: "You are 100% guaranteed to have a competitive edge in the market if you hire our React Native developer.",
    items: [
      {
        name: "React Native UI/UX Development",
        body: "Developers at Soft Suave leverage the React Native library to develop the most interactive and creative user experience for your business application. They concentrate on bringing real-time experience across various devices to make sure all the UI/UX gaps are filled.",
      },
      {
        name: "React Native Android App Development",
        body: "React Native is the powerhouse for Android application development. The expertise of our developers in React Native helps Soft Suave to deliver native, high-quality, and influential Android applications that win customers for your business.",
      },
      {
        name: "React Native iOS App Development",
        body: "Our developers are experts in developing fast loading and fully functional iOS apps with the help of React Native. When you hire React Native developers from Soft Suave, you can save time, cost, and be rest assured to get dynamic iOS apps.",
      },
      {
        name: "Support & Maintenance",
        body: "Soft Suave offers the best React Native support and maintenance service in India. Our React Native app developers focus equally on development services and support & maintenance services. Moreover, they offer cost-effective support & maintenance without compromising on the quality.",
      },
      {
        name: "Plugin Development",
        body: "Hire React Native developers if you want to create custom plugins in no time under your budget. Our best-in-class React Native developers help you in building custom plugins and make them available as npm packages so you can use it in multiple products without any hassles.",
      },
      {
        name: "Integration & Migration",
        body: "React Native integration is made simple if you hire React Native developers from Soft Suave. Our developers have hands-on experience in integrating React Native into popular apps. They are also skillful in migrating apps from any technologies to React Native without any data leakages and risks.",
      },
    ],
  },

  /** This page's own table — not the shared one. Its figures are published. */
  comparison: {
    wideHead: true,
    eyebrow: "Compare",
    title: "Choose the Right React Native Development Partner",
    body: PARTNER_TABLE_INTRO,
    areaLabel: "Criteria",
    columns: ["Soft Suave", "Freelance Marketplaces", "In-House Hiring"],
    rows: [
      {
        area: "Starting rate",
        values: [`${HOURLY_RATE}`, "$24–$45/hour (Upwork median $30/hour)", "Full salary + benefits + overhead"],
      },
      {
        area: "Vetting before you pay",
        values: [
          "40-hour risk-free trial",
          "No structured trial — client vets manually",
          "Weeks of interviews per candidate",
        ],
      },
      {
        area: "Time to onboard",
        values: [
          "Days, via curated shortlist",
          "Hours to post, but vetting is on you",
          "Typically 4–8+ weeks to hire",
        ],
      },
      {
        area: "IP & confidentiality",
        values: [
          "Standard NDA signed upfront",
          "Varies by individual freelancer",
          "Covered by employment contract",
        ],
      },
      {
        area: "Replacement if it's not a fit",
        values: [
          "Free replacement during/after trial",
          "Re-hire and re-vet from scratch",
          "Termination and re-recruitment process",
        ],
      },
    ],
  },

  midCta: {
    title: `Hire React Native Developers Starting from ${HOURLY_RATE}`,
    body: "We will provide you with remote React Native developers that work from India. Contact us to take a look at CVs.",
    cta: { label: "Request Rate Card", href: "/contact" },
  },

  process: {
    wideHead: true,
    eyebrow: "Hiring Process",
    title: "Hire React Native Developers in 4 easy steps",
    body: "Below is the simple Full-time Hiring Process that we follow while offering 1-week free trial to our clients.",
    steps: techSteps("React Native"),
  },

  whyUs: {
    wideHead: true,
    eyebrow: "Why Soft Suave",
    title: "What Makes Our React Native Developers Unique and Trustworthy?",
    body: "We provide dedicated React Native developers in India who has exceptional knowledge in web app development.",
    items: techWhy("React Native", "cross-platform iOS and Android apps, UI/UX, plugin development, and app migration"),
  },

  exploreMore: {
    ...mobileExplore,
    wideHead: true,
  },

  faq: {
    wideHead: true,
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    body: "Know more about our processes and how we work, with the help of the following FAQs.",
    // Matches the live page's own links, inside the industries-experience
    // answer (review: "internal links missing in the FAQs").
    links: [
      { text: "E-commerce", href: "https://www.softsuave.com/ecommerce-mobile-app-development-company" },
      { text: "Healthcare", href: "https://www.softsuave.com/healthcare-mobile-app-development-company" },
      { text: "Education", href: "https://www.softsuave.com/education-app-development-company" },
      { text: "Construction", href: "https://www.softsuave.com/construction-employee-time-tracking-app" },
    ],
    items: [
      {
        q: "How much does it cost to hire a React Native developer from Soft Suave?",
        a: `Hire our professional React Native developer at a competitive cost as low as ${HOURLY_RATE}. You can select and hire from the pool of brilliant senior React Native app developers with expertise in all the latest development technologies and tools.`,
      },
      {
        q: "Is there a free trial period available?",
        a: "Yes — every engagement starts with a 40-hour risk-free trial so you can evaluate real work before committing, with no long-term contract required until you're satisfied.",
      },
      {
        q: "Is it possible to migrate an app from other technologies to React Native?",
        a: "Yes, you can migrate it without a doubt. Our React Native developer's experience in other technologies works handy to migrate an app from any technology to React Native without any data leakage.",
      },
      {
        q: "What do you need to know before you hire our React Native application developers?",
        a: "Before you hire dedicated React Native application developers from Soft Suave, you need to understand if your app requires React Native for development. Moreover, you have to analyze and confirm what exactly you need from React Native that other technologies have missed. By understanding this, you can acquire a successful application that fits your business plans",
      },
      {
        q: "What are the various hiring models offered by you to hire React Native developers?",
        a: [
          "Hiring our React Native developer is made easy with three flexible hiring models. These models are designed based on the clients' interest and affordability.",
        ],
        points: [
          "Full-time hiring",
          "Part-time hiring",
          "Milestone hiring",
        ],
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
        q: "What are the industries that are served by your React Native app developers?",
        a: "Our developers have vast experience in all the growing industries like E-commerce, Healthcare, Education, Telecom and Construction.",
      },
      {
        q: "How do I test your React Native developer's expertise?",
        a: "Soft Suave is open to test our React Native developer before you hire them. You can initiate a one-to-one interview in skype or can give test tasks to understand the technical, soft skill, and rational ability of our proficient React Native developers.",
      },
    ],
  },
};
