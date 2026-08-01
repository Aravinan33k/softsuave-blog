import { describe, it, expect } from 'vitest';
import { parseCloudinaryUrl } from './env';

describe('parseCloudinaryUrl', () => {
  it('parses the standard console format', () => {
    expect(parseCloudinaryUrl('cloudinary://123456789012345:abcdefghijklmnopqrstuvwxyz@mycloud')).toEqual({
      cloudName: 'mycloud',
      apiKey: '123456789012345',
      apiSecret: 'abcdefghijklmnopqrstuvwxyz',
    });
  });

  it('percent-decodes credentials', () => {
    expect(parseCloudinaryUrl('cloudinary://key:sec%2Fret%40@mycloud')?.apiSecret).toBe('sec/ret@');
  });

  it('ignores query suffixes like ?secure=true', () => {
    expect(parseCloudinaryUrl('cloudinary://key:secret@mycloud?secure=true')).toEqual({
      cloudName: 'mycloud',
      apiKey: 'key',
      apiSecret: 'secret',
    });
  });

  it('rejects other protocols', () => {
    expect(parseCloudinaryUrl('https://key:secret@mycloud')).toBeNull();
  });

  it('rejects non-URLs', () => {
    expect(parseCloudinaryUrl('not a url')).toBeNull();
  });

  it('rejects missing parts', () => {
    expect(parseCloudinaryUrl('cloudinary://key@mycloud')).toBeNull();
    expect(parseCloudinaryUrl('cloudinary://:secret@mycloud')).toBeNull();
    expect(parseCloudinaryUrl('cloudinary://key:secret@')).toBeNull();
  });
});
