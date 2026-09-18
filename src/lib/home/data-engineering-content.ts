/**
 * Copy for the "Data Engineering Services" landing page
 * (`/data-engineering-services`).
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
import type { ShowcaseContent } from "@/components/data-engineering/showcase";
import type { ProcessContent } from "@/components/landing/process";
import type { ComparisonContent } from "@/components/common/comparison";
import type { CardGridContent } from "@/components/landing/industries";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { FaqContent } from "@/components/landing/faq";

import { sharedHeroAlert, sharedHeroBadges } from "./delivery-shared";

export const deMeta = {
  slug: "data-engineering-services",
  path: "/data-engineering-services",
  // SEO title and meta description. The route appends " | Soft Suave" to the
  // title; the H1 itself lives in `deHero.titleLines`.
  title: "Data Engineering Services & Solutions",
  description:
    "Build stronger data foundations with Soft Suave’s data engineering services for data pipelines, integrated systems, analytics-ready data, and AI solutions.",
} as const;

export const deHero: HeroContent = {
  // The last line takes the coral accent.
  titleLines: ["Data Engineering Services", "for Analytics and AI"],
  body: [
    "Build connected data foundations that move information reliably across applications, databases, cloud environments, and business systems. Create consistent, accessible data that supports reporting, analytics, artificial intelligence, and informed decision-making as your business requirements continue to grow.",
    "Soft Suave provides data engineering services to structure data flows, build reliable pipelines, integrate systems, and support analytics and AI.",
  ],
  points: [
    "13+ Years of Technology Expertise",
    "Time-Zone & Language Aligned Teams",
    "AWS, Azure & Google Cloud Expertise",
    "400+ AI & Engineering Specialists",
    "ISO/IEC 27001:2022 Certified",
  ],
  badges: sharedHeroBadges,
  form: {
    eyebrow: "Business Enquiry",
    title: "Plan your data engineering project",
    note: "Tell us which systems hold your data and where it needs to reach, and we come back with an approach, timeline, and estimate. Everything stays under NDA.",
    submit: "Send requirements",
    sending: "Sending…",
    requirementLabel: "What should your data flows support?",
    requirementPlaceholder:
      "The source systems and databases involved, the reporting, analytics, or AI use case, and the cloud environment you run on.",
    subject: "Data Engineering Services enquiry",
    alert: sharedHeroAlert,
  },
  // Hand-placed asset (not a Pexels-pipeline slot) — full-bleed behind the
  // whole hero section, veiled for contrast. See `Hero`'s `image` prop.
  image: {
    src: "/images/four/work-9.png",
    width: 1536,
    height: 1024,
    alt: "Connected data systems rendered as linked database, cloud, network, and analytics nodes",
  },
};

export const deOverview: OverviewContent = {
  eyebrow: "Overview",
  title: "What Do Data Engineering Services Cover?",
  paragraphs: [
    "Data engineering services help businesses collect, connect, organize, and move data across applications, databases, cloud environments, and internal systems. They create the technical foundation required to make business data accessible and usable across different technology environments.",
    "A well-structured data foundation supports reliable data flows between systems and prepares information for applications, reporting, analytics, and AI workloads. Data engineering also helps businesses reduce disconnected data environments and establish clearer ways for information to move where it is needed.",
    "Soft Suave provides data engineering services focused on building data pipelines, connecting databases and business systems, supporting cloud-based data environments, and creating structured data foundations around existing technology and business requirements.",
  ],
  image: {
    src: "/images/four/work-8.png",
    width: 1536,
    height: 1024,
    alt: "An isometric data platform linking databases, cloud storage, documents, and analytics dashboards",
  },
};

/**
 * Rendered as the showcase index (landing/showcase.tsx): a numbered list
 * whose pinned artwork follows the entry you are reading. Deliberately not
 * the carousel the other service pages use — this is a catalogue to scan,
 * not four headline services to sell. Images are decorative (the row names
 * the solution in text), so `alt` is empty.
 */
