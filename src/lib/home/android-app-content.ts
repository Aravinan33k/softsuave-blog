/**
 * Copy for the "Android Application Development" landing page
 * (`/android-application-development-company`).
 *
 * Every heading, paragraph and list item below is the live page's own copy,
 * extracted verbatim from
 * https://www.softsuave.com/android-application-development-company with the
 * Playwright MCP browser — the rendered DOM, read block by block, so a
 * sentence broken across its own `<b>`/`<a>` markup arrives whole. The design
 * and the motion are this surface's; the words are not ours to reword, typos
 * and all ("GoogleCloud", "devloped").
 *
 * The section `eyebrow` kickers are the live page's own too — it sets them
 * above each H2 (`span.text-primary`, and `span.style-font` for Testimonials).
 *
 * Shapes match the prop types exported by the shared landing sections in
 * `components/landing/*` and `components/common/*`, so each
 * section is `<Component content={…} />` with no adapter in between. Kept out
 * of `content.ts` because that file is the homepage's source and is imported by
 * Nav, Footer and every homepage section.
 *
 * Testimonials and the closing enquiry block are the homepage's own sections
 * rendered verbatim (see the route) — the live page's testimonials carry the
 * identical heading.
 */

import { partnerHeroBadges } from "./hero-badges";
import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServiceBoardContent } from "@/components/common/service-board";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { StackLayersContent } from "@/components/android-app/stack-layers";
import type { FaqContent } from "@/components/landing/faq";

export const andMeta = {
  slug: "android-application-development-company",
  path: "/android-application-development-company",
  /**
   * The live page's `<title>` is "Android App Development Company - Soft
   * Suave". The route appends " | Soft Suave" as every page on this surface
   * does, so the brand is dropped here rather than shipped twice.
   */
  title: "Android App Development Company",
  description:
    "Partner with an Android app development company in India providing offshore services for custom, feature-rich, and user-friendly mobile apps.",
} as const;

export const andHero: HeroContent = {
  // The H1, split so the last line takes the coral accent.
  titleLines: ["Android Application", "Development Service"],
  body: [
    "As a top Android app development company, we provide user-friendly and innovative solutions across industries. We design, develop, and improve apps for all Android OS versions. Get the best mobile experience with over a decade of reliable service.",
    "Want to onboard the Android app development team? Or Looking for an Android App Development agency in India? Get in touch for a free quote!",
  ],
  // The live page's hero carries no bullet list — its left column is the
  // headline and these two paragraphs alone.
  points: [],
  // The four trust badges the live page shows beside its closing form.
  badges: partnerHeroBadges,
  form: {
    // The live page's own form heading and sub-line.
    eyebrow: "Let’s Discuss Your Project",
    title: "Get free rough quote in 24 hrs",
    note: "Tell us what the app has to do and which Android versions and devices it has to reach, and we come back with an approach, timeline, and estimate. Everything stays under NDA.",
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "The app you have in mind, the Android versions and devices it must support, any systems it has to talk to, and whether this is a new build or an existing app.",
    subject: "Android App Development enquiry",
  },
  // Hand-placed asset — full-bleed behind the whole hero section, veiled for
  // contrast. See `Hero`'s `image` prop.
  image: {
    src: "/images/four/svc-mobile.webp",
    width: 2048,
    height: 944,
    alt: "An Android application under development, shown across phone and tablet screens",
  },
};

export const andOverview: OverviewContent = {
  eyebrow: "Android App Development Service",
  title: "Best Android App Development Service in India",
  paragraphs: [
    "Soft Suave provides native Android app development services that are secure and reliable.",
    "Soft Suave offer all-in-one app development services. We handle everything from concept to design, development, testing, and launch. Our team excels at creating custom Android applications for your unique needs and business goals.",
    "We are a leading Android mobile app development company in India with a global presence. We serve clients from various industries and provide the latest technologies. And best practices to deliver cutting-edge Android applications. We work with our clients, to understand their vision to exceed their expectations.",
    "If you’re seeking for an Android app development company, reach out to us for any queries. We look forward to creating Android apps that drive your business forward.",
  ],
};

/**
 * Six services, rendered as the board (landing/service-board.tsx): a grid of
 * six names you pick from, and one stage below it that opens the chosen one.
 * Every service here carries TWO paragraphs — about four thousand characters
 * across the six — so the copy comes off the cards entirely and the whole set
 * stays scannable in two rows instead of running down the page.
 */
