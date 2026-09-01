/**
 * Single content source for all three pages (derived from
 * "New home page content - 29.6.26.docx"). Same content renders in
 * /one, /two, /three — each page maps it into its own inspiration's structure.
 */

export const brand = {
  name: "Soft Suave",
  tagline: "A KiwiTech Affiliate Company",
  email: "hello@softsuave.com",
  domain: "softsuave.com",
} as const;

export const hero = {
  eyebrow: "AI-Enabled Engineering",
  title: "Empowering Businesses with Scalable AI, Automation & Integrations",
  // words for the rotating-word treatment on /three
  rotatingWords: ["Scalable", "Intelligent"],
  subtitle:
    "Build scalable AI solutions, intelligent automation systems, and seamless integrations with AI-enabled engineering teams focused on real business outcomes.",
  primaryCta: { label: "Book AI Strategy Call", href: "#contact" },
  secondaryCta: { label: "Explore AI Solutions", href: "#services" },
} as const;

export const why = {
  eyebrow: "Why Soft Suave",
  title: "Your AI Growth Partner, From Idea to Launch",
  body: "Building reliable software and production-ready AI solutions across industries.",
  stats: [
    { value: 400, suffix: "+", label: "AI & Engineering Specialists" },
    { value: 13, suffix: "+", label: "Proven Delivery" },
    { value: 150, suffix: "+", label: "Global Clients" },
    { value: 20, suffix: "+", label: "Countries" },
  ],
} as const;

// The two value props that used to live here now own their sections outright:
// the partner statement heads `clients`, the efficiency statement heads
// `industries`. Keeping a third copy here only invited them to drift apart.

/**
 * A client mark in the proof band. Give it a `src` (a file dropped under
 * `/public/brand/clients/`) and the real logo renders; leave `src` null and it
 * falls back to a typographic wordmark, so the strip is never broken while
 * artwork is still being collected.
 */
export type ClientLogo = { name: string; src: string | null };

/**
 * Client proof band — sits directly under "Why Soft Suave". Seeded with the
 * clients already named on the page (see `testimonials`); only add names we
 * are actually cleared to display.
 */
export const clients: {
  eyebrow: string;
  title: string;
  body: string;
  logos: ClientLogo[];
} = {
  eyebrow: "Clients",
  title: "Preferred AI-Enabled Technology Partner for Startups and SMBs",
  body: "We combine AI-enabled engineering with 13+ years of product development expertise to help clients build scalable AI solutions, automate complex workflows, and integrate systems for measurable business outcomes.",
  logos: [
    { name: "Phoenix Technologies", src: null },
    { name: "AMD Telecom", src: null },
    { name: "Perkypet", src: null },
  ],
};

export const industries = {
  eyebrow: "Industries",
  title: "AI-Driven Efficiency and Growth Across Industries",
  body: "Our AI-driven solutions help industries improve efficiency, scale operations, and accelerate transformation. By making business systems smarter and more connected, we help organizations modernize faster and stay competitive in a digital-first world.",
  items: [
    {
      key: "fintech",
      name: "FinTech",
      body: "Redefining FinTech with AI-powered intelligence by enhancing security, automating decisions, and unlocking new financial possibilities. From real-time fraud detection to hyper-personalized banking, we drive the future of digital finance.",
    },
    {
      key: "healthtech",
      name: "HealthTech",
      body: "Elevate healthcare with next-gen advanced AI solutions that refine patient outcomes, optimize clinical workflows, and streamline operations. We deliver intelligent automation and data-driven insights for transformative health tech innovation.",
    },
    {
      key: "edtech",
      name: "EdTech",
      body: "Reimagining education with next-gen AI solutions, creating personalized learning experiences, and smart content curation. From adaptive learning support to insightful analytics, we're pioneering the evolution of education.",
    },
    {
      key: "ecommerce",
      name: "Ecommerce",
      body: "Transforming e-commerce with AI-driven solutions for smarter selling, faster operations, and better customer experiences. From personalized recommendations to inventory automation and real-time analytics, we help businesses grow efficiently.",
    },
    {
      key: "logistics",
      name: "Logistics",
      body: "Optimizing logistics with AI-powered solutions for smarter supply chains, real-time tracking, and operational efficiency. From demand forecasting to automated route optimization, we drive seamless and cost-effective logistics management.",
    },
    {
      key: "telecom",
      name: "Telecom",
      body: "Advancing telecom with AI-driven solutions for smarter networks, automated operations, and better customer experiences. From predictive maintenance to intelligent network optimization, we help providers improve reliability and efficiency.",
    },
  ],
} as const;

