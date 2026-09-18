/**
 * Copy for the "Mobile App Development" landing page
 * (`/mobile-application-development-company`).
 *
 * Every heading, paragraph and list item below is the live page's own copy,
 * extracted verbatim from
 * https://www.softsuave.com/mobile-application-development-company — the design
 * and the motion are this surface's, the words are not ours to reword.
 *
 * The `eyebrow` kickers are the live page's own too — it sets them in a coral
 * script face (`span.style-font`): "Our Clients", "Services", "Tech Stack",
 * "Why Choose Us", "Industries", "Method", "Testimonials". The two exceptions
 * are Process and FAQs, which carry no kicker there; this surface's
 * `SectionHead` is built around one, so those two are ours.
 *
 * Shapes match the prop types exported by the shared landing sections in
 * `components/landing/*` and `components/common/*`, so each
 * section is `<Component content={…} />` with no adapter in between. Kept out
 * of `content.ts` because that file is the homepage's source and is imported by
 * Nav, Footer and every homepage section.
 *
 * The clients band, case studies, testimonials and closing CTA are the
 * homepage's own sections rendered verbatim (see the route) — the live page's
 * clients band carries the identical heading, so it is the same section.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { ServiceSlatsContent } from "@/components/mobile-app/service-slats";
import type { PlatformTabsContent } from "@/components/mobile-app/platform-tabs";
import type { ReleaseTrackContent } from "@/components/mobile-app/release-track";
import type { CardGridContent } from "@/components/landing/industries";
import type { EngagementContent } from "@/components/common/engagement-models";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { FaqContent } from "@/components/landing/faq";

export const madMeta = {
  slug: "mobile-application-development-company",
  path: "/mobile-application-development-company",
  // The live page's own <title> and meta description. The route appends
  // " | Soft Suave" to the title, as every page on this surface does.
  title: "Mobile App Development Company in India",
  description:
    "Soft Suave is a top mobile app development company in India, building scalable Android, iOS, and cross-platform apps for global clients.",
} as const;

export const madHero: HeroContent = {
  eyebrow: "Mobile App Development",
  // The H1, split so the last line takes the coral accent.
  titleLines: ["Mobile App Development", "Company in India"],
  body: [
    "With 13+ years of expertise, Soft Suave Technologies is a powerhouse in mobile app development. We create high-performance Android, iOS, and cross-platform apps for global clients across the US, EU, and MEA regions, delivering unbeatable quality and exceptional offshore advantages.",
  ],
  points: [
    "Custom Native & Cross-Platform Apps",
    "UX-First Design Approach",
    "Fast Time-to-Market",
    "60% Cost Savings vs Local Teams",
    "Strong Post-Launch Support",
  ],
  // Trust badges carried over from the older service landing pages — the live
  // page carries the same four as image badges beside its closing form.
  badges: ["Upwork Top Rated", "Clutch verified", "Microsoft Silver Partner", "AWS Partner"],
  form: {
    // The live page's own form heading and sub-line.
    eyebrow: "Let’s Discuss Your Project",
    title: "Get free rough quote in 24 hrs",
    note: "Tell us what you want to build and which platforms it has to run on, and we come back with an approach, timeline, and estimate. Everything stays under NDA.",
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "The app you have in mind, the platforms it needs to run on, any systems it must integrate with, and where you are today — idea, designs, or an existing app.",
    subject: "Mobile App Development enquiry",
  },
  // Hand-placed asset — full-bleed behind the whole hero section, veiled for
  // contrast. See `Hero`'s `image` prop.
  image: {
    src: "/images/four/svc-mobile.webp",
    width: 2048,
    height: 944,
    alt: "A mobile application under development, shown across phone and tablet screens",
  },
};

/**
 * Seven services, rendered as slats (landing/service-slats.tsx): all seven
 * standing side by side with the open one widened. The section's argument is
 * "full-spectrum", so the whole spectrum stays on screen rather than one
 * service at a time. Images are decorative (each slat names its service in
 * text), so `alt` is empty.
 */
