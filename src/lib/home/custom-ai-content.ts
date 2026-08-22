/**
 * Copy for the "Custom AI Development Services" landing page
 * (`/custome-ai-developement`).
 *
 * Shapes match the prop types exported by `components/landing/*` — the shared
 * landing-page components — so each section is `<Component content={…} />` with
 * no adapter in between. Kept out of `content.ts` because that file is the
 * homepage's source and is imported by Nav, Footer and every homepage section.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { ProcessContent } from "@/components/landing/process";
import type { CaseStudiesContent } from "@/components/landing/case-studies";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { FaqContent } from "@/components/landing/faq";
import type { FinalCtaContent } from "@/components/landing/final-cta";
import type { TestimonialsContent } from "@/components/landing/testimonials";

export const caMeta = {
  slug: "custome-ai-developement",
  path: "/custome-ai-developement",
  title: "Custom AI Development Services",
  description:
    "Build custom AI solutions around your business data, workflows, and goals — from proof of concept to secure, production-ready deployment.",
} as const;

export const caHero: HeroContent = {
  eyebrow: "Custom AI Development",
  // The last line takes the coral accent.
  titleLines: ["Custom AI Development", "Services"],
  body: [
    "Build custom AI solutions around your business data, workflows, and goals, taking your idea from proof of concept to secure, production-ready deployment.",
    "From strategy to ongoing optimization, every step is built around how your business actually works.",
  ],
  points: [
    "Full-Stack AI Expertise",
    "25× AI-Accelerated Delivery",
    "ISO-Certified Processes",
    "Flexible Engagement Models",
    "13+ Years of Tech Expertise",
  ],
  badges: ["ISO 27001 processes", "NDA on request", "150+ global clients", "Reply in 1 business day"],
  form: {
    eyebrow: "Business Enquiry",
    title: "Get a custom AI project estimate",
    note: "Share your requirements and we come back with a tailored approach, timeline, and estimate. Everything stays under NDA.",
    submit: "Send requirements",
    sending: "Opening your mail…",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "The problem, the data you have, the systems it needs to touch, and what a good outcome looks like.",
    subject: "Custom AI Development enquiry",
  },
};

/** Proof band. `logoSlots` cells are held open for real client logos. */
export const caClients = {
  eyebrow: "Our Clients",
  title: "Trusted by teams running AI in production",
  body: "Thirteen years of delivery across 21+ countries, with AI and engineering teams that scale with the work.",
  proof: [
    { value: "150+", label: "Global Clients" },
    { value: "21+", label: "Countries" },
    { value: "400+", label: "AI & Engineering Specialists" },
    { value: "13+", label: "Years of Experience" },
  ],
  logoSlots: 6,
} as const;

export const caOverview: OverviewContent = {
  eyebrow: "The Short Answer",
  title: "What Are Custom AI Development Services?",
  paragraphs: [
    "Custom AI development services help businesses create tailored AI applications around their data, workflows, systems, and operational goals. These solutions include Generative AI tools, AI agents, RAG and Document AI systems, computer vision applications, and predictive models.",
    "Development can cover initial strategy, proof of concept, full product engineering, model integration and data pipeline development, secure deployment, and ongoing optimization. Unlike off-the-shelf tools, custom AI solutions are designed to fit specific business requirements and existing technology environments.",
  ],
};

export const caOfferings: ServicesContent = {
  eyebrow: "Core Services",
  title: "Custom AI Development Services We Offer",
  body: "Soft Suave develops custom AI solutions across five focused capability areas. Each solution is designed around your business requirements, available data, existing systems, security needs, and expected outcomes.",
  items: [
    {
      name: "Generative AI Development",
      body: "Build custom Generative AI solutions using LLMs to create and transform content, code, and images, supporting copilots, automation, and enterprise applications tailored to specific business needs and workflows at scale.",
    },
    {
      name: "Agentic AI Development",
      body: "Develop Agentic AI solutions that enable autonomous, multi-step workflows with tool use, helping systems plan, reason, act, and coordinate tasks across business applications while maintaining human oversight and operational control.",
    },
    {
      name: "RAG and Document AI Solutions",
      body: "Create RAG and Document AI solutions for retrieval, knowledge access, and document extraction, helping teams find trusted answers, process information, and automate document-heavy workflows securely across enterprise systems and applications.",
    },
    {
      name: "Computer Vision Development",
      body: "Build Computer Vision solutions for detection, OCR, video analysis, and visual inspection, helping businesses recognize patterns, monitor operations, identify anomalies, and improve quality across real-world environments and workflows at scale.",
    },
    {
      name: "Predictive Intelligence Solutions",
      body: "Develop Predictive Intelligence solutions for forecasting, anomaly detection, and recommendations, using historical and real-time data to anticipate outcomes, identify risks, optimize planning, and support smarter decisions across business operations effectively.",
    },
  ],
};

