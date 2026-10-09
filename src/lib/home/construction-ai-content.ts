/**
 * Copy for the "AI Solutions for Construction" landing page
 * (`/ai-solutions-for-construction`).
 *
 * The hero is this page's own and is kept as it was. Everything below it — and
 * the page's title, description and schema — follows the live softsuave.com
 * page, which was rebuilt with a new section set (review: "Need to update the
 * entire page, as the sections have been completely changed"). The mapping, in
 * live page order:
 *
 *   client logo strip                                → homepage `Clients`
 *   "Streamlining Construction Through AI"           → `constructionOverview`
 *   "AI Solutions for Safer & Faster Construction"   → `constructionSolutions` (5)
 *   "The AI Advantage in Modern Construction"        → `constructionBenefits` (5)
 *   "Innovative AI Technologies & Approaches"        → `industryTechApproach`
 *   "Transforming Construction: Proven Results ..."   → `constructionSuccessStories` (2)
 *   "Build Smarter with AI Solutions"                → `constructionCta`
 *   "What Our Clients Say About Us"                  → homepage `Testimonials`
 *   "FAQs About Construction"                        → `constructionFaqs` (13)
 *
 * The live page marks up the five solution panels and the five benefits as
 * H2s of their own; they are the items of the two sections above them, and
 * render here as those sections' cards rather than as ten separate sections.
 *
 * The copy is the live page's own, verbatim, except where the live page still
 * carries another industry's wording from the template it was cloned from —
 * each of those corrections is marked where it is made.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { FaqContent } from "@/components/landing/faq";
import type { WorkCarouselContent } from "@/components/home/work-grid";
import { industryHeroBadges, industryEnquiryForm } from "./industry-shared";
import { overviewImage } from "./overview-images";

export const constructionMeta = {
  slug: "ai-solutions-for-construction",
  path: "/ai-solutions-for-construction",
  // The live page's <title> and meta description, verbatim.
  title: "AI Solutions for Construction Applications",
  description:
    "Leverage AI solutions for construction applications to automate workflows, improve resource management, and ensure safer, more efficient project execution.",
} as const;

export const constructionHero: HeroContent = {
  titleLines: ["AI-Driven Innovation", "for the Future of Construction"],
  body: [
    "Redefine on-site efficiency with AI that anticipates risk, optimises workflows, and supports safer, faster, more cost-predictable delivery. We build construction software that works from initial design through to final handover.",
    "Construction is the sector where the cost of finding out late is highest. A schedule slip identified in week four is a resequencing decision; the same slip found in week twenty is a claim.",
  ],
  points: [
    "Scheduling and delay forecasting",
    "Site safety monitoring and risk detection",
    "Resource, procurement and waste optimisation",
    "Document parsing and contract automation",
    "Predictive equipment maintenance",
  ],
  badges: industryHeroBadges,
  form: industryEnquiryForm({
    title: "Plan your construction AI build",
    requirementLabel: "What should the system do?",
    requirementPlaceholder:
      "The project or site problem you want solved, the ERP and project management tools you run, portfolio size, and what site data you already capture.",
    subject: "Construction AI solutions enquiry",
  }),
  image: {
    src: "/images/four/ind-construction-hero.webp",
    width: 1200,
    height: 860,
    alt: "Construction site planning and progress supported by AI monitoring technology",
  },
};

/** The live "Industry Overview" block: its paragraph and six key areas of impact. */
export const constructionOverview: OverviewContent = {
  eyebrow: "Industry Overview",
  title: "Streamlining Construction Through AI",
  paragraphs: [
    "The construction industry is being reshaped with the help of AI, enhancing planning accuracy, minimizing delays, and elevating on-site safety. From initial design to final delivery, AI drives efficiency and precision at every stage. Key areas of impact include:",
  ],
  points: [
    "Predictive Maintenance & Equipment Monitoring",
    "Site Safety & Risk Detection",
    "Project Scheduling & Delay Forecasting",
    "Automated Progress Tracking",
    "Smart Resource Allocation",
    "Quality Control & Defect Detection",
  ],
  image: overviewImage("ai-solutions-for-construction"),
};

/**
 * The live page's five solution panels. Live, they sit behind a tab strip
 * ("Smart Scheduling", "Safety First", "Effortless Inventory", "Futuristic
 * Design", "Zero Downtime") whose labels do not describe the panels they open,
 * so the labels are left off and each panel's own heading names its card.
 */
