import type { HeroContent } from '@/components/landing/hero';
import type { FaqContent } from '@/components/landing/faq';
import { partnerHeroBadges } from '@/lib/home/hero-badges';
import { sharedHeroAlert } from '@/lib/home/delivery-shared';

/**
 * /multi-vendor-marketplace-platform — softsuave.com's "Multivendor Marketplace App Development Company In
 * India" page, word for word: the hero with its quote form, "Multi Vendor eCommerce Marketplace Development",
 * the three platform cards, the four panels (mobile app, web application, super admin, vendor) beside a contents
 * column, the "build your own" band, the phone slider, "Why Choose Us", the technologies, the FAQs, the five
 * highlights and the closing consultation form. Images are under /images/multi-vendor; the hero banner is the
 * one the eCommerce package page already carries. The page names no trial length, so there is no duration to
 * correct; its hidden "free demo" popup has no markup on the live page, so those buttons go to the hero form.
 */

export const mvMeta = {
  path: '/multi-vendor-marketplace-platform',
  shortTitle: 'Multi-vendor Marketplace Platform',
  title: 'Multivendor Marketplace App Development Company In India',
  description:
    'Planning to develop a Multi Vendor Marketplace Platform application similar to Amazon, Flipkart? Get Mobile App & Website For Your Multi Vendor eCommerce Software today.',
} as const;

const IMG = '/images/multi-vendor';

export const mvHero: HeroContent = {
  titleLines: ['Multi-vendor Marketplace', 'Platform Development Company'],
  accent: 'Multi-vendor Marketplace',
  titleScale: 'home',
  accentGradient: true,
  body: [
    'Our custom multi-vendor marketplace development team will take you from concept to launch and beyond. Optimize and grow your online business with our custom eCommerce marketplace platform.',
  ],
  points: [],
  ctas: [{ label: 'Try Our Free Demo App!', href: '#enquiry' }],
  image: { src: '/images/ecommerce-package/banner.webp', width: 1208, height: 686, alt: '', still: true },
  badges: partnerHeroBadges,
  form: {
    eyebrow: "Let's Discuss Your Project",
    title: 'Get free rough quote in 24 hrs',
    alert: sharedHeroAlert,
    submit: 'Submit',
    sending: 'Sending...',
    requirementLabel: 'Requirement',
    requirementPlaceholder: 'Tell us about your multi-vendor marketplace requirement.',
    subject: 'Multi-vendor Marketplace Platform enquiry',
  },
};

/** A paragraph's pieces: plain text, an inline link, or bold words. */
export type Piece = string | { readonly text: string; readonly href: string } | { readonly b: string };

export const mvAbout = {
  title: 'Multi Vendor eCommerce Marketplace Development',
  accent: 'eCommerce Marketplace',
  body: 'Our user-friendly Multi-vendor eCommerce App can manage unlimited vendors and accelerate your business growth.',
  paragraphs: [
    [
      'The Multi-vendor marketplace is one of the most trusted and efficient business models in the eCommerce business. ',
      { b: 'Developing a Multi-vendor Marketplace' },
      ' mobile application is the most challenging and tedious task considering the competition found in the market. Rated as the best among the Top ',
      { text: 'eCommerce app development companies', href: '/ecommerce-mobile-app-development-company' },
      ', Soft Suave builds B2C multi-vendor eCommerce marketplace apps and online marketplaces with customized requirements. Moreover, the development team already owns a multi-vendor eCommerce software that facilitates clients to integrate advanced eCommerce features and get into the market within a month.',
    ],
    [
      'The development team has vast expertise and technology experts who can develop cutting-edge open source eCommerce apps with the clients’ requirements at an affordable cost. Our clients for the ',
      { b: 'Multi-vendor eCommerce Marketplace' },
      ' extends to countries like the USA, Europe, Australia, UAE, India, and Russia. With Soft Suave’s eCommerce multi-vendor solution, transform your brick store seamlessly into a B2C online store.',
    ],
    [
      'We additionally offer custom ',
      { text: 'eCommerce app development packages', href: '/ecommerce-app-development-package' },
      ' at a competitive price to allow SMBs to flourish in the eCommerce industry. Soft Suave even offers custom-tailored eCommerce marketplace solutions to fit each and every budget and business need.',
    ],
  ] as readonly (readonly Piece[])[],
  image: { src: `${IMG}/overview.webp`, width: 429, height: 394, alt: 'multi-vendor marketplace app development by Soft Suave' },
} as const;