export const madServices: ServiceSlatsContent = {
  eyebrow: "Services",
  title: "Mobile App Development Services We Offer",
  body: "From concept to launch and ongoing maintenance, we offer full-spectrum mobile app development services to bring your ideas to life, ensuring scalability, performance, and seamless user experiences every step of the way.",
  cta: { label: "Talk to Our Experts →", href: "#enquiry" },
  items: [
    {
      name: "Custom Mobile App Development",
      body: "End-to-end development of custom apps for startups and SMBs, covering discovery, UX, development, testing, and launch with seamless execution throughout.",
      image: { src: "/images/four/svc-custom-software.webp", alt: "" },
    },
    {
      name: "Native Android & iOS App Development",
      body: "Dedicated teams for native Android (Kotlin/Java) and iOS (Swift) apps, delivering optimal performance, complex UX, and full device integration.",
      image: { src: "/images/four/svc-mobile.webp", alt: "" },
    },
    {
      name: "Cross-Platform & Hybrid App Development",
      body: "Build once, deploy everywhere. We use Flutter, React Native, Ionic, and Xamarin to deliver budget-friendly, fast, cross-platform apps.",
      image: { src: "/images/four/svc-web.webp", alt: "" },
    },
    {
      name: "UI/UX Design for Mobile Apps",
      body: "Crafting user-centric wireframes, prototypes, and visual designs that drive conversions and ensure accessibility and seamless experiences across all devices.",
      image: { src: "/images/landing/services/svc-consulting-discovery.webp", alt: "" },
    },
    {
      name: "Mobile App Modernization & Migration",
      body: "Upgrade legacy apps, tune performance, and migrate across stacks, whether from hybrid to native or optimizing OS/SDK versions.",
      image: { src: "/images/four/svc-modernization.webp", alt: "" },
    },
    {
      name: "Mobile App Maintenance & Support",
      body: "Continuous updates, bug fixes, OS compatibility, feature enhancements, and SLA-based support for long-term app success and reliability.",
      image: { src: "/images/landing/services/svc-support-optimisation.webp", alt: "" },
    },
    {
      name: "Mobile App QA & Testing Services",
      body: "Thorough functional, performance, security, and regression testing across devices and OS versions, using manual and automated methods for flawless app quality.",
      image: { src: "/images/landing/services/svc-evaluation-llmops.webp", alt: "" },
    },
  ],
};

/**
 * Four platform stacks, rendered as the chooser (landing/platform-tabs.tsx).
 * The section's own copy opens "Choose the right technology based on your
 * product goals", so it is built as a chooser rather than four equal panels.
 *
 * `tools` are the technologies already named in each stack's own sentence,
 * pulled out as chips — the chips add no copy, they surface what the prose
 * beside them already says.
 */
export const madPlatforms: PlatformTabsContent = {
  eyebrow: "Tech Stack",
  title: "Mobile Platforms & Technologies We Work With",
  body: "Choose the right technology based on your product goals. We work with a variety of platforms, ensuring optimal performance, scalability, and seamless integration across Android, iOS, and cross-platform solutions.",
  items: [
    {
      name: "Android App Development Stack",
      short: "Android",
      body: "Kotlin, Java, Android Studio, Jetpack, and Firebase for building consumer apps, enterprise mobility, and field apps with seamless performance.",
      tools: ["Kotlin", "Java", "Android Studio", "Jetpack", "Firebase"],
    },
    {
      name: "iOS App Development Stack",
      short: "iOS",
      body: "Swift, SwiftUI, Xcode, and iOS SDKs to deliver secure, polished apps for iPhone, iPad, and the Apple ecosystem.",
      tools: ["Swift", "SwiftUI", "Xcode", "iOS SDKs"],
    },
    {
      name: "Cross-Platform Frameworks",
      short: "Cross-platform",
      body: "Flutter, React Native, Ionic, and Xamarin for faster go-live, single codebase, and near-native performance across Android and iOS.",
      tools: ["Flutter", "React Native", "Ionic", "Xamarin"],
    },
    {
      name: "Backend, APIs & Cloud",
      short: "Backend & cloud",
      body: "Powerful backends with Node.js, .NET, Java, PHP, and Python, REST/GraphQL APIs, cloud hosting (AWS/Azure/GCP), databases, push notifications, and secure authentication.",
      // "AWS/Azure/GCP" and "REST/GraphQL", exactly as the sentence names
      // them — not the expanded product names, which it does not use.
      tools: ["Node.js", ".NET", "Java", "PHP", "Python", "REST", "GraphQL", "AWS", "Azure", "GCP"],
    },
  ],
};

/**
 * Six phases, rendered as the release track (landing/release-track.tsx): one
 * horizontal rail that draws left to right with the stations alternating above
 * and below it. A shipping schedule is a line, and this one is the run-up to a
 * store release.
 */
