/**
 * Copy for the "Fintech AI Solutions" landing page (`/fintech-ai-solutions`).
 *
 * The hero is this page's own and is kept as it was. Everything below it — and
 * the page's title, description and schema — follows the live softsuave.com
 * page, which was rebuilt with a new section set (review: "Need to update the
 * entire page, as the sections have been completely changed"). The mapping, in
 * live page order:
 *
 *   "AI Solutions for Fintech Innovation"               → `fintechSolutions` (10)
 *   "Fintech AI Development Services Soft Suave Offers" → `fintechServices` (15)
 *   "Our Fintech AI Solution Development Process"       → `fintechProcess` (11)
 *   "Fintech Sectors We Develop AI Solutions For"       → `fintechSectors` (14)
 *   "Benefits of Fintech AI Solutions for All ..."      → `fintechBenefits` (10)
 *   "Key Features in Fintech AI Solution"               → `fintechFeatures` (10)
 *   "Why Choose Soft Suave for Fintech AI ..."          → `fintechWhyUs`
 *   "Innovative AI Technologies & Approaches"           → `industryTechApproach`
 *   "Transforming FinTech: Proven Results in Action"    → `fintechSuccessStories` (5)
 *   "What Our Clients Say About Us"                     → homepage `Testimonials`
 *   "Frequently Asked Questions"                        → `fintechFaqs` (8)
 *
 * The copy is the live page's own, verbatim, eyebrows included. The live page
 * runs no client logo strip, so this page has none.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { ProcessContent } from "@/components/landing/process";
import type { FaqContent } from "@/components/landing/faq";
import type { ProblemsContent } from "@/components/generative-ai/problems";
import type { WorkCarouselContent } from "@/components/home/work-grid";
import { industryHeroBadges, industryEnquiryForm } from "./industry-shared";
import { overviewImage } from "./overview-images";

export const fintechMeta = {
  slug: "fintech-ai-solutions",
  path: "/fintech-ai-solutions",
  // The live page's <title> and meta description, verbatim.
  title: "Fintech AI Development Services | Custom Fintech AI Solutions",
  description:
    "Drive smarter finance with our secure, scalable Fintech AI development services powering innovation, fraud prevention, and personalized digital experiences.",
} as const;

export const fintechHero: HeroContent = {
  titleLines: ["Fintech AI Development Services", "to Power Digital Innovation"],
  body: [
    "Unlock smarter financial products through AI that works on your own data. We build credit scoring, fraud detection, and customer-facing assistants that run inside your existing core banking, payments, and compliance stack rather than alongside it.",
    "Every model ships with the monitoring, audit trail, and regulatory reporting a financial institution has to be able to show — because in this sector an accurate model you cannot evidence is not a shippable model.",
  ],
  points: [
    "Credit risk, underwriting and fraud models",
    "Real-time transaction monitoring",
    "RegTech and compliance automation",
    "Integrates with core banking via API",
    "ISO/IEC 27001:2022 certified delivery",
  ],
  badges: industryHeroBadges,
  form: industryEnquiryForm({
    title: "Plan your FinTech AI build",
    requirementLabel: "What should the system do?",
    requirementPlaceholder:
      "The decision or workflow you want to automate, the core systems it has to talk to, your data volumes, and the regulations you operate under.",
    subject: "FinTech AI solutions enquiry",
  }),
  image: {
    src: "/images/four/ind-fintech-hero.webp",
    width: 1200,
    height: 860,
    alt: "Financial analysts reviewing AI-driven risk and transaction data on trading screens",
  },
};

/**
 * The live page's ten solution blocks, each a title, a line and an image: the
 * title selects, its line fills the panel. The live illustrations are not in
 * this repo, so each panel wears one of the fintech photographs already here.
 */
