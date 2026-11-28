/**
 * Copy for the "Offshore Software Development Company" landing page
 * (`/offshore-software-development-company`).
 *
 * The hero keeps its own image, badges, layout and form fields; its text is the
 * live hero's. Everything below it — and the page's title, description and
 * schema — follows the live softsuave.com page (review: "Need to update the
 * page - lot of sections have changed including the title, description,
 * canonicals, and schemas"). The mapping, in live page order:
 *
 *   "Our Clients"                                       → homepage `Clients`
 *   "What an Offshore Software Development Company Does" → `offOverview`
 *   "Offshore Software Development Services"            → `offServices` (9)
 *   "Choose the Right Offshore Engagement Model"        → `offModels` (3)
 *   "Not Sure Which Engagement Model Fits Your Project?" → `offMidCta`
 *   "How Our Offshore Software Development Process Works" → `offProcess` (5)
 *   "Offshore Software Development Across Industries"   → `offIndustries` (6)
 *   "Quality, Governance, and Intellectual Property"    → `offGovernance`
 *   "Why Companies Work With Soft Suave"                → `offWhyUs` (6)
 *   "Transforming Ideas with Next-Gen Tech"             → `offTech`
 *   "Offshore Software Development Case Studies"        → `offCaseStudies` (7)
 *   "What Our Clients Say About Us"                     → homepage `Testimonials`
 *   "Offshore Software Development FAQs"                → `offFaqs` (8)
 *
 * The copy is the live page's own, verbatim.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { ProcessContent } from "@/components/landing/process";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { FaqContent } from "@/components/landing/faq";
import type { CardGridContent as PhotoGridContent } from "@/components/generative-ai/industries";
import type { WorkCarouselContent } from "@/components/home/work-grid";
import { sharedHeroAlert, sharedHeroBadges } from "./delivery-shared";
import { SPECIALISTS_PLUS, YEARS_PLUS } from "@/lib/company-figures";

export const offMeta = {
  slug: "offshore-software-development-company",
  path: "/offshore-software-development-company",
  // The live page's <title> and meta description, verbatim. The title already
  // carries the brand, so the route adds no " | Soft Suave" suffix.
  title: "Offshore Software Development Company | Soft Suave",
  description:
    `Partner with an offshore software development company bringing ${YEARS_PLUS} years of expertise in custom software, web, mobile, AI, integration, and modernization.`,
} as const;

export const offHero: HeroContent = {
  // 8 Oct review: "highlight 'Offshore Software Development' in the H1".
  titleLines: ["Offshore Software Development", "Company for Global Businesses"],
  accent: "Offshore Software Development",
  // Each line sized to fit the copy column, so the H1 sets in two lines.
  titleFit: true,
  body: [
    "Soft Suave is an offshore software company that builds and modernizes software for startups, scaling businesses, and established organizations worldwide. We combine experienced engineering capabilities with flexible delivery models to address your project requirements.",
    "Share your requirements, and we'll outline the capabilities, delivery approach, and next steps for your project.",
  ],
  points: [
    `${YEARS_PLUS} Years of Technology Expertise`,
    `${SPECIALISTS_PLUS} AI & Engineering Specialists`,
    "Flexible Engagement Models",
    "ISO/IEC 27001:2022-Certified",
    "Web, Mobile, AI & Modernization Capabilities",
  ],
  badges: sharedHeroBadges,
  form: {
    eyebrow: "Business Enquiry",
    // The live hero form's own heading.
    title: "Let's Discuss Your Project",
    submit: "Send requirements",
    sending: "Sending…",
    requirementLabel: "What do you need built?",
    requirementPlaceholder:
      "The product or system, the platforms it runs on, what it has to integrate with, and your target timeline.",
    subject: "Offshore software development enquiry",
    alert: sharedHeroAlert,
  },
  image: {
    // A hand-placed picture for this page only (by request): a glowing globe
    // linking an offshore team's specialists across regions.
    src: "/images/landing/hero/offshore-hero-globe-v1.webp",
    width: 1672,
    height: 941,
    alt: "A glowing globe connecting offshore engineers and their specialities across regions",
    // The avatar cards sit behind the H1 and body copy; the strong veil keeps
    // the text readable while the globe still shows towards the form.
    veil: "strong",
    blurDataURL:
      "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADwAQCdASoQAAkAAsBMJaACdAEO9aGvs8gA/vh+t2DCHOOjJiL13yNbF3jC9Yg1jxwxmnQuMpxP93fVzjBIiAblNGr7QNJQoyeleXg2gAA=",
  },
};

/** The overview photo in a fixed, centred 4:3 frame; still prose-only when the slot is missing. */
export const offOverview: OverviewContent = {
  // Hand-placed (by request) rather than the generated overview slot. A fixed
  // 4:3 frame (the asset's own ratio, so no crop) centred against the copy
  // (review: the image ran the full height of the long prose at 1366px).
  image: {
    src: "/images/landing/ov-offshore-software-development-company-v2.webp",
    width: 1448,
    height: 1086,
    alt: "A glowing globe linking a developer in India, a project manager in the UK, a UI/UX designer in Singapore and a QA engineer in the USA",
    blurDataURL:
      "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAABQAgCdASoQAAwAAsBMJbACdAYq1q2jE5vkyQAA/vNVgAOB4ruwpmDplyeGuUGGrlyGvdCqMHupfxZgN7VQOHsbzGg++ze/tLC56vt2dJYp05+7qQaLxv9oaV8WfnHvu0+Gsgbr3kpN65RvIScb4AgA",
    aspect: "4 / 3",
    align: "center",
    textLead: true,
    rounded: true,
  },
  eyebrow: "Overview",
  title: "What an Offshore Software Development Company Does",
  paragraphs: [
    "An offshore software development company designs, builds, modernizes, and supports software through delivery teams located outside the buyer’s primary market.",
    "Soft Suave works with organizations that need to create new applications, improve existing products, connect business systems, or extend their software delivery capabilities. Our teams support web, mobile, cloud, and AI requirements across different project stages.",
    "Working as an offshore outsourcing software development company, Soft Suave can support a defined project, evolving development work, or ongoing engineering requirements. The appropriate structure depends on your scope, expected level of flexibility, internal capabilities, and preferred involvement in delivery decisions.",
    "The purpose is not simply to move development to another location. A suitable offshore software company should provide technical fit, transparent delivery practices, clear commercial terms, documentation, quality controls, and relevant evidence of its capabilities.",
    "For definitions, benefits, and broader planning considerations, read our guide to what offshore development involves.",
  ],
  // The live paragraph links its closing phrase to the blog guide; a path this
  // app does not serve resolves to softsuave.com through `SiteLink`.
  links: [{ text: "what offshore development involves", href: "/blog/offshore-software-development" }],
};

