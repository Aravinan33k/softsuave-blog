import type { CaseStudyContent } from "@/components/case-study/case-study";
import { HERO_PLATFORM_ICONS as P } from "./platform-icons";

/**
 * `/case-study-wellpet-ai-smart-wellness-platform` — softsuave.com's WellPet
 * case study
 * (https://www.softsuave.com/case-study-wellpet-ai-smart-wellness-platform),
 * rebuilt on the site's case-study template the way `vehicle-intelligence.ts`
 * is.
 *
 * Every line of copy is the live page's, verbatim: hero, the six numbered
 * sections and their cards, the pull quote, the twelve features, the four
 * figures, the download panel and modal, and the related-case-study heading
 * and card blurbs (live's own five, which leave WellPet out). Section ids are
 * live's (`#section1`…`#section6`). The images and the PDF are live's,
 * self-hosted (`public/images/case-studies/wellpet-ai-smart-wellness-platform/`,
 * `public/assets/case-studies/`); the PDF keeps live's path.
 *
 * Not carried over: the hero image's `alt="health-care"`, and live's `<title>`
 * "WellPet AI Smart Wellness Platform | Case Study", set here in the
 * case-study pages' own "… Case Study | Soft Suave" form — see `wellPetMeta`.
 */

export const wellPetMeta = {
  path: "/case-study-wellpet-ai-smart-wellness-platform",
  title: "WellPet AI Smart Wellness Platform Case Study",
  /** Live's meta description, verbatim. */
  description:
    "See how Soft Suave built WellPet, an AI-powered smart wellness platform bringing health assessments, digital medical records, and preventive care together for pet parents and veterinarians.",
} as const;

const IMG = "/images/case-studies/wellpet-ai-smart-wellness-platform";
const PDF = "/assets/case-studies/WellPet_Case_Study.pdf";

