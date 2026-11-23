import { describe, it, expect } from 'vitest';
import { draftPayload, enquiresBase } from './draft';
import { leadEndpoint } from './forward';
import { leadRouting, DRAFT_ID_KEY } from '../forms/lead-routing';

// Each draft body must be what the live page's handleFieldBlur* function sends to the same endpoint
// (softsuave.com/new-assets/common/js/email-utility.js), field names and empty-value defaults included.

const page = {
  url: 'https://www.softsuave.com/case-study-vehicle-intelligence',
  origin: 'https://www.softsuave.com',
  path: '/case-study-vehicle-intelligence',
};
const where = { city: 'Chennai', region: 'Tamil Nadu', country: 'IN' };
const geo = { ipAddress: '203.0.113.7', city: 'Chennai', region: 'Tamil Nadu', country: 'IN' };

describe('draftPayload', () => {
  it('developer and contactUs: name, email, phone, description, url and location, with the live defaults', () => {
    for (const type of ['developer', 'contactUs'] as const) {
      expect(draftPayload({ type, fields: { email: 'a@b.co' } }, page, '203.0.113.7', where)).toEqual({
        name: ' ',
        email: 'a@b.co',
        phone: '+91',
        description: ' ',
        url: page.url,
        ...geo,
      });
    }
  });

  it('freeQuote: the message is projectDescription and the company goes along', () => {
    expect(
      draftPayload({ type: 'freeQuote', fields: { name: 'Jo', description: 'An app', company: 'Acme' } }, page, '203.0.113.7', where),
    ).toEqual({ name: 'Jo', email: '', phone: '+91', projectDescription: 'An app', company: 'Acme', url: page.url, ...geo });
  });

  it('caseStudy: site root as url, the page as caseStudyUrl, its path without the slash as caseStudyType', () => {
    expect(draftPayload({ type: 'caseStudy', fields: { phone: '+91 9876543210' } }, page, '203.0.113.7', where)).toEqual({
      name: ' ',
      email: '',
      phone: '+91 9876543210',
      caseStudyType: 'case-study-vehicle-intelligence',
      caseStudyUrl: page.url,
      url: 'https://www.softsuave.com/',
      ...geo,
    });
  });

  it('sends the row id back once the first save returned one', () => {
    expect(draftPayload({ type: 'developer', uniqueid: '42', fields: {} }, page, '', where).uniqueid).toBe('42');
    expect('uniqueid' in draftPayload({ type: 'developer', fields: {} }, page, '', where)).toBe(false);
  });

  it('strips accents from the city, as the live page does', () => {
    expect(draftPayload({ type: 'developer', fields: {} }, page, '', { ...where, city: 'São Paulo' }).city).toBe('Sao Paulo');
  });
});

describe('endpoints', () => {
  it('drafts and submits live beside LEAD_FORWARD_URL under /forms/enquires/', () => {
    expect(enquiresBase()).toMatch(/\/forms\/enquires\/$/);
    expect(leadEndpoint()).toMatch(/\/forms\/enquires\/developer$/);
    expect(leadEndpoint('contactUs')).toMatch(/\/forms\/enquires\/contactUs$/);
    expect(leadEndpoint('freeQuote')).toMatch(/\/forms\/enquires\/freeQuote$/);
  });
});

describe('leadRouting', () => {
  it('a hero card saves to contactUs and submits to developer, as the live hero forms do', () => {
    expect(leadRouting('/hire-react-developers')).toEqual({ draft: 'contactUs', submit: 'developer' });
  });
  it('the closing band is the live footer form: free quote both ways', () => {
    expect(leadRouting('/hire-react-developers', 'close')).toEqual({ draft: 'freeQuote', submit: 'freeQuote' });
  });
  it('a case-study download uses the case-study pair wherever it sits', () => {
    expect(leadRouting('/case-study-vehicle-intelligence', 'hero', true)).toEqual({ draft: 'caseStudy', submit: 'caseStudy' });
  });
  it('the contact and free-quote pages use contactUs both ways', () => {
    expect(leadRouting('/contact')).toEqual({ draft: 'contactUs', submit: 'contactUs' });
    expect(leadRouting('/free-quote/')).toEqual({ draft: 'contactUs', submit: 'contactUs' });
  });
  it('keeps the ids under the live pages\' sessionStorage keys', () => {
    expect(DRAFT_ID_KEY).toEqual({
      developer: 'developerUniqueId',
      contactUs: 'contactUniqueId',
      freeQuote: 'freeQuoteUniqueId',
      caseStudy: 'caseStudyUniqueId',
    });
  });
});
