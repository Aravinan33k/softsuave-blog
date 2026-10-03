/**
 * Copy for the "AI Solutions in EdTech" landing page
 * (`/ai-solutions-in-edutech`).
 *
 * The hero is this page's own and is kept as it was. Everything below it — and
 * the page's title, description and schema — follows the live softsuave.com
 * page, which was rebuilt with a new section set (review: "Need to update the
 * entire page, as the sections have been completely changed"). The mapping, in
 * live page order:
 *
 *   client logo strip                                → homepage `Clients`
 *   "Smarter Learning Powered by AI Solutions"       → `edtechOverview`
 *   "Using AI Solutions to revamp EdTech"            → `edtechSolutions` (5)
 *   "The AI Advantage in Modern Education"           → `edtechBenefits` (6)
 *   "Innovative AI Technologies & Approaches"        → `industryTechApproach`
 *   "Real Results: Transforming EdTech with AI"      → `edtechSuccessStories` (3)
 *   "What Our Clients Say About Us"                  → homepage `Testimonials`
 *   "FAQs About EdTech"                              → `edtechFaqs` (16)
 *
 * The copy is the live page's own, verbatim, bar the live copy errors noted
 * where they are corrected (the success-stories block was pasted from the
 * logistics page and still names logistics).
 *
 * The live page also runs an "AI Solutions for Next-Gen Learning & Development"
 * call-to-action strip between the success stories and the testimonials. It is
 * left out, as the eCommerce page leaves out its own: the closing `Contact`
 * band carries the page's enquiry, and the strip is a self-contained dark band
 * that would sit dark-against-dark between its neighbours.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { CardGridContent } from "@/components/landing/industries";
import type { FaqContent } from "@/components/landing/faq";
import type { ProblemsContent } from "@/components/generative-ai/problems";
import type { WorkCarouselContent } from "@/components/home/work-grid";
import { industryHeroBadges, industryEnquiryForm } from "./industry-shared";
import { overviewImage } from "./overview-images";

export const edtechMeta = {
  slug: "ai-solutions-in-edutech",
  path: "/ai-solutions-in-edutech",
  // The live page's <title> and meta description, verbatim.
  title: "Edutech software development company in India",
  description:
    "Edutech software development company creating smart learning platforms, LMS, and digital tools to enhance education and student engagement.",
} as const;

export const edtechHero: HeroContent = {
  titleLines: ["AI-Driven EdTech", "for the Digital Era"],
  body: [
    "Build learning experiences that adapt to the individual student, mark work the moment it is submitted, and give teachers back the hours currently spent on administration. We build EdTech AI that plugs into the LMS you already run.",
    "The gains here are measurable in a way they are not in every sector: completion rates, time-to-mastery, and staff hours reclaimed are all things a platform already tracks, so a model either moves them or it does not.",
  ],
  points: [
    "Adaptive assignments and learning paths",
    "Automated grading and instant feedback",
    "Student progress and risk analytics",
    "Integrates with Moodle, Canvas, Google Classroom",
    "FERPA and GDPR-aligned student data handling",
  ],
  badges: industryHeroBadges,
  form: industryEnquiryForm({
    title: "Plan your EdTech AI build",
    requirementLabel: "What should the system do?",
    requirementPlaceholder:
      "The learning or administrative workflow you want to improve, your LMS and student information systems, learner volumes, and the data rules you operate under.",
    subject: "EdTech AI solutions enquiry",
  }),
  image: {
    src: "/images/four/ind-edtech-hero.webp",
    width: 1200,
    height: 860,
    alt: "Students learning on a digital platform driven by adaptive AI recommendations",
  },
};

/** The live page's industry overview: its six "key areas" are the points. */
export const edtechOverview: OverviewContent = {
  eyebrow: "Industry Overview",
  title: "Smarter Learning Powered by AI Solutions",
  paragraphs: [
    "AI-driven tools revolutionize education with personalized learning, intelligent content generation, and automated assessments. Enhance efficiency, innovation, and engagement through adaptive technology, transforming how students learn and educators teach. The following are six key areas where AI is changing EdTech:",
  ],
  points: [
    "Adaptive Learning for Personalized Education",
    "Automated Grading and Administrative Tasks",
    "AI-Powered Accessibility for Inclusive Learning",
    "Intelligent Resource Optimization for Efficiency",
    "Immersive Learning with AI-Driven Engagement",
    "Predictive Analytics for Data-Driven Decision Making",
  ],
  image: overviewImage("ai-solutions-in-edutech"),
};

/**
 * The live page's five solution tabs: the solution selects, its description
 * fills the panel. These are also the page's offer catalogue in the JSON-LD.
 */
