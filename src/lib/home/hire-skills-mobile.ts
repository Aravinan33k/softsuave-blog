/**
 * Mobile hire pages: Swift, Kotlin, Flutter, React Native, Ionic.
 *
 * Every string is its live softsuave.com page's own copy, and `order` is the
 * sequence that page's `<section>` elements run in. All five differ:
 *
 * - Swift and Flutter run the older layout, though Swift's hiring band has five
 *   steps where every other page has four.
 * - React Native puts its comparison table *before* the rate band, and that
 *   table is its own — different columns and real rate figures, not the
 *   shared one in `hire-comparison.ts`.
 * - Ionic runs a technical-proficiency band between its rate band and its
 *   why-hire cards, and reaches its hiring steps only after the comparison.
 * - Kotlin runs the newer layout: a client band first, hiring steps second.
 *
 * These pages link the mobile roster in their "Explore More Technologies" band,
 * not the web one — that is the only difference the live markup makes between
 * the two groups there.
 */

import type { HireSkill } from "./hire-skill";
import { sharedHeroAlert } from "./delivery-shared";
import { mobileExplore } from "./hire-explore";
import { partnerTable } from "./hire-comparison";
import { MERN_STEPS, MERN_WHY, CURATED_STEPS } from "./hire-blocks";

const swift: HireSkill = {
  slug: "hire-swift-developers",
  key: "swift",
  name: "Swift",
  role: "Swift Developers",
  metaTitle: "Hire Swift Developers India | 40-Hour Free Trial",
  metaDescription:
    "Hire skilled Swift developers through Soft Suave — pre-vetted experts in Swift, Xcode and API development, available within 24–48 hours.",
  serviceType: "Swift development staffing",
  ctaLabel: "Hire Swift developers",

  order: [
    "overview",
    "services",
    "midCta",
    "process",
    "whyUs",
    "exploreMore",
    "testimonials",
    "faq",
  ],

  hero: {
    titleLines: ["Hire Swift Developers", "in India on Contract"],
    body: [
      "Top-tier Swift developers do not have to come with a top-tier price tag. Hire skilled Swift developers through Soft Suave, a specialized IT outsourcing agency offering pre-vetted experts in Swift, Xcode, and API development; within 24–48 hours, and up to 60% more cost-effective.",
      "Lower hiring cost, more native iOS performance starting right now.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Swift Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      eyebrow: "*Satisfaction Guaranteed - Get 40-hour Free Trial",
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Swift requirement.",
      subject: "Swift Developers enquiry",
      alert: sharedHeroAlert,
    },
    image: {
      src: "/images/four/work-1.webp",
      width: 1200,
      height: 860,
      alt: "A Swift codebase shared across iPhone, iPad, Mac, and Watch applications",
    },
  },

  overview: {
    eyebrow: "Overview",
    title: "Hire Remote Swift Developers from Soft Suave",
    paragraphs: [
      "Onboard Swift developers from us to build robust and reliable software solutions that meet your business objectives and exceed customer expectations.",
      "Soft Suave has a team of experienced and talented Swift developers to help you build a custom iOS app tailored to your specific needs. In order to create a fast-turnaround app, hire swift programmers from us who will provide you with high-quality, reliable, and user-friendly apps. Our Swift expertise and knowledge enable us to create secure and safe apps. Swift's agility and flexibility allow us to develop apps quickly.",
      "Outsource talented and reliable Swift developers who can develop sophisticated apps for different iOS devices, such as iPhones, iPads, and Apple Watches. It is the best choice to hire remote Swift developers rather than hiring in-house developers for project resources. The 40-hour free trial for developers allows you to see our developers' work before deciding. Hire swift app developers in India who can ramp up your project and accelerate the development process. We guarantee on-time delivery, quality assurance, and post-release support.",
    ],
  },

  services: {
    eyebrow: "Services",
    title: "Outsource Swift App Developers for Exceptional Range of Service",
    body: "Hire Dedicated Swift App Developers from Soft Suave whose Expertise is unparalleled, with years of experience and exceptionality in the field.",
    items: [
      {
        name: "Swift UX and UI Development",
        body: "Using SwiftUI, our developers can create engaging user experiences on Apple platforms with built-in animations, transitions, and state management.",
      },
      {
        name: "Custom Swift App Development",
        body: "With the help of Soft Suave's Swift developers, you will receive a tailor-made app that meets your specific business requirements",
      },
      {
        name: "Swift App Testing",
        body: "We test your Swift app for compatibility with different devices and OS versions to ensure a smooth user experience",
      },
      {
        name: "Swift App Strategy & Consulting",
        body: "We help startups and SMEs implement a profitable swift app development strategy that saves them time and adds value",
      },
      {
        name: "Swift Apps Migration & Upgradations",
        body: "Keeping your Swift application updated will allow you to migrate applications from other languages and platforms.",
      },
      {
        name: "Swift Maintenance and Support",
        body: "Keeping your app updated, and functional is our priority, and we offer swift maintenance and support services",
      },
    ],
  },

  midCta: {
    title: "Hire Remote Swift Developers Starting from $14/hour",
    body: "We will provide you with remote Swift developers that work from India. Contact us to look at the rate card.",
    cta: { label: "Request Rate Card", href: "#enquiry" },
  },

  /** Five stages, not four — the Swift page is the only one that splits them. */
  process: {
    eyebrow: "Hiring Process",
    title: "Onboard Remote Swift Developers in 4 easy steps",
    body: "Below is the simple Full-time Hiring Process that we follow while offering 1-week free trial to our clients.",
    steps: [
      {
        n: "01",
        name: "Inquiry",
        body: "Tell us in brief about your ideas and needs. Don't worry it's secure and confidential.",
      },
      {
        n: "02",
        name: "Select CV",
        body: "Shortlist candidates which best fit in your needs by viewing their CVs.",
      },
      {
        n: "03",
        name: "Assessment",
        body: "Optionally, assess candidates over a phone or video call.",
      },
      { n: "04", name: "Trial Run", body: "Take a 1-week free trial." },
      {
        n: "05",
        name: "Add resource in your team",
        body: "If you like the resource(s), pay for the trial time and onboard resource(s).",
      },
    ],
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "Why Hire Swift Developers from Soft Suave Most Reliable?",
    body: "Our Swift app developers are renowned for their technical expertise, attention to detail, and focus on quality.",
    items: MERN_WHY,
  },

  exploreMore: mobileExplore,

  faq: {
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    body: "Here are some questions you may have about hiring swift developers that are often asked",
    items: [
      {
        q: "You sign NDAs, right?",
        a: "We take the security of our client's information seriously, which is why we require all of our developers to sign NDAs.",
      },
      {
        q: "How many platforms do your Swift developers support?",
        a: "Our developers experienced in working with multiple platforms, including iOS, and macOS.",
      },
      {
        q: "What is the cost of hiring a Swift app developer?",
        a: "We can provide you with a custom quote based on your specific requirements based on the skill level, experience, and location of the Swift developer you choose.",
      },
      {
        q: "How to Hire Swift App Developers?",
        a: [
          "Identify all the tasks the developer needs to complete",
          "Choose your preferred developer and technology.",
          "Finalize the agreement with the project manager or sales team.",
          "If you are having trouble, just connect with our experts.",
        ],
      },
      {
        q: "Is it possible to hire swift developers based on needed timeliness?",
        a: "Yes, absolutely. Our expert Swift developers are available for both hourly and project-based tasks. We can match you with the best-suited developer, with the right set of skills and experience to meet your needs.",
      },
    ],
  },
};

