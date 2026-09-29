/**
 * Copy for the "Cloud Computing Services" landing page (`/cloud-computing`).
 *
 * The hero keeps its own image, badges, layout and form fields; its text —
 * H1, paragraph and form heading — is the live page's. Everything below it,
 * and the page's title, description and schema, follows the live softsuave.com
 * page (review: "Need to update the page - lot of sections have changed
 * including the title, description, canonicals, and schemas"). The mapping, in
 * live page order:
 *
 *   "Best-in-class Cloud Computing Services"             → `cloudIntro`
 *   "Soft Suave in Cloud Computing"                      → `cloudAbout`
 *   "Our Approach"                                       → `cloudApproach`
 *                                                          + `cloudApproachSteps` (4)
 *   "Our Cloud Computing Services"                       → `cloudServices` (4)
 *   "Cloud Computing Model"                              → `cloudModels` (3)
 *   "We Deliver Solutions on the Leading Cloud Platforms" → `cloudPlatforms` (4)
 *
 * The copy is the live page's own, verbatim — including ".NET, JEE, and LAMP"
 * as the cloud application stack, which an earlier rewrite had dropped. The
 * live page runs no benefits grid, process, FAQ or mid-page CTA band of its
 * own, so this page has none.
 *
 * Two of the live page's sub-headings (H4s) have no heading slot in the
 * Overview block that carries their section, so each rides as that section's
 * kicker rather than being dropped: "Benefits of Cloud Computing" (which
 * labels the four-point list) and "Responsive Cloud Application Development"
 * (which heads the three paragraphs after the section intro).
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { CardGridContent } from "@/components/landing/industries";
import type { ProcessContent } from "@/components/landing/process";
import type { TechStackContent } from "@/components/landing/tech-stack";
import { sharedHeroAlert, sharedHeroBadges } from "./delivery-shared";
import { overviewImage } from "./overview-images";

export const cloudMeta = {
  slug: "cloud-computing",
  path: "/cloud-computing",
  // The live page's <title> and meta description, verbatim.
  title: "Cloud Software Development Company - Soft Suave",
  description:
    "Cloud software development company offering scalable, and efficient cloud-based solutions tailored to meet your business needs and drive growth.",
} as const;

export const cloudHero: HeroContent = {
  // The live H1, "Cloud Computing Services"; the last line takes the accent.
  titleLines: ["Cloud Computing", "Services"],
  body: ["Company that help grow your business faster by lowering IT costs."],
  // The live hero carries no bullet list.
  points: [],
  badges: sharedHeroBadges,
  form: {
    eyebrow: "Business Enquiry",
    // The live hero form's own heading.
    title: "Get Your FREE Quote Now!",
    // An H2 on the live page, so part of the outline here too.
    titleAs: "h2",
    alert: sharedHeroAlert,
    submit: "Send requirements",
    sending: "Opening your mail…",
    requirementLabel: "What do you need from the cloud?",
    requirementPlaceholder:
      "Your current infrastructure, the applications involved, what is driving the change — cost, scale, resilience — and any compliance constraints.",
    subject: "Cloud computing enquiry",
  },
  image: {
    src: "/images/four/work-3.webp",
    width: 800,
    height: 1000,
    alt: "Cloud infrastructure and deployment pipelines visualised across connected environments",
  },
};

/** "Best-in-class Cloud Computing Services", with its "Benefits of Cloud Computing" list. */
export const cloudIntro: OverviewContent = {
  eyebrow: "Benefits of Cloud Computing",
  title: "Best-in-class Cloud Computing Services",
  paragraphs: [
    "Softsuave is one of the Best cloud computing service providers in India that delivers hosted services to save cost, better scaling and access to data all around the world.",
    "To support the critical operations of your business, use cloud computing services which avail instant access to flexible and low cost IT resources. Say no to large upfront investments in hardware and start moving your data to the cloud as it acts as a virtual storage for all your data with limited investments. You can access as many resources as you require, almost rapidly, and just pay for what you use. Benefit by operating your IT services in a more simple and effective way by leveraging the cloud services.",
    "Launching a product in the market is critical in today's competitive environment. It is a must to build new, revenue-generating applications that will increase the business value. We are partnered with prominent cloud service providers which take you to the next level of your business with a wide range of services designed to help you develop the applications required to stay ahead of the curve.",
  ],
  points: [
    "Lower initial investment and maintenance costs.",
    "Cloud is accessible anytime from anywhere.",
    "Better security and easy disaster recovery.",
    "Provides flexibility for businesses with fluctuating bandwidth demands.",
  ],
  image: overviewImage("cloud-computing"),
};

