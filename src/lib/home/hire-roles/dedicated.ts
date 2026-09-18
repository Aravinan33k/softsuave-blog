/**
 * Content for `/hire-dedicated-developers`.
 *
 * Source: softsuave.com/hire-dedicated-developers, and nothing else.
 *
 *   hero            → "Hire Dedicated Developers in India Vetted Teams from $14/hour"
 *   overview        → "Why Hire Dedicated Developers from Soft Suave?"
 *   specialisations → "What Dedicated Developer Roles Does Soft Suave Offer?" (9 roles)
 *   midCta          → "Looking to hire dedicated developers?"
 *   comparison      → "Soft Suave vs In-House Teams vs Freelancers: Which Should You Choose?"
 *   process         → "How to Hire Dedicated Developers from India in 4 Steps"
 *   rates           → "How Much Does It Cost to Hire Dedicated Developers in India?"
 *   fit             → "Top 6 Reasons Companies Hire Dedicated Developers"
 *   whyRole         → "6 Common Challenges When Hiring Dedicated Developers…"
 *   techStack       → "Tech Stack Soft Suave's Dedicated Developers Work With" (8 groups)
 *   faq             → all eleven questions, in the live order
 *
 * Two things on the live page are not carried over verbatim. Three of its
 * eleven FAQs are answered with the wrong answer — "what is included in the
 * engagement" repeats the NDA answer, and both "onshore vs offshore" and "vs
 * freelancers" repeat the onboarding-speed answer. All three questions are
 * here, in their live positions, answered from this page's own facts: the
 * engagement models and trial it publishes, its $14/hour offshore rate and
 * overlap hours, and its own comparison table's freelancer column. Publishing
 * the live answers as they stand would put an answer that does not address its
 * question into the page's FAQ schema.
 *
 * And its "Your Guide to Hiring Dedicated Developers" strip is three links to
 * the three long-form sections directly below it — navigation to content this
 * page already carries, so it is not repeated as a band of its own.
 */

import type { HireRolePageContent } from './types';
import { heroForm, onboardingComparison, rateTiers } from './shared';

