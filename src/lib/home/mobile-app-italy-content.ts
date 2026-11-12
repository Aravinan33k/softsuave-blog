/**
 * Copy for `/mobile-app-development-company-italy`.
 *
 * Every string is softsuave.com/mobile-app-development-company-italy's own,
 * in its own order — headings, paragraphs, cards, steps, technologies, FAQ
 * answers (lists included) and image alt text — carried across without
 * rewording. Oddities on the live page are kept as published:
 *
 *   - the `<title>` opens with a space;
 *   - "companies in Italy ." and "app development company ." (space before
 *     the full stop);
 *   - "Our app development agency in Italy guarantee", "solutions in Italy
 *     helps enterprise";
 *   - "Soft Save develops apps" (Emerging Tech card);
 *   - "don't know anything wisest it Upon enquiring" (no full stop);
 *   - "Most delinquent technology & tools" (Development checklist);
 *   - alt text as published: "consultaion", "desiging", "SoftSuave", "Soft
 *     SUave";
 *   - "soft Suave" in the technology intro.
 *
 * The live page publishes NO structured data (no JSON-LD block at all), so
 * this page emits none either — see its route.
 *
 * Heading levels are the live page's: portfolio titles are H5s, FAQ
 * questions H3s.
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

export const maitMeta = {
  path: '/mobile-app-development-company-italy',
  // The live page's head, verbatim — the <title> opens with a space.
  title: ' Best Mobile App Development Services in Italy for Futuristic Apps',
  description:
    'Soft Suave provides end-to-end mobile app development services in Italy. Our app development company in Italy has expertise in almost all cutting-edge technology.',
  canonical: 'https://www.softsuave.com/mobile-app-development-company-italy',
  ogTitle: 'Best Mobile App Development Services in Italy for Futuristic Apps',
  ogDescription:
    'Soft Suave provides end-to-end mobile app development services in Italy. Our app development company in Italy has expertise in almost all cutting-edge technology.',
  ogSiteName: 'Soft Suave Technologies',
  ogImage: 'https://www.softsuave.com/assets/images/italian-app-development-company.jpg',
  twitterSite: '@softsuave',
} as const;

export const maitHero: HeroContent = {
  titleLines: ['Top Mobile App Development Company in Italy for Startups and SMBs'],
  // The live H1 highlights "Italy for Startups and SMBs".
  accent: 'Italy for Startups and SMBs',
  body: [
    'Soft Suave is the best mobile app development company in Italy that leverage cutting-edge technologies. We are committed to helping our clients succeed and follow a customer-centric approach.',
  ],
  points: [],
  form: locationHeroForm('Mobile app development enquiry (Italy)'),
};

export const maitAbout: OverviewContent = {
  eyebrow: '',
  title: 'A Custom Mobile App Development Company in Italy',
  paragraphs: [
    'Being the top mobile app development agency in Italy, Soft Suave specializes in developing ios, android, and various cross-platform apps using the latest technologies for businesses to grow, innovate and impact.',
    'One of the most trusted mobile app development services in Italy, Soft Suave offers cutting-edge app development for businesses of all sizes. With our team of experienced developers and designers, we can provide our clients with top-notch solutions tailored to their specific needs.',
    "Our mission is to deliver high-quality mobile apps that exceed our client's expectations as one of the best app development companies in Italy . With our collaborative and agile development approach, we can meet our clients' unique needs. Furthermore, we develop native, hybrid, and cross-platform apps to fit your needs. We develop apps for a variety of industries, including Healthcare, Finance, Retail, etc.",
    "At Soft Suave, we pride ourselves on being the top mobile app development agency in Italy. Our team is dedicated to developing innovative, user-friendly apps that add real value to our clients' businesses. Soft Suave is your one-stop app development solution in Italy.",
  ],
  links: [
    { text: 'team of experienced developers', href: '/mobile-application-development-company' },
    // The live link is the third paragraph's "cross-platform apps", not the
    // first paragraph's earlier, unlinked one.
    { text: 'cross-platform apps', href: '/cross-platform-application-development-company', after: 'hybrid, and ' },
  ],
  image: {
    src: `${LOCATION_IMG}/overview-italy.webp`,
    width: 391,
    height: 375,
    alt: 'Best mobile app development company in Italy',
    fit: 'column',
  },
};

export const maitServices: ServicesGridContent = {
  eyebrow: '',
  title: 'Our Range of Mobile App Development Services in Italy',
  body: 'Get the best out of everything and stand out among competitors with our range of mobile app development services in Italy for different platforms.',
  // Each live card links a phrase in its text as well as ending on "Know More".
  links: [
    { text: 'iOS app development', href: '/ios-application-development-company' },
    { text: 'Android mobile app development', href: '/android-application-development-company' },
    { text: 'mobile app development service', href: '/mobile-application-development-company' },
  ],
  items: [
    {
      name: 'iOS App Development',
      body: 'Our iOS app development is one of the trendiest things among our developers. We always deliver exceptionally innovative apps that will stand out among your competitors. Our app development agency in Italy guarantee that our apps are secure and reliable that meets our customer needs.',
      href: '/ios-application-development-company',
    },
    {
      name: 'Android App Development',
      body: 'Apps for Android are highly competitive and have many users around the world. With our Android mobile app development in Italy, users are able to easily access and use the app. Our developers strive to provide the best user experience, so users are able to easily navigate the app.',
      href: '/android-application-development-company',
    },
    {
      name: 'Enterprise Mobility Solutions',
      body: 'Our enterprise mobility solutions in Italy helps enterprise reach their audience digitally and maximize their ROI. Our mobile app development service in Italy specializes in providing customized solutions to companies, regardless of size and industry.',
      href: '/mobile-application-development-company',
    },
  ],
};

export const maitWho: CardGridContent = {
  eyebrow: '',
  title: "Among Soft Suave's Key Clients Are",
  body: "Developed by our Italian app development company, our mobile apps are highly advanced and industry-standard. Our solutions work for people's needs.",
  items: [
    {
      name: 'Startups',
      body: 'Due to the strong competition in Italy, starting a business is convenient and challenging. We offer cost-effective, highly effective mobile applications that can help your brand establish its identity sooner and reach out to your target audience digitally.',
      image: locationWhoImage('who-startups.webp', 'Startup app development company Soft Suave'),
    },
    {
      name: 'Established Companies',
      body: 'We provide companies in Italy with highly organized and well-planned mobile app development services. Our mobile app development team uses a highly researched approach to both technologies and advancing market value to help your business grow.',
      image: locationWhoImage('who-companies.webp', 'Enterprise app development company SoftSuave'),
    },
    {
      name: 'Nonprofit Organizations',
      body: 'It is possible for non-technical audiences to understand technical concepts explained by Italian managers and analysts. As an experienced nonprofit mobile app developer, our team can create any useful feature society would find useful.',
      image: locationWhoImage('who-nonprofits.webp', 'App Development Company For Non-Profits'),
    },
    {
      name: 'Emerging Tech',
      body: 'In Italy, Soft Save develops apps with the help of our mobile app development technologists. Artificial Intelligence, Machine Learning, and Virtual Reality technologies are used to develop simple-to-use applications.',
      image: locationWhoImage('who-emerging-tech.webp', 'Tech app development company Soft Suave'),
    },
  ],
};

export const maitPortfolio: WorkCarouselContent = {
  eyebrow: '',
  title: 'Italian Based Industry-specific App Development Agency',
  body: 'A mobile-first approach has made us one of the most successful Italian mobile app developers. Several irresistible mobile apps have been developed by Soft Suave for eCommerce, Construction, Restaurants, and other industries.',
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
      image: locationPortfolioImage('portfolio-time-tracking.webp', 'Employee time tracking app development in Italy'),
      href: '/construction-employee-time-tracking-app',
    },
    {
      title: 'Restaurant POS Software',
      body: 'The purpose of POS software is to make sales easier for businesses. Soft Suave is the ideal partner for POS software development in Italy.',
      image: locationPortfolioImage('portfolio-restaurant-pos.webp', 'Restaurant POS software development company in Italy'),
      href: '/pos-software-development-company',
    },
  ],
};

export const maitProcess: ProcessStepperContent = {
  title: 'Soft Suave’s Approach To The App Development Process',
  body: 'We strive to provide a one-stop solution for all your app development needs as the leading Italian mobile app development company . As a full-service mobile application development firm, Soft Suave handles every aspect of the process.',
  steps: [
    {
      name: 'Consultation',
      subtitle: 'Framing your ideas into a concluded project',
      paragraphs: [
        "Mobile apps should be user-friendly, useful, and have simple but unique options. An app development expert is a good option if you're not sure whether the app ideas will benefit your business or if you just have an idea but don't know anything wisest it Upon enquiring, our app development experts transform your drafted idea into a masterpiece. As part of our app development process, we analyze your ideas, conduct research, and consult with you about how you want your app to impact your business and the plans you have for growing your business through this.",
      ],
      points: ['Requirement Analysis', 'Evaluating the Market', 'Feasibility Analysis', 'Assessment for Project Scope'],
      image: locationProcessImage('consultation', 'application consultaion services soft suave'),
    },
    {
      name: 'Strategy',
      subtitle: 'Future-proofing your business',
      paragraphs: [
        'Describe your strategy for reaching your target audience, what you intend to offer, who is the audience, and why they need your help. What impact does all of this have on your business? App development for Android, iOS and cross-platform platforms occurs simultaneously with design. In order to create a solid strategy with market goals, we, as the leading app development company with world-class experts, need to answer all these questions and make decisions.',
      ],
      points: [
        'Deciding product objective',
        'Identifying target audience',
        'Product discovery & analysis',
        'Product launch & marketing strategy',
      ],
      image: locationProcessImage('strategy', 'application strategy services soft suave'),
    },
    {
      name: 'Designing',
      subtitle: 'Our designs reflect a dapper sense of style',
      paragraphs: [
        'When it comes to seamless customer experiences, easy use of services, and useful features, Soft Suave is your destination. Whatever genre you want, we can do it. Soft Suave is an Italian app development company focused on design and user experience. We provide mobile application development services to startups, small businesses, and enterprises. In developing our user interfaces, we ensure a better customer experience across platforms, driving business impact and driving growth. It is our goal to help you develop the best mobile apps in Italy.',
      ],
      points: ['Design sketch creation', 'Wireframe making', 'Creation of Mockups', 'Designing and Prototyping'],
      image: locationProcessImage('designing', 'application desiging services soft suave'),
    },
    {
      name: 'Development',
      subtitle: 'Developing powerful digital solutions using the app',
      paragraphs: [
        'Soft Suave provides a full range of mobile app development services in Italy. Implementing the latest technologies allows us to deliver exceptional solutions. There are phases in the creation of the backend, the coding, the integrations, the database, and everything else. Among others, we develop apps for iOS, Android, and cross-platform platforms using Python, Java, Flutter, React Native, Swift, and Kotlin.',
      ],
      points: [
        'Custom or Clone app development based on your needs',
        'Complete IP rights & source code',
        'Powerful, scalable & safe solutions',
        'Most delinquent technology & tools',
      ],
      image: locationProcessImage('development', 'application development company soft suave'),
    },
    {
      name: 'Deployment',
      subtitle: 'Launching Your mobile app to the world',
      paragraphs: [
        "One of the best mobile application development companies in Italy, we build solutions that work flawlessly. App Stores and Play Stores are just the beginning. Our team ensures that your app is also visible to your target audience. Our services don't end with app deployment. As soon as your mobile application is launched, our maintenance and support team is always available to assist you. With the help of our app development experts and mobile app development team, we became the leading app development company in Italy.",
      ],
      points: [
        'Play store deployment of the App',
        'App Store Optimization',
        'Customer service support',
        'Software license management',
      ],
      image: locationProcessImage('deployment', 'deployment company soft suave'),
    },
  ],
};

export const maitTech: TechStackContent = {
  eyebrow: '',
  title: 'Effective Technologies For Your Mobile apps',
  body: 'The Powerful technologies we use at soft Suave mobile app development make your Mobile apps more useful and give better solutions.',
  groups: locationTechGroups,
};

/** An answer's blocks as one plain-text string, for `a`. */
const plain = (blocks: readonly (string | { readonly list: readonly string[] })[]) =>
  blocks.map((b) => (typeof b === 'string' ? b : b.list.join(' '))).join(' ');

