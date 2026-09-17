/**
 * Copy for the "Computer Vision Development Services" landing page
 * (`/computer-vision-development-services`).
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
import type { ProcessContent } from "@/components/landing/process";
import type { CapabilityGuideContent } from "@/components/computer-vision/capability-guide";
import type { ServicesCarouselContent } from "@/components/common/services-carousel";
import type { CardGridContent } from "@/components/landing/industries";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { FaqContent } from "@/components/landing/faq";

export const cvMeta = {
  slug: "computer-vision-development-services",
  path: "/computer-vision-development-services",
  // SEO title and meta description. The route appends " | Soft Suave" to the
  // title; the H1 itself lives in `cvHero.titleLines`.
  title: "Computer Vision Development Services",
  description:
    "Custom computer vision development services that transform camera feeds, images, and documents into validated outputs for real-world operations.",
} as const;

export const cvHero: HeroContent = {
  eyebrow: "Computer Vision Development",
  // The last line takes the coral accent.
  titleLines: ["Computer Vision Development Services", "for Smarter Workflows"],
  body: [
    "Soft Suave provides custom computer vision development services that turn camera feeds, images, video, and visual documents into outputs your business can use. We develop workflows that detect relevant objects or information, validate the results, connect with existing systems, and support defined operational actions.",
    "Bring us your visual input, business problem, and required outcome. We will help you assess the use case and plan the right Computer Vision workflow.",
  ],
  points: [
    "13+ Years of Technology Expertise",
    "400+ AI & Engineering Specialists",
    "ISO 9001:2015-Certified Processes",
    "Operational Computer Vision Experience",
    "End-to-End CV Development",
  ],
  // Trust badges carried over from the older service landing pages.
  badges: ["ISO 9001:2015 certified", "NDA on request", "150+ global clients", "Reply in 1 business day"],
  form: {
    eyebrow: "Business Enquiry",
    title: "Assess your Computer Vision use case",
    note: "Tell us what your cameras capture and what the workflow must deliver, and we come back with a feasibility view, approach, and estimate. Everything stays under NDA.",
    submit: "Send requirements",
    sending: "Opening your mail…",
    requirementLabel: "What do you want the workflow to do?",
    requirementPlaceholder:
      "The visual input you have, what needs to be detected, how the result should be validated, and which system or team acts on it.",
    subject: "Computer Vision Development enquiry",
  },
  // Hand-placed asset (not a Pexels-pipeline slot) — full-bleed behind the
  // whole hero section, veiled for contrast. See `Hero`'s `image` prop.
  image: {
    src: "/images/four/vision.webp",
    width: 780,
    height: 496,
    alt: "A glowing digital eye representing computer vision and image recognition",
  },
};

export const cvOverview: OverviewContent = {
  eyebrow: "Overview",
  title: "How Computer Vision Services Move From Visual Input to Operational Action",
  paragraphs: [
    "Computer vision services convert visual information into validated outputs that software and operational teams can use.",
    "Computer vision development covers the full path from receiving an image, document, or video feed to identifying relevant information and sending the result into a defined business workflow.",
  ],
  image: {
    src: "/images/landing/problems/knowledge-search.webp",
    width: 1200,
    height: 800,
    alt: "An operator working across a visual interface of linked image, document, data, and AI panels",
  },
};

/**
 * The five workflow stages under the Overview's own H2 — rendered as headless
 * numbered step cards (`Process` with no masthead), so the stages continue
 * that section rather than opening a second one with a duplicate heading.
 * The stage number is the card's own marker, so it is not repeated in the
 * heading text.
 */
export const cvPipeline: ProcessContent = {
  steps: [
    {
      n: "01",
      name: "Visual Input",
      body: "The workflow begins with camera feeds, recorded video, images, or visual documents. The source, viewpoint, visibility, consistency, and operating environment shape what the system needs to interpret.",
    },
    {
      n: "02",
      name: "Detection",
      body: "The system locates relevant objects, events, patterns, or information within the visual input. Depending on the problem, this may involve object detection, vehicle detection, OCR, video analytics, or visual inspection.",
    },
    {
      n: "03",
      name: "Classification / Validation",
      body: "Detected information is classified or checked against criteria defined for the use case. Validation determines whether an output meets the acceptance requirements needed for the next action.",
    },
    {
      n: "04",
      name: "Integration",
      body: "Validated outputs connect with the applications, interfaces, and workflows that consume them. This turns model output into usable information for the wider operation.",
    },
    {
      n: "05",
      name: "Operational Action",
      body: "The workflow delivers an actionable result, such as an alert, dashboard update, review task, or audit record. The value comes from what your operation can do with the validated visual information.",
    },
  ],
};

