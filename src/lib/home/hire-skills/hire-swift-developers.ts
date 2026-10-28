/**
 * The `hire-swift-developers` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-swift-developers/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all twenty.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { mobileExplore } from "../hire-explore";
import { techWhy } from "../hire-blocks";
import { HOURLY_RATE } from "../../company-figures";

export const skill: HireSkill = {
  slug: "hire-swift-developers",
  key: "swift",
  name: "Swift",
  role: "Swift Developers",
  metaTitle: "Hire Swift Developer in India with 40 Hours Risk-free Trial",
  metaDescription:
    "Looking to hire Swift developers in India? Get affordable rates, flexible engagement models, and exceptional services from Soft Suave's developers.",
  serviceType: "Swift development staffing",
  ctaLabel: "Hire Swift developers",

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
    titleLines: ["Hire Swift Developers", "in India on Contract"],
    accent: "Swift Developers",
    body: [
      "Top-tier Swift developers do not have to come with a top-tier price tag. Hire skilled Swift developers through Soft Suave, a specialized IT outsourcing agency offering pre-vetted experts in Swift, Xcode, and API development; within 24–48 hours, and up to 60% more cost-effective.",
      "Lower hiring cost, more native iOS performance starting right now.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Swift Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Swift requirement.",
      subject: "Swift Developers enquiry",
      alert: sharedHeroAlert,
    },
    // A photo for this technology, darkened by the strong veil `HirePage`
    // applies (review: "update the images and add a black gradient").
    image: {
      src: "/images/landing/hs-swift-hero.webp",
      width: 1800,
      height: 900,
      alt: "Swift code open in a dark-themed editor",
      blurDataURL:
        "data:image/webp;base64,UklGRioAAABXRUJQVlA4IB4AAABwAQCdASoQAAsABIBaJZwCdAFAAAD+9GLMccvAAAA=",
    },
  },

  overview: {
    // Portrait, run the full height of the copy beside it (review: "resize
    // the image to fit the height of the section").
    image: {
      src: "/images/landing/ov-hire-swift-developers-tall.webp",
      width: 1000,
      height: 1250,
      alt: "Developer testing code on a phone above a laptop terminal",
      blurDataURL:
        "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAAAwAgCdASoLABAAA4BaJZQCdAYstYp9MreQAAD9drL96gSg2yNz5A3qAI2G7Po54DLZpfH+VTTM1cI1fwD2X6XGBITWngotBaPCUfMNpZZZANoEw7SoUaIyFVAAAA==",
      column: true,
    },
    eyebrow: "Overview",
    title: "Hire Remote Swift Developers from Soft Suave",
    paragraphs: [
      "Onboard Swift developers from us to build robust and reliable software solutions that meet your business objectives and exceed customer expectations.",
      "Soft Suave has a team of experienced and talented Swift developers to help you build a custom iOS app tailored to your specific needs. In order to create a fast-turnaround app, hire swift programmers from us who will provide you with high-quality, reliable, and user-friendly apps. Our Swift expertise and knowledge enable us to create secure and safe apps. Swift's agility and flexibility allow us to develop apps quickly.",
      "Outsource talented and reliable Swift developers who can develop sophisticated apps for different iOS devices, such as iPhones, iPads, and Apple Watches. It is the best choice to hire remote Swift developers rather than hiring in-house developers for project resources. The 40-hour free trial for developers allows you to see our developers' work before deciding. Hire swift app developers in India who can ramp up your project and accelerate the development process. We guarantee on-time delivery, quality assurance, and post-release support.",
    ],
  },

  services: {
    eyebrow: "Services",
    title: "Outsource Swift App Developers for Exceptional Range of Service",
    body: "Hire Dedicated Swift App Developers from Soft Suave whose Expertise is unparalleled, with years of experience and exceptionality in the field.",
    items: [
      {
        name: "Swift UX and UI Development",
        body: "Using SwiftUI, our developers can create engaging user experiences on Apple platforms with built-in animations, transitions, and state management.",
      },
      {
        name: "Custom Swift App Development",
        body: "With the help of Soft Suave's Swift developers, you will receive a tailor-made app that meets your specific business requirements",
      },
      {
        name: "Swift App Testing",
        body: "We test your Swift app for compatibility with different devices and OS versions to ensure a smooth user experience",
      },
      {
        name: "Swift App Strategy & Consulting",
        body: "We help startups and SMEs implement a profitable swift app development strategy that saves them time and adds value",
      },
      {
        name: "Swift Apps Migration & Upgradations",
        body: "Keeping your Swift application updated will allow you to migrate applications from other languages and platforms.",
      },
      {
        name: "Swift Maintenance and Support",
        body: "Keeping your app updated, and functional is our priority, and we offer swift maintenance and support services",
      },
    ],
  },

  midCta: {
    title: `Hire Remote Swift Developers Starting from ${HOURLY_RATE}`,
    body: "We will provide you with remote Swift developers that work from India. Contact us to look at the rate card.",
    cta: { label: "Request Rate Card", href: "/contact" },
  },

  /** Five stages, not four — the Swift page is the only one that splits them. */
  process: {
    eyebrow: "Hiring Process",
    title: "Onboard Remote Swift Developers in 4 easy steps",
    body: "Below is the simple Full-time Hiring Process that we follow while offering 1-week free trial to our clients.",
    steps: [
      {
        n: "01",
        name: "Inquiry",
        body: "Tell us in brief about your ideas and needs. Don't worry it's secure and confidential.",
      },
      {
        n: "02",
        name: "Select CV",
        body: "Shortlist candidates which best fit in your needs by viewing their CVs.",
      },
      {
        n: "03",
        name: "Assessment",
        body: "Optionally, assess candidates over a phone or video call.",
      },
      { n: "04", name: "Trial Run", body: "Take a 1-week free trial." },
      {
        n: "05",
        name: "Add resource in your team",
        body: "If you like the resource(s), pay for the trial time and onboard resource(s).",
      },
    ],
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "Why Hire Swift Developers from Soft Suave Most Reliable?",
    body: "Our Swift app developers are renowned for their technical expertise, attention to detail, and focus on quality.",
    items: techWhy("Swift", "Swift, Xcode, and API development"),
  },

  exploreMore: mobileExplore,

  faq: {
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    body: "Here are some questions you may have about hiring swift developers that are often asked",
    items: [
      {
        q: "You sign NDAs, right?",
        a: "We take the security of our client's information seriously, which is why we require all of our developers to sign NDAs.",
      },
      {
        q: "How many platforms do your Swift developers support?",
        a: "Our developers experienced in working with multiple platforms, including iOS, and macOS.",
      },
      {
        q: "What is the cost of hiring a Swift app developer?",
        a: "We can provide you with a custom quote based on your specific requirements based on the skill level, experience, and location of the Swift developer you choose.",
      },
      {
        q: "How to Hire Swift App Developers?",
        a: [],
        points: [
          "Identify all the tasks the developer needs to complete",
          "Choose your preferred developer and technology.",
          "Finalize the agreement with the project manager or sales team.",
          "If you are having trouble, just connect with our experts.",
        ],
      },
      {
        q: "Is it possible to hire swift developers based on needed timeliness?",
        a: "Yes, absolutely. Our expert Swift developers are available for both hourly and project-based tasks. We can match you with the best-suited developer, with the right set of skills and experience to meet your needs.",
      },
    ],
  },
};
