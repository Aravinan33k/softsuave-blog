/**
 * Copy for the "Flutter App Development" landing page
 * (`/flutter-application-development-company`).
 *
 * Every heading, paragraph and list item below is the live page's own copy,
 * extracted verbatim from
 * https://www.softsuave.com/flutter-application-development-company with the
 * Playwright MCP browser — the rendered DOM, read block by block, so a
 * sentence broken across its own `<b>`/`<a>` markup arrives whole. The design
 * and the motion are this surface's; the words are not ours to reword, and the
 * live page's own capitalisation of "App"/"Apps" mid-sentence is kept.
 *
 * The section `eyebrow` kickers are the live page's own too — it sets them
 * above each H2 (`span.text-primary`, and `span.style-font` for the FAQs).
 *
 * Shapes match the prop types exported by the shared landing sections in
 * `components/landing/*` and `components/common/*`, so each
 * section is `<Component content={…} />` with no adapter in between. Kept out
 * of `content.ts` because that file is the homepage's source and is imported by
 * Nav, Footer and every homepage section.
 *
 * The testimonials band and the closing enquiry block are the homepage's own
 * sections rendered verbatim (see the route) — the live page's testimonials
 * carry the identical heading, "What Our Clients Say About Us".
 */

import { partnerHeroBadges } from "./hero-badges";
import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServiceBoardContent } from "@/components/common/service-board";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { StoryCardsContent } from "@/components/common/story-cards";
import type { FaqContent } from "@/components/landing/faq";

export const flMeta = {
  slug: "flutter-application-development-company",
  path: "/flutter-application-development-company",
  /**
   * The live page's `<title>` is "Flutter App Development Company in India -
   * Soft Suave". The route appends " | Soft Suave" as every page on this
   * surface does, so the brand is dropped here rather than shipped twice.
   */
  title: "Flutter App Development Company in India",
  description:
    "Top Flutter app development company in India for healthcare, fintech, retail, and more. Delivering high-quality iOS and Android solutions.",
} as const;

export const flHero: HeroContent = {
  // The H1, split so the last line takes the coral accent.
  titleLines: ["Flutter App", "Development Services"],
  body: [
    "Are you struggling to find a reliable Flutter App Development Company in India? Your search ends here! Soft Suave is your one-stop destination to obtain comprehensive Flutter development services.",
    "Want to join hands with a reliable Flutter Development Team? Get in touch for a free quote!",
  ],
  // The live page's hero carries no bullet list — its left column is the
  // headline and these two paragraphs alone.
  points: [],
  // The four trust badges the live page shows beside its enquiry form.
  badges: partnerHeroBadges,
  form: {
    // The live page's own form heading and sub-line.
    eyebrow: "Let’s Discuss Your Project",
    title: "Get free rough quote in 24 hrs",
    note: "Tell us what the app has to do and which platforms it has to reach, and we come back with an approach, timeline, and estimate. Everything stays under NDA.",
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "The app you have in mind, whether it ships to iOS, Android, web or all three, any systems it has to talk to, and whether this is a new build or an existing app to migrate.",
    subject: "Flutter App Development enquiry",
  },
  /**
   * Hand-placed asset — full-bleed behind the whole hero section, veiled for
   * contrast. The same frame the mobile, Android and React Native pages open
   * on, so the app-development pages read as a set. See `Hero`'s `image` prop.
   */
  image: {
    src: "/images/four/svc-mobile.webp",
    width: 2048,
    height: 944,
    alt: "A Flutter application under development, shown across phone and tablet screens",
  },
};

/**
 * The live page's "Why Choose Soft Suave" block: two paragraphs, then the six
 * reasons it names but does not describe. Those are phrases rather than
 * sentences, so they render as the overview's claim list rather than as a card
 * grid that would need a body per card we do not have.
 */
export const flOverview: OverviewContent = {
  eyebrow: "Flutter App Development",
  title: "Why Choose Soft Suave For Flutter App Development?",
  paragraphs: [
    "Soft Suave is one of the leading players in the Flutter Mobile App Development market and is committed to crafting cost-effective and design-rich solutions.",
    "As a prominent provider of Flutter Application Development services, we create Android and iOS apps with an attractive user interface and intuitive functions. By working with companies from different industries, we have established the best ways to provide excellence in our work, ensuring that the solutions are tailored to specific interests. We hope to provide you with the best possible Flutter app development services in the market and help achieve your goals.",
  ],
  points: [
    "Global & Domestic Reach",
    "Talented Development Team",
    "Next-Gen Flutter Apps",
    "Design-Friendly Solutions",
    "Top-notch Native Interfaces",
    "Stand-out Market Presence",
    // The live page closes this list with a bare "ISO", which names no
    // standard and so claims nothing. Review asked for the certification to be
    // stated in full; the exact form is the registered one — "ISO/IEC
    // 27001:2022", not "ISO 27001:2022" — as `content.ts` records for the
    // homepage badge.
    "ISO/IEC 27001:2022",
  ],
  /**
   * The live page's own proof counters, which sit beside this block. Its
   * label reads "Year of Experience", singular, and is kept as written.
   */
  stats: [
    { figure: "400+", label: "Experts" },
    { figure: "21+", label: "Countries" },
    { figure: "150+", label: "Clients" },
    { figure: "13+", label: "Year of Experience" },
  ],
  /**
   * Counters to the right of the prose, in the column the illustration used to
   * hold — the review asked for exactly that swap, and there is no `image`
   * here any more as a result.
   *
   * What it replaced: `/images/landing/flutter/cross-platform.webp`, a 512px
   * flat line-art glyph stretched across a 4:3 photographic frame. It read as
   * a missing-image placeholder rather than artwork, and the same file was
   * doing duty as a service card's picture further down the page.
   */
  statsAside: true,
};

