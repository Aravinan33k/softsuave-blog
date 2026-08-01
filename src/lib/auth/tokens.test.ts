import { describe, it, expect } from 'vitest';
import { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } from './tokens';

describe('access tokens', () => {
  it('round-trips claims', async () => {
    const token = await signAccessToken({ id: 'u1', email: 'e@x.com', role: 'ADMIN' });
    const claims = await verifyAccessToken(token);
    expect(claims?.sub).toBe('u1');
    expect(claims?.role).toBe('ADMIN');
    expect(claims?.type).toBe('access');
  });
  it('rejects a tampered token', async () => {
    const token = await signAccessToken({ id: 'u1', email: 'e@x.com', role: 'ADMIN' });
    expect(await verifyAccessToken(`${token}x`)).toBeNull();
  });
  it('rejects a refresh token used as an access token', async () => {
    const refresh = await signRefreshToken({ userId: 'u1', jti: 'j1', family: 'f1' });
    expect(await verifyAccessToken(refresh)).toBeNull();
  });
});

describe('refresh tokens', () => {
  it('round-trips jti + family', async () => {
    const token = await signRefreshToken({ userId: 'u1', jti: 'j1', family: 'f1' });
    const claims = await verifyRefreshToken(token);
    expect(claims?.sub).toBe('u1');
    expect(claims?.jti).toBe('j1');
    expect(claims?.family).toBe('f1');
  });
  it('rejects an access token used as a refresh token', async () => {
    const access = await signAccessToken({ id: 'u1', email: 'e@x.com', role: 'EDITOR' });
    expect(await verifyRefreshToken(access)).toBeNull();
  });
});
