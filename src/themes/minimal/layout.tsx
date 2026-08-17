import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { LayoutProps } from '../_contract';

// "Minimal" — a clean, centered, single-column reading theme.
export function MinimalLayout({ site, children }: LayoutProps) {
  const style = { '--theme-accent': site.accentColor } as CSSProperties;
  return (
    <div style={style} className="flex min-h-screen flex-col bg-white text-neutral-900">
      <header className="border-b">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5">
          <Link href="/blog" className="text-lg font-semibold tracking-tight">
            {site.title}
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/blog" className="hover:opacity-70">Home</Link>
            {site.navPages.map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} className="hover:opacity-70">
                {p.title}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">{children}</main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-3xl flex-col gap-2 px-4 py-6 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.title}</span>
          {site.socialLinks.length > 0 && (
            <div className="flex gap-4">
              {site.socialLinks.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900">
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
