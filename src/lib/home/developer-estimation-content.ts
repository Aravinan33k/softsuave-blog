/**
 * /developer-estimation — softsuave.com's "Get Free Developer Estimation" page,
 * word for word: a step-by-step wizard (developer type → role → technology →
 * experience → evaluation → billing → summary → contact). Images are under
 * /images/developer-estimation and keep the live site's own file names.
 */

export const developerEstimationMeta = {
  path: '/developer-estimation',
  shortTitle: 'Developer Estimation',
  title: 'Get Free Developer Estimation',
  description: 'Get a free app developer estimation for building web and mobile apps.',
} as const;

const IMG = '/images/developer-estimation';
export const estImg = (file: string) => `${IMG}/${file}`;

export type GroupKey = 'backend' | 'frontend' | 'fullstack' | 'android' | 'ios' | 'hybrid';
export type TypeKey = 'web' | 'mobile';

export interface TechOption {
  readonly value: string;
  readonly label: string;
  readonly icon: string;
  /** How the summary names and draws it. */
  readonly preview: { readonly label: string; readonly icon: string };
}

export interface RoleOption {
  readonly key: GroupKey;
  readonly value: string;
  readonly label: string;
  readonly icon: string;
  readonly smallIcon: string;
  readonly crumb: string;
  /** "<this> Technologies :" in the summary. */
  readonly summaryLabel: string;
  /** "<this> Developer" over the technology row. */
  readonly heading: string;
  readonly techs: readonly TechOption[];
}

/**
 * Technologies whose logo is already in the repo (the /engagement-model page's, under /images/engagement-model/tech)
 * are drawn from that file instead of a second copy of the artwork. Keyed by the live page's tile image.
 */
const SHARED = '/images/engagement-model/tech';
const SHARED_LOGO: Readonly<Record<string, string>> = {
  'node-large.svg': 'node.webp',
  'php-large.svg': 'php.webp',
  'java1-large.svg': 'java.webp',
  'java-large.svg': 'java.webp',
  'python-large.svg': 'python.webp',
  'angularjs-large.svg': 'angular.webp',
  'angular-large.svg': 'angular.webp',
  'reactnative-large.svg': 'react.webp',
  'vuejs-large.svg': 'vue-9-1.webp',
  'laravel-large.svg': 'laravel.webp',
  'swift-large.svg': 'swift.webp',
  'flutter-large.svg': 'flutter.webp',
};

const t = (value: string, label: string, icon: string, previewLabel: string, previewIcon: string): TechOption => {
  // React Native has its own file; the live page draws it with the React atom.
  const shared = value === 'React Native' ? 'react-native.webp' : SHARED_LOGO[icon];
  const src = shared ? `${SHARED}/${shared}` : undefined;
  return {
    value,
    label,
    icon: src ?? estImg(icon),
    preview: { label: previewLabel, icon: src ?? estImg(previewIcon) },
  };
};

export const estimationIntro = {
  title: 'Hire Developer',
  question: 'What type of developer do you need for your business?',
} as const;

export const estimationTypes = [
  { key: 'web', value: 'Web Developer', label: 'Web Developer', icon: estImg('web.svg') },
  { key: 'mobile', value: 'Mobile Developer', label: 'Mobile Developer', icon: estImg('mobile.svg') },
] as const;