export const services = {
  eyebrow: "Our Services",
  title: "AI & Software Services Built for Businesses of All Sizes",
  body: "Whether you are a startup, SMB, or enterprise, Soft Suave helps you build AI solutions, develop software, automate workflows, and scale digital products with confidence.",
  items: [
    {
      key: "custom-ai",
      name: "Custom AI Solutions",
      body: "Build industry-ready AI solutions with LLMs, RAG, agents, and predictive models to automate workflows and improve decisions faster at scale.",
    },
    {
      key: "ai-integrations",
      name: "AI Integrations & Workflow Automation",
      body: "Integrate AI into business tools and automate workflows to reduce manual work, improve accuracy, and speed up daily operations.",
    },
    {
      key: "ai-agents",
      name: "AI Chatbots & AI Agents",
      body: "Deploy AI chatbots and agents for customer support, HR, finance, sales, healthcare, internal operations, and employee assistance.",
    },
    {
      key: "custom-software",
      name: "Custom Software Development",
      body: "Build secure, scalable, high-performance solutions with our AI-enabled custom software development service to improve operations and support smarter business growth.",
    },
    {
      key: "mobile",
      name: "Mobile App Development",
      body: "Create AI-enabled mobile apps across Android, iOS, and cross-platform environments with intuitive design, smarter features, and experiences tailored to your business goals.",
    },
    {
      key: "web",
      name: "Web App Development",
      body: "Power your digital ideas with AI-enabled web apps that simplify workflows, engage users, and support faster business growth online.",
    },
    {
      key: "modernization",
      name: "Enterprise Modernization",
      body: "Modernize legacy systems with cloud, automation, and AI to improve agility, performance, resilience, security, and long-term business growth across operations.",
    },
    {
      key: "gcc",
      name: "Global Capability Center (GCC)",
      body: "Scale your GCC with AI-powered teams, smarter workflows, automation, and analytics that improve productivity, decision-making, and operational efficiency.",
    },
  ],
} as const;

export const journey = {
  eyebrow: "AI Transformation Journey",
  title: "From AI Idea to Business Impact",
  body: "Move from AI idea to real business impact with a clear transformation journey that improves productivity, simplifies automation, and supports scalable growth.",
  steps: [
    { n: "01", name: "Business Challenge", body: "We start by understanding the business problem, its constraints, and the outcome that matters." },
    { n: "02", name: "AI Assessment", body: "We assess data, systems, and opportunities to find where AI creates the biggest impact." },
    { n: "03", name: "Prototype", body: "We build a focused prototype to validate value fast before scaling investment." },
    { n: "04", name: "Integration", body: "We connect AI into your existing tools and workflows with minimal disruption." },
    { n: "05", name: "Deployment", body: "We ship production-ready systems with the reliability and security enterprises expect." },
    { n: "06", name: "Optimization", body: "We continuously measure, tune, and scale to compound results over time." },
  ],
} as const;

export const caseStudies = {
  eyebrow: "Industries",
  title: "AI Success Stories Across Key Industries",
  body: "Explore how our AI solutions helped businesses automate workflows, reduce effort, improve decisions, and achieve measurable impact across industry projects.",
  // Representative outcomes mapped to our industries (case-study slots).
  items: [
    { key: "ecommerce", tag: "Ecommerce", title: "AI Personalization & Inventory Automation", metricValue: "2.4x", metricLabel: "repeat purchases", year: "2026" },
    { key: "healthtech", tag: "HealthTech", title: "Clinical Workflow Automation", metricValue: "22+", metricLabel: "hours saved / week", year: "2026" },
    { key: "logistics", tag: "Logistics", title: "Predictive Routing & Demand Forecasting", metricValue: "31%", metricLabel: "lower logistics cost", year: "2025" },
    { key: "fintech", tag: "FinTech", title: "Real-Time Fraud Detection", metricValue: "70%", metricLabel: "less manual review", year: "2025" },
  ],
} as const;

export const enterprise = {
  eyebrow: "Enterprise AI Integrations",
  title: "Integrate AI Into Your Existing Enterprise Ecosystem",
  body: "Soft Suave helps businesses connect AI with the tools they already use, so teams can automate work without changing their entire technology setup.",
  pillars: ["Delivery Method", "Industry Recognitions"],
} as const;

