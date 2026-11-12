/**
 * Copy for `/mobile-app-development-company-poland`.
 *
 * Every string is softsuave.com/mobile-app-development-company-poland's own,
 * in its own order — headings, paragraphs, groups, technologies, the CTA, FAQ
 * answers (lists included) and image alt text — carried across without
 * rewording. Oddities kept as published: "companies in Poland ." (space
 * before the full stop), "Graddle", and the technologies section's alt text.
 *
 * NOT the Dubai/Germany/Italy/Maryland template: the live Poland page is a
 * different layout — hero, about, developers' expertise (two groups of four
 * technologies), technologies (three groups), a mid-page CTA, FAQ and the
 * closing consultation; no clients strip, no "who we work for", portfolio or
 * process. So its route composes the shared sections in that order itself,
 * with `common/tech-group-cards` for the two technology sections, and only
 * the parts the location pages share (form, closing band, art folder) come
 * from `mobile-app-location-shared.ts`.
 *
 * Heading levels are the live page's: the expertise technologies are H4s, the
 * CTA title an H3, the FAQ questions H4s.
 *
 * Its FAQPage JSON-LD is kept verbatim (`lib/seo/mobile-app-development-
 * company-poland.ts`). Like the live page, the visible answers are fuller than
 * the schema's in two places: Q1's answer ends on a five-item list the schema
 * leaves out, and Q3's visible answer is a three-item list of which the schema
 * carries only the second item.
 */

import type { HeroContent } from '@/components/generative-ai/hero';
import type { OverviewContent } from '@/components/generative-ai/overview';
import type { FaqContent, FaqAnswerBlock } from '@/components/generative-ai/faq';
import type { CtaBandContent } from '@/components/generative-ai/cta-band';
import type { TechGroupCardsContent } from '@/components/common/tech-group-cards';
import { LOCATION_IMG, locationClose, locationHeroForm } from '@/lib/home/mobile-app-location-shared';

const IMG = LOCATION_IMG;

export const maplMeta = {
  path: '/mobile-app-development-company-poland',
  // The live page's head, verbatim — including its keywords meta.
  title: 'Mobile App Development Services in Poland',
  description:
    "Looking for the Best Mobile App Development Company in Poland? Discover Soft Suave's creative, innovative, and experienced mobile application development services.",
  keywords:
    'Mobile application development, Mobile app development services, Mobile app development USA, Mobile application development company',
  canonical: 'https://www.softsuave.com/mobile-app-development-company-poland',
  ogTitle: 'Mobile App Development Company in Poland',
  ogDescription:
    "Looking for the Best Mobile App Development Company in Poland? Discover Soft Suave's creative, innovative, and experienced mobile application development services.",
  ogSiteName: 'Soft Suave Technologies',
  ogImage: 'https://www.softsuave.com/assets/new-formate/mobile/mobile-development-softsuave.svg',
  twitterSite: '@softsuave',
} as const;

export const maplHero: HeroContent = {
  titleLines: ['Best Mobile App Development Company in Poland'],
  // The live H1 highlights nothing; "Poland" takes the theme's accent, as the
  // other location pages' heroes do.
  accent: 'Poland',
  body: [
    'Soft Suave is one of the Top Mobile app development companies in Poland . We have 300+ mobile app development teams and our team has created innovative apps focused on the priorities of our Poland clients.',
  ],
  points: [],
  form: locationHeroForm('Mobile app development enquiry (Poland)'),
};

export const maplAbout: OverviewContent = {
  eyebrow: '',
  title: 'A Booming Mobile App Development Company',
  paragraphs: [
    'Soft Suave is one of the Globally recognized Mobile app development services in Poland that specializes in developing Futuristic apps with Feature-filled, astonishing creations that attract a wide range of users.',
    'Do you want to take your business to the digital world? With Successful Mobile apps that satisfy your customers and business goals? Or you might already have an app that needs Improvements?',
    'Get the Best dedicated and experienced application development team from Poland who are frequent updaters, innovators, and the best in project management. You can definitely expect brand new features to blend with your business ideas that make a difference in the tech world.',
    'Our app development service in Poland worked in various fields that fit well in any app stores and industries all around Europe.',
    'Soft Suave helps startups and SMBs to get fast recognition globally by developing efficient apps with advanced technologies. Do you know why we are the best Mobile app development agency in Poland? Thanks to our app development team who creates apps that are easy to use with a futuristic interface that satisfies users of different levels of expertise.',
  ],
  image: {
    src: `${IMG}/overview-poland.webp`,
    width: 1400,
    height: 991,
    alt: 'Mobile App Development Company in Poland',
    fit: 'column',
  },
};

