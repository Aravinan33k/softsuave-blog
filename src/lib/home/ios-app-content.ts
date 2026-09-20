/**
 * Copy for the "iOS App Development" landing page
 * (`/ios-application-development-company`).
 *
 * Every heading, paragraph and list item below is the live page's own copy,
 * extracted verbatim from
 * https://www.softsuave.com/ios-application-development-company with the
 * Playwright MCP browser — the rendered DOM read block by block, so a sentence
 * split across its own inline markup arrives whole. The design and the motion
 * are this surface's; the words are not ours to reword.
 *
 * THE LIVE PAGE HAS TWO COPY BUGS, reproduced here rather than silently
 * corrected — see `iosBenefits.body` and `iosWhyUs.body`, which talk about
 * ANGULAR and WEB APPLICATIONS on an iOS page. They are flagged in the
 * handover; fixing them is a content decision, not ours.
 *
 * Unlike the Android page, this one has no separate kicker labels — its
 * coloured `span.text-primary` is the tail of each H2 ("…Services **We
 * Offer**"), not a label above it. The `eyebrow` values here are therefore
 * OURS: short navigational labels, because this surface's `SectionHead` is
 * built around one.
 *
 * Images are hand-placed assets under `/public/images/landing/ios/`, chosen
 * from Pexels and cropped to slot; see that folder's `credits.json` for the
 * source of each.
 */

import { partnerHeroBadges } from "./hero-badges";
import type { HeroContent } from "@/components/landing/hero";
import type { SpringboardContent } from "@/components/ios-app/springboard";
import type { CardGridContent } from "@/components/landing/industries";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { StoryCardsContent } from "@/components/common/story-cards";
import type { FaqContent } from "@/components/landing/faq";

export const iosMeta = {
  slug: "ios-application-development-company",
  path: "/ios-application-development-company",
  /**
   * The live `<title>` is "IOS App Development Company in India - Soft Suave".
   * The route appends " | Soft Suave" as every page on this surface does, so
   * the brand is dropped here rather than shipped twice.
   */
  title: "iOS App Development Company in India",
  description:
    "Leading iOS app development company in India offering end-to-end solutions for startups and enterprises with innovative, next-gen mobile apps.",
} as const;

export const iosHero: HeroContent = {
  // The H1, split so the last line takes the coral accent.
  titleLines: ["iOS App", "Development Services"],
  body: [
    "As a top-tier iOS app development company in India, Soft Suave has successfully delivered over 120+ iOS apps. Our iOS developers specialize in using Swift and SwiftUI to build robust and scalable applications for all iOS devices. Whether you need an MVP or a custom application, we offer complete end-to-end iOS app development services to fulfill your requirements.",
  ],
  points: [
    "Save 60% on Development Costs",
    "NDA Adherence To Ensure Project Privacy",
    "On-Time Project Delivery Commitment",
  ],
  // The four trust badges the live page shows beside its closing form.
  badges: partnerHeroBadges,
  form: {
    // The live page's own form heading and sub-line.
    eyebrow: "Let’s Discuss Your Project",
    title: "Get free rough quote in 24 hrs",
    note: "Tell us which Apple platforms the app has to reach — iPhone, iPad, Watch, TV — and we come back with an approach, timeline, and estimate. Everything stays under NDA.",
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "The app you have in mind, the Apple platforms it must run on, whether this is an MVP or a full build, and any existing app or designs you already hold.",
    subject: "iOS App Development enquiry",
  },
  image: {
    src: "/images/landing/ios/hero.webp",
    width: 1920,
    height: 1200,
    alt: "A smartphone resting on a dark surface, an application open on its screen",
  },
};

/**
 * Six services, rendered as the springboard (landing/springboard.tsx): each
 * one on a rounded square tile, laid out like apps on an iOS home screen and
 * popping in on a spring. The page sells work across iPhone, Watch and TV, so
 * the section is built from the interface all three share.
 */
