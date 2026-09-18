/**
 * Copy for the "Predictive Intelligence Services" landing page
 * (`/predictive-intelligence-services`).
 *
 * Shapes match the prop types exported by the shared landing sections in
 * `components/landing/*` and `components/common/*` — the shared
 * landing-page components — so each section is `<Component content={…} />` with
 * no adapter in between. Kept out of `content.ts` because that file is the
 * homepage's source and is imported by Nav, Footer and every homepage section.
 *
 * The clients band and the closing CTA are the homepage's own sections
 * rendered verbatim (see the route), so they read their copy from
 * `content.ts` and have no entry here.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ComparisonContent } from "@/components/common/comparison";
import type { ServicesCarouselContent } from "@/components/common/services-carousel";
import type { CardGridContent } from "@/components/landing/industries";
import type { ProcessContent } from "@/components/landing/process";
import type { IntegrationContent } from "@/components/common/integration";
import type { FaqContent } from "@/components/landing/faq";
import type { TechStackContent } from "@/components/landing/tech-stack";

import { sharedHeroAlert, sharedHeroBadges } from "./delivery-shared";

export const piMeta = {
  slug: "predictive-intelligence-services",
  path: "/predictive-intelligence-services",
  // SEO title and meta description. The route appends " | Soft Suave" to the
  // title; the H1 itself lives in `piHero.titleLines`.
  title: "Predictive Intelligence Services & Solutions",
  description:
    "Soft Suave offers predictive intelligence services, including forecasting, anomaly detection, and recommendation systems that turn predictions into action.",
} as const;

export const piHero: HeroContent = {
  // The last line takes the coral accent.
  titleLines: ["Predictive Intelligence Services:", "From Prediction to Action"],
  body: [
    "Soft Suave develops custom systems that turn business data into forecasts, risk signals, recommendations, alerts, and workflow actions. We help product, operations, finance, customer, and technology teams apply predictive capabilities to specific decisions within their existing processes.",
    "Bring predictions into your daily operations through practical signals, recommendations, alerts, and actions aligned with your business decisions.",
  ],
  points: [
    "13+ Years of Technology Expertise",
    "400+ AI & Engineering Specialists",
    "Forecasting & Predictive Models",
    "Anomaly Detection & Risk Signals",
    "Recommendations & Workflow Actions",
  ],
  badges: sharedHeroBadges,
  form: {
    eyebrow: "Business Enquiry",
    title: "Scope your predictive intelligence project",
    note: "Tell us the decision you want to support and the data behind it, and we come back with an approach, timeline, and estimate. Everything stays under NDA.",
    submit: "Send requirements",
    sending: "Sending…",
    requirementLabel: "What decision should the prediction support?",
    requirementPlaceholder:
      "The outcome you want to anticipate, the data you hold, who acts on the result, and the system or workflow it needs to reach.",
    subject: "Predictive Intelligence enquiry",
    alert: sharedHeroAlert,
  },
  // Hand-placed asset (not a Pexels-pipeline slot) — full-bleed behind the
  // whole hero section, veiled for contrast. See `Hero`'s `image` prop.
  image: {
    src: "/images/four/predective.jpg",
    width: 1536,
    height: 896,
    alt: "An analytics overlay of ratings, growth, and engagement metrics used for predictive intelligence",
  },
};

export const piOverview: OverviewContent = {
  eyebrow: "Overview",
  title: "What Is Predictive Intelligence?",
  paragraphs: [
    "Predictive intelligence is the use of historical and current data, statistical techniques, and machine learning to anticipate likely outcomes and turn those predictions into operational decisions and actions. Rather than ending with a report, it converts model output into signals, scores, alerts, recommendations, dashboards, or workflow actions that help people and systems decide what to watch, prioritize, or do next.",
    "There is no universally accepted industry definition. Some organizations treat the term as interchangeable with predictive analytics, while others use it for systems that connect predictions with operational decisions.",
    "Predictive intelligence works by analyzing relevant historical and current signals, generating a forecast or score, and converting that output into an alert, recommendation, or workflow action. The system then captures the response and outcome, creating a feedback loop for continued monitoring and improvement.",
  ],
  image: {
    src: "/images/landing/problems/analyst-research.webp",
    width: 1098,
    height: 732,
    alt: "An analyst reviewing forecasts, scores, and trend charts across a data workspace",
  },
};

/**
 * The "vs. predictive analytics" table. Rendered by `landing/comparison.tsx`
 * with `tone="neutral"` and `level={3}`: the brief marks this as an H3 under
 * the Overview's H2, and the table distinguishes two things rather than
 * picking a winner, so neither column is marked as preferred.
 */
