'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import type { TocItem } from '../_contract';

// Compact, self-contained table of contents: a fixed-height box that scrolls
// internally (never the page). Scrollspy highlights the current section and keeps
// it in view within the box, so the Share/CTA cards below stay pinned.
export function PostToc({ items, className }: { items: TocItem[]; className?: string }) {
  const [active, setActive] = useState('');
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-100px 0px -66% 0px', threshold: 0 },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  // Keep the active item visible by scrolling ONLY the TOC box (no page jump).
  useEffect(() => {
    const box = listRef.current;
    if (!active || !box) return;
    const link = box.querySelector<HTMLElement>(`a[data-id="${active}"]`);
    if (!link) return;
    const b = box.getBoundingClientRect();
    const l = link.getBoundingClientRect();
    if (l.top < b.top || l.bottom > b.bottom) {
      box.scrollTop += l.top - b.top - (box.clientHeight - link.clientHeight) / 2;
    }
  }, [active]);

  return (
    <nav aria-label="Table of contents" className={cn('rounded-2xl border border-neutral-200 bg-white p-5', className)}>
      <p className="ss-heading mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
        <span className="h-px w-5 bg-[#ff0042]" />
        On this page
      </p>
      <ul ref={listRef} className="ss-scroll max-h-[40vh] overflow-y-auto pr-1 text-sm">
        {items.map((t) => (
          <li key={t.id}>
            <a
              href={`#${t.id}`}
              data-id={t.id}
              aria-current={active === t.id ? 'true' : undefined}
              className={cn(
                'block border-l-2 py-1.5 leading-snug transition-colors',
                t.level >= 3 ? 'pl-6' : 'pl-3',
                active === t.id
                  ? 'border-[#ff0042] font-semibold text-[#ff0042]'
                  : 'border-neutral-100 text-neutral-500 hover:border-neutral-300 hover:text-neutral-900',
              )}
            >
              {t.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
