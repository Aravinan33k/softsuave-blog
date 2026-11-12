import type { HeroContent } from '@/components/landing/hero';
import type { FaqContent } from '@/components/landing/faq';
import { heroForm } from '@/lib/home/hire-roles/shared';

/**
 * /ecommerce-mobile-app-development-company — softsuave.com's "eCommerce App Development Company in
 * India" page, word for word: the banner with its quote form, the overview, the eight features, the eight
 * benefits, the case study, the four platforms, the FAQs and the closing "Book Free Consultation" band.
 * Images are under /images/ecommerce-app (the Broadleaf and Shopify marks are the repo's own).
 */

export const ecMeta = {
  path: '/ecommerce-mobile-app-development-company',
  shortTitle: 'eCommerce App Development',
  title: 'eCommerce Mobile Application Development Company in India & USA',
  description:
    'Best ecommerce app development company in India & USA. If you haven’t developed an eCommerce app yet, check-out our ready-to-go eCommerce app.',
} as const;

const IMG = '/images/ecommerce-app';

/** A run of copy: plain text, a bold phrase, or a link. */
export type Piece =
  | string
  | { readonly b: string }
  | { readonly text: string; readonly href: string };

export const ecHero: HeroContent = {
  titleLines: ['eCommerce App Development Company in India'],
  accent: 'eCommerce App Development',
  titleScale: 'home',
  accentGradient: true,
  breadcrumbLabels: { '/mobile-application-development-company': 'Mobile App' },
  body: ['If you haven’t developed an eCommerce app yet, check-out our ready-to-launch eCommerce application.'],
  points: [],
  scrollCue: { label: 'Scroll Down', targetId: 'overview' },
  image: { src: `${IMG}/hero.webp`, width: 1920, height: 900, alt: '', veil: 'strong', still: true },
  form: {
    ...heroForm({
      title: "Let's Discuss Your Project",
      requirementLabel: 'Requirement',
      requirementPlaceholder: 'Tell us about your eCommerce app requirement.',
      subject: 'eCommerce mobile app development enquiry',
      noEyebrow: true,
    }),
    submit: 'Submit',
    body: 'Get free rough quote in 24 hrs',
  },
};

export const ecAbout = {
  title: 'Incredible eCommerce App Development To Boost Sales Online',
  accent: 'Incredible eCommerce',
  body: 'Widen your reach and sell more products with our top-class eCommerce App Development.',
  paragraphs: [
    [
      'The eCommerce industry is taking a major shift towards the world of smartphones. To avoid the tiresome real-time shopping experience, the usage of smartphones for shopping have increased drastically to make the shopping experience simpler. Though the eCommerce mobile app development has been in the play for many years, it is only in the recent years it has gained traction where many companies have started planning to sell their products and services online through an eCommerce app.',
    ],
    [
      'You are losing out in the competition for your business if you haven’t developed an eCommerce app yet. Soft Suave is an ',
      { b: 'eCommerce app development company in India' },
      ', which provides ',
      { text: 'mobile app development solutions', href: '/mobile-application-development-company' },
      ' and services to clients especially in the USA and all around the world. Being the best eCommerce mobile app development company, Soft Suave develops customized eCommerce stores tailored to meet the requirements of your company and provide eCommerce solutions that increase sales and provide high quality services to your customer both online and offline.',
    ],
    [
      'Soft Suave has the perfect ',
      { b: 'eCommerce mobile app development solutions' },
      ' for all your business requirements. We provide ready-to-go and customized eCommerce apps according to the client requirements. We have expertise in providing customized eCommerce solutions that improves your business reach, efficiency, profitability, and customer retention. The eCommerce app development services from Soft Suave are also more scalable and affordable than most of the development companies in India.',
    ],
  ] as readonly (readonly Piece[])[],
  image: { src: `${IMG}/overview.webp`, width: 658, height: 500, alt: 'eCommerce App Development Company Soft Suave' },
} as const;

export const ecFeatures = {
  title: 'eCommerce App Development Features',
  accent: 'Features',
  body: 'We improve user experience by bridging app appearance with its functionality in a productive way. For this, we use innovative as well as engaging features like,',
  cta: { label: 'Get FREE Quote', href: '/free-quote' },
  items: [
    { name: 'Intuitive UX', alt: 'Intuitive UX', src: `${IMG}/features/f1.webp` },
    { name: 'Easy Payment options', alt: 'Easy payment Option', src: `${IMG}/features/f2.webp` },
    { name: 'Special Sale', alt: 'Special Sale', src: `${IMG}/features/f3.webp` },
    { name: 'Push Notifications', alt: 'Push Notification', src: `${IMG}/features/f4.webp` },
    { name: 'Order Tracking', alt: 'Order tracking', src: `${IMG}/features/f5.webp` },
    { name: 'Quick Checkout', alt: 'Quick Checkout', src: `${IMG}/features/f6.webp` },
    { name: 'Order history', alt: 'Order History', src: `${IMG}/features/f7.webp` },
    { name: 'Wishlist', alt: 'Wishlist', src: `${IMG}/features/f8.webp` },
  ],
} as const;

