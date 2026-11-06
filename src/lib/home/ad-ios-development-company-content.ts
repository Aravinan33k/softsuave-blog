/**
 * Copy for `/ad/ios-development-company` — a clone of
 * softsuave.com/ad/ios-development-company, the paid-traffic landing page for iOS
 * app development.
 *
 * The live page is the /ad/android-development-company page's twin: the same
 * masthead, hero form, review scores, clients, tabs, industries, app screens,
 * testimonials and closing band, word for word. Only the hero's headline and copy,
 * the "services" block (its heading, intro and three cards) and the tab section's
 * heading differ, so those are written here and everything else is reused from the
 * Android page's content. The page names no trial length, so there is no duration
 * to correct.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CardGridContent } from "@/components/generative-ai/industries";
import type { StepTabsContent } from "@/components/ad/step-tabs";
import {
  TRIAL_HREF,
  anClients,
  anContact,
  anHero,
  anIndustries,
  anIndustriesCta,
  anPopup,
  anScreens,
  anServicesCta,
  anTestimonials,
  anWhy,
} from "@/lib/home/ad-android-development-company-content";

export const ioMeta = {
  path: "/ad/ios-development-company",
  // The live page's <title>; it sets no description, so one is written from its hero.
  title: "Top iOS Development Company in India",
  description:
    "Soft Suave, a top-notch iOS application development company, helps you craft feature-rich, interactive, and innovative iOS applications to build a strong brand identity.",
} as const;

export { TRIAL_HREF };
export const ioClients = anClients;
export const ioIndustries: CardGridContent = anIndustries;
export const ioIndustriesCta = anIndustriesCta;
export const ioScreens = anScreens;
export const ioTestimonials = anTestimonials;
export const ioContact = anContact;
export const ioPopup = anPopup;
export const ioServicesCta = anServicesCta;

export const ioHero: HeroContent = {
  ...anHero,
  titleLines: ["iOS App Development Company in India", "We Turn Your Great Ideas into Amazing iOS Apps"],
  body: [
    "Soft Suave, a top-notch iOS application development company, helps you craft feature-rich, interactive, and innovative iOS applications to build a strong brand identity.",
  ],
};

const svc = (file: string) => [{ src: `/brand/ad/ios/svc-${file}.webp`, alt: "", width: 112, height: 112 }];
export const ioServices: CardGridContent = {
  eyebrow: "",
  title: "iOS Application Development for All Apple Platforms",
  body: "Our iOS development service experts ensure that your applications are engineered perfectly to make your business lead the digital landscape.",
  items: [
    { name: "iPhone App Development", body: "Create high-quality iPhone apps with our expert developers. We deliver scalable, user-friendly solutions to enhance your digital presence and improve user experience.", images: svc("iphone-mobile"), link: false },
    { name: "Apple TV App Development", body: "Create custom Apple TV apps with our expert developers. We deliver scalable, user-friendly solutions to enhance your TV viewing experience and digital presence.", images: svc("apple-tv"), link: false },
    { name: "iPad App Development", body: "Develop custom iPad apps with our expert team. We deliver scalable, user-friendly solutions to enhance your digital presence and improve user experience.", images: svc("apple-tab"), link: false },
  ],
};

export const ioWhy: StepTabsContent = { ...anWhy, title: "Why Choose Soft Suave for iOS App Development?" };
