/**
 * Copy for the "AI Solutions for Telecom" landing page
 * (`/ai-solutions-for-telecom`).
 *
 * The hero is this page's own and is kept as it was. Everything below it — and
 * the page's title, description and schema — follows the live softsuave.com
 * page, which was rebuilt with a new section set (review: "Need to update the
 * entire page, as the sections have been completely changed"). The mapping, in
 * live page order:
 *
 *   client logo strip                                → homepage `Clients`
 *   "AI-Powered Telecom: Smarter, Faster, Reliable"  → `telecomIndustryOverview` (6 uses)
 *   "Transforming Connectivity with AI Solutions"    → `telecomSolutions` (5)
 *   "Telecom Meets AI: Innovation Without Limits"    → `telecomBenefits` (6)
 *   "Innovative AI Technologies & Approaches"        → `industryTechApproach`
 *   "From Strategy to Success: Our Success Stories"  → `telecomSuccessStories` (1)
 *   "Experience the Power of AI in Telecom"          → `telecomCta`
 *   "What Our Clients Say About Us"                  → homepage `Testimonials`
 *   "FAQs About Telecom"                             → `telecomFaqs` (12)
 *
 * The copy is the live page's own, verbatim.
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

export const telecomMeta = {
  slug: "ai-solutions-for-telecom",
  path: "/ai-solutions-for-telecom",
  // The live page's <title> and meta description, verbatim.
  title: "Custom AI Telecom Development Company - Soft Suave",
  description:
    "Custom AI telecom development services that transform telecom network with automation, real-time analytics, and enhanced customer engagement.",
} as const;

export const telecomHero: HeroContent = {
  titleLines: ["Enhancing Telecom Efficiency", "with AI"],
  body: [
    "From network optimisation and predictive maintenance to fraud detection and customer service, we build AI that keeps a telecom operation running closer to its capacity and further from its failure modes.",
    "Telecom generates more operational telemetry than almost any other sector. The constraint has never been data — it is having systems that act on it inside the window where acting still prevents the outage.",
  ],
  points: [
    "Network optimisation and traffic management",
    "Predictive maintenance on infrastructure",
    "Automated fault detection and resolution",
    "Fraud detection and revenue assurance",
    "AI-powered customer support and personalisation",
  ],
  badges: industryHeroBadges,
  form: industryEnquiryForm({
    title: "Plan your telecom AI build",
    requirementLabel: "What should the system do?",
    requirementPlaceholder:
      "The network or customer problem you want solved, your OSS/BSS and network management systems, subscriber scale, and the data you already collect.",
    subject: "Telecom AI solutions enquiry",
  }),
  image: {
    src: "/images/four/ind-telecom-hero.webp",
    width: 1200,
    height: 860,
    alt: "Telecom network operations centre monitoring infrastructure with AI-driven analytics",
  },
};

/** The live "Industry Overview": its intro and the six significant uses of AI it lists. */
export const telecomIndustryOverview: OverviewContent = {
  eyebrow: "Industry Overview",
  title: "AI-Powered Telecom: Smarter, Faster, Reliable",
  paragraphs: [
    "AI is transforming the telecom industry by enabling intelligent automation, boosting service reliability, and enhancing overall efficiency to meet growing demands and deliver seamless connectivity. Here are 6 significant uses of AI in this sector:",
  ],
  points: [
    "Intelligent Network Optimization",
    "Proactive Predictive Maintenance",
    "Real-Time Fraud Detection",
    "AI-Powered Virtual Assistants",
    "Personalized Customer Experience Management",
    "Accurate Revenue Assurance Systems",
  ],
  image: overviewImage("ai-solutions-for-telecom"),
};

/**
 * The live page's five AI solutions. Its "Get In Touch" button is not carried:
 * the services grid renders no section CTA, and the page's consultation band
 * and closing enquiry form sit further down.
 */
