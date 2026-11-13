import type { HeroContent } from '@/components/landing/hero';
import type { FaqContent } from '@/components/landing/faq';
import { partnerHeroBadges } from '@/lib/home/hero-badges';
import { sharedHeroAlert } from '@/lib/home/delivery-shared';
import { YEARS_PLUS } from '@/lib/company-figures';

/**
 * /payment-gateway-integration-services — softsuave.com's "Payment Gateway Integration Services to Power
 * Global Payments" page, word for word: the hero with its quote form, the clients band, the thirteen services,
 * "Why Choose Us", the five types of integration, the technology stack (sixteen groups, four shown and the rest
 * behind "View More"), the six-step process, the six solutions it integrates with, the closing band, the
 * testimonials, the seven FAQs and the closing consultation form. Images are under /images/payment-gateway; the
 * "Why Choose Us" picture and marks are the ones the generative AI integration page already carries. The page
 * names no trial length beyond a testimonial's own words, so there is no duration to correct.
 */

export const pgMeta = {
  path: '/payment-gateway-integration-services',
  shortTitle: 'Payment Gateway Integration Services',
  title: 'Payment Gateway Integration Services to Power Global Payments',
  description:
    'Scale faster with secure, high-converting payment gateway integration services from Soft Suave. Reduce failures, boost approvals, and unify payments.',
} as const;

const IMG = '/images/payment-gateway';
const GEN = '/images/genai-services';
const OLD = '/images/genai-integration';

export const pgHero: HeroContent = {
  titleLines: ['Payment Gateway Integration Services'],
  accent: 'Payment Gateway Integration',
  titleScale: 'home',
  accentGradient: true,
  body: [
    'Top-tier payment gateway integration services that turn every click into a fast, failure-free payment, helping you capture more revenue, reduce churn, and scale confidently across devices, markets, and business models without engineering chaos.',
    'Start processing smarter payments with Soft Suave today.',
  ],
  boldBody: [1],
  scrollCue: { label: 'Scroll Down', targetId: 'clients' },
  points: [],
  badges: partnerHeroBadges,
  form: {
    eyebrow: "Let's Discuss Your Project",
    title: 'Get free rough quote in 24 hrs',
    alert: sharedHeroAlert,
    submit: 'Submit',
    sending: 'Sending...',
    requirementLabel: 'Requirement',
    requirementPlaceholder: 'Tell us about your payment gateway requirement.',
    subject: 'Payment Gateway Integration Services enquiry',
  },
};

/** The live clients heading and standfirst. */
export const pgClients = {
  eyebrow: 'Our Clients',
  title: 'Preferred AI-Enabled Technology Partner for Startups and SMBs',
  body: `We combine AI-enabled engineering with ${YEARS_PLUS} years of product development expertise to help clients build scalable AI solutions, automate complex workflows, and integrate systems for measurable business outcomes.`,
} as const;

export interface PgCard {
  readonly name: string;
  readonly body: string;
  readonly icon?: string;
  readonly label?: string;
}

