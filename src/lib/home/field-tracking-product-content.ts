/**
 * Copy for the field tracking product page (`/field-tracking-product`).
 *
 * A clone of softsuave.com/field-tracking-product, the AI field-ops tracker
 * page, the construction product page's sibling. It is built from the site's
 * existing section components (by request: "don't create a new UI, get the
 * section from the already created pages"), in the live page's order. The
 * copy is the live page's, verbatim.
 *
 *   Hero                 landing/hero, the app screenshot in the form's column
 *   Clients              home/clients, the homepage's section as it is (by request)
 *   One Platform         generative-ai/industries (tiles), the picture beside
 *   Features             common/service-board, one live screenshot per feature
 *   Hidden Risks         generative-ai/industries (bold), with the live icons
 *   Maximize Value       generative-ai/industries (bold), with the live icons
 *   Industries           generative-ai/industries (tiles), the site's icon badges
 *   Closing band         landing/cta-band
 *
 * Differences from the live page:
 *
 *  - The floating cut-outs layered over the live hero, overview and closing
 *    pictures, and the closing band's own picture, have no slot in the shared
 *    sections and are not rendered.
 *  - The industry tiles carry the site's icon badges, not the live icons.
 *  - The client logos are the homepage's clients section (its heading, line
 *    and logos), by request, not the live page's bare strip of its own list.
 *  - The live section heads have no kicker above them. The shared heads
 *    expect one, so each section gets a short label here.
 *  - The live features are five H2s; on the service board they are H3s under
 *    the section's H2. "The Hidden Risks…" is set above its cards, where live
 *    sets it below them.
 *  - Every "Get Free Demo" goes to /free-quote, as on the live page.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CardGridContent } from "@/components/generative-ai/industries";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { ServiceBoardContent } from "@/components/common/service-board";

const IMG = "/brand/field-tracking-product";

const DEMO = { label: "Get Free Demo", href: "/free-quote" } as const;

/** A live line icon, for a card's icon slot. */
const icon = (file: string, alt: string) => [{ src: `${IMG}/${file}.svg`, alt, width: 50, height: 50 }];

export const ftMeta = {
  path: "/field-tracking-product",
  // The live page's <title> and description, verbatim (the construction
  // product page's own, as live has it). The live page is noindex,nofollow,
  // and its canonical points at the homepage; both are kept as served.
  title: "Custom AI Solutions to Empower Your Business",
  description:
    "Discover how Soft Suave's custom AI solutions can transform your business operations and drive innovation.",
  canonical: "https://www.softsuave.com/",
  ogImage: "https://www.softsuave.com/assets/images/og-img-field-tracking-solution.webp",
} as const;

export const ftHero: HeroContent = {
  titleLines: ["AI-Powered Field Ops Tracker", "For Smart Teams"],
  body: ["Boost efficiency, guarantee compliance and ensure 100% field safety with AI and biometric controls."],
  points: [],
  ctas: [DEMO],
  aside: { src: `${IMG}/FTP_main_UI.webp`, width: 961, height: 592, alt: "Main UI" },
};

export const ftPlatform: CardGridContent = {
  eyebrow: "Overview",
  title: "One Platform Where Compliance Meets Productivity",
  body: "Go beyond tracking. Enforce PPE checks with AI facial recognition and control work access using geofencing.",
  figure: { src: `${IMG}/ftp_overflow_img.webp`, width: 590, height: 761, alt: "main" },
  items: [
    {
      name: "Total Visibility & control",
      body: "Know exactly where your teams are and what they're doing with live location data, historical pathing, and intelligent site boundaries.",
      images: icon("ftpo_icon_1", "Total Visibility & control"),
      link: false,
    },
    {
      name: "Automated Safety & Compliance",
      body: "Ensure every team member is safe and compliant before they start work with AI-powered PPE checks and biometric verification.",
      images: icon("ftpo_icon_2", "Automated Safety & Compliance"),
      link: false,
    },
    {
      name: "Streamlined Operations",
      body: "Eliminate manual data entry and paperwork by instantly capturing and digitizing information from the field with our advanced OCR technology.",
      images: icon("ftpo_icon_3", "Streamlined Operations"),
      link: false,
    },
  ],
};

const feature = (n: number, name: string, body: string) => ({
  name,
  paragraphs: [body],
  image: { src: `${IMG}/ftpf_img_${n}.webp`, alt: name },
  link: false as const,
});

