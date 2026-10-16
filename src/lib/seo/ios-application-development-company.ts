import 'server-only';

/**
 * JSON-LD for `/ios-application-development-company`: softsuave.com's own
 * schema for this page, verbatim (30 Sep request: "update this page schema
 * with live website schema"). The live page's HTML carries exactly four blocks
 * — this Service graph, BreadcrumbList, FAQPage and Product — copied here as
 * served, including the Service's `ServiceType` capitalisation and PNG
 * `image`, the trail's two items (Home › Mobile App), the Product's
 * `http://schema.org/` context and its AggregateRating.
 *
 * As on the Android and Mobile App pages, the rest of what an SEO tool reports
 * on the live page is not the page's own: its Organization is injected by the
 * shared GTM container (which this site loads too), and its address microdata
 * sits in the footer. So the route is in `PAGES_WITH_OWN_SITE_GRAPH` (the
 * layout adds no Organization or WebSite) and the footer keeps its address
 * microdata, as live's does.
 */
export const iosServiceLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "ServiceType": "Software",
      "name": "iOS Development Company in India",
      "url": "https://www.softsuave.com/ios-application-development-company",
      "description": "Get top-notch iOS app development services in India. Partner with Soft Suave, a iOS/iPhone development company from India to take your ideas to the next level. Contact us now!",
      "image": "https://www.softsuave.com/assets/new-formate/og_img_ios_development.png",
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
} as const;

export const iosBreadcrumbLd = {
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
      "name": "Mobile App",
      "item": "https://www.softsuave.com/mobile-application-development-company"
    }
  ]
} as const;

export const iosFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the benefits of outsourcing iOS App Development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Outsource your iOS app with Soft Suave for expert developers, cost-efficiency, and focus on your core business. We'll handle the development, you handle the success."
      }
    },
    {
      "@type": "Question",
      "name": "How do I track my app's progress?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Soft Suave provides regular progress updates through meetings and reports. You'll also have a dedicated point of contact, who keeps you informed every step of the way."
      }
    },
    {
      "@type": "Question",
      "name": "Will I own the app and its code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Soft Suave prioritizes intellectual property rights. You'll retain full ownership of your app and its code, giving you complete control over your creation."
      }
    },
    {
      "@type": "Question",
      "name": "Can you help me migrate the web/android applications to iOS applications?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Soft Suave can utilize our expertise to migrate your existing web or Android app to iOS. We'll ensure a smooth transition and optimized user experience for the Apple platform."
      }
    },
    {
      "@type": "Question",
      "name": "Will Soft Suave help submit my app to the App Store?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Soft Suave can guide you through the App Store submission process and handle the technical aspects with your approval, ensuring a smooth launch."
      }
    },
    {
      "@type": "Question",
      "name": "Can I develop iOS applications on Windows, and is it recommended?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While it's technically possible to develop iOS applications on Windows using cross-platform tools or virtualization, it is generally not recommended due to significant limitations and challenges."
      }
    },
    {
      "@type": "Question",
      "name": "How can I integrate Zoom meetings into an iOS app using the Zoom SDK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Integrating Zoom meetings into your iOS application can enhance its functionality by enabling seamless virtual communication.+"
      }
    },
    {
      "@type": "Question",
      "name": "What are the common mistakes to avoid in iOS development to ensure project success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Successful iOS development involves steering clear of several critical pitfalls. Avoid common mistakes in iOS development and learn proper user interface design, effective memory management, thorough testing, and more, to help you navigate the development process smoothly."
      }
    }
  ]
} as const;

export const iosProductLd = {
  "@context": "http://schema.org/",
  "@type": "Product",
  "name": "Soft Suave Technologies",
  "description": "Transform your business with our expert iOS app development services. Soft Suave is an iOS App Development company from India, and we build custom apps designed for performance and user engagement.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "bestRating": "5",
    "ratingCount": "42"
  }
} as const;