export const madProcess: ReleaseTrackContent = {
  eyebrow: "Process",
  title: "Our Mobile App Development Process",
  body: "We follow a clear, transparent, agile process from idea to launch, reducing risks and ensuring predictable delivery for high-quality, scalable mobile apps that meet your business goals.",
  cta: { label: "Book a Consultation", href: "#enquiry" },
  steps: [
    {
      n: "01",
      name: "Product Discovery & Strategy",
      body: "Workshops to align business goals, define target users, prioritize features, and analyze competitors, ensuring a solid foundation for success.",
    },
    {
      n: "02",
      name: "UX/UI Design & Prototyping",
      body: "Create user flows, wireframes, and high-fidelity prototypes, validating design choices with early feedback to ensure a seamless user experience.",
    },
    {
      n: "03",
      name: "Agile Development & Iterations",
      body: "Sprint-based development for both frontend and backend, with regular demos and quick feedback cycles for continuous improvement.",
    },
    {
      n: "04",
      name: "QA, Security & Performance Testing",
      body: "Thorough multi-device testing, performance optimization, and security best practices to ensure reliable, secure, and fast app performance.",
    },
    {
      n: "05",
      name: "App Store Deployment & Go-Live",
      body: "End-to-end submission to Play Store and App Store, ensuring guidelines compliance, smooth release management, and hassle-free go-live.",
    },
    {
      n: "06",
      name: "Post-Launch Support & Continuous Improvement",
      body: "Ongoing monitoring, bug fixes, enhancements, and data-driven iterations to ensure your app evolves and stays optimized.",
    },
  ],
};

export const madWhyUs: CardGridContent = {
  eyebrow: "Why Choose Us",
  title: "Why Choose Soft Suave as Your Mobile App Development Company in India?",
  body: "At Soft Suave, we’re more than just coders; we’re partners dedicated to delivering impactful product outcomes and long-term value, ensuring your app’s success every step of the way.",
  items: [
    {
      name: "13+ Years of Mobile App Development Experience",
      body: "With 13+ years of experience, we’ve built numerous apps for clients across the USA, Europe, and the Middle East in diverse industries.",
    },
    {
      name: "India-Based Team with Global Delivery Standards",
      body: "Our English-speaking, India-based team delivers global standards, offering flexible time-zone overlap and proven success in serving clients worldwide.",
    },
    {
      name: "Flexible Engagement Models for Startups & SMBs",
      body: "Choose dedicated teams for startups, full-time developers for ISVs, and project or hybrid models for SMBs needing flexibility and predictable delivery.",
    },
    {
      name: "Transparent Pricing & On-Time Delivery",
      body: "Enjoy clear and upfront pricing with milestone-based delivery and predictable timelines, ensuring no hidden fees and on-time results.",
    },
    {
      name: "Proven Success with Global Clients",
      body: "Trusted by leading global brands, we’ve delivered apps that drive millions of downloads, high ratings, and significant revenue growth.",
    },
  ],
};

/** Nine sectors, so the card grid runs three across and fills three rows exactly. */
export const madIndustries: CardGridContent = {
  eyebrow: "Industries",
  title: "Industries We Support",
  body: "We tackle the unique challenges of each vertical, offering tailored solutions that drive innovation, efficiency, and growth across diverse industries, ensuring your business stays ahead of the competition.",
  items: [
    {
      name: "On-Demand & Marketplace Apps",
      body: "Scalable food delivery, ride-hailing, and service booking apps with real-time tracking and seamless user experiences for instant access.",
    },
    {
      name: "FinTech & Banking Apps",
      body: "Secure mobile banking, wallets, and payments with robust compliance, high-level security, and smooth, user-friendly interfaces for financial transactions.",
    },
    {
      name: "Healthcare & HealthTech Apps",
      body: "Appointment booking, teleconsultation, e-prescriptions, and wellness tracking apps focused on data protection and enhanced healthcare services.",
    },
    {
      name: "Construction",
      body: "Creating construction management apps for project tracking, resource allocation, scheduling, and team collaboration, enhancing project efficiency and timely delivery.",
    },
    {
      name: "E-Commerce & Retail Apps",
      body: "Create shopping apps with features like catalogs, wishlists, payments, loyalty programs, and omnichannel integration for seamless customer experiences.",
    },
    {
      name: "Telecom",
      body: "Developing mobile apps that streamline communication services, improve customer engagement, manage accounts, and deliver seamless telecom experiences.",
    },
    {
      name: "Logistics",
      body: "Designing apps that optimize supply chain management, fleet tracking, inventory control, and real-time delivery updates, enhancing operational efficiency.",
    },
    {
      name: "Aviation",
      body: "Designing apps for airlines and travel agencies that offer real-time flight tracking, booking management, and personalized passenger experiences.",
    },
    {
      name: "EdTech, Media & Other Industries",
      body: "Flexible apps for online learning, OTT streaming, and internal enterprise needs, adaptable across various verticals for tailored solutions.",
    },
  ],
};

