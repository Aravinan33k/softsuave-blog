import type { HeroContent } from '@/components/landing/hero';
import type { FaqContent } from '@/components/landing/faq';
import { partnerHeroBadges } from '@/lib/home/hero-badges';
import { sharedHeroAlert } from '@/lib/home/delivery-shared';
import { CLIENTS_PLUS, COUNTRIES_PLUS, YEARS_PLUS } from '@/lib/company-figures';

/**
 * /magento-development — softsuave.com's "Magento Development Company in India for Your Store" page, word for
 * word: the hero with its quote form, "Outsource Magento Development To Boost Your Business", "Our Magento
 * Development Services" (a list of seven links beside the seven services), the offshore-team band, the FAQs and
 * the closing consultation form. Images are under /images/magento. The page names no trial length, so there is
 * no duration to correct.
 */

export const mgMeta = {
  path: '/magento-development',
  shortTitle: 'Magento Development',
  title: 'Magento Development Company in India for Your Store',
  description:
    'Onboard Magento development company India for custom eCommerce solutions. We specialize in scalable, high-performance Magento stores with seamless integrations.',
} as const;

export const mgHero: HeroContent = {
  titleLines: ['Best Magento Development', 'Company In India'],
  accent: 'Magento Development',
  titleScale: 'home',
  accentGradient: true,
  body: [
    'Tired of searching for a reliable Magento Development Company in India? Soft Suave is your one-stop destination for all your Magento development needs.',
    'Want to Hire Magento Development Team? Get in touch for a free quote!',
  ],
  bodyOneLine: [1],
  boldBody: ['Magento Development Company in India?', 'Hire Magento Development Team?'],
  bodyLinks: [{ text: 'for a free quote!', href: '/free-quote' }],
  scrollCue: { label: 'Scroll Down', targetId: 'overview' },
  breadcrumbLabels: { '/ecommerce-mobile-app-development-company': 'eCommerce' },
  points: [],
  badges: partnerHeroBadges,
  form: {
    eyebrow: "Let's Discuss Your Project",
    title: 'Get free rough quote in 24 hrs',
    alert: sharedHeroAlert,
    submit: 'Submit',
    sending: 'Sending...',
    requirementLabel: 'Requirement',
    requirementPlaceholder: 'Tell us about your Magento requirement.',
    subject: 'Magento Development enquiry',
  },
};

/** A paragraph's pieces: plain text, an inline link, or bold words. */
export type Piece = string | { readonly text: string; readonly href: string } | { readonly b: string };

export const mgAbout = {
  title: 'Outsource Magento Development To Boost Your Business',
  body: 'Become a market leader in eCommerce by crafting an eCommerce App with rich user experiences.',
  paragraphs: [
    [
      'We are an experienced Magento Development Company in India offering all kinds of ',
      { text: 'eCommerce Development services', href: '/ecommerce-mobile-app-development-company' },
      '. Our skilled Magento developers can bring your eCommerce idea into a stunning online store with a flexible shopping cart system, great functionality, handy catalog-management tools, and much more attractive features. Our ability to deliver successful Magento web development to startups and SMBs consistently makes us the industry leader.',
    ],
    [
      'We build a strong shopping system with smart search, instant support, push notification options to ensure you engage with your customers constantly in an easy way. Hence, you can provide a great user experience and increase the sales volume by opting for our outstanding Magento development services.',
    ],
  ] as readonly (readonly Piece[])[],
  image: { src: '/images/magento/overview.webp', width: 500, height: 424, alt: 'Magento Development Company Soft Suave' },
} as const;