/** The live page's nine services, in its order; `href` is the live card's own link. */
export const offServices: ServicesContent = {
  eyebrow: "Services",
  title: "Offshore Software Development Services",
  body: "Soft Suave provides offshore software development services covering the full product lifecycle, from building new applications to modernizing, integrating, and maintaining existing systems. Each service is planned around your business workflows, technical environment, project responsibilities, and expected engagement structure.",
  items: [
    {
      name: "Custom AI Services",
      // 8 Oct review: "replace the link to this page -
      // /custom-ai-development-services".
      href: "/custom-ai-development-services",
      body: "Build tailored AI solutions across generative AI, machine learning, natural language processing, LLM fine-tuning, predictive analytics, and computer vision based on your specific business requirements.",
    },
    {
      name: "Custom Software Development",
      href: "/software-development-company",
      body: "Our custom offshore software development services cover internal platforms, customer-facing applications, and specialized workflows, planned around your users, integrations, data, architecture, requirements, and operating environment.",
    },
    {
      name: "Web Application Development",
      href: "/web-application-development-company",
      body: "Build responsive web applications for customer experiences, business operations, portals, marketplaces, and internal workflows, covering frontend, backend, architecture, APIs, integrations, testing, deployment, and ongoing enhancements.",
    },
    {
      name: "Mobile Application Development",
      href: "/mobile-application-development-company",
      body: "Create native and cross-platform mobile applications for iOS and Android, covering customer experiences, operational tools, platform extensions, API integrations, testing, release preparation, updates, and maintenance.",
    },
    {
      name: "Software Product Engineering",
      href: "/product-engineering-services",
      body: "Support software products from requirements and architecture through iterative development, testing, release, and continuing enhancements, aligning technical execution with the roadmap, delivery priorities, and goals.",
    },
    {
      name: "Legacy Modernization Services",
      href: "/legacy-modernization-services",
      body: "Modernize existing applications, interfaces, architectures, and supporting components through codebase improvements, platform migration, integration changes, interface updates, testing, and deployment preparation based on requirements review.",
    },
    {
      name: "Software Integration Services",
      body: "Connect applications, APIs, databases, cloud services, and approved third-party platforms by reviewing available interfaces, data movement, dependencies, access requirements, and workflows across the technical environment.",
    },
    {
      name: "Quality Engineering and Testing",
      body: "Apply functional, integration, performance, regression, and automated testing throughout delivery, supported by test planning, defect reporting, reviews, and validation against agreed functional and technical requirements.",
    },
    {
      name: "Maintenance and Enhancements",
      body: "Maintain and improve released software through issue resolution, monitoring, compatibility updates, and feature enhancements, with responsibilities, support periods, response expectations, and scope confirmed per engagement.",
    },
  ],
};

