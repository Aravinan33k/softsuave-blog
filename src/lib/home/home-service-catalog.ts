import { cloudMeta } from './cloud-computing-content';
import { javaMeta } from './java-content';
import { njMeta } from './nodejs-content';
import { prodMeta } from './product-engineering-content';

/**
 * The homepage `Service` node's offer catalogue: one entry per service page
 * the company sells from, in the order the SEO brief lists them.
 *
 * `path` is a route this app serves — `home-seo.test.ts` checks each one
 * against `app/(marketing)` so a renamed or deleted page cannot leave the
 * catalogue pointing at a 404.
 *
 * Descriptions are the brief's own copy, with four exceptions that take the
 * page's meta description instead: in the brief, Product Engineering and Cloud
 * Computing both carried the PHP page's text, and Node.js and Java shared one
 * generic offshore line. Reading those four from the pages' own content modules
 * keeps the markup describing what each page actually says.
 */
export interface CatalogService {
  readonly name: string;
  readonly path: string;
  readonly description: string;
}

export const HOME_SERVICE_CATALOG: readonly CatalogService[] = [
  {
    name: 'AI Development Service',
    path: '/ai-development-service',
    description:
      'Explore our expert AI development services tailored to your business needs. Transform your operations with cutting-edge AI solutions. Contact Soft Suave today!',
  },
  {
    name: 'Offshore Software Development Services',
    path: '/offshore-software-development-company',
    description:
      'Work with a trusted offshore software development company to reduce costs and scale quickly. Hire skilled developers and deliver quality solutions on time!',
  },
  {
    name: 'IT Staff Augmentation Services',
    path: '/it-staff-augmentation-services',
    description:
      "Soft Suave's IT staff augmentation services provide skilled offshore IT experts on contract to meet your project needs and scale your team effectively.",
  },
  {
    name: 'Hire Dedicated Developers',
    path: '/hire-dedicated-developers',
    description:
      'Looking to hire dedicated developers in India On Contract? Soft Suave offers a 40-hour free trial and pricing beginning at $14. Connect with us to get started!',
  },
  {
    name: 'Legacy Modernization Services',
    path: '/legacy-modernization-services',
    description:
      'Looking for top legacy application modernization service providers in India and the USA? Soft Suave will revamp your existing web and mobile apps into trending apps.',
  },
  {
    name: 'Mobile Application Development',
    path: '/mobile-application-development-company',
    description:
      'We are a leading custom mobile app development company with 1250+ projects. Our top-notch app development services cover iOS, Android, and cross-platform development.',
  },
  {
    name: 'Android App Development',
    path: '/android-application-development-company',
    description:
      'Discover top-notch Android app development services at Soft Suave, a leading Android app development company in India.',
  },
  {
    name: 'iOS App Development',
    path: '/ios-application-development-company',
    description:
      'Get top-notch iOS app development services in India. Partner with Soft Suave, an iOS/iPhone development company from India, to take your ideas to the next level. Contact us now!',
  },
  {
    name: 'Hire React Native Developers',
    path: '/hire-react-native-developers',
    description:
      'Hire react native developers in India & USA to save 60% on development costs. Hire react native developers in the USA on an hourly/full-time basis now.',
  },
  {
    name: 'Flutter Application Development',
    path: '/flutter-application-development-company',
    description:
      'Soft Suave leads the way in Flutter app development services, delivering top-quality solutions for both iOS and Android platforms in India and the USA.',
  },
  {
    name: 'Ionic App Development',
    path: '/ionic-app-development-company',
    description:
      'Looking for an ionic development company in India & USA that suits your budget? Build mobile Apps by outsourcing ionic development services from Soft Suave.',
  },
  {
    name: 'Xamarin App Development',
    path: '/xamarin-app-development-company',
    description:
      'Soft Suave is a top Xamarin development company in India, offering cost-effective and reliable Xamarin app development services for startups.',
  },
  {
    name: 'Web App Development',
    path: '/web-application-development-company',
    description:
      'Looking for the best web app development company in India? Contact us now to get a free consultation from our development team.',
  },
  {
    name: 'ReactJS App Development',
    path: '/reactjs-app-development-company',
    description:
      'Looking for a top React.js app development company in India & USA that suits your budget. We are the leading React development services provider with 11+ years of experience.',
  },
  {
    name: 'AngularJS Development',
    path: '/angularjs-development-company',
    description:
      'As a premier Angular development company in India, Soft Suave offers top-notch Angular development services for web applications to clients worldwide.',
  },
  {
    name: 'Ruby on Rails Development',
    path: '/ruby-on-rails-development-company',
    description:
      'Looking for a Ruby on Rails development company in India to build web applications? Consult Soft Suave, the best ROR web development services.',
  },
  { name: 'NodeJS Development', path: njMeta.path, description: njMeta.description },
  { name: 'Java Development', path: javaMeta.path, description: javaMeta.description },
  {
    name: 'Python Development',
    path: '/python-application-development-company',
    description:
      'Outsource Python web development in India from a leading Python development company in India and save upto 60% Python development costs.',
  },
  {
    name: 'PHP Development',
    path: '/php-application-development-company',
    description:
      'Searching PHP Development Company in India? Soft Suave is an award-winning PHP Web Development Company in India offering dynamic & customized PHP development services.',
  },
  {
    name: 'Dot NET Development',
    path: '/dot-net-application-development-company',
    description:
      'Soft Suave is a leading ASP.NET development company offering comprehensive .NET development services. Partner with us for tailored solutions to meet your business needs.',
  },
  {
    name: 'IT Outsourcing',
    path: '/it-outsourcing-company-india',
    description:
      'Looking for a reliable IT outsourcing partner? Soft Suave is a leading IT outsourcing company in India, offering expert IT outsourcing services to global clients.',
  },
  { name: 'Product Engineering', path: prodMeta.path, description: prodMeta.description },
  { name: 'Cloud Computing', path: cloudMeta.path, description: cloudMeta.description },
];
