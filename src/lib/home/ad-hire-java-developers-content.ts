/**
 * Copy for `/ad/hire-java-developers` — a clone of
 * softsuave.com/ad/hire-java-developers, the paid-traffic landing page for
 * hiring offshore Java developers in India.
 *
 * Only what the live page RENDERS, word for word — its markup comments out a
 * review block, a trusted-brands block and a testimonials block, and its header's
 * "Mail Us" / "Inquire Now" links are hidden. Live order: hero (+ form) · Java
 * services · rate banner · engagement models · 5 steps · testimonials · closing
 * form. This page has no popups; every button scrolls to a form on the page.
 *
 * The five steps and the closing "Request 1 Week Free Trial!" block are the same
 * on the live full-stack page, so they are reused from it.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CardGridContent } from "@/components/generative-ai/industries";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { EngagementModelsContent } from "@/components/ad/engagement-models";
import type { Testimonial } from "@/lib/home/content";
import { FS_CLOSING_FORM, FS_HERO_FORM, fsClosing, fsProcess } from "@/lib/home/ad-hire-full-stack-developers-content";

export const jvMeta = {
  path: "/ad/hire-java-developers",
  // The live page's <title> and description, verbatim.
  title: "Hire Offshore Java Developers in India | Remote Java Programmers Hire",
  description: "Hire skilled offshore Java developers in India for your projects. Expertise in Java development. Get started now!",
} as const;

export { FS_CLOSING_FORM as JV_CLOSING_FORM, FS_HERO_FORM as JV_HERO_FORM };

export const jvHero: HeroContent = {
  titleLines: ["Hire Offshore", "Java Developers in India"],
  accent: "Java Developers in India",
  body: [
    "Outsource & Save Upto 60% Cost",
    "Hire first-class Java developers in India on an hourly/full-time basis and start your Java app development at an affordable cost.",
    "Outsource dedicated Java developers team from Soft Suave & get benefits like:",
  ],
  points: [
    "Save Upto 60% of your Costs",
    "Flexible Engagement Options (Fixed Cost, Hourly or Monthly)",
    "Strict NDA Terms + 2X Faster Delivery",
  ],
  ctas: [{ label: "Start 40 Hours Risk-Free Trial →", href: FS_HERO_FORM }],
  // The live "No Payment Required ?" button, whose popover explains the trial.
  ctaNote: {
    label: "No Payment Required",
    tipTitle: "Is 40 Hours risk-free trial period completely free?",
    tipBody:
      "Yes, It’s completely free. We allow this free time period to evaluate the code quality, communication, on-time delivery, Agile software development process, and more of the hired trial resource. If you get satisfactory work, then you can continue with the engagement, and if not, then you can right-away cancel it.",
  },
  form: {
    title: "Hire Java Developers!",
    body: "Hire India's best developers with free trial",
    note: "We respect your",
    noteLink: { label: "privacy policy", href: "/privacy-policy", srText: "" },
    noteAfter: " and we will never spam you",
    submit: "Hire Developers Now",
    sending: "Sending...",
    requirementLabel: "Your Requirements",
    requirementPlaceholder: "Your Requirements",
    subject: "Ad landing: Hire Java Developers (hero form)",
  },
};

/** The live cards each carry one icon of their own (`public/brand/ad/java`). */
export const jvServices: CardGridContent = {
  eyebrow: "",
  title: "Soft Suave’s Java Development Services",
  body: "Our highly skilled Java developers have a separate client base all around the world for their revolutionary solutions.",
  cta: { label: "Start 40 Hours Risk-Free Trial", href: FS_HERO_FORM },
  items: [
    {
      images: [{ src: "/brand/ad/java/svc-development.webp", alt: "Java Web Development" }],
      name: "Java Web Development",
      // The live cards carry no "Know more" link.
      link: false,
      body: "Our dedicated Java experts are committed to offering secure and reliable Java web development with the latest tools and cutting-edge technologies. Our expert Java engineers are prompt in delivering innovative web solutions at an affordable cost.",
    },
    {
      images: [{ src: "/brand/ad/java/svc-web.webp", alt: "API & Web Service Integration" }],
      name: "API & Web Service Integration",
      // The live cards carry no "Know more" link.
      link: false,
      body: "Java experts at Soft Suave are capable of developing astounding APIs and integrating them into different software applications. They also build successful custom API for clients based on their business requirement.",
    },
    {
      images: [{ src: "/brand/ad/java/svc-integration.webp", alt: "Java-based eCommerce Development" }],
      name: "Java-based eCommerce Development",
      // The live cards carry no "Know more" link.
      link: false,
      body: "Hire our Java developers to develop innovative Java-based eCommerce applications that steer your business towards success and growth. Moreover, our developers hold excellent domain expertise in developing eCommerce apps that are secure and user-friendly.",
    },
    {
      images: [{ src: "/brand/ad/java/svc-personalized.webp", alt: "Java-based CMS Development" }],
      name: "Java-based CMS Development",
      // The live cards carry no "Know more" link.
      link: false,
      body: "Our team of skilled Java developers build Java-based CMS swiftly without any data leaks. They elevate the development by making sure CMS is feature-packed with innovative and secure features.",
    },
    {
      images: [{ src: "/brand/ad/java/svc-plugin.webp", alt: "Java Module Development" }],
      name: "Java Module Development",
      // The live cards carry no "Know more" link.
      link: false,
      body: "Hire dedicated Java developers for developing user-friendly modules that facilitate the quick development of enterprise-level applications. The developers have 10+ years on average of hands-on experience in Java that allows them to offer hassle-free module development.",
    },
    {
      images: [{ src: "/brand/ad/java/svc-support.webp", alt: "Support & Maintenance" }],
      name: "Support & Maintenance",
      // The live cards carry no "Know more" link.
      link: false,
      body: "When you hire expert Java developers from Soft Suave, you get high-quality support services that enable app stability and assures bug-free application. Moreover, our developers are well- versed to offer full-maintenance service and optimize your business simultaneously at a competitive cost.",
    },
  ],
};

