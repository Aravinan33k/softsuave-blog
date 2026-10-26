import { describe, it, expect } from 'vitest';
import { leadPageUrl } from './forward';

// The lead email's "Page" link. It must name the deployment the visitor was
// actually on — the browser's Origin header on the form POST — so a lead from
// the test server links there and one from production links to production.

const post = (origin?: string) =>
  new Request('http://internal:3000/api/v1/enquiry', {
    method: 'POST',
    headers: origin ? { origin } : {},
  });

describe('leadPageUrl', () => {
  it('uses the origin the visitor submitted from', () => {
    expect(leadPageUrl(post('http://localhost:3100'), '/hire-ai-developer')).toBe(
      'http://localhost:3100/hire-ai-developer',
    );
    expect(leadPageUrl(post('http://54.237.230.68'), '/hire-ai-developer')).toBe(
      'http://54.237.230.68/hire-ai-developer',
    );
    expect(leadPageUrl(post('https://www.softsuave.com'), '/hire-ai-developer')).toBe(
      'https://www.softsuave.com/hire-ai-developer',
    );
  });

  it('ignores the internal address the proxy forwarded to', () => {
    expect(leadPageUrl(post('https://www.softsuave.com'), '/contact')).not.toContain('internal');
  });

  it('falls back to the site URL when the request carries no origin', () => {
    expect(leadPageUrl(post(), '/contact')).toBe(new URL('/contact', process.env.NEXT_PUBLIC_SITE_URL || 'https://www.softsuave.com').toString());
  });
});
