/**
 * Copy for the `/industries` sector index (app/(marketing)/industries).
 *
 * `/industries` is the route softsuave.com publishes this page at — it is where
 * the live mega-menu's "See all Industries" goes — so the slug is the live
 * site's, not a new invention.
 *
 * Sourcing rule for this file: every sector's `tagline` is the wording the live
 * mega-menu uses, every `body` is the wording the live `/industries` cards use,
 * and every `solutions` entry names a solution one of those industry pages
 * actually lists. `href` is the real page for that sector on softsuave.com, so
 * nothing here links at a route that does not exist — `SiteLink` decides
 * between a local route and the live site (see themes/softsuave/nav-data).
 *
 * What is deliberately NOT here: figures and case studies. The proof numbers
 * come from `why.stats` and the studies from `caseStudies` in
 * `lib/home/content.ts`, so this page can never quote a different number than
 * the homepage does.
 */

export const meta = {
  title: 'Industries We Serve — Industry-Specific AI Solutions | Soft Suave',
  description:
    'Industry-specific AI solutions for FinTech, HealthTech, eCommerce, Logistics, EdTech, Telecom, Construction and Aviation, built for measurable outcomes.',
  path: '/industries',
} as const;

export const hero = {
  /** The live page's H1, split for the masked line reveal. */
  titleLines: ['Industry-specific AI solutions', 'for strategic advancement'],
  body: 'We build AI around the way an industry actually runs — its data, its systems, its regulations and its people — so operations get leaner, costs come down, and performance compounds.',
  aside:
    'Eight sectors, one engineering bench. Every engagement starts with the business problem and ends in a production system your teams keep using.',
  primaryCta: { label: 'Book AI Strategy Call', href: '/contact' },
  secondaryCta: { label: 'See all sectors', href: '#sectors' },
  /**
   * The hero's stacked image column. Ids are generated portrait slots
   * (`four/ind-*`), so the subjects are centred in a 800×1000 crop and survive
   * the column's narrower frame on mobile.
   */
  frames: [
    { id: 'ind-fintech', alt: 'Financial technology team reviewing digital banking data' },
    { id: 'ind-healthtech', alt: 'Clinician working with connected healthcare technology' },
    { id: 'ind-logistics', alt: 'Container terminal moving freight at scale' },
  ],
} as const;

export const sectors = {
  eyebrow: 'Sectors',
  title: 'Enhancing industries with custom AI solutions',
  body: 'Each sector has its own solution set, its own regulatory shape and its own page. Start where your business already is.',
  /**
   * `img` names a generated portrait slot (`four/ind-<key>`). Construction and
   * Aviation have none: the image pipeline has no `ind-construction` /
   * `ind-aviation` frame yet, and `getImage` throws rather than ship an empty
   * <img>. Both render in the grid's typographic treatment instead of borrowing
   * a photograph of another industry — the two slots are declared in
   * `content/images.manifest.json` for the next `npm run images:home` run, and
   * adding the art is then a one-word change here.
   */
  items: [
    {
      key: 'fintech',
      name: 'FinTech',
      tagline: 'Shaping Financial Futures',
      body: 'AI-driven insights, fraud detection, and automation streamline processes, boosting efficiency in FinTech.',
      href: '/fintech-ai-solutions',
      img: 'ind-fintech',
      solutions: ['Real-time fraud detection', 'Credit risk and underwriting', 'Regulatory automation'],
    },
    {
      key: 'healthtech',
      name: 'HealthTech',
      tagline: 'Optimizing Health Solutions',
      body: 'AI solutions enhance patient care, optimize workflows, and improve diagnostics for healthtech innovations.',
      href: '/ai-solutions-in-healthtech',
      img: 'ind-healthtech',
      solutions: ['Patient intake and risk scoring', 'Clinical analysis and reporting', 'Staff and resource scheduling'],
    },
    {
      key: 'edtech',
      name: 'EdTech',
      tagline: 'Transforming Education',
      body: 'AI personalizes learning, automates administrative tasks, and enhances student engagement in EdTech.',
      href: '/ai-solutions-in-edutech',
      img: 'ind-edtech',
      solutions: ['Adaptive assignment tools', 'Student progress monitoring', 'Auto-grading at scale'],
    },
    {
      key: 'ecommerce',
      name: 'eCommerce',
      tagline: 'Boosting Online Sales',
      body: 'AI enhances customer experiences, improves inventory management, and drives targeted marketing for e-commerce.',
      href: '/ai-solutions-for-ecommerce',
      img: 'ind-ecommerce',
      solutions: ['Recommendation systems', 'Demand forecasting', 'Visual search'],
    },
    {
      key: 'logistics',
      name: 'Logistics',
      tagline: 'Streamlining Supply Chains',
      body: 'AI optimizes routes, reduces costs, and enhances real-time tracking for smarter logistics management.',
      href: '/ai-in-logistics',
      img: 'ind-logistics',
      solutions: ['Route and freight optimization', 'Real-time shipment tracking', 'Document automation'],
    },
    {
      key: 'telecom',
      name: 'Telecom',
      tagline: 'Connecting Global Networks',
      body: 'AI solutions optimize network management, improve customer service, and enable predictive maintenance in telecom.',
      href: '/ai-solutions-for-telecom',
      img: 'ind-telecom',
      solutions: ['Predictive maintenance', 'Automated fault resolution', 'Revenue assurance'],
    },
    {
      key: 'construction',
      name: 'Construction',
      tagline: 'Building Tomorrow’s World',
      body: 'AI streamlines project management, predicts risks, and enhances safety protocols in the construction industry.',
      href: '/ai-solutions-for-construction',
      img: null,
      solutions: ['Smart scheduling', 'Site safety monitoring', 'Inventory and downtime control'],
    },
    {
      key: 'aviation',
      name: 'Aviation',
      tagline: 'Enhancing Aviation with Tech',
      body: 'AI enhances flight safety, optimizes scheduling, and streamlines operations for the aviation industry.',
      href: '/ai-in-aviation',
      img: null,
      solutions: ['Operational scheduling', 'Safety analytics', 'Maintenance forecasting'],
    },
  ],
} as const;