/** "Reliable Mobile App Development Service Provider" — technology names are H4s, as live. */
export const maplExpertise: TechGroupCardsContent = {
  title: 'Reliable Mobile App Development Service Provider in Poland',
  body: 'As one of the Best Mobile Application Development services in Poland, we create Android, iOS, and cross-platform mobile apps to bring your ideas to life.',
  groups: [
    {
      name: 'Native Mobile App Development',
      body: 'We develop feature-rich, user-friendly Native Apps with our best-in-class development solutions. Our highly skilled software engineers, UX designers, and quality experts ensure our applications work smoothly without errors.',
      icon: { src: `${IMG}/poland-native-apps.webp`, width: 109, height: 110, alt: 'Native App Development Company Soft Suave' },
      items: [
        { name: 'iOS', mark: 'Apple', alt: 'apple', href: '/ios-application-development-company' },
        { name: 'Android', alt: 'Android', href: '/android-application-development-company' },
        { name: 'Swift', alt: 'Swift' },
        { name: 'Unity', logo: { src: `${IMG}/tech-unity.webp` }, alt: 'Unity' },
      ],
    },
    {
      name: 'Hybrid Mobile App Development',
      body: 'Make your business even more profitable by showcasing hybrid mobile applications with tools such as Ionic, React-Native, Phone Gap, and Xamarin.',
      icon: { src: `${IMG}/poland-hybrid-apps.webp`, width: 200, height: 200, alt: 'Hybrid App Development Company Soft Suave' },
      items: [
        { name: 'Ionic', alt: 'Ionic Development Company Soft Suave', href: '/ionic-app-development-company' },
        { name: 'React-Native', alt: 'React Development Company Soft Suave', href: '/react-native-app-development-company' },
        { name: 'PhoneGap', logo: { src: `${IMG}/poland-hybrid-apps.webp` }, alt: 'PhoneGap' },
        { name: 'Xamarin', alt: 'Xamarin Development Company Soft Suave', href: '/xamarin-app-development-company' },
      ],
    },
  ],
};

/** "Futuristic Application Development Technologies" — three groups, each with its services and tools. */
export const maplTechnologies: TechGroupCardsContent = {
  title: 'Futuristic Application Development Technologies',
  body: 'With our deep industry insight and popular tools & technologies, we have helped innumerable startups and small mobile application development firms in Poland to achieve their business goals.',
  links: [
    { text: 'iOS solutions', href: '/ios-application-development-company' },
    { text: 'Android application', href: '/android-application-development-company' },
    { text: 'cross-platform mobile apps', href: '/cross-platform-application-development-company' },
  ],
  groups: [
    {
      name: 'iOS App Development',
      body: "Our mission is to deliver futuristic and enterprise-level iOS solutions with impeccable designs. We are Poland's top App development agency with a full range of services, reliable results, and agile development strategies.",
      points: [
        'iPhone App Development',
        'iPad App Development',
        'Apple Watch App Development',
        'Apple TV App Development',
        'App Clips Development',
      ],
      items: [
        { name: 'Swift', alt: 'Swift' },
        { name: 'Objective-C', alt: 'Objective-C' },
        { name: 'SwiftUI', alt: 'SwiftUI' },
        { name: 'CocoaPods', logo: { src: `${IMG}/tech-cocoapods.webp` }, alt: 'CocoaPods' },
        { name: 'RxSwift', logo: { src: `${IMG}/tech-rxswift.webp` }, alt: 'RxSwift' },
        { name: 'SwiftLint', logo: { src: `${IMG}/tech-swiftlint.webp` }, alt: 'SwiftLint' },
        { name: 'CircleCI', alt: 'CircleCI' },
      ],
    },
    {
      name: 'Android App Development',
      body: 'Creating engaging, robust, and well-crafted Android application customized for your enterprise is our specialty. Boost your success and download in the Google Play Store with our diverse Android solutions.',
      points: [
        'Android Mobile App Development',
        'Android TV App Development',
        'Android Tablet App Development',
        'Android Wear App Development',
      ],
      items: [
        { name: 'Kotlin', alt: 'Kotlin' },
        { name: 'Java', alt: 'Java', href: '/java-application-development-company' },
        { name: 'Graddle', logo: { src: `${IMG}/tech-gradle.webp` }, alt: 'Graddle' },
        { name: 'Dagger2', logo: { src: `${IMG}/tech-dagger2.webp` }, alt: 'Dagger2' },
        { name: 'JetPack', alt: 'JetPack' },
        { name: 'Coroutines', logo: { src: `${IMG}/tech-coroutines.webp` }, alt: 'Coroutines' },
        { name: 'Fastlane', logo: { src: `${IMG}/tech-fastlane.webp` }, alt: 'Fastlane' },
      ],
    },
    {
      name: 'Cross-platform App Development',
      body: 'We help you develop innovative cross-platform mobile apps that run on multiple platforms to reach more users with our highly skilled and technical experts. Our applications become instant hits because of our creative use of advanced AI and ML technologies.',
      points: ['Hybrid Mobile App Development', 'Hybrid Tablet App Development', 'Hybrid TV App Development'],
      items: [
        {
          name: 'React Native',
          alt: 'React Native App Development Company Soft Suave',
          href: '/react-native-app-development-company',
        },
        { name: 'Flutter', alt: 'Flutter Development Company Soft Suave', href: '/flutter-application-development-company' },
        { name: 'Native Script', alt: 'Native Script' },
        { name: 'Javascript', alt: 'Javascript' },
        { name: 'TypeScript', alt: 'TypeScript' },
      ],
    },
  ],
};