const WEB_ROLES: readonly RoleOption[] = [
  {
    key: 'backend',
    value: 'Backend',
    label: 'Backend',
    icon: estImg('backend.svg'),
    smallIcon: estImg('backend-small.svg'),
    crumb: 'Backend',
    summaryLabel: 'Backend Technologies :',
    heading: 'Backend Developer',
    techs: [
      t('Nodejs', 'NodeJS', 'node-large.svg', 'Node Js', 'node-small.svg'),
      t('Php', 'Php', 'php-large.svg', 'Php', 'php-small.svg'),
      t('Java', 'Java', 'java1-large.svg', 'Java', 'java-small.svg'),
      t('Python', 'Python', 'python-large.svg', 'Python', 'python-small.svg'),
      t('Others', 'Others', 'others-large.svg', 'Others', 'others-small.svg'),
    ],
  },
  {
    key: 'frontend',
    value: 'Frontend',
    label: 'Frontend',
    icon: estImg('frontend.svg'),
    smallIcon: estImg('frontend-small.svg'),
    crumb: 'Frontend',
    summaryLabel: 'Frontend Technologies :',
    heading: 'Frontend Developer',
    techs: [
      t('Angularjs', 'AngularJS', 'angularjs-large.svg', 'AngularJS', 'angularjs-small.svg'),
      t('Reactjs', 'ReactJS', 'reactnative-large.svg', 'ReactJS', 'react-small.svg'),
      t('Vuejs', 'VueJS', 'vuejs-large.svg', 'VueJS', 'vuejs-small.svg'),
      t('Others', 'Others', 'others-large.svg', 'Others', 'others-small.svg'),
    ],
  },
  {
    key: 'fullstack',
    value: 'Fullstack',
    label: 'Full Stack',
    icon: estImg('fullstack.svg'),
    smallIcon: estImg('fullstack-small.svg'),
    crumb: 'Fullstack',
    summaryLabel: 'Fullstack Technologies :',
    heading: 'Fullstack Developer',
    techs: [
      t('Angular', 'Angular', 'angular-large.svg', 'Angular', 'angular-small.svg'),
      t('Nodejs', 'NodeJS', 'node-large.svg', 'NodeJS', 'node-small.svg'),
      t('Reactjs', 'ReactJS', 'reactnative-large.svg', 'ReactJS', 'react-small.svg'),
      t('Vuejs', 'VueJS', 'vuejs-large.svg', 'VueJS', 'vuejs-small.svg'),
      t('Laravel', 'Laravel', 'laravel-large.svg', 'Laravel', 'laravel-small.svg'),
      t('Php', 'Php', 'php-large.svg', 'Php', 'php-small.svg'),
      t('Symfony', 'Symfony', 'symfony-large.svg', 'Symfony', 'symfony-small.svg'),
      t('Spring', 'Spring', 'spring-large.svg', 'Spring', 'spring-small.svg'),
      t('Django', 'Django', 'django-large.svg', 'Django', 'django-small.svg'),
      t('Flask', 'Flask', 'flask-large.svg', 'Flask', 'flask-small.svg'),
      t('Ruby on rails', 'Ruby On Rails', 'ruby-large.svg', 'Ruby On Rails', 'ruby-small.svg'),
      t('Java', 'Java', 'java1-large.svg', 'Java', 'java-small.svg'),
      t('Others', 'Others', 'others-large.svg', 'Others', 'others-small.svg'),
    ],
  },
];

const MOBILE_ROLES: readonly RoleOption[] = [
  {
    key: 'android',
    value: 'Android',
    label: 'Android',
    icon: `${SHARED}/android.webp`,
    smallIcon: `${SHARED}/android.webp`,
    crumb: 'Android',
    summaryLabel: 'Android Technologies :',
    heading: 'Android Developer',
    techs: [
      t('Java-Xml', 'Java and Xml', 'java-large.svg', 'Java and Xml', 'java-xml-small.svg'),
      t('Kotlin-Xml', 'Kotlin and Xml', 'kotlin-large.svg', 'Kotlin and Xml', 'kotlin-small.svg'),
    ],
  },
  {
    key: 'ios',
    value: 'Ios',
    label: 'Apple',
    icon: `${SHARED}/apple.webp`,
    smallIcon: `${SHARED}/apple.webp`,
    crumb: 'iOS',
    summaryLabel: 'iOS Technologies :',
    heading: 'iOS Developer',
    techs: [
      t('Swift', 'Swift', 'swift-large.svg', 'Swift', 'swift-small.svg'),
      t('Objective-C', 'Objective C', 'c-large.svg', 'Objective C', 'c-small.svg'),
    ],
  },
  {
    key: 'hybrid',
    value: 'Hybrid',
    label: 'Hybrid',
    icon: estImg('hybrid.svg'),
    smallIcon: estImg('hybrid-small.svg'),
    crumb: 'Hybrid',
    summaryLabel: 'Hybrid Technologies :',
    heading: 'Hybrid Developer',
    techs: [
      t('Ionic', 'Ionic', 'ionic-large.svg', 'Ionic', 'ionic-small.svg'),
      t('Flutter', 'Flutter', 'flutter-large.svg', 'Flutter', 'flutter-small.svg'),
      t('React Native', 'React Native', 'reactnative-large.svg', 'React Native', 'react-small.svg'),
      t('Xamarin', 'Xamarin', 'xamarin-large.svg', 'Xamarin', 'xamarin-small.svg'),
    ],
  },
];

