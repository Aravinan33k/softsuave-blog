import type { HeroContent } from '@/components/landing/hero';
import type { CtaBandContent } from '@/components/landing/cta-band';
import { heroForm } from '@/lib/home/hire-roles/shared';
import { sharedHeroBadges } from '@/lib/home/delivery-shared';
import { staffFaqs, staffIndustries, staffWhyUs } from '@/lib/home/staff-augmentation-content';

/**
 * /generative-ai-integration-service — softsuave.com's "Generative AI Integration Services" page, word for
 * word. It is the live IT staff augmentation page with its own hero, its own "services we offer" block and a
 * call-to-action band, so every other section (process, roles, why choose us, models, technologies,
 * industries, the comparison, the testimonials and the FAQs) is rendered from the staff augmentation
 * content, which carries the same copy. Icons are under /images/genai-integration.
 */

export const genaiMeta = {
  path: '/generative-ai-integration-service',
  shortTitle: 'Generative AI Integration Services',
  title: 'Generative AI Integration Services: From Pilot to Production',
  description:
    'Transform your operations with Soft Suave’s expert generative AI integration services, designed to streamline workflows & elevate business to the next level.',
} as const;

const IMG = '/images/genai-integration';

export const genaiHero: HeroContent = {
  titleLines: ['Generative AI Integration Services'],
  accent: 'Generative AI',
  titleScale: 'home',
  body: [
    'Unlock business impact with production-grade generative AI integration services that connect your data, tools, and teams into secure, automated, intelligent workflows tailored to your enterprise, from first pilot to large-scale rollout.',
    'Launch your first GenAI integration with Soft Suave - Book your strategy call.',
  ],
  // The strategy-call line is bold on the live page.
  boldBody: [1],
  points: [],
  badges: sharedHeroBadges,
  form: {
    ...heroForm({
      title: "Let's Discuss Your Project",
      requirementLabel: 'How Can We Help (Requirement)',
      requirementPlaceholder: 'How Can We Help(Requirement)',
      subject: 'Generative AI integration services enquiry',
      noEyebrow: true,
    }),
    body: 'Get free rough quote in 24 hrs',
  },
};

/** "Generative AI Integration Services We Offer": the seven cards, each with its live icon. */
export const genaiServices = {
  eyebrow: 'Services',
  title: 'Generative AI Integration Services We Offer',
  body: 'Transform disorganized AI experiments into effective, governed workflows that accelerate production. Utilize our integration services tailored to your existing tools, data stack, and compliance requirements.',
  cta: { label: 'Talk to Our Experts →', href: '/free-quote' },
  items: [
    {
      name: 'GenAI Readiness & Integration Consulting',
      body: 'Assess data, systems, and use cases, then design a practical GenAI roadmap, governance, and integration strategy aligned with your business priorities.',
      icon: `${IMG}/GAISI1.svg`,
    },
    {
      name: 'Native Android & iOS App Development',
      body: 'Dedicated teams for native Android (Kotlin/Java) and iOS (Swift) apps, delivering optimal performance, complex UX, and full device integration.',
      icon: `${IMG}/MASI2.svg`,
    },
    {
      name: 'Cross-Platform & Hybrid App Development',
      body: 'Build once, deploy everywhere. We use Flutter, React Native, Ionic, and Xamarin to deliver budget-friendly, fast, cross-platform apps.',
      icon: `${IMG}/MASI3.svg`,
    },
    {
      name: 'UI/UX Design for Mobile Apps',
      body: 'Crafting user-centric wireframes, prototypes, and visual designs that drive conversions and ensure accessibility and seamless experiences across all devices.',
      icon: `${IMG}/MASI4.svg`,
    },
    {
      name: 'Mobile App Modernization & Migration',
      body: 'Upgrade legacy apps, tune performance, and migrate across stacks, whether from hybrid to native or optimizing OS/SDK versions.',
      icon: `${IMG}/MASI5.svg`,
    },
    {
      name: 'Mobile App Maintenance & Support',
      body: 'Continuous updates, bug fixes, OS compatibility, feature enhancements, and SLA-based support for long-term app success and reliability.',
      icon: `${IMG}/MASI6.svg`,
    },
    {
      name: 'Mobile App QA & Testing Services',
      body: 'Thorough functional, performance, security, and regression testing across devices and OS versions, using manual and automated methods for flawless app quality.',
      icon: `${IMG}/MASI7.svg`,
    },
  ],
} as const;

/** "Excited to Unleash the Power of AI in Your Projects?" */
export const genaiCta: CtaBandContent = {
  title: 'Excited to Unleash the Power of AI in Your Projects?',
  body: 'Unlock the full potential of AI for your SaaS, enterprise, or fast-growing business with our expert team. We turn your vision into scalable, high-impact solutions. Book a Free Consultation today or Get a Rough Quote in 24 Hours!',
  cta: { label: 'Hire AI Developers', href: '/hire-dedicated-developers' },
};

/** The live page's clients heading and standfirst (the homepage band carries other figures). */
export const genaiClients = {
  eyebrow: 'Our Clients',
  title: 'Preferred AI-Enabled Technology Partner for Startups and SMBs',
  body: 'We combine AI-enabled engineering with 13+ years of product development expertise to help clients build scalable AI solutions, automate complex workflows, and integrate systems for measurable business outcomes.',
} as const;

/** The live industries list writes "Retail & E-Commerce". */
export const genaiIndustries = {
  ...staffIndustries,
  items: staffIndustries.items.map((it) => (it.name === 'Retail & E-commerce' ? { ...it, name: 'Retail & E-Commerce' } : it)),
};

const withIcons = <T extends { readonly name: string; readonly body?: string }>(items: readonly T[], icons: Readonly<Record<string, string>>) =>
  items.map((it) => ({ name: it.name, body: it.body ?? '', icon: icons[it.name] }));

export const genaiWhy = {
  eyebrow: staffWhyUs.eyebrow,
  title: staffWhyUs.title,
  body: staffWhyUs.body,
  image: {
    src: `${IMG}/why/approach.webp`,
    width: 1080,
    height: 1080,
    alt: 'An illustration of a man and a woman standing with puzzled expressions, both pondering a question. Above their heads are question marks, symbolizing uncertainty or curiosity. The background includes minimalistic art with a potted plant, indicating a modern, simple design. The image represents a sense of doubt or consideration, potentially relating to the decision-making process, such as why Soft Suave would be the best offshore software development company.',
  },
  items: withIcons(staffWhyUs.items, {
    'Experienced Developers': `${IMG}/why/model_icon_1.svg`,
    'Faster Hiring Process': `${IMG}/why/model_icon_2.svg`,
    'Flexible Engagement Models': `${IMG}/why/model_icon_3.svg`,
    'Cost-Effective Engagement': `${IMG}/why/model_icon_4.svg`,
  }),
};

/**
 * The live page's FAQ list: the six questions, then — as its markup repeats them — "Do I retain full control…",
 * "How much does…", "How fast can I…", "What is the difference…", "What types of roles…" and "Do I retain
 * full control…" again. (Our staff augmentation page's own extra six are not on this live page.)
 */
const LIVE_ORDER = [0, 1, 2, 3, 4, 5, 5, 1, 2, 3, 4, 5] as const;
export const genaiFaqs = {
  ...staffFaqs,
  items: LIVE_ORDER.map((i) => staffFaqs.items[i]),
};