export const fintechSolutions: ProblemsContent = {
  eyebrow: "AI Solutions",
  title: "AI Solutions for Fintech Innovation",
  body: "Explore our cutting-edge AI solutions designed to transform fintech operations, enhance security, and unlock new growth opportunities for financial businesses.",
  columns: ["Solution", "What it does"],
  rows: [
    {
      problem: "Intelligent Credit Risk & Underwriting Frameworks",
      solution:
        "AI-driven credit scoring and underwriting accelerate approvals while reducing defaults and bias across portfolios.",
      image: "/images/four/fintech-step-1.webp",
    },
    {
      problem: "Real-Time Fraud Detection & Transaction Monitoring Engines",
      solution:
        "Monitor every transaction in real time, flag anomalies instantly, and stop fraud before it impacts customers.",
      image: "/images/four/fintech-step-6.webp",
    },
    {
      problem: "Conversational AI & Virtual Financial Assistants",
      solution:
        "Deliver 24/7 intelligent support with AI assistants that answer, assist, and guide customers across channels.",
      image: "/images/four/fintech-step-2.webp",
    },
    {
      problem: "Personalized Financial Product Recommendation Platforms",
      solution:
        "Analyze behavior and goals to recommend tailored financial products, boosting conversions and long-term customer loyalty.",
      image: "/images/four/ind-fintech.webp",
    },
    {
      problem: "Algorithmic Trading & Portfolio Optimization Suites",
      solution:
        "Leverage AI strategies that react to markets instantly, optimizing portfolios for returns and controlled risk.",
      image: "/images/four/sec-hero-fintech.webp",
    },
    {
      problem: "Big Data Analytics & Financial Insight Dashboards",
      solution:
        "Turn complex financial data into real-time visual dashboards, empowering faster, smarter decision-making organization-wide.",
      image: "/images/four/fintech-step-5.webp",
    },
    {
      problem: "AI-Powered Compliance & Regulatory Automation (RegTech)",
      solution:
        "Automate monitoring, reporting, and alerts to stay aligned with evolving regulations and audit requirements.",
      image: "/images/four/fintech-step-4.webp",
    },
    {
      problem: "Robotic Process Automation (RPA) with Intelligent Augmentation",
      solution:
        "Combine bots and AI to automate document-heavy workflows, reducing errors and freeing teams for strategic tasks.",
      image: "/images/four/fintech-step-3.webp",
    },
    {
      problem: "Smart Risk Management & Predictive Stress-Testing Systems",
      solution:
        "Simulate scenarios, forecast risks, and stress-test portfolios using predictive models for resilient financial planning.",
      image: "/images/four/sec-hero-fintech.webp",
    },
    {
      problem: "Embedded Finance & Smart Payment Platforms",
      solution:
        "Embed secure, intelligent payments into any journey, enabling smoother checkouts and contextual financial experiences.",
      image: "/images/four/ind-fintech.webp",
    },
  ],
};

