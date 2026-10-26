import type { CaseStudyContent } from "@/components/case-study/case-study";
import { HERO_PLATFORM_ICONS as P, platformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-brand-forge` — softsuave.com's BrandForge case study
 * (https://www.softsuave.com/case-study-brand-forge), rebuilt on the site's
 * case-study template the way `vehicle-intelligence.ts` is.
 *
 * Every line of copy is the live page's, verbatim: hero, the six numbered
 * sections and their cards, the twelve features, the four figures, the
 * download panel and modal, and the related-case-study heading
 *. Section ids are live's
 * (`#section1`…`#section6`). The images and the PDF are live's, self-hosted
 * (`public/images/case-studies/brand-forge/`, `public/assets/case-studies/`).
 *
 * Not carried over: live's `<title>` "BrandForge{Case Study}", set here in the
 * case-study pages' own "… Case Study | Soft Suave" form — see
 * `brandForgeMeta`; live's PDF link, `BrandForge_case_study.pdf`, which 404s —
 * the file it means is served as `BrandForge_Case_Study.pdf`, and that is the
 * path kept here; and what live leaves commented out, so never renders — the
 * Solution section's pull quote and the targets note under the figures.
 */

export const brandForgeMeta = {
  path: "/case-study-brand-forge",
  title: "BrandForge Case Study",
  /** Live's meta description, verbatim. */
  description:
    "See how Soft Suave built BrandForge, an AI content production programme for a national energy company's strategic communications function — inside their own Microsoft and Azure ecosystem.",
} as const;

const IMG = "/images/case-studies/brand-forge";
const PDF = "/assets/case-studies/BrandForge_Case_Study.pdf";

export const brandForgeCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1 — plain, highlighted, then the smaller sub-tag — set as one
    // headline line over the sub-tag, as the Vehicle Intelligence hero is.
    titleLines: ["An AI Content Production Programme", "for Enterprise Strategic Communication"],
    accent: "Production Programme",
    titleSubLast: true,
    body: [
      "Eight AI use cases across content production — video and static assets, multichannel copy, speechwriting, media releases, bilingual Arabization, brand QA, creative optimisation and presentations — built inside the client's own Microsoft and Azure ecosystem, with mandatory human approval gates on every workflow.",
    ],
    points: [],
    facts: [
      { label: "Industry :", value: "Energy / Oil & Gas" },
      platformFact([P.Web]),
    ],
    aside: {
      src: `${IMG}/dashboard.webp`,
      width: 1459,
      height: 1000,
      alt: "BrandForge Strategic Overview dashboard on a desktop monitor showing request and approval totals, the content pipeline from brief to published, brand compliance, a QA heatmap and Arabization figures",
      blurDataURL:
        "data:image/webp;base64,UklGRqYAAABXRUJQVlA4WAoAAAAQAAAADwAACgAAQUxQSD8AAAABYBxJUhuyJEMpOY+X2fngUoiICUj/Nx5eTZYZnglUUQtANIQQQjRG0RQdkKif3TvvXJay9877zdR2fZ7FmhoAVlA4IEAAAADwAQCdASoQAAsABUB8JZwAAvkMHUHyRgAA/cdYPtXcVl/dNoMZVLvBlV68vrClddcwFEDoXP+3ZsbgBYqgQAAA",
    },
    image: {
      src: `${IMG}/hero-bg.webp`,
      width: 1672,
      height: 941,
      // Decorative backdrop: the dashboard beside the copy is the hero's image.
      alt: "",
      blurDataURL: "data:image/webp;base64,UklGRigAAABXRUJQVlA4IBwAAABQAQCdASoQAAkABUB8JZwABAAAAP7wncBy/QAA",
    },
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "About the Client",
      kicker: "01 — About the Client",
      title: "Communications at national-energy scale",
      body: [
        "The client is the group strategic communications and brand function of a leading national energy company in the Middle East — a multi-division team responsible for brand management, media relations, content production, internal communications, events, sponsorships and digital channels. A formal operational assessment and executive workshop identified more than 30 AI use cases across the function, structured into a five-phase, 15-month programme to unlock capacity for higher-value strategic work — beginning with content production.",
      ],
    },
    {
      id: "section2",
      nav: "The Challenge",
      kicker: "02 — The Challenge",
      title: "Production was slow, manual and volume-constrained",
      body: [
        "Content production at national-energy scale had to move faster, publish bilingually, and hold a consistent brand voice — while freeing skilled communicators for higher-value strategic and creative work.",
      ],
      cards: {
        variant: "plain",
        items: [
          {
            name: "Long production cycles",
            body: "Campaign assets, press releases, speeches and presentations typically required 2–4-day turnaround cycles, limiting responsiveness to real-time developments.",
          },
          {
            name: "Bilingual publication delays",
            body: "Manual translation left a consistent gap between English and Arabic content, preventing fully simultaneous bilingual campaign delivery.",
          },
          {
            name: "Manual brand QA",
            body: "Quality assurance of brand voice, approved terminology and key-message alignment was manual, producing variable outcomes and slowing approval cycles.",
          },
          {
            name: "A misaligned talent model",
            body: "Skilled communicators spent much of their time on production tasks rather than the strategic, editorial and creative work where their expertise creates most value.",
          },
        ],
      },
    },
    {
      id: "section3",
      nav: "The Solution",
      kicker: "03 — The Solution",
      title: "Eight AI use cases, one governed pipeline",
      body: [
        "Soft Suave designed Phase 1 entirely inside the client's Microsoft and Azure ecosystem: frontier LLMs accessed through the enterprise AI studio under a zero-retention policy, brand-safe creative tooling, and orchestrated approval workflows — with human approval gates mandatory across every AI-assisted workflow, so AI assists with production and humans retain full control of final content.",
      ],
      cards: {
        variant: "icon",
        items: [
          {
            name: "AI Content Production",
            body: "Video and static campaign assets, multichannel copy adapted from a single structured brief, first-pass speech drafts grounded on speaker tone profiles, AI-drafted media releases and on-brand presentation decks built from approved templates.",
          },
          {
            name: "Intelligent Arabization",
            body: "An LLM translation pipeline grounded on the approved corporate glossary and translation memory, with automated quality scoring, deterministic terminology rule-checks and a mandatory human linguist gate for all external content.",
          },
          {
            name: "Brand QA & Approval Governance",
            body: "A multi-agent LLM verification layer scores every submission for brand voice, terminology and sensitivity across four severity levels, while orchestrated approval flows route content through defined human gates with full audit trails.",
          },
        ],
      },
    },
    {
      id: "section4",
      nav: "Key Feature",
      kicker: "04 — Key Features",
      title: "Twelve capabilities, one programme",
      body: [
        "The programme integrates AI-assisted drafting, glossary-grounded Arabization, and automated brand QA into a single governed pipeline. These capabilities enable faster, on-brand, bilingual content production with mandatory human oversight at every stage.",
      ],
      list: [
        "AI Video & Static Campaign Assets",
        "Multichannel Copy from One Brief",
        "AI-Assisted Speechwriting (Tone Profiles)",
        "Media Release First Drafts",
        "Glossary-Grounded EN–AR Arabization",
        "Automated Brand Voice & Messaging QA",
        "Creative Optimisation from Performance Data",
        "Automated On-Brand Presentation Builder",
        "Mandatory Human Approval Gates",
        "Zero-Retention Enterprise LLM Access",
        "Embargo Management (Time-Locked Release)",
        "Central DAM & Audit-Trailed Workflows",
      ],
      image: {
        src: `${IMG}/platform.webp`,
        width: 1536,
        height: 1024,
        alt: "BrandForge dashboard on desktop, laptop and phone ringed by its twelve capabilities, from AI campaign assets and speechwriting to mandatory approval gates and audit-trailed workflows",
        blurDataURL:
          "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADwAQCdASoQAAsABUB8JZwAApQgOikjpfAA/vKrz3y5G/v4Qk2Z4KNxN5njZhjrAeGyIVk2JC6JF0gOgW2w7QSwizNgjC8Ico0gAAAA",
      },
    },
    {
      id: "section5",
      nav: "Results & Impact",
      kicker: "05 — Results & Impact",
      title: "Targets set before the first asset ships",
      body: [
        "Phase 1 was scoped with measurable success criteria defined up front, so gains in speed and quality can be validated against a pre-deployment baseline rather than asserted after the fact.",
      ],
      stats: [
        { value: "40%", label: "Targeted reduction in video production cycle time" },
        { value: "75%+", label: "Brand QA first-pass approval rate target across content submissions" },
        { value: "<5 min", label: "Brand and messaging QA turnaround per content submission" },
        { value: "60%", label: "Share of video output AI-assisted within six months of go-live" },
      ],
    },
    {
      id: "section6",
      nav: "Why Soft Suave",
      kicker: "06 — Why Soft Suave",
      title: "Enterprise AI inside enterprise governance",
      body: [
        "This programme's bar wasn't creativity alone — it was governance. Every sensitive word is processed inside the client's own cloud tenant under a zero-retention policy; brand voice, terminology and sensitivity are checked by an automated QA layer before any human reviewer; translation is grounded on an approved glossary with a mandatory linguist gate; and human approval is mandatory on every workflow, without exception. Soft Suave shaped Phase 1 to enterprise architecture and security standards from day one — with baseline measurement built in, so every gain is provable rather than anecdotal.",
      ],
    },
  ],

  download: {
    navLabel: "Download",
    body: "Download this practical case study to learn how BrandForge delivers eight governed AI content-production use cases — inside the enterprise's own Microsoft and Azure ecosystem, with mandatory human approval on every workflow.",
    label: "Download Case Study",
    pdf: PDF,
    fileName: "BrandForge_Case_Study.pdf",
    requirement:
      "Case study download: requested the BrandForge case study (An AI Content Production Programme for Enterprise Strategic Communication) PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – BrandForge",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the BrandForge case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(brandForgeMeta.path),
};
