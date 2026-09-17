/**
 * Content for `/hire-ai-developer`.
 *
 * Source: softsuave.com/hire-ai-developer — the six "why hire from Soft Suave"
 * cards, the four-step hiring process, the six AI service cards, the four-part
 * vetting block (which becomes the `fit` selector), the technical-expertise
 * technology list, the Soft Suave/in-house/freelancer comparison and the five
 * FAQs.
 *
 * The live page's own service list is generative AI, machine learning, NLP, LLM
 * fine-tuning, predictive analysis and computer vision. Where this page names
 * RAG and agentic systems it is naming what `/generative-ai-development-company`
 * and `/agentic-ai-development-services` already describe on this site, and it
 * links to both rather than restating them.
 */

import type { HireRolePageContent } from './types';
import { heroForm, onboardingComparison } from './shared';

export const ai: HireRolePageContent = {
  key: 'hire-ai',
  slug: '/hire-ai-developer',
  name: 'Hire AI Developers',
  serviceType: 'AI and machine learning development staffing',

  meta: {
    title: 'Hire AI Developers in India | Generative AI, LLM & RAG Engineers',
    description:
      'Hire pre-vetted AI developers for generative AI, LLM applications, RAG, machine learning and computer vision. 40-hour risk-free trial, from $14/hour.',
  },

  hero: {
    eyebrow: 'Hire Developers by Role',
    titleLines: ['Hire AI Developers', 'Without the Long Hiring Cycle'],
    body: [
      'Soft Suave connects you with pre-vetted AI engineers across generative AI, LLM applications, retrieval-augmented generation, NLP, machine learning, computer vision and automation — contract-ready and onboarded fast.',
      'These are engineers who ship AI into production, not demo builders: evaluation before deployment, human review where it matters, and the integration work that decides whether a model ever reaches a user.',
    ],
    points: [
      'Generative AI, LLM and RAG expertise',
      'Pre-vetted engineers, profiles within 48 hours',
      '40-hour risk-free trial',
      'Airtight NDA and IP protection',
      '4–6 hours of time-zone overlap',
    ],
    form: heroForm({
      title: 'Hire skilled AI developers',
      requirementLabel: 'Your AI use case',
      requirementPlaceholder:
        'What should the system do, which data or systems does it need to reach, and what would success look like?',
      subject: 'AI developer hiring enquiry',
    }),
  },

  overview: {
    eyebrow: 'Overview',
    title: 'Hire AI Developers Who Take Models Into Production',
    paragraphs: [
      'AI hiring goes wrong in a predictable way: a strong notebook demo that never survives contact with real data, real permissions and real users. The engineer you need is one who can do the modelling and the unglamorous work around it — data access, retrieval quality, evaluation, guardrails, cost control and integration with the systems your business already runs.',
      'Soft Suave is a specialized agency for exactly that hire. You get engineers vetted on live technical work rather than on self-reported skills, matched against your use case, your data situation and the stack you already operate. You interview them, then judge the work itself through a 40-hour risk-free trial.',
      'Engagements are covered by an NDA before anything is shared, with defined IP protection. Rates start from $14 per hour and depend on experience, project scope and technology stack. For the delivery side of an AI programme rather than the hiring side, see our generative AI and agentic AI development services.',
    ],
  },

  fit: {
    eyebrow: 'How We Vet',
    title: 'How We Vet and Onboard AI Developers',
    body: 'We select engineers who are agile, dependable and experienced in delivering robust code under real deadlines and genuinely complex requirements. Four things decide whether someone reaches your shortlist.',
    columns: ['What we assess', 'How we assess it'],
    rows: [
      {
        problem: 'Sourcing from competitive markets',
        solution:
          'We recruit continuously from competitive technology markets rather than waiting for a requirement to arrive and then advertising. That is what makes a 48-hour shortlist possible without lowering the bar to fill it.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        problem: 'Depth of technical skill',
        solution:
          'Vetting includes challenging live coding tasks and deep technical evaluation — not a quiz. For AI roles that means reasoning about retrieval quality, evaluation design, prompt and model trade-offs, and where a system should defer to a human.',
        image: '/images/landing/services/svc-evaluation-llmops.webp',
      },
      {
        problem: 'Judgement, not just implementation',
        solution:
          'We hire engineers who think and collaborate rather than only code. In AI work that distinction is decisive: most of the value is in choosing what not to automate and recognising when a confident output is wrong.',
        image: '/images/landing/services/svc-model-selection.webp',
      },
      {
        problem: 'Working fit with your team',
        solution:
          'Candidates are adaptable, proactive and aligned with the way your team actually works — which you confirm yourself in the interview and during the trial, rather than taking on trust from us.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
    ],
  },

  capabilities: {
    eyebrow: 'AI Capabilities',
    title: 'AI Development Work You Can Hand Over',
    body: 'From generative AI and LLM applications through to machine learning and computer vision — end-to-end capability, with evaluation and integration treated as part of the build rather than an afterthought.',
    items: [
      {
        name: 'Generative AI Applications',
        body: 'Build products on GPT, Claude, Gemini, Llama and Mistral that generate and transform content, draft responses and streamline processes, with human review designed into the workflow.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        name: 'LLM Application Engineering',
        body: 'Prompt architecture, structured output, tool calling, context management, caching and cost control — the engineering that separates a reliable LLM feature from an expensive one.',
        image: '/images/landing/services/svc-model-selection.webp',
      },
      {
        name: 'RAG and Enterprise Knowledge',
        body: 'Ground answers in your own documents, records and knowledge bases with retrieval-augmented generation, chunking and embedding strategy, and permission-aware access so nobody retrieves what they should not see.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        name: 'LLM Fine-Tuning and Adaptation',
        body: 'Tailor large language models to a specific industry or task where prompting alone is not enough, improving accuracy in narrow domains against a measured baseline.',
        image: '/images/landing/services/svc-proof-of-concept.webp',
      },
      {
        name: 'Machine Learning and Predictive Models',
        body: 'Supervised, unsupervised and reinforcement learning applied to real business questions — forecasting, scoring, anomaly detection and automated decision support with the trade-offs made explicit.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
      {
        name: 'Natural Language Processing',
        body: 'Intelligent assistants, voice interfaces and text analytics that classify, extract and summarise, so systems can interpret and respond to language your users already use.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        name: 'Computer Vision',
        body: 'Analyse and interpret images and video for detection, classification, counting and inspection, with accuracy measured on your own footage rather than on a public benchmark.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
      {
        name: 'AI Integration and Deployment',
        body: 'Connect AI features to your APIs, CRM, ERP and internal services, then deploy with tracing, evaluation and monitoring so failures, latency and cost stay visible after launch.',
        image: '/images/landing/services/svc-evaluation-llmops.webp',
      },
    ],
  },

  midCta: {
    eyebrow: 'Start With a Trial',
    title: 'Test an AI Engineer on Your Own Use Case',
    body: 'Forty hours of real work on your data and your constraints tells you more than any interview. Risk-free, and no commitment until you are satisfied.',
    cta: { label: 'Start Your 40-Hour Trial', href: '#enquiry' },
  },

  engagement: {
    eyebrow: 'Engagement Models',
    title: 'Flexible Ways to Hire AI Developers',
    body: 'AI work rarely arrives fully specified, so pick the structure that matches how much is still unknown.',
    blocks: [
      {
        label: 'Dedicated AI engineer',
        body: 'An engineer who stays with your product across discovery, build, evaluation and iteration — the right choice when the use case will keep developing after the first release.',
      },
      {
        label: 'Time and material',
        body: 'For exploratory work where the scope depends on what the data turns out to support. Effort is reviewed and reprioritised each cycle rather than fixed in advance.',
      },
      {
        label: 'Fixed-cost or managed delivery',
        body: 'For a bounded piece of work with agreed deliverables and acceptance criteria, or a fully managed engagement where Soft Suave carries delivery responsibility.',
      },
    ],
  },

  process: {
    eyebrow: 'Hiring Process',
    title: 'Steps to Hire an AI Developer',
    body: 'Quick, streamlined and customised — from a use case to an engineer inside your team, with a real evaluation in the middle.',
    steps: [
      {
        n: '01',
        name: 'Share the Requirement',
        body: 'Tell us the use case, the data and systems involved, the AI expertise you need and the engagement model you have in mind.',
      },
      {
        n: '02',
        name: 'Review a Curated Shortlist',
        body: 'Review pre-vetted AI engineer profiles matched to your use case — typically shared within 48 hours.',
      },
      {
        n: '03',
        name: 'Interview the Shortlist',
        body: 'Speak to the engineers directly about relevant work, modelling choices, evaluation approach and how they would handle your data constraints.',
      },
      {
        n: '04',
        name: 'Run the Free 40-Hour Trial',
        body: 'Test skills on real work, risk-free: execution, judgement, communication and whether the approach holds up against your actual data.',
      },
      {
        n: '05',
        name: 'Onboard and Manage',
        body: 'Finalise the SLA and NDA, then integrate the engineer with your internal team, repositories, environments and review process.',
      },
    ],
  },

  specialisations: {
    eyebrow: 'Hire by Specialisation',
    title: 'AI Expertise You Can Hire Against',
    body: 'AI is not one skill set. Match the specialisation to the problem you are solving rather than to the label on the job description.',
    items: [
      {
        key: 'ai',
        name: 'Generative AI Engineers',
        body: 'Engineers who build products on foundation models — content generation, drafting, summarisation and transformation, with review workflows around them.',
      },
      {
        key: 'api',
        name: 'LLM Application Engineers',
        body: 'Prompt architecture, structured outputs, tool calling, context and memory strategy, caching and the cost control that makes an LLM feature sustainable.',
      },
      {
        key: 'data',
        name: 'RAG and Retrieval Engineers',
        body: 'Chunking, embedding and retrieval strategy over your own corpus, with permission-aware access and citation so answers can be verified.',
      },
      {
        key: 'automation',
        name: 'Agentic AI Engineers',
        body: 'Multi-step systems that plan, use approved tools and complete work under human oversight — with guardrails and approval checkpoints designed in.',
      },
      {
        key: 'performance',
        name: 'Machine Learning Engineers',
        body: 'Supervised, unsupervised and reinforcement learning for forecasting, scoring, recommendation and anomaly detection, evaluated against a measured baseline.',
      },
      {
        key: 'design',
        name: 'Computer Vision Engineers',
        body: 'Detection, classification, counting and inspection from images and video, using OpenCV, PyTorch, TensorFlow, MediaPipe and OpenPose.',
      },
      {
        key: 'integration',
        name: 'NLP Engineers',
        body: 'Classification, extraction, summarisation and conversational interfaces using spaCy, NLTK, BERT and transformer-based models.',
      },
      {
        key: 'qa',
        name: 'AI Evaluation Engineers',
        body: 'Task sets, scoring, regression suites and tracing, so accuracy and failure modes are measurable before release rather than discovered by users.',
      },
      {
        key: 'cloud',
        name: 'MLOps Engineers',
        body: 'Deployment, versioning, monitoring and retraining pipelines on Azure ML, AWS and Google Cloud so a model stays maintainable after launch.',
      },
    ],
  },

  comparison: onboardingComparison({
    title: 'Soft Suave vs an In-House Hire vs a Freelancer',
    body: 'AI roles are among the slowest to fill internally and the hardest to assess from a CV. These are the factors that usually decide the route.',
    column: 'Soft Suave AI engineer',
  }),

  techStack: {
    eyebrow: 'Technology Stack',
    title: 'Technologies Our AI Developers Work With',
    body: 'Foundation models, frameworks, vector stores, cloud AI platforms and the evaluation tooling that keeps an AI system honest after release.',
    groups: [
      {
        name: 'Foundation Models',
        items: ['GPT', 'Claude', 'Gemini', 'Llama', 'Mistral', 'OpenAI API'],
      },
      {
        name: 'AI and Retrieval Frameworks',
        items: ['LangChain', 'LangGraph', 'LlamaIndex', 'CrewAI', 'AutoGen', 'Semantic Kernel'],
      },
      {
        name: 'Machine Learning',
        items: ['Python', 'PyTorch', 'TensorFlow', 'Keras', 'scikit-learn', 'Pandas', 'PySpark'],
      },
      {
        name: 'NLP and Vision',
        items: ['spaCy', 'NLTK', 'Hugging Face', 'BERT', 'OpenCV', 'MediaPipe', 'OpenPose'],
      },
      {
        name: 'Vector Databases',
        items: ['Pinecone', 'Weaviate', 'Qdrant', 'Milvus', 'FAISS', 'Chroma'],
      },
      {
        name: 'Cloud AI Platforms',
        items: ['Azure AI', 'Amazon Bedrock', 'Google Vertex AI', 'Azure ML', 'Google Cloud Vision'],
      },
      {
        name: 'Deployment and Observability',
        items: ['Docker', 'Kubernetes', 'MLflow', 'LangSmith', 'Langfuse'],
      },
      {
        name: 'Evaluation and Guardrails',
        items: ['Ragas', 'DeepEval', 'Guardrails AI'],
      },
    ],
  },

  faq: {
    eyebrow: 'FAQs',
    title: 'Questions About Hiring AI Developers',
    body: 'Answers on cost, trials, engagement options and what happens after deployment.',
    items: [
      {
        q: 'How much does it cost to hire an AI developer?',
        a: 'Cost depends on the developer’s experience, project scope and technology stack. Soft Suave’s AI developer rates start from $14 per hour, with the final rate confirmed once your use case, responsibilities and engagement model are reviewed.',
      },
      {
        q: 'Is there a free trial period available?',
        a: 'Yes. Every engagement can start with a 40-hour risk-free trial, so you evaluate the engineer on real work before any longer-term commitment.',
      },
      {
        q: 'What engagement options are available?',
        a: 'A dedicated AI engineer, a time-and-material engagement, a fixed-cost scope, or a fully managed service where Soft Suave carries delivery responsibility. The right option usually depends on how much of the use case is still unknown.',
      },
      {
        q: 'How quickly can I get AI developer profiles?',
        a: 'Curated profiles are typically shared within 48 hours of your requirements discussion. Highly specialised requirements — an unusual modality, a narrow domain, a specific regulatory context — can take longer.',
      },
      {
        q: 'How do you protect our data and intellectual property?',
        a: 'Confidentiality agreements are signed before anything is shared, and intellectual-property responsibilities are documented in the engagement agreement. Data handling, system access and retrieval permissions follow the controls agreed for your organization.',
      },
      {
        q: 'Can an AI developer work with our existing engineering team?',
        a: 'Yes. AI engineers work inside your repositories, project-management tools, communication channels and review process, and coordinate with backend, data and DevOps engineers rather than running a separate track.',
      },
      {
        q: 'Do you provide support after deployment?',
        a: 'Yes. Continuous support, maintenance and optimization can continue after release — which matters more for AI than for conventional software, because model behaviour, data and cost all drift over time.',
      },
      {
        q: 'What if the AI developer is not the right fit?',
        a: 'You can request a replacement at no additional cost during or after the trial period, re-matched on your feedback, so an unsuitable profile does not cost you the engagement.',
      },
    ],
  },
};
