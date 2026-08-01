import 'server-only';
import { env } from '../env';
import type { StorageAdapter, UploadResult } from './types';

/**
 * S3-compatible storage driver (Cloudflare R2 / AWS S3 / MinIO). getUrl is fully
 * implemented; uploadFile/deleteFile are stubbed for Phase 1. To enable in
 * production: `npm i @aws-sdk/client-s3`, then complete the two methods below
 * using a client built from the S3_* env vars (endpoint, region, credentials).
 * The public URL scheme (S3_PUBLIC_URL) is already correct, so no call site needs
 * to change when this driver is finished.
 */
export class S3StorageAdapter implements StorageAdapter {
  private readonly publicBase = env.S3_PUBLIC_URL.replace(/\/+$/, '');

  // Params omitted intentionally (structurally satisfies StorageAdapter) until
  // the S3 SDK wiring lands; see class doc comment above.
  async uploadFile(): Promise<UploadResult> {
    throw new Error(
      'S3 storage driver not yet wired. Install @aws-sdk/client-s3 and complete src/lib/storage/s3.ts, or use STORAGE_DRIVER=local for development.',
    );
  }

  async deleteFile(): Promise<void> {
    throw new Error(
      'S3 storage driver not yet wired. Install @aws-sdk/client-s3 and complete src/lib/storage/s3.ts, or use STORAGE_DRIVER=local for development.',
    );
  }

  getUrl(key: string): string {
    const clean = key.replace(/^\/+/, '');
    return `${this.publicBase}/${clean}`;
  }
}
