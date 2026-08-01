'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface FilterDef {
  /** URL param key, e.g. 'status'. */
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

const ALL = '__all__';

/**
 * Toolbar for server-rendered admin lists: debounced search + filter selects.
 * Every change navigates with an updated query string (page reset to 1); the
 * server component re-renders the table. Current sort/dir are preserved.
 */
export function ListToolbar({
  placeholder = 'Search…',
  q,
  filters = [],
  values,
  preserve,
}: {
  placeholder?: string;
  q: string;
  filters?: FilterDef[];
  /** Current filter values, keyed by filter key ('' = unset). */
  values: Record<string, string>;
  /** Params to keep on every navigation (e.g. { sort, dir }). */
  preserve: Record<string, string>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [term, setTerm] = useState(q);
  const firstRun = useRef(true);

  function navigate(next: { q?: string; filterKey?: string; filterValue?: string }) {
    const sp = new URLSearchParams();
    const query = next.q ?? term;
    if (query.trim()) sp.set('q', query.trim());
    for (const f of filters) {
      const v = f.key === next.filterKey ? next.filterValue : values[f.key];
      if (v) sp.set(f.key, v);
    }
    for (const [k, v] of Object.entries(preserve)) sp.set(k, v);
    const s = sp.toString();
    router.replace(s ? `${pathname}?${s}` : pathname);
  }

  // Debounce free-text search; skip the initial mount.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const t = setTimeout(() => navigate({ q: term }), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <div className="relative w-full max-w-xs">
        <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input value={term} onChange={(e) => setTerm(e.target.value)} placeholder={placeholder} className="pl-8" aria-label={placeholder} />
      </div>
      {filters.map((f) => (
        <Select
          key={f.key}
          value={values[f.key] || ALL}
          onValueChange={(v) => navigate({ filterKey: f.key, filterValue: !v || v === ALL ? '' : String(v) })}
        >
          <SelectTrigger className="w-44" aria-label={f.label}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All {f.label.toLowerCase()}</SelectItem>
            {f.options.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}
