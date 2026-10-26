import type { CaseStudyContent } from "@/components/case-study/case-study";
import { HERO_PLATFORM_ICONS as P, platformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-hire-voice` — softsuave.com's HireVoice case study
 * (https://www.softsuave.com/case-study-hire-voice), rebuilt on the site's
 * case-study template the way `vehicle-intelligence.ts` is.
 *
 * Every line of copy is the live page's, verbatim: hero, the six numbered
 * sections and their cards, the pull quote, the twelve features, the four
 * figures, the download panel and modal, and the related-case-study heading. That includes
 * the Challenge heading's "Six bottlenecks" over live's four cards. Section
 * ids are live's (`#section1`…`#section6`). The images and the PDF are live's,
 * self-hosted (`public/images/case-studies/hire-voice/`,
 * `public/assets/case-studies/`).
 *
 * Not carried over: live's `<title>` "HireVoice{Case Study}", set here in the
 * case-study pages' own "… Case Study | Soft Suave" form — see
 * `hireVoiceMeta`; live's PDF link, `HireVoice_case_study.pdf`, which 404s —
 * the file it means is served as `HireVoice_Case_Study.pdf`, and that is the
 * path kept here; and live's commented-out benchmark disclaimer under the
 * figures, which never renders there.
 */

export const hireVoiceMeta = {
  path: "/case-study-hire-voice",
  title: "HireVoice Case Study",
  /** Live's meta description, verbatim. */
  description:
    "See how Soft Suave built HireVoice, an AI-powered voice interview platform that conducts spoken technical interviews end-to-end and scores every transcript into a shareable report.",
} as const;

const IMG = "/images/case-studies/hire-voice";
const PDF = "/assets/case-studies/HireVoice_Case_Study.pdf";

export const hireVoiceCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1 — plain, highlighted, then the smaller sub-tag — set as one
    // headline line over the sub-tag, as the Vehicle Intelligence hero is.
    titleLines: ["An AI-Powered Voice Interview Platform", "for Scalable Technical Hiring"],
    accent: "Voice Interview Platform",
    titleSubLast: true,
    body: [
      "An AI bot that conducts spoken technical interviews end-to-end in the browser — asking questions aloud, understanding answers in real time, and scoring every transcript into a shareable PDF report — while interviewers observe invisibly, join in, or pause the AI at any moment.",
    ],
    points: [],
    facts: [
      { label: "Industry :", value: "HR Tech" },
      platformFact([P.Web]),
    ],
    aside: {
      src: `${IMG}/dashboard.webp`,
      width: 1315,
      height: 917,
      alt: "HireVoice Expert Vault on a desktop monitor showing curated technical question banks to browse and fork, from frontend and backend engineering to AI, DevOps, security and Gen AI",
      blurDataURL:
        "data:image/webp;base64,UklGRqwAAABXRUJQVlA4WAoAAAAQAAAADwAACgAAQUxQSEgAAAABYBvJVhtS14DUpmtOo35siIf3k898tRARE/BlnlJOwyvTT1/+hAEEsYLkaQAiyKS5MQwAopxJyKK2fAcWa61zWvH5DOGYFAdWUDggPgAAANABAJ0BKhAACwAFQHwlnAAC+HaaDMxwAP7J8j6KXisT5MVJPGyEfbEHp2Vn9Pt2e5+cDUh/CDxF5eFkUAAA",
    },
    image: {
      src: `${IMG}/hero-bg.webp`,
      width: 1672,
      height: 941,
      // Decorative backdrop: the dashboard beside the copy is the hero's image.
      alt: "",
      blurDataURL: "data:image/webp;base64,UklGRiYAAABXRUJQVlA4IBoAAAAwAQCdASoQAAkABUB8JaQAA3AA/vC0twAAAA==",
    },
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "About the Client",
      kicker: "01 — About the Client",
      title: "Where senior engineers were the hiring bottleneck",
      body: [
        "The client's technical hiring runs through HR and talent-acquisition teams whose biggest constraint is interviewer availability. Screening rounds consume senior engineers' time — each first-round interview occupies an experienced interviewer for an hour or more including preparation and write-up — scheduling across time zones delays pipelines, and quality varies from panel to panel. As hiring volumes grow, the organisation needed consistent, high-quality technical interviews at scale, without proportionally scaling interviewer effort.",
      ],
    },
    {
      id: "section2",
      nav: "The Challenge",
      kicker: "02 — The Challenge",
      title: "Six bottlenecks, one hiring funnel",
      body: [
        "Technical hiring at scale needed consistent, structured interviews and auditable records — without pulling more senior-engineer time into first-round screening.",
      ],
      cards: {
        variant: "plain",
        items: [
          {
            name: "Senior time on screening",
            body: "Screening interviews consumed scarce senior-engineer time better spent on later-stage assessment — and scheduling delays lost strong candidates to faster-moving competitors.",
          },
          {
            name: "Inconsistent interviews",
            body: "Interview quality and questioning depth varied between interviewers, weakening comparability of candidates applying for the same role.",
          },
          {
            name: "Slow, uneven preparation",
            body: "Preparing good question sets for each role was time-consuming and inconsistently done — and results were recorded inconsistently, making structured evaluation and audit difficult.",
          },
          {
            name: "Disconnected from the ERP",
            body: "Candidate information lived in the ERP, but interview tools were disconnected from it, forcing duplicate data entry and fragmented records.",
          },
        ],
      },
    },
    {
      id: "section3",
      nav: "The Solution",
      kicker: "03 — The Solution",
      title: "AI conducts, humans stay in control",
      body: [
        "Soft Suave delivered HireVoice as a platform that automates the interview lifecycle while keeping interviewers in control — AI-generated, lockable question sets; live voice sessions over WebRTC in which an AI bot interviews the candidate in real time; and an AI evaluation pipeline turning every transcript into structured scores and a shareable PDF report.",
      ],
      cards: {
        variant: "icon",
        items: [
          {
            name: "AI Question Sets & Expert Vault",
            body: "Interviewers generate question sets from text or PDF prompts within configurable guardrails, or fork ready-made sets from a curated Expert Vault spanning 19 domains — then review, edit and lock the approved version.",
          },
          {
            name: "Live AI Voice Interviews",
            body: "An AI bot asks questions aloud and understands answers as they're spoken, entirely in the browser. Interviewers observe invisibly, join as a third participant, or pause and resume the AI at any moment.",
          },
          {
            name: "AI Evaluation & PDF Reports",
            body: "After each session, an AI evaluation pipeline analyses the full transcript and produces structured scores, delivered as a professionally formatted PDF report that interviewers download and share with the hiring team.",
          },
        ],
      },
      quote:
        "\"Interview capacity no longer bounded by interviewer availability — consistent, structured, auditable technical interviews at scale, with humans in control throughout.\"",
    },
    {
      id: "section4",
      nav: "Key Feature",
      kicker: "04 — Key Features",
      title: "Twelve capabilities, one platform",
      body: [
        "The platform integrates real-time voice AI, configurable question generation, and structured post-session evaluation into a unified system. These capabilities enable consistent, auditable technical interviews with interviewers in control at every stage.",
      ],
      list: [
        "Live AI Voice Interviews (TTS + STT)",
        "Hidden Observer Mode",
        "Join as Third Participant",
        "Pause / Resume AI Mid-Session",
        "AI Question-Set Generation (Text & PDF)",
        "Configurable Generation Guardrails",
        "Finalise & Lock Question Sets",
        "Expert Vault — 19 Curated Domains",
        "ERP Candidate Search & Upsert",
        "Structured AI Scoring of Transcripts",
        "Downloadable PDF Interview Reports",
        "Time-Bounded Role-Based Access",
      ],
      image: {
        src: `${IMG}/platform.webp`,
        width: 1537,
        height: 1023,
        alt: "HireVoice Expert Vault on laptop and phone ringed by its twelve capabilities, from live AI voice interviews and hidden observer mode to PDF reports and role-based access",
        blurDataURL:
          "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADQAQCdASoQAAsABUB8JZwAApCeBovIQAD+7qae3Ws/VSmniwM05sI0Is3qzAcEGja7raAYHYkydgHrKdX9Uv7bigAAAA==",
      },
    },
    {
      id: "section5",
      nav: "Results & Impact",
      kicker: "05 — Results & Impact",
      title: "What AI interviewing delivers at scale",
      body: [
        "AI-conducted interviewing removes interviewer availability as the bottleneck on hiring throughput, while keeping every candidate's evaluation consistent, structured and auditable.",
      ],
      stats: [
        { value: "75%", label: "Reduction in end-to-end recruitment time in a published enterprise AI-interviewing programme" },
        { value: "50k+", label: "Hours of interview time saved annually in the same benchmark programme" },
        { value: "£1M+", label: "Annual savings delivered by AI-assisted interviewing at enterprise scale" },
        { value: "16%", label: "Increase in hiring diversity reported after moving to AI-based interviewing" },
      ],
    },
    {
      id: "section6",
      nav: "Why Soft Suave",
      kicker: "06 — Why Soft Suave",
      title: "Voice AI, engineered for trust",
      body: [
        "An AI that interviews real candidates has to earn the trust of everyone in the room. Soft Suave built that in: interviewers can observe, join or pause the AI at any moment; every candidate for a role faces the same locked question set and scoring approach; the full conversation is captured for evaluation and audit; and access is role-based with time-bounded sign-in. Real-time audio is engineered for natural dialogue — low-latency speech in and out over WebRTC — and the hiring decision always stays human.",
      ],
    },
  ],

  download: {
    navLabel: "Download",
    body: "Download this practical case study to learn how HireVoice conducts spoken technical interviews end-to-end — with humans able to observe, join, or take control at any moment.",
    label: "Download Case Study",
    pdf: PDF,
    fileName: "HireVoice_Case_Study.pdf",
    requirement:
      "Case study download: requested the HireVoice case study (An AI-Powered Voice Interview Platform for Scalable Technical Hiring) PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – HireVoice",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the HireVoice case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(hireVoiceMeta.path),
};