export const mvPlatform = {
  title: 'eCommerce - Multi Vendor Marketplace Application',
  accent: 'Multi Vendor Marketplace',
  body: 'With the best eCommerce app development services, Soft Suave creates world-class Multi-Vendor Marketplace Software.',
  items: [
    {
      name: 'Multi-Vendor Platform',
      body: ['Our ', { b: 'Multi-vendor Marketplace Software' }, ' supports multiple vendors to set up their own stores and gives super admins control over all application settings including product catalogue customization.'],
      icon: `${IMG}/icons/online-shop.svg`,
      alt: 'Multi-vendor platform development company soft suave',
    },
    {
      name: 'Mobile Responsive',
      body: ['Our ', { b: 'Multi-vendor eCommerce Marketplace Application' }, ' is designed to be responsive & compatible with all mobile devices. This makes it easy and convenient for sellers to list products and manage orders easily.'],
      icon: `${IMG}/icons/mobile-responsive.svg`,
      alt: 'Mobile Responsive multi-vendor marketplace development soft suave',
    },
    {
      name: 'Online Shopping Cart',
      body: ['Our shopping cart in the eCommerce software helps in adding and managing items in the cart and is embedded with secure online & offline payment methods and facilitates applying discount coupon and guest checkout.'],
      icon: `${IMG}/icons/cart.svg`,
      alt: 'Online shopping cart development company soft suave',
    },
  ],
} as const;

export const mvPanels = {
  /** The contents column: one link per panel, then the two buttons. */
  actions: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Get Free Demo', href: '#enquiry' },
  ],
  items: [
    {
      id: 'mobileApp',
      nav: 'Mobile App',
      title: 'Multi-vendor:- Mobile Apps',
      accent: 'Mobile Apps',
      body: 'High-performance native mobile apps with attractive UI/UX for customer usage.',
      image: { src: `${IMG}/panels/mobile-app.webp`, width: 636, height: 740, alt: 'Multi-vendor Customer App development company soft suave' },
      points: [
        { name: 'Branded Customer Mobile Apps', body: ['Our customer mobile app acts as a marketplace extension to improve revenues by enhancing user engagement and their buying/selling experience.'] },
        { name: 'User-Friendly Design', body: ['Fast, intuitive & native mobile apps are designed feature-rich and user-friendly to make the customer experience satisfactory. Simplified shopping carts in our ', { b: 'Multi-vendor eCommerce Software' }, ' allows buyers to complete purchase seamlessly.'] },
        { name: 'Instant Notification', body: ['The automated notification keeps the customers updated with everything that happens relating to them in the online marketplace with the help of our multi-vendor mobile application.'] },
      ],
    },
    {
      id: 'webApp',
      nav: 'Web Application',
      title: 'Multi-vendor: Web Application',
      accent: 'Web Application',
      body: 'Personalised web application with interactive features for hassle-free shopping.',
      image: { src: `${IMG}/panels/web-app.webp`, width: 743, height: 587, alt: 'Multi-vendor Application Development company Soft Suave' },
      points: [
        { name: 'Common Marketplace Storefront', body: ['The products from the different vendors will be listed on one common ', { b: "Multi vendor's Marketplace" }, ' to make it easier for the customers.'] },
        { name: 'Multi-Vendor eCommerce', body: ['Multi-vendor marketplaces enjoy more stock and a higher number of happy customers. Adding & updating cart, tax & shipment calculation and guest checkout are made easier.'] },
        { name: 'Advanced Shopping Cart', body: ['The shopping cart in our multi-vendor web application will have options to edit and manage the purchase history. Changing & modifying the users’ orders even after placing an order are enabled.'] },
      ],
    },
    {
      id: 'adminPanel',
      nav: 'Super Admin',
      title: 'Super Admin Panel',
      accent: '',
      body: 'Compact super admin panel for stress-free product and commission management.',
      image: { src: `${IMG}/panels/super-admin.webp`, width: 723, height: 579, alt: 'Super Admin Panel' },
      points: [
        { name: 'Advanced Application Settings', body: ['The super admin will have the overall control over the features in the ', { b: 'Multi-vendor eCommerce Software' }, ' and enables them to make changes easily.'] },
        { name: 'Vendor Management', body: ['Super admin has full control over the vendor activities and also gets a detailed overview of the vendors’ performance.'] },
        { name: 'Customer Management', body: ['The admin can streamline the customers’ orders right from the order placement to delivery.'] },
      ],
    },
    {
      id: 'vendorPanel',
      nav: 'Merchant',
      title: 'Vendor Panel',
      accent: '',
      body: 'Robust vendor panel to manage products and inventory with ease.',
      image: { src: `${IMG}/panels/vendor.webp`, width: 704, height: 579, alt: 'Vendor application development company soft suave' },
      points: [
        { name: 'Advanced Dashboard and Reports', body: ['Our multi-vendor application shows advanced dashboards and reports to analyze the sales, revenue details, best-selling products, and much more happening through the platform.'] },
        { name: 'Bulk Product Import / Export', body: ['The panel is enabled to do bulk product import & export easily, thus making the process more effective for the merchants.'] },
        { name: 'Vendor Commission Management', body: ['Our ', { b: 'Multi-vendor Marketplace Application' }, ' facilitates an auto-immediate payment system that instantly transfers and splits order amount into the admin commission & seller amount.'] },
      ],
    },
  ],
} as const;

