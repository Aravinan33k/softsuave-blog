/**
 * Copy for the "NodeJS Development" landing page
 * (`/nodejs-development-company`).
 *
 * Every heading, paragraph and list item below is the live page's own copy,
 * extracted verbatim from https://www.softsuave.com/nodejs-development-company.
 * The page is server-rendered, so it was fetched with `curl` and walked with
 * jsdom rather than driven through a browser.
 *
 * The live page carries no eyebrow kickers above its section headings (the
 * homepage-reused testimonials band is the one exception, and that band comes
 * from `components/home/testimonials` unchanged) — so, as on the Ruby on
 * Rails page, each section's `eyebrow` here is a short label drawn from the
 * bolded span inside that section's own H2, not an invented phrase.
 *
 * Six services, each with its own two paragraphs, read from the six
 * `.services_box`-style containers under "Our NodeJS App Development
 * Services" (the section listing surfaced only the first three headings
 * before truncating; the full section actually holds Custom NodeJS
 * Development, NodeJS API Development, NodeJS Plugin Development, NodeJS
 * Migration & Upgradation, NodeJS Consulting Service and NodeJS Maintenance &
 * Support).
 *
 * The mid-page CTA band ("Need Dedicated NodeJS Developers?") carries no
 * eyebrow and its own button — "Hire NodeJS Developer" — links externally to
 * `https://www.softsuave.com/hire-nodejs-developers`, a page this app does
 * not serve, rather than to this page's own `#enquiry` form. That is kept as
 * the real destination rather than defaulting to `#enquiry`, the same lesson
 * the ReactJS page's "Talk to Experts" button surfaced.
 *
 * The technology section is three tabs — Frameworks, Template Engines,
 * Database — read by walking the shared `.nav-pills` list's own child order:
 * each `li.items_title` heading starts a new group, and the plain `li`s that
 * follow until the next heading are that group's items. All three groups
 * have three or more items, so no fold was needed here (compare the Ruby on
 * Rails and GraphQL pages, which each needed one). This is a scraped page,
 * not a brief-supplied one, so it renders through `landing/tech-stack`'s
 * static bordered panels rather than the homepage's marquee — the marquee is
 * reserved for the Next.js/TypeScript/GraphQL trio by explicit instruction.
 *
 * The FAQ has five questions; two carry a bulleted list inside the answer
 * (why-choose-us's four credentials, and the NodeJS benefits list). The last
 * question's answer is two paragraphs with the bullets in between, which is
 * exactly the shape `FaqItem.points` renders: first paragraph, then the
 * bullets, then any remaining paragraphs underneath.
 *
 * The live page has no clients logo band of its own for this section — its
 * only "brand-logo"-classed element is the footer's own social-icon mark
 * under `.social_media_icon`, not a partner-clients strip, so none is
 * rendered here (unlike the ReactJS page, which does carry one).
 *
 * The testimonials band is the homepage's own section rendered verbatim (see
 * the route), because the live page's copy for it IS the homepage's, to the
 * word: "What Our Clients Say About Us" with the same standfirst.
 *
 * Images: hand-placed under `public/images/landing/nodejs/`. All eight are
 * free-licence Pexels photographs cropped to each slot; ids, source URLs and
 * blur placeholders are in that folder's `credits.json`.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServiceBoardContent } from "@/components/common/service-board";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { FaqContent } from "@/components/landing/faq";

export const njMeta = {
  slug: "nodejs-development-company",
  path: "/nodejs-development-company",
  /**
   * The live page's `<title>` is "NodeJS Development Company in India - Soft
   * Suave". The route appends " | Soft Suave" as every page on this surface
   * does, so the brand is dropped here rather than shipped twice.
   */
  title: "NodeJS Development Company in India",
  description:
    "Work with a top Node js development company in India. Get 40 hours of a free trial, access to top 3% developers, and high-performance solutions.",
} as const;

export const njHero: HeroContent = {
  eyebrow: "NodeJS Development",
  // The H1, split so the last line takes the coral accent.
  titleLines: ["Custom NodeJS Development", "Company In India"],
  body: [
    "Tired of searching for a trustworthy and reliable NodeJS Web Development Company in India? Soft Suave is your one-stop destination for all your NodeJS application development needs.",
    "Need to build an interactive NodeJS App for your business? Get in touch for a free quote!",
  ],
  // The live page's hero carries no bullet list — its left column is the
  // headline and these two paragraphs alone.
  points: [],
  badges: ["Upwork Top Rated", "Clutch verified", "Microsoft Silver Partner", "AWS Partner"],
  form: {
    eyebrow: "Let's Discuss Your Project",
    title: "Get free rough quote in 24 hrs",
    note: "This form is for business, not candidates. To apply for jobs,",
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "The application you have in mind, who uses it, anything it has to integrate with, and whether this is a new build or an existing Node.js app to extend.",
    subject: "NodeJS Development enquiry",
  },
  image: {
    src: "/images/landing/nodejs/hero.webp",
    width: 1920,
    height: 1080,
    alt: "Hands typing code on a laptop keyboard in a dark room, capturing the essence of late-night programming",
    blurDataURL:
      "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAADQAwCdASoQABgAPtFapkyoJSOiMAgBABoJYwAAW+jMy7Yt9n6eBTgA/vd2wrDSWgMK4vSTlkKga+8pgV0KymibGuamCaBNGUNVzf8GKzDLHcnhpnNOQF29/tN8PmWO378wR+AA",
  },
};

