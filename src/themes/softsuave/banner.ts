// The blog banner artwork both heroes sit on — the purple-to-orange gradient the
// live site uses. It is served from www.softsuave.com, which is deliberately
// absent from images.remotePatterns, so the optimizer would reject it: both heroes
// use it as a raw CSS background and preload it by hand, since a URL inside a
// style attribute is invisible to the browser's preload scanner. The post hero
// shows it at full vibrancy like the live post pages; the archive hero lays a dark
// wash over it so its own copy and category pills read against something calmer.
export const BANNER_BG = 'https://www.softsuave.com/blog/wp-content/uploads/2026/01/blog-bg.png';
