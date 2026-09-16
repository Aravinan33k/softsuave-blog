/**
 * Content for `/hire-dedicated-developers`.
 *
 * Source: softsuave.com/hire-dedicated-developers — the six reasons, the nine
 * dedicated-developer roles, the comparison table, the four-step process, the
 * published rate tiers, the six "challenges and how to handle them" items (which
 * become the `fit` selector, because that is exactly the problem/answer pairing
 * it renders), the technology-stack groups and the FAQs.
 *
 * The live page's "97% client retention" and "150+ global clients" figures are
 * not repeated: neither appears anywhere else on this site, and a statistic that
 * exists on one page only is a statistic nobody is maintaining. The verified
 * figures — 13+ years, 400+ specialists — are used instead.
 *
 * This is the role page whose nine cards are the other eight role pages, so its
 * specialisation grid is the hub for the whole set and every card links to the
 * page it names.
 */

import type { HireRolePageContent } from './types';
import { heroForm, hiringComparison, rateTiers } from './shared';

export const dedicated: HireRolePageContent = {
  key: 'hire-dedicated',
  slug: '/hire-dedicated-developers',
  name: 'Hire Dedicated Developers',
  serviceType: 'Dedicated development team staffing',

  meta: {
    title: 'Hire Dedicated Developers in India | Vetted Teams From $14/hr',
    description:
      'Hire dedicated developers who work as an extension of your in-house team. Profiles within 48 hours, a 40-hour risk-free trial, and flexible scaling from $14/hour.',
  },

  hero: {
    eyebrow: 'Hire Developers by Role',
    titleLines: ['Hire Dedicated Developers', 'Who Work as Your Own Team'],
    body: [
      'Soft Suave provides dedicated developers from India who can join your team within 48 hours and work as an extension of your in-house engineering group — your tools, your workflows, your priorities.',
      'A dedicated developer stays focused on your product rather than splitting time across several clients, which is the whole difference between added capacity and a contractor you have to re-brief every week.',
    ],
    points: [
      'Developers who join within 48 hours',
      'Dedicated developers from $14 / hour',
      '40-hour risk-free trial',
      'Time-zone and language-aligned teams',
      'Airtight NDA and IP protection',
    ],
    form: heroForm({
      title: 'Hire a dedicated development team',
      requirementLabel: 'Your team requirement',
      requirementPlaceholder:
        'Roles needed, technologies, team size, expected duration, working-hour overlap and when you want to start.',
      subject: 'Dedicated developer hiring enquiry',
    }),
  },

  overview: {
    eyebrow: 'Overview',
    title: 'Hire Dedicated Developers Who Work as an Extension of Your Team',
    paragraphs: [
      'Scale faster with developers who integrate into the team you already have, deliver consistently, and adapt as your business needs change — without the delay of a full recruitment cycle for every role.',
      'A dedicated engagement differs from project outsourcing in one important way: the developer is yours to direct. You set priorities, run the reviews, and own the roadmap. Soft Suave handles sourcing, contracts, administration and continuity, including backup cover when someone is unavailable.',
      'Soft Suave brings 13+ years of product development experience and 400+ AI and engineering specialists across more than thirty technology stacks. Dedicated developer rates start at $14 per hour, and every engagement can begin with a 40-hour risk-free trial.',
    ],
  },

  fit: {
    eyebrow: 'What to Plan For',
    title: 'Dedicated Hiring Done Properly: What to Get Right',
    body: 'Dedicated engagements fail for a small number of predictable reasons, and all of them are addressable before the engagement starts. These are the six worth planning for.',
    columns: ['The risk', 'How to handle it'],
    rows: [
      {
        problem: 'You cannot verify skills from a CV',
        solution:
          'Use technical interviews, coding assessments and a review of past project work before selecting anyone — then confirm it with real work. The 40-hour risk-free trial exists precisely because a CV and an interview together still leave the most important question unanswered.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        problem: 'Time-zone differences cost you a day per decision',
        solution:
          'Set overlapping working hours and a fixed meeting schedule before onboarding rather than after the first delay. Four to six hours of overlap is usually enough for stand-ups, reviews and the unplanned conversations that actually unblock work.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        problem: 'Communication gaps turn into rework',
        solution:
          'Choose developers with strong English communication, and define update frequency and format from the start. Most rework in distributed teams traces back to an assumption nobody stated, not to a skill nobody had.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        problem: 'Data security and IP are exposed',
        solution:
          'Use NDAs, access controls, secure repositories and role-based permissions, so each developer reaches exactly what their responsibilities require. Soft Suave’s ISO/IEC 27001:2022-certified information security management system covers development and delivery operations.',
        image: '/images/landing/services/svc-security-governance.webp',
      },
      {
        problem: 'Nobody is accountable for progress',
        solution:
          'Track work through your project-management tools, sprint reviews, daily updates and milestone tracking — with the developer inside your process rather than reporting into it from outside.',
        image: '/images/landing/services/svc-evaluation-llmops.webp',
      },
      {
        problem: 'People leave and continuity breaks',
        solution:
          'Work with a partner stable enough to provide backup support and scale resources when needed, and insist on documentation as a deliverable. Continuity is a contractual arrangement, not a hope.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
    ],
  },

  capabilities: {
    eyebrow: 'Why Dedicated',
    title: 'What a Dedicated Development Team Gives You',
    body: 'The six things that separate a dedicated engagement from both a permanent hire and a project handed to an agency.',
    items: [
      {
        name: 'Focused Expertise',
        body: 'Developers whose skills match your exact project needs, technology stack and development goals, rather than the closest available generalist.',
        image: '/images/landing/services/svc-model-selection.webp',
      },
      {
        name: 'Full-Time Project Focus',
        body: 'Dedicated developers stay aligned with your priorities instead of splitting their week across several clients — which is what makes context accumulate rather than reset.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        name: 'Smooth Team Integration',
        body: 'Developers work with your tools, workflows, communication channels and internal processes, so collaboration needs no translation layer.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        name: 'Flexible Scaling',
        body: 'Add or reduce developers as project demand changes, without the delay of a traditional hiring cycle for each adjustment.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        name: 'Clear Communication',
        body: 'Regular updates, progress tracking and review calls keep your team informed and aligned, with reporting cadence agreed before onboarding.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        name: 'Cost Efficiency',
        body: 'Reduce recruitment, training, infrastructure and long-term employment costs while accessing skilled development talent — with no recurring overhead beyond the hourly rate.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
      {
        name: 'Project Ownership You Keep',
        body: 'You set the priorities, run the reviews and own the roadmap. Soft Suave handles sourcing, contracts, administration and continuity.',
        image: '/images/landing/services/svc-proof-of-concept.webp',
      },
      {
        name: 'Documentation and Handover',
        body: 'Documentation is treated as a deliverable, so your team can operate, extend and audit the work independently of the individuals who did it.',
        image: '/images/landing/services/svc-evaluation-llmops.webp',
      },
    ],
  },

  midCta: {
    eyebrow: 'Start With a Trial',
    title: 'Build Your Dedicated Team This Week',
    body: 'Share your roles and technologies, review profiles within 48 hours, and evaluate each developer through a 40-hour risk-free trial before onboarding.',
    cta: { label: 'Start Your 40-Hour Trial', href: '#enquiry' },
  },

  engagement: {
    eyebrow: 'Engagement Models',
    title: 'Flexible Engagement Models',
    body: 'Dedicated hiring is one model among three, and you can move between them if your scope, timeline or resource needs change after the engagement begins.',
    blocks: [
      {
        label: 'Dedicated team',
        body: 'Developers, QA engineers, DevOps engineers, tech leads and project-management support who work as an extension of your team for as long as the work continues.',
      },
      {
        label: 'Time and material',
        body: 'Flexible capacity for evolving requirements, with effort reviewed, reprioritised and adjusted each development cycle as your roadmap changes.',
      },
      {
        label: 'Fixed price',
        body: 'For clearly defined work with agreed requirements, deliverables, milestones and completion criteria established before development begins.',
      },
    ],
  },

  process: {
    eyebrow: 'Hiring Process',
    title: 'How to Hire Dedicated Developers',
    body: 'From a requirement to a team inside your workflow, with every developer evaluated on real work before onboarding.',
    steps: [
      {
        n: '01',
        name: 'Share Your Developer Requirement',
        body: 'Tell us your project scope, the roles and skills needed, team size, timeline and preferred hiring model.',
      },
      {
        n: '02',
        name: 'Review Curated Developer Profiles',
        body: 'Receive shortlisted profiles matched to your skills, goals, availability and team needs — typically within 48 hours of the requirement review.',
      },
      {
        n: '03',
        name: 'Interview and Select',
        body: 'Interview the shortlist yourself to assess technical skill, communication and fit, and approve the developers who will join your team.',
      },
      {
        n: '04',
        name: 'Start the 40-Hour Risk-Free Trial',
        body: 'Test coding skill, communication, quality and workflow fit on real project work before onboarding — and ask for another profile if the fit is wrong.',
      },
      {
        n: '05',
        name: 'Onboard and Scale',
        body: 'Finalise the SLA and NDA, set up communication and access, integrate the team into your workflow, and add or adjust capacity as demand changes.',
      },
    ],
  },

  specialisations: {
    eyebrow: 'Roles You Can Hire',
    title: 'Dedicated Developer Roles Available',
    body: 'Hire one specialist or assemble a complete team. Each role below has its own page with the technologies, process and FAQs specific to it.',
    items: [
      {
        key: 'code',
        name: 'Software Developers',
        body: 'Build custom software, modernize legacy systems, automate workflows and add AI capabilities, aligned with your business goals.',
        href: '/hire-software-developers',
      },
      {
        key: 'web',
        name: 'Web App Developers',
        body: 'Secure, responsive, performance-focused web applications with modern frameworks, API integrations and scalable architecture.',
        href: '/hire-web-app-developers',
      },
      {
        key: 'mobile',
        name: 'Mobile App Developers',
        body: 'Intuitive iOS and Android apps with smooth navigation, clean interfaces, secure backend connectivity and device-friendly performance.',
        href: '/hire-mobile-app-developers',
      },
      {
        key: 'frontend',
        name: 'Frontend Developers',
        body: 'Fast, responsive, engaging interfaces in React, Angular, Vue and Next.js, with reusable components and Core Web Vitals in view.',
        href: '/hire-frontend-application-developer',
      },
      {
        key: 'backend',
        name: 'Backend Developers',
        body: 'Secure, scalable backend systems built for performance and reliability — APIs, databases, authentication and integrations.',
        href: '/hire-backend-application-developer',
      },
      {
        key: 'ai',
        name: 'AI Developers',
        body: 'Generative AI, LLM applications, RAG, machine learning and computer vision, added to products that already have users.',
        href: '/hire-ai-developer',
      },
      {
        key: 'devops',
        name: 'DevOps Engineers',
        body: 'Faster deployment, cloud reliability, automation, monitoring, CI/CD pipelines, infrastructure management and containerization.',
        href: '/hire-devops-developers',
      },
      {
        key: 'qa',
        name: 'QA Engineers',
        body: 'Manual and automation testing, regression checks, usability testing and performance validation for software you can ship.',
        href: '/hire-qa-testers-india',
      },
      {
        key: 'ecommerce',
        name: 'eCommerce Developers',
        body: 'Build and optimize online stores with custom features, payment flows, product catalogues, checkout improvements and third-party integrations.',
      },
    ],
  },

  comparison: hiringComparison({
    title: 'Soft Suave vs an In-House Hire vs a Freelancer',
    body: 'A dedicated engagement sits between a permanent hire and a freelancer, and takes the parts of each that matter most for continuous work.',
    column: 'Soft Suave dedicated developer',
  }),

  rates: rateTiers({
    title: 'Dedicated Developer Rates',
    body: 'Published tiers by experience level. Final pricing varies with role, technology stack, engagement model and overall project requirements.',
    role: 'Developer',
  }),

  techStack: {
    eyebrow: 'Technology Stack',
    title: 'Technology Coverage Across Our Bench',
    body: 'More than thirty technology stacks, so a dedicated team can be assembled against your architecture rather than the other way round.',
    groups: [
      {
        name: 'Frontend',
        items: ['React', 'Angular', 'Vue.js', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
      },
      {
        name: 'Backend',
        items: ['Node.js', 'Express', 'NestJS', 'Java', 'Python', 'Django', '.NET', 'PHP', 'Laravel'],
      },
      {
        name: 'Mobile',
        items: ['Flutter', 'Swift', 'Kotlin', 'Java', 'React Native', 'Ionic', 'NativeScript'],
      },
      {
        name: 'Databases',
        items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL Server', 'Redis', 'Firebase', 'SQLite'],
      },
      {
        name: 'Cloud and DevOps',
        items: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Terraform'],
      },
      {
        name: 'AI and Data',
        items: ['LLMs', 'RAG', 'LangChain', 'PyTorch', 'TensorFlow', 'Hugging Face', 'OpenAI API'],
      },
      {
        name: 'eCommerce',
        items: ['Shopify', 'Magento', 'WooCommerce', 'BigCommerce'],
      },
      {
        name: 'QA and Testing',
        items: ['Selenium', 'Cypress', 'Playwright', 'Appium', 'Postman', 'Apache JMeter'],
      },
    ],
  },

  faq: {
    eyebrow: 'FAQs',
    title: 'Questions About Hiring Dedicated Developers',
    body: 'Answers on time zones, cost, engagement models, NDAs, onboarding speed and team composition.',
    items: [
      {
        q: 'Will dedicated developers from Soft Suave work in our time zone?',
        a: 'Yes. Our dedicated developers can work flexible schedules that overlap your core business hours, so daily communication, meetings, progress updates and project discussions happen without major time-zone delays. Four to six hours of overlap is typical, agreed before onboarding.',
      },
      {
        q: 'What are the benefits of hiring dedicated developers in India?',
        a: 'It gives you access to skilled talent, reduces hiring delays, controls development costs and lets you scale teams faster. With Soft Suave you get developers who work as an extension of your team and stay focused on your project goals rather than splitting time across clients.',
      },
      {
        q: 'How is hiring dedicated developers different from hiring freelancers?',
        a: 'A dedicated developer is committed to your project for the engagement, works inside your tools and process, and is backed by a contract, an SLA and continuity cover. A freelancer is typically engaged per task, with availability and accountability that vary and no backup if they become unavailable.',
      },
      {
        q: 'Can I change the engagement model after hiring starts?',
        a: 'Yes. Soft Suave offers fixed-price, time-and-material and dedicated-team models, and you can discuss changes if your project scope, timeline or resource needs evolve after the engagement begins.',
      },
      {
        q: 'Do Soft Suave’s dedicated developers sign an NDA?',
        a: 'Yes. Developers sign an NDA before the engagement begins, to help protect your project idea, business data, source code and confidential information.',
      },
      {
        q: 'How much does it cost to hire dedicated developers from India?',
        a: 'Dedicated developer rates start at $14 per hour, with mid-level from $18 and senior from $25. Final pricing varies with the developer’s experience, role, technology stack, engagement model and overall project requirements.',
      },
      {
        q: 'How fast can Soft Suave onboard a dedicated developer?',
        a: 'Suitable profiles are shortlisted within 48 hours of receiving your requirement. After profile review, interview and approval, the selected developer can begin the 40-hour risk-free trial before long-term onboarding.',
      },
      {
        q: 'What happens if the dedicated developer is not a good fit after the trial?',
        a: 'We share another suitable profile based on your feedback, so you can evaluate the right talent before making a long-term commitment.',
      },
      {
        q: 'Can Soft Suave provide a full dedicated team or only individual developers?',
        a: 'Both. Based on your project needs you can hire developers, QA engineers, DevOps engineers, tech leads and project-management support as one dedicated team, or a single specialist.',
      },
      {
        q: 'What is the difference between onshore and offshore dedicated hiring?',
        a: 'Onshore developers work in your own country and time zone, usually at a higher rate. Offshore developers — in our case from Chennai and Bengaluru, with a delivery presence in the United States — work to an agreed overlap with your hours. The decision should rest on the overlap your process actually needs, not on cost alone.',
      },
    ],
  },
};
