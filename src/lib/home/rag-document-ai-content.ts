/**
 * Copy for the "RAG & Document AI" landing page (`/rag-development-services`).
 *
 * Shapes match the prop types exported by the shared landing sections in
 * `components/landing/*` and `components/common/*` — the shared
 * landing-page components — so each section is `<Component content={…} />` with
 * no adapter in between. Kept out of `content.ts` because that file is the
 * homepage's source and is imported by Nav, Footer and every homepage section.
 *
 * The clients band, case studies, testimonials and closing CTA are the
 * homepage's own sections rendered verbatim (see the route), so they read
 * their copy from `content.ts` and have no entry here.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesCarouselContent } from "@/components/common/services-carousel";
import type { CardGridContent } from "@/components/landing/industries";
import type { ComparisonContent } from "@/components/common/comparison";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { FaqContent } from "@/components/landing/faq";

import { sharedHeroAlert, sharedHeroBadges } from "./delivery-shared";

export const ragMeta = {
  slug: "rag-development-services",
  path: "/rag-development-services",
  // SEO title and meta description. The route appends " | Soft Suave" to the
  // title; the H1 itself lives in `ragHero.titleLines`.
  title: "RAG Development Services & Document AI Solutions",
  description:
    "RAG development services and Document AI solutions for enterprise knowledge retrieval, document processing, and search. Discuss your RAG project with Soft Suave.",
} as const;

export const ragHero: HeroContent = {
  // The last line takes the coral accent.
  titleLines: ["RAG Development Services", "for Knowledge Retrieval"],
  body: [
    "Build custom RAG systems that connect your business documents, knowledge bases, and approved data sources with large language models. Soft Suave combines retrieval engineering with Document AI because the way documents are extracted, structured, and chunked directly affects what a RAG system can retrieve.",
    "Turn scattered business knowledge into AI answers grounded in information retrieved from the original source.",
  ],
  points: [
    "13+ Years of Technology Expertise",
    "400+ AI & Engineering Specialists",
    "Document AI & Knowledge Extraction",
    "Enterprise RAG & Knowledge Retrieval",
    "Vector Database & LLM Expertise",
  ],
  badges: sharedHeroBadges,
  form: {
    eyebrow: "Business Enquiry",
    title: "Discuss your RAG project",
    note: "Share your knowledge sources and what users need to ask, and we come back with a retrieval approach, timeline, and estimate. Everything stays under NDA.",
    submit: "Send requirements",
    sending: "Sending…",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "The documents or knowledge bases involved, the questions users ask, the systems it needs to sit inside, and who should have access.",
    subject: "RAG & Document AI enquiry",
    alert: sharedHeroAlert,
  },
  // Hand-placed asset (not a Pexels-pipeline slot) — full-bleed behind the
  // whole hero section, veiled for contrast. See `Hero`'s `image` prop.
  image: {
    src: "/images/four/work-8.png",
    width: 1536,
    height: 1024,
    alt: "Isometric AI processor networked to analytics, documents, cloud storage, and workflow icons",
  },
};

export const ragOverview: OverviewContent = {
  eyebrow: "Overview",
  title: "What Is Retrieval-Augmented Generation (RAG) and Where Does Document AI Fit?",
  paragraphs: [
    "RAG gives large language models access to your business knowledge when a question is asked, while Document AI prepares complex documents so that information can be searched, retrieved, and used more reliably.",
    "Retrieval-Augmented Generation (RAG) is an AI approach that retrieves relevant information from an external knowledge source before a large language model generates its response. This lets the model answer using your business-specific or current information, producing responses grounded in approved company data rather than training data alone. In practice, those sources can include policies, manuals, reports, product documentation, support content, and internal knowledge bases.",
    "Document AI works earlier in the pipeline by preparing content from complex source files for retrieval: scanned PDFs, multi-column reports, contracts, forms, and files with tables or nested structure. It can help extract usable information, preserve meaningful structure, and organize content into retrieval-ready chunks. Metadata, layout, and document structure also influence what the system can find later.",
    "Together, the two capabilities create a connected workflow. Document AI prepares the source material, RAG retrieves the relevant evidence, and the LLM uses that evidence to produce a response grounded in the source. These stages are interdependent, so document preparation and retrieval need to be designed together rather than handled as separate technical tasks.",
  ],
  // The connected workflow the prose describes, drawn as a pipeline
  // (landing/flow.tsx) rather than quoted as an arrow chain.
  flow: {
    label: "How business documents become grounded AI responses",
    steps: [
      { name: "Business documents", detail: "PDFs, contracts, manuals, reports, support content" },
      { name: "Document AI processing", detail: "Extract, preserve structure, chunk" },
      { name: "Retrieval-ready knowledge", detail: "Embedded, indexed, permission-aware" },
      { name: "RAG", detail: "Retrieve the relevant evidence per question" },
      { name: "Grounded AI response", detail: "Answered from the source, not memory" },
    ],
  },
  // Hand-placed asset — the RAG architecture illustration already shipped for
  // the generative-AI page; its subject is exactly this section's.
  image: {
    src: "/images/landing/generative-ai-rag-architecture.webp",
    width: 1448,
    height: 1086,
    alt: "How a RAG solution fits together: documents, knowledge bases, and cloud storage feed a retrieval layer that grounds a central AI model, which connects out to CRM, ERP, APIs, and ticketing systems.",
    blurDataURL:
      "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAAAQAgCdASoQAAwAAwBSJQBOgCHw35H/X5wAAP75+5o1KWhylCAGLAV8fi2WhvhAXHsUdEL5/sjZZAf0swAAAA==",
  },
};

/**
 * Rendered as the centre-focused carousel (landing/services-carousel.tsx).
 * Each card wears a piece of the hand-placed landing artwork under
 * public/images/landing/ — the same licensed set the generative-AI page's
 * services and problem panels use, chosen here by subject. The images are
 * decorative (the card names the service in text), so `alt` is empty.
 */
