import 'server-only';

/**
 * JSON-LD for `/it-staff-augmentation-services`: softsuave.com's own schema for this page,
 * verbatim (review: "Schemas must be updated; remove the unnecessary ones —
 * implement the live page schema"). The live page's HTML carries four blocks — Service, BreadcrumbList, Product and FAQPage; each
 * is copied here as served, in the order served, and renders as its own
 * <script>.
 *
 * As on the other live-schema pages, the rest of what an SEO tool reports on
 * the live page is not the page's own: its site Organization is injected by
 * the shared GTM container and its address microdata sits in the footer. So
 * the route is in `PAGES_WITH_OWN_SITE_GRAPH` (the layout adds no Organization
 * or WebSite) and the footer keeps its address microdata, as live's does.
 */
export const STAFF_AUG_LIVE_LD: readonly object[] = [
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "ServiceType": "Software",
        "name": "IT Staff Augmentation Services",
        "url": "https://www.softsuave.com/it-staff-augmentation-services",
        "description": "Soft Suave's IT staff augmentation services provide skilled offshore IT experts on contract to meet your project needs and scale your team effectively.",
        "image": "https://www.softsuave.com/assets/new-formate/og_img_it_augmentation.jpg",
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
        "name": "Software Development",
        "item": "https://www.softsuave.com/software-development-company-india"
      }
    ]
  },
  {
    "@context": "http://schema.org/",
    "@type": "Product",
    "name": "Soft Suave Technologies",
    "description": "Soft Suave's IT staff augmentation services provide skilled offshore IT experts on contract to meet your project needs and scale your team effectively.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "bestRating": "5",
      "ratingCount": "61"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Staff augmentation in the IT industry: What is it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Staff augmentation, which is common in the IT field is when you hire outside professionals for a short time to help out with the needs of the in-house team. This method allows companies to fill gaps of skill, finish projects on time, and handle workload without making long-term agreements."
        }
      },
      {
        "@type": "Question",
        "name": "How do you offer staff augmentation services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Soft Suave provides staff augmentation services and our skilled IT professionals easily fit into your current team. The process involves grasping the requirements of your project, choosing appropriate talent, and making sure that the onboarding and collaboration process are smooth."
        }
      },
      {
        "@type": "Question",
        "name": "Why should companies consider IT staff augmentation services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Thinking about IT staff augmentation, companies can use this method to easily get more specialized skills when needed, increase their team size as necessary, lower the costs of recruitment, and maintain project schedules. This kind of flexibility supports businesses in adjusting to varying demands and concentrating on core activities."
        }
      },
      {
        "@type": "Question",
        "name": "How to choose the right IT staff augmentation provider?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Checking experience, technical skills, client feedback, and comprehension of project needs are the most important factors when selecting an IT staff augmentation provider. Good communication and past performance in similar projects also play a significant role."
        }
      },
      {
        "@type": "Question",
        "name": "Can IT staff augmentation services help with specific project needs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Certainly, IT staff augmentation services can assist in fulfilling specific project requirements by supplying professionals who possess the needed abilities for your project. Augmented staff are skilled and reliable, and with them, you can scale up operations, and procure the needed technical support and help."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between IT outsourcing and IT staff augmentation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "IT Outsourcing is a situation where a company hires an outside service provider to manage its entire or some part of the IT functions. IT Staff Augmentation, on the other hand, means you are adding professionals from outside to your team. In this way, tasks are not given completely as they would be in outsourcing but rather divided between internal and external parties."
        }
      }
    ]
  }
];