export const cvCapabilities: CapabilityGuideContent = {
  eyebrow: "Capability Guide",
  title: "Match the Computer Vision Capability to the Business Problem",
  body: "Start with the operational problem and required action, then select the capability that can interpret the available visual input. This table connects common needs with suitable Computer Vision approaches and validation requirements.",
  columns: {
    problem: "Business problem",
    input: "Visual input",
    capability: "Suitable CV capability",
    validation: "Validation requirement",
    outcome: "Operational outcome",
  },
  rows: [
    {
      problem: "Continuous visual monitoring is missing important objects or events",
      input: "Live camera or video feed",
      capability: "Object detection and video analytics",
      validation: "Define which objects or events matter and how outputs should be validated",
      outcome: "Send validated events into alerts, dashboards, or the relevant operational workflow",
    },
    {
      problem: "Vehicle and axle events need to be detected and validated automatically",
      input: "Camera feed",
      capability: "Vehicle and axle detection and classification",
      validation: "Validate axle counts and axle-profile classifications",
      outcome: "Support congestion alerts, enforcement alerts, and audit history",
    },
    {
      problem: "Information needs to be extracted from visual documents",
      input: "Document images or scans",
      capability: "OCR",
      validation: "Validate extracted information against document and workflow requirements",
      outcome: "Pass usable output into the relevant downstream workflow",
    },
    {
      problem:
        "Manual visual quality inspection is repetitive or inconsistent, including manufacturing quality checks",
      input: "Images or video",
      capability: "Visual inspection",
      validation: "Define the visual criteria that determine whether an item needs action or review",
      outcome: "Route the result into the appropriate quality-control or review workflow",
    },
  ],
  notes: [
    "These patterns are starting points rather than interchangeable packages. A useful custom Computer Vision solution must be designed around the visual evidence available, the result that needs validation, and the system or person responsible for the next action.",
  ],
};

/**
 * Rendered as the centre-focused carousel (landing/services-carousel.tsx).
 * Each card wears a piece of the hand-placed landing artwork under
 * public/images/landing/. The images are decorative (the card names the
 * service in text), so `alt` is empty.
 */
export const cvServices: ServicesCarouselContent = {
  eyebrow: "Services",
  title: "Computer Vision Software Development Services Across the Workflow",
  body: "Our custom computer vision development services cover each stage required to move from raw visual information to an operational result. The scope is shaped around your use case rather than a disconnected list of model capabilities.",
  items: [
    {
      name: "Computer Vision Consulting & Use-Case Assessment",
      body: "We assess whether Computer Vision suits your business problem, review visual inputs and operating conditions, and define the workflow, validation requirements, and operational outcome.",
      image: { src: "/images/landing/services/svc-consulting-discovery.webp", alt: "" },
    },
    {
      name: "Data Preparation",
      body: "Assess, organize, and prepare visual data to represent expected operating conditions, then structure it for model development, validation, and representative testing across the intended workflow.",
      image: { src: "/images/landing/services/svc-proof-of-concept.webp", alt: "" },
    },
    {
      name: "Custom Model Development & Training",
      body: "Build and train detection and classification logic around the specific use case, available visual inputs, and the conditions in which the operational workflow will run.",
      image: { src: "/images/landing/services/svc-model-selection.webp", alt: "" },
    },
    {
      name: "Object & Vehicle Detection",
      body: "Identify defined objects and vehicles across image or video inputs, then produce structured outputs for classification, validation, and use within the wider operational workflow.",
      image: { src: "/images/landing/services/svc-application-development.webp", alt: "" },
    },
    {
      name: "Optical Character Recognition (OCR)",
      body: "Extract information from visual documents, validate it against document and workflow requirements, and make usable data available to the relevant downstream software systems and applications.",
      image: { src: "/images/landing/problems/document-processing.webp", alt: "" },
    },
    {
      name: "Video Analytics",
      body: "Use computer vision video analytics to interpret continuous visual feeds, identify relevant events, and send defined outputs to operational systems for alerts, dashboards, or review.",
      image: { src: "/images/landing/services/svc-dedicated-teams.webp", alt: "" },
    },
    {
      name: "Visual Inspection",
      body: "Assess images or video against defined criteria, helping determine whether an item should proceed, be flagged for attention, or move into a human review workflow.",
      image: { src: "/images/landing/services/svc-security-governance.webp", alt: "" },
    },
    {
      name: "Validation & Acceptance Testing",
      body: "Define acceptance criteria and test the Computer Vision workflow against representative inputs and operating conditions to confirm that outputs meet requirements established for operational use.",
      image: { src: "/images/landing/services/svc-evaluation-llmops.webp", alt: "" },
    },
    {
      name: "Model Optimization",
      body: "Refine the Computer Vision workflow against its visual conditions and operational requirements, then retest changes using representative inputs to confirm acceptable performance within the intended use case.",
      image: { src: "/images/landing/services/svc-support-optimisation.webp", alt: "" },
    },
    {
      name: "System Integration & Deployment Support",
      body: "Connect validated outputs to applications, dashboards, alerts, and review workflows that consume them, then refine the deployment against defined operational requirements, expected actions, and responsibilities.",
      image: { src: "/images/landing/services/svc-integration.webp", alt: "" },
    },
  ],
};