export const offModels: CardGridContent = {
  eyebrow: "Engagement Models",
  title: "Choose the Right Offshore Engagement Model",
  body: "Choose from flexible engagement models for offshore software development services based on your scope, delivery priorities, required flexibility, and preferred level of involvement.",
  items: [
    {
      name: "Dedicated Team",
      icon: "users",
      body: "Work with a dedicated team focused on your ongoing requirements.",
    },
    {
      name: "Time and Material",
      icon: "gauge",
      body: "Pay for the time and resources used as requirements evolve.",
    },
    {
      name: "Fixed Bid",
      icon: "coins",
      body: "Set a defined budget for projects with clearly established requirements.",
    },
  ],
};

export const offMidCta: CtaBandContent = {
  title: "Not Sure Which Engagement Model Fits Your Project?",
  body: "Tell us about your project, technical requirements, expected timeline, and delivery preferences. Our experts will explain each engagement model and help you choose an approach that best suits your needs.",
  // The live button's label; /contact, as the reviews ask of every
  // consultation CTA (live: /30-min-free-consultation, not served here).
  cta: { label: "Talk to Our Experts", href: "/contact" },
};

export const offProcess: ProcessContent = {
  eyebrow: "Our Process",
  title: "How Our Offshore Software Development Process Works",
  // The live intro's two paragraphs, run together as the section's one body.
  body: "Our agile offshore software development process gives you visibility at every stage rather than a single handover at the end. Each stage provides a defined point for technical decisions, review, and alignment with your stakeholders. AI Pair Programming, Automated Test Generation, LLM-Assisted Code Review, and AI-Monitored CI/CD support our engineering work without replacing human judgment or stakeholder approval.",
  steps: [
    {
      n: "01",
      name: "Requirements and Engagement Planning",
      body: "We clarify business objectives, users, functional requirements, technical dependencies, responsibilities, delivery expectations, and the engagement model suited to the work.",
    },
    {
      n: "02",
      name: "Architecture and Delivery Preparation",
      body: "Our team reviews application architecture, technologies, environments, integrations, data requirements, dependencies, access needs, and the initial plan for developing and reviewing the software.",
    },
    {
      n: "03",
      name: "Iterative Development",
      body: "Engineers build the approved functionality in manageable increments. Regular reviews help your stakeholders assess completed work, clarify requirements, and adjust upcoming priorities where the engagement allows.",
    },
    {
      n: "04",
      name: "Testing and Review",
      body: "Functional, integration, regression, performance, and automated testing are applied according to the project. Code review and stakeholder review support validation before release approval.",
    },
    {
      n: "05",
      name: "Release and Continuing Improvement",
      body: "Approved software is prepared for release within the agreed environment. Continuing work may include monitoring, issue resolution, maintenance, compatibility updates, and planned feature enhancements.",
    },
  ],
};