export const pgServices = {
  eyebrow: 'Services',
  title: 'Payment Gateway Integration Services Soft Suave Offer',
  body: 'Unlock tailored payment gateway integration services that fit your product, tech stack, and roadmap, ensuring every payment experience feels native, reliable, and built for global scale.',
  cta: { label: 'Talk to Our Experts→', href: '/free-quote' },
  items: [
    { name: 'Payment Gateway API Integration & Development', body: 'Build powerful payment gateway APIs that connect your solutions and back-office systems into a single, streamlined payment experience your customers trust.', icon: `${IMG}/services/PGSI1.svg` },
    { name: 'Integration with Multiple Payment Methods', body: 'Offer every payment method your customers expect, cards, net banking, BNPL, UPI, etc, without adding complexity to your engineering backlog.', icon: `${IMG}/services/PGSI2.svg` },
    { name: 'Payment Gateway UI Optimization', body: 'Transform old, multi-step checkouts into fast, intuitive flows with optimized payment UI that reduces drop-offs and helps customers complete their transactions.', icon: `${IMG}/services/PGSI3.svg` },
    { name: 'Security Features Implementation', body: 'Layer your payment experience with advanced security controls, fraud checks, and encryption so every transaction is protected without slowing down your users.', icon: `${IMG}/services/PGSI4.svg` },
    { name: 'White Label Payment Gateway', body: 'Launch your own branded payment experience with white label payment gateway setups that look like your product while we handle the heavy lifting.', icon: `${IMG}/services/PGSI5.svg` },
    { name: 'Multi‑Currency Payment Gateway', body: 'Expand globally with a multi-currency payment gateway support that handles local currencies, pricing, and conversions while keeping settlement and reporting simple.', icon: `${IMG}/services/PGSI6.svg` },
    { name: 'Payment Orchestration Platform', body: 'Route transactions through the smartest path using a payment orchestration platform that boosts success rates, cuts costs, and improves resilience across multiple PSPs.', icon: `${IMG}/services/PGSI7.svg` },
    { name: 'Checkout Optimization Software', body: 'Turn checkout into a conversion engine with optimization software that tests, refines, and improves each step, so fewer customers abandon, and more payments succeed.', icon: `${IMG}/services/PGSI8.svg` },
    { name: 'Advanced Payment Gateway Features', body: 'Level up your payment stack with tokenization, saved cards, subscriptions, and smart retries that quietly improve user experience and revenue behind the scenes.', icon: `${IMG}/services/PGSI9.svg` },
    { name: 'Cross‑Border Payment Processing', body: 'Handle cross-border payments with confidence using integrations that respect regulations, manage FX, and give users a local, trustworthy payment experience anywhere.', icon: `${IMG}/services/PGSI10.svg` },
    { name: 'Cryptocurrency Payment Gateway Integration', body: 'Add cryptocurrency payment options to your product with integrations that make paying in digital assets feel simple and secure.', icon: `${IMG}/services/PGSI11.svg` },
    { name: 'Embedded Payment Solutions', body: 'Embed payments directly inside your SaaS, marketplace, or platform so users never leave your experience while money moves securely in the background.', icon: `${IMG}/services/PGSI12.svg` },
    { name: 'PCI DSS Compliant Payment System Development', body: 'Build PCI DSS-compliant payment systems from day one, so your business avoids penalties, reduces risk, and earns customer trust at every transaction.', icon: `${IMG}/services/PGSI13.svg` },
  ] as readonly PgCard[],
} as const;

export const pgWhy = {
  eyebrow: 'Why Choose Us',
  title: 'Why Choose Us for Payment Gateway Integration?',
  body: 'At Soft Suave, we blend fintech expertise with robust engineering to deliver outcome-driven solutions that keep your payments secure, scalable, and ready for growth. Partner with us for seamless payment gateway integration, where our experts create tailored solutions to streamline transactions, boost efficiency, and keep your business at the forefront of the digital payments landscape. Here’s why we stand out',
  image: { src: `${GEN}/why/why-choose-us-themw.webp`, width: 1563, height: 1563, alt: 'An illustration of a man and a woman standing with puzzled expressions, both pondering a question. Above their heads are question marks, symbolizing uncertainty or curiosity. The background includes minimalistic art with a potted plant, indicating a modern, simple design. The image represents a sense of doubt or consideration, potentially relating to the decision-making process, such as why Soft Suave would be the best offshore software development company.' },
  items: [
    { name: 'Deep fintech expertise', body: 'Leverage deep fintech domain mastery. We provide elite payment gateway integration services to simplify even the most complex global flows.', icon: `${OLD}/why/model_icon_1.svg` },
    { name: 'Proven high-volume platforms', body: 'Process thousands of payments per second. We build high-traffic gateways designed for 99.9% uptime and lightning-fast transaction speeds.', icon: `${GEN}/why/model_icon_8.svg` },
    { name: 'Security-first, PCI-aligned', body: 'Secure every transaction. Our payment gateway integration services prioritize PCI-DSS compliance and advanced encryption to prevent fraud.', icon: `${OLD}/why/model_icon_3.svg` },
    { name: 'Flexible, future-ready integrations', body: 'One integration, endless possibilities. We build modular payment stacks that easily adapt to new currencies, wallets, and tech shifts.', icon: `${GEN}/why/model_icon_7.svg` },
  ] as readonly PgCard[],
} as const;