/**
 * The live page's mid-page band, between the why-choose copy and the benefits.
 *
 * No `eyebrow`: the review asked for "Start Building" to go, so the heading
 * stands on its own — which is what `CtaBandContent.eyebrow` is optional for.
 *
 * The button goes to the Flutter hiring page rather than back up to this
 * page's own enquiry form, as the review asked. `/hire-flutter-developers` is
 * a route this app serves, so `CtaBand` resolves it through `SiteLink` to a
 * local `<Link>`.
 */
export const flIdeaCta: CtaBandContent = {
  title: "Have a Mobile App Idea Using Flutter?",
  body: "With our talented 400+ App Developers, we guarantee you a quality App Development Service.",
  cta: { label: "Hire a Mobile Developer Today", href: "/hire-flutter-developers" },
};

/**
 * Six capability areas, each carrying the live page's own copy. Too long for
 * cards and too long to run down the page, so they render as a board: the six
 * names to pick from, one stage to read on. Same section the Android and React
 * Native pages use.
 */
export const flBenefits: ServiceBoardContent = {
  // Was "Flutter App Development" — byte-for-byte the overview's own kicker,
  // so two sections of one page wore the same label and the eyebrow stopped
  // telling the reader where they were. This follows the convention the rest
  // of the surface uses for a service board ("Android Development Services",
  // "PHP Development Services", "Python Development Services").
  eyebrow: "Flutter Development Services",
  title: "Key Benefits of Flutter App Development",
  body: "We design memorable digital experiences & scalable solutions that aid our clients to reach their business goals.",
  // /contact, not this page's `#enquiry` anchor — the review asked for this
  // button to reach the contact page.
  cta: { label: "Talk To Experts", href: "/contact" },
  items: [
    {
      name: "Flutter Cross-Platform Development",
      paragraphs: [
        "If you wish to build Apps that should focus on both Android and iOS users, you can opt for Native or cross-platform development. However, Native app development needs huge costs and a separate codebase for each platform. On the other hand, when you choose Flutter App Development, you can build cross-platform mobile apps, from a single codebase at an affordable price.",
        "Being a top-rated agency, we house skillful designers who can write the UI and navigation just once and share it across iOS and Android. Moreover, we can reuse 60% of the code which saves a lot of time and money.",
      ],
      image: { src: "/images/four/fl-cross-platform.webp", alt: "" },
    },
    {
      name: "Flutter Development for iOS and Android",
      paragraphs: [
        "Many businesses try to develop Apps that run on both iOS and Android. This helps them to target a wider range of customers compared to developing just one native App. However, obtaining the same look and feel for an app on both platforms is not easy as it sounds. This is where our competent Flutter App development team comes into play.",
        "As a leading Flutter mobile app development company, we craft the most appealing cross-platform Apps that behave as smoothly as native ones. Moreover, we are known for our ability in working with reasonable costs and offering great speed and usability at the same time.",
      ],
      image: { src: "/images/four/fl-ios-android.webp", alt: "" },
    },
    {
      name: "Flutter Web Development",
      paragraphs: [
        "Flutter is a known mobile development tool, but it can also be used for building web apps. Flutter can be used for increasing users for an application, but its fast web development and its ‘widgets’ allow for unique interfaces, making it very useful. With its shared codebase, flutter allows easy web app development, as the same code is applied for both mobile and desktop apps. Using Flutter is thus perfect for single-page applications and progressive web apps, and also to improve the functionalities of existing applications. Soft Suave’s Flutter Web Development solutions are affordable, offer consistent UI across platforms, and offer high performance for a smooth user experience.",
      ],
      image: { src: "/images/four/fl-web.webp", alt: "" },
    },
    {
      name: "Dart Application Development",
      paragraphs: [
        "Using Flutter’s programming language ‘Dart’ we develop highly beneficial apps that have fast execution, easy rendering, and quick compilations. With good documentation, excellent tooling support, a built-in package manager, and more, Dart allows for impressive next-gen applications.",
      ],
      image: { src: "/images/four/fl-dart.webp", alt: "" },
    },
    {
      name: "Dedicated Flutter Team",
      paragraphs: [
        "As one of the proficient Flutter App development companies, we have helped numerous small businesses to build a flutter App with super-functional and high-performing features. Hire Flutter developers from us who can work with tight deadlines and tighter budgets.",
        "Our technical team is dedicated to creating the most efficient and profitable solutions possible. Throughout the project, we keep in close contact with our clients, answering their questions and resolving any issues they may have. Since our development process is flexible, we can easily make new changes or improvements given by our clients.",
      ],
      image: { src: "/images/four/fl-team.webp", alt: "" },
    },
    {
      name: "Chat Application Development",
      paragraphs: [
        "Our Flutter App Development Team offers a comprehensive Chat Development service using Flutter, and this Chat App allows for easy sharing of documents and images. Flutter usage for Chat Development allows for rapid development, simpler maintenance, and more.",
      ],
      image: { src: "/images/four/fl-chat.webp", alt: "" },
    },
  ],
};

