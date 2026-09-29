/**
 * Copy for the "IT Outsourcing Company in India" landing page
 * (`/it-outsourcing-company-india`).
 *
 * The hero keeps its own image, badges, layout and form fields; its text is the
 * live hero's. Everything below it — and the page's title, description and
 * schema — follows the live softsuave.com page, which was rebuilt with a new
 * section set (review: "Need to update the page - lot of sections have changed
 * including the title, description, canonicals, and schemas"). The mapping, in
 * live page order:
 *
 *   "What Does an IT Outsourcing Company in India Do?"   → `itoOverview`
 *   "IT Outsourcing Services We Provide"                 → `itoServices` (8)
 *     + "Discuss Your IT Outsourcing Requirements"       → `itoServicesCta`
 *   "When IT Outsourcing to India Makes Sense"           → `itoFit`
 *   "How Does India Compare With Other IT ... ?"         → `itoDestinations`
 *     + the three paragraphs under the table             → `itoDestinationsNotes`
 *   "Choose the Right IT Outsourcing Model"              → `itoModels`
 *   "Not Sure Which Outsourcing Model Fits?"             → `itoMidCta`
 *   "Our IT Outsourcing Process"                         → `itoProcess` (5)
 *   "Collaboration Across Teams and Time Zones"          → `itoCollaboration`
 *   "Industries We Support"                              → `itoIndustries` (6)
 *   "Why Work With Soft Suave?"                          → `itoWhyUs` (6)
 *   "Transforming Ideas with Next-Gen Tech"              → `itoTech`
 *   "Proven Results From IT Outsourcing Engagements"     → `itoCaseStudies` (7)
 *   "What Our Clients Say About Us"                      → homepage `Testimonials`
 *   "Frequently Asked Questions"                         → `itoFaqs` (8)
 *
 * The copy is the live page's own, verbatim; the eyebrows are the live
 * sections' own kicker labels.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { ProcessContent } from "@/components/landing/process";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { ComparisonContent } from "@/components/landing/comparison";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { FaqContent } from "@/components/landing/faq";
import type { WorkCarouselContent } from "@/components/home/work-grid";
import type { InlineLink } from "@/components/common/linkify";
import { sharedHeroAlert, sharedHeroBadges } from "./delivery-shared";
import { overviewImage } from "./overview-images";

export const itoMeta = {
  slug: "it-outsourcing-company-india",
  path: "/it-outsourcing-company-india",
  // The live page's <title> and meta description, verbatim. The title already
  // carries the brand suffix, so the route uses it as-is.
  title: "IT Outsourcing Company in India | Soft Suave",
  description:
    "Work with a leading IT outsourcing company in India for software, AI, QA, and modernization. Compare flexible models and discuss your requirements.",
} as const;

export const itoHero: HeroContent = {
  titleLines: ["IT Outsourcing Company", "in India"],
  body: [
    "Move critical technology initiatives forward with a reliable IT outsourcing company in India. Soft Suave combines software, AI, QA, cloud, and modernization expertise with flexible engagement models shaped around your roadmap, systems, and delivery priorities.",
    "Discuss your scope, delivery responsibilities, and internal capacity before choosing the engagement structure that best fits your specific outsourcing requirement.",
  ],
  points: [
    "Software, AI, QA & Modernization",
    "Flexible Engagement Models",
    "400+ AI & Engineering Specialists",
    "ISO/IEC 27001:2022 Certified",
    "4–6 Hour Global Work Overlap",
  ],
  badges: sharedHeroBadges,
  form: {
    eyebrow: "Business Enquiry",
    // The live hero form's own heading.
    title: "Let's Discuss Your Project",
    submit: "Send requirements",
    sending: "Opening your mail…",
    requirementLabel: "What do you want to outsource?",
    requirementPlaceholder:
      "The initiative, the systems involved, which responsibilities stay in-house, and the timeline you are working to.",
    subject: "IT outsourcing enquiry",
    // The live form's business-only notice (review: "Form needs to be updated").
    alert: sharedHeroAlert,
  },
  image: {
    src: "/images/four/story.webp",
    width: 1400,
    height: 900,
    alt: "Distributed engineering and delivery teams coordinating an outsourced technology programme",
  },
};

export const itoOverview: OverviewContent = {
  image: overviewImage("it-outsourcing-company-india"),
  eyebrow: "Overview",
  title: "What Does an IT Outsourcing Company in India Do?",
  paragraphs: [
    "IT outsourcing assigns defined technology responsibilities to an external partner while the buyer retains agreed strategic and operational control. India offers broad engineering talent, a mature technology ecosystem, flexible engagement options, and working-hour overlap for global collaboration.",
    "Soft Suave is an IT outsourcing company in India offering complete project outsourcing, dedicated development teams, and staff augmentation models. Businesses can select a model based on scope, skills, internal capacity, and delivery ownership.",
    "With 13+ years of experience delivering software solutions across industries, Soft Suave provides reliable IT outsourcing support through skilled professionals, clear processes, and open communication. Its teams deliver quality work, reduce technology risks, and help businesses maintain visibility and control throughout the engagement.",
  ],
};

export const itoServices: ServicesContent = {
  eyebrow: "Services",
  title: "IT Outsourcing Services We Provide",
  body: "Our IT outsourcing services cover the engineering capabilities needed to build, improve, test, integrate, and operate business applications. Each engagement is shaped around your objectives, existing technology environment, and preferred ownership structure.",
  items: [
    {
      name: "Custom Software Development",
      body: "Develop custom applications, platforms, and APIs around specific business workflows. We support architecture, development, integration, testing, deployment, and planned improvements across the software lifecycle stages.",
    },
    {
      name: "Product Engineering Services",
      body: "Turn product requirements into maintainable digital solutions through discovery, planning, architecture, feature development, integration, testing, and release support aligned with changing product roadmaps and priorities.",
    },
    {
      name: "Web Application Development",
      body: "Build responsive web applications for customer, employee, and operational workflows. Our teams cover frontend interfaces, backend services, APIs, databases, integrations, testing, deployment, and ongoing enhancements.",
    },
    {
      name: "Mobile Application Development",
      body: "Create native and cross-platform mobile applications for Android and iOS using Swift, Kotlin, Flutter, and React Native, covering architecture, API integration, testing, releases, and improvements.",
    },
    {
      name: "AI Development and Integration",
      body: "Apply AI to appropriate business workflows through custom models, generative AI, intelligent automation, predictive systems, and application integrations, with requirements and implementation boundaries defined during discovery.",
    },
    {
      name: "QA and Software Testing",
      body: "Improve release confidence with functional, integration, regression, performance, and test-automation support. Testing scope, environments, acceptance criteria, defect handling, and reporting are agreed for each engagement.",
    },
    {
      name: "Legacy Modernization and Integration",
      body: "Update aging applications, services, and architectures while protecting critical workflows. Modernization can include code improvement, cloud migration, API enablement, interface renewal, database changes, and system integration.",
    },
    {
      name: "Cloud and DevOps Engineering",
      body: "Support cloud environments, deployment pipelines, infrastructure automation, monitoring, and release practices. Responsibilities are defined according to your platforms, access policies, internal operations, and delivery model.",
    },
  ],
};

/** The live services section's closing line and its "Contact us" button. */
export const itoServicesCta = {
  line: "Discuss Your IT Outsourcing Requirements",
  cta: { label: "Contact us", href: "/contact" },
} as const;

