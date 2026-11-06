/**
 * Copy for `/ai-ml-solutions` — a clone of softsuave.com/ai-ml-solutions.
 *
 * Only what the live page's own content renders, word for word. Live order: a banner (the H1 over a
 * looping video) · "Solution Overview" (six solutions, each a heading and a paragraph, with a "GET IN
 * TOUCH" button) · "Improve Your Business with AI-Driven Solutions" (two steps, the account manager, the
 * credential lockups and the enquiry form) · "AI-Driven Systems Tailored for Smart Operations".
 *
 * The live page's menu and footer are the site's chrome, which this app draws itself (`Nav`, `Footer`). The live page lists the six
 * solutions twice (a link list on the left, the paragraphs on the right); here each is shown once, as a
 * card. The page names no trial length, so there is no duration to correct. Its <meta description> is
 * the live one, which describes Flutter development — it is copied as it stands.
 */

import type { CardGridContent } from "@/components/landing/industries";
import type { OverviewContent } from "@/components/landing/overview";
import type { ManagerEnquiryInput } from "@/components/ad/manager-enquiry";
import { partnerHeroBadges } from "@/lib/home/hero-badges";

export const aiMlMeta = {
  path: "/ai-ml-solutions",
  title: "AI / ML Solutions",
  description:
    "Soft Suave leads the way in Flutter app development services, delivering top-quality solutions for both iOS and Android platforms in India and the USA.",
} as const;

export const aiMlBanner = {
  title: "AI / ML Solutions",
  accent: "AI / ML",
  video: { webm: "/videos/AI-Video-orange-1.webm" },
} as const;

export const aiMlSolutions: CardGridContent = {
  eyebrow: "",
  title: "Solution Overview",
  body: "",
  cta: { label: "GET IN TOUCH", href: "/free-quote" },
  items: [
    {
      name: "Stay ahead with Fine-Tuned LLMs",
      body: "Our specialized Large Language Models (LLMs) are tailored for the cybersecurity industry. They analyze vast amounts of security data in real-time, delivering precise threat insights specific to your business needs. This allows your team to identify vulnerabilities quickly and respond effectively to prevent breaches.",
    },
    {
      name: "Train effectively with Cyber-Drill Scenarios",
      body: "AI-driven cyber-drill scenarios provide practical, hands-on training for your security teams. The simulations test real-world threats and measure response effectiveness, enabling your staff to be prepared for immediate action when an attack occurs. This reduces the risk of operational downtime and strengthens overall security readiness.",
    },
    {
      name: "Act swiftly with Threat Mitigation",
      body: "Our threat mitigation solution monitors your network continuously, detecting and analyzing potential cyber threats in real-time. It identifies attack patterns and alerts your team to act immediately. This minimizes the chances of a breach and protects your critical data, ensuring smooth business operations.",
    },
    {
      name: "Stay prepared with Security Copilot",
      body: "Security Copilot provides real-time threat alerts and actionable insights tailored to your security needs. It advises your team on the best course of action during incidents, helping them make quick, informed decisions. This ensures your team is always prepared and able to mitigate risks efficiently.",
    },
    {
      name: "Respond quickly with Quick Playbook Access",
      body: "Instant access to predefined security playbooks enables your team to respond to threats without delay. The playbooks provide clear steps for handling incidents, ensuring consistent and timely responses. This helps reduce damage and downtime during a security event.",
    },
    {
      name: "Enhance security management with Security Ops",
      body: "Our Security Ops platform consolidates monitoring, threat detection, and response tools into one system. This streamlines security management and improves response times, allowing your team to stay on top of threats and maintain the security of your infrastructure.",
    },
  ].map((it) => ({ ...it, link: false as const })),
};

export const aiMlEnquiry: ManagerEnquiryInput = {
  title: "Improve Your Business with AI-Driven Solutions",
  body: "Interested in learning more? Contact us to discover how AI can transform your operations, improve decision-making, and drive innovation across your business.",
  steps: [
    {
      title: "Fill up your details",
      body: "Get Custom Solutions, Recommendations, Estimates.",
    },
    {
      title: "What's next?",
      body: "One of our Account Managers will contact you shortly.",
    },
  ],
  // No button beside the manager on the live page.
  manager: {
    name: "Madhu Kadiyala",
    role: "Technology Consultant",
    photo: "/brand/ad/madhu-manager.webp",
  },
  // Upwork, Clutch, Microsoft, AWS — the four lockups, in the live order.
  badges: partnerHeroBadges,
  form: {
    title: "",
    note: "Alert: This form is for business, not candidates. To apply for jobs,",
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "Brief about the project",
    requirementPlaceholder: "Brief about the project",
    company: { label: "Company" },
    subject:
      "AI / ML Solutions: Improve Your Business with AI-Driven Solutions",
  },
};

export const aiMlOverview: OverviewContent = {
  eyebrow: "",
  title: "AI-Driven Systems Tailored for Smart Operations",
  paragraphs: [
    "Our AI solutions offer continuous monitoring, predictive analytics, and simplified decision-making to help you stay ahead.",
    "Enhance productivity, reduce errors, and ensure your operations run smoothly and effectively, driving better outcomes for your business.",
  ],
  image: {
    src: "/images/ai-ml/ai-driven-systems-illustration.webp",
    width: 1200,
    height: 800,
    alt: "CRM",
    // Transparent artwork (the live SVG's white backing is removed), so no frame colour behind it.
    fit: "cutout",
  },
};