export const ragServices: ServicesCarouselContent = {
  eyebrow: "Services",
  title: "RAG Development Services and Document AI Solutions",
  body: "Build retrieval and document intelligence workflows around your business data, applications, and users. We help turn your documents and enterprise knowledge into AI-ready information that can be searched, retrieved, and used to deliver more relevant responses across business applications.",
  items: [
    {
      name: "Custom RAG Development",
      body: "Build custom RAG systems around your knowledge sources, application requirements, query patterns, and users, with retrieval architecture designed for the information your AI application needs to access.",
      image: { src: "/images/landing/services/svc-application-development.webp", alt: "" },
    },
    {
      name: "Enterprise Knowledge Retrieval",
      body: "Build enterprise RAG solutions that retrieve relevant information across approved knowledge sources, with retrieval configured around source type, query patterns, metadata, chunking strategy, and ranking approach rather than applying one generic setup everywhere.",
      image: { src: "/images/landing/problems/knowledge-search.webp", alt: "" },
    },
    {
      name: "RAG Application Integration",
      body: "Integrate retrieval capabilities into AI assistants, internal applications, enterprise search, and support workflows, passing relevant context to the LLM within existing application flows to enable more reliable company-specific responses.",
      image: { src: "/images/landing/services/svc-integration.webp", alt: "" },
    },
    {
      name: "Document AI and Data Extraction",
      body: "Turn business documents into usable knowledge for downstream AI workflows. Document AI parses structure, preserves layout, and organizes content into retrieval-ready chunks before it enters search, retrieval, or LLM applications.",
      image: { src: "/images/landing/problems/document-processing.webp", alt: "" },
    },
    {
      name: "Document Retrieval and Summarization",
      body: "Make large document collections easier to work with by retrieving relevant content and using AI-assisted summarization where appropriate, helping users review important information without searching every file manually.",
      image: { src: "/images/landing/problems/analyst-research.webp", alt: "" },
    },
    {
      name: "RAG Evaluation and Optimization",
      body: "Test whether retrieval returns relevant source material and whether generated responses remain supported by that context. Evaluation should examine real queries, retrieval failures, source quality, and changes in the knowledge base.",
      image: { src: "/images/landing/services/svc-evaluation-llmops.webp", alt: "" },
    },
    {
      name: "Permission-Aware Knowledge Access",
      body: "Design retrieval around document permissions and user access requirements so confidential information is not treated as universally available when RAG applications search across enterprise knowledge sources.",
      image: { src: "/images/landing/services/svc-security-governance.webp", alt: "" },
    },
  ],
};

export const ragUseCases: CardGridContent = {
  eyebrow: "Use Cases",
  title: "RAG and Document AI Use Cases for Business Workflows",
  body: "RAG and Document AI fit best where answers already exist in company material but take too long to find, especially across large document sets, recurring queries, and frequently changing information.",
  items: [
    {
      name: "Enterprise Knowledge Search",
      body: "Help employees and operations teams find policies, procedures, product details, and operational guidance across approved company sources without manually searching multiple repositories, folders, or documents for answers.",
    },
    {
      name: "Internal Knowledge Assistants",
      body: "Give support, HR, and internal operations teams AI assistants that retrieve approved company knowledge during everyday workflows, helping users access specific guidance without relying only on general model knowledge.",
    },
    {
      name: "Document Question Answering",
      body: "Let legal, compliance, and technical teams ask natural-language questions across connected documents, such as policy exceptions, contract clauses, or specification details, and receive answers from retrieved source passages.",
    },
    {
      name: "Document Processing and Knowledge Preparation",
      body: "Help operations and compliance teams process scanned files, contracts, forms, and reports by extracting usable content and preserving structure before that information enters search, retrieval, or downstream RAG workflows.",
    },
    {
      name: "Research and Document Review",
      body: "Help legal teams, analysts, and technical teams review large document collections by retrieving relevant passages and summarizing key material, so repeated research starts from the information that matters most.",
    },
  ],
};