export const itoFit: OverviewContent = {
  eyebrow: "Outsourcing Fit",
  title: "When IT Outsourcing to India Makes Sense",
  paragraphs: [
    "IT outsourcing is suitable when your roadmap requires more delivery capacity, specialist expertise, or a clearer project structure than your internal team can currently provide. It can help you address defined technology priorities without treating permanent recruitment as the only option.",
    "Consider an India-based IT outsourcing partner when:",
  ],
  points: [
    "Your team lacks skills required for a planned initiative.",
    "Delivery priorities exceed available engineering capacity.",
    "A defined project needs agreed ownership and milestones.",
    "Legacy applications require modernization or integration.",
    "Development and testing capacity must expand together.",
    "You need flexible support before committing to internal hiring.",
  ],
  // The live section's closing line, which follows the list.
  pullQuote:
    "The right approach depends on how much responsibility you want to retain and whether the requirement is project-based, role-based, or ongoing.",
  image: {
    src: "/images/four/ito-step-4.webp",
    width: 1200,
    height: 900,
    alt: "Distributed engineering team working across India and global time zones",
  },
};

export const itoDestinations: ComparisonContent = {
  eyebrow: "Global Outsourcing Comparison",
  title: "How Does India Compare With Other IT Outsourcing Destinations?",
  body: "Compare India with other leading IT outsourcing destinations across talent availability, cost positioning, working-hour overlap, and common delivery strengths before choosing the market that best fits your project requirements.",
  /* DELIBERATELY NO `verdict`. The table is the live page's own, one row per
     country, and it is not an argument for India: Mexico wins the working-hour
     row outright and the "Best Suited For" column hands each destination a
     different job. Washing India's row coral would turn an honest matrix into a
     claim a reader can disprove by reading the next row down. */
  columns: ["Cost Positioning", "Engineering Talent", "Working-Hour Alignment", "Best Suited For"],
  rows: [
    {
      area: "India",
      values: [
        "Lower",
        "Very large talent market across web, mobile, cloud, AI, data, QA, and enterprise technologies",
        "Strong UK overlap and partial US overlap with planned schedules",
        "Companies needing multiple engineering roles, broad technology coverage, and scalable delivery teams",
      ],
    },
    {
      area: "Poland",
      values: [
        "Moderate to high",
        "Strong senior engineering and enterprise technology expertise",
        "Strong UK and European overlap; limited US overlap",
        "Complex engineering projects requiring experienced teams and close European collaboration",
      ],
    },
    {
      area: "Mexico",
      values: [
        "Moderate",
        "Growing software and product engineering market",
        "Strong US working-hour alignment",
        "US companies prioritizing real-time collaboration and nearshore delivery",
      ],
    },
    {
      area: "Philippines",
      values: [
        "Lower",
        "Established technology, QA, support, and English-language delivery talent",
        "Limited natural US overlap, often supported through shifted schedules",
        "QA, support, operations, and technology teams requiring strong English communication",
      ],
    },
    {
      area: "Vietnam",
      values: [
        "Lower",
        "Growing engineering market with strong software development capacity",
        "Limited natural US and UK overlap without adjusted schedules",
        "Cost-conscious software development and larger engineering delivery requirements",
      ],
    },
  ],
};

