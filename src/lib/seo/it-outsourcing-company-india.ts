import 'server-only';

/**
 * JSON-LD for `/it-outsourcing-company-india`: softsuave.com's own schema for this page,
 * verbatim (review: "Schemas must be updated; remove the unnecessary ones —
 * implement the live page schema"). The live page's HTML carries five blocks — Service, WebPage, BreadcrumbList, FAQPage and its own Organization (a sixth, empty <script> on live carries nothing and is not reproduced); each
 * is copied here as served, in the order served, and renders as its own
 * <script>.
 *
 * The last block, a FAQPage, is not in the live HTML: softsuave.com's Google
 * Tag Manager adds it after load, on this URL only (verified by loading the
 * live page with GTM blocked — it disappears). That tag never fires here, so
 * the block is carried by the page itself to match what live shows (review:
 * "schema is not same for the existing live page schema"). Its questions are
 * the tag's own and appear on neither page's visible FAQ. Once this site runs
 * on www.softsuave.com, that GTM tag must be paused or it will add a second
 * copy.
 *
 * As on the other live-schema pages, the rest of what an SEO tool reports on
 * the live page is not the page's own: its site Organization is injected by
 * the shared GTM container and its address microdata sits in the footer. So
 * the route is in `PAGES_WITH_OWN_SITE_GRAPH` (the layout adds no Organization
 * or WebSite) and the footer keeps its address microdata, as live's does.
 */
