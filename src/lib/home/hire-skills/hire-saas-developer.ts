/**
 * The `hire-saas-developer` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-saas-developer/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all of them.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { partnerTable } from "../hire-comparison";
import { staffCostTestimonials } from "../staff-cost-calculator-content";

/**
 * /hire-saas-developer — softsuave.com's page, word for word. It runs the same
 * layout as the Kotlin page (clients, why-hire cards, steps, technical expertise,
 * services, vetting, comparison, testimonials, FAQs) without that page's
 * "Explore More Technologies" band, which this live page does not have.
 */
export const skill: HireSkill = {
  slug: "hire-saas-developer",
  key: "saas",
  name: "SaaS",
  role: "SaaS Developers",
  metaTitle: "Hire SaaS Developers | Fast, Affordable Cloud Talent On-Demand",
  metaDescription:
    "Hire SaaS developers from Soft Suave and get flexible engagement models, pre‑vetted talent, 40‑hour free trial & top-tier support to scale faster.",
  serviceType: "SaaS development staffing",
  ctaLabel: "Hire SaaS developers",

  order: [
    "clients",
    "whyUs",
    "process",
    "techStack",
    "services",
    "vetting",
    "comparison",
    "testimonials",
    "faq",
  ],

  hero: {
    titleLines: ["Hire SaaS Developers", "in India on Contract"],
    accent: "SaaS Developers",
    titleScale: "home",
    accentGradient: true,
    body: [
      "Soft Suave provides SaaS developers from India experienced in multi-tenant platforms, subscription systems, APIs, cloud architecture, product scaling, and secure SaaS development. Hire pre-vetted experts quickly to accelerate your SaaS product roadmap.",
      "See why businesses choose Soft Suave for their SaaS developer hiring.",
      "*Satisfaction Guaranteed – Get 40-hour Free Trial",
    ],
    points: ["40-Hour Risk-Free Trial", "Hire Top SaaS Developers in India", "Time-Zone & Language Aligned Teams", "Airtight NDA & IP Protection"],
    form: {
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your SaaS requirement.",
      subject: "SaaS Developers enquiry",
      alert: sharedHeroAlert,
    },
  },

  whyUs: {
    eyebrow: "Expert Developers",
    title: "Why Hire Saas Developers from Soft Suave",
    body: "With years of experience and unparalleled technical depth, our team elevates your platform’s performance. When you hire SaaS developers here, you gain a partner committed to the success of your project.",
    links: [{ text: "offshore software development services", href: "/offshore-software-development-company" }],
    items: [
      { name: "Pre-vetted SaaS developers", body: "Our pre-vetted SaaS developers undergo rigorous screening, ensuring your team gets proven experts with guaranteed technical and project excellence.", icon: "users" },
      { name: "Flexible hiring models", body: "Choose flexible hiring models that match your goals: fixed price, time & material, or dedicated team. Scale your SaaS development efficiently and stress-free.", icon: "gauge" },
      { name: "Global delivery standards", body: "We maintain global delivery standards, guaranteeing quality, consistency, and seamless communication for all SaaS projects, regardless of your business location.", icon: "globe" },
      { name: "Strict NDA & IP protection", body: "Enjoy complete peace of mind with strict NDA agreements and rock-solid IP protection, safeguarding your ideas and proprietary business assets.", icon: "shield" },
      { name: "Time Zone Flexibility", body: "Benefit from time zone flexibility. Our SaaS developers align with your business hours for real-time collaboration and fast project turnaround.", icon: "book" },
      { name: "World-Class Developers at Budget-Friendly Rates", body: "Experience world-class talent at affordable rates. Explore our offshore software development services for premium SaaS expertise without overspending.", icon: "coins" },
    ],
  },

  process: {
    eyebrow: "Hiring Processs",
    title: "Steps to Hire a SaaS Developer",
    body: "Start a seamless journey. Discover how effortless it is to hire SaaS developers who fit your culture.",
    steps: [
      { n: "01", name: "Share the JD", body: "Send us your detailed job description to match with the perfect SaaS developer quickly." },
      { n: "02", name: "Shortlist The Right Developers", body: "Receive handpicked, skilled candidates perfectly aligned to your project and technology requirements for review." },
      { n: "03", name: "Free 40-hour Trial", body: "Evaluate your chosen SaaS developer risk-free with our commitment-free 40-hour trial period." },
      { n: "04", name: "Onboard & Manage", body: "Easily onboard your developer and manage progress seamlessly, while we handle all administrative tasks." },
    ],
  },

  techStackStyle: "rows",
  techStackCollapsedRows: 4,
  hideHeroBreadcrumb: true,
  servicesPhotoCards: true,
  closingEnquiry: true,
  techStack: {
    eyebrow: "Expertise",
    title: "Technical Expertise of Our SaaS Developers",
    body: "From robust back-end logic to intuitive user interfaces, our developers bring leading tech stacks and frameworks. If your priority is innovation, hiring our SaaS developers ensures you stay ahead of the curve.",
    groups: [
      { name: "Front End", items: ["React.js", "Vue.js", "Angular", "HTML5", "CSS3", "Bootstrap", "JavaScript", "TypeScript"] },
      { name: "Back End", items: ["Node.js", "Python (Django, Flask)", "Ruby on Rails", "Java (Spring Boot)", "PHP", ".NET Core", "Golang"] },
      { name: "Cloud Platforms", items: ["AWS", "Azure", "Google Cloud Platform", "Heroku", "DigitalOcean"] },
      { name: "Databases", items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Firebase", "DynamoDB"] },
      { name: "APIs & Integrations", items: ["REST", "GraphQL", "SOAP", "OAuth2", "Webhooks", "Payment Gateways"] },
      { name: "Testing Tools", items: ["Jest", "Mocha", "Selenium", "Cypress", "Postman", "JUnit", "RSpec"] },
      { name: "DevOps & CI/CD", items: ["Docker", "Kubernetes", "Jenkins", "GitLab CI", "GitHub Actions", "Terraform"] },
      { name: "SaaS Modules", items: ["Multi-tenant Architecture", "Billing Systems", "User Management", "Subscription Management", "Analytics Dashboards"] },
      { name: "Libraries & Packages", items: ["Redux", "Lodash", "Moment.js", "Axios", "Express.js", "Passport.js", "Socket.io"] },
      { name: "Security", items: ["JWT", "OAuth2", "SSO", "Data Encryption", "OWASP", "SSL/TLS", "Vulnerability Scanning"] },
      { name: "Project Management", items: ["JIRA", "Trello", "Asana", "Slack", "Agile methodologies"] },
    ],
  },

  services: {
    eyebrow: "What We Do",
    title: "Saas Development Services We Offer",
    body: "Experience a full suite of cloud-powered possibilities, built for innovation, scalability, and long-term success. Hire SaaS developers to turn your software vision into a market-leading solution.",
    cta: { label: "Talk to Our Experts", href: "/free-quote" },
    items: [
      { name: "Custom SaaS Application Development", body: "Create fully customized SaaS applications designed around your business needs, ensuring seamless workflows, unique features, and scalable cloud performance.", image: { src: "/images/hire-saas/service-1.webp", width: 1958, height: 1107, alt: "" } },
      { name: "SaaS Product Modernization & Migration", body: "Seamlessly upgrade legacy software or migrate your application to modern SaaS platforms with secure, future-ready, and robust cloud infrastructure.", image: { src: "/images/hire-saas/service-2.webp", width: 490, height: 277, alt: "" } },
      { name: "API Development & Third-Party Integrations", body: "Implement reliable APIs and integrate with payment systems, CRMs, ERPs, and more, enabling efficient data exchange and improved automation.", image: { src: "/images/hire-saas/service-3.webp", width: 490, height: 277, alt: "" } },
      { name: "Multi-Tenant Architecture Implementation", body: "Design scalable multi-tenant SaaS platforms, managing multiple customers securely on one instance for cost savings and easy resource allocation.", image: { src: "/images/hire-saas/service-4.webp", width: 490, height: 277, alt: "" } },
      { name: "SaaS UI/UX Design Services", body: "Deliver intuitive, engaging, and device-optimized experiences through expert interface and UX design tailored for high-performing SaaS products.", image: { src: "/images/hire-saas/service-5.webp", width: 490, height: 277, alt: "" } },
      { name: "Subscription & Billing System Integration", body: "Embed automated subscription management and billing processes, supporting multiple plans, pricing models, and secure payment gateway integration.", image: { src: "/images/hire-saas/service-6.webp", width: 1958, height: 1107, alt: "" } },
      { name: "Data Analytics & Reporting Dashboards", body: "Gain actionable insights with custom analytics modules and real-time reporting dashboards to visualize, monitor, and drive business growth.", image: { src: "/images/hire-saas/service-7.webp", width: 490, height: 277, alt: "" } },
      { name: "SaaS Security & Compliance Solutions", body: "Safeguard your SaaS platform with advanced security, encryption, and regulatory compliance measures, protecting sensitive data and user privacy.", image: { src: "/images/hire-saas/service-8.webp", width: 490, height: 277, alt: "" } },
      { name: "Mobile-Friendly SaaS Development", body: "Develop responsive SaaS applications for seamless mobile access, empowering users to work efficiently anywhere, anytime, on any device.", image: { src: "/images/hire-saas/service-9.webp", width: 490, height: 277, alt: "" } },
      { name: "Ongoing Support & Maintenance", body: "Receive continuous support, timely updates, and proactive maintenance to ensure optimal performance and uninterrupted service for your SaaS solution.", image: { src: "/images/hire-saas/service-10.webp", width: 490, height: 277, alt: "" } },
    ],
  },

  vetting: {
    eyebrow: "Skill Check",
    title: "How We Vet and Onboard Top Saas Developers",
    body: "Our multi-layer screening process guarantees only proven, reliable candidates. Choose to hire SaaS developers with total confidence; our experts easily align with your workflow, culture, and speed requirements.",
    steps: [
      { n: "01", name: "Rigorous talent sourcing", body: "Our team finds top SaaS talent, ensuring expertise through a meticulous and targeted search process." },
      { n: "02", name: "In-depth skill assessment", body: "Each candidate undergoes a thorough technical evaluation to guarantee strong problem-solving and domain proficiency." },
      { n: "03", name: "Thinkers & Innovators", body: "We select SaaS developers who demonstrate creativity, strategic thinking, and proactive innovation in every project." },
      { n: "04", name: "Cultural fit & adaptability", body: "Engineers are matched for personality, collaboration, and adaptability, perfectly integrating into your unique company culture." },
    ],
  },

  comparison: {
    ...partnerTable(
    "Choosing the Right Saas Partner for Your Specific Needs",
    "Finding the right SaaS collaboration is essential. Hiring developers who understand your business accelerates transformation, delivering tailored solutions aligned with your goals. Explore this comprehensive comparison table for deeper insights.",
  ),
    eyebrow: "Hiring Guide",
  },

  testimonials: {
    ...staffCostTestimonials,
    title: "What Our Clients Say",
    body:
      "Industry leaders hire SaaS developers from us again and again, impressed by technical rigor, timely results, and the ability to navigate even the most complex cloud challenges without hassle.",
    // Live's order: Tim, Dara, Dimitris, Roland, Aaron.
    items: [1, 2, 3, 4, 0].map((i) => staffCostTestimonials.items[i]),
  },

  faq: {
    eyebrow: "Ask Us",
    title: "FAQs About Hiring Saas Developers",
    body: "Have questions before moving forward? Learn what sets us apart.",
    items: [
      { q: "How much does it cost to hire a Saas developer?", a: "Costs depend on skills, project duration, and other variables. Before hiring SaaS developers, consult with experts to gain accurate estimates and ensure the right fit for your business needs." },
      { q: "Is there any free trial period available?", a: "Yes. When you hire SaaS developers, take advantage of our 40-hour risk-free trial to assess performance and culture fit before making your final decision." },
      { q: "What are the hiring engagement options available at Soft Suave?", a: "Choose how you work. Hire SaaS developers through fixed price, time & material, or dedicated team models, giving you full flexibility to scale talent and budget." },
      { q: "Do you provide support and maintenance services after deployment?", a: "Absolutely. Our commitment doesn’t end with deployment. Hire SaaS developers and receive comprehensive post-launch support, ongoing maintenance, and regular updates for worry-free performance." },
      { q: "Where can you find a Saas Engineer?", a: "Look no further - Soft Suave’s talent network makes it easy to hire developers and onboard seasoned engineers ready for your next big project, starting immediately." },
    ],
  },
};
