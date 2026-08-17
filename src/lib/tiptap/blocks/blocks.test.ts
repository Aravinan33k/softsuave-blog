import { describe, it, expect } from 'vitest';
import { getSchema, type JSONContent } from '@tiptap/core';
import { baseExtensions } from '../extensions';
import { renderTipTapToHtml } from '@/lib/content/render';
import { faqLd } from '@/lib/seo/faq-ld';
import { parseVimeoId, vimeoEmbedUrl } from './vimeo';
import { filledStars } from './rating';
import { relatedHref } from './related-post';

const schema = getSchema(baseExtensions);
const doc = (node: JSONContent): JSONContent => ({ type: 'doc', content: [node] });
// Full publish pipeline, so every assertion is about post-sanitizer output.
const publish = (node: JSONContent) => renderTipTapToHtml(doc(node));
const valid = (node: JSONContent) => {
  schema.nodeFromJSON(doc(node)).check();
  return true;
};

describe('parseVimeoId', () => {
  it.each([
    ['76979871', '76979871', ''],
    ['76979871/abc123', '76979871', 'abc123'],
    ['https://vimeo.com/76979871', '76979871', ''],
    ['https://vimeo.com/76979871/abc123', '76979871', 'abc123'],
    ['https://player.vimeo.com/video/76979871', '76979871', ''],
    ['https://player.vimeo.com/video/76979871?h=abc123', '76979871', 'abc123'],
    ['https://vimeo.com/channels/staffpicks/76979871', '76979871', ''],
    ['https://vimeo.com/groups/shortfilms/videos/76979871', '76979871', ''],
  ])('parses %s', (input, id, hash) => {
    expect(parseVimeoId(input)).toEqual({ id, hash });
  });

  it.each(['', 'not a url', 'https://youtube.com/watch?v=dQw4w9WgXcQ', '123'])('rejects %s', (input) => {
    expect(parseVimeoId(input)).toBeNull();
  });

  it('appends the privacy hash to the embed URL only when present', () => {
    expect(vimeoEmbedUrl('76979871', '')).toBe('https://player.vimeo.com/video/76979871');
    expect(vimeoEmbedUrl('76979871', 'abc')).toBe('https://player.vimeo.com/video/76979871?h=abc');
  });
});

describe('vimeoEmbed node', () => {
  const node = (attrs: Record<string, unknown>) => ({ type: 'vimeoEmbed', attrs });

  it('renders a player.vimeo.com iframe that survives the host allowlist', () => {
    const html = publish(node({ videoId: '76979871' }));
    expect(html).toContain('<iframe');
    expect(html).toContain('player.vimeo.com/video/76979871');
  });

  it('keeps the iframe for an unlisted video with a privacy hash', () => {
    expect(publish(node({ videoId: '76979871', videoHash: 'abc123' }))).toContain('?h=abc123');
  });

  it('does not leak SEO-only attributes into the markup', () => {
    const html = publish(node({ videoId: '76979871', description: 'DESC', uploadDate: '2026-01-01' }));
    expect(html).not.toContain('DESC');
    expect(html).not.toContain('2026-01-01');
  });
});

describe('ratingBlock', () => {
  it.each([
    [5, 5, 5],
    [4.8, 5, 5],
    [4.2, 5, 4],
    [2.5, 5, 3], // .5 rounds up
    [0, 5, 0],
    [-3, 5, 0], // clamped
    [99, 5, 5], // clamped
    [8, 10, 4], // non-5 scale
  ])('maps %s/%s to %s filled stars', (score, max, expected) => {
    expect(filledStars(score, max)).toBe(expected);
  });

  it.each([
    [Number.NaN, 5],
    [4, Number.NaN],
    [4, 0],
  ])('returns 0 stars for unusable input (%s/%s)', (score, max) => {
    expect(filledStars(score, max)).toBe(0);
  });

  it('always prints the exact score alongside the rounded stars', () => {
    const html = publish({ type: 'ratingBlock', attrs: { score: '4.7', max: '5', label: 'Clutch', count: '39 reviews' } });
    expect(html).toContain('4.7/5');
    expect(html).toContain('★★★★★'); // 4.7/5 rounds to 5
    expect(html).toContain('Clutch');
    expect(html).toContain('39 reviews');
  });

  it('keeps aria-hidden on the decorative stars through sanitization', () => {
    expect(publish({ type: 'ratingBlock', attrs: {} })).toContain('aria-hidden="true"');
  });

  it('omits the optional label and count when blank', () => {
    const html = publish({ type: 'ratingBlock', attrs: { score: '3', max: '5', label: '', count: '' } });
    expect(html).not.toContain('rating-label');
    expect(html).not.toContain('rating-count');
  });
});

