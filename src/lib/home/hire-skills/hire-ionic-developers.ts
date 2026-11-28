/**
 * The `hire-ionic-developers` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-ionic-developers/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all twenty.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { mobileExplore } from "../hire-explore";
import { partnerTable } from "../hire-comparison";
import { CURATED_STEPS } from "../hire-blocks";
import { HOURLY_RATE, YEARS_PLUS } from "../../company-figures";

export const skill: HireSkill = {
  closingCtaIcon: true,
  clientsWideTitle: true,
  // The technology band on the light ground.
  lightBands: ["techStack"],
  slug: "hire-ionic-developers",
  key: "ionic",
  name: "Ionic",
  role: "Ionic Developers",
  metaTitle: "Hire Ionic App Developers India – Top 3% Talent",
  metaDescription:
    "Hire top Ionic app developers in India with 40 hours of a free trial. Get access to the top 3% developers, ensuring high-quality, scalable apps.",
  serviceType: "Ionic development staffing",
  // Matches the live page's own breadcrumb trail exactly: Home › Hire
  // Developers › Ionic Developers.
  showBreadcrumb: true,
  breadcrumbParents: [{ name: "Hire Developers", path: "/hire-dedicated-developers" }],
  ctaLabel: "Hire Ionic developers",

  order: [
    "overview",
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
    titleLines: ["Hire Ionic Developers", "in India"],
    accent: "Ionic Developers",
    body: [
      `Why build three apps when one Ionic codebase does it all? Hire experienced Ionic developers through Soft Suave, a top agency delivering pre-vetted talent within 24–48 hours, skilled in cross-platform hybrid app development, starting from ${HOURLY_RATE} on flexible engagement models.`,
      "Your next Ionic developer is one conversation away.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Ionic Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      title: "Get Skilled Remote Developers",
      submitHover: 'black',
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Ionic requirement.",
      subject: "Ionic Developers enquiry",
      alert: sharedHeroAlert,
    },
    // A photo for this technology, darkened by the strong veil `HirePage`
    // applies (review: "update the images and add a black gradient").
    image: {
      src: "/images/landing/hs-ionic-hero.webp",
      width: 1800,
      height: 900,
      alt: "Tablet displaying an app interface on a dark desk",
      blurDataURL:
        "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADwAQCdASoQAAwAA4BaJbACdADp9IrvOMAA/veHKnq6KaRhKanyZpau7OpZxUGWnFqMPpV7/+58jlYO3hHdHyFBsknZ8vR3BUEAAA==",
    },
  },

  overview: {
    eyebrow: "Overview",
    title: "Hire Ionic Developers for Your Project's Needs",
    paragraphs: [
      "Hire our dedicated Ionic developers who have helped businesses accomplish their goals by building high-performance, natively-compiled mobile apps and progressive web apps",
      "Soft Suave is the most renowned Ionic app development company in India and we offer top-notch cross-platform mobile app development services. Our mobile app developers have valuable experience in Ionic and are capable of delivering successful development solutions to clients across USA, UK, Australia, Europe, Canada, and the UAE. Likewise, our mobile app development team has expertise in all the latest technologies, making them the most preferred app development company in South Asia.",
      "Our Ionic app developers are ranked top in India and have an average of 4+ years of experience in the field. Our offshore developers excel in communication, interpersonal skills, and deliver cross-platform apps within tight deadlines.",
    ],
  },

  services: {
    eyebrow: "Expertise",
    title: "Expertise of Our Ionic App Developers",
    body: "Our offshore Ionic developers support various businesses by building user-friendly and engaging cross-platform mobile apps.",
    items: [
      {
        name: "Ionic Mobile App Consultation",
        body: "Our offshore Ionic developers are highly experienced in maintaining apps and delivering expert cross-platform development consultations.",
      },
      {
        name: "App UI/UX Design",
        body: "Our Ionic developers prioritize user-centric design, creating intuitive interfaces that enhance usability and engagement in cross-platform apps.",
      },
      {
        name: "App Migration to Ionic",
        body: "Our Ionic developers enable seamless legacy app migration to the Ionic framework, keeping applications updated with the latest mobile app standards.",
      },
      {
        name: "Ionic Enterprise Apps",
        body: "Utilizing the most recent technologies, our offshore Ionic developers develop engaging, user-centric, and fluid enterprise-grade applications.",
      },
      {
        name: "Cross-platform/Hybrid App Development",
        body: "Our developers ensure a smooth user experience across iOS and Android platforms by crafting cross-platform apps using Ionic.",
      },
      {
        name: "Support & Maintenance",
        body: "Our dedicated Ionic development team provides on-demand support and maintenance, efficiently resolving any app-related issues.",
      },
    ],
  },

  midCta: {
    title: "Searching for Dedicated Ionic App Developers?",
    body: "Access offshore Ionic developers in india who work remotely with you. Contact us to view ratecard.",
    cta: { label: "Request Rate Card", href: "/contact" },
  },

  techStack: {
    wideHead: true,
    eyebrow: "Technology",
    title: "Make the Most of Our Ionic Developers' Technical Proficiency",
    body: "Our Ionic developers are well-versed in the following technologies:",
    groups: [
      { name: "Web Technologies", items: ["Angular", "React.js", "Vue.js", "JQuery", "Javascript"] },
      {
        name: "Ionic UI Components",
        items: [
          "Alert",
          "Badge",
          "Button",
          "Card",
          "Chip",
          "Content",
          "Floating Action Button",
          "Checkbox",
        ],
      },
      { name: "Ionic Plugin", items: ["iOS UIWebView", "Android WebView"] },
      {
        name: "IDEs",
        items: ["Android Studio", "XCode", "Visual Studio Code + Ionic Extension Pack", "Atom"],
      },
    ],
  },

  whyUs: {
    // Live closes this band on "Contact us" (review: "CTA button missing").
    cta: { label: "Contact us", href: "/contact" },
    eyebrow: "Why Soft Suave",
    title: "Why Choose Soft Suave for Hiring Ionic Developers?",
    body: "Get proactive mobile app development strategies with our Ionic experts. Get on-time delivery and guaranteed satisfaction.",
    items: [
      {
        name: `${YEARS_PLUS} Years of Average Experience`,
        body: "Our Ionic developer's years of experience in the field help us deliver custom-made, quality solutions- on time, every time.",
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

  comparison: { ...partnerTable("Choose the Right Ionic Development Partner"), wideHead: true },

  process: {
    eyebrow: "Hiring Process",
    title: "Four Simple Steps to Hire an Ionic Developer",
    body: "Onboarding developers has never been easier. With this simple 4-step process, find the resource who is the perfect fit for your team!",
    steps: CURATED_STEPS,
  },

  exploreMore: { ...mobileExplore, wideHead: true },

  faq: {
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    body: "Know more about our processes and how we work, with the help of the following FAQs.",
    items: [
      {
        q: "What is the cost of hiring Ionic developers?",
        a: "The cost of hiring an Ionic developer will vary depending on experience. Typical hourly rates range from $15 to $25, but these can vary depending on the specific needs of the business.",
      },
      {
        q: "Do you offer flexible hiring options for Ionic developers?",
        a: "Yes, we offer different hiring models based on your needs. You can choose to hire Ionic developers on a full-time, part-time, or project-based basis depending on the specifics of your project.",
      },
      {
        q: "How do I get started with hiring Ionic developers from your agency?",
        a: "Hiring our developers is pretty simple. Just fill out our form in the Ionic developer page or email us at contact@softsuave.com. Our team will arrange a consultation for your project requirements and offer a free trial to evaluate our developers.",
      },
      {
        q: "What is the experience of your Ionic developers?",
        a: "We have a team of Ionic developers with over 2 to 7 years of experience. Depending on the needs of your project, we will assign a senior or junior Ionic developer to work on your hybrid applications.",
      },
    ],
  },
};