/** The live page's six sector cards — a photo at rest, the description on hover. */
export const offIndustries: PhotoGridContent = {
  eyebrow: "Industries",
  title: "Offshore Software Development Across Industries",
  wideHead: true,
  body: "Offshore software development can support industry-specific workflows without relying on one standard solution. Our teams plan applications around the users, data, integrations, operational requirements, and technical context involved in each project.",
  items: [
    {
      key: "fintech",
      name: "FinTech",
      // A hand-placed picture for this page only (by request); the shared
      // ind-fintech.webp still serves the other pages.
      image: "/images/landing/industries/ind-fintech-offshore-v1.webp",
      body: "Develop applications that support financial workflows, digital platforms, data processing, customer experiences, transaction-related operations, reporting, and integrations with approved internal or third-party systems.",
    },
    {
      key: "healthtech",
      name: "HealthTech",
      // A hand-placed picture for this page only (by request); the shared
      // ind-healthtech.webp still serves the other pages.
      image: "/images/landing/industries/ind-healthtech-offshore-v1.webp",
      body: "Build digital applications that support healthcare operations, user workflows, records, scheduling, communication, administrative processes, and connections between approved platforms and data sources.",
    },
    {
      key: "edtech",
      name: "EdTech",
      // A hand-placed picture for this page only (by request); the shared
      // ind-edtech.webp still serves the other pages.
      image: "/images/landing/industries/ind-edtech-offshore-v1.webp",
      body: "Create learning platforms, assessment workflows, content-delivery systems, student and educator experiences, administrative tools, reporting capabilities, and integrations supporting digital education operations.",
    },
    {
      key: "logistics",
      name: "Logistics",
      // A hand-placed picture for this page only (by request); the shared
      // ind-logistics.webp still serves the other pages.
      image: "/images/landing/industries/ind-logistics-offshore-v1.webp",
      body: "Engineer software supporting shipment workflows, fleet operations, routing, tracking, status visibility, documentation, supply-chain coordination, and integration with approved operational systems.",
    },
    {
      key: "telecom",
      name: "Telecom",
      // A hand-placed picture for this page only (by request); the shared
      // ind-telecom.webp still serves the other pages.
      image: "/images/landing/industries/ind-telecom-offshore-v1.webp",
      body: "Build applications supporting network operations, customer workflows, service management, data visibility, internal processes, reporting, and integration between approved telecom platforms and business systems.",
    },
    {
      key: "ecommerce",
      name: "E-commerce",
      // A hand-placed picture for this page only (by request); the shared
      // ind-ecommerce.webp still serves the other pages.
      image: "/images/landing/industries/ind-ecommerce-offshore-v1.webp",
      body: "Develop commerce platforms supporting product discovery, customer journeys, subscriptions, transactions, order workflows, account management, operational visibility, and approved payment or business-system integrations.",
    },
  ],
};

export const offGovernance: OverviewContent = {
  eyebrow: "Quality and Governance",
  title: "Quality, Governance, and Intellectual Property",
  paragraphs: [
    "Code quality, intellectual property, and delivery governance are addressed through agreed ownership terms, defined access, code reviews, testing, documentation, and defined review points at each delivery stage.",
    "Project governance begins by clarifying responsibilities, review points, communication expectations, access requirements, and delivery documentation. The selected practices should match the project, engagement model, technical environment, and level of buyer involvement.",
    "Code reviews and relevant testing help identify defects, maintain implementation consistency, and validate work against agreed requirements. Documentation supports technical understanding, handoffs, deployment activities, and continuing development while maintaining direct communication between teams.",
    "Source-code ownership, repository access, confidentiality expectations, and delivery responsibilities are defined through the agreed engagement terms. The applicable terms are reviewed for each project rather than assumed from a general service description.",
    "Soft Suave’s ISO/IEC 27001:2022-certified information security management system supports structured information security practices across software development and delivery. Project-specific security, privacy, and regulatory requirements are reviewed separately.",
  ],
  image: {
    src: "/images/landing/off-quality-governance-v1.webp",
    width: 1536,
    height: 1024,
    alt: "Engineers working beside a screen of code, a security shield, review checklists and a certificate",
    blurDataURL:
      "data:image/webp;base64,UklGRoIAAABXRUJQVlA4IHYAAAAwAgCdASoQAAsAAsBMJbACdAYubjFmGgTdIAD++N+McOcfpvdBazG6ehfvcVVN5ZhErRh3OVKXITE5EhyCXWGcJqx6+6tqxpwTBcJpCzmc6lSe/fFPAhdm/vSYJcVwEWjX1elwXdCt9A7m3RbzMEx5yakcZAAA",
    // Same fixed, centred 4:3 frame as the overview (review: too tall at 1366px);
    // this 3:2 asset loses a little empty margin at the sides.
    aspect: "4 / 3",
    align: "center",
    // Wider prose column, so the H2 keeps a two-line break in every browser.
    textLead: true,
    rounded: true,
  },
};

