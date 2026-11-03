/**
 * Copy for `/ad/hire-full-stack-developers` — a clone of
 * softsuave.com/ad/hire-full-stack-developers, the paid-traffic landing page for
 * hiring full-stack developers in India on contract.
 *
 * Only what the live page RENDERS, word for word — its markup comments out a
 * testimonials block, a "Use Our Hiring Models" block and an old testimonial
 * section, and its header's "Mail Us" / "Inquire Now" links are hidden. Live
 * order: hero (+ form) · trusted-by logos + figures · technologies · stack cards
 * · rate banner · steps · closing form. This page has no popups; every button
 * scrolls to a form on the page.
 *
 * Where the repo's own constants differ from the live figures (13+ years, 21+
 * countries) the constants win — a test keeps those numbers in one place.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CardGridContent } from "@/components/generative-ai/industries";
import type { ProcessContent } from "@/components/landing/process";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { EnquiryFormContent } from "@/components/common/enquiry-form";
import { dedTech } from "@/lib/home/ad-hire-dedicated-developer-content";
import { CLIENTS_PLUS, COUNTRIES_PLUS, SPECIALISTS_PLUS, YEARS_PLUS } from "@/lib/company-figures";

export const fsMeta = {
  path: "/ad/hire-full-stack-developers",
  // The live page's <title> and description, verbatim.
  title: "Hire Full Stack Developers India",
  description:
    "Onboard remote full-stack developers from Soft Suave for the development of advanced, feature-rich applications, utilizing a wide array of stack combinations, alongside convenient IT outsourcing services.",
} as const;

/** The hero's form card, and the closing form's section. */
export const FS_HERO_FORM = "#enquiry";
export const FS_CLOSING_FORM = "#ad-contact-form";

export const fsHero: HeroContent = {
  titleLines: ["Hire Full Stack Developers", "in India On Contract"],
  accent: "Full Stack Developers",
  body: [
    "Outsource & Save Upto 60% Cost",
    "Why hire separate backend & frontend developers while the work can be done by a single/team of Full Stack Developers?",
    "Outsource dedicated fullstack developer team from Soft Suave & get benefits like:",
  ],
  points: [
    "Save Upto 60% of your Costs",
    "Flexible Engagement Options (Fixed Cost, Hourly or Monthly Dedicated)",
    "Strict NDA Terms + 2X Faster Delivery",
  ],
  // The live hero's four marks, as its own files: CMMI Level 3, Clutch 4.9,
  // Microsoft Silver Partner, AWS Select Technology Partner. Made for a dark
  // ground, so they sit bare.
  badgesBare: true,
  badges: [
    { src: "/brand/ad/fs-cmmi.webp", alt: "CMMI Level 3", width: 252, height: 180 },
    { src: "/brand/ad/fs-clutch.webp", alt: "Rate on Clutch 4.9", width: 296, height: 180 },
    { src: "/brand/ad/fs-microsoft-silver.webp", alt: "Microsoft Silver Partner", width: 658, height: 180 },
    { src: "/brand/ad/fs-aws.webp", alt: "AWS Select Technology Partner", width: 436, height: 180 },
  ],
  form: {
    title: "Build Your Remote Team!",
    body: "Hire India's best developers with free trial",
    note: "We respect your",
    noteLink: { label: "privacy policy", href: "/privacy-policy", srText: "" },
    noteAfter: " and we will never spam you",
    submit: "Hire Now",
    sending: "Sending...",
    requirementLabel: "Your Requirements",
    requirementPlaceholder: "Your Requirements",
    subject: "Ad landing: Build Your Remote Team (full-stack developers)",
  },
};

/** "Trusted by the world's most innovative businesses" — the live carousel's eight marks, in its order. */
export const fsTrusted = {
  title: "Trusted by the world’s most innovative businesses",
  logos: [
    { name: "Decathlon", src: "/brand/clients/decathlon.webp" },
    { name: "Marriott", src: "/brand/clients/marriott.webp" },
    { name: "Doctoc", src: "/brand/clients/doctoc.webp" },
    { name: "Yooba", src: "/brand/clients/yooba.webp" },
    { name: "Ginster", src: "/brand/clients/ginstr.webp" },
    { name: "Warm Point Alarm", src: "/brand/clients/warmpoint.webp" },
    { name: "Goto Solr", src: "/brand/clients/gotosolr.webp" },
    { name: "Ad.Net", src: "/brand/clients/adnet.webp" },
  ],
  stats: [
    { figure: YEARS_PLUS, label: "Years in Business" },
    { figure: SPECIALISTS_PLUS, label: "App Developers" },
    { figure: COUNTRIES_PLUS, label: "Countries" },
    { figure: CLIENTS_PLUS, label: "Clients" },
  ],
} as const;

/** "Choose Experts in Various Technologies" — the same six tabs the dedicated-developers ad page runs. */
export const fsTech = dedTech;

/**
 * "Our Top-grade Full-Stack Developers Tech Stack" — eight stack cards, then the
 * trial button. Each card shows the live page's own row of technology marks, in
 * its order (`public/brand/ad/stack`).
 */
