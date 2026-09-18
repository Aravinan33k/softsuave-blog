/**
 * Content for `/hire-web-app-developers`.
 *
 * Source: softsuave.com/hire-web-app-developers, and nothing else. Section for
 * section, the live page maps onto this surface as:
 *
 *   hero            → the H1, its two paragraphs of sub-copy and the five bullets
 *   overview        → "Hire Web Application Developers for Your Product"
 *   capabilities    → "Web App Developers for Your Product Requirements" (8 cards)
 *   specialisations → "Hire Web App Developers by Technology" (12 cards)
 *   engagement      → "Flexible Ways to Hire Web App Developers" (3 models)
 *   midCta          → "Find the Right Developer Before You Commit"
 *   globalDelivery  → "Global Delivery for Distributed Development Teams"
 *   process         → "Our Process for Hiring a Web App Developer" (4 steps)
 *   techStack       → "Technology Expertise for Modern Web Applications" (7 groups)
 *   faq             → the ten questions, verbatim
 *
 * No `comparison`: this page runs no Soft Suave/in-house/freelancer table, and
 * no rate table either — it states only that rates start at $14 per hour. Its
 * "Why Hire Remote Web App Developers from Soft Suave?" cards are the company's
 * own claims, so they stay with the homepage's Why band.
 */

import type { HireRolePageContent } from './types';
import { heroForm } from './shared';

