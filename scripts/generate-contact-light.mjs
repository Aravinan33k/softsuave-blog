// Generates the closing CTA band's backdrop: public/videos/contact-light.{webm,mp4}
// and the still at public/brand/contact-light-poster.jpg.
//
// Why generated and not footage: the band sits between a light section and the
// black footer, so its backdrop has to carry its own top-to-bottom gradient —
// luminous where it meets the light band, black where it meets the footer. No
// stock clip does that, and a flat colour cannot (see the note above `.contact`
// in home.module.css). It is also 64 KB of WebM instead of megabytes, which
// matters because this band renders on 53 pages.
//
// Usage — ffmpeg is NOT a dependency of this repo, so point at any binary:
//
//   node scripts/generate-contact-light.mjs | ffmpeg -y -f rawvideo -pix_fmt rgb24 \
//     -s 480x270 -r 24 -i - \
//     -vf "scale=1600:900:flags=lanczos,gblur=sigma=1.2,noise=alls=5:allf=t,format=yuv420p" \
//     -c:v libx264 -preset slow -crf 25 -movflags +faststart -an \
//     public/videos/contact-light.mp4
//
//   ffmpeg -y -i public/videos/contact-light.mp4 -c:v libvpx-vp9 -crf 40 -b:v 0 \
//     -deadline good -cpu-used 2 -row-mt 1 -pix_fmt yuv420p -an \
//     public/videos/contact-light.webm
//
//   ffmpeg -y -ss 0 -i public/videos/contact-light.mp4 -frames:v 1 -q:v 3 \
//     public/brand/contact-light-poster.jpg
//
// The poster MUST be frame 0 of the same render, because it is the layer the
// video fades in over on desktop and the layer that stays put under reduced
// motion and on phones.
const W = 480, H = 270, FPS = 24, SECONDS = 12;
const FRAMES = FPS * SECONDS;
const TAU = Math.PI * 2;

// Base canvas: near-black with a faint warm lift, so the darkest parts of the
// band still sit above pure #000 and never crush against the footer.
const BASE = [7, 8, 12];

// Each light is a Gaussian bloom orbiting its own slow ellipse. `k` is the
// harmonic — 1 or 2 — which is what keeps the loop seamless.
const LIGHTS = [
  // the hero light: brand coral, upper left, biggest and brightest
  { color: [255, 84, 54],  cx: 0.30, cy: 0.24, ax: 0.26, ay: 0.11, kx: 1, ky: 1, phx: 0.0,  phy: 1.1,  sigma: 0.24, gain: 0.78 },
  // brand red, upper right, counter-rotating so the two cross slowly
  { color: [251, 59, 92],  cx: 0.72, cy: 0.20, ax: 0.22, ay: 0.13, kx: 1, ky: 2, phx: 2.4,  phy: 0.3,  sigma: 0.20, gain: 0.62 },
  // warm amber low-centre, the "floor glow" that keeps the middle from going flat
  { color: [255, 122, 69], cx: 0.50, cy: 0.44, ax: 0.32, ay: 0.09, kx: 2, ky: 1, phx: 1.7,  phy: 3.0,  sigma: 0.17, gain: 0.34 },
  // a cool counter-light: without it the field reads as one orange wash rather
  // than as depth. Deep and dim — it should never be nameable as "blue".
  { color: [46, 62, 120],  cx: 0.16, cy: 0.58, ax: 0.20, ay: 0.11, kx: 1, ky: 1, phx: 4.2,  phy: 2.2,  sigma: 0.24, gain: 0.36 },
];

/** Vertical falloff: luminous across the top third, near-black at the bottom
 *  edge. This is the whole reason the band can sit between a white section and
 *  a black footer — it hands off to each of them instead of butting against
 *  them. */
function verticalRamp(v) {
  const t = Math.min(1, Math.max(0, (v - 0.08) / 0.92));
  const fall = Math.pow(1 - t, 1.65);
  return 0.06 + 0.94 * fall;
}

/** Soft horizontal vignette, so the light never runs flat into the gutters. */
function horizontalVignette(u) {
  const d = Math.abs(u - 0.5) * 2;
  return 1 - 0.28 * d * d;
}

const frame = Buffer.allocUnsafe(W * H * 3);

function writeFrame(buf) {
  return new Promise((resolve) => {
    if (process.stdout.write(buf)) resolve();
    else process.stdout.once("drain", resolve);
  });
}

for (let f = 0; f < FRAMES; f++) {
  const t = f / FRAMES; // 0..1 over exactly one loop

  // Resolve every light's position once per frame rather than per pixel.
  const lights = LIGHTS.map((L) => ({
    r: L.color[0], g: L.color[1], b: L.color[2],
    x: L.cx + L.ax * Math.sin(TAU * L.kx * t + L.phx),
    y: L.cy + L.ay * Math.cos(TAU * L.ky * t + L.phy),
    // Breathing: each light swells and settles on its own cycle, which reads as
    // haze drifting rather than as lamps sliding around.
    inv2s2: 1 / (2 * Math.pow(L.sigma * (1 + 0.22 * Math.sin(TAU * t + L.phx)), 2)),
    gain: L.gain * (1 + 0.38 * Math.sin(TAU * t + L.phy)),
  }));

  let o = 0;
  for (let y = 0; y < H; y++) {
    const v = y / (H - 1);
    const ramp = verticalRamp(v);

    for (let x = 0; x < W; x++) {
      const u = x / (W - 1);
      // Correct for aspect so the blooms stay circular, not stretched.
      const ux = u * (W / H);

      let r = BASE[0], g = BASE[1], b = BASE[2];

      for (let i = 0; i < lights.length; i++) {
        const L = lights[i];
        const dx = ux - L.x * (W / H);
        const dy = v - L.y;
        const fall = Math.exp(-(dx * dx + dy * dy) * L.inv2s2);
        if (fall < 0.002) continue;
        const a = fall * L.gain;
        r += L.r * a;
        g += L.g * a;
        b += L.b * a;
      }

      const m = ramp * horizontalVignette(u);
      r *= m; g *= m; b *= m;

      // Soft shoulder instead of a hard clamp: highlights roll off rather than
      // clipping to a flat plate of colour, which is what makes a cheap
      // gradient look cheap.
      frame[o++] = (255 * (1 - Math.exp(-r / 178))) | 0;
      frame[o++] = (255 * (1 - Math.exp(-g / 178))) | 0;
      frame[o++] = (255 * (1 - Math.exp(-b / 178))) | 0;
    }
  }

  await writeFrame(frame);
}
