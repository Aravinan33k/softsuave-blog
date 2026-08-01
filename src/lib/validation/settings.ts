import { z } from 'zod';

export const socialLinkSchema = z.object({
  label: z.string().trim().min(1).max(50),
  url: z.string().trim().url().max(300),
});

export const settingsSchema = z.object({
  siteTitle: z.string().trim().min(1).max(200),
  tagline: z.string().max(300).nullish(),
  siteDescription: z.string().max(500).nullish(),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Must be a hex colour like #2563eb'),
  fontChoice: z.enum(['inter', 'serif', 'mono']),
  activeTheme: z.string().trim().min(1),
  socialLinks: z.array(socialLinkSchema).max(12),
  analyticsSnippet: z.string().max(5000).nullish(),
  logoMediaId: z.string().nullish(),
  faviconMediaId: z.string().nullish(),
});

export type SettingsInput = z.infer<typeof settingsSchema>;
