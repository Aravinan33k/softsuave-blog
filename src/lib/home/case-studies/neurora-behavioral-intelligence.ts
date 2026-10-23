import type { CaseStudyContent } from "@/components/case-study/case-study";
import { HERO_PLATFORM_ICONS as P } from "./platform-icons";

/**
 * `/case-study-neurora-behavioral-intelligence` — softsuave.com's Neurora
 * Behavioral Intelligence case study
 * (https://www.softsuave.com/case-study-neurora-behavioral-intelligence),
 * rebuilt on the site's case-study template the way `vehicle-intelligence.ts`
 * is.
 *
 * Every line of copy is the live page's, verbatim: hero, the six numbered
 * sections and their cards, the pull quote, the twelve features, the four
 * figures, the download panel and modal, and the related-case-study heading
 * and card blurbs (live's own five, which leave Neurora out). Section ids are
 * live's (`#section1`…`#section6`). The images and the PDF are live's,
 * self-hosted (`public/images/case-studies/neurora-behavioral-intelligence/`,
 * `public/assets/case-studies/`); the PDF keeps live's path.
 *
 * Live quirks not carried over: the hero image's `alt="health-care"`, the
 * `<title>` "Neurora Behavioral Intelligence{Case Study}" (a broken template —
 * see `neuroraMeta`), and the key feature "TFixation, PERCLOS, …", corrected to
 * "Fixation" (the typo stays in the feature image's baked-in text).
 */

export const neuroraMeta = {
  path: "/case-study-neurora-behavioral-intelligence",
  title: "Neurora Behavioral Intelligence Case Study",
  /** Live's meta description, verbatim. */
  description:
    "See how Soft Suave built Neurora's Behavioral Intelligence platform, fusing video, gaze, and heart-rate data into automated driver safety scores.",
} as const;

const IMG = "/images/case-studies/neurora-behavioral-intelligence";
const PDF = "/assets/case-studies/Neurora_Labs_case_study.pdf";

