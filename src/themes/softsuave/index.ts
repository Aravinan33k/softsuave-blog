import type { Theme } from '../_contract';
import { SoftSuaveLayout } from './layout';
import { SoftSuaveArchiveView } from './archive-view';
import { SoftSuavePostView } from './post-view';
import { SoftSuavePostCard } from './post-card';

export const softsuaveTheme: Theme = {
  id: 'softsuave',
  label: 'Soft Suave',
  Layout: SoftSuaveLayout,
  ArchiveView: SoftSuaveArchiveView,
  PostView: SoftSuavePostView,
  PostCard: SoftSuavePostCard,
};
