/**
 * Content for `/hire-ios-developers`.
 *
 * Source: softsuave.com/hire-ios-developers, and nothing else.
 *
 *   hero         → "Hire iOS Developers in India on Contract"
 *   overview     → "Hire iOS Developers At The Right Place"
 *   capabilities → "Our Dedicated iOS App Developer Expertise" (6 cards)
 *   midCta       → the rate band
 *   process      → "Hire iOS Developers in 4 easy steps"
 *   whyRole      → "Why You Should Team Up with Our iPhone Developers?"
 *   faq          → the five questions, verbatim
 *
 * The live page has no technology grid, comparison table or technology stack
 * section, so this module has none either.
 *
 * Two defects on the live page are not reproduced. Its process steps and two of
 * its "why" cards are pasted from a MERN stack page ("Share the MERN Stack JD",
 * "Senior MERN Stack Talent"), so the sentences are kept with the technology
 * corrected to iOS. And its rate band heading says "$12/hour" while its own
 * hero, every sibling role page and the rate card all say $14 — the band below
 * says $14, which is the figure the page itself leads with.
 */

import type { HireRolePageContent } from './types';
import { heroForm } from './shared';

export const ios: HireRolePageContent = {
  key: 'hire-ios',
  slug: '/hire-ios-developers',
  name: 'Hire iOS Developers',
  serviceType: 'iOS development staffing',

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
    title: 'Hire iOS Developers in India - Top 1% Programmers',
    description:
      'Hire skilled iOS developers through Soft Suave, a specialized agency with vetted talent from $14/hour and flexible engagement models that keep your project on track.',
  },

  hero: {
    eyebrow: 'Hire Developers by Role',
    titleLines: ['Hire iOS Developers', 'in India on Contract'],
    body: [
      'Great iOS apps do not happen by accident; they are built by the right people. Hire skilled iOS developers through Soft Suave, a specialized agency with vetted talent starting from $14/hour and flexible engagement models that keep your project on track.',
      'Soft Suave puts the right iOS developer in your team every time.',
    ],
    points: [
      '40-Hour Risk-Free Trial',
      'Hire Top iOS Developers in India',
      'Time-Zone & Language Aligned Teams',
      'Airtight NDA & IP Protection',
      'Strong Delivery Governance from Day One',
    ],
    badges: ['*Satisfaction Guaranteed – Get 40-hour Free Trial'],
    form: heroForm({
      title: 'Get Skilled Remote Developers',
      requirementLabel: 'Requirements',
      requirementPlaceholder:
        'Your iOS app, the existing codebase if there is one, the responsibilities involved, and when you need to start.',
      subject: 'iOS developer hiring enquiry',
    }),
  },

  overview: {
    eyebrow: 'Overview',
    title: 'Hire iOS Developers At The Right Place',
    paragraphs: [
      'Soft Suave is your best place to hire iOS Developer in India who have vast industry knowledge and experience.',
      "Soft Suave's iPhone developers have been developing robust and business-centric iOS Apps for more than 13+ years. Hire iOS Developer in India to fill any skill gaps in your onshore App development team and to get the most out of iOS SDK technologies.",
      'Our developers belong to the 1% of the top iOS Developers in India that create award-winning Apps for start-ups and SMBs. When you Hire iPhone App Developer from Soft Suave, you are assured of ground-breaking Apps that trend in the App Store. After you hire remote iOS developers, they carefully understand the scope of the project, analyze the customer requirements to finally deliver feature-rich iOS Apps within the estimated time and budget.',
      'Our iOS mobile App developers and iPhone App Designers are well-versed to develop secure and innovative mobile applications using all the latest technologies like AI/ML, IoT, AR/VR, Chatbots, Cloud Integration, etc. for iPhone, iPad, and Apple Watch.',
    ],
  },

  capabilities: {
    eyebrow: 'Expertise',
    title: 'Our Dedicated iOS App Developer Expertise',
    body: 'Hire iPhone App Developer from us and bring the best talent on board to build successful Apps of any complexity.',
    items: [
      {
        name: 'iOS UI & UX Development',
        body: 'Hire iOS developers from Soft Suave to get exclusive UI/UX services to develop a creative and smooth user interface for your application. Our Apple App developers add innovative touch and create the best user experience that engages your customers towards success.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        name: 'Custom iOS App Development',
        body: "We are a custom iOS development company offering custom solutions according to the client's business requirements. Hire iOS developers in India from us who are committed to developing innovative custom applications that drive your business towards success and growth.",
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        name: 'Hire Dedicated iOS Team',
        body: 'Team of full-stack iOS application developers at Soft Suave excels in crafting custom-tailored mobile Apps that help our clients to engage with their customers effectively. Besides, Apps built by our iOS App Development team are known to render a high user experience.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        name: 'App Migration to iOS Platform',
        body: 'Hire remote iOS developer from us to migrate your existing application to the iOS platform. Our iOS programmers keep track of the latest updates in the market to make sure your application is updated regularly and is trending in the App Store. Plus, they are also skilled in complete App up-gradation services.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
      {
        name: 'Swift App Development',
        body: "Our Apple App developers are highly skilled in the Swift programming language that allows us to develop Apps for iOS, macOS, and watchOS. Hire iPhone App Developers from us to utilize this language's powerful features like updated and reliable syntax, cutting-edge error handling model, etc.",
        image: '/images/landing/services/svc-proof-of-concept.webp',
      },
      {
        name: 'iOS Maintenance & Support',
        body: 'Maintenance of iOS Apps is more expensive than development. Soft Suave takes the pressure off you and maintains your iOS App regularly at a competitive price. Plus, when you hire iOS developers from us, you get 24*7 support to overcome bug issues or for getting newer updates.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
    ],
  },

  midCta: {
    eyebrow: 'Rates',
    title: 'Hire iOS Developers Starting from $14/hour',
    body: 'We will provide you with remote iOS App developers that work from India. Contact us to take a look at CVs.',
    cta: { label: 'Request Rate Card', href: '#enquiry' },
  },

  process: {
    eyebrow: 'Hiring Process',
    title: 'Hire iOS Developers in 4 easy steps',
    body: 'Below is the simple Full-time Hiring Process that we follow while offering 1-week free trial to our clients.',
    steps: [
      {
        n: '01',
        name: 'Share the iOS JD',
        body: 'Send your iOS development needs with project scope, skills, experience, and timeline.',
      },
      {
        n: '02',
        name: "Review Soft Suave's iOS Shortlist",
        body: 'Review curated iOS profiles with skills, experience, availability, and project fit details.',
      },
      {
        n: '03',
        name: 'Run the 40-Hour Free Trial',
        body: 'Start a 40-hour trial to assess coding skills, communication, quality, and delivery approach.',
      },
      {
        n: '04',
        name: 'Onboard the iOS Developer to Your Team',
        body: 'Sign SLA and NDA, complete onboarding, and integrate the iOS developer into your workflow.',
      },
    ],
  },

  whyRole: {
    eyebrow: 'Why Us',
    title: 'Why You Should Team Up with Our iPhone Developers?',
    body: 'We have a strong team of iOS App developers who can overcome any technical difficulty or unique challenges to help our clients get what exactly they want.',
    items: [
      {
        key: 'talent',
        name: 'Senior iOS Talent',
        body: 'Hire skilled iOS developers with expertise in Swift, SwiftUI, UIKit, Xcode, APIs, and cloud.',
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
        name: 'Flexible iOS Engagement Models',
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
        q: 'Do your iOS developers work in Agile/Scrum methodology?',
        a: 'Yes, our iOS mobile App developers follow the agile & scrum process of product development. This ensures a smooth and quick delivery process.',
      },
      {
        q: 'How much does it cost to hire an iOS App developer?',
        a: 'There are many factors that come into play when you cost of hire an iOS App developer. The main ones are: complexity of the project; frameworks and tools to be used; duration of the project; features to be included. Talk with our project managers now to know the exact price estimation.',
      },
      {
        q: 'What Are the Steps To Hire iOS Developers?',
        a: 'Just follow three simple steps: gather all the tasks the developer needs to do; then choose your preferred developer and technologies; talk with the project manager or sales team and finalize the agreement. If you are stuck anywhere, just connect with our experts.',
      },
      {
        q: 'Can you sign a Non-disclosure agreement (NDA) for my project?',
        a: "Yes, it's a mandatory step we follow before commencing the project. By signing an NDA, we ensure utmost confidentiality and commitment.",
      },
      {
        q: 'Can I hire an iOS developer for hourly or project-based tasks?',
        a: 'Yes, you can hire iPhone App developer from us through three flexible engagement models - Part-time, Full-time, and Milestone basis.',
      },
    ],
  },
};
