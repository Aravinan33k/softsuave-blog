/**
 * Copy for the "ReactJS App Development" landing page
 * (`/reactjs-app-development-company`).
 *
 * Every heading, paragraph and list item below is the live page's own copy,
 * extracted verbatim from
 * https://www.softsuave.com/reactjs-app-development-company. The page is
 * server-rendered, so it was fetched with `curl` and walked with jsdom rather
 * than driven through a browser. Each service's two paragraphs were read from
 * its own container, so the pairing below is the live page's, not a guess.
 *
 * The design and the motion are this surface's; the words are not ours to
 * reword. The live page's own capitalisation and phrasing quirks are kept,
 * including "We Consider Your Ideas And feedbacks" (its own lower-case
 * "feedbacks") in the why-us block, which reads almost identically to the
 * Web Application Development page's own why-us copy — the two pages share
 * the same boilerplate block, down to one word ("app development" here vs.
 * "web app development" there).
 *
 * The FAQ accordion's fifth item, "I want to know more about React in order
 * to decide.", is not phrased as a question on the live page — it is kept
 * verbatim in the `q` field regardless, since every other FAQ item on this
 * surface is a real question and this one is what the source page shipped.
 *
 * Two of the FAQ answers end in a bulleted list on the live page (naming
 * competing libraries, then naming companies known to use React) — these
 * become `points`, rendered after the first paragraph, the same pattern used
 * on the Ionic and .NET pages' FAQs.
 *
 * The benefits section numbers each item on the live page ("1. Easy-to-use",
 * "2. Declaratory", …). The shared card grid already draws its own numeral
 * badge per card, so the leading "N. " is dropped from each name here to
 * avoid the same number appearing twice on one card.
 *
 * The "We Work For" section names three audiences and describes them only in
 * one shared closing sentence, so it renders as the overview's claim list
 * rather than as cards needing a body each we do not have — the same
 * treatment the Web Application Development page's "Who We Work With"
 * section got.
 *
 * The testimonials band is the homepage's own section rendered verbatim (see
 * the route), because the live page's copy for it IS the homepage's, to the
 * word: "What Our Clients Say About Us" with the same standfirst.
 *
 * This page has no technology stack section — the live page carries none,
 * and nothing is invented to fill it.
 *
 * Three sections were missed on the first extraction pass and added after
 * review, because none of their headings is an H2 (the level every other
 * scan on this page relied on):
 *
 *  - The clients logo band right under the hero (an H2-less `<section class="brand-logo">`),
 *    carrying eight partner logos of its own rather than the homepage's
 *    larger roster. Rendered here as the homepage's own `Clients` component anyway,
 *    the same choice made for every sibling page in this family — a page-
 *    specific eight-logo strip would mean re-hosting partner company
 *    trademarks this repo has no other copy of, for a section serving the
 *    identical purpose a shared component already covers.
 *  - A mid-page CTA band, `"Want to Hire ReactJS Developers?"` (an H3 inside a
 *    headless `<section class="down_profile">`), between the services and the benefits.
 *  - The `"Talk to Experts"` button under "We Work For", which the live page
 *    points at `https://www.softsuave.com/free-quote` — a page this app does not
 *    serve, so it is a plain external anchor rather than routed through
 *    `SiteLink`.
 *
 * Images: hand-placed under `public/images/landing/reactjs/`. All eight are
 * free-licence Pexels photographs cropped to each slot; ids, source URLs and
 * blur placeholders are in that folder's `credits.json`.
 */

import { partnerHeroBadges } from "./hero-badges";
import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServiceBoardContent } from "@/components/common/service-board";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { CardGridContent } from "@/components/landing/industries";
import type { FaqContent } from "@/components/landing/faq";

export const rjMeta = {
  slug: "reactjs-app-development-company",
  path: "/reactjs-app-development-company",
  /**
   * The live page's `<title>` is "ReactJS Development Company in India - Soft
   * Suave". The route appends " | Soft Suave" as every page on this surface
   * does, so the brand is dropped here rather than shipped twice.
   */
  title: "ReactJS Development Company in India",
  description:
    "Looking for React.js app development company in India that suits your budget. We are the leading development company with 13 Yrs of experience.",
} as const;

