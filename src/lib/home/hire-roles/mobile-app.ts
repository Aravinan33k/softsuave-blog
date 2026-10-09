/**
 * Content for `/hire-mobile-app-developers`.
 *
 * Source: softsuave.com/hire-mobile-app-developers, and nothing else.
 *
 *   hero            → "Hire Mobile App Developers: Build the Right Team"
 *   overview        → "Hire Mobile App Developers for Your Product and Team Needs"
 *   specialisations → "Hire Mobile Developers Across Native and Cross-Platform Technologies"
 *   fit             → "Which Mobile Developer Does Your Project Need?"
 *   midCta          → "Not sure which mobile expertise fits your project?"
 *   globalDelivery  → "Hire Mobile App Developers in India for Global Teams"
 *   process         → "Evaluate Your Mobile Developer Before You Onboard"
 *   comparison      → "Hiring a Mobile App Developer: Soft Suave vs In-House vs Freelancer"
 *   techStack       → "Technology Stack for Mobile App Engineering"
 *   faq             → the nine questions, verbatim
 *
 * The live selection table has three columns — situation, developer, why it
 * fits. `Problems` carries two, so each row's second and third cells are joined
 * into the one answer they read as, with no wording changed.
 *
 * No `capabilities` carousel and no hiring-options band: this page runs neither.
 * Its "Why Hire Mobile Developers Through Soft Suave?" cards are the company's
 * own claims and stay with the homepage's Why band.
 */

import type { HireRolePageContent } from './types';
import { heroForm, hiringComparison } from './shared';

