/**
 * /mobile-app-estimation — softsuave.com's "Web & Mobile Development" estimate wizard, word for word
 * (platform → technology → project type → project details → summary → contact).
 *
 * Images come from /images/developer-estimation (shared with /developer-estimation) and, for logos the repo
 * already has, /images/engagement-model/tech — no second copy of a logo is added here.
 */

import { estImg } from './developer-estimation-content';

export const mobileEstimationMeta = {
  path: '/mobile-app-estimation',
  shortTitle: 'Mobile App Estimation',
  title: 'Get Free Mobile App Development Cost Estimation | Soft Suave',
  description:
    'Get a free mobile app development estimate for mobile app development projects. Soft Suave helps you to develop your idea at an affordable price.',
} as const;

const LOGO = '/images/engagement-model/tech';

export type PlatformKey = 'web' | 'native' | 'hybrid';

export const mobileIntro = {
  title: 'Web & Mobile Development',
  question: 'What type of App do you need for your business?',
} as const;

export const mobilePlatforms = [
  { key: 'web', value: 'web', label: 'Web', icon: estImg('web-dev.svg') },
  { key: 'native', value: 'Native', label: 'Mobile Native', icon: estImg('mobile.svg') },
  { key: 'hybrid', value: 'Hybrid', label: 'Hybrid', icon: estImg('hybrid.svg') },
] as const;

export interface MobileTech {
  readonly value: string;
  readonly label: string;
  readonly icon: string;
  readonly preview: { readonly label: string; readonly icon: string };
}

export const mobileNative = {
  heading: 'Native Development',
  summaryLabel: 'Native :',
  techs: [
    { value: 'Android', label: 'Android', icon: `${LOGO}/android.webp`, preview: { label: 'Android', icon: `${LOGO}/android.webp` } },
    { value: 'Ios', label: 'Apple', icon: `${LOGO}/apple.webp`, preview: { label: 'iOS', icon: `${LOGO}/apple.webp` } },
  ],
} as const satisfies { heading: string; summaryLabel: string; techs: readonly MobileTech[] };

export const mobileHybrid = {
  heading: 'Hybrid',
  summaryLabel: 'Hybrid :',
  techs: [
    { value: 'Ionic', label: 'Ionic', icon: estImg('ionic-large.svg'), preview: { label: 'Ionic', icon: estImg('ionic-small.svg') } },
    { value: 'Flutter', label: 'Flutter', icon: `${LOGO}/flutter.webp`, preview: { label: 'Flutter', icon: `${LOGO}/flutter.webp` } },
    {
      value: 'React native',
      label: 'React Native',
      icon: `${LOGO}/react-native.webp`,
      preview: { label: 'React Native', icon: `${LOGO}/react-native.webp` },
    },
    { value: 'Xamarin', label: 'Xamarin', icon: estImg('xamarin-large.svg'), preview: { label: 'Xamarin', icon: estImg('xamarin-small.svg') } },
  ],
} as const satisfies { heading: string; summaryLabel: string; techs: readonly MobileTech[] };

export const mobileProject = {
  title: 'What type of project do have for us?',
  options: [
    { value: 'New', label: 'New Project', icon: estImg('test-est__web__new.svg'), preview: { label: 'New', icon: estImg('fullstack-small.svg') } },
    {
      value: 'Existing',
      label: 'Existing Project',
      icon: estImg('test-est__web__existing.svg'),
      preview: { label: 'Existing', icon: estImg('backend-small.svg') },
    },
  ],
} as const;

export const mobileDetails = {
  newTitle: 'Development Notes',
  existingTitle: 'Existing Project',
  completionPrefix: 'The percentage of project completed is',
  completionSuffix: '%',
  percents: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
  existingNotes: 'Give us a few details about your existing project',
} as const;

export const mobileSummary = {
  title: 'Your Requirement',
  cardMobile: { title: 'Mobile Development', icon: estImg('mobile-preview.svg') },
  cardWebMobile: { title: 'Web and Mobile Development' },
  developmentLabel: 'Development :',
  development: {
    web: { label: 'Web', icon: estImg('web-dev-small.svg') },
    native: { label: 'Native', icon: estImg('mobile-small.svg') },
    hybrid: { label: 'Hybrid', icon: estImg('hybrid-small.svg') },
  },
  projectTypeLabel: 'Project Type :',
  newNotesLabel: 'New Project Details :',
  existingNotesLabel: 'Existing Project Details :',
  completionLabel: 'Project Completion :',
} as const;

export const mobileCrumbs = {
  estimation: { label: 'Estimation', icon: estImg('mobile-small.svg') },
  mobile: { label: 'Web & Mobile Development', icon: estImg('mobile-small.svg') },
  native: { label: 'Native', icon: estImg('mobile-small.svg') },
  hybrid: { label: 'Hybrid', icon: estImg('hybrid-small.svg') },
  nativeHybrid: { label: 'Native & Hybrid', icon: estImg('hybrid-small.svg') },
  project: { label: 'Project Type', icon: estImg('hybrid-small.svg') },
  details: { label: 'Project Details', icon: estImg('web-developer-small.svg') },
} as const;

/** "Web" on its own is not an app wizard on the live site: it hands over to its web estimate page, cloned at this path. */
export const mobileWebEstimatePath = '/test-web-est';
