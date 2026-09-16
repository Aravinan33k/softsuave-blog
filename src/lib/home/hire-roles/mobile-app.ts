/**
 * Content for `/hire-mobile-app-developers`.
 *
 * Source: softsuave.com/hire-mobile-app-developers — the ten platform-specific
 * hiring cards, the "which mobile developer does your project need" decision
 * table (which becomes the `fit` selector, since it is exactly the
 * situation/answer pairing that section renders), the four-step evaluation
 * process, the six differentiators, the comparison table, the four technology
 * groups and the nine FAQs.
 */

import type { HireRolePageContent } from './types';
import { heroForm, hiringComparison } from './shared';

export const mobileApp: HireRolePageContent = {
  key: 'hire-mobile',
  slug: '/hire-mobile-app-developers',
  name: 'Hire Mobile App Developers',
  serviceType: 'Mobile application development staffing',

  meta: {
    title: 'Hire Mobile App Developers | 40-Hour Trial Before Hiring',
    description:
      'Hire mobile app developers for iOS, Android, Flutter and React Native. Review profiles, interview directly, and evaluate real work through a 40-hour trial. From $14/hour.',
  },

  hero: {
    eyebrow: 'Hire Developers by Role',
    titleLines: ['Hire Mobile App Developers', 'and Build the Right Team'],
    body: [
      'Hire mobile app developers experienced in Android, iOS, Flutter, React Native and the other mobile technologies your product depends on. Review relevant profiles, interview developers directly, and choose specialists who fit your roadmap and your existing codebase.',
      'Whether you are launching a new app, extending one already in the stores, or adding capacity to a mobile team, the match is made on platform, stack and responsibilities — not on a framework name.',
    ],
    points: [
      'Android, iOS and cross-platform expertise',
      '400+ AI and engineering specialists',
      '40-hour risk-free trial',
      'Flexible hiring from $14 / hour',
      'Global delivery from Chennai and Bengaluru',
    ],
    form: heroForm({
      title: 'Hire skilled mobile app developers',
      requirementLabel: 'Your mobile app requirement',
      requirementPlaceholder:
        'Target platforms, current codebase, the features you need built, and when you want a developer to start.',
      subject: 'Mobile app developer hiring enquiry',
    }),
  },

  overview: {
    eyebrow: 'Overview',
    title: 'Hire Mobile App Developers for Your Product and Team',
    paragraphs: [
      'Whether you are building a new mobile product, extending an existing application, or adding development capacity, the right developer has to match both your technology requirements and the way your team works. Soft Suave matches on platform, technology stack, product requirements, existing codebase and the responsibilities you are handing over.',
      'We shortlist relevant profiles so you can focus on developers whose experience aligns with the work you need to deliver. You review that experience, interview shortlisted candidates directly, and assess technical and communication skills before making a longer-term decision. A 40-hour risk-free trial then shows how the developer performs inside your actual project environment.',
      'Mobile developer rates start at $14 per hour, with final pricing based on experience, technology specialization and engagement requirements. Backed by 13+ years of software development and 400+ AI and engineering specialists, the decision rests on relevant experience and direct interaction rather than on a CV.',
    ],
  },

  fit: {
    eyebrow: 'Choose the Platform Expertise',
    title: 'Which Mobile Developer Does Your Project Need?',
    body: 'The right choice follows the product you already have or intend to build — existing code, platform-specific functionality, internal expertise and long-term maintenance. Pick the situation closest to yours.',
    columns: ['Your situation', 'The expertise that fits'],
    rows: [
      {
        problem: 'An Android-only product, or an Android-first roadmap',
        solution:
          'An Android or Kotlin developer. Direct access to platform APIs, background processing and device features without an additional abstraction layer — plus Jetpack, Android Studio, device testing and Play Store release requirements.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        problem: 'An iPhone or iPad product, or an App Store-first launch',
        solution:
          'An iOS or Swift developer. Native performance, Apple ecosystem integrations and faster adoption of new iOS capabilities, with SwiftUI, Xcode and App Store release experience behind it.',
        image: '/images/landing/services/svc-proof-of-concept.webp',
      },
      {
        problem: 'One codebase for both platforms, with no existing mobile code',
        solution:
          'A Flutter developer. Consistent UI rendering across platforms from a shared codebase, and a strong fit for design-led products where both platforms must look and behave the same.',
        image: '/images/landing/services/svc-model-selection.webp',
      },
      {
        problem: 'One codebase, and a web team already using React or TypeScript',
        solution:
          'A React Native developer. Shared language and tooling with the engineers you already have, which makes collaboration and eventual internal handover considerably easier.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        problem: 'A mature native codebase you want to extend, or a hybrid app in production',
        solution:
          'A Kotlin or Swift specialist to extend native architecture without adding a cross-platform layer; or an Ionic, Cordova or Xamarin developer to maintain a web-technology hybrid and, where it makes sense, migrate it — Xamarin to .NET MAUI, for instance — rather than forcing a rebuild.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
    ],
  },

  capabilities: {
    eyebrow: 'What Your Developer Can Own',
    title: 'Mobile Development Work You Can Hand Over',
    body: 'From the first build through store release and the long maintenance tail that follows, with backend, QA and design dependencies coordinated rather than ignored.',
    items: [
      {
        name: 'New App Development',
        body: 'Build an application from architecture and navigation model through to a store-ready release, covering platform conventions, offline behaviour, state management and automated tests.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        name: 'Native iOS Development',
        body: 'iPhone and iPad applications in Swift and SwiftUI with Xcode, including Apple platform requirements, ecosystem integrations and UIKit-to-SwiftUI modernization of existing apps.',
        image: '/images/landing/services/svc-proof-of-concept.webp',
      },
      {
        name: 'Native Android Development',
        body: 'Android applications in Kotlin and Java with Jetpack and Android Studio, covering device testing, platform-specific functionality, Play Store requirements and Java-to-Kotlin modernization.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        name: 'Cross-Platform Development',
        body: 'One codebase for both platforms with Flutter or React Native, chosen against your team’s existing skills and your product roadmap rather than as a default.',
        image: '/images/landing/services/svc-model-selection.webp',
      },
      {
        name: 'Mobile UI Implementation',
        body: 'Turn approved designs into interfaces that respect each platform’s conventions, across device sizes, orientations and accessibility settings, without losing the intended experience.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        name: 'App APIs and Integrations',
        body: 'Connect the app to backend services, payment providers, push notifications, analytics, identity providers and device capabilities, with sensible handling of offline and partial-failure states.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        name: 'Hybrid App Maintenance and Migration',
        body: 'Keep Ionic, Cordova and Xamarin applications supported with upgrades, integrations and platform compatibility updates — and migrate where it is genuinely the better option.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
      {
        name: 'Release, Monitoring and Maintenance',
        body: 'Manage store submissions and staged rollouts, watch crash and performance data after release, and resolve the defects that only real device diversity reveals.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
    ],
  },

  midCta: {
    eyebrow: 'Start With a Trial',
    title: 'Evaluate Your Mobile Developer Before You Onboard',
    body: 'Use the 40-hour risk-free trial to assess technical execution, communication, task ownership and code practices inside your own development workflow.',
    cta: { label: 'Start Your 40-Hour Trial', href: '#enquiry' },
  },

  engagement: {
    eyebrow: 'Engagement Models',
    title: 'Flexible Ways to Hire Mobile App Developers',
    body: 'Mobile products are rarely finished at launch, so the engagement should match how continuous the work will be.',
    blocks: [
      {
        label: 'Dedicated developer',
        body: 'For continuous development, regular releases and long-term product support, where you need specific mobile expertise available week after week.',
      },
      {
        label: 'Time and material',
        body: 'For evolving roadmaps, where features are reprioritised between releases and effort is reviewed and adjusted each development cycle.',
      },
      {
        label: 'Fixed bid',
        body: 'For a defined scope with a clear handover — a first release, a platform addition, or a bounded set of features with agreed acceptance criteria.',
      },
    ],
  },

  process: {
    eyebrow: 'Hiring Process',
    title: 'Evaluate Your Mobile Developer Before You Onboard',
    body: 'Five stages from requirement to a developer working inside your release process, with the decision resting on a direct conversation and real work.',
    steps: [
      {
        n: '01',
        name: 'Share Your Developer Requirement',
        body: 'Tell us your project scope, target platforms, required skills, existing codebase, timeline and preferred hiring model.',
      },
      {
        n: '02',
        name: 'Review Curated Developer Profiles',
        body: 'Receive shortlisted profiles matched to your platform, skills, goals, availability and team needs.',
      },
      {
        n: '03',
        name: 'Interview the Shortlist',
        body: 'Assess technical experience, communication, understanding of your requirements, and how the developer would fit your existing product team.',
      },
      {
        n: '04',
        name: 'Start the 40-Hour Risk-Free Trial',
        body: 'Test coding skill, communication, quality and workflow fit on real project work before onboarding — and decide from that, not from a promise.',
      },
      {
        n: '05',
        name: 'Onboard the Developer to Your Team',
        body: 'Finalise the SLA and NDA, set up communication, and define code ownership, approvals, escalation paths and release responsibilities around how your team already operates.',
      },
    ],
  },

  specialisations: {
    eyebrow: 'Hire by Platform',
    title: 'Hire Mobile Developers Across Native and Cross-Platform',
    body: 'Select the platform expertise your codebase and roadmap actually call for, so a developer contributes from day one instead of learning your architecture on your time.',
    items: [
      {
        key: 'android',
        name: 'Android Developers',
        body: 'Build and extend Android applications with Kotlin, Java, Jetpack and Android Studio, across device testing, platform functionality and Play Store requirements.',
      },
      {
        key: 'ios',
        name: 'iOS Developers',
        body: 'Develop iPhone and iPad applications with Swift, SwiftUI and Xcode, across Apple platform requirements, App Store releases and ecosystem integrations.',
      },
      {
        key: 'mobile',
        name: 'Flutter Developers',
        body: 'Build for iOS and Android from a shared Flutter codebase — suited to design-led products where consistent interfaces across platforms matter.',
      },
      {
        key: 'frontend',
        name: 'React Native Developers',
        body: 'Cross-platform applications in JavaScript or TypeScript, suited to teams already working in React who want continuity between web and mobile engineering.',
      },
      {
        key: 'web',
        name: 'Ionic and Cordova Developers',
        body: 'Support hybrid applications built with web technologies — continued feature development, upgrades, integrations and platform compatibility updates.',
      },
      {
        key: 'automation',
        name: 'Kotlin Developers',
        body: 'Native Android work, Java-to-Kotlin modernization, Jetpack Compose adoption and feature development inside existing Android codebases.',
      },
      {
        key: 'design',
        name: 'Swift Developers',
        body: 'Native iOS development, UIKit-to-SwiftUI modernization, Apple platform integrations and features across existing iPhone and iPad applications.',
      },
      {
        key: 'backend',
        name: 'Java Developers',
        body: 'Maintain and modernize existing Android applications, extend Java-based codebases, and support products still depending on established Java components.',
      },
      {
        key: 'integration',
        name: 'Xamarin Developers',
        body: 'Maintain existing Xamarin applications with feature updates and migration to .NET MAUI — suited to modernizing a legacy codebase rather than starting a new one.',
      },
    ],
  },

  comparison: hiringComparison({
    title: 'Soft Suave vs an In-House Hire vs a Freelancer',
    body: 'Mobile products need someone available for the store releases, OS updates and crash reports that keep arriving after launch. These factors usually decide the route.',
    column: 'Soft Suave developer',
  }),

  techStack: {
    eyebrow: 'Technology Stack',
    title: 'Technology Stack for Mobile App Engineering',
    body: 'Native and cross-platform stacks, the backend services behind them, and the tooling required to ship and maintain a production app.',
    groups: [
      {
        name: 'Frameworks',
        items: ['Flutter', 'React Native', 'Ionic', 'Jetpack Compose', 'SwiftUI', 'NativeScript'],
      },
      {
        name: 'Languages',
        items: ['Kotlin', 'Swift', 'Java', 'JavaScript', 'TypeScript'],
      },
      {
        name: 'Databases and Storage',
        items: ['MongoDB', 'MySQL', 'SQLite', 'PostgreSQL', 'Firebase'],
      },
      {
        name: 'Backend and APIs',
        items: ['Node.js', 'REST APIs', 'GraphQL', 'OAuth 2.0', 'Webhooks'],
      },
      {
        name: 'Testing',
        items: ['Appium', 'Selenium', 'Jest', 'Postman'],
      },
      {
        name: 'Tooling and Delivery',
        items: ['Android Studio', 'Xcode', 'VS Code', 'Git', 'GitHub Actions'],
      },
    ],
  },

  faq: {
    eyebrow: 'FAQs',
    title: 'Questions About Hiring Mobile Developers',
    body: 'Answers on platform choice, pricing, trials, team integration and what happens if a developer is not the right match.',
    items: [
      {
        q: 'How do I hire the right mobile app developer?',
        a: 'Start by defining the platforms, technologies, responsibilities and experience your project requires. Review relevant profiles, interview suitable candidates, and evaluate technical and collaboration fit. The 40-hour risk-free trial then lets your team assess the selected developer in practice.',
      },
      {
        q: 'How much does it cost to hire a mobile app developer?',
        a: 'Rates start at $14 per hour. Final pricing depends on the developer’s experience, technology specialization, engagement model and project requirements, and is confirmed after your requirements are reviewed so the proposed developer and commercial structure align with the actual work.',
      },
      {
        q: 'Should I hire an Android, iOS, Flutter or React Native developer?',
        a: 'Choose based on your current codebase, target platforms, roadmap and development approach. Android and iOS developers fit native applications; Flutter and React Native developers suit products that use, or plan, a shared cross-platform codebase.',
      },
      {
        q: 'Can I interview the developer before hiring?',
        a: 'Yes. You can review relevant profiles and interview suitable developers before moving forward. Use the discussion to assess technical experience, communication, understanding of your requirements, and fit with your existing product team.',
      },
      {
        q: 'How does the 40-hour risk-free trial work?',
        a: 'It lets your team evaluate a selected developer through real project work before extending the engagement. Use the period to assess technical execution, communication, responsiveness, task ownership, code practices and compatibility with your development workflow.',
      },
      {
        q: 'Can mobile developers work with my existing engineering team?',
        a: 'Yes, once responsibilities, tools, access, communication practices and review expectations are defined clearly. Developers can also coordinate with backend engineers, QA, DevOps, designers and product stakeholders without creating a separate delivery structure.',
      },
      {
        q: 'Should I hire dedicated mobile developers or use project-based delivery?',
        a: 'Hire a dedicated developer for continuous development, ongoing releases or long-term product support. Choose project-based delivery for a defined scope with a clear handover. Dedicated hiring works best when you need specific mobile expertise regularly.',
      },
      {
        q: 'What if the mobile developer is not the right fit?',
        a: 'Use the evaluation period to assess fit before extending the engagement. If the developer is not the right match, we provide another relevant profile at no additional cost for you to evaluate.',
      },
      {
        q: 'Why hire mobile app developers in India?',
        a: 'It gives global teams access to engineering expertise across native and cross-platform technologies. The decision should rest on technical fit, communication requirements, delivery process and how effectively the developer can integrate with your team — not on cost alone.',
      },
    ],
  },
};
