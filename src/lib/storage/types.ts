/**
 * Storage adapter contract. Business logic (media library, uploads) depends only
 * on this interface, so the underlying provider (local disk in dev, Cloudflare R2
 * / AWS S3 / MinIO in prod) can be swapped via the STORAGE_DRIVER env var without
 * touching call sites.
 */
export interface UploadInput {
  /** Object key, e.g. "2026/07/cover-abc123.webp". Forward-slash separated. */
  key: string;
  /** File contents. */
  body: Buffer | Uint8Array;
  /** MIME type, e.g. "image/webp". */
  contentType?: string;
}

export interface UploadResult {
  key: string;
  url: string;
}

export interface StorageAdapter {
  uploadFile(input: UploadInput): Promise<UploadResult>;
  deleteFile(key: string): Promise<void>;
  /** Public URL for a stored object key (does not check existence). */
  getUrl(key: string): string;
}