/**
 * Custom vs. off-the-shelf. Rendered as a four-column table from 900px up and
 * as stacked per-option cards below it — see components/custom-ai/comparison.tsx.
 */
export const caComparison = {
  eyebrow: "Decide With Clarity",
  title: "Custom AI Solutions vs. Off-the-Shelf AI Tools",
  body: "Off-the-shelf AI tools suit standard needs and quick deployment, while custom AI solutions support tailored workflows, proprietary data, deeper integrations, control, and scalability.",
  columns: { area: "Comparison Area", custom: "Custom AI Solutions", offTheShelf: "Off-the-Shelf AI Tools" },
  rows: [
    {
      area: "Customization",
      custom: "Built around specific business requirements",
      offTheShelf: "Limited to available features and settings",
    },
    {
      area: "Data usage",
      custom: "Can work with proprietary business data",
      offTheShelf: "Often depends on predefined data structures",
    },
    {
      area: "Integration",
      custom: "Connects with existing systems and workflows",
      offTheShelf: "Integration options may be limited",
    },
    {
      area: "Ownership and control",
      custom: "Greater control over features, data, and deployment",
      offTheShelf: "Controlled mainly by the software provider",
    },
    {
      area: "Scalability",
      custom: "Can evolve with changing business needs",
      offTheShelf: "Scaling depends on the provider’s platform",
    },
    {
      area: "Security",
      custom: "Security controls can be adapted to project needs",
      offTheShelf: "Uses the provider’s standard security model",
    },
    {
      area: "Implementation",
      custom: "Requires discovery, development, and testing",
      offTheShelf: "Usually faster to deploy",
    },
    {
      area: "Best suited for",
      custom: "Unique, complex, or strategic AI requirements",
      offTheShelf: "Common use cases with limited customization",
    },
  ],
} as const;

export const caApproachCta: CtaBandContent = {
  eyebrow: "Talk It Through",
  title: "Not Sure Which AI Approach Is Right for Your Business?",
  body: "Every business has different data, workflows, and goals. Our team will help identify the most suitable AI solution for your needs.",
  cta: { label: "Book a Free Consultation", href: "#enquiry" },
};

export const caWhyUs: CardGridContent = {
  eyebrow: "Why Soft Suave",
  title: "Why Choose Soft Suave for AI Development",
  body: "Soft Suave is a reliable custom AI development company helping businesses turn complex AI ideas into secure, scalable solutions built around real operational needs and measurable outcomes. Here are a few reasons why 150+ clients have chosen to work with us.",
  items: [
    {
      name: "13+ Years of Technology Expertise",
      body: "Over a decade of software development experience gives our AI team the engineering discipline needed to build reliable, production-grade systems.",
    },
    {
      name: "Full-Stack AI Expertise",
      body: "From Generative AI and Agentic AI to Computer Vision and predictive models, we cover the full spectrum of custom AI development.",
    },
    {
      name: "Global Delivery Experience",
      body: "We have delivered AI and software projects for clients across 20+ countries, adapting to different time zones and business requirements.",
    },
    {
      name: "Measurable Business Value",
      body: "Our AI solutions are built to deliver real outcomes, from faster processes to reduced costs, not just working prototypes.",
    },
    {
      name: "Flexible Engagement Models",
      body: "Choose Time and Material for evolving projects or Fixed Bid for defined scopes, with clear terms and delivery commitments included.",
    },
    {
      name: "Secure and Responsible AI Development",
      body: "All projects follow ISO-certified processes, with secure data handling, access controls, and responsible AI practices built into the development lifecycle.",
    },
  ],
};

