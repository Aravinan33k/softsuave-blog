import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { Prisma } from '@/generated/prisma/client';
import { handleRouteError, jsonError } from '@/lib/http';
import { requireApiRole } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';
import { processAndStoreImage } from '@/lib/media/process';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const MAX_BYTES = 10 * 1024 * 1024;

function sanitizeFilename(name: string): string {
  return (name || 'upload').replace(/[^\w.\- ]+/g, '_').slice(0, 200);
}

// GET /api/v1/admin/media — paginated media library.
export async function GET(req: NextRequest) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number.parseInt(searchParams.get('page') ?? '1', 10) || 1);
    const perPage = Math.min(60, Math.max(1, Number.parseInt(searchParams.get('perPage') ?? '30', 10) || 30));
    const q = (searchParams.get('q') ?? '').trim().slice(0, 100);
    const sortParam = searchParams.get('sort') ?? 'createdAt';
    const sort = ['createdAt', 'filename', 'sizeBytes'].includes(sortParam) ? sortParam : 'createdAt';
    const dir = searchParams.get('dir') === 'asc' ? ('asc' as const) : ('desc' as const);

    const where = q
      ? {
          OR: [
            { filename: { contains: q, mode: 'insensitive' as const } },
            { altText: { contains: q, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      prisma.media.findMany({
        where,
        orderBy: { [sort]: dir },
        skip: (page - 1) * perPage,
        take: perPage,
        include: { uploadedBy: { select: { email: true } } },
      }),
      prisma.media.count({ where }),
    ]);

    return NextResponse.json({ items, total, page, perPage });
  } catch (err) {
    return handleRouteError(err, 'admin/media GET');
  }
}

// POST /api/v1/admin/media — multipart upload (file + altText). Generates WebP
// variants via sharp and stores through the storage adapter.
export async function POST(req: NextRequest) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const form = await req.formData();
    const file = form.get('file');
    const altText = String(form.get('altText') ?? '').trim();

    if (!(file instanceof File)) return jsonError(400, 'invalid_request', 'A file is required.');
    if (!altText) return jsonError(400, 'invalid_request', 'Alt text is required.');
    if (!ALLOWED_TYPES.includes(file.type)) return jsonError(400, 'unsupported_type', 'Unsupported image type.');
    if (file.size > MAX_BYTES) return jsonError(400, 'file_too_large', 'File exceeds the 10MB limit.');

    const buffer = Buffer.from(await file.arrayBuffer());
    const processed = await processAndStoreImage(buffer, file.name);

    const media = await prisma.media.create({
      data: {
        url: processed.url,
        filename: sanitizeFilename(file.name),
        altText,
        mimeType: processed.mimeType,
        width: processed.width,
        height: processed.height,
        sizeBytes: processed.sizeBytes,
        variantsJson: processed.variants as unknown as Prisma.InputJsonValue,
        uploadedById: session.sub,
      },
    });

    await logAudit({ action: 'CREATE', userId: session.sub, targetType: 'media', targetId: media.id, req });
    return NextResponse.json({ media }, { status: 201 });
  } catch (err) {
    return handleRouteError(err, 'admin/media POST');
  }
}