export const fintechServices: ServicesContent = {
  eyebrow: "Services We Offer",
  title: "Fintech AI Development Services Soft Suave Offers",
  body: "Soft Suave's AI services empower fintech with intelligent automation, data-driven insights, and enhanced efficiency, shaping the future of financial innovation. Here are some of the major AI-driven services we offer:",
  items: [
    {
      name: "AI Strategy Development",
      body: "We design actionable AI strategies for fintech modernization, ensuring measurable business value, ROI alignment, and seamless digital transformation initiatives.",
    },
    {
      name: "AI & ML Model Development",
      body: "We build, train, and optimize custom AI and machine learning models that automate financial processes, unlock insights, and drive performance.",
    },
    {
      name: "Conversational AI (Chatbots/Assistants)",
      body: "Deploy advanced chatbots and assistants to enhance customer support, automate FAQs, provide personalized recommendations, and streamline financial transactions securely.",
    },
    {
      name: "Predictive Analytics & Business Intelligence",
      body: "Deliver future-ready insights with predictive analytics, helping you forecast trends, minimize risks, and make smarter, data-driven decisions.",
    },
    {
      name: "Real‑Time Fraud Detection & Transaction Monitoring",
      body: "Implement AI systems for real-time fraud detection, suspicious activity alerts, and seamless monitoring of all transactions to protect your business.",
    },
    {
      name: "Credit Risk & Underwriting Automation",
      body: "Automate risk assessment and underwriting with AI to deliver faster, fairer credit decisions and efficiently manage customer eligibility.",
    },
    {
      name: "Algorithmic Trading & Portfolio Optimisation",
      body: "Leverage AI algorithms to optimize trading strategies, maximize ROI, rebalance portfolios in real time, and mitigate market risks.",
    },
    {
      name: "AI‑Powered Compliance & RegTech Solutions",
      body: "Simplify compliance reporting and meet regulatory requirements through AI-powered automation that flags anomalies and supports continuous audits.",
    },
    {
      name: "Big Data Analytics & Visualization",
      body: "Transform finance data into actionable insights using scalable big data analytics, real-time dashboards, and easy-to-understand visualizations.",
    },
    {
      name: "Embedded Finance & AI‑Enabled Payment Platforms",
      body: "Integrate AI-powered payment solutions for seamless embedded finance experiences on any digital platform, boosting efficiency and convenience.",
    },
    {
      name: "RPA with Intelligent Augmentation",
      body: "Streamline operations by combining robotic process automation with intelligent AI, automating repetitive tasks and complex decision workflows.",
    },
    {
      name: "Smart Risk Management & Stress‑Testing Systems",
      body: "Deploy AI-driven systems to assess market risks, conduct advanced stress tests, and ensure robust financial stability for your business.",
    },
    {
      name: "Generative AI for Financial Services",
      body: "Utilize generative AI to automate content generation, synthetic data creation, and unlock new product innovation across financial services.",
    },
    {
      name: "AI Integration & Deployment (MLOps & Governance)",
      body: "Ensure smooth AI integration, deployment, and governance with MLOps, delivering secure, scalable, and compliant fintech AI solutions.",
    },
    {
      name: "Blockchain & Smart Contract Integration",
      body: "Combine AI with blockchain for automated smart contract execution, enhanced security, transparent transactions, and innovative financial services.",
    },
  ],
};

export const fintechProcess: ProcessContent = {
  eyebrow: "Process",
  title: "Our Fintech AI Solution Development Process",
  body: "Discover our streamlined, step-by-step Fintech AI development process designed to deliver secure, innovative, and high-impact financial solutions.",
  steps: [
    {
      n: "01",
      name: "Needs Assessment & Consultation",
      body: "We understand your business, assess needs, and define clear project goals through strategic consultation for targeted AI adoption.",
    },
    {
      n: "02",
      name: "Defining Objectives and Requirements",
      body: "Collaboratively set measurable objectives and technical requirements, ensuring project alignment with your fintech operations and regulatory needs.",
    },
    {
      n: "03",
      name: "Data Collection and Preparation",
      body: "Gather, clean, and structure relevant data, ensuring quality inputs for accurate AI model training and reliable outputs.",
    },
    {
      n: "04",
      name: "Choosing AI Technologies and Tools",
      body: "Select optimal AI frameworks, platforms, and tools tailored to your project’s needs, scalability, and future integration possibilities.",
    },
    {
      n: "05",
      name: "Model Development and Training",
      body: "Build, train, and fine-tune AI models to address specific use cases and maximize prediction accuracy.",
    },
    {
      n: "06",
      name: "Model Evaluation and Testing",
      body: "Rigorously evaluate model performance, test for bias and errors, and validate results against predefined benchmarks.",
    },
    {
      n: "07",
      name: "Integration and Deployment",
      body: "Seamlessly integrate AI solutions with your existing fintech systems, followed by secure and controlled deployment into live environments.",
    },
    {
      n: "08",
      name: "Compliance and Security",
      body: "Implement robust financial compliance measures and security protocols, ensuring your AI solution meets regulatory and data protection standards.",
    },
    {
      n: "09",
      name: "Monitoring and Maintenance",
      body: "Continuously monitor AI system performance, proactively detect issues, and maintain operational stability for long-term reliability.",
    },
    {
      n: "10",
      name: "Solution Design and Development",
      body: "Design intuitive interfaces and workflows, develop custom features, and ensure the solution delivers measurable business value.",
    },
    {
      n: "11",
      name: "Ongoing Support & Optimization",
      body: "Provide ongoing technical support, optimize AI models, and keep solutions updated for continuous improvement and competitive advantage.",
    },
  ],
};

