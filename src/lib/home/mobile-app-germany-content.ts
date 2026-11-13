/**
 * Copy for `/mobile-app-development-company-germany`.
 *
 * Every string is softsuave.com/mobile-app-development-company-germany's own,
 * in its own order — headings, paragraphs, cards, steps, technologies, FAQ
 * answers and image alt text — carried across without rewording. Oddities on
 * the live page are kept as published rather than silently corrected:
 *
 *   - "companies in Germany , we develop" (space before the comma);
 *   - "Soft Save develops apps" (Emerging Tech card);
 *   - "seamless customer experiences, easy-to-use features, and seamless
 *     customer experiences" (Designing step);
 *   - "Most delinquent technology & tools" (Development checklist);
 *   - the portfolio alt text naming Italy, and "Soft SUave";
 *   - the process illustrations' alt text, which names re-hosting and
 *     modernization services (the live page reuses the legacy-modernization
 *     page's art and alts).
 *
 * Its heading levels are the live page's too: portfolio titles are H5s and
 * FAQ questions H4s (`portfolioTitleAs`, `faqQuestionAs`).
 *
 * Rendered by `components/landing/location-app-page.tsx`, the layout every
 * location page shares (built from the Dubai page, with its reviewed design
 * decisions: the hire-software-developers clients band with the deployed
 * homepage's 27 logos, click-to-show process, swipeable portfolio on mobile).
 * What the location pages say identically is in
 * `mobile-app-location-shared.ts`. The live FAQPage JSON-LD matches the
 * visible FAQ word for word.
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

export const madeMeta = {
  path: '/mobile-app-development-company-germany',
  // The live page's head, verbatim.
  title: 'Top Notch Mobile App Development Company In Germany',
  description:
    'As a leading mobile app development company in Germany, Soft Suave can make your app idea into something that leads way beyond your expectations.',
  canonical: 'https://www.softsuave.com/mobile-app-development-company-germany',
  ogTitle: 'Top Notch Mobile App Development Company In Germany',
  ogDescription:
    'As a leading mobile app development company in Germany, Soft Suave can make your app idea into something that leads way beyond your expectations.',
  ogSiteName: 'Soft Suave Technologies',
  ogImage: 'https://www.softsuave.com/assets/images/app-development-company-germany.jpg',
  twitterSite: '@softsuave',
} as const;

export const madeHero: HeroContent = {
  titleLines: ['Build your Own Mobile Apps in Germany with Soft Suave'],
  // The live H1 highlights "Mobile Apps in Germany".
  accent: 'Mobile Apps in Germany',
  body: [
    'Build an Out of Box Mobile app to Stand alone in your Expertise Market to achieve both business and customer satisfaction goals.',
    'Want to Outsource App Development Projects? Get in touch for a free quote!',
  ],
  bodyLinks: [{ text: 'for a free quote!', href: '/free-quote' }],
  points: [],
  form: locationHeroForm('Mobile app development enquiry (Germany)'),
};

export const madeAbout: OverviewContent = {
  eyebrow: '',
  title: 'A Spearheading Mobile App Development Company',
  paragraphs: [
    'We deliver you the secured, most advanced, life-changing, mobile apps that can change the World.',
    "As one of the Top mobile app development companies in Germany , we develop mobile apps based on german citizens' expectations. That led you to have a great focus on reaching them without any risks because the tasks got simplified here.",
    'Having a remarkable mobile app is like a powerful magnet that can easily attract your customers for the business. Some entrepreneurs ignore the influence of mobile app development because of offline connections or website presence. But the truth is, you probably can not only attract your target customers but also satisfy their needs remotely.',
    'Our mobile app development Agency first gathers your requirements, then makes a detailed version of the app idea and started to make wireframes which then will be turned into a low-fidelity prototype. After both parties approved the prototype, we will start to design the application. N number of tests will be done after the development process for the best outcome. Then the app will be ready to launch on your preferred platforms.',
  ],
  // The live link sits on the third paragraph's "mobile app development", not
  // the second paragraph's earlier "mobile app development companies".
  links: [{ text: 'mobile app development', href: '/mobile-application-development-company', after: 'influence of ' }],
  image: {
    src: `${LOCATION_IMG}/overview-germany.webp`,
    width: 445,
    height: 423,
    alt: 'Best mobile app development company in Germany',
    fit: 'column',
  },
};

export const madeServices: ServicesGridContent = {
  eyebrow: '',
  title: 'Tech-driven Mobile App Development Service',
  body: 'Keep up with the tech trends with our mobile app development Agency in Germany',
  items: [
    {
      name: 'iOS App Development',
      body: 'With the help of our iOS app development team, businesses can determine whether iOS is right for them and which tech stack is most appropriate. The iOS app development team has built apps across multiple industries including real-time analytics, route matching, geotagging, video streaming, and more for iPhone.',
      href: '/ios-application-development-company',
    },
    {
      name: 'Android App Development',
      body: 'Android software development involves creating applications for Android-based devices. We have worked with small businesses and startups in Germany that mostly needed Android app solutions to reach and obtain customers.',
      href: '/android-application-development-company',
    },
    {
      name: 'Enterprise Mobility Solutions',
      body: "Mobile devices can be used securely within an organization through enterprise mobility services. Employees' mobile devices are managed as part of mobile device management, which secures corporate data on them. Our mobile app development service can fulfill all your mobility needs.",
      href: '/mobile-application-development-company',
    },
  ],
};

export const madeWho: CardGridContent = {
  eyebrow: '',
  title: 'Soft Suave’s Preliminary Clients',
  body: 'We have a clear vision and mission of who we give our service to and how they get to benefit from choosing us for good win-win deals. Look Out.',
  items: [
    {
      name: 'Startups',
      body: 'Starting a business in Germany is convenient and challenging because of the strong competition. You can reach out to your target audience digitally with our cost-effective, highly effective mobile applications that will help your brand establish its identity faster.',
      image: locationWhoImage('who-startups.webp', 'Startup app development company in Germany'),
    },
    {
      name: 'Established Companies',
      body: 'Providing highly organized and well-planned mobile app development services to companies in Germany is what we do. We utilize a highly researched approach to both technologies and advancing market value in our mobile app development.',
      image: locationWhoImage('who-companies.webp', 'Enterprise app development company in Germany'),
    },
    {
      name: 'Nonprofit Organizations',
      body: 'German managers and analysts explain technical concepts in a way that is understandable to non-technical audiences. With our experience in nonprofit mobile app development, we are capable of creating any useful feature society might need.',
      image: locationWhoImage('who-nonprofits.webp', 'App Development Company For Non-Profits'),
    },
    {
      name: 'Emerging Tech',
      body: 'As a mobile application development company in Germany, Soft Save develops apps with the assistance of our technologists who are well-trained and skilled. A simple-to-use application is developed using Artificial Intelligence, Machine Learning, and Virtual Reality technologies that stand out for all other competitors.',
      image: locationWhoImage('who-emerging-tech.webp', 'Tech app development company in Germany'),
    },
  ],
};

export const madePortfolio: WorkCarouselContent = {
  eyebrow: '',
  title: 'German Based Industry-specific App Development Firm',
  body: 'Soft Suave has developed several enticing mobile apps for eCommerce, construction, restaurants, and other industries.',
  // Each live portfolio row ends on its own "Know More" link.
  tileCta: 'Know More',
  items: [
    {
      // The live H5 sets "Multi-vendor" and "Marketplace app" on two lines.
      title: 'Multi-vendor Marketplace app',
      body: 'Mobile eCommerce applications that drive business growth through multivendor platforms.',
      image: locationPortfolioImage('portfolio-multivendor.webp', 'Multivendor Market Platform development by Soft SUave'),
      href: '/multi-vendor-marketplace-platform',
    },
    {
      title: 'Employee Time Tracking Software',
      body: 'Field employees can use the mobile app from Soft Suave to track their time on the job.',
      image: locationPortfolioImage('portfolio-time-tracking.webp', 'Employee time tracking app development in Italy'),
      href: '/construction-employee-time-tracking-app',
    },
    {
      title: 'Restaurant POS Software',
      body: 'Businesses use POS software to make sales easier. Soft Suave is the ideal partner for POS development.',
      image: locationPortfolioImage('portfolio-restaurant-pos.webp', 'Restaurant POS software development company in Italy'),
      href: '/pos-software-development-company',
    },
  ],
};

export const madeProcess: ProcessStepperContent = {
  title: 'Our Unique Approach To The App Development Process',
  body: 'Soft Suave focuses on creating newness that makes the digital world a better place to fulfill everyone’s needs. These are our steps for mobile app development.',
  steps: [
    {
      name: 'Consultation',
      subtitle: 'Putting your ideas into a completed project',
      paragraphs: [
        "Apps should be user-friendly, useful, and have simple but unique features. Our mobile app development agency in Germany can transform your drafted idea into a masterpiece if you don't know whether your app ideas will benefit your business or if you just have an idea but don't know what to do with it. We analyze your ideas, conduct research, and consult with you about how you want your app to impact your business and how you plan to grow it.",
      ],
      points: ['Requirement Analysis', 'Evaluating the Market', 'Feasibility Analysis', 'Assessment for Project Scope'],
      image: locationProcessImage('consultation', 'Application Re-hosting Services Soft Suave'),
    },
    {
      name: 'Strategy',
      subtitle: "Investing in your business's future",
      paragraphs: [
        'Describe your strategy for reaching your target audience, what you intend to offer, who the audience is, and why they need your help. How does all of this impact your business? The development of apps for Android, iOS and cross-platform platforms occurs simultaneously with the design process. The leading app development company with world-class experts needs to answer all these questions and make decisions in order to create a solid strategy.',
      ],
      points: [
        'Deciding product objective',
        'Identifying target audience',
        'Product discovery & analysis',
        'Product launch & marketing strategy',
      ],
      image: locationProcessImage('strategy', 'Application Re-Architecturing Services Soft Suave'),
    },
    {
      name: 'Designing',
      subtitle: 'Style is at the forefront of our designs',
      paragraphs: [
        "If you're looking for seamless customer experiences, easy-to-use features, and seamless customer experiences, Soft Suave is the place for you. It doesn't matter what mobile type you want, we can do it. Soft Suave is an app development company in Germany with an emphasis on design and user experience. Startups, small businesses, and enterprises can benefit from our mobile application development services. In developing our user interfaces, we ensure a better customer experience across platforms, driving business impact and driving growth. It is our goal to help you develop the best mobile apps in Germany.",
      ],
      points: ['Design sketch creation', 'Wireframe making', 'Creation of Mockups', 'Designing and Prototyping'],
      image: locationProcessImage('designing', 'Application Modernization Services Soft Suave'),
    },
    {
      name: 'Development',
      subtitle: 'App development for powerful digital solutions',
      paragraphs: [
        'Soft Suave offers a full range of mobile app development services in Germany. Our ability to deliver exceptional solutions is based on the latest technologies. Creating the backend, coding, integrating, and setting up the database are all phases. Python, Java, Flutter, React Native, Swift, and Kotlin are among the programming languages we use to build apps for iOS, Android, and cross-platform platforms.',
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
      subtitle: 'Globalizing Your Mobile App',
      paragraphs: [
        "As one of the best mobile app development companies in Germany, we create solutions that work flawlessly. The App Store and Play Store are just the beginning. It is also our team's responsibility to make sure that your app is visible to your target audience. The services we provide don't end with the deployment of an app. Our maintenance and support team is always available to assist you as soon as your mobile application is launched. With the help of our app development experts and mobile app development team, we became the leading app development company in Germany.",
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

export const madeTech: TechStackContent = {
  eyebrow: '',
  title: 'Effective Technologies For Development',
  body: 'We use Advanced technologies to make socially potential and technically useful Mobile applications in Germany.',
  groups: locationTechGroups,
};

/** The visible FAQ, verbatim — identical to the live page's FAQPage JSON-LD. */
export const madeFaqs: FaqContent = {
  eyebrow: '',
  title: 'Frequently Asked Questions',
  body: 'Find the relevant bits about Soft Suave’s Mobile app development Company in Germany',
  items: [
    {
      q: 'How long will it take to build and launch my app?',
      a: 'No one can predict the accurate amount of time consumed for developing and deploying the mobile app just by having an idea. Your app idea, platforms, budget, general and custom features, Discussions while developing the app, Mobile app testing, and bug fixing. There are more and more processes involved. It will be good if you consult with our experts to know the approximate time for your requirements for app development.',
    },
    {
      q: "What if we don't have a fully formed app idea?",
      a: 'Don\'t worry, Soft Suave’s app development team can make you a mobile app idea that will be a suitable and trustable digital asset for your business.',
    },
    {
      q: 'Will You Sign an NDA for app development?',
      a: "You can count on us to keep your mobile app development private and out of competitors' prying eyes while we are developing it.",
    },
    {
      q: 'Do I Need to Test My App?',
      a: 'Mobile apps should be tested. There’s no doubt. A small bug can sometimes ruin the entire project; the app can be unqualified or poorly reviewed after launch.',
    },
    {
      q: 'Can I get a preview of the app while it is in development?',
      a: 'Yes, you will be provided with a prototype that is basically a low-fidelity design of a mobile app. You can give feedback for each update.',
    },
  ],
};

export const madeClose = locationClose('Mobile app development consultation (Germany)');

/** The whole page, for `LocationAppPage`. */
export const madePage: LocationAppPageContent = {
  key: 'mobile-app-germany',
  hero: madeHero,
  clientLogos: locationClientLogos,
  about: madeAbout,
  services: madeServices,
  who: madeWho,
  portfolio: madePortfolio,
  portfolioTitleAs: 'h5',
  process: madeProcess,
  tech: madeTech,
  techMarks: locationTechMarks,
  faqs: madeFaqs,
  faqQuestionAs: 'h4',
  close: madeClose,
};
