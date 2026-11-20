import { publicMediaUrl } from '@/lib/media-url';

// The blog banner artwork both heroes sit on — the purple-to-orange gradient the
// live site uses.
//
// It used to load from softsuave.com/blog/wp-content/uploads/…, a path WordPress
// serves, which broke the moment Nginx pointed /blog at this app; then from
// Cloudinary. It is now a file of ours, `public/brand/blog-bg.webp` — the
// 14 KB WebP Cloudinary served for the 171 KB PNG (`f_auto,q_auto`, same
// 740×423). It is the archive's LCP image, and from a second origin it paid a
// DNS, TCP and TLS setup of its own before a byte arrived; PageSpeed put the
// archive's LCP at 7 s on a phone (15 Oct). From our origin it rides the
// connection the page is already using.
//
// Both heroes use it as a raw CSS background and preload it by hand, since a URL
// inside a style attribute is invisible to the browser's preload scanner.
export const BANNER_BG = publicMediaUrl('/brand/blog-bg.webp');
