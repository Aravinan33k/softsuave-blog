import 'server-only';
import { env } from '../env';
import { CloudinaryStorageAdapter } from './cloudinary';
import { LocalStorageAdapter } from './local';
import { S3StorageAdapter } from './s3';
import type { StorageAdapter } from './types';

/** The active storage adapter, selected by STORAGE_DRIVER. */
export const storage: StorageAdapter =
  env.STORAGE_DRIVER === 'cloudinary'
    ? new CloudinaryStorageAdapter()
    : env.STORAGE_DRIVER === 's3'
      ? new S3StorageAdapter()
      : new LocalStorageAdapter();

export type { StorageAdapter, UploadInput, UploadResult } from './types';
