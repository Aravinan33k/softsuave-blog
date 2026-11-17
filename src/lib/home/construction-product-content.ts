/**
 * Copy for the construction product page (`/construction-product`).
 *
 * A clone of softsuave.com/construction-product, the heavy-equipment rental
 * micro-SaaS page. It is built from the site's existing section components
 * (by request: "don't use the new UI, get from the created page sections"),
 * in the live page's order. The copy is the live page's, verbatim.
 *
 *   Hero               landing/hero, with the excavator in the form's column
 *   Dynamic Features   generative-ai/industries (bold), with the live icons
 *   Downtime band      landing/cta-band
 *   What We Offer      common/service-board, one live screenshot per item
 *   Results            landing/overview, with its four stats and picture
 *   Two Apps           generative-ai/integration (bold), "Book Demo" on each
 *   Simple Steps       landing/process
 *   Closing band       landing/cta-band
 *
 * Differences from the live page:
 *
 *  - The shared components have no slot for some of the live pictures, so
 *    these are not rendered: the worker beside the downtime band, the app
 *    preview beside the closing band, and the small icons on the stats and
 *    steps. (The two app cards carry their photos, by request.)
 *  - The live headings have no kicker above them. The shared section heads
 *    expect one, so each section gets a short label here.
 *  - The live feature and step names are H4s. The shared cards set them as
 *    H3s, under the section's H2.
 *  - Every "Book Demo" goes to /free-demo-app, as on the live page.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CardGridContent } from "@/components/generative-ai/industries";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { ServiceBoardContent } from "@/components/common/service-board";
import type { OverviewContent } from "@/components/landing/overview";
import type { IntegrationContent } from "@/components/generative-ai/integration";
import type { ProcessContent } from "@/components/landing/process";

const IMG = "/brand/construction-product";

const DEMO = { label: "Book Demo", href: "/free-demo-app" } as const;

export const cpMeta = {
  path: "/construction-product",
  // The live page's <title> and description, verbatim. The live page is
  // noindex,nofollow, and its canonical points at the homepage; both are
  // kept as served.
  title: "Custom AI Solutions to Empower Your Business",
  description:
    "Discover how Soft Suave's custom AI solutions can transform your business operations and drive innovation.",
  canonical: "https://www.softsuave.com/",
  ogImage: "https://www.softsuave.com/assets/images/og-img-ai-solution.webp",
} as const;

export const cpHero: HeroContent = {
  titleLines: ["Rent Smarter", "with Our Micro-Saas", "Solution"],
  // The live H1 colours its first line.
  accent: "Rent Smarter",
  body: [
    "Unlock the full potential of your business. Effortlessly track machines, streamline billing, improve uptime, and stay ahead of maintenance, all with our real-time, AI-powered platform.",
  ],
  points: [],
  ctas: [DEMO],
  aside: { src: `${IMG}/banner_excavator.webp`, width: 892, height: 707, alt: "Excavator" },
};

const feat = (n: number, alt: string) => [{ src: `${IMG}/const_feat_${n}.webp`, alt, width: 70, height: 70 }];

export const cpFeatures: CardGridContent = {
  eyebrow: "Features",
  title: "Dynamic Features for Modern Heavy Equipment Rentals",
  body: "Transform your heavy equipment rentals with dynamic features that enhance efficiency, simplify management, and drive uptime, empowering your business for growth and success at every turn.",
  items: [
    {
      name: "Smart Field Tracking",
      body: "Track every machine in real-time for instant updates on availability and location.",
      images: feat(1, "Field Tracking"),
      link: false,
    },
    {
      name: "NextGen Fleet Management",
      body: "Effortlessly manage your fleet with real-time tracking and seamless workflows.",
      images: feat(2, "Fleet Management"),
      link: false,
    },
    {
      name: "AI Predictive Management",
      body: "Leverage AI to optimize operations, prevent breakdowns, and streamline equipment scheduling.",
      images: feat(3, "AI Predictive Management"),
      link: false,
    },
    {
      name: "Supply-Chain Management",
      body: "Simplify supply chain management for quicker operations and faster equipment availability.",
      images: feat(4, "Supply-Chain Management"),
      link: false,
    },
  ],
};

export const cpDowntime: CtaBandContent = {
  title: "Solve Your Downtime Challenges Now!",
  body: "Eliminate downtime, increase efficiency, and scale effortlessly with a solution built for your needs.",
  cta: DEMO,
};

const offer = (n: number, name: string, body: string) => ({
  name,
  paragraphs: [body],
  image: { src: `${IMG}/construction_screen_${n}.webp`, alt: `${name} screen` },
  mark: { src: `${IMG}/con_scr_icon_${n}.webp`, alt: "" },
  link: false as const,
});

export const cpOffer: ServiceBoardContent = {
  eyebrow: "What We Offer",
  title: "What We Offer to Supercharge Your Business",
  body: "Unlock cutting-edge features that streamline operations, enhance productivity, and drive success. Everything you need to elevate your business to the next level.",
  items: [
    offer(
      1,
      "Employee Management",
      "Streamline team workflows, boost productivity, and track performance in real-time with seamless employee management tools tailored to your business needs.",
    ),
    offer(
      2,
      "Operation Management",
      "Optimize operations, reduce inefficiencies, and gain full control with powerful tools that enhance your workflow and significantly boost your profits further.",
    ),
    offer(
      3,
      "LogSheet Management",
      "Simplify check-ins, reduce errors, and speed up the process with automated tracking and real-time updates for seamless equipment management.",
    ),
    offer(
      4,
      "User Management",
      "Easily manage users, set permissions, and monitor activity with intuitive tools designed to keep your team and operations secure and efficient.",
    ),
    offer(
      5,
      "CheckIn Management",
      "Digitize log entries, track maintenance schedules, and automate reporting to ensure accuracy, compliance, and efficiency across your entire fleet.",
    ),
  ],
};

export const cpResults: OverviewContent = {
  eyebrow: "Results",
  title: "Transformative Results You Can Measure",
  paragraphs: [
    "See tangible improvements in efficiency, uptime, and profitability. Our solution delivers measurable results that drive real business growth.",
  ],
  // The product's own figures, from the live page (not company-wide figures).
  stats: [
    { figure: "550+", label: "Machines tracked in multiple locations" },
    // `\u200B` (zero-width space) after the slash: on a phone the line breaks
    // there, not inside "technicians". Invisible; the words are the live page's.
    { figure: "1800+", label: "Operators/\u200Btechnicians onboarded" },
    { figure: "25%", label: "Increase machine availability" },
    { figure: "3X", label: "Operational speed" },
  ],
  // Two by two under the copy, the dashboard picture beside them (by request).
  statsInColumn: true,
  image: {
    src: `${IMG}/construction_stats.webp`,
    width: 866,
    height: 534,
    alt: "Maintenance and Downtime",
    // Its own proportions, centred against the copy: no crop, no fill around it.
    aspect: "866 / 534",
    align: "center",
  },
};

export const cpApps: IntegrationContent = {
  eyebrow: "Two Apps",
  title: "Two Apps, One Unified Workforce",
  body: "Empower your team with integrated tools. Effortlessly sync operations and communication for unmatched efficiency and collaboration.",
  blocks: [
    {
      label: "For Machine Operators",
      photo: { src: `${IMG}/operator.webp`, width: 780, height: 425, alt: "Machine Operator" },
      body: "Simplify task management, track progress in real-time, and ensure smooth operations with an intuitive app designed for maximum efficiency.",
    },
    {
      label: "For Admin & Managers",
      photo: { src: `${IMG}/admin.webp`, width: 780, height: 425, alt: "Admin & Managers" },
      body: "Gain full control over operations, manage resources, and optimize workflows seamlessly with a centralized platform tailored for admins and managers.",
    },
  ],
};

export const cpAppsCta = DEMO;

export const cpSteps: ProcessContent = {
  eyebrow: "Get Started",
  title: "Simple Steps to Start Your Journey with Soft Suave",
  body: "Kickstart your success with ease. Follow four straightforward steps to unlock powerful solutions and accelerate your business growth.",
  steps: [
    {
      n: "01",
      name: "Schedule Demo Session",
      body: "Book a quick demo to explore our solution and see how it can solve your challenges effectively.",
    },
    {
      n: "02",
      name: "Customize Your Solution",
      body: "Work closely with our team to customize the platform to meet all your specific business goals.",
    },
    {
      n: "03",
      name: "Deploy the Platform",
      body: "Get everything set up seamlessly with our dedicated support to ensure a smooth integration.",
    },
    {
      n: "04",
      // "Train and Go Live On" on the live page, verbatim.
      name: "Train and Go Live On",
      body: "Receive training for your team and begin using the solution to unlock improved efficiency and results.",
    },
  ],
};

export const cpClose: CtaBandContent = {
  title: "Ready to Eliminate Downtime with Our Solution",
  body: "Unlock seamless operations and boost efficiency with our solution - eliminate downtime, enhance productivity, and maximize asset performance instantly.",
  cta: DEMO,
};
