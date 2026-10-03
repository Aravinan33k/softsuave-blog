/**
 * Copy for the "Legacy Modernization Services" landing page
 * (`/legacy-modernization-services`).
 *
 * SOURCE: the live softsuave.com page of the same slug. The review asked for
 * the page to follow it ("lot of sections have changed including the title,
 * description, canonicals, and schemas"), so the live page IS the spec: its
 * <title> and meta description, its hero copy, and — below the hero — its
 * section set, in its order, in its words. The mapping:
 *
 *   H1 + 2 paragraphs + "Get Your FREE Quote Now!" form → `legacyHero`
 *   "Top Legacy Application Modernization Company in India" → `legacyTopCompany`
 *   "Soft Suave in Legacy Modernization Services"          → `legacyAbout`
 *   "Our Legacy Modernization Services" (4)                → `legacyServices`
 *   "Book Free Consultation" closing form                  → homepage `Contact`
 *
 * The live page is an older, thinner template: no process, industries,
 * technologies, testimonials or FAQs. None is invented to fill it out.
 *
 * The live copy's own slips are carried as they are rather than silently
 * rewritten — "Soft suave Legacy moderation service", "Soft Suave’ legacy",
 * "into Futuristic one", "new feature faster", "your currents applications",
 * "without any disturbing your business", and the re-architecture service
 * closing on the re-hosting service's "re-host journey" paragraph. Fixing any
 * of them is a copy decision for whoever owns the page.
 *
 * Images: the live page's own illustrations are not in this app, so the hero
 * keeps its photograph and the "Soft Suave in …" section reuses the one this
 * module already carried; the service board runs without per-service art.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServiceBoardContent } from "@/components/common/service-board";
import { sharedHeroAlert, sharedHeroBadges } from "./delivery-shared";
import { overviewImage } from "./overview-images";

export const legacyMeta = {
  slug: "legacy-modernization-services",
  path: "/legacy-modernization-services",
  // The live page's <title> and meta description, verbatim.
  title: "Legacy Application Modernization Services - Soft Suave",
  description:
    "Enhance your business with legacy application modernization services. We help upgrade outdated systems to modern and efficient solutions.",
} as const;

export const legacyHero: HeroContent = {
  // The live H1, split so the accent falls on its closing phrase.
  titleLines: ["Legacy Modernization Services", "for Impeccable Results"],
  body: [
    "Soft Suave is the best in legacy application modernization services to revamp your existing apps into futuristic apps.",
    "Interested? Request a free 1-week trial now and we promise to get back within 3 business hours!",
  ],
  points: [],
  badges: sharedHeroBadges,
  form: {
    eyebrow: "Business Enquiry",
    // The live hero form's own heading.
    title: "Get Your FREE Quote Now!",
    // An H2 on the live page, so part of the outline here too.
    titleAs: "h2",
    submit: "Send requirements",
    sending: "Opening your mail…",
    requirementLabel: "What system needs modernizing?",
    requirementPlaceholder:
      "The application and its stack, roughly how old it is, what is driving the change, and which workflows cannot be interrupted.",
    subject: "Legacy modernization enquiry",
    alert: sharedHeroAlert,
  },
  image: {
    src: "/images/four/svc-modernization.webp",
    width: 1200,
    height: 860,
    alt: "Engineers re-architecting a legacy enterprise system onto modern cloud infrastructure",
  },
};

/**
 * The live section's intro, then its two sub-blocks' prose in order —
 * "Legacy Application Migration & Optimization" (two paragraphs) and "A legacy
 * system is modernized for" (one paragraph and the three-item list, which is
 * `points`).
 */
export const legacyTopCompany: OverviewContent = {
  // Live runs this section without art; the pipeline photo fills what would
  // otherwise be an empty right half of the band.
  image: overviewImage("legacy-modernization-services"),
  eyebrow: "Overview",
  title: "Top Legacy Application Modernization Company in India",
  paragraphs: [
    "Soft Suave is one of the best application modernization services company in India that provides modernization services that help companies cut down excessive operating costs.",
    "Wild adoption of digital platforms such as Android, iPhone, Facebook, Twitter, analytics, cloud, artificial intelligence, and the Internet of Things (IoT) have made the marketplace competitive. To bridge the gap between the current capability and client expectations, companies need to reconsider their business models, making them digital-ready. Legacy app modernization service is the best way to address the gap. It is therefore crucial for companies to modernize their legacy systems, by embracing advanced technologies. Companies are making vast investments to update their legacy systems, aiming to lower costs, improving time-to-market, and adopting cutting-edge technologies to fulfill customer and market demands.",
    "In the absence of adequate planning, and when the age and complexity of legacy systems are underrated, there is a significant risk of failure linked with system modernization. With our experience, we have performed several successful legacy modernization programs by leveraging latest technologies for constant upgrades and revisions to existing systems.",
    "Our remote developers in India overlap time zones to work efficiently without any communication hassles or time gaps and make clients feel in-house throughout the project.",
  ],
  points: [
    "Reducing costs since hardware and software of older systems are expensive to maintain.",
    "Simplifying the system as old systems are complex and inflexible.",
    "Developing sophisticated software applications to succeed in business.",
  ],
};