export const dedicated: HireRolePageContent = {
  key: 'hire-dedicated',
  slug: '/hire-dedicated-developers',
  name: 'Hire Dedicated Developers',
  serviceType: 'Dedicated development team staffing',

  /**
   * Live order: clients, why hire (with its figures), developer roles, CTA,
   * comparison, process, tech stack, testimonials, pricing, top reasons, common
   * challenges, FAQ. The figures the page quotes — 400+ developers, 30+ stacks,
   * 97% retention — are sentences inside its "why hire" prose, not a counter
   * strip, so they are in `overview` and there is no separate stats band.
   */
  order: [
    'clients',
    'overview',
    'specialisations',
    'midCta',
    'comparison',
    'process',
    'techStack',
    'testimonials',
    'rates',
    'fit',
    'whyRole',
    'faq',
  ],

  meta: {
    title: 'Hire Dedicated Developers India From $14/hr',
    description:
      'Hire dedicated developers from India who join your team within 48 hours across web, mobile, full-stack, DevOps and QA. From $14/hour, with a 40-hour trial.',
  },

  hero: {
    titleLines: ['Hire Dedicated Developers in India', 'Vetted Teams from $14/hour'],
    body: [
      'Soft Suave offers dedicated developers from India who can join your team within 48 hours and work as an extension of your in-house team. Hire experts in web, mobile, full-stack, DevOps, QA, and more with flexible models, hourly rates starting at $14/hour, and a 40-hour risk-free trial.',
    ],
    points: [
      '40-Hour Risk-Free Trial',
      'Dedicated Developers from $14/hour',
      'Hire Within 48 Hours',
      'Time-Zone & Language Aligned Teams',
      'Airtight NDA & IP Protection',
      'Strong Delivery Governance from Day One',
    ],
    badges: ['*Satisfaction Guaranteed – Get 40-hour Free Trial'],
    form: heroForm({
      title: 'Get Skilled Remote Developers',
      requirementLabel: 'Requirements',
      requirementPlaceholder:
        'The roles you need, your technology stack, team size, preferred hiring model, and start date.',
      subject: 'Dedicated developer hiring enquiry',
    }),
  },

  overview: {
    eyebrow: 'Smart Choice',
    title: 'Why Hire Dedicated Developers from Soft Suave?',
    paragraphs: [
      'Scale faster with expert developers who integrate seamlessly, deliver consistently, and adapt to your evolving business needs without hiring delays.',
      'Soft Suave 400+ dedicated developers in India help businesses scale with skilled talent across 30+ technology stacks, including web, mobile, cloud, DevOps, QA, eCommerce, and emerging technologies. Each developer is assessed for technical depth, communication skills, project experience, and team compatibility before joining client projects.',
      'Our engagements are built for long-term value, not short-term staffing gaps. With a 97% client retention rate, Soft Suave gives businesses reliable development support backed by consistent delivery, clear communication, and developers who adapt to changing project needs.',
      'You can hire developers through flexible engagement models such as dedicated team, fixed-price, and time and material models. Expand your team on demand and keep projects moving without slow recruitment cycles.',
    ],
  },

  specialisations: {
    eyebrow: 'Developer Roles',
    title: 'What Dedicated Developer Roles Does Soft Suave Offer?',
    body: 'Soft Suave helps you hire dedicated developers across 9 key role categories, from software and web development to DevOps, QA, and eCommerce. Choose individual developers or build a multi-role team based on your project scope, technology needs, and delivery goals.',
    items: [
      {
        key: 'software',
        name: 'Software Developers',
        body: 'Build custom software, modernize legacy systems, automate workflows, and add AI capabilities with skilled software developers who align with your business goals, technology stack, and delivery process to create scalable and efficient solutions.',
        href: '/hire-software-developers',
      },
      {
        key: 'web',
        name: 'Web App Developers',
        body: 'Develop secure, responsive, and performance-focused web applications with modern frameworks, clean interfaces, API integrations, scalable architecture, browser compatibility, speed optimization, and smooth user experiences across screens and devices.',
        href: '/hire-web-app-developers',
      },
      {
        key: 'mobile',
        name: 'Mobile App Developers',
        body: 'Create intuitive mobile apps for iOS and Android with smooth navigation, clean UI, secure backend connectivity, device-friendly performance, app store readiness, offline support, analytics, and scalable features built around real user needs.',
        href: '/hire-mobile-app-developers',
      },
      {
        key: 'frontend',
        name: 'Frontend Developers',
        body: 'Build fast, responsive, and engaging user interfaces with React, Angular, Vue, Next.js, reusable components, Core Web Vitals focus, accessibility basics, design system support, and frontend experiences that improve usability and conversions.',
        href: '/hire-frontend-application-developer',
      },
      {
        key: 'backend',
        name: 'Backend Developers',
        body: 'Power your applications with secure, scalable backend systems built for performance and reliability, featuring APIs, databases, authentication, third-party integrations, server-side logic, data workflows, cloud readiness, and efficient architecture.',
        href: '/hire-backend-application-developer',
      },
      {
        key: 'fullstack',
        name: 'Fullstack Developers',
        body: 'Hire full-stack developers who manage frontend, backend, APIs, databases, integrations, cloud-ready workflows, and application logic, helping you build complete products with better coordination, cleaner execution, and faster delivery.',
      },
      {
        key: 'devops',
        name: 'DevOps Engineers',
        body: 'Improve deployment speed, cloud reliability, automation, monitoring, CI/CD pipelines, infrastructure management, containerization, release control, cost visibility, and scalability with DevOps engineers experienced in modern cloud environments.',
        href: '/hire-devops-developers',
      },
      {
        key: 'qa',
        name: 'QA Testers',
        body: 'Ensure better software quality with manual testing, automation testing, regression checks, usability testing, performance validation, test planning, defect reporting, QA documentation, and release support that helps reduce bugs before launch.',
        href: '/hire-qa-testers-india',
      },
      {
        key: 'ecommerce',
        name: 'eCommerce Developers',
        body: 'Build and optimize online stores with custom features, payment flows, product catalogs, checkout improvements, third-party integrations, admin workflows, mobile-friendly design, and conversion-focused shopping experiences for growing businesses.',
      },
    ],
  },

  midCta: {
    title: 'Looking to hire dedicated developers?',
    body: 'Hire skilled developers faster with Soft Suave. Get vetted talent, flexible engagement models, and reliable support to scale your project without hiring delays.',
    cta: { label: 'Download Rate Card', href: '#enquiry' },
  },

  fit: {
    eyebrow: 'Why Hire',
    title: 'Top 6 Reasons Companies Hire Dedicated Developers',
    body: 'Dedicated developers help companies scale faster with skilled talent, flexible engagement, and better project control. They work as an extension of your team and stay focused on your business goals, product needs, and delivery timelines.',
    columns: ['Reason', 'What it means for your team'],
    rows: [
      {
        problem: 'Focused Expertise',
        solution:
          'Get developers with skills that match your exact project needs, technology stack, and development goals.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        problem: 'Full-Time Project Focus',
        solution:
          'Dedicated developers stay aligned with your project priorities instead of splitting time across multiple clients.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        problem: 'Smooth Team Integration',
        solution:
          'They work with your tools, workflows, communication channels, and internal processes for easier collaboration.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        problem: 'Flexible Scaling',
        solution:
          'Add or reduce developers based on project demand without the delays of traditional hiring.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        problem: 'Clear Communication',
        solution:
          'Regular updates, progress tracking, and review calls help keep your team informed and aligned.',
        image: '/images/landing/services/svc-proof-of-concept.webp',
      },
      {
        problem: 'Cost Efficiency',
        solution:
          'Reduce recruitment, training, infrastructure, and long-term employment costs while accessing skilled development talent.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
    ],
  },

  whyRole: {
    eyebrow: 'Hiring Guide',
    title: '6 Common Challenges When Hiring Dedicated Developers and How to Solve Them',
    body: 'Hiring dedicated developers can be highly effective, but the right process is important. Skill validation, communication, accountability, and security must be handled clearly before onboarding.',
    items: [
      {
        key: 'skills',
        name: 'Skill Verification',
        body: 'Use technical interviews, coding assessments, and past project reviews before selecting developers.',
      },
      {
        key: 'timezone',
        name: 'Time Zone Differences',
        body: 'Set overlapping work hours and clear meeting schedules to avoid delays.',
      },
      {
        key: 'communication',
        name: 'Communication Gaps',
        body: 'Choose developers with strong English communication and define update frequency from the start.',
      },
      {
        key: 'security',
        name: 'Data Security Concerns',
        body: 'Use NDAs, access controls, secure repositories, and role-based permissions.',
      },
      {
        key: 'accountability',
        name: 'Accountability Issues',
        body: 'Track progress through project management tools, sprint reviews, daily updates, and milestone tracking.',
      },
      {
        key: 'retention',
        name: 'Retention and Continuity',
        body: 'Work with a stable development partner that can provide backup support and scale resources when needed.',
      },
    ],
  },

  process: {
    eyebrow: 'Quick Steps',
    title: 'How to Hire Dedicated Developers from India in 4 Steps',
    body: 'Hiring dedicated developers from Soft Suave is simple, structured, and risk-free. Our process helps you define your needs, review suitable developer profiles, test their skills, and onboard the right talent with confidence.',
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

  comparison: onboardingComparison({
    title: 'Soft Suave vs In-House Teams vs Freelancers: Which Should You Choose?',
    body: 'Compare hiring dedicated developers from Soft Suave with building an in-house team or hiring freelancers. The table below gives a clear side-by-side view to help you choose the right model for your project.',
    column: 'Soft Suave',
  }),

  rates: rateTiers({
    title: 'How Much Does It Cost to Hire Dedicated Developers in India?',
    body: "Soft Suave's dedicated developers in India are available at flexible hourly rates starting from $14/hour. The final cost depends on the developer's experience, skill level, technology stack, and project requirements. An approximate pricing breakdown is listed below to help you plan your hiring budget.",
  }),

  techStack: {
    eyebrow: 'Expertise',
    title: "Tech Stack Soft Suave's Dedicated Developers Work With",
    body: "Soft Suave's dedicated developers work across 30+ stacks for web, mobile, cloud, DevOps, QA, backend, frontend, full-stack, and eCommerce development, building scalable, secure, high-performance products.",
    groups: [
      {
        name: 'Frontend Frameworks',
        items: [
          'React',
          'Angular',
          'Vue.js',
          'Next.js',
          'HTML5',
          'CSS3',
          'Javascript',
          'TypeScript',
        ],
      },
      {
        name: 'Backend Technologies',
        items: ['Java', 'Node.js', 'Python', 'Django', '.NET', 'PHP', 'Laravel', 'Express.js'],
      },
      {
        name: 'Mobile Technologies',
        items: ['Flutter', 'Swift', 'Kotlin', 'Java', 'Ionic', 'React Native', 'NativeScript'],
      },
      {
        name: 'Databases',
        items: ['SQLite', 'Swift Data', 'PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Firebase'],
      },
      {
        name: 'Cloud & DevOps',
        items: [
          'AWS',
          'Azure',
          'Google Cloud Platform',
          'Docker',
          'Kubernetes',
          'Jenkins',
          'GitHub Actions',
        ],
      },
      {
        name: 'eCommerce Platforms',
        items: [
          'Shopify',
          'Magento',
          'WooCommerce',
          'BigCommerce',
          'Custom eCommerce solutions',
        ],
      },
      {
        name: 'QA & Testing Tools',
        items: [
          'Selenium',
          'Cypress',
          'Postman',
          'JMeter',
          'Appium',
          'Playwright',
          'Manual testing tools',
        ],
      },
      {
        name: 'IDEs & Development Tools',
        items: [
          'Android Studio',
          'Xcode',
          'Visual Studio Code',
          'Eclipse',
          'GitHub',
          'GitLab',
          'Bitbucket',
        ],
      },
    ],
  },

  faq: {
    eyebrow: 'Ask Us',
    title: 'Frequently Asked Questions About Hiring Dedicated Developers from India',
    body: "Know more about Soft Suave's hiring process, engagement models, trial option, onboarding timeline, and how our dedicated developers work with your team.",
    items: [
      {
        q: 'Will dedicated developers from Soft Suave work in our time zone?',
        a: "Yes. Soft Suave's dedicated developers can work with flexible schedules to overlap with your core business hours. This helps your team manage daily communication, meetings, progress updates, and project discussions without major time zone delays.",
      },
      {
        q: 'What are the benefits of hiring dedicated developers in India?',
        a: 'Hiring dedicated developers in India helps businesses access skilled talent, reduce hiring delays, control development costs, and scale teams faster. With Soft Suave, you get developers who work as an extension of your team and stay focused on your project goals.',
      },
      {
        q: 'Can I change the engagement model after hiring starts?',
        a: 'Yes. Soft Suave offers flexible engagement models, including fixed price, time and material, and dedicated team models. You can discuss changes if your project scope, timeline, or resource needs evolve after the engagement begins.',
      },
      {
        q: "Do Soft Suave's dedicated developers sign an NDA?",
        a: 'Yes. Soft Suave developers sign an NDA before the engagement begins to help protect your project idea, business data, source code, and confidential information. This gives you better control and security while working with dedicated developers.',
      },
      {
        // Live answer repeats the NDA answer above; answered here from the
        // engagement models, trial and working practices this page publishes.
        q: "What is included in Soft Suave's dedicated developer engagement?",
        a: 'A dedicated engagement includes a developer matched to your technology stack and project needs, a 40-hour risk-free trial before any long-term commitment, and an NDA signed before work begins. You choose the engagement model — dedicated team, fixed price, or time and material — and the developer works within your tools, workflows and communication channels, with regular updates, progress tracking and review calls.',
      },
      {
        q: 'How much does it cost to hire dedicated developers from India?',
        a: "The cost to hire dedicated developers from India starts at $14/hour. The final pricing may vary based on the developer's experience, role, technology stack, engagement model, and overall project requirements.",
      },
      {
        q: 'How fast can Soft Suave onboard a dedicated developer?',
        a: 'Soft Suave can shortlist suitable dedicated developer profiles within 48 hours after receiving your requirement. After profile review, interview, and approval, the selected developer can begin the 40-hour risk-free trial before long-term onboarding.',
      },
      {
        // Live answer repeats the onboarding-speed answer above; answered here
        // from this page's own offshore rate, overlap hours and cost claims.
        q: 'What is the difference between onshore and offshore dedicated hiring?',
        a: 'Onshore hiring places developers in your own country, at your local cost base and with recruitment, training, infrastructure and long-term employment costs carried by you. Offshore hiring — what Soft Suave provides from India — starts at $14/hour and removes those costs, with developers working flexible schedules that overlap your core business hours so daily communication, meetings and progress updates continue as normal.',
      },
      {
        // Live answer repeats the onboarding-speed answer too; answered here
        // from this page's own Soft Suave vs freelancer comparison.
        q: 'How is hiring dedicated developers different from hiring freelancers?',
        a: 'A dedicated developer stays assigned to your project and works as an extension of your team, while a freelancer usually splits time across several clients. Our own comparison puts freelance engagements at a high project-failure risk, with uncertain communication and no dedicated resource, against dedicated developers who can start within 48 hours, communicate seamlessly and remain committed to your project — backed by the 40-hour risk-free trial and a signed NDA.',
      },
      {
        q: 'What happens if the dedicated developer is not a good fit after the trial?',
        a: 'If the developer is not the right fit after the 40-hour risk-free trial, Soft Suave can share another suitable profile based on your feedback. This helps you evaluate the right talent before making a long-term commitment.',
      },
      {
        q: 'Can Soft Suave provide a full dedicated team or only individual developers?',
        a: 'Soft Suave can provide both individual dedicated developers and complete dedicated development teams. Based on your project needs, you can hire developers, QA testers, DevOps engineers, tech leads, and project management support.',
      },
    ],
  },
};