export const jvRateBand: CtaBandContent = {
  title: "Hire Offshore Java Developers Starting from $12/hour",
  body: "We will provide you with remote Java developers that work from India. Contact us to take a look at CVs.",
  cta: { label: "Request Rate Card", href: FS_CLOSING_FORM },
};

export const jvModels: EngagementModelsContent = {
  title: "Use Our Engagement Models to Hire Offshore Java Developers",
  body: "Soft Suave understands the client's needs and has simplified the hiring models to avoid the dilemma.",
  models: [
    {
      name: "PART-TIME HIRING",
      image: { src: "/brand/ad/java/model-half-time.webp", alt: "Part-time hiring" },
      facts: [
        { label: "Duration", value: "4 Hrs/Day – 5 Days/Week (80 Hrs/Month)" },
        { label: "Billing", value: "Monthly" },
        { label: "Timeline", value: "Based on Project" },
      ],
    },
    {
      name: "FULL-TIME HIRING",
      image: { src: "/brand/ad/java/model-full-time-hire.webp", alt: "Full-time hiring" },
      facts: [
        { label: "Duration", value: "8 Hrs/Day – 5 Days/Week (160 Hrs/Month)" },
        { label: "Billing", value: "Monthly" },
        { label: "Timeline", value: "Based on Project" },
      ],
    },
    {
      name: "MILESTONE HIRING",
      image: { src: "/brand/ad/java/model-milestone.webp", alt: "Milestone hiring" },
      facts: [
        { label: "Duration", value: "8 Hrs/Day – 5 Days/Week" },
        { label: "Billing", value: "Weekly/Daily/Monthly" },
        { label: "Timeline", value: "Based on Project" },
      ],
    },
  ],
  cta: { label: "Hire Java Developers", href: FS_HERO_FORM },
};

/** "Hire Java Developers in 5 easy steps" — word for word the live full-stack page's steps. */
export const jvProcess = { ...fsProcess, title: "Hire Java Developers in 5 easy steps" };

/** "What People Say After Using Our Services" — six reviews, each with its photo. */
export const jvTestimonials: {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly Testimonial[];
} = {
  eyebrow: "",
  title: "What People Say After Using Our Services",
  body: "",
  items: [
    {
      quote:
        "Soft Suave’s value proposition to work on a European time schedule with senior developers at a very competitive cost is what makes me recommend them for your development needs.",
      name: "Victor. V",
      role: "CEO & Founder of Leading Execution Management Platform Developer",
      rating: "5.0",
      photo: "/brand/ad/java/t-victor.webp",
    },
    {
      quote:
        "I recommend Soft Suave because they keep up with the ever-changing requirements, handle each task with the utmost professionalism, and deliver quality work in a timely manner.",
      name: "Vinny. N",
      role: "CTO at New York’s Top permit expeditor company",
      rating: "5.0",
      photo: "/brand/ad/java/t-buildingowl.webp",
    },
    {
      quote:
        "Soft Suave’s response time is the fastest I have witnessed among my clients. They made sure there was not any communication gap and were always available to help us execute our vision.",
      name: "Sophiea. K",
      role: "Managing Partner at leading boutique design studio in Los Angeles.",
      rating: "5.0",
      photo: "/brand/ad/java/t-dld.webp",
    },
    {
      quote:
        "Developers in Soft Suave are doing a great job. The way the developers conduct during the project is good for us and noteworthy. New projects are in pipeline to take our partnership forward.",
      name: "Virendra. B",
      role: "Director at Canada’s leading business consultant",
      rating: "5.0",
      photo: "/brand/ad/java/t-virendra.webp",
    },
    {
      quote:
        "I have worked with many contractors around the world but I have never seen any company like Soft Suave who takes interest in understanding the goals of the client’s projects.",
      name: "George. J",
      role: "Lead Developer at USA's leading digital transformation solution provider",
      rating: "5.0",
      photo: "/brand/ad/java/t-george.webp",
    },
    {
      quote:
        "The developer I hired is quick to understand our process and comes up with creative ideas to solve problems. Hiring him is the best decisions I took and it is paying off well for the company.",
      name: "Dave. R",
      role: "Co-founder of the top record keeping software provider company in USA",
      rating: "5.0",
      photo: "/brand/ad/java/t-dave.webp",
    },
  ],
};

/** The closing "Request 1 Week Free Trial!" block — the live full-stack page's, with this page's lead subject. */
export const jvClosing = {
  ...fsClosing,
  form: { ...fsClosing.form, subject: "Ad landing: Start Risk-FREE Trial (Java developers)" },
};

