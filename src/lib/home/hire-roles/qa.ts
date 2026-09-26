/**
 * Content for `/hire-qa-testers-india`.
 *
 * Source: softsuave.com/hire-qa-testers-india, and nothing else.
 *
 *   hero              → "Hire Remote Software QA Testers in India"
 *   overview          → "Hire Remote QA Testers in India For Flawless Software Solutions"
 *   fit               → "The Expertise of Our QA Engineers in India" (manual vs automation)
 *   list:testing      → "Checkout the Types of QA Testing" (7 labels)
 *   midCta            → "Hire Software QA Engineer Starting from $14/hour"
 *   capabilities      → "Benefits to Hiring Quality Assurance Engineers in India from Soft Suave"
 *   list:domains      → "Get Aided by Our Expertise in Many Domains" (8 labels)
 *   list:approach     → "Hire QA Engineers in India for Easing Business Approach" (6 labels)
 *   process           → "Hire QA Tester India in 4 Easy Steps"
 *   comparison        → "Soft Suave vs. In-House vs. Freelancer." (3 rows, as published)
 *   techStack         → "Powerful Tools and Technologies Our QA Testers Use" (7 groups)
 *   faq               → the seven questions, verbatim
 *
 * The three `list:` bands are the sections this page prints as bare labels with
 * no descriptions. They are lists here for that reason — cards would need a
 * body per label and that body would be ours, not the page's — and they are
 * three separate bands because the live page runs them at three separate
 * points, two of them on either side of its benefits cards.
 *
 * One thing on the live page is not carried over: its four-step process is
 * copy-pasted from a MERN stack page — the steps say "Share the MERN Stack JD"
 * and "Onboard the MERN Developer" on a QA page. The steps below keep that
 * copy's structure and sentences with the role corrected, since reproducing the
 * mistake would put a MERN hiring process on a QA hiring page.
 */

import type { HireRolePageContent } from './types';
import { heroForm } from './shared';