const kotlin: HireSkill = {
  slug: "hire-kotlin-developer",
  key: "kotlin",
  name: "Kotlin",
  role: "Kotlin Developers",
  metaTitle: "Hire Kotlin Developers India - Top 1% Programmers",
  metaDescription:
    "Hire vetted Kotlin developers from India for Android and backend development. Experts in Kotlin, Android Studio, Jetpack, APIs and enterprise mobility.",
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
      eyebrow: "*Satisfaction Guaranteed - Get 40-hour Free Trial",
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Kotlin requirement.",
      subject: "Kotlin Developers enquiry",
      alert: sharedHeroAlert,
    },
    image: {
      src: "/images/four/work-2.webp",
      width: 1200,
      height: 860,
      alt: "A Kotlin codebase shared across Android, iOS, and server-side targets",
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
        items: ["JUnity", "Mockito", "Espresso", "Roboelectric", "TestNG"],
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

  comparison: partnerTable("Choosing the Right Kotlin Partner for Your Specific Needs"),

  exploreMore: mobileExplore,

  faq: {
    eyebrow: "FAQs",
    title: "FAQs About Hiring Kotlin Developers",
    body: "Learn more about our procedures & methods with the help of these FAQs.",
    items: [
      {
        q: "How much does it cost to hire Kotlin developer?",
        a: "Several factors influence the price of hiring a Kotlin developer, among them: the developer's experience, the project's complexity, and the hiring model are important ones. At Soft Suave, we provide Kotlin developers starting with an affordable $14/hour.",
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

const flutter: HireSkill = {
  slug: "hire-flutter-developers",
  key: "flutter",
  name: "Flutter",
  role: "Flutter Developers",
  metaTitle: "Hire Dedicated Flutter Developers India",
  metaDescription:
    "Hire skilled Flutter developers from India for cross-platform mobile apps. Experts in Flutter, Dart, Firebase, custom UI and Android + iOS delivery.",
  serviceType: "Flutter development staffing",
  ctaLabel: "Hire Flutter developers",

  order: [
    "overview",
    "services",
    "midCta",
    "process",
    "whyUs",
    "exploreMore",
    "testimonials",
    "faq",
  ],

  hero: {
    titleLines: ["Hire Flutter Developers", "in India on Contract"],
    body: [
      "Soft Suave provides skilled Flutter developers from India for startups and enterprises building cross-platform mobile apps. Hire experts in Flutter, Dart, Firebase, API integrations, custom UI, and scalable Android + iOS app development. Fast onboarding with cost-effective engagement options.",
      "See why businesses choose Soft Suave for their Flutter developer hiring.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Flutter Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      eyebrow: "*Satisfaction Guaranteed - Get 40-hour Free Trial",
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Flutter requirement.",
      subject: "Flutter Developers enquiry",
      alert: sharedHeroAlert,
    },
    image: {
      src: "/images/four/work-4.webp",
      width: 1200,
      height: 860,
      alt: "A Flutter application rendering an identical custom interface on iOS and Android",
    },
  },

  overview: {
    eyebrow: "Overview",
    title: "Hire Flutter Developers Team At Your Flexibility",
    paragraphs: [
      "Right from App concept till its successful launch, you can count on our Flutter developers.",
      "Soft Suave is the leading cross-platform app development company in India that offers top Flutter experts for hire. Our Flutter app developer's specialization in developing cost-effective apps is strengthened by leading-edge technologies and tools. Our development team comprises 400+ Success-driven & skilled programmers with more than 6+ years of experience. Our programmers have the expertise to understand the requirements and offer solutions to strengthen your business across several industry verticals. We focus on building enterprise-grade flutter development for start-ups and SMBs around the world. You can hire Flutter developer to build secure and reliable applications with next-gen features for your business.",
      "Our certified Flutter engineers analyse your business needs and help you jump start your App development effortlessly. You can hire Flutter developer in India from us and utilize the wide range of libraries to develop engaging apps that support intuitive user interface. Our Flutter app developer's hands-on experience helps start-up and SMB owners to transform any business requirement into world-class apps. Hire Flutter developer from us to reduce 60% of your development cost and design robust cross-platform apps that run flawlessly on all devices and platforms.",
    ],
  },

  services: {
    eyebrow: "Expertise",
    title: "The Expertise Of Our Flutter Developers",
    body: "We offer highly-skilled Flutter App developers to obtain futuristic solutions that enhance your revenue and ROI.",
    items: [
      {
        name: "Dedicated Flutter Team",
        body: "We are renowned for housing committed and expert Flutter developers in India. When you partner with us and hire Flutter developer, you get to work with dedicated Flutter teams that provide end-to-end Flutter development services at a budget-friendly cost.",
      },
      {
        name: "Flutter Consultation",
        body: "Our Flutter experts are experienced in all the latest techs from different industry verticals. Hence when you hire Flutter developer, they have the capability and tech expertise to deliver feature-rich and successful apps for your business.",
      },
      {
        name: "Flutter Enterprise Apps",
        body: "Hire Flutter developer who provide top-notch services to satisfy your need for enterprise app development. Our developers have proficiency in managing enterprise-level requirements and delivering highly competitive solutions in the market.",
      },
      {
        name: "Platform Migration to Flutter",
        body: "Platform migration is crucial in this tech era. Hire Flutter developers who are well-versed in migrating your legacy solution to modern Flutter solutions safely without losing any data.",
      },
      {
        name: "Blockchain Applications",
        body: "Hire Flutter developer from us for a guaranteed hassle-free development of blockchain-based apps. We use all the latest tools and technologies to deploy visually attractive and robust blockchain-based mobile apps on iOS and Android.",
      },
      {
        name: "App Maintenance & Support",
        body: "Soft Suave's remote Flutter developers work round the clock to offer maintenance and support to your Flutter App. We do not stop our services after successful deployment; instead go above and beyond to satisfy the clients during post-deployment, maintenance and support.",
      },
    ],
  },

  midCta: {
    title: "Hire Flutter Developers Starting from $14/hour",
    body: "We will provide you with remote flutter developers that work from India. Contact us to take a look at CVs.",
    cta: { label: "Request Rate Card", href: "#enquiry" },
  },

  process: {
    eyebrow: "Hiring Process",
    title: "Hire Flutter Developers in 4 easy steps",
    body: "Below is the simple Full-time Hiring Process that we follow while offering 1-week free trial to our clients.",
    steps: MERN_STEPS,
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "Why Are Our Flutter Developers Considered the Best?",
    body: "Building intuitive and user-friendly Apps is easily achievable when you connect with our trained Flutter developers.",
    items: MERN_WHY,
  },

  exploreMore: mobileExplore,

  faq: {
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    body: "Know more about our processes and how we work, with the help of the following FAQs.",
    items: [
      {
        q: "Can I communicate directly with the developer hired for my app?",
        a: "Yes, you have the right to communicate and assign tasks directly to your dedicated Flutter developer through Skype, Slack, Microsoft Teams and Google Meet.",
      },
      {
        q: "What are the types of engagement models you offer?",
        a: [
          "When you hire Flutter developers from us, we offer three flexible engagement models to fit your need and budget.",
          "Fixed-bid Model: - Small projects fall into this model where the budget and time is fixed before the project kick-off.",
          "Time & material Model: - This model is used when clients have a lot of requirements. Clients are billed for the hours invested by the developers.",
          "Dedicated Team: - A team of dedicated developers will be assigned to clients. The charges will be monthly-based.",
        ],
      },
      {
        q: "Do you use any project management tools or methodology while developing my app?",
        a: "Yes, we use Trello and JIRA for project management. The development team follows Agile and SCRUM methodologies to develop reliable app solutions.",
      },
      {
        q: "What are the advantages of hiring a dedicated team?",
        a: "When you hire our dedicated development team, you can communicate and assign tasks directly to the team. Moreover, you can conduct sprint meetings and receive daily reports from the team to understand the progress of your project.",
      },
      {
        q: "Can you sign a Non-disclosure agreement (NDA) for my project?",
        a: "Definitely! Confidentiality and data security are our utmost priority. Thus, Soft Suave signs the NDA agreement before you hire Flutter developer and start the project with us.",
      },
    ],
  },
};

const reactNative: HireSkill = {
  slug: "hire-react-native-developers",
  key: "react-native",
  name: "React Native",
  role: "React Native Developers",
  metaTitle: "Hire React Native Developers India | $14/hr",
  metaDescription:
    "Hire pre-vetted React Native developers experienced in cross-platform iOS and Android development, UI/UX, plugins and legacy app migration. From $14/hour.",
  serviceType: "React Native development staffing",
  ctaLabel: "Hire React Native developers",

  /** The comparison table comes *before* the rate band on this page. */
  order: [
    "overview",
    "services",
    "comparison",
    "midCta",
    "process",
    "whyUs",
    "exploreMore",
    "testimonials",
    "faq",
  ],

  hero: {
    titleLines: ["Hire React Native Developers", "in India on Contract"],
    body: [
      "Soft Suave provides pre-vetted React Native developers experienced in cross-platform iOS and Android app development, UI/UX, plugin development, and legacy app migration. Every engagement starts with a 40-hour risk-free trial, with rates from $14/hour and no long-term contract required until you're satisfied.",
      "All your React Native hiring problem ends right here.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top React Native in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      eyebrow: "*Satisfaction Guaranteed - Get 40-hour Free Trial",
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your React Native requirement.",
      subject: "React Native Developers enquiry",
      alert: sharedHeroAlert,
    },
    image: {
      src: "/images/four/work-5.webp",
      width: 1200,
      height: 860,
      alt: "A React Native application sharing components and logic across iOS and Android",
    },
  },

  overview: {
    eyebrow: "Overview",
    title: "Hire Dedicated Team Of React Native Developers",
    paragraphs: [
      "Soft Suave is a renowned web and mobile app development company that houses more than 300+ top-ranked developers in India. Besides, Soft Suave also employs top mobile app developers that are experts in all the latest technologies to deliver amazing cross-platform apps and robust native mobile apps according to business requirements.",
      "Our premium React Native app developers use cutting-edge technology to deliver outstanding applications that are innovative and high-performing at the same time. You can expect quality results in no time if you hire our dedicated React Native developer.",
      "The code reusability in React Native allows our React Native app developers to develop intuitive apps in both iOS and Android platforms in no time. They can easily raise the bar by competing with Native apps in the market and win with the same cross-platform application. Our testimonials and client reviews are a witness to the quality of work our expert React Native app programmers provide to our clients. Hire from Soft Suave and harness the top-tier React Native developers in India to accomplish your business goals at the most economical price.",
    ],
  },

  services: {
    eyebrow: "Expertise",
    title: "Expertise of Our React Native Developers",
    body: "You are 100% guaranteed to have a competitive edge in the market if you hire our React Native developer.",
    items: [
      {
        name: "React Native UI/UX Development",
        body: "Developers at Soft Suave leverage the React Native library to develop the most interactive and creative user experience for your business application. They concentrate on bringing real-time experience across various devices to make sure all the UI/UX gaps are filled.",
      },
      {
        name: "React Native Android App Development",
        body: "React Native is the powerhouse for Android application development. The expertise of our developers in React Native helps Soft Suave to deliver native, high-quality, and influential Android applications that win customers for your business.",
      },
      {
        name: "React Native iOS App Development",
        body: "Our developers are experts in developing fast loading and fully functional iOS apps with the help of React Native. When you hire React Native developers from Soft Suave, you can save time, cost, and be rest assured to get dynamic iOS apps.",
      },
      {
        name: "Support & Maintenance",
        body: "Soft Suave offers the best React Native support and maintenance service in India. Our React Native app developers focus equally on development services and support & maintenance services. Moreover, they offer cost-effective support & maintenance without compromising on the quality.",
      },
      {
        name: "Plugin Development",
        body: "Hire React Native developers if you want to create custom plugins in no time under your budget. Our best-in-class React Native developers help you in building custom plugins and make them available as npm packages so you can use it in multiple products without any hassles.",
      },
      {
        name: "Integration & Migration",
        body: "React Native integration is made simple if you hire React Native developers from Soft Suave. Our developers have hands-on experience in integrating React Native into popular apps. They are also skillful in migrating apps from any technologies to React Native without any data leakages and risks.",
      },
    ],
  },

  /** This page's own table — not the shared one. Its figures are published. */
  comparison: {
    eyebrow: "Compare",
    title: "Choose the Right React Native Development Partner",
    body: "",
    columns: ["Soft Suave", "Freelance Marketplaces", "In-House Hiring"],
    rows: [
      {
        area: "Starting rate",
        values: ["$14/hour", "$24–$45/hour (Upwork median $30/hour)", "Full salary + benefits + overhead"],
      },
      {
        area: "Vetting before you pay",
        values: [
          "40-hour risk-free trial",
          "No structured trial — client vets manually",
          "Weeks of interviews per candidate",
        ],
      },
      {
        area: "Time to onboard",
        values: [
          "Days, via curated shortlist",
          "Hours to post, but vetting is on you",
          "Typically 4–8+ weeks to hire",
        ],
      },
      {
        area: "IP & confidentiality",
        values: [
          "Standard NDA signed upfront",
          "Varies by individual freelancer",
          "Covered by employment contract",
        ],
      },
      {
        area: "Replacement if it's not a fit",
        values: [
          "Free replacement during/after trial",
          "Re-hire and re-vet from scratch",
          "Termination and re-recruitment process",
        ],
      },
    ],
  },

  midCta: {
    title: "Hire React Native Developers Starting from $14/hour",
    body: "We will provide you with remote React Native developers that work from India. Contact us to take a look at CVs.",
    cta: { label: "Request Rate Card", href: "#enquiry" },
  },

  process: {
    eyebrow: "Hiring Process",
    title: "Hire React Native Developers in 4 easy steps",
    body: "Below is the simple Full-time Hiring Process that we follow while offering 1-week free trial to our clients.",
    steps: MERN_STEPS,
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "What Makes Our React Native Developers Unique and Trustworthy?",
    body: "We provide dedicated React Native developers in India who has exceptional knowledge in web app development.",
    items: MERN_WHY,
  },

  exploreMore: mobileExplore,

  faq: {
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    body: "Know more about our processes and how we work, with the help of the following FAQs.",
    items: [
      {
        q: "How much does it cost to hire a React Native developer from Soft Suave?",
        a: "Hire our professional React Native developer at a competitive cost as low as $14/hour. You can select and hire from the pool of brilliant senior React Native app developers with expertise in all the latest development technologies and tools.",
      },
      {
        q: "Is there a free trial period available?",
        a: "Yes — every engagement starts with a 40-hour risk-free trial so you can evaluate real work before committing, with no long-term contract required until you're satisfied.",
      },
      {
        q: "Is it possible to migrate an app from other technologies to React Native?",
        a: "Yes, you can migrate it without a doubt. Our React Native developer's experience in other technologies works handy to migrate an app from any technology to React Native without any data leakage.",
      },
      {
        q: "What do you need to know before you hire our React Native application developers?",
        a: "Before you hire dedicated React Native application developers from Soft Suave, you need to understand if your app requires React Native for development. Moreover, you have to analyze and confirm what exactly you need from React Native that other technologies have missed. By understanding this, you can acquire a successful application that fits your business plans",
      },
      {
        q: "What are the various hiring models offered by you to hire React Native developers?",
        a: [
          "Hiring our React Native developer is made easy with three flexible hiring models. These models are designed based on the clients' interest and affordability.",
          "Full-time hiring",
          "Part-time hiring",
          "Milestone hiring",
        ],
      },
      {
        q: "Do you provide an NDA for my project?",
        a: "Absolutely. Soft Suave prioritizes confidentiality — we sign a standard non-disclosure agreement (NDA) before starting any project to protect your intellectual property.",
      },
      {
        q: "Will I have full ownership of my source code?",
        a: "Yes, absolutely. The intellectual property rights, including the source code, belong entirely to you upon project completion.",
      },
      {
        q: "What happens if I want to change developers mid-project?",
        a: "You can request a replacement developer at no extra cost during or after the trial period, re-matched based on your feedback.",
      },
      {
        q: "What are the industries that are served by your React Native app developers?",
        a: "Our developers have vast experience in all the growing industries like eCommerce, Healthcare, Education, Telecom and Construction.",
      },
      {
        q: "How do I test your React Native developer's expertise?",
        a: "Soft Suave is open to test our React Native developer before you hire them. You can initiate a one-to-one interview in skype or can give test tasks to understand the technical, soft skill, and rational ability of our proficient React Native developers.",
      },
    ],
  },
};

const ionic: HireSkill = {
  slug: "hire-ionic-developers",
  key: "ionic",
  name: "Ionic",
  role: "Ionic Developers",
  metaTitle: "Hire Ionic App Developers India – Top 3% Talent",
  metaDescription:
    "Hire experienced Ionic developers through Soft Suave — pre-vetted talent within 24–48 hours, skilled in cross-platform hybrid app development, from $14/hour.",
  serviceType: "Ionic development staffing",
  ctaLabel: "Hire Ionic developers",

  order: [
    "overview",
    "services",
    "midCta",
    "techStack",
    "whyUs",
    "comparison",
    "process",
    "exploreMore",
    "testimonials",
    "faq",
  ],

  hero: {
    titleLines: ["Hire Ionic Developers", "in India"],
    body: [
      "Why build three apps when one Ionic codebase does it all? Hire experienced Ionic developers through Soft Suave, a top agency delivering pre-vetted talent within 24–48 hours, skilled in cross-platform hybrid app development, starting from $14/hour on flexible engagement models.",
      "Your next Ionic developer is one conversation away.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Ionic Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      eyebrow: "*Satisfaction Guaranteed - Get 40-hour Free Trial",
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Ionic requirement.",
      subject: "Ionic Developers enquiry",
      alert: sharedHeroAlert,
    },
    image: {
      src: "/images/four/work-6.webp",
      width: 1200,
      height: 860,
      alt: "An Ionic application running as a website and as installed mobile apps",
    },
  },

  overview: {
    eyebrow: "Overview",
    title: "Hire Ionic Developers for Your Project's Needs",
    paragraphs: [
      "Hire our dedicated Ionic developers who have helped businesses accomplish their goals by building high-performance, natively-compiled mobile apps and progressive web apps",
      "Soft Suave is the most renowned Ionic app development company in India and we offer top-notch cross-platform mobile app development services. Our mobile app developers have valuable experience in Ionic and are capable of delivering successful development solutions to clients across USA, UK, Australia, Europe, Canada, and the UAE. Likewise, our mobile app development team has expertise in all the latest technologies, making them the most preferred app development company in South Asia.",
      "Our Ionic app developers are ranked top in India and have an average of 4+ years of experience in the field. Our offshore developers excel in communication, interpersonal skills, and deliver cross-platform apps within tight deadlines.",
    ],
  },

  services: {
    eyebrow: "Expertise",
    title: "Expertise of Our Ionic App Developers",
    body: "Our offshore Ionic developers support various businesses by building user-friendly and engaging cross-platform mobile apps.",
    items: [
      {
        name: "Ionic Mobile App Consultation",
        body: "Our offshore Ionic developers are highly experienced in maintaining apps and delivering expert cross-platform development consultations.",
      },
      {
        name: "App UI/UX Design",
        body: "Our Ionic developers prioritize user-centric design, creating intuitive interfaces that enhance usability and engagement in cross-platform apps.",
      },
      {
        name: "App Migration to Ionic",
        body: "Our Ionic developers enable seamless legacy app migration to the Ionic framework, keeping applications updated with the latest mobile app standards.",
      },
      {
        name: "Ionic Enterprise Apps",
        body: "Utilizing the most recent technologies, our offshore Ionic developers develop engaging, user-centric, and fluid enterprise-grade applications.",
      },
      {
        name: "Cross-platform/Hybrid App Development",
        body: "Our developers ensure a smooth user experience across iOS and Android platforms by crafting cross-platform apps using Ionic.",
      },
      {
        name: "Support & Maintenance",
        body: "Our dedicated Ionic development team provides on-demand support and maintenance, efficiently resolving any app-related issues.",
      },
    ],
  },

  midCta: {
    title: "Searching for Dedicated Ionic App Developers?",
    body: "Access offshore Ionic developers in india who work remotely with you. Contact us to view ratecard.",
    cta: { label: "Request Rate Card", href: "#enquiry" },
  },

  techStack: {
    eyebrow: "Technology",
    title: "Make the Most of Our Ionic Developers' Technical Proficiency",
    body: "Our Ionic developers are well-versed in the following technologies:",
    groups: [
      { name: "Web Technologies", items: ["Angular", "React.js", "Vue.js", "JQuery", "Javascript"] },
      {
        name: "Ionic UI Components",
        items: [
          "Alert",
          "Badge",
          "Button",
          "Card",
          "Chip",
          "Content",
          "Floating Action Button",
          "Checkbox",
        ],
      },
      { name: "Ionic Plugin", items: ["iOS UIWebView", "Android WebView"] },
      {
        name: "IDEs",
        items: ["Android Studio", "XCode", "Visual Studio Code + Ionic Extension Pack", "Atom"],
      },
    ],
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "Why Choose Soft Suave for Hiring Ionic Developers?",
    body: "Get proactive mobile app development strategies with our Ionic experts. Get on-time delivery and guaranteed satisfaction.",
    items: [
      {
        name: "13+ Years of Average Experience",
        body: "Our Ionic developer's years of experience in the field help us deliver custom-made, quality solutions- on time, every time.",
        icon: "book",
      },
      {
        name: "Defined Talent Screening",
        body: "Our developers are carefully selected through an extensive screening process, so we lend only the best talents for your requirements.",
        icon: "users",
      },
      {
        name: "Transparency & Integrity",
        body: "Our agile approach allows for transparency in the development process, helping you to view your app status anytime.",
        icon: "shield",
      },
      {
        name: "Free No-Obligation Quote",
        body: "Talk to us about your ideas, project details, and requirements, and get an immediate price quote for free.",
        icon: "coins",
      },
      {
        name: "Engagement Model Flexibility",
        body: "We understand the need for flexible resource engagements and offer a three-part engagement model: full-time, part-time, and milestone.",
        icon: "gauge",
      },
      {
        name: "Time Zone Flexibility",
        body: "As the time zone difference poses a great challenge, our developers adjust their working hours to work collaboratively with you on projects.",
        icon: "globe",
      },
    ],
  },

  comparison: partnerTable("Choose the Right Ionic Development Partner"),

  process: {
    eyebrow: "Hiring Process",
    title: "Four Simple Steps to Hire an Ionic Developer",
    body: "Onboarding developers has never been easier. With this simple 4-step process, find the resource who is the perfect fit for your team!",
    steps: CURATED_STEPS,
  },

  exploreMore: mobileExplore,

  faq: {
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    body: "Know more about our processes and how we work, with the help of the following FAQs.",
    items: [
      {
        q: "What is the cost of hiring Ionic developers?",
        a: "The cost of hiring an Ionic developer will vary depending on experience. Typical hourly rates range from $15 to $25, but these can vary depending on the specific needs of the business.",
      },
      {
        q: "Do you offer flexible hiring options for Ionic developers?",
        a: "Yes, we offer different hiring models based on your needs. You can choose to hire Ionic developers on a full-time, part-time, or project-based basis depending on the specifics of your project.",
      },
      {
        q: "How do I get started with hiring Ionic developers from your agency?",
        a: "Hiring our developers is pretty simple. Just fill out our form in the Ionic developer page or email us at contact@softsuave.com. Our team will arrange a consultation for your project requirements and offer a free trial to evaluate our developers.",
      },
      {
        q: "What is the experience of your Ionic developers?",
        a: "We have a team of Ionic developers with over 2 to 7 years of experience. Depending on the needs of your project, we will assign a senior or junior Ionic developer to work on your hybrid applications.",
      },
    ],
  },
};

export const mobileHireSkills: readonly HireSkill[] = [
  swift,
  kotlin,
  flutter,
  reactNative,
  ionic,
];
