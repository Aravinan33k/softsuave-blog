import { describe, expect, it } from 'vitest';

import { footer } from './content';
import { homeJsonLd } from './home-seo';
import { HOME_LIVE_JSON_LD, liveLocalBusiness, liveOrganization, liveService } from './home-live-schema';
import { organizationLd } from '@/lib/seo/organization';

/**
 * The homepage's structured data is a verbatim mirror of softsuave.com's —
 * its three JSON-LD blocks and the footer's PostalAddress microdata. What is
 * pinned is that it STAYS a mirror: the live quirks are asserted on purpose, so
 * a well-meant "fix" here fails loudly instead of drifting from the live site.
 */

const type = (n: Record<string, unknown>) => n['@type'];

describe('homeJsonLd', () => {
  it("emits the live homepage's blocks, in the live order", () => {
    expect(homeJsonLd().map(type)).toEqual(['Service', 'LocalBusiness', 'Organization']);
    expect(homeJsonLd()).toEqual(HOME_LIVE_JSON_LD);
  });

  it('returns copies, so a caller cannot edit the source', () => {
    const first = homeJsonLd();
    first[0].name = 'changed';
    expect(homeJsonLd()[0].name).toBe('Softsuave Technologies');
  });

  it("keeps the live markup's values as-is", () => {
    const [service, business, org] = [liveService, liveLocalBusiness, liveOrganization];
    expect(service['@context']).toBe('http://schema.org');
    expect(service.areaServed).toContain('UK');
    expect(service.offers).toMatchObject({ price: 'Variable', priceValidUntil: '2025-12-31' });
    expect(service.serviceType).toContain('Xamarian App Development');
    expect(service.hasOfferCatalog.itemListElement).toHaveLength(24);
    expect(business.address.streetAddress).toBe('3210 Vogel Rd');
    expect(org.name).toBe('Soft Suave Technologies');
    expect(org.sameAs).toHaveLength(5);
  });
});

describe('footer office microdata', () => {
  it('marks up the USA office only, with the live footer’s fields', () => {
    const marked = footer.offices.filter((o) => 'microdata' in o);
    expect(marked.map((o) => o.region)).toEqual(['USA']);
    const usa = marked[0] as (typeof footer.offices)[0];
    expect(usa.company).toBe('Soft Suave LLC');
    expect(usa.microdata).toEqual({
      postOfficeBoxNumber: '3030 K Street NW',
      addressLocality: 'Suite 102',
      addressRegion: 'Washington',
      postalCode: 'DC 20007',
      addressCountry: 'USA',
      email: 'contact@softsuave.com',
      telephone: ['+1 (410) 220-6301', '+44 7403 646450', '+91 8015159981 (HR)'],
    });
  });
});

describe('organizationLd', () => {
  it('lists the Facebook profile once, alongside the other profiles', () => {
    expect(organizationLd.sameAs).toContain('https://www.facebook.com/softsuave/');
    expect(new Set(organizationLd.sameAs).size).toBe(organizationLd.sameAs.length);
  });
});
