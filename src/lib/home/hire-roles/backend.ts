/**
 * Content for `/hire-backend-application-developer`.
 *
 * Source: softsuave.com/hire-backend-application-developer, and nothing else.
 *
 *   hero            → "Hire Backend Developers for Scalable Applications"
 *   overview        → "Hire Backend Developers Who Fit Your Application and Team"
 *   capabilities    → "Backend Work Our Developers Can Own" (9 cards)
 *   specialisations → "Choose Backend Developers by Technology" (10 cards)
 *   fit             → "Evaluate Your Developer Through Practical Work" (8 criteria)
 *   engagement      → "Flexible Ways to Hire Backend Developers"
 *   midCta          → "Start Your Backend Engagement with Soft Suave"
 *   globalDelivery  → "Global Delivery Across Time Zones"
 *   process         → "How to Hire a Backend Developer From Soft Suave"
 *   techStack       → "Backend Technologies Our Developers Work With" (8 groups)
 *   faq             → the eleven questions, verbatim
 *
 * The practical-evaluation cards are a list of criteria and what each one
 * means, which is the shape `Problems` renders — the criterion selects, its
 * own text fills the panel.
 *
 * No `comparison` and no rate table: this page runs neither, stating only that
 * backend rates start at $14 per hour. Its "Why Hire Backend Developers From
 * Soft Suave?" cards are the company's own claims and stay with the homepage's
 * Why band.
 */

import type { HireRolePageContent } from './types';
import { heroForm } from './shared';

