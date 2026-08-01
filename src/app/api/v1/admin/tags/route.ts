import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { handleRouteError, jsonError } from '@/lib/http';
import { requireApiRole } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';
import { tagSchema } from '@/lib/validation/content';
import { slugify, ensureUniqueSlug } from '@/lib/content/slug';

// GET /api/v1/admin/tags — all tags with post counts.
export async function GET(req: NextRequest) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const items = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { posts: true } } },
    });
    return NextResponse.json({ items });
  } catch (err) {
    return handleRouteError(err, 'admin/tags GET');
  }
}

// POST /api/v1/admin/tags — create.
export async function POST(req: NextRequest) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const body = await req.json().catch(() => null);
    const parsed = tagSchema.safeParse(body);
    if (!parsed.success) return jsonError(400, 'invalid_request', 'Invalid tag data.');

    const base = parsed.data.slug ?? slugify(parsed.data.name);
    const slug = await ensureUniqueSlug(base, async (s) => (await prisma.tag.count({ where: { slug: s } })) > 0);

    const tag = await prisma.tag.create({
      data: { name: parsed.data.name, slug, description: parsed.data.description ?? null },
    });
    await logAudit({ action: 'CREATE', userId: session.sub, targetType: 'tag', targetId: tag.id, req });
    return NextResponse.json({ tag }, { status: 201 });
  } catch (err) {
    return handleRouteError(err, 'admin/tags POST');
  }
}