export const pgTypes = {
  eyebrow: 'Models',
  title: 'Types of Payment Gateway Integration',
  body: 'Understand the key types of payment gateway integration so you can choose the right approach for your stack, business model, and customer experience goals.',
  items: [
    { name: 'Hosted Payment Gateway', body: 'Use hosted payment gateways to go live faster with pre-built, secure payment pages that minimize your compliance burden while keeping checkout simple.​', icon: `${IMG}/types/PGMI1.svg` },
    { name: 'API-based Payment Gateway', body: 'Leverage API-based payment gateways to fully control the payment journey, embed them within your UI, and create uniquely branded customer experiences.', icon: `${IMG}/types/PGMI2.svg` },
    { name: 'Self-hosted Payment Gateway', body: 'Deploy self-hosted payment gateways when you need maximum control over data, flows, and integrations, while carefully managing security and compliance internally.', icon: `${IMG}/types/PGMI3.svg` },
    { name: 'Multi-currency Payment Gateway', body: 'Implement multi-currency gateways to support international users with localized pricing and smoother conversions that feel native in your product.', icon: `${IMG}/types/PGMI4.svg` },
    { name: 'Mobile Payments Integration', body: 'Deliver fast, frictionless mobile payment experiences by integrating native SDKs, wallets, and in-app flows that match how customers already pay on their devices.', icon: `${IMG}/types/PGMI5.svg` },
  ] as readonly PgCard[],
} as const;