export const andServices: ServiceBoardContent = {
  eyebrow: "Android Development Services",
  title: "Android Development Services Soft Suave Offers",
  body: "Soft Suave provides best-in-class Android app development services and advanced solutions. Our mobile app development team can provide you with expert support.",
  cta: { label: "Talk To Experts", href: "#enquiry" },
  items: [
    {
      name: "Custom Android App Development",
      paragraphs: [
        "We offer Android application development services in USA to help you create the app you need. we keep having meetings and have your feedback throughout the process to make sure it reaches your expected standards. Our experienced team of mobile app developers is dedicated to providing quality apps.",
        "We aim to satisfy and provide you with an app that is high quality. Building an app from scratch helps you with the preferences, features, and other aspects to make it possible. We offer Android app development services in the USA and India to help you create the app you need.",
      ],
      image: { src: "/images/four/svc-custom-software.webp", alt: "" },
    },
    {
      name: "Android App UX/UI Design",
      paragraphs: [
        "We understand the importance of a visually appealing and user-friendly interface for Android apps. our Android App UX/UI Design services focus on making your app easy to use and enjoyable for users.Our design experts ensure a smooth experience for anyone using your Android app, improving its overall appeal.",
        "Our team also has the latest technologies to develop an interactive and engaging interface for your Android app. We work with the latest design technologies to ensure the highest quality of your Android app. We can help you create an engaging design to fulfill your needs. We guarantee that your Android app will be successful with our UX/UI design services.",
      ],
      image: { src: "/images/landing/services/svc-consulting-discovery.webp", alt: "" },
    },
    {
      name: "Android App Consulting",
      paragraphs: [
        "Our Android App Consulting services assist you in starting your Android app development with expert guidance. Our team at Soft Suave provides insights and advice on the most effective strategies and technologies to use.",
        "We help you create a clear plan for your app’s success. We help you overcome technical challenges, and build your app to industry standards. Release it on time and within budget, ensuring top-quality results.",
      ],
      image: { src: "/images/landing/problems/analyst-research.webp", alt: "" },
    },
    {
      name: "Android App Support & Maintenance",
      paragraphs: [
        "Once your Android app is live, it needs regular maintenance and support to keep it in good condition. Soft Suave offers complete App development services to ensure your app remains bug-free. Compatible with the latest devices and OS versions. With our support, focus on growing your app while we take care of the technical factors. We provide regular updates, bug fixes, and security to keep the app on good terms.",
        "We guarantee that your app gets good performance and quality. We also provide analytics to track user engagement and identify areas for improvement. Finally, we offer custom solutions for each project to meet your unique requirements.",
      ],
      image: { src: "/images/landing/services/svc-support-optimisation.webp", alt: "" },
    },
    {
      name: "Android App Test Automation",
      paragraphs: [
        "At Soft Suave, we use Android App Test Automation. A cutting-edge technology that allows us to perform automated app tests efficiently. By using advanced tools and methods, we guarantee that our apps deliver high performance in the real world. we can fix the errors before it reach the customers and ruin the reputation.",
        "This helps provide our apps are always up-to-date and running smoothly. We use automation for our app testing process. It helps us to quickly identify and fix errors quickly. This helps the app run well and gives users a great experience.",
      ],
      image: { src: "/images/landing/services/svc-evaluation-llmops.webp", alt: "" },
    },
    {
      name: "Android App Modernization",
      paragraphs: [
        "If you already have an existing Android app that needs a fresh look or additional features, Soft Suave can help. Our team will update your app to meet current industry standards and exceed user expectations. We guarantee an up-to-date experience for your audience. We ensure your app performance and speed.",
        "Our team will make sure that the app gets to the latest version of Android and any new device needs. We review the app for any bugs or glitches to make sure that it is secure and reliable. We can work with you to ensure, your app meets the latest industry standards and customer expectations.",
      ],
      image: { src: "/images/four/svc-modernization.webp", alt: "" },
    },
  ],
};

