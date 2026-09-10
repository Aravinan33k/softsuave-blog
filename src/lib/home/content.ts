/**
 * Single content source for all three pages (derived from
 * "New home page content - 29.6.26.docx"). Same content renders in
 * /one, /two, /three — each page maps it into its own inspiration's structure.
 */

export const brand = {
  name: "Soft Suave",
  tagline: "A KiwiTech Affiliate Company",
  email: "hello@softsuave.com",
  domain: "softsuave.com",
} as const;

export const hero = {
  eyebrow: "AI-Enabled Engineering",
  title: "Empowering Businesses with Scalable AI, Automation & Integrations",
  // words for the rotating-word treatment on /three
  rotatingWords: ["Scalable", "Intelligent"],
  subtitle:
    "Build scalable AI solutions, intelligent automation systems, and seamless integrations with AI-enabled engineering teams focused on real business outcomes.",
  primaryCta: { label: "Book AI Strategy Call", href: "/contact" },
  secondaryCta: { label: "Explore AI Solutions", href: "#services" },
} as const;

export const why = {
  eyebrow: "Why Soft Suave",
  /* The full stop is part of the title so the heading's word-splitter keeps it
     attached to "Launch" rather than floating it as a word of its own. */
  title: "Your AI Growth Partner, From Idea to Launch.",
  body: "With years of AI and software engineering experience, Soft Suave helps startups, SMBs, and enterprises build practical AI solutions backed by proven delivery strength.",
  /**
   * The proof cards. `label` is the kicker over the figure and must read with
   * the figure alone ("13+ Years Delivering", not "13+ Proven Delivery"); keep
   * it to one line at the card's width. `line` is the caption under the figure,
   * two lines at most so the four cards' contents stay level. `icon` names one
   * of the marks drawn in `stats.tsx`.
   */
  stats: [
    {
      value: 400,
      suffix: "+",
      label: "Engineering Specialists",
      icon: "specialists",
      line: "AI and engineering specialists building scalable systems in-house.",
    },
    {
      value: 13,
      suffix: "+",
      label: "Proven Delivery",
      icon: "years",
      line: "Years of delivering reliable software and production-ready AI solutions.",
    },
    {
      value: 150,
      suffix: "+",
      label: "Global Clients",
      icon: "clients",
      line: "Startups, SMBs and enterprises, from first idea to launch and beyond.",
    },
    {
      value: 20,
      suffix: "+",
      label: "Countries",
      icon: "countries",
      line: "Countries served through successful project delivery.",
    },
  ],
} as const;

// The two value props that used to live here now own their sections outright:
// the partner statement heads `clients`, the efficiency statement heads
// `industries`. Keeping a third copy here only invited them to drift apart.

/**
 * A client mark in the proof band. Give it a `src` (a file dropped under
 * `/public/brand/clients/`) and the real logo renders; leave `src` null and it
 * falls back to a typographic wordmark, so the strip is never broken while
 * artwork is still being collected.
 */
export type ClientLogo = { name: string; src: string | null };

/**
 * Client proof band — sits directly under "Why Soft Suave". Seeded with the
 * clients already named on the page (see `testimonials`), plus the full logo
 * carousel from softsuave.com's own "Clients" section — real artwork pulled
 * from that site and bundled under `/public/brand/clients/`; only add names we
 * are actually cleared to display.
 */