export const piComparison: ComparisonContent = {
  title: "Predictive Intelligence vs. Predictive Analytics",
  body: "Predictive analytics identifies outcomes that are likely to occur based on available data. Predictive intelligence uses those estimates within a decision or operational workflow to help a person or system determine what deserves attention and what action may be appropriate.",
  columns: {
    area: "Dimension",
    lead: "Predictive analytics",
    other: "Predictive intelligence",
  },
  rows: [
    {
      area: "Primary question",
      lead: "What is likely to happen?",
      other: "What should we watch or do next?",
    },
    {
      area: "Typical output",
      lead: "Forecast, probability, score, or analysis",
      other: "Signal, alert, recommendation, dashboard, or workflow action",
    },
    {
      area: "Natural endpoint",
      lead: "Insight may be handed to an analyst or decision-maker",
      other: "Insight is delivered inside a decision or operational workflow",
    },
    {
      area: "Underlying methods",
      lead: "Statistics, machine learning, pattern analysis",
      other: "Uses predictive analytics and ML, then adds operational delivery and action",
    },
    {
      area: "Business role",
      lead: "Estimates outcomes",
      other: "Helps people or systems respond to anticipated outcomes",
    },
  ],
  notes: [
    "The practical distinction is where the process ends. An analysis may produce a probability that an event will occur. An intelligence system connects that probability with thresholds, context, recommendations, delivery channels, and feedback. The result could prioritize cases in a human-review queue, update an application, trigger an alert, or recommend the next appropriate response.",
  ],
};

/**
 * Rendered as the centre-focused carousel (landing/services-carousel.tsx).
 * Each card wears a piece of the hand-placed landing artwork under
 * public/images/landing/. The images are decorative (the card names the
 * capability in text), so `alt` is empty.
 */
export const piCapabilities: ServicesCarouselContent = {
  eyebrow: "Capabilities",
  title: "Predictive Intelligence Solutions We Develop",
  body: "We develop custom capabilities that help your business anticipate change, identify important signals, and support timely action. Explore the core services available for different predictive requirements and operational goals below.",
  items: [
    {
      name: "AI Forecasting Services",
      body: "Forecast future metrics, events, and operational conditions using time-series models that support capacity planning, scenario evaluation, and informed business decisions.",
      image: { src: "/images/landing/services/svc-consulting-discovery.webp", alt: "" },
    },
    {
      name: "Predictive Modeling Services",
      body: "Build validated classification, regression, and ranking models that estimate risk, customer behavior, likelihood, priority, or expected outcomes from business data.",
      image: { src: "/images/landing/services/svc-model-selection.webp", alt: "" },
    },
    {
      name: "Anomaly Detection Services",
      body: "Detect unusual behaviors, transactions, and operational signals using adaptive thresholds that prioritize meaningful exceptions while reducing false-positive alert noise effectively.",
      image: { src: "/images/landing/services/svc-security-governance.webp", alt: "" },
    },
    {
      name: "Recommendation System Development",
      body: "Develop recommendations that prioritize relevant content, products, features, or workflow actions using business rules, contextual models, and continuous feedback loops.",
      image: { src: "/images/landing/services/svc-product-modernisation.webp", alt: "" },
    },
  ],
};

export const piApplications: CardGridContent = {
  eyebrow: "Applications",
  title: "Predictive Intelligence Use Cases",
  body: "Predictive capabilities can be designed around different operational decisions. The use cases below show how these systems support planning, prioritization, customer decisions, and timely responses across different business workflows.",
  items: [
    {
      name: "Planning and Resource Allocation",
      body: "Forecasting could help teams anticipate workloads, capacity constraints, and bottlenecks before allocating people, inventory, equipment, or infrastructure across changing operational requirements and scenarios more effectively.",
    },
    {
      name: "Risk, Quality and Exception Detection",
      body: "Predictive models could flag unusual transactions, prioritize cases by severity, and support human review within financial workflows without treating every event in the same way.",
    },
    {
      name: "Customer Conversion and Retention Signals",
      body: "Models could estimate whether customers may convert, disengage, renew, or need assistance, helping teams prioritize timely outreach using account history and interaction signals more effectively.",
    },
    {
      name: "Personalization and Next-Best Action",
      body: "Recommendation models could suggest relevant content, features, offers, or support actions within existing workflows, while feedback helps teams evaluate and improve their usefulness over time.",
    },
  ],
};

