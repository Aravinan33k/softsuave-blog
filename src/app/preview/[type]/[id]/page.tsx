import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { verifyPreviewToken } from '@/lib/content/preview';

// Draft preview: reachable only with a valid signed token, and never indexable.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Preview',
};

export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string; id: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { type, id } = await params;
  const { token } = await searchParams;
  if (type !== 'post' && type !== 'page') notFound();

  const verified = token ? await verifyPreviewToken(token) : null;
  const valid = verified && verified.type === type && verified.id === id;

  if (!valid) {
    return (
      <div className="mx-auto max-w-2xl p-10 text-center">
        <h1 className="text-xl font-semibold">Invalid or expired preview link</h1>
        <p className="mt-2 text-muted-foreground">Generate a fresh preview link from the editor.</p>
      </div>
    );
  }

  const record =
    type === 'post'
      ? await prisma.post.findUnique({ where: { id }, select: { title: true, contentHtml: true, status: true } })
      : await prisma.page.findUnique({ where: { id }, select: { title: true, contentHtml: true, status: true } });
  if (!record) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6 rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
        Preview — status: {record.status}. This link is private and not indexed.
      </div>
      <article>
        <h1 className="mb-6 text-3xl font-bold tracking-tight">{record.title}</h1>
        {/* contentHtml is sanitized on write; rendered as trusted-after-sanitize. */}
        <div className="rendered-content" dangerouslySetInnerHTML={{ __html: record.contentHtml }} />
      </article>
    </div>
  );
}