export const clients: {
  eyebrow: string;
  title: string;
  body: string;
  logos: ClientLogo[];
} = {
  eyebrow: "Clients",
  title: "Preferred AI-Enabled Technology Partner for Startups and SMBs",
  body: "We combine AI-enabled engineering with 13+ years of product development expertise to help clients build scalable AI solutions, automate complex workflows, and integrate systems for measurable business outcomes.",
  logos: [
    { name: "Phoenix Technologies", src: null },
    { name: "AMD Telecom", src: null },
    { name: "Perkypet", src: null },
    { name: "Atomise", src: "/brand/clients/atomise.webp" },
    { name: "CloudBankin", src: "/brand/clients/cloudbankin.webp" },
    { name: "Enigma", src: "/brand/clients/enigma.webp" },
    { name: "Waymore", src: "/brand/clients/waymore.webp" },
    { name: "Who's Up", src: "/brand/clients/whos-up.webp" },
    { name: "Warmpoint", src: "/brand/clients/warmpoint.webp" },
    { name: "Utiliko", src: "/brand/clients/utiliko.webp" },
    { name: "TrafficSpy", src: "/brand/clients/trafficspy.webp" },
    { name: "The 2020 Diet", src: "/brand/clients/the-2020-diet.webp" },
    { name: "Teamicate", src: "/brand/clients/teamicate.webp" },
    { name: "Sulekha", src: "/brand/clients/sulekha.webp" },
    { name: "PromosTV", src: "/brand/clients/promostv.webp" },
    { name: "Poorvika", src: "/brand/clients/poorvika.webp" },
    { name: "PaceWisdom", src: "/brand/clients/pacewisdom.webp" },
    { name: "Outsource", src: "/brand/clients/outsource.webp" },
    { name: "Omri", src: "/brand/clients/omri.webp" },
    { name: "OfficeSpace", src: "/brand/clients/officespace.webp" },
    { name: "Oasis Digital", src: "/brand/clients/oasis-digital.webp" },
    { name: "Netsmartz", src: "/brand/clients/netsmartz.webp" },
  ],
};

/**
 * `href` on each item is where that industry LIVES — the page softsuave.com
 * publishes for it. Every one of the six has a real page, so nothing here is an
 * anchor. It is what the footer's Industries column links to; the section on
 * this page keeps its own "view all" navigation and does not use it.
 */
export const industries = {
  eyebrow: "Industries",
  title: "AI-Driven Efficiency and Growth Across Industries",
  body: "Our AI-driven solutions help industries improve efficiency, scale operations, and accelerate transformation. By making business systems smarter and more connected, we help organizations modernize faster and stay competitive in a digital-first world.",
  items: [
    {
      key: "fintech",
      href: "/fintech-ai-solutions",
      name: "FinTech",
      body: "Redefining FinTech with AI-powered intelligence by enhancing security, automating decisions, and unlocking new financial possibilities. From real-time fraud detection to hyper-personalized banking, we drive the future of digital finance.",
    },
    {
      key: "healthtech",
      href: "/ai-solutions-in-healthtech",
      name: "HealthTech",
      body: "Elevate healthcare with next-gen advanced AI solutions that refine patient outcomes, optimize clinical workflows, and streamline operations. We deliver intelligent automation and data-driven insights for transformative health tech innovation.",
    },
    {
      key: "edtech",
      href: "/ai-solutions-in-edutech",
      name: "EdTech",
      body: "Reimagining education with next-gen AI solutions, creating personalized learning experiences, and smart content curation. From adaptive learning support to insightful analytics, we're pioneering the evolution of education.",
    },
    {
      key: "ecommerce",
      href: "/ai-solutions-for-ecommerce",
      name: "Ecommerce",
      body: "Transforming e-commerce with AI-driven solutions for smarter selling, faster operations, and better customer experiences. From personalized recommendations to inventory automation and real-time analytics, we help businesses grow efficiently.",
    },
    {
      key: "logistics",
      href: "/ai-in-logistics",
      name: "Logistics",
      body: "Optimizing logistics with AI-powered solutions for smarter supply chains, real-time tracking, and operational efficiency. From demand forecasting to automated route optimization, we drive seamless and cost-effective logistics management.",
    },
    {
      key: "telecom",
      href: "/ai-solutions-for-telecom",
      name: "Telecom",
      body: "Advancing telecom with AI-driven solutions for smarter networks, automated operations, and better customer experiences. From predictive maintenance to intelligent network optimization, we help providers improve reliability and efficiency.",
    },
  ],
} as const;