export const piProcess: ProcessContent = {
  eyebrow: "Our Process",
  title: "How We Build Predictive Intelligence Systems",
  body: "Our process connects model development with a defined decision, operational workflow, and measurable outcome. Each stage addresses both predictive performance and the system’s practical use.",
  steps: [
    {
      n: "01",
      name: "Define the Decision and Success Measure",
      body: "We define what needs to be predicted, who will use the result, what action it should support, and how success will be measured in practice.",
    },
    {
      n: "02",
      name: "Assess Data Readiness and Establish a Baseline",
      body: "We review historical examples, current signals, outcome labels, data quality, and access requirements before establishing a clear baseline for evaluating future model performance and usefulness.",
    },
    {
      n: "03",
      name: "Prototype and Validate the Model",
      body: "We prepare relevant features, compare suitable models, validate performance, analyze prediction errors, and review thresholds with stakeholders before selecting the most appropriate approach to proceed.",
    },
    {
      n: "04",
      name: "Integrate Predictions Into Workflows",
      body: "We connect validated outputs to APIs, dashboards, alerts, applications, automated processes, or review queues, ensuring each prediction supports the intended business decision within existing workflows.",
    },
    {
      n: "05",
      name: "Monitor and Improve",
      body: "We monitor model performance, data quality, drift, feedback, and business outcomes, using defined criteria to guide threshold adjustments, retraining, and continued system improvement after deployment.",
    },
  ],
};

export const piIntegration: IntegrationContent = {
  eyebrow: "Integration",
  title: "Integrating Predictive Intelligence With Existing Systems",
  body: "Predictions become useful when they reach the right application, person, or workflow. Integration design connects required data sources with appropriate decision channels while preserving the controls your process requires.",
  items: [
    {
      name: "Data and Business-System Connections",
      body: "Connect predictive models with business applications, CRM and ERP systems, operational databases, data warehouses, cloud storage, internal platforms, and third-party APIs using reliable data pipelines.",
    },
    {
      name: "Decision and Action Channels",
      body: "Deliver forecasts, scores, and alerts through dashboards, notifications, applications, workflow engines, APIs, or review queues, giving users enough context to respond appropriately to each signal.",
    },
    {
      name: "Deployment and Model Operations",
      body: "Deploy models using cloud environments, Docker, Kubernetes, APIs, CI/CD, and MLflow, supported by versioning, monitoring, access controls, controlled releases, and rollback procedures for reliable updates.",
    },
  ],
};

export const piIndustries: CardGridContent = {
  eyebrow: "Industries",
  title: "Predictive Intelligence Across Key Industries",
  body: "Predictive capabilities can support industry-specific decisions by identifying patterns, anticipating outcomes, and guiding timely responses. Explore how these systems may apply across the following business sectors and operational environments below.",
  items: [
    {
      name: "FinTech",
      body: "Models could identify unusual transactions, assess lending risk, prioritize account reviews, and deliver timely signals to financial teams and customer-facing workflows under human oversight.",
    },
    {
      name: "HealthTech",
      body: "Models could identify changing health patterns, anticipate service needs, prioritize cases, and provide timely signals using relevant clinical and operational information under human review controls.",
    },
    {
      name: "Ecommerce",
      body: "Forecasting and recommendation models could anticipate order patterns, identify customer interests, prioritize relevant products, and support inventory, engagement, and retention decisions across digital commerce workflows.",
    },
    {
      name: "Logistics",
      body: "Predictive systems could anticipate shipment volumes, identify route or capacity constraints, prioritize operational exceptions, and support fleet, workforce, and delivery planning across daily logistics workflows.",
    },
    {
      name: "Telecom",
      body: "Models could identify network anomalies, predict customer disengagement, prioritize service issues, and support capacity planning, retention activities, and timely responses across telecom service operations effectively.",
    },
    {
      name: "EdTech",
      body: "Predictive models could identify learning patterns, anticipate support needs, recommend relevant content, and help teams prioritize student engagement and intervention activities across digital education platforms.",
    },
  ],
};

export const piWhyUs: CardGridContent = {
  eyebrow: "Why Choose Us",
  title: "Why Choose Soft Suave as Your Predictive Intelligence Company",
  body: "We develop custom capabilities around a defined business decision instead of offering a fixed packaged platform. The objective is to connect appropriate predictive methods with the software, workflows, users, and operational controls needed to apply their outputs.",
  items: [
    {
      name: "Decision-Led System Design",
      body: "Design each system around the outcome, intended user, required action, and clearly defined operational purpose.",
    },
    {
      name: "Connected Engineering Capabilities",
      body: "Connect AI models with web, mobile, cloud, and enterprise software through familiar applications and interfaces.",
    },
    {
      name: "ISO/IEC 27001:2022 Certified",
      body: "Soft Suave holds ISO/IEC 27001:2022 certification for its information security management system across development and delivery.",
    },
    {
      name: "Maintainable Implementation Approach",
      body: "Build maintainable systems using explainability, monitoring, model versioning, thresholds, feedback, and controlled updates after deployment.",
    },
    {
      name: "Technology Experience at Scale",
      body: "Bring 13+ years of technology expertise and 400+ AI & Engineering Specialists to implementation requirements.",
    },
    {
      name: "Structured Global Delivery",
      body: "Delivery presence across Chennai, Bengaluru, and the United States supports collaboration across global project teams.",
    },
  ],
};

