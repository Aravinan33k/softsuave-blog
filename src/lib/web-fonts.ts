/**
 * An inline script (root layout, early in <body>) that switches JetBrains Mono
 * — the marketing surface's label face (`lib/home/marketing-fonts`) — on once
 * the page has painted.
 *
 * Until it runs, `--font-mono-label` (`(marketing)/home.css`) and the FDE
 * page's `.font-mono` name next/font's metric-matched fallback face, so the
 * labels paint in that and the mono file is not requested. This script then
 * defines `--wf-jbmono` on `.theme-four`, the labels resolve to JetBrains Mono,
 * and the file loads and swaps in.
 *
 * Why after the paint (PageSpeed, 15 Oct): a font that finishes before the
 * first paint counts towards Lighthouse's LCP estimate. Only the mono is held
 * back because it only sets one-line labels, which change width but do not
 * re-wrap. Holding back Inter and Fraunces as well was tried: the hero copy
 * re-wrapped when they arrived and the section below it jumped (CLS up to 0.2
 * on a phone, 0.16 on a laptop).
 *
 * When: on the first contentful paint (or 2.5 s, if the browser has no paint
 * timing). Once switched on in a session, later pages switch on at once — the
 * file is cached by then.
 */
export const WEB_FONTS = `(function(){
var K="ss-webfonts",D=document;
function on(){if(D.getElementById("ss-webfonts"))return;var s=D.createElement("style");s.id="ss-webfonts";
s.textContent=".theme-four{--wf-jbmono:var(--font-jbmono)}";
D.head.appendChild(s);try{sessionStorage.setItem(K,"1")}catch(e){}}
try{if(sessionStorage.getItem(K)){on();return}}catch(e){}
var t=setTimeout(on,2500);
try{new PerformanceObserver(function(l){if(l.getEntriesByName("first-contentful-paint").length){clearTimeout(t);on()}}).observe({type:"paint",buffered:true})}catch(e){}
})();`;