export const pgTech = {
  eyebrow: 'Tech Stack',
  title: 'Payment Gateway Development Technology Stack',
  body: 'We rely on a modern payment gateway development technology stack that balances performance, security, and scalability across web, mobile, and backend services.',
  /** Rows shown before "View More". */
  visible: 4,
  groups: [
    { name: "Frontend Frameworks", items: ["React", "Angular", "Vue", "Next.js for responsive", "Conversion-focused checkout UIs"] },
    { name: "Frontend Core", items: ["HTML5", "CSS3", "JavaScript/TypeScript", "Form Validation", "Responsive Layouts", "Accessibility"] },
    { name: "Mobile Platforms", items: ["Native iOS (Swift)", "Android (Kotlin)", "Flutter", "React Native", "Mobile Wallet SDKs"] },
    { name: "Backend Languages", items: ["Node.js", "Python", "Java", ".NET", "PHP", "Ruby for secure server-side payment logic"] },
    { name: "Backend Frameworks", items: ["Express", "NestJS", "Spring Boot", "Django", "Laravel", "ASP.NET Core"] },
    { name: "Payment Gateway APIs/SDKs", items: ["Stripe", "PayPal", "Razorpay", "Braintree", "Adyen", "Checkout.com", "PhonePe", "PayU Integrations"] },
    { name: "API Design & Integration", items: ["REST/GraphQL APIs", "webhooks", "Idempotency Keys", "Retries", "Error Handling"] },
    { name: "Databases & Storage", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis for Transactions", "Ledgers", "Sessions"] },
    { name: "Security & Encryption", items: ["TLS/HTTPS", "AES-256", "Tokenization", "HSMs", "Secrets Management (Vault, KMS)"] },
    { name: "PCI DSS & compliance", items: ["PCI DSS implementation", "Data Minimization", "Logging", "Audit Trails", "3D Secure", "SCA"] },
    { name: "Fraud & Risk Modules", items: ["Rule engines", "Velocity Checks", "Device Fingerprinting", "Chargeback Monitoring", "Risk Scoring"] },
    { name: "Orchestration & routing", items: ["Payment Orchestration Engines", "Smart Routing", "Fallback Processors", "Multi-PSP Setups"] },
    { name: "Messaging & queues", items: ["Kafka", "RabbitMQ", "SQS for async events", "Webhooks", "Settlement Workflows"] },
    { name: "DevOps & cloud", items: ["AWS/Azure/GCP", "Docker", "Kubernetes", "CI/CD pipelines", "Auto-Scaling", "Monitoring"] },
    { name: "Observability & logging", items: ["Centralized Logs", "Metrics", "Tracing (ELK, Prometheus, Grafana) for Payment Flows"] },
    { name: "Testing & QA", items: ["Unit", "Integration", "Contract", "Load", "Security Testing for Payment Scenarios"] },
  ],
} as const;

export const pgProcess = {
  eyebrow: '',
  title: 'The Payment Gateway Integration Process',
  body: 'Unlock seamless and secure transactions with our payment gateway integration process. Dive into the details and see how we deliver',
  cta: { label: 'Book a Consultation', href: '/30-min-free-consultation' },
  items: [
    { name: 'Discovery & Requirement Gathering', body: 'Clarify goals, flows, edge cases, and compliance requirements upfront so every technical decision supports your payment strategy and long-term roadmap.', label: 'STEP 1' },
    { name: 'Choosing the Right Payment Gateway Provider', body: 'Evaluate and select the right payment gateway provider by matching features, fees, regions, and support levels with your current and future business needs.', label: 'STEP 2' },
    { name: 'Designing and Development', body: 'Translate business and UX requirements into robust payment designs and development sprints that create secure, intuitive, and maintainable payment journeys.', label: 'STEP 3' },
    { name: 'Security Implementation and Compliance Checks', body: 'Integrate security and compliance through every layer, using systematic checks to ensure your payment stack meets regulatory and industry expectations.', label: 'STEP 4' },
    { name: 'Testing & QA', body: 'Stress-test every payment scenario, failure path, and integration point to ensure your gateway works reliably under real-world load and edge conditions.', label: 'STEP 5' },
    { name: 'Deployment and Ongoing Support', body: 'Deploy confidently with monitoring, analytics, and ongoing support that help you optimize payment performance and resolve issues before users feel them.', label: 'STEP 6' },
  ] as readonly PgCard[],
} as const;

export const pgIntegrations = {
  eyebrow: 'Integrations',
  title: 'Types of Solutions We Integrate with Payment Gateways',
  body: 'Payment gateway integration is most powerful when it seamlessly connects with the software your customers already use, beyond just checkout. Discover the types of solutions we integrate to elevate payment experience.',
  items: [
    { name: 'SaaS and Subscription Platforms', body: 'Integrate payments into SaaS products to handle recurring billing, upgrades, downgrades, and trials without forcing users out of your application experience.', icon: `${IMG}/integrations/saas-12.svg` },
    { name: 'POS, Billing, and Invoicing Systems', body: 'Link gateways with POS terminals, billing tools, and invoicing platforms so in-store, online, and back-office payments share one unified data flow.', icon: `${IMG}/integrations/pos-12.svg` },
    { name: 'Mobile Apps and Super Apps', body: 'Connect payment gateways to mobile apps and super apps, enabling users to pay with cards, wallets, or UPI quickly and securely.​', icon: `${IMG}/integrations/mobile-12.svg` },
    { name: 'E‑commerce Stores and Marketplaces', body: 'Embed seamless checkouts into online stores and multi-vendor marketplaces so buyers can complete orders quickly while funds route correctly between all parties.', icon: `${GEN}/industries/eCommerce-12.svg` },
    { name: 'CRM, ERP, and Accounting Platforms', body: 'Integrate payments with CRM, ERP, and accounting systems so every transaction automatically updates customer records, inventory, and financial reports.', icon: `${IMG}/integrations/crm-12.svg` },
    { name: 'Membership, EdTech, and Community Portals', body: 'Power memberships, courses, and gated communities with integrated payments for enrollments, renewals, and upgrades in a single, consistent experience.​', icon: `${GEN}/industries/education-12.svg` },
  ] as readonly PgCard[],
} as const;

export const pgPower = {
  title: 'Power Up Your Payments with Expert Gateway Integration',
  body: 'Unlock effortless, secure payment processing with our tailored integration services. Boost efficiency, scalability, and customer satisfaction with reliable payment solutions',
  cta: { label: 'Request a Consultation', href: '/30-min-free-consultation' },
} as const;

export const pgFaqs: FaqContent = {
  eyebrow: 'Ask Us',
  title: 'Payment Gateway Development FAQ',
  body: 'Get answers to the most important payment gateway development questions.',
  items: [
    { q: 'What is a payment gateway service?', a: 'A payment gateway service securely authorizes, processes, and routes online transactions between your customers, your business, and supporting financial institutions.' },
    { q: 'What are the types of payment gateways?', a: 'Payment gateways typically include hosted, API-based, self-hosted, and local or bank-integrated models, each offering different levels of control and responsibility.​' },
    { q: 'What is the difference between a payment platform and a payment gateway?', a: 'A payment gateway processes transactions between customers and merchants, while a payment platform offers a broader set of tools for managing payments, including gateways, fraud detection, and reporting, all in one solution.' },
    { q: 'Why is payment gateway integration important for my business?', a: 'Payment gateway integration is essential for converting visitors into paying customers by making transactions seamless, secure, and trustworthy across all your channels.' },
    { q: 'Can you integrate third-party payment gateways with existing systems?', a: 'Third-party payment gateways can be integrated with your existing systems, ensuring data flows smoothly between apps, back-office tools, and reporting pipelines.​' },
    { q: 'Why is Soft Suave the best choice for payment gateway integration?', a: 'Soft Suave stands out by blending fintech experience, technical depth, and flexible engagement so your payment integration delivers tangible, long-term business value.​' },
    { q: 'How long does it take to integrate a payment gateway?', a: 'Timelines for payment gateway integration vary according to platform complexity, particular requirements, customisation needs, etc. So it is difficult to mention the exact time period.' },
  ],
};