export const deSolutions: ShowcaseContent = {
  eyebrow: "Our Solutions",
  title: "Data Engineering Solutions We Deliver",
  body: "Soft Suave helps businesses turn scattered data into reliable, usable information that supports smoother operations, better decisions, and stronger digital systems.",
  items: [
    {
      name: "Data Pipeline Development Services",
      body: "Build data pipelines that move information across databases, applications, cloud environments, and internal systems while supporting analytics, AI, and reporting.",
      image: { src: "/images/landing/services/svc-integration.webp", alt: "" },
    },
    {
      name: "Data Foundation Engineering",
      body: "Build structured data foundations that organize how business information is connected, accessed, and made available across different technology environments.",
      image: { src: "/images/landing/services/svc-application-development.webp", alt: "" },
    },
    {
      name: "Database and System Connectivity",
      body: "Connect databases, applications, and internal systems so required business data can move between the platforms and workflows that depend on it.",
      image: { src: "/images/landing/services/svc-product-modernisation.webp", alt: "" },
    },
    {
      name: "Cloud Data Engineering",
      body: "Build and support data flows across cloud-based environments while working with existing databases, applications, storage systems, and infrastructure requirements.",
      image: { src: "/images/landing/services/svc-dedicated-teams.webp", alt: "" },
    },
    {
      name: "Analytics Data Preparation",
      body: "Structure and connect business data so reporting and analytics environments can access the information required for dashboards, analysis, and decision-making.",
      image: { src: "/images/landing/problems/analyst-research.webp", alt: "" },
    },
    {
      name: "AI Data Foundation Engineering",
      body: "Prepare connected data foundations that make relevant business information available to AI applications, model workflows, RAG systems, and other intelligent solutions.",
      image: { src: "/images/landing/services/svc-model-selection.webp", alt: "" },
    },
  ],
};

/**
 * Rendered as the spine rail (common/process-rail.tsx): six steps hung off
 * one drawn coral line, rather than the card grid the other service pages
 * use. A sequence is a line, and drawing it says more than six equal cards.
 */
export const deProcess: ProcessContent = {
  eyebrow: "Our Process",
  title: "How Does a Data Engineering Engagement Work?",
  body: "A structured process helps keep data engineering work focused, transparent, and aligned with your business needs from the beginning. We follow a clear path for planning, implementation, validation, and delivery while adapting the work to your existing environment.",
  steps: [
    {
      n: "01",
      name: "Define the Data Requirement",
      body: "Define the business process, application, analytics need, or AI use case the data engineering work must support from the start.",
    },
    {
      n: "02",
      name: "Assess the Existing Environment",
      body: "Review databases, applications, cloud storage, internal systems, and existing connections to understand the current data environment before planning implementation work.",
    },
    {
      n: "03",
      name: "Design the Data Flow",
      body: "Define how data should move between source and destination systems, considering required connections, workflows, dependencies, and downstream business use cases.",
    },
    {
      n: "04",
      name: "Build the Required Components",
      body: "Build the agreed pipelines, system connections, and supporting components while keeping implementation aligned with the approved architecture and project scope.",
    },
    {
      n: "05",
      name: "Validate the Data Flow",
      body: "Validate completed data flows against agreed requirements, identify issues, and resolve them before the implementation moves into the target environment.",
    },
    {
      n: "06",
      name: "Deploy Into the Target Environment",
      body: "Deploy the solution into the target environment and confirm that it operates correctly within the surrounding application and data ecosystem.",
    },
  ],
};

/**
 * In-house vs outsourced, rendered by `common/comparison` in its `table`
 * layout: a plain three-column table with each consideration as a row header
 * (review: "use a simple table, and the text is very small"). It ran as the
 * versus-ledger before that.
 *
 * `tone="neutral"` — no row carries `favors`, and the closing note is
 * explicitly even-handed, so neither column is marked as the answer.
 */
export const deEngagement: ComparisonContent = {
  eyebrow: "Engagement Options",
  title: "In-House vs Outsourced Data Engineering",
  body: "Outsourced data engineering can provide additional engineering capacity for defined data initiatives, while an in-house approach keeps the capability within the internal organization. The right approach depends on the required deliverables, available internal expertise, project scope, and long-term ownership requirements.",
  columns: {
    area: "Consideration",
    lead: "In-House Data Engineering",
    other: "Outsourced Data Engineering",
  },
  rows: [
    {
      area: "Engineering capacity",
      lead: "Built and maintained internally",
      other: "External capacity can support defined engineering work",
    },
    {
      area: "Specialist requirements",
      lead: "Depends on skills available within the internal team",
      other: "Skills can be aligned with the agreed project requirements",
    },
    {
      area: "Delivery responsibility",
      lead: "Managed through internal engineering resources",
      other: "Responsibilities are defined through the agreed engagement scope",
    },
    {
      area: "Scaling project capacity",
      lead: "Requires available internal resources",
      other: "Capacity can be aligned with changing project requirements",
    },
    {
      area: "Long-term ownership",
      lead: "Capability remains directly within the organization",
      other: "Internal ownership can continue after agreed external delivery",
    },
  ],
  notes: [
    "Data engineering outsourcing should be evaluated against the specific systems, deliverables, internal capacity, and ownership model required for the project rather than as a general replacement for an internal engineering team.",
  ],
};