/**
 * Technology stack, rendered after the Why-Us band by the homepage's marquee
 * tech section. The eight groups are the review sheet's two-column table
 * (Category / Tools & Technologies) verbatim, so each row becomes one marquee
 * row and the table reads as a table without being one.
 */
export const piTech: TechStackContent = {
  eyebrow: "Technology Stack",
  title: "Technologies Behind Our Predictive Intelligence Solutions",
  body: "We select tools for data preparation, predictive modeling, integration, and monitoring based on your business goals, existing systems, and deployment requirements.",
  groups: [
    {
      name: "Programming & Data Processing",
      items: ["Python", "SQL", "R", "pandas", "NumPy", "Apache Spark"],
    },
    {
      name: "Forecasting & Predictive Modeling",
      items: ["statsmodels", "Prophet", "scikit-learn", "XGBoost", "LightGBM"],
    },
    {
      name: "Anomaly Detection & Recommendations",
      items: ["PyOD", "River", "TensorFlow Recommenders", "implicit"],
    },
    { name: "Deep Learning Frameworks", items: ["PyTorch", "TensorFlow", "Keras"] },
    {
      name: "Data Storage & Pipelines",
      items: ["PostgreSQL", "Snowflake", "Google BigQuery", "Apache Airflow", "Apache Kafka"],
    },
    {
      name: "APIs, Workflows & Dashboards",
      items: ["FastAPI", "REST APIs", "Microsoft Power Automate", "Power BI", "React"],
    },
    {
      name: "Cloud & Deployment",
      items: ["AWS", "Microsoft Azure", "Google Cloud", "Docker", "Kubernetes", "GitHub Actions"],
    },
    {
      name: "Model Operations & Monitoring",
      items: ["MLflow", "DVC", "SHAP", "Evidently", "Prometheus", "Grafana"],
    },
  ],
};

export const piFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "Frequently Asked Questions",
  body: "Find clear answers to common questions about planning and building your predictive intelligence system.",
  items: [
    {
      q: "What data is needed for predictive intelligence?",
      a: "The required data depends on the outcome you want to anticipate. Most useful projects need relevant historical examples, dependable signals available at prediction time, clearly defined outcomes, and sufficient data quality. Data volume alone cannot compensate for missing labels, inconsistent definitions, or irrelevant signals.",
    },
    {
      q: "Can it work with our existing applications?",
      a: "Yes, predictive capabilities can be integrated with existing applications when suitable connection points and data access are available. Outputs may be delivered through APIs, embedded features, dashboards, alerts, workflow engines, or review queues rather than requiring users to adopt an entirely separate application.",
    },
    {
      q: "How do you evaluate predictive model reliability?",
      a: "Reliability is evaluated against representative validation data and business-relevant metrics. The assessment should compare the model with the current baseline, examine false-positive and false-negative costs, review performance across important segments, and continue after deployment through data, drift, and outcome monitoring.",
    },
    {
      q: "Does predictive intelligence need real-time data?",
      a: "Not every use case needs real-time data. Immediate fraud or operational alerts may require real-time or near-real-time signals, while planning and prioritization tasks may work effectively with hourly, daily, or scheduled batch predictions. The update frequency should match how quickly the decision changes.",
    },
    {
      q: "How long does implementation take?",
      a: "Delivery timelines depend on the project scope, complexity, integrations, and resource requirements. Data readiness, validation needs, workflow design, security requirements, and deployment architecture can all affect implementation. A realistic schedule is confirmed after the discovery discussion and review of the proposed use case.",
    },
    {
      q: "What affects predictive intelligence development cost?",
      a: "Cost depends on use-case complexity, data preparation, the number and type of models, integration requirements, user interfaces, security needs, deployment design, and ongoing monitoring. Project pricing is confirmed after requirements and scope are reviewed, rather than applying one estimate to every implementation.",
    },
    {
      q: "When is predictive intelligence not appropriate?",
      a: "It may not be appropriate when the target outcome is poorly defined, relevant historical data is insufficient, available signals do not support the decision, or the surrounding process cannot act on predictions. A simple rule-based approach may also be preferable when it solves the requirement effectively.",
    },
  ],
};
