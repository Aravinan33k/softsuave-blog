'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const COOKIE = 'admin-theme';

function writeCookie(value: string) {
  document.cookie = `${COOKIE}=${value}; path=/; max-age=31536000; samesite=lax`;
}

// Admin-only dark mode: toggles the `dark` class on the #admin-shell wrapper (so
// it never affects the public site) and persists the choice to a cookie, which
// the dashboard layout reads to server-render the class (no flash).
export function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const shell = document.getElementById('admin-shell');
    let isDark = shell?.classList.contains('dark') ?? false;
    try {
      // Migrate legacy localStorage-only preferences to the cookie.
      const saved = localStorage.getItem(COOKIE);
      if (saved && !document.cookie.includes(`${COOKIE}=`)) {
        writeCookie(saved);
        isDark = saved === 'dark';
        shell?.classList.toggle('dark', isDark);
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(isDark);
  }, []);

  const toggle = () => {
    const shell = document.getElementById('admin-shell');
    if (!shell) return;
    const next = !shell.classList.contains('dark');
    shell.classList.toggle('dark', next);
    try {
      localStorage.setItem(COOKIE, next ? 'dark' : 'light');
      writeCookie(next ? 'dark' : 'light');
    } catch {
      /* ignore */
    }
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
