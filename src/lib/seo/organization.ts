/**
 * Soft Suave's own Organization JSON-LD — a site-wide identity fact rather
 * than anything page-specific: legal name, offices, contact points, the
 * ISO 27001 credential, and the KiwiTech parent relationship since its
 * November 2025 acquisition of a majority stake in Soft Suave.
 *
 * Kept as a single static constant, referenced by its `@id` from any other
 * schema's `provider`/`publisher` field, so an @id-linked graph never repeats
 * the full object — see `nextjs-development-company.ts` for that pattern.
 *
 * This is provided marketing/legal copy, reproduced verbatim. It is emitted
 * once per document as half of `MARKETING_SITE_GRAPH` — by the marketing
 * layout for that surface, and by the blog archive, post, category and tag
 * routes for theirs — and referenced by `@id` from everything else.
 */
export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.softsuave.com/#organization',
  name: 'Soft Suave Technologies',
  alternateName: 'Soft Suave',
  url: 'https://www.softsuave.com/',
  logo: 'https://www.softsuave.com/new-assets/common/images/softsuave_logo.webp',
  description:
    'Soft Suave is an AI-enabled engineering partner helping businesses build scalable AI solutions, automate complex workflows, and integrate modern technologies through augmented teams and dedicated developers.',
  foundingDate: '2012',
  email: 'contact@softsuave.com',
  address: [
    {
      '@type': 'PostalAddress',
      name: 'Soft Suave Technologies — Head Office',
      streetAddress: 'SSPDL Building, Alpha City, Gamma Block, 5th Floor, Navalur',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      postalCode: '603103',
      addressCountry: 'IN',
    },
    {
      '@type': 'PostalAddress',
      name: 'Soft Suave Technologies — Development Centre',
      streetAddress: 'MFAR Silverline Tech Park, 1st Floor, 180 EPIP Zone, EPIP 2nd Phase, Whitefield',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560066',
      addressCountry: 'IN',
    },
    {
      '@type': 'PostalAddress',
      name: 'Soft Suave — US Sales Office',
      streetAddress: '3210 Vogel Rd',
      addressLocality: 'Ellicott City',
      addressRegion: 'MD',
      postalCode: '21043',
      addressCountry: 'US',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+1-410-220-6301',
      contactType: 'sales',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    {
      '@type': 'ContactPoint',
      telephone: '+44-7403-646450',
      contactType: 'sales',
      areaServed: 'GB',
      availableLanguage: 'English',
    },
    {
      '@type': 'ContactPoint',
      telephone: '+91-99527-32708',
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['English', 'Tamil', 'Hindi'],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+91-8015159981',
      contactType: 'human resources',
      areaServed: 'IN',
      availableLanguage: ['English', 'Tamil', 'Hindi'],
    },
  ],
  sameAs: [
    'https://in.linkedin.com/company/softsuave',
    'https://www.instagram.com/softsuavetech/',
    'https://www.youtube.com/@softsuave',
    'https://clutch.co/profile/soft-suave-technologies',
    'https://www.goodfirms.co/company/soft-suave',
  ],
  knowsAbout: [
    'Software Development',
    'Artificial Intelligence Development',
    'Mobile App Development',
    'Web Application Development',
    'Cloud Computing',
    'DevOps',
    'Legacy Modernization',
    'Product Engineering',
    'IT Staff Augmentation',
    'Offshore Software Development',
    'Global Capability Centers',
  ],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'certification',
    name: 'ISO/IEC 27001:2022 Information Security Management',
  },
  parentOrganization: {
    '@type': 'Organization',
    '@id': 'https://www.kiwitech.com/#organization',
    name: 'KiwiTech, LLC',
    url: 'https://www.kiwitech.com/',
    description:
      'KiwiTech is a US-based technology and innovation company supporting early and growth-stage startups. KiwiTech acquired a majority stake in Soft Suave Technologies in November 2025.',
    foundingDate: '2009',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3030 K Street NW, Suite 102',
      addressLocality: 'Washington',
      addressRegion: 'DC',
      postalCode: '20007',
      addressCountry: 'US',
    },
  },
} as const;
