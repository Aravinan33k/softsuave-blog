/**
 * Copy for `/mobile-app-development-company-dubai`.
 *
 * Every string is softsuave.com/mobile-app-development-company-dubai's own,
 * in its own order — headings, paragraphs, cards, steps, technologies, FAQ
 * answers, form copy and image alt text — carried across to the new theme's
 * components without rewording. Oddities on the live page are kept as
 * published rather than silently corrected, so the two pages say the same
 * thing word for word:
 *
 *   - "we know UAE people's needs" follows "iPhones and iPads" with no full
 *     stop ("…and iPads As the best…");
 *   - "company in Dubai , specializing" (space before the comma);
 *   - "don't know anything wisest it" (Consultation step);
 *   - the Consultation step's "re-host journey" sentence;
 *   - "Most delinquent technology & tools" (Development checklist);
 *   - the "Soft SUave" capitalisation in the Xamarin logo's alt text;
 *   - the Strategy and Designing illustrations are the live page's own
 *     pairing — its Strategy step shows `design.svg` and its Designing step
 *     `statergy.svg`, each with its own alt text, as here.
 *
 * Section designs, by brief:
 *   hero                     → hire-software-developers
 *   clients                  → hire-software-developers' own band, verbatim (the
 *                              shared `Clients` with its default heading and
 *                              roster) in place of the live "Featured Clients"
 *                              strip, by request
 *   about                    → the shared Overview (prose + image)
 *   services                 → data-science-services' services grid
 *   who we work for          → the landing card grid, `feature` variant
 *   portfolio                → the homepage's work lane
 *   process                  → NEW `common/process-stepper`
 *   technologies             → data-science-services' Technology Stack
 *   FAQ                      → hire-software-developers
 *   closing consultation     → NEW `common/consultation-close`
 *
 * Rendered by `components/landing/location-app-page.tsx`, the layout every
 * location page shares; what the location pages say identically (forms,
 * closing band, technology stack, client logos, art) is in
 * `mobile-app-location-shared.ts`. Images: the live page's own art,
 * re-encoded to WebP under `public/images/landing/mobile-app-location/`; the
 * overview's skyline was supplied on request.
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
  LOCATION_IMG as IMG,
  locationClientLogos,
  locationClose,
  locationHeroForm,
  locationPortfolioImage,
  locationProcessImage,
  locationTechGroups,
  locationTechMarks,
  locationWhoImage,
} from '@/lib/home/mobile-app-location-shared';

export const madubaiMeta = {
  path: '/mobile-app-development-company-dubai',
  // The live page's head, verbatim — including the description's "dvelopment".
  title: 'Best Mobile App Development Company in Dubai, UAE',
  description:
    'Looking for top-notch mobile app development services in Dubai? Our expert app dvelopment team crafts innovative and reliable apps that cater to your unique business needs.',
  canonical: 'https://www.softsuave.com/mobile-app-development-company-dubai',
  ogTitle: 'Mobile Application Development Company in Dubai',
  ogDescription:
    "Soft Suave is one of Dubai's premier mobile app development companies, delivering technology with an interactive UX/UI that satisfies Dubai's users.",
  ogSiteName: 'Soft Suave Technologies',
  ogImage: 'https://www.softsuave.com/assets/images/mobile-app-development-company-dubai.png',
  twitterSite: '@softsuave',
} as const;

export const madubaiHero: HeroContent = {
  titleLines: ['Top Mobile App Development Company in Dubai'],
  // The live H1 highlights "Dubai".
  accent: 'Dubai',
  body: [
    'Soft Suave is one of the renowned mobile app development companies in Dubai, UAE, creating feature-rich and user-friendly apps for Dubai people.',
    'Want to Outsource App Development Projects? Get in touch for a free quote!',
  ],
  bodyLinks: [{ text: 'for a free quote!', href: '/free-quote' }],
  points: [],
  form: locationHeroForm('Mobile app development enquiry (Dubai)'),
};

export const madubaiAbout: OverviewContent = {
  eyebrow: '',
  title: 'Best Mobile App Development Company in Dubai for Startups and SMBs',
  paragraphs: [
    'Dubai is known for its rapid economic development over the years. We specialize in developing mobile apps for businesses in Dubai based on their audience need and market goals.',
    'We are the most trusted mobile app development company in Dubai , specializing in providing innovative solutions to meet the diverse needs of our clients in the UAE. Soft Suave has a team of highly trained experts who develop innovative applications. We strive to provide our customers with the best service and our apps are designed to be user-friendly and enjoyable.',
    "Our apps are designed with the user in mind, and our team of developers ensures each app meets the highest standards of quality. Our comprehensive approach to mobile app development begins with meticulous planning, research, and prototyping. We tailor our solutions to meet our clients' needs. We build custom and clone apps for Android, iOS, and cross-platform devices.",
    "Soft Suave's primary objective is to create mobile apps that meet our clients' specific needs as well as resonate with the UAE audience as one of the best mobile app development companies. Let us help you bring your ideas to life if you are looking for a reliable and trustworthy app development company in the UAE.",
  ],
  links: [
    { text: 'Android', href: '/android-application-development-company' },
    { text: 'iOS', href: '/ios-application-development-company' },
    { text: 'cross-platform devices', href: '/cross-platform-application-development-company' },
    { text: 'best mobile app development companies', href: '/mobile-application-development-company' },
  ],
  image: {
    // Replaced on request with the supplied Dubai skyline artwork (1448×1086);
    // the live page's alt text is kept.
    src: `${IMG}/overview-dubai-skyline.webp`,
    width: 1448,
    height: 1086,
    alt: 'Best mobile app development company in Dubai',
    // hire-mobile-app-developers' overview frame: from 1000px the image
    // stretches to the full height of the masthead + prose beside it,
    // instead of a 4:3 box on the row's bottom edge.
    fit: 'column',
  },
};

export const madubaiServices: ServicesGridContent = {
  eyebrow: '',
  title: 'Soft Suave Mobile App Development Service in Dubai',
  body: 'We are top mobile application development company in UAE, which has evolved with modern technology trends and created new features to simplify every complex human task that we undertake.',
  items: [
    {
      name: 'iOS App Development',
      body: "iOS app developers from Soft Suave have more than 4+ years of experience developing apps for iPhones and iPads As the best mobile app development company in Dubai, we know UAE people's needs. We develop apps based on their language, culture, and technology to give the nativity touch.",
      href: '/ios-application-development-company',
    },
    {
      name: 'Android App Development',
      body: "Due to Android's popularity, more Android apps are produced than iOS, so we deliver your app that stands out in the competitive market. Our Android app development company in Dubai creates intuitive, user-friendly applications.",
      href: '/android-application-development-company',
    },
    {
      name: 'Enterprise Mobility Solutions',
      body: 'Soft Suave provides enterprise mobility solutions for app development in Dubai that allow organizations to stay ahead of the competition. We help our clients make their mobile apps even better with ongoing support and maintenance from our experienced team of developers.',
      href: '/mobile-application-development-company',
    },
  ],
};

export const madubaiWho: CardGridContent = {
  eyebrow: '',
  title: 'Who Do We Work For',
  body: "Our mobile app development service in Dubai offers highly elevated and industry-standard mobile apps that are engineered to work in the city's dynamic and multicultural environment with heightened grades.",
  items: [
    {
      name: 'Startups',
      body: "Contriving startups in Dubai is convenient and also challenging with the taste of strong competition. It's good to start with our cost-effective but very effective mobile applications to reach out to your target audience digitally and get your own brand identity faster, so people can recognize your business.",
      image: locationWhoImage('who-startups.webp', 'startup app development company in Dubai'),
    },
    {
      name: 'Established Companies',
      body: "We also offer well-organized, efficiently planned mobile app development for established companies in Dubai. Our app development team's highly researched approach to both technologies and the art of keeping and advancing the market value of the business can certainly help you reach the next level of growth.",
      image: locationWhoImage('who-companies.webp', 'enterprise app development company in Dubai'),
    },
    {
      name: 'Nonprofit Organizations',
      body: 'We have managers and analysts who are skilled at explaining technical concepts to non-technical audiences in Dubai. With the knowledge of handling various nonprofit mobile apps, our expert team can bring out any ideas for a useful feature that is helpful to society.',
      image: locationWhoImage('who-nonprofits.webp', 'app development company for non-profits from Dubai'),
    },
    {
      name: 'Emerging Tech',
      body: 'Soft Suave employs technologists to develop apps in Dubai. A key part of our business is integrating emerging technologies such as Artificial Intelligence, Machine Learning, and Virtual Reality into simple-to-use applications.',
      image: locationWhoImage('who-emerging-tech.webp', 'tech app development company in Dubai'),
    },
  ],
};

export const madubaiPortfolio: WorkCarouselContent = {
  eyebrow: '',
  title: 'Portfolio',
  body: 'Our booming mobile-first strategy indexes Soft Suave among the top Mobile App Development companies in Dubai. Here are a few tantalizing Mobile Apps developed by Soft Suave for eCommerce, Construction, Healthcare, Education, and various industries.',
  // Each live portfolio row ends on its own "Know More" link.
  tileCta: 'Know More',
  items: [
    {
      // The live H3 sets "Multi-vendor" and "Marketplace app" on two lines.
      title: 'Multi-vendor Marketplace app',
      body: 'A hassle-free multivendor platform to drive your business growth through a highly effective eCommerce mobile application.',
      image: locationPortfolioImage('portfolio-multivendor.webp', 'Multivendor Market Platform'),
      href: '/multi-vendor-marketplace-platform',
    },
    {
      title: 'Employee Time Tracking Software',
      body: "A mobile application for field employees is included in Soft Suave's employee time tracking application.",
      image: locationPortfolioImage('portfolio-time-tracking.webp', 'Employee time tracking app development in Dubai'),
      href: '/construction-employee-time-tracking-app',
    },
    {
      title: 'Restaurant POS Software',
      body: 'Businesses use POS software to make sales easier. For POS software development in Dubai, Soft Suave is the ideal partner.',
      image: locationPortfolioImage(
        'portfolio-restaurant-pos.webp',
        'Restaurant POS software development company in Dubai',
      ),
      href: '/pos-software-development-company',
    },
  ],
};

export const madubaiProcess: ProcessStepperContent = {
  title: 'Soft Suave’s Mobile App Development Process',
  body: 'Our goal as a top mobile app development company in Dubai is to offer a one-stop solution for every app development need. Soft Suave manages every aspect of mobile app development diligently, from product design to full-stack engineering.',
  links: [{ text: 'app development experts', href: '/hire-mobile-app-developers' }],
  steps: [
    {
      name: 'Consultation',
      subtitle: 'Drafting to Crafting your Mobile App Idea',
      paragraphs: [
        "Got an app idea? It's just a matter of making it real. It should be user-friendly, useful, and have simple but unique options. An app development expert is a good option if you're not sure whether the app ideas will benefit your business or if you just have an idea but don't know anything wisest it.",
        'Upon enquiring, our app development experts transform your ideas into an app prototype.',
        'As part of our app development process, we analyze your ideas, conduct research, and consult with you about how you want your app to impact your business and the plans you have for growing your business through this.',
        'We can assist you with every phase of your re-host journey. Join us to re-host and refresh your application architecture to build for the future.',
      ],
      points: ['Requirement Analysis', 'Market Evaluation', 'Feasibility Analysis', 'Assessment for Project Scope'],
      image: locationProcessImage('consultation', 'application consultation services in Dubai'),
    },
    {
      name: 'Strategy',
      subtitle: 'The Art of Goal setting to putting things into action',
      paragraphs: [
        'Any project without a strategy is like shooting a gun blindfolded. You never know your target and you can never focus on your target. What kind of plan do you have to gain something from developing an app, how do you reach your audience, what kind of service you are gonna provide, who is your target audience, and how your service is needed for them? What does all of this matter to your business? At the same time, the design, brand identity placement, and Application platforms like Android, iOS, or Cross-platform. With all these questions and decisions, being the best app development company with world-class experts, we make a strong strategy with the market achieving goals.',
      ],
      points: [
        'Determining product objective',
        'Identifying target Audience',
        'Product discovery & analysis',
        'Product launch & marketing strategy',
      ],
      image: locationProcessImage('strategy', 'application strategy services in Dubai'),
    },
    {
      name: 'Designing',
      subtitle: 'Enticing designs with debonair Experience',
      paragraphs: [
        'Soft Suave is the right place if you want to give your customers a seamless experience, feel good and easy usage with useful features and stylish designs. We do all kinds of designs regardless of the genre from exotic to minimal.',
        'With a decade of experience in user interface and user experience design, Soft Suave is a design and experience prioritized app development company in Dubai.',
        'We have developed mobile applications for startups, SMBs, and enterprises. Developing our user interfaces ensures a better customer experience across platforms, driving business impact and driving a better growth for your app ideas. Get in touch with the best app development in Dubai today.',
      ],
      points: ['Design sketch creation', 'Wireframe making', 'Creation of Mockups', 'Designing and Prototyping'],
      image: locationProcessImage('designing', 'application designing services in Dubai'),
    },
    {
      name: 'Development',
      subtitle: 'Bringing your fantasized design into the Real world',
      paragraphs: [
        'Soft Suave offers a full range of mobile app development services in Dubai. Implementing the latest technologies allows us to deliver exceptional solutions.',
        'Work on the backend, coding, integrations, database creation and everything in between is done phase by phase. As part of our suite of Dubai app development services, we develop iOS apps, Android apps, and cross-platforms using various technologies like Python, Java, Flutter, React Native, Swift, Kotlin, etc.',
      ],
      points: [
        'Custom or Clone app development based on your needs',
        'Complete IP rights & source code',
        'Powerful, scalable & safe solutions',
        'Most delinquent technology & tools',
      ],
      image: locationProcessImage('development', 'application development company in Dubai'),
    },
    {
      name: 'Deployment',
      subtitle: 'Sustainable business growth with Powerful customer service',
      paragraphs: [
        "The solutions we build as a top mobile app development company in Dubai work perfectly. You don't just get your app listed on the App Store or Play Store; we make sure it's visible to your audience.",
        "We don't stop at app deployment. Following the blastoff of your mobile application, our maintenance and support team is always there for you 24/7 to provide our service and fix any issue aftermath.",
        'Thanks to our app development experts and the whole mobile app development team, we become the leading app development company in Dubai.',
      ],
      points: [
        'Play store deployment of the App',
        'App Store Optimization',
        'Customer service support',
        'Software license management',
      ],
      image: locationProcessImage('deployment', 'deployment company in Dubai'),
    },
  ],
};

/** The live tabs become the clusters; each tool keeps its live label. */
export const madubaiTech: TechStackContent = {
  eyebrow: '',
  title: 'Mobile Application Development Technologies We Use',
  body: 'Soft Suave developers with expertise and hands-on experience in the following technologies',
  groups: locationTechGroups,
};

