/**
 * The `hire-php-developers` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-php-developers/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all twenty.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { webExplore } from "../hire-explore";
import { techSteps, techWhy } from "../hire-blocks";
import { CLASSIC_ORDER } from "./backend-shared";

export const skill: HireSkill = {
  slug: "hire-php-developers",
  key: "php",
  name: "PHP",
  role: "PHP Developers",
  metaTitle: "Hire PHP Developers in India from Soft Suave",
  metaDescription:
    "Hire PHP developers in India from the top 3% talent pool with 40-hour free trial. Get high-performance, custom solutions tailored to business needs.",
  serviceType: "PHP development staffing",
  ctaLabel: "Hire PHP developers",

  order: [...CLASSIC_ORDER],

  hero: {
    titleLines: ["Hire PHP Developers", "in India on Contract"],
    accent: "PHP Developers",
    body: [
      "Soft Suave helps businesses hire dedicated PHP developers from India who build secure and scalable web platforms. Access pre-vetted experts in PHP, Laravel, CodeIgniter, MySQL, APIs, CMS development, and custom web solutions with fast onboarding.",
      "See why businesses choose Soft Suave for their PHP developer hiring.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top PHP Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your PHP requirement.",
      subject: "PHP Developers enquiry",
      alert: sharedHeroAlert,
    },
    // A photo for this technology, darkened by the strong veil `HirePage`
    // applies (review: "update the images and add a black gradient").
    image: {
      src: "/images/landing/hs-php-hero.webp",
      width: 1800,
      height: 900,
      alt: "PHP configuration code on a dark screen",
      blurDataURL:
        "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAABwAQCdASoQAAkAA4BaJZ12AAHJgAD+9CRbkJCtfLkqH0JhU2LgAA==",
    },
  },

  overview: {
    // Portrait, run the full height of the copy beside it (8 Oct review:
    // "resize the image to match the section") — the same photo, cut taller.
    image: {
      src: "/images/landing/ov-hire-php-developers-tall.webp",
      width: 1000,
      height: 1250,
      alt: "PHP web developer coding a website",
      blurDataURL:
        "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAAAwAgCdASoQAAsAA4BaJQBOj+ADMgCN09icYAD+6jW94N/JYuDKmFBmkWUi5cYXV4neSEvcZ8Z23H3sRqp6P+xbkn3dvZbi3I9QApRB1J+gLWNoAAA=",
      column: true,
    },
    eyebrow: "Overview",
    title: "Hire Remote PHP Developers 2X Faster",
    paragraphs: [
      "Join hands with our dedicated PHP developers who are flexible with modern development methodologies.",
      "Soft Suave offers the dedicated PHP developers in India that support start-ups and SMBs to develop quality PHP programming solutions. Our PHP coders are expert in all PHP frameworks like Laravel, CodeIgniter, and CakePHP. When you hire PHP developers from Soft Suave, you get the roadmap to deliver PHP development projects 2X faster and 50% cheaper than your competitors do.",
      "Our team of dedicated PHP developers work together to seamlessly transform your business requirements into thriving reality at your affordable cost. Our full-time PHP web developers are well-versed in handling enterprise-grade websites, e-commerce solutions, web applications, and content management sites.",
      "Soft Suave handles simple and complex requirements of your business with the help of all the latest technologies and trends. Our expert PHP app programmers have an average of 5+ years of experience to handle high-quality development and save operational costs simultaneously. Moreover, you get a competitive edge in the market when you hire PHP developers from Soft Suave and even get the privilege to work with the top 2% of India's PHP developers.",
    ],
  },

  services: {
    eyebrow: "Tech Stack",
    title: "Our Top-grade PHP Developers Tech Stack",
    body: "Hire PHP developers from us who are technically sound and equipped to handle any complex project.",
    items: [
      {
        name: "PHP Web Development",
        body: "Our first-class PHP developers are sharp to transform your custom requirements into secure and engaging web solutions. Leveraging the fastest and most effective frameworks, our PHP web app developers bring dynamism and agility to web applications.",
      },
      {
        name: "PHP-based CMS Development",
        body: "We have a team of elite PHP developers that have hands-on experience in developing CMS for several tech giants across the globe. We leverage PHP to develop advanced CMS features that add value to your CMS system and make it user-friendly.",
      },
      {
        name: "PHP E-commerce Application",
        body: "Hire PHP developers from Soft Suave to have a competitive edge in the current e-commerce market. They build e-commerce applications with high-standard and make them versatile, user-friendly, and compatible with all devices.",
      },
      {
        name: "PHP Integration & Upgradation",
        body: "When you hire PHP developers in India from Soft Suave, you get seamless PHP integration at a less time compared to other app development companies. Our integration is smooth, and we guarantee smooth upgradation without any data leaks.",
      },
      {
        name: "PHP Maintenance & Support",
        body: "Maintenance of the application is not a challenge when you hire PHP programmers from Soft Suave. Our developers are well versed to handle any complicated bug fixes and offer 24/7 support to our clients for any PHP development services.",
      },
      {
        name: "PHP Consulting Service",
        body: "Soft Suave houses extraordinary PHP experts who are capable of infusing years of experience and expertise in PHP development to deliver customized and profitable consulting solutions to our clients.",
      },
    ],
  },

  /** The PHP page's mid band offers a profile download rather than a rate card. */
  midCta: {
    title: "Download PHP Developers Profile!",
    body: "Download our PHP engineer's profile within a few seconds and try risk free 1-week trial to test their skills.",
    cta: { label: "Download Now", href: "/contact" },
  },

  process: {
    eyebrow: "Hiring Process",
    title: "Hire PHP Developers in 4 easy steps",
    body: "Below is the simple Full-time Hiring Process that we follow while offering 1-week free trial to our clients.",
    steps: techSteps("PHP"),
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "Why Are Our PHP Developers Considered the Best?",
    body: "When you hire PHP developers, you can fulfill all your requirements effectively, be it e-commerce solutions or web Apps.",
    items: techWhy("PHP", "PHP, Laravel, CodeIgniter, MySQL, APIs, and CMS development"),
  },

  exploreMore: webExplore,

  faq: {
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    body: "Know more about our processes and how we work, with the help of the following FAQs.",
    items: [
      {
        q: "What are the benefits if I hire PHP developers from Soft Suave?",
        a: "Developing high-quality and feature-rich applications at a pocket-friendly cost is possible if you hire PHP developer from us. You will also get the opportunity to share your business goals with the top 2% of PHP developers in India.",
      },
      {
        q: "How to select the best company in India to hire PHP programmers?",
        a: "Suppose you are looking out to hire PHP programmer from the best PHP development company in India. In that case, you must check their app developing process and their experience in PHP app development. At Soft Suave, you will get 7 days of free trial to check the ability and expertise of our PHP programmers.",
      },
      {
        q: "What type of software applications can be created with PHP?",
        a: "PHP is a programming language that is versatile and robust. You can develop feature-rich and dynamic Content Management System, E-commerce apps, Web page applications, Graphical User Interface applications (GUI) and many more.",
      },
      {
        q: "Will the hired remote PHP developer work dedicated only for me?",
        a: "Absolutely! The dedicated PHP developers you hire will be committed to your business goals and work fulltime only for your projects.",
      },
      {
        q: "Can I hire PHP developer for the hourly or project-based task?",
        a: "There are three flexible models to hire PHP developer from us who would be the perfect fit for your project. Those models include Full time, Part-time and Milestone hiring. We even go the extra mile to personalize hiring models based on your requirement and budget.",
      },
      {
        q: "Can I hire PHP developer as per my specific industry?",
        a: "Yes, you can hire PHP developers as per your industry. Additionally, the developer you hire from us will have experience in working for many industries and hence you are rest assured to receive many innovative industry-specific solutions.",
      },
    ],
  },
};