/** Five cards, so the grid runs five across on a wide desktop. */
export const deUseCases: CardGridContent = {
  eyebrow: "Use Cases",
  title: "Data Engineering Use Cases",
  body: "Data engineering can support business systems that need information to move reliably between multiple applications, databases, cloud environments, and downstream tools.",
  items: [
    {
      name: "Reporting Relies on Disconnected Systems",
      body: "When reporting depends on information stored across separate systems, data engineering connects approved business information and creates reliable flows for reporting.",
    },
    {
      name: "Applications Need Data From Existing Backends",
      body: "When applications require data from databases or backend systems not built for direct access, data engineering creates the connections needed to use it.",
    },
    {
      name: "Manual Data Movement Slows Operations",
      body: "When teams repeatedly export, transfer, or adjust information between systems, data engineering creates structured flows that reduce manual movement between platforms.",
    },
    {
      name: "AI and Analytics Lack Accessible Data",
      body: "When approved business information is scattered across systems, data engineering makes required data accessible to analytics environments and AI applications.",
    },
    {
      name: "Product Data Requirements",
      body: "When digital products depend on information from databases, backend platforms, or approved cloud environments, data engineering connects the required sources and systems.",
    },
  ],
};

export const deIndustries: CardGridContent = {
  eyebrow: "Industries We Serve",
  title: "Data Engineering Across Industries",
  body: "Build reliable data foundations that connect critical systems, improve data access, and support analytics, applications, and AI across industries.",
  items: [
    {
      name: "FinTech",
      body: "Connect financial data across applications and databases to support reporting, transaction workflows, analytics, and other approved digital systems.",
    },
    {
      name: "HealthTech",
      body: "Structure data flows across healthcare applications and systems to support secure access, reporting, analytics, and connected digital experiences.",
    },
    {
      name: "EdTech",
      body: "Connect learning platforms, applications, and databases so educational data can support reporting, personalization, analytics, and digital learning experiences.",
    },
    {
      name: "Ecommerce",
      body: "Connect product, customer, order, and operational data across platforms to support reporting, applications, analytics, and business workflows.",
    },
    {
      name: "Logistics",
      body: "Build connected data flows across operational systems to support shipment visibility, reporting, analytics, planning, and logistics applications.",
    },
    {
      name: "Telecom",
      body: "Connect data across network, customer, and operational systems to support reporting, analytics, applications, and approved AI initiatives.",
    },
  ],
};

export const deWhyUs: CardGridContent = {
  eyebrow: "Why Soft Suave",
  title: "Why Choose Soft Suave as Your Data Engineering Company?",
  body: "Soft Suave brings together data foundations, application engineering, cloud technologies, and AI capabilities to support connected data initiatives across modern technology environments. As a data engineering services company, we help businesses build data systems that work effectively with the applications, platforms, and workflows that depend on them.",
  items: [
    {
      name: "13+ Years of Technology Expertise",
      body: "Bring 13+ years of technology engineering experience across applications, cloud environments, databases, and connected systems.",
    },
    {
      name: "400+ AI & Engineering Specialists",
      body: "Work with 400+ AI & Engineering Specialists across applications, backend, cloud technologies, and data foundations.",
    },
    {
      name: "Connected Engineering Capabilities",
      body: "Soft Suave connects applications, backend platforms, AI systems, databases, cloud environments, and data foundations together.",
    },
    {
      name: "Cloud Technology Experience",
      body: "Work across technology environments using AWS, Microsoft Azure, and Google Cloud based on project requirements.",
    },
    {
      name: "ISO/IEC 27001:2022 Certified",
      body: "Soft Suave maintains an ISO/IEC 27001:2022-certified information security management system across development and delivery activities.",
    },
    {
      name: "Structured Global Delivery",
      body: "Soft Suave supports global delivery through teams across Chennai, Bengaluru, and the United States.",
    },
  ],
};

export const dePlanCta: CtaBandContent = {
  title: "Plan Your Data Engineering Project",
  body: "Discuss your data engineering requirements with our team. We’ll review your project scope, clarify your needs, and confirm pricing based on the required services, complexity, timeline, and deliverables.",
  cta: { label: "Discuss Your Project Scope", href: "/contact" },
};

/**
 * The brief's Category/Tech-names table, rendered by the homepage's marquee
 * TechStack — the same layout `/rag-development-services` uses, one row per
 * category. Every name here has a real mark in `components/home/tech-logo.tsx`;
 * add one there before adding a tool here, or the chip falls back to the
 * generic dot.
 */
/**
 * Technology stack. The nine categories are the review sheet's replacement
 * table (Category / Tech Names) verbatim — it consolidated the previous
 * fifteen narrower groups, so a reader scanning the marquee rows sees one row
 * per capability area rather than one per tool family.
 */
