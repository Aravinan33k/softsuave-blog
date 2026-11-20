import type { HeroContent } from '@/components/landing/hero';
import type { FaqContent } from '@/components/landing/faq';
import type { ServiceBoardContent } from '@/components/common/service-board';
import { sharedHeroAlert } from '@/lib/home/delivery-shared';

/**
 * /swift-app-development-company — softsuave.com's "Best-in-Class Swift App Development Services in India" page,
 * word for word: the hero with its quote form, the client logos, "Who We Are", the five-part expertise, the
 * dedicated-developers band, the technology stack, "We Work For", "Why Choose Soft Suave?", the six FAQs and the
 * closing consultation form (the site's own, which already reads as the live one does). Images are under
 * /images/swift; the "Why Choose" picture is the one the low-code page already carries. The page names no trial or
 * duration, so there is no figure to correct to 40 hours. Live's typos ("Developement", "Angular development" in the
 * expertise standfirst, "web app" in the why-choose copy) are kept as written.
 */

export const swiftMeta = {
  path: '/swift-app-development-company',
  shortTitle: 'Swift App Development',
  title: 'Best-in-Class Swift App Development Services in India',
  description:
    'Looking for a top Swift app development company in India? Look no further than Soft Suave! We offer reliable and high-quality app development services.',
} as const;

const IMG = '/images/swift';

export const swiftHero: HeroContent = {
  titleLines: ['Top Swift App Development', 'Company in India'],
  accent: 'Swift App Development',
  titleScale: 'home',
  accentGradient: true,
  body: [
    'Soft Suave provides all the swift app development services you need to achieve your business goals.',
    'Looking For Swift app development? Get in touch for a free quote!',
  ],
  bodyLinks: [{ text: 'for a free quote!', href: '/free-quote' }],
  points: [],
  form: {
    eyebrow: "Let's Discuss Your Project",
    title: 'Get free rough quote in 24 hrs',
    alert: sharedHeroAlert,
    submit: 'Submit',
    sending: 'Sending...',
    requirementLabel: 'How Can We Help(Requirement)',
    requirementPlaceholder: 'How Can We Help(Requirement)',
    subject: 'Best-in-Class Swift App Development Services in India',
  },
};

/** The eight client logos under the hero, in the live order, from the roster the site already carries. Names are the live alt texts. */
export const swiftLogos = [
  { name: 'ducnot', src: '/brand/clients/ducont.webp' },
  { name: 'netsmartz', src: '/brand/clients/netsmartz.webp' },
  { name: 'pacewisom', src: '/brand/clients/pacewisdom.webp' },
  { name: 'teamicate', src: '/brand/clients/teamicate.webp' },
  { name: 'outsource consultant', src: '/brand/clients/outsource.webp' },
  { name: 'mcbird', src: '/brand/clients/mcbird.webp' },
  { name: 'mclaren', src: '/brand/clients/mclaren-strategic-ventures.webp' },
  { name: 'poorvika', src: '/brand/clients/poorvika.webp' },
];

export type Piece = string | { readonly text: string; readonly href: string };

export const swiftAbout = {
  kicker: 'Who We Are',
  title: 'Swift App Development Company for Best Native iOS Apps in India',
  paragraphs: [
    [
      'Soft Suave is a leading Swift app development company based in India. With years of experience in the industry, our team of ',
      { text: 'skilled swift developers', href: '/hire-swift-developers' },
      ' has the expertise to create high-quality, user-friendly Swift apps that cater to the unique needs of our clients.',
    ],
    [
      'We offer custom various Swift app development services, including app design, development, testing, and maintenance in this ',
      { text: 'iOS app development service', href: '/ios-application-development-company' },
      ' Our team works closely with our clients to understand their business goals and objectives, and we tailor our solutions to meet their specific requirements.',
    ],
    [
      'At Soft Suave, we use the latest tools and technologies to ensure that our Swift apps are fast, reliable, and secure. We also follow industry best practices to ensure our apps comply with the latest standards and regulations. Whether you need a simple Swift app or a complex, multi-platform solution, Soft Suave can help. Contact us today to learn more about our Swift app development services and how we can help your business succeed in the digital age.',
    ],
  ] as readonly (readonly Piece[])[],
  image: { src: `${IMG}/swift-page-new.webp`, width: 600, height: 569, alt: 'swift app development company, soft suave.' },
  backdrop: { src: `${IMG}/banner-3.png`, width: 372, height: 732 },
} as const;

