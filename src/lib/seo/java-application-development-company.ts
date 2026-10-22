import 'server-only';

/**
 * JSON-LD for `/java-application-development-company`: softsuave.com's own schema for this page, verbatim (13 Oct review: "need
 * to update the schema and remove the excess ones"). The live page's HTML
 * carries four JSON-LD blocks — Service, FAQPage, BreadcrumbList and Product —
 * copied here as served. The schema this replaced was generated (Service,
 * WebPage, FAQPage and a breadcrumb, plus the surface's Organization and
 * WebSite); none of it is on the live page, so none of it is kept.
 *
 * The rest of what an SEO tool reports on the live page is not the page's
 * own: its Organization is injected by the shared GTM container (which this
 * site loads too), and its address microdata sits in the footer. So the route
 * is in `PAGES_WITH_OWN_SITE_GRAPH` (the layout adds no Organization or
 * WebSite) and the footer keeps its address microdata, as live's does.
 */

export const javaServiceLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "ServiceType": "Software",
      "name": "Custom Java Development Services",
      "url": "https://www.softsuave.com/java-application-development-company",
      "description": "Elevate your business with our specialized Java development services. Soft Suave is a top Java development company that ensures high-quality, scalable, and efficient solutions for your enterprise.",
      "image": "https://www.softsuave.com/assets/new-formate/java/new-Java-img.svg",
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
};

export const javaFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does Java application development cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our costs depend on the application's requirements, features, and complexities. We recommend contacting our experts for a precise quote."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to go live with a custom Java development project?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our timeline varies based on project needs, but our use of Agile methodologies helps speed up development, including accommodating changes during the process."
      }
    },
    {
      "@type": "Question",
      "name": "What kind of applications can we build using Java?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We utilize Java's versatility to develop web apps, desktop apps, mobile apps, and more, across multiple platforms."
      }
    },
    {
      "@type": "Question",
      "name": "What are the benefits of using Java for application development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our Java development offers robust security, scalability, and cross-platform capabilities, making it suitable for a wide range of applications. However, before you start a Java development project, consider the risks and rewards of outsourcing Java development to determine the best approach for your needs."
      }
    },
    {
      "@type": "Question",
      "name": "Can Java be used for mobile app development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we commonly use Java for developing mobile applications, especially for Android platforms."
      }
    },
    {
      "@type": "Question",
      "name": "How does outsourcing to our Java development company work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We bring the expertise and resources, you bring the vision. Together, we'll deliver efficient and cost-effective results. Outsource your Java developers and partner with our team to create custom solutions."
      }
    },
    {
      "@type": "Question",
      "name": "How can you monitor the progress of your Java development project?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We utilize project management tools and provide regular updates to keep our clients informed of progress."
      }
    },
    {
      "@type": "Question",
      "name": "Does our Java software development company offer post-development support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer ongoing support and maintenance as part of our services to ensure applications remain up-to-date and perform optimally."
      }
    },
    {
      "@type": "Question",
      "name": "What types of Java development services do we offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our services include cloud-based solutions, migrations, integrations, mobile and web application development, and Java consulting. So when you are planning to hire a Java developer, make sure to know your project requirements before making decisions."
      }
    },
    {
      "@type": "Question",
      "name": "Is Java still a good option for software development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Java is a good choice for software development, all thanks to its powerful security, scalability, and cross-platform abilities. For your next project, make sure to choose the best Java development framework as it builds reliable and high-performance applications. We ensure Java's large community and ongoing updates keep it relevant and powerful in the evolving tech landscape."
      }
    }
  ]
};

export const javaBreadcrumbLd = {
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
      "name": "Web App",
      "item": "https://www.softsuave.com/web-application-development-company"
    }
  ]
};

export const javaProductLd = {
  "@context": "http://schema.org/",
  "@type": "Product",
  "name": "Soft Suave Technologies",
  "description": "Elevate your business with our specialized Java development services. Soft Suave is a top Java development company that ensures high-quality, scalable, and efficient solutions for your enterprise.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "bestRating": "5",
    "ratingCount": "40"
  }
};
