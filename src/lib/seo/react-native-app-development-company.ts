import 'server-only';

/**
 * JSON-LD for `/react-native-app-development-company`: softsuave.com's own
 * schema for this page, verbatim (30 Sep request: "update this page schema
 * with live website schema"). The live page's HTML carries exactly two
 * JSON-LD blocks — this Service graph and this FAQPage — copied here as
 * served, including the Service's `ServiceType` capitalisation and its SVG
 * `image`.
 *
 * As on the Android, iOS and Mobile App pages, the rest of what an SEO tool
 * reports on the live page is not the page's own: its Organization is
 * injected by the shared GTM container (which this site loads too), and its
 * address microdata sits in the footer. So the route is in
 * `PAGES_WITH_OWN_SITE_GRAPH` (the layout adds no Organization or WebSite) and
 * the footer keeps its address microdata, as live's does. Live's template also
 * puts `itemscope itemtype="http://schema.org/WebPage"` on its `<html>`
 * element, wrapping nothing but those footer address fields; that belongs to
 * the root layout every page shares, so it is not reproduced here.
 */
export const rnServiceLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "ServiceType": "Software",
      "name": "Best React Native App Development Company In India",
      "url": "https://www.softsuave.com/react-native-app-development-company",
      "description": "Soft Suave is a reputed React Native app development company in India that offers quality react native development services for Start-ups and SMBs",
      "image": "https://www.softsuave.com/assets/new-formate/react-native/reactnative-img.svg",
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

export const rnFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can React Native be used for both web and mobile?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. React Native enables a developer to consolidate applications into a single codebase using React Native Web eliminating the need to develop and manage two codebases for mobile and web. This allows our developers to build separate Apps for web and mobile with the same level of speed and performance."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to build a React Native App?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The time of development depends on the project's complexity. However, being a JavaScript library, React Native assists in creating Apps that closely resemble native Apps in terms of appearance, feel, and performance using the same basic UI components as standard iOS/Android Apps."
      }
    },
    {
      "@type": "Question",
      "name": "Why choose React Native for your next mobile app?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "By choosing React Native as your preferred framework to develop mobile Apps, you can get the following amazing benefits,"
      }
    },
    {
      "@type": "Question",
      "name": "Why choose Soft Suave for your next React Native app development project?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Soft Suave is the most trusted React Native development company and we've been developing cross-platform Apps since the framework was released by Facebook in 2015. We have a superstar team of React Native App developers, designers, project managers, and analysts who can work with any complex project."
      }
    },
    {
      "@type": "Question",
      "name": "What are the benefits of outsourcing React Native app development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When you outsource your project to a reliable React Native App development company like Soft Suave, you can get these advantages,"
      }
    }
  ]
} as const;
