import type { Theme } from '../_contract';
import { MinimalLayout } from './layout';
import { MinimalArchiveView } from './archive-view';
import { MinimalPostView } from './post-view';
import { MinimalPostCard } from './post-card';

export const minimalTheme: Theme = {
  id: 'minimal',
  label: 'Minimal',
  Layout: MinimalLayout,
  ArchiveView: MinimalArchiveView,
  PostView: MinimalPostView,
  PostCard: MinimalPostCard,
};
