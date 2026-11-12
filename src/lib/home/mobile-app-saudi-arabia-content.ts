/**
 * Copy for `/mobile-app-development-company-saudi-arabia`.
 *
 * Every string is softsuave.com/mobile-app-development-company-saudi-arabia's
 * own, in its own order — headings, paragraphs, cards, steps, technologies,
 * FAQ answers and image alt text — carried across without rewording.
 * Oddities on the live page are kept as published:
 *
 *   - the `<title>` ends with a space;
 *   - "goes beyond any extinct" (hero);
 *   - "don't know anything wisest it Upon enquiring" (no full stop);
 *   - "soft suave creates apps" (Emerging Tech card);
 *   - "Most delinquent technology & tools" (Development checklist);
 *   - the process illustrations' alt text naming re-hosting and
 *     modernization services, and "SoftSuave" in an alt;
 *   - the third FAQ answer ends with a full stop on the page but not in the
 *     live FAQPage JSON-LD ("…useful for users") — both kept as published.
 *
 * Heading levels are the live page's: portfolio titles are H5s and FAQ
 * questions H4s.
 *
 * Rendered by `components/landing/location-app-page.tsx`, the layout every
 * location page shares; what the location pages say identically is in
 * `mobile-app-location-shared.ts`.
 */

import type { HeroContent } from '@/components/generative-ai/hero';
import type { OverviewContent } from '@/components/generative-ai/overview';
import type { FaqContent } from '@/components/generative-ai/faq';
import type { ServicesGridContent } from '@/components/common/services-grid';
import type { CardGridContent } from '@/components/landing/industries';
import type { WorkCarouselContent } from '@/components/home/work-grid';
import type { TechStackContent } from '@/components/landing/tech-stack';
import type { ProcessStepperContent } from '@/components/common/process-stepper';
import type { LocationAppPageContent } from '@/components/landing/location-app-page';
import {
  LOCATION_IMG,
  locationClientLogos,
  locationClose,
  locationHeroForm,
  locationPortfolioImage,
  locationProcessImage,
  locationTechGroups,
  locationTechMarks,
  locationWhoImage,
} from '@/lib/home/mobile-app-location-shared';

export const masaMeta = {
  path: '/mobile-app-development-company-saudi-arabia',
  // The live page's head, verbatim — the <title> ends with a space.
  title: 'Custom Mobile App Development Company in Saudi Arabia, UAE ',
  description:
    'Soft Suave is the top mobile app development company in Saudi Arabia that offers mobile app solutions infused with the latest technology and industry trends.',
  canonical: 'https://www.softsuave.com/mobile-app-development-company-saudi-arabia',
  ogTitle: 'Mobile Application Development Company in Saudi Arabia',
  ogDescription:
    'Soft Suave is the top mobile app development company in Saudi Arabia that offers mobile app solutions infused with the latest technology and industry trends.',
  ogSiteName: 'Soft Suave Technologies',
  ogImage: 'https://www.softsuave.com/assets/images/app-development-company-saudiarabia.png',
  twitterSite: '@softsuave',
} as const;

export const masaHero: HeroContent = {
  titleLines: ['A Reliable Mobile App Development Company in Saudi Arabia'],
  // The live H1 highlights "Saudi Arabia".
  accent: 'Saudi Arabia',
  body: [
    'Soft Suave’s Mobile app development service goes beyond any extinct to prove a universally useful but specifically needed solution for all Saudi Arabian businesses and government needs.',
    'Want to Outsource Mobile App Development Projects? Get in touch for a free quote!',
  ],
  bodyLinks: [{ text: 'for a free quote!', href: '/free-quote' }],
  points: [],
  form: locationHeroForm('Mobile app development enquiry (Saudi Arabia)'),
};

