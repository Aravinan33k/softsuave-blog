import type { JSONContent } from '@tiptap/core';

// Build FAQPage JSON-LD from a post's TipTap document by walking its `faqItem`
// nodes (question attribute + answer text). Returns null when the post has no
// FAQ block, so callers can conditionally include it. Emitting this schema makes
// FAQ blocks eligible for Google's rich results.

function collectText(node: JSONContent): string {
  let out = node.type === 'text' && node.text ? node.text : '';
  if (node.content) for (const child of node.content) out += ` ${collectText(child)}`;
  return out;
}

export function faqLd(doc: unknown): Record<string, unknown> | null {
  const root = doc as JSONContent | null;
  if (!root || !Array.isArray(root.content)) return null;

  const items: { q: string; a: string }[] = [];
  const walk = (node: JSONContent) => {
    if (node.type === 'faqItem') {
      const q = String(node.attrs?.question ?? '').trim();
      const a = (node.content ?? [])
        .map(collectText)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
      if (q && a) items.push({ q, a });
    }
    if (node.content) node.content.forEach(walk);
  };
  walk(root);
  if (items.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}
