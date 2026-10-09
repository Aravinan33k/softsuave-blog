const { chromium } = require('playwright');
const path = require('path');
const out = process.argv[2];

const PAGES = [
  'hire-reactjs-developers',
  'nodejs-development-company',
  'hire-forward-deployed-engineer',
  'generative-ai-development-company',
  'ai-solutions-in-edutech',
];
// Includes 1280x720 — the shortest laptop still in real use — so the rule is
// checked past the one size that prompted it.
const SIZES = [[1920, 1080], [1920, 830], [1536, 864], [1440, 900], [1366, 768], [1280, 720]];

(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  let worst = -1e9, worstAt = '';
  const rows = [];
  for (const slug of PAGES) {
    for (const [w, h] of SIZES) {
      const p = await b.newPage({ viewport: { width: w, height: h } });
      await p.emulateMedia({ reducedMotion: 'reduce' });
      await p.goto(`http://localhost:3100/${slug}`, { waitUntil: 'networkidle', timeout: 180000 });
      await p.waitForTimeout(700);
      const m = await p.evaluate(() => {
        const card = document.querySelector('[class*="card"]');
        if (!card) return null;
        const r = card.getBoundingClientRect();
        const submit = document.querySelector('[class*="submit"]');
        return {
          cardH: Math.round(r.height),
          over: Math.round(r.bottom - window.innerHeight),
          submitVisible: submit ? submit.getBoundingClientRect().bottom <= window.innerHeight : null,
        };
      });
      if (m) {
        if (m.over > worst) { worst = m.over; worstAt = `${slug} @ ${w}x${h}`; }
        rows.push(
          `${slug.slice(0, 32).padEnd(33)}${(w + 'x' + h).padEnd(10)} card=${String(m.cardH).padStart(3)}  ` +
            `${(m.over <= 0 ? 'FITS (' + -m.over + 'px spare)' : 'OVER ' + m.over).padEnd(22)} submit=${m.submitVisible}`,
        );
      }
      if (w === 1366 && h === 768 && slug === PAGES[0]) {
        await p.screenshot({ path: path.join(out, 'hero-1366.png') });
      }
      await p.close();
    }
  }
  console.log(rows.join('\n'));
  console.log(`\nworst: ${worst <= 0 ? `none — every form fits (tightest ${-worst}px spare, ${worstAt})` : worst + 'px at ' + worstAt}`);
  await b.close();
})().catch((e) => { console.error(e.message); process.exit(1); });