export const masaAbout: OverviewContent = {
  eyebrow: '',
  title: 'A Spiffy Mobile App Development Company',
  paragraphs: [
    'Soft Suave knows what kind of mobile apps are needed for Saudi Arabian citizens. We are experts in creating apps based on regional needs and laws.',
    'Our mobile app development services in Saudi Arabia are equipped with the modern facilities that you need to succeed in a competitive market. To create fully-featured mobile applications, our company employs specialists who are trained to use the latest technologies. We are the best mobile application development company in Saudi Arabia for providing customer-oriented solutions that help businesses grow in the midst of a massive digital transformation.',
    'With many years of experience in the Saudi Arabian market, we know what business people here need to succeed with mobile apps. Our mobile app developers and programmers can create valuable digital products for any business model which would offer a great user experience and seamless performance across all OS platforms including Android & iOS and Cross-platform technologies like React Native, Flutter, and Ionic.',
    'Our unique business-oriented mobile applications have made us one of the top mobile app development companies. Our process starts with ideation, moves into strategy, and ends with UI/UX design and QA testing, all followed by modern programming techniques and pro-technologies.',
  ],
  links: [
    { text: 'mobile app developers', href: '/hire-mobile-app-developers' },
    { text: 'React Native', href: '/react-native-app-development-company' },
    { text: 'Flutter', href: '/flutter-application-development-company' },
    { text: 'Ionic', href: '/ionic-app-development-company' },
  ],
  image: {
    src: `${LOCATION_IMG}/overview-saudi-arabia.webp`,
    width: 469,
    height: 464,
    alt: 'Best mobile app development company in Saudi Arabia',
    fit: 'column',
  },
};

export const masaServices: ServicesGridContent = {
  eyebrow: '',
  title: "Soft Suave's Mobile App Development Service",
  body: 'Keeping up with modern technology trends and inventing new features, our Saudi Arabian app development programmers simplify complex human tasks.',
  // Each live card links a phrase in its text as well as ending on "Know More".
  links: [
    { text: 'iOS apps', href: '/ios-application-development-company' },
    { text: 'android app solution', href: '/android-application-development-company' },
    { text: 'Enterprise Mobility solutions', href: '/mobile-application-development-company' },
  ],
  items: [
    {
      name: 'iOS App Development',
      body: 'Native iOS apps follow Human Interface Guidelines. The apps are built using the latest iOS frameworks. If your audience in Saudi Arabia is iPhone, and iPad users or your service itself focused on Apple service, we can go on with our talented team of iOS developers.',
      href: '/ios-application-development-company',
    },
    {
      name: 'Android App Development',
      body: 'Android apps are developed by our Material Design Guidelines team. Additionally, they are designed using the best Android libraries. We have worked with startups and small businesses in Saudi Arabia that mostly needed an android app solution to make their business reach and get customers.',
      href: '/android-application-development-company',
    },
    {
      name: 'Enterprise Mobile Solutions',
      body: 'We can turn your ideas into working apps that involve the whole process of ideation, launching, marketing, maintaining, and supporting them. Enterprise Mobility solutions help organizations secure the use of mobile devices owned by their employees. It includes services and technologies to manage mobile devices.',
      href: '/mobile-application-development-company',
    },
  ],
};

export const masaWho: CardGridContent = {
  eyebrow: '',
  title: 'Who Do We Work For',
  body: 'Mobile apps developed by our Saudi Arabian app development company are highly advanced and industry-standard. We got the best solutions to work for people’s needs.',
  items: [
    {
      name: 'Startups',
      body: "With strong competition, starting a business in Saudi Arabia is convenient and challenging. To reach out to your target audience digitally and establish your own brand identity faster, it's a good idea to start with our cost-effective but highly effective mobile applications.",
      image: locationWhoImage('who-startups.webp', 'Startup app development company Soft Suave'),
    },
    {
      name: 'Established Companies',
      body: 'Companies in Saudi Arabia benefit from our well-planned, well-organized mobile app development services. The highly researched approach of our mobile app development team to both technologies and the art of keeping and advancing market value can definitely help you grow your business.',
      image: locationWhoImage('who-companies.webp', 'Enterprise app development company SoftSuave'),
    },
    {
      name: 'Nonprofit Organizations',
      body: 'Managers and analysts in Saudi Arabia are skilled at explaining technical concepts to non-technical audiences. The knowledge we have gained from operating several nonprofit mobile apps allows our expert team to come up with any useful feature that would be beneficial to society.',
      image: locationWhoImage('who-nonprofits.webp', 'App Development Company For Non-Profits'),
    },
    {
      name: 'Emerging Tech',
      body: 'As a Saudi Arabia-based software development company, soft suave creates apps with the help of our expert technologists. We develop simple-to-use applications using emerging technologies such as Artificial Intelligence, Machine Learning, and Virtual Reality.',
      image: locationWhoImage('who-emerging-tech.webp', 'Tech app development company Soft Suave'),
    },
  ],
};

