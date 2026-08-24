/**
 * Content source for the "Custom Agentic AI Development Services for Complex
 * Workflows" landing page (`/agentic-ai-development-services`).
 *
 * Mirrors `generative-ai.ts`: the page's section components stay presentational
 * and read their copy from here, so wording can be edited without touching JSX.
 * Sections this page borrows wholesale from the homepage's content (Case
 * Studies, Technology Stack's default, Final CTA) and from the sibling landing
 * page (the hero requirement form) deliberately keep reading their own modules
 * — one source of truth per section, not a copy per page.
 *
 * The copy below is approved marketing content, reproduced verbatim.
 */

export const meta = {
  title: "Agentic AI Development Services | Soft Suave",
  description:
    "Transform complex workflows with our agentic AI development services backed by 13+ years of expertise and 400+ AI & engineering specialists.",
  path: "/agentic-ai-development-services",
} as const;

export const hero = {
  /**
   * The single H1, split for the masked line reveal. The spans are
   * `display: block`, so the joined text content — the only thing crawlers and
   * screen readers see — is the approved headline, unchanged.
   */
  titleLines: ["Custom Agentic AI Development Services", "for Complex Workflows"],
  body: [
    "Soft Suave designs and builds custom agentic AI systems that plan multi-step work, use your business tools, and complete tasks under human oversight. From architecture and orchestration to enterprise integration, we take agentic workflows from proof of concept into daily operations.",
    "Tell us which workflow is slowing your team down, and we will map a practical agentic AI approach around it.",
  ],
  points: [
    "Multi-agent orchestration",
    "RAG on your enterprise data",
    "Human-in-the-loop approvals",
    "API, CRM, and ERP integration",
    "Evaluation before deployment",
  ],
  /** Requirement form, reused from the existing AI landing pages. */
  form: {
    eyebrow: "Free Consultation",
    title: "Book a 30-minute technical consultation",
    note: "Covered by NDA. No sales pitch — an engineer reviews your use case.",
    submit: "Request Consultation",
    sending: "Opening your mail…",
    requirementLabel: "Your agentic AI use case",
    requirementPlaceholder:
      "What should the system do, and which data or systems does it need to reach?",
    subject: "Agentic AI consultation request",
  },
} as const;

export const overview = {
  eyebrow: "Overview",
  title: "What Are Agentic AI Development Services?",
  paragraphs: [
    "Agentic AI development services involve designing and building AI systems that can plan, make decisions, use tools, and complete multi-step workflows toward defined goals. The development process includes architecture, agent logic, data grounding, system integrations, governance, evaluation, deployment, and ongoing support.",
    "These services suit organizations with complex workflows that span multiple systems, require contextual decisions, and cannot be handled effectively by chatbots or fixed automation rules. These services are designed for operations, engineering, and data leaders looking to reduce manual coordination across departments and tools.",
    "Soft Suave delivers agentic AI through clearly scoped engagements with defined goals, deliverables, and production requirements. A discovery phase establishes which decisions an agent may make on its own, which require approval, and how success will be measured. That boundary is set before development starts, because it determines the architecture, the integration surface, and the level of oversight built into the system.",
  ],
  /**
   * Section illustration, shown beside the prose from 1000px up — the same
   * treatment the Generative AI page's overview uses.
   *
   * Dimensions are the asset's intrinsic size so the 3:2 frame matches it
   * exactly and nothing is cropped; `blurDataURL` is a 16px WebP of the same
   * frame, matching how the generated homepage manifest supplies placeholders.
   * `public/images/**` is allow-listed for the optimizer in next.config.ts.
   */
  image: {
    src: "/images/landing/agentic-ai-overview.webp",
    width: 1536,
    height: 1024,
    alt: "An agentic AI system map: planning, memory, knowledge, and tools feed a central AI core that drives decision-making and action, with a human oversight checkpoint alongside it.",
    blurDataURL:
      "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADwAQCdASoQAAsAA8BmJZwAAuQDH4S94EAA/vWVv+Tn+e7LJ8O997ODVKgPFgTKgvoQBSXFaHwLwbMKhgA=",
  },
} as const;