/**
 * The live page's four technology tabs, flattened into the shared stack's
 * groups. Names are passed straight to `components/home/tech-logo.tsx`; every
 * one but Objective C resolves to a real brand mark, and that one falls back
 * to the generic glyph.
 */
export const flTech: TechStackContent = {
  eyebrow: "Technology Expertise",
  title: "Our Software Development Technology Expertise",
  body: "Technology stacks are the backbone of your architected software. We build your software with the latest and top core technologies.",
  groups: [
    { name: "iOS", items: ["Swift", "Objective C", "Xcode"] },
    { name: "Android", items: ["Java", "Kotlin", "Android Studio"] },
    { name: "Cross-Platform", items: ["Flutter", "React", "Ionic", "JavaScript", "HTML5"] },
    {
      name: "Database",
      items: [
        "MySQL",
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

/**
 * The live page's four Flutter projects, each with its own artwork bundled
 * from softsuave.com. The live cards carry no sector label, so `industry` is
 * the one word each project's own copy names it by.
 */
export const flProjects: StoryCardsContent = {
  eyebrow: "Our Work",
  title: "Our Flutter Projects",
  body: "How Soft Suave helped clients empower their business with our flutter app development services.",
  items: [
    {
      industry: "eCommerce",
      name: "Ultimate Water delivery solution: An E-Commerce success",
      body: "Soft Suave successfully designed a water delivery app for a well-known e-commerce platform. This app can be accessed in multiple countries, supports various currencies, and has multi-language support. With real-time tracking and flexible payment methods, the app was received well.",
      image: {
        src: "/images/landing/flutter/proj-ecommerce.webp",
        alt: "A water-delivery ordering app running on a phone",
      },
    },
    {
      industry: "Insurance",
      name: "Insurance Simplified: Soft Suave’s Powerful Yet Simple Solution",
      body: "Soft Suave addressed an Insurance company’s challenges by creating a simple app with a user-friendly UI. It can be used by its customers for simple insurance purposes, like renewing insurance, changing their address, or reporting a claim.",
      image: {
        src: "/images/landing/flutter/proj-insurance.webp",
        alt: "An insurance self-service app showing policy renewal and claims",
      },
    },
    {
      industry: "Rental & Leasing",
      name: "Rent With Ease: A One-Stop Rental Solution",
      body: "We built a high-functioning app for a material rental and leasing company. The solution can be accessed by both staff and customers and used to handle contracts, quotations, and more.",
      image: {
        src: "/images/landing/flutter/proj-rental.webp",
        alt: "A rental and leasing app showing contracts and quotations",
      },
    },
    {
      industry: "Digital Payments",
      name: "Soft Suave To The Rescue: Locks And Keys",
      body: "Soft Suave created a secure application that can manage digital assets and transactions for a digital currency & payments platform. We integrated strong encryption to protect user data, making sure it will be secure even if the device is lost or hacked.",
      image: {
        src: "/images/landing/flutter/proj-digital-money.webp",
        alt: "A digital currency and payments app with encrypted asset management",
      },
    },
  ],
};

export const flFaqs: FaqContent = {
  eyebrow: "Questions",
  title: "Frequently Asked Questions",
  body: "Know more about our processes and how we work, with the help of the following FAQs.",
  items: [
    {
      q: "How will the communication process be after hiring the developer/team?",
      a: "After the commencement of the project, you can have regular communication with our Flutter developers through effective tools like slack or skype. Besides, there will always be a project manager to assist you anytime.",
    },
    {
      q: "Can I consider flutter a start-up-friendly platform?",
      a: "Since Flutter is a platform that allows using a single codebase to develop cross-platform Apps that could work on both Android and iOS, startups need not develop two separate Apps. Hence, Flutter is definitely a start-up-friendly platform.",
    },
    {
      q: "Will you work based on my time zone preference?",
      a: "When you outsource flutter development project to us, our dedicated Flutter team would work based on your time zone, deadline, and milestone. You have complete freedom to choose your preferred working hours. To know more details, talk with our project managers now.",
    },
    {
      q: "Can I migrate my existing app into Flutter?",
      a: "Yes, in fact, migration service is a part of our end-to-end Flutter App Development Services which are taken care of by trained technical experts.",
    },
  ],
};
