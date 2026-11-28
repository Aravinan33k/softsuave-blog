import type { HeroContent } from "@/components/landing/hero";
import type { FaqContent } from "@/components/landing/faq";
import { heroForm } from "@/lib/home/hire-roles/shared";

/**
 * /healthcare-mobile-app-development-company — softsuave.com's healthcare mobile app development page, word
 * for word: the banner with its quote form, the two overview rows, the three service cards, the two success
 * stories, the advantages for patients and providers, the FAQs and the closing "Book Free Consultation"
 * band. Images are under /images/healthcare-app.
 */

export const healthMeta = {
  path: "/healthcare-mobile-app-development-company",
  shortTitle: "Healthcare Mobile App Development Company",
  title: "Healthcare App Development Company India",
  description:
    "Healthcare app development company India building HIPAA-compliant, scalable, and custom healthcare applications for global enterprises.",
} as const;

const IMG = "/images/healthcare-app";

export const healthHero: HeroContent = {
  titleLines: ["Best Healthcare Mobile App Development Company in India"],
  // No coloured words: the live heading is all white.
  accent: "Healthcare Mobile App",
  titleScale: "home",
  body: [
    "Soft Suave has a healthcare application development company in India that provides world-class healthcare app development services to the world's leading health brands.",
  ],
  points: [],
  ctas: [{ label: "Get Free Quote", href: "/free-quote" }],
  image: {
    src: `${IMG}/hero.webp`,
    width: 1000,
    height: 646,
    alt: "",
    veil: "strong",
    still: true,
  },
  form: {
    ...heroForm({
      title: "Let's Discuss Your Project",
      requirementLabel: "How Can We Help (Requirement)",
      requirementPlaceholder: "How Can We Help(Requirement)",
      subject: "Healthcare mobile app development enquiry",
      noEyebrow: true,
    }),
    body: "Get free rough quote in 24 hrs",
  },
};

/** A run of copy: plain text, a bold phrase, or a link. */
export type Piece =
  | string
  | { readonly b: string }
  | { readonly text: string; readonly href: string };

export const healthAbout = [
  {
    title: "Soft Suave Connects, Secures and Simplifies",
    accent: "Secures and Simplifies",
    image: {
      src: `${IMG}/health-care.webp`,
      alt: "Healthcare Application Development Company",
      width: 400,
      height: 331,
    },
    paragraphs: [
      [
        "Ranked top among the ",
        { b: "healthcare mobile app development service" },
        " providers in the world, Soft Suave connects mobile apps and healthcare providers in a robust and real way. Our team of ",
        {
          text: "mobile app development",
          href: "/mobile-application-development-company",
        },
        " experts and skilled healthcare app developers offer assistance in healthcare strategies and simplify the implementation.",
      ],
      [
        "We take pride in creating mobile health apps that are compliant with healthcare regulations benefiting patients and providers simultaneously. Soft Suave’s core focus is to make the future of healthcare easier for everyone, from any location and with any device.",
      ],
    ] as readonly (readonly Piece[])[],
  },
  {
    title: "Healthcare Mobile App Development Company",
    accent: "Mobile App Development Company",
    image: {
      src: `${IMG}/bnr.webp`,
      alt: "Healthcare Mobile App Development Solutions by Soft Suave",
      width: 579,
      height: 321,
    },
    paragraphs: [
      [
        "We address the efficiency needs of the healthcare industry systematically and help companies revolutionize their medical devices with smart, intuitive and risk-mitigating companion apps. We also help in designing customized mHealth mobile app solutions according to your business needs.",
      ],
      [
        "Our healthcare mobility solutions include various futuristic healthcare and wellness apps that are loved by patients and trusted by doctors. This makes us the leading healthcare app development company.",
      ],
      [
        "We are authoritative in application development, application management and infrastructure monitoring relating to mHealth apps.",
      ],
    ] as readonly (readonly Piece[])[],
  },
] as const;

export const healthCards = [
  {
    name: "Application Development",
    body: "We leverage custom development services, understanding the complexity of the healthcare application space.",
    icon: `${IMG}/heart.svg`,
    alt: "Application Development Company Soft Suave",
  },
  {
    name: "Application Management",
    body: "Technicalized team expertise in industry-standard best practices for application support and management.",
    icon: `${IMG}/reception.svg`,
    alt: "Application Management Company Soft Suave",
  },
  {
    name: "Infrastructure Monitoring",
    body: "From servers to bandwidth, we completely monitor your IT infrastructure 24*7.",
    icon: `${IMG}/call-center.svg`,
    alt: "Infrastructure Monitoring Company Soft Suave",
  },
] as const;