export const legacyAbout: OverviewContent = {
  eyebrow: "Why Soft Suave",
  title: "Soft Suave in Legacy Modernization Services",
  paragraphs: [
    "Soft suave Legacy moderation service updates your old complex and expensive technology into flexible and cost effective advanced technology to satisfy customer needs and achieve market goals.",
    "Soft Suave abides by competent processes and methodologies to upgrade legacy applications and make them convenient enough to be used in sync with latest technologies. Soft Suave’ legacy app modernization services mainly focus on business requirements first and then on the modernization process.",
    "Eventually, we embrace values from existing applications and modernize to newer applications while reducing costs, limiting disruptions and decreasing risk. The outcome transforms legacy applications to achieve high performance.",
    "With Soft Suave’s top application modernization services, a detailed investigation of your applications is done to the most elementary level. Through our understanding, the experts will deliver you a complete report about your applications - including our recommendations specifying which application to re-code, renew, replace, retire, re-platform, re-engineer, and re-architect. With this, you can lower your costs and release resources.",
  ],
  image: {
    src: "/images/four/work-6.webp",
    width: 800,
    height: 1000,
    alt: "Best application modernization services company Soft Suave",
  },
};

/**
 * The live section's four services, in its order, each with every paragraph
 * the live page gives it. The live section also lists the four names as
 * bullets under its intro; the board's own selector is that list, so it is not
 * repeated.
 */
export const legacyServices: ServiceBoardContent = {
  eyebrow: "Core Services",
  title: "Our Legacy Modernization Services",
  body: "Using Soft Suave’s legacy modernization services, organizations can transform their age-old traditional applications into Futuristic one.",
  items: [
    {
      name: "Application Re-hosting",
      image: { src: "/images/landing/lm-svc-rehosting.webp", alt: "Server racks in a data center during an application migration" },
      paragraphs: [
        "Your enterprise applications support your business. But it so happens that most of the times they’re locked away within a complex IT infrastructure, and if your applications are stuck on outdated architectures, it will lack flexibility and you cannot build for the future.",
        "Re-hosting or application migration represents safe and cost-effective modernization. It is the key to explore the value of your core business systems, lowering your total cost of ownership and delivering applications with new feature faster.",
        "Soft Suave is the industry leader in application re-hosting. Our expertise in delivering fast, easy, and cost-effective application modernization, supported by high-quality, proven technology, is incomparable. This re-hosting solution has helped many clients in USA, Europe, Canada and Australia.",
        "We can assist you with every phase of your re-host journey. Join us to re-host and refresh your application architecture to build for the future.",
      ],
    },
    {
      name: "Application Re-architecture",
      image: { src: "/images/landing/lm-svc-rearchitecture.webp", alt: "Software architect sketching a system design on a whiteboard" },
      paragraphs: [
        "Organizations have those tailor-made applications running on legacy systems, after implementing application modernization and cutting-edge technologies, you will improve your competitive advantage in the market while reducing functional costs and IT intricacy.",
        "Being the best application modernization services company, Soft Suave’s application re-architecting is an established procedure to guard your business logic and application assets during conversion to a modern architecture. Our patented IP manages all project phases like data migration, code generation, design and analysis of current, and new application states.",
        "If your company lacks in business agility and increases the backlog of requests, application re-architecture can transform things to a great extent. Enjoy the benefit of having an agile architecture that permit your business to grow continuously, adapt quickly, and respond whenever there is a business demand like cloud computing, virtualization and mobile deployment.",
        // Live repeats the re-hosting service's closing line here, verbatim.
        "We can assist you with every phase of your re-host journey. Join us to re-host and refresh your application architecture to build for the future.",
      ],
    },
    {
      name: "Application Modernization",
      image: { src: "/images/landing/lm-svc-modernization.webp", alt: "Developer updating application code on modern monitors" },
      paragraphs: [
        "Your company has invested a great deal of time and energy in developing several applications to meet your specific business needs. With the Soft Suave’s Legacy Application Modernization service, you can take that additional step to enhance durability, usability, functionality, and availability.",
        "Whatever challenge you have faced for undertaking a mainframe modernization project, Soft Suave has the skills and experience to guide you on your journey by giving you the right suggestions. Together with our expert partners, we provide a complete range of business and technology requirements. Starting from initial discussions to modernization delivery, we provide constant support during the migration. Soft Suave combines a best-in-class modernization service with global delivery.",
        "We guarantee that your currents applications meet the ever-changing business demands by improved user experience, workflows, and integration of all systems. Our goal is to assist you in growing and making a profit out of your existing application without any disturbing your business.",
      ],
    },
    {
      name: "Strategic Modernization Roadmap",
      image: { src: "/images/landing/lm-svc-roadmap.webp", alt: "Team mapping a modernization roadmap with sticky notes" },
      paragraphs: [
        "Legacy systems are bulky, complex and expensive to maintain and Modernized platforms equip your applications better for flexible and cost-effective growth.",
        "Your modernization journey needs to have a clear start and also require an understanding of the end goal. Soft Suave’s Strategic Modernization Roadmap services allow you to evaluate your existing state, your needs, and your end result through the implementation of a transformation roadmap.",
        "Our strategic modernization approach includes 3 phases: discovery, analysis and planning. Understanding the applications, databases and processes that run in your data center now and mapping out a modernization strategy for the future.",
      ],
    },
  ],
};
