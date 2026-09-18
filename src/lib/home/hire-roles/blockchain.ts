/**
 * Content for `/hire-blockchain-developer`.
 *
 * Source: softsuave.com/hire-blockchain-developer, and nothing else.
 *
 *   hero         → "Hire Blockchain Developers from India"
 *   whyRole      → "Why Hire Blockchain Developers from Soft Suave"
 *   process      → "Steps to Hire a Blockchain Developer"
 *   techStack    → "Technical Expertise of Our Blockchain Developers"
 *   capabilities → "Blockchain Development Services We Offer" (9 cards)
 *   fit          → "How We Vet and Onboard Top Blockchain Developers"
 *   comparison   → "Choosing the Right Blockchain Partner for Your Specific Needs"
 *   faq          → the seven questions, verbatim
 *
 * The live page runs no overview prose block and no mid-page rate band, so this
 * module has neither.
 *
 * Its technical-expertise section mixes two kinds of row: nine that list
 * technologies, and ten more — supply chain, smart contract development, custom
 * software, exchange development, cloud/DevOps, backend engineering, API
 * integration, QA, architecture and compliance — that are sentence-long service
 * descriptions restating the services section above them. The nine technology
 * lists are carried here as the technology band; the ten service statements
 * stay where they already read properly, in the services cards.
 */

import type { HireRolePageContent } from './types';
import { heroForm, onboardingComparison } from './shared';

