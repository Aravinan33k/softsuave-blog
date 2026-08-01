import {
  LayoutDashboard,
  FileText,
  Files,
  FolderTree,
  Tags,
  Image as ImageIcon,
  Users,
  Settings,
  CornerUpRight,
  ShieldCheck,
  Wrench,
  UserCircle,
  type LucideIcon,
} from 'lucide-react';
import type { Role } from '@/lib/auth/tokens';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Section grouping for the sidebar (items keep their declared order). */
  group: string;
  /** If set, only these roles see the item (and the route enforces it too). */
  roles?: Role[];
}

// Single source of truth for the admin nav. ADMIN-only areas (users, redirects,
// settings) are hidden here AND enforced server-side on their pages.
export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, group: 'Overview' },
  { label: 'Posts', href: '/admin/posts', icon: FileText, group: 'Content' },
  { label: 'Pages', href: '/admin/pages', icon: Files, group: 'Content' },
  { label: 'Categories', href: '/admin/categories', icon: FolderTree, group: 'Content' },
  { label: 'Tags', href: '/admin/tags', icon: Tags, group: 'Content' },
  { label: 'Media', href: '/admin/media', icon: ImageIcon, group: 'Content' },
  { label: 'Profile', href: '/admin/profile', icon: UserCircle, group: 'Account' },
  { label: 'Security', href: '/admin/security', icon: ShieldCheck, group: 'Account' },
  { label: 'Users', href: '/admin/users', icon: Users, group: 'System', roles: ['ADMIN'] },
  { label: 'Redirects', href: '/admin/redirects', icon: CornerUpRight, group: 'System', roles: ['ADMIN'] },
  { label: 'Tools', href: '/admin/tools', icon: Wrench, group: 'System', roles: ['ADMIN'] },
  { label: 'Settings', href: '/admin/settings', icon: Settings, group: 'System', roles: ['ADMIN'] },
];

export function visibleNav(role: Role): NavItem[] {
  return NAV_ITEMS.filter((item) => !item.roles || item.roles.includes(role));
}

/** Nav grouped into sections, preserving declared order, for the sidebar. */
export function groupedNav(role: Role): { group: string; items: NavItem[] }[] {
  const out: { group: string; items: NavItem[] }[] = [];
  for (const item of visibleNav(role)) {
    const last = out[out.length - 1];
    if (last && last.group === item.group) last.items.push(item);
    else out.push({ group: item.group, items: [item] });
  }
  return out;
}
