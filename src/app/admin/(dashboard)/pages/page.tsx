import Link from 'next/link';
import { Plus } from 'lucide-react';
import { prisma } from '@/lib/db';
import type { ContentStatus, Prisma } from '@/generated/prisma/client';
import { requireSession } from '@/lib/auth/guards';
import { parseListParams, buildQuery } from '@/lib/admin/list-params';
import { PageHeader } from '@/components/admin/page-header';
import { StatusBadge } from '@/components/admin/status-badge';
import { DeleteButton } from '@/components/admin/delete-button';
import { ListToolbar } from '@/components/admin/list-toolbar';
import { SortableHead } from '@/components/admin/sortable-head';
import { Pagination } from '@/components/admin/pagination';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata = { title: 'Pages' };

const STATUSES: { value: ContentStatus; label: string }[] = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'SCHEDULED', label: 'Scheduled' },
  { value: 'PUBLISHED', label: 'Published' },
];

export default async function PagesListPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireSession();
  const params = parseListParams(await searchParams, {
    sortFields: ['title', 'status', 'updated'],
    defaultSort: 'updated',
    filterKeys: ['status'],
  });

  const status = STATUSES.some((s) => s.value === params.filters.status) ? (params.filters.status as ContentStatus) : undefined;
  const where: Prisma.PageWhereInput = {
    ...(params.q
      ? {
          // See the note in the posts list: MySQL's utf8mb4_unicode_ci collation
          // already makes `contains` case-insensitive, and `mode` does not exist
          // on a MySQL Prisma client.
          OR: [
            { title: { contains: params.q } },
            { slug: { contains: params.q } },
          ],
        }
      : {}),
    ...(status ? { status } : {}),
  };

  const orderBy: Prisma.PageOrderByWithRelationInput =
    params.sort === 'title' ? { title: params.dir } : params.sort === 'status' ? { status: params.dir } : { updatedAt: params.dir };

  const total = await prisma.page.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / params.perPage));
  const page = Math.min(params.page, totalPages);
  const view = { ...params, page };

  const pages = await prisma.page.findMany({
    where,
    orderBy,
    skip: (page - 1) * params.perPage,
    take: params.perPage,
    select: { id: true, title: true, slug: true, status: true, updatedAt: true },
  });

  const hasFilters = Boolean(params.q) || Object.keys(params.filters).length > 0;

  return (
    <>
      <PageHeader
        title="Pages"
        description="Standalone pages such as About or Contact."
        action={
          <Link href="/admin/pages/new" className={buttonVariants()}>
            <Plus className="mr-1 h-4 w-4" /> New page
          </Link>
        }
      />
      <ListToolbar
        placeholder="Search pages…"
        q={params.q}
        filters={[{ key: 'status', label: 'Status', options: STATUSES.map((s) => ({ value: s.value, label: s.label })) }]}
        values={params.filters}
        preserve={{ sort: params.sort, dir: params.dir }}
      />
      <p className="mb-2 text-sm text-muted-foreground">{total} page{total === 1 ? '' : 's'}</p>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHead label="Title" field="title" params={view} />
              <TableHead>Slug</TableHead>
              <SortableHead label="Status" field="status" params={view} />
              <SortableHead label="Updated" field="updated" params={view} firstDir="desc" />
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  {hasFilters ? 'No pages match your search or filters.' : 'No pages yet.'}
                </TableCell>
              </TableRow>
            ) : (
              pages.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">
                    <Link href={`/admin/pages/${p.id}`} className="hover:underline">{p.title}</Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">/{p.slug}</TableCell>
                  <TableCell><StatusBadge status={p.status} /></TableCell>
                  <TableCell className="text-muted-foreground">{p.updatedAt.toISOString().slice(0, 10)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Link href={`/admin/pages/${p.id}`} className={buttonVariants({ variant: 'ghost', size: 'sm' })}>Edit</Link>
                      <DeleteButton url={`/api/v1/admin/pages/${p.id}`} confirmText={`Delete “${p.title}”?`} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
      <Pagination page={page} totalPages={totalPages} hrefFor={(p) => buildQuery(view, { page: p })} />
    </>
  );
}
