import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { handleRouteError, jsonError } from '@/lib/http';
import { requireApiRole } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';
import { hashPassword } from '@/lib/auth/password';
import { userUpdateSchema } from '@/lib/validation/user';

async function adminCount(): Promise<number> {
  return prisma.user.count({ where: { role: 'ADMIN' } });
}

// PATCH /api/v1/admin/users/[id] — update name/role, or reset password.
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApiRole(req, 'ADMIN');
    if (session instanceof NextResponse) return session;

    const { id } = await params;
    const parsed = userUpdateSchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return jsonError(400, 'invalid_request', 'Invalid user data.');
    const d = parsed.data;

    const target = await prisma.user.findUnique({ where: { id }, select: { id: true, role: true } });
    if (!target) return jsonError(404, 'not_found', 'User not found.');

    // Guard against removing the last admin.
    if (d.role === 'EDITOR' && target.role === 'ADMIN' && (await adminCount()) <= 1) {
      return jsonError(400, 'last_admin', 'Cannot demote the only administrator.');
    }
    if (d.role === 'EDITOR' && target.id === session.sub) {
      return jsonError(400, 'self_demote', 'You cannot remove your own admin role.');
    }

    const data: { name?: string | null; role?: 'ADMIN' | 'EDITOR'; passwordHash?: string } = {};
    if (d.name !== undefined) data.name = d.name ?? null;
    if (d.role !== undefined) data.role = d.role;
    if (d.password !== undefined) data.passwordHash = await hashPassword(d.password);

    const user = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, email: true, name: true, role: true, twoFactorEnabled: true, lastLoginAt: true, createdAt: true },
    });
    await logAudit({ action: 'UPDATE', userId: session.sub, targetType: 'user', targetId: id, req, metadata: { passwordReset: d.password !== undefined } });
    return NextResponse.json({ user });
  } catch (err) {
    return handleRouteError(err, 'admin/users PATCH');
  }
}

// DELETE /api/v1/admin/users/[id]
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApiRole(req, 'ADMIN');
    if (session instanceof NextResponse) return session;

    const { id } = await params;
    if (id === session.sub) return jsonError(400, 'self_delete', 'You cannot delete your own account.');

    const target = await prisma.user.findUnique({
      where: { id },
      select: { id: true, role: true, _count: { select: { posts: true, pages: true, media: true } } },
    });
    if (!target) return jsonError(404, 'not_found', 'User not found.');

    if (target.role === 'ADMIN' && (await adminCount()) <= 1) {
      return jsonError(400, 'last_admin', 'Cannot delete the only administrator.');
    }
    const owned = target._count.posts + target._count.pages + target._count.media;
    if (owned > 0) {
      return jsonError(409, 'has_content', 'Reassign or delete this user’s posts, pages, and media first.');
    }

    await prisma.user.delete({ where: { id } });
    await logAudit({ action: 'DELETE', userId: session.sub, targetType: 'user', targetId: id, req });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleRouteError(err, 'admin/users DELETE');
  }
}
