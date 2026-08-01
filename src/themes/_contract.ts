import type { FC, ReactNode } from 'react';
import type { JSONContent } from '@tiptap/core';

// The theme contract. A theme is a self-contained set of React components that
// render the public blog from a normalised view model. Swapping the active theme
// is a settings change — no route or data code changes.

export interface SocialLink {
  label: string;
  url: string;
}

export interface NavPage {
  title: string;
  slug: string;
}

export interface SiteInfo {
  title: string;
  tagline: string | null;
  description: string | null;
  logoUrl: string | null;
  accentColor: string;
  fontChoice: string;
  socialLinks: SocialLink[];
  navPages: NavPage[];
  categories: TaxRef[];
}

export interface AuthorProfile {
  name: string | null;
  title: string | null;
  bio: string | null;
  avatarUrl: string | null;
  socialLinks: SocialLink[];
}

export interface TaxRef {
  name: string;
  slug: string;
}

export interface PostSummary {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  coverAlt: string | null;
  publishedAt: string | null;
  readingTimeMinutes: number;
  authorName: string | null;
  categories: TaxRef[];
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface PostFull extends PostSummary {
  contentHtml: string;
  /** The raw TipTap document, used for schema extraction (e.g. FAQ JSON-LD). */
  contentJson: JSONContent | null;
  tags: TaxRef[];
  toc: TocItem[];
  authorProfile: AuthorProfile | null;
  /** Last-modified time (ISO) for dateModified in structured data. */
  updatedAt: string | null;
  wordCount: number;
}

export interface AdjacentPost {
  slug: string;
  title: string;
}

export interface LayoutProps {
  site: SiteInfo;
  children: ReactNode;
}

export interface ArchiveViewProps {
  site: SiteInfo;
  heading: string;
  description?: string | null;
  posts: PostSummary[];
  /** Total published posts matching this view (for Load More). */
  total?: number;
  /** Active filter, so Load More can request the right subset. */
  filter?: { category?: string; tag?: string };
}

export interface PostViewProps {
  site: SiteInfo;
  post: PostFull;
  prev?: AdjacentPost | null;
  next?: AdjacentPost | null;
  /** Related published posts (same category/tag first). Optional so simpler themes can ignore it. */
  relatedPosts?: PostSummary[];
}

export interface PostCardProps {
  post: PostSummary;
  /**
   * `sizes` for the cover image. Defaults to the two-column archive grid; pass a
   * narrower value where cards render smaller (e.g. the four-column related
   * grid), or the browser downloads an image sized for a much wider slot.
   */
  sizes?: string;
  /**
   * Preload the cover image. Set on the first card or two of a listing — that
   * card is the LCP element, and cards lazy-load by default. Never set it below
   * the fold.
   */
  preload?: boolean;
}

export interface Theme {
  id: string;
  label: string;
  Layout: FC<LayoutProps>;
  ArchiveView: FC<ArchiveViewProps>;
  PostView: FC<PostViewProps>;
  PostCard: FC<PostCardProps>;
}