export const rjHero: HeroContent = {
  // The H1, split so the last line takes the coral accent.
  titleLines: ["React Js App", "Development Company"],
  body: [
    "Build futuristic, dynamic web apps with a best-in-class ReactJS app development Company in India.",
    "Looking for custom React development partner in India that suits your budget? Get in touch for a free quote!",
  ],
  // The live page's hero carries no bullet list — its left column is the
  // headline and these two lines alone.
  points: [],
  // The four trust badges this surface shows beside every enquiry form.
  badges: partnerHeroBadges,
  form: {
    // The live page's own form heading and sub-line.
    eyebrow: "Let’s Discuss Your Project",
    title: "Get free rough quote in 24 hrs",
    note: "Tell us what the application has to do and who uses it, and we come back with an approach, timeline, and estimate. Everything stays under NDA.",
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "The application you have in mind, who uses it, anything it has to integrate with, and whether this is a new build or an existing app to migrate to React.",
    subject: "ReactJS App Development enquiry",
  },
  image: {
    src: "/images/landing/reactjs/hero.webp",
    width: 1920,
    height: 1080,
    alt: "An open laptop with React code on screen in a modern workspace",
    blurDataURL:
      "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAAAwAgCdASoQAAkAA4BaJaACdH8AFdYsmB5gAAD+80xs9dxYMB/Y2ej7T3eWbnMM5tybuVv3vm1D9VVtrjKW++9B0Trc/px8bB0fvII3H6m1eDKLnrIFAAAA",
  },
};

export const rjOverview: OverviewContent = {
  eyebrow: "ReactJS Development",
  title: "Create Full-featured Applications With ReactJS",
  paragraphs: [
    "Our ReactJS Development Company in India delivers web applications with entreating speed and squeaky-clean functions. ReactJS developers translate business processes into lightning-fast and rich real-time internet applications using the component-based architecture of React. As one of the leading React Development Companies in USA & India, Soft Suave creates highly engaging and interactive web apps with a big room for forthcoming development.",
    "For your business to succeed, you need the right platform, a strong business strategy, and a skilled team from one of the top ReactJS development companies. ReactJS is backed by top brands like Facebook, Instagram, and Yahoo, and one with the most advanced frontend libraries can be the best platform for web app development.",
    "We are not satisfied with just ordinary apps but put in our hard work to make the digital world the best features, a user-friendly and secure place that gives delight to the eyes. Want your apps like that? Develop it using our React development service.",
  ],
  image: {
    src: "/images/landing/reactjs/overview.webp",
    width: 1400,
    height: 1050,
    alt: "A focused view of a developer's screen showing application code",
    blurDataURL:
      "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAAAwAgCdASoQAAwAA4BaJbACdAEO//hMMUSkAAD+0PFD3LSHwqwTwYv6UN5+L2B8Sru0fQFaEWHK93s2eX2AAA==",
  },
};

/**
 * Six services, each carrying the two paragraphs the live page pairs with it.
 * Too long for cards and too long to run down the page, so they render as a
 * board: the six names to pick from, one stage to read on. Same section the
 * Android, React Native, Flutter, Ionic, Xamarin, .NET and Ruby on Rails
 * pages use.
 */
