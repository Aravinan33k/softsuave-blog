import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { env } from '../env';
import type { StorageAdapter, UploadInput, UploadResult } from './types';

/**
 * Local-disk storage driver for development. Writes under LOCAL_STORAGE_DIR
 * (default `.storage`) and exposes files at LOCAL_STORAGE_PUBLIC_PATH via a
 * route handler (added with the media library in Phase 4).
 */
export class LocalStorageAdapter implements StorageAdapter {
  // turbopackIgnore: a runtime *data* directory, not a module path. Turbopack
  // can't statically scope `process.cwd()` + a configurable env var, so without
  // this it traces the whole project into the server bundle.
  private readonly root = path.resolve(/*turbopackIgnore: true*/ process.cwd(), env.LOCAL_STORAGE_DIR);
  private readonly publicPath = env.LOCAL_STORAGE_PUBLIC_PATH.replace(/\/+$/, '');

  private resolveKey(key: string): string {
    // Normalise and prevent path traversal outside the storage root.
    const clean = key.replace(/^\/+/, '').replace(/\\/g, '/');
    const abs = path.resolve(this.root, clean);
    if (abs !== this.root && !abs.startsWith(this.root + path.sep)) {
      throw new Error(`Invalid storage key (path traversal): ${key}`);
    }
    return abs;
  }

  async uploadFile({ key, body }: UploadInput): Promise<UploadResult> {
    const abs = this.resolveKey(key);
    await fs.mkdir(path.dirname(abs), { recursive: true });
    await fs.writeFile(abs, body);
    return { key, url: this.getUrl(key) };
  }

  async deleteFile(key: string): Promise<void> {
    const abs = this.resolveKey(key);
    await fs.rm(abs, { force: true });
  }

  getUrl(key: string): string {
    const clean = key.replace(/^\/+/, '');
    return `${this.publicPath}/${clean}`;
  }
}
