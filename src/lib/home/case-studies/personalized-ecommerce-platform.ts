import type { CaseStudyContent } from "@/components/case-study/case-study";
import { HERO_PLATFORM_ICONS as P, platformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-personalized-ecommerce-platform` — softsuave.com's
 * Personalized eCommerce case study
 * (https://www.softsuave.com/case-study-personalized-ecommerce-platform),
 * rebuilt on the site's case-study template.
 *
 * One of live's older case studies: six plainly headed sections (no numbered
 * kickers), sentence lists, two inline images and a technology strip, rather
 * than the newer cards-and-figures layout. Every line of copy is the live
 * page's, verbatim — hero, section headings, paragraphs, every list item, the
 * technology names, the download panel and the related-case-study heading — and so are its in-sentence links and the React tile's
 * link. Section ids are live's (`#section1`…`#section6`). The images, logos
 * and PDF are live's, self-hosted
 * (`public/images/case-studies/personalized-ecommerce-platform/`,
 * `…/technologies/`, `public/assets/case-studies/`); the PDF keeps live's
 * path.
 *
 * Not carried over: live's hero backdrop photo (removed in review); what
 * live leaves commented out, so never renders — the
 * Web platform mark, a stray paragraph in Client Overview and another in each
 * of Requirement and Challenges (copy from other case studies), two trailing
 * items in the closing list; and
 * the images' `alt="ecommerce"`, described here instead.
 */

export const personalizedEcommerceMeta = {
  path: "/case-study-personalized-ecommerce-platform",
  /** Live's `<title>`, verbatim. */
  title: "Explore Personalized eCommerce Platform [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Personalized ecommerce platform case study highlighting how AI-driven recommendations, custom features, and data analytics improved sales.",
} as const;

const IMG = "/images/case-studies/personalized-ecommerce-platform";
const PDF = "/assets/case-studies/personalized-ecommerce-platform.pdf";

export const personalizedEcommerceCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Personalized One-Stop Solution", "for eCommerce Industry"],
    accent: "One-Stop Solution",
    titleSubLast: true,
    body: [
      "Soft Suave created an app to satisfy multiple needs to seamlessly give effective eCommerce solutions to customers. Specifically, the client wanted mobile applications that would enable customers to make fast decisions and lead them to make a purchase.",
    ],
    points: [],
    facts: [
      { label: "Industry :", value: "eCommerce" },
      platformFact([P.Android, P.iOS]),
    ],
    aside: {
      src: `${IMG}/hero.webp`,
      width: 532,
      height: 491,
      alt: "Two phone screens of the shopping app: a sneaker home feed with new releases, and a search screen listing topics, a sale banner and categories",
      blurDataURL:
        "data:image/webp;base64,UklGRiABAABXRUJQVlA4WAoAAAAQAAAADwAADgAAQUxQSIEAAAABcFpt27I8aOUwAhNIcogcMudP/JkBXJJl1nCLLo3EDAzg7vYL77tDREyAXxRFMWyG1p4aRgG8pP9GeSlJ0gKARH4k0sLNqQhXehE1LjcjVlquSEhWzk/FOeOF6HLoEWcjlyAkH2ejCpx2RUyfRBaoS5K07wQdgiAIIRMQmOZcegAAVlA4IHgAAABQAgCdASoQAA8ABUB8JYwAD5CQzVt0ldnTMjgA/lv+9E1Ki5cAfty8nQ2dj4EffyCJvcvJzS7ep/cT2yBO3sVWTWRoGCpCwZxsUvkBbHVppFhoBjggaHSqZWtM29+T79ZbYnwuJ46UVBaIrUDGeQC1G5cjnmwAAAA=",
    },
    // No backdrop photo (review: "remove the hero background"): the hero
    // stands on the flat dark surface, the phones beside the copy its image.
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      body: [
        "Our client was a Startup from the USA. They were dejected with the business model, followed by current online platforms that display many collections and confuse customers while shopping. This resulted in wastage of money and time on a product they did not like and did not match their style. The client’s primary goal was to build mobile applications for women’s clothing & accessories.",
        "They wanted the app to assist customers in the form of a virtual stylist,help them choose the products they love, and display products that match their preference & taste. The client precisely wanted mobile applications that help customers to make quick decisions and lead them into sales.",
      ],
      image: {
        src: `${IMG}/overview.webp`,
        width: 453,
        height: 450,
        alt: "Two phone screens of the shopping app: a grid of new-release sneakers with prices, and a product page showing an accepted offer, size, condition and shipping details",
        blurDataURL:
          "data:image/webp;base64,UklGRqwAAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSCkAAAABJyAQQXM1zxabHBGxCVBFshLACkYgABVktn8z/yP6H8sZGvfhn+UMDQBWUDggXAAAAPABAJ0BKhAAEAAFQHwlpAAC3j8KmysrwAD+1RQV8t6Xc1TNXx/Dkc398pQ1F95Jx1XngBA+FXyJzIW8zHzVjafFIhiqQaVvLzc4PlNrYX35OEM3n+cEMlCNAAAA",
      },
    },
    {
      id: "section2",
      nav: "Client Requirement",
      title: "Client Requirement",
      body: [
        "The client wanted to develop an eCommerce mobile application for both Android & iOS. They also wanted a web application for the admin to manage all the activities on mobile applications.",
      ],
      links: [
        { text: "Android", href: "/android-application-development-company" },
        { text: "iOS", href: "/ios-application-development-company" },
      ],
      list: [
        "Create match-lists for customers by coding & linking the preferences (answers) provided while signing-up.",
        "Create a survey and integrate it into a mobile app to understand the preference and taste of the customers.",
        "Create a subscription model for customers to get personalized clothing, accessories, and fashion suggestions.",
        "Develop an admin panel to manually update clothing, oversee client details, and send personalized suggestions to customers.",
        "Develop a secure and fast payment gateway for customers to pay without any hassles.",
        "Integrate swipe right and left features for product selection and rejection.",
        "Create automated filters based on the inputs received while signing up.",
      ],
      listSingle: true,
    },
    {
      id: "section3",
      nav: "Existing Challenges",
      title: "Existing Challenges",
      body: [
        "The developers faced a couple of challenges while developing mobile applications and integrating innovative features.",
      ],
      list: [
        "Creating different logics based on various categories was a challenge.",
        "Building match system API - Coding and creating filters for individual customers using the survey response, likes, and dislikes.",
        "The secure payment was allowed on the website and not on the application. Redirecting to the website using an in-app browser was a challenge.",
        "Adding custom API for every action done on the application",
        "Configuring WordPress based on survey answers and products available on sale.",
      ],
      listSingle: true,
    },
    {
      id: "section4",
      nav: "Soft Suave Solutions",
      title: "Soft Suave Solutions",
      body: [
        "Soft Suave took over the eCommerce app development and implemented innovative features that helped the client achieve their business goal. The solution was built on the Web, iOS, and Android platforms.",
      ],
      links: [{ text: "eCommerce app development", href: "/ecommerce-mobile-app-development-company" }],
      list: [
        "Developed Web Application for admin to manage the mobile app and the users.",
        "Developed a robust app for iOS and Android platforms.",
        "Created secure payment redirection on the website.",
        "Created custom APIs for all the features integrated into the application.",
        "Created different logics to make sure every individual receives personalized matches according to their preference.",
        "Interactive and smooth UI/UX was developed from scratch.",
      ],
      listSingle: true,
      image: {
        src: `${IMG}/solutions.webp`,
        width: 524,
        height: 489,
        alt: "Two phone screens of the shopping app: a wishlist of sneakers with Make Offer and Add to Cart buttons, and the sneaker home feed",
        blurDataURL:
          "data:image/webp;base64,UklGRhQBAABXRUJQVlA4WAoAAAAQAAAADwAADgAAQUxQSH0AAAABcFpt27K8v0Am2wo0qG6RBZxKonGIVJcVHDJJGyv8I+DJ9bf3YYaIQNu2bag9SXtGOG+Us5PkKc0LRPRWzdbjo6qqikH9nws9uCxacj3U2jJbATR7KsuNslwRubgZIoW5WFGXz/OhBFdBNviwN1Ml2hjO0zj+KyXnZa9EBABWUDggcAAAADACAJ0BKhAADwAFQHwlpAAPk/DbidMn+HIAAP5b/vRNS+I7Z776RTlWXlWINZL+bcQRml382/fmsOZjA295gql5u/njp7vFX7D9h2ytGiSzXkNcezYvWD+GnbtbNn4PzuWGIGMqiycjPbqOiNh5AAA=",
      },
    },
    {
      id: "section5",
      nav: "Technologies & Frameworks",
      title: "Technologies & Frameworks",
      tech: [
        { name: "Wordpress", logo: { src: "/images/case-studies/technologies/wordpress.svg", width: 256, height: 255 } },
        {
          name: "React",
          logo: { src: "/images/case-studies/technologies/react.svg", width: 22, height: 20 },
          href: "/hire-react-native-developers",
        },
      ],
    },
    {
      id: "section6",
      nav: "Bringing Delight to the Client",
      title: "Bringing Delight to the Client",
      body: [
        "Our client was able to achieve excellent results in a short span, although they were a startup. Developers at Soft Suave made sure to delight the client with many suggestions and innovative solutions.",
      ],
      list: [
        "Trendy UI/UX designs were built from scratch by developers at Soft Suave.",
        "Allowing users to add reviews for the disliked products will allow the personalized stylist to send filtered images.",
        "Allowing users to edit their survey answers after signing in was a successful feature suggestion.",
        "Allowing Admin to update products and send personalized suggestions to users was the most appreciated feature initiated by our creative developers.",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    body: "Download our case study now to learn more about our personalized one-stop solution for the eCommerce industry for advanced input and learning.",
    label: "Download Case Study",
    pdf: PDF,
    fileName: "personalized-ecommerce-platform.pdf",
    requirement:
      "Case study download: requested the Personalized One-Stop Solution for eCommerce Industry case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Personalized eCommerce Platform",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Personalized eCommerce Platform case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(personalizedEcommerceMeta.path),
};