export const services = {
  eyebrow: "Our Services",
  title: "AI & Software Services Built for Businesses of All Sizes",
  body: "Whether you are a startup, SMB, or enterprise, Soft Suave helps you build AI solutions, develop software, automate workflows, and scale digital products with confidence.",
  // `img` names the generated image slot (`four/svc-<img>`) and is deliberately
  // separate from `key`: there are eight uploaded service shots and ten
  // services, so a couple of slots are shared until new art lands.
  //
  // `href` is where the service lives. Three of the ten have a real page —
  // Custom AI Development and its two children — and the rest deliberately hold
  // "#services": they are practices this page argues for (Data Engineering, the
  // FDE model, MLOps) that softsuave.com publishes no page for. Sending them to
  // a near-miss page would misdescribe them, so they scroll to the section that
  // does describe them. Swap in the real path as each page ships.
  items: [
    {
      key: "custom-ai-development",
      href: "/custome-ai-developement",
      img: "custom-ai",
      name: "Custom AI Development",
      body: "Create tailored solutions using generative AI, agentic AI, RAG, and more to automate workflows and solve complex business challenges.",
    },
    {
      key: "data-engineering",
      href: "#services",
      img: "ai-integrations",
      name: "Data Engineering",
      body: "Build reliable data foundations with ETL and ELT pipelines, orchestration, data quality controls, and real-time streaming.",
    },
    {
      key: "data-science",
      href: "#services",
      img: "modernization",
      name: "Data Science",
      body: "Turn data into actionable insights through model training, feature engineering, experimentation, and MLOps for scalable AI outcomes.",
    },
    {
      key: "generative-ai",
      href: "/generative-ai-development-company",
      img: "custom-software",
      name: "Generative AI",
      body: "Build tailored generative AI solutions using LLMs to create content, code, images, and intelligent experiences aligned with diverse business needs.",
    },
    {
      key: "agentic-ai",
      href: "/agentic-ai-development-services",
      img: "ai-agents",
      name: "Agentic AI",
      body: "Develop autonomous AI agents that reason, use tools, and execute multi-step workflows to support complex business processes and decisions efficiently.",
    },
    {
      key: "rag-document-ai",
      href: "#services",
      img: "web",
      name: "RAG and Document AI",
      body: "Create RAG and Document AI solutions that retrieve trusted knowledge, extract information, and deliver accurate, context-aware responses from enterprise data.",
    },
    {
      key: "computer-vision",
      href: "#services",
      img: "mobile",
      name: "Computer Vision",
      body: "Build computer vision solutions for detection, OCR, video analytics, and inspection, enabling faster analysis, improved accuracy, and smarter operational decisions.",
    },
    {
      key: "predictive-intelligence",
      href: "#services",
      img: "modernization",
      name: "Predictive Intelligence",
      body: "Turn historical and real-time data into forecasts, anomaly detection, and recommendations that help businesses anticipate outcomes and make informed decisions.",
    },
    {
      key: "mlops",
      href: "#services",
      img: "custom-software",
      name: "MLOps",
      body: "Streamline model deployment, monitoring, CI/CD, and lifecycle management to keep AI systems scalable, reliable, secure, and consistently performing in production.",
    },
    {
      key: "forward-deployed-engineers",
      href: "#services",
      img: "gcc",
      name: "Forward Deployed Engineers",
      body: "Hire forward-deployed engineers who work with customers to understand requirements, develop integrations, solve challenges, and deploy production-ready solutions efficiently.",
    },
  ],
} as const;

export const journey = {
  eyebrow: "AI Transformation Journey",
  title: "From AI Idea to Business Impact",
  body: "Move from AI idea to real business impact with a clear transformation journey that improves productivity, simplifies automation, and supports scalable growth.",
  steps: [
    { n: "01", name: "Business Challenge", body: "We start by understanding the business problem, its constraints, and the outcome that matters." },
    { n: "02", name: "AI Assessment", body: "We assess data, systems, and opportunities to find where AI creates the biggest impact." },
    { n: "03", name: "Prototype", body: "We build a focused prototype to validate value fast before scaling investment." },
    { n: "04", name: "Integration", body: "We connect AI into your existing tools and workflows with minimal disruption." },
    { n: "05", name: "Deployment", body: "We ship production-ready systems with the reliability and security enterprises expect." },
    { n: "06", name: "Optimization", body: "We continuously measure, tune, and scale to compound results over time." },
  ],
} as const;