export const comparison = {
  eyebrow: "Comparison",
  title: "Agentic AI vs AI Agents vs Workflow Automation",
  body: "These terms are often used interchangeably, but they differ in scope, decision-making, adaptability, and oversight. The comparison below explains where each approach fits.",
  /** `[row-header column, ...option columns]`. */
  columns: ["Decision criterion", "Workflow automation", "AI agent", "Agentic AI system"],
  rows: [
    { criterion: "Scope of work", values: ["Fixed steps", "Single task", "Multi-step goal"] },
    {
      criterion: "Decision-making",
      values: ["Predefined rules", "Model-driven output", "Plans and re-plans"],
    },
    {
      criterion: "Tool use",
      values: ["Hardcoded connectors", "Limited tool calls", "Selects tools dynamically"],
    },
    {
      criterion: "Handling exceptions",
      values: ["Fails or escalates", "Partial coverage", "Retries and reroutes"],
    },
    {
      criterion: "Oversight needed",
      values: ["Periodic monitoring", "Output review", "Approval checkpoints"],
    },
    {
      criterion: "Best fit when",
      values: ["Steps never change", "One task repeats", "Work varies each time"],
    },
  ],
} as const;

export const services = {
  eyebrow: "Core Offerings & Capabilities",
  title: "Our Agentic AI Development Services",
  body: "Our end-to-end agentic AI development services cover readiness assessment, architecture, development, integration, evaluation, deployment, and continuous improvement.",
  items: [
    {
      name: "Agentic AI Strategy and Readiness Assessment",
      body: "Start by mapping which workflows justify autonomy. We assess data availability, system access, decision boundaries, and risk, then recommend the smallest agentic scope worth building first, with defined success measures.",
    },
    {
      name: "Custom AI Agent Design and Development",
      body: "Each agent is built around a specific job: its goal, allowed tools, input data, output format, and stopping conditions. Behavior is defined clearly rather than left to prompt improvisation alone.",
    },
    {
      name: "Multi-Agent Architecture and Orchestration",
      body: "When one agent cannot cover the workflow, we split responsibilities across specialized agents and add an orchestration layer that assigns tasks, sequences steps, resolves conflicts, and controls handoffs between them.",
    },
    {
      name: "RAG and Enterprise Knowledge Integration",
      body: "Agents answer and act using your documents, records, and knowledge bases through retrieval-augmented generation, with permission-aware access so each agent only reaches the data its role is cleared to use.",
    },
    {
      name: "Tool, API, and Enterprise System Integration",
      body: "Agents become useful when they can act. We connect them to your APIs, CRM, ERP, ticketing, and internal services so tasks are completed in the systems your teams already use.",
    },
    {
      name: "Agent Memory and Context Management",
      body: "Long-running tasks require agents to retain context. We implement short-term context, persistent memory, and retrieval strategies so they remember what matters without processing the history with every model call.",
    },
    {
      name: "Agent Evaluation, Testing, and Guardrails",
      body: "Before release, agents are tested against defined task sets for accuracy, tool-use correctness, failure handling, and unsafe actions. Guardrails constrain what an agent may attempt and when it must stop.",
    },
    {
      name: "Deployment, Observability, and Optimization",
      body: "After launch, agent runs are traced so failures, tool errors, latency, and cost are visible. Findings feed prompt, routing, and policy changes that improve task reliability over successive production releases.",
    },
  ],
} as const;

export const applications = {
  eyebrow: "Key Business Applications",
  title: "Where Agentic AI Creates Business Value",
  body: "Agentic AI coordinates multi-step workflows across enterprise systems by gathering information, making decisions within defined limits, taking approved actions, and involving people when human judgment or oversight is required.",
  items: [
    {
      name: "Customer Operations",
      body: "Agents handle requests, fetch data, draft responses, and resolve routine issues, escalating complex cases with full context.",
    },
    {
      name: "Sales and Revenue Operations",
      body: "Agents research accounts, update CRM data, prepare briefs, and track opportunities, ensuring timely follow-ups and deal visibility.",
    },
    {
      name: "Finance and Back-Office Operations",
      body: "Agents process documents, match invoices, reconcile data, detect anomalies, and support workflows under human approval for sensitive actions.",
    },
    {
      name: "IT and Engineering Support",
      body: "Agents manage tickets, analyze logs, monitor systems, run approved tasks, and escalate high-risk or production issues quickly.",
    },
    {
      name: "Supply Chain and Logistics",
      body: "Agents track demand, inventory, orders, and suppliers, recommend actions, and alert planners when conditions change significantly.",
    },
    {
      name: "Data, Reporting, and Research",
      body: "Agents gather data, compare sources, generate reports, and support analysis with transparent, verifiable, and well-cited outputs.",
    },
    {
      name: "HR and Employee Services",
      body: "Agents assist with onboarding, answer policy questions, manage access requests, and escalate sensitive employee matters to HR teams.",
    },
  ],
} as const;

