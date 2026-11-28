import type { HeroContent } from '@/components/landing/hero';
import { sharedHeroAlert } from '@/lib/home/delivery-shared';

/**
 * /retail-solutions — softsuave.com's "Best Retail App Development Company India & USA" page, word for word:
 * the hero with its quote form, the seventeen special features, the four special add-ons, and the closing
 * consultation form (the site's own, which already reads as the live one does). Images are under /images/retail.
 * The standfirst under "Special Add-Ons that we offer" is the live page's own placeholder text, kept as it reads.
 * The page names no trial or duration, so there is no figure to correct to 40 hours.
 */

export const retailMeta = {
  path: '/retail-solutions',
  shortTitle: 'Retail Solutions',
  title: 'Best Retail App Development Company India & USA',
  description:
    'Soft Suave provides retail Mobile App development services with online shopping cart solutions in India. With online store you can manage inventory orders, offer multiple payment method, manage shipping tax, offer discount coupon and etc.',
} as const;

const IMG = '/images/retail';

export const retailHero: HeroContent = {
  titleLines: ['Custom Retail Solutions Experts'],
  accent: 'Retail Solutions',
  titleScale: 'home',
  accentGradient: true,
  body: ['Best retail solutions company creating feature-rich back-end without compromising on the performance.'],
  points: [],
  ctas: [{ label: 'Get Free Quote Now', href: '/free-quote' }],
  form: {
    title: 'Get Your FREE Quote Now!',
    alert: sharedHeroAlert,
    submit: 'Submit',
    sending: 'Sending...',
    requirementLabel: 'How Can We Help (Requirement)',
    requirementPlaceholder: 'How Can We Help (Requirement)',
    subject: 'Best Retail App Development Company India & USA',
  },
};

export const retailFeatures = {
  title: 'Special Features that we offer',
  accent: 'Special Features',
  body: 'We believe in integrating technology into people’s daily lives. Bringing your business online helps your customers to buy what they need from anywhere and everywhere. Customers can be shopping online from a desktop or mobile app, or by telephone and the experience would be seamless.',
  lead: 'The omnichannel shopping experience for customers from the comfort of their homes. Soft Suave can help you in achieving this by providing these exquisite features;',
  items: [
    { name: 'Neighborhood Filtering', body: 'Do not serve everyone! Serving only those customers in your neighborhood by filtering them based on their areas.' },
    { name: 'Flexible Delivery Charges', body: 'Calculating delivery charges depending on the location of the customer.' },
    { name: 'Variable Minimum Order Amount', body: 'Ensuring a minimum profit amount per order by not letting customers place the order before reaching a minimum order amount. Also,the minimum order charge varies based on the customer’s location.' },
    { name: 'Quantity Limit', body: 'Maximum order quantity per product.' },
    { name: 'Easy-to-use and Secure Shopping Cart', body: 'Enabling easy shopping, secure methods of payment, express checkout options, and customer accounts for research and making purchasing decisions.' },
    { name: 'World’s Most Powerful Search – Solr Search Platform', body: 'Solr search offers - Fast search results and indexing, Built-in support for rich auto-suggestions, and Powerful product recommendation capabilities.' },
    { name: 'Reordering', body: 'Customers can check for their activity history and can reorder from the previous orders.' },
    { name: 'Modifying a Placed Order', body: 'Enabling chat facility with the delivery associate allows customers to make alterations to an existing order.' },
    { name: 'Digital Wallet', body: 'Simple & Secured digital wallet transaction automated using one-time password sent to the registered phone number.' },
    { name: 'Customizable Delivery Slots', body: 'Delivery slots are booked on a first come first serve basis. Customers can choose either a specific delivery slot or the next available slot.' },
    { name: 'Third Party Payment Gateway Integrations', body: 'Seamless integration of all possible payment options which are used by the majority of customers.' },
    { name: 'Mobile-based Login / Social Login', body: 'Customers can log in according to their convenience either by using their sign in credentials or through social logins such as Facebook or Google.' },
    { name: 'Live Order Tracking', body: 'Letting your customers track their order at all times, from your store to their doorstep.' },
    { name: 'Create Shopping List', body: 'Customers can create a shopping list as and when they remember and then can add the shopping list to the cart.' },
    { name: 'Guest Checkout', body: 'Customers can make a purchase from your store without logging in to an account or save any information in your database. Not force filling of any forms increases customer experience with your store.' },
    { name: 'Pay Through Online After Delivery', body: 'Enabling paying through online after delivery is a unique feature which most of them don’t offer. The more options you provide to your customers, the more customers you get.' },
    { name: 'Filter Options', body: 'Narrowing down customer’s search using a filter option to find the product they want.' },
  ],
} as const;

