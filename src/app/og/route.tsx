import { ImageResponse } from 'next/og';

// Dynamically-generated Open Graph image for content without a custom OG image.
// Runs on the edge runtime (no DB) — brand accent is a fixed default.
export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get('title') ?? 'Softsuave Blog').slice(0, 140);
  const subtitle = (searchParams.get('subtitle') ?? '').slice(0, 100);
  const accent = searchParams.get('accent') ?? '#2563eb';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0a',
          color: 'white',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', width: 96, height: 10, background: accent, borderRadius: 4 }} />
        <div style={{ display: 'flex', fontSize: 68, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {title}
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: '#a3a3a3' }}>{subtitle}</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
