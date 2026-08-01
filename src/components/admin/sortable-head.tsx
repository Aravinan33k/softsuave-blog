import Link from 'next/link';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { buildQuery, type ListParams, type SortDir } from '@/lib/admin/list-params';
import { TableHead } from '@/components/ui/table';

// A sortable column header for server-rendered admin tables. The link toggles
// direction when the column is already active, resets to page 1, and preserves
// search/filter params via buildQuery.
export function SortableHead({
  label,
  field,
  params,
  className,
  /** Direction used the first time an inactive column is clicked (dates: 'desc'). */
  firstDir = 'asc',
}: {
  label: string;
  field: string;
  params: ListParams;
  className?: string;
  firstDir?: SortDir;
}) {
  const active = params.sort === field;
  const nextDir: SortDir = active ? (params.dir === 'asc' ? 'desc' : 'asc') : firstDir;
  const href = buildQuery(params, { sort: field, dir: nextDir, page: 1 });
  const Icon = active ? (params.dir === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;

  return (
    <TableHead className={className} aria-sort={active ? (params.dir === 'asc' ? 'ascending' : 'descending') : undefined}>
      <Link href={href} className="inline-flex items-center gap-1 hover:text-foreground">
        {label}
        <Icon className={active ? 'h-3.5 w-3.5' : 'h-3.5 w-3.5 opacity-40'} />
      </Link>
    </TableHead>
  );
}
