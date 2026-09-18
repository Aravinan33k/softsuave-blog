/**
 * Copy for the "React Native App Development" landing page
 * (`/react-native-app-development-company`).
 *
 * Every heading, paragraph and list item below is the live page's own copy,
 * extracted verbatim from
 * https://www.softsuave.com/react-native-app-development-company with the
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
 * Testimonials and the closing enquiry block are the homepage's own sections
 * rendered verbatim (see the route). The live page carries neither, but every
 * other page on this surface closes that way, and the brief asks for those two
 * to be identical everywhere.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServiceBoardContent } from "@/components/common/service-board";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { CardGridContent } from "@/components/landing/industries";
import type { FaqContent } from "@/components/landing/faq";

export const rnMeta = {
  slug: "react-native-app-development-company",
  path: "/react-native-app-development-company",
  /**
   * The live page's `<title>` is "React Native Development Company India -
   * Soft Suave". The route appends " | Soft Suave" as every page on this
   * surface does, so the brand is dropped here rather than shipped twice.
   */
  title: "React Native Development Company India",
  description:
    "Soft Suave is a leading React Native app development company in India that offers quality react native development services for Start-ups and SMBs.",
} as const;

export const rnHero: HeroContent = {
  // The H1, split so the last line takes the coral accent.
  titleLines: ["React Native App Development", "Company In India"],
  body: [
    "Are you in a desperate search for a reliable React Native mobile app development company in India? Soft Suave is your ultimate place to get comprehensive React Native app development services.",
    "Want to outsource react native development in India? Get in touch for a free quote!",
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
      "The app you have in mind, whether it ships to iOS, Android or both, any systems it has to talk to, and whether this is a new build or an existing app to migrate.",
    subject: "React Native App Development enquiry",
  },
  /**
   * Hand-placed asset — full-bleed behind the whole hero section, veiled for
   * contrast. The same frame the mobile and Android pages open on, so the
   * three app-development pages read as a set. See `Hero`'s `image` prop.
   */
  image: {
    src: "/images/four/svc-mobile.webp",
    width: 2048,
    height: 944,
    alt: "A cross-platform application under development, shown across phone and tablet screens",
  },
};

export const rnOverview: OverviewContent = {
  eyebrow: "React Native App Development",
  title: "Proficient React Native App Development Company",
  paragraphs: [
    "As an experienced React Native App Development Company, we design, develop, and deploy fully customizable Apps with human-centric experiences.",
    "Backed by the robustness of Facebook and ease of JavaScript, React Native is an open-source framework that has the power to create high-performance cross-platform Apps. Additionally, this influential framework has numerous easy-to-use components that will accelerate the development process.",
    "Soft Suave is a flourishing React Native Development Company in India that builds Apps with native-like experiences. With a skilled in-house React Native app development team consisting of product managers, developers, designers, QA, and architects, we craft scalable, robust, and secured applications. Also, we have extremely refined approaches and methods that assist us to deploy hundreds of innovative React Native solutions globally.",
    "Our goal is to help startups and SMBs to make the most of React Native and achieve their goals as quickly as possible. Connect with us to develop mobile app ideas in the shortest possible time across both Android and iOS platforms.",
  ],
  // Hand-placed asset (not a Pexels-pipeline slot), same family as the hero's.
  image: {
    src: "/images/four/svc-web.webp",
    width: 2048,
    height: 944,
    alt: "A single React Native codebase rendering as a native app on both iOS and Android",
  },
};

/**
 * Four services, each carrying two paragraphs of the live page's copy. Too
 * long for cards and too long to run down the page, so they render as a board:
 * the four names to pick from, one stage to read on. Same section the Android
 * page uses.
 */
export const rnServices: ServiceBoardContent = {
  eyebrow: "React Native Development",
  title: "Extensible React Native Development Services",
  body: "Soft Suave is your destination to create intuitive and engaging applications. Our range of custom React Native App Development Services includes;",
  cta: { label: "Talk To Experts", href: "#enquiry" },
  items: [
    {
      name: "React Native UI/UX App Design",
      paragraphs: [
        "Since its library changes only the necessary parts instead of reloading the entire App, React Native is best-suited to build an attractive UI/UX at a limited time. An App’s UI/UI design improves the user experience and customer satisfaction that ultimately helps increase its users. That’s why our highly skilled designers focus on creating amazing user interfaces that render a great user experience for their end-users.",
        "Moreover, our proficient team of UX strategists works effectively with visual designers, information architects, and content strategists to accomplish innovative design experiences for the clients by implementing the most advanced UI tools.",
      ],
      image: { src: "/images/landing/services/svc-consulting-discovery.webp", alt: "" },
    },
    {
      name: "React Native App Development",
      paragraphs: [
        "React Native is one of the dominant frameworks in the technology industry with great sets of features like live & hot reloading, responsive and quick user interface, intuitive & modular architecture, etc. With our world-class React Native Development Services, Soft Suave develops high functionality Apps compatible with iOS and Android.",
        "Our top-of-the-line designers, developers, and consultants have years of experience and extensive knowledge through which we build React Native apps that target specific business models and help achieve increased performance. Besides, we are recognized for serving modern business needs from almost all types of industries including eCommerce, Construction, Healthcare, Education, etc.",
      ],
      image: { src: "/images/four/svc-mobile.webp", alt: "" },
    },
    {
      name: "React Native Integration & Migration",
      paragraphs: [
        "Being one of the early adopters of React Native framework, Soft Suave’s competent React Native developers have a reputation of delivering flawless cross-platform Apps. We also extend our services to migrate any existing App to React Native with improved capabilities and interactive UI/UX. This way, our clients can easily modernize their app in all aspects.",
        "Be it native or hybrid, our dedicated React native developers ensure a seamless migration while keeping all your needs in mind. As a leading React Native App Development Company in India, we also guarantee smooth App integration with backend APIs or third-party APIs.",
      ],
      image: { src: "/images/four/svc-modernization.webp", alt: "" },
    },
    {
      name: "React Native Support & Maintenance",
      paragraphs: [
        "For an App to be successful, it needs to be regularly updated and maintained. If not, it may suffer from bugs or outdated designs/features. This may result in users getting irritated and looking for a reliable, competitive application. To prevent this, Soft Suave provides best-in-class React Native Mobile App Development Support and Maintenance Services that ensure proper App functioning, increase App safety, and enhance productivity.",
        "Moreover, our talented React Native developers also incorporate security patches and third-party API updates with a motive so that applications stay up-to-date, and improve the brand image of our client’s business.",
      ],
      image: { src: "/images/landing/services/svc-support-optimisation.webp", alt: "" },
    },
  ],
};

