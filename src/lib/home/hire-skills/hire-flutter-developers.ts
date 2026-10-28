/**
 * The `hire-flutter-developers` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-flutter-developers/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all twenty.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { mobileExplore } from "../hire-explore";
import { techSteps, techWhy } from "../hire-blocks";
import { HOURLY_RATE, SPECIALISTS_PLUS } from "../../company-figures";

export const skill: HireSkill = {
  slug: "hire-flutter-developers",
  key: "flutter",
  name: "Flutter",
  role: "Flutter Developers",
  metaTitle: "Hire Dedicated Flutter Developers India – Trusted Team",
  metaDescription:
    "Hire top Flutter developers in India with a 40-hour free trial, no catch. Access time-zone compatible skilled resource for seamless projects.",
  serviceType: "Flutter development staffing",
  ctaLabel: "Hire Flutter developers",

  order: [
    "overview",
    "services",
    "midCta",
    "process",
    "whyUs",
    "exploreMore",
    "testimonials",
    "faq",
  ],

  hero: {
    titleLines: ["Hire Flutter Developers", "in India on Contract"],
    accent: "Flutter Developers",
    body: [
      "Soft Suave provides skilled Flutter developers from India for startups and enterprises building cross-platform mobile apps. Hire experts in Flutter, Dart, Firebase, API integrations, custom UI, and scalable Android + iOS app development. Fast onboarding with cost-effective engagement options.",
      "See why businesses choose Soft Suave for their Flutter developer hiring.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Flutter Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Flutter requirement.",
      subject: "Flutter Developers enquiry",
      alert: sharedHeroAlert,
    },
    // A photo for this technology, darkened by the strong veil `HirePage`
    // applies (review: "update the images and add a black gradient").
    image: {
      src: "/images/landing/hs-flutter-hero.webp",
      width: 1800,
      height: 900,
      alt: "Hands using a glowing smartphone in the dark",
      blurDataURL:
        "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADwAQCdASoQAAsAA4BaJZwAAuQpLL5ywGAA/vkQ9fYnXWPwzRbYkAVIPsUldi+gQmTCTYzGTx88hOTPyt9IyKAA",
    },
  },

  overview: {
    // Internal links in the second paragraph (review: "internal link missing
    // in the 2nd paragraph"). The live page has none to copy, so each is a
    // phrase already in the copy, pointed at the matching service page.
    links: [
      { text: "cross-platform app development company", href: "/mobile-application-development-company" },
      { text: "enterprise-grade flutter development", href: "/flutter-application-development-company" },
    ],
    eyebrow: "Overview",
    title: "Hire Flutter Developers Team At Your Flexibility",
    paragraphs: [
      "Right from App concept till its successful launch, you can count on our Flutter developers.",
      `Soft Suave is the leading cross-platform app development company in India that offers top Flutter experts for hire. Our Flutter app developer's specialization in developing cost-effective apps is strengthened by leading-edge technologies and tools. Our development team comprises ${SPECIALISTS_PLUS} Success-driven & skilled programmers with more than 6+ years of experience. Our programmers have the expertise to understand the requirements and offer solutions to strengthen your business across several industry verticals. We focus on building enterprise-grade flutter development for start-ups and SMBs around the world. You can hire Flutter developer to build secure and reliable applications with next-gen features for your business.`,
      "Our certified Flutter engineers analyse your business needs and help you jump start your App development effortlessly. You can hire Flutter developer in India from us and utilize the wide range of libraries to develop engaging apps that support intuitive user interface. Our Flutter app developer's hands-on experience helps start-up and SMB owners to transform any business requirement into world-class apps. Hire Flutter developer from us to reduce 60% of your development cost and design robust cross-platform apps that run flawlessly on all devices and platforms.",
    ],
  },

  services: {
    eyebrow: "Expertise",
    title: "The Expertise Of Our Flutter Developers",
    body: "We offer highly-skilled Flutter App developers to obtain futuristic solutions that enhance your revenue and ROI.",
    items: [
      {
        name: "Dedicated Flutter Team",
        body: "We are renowned for housing committed and expert Flutter developers in India. When you partner with us and hire Flutter developer, you get to work with dedicated Flutter teams that provide end-to-end Flutter development services at a budget-friendly cost.",
      },
      {
        name: "Flutter Consultation",
        body: "Our Flutter experts are experienced in all the latest techs from different industry verticals. Hence when you hire Flutter developer, they have the capability and tech expertise to deliver feature-rich and successful apps for your business.",
      },
      {
        name: "Flutter Enterprise Apps",
        body: "Hire Flutter developer who provide top-notch services to satisfy your need for enterprise app development. Our developers have proficiency in managing enterprise-level requirements and delivering highly competitive solutions in the market.",
      },
      {
        name: "Platform Migration to Flutter",
        body: "Platform migration is crucial in this tech era. Hire Flutter developers who are well-versed in migrating your legacy solution to modern Flutter solutions safely without losing any data.",
      },
      {
        name: "Blockchain Applications",
        body: "Hire Flutter developer from us for a guaranteed hassle-free development of blockchain-based apps. We use all the latest tools and technologies to deploy visually attractive and robust blockchain-based mobile apps on iOS and Android.",
      },
      {
        name: "App Maintenance & Support",
        body: "Soft Suave's remote Flutter developers work round the clock to offer maintenance and support to your Flutter App. We do not stop our services after successful deployment; instead go above and beyond to satisfy the clients during post-deployment, maintenance and support.",
      },
    ],
  },

  midCta: {
    title: `Hire Flutter Developers Starting from ${HOURLY_RATE}`,
    body: "We will provide you with remote flutter developers that work from India. Contact us to take a look at CVs.",
    cta: { label: "Request Rate Card", href: "/contact" },
  },

  process: {
    eyebrow: "Hiring Process",
    title: "Hire Flutter Developers in 4 easy steps",
    body: "Below is the simple Full-time Hiring Process that we follow while offering 1-week free trial to our clients.",
    steps: techSteps("Flutter"),
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "Why Are Our Flutter Developers Considered the Best?",
    body: "Building intuitive and user-friendly Apps is easily achievable when you connect with our trained Flutter developers.",
    items: techWhy("Flutter", "Flutter, Dart, Firebase, API integrations, and custom UI"),
  },

  exploreMore: mobileExplore,

  faq: {
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    body: "Know more about our processes and how we work, with the help of the following FAQs.",
    items: [
      {
        q: "Can I communicate directly with the developer hired for my app?",
        a: "Yes, you have the right to communicate and assign tasks directly to your dedicated Flutter developer through Skype, Slack, Microsoft Teams and Google Meet.",
      },
      {
        q: "What are the types of engagement models you offer?",
        a: [
          "When you hire Flutter developers from us, we offer three flexible engagement models to fit your need and budget.",
        ],
        points: [
          "Fixed-bid Model: - Small projects fall into this model where the budget and time is fixed before the project kick-off.",
          "Time & material Model: - This model is used when clients have a lot of requirements. Clients are billed for the hours invested by the developers.",
          "Dedicated Team: - A team of dedicated developers will be assigned to clients. The charges will be monthly-based.",
        ],
      },
      {
        q: "Do you use any project management tools or methodology while developing my app?",
        a: "Yes, we use Trello and JIRA for project management. The development team follows Agile and SCRUM methodologies to develop reliable app solutions.",
      },
      {
        q: "What are the advantages of hiring a dedicated team?",
        a: "When you hire our dedicated development team, you can communicate and assign tasks directly to the team. Moreover, you can conduct sprint meetings and receive daily reports from the team to understand the progress of your project.",
      },
      {
        q: "Can you sign a Non-disclosure agreement (NDA) for my project?",
        a: "Definitely! Confidentiality and data security are our utmost priority. Thus, Soft Suave signs the NDA agreement before you hire Flutter developer and start the project with us.",
      },
    ],
  },
};