export const caseStudies = {
  eyebrow: "AI Case Studies",
  title: "AI Success Stories Across Key Industries",
  body: "Explore how our AI solutions helped businesses automate workflows, reduce effort, improve decisions, and achieve measurable impact across industry projects.",
  cta: { label: "View Case Study", href: "/case-studies" },
  // `img` is an explicit BrandImage id (page "four") rather than an index-derived
  // one, so reordering or adding a case study can't silently pair a study with
  // another industry's photograph.
  items: [
    {
      key: "logistics",
      tag: "Logistics",
      img: "work-3",
      title: "Vision AI: Vehicle Detection and Axle Counting",
      body: "Built a real-time Vision AI solution to detect vehicles, classify multiple lanes, and recognize floating axles, achieving 95%+ accuracy while improving congestion monitoring and toll inspection decisions across transportation networks.",
      metricValue: "95%+",
      metricLabel: "detection accuracy",
      year: "2025",
    },
    {
      key: "ecommerce",
      tag: "E-commerce",
      img: "work-1",
      title: "Unified Revenue for Subscription Commerce",
      body: "Modernized a unified subscription commerce platform with scalable architecture, faster merchant onboarding, secure payments, enhanced subscriptions, and AI-assisted engineering, contributing to improved reliability, continuous innovation, and $10M+ ARR business growth.",
      metricValue: "$10M+",
      metricLabel: "ARR growth",
      year: "2026",
    },
    {
      key: "healthtech",
      tag: "HealthTech",
      img: "work-2",
      title: "Healthcare AI: Pet Care",
      body: "Developed a centralized pet-care AI platform that unified health records, enabled early assessments and reminders, reduced manual record management by 90%, accelerated processing by 60%, and improved preventive care tracking by 50%.",
      metricValue: "90%",
      metricLabel: "less manual record work",
      year: "2026",
    },
    {
      key: "edtech",
      tag: "EdTech",
      img: "work-5",
      title: "AI-Powered Learning and Classroom Management",
      body: "Developed an AI-powered education platform with interactive assignments, personalized study tools, real-time feedback, teacher dashboards, role-based monitoring, and guest access, enhancing student engagement, writing, critical thinking, and classroom management efficiency.",
      metricValue: "Real-time",
      metricLabel: "feedback & dashboards",
      year: "2025",
    },
  ],
} as const;

export const enterprise = {
  eyebrow: "Enterprise AI Integrations",
  title: "Integrate AI Into Your Existing Enterprise Ecosystem",
  body: "Soft Suave helps businesses connect AI with the tools they already use, so teams can automate work without changing their entire technology setup.",
  pillars: ["Delivery Method", "Industry Recognitions"],
} as const;

/**
 * Industry recognitions — the awards band from softsuave.com. Each entry is a
 * badge we actually hold; `org` is the directory that issued it and `title` is
 * the exact wording on the badge artwork. Adding entries needs no layout change.
 */
export const recognitions = {
  eyebrow: "Awards",
  title: "Industry Recognitions",
  body: "Our commitment to innovation and excellence has earned us industry-leading awards and recognition, reinforcing our dedication to delivering top-tier solutions.",
  /** `href` is this app's own awards page, not softsuave.com's — the route is
   *  `app/(marketing)/awards-recognition`, and it renders `items` below in
   *  full. */
  cta: { label: "View All", href: "/awards-recognition" },
  items: [
    { key: "clutch", org: "Clutch", title: "Top B2B Company Global", year: "2024", src: "/brand/awards/clutch.webp" },
    { key: "upfirms", org: "UpFirms", title: "Top Software Development Company", year: "2024", src: "/brand/awards/upfirms.webp" },
    { key: "softwareworld", org: "SoftwareWorld", title: "Top Rated Software Development Company", year: "2024", src: "/brand/awards/softwareworld.webp" },
    { key: "techreviewer", org: "Techreviewer", title: "Top Software Development Company", year: "2024", src: "/brand/awards/techreviewer.webp" },
    { key: "topdevelopers", org: "TopDevelopers.co", title: "Top Mobile App Development Company", year: "2023", src: "/brand/awards/topdevelopers.webp" },
    { key: "allaboutapps", org: "All About Apps", title: "Top Web Development Firms", year: "2023", src: "/brand/awards/allaboutapps.webp" },
    { key: "techimply", org: "Techimply", title: "Top Mobile App Development Company", year: "2022", src: "/brand/awards/techimply.webp" },
    { key: "goodfirms", org: "GoodFirms", title: "Top Mobile App Development Company", year: null, src: "/brand/awards/goodfirms.webp" },
    { key: "selectedfirms", org: "SelectedFirms", title: "Top eCommerce Development Company", year: null, src: "/brand/awards/selectedfirms.webp" },
    { key: "extract", org: "Extract", title: "Top Software App Development Company in USA", year: null, src: "/brand/awards/extract.webp" },
    { key: "wadline", org: "Wadline", title: "Top Mobile App Developers", year: null, src: "/brand/awards/wadline.webp" },
    { key: "nasscom", org: "NASSCOM", title: "Rewarded With Membership", year: null, src: "/brand/awards/nasscom.webp" },
  ],
} as const;