export const constructionSolutions: ServicesContent = {
  eyebrow: "AI Solution",
  title: "AI Solutions for Safer & Faster Construction",
  body: "Built to meet the demands of modern construction, our AI solutions support safer practices, faster execution, and greater efficiency from start to finish.",
  items: [
    {
      name: "Immersive Property Visualization & Lifecycle Intelligence",
      body: "We offer AI-powered 360-degree virtual property visualization and smart CRM with predictive property lifecycle tracking for dynamic, data-driven customer experiences.",
    },
    {
      name: "AI-Driven Lead Conversion & Sales Forecasting",
      body: "Our AI-based lead engagement system accurately predicts conversion potential while integrating CRM data to streamline property sales pipelines and customer journeys.",
    },
    {
      name: "Smart Document Intelligence & Contract Automation",
      body: "We provide AI-enabled document parsing and a smart contract preview engine that accelerates compliance checks and simplifies deal finalization processes.",
    },
    {
      name: "Automated Task Allocation & Workforce Optimization",
      body: "With a smart delegation engine, tasks are assigned based on resource workload and skills, boosting operational efficiency and real-time decision support.",
    },
    {
      name: "Predictive Project Oversight & Risk Alerting",
      body: "Our AI solutions include cost and deadline estimators, employee productivity tracking, and intelligent alerts for delays, budget overruns, and dependency issues.",
    },
  ],
};

/** The live "Key Benefits" block and its five numbered benefits. */
export const constructionBenefits: CardGridContent = {
  eyebrow: "Key Benefits",
  // Live reads "The AI Advantage in Modern Education" — a copy-paste error
  // from the EdTech page; corrected to this page's industry.
  title: "The AI Advantage in Modern Construction",
  // The live intro is the EdTech page's, pasted whole ("AI transforms
  // education with personalized learning ... helping institutions ...
  // elevate learning experiences"). Only its closing sentence is true of
  // construction, so only that is kept — with "education" corrected, the same
  // copy-paste error as the title — rather than inventing replacement copy.
  body: "Explore the key benefits shaping the future of construction.",
  items: [
    {
      name: "AI-Powered Project Planning & Scheduling",
      icon: "gauge",
      body: "Leverage AI to automate scheduling, resource allocation, and workflow optimization for seamless project delivery.",
    },
    {
      name: "Enhanced Safety & Risk Mitigation",
      icon: "shield",
      body: "AI-driven monitoring and predictive analytics help identify hazards and ensure compliance with safety standards.",
    },
    {
      name: "Reduced Material Waste & Cost Savings",
      icon: "coins",
      body: "Smart resource planning minimizes waste, optimizes procurement, and reduces overall costs.",
    },
    {
      name: "Improved Design Accuracy & Efficiency",
      icon: "target",
      body: "AI-powered simulations and modeling enhance design precision, reducing errors and rework.",
    },
    {
      name: "Predictive Maintenance for Equipment",
      icon: "pulse",
      body: "AI-based monitoring detects potential failures early, ensuring proactive maintenance and reducing downtime.",
    },
  ],
};

/**
 * The live page's two success stories. Their results are outcomes, not
 * figures, so they run as a case-study lane — each card's body is its results
 * list — rather than as metric-led case-study cards.
 */
export const constructionSuccessStories: WorkCarouselContent = {
  eyebrow: "Success Stories",
  // Live reads "Transforming FinTech: Proven Results in Action" — a copy-paste
  // error from the FinTech page; corrected to this page's industry.
  title: "Transforming Construction: Proven Results in Action",
  // Live reads "transformed financial operations" — the same FinTech
  // copy-paste; corrected to "construction operations".
  body: "Explore how our AI-driven solutions have transformed construction operations and delivered measurable results for our clients. These case studies highlight the power of innovation and efficiency in driving business growth.",
  items: [
    {
      title: "CRM Application for Real Estate Management",
      tag: "Real Estate",
      body: "Delivered a 360-degree digital view of real estate properties · Developed separate web apps for internal and external stakeholders · Enabled offline functionality using SQLite for seamless access · Implemented automated loggers to track database changes via cloud functions · Created lightweight iOS apps for real-time activity tracking",
    },
    {
      title: "Job Progress Tracking: Task Completion & Performance Insights",
      tag: "Project Management",
      // Live's last result reads "Scalable & Secure Banking Solution for
      // Corporates" — FinTech copy-paste; "Banking" corrected to "Construction".
      body: "Streamlined project oversight with a unified task management system · Enabled real-time workload tracking and smart task delegation · Detailed Financial Insights with Weekly & Monthly Reports · Enhanced User Engagement with an Intuitive Interface · Scalable & Secure Construction Solution for Corporates",
    },
  ],
};