const brandBlocks = [
  'You can use your mobile app to promote your brand in many ways.',
  {
    list: [
      'Using your mobile app, you can showcase the values of your brand.',
      'Native ads are a great way to educate your users.',
      'Your mobile app can even increase brand awareness by creating engaging platforms such as blogs and forums.',
    ],
  },
] as const;

const frameworkBlocks = [
  'The best mobile app development frameworks to consider',
  { list: ['React Native', 'Xamarin', 'Native Scripts', 'Ionic', 'Flutter', 'Swift'] },
  'But what frameworks are needed for your mobile app depends on the following things.',
  {
    list: [
      'Requirements for the project.',
      'The skills of the mobile app development team.',
      'The complexity of the mobile app.',
      'A mobile app development language with a lot of frameworks and libraries is always a smart choice.',
    ],
  },
] as const;

const stepsBlocks = [
  'There are 9 steps in developing a mobile app from scratch. They are',
  {
    list: [
      'Ideation',
      'Research',
      'Structuring',
      'Designing',
      'Development',
      'Testing',
      'Launching',
      'Maintenance',
      'Promotion',
    ],
  },
] as const;

/** The visible FAQ, verbatim — paragraphs and lists in the live answers' own order. */
export const maitFaqs: FaqContent = {
  eyebrow: '',
  title: 'Frequently Asked Questions',
  body: 'Know more about our processes and how we work, with the help of the following FAQs our clients ask.',
  items: [
    {
      q: 'What makes an app high-quality?',
      a: 'The quality of an app depends on its ability to do what it is supposed to do without unexpectedly crashing, leaking data, etc. The quality of the program code is what matters here. A bug can be a code defect, a security vulnerability, or something else that makes the app behave unsatisfactorily.',
    },
    {
      q: 'Is it possible to make money using my app?',
      a: "There’s a Possibility, you may offer a paid app, subscription options, or maybe Ads, Right now only the Amazon app store provides money for each download. Google and Apple don't have that facility.",
    },
    {
      q: 'How can I make sure that my mobile app reflects my brand?',
      a: plain(brandBlocks),
      blocks: brandBlocks,
    },
    {
      q: 'What is the best framework for building mobile apps?',
      a: plain(frameworkBlocks),
      blocks: frameworkBlocks,
    },
    {
      q: 'What are the main steps in a mobile app development project?',
      a: plain(stepsBlocks),
      blocks: stepsBlocks,
    },
  ],
};

export const maitClose = locationClose('Mobile app development consultation (Italy)');

/** The whole page, for `LocationAppPage`. */
export const maitPage: LocationAppPageContent = {
  key: 'mobile-app-italy',
  hero: maitHero,
  clientLogos: locationClientLogos,
  about: maitAbout,
  services: maitServices,
  who: maitWho,
  portfolio: maitPortfolio,
  portfolioTitleAs: 'h5',
  process: maitProcess,
  tech: maitTech,
  techMarks: locationTechMarks,
  faqs: maitFaqs,
  close: maitClose,
};