/** "Soft Suave in Cloud Computing": the intro, then "Responsive Cloud Application Development". */
export const cloudAbout: OverviewContent = {
  eyebrow: "Responsive Cloud Application Development",
  title: "Soft Suave in Cloud Computing",
  paragraphs: [
    "Our robust cloud computing services are helping our clients with diverse solutions that can manage any application with ease. We carefully analyze our client's business requirements, technical aspects, and security assessments before planning the cloud strategy to ensure better documentation and security.",
    "Organizations are hurrying to adopt cloud computing to bring unparalleled flexibility in their businesses, improve access to their IT assets, and lower the costs of running the business. But to understand the potential of the cloud, you have to work with a trustworthy partner who knows to innovate things to work now in the short term and in the long term.",
    "Soft Suave’s cloud computing Services allow you to make right decisions for your enterprise that drive quick results and give you the flexibility to grow your business. We promise to be your ideal cloud partner by seamlessly managing your data without any hassle.",
    "Soft Suave offers its clients end-to-end application integration services through cloud computing services. We follow a strategic approach to fulfill your business needs by assessing the fundamental technology components such as infrastructure, applications, processes, policies, etc. and then deploying the suitable cloud computing modules. To benefit from cloud adoption, you need to transform your IT hardware infrastructure into virtual data in the cloud by being able to access it from anywhere at any time.",
  ],
  image: {
    src: "/images/four/cloud-step-4.webp",
    width: 1200,
    height: 900,
    alt: "Engineer working on a tablet beside server racks in a data center",
  },
};

/** "Our Approach": the section's two paragraphs; its four stages follow in `cloudApproachSteps`. */
export const cloudApproach: OverviewContent = {
  eyebrow: "Cloud Strategy",
  title: "Our Approach",
  paragraphs: [
    "Soft Suave delivers highly effective and reliable cloud computing services to help businesses in cloud adoption without much struggle. Our strategic approach involving assessment, planning, deployment, optimization makes the whole computing process simple and effective.",
    "With our vast experience in cloud computing services, we can help you on this journey. Whether you are migrating legacy and enterprise systems to the cloud or looking for optimizing your business in the cloud environment, Soft Suave will serve you in the most suitable way that is relevant to your situation. Any service can be implemented smoothly if it follows a particular strategy. In the same way, Soft Suave with its expertise has built a cloud strategy for its clients to make full use of the cloud computing arena.",
  ],
  image: {
    src: "/images/four/cloud-step-3.webp",
    width: 1200,
    height: 900,
    alt: "Two people reviewing a drawn plan together",
  },
};

/**
 * The approach's four stages. No masthead of its own: it continues the
 * "Our Approach" section above rather than opening a new one.
 */
export const cloudApproachSteps: ProcessContent = {
  steps: [
    {
      n: "01",
      name: "Private cloud or public cloud or hybrid",
      body: "One of the most significant yet confusing decisions you have to make for your business is to choose the type of cloud. Our business consulting team sketches your requirements and suggests what is best for you.",
    },
    {
      n: "02",
      name: "Value your options and choose",
      body: "Many enterprises are adopting cloud computing for cost-cutting and speed-to-market benefits. Understanding the purpose of shifting to the cloud is important to analyze the bandwidth needs. Our technology experts analyze our client’s idea and convert it into a real-time application.",
    },
    {
      n: "03",
      name: "Plan your budget",
      body: "According to your bandwidth requirement, there will be a minimal investment required for adopting cloud. Our team will have an open discussion with you to choose a plan that fits your needs.",
    },
    {
      n: "04",
      name: "Technology",
      body: "After we consider your needs, budget and resources available for it, we look at the best technology stack available for the task in the money that you have allocated for the cloud computing shift. Disaster Recovery, Backup, Test/Dev and other capabilities of the cloud are few interesting solutions set for organizations to choose from.",
    },
  ],
};

