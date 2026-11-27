/**
 * Copy for `/ad/remote-developers-page` — the Remote Developers ad page
 * redesigned in the look of `/ad/coffee-with-us` (brief, 27 Nov).
 *
 * The content is the brief's, which is `/ad/remote-developers`' own copy with
 * four approved differences: the brief's technology names ("React.js",
 * "Node.js", "TensorFlow" …), "Aaron G" as written there, the ISO card's
 * "ISO 27001 and 9001" wording, and each Code & Practice card's "Learn More".
 * Everything else is re-exported from the existing page's content, so the two
 * pages cannot drift apart by accident.
 *
 * Every "Start 40 Hours Free Trial" (and "Learn More", "Hire Now") scrolls to
 * the hero's enquiry form and focuses its first field (`TRIAL_HREF` below); the
 * page has no popup.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { TopTalentContent } from "@/components/ad/top-talent";
import type { PracticeShowcaseContent } from "@/components/ad/practice-showcase";
import { BOOK_MEETING } from "@/lib/home/ad-app-developer-content";
import {
  rdClients,
  rdExperts,
  rdPopup,
  rdPractice,
  rdProcess,
  rdServices,
  rdTech,
  rdTestimonials,
  rdWhy,
  rdWhyClosing,
} from "@/lib/home/ad-remote-developer-content";
import { rsHero, rsMeta, rsPracticeShowcase, rsTalent } from "@/lib/home/ad-remote-developers-content";
import { CLIENTS_PLUS, SPECIALISTS_PLUS, YEARS_PLUS } from "@/lib/company-figures";

/** The hero's enquiry card (`EnquiryForm`'s default `cardId`). */
export const TRIAL_HREF = "#enquiry";
/** Field prefix of the hero form, so the trial buttons can focus its first field. */
export const FORM_PREFIX = "ad-rdp";

const TRIAL = { label: "Start 40 Hours Free Trial →", href: TRIAL_HREF } as const;
export const BOOK = BOOK_MEETING;

export const rdpMeta = {
  path: "/ad/remote-developers-page",
  title: rsMeta.title,
  // PENDING: the current page's description quotes "pricing beginning at $14";
  // the brief keeps that only once the price is confirmed, so it is left out.
  description:
    "Looking to hire dedicated developers in India On Contract? Soft Suave offers a 40-hour free trial. Connect with us to get started!",
} as const;

/** 1. Hero: copy left, the existing "Staffing gaps?" enquiry form right. */
export const rdpHero: HeroContent = {
  titleLines: rsHero.titleLines,
  accent: rsHero.accent,
  body: rsHero.body,
  points: rsHero.points,
  ctas: [TRIAL, BOOK],
  logoCta: TRIAL,
  // The existing night-city photo, darkened behind the copy.
  image: rsHero.image,
  form: { ...rdPopup.form, subject: "Ad landing: Staffing gaps enquiry (remote developers, redesigned page)" },
};

/** 2. The stats strip under the hero. Real values, written into the HTML. */
export const rdpStats = [
  { figure: YEARS_PLUS, label: "Glorious Years of Service" },
  { figure: CLIENTS_PLUS, label: "Happy Clients Worldwide" },
  { figure: SPECIALISTS_PLUS, label: "AI-Powered Developers" },
  { figure: "97%", label: "Client Retention Rate" },
] as const;

/** 3. Our Clients. */
export const rdpClients = rdClients;

/** 4. Top Talent: the photo variant with its "40 hrs" badge; the figures live in the strip above. */
export const rdpTalent: TopTalentContent = { ...rsTalent, cta: TRIAL, stats: [], statsLast: false };
/** The smaller photo over the Top Talent collage's corner. */
export const rdpTalentSecond = {
  src: "/images/landing/ov-it-staff-augmentation-services.webp",
  alt: "Developers working together on laptops",
} as const;

/** 5. Why Choose Soft Suave, all five points visible beside one coding photo. */
export const rdpWhy = {
  eyebrow: "Why Choose Us",
  title: rdWhy.title,
  body: rdWhy.body,
  items: rdWhy.items,
  closing: rdWhyClosing,
  photo: {
    src: "/images/landing/ov-hire-web-app-developers-v2.webp",
    alt: "Hands typing code on a laptop",
    width: 1448,
    height: 1086,
  },
} as const;

/**
 * 6. Our Services: the eleven cards, each with a photo of that role (by
 * request). All existing site photos except the game one, a Pexels photo
 * (Castorly Stock, pexels.com/photo/3951449, free to use under the Pexels
 * licence). Root-relative; decorative beside the card's own heading.
 */
