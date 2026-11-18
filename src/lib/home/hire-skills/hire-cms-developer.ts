/**
 * The `hire-cms-developer` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-cms-developer/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all of them.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { partnerTable } from "../hire-comparison";
import { clientsPageBrands } from "../clients-content";
import { staffCostTestimonials } from "../staff-cost-calculator-content";
import { PLATFORM_ORDER } from "./platform-shared";

/**
 * /hire-cms-developer — softsuave.com's page, word for word. It runs the saas page's layout (clients, why-hire cards,
 * steps, the grouped technical expertise with "View More", services, vetting, comparison) and closes, as the live page
 * does, on the web technologies it links to, the testimonials, the FAQs and the full consultation band. The page's
 * trial is already the 40-hour one, so there is no duration to correct. Live's typos ("TopCMS", "CCompare", "CI/CDP")
 * are kept as written.
 */
export const skill: HireSkill = {
  slug: "hire-cms-developer",
  key: "cms",
  name: "CMS",
  role: "CMS Developers",
  metaTitle: "Hire CMS Developers with a 40 Hour Risk-Free Trial",
  metaDescription:
    "Hire CMS Developers from Soft Suave for remote, on-demand, affordable experts with a 40-hour free trial and secure, scalable, high-performing CMS solutions.",
  serviceType: "CMS development staffing",
  ctaLabel: "Hire CMS developers",

  order: [...PLATFORM_ORDER].map((b) => (b === "expertise" ? "techStack" : b)),

  hero: {
    titleLines: ["Hire CMS Developer", "in India"],
    accent: "CMS Developer",
    titleScale: "home",
    accentGradient: true,
    body: [
      "Soft Suave helps businesses hire CMS developers from India for flexible website management and content-driven platforms. Our experts work in WordPress, Drupal, Joomla, headless CMS, custom themes, integrations, and scalable digital experiences.",
      "See why businesses choose Soft Suave for their CMS developer hiring.",
    ],
    afterPoints: "*Satisfaction Guaranteed – Get 40-hour Free Trial",
    // The live CMS hero carries no partner lockups, and its two buttons are joined by "OR".
    badges: [],
    ctaSeparator: "OR",
    points: ["40-Hour Risk-Free Trial", "Hire Top CMS Developers in India", "Time-Zone & Language Aligned Teams", "Airtight NDA & IP Protection"],
    form: {
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "How Can We Help(Requirement)",
      requirementPlaceholder: "How Can We Help(Requirement)",
      subject: "CMS Developers enquiry",
      alert: sharedHeroAlert,
    },
  },

  // The live band: "Our Clients" over these nineteen marks, in its order.
  clientsBand: {
    eyebrow: "Our Clients",
    logos: clientsPageBrands.logos,
  },

  whyUs: {
    eyebrow: "Why Hire",
    title: "Why Hire CMS Developers from Soft Suave",
    body: "Soft Suave’s experienced CMS experts craft secure, high-performing websites, streamline content workflows, and boost organic traffic. Confidently hire CMS Developers who understand growth-focused digital experiences.",
    links: [{ text: "offshore software service", href: "/offshore-software-development-company" }],
    items: [
      { name: "Pre-vetted CMS Developers", body: "Work with rigorously screened CMS specialists, ensuring faster onboarding, consistent code quality, and reduced hiring risk for every critical release.", icon: "users" },
      { name: "Global delivery standards", body: "Leverage mature global delivery practices, with documented processes, SLAs, and quality benchmarks that keep distributed CMS projects transparent and on schedule.", icon: "globe" },
      { name: "Flexible hiring models", body: "Choose T&M, full-time, or dedicated CMS teams, scaling resources up or down quickly based on roadmap priorities and budget realities.", icon: "gauge" },
      { name: "Time zone flexibility", body: "Collaborate smoothly through overlapping working hours, enabling real-time standups, quick reviews, and near 24/7 progress across continents.", icon: "book" },
      { name: "Strict NDA & IP protection", body: "Every engagement includes strong NDAs and clear IP assignment, safeguarding your codebase, business logic, and sensitive customer data.", icon: "shield" },
      { name: "World-Class Developers at Budget-Friendly Rates", body: "Access CMS talent with enterprise experience while optimizing costs with our offshore software service, without compromising on standards or quality.", icon: "coins" },
    ],
  },

  processLabel: "number",
  process: {
    eyebrow: "Hiring Process",
    title: "Steps to Hire a CMS Developer",
    body: "Move from idea to execution in days with a simple discovery, shortlist, and interview process, then hire Developers who match your tech stack, budget, and launch timelines.",
    steps: [
      { n: "01", name: "Share the JD", body: "Send a detailed JD so our team understands your goals and ideal developer profile." },
      { n: "02", name: "Shortlist The Right Developers", body: "Receive curated, pre-vetted profiles that match your requirements, then quickly choose who to interview." },
      { n: "03", name: "Free 40-hour Trial", body: "Collaborate with your chosen developer, testing skills, communication, and culture fit at zero risk." },
      { n: "04", name: "Onboard & Manage", body: "Seamlessly integrate the developer into your processes while retaining control over tasks, priorities, and communication." },
    ],
  },

  techStackStyle: "rows",
  techStackCollapsedRows: 4,
  hideHeroBreadcrumb: true,
  closingEnquiry: true,
  techStack: {
    eyebrow: "Expertise",
    title: "Technical Expertise of Our CMS Developers",
    body: "From WordPress and Drupal to Magento and headless stacks, our specialists unite backend, frontend, and DevOps expertise to build, scale, and secure complex digital ecosystems that never slow your growth",
    groups: [
      { name: "CMS platforms", items: ["WordPress", "Drupal", "Joomla", "Magento/Adobe Commerce", "Shopify", "WooCommerce", "Strapi", "Contentful", "Hygraph", "dotCMS"] },
      { name: "Backend languages", items: ["PHP", "Node.js", "Python", ".NET", "Java"] },
      { name: "Frontend fundamentals", items: ["HTML5", "CSS3", "JavaScript (ES6+)", "responsive design", "accessibility", "cross-browser compatibility"] },
      { name: "Frontend frameworks", items: ["React", "Vue.js", "Angular", "Next.js", "Nuxt.js"] },
      { name: "Themes & templates", items: ["Custom themes", "child themes", "Twig", "Blade", "Gutenberg", "page builders (Elementor, Divi, WPBakery)"] },
      { name: "Plugins/modules /extensions", items: ["WordPress plugins", "Drupal modules", "Magento extension", "Shopify apps", "WooCommerce extensions"] },
      { name: "Databases", items: ["MySQL", "MariaDB", "PostgreSQL", "SQL Server"] },
      { name: "APIs & integrations", items: ["REST", "GraphQL", "webhooks", "OAuth", "third‑party integrations (CRM, ERP, payments, marketing tools)"] },
      { name: "Headless & JAMstack", items: ["Headless CMS", "API-first CMS", "Gatsby", "static site generators"] },
      { name: "Performance optimization", items: ["Caching", "CDNs", "asset minification", "image optimization", "lazy loading", "Core Web Vitals tuning."] },
      { name: "Security", items: ["SSL/TLS", "OWASP practices", "backups", "role-based access", "security plugins/modules"] },
      { name: "DevOps & deployment", items: ["Git", "CI/CDP", "Docker; Kubernetes", "AWS", "Azure", "GCP", "staging/production workflows"] },
      { name: "SEO & analytics", items: ["On-page SEO", "schema markup", "sitemaps", "Google Analytics", "Google Tag Manager", "Search Console"] },
      { name: "Collaboration & workflow", items: ["Jira", "Trello", "Asana", "agile/scrum", "code reviews", "documentation"] },
    ],
  },

  services: {
    eyebrow: "What We Do",
    title: "CMS Development Services We Offer",
    body: "Power your website lifecycle with end-to-end CMS services, from greenfield builds to migrations, integrations, and continuous optimization that keep content operations lean, secure, and effortlessly scalable.",
    cta: { label: "Talk to Our Experts", href: "/free-quote" },
    items: [
      { name: "Custom CMS Website Development", body: "Design and build fully customized CMS websites tailored to your brand, workflows, and performance goals across devices and channels." },
      { name: "CMS Theme & Template Development", body: "Create pixel-perfect, responsive themes and templates that reflect your brand identity while keeping editing simple for non-technical content teams." },
      { name: "Plugin, Module & Extension Development", body: "Develop custom plugins, modules, and extensions to add advanced features, integrations, and automations without bloating your CMS installation." },
      { name: "CMS Migration & Replatforming", body: "Move from legacy or underperforming platforms to modern CMS solutions with zero data loss, minimal downtime, and preserved SEO quality." },
      { name: "Headless & Composable CMS Implementation", body: "Implement headless CMS architectures powering websites, apps, and devices through APIs, enabling omnichannel content delivery and future-ready digital experiences." },
      { name: "E-commerce CMS Development", body: "Launch and scale e-commerce stores with robust product management, checkout flows, and integrations using leading CMS-based commerce platforms." },
      { name: "CMS Performance Optimization", body: "Optimize speed, caching, databases, and front-end assets so content-heavy sites load fast, rank better, and deliver smoother user experiences." },
      { name: "CMS Security Hardening & Compliance", body: "Harden your CMS with security best practices, monitoring, and updates to reduce vulnerabilities and support compliance requirements." },
      { name: "CMS Integration Services", body: "Connect your CMS with CRMs, ERPs, analytics, marketing automation, and payment gateways for unified data and streamlined operations." },
      { name: "Ongoing CMS Maintenance & Support", body: "Handle updates, bug fixes, backups, minor enhancements, and monitoring so your CMS stays secure, stable, and feature-ready over time." },
    ],
  },

  vettingLabel: "none",
  vetting: {
    eyebrow: "Skill Check",
    title: "How We Vet and Onboard TopCMS Developers",
    body: "Every engineer passes rigorous technical screening, portfolio checks, and culture-fit interviews, so when you hire CMS developers, they integrate quickly into your tools, workflows, and delivery pipelines.",
    steps: [
      { n: "01", name: "Rigorous talent sourcing", body: "Continuously map talent pools and proactively source niche CMS specialists for every critical role." },
      { n: "02", name: "In-depth skill assessment", body: "Validate CMS expertise with coding tasks, architecture reviews, and scenario-based evaluations beyond surface-level resumes." },
      { n: "03", name: "Thinkers & Innovators", body: "Select developers who challenge assumptions, suggest smarter approaches, and bring product-thinking to complex problems." },
      { n: "04", name: "Cultural fit & adaptability", body: "Evaluate communication, collaboration, and cross-cultural awareness to ensure seamless integration with your existing teams." },
    ],
  },

  comparison: {
    ...partnerTable(
      "Choosing the Right CMS Partner for Your Specific Needs",
      "CCompare how each hiring model stacks up: an in-house team, freelancers, and Soft Suave’s experts, using this side-by-side chart to pinpoint the best fit for your business.",
    ),
    eyebrow: "Hiring Guide",
    wideHead: true,
  },

  exploreMore: {
    wideHead: true,
    eyebrow: "Web Innovation",
    title: "Explore More Web Technologies for Your Project",
    body: "Discover related web technologies and find experts in frameworks, tools, and languages to bring your vision to life.",
    items: [
      { name: "React.js Developer", href: "/hire-reactjs-developers" },
      { name: "Angular Developer", href: "/hire-angularjs-developers" },
      { name: "ROR Developer", href: "/hire-ruby-on-rails-developer" },
      { name: "Node.js Developer", href: "/hire-nodejs-developers" },
      { name: "PHP Developer", href: "/hire-php-developers" },
      { name: "Java Developer", href: "/hire-java-developers" },
      { name: "Python Developer", href: "/hire-python-developers" },
      { name: ".Net Developer", href: "/hire-dot-net-developers" },
      { name: "Nest.js Developer", href: "/hire-nestjs-developers" },
      { name: "Django Developer", href: "/hire-django-developer" },
      { name: "Magento Developer", href: "/hire-magento-developer" },
      { name: "MERN Developer", href: "/hire-mern-stack-developers-india" },
      { name: "MEAN Developer", href: "/hire-mean-stack-developers-india" },
      { name: "Drupal Developer", href: "/hire-drupal-developer" },
    ],
  },

  // The live band's two tabs: fourteen web links, then three quality-assurance ones.
  exploreTabs: [
    {
      label: "Web",
      items: [
        { name: "React.js Developer", href: "/hire-reactjs-developers" },
        { name: "Angular Developer", href: "/hire-angularjs-developers" },
        { name: "ROR Developer", href: "/hire-ruby-on-rails-developer" },
        { name: "Node.js Developer", href: "/hire-nodejs-developers" },
        { name: "PHP Developer", href: "/hire-php-developers" },
        { name: "Java Developer", href: "/hire-java-developers" },
        { name: "Python Developer", href: "/hire-python-developers" },
        { name: ".Net Developer", href: "/hire-dot-net-developers" },
        { name: "Nest.js Developer", href: "/hire-nestjs-developers" },
        { name: "Django Developer", href: "/hire-django-developer" },
        { name: "Magento Developer", href: "/hire-magento-developer" },
        { name: "MERN Developer", href: "/hire-mern-stack-developers-india" },
        { name: "MEAN Developer", href: "/hire-mean-stack-developers-india" },
        { name: "Drupal Developer", href: "/hire-drupal-developer" },
      ],
    },
    {
      label: "Quality Assurance",
      items: [
        { name: "Selenium Developer", href: "/hire-selenium-tester" },
        { name: "Cypress Tester", href: "/hire-qa-testers-india" },
        { name: "Manual Testers", href: "/hire-qa-testers-india" },
      ],
    },
  ],

  testimonials: {
    ...staffCostTestimonials,
    eyebrow: "Testimonials",
    title: "What Our Clients Say About Us",
    body: "We've empowered hundreds of clients globally to achieve theirs business goals. Hear firsthand how our expertise and AI-driven solutions have made a difference",
    // Live's order: Tim, Dara, Dimitris, Roland, Aaron.
    items: [1, 2, 3, 4, 0].map((i) => staffCostTestimonials.items[i]),
  },

  faq: {
    eyebrow: "Ask Us",
    title: "FAQs About Hiring CMS Developers",
    body: "Get clear answers on costs, engagement models, tech stacks, and other vital details, so you hire CMS developers with full clarity.",
    items: [
      { q: "How much does it cost to hire a CMS developer?", a: "Costs vary widely by region, experience, engagement model, and project scope, so sharing requirements is essential for an accurate estimate." },
      { q: "Where can you find a CMS Engineer?", a: "Look at vetted talent networks, specialized agencies, freelance marketplaces, LinkedIn, and developer communities focused on WordPress, Drupal, Magento, and headless platforms. You can also partner with Soft Suave to access pre-vetted experts at truly affordable, transparent rates." },
      { q: "What is the hourly rate for a CMS developer in India?", a: "Rates in India are generally lower than in Western markets and depend heavily on seniority, specialization, and engagement structure. Typically, the developers' rates start from $15/hour." },
      { q: "What are the benefits of using vetted talent networks for CMS developers?", a: "You get faster hiring, pre-validated skills, reduced screening overhead, better quality control, and easier scaling or replacement when project needs change." },
      { q: "What are the key steps to defining your needs before hiring a CMS developer?", a: "Clarify business goals, choose a platform, define scope, integrations, budget, timeline, performance targets, and internal responsibilities before starting conversations." },
      { q: "What factors should be evaluated when selecting CMS developer candidates?", a: "Assess platform expertise, portfolio relevance, problem-solving, communication, security, and performance knowledge, plus the ability to collaborate with non-technical stakeholders." },
      { q: "Which technical skills are essential for a qualified CMS developer?", a: "Key skills include major CMS platforms, PHP/JavaScript, HTML/CSS, databases, APIs, theme/plugin development, optimization, security, and SEO/analytics." },
    ],
  },
};