/**
 * The live page's fourteen sector cards. "Mortgage & Lending Institutions" is
 * there too, though its name is not marked up as a heading on the live page.
 */
export const fintechSectors: CardGridContent = {
  eyebrow: "AI in Finance",
  title: "Fintech Sectors We Develop AI Solutions For",
  body: "Explore the diverse fintech sectors we empower with our bespoke AI solutions, transforming operations, customer experience, and risk management industry-wide.",
  items: [
    { name: "Commercial Banks & Credit Unions", body: "Empowering banks with AI for enhanced security, service, and automation." },
    { name: "Insurance Companies & Brokers", body: "Streamlining claims, underwriting, and fraud detection with advanced AI solutions." },
    { name: "Neobanks Operations", body: "Optimizing digital-only banking experiences through smart, automated AI tools." },
    { name: "Capital Markets", body: "Enabling smarter trading, analytics, and compliance for capital market firms." },
    { name: "Investment Management Firms", body: "Delivering data-driven investment insights, portfolio optimization, and automation." },
    { name: "Payment Processing Companies", body: "Securing and accelerating payment processing through AI-powered systems." },
    { name: "P2P Lending & Crowdfunding", body: "Enhancing trust, automation, and risk controls for lending platforms." },
    { name: "Mortgage & Lending Institutions", body: "Accelerating loan approvals, risk analysis, and customer experiences with AI." },
    { name: "Consumer Finance", body: "Driving personalized financial services for improved user satisfaction and retention." },
    { name: "Enterprise Budget Management", body: "Optimizing enterprise budgeting with predictive analytics and intelligent automation." },
    { name: "Cryptocurrency & Blockchain Platforms", body: "Strengthening platform security and analytics with integrated AI innovation." },
    { name: "Banks & Credit Unions", body: "Improving financial strategy, planning, and compliance through AI-driven tools." },
    { name: "Financial Advisory Services", body: "Delivering AI-powered insights for smarter financial planning and advice." },
    { name: "Real Estate Finance", body: "Automating assessments, loan processing, and valuation for real estate finance." },
  ],
};

export const fintechBenefits: CardGridContent = {
  eyebrow: "Key Benefits",
  title: "Benefits of Fintech AI Solutions for All Financial Services",
  body: "AI is transforming fintech with automation, enhanced security, and smarter decision-making. Real-time insights help businesses optimize performance, reduce risks, and elevate customer experiences. Here’s how AI could add value to Fintech.",
  items: [
    {
      name: "Enhanced Decision-Making",
      icon: "compass",
      body: "AI-driven insights for smarter financial decisions and market opportunities.",
    },
    {
      name: "Improved Customer Experience",
      icon: "users",
      body: "AI-powered, personalized financial services for instant engagement and lasting loyalty",
    },
    {
      name: "Operational Efficiency",
      icon: "gauge",
      body: "AI automates tasks, reduces errors, and boosts productivity for teams.",
    },
    {
      name: "Regulatory Compliance",
      icon: "book",
      body: "Ensures compliance with evolving financial regulations and secure operations.",
    },
    {
      name: "Scalability",
      icon: "layers",
      body: "Rapidly scale financial products while maintaining performance and reliability.",
    },
    {
      name: "Fraud Detection and Enhanced Security",
      icon: "shield",
      body: "AI monitors transactions, detecting suspicious activity and safeguarding integrity.",
    },
    {
      name: "Reduced Operational Expenses",
      icon: "coins",
      body: "Automate processes and reduce errors to cut costs and boost innovation",
    },
    {
      name: "Accelerated Transaction Processing",
      icon: "rocket",
      body: "AI speeds up transaction approvals, ensuring faster, seamless operations.",
    },
    {
      name: "Risk Management",
      icon: "chart",
      body: "AI-driven analytics mitigate risks with predictive analysis and real-time monitoring.",
    },
    {
      name: "Data-Driven Innovation",
      icon: "spark",
      body: "Drive new revenue streams and innovative products with emerging fintech trends.",
    },
  ],
};