export const njOverview: OverviewContent = {
  eyebrow: "NodeJS Web Development",
  title: "Soft Suave into NodeJS Web Development",
  paragraphs: [
    "As a skilled Node JS web development company, we design and develop feature-rich and advanced NodeJS applications in a quicker turnaround time.",
    "NodeJS is an open-source, cross-platform that is extensively used for developing stable, faster server tools and network applications. Node.js is a JavaScript runtime environment that enables developers to interpret the pre-requisites in a more approachable way.",
    "Basic modules in NodeJS are written in JavaScript, thereby allowing the developers to write new modules effectively. At Soft Suave, various types of applications are being developed in NodeJS, considering it as one of the significant platforms.",
    "Being the leading NodeJS development company in India, we leverage the technology to provide excellent application development services, including mobile application, web application, network applications, and real-time applications. If you are in search of a perfect application provider based on NodeJS, then partner with us and gain the best NodeJS web development services at an affordable cost.",
  ],
  image: {
    src: "/images/landing/nodejs/overview.webp",
    width: 1400,
    height: 1050,
    alt: "Workers collaborating in a modern office with computers, showcasing teamwork in technology development",
    blurDataURL:
      "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAACQAgCdASoQAAsAAsBMJYwCdAYuHqdXyR8zblbhAADLHkf/kLTRcZVL/oR8jgYlOPLTuF1Vxx+a67u+X8eU7eTQXiYrUJSNho3+7sIGJpl+nemIRij7Dpldg0dEOIdzQjAH7XuWRynY9n12L1E1TGD95qlAAA==",
  },
};

/**
 * Six services, each carrying the two paragraphs the live page pairs with it.
 * Too long for cards and too long to run down the page, so they render as a
 * board: the six names to pick from, one stage to read on. Same section the
 * Android, React Native, Flutter, Ionic, Xamarin, .NET and Ruby on Rails
 * pages use.
 */
export const njServices: ServiceBoardContent = {
  eyebrow: "NodeJS App Development",
  title: "Our NodeJS App Development Services",
  body: "We are a first-class NodeJS development company delivering successful NodeJS applications to clients in the USA and all around the world. We are known for our premium NodeJS services such as,",
  cta: { label: "Talk To Experts", href: "#enquiry" },
  items: [
    {
      name: "Custom NodeJS Development",
      paragraphs: [
        "Our NodeJS development team has remarkable expertise and experience to offer Custom NodeJS Development Services according to the client's requirements. As the future of app development relies on secure, scalable, feature-packed and mobile-friendly apps, Soft Suave delivers quality and custom NodeJS development services at your budget.",
        "The NodeJS developers at Soft Suave are well versed in creating complex web-based applications, dynamic web applications, PWAs, chatbots, social networks and many more according to your custom features and functionalities.",
      ],
      image: { src: "/images/landing/nodejs/svc-custom.webp", alt: "" },
    },
    {
      name: "NodeJS API Development",
      paragraphs: [
        "Soft Suave is the best NodeJS development company in India that offers NodeJS API development and integration. The development team works smartly to provide high performing and scalable enterprise-oriented API development services under your budget. Besides, Soft Suave is also renowned for offering secure API-based web app and mobile app development services right from scratch.",
        "Being a top-notch NodeJS development company, we have studied, researched, and analyzed NodeJS ultimately to make the best use of it to develop APIs.",
      ],
      image: { src: "/images/landing/nodejs/svc-api.webp", alt: "" },
    },
    {
      name: "NodeJS Plugin Development",
      paragraphs: [
        "NodeJS plugins boost the performance of web solutions. The NodeJS experts at Soft Suave enhance the capabilities and performance of the client's website by developing and integrating custom plugins. Soft Suave caters the need of many start-ups and SMBs with custom plugins. Thus, our NodeJS plugins development service is the most renowned in India.",
        "Our Dedicated NodeJS developers offer all the plugin development services in a cost-effective and timely manner. They are well-versed to develop as well as integrate custom plugins.",
      ],
      image: { src: "/images/landing/nodejs/svc-plugin.webp", alt: "" },
    },
    {
      name: "NodeJS Migration & Upgradation",
      paragraphs: [
        "Migration existing App to NodeJS is a great way to handle a large amount of simultaneous connections in a non-blocking manner. As a competent Node JS web development company, we have experts who cost-effectively provide hassle-free migration services.",
        "We are well-versed in upgrading your present version of NodeJS App to the newest version. Besides, we'll assist you in moving your application's data, setting it up, and configuring it, as well as verifying that all of the features are operational. Migrating your legacy system to NodeJS is simple with the help of our talented team.",
      ],
      image: { src: "/images/landing/nodejs/svc-migration.webp", alt: "" },
    },
    {
      name: "NodeJS Consulting Service",
      paragraphs: [
        "Soft Suave has an expert team of developers and project managers to help you with all NodeJS consulting services. Our experienced tech experts understand your business and offer the right consultation to boost your growth effortlessly. We also help you leverage our best NodeJS development services to build unique and cost-effective web solutions.",
        "Our consulting helps you launch future-proof applications and streamline your business smoothly. Our NodeJS experts are available round the clock to help clients with the best consultation which helps us to become the most preferred NodeJS development company in India.",
      ],
      image: { src: "/images/landing/nodejs/svc-consulting.webp", alt: "" },
    },
    {
      name: "NodeJS Maintenance & Support",
      paragraphs: [
        "Our NodeJS developers offer excellent support and maintenance services to ensure a seamless customer experience. Our professionals ensure your web app runs seamlessly and stays bug-free for a long time. Our offshore backend developers are well trained to provide maintenance & support service to maintain your app cost-effectively.",
        "Soft Suave always strives to offer world-class, reliable and secure NodeJS Maintenance Services to clients around the world and help you resolve technical and logical issues in web applications.",
      ],
      image: { src: "/images/landing/nodejs/svc-maintenance.webp", alt: "" },
    },
  ],
};

