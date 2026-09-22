import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import { footer } from './content';
import { homeJsonLd, homeLocalBusinessLd, homeServiceLd } from './home-seo';
import { HOME_SERVICE_CATALOG } from './home-service-catalog';
import { absoluteUrl } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';

/**
 * The homepage's structured data: Service, LocalBusiness and the footer's
 * PostalAddress microdata, alongside the WebPage and proof list it already had.
 *
 * What is pinned is what breaks silently — a catalogue link to a page that no
 * longer exists, an `@id` reference to a node that is not there, and the brief's
 * invalid values ("UK", `price: "Variable"`, an expired `priceValidUntil`)
 * creeping back in.
 */

const HOME = absoluteUrl('/');
const type = (n: Record<string, unknown>) => n['@type'];

describe('homeJsonLd', () => {
  it('emits WebPage, ItemList, Service and LocalBusiness', () => {
    expect(homeJsonLd().map(type)).toEqual(['WebPage', 'ItemList', 'Service', 'LocalBusiness']);
  });

  it('gives every node a unique @id under the homepage', () => {
    const ids = homeJsonLd().map((n) => n['@id'] as string);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id.startsWith(`${HOME}#`)).toBe(true);
  });

  it('does not describe the company again — the layout emits the one Organization', () => {
    expect(JSON.stringify(homeJsonLd())).not.toContain('"@type":"Organization"');
  });
});

describe('homeServiceLd', () => {
  const service = homeServiceLd();

  it('names the site-wide organization as provider, by @id', () => {
    expect(service.provider).toEqual({ '@id': organizationLd['@id'] });
    expect(service.name).toBe(organizationLd.name);
  });

  it('uses ISO 3166-1 country codes — GB, never UK', () => {
    const offers = service.offers as Record<string, unknown>;
    for (const codes of [service.areaServed, offers.eligibleRegion] as string[][]) {
      expect(codes).toContain('GB');
      expect(codes).not.toContain('UK');
      for (const c of codes) expect(c).toMatch(/^[A-Z]{2}$/);
    }
  });

  it('carries no non-numeric price and no expired validity date', () => {
    const offers = service.offers as Record<string, unknown>;
    expect(offers.price).toBeUndefined();
    expect(offers.priceValidUntil).toBeUndefined();
  });

  it('lists the whole catalogue as Offers of Services with absolute URLs', () => {
    const catalog = service.hasOfferCatalog as { itemListElement: Record<string, unknown>[] };
    expect(catalog.itemListElement).toHaveLength(HOME_SERVICE_CATALOG.length);
    for (const offer of catalog.itemListElement) {
      expect(offer['@type']).toBe('Offer');
      expect(offer.url).toMatch(/^https?:\/\//);
      expect((offer.itemOffered as Record<string, unknown>)['@type']).toBe('Service');
    }
  });
});

describe('HOME_SERVICE_CATALOG', () => {
  it('links only to routes this app serves', () => {
    const marketing = path.resolve(import.meta.dirname, '../../app/(marketing)');
    const missing = HOME_SERVICE_CATALOG.filter((s) => !existsSync(path.join(marketing, s.path, 'page.tsx')));
    expect(missing.map((s) => s.path)).toEqual([]);
  });

  it('gives every service its own name, page and description', () => {
    for (const key of ['name', 'path', 'description'] as const) {
      const values = HOME_SERVICE_CATALOG.map((s) => s[key]);
      expect(new Set(values).size).toBe(values.length);
    }
  });
});

describe('homeLocalBusinessLd', () => {
  const business = homeLocalBusinessLd();

  it('sits at the US sales office organizationLd already lists', () => {
    const office = organizationLd.address.find((a) => a.addressCountry === 'US')!;
    expect(business.address).toEqual({
      '@type': 'PostalAddress',
      streetAddress: office.streetAddress,
      addressLocality: office.addressLocality,
      addressRegion: office.addressRegion,
      postalCode: office.postalCode,
      addressCountry: 'US',
    });
  });

  it('ties back to the organization by @id', () => {
    expect(business.parentOrganization).toEqual({ '@id': organizationLd['@id'] });
  });
});

describe('footer office addresses', () => {
  it('gives every office a complete PostalAddress for the microdata', () => {
    for (const office of footer.offices) {
      const a = office.address;
      for (const field of [a.streetAddress, a.addressLocality, a.addressRegion, a.postalCode]) {
        expect(field.trim()).not.toBe('');
      }
      expect(a.addressCountry).toMatch(/^[A-Z]{2}$/);
    }
  });
});

describe('organizationLd', () => {
  it('lists the Facebook profile once, alongside the other profiles', () => {
    expect(organizationLd.sameAs).toContain('https://www.facebook.com/softsuave/');
    expect(new Set(organizationLd.sameAs).size).toBe(organizationLd.sameAs.length);
  });
});