export const ecBenefits = {
  title: 'Benefits of Our Customized eCommerce App Development',
  accent: 'Benefits',
  body: 'We are a top-rated eCommerce development company operating for more than 9 successful years. Developing an online eCommerce mobile app by partnering with us helps you to get these added advantages,',
  items: [
    { name: 'Customize All You Need:', alt: 'Customize All You Need', src: `${IMG}/benefits/b1.webp`, body: 'Unmatched shopping experience and hassle-free UI/UX are our priority, so we bring all your eCommerce ideas to life with the help of our customization.' },
    { name: 'Trending Technology:', alt: 'Trending Technology', src: `${IMG}/benefits/b2.webp`, body: 'eCommerce apps from Soft Suave are built using the latest tools and technologies. We make sure your eCommerce application is unique and trending in the modern-day market.' },
    { name: 'Contemporary UI/UX:', alt: 'Contemporary UI/UX', src: `${IMG}/benefits/b3.webp`, body: 'Attractive UI and seamless UX combines to make successful eCommerce apps. Soft Suave never settles for any UI/UX design less than the best.' },
    { name: 'World-class Quality:', alt: 'World-class Quality', src: `${IMG}/benefits/b4.webp`, body: 'As a eCommerce development company, our developers go to the extent of developing an app from scratch if they are not convinced with the quality of the app developed.' },
    { name: 'One-time Cost:', alt: 'One-time Cost', src: `${IMG}/benefits/b5.webp`, body: 'Investing in the eCommerce application from Soft Suave is a life-time investment for you. We take care of maintenance, updates, and support in a timely manner.' },
    { name: 'Interactive Solutions:', alt: 'Interactive Solutions', src: `${IMG}/benefits/b6.webp`, body: 'Dynamic apps in the market are loved by customers. We know the pulse of the market, and hence we develop interactive and attractive eCommerce apps.' },
    { name: 'Own Your Code:', alt: 'Own Your Code', src: `${IMG}/benefits/b7.webp`, body: 'Soft Suave writes and runs the code while you can own it. Our job description restricts us from owning the source code after the successful development of applications.' },
    { name: 'Save Time and Money:', alt: 'Save Time and Money', src: `${IMG}/benefits/b8.webp`, body: 'Customized eCommerce app from Soft Suave saves your time and money by developing world-class eCommerce applications at 60% less development cost and delivers it on-time for you to get high ROI and succeed in the market.' },
  ],
} as const;

export const ecCaseStudy = {
  title: 'Case Studies',
  body: 'Know more about how we’ve helped businesses build new technical capabilities and modernize products.',
  item: {
    name: 'Customized eCommerce Platform',
    body: 'This eCommerce app enables clients to provide an unmatched online shopping experience and hassle-free delivery experience for their valuable customers and widen their scope in the eCommerce industry.',
    cta: { label: 'Download Case Study', href: 'https://www.softsuave.com/case-study-ecommerce-platform' },
    image: { src: `${IMG}/case-study.webp`, width: 321, height: 638, alt: 'Customized eCommerce Platform Mobile Application' },
  },
} as const;

export const ecPlatforms = {
  title: 'eCommerce App Development Platforms',
  accent: 'Platforms',
  body: 'We use state-of-the-art platforms to offer eCommerce solutions that stand out in the market.',
  items: [
    { alt: 'Broadleaf Development Company by Soft Suave', src: '/images/ecommerce-package/broadleaf.svg' },
    { alt: 'Shopify Development Company by Soft Suave', src: '/images/ecommerce-package/shopify.svg' },
    { alt: 'Magento Development Company by Soft Suave', src: `${IMG}/platforms/magento.webp` },
    { alt: 'Drupal Development Company by Soft Suave', src: `${IMG}/platforms/drupal.webp` },
  ],
} as const;

export const ecFaqs: FaqContent = {
  eyebrow: '',
  title: 'Frequently Asked Questions',
  body: 'Know more about our processes and how we work, with the help of the following FAQs.',
  items: [
    {
      q: 'How will an eCommerce app boost my business?',
      a: 'The world has attained digital transformation, and everybody owns a mobile phone. eCommerce app for your business is all you need to take your business online and boost your business.',
    },
    {
      q: 'How much does it cost to develop an eCommerce app?',
      a: 'An eCommerce app that has all the features of an MVP will cost around $XXX, and the cost is subject to increase depending upon the amount of customization required for your business to run seamlessly.',
    },
    {
      q: 'How long does it take to make an eCommerce mobile app?',
      a: 'We develop an app based on your requirement. The features, functionalities, and technologies you want for your eCommerce app determines the duration to make an eCommerce mobile app.',
    },
    {
      q: 'Will there be dedicated resources to handle my eCommerce app development process?',
      a: 'Soft Suave gives you all the privilege to choose the developers from our talent pool according to your business requirement. They will be dedicated and committed to working for you and your business goals only.',
    },
  ],
};
