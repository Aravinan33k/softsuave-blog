/**
 * An inline script (root layout, first thing in <body>) that makes sure the
 * page's first paint reaches the screen.
 *
 * What it works around (PageSpeed, 15 Oct): with Chrome's paint holding on —
 * the default, and how Lighthouse and PageSpeed run it — a page would paint at
 * ~250 ms and that frame would never be presented. Nothing more reached the
 * screen until the page next repainted something, which on our pages was
 * whichever came first of a ScrollTrigger refresh or the hero's entrance
 * animations ending: 1.3 s or 2.3 s. Chrome then dated the first contentful
 * paint to that second frame, and PageSpeed charged every script and font that
 * had loaded in the meantime to LCP — 10–15 points on mobile on the pages it
 * hit, which were the same ones run after run (the homepage, Generative AI,
 * Healthtech, Hire Software Developers). It affects visitors too: on a full
 * navigation between two of our pages, the old one stays up until that second
 * frame.
 *
 * A repaint is what releases it, so until Chrome reports the first contentful
 * paint (at most 3 s) this repaints the page's H1 every 100 ms — a 50 ms
 * transparent text-shadow animation, which draws nothing. Asking for animation
 * frames does not work; it has to be a paint. Measured on the homepage, which
 * stalled in 3 of 4 runs without it: 0 of 4 with it, first paint at 200–290 ms.
 *
 * It is a Web Animation, not an edit of the H1's `style` attribute: an earlier
 * version wrote that attribute, and a hydration that landed mid-write saw a
 * `style` the server never sent ("a tree hydrated but some attributes of the
 * server rendered HTML didn't match"). An animation leaves the markup alone, so
 * hydration always sees exactly what it rendered. Browsers without paint timing
 * or element.animate skip it.
 */
export const PAINT_NUDGE = `(function(){
if(!window.PerformanceObserver)return;
var done=0,t0=Date.now(),h=null;
try{new PerformanceObserver(function(l){if(l.getEntriesByName("first-contentful-paint").length)done=1}).observe({type:"paint",buffered:true})}catch(e){return}
function tick(){
if(done||Date.now()-t0>3000)return;
if(!h)h=document.querySelector("main h1")||document.querySelector("h1");
if(h&&h.animate)try{h.animate([{textShadow:"0 0 0 transparent"},{textShadow:"0 0 1px transparent"}],{duration:50})}catch(e){return}
setTimeout(tick,100)}
setTimeout(tick,100)})();`;
