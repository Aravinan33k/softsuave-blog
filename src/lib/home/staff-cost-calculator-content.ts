import type { Testimonial } from './content';

/**
 * /staff-augmentation-cost-calculator — softsuave.com's IT Staff Augmentation Cost Calculator, word for word:
 * a banner, the calculator (project configuration, team configuration, cost summary, "Share Estimation"),
 * then the Our Clients, Industry Recognitions and Testimonials bands.
 *
 * Images are under /images/staff-cost; technology marks are the site's own (components/home/tech-logo.tsx).
 */

export const staffCostMeta = {
  path: '/staff-augmentation-cost-calculator',
  shortTitle: 'Staff Augmentation Cost Calculator',
  title: 'IT Staff Augmentation Cost Calculator – Estimate Developer Costs',
  description:
    'Use our IT Staff Augmentation Cost Calculator to estimate the cost of hiring developers and IT professionals on demand. Plan your budget effectively.',
} as const;

const IMG = '/images/staff-cost';

export const staffCostHero = {
  title: 'Estimate Your Staff Augmentation Cost',
  /** The words of the title the page picks out in the brand orange. */
  accent: 'Staff Augmentation Cost',
  body: 'Make sure to understand the costs before hiring on-demand developers. Get an estimate for your resource needs.',
  image: `${IMG}/calculator-hero.webp`,
} as const;

export const staffCostLabels = {
  project: { title: 'Project Configuration', subtitle: 'Define your development requirements' },
  workingHours: { label: 'Working Hours', value: '8 hours per day' },
  duration: { label: 'Project Duration', units: [{ value: 'weeks', label: 'Weeks' }, { value: 'months', label: 'Months' }] },
  developers: { label: 'No.of.Developer' },
  team: { title: 'Team Configuration', subtitle: 'Define your developer requirements' },
  developer: 'Developer',
  role: { label: 'Role', placeholder: 'Select Role' },
  experience: { label: 'Experience', placeholder: 'Select Experience' },
  technology: { label: 'Technology', placeholder: 'Select Technology' },
  summary: { title: 'Cost Summary', subtitle: 'Define your developer requirements' },
  total: 'Total Project Cost',
  share: 'Share Estimation',
  empty: 'Add developers to see breakdown',
  hourlyRate: 'Hourly Rate',
  dailyCost: 'Daily Cost',
  totalCost: 'Total Cost',
} as const;

/** Hours in a working day, and working days in a week / a month, as the live calculator counts them. */
export const HOURS_PER_DAY = 8;
export const DAYS_PER_UNIT = { weeks: 5, months: 20 } as const;