export const techStack = {
  eyebrow: "Technology Stack",
  title: "Modern Tech Stack for AI and Software Solutions",
  body: "We use modern AI, software, cloud, mobile, and web technologies to create smarter, scalable, future-ready solutions for business growth.",
  groups: [
    { name: "Foundation Models", items: ["GPT", "Claude", "Gemini", "Llama", "Mistral", "DeepSeek"] },
    { name: "AI Frameworks", items: ["LangChain", "LangGraph", "CrewAI", "AutoGen", "LlamaIndex", "Semantic Kernel"] },
    { name: "Vector DB", items: ["Pinecone", "Weaviate", "Qdrant", "Milvus", "FAISS"] },
    { name: "Cloud AI", items: ["Azure AI", "AWS Bedrock", "Google Vertex AI", "OpenAI", "Anthropic"] },
  ],
} as const;

// Engagement models fill the /two "pricing" slot (our content has no prices).
export const engagementModels = {
  eyebrow: "Engagement Models",
  title: "Ways to Work With Soft Suave",
  body: "Flexible engagement models designed around your stage, speed, and scale.",
  tiers: [
    {
      name: "AI Strategy Retainer",
      forWho: "For teams scoping AI",
      highlight: false,
      features: ["AI opportunity assessment", "Roadmap & architecture", "Weekly expert advisory", "POC guidance"],
    },
    {
      name: "Dedicated AI Team",
      forWho: "For scaling products",
      highlight: true,
      features: ["Cross-functional AI pod", "LLMs, RAG & agents", "Workflow automation", "Continuous delivery & optimization"],
    },
    {
      name: "Fixed-Scope Build",
      forWho: "For defined projects",
      highlight: false,
      features: ["Clear scope & timeline", "Prototype to production", "Enterprise integrations", "30-day post-launch support"],
    },
  ],
} as const;

export const finalCta = {
  title: "Ready to Transform Your Business with AI?",
  body: "Book a free AI strategy session with our experts and discover where AI can create the biggest impact in your organization.",
  cta: { label: "Book a Free Consultation", href: "#contact" },
  altCta: { label: "Talk With AI Experts", href: "#contact" },
} as const;

export const testimonials = {
  eyebrow: "Testimonials",
  title: "What Our Clients Say About Us",
  body: "We've empowered hundreds of clients globally to achieve their business goals. Hear firsthand how our expertise and AI-driven solutions have made a difference.",
  items: [
    {
      quote:
        "Soft Suave's commitment to meeting deadlines, flexibility in working hours, and ability to seamlessly integrate with our U.S. team make them a reliable and invaluable technology partner.",
      name: "Tim Maliyil",
      role: "COO, Phoenix Technologies",
      rating: "5.0",
      avatarId: "avatar-2",
    },
    {
      quote:
        "I've worked with Soft Suave for the past 3 years and the experience has been unique. Partnering with them reduced our costs by 40% and increased our delivery speed by 20%.",
      name: "Dimitris Rokos",
      role: "Founder & CEO, AMD Telecom",
      rating: "5.0",
      avatarId: "avatar-1",
    },
    {
      quote:
        "Their 40-hour free trial isn't just a marketing promise — it's a genuine opportunity to experience top-notch developer skills. I was beyond impressed with what they delivered.",
      name: "Dr. Dara Huang",
      role: "Co-Founder, Perkypet",
      rating: "5.0",
      avatarId: "avatar-3",
    },
  ],
} as const;

export const nav = {
  links: [
    { label: "AI Solutions", href: "#services" },
    { label: "AI Integrations", href: "#integrations" },
    { label: "AI Automation", href: "#services" },
    { label: "Industries", href: "#industries" },
    { label: "Case Studies", href: "#work" },
    { label: "Company", href: "#why" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "Book AI Strategy Call", href: "#contact" },
} as const;

export const footer = {
  tagline: "Empowering businesses with scalable AI, automation & integrations.",
  columns: [
    {
      title: "AI Solutions",
      links: ["Custom AI Development", "Generative AI", "AI Agents", "AI Chatbots", "RAG Solutions", "AI Copilots"],
    },
    {
      title: "AI Integration",
      links: ["CRM AI Integration", "ERP AI Integration", "Enterprise AI Integration", "API Integration"],
    },
    {
      title: "AI Automation",
      links: ["Business Process Automation", "Document Automation", "Workflow Automation", "Voice AI", "Email Automation"],
    },
    {
      title: "AI Teams",
      links: ["Hire AI Engineers", "AI Consultants", "AI Architects", "AI Product Teams"],
    },
  ],
  legal: ["Privacy Policy", "Terms & Conditions"],
} as const;

export type PageKey = "one" | "two" | "three" | "four";