export const iosServices: SpringboardContent = {
  eyebrow: "Services",
  title: "iOS Application Development Services We Offer",
  body: "SoftSuave's team of iPhone app experts uses the latest tools to build awesome iPhone apps. Here are the iPhone app development services we offer:",
  items: [
    {
      name: "Custom iOS App Development",
      body: "Utilize the expertise of iOS programmers skilled in managing multi-thread environments and building advanced algorithms for your custom app. Our innovative solutions tailored to your needs give you an edge over your competitors.",
      image: { src: "/images/landing/ios/svc-custom.webp", alt: "" },
    },
    {
      name: "iOS UI/UX Design",
      body: "iOS applications are known for their captivating and immersive designs. As a leading iOS development agency, we ensure your brand aligns easily with the Apple ecosystem. Our team of iOS app designers specializes in crafting user experiences that leave a lasting impact.",
      image: { src: "/images/landing/ios/svc-design.webp", alt: "" },
    },
    {
      name: "iWatch App Development",
      body: "Craft unique WatchOS apps with customizable in-app purchases, tailored to diverse needs and boosting iWatch usability to new heights. Our innovation shapes the future of wearable technology, ensuring seamless integration and enhanced user experience.",
      image: { src: "/images/landing/ios/svc-watch.webp", alt: "" },
    },
    {
      name: "Apple TV App Development",
      body: "Let our team craft a customized tvOS app, revealing unique features unavailable in standard mobile apps, tailored precisely to your requirements for an enhanced user experience like no other. Improve your brand's presence on the big screen with our innovative solutions.",
      image: { src: "/images/landing/ios/svc-tv.webp", alt: "" },
    },
    {
      name: "iOS App Migration",
      body: "Looking to transition your cross-platform build to native with Swift or vice versa? Our iOS app developers can expertly manage your app migration, ensuring high quality and performance throughout the process. We handle every aspect from initial planning to final deployment process",
      image: { src: "/images/landing/ios/svc-migration.webp", alt: "" },
    },
    {
      name: "Dedicated iOS Team",
      body: "Our exclusive iOS development team excels in contemporary trends. From concept to execution, our skilled developers ensure smooth integration and peak performance across diverse global markets. Partner with our Dedicated iOS developers to create high-performing mobile apps for various industries.",
      image: { src: "/images/landing/ios/svc-team.webp", alt: "" },
    },
  ],
};

/** Four technology themes, with the section's own three bullets above them. */
export const iosTech: CardGridContent = {
  eyebrow: "Innovation",
  title: "Optimizing iOS Apps With The Latest Innovative Technologies",
  body: "We recognize the core challenges of iOS mobile app development. As a leading offshore iOS development company in India, our deep industry expertise enables us to use advanced technologies, simplify processes, speed up growth, and transform your app vision into reality.",
  points: [
    "Build high-performance iOS apps that utilize the full potential of iOS and iPad",
    "A pre-built starter kit gets you to code your iOS app quicker",
    "Spend more time crafting the features that make your app truly unique",
  ],
  items: [
    {
      name: "IOT",
      body: "At Soft Suave, we utilize IoT technology to integrate devices, sensors, and data analytics with custom iOS apps, enhancing their functionality. Our efficient iOS development services, driven by IoT, facilitate smooth operations, insightful data collection, and informed decision-making through robust big-data analysis.",
    },
    {
      name: "Metaverse",
      body: "Recognized for our expertise in iOS app development services, we specialize in building engaging virtual worlds, helping your app make a mark in a competitive landscape through innovative metaverse iOS app development. Our team can help your app stand out by incorporating innovative Metaverse features.",
    },
    {
      name: "Cloud",
      body: "As a top iOS app development company in India, we offer cloud-based solutions designed for scalability. Cloud solutions remove the need for large initial infrastructure investments, enabling the smooth scalability of your app along with your business growth.",
    },
    {
      name: "AR/VR",
      body: "With Soft Suave's skilled iOS app developers, you'll benefit from our expertise in crafting immersive solutions utilizing Augmented Reality (AR) and Virtual Reality (VR) technologies. With it, we can improve brand visibility, and provide valuable resources to launch your business forward.",
    },
  ],
};

