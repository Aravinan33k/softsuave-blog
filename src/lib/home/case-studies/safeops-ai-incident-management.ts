import type { CaseStudyContent } from "@/components/case-study/case-study";
import { HERO_PLATFORM_ICONS as P } from "./platform-icons";

/**
 * `/case-study-safeops-ai-incident-management` — softsuave.com's SafeOps case
 * study (https://www.softsuave.com/case-study-safeops-ai-incident-management),
 * rebuilt on the site's case-study template the way `vehicle-intelligence.ts`
 * is.
 *
 * Every line of copy is the live page's, verbatim: hero (including its H1
 * sub-tag "and Compliance Optimization for Offshore Operations"), the six
 * numbered sections and their cards, the pull quote, the twelve features, the
 * four figures, the download panel and modal, and the related-case-study
 * heading and card blurbs (live's own five, which leave SafeOps out). Live's
 * Results section has no intro paragraph, so neither does this one. Section
 * ids are live's (`#section1`…`#section6`). The images and the PDF are live's,
 * self-hosted (`public/images/case-studies/safeops-ai-incident-management/`,
 * `public/assets/case-studies/`); the PDF keeps live's path.
 *
 * Not carried over: the hero image's `alt="health-care"`, and live's `<title>`
 * "SafeOps AI Incident Management | Case Study", set here in the case-study
 * pages' own "… Case Study | Soft Suave" form — see `safeOpsMeta`.
 */

export const safeOpsMeta = {
  path: "/case-study-safeops-ai-incident-management",
  title: "SafeOps AI Incident Management Case Study",
  /** Live's meta description, verbatim. */
  description:
    "See how Soft Suave built SafeOps, an AI-driven incident management and compliance platform automating classification, emergency response and audit-readiness for offshore maritime and energy operations.",
} as const;

const IMG = "/images/case-studies/safeops-ai-incident-management";
const PDF = "/assets/case-studies/SafeOps_Case_Study.pdf";

