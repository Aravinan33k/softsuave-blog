/**
 * Content for `/hire-forward-deployed-engineer`.
 *
 * Source: softsuave.com/hire-forward-deployed-engineer, and nothing else.
 *
 *   hero            → "AI Agents deployed in weeks, not months" + its counter strip
 *   overview        → "Model-Agnostic AI Implementation Partner" (the three vendors)
 *   fit             → "Hiring Engineers is Hard. We Make It Easy."
 *   capabilities    → what an embedded FDE owns, from the vendor strengths and
 *                     the skills its FAQ publishes
 *   engagement      → "Flexible Engagement Models" (three models)
 *   midCta          → "Ready to build your team?"
 *   process         → "THE PROTOCOL — From Kickoff to First Commit" (Day 1–7)
 *   comparison      → "Why a Soft Suave FDE team?" (nine capabilities)
 *   globalDelivery  → the three delivery regions, from its FAQ
 *   whyRole         → the guarantees its FAQ publishes (vetting, replacement,
 *                     time zones, IP, direct hire, your tooling)
 *   techStack       → the stacks, models, enterprise systems and workflow tools
 *                     named in FAQ 3 and FAQ 10
 *   list:sizes      → "We work with companies of all sizes"
 *   faq             → all fourteen questions, in the live order
 *
 * Two notes on restructuring. The live page prints the model-agnostic section
 * as three vendor cards of four bullets each; no section component on this
 * surface takes a card with a bullet list, so each vendor's strengths are one
 * sentence of the `overview` prose and the section's own closing line is its
 * pull quote. Nothing is dropped. The same applies to the engagement models,
 * whose feature bullets fold into each panel's paragraph.
 *
 * The page's three client quotes are not carried here: they are the homepage's
 * own testimonials, rendered by the homepage's component over
 * `lib/home/content.ts`, which is how every page in this set makes a claim
 * about the company rather than about the role.
 */

import type { HireRolePageContent } from './types';
import { heroForm } from './shared';