export const ITO_LIVE_LD: readonly object[] = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.softsuave.com/it-outsourcing-company-india#service",
    "name": "IT Outsourcing Services in India",
    "serviceType": "IT Outsourcing",
    "description": "IT outsourcing services from India covering custom software development, product engineering, web and mobile application development, AI development and integration, QA and software testing, legacy modernization, and cloud and DevOps engineering. Available as complete project outsourcing, a dedicated development team, or staff augmentation.",
    "url": "https://www.softsuave.com/it-outsourcing-company-india",
    "image": "https://www.softsuave.com/assets/images/it-outsourcing-company-india.jpg",
    "provider": {
      "@id": "https://www.softsuave.com/#organization"
    },
    "areaServed": [
      "US",
      "CA",
      "GB",
      "AU",
      "FR",
      "IT",
      "DE",
      "ES",
      "IN"
    ],
    "audience": {
      "@type": "BusinessAudience",
      "name": "Startups, SMBs, and product engineering teams"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "url": "https://www.softsuave.com/it-outsourcing-company-india"
    },
    "hasOfferCatalog": [
      {
        "@type": "OfferCatalog",
        "name": "IT Outsourcing Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Software Development",
              "url": "https://www.softsuave.com/software-development-company"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Product Engineering Services",
              "url": "https://www.softsuave.com/product-engineering-services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Web Application Development",
              "url": "https://www.softsuave.com/web-application-development-company"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Mobile Application Development",
              "url": "https://www.softsuave.com/mobile-application-development-company"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Development and Integration",
              "url": "https://www.softsuave.com/ai-development-service"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "QA and Software Testing",
              "url": "https://www.softsuave.com/hire-qa-testers-india"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Legacy Modernization and Integration",
              "url": "https://www.softsuave.com/legacy-modernization-services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Cloud and DevOps Engineering",
              "url": "https://www.softsuave.com/cloud-computing"
            }
          }
        ]
      },
      {
        "@type": "OfferCatalog",
        "name": "IT Outsourcing Engagement Models",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Complete Project Outsourcing",
              "description": "For a defined product, platform, modernization, or integration requirement, with agreed scope, milestones, responsibilities, and delivery expectations."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Dedicated Development Team",
              "url": "https://www.softsuave.com/hire-dedicated-developers",
              "description": "A defined team working across an ongoing product roadmap with agreed responsibilities and collaboration practices."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Staff Augmentation",
              "url": "https://www.softsuave.com/it-staff-augmentation-services",
              "description": "Selected professionals extend the buyer's existing engineering capacity."
            }
          }
        ]
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.softsuave.com/it-outsourcing-company-india#webpage",
    "url": "https://www.softsuave.com/it-outsourcing-company-india",
    "name": "IT Outsourcing Company in India | Soft Suave",
    "description": "Work with a leading IT outsourcing company in India for software, AI, QA, and modernization. Compare flexible models and discuss your requirements.",
    "inLanguage": "en",
    "dateModified": "2026-09-08",
    "isPartOf": {
      "@id": "https://www.softsuave.com/#website"
    },
    "publisher": {
      "@id": "https://www.softsuave.com/#organization"
    },
    "breadcrumb": {
      "@id": "https://www.softsuave.com/it-outsourcing-company-india#breadcrumb"
    },
    "mainEntity": {
      "@id": "https://www.softsuave.com/it-outsourcing-company-india#service"
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": "https://www.softsuave.com/assets/images/it-outsourcing-company-india.jpg"
    }
  },
  {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "@id": "https://www.softsuave.com/it-outsourcing-company-india#breadcrumb",
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
        "name": "Software Development",
        "item": "https://www.softsuave.com/software-development-company"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "IT Outsourcing Services",
        "item": "https://www.softsuave.com/it-outsourcing-company-india"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.softsuave.com/it-outsourcing-company-india#faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What IT outsourcing services does Soft Suave provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Soft Suave provides software engineering, web and mobile development, AI, QA, modernization, integration, cloud, and DevOps services. The scope depends on your requirements."
        }
      },
      {
        "@type": "Question",
        "name": "How much does IT outsourcing to India cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The cost depends on scope, required roles, team size, engagement model, integrations, testing, security requirements, and delivery schedule. Project pricing is confirmed after requirements and scope are reviewed."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between outsourcing and staff augmentation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Outsourcing assigns responsibilities to an external partner. Staff augmentation adds specialists to your team while your organization retains responsibility for priorities and direction."
        }
      },
      {
        "@type": "Question",
        "name": "How do outsourced teams collaborate with US/UK or other global companies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Teams collaborate through meetings, tracking tools, documentation, demonstrations, and escalation paths. We can also arrange 4-6 hours of working-hour overlap if needed."
        }
      },
      {
        "@type": "Question",
        "name": "How are security and intellectual property handled?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Contracts, NDAs, access controls, development practices, and offboarding address security and intellectual property. Soft Suave maintains an ISO/IEC 27001:2022-certified information security management system."
        }
      },
      {
        "@type": "Question",
        "name": "Can we begin with one developer or a small team?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, start with one developer or a small team and expand later. Eligible engagements may include a 40-hour risk-free trial after engagement suitability is confirmed."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to begin an outsourcing engagement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The starting timeline depends on requirement clarity, engagement type, skill availability, review, access, and onboarding. We confirm the plan after considering these factors."
        }
      },
      {
        "@type": "Question",
        "name": "Should we outsource a project or hire a dedicated team?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Choose project outsourcing for clear scope and deliverables. Choose a dedicated team when you need multiple roles to support ongoing development and changing priorities."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.softsuave.com/#organization",
    "name": "Soft Suave Technologies",
    "alternateName": "Soft Suave",
    "url": "https://www.softsuave.com/",
    "logo": "https://www.softsuave.com/new-assets/common/images/softsuave_logo.webp",
    "description": "Soft Suave is an AI-enabled engineering partner helping businesses build scalable AI solutions, automate complex workflows, and integrate modern technologies through augmented teams and dedicated developers.",
    "foundingDate": "2012",
    "email": "contact@softsuave.com",
    "address": [
      {
        "@type": "PostalAddress",
        "name": "Soft Suave Technologies — Head Office",
        "streetAddress": "SSPDL Building, Alpha City, Gamma Block, 5th Floor, Navalur",
        "addressLocality": "Chennai",
        "addressRegion": "Tamil Nadu",
        "postalCode": "603103",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "name": "Soft Suave Technologies — Development Centre",
        "streetAddress": "MFAR Silverline Tech Park, 1st Floor, 180 EPIP Zone, EPIP 2nd Phase, Whitefield",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": "560066",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "name": "Soft Suave — US Sales Office",
        "streetAddress": "3210 Vogel Rd",
        "addressLocality": "Ellicott City",
        "addressRegion": "MD",
        "postalCode": "21043",
        "addressCountry": "US"
      }
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-410-220-6301",
        "contactType": "sales",
        "areaServed": "US",
        "availableLanguage": "English"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+44-7403-646450",
        "contactType": "sales",
        "areaServed": "GB",
        "availableLanguage": "English"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-99527-32708",
        "contactType": "sales",
        "areaServed": "IN",
        "availableLanguage": [
          "English",
          "Tamil",
          "Hindi"
        ]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-8015159981",
        "contactType": "human resources",
        "areaServed": "IN",
        "availableLanguage": [
          "English",
          "Tamil",
          "Hindi"
        ]
      }
    ],
    "sameAs": [
      "https://in.linkedin.com/company/softsuave",
      "https://www.instagram.com/softsuavetech/",
      "https://www.youtube.com/@softsuave",
      "https://clutch.co/profile/soft-suave-technologies",
      "https://www.goodfirms.co/company/soft-suave"
    ],
    "knowsAbout": [
      "Software Development",
      "Artificial Intelligence Development",
      "Mobile App Development",
      "Web Application Development",
      "Cloud Computing",
      "DevOps",
      "Legacy Modernization",
      "Product Engineering",
      "IT Staff Augmentation",
      "Offshore Software Development",
      "Global Capability Centers"
    ],
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "certification",
      "name": "ISO/IEC 27001:2022 Information Security Management"
    },
    "parentOrganization": {
      "@type": "Organization",
      "@id": "https://www.kiwitech.com/#organization",
      "name": "KiwiTech, LLC",
      "url": "https://www.kiwitech.com/",
      "description": "KiwiTech is a US-based technology and innovation company supporting early and growth-stage startups. KiwiTech acquired a majority stake in Soft Suave Technologies in November 2025.",
      "foundingDate": "2009",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3030 K Street NW, Suite 102",
        "addressLocality": "Washington",
        "addressRegion": "DC",
        "postalCode": "20007",
        "addressCountry": "US"
      }
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the benefits of IT outsourcing services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "IT Outsourcing can help you save money, get access to talent, be more flexible, and reduce risks. Businesses can meet their IT needs more efficiently with external resources."
        }
      },
      {
        "@type": "Question",
        "name": "What should I consider before outsourcing IT services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "There are certain things you should take note of before outsourcing IT services. Here are they:\n\n- Make sure your outsourcing provider has a good stature and experience.\n- Data and security measures.\n- Cost and quality of the services.\n- Communication.\n- Consider how IT outsourcing will affect internal workflows and staff."
        }
      },
      {
        "@type": "Question",
        "name": "What are the potential challenges of IT outsourcing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "IT outsourcing has many advantages, but it can also be challenging. These may include:\n\n- Language and cultural barriers.\n- Differences in time zones.\n- Loss of control over certain operations.\n- Data security and privacy concerns.\n- Supporting the outsourcing partner.\n- It's important to communicate and collaborate with the outsourcing provider.\n\nTo avoid these challenges, choosing the right companies like Soft Suave can be helpful."
        }
      }
    ]
  }
];
