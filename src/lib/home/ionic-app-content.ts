/**
 * Copy for the "Ionic App Development" landing page
 * (`/ionic-app-development-company`).
 *
 * Every heading, paragraph and list item below is the live page's own copy,
 * extracted verbatim from
 * https://www.softsuave.com/ionic-app-development-company with the Playwright
 * MCP browser — the rendered DOM, read block by block, so a sentence broken
 * across its own `<b>`/`<a>` markup arrives whole. The design and the motion
 * are this surface's; the words are not ours to reword, and the live page's own
 * capitalisation of "App"/"Apps" mid-sentence is kept.
 *
 * The section `eyebrow` kickers are the live page's own too — it sets them
 * above each H2 (`span.text-primary`, and `span.style-font` for the FAQs).
 *
 * Shapes match the prop types exported by the shared landing sections in
 * `components/landing/*` and `components/common/*`, so each
 * section is `<Component content={…} />` with no adapter in between.
 *
 * Two bands are the homepage's own sections rendered verbatim (see the route)
 * rather than copies here, because the live page's copy for them IS the
 * homepage's, to the word: the clients band ("Preferred AI-Enabled Technology
 * Partner for Startups and SMBs") and the testimonials band ("What Our Clients
 * Say About Us").
 *
 * Not carried over: the one-paragraph blurb the live page prints under each of
 * the sixteen technologies in its stack tabs. The shared tech-stack section is
 * a grouped grid of brand marks and has no slot for per-tool prose; inventing
 * one for boilerplate ("Angular is a declarative, efficient framework") would
 * cost more than it returns.
 *
 * Images: hand-placed under `public/images/landing/ionic/`, the convention for
 * landing-page art (the Pexels pipeline in `content/images.manifest.json` is
 * the homepage's). Seven are free-licence Pexels photographs, cropped to each
 * slot; the overview illustration is Soft Suave's own diagram from the live
 * page. Every photo's id, source URL and blur placeholder is recorded in
 * `public/images/landing/ionic/credits.json`, the same way the iOS page does it.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServiceBoardContent } from "@/components/common/service-board";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { FaqContent } from "@/components/landing/faq";

export const ionMeta = {
  slug: "ionic-app-development-company",
  path: "/ionic-app-development-company",
  /**
   * The live page's `<title>` is "Best ionic app development company in India -
   * Soft Suave". The route appends " | Soft Suave" as every page on this
   * surface does, so the brand is dropped here rather than shipped twice.
   */
  title: "Best Ionic App Development Company in India",
  description:
    "Looking for an ionic development company in India that suits your budget? Build mobile Apps by outsourcing ionic development from Soft Suave.",
} as const;

export const ionHero: HeroContent = {
  // The H1, split so the last line takes the coral accent.
  titleLines: ["Custom Ionic App Development", "Company In India"],
  body: [
    "Are you struggling to find a trustworthy custom Ionic Mobile App Development Company in India? Connect with Soft Suave to get Ionic development solutions that stand out from the rest.",
    "Does your business need success-proof Ionic Mobile App Development Services? Get in touch for a free quote!",
  ],
  // The live page's hero carries no bullet list — its left column is the
  // headline and these two paragraphs alone.
  points: [],
  // The four trust badges the live page shows beside its enquiry form.
  badges: ["Upwork Top Rated", "Clutch verified", "Microsoft Silver Partner", "AWS Partner"],
  form: {
    // The live page's own form heading and sub-line.
    eyebrow: "Let’s Discuss Your Project",
    title: "Get free rough quote in 24 hrs",
    note: "Tell us what the app has to do and which platforms it has to reach, and we come back with an approach, timeline, and estimate. Everything stays under NDA.",
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "The app you have in mind, which platforms it must reach, any devices or systems it has to talk to, and whether this is a new build or an existing app to extend.",
    subject: "Ionic App Development enquiry",
  },
  /**
   * Hand-placed asset — full-bleed behind the whole hero section, veiled for
   * contrast. The same frame the other app-development pages open on, so they
   * read as a set. See `Hero`'s `image` prop.
   */
  image: {
    src: "/images/landing/ionic/hero.webp",
    width: 1920,
    height: 1080,
    alt: "A workspace with a laptop, tablet and smartphones side by side, the devices one Ionic build has to reach",
    blurDataURL:
      "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADwAQCdASoQAAkAA4BaJaQAD4fwRbe7ZAAA/u9U9+4k2k/OYS6YyuzTY6a/hhx9OpeptXQ6yrRMhkafPrWZBQNuIAAAAA==",
  },
};

