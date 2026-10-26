import type { CaseStudyContent } from "@/components/case-study/case-study";
import { HERO_PLATFORM_ICONS as P } from "./platform-icons";

/**
 * `/case-study-vehicle-intelligence` — softsuave.com's Vehicle Intelligence
 * case study (https://www.softsuave.com/case-study-vehicle-intelligence),
 * rebuilt on the site's case-study template.
 *
 * Every line of copy is the live page's, verbatim: hero, the six numbered
 * sections and their cards, the pull quote, the twelve features, the four
 * figures, the download panel and modal ("Download Case Study!!!", "Download",
 * "Sending..."), and the related-case-study heading and card blurbs. Section
 * ids are live's own (`#section1`…`#section6`). The images and the PDF are
 * live's, self-hosted (`public/images/case-studies/vehicle-intelligence/`,
 * `public/assets/case-studies/`); the PDF keeps live's path.
 *
 * Two live quirks are not carried over: the hero image's `alt="health-care"`
 * (it is a traffic dashboard), and the `<title>` "Vehicle Intelligence{Case
 * Study}", whose braces are a broken template on live — see `vehicleMeta`.
 */

export const vehicleMeta = {
  path: "/case-study-vehicle-intelligence",
  title: "Vehicle Intelligence Case Study",
  /** Live's meta description, verbatim. */
  description:
    "See how Soft Suave built a real-time Vision AI platform for axle counting, lane tracking, and congestion monitoring across live highway traffic.",
} as const;

const IMG = "/images/case-studies/vehicle-intelligence";
const PDF = "/assets/case-studies/Vehicle_Intelligence_Case_Study.pdf";

