/**
 * What softsuave.com's "mobile app development company in <location>" pages
 * share, word for word and file for file — so each location's content module
 * (`mobile-app-dubai-content.ts`, `mobile-app-germany-content.ts`) holds only
 * what its live page says differently.
 *
 * Shared, because the live pages share them verbatim:
 *   - the hero enquiry form and the closing "Book Free Consultation" band
 *     (only the lead's internal subject line differs, per location);
 *   - the technology stack's four groups, fifteen tools and their logo alt
 *     text;
 *   - the art: the "who we work for" illustrations, the portfolio
 *     screenshots, the five process illustrations, the five tech logos the
 *     shared `TechLogo` set has no mark for, and the consultant portrait —
 *     downloaded from softsuave.com and re-encoded to WebP under
 *     `public/images/landing/mobile-app-location/`;
 *   - the clients strip: the deployed homepage's 27 logos (requested on the
 *     Dubai page, carried to every location page built from it).
 *
 * Alt text that names a location stays in each page's own module.
 */

import type { HeroContent } from '@/components/generative-ai/hero';
import type { TechStackContent } from '@/components/landing/tech-stack';
import type { TechClusterMarks } from '@/components/data-science/tech-cluster';
import type { ConsultationCloseContent } from '@/components/common/consultation-close';
import { partnerHeroBadges } from '@/lib/home/hero-badges';
import { sharedHeroAlert } from '@/lib/home/delivery-shared';

/** Root-relative folder of the location pages' hand-placed art. */
export const LOCATION_IMG = '/images/landing/mobile-app-location';

/**
 * The clients band's logo strip, as the deployed homepage runs it
 * (http://54.237.230.68/, "Preferred AI-Enabled Technology Partner…"): 27
 * marks in its order, named by its alt text. That roster opens with six marks
 * the shared default does not carry yet — their files, taken from the same
 * deployment, are in `public/brand/clients/` — and leaves out PromosTV. The
 * band's heading and standfirst stay the shared component's own.
 */
export const locationClientLogos = [
  { name: 'Centreax Technologies', src: '/brand/clients/centreax.webp' },
  { name: 'Neuraspeech', src: '/brand/clients/neuraspeech.webp' },
  { name: 'Alytico AI', src: '/brand/clients/alytico-ai.webp' },
  { name: 'Data Evolution', src: '/brand/clients/data-evolution.webp' },
  { name: 'MERLIN', src: '/brand/clients/merlin.webp' },
  { name: 'MT&T', src: '/brand/clients/mt-and-t-yellow.webp' },
  { name: 'Phoenix Technologies', src: '/brand/clients/phoenix-technologies.webp' },
  { name: 'AMD Telecom', src: '/brand/clients/amd-telecom.webp' },
  { name: 'Perkypet', src: '/brand/clients/perkypet.webp' },
  { name: 'Atomise', src: '/brand/clients/atomise.webp' },
  { name: 'CloudBankin', src: '/brand/clients/cloudbankin.webp' },
  { name: 'Enigma', src: '/brand/clients/enigma.webp' },
  { name: 'Waymore', src: '/brand/clients/waymore.webp' },
  { name: "Who's Up", src: '/brand/clients/whos-up.webp' },
  { name: 'Warmpoint', src: '/brand/clients/warmpoint.webp' },
  { name: 'Utiliko', src: '/brand/clients/utiliko.webp' },
  { name: 'TrafficSpy', src: '/brand/clients/trafficspy.webp' },
  { name: 'The 2020 Diet', src: '/brand/clients/the-2020-diet.webp' },
  { name: 'Teamicate', src: '/brand/clients/teamicate.webp' },
  { name: 'Sulekha', src: '/brand/clients/sulekha.webp' },
  { name: 'Poorvika', src: '/brand/clients/poorvika.webp' },
  { name: 'PaceWisdom', src: '/brand/clients/pacewisdom.webp' },
  { name: 'Outsource', src: '/brand/clients/outsource.webp' },
  { name: 'Omri', src: '/brand/clients/omri.webp' },
  { name: 'OfficeSpace', src: '/brand/clients/officespace.webp' },
  { name: 'Oasis Digital', src: '/brand/clients/oasis-digital.webp' },
  { name: 'Netsmartz', src: '/brand/clients/netsmartz.webp' },
];

/** The live hero form's copy; `subject` is the lead's internal subject line. */
export function locationHeroForm(subject: string): HeroContent['form'] {
  return {
    title: "Let's Discuss Your Project",
    body: 'Get free rough quote in 24 hrs',
    submit: 'Submit',
    sending: 'Sending...',
    requirementLabel: 'How Can We Help (Requirement)',
    requirementPlaceholder: 'How Can We Help(Requirement)',
    subject,
    alert: sharedHeroAlert,
  };
}