export const ragProjectCta: CtaBandContent = {
  title: "Turn Your Business Knowledge Into a RAG-Ready AI System",
  body: "Transform documents, knowledge bases, and internal data into searchable, AI-ready knowledge with a RAG and Document AI solution designed around your application and business requirements.",
  cta: { label: "Discuss Your RAG Project", href: "/contact" },
};

export const ragComparison: ComparisonContent = {
  eyebrow: "Comparison",
  title: "RAG vs Fine-Tuning: Which Approach Should You Use?",
  body: "RAG gives an LLM access to external knowledge when it answers, while fine-tuning changes how the model responds through additional training. The right choice depends on whether you need knowledge retrieval, model adaptation, or both.",
  columns: { area: "Decision Factor", lead: "RAG", other: "Fine-Tuning" },
  // `favors` leans each row's marker on the decision board and names the
  // winner in its verdict chip.
  rows: [
    { area: "Knowledge that changes frequently", lead: "Strong fit", other: "Weak fit", favors: "lead" },
    { area: "Showing source evidence for answers", lead: "Yes", other: "No", favors: "lead" },
    {
      area: "Adding new information",
      lead: "Update the source without retraining",
      other: "Requires additional training",
      favors: "lead",
    },
    { area: "Adapting tone, format, or task behavior", lead: "Limited", other: "Strong fit", favors: "other" },
    { area: "Grounding answers in company data", lead: "Strong fit", other: "No", favors: "lead" },
    { area: "Keeping knowledge externally retrievable", lead: "Strong fit", other: "Weak fit", favors: "lead" },
  ],
  notes: [
    "Fine-tuning is often the better choice when the requirement is consistent behavior, style, format, or task performance. RAG suits knowledge that changes or needs to remain externally retrievable and verifiable.",
    "Many production systems use both: fine-tuning shapes how the model responds, while RAG controls the external knowledge available to it at response time.",
  ],
};

export const ragIndustries: CardGridContent = {
  eyebrow: "Industries",
  title: "RAG and Document AI Solutions Across Industries",
  body: "Apply RAG and Document AI across industries where teams rely on large volumes of documents, technical information, and frequently changing business data that must be searched and used efficiently.",
  items: [
    {
      name: "eCommerce",
      body: "Connect product catalogs, supplier agreements, returns policies, warranty information, and support content to AI applications that help customers and support teams find accurate information faster.",
    },
    {
      name: "HealthTech",
      body: "Support retrieval across clinical documentation, care information, policies, and research materials while keeping access aligned with record-handling and permission requirements.",
    },
    {
      name: "EdTech",
      body: "Make course content, learning materials, institutional policies, and academic documentation easier for students, educators, and administrators to search and reference.",
    },
    {
      name: "Real Estate",
      body: "Organize property documents, lease agreements, valuation reports, market information, and policy documents so teams can retrieve relevant details across property reviews and transactions.",
    },
    {
      name: "FinTech",
      body: "Work with policies, compliance documentation, financial reports, and operational procedures that teams need to search, review, and reference accurately.",
    },
    {
      name: "Logistics",
      body: "Improve access to shipment records, fleet documentation, operating procedures, customs information, and service policies for teams handling distributed documents and time-sensitive requests.",
    },
    {
      name: "Telecom",
      body: "Connect technical documentation, service information, network records, support content, and operating procedures to AI-powered search for service and engineering teams.",
    },
    {
      name: "Manufacturing",
      body: "Make technical manuals, SOPs, specifications, maintenance records, quality documentation, and production guidelines easier for engineering and production teams to search and reference.",
    },
  ],
};