export const midCta = {
  title: "Is Agentic AI Right for Your Business?",
  body: "Complex workflows need more than basic automation. We help you assess whether Agentic AI can improve coordination, decision-making, and execution across your business.",
  cta: { label: "Discuss Your Use Case", href: "#enquiry" },
} as const;

export const process = {
  eyebrow: "Our Process",
  title: "Development and Deployment Process",
  body: "Most agentic pilots stall somewhere between demonstration and production. Our five-stage process is built around that gap, with autonomy boundaries and approval points all agreed before any development work starts.",
  steps: [
    {
      n: "01",
      name: "Discovery and Workflow Selection",
      body: "We review your workflows, data access, and system boundaries, then select the one process where autonomy delivers measurable value and operational risks can be effectively controlled.",
    },
    {
      n: "02",
      name: "Architecture and Autonomy Design",
      body: "Agent roles, tool permissions, memory strategy, escalation paths, and approval points are designed before any code is written, so scope and oversight are agreed upfront.",
    },
    {
      n: "03",
      name: "Agent Development and System Integration",
      body: "Agents, orchestration logic, and retrieval are built and connected to your applications and data sources, with each integration tested using representative data and controlled scenarios.",
    },
    {
      n: "04",
      name: "Evaluation, Guardrails, and User Testing",
      body: "Agents run against defined task sets to check accuracy, tool use, and failure handling. Business users review outputs before anything goes live.",
    },
    {
      n: "05",
      name: "Deployment, Monitoring, and Optimization",
      body: "We launch with agreed limits and approval points in place. Real usage then shows where agents struggle, what they cost, and which policies need tuning.",
    },
  ],
} as const;

export const industries = {
  eyebrow: "Industries",
  title: "Industry Applications of Agentic AI",
  body: "We develop agentic AI solutions for industries where complex workflows, disconnected systems, and frequent exceptions require intelligent coordination, controlled decision-making, and human oversight.",
  items: [
    {
      name: "eCommerce",
      body: "Streamline order exceptions, returns, supplier inquiries, and catalog enrichment across storefront, inventory, product data, and customer support systems.",
    },
    {
      name: "HealthTech",
      body: "Support records requests, prior authorization follow-ups, and appointment coordination while keeping sensitive actions under clinical or administrative review.",
    },
    {
      name: "EdTech",
      body: "Streamline learner support, enrollment, content organization, and progress tracking by accessing relevant information across connected learning systems.",
    },
    {
      name: "Real Estate",
      body: "Coordinate listing updates, tenant requests, document collection, and property maintenance across management systems, shared inboxes, and online portals.",
    },
    {
      name: "FinTech",
      body: "Accelerate onboarding checks, document reviews, dispute investigations, and internal reporting while retaining human approval for payments and customer-facing decisions.",
    },
    {
      name: "Logistics",
      body: "Monitor shipment exceptions, carrier inquiries, documentation, and delays across connected systems before recommending or performing approved actions.",
    },
    {
      name: "Telecom",
      body: "Resolve routine service tickets, provisioning requests, outage communications, and billing inquiries across network, CRM, and customer support systems.",
    },
    {
      name: "Manufacturing",
      body: "Connect shop-floor data with planning and procurement systems to improve maintenance triage, supplier communication, quality documentation, and production reporting.",
    },
  ],
} as const;

export const whyUs = {
  eyebrow: "Why Choose Us",
  title: "Why Choose Soft Suave for Agentic AI?",
  body: "Discover what makes Soft Suave a trusted agentic AI development company for building secure, scalable, and production-ready solutions for your business.",
  items: [
    {
      name: "Clearly Defined Engagements",
      body: "Each engagement begins with clear goals, success measures, and boundaries.",
    },
    {
      name: "13+ Years of Technology Expertise",
      body: "13+ years of engineering experience guide reliable, production-ready agentic AI.",
    },
    {
      name: "Risk-Aligned Autonomy",
      body: "Set autonomy levels around your operational risks and approval requirements.",
    },
    {
      name: "Production Focus From Day One",
      body: "Guardrails, evaluations, logging, and escalation paths start from day one.",
    },
    {
      name: "ISO-Certified Processes",
      body: "Our ISO 9001:2015-certified processes support consistent quality, documentation, and reliable project delivery.",
    },
    {
      name: "Clear Documentation and Handover",
      body: "Documentation enables your team to operate, extend, and audit independently.",
    },
  ],
} as const;

