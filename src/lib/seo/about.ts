import 'server-only';

/**
 * JSON-LD for `/about`: softsuave.com's own schema for this page, verbatim
 * (13 Oct review: "need to update the schema"). The live page carries four
 * Person blocks and nothing else — no Organization, no AboutPage, no
 * breadcrumb — one <script> each, copied here as served.
 *
 * Kept as served, quirks included: the names are spelt as live spells them
 * ("Vayavuru", "Monohar"), the job titles and image paths are older than the
 * rendered leadership cards, and the employer property is `worksfor`
 * (schema.org spells it `worksFor`, so a search engine ignores it).
 *
 * The route is in `PAGES_WITH_OWN_SITE_GRAPH`, so the layout adds no
 * Organization or WebSite of its own; the footer keeps its address microdata,
 * as live's does.
 */

export const aboutRameshLd = {
  "@context": "http://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "name": "Ramesh Vayavuru",
      "jobTitle": "Founder and CEO",
      "image": "https://www.softsuave.com/assets/new-formate/about/Ramesh-Founder-and-CTO.webp",
      "worksfor": {
        "@type": "Organization",
        "name": "Soft Suave Technologies",
        "url": "https://www.softsuave.com/"
      }
    }
  ]
};

export const aboutManoharLd = {
  "@context": "http://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "name": "Monohar Vayavuru",
      "jobTitle": "Co-Founder and Managing Director",
      "image": "https://www.softsuave.com/assets/new-formate/about/manohar.webp",
      "worksfor": {
        "@type": "Organization",
        "name": "Soft Suave Technologies",
        "url": "https://www.softsuave.com/"
      }
    }
  ]
};

export const aboutMadhuLd = {
  "@context": "http://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "name": "Madhu K",
      "jobTitle": "Project Manager",
      "image": "https://www.softsuave.com/assets/new-formate/about/madhu.webp",
      "worksfor": {
        "@type": "Organization",
        "name": "Soft Suave Technologies",
        "url": "https://www.softsuave.com/"
      }
    }
  ]
};

export const aboutSudhendraLd = {
  "@context": "http://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "name": "Sudhendra Devi",
      "jobTitle": "HR Manager",
      "image": "https://www.softsuave.com/assets/new-formate/about/hr.webp",
      "worksfor": {
        "@type": "Organization",
        "name": "Soft Suave Technologies",
        "url": "https://www.softsuave.com/"
      }
    }
  ]
};
