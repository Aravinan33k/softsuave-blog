import { NextResponse, type NextRequest } from 'next/server';
import { handleRouteError } from '@/lib/http';
import { requireApiRole } from '@/lib/auth/session';
import { buildJsonExport, buildMarkdownExport } from '@/lib/export/content';

// GET /api/v1/admin/export?format=json|markdown — downloadable content export (ADMIN).
export async function GET(req: NextRequest) {
  try {
    const session = await requireApiRole(req, 'ADMIN');
    if (session instanceof NextResponse) return session;

    const format = new URL(req.url).searchParams.get('format') ?? 'json';

    if (format === 'markdown') {
      const md = await buildMarkdownExport();
      return new Response(md, {
        headers: {
          'content-type': 'text/markdown; charset=utf-8',
          'content-disposition': 'attachment; filename="content-export.md"',
        },
      });
    }

    const data = await buildJsonExport();
    return new Response(JSON.stringify(data, null, 2), {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'content-disposition': 'attachment; filename="content-export.json"',
      },
    });
  } catch (err) {
    return handleRouteError(err, 'admin/export');
  }
}
