/**
 * The `hire-kotlin-developer` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-kotlin-developer/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all twenty.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { mobileExplore } from "../hire-explore";
import { partnerTable } from "../hire-comparison";
import { HOURLY_RATE } from "../../company-figures";

export const skill: HireSkill = {
  closingCtaIcon: true,
  clientsWideTitle: "38ch",
  slug: "hire-kotlin-developer",
  key: "kotlin",
  name: "Kotlin",
  role: "Kotlin Developers",
  metaTitle: "Hire Kotlin Developers India - Top 1% Programmers",
  metaDescription:
    "Hire Kotlin developers India to turn your app ideas into reality, offering expert solutions with a 40-hour free trial for powerful, efficient mobile apps",
  serviceType: "Kotlin development staffing",
  ctaLabel: "Hire Kotlin developers",

  order: [
    "clients",
    "whyUs",
    "process",
    "techStack",
    "services",
    "vetting",
    "comparison",
    "exploreMore",
    "testimonials",
    "faq",
  ],

  hero: {
    titleLines: ["Hire Kotlin Developers", "in India on Contract"],
    accent: "Kotlin Developers",
    body: [
      "Soft Suave connects businesses with vetted Kotlin developers from India for Android and backend development. Our developers specialize in Kotlin, Android Studio, Jetpack, APIs, enterprise mobility, and scalable mobile applications. Hire quickly with flexible contracts.",
      "See why businesses choose Soft Suave for their Kotlin developer hiring.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Kotlin Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      title: "Get Skilled Remote Developers",
      submitHover: 'black',
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Kotlin requirement.",
      subject: "Kotlin Developers enquiry",
      alert: sharedHeroAlert,
    },
    // A photo for this technology, darkened by the strong veil `HirePage`
    // applies (review: "update the images and add a black gradient").
    image: {
      src: "/images/landing/hs-kotlin-hero.webp",
      width: 1800,
      height: 900,
      alt: "Smartphone displaying code on a dark surface",
      blurDataURL:
        "data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAACQAQCdASoQAAsAA4BaJaQAAudVM+AA/vQlRr6cs+YTHhL2c11UAAAA",
    },
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "Why Hire Kotlin Developers from Soft Suave",
    body: "Choose Soft Suave for Kotlin development! Our talented developers utilize the latest technology to produce cutting-edge results that will elevate your business and deliver the results you deserve. Whether you're looking for top-tier Kotlin developers or a cost-effective offshore software development service, we ensure you get the best talent for your needs.",
    items: [
      {
        name: "Pre-vetted Kotlin developers",
        body: "We carefully vet each Kotlin developer to ensure top-notch skills, reliable performance, and a strong dedication to your project's success.",
        icon: "users",
      },
      {
        name: "Flexible hiring models",
        body: "Our flexible hiring options allow you to hire dedicated Kotlin developers and adjust your team's size based on project needs, ensuring seamless scaling.",
        icon: "gauge",
      },
      {
        name: "Global delivery standards",
        body: "Utilizing agile practices and global standards, we guarantee high-quality deliverables and consistency in every phase.",
        icon: "globe",
      },
      {
        name: "Strict NDA & IP protection",
        body: "Your intellectual property is safe with us. We provide indisputable NDAs and comprehensive protection of your ideas.",
        icon: "shield",
      },
      {
        name: "Time Zone Flexibility",
        body: "Our developers overlap with your time zone for 4-6 hours, ensuring smooth, real-time collaboration.",
        icon: "book",
      },
      {
        name: "World-Class Developers at Budget-Friendly Rates",
        body: "Hire offshore Kotlin developer talent at competitive offshore rates from Soft Suave, ensuring value and quality for your project.",
        icon: "coins",
      },
    ],
  },

  process: {
    eyebrow: "Hiring Process",
    title: "Steps to Hire a Kotlin Developer",
    body: "Unlock your dream team fast! Our dynamic 4-step hiring process makes it a breeze to find and onboard top-notch Kotlin developers.",
    steps: [
      {
        n: "01",
        name: "Share the JD",
        body: "Brief us about the kind of Kotlin developers you are looking to hire and your project requirements.",
      },
      {
        n: "02",
        name: "Shortlist The Right Developers",
        body: "Choose top Kotlin developers from a hand-picked list, matched with your project requirements.",
      },
      {
        n: "03",
        name: "Free 40-hour Trial",
        body: "Evaluate our developers' abilities with a 40-hour trial, risk-free.",
      },
      {
        n: "04",
        name: "Onboard & Manage",
        body: "Onboard the resource to your team after signing the SLA and NDA.",
      },
    ],
  },

  // The Android page's labelled rows: two or three tools per group left most
  // of the panel grid empty (review: "change the design of the tech stack").
  techStackStyle: "rows",
  techStack: {
    eyebrow: "Technology",
    title: "Technical Expertise of Our Kotlin Developers",
    body: "Our Kotlin developers are technically proficient in mobile, web, server-side development, and more, which allows for the creation of high-quality code, smooth integrations, and optimised performance in every one of your projects.",
    groups: [
      { name: "Cross-Platform Development", items: ["Kotlin Multiplatform", "Ktor", "SQLite"] },
      { name: "App Architecture", items: ["MVVM", "Jetpack", "Retrofit"] },
      { name: "Asynchronous Programming", items: ["Coroutines"] },
      { name: "Backend Development", items: ["Spring Boot", "Micronaut"] },
      { name: "Android App Development", items: ["Android Studio", "Firebase"] },
      { name: "Frontend Web Development", items: ["React", "Angular"] },
      {
        name: "Testing Frameworks",
        items: ["JUnit", "Mockito", "Espresso", "Roboelectric", "TestNG"],
      },
      {
        name: "Build Tools",
        items: ["Gradle", "Maven", "Docker (Containerization)", "Postman (API Testing)"],
      },
      {
        name: "Version Control and CI/CD",
        items: ["Git", "Jenkins", "GitHub Actions", "Travis CI", "Circle CI"],
      },
      { name: "Dependency Injection", items: ["Koin", "Hilt", "Dagger"] },
    ],
  },

  services: {
    eyebrow: "Services",
    title: "Kotlin Development Services We Offer",
    body: "Explore our comprehensive Kotlin development services! From mobile apps to backend solutions, we provide tailored approaches to enhance user experience and scale business growth.",
    items: [
      {
        name: "Kotlin Android App Development",
        body: "Engage skilled Kotlin developers from Soft Suave to unleash efficient Android applications. With seamless integration, our team crafts tailored solutions that ensure optimized, scalable apps that elevate your user experience.",
      },
      {
        name: "Kotlin Integration and Migration",
        body: "Easily integrate Kotlin into your existing systems or migrate from other languages. Hire dedicated Kotlin developers to ensure smooth transitions and optimize your app's performance for better efficiency.",
      },
      {
        name: "Wearable Application",
        body: "Create wearable applications that are innovative and functional. Our team provides seamless integration for user-friendly interfaces and live data updates associated with wearables.",
      },
      {
        name: "AI/ML App Development",
        body: "Supercharge your app with AI/ML using Kotlin! Discover innovative technology and intelligent solutions today. Hire remote Kotlin developers to craft smarter, more personalized app experiences that stand out!",
      },
      {
        name: "Kotlin Support and Maintenance",
        body: "Enhance your Kotlin applications with ongoing support. Hire Kotlin developers remotely for timely bug fixes, updates, and enhancing operations for long-lasting experiences.",
      },
      {
        name: "Server-Side Development",
        body: "Optimize backend operations by using Kotlin for your server-side applications. We develop secure, scalable, and performance-oriented server-side solutions that match perfectly with your business processes.",
      },
      {
        name: "Kotlin Multiplatform Development",
        body: "Build cross-platform apps with Kotlin's multiplatform features. Hire expert Kotlin developers to create seamless cross-platform solutions and grow your app's audience without extra delay or spend.",
      },
      {
        name: "Kotlin Enterprise App Development",
        body: "Modernize your enterprise with bespoke Kotlin applications. Hire dedicated Kotlin developers to produce scalable, secure, and efficient solutions customized to your company's requirements.",
      },
      {
        name: "AR/VR Mobile App",
        body: "Boost user interaction with state-of-the-art AR/VR apps with Kotlin. We produce captivating applications that will take users to new worlds with dynamic and engaging experiences.",
      },
      {
        name: "Kotlin Game Development",
        body: "Create and publish your own mobile games with Kotlin. Hire Kotlin game developers to design interactive and visually spectacular gaming experiences with compelling graphics that will keep your users coming back for more.",
      },
      {
        name: "Kotlin App Optimization",
        body: "Leverage Kotlin to improve the performance and speed of your application. Our team is dedicated to fine-tuning your app to make sure it runs quickly and efficiently on any and all devices.",
      },
      {
        name: "Consulting",
        body: "Get expert advice on Kotlin development. Our consultants guide you through best practices, frameworks, and strategies to scale and optimize your app's success.",
      },
    ],
  },

  /** Kotlin's third stage is worded differently from the other newer pages'. */
  vetting: {
    eyebrow: "Vetting",
    title: "How We Vet and Onboard Top Kotlin Developers",
    body: "We ensure excellence in every hire! Our rigorous vetting process combines technical assessments, interviews, and portfolio reviews to onboard only the best Kotlin developers for your projects.",
    steps: [
      {
        n: "01",
        name: "Rigorous talent sourcing",
        body: "Rather than just putting up job posts and waiting around, we find outstanding Kotlin professionals",
      },
      {
        n: "02",
        name: "In-depth skill assessment",
        body: "Each developer undergoes complex coding challenges and skill assessments.",
      },
      {
        n: "03",
        name: "Collaboration & problem-solving focus",
        body: "We look for developers who thrive in teams and have strong problem-solving abilities.",
      },
      {
        n: "04",
        name: "Cultural fit & adaptability",
        body: "We ensure our developers can easily integrate into your team's culture.",
      },
    ],
  },

  comparison: {
    ...partnerTable(
      "Choosing the Right Kotlin Partner for Your Specific Needs",
      "Use our simple guide to compare freelancers, in-house teams, and Soft Suave’s experts to find the best fit for your business.",
    ),
    wideHead: true,
  },

  exploreMore: { ...mobileExplore, wideHead: true },

  faq: {
    eyebrow: "FAQs",
    title: "FAQs About Hiring Kotlin Developers",
    body: "Learn more about our procedures & methods with the help of these FAQs.",
    items: [
      {
        q: "How much does it cost to hire Kotlin developer?",
        a: `Several factors influence the price of hiring a Kotlin developer, among them: the developer's experience, the project's complexity, and the hiring model are important ones. At Soft Suave, we provide Kotlin developers starting with an affordable ${HOURLY_RATE}.`,
      },
      {
        q: "Is there any free trial period available?",
        a: "Yes, we have a 40-hour trial period so you can test the skills of our developers.",
      },
      {
        q: "What are the hiring engagement options available at Soft Suave?",
        a: "Fixed price, time and material, or managed services are the hiring engagement options available at Soft Suave.",
      },
      {
        q: "Do you provide support and maintenance services after deployment?",
        a: "Yes, we offer ongoing maintenance, support, and optimization once the project is live.",
      },
      {
        q: "Where can you find a Kotlin Engineer?",
        a: "You can hire remote Kotlin developers through Soft Suave, where we provide access to top developers, ensuring a perfect fit for your needs.",
      },
    ],
  },
};
