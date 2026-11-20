/* Lab pager: show one topic at a time (like Slide 10–12) instead of one long page */
(function(){
  const C=window.PGR;if(!C)return;
  function init(){
    const root=document.querySelector(C.root),nav=root&&root.querySelector(C.nav);if(!root||!nav)return;
    const links=[...nav.querySelectorAll('a[href^="#"]')];
    const ids=[...new Set(links.map(a=>a.getAttribute('href').slice(1)))].filter(id=>{const s=document.getElementById(id);return s&&root.contains(s)});
    if(ids.length<2)return;
    const secs=ids.map(id=>document.getElementById(id));
    const label=id=>{const a=links.find(x=>x.getAttribute('href')==='#'+id);return a?a.textContent.replace(/\s+/g,' ').trim():id};
    const first=C.first?[...root.querySelectorAll(C.first)]:[];
    const css=document.createElement('style');
    css.textContent=`.pg-off{display:none!important}
.pg-foot{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;max-width:1080px;margin:28px auto 8px;padding:0 20px}
.pg-foot button{all:unset;box-sizing:border-box;cursor:pointer;display:inline-flex;flex-direction:column;gap:2px;min-height:52px;padding:9px 16px;border-radius:14px;border:1.5px solid rgba(0,0,0,.12);background:#fff;color:#1d1b29;font:600 15px/1.3 system-ui,sans-serif;max-width:48%}
.pg-foot button small{font-weight:500;font-size:12px;color:#6b6880}
.pg-foot button.nx{margin-left:auto;text-align:right;align-items:flex-end;border-color:currentColor;color:${C.accent||'#2F62AE'}}
.pg-foot button.nx small{color:inherit;opacity:.75}
.pg-foot button:focus-visible{outline:2px solid ${C.accent||'#2F62AE'};outline-offset:2px}
${C.css||''}`;
    document.head.appendChild(css);
    secs.forEach((s,i)=>{
      const f=document.createElement('div');f.className='pg-foot';
      if(i>0){const b=document.createElement('button');b.type='button';b.innerHTML='<small>← ก่อนหน้า</small>'+esc(label(ids[i-1]));b.onclick=()=>go(i-1,true);f.appendChild(b)}
      if(i<secs.length-1){const b=document.createElement('button');b.type='button';b.className='nx';b.innerHTML='<small>ถัดไป →</small>'+esc(label(ids[i+1]));b.onclick=()=>go(i+1,true);f.appendChild(b)}
      s.appendChild(f);
    });
    const KEY='pgr-'+(C.key||location.pathname);
    let cur=-1;
    function scEl(){return document.scrollingElement||document.documentElement}
    function go(i,top,target){
      i=Math.max(0,Math.min(secs.length-1,i));
      if(i!==cur){
        secs.forEach((s,k)=>s.classList.toggle('pg-off',k!==i));
        first.forEach(e=>e.classList.toggle('pg-off',i!==0));
        links.forEach(a=>{const on=a.getAttribute('href')==='#'+ids[i];a.classList.toggle('on',on);if(on)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});
        cur=i;try{localStorage.setItem(KEY,ids[i])}catch(e){}
        requestAnimationFrame(()=>{window.dispatchEvent(new Event('resize'));});
        const a=links.find(x=>x.getAttribute('href')==='#'+ids[i]);if(a&&a.scrollIntoView)try{a.scrollIntoView({block:'nearest',inline:'center'})}catch(e){}
      }
      if(target||top){
        requestAnimationFrame(()=>{const el=target||secs[i];const navH=nav.getBoundingClientRect().height;const sc=scEl();
          const y=i===0&&!target?0:Math.max(0,el.getBoundingClientRect().top+sc.scrollTop-navH-10);sc.scrollTop=y;});
      }
    }
    document.addEventListener('click',e=>{
      const a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a||!root.contains(a))return;
      const id=a.getAttribute('href').slice(1);if(!id)return;const t=document.getElementById(id);if(!t)return;
      const k=secs.findIndex(s=>s===t||s.contains(t));if(k<0)return;
      e.preventDefault();e.stopImmediatePropagation();
      go(k,true,t===secs[k]?null:t);
    },true);
    let start=0;try{const v=localStorage.getItem(KEY);if(v&&ids.includes(v))start=ids.indexOf(v)}catch(e){}
    go(start,false);
  }
  function esc(t){return String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0));else setTimeout(init,0);
})();
