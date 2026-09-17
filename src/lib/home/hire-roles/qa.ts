/**
 * Content for `/hire-qa-testers-india`.
 *
 * Source: softsuave.com/hire-qa-testers-india — the manual/automation expertise
 * split, the seven testing types, the six benefits, the eight domains, the
 * "easing business approach" points, the four-step process, the onboarding
 * comparison, the seven tool groups and the seven FAQs.
 *
 * Two deliberate departures from the live page. Its four process steps are
 * mislabelled there as a MERN stack job description — plainly a copy-paste from
 * a sibling page — so they are restated as the QA steps they describe. And its
 * Upwork median-rate comparison is dropped: it is a third-party figure that goes
 * stale without anyone noticing, and the rate itself says enough.
 */

import type { HireRolePageContent } from './types';
import { heroForm, onboardingComparison } from './shared';

export const qa: HireRolePageContent = {
  key: 'hire-qa',
  slug: '/hire-qa-testers-india',
  name: 'Hire QA Engineers',
  serviceType: 'Software quality assurance staffing',

  meta: {
    title: 'Hire QA Engineers in India | Manual & Automation Testing',
    description:
      'Hire pre-vetted QA engineers skilled in manual and automation testing with Selenium, Appium, Postman and JMeter. Profiles in 48 hours, 40-hour risk-free trial, from $14/hour.',
  },

  hero: {
    eyebrow: 'Hire Developers by Role',
    titleLines: ['Hire Remote QA Engineers', 'for Software You Can Ship'],
    body: [
      'Soft Suave provides pre-vetted QA engineers skilled in manual and automation testing — Selenium, Appium, Postman and JMeter — placed on your team within 48 hours.',
      'Product quality is one of the first impressions a brand makes. However advanced the technology or attractive the interface, defects cost trust, and trust is what sends users looking for alternatives. Rigorous testing is how you avoid finding that out from a customer.',
    ],
    points: [
      'Manual and automation testing expertise',
      'Profiles within 48 hours',
      '40-hour risk-free trial',
      'Rates from $14 / hour',
      'NDA and IP protection from day one',
    ],
    form: heroForm({
      title: 'Hire skilled QA engineers',
      requirementLabel: 'Your QA requirement',
      requirementPlaceholder:
        'Application type, platforms, current test coverage, the testing types you need, and when you want to start.',
      subject: 'QA engineer hiring enquiry',
    }),
  },

  overview: {
    eyebrow: 'Overview',
    title: 'Hire Remote QA Engineers for Flawless Software',
    paragraphs: [
      'We find, fix and prevent defects across your applications with experienced quality assurance engineers. Once a build reaches us, rigorous testing establishes what actually works — and, just as importantly, what stops working when something else changes.',
      'Hire QA engineers in India from Soft Suave to prevent future defects as you update and extend a product, not only to check a release before it ships. Testers bring software and coding skill, sound business understanding and the instinct for where a system is weakest.',
      'Every engagement starts with a 40-hour risk-free trial, with rates from $14 per hour and no long-term contract required until you are satisfied.',
    ],
  },

  fit: {
    eyebrow: 'Manual and Automation',
    title: 'The Expertise of Our QA Engineers',
    body: 'Most teams need both disciplines, in a ratio that depends on how often the product changes and how long it has to keep working. This is where each one earns its place.',
    columns: ['Testing approach', 'Where it earns its place'],
    rows: [
      {
        problem: 'Manual testing',
        solution:
          'Certified QA testers design and execute test cases without automation tools, finding defects the classic way. This is where exploratory testing, usability judgement and first-pass verification of a new feature belong — the work that needs a person deciding what to try next.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        problem: 'Automation testing',
        solution:
          'An automation strategy built around your organisation’s needs, recommending the tooling that reduces cost, shortens time to market and raises end-product quality. Regression suites, cross-browser runs and API checks pay for themselves the moment a release cycle repeats.',
        image: '/images/landing/services/svc-evaluation-llmops.webp',
      },
      {
        problem: 'API and integration testing',
        solution:
          'Verify contracts, payloads, authentication, error handling and downstream behaviour with Rest Assured, Postman and SoapUI — before an integration failure surfaces as a user-facing bug nobody can reproduce.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        problem: 'Performance testing',
        solution:
          'Establish how the system behaves under realistic and peak load with Apache JMeter and BlazeMeter, so capacity decisions rest on measurement rather than on the assumption that today’s traffic is the ceiling.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
      {
        problem: 'Compatibility and device coverage',
        solution:
          'Confirm behaviour across browsers, devices, screen sizes and operating-system versions using BrowserStack, so a defect that only appears on one platform is caught by your process and not by that platform’s users.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
    ],
  },

  capabilities: {
    eyebrow: 'Testing Coverage',
    title: 'Types of QA Testing We Cover',
    body: 'A wide range of quality assurance work, run against the aspects of a system that actually decide whether users trust it.',
    items: [
      {
        name: 'Functional Testing',
        body: 'Verify that every feature behaves as specified, including the boundary conditions and error paths that specifications usually leave implicit.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        name: 'Regression Testing',
        body: 'Confirm that new work has not broken what already worked — the single highest-value automation target in any product that ships more than once.',
        image: '/images/landing/services/svc-evaluation-llmops.webp',
      },
      {
        name: 'Web Application Testing',
        body: 'Test browser-based applications across forms, sessions, permissions, navigation and state, with Katalon, Jasmine and Selenium behind the automated coverage.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        name: 'Mobile Application Testing',
        body: 'Verify iOS and Android builds across devices, OS versions, network conditions, permissions and interruptions, automated with Appium where it repeats.',
        image: '/images/landing/services/svc-proof-of-concept.webp',
      },
      {
        name: 'API Testing',
        body: 'Validate endpoints, contracts, authentication, error responses and integration behaviour with Rest Assured, Postman and SoapUI.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        name: 'UI and UX Testing',
        body: 'Check interface behaviour, responsive layout, accessibility considerations and the flow through a task, rather than only whether each control responds.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        name: 'Integration Testing',
        body: 'Test the seams between components and services, where the individual parts pass their own tests and the system still fails.',
        image: '/images/landing/services/svc-model-selection.webp',
      },
      {
        name: 'Performance and Compatibility Testing',
        body: 'Establish behaviour under load with JMeter and BlazeMeter, and across browsers and devices with BrowserStack, so both scale and reach are verified.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
    ],
  },

  midCta: {
    eyebrow: 'Start With a Trial',
    title: 'Hire a QA Engineer From $14 Per Hour',
    body: 'Remote QA engineers working from India, evaluated on your own product for 40 hours before any monthly commitment. Ask us for CVs and a rate card.',
    cta: { label: 'Start Your 40-Hour Trial', href: '#enquiry' },
  },

  engagement: {
    eyebrow: 'Engagement Models',
    title: 'Adaptable Ways to Hire QA Engineers',
    body: 'Scale your existing team with QA engineers under whichever structure suits the testing work in front of you.',
    blocks: [
      {
        label: 'Dedicated QA engineer',
        body: 'A tester embedded in your sprint routine, writing and maintaining coverage as the product changes — the right choice when releases are continuous.',
      },
      {
        label: 'Time and material',
        body: 'Flexible capacity for a release push, an automation backlog or a coverage gap, with effort reviewed and reprioritised each cycle.',
      },
      {
        label: 'Fixed bid',
        body: 'For a defined engagement — a full test pass on a finished build, an automation suite with agreed scope, or a performance assessment with clear deliverables.',
      },
    ],
  },

  process: {
    eyebrow: 'Hiring Process',
    title: 'Hire a QA Engineer in Five Steps',
    body: 'From a requirement to a tester inside your release process, with a 40-hour trial before any full-time commitment.',
    steps: [
      {
        n: '01',
        name: 'Share Your QA Requirement',
        body: 'Tell us the application type, platforms, testing types needed, current coverage, tooling, experience level and timeline.',
      },
      {
        n: '02',
        name: 'Review the Curated Shortlist',
        body: 'Review QA engineer profiles with skills, experience, availability and project fit — typically shared within 48 hours.',
      },
      {
        n: '03',
        name: 'Interview the Shortlist',
        body: 'Assess testing approach, tooling depth, defect-reporting quality and how the engineer thinks about risk and coverage.',
      },
      {
        n: '04',
        name: 'Run the 40-Hour Free Trial',
        body: 'Evaluate test design, defect reports, communication, quality and delivery approach on your own build before committing.',
      },
      {
        n: '05',
        name: 'Onboard the QA Engineer',
        body: 'Sign the SLA and NDA, complete onboarding, and integrate the engineer into your test environments, defect tracker and release workflow.',
      },
    ],
  },

  specialisations: {
    eyebrow: 'Hire by Specialisation',
    title: 'QA Expertise You Can Hire Against',
    body: 'Quality assurance covers several distinct skill sets. Match the specialisation to the risk you are actually trying to reduce.',
    items: [
      {
        key: 'qa',
        name: 'Manual QA Engineers',
        body: 'Test design, exploratory testing, usability judgement and clear reproducible defect reports — the work that needs a person deciding what to try next.',
      },
      {
        key: 'automation',
        name: 'Automation Engineers',
        body: 'Selenium, Cypress and Playwright suites that hold up over time, with the page objects, waits and data management that keep them from becoming flaky.',
      },
      {
        key: 'mobile',
        name: 'Mobile Test Engineers',
        body: 'Appium-based automation plus real-device testing across OS versions, permissions, network conditions and interruptions.',
      },
      {
        key: 'api',
        name: 'API Test Engineers',
        body: 'Contract, payload, authentication and error-path coverage with Rest Assured, Postman and SoapUI, wired into your CI pipeline.',
      },
      {
        key: 'performance',
        name: 'Performance Test Engineers',
        body: 'Load, stress and soak testing with Apache JMeter and BlazeMeter, reported as capacity findings rather than as raw graphs.',
      },
      {
        key: 'security',
        name: 'Security Test Engineers',
        body: 'OWASP-guided testing with OWASP ZAP against the common classes of vulnerability, before a penetration test finds them for you.',
      },
      {
        key: 'integration',
        name: 'BDD Specialists',
        body: 'Cucumber and SpecFlow scenarios written so product, development and QA read the same specification instead of three interpretations of it.',
      },
      {
        key: 'cloud',
        name: 'Cross-Browser Specialists',
        body: 'BrowserStack-based coverage across browsers, devices and screen sizes, focused on the combinations your analytics say matter.',
      },
      {
        key: 'team',
        name: 'QA Leads',
        body: 'Test strategy, coverage planning, process definition and reporting for teams that need the discipline established rather than only executed.',
      },
    ],
  },

  comparison: onboardingComparison({
    title: 'Soft Suave vs an In-House Hire vs a Freelancer',
    body: 'QA is often the role a team delays hiring for, which makes speed to a shortlist the factor that usually decides.',
    column: 'Soft Suave QA engineer',
  }),

  techStack: {
    eyebrow: 'Tools and Technologies',
    title: 'Tools Our QA Engineers Work With',
    body: 'Our QA engineers are trained across both established and current test tooling, with continuous improvement of the suites they own.',
    groups: [
      {
        name: 'Web Testing',
        items: ['Selenium', 'Cypress', 'Playwright', 'Katalon', 'Jasmine'],
      },
      {
        name: 'Mobile Testing',
        items: ['Appium', 'Selenium'],
      },
      {
        name: 'API Testing',
        items: ['Postman', 'Rest Assured', 'SoapUI'],
      },
      {
        name: 'Performance Testing',
        items: ['Apache JMeter', 'BlazeMeter'],
      },
      {
        name: 'BDD',
        items: ['Cucumber', 'SpecFlow'],
      },
      {
        name: 'Cross-Browser and Cloud',
        items: ['BrowserStack'],
      },
      {
        name: 'Security Testing',
        items: ['OWASP ZAP'],
      },
      {
        name: 'CI and Tracking',
        items: ['Git', 'GitHub Actions', 'Jenkins', 'Jira'],
      },
    ],
  },

  faq: {
    eyebrow: 'FAQs',
    title: 'Questions About Hiring QA Engineers',
    body: 'Answers on cost, trials, timelines, coverage and what a QA engineer actually contributes.',
    items: [
      {
        q: 'How much does it cost to hire a QA engineer from Soft Suave?',
        a: 'Rates start from $14 per hour, and every hire begins with a 40-hour risk-free trial before any monthly commitment. The final rate depends on experience, the testing types involved, tooling and engagement model.',
      },
      {
        q: 'How does the 40-hour risk-free trial work?',
        a: 'You evaluate your QA engineer’s real work for 40 hours — about one working week — before paying full rate or committing to an ongoing engagement, with no cost or obligation if it is not the right fit.',
      },
      {
        q: 'How long does it take to hire a QA engineer?',
        a: 'Curated QA engineer profiles are typically shared within 48 hours of your requirements call.',
      },
      {
        q: 'What happens if the QA engineer is not the right fit?',
        a: 'You can request a replacement engineer at no extra cost during or after the trial period, re-matched based on your feedback.',
      },
      {
        q: 'Do your QA engineers handle both manual and automation testing?',
        a: 'Yes. Testers are skilled in manual testing and in automation frameworks including Selenium, Appium, Postman and JMeter, matched to your project’s needs. Most teams need a mix, and the right ratio depends on how often the product changes.',
      },
      {
        q: 'What are the benefits of outsourcing QA testing services?',
        a: 'Outsourcing QA reduces cost, gives you access to specialised testing expertise and tooling, and frees your in-house team to focus on development instead of manual test cycles.',
      },
      {
        q: 'What is the role of a QA engineer in software development?',
        a: 'A QA engineer verifies that software meets its requirements, identifies defects before release, and works with developers to resolve them — reducing the risk of defects reaching end users.',
      },
      {
        q: 'Can a QA engineer work inside our existing development process?',
        a: 'Yes. Engineers work within your sprint routine, defect tracker, test environments, CI pipeline and release process, with reporting expectations agreed before onboarding.',
      },
    ],
  },
};
