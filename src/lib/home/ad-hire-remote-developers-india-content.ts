/**
 * Copy for `/ad/hire-remote-developers-india` — a clone of
 * softsuave.com/ad/hire-remote-developers-india, the paid-traffic landing page
 * for hiring remote developers in India on contract.
 *
 * Only what the live page RENDERS, word for word — its markup comments out a
 * review block, a trusted-brands block and a testimonials block. Live order: hero
 * (+ form) · services · technology stacks · rate banner · hiring models · 5 steps
 * · testimonials · closing form. This page has no popups; every button scrolls to
 * a form on the page.
 *
 * Its hiring models, steps, six testimonials and closing "Request 1 Week Free
 * Trial!" block are word for word the live Java page's, so they are reused from it.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CardGridContent } from "@/components/generative-ai/industries";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { EngagementModelsContent } from "@/components/ad/engagement-models";
import { FS_CLOSING_FORM, FS_HERO_FORM } from "@/lib/home/ad-hire-full-stack-developers-content";
import { jvClosing, jvModels, jvProcess, jvTestimonials } from "@/lib/home/ad-hire-java-developers-content";

export const rdMeta = {
  path: "/ad/hire-remote-developers-india",
  // The live page's <title> and description, verbatim.
  title: "Hire Offshore Mobile Application Developers On Contract",
  description:
    "Our remote developers can build your dream App. Hire remote Application Developers in India on Fixed cost/Full time/Hourly basis.",
} as const;

export const rdHero: HeroContent = {
  titleLines: ["Hire Remote Tech Experts", "On Contract"],
  accent: "Remote Tech Experts",
  body: ["Choosing the RIGHT Developers is not Easy, We Can HELP."],
  points: [
    "We Offer 7 Days Trial, NO CATCH!",
    "100% Own Team, No Freelancers",
    "Interview before Hire, No Hiring Fees",
    "Hire on Fixed, Hourly or Monthly Basis",
  ],
  form: {
    title: "Hire Your Remote Team!",
    body: "Hire India's best developers with free trial",
    note: "We respect your",
    noteLink: { label: "privacy policy", href: "/privacy-policy", srText: "" },
    noteAfter: " and we will never spam you",
    submit: "Hire Now",
    sending: "Sending...",
    requirementLabel: "Requirements",
    requirementPlaceholder: "Tell us about your requirements",
    subject: "Ad landing: Hire Your Remote Team (remote developers India)",
  },
};

/** The live cards each carry one icon of their own (`public/brand/ad/remote`). */
export const rdServices: CardGridContent = {
  eyebrow: "",
  title: "Hire Expert Remote Developers As Per Your Needs",
  body: "Get cost-effective solutions from our App developers who are highly qualified, full-time, and in-house employees.",
  cta: { label: "Start 40 Hours Risk-Free Trial", href: FS_HERO_FORM },
  items: [
    {
      images: [{ src: "/brand/ad/remote/svc-mobile.webp", width: 110, height: 180, alt: "Hire Mobile App Developers" }],
      link: false,
      name: "Hire Mobile App Developers",
      body: "Hire Indian programmers from us and build tailored native and hybrid mobile applications for your niche.",
    },
    {
      images: [{ src: "/brand/ad/remote/svc-web.webp", width: 136, height: 136, alt: "Hire Web App Developers" }],
      link: false,
      name: "Hire Web App Developers",
      body: "Hire developers from us who excel in building robust, scalable, and secure web apps for your business.",
    },
    {
      images: [{ src: "/brand/ad/remote/svc-dedicated.webp", width: 180, height: 170, alt: "Hire Dedicated App Developers" }],
      link: false,
      name: "Hire Dedicated App Developers",
      body: "We offer on-demand app developers ranging across a variety of technologies for ease of scalability, reduced time-to-market and enhanced ROI.",
    },
    {
      images: [{ src: "/brand/ad/remote/svc-cloud.webp", width: 176, height: 176, alt: "Hire Cloud App Developers" }],
      link: false,
      name: "Hire Cloud App Developers",
      body: "We help build apps using Amazon, Google, Microsoft Azure & IBM Bluemix to leverage the cloud advantages and scale on-demand with ease.",
    },
    {
      images: [{ src: "/brand/ad/remote/svc-migration.webp", width: 170, height: 170, alt: "Migration & Maintenance" }],
      link: false,
      name: "Migration & Maintenance",
      body: "We help re-engineer your existing app and offer ongoing maintenance for pro-active security audits, performance enhancements and adopting to your evolved business needs.",
    },
    {
      images: [{ src: "/brand/ad/remote/svc-qa.webp", width: 180, height: 150, alt: "Software QA Testers" }],
      link: false,
      name: "Software QA Testers",
      body: "Hire Software QA testers/ engineers from Soft Suave because they adopt the latest tools and advanced technologies to serve robust yet scalable solutions.",
    },
  ],
};

/** "Technology & Development Stacks" — the live page's four groups, as the site's stack panels. */
export const rdTech: TechStackContent = {
  eyebrow: "",
  title: "Technology & Development Stacks",
  body: "Listed below are Soft Suave developers with expertise in and hands-on experience with a variety of technologies.",
  groups: [
    { name: "Mobile Technologies", items: ["Android", "Swift", "Objective C", "Kotlin", "Flutter", "Xamarin"] },
    { name: "Front-end Technologies", items: ["HTML5", "CSS3", "javascript", "React", "Angular", "Vue"] },
    { name: "Back-end Technologies", items: ["Node", ".Net", "C#", "PHP", "Java", "Python"] },
    { name: "Other Technologies", items: ["WordPress", "R O R", "GoLang", "Docker", "Kubernetes", "Jenkins"] },
  ],
};

export const rdRateBand: CtaBandContent = {
  title: "Hire Remote Developers Starting from $12/hour",
  body: "We will provide you with Remote Application Developers that work from India. Contact us to take a look at CVs.",
  cta: { label: "Request Rate Card", href: FS_CLOSING_FORM },
};

export const rdModels: EngagementModelsContent = {
  ...jvModels,
  title: "Use Our Hiring Models to Hire App Developers",
  body: "Hire Mobile App developers from three flexible and startup-friendly hiring models to fulfill your business needs.",
  cta: { label: "Hire Mobile App", href: FS_HERO_FORM },
};

export const rdProcess = { ...jvProcess, title: "Hire Remote Developers in 5 easy steps" };

export const rdTestimonials = jvTestimonials;

export const rdClosing = {
  ...jvClosing,
  form: { ...jvClosing.form, subject: "Ad landing: Start Risk-FREE Trial (remote developers India)" },
};