/** "Our Cloud Computing Services": the intro, its four-item list, then a card per service. */
export const cloudServices: CardGridContent = {
  eyebrow: "What We Offer",
  title: "Our Cloud Computing Services",
  body: "We provide simple to complex cloud computing services customized to every business. Our skilled developers can help you move your business workload to the cloud through",
  points: [
    "Cloud App Development",
    "Migration to Cloud",
    "Integration & Consolidation",
    "Cloud Security",
  ],
  items: [
    {
      name: "Cloud App Development",
      body: "Soft Suave’s expertise in cloud computing has resulted in developing new cloud applications and migrating legacy applications using advanced technologies such as .NET, JEE, and LAMP",
    },
    {
      name: "Migration to Cloud",
      body: "Soft Suave enables automated cloud migration by integration with 3rd party tools. We allow enterprises to seamlessly migrate data into the cloud with minimal human customization. You can enjoy Powerful cloud benefits with minimal cost and delay.",
    },
    {
      name: "Integration and Consolidation",
      body: "With our expertise in the cloud and system integration, we can do a seamless integration of existing infrastructure and services with those of the private or public cloud. Soft Suave ensures that the merged infrastructure delivers the targeted business goals and meets the compliance requirements.",
    },
    {
      name: "Cloud Security",
      body: "Soft Suave offers cloud security services that are monitored 24*7 in any cloud environment. We customize managed cloud security services to meet the unique security and compliance needs of each organization.",
    },
  ],
};

/**
 * "Cloud Computing Model". The live section runs two paragraphs before its
 * three models — the second only the lead-in "The cloud computing models that
 * we are expert in;" — and the grid's masthead takes one intro, so the two
 * are joined into it, word for word.
 */
export const cloudModels: CardGridContent = {
  eyebrow: "Service Models",
  title: "Cloud Computing Model",
  body: "Through an integrated approach, we have a unique ability for developing cloud-based applications. Making use of this potential, our clients streamline their business processes for effective and efficient use of innovative cloud service technologies. We provide on-demand, scalable and secure cloud solutions through our enterprise level cloud services. The cloud computing models that we are expert in;",
  items: [
    {
      name: "Software-as-a-Service (SaaS)",
      body: "Soft Suave provides enterprise mobility in the cloud by allowing flexibility in work through mobile SaaS software as well as an on-demand software platform for building, deploying and managing applications in the cloud.",
    },
    {
      name: "Platform-as-a-Service (PaaS)",
      body: "We deliver multi-tenant applications not depending on any platform thereby generating new opportunities for software development.",
    },
    {
      name: "Infrastructure as a Service (IaaS)",
      body: "We involve in outsourcing the elements used to support operations, including storage, hardware, servers and networking components. Similar to the PaaS service model, the configuration of all elements is the responsibility of the provider with whom we have partnered with.",
    },
  ],
};

/** "We Deliver Solutions on the Leading Cloud Platforms": the four platforms the live page names. */
export const cloudPlatforms: TechStackContent = {
  eyebrow: "Cloud Platforms",
  title: "We Deliver Solutions on the Leading Cloud Platforms",
  body: "We provide Unlimited data transfers and storage on the leading platforms where you can run, create and manage cloud access without the need for on-site infrastructure.",
  groups: [
    {
      name: "Cloud Platforms",
      items: ["Amazon Web Services", "Google Cloud Platform", "Microsoft Azure", "OpenStack"],
    },
  ],
};
