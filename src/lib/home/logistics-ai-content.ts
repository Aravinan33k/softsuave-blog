/**
 * Copy for the "AI in Logistics" landing page (`/ai-in-logistics`).
 *
 * The hero is this page's own and is kept as it was. Everything below it — and
 * the page's title, description and schema — follows the live softsuave.com
 * page, which was rebuilt with a new section set (review: "Need to update the
 * entire page content and remove the sections that are no longer required").
 * The mapping, in live page order:
 *
 *   client logo strip                                  → homepage `Clients`
 *   "AI-Powered Precision in Logistics"                → `logisticsOverview` (6 areas)
 *   "Optimizing Logistics with AI Solutions"           → `logisticsSolutions` (5)
 *   "AI Solutions for Seamless Supply Chain Operations" → `logisticsBenefits` (6)
 *   "Innovative AI Technologies & Approaches"          → `industryTechApproach`
 *   "Real Results: Transforming Logistics with AI"     → `logisticsSuccessStories` (3)
 *   "Elevate Logistics with AI-Powered Precision"      → that lane's closing card
 *   "What Our Clients Say About Us"                    → homepage `Testimonials`
 *   "FAQs About Logistics"                             → `logisticsFaqs` (13)
 *
 * The copy is the live page's own, verbatim; the eyebrows are the live
 * sections' own kicker labels.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { FaqContent } from "@/components/landing/faq";
import type { WorkCarouselContent } from "@/components/home/work-grid";
import { industryHeroBadges, industryEnquiryForm, NDA_NOTE } from "./industry-shared";
import { overviewImage } from "./overview-images";

export const logisticsMeta = {
  slug: "ai-in-logistics",
  path: "/ai-in-logistics",
  // The live page's <title> and meta description, verbatim.
  title: "AI in Logistics Development Services for Optimized process",
  description:
    "Leverage AI in logistics development services to optimize operations, and enhance decision-making for a smarter, data-driven supply chain.",
} as const;

export const logisticsHero: HeroContent = {
  titleLines: ["AI in Logistics:", "Transforming Supply Chain Efficiency"],
  body: [
    "Optimise routes, predict demand, and see where every shipment actually is. We build logistics AI that integrates with the WMS, TMS, and ERP systems already running your operation, rather than asking you to replace them.",
    "This is a sector where the returns are unusually easy to verify: fuel, miles, dwell time, on-time delivery, and stock cover are all measured already, so an optimisation either shows up in them or it does not.",
  ],
  points: [
    "Route, load and delivery optimisation",
    "Freight audit and cost control",
    "Real-time tracking with predictive alerts",
    "Demand forecasting and inventory balance",
    "Integrates with WMS, TMS, ERP and fleet systems",
  ],
  badges: industryHeroBadges,
  form: industryEnquiryForm({
    title: "Plan your logistics AI build",
    note: NDA_NOTE,
    requirementLabel: "What should the system do?",
    requirementPlaceholder:
      "The operational problem you want solved, your fleet or network size, the WMS/TMS/ERP systems in use, and the volumes involved.",
    subject: "Logistics AI solutions enquiry",
  }),
  image: {
    src: "/images/four/ind-logistics-hero.webp",
    width: 1200,
    height: 860,
    alt: "Warehouse and freight operations coordinated through AI-driven logistics systems",
  },
};

/** The live page's industry overview: its intro and the six key areas it lists. */
export const logisticsOverview: OverviewContent = {
  eyebrow: "Industry Overview",
  title: "AI-Powered Precision in Logistics",
  paragraphs: [
    "The logistics industry is advancing with automation, data-driven insights, and intelligent decision-making for greater efficiency. From route optimization to predictive analytics, AI streamlines supply chains, while enhancing accuracy, performance, seamless operations, reduced delays, and improved productivity. Here are six key areas where AI is revolutionizing logistics:",
  ],
  points: [
    "Predictive Analytics for Demand Forecasting",
    "Route Optimization & Fleet Management",
    "Warehouse Automation & Robotics",
    "AI-Driven Risk Management",
    "Real-Time Shipment Tracking",
    "Fraud Detection & Security",
  ],
  image: overviewImage("ai-in-logistics"),
};

/**
 * The live page's five solutions. The live section also carries a "Get In
 * Touch" button; `Services` takes no CTA, and the closing enquiry band covers it.
 */
