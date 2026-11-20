import 'server-only';

/**
 * JSON-LD for `/android-application-development-company`: softsuave.com's own
 * schema for this page, verbatim (30 Sep request: "update the page schema with
 * live website schema"). The live page's HTML carries exactly two blocks — this
 * Service graph and this FAQPage — copied here as served, including the
 * Service's `ServiceType` capitalisation, its description's double space, its
 * SVG `image`, and the FAQ answers' own spelling.
 *
 * As on the Mobile App page, the rest of what an SEO tool reports on the live
 * page is not the page's own: its Organization is injected by the shared GTM
 * container (which this site loads too), and its address microdata sits in the
 * footer. So the route is in `PAGES_WITH_OWN_SITE_GRAPH` (the layout adds no
 * Organization or WebSite) and the footer keeps its address microdata, as
 * live's does.
 */
export const andServiceLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "ServiceType": "Software",
      "name": "Android App Development Company - Soft Suave",
      "url": "https://www.softsuave.com/android-application-development-company",
      "description": "Discover top-notch Android app development services at SoftSuave, a leading Android app development company  in India",
      "image": "https://www.softsuave.com/assets/Android-development-icon/Android-img-01.svg",
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

export const andFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does Android app development process involves?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Android app development process involves several steps to create a mobile application for the Android OS. The process typically includes requirements gathering, designing the user interface, programming and development, testing, and deployment."
      }
    },
    {
      "@type": "Question",
      "name": "Which is best platform to develop an Android app?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "There are many popular platforms are there to develop an android app. Each have its own advantages from devloped to delivered. Here are  the most effecient android app devlopment platforms. Android Studio, Flutter, Xamarin, PhoneGap, Unity"
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to develop an app for Android?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The time it takes to develop an android app is based on the requirement of the app and its additional features. The clone apps usually takes less time than custom apps. The other factors are designs, testing ect. If you want to know the approximate development time, you can reachout to our experts and get details you want."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Android development and app development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "App develolopment basically involves in any application development with different OS, Platforms and devices based on the requirement. Whereas Android development involves the development process for the Android OS devices."
      }
    },
    {
      "@type": "Question",
      "name": "What is the cost of developing an Android app?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The cost of Android app development varies based on the app's needs. If you're looking for budget-friendly options, you can consider using clone apps. If you need an app that represents your business or a unique gaming app, the budget will depend on various factors. To assess before development, consult our experts who can provide a budget plan for your app development."
      }
    }
  ]
} as const;