export const telecomSolutions: ServicesContent = {
  eyebrow: "AI Solutions",
  title: "Transforming Connectivity with AI Solutions",
  body: "The telecom industry is evolving fast, with AI at its core. Our AI solutions optimize networks, automate operations, and enhance customer experiences through predictive analytics, intelligent automation, and innovative data processing for improved efficiency.",
  items: [
    {
      name: "Network Optimization & Predictive Maintenance",
      body: "We optimize network performance and enable predictive maintenance for infrastructure to ensure efficient traffic management and minimal downtime.",
    },
    {
      name: "Automated Fault Detection & Smart Resolution",
      body: "Our AI automates fault detection and resolution processes, reducing manual intervention and speeding up recovery to maintain seamless connectivity.",
    },
    {
      name: "AI-Powered Customer Support & Personalization",
      body: "We enhance user satisfaction through AI-powered customer support and personalized user experiences tailored to individual needs and behaviors.",
    },
    {
      name: "Fraud Detection & Revenue Assurance",
      body: "Using AI, we provide real-time fraud detection, prevention, and intelligent billing for accurate, secure, and assured revenue management.",
    },
    {
      name: "Intelligent Automation & Service Efficiency",
      body: "We leverage AI-driven automation across operations, including billing, network traffic, and maintenance, to boost telecom service speed and efficiency.",
    },
  ],
};

/** The live page's six key benefits; the badge glyphs stand in for its card icons. */
export const telecomBenefits: CardGridContent = {
  eyebrow: "Key Benefits",
  title: "Telecom Meets AI: Innovation Without Limits",
  body: "AI is transforming telecom with unmatched speed, accuracy, and intelligence - automating tasks, personalizing experiences, and helping providers scale, serve better, and innovate fast. Discover six key benefits driving this AI-powered telecom evolution.",
  items: [
    {
      name: "Enhanced Network Performance & Optimization",
      icon: "network",
      body: "Boost overall network performance and traffic efficiency through AI-driven optimization, ensuring faster speeds, lower latency, and improved service quality.",
    },
    {
      name: "Automated Fault Resolution & Cost Reduction",
      icon: "coins",
      body: "AI enables instant fault detection and resolution, minimizing downtime, reducing manual effort, and significantly lowering operational costs.",
    },
    {
      name: "Intelligent Customer Support Services",
      icon: "users",
      body: "Deliver AI-powered customer support that’s fast, adaptive, and consistent, ensuring smoother interactions and boosting customer satisfaction across all channels.",
    },
    {
      name: "Personalized User Experience Delivery",
      icon: "target",
      body: "Leverage AI to offer deeply personalized services based on user behavior, preferences, and data, enhancing engagement and loyalty.",
    },
    {
      name: "Advanced Fraud Detection & Revenue Assurance",
      icon: "shield",
      body: "Detect and prevent fraudulent activities in real-time with AI, while ensuring accurate billing and protecting critical revenue streams.",
    },
    {
      name: "Smart Resource Allocation & Data-Driven Decisions",
      icon: "chart",
      body: "Optimize internal resources and infrastructure with AI insights, enabling smarter, faster decision-making through continuous data analysis and learning.",
    },
  ],
};

/**
 * The live page's one success story. Its results are delivery outcomes rather
 * than figures, so it runs in the work lane rather than the metric-led case
 * study cards; the results list, verbatim, is the card's body.
 */
export const telecomSuccessStories: WorkCarouselContent = {
  eyebrow: "Success Stories",
  title: "From Strategy to Success: Our Success Stories",
  body: "Discover how our AI-driven telecom solutions have transformed challenges into success stories, delivering measurable results and long-term value for our clients.",
  items: [
    {
      title: "Salesforce Telephone App Integration",
      tag: "Telephony",
      body: "Integrated cloud-based telephony with Salesforce using Open CTI. · Enabled instant click-to-dial functionality within Salesforce. · Centralized contact management and call history tracking. · Implemented real-time call actions: transfer, mute/unmute, hold/unhold. · Built responsive UI with Aura and unique extensions for personalized communication.",
    },
  ],
};

