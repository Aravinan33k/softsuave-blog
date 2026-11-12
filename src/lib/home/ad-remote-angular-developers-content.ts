/**
 * Copy for `/ad/remote-angular-developers` — a clone of
 * softsuave.com/ad/remote-angular-developers, the paid-traffic landing page for
 * hiring Angular developers on contract.
 *
 * Only what the live page RENDERS, word for word. Live order: hero (+ form, the
 * rating marks) · clients · why choose us + closing line · services + "Ready to
 * discuss?" · technology stack · testimonials. The popup behind every trial
 * button is the live "Trusted by Startups & Enterprises Worldwide" two-column
 * popup with its "Staffing gaps?" form.
 *
 * Several blocks are word for word the live /ad/remote-developer page's, so
 * they are reused from it: the clients, the technology stack, the closing
 * line, the "Ready to discuss?" row, the testimonials and the popup. The trial
 * duration is 40 hours everywhere, as on this site's other /ad pages.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CardGridContent } from "@/components/generative-ai/industries";
import { adHero } from "@/lib/home/ad-app-developer-content";
import {
  rdClients,
  rdPopup,
  rdServicesCta,
  rdTech,
  rdTestimonials,
  rdWhyClosing,
} from "@/lib/home/ad-remote-developer-content";
import { FIGURES } from "@/lib/company-figures";

export const raMeta = {
  path: "/ad/remote-angular-developers",
  // The live page's <title> and description, verbatim.
  title: "Hire Angular Developers on Contract",
  description: `Looking to hire dedicated developers in India On Contract? Soft Suave offers a 40-hour free trial and pricing beginning at $${FIGURES.hourlyRate}. Connect with us to get started!`,
} as const;

export const raClients = rdClients;
// This live page's intro line has no closing full stop (the other /ad pages' do).
export const raTestimonials = {
  ...rdTestimonials,
  body: "We've empowered hundreds of clients globally to achieve their business goals. Hear firsthand how our expertise and AI-driven solutions have made a difference",
};
export const raTech = rdTech;
export const raWhyClosing = rdWhyClosing;
export const raServicesCta = rdServicesCta;

export const raHero: HeroContent = {
  ...adHero,
  titleLines: ["Hire Angular Developers", "on Contract"],
  accent: "Angular Developers",
  body: [
    "Need top-rated Angular developers on contract? Hire Angular developers from india and enjoy the 40-hour free trial to experience their expertise!",
    "*Satisfaction Guaranteed – Get 40-hour Free Trial",
  ],
  form: {
    title: "Get Skilled Remote Developers",
    note: "Alert: This form is for business, not candidates. To apply for jobs,",
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Start My FREE Trial",
    sending: "Sending...",
    requirementLabel: "Requirements",
    requirementPlaceholder: "Tell us about your requirements",
    subject: "Ad landing: 40-Hour Free Trial (Angular developers)",
  },
};

export const raWhy: CardGridContent = {
  eyebrow: "Why choose Us",
  noIcons: true,
  title: "Why Choose Soft Suave",
  body: "With proven expertise, rapid hiring, flexible models, and cost-effective solutions, we provide top-tier talent that seamlessly integrates, driving growth, innovation, and success for your business.",
  items: [
    { name: "Expert Angular Developers", body: "Highly skilled Angular professionals with strong backend and enterprise experience" },
    { name: "Flexible Hiring Models", body: "Hire Angular developers on hourly, monthly, or project-based models" },
    { name: "Scalable Application Development", body: "Build robust and scalable Angular applications for any business size" },
    { name: "Fast Development Cycle", body: "Agile methodologies ensuring quick and efficient delivery" },
    { name: "Secure & Reliable Solutions", body: "Enterprise-grade security and performance-driven applications" },
  ],
};

export const raServices: CardGridContent = {
  eyebrow: "Our Services",
  noIcons: true,
  title: "Hire Dedicated Developers for All Your Technology Needs",
  body: "Enhance your tech initiatives with dedicated developers. We specialize in various technologies to help your projects achieve maximum potential.",
  items: [
    {
      name: "Single page Application(SPAs)",
      body: "SPAs are created using Angular, and they are web applications that load a single HTML page. With every click of the mouse, only a small part of the page gets loaded, so the page loads faster, and performance is more efficient.",
      link: false,
    },
    {
      name: "Progressive Web Application(PWAs)",
      body: "PWAs run on multiple platforms from a single codebase, work offline, and load pretty fast. Thanks to its superior UX, it also increases engagement and is highly responsive.",
      link: false,
    },
    {
      name: "Enterprise Web Apps",
      body: "They are cutting-edge software solutions for big companies, using Angular for smooth interfaces and better performance. It allows for cost and time savings for modern businesses.",
      link: false,
    },
    {
      name: "eCommerce Platforms",
      body: "ECommerce platforms are online stores powered by Angular, which load fast and update content dynamically for great user experiences. Allows a faster buying process, is flexible for customers, and is affordable for businesses.",
      link: false,
    },
    {
      name: "Content Management System",
      body: "These platforms are used for managing content, and have simple interfaces, but optimized workflows. They support various content and features like SEO optimization, user permissions, etc.",
      link: false,
    },
    {
      name: "Real-time Dashboards",
      body: "These are live data tools that show instant insights for quick decisions and better productivity. They help businesses improve productivity by monitoring performance.",
      link: false,
    },
  ],
};

/**
 * What every "Start 40 Hours Free Trial" button opens — the live page's
 * two-column popup, the same as the remote-developer page's with this page's
 * lead subject.
 */
export const raPopup = {
  side: rdPopup.side,
  form: { ...rdPopup.form, subject: "Ad landing: Staffing gaps enquiry (Angular developers)" },
};
