/* Shared Exam kit for Slide 07–12 · one layout for every chapter
   XK.mount({host, id, title, bank:[{sec,q,o,a,e,s,t,fig,fixed}], accent, hide:[selectors]}) */
(function(){
"use strict";
const CSS=`
.xk{--a:#4A3591;--a2:color-mix(in srgb,var(--a) 10%,#fff);--a3:color-mix(in srgb,var(--a) 22%,#fff);--ink:#1f1b2e;--mut:#5f5a70;--line:#dcd8e4;--bg2:#f3f1f7;--ok:#1c8f61;--oks:#dcf2e7;--ng:#c9343a;--ngs:#fbe0e1;--wa:#b86e00;--was:#fdf0d9;
  max-width:1040px;margin:0 auto;display:grid;gap:18px;color:var(--ink);font-family:inherit;padding-bottom:40px}
.xk *{box-sizing:border-box}
.xk h2,.xk h3{margin:0;line-height:1.25}
.xk p{margin:0}
.xk .xk-eb{font:600 11.5px/1.4 ui-monospace,Menlo,monospace;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
.xk .xk-h{font-size:clamp(19px,2.4vw,22px)!important;line-height:1.25!important;margin-top:2px!important;font-weight:700!important;letter-spacing:0!important;color:var(--ink)!important}
.xk .xk-lede{color:var(--mut);max-width:72ch;margin-top:4px;line-height:1.5;font-size:13.5px}
.xk .xk-head{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px}
.xk .xk-stats{display:flex;flex-wrap:wrap;gap:6px}
.xk .xk-stats div{background:var(--bg2);border-radius:999px;padding:4px 11px;display:inline-flex;align-items:baseline;gap:5px;white-space:nowrap}
.xk .xk-stats b{display:inline;font-size:14.5px;line-height:1.4;font-variant-numeric:tabular-nums}
.xk .xk-stats span{font-size:12.5px;line-height:1.4;color:var(--mut)}
.xk .xk-card{background:#fff;border:1px solid var(--line);border-radius:18px;padding:18px 20px}
.xk .xk-lab{font-weight:600;color:var(--mut);margin:4px 2px -8px;font-size:15px}
.xk .xk-opts{display:grid;gap:12px}
.xk .xk-o3{grid-template-columns:repeat(3,minmax(0,1fr))}
.xk .xk-o2{grid-template-columns:repeat(2,minmax(0,1fr))}
.xk .xk-pick{all:unset;box-sizing:border-box;cursor:pointer;background:#fff;border:1.5px solid var(--line);border-radius:16px;padding:16px 20px;display:grid;gap:4px;align-content:start;transition:border-color .15s,background .15s,transform .12s,box-shadow .2s;min-height:84px}
.xk .xk-pick:hover:not([aria-disabled="true"]){border-color:var(--a)}
.xk .xk-pick:active:not([aria-disabled="true"]){transform:scale(.985)}
.xk .xk-pick:focus-visible{outline:3px solid var(--a);outline-offset:2px}
.xk .xk-pick[aria-pressed="true"]{border:2.5px solid var(--a);background:var(--a2);padding:15px 19px}
.xk .xk-pick[aria-disabled="true"]{opacity:.45;cursor:not-allowed}
.xk .xk-pick b{font-size:19px!important;line-height:1.25!important;font-weight:700!important;color:var(--ink)!important}
.xk .xk-pick span{color:var(--mut)!important;font-size:14.5px!important;line-height:1.45!important}
.xk .xk-pick .xk-ic{font-size:24px;line-height:1}
.xk .xk-sum{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}
.xk .xk-sum b{font-size:19px}
.xk .xk-sum span{display:block;color:var(--mut);font-size:14px;margin-top:2px}
.xk .xk-btn,.xk-dlg .xk-btn{all:unset;box-sizing:border-box;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;font-weight:600;font-size:15px;line-height:1.2;border-radius:12px;border:1.5px solid var(--line);background:#fff;color:var(--ink);padding:11px 16px;min-height:44px;text-align:center;transition:transform .12s,filter .15s,border-color .15s}
.xk .xk-btn:hover{border-color:var(--a)}
.xk .xk-btn:active{transform:scale(.96)}
.xk .xk-btn:focus-visible{outline:3px solid var(--a);outline-offset:2px}
.xk .xk-btn.xk-pri{background:var(--a);border-color:var(--a);color:#fff!important}
.xk .xk-btn.xk-pri:hover{filter:brightness(1.1)}
.xk .xk-btn.xk-lg{padding:14px 26px;font-size:17px;border-radius:14px}
.xk .xk-btn.xk-dan{color:var(--ng);border-color:#efc3c5}
.xk .xk-btn.xk-dan:hover{border-color:var(--ng);background:var(--ngs)}
.xk .xk-btn[disabled]{opacity:.45;cursor:not-allowed}
.xk .xk-row{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.xk .xk-ty{display:inline-block;font-size:12px;font-weight:600;line-height:1.6;border-radius:999px;padding:0 9px;vertical-align:1px;white-space:nowrap}
.xk .ty-rec{background:var(--bg2);color:var(--mut)}.xk .ty-ana{background:#e3edfb;color:#2a5aa8}.xk .ty-app{background:#e2f4ea;color:#1c7a4f}.xk .ty-mix{background:var(--a2);color:var(--a)}
.xk .xk-resume{border-color:var(--wa);background:var(--was)}
.xk .xk-bar{position:sticky;top:calc(env(safe-area-inset-top,0px) + 8px);z-index:30;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:10px 14px;border-radius:16px;background:#fff;border:1px solid var(--line);box-shadow:0 8px 22px -16px rgba(0,0,0,.45)}
.xk .xk-time{font:700 20px/1 ui-monospace,Menlo,monospace;font-variant-numeric:tabular-nums}
.xk .xk-time.xk-low{color:var(--ng)}
.xk .xk-prog{font:600 13px ui-monospace,Menlo,monospace;color:var(--mut)}
.xk .xk-grid{display:grid;grid-template-columns:minmax(0,1fr) 250px;gap:16px;align-items:start}
.xk .xk-pal{position:sticky;top:calc(env(safe-area-inset-top,0px) + 88px)}
.xk .xk-map{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;margin-top:8px}
.xk .xk-qm{all:unset;box-sizing:border-box;position:relative;cursor:pointer;border:1.5px solid var(--line);background:#fff;border-radius:9px;padding:7px 0;font:600 13px/1 ui-monospace,Menlo,monospace;text-align:center}
.xk .xk-qm.xk-ans{background:var(--a2);border-color:var(--a)}
.xk .xk-qm.xk-cur{outline:2.5px solid var(--a);outline-offset:1px}
.xk .xk-qm.xk-ok{background:var(--oks);border-color:var(--ok)}.xk .xk-qm.xk-ng{background:var(--ngs);border-color:var(--ng)}
.xk .xk-qm.xk-flag::after{content:"";position:absolute;top:3px;right:3px;width:7px;height:7px;border-radius:50%;background:var(--wa)}
.xk .xk-meta{font:600 13px/1.5 ui-monospace,Menlo,monospace;color:var(--mut)}
.xk .xk-q{font-size:19px;font-weight:600;line-height:1.55;margin:8px 0 14px;white-space:pre-line}
.xk .xk-fig{background:var(--bg2);border-radius:14px;padding:10px;margin:6px 0 10px;overflow:auto}
.xk .xk-fig svg{max-width:100%;height:auto;max-height:280px;display:block;margin:0 auto}
.xk .xk-fig button{display:none!important}
.xk .xk-ch{display:grid;gap:8px}
.xk .xk-c{all:unset;box-sizing:border-box;cursor:pointer;display:grid;grid-template-columns:30px minmax(0,1fr);gap:10px;align-items:start;border:1.5px solid var(--line);background:#fff;border-radius:12px;padding:12px 14px;font-size:15.5px;line-height:1.5;transition:border-color .15s,background .15s}
.xk .xk-c:hover:not([aria-disabled="true"]){border-color:var(--a)}
.xk .xk-c:focus-visible{outline:3px solid var(--a);outline-offset:2px}
.xk .xk-c .xk-L{font:700 14px/1.5 ui-monospace,Menlo,monospace;color:var(--mut)}
.xk .xk-c.xk-sel{border-color:var(--a);background:var(--a2)}
.xk .xk-c.xk-ok{border-color:var(--ok);background:var(--oks);animation:xkpop .45s}
.xk .xk-c.xk-ng{border-color:var(--ng);background:var(--ngs);animation:xkshake .45s}
.xk .xk-c.xk-miss{border-color:var(--ok);border-style:dashed}
.xk .xk-c[aria-disabled="true"]{cursor:default}
.xk .xk-fb{border-radius:12px;padding:10px 14px;font-size:15px;line-height:1.6;margin-top:10px}
.xk .xk-fb.xk-ok{background:var(--oks)}.xk .xk-fb.xk-ng{background:var(--ngs)}
.xk mark.xk-hl{background:rgba(255,212,59,.45);color:inherit;padding:0 .18em;border-radius:4px;box-decoration-break:clone;-webkit-box-decoration-break:clone;font-weight:600}
.xk .xk-sref{font-size:.82em;color:#8a8697}
.xk .xk-src{display:block;margin-top:6px;font:500 12px/1.45 system-ui,sans-serif;color:#8f8b9c;letter-spacing:.01em}
.xk .xk-why{font-size:14.5px;background:var(--bg2);border-radius:10px;padding:9px 12px;line-height:1.6}
.xk .xk-big{font-size:clamp(42px,9vw,58px);font-weight:700;line-height:1;font-variant-numeric:tabular-nums}
.xk .xk-chrow{display:grid;grid-template-columns:minmax(110px,38%) 1fr 54px;gap:10px;align-items:center;font-size:14px}
.xk .xk-chrow i{display:block;height:8px;border-radius:4px;background:var(--a)}
.xk .xk-chrow .xk-bar2{height:8px;background:var(--bg2);border-radius:4px;overflow:hidden}
.xk .xk-chrow span:last-child{font:600 13px ui-monospace,Menlo,monospace;text-align:right}
.xk .xk-rv{display:grid;gap:10px}
.xk .xk-rv details{border:1px solid var(--line);border-radius:14px;background:#fff}
.xk .xk-rv summary{display:grid;grid-template-columns:34px minmax(0,1fr);gap:10px;align-items:start;padding:12px 14px;cursor:pointer;list-style:none;font-size:15px;line-height:1.5}
.xk .xk-rv summary::-webkit-details-marker{display:none}
.xk .xk-mk{font:700 13px/1.6 ui-monospace,Menlo,monospace;text-align:center;border-radius:7px}
.xk .xk-mk.xk-ok{background:var(--oks);color:var(--ok)}.xk .xk-mk.xk-ng{background:var(--ngs);color:var(--ng)}.xk .xk-mk.xk-na{background:var(--was);color:var(--wa)}
.xk .xk-rvb{padding:0 14px 14px;display:grid;gap:6px}
.xk .xk-seg{display:inline-flex;gap:3px;padding:3px;border-radius:12px;background:var(--bg2);border:1px solid var(--line);flex-wrap:wrap}
.xk .xk-seg button{all:unset;cursor:pointer;border-radius:9px;padding:8px 12px;font-weight:600;font-size:14px;color:var(--mut)}
.xk .xk-seg button[aria-pressed="true"]{background:#fff;color:var(--a);box-shadow:0 1px 3px rgba(0,0,0,.12)}
.xk-dlg{position:fixed;inset:0;z-index:9999;background:rgba(20,14,35,.45);display:grid;place-items:center;padding:20px}
.xk-dlg .xk-card{max-width:440px;width:100%;display:grid;gap:12px;box-shadow:0 20px 50px -20px rgba(0,0,0,.5);animation:xkin .3s both}
.xk-dlg h3{font-size:19px}
.xk-dlg p{color:#5f5a70;line-height:1.6}
.xk .xk-in{animation:xkin .4s cubic-bezier(.2,.7,.2,1) both}
@keyframes xkin{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes xkpop{0%{transform:scale(1)}40%{transform:scale(1.03)}100%{transform:scale(1)}}
@keyframes xkshake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}50%{transform:translateX(6px)}75%{transform:translateX(-3px)}}
html.calm .xk *,html.calm .xk-dlg *{animation:none!important;transition:none!important}
.xk-host>:not(.xk):not(.xk-keep){display:none!important}
.xk-host{transform:none!important;filter:none!important;will-change:auto!important;animation:none!important}
.xk .xk-nav,.xk .xk-scrim,.xk .xk-palx,.xk .xk-tx-s,.xk .xk-mprog{display:none}
.xk .xk-pbar{height:4px;border-radius:2px;background:var(--bg2);overflow:hidden;flex-basis:100%;order:9}
.xk .xk-pbar i{display:block;height:100%;width:0;background:var(--a);transition:width .25s}
.xk .xk-gostick{display:none}
.xk.xk-setup{padding-top:12px}
@media (max-width:860px){
  .xk.xk-running{padding-bottom:calc(88px + env(safe-area-inset-bottom,0px))}
  .xk .xk-nav{display:grid;grid-template-columns:1fr auto 1fr;gap:8px;position:fixed;left:0;right:0;bottom:0;z-index:40;padding:10px max(12px,env(safe-area-inset-left)) calc(10px + env(safe-area-inset-bottom,0px));background:rgba(255,255,255,.96);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border-top:1px solid var(--line);box-shadow:0 -8px 20px -16px rgba(0,0,0,.4)}
  .xk .xk-nav .xk-btn{min-height:50px;font-size:16px;border-radius:14px}
  .xk .xk-nav #xkMapBtn{font:700 15px/1 ui-monospace,Menlo,monospace;min-width:96px;background:var(--bg2)}
  .xk .xk-qnav{display:none!important}
  .xk .xk-pal{position:fixed!important;left:0;right:0;bottom:0;top:auto!important;z-index:60;transform:translateY(105%);transition:transform .28s cubic-bezier(.2,.7,.2,1);max-height:72vh;overflow:auto;padding:0}
  .xk .xk-pal.xk-open{transform:none}
  .xk .xk-pal>.xk-card{border-radius:20px 20px 0 0;padding:16px max(16px,env(safe-area-inset-left)) calc(18px + env(safe-area-inset-bottom,0px));box-shadow:0 -12px 30px -12px rgba(0,0,0,.35)}
  .xk .xk-palx{display:inline-flex;min-height:38px;padding:6px 14px;float:right;margin:-6px -4px 0 8px}
  .xk .xk-map{grid-template-columns:repeat(auto-fill,minmax(46px,1fr));gap:8px;clear:both;margin-top:12px}
  .xk .xk-qm{padding:13px 0;font-size:15px;border-radius:11px}
  .xk .xk-scrim{position:fixed;inset:0;z-index:55;background:rgba(20,14,35,.38)}
  .xk .xk-scrim.xk-open{display:block}
  .xk .xk-gostick{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:40;align-items:center;gap:12px;padding:10px max(14px,env(safe-area-inset-left)) calc(10px + env(safe-area-inset-bottom,0px));background:rgba(255,255,255,.96);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border-top:1px solid var(--line);box-shadow:0 -8px 20px -16px rgba(0,0,0,.4)}
  .xk .xk-gostick div{flex:1;min-width:0;font-size:15px;line-height:1.35;font-weight:600}
  .xk .xk-gostick div span{display:block;font-weight:500;color:var(--mut);font-size:13px}
  .xk .xk-gostick .xk-btn{min-height:50px;font-size:17px;padding:10px 20px;border-radius:14px;flex:none}
  .xk.xk-setup{padding-bottom:calc(96px + env(safe-area-inset-bottom,0px))}
  .xk.xk-setup .xk-sum:not(.xk-resume){display:none}
}
@media (max-width:640px){
  .xk{gap:12px;padding-left:max(12px,env(safe-area-inset-left));padding-right:max(12px,env(safe-area-inset-right))}
  .xk .xk-h{font-size:19px!important}
  .xk .xk-lede{display:none}
  .xk .xk-stats div{padding:3px 9px}
  .xk .xk-stats b{font-size:13.5px}.xk .xk-stats span{font-size:12px}
  .xk .xk-lab{font-size:14px;margin:2px 2px -4px}
  .xk .xk-opts{gap:8px}
  .xk #xkT .xk-pick{grid-template-columns:30px 1fr;column-gap:10px;row-gap:2px;padding:11px 14px;min-height:0}
  .xk #xkT .xk-pick[aria-pressed="true"]{padding:10px 13px}
  .xk #xkT .xk-pick .xk-ic{grid-row:span 2;align-self:center;font-size:24px}
  .xk #xkT .xk-pick b{font-size:17px!important}
  .xk #xkT .xk-pick span:not(.xk-ic){font-size:13px!important}
  .xk #xkN{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  .xk #xkM{grid-template-columns:repeat(2,minmax(0,1fr))!important}
  .xk #xkN .xk-pick,.xk #xkM .xk-pick{padding:10px 8px;min-height:0;text-align:center;justify-items:center}
  .xk #xkN .xk-pick[aria-pressed="true"],.xk #xkM .xk-pick[aria-pressed="true"]{padding:9px 7px}
  .xk #xkN .xk-pick b,.xk #xkM .xk-pick b{font-size:17px!important}
  .xk #xkN .xk-pick span,.xk #xkM .xk-pick span{font-size:11.5px!important;line-height:1.35!important}
  .xk .xk-bar{gap:8px;padding:8px 10px;border-radius:0 0 14px 14px;border-top:0;top:0}
  .xk .xk-bar>.xk-row:first-child{display:none}
  .xk .xk-bar>.xk-row:last-child{display:flex!important;flex-wrap:nowrap;width:100%;gap:6px}
  .xk .xk-bar .xk-btn{padding:8px 10px!important;min-height:42px;font-size:15px}
  .xk .xk-bar .xk-time{order:2;margin:0 auto 0 4px;font-size:18px}
  .xk .xk-bar .xk-mprog{display:block;order:2;margin:0 auto 0 4px;font:700 15px ui-monospace,Menlo,monospace;color:var(--mut)}
  .xk .xk-bar .xk-time~.xk-mprog{display:none}
  .xk .xk-bar #xkCancel{order:1}.xk .xk-bar #xkFlag{order:3}.xk .xk-bar #xkSend{order:4;min-width:68px}
  .xk .xk-tx-l{display:none}.xk .xk-tx-s{display:inline}
  .xk .xk-card{padding:14px 14px;border-radius:16px}
  .xk .xk-q{font-size:17.5px;margin:6px 0 12px}
  .xk .xk-c{padding:12px 12px;grid-template-columns:24px minmax(0,1fr);gap:8px;font-size:15.5px;min-height:52px;align-items:center}
}
@media (max-width:860px){.xk .xk-grid{grid-template-columns:1fr}.xk .xk-pal{position:static}.xk .xk-map{grid-template-columns:repeat(10,1fr)}}
@media (max-width:600px){
  .xk .xk-o3,.xk .xk-o2{grid-template-columns:1fr}.xk .xk-pick{min-height:0;padding:13px 16px}.xk .xk-pick[aria-pressed="true"]{padding:12px 15px}.xk .xk-pick b{font-size:19px}
  .xk .xk-map{grid-template-columns:repeat(8,1fr)}
  .xk .xk-sum .xk-btn{width:100%}
}
@media (max-width:640px){
  .xk{gap:9px!important}
  .xk.xk-setup{padding-top:8px;padding-bottom:calc(72px + env(safe-area-inset-bottom,0px))}
  .xk.xk-setup .xk-hist{display:none}
  .xk .xk-h{font-size:17px!important}
  .xk .xk-head{gap:6px 10px}
  .xk .xk-stats{gap:5px}.xk .xk-stats div{padding:2px 8px}.xk .xk-stats b{font-size:12.5px}.xk .xk-stats span{font-size:11.5px}
  .xk .xk-lab{font-size:12.5px;margin:0 2px -4px}
  .xk .xk-opts{gap:6px}
  .xk #xkT{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  .xk #xkT .xk-pick,.xk #xkT .xk-pick[aria-pressed="true"]{grid-template-columns:1fr!important;justify-items:center;text-align:center;padding:9px 5px!important;row-gap:2px}
  .xk #xkT .xk-pick .xk-ic{grid-row:auto!important;font-size:19px}
  .xk #xkT .xk-pick b{font-size:13.5px!important;line-height:1.3!important}
  .xk #xkT .xk-pick span:not(.xk-ic){font-size:11px!important;line-height:1.3!important}
  .xk #xkN .xk-pick,.xk #xkM .xk-pick,.xk #xkN .xk-pick[aria-pressed="true"],.xk #xkM .xk-pick[aria-pressed="true"]{padding:8px 5px!important}
  .xk #xkN .xk-pick b,.xk #xkM .xk-pick b{font-size:15px!important}
  .xk #xkN .xk-pick span,.xk #xkM .xk-pick span{font-size:11px!important}
  .xk .xk-gostick{padding-top:8px;padding-bottom:calc(8px + env(safe-area-inset-bottom,0px))}
  .xk .xk-gostick .xk-btn{min-height:44px;font-size:16px}
  .xk .xk-gostick div{font-size:14px}
  .xk.xk-running{padding-bottom:calc(66px + env(safe-area-inset-bottom,0px))}
  .xk .xk-bar{padding:6px 8px}
  .xk .xk-bar .xk-btn{min-height:38px;padding:6px 9px!important;font-size:14px}
  .xk .xk-card{padding:12px}
  .xk .xk-q{font-size:16px;margin:4px 0 10px;line-height:1.5}
  .xk .xk-c{min-height:44px;padding:9px 11px;font-size:14.5px}
  .xk .xk-opts2,.xk #xkQ .xk-opts{gap:6px}
  .xk .xk-nav{padding-top:7px;padding-bottom:calc(7px + env(safe-area-inset-bottom,0px))}
  .xk .xk-nav .xk-btn{min-height:44px;font-size:15px}
  .xk .xk-why,.xk .xk-fb{font-size:14px}
}
`;
const TY={rec:"ความจำ",ana:"วิเคราะห์",app:"ประยุกต์",mix:"ผสม"};
const LET=["ก","ข","ค","ง","จ","ฉ"];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const fmt=s=>{s=Math.max(0,Math.ceil(s));return `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const st={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch(e){return d;}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};
const tyOf=q=>q.t||"rec";
const isMulti=q=>Array.isArray(q.a);
const SRC=q=>q.s?`<span class="xk-src">ที่มา: Slide ${esc(String(XK._ch||""))} · ${esc(q.s)}${q.sr?` (ทั้งหัวข้อ ${esc(q.sec)})`:""}</span>`:"";
const same=(x,y)=>Array.isArray(x)&&Array.isArray(y)?x.length===y.length&&x.every(v=>y.includes(v)):x===y;
function injectCSS(){if(document.getElementById("xk-css"))return;const s=document.createElement("style");s.id="xk-css";s.textContent=CSS;document.head.appendChild(s);}

function mount(opt){
  injectCSS();
  const host=typeof opt.host==="string"?document.querySelector(opt.host):opt.host;
  if(!host)return;
  XK._ch=String(opt.id||"").replace(/^s/,"");const B=opt.bank,K="xk-"+opt.id+"-",SEC=[...new Set(B.map(q=>q.sec))];
  const root=document.createElement("div");root.className="xk";if(opt.accent)root.style.setProperty("--a",opt.accent);
  host.classList.add("xk-host");host.appendChild(root);
  new MutationObserver(()=>{if(root.parentNode!==host)host.appendChild(root);}).observe(host,{childList:true});
  let E=null,tick=null,cfg=Object.assign({type:"mix",n:30,mode:"real"},st.get(K+"cfg",{}));
  const $=s=>root.querySelector(s),$$=s=>[...root.querySelectorAll(s)];
  const per=t=>t==="mix"||t==="rec"?60:90;
  const poolOf=t=>B.map((q,i)=>i).filter(i=>t==="mix"||tyOf(B[i])===t);
  const cnt=t=>B.filter(q=>tyOf(q)===t).length;
  const hidden=[];
  function lock(on){
    document.body.classList.toggle("xk-lock",on);
    if(on){(opt.hide||[]).forEach(sel=>document.querySelectorAll(sel).forEach(el=>{if(!hidden.some(h=>h.el===el)){hidden.push({el,d:el.style.display});el.style.display="none";}}));}
    else{hidden.splice(0).forEach(h=>h.el.style.display=h.d);}
    if(opt.onLock)opt.onLock(on);
  }
  function top(){const r=root.getBoundingClientRect();if(r.top<0||r.top>innerHeight)window.scrollTo({top:Math.max(0,scrollY+r.top-16)});}
  function dialog(t,b,acts){
    const d=document.createElement("div");d.className="xk-dlg";d.innerHTML=`<div class="xk-card" role="dialog" aria-modal="true"><h3>${esc(t)}</h3><p>${esc(b)}</p><div class="xk-row">${acts.map((a,i)=>`<button type="button" class="xk-btn ${a.cls||""}" data-i="${i}">${esc(a.l)}</button>`).join("")}</div></div>`;
    d.style.setProperty("--a",opt.accent||"#4A3591");
    d.addEventListener("click",e=>{const x=e.target.closest("[data-i]");if(!x)return;d.remove();const f=acts[+x.dataset.i].f;f&&f();});
    (document.querySelector(".xk-dlg-root")||document.body).appendChild(d);
    // style buttons inside dialog using kit look
    d.classList.add("xk");d.style.maxWidth="none";d.style.margin="0";d.style.padding="20px";
    setTimeout(()=>{const p=d.querySelector(".xk-btn");if(p)p.focus();},30);
  }

  /* ---------------- setup ---------------- */
  function setup(){
    lock(false);root.classList.add("xk-setup");root.classList.remove("xk-running");
    const hist=st.get(K+"hist",[]),best=hist.length?Math.max(...hist.map(h=>h.p)):null;
    const saved=st.get(K+"run",null),resumable=saved&&!saved.done&&(!saved.end||saved.end>Date.now());
    const pool=poolOf(cfg.type).length;
    if(cfg.n!==0&&cfg.n>pool)cfg.n=0;
    const n=cfg.n?Math.min(cfg.n,pool):pool,mins=Math.round(n*per(cfg.type)/60);
    root.innerHTML=`<div class="xk-in xk-head"><h2 class="xk-h">ข้อสอบ ${esc(opt.title)}</h2><div class="xk-stats"><div><b>${B.length}</b><span>ข้อ</span></div><div><span>สูงสุด</span><b>${best==null?"–":best+"%"}</b></div><div><span>ทำแล้ว</span><b>${hist.length}</b><span>ครั้ง</span></div></div></div>
    ${resumable?`<div class="xk-card xk-resume xk-sum"><div><b>มีข้อสอบที่ทำค้างไว้</b><span>${saved.qs.length} ข้อ · ${TY[saved.cfg.type]} · ตอบแล้ว ${Object.keys(saved.ans).length} ข้อ</span></div><div class="xk-row"><button type="button" class="xk-btn" id="xkDrop">ทิ้งชุดนี้</button><button type="button" class="xk-btn xk-pri" id="xkResume">ทำต่อ →</button></div></div>`:""}
    <p class="xk-lab">ประเภทข้อสอบ</p>
    <div class="xk-opts xk-o3" id="xkT">
      <button type="button" class="xk-pick" data-t="mix" aria-pressed="${cfg.type==="mix"}"><span class="xk-ic">🎲</span><b>สุ่มข้อสอบชุดใหม่</b><span>ผสมทุกแบบ · ${B.length} ข้อ</span></button>
      <button type="button" class="xk-pick" data-t="ana" aria-pressed="${cfg.type==="ana"}" ${cnt("ana")?"":'aria-disabled="true"'}><span class="xk-ic">🔍</span><b>ข้อสอบวิเคราะห์</b><span>คำนวณ ตีความ · ${cnt("ana")} ข้อ</span></button>
      <button type="button" class="xk-pick" data-t="app" aria-pressed="${cfg.type==="app"}" ${cnt("app")?"":'aria-disabled="true"'}><span class="xk-ic">💊</span><b>ข้อสอบประยุกต์</b><span>สถานการณ์จริง ยา · ${cnt("app")} ข้อ</span></button>
    </div>
    <p class="xk-lab">จำนวนข้อ</p>
    <div class="xk-opts xk-o3" id="xkN">
      ${[[15,"15 ข้อ","ราว "+Math.round(15*per(cfg.type)/60)+" นาที"],[30,"30 ข้อ","ราว "+Math.round(30*per(cfg.type)/60)+" นาที"],[0,"ชุดเต็ม",`${pool} ข้อ`]].map(([v,b,s])=>{const dis=v&&v>=pool;return `<button type="button" class="xk-pick" data-n="${v}" aria-pressed="${cfg.n===v}" ${dis?'aria-disabled="true"':""}><b>${b}</b><span>${dis?`มี ${pool} ข้อ`:s}</span></button>`;}).join("")}
    </div>
    <p class="xk-lab">โหมด</p>
    <div class="xk-opts xk-o2" id="xkM">
      <button type="button" class="xk-pick" data-m="real" aria-pressed="${cfg.mode==="real"}"><b>สอบจริง</b><span>จับเวลา · เฉลยหลังส่ง</span></button>
      <button type="button" class="xk-pick" data-m="prac" aria-pressed="${cfg.mode==="prac"}"><b>ฝึกทำ</b><span>เฉลยทันที</span></button>
    </div>
    <div class="xk-card xk-sum"><div><b>${n} ข้อ · ${TY[cfg.type]==="ผสม"?"ผสมทุกแบบ":TY[cfg.type]} · ${cfg.mode==="real"?"สอบจริง · "+mins+" นาที":"ฝึกทำ · ไม่จับเวลา"}</b></div><button type="button" class="xk-btn xk-pri xk-lg" id="xkGo">เริ่มสอบ →</button></div>
    <div class="xk-gostick"><div>${n} ข้อ · ${TY[cfg.type]==="ผสม"?"ผสมทุกแบบ":TY[cfg.type]}<span>${cfg.mode==="real"?"สอบจริง · "+mins+" นาที":"ฝึกทำ · ไม่จับเวลา"}</span></div><button type="button" class="xk-btn xk-pri" id="xkGo2">เริ่มสอบ →</button></div>
    ${hist.length?`<div class="xk-card xk-hist" style="display:grid;gap:8px"><b>ประวัติการสอบ</b>${hist.slice(0,5).map(h=>`<div class="xk-chrow"><span>${esc(h.d)} · ${esc(h.ty)}${h.m==="prac"?" · ฝึก":""}</span><span class="xk-bar2"><i style="width:${h.p}%"></i></span><span>${h.s}/${h.n}</span></div>`).join("")}</div>`:""}`;
    const pick=(id,key,attr,num)=>$(id).addEventListener("click",e=>{const b=e.target.closest(`[data-${attr}]`);if(!b||b.getAttribute("aria-disabled")==="true")return;cfg[key]=num?+b.dataset[attr]:b.dataset[attr];if(key==="type"){const p=poolOf(cfg.type).length;if(cfg.n&&cfg.n>=p)cfg.n=0;}st.set(K+"cfg",cfg);const sc=scEl(),y=sc.scrollTop;setup();sc.scrollTop=y;});
    pick("#xkT","type","t",false);pick("#xkN","n","n",true);pick("#xkM","mode","m",false);
    $("#xkGo").onclick=$("#xkGo2").onclick=()=>start(Object.assign({},cfg));
    if(resumable){$("#xkResume").onclick=()=>{E=saved;run();};$("#xkDrop").onclick=()=>{if(saved.seenBefore)st.set(K+"seen",saved.seenBefore);st.set(K+"run",null);setup();};}
  }

  /* ---------------- start / run ---------------- */
  function start(c){
    const all=poolOf(c.type);if(!all.length)return setup();
    const n=c.n?Math.min(c.n,all.length):all.length;
    const seen=st.get(K+"seen",[]);
    const unseen=shuffle(all.filter(i=>!seen.includes(i)));
    const old=all.filter(i=>seen.includes(i)).sort((x,y)=>seen.indexOf(y)-seen.indexOf(x));
    const pick=shuffle(unseen.concat(old).slice(0,n));
    st.set(K+"seen",pick.concat(seen.filter(i=>!pick.includes(i))).slice(0,B.length));
    E={qs:pick.map(i=>{const q=B[i],k=q.o.map((_,j)=>j);return {i,ord:q.fixed?k:shuffle(k)};}),ans:{},chk:{},flag:{},cur:0,
       end:c.mode==="real"?Date.now()+pick.length*per(c.type)*1000:0,done:false,cfg:c,seenBefore:seen};
    save();run();
  }
  function save(){st.set(K+"run",E);}
  function run(){
    lock(true);
    const c=E.cfg;
    root.innerHTML=`<div class="xk-bar"><div class="xk-row"><b>Exam · ${esc(opt.title)}</b><span class="xk-ty ty-${c.type}">${TY[c.type]==="ผสม"?"ผสมทุกแบบ":TY[c.type]}</span><span class="xk-ty ty-rec">${c.mode==="real"?"สอบจริง":"ฝึกทำ"}</span><span class="xk-prog" id="xkProg"></span></div>
      <div class="xk-row">${E.end?`<span class="xk-time" id="xkTime">⏱ ${fmt((E.end-Date.now())/1000)}</span>`:""}<span class="xk-mprog" id="xkMProg"></span><button type="button" class="xk-btn xk-dan" id="xkCancel" aria-label="ยกเลิกสอบ"><span class="xk-tx-l">ยกเลิกสอบ</span><span class="xk-tx-s">✕ ยกเลิก</span></button><button type="button" class="xk-btn" id="xkFlag"></button><button type="button" class="xk-btn xk-pri" id="xkSend"><span class="xk-tx-l">${c.mode==="real"?"ส่งคำตอบ":"จบการฝึก"}</span><span class="xk-tx-s">${c.mode==="real"?"ส่ง":"จบ"}</span></button></div><div class="xk-pbar"><i id="xkPB"></i></div></div>
      <div class="xk-grid"><div class="xk-card" id="xkQ"></div><div class="xk-scrim" id="xkScrim"></div><div class="xk-pal" id="xkPal"><div class="xk-card"><button type="button" class="xk-btn xk-palx" id="xkPalX">ปิด</button><b style="font-size:14px">แผนที่ข้อสอบ</b><div class="xk-map" id="xkMap"></div><p style="font-size:12.5px;color:var(--mut);margin-top:8px;line-height:1.5">สีเข้ม = ตอบแล้ว · จุดส้ม = ธง</p></div></div></div>
      <div class="xk-nav"><button type="button" class="xk-btn" id="xkNP">← ก่อน</button><button type="button" class="xk-btn" id="xkMapBtn" aria-label="เปิดแผนที่ข้อสอบ"></button><button type="button" class="xk-btn" id="xkNX">ถัดไป →</button></div>`;
    root.classList.add("xk-running");root.classList.remove("xk-setup");
    const pal=$("#xkPal"),scrim=$("#xkScrim"),sheet=on=>{pal.classList.toggle("xk-open",on);scrim.classList.toggle("xk-open",on);};
    $("#xkMapBtn").onclick=()=>sheet(!pal.classList.contains("xk-open"));scrim.onclick=$("#xkPalX").onclick=()=>sheet(false);
    $("#xkNP").onclick=()=>go(-1);$("#xkNX").onclick=()=>go(1);
    let sx=0,sy=0,st0=0;
    $("#xkQ").addEventListener("touchstart",e=>{const t=e.touches[0];sx=t.clientX;sy=t.clientY;st0=Date.now();},{passive:true});
    $("#xkQ").addEventListener("touchend",e=>{const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Date.now()-st0<700&&Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.8){if(e.target.closest(".xk-fig"))return;go(dx<0?1:-1);}},{passive:true});
    $("#xkFlag").onclick=()=>{E.flag[E.cur]=!E.flag[E.cur];save();paint();};
    $("#xkSend").onclick=confirmSend;$("#xkCancel").onclick=confirmCancel;
    $("#xkMap").onclick=e=>{const b=e.target.closest("[data-q]");if(b){E.cur=+b.dataset.q;save();paint();$("#xkPal").classList.remove("xk-open");$("#xkScrim").classList.remove("xk-open");toQ();}};
    clearInterval(tick);
    if(E.end)tick=setInterval(()=>{const t=$("#xkTime");if(!t){clearInterval(tick);return;}const left=(E.end-Date.now())/1000;t.textContent="⏱ "+fmt(left);t.classList.toggle("xk-low",left<60);if(left<=0){clearInterval(tick);finish(true);}},500);
    paint();{const r=root.getBoundingClientRect(),sc=scEl();sc.scrollBy({top:r.top-8});}
  }
  function scEl(){let e=root.parentElement;while(e&&e!==document.body&&e!==document.documentElement){const o=getComputedStyle(e).overflowY;if((o==="auto"||o==="scroll"||o==="overlay")&&e.scrollHeight>e.clientHeight+2)return e;e=e.parentElement;}return document.scrollingElement||document.documentElement;}
  function scBy(dy){if(Math.abs(dy)<2)return;scEl().scrollBy({top:dy,behavior:document.documentElement.classList.contains("calm")?"auto":"smooth"});}
  function toQ(){const q=$("#xkQ"),bar=$(".xk-bar");if(!q)return;const off=(bar?bar.getBoundingClientRect().height:0)+22,r=q.getBoundingClientRect();if(r.top<off||r.top>innerHeight*.5)scBy(r.top-off);}
  function go(d){const k=E.cur+d;if(k<0||k>=E.qs.length)return;E.cur=k;save();paint();toQ();}
  function answered(k){const a=E.ans[k];return a!=null&&(!Array.isArray(a)||a.length>0);}
  function paint(){
    const it=E.qs[E.cur],q=B[it.i],n=E.qs.length,prac=E.cfg.mode==="prac",multi=isMulti(q);
    const done=prac&&E.chk[E.cur];
    $("#xkProg").textContent=`ตอบแล้ว ${E.qs.filter((_,k)=>answered(k)).length}/${n}`;
    $("#xkFlag").innerHTML=E.flag[E.cur]?'<span class="xk-tx-l">เอาธงออก</span><span class="xk-tx-s">⚑ ออก</span>':'<span class="xk-tx-l">ปักธง</span><span class="xk-tx-s">⚑ ธง</span>';
    {const na=E.qs.filter((_,k)=>answered(k)).length;$("#xkPB").style.width=(na/n*100)+"%";$("#xkMProg").textContent=`${na}/${n}`;
     $("#xkMapBtn").textContent=`▦ ${E.cur+1}/${n}`;$("#xkNP").disabled=E.cur===0;$("#xkNX").disabled=E.cur===n-1;$("#xkNX").classList.toggle("xk-pri",!!(prac&&E.chk[E.cur])||(!prac&&answered(E.cur)&&!isMulti(q)));}
    const a=E.ans[E.cur],sel=i=>multi?(a||[]).includes(i):a===i,cor=i=>multi?q.a.includes(i):q.a===i;
    $("#xkQ").innerHTML=`<div class="xk-in"><p class="xk-meta">ข้อ ${E.cur+1} / ${n} · ${esc(q.sec)} <span class="xk-ty ty-${tyOf(q)}">${TY[tyOf(q)]}</span>${multi?` <span class="xk-ty ty-mix">เลือกได้หลายข้อ</span>`:""}</p>
      ${q.fig?`<div class="xk-fig">${q.fig}</div>`:""}<div class="xk-q">${q.q}</div>
      <div class="xk-ch">${it.ord.map((oi,j)=>{let cls=sel(oi)?"xk-sel":"";if(done)cls=cor(oi)?(sel(oi)?"xk-ok":"xk-miss"):(sel(oi)?"xk-ng":"");return `<button type="button" class="xk-c ${cls}" data-o="${oi}" ${done?'aria-disabled="true"':""}><span class="xk-L">${LET[j]}</span><span>${q.o[oi]}</span></button>`;}).join("")}</div>
      ${prac&&multi&&!done?`<div class="xk-row" style="margin-top:10px"><button type="button" class="xk-btn xk-pri" id="xkCheck" ${answered(E.cur)?"":"disabled"}>ตรวจคำตอบ</button></div>`:""}
      ${done?`<div class="xk-fb ${same(a,q.a)?"xk-ok":"xk-ng"}"><b>${same(a,q.a)?"ถูกต้อง":"ยังไม่ถูก"}</b> ${q.e||""}${SRC(q)}</div>`:""}
      <div class="xk-row xk-qnav" style="justify-content:space-between;margin-top:14px"><button type="button" class="xk-btn" id="xkP" ${E.cur===0?"disabled":""}>← ข้อก่อน</button><button type="button" class="xk-btn ${done?"xk-pri":""}" id="xkX" ${E.cur===n-1?"disabled":""}>ข้อถัดไป →</button></div></div>`;
    $$("#xkQ .xk-c").forEach(b=>b.onclick=()=>{if(done)return;const oi=+b.dataset.o;
      if(multi){const s=new Set(E.ans[E.cur]||[]);s.has(oi)?s.delete(oi):s.add(oi);E.ans[E.cur]=[...s];}
      else{E.ans[E.cur]=oi;if(prac)E.chk[E.cur]=true;}
      save();paint();if(prac&&E.chk[E.cur])showFb();});
    const ck=$("#xkCheck");if(ck)ck.onclick=()=>{E.chk[E.cur]=true;save();paint();showFb();};
    $("#xkP").onclick=()=>go(-1);$("#xkX").onclick=()=>go(1);
    $("#xkMap").innerHTML=E.qs.map((it2,k)=>{const q2=B[it2.i];let c=answered(k)?"xk-ans":"";if(prac&&E.chk[k])c=same(E.ans[k],q2.a)?"xk-ok":"xk-ng";return `<button type="button" class="xk-qm ${c} ${E.flag[k]?"xk-flag":""} ${k===E.cur?"xk-cur":""}" data-q="${k}" aria-label="ข้อ ${k+1}">${k+1}</button>`;}).join("");
  }
  function showFb(){const f=$("#xkQ .xk-fb");if(!f)return;const nav=$(".xk-nav"),nb=nav&&getComputedStyle(nav).display!=="none"?nav.getBoundingClientRect().height:0,r=f.getBoundingClientRect(),lim=innerHeight-nb-12,bar=$(".xk-bar"),off=(bar?bar.getBoundingClientRect().height:0)+22;if(r.bottom>lim)scBy(Math.min(r.bottom-lim,r.top-off));}
  function confirmSend(){
    const n=E.qs.length,un=n-E.qs.filter((_,k)=>answered(k)).length;
    dialog(E.cfg.mode==="real"?"ส่งคำตอบเลยไหม":"จบการฝึกเลยไหม",un?`ยังไม่ได้ตอบ ${un} ข้อ ข้อที่ไม่ตอบจะนับเป็นผิด`:"ตอบครบทุกข้อแล้ว ส่งแล้วจะดูเฉลยได้ทันที",[{l:"กลับไปทำต่อ"},{l:E.cfg.mode==="real"?"ส่งคำตอบ":"จบการฝึก",cls:"xk-pri",f:()=>finish(false)}]);
  }
  function confirmCancel(){
    const done=E.qs.filter((_,k)=>answered(k)).length;
    dialog("ยกเลิกการสอบไหม",`ตอบไปแล้ว ${done} จาก ${E.qs.length} ข้อ ถ้ายกเลิก คำตอบชุดนี้จะไม่ถูกบันทึกและไม่นับคะแนน ข้อในชุดนี้จะกลับไปสุ่มได้อีก`,[{l:"ทำข้อสอบต่อ",cls:"xk-pri"},{l:"ยกเลิกสอบ",cls:"xk-dan",f:()=>{clearInterval(tick);if(E&&E.seenBefore)st.set(K+"seen",E.seenBefore);E=null;st.set(K+"run",null);setup();top();}}]);
  }

  /* ---------------- result ---------------- */
  function finish(timeout){
    clearInterval(tick);E.done=true;
    const n=E.qs.length,c=E.cfg;let s=0;const bySec={},byTy={};
    E.qs.forEach((it,k)=>{const q=B[it.i],ok=same(E.ans[k],q.a);if(ok)s++;
      (bySec[q.sec]=bySec[q.sec]||[0,0])[1]++;if(ok)bySec[q.sec][0]++;const t=tyOf(q);(byTy[t]=byTy[t]||[0,0])[1]++;if(ok)byTy[t][0]++;});
    const p=Math.round(s/n*100),d=new Date();
    const hist=st.get(K+"hist",[]);hist.unshift({d:`${d.getDate()}/${d.getMonth()+1} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`,s,n,p,ty:TY[c.type],m:c.mode});st.set(K+"hist",hist.slice(0,30));
    st.set(K+"run",null);lock(false);root.classList.remove("xk-running","xk-setup");
    const R=E;let filt="all";
    root.innerHTML=`<div class="xk-in"><p class="xk-eb">ผลสอบ · ${esc(opt.title)}</p><h2 class="xk-h">${timeout?"หมดเวลา ระบบส่งคำตอบให้แล้ว":"ส่งคำตอบเรียบร้อย"}</h2></div>
    <div class="xk-opts xk-o2"><div class="xk-card" style="display:grid;gap:6px"><span class="xk-big">${s}<span style="font-size:.45em;color:var(--mut)"> / ${n}</span></span><b style="font-size:18px">${p}% ${p>=60?"· ผ่านเกณฑ์ 60%":"· ยังไม่ถึงเกณฑ์ 60%"}</b><p style="color:var(--mut)">${p>=80?"ยอดเยี่ยม พร้อมสอบจริงแล้ว":p>=60?"ดี ทบทวนข้อที่ผิดอีกนิด":"ลองกลับไปเรียนหัวข้อที่คะแนนน้อยใน Tutor แล้วสอบใหม่"}</p></div>
    <div class="xk-card" style="display:grid;gap:8px"><b>คะแนนรายหัวข้อ</b>${Object.entries(bySec).map(([k,v])=>`<div class="xk-chrow"><span>${esc(k)}</span><span class="xk-bar2"><i style="width:${v[0]/v[1]*100}%"></i></span><span>${v[0]}/${v[1]}</span></div>`).join("")}
      ${Object.keys(byTy).length>1?`<b style="margin-top:6px">คะแนนตามประเภท</b>${Object.entries(byTy).map(([k,v])=>`<div class="xk-chrow"><span>${TY[k]}</span><span class="xk-bar2"><i style="width:${v[0]/v[1]*100}%"></i></span><span>${v[0]}/${v[1]}</span></div>`).join("")}`:""}</div></div>
    <p class="xk-lab">ทำชุดต่อไป</p>
    <div class="xk-opts xk-o3" id="xkNext">
      <button type="button" class="xk-pick" data-next="again"><span class="xk-ic">🎲</span><b>สุ่มข้อสอบชุดใหม่</b><span>ตั้งค่าเดิม · เลือกข้อที่ยังไม่เคยทำก่อน</span></button>
      <button type="button" class="xk-pick" data-next="ana" ${cnt("ana")?"":'aria-disabled="true"'}><span class="xk-ic">🔍</span><b>ข้อสอบวิเคราะห์</b><span>คำนวณ ตีความ · ${cnt("ana")} ข้อ</span></button>
      <button type="button" class="xk-pick" data-next="app" ${cnt("app")?"":'aria-disabled="true"'}><span class="xk-ic">💊</span><b>ข้อสอบประยุกต์</b><span>สถานการณ์จริง ยา และสุขภาพ · ${cnt("app")} ข้อ</span></button>
    </div>
    <div class="xk-row" style="justify-content:space-between"><button type="button" class="xk-btn" id="xkSetup">← กลับไปตั้งค่า</button><div class="xk-seg" id="xkF"><button type="button" data-f="all" aria-pressed="true">ทุกข้อ</button><button type="button" data-f="ng" aria-pressed="false">เฉพาะข้อผิด</button><button type="button" data-f="fl" aria-pressed="false">ข้อที่ปักธง</button></div></div>
    <div class="xk-rv" id="xkRv"></div>`;
    const draw=()=>{const items=R.qs.map((it,k)=>({it,k,q:B[it.i]})).filter(x=>filt==="all"||(filt==="ng"&&!same(R.ans[x.k],x.q.a))||(filt==="fl"&&R.flag[x.k]));
      $("#xkRv").innerHTML=items.length?items.map(({it,k,q})=>{const a=R.ans[k],ok=same(a,q.a),na=!answered.call(null,k)&&(a==null||(Array.isArray(a)&&!a.length));const isC=i=>isMulti(q)?q.a.includes(i):q.a===i,isS=i=>Array.isArray(a)?a.includes(i):a===i;
        return `<details><summary><span class="xk-mk ${ok?"xk-ok":na?"xk-na":"xk-ng"}">${k+1}</span><span><span class="xk-ty ty-${tyOf(q)}">${TY[tyOf(q)]}</span> ${q.q}</span></summary><div class="xk-rvb">${q.fig?`<div class="xk-fig">${q.fig}</div>`:""}
        ${it.ord.map((oi,j)=>`<div style="font-size:14.5px;line-height:1.5;${isC(oi)?"color:var(--ok);font-weight:600":isS(oi)?"color:var(--ng)":""}">${LET[j]}. ${q.o[oi]}${isC(oi)?" ✓":isS(oi)?" ✗ (ที่เลือก)":""}</div>`).join("")}
        <p class="xk-why">${q.e||""}${SRC(q)}</p></div></details>`;}).join(""):`<p style="color:var(--mut)">ไม่มีข้อในหมวดนี้</p>`;};
    const ansd=k=>{const a=R.ans[k];return a!=null&&(!Array.isArray(a)||a.length>0);};
    answered=ansd;draw();
    $("#xkF").onclick=e=>{const b=e.target.closest("[data-f]");if(!b)return;filt=b.dataset.f;$$("#xkF button").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));draw();};
    $("#xkSetup").onclick=()=>{E=null;answered=k=>{const a=E.ans[k];return a!=null&&(!Array.isArray(a)||a.length>0);};setup();top();};
    $("#xkNext").onclick=e=>{const b=e.target.closest("[data-next]");if(!b||b.getAttribute("aria-disabled")==="true")return;const nx=b.dataset.next;
      const c2=nx==="again"?Object.assign({},c):Object.assign({},c,{type:nx,n:poolOf(nx).length<=30?0:30});
      E=null;answered=k=>{const a=E.ans[k];return a!=null&&(!Array.isArray(a)||a.length>0);};cfg=Object.assign(cfg,{type:c2.type,n:c2.n,mode:c2.mode});st.set(K+"cfg",cfg);start(c2);};
    top();
  }
  document.addEventListener("keydown",e=>{
    if(!E||E.done||!document.body.classList.contains("xk-lock")||document.querySelector(".xk-dlg")||!root.offsetParent)return;
    if(e.target.closest&&e.target.closest("input,textarea"))return;if(e.metaKey||e.ctrlKey||e.altKey)return;
    const m={"1":0,"2":1,"3":2,"4":3}[e.key];
    if(m!==undefined){const b=$$("#xkQ .xk-c")[m];if(b){b.click();e.preventDefault();}}
    else if(e.key==="ArrowRight"){go(1);e.preventDefault();}
    else if(e.key==="ArrowLeft"){go(-1);e.preventDefault();}
  });
  setup();
  return {setup};
}
window.XK={mount};
})();
