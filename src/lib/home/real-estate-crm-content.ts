import type { HeroContent } from '@/components/landing/hero';
import { sharedHeroAlert } from '@/lib/home/delivery-shared';

/**
 * /real-estate-crm-software-development — softsuave.com's "Custom Real Estate CRM Software Development Company"
 * page, word for word: the hero with its quote form, the services copy beside its picture, the eight areas of
 * expertise, the portfolio entry and the closing consultation form (the site's own, which already reads as the live
 * one does). Images are under /images/real-estate-crm. The page names no trial or duration, so there is no figure
 * to correct to 40 hours.
 */

export const reMeta = {
  path: '/real-estate-crm-software-development',
  shortTitle: 'Real Estate CRM Software Development',
  title: 'Custom Real Estate CRM Software Development Company',
  description:
    'Leverage custom real estate CRM software development from soft suave to build interactive CRM that act as bridge between customer and business',
} as const;

const IMG = '/images/real-estate-crm';

export const reHero: HeroContent = {
  titleLines: ['Custom Real Estate CRM Software Development Company'],
  accent: 'Real Estate CRM',
  titleScale: 'home',
  accentGradient: true,
  // The live banner's photo (a model house held in a hand), held still.
  image: { src: `${IMG}/crm-banner-img.webp`, width: 1920, height: 603, alt: '', veil: 'dark', still: true },
  body: ['Bridge the gap between your customers and business with custom real estate CRM software development.'],
  points: [],
  ctas: [{ label: 'GET FREE QUOTE', href: '/free-quote' }],
  form: {
    eyebrow: "Let's Discuss Your Project",
    title: 'Get free rough quote in 24 hrs',
    alert: sharedHeroAlert,
    submit: 'Submit',
    sending: 'Sending...',
    requirementLabel: 'How Can We Help(Requirement)',
    requirementPlaceholder: 'How Can We Help(Requirement)',
    subject: 'Custom Real Estate CRM Software Development Company',
  },
};

/** A paragraph as pieces: plain text, or `{ b }` for the words the live page bolds. */
export type Piece = string | { readonly b: string };

export const reAbout = {
  title: 'Custom Real Estate CRM Software Development Services',
  accent: 'CRM Software Development Services',
  body: 'Uncover the hidden revenue opportunities with our powerful and efficient Real Estate CRM Software.',
  paragraphs: [
    [
      'Soft Suave is the leading ',
      { b: 'Realestate CRM Software Development Company in India' },
      ' that has expanded its industry verticals into Real Estate. The experienced Real Estate Software Development team at Soft Suave augment the new-age technologies to revamp and build versatile CRM softwares for Real Estate companies in the world. Our real estate software development services possess a tech-driven competitive advantage in the market, thus offering 10X business growth at an affordable cost.',
    ],
    [
      'Driven by passion and experience in ',
      { b: 'Real Estate App development' },
      ', Soft Suave concentrates on developing custom-tailored CRM softwares that help commercial and residential real estate startups, and SMBs organize and manage all "sales path" actions from lead to delivery. With Soft Suave, you can bring your most complex real estate software ideas to life. Our first-class App developers help clients transform all type of tech-driven & custom real estate requirements into groundbreaking Real Estate solutions. Moreover, the developers take care of the end-to-end development process for real estate agencies so the agents can turn the hot leads into potential business opportunities.',
    ],
  ] as readonly (readonly Piece[])[],
  image: { src: `${IMG}/crm-app-right-img-1.svg`, width: 560, height: 440, alt: 'Realestate CRM Development Company by Soft Suave' },
} as const;

export const reExpertise = {
  title: 'Real Estate Software Development Expertise',
  accent: 'Software Development Expertise',
  body: "Optimize your business processes and maximize operational efficiency with the help of Soft Suave's CRM software.",
  items: [
    { name: 'Commercial Property Management & Maintenance Software', src: `${IMG}/crm-home.svg` },
    { name: 'Residential Real-time Tenant & Lease Management Solutions', src: `${IMG}/crm-hand.svg` },
    { name: 'Web & Mobile Applications for Real Estate Agents', src: `${IMG}/crm-mob.svg` },
    { name: 'Real Estate Crm & Lead Generation Platforms', src: `${IMG}/crm-spread.svg` },
    { name: 'Real Estate Workflow Solutions', src: `${IMG}/crm-process.svg` },
    { name: 'MLS & IDX Integration', src: `${IMG}/crm-search.svg` },
    { name: '360 Virtual View of a Property or a Building', src: `${IMG}/crm-360.svg` },
    { name: 'Virtual Office Solutions', src: `${IMG}/crm-system.svg` },
  ],
} as const;

export const rePortfolio = {
  title: 'Portfolio',
  body: 'One unified software to monitor customer relationships, manage lead generation, and close deals.',
  name: 'Real Estate CRM Software',
  text: 'A custom CRM application for Real Estate owners to track the progress of their respective properties and allows customers to have a detailed picture of the properties using a 360-degree view. Unified & robust Web, iOS and Desktop Apps to manage real estate properties effortlessly.',
  cta: { label: 'Get Free Quote', href: '/free-quote' },
  image: { src: `${IMG}/crm-ss-bg.webp`, width: 990, height: 656, alt: 'CRM app development soft suave' },
} as const;
