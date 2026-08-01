import { slugify } from './slug';
import type { TocItem } from '@/themes/_contract';

// Decode the handful of HTML entities that show up in headings so the TOC text
// (and anchor ids) read cleanly — e.g. "Skills &amp; Qualities" → "Skills & Qualities".
function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8217;/g, '’')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&hellip;|&#8230;/g, '…');
}

// Read-time safety net for stored HTML: imported/legacy content may predate
// the sanitize-time lazy-loading hook, so ensure in-content images lazy-load
// here too. Explicit loading/decoding attributes are left untouched.
export function withLazyImages(html: string): string {
  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    let out = tag;
    if (!/\bloading\s*=/i.test(out)) out = out.replace(/>$/, ' loading="lazy">');
    if (!/\bdecoding\s*=/i.test(out)) out = out.replace(/>$/, ' decoding="async">');
    return out;
  });
}

// Inject stable id attributes into h2/h3 headings of already-sanitized content
// HTML and return a table of contents. Runs at read time; ids are generated
// here (not user input), so no re-sanitisation is needed.
export function withHeadingAnchors(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();

  const out = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/gi, (_match, lvl: string, inner: string) => {
    const text = decodeEntities(inner.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
    const base = slugify(text) || 'section';
    let id = base;
    let n = 1;
    while (used.has(id)) {
      n += 1;
      id = `${base}-${n}`;
    }
    used.add(id);
    toc.push({ id, text, level: Number(lvl) });
    return `<h${lvl} id="${id}">${inner}</h${lvl}>`;
  });

  return { html: withLazyImages(out), toc };
}