export const rjServices: ServiceBoardContent = {
  eyebrow: "ReactJS",
  title: "Services We Offer ReactJS",
  body: "Our ReactJS Development Company in India delivers web applications with entreating speed and squeaky-clean functions.",
  cta: { label: "Talk to Experts", href: "#enquiry" },
  items: [
    {
      name: "React Front-End Development Services",
      paragraphs: [
        "Since React provides a lot of functionality, most developers prefer to use it for front-end development since older libraries can be integrated into the software. Also, react is popular for its speed and flexibility.",
        "Due to our expertise in React web development, we have completed a lot of ReactJS projects for our clients while considering their unique requirements and allocated budget. Front-end web development with React is something we're familiar with.",
      ],
      image: { src: "/images/landing/reactjs/svc-frontend.webp", alt: "" },
    },
    {
      name: "ReactJS UI/UX Development",
      paragraphs: [
        "Both UI and UX are driven by React. Because of its view layer focus, React can create static as well as dynamic user interfaces, and its composition and reactivity mean it's well-suited for UIs that are responsive and reactive.",
        "Create eye-catching and user-friendly online applications using ReactJS. We create highly engaging interfaces with innovative elements that grab user attention on a large scale through our UI/UX designers.",
      ],
      image: { src: "/images/landing/reactjs/svc-uiux.webp", alt: "" },
    },
    {
      name: "ReactJS API Integration",
      paragraphs: [
        "Spotify is one of the notable ReactJS APIs! It enhances software functionality and accessibility by developing customized APIs. APIs that are user-friendly and interactive can speed up the operational capacity.",
        "Soft Suave’s ReactJS development team can create interactive integration with advanced updates so that you don't have to worry about its longevity. Your data transfer goes smoothly regardless of any system.",
      ],
      image: { src: "/images/landing/reactjs/svc-api.webp", alt: "" },
    },
    {
      name: "Migration to React",
      paragraphs: [
        "You can migrate any of your software into ReactJS for good speed and flexibility with the advantage of having a good online presence. We provide React software development services that enable businesses to encapsulate existing architecture code in React components.",
        "In order to complete the migration process successfully, our Reactjs developers update your app while addressing faults and challenges.",
      ],
      image: { src: "/images/landing/reactjs/svc-migration.webp", alt: "" },
    },
    {
      name: "ReactJS Plugin Development",
      paragraphs: [
        "Plugins are like extra topping on the pizza. They help using special or customized functions to enhance your web application and sometimes help with additional changes without going into a complete coding environment.",
        "Through custom ReactJS plugins, Soft Suave offers one-of-a-kind features and functionality. In turn, this can be reused across your company's apps, allowing you to get the most out of your investment.",
      ],
      image: { src: "/images/landing/reactjs/svc-plugin.webp", alt: "" },
    },
    {
      name: "ReactJS Maintenance and Support",
      paragraphs: [
        "Soft Suave wants to have a long-term relationship with clients, it's more like a parent and a doctor relationship taking care of a child. We are always available which is why you don't need to worry about future maintenance and support services.",
        "We ensure that the performance of the application is consistent and stable at all times. You can also rely on us to upgrade the app's functionality on demand.",
      ],
      image: { src: "/images/landing/reactjs/svc-maintenance.webp", alt: "" },
    },
  ],
};

/** The live page's mid-page band, between the services and the benefits. */
export const rjHireCta: CtaBandContent = {
  eyebrow: "Hire A Team",
  title: "Want to Hire ReactJS Developers?",
  body: "Hire dedicated ReactJS developers that are handpicked for your specific project requirements.",
  cta: { label: "Hire ReactJS Developers", href: "#enquiry" },
};

/**
 * Seven benefits, one paragraph each. The live page numbers each name
 * ("1. Easy-to-use") — dropped here because the shared card grid already
 * draws its own numeral badge per card.
 */
export const rjBenefits: CardGridContent = {
  eyebrow: "Benefited",
  title: "Get Benefited From Soft Suave’s ReactJS App Solutions",
  body: "Know the benefits of using ReactJS for your application development process and our service.",
  items: [
    {
      name: "Easy-to-use",
      body: "The layout of any UI can be made interactive with ReactJS, which is extremely intuitive to use. Additionally, it allows for fast, quality-assured application development, saving time for both developers and clients.",
    },
    {
      name: "Declaratory",
      body: "When significant data changes occur, ReactJS automatically alters selected parts of the user interface. You do not need to perform any additional steps to update your user interface because of this progressive functionality.",
    },
    {
      name: "Reusable Components",
      body: "The concept of reusability is a remedy for developers. So, developers can reuse the components built for one application for another application with the same functionality.",
    },
    {
      name: "JavaScript library",
      body: "We always use a strong blend of JavaScript and HTML syntax, which simplifies writing code for any planned project. One of the functions in the JS library is used to convert HTML components into required functions and transform the entire project so that it is easy to comprehend.",
    },
    {
      name: "Components Support",
      body: "By utilizing HTML tags and JS codes, it is possible to work with a great deal of data having DOM. ReactJS serves as a mediator, representing the DOM and assisting in determining which component needs to be modified to get the result you want.",
    },
    {
      name: "SEO-friendly",
      body: "React JS was introduced after extensive research and improvements by Facebook. It naturally catches your eye and gives developers the power to build SEO-friendly UIs.",
    },
    {
      name: "Proficient in Data Binding",
      body: "ReactJS trails one-way data binding. All changes to any segment of the data can be tracked by everyone. Its simplicity is symbolized by this.",
    },
  ],
};

/**
 * "We Work For" names three audiences and describes them only in this one
 * shared closing sentence, so it renders as the overview's claim list rather
 * than as cards needing a body each we do not have.
 */