export const staffCostRoles = [
  { value: 'Front-End Developer', icon: `${IMG}/frontend.webp`, techs: ['React', 'Angular', 'Vue.js', 'Ionic', 'React Native'] },
  { value: 'Back-End Developer', icon: `${IMG}/backend.webp`, techs: ['Node.js', 'Nest.js', 'ROR', 'Laravel', 'Django', '.Net', 'Java', 'Python', 'PHP'] },
  { value: 'Full Stack Developer', icon: `${IMG}/fullstack.webp`, techs: ['MERN', 'MEAN', 'ROR', 'Laravel', 'Django', '.Net'] },
  { value: 'Mobile App Developer', icon: `${IMG}/mobile-app.webp`, techs: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic'] },
  { value: 'AI & ML Engineers', icon: `${IMG}/ai-ml.webp`, techs: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'NumPy', 'OpenCV'] },
  { value: 'DevOps/Cloud Engineer', icon: `${IMG}/devops.webp`, techs: ['Azure', 'AWS', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub'] },
  { value: 'E-Commerce Developer', icon: `${IMG}/ecommerce.webp`, techs: ['Magento', 'Shopify', 'WooCommerce', 'Boardleaf Commerce', 'Node.js', 'Drupal Commerce'] },
] as const;

/** Hourly rate (USD) by experience — the live table gives every role the same three rates. */
export const staffCostExperience = [
  { value: 'Junior', label: 'Junior (0-2 years)', icon: `${IMG}/fresher.webp`, rate: 14 },
  { value: 'Mid-Level', label: 'Mid-Level (2-5 years)', icon: `${IMG}/mid-level.webp`, rate: 20 },
  { value: 'Senior', label: 'Senior (5+ years)', icon: `${IMG}/senior.webp`, rate: 25 },
] as const;

export const staffCostShare = {
  title: 'Share Estimation',
  name: { label: 'Name', placeholder: 'Full Name' },
  email: { label: 'Email', placeholder: 'Email ID' },
  submit: 'Send Estimation',
  sending: 'Sending your estimate PDF...',
  sent: 'Your estimate PDF has been sent to your mail successfully.',
} as const;

export const staffCostClients = {
  eyebrow: 'Our Clients',
  title: 'Preferred Technology Partner for World-Class Enterprises Globally',
  body: 'We use the latest technology and innovation to help enterprises and startups transform digitally, guiding them through product development with unmatched experience and actionable results.',
  more: { label: 'View More Clients', href: '/clients' },
  logos: [
    { name: 'AMD', src: '/brand/clients/amd-telecom.webp' },
    { name: 'Phoenix', src: '/brand/clients/phoenix-technologies.webp' },
    { name: 'PerkyPet', src: '/brand/clients/perkypet.webp' },
    { name: 'JobSpace', src: '/brand/clients/jobspace.webp' },
    { name: 'Outsource', src: '/brand/clients/outsource.webp' },
    { name: 'Utiliko', src: '/brand/clients/utiliko.webp' },
    { name: 'Urmilla', src: '/brand/clients/urmilla-enterprises.webp' },
    { name: 'TNQ', src: '/brand/clients/tnqtech.webp' },
  ],
} as const;

/** The live band's five certificate badges, in its order. */
export const staffCostAwards = {
  eyebrow: 'Awards',
  title: 'Industry Recognitions',
  body: 'Our commitment to innovation and excellence has earned us industry-leading awards and recognition, reinforcing our dedication to delivering top-tier solutions.',
  items: [
    { key: 'top-service-provider', org: '', title: 'Recognized Top Service Provider', year: '', src: `${IMG}/awards/awards-certificate-new-1.svg` },
    { key: 'top-mobile-app', org: '', title: 'Top Mobile App Development Company', year: '', src: `${IMG}/awards/awards-certificate-new-2.svg` },
    { key: 'top-mobile-developers', org: '', title: 'Top Mobile Developers', year: '', src: `${IMG}/awards/awards-certificate-new-3.svg` },
    { key: 'top-it-service', org: '', title: 'Top IT Service Company', year: '', src: `${IMG}/awards/awards_certificate_design_rush_enhanced.svg` },
    { key: 'leading-firm', org: '', title: 'Leading Development Firm', year: '', src: `${IMG}/awards/awards-certificate-new-5.svg` },
  ],
} as const;

/**
 * The live band's five reviews, in its order and wording (the homepage's own `testimonials` carry
 * edited quotes and roles, so this page does not reuse them). Photos are the repo's existing ones.
 */
export const staffCostTestimonials: {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly Testimonial[];
} = {
  eyebrow: 'Testimonials',
  title: 'What Our Clients Say About Us',
  body: "We've empowered hundreds of clients globally to achieve their business goals. Hear firsthand how our expertise and AI-driven solutions have made a difference.",
  items: [
    {
      quote:
        'Soft Suave provides amazing service. I am completely satisfied with the projects and look forward to continuing my relationship. I will also recommend their services without question.',
      name: 'Aaron. G',
      rating: '5.0',
      photo: '/brand/testimonials/aaron-g.webp',
      category: 'Technology',
      videoUrl: 'https://youtu.be/fkjg--dAEY4',
    },
    {
      quote:
        "Soft Suave's commitment to meeting deadlines, flexibility in working hours, and ability to seamlessly integrate with our U.S. team make them a reliable and invaluable technology partner.",
      name: 'Tim Maliyil',
      role: 'Chief Operating Officer - Phoenix Technologies',
      rating: '5.0',
      photo: '/brand/testimonials/tim-maliyil.webp',
      category: 'Technology',
      videoUrl: 'https://www.youtube.com/watch?v=vLCCMWY4S1s',
    },
    {
      quote:
        "Their 40-hour free trial isn't just a marketing promise-it's a genuine opportunity to experience top-notch developer skills. I was beyond impressed with what they delivered during the trial period!",
      name: 'Dara Huang MD',
      role: 'Co-Founder - Perkypet',
      rating: '5.0',
      photo: '/brand/testimonials/dara-huang.webp',
      category: 'Web',
      videoUrl: 'https://www.youtube.com/watch?v=IuQRso68Tso',
    },
    {
      quote:
        'I have been working with Soft Suave for past 3 years and the experience was quite unique. Soft Suave helped us overcome the barriers that we had from software development point of view. Partnering with Soft Suave reduced our costs by 40% and increased our delivery speed by 20%.',
      name: 'Dimitris Rokos',
      role: 'Founder, CEO - AMD telecom',
      rating: '5.0',
      photo: '/brand/testimonials/dimitris-rokos.webp',
      category: 'Technology',
      videoUrl: 'https://www.youtube.com/watch?v=G5IBYgvpRxQ',
    },
    {
      quote:
        "I've been asking Soft Suave to help me develop a mobile app. The team is available right from the start. They're nice guys to work with and highly recommend them. Thanks.",
      name: 'Roland White',
      rating: '5.0',
      photo: '/brand/testimonials/roland-white.webp',
      category: 'Mobile',
      videoUrl: 'https://youtu.be/_YRv-r2q6xY',
    },
  ],
};