export const masaPortfolio: WorkCarouselContent = {
  eyebrow: '',
  title: 'Portfolio',
  body: 'Soft Suave is among the best Saudi Arabian mobile app development companies due to our booming mobile-first strategy. Soft Suave has developed a number of tantalizing Mobile Apps for eCommerce, Construction, Restaurants, and other industries.',
  // Each live portfolio row ends on its own "Know More" link.
  tileCta: 'Know More',
  items: [
    {
      // The live H5 sets "Multi-vendor" and "Marketplace app" on two lines.
      title: 'Multi-vendor Marketplace app',
      body: 'A multivendor platform that drives business growth through highly effective eCommerce mobile applications.',
      image: locationPortfolioImage('portfolio-multivendor.webp', 'Multivendor Market Platform'),
      href: '/multi-vendor-marketplace-platform',
    },
    {
      title: 'Employee Time Tracking Software',
      body: 'Employee time tracking software from Soft Suave includes a mobile application for field employees.',
      image: locationPortfolioImage('portfolio-time-tracking.webp', 'Employee time tracking app development in Saudi Arabia'),
      href: '/construction-employee-time-tracking-app',
    },
    {
      title: 'Restaurant POS Software',
      body: 'The purpose of POS software is to make sales easier for businesses. Soft Suave is the ideal partner for POS software development in Saudi Arabia.',
      image: locationPortfolioImage(
        'portfolio-restaurant-pos.webp',
        'Restaurant POS software development company in Saudi Arabia',
      ),
      href: '/pos-software-development-company',
    },
  ],
};

export const masaProcess: ProcessStepperContent = {
  title: 'Soft Suave’s Mobile App Development Process',
  body: 'One of our goals as a top Saudi Arabian mobile app development company is to offer a one-stop solution for all your app development needs. From product design to full-stack engineering, Soft Suave manages every aspect of mobile app development.',
  links: [
    { text: 'app development team', href: '/hire-mobile-app-developers' },
    { text: 'Android', href: '/android-application-development-company' },
    { text: 'iOS', href: '/ios-application-development-company' },
    { text: 'Cross-platform', href: '/cross-platform-application-development-company' },
  ],
  steps: [
    {
      name: 'Consultation',
      subtitle: 'Outlining a mobile app idea into a complete frame',
      paragraphs: [
        "Got an app idea? It's just a matter of making it real. It should be user-friendly, useful, and have simple but unique options. An app development team is a good option if you're not sure whether the app ideas will benefit your business or if you just have an idea but don't know anything wisest it Upon enquiring, our app development experts transform your drafted idea into a masterpiece. As part of our app development process, we analyze your ideas, conduct research, and consult with you about how you want your app to impact your business and the plans you have for growing your business through this.",
      ],
      points: ['Requirement Analysis', 'Market Evaluation', 'Feasibility Analysis', 'Assessment for Project Scope'],
      image: locationProcessImage('consultation', 'Application Re-hosting Services Soft Suave'),
    },
    {
      name: 'Strategy',
      subtitle: 'Masterplanning for Future Success',
      paragraphs: [
        "It's like shooting a gun blindfolded without a strategy for any project. Your target is never known, and you can never focus on it. How will you reach your audience, what kind of service will you provide, who is your target audience, and why do they need your service? How does all of this affect your business? Design, brand identity placement, and applications for Android, iOS, or Cross-platform occur simultaneously. All these questions and decisions lead, as the leading app development company with world-class experts, to creating a strong strategy with market goals.",
      ],
      points: [
        'Determining product objective',
        'Identifying target Audience',
        'Product discovery & analysis',
        'Product launch & marketing strategy',
      ],
      image: locationProcessImage('strategy', 'Application Re-Architecturing Services Soft Suave'),
    },
    {
      name: 'Designing',
      subtitle: 'Attractive designs with a dapper Experience',
      paragraphs: [
        'If you want to give your customers a seamless experience, feel good and use our services easily, with useful features and stylish designs, then Soft Suave is the place for you. No matter what genre you want, we can do it for you. Soft Suave is a Saudi Arabian app development company that prioritizes design and user experience. Startups, SMBs, and enterprises have relied on our mobile application development service. As we develop our user interfaces, we ensure a better customer experience across platforms, driving business impact and driving growth for your app ideas. We can help you develop the best mobile apps in Saudi Arabia.',
      ],
      points: ['Design sketch creation', 'Wireframe making', 'Creation of Mockups', 'Designing and Prototyping'],
      image: locationProcessImage('designing', 'Application Modernization Services Soft Suave'),
    },
    {
      name: 'Development',
      subtitle: 'Constructing imaginations into reality',
      paragraphs: [
        'We offer a full range of mobile app development services in Saudi Arabia at Soft Suave. We deliver exceptional solutions by implementing the latest technologies. The backend, coding, integrations, database creation, and everything in between are done in phases. Our Saudi Arabia app development services include iOS, Android, and cross-platform apps built with Python, Java, Flutter, React Native, Swift, and Kotlin, among other technologies.',
      ],
      points: [
        'Custom or Clone app development based on your needs',
        'Complete IP rights & source code',
        'Powerful, scalable & safe solutions',
        'Most delinquent technology & tools',
      ],
      image: locationProcessImage('development', 'Strategic Modernization Company Soft Suave'),
    },
    {
      name: 'Deployment',
      subtitle: 'Launching something innovative the whole world needs.',
      paragraphs: [
        "We are a top mobile app development company in Saudi Arabia that builds solutions that work perfectly. The App Store and Play Store are just the beginning. We make sure your app is visible to your audience as well. App deployment isn't the end of our services. When your mobile application is launched, our maintenance and support team is always available to help you with any issues that may arise. We became the leading Saudi Arabian app development company thanks to our app development experts and mobile app development team.",
      ],
      points: [
        'Play store deployment of the App',
        'App Store Optimization',
        'Customer service support',
        'Software license management',
      ],
      image: locationProcessImage('deployment', 'Strategic Modernization Company Soft Suave'),
    },
  ],
};

