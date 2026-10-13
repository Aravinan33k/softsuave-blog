import 'server-only';

/**
 * JSON-LD for `/reactjs-app-development-company`: softsuave.com's own schema for this page (13 Oct review: "need to update
 * the schema"). The live page's HTML carries two JSON-LD blocks — this
 * Service and this FAQPage — copied here as served, with one exception: the
 * live FAQPage does not parse. Its "What are the competitors of ReactJS?"
 * answer breaks the string across raw new lines (a JSON syntax error, so
 * Google ignores the whole block); each break is a single space here, the
 * wording untouched.
 *
 * The rest of what an SEO tool reports on the live page is not the page's
 * own: its Organization is injected by the shared GTM container (which this
 * site loads too), and its address microdata sits in the footer. So the route
 * is in `PAGES_WITH_OWN_SITE_GRAPH` (the layout adds no Organization or
 * WebSite) and the footer keeps its address microdata, as live's does.
 */

export const rjServiceLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "ServiceType": "Software",
      "name": "Best ReactJS Development Service by Soft Suave",
      "url": "https://www.softsuave.com/reactjs-app-development-company",
      "description": "Looking for top React.js app development company in India & USA that suits your budget. We are the leading React development services provider with 11+ years of experience.",
      "image": "https://www.softsuave.com/assets/images/react-development-company-softsuave.jpg",
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

export const rjFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is ReactJS a framework or a library?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The React JS library is not a framework. As part of the MVC (Model-View-Controller) framework, it focuses on the view layer. Even so, many people find it useful for building or supporting larger frameworks because of some of its features. Taking into account the wider ecosystem is especially important."
      }
    },
    {
      "@type": "Question",
      "name": "What is the purpose of ReactJS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In 2015, Facebook launched React Native, a mobile framework built on top of React JS. It was originally developed to create user interfaces for the web, but it has been used in broad front-end development and visual development for both web and applications since then. While React JS has valuable non-mobile applications as well, it is designed specifically for creating cross-platform mobile interfaces."
      }
    },
    {
      "@type": "Question",
      "name": "When is React JS development useful?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Using ReactJS, you can create user interfaces with reusable components. The view layer is handled by this component for mobile and web development. The technology can be used to create single-page applications, as well as mobile, web, and progressive web applications."
      }
    },
    {
      "@type": "Question",
      "name": "Why is ReactJS so popular?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "React JS development uses one of the world’s most popular languages (JavaScript), it is easy to use, readily supported, and useful for quickly creating UI essentials. In addition to its virtual browser, which helps developers test, React JS also uses a virtual DOM for faster, lighter, more performant apps, which makes it a popular choice during project planning stages."
      }
    },
    {
      "@type": "Question",
      "name": "I want to know more about React in order to decide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It's good to know more about ReactJS development service in even more detail. You can talk to our ReactJS experts for consultation for free."
      }
    },
    {
      "@type": "Question",
      "name": "What are the competitors of ReactJS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Other JavaScript libraries with a focus on front-end web and mobile development compete with React JS, Vue InfernoJS. EmberJS. BackboneJS. Angular Mithril. Cycle JS. "
      }
    },
    {
      "@type": "Question",
      "name": "What are some examples of React JS development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The most prominent example of React JS development is Facebook. The social media network created React JS specifically for this purpose. Other examples include: Instagram Whatsapp Netflix Medium Udemy "
      }
    }
  ]
};
