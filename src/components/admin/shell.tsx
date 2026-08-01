'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import type { Role } from '@/lib/auth/tokens';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

export interface ShellUser {
  email: string;
  name: string | null;
  role: string;
}

const SIDEBAR_KEY = 'admin-sidebar';

// Client layout orchestrator for the admin: owns the sidebar collapsed/drawer
// state that both the Sidebar and Topbar (hamburger) need.
export function AdminShell({
  role,
  siteTitle,
  user,
  children,
}: {
  role: Role;
  siteTitle: string;
  user: ShellUser;
  children: ReactNode;
}) {
  // Collapsed state persists to localStorage, not a cookie: sidebar width is a
  // pure client layout concern. A one-frame settle on first paint in an
  // authenticated admin area is acceptable, and keeping it out of the request
  // avoids server round-trips and cache implications for every admin page.
  // (Contrast with the theme cookie, which must be server-rendered to avoid a
  // color-scheme flash.)
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(SIDEBAR_KEY) === 'collapsed') {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring persisted layout state on mount
        setCollapsed(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((c) => {
      try {
        localStorage.setItem(SIDEBAR_KEY, c ? 'expanded' : 'collapsed');
      } catch {
        /* ignore */
      }
      return !c;
    });
  }, []);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <>
      <Sidebar
        role={role}
        siteTitle={siteTitle}
        collapsed={collapsed}
        onToggleCollapsed={toggleCollapsed}
        drawerOpen={drawerOpen}
        onCloseDrawer={closeDrawer}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar user={user} onOpenDrawer={() => setDrawerOpen(true)} />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </>
  );
}