export const safeOpsCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1 — plain, highlighted, then the smaller sub-tag — set as one
    // headline line over the sub-tag, as the Vehicle Intelligence hero is.
    titleLines: ["AI-Driven Incident Management", "and Compliance Optimization for Offshore Operations"],
    accent: "Incident Management",
    titleSubLast: true,
    body: [
      "Automating incident classification, emergency response coordination and regulatory compliance for marine operators, national oil-and-gas producers and offshore rig departments — real-time processing and AI-driven insights that speed up decisions, streamline incident handling and keep operations continuously audit-ready.",
    ],
    points: [],
    facts: [
      { label: "Industry :", value: "Oil and Gas" },
      { label: "Platform : ", value: "Android, iOS, Web", icons: [P.Android, P.iOS, P.Web] },
    ],
    aside: {
      src: `${IMG}/dashboard.webp`,
      width: 1569,
      height: 1003,
      alt: "SafeOps AI incident management platform on desktop and mobile, showing incident reporting, categorization and emergency response tracking",
      blurDataURL:
        "data:image/webp;base64,UklGRrQAAABXRUJQVlA4WAoAAAAQAAAADwAACQAAQUxQSEAAAAABYBXZdpP8xwNPCAjqxRZYipaTXh1ExAQcNK63BQs2xdrzBlsGztvWN2FHWXte1lIg0SIi0wu3pFqly2/MN6sUVlA4IE4AAADQAQCdASoQAAoAA4BaJZQAAuQAMX7ZAAD+uFdGHuLpgy4F6U/QYfDzDzNuRjX/gotKO1m+sSS0jP59wH5UOZLngOv2pYvYhVl2Xh+EAAA=",
    },
    image: {
      src: `${IMG}/hero-bg.webp`,
      width: 1672,
      height: 941,
      // Decorative backdrop: the dashboard beside the copy is the hero's image.
      alt: "",
      blurDataURL: "data:image/webp;base64,UklGRigAAABXRUJQVlA4IBwAAAAwAQCdASoQAAkAA4BaJaQAA3AA/vUD6PxVAAAA",
    },
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "About the Client",
      kicker: "01 — About the Client",
      title: "Safety-critical operations at sea, every day",
      body: [
        "The client operates in the maritime and offshore energy sector, where marine operators, national oil-and-gas producers and rig departments run safety-critical operations around the clock. Every incident, hazard and near miss must be reported, investigated and closed under strict regulatory oversight, with roles, responsibilities and work-item progress tracked across multiple domains — from incident reporting to near-miss tracking. Keeping that record accurate and audit-ready at all times is essential to safe, compliant operations.",
      ],
    },
    {
      id: "section2",
      nav: "The Challenge",
      kicker: "02 — The Challenge",
      title: "Manual, siloed and exposed to audit risk",
      body: [
        "Every incident, hazard and near miss carried real safety and regulatory stakes, yet the process for handling them ran on paperwork and disconnected systems — leaving response times slow, ownership unclear, and audit-readiness dependent on the last manual review.",
      ],
      cards: {
        variant: "plain",
        items: [
          {
            name: "Manual incident processes",
            body: "Manual incident tracking caused delays and reporting bottlenecks — critical information moved only as fast as the paperwork behind it.",
          },
          {
            name: "No visibility into progress",
            body: "A lack of visibility into roles, responsibilities and interventions hindered progress, leaving teams unsure who owned what during incident handling.",
          },
          {
            name: "Compliance at risk",
            body: "Manual regulatory checks increased the likelihood of audit failures — documentation and compliance status were only as current as the last manual review.",
          },
          {
            name: "Fragmented, siloed systems",
            body: "Operational data sat siloed across separate systems, preventing the holistic analysis needed to spot patterns and recurring risks.",
          },
        ],
      },
    },
    {
      id: "section3",
      nav: "The Solution",
      kicker: "03 — The Solution",
      title: "Three AI modules across the incident lifecycle",
      body: [
        "Soft Suave delivered an AI-powered incident management and compliance platform that automates key workflows with real-time processing and insight — classifying incidents for faster triage, coordinating emergency response with live alerts and resource tracking, and managing the entire lifecycle from first report to root cause, corrective action and closure.",
      ],
      cards: {
        variant: "icon",
        items: [
          {
            name: "AI-Powered Categorization",
            body: "Automates classification of incidents, hazards and near misses for faster triage — with AI-driven document analysis and standard suggestions recommending the right response for each issue.",
          },
          {
            name: "Real-Time Emergency Response",
            body: "Delivers live alerts, resource tracking and emergency response team coordination — with in-app emergency services and team communication keeping everyone aligned as events unfold.",
          },
          {
            name: "Compliance & Incident Lifecycle",
            body: "Connects reporting, investigation, corrective actions and closure in one platform — aligned with safety standards, with documentation and audits automated and root cause captured for every incident.",
          },
        ],
      },
      quote:
        "\"One AI platform from first report to closed action — faster response, continuous compliance and a complete, audit-ready operational record.\"",
    },
    {
      id: "section4",
      nav: "Key Feature",
      kicker: "04 — Key Features",
      title: "Twelve capabilities, one platform",
      body: [
        "SafeOps combines AI-driven categorization, real-time emergency coordination, and end-to-end lifecycle tracking into a single incident management platform. These capabilities give offshore teams faster response, continuous compliance, and a complete, audit-ready operational record.",
      ],
      list: [
        "AI-Driven Document Analysis",
        "AI Categorization of Incidents & Near Misses",
        "AI Standard Suggestions for Issues",
        "Real-Time Emergency Response Monitoring",
        "Live Alerts & ERT Resource Tracking",
        "In-App Emergency Services & Team Communication",
        "Integrated Incident Management (Report to Closure)",
        "Root Cause Analysis & Investigation",
        "Automated Compliance Tracking",
        "Corrective Actions & Closure Management",
        "Roles, Responsibilities & Work-Item Tracking",
        "Version Control & Document Revision Management",
      ],
      image: {
        src: `${IMG}/platform.webp`,
        width: 1563,
        height: 872,
        alt: "SafeOps AI incident management platform interface",
        blurDataURL:
          "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADQAQCdASoQAAkAA4BaJYgCdAEf/M3YAAD+eG+zvqJbtvevz0DgqG+O3/zkmG8JWLLYpJAA",
      },
    },
    {
      id: "section5",
      nav: "Results & Impact",
      kicker: "05 — Results & Impact",
      title: "Faster response, leaner operations, cleaner audits",
      stats: [
        { value: "70%", label: "Faster incident response through automated access to critical information" },
        { value: "80%", label: "Reduction in manual effort across data handling and tracking" },
        { value: "60%", label: "Improvement in compliance efficiency via continuous automated monitoring" },
        { value: "50%", label: "Operational cost savings from streamlined, automated workflows" },
      ],
    },
    {
      id: "section6",
      nav: "Why Soft Suave",
      kicker: "06 — Why Soft Suave",
      title: "AI depth for safety-critical operations",
      body: [
        "Incident management in the maritime and offshore energy world leaves no room for lost reports or missed regulatory checks. Soft Suave delivered a platform trusted with that responsibility: AI categorization that triages incidents, hazards and near misses in real time, compliance automation that keeps documentation and audits continuously current, and an integrated lifecycle tracking every role, responsibility and work item from first report to root cause and closure — turning a manual, fragmented process into a connected, audit-ready operation.",
      ],
    },
  ],

  download: {
    navLabel: "Download",
    body: "Download this practical case study to learn how our AI-driven incident management platform speeds up response, automates compliance, and keeps offshore operations continuously audit-ready.",
    label: "Download Case Study",
    pdf: PDF,
    fileName: "SafeOps_Case_Study.pdf",
    requirement:
      "Case study download: requested the SafeOps AI Incident Management case study (AI-Driven Incident Management and Compliance Optimization for Offshore Operations) PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – SafeOps AI Incident Management",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the SafeOps AI Incident Management case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // Live's "Related Case Studies" carousel: its heading, standfirst and five
  // cards (SafeOps itself is not among them), each with live's own short
  // blurb. The images are the ones the case-study index already ships.
  related: {
    eyebrow: "Related Case Studies",
    title: "Real-World Impact Through Digital Transformation",
    body: "Explore how we help startups and SMBs grow, launch successful products, and solve challenges with tech and strategy—backed by real results in every case study.",
    tileCta: "View Case Study",
    items: [
      {
        title: "AI-Powered Contract & Tender Management Lifecycle Platform",
        body: "Soft Suave built an AI platform that automates tender evaluation and keeps an immutable audit trail for enterprise procurement.",
        image: { src: "/images/case-studies/tender-intelligence-cs.webp", alt: "Tender Intelligence Platform" },
        href: "/case-study-tender-intelligence",
      },
      {
        title: "An AI-Powered Shift Intelligence and Digital Logbook Platform for LNG Operations",
        body: "Soft Suave built an on-premises AI platform that turns free-text operational logs into instant shift summaries and source-cited answers, in English and Arabic.",
        image: { src: "/images/case-studies/shift-sense-cs.webp", alt: "AI-Powered Shift Intelligence & Digital Logbook Platform" },
        href: "/case-study-shiftsense-ai-shift-intelligence",
      },
      {
        title: "An AI Content Production Programme for Enterprise Strategic Communications",
        body: "Soft Suave built an AI content programme that speeds up campaign production and delivers bilingual English-Arabic content at scale.",
        image: { src: "/images/case-studies/brand-forge-cs.webp", alt: "AI Content Production Programme" },
        href: "/case-study-brand-forge",
      },
      {
        title: "An AI-Powered Smart Wellness Platform Revolutionizing Pet Healthcare",
        body: "Soft Suave brings AI health assessments, digital records, and preventive care together to help pet parents and vets catch concerns early.",
        image: { src: "/images/case-studies/well-pet-cs.webp", alt: "Pet Care Application" },
        href: "/case-study-wellpet-ai-smart-wellness-platform",
      },
      {
        title: "An AI-Powered Compliance Analysis Platform for Influencer Marketing",
        body: "Soft Suave built an AI platform that checks sponsored influencer content against compliance rules and returns a verdict in seconds.",
        image: { src: "/images/case-studies/post-guard-cs.webp", alt: "AI-Powered Influencer Marketing Platform" },
        href: "/case-study-postguard-compliance-ai",
      },
    ],
  },
};