/** The live page's ten numbered feature cards — each a name with no prose. */
export const fintechFeatures: CardGridContent = {
  eyebrow: "Features",
  title: "Key Features in Fintech AI Solution",
  body: "Discover the advanced features that set our fintech AI solutions apart, delivering unmatched intelligence, automation, security, and seamless integration to drive financial innovation and operational excellence.",
  items: [
    { name: "Real-Time Data Processing & Analytics" },
    { name: "Automated Fraud Detection" },
    { name: "Smart Personalization Engine" },
    { name: "Natural Language Processing (NLP)" },
    { name: "Predictive Risk Assessment" },
    { name: "Self-Learning Algorithms" },
    { name: "Seamless Integration with Banking Systems" },
    { name: "Automated Compliance Monitoring" },
    { name: "Secure Blockchain-Based Transactions" },
    { name: "Performance Dashboard & Visualization Tools" },
  ],
};

export const fintechWhyUs: OverviewContent = {
  eyebrow: "Why Choose Us",
  title: "Why Choose Soft Suave for Fintech AI Development Services",
  paragraphs: [
    "Choose Soft Suave for fintech AI development services - where expert innovation, proven solutions, and client-focused delivery empower your business to thrive in the evolving financial landscape.",
  ],
  // The live section's ten icon cards. Its second card carries a stray emoji
  // placeholder beside the icon, which is dropped.
  pointsVariant: "icons",
  points: [
    "Proven fintech domain expertise",
    "Dedicated AI & ML specialists",
    "End-to-end solution delivery",
    "Agile, collaborative development process",
    "Strong focus on security & compliance",
    "Scalable, future-ready architectures",
    "Custom AI-driven innovations",
    "Transparent communication and project management",
    "Rapid deployment and integration",
    "Comprehensive post-launch support and optimization",
  ],
  image: overviewImage("fintech-ai-solutions"),
};

/**
 * The live page's five success stories. None publishes a figure, so they run
 * as the work lane rather than as metric-led case-study cards: each card's body
 * is its results list. The live carousel's closing "See how AI can fit into
 * your workflow" card becomes the lane's outro; its supporting line speaks of
 * "healthcare processes" and "patient care" (copied from another page), so it
 * is left out rather than carried onto a fintech page.
 */