export const neuroraCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1 — plain, highlighted, then the smaller sub-tag — set as one
    // headline line over the sub-tag, as the Vehicle Intelligence hero is.
    titleLines: ["A Platform for Driver Attention", "Stress and Safety"],
    accent: "Driver Attention",
    titleSubLast: true,
    body: [
      "Fusing synchronized driving video, eye-gaze and heart-rate data into automated behavioral scores — showing researchers, fleets and driving schools not just what a driver did, but where they looked, what they missed and when stress took over.",
    ],
    points: [],
    facts: [
      { label: "Industry :", value: "Transportation" },
      { label: "Platform : ", value: "Android, iOS, Web", icons: [P.Android, P.iOS, P.Web] },
    ],
    aside: {
      src: `${IMG}/dashboard.webp`,
      width: 1398,
      height: 933,
      alt: "Neurora Insight dashboard on a desktop monitor showing session totals, recent driving sessions and sessions by status",
      blurDataURL:
        "data:image/webp;base64,UklGRpAAAABXRUJQVlA4WAoAAAAQAAAADwAACgAAQUxQSEAAAAABYBTbVhscMjh4HxusEMTgoya7HhV12buCiJgAk19nWZaSLZeHbfWkK//WftYVT1pOANG8LL0kAIIdtffOKXYEVlA4ICoAAABwAQCdASoQAAsAA4BaJZ2R5AGIAAD+866Q6lNHeMSK6R5ERHzOkOOAAAA=",
    },
    image: {
      src: `${IMG}/hero-bg.webp`,
      width: 1672,
      height: 941,
      // Decorative backdrop: the dashboard beside the copy is the hero's image.
      alt: "",
      blurDataURL: "data:image/webp;base64,UklGRiYAAABXRUJQVlA4IBoAAAAwAQCdASoQAAkAA4BaJaQAA3AA/vVemEgAAA==",
    },
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "About the Client",
      kicker: "01 — About the Client",
      title: "Where driver safety is still judged by eye",
      body: [
        "Neurora Labs is building a Behavioral Intelligence Platform for organizations that need to understand how people actually drive. Its users are driving schools, fleet safety and risk teams, academic and commercial driving-behavior researchers, and automotive safety engineers. Each of them depends on evidence from real driving sessions—video, gaze, heart rate—and each has been forced to rely on an instructor's memory and judgment to interpret it.",
      ],
    },
    {
      id: "section2",
      nav: "The Challenge",
      kicker: "02 — The Challenge",
      title: "Four gaps between the drive and the insight",
      body: [
        "Understanding real driver behavior is difficult — attention, stress, and hazard response happen in an instant and leave no objective trace. Building a reliable behavioral intelligence system required fusing video, gaze, and physiological data into one accurate, real-time picture.",
      ],
      cards: {
        variant: "plain",
        items: [
          {
            name: "Manual, after-the-fact review",
            body: "Instructors scored sessions from observation and post-drive recall, so feedback arrived late, and its quality varied with whoever happened to be watching.",
          },
          {
            name: "No objective attention data",
            body: "Nothing recorded where a driver actually looked or what they missed. Hazard awareness was inferred from behavior, never measured directly.",
          },
          {
            name: "Sensors that never talked",
            body: "Existing tools captured video without gaze, or tracked eyes without driving context. No product fused video, gaze, and physiology on one timeline.",
          },
          {
            name: "Subjective, inconsistent scoring",
            body: "Safety judgements rested on individual opinion, making results hard to compare across drivers, sessions, or organizations, and impossible to benchmark at scale.",
          },
        ],
      },
    },
    {
      id: "section3",
      nav: "The Solution",
      kicker: "03 — The Solution",
      title: "One capture-to-insight pipeline, three connected surfaces",
      body: [
        "Soft Suave is delivering an end-to-end system for Neurora Labs: Neurora Capture records synchronized video, gaze, and heart-rate data; an AWS backend runs SQS-triggered ECS workers for computer vision and scoring; and Neurora Insight, the Neurora Self View driver app, and an admin panel turn the output into decisions.",
      ],
      cards: {
        variant: "icon",
        items: [
          {
            name: "Neurora Capture",
            body: "A mobile recording app that captures camera video, eye-gaze coordinates, and pupil size from wearable tracking glasses, along with heart-rate signals from a wearable sensor—all timestamped and synchronized on-device.",
          },
          {
            name: "AI Processing Pipeline",
            body: "Uploaded sessions trigger cloud workers that detect and track objects across frames, map gaze to dynamic Areas of Interest, and compute fixation duration, PERCLOS, time-to-first-fixation, and gaze entropy.",
          },
          {
            name: "Insight, Self View & Admin",
            body: "A React dashboard replays the drive with gaze overlays, heatmaps, scan paths, and bounding boxes alongside safety, focus, stress, and risk scores—plus the Self View driver app and an admin panel for user and session control.",
          },
        ],
      },
      quote:
        "\"Raw sensor streams in, behavioral scores and plain-language safety insight out — automated end to end, with human-adjustable Areas of Interest.\"",
    },
    {
      id: "section4",
      nav: "Key Feature",
      kicker: "04 — Key Features",
      title: "Twelve capabilities, one platform",
      body: [
        "The platform integrates synchronized multi-sensor capture, AI-driven gaze mapping, and automated behavioral scoring into a unified system. These capabilities enable objective attention tracking, stress detection, and plain-language safety insight across every driving session.",
      ],
      list: [
        "Synchronized Video, Gaze & Heart-Rate Capture",
        "AI Object Detection & Frame Tracking",
        "Dynamic Area-of-Interest Gaze Mapping",
        "Fixation, PERCLOS, TTFF & Gaze Entropy",
        "Automated Safety, Focus & Risk Scoring",
        "Stress & Cognitive Load Modeling",
        "Attention Heatmaps & Scan-Path Replay",
        "AI-Generated Plain-Language Session Insights",
        "Hybrid Manual AOI Adjustment",
        "Neurora Self View Driver App",
        "Report Export & Session Sharing",
        "Secure AWS Storage & Admin Panel",
      ],
      image: {
        src: `${IMG}/platform.webp`,
        width: 1536,
        height: 1024,
        alt: "Neurora platform on desktop, laptop, tablet and phone, ringed by its twelve capabilities from synchronized capture to secure AWS storage",
        blurDataURL:
          "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAABwAQCdASoQAAsAA4BaJZ2HgAHJgAD+8/Hq08NHrw+OSy8vEbgIAA==",
      },
    },
    {
      id: "section5",
      nav: "Results & Impact",
      kicker: "05 — Results & Impact",
      title: "A delivery plan built to de-risk the platform",
      body: [
        "Delivered through a milestone-driven, PoC-first approach, the platform de-risked development while accelerating time-to-market — turning raw sensor data into a production-ready behavioral intelligence system in just 5 months.",
      ],
      stats: [
        { value: "5 months", label: "End-to-end delivery from kick-off to complete application, across a milestone-driven release plan" },
        { value: "2 Stream", label: "AI and application development run in parallel—12 weeks and 10 weeks—to cut time-to-market" },
        { value: "2–3 Weeks", label: "Milestone 0 proof of concept, delivered at no cost, with Soft Suave bearing PoC hosting costs" },
        { value: "90 Days", label: "Post-deployment support by the original project team after go-live" },
      ],
    },
    {
      id: "section6",
      nav: "Why Soft Suave",
      kicker: "06 — Why Soft Suave",
      title: "Multi-sensor AI, delivered on a proven cadence",
      body: [
        "This is not a dashboard project—it is sensor fusion, computer vision, gaze mapping, and behavioral modeling delivered as one production platform. Soft Suave brings 13+ years of engineering depth and a milestone-driven agile cadence: a no-cost proof of concept first, followed by parallel AI and application streams tracked in Jira and Confluence with full client visibility. Every milestone ships to a client-owned repository, backed by layered functional, integration, and regression testing, along with a 90-day post-deployment support period.",
      ],
    },
  ],

  download: {
    navLabel: "Download",
    body: "Download this practical case study to learn how our Behavioral Intelligence platform fuses video, gaze, and heart-rate data into automated driver safety and stress scores.",
    label: "Download Case Study",
    pdf: PDF,
    fileName: "Neurora_Labs_case_study.pdf",
    requirement:
      "Case study download: requested the Neurora Behavioral Intelligence case study (A Platform for Driver Attention, Stress and Safety) PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Neurora Behavioral Intelligence",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Neurora Behavioral Intelligence case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // Live's "Related Case Studies" carousel: its heading, standfirst and five
  // cards (Neurora itself is not among them), each with live's own short
  // blurb. The images are the ones the case-study index already ships.
  related: {
    eyebrow: "Related Case Studies",
    title: "Real-World Impact Through Digital Transformation",
    body: "Explore how we help startups and SMBs grow, launch successful products, and solve challenges with tech and strategy—backed by real results in every case study.",
    tileCta: "View Case Study",
    items: [
      {
        title: "A Vision AI Platform for Real-Time Axle Counting & Traffic Monitoring",
        body: "Soft Suave built a vision AI platform that counts axles and tracks vehicles in real time from live highway camera feeds.",
        image: { src: "/images/case-studies/vehicle-intelligence-cs.webp", alt: "Vehicle Intelligence Platform" },
        href: "/case-study-vehicle-intelligence",
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
