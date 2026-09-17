/**
 * Copy for the "Software Development Company" landing page
 * (`/software-development-company`).
 *
 * Every heading, paragraph and list item below is the live page's own copy,
 * extracted verbatim from
 * https://www.softsuave.com/software-development-company with the Playwright
 * MCP browser — the rendered DOM, read block by block, so a sentence broken
 * across its own `<b>`/`<a>` markup arrives whole. The design and the motion
 * are this surface's; the words are not ours to reword, and the live page's own
 * spellings are kept, including "Cross platform App development Company"
 * unhyphenated and the zero-width space in its EHR heading, which is stripped
 * here only because it would be invisible breakage rather than copy.
 *
 * The section `eyebrow` kickers are the live page's own too — it sets them
 * above each H2 (`span.text-primary`, and `span.style-font` for the FAQs).
 *
 * Shapes match the prop types exported by the shared landing sections in
 * `components/landing/*` and `components/common/*`, so each section is
 * `<Component content={…} />` with no adapter in between.
 *
 * Two bands are the homepage's own sections rendered verbatim (see the route)
 * rather than copies here, because the live page's copy for them IS the
 * homepage's, to the word: the clients band ("Preferred AI-Enabled Technology
 * Partner for Startups and SMBs") and the testimonials band ("What Our Clients
 * Say About Us").
 *
 * The live page has no mid-page CTA band and no case studies, so neither is
 * emitted. Its closing enquiry block is the homepage's `Contact`.
 *
 * Images: hand-placed under `public/images/landing/software-development/`, the
 * convention for landing-page art. All seven are free-licence Pexels
 * photographs cropped to each slot; ids, source URLs and blur placeholders are
 * recorded in that folder's `credits.json`.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesCarouselContent } from "@/components/common/services-carousel";
import type { JourneyContent } from "@/components/home/journey";
import type { CardGridContent } from "@/components/landing/industries";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { FaqContent } from "@/components/landing/faq";

export const sdMeta = {
  slug: "software-development-company",
  path: "/software-development-company",
  /**
   * The live page's `<title>` is "Software development company in india - Soft
   * Suave". The route appends " | Soft Suave" as every page on this surface
   * does, so the brand is dropped here rather than shipped twice; the sentence
   * case is corrected because a `<title>` is a label, not body copy.
   */
  title: "Software Development Company in India",
  description:
    "Software development company in India offering custom solutions backed by a client-focused engagement model for every project. Contact Now!",
} as const;

export const sdHero: HeroContent = {
  eyebrow: "Software Development",
  // The H1, split so the last line takes the coral accent.
  titleLines: ["Software Development", "Company"],
  body: [
    "Unleash creativity and power up your enterprise with Soft Suave, a leading software development company. Ramp up your project with cutting-edge technology and unmatched expertise.",
  ],
  // The three claims the live hero prints beside its headline.
  points: [
    "400+ AI-powered experts",
    "Risk-free 40-hour trial",
    "Agile methodology for rapid results",
  ],
  // The four trust badges this surface shows beside every enquiry form.
  badges: ["Upwork Top Rated", "Clutch verified", "Microsoft Silver Partner", "AWS Partner"],
  form: {
    // The live page's own form heading and sub-line.
    eyebrow: "Let’s Discuss Your Project",
    title: "Get free rough quote in 24 hrs",
    note: "Tell us what you want built and which systems it has to work with, and we come back with an approach, timeline, and estimate. Everything stays under NDA.",
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "The product or system you have in mind, who uses it, anything it has to integrate with, and whether this is a new build, a rescue, or a modernisation.",
    subject: "Software Development enquiry",
  },
  image: {
    src: "/images/landing/software-development/hero.webp",
    width: 1920,
    height: 1080,
    alt: "A software team at work together in an open studio",
    blurDataURL:
      "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAADwAQCdASoQAAkAA4BaJZwCdACmLwWj1QAA/D+GGf8DNfR86+8UEyiXvBkCuoJjDc/rpoMx7a4k95154Wcdvzefl3jWnd+qOF3EmMf+pDCd+SMPLUD3zlYe01zAAA==",
  },
};

