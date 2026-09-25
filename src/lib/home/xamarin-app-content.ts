/**
 * Copy for the "Xamarin App Development" landing page
 * (`/xamarin-app-development-company`).
 *
 * Every heading, paragraph and list item below is the live page's own copy,
 * extracted verbatim from
 * https://www.softsuave.com/xamarin-app-development-company with the Playwright
 * MCP browser — the rendered DOM, read block by block, so a sentence broken
 * across its own `<b>`/`<a>` markup arrives whole. The design and the motion
 * are this surface's; the words are not ours to reword, and the live page's own
 * capitalisation of "App"/"Apps" mid-sentence is kept, as is "GoogleCloud" run
 * together in its technology list.
 *
 * The section `eyebrow` kickers are the live page's own too — it sets them
 * above each H2 (`span.text-primary`).
 *
 * Shapes match the prop types exported by the shared landing sections in
 * `components/landing/*` and `components/common/*`, so each
 * section is `<Component content={…} />` with no adapter in between.
 *
 * The testimonials band is the homepage's own section rendered verbatim (see
 * the route), because the live page's copy for it IS the homepage's, to the
 * word: "What Our Clients Say About Us" with the same standfirst.
 *
 * This page has NO FAQ section and no case studies — the live page carries
 * neither, and nothing is invented to fill the rhythm.
 *
 * Not carried over: the one-paragraph blurb the live page prints under each of
 * the seven technologies in its stack tabs. The shared tech-stack section is a
 * grouped grid of brand marks and has no slot for per-tool prose.
 *
 * Images: hand-placed under `public/images/landing/xamarin/`, the convention
 * for landing-page art. All six are free-licence Pexels photographs, cropped to
 * each slot; their ids, source URLs and blur placeholders are recorded in
 * `public/images/landing/xamarin/credits.json`, the same way the iOS and Ionic
 * pages do it.
 */

import { partnerHeroBadges } from "./hero-badges";
import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServiceBoardContent } from "@/components/common/service-board";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { TechStackContent } from "@/components/landing/tech-stack";

export const xamMeta = {
  slug: "xamarin-app-development-company",
  path: "/xamarin-app-development-company",
  /**
   * The live page's `<title>` is "Xamarin Development Company In India - Soft
   * Suave". The route appends " | Soft Suave" as every page on this surface
   * does, so the brand is dropped here rather than shipped twice.
   */
  title: "Xamarin Development Company In India",
  description:
    "Xamarin development company in India building cross-platform mobile apps with native performance, seamless UI, and scalable architecture.",
} as const;

export const xamHero: HeroContent = {
  // The H1, split so the last line takes the coral accent.
  titleLines: ["Xamarin Development", "Company in India"],
  body: [
    "Get the best Xamarin app development services to create flexible, high-performance, next-gen cross-platform apps with native UI and API access.",
    "Are you planning to Outsource Xamarin Development in India? Get in touch for a free quote!",
  ],
  // The live page's hero carries no bullet list — its left column is the
  // headline and these two paragraphs alone.
  points: [],
  // The four trust badges this surface shows beside every enquiry form.
  badges: partnerHeroBadges,
  form: {
    // The live page's own form heading and sub-line. No `eyebrow`: the review
    // asked for the hero's kicker to go, and the card's is the only one the
    // hero renders. Same correction the React Native and Ionic pages took.
    title: "Get free rough quote in 24 hrs",
    note: "Tell us what the app has to do and which platforms it has to reach, and we come back with an approach, timeline, and estimate. Everything stays under NDA.",
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "The app you have in mind, whether it ships to iOS, Android, Windows or all three, any systems it has to talk to, and whether this is a new build or an existing app to migrate.",
    subject: "Xamarin App Development enquiry",
  },
  image: {
    src: "/images/landing/xamarin/hero.webp",
    width: 1920,
    height: 1080,
    alt: "A laptop, tablet and smartphone together on a desk, the platforms one Xamarin codebase targets",
    blurDataURL:
      "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAAAQAgCdASoQAAkAA4BaJagCdADdcADjiAgAAP6I+HyrDRNPjBIncna065kxPp54kfKyoyTmcXiyC/ebKIOgdWSLpkpiwAAA",
  },
};

export const xamOverview: OverviewContent = {
  eyebrow: "Xamarin Development",
  title: "Business-Driven Xamarin Development Solutions",
  paragraphs: [
    "As a proficient Xamarin development company, we develop full-featured Apps across different platforms with a native look and high-end performance.",
    "Soft Suave is the leading Xamarin Development Company in India offering the best cross-platform Xamarin mobile app development services using C#, Visual Studio, Xamarin forms and frameworks. Our dedicated mobile app developers put in place Xamarin solutions to empower your objectives to receive higher returns.",
    "During every stage of design and development process, our Xamarin developers optimize your apps for high value and superior usability for your end-customers. The application developed using Xamarin platform use hardware acceleration, which directly drives the performance like a native application.",
    "The Xamarin apps from Soft Suave are all Future Ready to stay ahead in the competition as Xamarin allows the re-use of code across all platforms as well as the integration of libraries written natively for each platform.",
  ],
  /**
   * The live page's own link, which was missing here: its second paragraph
   * sends "dedicated mobile app developers" to the hire page. That route is
   * one this app serves, so it resolves locally.
   */
  links: [{ text: "dedicated mobile app developers", href: "/hire-mobile-app-developers" }],
  /**
   * Portrait-cut frame, replacing a 4:3 macro of source code.
   *
   * The frame stretches to the prose height at desktop and lands near square,
   * so the old landscape asset was cropped hard on both sides — and it was an
   * extreme close-up to begin with, which left it reading as coloured blur
   * rather than as anything (review: "need to resize the section image"). This
   * one is cut portrait, so the square frame takes it almost whole.
   */
  image: {
    src: "/images/four/xam-overview.webp",
    width: 1000,
    height: 1200,
    alt: "A developer writing C# for a cross-platform application at a desktop workstation",
  },
};