export const fintechSuccessStories: WorkCarouselContent = {
  eyebrow: "Success Stories",
  title: "Transforming FinTech: Proven Results in Action",
  body: "Explore our real-world success stories & discover how our fintech AI solutions have delivered measurable impact and innovation for diverse financial clients.",
  outro: {
    eyebrow: "Next step",
    line: "See how AI can fit into your workflow",
    // The live "Request a Consultation" button; /contact, as the reviews ask
    // of every consultation CTA.
    cta: { label: "Request a Consultation", href: "/contact" },
  },
  items: [
    {
      title: "Integrating Financial and Healthcare Services in One Platform A Health Subscription Success Story",
      tag: "Health Subscription",
      body: "Seamless Integration of Health & Banking Services · Flexible Subscription Plans for Individuals & Families · Comprehensive Health Benefits with Personalized Care Options · Secure Payment & Easy Member Management · Enhanced User Convenience & Financial Control",
    },
    {
      title: "Automating Fund Management for Smarter Corporate Banking: A Financial Management Success Story",
      tag: "Financial Management",
      body: "Automated Fund Management for Maximized Earnings · Seamless Fixed Deposit Sweeps to Optimize Liquidity · Detailed Financial Insights with Weekly & Monthly Reports · Enhanced User Engagement with an Intuitive Interface · Scalable & Secure Banking Solution for Corporates",
    },
    {
      title: "A Scalable Corporate Banking Platform for Seamless Financial Operations: A SaaS Banking Success Story",
      tag: "SaaS Banking",
      body: "Seamless Management of Corporate Accounts & Transactions · Automated Fund Sweeps to Optimize Cash Flow · Secure & Compliant Payment Processing with Multi-Layer Authentication · Real-Time Loan & Investment Tracking for Better Financial Control · Scalable & Adaptable Banking Solution for Large Enterprises",
    },
    {
      title: "Transforming Digital Transactions with Blockchain-Powered Finance",
      tag: "Blockchain",
      body: "Enhanced Security & Compliance for Digital Currency Transactions · Real-Time Settlements for Faster Fund Transfers · Multi-Token Support for Stablecoins, CBDCs & Utility Tokens · Automated KYC & AML for Regulatory Adherence · Scalable & Future-Ready Financial Platform",
    },
    {
      title: "Empowering Smart Savings with Automated Financial Planning",
      tag: "Savings",
      body: "Automated Savings Transfers for Effortless Financial Management · Group Savings Feature to Encourage Collective Goal Achievement · Seamless Bank API Integration for Secure Transactions · Real-Time Dashboard for Tracking Savings Progress & Rewards · Personalised Saving Challenges with Incentives & Gamification",
    },
  ],
};

export const fintechFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "Frequently Asked Questions",
  body: "Get quick answers to common questions about our fintech AI development services, capabilities, and more.",
  items: [
    {
      q: "How does AI in Fintech ensure compliance with financial regulations like GDPR, PCI-DSS, and local finance laws?",
      a: "AI automates compliance checks, data privacy management, and continuous audits, ensuring adherence to GDPR, PCI-DSS, and finance laws with real-time regulatory framework updates.",
    },
    {
      q: "What programming languages and frameworks are commonly used in AI for Fintech development?",
      a: "Python, Java, and .NET dominate, paired with frameworks like TensorFlow, PyTorch, Scikit-learn, Keras, and ML platforms for scalable, secure Fintech AI solutions.",
    },
    {
      q: "Can AI solutions for fintech be seamlessly integrated with current banking systems and platforms?",
      a: "Yes, AI solutions are designed for seamless integration using APIs, middleware, and robust connectors, ensuring compatibility with legacy banking platforms and modern systems.",
    },
    {
      q: "What are the key applications of AI in finance, and how does it enhance fraud detection in digital payments and financial transactions?",
      a: "AI enables predictive analytics, automation, and real-time fraud detection by identifying suspicious transactions instantly, thus safeguarding digital payments and customer accounts.",
    },
    {
      q: "How does AI improve operational efficiency in neobanks and streamline customer experiences?",
      a: "AI automates workflows, supports personalized assistance, and quickly resolves queries, dramatically improving operational efficiency and elevating user experience in neobanking.",
    },
    {
      q: "What role does AI play in blockchain applications for Fintech, and how does it contribute to secure transactions?",
      a: "AI secures and automates smart contracts, enhances fraud monitoring, and strengthens blockchain transparency, ensuring tamper-proof, auditable, and highly secure Fintech transactions",
    },
    {
      q: "How do AI-powered fraud detection systems save costs and improve ROI in fintech solutions?",
      a: "AI-driven fraud detection minimizes losses, reduces manual investigation efforts, and optimizes operational expenses, directly improving ROI in fintech operations.",
    },
    {
      q: "What steps does your company take to ensure the security, compliance, and scalability of AI solutions in fintech development?",
      a: "We implement robust data protection, compliance monitoring, scalable architectures, and thorough testing to deliver secure, compliant, and future-proof Fintech AI solutions.",
    },
  ],
};