export const logisticsSolutions: ServicesContent = {
  eyebrow: "AI Solutions",
  title: "Optimizing Logistics with AI Solutions",
  body: "AI is transforming logistics by improving productivity, precision, and data-driven insights. From optimizing supply chains to automating operations, our AI solutions help businesses streamline workflows, reduce costs, and accelerate deliveries, ensuring agile, cost-effective, and adaptable supply chains.",
  items: [
    {
      name: "AI-Powered Freight & Cost Optimization",
      body: "Soft Suave delivers automated freight auditing, cost control, and load optimization, ensuring precise billing, minimized expenses, and enhanced logistics efficiency through AI-driven insights.",
    },
    {
      name: "Intelligent Route & Delivery Optimization",
      body: "Our solutions optimize route planning, predict traffic patterns, and improve delivery schedules, reducing delays, cutting fuel costs, and streamlining last-mile logistics.",
    },
    {
      name: "AI-Driven Tracking & Monitoring System",
      body: "We offer real-time shipment visibility, predictive alerts, and advanced incident analytics, enabling proactive logistics management and ensuring operational security.",
    },
    {
      name: "Smart Document & Data Management",
      body: "Soft Suave simplifies document handling, compliance tracking, and analytics-driven reporting, enhancing operational efficiency and accelerating data-driven decision-making.",
    },
    {
      name: "AI-Powered Parking & Fleet Management",
      body: "Our technology improves parking utilization, detects violations, and provides vehicle insights, ensuring seamless fleet operations and optimized space management.",
    },
  ],
};

/** The live page's six "Key Benefits" cards. */
export const logisticsBenefits: CardGridContent = {
  eyebrow: "Key Benefits",
  title: "AI Solutions for Seamless Supply Chain Operations",
  body: "AI is transforming logistics by bringing productivity, intelligence, and automation to every stage of the supply chain. From streamlining operations to enabling smarter decision-making, AI empowers businesses to stay agile and competitive. Here’s how AI is driving the future of logistics:",
  items: [
    {
      name: "AI-Optimized Route Planning & Delivery Schedules",
      icon: "compass",
      body: "Real-time data analysis enhances route efficiency, minimizes delays, reduces fuel consumption, and ensures timely deliveries with intelligent logistics planning.",
    },
    {
      name: "Enhanced Supply Chain Visibility & Predictive Insights",
      icon: "eye",
      body: "Advanced tracking and analytics provide real-time supply chain transparency, automated reporting, and proactive decision-making for better operational control.",
    },
    {
      name: "Intelligent Demand Forecasting & Inventory Management",
      icon: "chart",
      body: "Predictive insights help balance inventory levels, prevent stock fluctuations, and align supply with market demand for optimized resource allocation.",
    },
    {
      name: "AI-Powered Warehouse Automation & Order Fulfillment",
      icon: "cpu",
      body: "Smart automation accelerates order processing, enhances warehouse efficiency, minimizes errors, and speeds up fulfillment for seamless logistics operations.",
    },
    {
      name: "Predictive Maintenance & Risk Management",
      icon: "shield",
      body: "Proactive monitoring detects equipment issues early, prevents downtime, extends fleet lifespan, and strengthens security by identifying fraud and operational risks.",
    },
    {
      name: "Automated Logistics Workflows & Last-Mile Optimization",
      icon: "flow",
      body: "AI automates decision-making, workflow execution, and last-mile delivery planning, ensuring faster, cost-efficient, and customer-centric logistics operations.",
    },
  ],
};

/**
 * The live page's three success stories, each card's body its results list.
 * Only the first publishes figures, so they run in the story lane rather than
 * the metric-led `CaseStudies` grid. The lane's closing card carries the live
 * "Elevate Logistics with AI-Powered Precision" band that follows the stories
 * there; its consultation button goes to /contact, as the reviews ask of every
 * consultation CTA.
 */
export const logisticsSuccessStories: WorkCarouselContent = {
  eyebrow: "Success Stories",
  title: "Real Results: Transforming Logistics with AI",
  body: "Discover how our AI-powered solutions are reshaping logistics, enhancing efficiency, accuracy, and cost-effectiveness. These success stories highlight real-world impact, showcasing smarter & faster operations, and optimized supply chains.",
  outro: {
    eyebrow: "Elevate Logistics with AI-Powered Precision",
    line: "Enhance operational speed, improve accuracy, and drive smarter decision-making with advanced AI solutions for seamless logistics management.",
    cta: { label: "Request a Consultation", href: "/contact" },
  },
  items: [
    {
      title: "Optimizing Global Logistics: A Shipment Tracking Success Story",
      tag: "Shipment Tracking",
      body: "85% Improvement in Logistics Efficiency · 65% Enhanced Real-Time Shipment Tracking · 50% Reduction in Operational Costs · 70% Increase in Team Collaboration · Scalable & Integrated Shipment Management System",
    },
    {
      title: "Enhancing Vehicle Safety: A Smart Parking Success Story",
      tag: "Smart Parking",
      body: "Real-Time Vehicle Safety Alerts via SMS · QR Code-Based Anonymous Incident Reporting · Incentive System for Community Engagement · Reduction in Tickets, Towing, & Parking Violations · Seamless & Secure Vehicle Monitoring Platform",
    },
    {
      title: "Optimizing Logistics: A Scalable Delivery Management Success Story",
      tag: "Delivery Management",
      body: "Real-Time Shipment Tracking & Monitoring · Seamless Barcode & Document Scanning for Loaders · Automated Alerts for Delays & Delivery Issues · Improved Workflow Efficiency Across Logistics Teams · Scalable & Integrated Multi-App Ecosystem",
    },
  ],
};

