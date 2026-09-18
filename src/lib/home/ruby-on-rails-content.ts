/**
 * Copy for the "Ruby on Rails Development" landing page
 * (`/ruby-on-rails-development-company`).
 *
 * Every heading, paragraph and list item below is the live page's own copy,
 * extracted verbatim from
 * https://www.softsuave.com/ruby-on-rails-development-company. The page is
 * server-rendered, so it was fetched with `curl` and walked with jsdom rather
 * than driven through a browser. Each service's two paragraphs were read from
 * its own container, so the pairing below is the live page's, not a guess.
 *
 * The design and the motion are this surface's; the words are not ours to
 * reword, and the live page's own spellings are kept, including "AWS
 * DynomoDB" (its own misspelling of DynamoDB, repeated on other pages too).
 *
 * The section `eyebrow` kickers are the live page's own too — it sets them
 * above each H2 (`span.text-primary`).
 *
 * The mid-page CTA band carries no H2 on the live page — its heading is an H3
 * ("Looking to Outsource Ruby on Rails Development Team?"), which is why it
 * did not surface in an H2-only scan of the page and needed a second look.
 *
 * The testimonials band is the homepage's own section rendered verbatim (see
 * the route), because the live page's copy for it IS the homepage's, to the
 * word: "What Our Clients Say About Us" with the same standfirst.
 *
 * This page has NO FAQ section and no case studies — the live page carries
 * neither, and nothing is invented to fill the rhythm.
 *
 * Images: hand-placed under `public/images/landing/ruby-on-rails/`. All six
 * are free-licence Pexels photographs cropped to each slot; ids, source URLs
 * and blur placeholders are in that folder's `credits.json`.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServiceBoardContent } from "@/components/common/service-board";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { TechStackContent } from "@/components/landing/tech-stack";

export const rorMeta = {
  slug: "ruby-on-rails-development-company",
  path: "/ruby-on-rails-development-company",
  /**
   * The live page's `<title>` is "Ruby on Rails Development Company India -
   * Soft Suave". The route appends " | Soft Suave" as every page on this
   * surface does, so the brand is dropped here rather than shipped twice.
   */
  title: "Ruby on Rails Development Company India",
  description:
    "Looking for a Ruby on Rails development company in India? Soft Suave offers expert ROR web development services to build robust applications.",
} as const;

export const rorHero: HeroContent = {
  // The H1, split so the last line takes the coral accent.
  titleLines: ["Result-Driven Ruby on Rails", "Development Company"],
  body: [
    "Tired of searching for a trustworthy ROR Development Company in India? Soft Suave is your one-stop solution for all your Ruby on Rails development needs.",
    "Are you looking to Outsource Ruby on Rails Development Agency? Get in touch for a free quote!",
  ],
  // The live page's hero carries no bullet list — its left column is the
  // headline and these two paragraphs alone.
  points: [],
  // The four trust badges this surface shows beside every enquiry form.
  badges: ["Upwork Top Rated", "Clutch verified", "Microsoft Silver Partner", "AWS Partner"],
  form: {
    // The live page's own form heading and sub-line.
    eyebrow: "Let’s Discuss Your Project",
    title: "Get free rough quote in 24 hrs",
    note: "Tell us what the application has to do and who uses it, and we come back with an approach, timeline, and estimate. Everything stays under NDA.",
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "The application you have in mind, who uses it, anything it has to integrate with, and whether this is a new build or an existing Rails app to extend.",
    subject: "Ruby on Rails Development enquiry",
  },
  image: {
    src: "/images/landing/ruby-on-rails/hero.webp",
    width: 1920,
    height: 1080,
    alt: "Ruby on Rails source code on a developer's screen",
    blurDataURL:
      "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADQAQCdASoQAAkAA4BaJQBOgB0+cYhsAAD+TuLXeh27y7mxBzB2D1/ybGYgq/+clN9LVudbUiAAAA==",
  },
};

export const rorOverview: OverviewContent = {
  eyebrow: "Ruby on Rails Development",
  title: "Highly Reliable Ruby on Rails Development Solutions",
  paragraphs: [
    "As an experienced Ruby on Rails development company, we help businesses from diverse industries to reach their full potential by offering quicker and cost-efficient ROR solutions.",
    "Soft Suave is a leading Ruby on Rails development company in India that caters to clients in the USA and all around the world with sumptuous ROR solutions at an affordable cost. Our ROR developers come with 4+ years of hands-on experience in this framework.",
    "They deliver highly competitive solutions that boost your business with the help of efficient, robust and maintainable codes. Web app solutions that stand out in today's web application industry are developed by our innovative ROR developers.",
    "Our agile methodology and error-free coding in RoR development are what makes us the best web application development company in India. The on-time and impeccable solutions we provide have made Soft Suave the most trusted ROR development company among our competitors.",
  ],
  image: {
    src: "/images/landing/ruby-on-rails/overview.webp",
    width: 1400,
    height: 1050,
    alt: "A team collaborating around a laptop in a modern office",
    blurDataURL:
      "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAAAwAgCdASoQAAwAA4BaJQBdgB9x/jrtFqsZ4AD82L3Ui1LQ01nE3zESMze36bNVz7wGg+I1sTLGpMHDxrxMt/wV6QBpmHtmeUw5ZLUJH9H5Bb4X8bAkJa6b50XDWTIneDLO3atwAAA=",
  },
};