/**
 * Shape matches `content.ts`'s `techStack`, so the landing pages' `TechStack`
 * section renders this page's stack unchanged. Names are passed straight to
 * `components/home/tech-logo.tsx`, which falls back to a generic mark for any it
 * has no SVG for.
 */
export const techStack = {
  eyebrow: "Technology Stack",
  title: "Technologies Behind Our Agentic AI Systems",
  body: "Explore the technologies we use to build, integrate, deploy, and manage production-ready agentic AI systems.",
  groups: [
    { name: "Foundation Models", items: ["GPT", "Claude", "Gemini", "Llama", "Mistral"] },
    { name: "Agent Frameworks", items: ["LangGraph", "CrewAI", "AutoGen", "Semantic Kernel"] },
    { name: "AI and Retrieval Frameworks", items: ["LangChain", "LlamaIndex"] },
    { name: "Vector Databases", items: ["Pinecone", "Weaviate", "Qdrant", "Milvus", "FAISS"] },
    { name: "Cloud AI Platforms", items: ["Azure AI", "AWS Bedrock", "Google Vertex AI"] },
    {
      name: "Data and Integration",
      items: ["REST APIs", "Kafka", "Airflow", "enterprise databases"],
    },
    {
      name: "Deployment and Observability",
      items: ["Docker", "Kubernetes", "MLflow", "LangSmith", "Langfuse"],
    },
    { name: "Evaluation and Guardrails", items: ["Ragas", "DeepEval", "Guardrails AI"] },
  ],
} as const;

export const faq = {
  eyebrow: "FAQs",
  title: "Agentic AI Development FAQs",
  body: "Find clear, straightforward answers to common questions about agentic AI and understand what it means for businesses and their workflows.",
  items: [
    {
      q: "What are agentic AI development services?",
      a: "Agentic AI development services help businesses build systems that can plan, make decisions, use tools, and complete multi-step workflows with controlled human oversight. The process covers architecture, agent logic, data grounding, enterprise integration, evaluation, governance, deployment, and ongoing support.",
    },
    {
      q: "How is agentic AI different from generative AI?",
      a: "Generative AI primarily creates or transforms content, while agentic AI coordinates steps, uses approved tools, and performs permitted actions toward a defined goal. A generative system answers a prompt; an agentic system plans a sequence, calls tools, updates records inside your applications, and then decides when the task is actually finished.",
    },
    {
      q: "What is the difference between agentic AI and AI agents?",
      a: "An AI agent performs specific tasks, while agentic AI manages the complete system. One agent performs a single defined task, whereas an agentic system adds planning, memory, orchestration, tool permissions, and human checkpoints across one or more agents.",
    },
    {
      q: "How is agentic AI different from workflow automation?",
      a: "Workflow automation follows fixed rules, while an agentic system decides its next step within defined goals, permissions, and operational boundaries. Automation is the better choice when a process never changes. Agentic AI is well suited to workflows with variable inputs, frequent exceptions, and decisions requiring contextual understanding.",
    },
    {
      q: "How do you keep agentic AI systems secure and controlled?",
      a: "Control comes from restricting what an agent is able to reach and do. Scoped tool permissions, role-based data access, human approval checkpoints, execution limits, and full run logging are designed into the architecture rather than added after deployment.",
    },
    {
      q: "What affects the cost of agentic AI development?",
      a: "Cost is driven by integration count, workflow complexity, the autonomy level required, and how ready your data is. A bounded single-agent build differs substantially from a governed multi-agent system. Project pricing is confirmed after your requirements and scope are reviewed.",
    },
    {
      q: "How long does an agentic AI project take?",
      a: "Timelines depend on the project scope, complexity, integrations, and resource requirements, and a realistic schedule is confirmed after the discovery discussion. In practice, system access, data permissions, and named approval owners usually determine how quickly a build can actually move.",
    },
    {
      q: "What happens if the agents underperform in production?",
      a: "Agents are evaluated against defined task sets and performance measures, making underperformance measurable and traceable. Run data helps identify failures so prompts, routing, permissions, or escalation rules can be adjusted and re-evaluated.",
    },
    {
      q: "What happens to our data during an agentic AI project?",
      a: "Data handling terms are agreed within your contract before any work begins. Retrieval and system access are designed to follow the role permissions you already operate under. Access controls can be configured to prevent agents from retrieving records beyond the requesting user’s authorized permissions.",
    },
  ],
} as const;
