import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { handleRouteError, jsonError } from '@/lib/http';
import { requireApiRole } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';
import { categoryUpdateSchema } from '@/lib/validation/content';
import { slugify, ensureUniqueSlug } from '@/lib/content/slug';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const { id } = await params;
    const body = await req.json().catch(() => null);
    const parsed = categoryUpdateSchema.safeParse(body);
    if (!parsed.success) return jsonError(400, 'invalid_request', 'Invalid category data.');

    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) return jsonError(404, 'not_found', 'Category not found.');

    const data: { name?: string; slug?: string; description?: string | null } = {};
    if (parsed.data.name !== undefined) data.name = parsed.data.name;
    if (parsed.data.description !== undefined) data.description = parsed.data.description ?? null;
    if (parsed.data.slug !== undefined || parsed.data.name !== undefined) {
      const base = parsed.data.slug ?? slugify(parsed.data.name ?? existing.name);
      data.slug = await ensureUniqueSlug(
        base,
        async (s) => (await prisma.category.count({ where: { slug: s, NOT: { id } } })) > 0,
      );
    }

    const category = await prisma.category.update({ where: { id }, data });
    await logAudit({ action: 'UPDATE', userId: session.sub, targetType: 'category', targetId: id, req });
    return NextResponse.json({ category });
  } catch (err) {
    return handleRouteError(err, 'admin/categories PATCH');
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const { id } = await params;
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) return jsonError(404, 'not_found', 'Category not found.');

    await prisma.category.delete({ where: { id } }); // PostCategory rows cascade
    await logAudit({ action: 'DELETE', userId: session.sub, targetType: 'category', targetId: id, req });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleRouteError(err, 'admin/categories DELETE');
  }
}
