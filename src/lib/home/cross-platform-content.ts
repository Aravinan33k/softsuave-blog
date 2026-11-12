import type { HeroContent } from '@/components/landing/hero';
import type { OverviewContent } from '@/components/landing/overview';
import type { CardGridContent } from '@/components/landing/industries';
import type { CtaBandContent } from '@/components/landing/cta-band';
import type { FaqContent } from '@/components/landing/faq';
import type { ServiceBoardContent } from '@/components/common/service-board';
import { partnerHeroBadges } from '@/lib/home/hero-badges';
import { sharedHeroAlert } from '@/lib/home/delivery-shared';
import { COUNTRIES_PLUS, SPECIALISTS_PLUS, YEARS_PLUS } from '@/lib/company-figures';

/**
 * /cross-platform-application-development-company — softsuave.com's "Cross-platform App Development
 * Company In India" page, word for word: the hero with its quote form, "What We Do", the four
 * capabilities, the six services, the delivery methods, the offshore-team band, the technology stack
 * and the FAQs. Images are under /images/cross-platform; the technology marks are the repo's own
 * (brand/ad/tech, education-app/tech) where they exist.
 */

export const cpMeta = {
  path: '/cross-platform-application-development-company',
  shortTitle: 'Cross-platform Development Service',
  title: 'Cross platform application development india - Soft Suave',
  description:
    'Cross-platform app development company in India to build cost-effective solutions that work on multiple platforms and help the brand stand out in the market.',
} as const;

export const cpHero: HeroContent = {
  titleLines: ['Cross-platform App Development', 'Company In India'],
  accent: 'Cross-platform App Development',
  titleScale: 'home',
  accentGradient: true,
  body: [
    'Are you in a desperate search for a trustworthy custom cross-platform mobile app development company in India? Soft Suave is your ultimate place to fulfill all your cross platform mobile App development needs.',
    'Want to team up with a reliable cross-platform app development partner? Get in touch for a free quote!',
  ],
  bodyOneLine: [1],
  boldBody: ['cross-platform mobile app development company in India?', 'cross-platform app development partner?'],
  bodyLinks: [{ text: 'for a free quote!', href: '/free-quote' }],
  points: [],
  badges: partnerHeroBadges,
  form: {
    eyebrow: "Let's Discuss Your Project",
    title: 'Get free rough quote in 24 hrs',
    alert: sharedHeroAlert,
    submit: 'Submit',
    sending: 'Sending...',
    requirementLabel: 'Requirement',
    requirementPlaceholder: 'Tell us about your cross-platform requirement.',
    subject: 'Cross-platform App Development enquiry',
  },
};

export const cpOverview: OverviewContent = {
  eyebrow: 'What We Do',
  title: 'Result-driven Cross Platform App Development Solutions',
  paragraphs: [
    'We utilize the flexibility of one-code-fits-all approach offered by multi platform application development to the full potential.',
    'Soft Suave is a renowned cross-platform app development company that caters to the unique needs of the clients using platforms like Flutter, PhoneGap, HTML5, Ionic, and Xamarin to name a few.',
    'The modern mobile market offers several mobile devices with various screen sizes, specifications, and different platforms. Therefore, our mobile App development services ensure unmatched multi-platform Apps that not only fit into all mobile devices and platforms offered in the market but also save time, cost and allow code reusability.',
    `As a top-rated Offshore Cross Platform Mobile Application Development in India with ${YEARS_PLUS} years of experience, we make sure to provide fast & tailored Apps that match your business goals, timeline, and budget.`,
  ],
  links: [{ text: 'mobile App development services', href: '/mobile-application-development-company' }],
  image: {
    src: '/images/cross-platform/overview.webp',
    width: 2276,
    height: 1872,
    alt: 'Cross-platform App Development Company Soft Suave',
    fit: 'contain',
  },
};