/** The coral band the live page runs between the services and the stack. */
export const andHireCta: CtaBandContent = {
  title: "Want to hire an offshore Android app development team?",
  body: "Soft Suave has a pool of certified and experienced Android App Developers who deliver your app development project on time and under your budget.",
  cta: { label: "Hire Android Developer", href: "#enquiry" },
};

/**
 * The four technology tiers, rendered as the assembled stack
 * (landing/stack-layers.tsx). The live page groups these eight technologies
 * under Frontend / Platforms / Tools / Database and gives each one a real
 * description — so it is drawn as what it is called: a stack, built from the
 * database up.
 */
export const andStack: StackLayersContent = {
  eyebrow: "Some Modern & Futuristic Technologies",
  title: "List of Some Modern & Futuristic Technologies We Use",
  body: "To offer start-to-end mobile app development services, our Android professionals at our mobile app development company use the following state-of-the-art technologies",
  layers: [
    {
      name: "Frontend",
      items: [
        {
          name: "Kotlin",
          body: "Kotlin is a modern statically typed programming language that our Android developers adopt to boost productivity and code safety when developing an App.",
        },
        {
          name: "Java",
          body: "Java is the popular technology that can build applications using managed code that can be executed on mobile devices. Our extensive experience working with Java assists us to get most of its libraries, tools, and APIs.",
        },
        {
          name: "XML",
          body: "We have a dedicated team that utilizes this markup language to create layout files. Also, XML is a lightweight language that is simple yet scalable. Hence, it doesn’t make the layout heavy.",
        },
      ],
    },
    {
      name: "Platforms",
      items: [
        {
          name: "AWS",
          body: "AWS is a remarkable development platform that renders an end-to-end solution to develop, deliver, test, and monitor applications. Our software engineers utilize its broad set of tools and services to support workflows.",
        },
        {
          name: "Azure",
          body: "Being a public cloud computing platform, Azure provides authentication, data query, offline synchronization, and push registration capabilities while developing mobile Apps using resources in the Azure cloud.",
        },
        {
          name: "GoogleCloud",
          body: "To help startups and SMBs, we implement Google Cloud Platform to get the benefits of Cost-efficiency, Exemplary safety, and Fast deployment while we create mobile Apps. Also, Google Cloud is one of the most versatile and affordable Cloud platforms out there.",
        },
      ],
    },
    {
      name: "Tools",
      items: [
        {
          name: "Android Studio",
          body: "Being one of the most popular Android App development platforms, Android Studio’s flexibility and reliability are very high. This makes it a stable IDE. With its help, we easily accelerate development progress.",
        },
      ],
    },
    {
      name: "Database",
      items: [
        {
          name: "SQLite",
          body: "Expert Android App developers at Soft Suave use SQLite which is an open-source database to add, update, read, delete data. Also, SQLite supports all the relational database features.",
        },
      ],
    },
  ],
};

export const andFaqs: FaqContent = {
  eyebrow: "Questions",
  title: "Frequently Asked Questions",
  body: "Know more about our processes and how we work, with the help of the following FAQs.",
  items: [
    {
      q: "What does Android app development process involves?",
      a: "The Android app development process involves several steps to create a mobile application for the Android OS. The process typically includes requirements gathering, designing the user interface, programming and development, testing, and deployment.",
    },
    {
      q: "Which is best platform to develop an Android app?",
      a: "There are many popular platforms are there to develop an android app. Each have its own advantages from devloped to delivered. Here are the most effecient android app devlopment platforms. Android Studio, Flutter, Xamarin, PhoneGap, Unity",
    },
    {
      q: "How long does it take to develop an app for Android?",
      a: "The time it takes to develop an android app is based on the requirement of the app and its additional features. The clone apps usually takes less time than custom apps. The other factors are designs, testing ect. If you want to know the approximate development time, you can reachout to our experts and get details you want.",
    },
    {
      q: "What is the difference between Android development and app development?",
      a: "App develolopment basically involves in any application development with different OS, Platforms and devices based on the requirement. Whereas Android development involves the development process for the Android OS devices.",
    },
    {
      q: "What is the cost of developing an Android app?",
      a: [
        "The cost of Android app development varies based on the app’s needs. If you’re looking for budget-friendly options, you can consider using clone apps.",
        "If you need an app that represents your business or a unique gaming app, the budget will depend on various factors. To assess before development, consult our experts who can provide a budget plan for your app development.",
      ],
    },
  ],
};
