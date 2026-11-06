import { describe, expect, it } from 'vitest';
import { ICON_KEYS, iconFor } from './icon-for';

/**
 * The picker replaces hand-numbered cards with glyphs read off the card's own
 * words. A wrong-but-confident glyph reads worse than a neutral one, so the
 * common subjects are pinned here.
 */
describe('iconFor', () => {
  it.each([
    ['Generative AI Consulting', 'sparkles'],
    ['Machine Learning Solutions', 'brain'],
    ['AI Chatbots and Virtual Assistants', 'bot'],
    ['Cloud Migration', 'cloud'],
    ['Strict NDA and IP Protection', 'lock'],
    ['Enterprise-Grade Security', 'shield'],
    ['Mobile App Development', 'smartphone'],
    ['Web Application Development', 'globe'],
    ['Data Analytics & Dashboards', 'chart'],
    ['API Integration', 'plug'],
    ['Skilled Talent Pool', 'users'],
    ['Time Zone Overlap', 'clock'],
    ['Cost Savings', 'piggy'],
    ['Transparent Pricing', 'dollar'],
    ['QA & Testing', 'bug'],
    ['Discovery', 'search'],
    ['UI/UX Design', 'pen'],
    ['Development', 'code'],
    ['Deployment', 'rocket'],
    ['Launch and Go-Live', 'rocket'],
    ['Support & Maintenance', 'lifebuoy'],
    ['Strategy and Consulting', 'compass'],
    ['Scale on Demand', 'trending'],
    ['Legacy Modernization', 'refresh'],
    ['Fintech', 'landmark'],
    ['Healthcare', 'heart'],
  ] as const)('%s → %s', (title, key) => {
    expect(iconFor(title)).toBe(key);
  });

  it('reads the title before the body', () => {
    // The body mentions security; the heading is about the cloud.
    expect(iconFor('Cloud Hosting', 'Secure by default, with compliance built in.')).toBe('cloud');
  });

  it('falls back to the body when the title says nothing matchable', () => {
    expect(iconFor('The Soft Suave Way', 'Our engineers join your team.')).toBe('users');
  });

  it('does not match words inside other words', () => {
    // "maintain" must not trip the AI rule; "rapid" must not trip the API one.
    expect(iconFor('Maintainable')).not.toBe('brain');
    expect(iconFor('Rapidity')).not.toBe('plug');
    // Engagement *models* are not AI models.
    expect(iconFor('Flexible Engagement Models')).not.toBe('brain');
  });

  it('gives a deterministic fallback that is always a known key', () => {
    const a = iconFor('Zxqv Wombat');
    expect(iconFor('Zxqv Wombat')).toBe(a);
    expect(ICON_KEYS).toContain(a);
    expect(ICON_KEYS).toContain(iconFor(''));
  });
});