/** The band that carries the live page's three counters. */
export const iosLaunchCta: CtaBandContent = {
  title: "Ready to launch your brand on the most popular iOS platform?",
  body: "Work with us for high-quality iOS app development services. Let’s create exceptional apps that redefine user experiences, set benchmarks, and give your mission the edge it needs.",
  cta: { label: "Talk to an iOS expert", href: "#enquiry" },
  stats: [
    { figure: "1250+", label: "Projects" },
    { figure: "13+", label: "Year of Experience" },
    { figure: "150+", label: "Clients Globally" },
  ],
};

export const iosBenefits: CardGridContent = {
  eyebrow: "Benefits",
  title: "Benefits Of Developing An iOS App For Your Business",
  // VERBATIM, INCLUDING THE BUG: the live page says "Angular" here, on an iOS
  // page. Flagged in the handover rather than quietly rewritten.
  body: "Soft Suave offers exceptional Angular development services designed to craft exceptional user experiences. See how we use the power of Angular:",
  items: [
    {
      name: "Maximize Your App Earnings",
      body: "iOS platform apps globally tend to yield superior revenue compared to those on other platforms. This is attributed to factors such as user spending behavior, the robustness of the App Store ecosystem, and the popularity of iOS devices in key markets.",
    },
    {
      name: "Enterprise Data Security",
      body: "iOS app development services emphasize enterprise data security, enabling businesses to securely transmit and store valuable data assets. This ensures robust protection against unauthorized access and breaches, safeguarding sensitive information effectively.",
    },
    {
      name: "Simplified Development Process",
      body: "Partnering with an app development company simplifies iOS app creation, and allows businesses to focus on more important activities. This collaboration simplifies processes, ensuring efficient resource allocation and improving productivity.",
    },
    {
      name: "iOS Gaming App Development",
      body: "Experience Soft Suave’s iPad and iPhone app development services, featuring specialized gaming app development. With years of expertise, we create captivating gaming experiences tailored to your vision. Improve your gaming experience with our commitment to excellence.",
    },
    {
      name: "Exceptional Quality Assurance",
      body: "iOS applications are of exceptional quality standards when crafted by a trusted iOS app development company in India, getting widespread acclaim from users. This ensures smooth functionality and user satisfaction, allowing long-term engagement and loyalty.",
    },
    {
      name: "Trusted Customer Base",
      body: "The iOS ecosystem, closely associated with iOS development, maintains a large user base, confirming its status as the world's second most popular mobile platform. This large user community shows its broad acceptance and lasting popularity, strengthening its global reputation.",
    },
  ],
};

export const iosWhyUs: CardGridContent = {
  eyebrow: "Why Soft Suave",
  title: "Why Choose Soft Suave As Your iOS Mobile App Development Company?",
  // VERBATIM, INCLUDING THE BUG: "web applications" on an iOS page.
  body: "Empower your web applications with Soft Suave's expert iOS app development services. Here's why you should choose us:",
  items: [
    {
      name: "Robust Project Management",
      body: "Delegate your development challenges to a dedicated project manager, your sole point of contact throughout the entire product development journey. Benefit from streamlined communication, expert guidance, and efficient coordination, ensuring a smooth and successful project execution from start to finish.",
    },
    {
      name: "Flexible Engagement",
      body: "Maximize your organizational potential with our versatile engagement models, meticulously crafted to evolve alongside your dynamic requirements and project specifications. Whether you seek scalability, agility, or tailored solutions, our flexible frameworks ensure optimal alignment with your evolving business objectives.",
    },
    {
      name: "Less Time-to-market",
      body: "Stay ahead of delivery expectations with our iterative and incremental development methodology, ensuring optimal results with each project phase. Our iOS app development service emphasizes continuous improvement, allowing for greater flexibility and responsiveness to evolving project needs to meet your requirements.",
    },
  ],
};