/** One add-on: a title, a lead line, its bullets (a bold lead-in where the live page has one), and its picture. */
export interface RetailAddon {
  readonly name: string;
  readonly lead: string;
  readonly points: readonly { readonly b?: string; readonly text: string }[];
  readonly image: { readonly src: string; readonly width: number; readonly height: number; readonly alt: string };
}

export const retailAddons = {
  title: 'Special Add-Ons that we offer',
  accent: 'Special Add-Ons',
  body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate vel incidunt ex, vitae, reiciendis quae libero impedit temporibus inventore totam dicta modi ratione esse nisi!',
  connector: { src: `${IMG}/right-img.webp`, width: 617, height: 167 },
  items: [
    {
      name: 'Multi-Store Enablement',
      lead: 'Bring all your products from different outlets on a single selling platform.',
      points: [
        { text: 'Retailers having multiple outlets can make use of this customized feature which enables easy selling and managing.' },
        { text: 'The product inventory of multiple outlets is maintained on one platform enabling omnichannel selling.' },
        { text: 'Everything is controlled via a single dashboard with Flexible architecture for maximum versatility.' },
      ],
      image: { src: `${IMG}/diagram-multi-store2A.webp`, width: 350, height: 322, alt: 'Multi-Store Enablement' },
    },
    {
      name: 'Integrating ERP, Billing and Inventory systems',
      lead: 'Soft Suave helps to integrate your existing billing, ERP, and inventory systems into the e-commerce solution which enables seamless functioning of the overall system.',
      points: [
        { text: 'Streamlining inventory synchronization, track updates, and provide accurate inventory levels to customers, without hiring staff to manage these tasks.' },
        { text: 'Sending Automatic notifications for customers when orders have been shipped and allow them to track the delivery of products.' },
        { text: 'Handling increased demand for online orders without the need to add extra resources to cater for it.' },
        { text: 'Seamlessly integrating orders and billing to generate accurate invoices.' },
      ],
      image: { src: `${IMG}/retailing5-1.webp`, width: 400, height: 291, alt: 'Multi-Store Enablement' },
    },
    {
      name: 'Delivery Tracking App',
      lead: 'Be able to track the orders when left for delivery by installing a delivery tracking app on your delivery associate’s phone. This feature can be customized according to your needs.',
      points: [
        { text: 'Letting customers chat with the delivery associate for any changes in the order.' },
        { text: 'Customers ensuring their availability by checking the approximate delivery time.' },
      ],
      image: { src: `${IMG}/5_nexus5x-portrait.webp`, width: 2000, height: 2000, alt: 'Multi-Store Enablement' },
    },
    {
      name: 'Google Analytics Integration',
      lead: 'Integrated Google analytics and measure the number of visits, transactions, and revenue that your website generates. Real-time inventory and easy to understand sales reports ensure that you are on top of your store’s performance, at any time of day.',
      points: [
        { b: 'E-commerce tunneling :', text: 'Every report in the Google Analytics can be switched to an e-commerce version so you can see exactly how you’re making money.' },
        { b: 'Product-level data :', text: 'You can now get a thorough overview of the performance of the conversion funnel for a single product.' },
        { b: 'Shopping behavior :', text: 'Customer’s shopping behavior in different time periods can be analyzed. You can get to know current shopping trend and then plan accordingly.' },
        { b: 'Checkout behavior :', text: 'Checkout conversion can be inspected for better analysis.' },
      ],
      image: { src: `${IMG}/google-analytics.svg`, width: 512, height: 176, alt: '' },
    },
  ] as readonly RetailAddon[],
} as const;
