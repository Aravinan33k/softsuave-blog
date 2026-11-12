import type { HeroContent } from '@/components/generative-ai/hero';
import type { FaqContent } from '@/components/generative-ai/faq';
import type { TechStackContent } from '@/components/landing/tech-stack';
import { heroForm } from '@/lib/home/hire-roles/shared';
import type { Piece } from '@/lib/home/construction-time-tracking-content';

/**
 * /education-app-development-company — softsuave.com's education app development page, word for word: the
 * banner with its quote form, the overview and its video, the benefits for users and owners, the four
 * education offerings, the technologies, the FAQs and the closing "Book Free Consultation" band.
 * Images are under /images/education-app.
 */

export const eduMeta = {
  path: '/education-app-development-company',
  shortTitle: 'Education App Development Company',
  title: 'Education App Development Company in India - Soft Suave',
  description:
    'Education app development company in India creating secure, interactive, and scalable e-learning apps tailored for schools, colleges, and EdTech.',
} as const;

const IMG = '/images/education-app';
/** Marks the engagement-model page already carries. */
const SHARED = '/images/engagement-model/tech';

export const eduHero: HeroContent = {
  titleLines: ['Education App Development Company in India'],
  accent: 'Education',
  titleScale: 'home',
  body: ['Soft Suave delivers interactive learning experience with top-notch Education app development solutions.'],
  points: [
    'Hire 5+ years experienced App Developers.',
    'Cost-Effective Development Solution on.',
    '100% Confidentiality on NDA.',
    'Dedicated resource with on-time delivery.',
  ],
  features: [
    { icon: `${IMG}/graduation.svg`, label: 'School & Educational App Design' },
    { icon: `${IMG}/smartphone.svg`, label: 'Education Mobility Solutions' },
    { icon: `${IMG}/ebook.svg`, label: 'School Management Solutions' },
  ],
  background: { src: `${IMG}/hero.webp` },
  form: {
    ...heroForm({
      title: "Let's Discuss Your Project",
      requirementLabel: 'How Can We Help (Requirement)',
      requirementPlaceholder: 'How Can We Help(Requirement)',
      subject: 'Education app development enquiry',
      noEyebrow: true,
    }),
    body: 'Get free rough quote in 24 hrs',
  },
};

export const eduIntro = {
  title: 'Redefining your App Idea into the Next Level Educational App',
  accent: 'Next Level Educational App',
  body: [
    'Get premium ',
    { b: 'Education App Development ' },
    'with scalable architecture and flawless experience.',
  ] as readonly Piece[],
  paragraphs: [
    [
      'Developing an education app has become as important as sending kids to school for learning and gaining knowledge. Soft Suave understands this importance and applies the power of app building expertise into education services to bring the unique outcome and increase the interactive learning models for any age group. The standard of ',
      { b: 'education app development in India' },
      ' & USA is rapidly increasing day by day with the amount of demand by the education institutions for it.',
    ],
    ['The team at Soft Suave has all the expertise in providing smart and interactive education app development solutions for learning and imparting education into anyone, anywhere on any device.'],
    ['With the increasing popularity of online education and eLearning, every company is wanting to develop an education app. Soft Suave helps you bring your dream and idea of mobile app development into reality. Your custom requirements and features will be integrated along with the best technology into your app to give you the taste of success in the education industry.'],
  ] as readonly (readonly Piece[])[],
  video: { src: `${IMG}/education.webm`, label: 'Education App Development Company Soft Suave' },
} as const;

export const eduBenefits = {
  title: 'Benefits Of Developing Educational Apps',
  accent: 'Benefits',
  body: [
    'Get premium ',
    { b: 'Education App Development ' },
    'with scalable architecture and flawless experience.',
  ] as readonly Piece[],
  columns: [
    {
      title: 'Benefits for the Users',
      accent: 'Users',
      items: [
        { lead: 'Opportunity to study at any time:', text: ' Education applications allows the students to learn from anywhere and anytime with just internet connectivity.' },
        { lead: 'Improvement of professional skills:', text: ' Education apps guide students to upgrade their professional skills with the help of many soft skill subjects.' },
        { lead: 'Receive rapid feedbacks from teachers:', text: ' Education application facilitate teachers to share instant feedbacks that will motivate kids to progress.' },
        { lead: 'Possibility to study entertainingly:', text: ' Education applications are the most entertaining way for kids or adults to take up education.' },
        { lead: 'Unlimited access to training materials:', text: ' Study and training materials found in education apps offer unlimited access, and kids can learn any number of time.' },
      ],
    },
    {
      title: 'Benefits for the Owner',
      accent: 'Owner',
      items: [
        { lead: 'Reinforcement of the brand:', text: ' Deploying an Education app not only strengthens the brand value but also increases it largely.' },
        { lead: 'Increase in exposure across mobile devices:', text: ' The exposure of your brand and app across the mobile devices is humongous.' },
        { lead: 'Connection with many people:', text: ' The customer engagement will see a positive spike if the Education app is deployed rightly. It creates deep& closeconnectionswith the customers.' },
        { lead: 'Opportunity to build relations:', text: ' Close connections build relationships, and Education apps from Soft Suave are developed to create close engagement with the users.' },
        { lead: 'Enhancement of social networking strategies:', text: ' Applications from Soft Suave are built to help app owners enhancesecure and robust social networking.' },
      ],
    },
  ],
} as const;