export const qa: HireRolePageContent = {
  key: 'hire-qa',
  slug: '/hire-qa-testers-india',
  name: 'Hire QA Engineers',
  serviceType: 'Software QA and testing staffing',

  /** Live order: overview, QA expertise, testing types, rate band, benefits, domains, approach, process, comparison, tools, testimonials, FAQ. This page runs no client-logo strip. */
  order: [
    'overview',
    'fit',
    'list:testing',
    'midCta',
    'capabilities',
    'list:domains',
    'list:approach',
    'process',
    'comparison',
    'techStack',
    'testimonials',
    'faq',
  ],

  meta: {
    title: 'Hire QA Testers in India | 40-Hour Trial – Soft Suave',
    description:
      'Hire pre-vetted QA testers skilled in manual and automation testing — Selenium, Appium, Postman, JMeter — placed on your team within 48 hours, from $14/hour.',
  },

  hero: {
    titleLines: ['Hire Remote Software', 'QA Testers in India'],
    body: [
      "Soft Suave provides pre-vetted QA testers skilled in manual and automation testing (Selenium, Appium, Postman, JMeter), placed on your team within 48 hours. Every engagement starts with a 40-hour risk-free trial, with rates from $14/hour and no long-term contract required until you're satisfied.",
      'Every release deserves a QA tester who never misses bugs.',
    ],
    points: [
      '40-Hour Risk-Free Trial',
      'Hire Top Software QA Testers in India',
      'Time-Zone & Language Aligned Teams',
      'Airtight NDA & IP Protection',
      'Strong Delivery Governance from Day One',
    ],
    badges: ['*Satisfaction Guaranteed – Get 40-hour Free Trial'],
    form: heroForm({
      title: 'Get Skilled Remote Developers',
      requirementLabel: 'Requirements',
      requirementPlaceholder:
        'What needs testing, manual or automation, the tools in use, and when you need to start.',
      subject: 'QA engineer hiring enquiry',
    }),
  },

  overview: {
    eyebrow: 'Overview',
    title: 'Hire Remote QA Testers in India For Flawless Software Solutions',
    paragraphs: [
      "We find, fix, and prevent your apps from any bugs with the help of Soft Suave's expert Quality Assurance engineers.",
      "One of the first impressions of a brand is its software product quality. No matter how advanced the technology or how attractive the UX/UI design is, bugs can ruin trust. Then they look for alternatives. Don't let it happen to you.",
      'We will conduct rigorous testing to find and fix errors once we receive your finished applications. "Hire QA engineers in India" from Soft Suave in order to prevent future errors while updating or making other changes.',
      'To get testers with exceptional software and coding skills, sound business knowledge, and an innovative mindset, "Hire Remote QA testing developer" at Soft Suave who has the ability to pinpoint the tech field\'s strengths and weaknesses.',
    ],
  },

  fit: {
    eyebrow: 'QA Expertise',
    title: 'The Expertise of Our QA Engineers in India',
    body: "As having the best QA engineers, we run numerous range of tests to check the quality of the app's features, usability, functions, and so on to make sure to level it up and be bug-free.",
    columns: ['Testing approach', 'What it involves'],
    rows: [
      {
        problem: 'Automation Testing',
        solution:
          'Using Automation Testing, we strategize to meet the needs of your organization and recommend technology solutions for reducing costs, speeding up time to market, and enhancing end-product quality.',
        image: '/images/landing/services/svc-evaluation-llmops.webp',
      },
      {
        problem: 'Manual Testing',
        solution:
          'Manual testing is a type of software testing in which "Certified QA testers" develop and execute the test cases without using any automated tools to find bugs, errors, and defects in the app in the most classic way possible.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
    ],
  },

  capabilities: {
    eyebrow: 'Benefits',
    title: 'Benefits to Hiring Quality Assurance Engineers in India from Soft Suave',
    body: 'Hire Remote QA testers from Soft Suave to get the advantage of special, full bug-free ensured service that prevents your apps from prospective errors.',
    items: [
      {
        name: 'Extensive Technical Expertise',
        body: 'With high-level tech intelligence, our "Dedicated QA engineers" can deliver flawless software solutions all around the globe.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        name: 'An Effective Communication Channel',
        body: 'We provide bug and error trace reports, as well as updates on the project. You can communicate with us through any of the communication tools you desire to communicate with us.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        name: 'Hire Certified QA Engineers Team',
        body: 'With our highly flexible engagement models, you can scale your existing team with our QA engineers.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        name: 'Sweeping QA Testers',
        body: "We conduct extensive QA sessions to address all the major aspects of a system's performance on a real-time basis in order to deliver flawless applications.",
        image: '/images/landing/services/svc-evaluation-llmops.webp',
      },
      {
        name: 'NDA & Security',
        body: 'Hire QA testers to have strictly maintained NDA procedures. No fraudulent activities can ever happen inside Soft Suave. You are in safe hands.',
        image: '/images/landing/services/svc-security-governance.webp',
      },
      {
        name: 'Support & Maintenance',
        body: 'Customer service is our top priority. We work on solving bugs and preventing future issues with your applications, so there is no need to worry.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
    ],
  },

  midCta: {
    eyebrow: 'Rates',
    title: 'Hire Software QA Engineer Starting from $14/hour',
    body: 'We will provide you with remote QA testers that work from India. Contact us to take a look at CVs.',
    cta: { label: 'Request Rate Card', href: '#enquiry' },
  },

  process: {
    eyebrow: 'Hiring Process',
    title: 'Hire QA Tester India in 4 Easy Steps',
    body: 'Follow our simple steps below to get "full-time hiring" after a 40-hour free trial.',
    steps: [
      {
        n: '01',
        name: 'Share the QA JD',
        body: 'Send your QA testing needs with project scope, skills, experience, and timeline.',
      },
      {
        n: '02',
        name: "Review Soft Suave's QA Shortlist",
        body: 'Review curated QA profiles with skills, experience, availability, and project fit details.',
      },
      {
        n: '03',
        name: 'Run the 40-Hour Free Trial',
        body: 'Start a 40-hour trial to assess testing skills, communication, quality, and delivery approach.',
      },
      {
        n: '04',
        name: 'Onboard the QA Tester to Your Team',
        body: 'Sign SLA and NDA, complete onboarding, and integrate the QA tester into your workflow.',
      },
    ],
  },

  comparison: {
    eyebrow: 'Comparison',
    title: 'Soft Suave vs. In-House vs. Freelancer.',
    body: 'Compare common hiring approaches and find the option that best fits your software development and team requirements.',
    columns: ['Factor', 'In-House Hire', 'Freelancer', 'Soft Suave QA Tester'],
    rows: [
      {
        criterion: 'Time to onboard',
        values: ['4–8 weeks', '1–2 weeks, variable', '48 hours'],
      },
      {
        criterion: 'Recurring overhead',
        values: [
          '$2,000–$3,000/month',
          '$0, inconsistent availability',
          '$0 — hourly, no hidden costs',
        ],
      },
      {
        criterion: 'Vetting',
        values: [
          "Your team's time/cost",
          'Self-reported, unverified',
          'Pre-vetted + 40-hour trial',
        ],
      },
    ],
  },

  techStack: {
    eyebrow: 'Tools',
    title: 'Powerful Tools and Technologies Our QA Testers Use',
    body: "With Soft Suave's quality assurance engineers trained to use both old and new technology stacks with continuous improvement, we can make your software or apps more efficient and flawless.",
    groups: [
      {
        name: 'Web Testing',
        items: ['Katalon Test Studio', 'Jasmine', 'Selenium'],
      },
      {
        name: 'Mobile Testing',
        items: ['Appium', 'Selenium'],
      },
      {
        name: 'API Testing',
        items: ['Rest Assured', 'Postman', 'SoapUI'],
      },
      {
        name: 'Performance Testing',
        items: ['Apache JMeter', 'Blazemeter'],
      },
      {
        name: 'BDD',
        items: ['Cucumber', 'Specflow'],
      },
      {
        name: 'Cloud Testing',
        items: ['Browser Stack', 'Salesforce', 'ERP'],
      },
      {
        name: 'Security Testing',
        items: ['OWASP Zap'],
      },
    ],
  },

  /**
   * The page's three label-only sections, each placed by `order` where the live
   * page runs it: the testing types between the QA-expertise band and the rate
   * band, the domains and the approach on the far side of the benefits cards.
   * Every group here is unnamed — the live sections list their labels straight
   * under the heading, with no sub-heading over them.
   */
  lists: [
    {
      key: 'testing',
      eyebrow: 'QA Services',
      title: 'Checkout the Types of QA Testing',
      body: 'We offer wide range of quality assurance services that include:',
      groups: [
        {
          name: '',
          items: [
            'Functional Testing',
            'Web App Testing',
            'Mobile App Testing',
            'UI/UX Testing',
            'Integration Testing',
            'API Testing',
            'Compatibility Testing',
          ],
        },
      ],
    },
    {
      key: 'domains',
      eyebrow: 'Domains',
      title: 'Get Aided by Our Expertise in Many Domains',
      body: "Hire Offshore Software Testing Engineers from Soft Suave for exceptional software testing for domains such as Education, Healthcare, Retail, and so on. Using our experience in quality assurance, our QA testers will create an action plan aligned with your organization's goals.",
      groups: [
        {
          name: '',
          items: [
            'eCommerce',
            'ELearning',
            'Healthcare',
            'Logistics',
            'Entertainment',
            'Real Estate',
            'Networking',
            'Finance',
          ],
        },
      ],
    },
    {
      key: 'approach',
      eyebrow: 'Our Approach',
      title: 'Hire QA Engineers in India for Easing Business Approach',
      body: 'Our hands-on Approach can make you feel at ease. Get back to us for satisfactory service.',
      groups: [
        {
          name: '',
          items: [
            'Professional Testing Templates and Tools',
            'Adaptable engagement models',
            'Providing a high level of customer satisfaction',
            'A commitment to integrity and transparency',
            'Solutions that cover the entire spectrum',
            'A reasonable price and a timely delivery',
          ],
        },
      ],
    },
  ],

  faq: {
    eyebrow: 'FAQs',
    title: 'Frequently Asked Questions',
    body: 'Learn more about the benefits of hiring QA engineers in India from Soft Suave',
    items: [
      {
        q: 'How much does it cost to hire a QA tester from Soft Suave?',
        a: 'Rates start from $14/hour, in line with the $15/hour median rate for software QA testers on Upwork ($12–$20/hr typical range). Every hire starts with a 40-hour risk-free trial before any monthly commitment.',
      },
      {
        q: 'How does the 40-hour risk-free trial work?',
        a: "You evaluate your QA engineer's real work for 40 hours — about one working week — before paying full rate or committing to an ongoing engagement, with no cost or obligation if it's not the right fit.",
      },
      {
        q: 'How long does it take to hire a QA tester?',
        a: 'Curated QA engineer profiles are typically shared within 48 hours of your requirements call.',
      },
      {
        q: "What happens if the QA tester isn't the right fit?",
        a: 'You can request a replacement engineer at no extra cost during or after the trial period, re-matched based on your feedback.',
      },
      {
        q: 'Do your QA testers handle both manual and automation testing?',
        a: "Yes — testers are skilled in both manual testing and automation frameworks including Selenium, Appium, Postman and JMeter, matched to your project's needs.",
      },
      {
        q: 'What are the benefits of outsourcing QA testing services?',
        a: 'Outsourcing QA testing reduces costs, gives you access to specialized testing expertise and tools, and frees your in-house team to focus on core development instead of manual test cycles.',
      },
      {
        q: 'What is the role of a QA tester in software development?',
        a: 'A QA tester verifies that software meets requirements, identifies bugs before release, and works with developers to resolve issues — reducing the risk of defects reaching end users.',
      },
    ],
  },
};
