/**
 * Copy for the "Data Science Services" landing page (`/data-science-services`).
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
import type { FitGuideContent } from "@/components/data-science/fit-guide";
import type { ServicesCarouselContent } from "@/components/common/services-carousel";
import type { JourneyContent } from "@/components/home/journey";
import type { CardGridContent } from "@/components/landing/industries";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { FaqContent } from "@/components/landing/faq";

import { sharedHeroAlert, sharedHeroBadges } from "./delivery-shared";

export const dsMeta = {
  slug: "data-science-services",
  path: "/data-science-services",
  // SEO title and meta description. The route appends " | Soft Suave" to the
  // title; the H1 itself lives in `dsHero.titleLines`.
  title: "Data Science Services & Consulting",
  description:
    "Work with Soft Suave for data science services covering consulting, analysis, model development, experimentation, & validation for better business decisions.",
} as const;

export const dsHero: HeroContent = {
  // The last line takes the coral accent.
  titleLines: ["Data Science Services", "for Smarter Business Decisions"],
  body: [
    "Turn business data into useful insights, validated models, and better-informed decisions. Soft Suave provides data science services covering strategy, exploratory analysis, statistical experimentation, model development, and evaluation based on your specific business problem and available data.",
    "Define your business question, assess whether your data supports it, and choose the right analytical or modeling approach before implementation begins.",
  ],
  points: [
    "13+ Years of Technology Expertise",
    "400+ AI & Engineering Specialists",
    "Data Science Consulting & Development",
    "Analysis, Modeling & Validation Expertise",
    "ISO/IEC 27001:2022 Information Security",
  ],
  badges: sharedHeroBadges,
  form: {
    eyebrow: "Business Enquiry",
    title: "Start with your business question",
    note: "Tell us the question you need answered and what data you hold, and we come back with a feasible approach, timeline, and estimate. Everything stays under NDA.",
    submit: "Send requirements",
    sending: "Sending…",
    requirementLabel: "What question should the data answer?",
    requirementPlaceholder:
      "The decision or assumption you want tested, the datasets you already hold, and how the result would be used once it is validated.",
    subject: "Data Science Services enquiry",
    alert: sharedHeroAlert,
  },
  // Hand-placed asset (not a Pexels-pipeline slot) — full-bleed behind the
  // whole hero section, veiled for contrast. See `Hero`'s `image` prop.
  image: {
    src: "/images/four/work-7.png",
    width: 1536,
    height: 1024,
    alt: "A network-model brain on a lit plinth, ringed by panels for analytics charts, document analysis, and cloud systems",
  },
};

export const dsOverview: OverviewContent = {
  eyebrow: "Overview",
  title: "What Are Data Science Services?",
  paragraphs: [
    "Data science services help businesses use existing data to answer defined questions, test hypotheses, uncover patterns, and build or validate analytical models. The work can include data readiness assessment, exploratory analysis, statistical experimentation, model development, and evaluation, with machine learning used when it is appropriate for the problem.",
    "Soft Suave approaches Data Science around the business question first. We assess the available data, identify what can reasonably be learned from it, and determine whether analysis, experimentation, statistical modeling, or machine learning is suitable.",
    "Once the data and analytical approach are validated, the engagement can move toward the most suitable outcome. This may be a set of validated findings, a feasibility decision, an analytical model, or a foundation for a broader AI development initiative.",
  ],
  image: {
    src: "/images/landing/problems/analyst-research.webp",
    width: 1100,
    height: 733,
    alt: "Two colleagues reviewing a laptop dashboard of charts and distribution plots across a meeting table",
  },
};

/**
 * The brief's four-column triage table, rendered by the fit guide
 * (landing/fit-guide.tsx): each business problem becomes a routed row —
 * the data you hold, then the starting point it earns, then the fallback
 * branch for when Data Science alone is not the answer. A real `<table>` of
 * four prose columns is unreadable below about 1200px, and the last column is
 * a caveat rather than a peer of the other three, so it is demoted visually
 * instead of sitting in line with them.
 */
