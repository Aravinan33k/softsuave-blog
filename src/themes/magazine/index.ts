import type { Theme } from '../_contract';
import { MagazineLayout } from './layout';
import { MagazineArchiveView } from './archive-view';
import { MagazinePostView } from './post-view';
import { MagazinePostCard } from './post-card';

export const magazineTheme: Theme = {
  id: 'magazine',
  label: 'Magazine',
  Layout: MagazineLayout,
  ArchiveView: MagazineArchiveView,
  PostView: MagazinePostView,
  PostCard: MagazinePostCard,
};
