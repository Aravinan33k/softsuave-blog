/**
 * Content source for the "Generative AI Development Company" landing page
 * (`/generative-ai-development-company`).
 *
 * Mirrors the shape and `as const` convention of `content.ts`: the page's
 * section components stay presentational and read their copy from here, so
 * wording can be edited without touching JSX. Sections this page borrows
 * wholesale from the homepage (Case Studies, Technology Stack, Final CTA)
 * deliberately keep reading `content.ts` — one source of truth per section,
 * not a copy per page.
 */

export const meta = {
  title: "Generative AI Development Company | Soft Suave",
  description:
    "Choose Soft Suave, a generative AI development company with 13+ years of experience and 400+ AI experts, for secure, production-ready solutions.",
  path: "/generative-ai-development-company",
} as const;

export const hero = {
  eyebrow: "Generative AI Development Company",
  /** Rendered as the page's single H1, split into lines for the masked reveal. */
  titleLines: ["Generative AI Development Company:", "From Pilot to Production"],
  body: [
    "Soft Suave is a generative AI development company that takes your idea from prototype to production. Our 400+ AI & engineering specialists build RAG systems, AI agents, and LLM applications that integrate with the systems and tools your business already runs on.",
    "Start with a 30-minute technical consultation to discuss your use case and identify a suitable approach before committing your project budget.",
  ],
  points: [
    "Flexible & Future-Ready AI Architecture",
    "Time-Zone & Language Aligned Teams",
    "Airtight NDA & IP Protection",
    "Strong Delivery Governance",
    "Continuous Quality Evaluation",
  ],
  /**
   * Trust signals under the hero copy — the same claims the AI landing page
   * leads with, rendered in this theme's chip type.
   */
  badges: [
    "ISO 9001:2015 Certified",
    "13+ Years in Business",
    "400+ AI Specialists",
    "NDA-Backed Engagements",
    "150+ Global Clients",
  ],
  form: {
    eyebrow: "Free Consultation",
    title: "Book a 30-minute technical consultation",
    note: "Covered by NDA. No sales pitch — an engineer reviews your use case.",
    submit: "Request Consultation",
    sending: "Opening your mail…",
    requirementLabel: "Your generative AI use case",
    requirementPlaceholder:
      "What should the system do, and which data or systems does it need to reach?",
    subject: "Generative AI consultation request",
  },
} as const;

export const clients = {
  eyebrow: "Our Clients",
  title: "Trusted by Teams Building With AI",
  body: "From funded startups to global enterprises, teams across 21+ countries partner with Soft Suave to ship AI that holds up in production.",
} as const;

export const overview = {
  eyebrow: "Overview",
  title: "What are Generative AI Development Services?",
  paragraphs: [
    "Generative AI development services are engineering services that design, build, and deploy systems using large language models and other generative models. The work covers use-case selection, data preparation, retrieval architecture, model integration, evaluation, and production deployment. Soft Suave delivers these services as a build partner, not a strategy-only advisor.",
    "They differ from buying an AI product. A packaged tool works on its own data and rules; a custom build works on yours. Generative AI development services apply when answers must come from your documents, follow your policies, or trigger actions inside your CRM, ERP, or ticketing systems.",
  ],
  pullQuote:
    "Soft Suave builds on published models from OpenAI, Anthropic, and Meta rather than training foundation models from scratch. The model is the easy part. Making it accurate every time, for every user, inside your existing systems: that is the work Soft Suave does.",
  /**
   * Section illustration, shown beside the prose from 1000px up.
   *
   * Dimensions are the asset's intrinsic size so `next/image` can reserve the
   * box and avoid layout shift; `blurDataURL` is a 16px WebP of the same frame,
   * matching how the generated homepage manifest supplies placeholders.
   * `public/images/**` is allow-listed for the optimizer in next.config.ts.
   */
  image: {
    src: "/images/landing/generative-ai-overview.webp",
    width: 1536,
    height: 1024,
    alt: "Generative AI application architecture: your data, knowledge base, and APIs feed a model that handles text, image, and code generation, returning insights, automation, and actions.",
    blurDataURL:
      "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADQAQCdASoQAAsAAwBSJQBdgCHw8jmZ4AD++d2x7Ec4yZsZwNneJSzpg06jp7kq2pW1BAGcN/1owBfXxUAAAA==",
  },
} as const;