/** A "who we work for" card's illustration, filling the card's height beside the text. */
export const locationWhoImage = (file: string, alt: string) =>
  ({ src: `${LOCATION_IMG}/${file}`, width: 280, height: 349, alt, fit: 'column' }) as const;

/** A portfolio screenshot, drawn whole in its frame. */
export const locationPortfolioImage = (file: string, alt: string) =>
  ({ src: `${LOCATION_IMG}/${file}`, alt, fit: 'contain' }) as const;

/**
 * The five process illustrations, by step. The pairing is the live pages'
 * own: the Strategy step shows `design.svg` and the Designing step
 * `statergy.svg` (re-encoded here as process-strategy / process-designing).
 */
const PROCESS_ART = {
  consultation: { file: 'process-consultation.webp', width: 900, height: 659 },
  strategy: { file: 'process-strategy.webp', width: 900, height: 576 },
  designing: { file: 'process-designing.webp', width: 900, height: 672 },
  development: { file: 'process-development.webp', width: 900, height: 872 },
  deployment: { file: 'process-deployment.webp', width: 900, height: 900 },
} as const;

export function locationProcessImage(step: keyof typeof PROCESS_ART, alt: string) {
  const art = PROCESS_ART[step];
  return { src: `${LOCATION_IMG}/${art.file}`, width: art.width, height: art.height, alt };
}

/** The live tabs become the clusters; each tool keeps its live label. */
export const locationTechGroups: TechStackContent['groups'] = [
  { name: 'Mobile Front End', items: ['Swift', 'Java', 'Xamarin', 'Cordova', 'Ionic'] },
  { name: 'Platforms', items: ['Aws', 'Azure', 'Google Cloud'] },
  { name: 'Test Automation', items: ['Appium', 'Espresso', 'XC Test'] },
  { name: 'Others', items: ['Google Analytics', 'Flurry Analytics', 'Mixpanel', 'Keen IO'] },
];

/**
 * Every logo keeps its live alt text. The ten tools the shared `TechLogo` set
 * draws keep that mark; the five it has no mark for take the live page's own
 * logo file instead of a generic placeholder.
 */
export const locationTechMarks: TechClusterMarks = {
  Swift: { alt: 'Swift Development Company Soft Suave' },
  Java: { alt: 'Java Development Company Soft Suave' },
  Xamarin: { alt: 'Xamarin Development Company Soft SUave' },
  Cordova: { alt: 'Cordova Development Company Soft Suave' },
  Ionic: { alt: 'Ionic Development Company Soft Suave' },
  Aws: { alt: 'Aws' },
  Azure: { alt: 'Azure' },
  'Google Cloud': { alt: 'GoogleCloud' },
  Appium: { alt: 'Appium' },
  Espresso: { alt: 'Espresso' },
  'XC Test': { src: `${LOCATION_IMG}/tech-xctest.webp`, alt: 'XC Test' },
  'Google Analytics': { src: `${LOCATION_IMG}/tech-google-analytics.webp`, alt: 'Google Analytics' },
  'Flurry Analytics': { src: `${LOCATION_IMG}/tech-flurry.webp`, alt: 'Flurry Analytics' },
  Mixpanel: { src: `${LOCATION_IMG}/tech-mixpanel.webp`, alt: 'Mixpanel' },
  'Keen IO': { src: `${LOCATION_IMG}/tech-keenio.webp`, alt: 'Keen IO' },
};

/** The live badge alt text, over the same issuer art the heroes use. */
const LIVE_BADGE_ALTS = [
  'Upwork Top Rated badge',
  'Clutch verified reviews badge',
  'Microsoft silver partner badge',
  'AWS Partner badge',
] as const;

/** The live closing band; `subject` is the lead's internal subject line. */
export function locationClose(subject: string): ConsultationCloseContent {
  return {
    title: 'Book Free Consultation',
    body: 'Get a 30-minute free consultation from a field expert. Validate your idea for free and get a rough quote once you complete this form.',
    steps: [
      { title: 'Fill up your details', body: 'Get Custom Solutions, Recommendations, Estimates.' },
      { title: "What's next?", body: 'One of our Account Managers will contact you shortly.' },
    ],
    person: {
      image: { src: `${LOCATION_IMG}/madhu-manager.webp`, width: 157, height: 157, alt: 'Soft Suave Manager' },
      name: 'Madhu Kadiyala',
      role: 'Technology Consultant',
    },
    cta: { label: 'Schedule a Call', href: '/30-min-free-consultation' },
    badges: partnerHeroBadges.map((b, i) => ({ ...b, alt: LIVE_BADGE_ALTS[i] })),
    form: {
      // The live closing form has no heading of its own.
      title: '',
      submit: 'Submit',
      sending: 'Sending...',
      requirementLabel: 'Brief about the project',
      requirementPlaceholder: 'Brief about the project',
      subject,
    },
  };
}
