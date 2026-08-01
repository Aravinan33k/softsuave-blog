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

export const metadata = { title: 'Posts' };

const STATUSES: { value: ContentStatus; label: string }[] = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'SCHEDULED', label: 'Scheduled' },
  { value: 'PUBLISHED', label: 'Published' },
];

export default async function PostsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireSession();
  const params = parseListParams(await searchParams, {
    sortFields: ['title', 'status', 'author', 'updated', 'published'],
    defaultSort: 'updated',
    filterKeys: ['status', 'category', 'author'],
  });

  const status = STATUSES.some((s) => s.value === params.filters.status) ? (params.filters.status as ContentStatus) : undefined;
  const where: Prisma.PostWhereInput = {
    ...(params.q
      ? {
          OR: [
            { title: { contains: params.q, mode: 'insensitive' as const } },
            { slug: { contains: params.q, mode: 'insensitive' as const } },
          ],
        }
      : {}),
    ...(status ? { status } : {}),
    ...(params.filters.category ? { categories: { some: { category: { slug: params.filters.category } } } } : {}),
    ...(params.filters.author ? { authorId: params.filters.author } : {}),
  };

  const orderBy: Prisma.PostOrderByWithRelationInput =
    params.sort === 'title'
      ? { title: params.dir }
      : params.sort === 'status'
        ? { status: params.dir }
        : params.sort === 'author'
          ? { author: { name: params.dir } }
          : params.sort === 'published'
            ? { publishedAt: params.dir }
            : { updatedAt: params.dir };

  const total = await prisma.post.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / params.perPage));
  const page = Math.min(params.page, totalPages);
  const view = { ...params, page };

  const [posts, categories, authors] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy,
      skip: (page - 1) * params.perPage,
      take: params.perPage,
      select: {
        id: true,
        title: true,
        status: true,
        updatedAt: true,
        author: { select: { name: true, email: true } },
      },
    }),
    prisma.category.findMany({ orderBy: { name: 'asc' }, select: { name: true, slug: true } }),
    prisma.user.findMany({ where: { posts: { some: {} } }, select: { id: true, name: true, email: true } }),
  ]);
  authors.sort((a, b) => (a.name ?? a.email).localeCompare(b.name ?? b.email));

  const hasFilters = Boolean(params.q) || Object.keys(params.filters).length > 0;

  return (
    <>
      <PageHeader
        title="Posts"
        description="Create and manage blog posts."
        action={
          <Link href="/admin/posts/new" className={buttonVariants()}>
            <Plus className="mr-1 h-4 w-4" /> New post
          </Link>
        }
      />
      <ListToolbar
        placeholder="Search posts…"
        q={params.q}
        filters={[
          { key: 'status', label: 'Status', options: STATUSES.map((s) => ({ value: s.value, label: s.label })) },
          { key: 'category', label: 'Category', options: categories.map((c) => ({ value: c.slug, label: c.name })) },
          { key: 'author', label: 'Author', options: authors.map((a) => ({ value: a.id, label: a.name ?? a.email })) },
        ]}
        values={params.filters}
        preserve={{ sort: params.sort, dir: params.dir }}
      />
      <p className="mb-2 text-sm text-muted-foreground">{total} post{total === 1 ? '' : 's'}</p>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHead label="Title" field="title" params={view} />
              <SortableHead label="Status" field="status" params={view} />
              <SortableHead label="Author" field="author" params={view} />
              <SortableHead label="Updated" field="updated" params={view} firstDir="desc" />
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  {hasFilters ? 'No posts match your search or filters.' : 'No posts yet. Create your first one.'}
                </TableCell>
              </TableRow>
            ) : (
              posts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">
                    <Link href={`/admin/posts/${p.id}`} className="hover:underline">
                      {p.title}
                    </Link>
                  </TableCell>
                  <TableCell><StatusBadge status={p.status} /></TableCell>
                  <TableCell className="text-muted-foreground">{p.author.name ?? p.author.email}</TableCell>
                  <TableCell className="text-muted-foreground">{p.updatedAt.toISOString().slice(0, 10)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Link href={`/admin/posts/${p.id}`} className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
                        Edit
                      </Link>
                      <DeleteButton url={`/api/v1/admin/posts/${p.id}`} confirmText={`Delete “${p.title}”?`} />
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