export const ftFeatures: ServiceBoardContent = {
  eyebrow: "Features",
  title: "Features That Redefine Field Performance",
  body: "Power your operations with secure, intelligent technology designed to enforce safety and maximize team output seamlessly.",
  // No "Get Free Demo" under the board (removed by request; live has one).
  items: [
    feature(
      1,
      "Employee Movement History Tracking",
      "See live locations and historical movement paths to improve dispatching, verify job-site activity, and speed up response times.",
    ),
    feature(
      2,
      "Biometric And Facial Recognition Authentication",
      "Guarantee the verified identity of the person clocking in. Eliminate buddy punching and secure sensitive data with multi-factor authentication.",
    ),
    feature(
      3,
      "Geofencing",
      "Define secure digital perimeters (Zones) for sites. Receive instant alerts when staff enter or exit, ensuring strict site management and security protocols.",
    ),
    feature(
      4,
      "AI Text Recognition & Data Capture",
      "Automate slow data entry. Capture photos of machine logs or work orders, and our AI instantly extracts and records the critical information.",
    ),
    feature(
      5,
      "AI-Enforced PPE Safety Login",
      "Non-negotiable safety. Our AI verifies that mandatory safety harnesses and PPE are correctly worn before allowing employee login and shift commencement.",
    ),
  ],
};

export const ftRisks: CardGridContent = {
  eyebrow: "The Problem",
  title: "The Hidden Risks Without Smart Field Control",
  body: "Managing field teams shouldn’t be a mess. Every day you ask: Are my people where they should be? Are they safe and following the rules? Is small paperwork slowing big projects? Without real-time answers, you’re not managing - you’re guessing.",
  items: [
    {
      name: "Mounting Costs",
      body: "Unverified hours and inefficiencies damage your operating budget.",
      images: icon("ftpr_icon_1", "Mounting Costs"),
      link: false,
    },
    {
      name: "Escalating Risks",
      body: "Safety issues and delays create expensive downtime & penalties.",
      images: icon("ftpr_icon_2", "Escalating Risks"),
      link: false,
    },
    {
      name: "Stalled Productivity",
      body: "Manual work slows your field performance and reporting accuracy.",
      images: icon("ftpr_icon_3", "Stalled Productivity"),
      link: false,
    },
  ],
};

export const ftBenefits: CardGridContent = {
  eyebrow: "Benefits",
  title: "Maximize Value & Transform Your Field Team",
  body: "Our solution is engineered to fundamentally change how you view field operations. We provide the tools & features necessary to achieve organizational goals and enhance workforce management effortlessly.",
  items: [
    {
      name: "Save money",
      body: "Reduce overhead and optimize resource deployment for higher profitability.",
      images: icon("ftpb_icon_1", "Save money"),
      link: false,
    },
    {
      name: "Reduce phone calls",
      body: "Reduce back-and-forth travel costs. Assign ad-hoc meetings or client visits.",
      images: icon("ftpb_icon_2", "Reduce phone calls"),
      link: false,
    },
    {
      name: "Easy to use",
      body: "Effortlessly monitor every field employee location in real-time from one screen.",
      images: icon("ftpb_icon_3", "Easy to use"),
      link: false,
    },
    {
      name: "Accuracy",
      body: "Guarantee undeniable data integrity using biometric and location-based verification.",
      images: icon("ftpb_icon_4", "Accuracy"),
      link: false,
    },
    {
      name: "Efficiency",
      body: "Boost team output by streamlining workflows and automating compliance checks.",
      images: icon("ftpb_icon_5", "Efficiency"),
      link: false,
    },
  ],
};

// The site's own icon badges, picked from each name: the live icons are pale PNG
// art inside SVG, made for a coloured disc, and vanish on the light tiles.
const industry = (name: string) => ({ name, body: "", link: false as const });

export const ftIndustries: CardGridContent = {
  eyebrow: "Industries",
  title: "Employee Tracking Software for all Industries",
  body: "The benefits of Field Tracking software are vast, here are some of the top ones that can help in having a productive and user-friendly experience.",
  items: [
    industry("Manufacturing"),
    industry("Healthcare"),
    industry("Security"),
    industry("Construction"),
    industry("Small Business"),
    industry("Travel & Logistics"),
    industry("IT & Technology"),
    industry("Education"),
  ],
};

export const ftClose: CtaBandContent = {
  title: "Ready to Redefine Safety and Operational Efficiency?",
  body: "Schedule a personalized demo now to see how our AI-driven platform can transform your compliance and field productivity instantly.",
  cta: DEMO,
};
