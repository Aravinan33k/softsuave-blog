/**
 * Copy for the /free-cost-estimation page — softsuave.com's page, word for word.
 *
 * It is a two-tile chooser: an H1 ("Get an Estimate of your Project") over two linked tiles, "Hire Developers"
 * → /developer-estimation and "Development" → /mobile-app-estimation. Both targets are the step-by-step
 * estimate wizards, which are ported in this app. Nothing else is on the live page, so nothing else is here.
 */

import { estImg } from './developer-estimation-content';

export const estimateMeta = {
  slug: 'free-cost-estimation',
  path: '/free-cost-estimation',
  /* The live `<title>` verbatim — it is not suffixed with the brand. */
  title: 'Free Web & Mobile App Development Cost Estimation',
  shortTitle: 'Free Cost Estimation',
  description:
    'Get a free app development estimate for building web and mobile apps. Soft Suave helps you to develop your idea at an affordable price.',
} as const;

export const estimateChooser = {
  title: 'Get an Estimate of your Project',
  /** The words of the title the page picks out in the brand orange. */
  accent: 'of your Project',
  options: [
    { label: 'Hire Developers', href: '/developer-estimation', icon: estImg('hire-dev.svg') },
    { label: 'Development', href: '/mobile-app-estimation', icon: estImg('mobile-dev.svg') },
  ],
} as const;