export const fsStacks: CardGridContent = {
  eyebrow: "",
  title: "Our Top-grade Full-Stack Developers Tech Stack",
  body: "Get cost-effective solutions from our Full stack developers who are highly qualified, full-time, and in-house employees.",
  cta: { label: "Start 40 Hours Risk-Free Trial", href: FS_HERO_FORM },
  items: [
    {
      images: [{ src: "/brand/ad/stack/angular.webp", alt: "angular" }, { src: "/brand/ad/stack/mongodb.webp", alt: "mongodb" }, { src: "/brand/ad/stack/express.webp", alt: "express" }, { src: "/brand/ad/stack/node.webp", alt: "node" }],
      name: "Hire MEAN Stack Developers",
      body: "Build future-ready web Apps with our Full Stack MEAN developers who are highly experienced in MongoDB, ExpressJS, Angular, and NodeJS.",
    },
    {
      images: [{ src: "/brand/ad/stack/mongodb.webp", alt: "mongodb" }, { src: "/brand/ad/stack/express.webp", alt: "express" }, { src: "/brand/ad/stack/react.webp", alt: "react" }, { src: "/brand/ad/stack/node.webp", alt: "node" }],
      name: "Hire MERN Developers",
      body: "Hire MERN Stack developers to design monolithic, multitier, and microservice architecture of applications that performs well.",
    },
    {
      images: [{ src: "/brand/ad/stack/laravel.webp", alt: "laravel" }, { src: "/brand/ad/stack/vue.webp", alt: "vue" }],
      name: "Laravel + VueJs",
      body: "Our proficient Laravel + VueJS developers can work with any MVC frameworks such as Symfony, Yii, CakePHP & Codeigniter.",
    },
    {
      images: [{ src: "/brand/ad/stack/dotnet.webp", alt: "dotnet" }, { src: "/brand/ad/stack/angular.webp", alt: "angular" }],
      name: ".NET + Angular",
      body: "Hire .NET developers who can design, develop, deploy, integrate and handle front-end development with Angular.",
    },
    {
      images: [{ src: "/brand/ad/stack/mongodb.webp", alt: "mongodb" }, { src: "/brand/ad/stack/react.webp", alt: "react" }],
      name: "React + React Native + MongoDB",
      body: "Hire React experts who can code both React web Apps and React Native-based hybrid mobile Apps with on-demand scalability.",
    },
    {
      images: [{ src: "/brand/ad/stack/android.webp", alt: "android" }, { src: "/brand/ad/stack/flutter.webp", alt: "flutter" }],
      name: "Android + Flutter",
      body: "We have Full Stack Android developers on board who can also work with Flutter for developing cross-platform mobile apps.",
    },
    {
      images: [{ src: "/brand/ad/stack/electron.webp", alt: "electron" }, { src: "/brand/ad/stack/react.webp", alt: "react" }],
      name: "React Native + Electron js",
      body: "Our proficient Full Stack engineers can build scalable desktop Apps from a single codebase by employing the power of Electron JS and React Native.",
    },
    {
      images: [{ src: "/brand/ad/stack/angular.webp", alt: "angular" }, { src: "/brand/ad/stack/java.webp", alt: "java" }, { src: "/brand/ad/stack/react.webp", alt: "react" }, { src: "/brand/ad/stack/firebase.webp", alt: "firebase" }],
      name: "Java + JS (React/Angular) + Firebase",
      body: "Hire our Full Stack specialists who can work with core Java, J2EE, Spring, Angular, React & Firebase to get the desired output.",
    },
  ],
};

export const fsRateBand: CtaBandContent = {
  title: "Hire Fullstack Developers Starting from $12/hour",
  body: "We will provide you with remote Fullstack developers that work from India. Contact us to take a look at CVs.",
  cta: { label: "Request Rate Card", href: FS_CLOSING_FORM },
};

export const fsProcess: ProcessContent = {
  eyebrow: "",
  title: "Hire Fullstack Developers in 5 easy steps",
  body: "Below is the simple process that we follow while offering 1-week free trial to our clients.",
  steps: [
    { n: "01", name: "Inquiry", body: "Tell us in brief about your ideas and needs. Don't worry it's secure and confidential." },
    { n: "02", name: "Select CV", body: "Shortlist candidates which best fit in your needs by viewing their CVs." },
    { n: "03", name: "Assessment", body: "Optionally, assess candidates over a phone or video call." },
    { n: "04", name: "Trial Run", body: "Take a 1-week free trial." },
    { n: "05", name: "Add resource in your team", body: "If you like the resource(s), pay for the trial time and onboard resource(s)." },
  ],
};

/** The closing block: heading, line, the mail link, and the "Start Risk-FREE Trial!" form. */
export const fsClosing = {
  title: "Request 1 Week Free Trial!",
  body: "Get 1 week free trial and start your project risk-free!",
  link: { label: "contact@softsuave.com", href: "mailto:contact@softsuave.com" },
  form: {
    title: "Start Risk-FREE Trial!",
    submit: "Start Now",
    sending: "Sending...",
    requirementLabel: "Your Requirements",
    requirementPlaceholder: "Your Requirements",
    subject: "Ad landing: Start Risk-FREE Trial (full-stack developers)",
  } satisfies EnquiryFormContent,
} as const;
