import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { Prisma } from '@/generated/prisma/client';
import { handleRouteError, jsonError } from '@/lib/http';
import { requireApiRole } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';
import { profileSchema } from '@/lib/validation/profile';
import { revalidateContent } from '@/lib/revalidate';

// GET /api/v1/admin/profile — the current user's public profile.
export async function GET(req: NextRequest) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;
    const user = await prisma.user.findUnique({
      where: { id: session.sub },
      select: { name: true, title: true, bio: true, socialLinksJson: true, avatar: { select: { id: true, url: true, altText: true, filename: true, width: true, height: true, mimeType: true } } },
    });
    return NextResponse.json({ profile: user });
  } catch (err) {
    return handleRouteError(err, 'admin/profile GET');
  }
}

// PATCH /api/v1/admin/profile — update the current user's public profile.
export async function PATCH(req: NextRequest) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const parsed = profileSchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return jsonError(400, 'invalid_request', 'Invalid profile data.');
    const d = parsed.data;

    await prisma.user.update({
      where: { id: session.sub },
      data: {
        name: d.name ?? null,
        title: d.title ?? null,
        bio: d.bio ?? null,
        avatarMediaId: d.avatarMediaId ?? null,
        socialLinksJson: d.socialLinks as unknown as Prisma.InputJsonValue,
      },
    });
    await logAudit({ action: 'UPDATE', userId: session.sub, targetType: 'profile', targetId: session.sub, req });
    revalidateContent();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleRouteError(err, 'admin/profile PATCH');
  }
}