export const offWhyUs: CardGridContent = {
  eyebrow: "Why Choose Us",
  title: "Why Companies Work With Soft Suave",
  body: "Ranked among the top offshore software development companies by Clutch and GoodFirms, Soft Suave helps global businesses advance software initiatives from initial development through ongoing modernization with experienced engineering teams and flexible engagement models.",
  items: [
    {
      name: `${YEARS_PLUS} Years of Technology Expertise`,
      // Material Symbols Rounded "workspace_premium" (premium badge icon, by request).
      symbol: "workspace_premium",
      body: `Soft Suave brings ${YEARS_PLUS} years of technology expertise to software development, modernization, integration, testing, and continuing engineering requirements across different project stages.`,
    },
    {
      name: `${SPECIALISTS_PLUS} AI & Engineering Specialists`,
      // Material Symbols Rounded "groups" (group icon, by request).
      symbol: "groups",
      body: `Access capabilities across software applications, mobile development, cloud, DevOps, data, testing, and AI through ${SPECIALISTS_PLUS} AI & Engineering Specialists.`,
    },
    {
      name: "Flexible Engagement Structures",
      // Material Symbols Rounded "handshake" (handshake icon, by request).
      symbol: "handshake",
      body: "Choose Fixed Price for defined projects, Time and Material for evolving requirements, or Dedicated Team for continuing access to matched engineering capabilities.",
    },
    {
      name: "ISO/IEC 27001:2022 Certified",
      // Material Symbols Rounded "license" (certificate icon, by request).
      symbol: "license",
      body: "Our ISO/IEC 27001:2022-certified information security management system supports structured security practices tailored to the needs of each project.",
    },
    {
      name: "AI-Enabled Engineering Practices",
      // Material Symbols Rounded "neurology" (brain icon, by request).
      symbol: "neurology",
      body: "AI-enabled practices include AI pair programming, automated test generation, LLM-assisted code review, and AI-monitored CI/CD when appropriate for each project.",
    },
    {
      name: "Global Delivery Presence",
      // Material Symbols Rounded "globe" (globe icon, by request).
      symbol: "globe",
      body: "Soft Suave maintains delivery presence across Chennai, Bengaluru, and the United States, supporting collaboration with organizations operating across different markets.",
    },
  ],
};

/**
 * The live page runs its stack as three unlabelled marquee rows that repeat
 * the same marks. Here each technology appears once, grouped by discipline;
 * every name is on the live rows, only the grouping is ours.
 */