/**
 * Six services, one paragraph each. Short enough for cards, so they run as the
 * centre-focused carousel rather than the service board the app-framework pages
 * use for their two-paragraph copy.
 */
export const sdServices: ServicesCarouselContent = {
  eyebrow: "Our Services",
  title: "Our Software Development Services",
  body: "Experience unparalleled quality with Soft Suave. Our expert team of 400+ developers is ready to transform your ideas into custom software solutions using cutting-edge technology.",
  items: [
    {
      name: "Mobile App Development Service",
      body: "Soft Suave builds high-performance mobile apps that blend intuitive design with powerful functionality. We deliver custom Android, iOS, and cross-platform solutions that drive user engagement and align with your business goals—powered by agile, fast-paced development.",
      image: {
        src: "/images/landing/software-development/svc-mobile.webp",
        alt: "A smartphone showing a finished mobile interface",
      },
    },
    {
      name: "Web App Development Service",
      body: "Transform your ideas into seamless web experiences with our expert development services. We craft responsive, intuitive, and innovative web apps that enhance your business and drive lasting success.",
      image: {
        src: "/images/landing/software-development/svc-web.webp",
        alt: "A web project in progress across multiple monitors and a laptop",
      },
    },
    {
      name: "Cross platform App development Company",
      body: "Unlock your app’s potential with our cross-platform development and reach the broadest audience possible. Whether you want to dominate multiple platforms or operating systems, with us, your project is in expert hands.",
      image: {
        src: "/images/landing/software-development/svc-crossplatform.webp",
        alt: "Hands working on a tablet interface, one build serving every screen",
      },
    },
    {
      name: "Software Development Service",
      body: "Empower your digital vision with Soft Suave’s custom software development. From scalable web apps to intelligent systems, we deliver high-performance, secure, and future-ready solutions that drive business transformation.",
      image: {
        src: "/images/landing/software-development/svc-software.webp",
        alt: "Two engineers building a custom system on large monitors",
      },
    },
    {
      name: "AI Development Service",
      body: "Soft Suave builds intelligent AI solutions for businesses. Our AI models enhance automation, decision-making, and digital transformation. We develop custom AI applications tailored to industry-specific needs.",
      image: {
        src: "/images/landing/software-development/svc-ai.webp",
        alt: "A robotic hand reaching into a network of connected nodes",
      },
    },
    {
      name: "Legacy Modernization Services",
      body: "AI automates and accelerates legacy system upgrades. We enhance security, performance, and compatibility with modern technologies. Intelligent automation reduces downtime and ensures a smooth transition.",
      image: {
        src: "/images/landing/software-development/svc-legacy.webp",
        alt: "Server racks and cabling in a data centre, the estate a modernisation touches",
      },
    },
  ],
};

/**
 * The live page's "Why Choose Us" block: one line of prose, then the six things
 * it names without describing. Those are phrases rather than sentences, so they
 * render as the overview's claim list rather than as a card grid that would
 * need a body per card we do not have.
 */
export const sdWhyUs: OverviewContent = {
  eyebrow: "Why Choose Us",
  title: "Why Choose Soft Suave for Software Development",
  paragraphs: [
    "Choosing Soft Suave for your custom software development means partnering with a team of professionals who prioritize quality, efficiency, and innovation. Here’s what you get",
  ],
  points: [
    "Budget-friendly solutions",
    "400+ Expert programmers",
    "Agile workflows",
    "40-hour free trial",
    "Quick team setup",
    "Time-zone flexibility",
  ],
};

/**
 * Seven stages, each with the live page's own one-line description, rendered
 * through the homepage's pinned journey scene rather than a card grid — the
 * approach is a route walked once, in order, which is what that layout is for.
 *
 * `glyph` picks the drawing on each hub. Three stages map onto a named icon
 * that means exactly the same work; the rest fall to the icon their position
 * already carries, which is the documented default.
 */