/** The live page's "Build Smarter with AI Solutions" band. */
export const constructionCta: CtaBandContent = {
  title: "Build Smarter with AI Solutions",
  body: "Reimagine construction with AI solutions built to predict, optimize, and power real-time decisions from ground to completion.",
  // The live band's "Request a Consultation" button; /contact, as the reviews
  // ask of every consultation CTA.
  cta: { label: "Request a Consultation", href: "/contact" },
};

/** The live page's thirteen FAQs, questions and answers verbatim. */
export const constructionFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "FAQs About Construction",
  // Live reads "our Edutech development services" — an EdTech copy-paste
  // error; corrected to this page's industry.
  body: "Find clear information on our Construction development services, platform features, and custom solutions.",
  items: [
    {
      q: "Which company develops custom AI solutions for Construction?",
      a: "Many companies, including Soft Suave, specialize in AI development for construction, offering tailored solutions that optimize project management, enhance safety, and streamline operations using AI-driven tools and technologies.",
    },
    {
      q: "What does a Construction software development company in India do, and how does AI enhance modern construction platforms?",
      a: "A construction software development company builds tools for project management, automation, and resource optimization, integrating AI for predictive maintenance, safety monitoring, and real-time data analytics.",
    },
    {
      q: "How much does it cost to build AI-powered Construction software?",
      a: "The cost of building AI-powered construction software can vary greatly depending on project scope, complexity, and features. It’s difficult to estimate without detailed requirements. To get a precise estimate, please contact our experts.",
    },
    {
      q: "What AI features can be integrated into Construction platforms (predictive analytics, automation, resource optimization)?",
      a: "AI can enhance construction platforms with predictive analytics for project delays, automation for task scheduling, safety monitoring, and resource optimization to reduce costs and improve efficiency.",
    },
    {
      q: "Do Construction AI development companies help modernize existing systems or only build new ones?",
      a: "Construction AI development companies can both modernize existing systems and create new AI-powered solutions, ensuring better integration, scalability, and optimization for modern construction practices.",
    },
    {
      q: "How long does it take to build a custom AI Construction solution from ideation to launch?",
      a: "The timeline for building a custom AI construction solution depends on various factors, such as complexity, resources, and project scope. It's difficult to estimate without specifics. For a precise timeline, please contact our experts.",
    },
    {
      q: "What is the difference between traditional Construction software and AI-powered Construction software?",
      a: "Traditional construction software is rule-based, while AI-powered software uses machine learning and data analytics to predict trends, optimize resources, and improve safety and project management.",
    },
    {
      q: "Can AI improve project efficiency, safety, and resource management in Construction?",
      a: "Yes, AI can significantly enhance project efficiency by optimizing resource management, predicting delays, improving safety protocols, and automating manual tasks, leading to cost savings and faster project completion.",
    },
    {
      q: "How does a Construction AI development company ensure data privacy, safety, and regulatory compliance?",
      a: "A construction AI development company ensures data privacy and safety by adhering to industry regulations, implementing robust encryption methods, and maintaining compliance with standards like GDPR and CCPA.",
    },
    {
      q: "Can AI help with predictive maintenance, risk assessment, and real-time project monitoring?",
      a: "Yes, AI can assist with predictive maintenance by analyzing equipment data, assessing risks by forecasting potential project delays, and providing real-time project monitoring using IoT and machine learning algorithms.",
    },
    {
      q: "How do Construction AI integration services work with legacy systems like ERP or project management tools?",
      a: "AI is integrated with legacy systems using APIs, cloud platforms, and custom-built connectors to enhance data sharing, automation, and decision-making without completely replacing existing systems.",
    },
    {
      q: "What technologies and AI models are commonly used in Construction?",
      a: "Construction AI leverages technologies such as predictive analytics, computer vision for safety and quality checks, natural language processing for document management, and robotics for automation and efficiency.",
    },
    {
      q: "Can small construction companies or startups benefit from AI without a huge budget?",
      a: "Yes, small construction companies can benefit from AI through affordable AI-as-a-service solutions, which offer predictive insights, automation, and resource management tools tailored to their specific needs without a large upfront investment.",
    },
  ],
};
