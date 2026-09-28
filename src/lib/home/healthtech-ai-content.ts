/**
 * Copy for the "AI Solutions in HealthTech" landing page
 * (`/ai-solutions-in-healthtech`).
 *
 * The hero is this page's own and is kept as it was. Everything below it — and
 * the page's title, description and schema — follows the live softsuave.com
 * page, which was rebuilt with a new section set (review: "Need to update the
 * entire page, as the sections have been completely changed"). The mapping, in
 * live page order:
 *
 *   client logo strip                                  → homepage `Clients`
 *   "AI Solutions for Modern HealthTech"               → `healthtechOverview` (6 areas)
 *   "How We Leverage AI to Transform HealthTech"       → `healthtechServices` (5)
 *   "Enhancing HealthTech with AI-Powered ..."         → `healthtechBenefits` (6)
 *   "Innovative AI Technologies & Approaches"          → `industryTechApproach`
 *   "Real-World Impact: AI Transformations in ..."     → `healthtechSuccessStories` (5)
 *   "What Our Clients Say About Us"                    → homepage `Testimonials`
 *   "FAQs About HealthTech"                            → `healthtechFaqs` (13)
 *
 * The copy is the live page's own, verbatim.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { FaqContent } from "@/components/landing/faq";
import type { WorkCarouselContent } from "@/components/home/work-grid";
import { industryHeroBadges, industryEnquiryForm, NDA_NOTE } from "./industry-shared";
import { overviewImage } from "./overview-images";

export const healthtechMeta = {
  slug: "ai-solutions-in-healthtech",
  path: "/ai-solutions-in-healthtech",
  // The live page's <title> and meta description, verbatim.
  title: "Healthtech AI Development Service for Healthcare Solutions",
  description:
    "Healthtech AI development service delivering smart, secure, and scalable solutions to improve patient care and streamline healthcare systems.",
} as const;

export const healthtechHero: HeroContent = {
  titleLines: ["AI Solutions Shaping", "The Future of Healthcare"],
  body: [
    "Automate the administrative load, surface what clinicians need at the point of decision, and give patients a way to get answers without waiting for a callback. We build HealthTech AI that works inside your EHR and your existing clinical workflow.",
    "Healthcare is the sector where a wrong answer has the highest cost, so every system we build keeps a clinician in the loop on clinical decisions and carries the data handling that patient information legally requires.",
  ],
  points: [
    "Patient intake and risk assessment",
    "Clinical analysis, imaging and reporting",
    "Decision support and prescription safety",
    "HIPAA-aligned data handling",
    "Integrates with existing EHR systems",
  ],
  badges: industryHeroBadges,
  form: industryEnquiryForm({
    title: "Plan your HealthTech AI build",
    note: NDA_NOTE,
    requirementLabel: "What should the system do?",
    requirementPlaceholder:
      "The clinical or administrative workflow you want to improve, the EHR and systems it must integrate with, and the regulatory regime you operate under.",
    subject: "HealthTech AI solutions enquiry",
  }),
  image: {
    src: "/images/four/ind-healthtech-hero.webp",
    width: 1200,
    height: 860,
    alt: "Clinical staff reviewing patient data on AI-assisted healthcare monitoring systems",
  },
};

/** The live "Industry Overview": its paragraph and the six key areas it lists, each with an icon. */
export const healthtechOverview: OverviewContent = {
  eyebrow: "Industry Overview",
  title: "AI Solutions for Modern HealthTech",
  paragraphs: [
    "The HealthTech industry is rapidly evolving with AI-driven innovations. From automating administrative tasks to enhancing diagnostics and predictive analytics, AI is improving efficiency, accuracy, and patient care. By leveraging intelligent workflows, AI is transforming HealthTech operations for better outcomes. These are some of the key areas where AI is transforming HealthTech:",
  ],
  points: [
    "Automating Administrative Tasks",
    "Enhancing Diagnostics",
    "Predicting and Preventing Diseases",
    "Personalizing Treatment Plans",
    "Improving Drug Discovery",
    "Optimizing Patient Care with Virtual Assistants",
  ],
  // The live areas each carry an icon, so they render as icon cards rather
  // than a plain tick list.
  pointsVariant: "icons",
  image: overviewImage("ai-solutions-in-healthtech"),
};

/**
 * The live page's five AI solutions. The live section's "Get In Touch" button
 * has no counterpart here: the services component carries no CTA, and the
 * page closes on the enquiry band.
 */