export const ionOverview: OverviewContent = {
  eyebrow: "Capabilities",
  title: "Top-notch Ionic App Development Solutions",
  paragraphs: [
    "As a leading Ionic development company, we cover the entire scale of development, right from designing an intuitive UI to the deployment of Apps in the market.",
    "Soft Suave is the leading Ionic App Development Company in India that has developers with vast industry experience and impeccable dedication towards contributing to the fast-evolving tech world. They are well known to develop interactive and incredible hybrid apps with premium UI.",
    "Soft Suave helps you to build mobile applications without compromising the performance and rich user experience of the app. Through Ionic, we satisfy the desire of the market for cross-platform mobile app development with all native mobile experiences.",
    "We at Soft Suave design cost-effective and high performing Ionic app solutions for small to mid-sized companies from various industries around the world. Our Ionic developers provide Ionic mobile solutions that perfectly blend AngularJS, HTML5, CSS, and SaaS with your mobile app needs making your app efficient and crash free. This is what makes us one of the best Ionic Mobile App Development Company in the world.",
  ],
  image: {
    src: "/images/landing/ionic/overview.webp",
    width: 488,
    height: 451,
    alt: "A diagram of an Ionic app built from one codebase for iOS, Android and the web",
    blurDataURL:
      "data:image/webp;base64,UklGRiYBAABXRUJQVlA4WAoAAAAQAAAADwAADgAAQUxQSHwAAAABgJtt2/HsiTOQbRu1s4DTZYdMgc6ss4Ftp9JvxM4AETEBAACx7fE3F87WTmztL0Aou8YSOdE856irAYCwPYP72JYAcKEzH5vttg3A3Z6tbrdbA0Dw3N/ye+0C/P/289TAWMjkUKjlYns6QSxlcoHkNL/0hbdOitLPKCbTVlA4IIQAAABQAgCdASoQAA8AA4BaJagC7Aacvm8UkQxKpoAA/udAxFov9anLEClLd7Qze7oXZ7/60ih/Pe1Stvf7QWDtWwe70h6XsyXZ42Mm3Vz42bldnYsGm2cli+ttY++YWGzT9ZP72w9KbhWcKqh+fPtBZ1zs7dTNIJNHdQsqOf7det+TvtQzaAA=",
  },
};

/**
 * Six services, each carrying two paragraphs of the live page's copy. Too long
 * for cards and too long to run down the page, so they render as a board: the
 * six names to pick from, one stage to read on. Same section the Android,
 * React Native and Flutter pages use.
 */
export const ionServices: ServiceBoardContent = {
  eyebrow: "Services",
  title: "One-Stop Solution For Ionic App Development Services",
  body: "We are a competent Ionic Development Company constantly developing top-quality as well as highly efficient mobile apps. Our wide array of Ionic services are;",
  cta: { label: "Talk to Our Experts", href: "#enquiry" },
  items: [
    {
      name: "Ionic UI/UX Design",
      paragraphs: [
        "It is a known fact that Ionic has highly customizable themes and components. Soft Suave leverages these themes and components to develop mobile apps that have appealing UI. Our creative developers are no less than artists in creating the most compelling and engaging user interface for mobile applications. They also design beautiful graphics for the interactive elements of apps to make them look premium and awe-inspiring.",
        "These attractive graphics engage the app users and helps them in minimizing bounce rate and cognitive load on users. This is one of the main reasons why we are the most preferred Ionic Development Company in USA and India.",
      ],
      image: { src: "/images/landing/ionic/svc-design.webp", alt: "" },
    },
    {
      name: "Custom Ionic App Development",
      paragraphs: [
        "App development team at Soft Suave uses Ionic’s useful features like a single codebase, vast integration capabilities, and plugins, quick prototyping, convenient testing, concise documentation to deploy custom Apps. Hence, we prove to be a preferred company to Outsource Ionic App Development Services for clients around the globe.",
        "We constantly update our team with the latest and upcoming technologies and trends. This enables us to deliver Apps that will be loved by the users.",
      ],
      image: { src: "/images/landing/ionic/svc-custom.webp", alt: "" },
    },
    {
      name: "Ionic Widget Development",
      paragraphs: [
        "We have extensive expertise in the Ionic framework that allows us to develop feature-rich and robust cross-platform Apps. Our Ionic Development team produces the needed widgets in HTML5 and integrates them with Ionic via Cordova. Also, they can build Ionic widgets with different functionalities. Hence, integrating advanced features in Apps is not a complicated task for us.",
        "Partner with a reputed Ionic Development Company in India and upgrade your App with innovative features and match your business requirements.",
      ],
      image: { src: "/images/landing/ionic/svc-widget.webp", alt: "" },
    },
    {
      name: "Native & Hybrid App Development",
      paragraphs: [
        "Soft Suave, known as the best Ionic Mobile App Development Company in USA and India builds both native and hybrid mobile applications that are compatible with all major mobile platforms like iOS, Android and Windows. Our Ionic developers give the finest mobile interface to make the applications interactive.",
        "Our experienced Ionic developers follow the latest app development processes and methodologies to craft simple yet high-performing Ionic mobile app solutions for start-ups and SMBs. This experience helps the clients develop applications that are not only lighter but also affordable.",
      ],
      image: { src: "/images/landing/ionic/svc-hybrid.webp", alt: "" },
    },
    {
      name: "Ionic App Integration",
      paragraphs: [
        "Soft Suave offers Ionic App Integration Services at a greater level by integrating apps with smart watches, geolocation devices, AR/VR devices and other smart devices. The Ionic app integration is done in consideration with the requirement of the client for smooth functioning and a pleasant user experience for the users.",
        "With the amount of technological advancement, Soft Suave is future-ready with a team of the best Ionic developers in India to deal with the rising of future technology and integrate Ionic applications into futuristic smart devices.",
      ],
      image: { src: "/images/landing/ionic/svc-integration.webp", alt: "" },
    },
    {
      name: "Ionic Maintenance & Support",
      paragraphs: [
        "As a Reputed Ionic Development Company, we have a dedicated team of Ionic developers who support and maintain all the projects related to Ionic framework. They offer premium support to clients from the USA and Europe. Many clients who come to Soft Suave for support have a terrible past of losing money to companies who make false promise on maintenance of Ionic application after development.",
        "Soft Suave is the best app development company in India that not only supports new projects but also accepts abandoned projects to provide support and maintenance at an affordable cost according to the client requirement.",
      ],
      image: { src: "/images/landing/ionic/svc-support.webp", alt: "" },
    },
  ],
};

