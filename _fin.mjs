import { chromium } from 'playwright';
const pages = [
  ['home','http://localhost:3100/'],
  ['landing','http://localhost:3100/custom-ai-development-services'],
  ['gen-ai','http://localhost:3100/generative-ai-development-company'],
  ['industries','http://localhost:3100/industries'],
  ['php','http://localhost:3100/php-application-development-company'],
  ['services','http://localhost:3100/ai-development-services'],
];
const KEEP = new Set(['indCardName','featName','railName','stackGroupName','(none)']);
const b = await chromium.launch();
for (const [name,url] of pages) {
  for (const w of [1920, 390]) {
    const p = await b.newPage({ viewport:{width:w,height:1000} });
    try {
      await p.goto(url,{waitUntil:'domcontentloaded',timeout:300000});
      await p.waitForSelector('h1,h2',{timeout:120000});
      const r = await p.evaluate(()=>{
        const px=el=>Math.round(parseFloat(getComputedStyle(el).fontSize)*10)/10;
        const cls=el=>(el.className||'').split(' ').map(c=>c.replace(/^.*__/,'')).filter(Boolean)[0]||'(none)';
        const h1=document.querySelector('h1');
        const g=s=>[...document.querySelectorAll(s)].map(e=>({s:px(e),c:cls(e)}));
        return {h1:h1?px(h1):'-',h2:g('h2'),h3:g('h3'),
          ov:document.documentElement.scrollWidth>document.documentElement.clientWidth};
      });
      const want={h2:w===1920?40:26,h3:w===1920?28:22};
      const bad=[...r.h2.filter(x=>Math.abs(x.s-want.h2)>0.6).map(x=>'h2.'+x.c+'='+x.s),
                 ...r.h3.filter(x=>!KEEP.has(x.c)&&Math.abs(x.s-want.h3)>0.6).map(x=>'h3.'+x.c+'='+x.s)];
      console.log(`${name.padEnd(11)}${String(w).padStart(5)}px h1=${String(r.h1).padStart(4)} ov=${r.ov?'YES':'no '} ${bad.length?'OFF: '+[...new Set(bad)].join(' '):'all on scale'}`);
    } catch(e){ console.log(`${name.padEnd(11)}${w}px ERR ${e.message.slice(0,40)}`); }
    await p.close();
  }
}
await b.close();
