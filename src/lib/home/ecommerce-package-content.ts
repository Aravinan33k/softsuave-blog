import type { HeroContent } from '@/components/generative-ai/hero';
import { heroForm } from '@/lib/home/hire-roles/shared';
import type { Piece } from '@/lib/home/construction-time-tracking-content';

/**
 * /ecommerce-app-development-package — softsuave.com's eCommerce app development package page, word for
 * word: the banner with its demo form, the three platforms, the package and price table, and the closing
 * "build your own multi vendor ecommerce platform" band. Images are under /images/ecommerce-package.
 */

export const ecomMeta = {
  path: '/ecommerce-app-development-package',
  shortTitle: 'Ecommerce App Development Package',
  title: 'Ecommerce App Development Packages & Pricing Structure',
  description:
    'Kickstart the digitization of your business with our custom made mobility Solution that is part of a comprehensive Ecommerce App development Package/Price.',
} as const;

const IMG = '/images/ecommerce-package';

export const ecomHero: HeroContent = {
  titleLines: ['Custom eCommerce App Development Package. We got it covered!'],
  accent: 'eCommerce App Development Package',
  titleScale: 'home',
  body: ['Soft Suave helps you add custom functionality and make your eCommerce business effortless.'],
  points: [],
  background: { src: `${IMG}/banner.webp` },
  ctas: [{ label: 'Try Our Free Demo App!', href: '#enquiry' }],
  form: heroForm({
    title: 'Get Your FREE Demo Now!',
    requirementLabel: 'How Can We Help (Requirement)',
    requirementPlaceholder: 'How Can We Help(Requirement)',
    subject: 'eCommerce app development package enquiry',
    noEyebrow: true,
  }),
};

export const ecomSolutions = {
  title: 'Custom-tailored eCommerce Solutions',
  accent: 'eCommerce Solutions',
  body: [
    'Soft Suave provides customer-centric and ',
    { text: 'custom-tailored eCommerce solutions', href: '/ecommerce-mobile-app-development-company' },
    ' that facilitate SMBs and small-scale startups in setting up the ultimate customized eCommerce store for their businesses.',
  ] as readonly Piece[],
  items: [
    {
      name: 'Shopify Development',
      icon: `${IMG}/shopify.svg`,
      alt: 'Multi-vendor platform development company soft suave',
      body: 'Soft Suave offers a wide range of custom Shopify development solutions that make eCommerce preferable and affordable for clients with the help of expert Shopify developers skillful in custom sales-ready storefronts and applications.',
    },
    {
      name: 'WooCommerce Development',
      icon: `${IMG}/woocommerce.svg`,
      alt: 'Mobile Responsive multi-vendor marketplace development soft suave',
      body: 'Soft Suave is a most reliable WooCommerce development company in India that offers exceptional custom WooCommerce development services ranging from designing, development, payment gateway integration, support & maintenance.',
    },
    {
      name: 'Broadleaf Development',
      icon: `${IMG}/broadleaf.svg`,
      alt: 'Online shopping cart development company soft suave',
      body: 'Developers in Soft Suave are proficient in developing the ultimate user-friendly eCommerce store with simplified yet advanced product lookup at an affordable cost in Broadleaf platform. Their core expertise involves single and multi-vendor app development.',
    },
  ],
} as const;

/** One piece of a table cell. */
export type CellFrag =
  | string
  | { readonly icon: 'yes' | 'no' }
  | { readonly br: true }
  | { readonly star: string }
  | { readonly small: string }
  | { readonly price: { readonly cur: string; readonly amount: string } };

export type PackageRow =
  | { readonly section: string }
  /** `lines` are the rows the head cell spans; each line holds one cell per platform. */
  | { readonly head: string; readonly lines: readonly (readonly (readonly CellFrag[])[])[] };

