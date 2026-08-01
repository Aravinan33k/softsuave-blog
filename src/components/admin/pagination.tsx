import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Server-rendered pagination for admin list tables: plain links built from the
// current query string, so it works without client JS. Renders nothing for a
// single page.
export function Pagination({ page, totalPages, hrefFor }: { page: number; totalPages: number; hrefFor: (p: number) => string }) {
  if (totalPages <= 1) return null;

  const window = pageWindow(page, totalPages);
  const btn = 'inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-sm transition-colors hover:bg-accent';
  const disabled = 'pointer-events-none opacity-40';

  return (
    <nav aria-label="Pagination" className="mt-4 flex items-center justify-between gap-2">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-1">
        {page > 1 ? (
          <Link href={hrefFor(page - 1)} aria-label="Previous page" className={btn}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
        ) : (
          <span aria-hidden className={cn(btn, disabled)}>
            <ChevronLeft className="h-4 w-4" />
          </span>
        )}
        {window.map((p, i) =>
          p === '…' ? (
            <span key={`gap-${i}`} className="px-1 text-sm text-muted-foreground">
              …
            </span>
          ) : (
            <Link
              key={p}
              href={hrefFor(p)}
              aria-current={p === page ? 'page' : undefined}
              className={cn(btn, p === page && 'border-primary bg-primary text-primary-foreground hover:bg-primary/90')}
            >
              {p}
            </Link>
          ),
        )}
        {page < totalPages ? (
          <Link href={hrefFor(page + 1)} aria-label="Next page" className={btn}>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span aria-hidden className={cn(btn, disabled)}>
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </nav>
  );
}

/** 1 … 4 5 [6] 7 8 … 20 — current page with two neighbours, ends pinned. */
function pageWindow(page: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const keep = new Set([1, 2, page - 1, page, page + 1, total - 1, total].filter((p) => p >= 1 && p <= total));
  const sorted = [...keep].sort((a, b) => a - b);
  const out: (number | '…')[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) out.push('…');
    out.push(p);
    prev = p;
  }
  return out;
}
