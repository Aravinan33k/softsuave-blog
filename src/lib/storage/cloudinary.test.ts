import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('cloudinary', () => ({
  v2: {
    config: vi.fn(),
    uploader: {
      upload_stream: vi.fn(),
      destroy: vi.fn(),
    },
  },
}));

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorageAdapter, toPublicId } from './cloudinary';

// Loose view of the SDK for mocking (its real overloads don't accept our fakes).
type FakeStream = { end: () => void };
interface UploaderMock {
  upload_stream: (opts: Record<string, unknown>, cb: (err: unknown, result?: unknown) => void) => FakeStream;
  destroy: (publicId: string, opts: Record<string, unknown>) => Promise<{ result: string }>;
}
const uploader = cloudinary.uploader as unknown as {
  upload_stream: ReturnType<typeof vi.fn> & UploaderMock['upload_stream'];
  destroy: ReturnType<typeof vi.fn> & UploaderMock['destroy'];
};
const config = { cloudName: 'testcloud', apiKey: 'key', apiSecret: 'secret', folder: 'blog' };

beforeEach(() => {
  vi.clearAllMocks();
  uploader.upload_stream.mockImplementation((opts: unknown, cb: (e: unknown, r?: unknown) => void) => {
    const { public_id } = opts as { public_id: string };
    return {
      end: () => cb(null, { secure_url: `https://res.cloudinary.com/testcloud/image/upload/${public_id}.webp` }),
    };
  });
  uploader.destroy.mockResolvedValue({ result: 'ok' });
});

describe('toPublicId', () => {
  it('strips leading slashes and the file extension', () => {
    expect(toPublicId('/2026/07/abc-768.webp')).toBe('2026/07/abc-768');
  });
  it('prefixes the folder and trims its slashes', () => {
    expect(toPublicId('2026/07/abc.webp', '/blog/')).toBe('blog/2026/07/abc');
  });
  it('normalises backslashes', () => {
    expect(toPublicId('2026\\07\\abc.webp', 'blog')).toBe('blog/2026/07/abc');
  });
});

describe('CloudinaryStorageAdapter', () => {
  it('requires credentials', () => {
    expect(() => new CloudinaryStorageAdapter({ cloudName: '', apiKey: 'k', apiSecret: 's' })).toThrow(/CLOUDINARY/);
  });

  it('configures the SDK with secure URLs', () => {
    new CloudinaryStorageAdapter(config);
    expect(vi.mocked(cloudinary.config)).toHaveBeenCalledWith({
      cloud_name: 'testcloud',
      api_key: 'key',
      api_secret: 'secret',
      secure: true,
    });
  });

  it('uploadFile streams the buffer with the deterministic public_id', async () => {
    const adapter = new CloudinaryStorageAdapter(config);
    const result = await adapter.uploadFile({ key: '2026/07/abc.webp', body: Buffer.from('img'), contentType: 'image/webp' });

    expect(uploader.upload_stream).toHaveBeenCalledWith(
      {
        public_id: 'blog/2026/07/abc',
        resource_type: 'image',
        format: 'webp',
        overwrite: true,
        unique_filename: false,
      },
      expect.any(Function),
    );
    expect(result).toEqual({
      key: '2026/07/abc.webp',
      url: 'https://res.cloudinary.com/testcloud/image/upload/blog/2026/07/abc.webp',
    });
  });

  it('uploadFile rejects when Cloudinary errors', async () => {
    uploader.upload_stream.mockImplementation((_opts: unknown, cb: (e: unknown, r?: unknown) => void) => ({
      end: () => cb(new Error('quota exceeded')),
    }));
    const adapter = new CloudinaryStorageAdapter(config);
    await expect(adapter.uploadFile({ key: 'a.webp', body: Buffer.from('x') })).rejects.toThrow('quota exceeded');
  });

  it('deleteFile destroys with CDN invalidation', async () => {
    const adapter = new CloudinaryStorageAdapter(config);
    await adapter.deleteFile('2026/07/abc.webp');
    expect(uploader.destroy).toHaveBeenCalledWith('blog/2026/07/abc', {
      resource_type: 'image',
      invalidate: true,
    });
  });

  it('deleteFile tolerates a missing object', async () => {
    uploader.destroy.mockResolvedValue({ result: 'not found' });
    const adapter = new CloudinaryStorageAdapter(config);
    await expect(adapter.deleteFile('a.webp')).resolves.toBeUndefined();
  });

  it('deleteFile throws on other failures', async () => {
    uploader.destroy.mockResolvedValue({ result: 'rate limited' });
    const adapter = new CloudinaryStorageAdapter(config);
    await expect(adapter.deleteFile('a.webp')).rejects.toThrow('rate limited');
  });

  it('getUrl reconstructs the delivery URL', () => {
    const adapter = new CloudinaryStorageAdapter(config);
    expect(adapter.getUrl('2026/07/abc.webp')).toBe(
      'https://res.cloudinary.com/testcloud/image/upload/blog/2026/07/abc.webp',
    );
  });

  it('works without a folder prefix', () => {
    const adapter = new CloudinaryStorageAdapter({ ...config, folder: '' });
    expect(adapter.getUrl('2026/07/abc.webp')).toBe(
      'https://res.cloudinary.com/testcloud/image/upload/2026/07/abc.webp',
    );
  });
});