/** The live page's "Need Dedicated iOS Developers?" band. */
export const iosDevelopersCta: CtaBandContent = {
  title: "Need Dedicated iOS Developers?",
  body: "Soft Suave has a pool of dedicated iOS Developers who deliver your app development project on time and under your budget.",
  cta: { label: "Hire iOS Developer", href: "#enquiry" },
};

export const iosStories: StoryCardsContent = {
  eyebrow: "Success Stories",
  title: "Success Stories",
  body: "Learn how we transformed business operations across various industries with cutting-edge solutions and tailored them to their unique requirements.",
  items: [
    {
      industry: "Healthcare",
      name: "Cloud-based Secured Communication App for Patient Care",
      body: "Soft Suave developed a cross-platform healthcare app that simplifies doctor-patient communication and helps during emergency situations. The app made Professionals and patients interact online using the latest technology, offering quality, safety, and reliability.",
    },
    {
      industry: "eCommerce",
      name: "Personalized One-Stop Solution for eCommerce Industry",
      body: "Soft Suave created an app to satisfy multiple needs to seamlessly give effective eCommerce solutions to customers. Specifically, the client wanted mobile applications that would enable customers to make fast decisions and lead them to make a purchase.",
    },
    {
      industry: "Consulting",
      name: "Effective Tool to track the Jobs or Projects for the Customers",
      body: "A standout job tracking solution app made by Soft Suave to ease the complex processes, for the customers to use and track the individual projects and Jobs more flexibly.",
    },
  ],
};

export const iosFaqs: FaqContent = {
  eyebrow: "Questions",
  title: "Frequently Asked Questions",
  body: "Know more about our processes and how we work, with the help of the following FAQs.",
  items: [
    {
      q: "What are the benefits of outsourcing iOS App Development?",
      a: "Outsource your iPhone app with Soft Suave for expert developers, cost-efficiency, and focus on your core business. We'll handle the development, you handle the success.",
    },
    {
      q: "How do I track my app's progress?",
      a: "Soft Suave provides regular progress updates through meetings and reports. You'll also have a dedicated point of contact, who keeps you informed every step of the way.",
    },
    {
      q: "Will I own the app and its code?",
      a: "Absolutely. Soft Suave prioritizes intellectual property rights. You'll retain full ownership of your app and its code, giving you complete control over your creation.",
    },
    {
      q: "Can you help me migrate the web/android applications to iOS applications?",
      a: "Soft Suave can utilize our expertise to migrate your existing web or Android app to iOS. We'll ensure a smooth transition and optimized user experience for the Apple platform.",
    },
    {
      q: "Can I use my existing app designs?",
      a: "Yes, we smoothly integrate your designs into the development process, ensuring your app maintains the look and feel you imagined.",
    },
    {
      q: "Does Soft Suave guarantee app idea confidentiality?",
      a: "Yes. Client confidentiality is a top priority. We have strict NDAs in place to protect your intellectual property, giving you peace of mind.",
    },
    {
      q: "Will Soft Suave help submit my app to the App Store?",
      a: "Yes, Soft Suave can guide you through the App Store submission process and handle the technical aspects with your approval, ensuring a smooth launch.",
    },
    {
      q: "Does Soft Suave offer post-launch support?",
      a: "Yes, we offer ongoing maintenance plans to ensure your app functions smoothly after launch, including bug fixes, security updates, and compatibility updates to keep your app running flawlessly.",
    },
    {
      q: "Can I develop iOS applications on Windows, and is it recommended?",
      a: "While it's technically possible to develop iOS applications on Windows using cross-platform tools or virtualization, it is generally not recommended due to significant limitations and challenges.",
    },
    {
      q: "How can I integrate Zoom meetings into an iOS app using the Zoom SDK?",
      a: "Integrating Zoom meetings into your iOS application can enhance its functionality by enabling seamless virtual communication.",
    },
    {
      q: "What are the common mistakes to avoid in iOS development to ensure project success?",
      a: "Successful iOS development involves steering clear of several critical pitfalls. Avoid common mistakes in iOS development and learn proper user interface design, effective memory management, thorough testing, and more, to help you navigate the development process smoothly.",
    },
  ],
};
