/**
 * Copy for `/ad/remote-developers` — a clone of softsuave.com/ad/remote-developers,
 * the paid-traffic landing page for hiring remote developers.
 *
 * Only what the live page RENDERS, word for word. Live order: masthead (a trial
 * button beside the logo) · hero (no form) · clients · top talent + four figures ·
 * why choose us + closing line · services + "Ready to discuss?" · "Scale Your
 * Developer Team On-Demand" · technology stack · code & practice · process (4
 * steps) · experts (twenty "Hire Now" cards) · testimonials. The popup behind
 * every trial and "Hire Now" button is the live "Trusted by Startups &
 * Enterprises Worldwide" two-column popup with its "Staffing gaps?" form.
 *
 * The clients, the why-choose-us and services cards, the technology stack, the
 * code & practice cards, the four steps, the experts, the testimonials and the
 * popup are word for word the live /ad/remote-developer page's, so they are
 * reused from it. The trial duration is 40 hours everywhere, as on this site's
 * other /ad pages.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { TopTalentContent } from "@/components/ad/top-talent";
import { AD_TRIAL_CTA, BOOK_MEETING, TRIAL_HREF } from "@/lib/home/ad-app-developer-content";
import {
  rdClients,
  rdExperts,
  rdPopup,
  rdPractice,
  rdProcess,
  rdServices,
  rdServicesCta,
  rdTech,
  rdTestimonials,
  rdWhy,
  rdWhyClosing,
} from "@/lib/home/ad-remote-developer-content";
import { CLIENTS_PLUS, FIGURES, SPECIALISTS_PLUS, YEARS_PLUS } from "@/lib/company-figures";

export const rsMeta = {
  path: "/ad/remote-developers",
  // The live page's <title> and description, verbatim.
  title: "Hire Remote Developers on Contract",
  description: `Looking to hire dedicated developers in India On Contract? Soft Suave offers a 40-hour free trial and pricing beginning at $${FIGURES.hourlyRate}. Connect with us to get started!`,
} as const;

export { TRIAL_HREF };
export const rsClients = rdClients;
export const rsWhy = rdWhy;
export const rsWhyClosing = rdWhyClosing;
export const rsServices = rdServices;
export const rsServicesCta = rdServicesCta;
export const rsTech = rdTech;
export const rsPractice = rdPractice;
export const rsProcess = rdProcess;
export const rsExperts = rdExperts;
export const rsTestimonials = rdTestimonials;

/** The live masthead and hero: no form, a "Start … OR Book a Meeting" pair and three chips. */
export const rsHero: HeroContent = {
  titleLines: ["Hire Remote Developers"],
  accent: "Remote",
  body: [
    "Hire dedicated remote developers to boost your project with expert skills, flexible hiring models, and cost-effective, scalable software development solutions",
  ],
  points: ["Flexible Engagement Models", "Strict NDA", "40 Hours Risk Free Trial"],
  ctas: [AD_TRIAL_CTA, BOOK_MEETING],
  ctaSeparator: "OR",
  logoCta: AD_TRIAL_CTA,
};

export const rsTalent: TopTalentContent = {
  eyebrow: "Top Talent",
  title: "Hire Remote Developers For All Your Tech Needs",
  body: "Access top-tier remote developers on contract to seamlessly scale your team and meet all your technology requirements with flexibility and expertise.",
  models: [
    { name: "Engagement Models Aligned With Your Requirements" },
    { name: "Trusted By Businesses Across The World Since 2012" },
    { name: "Real Time Collaboration With Your Preferred Tools" },
    { name: "Replacement Guarantee For Developers’ Performance Concerns" },
    { name: "Dedicated Account Manager for Streamlined Communication" },
  ],
  cta: AD_TRIAL_CTA,
  statsLast: true,
  stats: [
    { figure: YEARS_PLUS, label: "Glorious Years of Service" },
    { figure: CLIENTS_PLUS, label: "Happy Clients Worldwide" },
    { figure: SPECIALISTS_PLUS, label: "AI-Powered Developers" },
    { figure: "97%", label: "Client Retention Rate" },
  ],
};

export const rsScaleBand: CtaBandContent = {
  title: "Scale Your Developer Team On-Demand",
  body: "With SoftSuave, you can add remote developers as needed, ensuring faster iteration and predictable growth at reduced costs.",
  cta: AD_TRIAL_CTA,
};

/**
 * What every "Start 40 Hours Free Trial" and "Hire Now" button opens — the live
 * page's two-column popup, the same as the remote-developer page's with this
 * page's lead subject.
 */
export const rsPopup = {
  side: rdPopup.side,
  form: { ...rdPopup.form, subject: "Ad landing: Staffing gaps enquiry (remote developers, masthead page)" },
};
