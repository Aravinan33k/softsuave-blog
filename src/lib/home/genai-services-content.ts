import type { HeroContent } from '@/components/landing/hero';
import type { FaqContent } from '@/components/landing/faq';
import { heroForm } from '@/lib/home/hire-roles/shared';
import { sharedHeroBadges } from '@/lib/home/delivery-shared';

/**
 * /generative-ai-integration-services — softsuave.com's "Generative AI Integration Services" page, word for
 * word: the banner with its quote form, the clients band, the nine services, the eight-step process, the six
 * solutions, the five benefits, the ten industries, the projects band, why choose Soft Suave, the six
 * technologies, the four delivery methods, the testimonials, the eight FAQs and the closing
 * "Book Free Consultation" band. Images are under /images/genai-services.
 */

export const genaiMeta = {
  path: '/generative-ai-integration-services',
  shortTitle: 'Generative AI Integration Services',
  title: 'Generative AI Integration Services: From Pilot to Production',
  description:
    'Transform your operations with Soft Suave’s expert generative AI integration services, designed to streamline workflows & elevate business to the next level.',
} as const;

const IMG = '/images/genai-services';
/** Icons the generative AI integration service page already carries in the repo. */
const OLD = '/images/genai-integration';

export const genaiHero: HeroContent = {
  titleLines: ['Generative AI Integration Services'],
  accent: 'Generative AI',
  titleScale: 'home',
  body: [
    "Unlock business impact with production-grade generative AI integration services that connect your data, tools, and teams into secure, automated, intelligent workflows tailored to your enterprise, from first pilot to large-scale rollout.",
    "Launch your first GenAI integration with Soft Suave - Book your strategy call.",
  ],
  // The strategy-call line is bold on the live page.
  boldBody: [1],
  scrollCue: { label: 'Scroll Down', targetId: 'clients' },
  points: [],
  badges: sharedHeroBadges,
  form: {
    ...heroForm({
      title: "Let's Discuss Your Project",
      requirementLabel: 'How Can We Help (Requirement)',
      requirementPlaceholder: 'How Can We Help(Requirement)',
      subject: 'Generative AI integration services enquiry',
      noEyebrow: true,
    }),
    body: 'Get free rough quote in 24 hrs',
  },
};

/** The live clients heading and standfirst (the homepage band carries other figures). */
export const genaiClients = {
  eyebrow: "Our Clients",
  title: "Preferred AI-Enabled Technology Partner for Startups and SMBs",
  body: "We combine AI-enabled engineering with 13+ years of product development expertise to help clients build scalable AI solutions, automate complex workflows, and integrate systems for measurable business outcomes.",
} as const;

export interface IconCard {
  readonly name: string;
  readonly body: string;
  readonly icon: string;
  /** A label over the name, e.g. "STEP 1". */
  readonly label?: string;
  /** Makes the name a link. */
  readonly href?: string;
}

