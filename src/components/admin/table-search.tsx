'use client';

import { useRef, type ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Lightweight client search for server-rendered admin tables. Filters the rows
// (`tbody tr`) inside the nearest [data-searchable] ancestor by their text — no
// refetch, works on the fully-loaded list.
export function TableSearch({ placeholder = 'Search…' }: { placeholder?: string }) {
  const ref = useRef<HTMLInputElement>(null);

  function onInput(e: ChangeEvent<HTMLInputElement>) {
    const term = e.target.value.trim().toLowerCase();
    const scope = ref.current?.closest('[data-searchable]');
    if (!scope) return;
    const rows = scope.querySelectorAll<HTMLElement>('tbody tr');
    let visible = 0;
    rows.forEach((tr) => {
      if (tr.hasAttribute('data-empty')) return; // skip the "no items" placeholder row
      const match = !term || (tr.textContent ?? '').toLowerCase().includes(term);
      tr.hidden = !match;
      if (match) visible += 1;
    });
    const empty = scope.querySelector<HTMLElement>('[data-no-results]');
    if (empty) empty.hidden = visible !== 0;
  }

  return (
    <div className="relative mb-4 max-w-xs">
      <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input ref={ref} onChange={onInput} placeholder={placeholder} className="pl-8" aria-label={placeholder} />
    </div>
  );
}
