'use client';

import { useEffect, useState } from 'react';
import { Toaster } from '@/components/ui/sonner';

// The sonner wrapper resolves its theme via next-themes, but the admin's dark
// mode is a cookie-backed class on #admin-shell instead. This bridges the two:
// it observes the shell's `dark` class and passes an explicit theme so toasts
// never render inverted against the admin surface.
export function ThemeToaster() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const shell = document.getElementById('admin-shell');
    if (!shell) return;
    const sync = () => setDark(shell.classList.contains('dark'));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(shell, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return <Toaster theme={dark ? 'dark' : 'light'} />;
}
