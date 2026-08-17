import { describe, it, expect } from 'vitest';
import { publicMediaUrl, withMediaBasePath, appPath } from './media-url';
import { BASE_PATH } from './flags';

describe('publicMediaUrl', () => {
  it('prefixes a stored root-relative upload path', () => {
    expect(publicMediaUrl('/uploads/2026/08/a.webp')).toBe(`${BASE_PATH}/uploads/2026/08/a.webp`);
  });

  // Guards the double-prefix bug: /blog/blog/uploads/… serves nothing.
  it('is idempotent', () => {
    const once = publicMediaUrl('/uploads/a.webp');
    expect(publicMediaUrl(once)).toBe(once);
  });

  it.each([
    'https://res.cloudinary.com/demo/image/upload/a.webp',
    'http://example.com/a.png',
    '//cdn.example.com/a.png',
    'data:image/gif;base64,R0lGOD',
  ])('leaves the absolute source %s untouched', (url) => {
    expect(publicMediaUrl(url)).toBe(url);
  });

  it.each([null, undefined, ''])('maps the empty value %s to null', (v) => {
    expect(publicMediaUrl(v as string | null)).toBeNull();
  });

  it('leaves a non-site-absolute value alone', () => {
    expect(publicMediaUrl('uploads/a.webp')).toBe('uploads/a.webp');
  });
});

describe('withMediaBasePath', () => {
  it('prefixes src attributes pointing at uploads', () => {
    expect(withMediaBasePath('<img src="/uploads/a.webp">')).toBe(`<img src="${BASE_PATH}/uploads/a.webp">`);
  });

  it('handles single quotes and srcset', () => {
    expect(withMediaBasePath("<img src='/uploads/a.webp'>")).toContain(`${BASE_PATH}/uploads/a.webp`);
    expect(withMediaBasePath('<img srcset="/uploads/a.webp 1x">')).toContain(`${BASE_PATH}/uploads/a.webp 1x`);
  });

  it('rewrites every image in a document', () => {
    const out = withMediaBasePath('<img src="/uploads/a.webp"><p>x</p><img src="/uploads/b.webp">');
    expect(out.match(new RegExp(`${BASE_PATH}/uploads/`, 'g'))).toHaveLength(2);
  });

  it('does not double-prefix already-prefixed HTML', () => {
    const once = withMediaBasePath('<img src="/uploads/a.webp">');
    expect(withMediaBasePath(once)).toBe(once);
  });

  it('leaves absolute image sources untouched', () => {
    const html = '<img src="https://res.cloudinary.com/demo/a.webp">';
    expect(withMediaBasePath(html)).toBe(html);
  });

  // Only src/srcset are rewritten — an in-content link to /uploads must not move,
  // and no other root-relative URL should be touched.
  it('does not rewrite hrefs or unrelated paths', () => {
    expect(withMediaBasePath('<a href="/uploads/a.pdf">x</a>')).toBe('<a href="/uploads/a.pdf">x</a>');
    expect(withMediaBasePath('<img src="/images/a.webp">')).toBe('<img src="/images/a.webp">');
  });
});

describe('appPath', () => {
  it('prefixes an API path so fetch() reaches the mounted app', () => {
    expect(appPath('/api/v1/auth/login')).toBe(`${BASE_PATH}/api/v1/auth/login`);
  });

  it('preserves the query string', () => {
    expect(appPath('/api/v1/admin/posts?q=x&perPage=8')).toBe(`${BASE_PATH}/api/v1/admin/posts?q=x&perPage=8`);
  });

  it('is idempotent', () => {
    const once = appPath('/api/v1/posts');
    expect(appPath(once)).toBe(once);
  });

  it.each(['https://example.com/api', '//cdn.example.com/x'])('leaves absolute %s alone', (u) => {
    expect(appPath(u)).toBe(u);
  });

  it('leaves relative paths alone', () => {
    expect(appPath('api/v1/posts')).toBe('api/v1/posts');
  });
});
