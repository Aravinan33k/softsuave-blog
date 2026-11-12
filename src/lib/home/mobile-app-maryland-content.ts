/**
 * Copy for `/mobile-app-development-company-maryland`.
 *
 * Every string is softsuave.com/mobile-app-development-company-maryland's
 * own, in its own order — headings, paragraphs, cards, technologies and image
 * alt text — carried across without rewording. Oddities on the live page are
 * kept as published:
 *
 *   - "much like how our Italian cuisine became the taste of the world" (the
 *     overview intro, carried from the Italy page);
 *   - "Company in Maryland , with" (space before the comma);
 *   - "Soft Suave’ Mobile App developers" (apostrophe without the s);
 *   - the portfolio's Italy wording in its alt text and POS card;
 *   - "soft Suave" in the technology intro; alt text "SoftSuave", "Soft SUave".
 *
 * The live page is the template's short form: it runs NO process band and NO
 * FAQ, and publishes no structured data (no JSON-LD block), so this page has
 * none of the three either.
 *
 * Heading levels are the live page's: portfolio titles are H5s.
 *
 * Rendered by `components/landing/location-app-page.tsx`, the layout every
 * location page shares; what the location pages say identically is in
 * `mobile-app-location-shared.ts`. Its own art: the overview illustration
 * (`mob-dev-img-1.svg`, rasterised) and the Startups photo (`startup.jpg`),
 * under `public/images/landing/mobile-app-location/`.
 */

import type { HeroContent } from '@/components/generative-ai/hero';
import type { OverviewContent } from '@/components/generative-ai/overview';
import type { ServicesGridContent } from '@/components/common/services-grid';
import type { CardGridContent } from '@/components/landing/industries';
import type { WorkCarouselContent } from '@/components/home/work-grid';
import type { TechStackContent } from '@/components/landing/tech-stack';
import type { LocationAppPageContent } from '@/components/landing/location-app-page';
import {
  LOCATION_IMG,
  locationClientLogos,
  locationClose,
  locationHeroForm,
  locationPortfolioImage,
  locationTechGroups,
  locationTechMarks,
  locationWhoImage,
} from '@/lib/home/mobile-app-location-shared';

export const mamdMeta = {
  path: '/mobile-app-development-company-maryland',
  // The live page's head, verbatim.
  title: 'Mobile App Development Company in Maryland -Soft Suave',
  description:
    'Soft Suave is a best mobile app development company in Maryland offering app development services for iOS, Android & Hybrid Mobile apps.',
  canonical: 'https://www.softsuave.com/mobile-app-development-company-maryland',
  ogTitle: 'Mobile App Development Company in Maryland -Soft Suave',
  ogDescription:
    'Soft Suave is a best mobile app development company in Maryland offering app development services for iOS, Android & Hybrid Mobile apps.',
  ogSiteName: 'Soft Suave Technologies',
  ogImage: 'https://www.softsuave.com/assets/images/maryland-app-development-company-softsuave.jpg',
  twitterSite: '@softsuave',
} as const;

export const mamdHero: HeroContent = {
  titleLines: ['Best Mobile App Development Company in Maryland'],
  // The live H1 highlights "Maryland".
  accent: 'Maryland',
  body: [
    "Soft Suave is proud to be one of the top mobile app development companies in Maryland. We've worked with many amazing clients to offer cutting-edge app development services that are focused on the business's priorities.",
    'Want to Outsource App Development Projects? Get in touch for a free quote!',
  ],
  bodyLinks: [{ text: 'for a free quote!', href: '/free-quote' }],
  points: [],
  form: locationHeroForm('Mobile app development enquiry (Maryland)'),
};

export const mamdAbout: OverviewContent = {
  eyebrow: '',
  title: 'Custom Mobile App Development Company in Maryland',
  paragraphs: [
    'Both businesses and society can benefit from mobile apps, as the more advanced they get, the more the economy will grow, much like how our Italian cuisine became the taste of the world.',
    'The business world needs a Mobile App to run effectively. Get cutting-edge mobile app development solutions from Soft Suave to propel your business ahead of your competitors. We are the Top Mobile App Development Company in Maryland , with Dedicated Mobile App Developers to bring all your ideas into remarkable Mobile Apps. Soft Suave is globally recognized to provide fast and efficient mobile app development services for start-ups and SMBs using advanced technologies.',
    'We are committed to delivering simple & easy to use Mobile Apps with the most interactive UI/UX that offer users the best possible experience. Our impeccable mobile app development services are the best in Maryland and fit well with all the industries in the USA. Soft Suave has the track record of being the best mobile app development company in Maryland that lets clients achieve business goals quickly and efficiently. Moreover, our custom mobile app development services translate your app ideas into excellent business value. Soft Suave’ Mobile App developers use intuitive and engaging designs to build next-gen Mobile Apps that yield good ROI to your business.',
  ],
  links: [
    { text: 'mobile app development solutions', href: '/mobile-application-development-company' },
    // "Mobile App developers" — not the earlier "Mobile App Developers" in
    // the second paragraph (different case, so the match is exact anyway).
    { text: 'Mobile App developers', href: '/hire-mobile-app-developers' },
  ],
  image: {
    src: `${LOCATION_IMG}/overview-maryland.webp`,
    width: 1044,
    height: 1328,
    alt: 'Best mobile app development company in Maryland',
    fit: 'column',
  },
};