export const sdProcess: JourneyContent = {
  eyebrow: "Our Approach",
  title: "How We Approach Software Development",
  body: "We follow agile methodology so we can be flexible. We collaborate with you from ideation through release to deliver the results you need, when you need them, and at a cost you can afford.",
  steps: [
    {
      n: "01",
      name: "Planning",
      glyph: "explore",
      body: "We work with you to establish both specific goals and a plan for reaching them.",
    },
    {
      n: "02",
      name: "Designing",
      body: "Our design team constructs intuitive designs that provide smooth experiences and strong branding.",
    },
    {
      n: "03",
      name: "Defining",
      body: "We define functional requirements, project goals, and details, and align with your business strategy to deliver precision.",
    },
    {
      n: "04",
      name: "Development",
      body: "We develop high-performing systems that support feature-rich, efficient, and scalable operations.",
    },
    {
      n: "05",
      name: "Testing",
      glyph: "validate",
      body: "We have strict testing protocols for all solutions that we develop to eliminate as many bugs as possible, which leads to perfect performance.",
    },
    {
      n: "06",
      name: "Deployment",
      glyph: "05",
      body: "We deploy your solution seamlessly, ensuring that it integrates perfectly with your existing systems and is ready for quick implementation.",
    },
    {
      n: "07",
      name: "Maintenance",
      // No "07" icon exists; naming "06" is explicit rather than relying on
      // the switch's fallback, and optimisation is the right picture for it.
      glyph: "06",
      body: "Once we launch, our commitment to you doesn’t stop. We’re dedicated to providing ongoing support and updates, ensuring your software’s success for the long haul.",
    },
  ],
};

/** Twelve sectors, four across, so the grid runs three full rows. */
export const sdIndustries: CardGridContent = {
  eyebrow: "Industries",
  title: "Software Development for a Range of Industries",
  body: "We help businesses in different industries all around the globe to attain their business goals with high-quality custom software development services.",
  items: [
    {
      name: "Healthcare Software Development Service",
      body: "Get cutting-edge healthcare solutions using our expertise in healthcare software development. From EHR systems to telemedicine apps, we help healthcare providers improve patient care, reduce costs, and streamline operations.",
    },
    {
      name: "Education Software Development Service",
      body: "Transform the education industry with our customized software. Be it an e-learning platform, a student management system, or a virtual classroom - we make educational solutions to enhance the learning experience.",
    },
    {
      name: "E-commerce Software Development Service",
      body: "We enable e-commerce businesses to increase the efficiency and user experience, driving high conversions with our custom software solutions. Our e-commerce platform is made to be scalable, secure, and reliable.",
    },
    {
      name: "Banking Software Development Service",
      body: "We are specialists in providing resilient, dependable, highly secure banking systems specifically designed for the needs of modern banks. Our Easy-To-Use solutions increase productivity, handle the compliance burden, and enhance the customer’s experience.",
    },
    {
      name: "Real Estate Software Development Service",
      body: "Take your real estate business to the next level with our industry-leading software. We build anything from property management systems to real estate marketplaces that help organizations operate more efficiently and connect better with customers.",
    },
    {
      name: "Logistics Software Development Service",
      body: "Get the most out of your logistics operation with our bespoke software. We deliver real-time tracking, supply chain management platforms, and route optimization solutions that increase efficiency and decrease operating costs.",
    },
    {
      name: "Blockchain Software Development Service",
      body: "Leverage the power of blockchain with our custom blockchain development service. We build secure, transparent, and decentralized applications that disrupt traditional industries like finance, finance, healthcare, logistics, and so on.",
    },
    {
      name: "Fintech Software Development Service",
      body: "Our fintech software development services help you build secure, user-friendly, and compliant financial platforms. From banking apps and payment systems to investment tools, we make your fintech solution both powerful and future-ready.",
    },
    {
      name: "EHR software development service",
      body: "We design EHR systems that manage data with ease, unlock patient records securely, and connect physicians to other health professionals for optimal patient care.",
    },
    {
      name: "Fantasy Sports Software Development Service",
      body: "Level up your fantasy sports software with our custom solutions. We design fun, interactive, and scalable systems that will provide a top-tier experience to users.",
    },
    {
      name: "SaaS Software Development Service",
      body: "Let your SaaS platform reach new heights with our In-depth expertise. From subscription billing to multi-tenant architecture, we build SaaS applications that are scalable and secure, allowing you to grow your business and ease your workload.",
    },
    {
      name: "Automotive Software Development Service",
      body: "Innovation is everything in the automotive industry. Here, we create software that maximizes vehicle performance, increases human convenience, and optimizes the management of automotive business, from in-car telematics to sophisticated vehicle management functions.",
    },
  ],
};