/**
 * Masthead of the standalone /awards-recognition page.
 *
 * The wall itself is `recognitions.items` — one list of accolades for the whole
 * site, so the homepage band and this page can never disagree about what we have
 * won. Only the framing copy lives here.
 */
export const awardsPage = {
  eyebrow: "Awards",
  title: "Awards and Recognition",
  body: "Thirteen years of building software has been accompanied by recognition from the industry's own directories and review platforms. Each of the marks below was issued by the organisation named beside it, on the strength of verified client reviews and independent assessment.",
} as const;

export const techStack = {
  eyebrow: "Technology Stack",
  title: "Modern Tech Stack for AI and Software Solutions",
  body: "We use modern AI, software, cloud, mobile, and web technologies to create smarter, scalable, future-ready solutions for business growth.",
  groups: [
    { name: "Foundation Models", items: ["GPT", "Claude", "Gemini", "Llama", "Mistral", "DeepSeek", "OpenAI", "Anthropic"] },
    { name: "AI Frameworks", items: ["LangChain", "LangGraph", "CrewAI", "AutoGen", "LlamaIndex", "Semantic Kernel"] },
    { name: "Vector Databases and Search", items: ["Pinecone", "Weaviate", "Qdrant", "Milvus", "FAISS", "Chroma"] },
    { name: "Cloud AI and Data Platforms", items: ["Azure AI", "Amazon Bedrock", "Google Vertex AI", "Databricks", "Snowflake", "Hugging Face"] },
    { name: "Frontend Technologies", items: ["React", "Angular", "Vue.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3"] },
    { name: "Backend Technologies", items: ["Node.js", ".NET", "Java", "Python", "PHP", "Ruby on Rails", "Django", "NestJS"] },
    { name: "UI/UX Design Tools", items: ["Figma", "Sketch", "Framer", "Miro", "Adobe Photoshop", "Adobe Illustrator"] },
    { name: "Testing and QA Tools", items: ["Selenium", "Cypress", "Playwright", "Appium", "Postman", "Apache JMeter"] },
  ],
} as const;

// Engagement models fill the /two "pricing" slot (our content has no prices).
export const engagementModels = {
  eyebrow: "Engagement Models",
  title: "Ways to Work With Soft Suave",
  body: "Flexible engagement models designed around your stage, speed, and scale.",
  tiers: [
    {
      name: "AI Strategy Retainer",
      forWho: "For teams scoping AI",
      highlight: false,
      features: ["AI opportunity assessment", "Roadmap & architecture", "Weekly expert advisory", "POC guidance"],
    },
    {
      name: "Dedicated AI Team",
      forWho: "For scaling products",
      highlight: true,
      features: ["Cross-functional AI pod", "LLMs, RAG & agents", "Workflow automation", "Continuous delivery & optimization"],
    },
    {
      name: "Fixed-Scope Build",
      forWho: "For defined projects",
      highlight: false,
      features: ["Clear scope & timeline", "Prototype to production", "Enterprise integrations", "30-day post-launch support"],
    },
  ],
} as const;