/**
 * The three paragraphs the live comparison runs under its table. The last
 * links to the live blog's provider guide, as the live page does.
 */
export const itoDestinationsNotes: {
  readonly paragraphs: readonly string[];
  readonly links: readonly InlineLink[];
} = {
  paragraphs: [
    "India is often considered when companies need access to several technology skills within the same outsourcing engagement. Its large engineering ecosystem allows businesses to combine roles such as frontend, backend, mobile, cloud, QA, data, and AI engineering without sourcing each capability from a different market.",
    "The right destination still depends on how your team works. Mexico may be more suitable when extensive US working-hour overlap is essential, while Poland can provide closer alignment with European teams. The Philippines is widely used for technology-enabled support and QA functions, while Vietnam continues to expand as a software engineering destination.",
    "For companies evaluating India, the next step is usually selecting the right provider rather than comparing countries. Our guide to the top IT outsourcing companies in India compares providers based on capabilities, engagement options, company size, and suitability for different outsourcing requirements.",
  ],
  links: [
    {
      text: "top IT outsourcing companies in India",
      href: "https://www.softsuave.com/blog/top-it-outsourcing-companies-in-india/",
    },
  ],
};

export const itoModels: ComparisonContent = {
  eyebrow: "Engagement Models",
  title: "Choose the Right IT Outsourcing Model",
  body: "The appropriate model depends on scope clarity, delivery ownership, internal capacity, and how often priorities may change. Compare the working structures before choosing between complete project outsourcing, a dedicated development team, or a staff augmentation arrangement.",
  columns: ["Suitable when", "Working structure"],
  rows: [
    {
      area: "Complete project outsourcing",
      values: [
        "The buyer has a defined product, platform, modernization, or integration requirement",
        "Scope, milestones, responsibilities, and delivery expectations are agreed for the project",
      ],
    },
    {
      area: "Dedicated development team",
      values: [
        "Multiple roles are needed to support an ongoing product roadmap.",
        "A defined team works across the product roadmap with agreed responsibilities and collaboration practices",
      ],
    },
    {
      area: "Staff augmentation",
      values: [
        "The existing team needs one or more additional technical specialists",
        "Selected professionals extend the buyer’s existing engineering capacity",
      ],
    },
  ],
  // The live note under the table.
  verdictNote:
    "Complete project outsourcing fits a clearly bounded outcome with agreed responsibilities. A dedicated software development team suits a continuing roadmap that needs coordinated roles. Staff augmentation adds selected specialists to your existing team.",
};

