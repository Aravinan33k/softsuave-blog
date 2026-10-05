/**
 * Copy for the "Global Capability Center" landing page (`/global-capability-center`).
 *
 * The hero is this page's own and is kept as it was. Everything below it — and
 * the page's title, description and schema — follows the live softsuave.com
 * page (review: "lot of sections have changed including the title,
 * description, canonicals, and schemas"). The mapping, in live page order:
 *
 *   "Unlock Global Talent & Scale Your Business"      → `gccIntro`
 *   "Why Choose Soft Suave for GCC?"                  → `gccWhyUs` (3)
 *   "Simplify Your Development with Our Expertise"    → `gccServices` (5)
 *   "Benefits of GCC"                                 → `gccBenefits` (3)
 *   "Who Should Consider GCC-as-a-Service?"           → `gccAudience` (6)
 *   "Transform Your Business with our GCC-as-a-Service" → `gccClosingCta`
 *
 * The copy is the live page's own, verbatim. The live page runs no client
 * strip, testimonials, process or FAQs, so this page has none.
 */

import type { CtaBandContent } from "@/components/landing/cta-band";
import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import { sharedHeroAlert, sharedHeroBadges } from "./delivery-shared";
import { overviewImage } from "./overview-images";

export const gccMeta = {
  slug: "global-capability-center",
  path: "/global-capability-center",
  // The live page's <title> and meta description, verbatim.
  title: "Global Capability Centre : Excellence in Action",
  description:
    "Leverage our Global Capability Centre in India with 40 hours of free trial. Access top talent and innovative solutions tailored to your business needs.",
} as const;

export const gccHero: HeroContent = {
  titleLines: ["Global Capability Center", "Services"],
  body: [
    "Build your own offshore engineering centre in India without standing up a legal entity, an office, and a hiring function from scratch. Soft Suave handles company registration, infrastructure, recruitment, and daily operations, while the team works to your roadmap and your standards.",
    "You get the cost base and talent depth of an India delivery centre with the control of an in-house team — and a defined path to taking the centre fully in-house when you are ready.",
  ],
  points: [
    "End-to-end GCC setup and operations",
    "Legal, tax and statutory compliance handled",
    "400+ AI & engineering specialists to recruit from",
    "Chennai, Bengaluru and US delivery presence",
    "Build-Operate-Transfer path to full ownership",
  ],
  badges: sharedHeroBadges,
  form: {
    eyebrow: "Business Enquiry",
    title: "Plan your Global Capability Center",
    // The live form's business-only notice (review: "Form needs to be updated").
    alert: sharedHeroAlert,
    submit: "Send requirements",
    sending: "Opening your mail…",
    requirementLabel: "What do you want your GCC to do?",
    requirementPlaceholder:
      "Functions you want to move offshore, roles and headcount, target timeline, and where your existing teams sit.",
    subject: "Global Capability Center enquiry",
  },
  image: {
    src: "/images/four/svc-gcc.webp",
    width: 1200,
    height: 860,
    alt: "A distributed engineering team collaborating across a global capability centre",
  },
};

/**
 * The live page's opening block under the banner: a gradient strip (its label
 * and one-line claim, with a "Contact with us" button) over three paragraphs.
 * The strip's label is the eyebrow and its claim the title — the live block has
 * no heading of its own.
 */
export const gccIntro: OverviewContent = {
  eyebrow: "Unlock Global Talent & Scale Your Business",
  title: "Our GCC Services provide businesses with the expertise and scalability to stay competitive.",
  paragraphs: [
    "At Soft Suave, our Global Capability Center (GCC) Services offer businesses a flexible and cost-effective solution to scale their software development operations globally. We provide access to global talent pools and cutting-edge technologies, enabling your teams to innovate and drive operational efficiency.",
    "Our GCC solutions are specifically designed to align with your software development goals, ensuring seamless integration with your existing systems. We help businesses optimize workflows, enhance development teams, and reduce operational costs while maintaining high quality.",
    "By leveraging AI technologies, we empower businesses to automate development processes, improve decision-making, and foster continuous growth. With Soft Suave, your company gains the strategic edge needed to succeed in the competitive software development landscape.",
  ],
  // No button here (review: "no need for a contact button in this section");
  // the closing "Talk To Us" band carries the page's consultation CTA.
  // Stands in for the live page's team illustration (gcc-second-section.webp),
  // which sits beside the "Why Choose" copy there; the card grid that section
  // renders as here carries no image.
  image: overviewImage("global-capability-center"),
};

/**
 * "Why Choose Soft Suave for GCC?" — two paragraphs over three cards. The card
 * grid's intro is a single string, so the two live paragraphs run as one here,
 * word for word.
 */