export const dsFit: FitGuideContent = {
  eyebrow: "Business Fit",
  title: "When Does a Business Need Data Science?",
  body: "A business should use Data Science when existing data contains information that can help answer a defined question, test an assumption, identify meaningful patterns, or evaluate a model-based approach. It is especially useful when decisions require deeper analysis than standard reporting or when the feasibility of a data-driven solution needs validation. The table below will help you match the business problem to the right starting point.",
  columns: {
    problem: "Business problem",
    data: "Data available",
    start: "Appropriate starting point",
    next: "Related service if Data Science is not enough",
  },
  rows: [
    {
      problem: "Important patterns are difficult to identify",
      data: "Historical operational, customer, product, or transaction data",
      start: "Exploratory data analysis",
      next: "Additional data-foundation work if data is fragmented or unreliable",
    },
    {
      problem: "A business assumption needs evidence",
      data: "Relevant historical or experimental data",
      start: "Statistical analysis and experimentation",
      next: "Broader product or process work if the question cannot be answered from available data",
    },
    {
      problem: "Customers, products, or behaviors need to be grouped",
      data: "Relevant customer, product, usage, or event data",
      start: "Segmentation and pattern analysis",
      next: "Additional data preparation when the information is incomplete",
    },
    {
      problem: "A model-based idea needs validation",
      data: "Representative historical or labeled data",
      start: "Model feasibility assessment or PoC",
      next: "Broader AI implementation after the approach is validated",
    },
    {
      problem: "A decision needs stronger quantitative evidence",
      data: "Structured business and operational data",
      start: "Decision-support analysis or statistical modeling",
      next: "Workflow or application development when the result must be operationalized",
    },
  ],
  notes: [
    "The first step is not choosing an algorithm. It is determining whether the business question, available data, and required outcome fit together.",
  ],
};

/**
 * Six services, rendered as the centre-focused carousel
 * (landing/services-carousel.tsx). Images are decorative — each card names its
 * service in text — so `alt` is empty.
 */
export const dsServices: ServicesCarouselContent = {
  eyebrow: "Our Services",
  title: "Our Data Science Services",
  body: "Our data science services cover the key stages from understanding a business problem and assessing available data to developing, validating, and supporting models in real-world environments.",
  items: [
    {
      name: "Data Science Consulting & Strategy",
      body: "Define business questions, identify suitable use cases, assess data readiness, and create a practical roadmap for analysis, experimentation, or model development.",
      image: { src: "/images/landing/services/svc-consulting-discovery.webp", alt: "" },
    },
    {
      name: "Exploratory Data Analysis",
      body: "Explore datasets to identify patterns, relationships, anomalies, missing information, and other characteristics that help determine what the available data can support.",
      image: { src: "/images/landing/problems/knowledge-search.webp", alt: "" },
    },
    {
      name: "Statistical Analysis & Experimentation",
      body: "Apply statistical methods and structured experiments to test assumptions, evaluate relationships, compare outcomes, and provide stronger evidence for business decisions.",
      image: { src: "/images/landing/services/svc-proof-of-concept.webp", alt: "" },
    },
    {
      name: "Data Science Development Services",
      body: "Develop statistical and machine learning models based on validated requirements, suitable datasets, and defined evaluation criteria for specific business or operational needs.",
      image: { src: "/images/landing/services/svc-model-selection.webp", alt: "" },
    },
    {
      name: "Model Evaluation & Validation",
      body: "Compare and evaluate models using appropriate criteria and representative data to understand performance, limitations, trade-offs, and suitability for the intended use.",
      image: { src: "/images/landing/services/svc-evaluation-llmops.webp", alt: "" },
    },
    {
      name: "MLOps & Model Lifecycle Support",
      body: "Support model deployment, versioning, monitoring, and lifecycle management so validated models can operate reliably within approved applications, systems, and production environments.",
      image: { src: "/images/landing/services/svc-support-optimisation.webp", alt: "" },
    },
  ],
};

/**
 * Six phases, rendered by the homepage's pinned Journey scene
 * (components/home/journey.tsx) — the same layout its "AI Transformation
 * Journey" uses, which is what this process is: a route walked once, in order,
 * not six cards to compare. `glyph` picks the icon for the phases whose work
 * differs from the homepage's own; 01 and 02 are already the target and the
 * magnifier, which is exactly this process's first two steps.
 */