export const swiftExpertise: ServiceBoardContent = {
  eyebrow: '',
  title: 'The Expertise Of Our Swift App Development',
  body: 'We have mastered Swift App Developement for over a decade and keeping up with the newest technologies, our Angular development stands out among the most.',
  links: [
    { text: 'experienced mobile app developers', href: '/hire-mobile-app-developers' },
    { text: 'build custom iOS apps', href: '/ios-application-development-company' },
    { text: 'experienced swift developers', href: '/hire-swift-developers' },
    { text: 'dedicated developers', href: '/hire-swift-developers' },
  ],
  items: [
    {
      name: 'Swift app development',
      paragraphs: [
        'We develop high-quality, scalable, and innovative Swift apps that cater to the needs of our clients. We use the latest development tools and frameworks to create robust and efficient apps. Our team of experienced mobile app developers are experts in the Swift language, having worked on countless projects.',
        'We ensure that our apps are secure, reliable, and optimized for performance. We strive to create the best possible apps for our customers.',
      ],
    },
    {
      name: 'Custom swift app development service',
      paragraphs: [
        'Our team of developers can build custom iOS apps to meet your unique business needs. We take a collaborative approach to understand your requirements and develop solutions that meet your specific needs.',
        'We use the latest technologies and best practices to build high-performance apps that are tailored to the needs of your business. Our team of experts can help you test and deploy your app quickly and efficiently, so you can get it to the market faster.',
      ],
    },
    {
      name: 'UI/UX design',
      paragraphs: [
        'We have a team of talented designers who create intuitive and visually appealing interfaces for our Swift apps. Our designs are optimized for usability and ensure a great user experience. We also keep up to date with the latest trends in design to ensure our apps stay relevant.',
        'Our team constantly tests and refines our designs to ensure the best possible user experience Our team is also involved in the development process to ensure the design is implemented correctly and efficiently We are committed to creating user-friendly, visually appealing, and enjoyable designs.',
      ],
    },
    {
      name: 'App migration',
      paragraphs: [
        'We can help you migrate your existing app to Swift, ensuring a smooth transition with minimal disruption to your business. Our team of experienced swift developers can help you take advantage of the latest features from iOS and Swift and ensure your app is running optimally. We can also help you future-proof your app and stay ahead of the competition.',
        'We have extensive experience in app migration and can guarantee the quality of our work. Our team is available to answer any questions you have and provide guidance throughout the process.',
      ],
    },
    {
      name: 'App maintenance and support',
      paragraphs: [
        "Our team provides ongoing maintenance and support for your Swift app, ensuring that it remains up-to-date and performs optimally. We also monitor the app's performance and usage and provide feedback and suggestions for improvement. Our team is available 24/7 to provide help and technical support. We guarantee quick and efficient solutions to any issues related to the app.",
        'We also offer feature updates and customization as well as security testing and bug fixes to ensure that your app remains secure and reliable. Our team of dedicated developers is dedicated to providing the highest quality service.',
      ],
    },
  ],
};

export const swiftHire = {
  title: 'Need Dedicated Swift App Developers?',
  body: 'With the help of our Swift developers, we can make your swift iOS app development that meets your specifications and exceeds your expectations.',
  cta: { label: 'Hire Swift App Developer', href: '/hire-swift-developers' },
} as const;