/**
 * Four engagement models, rendered by common/engagement-models.tsx — four
 * cards that trace their own border on hover, with the section's closing
 * paragraph and its CTA beneath them, as they sit on the live page.
 */
export const madEngagement: EngagementContent = {
  eyebrow: "Method",
  title: "Engagement Models to Work with Our Mobile App Development Company in India",
  body: "Choose the engagement model that aligns with your project’s stage, budget, and requirements. Whether you’re a startup or an SMB, we offer flexible models to deliver tailored solutions that drive success.",
  items: [
    {
      name: "Dedicated Remote Mobile App Team",
      body: "A long-term pod (PM, designers, devs, QA) acts as an extension of your team, ideal for product companies seeking consistent collaboration and expertise.",
    },
    {
      name: "Hire Dedicated Mobile App Developers in India",
      body: "Easily hire developers to seamlessly join your team, with flexible ramp-up and expertise in Android, iOS, Flutter, and React Native",
    },
    {
      name: "Fixed-Price Mobile App Projects",
      body: "For well-defined projects with clear scopes, we deliver on time, within budget, with milestone-based payments, ensuring cost and time commitments are met.",
    },
    {
      name: "Time & Material / Agile Partnership",
      body: "Ideal for evolving projects with changing requirements, this model allows you to pay for actual time worked, perfect for discovery-heavy or innovation-driven products.",
    },
  ],
};

/**
 * The dark band that closes the engagement section on the live page: its own
 * title, its own paragraph, its own button. Rendered as a CTA band rather than
 * a footnote under the grid, which is what it is there.
 */
export const madHireCta: CtaBandContent = {
  title: "Turn Ideas into Impact with India’s Leading Mobile App Experts",
  body: "Whether you’re a startup or an SMB, we help bring your mobile app ideas to life with innovative solutions, ensuring seamless performance, scalability, and user-centric experiences every step of the way.",
  cta: { label: "Hire Mobile App Developer →", href: "#enquiry" },
};

export const madFaqs: FaqContent = {
  eyebrow: "FAQs",
  title: "FAQs About Mobile App Development Companies in India",
  body: "Answers to the most common questions founders, product leaders, and CTOs ask before choosing a mobile app development company in India.",
  items: [
    {
      q: "How much does it cost to build a mobile app with a company in India?",
      a: "The cost varies based on scope, platform (Android/iOS/both), whether it’s native or cross-platform, and complexity (features, integrations). Engagement models also influence pricing, with fixed-price and time-based models offering different cost structures.",
    },
    {
      q: "How long does it take to develop a mobile app from idea to launch?",
      a: "The development timeline depends on app complexity, features, design, integrations, and revisions. MVPs require fewer resources, while full-featured apps need more planning and iterative development.",
    },
    {
      q: "Should I go for native or cross-platform app development?",
      a: "Native apps offer better performance, device integration, and complex UX. Cross-platform options like Flutter/React Native are faster, cost-effective, and great for simpler apps or when a quick time-to-market is essential.",
    },
    {
      q: "How do you ensure app quality across different devices and OS versions?",
      a: "We use a comprehensive device lab, test suites, automation tools, beta testing, and performance profiling to ensure your app performs flawlessly across all devices and OS versions.",
    },
    {
      q: "What does the engagement process look like with your India-based mobile app team?",
      a: "The global market size of Our process follows discovery, design, development, testing, and launch phases. We use tools like Slack, Jira, and Zoom for seamless communication, with time-zone overlap ensuring efficient collaboration.",
    },
    {
      q: "Can you integrate the mobile app with our existing systems and APIs?",
      a: "Yes, we can integrate with various systems, including ERPs, CRMs, payment gateways, and third-party APIs to ensure your app works seamlessly with your existing infrastructure.",
    },
    {
      q: "Do you provide post-launch support and app maintenance?",
      a: "We offer comprehensive post-launch support, including bug fixes, enhancements, and regular updates, with SLA-based agreements to ensure timely service and app improvements.",
    },
    {
      q: "How do I choose the right mobile app development company in India?",
      a: "Consider factors like portfolio, domain expertise, communication skills, pricing transparency, and references. Soft Suave excels in all these areas, delivering top-tier mobile app development services with proven success.",
    },
  ],
};
