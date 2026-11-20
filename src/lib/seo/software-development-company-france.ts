import "server-only";

/**
 * JSON-LD for `/software-development-company-france`: softsuave.com's own
 * schema for this page — its two blocks, every field and value as served
 * (generated from the live source, not retyped):
 *
 *   1. a graph of WebPage, ImageObject (the OG image) and WebSite;
 *   2. a graph of one Service with its provider Organization.
 *
 * The live first block is not valid JSON as served: it carries two
 * JavaScript-style comment lines, commented-out `datePublished` and
 * `dateModified` fields, which JSON does not allow (a strict parser rejects
 * the whole block). Those two comments are dropped here, so the block parses;
 * no field or value the live page publishes is changed or removed.
 *
 * The live page publishes no FAQPage schema, so none is emitted for its FAQ.
 * The route is in `PAGES_WITH_OWN_SITE_GRAPH`: these blocks (WebSite
 * included) are its whole structured data, and the layout adds nothing.
 */
export const sdfrPageGraphLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.softsuave.com/software-development-company-france",
      "url": "https://www.softsuave.com/software-development-company-france",
      "name": "Leading software development company in France",
      "isPartOf": {
        "@id": "https://www.softsuave.com/#website"
      },
      "primaryImageOfPage": {
        "@id": "https://www.softsuave.com/software-development-company-france#primaryimage"
      },
      "image": {
        "@id": "https://www.softsuave.com/software-development-company-france#primaryimage"
      },
      "thumbnailUrl": "https://www.softsuave.com/assets/images/software-development-company-france.png",
      "description": "Enhance your business operations with custom software development, mobile app development, and web development solutions in France. Contact our expert team today for exceptional software development services.",
      "inLanguage": "en-US",
      "potentialAction": [
        {
          "@type": "ReadAction",
          "target": [
            "https://www.softsuave.com/software-development-company-france"
          ]
        }
      ]
    },
    {
      "@type": "ImageObject",
      "inLanguage": "en-US",
      "@id": "https://www.softsuave.com/software-development-company-france#primaryimage",
      "url": "https://www.softsuave.com/assets/images/software-development-company-france.png",
      "contentUrl": "https://www.softsuave.com/assets/images/software-development-company-france.png",
      "width": 1200,
      "height": 628
    },
    {
      "@type": "WebSite",
      "@id": "https://www.softsuave.com/#website",
      "url": "https://www.softsuave.com/",
      "name": "Outsourcing Software Development Company | SoftSuave",
      "description": "Elevate your software development needs with our reliable, cost-effective and efficient outsourcing services. Contact us today to learn more!",
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.softsuave.com/?s={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      ],
      "inLanguage": "en-US"
    }
  ]
};

export const sdfrServiceLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "ServiceType": "Software",
      "name": "Custom Software Development Company In France",
      "url": "https://www.softsuave.com/software-development-company-france",
      "description": "Enhance your business operations with custom software development, mobile app development, and web development solutions in France. Contact our expert team today for exceptional software development services.",
      "image": "https://www.softsuave.com/assets/images/software-development-company-france.png",
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