/** The live page's outsourcing band, between the services and the benefits. */
export const rnOutsourceCta: CtaBandContent = {
  eyebrow: "Outsource With Us",
  title: "Want to Outsource React Native Development Company?",
  body: "Soft Suave has a pool of React Native Developers who deliver your app development project on time and under your budget.",
  cta: { label: "Hire React Native Developer", href: "#enquiry" },
};

/** Six benefits, three across on a wide desktop so neither row is orphaned. */
export const rnBenefits: CardGridContent = {
  eyebrow: "React Native",
  title: "Benefits Of Using React Native For Mobile App Development",
  body: "Within a short time, React Native framework has become the preferred software development tool for mobile app developers around the globe. Here are the major benefits of using React Native.",
  items: [
    {
      name: "Cross-Platform",
      body: "A single code base developed by React Native can be used to run equally on Android as well as iOS platforms, thus cutting down on time and energy.",
    },
    {
      name: "Trusted by Billions of Users",
      body: "React Native was utilized for both Facebook as well as Instagram mobile applications, which are utilized by billions of people every day.",
    },
    {
      name: "Swift Deployment",
      body: "Because the majority of the code is reused and has the modularity of the structure, mobile applications built using React Native can be quickly launched and then developed to Go Live.",
    },
    {
      name: "3rd Party Integrations",
      body: "Since React Native makes use of JavaScript it is able to access an extensive collection of third parties APIs and tools that are easily integrated.",
    },
    {
      name: "Modular Structure",
      body: "The modular design in React Native makes it the main game-changer. The same modules can be employed across multiple APIs to get quick results.",
    },
    {
      name: "Powerful Performance",
      body: "Contrary to other platforms that are more CPU (Central Processing Unit) intense, React Native makes use of GPU (Graphics Processing Unit) that ensures high performance.",
    },
  ],
};

export const rnFaqs: FaqContent = {
  eyebrow: "Questions",
  title: "Frequently Asked Questions",
  body: "Know more about our processes and how we work, with the help of the following FAQs.",
  items: [
    {
      q: "Can React Native be used for both web and mobile?",
      a: "Yes, React Native enables a developer to consolidate applications into a single codebase using React Native Web eliminating the need to develop and manage two codebases for mobile and web. This allows our developers to build separate Apps for web and mobile with the same level of speed and performance.",
    },
    {
      q: "How long does it take to build a React Native App?",
      a: "The time of development depends on the project’s complexity. However, being a JavaScript library, React Native assists in creating Apps that closely resemble native Apps in terms of appearance, feel, and performance using the same basic UI components as standard iOS/Android Apps.",
    },
    {
      q: "Why choose React Native for your next mobile app?",
      // `points` renders after the first paragraph — the line that introduces
      // the list — and the closing remark follows underneath it.
      a: [
        "By choosing React Native as your preferred framework to develop mobile Apps, you can get the following amazing benefits;",
        "We at Soft Suave make sure your App gets all these benefits with our end-to-end React Native development services.",
      ],
      points: [
        "Ability to reuse code and modular architecture",
        "Relatively simpler user interface",
        "Support for third-party plugins",
        "Live and Hot Reloading",
        "A large developers’ community",
        "Cost-effective approach",
      ],
    },
    {
      q: "Why choose Soft Suave for your next React Native app development project?",
      a: "Soft Suave is the most trusted React Native development company and we’ve been developing cross-platform Apps since the framework was released by Facebook in 2015. We have a superstar team of React Native App developers, designers, project managers, and analysts who can work with any complex project.",
    },
    {
      q: "What are the benefits of outsourcing React Native app development?",
      a: "When you outsource your project to a reliable React Native App development company like Soft Suave, you can get these advantages;",
      points: [
        "Work round the clock",
        "Access to experienced developer",
        "Reduced development times",
        "Consistent support and service",
        "Better understanding of different platforms",
      ],
    },
  ],
};