export const mamdServices: ServicesGridContent = {
  eyebrow: '',
  title: 'Soft Suave Mobile App Development Service',
  body: 'Soft Suave is the top Mobile App Development Company in Maryland that has the expertise to develop mobile apps in Android, iOS and Cross-platform.',
  items: [
    {
      name: 'iOS App Development',
      body: 'The Human Interface Guidelines are used to develop iOS native apps. All apps are built using the most recent iOS frameworks. Each iPhone and iPad product development is split-tested to get feedback from early users.',
      href: '/ios-application-development-company',
    },
    {
      name: 'Android App Development',
      body: 'High-end Android apps are developed by our Material Design Guidelines team. We also use the best Android libraries knowledge to create them. Our Maryland android developers have worked with startups and Fortune 500 companies.',
      href: '/android-application-development-company',
    },
    {
      name: 'Enterprise Mobility Solutions',
      body: 'We are one of the very few app development companies in Maryland that can deliver complex projects in the timeframe we set. We can make anything possible, and offer the best mobile app development services in Maryland.',
      href: '/mobile-application-development-company',
    },
  ],
};

export const mamdWho: CardGridContent = {
  eyebrow: '',
  title: 'Who Do We Work For',
  body: 'We develop industry-specific mobile apps in Maryland that leverage our extensive experience working with clients around the world and multiple domains. This allows us to solve unique problems and provide value for businesses across diverse industries.',
  items: [
    {
      name: 'Startups',
      body: 'Our expertise is focused and cost-effective so that Startups can get off to a good start before they hire an in-house mobile app development team in Maryland.',
      // This page's own Startups photo (`startup.jpg`), not the shared illustration.
      image: locationWhoImage('who-startups-photo.webp', 'Startup app development company Soft Suave'),
    },
    {
      name: 'Established Companies',
      body: "Soft Suave is a force multiplier. It can be used to augment existing teams or take on specific projects. Soft Suave's organizational maturity blends well with established companies' processes and procedures.",
      image: locationWhoImage('who-companies.webp', 'Enterprise app development company SoftSuave'),
    },
    {
      name: 'Nonprofit Organizations',
      body: 'Our rich history of partnership with NonProfit organizations has seen us bring technical expertise to their critical missions. Our managers and analysts are skilled in explaining technical concepts to non-technical audiences.',
      image: locationWhoImage('who-nonprofits.webp', 'App Development Company For Non-Profits'),
    },
    {
      name: 'Emerging Tech',
      body: 'Soft Suave is an app development company in Maryland that employs technologists. Our bread and butter are integrating emerging technologies such as Artificial Intelligence, Machine Learning, and Virtual Reality into simple-to-understand apps.',
      image: locationWhoImage('who-emerging-tech.webp', 'Tech app development company Soft Suave'),
    },
  ],
};

export const mamdPortfolio: WorkCarouselContent = {
  eyebrow: '',
  title: 'Portfolio',
  body: 'Our successful mobile-first approach ranks Soft Suave among the top Mobile App Development companies in Maryland. Here are a few compelling Mobile Apps developed by Soft Suave for the eCommerce, Construction and Restaurant industry.',
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

export const mamdTech: TechStackContent = {
  eyebrow: '',
  title: 'Effective Technologies For Your Mobile apps',
  body: 'The Powerful technologies we use at soft Suave mobile app development make your Mobile apps more useful and give better solutions.',
  groups: locationTechGroups,
};

export const mamdClose = locationClose('Mobile app development consultation (Maryland)');

/** The whole page, for `LocationAppPage` — no process band, no FAQ, as live. */
export const mamdPage: LocationAppPageContent = {
  key: 'mobile-app-maryland',
  hero: mamdHero,
  clientLogos: locationClientLogos,
  about: mamdAbout,
  services: mamdServices,
  who: mamdWho,
  portfolio: mamdPortfolio,
  portfolioTitleAs: 'h5',
  tech: mamdTech,
  techMarks: locationTechMarks,
  close: mamdClose,
};