export const problems = {
  eyebrow: "Problems & Solutions",
  title: "Business Problems Generative AI Solutions Actually Solve",
  body: "Generative AI delivers value when applied to clear operational challenges. The table below highlights common business problems and explains how tailored Generative AI solutions address each one with practical, measurable outcomes.",
  columns: ["Problem", "How generative AI solutions help"],
  rows: [
    {
      problem: "Knowledge locked in documents",
      solution:
        "Employees spend hours searching contracts, policies, and support tickets. AI-powered search provides direct answers from these documents, with citations linking back to the original sources.",
    },
    {
      problem: "Manual document processing",
      solution:
        "Teams manually enter data from invoices, claims, and forms. Generative AI extracts information from unstructured documents and converts it into structured data for review.",
    },
    {
      problem: "Support demand exceeding team capacity",
      solution:
        "Repetitive Tier-1 queries take up valuable support time. An AI assistant answers common questions using your help centre and directs complex issues to the appropriate team.",
    },
    {
      problem: "Content production bottlenecks",
      solution:
        "Product, marketing, and localisation work slows when writing resources are limited. Generative AI creates initial drafts using your templates, ready for human review and approval.",
    },
    {
      problem: "Analysts spending time on routine research",
      solution:
        "Research, data summaries, and recurring reports consume valuable specialist time. AI agents prepare initial drafts using your data, allowing experts to review and refine the findings.",
    },
  ],
} as const;

export const services = {
  eyebrow: "Our Services",
  title: "Custom Generative AI Development Services We Deliver",
  body: "Soft Suave provides end-to-end generative AI services, from selecting the right approach to deploying, managing, and optimizing production-ready solutions.",
  items: [
    {
      name: "Generative AI Consulting and Use-Case Discovery",
      body: "Identify which use cases justify investment before development begins. You receive a feasibility assessment, data-readiness review, and recommendation focused on the simplest approach that meets your requirements.",
    },
    {
      name: "Generative AI Proof of Concept Development",
      body: "Validate the idea in weeks, not quarters. Soft Suave builds a working proof of concept against your real data, so value is measured before you approve a full build.",
    },
    {
      name: "Custom Generative AI Application Development",
      body: "Build production applications with generative AI at the core: copilots, assistants, and internal tools. You get the whole application: interface, backend, and integrations, not just a model call.",
    },
    {
      name: "Generative AI Integration Services",
      body: "Embed generative AI into the systems you already run: CRM, ERP, ticketing, and internal APIs. Integration runs through your existing authentication and permission model, so nobody sees data they should not.",
    },
    {
      name: "Model Selection and Customisation",
      body: "We select and fine-tune the right AI model based on your accuracy, speed, and cost requirements. Options from OpenAI, Anthropic, Google, Meta, and Mistral are tested against your specific business needs.",
    },
    {
      name: "Generative AI Security and Governance",
      body: "We build security into every stage with access controls, guardrails, audit logging, and human oversight, helping your generative AI solution move safely from development to production.",
    },
    {
      name: "Evaluation, Testing and LLMOps",
      body: "Measure quality before your users do. Soft Suave delivers evaluation sets, regression tests, prompt versioning, cost tracking, and drift monitoring as part of the build, not as aftercare.",
    },
    {
      name: "Dedicated Generative AI Development Teams",
      body: "Scale your AI engineering capacity without a hiring cycle. Pre-vetted AI developers join within 48 hours and work in your sprints, your tools, and your timezone from day one.",
    },
    {
      name: "Generative AI Product Modernisation",
      body: "Add generative AI to software you already own. Assistants, search, and automation extend the existing product rather than forcing a rebuild around a new architecture.",
    },
    {
      name: "Generative AI Support and Optimisation",
      body: "Keep the system accurate and affordable after launch. Quality is monitored, prompts are retuned, token spend is controlled, and models are upgraded as better and cheaper options reach the market.",
    },
  ],
} as const;

