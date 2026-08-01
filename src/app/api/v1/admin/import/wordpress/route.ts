import { NextResponse, type NextRequest } from 'next/server';
import { handleRouteError, jsonError } from '@/lib/http';
import { requireApiRole } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';
import { importWordpressWxr } from '@/lib/import/wordpress';
import { revalidateContent } from '@/lib/revalidate';

const MAX_BYTES = 50 * 1024 * 1024;

// POST /api/v1/admin/import/wordpress — multipart upload of a WXR export (ADMIN).
export async function POST(req: NextRequest) {
  try {
    const session = await requireApiRole(req, 'ADMIN');
    if (session instanceof NextResponse) return session;

    const form = await req.formData();
    const file = form.get('file');
    if (!(file instanceof File)) return jsonError(400, 'invalid_request', 'A WXR .xml file is required.');
    if (file.size > MAX_BYTES) return jsonError(413, 'file_too_large', 'Export exceeds the 50MB limit.');

    const xml = await file.text();
    const summary = await importWordpressWxr(xml, session.sub);

    await logAudit({
      action: 'CREATE',
      userId: session.sub,
      targetType: 'import',
      targetId: 'wordpress',
      req,
      metadata: summary as unknown as Record<string, unknown>,
    });
    revalidateContent();
    return NextResponse.json({ summary });
  } catch (err) {
    return handleRouteError(err, 'admin/import/wordpress');
  }
}
