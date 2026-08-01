import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { handleRouteError, jsonError } from '@/lib/http';
import { requireApiRole } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';
import { mediaUpdateSchema } from '@/lib/validation/content';
import { getMediaUsage, mediaStorageKeys } from '@/lib/media/usage';
import { storage } from '@/lib/storage';

// PATCH /api/v1/admin/media/[id] — edit alt text.
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const { id } = await params;
    const body = await req.json().catch(() => null);
    const parsed = mediaUpdateSchema.safeParse(body);
    if (!parsed.success) return jsonError(400, 'invalid_request', 'Alt text is required.');

    const existing = await prisma.media.findUnique({ where: { id } });
    if (!existing) return jsonError(404, 'not_found', 'Media not found.');

    const media = await prisma.media.update({ where: { id }, data: { altText: parsed.data.altText } });
    await logAudit({ action: 'UPDATE', userId: session.sub, targetType: 'media', targetId: id, req });
    return NextResponse.json({ media });
  } catch (err) {
    return handleRouteError(err, 'admin/media PATCH');
  }
}

// DELETE /api/v1/admin/media/[id] — blocked (409) if referenced, unless ?force=true.
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const { id } = await params;
    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) return jsonError(404, 'not_found', 'Media not found.');

    const force = new URL(req.url).searchParams.get('force') === 'true';
    const usage = await getMediaUsage(id, media.url);
    if (usage.total > 0 && !force) {
      return jsonError(409, 'media_in_use', 'This image is referenced by other content.', {
        usage: usage.references,
      });
    }

    // Remove all stored files, then the DB row (FK cover/OG relations are SetNull).
    const keys = await mediaStorageKeys(media.variantsJson);
    await Promise.all(keys.map((k) => storage.deleteFile(k).catch(() => undefined)));
    await prisma.media.delete({ where: { id } });

    await logAudit({
      action: 'DELETE',
      userId: session.sub,
      targetType: 'media',
      targetId: id,
      req,
      metadata: { forced: force, hadReferences: usage.total },
    });
    return NextResponse.json({ ok: true, clearedReferences: usage.total });
  } catch (err) {
    return handleRouteError(err, 'admin/media DELETE');
  }
}
