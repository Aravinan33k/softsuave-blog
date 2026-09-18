// The blog banner artwork both heroes sit on — the purple-to-orange gradient the
// live site uses.
//
// It used to load from softsuave.com/blog/wp-content/uploads/…, a path WordPress
// serves. That breaks the moment Nginx points /blog at this app: the path becomes
// ours, we have no wp-content route, and both hero backgrounds 404. It now lives
// on the same Cloudinary account as every other image, so it survives the
// cutover and is CDN-delivered like the rest.
//
// Versioned URL on purpose: immutable, so it caches indefinitely. Replacing the
// artwork means uploading again and updating this constant, which is the visible,
// reviewable way to change it.
//
// Both heroes use it as a raw CSS background and preload it by hand, since a URL
// inside a style attribute is invisible to the browser's preload scanner.
export const BANNER_BG =
  'https://res.cloudinary.com/fovwbbbu/image/upload/v1787294352/brand/blog-bg.png';
