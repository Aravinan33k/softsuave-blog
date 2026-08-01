'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Image as ImageIcon, Maximize2, Minimize2, PanelRightClose, PanelRightOpen, Search, Send, Tags } from 'lucide-react';
import { cn } from '@/lib/utils';

type PanelState = 'default' | 'min' | 'max';

const STORAGE_KEY = 'editor-panel';

// Icon rail entries shown while minimized; clicking one restores the panel
// and scrolls that card into view (cards carry data-panel-section markers).
const RAIL_SECTIONS = [
  { id: 'publish', label: 'Publish', icon: Send },
  { id: 'cover', label: 'Cover image', icon: ImageIcon },
  { id: 'taxonomy', label: 'Taxonomy', icon: Tags },
  { id: 'seo', label: 'SEO', icon: Search },
] as const;

// Collapsible right-hand panel for the content editor. Three states:
// default (20rem), minimized (3rem icon rail) and maximized (30rem).
export function EditorPanel({
  showTaxonomy = true,
  children,
}: {
  showTaxonomy?: boolean;
  children: ReactNode;
}) {
  // The panel state persists to localStorage (not a cookie) because it is a
  // pure client layout concern: a cookie would force the width decision
  // through SSR for a purely visual preference, while the localStorage read
  // below happens in a mount effect so the server-rendered HTML always starts
  // in the default state and settles in one frame. Same rationale as the
  // admin sidebar collapse persistence.
  const [state, setState] = useState<PanelState>('default');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'min' || saved === 'max') {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring persisted layout state on mount
        setState(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const set = (next: PanelState) => {
    setState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const openSection = (id: string) => {
    set('default');
    // Wait a frame for the width transition to start, then bring the card in.
    requestAnimationFrame(() => {
      contentRef.current
        ?.querySelector(`[data-panel-section="${id}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const railSections = RAIL_SECTIONS.filter((s) => showTaxonomy || s.id !== 'taxonomy');

  const iconButton =
    'flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground';

  return (
    <aside
      aria-label="Post settings"
      className={cn(
        'w-full shrink-0 transition-[width] duration-200 ease-out',
        state === 'min' ? 'lg:w-12' : state === 'max' ? 'lg:w-[30rem]' : 'lg:w-80',
      )}
    >
      {/* Minimized rail (large screens only; below lg the panel always shows expanded) */}
      <div
        className={cn(
          'sticky top-20 flex-col items-center gap-1 rounded-lg border bg-card py-2',
          state === 'min' ? 'hidden lg:flex' : 'hidden',
        )}
      >
        <button type="button" onClick={() => set('default')} aria-label="Expand panel" aria-expanded={false} title="Expand panel" className={iconButton}>
          <PanelRightOpen className="h-4 w-4" />
        </button>
        <div className="my-1 h-px w-6 bg-border" aria-hidden="true" />
        {railSections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => openSection(s.id)}
            aria-label={`Open ${s.label} settings`}
            title={s.label}
            className={iconButton}
          >
            <s.icon className="h-4 w-4" />
          </button>
        ))}
      </div>

      {/* Expanded panel */}
      <div className={cn('space-y-4', state === 'min' && 'lg:hidden')}>
        <div className="hidden items-center justify-end gap-1 lg:flex">
          <button
            type="button"
            onClick={() => set(state === 'max' ? 'default' : 'max')}
            aria-label={state === 'max' ? 'Restore panel width' : 'Maximize panel width'}
            title={state === 'max' ? 'Restore width' : 'Maximize width'}
            className={iconButton}
          >
            {state === 'max' ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => set('min')}
            aria-label="Minimize panel"
            aria-expanded={true}
            title="Minimize panel"
            className={iconButton}
          >
            <PanelRightClose className="h-4 w-4" />
          </button>
        </div>
        <div ref={contentRef} className="space-y-4">
          {children}
        </div>
      </div>
    </aside>
  );
}