export const finalCta = {
  title: "Ready to Transform Your Business with AI?",
  body: "Book a free AI strategy session with our experts and discover where AI can create the biggest impact in your organization.",
  /**
   * This app's OWN `/contact` route, which is the whole reason that route
   * exists — both "Book" CTAs were asked to lead to a dedicated contact page
   * here rather than to softsuave.com. `hero.primaryCta` and `nav.cta` point
   * at the same place.
   *
   * The `/contact` page renders this very band at its foot, so it would
   * otherwise link to itself. It doesn't: that page passes `ctaHref` to
   * `<Contact>` and gets `#contact` instead, the same in-page destination its
   * own masthead nav already uses.
   */
  cta: { label: "Book a Free Consultation", href: "/contact" },
  altCta: { label: "Talk With AI Experts", href: "#contact" },
} as const;

/** Masthead of the standalone /contact page, above the `finalCta` finale. */
export const contactPage = {
  eyebrow: "Contact",
  title: "Let's Talk About Your AI Roadmap",
  body: "Tell us where you are — an idea worth testing, a pilot that needs to scale, or systems that need to get smarter. We reply within one business day with a practical next step.",
} as const;

/**
 * A client review.
 *
 * `photo` is the client's ACTUAL likeness, bundled under
 * `public/brand/testimonials/` from softsuave.com's own testimonial section —
 * not Pexels art, so it is deliberately outside the generated image manifest
 * (`npm run images:home` rewrites that file) and rendered straight through
 * `publicMediaUrl`. `/brand/**` is already allowed in `next.config.ts` →
 * `images.localPatterns`, so the optimizer serves these.
 *
 * The three fallbacks exist in this order, and the order matters: a real photo,
 * else a generated `avatar-*` slot, else a typographic monogram (the same
 * convention as `ClientLogo`'s wordmark fallback). Never reach for a stock
 * headshot of a stranger to sit under a real client's name.
 *
 * `role` is optional because the two video reviews on softsuave.com state
 * neither a title nor a company.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  rating: string;
  /** Root-relative path under /public — the client's real photo. */
  photo?: string;
  /** Id into the generated page-"four" Pexels avatar slots (avatar-1…3). */
  avatarId?: string;
  /**
   * Editorial filter tag for the story archive. Optional, and deliberately
   * loose: the archive's filter row is DERIVED from the distinct values present
   * here, so adding a review with a new tag adds the filter, and dropping the
   * last review of a tag drops it. Nothing else stores a category list.
   *
   * Tag by what the review itself supports — Roland White names a mobile app,
   * Tim Maliyil calls us a "technology partner". Where a review states nothing,
   * leave it off rather than inventing a practice area: an untagged review
   * still shows under "All stories".
   */
  category?: string;
  /**
   * The review's own source on softsuave.com — where the site's testimonial
   * links out to. Today that is only the two video reviews, whose portraits are
   * anchors to YouTube (`a.video_test` in the site's testimonial markup); the
   * three written reviews link nowhere there (`href="#"`), so they carry no
   * link here either rather than pointing at something invented.
   *
   * Anything set here is treated as an off-site destination: the story's
   * photograph becomes the link and a second text link appears beside the
   * expander, both `target="_blank"` with `rel="noopener noreferrer"`, matching
   * how the source site opens them.
   */
  videoUrl?: string;
  /**
   * The same review as a video file WE serve, root-relative under /public
   * (alongside the portrait, in `public/brand/testimonials/`).
   *
   * Setting this is what gives a review a player at all, and it is the ONLY
   * way a review plays on the page. We do not embed YouTube: it gates embedded
   * playback behind a "sign in to confirm you're not a bot" screen for any
   * viewer whose IP it distrusts — VPNs, an office behind one NAT — and no
   * embed parameter gets past it. A review with only a `videoUrl` therefore
   * opens in a new tab, where that check doesn't apply.
   *
   * These are our own films off our own channel, so serving them ourselves is
   * both the reliable path and the faster one. `videoUrl` stays set either
   * way: it is the credit, and the "watch on YouTube" link in the story's
   * action row still points at it.
   */
  videoFile?: string;
};