/**
 * Four services, each carrying the two paragraphs the live page pairs with
 * it. Too long for cards and too long to run down the page, so they render as
 * a board: the four names to pick from, one stage to read on. Same section
 * the Android, React Native, Flutter, Ionic, Xamarin and .NET pages use.
 */
export const rorServices: ServiceBoardContent = {
  eyebrow: "Ruby on Rails Web Development",
  title: "Our Ruby on Rails Web Development Services",
  body: "As an experienced Ruby on Rails development company, we help businesses from diverse industries to reach their full potential by offering quicker and cost-efficient ROR solutions.",
  cta: { label: "Talk To Experts", href: "#enquiry" },
  items: [
    {
      name: "ROR Application Development",
      paragraphs: [
        "Soft Suave is a top-level Ruby on Rails development company, who develop high-quality custom enterprise RoR applications that fit well with your business needs. We build the reliable and secure applications to resolve complex challenges and add value to your business. Our experienced developers make the development process faster with the help of the RoR framework and readymade modules so the process cost becomes effective for your business. We support clients in RoR application development to achieve long-term business goals.",
        "Soft Suave’s industry-specific RoR applications are an added advantage for all the clients in terms of receiving applications that outplays competitor’ applications in the market.",
      ],
      image: { src: "/images/landing/ruby-on-rails/svc-application.webp", alt: "" },
    },
    {
      name: "ROR Integration & Migration",
      paragraphs: [
        "Soft Suave developers have hands-on experience in more than 100+ projects on seamlessly integrating RoR into an existing application ensuring flexibility and scalability. Our Skillful developers take the migration service to another level by providing error-free migration services without affecting the performance of the application. They also help in a hassle and risk-free ROR integration into third-party apps and APIs. This makes us the most preferred RoR development company.",
        "The proficiency in integration and migration services makes us one of the most trusted Ruby on Rails development company in India and the USA.",
      ],
      image: { src: "/images/landing/ruby-on-rails/svc-migration.webp", alt: "" },
    },
    {
      name: "Dedicated ROR Developer Team",
      paragraphs: [
        "Soft Suave houses more than 40 industry-leading ROR developers for clients to hire and expand their in-house development team. Our developers follow a client-first approach and deliver customized and collaborative RoR solutions according to their business needs.",
        "We give you direct control over our dedicated developers to successfully achieve your business goals with ease. Expand your in-house development team with our most talented RoR developers who overlap your time zones to complete your development needs on-time.",
      ],
      image: { src: "/images/landing/ruby-on-rails/svc-team.webp", alt: "" },
    },
    {
      name: "ROR Support & Maintenance",
      paragraphs: [
        "Soft Suave shows its professionalism as the best RoR development company by providing round the clock support and maintenance to our valued customers. We make sure that our maintenance and support services increase the life, efficiency and performance of the application. We customize our maintenance service considering the changes clients make in their business requirements. Soft Suave’s maintenance and support include upgrades, performance-boosting, bug fixes, adding security patches and backups.",
        "We also have a dedicated RoR support team to handle queries and offer help when our clients encounter operational glitches.",
      ],
      image: { src: "/images/landing/ruby-on-rails/svc-support.webp", alt: "" },
    },
  ],
};

/**
 * The live page's mid-page band. Its own heading is an H3, not an H2 — see the
 * module docblock — which is the one place this page's copy needed a second
 * look to find.
 */
export const rorHireCta: CtaBandContent = {
  eyebrow: "Hire A Team",
  title: "Looking to Outsource Ruby on Rails Development Team?",
  body: "Soft Suave has a pool of ROR Developers who deliver your app development project on time and under your budget.",
  cta: { label: "Hire ROR Developer", href: "#enquiry" },
};

/**
 * The live page's three technology tabs, as the shared stack's groups. Names
 * go straight to `components/home/tech-logo.tsx`; Sass and Rspec have no mark
 * there yet and fall back to the generic glyph, the same as any other page's
 * non-brand entries.
 */
export const rorTech: TechStackContent = {
  eyebrow: "Ruby on Rails Development",
  title: "Ruby on Rails Development Technologies We Use",
  body: "ROR developers from Soft Suave are proficient and sophisticated in the following technologies.",
  groups: [
    { name: "Frontend", items: ["HTML5", "Sass", "Javascript"] },
    { name: "Frameworks", items: ["Rails", "Rspec"] },
    {
      name: "Database",
      items: [
        "MySql",
        "MongoDB",
        "PostgreSQL",
        "AWS DynomoDB",
        "SQLite",
        "Cloud Firestore",
        "Oracle",
        "MS SQL Server",
      ],
    },
  ],
};
