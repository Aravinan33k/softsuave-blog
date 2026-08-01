import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { handleRouteError, jsonError } from '@/lib/http';
import { requireApiRole } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';
import { categorySchema } from '@/lib/validation/content';
import { slugify, ensureUniqueSlug } from '@/lib/content/slug';

// GET /api/v1/admin/categories — all categories with post counts.
export async function GET(req: NextRequest) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const items = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { posts: true } } },
    });
    return NextResponse.json({ items });
  } catch (err) {
    return handleRouteError(err, 'admin/categories GET');
  }
}

// POST /api/v1/admin/categories — create.
export async function POST(req: NextRequest) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const body = await req.json().catch(() => null);
    const parsed = categorySchema.safeParse(body);
    if (!parsed.success) return jsonError(400, 'invalid_request', 'Invalid category data.');

    const base = parsed.data.slug ?? slugify(parsed.data.name);
    const slug = await ensureUniqueSlug(base, async (s) => (await prisma.category.count({ where: { slug: s } })) > 0);

    const category = await prisma.category.create({
      data: { name: parsed.data.name, slug, description: parsed.data.description ?? null },
    });
    await logAudit({ action: 'CREATE', userId: session.sub, targetType: 'category', targetId: category.id, req });
    return NextResponse.json({ category }, { status: 201 });
  } catch (err) {
    return handleRouteError(err, 'admin/categories POST');
  }
}
