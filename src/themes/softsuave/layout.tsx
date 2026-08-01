import type { CSSProperties } from 'react';
import type { LayoutProps } from '../_contract';
import { SoftSuaveHeader } from './header';
import { SoftSuaveFooter } from './footer';
import { BackToTop } from './back-to-top';

// Soft Suave theme layout: rebuilt marketing header + footer around the content.
export function SoftSuaveLayout({ site, children }: LayoutProps) {
  const style = { '--theme-accent': '#ff0042' } as CSSProperties;
  return (
    <div style={style} className="ss-theme flex min-h-screen flex-col bg-white">
      <SoftSuaveHeader />
      <main id="main" className="flex-1">{children}</main>
      <SoftSuaveFooter />
      <BackToTop />
      {/* site prop reserved for future header/footer personalisation */}
      <span hidden>{site.title}</span>
    </div>
  );
}
