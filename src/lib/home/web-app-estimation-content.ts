/**
 * /test-web-est — softsuave.com's "Web Development" estimate wizard, word for word
 * (project type → project details → summary → contact). It is where "Web" on /mobile-app-estimation leads.
 *
 * The live page's `<title>` really is "Test Est Site"; it is kept as published.
 */

import { estImg } from './developer-estimation-content';

export const webEstimationMeta = {
  path: '/test-web-est',
  shortTitle: 'Web Estimation',
  title: 'Test Est Site',
  description: 'Fill the form below to book a 30 Minute FREE Consultation for your business needs',
} as const;

export const webEstimationProject = {
  title: 'Web Development',
  question: 'What type of project do have for us?',
} as const;

export const webEstimationDetails = {
  newTitle: 'Give us a few details about your new project',
  existingTitle: 'Existing Project Details',
  completionPrefix: 'The percentage of project completed is',
  completionSuffix: '%',
  percents: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
  existingNotes: 'Give us a few details about your existing project',
} as const;

export const webEstimationSummary = {
  title: 'Your Requirement',
  card: { title: 'Web Development', icon: estImg('mobile-preview.svg') },
  projectTypeLabel: 'Project Type :',
  newNotesLabel: 'New Project Details :',
  existingNotesLabel: 'Existing Project Details :',
  completionLabel: 'Project Completion :',
} as const;

export const webEstimationCrumbs = {
  mobile: { label: 'Mobile Development', icon: estImg('developer-small.svg') },
  project: { label: 'Project Type', icon: estImg('developer-small.svg') },
  details: { label: 'Project Details', icon: estImg('web-developer-small.svg') },
} as const;

/** The "Mobile Development" crumb leads back to the mobile estimate wizard. */
export const webEstimationMobilePath = '/mobile-app-estimation';
