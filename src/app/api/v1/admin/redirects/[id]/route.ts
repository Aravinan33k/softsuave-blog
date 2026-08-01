import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { handleRouteError, jsonError } from '@/lib/http';
import { requireApiRole } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';
import { redirectUpdateSchema, normalizePath } from '@/lib/validation/redirect';
import { invalidateRedirectCache } from '@/lib/redirects/cache';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApiRole(req, 'ADMIN');
    if (session instanceof NextResponse) return session;

    const { id } = await params;
    const body = await req.json().catch(() => null);
    const parsed = redirectUpdateSchema.safeParse(body);
    if (!parsed.success) return jsonError(400, 'invalid_request', 'Invalid redirect.');

    const existing = await prisma.redirect.findUnique({ where: { id } });
    if (!existing) return jsonError(404, 'not_found', 'Redirect not found.');

    const data: { fromPath?: string; toPath?: string; statusCode?: number } = {};
    if (parsed.data.fromPath !== undefined) {
      const fromPath = normalizePath(parsed.data.fromPath);
      if ((await prisma.redirect.count({ where: { fromPath, NOT: { id } } })) > 0) {
        return jsonError(409, 'duplicate', 'A redirect for that path already exists.');
      }
      data.fromPath = fromPath;
    }
    if (parsed.data.toPath !== undefined) data.toPath = parsed.data.toPath.trim();
    if (parsed.data.statusCode !== undefined) data.statusCode = parsed.data.statusCode;

    const redirect = await prisma.redirect.update({ where: { id }, data });
    invalidateRedirectCache();
    await logAudit({ action: 'UPDATE', userId: session.sub, targetType: 'redirect', targetId: id, req });
    return NextResponse.json({ redirect });
  } catch (err) {
    return handleRouteError(err, 'admin/redirects PATCH');
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApiRole(req, 'ADMIN');
    if (session instanceof NextResponse) return session;

    const { id } = await params;
    const existing = await prisma.redirect.findUnique({ where: { id } });
    if (!existing) return jsonError(404, 'not_found', 'Redirect not found.');

    await prisma.redirect.delete({ where: { id } });
    invalidateRedirectCache();
    await logAudit({ action: 'DELETE', userId: session.sub, targetType: 'redirect', targetId: id, req });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleRouteError(err, 'admin/redirects DELETE');
  }
}