export const ecomPackage = {
  title: 'Package & Prices',
  body: 'Partner with Soft Suave and build the most profitable eCommerce business at an affordable cost. The prices of the eCommerce solutions offered by Soft Suave solely depends on the amount of customization. As the customizations incur extra effort and time, the rates differ accordingly with it.',
  columns: ['SHOPIFY', 'WOOCOMMERCE', 'BROADLEAF (MULTI-VENDOR)'],
  note: { star: 'Note : **', text: ' Partner Subscription Charges (Not included in Soft Suave billing)' },
  rows: [
  {"head": "Base Price", "lines": [[[{"price": {"cur": "USD$", "amount": "2,520"}}], [{"price": {"cur": "USD$", "amount": "4,380"}}], [{"price": {"cur": "USD$", "amount": "7,800"}}]]]},
  {"head": "Products", "lines": [[["< 100 Products"], ["< 1000 Products"], ["1000+ Products"]]]},
  {"section": "TIME"},
  {"head": "Duration", "lines": [[["3 Weeks"], ["3 to 6 Weeks"], ["4 to 12 Weeks"]]]},
  {"section": "FEATURES"},
  {"head": "Customer Mobile App", "lines": [[[{"icon": "yes"}, "Price: From $20/Month ", {"star": "**"}, {"br": true}, "(Shopify Partner)", {"br": true}, "Development time: 1 Week", {"br": true}, "+", {"br": true}, "Customization charges: $500."], [{"icon": "yes"}, "Price: From $20/Month ", {"star": "**"}, {"br": true}, "(WooCommerce Partner)", {"br": true}, "Development time: 1 Week", {"br": true}, "+", {"br": true}, "Customization charges: $500."], [{"icon": "yes"}, "Free eCommerce mobile app"]]]},
  {"head": "Product Details", "lines": [[["20 image uploads for testing - Free"], ["20 image uploads for testing - Free"], ["20 image uploads for testing - Free"]], [[{"icon": "yes"}, "The client must provide custom descriptions and price details."], [{"icon": "yes"}, "The client must provide custom descriptions and price details."], [{"icon": "yes"}, "The client must provide custom descriptions and price details."]]]},
  {"head": "SAAS / Server Charges", "lines": [[[{"icon": "yes"}, "Price: $29/Month ", {"star": "**"}, " Refer Shopify site for more details."], [{"icon": "yes"}, "Price: Up to $50/Month ", {"star": "**"}], [{"icon": "yes"}, "Price: <$100/Month ", {"star": "**"}, " ", {"small": "(Broadleaf enterprise licence charges applicable if your revenue crosses $5 million)"}, "."]]]},
  {"section": "CART MANAGEMENT"},
  {"head": "Cart Operations", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"head": "Checkout Flows", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"head": "Flexible Shipping Rates", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "no"}]]]},
  {"head": "Free SSL Certificate", "lines": [[[{"icon": "yes"}], [{"icon": "no"}], [{"icon": "no"}]]]},
  {"head": "Payment Gateways", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"section": "PRODUCT MANAGEMENT"},
  {"head": "Inventory", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"head": "Product Organization", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"head": "Import & Export", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"head": "Catalog Management", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"head": "Product Ratings and Reviews", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"head": "Product Sorting and Filtering", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"section": "ORDER MANAGEMENT"},
  {"head": "Order and Payment History", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"head": "Detailed Order Information", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"section": "CUSTOMER MANAGEMENT"},
  {"head": "Price List Management", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"head": "Registration Management", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"head": "Account Management", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"head": "Category Management", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"section": "MULTI-STORE MANAGEMENT"},
  {"head": "Refunds", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"head": "Multi-Store / Multi-Site", "lines": [[[{"icon": "no"}], [{"icon": "yes"}, "(WooCommerce Multistore plugin)"], [{"icon": "yes"}]]]},
  {"head": "Multi-Channel / Multi-Device", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"head": "Theme Customization", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "no"}]]]},
  {"head": "Multi-Language", "lines": [[[{"icon": "no"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"head": "Multi-Currency", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}, "(Required additional plugin)"], [{"icon": "yes"}]]]},
  {"section": "CONTENT MANAGEMENT"},
  {"head": "Readymade Themes (Already available 1-click set up themes)", "lines": [[[{"icon": "no"}], [{"icon": "yes"}], [{"icon": "yes"}, "(HTML)"]]]},
  {"head": "Custom Themes (Development from scratch)", "lines": [[[{"icon": "yes"}, "Price: $1000", {"br": true}, "Time: 2 to 3 Weeks"], [{"icon": "yes"}, "Price: $1000-$1500", {"br": true}, "Time: 2 to 3 Weeks"], [{"icon": "yes"}, "Price: $1000", {"br": true}, "Time: 2 to 3 Weeks"]]]},
  {"head": "Training", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"head": "Technical Support (Bugs & Minor Improvements)", "lines": [[[{"icon": "yes"}, "Free 2 Weeks tech support, thereafter $14/Hour"], [{"icon": "yes"}, "Free 3 Weeks tech support, thereafter $14/Hour"], [{"icon": "yes"}, "Free 4 Weeks tech support, thereafter $14/Hour"]]]},
  {"head": "Live Hosting Support", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"head": "Source Code Sharing", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  {"head": "Delivery Personnel Mobile App", "lines": [[[{"icon": "no"}], [{"icon": "yes"}, "Price: $1500 - $2000", {"br": true}, "Time: 4 Weeks"], [{"icon": "yes"}, "Price: $800", {"br": true}, "Time: 2 Weeks"]]]},
  {"head": "Third-party Delivery Integration", "lines": [[[{"icon": "no"}], [{"icon": "yes"}, "Price: $1000 - $1500", {"br": true}, "Time: 4 Weeks"], [{"icon": "yes"}, "Price: $1500", {"br": true}, "Time: 3 Weeks"]]]},
  {"head": "Vendor App", "lines": [[[{"icon": "no"}], [{"icon": "no"}], [{"icon": "yes"}, "Price: $1000", {"br": true}, "Time: 2 Weeks"]]]},
  {"section": "SUPPORT"},
  {"head": "24/7 Support", "lines": [[[{"icon": "yes"}], [{"icon": "yes"}], [{"icon": "yes"}]]]},
  ] as readonly PackageRow[],
} as const;

export const ecomCta = {
  title: 'Build Your Own Multi Vendor Ecommerce Platform ?',
  cta: { label: 'Get Free Demo', href: '/free-demo-app' },
} as const;
