import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { handleRouteError, jsonError } from '@/lib/http';
import { requireApiRole } from '@/lib/auth/session';
import { signPreviewToken, previewUrl } from '@/lib/content/preview';

// POST /api/v1/admin/pages/[id]/preview — mint a signed, expiring preview link.
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const { id } = await params;
    const page = await prisma.page.findUnique({ where: { id }, select: { id: true } });
    if (!page) return jsonError(404, 'not_found', 'Page not found.');

    const token = await signPreviewToken('page', id);
    return NextResponse.json({ url: previewUrl('page', id, token), expiresInSeconds: 86_400 });
  } catch (err) {
    return handleRouteError(err, 'admin/pages/[id]/preview POST');
  }
}