export const forwardDeployed: HireRolePageContent = {
  key: 'hire-fde',
  slug: '/hire-forward-deployed-engineer',
  name: 'Forward Deployed Engineers',
  serviceType: 'Forward deployed engineering staffing',

  /**
   * Live order: hero, model-agnostic partner, hiring comparison, engagement
   * models, the protocol, the capability table, closing CTA, client stories,
   * company sizes, FAQ. The capability carousel, the delivery prose, the
   * guarantee cards and the technology band carry copy the live page states in
   * its FAQ rather than in bands of its own, so they sit beside the sections
   * that make the same point.
   */
  order: [
    'clients',
    'overview',
    'fit',
    'capabilities',
    'engagement',
    'midCta',
    'process',
    'comparison',
    'globalDelivery',
    'whyRole',
    'techStack',
    'list:sizes',
    'caseStudies',
    'testimonials',
    'faq',
  ],

  meta: {
    title: 'Hire Forward Deployed Engineers in 6-8 Weeks',
    description:
      'Hire forward deployed engineers who embed in your workflow and ship production AI in 6-8 weeks. 120+ FDEs deployed across 30+ clients, model-agnostic delivery.',
  },

  hero: {
    titleLines: ['Hire Forward Deployed Engineers', 'AI Agents Deployed in Weeks, Not Months'],
    body: [
      'Easily build and deploy AI with honest engineering.',
      "Soft Suave's Forward Deployed Engineering (FDE) teams help companies modernize technology, reimagine processes, and rebuild experiences — with engineers embedded directly in your workflow.",
    ],
    points: [
      'Production Deployment in 6–8 Weeks',
      'Pre-Vetted FDE Teams, Under 3% Accepted',
      'Model-Agnostic: Claude, GPT and Gemini',
      'USA, South America and India Coverage',
      'Replacement Guarantee Within 2 Weeks',
      'Your Tools, Your Repo, Your Standups',
    ],
    badges: ['120+ FDEs Deployed', '30+ Clients', '6–8 Weeks to Production'],
    form: heroForm({
      title: 'Deploy an FDE Pod',
      requirementLabel: 'Requirements',
      requirementPlaceholder:
        'The workflow you want engineers embedded in, your technology stack, team size, preferred engagement model, and start date.',
      subject: 'Forward deployed engineer hiring enquiry',
    }),
  },

  overview: {
    eyebrow: 'Model-Agnostic',
    title: 'Model-Agnostic AI Implementation Partner',
    paragraphs: [
      "We don't lock you into a single vendor. Our Forward Deployed Engineers select the right model — Claude, GPT, or Gemini — for every task, then orchestrate them together for the best outcome at the lowest cost. We are equal partners with Anthropic, OpenAI and Google.",
      'Anthropic Claude is where we put long-context reasoning and analysis, constitutional AI safety guarantees, and legal, policy and research workflows. Its reliable structured output is what makes document-heavy enterprise pipelines hold together.',
      'OpenAI GPT and the o-series bring frontier multimodal reasoning across text, image and voice, mature tool-use and agentic frameworks, the broadest enterprise ecosystem and SDKs, and fine-tuning and evals for domain-specific accuracy.',
      'Google Gemini and Vertex AI carry massive context windows beyond a million tokens, native multimodal handling of video, audio and code, deep integration with Google Cloud and Workspace, and enterprise agent platforms purpose-built for regulated sectors like financial services.',
    ],
    pullQuote:
      'Multi-model orchestration, side-by-side evaluation, and per-task routing — built into every Soft Suave FDE engagement.',
    image: {
      src: '/images/landing/services/svc-model-selection.webp',
      width: 1200,
      height: 900,
      alt: 'Engineers comparing model options for a task',
    },
  },

  fit: {
    eyebrow: 'The Difference',
    title: 'Hiring Engineers is Hard. We Make It Easy.',
    body: 'Every company needs strong engineers. Soft Suave builds and deploys FDE teams so you can stay focused on your product.',
    columns: ['Traditional hiring', 'With a Soft Suave FDE team'],
    rows: [
      {
        problem: 'Months-long hiring cycles',
        solution:
          'Pre-vetted FDE teams ready in weeks, with most engagements reaching production deployment in 6–8 weeks.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        problem: 'Expensive local talent costs',
        solution:
          'Cost-effective global talent on simple monthly pricing, with dedicated teams starting at $14 per hour and no hourly surprises.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        problem: 'High turnover and training overhead',
        solution:
          'Managed teams with zero turnover risk. We replace any engineer within 2 weeks at no additional cost.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
      {
        problem: 'Scaling bottlenecks',
        solution:
          'Scale up or down instantly, whether you need a full dedicated team, a project pod, or implementation capacity that grows with your customers.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
      {
        problem: 'Time zone coverage gaps',
        solution:
          'USA, South America and India coverage, so you get overlap with US hours or extended and overnight support for 24/7 operations.',
        image: '/images/landing/services/svc-integration.webp',
      },
    ],
  },

  capabilities: {
    eyebrow: 'What They Own',
    title: 'What a Forward Deployed Engineer Owns',
    body: 'An FDE is a senior engineer embedded with your team who delivers working production code, not recommendations. These are the things our engineers take responsibility for once they are inside your workflow.',
    items: [
      {
        name: 'Multi-Model Orchestration',
        body: 'Select the right model for every task and orchestrate Claude, GPT and Gemini together, routing per task for the best outcome at the lowest cost rather than committing the whole system to one vendor.',
        image: '/images/landing/services/svc-model-selection.webp',
      },
      {
        name: 'Side-by-Side Evaluation',
        body: 'Run models against each other on your own workloads, with fine-tuning and evals for domain-specific accuracy, so a model choice is made on measured results instead of vendor claims.',
        image: '/images/landing/services/svc-evaluation-llmops.webp',
      },
      {
        name: 'Document-Heavy Pipelines',
        body: 'Build enterprise pipelines that depend on reliable structured output and long-context reasoning, the work behind legal, policy and research workflows where an unreliable answer is worse than none.',
        image: '/images/landing/services/svc-proof-of-concept.webp',
      },
      {
        name: 'Agentic Tool Use',
        body: 'Implement agents on mature tool-use frameworks, wiring them into the systems that actually hold your data so an agent can complete work rather than only describe how the work would be done.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        name: 'Enterprise System Integration',
        body: 'Connect AI capability to Salesforce, SAP, Workday and the rest of the enterprise estate, including RAG implementations and LLM fine-tuning against systems your business already runs on.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        name: 'Production Deployment',
        body: 'Write production code, commit to your repo, and ship features. Success is measured by what gets deployed, not by hours billed or pages of strategy written.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
      {
        name: 'Customer Implementation',
        body: 'Already built an AI product? Our engineers help you implement and deploy it to your enterprise customers, scaling implementation capacity as your customer base grows.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        name: 'Secure Delivery',
        body: 'Work inside your secure environment under comprehensive NDAs and custom security requirements, within HIPAA, PCI and other regulatory frameworks, with all code belonging to you.',
        image: '/images/landing/services/svc-security-governance.webp',
      },
    ],
  },

  engagement: {
    eyebrow: 'Engagement Models',
    title: 'Flexible Engagement Models',
    body: 'Whether you need a full team or a project pod, we adapt to your needs.',
    blocks: [
      {
        label: 'Dedicated FDE Teams — your team, fully managed',
        body: 'Full-stack developers embedded in your workflow. They work like your in-house team, just remote: hand-picked engineers on your tech stack and your tools, daily standups and reporting, and a long-term engagement.',
      },
      {
        label: 'Project-Based Pods — ship specific features',
        body: 'Our most popular model. Spin up a team for a specific project or feature and we scope, build and deliver it: fixed scope and timeline, end-to-end delivery, QA and testing included, and a full code handoff.',
      },
      {
        label: 'Startup Accelerator — deploy AI to your customers',
        body: 'Already built an AI product? Our FDEs help you implement and deploy it to your enterprise customers, with startup-friendly pricing and capacity that scales as your customers do.',
      },
    ],
  },

  midCta: {
    eyebrow: 'Ready When You Are',
    title: 'Ready to build your team?',
    body: 'Deploy a fully managed Soft Suave FDE pod inside your workflow in weeks, not months.',
    cta: { label: 'Talk to us', href: '#enquiry' },
  },

  process: {
    eyebrow: 'The Protocol',
    title: 'From Kickoff to First Commit',
    body: 'Seven days from the first conversation to code in your repository. The protocol is the same on every engagement, so you know what each day is for before it starts.',
    steps: [
      {
        n: 'Day 1',
        name: 'Discovery',
        body: 'A deep dive into the workflow you want engineers embedded in, the systems it touches, and what shipping actually means for this team.',
      },
      {
        n: 'Day 3',
        name: 'Shadow',
        body: 'We match engineers to the work from our pre-vetted pool across three regions, on technical depth and on the way your team already operates.',
      },
      {
        n: 'Day 4',
        name: 'Battle Plan',
        body: 'The scope, the sequence and the first deliverable are agreed in writing, so the engagement starts against a target rather than a job description.',
      },
      {
        n: 'Day 6',
        name: 'Kickoff',
        body: 'Engineers join your standups, your Slack or Teams, your board and your repository, and take on their first tickets as part of the team.',
      },
      {
        n: 'Day 7',
        name: 'First Commit',
        body: 'Code lands in your repository. From here the measure of the engagement is what gets deployed, not what gets reported.',
      },
    ],
  },

  comparison: {
    eyebrow: 'Compare Your Options',
    title: 'Why a Soft Suave FDE team?',
    body: 'Compare us to traditional outsourcing and in-house hiring.',
    columns: ['Capability', 'Traditional Outsourcing', 'In-House Hiring', 'Soft Suave FDE Team'],
    rows: [
      { criterion: 'Time to Deploy Team', values: ['3–5 months', '6 months', '6–8 weeks'] },
      { criterion: 'Pre-Vetted Engineers', values: ['Varies', 'Not included', 'Included'] },
      { criterion: 'Global Talent Pool', values: ['Limited', 'Not included', 'Included'] },
      { criterion: 'Flexible Scaling', values: ['Varies', 'Not included', 'Included'] },
      { criterion: 'No Recruiting Overhead', values: ['Included', 'Not included', 'Included'] },
      { criterion: 'Simple Monthly Pricing', values: ['Varies', 'Not applicable', 'Included'] },
      { criterion: 'Replacement Guarantee', values: ['Varies', 'Not included', 'Included'] },
      { criterion: 'Path to Direct Hire', values: ['Extra cost', 'Not applicable', 'Included'] },
      { criterion: 'Timezone Coverage', values: ['Limited', 'Limited', '3 regions'] },
    ],
  },

  globalDelivery: {
    eyebrow: 'Global Delivery',
    title: 'Engineers in Your Time Zone, Across Three Regions',
    paragraphs: [
      'With teams in the USA, South America and India, we can provide engineers in any time zone. South American teams overlap perfectly with US hours, and Indian teams provide extended coverage or overnight support for 24/7 operations.',
      'Engineers work in your tools and your processes — Slack, Teams, Jira, Linear, GitHub, GitLab, whatever you already use. They attend your standups and follow your development practices, so the engagement feels like an extension of your team rather than an external vendor.',
      'All code written by our FDEs belongs to you. We sign comprehensive NDAs, accommodate custom security requirements, and keep data inside your secure environment. We are SOC 2 compliant and work within HIPAA, PCI and other regulatory frameworks.',
    ],
  },

  whyRole: {
    eyebrow: 'What You Get',
    title: 'Why a Soft Suave FDE Team',
    body: 'Traditional outsourcing sends resumes. We send outcomes. Our engineers are managed, mentored and supported by our team, and we take responsibility for delivery rather than placement.',
    items: [
      {
        key: 'vetted',
        name: 'Under 3% Accepted',
        body: 'Technical assessments, live coding interviews, system design reviews and soft skills evaluation. Senior-level talent without the recruiting headache.',
      },
      {
        key: 'retention',
        name: 'Replacement Guarantee',
        body: 'We replace any engineer within 2 weeks at no additional cost. Vetting is rigorous, but team chemistry still matters.',
      },
      {
        key: 'timezones',
        name: 'Three Region Coverage',
        body: 'USA, South America and India. Overlap with US hours, or extended and overnight coverage for 24/7 operations.',
      },
      {
        key: 'security',
        name: 'IP and Confidentiality',
        body: 'All code belongs to you, under comprehensive NDAs. SOC 2 compliant, and able to work within HIPAA, PCI and other frameworks.',
      },
      {
        key: 'talent',
        name: 'Path to Direct Hire',
        body: 'After a minimum engagement of typically 6 months, you can extend offers and bring engineers in-house. Many clients do this as they scale.',
      },
      {
        key: 'collaboration',
        name: 'Your Tools and Processes',
        body: 'Engineers integrate into your existing workflow, attend your standups and follow your development practices rather than importing ours.',
      },
    ],
  },

  techStack: {
    eyebrow: 'Expertise',
    title: 'What Our Forward Deployed Engineers Work With',
    body: 'Modern application stacks, the three frontier model families, the enterprise systems your business runs on, and whichever tools your team already works in.',
    groups: [
      {
        name: 'Engineering Stack',
        items: ['React', 'Node.js', 'Python', 'TypeScript'],
      },
      {
        name: 'Cloud Platforms',
        items: ['AWS', 'GCP'],
      },
      {
        name: 'AI and Models',
        items: ['Claude', 'GPT', 'Gemini', 'LLM Fine-Tuning', 'RAG'],
      },
      {
        name: 'Enterprise Systems',
        items: ['Salesforce', 'SAP', 'Workday'],
      },
      {
        name: 'Your Workflow Tools',
        items: ['Slack', 'Microsoft Teams', 'Jira', 'Linear', 'GitHub', 'GitLab'],
      },
    ],
  },

  lists: [
    {
      key: 'sizes',
      eyebrow: 'Who We Work With',
      title: 'We work with companies of all sizes',
      body: 'From seed-stage startups building a first MVP, through Series A–C companies scaling engineering capacity, to Fortune 500 enterprises tackling a specific technical challenge.',
      groups: [
        {
          name: '',
          items: ['Startups', 'SaaS Companies', 'Enterprises', 'Agencies', 'Tech Companies'],
        },
      ],
    },
  ],

  faq: {
    eyebrow: 'FAQ',
    title: 'Everything You Need to Know About FDEs',
    body: 'Answers to common questions about Forward Deployed Engineers and working with Soft Suave.',
    items: [
      {
        q: 'What is a Forward Deployed Engineer (FDE)?',
        a: 'A Forward Deployed Engineer is a senior software engineer who is embedded directly with your team to solve complex technical challenges. Unlike traditional consultants who deliver recommendations, FDEs deliver working production code. The term was popularized by Palantir and is now used by companies like Stripe, Databricks, and Notion.',
      },
      {
        q: 'How quickly can you deploy a team?',
        a: 'Most teams reach production deployment within 6-8 weeks. We have pre-vetted engineers across our three regions (USA, South America, India) who can start immediately. For larger teams or specialized skills, it may take slightly longer.',
      },
      {
        q: 'What skills do your FDE engineers have?',
        a: 'Our Forward Deployed Engineers are proficient in modern tech stacks including React, Node.js, Python, TypeScript, AWS, GCP, and more. Many have AI/ML experience including LLM fine-tuning, RAG implementations, and enterprise integrations with systems like Salesforce, SAP, and Workday.',
      },
      {
        q: 'How does FDE pricing work?',
        a: 'We offer simple monthly pricing based on team size and engagement model. Dedicated teams have flat monthly rates starting at $14 per hour. Project pods are scoped with fixed pricing. No hidden fees, no hourly surprises. Contact us for a custom quote based on your specific needs.',
      },
      {
        q: 'What is the difference between FDE and consulting?',
        a: 'Traditional consultants deliver strategy decks and recommendations. FDEs deliver working software. We write production code, commit to your repo, and ship features. We measure success by what gets deployed, not by hours billed or pages written.',
      },
      {
        q: 'What if an engineer is not a good fit?',
        a: 'We replace any engineer within 2 weeks at no additional cost. Our vetting process is rigorous, but we understand that team chemistry matters. Your satisfaction is guaranteed.',
      },
      {
        q: 'Do the engineers work in our time zone?',
        a: 'Yes. With teams in USA, South America, and India, we can provide engineers in any time zone. South American teams overlap perfectly with US hours. Indian teams can provide extended coverage or overnight support for 24/7 operations.',
      },
      {
        q: 'How do you vet your Forward Deployed Engineers?',
        a: 'Every engineer goes through technical assessments, live coding interviews, system design reviews, and soft skills evaluation. We assess both technical depth and communication abilities. We accept less than 3% of applicants. You get senior-level talent without the recruiting headache.',
      },
      {
        q: 'Can we hire the engineers directly after the engagement?',
        a: 'Yes, after a minimum engagement period (typically 6 months), you can extend offers to bring engineers in-house. Many clients do this as they scale. We want to be your long-term talent partner, and successful transitions are part of that relationship.',
      },
      {
        q: 'What tools and processes do FDE teams use?',
        a: 'Your tools, your processes. Engineers integrate into your existing workflow — Slack, Teams, Jira, Linear, GitHub, GitLab, whatever you use. They attend your standups and follow your development practices. It feels like an extension of your team, not an external vendor.',
      },
      {
        q: 'Do you work with enterprise clients or just startups?',
        a: 'Both. We work with seed-stage startups building their first MVP, Series A-C companies scaling their engineering capacity, and Fortune 500 enterprises tackling specific technical challenges. Our engagement models are flexible to accommodate different sizes and needs.',
      },
      {
        q: 'What is the minimum engagement length?',
        a: 'For dedicated teams, we recommend a minimum 3-month engagement to see meaningful results. Project pods are scoped based on deliverables, typically 4-12 weeks. Startup Accelerator engagements scale with your customer implementations.',
      },
      {
        q: 'How do you handle intellectual property and confidentiality?',
        a: 'All code written by our FDEs belongs to you. We sign comprehensive NDAs and can accommodate custom security requirements. Data never leaves your secure environment. We are SOC 2 compliant and can work within HIPAA, PCI, and other regulatory frameworks.',
      },
      {
        q: 'What makes an FDE team different from traditional outsourcing?',
        a: 'Traditional outsourcing sends resumes. We send outcomes. Our engineers are managed, mentored, and supported by our team. We take responsibility for delivery, not just placement. We also offer specialized pods with domain expertise that traditional providers cannot match.',
      },
    ],
  },
};