export const swiftTech = {
  title: 'Our Software Development Technology Expertise',
  accent: 'Technology Expertise',
  body: 'Technology stacks are the backbone of your architected software. We build your software with the latest and top core technologies.',
  items: [
    { name: 'Xcode', src: `${IMG}/tech/apple_xcode-icon.svg` },
    { name: 'Swift UI', src: `${IMG}/tech/swift.svg` },
    { name: 'Firebase', src: `${IMG}/tech/firebase-icon-new.svg` },
    { name: 'Git', src: `${IMG}/tech/git.svg` },
    { name: 'Test Flight', src: `${IMG}/tech/test-flight.svg` },
    { name: 'Fastlane', src: `${IMG}/tech/fastlane-seeklogo.com.svg` },
  ],
} as const;

export const swiftWorkFor = {
  title: 'We Work For',
  body: 'Our service extends beyond simply developing your application to meet your needs. We leverage swift technology to create secure and reliable applications that stand out from your competitors, making it particularly suitable for enterprises, startups, and SMBs. In addition, we provide ongoing support and maintenance to ensure your application continues to function at its peak.',
  cta: { label: 'Talk to Experts', href: '/free-quote' },
  cards: ['Start Up Business', 'Small & Medium Business', 'Agencies'],
} as const;

export const swiftWhy = {
  title: 'Why Choose Soft Suave?',
  accent: 'Soft Suave?',
  body: 'Create & Contemporize web Applications To Digitally Convert Your Business',
  image: { src: '/images/low-code/why.webp', width: 424, height: 520, alt: 'Why Choose Us' },
  items: [
    { name: 'Client Satisfaction', body: 'We provide web app services more than what you needed for your business and its growth including future planning.' },
    { name: 'Decade of Experience', body: 'Our experience in the field for a decade enlightened us with the high skill in technology, what businesses needed with the market goal achievements.' },
    { name: 'Better Communication', body: 'We understand your requirements and get to know what is good for you, we travel with your business to know more and have frequent conversations, and queries for updates.' },
    { name: 'We Consider Your Ideas And feedbacks', body: 'Throughout the app development process, we get your feedback and ideas to update the web app to how you want it.' },
    {
      name: 'Support Access 24/7',
      body: 'You can contact our web app development team anytime regarding issues and support even after the completion of app development.',
      link: { text: 'web app development team', href: '/hire-web-app-developers' },
    },
  ] as readonly { readonly name: string; readonly body: string; readonly link?: { readonly text: string; readonly href: string } }[],
} as const;

export const swiftFaqs: FaqContent = {
  eyebrow: '',
  title: 'Frequently Asked Questions',
  body: 'Know more about our processes and how we work, with the help of the following FAQs our clients ask.',
  items: [
    { q: 'What is Swift app development?', a: 'Swift app development is the process of creating mobile applications using the Swift programming language developed by Apple. Swift is a fast, powerful, and easy-to-learn programming language that is specifically designed for iOS, macOS, and watchOS platforms.' },
    { q: 'Why should I choose Soft Suave for Swift app development?', a: 'Soft Suave has a team of experienced developers who are well-versed in Swift app development. We use the latest technologies and frameworks to build high-quality, scalable, and user-friendly mobile applications that meet your business needs.' },
    { q: 'How long does it take to develop a Swift app?', a: 'The time it takes to develop a Swift app depends on various factors, such as the complexity of the app, the features and functionalities required, and the level of customization needed. We provide an estimated timeline after understanding your requirements.' },
    { q: 'What is the cost of Swift app development?', a: 'Swift app development company determines cost depending on the scope of the project, the complexity of the app, and the time required to develop the app. We provide a customized quote based on your specific requirements.' },
    { q: 'Do you provide ongoing maintenance and support?', a: 'Yes, we provide ongoing maintenance and support services to ensure that your app runs smoothly and efficiently. We offer different support packages based on your needs.' },
    { q: 'How do I get started with Swift app development?', a: 'You can contact us through our website or send an email to our sales team. We will get in touch with you to discuss your requirements and provide you with a customized quote.' },
  ],
};