describe('imageGallery', () => {
  const items = [
    { src: '/uploads/a.webp', alt: 'A', caption: 'First' },
    { src: '/uploads/b.webp', alt: 'B', caption: '' },
  ];

  it('renders one figure per image with the column class', () => {
    const html = publish({ type: 'imageGallery', attrs: { items, columns: '3' } });
    expect(html).toContain('gallery-3');
    expect(html.match(/<figure/g)).toHaveLength(2);
    expect(html.match(/<img/g)).toHaveLength(2);
  });

  it('emits a figcaption only for images that have one', () => {
    const html = publish({ type: 'imageGallery', attrs: { items, columns: '2' } });
    expect(html.match(/<figcaption/g)).toHaveLength(1);
    expect(html).toContain('First');
  });

  it('drops entries with no src', () => {
    const html = publish({ type: 'imageGallery', attrs: { items: [{ src: '', alt: '', caption: 'x' }], columns: '2' } });
    expect(html).not.toContain('<img');
  });

  it('lazy-loads gallery images', () => {
    expect(publish({ type: 'imageGallery', attrs: { items, columns: '2' } })).toContain('loading="lazy"');
  });
});

describe('accordion', () => {
  const accordion = (title: string, body: string): JSONContent => ({
    type: 'accordion',
    content: [
      {
        type: 'accordionItem',
        attrs: { title },
        content: [{ type: 'paragraph', content: [{ type: 'text', text: body }] }],
      },
    ],
  });

  it('is schema valid and publishes as a native details/summary', () => {
    expect(valid(accordion('More detail', 'Body text'))).toBe(true);
    const html = publish(accordion('More detail', 'Body text'));
    expect(html).toContain('<details class="ac-item"');
    expect(html).toContain('<summary>More detail</summary>');
    expect(html).toContain('Body text');
  });

  // The whole reason accordionItem is a separate node type from faqItem.
  it('does NOT contribute to FAQPage schema', () => {
    expect(faqLd(doc(accordion('Not a question', 'Not an answer')))).toBeNull();
  });

  it('does not collide with the FAQ block, which still produces schema', () => {
    const faq: JSONContent = {
      type: 'faq',
      content: [
        {
          type: 'faqItem',
          attrs: { question: 'Real question?' },
          content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Real answer.' }] }],
        },
      ],
    };
    expect(faqLd(doc(faq))).not.toBeNull();
  });
});

describe('relatedPost', () => {
  it.each([
    ['my-post', '/my-post'],
    ['/my-post', '/my-post'],
    ['', '#'],
    ['   ', '#'],
  ])('normalises slug %s to %s', (slug, href) => {
    expect(relatedHref(slug)).toBe(href);
  });

  it('publishes as an aside that survives sanitization', () => {
    const html = publish({
      type: 'relatedPost',
      attrs: { slug: 'guide', title: 'The Guide', excerpt: 'A teaser', label: 'Read next' },
    });
    expect(html).toContain('<aside class="related-card"');
    expect(html).toContain('href="/guide"');
    expect(html).toContain('The Guide');
    expect(html).toContain('A teaser');
    expect(html).toContain('Read next');
  });

  it('falls back to a placeholder title and a dead href when nothing is picked', () => {
    const html = publish({ type: 'relatedPost', attrs: {} });
    expect(html).toContain('Untitled post');
    expect(html).toContain('href="#"');
  });

  it('omits the excerpt paragraph when blank', () => {
    const html = publish({ type: 'relatedPost', attrs: { slug: 'x', title: 'T', excerpt: '' } });
    expect(html).not.toContain('related-card-excerpt');
  });
});