export const dsProcess: JourneyContent = {
  eyebrow: "Our Approach",
  title: "How Our Data Science Process Works",
  body: "A structured Data Science process reduces the risk of building models before the business question, available data, and evaluation criteria are understood.",
  steps: [
    {
      n: "01",
      name: "Define the Business Question",
      body: "Clarify the decision, problem, assumption, or opportunity that needs investigation and establish what a useful result should help the business understand or decide.",
    },
    {
      n: "02",
      name: "Assess Data Readiness",
      body: "Review the relevant datasets, sources, structure, completeness, consistency, limitations, and accessibility before deciding which analytical methods are appropriate.",
    },
    {
      n: "03",
      name: "Explore & Analyze",
      body: "Study the available data to identify distributions, relationships, missing information, unusual patterns, and other characteristics that influence later experimentation or modeling.",
      glyph: "explore",
    },
    {
      n: "04",
      name: "Experiment & Model",
      body: "Test suitable statistical or machine learning approaches based on the problem, available evidence, and what was learned during exploratory analysis.",
      glyph: "experiment",
    },
    {
      n: "05",
      name: "Evaluate & Validate",
      body: "Compare outputs against agreed criteria and representative data to determine whether the analytical or modeling approach is suitable for the intended business use.",
      glyph: "validate",
    },
    {
      n: "06",
      name: "Define the Next Step",
      body: "Prepare validated findings or model outputs for the agreed next step, which may include decision support, application integration, additional data work, or broader AI development.",
      glyph: "handoff",
    },
  ],
};

export const dsIndustries: CardGridContent = {
  eyebrow: "Industries",
  title: "Data Science Across Industries",
  body: "Data Science applications vary by industry because the available data, operational context, business questions, and decision requirements differ.",
  items: [
    {
      name: "FinTech",
      body: "Analyze transaction, customer, lending, product, or risk-related datasets to identify patterns and support evidence-based financial and operational decisions.",
    },
    {
      name: "HealthTech",
      body: "Explore health-related and operational datasets to identify meaningful patterns, evaluate analytical questions, and support suitable modeling initiatives around defined healthcare use cases.",
    },
    {
      name: "EdTech",
      body: "Analyze learner activity, engagement, performance, and product data to uncover patterns that inform educational products and learning decisions.",
    },
    {
      name: "Ecommerce",
      body: "Study customer, product, transaction, and behavioral data to understand user patterns and support merchandising, engagement, and commercial decision-making.",
    },
    {
      name: "Logistics",
      body: "Analyze fleet, route, process, and operational information to identify patterns and support data-informed logistics planning and operational decisions.",
    },
    {
      name: "Telecom",
      body: "Use customer, usage, network, and operational datasets to investigate patterns that can support service, network, and customer-related decisions.",
    },
  ],
};

export const dsWhyUs: CardGridContent = {
  eyebrow: "Why Soft Suave",
  title: "Why Choose Soft Suave for Data Science Services?",
  body: "Choosing a data science company requires more than comparing modeling technologies. The engagement should connect business questions, available data, analytical methods, validation requirements, information security, and the wider software environment in which the results may eventually be used.",
  items: [
    {
      name: "13+ Years of Technology Expertise",
      body: "Bring Data Science initiatives into an engineering environment shaped by 13+ years of delivery experience.",
    },
    {
      name: "400+ AI & Engineering Specialists",
      body: "Access 400+ AI and engineering specialists to connect Data Science with applications, APIs, and systems.",
    },
    {
      name: "Data Science Consulting & Development",
      body: "Work with one team across discovery, analysis, experimentation, model development, validation, and planned implementation handoffs.",
    },
    {
      name: "ISO/IEC 27001:2022 Certification",
      body: "Protect sensitive business data through Soft Suave’s ISO/IEC 27001:2022 information security management certification during engagements.",
    },
    {
      name: "Connected AI & Software Engineering",
      body: "Connect validated Data Science outputs with broader AI development, applications, APIs, and existing software environments.",
    },
    {
      name: "Structured Global Delivery",
      body: "Delivery presence across Chennai, Bengaluru, and the United States, supporting global project collaboration and coordination.",
    },
  ],
};

