import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { handleRouteError, jsonError } from '@/lib/http';
import { requireApiRole } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';
import { hashPassword } from '@/lib/auth/password';
import { userCreateSchema } from '@/lib/validation/user';

// GET /api/v1/admin/users — list all accounts (ADMIN only).
export async function GET(req: NextRequest) {
  try {
    const session = await requireApiRole(req, 'ADMIN');
    if (session instanceof NextResponse) return session;

    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'asc' },
      select: { id: true, email: true, name: true, role: true, twoFactorEnabled: true, lastLoginAt: true, createdAt: true },
    });
    return NextResponse.json({ users });
  } catch (err) {
    return handleRouteError(err, 'admin/users GET');
  }
}

// POST /api/v1/admin/users — create an account (ADMIN only).
export async function POST(req: NextRequest) {
  try {
    const session = await requireApiRole(req, 'ADMIN');
    if (session instanceof NextResponse) return session;

    const parsed = userCreateSchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return jsonError(400, 'invalid_request', 'Invalid user data.');
    const { email, name, role, password } = parsed.data;

    if ((await prisma.user.count({ where: { email } })) > 0) {
      return jsonError(409, 'duplicate', 'A user with that email already exists.');
    }

    const user = await prisma.user.create({
      data: { email, name: name ?? null, role, passwordHash: await hashPassword(password) },
      select: { id: true, email: true, name: true, role: true, twoFactorEnabled: true, lastLoginAt: true, createdAt: true },
    });
    await logAudit({ action: 'CREATE', userId: session.sub, targetType: 'user', targetId: user.id, req });
    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    return handleRouteError(err, 'admin/users POST');
  }
}