export const logisticsFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "FAQs About Logistics",
  body: "Review insights into our logistics software development, system features, and service delivery.",
  items: [
    {
      q: "Which company develops custom AI solutions for Logistics?",
      a: "Companies like Soft Suave specialize in developing custom AI solutions for logistics, offering tailored software to optimize supply chain management, improve delivery efficiency, and enhance operational performance.",
    },
    {
      q: "What is Logistics AI Development, and how does it improve supply chain operations?",
      a: "Logistics AI development involves creating AI-driven technologies to optimize supply chain processes, such as demand forecasting, route planning, and warehouse management, leading to increased efficiency, reduced costs, and faster deliveries.",
    },
    {
      q: "How is AI used in logistics and supply chain optimization?",
      a: "AI in logistics helps optimize routes, predict demand, automate inventory management, and improve real-time decision-making, enhancing supply chain efficiency, reducing costs, and ensuring timely deliveries.",
    },
    {
      q: "What types of logistics operations can be automated using AI logistics automation software?",
      a: "AI logistics automation software can automate warehouse operations, inventory tracking, delivery routing, package sorting, fleet management, and order fulfillment, improving operational efficiency and reducing manual errors.",
    },
    {
      q: "What are the most common AI applications in logistics management today?",
      a: "Common AI applications in logistics include route optimization, predictive maintenance, demand forecasting, inventory management, automated sorting, and real-time tracking, all aimed at improving operational efficiency and reducing costs.",
    },
    {
      q: "How does AI help reduce operational costs in logistics companies?",
      a: "AI helps reduce operational costs by optimizing routes to minimize fuel usage, automating repetitive tasks, improving inventory management, and predicting maintenance needs to avoid expensive breakdowns and delays.",
    },
    {
      q: "Can AI improve warehouse automation, picking accuracy, and inventory forecasting?",
      a: "Yes, AI can significantly improve warehouse automation by streamlining picking processes, increasing accuracy through robotics, and enhancing inventory forecasting by predicting demand patterns and adjusting stock levels accordingly.",
    },
    {
      q: "How does predictive analytics improve delivery planning and route optimization?",
      a: "Predictive analytics uses historical data and real-time information to forecast demand, plan delivery routes, and optimize schedules, helping logistics companies reduce delays, lower fuel costs, and improve delivery times.",
    },
    {
      q: "Can AI logistics software integrate with existing WMS, TMS, ERP, or fleet systems?",
      a: "Yes, AI logistics software can integrate with existing Warehouse Management Systems (WMS), Transportation Management Systems (TMS), Enterprise Resource Planning (ERP) software, and fleet management systems through APIs and customized solutions.",
    },
    {
      q: "What technologies are used in logistics AI development (ML, NLP, CV, optimization models)?",
      a: "Technologies used in logistics AI include Machine Learning (ML) for predictive analytics, Natural Language Processing (NLP) for customer support automation, Computer Vision (CV) for item tracking and sorting, and optimization models for route planning and inventory management.",
    },
    {
      q: "How do you ensure data privacy and security when building AI for logistics?",
      a: "Data privacy and security are ensured by implementing encryption, secure data storage, and following industry regulations like GDPR to protect sensitive logistics data and maintain compliance with data protection standards.",
    },
    {
      q: "What is the cost of developing custom AI logistics automation software?",
      a: "The cost of developing custom AI logistics automation software depends on project complexity, features, and scale. Since costs vary widely, it’s best to contact our experts for a tailored estimate based on your requirements.",
    },
    {
      q: "How long does it take to build and deploy an AI solution for logistics?",
      a: "The timeline to build and deploy an AI solution for logistics varies based on project complexity, integration needs, and customization. For a more precise estimate, please contact our experts.",
    },
  ],
};