export const webApp: HireRolePageContent = {
  key: 'hire-web',
  slug: '/hire-web-app-developers',
  name: 'Hire Web App Developers',
  serviceType: 'Web application development staffing',

  /** Live order: clients, overview, capabilities, expertise, hiring options, trial, why us, global delivery, process, technologies, success stories, testimonials, FAQ. */
  order: [
    'clients',
    'overview',
    'capabilities',
    'specialisations',
    'engagement',
    'midCta',
    'whyRole',
    'globalDelivery',
    'process',
    'techStack',
    'caseStudies',
    'testimonials',
    'faq',
  ],

  meta: {
    title: 'Hire Web App Developers | Remote with 40-Hour Risk-Free Trial',
    description:
      'Hire web app developers matched to your technology stack, product requirements, and delivery process. 40-hour risk-free trial, from $14 per hour.',
  },

  hero: {
    titleLines: ['Hire Web App Developers', 'for Scalable Digital Products'],
    body: [
      'Hire web app developers matched to your technology stack, product requirements, and delivery process. Build new applications, modernize existing platforms, complete integrations, or add engineering capacity with specialists selected for the work your team needs to deliver.',
      'Review relevant profiles, interview specialists directly, and evaluate their technical execution through a 40-hour risk-free trial before extending the engagement.',
    ],
    points: [
      'Project-Ready Developer Profiles',
      '400+ AI & Engineering Specialists',
      '40-Hour Risk-Free Trial',
      'Flexible Hiring from $14/Hour',
      'Direct Developer Collaboration',
    ],
    form: heroForm({
      title: 'Hire Skilled Web App Developers',
      requirementLabel: 'Project Requirements',
      requirementPlaceholder:
        'Application type, current stack, integrations, responsibilities, and the start date you are working toward.',
      subject: 'Web app developer hiring enquiry',
    }),
  },

  overview: {
    eyebrow: 'Overview',
    title: 'Hire Web Application Developers for Your Product',
    paragraphs: [
      'Hiring web application developers gives your business additional engineering capacity for building, modernizing, and maintaining browser-based products. The right developer should match your architecture, technologies, delivery process, security requirements, and the responsibilities involved in your project.',
      'Soft Suave helps you identify web app developers for hire based on the technical skills, experience, availability, and collaboration model your project requires. Review relevant profiles, interview shortlisted specialists, and use the 40-hour trial to evaluate technical skills, communication, and team fit before continuing the engagement.',
      'Our developers build SaaS platforms, customer portals, internal business applications, ecommerce applications, and API-integrated systems. They can also support application modernization, feature delivery, ongoing maintenance, and longer-term web application requirements.',
      'Our developer rates start at $14 per hour and vary by skill, experience, engagement model, and project requirements.',
    ],
  },

  capabilities: {
    eyebrow: 'Capabilities',
    title: 'Web App Developers for Your Product Requirements',
    body: 'Hire web application developers who turn your requirements into reliable digital products, strengthen existing systems, and help your business scale confidently and adapt as priorities evolve over time.',
    items: [
      {
        name: 'SaaS Application Development',
        body: 'Build and expand subscription-based applications with account management, user permissions, dashboards, workflow automation, billing integrations, reporting, and product features aligned with your operating model.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        name: 'Customer and Partner Portals',
        body: 'Develop secure web portals for customers, employees, vendors, and partners. Support account access, document sharing, communication, transactions, approvals, and self-service workflows within one application.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        name: 'Enterprise Web Applications',
        body: 'Create internal platforms that support operational workflows, reporting, resource management, data access, and collaboration across departments, systems, and distributed business teams.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        name: 'Ecommerce Applications',
        body: 'Build storefronts, marketplaces, ordering platforms, payment workflows, product-management systems, and customer experiences that connect with your business applications and external services.',
        image: '/images/landing/services/svc-proof-of-concept.webp',
      },
      {
        name: 'API and System Integrations',
        body: 'Connect your web application with PostgreSQL, MySQL, MongoDB, SQL Server, payment gateways, CRMs, ERPs, analytics platforms, identity providers, and third-party services through REST APIs, GraphQL, and integration workflows.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        name: 'Web Application Modernization',
        body: 'Update legacy applications, replace outdated frameworks, and migrate workloads to AWS, Azure, or Google Cloud. Improve architecture and containerization with Docker and Kubernetes while supporting delivery through CI/CD pipelines.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
      {
        name: 'Performance and Scalability Engineering',
        body: 'Improve application responsiveness, database performance, caching, infrastructure use, code quality, and system behavior as user demand and operational complexity increase.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
      {
        name: 'Application Maintenance and Enhancement',
        body: 'Add features, resolve technical issues, update dependencies, and strengthen automated testing, integration testing, and performance testing while supporting the continuous development of existing web applications.',
        image: '/images/landing/services/svc-security-governance.webp',
      },
    ],
  },

  midCta: {
    eyebrow: 'Start With a Trial',
    title: 'Find the Right Developer Before You Commit',
    body: 'Select the engagement model that fits your project, then use the 40-hour risk-free trial to assess developer performance before making a longer-term commitment with confidence.',
    cta: { label: 'Start Your 40-Hour Trial', href: '#enquiry' },
  },

  engagement: {
    eyebrow: 'Hiring Options',
    title: 'Flexible Ways to Hire Web App Developers',
    body: 'Choose an engagement approach that reflects your application scope, delivery responsibilities, required flexibility, and the way your existing team works.',
    blocks: [
      {
        label: 'Dedicated Developer',
        body: 'Add a developer who works closely with your team on product enhancements, ongoing development, application maintenance, modernization, or longer-term technical requirements.',
      },
      {
        label: 'Time and Material',
        body: 'Use a flexible model for evolving applications where scope, technical requirements, delivery priorities, or resource requirements may change during development.',
      },
      {
        label: 'Fixed Bid',
        body: 'Use a fixed-bid model where requirements, deliverables, milestones, responsibilities, and acceptance conditions are sufficiently defined before development begins.',
      },
    ],
  },

  globalDelivery: {
    eyebrow: 'Global Delivery',
    title: 'Global Delivery for Distributed Development Teams',
    paragraphs: [
      'Soft Suave supports distributed collaboration through agreed meetings, shared development tools, sprint routines, task tracking, and documentation, with 4 - 6 hours of overlap with US and UK business hours.',
      'Our web app developers in India work from Chennai and Bengaluru, supported by our delivery presence in the United States. They work within your existing tools and workflows, including source control, project management, sprint routines, code review, and deployment.',
    ],
  },

  process: {
    eyebrow: 'Our Process',
    title: 'Our Process for Hiring a Web App Developer',
    body: 'Move from initial requirements to developer evaluation through a structured process designed to assess technical fit, communication, availability, and compatibility with your existing team.',
    steps: [
      {
        n: '01',
        name: 'Share the JD',
        body: 'Share the required technologies, responsibilities, experience, and project expectations.',
      },
      {
        n: '02',
        name: 'Review Shortlisted Profiles',
        body: 'Review developers matched to your technology stack and project requirements.',
      },
      {
        n: '03',
        name: 'Begin the 40-Hour Risk-Free Trial',
        body: 'Interview shortlisted developers, then evaluate their fit through practical work during the trial.',
      },
      {
        n: '04',
        name: 'Onboard and Scale',
        body: 'Sign an SLA/NDA, then integrate developers into your tools, workflows, and communication routines.',
      },
    ],
  },

  specialisations: {
    eyebrow: 'Developer Expertise',
    title: 'Hire Web App Developers by Technology',
    body: 'Select web application developers according to your application architecture, existing stack, integration requirements, and planned development work to strengthen delivery, maintain compatibility, and support evolving product and business needs confidently.',
    items: [
      {
        key: 'dotnet',
        name: 'Hire .NET Developers',
        body: 'Build enterprise applications, APIs, cloud-connected systems, and business platforms using .NET, ASP.NET Core, C#, and Azure.',
        href: '/hire-dot-net-developers',
      },
      {
        key: 'php',
        name: 'Hire PHP Developers',
        body: 'Develop custom platforms, ecommerce applications, portals, APIs, and content-driven systems using PHP and its established ecosystem.',
        href: '/hire-php-developers',
      },
      {
        key: 'java',
        name: 'Hire Java Developers',
        body: 'Build enterprise systems, high-traffic platforms, backend services, and API-driven applications using Java and its supporting frameworks.',
        href: '/hire-java-developers',
      },
      {
        key: 'angular',
        name: 'Hire Angular Developers',
        body: 'Create structured single-page applications, dashboards, portals, and complex user interfaces using Angular, TypeScript, and reusable components.',
        href: '/hire-angularjs-developers',
      },
      {
        key: 'node',
        name: 'Hire NodeJS Developers',
        body: 'Develop APIs, real-time services, backend applications, and event-driven systems using Node.js and the JavaScript server-side ecosystem.',
        href: '/hire-nodejs-developers',
      },
      {
        key: 'react',
        name: 'Hire ReactJS Developers',
        body: 'Build responsive interfaces, dashboards, portals, and interactive single-page applications using React and component-based frontend architecture.',
        href: '/hire-reactjs-developers',
      },
      {
        key: 'laravel',
        name: 'Hire Laravel Developers',
        body: 'Create maintainable PHP applications, APIs, admin systems, ecommerce platforms, and business workflows using the Laravel framework.',
        href: '/hire-laravel-developer',
      },
      {
        key: 'django',
        name: 'Hire Django Developers',
        body: "Develop data-driven platforms, portals, backend applications, and APIs using Django and Python's established development ecosystem.",
        href: '/hire-django-developer',
      },
      {
        key: 'python',
        name: 'Hire Python Developers',
        body: 'Build web platforms, backend services, APIs, automation workflows, and data-connected applications using Python and relevant frameworks.',
        href: '/hire-python-developers',
      },
      {
        key: 'rails',
        name: 'Hire Ruby on Rails Developers',
        body: 'Develop SaaS platforms, MVPs, portals, and database-driven applications using Ruby on Rails and convention-based development practices.',
        href: '/hire-ruby-on-rails-developer',
      },
      {
        key: 'mern',
        name: 'Hire MERN Stack Developers',
        body: 'Build interactive, component-driven web applications with MongoDB, Express.js, React, and Node.js across one JavaScript stack.',
        href: '/hire-mern-stack-developers-india',
      },
      {
        key: 'mean',
        name: 'Hire MEAN Stack Developers',
        body: 'Develop full-stack web applications using MongoDB, Express.js, Angular, and Node.js with a unified JavaScript technology stack.',
        href: '/hire-mean-stack-developers-india',
      },
    ],
  },

  whyRole: {
    eyebrow: 'Why Us',
    title: 'Why Hire Remote Web App Developers from Soft Suave?',
    body: 'Gain reliable engineering support that reduces hiring uncertainty, strengthens collaboration, and helps your web application progress as your business and technical priorities evolve.',
    items: [
      {
        key: 'trial',
        name: '40-Hour Risk-Free Trial',
        body: 'Evaluate code quality, communication, responsiveness, and process compatibility through practical work.',
      },
      {
        key: 'specialists',
        name: '400+ AI & Engineering Specialists',
        body: 'Access developers across web application engineering, cloud, DevOps, testing, integrations, data, and AI capabilities for your requirements.',
      },
      {
        key: 'iso',
        name: 'ISO/IEC 27001:2022 Certified',
        body: 'Soft Suave operates an ISO/IEC 27001:2022-certified information security management system that supports secure practices across development and delivery.',
      },
      {
        key: 'ai',
        name: 'AI-Enabled Engineering Practices',
        body: 'Apply AI-assisted engineering practices while retaining human review and project-specific technical judgment.',
      },
      {
        key: 'experience',
        name: '13+ Years of Technology Expertise',
        body: 'Apply 13+ years of technology expertise to application development, modernization, integrations, and long-term engineering requirements.',
      },
      {
        key: 'contracts',
        name: 'NDAs and Defined Service Levels',
        body: 'Engagements are covered by signed NDAs and service-level agreements before development begins.',
      },
    ],
  },

  techStack: {
    eyebrow: 'Technologies',
    title: 'Technology Expertise for Modern Web Applications',
    body: 'Work with technologies aligned to your existing architecture, application requirements, and long-term product direction instead of forcing your project into a predetermined stack.',
    groups: [
      {
        name: 'Frontend',
        items: [
          'React',
          'Next.js',
          'Angular',
          'Vue.js',
          'TypeScript',
          'JavaScript',
          'Tailwind CSS',
          'Redux',
        ],
      },
      {
        name: 'Backend',
        items: [
          'Node.js',
          '.NET',
          'Python',
          'Java',
          'PHP',
          'Laravel',
          'Django',
          'Ruby on Rails',
          'Express',
        ],
      },
      {
        name: 'Databases',
        items: ['PostgreSQL', 'MySQL', 'Mongo DB', 'SQL Server', 'Redis'],
      },
      {
        name: 'APIs and Integrations',
        items: [
          'REST APIs',
          'GraphQL',
          'OAuth 2.0',
          'Webhooks',
          'Payment gateways',
          'Third-party integrations',
        ],
      },
      {
        name: 'Cloud and DevOps',
        items: [
          'Google Cloud',
          'AWS',
          'Azure',
          'Docker',
          'Kubernetes',
          'CI/CD',
          'GitHub Actions',
          'Terraform',
        ],
      },
      {
        name: 'Testing',
        items: ['Jest', 'Cypress', 'Playwright', 'Selenium', 'JUnit', 'PyTest'],
      },
      {
        name: 'AI and Automation',
        items: [
          'OpenAI API',
          'LangChain',
          'Hugging Face',
          'Vector databases',
          'MCP',
          'RAG pipelines',
        ],
      },
    ],
  },

  faq: {
    eyebrow: 'Ask Us',
    title: 'Frequently Asked Questions About Hiring Web App Developers',
    body: 'Find clear answers to common questions about hiring the right web app developer for your project.',
    items: [
      {
        q: 'How do I hire web app developers from Soft Suave?',
        a: 'You can hire web app developers by sharing your technical and project requirements, reviewing matched profiles, interviewing shortlisted specialists, and beginning a 40-hour risk-free trial. After evaluation, the selected developer can be integrated into your tools, workflows, and delivery process.',
      },
      {
        q: 'Can I interview developers before hiring them?',
        a: 'Yes, you can interview shortlisted developers before starting an engagement. The interview helps you evaluate technical knowledge, relevant experience, communication, problem-solving approach, availability, and understanding of the responsibilities involved in your web application project.',
      },
      {
        q: 'What can I evaluate during the 40-hour trial?',
        a: 'You can evaluate technical execution, code quality, communication, responsiveness, requirement understanding, and compatibility with your team during the 40-hour risk-free trial. The evaluation can use practical responsibilities connected to the proposed engagement and your development environment.',
      },
      {
        q: 'Can I hire one developer or a complete team?',
        a: 'Yes, you can hire one web app developer or a complete web app development team based on your delivery requirements. The team can include specialists for frontend development, backend engineering, testing, integrations, cloud infrastructure, and related responsibilities.',
      },
      {
        q: 'Which technologies do your web developers support?',
        a: "Soft Suave's specialists support technologies including React, Next.js, Angular, Vue.js, Node.js, .NET, Java, Python, PHP, PostgreSQL, MongoDB, AWS, Azure, Docker, and Kubernetes. The final technology combination depends on your existing architecture and application requirements.",
      },
      {
        q: 'Can developers work with our existing engineering team?',
        a: 'Yes, developers can work with your existing engineering team through shared repositories, project-management platforms, communication tools, sprint routines, documentation, testing processes, and code-review practices. The collaboration approach is agreed around your established development workflow and role requirements.',
      },
      {
        q: 'How do you protect our intellectual property?',
        a: 'Intellectual-property responsibilities can be documented through the applicable engagement agreement and NDA before development begins. Project access, repositories, credentials, and development environments should follow the controls agreed for your organization and the specific responsibilities assigned to the developer.',
      },
      {
        q: 'How much does it cost to hire web app developers?',
        a: 'Developer rates start at $14 per hour and vary by skill, experience, engagement model, and project requirements. The final rate also depends on responsibilities, duration, team composition, and collaboration needs. Request a tailored rate card for your required role.',
      },
      {
        q: 'How quickly can I receive matched developer profiles?',
        a: 'Matched developer profiles are typically shared within 24–48 hours after we review your technologies, responsibilities, experience requirements, availability, and engagement needs. Timing may vary for highly specialized roles.',
      },
      {
        q: 'Can developers overlap with US or UK working hours?',
        a: 'Yes. We can arrange 4–6 hours of working-time overlap based on your collaboration needs and developer availability. The preferred hours, meeting schedule, and communication expectations can be agreed before onboarding.',
      },
    ],
  },
};
