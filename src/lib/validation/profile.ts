import { z } from 'zod';
import { socialLinkSchema } from './settings';

// Self-service public author profile (name + bio box on posts).
export const profileSchema = z.object({
  name: z.string().trim().max(120).nullish(),
  title: z.string().trim().max(120).nullish(),
  bio: z.string().trim().max(2000).nullish(),
  avatarMediaId: z.string().nullish(),
  socialLinks: z.array(socialLinkSchema).max(8),
});
