/**
 * Copy for `/ad/ai-solution` — a clone of softsuave.com/ad/ai-solution, the
 * paid-traffic landing page for offshore AI development.
 *
 * Only what the live page RENDERS, word for word. Live order: masthead ("Let's
 * Connect") · hero (+ form, + four badges, + clients) · "Struggling to keep up
 * with the AI revolution?" · "Build innovative AI solutions that scale with
 * you." · "Trust a partner with a proven track record." · "Experts in 100+
 * technologies and languages." · "Beyond AI." · "Start Your 40 Hours Trial".
 * Every "Let's Connect" button opens the trial popup. The trial duration is 40
 * hours everywhere, as on this site's other /ad pages (the live hero's "7 Days
 * Trial Available" reads "40 Hours Trial Available" here).
 *
 * The clients, the closing enquiry band and the popup form are word for word the
 * live /ad/hire-dedicated-developer and /ad/hire-ai-developer pages', so they
 * are reused from them.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CardGridContent } from "@/components/generative-ai/industries";
import type { LogoRowsContent } from "@/components/ad/logo-rows";
import type { ManagerEnquiryContent } from "@/components/ad/manager-enquiry";
import { TRIAL_HREF } from "@/lib/home/ad-app-developer-content";
import { aiEnquiry, aiTrialForm } from "@/lib/home/ad-hire-ai-developer-content";
import { dedClients } from "@/lib/home/ad-hire-dedicated-developer-content";
import { partnerHeroBadges } from "@/lib/home/hero-badges";
import { FIGURES, SPECIALISTS_PLUS } from "@/lib/company-figures";

export const asMeta = {
  path: "/ad/ai-solution",
  // The live page's <title> and description, verbatim.
  title: "Accelerate your AI development projects",
  description: `Looking to hire dedicated developers in India On Contract? Soft Suave offers a 40-hour free trial and pricing beginning at $${FIGURES.hourlyRate}. Connect with us to get started!`,
} as const;

const CONNECT = { label: "Let's Connect", href: TRIAL_HREF } as const;
export { TRIAL_HREF };
export const asClients = dedClients;
/** The popup: the live form has no heading, just the four fields and "Submit". */
export const asTrialForm = {
  ...aiTrialForm,
  eyebrow: undefined,
  title: "",
  body: undefined,
  submit: "Submit",
  subject: "Ad landing: 40-Hour Trial modal (AI solution)",
};

export const asHero: HeroContent = {
  eyebrow: "TOP AI DEVELOPMENT COMPANY",
  titleLines: ["Catch the next wave of", "AI."],
  accent: "AI.",
  body: [
    "Our top 1% bilingual AI engineers work the same hours you do. Offshore your AI development and stay light years ahead of the competition.",
    "Allow us to help you optimize your team productivity. Hire our AI developers.",
  ],
  points: [
    "40 Hours Trial Available, 100% Risk-Free",
    "Language/Time Zone Compatible Staff",
    `${SPECIALISTS_PLUS} In-house resources`,
  ],
  // Upwork, Clutch, Microsoft, AWS — the live hero's four marks, in its order.
  badges: partnerHeroBadges,
  ctas: [],
  logoCta: CONNECT,
  // The live hero's robot photo, behind the whole section.
  image: { src: "/brand/ad/ai/ai_banner.webp", width: 1920, height: 1080, alt: "", veil: "dark", still: true },
  form: {
    title: "40-hour Trial, 100% Risk Free",
    note: "Alert: This form is for business, not candidates. To apply for jobs,",
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "Requirements",
    requirementPlaceholder: "How Can We Help(Requirement)",
    subject: "Ad landing: 40-Hour Trial (AI solution)",
  },
};

/** The live block's three pains, each with its own line. */
export const asStruggle: CardGridContent = {
  eyebrow: "",
  noIcons: true,
  title: "Struggling to keep up with the AI revolution?",
  body: "",
  items: [
    { name: "Massive Talent Shortage", body: "Hiring AI engineers can take 4-6 months right now. Meanwhile, your growth has flatlined.", link: false },
    { name: "Rapidly Evolving Tech", body: "AI breakthroughs are happening daily. However, upskilling your workforce takes months.", link: false },
    { name: "Sky-high Salaries", body: "US tech talent is expensive and tough to retain. Save up to 50% of hiring costs with offshoring.", link: false },
  ],
};
export const asStruggleCta = { lead: "", ...CONNECT } as const;

