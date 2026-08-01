import 'server-only';
import { generateHTML } from '@tiptap/html';
import type { JSONContent } from '@tiptap/core';
import DOMPurify from 'isomorphic-dompurify';
import { baseExtensions } from '../tiptap/extensions';

// Server-side pipeline: TipTap JSON → HTML → sanitized HTML, plus content stats.
// Even though only admins author content, we sanitize as defense-in-depth (the
// stored HTML is always treated as untrusted on render).

const ALLOWED_TAGS = [
  'p', 'br', 'hr', 'h2', 'h3', 'h4',
  'strong', 'b', 'em', 'i', 'u', 's', 'code', 'pre',
  'blockquote', 'ul', 'ol', 'li',
  'a', 'img', 'figure', 'figcaption', 'span', 'div',
  // Tables (comparison tables, etc.)
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th', 'caption', 'colgroup', 'col',
  // Custom blocks: FAQ (native accordion), embeds, structured sections.
  'section', 'details', 'summary', 'iframe',
];
const ALLOWED_ATTR = [
  'href', 'title', 'target', 'rel', 'src', 'alt', 'width', 'height', 'class',
  'colspan', 'rowspan', 'scope',
  // Image performance (Core Web Vitals) + iframe embeds (host-allowlisted below).
  'loading', 'decoding', 'allow', 'allowfullscreen', 'frameborder', 'referrerpolicy', 'open',
];

// Only these hosts may appear in an <iframe src>. Everything else is dropped.
const ALLOWED_IFRAME_HOSTS = new Set([
  'www.youtube-nocookie.com',
  'www.youtube.com',
  'youtube.com',
  'player.vimeo.com',
]);

let hooksInstalled = false;
function installHooks() {
  if (hooksInstalled) return;
  hooksInstalled = true;
  // Defense in depth: even though embeds are authored via our own nodes, enforce
  // the iframe host allowlist and strip srcdoc so a crafted src can't sneak through.
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    const name = (node.nodeName || '').toLowerCase();
    // Core Web Vitals: guarantee in-content images lazy-load, including HTML
    // imported from sources that never set the attribute. Explicit values win.
    if (name === 'img') {
      const img = node as unknown as Element;
      if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
      return;
    }
    if (name !== 'iframe') return;
    const el = node as unknown as Element;
    const src = el.getAttribute('src') ?? '';
    let host = '';
    try {
      host = new URL(src).host.toLowerCase();
    } catch {
      host = '';
    }
    if (!ALLOWED_IFRAME_HOSTS.has(host)) {
      el.parentNode?.removeChild(el);
      return;
    }
    el.removeAttribute('srcdoc');
    el.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
  });
}

export function sanitizeHtml(html: string): string {
  installHooks();
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
    // DOMPurify's default URI policy already blocks javascript:/vbscript: etc.
  });
}

export function renderTipTapToHtml(doc: JSONContent): string {
  const raw = generateHTML(doc, baseExtensions);
  return sanitizeHtml(raw);
}

/** Strip tags/entities to plain text. */
export function htmlToText(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function contentStats(html: string): { wordCount: number; readingTimeMinutes: number } {
  const text = htmlToText(html);
  const wordCount = text ? text.split(' ').length : 0;
  const readingTimeMinutes = wordCount === 0 ? 0 : Math.max(1, Math.ceil(wordCount / 200));
  return { wordCount, readingTimeMinutes };
}

/** Build a plain-text excerpt of up to `max` chars from rendered HTML. */
export function deriveExcerpt(html: string, max = 200): string {
  const text = htmlToText(html);
  if (text.length <= max) return text;
  return `${text.slice(0, max).replace(/\s+\S*$/, '')}…`;
}
