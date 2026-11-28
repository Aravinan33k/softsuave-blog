import 'server-only';

/**
 * JSON-LD carried over verbatim from softsuave.com's live PHP pages, for the migrated pages whose
 * own schema the audit of 16 Nov found missing (FAQPage on nine pages, Product/AggregateRating,
 * Service, BreadcrumbList). Same rule as the per-page modules (see
 * `java-application-development-company.ts`): the live page's own blocks, as served.
 *
 * Two kinds of entry:
 *   - Pages listed in FULL_LIVE_SCHEMA_PAGES: these blocks ARE the page's schema (the generic
 *     WebPage block they had is gone), and the route is in PAGES_WITH_OWN_SITE_GRAPH.
 *   - The rest: only the live blocks the new page lacked, added beside its existing schema.
 *
 * Not carried over, on purpose: /generative-ai-integration-service(s) and
 * /payment-gateway-integration-services. Their live schema (Service, Breadcrumb, Product, FAQ)
 * describes "IT Staff Augmentation Services", a copy of another page's, so it would mislabel them.
 * /low-code-development-company's live WebPage block is invalid JSON; only its Service block is kept.
 * Every FAQ question here was checked to be visible on the new page.
 */

export const FULL_LIVE_SCHEMA_PAGES = ["/construction-employee-time-tracking-app", "/construction-product", "/cross-platform-application-development-company", "/field-tracking-product", "/engagement-model", "/hire-full-stack-developers-in-india", "/magento-development", "/multi-vendor-marketplace-platform", "/pos-software-development-company", "/swift-app-development-company", "/wordpress-development-company"] as const;

