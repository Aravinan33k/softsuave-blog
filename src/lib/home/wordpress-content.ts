import type { HeroContent } from '@/components/landing/hero';
import type { FaqContent } from '@/components/landing/faq';
import { sharedHeroAlert } from '@/lib/home/delivery-shared';
import { COUNTRIES_PLUS, YEARS_PLUS } from '@/lib/company-figures';

/**
 * /wordpress-development-company — softsuave.com's "Offshore WordPress Development India at Affordable Rates" page,
 * word for word: the hero with its quote form, "Unparalleled WordPress Development Company", "Our Wordpress
 * Development Services Offerings" (a list of six links beside the six services), the
 * offshore-team band, the FAQs and the closing consultation form (the site's own, which already reads as the live
 * one does). The one image is under /images/wordpress; the services carry no icons. The live "13+ years / 21+ countries" in the first answer is the
 * site's own figures here. The page names no trial length, so there is no duration to correct.
 */

export const wpMeta = {
  path: '/wordpress-development-company',
  shortTitle: 'WordPress Development',
  title: 'Offshore WordPress Development India at Affordable Rates',
  description:
    'Get expert offshore WordPress development in India. We offer custom solutions and high-performance designs tailored to your business needs.',
} as const;

export const wpHero: HeroContent = {
  titleLines: ['Best Wordpress Development', 'Company In India'],
  accent: 'Wordpress Development',
  titleScale: 'home',
  accentGradient: true,
  body: [
    'Tired of searching for a reliable Wordpress Development Company in India? Soft Suave is your one-stop destination for all your Wordpress development needs.',
    'Want to Hire Wordpress Development Team? Get in touch for a free quote!',
  ],
  bodyOneLine: [1],
  boldBody: ['Wordpress Development Company in India?', 'Hire Wordpress Development Team?'],
  bodyLinks: [{ text: 'for a free quote!', href: '/free-quote' }],
  scrollCue: { label: 'Scroll Down', targetId: 'overview' },
  points: [],
  form: {
    eyebrow: "Let's Discuss Your Project",
    title: 'Get free rough quote in 24 hrs',
    alert: sharedHeroAlert,
    submit: 'Submit',
    sending: 'Sending...',
    requirementLabel: 'How Can We Help(Requirement)',
    requirementPlaceholder: 'How Can We Help(Requirement)',
    subject: 'Offshore WordPress Development India at Affordable Rates',
  },
};

/** A paragraph's pieces: plain text, an inline link, or bold words. */
export type Piece = string | { readonly text: string; readonly href: string } | { readonly b: string };

const IMG = '/images/wordpress';

export const wpAbout = {
  title: 'Unparalleled WordPress Development Company',
  accent: 'WordPress Development',
  body: 'Improve your digital presence and skyrocket sales with our high-quality, robust, and end-to-end WordPress development.',
  paragraphs: [
    [
      'Soft Suave, being the leading ',
      { b: 'Wordpress Development Company in India' },
      ', gives you the perfect and customised WordPress solution to all your business needs.',
    ],
    [
      'Soft Suave takes WordPress development to another level by offering clients with fast & secure ',
      { b: 'WordPress Development Services' },
      '. Our developers start the development service from conceptualisation to deployment, making it easy for the clients to invest and see the results on their website. Soft Suave makes sure to cover most of the WordPress development services that facilitate in business growth.',
    ],
    [
      'Wordpress developers have 5+ years of experience and are skilled to provide -friendly solutions that are cost-effective and tailor-made to meet our clients’ business needs. We are also proficient at converting any website into a WordPress website without reducing the quality.',
    ],
  ] as readonly (readonly Piece[])[],
  image: { src: `${IMG}/wordpress-img.webp`, width: 500, height: 436, alt: 'Wordpress Development Company Soft Suave' },
} as const;