/** The live consultation band; its button goes to /contact, as the reviews ask of every consultation CTA. */
export const itoMidCta: CtaBandContent = {
  title: "Not Sure Which Outsourcing Model Fits?",
  body: "Share your scope, required skills, internal capacity, and preferred delivery ownership. We’ll review your requirements and recommend whether project outsourcing, a dedicated team, or staff augmentation is the most suitable structure.",
  cta: { label: "Get a free Consultation", href: "/contact" },
};

export const itoProcess: ProcessContent = {
  eyebrow: "Our Process",
  title: "Our IT Outsourcing Process",
  body: "Our process establishes the requirements, working structure, responsibilities, and delivery controls before engineering begins. Each stage reflects the selected engagement model.",
  steps: [
    {
      n: "01",
      name: "Discuss the Requirements",
      body: "Clarify business goals, project scope, required roles, technical constraints, existing systems, expected outcomes, and the responsibilities your internal team will retain.",
    },
    {
      n: "02",
      name: "Select the Engagement Model",
      body: "Choose complete project outsourcing, a dedicated team, or a staff augmentation structure based on ownership, scope stability, internal capacity, and delivery needs.",
    },
    {
      n: "03",
      name: "Confirm Scope and Responsibilities",
      body: "Document deliverables, roles, milestones, dependencies, communication practices, acceptance expectations, and commercial terms so both sides understand how the engagement will operate.",
    },
    {
      n: "04",
      name: "Begin Delivery",
      body: "Establish approved access, communication channels, development environments, repositories, tracking tools, and the delivery workflow required for the agreed scope.",
    },
    {
      n: "05",
      name: "Review and Improve",
      body: "Monitor progress, demonstrate completed work, address risks, review changing priorities, and refine the delivery plan through the agreed governance and change process.",
    },
  ],
};

export const itoCollaboration: OverviewContent = {
  eyebrow: "Global Collaboration",
  title: "Collaboration Across Teams and Time Zones",
  paragraphs: [
    "Global clients using IT outsourcing services in India need clear communication windows, defined decision ownership, shared collaboration tools, and escalation paths established at the start.",
    "To maintain a smooth workflow across time zones, we provide 4–6 hours of working-hour overlap for our clients. Scheduled meetings support planning, reviews, demonstrations, and decisions, while shared tracking systems and written documentation preserve visibility and context outside overlapping hours.",
    "Soft Suave has delivery presence across Chennai, Bengaluru, and the United States. The collaboration structure is defined around the engagement model, stakeholder availability, response expectations, and delivery requirements. Agreed schedules, documentation standards, handoff practices, and escalation routes help distributed teams stay aligned.",
  ],
  image: {
    src: "/images/four/ito-step-3.webp",
    width: 1200,
    height: 900,
    alt: "Team members collaborating on shared delivery documents across time zones",
  },
};