export const midCta = {
  eyebrow: "Next Step",
  title: "Have a Generative AI Use Case in Mind?",
  body: "Discuss your requirements with our experts and get a clear path from initial idea to a secure, production-ready solution.",
  cta: { label: "Discuss Your Project", href: "#enquiry" },
} as const;

export const integration = {
  eyebrow: "Integration & Deployment",
  title: "Integration and Deployment Options for Your Stack",
  body: "Generative AI creates business value when it fits naturally into your existing workflows. Soft Suave designs each solution around your operational needs and technology ecosystem.",
  blocks: [
    {
      label: "Your cloud, your control",
      body: "Applications can be deployed within your AWS, Microsoft Azure, or Google Cloud account, giving you control over hosting, data, logs, permissions, and model-provider access.",
    },
    {
      label: "Your systems, connected",
      body: "We connect the solution with your CRM, ERP, helpdesk, document repositories, data warehouses, identity providers, and internal APIs for smooth adoption across your organization.",
    },
  ],
  /**
   * Names must match `components/home/tech-logo.tsx` so each chip renders its
   * real mark instead of the generic fallback glyph.
   */
  targets: [
    "AWS Bedrock",
    "Azure AI",
    "Google Vertex AI",
    "OpenAI",
    "Anthropic",
    "Pinecone",
    "Qdrant",
    "LangChain",
  ],
} as const;

export const process = {
  eyebrow: "Delivery Process",
  title: "GenAI Delivery: From Discovery to Production",
  body: "Soft Suave follows a five-stage generative AI development process, with clear success criteria at every stage. Each project moves forward only after the required outcomes are validated.",
  steps: [
    {
      n: "01",
      name: "Discovery and Use-Case Scoping",
      body: "Soft Suave assesses your use case, data readiness, and success metric, then recommends the simplest approach that can meet it.",
    },
    {
      n: "02",
      name: "Architecture and Approach Selection",
      body: "Choose between prompting, retrieval, fine-tuning, or agents with the help of our AI experts. Soft Suave documents the decision, the cost model, and the rejected options.",
    },
    {
      n: "03",
      name: "Build and Evaluation",
      body: "Build in short cycles against a fixed evaluation set. Every change is scored before it ships, so quality is measured rather than assumed.",
    },
    {
      n: "04",
      name: "Integration and Security Review",
      body: "Connect the system to your applications, identity provider, and data sources. Soft Suave tests access controls, prompt injection handling, and failure paths.",
    },
    {
      n: "05",
      name: "Production Launch and Monitoring",
      body: "Launch with logging, cost tracking, and drift monitoring in place. Soft Suave hands over operating guides so your team can operate the system independently.",
    },
  ],
} as const;

export const industries = {
  eyebrow: "Industries",
  title: "Industries Soft Suave Builds Generative AI For",
  body: "Generative AI requirements vary across industries based on their data, risks, workflows, and approval processes. Soft Suave builds tailored solutions for the following sectors.",
  items: [
    {
      name: "FinTech",
      body: "Answer policy and regulation questions from internal documentation, extract data from KYC and onboarding paperwork, and draft customer communications that a compliance reviewer approves before sending.",
    },
    {
      name: "HealthTech",
      body: "Summarise clinical notes, organize patient intake forms, and draft patient communications, with a clinician reviewing all content affecting patient records or care decisions before final use.",
    },
    {
      name: "EdTech",
      body: "Draft course material and assessments from approved curriculum, and give learners a support assistant that answers only from institution-approved sources rather than the open internet.",
    },
    {
      name: "eCommerce",
      body: "Generate product descriptions across your full catalog, synthesize reviews into actionable insights, and power conversational search that understands intent rather than simply matching keywords.",
    },
    {
      name: "Logistics",
      body: "Extract data from bills of lading, customs documents, and delivery reports, then highlight urgent issues so operations teams can identify and resolve exceptions quickly and efficiently.",
    },
    {
      name: "Telecom",
      body: "Resolve repeat support queries from your own help content, summarise network incidents for faster handover, and make dense technical documentation searchable for field engineering teams.",
    },
    {
      name: "Real Estate",
      body: "Draft property listings from unit and specification data, extract terms from leases and sale agreements, and qualify inbound enquiries against live availability so agents follow up on the ones worth their time.",
    },
    {
      name: "Manufacturing",
      body: "Make equipment manuals, SOPs, and maintenance histories searchable for floor engineers, extract data from supplier and quality documents, and summarise defect reports so recurring issues surface early.",
    },
  ],
} as const;

