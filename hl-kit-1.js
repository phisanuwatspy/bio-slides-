/* Keyword highlight + faded slide references for chapter content */
(function(){
  const C=window.HLK||{};const EN=C.en||[],TH=C.th||[];
  const css=document.createElement('style');
  css.textContent=`mark.hk{background:rgba(255,206,58,.42);color:inherit;font-weight:600;padding:0 .16em;border-radius:4px;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.hk-src{font-size:.8em;font-weight:500;opacity:.55;letter-spacing:.01em;white-space:nowrap}
${C.css||""}`;
  document.head.appendChild(css);
  const esc=t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const list=[...EN.map(t=>({t,r:'(?<![A-Za-z0-9])'+esc(t)+'(?![A-Za-z0-9])'})),...TH.map(t=>({t,r:esc(t)}))].sort((a,b)=>b.t.length-a.t.length);
  let KW=null;try{if(list.length)KW=new RegExp(list.map(o=>o.r).join('|'),'gi')}catch(e){KW=null}
  const SR=/(?:ตาม)?(?:กราฟ|ภาพ)?(?:ใน)?สไลด์\s*\d+(?:\s*[–\-,]\s*\d+)*/g;
  const SKIP='script,style,svg,button,nav,h1,h2,h3,h4,mark,input,textarea,select,option,label,code,pre,.xk,.hk-src,.src,[contenteditable],a,footer,.foot,aside,header,[role=tab],.slide'+(C.skip?','+C.skip:'');
  const BLOCK='p,li,td,dd,blockquote,figcaption,summary'+(C.block?','+C.block:'');
  const MAX=C.max||4;const seen=new WeakMap();
  function mark(root){
    if(!root||root.nodeType!==1||root.closest&&root.closest(SKIP))return;
    const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentElement;if(!p||!n.nodeValue.trim())return NodeFilter.FILTER_REJECT;if(p.closest(SKIP))return NodeFilter.FILTER_REJECT;return p.closest(BLOCK)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
    const nodes=[];while(w.nextNode())nodes.push(w.currentNode);
    nodes.forEach(n=>{
      const blk=n.parentElement.closest(BLOCK);
      let set=seen.get(blk);if(!set){set=new Set();seen.set(blk,set)}
      const txt=n.nodeValue;const hits=[];let m;
      SR.lastIndex=0;while((m=SR.exec(txt)))hits.push({i:m.index,j:m.index+m[0].length,s:1});
      if(KW){KW.lastIndex=0;while((m=KW.exec(txt))){const k=m[0].toLowerCase();if(set.has(k)||set.size>=MAX)continue;if(hits.some(h=>m.index<h.j&&m.index+m[0].length>h.i))continue;set.add(k);hits.push({i:m.index,j:m.index+m[0].length,s:0})}}
      if(!hits.length)return;hits.sort((a,b)=>a.i-b.i);
      const f=document.createDocumentFragment();let last=0;
      hits.forEach(h=>{if(h.i<last)return;f.appendChild(document.createTextNode(txt.slice(last,h.i)));const e=document.createElement(h.s?'span':'mark');e.className=h.s?'hk-src':'hk';e.textContent=txt.slice(h.i,h.j);f.appendChild(e);last=h.j});
      f.appendChild(document.createTextNode(txt.slice(last)));n.replaceWith(f);
    });
  }
  function start(){
    const root=document.body;let q=new Set(),t=0;
    const flush=()=>{t=0;mo.disconnect();q.forEach(mark);q.clear();mo.takeRecords();mo.observe(root,{childList:true,subtree:true})};
    const mo=new MutationObserver(recs=>{recs.forEach(r=>r.addedNodes.forEach(n=>{const e=n.nodeType===1?n:n.parentElement;if(e&&e.isConnected)q.add(e)}));if(!t)t=requestAnimationFrame(flush)});
    mark(root);mo.observe(root,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