/** The live page's four delivery models, four across on a wide desktop. */
export const sdDelivery: CardGridContent = {
  eyebrow: "Delivery Method",
  title: "Flexible Solutions for Every Need",
  body: "Accelerate your digital journey with flexible delivery methods from Soft Suave. We align with your business goals, ensuring seamless collaboration, faster delivery, and scalable solutions tailored for long-term success.",
  items: [
    {
      name: "Offshore Software Development Service",
      body: "Explore superior talent without breaking the bank with Soft Suave’s offshore team. Experience seamless collaboration across time zones, delivering top-notch quality with expertly managed projects. Elevate your success effortlessly.",
    },
    {
      name: "Software Development Outsourcing Service",
      body: "Focus on what you do best, running your business, while we handle your software development. With our efficiency, experience, and commitment to quality, we’ll deliver a top-notch product that elevates your success.",
    },
    {
      name: "Staff Augmentation Service",
      body: "Need additional talent for your in-house team? Our staff augmentation service provides you with experienced developers and IT specialists who integrate smoothly with your existing team.",
    },
    {
      name: "Hire Dedicated Developer Team",
      body: "Build your dream team with Soft Suave’s dedicated developers. Our team of skilled developers works exclusively on your projects, ensuring high-quality delivery and full project control.",
    },
  ],
};

/**
 * The live page prints its stack as one flat wall of brand marks with no group
 * headings. Thirty-six chips in a single run would be unreadable here, so they
 * are grouped by discipline. Every name is the live page's own; only the
 * grouping is ours, and it adds no claim the page does not already make.
 *
 * Each group becomes one marquee row on the homepage's tech section, so the
 * two databases sit with the backend rather than forming a row of their own —
 * a scrolling strip with two marks on it reads as unfinished.
 */
export const sdTech: TechStackContent = {
  eyebrow: "Technology Stack",
  title: "Technologies and tools we use",
  body: "As a leading software development company, we work with cutting-edge technologies to make sure our solutions are fast, secure, and scalable. We have adopted a variety of programming languages, frameworks, and tools to ensure we stay ahead of the curve and deliver innovative solutions.",
  groups: [
    {
      name: "Frontend",
      items: ["React", "Vue.js", "Javascript", "Bootstrap", "HTML", "CSS", "Ember", "Next"],
    },
    {
      name: "Backend and Data",
      items: ["Node.js", ".Net", "ROR", "Java", "Python", "PHP", "Go", "SQL Server", "MongoDB"],
    },
    { name: "Mobile", items: ["iOS", "Swift", "Kotlin", "Flutter", "Ionic", "Cordova", "Xamarin"] },
    {
      name: "Cloud and DevOps",
      items: ["AWS", "Azure", "Google Cloud", "Docker", "Jenkins", "Ansible", "Kubernetes"],
    },
    {
      name: "Design and QA",
      items: ["Photoshop", "Illustrator", "Adobe XD", "Figma", "Selenium"],
    },
  ],
};

export const sdFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "Frequently Asked Questions (FAQs)",
  body: "Get fast answers to your questions with our clear FAQs!",
  items: [
    {
      q: "Does Soft Suave cover all stages of the SDLC?",
      a: "Yes, we cover all stages of SDLC (from discovery to ongoing support)",
    },
    {
      q: "What’s the cost for your software development services?",
      a: "The cost of your project is determined by its intricacy, extent, etc. Call us for a custom quote.",
    },
    {
      q: "How do you control the quality of the software you deliver?",
      a: "To control the quality, we combine automated and manual testing for efficient, high-quality software delivery.",
    },
    {
      q: "How Do You Choose the Best Software Development Company?",
      a: "Seek out experience, technical skills, and a collection of accomplished projects—traits that Soft Suave reliably showcases.",
    },
    {
      q: "How Long Does it Take to Create and Build Custom Software?",
      a: "The time depends on the complexity as well as many other aspects of the project. Usually, it takes anywhere from a few months to a year.",
    },
  ],
};