export const testimonials: {
  eyebrow: string;
  title: string;
  /** The display stack — one line per rendered line of the archive's masthead.
   *  `title` stays the single-string form for anything that needs it flat. */
  titleLines: string[];
  body: string;
  /**
   * The masthead abstract, one entry per column of its two-column set.
   *
   * Split by SENTENCE rather than by CSS `columns`, which broke the paragraph
   * mid-clause and left two orphaned fragments sitting apart. `body` stays the
   * single-string form for anything that needs it flat.
   */
  bodyLines: string[];
  items: Testimonial[];
} = {
  eyebrow: "Client Stories",
  title: "What Our Clients Say About Us",
  titleLines: ["What Our", "Clients Say", "About Us"],
  body: "We've empowered hundreds of clients globally to achieve their business goals. Hear firsthand how our expertise and AI-driven solutions have made a difference.",
  bodyLines: [
    "We've empowered hundreds of clients globally to achieve their business goals.",
    "Hear firsthand how our expertise and AI-driven solutions have made a difference.",
  ],
  items: [
    {
      quote:
        "Soft Suave's commitment to meeting deadlines, flexibility in working hours, and ability to seamlessly integrate with our U.S. team make them a reliable and invaluable technology partner.",
      name: "Tim Maliyil",
      role: "COO, Phoenix Technologies",
      rating: "5.0",
      photo: "/brand/testimonials/tim-maliyil.webp",
      category: "Technology",
    },
    {
      quote:
        "I've worked with Soft Suave for the past 3 years and the experience has been unique. Partnering with them reduced our costs by 40% and increased our delivery speed by 20%.",
      name: "Dimitris Rokos",
      role: "Founder & CEO, AMD Telecom",
      rating: "5.0",
      photo: "/brand/testimonials/dimitris-rokos.webp",
      category: "Technology",
    },
    {
      quote:
        "Their 40-hour free trial isn't just a marketing promise — it's a genuine opportunity to experience top-notch developer skills. I was beyond impressed with what they delivered.",
      name: "Dr. Dara Huang",
      role: "Co-Founder, Perkypet",
      rating: "5.0",
      photo: "/brand/testimonials/dara-huang.webp",
      category: "Web",
    },
    // The two video reviews from softsuave.com/#testimonials. Neither states a
    // role or company there, so neither invents one here. Both DO carry a link
    // there — the portrait is an anchor to the client's video on our YouTube
    // channel — so both carry `videoUrl`.
    {
      quote:
        "Soft Suave provides amazing service. I am completely satisfied with the projects and look forward to continuing my relationship. I will also recommend their services without question.",
      name: "Aaron. G",
      rating: "5.0",
      photo: "/brand/testimonials/aaron-g.webp",
      category: "Technology",
      videoUrl: "https://youtu.be/fkjg--dAEY4",
      // Plays in place the moment the film is in /public — add
      // `videoFile: "/brand/testimonials/aaron-g.mp4"` then. Until it is, the
      // portrait opens YouTube in a new tab.
    },
    {
      quote:
        "I've been asking Soft Suave to help me develop a mobile app. The team is available right from the start. They're nice guys to work with and highly recommend them. Thanks.",
      name: "Roland White",
      rating: "5.0",
      photo: "/brand/testimonials/roland-white.webp",
      category: "Mobile",
      videoUrl: "https://youtu.be/_YRv-r2q6xY",
      // As above: `videoFile: "/brand/testimonials/roland-white.mp4"`.
    },
  ],
};

/** The site's four top-level divisions, in order. Three are section anchors on
 *  this page (and on every landing page, which share those ids); Resources is
 *  the article archive route. Contact is deliberately absent — the CTA pill
 *  next to these links is the contact path. */
export const nav = {
  links: [
    { label: "Services", href: "#services" },
    { label: "Industries", href: "#industries" },
    { label: "Company", href: "#why" },
    { label: "Resources", href: "/blog" },
  ],
  cta: { label: "Book AI Strategy Call", href: "/contact" },
} as const;

/** A footer sitemap entry. `href` is either an in-page `#anchor` or a site path. */
export type FooterLink = { label: string; href: string };

