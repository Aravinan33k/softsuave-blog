/**
 * Copy for `/mobile-app-development-company-south-africa`.
 *
 * Every string is softsuave.com/mobile-app-development-company-south-africa's
 * own, in its own order — headings, paragraphs, cards, steps, technologies,
 * FAQ answers and image alt text — carried across without rewording.
 * Oddities on the live page are kept as published:
 *
 *   - the `<title>` opens and ends with a space;
 *   - "company in South Africa. are highly advanced" ("who we work for"
 *     intro);
 *   - "user-friendly solutions" with no full stop (overview intro);
 *   - "don't know anything wisest it Upon enquiring" (no full stop);
 *   - "Among our South African, app development services" (stray comma);
 *   - "Soft suave creates apps" (Emerging Tech card);
 *   - "Most delinquent technology & tools" (Development checklist);
 *   - the process illustrations' alt text naming re-hosting and
 *     modernization services, and "SoftSuave", "Soft SUave" in alts.
 *
 * Heading levels are the live page's: portfolio titles are H5s and FAQ
 * questions H4s.
 *
 * Its FAQPage JSON-LD is kept verbatim (`lib/seo/mobile-app-development-
 * company-south-africa.ts`). As on the live page, the third answer differs in
 * case: the schema reads "flutter, react native, and ionic", the page
 * "Flutter, React Native, and Ionic". Both are kept as published.
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

export const mazaMeta = {
  path: '/mobile-app-development-company-south-africa',
  // The live page's head, verbatim — the <title> opens and ends with a space.
  title: ' A Trustworthy Mobile App Development Company in South Africa ',
  description:
    'Soft Suave provides the best mobile app development service with high-quality technologies and advancement-filled mobile applications for South African people.',
  canonical: 'https://www.softsuave.com/mobile-app-development-company-south-africa',
  ogTitle: 'Custom Application Development Company in South Africa',
  ogDescription:
    'Soft Suave provides the best mobile app development service with high-quality technologies and advancement-filled mobile applications for South African people.',
  ogSiteName: 'Soft Suave Technologies',
  ogImage: 'https://www.softsuave.com/assets/images/mobile-app-development-company-south-africa.png',
  twitterSite: '@softsuave',
} as const;

export const mazaHero: HeroContent = {
  titleLines: ['An Industry Leader in South African Mobile App Development'],
  // The live H1 highlights "South African".
  accent: 'South African',
  body: [
    "Industry-specific mobile app development solutions enhance your business' competency and we deliver mobile apps with real value to help your business grow.",
    'Want to Outsource App Development Projects? Get in touch for a free quote!',
  ],
  bodyLinks: [{ text: 'for a free quote!', href: '/free-quote' }],
  points: [],
  form: locationHeroForm('Mobile app development enquiry (South Africa)'),
};

export const mazaAbout: OverviewContent = {
  eyebrow: '',
  title: 'A Spendworthy Mobile App Development Company',
  paragraphs: [
    'Soft Suave is a preeminent mobile app development firm in South Africa with app development experts trained to deliver user-friendly solutions',
    "We delivered high-quality mobile applications that exceed our client's expectations for a decade. We love challenges, and developing bespoke digital solutions, and thrive on proving them to our clients with various sectors or mobile applications like eCommerce, Healthcare, Education, and other multifarious industries.",
    "Being one of the top mobile app development companies in South Africa is something we are passionate about. This is evident when you look at the quality and range of products we have created for our clients to date. Every day brings new technologies and challenges in Africa that we welcome with open arms and give better solutions. In this way, we can remain at the forefront of our industry's innovation. Our authoritative strategies and result-driven approaches to our clients at the outset of their projects help them achieve very definite goals. Depending on your requirements, we use a variety of technologies and frameworks.",
    'Whether you want Native apps (Android and iOS) or Hybrid or Cross-Platform apps, we make your mobile apps more than just digital business cards. They will become lead-generating tools that position you as an authority in your field, becoming the first point of contact for a lot of lucrative business deals in the future.',
  ],
  links: [
    { text: 'eCommerce', href: '/ecommerce-mobile-app-development-company' },
    { text: 'Healthcare', href: '/healthcare-mobile-app-development-company' },
    { text: 'Education', href: '/education-app-development-company' },
  ],
  image: {
    src: `${LOCATION_IMG}/overview-south-africa.webp`,
    width: 433,
    height: 433,
    alt: 'Best mobile app development company in South Africa',
    fit: 'column',
  },
};

export const mazaServices: ServicesGridContent = {
  eyebrow: '',
  title: "Discover South Africa's Top Mobile App Services",
  body: 'Our South African mobile app development experts simplify complex human tasks by keeping up with modern technology trends and inventing new features.',
  // The live iOS card links a phrase in its text as well as ending on "Know More".
  links: [{ text: 'team of iOS programmers', href: '/hire-ios-developers' }],
  items: [
    {
      name: 'iOS App Development',
      body: 'iOS native apps follow Human Interface Guidelines. Apps are built using the latest iOS frameworks. With our talented team of iOS programmers, we can continue supporting your iPhone, iPad, or Apple service in South Africa.',
      href: '/ios-application-development-company',
    },
    {
      name: 'Android App Development',
      body: 'Our Material Design Guidelines team develops Android apps. Additionally, they are designed using the best Android libraries. We have worked with startups and small businesses in South Africa that mostly needed an android app solution to make their business reach and get customers.',
      href: '/android-application-development-company',
    },
    {
      name: 'Enterprise Mobility Solutions',
      body: "The whole process of ideation, launching, marketing, maintaining, and supporting your apps can be handled by us. Organizations use Enterprise Mobility solutions to secure their employees' mobile devices. Mobile device management services and technologies are included.",
      href: '/mobile-application-development-company',
    },
  ],
};

export const mazaWho: CardGridContent = {
  eyebrow: '',
  title: 'Soft Suave’s Primary Clients are',
  body: 'Apps developed by Soft Suave’s app development company in South Africa. are highly advanced and industry-standard.',
  items: [
    {
      name: 'Startups',
      body: "Starting a business in South Africa is convenient and challenging because of the strong competition. It's a good idea to start with our cost-effective but highly effective mobile applications if you want to reach out to your target audience digitally and establish your own brand identity faster.",
      image: locationWhoImage('who-startups.webp', 'Startup app development company Soft Suave'),
    },
    {
      name: 'Established Companies',
      body: 'Providing well-planned, well-organized mobile app development services to companies in South Africa is what we do. Using our highly researched approach to both technology and keeping and advancing market value, you can grow your business.',
      image: locationWhoImage('who-companies.webp', 'Enterprise app development company SoftSuave'),
    },
    {
      name: 'Nonprofit Organizations',
      body: 'Managers and analysts in South Africa can explain technical concepts to non-technical audiences. In addition to operating several nonprofit mobile apps, our expert team can come up with any useful feature that would benefit society.',
      image: locationWhoImage('who-nonprofits.webp', 'App Development Company For Non-Profits'),
    },
    {
      name: 'Emerging Tech',
      body: 'Soft suave creates apps with the help of South African mobile app experts. In order to develop simple-to-use applications, Artificial Intelligence, Machine Learning, and Virtual Reality technologies are used.',
      image: locationWhoImage('who-emerging-tech.webp', 'Tech app development company Soft Suave'),
    },
  ],
};

export const mazaPortfolio: WorkCarouselContent = {
  eyebrow: '',
  title: 'Industry-specific App Development Firm',
  body: 'We are one of the most successful South African mobile app development companies due to our mobile-first approach. For eCommerce, Construction, Restaurants, and other industries, Soft Suave has developed several tantalizing Mobile Apps.',
  // Each live portfolio row ends on its own "Know More" link.
  tileCta: 'Know More',
  items: [
    {
      // The live H5 sets "Multi-vendor" and "Marketplace app" on two lines.
      title: 'Multi-vendor Marketplace app',
      body: 'The multivendor platform that drives business growth through highly effective eCommerce mobile applications.',
      image: locationPortfolioImage('portfolio-multivendor.webp', 'Multivendor Market Platform development by Soft SUave'),
      href: '/multi-vendor-marketplace-platform',
    },
    {
      title: 'Employee Time Tracking Software',
      body: 'Employee time tracking software from Soft Suave includes a mobile application for field employees.',
      image: locationPortfolioImage('portfolio-time-tracking.webp', 'Employee time tracking app development in South Africa'),
      href: '/construction-employee-time-tracking-app',
    },
    {
      title: 'Restaurant POS Software',
      body: 'The purpose of POS software is to make sales easier for businesses. Soft Suave is the ideal partner for POS software development in South Africa.',
      image: locationPortfolioImage(
        'portfolio-restaurant-pos.webp',
        'Restaurant POS software development company in South Africa',
      ),
      href: '/pos-software-development-company',
    },
  ],
};

export const mazaProcess: ProcessStepperContent = {
  title: 'Get a Glimpse of Our Mobile App Development Process',
  body: 'We aim to provide a one-stop solution to all your app development needs as the leading South African mobile app development agency. Soft Suave offers full-stack engineering services for developing mobile apps.',
  links: [
    { text: 'full-stack engineering services', href: '/hire-full-stack-developers-in-india' },
    { text: 'leading app development company', href: '/mobile-application-development-company' },
    { text: 'mobile app development team', href: '/hire-mobile-app-developers' },
  ],
  steps: [
    {
      name: 'Consultation',
      subtitle: 'Shaping your idea into Structural reality',
      paragraphs: [
        "Mobile apps should be user-friendly, useful, and have simple but unique options. An app development expert is a good option if you're not sure whether the app ideas will benefit your business or if you just have an idea but don't know anything wisest it Upon enquiring, our app development experts transform your drafted idea into a masterpiece. As part of our app development process, we analyze your ideas, conduct research, and consult with you about how you want your app to impact your business and the plans you have for growing your business through this.",
      ],
      points: ['Requirement Analysis', 'Market Evaluation', 'Feasibility Analysis', 'Assessment for Project Scope'],
      image: locationProcessImage('consultation', 'Application Re-hosting Services Soft Suave'),
    },
    {
      name: 'Strategy',
      subtitle: 'Goal Setting for the future Achievements',
      paragraphs: [
        "No strategy? Don't expect any outcomes. Because it's more like you are lost in the dark forest and moving with the wrong map. Your target is never known, and you can never focus on it. How will you reach your audience, what kind of service will you provide, who is your target audience, and why do they need your service? How does all of this affect your business? Design, brand identity placement, and applications for Android, iOS, or cross-platform platforms occur simultaneously. All these questions and decisions lead, as the leading app development company with world-class experts, to creating a solid strategy with market goals.",
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
      subtitle: 'Architecting the mobile application',
      paragraphs: [
        'Soft Suave is the place for you if you want to give your customers a seamless experience, feel good, and use our services easily with useful features and stylish designs. Whatever genre you want, we can do it. A South African app development company that prioritizes design and user experience is Soft Suave. Startups, SMBs, and enterprises have relied on our mobile application development service. We ensure a better customer experience across platforms, driving business impact and driving growth for your app ideas as we develop our user interfaces. We can help you develop the best mobile apps in South Africa.',
      ],
      points: ['Design sketch creation', 'Wireframe making', 'Creation of Mockups', 'Designing and Prototyping'],
      image: locationProcessImage('designing', 'Application Modernization Services Soft Suave'),
    },
    {
      name: 'Development',
      subtitle: 'Devising the app to make robust digital solutions',
      paragraphs: [
        'Soft Suave provides mobile app development services in South Africa. Utilizing the latest technologies, we deliver exceptional solutions. Backend coding, integrations, database creation, and everything in between are done in phases. Among our South African, app development services are iOS, Android, and cross-platform apps built with Python, Java, Flutter, React Native, Swift, and Kotlin.',
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
      subtitle: 'Launching Your mobile app as a service',
      paragraphs: [
        "Our mobile app development company in South Africa builds solutions that work perfectly. We are just getting started with the App Store and Play Store. We ensure that your app is visible to your audience as well. Our services don't end with app deployment. Our maintenance and support team is always available to assist you with any issues that may arise when your mobile application is launched. Our mobile app development team helped us become the leading South African app development company.",
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

export const mazaTech: TechStackContent = {
  eyebrow: '',
  title: 'Credible Mobile Apps Built With Mod Technologies',
  body: 'Listed below are Soft Suave developers with expertise in and hands-on experience with a variety of technologies.',
  groups: locationTechGroups,
};

/** The visible FAQ, verbatim, with its inline links. */
export const mazaFaqs: FaqContent = {
  eyebrow: '',
  title: 'Frequently Asked Questions',
  body: 'Know more about our processes and how we work, with the help of the following FAQs our clients ask.',
  links: [
    { text: 'free 30-minute consultations', href: '/30-min-free-consultation' },
    { text: 'Flutter', href: '/flutter-application-development-company' },
    { text: 'React Native', href: '/react-native-app-development-company' },
    { text: 'Ionic', href: '/ionic-app-development-company' },
    { text: 'Legacy Modernization service', href: '/legacy-modernization-services' },
  ],
  items: [
    {
      q: 'Why trust Soft Suave?',
      a: 'Our clients are always happy with our service and the powerful, advanced, useful, and profit-generating products we provide because we strive to provide the best service to them. We have become a successful mobile app development firm in South Africa because of our app development experts.',
    },
    {
      q: 'I’ve got an idea, where do I start?',
      a: 'Our South African mobile app development experts offer free 30-minute consultations anytime, so you can get a clearer vision of how to build your mobile app through the idea.',
    },
    {
      q: 'Can you build apps for both iOS and Android?',
      a: 'A Cross-platform app can be developed by our mobile app development company that can be used for both Android and iOS devices. Java is the best language for developing these kinds of apps. Also, Flutter, React Native, and Ionic are among the best technologies for building mobile apps.',
    },
    {
      q: 'Can I upgrade my existing mobile app?',
      a: 'You can change the designs, technology, features even the core elements to make it more advanced that compatible with the latest technology through our Legacy Modernization service.',
    },
  ],
};

export const mazaClose = locationClose('Mobile app development consultation (South Africa)');

/** The whole page, for `LocationAppPage`. */
export const mazaPage: LocationAppPageContent = {
  key: 'mobile-app-south-africa',
  hero: mazaHero,
  clientLogos: locationClientLogos,
  about: mazaAbout,
  services: mazaServices,
  who: mazaWho,
  portfolio: mazaPortfolio,
  portfolioTitleAs: 'h5',
  process: mazaProcess,
  tech: mazaTech,
  techMarks: locationTechMarks,
  faqs: mazaFaqs,
  faqQuestionAs: 'h4',
  close: mazaClose,
};
