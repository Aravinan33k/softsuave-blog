'use client';

import { Fragment, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronsLeft, ChevronsRight, ExternalLink, X } from 'lucide-react';
import type { Role } from '@/lib/auth/tokens';
import { cn } from '@/lib/utils';
import { groupedNav } from './nav';

// Admin sidebar. Desktop: collapsible between full labels (w-60) and an
// icon-only rail (w-16). Mobile: hidden entirely; the topbar hamburger opens
// an overlay drawer rendering the same nav.
export function Sidebar({
  role,
  siteTitle,
  collapsed,
  onToggleCollapsed,
  drawerOpen,
  onCloseDrawer,
}: {
  role: Role;
  siteTitle: string;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  drawerOpen: boolean;
  onCloseDrawer: () => void;
}) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        aria-label="Admin navigation"
        className={cn(
          'hidden shrink-0 flex-col border-r bg-sidebar transition-[width] duration-200 ease-out md:flex',
          collapsed ? 'w-16' : 'w-60',
        )}
      >
        <div className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            {siteTitle.charAt(0).toUpperCase()}
          </span>
          {!collapsed && <span className="truncate font-semibold tracking-tight">{siteTitle}</span>}
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-2">
          <Nav role={role} collapsed={collapsed} />
        </div>

        <div className="shrink-0 space-y-1 border-t p-2">
          <a
            // The site root: the marketing homepage once it ships, and until
            // then a 307 to the blog archive.
            href="/"
            target="_blank"
            rel="noopener"
            title="View site"
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              collapsed && 'justify-center px-2',
            )}
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            {!collapsed && <span>View site</span>}
          </a>
          <button
            type="button"
            onClick={onToggleCollapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!collapsed}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={cn(
              'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              collapsed && 'justify-center px-2',
            )}
          >
            {collapsed ? <ChevronsRight className="h-4 w-4 shrink-0" /> : <ChevronsLeft className="h-4 w-4 shrink-0" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      <MobileDrawer role={role} siteTitle={siteTitle} open={drawerOpen} onClose={onCloseDrawer} />
    </>
  );
}

function Nav({ role, collapsed, onNavigate }: { role: Role; collapsed: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  const groups = groupedNav(role);

  return (
    <nav className="space-y-1">
      {groups.map(({ group, items: groupItems }) => {
        return (
          <Fragment key={group}>
            {collapsed ? (
              <div className="mx-auto my-2 h-px w-6 bg-border" aria-hidden="true" />
            ) : (
              <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground first:pt-1">
                {group}
              </p>
            )}
            {groupItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  title={collapsed ? item.label : undefined}
                  aria-label={collapsed ? item.label : undefined}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                    collapsed && 'justify-center px-2',
                    active
                      ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
                  )}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-sidebar-primary" aria-hidden="true" />
                  )}
                  <item.icon className={cn('h-4 w-4 shrink-0', active && 'text-sidebar-primary')} />
                  {!collapsed && item.label}
                </Link>
              );
            })}
          </Fragment>
        );
      })}
    </nav>
  );
}

function MobileDrawer({
  role,
  siteTitle,
  open,
  onClose,
}: {
  role: Role;
  siteTitle: string;
  open: boolean;
  onClose: () => void;
}) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Close on Escape, lock body scroll, autofocus the first link — same a11y
  // pattern as the public theme's mobile menu. Nav links also close the
  // drawer via onNavigate.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Admin navigation menu">
      <button type="button" aria-label="Close menu" onClick={onClose} className="absolute inset-0 bg-black/50" />
      <div className="absolute left-0 top-0 flex h-full w-64 flex-col border-r bg-sidebar shadow-xl">
        <div className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            {siteTitle.charAt(0).toUpperCase()}
          </span>
          <span className="flex-1 truncate font-semibold tracking-tight">{siteTitle}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2" ref={(el) => {
          firstLinkRef.current = el?.querySelector('a') ?? null;
        }}>
          <Nav role={role} collapsed={false} onNavigate={onClose} />
        </div>
      </div>
    </div>
  );
}
