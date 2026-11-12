import "server-only";

/**
 * JSON-LD for `/software-development-company-germany`: softsuave.com's own
 * schema for this page — its two blocks, every field and value as served
 * (generated from the live source, not retyped):
 *
 *   1. a graph of WebPage, ImageObject (the OG image) and WebSite;
 *   2. a graph of one Service with its provider Organization.
 *
 * As on the France page, the live first block is not valid JSON as served: it
 * carries two JavaScript-style comment lines (commented-out `datePublished`
 * and `dateModified`), which JSON does not allow. Those two comments are
 * dropped here so the block parses; no field or value is changed or removed.
 * (The WebPage description's double space, "next level?  Our experts", is
 * the live text and is kept.)
 *
 * The live page publishes no FAQPage schema, so none is emitted for its FAQ.
 * The route is in `PAGES_WITH_OWN_SITE_GRAPH`: these blocks (WebSite
 * included) are its whole structured data, and the layout adds nothing.
 */
export const sddePageGraphLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.softsuave.com/software-development-company-germany",
      "url": "https://www.softsuave.com/software-development-company-germany",
      "name": "Custom Software Development Company In Germany",
      "isPartOf": {
        "@id": "https://www.softsuave.com/#website"
      },
      "primaryImageOfPage": {
        "@id": "https://www.softsuave.com/software-development-company-germany#primaryimage"
      },
      "image": {
        "@id": "https://www.softsuave.com/software-development-company-germany#primaryimage"
      },
      "thumbnailUrl": "https://www.softsuave.com/assets/images/software-development-company-germany.jpg",
      "description": "Want to take your business to the next level?  Our experts can help you streamline and improve your operations with custom software solutions.",
      "inLanguage": "en-US",
      "potentialAction": [
        {
          "@type": "ReadAction",
          "target": [
            "https://www.softsuave.com/software-development-company-germany"
          ]
        }
      ]
    },
    {
      "@type": "ImageObject",
      "inLanguage": "en-US",
      "@id": "https://www.softsuave.com/software-development-company-germany#primaryimage",
      "url": "https://www.softsuave.com/assets/images/software-development-company-germany.jpg",
      "contentUrl": "https://www.softsuave.com/assets/images/software-development-company-germany.jpg",
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

export const sddeServiceLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "ServiceType": "Software",
      "name": "Custom Software Development Company In Germany",
      "url": "https://www.softsuave.com/software-development-company-germany",
      "description": "Elevate your software development needs with our reliable, cost-effective and efficient outsourcing services. Contact us today to learn more!",
      "image": "https://www.softsuave.com/assets/images/software-development-company-germany.jpg",
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
