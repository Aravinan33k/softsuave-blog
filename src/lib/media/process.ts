import 'server-only';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';
import { storage } from '../storage';
import { slugify } from '../content/slug';

// Image ingestion: normalise orientation, cap dimensions, and emit a primary
// WebP plus smaller responsive WebP variants. All variants go through the
// storage adapter, so this is provider-agnostic.

const MAX_WIDTH = 2000;
const VARIANT_WIDTHS = [320, 768, 1280];

export interface ImageVariant {
  label: string;
  key: string;
  url: string;
  width: number;
  height: number;
  format: string;
}

export interface ProcessedImage {
  url: string;
  width: number;
  height: number;
  sizeBytes: number;
  mimeType: string;
  variants: ImageVariant[];
}

export async function processAndStoreImage(input: Buffer, sourceName?: string): Promise<ProcessedImage> {
  const meta = await sharp(input, { failOn: 'none' }).metadata();
  const srcWidth = meta.width ?? MAX_WIDTH;

  const now = new Date();
  // Descriptive slug in the key → SEO-friendly image URLs (image search reads
  // filenames). A short random suffix keeps same-named uploads unique.
  const nameSlug = sourceName ? slugify(sourceName.replace(/\.[^.]+$/, '')) : '';
  const base = nameSlug && nameSlug !== 'untitled' ? `${nameSlug}-` : '';
  const prefix = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, '0')}/${base}${randomUUID().slice(0, 8)}`;

  const primaryWidth = Math.min(srcWidth, MAX_WIDTH);
  const primaryBuf = await sharp(input)
    .rotate()
    .resize({ width: primaryWidth, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();
  const primaryMeta = await sharp(primaryBuf).metadata();
  const primaryKey = `${prefix}.webp`;
  const primary = await storage.uploadFile({ key: primaryKey, body: primaryBuf, contentType: 'image/webp' });

  const variants: ImageVariant[] = [
    {
      label: 'full',
      key: primaryKey,
      url: primary.url,
      width: primaryMeta.width ?? primaryWidth,
      height: primaryMeta.height ?? 0,
      format: 'webp',
    },
  ];

  for (const w of VARIANT_WIDTHS) {
    if (w >= primaryWidth) continue;
    const buf = await sharp(input)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
    const m = await sharp(buf).metadata();
    const key = `${prefix}-${w}.webp`;
    const up = await storage.uploadFile({ key, body: buf, contentType: 'image/webp' });
    variants.push({ label: `w${w}`, key, url: up.url, width: m.width ?? w, height: m.height ?? 0, format: 'webp' });
  }

  return {
    url: primary.url,
    width: primaryMeta.width ?? primaryWidth,
    height: primaryMeta.height ?? 0,
    sizeBytes: primaryBuf.length,
    mimeType: 'image/webp',
    variants,
  };
}