export const genaiServices = {
  eyebrow: 'Services',
  title: "Generative AI Integration Services We Offer",
  body: "Transform disorganized AI experiments into effective, governed workflows that accelerate production. Utilize our integration services tailored to your existing tools, data stack, and compliance requirements.",
  cta: { label: 'Talk to Our Experts →', href: '/free-quote' },
  items: [
    { name: "GenAI Readiness & Integration Consulting", body: "Assess data, systems, and use cases, then design a practical GenAI roadmap, governance, and integration strategy aligned with your business priorities.", icon: `${OLD}/GAISI1.svg` },
    { name: "API & Model Integration", body: "Connect foundation models and custom APIs into your products, handling authentication, routing, fallbacks, and performance so experiences stay fast and reliable.", icon: `${IMG}/services/GAISI2.svg` },
    { name: "Data Integration & Data Pipelines", body: "Design secure pipelines that clean, transform, and route data into GenAI workloads, ensuring quality, observability, and governance across every integration.", icon: `${IMG}/services/GAISI3.svg` },
    { name: "RAG / Enterprise Knowledge Integration", body: "Implement RAG architectures that combine LLMs with your enterprise knowledge bases, delivering grounded, source-linked answers from internal documents and systems.", icon: `${IMG}/services/GAISI4.svg` },
    { name: "Workflow & Process Integration", body: "Embed GenAI into CRM, ERP, and support workflows so users can trigger, review, and approve AI actions directly inside existing business tools.", icon: `${IMG}/services/GAISI5.svg` },
    { name: "Custom GenAI App Development", body: "Build tailored GenAI applications, assistants, copilots, and automations that match your domain, UX requirements, compliance rules, and performance objectives.", icon: `${OLD}/MASI2.svg` },
    { name: "Fine-tuning & Behavior Tuning", body: "Adapt models to your domain with fine-tuning, prompt engineering, and guardrails so outputs follow policies, voice, and accuracy expectations.", icon: `${IMG}/services/GAISI6.svg` },
    { name: "Chatbot & Virtual Assistant Integration", body: "Integrate conversational agents across web, mobile, and internal tools, combining LLMs with context, routing, and handoff to human teams.​", icon: `${IMG}/services/GAISI7.svg` },
    { name: "Continuous Monitoring & Optimization", body: "Track quality, latency, costs, and safety signals in production, then iterate on prompts, data, and models to keep GenAI performance reliable.", icon: `${IMG}/services/GAISI8.svg` },
  ] as readonly IconCard[],
} as const;

export const genaiProcess = {
  eyebrow: '',
  title: "Our Generative AI Integration Process",
  body: "Move from idea to live production safely with a proven GenAI integration process that connects use cases, data, architecture, and teams into one measurable delivery roadmap.",
  cta: { label: 'Book a Consultation', href: '/30-min-free-consultation' },
  items: [
    { name: "Use-case Discovery and ROI Mapping", body: "Identify high-impact GenAI opportunities, estimate costs and returns, then prioritize use cases with the strongest, fastest business ROI." },
    { name: "Data Audit, Access Design, And Privacy Controls", body: "Audit data sources, classify sensitivity, and design access, encryption, and consent controls that meet enterprise security and regulatory requirements." },
    { name: "Architecture Design (RAG, Guardrails, Workflows)", body: "Define GenAI architecture spanning RAG, guardrails, and workflows so models stay grounded, policy-aligned, and easy to operate at scale." },
    { name: "Integration Build (APIs, Connectors, Automations)", body: "Implement APIs, connectors, and workflow automations that embed GenAI into existing applications, tools, and data platforms without disrupting operations." },
    { name: "Evaluation and Safety Testing (Quality, Cost, Latency)", body: "Measure output quality, safety, latency, and cost, iterating prompts, models, and configs until performance meets enterprise standards." },
    { name: "Pilot Rollout And User Enablement", body: "Launch a focused pilot, train users, collect feedback, and refine workflows so teams adopt GenAI confidently in day-to-day work." },
    { name: "Production Deployment and Monitoring", body: "Harden infrastructure, roll out to production, then continuously monitor usage, performance, and incidents across environments and teams.​" },
    { name: "Optimization, Iteration, and Support", body: "Continuously tune prompts, models, guardrails, and integrations, backed by ongoing support to keep GenAI results accurate, fast, and cost-efficient." },
  ],
};