export const cpCapabilities: CardGridContent = {
  eyebrow: 'Capabilities',
  title: 'Soft Suave’s Cross Platform App Development Capabilities',
  body: 'When it comes to Cross Platform Native App Development, the following technologies are most preferable. Our team of mobility experts utilizes them to craft Apps with excellent performance and stunning graphic design.',
  links: [
    { text: 'React Native app development', href: '/react-native-app-development-company' },
    { text: 'Xamarin app development', href: '/xamarin-app-development-company' },
    { text: 'Ionic development services', href: '/ionic-app-development-company' },
    { text: 'Flutter app development', href: '/flutter-application-development-company' },
  ],
  items: [
    {
      name: 'React Native',
      body: 'React Native APIs are cross-platform that can work seamlessly on both iOS and Android. This allows us to build memorable mobile experiences through our React Native app development process.',
      href: '/react-native-app-development-company',
    },
    {
      name: 'Xamarin',
      body: 'Xamarin offers great performance, maintainability, and user experience when developing cross platform Apps. With Xamarin app development, we help businesses to increase their customer outreach.',
      href: '/xamarin-app-development-company',
    },
    {
      name: 'Ionic',
      body: 'We employ this complete open-source SDK to provide cross-platform Ionic development services that help our clients to meet the needs of their business, industry, and users.',
      href: '/ionic-app-development-company',
    },
    {
      name: 'Flutter',
      body: 'Flutter uses Dart and a collection of native widgets to build cross-platform mobile Apps for Android and iOS. Hire developers who can work with any complex Flutter app development projects.',
      href: '/flutter-application-development-company',
    },
  ],
};

export const cpServices: ServiceBoardContent = {
  eyebrow: 'What We Offer',
  title: 'Range of Cross Platform App Development Services We Offer',
  body: 'By delivering the best cross-platform app development services, Soft Suave has helped numerous startups and SMBs to open new business opportunities.',
  cta: { label: 'Talk To Experts', href: '/free-quote' },
  items: [
    {
      name: 'Flutter Development Service',
      mark: { src: '/brand/ad/tech/flutter.webp', alt: 'Flutter' },
      paragraphs: [
        'Build aesthetic, natively compiled apps for cross-platforms with Flutter. Our Flutter development services help you create high-performance apps that offer smooth, interactive experiences, ensuring consistency across all platforms.',
      ],
      href: '/flutter-application-development-company',
    },
    {
      name: 'React Native Development Service',
      mark: { src: '/brand/ad/tech/react.webp', alt: 'React' },
      link: false,
      paragraphs: [
        'Developing cross platform Apps refers to the creation of software Apps that are compatible with multiple mobile operating systems. Soft Suave uses powerful technologies like React Native, Xamarin, and Flutter for sleek development. We have dedicated cross platform specialists for each technology.',
      ],
    },
    {
      name: 'Ionic Development Service',
      mark: { src: '/brand/ad/tech/ionic.webp', alt: 'Ionic' },
      paragraphs: [
        'Bring your app vision to life with Ionic’s powerful hybrid framework. Our Ionic development services deliver visually stunning apps that work effortlessly across platforms, combining the speed of native apps with the flexibility of web technologies.',
      ],
      href: '/ionic-app-development-company',
    },
    {
      name: 'Xamarin Development Service',
      mark: { src: '/brand/ad/tech/xamarin-seeklogo.webp', alt: 'Xamarin' },
      paragraphs: [
        'Develop powerful, cross-platform apps with Xamarin. We use this robust framework to deliver high-quality apps that run on iOS, Android, and Windows, reducing costs and development time while maintaining a native-like performance and user experience.',
      ],
      href: '/xamarin-app-development-company',
    },
    {
      name: 'Kotlin App Development Service',
      mark: { src: '/brand/ad/tech/kotlinlang-icon.webp', alt: 'Kotlin' },
      link: false,
      paragraphs: [
        'Harness the full potential of Kotlin for cross-platform app development. We create robust, modern, and scalable cross-platform apps that run smoothly, with the added benefit of seamless integration, advanced features, and excellent code efficiency.',
      ],
    },
    {
      name: 'Java Development Service',
      mark: { src: '/brand/ad/tech/java.webp', alt: 'Java' },
      paragraphs: [
        'Build scalable, secure, and high-performance cross-platform apps with Java. Our Java development services ensure reliable, cross-platform apps that meet the unique needs of your business while delivering excellent performance and user experience.',
      ],
      href: '/java-application-development-company',
    },
  ],
};

export const cpDelivery: CardGridContent = {
  eyebrow: 'Delivery Method',
  title: 'Flexible Solutions for Every Need',
  body: 'Accelerate your digital journey with flexible delivery methods from Soft Suave. We align with your business goals, ensuring seamless collaboration, faster delivery, and scalable solutions tailored for long-term success.',
  items: [
    {
      name: 'Offshore Software Development Service',
      body: 'Build powerful systems with our offshore development team, skilled in diverse technology stacks.',
      href: '/offshore-software-development-company',
    },
    {
      name: 'Software Development Outsourcing Service',
      body: 'Streamline your projects with our outsourcing services that provide top-tier, cutting-edge solutions.',
    },
    {
      name: 'IT Staff Augmentation Service',
      body: 'Boost your in-house capabilities with expert professionals through our efficient staff augmentation services.',
      href: '/it-staff-augmentation-services',
    },
    {
      name: 'Hire Dedicated Developers Team',
      body: 'Accelerate project delivery by hiring dedicated developers, offering expert solutions tailored to your needs',
      href: '/hire-dedicated-developers',
    },
  ],
};