export const edtechSolutions: ProblemsContent = {
  eyebrow: "AI Solutions",
  title: "Using AI Solutions to revamp EdTech",
  body: "AI is transforming education by personalizing learning, automating tasks, & providing intelligent insights. Our AI-driven solutions enhance engagement, streamline operations, and expand possibilities for smarter, more efficient education. Explore our AI solutions for seamless integration today.",
  columns: ["AI solution", "What it does"],
  rows: [
    {
      problem: "AI-Powered Assignment Tools",
      solution:
        "We equip your platform with intelligent assignment generators that personalize tasks based on learning pace, topic relevance, and student ability.",
    },
    {
      problem: "Student Progress Monitoring",
      solution:
        "Gain complete visibility into learner performance through our real-time progress tracking, predictive analytics, and behavior-based academic insight tools.",
    },
    {
      problem: "Automated Chatbots for Student Queries",
      solution:
        "Our AI chatbots instantly respond to student questions, reducing support delays while delivering consistent, accurate, and engaging learning assistance.",
    },
    {
      problem: "AI-Powered Auto-Grading",
      solution:
        "Eliminate manual grading errors with our smart evaluation system that scores assignments using predefined rubrics and adaptive assessment logic.",
    },
    {
      problem: "Study Content Recommendations",
      solution:
        "Deliver tailored content suggestions based on each student’s strengths, weaknesses, and performance using our intelligent recommendation engine.",
    },
  ],
};

export const edtechBenefits: CardGridContent = {
  eyebrow: "Key Benefits",
  title: "The AI Advantage in Modern Education",
  body: "AI transforms education with personalized learning, enhanced accessibility, and smart solutions, helping institutions innovate, improve productivity, and elevate learning experiences. Explore the key benefits shaping the future of education.",
  items: [
    {
      name: "Personalized & Intelligent Learning Experiences",
      icon: "users",
      body: "AI delivers personalized learning and intelligent tutoring, adapting to student needs with real-time guidance, customized study plans, and interactive support for better learning outcomes.",
    },
    {
      name: "Efficient Administration & Seamless Automation",
      icon: "gauge",
      body: "AI streamlines administrative processes, automating scheduling, attendance, and reporting, reducing manual effort, and improving institutional productivity for a more organized educational environment.",
    },
    {
      name: "Instant Feedback, Smart Assessments & Academic Integrity",
      icon: "shield",
      body: "Automated assessments provide instant feedback, while fraud detection ensures academic integrity by identifying plagiarism and maintaining credibility in education.",
    },
    {
      name: "Enhanced Student Engagement & Scalable Content Delivery",
      icon: "layers",
      body: "AI-driven tools enhance student engagement through interactive experiences, while scalable content delivery ensures seamless adaptation for diverse learning needs and institutions.",
    },
    {
      name: "Data-Driven Insights for Smarter Decision-Making",
      icon: "chart",
      body: "AI-powered data insights help educators predict student performance, optimize courses, and improve decision-making for continuous learning improvements.",
    },
    {
      name: "AI for Accessibility & Career Guidance",
      icon: "compass",
      body: "With speech recognition and adaptive tools, AI improves accessibility and inclusivity, while career guidance AI offers tailored academic and professional advice.",
    },
  ],
};

/**
 * The live page's three success stories, each with its published results list
 * as the card's body. The first story publishes no figures, so the section
 * runs as a lane of cards rather than the metric-led `CaseStudies` grid. The
 * artwork is each story's own, from the case-study index.
 *
 * LIVE COPY ERRORS, corrected: the live section was pasted from the logistics
 * page — its heading reads "Real Results: Transforming Logistics with AI" and
 * its intro "reshaping logistics ... and optimized supply chains". Both are
 * corrected to EdTech here ("supply chains" → "learning platforms"). The
 * campus-management story's results also list "55% Enhancement in Remote
 * Learning" twice; it appears once.
 */
export const edtechSuccessStories: WorkCarouselContent = {
  eyebrow: "Success Stories",
  title: "Real Results: Transforming EdTech with AI",
  body: "Discover how our AI-powered solutions are reshaping EdTech, enhancing efficiency, accuracy, and cost-effectiveness. These success stories highlight real-world impact, showcasing smarter & faster operations, and optimized learning platforms.",
  items: [
    {
      title: "AI-Enabled Learning: Smarter Classrooms, Interactive Teaching, and Automated Feedback",
      tag: "AI Learning",
      body: "Enhanced Student Engagement · Improved Writing & Critical Thinking · Seamless Classroom Management · Transformative Learning",
      image: {
        src: "/images/case-studies/education-1.webp",
        alt: "Students on tablets in a classroom guided by an AI teaching assistant",
      },
    },
    {
      title: "A Smarter Approach to Learning: High-Performance LMS for Modern Education",
      tag: "LMS",
      body: "50% Reduction in Administrative Workload · Increased Student Engagement · Enhanced Teaching Efficiency · High-Performance Learning Platform",
      image: {
        src: "/images/case-studies/education-2.webp",
        alt: "High-performance learning management system for modern education",
      },
    },
    {
      title: "Transforming Education with a Cloud-Integrated Campus Management System",
      tag: "Campus Management",
      body: "50% Increase in Operational Efficiency · 60% Improved Decision-Making · 55% Enhancement in Remote Learning · 40% Stronger Data Security & Compliance",
      image: {
        src: "/images/case-studies/education-3.webp",
        alt: "Cloud-integrated campus management system",
      },
    },
  ],
};