/** The live solutions intro, with its "AI development services." link. */
export const genaiSolutions = {
  eyebrow: "Offerings",
  title: "Generative AI Solutions We Provide",
  body: [
    'Package your top-priority use cases into ready-to-launch GenAI solutions that plug into existing systems without disrupting current operations with our advanced ',
    { text: 'AI development services.', href: '/ai-development-service' },
  ] as const,
  items: [
    { name: "Smart Document Processing and Extraction", body: "Automatically extract, classify, and summarize data from contracts, forms, and documents so teams replace manual keying with accurate, searchable records.", icon: `${IMG}/solutions/GAIOI1.svg` },
    { name: "Knowledge Assistants For Internal Teams", body: "Give employees an AI knowledge assistant that answers questions from verified internal sources, surfacing policies, SOPs, and documents in seconds.", icon: `${IMG}/solutions/GAIOI2.svg` },
    { name: "Customer Support Automation and Agent Assist", body: "Divert repetitive queries with AI support bots while assisting human agents with suggested replies, summaries, and instant access to customer history.​", icon: `${IMG}/solutions/GAIOI3.svg` },
    { name: "Workflow Intelligence and Approvals", body: "Use AI to route requests, recommend next actions, and automate approvals while keeping human checkpoints, audit trails, and policy compliance intact.", icon: `${IMG}/solutions/GAIOI4.svg` },
    { name: "Compliance and Policy Copilots", body: "Deploy copilots that interpret regulations and internal policies, highlight risks, and guide teams toward compliant actions with documented justifications.", icon: `${IMG}/solutions/GAIOI5.svg` },
    { name: "Decision Intelligence Dashboards and Insights", body: "Power dashboards with GenAI that explain trends, surface anomalies, and convert raw metrics and events into plain-language, decision-ready insights.​", icon: `${IMG}/solutions/GAIOI6.svg` },
  ] as readonly IconCard[],
} as const;

export const genaiBenefits = {
  eyebrow: "Benefits",
  title: "Business Benefits of Generative AI Integration",
  body: "Integrating generative AI transforms businesses by fostering innovation, enhancing efficiency, and driving growth through various impactful benefits. Here are some of the most vital benefits.",
  items: [
    { name: "Faster Cycle Times and Reduced Manual Work", body: "Automate repetitive tasks so teams ship work faster, focus on higher-value activities, and remove bottlenecks from critical workflows.​", icon: `${IMG}/benefits/GAIBI1.svg` },
    { name: "Higher Accuracy With Human-Validated Outputs", body: "Combine AI-generated outputs with human review loops to reduce errors, improve precision, and keep critical decisions aligned with business context.", icon: `${IMG}/benefits/GAIBI2.svg` },
    { name: "Secure Adoption With Governance and Access Controls", body: "Enforce governance, access policies, and audit trails so GenAI usage stays compliant, explainable, and aligned with internal risk frameworks.", icon: `${IMG}/benefits/GAIBI3.svg` },
    { name: "Lower Operational Costs Through Automation", body: "Use GenAI automation to reduce manual effort, limit rework, and free budget for strategic initiatives instead of repetitive operational tasks.", icon: `${IMG}/benefits/GAIBI4.svg` },
    { name: "Better Decisions With Grounded, Explainable Answers", body: "Support decisions with grounded, traceable AI answers that reference real data and can be explained to stakeholders, regulators, and customers.", icon: `${IMG}/benefits/GAIBI5.svg` },
  ] as readonly IconCard[],
} as const;

