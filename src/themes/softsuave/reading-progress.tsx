'use client';

import { useEffect, useState } from 'react';

// Thin brand-coloured bar that tracks reading progress down the article.
export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const height = el.scrollHeight - el.clientHeight;
      setPct(height > 0 ? Math.min(100, (el.scrollTop / height) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1">
      <div className="h-full bg-[#ff0042] transition-[width] duration-75 ease-out" style={{ width: `${pct}%` }} />
    </div>
  );
}