/**
 * Four services, each carrying two paragraphs of the live page's copy. Too long
 * for cards and too long to run down the page, so they render as a board: the
 * four names to pick from, one stage to read on. Same section the Android,
 * React Native, Flutter and Ionic pages use.
 */
export const xamServices: ServiceBoardContent = {
  eyebrow: "Xamarin App Development",
  title: "Our Strength in Xamarin App Development Services",
  body: "We specialize in building top-quality cross-platform mobile apps with innovative functionality and perform like native apps. As a leading Xamarin development company, we offer these diverse Xamarin services,",
  // /contact, not this page's `#enquiry` anchor — the review asked for this
  // button to reach the contact page.
  cta: { label: "Talk To Experts", href: "/contact" },
  items: [
    {
      name: "Xamarin Development Consulting",
      paragraphs: [
        "Being a top Xamarin development company, we offer Xamarin application specialists who provide consulting services that help you transform your business strategies into high-performing Xamarin applications. Soft Suave, known as the best Xamarin app development company in India, provides clients with the right advice to accelerate their mobile app development using Xamarin. Our Xamarin specialists always take an extra step to fix bugs in your application and streamline the development process by choosing over Xamarin Forms and Xamarin Native according to your necessity.",
        "Our Xamarin consulting clients include small, medium-sized business, as well as high growth start-ups.",
      ],
      image: { src: "/images/landing/xamarin/svc-consulting.webp", alt: "" },
    },
    {
      name: "Dedicated Xamarin Development Team",
      paragraphs: [
        "Developers at Soft Suave are well-versed in the Xamarin platform and are very efficient when they are hired to work for clients. If you want a consistent performance or prefer a native look and feel, our developers will get your application done and running in no time. The amount of the latest tools and technologies our developers use to build the client’s application has made us the leading and trustworthy mobile app development company in USA and India.",
        "Our Xamarin developers are flexible to your requirements and will overlap your time zone and build custom application solutions that take your business to the next level.",
      ],
      image: { src: "/images/landing/xamarin/svc-team.webp", alt: "" },
    },
    {
      name: "Xamarin App Development",
      paragraphs: [
        "Soft Suave provides Xamarin development 10X faster at a less expensive cost compared to our competitors. Being the best Xamarin App Development Company, we don’t compromise on quality when it comes to the development of applications. Our Xamarin developers are experts in developing applications with an interactive & highly responsive UI for iOS, Android, and Windows platforms. With the amount of experience with Xamarin, our team can efficiently work round the clock to deliver high performing and easy to maintain apps, with the fastest turnaround time.",
        "Xamarin apps developed by Soft Suave are assured to push your competition out of the market and helps you in topping the industry easily. This makes us the preeminent Xamarin development company.",
      ],
      // Replaced the abstract close-up of source code that was here: it read
      // as texture rather than subject, and repeated what the overview image
      // already showed. The other three service photographs fit their
      // sections and are untouched.
      image: { src: "/images/four/xam-appdev.webp", alt: "" },
    },
    {
      name: "Cross-platform Development",
      paragraphs: [
        "We build highly-customizable and scalable cross-platform applications with the help of C# to give you access to all the platform-specific functionalities and to make it look & feel native. Using Xamarin to develop a Cross-platform application not only reduces money, time and resource but also provides the best reach for your application in the market.",
        "Our developers’ well-versed experience and exposure in customized cross-platform app development using Xamarin technology make Soft Suave the best and trusted Xamarin Cross-platform App Development Company in India and the USA.",
      ],
      image: { src: "/images/landing/xamarin/svc-crossplatform.webp", alt: "" },
    },
  ],
};

/**
 * The live page's band, which the review moved ahead of the technology stack.
 *
 * No `eyebrow`: the review asked for the CTA's kicker to go, so the heading
 * stands on its own — which is what `CtaBandContent.eyebrow` is optional for.
 *
 * `/hire-xamarin-developer` is a page softsuave.com publishes and this app does
 * not, so `SiteLink` resolves it to the live site. Building it here is its own
 * piece of work (see PAGE-TEMPLATES.md), not part of these corrections.
 */
export const xamHireCta: CtaBandContent = {
  title: "Need Xamarin Developers On Contract?",
  body: "Soft Suave has a pool of Dedicated Xamarin Developers who deliver your app development project on time and under your budget.",
  cta: { label: "Hire Xamarin Developer", href: "/hire-xamarin-developer" },
};

/**
 * The live page's three technology tabs, as the shared stack's groups. Names go
 * straight to `components/home/tech-logo.tsx`, and all seven resolve to a real
 * brand mark — Android was the last one falling back to the generic glyph and
 * was added to that component with jQuery, and C# now has its own mark rather
 * than borrowing C's.
 */
export const xamTech: TechStackContent = {
  eyebrow: "Xamarin Development",
  title: "Xamarin Development Technologies We Use",
  body: "Xamarin developers from Soft Suave are skilful and well versed in the following technologies.",
  groups: [
    { name: "Frontend", items: ["Xamarin", "C#"] },
    { name: "Operating System", items: ["Android", "iOS"] },
    // "GoogleCloud" is the live page's own spelling, run together.
    { name: "Platforms", items: ["AWS", "Azure", "GoogleCloud"] },
  ],
};