export const vehicleCaseStudy: CaseStudyContent = {
  hero: {
    titleLines: ["A Vision AI Platform", "for Real-Time Axle Counting & Traffic Monitoring"],
    accent: "AI Platform",
    titleSubLast: true,
    body: [
      "Turning top-view highway camera feeds into accurate axle counts, lane-level vehicle tracking and live congestion insight - with specialised recognition of lifted and floating axles on commercial vehicles, deployed in production across multiple high-traffic sites along a busy highway corridor.",
    ],
    points: [],
    facts: [
      { label: "Industry :", value: "Transportation" },
      { label: "Platform : ", value: "Web", icons: [P.Web] },
    ],
    aside: {
      src: `${IMG}/dashboard.webp`,
      width: 1536,
      height: 1024,
      alt: "Vehicle Intelligence dashboard showing real-time lane monitoring, a live top-view traffic camera and congestion analytics",
      blurDataURL:
        "data:image/webp;base64,UklGRroAAABXRUJQVlA4WAoAAAAQAAAADwAACgAAQUxQSD4AAAABYBPJdhtxsunYDETWsVf3A4T3KmUhiIgJuNVMyyKqr7EZdG0CewhaB+mrAASIhkY/Yv6Rf8zPkG9XStceclZQOCBWAAAAEAIAnQEqEAALAAOAWiWYAnQBA/jFp74+AAD+8YIj41SARH9nvVHGJm8ku3ybjyh+xWaV5YYiHaU7+weX0N9K2rk3ocstb0cf/C1HUT8CSPSzG5Y9sAA=",
    },
    image: {
      src: `${IMG}/hero-bg.webp`,
      width: 1672,
      height: 941,
      // Decorative backdrop: the dashboard beside the copy is the hero's image.
      alt: "",
      blurDataURL: "data:image/webp;base64,UklGRiYAAABXRUJQVlA4IBoAAAAwAQCdASoQAAkAA4BaJaQAA3AA/vVbuCAAAA==",
    },
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "About the Client",
      kicker: "01 — About the Client",
      title: "Counting every axle, lane by lane",
      body: [
        "The client operates traffic-monitoring infrastructure along a busy Mexican highway corridor and set out to build a real-time vehicle axle counting solution. The goal: efficiently count axles, track vehicles by lane and measure throughput in real time — with special attention to lifted or floating axles — while optimising queue counting and top-view processing. And the system had to hold that accuracy in dense, congested traffic, where vehicles overlap in the top-view camera feed.",
      ],
    },
    {
      id: "section2",
      nav: "The Challenge",
      kicker: "02 — The Challenge",
      title: "Four problems in real-world traffic",
      body: [
        "Real traffic is unpredictable — vehicles overlap, configurations vary, and conditions change every second. Building a reliable intelligence system required solving these challenges to deliver accurate, real-time insights across high-density road environments.",
      ],
      cards: {
        variant: "plain",
        items: [
          {
            name: "Lifted & floating axles",
            body: "Commercial vehicles raise axles clear of the road — traditional counting systems frequently miscounted these lifted axles or missed them entirely.",
          },
          {
            name: "Complex vehicle configurations",
            body: "Real-world traffic mixes many vehicle classes and trailer setups that strain rule-based counting and demand a robust AI approach.",
          },
          {
            name: "Real-time, multi-lane load",
            body: "Queue detection and classification had to run across several lanes simultaneously at near real-time speed to be useful.",
          },
          {
            name: "Top-view density & occlusion",
            body: "In dense, congested traffic, vehicles overlap in the top-view camera feed, making clean per-vehicle axle separation far more difficult.",
          },
        ],
      },
    },
    {
      id: "section3",
      nav: "The Solution",
      kicker: "03 — The Solution",
      title: "One vision pipeline, from detection to insight",
      body: [
        "Soft Suave built the system as a single computer-vision pipeline over top-view camera feeds—real-time detection, lane-aware tracking, specialised axle recognition, and queue analytics in one platform, deployed in production across multiple high-traffic sites and tuned to maintain accuracy in dense, congested traffic.",
      ],
      cards: {
        variant: "icon",
        items: [
          {
            name: "Detection & Axle Recognition",
            body: "Advanced computer-vision algorithms process top-view feeds to count vehicle axles with high precision, even in dense traffic — with a specialised module identifying lifted or floating axles for complete classification accuracy.",
          },
          {
            name: "Lane-Specific Tracking",
            body: "A sophisticated tracker maintains each vehicle's identity across frames and ties it to its lane, delivering accurate per-lane throughput measurement in real time.",
          },
          {
            name: "Queue Analysis Module",
            body: "Optimised queue-counting algorithms detect congestion and vehicle accumulation as they build, giving operators the insight needed for proactive traffic responses.",
          },
        ],
      },
      quote:
        "\"Every axle counted, every lane tracked, every queue seen early — one production vision pipeline turning live camera feeds into traffic intelligence.\"",
    },
    {
      id: "section4",
      nav: "Key Feature",
      kicker: "04 — Key Features",
      title: "Twelve capabilities, one platform",
      body: [
        "The solution integrates advanced computer vision models, multi-lane tracking, and real-time analytics into a unified platform. These capabilities enable accurate vehicle classification, axle counting, congestion monitoring, and operational insights across challenging traffic scenarios.",
      ],
      list: [
        "Real-Time Axle Counting",
        "Floating & Lifted Axle Detection",
        "AI-Powered Vehicle Classification",
        "Top-View Camera Processing",
        "Multi-Lane Vehicle Tracking",
        "Vehicle Throughput Measurement",
        "Queue & Congestion Analysis",
        "Proactive Congestion Alerts",
        "Predictive Congestion Modelling",
        "Real-Time Traffic Data Feeds",
        "Enhanced Accuracy in Dense Traffic",
        "Production Deployment Across Multiple Sites",
      ],
      image: {
        src: `${IMG}/platform.webp`,
        width: 1376,
        height: 768,
        alt: "Vehicle Intelligence platform on a curved monitor: lane monitoring, live video detection, fleet monitoring, analytics and predictions",
        blurDataURL:
          "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADwAQCdASoQAAkAA4BaJQBOgCHw0rB+aUAA/vS2S+NU3ostfEGnSiM9GLCyXqZqTUH3SdDmP/Glrw1LbSHGgAAA",
      },
    },
    {
      id: "section5",
      nav: "Results & Impact",
      kicker: "05 — Results & Impact",
      title: "Measurable gains across the board",
      body: [
        "Transforming complex traffic data into actionable intelligence, the platform achieved significant improvements in accuracy, speed, and reliability — enabling smarter traffic operations at scale.",
      ],
      stats: [
        { value: "90%", label: "Enhanced detection accuracy over the previous monitoring baseline" },
        { value: "80%", label: "Improvement in vehicle tracking and traffic decision-making" },
        { value: "70%", label: "Better handling of complex vehicle and trailer configurations" },
        { value: "50%", label: "Faster access to real-time traffic data" },
      ],
    },
    {
      id: "section6",
      nav: "Why Soft Suave",
      kicker: "06 — Why Soft Suave",
      title: "Production-ready intelligence, proven on the road",
      body: [
        "The client needed more than detection—a real-time vision pipeline handling lifted and floating axles, dense multi-lane traffic, and live queue analytics, deployed across multiple high-traffic locations. Soft Suave delivered a scalable, production-ready platform with proven ROI and a future-proof architecture - accuracy that holds in the densest congested traffic, with every lane, vehicle, and axle accounted for in real time.",
      ],
    },
  ],

  download: {
    navLabel: "Download",
    body: "Download this practical case study to learn how our Vision AI platform delivers real-time axle counting, lane tracking, and congestion monitoring across live highway traffic.",
    label: "Download Case Study",
    pdf: PDF,
    fileName: "Vehicle_Intelligence_Case_Study.pdf",
    requirement:
      "Case study download: requested the Vehicle Intelligence case study (A Vision AI Platform for Real-Time Axle Counting & Traffic Monitoring) PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Vehicle Intelligence",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Vehicle Intelligence case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // Live's "Related Case Studies" carousel: its heading, standfirst and five
  // cards, each with live's own short blurb. The images are the ones the
  // case-study index already ships.
  related: {
    eyebrow: "Related Case Studies",
    title: "Real-World Impact Through Digital Transformation",
    body: "Explore how we help startups and SMBs grow, launch successful products, and solve challenges with tech and strategy—backed by real results in every case study.",
    tileCta: "View Case Study",
    items: [
      {
        title: "A Platform for Driver Attention, Stress and Safety",
        body: "Soft Suave fuses driving video, eye-gaze, and heart-rate data into automated scores that reveal driver attention, stress, and safety in real time.",
        image: { src: "/images/case-studies/neurora-intelligence-cs.webp", alt: "Neurora Behavioral Intelligence Platform" },
        href: "/case-study-neurora-behavioral-intelligence",
      },
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
        title: "AI-Powered Onboarding and Configuration Assist for a Logistics Management Platform",
        body: "Soft Suave embeds an always-available AI assistant that guides logistics customers through setup, validates inputs, and cuts onboarding time in half.",
        image: { src: "/images/case-studies/ai-assist-cs.webp", alt: "Logistics Management Platform" },
        href: "/case-study-ai-assist-logistics-onboarding",
      },
      {
        title: "AI-Driven Incident Management and Compliance Optimization for Offshore Operations",
        body: "Soft Suave automates incident classification, emergency response, and compliance tracking to keep offshore operations faster, safer, and audit-ready.",
        image: { src: "/images/case-studies/safe-ops-cs.webp", alt: "AI-Driven Incident Management Platform" },
        href: "/case-study-safeops-ai-incident-management",
      },
    ],
  },
};