export const ragWhyUs: CardGridContent = {
  eyebrow: "Why Soft Suave",
  title: "Why Choose Soft Suave for RAG Development?",
  body: "Work with a RAG development company that brings RAG, Document AI, application development, and enterprise integration into one engineering team, so retrieval, document processing, and the surrounding application are designed to work together.",
  items: [
    {
      name: "RAG and Document AI Expertise",
      body: "Combine RAG and Document AI expertise to design retrieval systems around complex enterprise documents and knowledge.",
    },
    {
      name: "13+ Years of Engineering Experience",
      body: "13+ years of engineering experience, with capabilities across AI, full-stack applications, cloud platforms, APIs, and integrations.",
    },
    {
      name: "400+ AI & Engineering Specialists",
      body: "400+ AI and engineering specialists support architecture, development, integration, testing, and production delivery across complex projects.",
    },
    {
      name: "Retrieval Quality Evaluation",
      body: "Evaluate retrieval using real queries, source relevance, grounding, and failure cases before moving RAG systems into production.",
    },
    {
      name: "End-to-End Application Integration",
      body: "Connect retrieval with applications, APIs, and data sources through one engineering team, reducing handoffs across delivery.",
    },
    {
      name: "Permission-Aware Retrieval Design",
      body: "Build permission requirements into retrieval design early, so confidential documents remain restricted according to existing access rules.",
    },
  ],
};

export const ragTech: TechStackContent = {
  eyebrow: "Technology Stack",
  title: "Technologies We Use for RAG and Document AI Development",
  body: "Build RAG and Document AI systems using technologies across language models, vector search, document processing, orchestration, evaluation, and cloud deployment.",
  // Every name here resolves to a mark in components/home/tech-logo.tsx.
  groups: [
    {
      name: "Large Language Models",
      items: ["OpenAI (GPT-4o)", "Anthropic Claude", "Google Gemini", "Meta Llama", "Mistral", "Azure OpenAI Service"],
    },
    {
      name: "Vector Databases & Search",
      items: ["Pinecone", "Weaviate", "Qdrant", "Milvus", "pgvector", "Elasticsearch", "Azure AI Search"],
    },
    {
      name: "Embeddings & Reranking",
      items: ["OpenAI text-embedding-3", "Cohere Embed", "Cohere Rerank", "Sentence Transformers", "BGE"],
    },
    {
      name: "RAG Frameworks & Orchestration",
      items: ["LangChain", "LlamaIndex", "Haystack", "LangGraph", "Semantic Kernel"],
    },
    {
      name: "Document Processing",
      items: [
        "Azure AI Document Intelligence",
        "AWS Textract",
        "Google Document AI",
        "Unstructured.io",
        "LlamaParse",
        "PyMuPDF",
        "Apache Tika",
      ],
    },
    {
      name: "Evaluation & Monitoring",
      items: ["RAGAS", "LangSmith", "Langfuse", "TruLens", "Phoenix"],
    },
    {
      name: "Infrastructure & Deployment",
      items: [
        "Python",
        "FastAPI",
        "Node.js",
        "Docker",
        "Kubernetes",
        "AWS",
        "Azure",
        "Google Cloud",
        "PostgreSQL",
        "Redis",
        "Airflow",
      ],
    },
  ],
};

export const ragFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "Frequently Asked Questions About RAG and Document AI",
  body: "Get clear answers to common questions about RAG and Document AI before planning your solution.",
  items: [
    {
      q: "What do we need before starting a RAG project?",
      a: "Start with the knowledge sources the system needs to use, the questions users are expected to ask, and who should have access to each source. Data quality, document structure, integrations, permissions, and expected outputs should be reviewed before the retrieval architecture is finalized.",
    },
    {
      q: "How much does a RAG implementation cost?",
      a: "RAG implementation costs vary based on the number and condition of your data sources, document complexity, integrations, access requirements, evaluation needs, and deployment scope. Reviewing these requirements with our experts first helps define a realistic project scope and cost range.",
    },
    {
      q: "How long does a production RAG system take to build?",
      a: "The timeline depends on data readiness, source complexity, integrations, access controls, evaluation requirements, and the level of production setup involved. Starting with our expert assessment helps identify potential delays early and establish a more realistic delivery plan.",
    },
    {
      q: "Does RAG eliminate hallucinations?",
      a: "No. RAG can reduce unsupported responses by grounding the model in retrieved information, but it does not eliminate hallucinations completely. Retrieval quality, source quality, model behavior, prompting, and evaluation still influence whether the final response is accurate, relevant, and supported by available evidence.",
    },
    {
      q: "Can RAG work with scanned PDFs and complex document formats?",
      a: "Yes, when the document content can first be converted into usable information for retrieval. Document AI can help extract and organize content from complex files before it is indexed, allowing the RAG pipeline to search and retrieve information more effectively.",
    },
    {
      q: "How do you measure whether a RAG system is working?",
      a: "Evaluate retrieval and generation separately. Check whether the system finds relevant source material, whether that evidence supports the answer, whether the response addresses the question, and which queries consistently produce weak, missing, or conflicting results.",
    },
    {
      q: "How do you protect confidential documents in RAG?",
      a: "Confidential information should be filtered according to each user’s permitted access before retrieved content reaches the model. The access design depends on existing identity systems, repositories, document permissions, and security requirements already used within the organization.",
    },
  ],
};