export const genaiIndustries = {
  eyebrow: "Industries",
  title: "Industries We Support",
  body: "We tackle the unique challenges of each vertical, offering tailored solutions that drive innovation, efficiency, and growth across diverse industries, ensuring your business stays ahead of the competition.",
  items: [
    { name: "Financial Services and Banking", body: "Deploy GenAI for personalized experiences, document automation, risk summaries, and fraud monitoring while meeting strict compliance and audit expectations.", icon: `${IMG}/industries/fintech-12.svg` },
    { name: "Healthcare and Life Sciences", body: "Use GenAI for documentation, knowledge search, patient communication, and research summarization while protecting PHI and regulatory compliance.", icon: `${IMG}/industries/healthcare-12.svg` },
    { name: "Construction", body: "Summarize project documents, RFIs, and safety guidelines; assist site teams with quick answers and progress reporting via GenAI copilots.", icon: `${IMG}/industries/construction-12.svg` },
    { name: "Retail and eCommerce", body: "Power personalized recommendations, AI-assisted merchandising, support automation, and demand-aware content to boost conversions and loyalty across channels.", icon: `${IMG}/industries/eCommerce-12.svg` },
    { name: "Telecom", body: "Support agents, automate troubleshooting flows, and generate tailored offers by combining network data, customer interactions, and GenAI-driven insights.​", icon: `${IMG}/industries/telecom-12.svg` },
    { name: "Insurance", body: "Use GenAI to streamline claims intake, underwriting summaries, policy servicing, and customer communication while maintaining strict regulatory, audit, and data privacy standards.", icon: `${IMG}/industries/insurance-12.svg` },
    { name: "Energy and Utilities", body: "Apply GenAI to asset documentation, incident reports, field instructions, and customer communication, turning complex operational data into actionable insights and safer decisions.", icon: `${IMG}/industries/energy-12.svg` },
    { name: "Aviation", body: "Streamline documentation, maintenance notes, and operational reporting with grounded GenAI assistants while respecting strict safety, compliance, and review processes.​", icon: `${IMG}/industries/aviation-12.svg` },
    { name: "EdTech", body: "Enable AI tutors, content generation, grading assistance, and knowledge search that adapt to learning goals while keeping educator oversight central.", icon: `${IMG}/industries/education-12.svg` },
    { name: "Manufacturing, Supply Chain & Logistics", body: "Optimize planning, documentation, and exception handling with GenAI that summarizes events, predicts issues, and coordinates actions across partners and warehouses.", icon: `${IMG}/industries/manufacture-12.svg` },
  ] as readonly IconCard[],
} as const;

export const genaiProjects = {
  title: "Our Generative AI-Powered Projects",
  body: "See how our real projects turned manual workflows into AI-powered assistants, automation, and insights that deliver visible value in weeks, not years.",
  cta: { label: "Request a Consultation", href: '/30-min-free-consultation' },
} as const;

export const genaiWhy = {
  eyebrow: "Why Choose Us",
  title: "Why Choose Soft Suave for GenAI Integration",
  body: "Soft Suave blends AI engineering, data expertise, and product thinking to design, build, and govern GenAI integrations that align with your roadmap, scale reliably, and deliver measurable business outcomes - not just short-lived proofs of concept. Here’s why we are the best",
  image: { src: `${IMG}/why/why-choose-us-themw.webp`, width: 1563, height: 1563, alt: 'Why choose Soft Suave for GenAI integration' },
  items: [
    { name: "Deep AI and GenAI engineering expertise", body: "Go beyond the prompt. Our generative AI integration services leverage LLMs and neural networks to build custom, high-impact AI solutions.", icon: `${OLD}/why/model_icon_1.svg` },
    { name: "Proven track record across industries", body: "Real-world AI that works. From Fintech to Retail, we deliver generative AI integration services that solve specific vertical challenges.", icon: `${IMG}/why/model_icon_8.svg` },
    { name: "Offshore value with enterprise delivery standards", body: "Get premium AI engineering without the premium price tag. We combine offshore efficiency with rigorous enterprise-grade delivery models.", icon: `${OLD}/why/model_icon_3.svg` },
    { name: "Flexible engagement and scalable teams", body: "Scale your AI roadmap at speed. Our flexible teams adapt to your project needs, ensuring seamless generative AI integration at every stage.", icon: `${IMG}/why/model_icon_7.svg` },
  ] as readonly IconCard[],
} as const;

