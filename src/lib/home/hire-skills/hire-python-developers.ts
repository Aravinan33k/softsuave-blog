/**
 * The `hire-python-developers` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-python-developers/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all twenty.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { webExplore } from "../hire-explore";
import { techSteps, techWhy } from "../hire-blocks";
import { HOURLY_RATE, YEARS_PLUS } from "../../company-figures";
import { CLASSIC_ORDER } from "./backend-shared";

export const skill: HireSkill = {
  closingCtaIcon: true,
  clientsWideTitle: true,
  slug: "hire-python-developers",
  key: "python",
  name: "Python",
  role: "Python Developers",
  metaTitle: `Hire Offshore Python Developers from India from ${HOURLY_RATE}`,
  metaDescription:
    "Hire top software developers in India with 40 hours of free trial, risk-free. Get access to the top 3% of developers for scalable and custom solutions.",
  serviceType: "Python development staffing",
  ctaLabel: "Hire Python developers",

  order: [...CLASSIC_ORDER],

  hero: {
    titleLines: ["Hire Python Developers", "in India On Contract"],
    accent: "Python Developers",
    body: [
      "Soft Suave offers skilled Python developers from India ready to join quickly. Hire experts in Django, Flask, FastAPI, AI/ML, automation, data engineering, and backend development – pre-vetted and deployment-ready.",
      "See why businesses choose Soft Suave for Python hiring.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Python Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      submitHover: 'black',
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Python requirement.",
      subject: "Python Developers enquiry",
      alert: sharedHeroAlert,
    },
    // A photo for this technology, darkened by the strong veil `HirePage`
    // applies (review: "update the images and add a black gradient").
    image: {
      src: "/images/landing/hs-python-hero.webp",
      width: 1800,
      height: 900,
      alt: "Python code in bright syntax colours on screen",
      blurDataURL:
        "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAQAgCdASoQAAwAA4BaJaACdADwgHCslqcAAP7l9McYOg3scOg/fuc1nQxao76E+tUa791S/X8Vtcj11DYOKXQgpQZJrLNdbqpG0gAA",
    },
  },

  overview: {
    wideHead: true,
    // 4:3 bordered rounded frame centred against the prose, matching
    // /hire-reactjs-developers's overview treatment.
    image: {
      src: "/images/landing/ov-hire-python-developers-tall.webp",
      width: 1000,
      height: 1250,
      alt: "Python programmer writing code on a laptop",
      blurDataURL:
        "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADQAQCdASoQAAsAA4BaJQBOgBrZdLY/AAD+7Mecp03BGQbJESRK+CEARPKyVO9EOCeWu0z2ifyYnXCTDNzLmpWDlEAAAA==",
      aspect: "4 / 3",
      align: "center",
      rounded: true,
      bordered: true,
    },
    eyebrow: "Overview",
    title: "Multiskilled Team of Dedicated Python Developers",
    paragraphs: [
      "Leverage the expertise of our experienced Python developers to build technology-rich Apps.",
      "Do you need a skilled remote Python developer to develop a top-notch web application? or do you want to transform/improve your existing app effortlessly? Hire Python developers from us who have in-depth knowledge and expertise working with the programming language. Also, they have the capacity to work with any complex development projects and bring in desired results.",
      "Our developers build intuitive applications as they are experts in development tools & frameworks including Django, Turbogears, Pylons, Web2py, Flask, and Pyramid. And, our Python web developer's unique specialty is building powerful apps with seamless & complex functionalities that improve client's business efficiency and offer engaging user experience.",
      `Our developer's competency in working with Python language helps us to execute complicated tasks with a few lines of code. This will be greatly convenient to maintain the application effectively after successful deployment in the market. Develop feature-packed, scalable, customizable, and responsive web apps by partnering with our trusted Python app development team who has ${YEARS_PLUS} years of experience. Also, our simple yet efficient app constructing methods assist us to reduce up to 60% development cost which is loved by many start-ups and SMBs.`,
    ],
  },

  services: {
    wideHead: true,
    eyebrow: "Services",
    title: "Our Top-grade Python Development Services",
    body: "Soft Suave provides the most reliable Python app developers who can help businesses to accomplish 10X growth effortlessly.",
    items: [
      {
        name: "Python Web Application",
        body: "Our top dedicated python programmers have hands-on experience to build highly scalable, secure, and performing web apps. They analyze the client's business in and out to deliver custom apps that fit the business characteristics and increases brand reputation.",
      },
      {
        name: "Dedicated Python Developers",
        body: "Hiring offshore Python developers helps in building the best apps for global businesses. Also, our strong development process integrates the latest technology to deliver feature-rich and rewarding the solutions in the market.",
      },
      {
        name: "Migration & Integration Services",
        body: "Our offshore developers help you migrate your existing Apps to Python smoothly without losing any data. They also complete the integration process hassle-free in no time at an affordable cost. Also, you can expect a secure, smooth, and seamless integration and migration service.",
      },
      {
        name: "API Development Services",
        body: "When you hire dynamic Python programmers from us, you have the resource and skillset to build fully functional backend APIs seamlessly. We help you to access your app's platform data by our proficiency in using diverse APIs and internal packages to create more solid client solutions.",
      },
      {
        name: "AI & Machine Learning Apps",
        body: "Our skilled team of Python full-stack developers has expertise working with diverse Python libraries such as Caffe, DeepLearning4J, TensorFlow, Theano, Torch. This helps them to offer best-in-class Machine Learning and AI-based services.",
      },
      {
        name: "Support & Maintenance",
        body: "Highly-performing Apps need support and maintenance regularly. Our dedicated developers have extensive knowledge about Python's vast ecosystem which enables us to offer round-the-clock support and free maintenance for apps developed at Soft Suave.",
      },
    ],
  },

  midCta: {
    title: `Hire Python Developers Starting from ${HOURLY_RATE}`,
    body: "We will provide you with remote python developers that work from India. Contact us to take a look at CVs.",
    cta: { label: "Request Rate Card", href: "/contact" },
  },

  process: {
    wideHead: true,
    eyebrow: "Hiring Process",
    title: "Hire Python Developers in 4 easy steps",
    body: "Below is the simple Full-time Hiring Process that we follow while offering 1-week free trial to our clients.",
    steps: techSteps("Python"),
  },

  whyUs: {
    wideHead: true,
    eyebrow: "Why Soft Suave",
    title: "What Makes Our Python Developers Unique and Trustworthy?",
    body: "Hire Python developers from us having 5+ years of average experience to build expressive, scalable, & visually appealing web applications.",
    items: techWhy("Python", "Django, Flask, FastAPI, AI/ML, automation, and data engineering"),
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
        q: "How can I hire Python developers in India who fit for my start-up?",
        a: [
          "To hire a Python developer who perfectly fits your start-up, you can get in touch with companies like us that offer proficient Python professionals at an affordable cost.",
          "You should also check the below factors or parameters before you start the hiring process;",
        ],
        points: [
          "Level of experience",
          "Expertise",
          "Reviews from past clients & projects",
          "Easy communication",
          "Offering enterprise solutions for SMBs and Start-ups at affordable cost",
          "Privacy and security measures",
        ],
        pointsAfter: 1,
      },
      {
        q: "How long does it take to build a web application with Python?",
        a: "The duration of web app development with Python depends on the number and complexity of features. However, we follow the effective first-time-right coding methodology which allows us to complete projects before the agreed deadline.",
      },
      {
        q: "Why should I work with Soft Suave for my Python project?",
        a: "Our Python web developers leverage this high-level dynamic programming language to help clients get a competitive edge in the web app market. Moreover, we consistently developing multi-disciplinary, complex, and multi-technology projects with a convenient development process. You can communicate and assign tasks from your project directly to the team and conduct sprint meetings to understand the progress of your project.",
      },
      {
        q: "How much does it cost to hire Python Developers?",
        a: "Before quoting the price of your Python development, we carefully analyze every requirement of the project. Hence, our cost is competitive in the market that attracts many Startups and SMBs. Additionally, you can hire a developer from these cost-effective hiring models - part-time, full-time, or milestone.",
      },
      {
        q: "How do I test your Python developer's expertise?",
        a: "You can conduct a one-to-one interview via skype, slack, and Google Meet. Furthermore, you can also avail of their 1-week free trial to test the developer's expertise on your business.",
      },
      {
        q: "What type of web applications can be developed using Python?",
        a: "We build web applications in Blockchain, Audio & Video, System administration, Games, Machine learning, Data Science & Analytics, E-commerce, and Entertainment. However, when you hire Python developer from India, we help you to develop any type of app customized for your business goals and needs.",
      },
    ],
  },
};