export const mvBuild = {
  title: 'Build your own Multi Vendor eCommerce Platform?',
  cta: { label: 'Get Free Demo', href: '/free-demo-app' },
} as const;

export const mvFeatures = {
  title: 'Other Features of Multi-vendor Marketplace App',
  accent: 'Multi-vendor Marketplace App',
  body: 'Gain a competitive edge by building an eCommerce App with these advanced features.',
  phone: { src: `${IMG}/screens/phone.png`, width: 380, height: 741, alt: 'Multi-vendor eCommerce marketplace app by Soft Suave' },
  screens: [1, 2, 3, 4, 5, 6].map((n) => ({
    src: `${IMG}/screens/screen-${n}.webp`,
    width: 360,
    height: 760,
    alt: `Multi-vendor marketplace app Screen ${n} by Soft Suave`,
  })),
} as const;

export const mvWhy = {
  title: 'Why Choose Us For Your Online Business?',
  accent: 'Online Business?',
  body: 'Soft Suave has a commanding experience in the eCommerce industry. The expert developers help businesses of all sizes implement creative Multi-vendor eCommerce solutions and online marketplace to accelerate growth and increase ROI instantly.',
  items: [
    { name: 'Highly Competitive Pricing Models', icon: `${IMG}/why/pricing.svg`, alt: 'Multi-vendor Marketplace Pricing Model by Soft Suave' },
    { name: 'Fully-Customized Customer, Driver & Admin Apps', icon: `${IMG}/why/apps.svg`, alt: 'Fully Customized Marketplace App by Soft Suave' },
    { name: 'Complete Pre-built Multi-vendor Marketplace App Solution', icon: `${IMG}/why/prebuilt.svg`, alt: 'Pre-built Multi-vendor Marketplace App Solution by Soft Suave' },
    { name: 'Digital Proof of Delivery for Agents', icon: `${IMG}/why/delivery.svg`, alt: 'Digital Proof of Multi-vendor Marketplace' },
    { name: 'Free Maintenance Support', icon: `${IMG}/why/maintenance.svg`, alt: 'Free Multi-vendor Marketplace Maintenance Support' },
    { name: 'Marketing Support', icon: `${IMG}/why/marketing.svg`, alt: 'Free Multi-vendor Marketplace Marketing Support' },
    { name: 'Certified Development Team', icon: `${IMG}/why/team.svg`, alt: 'Certified Multi-vendor Marketplace App Development Team' },
  ],
} as const;

