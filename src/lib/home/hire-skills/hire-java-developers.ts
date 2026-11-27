/**
 * The `hire-java-developers` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-java-developers/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all twenty.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { webExplore } from "../hire-explore";
import { techSteps, techWhy } from "../hire-blocks";
import { HOURLY_RATE } from "../../company-figures";
import { CLASSIC_ORDER } from "./backend-shared";

export const skill: HireSkill = {
  closingCtaIcon: true,
  clientsWideTitle: true,
  slug: "hire-java-developers",
  key: "java",
  name: "Java",
  role: "Java Developers",
  metaTitle: "Hire Java Developer India with 40 Hours Risk-free Trial",
  // Live's own description, with its price filled in: the meta tag there
  // reads "starting at /hour" (Java: "0/hour"), while the page quotes
  // $14/hour throughout.
  metaDescription:
    `Hire Java developers India - Outsource dedicated java application developers in USA to build high-quality web applications starting at ${HOURLY_RATE}.`,
  serviceType: "Java development staffing",
  ctaLabel: "Hire Java developers",

  order: [...CLASSIC_ORDER],

  hero: {
    titleLines: ["Hire Java Developers", "in India on Contract"],
    accent: "Java Developers",
    body: [
      "Soft Suave provides pre-vetted Java developers from India without long hiring delays. Hire experts in Spring Boot, Hibernate, microservices, REST APIs, AWS, and enterprise application development – contract-ready and fast to onboard.",
      "See why businesses choose Soft Suave for Java hiring.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Java Developers in India",
      "Time-Zone & Language-Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      submitHover: 'black',
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Java requirement.",
      subject: "Java Developers enquiry",
      alert: sharedHeroAlert,
    },
    // A photo for this technology, darkened by the strong veil `HirePage`
    // applies (review: "update the images and add a black gradient").
    image: {
      src: "/images/landing/hs-java-hero.webp",
      width: 1800,
      height: 900,
      alt: "Java code glowing on an angled monitor",
      blurDataURL:
        "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADQAQCdASoQAAsAA4BaJQBOgBucfuOEgAD++FZrqKCrrBzfWrb/3SsVy2QacR40+SUoKSTfAla68ZTma/SOB/l/518IGOgA",
    },
  },

  overview: {
    wideHead: true,
    // Portrait, run the full height of the copy beside it (8 Oct review:
    // "resize the image to match the section") — the same photo, cut taller.
    image: {
      src: "/images/landing/ov-hire-java-developers-tall.webp",
      width: 1000,
      height: 1250,
      alt: "Java developer focused on code at a workstation",
      blurDataURL:
        "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADwAQCdASoQAAsAA4BaJZACdAEO9oMYRgAA/r4ciaQw9ZHpmttgeAoSRefWARcN2eARB1MbQdAdRpV+r7xEAAAA",
      aspect: "4 / 3",
      align: "center",
      rounded: true,
      bordered: true,
    },
    // Internal links in the second paragraph (review: "internal link missing
    // in the 2nd paragraph"). The live page has none to copy, so each is a
    // phrase already in the copy, pointed at the matching service page.
    links: [
      { text: "web app development services", href: "/web-application-development-company" },
      { text: "Java solutions", href: "/java-application-development-company" },
    ],
    eyebrow: "Overview",
    title: "Hire Top-notch Remote Java Developers from Soft Suave",
    paragraphs: [
      "Flexibility, scalability, and cost-effectiveness are guaranteed when you hire Java developers from us.",
      "Soft Suave is the most trusted company to hire Java developers in India. We are reputed to deliver fast and streamlined web app development services at an economical cost. Hire Java programmers from us to stay up to date with trending frameworks, tools, technologies and to build robust applications at your desired budget. Our Java experts have in-depth knowledge and go beyond their duty to provide comprehensive Java solutions. Our developers are counted among the top Java developers in India that build high quality and successful apps for clients around the world.",
      "Our Java developer's domain-specific experience help us to provide optimum programming solutions. Hire Java developers from us who are committed to the client's business goals and act as an extended development team that saves cost and time.",
      "Full-stack Java developers from Soft Suave offer advanced Java solutions that allow clients to expand their business swiftly. When you hire Java developer from us, you get developers that can deal with any complex requirement. Moreover, they do not shy away from challenges but go the extra mile to deliver quality-focused Java solutions. The expertise and experience in various industry verticals is an added advantage when you hire the best Java experts in India from us.",
    ],
  },

  services: {
    wideHead: true,
    eyebrow: "Services",
    title: "Soft Suave's Java Development Services",
    body: "Our highly skilled Java developers have a separate client base all around the world for their revolutionary solutions.",
    items: [
      {
        name: "Java Web Development",
        body: "Our dedicated Java experts are committed to offering secure and reliable Java web development with the latest tools and cutting-edge technologies. Our expert Java engineers are prompt in delivering innovative web solutions at an affordable cost.",
      },
      {
        name: "API & Web Service Integration",
        body: "Java experts at Soft Suave are capable of developing astounding APIs and integrating them into different software applications. They also build successful custom API for clients based on their business requirement.",
      },
      {
        name: "Java-based E-commerce Development",
        body: "Hire our Java developers to develop innovative Java-based e-commerce applications that steer your business towards success and growth. Moreover, our developers hold excellent domain expertise in developing e-commerce apps that are secure and user-friendly.",
      },
      {
        name: "Java-based CMS Development",
        body: "Our team of skilled Java developers build Java-based CMS swiftly without any data leaks. They elevate the development by making sure CMS is feature-packed with innovative and secure features.",
      },
      {
        name: "Java Module Development",
        body: "Hire dedicated Java developers for developing user-friendly modules that facilitate the quick development of enterprise-level applications. The developers have 10+ years on average of hands-on experience in Java that allows them to offer hassle-free module development.",
      },
      {
        name: "Support & Maintenance",
        body: "When you hire expert Java developers from Soft Suave, you get high-quality support services that enable app stability and assures bug-free application. Moreover, our developers are well-versed to offer full-maintenance service and optimize your business simultaneously at a competitive cost.",
      },
    ],
  },

  midCta: {
    title: `Hire Java Developers Starting from ${HOURLY_RATE}`,
    body: "We will provide you with remote Java developers that work from India. Contact us to take a look at CVs.",
    cta: { label: "Request Rate Card", href: "/contact" },
  },

  process: {
    wideHead: true,
    eyebrow: "Hiring Process",
    title: "Hire Java Developers in 4 easy steps",
    body: "Below is the simple Full-time Hiring Process that we follow while offering 1-week free trial to our clients.",
    steps: techSteps("Java"),
  },

  whyUs: {
    wideHead: true,
    eyebrow: "Why Soft Suave",
    title: "Why Are Our Java Developers Considered the Best?",
    body: "We have dedicated Java developers with exceptional technical knowledge to deliver secure Java solutions.",
    items: techWhy("Java", "Spring Boot, Hibernate, microservices, REST APIs, and AWS"),
  },

  exploreMore: {
    ...webExplore,
    wideHead: true,
  },

  faq: {
    wideHead: true,
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    body: "Know more about our processes and how we work, with the help of the following FAQs.",
    items: [
      {
        q: "How to select an offshore development team for Java projects in India?",
        a: "It is advisable to select a Java developer or a dedicated team from mid-scale app development companies that have 5-10 years of experience in app development and have an excellent client base worldwide. It is also necessary to check testimonials and portfolios to decide on the best offshore Java development team. Soft Suave is a mid-scale Java development company that assures quality Java development under your budget.",
      },
      {
        q: "Why shall I hire Java Developers from Soft Suave?",
        a: "When you hire Java app developers from us, you are assured of getting premium Java development services at your budget. Moreover, our developers have 5+ years on average experience to give you a competitive edge in the app development market.",
      },
      {
        q: "How do I test your Java developer's expertise?",
        a: "Hire on-demand Java developers from Soft Suave by testing their technology expertise and hands-on industry experience. Moreover, to understand the expertise of our team, our developers are open for one-to-one interviews and a week's man-hour of test project.",
      },
      {
        q: "Can I hire a Java developer for an hourly or project-based task?",
        a: "Our dedicated developers are committed to your business goals and stay proactive in offering successful Java app development solutions. Moreover, they are flexible to overlap time zones to receive tasks and feedback from you directly.",
      },
      {
        q: "What are the various hiring models offered by you to hire Java developers?",
        a: [
          "Soft Suave has curated three client-friendly hiring models to help you hire dedicated Java developers from us. We also prefer customizing plans according to your budget",
        ],
        points: [
          "Full-time basis",
          "Part-time basis",
          "Milestone basis",
        ],
      },
    ],
  },
};
