'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronRight, Menu, Plus, Search, ShieldCheck, User2, LogOut } from 'lucide-react';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { buttonVariants } from '@/components/ui/button';
import { DarkModeToggle } from '@/components/admin/dark-mode-toggle';
import { NAV_ITEMS } from './nav';
import type { ShellUser } from './shell';

// Sticky admin topbar: breadcrumbs (derived from the current path + nav
// config), a quick post search, the "+ New post" action, the dark-mode
// toggle, and the user menu.
export function Topbar({ user, onOpenDrawer }: { user: ShellUser; onOpenDrawer: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  async function logout() {
    try {
      await api('/api/v1/auth/logout', { method: 'POST' });
    } finally {
      // Always leave the dashboard, even if the revoke call fails
      // (e.g. the session already expired server-side).
      router.replace('/admin/login');
    }
  }

  function submitSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/admin/posts?q=${encodeURIComponent(q)}`);
  }

  const crumbs = breadcrumbs(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur sm:px-6 supports-[backdrop-filter]:bg-background/60">
      <button
        type="button"
        onClick={onOpenDrawer}
        aria-label="Open navigation menu"
        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
        <ol className="flex items-center gap-1 text-sm">
          {crumbs.map((crumb, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={crumb.href ?? crumb.label} className="flex min-w-0 items-center gap-1">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" aria-hidden="true" />}
                {last || !crumb.href ? (
                  <span aria-current="page" className="truncate font-medium">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Quick search → posts list */}
      <form onSubmit={submitSearch} role="search" className="relative hidden sm:block">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts…"
          aria-label="Search posts"
          className="h-8 w-36 pl-8 text-sm transition-[width] duration-200 focus:w-60"
        />
      </form>

      <Link
        href="/admin/posts/new"
        className={cn(buttonVariants({ size: 'sm' }), 'gap-1 max-sm:h-8 max-sm:w-8 max-sm:px-0')}
        title="New post"
      >
        <Plus className="h-4 w-4" />
        <span className="max-sm:hidden">New post</span>
      </Link>

      <DarkModeToggle />

      {/* User menu */}
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          className="flex items-center gap-2 rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
            {(user.name ?? user.email).charAt(0).toUpperCase()}
          </span>
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-11 w-56 rounded-md border bg-popover p-1 shadow-md" role="menu">
            <div className="border-b px-3 py-2">
              <p className="truncate text-sm font-medium">{user.name ?? user.email}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
            <Link
              href="/admin/settings/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 rounded px-3 py-2 text-sm hover:bg-accent"
            >
              <User2 className="h-4 w-4 text-muted-foreground" /> Profile
            </Link>
            <Link
              href="/admin/settings/security"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 rounded px-3 py-2 text-sm hover:bg-accent"
            >
              <ShieldCheck className="h-4 w-4 text-muted-foreground" /> Security
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm text-destructive hover:bg-accent"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

// Derives breadcrumb segments from the path: section labels come from the nav
// config; a trailing segment is 'New' for /new and 'Edit' for a record id.
function breadcrumbs(pathname: string): { label: string; href?: string }[] {
  const segments = pathname.split('/').filter(Boolean).slice(1); // drop 'admin'
  if (segments.length === 0) return [{ label: 'Dashboard' }];

  const crumbs: { label: string; href?: string }[] = [];
  let acc = '/admin';
  segments.forEach((seg, i) => {
    acc += `/${seg}`;
    const nav = NAV_ITEMS.find((n) => n.href === acc);
    const isLast = i === segments.length - 1;
    let label = nav?.label;
    if (!label) {
      // A long trailing segment is a record id (cuid) → the edit screen.
      if (seg === 'new') label = 'New';
      else if (isLast && seg.length > 20) label = 'Edit';
      else label = seg.charAt(0).toUpperCase() + seg.slice(1);
    }
    crumbs.push({ label, href: isLast ? undefined : acc });
  });
  return crumbs;
}