export const offTech: TechStackContent = {
  eyebrow: "Technology Stack",
  title: "Transforming Ideas with Next-Gen Tech",
  body: `Our ${SPECIALISTS_PLUS} AI-enabled developers specialize in cutting-edge technologies and platforms. Our comprehensive tech stack covers everything from design to testing, ensuring seamless and efficient development.`,
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

/**
 * The live page's seven case-study slides, titles and summaries verbatim. The
 * artwork is each study's own, mirrored into `public/images/case-studies/`
 * (see `case-studies-data.ts`); the tag is its category on /case-studies.
 */
export const offCaseStudies: WorkCarouselContent = {
  eyebrow: "Success Stories",
  title: "Offshore Software Development Case Studies",
  // Wider intro column: the default one broke this title a word to a line.
  wideIntro: true,
  // No project counter; the line under the lead, arrows left-aligned below it.
  navBelow: true,
  body: "Our case studies show how we solve real business challenges through software. See how our teams addressed different challenges and delivered solutions suited to each project.",
  tileCta: "View Case Study",
  items: [
    {
      title: "Smart Movie Ticketing with Real-Time Booking",
      href: "/case-study-smart-movie-ticketing-with-real-time-booking",
      tag: "On-Demand",
      body: "Soft Suave built a smart movie ticketing system with real-time seats, secure payments, and smooth booking.",
      image: { src: "/images/case-studies/on-demand-5.webp", alt: "Smart Movie Ticketing with Real-Time Booking" },
    },
    {
      title: "Area Mapping Solution For A Solar Business",
      href: "/case-study-area-mapping-solution",
      tag: "On-Demand",
      body: "Founded in 2020, our client offers solar energy solutions focused on home efficiency and sustainable power, helping homeowners save on bills.",
      image: { src: "/images/case-studies/solar-mapping.webp", alt: "Area Mapping Solution For A Solar Business" },
    },
    {
      title: "ParkSafe Community Vehicle Alert App",
      href: "/case-study-parksafe-community-vehicle-alert-app",
      tag: "Logistics",
      body: "Soft Suave built a smart app to spot suspicious vehicles, send alerts, and boost community safety in real time.",
      image: { src: "/images/case-studies/logistics-3.webp", alt: "ParkSafe Community Vehicle Alert App" },
    },
    {
      title: "Digital Advertising in Public Spaces",
      href: "/case-study-digital-advertising-in-public-spaces",
      tag: "On-Demand",
      body: "Soft Suave built a dynamic digital ads platform for real-time content, location targeting, and analytics in public spaces.",
      image: { src: "/images/case-studies/on-demand-1.webp", alt: "Digital Advertising in Public Spaces" },
    },
    {
      title: "Restaurant Workflow Optimization",
      href: "/case-study-restaurant-workflow-optimization",
      tag: "On-Demand",
      body: "Soft Suave built a smart restaurant system to optimize orders, kitchen flow, and staff coordination for better dining.",
      image: { src: "/images/case-studies/on-demand-3.webp", alt: "Restaurant Workflow Optimization" },
    },
    {
      title: "Optimizing Influencer and Brand Collaborations",
      href: "/case-study-optimizing-influencer-and-brand-collaborations",
      tag: "On-Demand",
      body: "Soft Suave built a smart platform to streamline influencer-brand ties, automate tasks, and boost engagement with data.",
      image: { src: "/images/case-studies/on-demand-8.webp", alt: "Optimizing Influencer and Brand Collaborations" },
    },
    {
      title: "AI-Powered Multi-Cloud Management",
      href: "/case-study-ai-powered-multi-cloud-management",
      tag: "On-Demand",
      body: "Soft Suave built an AI platform to monitor, optimize, and automate multi-cloud setups with speed, security, and savings.",
      image: { src: "/images/case-studies/on-demand-11.webp", alt: "AI-Powered Multi-Cloud Management" },
    },
  ],
};

/** The live page's eight FAQs, questions and answers verbatim. */
export const offFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "Offshore Software Development FAQs",
  body: "Find clear answers to common questions about offshore development services and what to expect before, during, and after an engagement.",
  items: [
    {
      q: "How quickly can an offshore team start?",
      a: "An offshore team can start after the required skills, responsibilities, availability, engagement model, and commercial terms are confirmed. The start schedule varies according to project requirements and the team composition needed, so a realistic date is provided after the initial review.",
    },
    {
      q: "Can an offshore team work alongside our existing in-house developers?",
      a: "An offshore team can work alongside your in-house developers through defined responsibilities, shared delivery priorities, agreed communication routines, and coordinated reviews. The collaboration model can support specific technical roles or a broader team without requiring the offshore group to replace your internal engineers.",
    },
    {
      q: "How is progress reported during an engagement?",
      a: "Engagement progress is reported according to an agreed communication and review process. Updates may cover completed work, current priorities, dependencies, identified risks, decisions requiring input, and upcoming activities, giving your stakeholders visibility into delivery without prescribing one reporting tool for every project.",
    },
    {
      q: "What happens if project requirements change mid-engagement?",
      a: "Changed project requirements are reviewed for their effect on delivery, scope, schedule, responsibilities, and commercial terms. Fixed bid changes require formal scope review, while Time and Material and Dedicated Team engagements allow priorities to be adjusted within the agreed operating model.",
    },
    {
      q: "Who owns the source code and repositories?",
      a: "You own the source code and repositories produced during the engagement, on terms confirmed before work begins. Access permissions, confidentiality expectations, and handoff responsibilities are agreed alongside them, so both parties know what transfers and when.",
    },
    {
      q: "How are developers matched to our technical requirements?",
      a: "Developers are matched by reviewing the required technical skills, relevant experience, project context, responsibilities, collaboration expectations, and engagement model. The matching discussion helps confirm whether the proposed capabilities align with your application, architecture, workflows, and expected contribution to the project.",
    },
    {
      q: "What support is available after release?",
      a: "Post-release support can include agreed monitoring, issue resolution, maintenance, compatibility updates, and continuing feature enhancements. The exact responsibilities, duration, communication process, and commercial terms are confirmed for each engagement based on the released software and your continuing operational requirements.",
    },
    {
      q: "How do we move from an initial discussion to a signed engagement?",
      a: "We begin by discussing your requirements, reviewing the needed capabilities, choosing an engagement model, and confirming the scope and commercial terms. Once responsibilities and working arrangements are agreed, the engagement is signed, and delivery can begin. The timeline depends on the project and approval process.",
    },
  ],
};