export const mobileApp: HireRolePageContent = {
  key: 'hire-mobile',
  slug: '/hire-mobile-app-developers',
  name: 'Hire Mobile App Developers',
  serviceType: 'Mobile application development staffing',
  // No breadcrumb schema: the live page's BreadcrumbList sits inside an HTML
  // comment, so it is not part of the page (review: "BreadcrumbList - remove
  // this extra schema").

  /** Live order: clients, overview, mobile expertise, developer selection, consultation CTA, global delivery, evaluation, why choose us, comparison, tech stack, success stories, testimonials, FAQ. */
  order: [
    'clients',
    'overview',
    'specialisations',
    'fit',
    'midCta',
    'globalDelivery',
    'process',
    'whyRole',
    'comparison',
    'techStack',
    'caseStudies',
    'testimonials',
    'faq',
  ],

  meta: {
    title: 'Hire Mobile App Developers | 40-Hour Trial Before Hiring',
    description:
      'Hire mobile app developers for Android, iOS, Flutter, and React Native. Review profiles and evaluate fit with a 40-hour risk-free trial.',
  },

  hero: {
    titleLines: ['Hire Mobile App Developers:', 'Build the Right Team'],
    accent: 'Mobile App Developers',
    body: [
      'Hire mobile app developers experienced in Android, iOS, Flutter, React Native, and other mobile technologies. Review relevant profiles, interview developers directly, and choose specialists who fit your product and existing codebase.',
      'Evaluate technical execution, communication, and workflow fit through real project work with a 40-hour trial before you onboard.',
    ],
    points: [
      'Android, iOS & Cross-Platform Expertise',
      '400+ AI & Engineering Specialists',
      'Vetted Talent On Contract',
      'Flexible Hiring from $14/Hour',
      'Global Delivery from India',
    ],
    form: heroForm({
      title: 'Hire Mobile App Developers',
      requirementLabel: 'Requirements',
      requirementPlaceholder:
        'Target platforms, existing codebase, technologies, responsibilities, and when you need to start.',
      subject: 'Mobile app developer hiring enquiry',
    }),
  },

  overview: {
    // Portrait, run the full height of the copy beside it (8 Oct review:
    // "resize the image to match the section") — the same photo, cut taller.
    image: {
      src: '/images/landing/ov-hire-mobile-app-developers-tall.webp',
      width: 1000,
      height: 1250,
      alt: 'Mobile app developers testing apps on phones',
      blurDataURL:
        'data:image/webp;base64,UklGRoIAAABXRUJQVlA4IHYAAABQAgCdASoQAAsAA4BaJbACdAYt9vPNftaaTIAA/vTFl2nlUNjvSykha/vqPIB7/Xv1+28xK9bQ6X7QBsq6ntlSHoqd5Fmejmh+8clBDBYx154vgoJHQ58tOB8t57/y+uQ4AkRdS7wg96Aw3m4AW6XgAN0pAAAA',
      fit: 'column',
    },
    eyebrow: 'Overview',
    title: 'Hire Mobile App Developers for Your Product and Team Needs',
    paragraphs: [
      'Whether you are building a new mobile product, extending an existing application, or adding development capacity to your team, the right developer needs to match both your technology requirements and the way your team works.',
      'Soft Suave helps you hire mobile application developers based on your platform, technology stack, product requirements, existing codebase, and expected responsibilities. We shortlist relevant profiles so you can focus on developers whose experience aligns with the work you need to deliver.',
      "You can review developer experience, interview shortlisted candidates directly, and assess their technical and communication skills before making a longer-term hiring decision. A 40-hour risk-free trial also gives you the opportunity to evaluate how the developer performs within your actual project environment. Soft Suave's mobile developer rates start at $14/hour, with final pricing based on experience, technology specialization, and engagement requirements.",
      'With 13+ years of software development experience and 400+ AI & Engineering Specialists, Soft Suave gives you more than a CV-based hiring process. Your decision can be based on relevant experience, direct interaction, and how well the developer performs within your team and project environment.',
    ],
  },

  // The live page's three-column table, as a table (review: "Developer
  // Selection ... it is a table with 3 columns, and it's not clear in the
  // current design"), with the two paragraphs it runs after it.
  fitTable: {
    eyebrow: 'Developer Selection',
    title: 'Which Mobile Developer Does Your Project Need?',
    body: 'The right choice depends on your existing architecture, target platforms, internal engineering skills, and product roadmap. Use these common scenarios to identify the expertise that best fits your project.',
    columns: ['Your Situation', 'Developer to Consider', 'Why This Fits'],
    rows: [
      {
        head: 'Android-only product or Android-first roadmap',
        cells: [
          'Android / Kotlin Developer',
          'Direct access to platform APIs, background processing, and device features without an additional abstraction layer',
        ],
      },
      {
        head: 'iPhone or iPad product, or App Store-first launch',
        cells: [
          'iOS / Swift Developer',
          'Native performance, Apple ecosystem integrations, and faster adoption of new iOS capabilities',
        ],
      },
      {
        head: 'One codebase for both platforms with no existing mobile code',
        cells: [
          'Flutter Developer',
          'Consistent UI rendering across platforms and a strong fit for design-led products',
        ],
      },
      {
        head: 'One codebase and a web team already using React or TypeScript',
        cells: [
          'React Native Developer',
          'Shared language and tooling with existing engineers, making collaboration and internal handover easier',
        ],
      },
      {
        head: 'Hybrid application already in production',
        cells: [
          'Ionic Developer',
          'Maintains continuity with your current web-based architecture without forcing an unnecessary rebuild',
        ],
      },
      {
        head: 'Mature native codebase you want to extend',
        cells: [
          'Kotlin or Swift Specialist',
          'Extends the existing architecture without adding a cross-platform layer that could increase complexity',
        ],
      },
    ],
    after: [
      'The technology choice should follow the product you already have or intend to build. Existing code, platform-specific functionality, internal expertise, and long-term maintenance requirements should guide which developer you hire.',
      'If your requirement spans more than one discipline, the mobile developer may also need to coordinate with backend engineers, QA, DevOps, designers, or product stakeholders. Review those dependencies before selecting profiles so the developer matches your actual engineering environment rather than a framework name alone.',
    ],
  },

  midCta: {
    eyebrow: 'Developer Selection',
    title: 'Not sure which mobile expertise fits your project?',
    body: 'Discuss your platform, architecture, and product requirements with our team to identify the right developer expertise for your project.',
    cta: { label: 'Book a Consultation', href: '/contact' },
  },

  globalDelivery: {
    // Portrait, run the full height of the copy beside it (8 Oct review:
    // "resize the image to match the section") — the same photo, cut taller.
    image: {
      src: '/images/landing/dl-hire-mobile-app-developers-tall.webp',
      width: 1000,
      height: 1250,
      alt: 'Developer on a video call with a headset at a laptop',
      blurDataURL:
        'data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADwAQCdASoQAAsAA4BaJbACdAEUu/NkAIgA+UGylZxof7KpY3V9EiWXRfqSOElZvn8vd+dweBg/M8gX4JyB7WaB6SaFsJxufMzLf/2I2jwOAAAA',
      fit: 'column',
    },
    eyebrow: 'Global Delivery',
    title: 'Hire Mobile App Developers in India for Global Teams',
    paragraphs: [
      'Hire mobile app developers in India to add experienced engineering capacity while keeping developers integrated with your existing product and delivery teams. Soft Suave supports distributed development through teams based in Chennai and Bengaluru, with an established US presence for global collaboration.',
      'Developers can work within your existing repositories, project management tools, communication channels, and review processes. Code ownership, approvals, escalation paths, and release responsibilities can be defined around the way your engineering team already operates.',
      'You can also hire a mobile app developer in India to extend an existing team and collaborate with backend engineers, QA, DevOps, designers, and product stakeholders without creating a separate delivery structure.',
      'Working hours and collaboration overlap can be agreed based on your project and team requirements. While cost can be one consideration, technical fit, communication, delivery ownership, and the ability to work effectively with your existing team should remain the priority.',
    ],
  },

  process: {
    eyebrow: 'Developer Evaluation',
    title: 'Evaluate Your Mobile Developer Before You Onboard',
    body: 'Make a more confident hiring decision with a process designed to reduce uncertainty and help you choose the right developer for your team.',
    steps: [
      {
        n: '01',
        name: 'Share Your Developer Requirement',
        body: 'Share your project scope, required skills, timeline, and preferred hiring model with our team.',
      },
      {
        n: '02',
        name: 'Review Curated Developer Profiles',
        body: 'Get shortlisted developer profiles matched to your skills, goals, availability, and team needs.',
      },
      {
        n: '03',
        name: 'Start the 40-Hour Risk-Free Trial',
        body: "Test the developer's coding skills, communication, quality, and workflow fit before onboarding.",
      },
      {
        n: '04',
        name: 'Onboard the Developer to Your Team',
        body: 'Finalize SLA and NDA, set up communication, and integrate the developer into your workflow.',
      },
    ],
  },

  specialisations: {
    eyebrow: 'Mobile Development Expertise',
    title: 'Hire Mobile Developers Across Native and Cross-Platform Technologies',
    body: 'Get matched with mobile developers who fit your product, codebase, and team requirements from day one. Move faster with relevant expertise aligned to your technology, workflows, delivery priorities, and goals.',
    items: [
      {
        key: 'android',
        name: 'Hire Android Developers',
        body: 'Build and extend Android applications using Kotlin, Java, Jetpack, and Android Studio, with expertise across device testing, platform-specific functionality, Play Store requirements, and existing Android codebases.',
        href: '/hire-android-developers',
      },
      {
        key: 'ios',
        name: 'Hire iOS Developers',
        body: 'Develop iPhone and iPad applications using Swift, SwiftUI, and Xcode, with expertise across Apple platform requirements, App Store releases, ecosystem integrations, and existing iOS applications.',
        href: '/hire-ios-developers',
      },
      {
        key: 'flutter',
        name: 'Hire Flutter Developers',
        body: 'Build iOS and Android applications from a shared Flutter codebase. Suitable for design-led products where maintaining consistent interfaces and user experiences across both platforms is important.',
        href: '/hire-flutter-developers',
      },
      {
        key: 'react-native',
        name: 'Hire React Native Developers',
        body: 'Develop cross-platform applications using JavaScript or TypeScript. Suitable for teams already working with React that want greater continuity between their existing web and mobile engineering environments.',
        href: '/hire-react-native-developers',
      },
      {
        key: 'ionic',
        name: 'Hire Ionic Developers',
        body: 'Support hybrid applications built with web technologies. Best suited to existing Ionic products requiring continued feature development, upgrades, integrations, and improvements without moving to another mobile framework.',
        href: '/hire-ionic-developers',
      },
      {
        key: 'kotlin',
        name: 'Hire Kotlin Developers',
        body: 'Add Kotlin developers for native Android development, Java-to-Kotlin modernization, Jetpack Compose adoption, and feature development within existing Android applications and modern mobile codebases.',
        href: '/hire-kotlin-developer',
      },
      {
        key: 'java',
        name: 'Hire Java Developers',
        body: 'Hire Java developers to maintain and modernize existing Android applications, extend Java-based codebases, and support mobile products that still depend on established Java components.',
        href: '/hire-java-developers',
      },
      {
        key: 'swift',
        name: 'Hire Swift Developers',
        body: 'Work with Swift developers for native iOS development, UIKit-to-SwiftUI modernization, Apple platform integrations, and feature development across existing iPhone and iPad applications.',
        href: '/hire-swift-developers',
      },
      {
        key: 'cordova',
        name: 'Hire Cordova Developers',
        body: 'Work with Cordova developers to maintain and extend hybrid mobile applications built with web technologies. Suitable for existing Cordova products requiring upgrades, integrations, feature development, and platform compatibility updates.',
      },
      {
        key: 'xamarin',
        name: 'Hire Xamarin Developers',
        // Unlinked for now (review) — there is no hire-Xamarin page, and the
        // name would otherwise auto-link to the Xamarin development company page.
        link: false,
        body: 'Support existing Xamarin applications with maintenance, feature updates, and migration to .NET MAUI. Best suited to businesses modernizing legacy Xamarin codebases rather than starting new Xamarin projects.',
      },
    ],
  },

  whyRole: {
    eyebrow: 'Why Choose Us',
    title: 'Why Hire Mobile Developers Through Soft Suave?',
    body: 'Choose a hiring process built around relevant technical expertise, direct developer evaluation, practical collaboration, and established engineering delivery. Review fit before extending the engagement while keeping your existing team involved.',
    items: [
      {
        key: 'experience',
        name: '13+ Years of Technology Expertise',
        body: 'Bring 13+ years of software engineering experience to your project, supported by established delivery practices and technical expertise.',
      },
      {
        key: 'specialists',
        name: '400+ AI & Engineering Specialists',
        body: 'Access specialists across mobile, backend, cloud, DevOps, data, and AI to support broader product and engineering requirements.',
      },
      {
        key: 'trial',
        name: '40-Hour Risk-Free Trial',
        body: 'Evaluate developer performance through real project work before extending the engagement, reducing uncertainty around technical and team fit.',
      },
      {
        key: 'evaluation',
        name: 'Direct Developer Evaluation',
        body: 'Review profiles and interview developers directly to assess technical capability, communication, and suitability for your project and team.',
      },
      {
        key: 'iso',
        name: 'ISO/IEC 27001:2022 Certified',
        body: "Soft Suave's information security management system is ISO/IEC 27001:2022 certified, covering our software development and delivery operations.",
      },
      {
        key: 'global',
        name: 'India-Based Global Collaboration',
        body: 'Integrate India-based developers into your existing workflows using agreed communication, review, project management, and collaboration processes.',
      },
    ],
  },

  comparison: hiringComparison({
    title: 'Hiring a Mobile App Developer: Soft Suave vs In-House vs Freelancer',
    body: 'Compare common hiring approaches and find the option that best fits your software development and team requirements.',
    column: 'Soft Suave Developer',
  }),

  // The live page's own case-study band, not the homepage's AI stories
  // (review: heading/content mismatch). Titles and bodies verbatim.
  caseStudies: {
    eyebrow: 'Case Studies',
    title: 'Mobile Applications Our Developers Have Built',
    body: 'See how our mobile developers have contributed to real products across different business requirements, bringing hands-on experience across platforms, architectures, integrations, and ongoing product development.',
    items: [
      {
        title: 'ParkSafe Community Vehicle Alert App',
        image: { src: '/images/case-studies/logistics-3.webp', alt: 'ParkSafe Community Vehicle Alert App' },
        tag: 'Community Safety',
        body: 'A mobile app that spots suspicious vehicles, sends real-time alerts, and improves community safety.',
      },
      {
        title: 'Smart Movie Ticketing app with Real-Time Booking',
        image: { src: '/images/case-studies/on-demand-5.webp', alt: 'Smart Movie Ticketing app with Real-Time Booking' },
        tag: 'Entertainment',
        body: 'A ticketing app with live seat availability, secure payments, and a smooth booking flow.',
      },
      {
        title: 'Time-saving Video Calling App for Healthcare Industry',
        image: { src: '/images/case-studies/telemedicine-2.png', alt: 'Time-saving Video Calling App for Healthcare Industry' },
        tag: 'HealthTech',
        body: 'Soft Suave developed an efficient Video calling app for instant consultations, to save time, and to get fast solutions.',
      },
      {
        title: 'HealthPass Wellness Subscriptions in Banking App',
        image: { src: '/images/case-studies/finance-6.webp', alt: 'HealthPass Wellness Subscriptions in Banking App' },
        tag: 'Banking',
        body: 'Soft Suave helps banks boost customer loyalty with personalized wellness benefits and engagement insights.',
      },
      {
        title: 'All-in-One Financial Management App',
        image: { src: '/images/case-studies/finance-4.webp', alt: 'All-in-One Financial Management App' },
        tag: 'FinTech',
        body: 'Soft Suave built an all-in-one app that simplifies budgeting, expenses, investments, and bills.',
      },
    ],
  },

  techStack: {
    eyebrow: 'Tech Stack',
    title: 'Technology Stack for Mobile App Engineering',
    body: 'Our mobile developers work across native and cross-platform stacks, backend services, and the tooling required to ship and maintain production apps.',
    groups: [
      {
        name: 'Frameworks',
        items: [
          'Flutter',
          'React Native',
          'Ionic',
          'jQuery Mobile',
          'Jetpack Compose',
          'SwiftUI',
          'NativeScript',
        ],
      },
      {
        name: 'Languages',
        items: ['Kotlin', 'Swift', 'Java', 'JavaScript', 'TypeScript'],
      },
      {
        name: 'Databases',
        items: ['MongoDB', 'MySQL', 'SQLite', 'PostgreSQL', 'SwiftData'],
      },
      {
        name: 'DevOps & Tooling',
        items: ['Android Studio', 'Xcode', 'VS Code', 'Git', 'Eclipse'],
      },
    ],
  },

  faq: {
    eyebrow: 'Ask Us',
    title: 'Frequently Asked Questions About Hiring Mobile Developers',
    body: 'Get clear answers to common questions about hiring mobile developers, pricing, technology fit, trials, and team integration.',
    // Internal links woven into the answers (review: "several internal
    // links are missing in the FAQs"). The live FAQs carry none, so these
    // are ours: each phrase already in the copy, pointing at a served page.
    links: [
      { text: 'Android and iOS developers', href: '/hire-android-developers' },
      { text: 'Flutter', href: '/hire-flutter-developers' },
      { text: 'React Native', href: '/hire-react-native-developers' },
    ],
    items: [
      {
        q: 'How do I hire the right mobile app developer?',
        a: 'Start by defining the platforms, technologies, responsibilities, and experience your project requires. Review relevant developer profiles, interview suitable candidates, and evaluate technical and collaboration fit. The 40-hour risk-free trial can then help your team assess the selected developer in practice.',
      },
      {
        q: 'How much does it cost to hire a mobile app developer?',
        a: "Soft Suave's mobile developer rates start at $14/hour. Final pricing depends on the developer's experience, technology specialization, engagement model, and project requirements. Pricing is confirmed after your requirements are reviewed so the proposed developer and commercial structure align with the actual work, collaboration model, and project needs.",
      },
      {
        q: 'Should I hire an Android, iOS, Flutter, or React Native developer?',
        a: 'Choose based on your current codebase, target platforms, roadmap, and development approach. Android and iOS developers fit native applications, while Flutter and React Native developers are suitable when your product uses or plans a shared cross-platform codebase for product delivery.',
      },
      {
        q: 'Can I interview the developer before hiring?',
        a: 'Yes. The hiring process allows you to review relevant profiles and interview suitable developers before moving forward. Use the discussion to assess technical experience, communication, understanding of your requirements, and how the developer may fit with your existing product team.',
      },
      {
        q: 'How does the 40-hour risk-free trial work?',
        a: 'The 40-hour risk-free trial lets your team evaluate a selected developer through real project work before extending the engagement. Use the period to assess technical execution, communication, responsiveness, task ownership, code practices, and compatibility with your existing development workflow requirements.',
      },
      {
        q: 'Can mobile developers work with my existing engineering team?',
        a: 'Yes, the developer can be integrated into your existing product and engineering workflow when responsibilities, tools, access, communication practices, and review expectations are defined clearly. The exact collaboration setup should be agreed before onboarding based on your specific team requirements.',
      },
      {
        q: 'Should I hire dedicated mobile developers or use project-based delivery?',
        a: 'Hire a dedicated mobile developer for continuous development, ongoing releases, or long-term product support. Choose project-based delivery for a defined scope with a clear handover. Dedicated hiring works best when you need specific mobile expertise regularly.',
      },
      {
        q: 'What if the mobile developer is not the right fit?',
        a: 'Use the evaluation period to assess fit before extending the engagement. If the developer is not the right match, we can provide another relevant profile at no additional cost for you to evaluate.',
      },
      {
        q: 'Why hire mobile app developers in India?',
        a: 'Hiring mobile app developers in India gives global teams access to engineering expertise across native and cross-platform technologies. The decision should be based on technical fit, communication requirements, delivery process, and how effectively the developer can integrate with your team.',
      },
    ],
  },
};