/**
 * The live page's mid-page band. Its own button links externally to
 * `https://www.softsuave.com/hire-nodejs-developers` — see the module
 * docblock — rather than to this page's own `#enquiry` form.
 */
export const njHireCta: CtaBandContent = {
  eyebrow: "Hire A Team",
  title: "Need Dedicated NodeJS Developers?",
  body: "Soft Suave has a pool of certified and experienced NodeJS developers who deliver your app development project on time and under your budget.",
  cta: { label: "Hire NodeJS Developer", href: "https://www.softsuave.com/hire-nodejs-developers" },
};

/**
 * The live page's three technology tabs, as the shared stack's groups. Names
 * go straight to `components/home/tech-logo.tsx`; any not yet mapped there
 * fall back to the generic glyph, the same as any other page's non-brand
 * entries.
 */
export const njTech: TechStackContent = {
  eyebrow: "NodeJS Development",
  title: "Our Expertise in NodeJS Development Technologies",
  body: "With the help of top NodeJS tools, frameworks, libraries, databases, and technologies, our NodeJS development services achieve rapid-innovation and speedy delivery.",
  groups: [
    {
      name: "Frameworks",
      items: ["Express.js", "Koa.js", "Meteor.js", "Adonis.js", "Sails.js", "Hapi.js"],
    },
    { name: "Template Engines", items: ["Jade", "Vash", "Pug"] },
    {
      name: "Database",
      items: [
        "MySQL",
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

export const njFaqs: FaqContent = {
  eyebrow: "Questions",
  title: "Frequently Asked Questions",
  body: "Know more about our processes and how we work, with the help of the following FAQs.",
  items: [
    {
      q: "Why should I choose Soft Suave over other NodeJS development companies?",
      a: "To stand out from other NodeJS development companies, Soft Suave always provides personalized services to clients and helps them have a good online presence. Plus, we have",
      points: [
        "13+ years of experience",
        "150+ long term clients across the globe",
        "400+ team of skilled developers",
        "4.8/5 ratings in Clutch",
      ],
    },
    {
      q: "How to hire a cost-effective NodeJS application development team?",
      a: "When you hire a NodeJS application development team with limited resources, go for a company that specializes in developing Apps for startups and SMBs. Also, the location plays a crucial role. For instance, an Indian NodeJS development company like Soft Suave will be much more affordable than an American company.",
    },
    {
      q: "Can you sign a Non-disclosure agreement (NDA) for my project?",
      a: "Yes, it's a mandatory step we follow before commencing the project. By signing an NDA, we ensure utmost confidentiality and commitment.",
    },
    {
      q: "What are the benefits of using NodeJS for web app development?",
      a: "When you work with a competent NodeJs Web Development Company, you can get these advantages of NodeJS,",
      points: [
        "High-performance for real-time applications",
        "Easy scalability",
        "Cost-effective",
        "Improved App response time",
        "Reduced time-to-Market",
      ],
    },
    {
      q: "How much does it cost to develop a NodeJS Project?",
      a: [
        "Every project is different, hence, one price doesn't fit all. However, the cost is determined based on",
        "Talk with our project managers now to know the exact price estimation.",
      ],
      points: [
        "Complexity of the project",
        "Frameworks, tools to be used",
        "Duration of the project",
        "Features to be included",
      ],
    },
  ],
};