export const estimationRoles = { web: WEB_ROLES, mobile: MOBILE_ROLES } as const;
export const estimationRoleHeading = { web: 'Web Developer', mobile: 'Mobile Developer' } as const;

/** The order the live page stacks technology rows in when several are open. */
export const estimationTechOrder: readonly GroupKey[] = ['android', 'hybrid', 'ios', 'backend', 'frontend', 'fullstack'];

export const estimationCrumbs = {
  estimation: { label: 'Estimation', icon: estImg('developer-small.svg') },
  developer: { label: 'Developer', icon: estImg('developer-small.svg') },
  web: { label: 'Web Developer', icon: estImg('web-developer-small.svg') },
  mobile: { label: 'Mobile Developer', icon: estImg('mobile-small.svg') },
  webMobile: { label: 'Web and Mobile', icon: estImg('web-developer-small.svg') },
  technology: { label: 'Technology', icon: estImg('mobile-small.svg') },
  experience: { label: 'Experience', icon: estImg('experience-small.svg') },
} as const;

export const estimationExperience = {
  title: 'Experience of Developers',
  prompt: 'Choose experience for developer in years',
  years: ['1+', '2+', '3+', '4+', '5+', '6+', '7+', '8+', '9+', '10+'],
} as const;

export const estimationEvaluate = {
  title: 'How do you want to evaluate our developers?',
  options: [
    { value: 'Yes', label: 'Technical Interview', icon: estImg('test-est__technical-interview.svg') },
    { value: '40 hours free trial', label: '40 Hours Free Trial', icon: estImg('test-est__free-trial.svg') },
  ],
} as const;

export const estimationBilling = {
  title: 'Billing Type',
  options: [
    { value: 'Hourly', label: 'Hourly Based', icon: estImg('test-est__hourly.svg') },
    { value: 'Monthly', label: 'Monthy Based', icon: estImg('test-est__month.svg') },
  ],
} as const;

export const estimationSummary = {
  title: 'Your Requirement',
  roleLabel: 'Developer Role :',
  experienceLabel: 'Experience :',
  yearsWord: 'Years',
  interviewLabel: 'Interview :',
  billingLabel: 'Billing Type :',
  cards: {
    web: { title: 'Web Developer', icon: estImg('web-preview.svg') },
    mobile: { title: 'Mobile Developer', icon: estImg('mobile-preview.svg') },
  },
  interview: {
    technical: { label: 'Technical', icon: estImg('technical-preview.svg') },
    trial: { label: 'Free Trial', icon: estImg('free-trail.svg') },
  },
  billing: {
    Hourly: { label: 'Hourly', icon: estImg('hour-preview.svg') },
    Monthly: { label: 'Monthly', icon: estImg('monthly-preview.svg') },
  },
} as const;

export const estimationContact = {
  title: 'Fill the form below to get a FREE Estimation!',
  nameLabel: 'Full name',
  emailLabel: 'E-mail Id',
  phoneLabel: 'Phone No',
  submit: 'Submit',
  image: estImg('form-img.svg'),
} as const;

export const estimationButtons = {
  proceed: 'Proceed',
  quick: { label: 'For quick estimation ->', href: '/free-quote' },
} as const;