export const healthtechServices: ServicesContent = {
  eyebrow: "AI Solutions",
  title: "How We Leverage AI to Transform HealthTech",
  body: "AI has the potential to reshape HealthTech by improving efficiency, enhancing decision-making, and automating critical processes. At SoftSuave, we explore AI-driven solutions that can help healthcare providers streamline operations, improve patient care, and optimize workflows.",
  items: [
    {
      name: "AI-Powered Patient Intake and Risk Assessment",
      body: "We help you streamline patient intake, automate pre-consultation data aggregation, and assess health risks early with AI-driven precision.",
    },
    {
      name: "Intelligent Clinical Analysis & Reporting",
      body: "Our solutions analyze medical data, generate detailed reports, and process images and documents with accuracy to support faster diagnoses.",
    },
    {
      name: "Automated Discharge & Virtual Patient Support",
      body: "Our platform automates patient discharge, manages follow-ups, and offers AI-powered virtual assistants for handling common patient questions.",
    },
    {
      name: "Smart Decision Support & Prescription Safety",
      body: "We enable clinical teams with AI that supports real-time decisions and flags prescription errors before they impact patient safety.",
    },
    {
      name: "Optimized Staff Scheduling & Resource Management",
      body: "You can optimize workforce planning and resource allocation through our intelligent scheduling system tailored to dynamic healthcare environments.",
    },
  ],
};

/** The live "Key Benefits" cards; each carries an icon there, so each gets a badge glyph here. */
export const healthtechBenefits: CardGridContent = {
  eyebrow: "Key Benefits",
  title: "Enhancing HealthTech with AI-Powered Intelligent Systems",
  body: "Adopting AI-driven solutions can transform healthcare operations, making them more efficient, accurate, and responsive. AI has the potential to reduce manual effort, enhance patient care, and optimize decision-making across various healthcare processes.",
  items: [
    {
      name: "Improved Efficiency & Automation",
      icon: "gauge",
      body: "AI streamlines administrative tasks, reduces manual workload, and speeds up processes, allowing healthcare professionals to focus more on patient care.",
    },
    {
      name: "Enhanced Diagnostic Accuracy",
      icon: "scan",
      body: "AI-powered imaging and predictive analytics help detect diseases early and improve diagnostic precision, leading to better treatment outcomes.",
    },
    {
      name: "Faster Decision-Making",
      icon: "chart",
      body: "AI analyzes vast amounts of medical data in real-time, enabling doctors to make quick and informed decisions for critical patient cases.",
    },
    {
      name: "Better Patient Engagement",
      icon: "users",
      body: "AI-powered virtual assistants and chatbots provide 24/7 support, schedule appointments, and offer health reminders, improving patient interaction.",
    },
    {
      name: "Cost Savings & Revenue Growth",
      icon: "coins",
      body: "AI reduces operational costs, minimizes errors, and enhances efficiency, leading to increased profitability and better financial management for healthcare providers.",
    },
    {
      name: "Personalized Patient Care",
      icon: "target",
      body: "Machine learning tailors treatments based on individual patient data, ensuring more effective therapies and improved recovery rates.",
    },
  ],
};

/**
 * The live page's five success stories, with the consultation prompt that
 * closes the section there as the lane's closing card.
 *
 * Three of the five stories publish no figure to lead on, so this is the
 * `WorkGrid` lane rather than the metric-led `CaseStudies` grid; each card's
 * body is its live results list, joined with " · ". Titles are the live ones,
 * verbatim (including "Al" for "AI" and the missing space after "Healthcare:").
 */
export const healthtechSuccessStories: WorkCarouselContent = {
  eyebrow: "Success Stories",
  title: "Real-World Impact: AI Transformations in HealthTech",
  body: "Uncover the impact of AI-driven solutions in HealthTech, enhancing efficiency, accuracy, and patient outcomes. These real-world case studies highlight successful implementations and measurable results across the industry.",
  outro: {
    eyebrow: "See how AI can fit into your workflow",
    line: "Discover how our AI solutions can seamlessly integrate into your healthcare processes to enhance efficiency and patient care.",
    // The live "Request a Consultation" button; /contact, as the reviews ask
    // of every consultation CTA.
    cta: { label: "Request a Consultation", href: "/contact" },
  },
  items: [
    {
      title: "Revitalizing Al in Healthcare: A Performance Optimization Success Story",
      tag: "Performance Optimization",
      body: "40% Increase in System Efficiency · 2x Faster Query Execution · 35% Improvement in User Experience · 50% Reduction in System Errors & Crashes",
    },
    {
      title: "Transforming Patient Care: A Communication Enhancement Success Story",
      tag: "Communication Enhancement",
      body: "60% Reduction in Patient Care Coordination Time · 3x Faster Access to Patient Records · 40% Improvement in Doctor Response Time · Significant Reduction in Communication Delays",
    },
    {
      title: "Revolutionizing Digital Healthcare: A Telehealth Success Story",
      tag: "Telehealth",
      body: "Reduced Inefficiencies in Patient Transport & Unnecessary Visits · User-Friendly Interface—Accessible Even for Older Generations · Adopted by 25+ Danish Hospitals · Consistent Growth & Widespread Adoption · Seamless Integration & Data Exchange with Strategic Partners",
    },
    {
      title: "Modernising Virtual Healthcare: An Online Consultation Success Story",
      tag: "Online Consultation",
      body: "24/7 Access to Doctors for Remote Consultation · Seamless Scheduling & Video Call Integration · Encrypted Audio & Video for Secure Communication · Instant ePrescriptions & Medical Report Uploads · Risk-Free, Secure, & Scalable Telehealth Solution",
    },
    {
      title: "Bridging Global Healthcare:A Telehealth Innovation Success Story",
      tag: "Telehealth Innovation",
      body: "Seamless Cross-Border Doctor-Patient Consultations · Highly Secure & Encrypted Video/Audio Calls · Faster Appointment Scheduling & Management · Intuitive User Experience for Patients & Doctors · Expanding Access to Quality Healthcare Worldwide",
    },
  ],
};