export const masaTech: TechStackContent = {
  eyebrow: '',
  title: 'Mobile Application Development Technologies We Use',
  body: 'Listed below are Soft Suave developers with expertise in and hands-on experience with a variety of technologies',
  groups: locationTechGroups,
};

/**
 * The visible FAQ, verbatim. The third answer ends with a full stop here and
 * without one in the live FAQPage JSON-LD; both are kept as published — see
 * `lib/seo/mobile-app-development-company-saudi-arabia.ts`.
 */
export const masaFaqs: FaqContent = {
  eyebrow: '',
  title: 'Frequently Asked Questions',
  body: 'Know more about our processes and how we work, with the help of the following FAQs our clients ask.',
  items: [
    {
      q: 'Can you make apps useful for the Saudi people?',
      a: 'As we have worked on numerous projects in Saudi Arabia, we know exactly what kind of apps are needed here, and we know how to design a mobile application following certain rules.',
    },
    {
      q: 'How much does it cost to develop an app?',
      a: 'The cost of your mobile app depends on its requirements. The price also includes technology, features, additional UI/UX changes, App store submissions, developers, and so on. Once you consult with our experts, you will know the approximate cost of the app.',
    },
    {
      q: 'Do you have an in-house design team?',
      a: 'Yes, we have an in-house design team in Saudi Arabia. Throughout the app creation process, they ensure the solution is useful for users.',
    },
    {
      q: 'Do you offer mobile app support services?',
      a: 'Even after the completion of mobile app development, you can always come to our team for maintenance and support. We are available 24/7 to fix any issues for you.',
    },
    {
      q: 'Why do top brands trust Soft Suave?',
      a: 'Since we strive to provide the best services to all of our clients, our happy clients are always satisfied with our service and the powerful, advanced, useful, and profit-generating products we provide. It is thanks to our app development experts that we have become a top mobile app development company in Saudi Arabia.',
    },
  ],
};

export const masaClose = locationClose('Mobile app development consultation (Saudi Arabia)');

/** The whole page, for `LocationAppPage`. */
export const masaPage: LocationAppPageContent = {
  key: 'mobile-app-saudi-arabia',
  hero: masaHero,
  clientLogos: locationClientLogos,
  about: masaAbout,
  services: masaServices,
  who: masaWho,
  portfolio: masaPortfolio,
  portfolioTitleAs: 'h5',
  process: masaProcess,
  tech: masaTech,
  techMarks: locationTechMarks,
  faqs: masaFaqs,
  faqQuestionAs: 'h4',
  close: masaClose,
};