export const healthStories = {
  title: "Our Success Stories",
  body: "We have been assisting our clients in meeting their unique requirements by addressing their challenges and creating just the right mHealth solutions.",
  solutionsLabel: "Solutions",
  featuresLabel: "Key Features",
  cta: { label: "Know More", href: "/free-quote" },
  items: [
    {
      title: "Patient-care Communication Platform",
      body: "The secure healthcare messaging app is FREE and helps several doctors & medical professionals with an efficient patient-care communication platform.",
      points: [
        "Exemplary medical transcription",
        "Encrypted secure communication - HIPAA",
        "Facilitates quality transition care",
        "Secure cloud-based storage",
        "Dashboard report for actionable patient health information",
      ],
      image: {
        src: `${IMG}/case-study-1.webp`,
        alt: "Patient-care Communication Platform",
        width: 1570,
        height: 2146,
      },
    },
    {
      title: "Customized Healthcare Platform",
      body: "As an experienced healthcare mobile app development company, we built a healthcare platform to make everyday life better for patients with health problems. This platform was established in the Web, Android and iOS for the usage of employees, patients and hospital admin.",
      points: [
        "Secure video conferences",
        "Telehealth",
        "Record and manage triage results",
        "User-friendly UI & UX to make it easier for all users",
        "Secure encryption of prescriptions and reports",
      ],
      image: {
        src: `${IMG}/case-study-2.webp`,
        alt: "Patient-care Communication Platform",
        width: 1831,
        height: 2443,
      },
    },
  ],
} as const;

export const healthAdvantages = {
  title: "Advantages of Adopting Healthcare Mobility Solutions",
  accent: "Healthcare Mobility Solutions",
  body: "We implement innovative digital health strategies and improve the way you deliver healthcare solutions.",
  items: [
    {
      title: "Patients",
      body: "Healthcare mobility solutions improve the medical care provided to patients by blending the app with numerous platforms, directions, and systems.",
      points: [
        "Reduce insurance cost",
        "Provide preventive care",
        "Cost-effective healthcare monitoring",
        "Remote medical care",
        "Schedule appointments",
        "Sharing patient records",
        "Pre-diagnosis",
        "Dedicated patient portals",
      ],
      image: {
        src: `${IMG}/patients.webp`,
        alt: "Medical Care App For Patient",
        width: 687,
        height: 808,
      },
    },
    {
      title: "Healthcare Providers",
      body: "From checking patient symptoms to studying their medical history, patient well-being solution providers benefit significantly with the smart application.",
      points: [
        "Patient management",
        "Uninterrupted data flow",
        "Enhance care efficiency",
        "Aid diagnostic accuracy",
        "SPrecise point of care",
        "Easy information accessibility",
        "Passive care",
        "Medical practitioner convenience",
      ],
      image: {
        src: `${IMG}/providers.webp`,
        alt: "Healthcare App Provider Soft Suave",
        width: 687,
        height: 808,
      },
    },
  ],
} as const;

export const healthFaqs: FaqContent = {
  eyebrow: "",
  title: "Frequently Asked Questions",
  body: "Know more about our processes and how we work, with the help of the following FAQs.",
  items: [
    {
      q: "What is the use of mobile app development services in the Healthcare industry?",
      a: "Mobile application development service elevates the use of technology in the healthcare industry. If mobile app development services were not there, there wouldn’t be mHealth or telehealth trending in the world right now.",
    },
    {
      q: "To create a medical app for health care personnel, should one start developing on iOS or Android first?",
      a: "It depends on several factors starting from demographics to your business requirement. It is not fair to develop a mHealth app in Android if you are in the USA, where the number of iPhone users is high.",
    },
    {
      q: "What features should a mobile app have for Hospital/Healthcare?",
      a: "Features in mHealth depend on the type of healthcare sector you are in. Basic features like appointment booking, media upload, in-app messaging, and in-app payments are essential.",
    },
    {
      q: "How much does it cost to make medical apps for health care professionals?",
      a: "On average, a basic mHealth app will cost $XXX. However, the cost increases based on your custom requirement and features. If your budget is low, you can go for HIPAA compliant clone mHeath apps.",
    },
  ],
};