export const capabilities = {
  eyebrow: 'Engineering Capability',
  title: 'Six capabilities, tuned to your sector',
  body: 'Industry solutions differ in vocabulary far more than in engineering. These are the systems underneath them, and the sectors that lean on each one hardest.',
  items: [
    {
      n: '01',
      name: 'Forecasting and optimization',
      body: 'Demand forecasting, route and freight optimization, dynamic pricing and resource scheduling, trained on your own operational history.',
      sectors: ['Logistics', 'eCommerce', 'Construction'],
    },
    {
      n: '02',
      name: 'Document and data intelligence',
      body: 'Unstructured records turned into structured, queryable data: clinical notes, shipping paperwork, compliance filings, contracts.',
      sectors: ['HealthTech', 'FinTech', 'Logistics'],
    },
    {
      n: '03',
      name: 'Conversational AI and assistants',
      body: 'Support agents, virtual financial assistants and query automation grounded in your own content through retrieval rather than guesswork.',
      sectors: ['EdTech', 'FinTech', 'Telecom'],
    },
    {
      n: '04',
      name: 'Risk, fraud and safety',
      body: 'Transaction monitoring, underwriting models, network fault detection and site safety analytics, each with human review designed in.',
      sectors: ['FinTech', 'Telecom', 'Construction'],
    },
    {
      n: '05',
      name: 'Vision AI',
      body: 'Detection, classification and visual search running in production, from catalogue imagery to lane classification and axle counting.',
      sectors: ['eCommerce', 'Logistics', 'Aviation'],
    },
    {
      n: '06',
      name: 'Workflow automation and integration',
      body: 'Intelligent automation wired into the tools you already run, so AI reaches the workflow instead of sitting beside it.',
      sectors: ['Every sector'],
    },
  ],
} as const;

export const engagement = {
  eyebrow: 'Delivery',
  title: 'How a sector team gets staffed',
  body: 'Pick the shape that matches your stage. Every model draws on the same engineering bench, delivery process and security posture.',
  /**
   * softsuave.com's own pages for each delivery model, all of them real routes
   * on that site. `SiteLink` sends them there until this app serves a
   * counterpart of its own.
   */
  routes: [
    { label: 'Global Capability Center', href: '/global-capability-center' },
    { label: 'IT Staff Augmentation', href: '/it-staff-augmentation-services' },
    { label: 'Offshore Development', href: '/offshore-software-development-company' },
    { label: 'Product Engineering', href: '/product-engineering-services' },
    { label: 'Legacy Modernization', href: '/legacy-modernization-services' },
    { label: 'Cloud and DevOps', href: '/cloud-computing' },
  ],
} as const;

export const closing = {
  eyebrow: 'Next step',
  /** The live `/industries` closing band, verbatim. */
  title: 'Ready to Unlock Tailored AI Solutions for Your Industry?',
  body: 'Leverage our industry-specific AI solutions to drive innovation, optimize processes, and scale business growth.',
  primaryCta: { label: 'Book a Free Consultation', href: '/contact' },
  secondaryCta: { label: 'Explore AI services', href: '/ai-development-service' },
} as const;

export type Sector = (typeof sectors)['items'][number];
