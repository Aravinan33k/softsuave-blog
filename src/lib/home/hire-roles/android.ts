/**
 * Content for `/hire-android-developers`.
 *
 * Source: softsuave.com/hire-android-developers, and nothing else.
 *
 *   hero         → "Hire Android Developers in India On Contract"
 *   overview     → "Hire Dedicated Android Developers From Soft Suave"
 *   capabilities → "Our Android Developers Expertise" (6 cards)
 *   midCta       → "Hire Android Developers Starting from $14/hour"
 *   process      → "Hire Android Developers in 4 easy steps"
 *   whyRole      → "Why Are Our Android App Developers Considered the Best?"
 *   faq          → the six questions, verbatim
 *
 * The live page has no technology grid, no comparison table and no technology
 * stack section, so this module has none either.
 *
 * Its four process steps and two of its six "why" cards are pasted from a MERN
 * stack page — they read "Share the MERN Stack JD", "Senior MERN Stack Talent"
 * and "Flexible MERN Engagement Models" under Android headings. The sentences
 * are kept as published with the technology corrected to Android, since
 * reproducing the slip would advertise MERN developers on an Android page.
 */

import type { HireRolePageContent } from './types';
import { heroForm } from './shared';

export const android: HireRolePageContent = {
  key: 'hire-android',
  slug: '/hire-android-developers',
  name: 'Hire Android Developers',
  serviceType: 'Android development staffing',

  /** Live order: overview, expertise, rate band, process, why choose us, FAQ. This page runs neither a client strip nor testimonials. */
  order: [
    'overview',
    'capabilities',
    'midCta',
    'process',
    'whyRole',
    'faq',
  ],

  meta: {
    title: 'Hire Android Developers India - 40-Hour Risk-Free Trial',
    description:
      'Hire Android developers from India skilled in Kotlin, Java, Android Studio, Jetpack, API integrations and enterprise mobility. From $14/hour.',
  },

  hero: {
    eyebrow: 'Hire Developers by Role',
    titleLines: ['Hire Android Developers', 'in India On Contract'],
    body: [
      'Soft Suave offers Android developers from India skilled in Kotlin, Java, Android Studio, Jetpack, API integrations, enterprise mobility, and custom mobile app development.',
      'Hire trusted experts quickly for scalable Android applications with flexible engagement models.',
    ],
    points: [
      '40-Hour Risk-Free Trial',
      'Hire Top Android Developers in India',
      'Time-Zone & Language Aligned Teams',
      'Airtight NDA & IP Protection',
      'Strong Delivery Governance from Day One',
    ],
    badges: ['*Satisfaction Guaranteed – Get 40-hour Free Trial'],
    form: heroForm({
      title: 'Get Skilled Remote Developers',
      requirementLabel: 'Requirements',
      requirementPlaceholder:
        'Your Android app, the existing codebase if there is one, the responsibilities involved, and when you need to start.',
      subject: 'Android developer hiring enquiry',
    }),
  },

  overview: {
    eyebrow: 'Overview',
    title: 'Hire Dedicated Android Developers From Soft Suave',
    paragraphs: [
      'Bring your Android App ideas to life by working with our most reliable and experienced Android developers.',
      'Soft Suave is an award-winning web and mobile app development company in India. Hire top Android app developers from us if you are looking for scalable, secure and robust Android app development solutions. We offer flexible hiring models as per your budget to hire our top-notch developers and transform all your app ideas into working applications. Our 5+ years experienced developers have both technical and domain expertise to provide solutions to your complex Android development challenges.',
      'Our end-to-end mobile app development solutions are 10X faster and renowned among our clients worldwide. Whether you want to develop an app or migrate legacy apps, Soft Suave gives you access to our talent pool to test & hire the best Android developers in India.',
      "Android experts at Soft Suave never compromise on the quality of development be it a short-term or a long-term project. They are committed to the client's business goals and are always ready to go the extra mile to achieve success. When you hire offshore Android developers from us, you get a team that works as your extended development team but at a very competitive cost.",
    ],
  },

  capabilities: {
    eyebrow: 'Expertise',
    title: 'Our Android Developers Expertise',
    body: 'Our Android developers have a proven track record of developing top-grade Apps for clients all over the world.',
    items: [
      {
        name: 'Custom Android Applications',
        body: 'Our top-class Android developers have all the experience and expertise to turn your custom requirements into secure and successful Android applications. They even add innovative touch and attractive UI/UX to your app to make it competitive in the market.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        name: 'Blockchain-based Applications',
        body: 'Blockchain is an evolving technology in the app development industry. Android developers at Soft Suave leverage blockchain technology to build secure applications that save money and time for industries like Healthcare, Banking, Supply chain and Logistics.',
        image: '/images/landing/services/svc-security-governance.webp',
      },
      {
        name: 'AI/Machine Learning Apps',
        body: 'Companies that are experts in AI/Machine learning hire Android developers from us. The developers have all the domain expertise in AI and Machine Learning to transform the client requirements into innovative Android applications.',
        image: '/images/landing/services/svc-model-selection.webp',
      },
      {
        name: 'Android API Customization',
        body: 'Hire Android developers from Soft Suave if you want to develop custom API and implement it in your mobile application. Our best-in-class experts have all the industry expertise to provide Android API customization in no time.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        name: 'Upgradation & Migration',
        body: 'Choose our remote Android developers at an affordable cost if you want to upgrade your Android app with innovative features and optimize it according to the latest version. Besides, they are efficient in handling any app migration to the Android platform without any data leakage.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
      {
        name: 'Support & Maintenance',
        body: 'You can stay stress-free if you hire our Android developers to support and maintain your Android application because they focus on the quality of the application and hence provide timely maintenance at an affordable cost to increase the performance of your application.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
    ],
  },

  midCta: {
    eyebrow: 'Rates',
    title: 'Hire Android Developers Starting from $14/hour',
    body: 'We will provide you with remote Android App developers that work from India. Contact us to take a look at CVs.',
    cta: { label: 'Request Rate Card', href: '#enquiry' },
  },

  process: {
    eyebrow: 'Hiring Process',
    title: 'Hire Android Developers in 4 easy steps',
    body: 'Below is the simple Full-time Hiring Process that we follow while offering 1-week free trial to our clients.',
    steps: [
      {
        n: '01',
        name: 'Share the Android JD',
        body: 'Send your Android development needs with project scope, skills, experience, and timeline.',
      },
      {
        n: '02',
        name: "Review Soft Suave's Android Shortlist",
        body: 'Review curated Android profiles with skills, experience, availability, and project fit details.',
      },
      {
        n: '03',
        name: 'Run the 40-Hour Free Trial',
        body: 'Start a 40-hour trial to assess coding skills, communication, quality, and delivery approach.',
      },
      {
        n: '04',
        name: 'Onboard the Android Developer to Your Team',
        body: 'Sign SLA and NDA, complete onboarding, and integrate the Android developer into your workflow.',
      },
    ],
  },

  whyRole: {
    eyebrow: 'Why Us',
    title: 'Why Are Our Android App Developers Considered the Best?',
    body: 'Our strong team of Android App Developers has exceptional knowledge in the front end, back end, and integration solutions.',
    items: [
      {
        key: 'talent',
        name: 'Senior Android Talent',
        body: 'Hire skilled Android developers with expertise in Kotlin, Java, Jetpack, Android Studio, APIs, and cloud.',
      },
      {
        key: 'reporting',
        name: 'Daily Reports + Clear Communication',
        body: 'Get daily updates and sprint reports to stay informed on progress, priorities, blockers, and delivery.',
      },
      {
        key: 'quote',
        name: 'Free Project Quote Within 24 Hours',
        body: 'Receive a clear project quote within 24 hours based on your scope, timeline, and needs.',
      },
      {
        key: 'manager',
        name: 'Dedicated Project Manager Support',
        body: 'A dedicated manager ensures smooth coordination, tracking, and communication throughout the project.',
      },
      {
        key: 'models',
        name: 'Flexible Android Engagement Models',
        body: 'Choose fixed price, time and material, or dedicated team models to match your project needs.',
      },
      {
        key: 'hiring',
        name: 'Flexible Engagement Models',
        body: 'Hire our experts from three custom engagement models as per your need - Full time, Part-time, and Milestone.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQs',
    title: 'Frequently Asked Questions',
    body: 'Know more about our processes and how we work, with the help of the following FAQs.',
    items: [
      {
        q: 'How much does it cost to hire a dedicated Android developer?',
        a: "To hire our Android experts, you don't need a fortune. Our prices are competitive in the app development market, economical, and assured to fit the budget of start-ups and SMBs.",
      },
      {
        q: 'Why shall I hire Android App developers from Soft Suave?',
        a: 'If you hire Android developers from Soft Suave, you get to choose from a pool of A-list Android developer in India who are highly-talented, committed, and have hands-on experience in many industries.',
      },
      {
        q: 'What are the various hiring models offered by you to hire Android developers?',
        a: 'To hire our top-notch Android developers, you can leverage our client-friendly hiring models: full-time hiring, part-time hiring and milestone hiring.',
      },
      {
        q: 'What are the industries that are served by your Android developers?',
        a: 'Android app developer from Soft Suave are skilled in a wide array of industry verticals like Healthcare, Education, eCommerce & Retail, Construction, Travel & Tourism, Media & Entertainment, and Banking.',
      },
      {
        q: 'Java or Kotlin - which language do you prefer for Android app development?',
        a: 'Successful Android app development can be made possible with both Java and Kotlin. Nevertheless, we prefer Kotlin as it provides more flexibility while development and adds extra security to apps.',
      },
      {
        q: 'Can I hire an Android developer for an hourly or project-based task?',
        a: 'Definitely! Our hourly charges are budget-friendly, even for start-ups and SMBs. Moreover, we provide flexibility in the hiring model and focus more on offering quality results.',
      },
    ],
  },
};