export const itoIndustries: CardGridContent = {
  eyebrow: "Industries",
  title: "Industries We Support",
  body: "Technology requirements differ by industry because workflows, users, integrations, testing priorities, data access, and operational constraints vary. We adapt the delivery approach to the approved requirements of each product and engagement.",
  items: [
    {
      name: "FinTech",
      icon: "coins",
      body: "Our teams develop financial platforms, transaction workflows, integrations, reporting systems, and access-sensitive features that help FinTech businesses improve operations and deliver reliable digital services efficiently.",
    },
    {
      name: "HealthTech",
      icon: "pulse",
      body: "We build health technology platforms supporting patient, provider, scheduling, care, and information workflows, helping HealthTech organizations improve coordination, system connectivity, and digital service delivery processes.",
    },
    {
      name: "EdTech",
      icon: "book",
      body: "Our IT outsourcing services support learning platforms, content delivery, assessments, administration, and integrations, helping EdTech companies improve learner experiences and expand education capabilities across institutions.",
    },
    {
      name: "Logistics",
      icon: "flow",
      body: "Our teams build logistics platforms for shipment management, fleet visibility, field operations, scheduling, tracking, and documentation, helping businesses coordinate activities and improve visibility across locations.",
    },
    {
      name: "Telecom",
      icon: "network",
      body: "We support customer platforms, service workflows, operational systems, integrations, reporting, and modernization initiatives that help telecom businesses improve system connectivity and manage evolving digital requirements.",
    },
    {
      name: "E-commerce",
      icon: "chart",
      body: "We develop storefronts, marketplaces, product catalogs, ordering systems, payment integrations, and fulfillment connections that help Ecommerce businesses improve customer journeys and support daily commerce operations.",
    },
  ],
};

export const itoWhyUs: CardGridContent = {
  eyebrow: "Why Choose Us",
  title: "Why Work With Soft Suave?",
  body: "Soft Suave combines technology experience, multidisciplinary capabilities, flexible delivery structures, and defined controls for outsourced engineering.",
  items: [
    {
      name: "13+ Years of Technology Expertise",
      icon: "layers",
      body: "Apply experience spanning software delivery, product engineering, modernization, integration, testing, cloud, and emerging technologies.",
    },
    {
      name: "400+ AI & Engineering Specialists",
      icon: "users",
      body: "Access capabilities across application development, quality engineering, DevOps, data, AI, and integrations.",
    },
    {
      name: "Flexible Engagement Structures",
      icon: "cycle",
      body: "Choose project outsourcing, a dedicated team, or a staff augmentation model according to scope, ownership, and internal capacity.",
    },
    {
      name: "Information Security Management",
      icon: "shield",
      body: "Work with an ISO/IEC 27001:2022-certified information security management system supporting secure practices across development and delivery.",
    },
    {
      name: "Structured Risk and Delivery Controls",
      icon: "gauge",
      body: "We define ownership, reporting, access, documentation, escalation, and change controls throughout every outsourcing engagement.",
    },
    {
      name: "Global Delivery Presence",
      icon: "globe",
      body: "Soft Suave’s delivery presence spans Chennai, Bengaluru, and the United States for international client engagements.",
    },
  ],
};

/**
 * The live technology marquee, grouped. The live page scrolls one ungrouped
 * run of logos; the set here is exactly the technologies it names.
 */