export const genaiTech = {
  eyebrow: "Technologies",
  title: "Generative AI Integration Technologies We Use",
  body: "We use a modern GenAI tech stack designed to support secure, scalable, and future-ready integrations across diverse enterprise environments.​",
  items: [
    { name: "LLM Orchestration and Routing", body: "Coordinate multiple LLMs and tools, routing each request to the optimal model for cost, latency, capability, and policy constraints." },
    { name: "Vector Search and Knowledge Retrieval", body: "Index enterprise content as embeddings so GenAI retrieves semantically relevant knowledge, powering grounded, context-rich answers and RAG workflows." },
    { name: "Data Processing and Transformation Layer", body: "Cleanse, normalize, and enrich raw data into AI-ready formats, with pipelines that handle scaling, retries, lineage, and governance requirements." },
    { name: "Observability, Evaluation, and Monitoring", body: "Capture logs, metrics, traces, and evaluation signals so teams can debug behaviors, track drift, and continuously improve GenAI reliability." },
    { name: "Security Controls and Governance Tooling", body: "Apply IAM, encryption, policy engines, and audit logging, ensuring GenAI access, prompts, and outputs comply with enterprise security standards." },
    { name: "Deployment and Scalability Layer (Cloud/Hybrid/On-Prem)", body: "Deploy GenAI stacks across cloud, on-prem, or hybrid with automated scaling, resilience, and environment-specific compliance controls." },
  ],
} as const;

export const genaiDelivery = {
  eyebrow: "Approach",
  title: "Our Delivery Methods",
  body: "Our delivery models ensure efficiency, flexibility, and reliable outcomes across changing project priorities and timelines, supporting diverse business needs",
  items: [
    { name: "Offshore Software Development Service", body: "Build and maintain software through a remote team, reducing costs while accessing specialized global expertise.", href: '/offshore-software-development-company' },
    { name: "Software Development Outsourcing Service", body: "Hand over software projects to external specialists, speeding delivery and freeing internal teams for priorities." },
    { name: "IT Staff Augmentation Service", body: "Add external IT professionals to your in-house team, quickly closing skill gaps without permanent hiring overheads.", href: '/it-staff-augmentation-services' },
    { name: "Hire Dedicated Developers Team", body: "Engage a long-term, project-aligned development squad working exclusively for you, ensuring continuity and accountability.", href: '/hire-dedicated-developers' },
  ] as readonly { readonly name: string; readonly body: string; readonly href?: string }[],
} as const;

export const genaiFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "FAQ About Generative AI Integration Services",
  body: "Get clear answers to common questions about generative AI integration services.",
  items: [
    { q: "What monitoring and optimization services are needed after generative AI deployment?", a: "After deployment, teams need telemetry, dashboards, alerts, quality reviews, and periodic tuning of prompts, models, and data pipelines to sustain reliability, safety, and cost-efficiency.​" },
    { q: "How do workflow integration services embed generative AI into CRM, ERP, and support tools?", a: "They connect GenAI via APIs, webhooks, and connectors so users can trigger, review, and approve AI actions directly inside CRM, ERP, and ticketing tools.​" },
    { q: "What is the process for integrating a generative AI chatbot into an existing product?", a: "Here’s how the process usually works: define use cases, connect data sources, design conversation flows, integrate APIs or SDKs, add guardrails, run pilots, then monitor and iterate in production.​" },
    { q: "Which is the best generative AI integration company for enterprise projects?", a: "The best partner understands your domain, offers end-to-end integration capabilities, proves success with case studies, and can meet your security, compliance, and scaling needs.​" },
    { q: "What should I check before hiring a generative AI integration agency?", a: "Verify technical stack, security practices, architecture approach, past GenAI projects, integration experience, engagement models, support terms, and how they measure ROI and adoption.​" },
    { q: "How do generative AI integration services connect AI models with business workflows?", a: "They wrap models behind APIs, orchestrate them with tools and agents, and embed calls into existing workflow steps, approvals, and user interfaces.​" },
    { q: "How long does a typical generative AI integration project take from pilot to production?", a: "Timelines vary by project scope, data readiness, system complexity, and compliance needs, as well as stakeholder alignment, integration depth, and the number of use cases involved." },
    { q: "What is included in generative AI API integration services?", a: "Services usually cover API selection, authentication design, rate-limiting, error handling, logging, testing, security reviews, environment setup, and documentation for your teams." },
  ],
};
