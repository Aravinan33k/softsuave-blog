import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { LayoutProps } from '../_contract';

// "Magazine" — a bold, grid-forward theme with a dark masthead.
export function MagazineLayout({ site, children }: LayoutProps) {
  const style = { '--theme-accent': site.accentColor } as CSSProperties;
  return (
    <div style={style} className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900">
      <header className="bg-neutral-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <Link href="/" className="text-3xl font-black uppercase tracking-tight">
            {site.title}
          </Link>
          {site.tagline && <p className="mt-1 text-sm text-neutral-400">{site.tagline}</p>}
          <nav className="mt-4 flex flex-wrap gap-5 text-sm font-medium uppercase tracking-wide">
            <Link href="/" className="hover:[color:var(--theme-accent)]">Home</Link>
            {site.navPages.map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} className="hover:[color:var(--theme-accent)]">
                {p.title}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">{children}</main>

      <footer className="bg-neutral-900 text-neutral-400">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.title}</span>
          {site.socialLinks.length > 0 && (
            <div className="flex gap-4">
              {site.socialLinks.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
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