export const caProcess: ProcessContent = {
  eyebrow: "How We Deliver",
  title: "Our AI-Accelerated Delivery Process",
  body: "We use AI across our own development pipeline, not only in the solutions we build, enabling 25× faster delivery while maintaining quality, security, and engineering control.",
  steps: [
    {
      n: "01",
      name: "AI Pair Programming",
      body: "Developers work alongside AI coding assistants to write, refactor, and debug code faster, speeding up development while maintaining code quality and consistency.",
    },
    {
      n: "02",
      name: "Automated Test Generation",
      body: "AI generates and maintains test cases alongside development, increasing test coverage and catching issues earlier so manual QA time drops without sacrificing reliability.",
    },
    {
      n: "03",
      name: "LLM-Assisted Code Review",
      body: "Every code change is reviewed with LLM-assisted analysis alongside human reviewers, catching bugs, security issues, and inconsistencies before they reach production.",
    },
    {
      n: "04",
      name: "AI-Monitored CI/CD",
      body: "Our CI/CD pipeline uses AI-driven monitoring to catch deployment issues early, flag anomalies, and keep releases stable so your team ships faster and safer.",
    },
  ],
};

export const caEstimateCta: CtaBandContent = {
  eyebrow: "Scope & Estimate",
  title: "Get a Custom AI Project Estimate",
  body: "Custom AI development costs and timelines vary based on project scope, data readiness, integrations, security needs, and expected outcomes. Share your requirements to receive a tailored development approach, timeline, and estimate.",
  cta: { label: "Book a Free Consultation", href: "#enquiry" },
};

export const caIndustries: CardGridContent = {
  eyebrow: "Industries",
  title: "Industries We Support with AI Solutions",
  body: "Soft Suave develops custom AI solutions across industries, helping businesses apply AI to sector-specific challenges, workflows, and growth opportunities.",
  items: [
    {
      name: "FinTech",
      body: "Support safer financial decisions with fraud detection and lending AI that improve risk assessment, automate reviews, reduce losses, and scale lending operations efficiently at scale.",
    },
    {
      name: "HealthTech",
      body: "Apply clinical NLP and medical imaging to streamline documentation, surface patient insights, support diagnostic workflows, and improve healthcare operations with greater speed and accuracy overall.",
    },
    {
      name: "EdTech",
      body: "Personalize digital learning through adaptive learning and AI tutors that guide students, support educators, improve engagement, and create more responsive learning experiences at scale globally.",
    },
    {
      name: "eCommerce",
      body: "Increase conversions and planning accuracy with recommendations and forecasting that personalize shopping, predict demand, improve inventory decisions, and strengthen performance across digital channels at scale.",
    },
    {
      name: "Logistics",
      body: "Optimize delivery operations through route optimization and fleet AI that reduce delays, improve vehicle utilization, lower costs, and provide better visibility across logistics networks efficiently.",
    },
    {
      name: "Telecom",
      body: "Strengthen network performance with network AI and churn prediction that identify service risks, improve reliability, retain customers, optimize resources, and enable proactive operational decisions daily.",
    },
  ],
};

export const caCaseStudies: CaseStudiesContent = {
  eyebrow: "Proven Results",
  title: "Case Studies & Proven Results",
  body: "Explore how our custom AI development projects have helped businesses solve complex challenges, improve operations, and achieve measurable results across real-world use cases.",
  allCta: { label: "View all Case Studies", href: "https://www.softsuave.com/case-studies" },
  items: [
    {
      key: "vision-ai",
      tag: "Logistics",
      title: "Vision AI: Vehicle Detection and Axle Counting",
      metricValue: "95%+",
      metricLabel: "detection accuracy across multi-lane traffic and floating axles",
      body:
        "Built a real-time Vision AI solution to detect vehicles, classify multiple lanes, and recognize floating axles, improving congestion monitoring and toll inspection decisions across transportation networks.",
    },
    {
      key: "subscription-commerce",
      tag: "E-commerce",
      title: "Unified Revenue for Subscription Commerce",
      metricValue: "$10M+",
      metricLabel: "ARR growth on a modernized subscription platform",
      body:
        "Modernized a unified subscription commerce platform with scalable architecture, faster merchant onboarding, secure payments, and AI-assisted engineering, contributing to improved reliability and continuous innovation.",
    },
    {
      key: "pet-care",
      tag: "HealthTech",
      title: "Healthcare AI: Pet Care",
      metricValue: "90%",
      metricLabel: "less manual record management, with 60% faster processing",
      body:
        "Developed a centralized pet-care AI platform that unified health records, enabled early assessments and reminders, accelerated processing by 60%, and improved preventive care tracking by 50%.",
    },
    {
      key: "classroom-ai",
      tag: "EdTech",
      title: "AI-Powered Learning and Classroom Management",
      metricValue: "Live",
      metricLabel: "teacher dashboards, role-based monitoring and guest access",
      body:
        "Developed an AI-powered education platform with interactive assignments, personalized study tools, real-time feedback, teacher dashboards, role-based monitoring, and guest access, enhancing student engagement and classroom management efficiency.",
    },
  ],
};

