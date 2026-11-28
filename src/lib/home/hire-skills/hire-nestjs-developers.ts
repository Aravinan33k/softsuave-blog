/**
 * The `hire-nestjs-developers` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-nestjs-developers/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all twenty.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { webExplore } from "../hire-explore";
import { partnerTable } from "../hire-comparison";
import { CURATED_STEPS } from "../hire-blocks";
import { HOURLY_RATE } from "../../company-figures";

export const skill: HireSkill = {
  closingCtaIcon: true,
  clientsWideTitle: true,
  // Compare band on the light ground; the hiring process on the dark one.
  lightBands: ["comparison"],
  darkBands: ["process"],
  slug: "hire-nestjs-developers",
  key: "nestjs",
  name: "NestJS",
  role: "NestJS Developers",
  metaTitle: "Hire NestJS Developers | 7-Day Risk-Free Trial",
  metaDescription:
    "Hire NestJS Developers in India on an hourly or monthly basis. Try our certified NestJS developers for 7 days free to ensure your project’s success.",
  serviceType: "NestJS development staffing",
  ctaLabel: "Hire NestJS developers",

  /** No `faq`: the live NestJS page publishes none, and closes on its stories. */
  order: [
    "overview",
    "services",
    "midCta",
    "comparison",
    "process",
    "exploreMore",
    "testimonials",
  ],

  hero: {
    titleLines: ["Hire Remote NestJS Developers", "in India on Contract"],
    accent: "NestJS Developers",
    body: [
      `Hire NestJS developers from Soft Suave without long hiring cycles. As a specialized development agency, we deliver vetted experts starting at ${HOURLY_RATE}, ready to build scalable applications fast while ensuring flexibility, strong quality standards, and complete project control.`,
      "Skip hiring delays. Start building with NestJS experts today.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top NestJS Developers in India",
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
      requirementPlaceholder: "Tell us about your NestJS requirement.",
      subject: "NestJS Developers enquiry",
      alert: sharedHeroAlert,
    },
    // A photo for this technology, darkened by the strong veil `HirePage`
    // applies (review: "update the images and add a black gradient").
    image: {
      src: "/images/landing/hs-nestjs-hero.webp",
      width: 1800,
      height: 900,
      alt: "Code on a dark monitor with a warm red tint",
      blurDataURL:
        "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADQAQCdASoQAAwAA4BaJZwAAqH3U5OgAAD++RhtTWhkBP0ebOK5EUsEsEx+RP4zgnSQ1/gAAAA=",
    },
  },

  overview: {
    eyebrow: "Overview",
    title: "What Nest.js Developers do and How they can benefit a project",
    paragraphs: [
      "Nest.js developers focus on building secure and scalable server-side applications, utilizing the Nest.js framework to enhance the capabilities of Node.js.",
      "Nest.js is a highly scalable and strong JavaScript framework built on Node.js to create efficient server-side applications. It's an open-source platform designed for future-ready enterprise projects. Hiring Nest.js developers can free you from the challenges of handling coding structure, dependency management, testing, microservices, web sockets, routing, and other important parts of your application.",
    ],
  },

  services: {
    eyebrow: "Services",
    title: "NestJS Development Services We Provide",
    body: "Our team of experts excels in building reliable, efficient, and scalable web applications with NestJS. We prioritize delivering high-quality results and a seamless user experience, backed by exceptional development services.",
    items: [
      {
        name: "NestJS Web Development",
        body: "Soft Suave's NodeJS developers utilize a variety of tools and plugins from the NodeJS ecosystem to create scalable and efficient server-side applications.",
      },
      {
        name: "NestJS E-commerce",
        body: "Elevate the backend of your online store by hiring NestJS developers who excel at leveraging its powerful architecture.",
      },
      {
        name: "NestJS Backend Development",
        body: "By combining the progressive NestJS server-side framework with TypeScript expertise, our development team delivers clean, efficient, and bug-free backend APIs.",
      },
      {
        name: "NestJS Custom Development",
        body: "Leveraging the strengths of JavaScript, TypeScript, Node, and Express, we deliver customized solutions that are both efficient and reliable, tailored to meet your specific needs.",
      },
      {
        name: "App Architecture Development",
        body: "Looking to build innovative application architecture with the versatile NestJS? Let us show you how we can deliver testable, scalable, and efficient solutions tailored to your needs.",
      },
      {
        name: "NestJS Maintenance & Support",
        body: "We understand common modification patterns in the framework, allowing us to support you with reliable technical maintenance solutions.",
      },
    ],
  },

  midCta: {
    wideTitle: true,
    title: "Are you ready to take your backend development to the next level?",
    body: "Partner with Soft Suave to hire dedicated NestJS developers and gain scalable, secure, and high-performing applications tailored to your needs.",
    cta: { label: "Request Rate Card", href: "/contact" },
  },

  comparison: { ...partnerTable("Choose the Right NestJS Development Partner"), wideHead: true },

  process: {
    eyebrow: "Hiring Process",
    title: "How to Hire NestJS Developers from Soft Suave",
    body: "Onboarding developers has never been easier. With this simple 4-step process, find the resource who is the perfect fit for your team!",
    steps: CURATED_STEPS,
  },

  exploreMore: { ...webExplore, wideHead: true },
};