export const gccWhyUs: CardGridContent = {
  eyebrow: "Why Soft Suave",
  title: "Why Choose Soft Suave for GCC?",
  body: "Soft Suave distinguishes itself through an agile approach to software development, enabling rapid delivery and adaptability to evolving business needs. We provide highly skilled AI and software developers with expertise in Web, Mobile, Software, and AI solutions. Our dedicated teams are meticulously aligned with your business requirements, ensuring seamless integration and driving productivity and operational efficiency.",
  items: [
    {
      name: "Process Re-engineering (For Local Integration)",
      body: "Implement technologies that streamline processes to comply with local legal and statutory requirements efficiently.",
    },
    {
      name: "End-to-End GCC (Comprehensive Services)",
      body: "From talent acquisition and training to infrastructure setup and ongoing operations, we ensure seamless delivery at every stage.",
    },
    {
      name: "Agility (Recognized for faster turnaround)",
      body: "Our experienced team understands the market, collaborates flexibly with clients, and adapts plans in real-time as needed.",
    },
  ],
};

export const gccServices: ServicesContent = {
  eyebrow: "What We Handle",
  title: "Simplify Your Development with Our Expertise",
  body: "We streamline the establishment and management of your GCC in India, offering a complete suite of services tailored to promote your business.",
  items: [
    {
      name: "Legal Establishment & Regulatory Compliance",
      body: "From company registration to ensuring compliance with financial, tax, and statutory regulations, we manage all legal aspects to guarantee a smooth and efficient setup process.",
    },
    {
      name: "Setup and Management of Infrastructure",
      body: "With cutting-edge technology and tools, we ensure your GCC is equipped for seamless operations by assisting in the setup of advanced IT infrastructure.",
    },
    {
      name: "Staffing and Talent Strategy",
      body: "Tap into our recruitment expertise to secure top-tier leadership and skilled professionals who perfectly align with your organization’s culture and goals.",
    },
    {
      name: "Operations Excellence",
      body: "To ensure the smooth operation of your GCC, we handle ongoing activities such as employee value propositions (EVP), employer branding, onsite support, and workspace management.",
    },
    {
      name: "Process Automation & Optimization",
      body: "We implement automation tools to streamline processes and enhance operational efficiency, offering access to a knowledge base and real-time monitoring tools.",
    },
  ],
};

export const gccBenefits: CardGridContent = {
  eyebrow: "Benefits",
  title: "Benefits of GCC",
  body: "GCCs provide businesses with numerous benefits, from centralized operations to streamlined processes globally.",
  items: [
    {
      name: "Improve Financial Flexibility",
      icon: "coins",
      imageId: "gcc-benefit-1",
      body: "Reduce fixed costs and free up capital to invest in other key strategic initiatives.",
    },
    {
      name: "Customized Resources",
      icon: "users",
      imageId: "gcc-benefit-2",
      body: "Adapt resources to meet emerging business needs, ensuring alignment with the company’s strategic objectives.",
    },
    {
      name: "Accelerated Time-to-Market",
      icon: "gauge",
      imageId: "gcc-benefit-3",
      body: "Facilitate faster team deployment and solution delivery, speeding up project initiation and completion.",
    },
  ],
};

/** The live page's six audience tabs: the tab label is the card name, its panel the body. */
export const gccAudience: CardGridContent = {
  eyebrow: "Who It Fits",
  title: "Who Should Consider GCC-as-a-Service?",
  body: "GCC-as-a-Service is perfect for different organizations seeking to streamline their global operations, enhance collaboration, and improve efficiency. Here’s a general overview of who could use this service.",
  items: [
    {
      name: "Multinational Corporations (MNCs)",
      body: "GCC-as-a-Service centralizes functions like finance, IT, R&D, and HR, driving innovation and reducing costs for MNCs.",
    },
    {
      name: "Startups & Mid-Sized Businesses",
      body: "GCC helps startups and SMBs scale efficiently, saving capital and offering flexibility and cost savings.",
    },
    {
      name: "Technology Companies",
      body: "Tech firms leverage India’s talent pool for R&D, software development, and IT support, accelerating growth.",
    },
    {
      name: "Financial & Banking Sector",
      body: "GCCs streamline operations, enhance compliance, and optimize data analytics, ensuring cost-effective, secure solutions.",
    },
    {
      name: "Healthcare & Life Sciences",
      body: "Healthcare companies use GCCs for research, clinical trials, and data management with top talent.",
    },
    {
      name: "Retail & E-commerce",
      body: "GCCs streamline customer support, logistics, supply chain, and analytics, improving customer experience and reducing costs.",
    },
  ],
};

/**
 * The live page's closing consultation band, as the mid-page CTA band every
 * other page runs — copy on the left, the button on the right (review: "update
 * the CTA design like in other pages; button must be in the right corner and
 * not at the bottom").
 */
export const gccClosingCta: CtaBandContent = {
  eyebrow: "Talk To Us",
  title: "Transform Your Business with our GCC-as-a-Service",
  body: "Collaborate with us and experience seamless scalability and reduced operational costs with our tailored GCC-as-a-Service solutions.",
  // The live band's "Request a Consultation" button; /contact, as the reviews
  // ask of every consultation CTA.
  cta: { label: "Request a Consultation", href: "/contact" },
};