export const mgServices = {
  title: 'Our Magento Development Services',
  body: `Soft Suave is a pre-eminent Magento development company offering a wide range of eCommerce solutions for more than ${YEARS_PLUS} years. Our paramount Magento development services include;`,
  cta: { label: 'Talk To Experts', href: '/free-quote' },
  items: [
    {
      id: 'service_box_01',
      name: 'Customized Magento Web Development',
      paragraphs: [
        ["Our Magento developers can produce an influential eCommerce application customized for your specific business requirements. We can effectively utilize Magento's advanced programming, custom extensions, and unique designs to build B2B or B2C web applications."],
        [`Expert Magento programmers at Soft Suave have adequate knowledge to design, build and create engaging as well as attractive customized extensions that make our digital eCommerce solutions unmatched with our competitors. Hire the web app development team from us to build a powerful Magento app. Our practice of employing custom extensions, solid documentation, and QA testing helps us to deliver exceptional Magento development services for more than ${YEARS_PLUS} years.`],
      ],
    },
    {
      id: 'service_box_02',
      name: 'Dedicated Magento Developers Team',
      paragraphs: [
        ['Our dedicated Magento team can transform your eCommerce idea into a successful project by implementing our tried and tested development process. Also, cost-effectively building a Magento eCommerce store is possible if you hire dedicated development team through our flexible hiring process.'],
        ['Get a highly responsive, customer-centric Magento website with the help of our dedicated Magento developers. We have immense experience working with small and large-scale businesses to build eCommerce stores with good theme customization and integration.'],
      ],
    },
    {
      id: 'service_box_03',
      name: 'Magento eCommerce Development',
      paragraphs: [
        [
          'Qualified developers at Soft Suave strive to create a high-quality ',
          { text: 'eCommerce multi-vendor platform', href: '/multi-vendor-marketplace-platform' },
          ' through our robust Magento development services. We implement robust extensions, integrations, and tools that assist you to conduct your business efficiently. And, our trained designers, strategists, marketers, and sales masters provide all eCommerce custom solutions at the best possible price.',
        ],
        ['Our team of skilled Magento strategists can deliver world-class eCommerce solutions. Those solutions include and are not limited to mobile optimization, incorporating parallax scrolling, AI, and Chatbots, achieving responsive micro-interactions and personalized shopping experience.'],
      ],
    },
    {
      id: 'service_box_04',
      name: 'Front-End Magento Development',
      paragraphs: [
        ["Soft Suave's superior Front-end development ensures efficient theme customization, UI components designing, and Admin panel configuration. Our Magento developers can develop a visually appealing eCommerce application in compliance with SEO standards and performance guidelines. Also, our exemplary frontend Magento services render simple usability with an interactive user interface."],
        ['Our Magento 2 front-end developers use their skill, experience, and knowledge to give the best services to pull and hold a great number of users.'],
      ],
    },
    {
      id: 'service_box_05',
      name: 'Magento Migration & Upgradation',
      paragraphs: [
        ["Hire a dedicated Magento team to upgrade your existing eCommerce web app with the latest technology and trends with complete security and zero data loss. We can improve your Magento application's functionality by migrating to the most advanced Magento version i.e., Magento 2 without affecting your existing store data, customer information, preferences, order details, and all other vital information."],
        ['Also, being a leading Magento development company, we can easily update your older Magento application with enhanced performance, a new touch-screen friendly, one-click checkout, and other helpful features.'],
      ],
    },
    {
      id: 'service_box_06',
      name: 'Magento Consulting Service',
      paragraphs: [
        ['Our eCommerce Magento consultation helps you to avoid making wrong choices while developing your first Magento application. Our experts can provide any Magento-related information with a motive to help you create a fitting eCommerce store made just for you.'],
        ['Our expertise in building a scalable Magento web or mobile app with smooth navigation, excellent functionality, awesome usability makes us the top Magento development company. Also, we can efficiently integrate third-party software for better security, fast and secured payment for an impressive customer experience.'],
      ],
    },
    {
      id: 'service_box_07',
      name: 'Magento Support & Maintenance',
      paragraphs: [
        [
          'Maintaining your eCommerce application is necessary to retain your customers. Hence, your Magento application needs regular updates of new designs and detection of any errors. When you ',
          { text: 'hire dedicated Magento team', href: '/hire-mobile-app-developers' },
          ', we provide 24/7 support and maintenance to make sure your Magento app performs consistently without any lag. Also, we can develop your existing application into a much faster one with top-quality designs to improve great customer experiences.',
        ],
        ['Conducting site audits, performing optimization, and post-development installations are done by our Magento experts in regular intervals. Manage and maintain your eCommerce store effortlessly with the help of our experienced Magento 2 developers.'],
      ],
    },
  ],
} as const;

export const mgOffshore = {
  title: 'Hire an Offshore Magento Development Team',
  before: 'Soft Suave has a pool of ',
  bold: 'Dedicated Magento Developers',
  after: ' who deliver your app development project on time and under your budget.',
  cta: { label: 'Hire Magento Developer', href: '/hire-mobile-app-developers' },
} as const;

export const mgFaqs: FaqContent = {
  eyebrow: '',
  title: 'Frequently Asked Questions',
  body: 'Know more about our processes and how we work, with the help of the following FAQs.',
  items: [
    {
      q: 'Why should I outsource you for Magento web development services?',
      a: `Soft Suave has a highly experienced team that assists us to deliver world-class Magento Development Services. We have designed and developed numerous eCommerce Apps for startups and SMBs under limited time and budget. Moreover, we have ${CLIENTS_PLUS} long-term clients who trust us in more than ${COUNTRIES_PLUS} countries.`,
    },
    {
      q: 'I need a customized theme for my Magento store. Can Soft Suave help?',
      a: 'Yes, of course. Since our developers have extensive knowledge and experience in Magento development, creating the most aesthetically pleasing themes that reflect your brand image is not a difficult task for us.',
    },
    {
      q: 'Is there a specific pricing model that you follow?',
      a: "Before fixing the price, our experienced project managers will analyze the project carefully. Based on the complexity, features, and functionality, we'll fix the most affordable and fair price.",
    },
    {
      q: 'What is the overall work experience of your Magento team?',
      a: 'Soft Suave houses a team of CMS developers, testers, UI/UX designers with an average experience of 5+ years Plus, we have full-time dedicated project managers.',
    },
    {
      q: 'Why should I use Magento for building an e-commerce store?',
      a: 'Magento is a perfect choice to build an e-commerce store because it has;',
      points: ['Profound and adaptable CMS', 'High-quality extensions', 'Ability to host many websites', 'Latest design trends', 'Wide range of SEO capabilities'],
    },
    {
      q: 'Do you build mobile-friendly Magento online stores?',
      a: 'Yes, this is one of the areas where we excel. With the help of cutting-edge tools and technologies, our highly skilled team of Magento developers build responsive mobile-friendly stores.',
    },
  ],
};