export const whyUs = {
  eyebrow: "Why Soft Suave",
  title: "Why Choose Soft Suave as Your GenAI Partner?",
  body: "Successful generative AI development requires more than selecting a model. Soft Suave combines AI expertise, proven software engineering, secure development practices, and production experience to build solutions that deliver lasting business value.",
  items: [
    {
      name: "400+ AI & Engineering Specialists",
      body: "Build your solution with experienced engineers across generative AI, cloud, data, frontend, backend, integration, testing, and DevOps.",
    },
    {
      name: "13+ Years of Software Engineering Expertise",
      body: "Benefit from extensive experience building reliable software and turning complex ideas into secure, scalable, production-ready solutions.",
    },
    {
      name: "End-to-End Generative AI Development",
      body: "Move confidently from strategy and prototyping to deployment and continuous optimization with one experienced technology partner.",
    },
    {
      name: "Flexible AI Model Selection",
      body: "Choose the right models from OpenAI, Anthropic, Google, Meta, and Mistral based on your accuracy, speed, security, and cost requirements.",
    },
    {
      name: "Quality Evaluation at Every Stage",
      body: "Improve reliability through structured evaluation, performance testing, human review, and ongoing quality checks throughout the development process.",
    },
    {
      name: "ISO 9001:2015-Certified Quality Processes",
      body: "Protect your data and applications with ISO-certified processes, access controls, guardrails, audit logging, and security measures built into every stage.",
    },
  ],
} as const;

export const faq = {
  eyebrow: "FAQ",
  title: "FAQs About Generative AI Development Services",
  body: "Find clear answers to common questions about planning, developing, integrating, deploying, and maintaining a generative AI solution with Soft Suave.",
  items: [
    {
      q: "What does a generative AI development company actually do?",
      a: "A generative AI development company designs, builds, and deploys applications powered by generative models. Soft Suave covers use-case scoping, architecture, integration, evaluation, and production support; the complete engineering work, not strategy decks alone.",
    },
    {
      q: "How much do generative AI development services cost?",
      a: "Generative AI development costs depend on the use case, project scope, data readiness, model requirements, integrations, security, evaluation, infrastructure, and ongoing support. Soft Suave typically delivers services at 40 to 60% lower costs than comparable US and EU development teams. A detailed estimate is provided after discovery based on the project’s technical and delivery requirements.",
    },
    {
      q: "How long does a generative AI project take?",
      a: "The timeline depends on whether the project involves a proof of concept or a production-ready solution. Data preparation, model selection, application development, system integrations, security testing, evaluation, and deployment all affect the schedule. Soft Suave confirms a realistic timeline after discovery, once the technical requirements and data readiness are understood.",
    },
    {
      q: "Should we use RAG, fine-tuning, or an AI agent?",
      a: "Use RAG when answers must come from your data, fine-tuning when behaviour must be fixed, and agents when a task has multiple steps. Soft Suave starts with the simplest option that meets the requirement.",
    },
    {
      q: "What are custom Generative AI development services?",
      a: "Custom Generative AI development services build a system around your data, workflows, and rules rather than configuring an off-the-shelf tool. Soft Suave delivers custom builds where a packaged product cannot meet the requirement.",
    },
    {
      q: "What generative AI solutions work best for enterprises?",
      a: "Generative AI delivers the best results when a specific use case has clear ownership and measurable goals. Soft Suave recommends starting with a focused solution, such as a knowledge assistant, document processing system, or support copilot, before expanding into a broader platform.",
    },
    {
      q: "What happens to our data during generative AI development?",
      a: "Soft Suave works under NDA, deploys into your own cloud account, and configures model access with your provider keys and terms. Your data stays inside your perimeter and is not used to train models.",
    },
    {
      q: "What if the generative AI system underperforms?",
      a: "Soft Suave defines clear evaluation criteria before development, helping identify performance gaps during testing and refine the model, data, or technical approach to achieve the required outcomes.",
    },
  ],
} as const;