/** The live mid-page band — its title is an H3 there. */
export const maplCta: CtaBandContent = {
  title: 'Want to Outsource App Development in Poland?',
  body: 'Soft Suave has a pool of developers who deliver your app development project on time and under your budget.',
  cta: { label: 'Hire Mobile App Developer', href: '/hire-mobile-app-developers' },
};

/** An answer's blocks as one plain-text string, for `a`. */
const plain = (blocks: readonly FaqAnswerBlock[]) =>
  blocks.map((b) => (typeof b === 'string' ? b : b.list.join(' '))).join(' ');

const requirementsBlocks: readonly FaqAnswerBlock[] = [
  "The App requirements document is your app's blueprint. It contains a description of your app, goals, specifications, features, and technical details.",
  {
    list: [
      'Business Goals and App Objectives',
      'User Personas and Stories of App',
      'Features, Functional and Non-Functional needs',
      'UX, User Flow of the apps',
      'Technology and infrastructure needs.',
    ],
  },
];

const timelineBlocks: readonly FaqAnswerBlock[] = [
  {
    list: [
      'The project involves technical architecture, UI coding, backend setup, functionality implementation, integration, and testing.',
      'We can develop a small app in 2 months, a mid-sized app might take 3-3.5 months, and we might complete a large app in 5-6 months.',
      'But the Timeline is based on the requirement and nature of the App.',
    ],
  },
];

/** The visible FAQ, verbatim — questions are H4s on the live page. */
export const maplFaqs: FaqContent = {
  eyebrow: '',
  title: 'Frequently Asked Questions',
  body: 'Know more about our processes and how we work, with the help of the following FAQs our clients ask.',
  items: [
    { q: 'What Should an App Requirements Document Contain?', a: plain(requirementsBlocks), blocks: requirementsBlocks },
    {
      q: 'What Are the Benefits of Using Soft Suave for Mobile App Development?',
      a: 'Soft Suave has been one of the top app development companies in Poland for almost decades. With that experience and expertise, the Soft Suave application development team are outstanding challenge-loving geeks who can fulfill your business and Market goals with customer satisfaction.',
    },
    { q: 'How long does it take to develop an app?', a: plain(timelineBlocks), blocks: timelineBlocks },
    {
      q: 'What is the difference between cross-platform and multi-platform app development?',
      a: 'In cross-platform development, the host architecture differs from the target platform. Essentially, the target application will not run on the host development system. Multi-platform means you can build executable targets that can run on both the host and the target.',
    },
    {
      q: 'Why should you choose an Outsourcing app development agency in Poland instead of an In-house?',
      a: 'Outsourcing mobile app development offers so many benefits over developing in-house. Offshore development is less time-consuming, fast launch, and provides reliable software quality.',
    },
  ],
};

export const maplClose = locationClose('Mobile app development consultation (Poland)');