/** The live page's sixteen FAQs, questions and answers verbatim. */
export const edtechFaqs: FaqContent = {
  eyebrow: "FAQs",
  title: "FAQs About EdTech",
  body: "Find clear information on our Edutech development services, platform features, and custom solutions.",
  items: [
    {
      q: "Which company develops custom AI Solutions for Edutech?",
      a: "Soft Suave builds custom AI Edutech solutions, enhancing adaptive learning, assessments, and personalized education platforms.",
    },
    {
      q: "What does an Edutech software development company in India typically offer for AI-powered education platforms?",
      a: "Indian Edutech firms offer AI for adaptive learning, auto-grading, analytics, and LMS integration for education platforms.",
    },
    {
      q: "How much does it cost to build an AI-driven EdTech platform or LMS in India?",
      a: "Costs vary widely based on features, scalability, and integration needs, so it is difficult to estimate accurately. Contact our experts for a personalized quote.",
    },
    {
      q: "Can an Edutech development company integrate AI into an existing LMS or school/college management system?",
      a: "Yes, we integrate AI into existing LMS/school systems via APIs for adaptive learning without full rebuilds.",
    },
    {
      q: "What types of EdTech solutions can AI enhance?",
      a: "AI enhances adaptive learning, assessments, attendance tracking, gamification, and analytics in EdTech solutions.",
    },
    {
      q: "How do AI development companies ensure data privacy and compliance when building EdTech solutions?",
      a: "We ensure EdTech AI privacy via GDPR/FERPA compliance, encryption, and anonymized data handling for student safety.",
    },
    {
      q: "What is the difference between traditional EdTech software and AI-powered EdTech software?",
      a: "Traditional EdTech is static; AI-powered EdTech adds personalization, predictive analytics, and automation for better outcomes.",
    },
    {
      q: "How long does it take to build a custom AI-enabled EdTech platform for schools, universities, or training institutes?",
      a: "Timelines depend on complexity, testing, and deployment scope, so it is difficult to estimate precisely. Contact our experts for a tailored timeline.",
    },
    {
      q: "Can small coaching centers and mid-sized EdTech startups also benefit from AI, or is it only for large platforms?",
      a: "Yes, small coaching centers and mid-sized EdTech startups can benefit from AI to drive personalization, enhance learning experiences, and boost operational efficiency.",
    },
    {
      q: "What AI models are commonly used in EdTech applications?",
      a: "EdTech uses GPT tutoring, CV proctoring, predictive analytics, and NLP for adaptive assessments and engagement.",
    },
    {
      q: "How does AI improve learning outcomes for students compared to standard digital learning platforms?",
      a: "AI personalizes content, predicts struggles, and provides real-time feedback, boosting retention 30-50% over standard platforms.",
    },
    {
      q: "What features can be automated using AI in EdTech systems?",
      a: "AI automates grading, assessments, chatbots, content generation, and attendance in EdTech systems efficiently.",
    },
    {
      q: "Do EdTech AI development companies offer teacher-centric tools like curriculum planning or AI lesson assistants?",
      a: "Yes, we offer AI curriculum planners, lesson assistants, and analytics tools for teacher-centric EdTech efficiency.",
    },
    {
      q: "How do you integrate AI with popular EdTech platforms like Moodle, Canvas, Google Classroom, or proprietary LMS systems?",
      a: "We integrate AI via APIs/plugins with Moodle, Canvas, Google Classroom, and other proprietary LMS for seamless enhancement.",
    },
    {
      q: "What engagement models do EdTech AI software development companies in India offer (POCs, dedicated AI teams, full-cycle product development)?",
      a: "EdTech AI software development companies in India offer the following models: POCs, dedicated AI teams, full-cycle development, and agile iterations for platforms.",
    },
    {
      q: "How do you evaluate the right Education AI development company for your needs?",
      a: "Evaluate via portfolio, AI expertise, compliance, cost, and client reviews for your EdTech needs.",
    },
  ],
};