export const blockchain: HireRolePageContent = {
  key: 'hire-blockchain',
  slug: '/hire-blockchain-developer',
  name: 'Hire Blockchain Developers',
  serviceType: 'Blockchain development staffing',

  /** Live order: clients, why hire, hiring steps, technical expertise, services, vetting, comparison, testimonials, FAQ. */
  order: [
    'clients',
    'whyRole',
    'process',
    'techStack',
    'capabilities',
    'fit',
    'comparison',
    'testimonials',
    'faq',
  ],

  meta: {
    title: 'Hire Blockchain Developers | 40-Hr Trial – Soft Suave',
    description:
      'Hire pre-vetted blockchain developers skilled in Ethereum, Solidity, smart contracts and DeFi/Web3 development, matched to your project within 48 hours.',
  },

  hero: {
    titleLines: ['Hire Blockchain Developers', 'from India'],
    body: [
      'Soft Suave provides pre-vetted blockchain developers skilled in Ethereum, Solidity, smart contracts, and DeFi/Web3 development, matched to your project within 48 hours.',
      "Every engagement starts with a 40-hour risk-free trial, with rates from $14/hour and no long-term contract required until you're satisfied.",
      'See why businesses choose Soft Suave for their blockchain hiring.',
    ],
    points: [
      '40-Hour Risk-Free Trial',
      'Hire Top Blockchain Developers in India',
      'Time-Zone & Language Aligned Teams',
      'Airtight NDA & IP Protection',
      'Strong Delivery Governance from Day One',
    ],
    form: heroForm({
      title: 'Get Skilled Remote Developers',
      requirementLabel: 'Requirements',
      requirementPlaceholder:
        'The chain and contracts involved, what the system has to do, audit or compliance needs, and when you need to start.',
      subject: 'Blockchain developer hiring enquiry',
    }),
  },

  whyRole: {
    eyebrow: 'Expert Developers',
    title: 'Why Hire Blockchain Developers from Soft Suave',
    body: "At Soft Suave, we build partnerships with expert blockchain developers, ensuring your vision becomes reality through skilled, experienced professionals dedicated to your project's success.",
    items: [
      {
        key: 'vetted',
        name: 'Pre-vetted Blockchain Developers',
        body: 'We rigorously screen our developers to ensure only the best join your project - top-tier skills, consistent performance, and unwavering commitment.',
      },
      {
        key: 'models',
        name: 'Flexible hiring models',
        body: 'Whether you need to scale quickly or adjust your pace, our adaptable hiring models let you hire dedicated Blockchain developers without hassle.',
      },
      {
        key: 'standards',
        name: 'Global delivery standards',
        body: 'We implement agile processes with world-class standards to deliver flawless quality that exceeds your expectations.',
      },
      {
        key: 'nda',
        name: 'Strict NDA & IP protection',
        body: 'We protect your ideas and innovations. Our airtight NDAs and robust IP protection guarantee complete confidentiality.',
      },
      {
        key: 'timezone',
        name: 'Time Zone Flexibility',
        body: 'Our developers overlap with your time zone for 4-6 hours, ensuring smooth communication and collaboration in real-time.',
      },
      {
        key: 'rates',
        name: 'World-Class Developers at Budget-Friendly Rates',
        body: 'Hire offshore Blockchain developer talent at budget-friendly rates with Soft Suave, providing top-quality expertise while cutting costs.',
      },
    ],
  },

  process: {
    eyebrow: 'Hiring Process',
    title: 'Steps to Hire a Blockchain Developer',
    body: 'Hiring Blockchain experts has never been simpler. Our 4-step process is built to be fast, efficient, and customized to your needs.',
    steps: [
      {
        n: '01',
        name: 'Share the JD',
        body: "Share your requirements and the developer skills you're seeking for your Blockchain project.",
      },
      {
        n: '02',
        name: 'Shortlist The Right Developers',
        body: 'We send you an organized list of handpicked pros. You choose the ones that align with your project.',
      },
      {
        n: '03',
        name: 'Free 40-hour Trial',
        body: 'Use a 40-hour risk-free trial to evaluate their skills in a live project setting.',
      },
      {
        n: '04',
        name: 'Onboard & Manage',
        body: 'Complete formalities like NDAs and SLAs, then get your developer fully onboarded.',
      },
    ],
  },

  capabilities: {
    eyebrow: 'What We Do',
    title: 'Blockchain Development Services We Offer',
    body: 'Our blockchain services span industries, offering tailored solutions for every project. Hire remote blockchain developers, ensuring a perfect fit for all your development needs.',
    items: [
      {
        name: 'Blockchain Consulting',
        body: 'Unlock the potential of blockchain with expert guidance, leading your business through seamless, efficient, and secure blockchain implementations.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        name: 'Smart Contract Development',
        body: 'Hire expert Blockchain developers to automate and secure your process via robust smart contracts and make them transparent and tamper-proof to the max for better business operations.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        name: 'Decentralized Application (DApp) Development',
        body: 'Develop secure DApps built with the state-of-the-art technology that allows for decentralization and security, user empowerment, and seamless integration with blockchain ecosystems.',
        image: '/images/landing/services/svc-proof-of-concept.webp',
      },
      {
        name: 'Cryptocurrency Development',
        body: 'Develop your custom cryptocurrencies and tokens based on new blockchain technology to fit your business model and increase efficiency.',
        image: '/images/landing/services/svc-model-selection.webp',
      },
      {
        name: 'Blockchain Integration',
        body: 'Hire blockchain developers and integrate blockchain seamlessly into your existing systems, enhancing security, transparency, and scalability with minimal disruption to operations.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        name: 'Blockchain Security',
        body: "Secure your blockchain systems using cutting-edge security to maintain your data's integrity, confidentiality, and resistance to cyber risks and attacks.",
        image: '/images/landing/services/svc-security-governance.webp',
      },
      {
        name: 'Blockchain Supply Chain Development',
        body: 'Transform your supply chain with blockchain technology with greater transparency, traceability, and efficiency while creating accountability and reducing fraud.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
      {
        name: 'Custom Blockchain App Development',
        body: 'Tailor your app to meet your unique needs with custom blockchain-based solutions that offer scalability, security, and flexibility.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        name: 'Offshore Blockchain Development',
        body: 'As a full-scale offshore software development company, we specialize in blockchain development, offering affordable, experienced talent to deliver secure, cutting-edge solutions tailored to your business needs.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
    ],
  },

  fit: {
    eyebrow: 'Skill Check',
    title: 'How We Vet and Onboard Top Blockchain Developers',
    body: "We follow a strict vetting process to connect you with the best blockchain developers. Here's how we ensure you get top-tier talent, perfectly suited for your project's success.",
    columns: ['Stage', 'What it involves'],
    rows: [
      {
        problem: 'Rigorous talent sourcing',
        solution: "We don't wait for applications; we reach out to proven Blockchain developers.",
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        problem: 'In-depth skill assessment',
        solution:
          'Candidates go through real-time coding tasks and expert-level technical assessments.',
        image: '/images/landing/services/svc-evaluation-llmops.webp',
      },
      {
        problem: 'Thinkers & Innovators',
        solution:
          'We hire developers who collaborate, think critically, and work smart to deliver real impact.',
        image: '/images/landing/services/svc-model-selection.webp',
      },
      {
        problem: 'Cultural fit & adaptability',
        solution:
          "We ensure they're great communicators, adaptable to your systems, and quick to integrate.",
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
    ],
  },

  comparison: onboardingComparison({
    title: 'Choosing the Right Blockchain Partner for Your Specific Needs',
    body: 'Compare hiring methods - freelancers, internal hires, or our expert Blockchain team. Use our comprehensive comparison guide to decide.',
    column: 'Soft Suave',
  }),

  techStack: {
    eyebrow: 'Expertise',
    title: 'Technical Expertise of Our Blockchain Developers',
    body: 'Our developers are proficient in a range of blockchain technologies, making them the perfect choice when you decide to hire remote Blockchain developers for your next project.',
    groups: [
      {
        name: 'Blockchain Platforms',
        items: ['Ethereum', 'Hyperledger', 'Solana', 'EOS', 'Polkadot', 'Cardano'],
      },
      {
        name: 'Smart Contracts',
        items: ['Solidity', 'Chaincode', 'Rust', 'Vyper', 'Michelson'],
      },
      {
        name: 'DApp Development',
        items: ['React', 'Web3.js', 'Node.js', 'Truffle', 'Hardhat'],
      },
      {
        name: 'Cryptocurrency Solutions',
        items: ['Token creation', 'ICO', 'DeFi', 'ERC-20', 'ERC-721', 'ERC-1155'],
      },
      {
        name: 'Blockchain Security',
        items: [
          'End-to-end encryption',
          'Cryptographic Protocols',
          'Secure APIs',
          'AES',
          'RSA',
        ],
      },
      {
        name: 'Blockchain Integration',
        items: ['RESTful APIs', 'GraphQL', 'JSON-RPC', 'WebSocket'],
      },
      {
        name: 'Token Development',
        items: ['Mocha', 'Chai', 'Jest', 'Truffle', 'Hardhat'],
      },
      {
        name: 'Decentralized Finance (DeFi)',
        items: ['Microservices', 'Peer-to-Peer Network Design', 'Consensus Algorithms'],
      },
      {
        name: 'Non-Fungible Tokens (NFTs)',
        items: [
          'GDPR',
          'HIPAA compliance',
          'KYC/AML integration',
          'Security Audits',
          'OWASP',
        ],
      },
    ],
  },

  faq: {
    eyebrow: 'Ask Us',
    title: 'FAQs About Hiring Blockchain Developers',
    body: 'Find quick answers about how we work and what makes our process effective',
    items: [
      {
        q: 'How much does it cost to hire a Blockchain developer?',
        a: 'Cost starts at $14/hour depending on project scope and developer expertise — well below the $40/hour median rate for blockchain developers on Upwork ($30–$59/hr typical range). For a quote customized to your requirements, get in touch with us.',
      },
      {
        q: 'Is there any free trial period available?',
        a: "Yes, enjoy a free 40-hour trial to test the developer's performance risk-free.",
      },
      {
        q: 'What blockchain platforms and languages do your developers work with?',
        a: 'Developers work across Ethereum, Hyperledger, Solana, EOS, Polkadot and Cardano, writing smart contracts in Solidity, Rust, Vyper and Chaincode.',
      },
      {
        q: 'Do you audit smart contracts for security vulnerabilities?',
        a: 'Yes — developers follow OWASP security practices and can perform smart contract audits, alongside GDPR/HIPAA compliance and KYC/AML integration work where required.',
      },
      {
        q: 'What are the hiring engagement options available at Soft Suave?',
        a: 'We offer fixed-price, time & material, or fully managed development options.',
      },
      {
        q: 'Do you provide support and maintenance services after deployment?',
        a: 'Yes, we offer continuous maintenance, performance optimization, and committed support.',
      },
      {
        q: "What happens if the blockchain developer isn't the right fit?",
        a: 'You can request a replacement developer at no extra cost during or after the trial period, re-matched based on your feedback.',
      },
    ],
  },
};