export const wellPetCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1 — plain, highlighted, then the smaller sub-tag — set as one
    // headline line over the sub-tag, as the Vehicle Intelligence hero is.
    titleLines: ["An AI-Powered Smart Wellness Platform", "Revolutionizing Pet Healthcare"],
    accent: "Smart Wellness Platform",
    titleSubLast: true,
    body: [
      "Bringing smart monitoring, AI-driven health assessments, digital medical records and preventive care together in one platform — so pet parents can track wellness, manage medications and vaccinations, and catch potential health concerns early, with veterinarians kept fully in the picture.",
    ],
    points: [],
    facts: [
      { label: "Industry :", value: "Healthcare" },
      { label: "Platform : ", value: "Android, iOS, Web", icons: [P.Android, P.iOS, P.Web] },
    ],
    aside: {
      src: `${IMG}/dashboard.webp`,
      width: 1344,
      height: 955,
      alt: "WellPet pet-parent dashboard on a desktop monitor showing an AI assistant prompt, pet profiles, a health score chart and tasks needing attention",
      blurDataURL:
        "data:image/webp;base64,UklGRrQAAABXRUJQVlA4WAoAAAAQAAAADwAACgAAQUxQSEIAAAABd6CQjSQ4uK/AsVyO6iIicF6S72YkQlVt29BdEigjCgmsF0cTEQSZf2dSvD8FIvo/Aaey4T62/WM1dWdIATJ6AQBWUDggTAAAANABAJ0BKhAACwADgFolnAAC6tsC+C84AP7yf1Ma2OD5aH6ujmNVdsP63EmmSEIEvKPPfRDUB5EnUPW/s4uH106f3x5Q3WKerJkCAAA=",
    },
    image: {
      src: `${IMG}/hero-bg.webp`,
      width: 1672,
      height: 941,
      // Decorative backdrop: the dashboard beside the copy is the hero's image.
      alt: "",
      blurDataURL: "data:image/webp;base64,UklGRigAAABXRUJQVlA4IBwAAAAwAQCdASoQAAkAA4BaJaQAA3AA/vUAAVK2OIAA",
    },
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "About the Client",
      kicker: "01 — About the Client",
      title: "Making pet wellness intelligent, not incidental",
      body: [
        "The client is a pet healthcare technology company on a mission to transform traditional pet wellness management through intelligent digital solutions. Their platform serves two audiences at once: pet parents, who want an easier way to stay on top of their pets' day-to-day health, and veterinarians, who need complete, reliable visibility into each animal's history. Both depend on AI-powered monitoring, wellness tracking, health assessments and preventive care tools to keep pets healthier for longer.",
      ],
    },
    {
      id: "section2",
      nav: "The Challenge",
      kicker: "02 — The Challenge",
      title: "Pet care was fragmented, manual and reactive",
      body: [
        "Without a single source of truth for a pet's health, both pet parents and veterinarians were working from an incomplete picture — one built on scattered records and manual routines, with little room to catch problems before they became serious.",
      ],
      cards: {
        variant: "plain",
        items: [
          {
            name: "Fragmented, scattered records",
            body: "Pet medical records were split across multiple clinics and visits, leaving no centralized view of a pet's overall wellness and history.",
          },
          {
            name: "Guidance gaps between visits",
            body: "Pet parents had limited access to veterinary guidance between appointments — and no expert support for spotting early signs of health issues.",
          },
          {
            name: "Manual wellness routines",
            body: "Medications, vaccinations and wellness routines were managed by hand — easy to miss, and hard to keep consistent across a pet's life.",
          },
          {
            name: "Reactive, not preventive",
            body: "With no proactive health monitoring or preventive care tracking, problems tended to surface late instead of being caught early.",
          },
        ],
      },
    },
    {
      id: "section3",
      nav: "The Solution",
      kicker: "03 — The Solution",
      title: "One AI platform for the whole wellness journey",
      body: [
        "Soft Suave delivered a centralized, AI-powered pet healthcare platform — automated health assessments, digital medical records, intelligent reminders and real-time insights in one place, so pet parents manage vaccinations, medications, wellness activities, weight and medical history from a single dashboard, with veterinarians given complete visibility.",
      ],
      cards: {
        variant: "icon",
        items: [
          {
            name: "Smart Wellness Dashboard",
            body: "Vaccinations, medications, wellness activities, weight tracking and full medical history managed from a single dashboard — with smart reminders and real-time notifications keeping every routine on schedule.",
          },
          {
            name: "AI Health Assessments",
            body: "AI-based assessments covering dental health, body condition, skin, eye, ear and digestive wellness — helping pet parents identify potential health concerns at an early stage.",
          },
          {
            name: "Conversational AI Assistant",
            body: "An always-available assistant providing instant health guidance and personalized recommendations based on each pet's profile and medical history — closing the gap between veterinary visits.",
          },
        ],
      },
      quote:
        "\"One intelligent platform connecting pet parents and veterinarians — every record, reminder and recommendation in a single place, built to catch concerns early.\"",
    },
    {
      id: "section4",
      nav: "Key Feature",
      kicker: "04 — Key Features",
      title: "Twelve capabilities, one platform",
      body: [
        "WellPet combines a 24/7 AI health assistant, structured wellness assessments, and a centralized digital record into one platform. These capabilities help pet parents stay ahead of their pet's health and give veterinarians complete, reliable visibility into every animal's history.",
      ],
      list: [
        "AI Pet Health Assistant (24/7 Guidance)",
        "Personalized Recommendations per Pet Profile",
        "Digital Pet Medical Records",
        "Centralized Wellness & Weight Tracking",
        "Smart Medication & Vaccination Reminders",
        "Preventive Care Scheduling & Tracking",
        "AI Health Assessments (Dental, Skin & More)",
        "Real-Time Notifications & Wellness Insights",
        "Veterinary Dashboard with Full Health Visibility",
        "Automated Veterinary Document Processing",
        "Secure Subscription & Payment Management",
        "Early Health-Concern Detection via AI",
      ],
      image: {
        src: `${IMG}/platform.webp`,
        width: 1536,
        height: 1024,
        alt: "WellPet mobile app between a dog and a cat, ringed by its twelve capabilities, from the 24/7 AI health assistant to early health-concern detection",
        blurDataURL:
          "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAAAQAgCdASoQAAsAA4BaJYwCdAEQ9HNMrZ/AAP72Ie2K0lhTmLhW47XRLDg2kHYZbb4GmrK9qmRaJUNj6HMx3uDlw0ShbXzSGauKsVMP1DvtIE6SwFhrJCwAAAA=",
      },
    },
    {
      id: "section5",
      nav: "Results & Impact",
      kicker: "05 — Results & Impact",
      title: "Measurable impact for pet parents and veterinarians",
      // Live sets no standfirst here, only the four figures.
      stats: [
        { value: "90%", label: "Reduction in manual medical record entry effort" },
        { value: "60%", label: "Faster health data processing and AI response handling" },
        { value: "50%", label: "Improvement in preventive care tracking through automated reminders" },
        { value: "99.999%", label: "Platform availability for uninterrupted access to pet health data" },
      ],
    },
    {
      id: "section6",
      nav: "Why Soft Suave",
      kicker: "06 — Why Soft Suave",
      title: "Healthcare-grade AI, consumer-grade experience",
      body: [
        "Building for pet healthcare means earning the trust of two very different users at once — pet parents who need simplicity, and veterinarians who need clinical completeness. Soft Suave delivered both: AI assessments and a conversational assistant grounded in each pet's real profile and history, automated document processing that removed 90% of manual record entry, and a scalable architecture holding 99.999% availability. The result turned reactive pet care into proactive, preventive wellness management — and laid a foundation for continued digital veterinary innovation.",
      ],
    },
  ],

  download: {
    navLabel: "Download",
    body: "Download this practical case study to learn how our AI-powered wellness platform helps pet parents stay ahead of their pet's health and gives veterinarians complete, real-time visibility.",
    label: "Download Case Study",
    pdf: PDF,
    fileName: "WellPet_Case_Study.pdf",
    requirement:
      "Case study download: requested the WellPet case study (An AI-Powered Smart Wellness Platform Revolutionizing Pet Healthcare) PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – WellPet",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the WellPet case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // Live's "Related Case Studies" carousel: its heading, standfirst and five
  // cards (WellPet itself is not among them), each with live's own short
  // blurb. The images are the ones the case-study index already ships.
  related: {
    eyebrow: "Related Case Studies",
    title: "Real-World Impact Through Digital Transformation",
    body: "Explore how we help startups and SMBs grow, launch successful products, and solve challenges with tech and strategy—backed by real results in every case study.",
    tileCta: "View Case Study",
    items: [
      {
        title: "An AI-Powered Compliance Analysis Platform for Influencer Marketing",
        body: "Soft Suave built an AI platform that checks sponsored influencer content against compliance rules and returns a verdict in seconds.",
        image: { src: "/images/case-studies/post-guard-cs.webp", alt: "AI-Powered Influencer Marketing Platform" },
        href: "/case-study-postguard-compliance-ai",
      },
      {
        title: "AI-Native Multi-Tenant Market Intelligence for Traders and Analysts",
        body: "Soft Suave lets traders and analysts ask plain-English questions and get answers grounded in their firm's own data, with strict tenant isolation.",
        image: { src: "/images/case-studies/marketmind-cs.webp", alt: "Multi-Tenant Market Intelligence Platform" },
        href: "/case-study-marketmind-ai-market-intelligence",
      },
      {
        title: "An AI Content Production Programme for Enterprise Strategic Communications",
        body: "Soft Suave built an AI content programme that speeds up campaign production and delivers bilingual English-Arabic content at scale.",
        image: { src: "/images/case-studies/brand-forge-cs.webp", alt: "AI Content Production Programme" },
        href: "/case-study-brand-forge",
      },
      {
        title: "Hire Voice An AI-Powered Voice Interview Platform for Scalable Technical Hiring",
        body: "Soft Suave built an AI bot that conducts spoken technical interviews and scores every transcript into a shareable report.",
        image: { src: "/images/case-studies/hire-voice-cs.webp", alt: "AI-Powered Voice Interview Platform" },
        href: "/case-study-hire-voice",
      },
      {
        title: "A Vision AI Platform for Real-Time Axle Counting & Traffic Monitoring",
        body: "Soft Suave built a vision AI platform that counts axles and tracks vehicles in real time from live highway camera feeds.",
        image: { src: "/images/case-studies/vehicle-intelligence-cs.webp", alt: "Vehicle Intelligence Platform" },
        href: "/case-study-vehicle-intelligence",
      },
    ],
  },
};