export const itoTech: TechStackContent = {
  eyebrow: "Technology Stack",
  title: "Transforming Ideas with Next-Gen Tech",
  body: "Our 400+ AI & Engineering specialists specialize in cutting-edge technologies and platforms. Our comprehensive tech stack covers everything from design to testing, ensuring seamless and efficient development.",
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
 * The live page's seven case-study slides, each on its own live artwork
 * (the same files, already committed under `/images/case-studies/`).
 */
export const itoCaseStudies: WorkCarouselContent = {
  eyebrow: "Success Stories",
  title: "Proven Results From IT Outsourcing Engagements",
  body: "See how our IT outsourcing services have helped businesses improve operations, accelerate delivery, strengthen platforms, and achieve measurable outcomes across complex technology projects.",
  items: [
    {
      title: "Smart Movie Ticketing with Real-Time Booking",
      body: "Soft Suave built a smart movie ticketing system with real-time seats, secure payments, and smooth booking.",
      image: { src: "/images/case-studies/on-demand-5.webp", alt: "Smart Movie Ticketing with Real-Time Booking" },
    },
    {
      title: "Area Mapping Solution For A Solar Business",
      body: "Our client offers solar energy solutions focused on home efficiency and sustainable power, helping homeowners save on bills.",
      image: { src: "/images/case-studies/solar-mapping.webp", alt: "Area Mapping Solution For A Solar Business" },
    },
    {
      title: "ParkSafe Community Vehicle Alert App",
      body: "Soft Suave built a smart app to spot suspicious vehicles, send alerts, and boost community safety in real time.",
      image: { src: "/images/case-studies/logistics-3.webp", alt: "ParkSafe Community Vehicle Alert App" },
    },
    {
      title: "Digital Advertising in Public Spaces",
      body: "Soft Suave built a dynamic digital ads platform for real-time content, location targeting, and analytics in public spaces.",
      image: { src: "/images/case-studies/on-demand-1.webp", alt: "Digital Advertising in Public Spaces" },
    },
    {
      title: "Restaurant Workflow Optimization",
      body: "Soft Suave built a smart restaurant system to optimize orders, kitchen flow, and staff coordination for better dining.",
      image: { src: "/images/case-studies/on-demand-3.webp", alt: "Restaurant Workflow Optimization" },
    },
    {
      title: "Optimizing Influencer and Brand Collaborations",
      body: "Soft Suave built a smart platform to streamline influencer-brand ties, automate tasks, and boost engagement with data.",
      image: { src: "/images/case-studies/on-demand-8.webp", alt: "Optimizing Influencer and Brand Collaborations" },
    },
    {
      title: "AI-Powered Multi-Cloud Management",
      body: "Soft Suave built an AI platform to monitor, optimize, and automate multi-cloud setups with speed, security, and savings.",
      image: { src: "/images/case-studies/on-demand-11.webp", alt: "AI-Powered Multi-Cloud Management" },
    },
  ],
};

export const itoFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "Frequently Asked Questions",
  body: "Get clear answers to common questions about IT outsourcing, helping you understand how engagements work and what to consider before choosing the right delivery partner.",
  items: [
    {
      q: "What IT outsourcing services does Soft Suave provide?",
      a: "Soft Suave provides software engineering, web and mobile development, AI, QA, modernization, integration, cloud, and DevOps services. The scope depends on your requirements.",
    },
    {
      q: "How much does IT outsourcing to India cost?",
      a: "The cost depends on scope, required roles, team size, engagement model, integrations, testing, security requirements, and delivery schedule. Project pricing is confirmed after requirements and scope are reviewed.",
    },
    {
      q: "What is the difference between outsourcing and staff augmentation?",
      a: "Outsourcing assigns responsibilities to an external partner. Staff augmentation adds specialists to your team while your organization retains responsibility for priorities and direction.",
    },
    {
      q: "How do outsourced teams collaborate with US/UK or other global companies?",
      a: "Teams collaborate through meetings, tracking tools, documentation, demonstrations, and escalation paths. We can also arrange 4–6 hours of working-hour overlap if needed.",
    },
    {
      q: "How are security and intellectual property handled?",
      a: "Contracts, NDAs, access controls, development practices, and offboarding address security and intellectual property. Soft Suave maintains an ISO/IEC 27001:2022-certified information security management system.",
    },
    {
      q: "Can we begin with one developer or a small team?",
      a: "Yes, start with one developer or a small team and expand later. Eligible engagements may include a 40-hour risk-free trial after engagement suitability is confirmed.",
    },
    {
      q: "How long does it take to begin an outsourcing engagement?",
      a: "The starting timeline depends on requirement clarity, engagement type, skill availability, review, access, and onboarding. We confirm the plan after considering these factors.",
    },
    {
      q: "Should we outsource a project or hire a dedicated team?",
      a: "Choose project outsourcing for clear scope and deliverables. Choose a dedicated team when you need multiple roles to support ongoing development and changing priorities.",
    },
  ],
};
