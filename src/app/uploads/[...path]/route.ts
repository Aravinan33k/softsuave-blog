import type { NextRequest } from 'next/server';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { env } from '@/lib/env';

// Serves files stored by the local storage driver at LOCAL_STORAGE_PUBLIC_PATH
// (default /uploads). No-op (404) when STORAGE_DRIVER=s3/cloudinary, where
// getUrl points at the bucket/CDN directly.

const CONTENT_TYPES: Record<string, string> = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
};

export async function GET(_req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  if (env.STORAGE_DRIVER !== 'local') return new Response('Not found', { status: 404 });

  const { path: parts } = await params;
  const key = parts.join('/');
  const root = path.resolve(process.cwd(), env.LOCAL_STORAGE_DIR);
  const abs = path.resolve(root, key);

  // Prevent path traversal outside the storage root.
  if (abs !== root && !abs.startsWith(root + path.sep)) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const data = await fs.readFile(abs);
    const type = CONTENT_TYPES[path.extname(abs).toLowerCase()] ?? 'application/octet-stream';
    return new Response(new Uint8Array(data), {
      headers: {
        'content-type': type,
        'cache-control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