export const footer = {
  tagline: "Empowering businesses with scalable AI, automation & integrations.",

  /**
   * Sitemap columns.
   *
   * Services and Industries are DERIVED from the page's own `services` and
   * `industries` content rather than retyped, so the footer can never list a
   * service the page above it no longer offers.
   *
   * Each entry carries its own `href`, so the column links to the real page
   * where one exists and falls back to the in-page section where it doesn't —
   * see the note on `services.items`. All six industries have a page; six of
   * the ten services do not.
   */
  columns: [
    {
      title: "Services",
      links: services.items.map((s) => ({ label: s.name, href: s.href })),
    },
    {
      title: "Industries",
      links: industries.items.map((i) => ({ label: i.name, href: i.href })),
    },
    {
      title: "Company",
      // Paths served by the live marketing site; `SiteLink` resolves each one.
      links: [
        { label: "About Us", href: "/about" },
        { label: "Awards & Recognition", href: "/awards-recognition" },
        { label: "Our Clients", href: "/clients" },
        { label: "Life at Soft Suave", href: "/life-at-softsuave" },
        { label: "Careers", href: "/career-overview" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      /**
       * The pages the live site reaches from its footer and nowhere else —
       * FAQs, How to Hire, the India delivery page — plus the proof archives.
       * They have no section on this page to anchor to, so the footer is where
       * they live, exactly as on softsuave.com.
       */
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Success Stories", href: "/success-stories" },
        { label: "How to Hire", href: "/how-to-hire" },
        { label: "Free Cost Estimation", href: "/free-cost-estimation" },
        { label: "FAQs", href: "/faqs" },
        { label: "Software Development India", href: "/software-development-company-india" },
      ],
    },
  ] as { title: string; links: FooterLink[] }[],

  /** Certification badge — artwork bundled from softsuave.com. */
  certification: {
    name: "ISO 27001:2022",
    src: "/brand/iso-27001-2022.jpg",
    width: 752,
    height: 267,
  },

  social: [
    { name: "LinkedIn", href: "https://www.linkedin.com/company/softsuave" },
    { name: "Instagram", href: "https://www.instagram.com/softsuavetech/" },
    { name: "YouTube", href: "https://www.youtube.com/@softsuave" },
  ],

  /**
   * Offices, as printed in softsuave.com's own footer. `region` drives nothing
   * but the label — no flag emoji, which render inconsistently on Windows.
   */
  offices: [
    {
      region: "USA",
      company: "Soft Suave LLC",
      lines: ["3030 K Street NW, Suite 102", "Washington, DC 20007, USA"],
    },
    {
      region: "India — Main Branch",
      company: "Soft Suave Technologies",
      lines: [
        "SSPDL Building, Alpha City, Gamma Block,",
        "5th Floor, Navalur, Chennai 603103",
      ],
    },
  ],

  /**
   * `display` is the human form; `href` the dialable/mailable one.
   *
   * `country` is an ISO 3166-1 alpha-2 code and picks the inline SVG flag in
   * `components/home/flag.tsx` — it replaces the old two-letter text label, so
   * the row reads as a flag and a number rather than "US +1 …". The flag also
   * carries the country as its accessible name, which is why nothing here
   * repeats it.
   *
   * `note` is an optional suffix shown in parentheses after the number. Only
   * the Indian line uses it: that number is the HR desk, not the sales line
   * the other two are, and dropping the label would have lost that.
   */
  contact: {
    email: "contact@softsuave.com",
    phones: [
      { country: "us", display: "+1 (410) 220-6301", href: "tel:+14102206301" },
      { country: "gb", display: "+44 7403 646450", href: "tel:+447403646450" },
      { country: "in", display: "+91 8015159981", note: "HR", href: "tel:+918015159981" },
    ],
  },

  /**
   * The legal line. `href` is optional on purpose: softsuave.com publishes a
   * privacy policy and links it from its own footer, but has no terms page —
   * so that one stays the plain label it has always been rather than pointing
   * somewhere that doesn't exist.
   */
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions" },
  ] as { label: string; href?: string }[],
} as const;

export type PageKey = "one" | "two" | "three" | "four";