export const wpServices = {
  title: 'Our Wordpress Development Services Offerings',
  accent: 'Wordpress Development',
  body: 'We work with the latest trends and best practices for high-quality WordPress Solutions.',
  cta: { label: 'Talk To Experts', href: '/free-quote' },
  items: [
    {
      id: 'service_box_01',
      nav: 'WordPress Installation & Configuration',
      name: 'Wordpress Installation & Configuration',
      paragraph: ['Developers in Soft Suave have vast experience in WordPress, thus make installation & configuration stress-free. We give your business a new level of growth by configuring WordPress into your websites and make everyday tasks simple & secure.'],
    },
    {
      id: 'service_box_02',
      nav: 'WordPress Migration',
      name: 'Wordpress Migration',
      paragraph: ['Soft Suave makes even the most complex tasks simple with the help of our industry and technology expertise developers. WordPress migration is a complex task, but our developers make the migration swiftly making sure there is no loss of data during the process.'],
    },
    {
      id: 'service_box_03',
      nav: 'WordPress Plugin Development',
      name: 'Wordpress Plugin Development',
      paragraph: ['With the widespread increase in demand in the business needs, Soft Suave steps up and develops custom plugins and extensions for the WordPress platform. We help you extend the functionality of your website with the plugins designed to fit in your business needs.'],
    },
    {
      id: 'service_box_04',
      nav: 'WordPress eCommerce Solutions',
      name: 'Wordpress eCommerce Solutions',
      paragraph: ['Soft Suave provides all the assistance to create a robust and functional eCommerce Website. Our developers tailor it according to your requirement with the necessary plugins that make your website effective and compete with big brands in the market.'],
    },
    {
      id: 'service_box_05',
      nav: 'WordPress CMS Development',
      name: 'Wordpress CMS Development',
      paragraph: ['Content creation is no more a complicated task when you start your services with Soft Suave. We use the features in WordPress and develop a website that is easy to manage, update content according to your need and matches your functional requirements.'],
    },
    {
      id: 'service_box_06',
      nav: 'Hire WordPress Development Team',
      name: 'Hire WordPress Development Team',
      paragraph: [
        'Soft Suave provides you with options to ',
        { text: 'hire WordPress developers', href: '/hire-mobile-app-developers' },
        ' to work on your tasks at an affordable price. The expertise and hands-on experience in WordPress make them the best choice above the competitors.',
      ],
    },
  ] as readonly {
    readonly id: string;
    readonly nav: string;
    readonly name: string;
    readonly paragraph: readonly Piece[];
  }[],
} as const;

export const wpOffshore = {
  title: 'Hire an Offshore Wordpress Development Team',
  before: 'Soft Suave has a pool of ',
  bold: 'Dedicated Wordpress Developers',
  after: ' who deliver your app development project on time and under your budget.',
  cta: { label: 'Hire Wordpress Developer', href: '/hire-mobile-app-developers' },
} as const;

export const wpFaqs: FaqContent = {
  eyebrow: '',
  title: 'Frequently Asked Questions',
  body: 'Know more about our processes and how we work, with the help of the following FAQs.',
  items: [
    {
      q: 'Why should I outsource Soft Suave for WordPress development services?',
      a: `Soft Suave is an award-winning WordPress development company with top-rated WordPress developers. We are operating for more than ${YEARS_PLUS} years in ${COUNTRIES_PLUS} countries. Plus, we maintain an excellent client retention rate.`,
    },
    {
      q: 'Do you offer custom plug-ins and themes?',
      a: 'Yes. We offer customized plug-ins and themes that have the power to attract more users. We make sure these themes, layouts, or plug-ins work exceptionally well on several platforms.',
    },
    {
      q: 'Can I check my WordPress website during the development process?',
      a: "Yes, you'll have complete liberty to check the progress of your WordPress website development at any time. You can even add additional features or change designs. In the final stage, we'll send it to you for final approval.",
    },
    {
      q: 'I have a WordPress website and it needs to be updated. Can you help?',
      a: 'Yes, we have a dedicated team of WordPress developers who can update your website to the latest version.',
    },
    {
      q: 'Which pricing model do you prefer for WordPress development projects?',
      a: 'Every project is different, hence, we conduct a comprehensive analysis of the project complexity, level of customization, and functionality needed. This helps us to give a fair and accurate price quote. Talk with our project managers now to know the exact price estimation.',
    },
  ],
};
