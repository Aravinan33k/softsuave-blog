import { NextResponse, type NextRequest } from 'next/server';
import type { JSONContent } from '@tiptap/core';
import { prisma } from '@/lib/db';
import { Prisma } from '@/generated/prisma/client';
import { handleRouteError, jsonError } from '@/lib/http';
import { requireApiRole } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';
import { canModifyContent, renderContent, MAX_REVISIONS } from '@/lib/content/service';
import { POST_INCLUDE } from '@/lib/content/queries';

// GET /api/v1/admin/posts/[id]/revisions — history (newest first).
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const { id } = await params;
    const revisions = await prisma.postRevision.findMany({
      where: { postId: id },
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, createdAt: true },
    });
    return NextResponse.json({ revisions });
  } catch (err) {
    return handleRouteError(err, 'admin/posts/[id]/revisions GET');
  }
}

// POST /api/v1/admin/posts/[id]/revisions — roll back to { revisionId }. The
// current state is snapshotted first, so a rollback is itself reversible.
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const { id } = await params;
    const body = await req.json().catch(() => null);
    const revisionId = typeof body?.revisionId === 'string' ? body.revisionId : null;
    if (!revisionId) return jsonError(400, 'invalid_request', 'revisionId is required.');

    const [existing, revision] = await Promise.all([
      prisma.post.findUnique({ where: { id } }),
      prisma.postRevision.findUnique({ where: { id: revisionId } }),
    ]);
    if (!existing) return jsonError(404, 'not_found', 'Post not found.');
    if (!revision || revision.postId !== id) return jsonError(404, 'not_found', 'Revision not found.');
    if (!canModifyContent(session, existing.authorId)) {
      return jsonError(403, 'forbidden', 'You can only edit your own posts.');
    }

    const rendered = renderContent(revision.contentJson as unknown as JSONContent, revision.excerpt);

    const post = await prisma.$transaction(async (tx) => {
      // Snapshot the current version before overwriting it.
      await tx.postRevision.create({
        data: {
          postId: id,
          title: existing.title,
          excerpt: existing.excerpt,
          contentJson: existing.contentJson as Prisma.InputJsonValue,
        },
      });
      const stale = await tx.postRevision.findMany({
        where: { postId: id },
        orderBy: { createdAt: 'desc' },
        skip: MAX_REVISIONS,
        select: { id: true },
      });
      if (stale.length) await tx.postRevision.deleteMany({ where: { id: { in: stale.map((r) => r.id) } } });

      return tx.post.update({
        where: { id },
        data: {
          title: revision.title,
          excerpt: revision.excerpt,
          contentJson: revision.contentJson as Prisma.InputJsonValue,
          contentHtml: rendered.contentHtml,
          wordCount: rendered.wordCount,
          readingTimeMinutes: rendered.readingTimeMinutes,
        },
        include: POST_INCLUDE,
      });
    });

    await logAudit({ action: 'UPDATE', userId: session.sub, targetType: 'post', targetId: id, req, metadata: { rolledBackTo: revisionId } });
    return NextResponse.json({ post });
  } catch (err) {
    return handleRouteError(err, 'admin/posts/[id]/revisions POST');
  }
}
