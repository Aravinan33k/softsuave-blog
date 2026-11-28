import 'server-only';

/**
 * JSON-LD for `/flutter-application-development-company`: softsuave.com's own
 * schema for this page, verbatim (30 Sep request: "update this page schema
 * with live website schema"). The live page's HTML carries exactly two
 * JSON-LD blocks — this Service graph and this FAQPage — copied here as
 * served, including the Service's `ServiceType` capitalisation and its SVG
 * `image`.
 *
 * As on the Android, iOS, React Native and Mobile App pages, the rest of what
 * an SEO tool reports on the live page is not the page's own: its Organization
 * is injected by the shared GTM container (which this site loads too), and its
 * address microdata sits in the footer. So the route is in
 * `PAGES_WITH_OWN_SITE_GRAPH` (the layout adds no Organization or WebSite) and
 * the footer keeps its address microdata, as live's does. Live's template also
 * puts `itemscope itemtype="http://schema.org/WebPage"` on its `<html>`
 * element; that belongs to the root layout every page shares, so it is not
 * reproduced here.
 */
export const flServiceLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "ServiceType": "Software",
      "name": "Flutter App Development Company in India",
      "url": "https://www.softsuave.com/flutter-application-development-company",
      "description": "Soft Suave leads the way in Flutter app development services, delivering top-quality solutions for both iOS and Android platforms in India and the USA.",
      "image": "https://www.softsuave.com/assets/new-formate/flutter/flutter-img.svg",
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

export const flFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How will the communication process be after hiring the developer/team?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "After the commencement of the project, you can have regular communication with our Flutter developers through effective tools like slack or skype. Besides, there will always be a project manager to assist you anytime."
      }
    },
    {
      "@type": "Question",
      "name": "Can I consider flutter a start-up-friendly platform?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Since Flutter is a platform that allows using a single codebase to develop cross-platform Apps that could work on both Android and iOS, startups need not develop two separate Apps. Hence, Flutter is definitely a start-up-friendly platform."
      }
    },
    {
      "@type": "Question",
      "name": "Will you work based on my time zone preference?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When you outsource flutter development project to us, our dedicated Flutter team would work based on your time zone, deadline, and milestone. You have complete freedom to choose your preferred working hours. To know more details, talk with our project managers now."
      }
    },
    {
      "@type": "Question",
      "name": "Can I migrate my existing app into Flutter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, in fact, migration service is a part of our end-to-end Flutter App Development Services which are taken care of by trained technical experts."
      }
    }
  ]
} as const;