/**
 * The live consultation band between the success stories and the
 * testimonials. Its "Request a Consultation" button goes to /contact, as the
 * reviews ask of every consultation CTA.
 */
export const telecomCta: CtaBandContent = {
  title: "Experience the Power of AI in Telecom",
  body: "Consult our experts to streamline your telecom operations, enhance customer experience, and drive innovation with our tailored AI solutions.",
  cta: { label: "Request a Consultation", href: "/contact" },
};

/**
 * The live page's FAQs, verbatim. The live list repeats "What is the difference
 * between Telecom AI development and traditional telecom software development?"
 * twice in a row, word for word; it is carried once, so the page and its
 * FAQPage schema hold 12 distinct questions.
 */
export const telecomFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "FAQs About Telecom",
  body: "Learn about our telecom software solutions, network-focused development, and AI-powered apps.",
  items: [
    {
      q: "Which company develops custom AI solutions for Telecom?",
      a: "Soft Suave specializes in developing custom AI solutions for telecom, focusing on network optimization, customer service automation, predictive maintenance, and improving overall network performance using AI technologies.",
    },
    {
      q: "How much does it cost to build AI-powered Telecom applications?",
      a: "The cost of building AI-powered Telecom applications varies based on features, scale, and customization requirements. As costs can differ widely, it’s best to contact our experts for a detailed estimate.",
    },
    {
      q: "What are the most common AI use cases in Telecom today?",
      a: "Common AI use cases in Telecom include network optimization, predictive maintenance, customer service automation through chatbots, demand forecasting, fraud detection, and personalized customer experiences.",
    },
    {
      q: "How do AI-driven personalized systems work in Telecom platforms?",
      a: "AI-driven personalized systems in Telecom analyze customer data, behavior, and preferences to offer customized services, such as tailored recommendations, plans, and offers, improving customer satisfaction and engagement.",
    },
    {
      q: "Do Telecom companies need to rebuild their platform to integrate AI, or can AI be added on top of existing systems?",
      a: "Telecom companies can often integrate AI on top of existing platforms, enhancing capabilities like customer service, network optimization, and predictive analytics without a complete rebuild.",
    },
    {
      q: "What AI models are used for Telecom features like predictive maintenance, fraud detection, or customer support?",
      a: "AI models commonly used in Telecom include machine learning algorithms for predictive maintenance, anomaly detection models for fraud, and natural language processing (NLP) for automated customer support through chatbots.",
    },
    {
      q: "How long does it take to develop a full AI-powered Telecom platform?",
      a: "The timeline for developing a full AI-powered Telecom platform depends on the complexity, features, and integration needs. It typically takes several months to a year for full development and deployment.",
    },
    {
      q: "What is the difference between Telecom AI development and traditional telecom software development?",
      a: "Telecom AI development focuses on integrating machine learning, automation, and analytics to optimize network operations, predict issues, and personalize services, whereas traditional software development focuses more on infrastructure and static applications.",
    },
    {
      q: "Can AI improve service quality and customer engagement in Telecom platforms?",
      a: "Yes, AI can enhance service quality by predicting network failures, optimizing resource allocation, and personalizing customer interactions, leading to better engagement, improved customer satisfaction, and reduced churn.",
    },
    {
      q: "What are the best AI tools and integrations for Telecom platforms?",
      a: "Best AI tools for Telecom platforms include AI-driven predictive analytics for network optimization, automated customer service chatbots, fraud detection systems, and tools for personalized offers and plan recommendations.",
    },
    {
      q: "Can small Telecom companies use AI affordably without building a full in-house team?",
      a: "Yes, small Telecom companies can use affordable AI solutions by leveraging third-party AI tools, cloud-based services, and AI-as-a-service platforms to enhance operations without needing a large in-house team.",
    },
    {
      q: "How does AI detect usage patterns, network issues, and customer behavior in Telecom?",
      a: "AI detects usage patterns, network issues, and customer behavior by analyzing data from network traffic, customer interactions, and usage logs to predict potential failures, optimize resources, and offer personalized services.",
    },
  ],
};
