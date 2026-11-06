/**
 * Copy for `/ad/mvp-development` — a clone of softsuave.com/ad/mvp-development, the
 * paid-traffic landing page for MVP development.
 *
 * Only what the live page RENDERS, word for word. Live order: masthead · hero (+ form,
 * + four badges) · clients · "Analysis" (why launches fail, four figures) · "The
 * Solution?" · "Process" (six steps) · "Why Us?" (Ideate / Develop / Release) · "Audience"
 * (three cards) · technology stack · "Our Work" (app screens) · testimonials. No closing
 * band. The live masthead's "Get Free Quote" button is left out, as asked, so the masthead
 * is the logo alone. The page names no trial length of its own (its testimonial already
 * says "40-hour"), so there is no duration to correct.
 *
 * It is a sibling of /ad/app-development-company-india, so the hero form and badges, the
 * clients, the three tabs, the technology stack, the app screens and the testimonials
 * are reused from it, word for word.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CardGridContent } from "@/components/generative-ai/industries";
import type { StatsStoryContent } from "@/components/ad/stats-story";
import type { StepCardsContent } from "@/components/ad/step-cards";
import {
  TRIAL_HREF,
  apClients,
  apHero,
  apPopup,
  apScreens,
  apTech,
  apTestimonials,
  apWhy,
} from "@/lib/home/ad-app-development-company-india-content";

export const mvMeta = {
  path: "/ad/mvp-development",
  // The live page's <title>; it sets no description, so one is written from its hero.
  title: "MVP Development Company in India",
  description:
    "Turn your product idea into an investor-ready MVP in just 4 weeks. Launch faster, validate smarter, and scale confidently with dedicated engineering pods and zero hiring overhead.",
} as const;

export { TRIAL_HREF };
export const mvClients = apClients;
export const mvWhy = apWhy;
export const mvTech = apTech;
export const mvScreens = apScreens;
export const mvTestimonials = apTestimonials;
export const mvPopup = apPopup;

export const mvHero: HeroContent = {
  ...apHero,
  titleLines: ["Build, Test & Launch Your", "MVP 3× Faster"],
  accent: "MVP 3× Faster",
  body: [
    "Turn your product idea into an investor-ready MVP in just 4 weeks. Launch faster, validate smarter, and scale confidently with dedicated engineering pods and zero hiring overhead.",
  ],
  // No masthead button.
  logoCta: undefined,
  logoMail: undefined,
};

const img = (file: string, alt: string, size: number) => ({ src: `/brand/ad/mvp/${file}.webp`, width: size, height: size, alt });

export const mvAnalysis: StatsStoryContent = {
  eyebrow: "Analysis",
  title: "Why Do Product Launches Often Fail To Succeed?",
  body: "Startups and founders are full of brilliant ideas for new products and solutions. However, common missteps cause 90% of these startups to fail before they even get off the ground.",
  image: { src: "/brand/ad/mvp/stats.webp", width: 1000, height: 659, alt: "Launch Illustration" },
  stats: [
    { figure: "42%", name: "Lack product-market fit", body: "Failing to align products with actual customer needs, leading to low adoption and stagnant growth." },
    { figure: "29%", name: "Due to insufficient funding", body: "Investing heavily without first validating demand and understanding market risks can lead to rapid financial losses." },
    { figure: "19%", name: "Suffer from teams and expertise", body: "A lack of skilled teams and expertise leads to inefficiencies, project delays, and missed opportunities for growth." },
    { figure: "17%", name: "Face poor product quality", body: "Without a skilled technical team, products fall short of customer expectations, resulting in dissatisfaction, negative reviews, and costly rework." },
  ],
};

const card = (name: string, body: string, image: ReturnType<typeof img>) => ({ name, body, images: [image], link: false as const });

export const mvSolution: CardGridContent = {
  eyebrow: "",
  title: "The Solution?",
  body: "",
  items: [
    card("Minimum", "The core functionalities", img("sol-minimum", "Minimum", 160)),
    card("Viable", "That can solve a real problem", img("sol-viable", "Viable", 160)),
    card("Product", "In a tangible and usable form", img("sol-product", "Product", 160)),
  ],
};

export const mvRoadmap: StepCardsContent = {
  eyebrow: "Process",
  title: "The Roadmap of MVP Software Development",
  body: "We use the latest technology and AI innovation to help startups transform digitally, guiding them through product development with unmatched experience and actionable results.",
  steps: [
    { label: "Step 01", name: "Ideation", body: "We analyze your product idea, identifying core features that address genuine customer pain points, and align your MVP with market needs for early adoption.", image: img("step-1", "Ideation", 200) },
    { label: "Step 02", name: "Design", body: "Our design team crafts intuitive and engaging interfaces to enhance user experience. With a focus on user-centric design, we ensure your MVP is both functional and visually appealing.", image: img("step-2", "Design", 200) },
    { label: "Step 03", name: "Prototyping", body: "Our team leverages scalable technologies to build your MVP with a focus on speed, security, and responsiveness.", image: img("step-3", "Prototyping", 200) },
    { label: "Step 04", name: "Integration Services", body: "We integrate your MVP with suitable third-party platforms, ensuring smooth operation and connectivity with tools like CRMs or ERPs to enhance the overall functionality.", image: img("step-4", "Ideation", 200) },
    { label: "Step 05", name: "QA & Refine", body: "Before launch, we rigorously test your MVP to ensure it functions flawlessly. Our QA process helps catch bugs early and guarantees a reliable and smooth product experience.", image: img("step-5", "Design", 200) },
    { label: "Step 06", name: "Launch & Support", body: "Once your MVP is ready, we assist in deploying it to the market. Post-launch, we offer support to monitor performance and make improvements based on adopters feedback", image: img("step-6", "Prototyping", 200) },
  ],
};

export const mvAudience: CardGridContent = {
  eyebrow: "Audience",
  title: "Who Is Our MVP Services Ideal For?",
  body: "Every great product starts as an idea, but bringing that idea to life can feel like a leap into the unknown. Start with an MVP to validate your ideas and reduce risk. Whether you’re having a vision, refining a concept, or exploring new opportunities, here’s how you can benefit from our MVP services:",
  items: [
    card("Startups", "As startups to startups, you’ve got the vision, but no product yet. An MVP for startups allows you to test the waters, get real market feedback, and show investors your idea has legs—all before going all-in.", img("aud-startup", "Startups", 160)),
    card("Enterprises", "Enterprises already have strong teams but don’t want to slow them down with experimental projects. By outsourcing your MVP, you can quickly validate new ideas and hand them off to your in-house crew once they’re proven to work.", img("aud-enterprises", "Enterprises", 160)),
    card("Small Businesses", "You need a solution that fits your needs without overextending your budget or team. That’s where we come in. We develop cost-efficient MVPs that align with your business needs and workflows without the need to hire in-house developers.", img("aud-business", "Small Businesses", 160)),
  ],
};