export const healthtechFaqs: FaqContent = {
  eyebrow: "FAQs",
  title: "FAQs About HealthTech",
  body: "Access quick facts about our healthtech software services, security standards, and development.",
  items: [
    {
      q: "Which company develops custom AI solutions for HealthTech?",
      a: "Many companies like Soft Suave specialize in custom AI solutions for HealthTech, offering tailored services for healthcare providers to improve diagnostics, patient care, and operational efficiency with AI-driven technologies.",
    },
    {
      q: "What is HealthTech AI development, and how does it help healthcare companies?",
      a: "HealthTech AI development involves creating advanced technologies that use artificial intelligence to enhance healthcare services, improve patient outcomes, and streamline administrative processes, providing better care and efficiency.",
    },
    {
      q: "What are AI healthcare diagnostics, and how do they improve clinical accuracy?",
      a: "AI healthcare diagnostics leverage machine learning algorithms to analyze medical data, improving clinical accuracy by providing early detection, reducing errors, and supporting healthcare providers in making informed decisions.",
    },
    {
      q: "How does AI retinal diagnostics work for early detection of eye diseases?",
      a: "AI retinal diagnostics analyzes retinal images using machine learning models to detect early signs of eye diseases such as diabetic retinopathy, glaucoma, and macular degeneration, facilitating early intervention and better outcomes.",
    },
    {
      q: "What is digital diagnostics in AI retinal scanning, and why is it becoming essential for eye-care providers?",
      a: "Digital diagnostics in AI retinal scanning uses automated systems to analyze retinal images and identify conditions, providing faster, more accurate diagnoses and enabling eye-care providers to offer improved patient care and early detection.",
    },
    {
      q: "Can AI assistants be integrated into existing HealthTech platforms for patient support and clinical workflows?",
      a: "Yes, AI assistants can be integrated into HealthTech platforms to streamline clinical workflows, provide patient support, and enhance operational efficiency through tasks like appointment scheduling, symptom analysis, and patient inquiries.",
    },
    {
      q: "How can HealthTech startups use AI to build diagnostic, monitoring, or virtual-care applications quickly?",
      a: "HealthTech startups can use pre-built AI models and cloud-based solutions to rapidly develop diagnostic, monitoring, and virtual-care applications, reducing development time while ensuring scalability and flexibility in healthcare services.",
    },
    {
      q: "What are the main use cases of AI in healthcare diagnostics today?",
      a: "AI in healthcare diagnostics is primarily used for early detection of diseases, medical imaging analysis, predictive analytics for patient conditions, personalized treatment plans, and automating routine tasks to improve healthcare delivery.",
    },
    {
      q: "How accurate are AI healthcare diagnostic models compared to human specialists?",
      a: "AI healthcare diagnostic models have demonstrated high accuracy, often matching or exceeding human specialists in specific tasks, particularly in areas like medical imaging analysis and predictive diagnostics, though human oversight remains critical.",
    },
    {
      q: "Can AI retinal diagnostic systems be used in remote or low-resource clinical environments?",
      a: "Yes, AI retinal diagnostic systems can be deployed in remote or low-resource environments, providing accessible, cost-effective solutions for eye-care providers in underserved areas with limited infrastructure.",
    },
    {
      q: "What data is required to train AI models for medical diagnostics?",
      a: "AI models for medical diagnostics require large datasets, including annotated medical images, patient health records, lab results, and clinical notes, ensuring diverse and comprehensive data to train accurate and reliable models.",
    },
    {
      q: "How do you ensure compliance, data privacy, and HIPAA standards when building AI HealthTech solutions?",
      a: "Compliance, data privacy, and HIPAA standards are ensured by implementing robust encryption, secure data handling practices, and following regulations for patient information protection throughout the AI development process.",
    },
    {
      q: "What is the cost of developing custom AI diagnostic solutions for healthcare or digital health startups?",
      a: "The cost of developing custom AI diagnostic solutions varies based on project complexity, features, and scale. It's difficult to estimate without specific requirements. To get a precise estimate, please contact our experts.",
    },
  ],
};