/**
 * The brief's Technology Category/Technologies table, rendered by the
 * homepage's marquee TechStack — the same layout the other service pages use,
 * one row per category. Every name here has a real mark in
 * `components/home/tech-logo.tsx`; add one there before adding a tool here, or
 * the chip falls back to the generic dot.
 */
export const dsTech: TechStackContent = {
  eyebrow: "Technology Stack",
  title: "Data Science Technology Stack",
  body: "Our technology stack supports data exploration, statistical analysis, experimentation, machine learning, model validation, and production model lifecycle management.",
  groups: [
    { name: "Programming & Querying", items: ["Python", "SQL"] },
    { name: "Data Analysis & Processing", items: ["Pandas", "NumPy"] },
    { name: "Statistical Computing", items: ["SciPy", "statsmodels"] },
    { name: "Machine Learning", items: ["Scikit-learn", "XGBoost", "LightGBM"] },
    { name: "Deep Learning", items: ["TensorFlow", "PyTorch"] },
    { name: "Data Visualization", items: ["Matplotlib", "Plotly"] },
    { name: "Development & Experimentation", items: ["Jupyter Notebook", "JupyterLab"] },
    { name: "MLOps & Model Management", items: ["MLflow", "Docker", "Kubernetes", "CI/CD"] },
    { name: "Cloud Platforms", items: ["AWS", "Microsoft Azure", "Google Cloud"] },
  ],
};

export const dsFaqs: FaqContent = {
  eyebrow: "FAQs",
  title: "Data Science Solutions & Services FAQs",
  body: "Find answers about data science consulting services, development, project scope, costs, and more.",
  items: [
    {
      q: "How Much Do Data Science Services Cost?",
      a: "Data Science service costs depend on the business problem, available data, analysis required, model complexity, validation needs, integrations, and overall project scope. Project pricing is confirmed after the business requirements, available data, expected outcomes, technical environment, and scope are reviewed.",
    },
    {
      q: "Can We Begin With a Data Science PoC?",
      a: "Yes. A Data Science PoC can help determine whether a proposed use case is technically and practically viable before a wider project begins. A useful PoC should define the business question, use representative data, establish evaluation criteria, and produce enough evidence to support a clear proceed, revise, or stop decision.",
    },
    {
      q: "How Long Does a Data Science Project Take?",
      a: "The duration of a Data Science project depends on data availability, data quality, the question being investigated, experimentation requirements, model complexity, validation needs, and integration scope. A feasibility assessment or focused analysis will usually require a different level of work from a project that includes model development and application integration.",
    },
    {
      q: "Can a Data Science Project Start if Our Data Is Fragmented?",
      a: "Yes, but fragmented data should be assessed before deeper analysis or model development begins. The initial Data Science work can identify whether the available information is usable, which limitations affect the intended question, and whether additional preparation or data-foundation work is required before meaningful experimentation or modeling can continue.",
    },
    {
      q: "What Happens After a Data Science Model Is Validated?",
      a: "After validation, the next step depends on how the model will be used. A validated model may support internal analysis, be prepared for an application or API workflow, require additional testing with broader data, or become part of a wider AI implementation based on the project’s agreed business and technical requirements.",
    },
    {
      q: "What Data Is Needed Before Starting a Data Science Project?",
      a: "A Data Science project needs data that is relevant to the business question and sufficiently representative of the situation being studied. The data does not need to be perfect at the start, but its availability, structure, completeness, consistency, and limitations should be assessed before selecting an analytical or modeling approach.",
    },
    {
      q: "What Are the Benefits of Hiring a Data Science Consultant Versus Building an In-House Team?",
      a: "Hiring a data science consultant can be useful when a business needs specialized analysis, independent feasibility assessment, or additional capability without first building a permanent internal team. An in-house team may be more suitable when Data Science is a continuous core function requiring long-term ownership, repeated experimentation, and ongoing domain knowledge.",
    },
  ],
};
