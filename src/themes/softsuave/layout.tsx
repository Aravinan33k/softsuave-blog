import type { CSSProperties } from 'react';
import type { LayoutProps } from '../_contract';
import { BASE_PATH } from '@/lib/flags';
import { marketingFontVariables } from '@/lib/home/marketing-fonts';
import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import { BackToTop } from './back-to-top';
import '@/app/(marketing)/home.css';

const HOME_HREF = BASE_PATH || '/';

// Soft Suave theme layout: the marketing site's own header and footer around
// the blog content (13 Oct review: "the current blog has some dummy header and
// footer, so update it with the current one"). It used to render this theme's
// older rebuild of them (`./header`, `./footer`).
//
// Each runs in its own `.theme-four` box, which carries the tokens and fonts
// they are styled with; `theme-four-chrome` drops that box's full-viewport,
// dark-ground page styling so it wraps only the bar or the footer. The post
// content stays outside it, on this theme's own type and white ground.
//
// The header is fixed, so the content clears it with top padding; the white
// `main` reads as a light band, which gives the header its light tone, and the
// dark banners at the top of the archive and post pages are marked dark.
export function SoftSuaveLayout({ site, children }: LayoutProps) {
  const style = { '--theme-accent': '#ff0042' } as CSSProperties;
  const chrome = `${marketingFontVariables} theme-four theme-four-chrome`;
  return (
    <div style={style} className="ss-theme flex min-h-screen flex-col bg-white">
      <div className={chrome}>
        <Nav logoHref={HOME_HREF} />
      </div>
      <main id="main" className="ss-theme-main flex-1" data-nav-tone="light">
        {children}
      </main>
      <div className={chrome}>
        <Footer />
      </div>
      <BackToTop />
      {/* site prop reserved for future header/footer personalisation */}
      <span hidden>{site.title}</span>
    </div>
  );
}
