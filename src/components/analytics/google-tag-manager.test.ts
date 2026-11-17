import { describe, expect, it } from 'vitest';
import type { ReactElement } from 'react';
import { GoogleTagManagerHead } from './google-tag-manager';
import { gtmHosts } from '@/lib/flags';

/** The inline snippet the head renders. */
function snippet(): string {
  const el = GoogleTagManagerHead() as ReactElement<{ dangerouslySetInnerHTML: { __html: string } }>;
  return el.props.dangerouslySetInnerHTML.__html;
}

/** Runs the snippet against a stub page on `hostname`; returns the script URLs it injected. */
function run(hostname: string): string[] {
  const injected: string[] = [];
  const anchor = { parentNode: { insertBefore: (s: { src: string }) => injected.push(s.src) } };
  const document = { getElementsByTagName: () => [anchor], createElement: () => ({ src: '', async: false }) };
  const window = {} as Record<string, unknown>;
  new Function('window', 'document', 'location', snippet())(window, document, { hostname });
  return injected;
}

describe('GTM head snippet', () => {
  it('runs on the live hosts by default', () => {
    expect(gtmHosts).toEqual(['www.softsuave.com', 'softsuave.com']);
    expect(run('www.softsuave.com')).toEqual(['https://www.googletagmanager.com/gtm.js?id=GTM-TWMFSDC']);
  });

  it('does nothing on dev, preview, tester and proxy hosts', () => {
    for (const host of [
      'localhost',
      'softsuave-site.local',
      'softsuave-new-git-development-aravinan33ks-projects.vercel.app',
      'www-softsuave-com.translate.goog',
      'responsivechecker.net',
    ]) {
      expect(run(host), host).toEqual([]);
    }
  });

  it('keeps the container ID and gtm.js URL in the HTML for GTM checkers', () => {
    expect(snippet()).toContain("'GTM-TWMFSDC'");
    expect(snippet()).toContain('https://www.googletagmanager.com/gtm.js?id=');
  });
});
