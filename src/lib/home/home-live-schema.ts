/**
 * The homepage's JSON-LD, copied VERBATIM from softsuave.com's homepage.
 *
 * This is a deliberate one-to-one mirror of the live markup, per request —
 * not a cleaned-up version. Known quirks of the source are kept as-is and must
 * not be "fixed" here without the same change going to the live site:
 *
 * - `"@context": "http://schema.org"` on the Service (the others use https).
 * - `"UK"` in `areaServed` / `eligibleRegion` (the ISO code is GB).
 * - `price: "Variable"` and `priceValidUntil: "2025-12-31"` on the Offer.
 * - "Xamarian" in `serviceType`.
 * - Product Engineering and Cloud Computing carrying the PHP page's
 *   description, and Node.js / Java sharing one generic line.
 * - A trailing slash on the offshore URL only; `/services` as the offer URL.
 * - Instagram listed twice in the Organization's `sameAs`.
 *
 * The footer's PostalAddress microdata mirrors the live footer the same way —
 * see `footer.offices` in `content.ts`.
 */

export const liveService = {
  "@context": "http://schema.org",
  "@type": "Service",
  "name": "Softsuave Technologies",
  "url": "https://www.softsuave.com",
  "description": "Softsuave provides AI-powered IT services, custom software development, and digital transformation solutions to businesses worldwide. Leveraging cutting-edge AI and automation technologies, Softsuave accelerates product development, optimizes operations, and drives innovation across industries such as aviation, logistics, fintech, healthcare, education, and more.",
  "serviceType": [
    "AI Solutions",
    "Offshore Software Development",
    "IT Staff Augmentation",
    "Hire Dedicated Developers",
    "Legacy Modernization Services",
    "Mobile App Development",
    "Android App Development",
    "iOS Application Development",
    "Hire React Native Developers",
    "Flutter Application Development",
    "Ionic App Development",
    "Xamarian App Development",
    "Web App Development",
    "AngularJs Development",
    "Ruby on Rails Development",
    "NodeJS Development",
    "Java Development",
    "Python Development",
    "PHP Development",
    "Dot NET Development",
    "IT Outsourcing Services",
    "Product Engineering Services",
    "Cloud Computing Services"
  ],
  "provider": {
    "@type": "Organization",
    "name": "Softsuave Technologies",
    "url": "https://www.softsuave.com",
    "logo": "https://www.softsuave.com/new-assets/common/images/softsuave_logo.webp",
    "sameAs": [
      "https://www.linkedin.com/company/softsuave",
      "https://www.facebook.com/Softsuave"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1 (410) 220-6301",
        "contactType": "For Business Inquiry",
        "areaServed": "USA",
        "availableLanguage": ["English"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+44 7403 646450",
        "contactType": "For Business Inquiry",
        "areaServed": "UK",
        "availableLanguage": ["English"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91 99527 32708",
        "contactType": "For Business Inquiry",
        "areaServed": "IN",
        "availableLanguage": ["English"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3210 Vogel Rd",
      "addressLocality": "Ellicott City",
      "addressRegion": "Maryland",
      "postalCode": "21043",
      "addressCountry": "US"
    },
    "areaServed": ["US", "CA", "UK", "AU", "FR", "IT", "DE", "ES"]
  },
  "offers": {
    "@type": "Offer",
    "url": "https://www.softsuave.com/services",
    "priceCurrency": "USD",
    "price": "Variable",
    "eligibleRegion": ["US", "CA", "UK", "AU", "FR", "IT", "DE", "ES"],
    "priceValidUntil": "2025-12-31",
    "description": "Flexible pricing based on project scope, technology stack, and service requirements."
  },
  "areaServed": ["US", "CA", "UK", "AU", "FR", "IT", "DE", "ES"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Softsuave Service Catalog",
    "itemListElement": [
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/ai-development-service",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Development Service",
          "description": "Explore our expert AI development services tailored to your business needs. Transform your operations with cutting-edge AI solutions. Contact Soft Suave today!"
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/offshore-software-development-company/",
        "itemOffered": {
          "@type": "Service",
          "name": "Offshore Software development Services",
          "description": "Work with a trusted offshore software development company to reduce costs and scale quickly. Hire skilled developers and deliver quality solutions on time!"
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/it-staff-augmentation-services",
        "itemOffered": {
          "@type": "Service",
          "name": "IT Staff Augmentation Services",
          "description": "Soft Suave's IT staff augmentation services provide skilled offshore IT experts on contract to meet your project needs and scale your team effectively."
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/hire-dedicated-developers",
        "itemOffered": {
          "@type": "Service",
          "name": "Hire Dedicated Developers",
          "description": "Looking to hire dedicated developers in India On Contract? Soft Suave offers a 40-hour free trial and pricing beginning at $14. Connect with us to get started!"
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/legacy-modernization-services",
        "itemOffered": {
          "@type": "Service",
          "name": "Legacy Modernization Services",
          "description": "Looking for top legacy application modernization service providers in India and the USA? Soft Suave will revamp your existing web and mobile apps into trending apps."
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/mobile-application-development-company",
        "itemOffered": {
          "@type": "Service",
          "name": "Mobile Application Development",
          "description": "We are a leading custom mobile app development company with 1250+ projects. Our top-notch app development services cover iOS, Android, and cross-platform development."
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/android-application-development-company",
        "itemOffered": {
          "@type": "Service",
          "name": "Android App Development",
          "description": "Discover top-notch Android app development services at SoftSuave, a leading Android app development company in India"
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/ios-application-development-company",
        "itemOffered": {
          "@type": "Service",
          "name": "IOS App Development",
          "description": "Get top-notch iOS app development services in India. Partner with Soft Suave, an iOS/iPhone development company from India, to take your ideas to the next level. Contact us now!"
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/hire-react-native-developers",
        "itemOffered": {
          "@type": "Service",
          "name": "Hire React Native Developers",
          "description": "Hire react native developers in India & USA to save 60% on development costs. Hire react native developers in the USA on an hourly/full-time basis now."
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/flutter-application-development-company",
        "itemOffered": {
          "@type": "Service",
          "name": "Flutter Application Development",
          "description": "Soft Suave leads the way in Flutter app development services, delivering top-quality solutions for both iOS and Android platforms in India and the USA."
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/ionic-app-development-company",
        "itemOffered": {
          "@type": "Service",
          "name": "Ionic App Development",
          "description": "Looking for an ionic development company in India & USA that suits your budget? Build mobile Apps by outsourcing ionic development services from Soft Suave."
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/xamarin-app-development-company",
        "itemOffered": {
          "@type": "Service",
          "name": "Xamarin App Development",
          "description": "Soft Suave is a top Xamarin development company in India, offering cost-effective and reliable Xamarin app development services for startups."
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/web-application-development-company",
        "itemOffered": {
          "@type": "Service",
          "name": "Web App Development",
          "description": "Looking for the best web app development company in India? Contact us now to get a free consultation from our development team."
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/reactjs-app-development-company",
        "itemOffered": {
          "@type": "Service",
          "name": "Reactjs App Development",
          "description": "Looking for a top React.js app development company in India & USA that suits your budget. We are the leading React development services provider with 11+ years of experience."
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/angularjs-development-company",
        "itemOffered": {
          "@type": "Service",
          "name": "AngularJS Development",
          "description": "As a premier Angular development company in India, Soft Suave offers top-notch Angular development services for web applications to clients worldwide."
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/ruby-on-rails-development-company",
        "itemOffered": {
          "@type": "Service",
          "name": "Ruby on Rails Development",
          "description": "Looking for a Ruby on Rails development company in India to build web applications? Consult Soft Suave, the best ROR web development services."
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/nodejs-development-company",
        "itemOffered": {
          "@type": "Service",
          "name": "NodeJS Development",
          "description": "Providing cost-effective offshore software development services with a team of 400+ skilled developers, ensuring seamless integration, optimized workflows, and continuous innovation."
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/java-application-development-company",
        "itemOffered": {
          "@type": "Service",
          "name": "Java Development",
          "description": "Providing cost-effective offshore software development services with a team of 400+ skilled developers, ensuring seamless integration, optimized workflows, and continuous innovation."
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/python-application-development-company",
        "itemOffered": {
          "@type": "Service",
          "name": "Python Development",
          "description": "Outsource Python web development in India from a leading Python development company in India and save upto 60% Python development costs."
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/php-application-development-company",
        "itemOffered": {
          "@type": "Service",
          "name": "PHP Development",
          "description": "Searching PHP Development Company in India? Soft Suave is an award-winning PHP Web Development Company in India offering dynamic & customized PHP development services."
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/dot-net-application-development-company",
        "itemOffered": {
          "@type": "Service",
          "name": "Dot NET Development",
          "description": "Soft Suave is a leading ASP.NET development company offering comprehensive .NET development services. Partner with us for tailored solutions to meet your business needs."
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/it-outsourcing-company-india",
        "itemOffered": {
          "@type": "Service",
          "name": "IT Outsourcing",
          "description": "Looking for a reliable IT outsourcing partner? Soft Suave is a leading IT outsourcing company in India, offering expert IT outsourcing services to global clients."
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/product-engineering-services",
        "itemOffered": {
          "@type": "Service",
          "name": "Product Engineering",
          "description": "Searching PHP Development Company in India? Soft Suave is an award-winning PHP Web Development Company in India offering dynamic & customized PHP development services."
        }
      },
      {
        "@type": "Offer",
        "url": "https://www.softsuave.com/cloud-computing",
        "itemOffered": {
          "@type": "Service",
          "name": "Cloud Computing",
          "description": "Searching PHP Development Company in India? Soft Suave is an award-winning PHP Web Development Company in India offering dynamic & customized PHP development services."
        }
      }
    ]
  }
};

export const liveLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Softsuave Technologies",
  "description": "Softsuave provides AI-powered IT services, custom software development, and digital transformation solutions to businesses worldwide.",
  "url": "https://www.softsuave.com",
  "image": "https://www.softsuave.com/new-assets/common/images/softsuave_logo.webp",
  "telephone": "+1 (410) 220-6301",
  "email": "contact@softsuave.com",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3210 Vogel Rd",
    "addressLocality": "Ellicott City",
    "addressRegion": "Maryland",
    "postalCode": "21043",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 39.2804,
    "longitude": -76.8411
  },
  "openingHours": ["Mo-Fr 09:00-18:00"],
  "sameAs": [
    "https://www.linkedin.com/company/softsuave",
    "https://www.facebook.com/Softsuave"
  ],
  "areaServed": ["US", "CA", "UK", "AU", "FR", "IT", "DE", "ES"],
  "paymentAccepted": ["Credit Card", "Bank Transfer"],
  "currenciesAccepted": "USD"
};

export const liveOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Soft Suave Technologies",
  "url": "https://www.softsuave.com/",
  "logo": "https://www.softsuave.com/new-assets/common/images/softsuave_logo.webp",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91 99527 32708",
      "contactType": "sales",
      "areaServed": "IN",
      "availableLanguage": ["en", "Tamil", "Hindi"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+1 (410) 220-6301",
      "contactType": "sales",
      "areaServed": "US",
      "availableLanguage": "en"
    }
  ],
  "sameAs": [
    "https://in.linkedin.com/company/softsuave",
    "https://www.instagram.com/softsuavetech/",
    "https://www.instagram.com/softsuavetech/",
    "https://www.facebook.com/softsuave/",
    "https://www.youtube.com/@softsuave"
  ]
};

/** The live homepage's three JSON-LD blocks, in the live page's order. */
export const HOME_LIVE_JSON_LD: readonly Record<string, unknown>[] = [
  liveService,
  liveLocalBusiness,
  liveOrganization,
];
