import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { handleRouteError, jsonError } from '@/lib/http';
import { requireApiRole } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';
import { redirectSchema, normalizePath } from '@/lib/validation/redirect';
import { invalidateRedirectCache } from '@/lib/redirects/cache';

// GET /api/v1/admin/redirects
export async function GET(req: NextRequest) {
  try {
    const session = await requireApiRole(req, 'ADMIN');
    if (session instanceof NextResponse) return session;
    const items = await prisma.redirect.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ items });
  } catch (err) {
    return handleRouteError(err, 'admin/redirects GET');
  }
}

// POST /api/v1/admin/redirects
export async function POST(req: NextRequest) {
  try {
    const session = await requireApiRole(req, 'ADMIN');
    if (session instanceof NextResponse) return session;

    const body = await req.json().catch(() => null);
    const parsed = redirectSchema.safeParse(body);
    if (!parsed.success) return jsonError(400, 'invalid_request', 'Invalid redirect.');

    const fromPath = normalizePath(parsed.data.fromPath);
    if ((await prisma.redirect.count({ where: { fromPath } })) > 0) {
      return jsonError(409, 'duplicate', 'A redirect for that path already exists.');
    }

    const redirect = await prisma.redirect.create({
      data: { fromPath, toPath: parsed.data.toPath.trim(), statusCode: parsed.data.statusCode ?? 301 },
    });
    invalidateRedirectCache();
    await logAudit({ action: 'CREATE', userId: session.sub, targetType: 'redirect', targetId: redirect.id, req });
    return NextResponse.json({ redirect }, { status: 201 });
  } catch (err) {
    return handleRouteError(err, 'admin/redirects POST');
  }
}