export const cpOffshore: CtaBandContent = {
  title: 'Hire an Offshore Development Team',
  body: 'Soft Suave has a pool of Dedicated Cross Platform Developers who deliver your app development project on time and under your budget.',
  cta: { label: 'Hire Cross Platform Developer', href: '/hire-mobile-app-developers' },
};

/** The marks the repo already has, and three of the live page's own. */
const AD = '/brand/ad/tech';
const EDU = '/images/education-app/tech';
const OWN = '/images/cross-platform/tech';

export interface CpTechItem {
  readonly name: string;
  readonly body: string;
  readonly logo: { readonly src: string; readonly alt: string };
}

export const cpTech = {
  eyebrow: 'Technology Stack',
  title: 'Top Most Technologies We Use For Cross-platform Development',
  body: 'Having a strong team of developers to create, build, test, and launch highly interactive Apps.',
  groups: [
    {
      name: 'Frameworks',
      items: [
        { name: 'Flutter', logo: { src: `${AD}/flutter.webp`, alt: 'Flutter' }, body: 'Flutter is a prominent App development framework with a great many useful features like hot reload, own rendering engine, increased time-to-market speed, and simple platform-specific logic implementation.' },
        { name: 'React Native', logo: { src: `${AD}/react.webp`, alt: 'React Native' }, body: 'Being a powerful UI software framework, React Native offers us vast native plugins, powerful yet simple CLI, and great testing speed that helps us a lot to create Apps in a cost-effective way.' },
        { name: 'Native Script', logo: { src: `${AD}/vue-9-1.webp`, alt: 'Native Script' }, body: 'We have experienced App development professionals who can build NativeScript Apps using JavaScript. This framework supports Angular and Vue and can be installed using the package manager npm.' },
        { name: 'Ionic', logo: { src: `${AD}/ionic.webp`, alt: 'Ionic' }, body: 'Ionic is an open-source SDK that has the power to develop amazing cross-platform mobile, web, and desktop Apps with one shared codebase. Plus, it is flexible and can build high-end user interfaces with added functionalities.' },
        { name: 'Xamarin', logo: { src: `${AD}/xamarin-seeklogo.webp`, alt: 'Xamarin' }, body: 'Are you looking to develop a powerful App customized for your business? Then Xamarin is the right technology as it can create 100% fully native Apps that can run on iOS, Android, Mac, and Windows devices.' },
      ],
    },
    {
      name: 'Database',
      items: [
        { name: 'MySql', logo: { src: `${EDU}/mysql-icon.svg`, alt: 'MySql' }, body: 'Developers at Soft Suave prefer MySQL as the first choice of database management system for App development when it comes to automating data retrieval. Besides, Mysql is known for its greater scalability, reliability.' },
        { name: 'MongoDB', logo: { src: `${AD}/mongodb-svgrepo.webp`, alt: 'MongoDB' }, body: 'MongoDB is a highly scalable database that is used as the backend data store of many giant firms like IBM, Twitter, Facebook, Google, etc. We use it for App development for its reliability and speed.' },
        { name: 'PostgreSQL', logo: { src: `${EDU}/postgresql-icon.svg`, alt: 'PostgreSQL' }, body: 'Using Postgresql, we tackle complex queries and large amounts of data during the App development process. Moreover, Postgresql is one of the best tools designed with flexibility and compatibility.' },
        { name: 'AWS DynomoDB', logo: { src: `${EDU}/dynamo.svg`, alt: 'AWS DynomoDB' }, body: 'Being an Amazon Web Services database system, DynamoDB supports data structures and key-valued cloud services. Plus, its other benefits are auto-scaling, in-memory caching, and backup.' },
        { name: 'SQLite', logo: { src: `${OWN}/sqlite.webp`, alt: 'SQLite' }, body: 'SQLite is an open-source database to add, update, read, and delete data. It supports all the relational database features. Plus, it is a server-less database and is self-contained.' },
        { name: 'Cloud Firestore', logo: { src: '/brand/ad/stack/firebase.webp', alt: 'Cloud Firestore' }, body: 'Cloud Firestore is a cloud or serverless solution. It is an integrated solution of Firebase from Google and Google Cloud Platform. Our expertise in this tool allows us to turn App development simple.' },
        { name: 'Oracle', logo: { src: `${OWN}/oracle.webp`, alt: 'Oracle' }, body: 'Oracle is a multi-model relational database management system that provides cost-effective solutions for ReactJS App development. Its database comes in five different editions - Standard Edition One, Standard Edition, Enterprise Edition, Express Edition, Personal Edition.' },
        { name: 'MS SQL Server', logo: { src: `${AD}/microsoft-sql-server.webp`, alt: 'MS SQL Server' }, body: 'Microsoft SQL Server is a relational database management system. It is built on top of SQL and supports a wide variety of transaction processing, business intelligence, and analytics.' },
      ],
    },
    {
      name: 'Clouds',
      items: [
        { name: 'AWS', logo: { src: `${AD}/aws.webp`, alt: 'AWS' }, body: 'AWS is a remarkable development platform that renders an end-to-end solution to develop, deliver, test, and monitor applications. Our software engineers utilize its broad set of tools and services to support workflows.' },
        { name: 'Azure', logo: { src: `${AD}/azure.webp`, alt: 'Azure' }, body: 'Being a public cloud computing platform, Azure provides authentication, data query, offline synchronization, and push registration capabilities while developing mobile Apps using resources in the Azure cloud.' },
        { name: 'GoogleCloud', logo: { src: `${AD}/google-cloud.webp`, alt: 'GoogleCloud' }, body: 'To help startups and SMBs, we implement Google Cloud Platform to get the benefits of Cost-efficiency, Exemplary safety, and Fast deployment while we create mobile Apps. Also, Google Cloud is one of the most versatile and affordable Cloud platforms out there.' },
        { name: 'Rackspace', logo: { src: `${OWN}/rackspace-logo.webp`, alt: 'Rackspace' }, body: 'With the help of Rackspace, our App developers easily manage private and public cloud deployments. Hence, we can develop powerful Apps with enhanced flexibility.' },
      ],
    },
  ],
} as const;