/**
 * The visible FAQ, verbatim. Two answers differ slightly from the live page's
 * own FAQPage JSON-LD — Q4 ("for making us the best…" here, "to make us a
 * top…" in the schema) and Q5 ("Free 30 minutes consultation" vs "free…").
 * Both texts are kept exactly as softsuave.com publishes them; see
 * `lib/seo/mobile-app-development-company-dubai.ts`.
 */
export const madubaiFaqs: FaqContent = {
  eyebrow: '',
  title: 'Frequently Asked Questions',
  body: 'Know more about our processes and how we work, with the help of the following FAQs our clients ask.',
  links: [{ text: 'Free 30 minutes consultation', href: '/30-min-free-consultation' }],
  items: [
    {
      q: 'How much does it cost to develop an app?',
      a: 'Your mobile app requirements determine the cost of the app. It also includes the technology we choose, features and additional UI/UX changes, App store submissions, the cost for the development team, and so on. You will know the approximate cost of the app once you consult with our experts.',
    },
    {
      q: 'Do you have an in-house design team?',
      a: 'Yes. we have a dedicated in-house design team in Dubai. They oversee the entire app creation process and ensure the solution is useful to users at all times.',
    },
    {
      q: 'Do you offer mobile app support services?',
      a: 'We have the mobile app maintenance and support team 24/7 even after the completion of mobile app development, you can always come to our team to fix the issues.',
    },
    {
      q: 'Why do top brands trust Soft Suave?',
      a: 'Because we are invested to deliver the best of all service to all of our clients, our happy clients are always satisfied with our service with the powerful, advanced, useful, and profit-earning product to own for their business. Thanks to our app development experts for making us the best mobile app development company in Dubai which is recognized for the best assistance.',
    },
    {
      q: 'Do you offer free mobile app development consultations?',
      a: 'Of course, we do. You can get a Free 30 minutes consultation with our mobile app development experts from Dubai anytime, to get a clear idea for developing your long-lasting fruitful mobile apps.',
    },
  ],
};

export const madubaiClose = locationClose('Mobile app development consultation (Dubai)');

/** The whole page, for `LocationAppPage`. */
export const madubaiPage: LocationAppPageContent = {
  key: 'mobile-app-dubai',
  hero: madubaiHero,
  clientLogos: locationClientLogos,
  about: madubaiAbout,
  services: madubaiServices,
  who: madubaiWho,
  portfolio: madubaiPortfolio,
  process: madubaiProcess,
  tech: madubaiTech,
  techMarks: locationTechMarks,
  faqs: madubaiFaqs,
  close: madubaiClose,
};