export const RESTORED_LIVE_LD: Readonly<Record<string, readonly object[]>> = {
  "/construction-employee-time-tracking-app": [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "When does the Employee Time Tracking Application track employee’s locations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Employee Time Tracking Application starts time tracking when the employee clocks in from the construction site. The location data will be available on real-time for the employers to monitor the time and work efficiency of the employees. Moreover, there are a few tags that will highlight if an employee is on a break."
          }
        },
        {
          "@type": "Question",
          "name": "How much data and battery power does the mobile app from the employee time tracking solution use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The data consumption is very low. It will never take more than 5% of your monthly data usage. Battery power depends based on your usage and the type of device you use."
          }
        },
        {
          "@type": "Question",
          "name": "Can I track the progress of a project based on tasks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. With our time tracking application for field workers, you can manually manage the project and make the app follow the progress of your project. You can oversee the real-time project completion data and allocate tasks to your construction field employees accordingly."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate will the payroll be processed?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Employee Time Tracking Application calculates the time and generates data in the form of timesheets. These timesheets are sent to the payroll management tool to get in sync with the resource data available in the application. Finally, you get an exact amount according to their contributions in the field. Moreover, all these payroll management processes are automated."
          }
        }
      ]
    }
  ],
  "/cross-platform-application-development-company": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "ServiceType": "Software",
          "name": "Cross-platform Mobile App Development Company in India",
          "url": "https://www.softsuave.com/cross-platform-application-development-company",
          "description": "Cross-platform app development company to build cost-effective solutions that work on multiple platforms and help the brand stand out in the market.",
          "image": "https://www.softsuave.com/assets/new-formate/cross-platform/cross-platform.svg",
          "areaServed": [
            "US",
            "CA",
            "UK",
            "AU",
            "FR",
            "IT",
            "DE",
            "ES"
          ],
          "provider": {
            "@type": "Organization",
            "name": "Soft Suave Technologies",
            "@id": "https://www.softsuave.com/"
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How to find the best cross platform App development company in India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We are the suitable company you're looking for! Soft Suave's been in the App development market for more than 9+ years and has 300+ talented developers. Moreover, we have clients in more than 21+ countries. Talk with our project managers and start your project in an instant."
          }
        },
        {
          "@type": "Question",
          "name": "Why should I hire Soft Suave for cross platform development services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We've been providing world-class cross platform development services for 9+ years and turn business ideas into an App. We have hands-on experience in various business domains that helps us to develop customized, high-performance, interactive and scalable Apps."
          }
        },
        {
          "@type": "Question",
          "name": "Can you sign a Non-disclosure agreement (NDA) for my project?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, as a trusted cross platform mobile App development company, we sign the NDA before commencing the project. It's a mandatory procedure we follow to ensure confidentiality."
          }
        },
        {
          "@type": "Question",
          "name": " What are your hiring models for cross platform App development?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer cross platform mobile App development solutions through three startup-friendly hiring models."
          }
        },
        {
          "@type": "Question",
          "name": "For developing cross platform Apps, what technologies do you use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use React Native, Flutter, Xamarin, and Ionic for the best cross platform App development services. We have dedicated developers for each technology with a minimum of 5 years of experience."
          }
        },
        {
          "@type": "Question",
          "name": "How do you provide cost-effective Multi Platform application development services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Before the commencement of the project, our highly experienced multi platform application development team carefully analyzes it and helps you choose a suitable hiring model. Then, we utilize the industry's best technology, development practices, methodologies, testing methods to develop App in quick turnover time with a motive to reduce cost."
          }
        }
      ]
    }
  ],
  "/engagement-model": [
    {
      "@context": "http://schema.org",
      "@type": "Organization",
      "name": "Soft Suave Technologies",
      "logo": "https://www.softsuave.com/assets/images/logo-1.svg",
      "url": "https://www.softsuave.com/",
      "description": "Discover Soft Suave's flexible engagement models: Dedicated Teams, Time & Materials, and Fixed Price. Boost projects with top talent and agile, cost-effective solutions.",
      "founder": [
        {
          "@type": "Person",
          "name": "Ramesh Vayavuru",
          "jobTitle": "Founder & CEO",
          "image": "https://www.softsuave.com/assets/new-formate/about/Ramesh-Founder-and-CTO.webp"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3210 Vogel Rd",
        "addressLocality": "Ellicott City",
        "addressRegion": "Maryland",
        "postalCode": "21043",
        "addressCountry": "USA"
      },
      "sameAs": [
        "https://www.facebook.com/softsuave/",
        "https://twitter.com/softsuave",
        "https://in.linkedin.com/company/softsuave",
        "https://www.instagram.com/softsuavetech/",
        "https://www.youtube.com/@softsuave"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1 (667) 274-0050",
        "contactType": "Customer Service",
        "email": "contact@softsuave.com",
        "areaServed": [
          "US",
          "CA",
          "UK",
          "AU",
          "FR",
          "IT",
          "DE",
          "ES"
        ]
      }
    }
  ],
  "/hire-full-stack-developers-in-india": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "ServiceType": "Software",
          "name": "Hire Dedicated Full Stack Developers In India On Contract",
          "url": "https://www.softsuave.com/hire-full-stack-developers-in-india",
          "description": "Are you in need of a remote senior Full Stack developer who can take care of both frontend and backend tasks to deliver an influential application for your business?",
          "image": "https://www.softsuave.com/assets/new-formate/fullstack/hire-full-stack-banner.svg",
          "areaServed": [
            "US",
            "CA",
            "UK",
            "AU",
            "FR",
            "IT",
            "DE",
            "ES"
          ],
          "provider": {
            "@type": "Organization",
            "name": "Soft Suave Technologies",
            "@id": "https://www.softsuave.com/"
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Are full-stack developers in demand?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A full-stack developer is a valuable asset to any organization. Their wide-ranging knowledge makes them flexible, adaptable, and agile. Soft Suave makes the hiring process easy if you are looking to hire a proficient full-stack developer."
          }
        },
        {
          "@type": "Question",
          "name": "Why should I hire a full-stack developer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Due to the fact that a full-stack developer can fulfill multiple roles, you do not need to hire other developers. For outstanding results, you can also choose a full-stack development company with extensive experience. Whenever you need both front-end and back-end developers, go for a full-stack developer."
          }
        },
        {
          "@type": "Question",
          "name": "Why Soft Suave is the Best place to hire Full stack developers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Soft Suave provides 1 week free trial for developers, Known for having the best remote full stack programmers, Soft Suave developers are good at understanding the tasks, have good communication skills, and adequate experience, and they are trained to be the powerhouse of all technolohy knowledge."
          }
        }
      ]
    }
  ],
  "/magento-development": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "ServiceType": "Software",
          "name": "Best Magento Development Company in India",
          "url": "https://www.softsuave.com/magento-development",
          "description": "Looking for the best Magento development company in India? Soft Suave offers Magento development services to build custom eCommerce solutions",
          "image": "https://www.softsuave.com/assets/new-formate/magento/magento-img.svg",
          "areaServed": [
            "US",
            "CA",
            "UK",
            "AU",
            "FR",
            "IT",
            "DE",
            "ES"
          ],
          "provider": {
            "@type": "Organization",
            "name": "Soft Suave Technologies",
            "@id": "https://www.softsuave.com/"
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why should I outsource you for Magento web development services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Soft Suave has a highly experienced team that assists us to deliver world-class Magento Development Services. We have designed and developed numerous eCommerce Apps for startups and SMBs under limited time and budget. Moreover, we have 150+ long-term clients who trust us in more than 21 countries."
          }
        },
        {
          "@type": "Question",
          "name": "I need a customized theme for my Magento store. Can Soft Suave help?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, of course. Since our developers have extensive knowledge and experience in Magento development, creating the most aesthetically pleasing themes that reflect your brand image is not a difficult task for us."
          }
        },
        {
          "@type": "Question",
          "name": "Is there a specific pricing model that you follow?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Before fixing the price, our experienced project managers will analyze the project carefully. Based on the complexity, features, and functionality, we'll fix the most affordable and fair price."
          }
        },
        {
          "@type": "Question",
          "name": "What is the overall work experience of your Magento team?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Soft Suave houses a team of CMS developers, testers, UI/UX designers with an average experience of 5+ years Plus, we have full-time dedicated project managers."
          }
        },
        {
          "@type": "Question",
          "name": "Why should I use Magento for building an e-commerce store?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Magento is a perfect choice to build an e-commerce store because it has,"
          }
        },
        {
          "@type": "Question",
          "name": "Do you build mobile-friendly Magento online stores?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, this is one of the areas where we excel. With the help of cutting-edge tools and technologies, our highly skilled team of Magento developers build responsive mobile-friendly stores."
          }
        }
      ]
    }
  ],
  "/multi-vendor-marketplace-platform": [
    {
      "@type": "http://schema.org/SoftwareApplication",
      "applicationCategory": "eCommerce",
      "applicationSubCategory": "Multivendor eCommerce Marketplace",
      "name": "Grabcery",
      "image": "https://www.softsuave.com/assets/new-formate/multi-vendor/multi-vendor-top-section.webp",
      "description": "Planning to develop a Multi Vendor Marketplace Platform application similar to Amazon, Flipkart? Get Mobile App & Website For Your Multi Vendor eCommerce Software today.",
      "inLanguage": "English"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a multi-vendor marketplace?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The multi-vendor marketplace is a platform for third-party sellers to sell at one place. All the vendors and sellers pay a wise commission for selling in the marketplace. Although these sellers have a different business model, they sell at a single place."
          }
        },
        {
          "@type": "Question",
          "name": "How to charge vendors on the marketplace platform?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "When you use our <b>Multi-vendor Marketplace Platform</b>, you can charge vendors through commission. Moreover, you can also charge them a monthly subscription to display their products on your platform."
          }
        },
        {
          "@type": "Question",
          "name": "How to build a multi-vendor marketplace broadleaf?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If you want to develop a <b>Multi-vendor Marketplace Software</b> in broadleaf, you need to get in touch with the leading eCommerce app development company like us. Although broadleaf limits the feature integration, our developers can help you with an innovative solution."
          }
        },
        {
          "@type": "Question",
          "name": "What to know about running a multi-vendor marketplace?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Developing a multi-vendor marketplace is easy but managing the platform is challenging. However, with Soft Suave’s multi-vendor marketplace solution, all the business, inventory, and commission management is effortless."
          }
        },
        {
          "@type": "Question",
          "name": "How to build a marketplace website with multi-vendor functions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Consulting an eCommerce app development company like us is the best choice to do when you build a <b>Multivendor Marketplace Website</b>. We offer multiple solutions that fit your budget and business needs. Moreover, our developers build the marketplace website with all the multi-vendor functions."
          }
        },
        {
          "@type": "Question",
          "name": "Can the multi-vendor marketplace show products by separate shops?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we can show products by separate shops. Besides Multi-vendor marketplace platform from Soft Suave can be customized to display products according to your necessity and filters."
          }
        }
      ]
    }
  ],
  "/pos-software-development-company": [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is POS Software?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "POS is Point Of Sales software that facilitates retailers to conduct sales efficiently. This software is specifically used to maintain the balance between inventory and sales. You can also build Custom POS softwares to input your products through a computer, iPad, and cash register."
          }
        },
        {
          "@type": "Question",
          "name": "Are POS solutions recommended for smaller organizations or larger ones?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "POS solutions are recommended for both smaller and larger organizations. However, you can customize the size of your solution based on your business needs. At Soft Suave, we are equipped to build classic POS apps and enterprise-level POS solutions at an attractive price."
          }
        },
        {
          "@type": "Question",
          "name": "Is an industry-specific POS system necessary?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, absolutely! Every industry has unique needs; thus, the industry-specific POS system is the best solution. However, depending upon your business needs, you can club the services and packages accordingly."
          }
        },
        {
          "@type": "Question",
          "name": "Why your retail business needs a POS software development?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "POS software was designed specifically for the retail business to operate smoothly and efficiently. If you want to increase your data accuracy, generate real-time reports, manage inventory and employees swiftly, your retail business needs a POS software development instantly."
          }
        },
        {
          "@type": "Question",
          "name": "Can you integrate payment gateways in the POS software?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we at Soft Suave help you integrate robust payment gateways into your POS software. This will expand your capability to receive payment through EMV chip cards, contactless payments (NFC), and mobile wallet payments such as Apple Pay, Android Pay, and Samsung Pay."
          }
        },
        {
          "@type": "Question",
          "name": "Can I transfer my data on a current POS to a new POS software system?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Soft Suave can help you transfer data from your current POS to a new POS software system. Migrating/transferring data can be challenging. However, experts at Soft Suave help you transfer data to your new POS system without losing any data."
          }
        }
      ]
    }
  ],
  "/swift-app-development-company": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "ServiceType": "Software",
          "name": "Top Swift App Development Company in India",
          "url": "https://www.softsuave.com/swift-app-development-company",
          "description": "Soft Suave provides all the swift app development services you need to achieve your business goals.",
          "image": "https://www.softsuave.com/assets/images/swift-app-development-comapny-india.png",
          "areaServed": [
            "US",
            "CA",
            "UK",
            "AU",
            "FR",
            "IT",
            "DE",
            "ES"
          ],
          "provider": {
            "@type": "Organization",
            "name": "Soft Suave Technologies",
            "@id": "https://www.softsuave.com/"
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Swift app development?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Swift app development is the process of creating mobile applications using the Swift programming language developed by Apple. Swift is a fast, powerful, and easy-to-learn programming language that is specifically designed for iOS, macOS, and watchOS platforms."
          }
        },
        {
          "@type": "Question",
          "name": "Why should I choose Soft Suave for Swift app development?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Soft Suave has a team of experienced developers who are well-versed in Swift app development. We use the latest technologies and frameworks to build high-quality, scalable, and user-friendly mobile applications that meet your business needs."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to develop a Swift app?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The time it takes to develop a Swift app depends on various factors, such as the complexity of the app, the features and functionalities required, and the level of customization needed. We provide an estimated timeline after understanding your requirements."
          }
        },
        {
          "@type": "Question",
          "name": "What is the cost of Swift app development?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Swift app development company determines cost depending on the scope of the project, the complexity of the app, and the time required to develop the app. We provide a customized quote based on your specific requirements."
          }
        },
        {
          "@type": "Question",
          "name": "How do I get started with Swift app development?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can contact us through our website or send an email to our sales team. We will get in touch with you to discuss your requirements and provide you with a customized quote."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide ongoing maintenance and support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we provide ongoing maintenance and support services to ensure that your app runs smoothly and efficiently. We offer different support packages based on your needs."
          }
        }
      ]
    }
  ],
  "/wordpress-development-company": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "ServiceType": "Software",
          "name": "Best Wordpress Development Company in India",
          "url": "https://www.softsuave.com/wordpress-development-company",
          "description": "Consult Soft Suave, the best .NET development company in India to leverage expert ASP.NET web development services and build cost-effective web apps.",
          "image": "https://www.softsuave.com/assets/new-formate/wordpress/wordpress-img.svg",
          "areaServed": [
            "US",
            "CA",
            "UK",
            "AU",
            "FR",
            "IT",
            "DE",
            "ES"
          ],
          "provider": {
            "@type": "Organization",
            "name": "Soft Suave Technologies",
            "@id": "https://www.softsuave.com/"
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why should I outsource Soft Suave for WordPress development services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Soft Suave is an award-winning WordPress development company with top-rated WordPress developers. We are operating for more than 9+ years in 21+ countries. Plus, we maintain an excellent client retention rate."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer custom plug-ins and themes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We offer customized plug-ins and themes that have the power to attract more users. We make sure these themes, layouts, or plug-ins work exceptionally well on several platforms."
          }
        },
        {
          "@type": "Question",
          "name": "Can I check my WordPress website during the development process?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you'll have complete liberty to check the progress of your WordPress website development at any time. You can even add additional features or change designs. In the final stage, we'll send it to you for final approval."
          }
        },
        {
          "@type": "Question",
          "name": "I have a WordPress website and it needs to be updated. Can you help?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we have a dedicated team of WordPress developers who can update your website to the latest version."
          }
        },
        {
          "@type": "Question",
          "name": "Which pricing model do you prefer for WordPress development projects?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every project is different, hence, we conduct a comprehensive analysis of the project complexity,  level of customization, and functionality needed. This helps us to give a fair and accurate price quote. Talk with our project managers now to know the exact price estimation."
          }
        }
      ]
    }
  ],
  "/ai-development-service": [
    {
      "@context": "http://schema.org/",
      "@type": "Product",
      "name": "Soft Suave Technologies",
      "description": "Explore our expert AI development services tailored to your business needs. Transform your operations with cutting-edge AI solutions. Contact Soft Suave today!",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "bestRating": "5",
        "ratingCount": "42"
      }
    }
  ],
  "/angularjs-development-company": [
    {
      "@context": "http://schema.org/",
      "@type": "Product",
      "name": "Soft Suave Technologies",
      "description": "As a premier Angular development company in India, Soft Suave offers top-notch Angular development services for web applications to clients worldwide.",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "ratingCount": "37"
      }
    }
  ],
  "/hire-anthropic-developers": [
    {
      "@context": "https://schema.org/",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.softsuave.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Hire Developers",
          "item": "https://www.softsuave.com/hire-dedicated-developers"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Hire Anthropic Developers",
          "item": "https://www.softsuave.com/hire-anthropic-developers"
        }
      ]
    }
  ],
  "/low-code-development-company": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "ServiceType": "Software",
          "name": "Best Low Code Development Company in India",
          "url": "https://www.softsuave.com/low-code-development-company",
          "description": "Soft Suave is a leading provider of Low-Code App Development Services in India. We deliver high-quality results using the latest low-code platforms and technologies. To learn more, contact us",
          "image": "https://www.softsuave.com/new-assets/common/images/low-code-dve.svg",
          "areaServed": [
            "US",
            "CA",
            "UK",
            "AU",
            "FR",
            "IT",
            "DE",
            "ES"
          ],
          "provider": {
            "@type": "Organization",
            "name": "Soft Suave Technologies",
            "@id": "https://www.softsuave.com/"
          }
        }
      ]
    }
  ],
  "/construction-product": [
    {
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
            "availableLanguage": [
              "English"
            ]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+44 7403 646450",
            "contactType": "For Business Inquiry",
            "areaServed": "UK",
            "availableLanguage": [
              "English"
            ]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+91 99527 32708",
            "contactType": "For Business Inquiry",
            "areaServed": "IN",
            "availableLanguage": [
              "English"
            ]
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
        "areaServed": [
          "US",
          "CA",
          "UK",
          "AU",
          "FR",
          "IT",
          "DE",
          "ES"
        ]
      },
      "offers": {
        "@type": "Offer",
        "url": "https://www.softsuave.com/services",
        "priceCurrency": "USD",
        "price": "Variable",
        "eligibleRegion": [
          "US",
          "CA",
          "UK",
          "AU",
          "FR",
          "IT",
          "DE",
          "ES"
        ],
        "priceValidUntil": "2025-12-31",
        "description": "Flexible pricing based on project scope, technology stack, and service requirements."
      },
      "areaServed": [
        "US",
        "CA",
        "UK",
        "AU",
        "FR",
        "IT",
        "DE",
        "ES"
      ],
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
    },
    {
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
      "openingHours": [
        "Mo-Fr 09:00-18:00"
      ],
      "sameAs": [
        "https://www.linkedin.com/company/softsuave",
        "https://www.facebook.com/Softsuave"
      ],
      "areaServed": [
        "US",
        "CA",
        "UK",
        "AU",
        "FR",
        "IT",
        "DE",
        "ES"
      ],
      "paymentAccepted": [
        "Credit Card",
        "Bank Transfer"
      ],
      "currenciesAccepted": "USD"
    }
  ],
  "/field-tracking-product": [
    {
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
            "availableLanguage": [
              "English"
            ]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+44 7403 646450",
            "contactType": "For Business Inquiry",
            "areaServed": "UK",
            "availableLanguage": [
              "English"
            ]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+91 99527 32708",
            "contactType": "For Business Inquiry",
            "areaServed": "IN",
            "availableLanguage": [
              "English"
            ]
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
        "areaServed": [
          "US",
          "CA",
          "UK",
          "AU",
          "FR",
          "IT",
          "DE",
          "ES"
        ]
      },
      "offers": {
        "@type": "Offer",
        "url": "https://www.softsuave.com/services",
        "priceCurrency": "USD",
        "price": "Variable",
        "eligibleRegion": [
          "US",
          "CA",
          "UK",
          "AU",
          "FR",
          "IT",
          "DE",
          "ES"
        ],
        "priceValidUntil": "2025-12-31",
        "description": "Flexible pricing based on project scope, technology stack, and service requirements."
      },
      "areaServed": [
        "US",
        "CA",
        "UK",
        "AU",
        "FR",
        "IT",
        "DE",
        "ES"
      ],
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
    },
    {
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
      "openingHours": [
        "Mo-Fr 09:00-18:00"
      ],
      "sameAs": [
        "https://www.linkedin.com/company/softsuave",
        "https://www.facebook.com/Softsuave"
      ],
      "areaServed": [
        "US",
        "CA",
        "UK",
        "AU",
        "FR",
        "IT",
        "DE",
        "ES"
      ],
      "paymentAccepted": [
        "Credit Card",
        "Bank Transfer"
      ],
      "currenciesAccepted": "USD"
    }
  ]
};