export const caTech: TechStackContent = {
  eyebrow: "Technology Stack",
  title: "Our AI Technology Stack",
  body: "Our AI development services use proven models, frameworks, cloud platforms, and MLOps tools to deliver secure, scalable, production-ready solutions for diverse business requirements.",
  groups: [
    {
      name: "Foundation Models",
      items: ["GPT", "Claude", "Gemini", "Llama", "Mistral", "DeepSeek", "OpenAI", "Anthropic"],
    },
    {
      name: "AI Frameworks",
      items: ["LangChain", "LangGraph", "CrewAI", "AutoGen", "LlamaIndex", "Semantic Kernel"],
    },
    {
      name: "Vector Databases and Search",
      items: ["Pinecone", "Weaviate", "Qdrant", "Milvus", "FAISS", "Chroma"],
    },
    {
      name: "Cloud AI and Data Platforms",
      items: ["Azure AI", "Amazon Bedrock", "Google Vertex AI", "Databricks", "Snowflake", "Hugging Face"],
    },
  ],
};

export const caFaqs: FaqContent = {
  eyebrow: "FAQs",
  title: "FAQs About Custom AI Development Services",
  body: "Here are answers to the most common questions founders, product leaders, and CTOs ask before partnering with a custom AI development company.",
  items: [
    {
      q: "Why work with a custom AI development company in India?",
      a: "India gives you access to a deep AI engineering talent pool at 40–60% below equivalent US or EU rates, which is why a large share of global AI delivery runs from here. We work from development centres in Chennai and Bangalore with a US office, maintain a 4–6 hour overlap with US and EU teams, and have delivered software for global clients for over 13 years. Engagement terms, security controls, and delivery milestones are agreed in writing before work starts.",
    },
    {
      q: "How much does it cost to build an AI solution with a team in India?",
      a: "AI development in India typically costs 40–60% less than equivalent US or EU rates, which is the main reason global teams build here. Beyond location, four factors move the price: project complexity, model selection, the state of your data, and the engagement model you choose. Because those vary sharply between projects, we give you a realistic figure rather than a range that fits nobody.",
      link: { label: "Get a rough quote in 24 hours", href: "https://www.softsuave.com/free-quote" },
    },
    {
      q: "How long does it take to develop a production-ready AI solution?",
      a: "It depends on your data and integration needs, so we structure it in stages rather than guessing upfront. Discovery maps the use case and validates your data. A POC then proves one high-value case against defined KPIs. Only after that do we commit to a full build timeline, because by then we know what the data can actually support. Timelines stretch most when data needs cleaning or labeling, or when compliance review is involved.",
      link: {
        label: "Talk to our experts",
        href: "https://www.softsuave.com/30-min-free-consultation",
        tail: "for an estimate against your specific use case.",
      },
    },
    {
      q: "What is the difference between traditional ML and Generative AI for my use case?",
      a: [
        "Traditional ML learns patterns from your structured, historical data to predict or classify: forecasting demand, scoring credit risk, flagging fraud, recommending products. Generative AI creates new output from natural language input, which suits drafting content, answering questions over your documents, and powering copilots and conversational interfaces.",
        "If you are asking “what will happen” or “which category is this,” you want ML. If you are asking “create this” or “clarify this,” you are looking for GenAI. Many production systems use both.",
      ],
    },
    {
      q: "Which LLMs and AI models do you work with?",
      a: "We use the most suitable AI model for each problem instead of sticking to any single provider. Our work covers OpenAI, Claude, Llama, and Gemini, orchestrated with LangChain and vector databases like Pinecone and Weaviate. For traditional ML, we build on TensorFlow, PyTorch, Keras, Scikit-learn, XGBoost, and LightGBM. NLP work uses spaCy and HuggingFace; computer vision uses OpenCV and MediaPipe.",
    },
    {
      q: "How do you prevent hallucinations in Generative AI applications?",
      a: "Hallucinations are controlled by grounding the model in your own data rather than relying on its training. We use retrieval-augmented generation with vector databases so responses are drawn from your documents, add source attribution so answers can be traced back, and constrain the model’s scope to defined domains. Where accuracy is critical, we design human-in-the-loop review into the workflow rather than letting the model act unchecked.",
    },
    {
      q: "How do you handle data security, privacy, and compliance in AI projects?",
      a: "Security is designed in, not added later. We work under NDAs, apply encryption, VPC isolation, role-based access control, and PII masking, and offer private cloud deployment where your data cannot leave your own environment. Full auditability is built in so you can evidence how data was accessed and used. We scope compliance requirements during discovery, before any data moves.",
    },
    {
      q: "Can you work with our existing data warehouse, cloud, or analytics stack?",
      a: "Absolutely. We integrate with AWS, Azure, GCP, Snowflake, and BigQuery, and deploy using Docker, Kubernetes, and CI/CD pipelines alongside MLOps platforms like MLFlow and Vertex or KubeFlow. The goal is to enhance the stack you already run, not replace it.",
    },
    {
      q: "Do I need a lot of labeled data to start with AI development?",
      a: "No. Pre-trained models, transfer learning, synthetic data, and semi-supervised approaches all reduce how much labeled data you need to begin. Retrieval-based GenAI applications often need no labeled training data at all, since they work directly against your existing documents. We assess what your data can support during the discovery phase, so you know before committing to a build.",
    },
    {
      q: "Can we start with a small AI POC before committing to a bigger project?",
      a: "Yes, and we recommend it. A POC targets one high-value use case with success criteria agreed in writing before work starts, including accuracy, performance, and adoption benchmarks you define with us. You get a working prototype and a clear answer on feasibility before any full-scale investment. Proven POCs then move into production; ones that don’t clear the bar don’t cost you a full build.",
    },
    {
      q: "What happens if the AI model doesn’t meet accuracy or performance expectations?",
      a: "This is exactly what the POC stage is designed to surface. Success criteria are set before development begins, so there’s an agreed definition of “working.” If a model falls short, we retrain with adjusted features, test alternative approaches, and improve the training data. Running this at the POC stage means feasibility is settled early, before a full build is committed.",
    },
    {
      q: "What happens after launch — do you support and maintain the AI solution?",
      a: "Yes. AI models degrade as real-world data shifts, so ongoing operation is part of the build, not an afterthought. We run automated deployments, retraining cycles, drift monitoring, and cost optimization to keep models accurate and efficient over time. Support terms are agreed as part of your engagement model.",
    },
  ],
};