const L = "/images/landing/";
const SERVICE_PHOTOS: Readonly<Record<string, { src: string; width: number; height: number }>> = {
  "Hire Web App Developers": { src: L + "ov-hire-web-app-developers.webp", width: 1400, height: 1050 },
  "Hire Mobile App Developers": { src: L + "ov-hire-mobile-app-developers.webp", width: 1400, height: 1050 },
  "Hire Frontend Developers": { src: L + "ov-hire-frontend-application-developer.webp", width: 1400, height: 1050 },
  "Hire Backend Developers": { src: L + "ov-hire-backend-application-developer.webp", width: 1400, height: 1050 },
  "Hire Fullstack Developers": { src: L + "ov-hire-mern-stack-developers-india.webp", width: 1400, height: 1050 },
  "Hire DevOps Engineers": { src: L + "ov-hire-devops-developers.webp", width: 1400, height: 1050 },
  "Hire Blockchain Developers": { src: L + "hire-blockchain-hero.webp", width: 1800, height: 900 },
  "Hire eCommerce Developer": { src: L + "hr-web-cap-ecommerce.webp", width: 900, height: 600 },
  "Hire Game Developer": { src: L + "rdp-service-game.webp", width: 1400, height: 934 },
  "Hire Saas Developer": { src: L + "hr-web-cap-saas.webp", width: 900, height: 600 },
  "Hire Fintech Software Developers": { src: L + "ov-fintech-ai-solutions.webp", width: 1400, height: 1050 },
};
/** 6. Our Services. */
export const rdpServices = {
  eyebrow: rdServices.eyebrow,
  title: rdServices.title,
  body: rdServices.body,
  items: rdServices.items.map((s) => ({ name: s.name, body: s.body, image: SERVICE_PHOTOS[s.name] })),
} as const;
export const rdpServicesCta = { lead: "Ready to discuss?", ...TRIAL } as const;

/** 7. The scale banner. */
export const rdpScale = {
  title: "Scale Your Developer Team On-Demand",
  body: "With SoftSuave, you can add remote developers as needed, ensuring faster iteration and predictable growth at reduced costs.",
  cta: TRIAL,
} as const;

/** 8. Technology stack, with the brief's names; the marks are the existing files. */
const TECH_FILES: Readonly<Record<string, string>> = {
  "React.js": "react",
  Angular: "angular",
  "UI/UX": "uiux",
  "Vue.js": "vue-9-1",
  JavaScript: "javascript-1",
  HTML: "html-5",
  CSS: "css3",
  PHP: "php-logo-1",
  Java: "java",
  Python: "python",
  "Node.js": "nodejs",
  ".NET": "dotnet-1",
  ROR: "ror-2",
  Laravel: "laravel",
  Golang: "golang",
  TensorFlow: "tensorflow",
  PyTorch: "pytorch",
  "Deep Learning": "deep_learning",
  "AI/ML": "ai_ml",
  "Computer Vision": "computer_vision",
  RPA: "rpa",
  "Business Intelligence": "business_intelligence",
  AWS: "aws",
  Azure: "azure",
  Cloud: "google-cloud",
};
export const rdpTech: TechStackContent = {
  eyebrow: rdTech.eyebrow,
  title: rdTech.title,
  body: rdTech.body,
  groups: [
    { name: "Front-End", items: ["React.js", "Angular", "UI/UX", "Vue.js", "JavaScript", "HTML", "CSS"] },
    { name: "Back-End", items: ["PHP", "Java", "Python", "Node.js", ".NET", "ROR", "Laravel", "Golang"] },
    { name: "AI/ML", items: ["TensorFlow", "PyTorch", "Deep Learning", "AI/ML", "Computer Vision", "RPA", "Business Intelligence"] },
    { name: "Cloud", items: ["AWS", "Azure", "Cloud"] },
  ],
  images: Object.fromEntries(Object.entries(TECH_FILES).map(([name, file]) => [name, `/brand/ad/tech/${file}.webp`])),
};

/**
 * 9. Code & Practice: the existing photo cards, with the brief's ISO wording
 * (the original "27001 and 9001" line) and each card's "Learn More". The
 * strategy call is its own banner (10), so the grid has no closing card.
 */
export const rdpPractice: PracticeShowcaseContent = {
  ...rsPracticeShowcase,
  items: rsPracticeShowcase.items.map((item, i) => ({ ...item, body: rdPractice.items[i]?.body ?? item.body })),
  closer: undefined,
  more: { label: "Learn More", href: TRIAL_HREF },
};

/** 10. Strategy call banner. */
export const rdpStrategy = {
  eyebrow: "Ready to build together?",
  lines: ["Your Vision.", "Our Development."] as const,
  body: "Let’s turn your ideas into scalable, high-performing solutions.",
  ctas: [{ label: "Book a Strategy Call", href: BOOK.href, external: true }],
} as const;

/** 11. Process as a connected timeline. */
export const rdpProcess = {
  eyebrow: rdProcess.eyebrow ?? "Process",
  title: rdProcess.title ?? "",
  body: rdProcess.body ?? "",
  steps: rdProcess.steps,
  cta: TRIAL,
} as const;

/** 12. Experts: twenty compact tiles with their existing marks. */
export const rdpExperts = {
  eyebrow: rdExperts.eyebrow,
  title: rdExperts.title,
  body: rdExperts.body,
  items: rdExperts.blocks.map((b) => ({ label: b.label, image: b.image.src })),
  cta: { label: rdExperts.cta.label, href: TRIAL_HREF },
} as const;

/** 13. Testimonials: all five, exact quotes, photos and video links; "Aaron G" as the brief writes it. */
export const rdpTestimonials = {
  ...rdTestimonials,
  items: rdTestimonials.items.map((t) => (t.name.startsWith("Aaron") ? { ...t, name: "Aaron G" } : t)),
};

/** 14. Closing banner — existing wording only. */
export const rdpClosing = {
  lines: ["Ready to discuss?"] as const,
  ctas: [TRIAL, BOOK],
} as const;