export const backend: HireRolePageContent = {
  key: 'hire-backend',
  slug: '/hire-backend-application-developer',
  name: 'Hire Backend Developers',
  serviceType: 'Backend development staffing',
  // Matches the live page's own breadcrumb trail: Home › Hire Developers —
  // the live trail stops at the parent and never names this page itself.
  showBreadcrumb: true,
  breadcrumbParents: [{ name: 'Hire Developers', path: '/hire-dedicated-developers' }],
  breadcrumbEndsAtParent: true,

  /** Live order: clients, overview, responsibilities, technologies, engagement options, next steps, hiring process, why Soft Suave, delivery presence, practical evaluation, technology stack, testimonials, FAQ. */
  order: [
    'clients',
    'overview',
    'capabilities',
    'specialisations',
    'engagement',
    'midCta',
    'process',
    'whyRole',
    'globalDelivery',
    'fit',
    'techStack',
    'testimonials',
    'faq',
  ],

  meta: {
    title: 'Hire Backend Developers From $14/hr | 40-hour trial',
    description:
      'Hire backend developers matched to your technology stack, application requirements, and working model. Evaluate practical work before a longer-term commitment.',
  },

  hero: {
    titleLines: ['Hire Backend Developers', 'for Scalable Applications'],
    body: [
      'Hire backend developers matched to your technology stack, application requirements, and working model. Evaluate technical execution, communication, requirement understanding, and team compatibility through practical work before confidently making a longer-term commitment to your development team.',
      'Take the next step toward stronger backend delivery by sharing your requirements and starting a focused conversation with our team.',
    ],
    points: [
      'Vetted Talent On Contract',
      'Developers Matched to Your Stack',
      'NDA & SLA Backed Engagements',
      '400+ AI & Engineering Specialists',
      'Flexible Hiring from $14/Hour',
    ],
    form: heroForm({
      title: 'Get Skilled Backend Developers',
      requirementLabel: 'Requirements',
      requirementPlaceholder:
        'Application, technology stack, required experience, responsibilities, availability, and preferred engagement model.',
      subject: 'Backend developer hiring enquiry',
    }),
  },

  overview: {
    eyebrow: 'Overview',
    title: 'Hire Backend Developers Who Fit Your Application and Team',
    paragraphs: [
      'Hire backend developers who can work within your application architecture, technical environment, and established delivery practices. Add the backend skills you need without restructuring your existing engineering team.',
      'Developers can contribute to server-side logic, APIs, databases, cloud-connected systems, application modernization, and ongoing development based on your product requirements and current priorities.',
      'When you hire back-end developers, they work directly with your existing team and follow your communication, project-management, source-control, code-review, testing, and deployment workflows.',
    ],
  },

  capabilities: {
    eyebrow: 'Responsibilities',
    title: 'Backend Work Our Developers Can Own',
    body: 'When you hire back end developers, they can take ownership of essential server-side work throughout the application lifecycle. Their responsibilities can include the following areas:',
    items: [
      {
        name: 'Server-Side Application Logic',
        body: 'Build and maintain application logic for web platforms, mobile apps, SaaS products, customer portals, and internal systems across new and existing codebases throughout their lifecycle.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        name: 'API Development and Integration',
        body: 'Create, document, maintain, and connect REST or GraphQL APIs. This can include internal services, frontend communication, third-party platforms, payment systems, business tools, and data sources.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        name: 'Database Work',
        body: 'Design schemas, write and optimize queries, maintain data-access layers, and support data consistency across PostgreSQL, MySQL, MongoDB, SQL Server, and other approved database environments.',
        image: '/images/landing/services/svc-model-selection.webp',
      },
      {
        name: 'Cloud and Deployment Collaboration',
        body: 'Contribute to backend deployment workflows using AWS, Azure, Google Cloud, Docker, Kubernetes, and CI/CD tools while coordinating with your DevOps or infrastructure team.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        name: 'Backend Modernization',
        body: 'Refactor legacy components, update frameworks, improve maintainability, and replace tightly coupled application logic through planned, incremental changes that fit your broader modernization roadmap.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
      {
        name: 'Authentication and Authorization',
        body: 'Implement authentication flows, role-based access, permissions, and backend authorization logic according to your application requirements and approved architecture.',
        image: '/images/landing/services/svc-security-governance.webp',
      },
      {
        name: 'Monitoring and Observability',
        body: 'Add or maintain application logging, metrics, tracing, dashboards, and alerts that help your team understand backend behavior and investigate operational issues.',
        image: '/images/landing/services/svc-evaluation-llmops.webp',
      },
      {
        name: 'Migration Work',
        body: 'Support planned database, framework, infrastructure, or application-component migrations. Developers can contribute to assessment, implementation, testing, staged transition, and post-migration checks within your technical plan.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        name: 'Testing, Performance and Maintenance',
        body: 'Write automated and integration tests, monitor server-side performance, investigate backend issues, resolve defects, and maintain existing components throughout ongoing development and application release cycles.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
    ],
  },

  fit: {
    eyebrow: 'Practical Evaluation',
    title: 'Evaluate Your Developer Through Practical Work',
    body: 'The 40-hour risk-free trial lets you evaluate a backend developer through work connected to your application, technology stack, engineering expectations, and collaboration model.',
    columns: ['What to evaluate', 'What the trial shows you'],
    rows: [
      {
        problem: 'Technical Execution',
        solution:
          'Assess how the developer approaches backend work, handles dependencies, and applies relevant language, framework, and database knowledge.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        problem: 'Architecture Approach',
        solution:
          'Evaluate how a backend developer for hire handles component boundaries, data flow, integrations, and maintainability.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        problem: 'API and Database Work',
        solution:
          'Evaluate endpoint design, query handling, data-access decisions, validation, and error management.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        problem: 'Code Quality',
        solution:
          'Review readability, structure, maintainability, and alignment with your coding standards.',
        image: '/images/landing/services/svc-proof-of-concept.webp',
      },
      {
        problem: 'Testing Practices',
        solution:
          'Assess how the developer validates expected behavior, handles edge cases, and uses automated testing.',
        image: '/images/landing/services/svc-evaluation-llmops.webp',
      },
      {
        problem: 'Communication and Responsiveness',
        solution:
          'Observe how clearly the developer communicates progress, questions, dependencies, and blockers.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        problem: 'Requirement Understanding',
        solution:
          'Check whether the developer translates business and technical requirements into practical backend decisions.',
        image: '/images/landing/services/svc-model-selection.webp',
      },
      {
        problem: 'Workflow Compatibility',
        solution:
          'Confirm the developer can work within your source-control practices, review process, sprint routines, and delivery expectations.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
    ],
  },

  midCta: {
    eyebrow: 'Next Steps',
    title: 'Start Your Backend Engagement with Soft Suave',
    body: 'Share your backend technology, responsibilities, experience requirements, and engagement preferences. Review matched talent and evaluate practical work through the 40-hour risk-free trial.',
    cta: { label: 'Start Your 40-Hour Trial', href: '#enquiry' },
  },

  engagement: {
    eyebrow: 'Engagement Options',
    title: 'Flexible Ways to Hire Backend Developers',
    body: 'Choose the engagement structure that matches your responsibilities, delivery needs, and how completely the work is defined before development begins.',
    blocks: [
      {
        label: 'Dedicated Developer',
        body: 'Hire dedicated backend developers who work closely with your team and remain focused on your product, priorities, and ongoing development needs.',
      },
      {
        label: 'Time and Material',
        body: 'Hire backend developers with flexible capacity for evolving requirements, changing priorities, and ongoing work where the complete scope is not fixed.',
      },
      {
        label: 'Fixed Bid',
        body: 'Hire backend developers for clearly defined work with agreed requirements, deliverables, responsibilities, and completion criteria established before development begins.',
      },
    ],
  },

  globalDelivery: {
    eyebrow: 'Delivery Presence',
    title: 'Global Delivery Across Time Zones',
    paragraphs: [
      'Our delivery presence in Chennai, Bengaluru, and the United States supports companies working across different time zones and operating models, with reliable coordination throughout each engagement.',
      'Companies can hire backend developers in India through our teams in Chennai and Bengaluru. Developers are selected according to the required technology, experience, responsibilities, and collaboration needs.',
      'They maintain agreed working-hour overlap and contribute through your existing communication, source control, project management, code review, testing, handover, and deployment processes. This keeps distributed collaboration clear and developers aligned with your established workflow and priorities.',
    ],
  },

  process: {
    eyebrow: 'Hiring Process',
    title: 'How to Hire a Backend Developer From Soft Suave',
    body: 'The process covers requirement review, developer matching, interviews, practical evaluation, selection, and onboarding into your existing development workflow.',
    steps: [
      {
        n: '01',
        name: 'Share Your Backend Requirements',
        body: 'Tell us about your application, technology stack, required experience, responsibilities, availability, and preferred engagement model.',
      },
      {
        n: '02',
        name: 'Review and Interview Matched Developers',
        body: 'Review profiles, then interview backend developers to assess expertise, communication, availability, approach, and team fit.',
      },
      {
        n: '03',
        name: 'Run the 40-Hour Risk-Free Trial',
        body: 'Assign practical work that reflects the engagement, then evaluate execution, code quality, communication, responsiveness, and compatibility.',
      },
      {
        n: '04',
        name: 'Select and Onboard Your Developer',
        body: 'Choose the right developer, finalize the engagement, and provide tools, systems, access, and processes required.',
      },
    ],
  },

  specialisations: {
    eyebrow: 'Technologies',
    title: 'Choose Backend Developers by Technology',
    body: 'Explore backend developers for hire across established languages, frameworks, and runtime environments. Select talent based on your application architecture, existing codebase, integration requirements, and long-term development plans.',
    items: [
      {
        key: 'dotnet',
        name: 'Hire .NET Developers',
        body: 'Support enterprise applications, APIs, cloud-connected systems, and existing Microsoft technology environments using C#, ASP.NET, .NET Core, and related tools.',
        href: '/hire-dot-net-developers',
      },
      {
        key: 'php',
        name: 'Hire PHP Developers',
        body: 'Develop and maintain server-side applications, business platforms, APIs, content systems, and integrations across established or modern PHP environments.',
        href: '/hire-php-developers',
      },
      {
        key: 'java',
        name: 'Hire Java Developers',
        body: 'Work on enterprise platforms, distributed services, application backends, integrations, and long-running systems using Java and commonly adopted frameworks.',
        href: '/hire-java-developers',
      },
      {
        key: 'node',
        name: 'Hire NodeJS Developers',
        body: 'Build event-driven services, APIs, real-time application features, microservices, and backend components using JavaScript or TypeScript.',
        href: '/hire-nodejs-developers',
      },
      {
        key: 'laravel',
        name: 'Hire Laravel Developers',
        body: "Create and maintain PHP applications, APIs, portals, integrations, and backend workflows using Laravel's routing, ORM, authentication, and testing features.",
        href: '/hire-laravel-developer',
      },
      {
        key: 'django',
        name: 'Hire Django Developers',
        body: 'Develop structured Python backends, APIs, administrative systems, data-driven platforms, and applications requiring clear maintainability and access controls.',
        href: '/hire-django-developer',
      },
      {
        key: 'python',
        name: 'Hire Python Developers',
        body: 'Support APIs, business applications, data-connected systems, automation workflows, and backend components using Python and its established frameworks.',
        href: '/hire-python-developers',
      },
      {
        key: 'rails',
        name: 'Hire Ruby on Rails Developers',
        body: 'Support product development, existing Rails applications, API layers, database-backed workflows, and iterative platform improvements.',
        href: '/hire-ruby-on-rails-developer',
      },
      {
        key: 'csharp',
        name: 'Hire C# Developers',
        body: 'Contribute to APIs, enterprise applications, Microsoft ecosystems, cloud services, and existing C# codebases.',
      },
      {
        key: 'go',
        name: 'Hire Golang Developers',
        body: 'Develop concurrent services, APIs, infrastructure components, and performance-sensitive backend systems using Go.',
      },
    ],
  },

  whyRole: {
    eyebrow: 'Why Soft Suave',
    title: 'Why Hire Backend Developers From Soft Suave?',
    body: 'Soft Suave combines established engineering experience, flexible hiring options, practical evaluation, and quality-managed processes to support backend developer engagements.',
    items: [
      {
        key: 'experience',
        name: '13+ Years of Technology Expertise',
        body: 'Work with an experienced technology partner for application development, modernization, integrations, and ongoing engineering requirements.',
      },
      {
        key: 'specialists',
        name: '400+ AI & Engineering Specialists',
        body: 'Access broader engineering expertise across applications, cloud, data, DevOps, testing, and AI for complex backend requirements.',
      },
      {
        key: 'models',
        name: 'Flexible Engagement Models',
        body: 'Choose a dedicated developer, time-and-material engagement, or fixed-bid structure according to your responsibilities and delivery needs.',
      },
      {
        key: 'iso',
        name: 'ISO/IEC 27001:2022 Certified',
        body: "Soft Suave's certified information security management system helps safeguard sensitive data across development and delivery.",
      },
      {
        key: 'trial',
        name: '40-Hour Risk-Free Trial',
        body: 'Evaluate technical work, communication, responsiveness, requirement understanding, and team compatibility before continuing the engagement.',
      },
      {
        key: 'timezones',
        name: 'Collaboration Across Time Zones',
        body: 'Maintain 4–6 hours of working overlap for stand-ups, reviews, handovers, and communication across distributed teams.',
      },
    ],
  },

  techStack: {
    eyebrow: 'Technology Stack',
    title: 'Backend Technologies Our Developers Work With',
    body: 'Find backend developers for hire with experience across the languages, frameworks, databases, cloud platforms, and tools your application requires.',
    groups: [
      {
        name: 'Languages and Frameworks',
        items: [
          'Java',
          'Spring Boot',
          'C#',
          '.NET',
          'PHP',
          'Laravel',
          'Python',
          'Django',
          'Flask',
          'FastAPI',
          'Ruby',
          'Ruby on Rails',
          'Go',
          'Node.js',
          'Express.js',
          'NestJS',
          'JavaScript',
          'TypeScript',
        ],
      },
      {
        name: 'APIs and Integrations',
        items: ['REST', 'GraphQL', 'gRPC', 'WebSockets', 'Swagger', 'OpenAPI', 'Postman'],
      },
      {
        name: 'Databases and Data Access',
        items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL Server', 'Redis'],
      },
      {
        name: 'Authentication and Authorization',
        items: ['OAuth 2.0', 'OpenID Connect', 'JWT'],
      },
      {
        name: 'Cloud Platforms',
        items: ['AWS', 'Microsoft Azure', 'Google Cloud'],
      },
      {
        name: 'Containers and Infrastructure',
        items: ['Docker', 'Kubernetes', 'Terraform'],
      },
      {
        name: 'Testing',
        items: ['JUnit', 'NUnit', 'pytest', 'Jest', 'Postman', 'JMeter'],
      },
      {
        name: 'CI/CD and Version Control',
        items: [
          'Git',
          'GitHub',
          'GitLab',
          'Bitbucket',
          'Jenkins',
          'GitHub Actions',
          'Azure DevOps',
        ],
      },
    ],
  },

  faq: {
    eyebrow: 'Ask Us',
    title: 'Questions About Hiring Backend Developers',
    body: 'Find answers to common questions about hiring, evaluating, working with, and paying backend developers.',
    items: [
      {
        q: 'How do I hire a backend developer from Soft Suave?',
        a: 'Share your backend requirements, review matched profiles, interview suitable developers, and evaluate your preferred candidate through the 40-hour risk-free trial. You can then select the developer and begin onboarding them into your team.',
      },
      {
        q: 'What does the 40-hour risk-free trial cover?',
        a: 'The 40-hour risk-free trial lets you assess the developer in the way that best fits your requirements. Assign relevant tasks and review their technical ability, communication, and team fit before making a longer commitment.',
      },
      {
        q: 'How quickly can I receive matched backend developer profiles?',
        a: 'Most matched backend developer profiles are shared within 24–48 hours after we review your requirements. Timing may vary depending on the required skills, experience, availability, engagement model, and responsibilities.',
      },
      {
        q: 'How quickly can a backend developer be onboarded?',
        a: 'Onboarding timing depends on developer selection, engagement confirmation, access requirements, documentation, and your internal setup process. Onboarding begins after the developer is selected and the working arrangements are finalized.',
      },
      {
        q: 'What technologies do your backend developers work with?',
        a: 'Our backend developers work with technologies including Java, .NET, C#, PHP, Laravel, Python, Django, Node.js, Go, Ruby on Rails, PostgreSQL, MySQL, MongoDB, SQL Server, AWS, Azure, and Google Cloud.',
      },
      {
        q: 'Can I hire one backend developer or a complete backend team?',
        a: 'You can hire an individual backend developer or discuss a wider team based on your application responsibilities and delivery needs. Team composition depends on the required technologies, workload, supporting roles, and preferred engagement structure.',
      },
      {
        q: 'Can your developers work with my existing development team?',
        a: 'Yes, backend developers can work within your existing engineering workflow. They can use your communication tools, source-control practices, sprint routines, review process, testing standards, documentation requirements, and deployment procedures.',
      },
      {
        q: 'How do I evaluate a backend developer before hiring?',
        a: 'Evaluate the developer through representative backend work, not only interviews. Review technical execution, architecture decisions, API or database work, code quality, testing, communication, responsiveness, requirement understanding, and compatibility with your working process.',
      },
      {
        q: 'Can your developers work across different time zones?',
        a: 'Yes, our backend developers can work across different time zones with 4–6 hours of overlap based on your requirements. Working schedules can accommodate stand-ups, technical reviews, handovers, response expectations, and asynchronous communication.',
      },
      {
        q: 'What factors determine the cost of hiring a backend developer?',
        a: 'Backend developer cost depends on experience, technology, engagement model, engagement length, region, responsibilities, and technical complexity. Requirements involving architecture ownership, migrations, uncommon technologies, distributed systems, or complex integrations may require more specialized experience.',
      },
      {
        q: 'How much does it cost to hire a back end developer?',
        a: 'Our backend developer rates start at $14 per hour. Final pricing depends on the required skills, experience level, project responsibilities, engagement model, and duration.',
      },
    ],
  },
};