export const cvIndustries: CardGridContent = {
  eyebrow: "Industries",
  title: "Computer Vision Applications Across Industries",
  body: "Computer Vision can support industry-specific visual workflows by interpreting images, video, camera feeds, and documents, then directing validated outputs into operational systems responsible for action. These are some of the industries where Computer Vision can be applied. The right approach is confirmed against the visual inputs and operational requirements of each engagement.",
  items: [
    {
      name: "eCommerce",
      body: "Analyze product imagery, monitor visual inventory workflows, and extract document information for catalog operations, order processing, and quality review tasks.",
    },
    {
      name: "HealthTech",
      body: "Extract information from scanned records and visual documents to support administrative workflows, document review, and structured processing.",
    },
    {
      name: "EdTech",
      body: "Process scanned learning materials, extract text, and review visual content to support content organization, accessibility, and education administration workflows efficiently.",
    },
    {
      name: "Real Estate",
      body: "Extract information from property documents and images, support visual asset reviews, and route validated outputs into listing and management workflows.",
    },
    {
      name: "FinTech",
      body: "Extract information from scanned financial documents, validate required fields, and route usable outputs into review, onboarding, and processing workflow systems.",
    },
    {
      name: "Logistics",
      body: "Interpret camera and video feeds to detect vehicles, monitor operational events, and support alerts, dashboards, audit histories, and review workflows.",
    },
    {
      name: "Telecom",
      body: "Use visual inspection and document extraction to support equipment reviews, field documentation, asset records, and downstream maintenance coordination workflow processes.",
    },
    {
      name: "Manufacturing",
      body: "Apply computer vision for manufacturing to inspect products, detect defined visual conditions, and route results into quality-control and review workflows.",
    },
  ],
};

export const cvSetupCta: CtaBandContent = {
  eyebrow: "Feasibility Check",
  title: "Will Computer Vision Work With Your Existing Setup?",
  body: "Tell us what your cameras capture today and what the workflow must deliver. We’ll assess whether your existing setup can support the required Computer Vision use case before development starts.",
  cta: { label: "Schedule a Consultation", href: "#enquiry" },
};

export const cvProcess: ProcessContent = {
  eyebrow: "Our Process",
  title: "From Use-Case Validation to Operational Deployment",
  body: "Our team takes your Computer Vision project from a defined use case to operational deployment, giving you a structured process aligned with your requirements and intended outcome at every stage.",
  steps: [
    {
      n: "01",
      name: "Define the Business Problem",
      body: "We define the operational problem, required decision, intended action, and the people or systems that will use the output.",
    },
    {
      n: "02",
      name: "Assess Visual Inputs and Conditions",
      body: "We review available images, video, camera feeds, or documents alongside the conditions that affect feasibility and representative testing.",
    },
    {
      n: "03",
      name: "Specify Detection Requirements",
      body: "We define the objects, events, patterns, or information the workflow must detect across its intended operating environment.",
    },
    {
      n: "04",
      name: "Establish Classification and Validation",
      body: "We establish classification rules and acceptance criteria that determine whether detected outputs are suitable for the required business use.",
    },
    {
      n: "05",
      name: "Build and Test the Workflow",
      body: "We combine the visual inputs, detection logic, classification, and validation stages, then test the workflow against agreed requirements.",
    },
    {
      n: "06",
      name: "Connect the Required Systems",
      body: "We connect validated outputs with applications, dashboards, alerts, and review workflows based on confirmed interface and processing requirements.",
    },
    {
      n: "07",
      name: "Deploy and Refine",
      body: "We deploy the completed workflow, review its performance against project requirements, and refine it for the intended operation.",
    },
  ],
};