/** The live page's band between the services and the technology stack. */
export const ionHireCta: CtaBandContent = {
  eyebrow: "Hire A Team",
  title: "Hire an offshore Ionic app development team",
  body: "Soft Suave has a pool of Dedicated Ionic Developers who deliver your app development project on time and under your budget.",
  cta: { label: "Talk to Our Experts", href: "#enquiry" },
};

/**
 * The live page's three technology tabs, as the shared stack's groups. Names
 * are passed straight to `components/home/tech-logo.tsx`; jQuery, Laravel and
 * Android have no mark there yet and fall back to the generic glyph, which is
 * three of sixteen.
 */
export const ionTech: TechStackContent = {
  eyebrow: "Technology Stack",
  title: "Topmost Technologies We Use For Ionic App Development",
  body: "Having a strong team of Ionic App developers assist us to create, build, test, and launch highly interactive Apps.",
  groups: [
    {
      name: "Frontend",
      items: ["Angular", "ReactJS", "VueJS", "Laravel", "JQuery", "Javascript"],
    },
    { name: "Operating System", items: ["Android", "iOS"] },
    {
      name: "Database",
      items: [
        "MySql",
        "MongoDB",
        "PostgreSQL",
        "AWS DynamoDB",
        "SQLite",
        "Cloud Firestore",
        "Oracle",
        "MS SQL Server",
      ],
    },
  ],
};

export const ionFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "Frequently Asked Questions",
  body: "Know more about our processes and how we work, with the help of the following FAQs.",
  items: [
    {
      q: "Why should we hire Soft Suave for ionic App development?",
      a: "Soft Suave is a leading Ionic App development company operating for more than 13+ years. We have clients all around the world and a track record of delivering best-in-class Apps that will be successful in the market.",
    },
    {
      q: "Why should I choose an ionic framework for mobile App development?",
      a: "Ionic is a powerful framework that offers great flexibility, vast Cordova plugins, and large community support. Besides, it saves a lot of time and effort during the Ionic mobile App development process.",
    },
    {
      q: "What are the benefits of outsourcing ionic App development?",
      a: "When you outsource Ionic App development to a trusted company like Soft Suave, you get these benefits;",
      points: [
        "Low development & operational cost",
        "Flexible work based on your time-zone",
        "Access to India’s top skilled developers",
        "Assured quality services",
        "Reliable post-deployment services",
        "Clear transparency and communication",
      ],
    },
    {
      q: "How much does it cost to develop an Ionic App?",
      // `points` renders after the first paragraph — the line that introduces
      // the list — and the closing remark follows underneath it.
      a: [
        "Every project is different, hence, one price doesn’t fit all. However, the Ionic mobile App development cost is determined based on",
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