/** The four offerings band, drawn as the site's card grid (its button is the grid's own). */
export const eduExperience = {
  title: 'Enabling Educators to Enhance Students’ Experience with Technology',
  body: 'An exceptional platform to develop Educational applications.',
  cta: { label: 'TALK TO EXPERTS', href: '/contact' },
  items: [
    { name: 'Elearning Apps', icon: `${IMG}/ean-1.png`, width: 54, height: 57, alt: 'Elearning apps development company Soft Suave', body: 'Soft Suave develops attractive yet informational eLearning apps that fit well with the modern way of learning.' },
    { name: 'Mobile App for Schools', icon: `${IMG}/ean-2.png`, width: 64, height: 61, alt: 'mobile app for schools', body: 'Apps for educational institutions are a winner for Soft Suave as it elevates the quality of education through innovation.' },
    { name: 'Apps for Educational Institutions', icon: `${IMG}/ean-3.png`, width: 43, height: 61, alt: 'app for educational institutions development company soft suave', body: 'Delivering projects on-time & on-budget is our strength.' },
    { name: 'Games, Puzzles, Quizzes', icon: `${IMG}/ean-4.png`, width: 56, height: 60, alt: 'games,puzzles,quizzes development company softsuave', body: 'Education in the form of games, puzzles, and quizzes are the most significant advantage for parents to induce their kids into learning.' },
  ],
} as const;

/** The live page's three tabs, in its order and with its labels. */
export const eduTech: TechStackContent = {
  eyebrow: '',
  wideHead: true,
  title: 'Technologies & Tools We Use',
  body: 'Blend of modern tools & Technologies to build next-generation educational apps solution.',
  groups: [
    { name: 'Web', items: ['Java', 'Kotlin', 'Swift', 'OBJ-C', 'React'] },
    { name: 'Mobile', items: ['Angular', 'React', 'Vue Js', 'Backbone', 'HTML', 'CSS', 'Node Js', 'Metero', 'PHP', 'Go'] },
    { name: 'Database', items: ['MongoDB', 'MySQL', 'PostgreSQL', 'DynamoDB'] },
  ],
  images: {
    Java: `${SHARED}/java.webp`,
    Kotlin: `${IMG}/tech/kotlinlang-icon.svg`,
    Swift: `${SHARED}/swift.webp`,
    'OBJ-C': `${IMG}/tech/objective-logo.svg`,
    React: `${SHARED}/react.webp`,
    Angular: `${SHARED}/angular.webp`,
    'Vue Js': `${SHARED}/vue-9-1.webp`,
    Backbone: `${IMG}/tech/backbone.svg`,
    HTML: `${SHARED}/html-5.webp`,
    CSS: `${IMG}/tech/css3.svg`,
    'Node Js': `${SHARED}/node.webp`,
    Metero: `${IMG}/tech/meteor.webp`,
    PHP: `${SHARED}/php.webp`,
    Go: `${IMG}/tech/go.webp`,
    MongoDB: `${IMG}/tech/mongodb.svg`,
    MySQL: `${IMG}/tech/mysql-icon.svg`,
    PostgreSQL: `${IMG}/tech/postgresql-icon.svg`,
    DynamoDB: `${IMG}/tech/dynamo.svg`,
  },
};

export const eduFaqs: FaqContent = {
  eyebrow: '',
  title: 'Frequently Asked Questions',
  body: 'Know more about our processes and how we work, with the help of the following FAQs.',
  items: [
    { q: 'What are the features an Educational apps should have?', a: 'An Education application must have virtual classrooms, online admission, assessment, and report dashboard, and, more importantly, study materials.' },
    { q: 'How long does it take to develop an Education apps?', a: 'On average, Soft Suave takes six weeks to develop an attractive and interactive eLearning app. However, your requirements in technology and features will play a vital part.' },
    { q: 'How much does it cost to develop an Educational apps?', a: 'Soft Suave has experience in building educational apps for SMBs and start-ups at an affordable cost. Nevertheless, your customization will increase the price drastically.' },
    { q: 'Why choose soft suave for Education app development?', a: 'The experience and expertise of developers in Soft Suave assures a successful yet attractive eLearning app. Not to compromise on quality makes Soft Suave the preferable company for education app development.' },
    { q: 'How do you develop an educational app?', a: 'We follow the agile development process. We also have a transparent development process which allows our clients to get involved in all the development process.' },
  ],
};