export const caFinalCta: FinalCtaContent = {
  title: "Ready to Transform Your Business with AI?",
  body: "Share your requirements and we will come back with a tailored development approach, timeline, and estimate. No obligation, and everything stays under NDA.",
  cta: { label: "Send your requirements" },
};

export const caTestimonials: TestimonialsContent = {
  eyebrow: "Testimonials",
  title: "What Our Clients Say",
  body: "We have helped hundreds of clients globally reach their business goals. Here is what working with our teams is like, in their words.",
  items: [
    {
      quote:
        "Soft Suave's commitment to meeting deadlines, flexibility in working hours, and ability to seamlessly integrate with our U.S. team make them a reliable and invaluable technology partner.",
      name: "Tim Maliyil",
      role: "COO, Phoenix Technologies",
      rating: "5.0",
    },
    {
      quote:
        "I've worked with Soft Suave for the past 3 years and the experience has been unique. Partnering with them reduced our costs by 40% and increased our delivery speed by 20%.",
      name: "Dimitris Rokos",
      role: "Founder & CEO, AMD Telecom",
      rating: "5.0",
    },
    {
      quote:
        "Their 40-hour free trial isn't just a marketing promise — it's a genuine opportunity to experience top-notch developer skills. I was beyond impressed with what they delivered.",
      name: "Dr. Dara Huang",
      role: "Co-Founder, Perkypet",
      rating: "5.0",
    },
  ],
};
