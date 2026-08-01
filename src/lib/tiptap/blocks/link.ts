import { Link } from '@tiptap/extension-link';
import { mergeAttributes } from '@tiptap/core';

// External-aware link mark. External links (absolute http/https) render with
// rel="noopener noreferrer nofollow" target="_blank"; internal links (relative,
// e.g. our re-pointed /slug post links) render clean — followed, same tab —
// which is correct for internal linking + SEO.
export const SmartLink = Link.extend({
  renderHTML({ HTMLAttributes }) {
    const href = typeof HTMLAttributes.href === 'string' ? HTMLAttributes.href : '';
    const isExternal = /^https?:\/\//i.test(href);
    // Drop any parsed rel/target, then set our own based on internal/external.
    const rest: Record<string, unknown> = { ...HTMLAttributes };
    delete rest.rel;
    delete rest.target;
    return [
      'a',
      isExternal
        ? mergeAttributes(rest, { rel: 'noopener noreferrer nofollow', target: '_blank' })
        : mergeAttributes(rest, { rel: 'noopener' }),
      0,
    ];
  },
}).configure({ openOnClick: false, autolink: true });