export const deTech: TechStackContent = {
  eyebrow: "Technology Stack",
  title: "Technology Stack for Data Engineering Services",
  body: "Our data engineering services use modern cloud, backend, database, and engineering technologies to support reliable, scalable, and connected data environments.",
  groups: [
    {
      name: "Cloud & Infrastructure",
      items: [
        "AWS",
        "Microsoft Azure",
        "Google Cloud",
        "Docker",
        "Kubernetes",
        "Terraform",
        "Git",
        "CI/CD pipelines",
      ],
    },
    {
      name: "Data Warehouses & Lakes",
      items: [
        "Snowflake",
        "Google BigQuery",
        "Amazon Redshift",
        "Azure Synapse",
        "Databricks",
        "Amazon S3",
        "Azure Data Lake Storage",
        "Google Cloud Storage",
        "Delta Lake",
        "Apache Iceberg",
      ],
    },
    {
      name: "Data Pipelines & Integration",
      items: [
        "Apache Airflow",
        "AWS Glue",
        "Azure Data Factory",
        "Google Cloud Composer",
        "Dagster",
        "Prefect",
        "Fivetran",
        "Airbyte",
        "Apache NiFi",
        "REST APIs",
        "GraphQL",
      ],
    },
    {
      name: "Languages, Processing & Transformation",
      items: [
        "Python",
        "SQL",
        "Scala",
        "Java",
        "Apache Spark",
        "PySpark",
        "AWS EMR",
        "pandas",
        "dbt",
        "Apache Beam",
      ],
    },
    {
      name: "Streaming & Real-Time Processing",
      items: ["Apache Kafka", "AWS Kinesis", "Google Pub/Sub", "Azure Event Hubs", "Apache Flink"],
    },
    {
      name: "Databases & Search",
      items: [
        "PostgreSQL",
        "MySQL",
        "Microsoft SQL Server",
        "Oracle",
        "Amazon RDS",
        "MongoDB",
        "Amazon DynamoDB",
        "Cassandra",
        "Redis",
        "Elasticsearch",
      ],
    },
    {
      name: "BI & Analytics",
      items: ["Power BI", "Tableau", "Looker", "Amazon QuickSight", "Metabase"],
    },
    {
      name: "AI & Vector Data",
      items: ["Pinecone", "Weaviate", "pgvector", "Chroma", "LangChain"],
    },
    {
      name: "Data Quality & Governance",
      items: ["Great Expectations", "Apache Atlas", "AWS Glue Data Catalog", "Monte Carlo"],
    },
  ],
};

export const deFaqs: FaqContent = {
  eyebrow: "FAQs",
  title: "Frequently Asked Questions",
  body: "Find answers to common questions about Data Engineering Services, project scope, delivery, and implementation.",
  items: [
    {
      q: "What are data engineering services?",
      a: "Data engineering services build and connect the systems required to move and make data available across applications, databases, cloud environments, analytics tools, and AI systems. The exact scope depends on the existing environment and where the data needs to be used.",
    },
    {
      q: "What does a data engineering company do?",
      a: "A data engineering company helps design and implement the data flows and supporting systems required to connect data sources with applications and downstream use cases. The work can include data pipelines, database connections, cloud data flows, and connections between internal systems.",
    },
    {
      q: "What are data pipeline development services?",
      a: "Data pipeline development services build the technical flows required to move data between approved source and destination systems. The pipeline requirements depend on the systems involved, how the information needs to move, and where it will be consumed.",
    },
    {
      q: "Can Data Engineering work with our existing systems?",
      a: "Data engineering can be planned around existing databases, applications, cloud storage, and internal systems without assuming that the full technology environment needs to be replaced. The appropriate approach depends on the current architecture and required outcome.",
    },
    {
      q: "How does Data Engineering support AI?",
      a: "Data engineering supports AI by creating the data foundations and connections needed for AI applications to access relevant business information. A suitable approach is shaped by the type of AI solution being built, the data available, and the expected output.",
    },
    {
      q: "Which cloud platforms does Soft Suave work with?",
      a: "Soft Suave's technology experience includes AWS, Microsoft Azure, and Google Cloud. We select technologies based on your existing environment, technical requirements, and the needs of the data engineering solution.",
    },
    {
      q: "Should Data Engineering be handled in-house or outsourced?",
      a: "Data Engineering can be handled internally or supported through an outsourced engagement depending on available engineering capacity, specialist requirements, project scope, and long-term ownership. The decision should be based on the specific Data Engineering deliverables rather than outsourcing considerations alone.",
    },
    {
      q: "How much do Data Engineering Services cost?",
      a: "Data Engineering Services pricing depends on scope, source systems, required connections, engineering complexity, and deployment requirements. Project pricing is confirmed after requirements and scope are reviewed.",
    },
  ],
};
