import { describe, it, expect } from 'vitest';
import type { JSONContent } from '@tiptap/core';
import { videoLd } from './video-ld';

const doc = (...nodes: JSONContent[]): JSONContent => ({ type: 'doc', content: nodes });

const COMPLETE = {
  videoId: 'dQw4w9WgXcQ',
  title: 'How we ship',
  description: 'A walkthrough of our delivery process.',
  uploadDate: '2026-02-01',
};
const youtube = (attrs: Record<string, unknown>) => ({ type: 'youtubeEmbed', attrs });
const vimeo = (attrs: Record<string, unknown>) => ({ type: 'vimeoEmbed', attrs });

describe('videoLd', () => {
  it('emits a complete VideoObject for a fully described YouTube embed', () => {
    const [ld] = videoLd(doc(youtube(COMPLETE)));
    expect(ld).toMatchObject({
      '@type': 'VideoObject',
      name: 'How we ship',
      description: 'A walkthrough of our delivery process.',
      uploadDate: '2026-02-01',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    });
    // Thumbnail is derived from the id — no author input needed for YouTube.
    expect(ld.thumbnailUrl).toBe('https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg');
  });

  it('returns an empty array for a document with no videos', () => {
    expect(videoLd(doc({ type: 'paragraph' }))).toEqual([]);
  });

  it.each([null, undefined, {}, { content: 'not-an-array' }])('tolerates malformed doc %s', (input) => {
    expect(videoLd(input)).toEqual([]);
  });

  it('emits one object per video', () => {
    const out = videoLd(doc(youtube(COMPLETE), youtube({ ...COMPLETE, videoId: 'abcdefghijk' })));
    expect(out).toHaveLength(2);
  });

  it('finds videos nested inside other blocks', () => {
    const nested = doc({ type: 'callout', content: [youtube(COMPLETE)] });
    expect(videoLd(nested)).toHaveLength(1);
  });

  describe('required-field enforcement', () => {
    it('skips a video with no title rather than emitting a partial object', () => {
      expect(videoLd(doc(youtube({ ...COMPLETE, title: '' })))).toEqual([]);
    });

    it.each(['YouTube video', 'youtube video', 'Vimeo video'])('treats %s as an untitled placeholder', (title) => {
      expect(videoLd(doc(youtube({ ...COMPLETE, title })))).toEqual([]);
    });

    it('skips a video with no resolvable description', () => {
      expect(videoLd(doc(youtube({ ...COMPLETE, description: '' })))).toEqual([]);
    });

    it('skips a video with no resolvable upload date', () => {
      expect(videoLd(doc(youtube({ ...COMPLETE, uploadDate: '' })))).toEqual([]);
    });

    it('skips a Vimeo embed with no thumbnail, since Vimeo has no derivable one', () => {
      expect(videoLd(doc(vimeo({ ...COMPLETE, videoId: '76979871' })))).toEqual([]);
    });

    it('emits a Vimeo VideoObject once a thumbnail is supplied', () => {
      const [ld] = videoLd(doc(vimeo({ ...COMPLETE, videoId: '76979871', thumbnailUrl: '/uploads/thumb.webp' })));
      expect(ld).toMatchObject({
        thumbnailUrl: '/uploads/thumb.webp',
        embedUrl: 'https://player.vimeo.com/video/76979871',
      });
    });

    it('includes the privacy hash in a Vimeo embedUrl', () => {
      const [ld] = videoLd(
        doc(vimeo({ ...COMPLETE, videoId: '76979871', videoHash: 'abc', thumbnailUrl: '/t.webp' })),
      );
      expect(ld.embedUrl).toBe('https://player.vimeo.com/video/76979871?h=abc');
    });
  });

  describe('post-level fallbacks', () => {
    it('falls back to the post excerpt and publish date', () => {
      const [ld] = videoLd(doc(youtube({ videoId: 'dQw4w9WgXcQ', title: 'T' })), {
        description: 'Post excerpt.',
        uploadDate: new Date('2026-03-04T10:00:00.000Z'),
      });
      expect(ld).toMatchObject({ description: 'Post excerpt.', uploadDate: '2026-03-04T10:00:00.000Z' });
    });

    it('prefers the video’s own values over the fallbacks', () => {
      const [ld] = videoLd(doc(youtube(COMPLETE)), { description: 'Post excerpt.', uploadDate: '2020-01-01' });
      expect(ld).toMatchObject({ description: COMPLETE.description, uploadDate: '2026-02-01' });
    });

    it('never falls back for the name — an untitled video stays skipped', () => {
      expect(videoLd(doc(youtube({ videoId: 'dQw4w9WgXcQ' })), { description: 'd', uploadDate: '2026-01-01' })).toEqual([]);
    });

    it.each([null, undefined, '', 'not-a-date', new Date('nope')])('ignores unusable fallback date %s', (bad) => {
      expect(videoLd(doc(youtube({ videoId: 'x', title: 'T' })), { description: 'd', uploadDate: bad as Date })).toEqual([]);
    });
  });
});