export const rjAudience: OverviewContent = {
  eyebrow: "Audience",
  title: "We Work For",
  paragraphs: [
    "The second most popular framework of 2022, ReactJS is suitable for any kind of app development. Our team develops innovative, efficient, and eye-catching front ends using ReactJS for Startups, Small Businesses, and Agencies.",
  ],
  points: ["Start Up Business", "Small & Medium Business", "Agencies"],
  // The live page shows these as three cards, not a tick list — the
  // audiences are concrete things being named, not abstract claims.
  pointsVariant: "cards",
  // The live page's own destination for this button: a live-site-only
  // quote form this app does not serve itself.
  cta: { label: "Talk to Experts", href: "https://www.softsuave.com/free-quote" },
};

/**
 * Five reasons, near-identical to the Web Application Development page's own
 * why-us block — see the module docblock for the one-word difference in its
 * closing sentence.
 */
export const rjWhyUs: CardGridContent = {
  eyebrow: "Soft Suave?",
  title: "Why Choose Soft Suave?",
  body: "Create & Contemporize web Applications To Digitally Convert Your Business",
  items: [
    {
      name: "Client Satisfaction",
      body: "We provide web app services more than what you needed for your business and its growth including future planning.",
    },
    {
      name: "Decade of Experience",
      body: "Our experience in the field for a decade enlightened us with the high skill in technology, what businesses needed with the market goal achievements.",
    },
    {
      name: "Better Communication",
      body: "We understand your requirements and get to know what is good for you, we travel with your business to know more and have frequent conversations, and queries for updates.",
    },
    {
      // The live page's own lower-case "feedbacks", kept as written.
      name: "We Consider Your Ideas And feedbacks",
      body: "Throughout the app development process, we get your feedback and ideas to update the web app to how you want it.",
    },
    {
      name: "Support Access 24/7",
      body: "You can contact our web app development team anytime regarding issues and support even after the completion of app development.",
    },
  ],
};

export const rjFaqs: FaqContent = {
  eyebrow: "Questions",
  title: "Frequently Asked Questions",
  body: "Know more about our processes and how we work, with the help of the following FAQs our clients ask.",
  items: [
    {
      q: "Is ReactJS a framework or a library?",
      a: [
        "The React JS library is not a framework. As part of the MVC (Model-View-Controller) framework, it focuses on the view layer.",
        "Even so, many people find it useful for building or supporting larger frameworks because of some of its features. Taking into account the wider ecosystem is especially important.",
      ],
    },
    {
      q: "What is the purpose of ReactJS?",
      a: [
        "In 2015, Facebook launched React Native, a mobile framework built on top of React JS. It was originally developed to create user interfaces for the web, but it has been used in broad front-end development and visual development for both web and applications since then.",
        "While React JS has valuable non-mobile applications as well, it is designed specifically for creating cross-platform mobile interfaces.",
      ],
    },
    {
      q: "When is React JS development useful?",
      a: "Using ReactJS, you can create user interfaces with reusable components. The view layer is handled by this component for mobile and web development. The technology can be used to create single-page applications, as well as mobile, web, and progressive web applications.",
    },
    {
      q: "Why is ReactJS so popular?",
      a: "React JS development uses one of the world’s most popular languages (JavaScript), it is easy to use, readily supported, and useful for quickly creating UI essentials. In addition to its virtual browser, which helps developers test, React JS also uses a virtual DOM for faster, lighter, more performant apps, which makes it a popular choice during project planning stages.",
    },
    {
      // Not phrased as a question on the live page — kept verbatim; see the
      // module docblock.
      q: "I want to know more about React in order to decide.",
      a: "It's good to know more about ReactJS development service in even more detail. You can talk to our ReactJS experts for consultation for free.",
    },
    {
      q: "What are the competitors of ReactJS?",
      a: "Other JavaScript libraries with a focus on front-end web and mobile development compete with React JS,",
      points: ["Vue", "InfernoJS.", "EmberJS.", "BackboneJS.", "Angular", "Mithril.", "Cycle JS."],
    },
    {
      q: "What are some examples of React JS development?",
      a: "The most prominent example of React JS development is Facebook. The social media network created React JS specifically for this purpose.",
      points: ["Instagram", "Whatsapp", "Netflix", "Medium", "Udemy"],
    },
  ],
};
