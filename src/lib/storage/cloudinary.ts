import 'server-only';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '../env';
import type { StorageAdapter, UploadInput, UploadResult } from './types';

export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  /** Optional key prefix for all uploaded objects, e.g. "blog". */
  folder?: string;
}

/**
 * Maps a storage key ("2026/07/cover-abc123.webp") to a Cloudinary public ID
 * ("blog/2026/07/cover-abc123"). Deterministic: the same key always yields the
 * same public ID, so uploads with overwrite:true stay idempotent and
 * deleteFile can reconstruct the ID from the key alone.
 */
export function toPublicId(key: string, folder?: string): string {
  const clean = key.replace(/^\/+/, '').replace(/\\/g, '/').replace(/\.[^./]+$/, '');
  const prefix = folder?.replace(/^\/+|\/+$/g, '');
  return prefix ? `${prefix}/${clean}` : clean;
}

/**
 * Cloudinary storage driver for production. Sharp still normalises images and
 * generates the responsive variants upstream; each variant is uploaded as a
 * separate object under the same key layout the local driver uses on disk.
 */
export class CloudinaryStorageAdapter implements StorageAdapter {
  private readonly folder: string;
  private readonly cloudName: string;

  constructor(config?: CloudinaryConfig) {
    const cfg = config ?? {
      cloudName: env.CLOUDINARY_CLOUD_NAME,
      apiKey: env.CLOUDINARY_API_KEY,
      apiSecret: env.CLOUDINARY_API_SECRET,
      folder: env.CLOUDINARY_FOLDER,
    };
    if (!cfg.cloudName || !cfg.apiKey || !cfg.apiSecret) {
      throw new Error(
        'Cloudinary storage driver requires CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET (or CLOUDINARY_URL).',
      );
    }
    cloudinary.config({
      cloud_name: cfg.cloudName,
      api_key: cfg.apiKey,
      api_secret: cfg.apiSecret,
      secure: true,
    });
    this.folder = cfg.folder ?? '';
    this.cloudName = cfg.cloudName;
  }

  async uploadFile({ key, body }: UploadInput): Promise<UploadResult> {
    const format = key.replace(/^\/+/, '').split('.').pop() || undefined;
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          public_id: toPublicId(key, this.folder),
          resource_type: 'image',
          format,
          overwrite: true,
          unique_filename: false,
        },
        (error, uploadResult) => {
          if (error) reject(error);
          else if (uploadResult) resolve(uploadResult);
          else reject(new Error('Cloudinary upload returned no result.'));
        },
      );
      stream.end(Buffer.from(body));
    });
    return { key, url: result.secure_url };
  }

  async deleteFile(key: string): Promise<void> {
    const result = (await cloudinary.uploader.destroy(toPublicId(key, this.folder), {
      resource_type: 'image',
      invalidate: true,
    })) as { result?: string };
    // Idempotent: deleting a missing object is a no-op, like local's rm force.
    if (result.result !== 'ok' && result.result !== 'not found') {
      throw new Error(`Cloudinary delete failed for ${key}: ${result.result ?? 'unknown error'}`);
    }
  }

  getUrl(key: string): string {
    const format = key.replace(/^\/+/, '').split('.').pop() || '';
    return `https://res.cloudinary.com/${this.cloudName}/image/upload/${toPublicId(key, this.folder)}${format ? `.${format}` : ''}`;
  }
}
