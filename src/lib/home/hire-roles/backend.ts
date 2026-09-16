/**
 * Content for `/hire-backend-application-developer`.
 *
 * Source: softsuave.com/hire-backend-application-developer — the nine
 * responsibility blocks, the ten technology hiring cards, the three engagement
 * models, the four-step process, the eight evaluation criteria (which become the
 * `fit` selector, grouped into the five things a trial actually tests), the six
 * differentiators, the eight technology groups and the eleven FAQs.
 */

import type { HireRolePageContent } from './types';
import { heroForm, hiringComparison } from './shared';

export const backend: HireRolePageContent = {
  key: 'hire-backend',
  slug: '/hire-backend-application-developer',
  name: 'Hire Backend Developers',
  serviceType: 'Backend development staffing',

  meta: {
    title: 'Hire Backend Developers From $14/Hour | 40-Hour Trial',
    description:
      'Hire backend developers for APIs, databases, authentication and cloud-connected systems. Node.js, NestJS, .NET, Java, Python and Go, evaluated on a 40-hour trial.',
  },

  hero: {
    eyebrow: 'Hire Developers by Role',
    titleLines: ['Hire Backend Developers', 'for Scalable Applications'],
    body: [
      'Hire backend developers matched to your technology stack, application requirements and working model. Add the server-side skills you need without restructuring the engineering team you already have.',
      'Evaluate technical execution, architecture thinking, communication and team compatibility through practical work before making a longer-term commitment.',
    ],
    points: [
      'Developers matched to your stack',
      'NDA and SLA-backed engagements',
      '400+ AI and engineering specialists',
      '40-hour risk-free trial',
      'Flexible hiring from $14 / hour',
    ],
    form: heroForm({
      title: 'Hire skilled backend developers',
      requirementLabel: 'Your backend requirement',
      requirementPlaceholder:
        'Language and framework, database, integrations, the responsibilities you are handing over, and your target start date.',
      subject: 'Backend developer hiring enquiry',
    }),
  },

  overview: {
    eyebrow: 'Overview',
    title: 'Hire Backend Developers Who Fit Your Application and Team',
    paragraphs: [
      'Hire backend developers who can work within your application architecture, technical environment and established delivery practices — adding the skills you need without restructuring the team around them.',
      'Developers contribute to server-side logic, APIs, databases, cloud-connected systems, application modernization and ongoing development, based on your product requirements and current priorities. They work directly with your existing team and follow your communication, project-management, source-control, code-review, testing and deployment workflows.',
      'Backend developer rates start at $14 per hour. Final pricing depends on the required skills, experience level, project responsibilities, engagement model and duration.',
    ],
  },

  fit: {
    eyebrow: 'What the Trial Tests',
    title: 'Evaluate Your Developer Through Practical Work',
    body: 'The 40-hour risk-free trial lets you evaluate a backend developer through work connected to your application, stack and engineering expectations. These are the five things worth watching.',
    columns: ['What to assess', 'What good looks like'],
    rows: [
      {
        problem: 'Technical execution and architecture',
        solution:
          'How the developer approaches server-side work, handles dependencies, and applies language, framework and database knowledge — and how they reason about component boundaries, data flow, integrations and maintainability rather than shipping the first thing that works.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        problem: 'API and database work',
        solution:
          'Endpoint design, query handling, data-access decisions, validation and error management. Watch for schema thinking and query cost, because a design that is fine at ten thousand rows and wrong at ten million looks identical during a demo.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        problem: 'Code quality and testing practices',
        solution:
          'Readability, structure, maintainability and alignment with your coding standards — plus how the developer validates expected behaviour, handles edge cases, and uses automated testing rather than manual confirmation.',
        image: '/images/landing/services/svc-evaluation-llmops.webp',
      },
      {
        problem: 'Communication and requirement understanding',
        solution:
          'How clearly the developer communicates progress, questions, dependencies and blockers — and whether they translate business and technical requirements into practical backend decisions instead of building exactly what was literally asked for.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        problem: 'Workflow compatibility',
        solution:
          'Whether the developer can work inside your source-control practices, review process, sprint routines and delivery expectations. This is the criterion that most often decides whether a technically strong hire actually works out.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
    ],
  },

  capabilities: {
    eyebrow: 'Responsibilities',
    title: 'Backend Work Our Developers Can Own',
    body: 'Server-side responsibilities across the whole application lifecycle, in new codebases and long-lived ones alike.',
    items: [
      {
        name: 'Server-Side Application Logic',
        body: 'Build and maintain application logic for web platforms, mobile apps, SaaS products, customer portals and internal systems, across new and existing codebases.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        name: 'API Development and Integration',
        body: 'Create, document, maintain and connect REST or GraphQL APIs — internal services, frontend communication, third-party platforms, payment systems, business tools and data sources.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        name: 'Database Work',
        body: 'Design schemas, write and optimize queries, maintain data-access layers and support data consistency across PostgreSQL, MySQL, MongoDB, SQL Server and other approved environments.',
        image: '/images/landing/services/svc-model-selection.webp',
      },
      {
        name: 'Authentication and Authorization',
        body: 'Implement authentication flows, role-based access, permissions and backend authorization logic according to your application requirements and approved architecture.',
        image: '/images/landing/services/svc-security-governance.webp',
      },
      {
        name: 'Cloud and Deployment Collaboration',
        body: 'Contribute to deployment workflows using AWS, Azure, Google Cloud, Docker, Kubernetes and CI/CD tools, coordinating with your DevOps or infrastructure team.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        name: 'Backend Modernization',
        body: 'Refactor legacy components, update frameworks, improve maintainability and replace tightly coupled application logic through planned, incremental changes.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
      {
        name: 'Monitoring and Observability',
        body: 'Add or maintain application logging, metrics, tracing, dashboards and alerts that help your team understand backend behaviour and investigate operational issues.',
        image: '/images/landing/services/svc-evaluation-llmops.webp',
      },
      {
        name: 'Migration Work',
        body: 'Support planned database, framework, infrastructure or component migrations — assessment, implementation, testing, staged transition and post-migration checks inside your technical plan.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        name: 'Testing, Performance and Maintenance',
        body: 'Write automated and integration tests, monitor server-side performance, investigate issues, resolve defects and maintain existing components through ongoing release cycles.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
    ],
  },

  midCta: {
    eyebrow: 'Start With a Trial',
    title: 'Start Your Backend Engagement With Soft Suave',
    body: 'Share your backend technology, responsibilities, experience requirements and engagement preferences. Review matched talent and evaluate practical work through the 40-hour risk-free trial.',
    cta: { label: 'Start Your 40-Hour Trial', href: '#enquiry' },
  },

  engagement: {
    eyebrow: 'Engagement Models',
    title: 'Flexible Ways to Hire Backend Developers',
    body: 'Choose the model that fits how defined the work is and how much it is expected to change.',
    blocks: [
      {
        label: 'Dedicated developer',
        body: 'A backend developer who works closely with your team and stays focused on your product, priorities and ongoing development needs.',
      },
      {
        label: 'Time and material',
        body: 'Flexible capacity for evolving requirements, changing priorities and ongoing work where the complete scope is not fixed in advance.',
      },
      {
        label: 'Fixed bid',
        body: 'For clearly defined work with agreed requirements, deliverables, responsibilities and completion criteria established before development begins.',
      },
    ],
  },

  process: {
    eyebrow: 'Hiring Process',
    title: 'How to Hire a Backend Developer From Soft Suave',
    body: 'Requirement review, developer matching, interviews, practical evaluation, selection, and onboarding into your existing development workflow.',
    steps: [
      {
        n: '01',
        name: 'Share Your Backend Requirements',
        body: 'Tell us about your application, technology stack, required experience, responsibilities, availability and preferred engagement model.',
      },
      {
        n: '02',
        name: 'Review Matched Developer Profiles',
        body: 'Receive profiles matched to your stack and responsibilities, typically within 24 to 48 hours of the requirement review.',
      },
      {
        n: '03',
        name: 'Interview the Shortlist',
        body: 'Interview backend developers to assess expertise, architecture thinking, communication, availability, approach and team fit.',
      },
      {
        n: '04',
        name: 'Run the 40-Hour Risk-Free Trial',
        body: 'Assign practical work that reflects the engagement, then evaluate execution, code quality, communication, responsiveness and compatibility.',
      },
      {
        n: '05',
        name: 'Select and Onboard Your Developer',
        body: 'Choose the right developer, finalise the engagement, and provide the tools, systems, access and processes the work requires.',
      },
    ],
  },

  specialisations: {
    eyebrow: 'Hire by Technology',
    title: 'Choose Backend Developers by Technology',
    body: 'Select against your application architecture, existing codebase, integration requirements and long-term development plans. Laravel, Django and Ruby on Rails specialists are available on the same terms.',
    items: [
      {
        key: 'api',
        name: 'Node.js Developers',
        body: 'Event-driven services, APIs, real-time features, microservices and backend components in JavaScript or TypeScript.',
      },
      {
        key: 'backend',
        name: 'NestJS Developers',
        body: 'Structured, modular TypeScript backends with dependency injection, validation, guards and testable service boundaries built in from the start.',
      },
      {
        key: 'integration',
        name: '.NET Developers',
        body: 'Enterprise applications, APIs, cloud-connected systems and existing Microsoft environments using C#, ASP.NET and .NET Core.',
      },
      {
        key: 'data',
        name: 'Java Developers',
        body: 'Enterprise platforms, distributed services, application backends, integrations and long-running systems using Java and its established frameworks.',
      },
      {
        key: 'automation',
        name: 'Python Developers',
        body: 'APIs, business applications, data-connected systems, automation workflows and backend components with Django, Flask and FastAPI.',
      },
      {
        key: 'performance',
        name: 'Go Developers',
        body: 'Concurrent services, APIs, infrastructure components and performance-sensitive backend systems where throughput and latency are the requirement.',
      },
      {
        key: 'web',
        name: 'PHP Developers',
        body: 'Server-side applications, business platforms, APIs, content systems and integrations across established or modern PHP environments.',
      },
      {
        key: 'security',
        name: 'Authentication Specialists',
        body: 'OAuth 2.0, OpenID Connect and JWT flows, role-based access control and permission models designed against your own architecture.',
      },
      {
        key: 'cloud',
        name: 'Cloud Backend Engineers',
        body: 'Backend services designed for AWS, Azure or Google Cloud, with containerization, managed data services and deployment pipelines around them.',
      },
    ],
  },

  comparison: hiringComparison({
    title: 'Soft Suave vs an In-House Hire vs a Freelancer',
    body: 'Backend decisions outlive the person who made them, which makes continuity and accountability the factors worth weighing hardest.',
    column: 'Soft Suave developer',
  }),

  techStack: {
    eyebrow: 'Technology Stack',
    title: 'Backend Technologies Our Developers Work With',
    body: 'The languages, frameworks, databases, cloud platforms and tools your application requires — matched to what you run, not to a preference of ours.',
    groups: [
      {
        name: 'Languages and Frameworks',
        items: ['Node.js', 'Express.js', 'NestJS', 'TypeScript', 'Java Spring Boot', 'C# .NET', 'Python Django', 'FastAPI', 'PHP Laravel', 'Ruby on Rails', 'Go'],
      },
      {
        name: 'APIs and Integrations',
        items: ['REST', 'GraphQL', 'gRPC', 'WebSockets', 'OpenAPI', 'Postman'],
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
        items: ['AWS', 'Azure', 'Google Cloud'],
      },
      {
        name: 'Containers and Infrastructure',
        items: ['Docker', 'Kubernetes', 'Terraform'],
      },
      {
        name: 'Testing',
        items: ['JUnit', 'NUnit', 'PyTest', 'Jest', 'Postman', 'Apache JMeter'],
      },
      {
        name: 'CI/CD and Version Control',
        items: ['Git', 'GitHub', 'GitLab', 'Bitbucket', 'Jenkins', 'GitHub Actions', 'Azure DevOps'],
      },
    ],
  },

  faq: {
    eyebrow: 'FAQs',
    title: 'Questions About Hiring Backend Developers',
    body: 'Answers on hiring, evaluating, working with and paying backend developers.',
    items: [
      {
        q: 'How do I hire a backend developer from Soft Suave?',
        a: 'Share your backend requirements, review matched profiles, interview suitable developers, and evaluate your preferred candidate through the 40-hour risk-free trial. You can then select the developer and begin onboarding them into your team.',
      },
      {
        q: 'What does the 40-hour risk-free trial cover?',
        a: 'It lets you assess the developer in the way that best fits your requirements. Assign relevant tasks and review their technical ability, communication and team fit before making a longer commitment.',
      },
      {
        q: 'How quickly can I receive matched backend developer profiles?',
        a: 'Most matched profiles are shared within 24 to 48 hours after we review your requirements. Timing may vary depending on the required skills, experience, availability, engagement model and responsibilities.',
      },
      {
        q: 'How quickly can a backend developer be onboarded?',
        a: 'Onboarding timing depends on developer selection, engagement confirmation, access requirements, documentation and your internal setup process. It begins once the developer is selected and the working arrangements are finalised.',
      },
      {
        q: 'What technologies do your backend developers work with?',
        a: 'Technologies including Java, .NET, C#, PHP, Laravel, Python, Django, Node.js, NestJS, Go, Ruby on Rails, PostgreSQL, MySQL, MongoDB, SQL Server, AWS, Azure and Google Cloud.',
      },
      {
        q: 'Can I hire one backend developer or a complete backend team?',
        a: 'Either. Team composition depends on the required technologies, workload, supporting roles and preferred engagement structure — a wider engagement can include QA, DevOps and technical leadership alongside the developers.',
      },
      {
        q: 'Can your developers work with my existing development team?',
        a: 'Yes. Backend developers can work within your existing engineering workflow, using your communication tools, source-control practices, sprint routines, review process, testing standards, documentation requirements and deployment procedures.',
      },
      {
        q: 'How do I evaluate a backend developer before hiring?',
        a: 'Evaluate through representative backend work, not interviews alone. Review technical execution, architecture decisions, API or database work, code quality, testing, communication, responsiveness, requirement understanding and compatibility with your working process.',
      },
      {
        q: 'Can your developers work across different time zones?',
        a: 'Yes, with 4 to 6 hours of overlap based on your requirements. Working schedules can accommodate stand-ups, technical reviews, handovers, response expectations and asynchronous communication.',
      },
      {
        q: 'What factors determine the cost of hiring a backend developer?',
        a: 'Experience, technology, engagement model, engagement length, region, responsibilities and technical complexity. Requirements involving architecture ownership, migrations, uncommon technologies, distributed systems or complex integrations may call for more specialised experience.',
      },
      {
        q: 'How much does it cost to hire a back-end developer?',
        a: 'Backend developer rates start at $14 per hour. Final pricing depends on the required skills, experience level, project responsibilities, engagement model and duration.',
      },
    ],
  },
};