export const mvTech = {
  title: 'Robust Technologies We Use',
  body: 'By employing state-of-the-art technologies, we develop custom multi vendor marketplace solutions.',
  logos: [
    { src: `${IMG}/tech/android-studio.webp`, alt: 'Android Studio', width: 200, height: 24 },
    { src: `${IMG}/tech/angular.png`, alt: 'AngularJS App Development', width: 90, height: 96 },
    { src: `${IMG}/tech/broadleaf.webp`, alt: 'Broadleaf Commerce App Development', width: 150, height: 72 },
    { src: `${IMG}/tech/ionic.png`, alt: 'Ionic Application Development Company Soft Suave', width: 200, height: 70 },
    { src: `${IMG}/tech/java.webp`, alt: 'Java Application Development Company', width: 140, height: 78 },
    { src: `${IMG}/tech/react.png`, alt: 'React Application Development Company', width: 100, height: 90 },
  ],
} as const;

export const mvFaqs: FaqContent = {
  eyebrow: '',
  title: 'Frequently Asked Questions',
  body: 'Know more about our multi vendor marketplace and how it operates.',
  links: [{ text: 'eCommerce app development company', href: '/ecommerce-mobile-app-development-company' }],
  items: [
    {
      q: 'What is a multi-vendor marketplace?',
      a: 'The multi-vendor marketplace is a platform for third-party sellers to sell at one place. All the vendors and sellers pay a wise commission for selling in the marketplace. Although these sellers have a different business model, they sell at a single place.',
    },
    {
      q: 'How to charge vendors on the marketplace platform?',
      a: 'When you use our Multi-vendor Marketplace Platform, you can charge vendors through commission. Moreover, you can also charge them a monthly subscription to display their products on your platform.',
    },
    {
      q: 'How to build a multi-vendor marketplace broadleaf?',
      a: 'If you want to develop a Multi-vendor Marketplace Software in broadleaf, you need to get in touch with the leading eCommerce app development company like us. Although broadleaf limits the feature integration, our developers can help you with an innovative solution.',
    },
    {
      q: 'What to know about running a multi-vendor marketplace?',
      a: 'Developing a multi-vendor marketplace is easy but managing the platform is challenging. However, with Soft Suave’s multi-vendor marketplace solution, all the business, inventory, and commission management is effortless.',
    },
    {
      q: 'How to build a marketplace website with multi-vendor functions?',
      a: 'Consulting an eCommerce app development company like us is the best choice to do when you build a Multivendor Marketplace Website. We offer multiple solutions that fit your budget and business needs. Moreover, our developers build the marketplace website with all the multi-vendor functions.',
    },
    {
      q: 'Can the multi-vendor marketplace show products by separate shops?',
      a: 'Yes, we can show products by separate shops. Besides Multi-vendor marketplace platform from Soft Suave can be customized to display products according to your necessity and filters.',
    },
  ],
};

export const mvHighlights = [
  { name: 'One Time Payment', icon: `${IMG}/icons/one-time-payment.png`, alt: 'One time payment' },
  { name: 'Free Setup', icon: `${IMG}/icons/free-setup.png`, alt: 'Free Setup' },
  { name: 'Access Source Code', icon: `${IMG}/icons/source-code.png`, alt: 'Source Code Guranteed' },
  { name: 'Expert Support', icon: `${IMG}/icons/expert-support.png`, alt: 'Import & Export' },
  { name: 'Fully Customizable', icon: `${IMG}/icons/fully-customizable.png`, alt: 'Fully Customizable' },
] as const;