export const asBuild: CardGridContent = {
  eyebrow: "",
  noIcons: true,
  title: "Build innovative AI solutions that scale with you.",
  body: "We support you throughout the development lifecycle:",
  items: [
    { name: "Data Engineering", body: "Build scalable data infrastructures to capture and manage the vast volumes of structured and unstructured data used for AI training.", link: false },
    { name: "Multi-Modal Models", body: "Go beyond text and numbers. Create AI systems that can also process and generate images, videos, and audio (Think Midjourney, Synthesia, and ElevenLabs).", link: false },
    { name: "AI Application Development", body: "AI powers self-driving cars, chatbots, facial recognition software, and more. Develop intuitive AI applications with custom UI, interactive features, and personalized user experiences.", link: false },
    { name: "Large Language Models", body: "Create and train advanced models on large datasets. Develop a robust LLM to rival GPT-4, Claude, or Gemini.", link: false },
    { name: "Prompt Engineering", body: "Design effective prompts for Large Language Models (LLMs). Maximize response accuracy, efficiency, and adaptability with advanced techniques like reinforcement learning.", link: false },
    { name: "API Integrations", body: "Enable features like real-time speech translation. Or product ID based on user-uploaded images. AI API integrations can add AI to your existing applications or enrich external platforms with your AI.", link: false },
  ],
};
/** The live block's side photo. */
export const asBuildImage = { src: "/brand/ad/ai/innovative-ai.webp", width: 600, height: 600, alt: "" } as const;

/** "Trust a partner…" — a plain list beside the live orbit graphic. */
export const asTrust = {
  title: "Trust a partner with a proven track record.",
  items: [
    "Dozens of AI projects delivered over the past 12 months.",
    "We work with household names like Google and Pinterest.",
    "Industry-leading customer satisfaction score of 91%.",
    "Average client relationship of 3+ years.",
  ],
  image: { src: "/brand/ad/ai/technologies_list.webp", width: 1000, height: 1009, alt: "" },
} as const;

const m = (file: string, w: number, h = 120) => ({ src: `/brand/ad/ai/t-${file}.webp`, alt: "", width: w, height: h });

/** The live marquee: two rows of marks (the second runs the other way). */
export const asTech: LogoRowsContent = {
  title: "Experts in 100+ technologies and languages.",
  rows: [
    [m("python_text", 120, 51), m("spacy", 105, 33), m("pytorch", 120, 120), m("pyspark", 131, 74), m("pandas", 132, 53), m("mediapipe", 133, 36), m("keras", 118, 36), m("google_cloud_vision", 120, 59), m("azure_ml", 120, 50)],
    [m("opencv", 126, 120), m("tensorflow", 126, 120), m("openpose", 76, 76), m("nltk", 50, 58), m("learn", 99, 54), m("googlebert", 108, 50), m("chatgpt", 76, 76)],
  ],
};

const svc = (file: string) => [{ src: `/brand/ad/ai/svc-${file}.webp`, alt: "", width: 112, height: 112 }];
export const asBeyond: CardGridContent = {
  eyebrow: "",
  title: "Beyond AI.",
  body: "Tap into our 4,000+ experts for other software development needs.",
  items: [
    { name: "Custom Software Development", body: "Create custom software for your unique needs, including front-end & back-end technology.", images: svc("code"), link: false },
    { name: "QA and Testing", body: "Make your technology bulletproof with extensive manual and automated testing.", images: svc("qa_testing"), link: false },
    { name: "Data", body: "From building ETLs to dashboards and complex statistical analysis.", images: svc("data"), link: false },
    { name: "Mobile App Development", body: "Build high-performing, scalable, and secure mobile apps for iOS and Android devices.", images: svc("mobile_app"), link: false },
    { name: "UX/UI Design", body: "Create beautiful, pixel-perfect, and easy-to-use designs that delight your end users.", images: svc("uiuxdesign"), link: false },
    { name: "Platform and Infrastructure", body: "Ensure applications are fault-tolerant & ultra-reliable with our DevOps & Security engineers.", images: svc("platform"), link: false },
  ],
};
export const asBeyondCta = { lead: "", ...CONNECT } as const;

export const asEnquiry: ManagerEnquiryContent = {
  ...aiEnquiry,
  form: { ...aiEnquiry.form, subject: "Ad landing: Start Your 40 Hours Trial (AI solution)" },
};
