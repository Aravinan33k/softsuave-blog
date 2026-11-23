/**
 * The `hire-mern-stack-developers-india` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-mern-stack-developers-india/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all twenty.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { webExplore } from "../hire-explore";
import { MERN_STEPS, MERN_WHY } from "../hire-blocks";
import { HOURLY_RATE } from "../../company-figures";

export const skill: HireSkill = {
  closingCtaIcon: true,
  slug: "hire-mern-stack-developers-india",
  key: "mern",
  name: "MERN Stack",
  role: "MERN Stack Developers",
  metaTitle: "Hire MERN App Developers India for Custom Apps",
  metaDescription:
    "Hire MERN app developers India with trustworthy and satisfactory support? Get resources from soft Suave with one week of risk free trial",
  serviceType: "MERN stack development staffing",
  ctaLabel: "Hire MERN developers",

  order: ["overview", "services", "midCta", "process", "whyUs", "exploreMore", "testimonials", "faq"],

  hero: {
    // Same H1 text, re-broken so the role phrase sits on one line and can
    // take the accent.
    titleLines: ["Hire Remote MERN Stack Developers", "In India"],
    accent: "MERN Stack Developers",
    // 13 Oct review: "H1 is in 3 lines even though there is space" — the
    // standard H1's 24ch cap wrapped the first line even beside a column
    // 940px wide. Sized to fit instead: each line on one line, 50px where
    // the column allows.
    titleFit: true,
    body: [
      "Why manage multiple specialists when one MERN stack developer can handle your full JavaScript stack? Soft Suave connects you with vetted MERN developers in India skilled in MongoDB, Express, React, Node.js, GraphQL, and microservices. Each developer is screened for technical depth, English communication, remote delivery experience, and client-ready execution. Hire within 48 hours and start with a 40-hour risk-free trial.",
      "Build your MERN team with the right skills, support, and hiring flexibility.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      `MERN Stack Developers from ${HOURLY_RATE}`,
      "Hire Within 48 Hours",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      title: "Get Skilled Remote Developers",
      submitHover: 'black',
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your MERN stack requirement.",
      subject: "MERN Stack Developers enquiry",
      alert: sharedHeroAlert,
    },
    // A photo for this technology, darkened by the strong veil `HirePage`
    // applies (review: "update the images and add a black gradient").
    image: {
      src: "/images/landing/hs-mern-hero.webp",
      width: 1800,
      height: 900,
      alt: "Laptop with a code editor under pink and blue light",
      blurDataURL:
        "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADwAQCdASoQAAsAA4BaJbAAAuRCnXxPOQAA/vX9+ruPSP7ppwaw4DPM3G1D41DEexbcjU45xeIA9GeCY9cFr4014BvbfUj/Si8t2hQA",
    },
  },

  overview: {
    // Portrait, run the full height of the copy beside it (review: "resize
    // the image to fit the height of the section").
    image: {
      src: "/images/landing/ov-hire-mern-stack-developers-india-tall.webp",
      width: 1000,
      height: 1250,
      alt: "Developer typing code on a laptop in a dim room",
      blurDataURL:
        "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADwAQCdASoLABAAA4BaJYwCdADdpisKC0AA/vQ2FsLVhDHXZz3fxoCFU15q0ymVTFoFyL7KBpaRFfhxive/uW6cegZYSO7LD7J9VErujMq2n/mtiMOEhUw8AAA=",
      column: true,
    },
    eyebrow: "Overview",
    title: "Why Use the MERN Stack for Your Next Web App?",
    paragraphs: [
      "MERN stack brings MongoDB, Express.js, React, and Node.js into one full-stack JavaScript environment. This helps businesses build web applications faster, reduce dependency on multiple technology teams, and keep development more consistent from frontend to backend. At Soft Suave, our MERN stack developers build scalable web apps across SaaS, fintech, healthcare, e-commerce, logistics, edtech, and more. They work on React-based interfaces, Node.js APIs, real-time applications, headless commerce platforms, and cloud-ready microservices.",
      "With one JavaScript-based stack across the application, MERN helps reduce onboarding time, improve team collaboration, and speed up feature delivery.",
      "Here's what each component of the MERN stack handles:",
    ],
    points: [
      "MongoDB stores and manages flexible JSON-like data across your application.",
      "Express.js simplifies server-side routing, API handling, HTTP requests, and responses.",
      "React.js helps developers build fast, interactive, and user-friendly frontend interfaces.",
      "Node.js runs JavaScript on the server side and connects the backend with MongoDB and React.",
    ],
  },

  services: {
    wideHead: true,
    eyebrow: "What We Build",
    title: "What Can Soft Suave's MERN Stack Developers Build?",
    body: "Soft Suave's MERN stack developers build full-stack JavaScript solutions for different business needs, from new web apps to legacy stack migrations. They craft fast, secure, and scalable MERN applications that power seamless user experiences and drive real business growth.",
    items: [
      {
        name: "Custom MERN Stack Application Development",
        body: "Soft Suave builds custom MERN apps for SaaS, marketplaces, dashboards, bookings, and tools, delivering scalable, high-performance solutions.",
      },
      {
        name: "MERN Stack E-commerce Platforms",
        body: "Our MERN developers build fast, scalable e-commerce platforms with catalogs, carts, checkout, payments, search, orders, and admin dashboards.",
      },
      {
        name: "Custom CMS Built on MERN",
        body: "Soft Suave develops flexible MERN CMS solutions with role access, workflows, multilingual support, versioning, and API-based content delivery.",
      },
      {
        name: "REST + GraphQL APIs and Web Services",
        body: "Our MERN developers create secure REST and GraphQL APIs with authentication, webhooks, documentation, rate limiting, and scalable architecture.",
      },
      {
        name: "Integration & Migration from Legacy Stacks",
        body: "Soft Suave integrates MERN with existing systems and migrates legacy PHP, Angular, .NET, or monolithic apps into scalable MERN solutions.",
      },
      {
        name: "Post-Launch Maintenance & Bug Fixes",
        body: "We provide ongoing MERN support, including bug fixes, updates, performance tuning, security patches, monitoring, and continuous improvements.",
      },
    ],
  },

  midCta: {
    title: `Hire MERN Stack Developers Starting from ${HOURLY_RATE}`,
    body: "Hire skilled remote MERN stack developers from India with flexible contract models and transparent rates. Get the right talent for your project without long hiring delays.",
    cta: { label: "Request Rate Card", href: "/contact" },
  },

  process: {
    wideHead: true,
    eyebrow: "Hiring Process",
    title: "How to Hire MERN Stack Developers from India in 4 Steps",
    body: "Hiring a MERN stack developer from Soft Suave is simple, transparent, and fast. Our process helps you evaluate the right developer before long-term onboarding, so you can move forward with more confidence.",
    steps: MERN_STEPS,
  },

  whyUs: {
    wideHead: true,
    eyebrow: "Why Soft Suave",
    title: "Why Hire MERN Stack Developers from Soft Suave?",
    body: "Soft Suave's MERN stack developers in India help businesses build, scale, and maintain full-stack JavaScript applications with reliable remote delivery. You get vetted talent, clear communication, structured project management, and flexible hiring models without the delays of building an in-house team.",
    items: MERN_WHY,
  },

  /**
   * The MERN page runs the same link band as its siblings but retitles it —
   * "Tech Stack and Tools Soft Suave's MERN Developers Use" — so the heading is
   * its own while the roster stays the shared one.
   */
  exploreMore: {
    wideHead: true,
    ...webExplore,
    eyebrow: "Technology",
    title: "Tech Stack and Tools Soft Suave's MERN Developers Use",
    body: "Soft Suave's MERN developers work with modern JavaScript tools, frameworks, databases, APIs, testing platforms, and deployment systems to build scalable full-stack applications.",
  },

  faq: {
    wideHead: true,
    eyebrow: "FAQs",
    title: "Frequently Asked Questions About Hiring MERN Stack Developers in India",
    body: "Know more about our processes and how we work, with the help of the following FAQs our clients ask.",
    items: [
      {
        q: "What is the MERN stack?",
        a: "MERN is a JavaScript-based web development stack that includes MongoDB, Express.js, React, and Node.js. MongoDB handles the database, Express.js manages backend routing, React builds the frontend interface, and Node.js runs JavaScript on the server side. Since all four technologies use JavaScript, MERN helps developers build full-stack web applications with better consistency.",
      },
      {
        q: "How do I hire a MERN stack developer in India?",
        a: "You can hire MERN stack developers in India from Soft Suave by sharing your project requirements, required skills, experience level, timeline, and engagement model. Our team will help you shortlist suitable MERN developers, start with a 40-hour risk-free trial, and onboard the right developer for your team.",
      },
      {
        q: "How much does it cost to hire MERN stack developers in India?",
        a: `The cost to hire MERN stack developers from Soft Suave starts from ${HOURLY_RATE}. The final cost depends on the developer's experience, project scope, engagement model, technology requirements, and hiring duration.`,
      },
      {
        q: "MEAN vs MERN - which stack is better?",
        a: "MEAN and MERN share three core technologies: MongoDB, Express.js, and Node.js. The main difference lies in the frontend layer. MEAN relies on Angular for building user interfaces, while MERN uses React for frontend development. MERN is a strong choice for businesses that need flexible, component-based interfaces and React-based development. MEAN can be suitable for teams already using Angular or building highly structured enterprise applications.",
      },
      {
        q: "Can I hire MERN stack developers on an hourly basis from Soft Suave?",
        a: "Yes. You can hire MERN stack developers from Soft Suave on an hourly, fixed price, or dedicated team model. This gives you the flexibility to scale development support based on your project stage, workload, and budget.",
      },
      {
        q: "How fast can Soft Suave onboard a MERN stack developer?",
        a: "Soft Suave can help you shortlist and onboard MERN stack developers quickly based on your project requirements and developer availability. For urgent needs, suitable profiles can be shared within 48 hours, followed by a 40-hour risk-free trial before long-term engagement.",
      },
      {
        q: "Does Soft Suave provide full MERN stack teams or only individual developers?",
        a: "Soft Suave provides both individual MERN stack developers and dedicated MERN development teams. Individual developers are ideal for feature development, maintenance, or team extension, while dedicated teams work better for end-to-end product development, migrations, and long-term scaling.",
      },
      {
        q: "Can Soft Suave migrate our existing app from MEAN or LAMP to MERN?",
        a: "Yes. Soft Suave helps businesses migrate existing applications from MEAN, LAMP, PHP, Angular, .NET, or monolithic systems to modern MERN-based architectures. Our team can support frontend migration, backend API modernization, database restructuring, third-party integrations, and phased rollout planning.",
      },
    ],
  },
};