export const cvWhyUs: CardGridContent = {
  eyebrow: "Why Choose Us",
  title: "Why Soft Suave for Computer Vision Development",
  body: "Choose a Computer Vision development company that connects Computer Vision capability with the engineering and integration needed to put visual outputs to work. Soft Suave approaches each engagement as a complete workflow rather than an isolated model.",
  items: [
    {
      name: "Development Shaped Around the Use Case",
      body: "We choose the right technology for your use case and workflow.",
    },
    {
      name: "Capability Across the Visual Workflow",
      body: "Capabilities span detection, OCR, video analytics, validation, and operational integration.",
    },
    {
      name: "Operational Computer Vision Experience",
      body: "Experience delivering Computer Vision from visual input to operational action.",
    },
    {
      name: "Quality-Focused Delivery",
      body: "ISO 9001:2015-certified processes support structured quality management throughout project delivery.",
    },
    {
      name: "Delivery Support Across Target Markets",
      body: "Delivery presence across Chennai, Bengaluru, and the United States supports global collaboration.",
    },
    {
      name: "End-to-End Workflow Delivery",
      body: "Support covers use-case assessment, model development, testing, integration, and deployment.",
    },
  ],
};

/**
 * The brief's Category/Technologies table, as the static bordered group
 * panels (`landing/tech-stack.tsx`) rather than the homepage's marquee rows:
 * thirteen categories of two or three tools each would leave every marquee
 * nearly empty. Every name here resolves to a mark in
 * `components/home/tech-logo.tsx`.
 */
export const cvTech: TechStackContent = {
  eyebrow: "Technologies",
  title: "Technology Stack for Computer Vision Development",
  body: "We work with proven technologies for model development, image and video processing, system integration, testing, and production deployment.",
  groups: [
    { name: "Programming Languages", items: ["Python", "C++"] },
    { name: "Computer Vision", items: ["OpenCV", "TorchVision"] },
    { name: "Model Development & Training", items: ["TensorFlow", "PyTorch"] },
    { name: "Image Processing", items: ["Pillow", "NumPy"] },
    { name: "Video Processing", items: ["FFmpeg", "GStreamer"] },
    { name: "Optical Character Recognition", items: ["Tesseract OCR", "PaddleOCR"] },
    { name: "Model Inference & Optimization", items: ["ONNX Runtime", "TensorRT", "OpenVINO"] },
    { name: "APIs & System Integration", items: ["FastAPI", "REST APIs", "GraphQL"] },
    { name: "Databases", items: ["PostgreSQL", "MongoDB"] },
    { name: "Cloud Platforms", items: ["AWS", "Microsoft Azure", "Google Cloud"] },
    { name: "Containerization & Deployment", items: ["Docker", "Kubernetes"] },
    { name: "Dashboards & Interfaces", items: ["React", "Next.js"] },
    { name: "Testing & CI/CD", items: ["pytest", "Jenkins", "GitHub Actions"] },
  ],
};

export const cvFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "Common Questions About Computer Vision Development",
  body: "Find clear answers to common questions about Computer Vision development and implementation.",
  items: [
    {
      q: "Is Computer Vision appropriate for my problem?",
      a: "Computer Vision is appropriate when a workflow depends on interpreting repeatable visual inputs and the required result or action can be clearly defined and validated. Feasibility also depends on input quality and operating conditions.",
    },
    {
      q: "What data is required for a Computer Vision project?",
      a: "The required data depends on the visual task and should represent the conditions in which the system will operate. This may include images, video, camera feeds, or visual documents with relevant real-world variations.",
    },
    {
      q: "How accurate can a Computer Vision system be?",
      a: "Achievable performance depends on the use case, input quality, operating conditions, and the validation criteria defined for the project. Representative testing is required because a universal accuracy figure cannot reflect every visual source, environment, and acceptance requirement.",
    },
    {
      q: "What affects Computer Vision development cost?",
      a: "Computer Vision development cost depends on the visual problem, available inputs, processing requirements, integration scope, and deployment complexity. Project pricing is confirmed after requirements and scope are reviewed for each engagement.",
    },
    {
      q: "How does Computer Vision deployment work?",
      a: "Computer Vision deployment depends on where visual inputs originate, how quickly results are required, and which systems must receive the output. The approach is defined around processing needs, interface availability, operating conditions, and the required downstream action.",
    },
    {
      q: "Can Computer Vision integrate with our existing cameras and systems?",
      a: "Integration can be assessed when the available camera feeds and system interfaces can support the required Computer Vision workflow. Compatibility remains use-case specific; Soft Suave has case-specific edge-camera integration experience from a transportation implementation.",
    },
    {
      q: "What are the limitations of Computer Vision?",
      a: "Computer Vision performance can be affected by the quality and consistency of visual inputs and by changing real-world operating conditions. Viewpoint, lighting, visibility, obstruction, environmental variation, and unclear validation criteria may limit what the workflow can interpret reliably.",
    },
  ],
};