export const cpFaqs: FaqContent = {
  eyebrow: 'Ask Us',
  title: 'Frequently Asked Questions',
  body: 'Learn more about our procedures & methods with the help of these FAQs.',
  items: [
    {
      q: 'How to find the best cross platform App development company in India?',
      a: [
        'To ensure you team up with the Cross-platform App Development Company in India, look at whether they have these attributes.',
        `We are the suitable company you're looking for! Soft Suave's been in the App development market for more than ${YEARS_PLUS} years and has ${SPECIALISTS_PLUS} talented developers. Moreover, we have clients in more than ${COUNTRIES_PLUS} countries. Talk with our project managers and start your project in an instant.`,
      ],
      points: [
        'More than 5 years of industry experience',
        'Have a strong team with relevant experience',
        'Follow the agile development process',
        `Operates in more than ${COUNTRIES_PLUS} countries`,
        'Provide post-deployment services',
      ],
      pointsAfter: 0,
    },
    {
      q: 'Why should I hire Soft Suave for cross platform development services?',
      a: `We've been providing world-class cross platform development services for ${YEARS_PLUS} years and turn business ideas into an App. We have hands-on experience in various business domains that helps us to develop customized, high-performance, interactive and scalable Apps.`,
    },
    {
      q: 'Can you sign a Non-disclosure agreement (NDA) for my project?',
      a: 'Yes, as a trusted cross platform mobile App development company, we sign the NDA before commencing the project. It\'s a mandatory procedure we follow to ensure confidentiality.',
    },
    {
      q: 'What are your hiring models for cross platform App development?',
      a: 'We offer Cross-Platform Mobile App development solutions through three startup-friendly hiring models.',
      points: ['Fixed cost', 'Full time', 'Hourly'],
    },
    {
      q: 'For developing cross platform Apps, what technologies do you use?',
      a: 'We use React Native, Flutter, Xamarin, and Ionic for the best cross platform App development services. We have dedicated developers for each technology with a minimum of 5 years of experience.',
    },
    {
      q: 'How do you provide cost-effective Multi Platform application development services?',
      a: 'Before the commencement of the project, our highly experienced multi platform application development team carefully analyzes it and helps you choose a suitable hiring model. Then, we utilize the industry\'s best technology, development practices, methodologies, testing methods to develop App in quick turnover time with a motive to reduce cost.',
    },
  ],
};
