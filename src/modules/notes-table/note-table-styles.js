// src/modules/notes-table/note-table-styles.js
//
// CSS-in-JS da janela da nota em tabela. Portado do protótipo
// docs/media/case-notes-table/preview.html (os tokens são os de notes-styles.js e
// header-factory.js; medidas em specs/ui-ux/design-system.md, seção "Case Notes em
// tabela: a tela"). Toda regra é escopada em #cw-notetable-popup e toda classe tem o
// prefixo `nt-`: o CRM é um app Material com CSS global, e nada daqui pode vazar
// para ele (nem dele para cá). Modificadores compostos (`.nt-row.pending`, `.open`,
// `.on`) não têm prefixo porque só valem colados a uma classe `nt-`.

const CSS = `
#cw-notetable-popup{--primary:#1a73e8; --primary-hover:#1765cc; --primary-bg:#e8f0fe; --primary-ink:#1967d2;
  --ink:#202124; --ink2:#3c4043; --sub:#5f6368; --hint:#9aa0a6; --hint2:#74777c;
  --surface:#fff; --tone:#f5f5f7; --tone-1:#f8f9fa; --tone-2:#f1f3f4; --track:#e8e8ed;
  --hairline:rgba(60,64,67,.12);
  --ok:#188038; --ok-bg:#e6f4ea; --warn:#b06000; --warn-bg:#fef7e0; --err:#d93025;
  --font:'Google Sans','Google Sans Flex',Roboto,system-ui,sans-serif;
  --ease:cubic-bezier(.4,0,.2,1); --spring:cubic-bezier(.34,1.56,.64,1);}
#cw-notetable-popup *{box-sizing:border-box}
#cw-notetable-popup button,#cw-notetable-popup input,#cw-notetable-popup textarea{font-family:inherit}
#cw-notetable-popup button{padding:0;margin:0}
#cw-notetable-popup [hidden]{display:none!important}
@media (prefers-reduced-motion:reduce){#cw-notetable-popup *{transition-duration:.01ms!important;animation-duration:.01ms!important}}
#cw-notetable-popup .nt-win{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;overflow:hidden;border-radius:20px;background:rgba(255,255,255,.98);border:1px solid rgba(255,255,255,.7);box-shadow:0 20px 40px rgba(0,0,0,.12)}
#cw-notetable-popup .nt-hdr{position:relative;flex:none;height:56px;padding:0 20px;display:flex;align-items:center;justify-content:space-between;background:rgba(28,28,32,.85);backdrop-filter:blur(12px);color:#e8eaed;font-weight:500;letter-spacing:.5px;border-bottom:1px solid rgba(255,255,255,.08)}
#cw-notetable-popup .nt-hdr .nt-l{display:flex;align-items:center;gap:12px}
#cw-notetable-popup .nt-hdr .nt-logo{display:flex;width:20px;height:20px}
#cw-notetable-popup .nt-hdr .nt-t{font-size:16px}
#cw-notetable-popup .nt-hdr .nt-r{display:flex;align-items:center;gap:4px}
#cw-notetable-popup .nt-hbtn{width:32px;height:32px;padding:0;display:grid;place-items:center;border:0;border-radius:50%;background:transparent;color:#9aa0a6;cursor:pointer;transition:background-color .2s var(--ease),color .2s var(--ease)}
#cw-notetable-popup .nt-hbtn:hover{background:rgba(255,255,255,.1);color:#fff}
#cw-notetable-popup .nt-hbtn.x:hover{background:rgba(242,139,130,.2);color:#f28b82}
#cw-notetable-popup .nt-hbtn:focus-visible,#cw-notetable-popup .nt-chip:focus-visible,#cw-notetable-popup .nt-seg button:focus-visible,#cw-notetable-popup .nt-btn:focus-visible,#cw-notetable-popup .nt-na:focus-visible,#cw-notetable-popup .nt-pick:focus-visible,#cw-notetable-popup .nt-tab:focus-visible,#cw-notetable-popup .nt-status:focus-visible{outline:2px solid var(--primary);outline-offset:2px}
#cw-notetable-popup .nt-gline{position:absolute;left:0;bottom:0;width:100%;height:2px;background:linear-gradient(to right,#4285f4,#ea4335,#fbbc05,#34a853);opacity:.8}
#cw-notetable-popup .nt-bw{position:relative;flex:1;min-height:0;overflow:hidden;background:var(--tone)}
#cw-notetable-popup .nt-body{position:absolute;inset:0;overflow-y:auto;padding:24px;scrollbar-width:thin;scrollbar-color:#dadce0 transparent}
#cw-notetable-popup .nt-sec{margin-bottom:24px}
#cw-notetable-popup .nt-eyebrow{display:flex;align-items:center;gap:8px;margin:0 0 8px;font-size:11px;font-weight:500;line-height:16px;letter-spacing:1px;text-transform:uppercase;color:var(--sub)}
#cw-notetable-popup .nt-eyebrow::after{content:"";flex:1;height:1px;background:var(--hairline)}
#cw-notetable-popup .nt-sub-h{margin:8px 0 8px 16px;font-size:12px;font-weight:500;line-height:16px;color:var(--sub)}
#cw-notetable-popup .nt-form>.nt-eyebrow{margin-top:8px}
#cw-notetable-popup .nt-eyebrow .nt-n{letter-spacing:0;text-transform:none;font-weight:400;color:var(--hint)}
#cw-notetable-popup .nt-cols{display:grid;grid-template-columns:1fr 1fr;gap:16px}
#cw-notetable-popup .nt-cap{margin:8px 0 0 4px;font-size:12px;line-height:16px;color:var(--sub)}
#cw-notetable-popup .nt-cap span{color:var(--ink)}
#cw-notetable-popup .nt-seg{display:flex;padding:4px;border-radius:12px;background:var(--track)}
#cw-notetable-popup .nt-seg button{flex:1;height:32px;border:0;border-radius:8px;background:transparent;font-size:13px;font-weight:500;color:var(--sub);cursor:pointer;transition:background-color .2s var(--ease),color .2s var(--ease),box-shadow .2s var(--ease)}
#cw-notetable-popup .nt-seg button:hover:not([aria-checked=true]){color:var(--ink)}
#cw-notetable-popup .nt-seg button[aria-checked=true]{background:#fff;color:var(--ink);box-shadow:0 1px 2px rgba(0,0,0,.12)}
#cw-notetable-popup .nt-seg.sm{display:inline-flex;padding:4px}
#cw-notetable-popup .nt-seg.sm button{flex:none;min-width:56px;padding:0 12px}
#cw-notetable-popup .nt-card{background:var(--surface);border-radius:16px;overflow:hidden}
#cw-notetable-popup .nt-cw{position:relative;margin-bottom:24px}
#cw-notetable-popup .nt-cw>.nt-fn{position:absolute;left:16px;right:16px;top:calc(100% + 4px);font-size:12px;line-height:16px;color:var(--sub);pointer-events:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#cw-notetable-popup .nt-cw.tall{margin-bottom:24px}
#cw-notetable-popup .nt-row{position:relative;display:grid;grid-template-columns:136px minmax(0,1fr) auto;align-items:center;column-gap:12px;min-height:52px;padding:8px 16px;transition:background-color .2s var(--ease)}
#cw-notetable-popup .nt-card>*+*{position:relative}
#cw-notetable-popup .nt-card>*+*::before{content:"";position:absolute;left:16px;right:0;top:0;height:1px;background:var(--hairline)}
#cw-notetable-popup .nt-card>.nt-auto-sum::before{display:none}
#cw-notetable-popup .nt-card.nt-ts{background:var(--warn-bg);box-shadow:inset 4px 0 0 #f29900,0 0 0 1px #fbbc05}
#cw-notetable-popup .nt-ts-h{display:flex;flex-direction:column;gap:2px;padding:12px 16px 8px}
#cw-notetable-popup .nt-ts-h b{font-size:13px;font-weight:500;line-height:18px;color:var(--warn)}
#cw-notetable-popup .nt-ts-h span{font-size:12px;line-height:16px;color:var(--sub)}
#cw-notetable-popup .nt-ts-auto{display:flex;flex-direction:column;gap:2px;padding:12px 16px;font-size:12px;line-height:16px;color:var(--sub)}
#cw-notetable-popup .nt-ts-auto b{font-size:13px;font-weight:500;line-height:18px;color:var(--ink2)}
#cw-notetable-popup .nt-row:focus-within{background:var(--tone-1)}
#cw-notetable-popup .nt-row:focus-within::after{content:"";position:absolute;left:0;top:8px;bottom:8px;width:2px;border-radius:2px;background:var(--primary)}
#cw-notetable-popup .nt-row.pending::after{content:"";position:absolute;left:0;top:8px;bottom:8px;width:2px;border-radius:2px;background:#fbbc05}
#cw-notetable-popup .nt-row.pending .nt-rl{color:var(--warn)}
#cw-notetable-popup .nt-rl{font-size:12px;font-weight:500;line-height:16px;color:var(--sub);overflow-wrap:break-word;min-width:0}
#cw-notetable-popup .nt-rv{min-width:0}
#cw-notetable-popup .nt-rv input,#cw-notetable-popup .nt-rv textarea{display:block;width:100%;border:0;outline:0;background:transparent;padding:0;font-size:15px;font-weight:400;line-height:20px;color:var(--ink);resize:none}
#cw-notetable-popup .nt-rv input::placeholder,#cw-notetable-popup .nt-rv textarea::placeholder{color:var(--hint)}
#cw-notetable-popup .nt-row.bad .nt-rv input{color:var(--err)}
#cw-notetable-popup .nt-row.stack{grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"l n" "v v";row-gap:4px;padding:12px 16px}
#cw-notetable-popup .nt-row.stack .nt-rl{grid-area:l}
#cw-notetable-popup .nt-row.stack .nt-rv{grid-area:v}
#cw-notetable-popup .nt-row.stack .nt-na{grid-area:n}
#cw-notetable-popup .nt-row.stack textarea{min-height:44px}
#cw-notetable-popup .nt-rv .nt-val{font-size:15px;line-height:20px;color:var(--ink);overflow-wrap:anywhere}
#cw-notetable-popup .nt-rv .nt-val.muted{color:var(--sub)}
#cw-notetable-popup .nt-rv .nt-val.empty{color:var(--hint)}
#cw-notetable-popup .nt-rv.date{display:flex;align-items:center;gap:8px}
#cw-notetable-popup .nt-rv.date input{flex:none;width:96px;font-variant-numeric:tabular-nums}
#cw-notetable-popup .nt-rv.cidv input,#cw-notetable-popup .nt-rv.sp input{font-variant-numeric:tabular-nums}
#cw-notetable-popup .nt-quick{display:none;margin-left:auto;gap:4px}
#cw-notetable-popup .nt-row:focus-within .nt-quick{display:flex}
#cw-notetable-popup .nt-rv.sp{display:flex;align-items:center;gap:8px}
#cw-notetable-popup .nt-rv.sp input{flex:1;min-width:0;width:auto}
#cw-notetable-popup .nt-rv.sp .nt-chip{flex:none;white-space:nowrap}
#cw-notetable-popup .nt-na{height:32px;min-width:32px;padding:0 8px;border:0;border-radius:8px;background:transparent;font-size:12px;font-weight:500;color:var(--hint2);cursor:pointer;transition:background-color .2s var(--ease),color .2s var(--ease)}
#cw-notetable-popup .nt-na:hover{background:var(--tone-2);color:var(--ink2)}
#cw-notetable-popup .nt-na[aria-pressed=true]{background:var(--primary-bg);color:var(--primary-ink)}
#cw-notetable-popup .nt-tag{display:inline-flex;align-items:center;gap:4px;margin-left:8px;font-size:11px;font-weight:500;line-height:16px;letter-spacing:0;color:var(--primary-ink)}
#cw-notetable-popup .nt-tag svg{width:12px;height:12px}
#cw-notetable-popup .nt-tag.warn{color:var(--warn)}
#cw-notetable-popup .nt-more{display:flex;align-items:center;justify-content:space-between;width:100%;min-height:44px;padding:0 16px;border:0;background:transparent;font-size:13px;font-weight:500;color:var(--sub);cursor:pointer;text-align:left;position:relative}
#cw-notetable-popup .nt-more:hover{background:var(--tone-1);color:var(--ink2)}
#cw-notetable-popup .nt-more svg{width:20px;height:20px;transition:transform .2s var(--ease)}
#cw-notetable-popup .nt-more[aria-expanded=true] svg{transform:rotate(180deg)}
#cw-notetable-popup .nt-row.add{min-height:44px}
#cw-notetable-popup .nt-add-btn{min-height:32px;border:0;background:none;padding:0;font-size:13px;font-weight:500;color:var(--primary-ink);cursor:pointer}
#cw-notetable-popup .nt-chips{display:flex;flex-wrap:wrap;gap:8px;min-width:0}
#cw-notetable-popup .nt-chip{display:inline-flex;align-items:center;gap:8px;height:32px;padding:0 12px;border:0;border-radius:16px;background:var(--tone-2);font-size:13px;font-weight:500;color:var(--ink2);cursor:pointer;transition:background-color .2s var(--ease),color .2s var(--ease)}
#cw-notetable-popup .nt-chip:hover{background:var(--track)}
#cw-notetable-popup .nt-chip[aria-pressed=true]{background:var(--primary-bg);color:var(--primary-ink)}
#cw-notetable-popup .nt-chip.lock{cursor:default}
#cw-notetable-popup .nt-chip{position:relative}
#cw-notetable-popup .nt-chip .nt-dot{position:absolute;top:-2px;right:-2px;width:12px;height:12px;border-radius:50%;background:var(--primary);box-shadow:0 0 0 2px #fff}
#cw-notetable-popup .nt-chipw{display:inline-flex;align-items:center}
#cw-notetable-popup .nt-q,#cw-notetable-popup .nt-help-x{position:relative;isolation:isolate;flex:none;width:32px;height:32px;padding:0;border:0;background:transparent;font:inherit;font-size:12px;font-weight:500;line-height:32px;color:var(--sub);cursor:pointer;transition:color .2s var(--ease)}
#cw-notetable-popup .nt-q::before,#cw-notetable-popup .nt-help-x::before{content:"";position:absolute;z-index:-1;inset:4px;border-radius:50%;box-shadow:inset 0 0 0 1px var(--hairline);transition:background-color .2s var(--ease)}
#cw-notetable-popup .nt-q:hover,#cw-notetable-popup .nt-help-x:hover{color:var(--ink2)}
#cw-notetable-popup .nt-q:hover::before,#cw-notetable-popup .nt-help-x:hover::before{background:var(--tone-2)}
#cw-notetable-popup .nt-q[aria-expanded=true]{color:var(--primary-ink)}
#cw-notetable-popup .nt-q[aria-expanded=true]::before{background:var(--primary-bg);box-shadow:none}
#cw-notetable-popup .nt-q:focus-visible,#cw-notetable-popup .nt-help-x:focus-visible{outline:2px solid var(--primary);outline-offset:-2px;border-radius:50%}
#cw-notetable-popup .nt-help{display:flex;flex-direction:column;gap:10px;margin:0 12px 12px;padding:14px;border-radius:12px;background:var(--tone-1);box-shadow:inset 0 0 0 1px var(--hairline);font-size:12px;line-height:17px;color:var(--ink2)}
#cw-notetable-popup .nt-help-h{display:flex;align-items:center;justify-content:space-between;gap:8px}
#cw-notetable-popup .nt-help-h b{font-size:14px;font-weight:500;line-height:20px;color:var(--ink)}
#cw-notetable-popup .nt-help-w{margin:0;color:var(--ink)}
#cw-notetable-popup .nt-help-r{display:flex;flex-direction:column;gap:2px}
#cw-notetable-popup .nt-help-r b,#cw-notetable-popup .nt-help-g{font-size:11px;font-weight:500;line-height:16px;letter-spacing:.8px;text-transform:uppercase;color:var(--sub)}
#cw-notetable-popup .nt-help-r.s{margin-left:2px;padding-left:10px;border-left:2px solid var(--hairline)}
#cw-notetable-popup .nt-help-r.s b{font-size:12px;letter-spacing:0;text-transform:none;color:var(--ink)}
#cw-notetable-popup .nt-help-g{margin-bottom:-4px}
#cw-notetable-popup .nt-help-n,#cw-notetable-popup .nt-help-f{color:var(--hint2)}
#cw-notetable-popup .nt-help-a{display:flex}
#cw-notetable-popup .nt-pv-note{display:flex;flex-direction:column;gap:2px;margin:0 0 8px;padding:8px 12px;border-radius:8px;background:var(--primary-bg);color:var(--primary-ink);font-family:var(--font);font-size:12px;line-height:16px}
#cw-notetable-popup .nt-pv-note b,#cw-notetable-popup .nt-pv-k{font-weight:500}
#cw-notetable-popup .nt-pv-ghost{opacity:.5;outline:2px dashed var(--primary);outline-offset:4px}
#cw-notetable-popup .nt-pv-hl{outline:2px solid var(--primary);outline-offset:4px}
#cw-notetable-popup .nt-row.chiprow{align-items:start;padding:12px 16px}
#cw-notetable-popup .nt-row.chiprow .nt-rl{padding-top:8px}
#cw-notetable-popup .nt-card.ctx .nt-row,#cw-notetable-popup .nt-card.ctx .nt-pick{grid-template-columns:88px minmax(0,1fr) auto}
#cw-notetable-popup .nt-row.stackc{grid-template-columns:minmax(0,1fr);row-gap:8px;padding:12px 16px}
#cw-notetable-popup .nt-pick{display:grid;grid-template-columns:136px minmax(0,1fr) auto;align-items:center;column-gap:12px;width:100%;min-height:52px;padding:8px 16px;border:0;background:transparent;text-align:left;cursor:pointer;position:relative;transition:background-color .2s var(--ease)}
#cw-notetable-popup .nt-pick:hover{background:var(--tone-1)}
#cw-notetable-popup .nt-pick .nt-v{font-size:15px;line-height:20px;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#cw-notetable-popup .nt-pick .nt-v.empty{color:var(--hint)}
#cw-notetable-popup .nt-pick svg{width:20px;height:20px;color:var(--hint);transition:transform .2s var(--ease)}
#cw-notetable-popup .nt-pick[aria-expanded=true] svg{transform:rotate(180deg)}
#cw-notetable-popup .nt-pick .nt-v.warn{color:var(--warn)}
#cw-notetable-popup .nt-pop{position:absolute;left:24px;right:24px;z-index:30;overflow:hidden;border-radius:16px;background:#fff;box-shadow:0 0 1px rgba(0,0,0,.08),0 8px 24px rgba(0,0,0,.12)}
#cw-notetable-popup .nt-pop-s{position:relative;padding:8px}
#cw-notetable-popup .nt-pop-s svg{position:absolute;left:20px;top:20px;width:20px;height:20px;color:var(--hint)}
#cw-notetable-popup .nt-pop-s input{width:100%;height:40px;border:0;outline:0;border-radius:12px;background:var(--tone-2);padding:0 12px 0 40px;font-size:15px;color:var(--ink)}
#cw-notetable-popup .nt-pop-s input:focus{box-shadow:0 0 0 2px var(--primary)}
#cw-notetable-popup .nt-pop-l{max-height:320px;overflow-y:auto;padding:0 8px 8px}
#cw-notetable-popup .nt-pop-g{padding:12px 12px 4px;font-size:11px;font-weight:500;letter-spacing:1px;text-transform:uppercase;color:var(--hint)}
#cw-notetable-popup .nt-opt{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;height:40px;padding:0 12px;border:0;border-radius:8px;background:none;font-size:15px;color:var(--ink);text-align:left;cursor:pointer}
#cw-notetable-popup .nt-opt:hover,#cw-notetable-popup .nt-opt.on{background:var(--tone-2)}
#cw-notetable-popup .nt-opt .nt-hk{font-size:12px;color:var(--hint);font-variant-numeric:tabular-nums}
#cw-notetable-popup .nt-opt .nt-ck{color:var(--primary)}
#cw-notetable-popup .nt-sw{position:relative;justify-self:end;width:52px;height:32px;border:0;border-radius:16px;background:var(--track);cursor:pointer;transition:background-color .2s var(--ease)}
#cw-notetable-popup .nt-sw::after{content:"";position:absolute;left:2px;top:2px;width:28px;height:28px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:transform .25s var(--spring)}
#cw-notetable-popup .nt-sw[aria-checked=true]{background:var(--primary)}
#cw-notetable-popup .nt-sw[aria-checked=true]::after{transform:translateX(20px)}
#cw-notetable-popup .nt-sw:focus-visible{outline:2px solid var(--primary);outline-offset:2px}
#cw-notetable-popup .nt-auto-h{display:flex;align-items:center;gap:12px;width:100%;min-height:52px;padding:8px 16px;border:0;background:transparent;text-align:left;cursor:pointer;font-size:14px;font-weight:500;color:var(--ink)}
#cw-notetable-popup .nt-auto-h:hover{background:var(--tone-1)}
#cw-notetable-popup .nt-auto-h .nt-ic{display:flex;color:var(--primary)}
#cw-notetable-popup .nt-auto-h .nt-ic svg{width:20px;height:20px}
#cw-notetable-popup .nt-auto-h .nt-c{margin-left:auto;display:flex;align-items:center;gap:4px;font-size:12px;font-weight:400;color:var(--hint)}
#cw-notetable-popup .nt-auto-h .nt-c svg{width:20px;height:20px;transition:transform .2s var(--ease)}
#cw-notetable-popup .nt-auto-h[aria-expanded=true] .nt-c svg{transform:rotate(180deg)}
#cw-notetable-popup .nt-auto-sum{display:flex;flex-wrap:wrap;gap:4px 16px;padding:0 16px 12px 48px;font-size:13px;line-height:20px;color:var(--ink)}
#cw-notetable-popup .nt-auto-sum span{color:var(--hint)}
#cw-notetable-popup .nt-auto-sum span b{font-weight:400;color:var(--ink)}
#cw-notetable-popup .nt-empty-s{padding:48px 24px;text-align:center;font-size:15px;line-height:24px;color:var(--sub)}
#cw-notetable-popup .nt-empty-s b{display:block;font-size:16px;font-weight:500;color:var(--ink);margin-bottom:4px}
#cw-notetable-popup .nt-sticky{position:absolute;left:0;right:0;top:0;z-index:4;height:48px;display:flex;align-items:center;gap:8px;padding:0 24px;background:rgba(245,245,247,.98);backdrop-filter:blur(20px);box-shadow:0 1px 0 var(--hairline);transform:translateY(-100%);transition:transform .25s var(--ease);border:0;width:100%;text-align:left;font-size:13px;font-weight:500;color:var(--ink);cursor:pointer}
#cw-notetable-popup .nt-sticky.on{transform:translateY(0)}
#cw-notetable-popup .nt-pbar{position:absolute;left:0;right:0;top:0;z-index:5;height:48px;display:flex;align-items:center;gap:8px;padding:0 24px;background:var(--warn-bg);box-shadow:0 1px 0 var(--hairline);transform:translateY(-100%);transition:transform .25s var(--ease);font-size:13px;font-weight:500;color:var(--warn)}
#cw-notetable-popup .nt-pbar.on{transform:translateY(0)}
#cw-notetable-popup .nt-pbar .nt-d{width:8px;height:8px;border-radius:50%;background:#fbbc05}
#cw-notetable-popup .nt-btn.sm{height:32px;padding:0 12px;border-radius:16px;font-size:13px}
#cw-notetable-popup .nt-sticky i{font-style:normal;color:var(--hint);font-weight:400}
#cw-notetable-popup .nt-sticky svg{margin-left:auto;width:20px;height:20px;color:var(--hint)}
#cw-notetable-popup .nt-foot{flex:none;background:var(--surface);box-shadow:0 -1px 0 var(--hairline);padding:12px 24px 0}
#cw-notetable-popup .nt-foot-row{display:flex;align-items:center;gap:8px;height:40px}
#cw-notetable-popup .nt-status{display:inline-flex;align-items:center;gap:8px;height:32px;margin-left:-8px;padding:0 8px;border:0;border-radius:8px;background:none;font-size:13px;font-weight:500;color:var(--ink2);cursor:pointer}
#cw-notetable-popup .nt-status:hover{background:var(--tone-1)}
#cw-notetable-popup .nt-status .nt-d{width:8px;height:8px;border-radius:50%;background:#fbbc05}
#cw-notetable-popup .nt-status.ready .nt-d{background:#34a853}
#cw-notetable-popup .nt-grow{flex:1}
#cw-notetable-popup .nt-btn{height:36px;padding:0 16px;border:0;border-radius:18px;background:none;font-size:14px;font-weight:500;color:var(--sub);cursor:pointer;transition:background-color .2s var(--ease),color .2s var(--ease),box-shadow .2s var(--ease)}
#cw-notetable-popup .nt-btn:hover{background:var(--tone-2);color:var(--ink)}
#cw-notetable-popup .nt-btn.t{background:var(--primary-bg);color:var(--primary-ink)}
#cw-notetable-popup .nt-btn.t:hover{background:#d2e3fc}
#cw-notetable-popup .nt-btn.p{padding:0 24px;background:var(--primary);color:#fff;box-shadow:0 4px 12px rgba(26,115,232,.3)}
#cw-notetable-popup .nt-btn.p:hover{background:var(--primary-hover);box-shadow:0 6px 16px rgba(26,115,232,.4)}
#cw-notetable-popup .nt-btn.p.blocked{background:var(--tone-2);color:var(--hint);box-shadow:none}
#cw-notetable-popup .nt-credit{height:28px;line-height:28px;text-align:center;font-size:11px;color:var(--hint)}
#cw-notetable-popup .nt-drawer{position:absolute;top:0;right:100%;z-index:1;width:560px;height:100%;margin-right:-24px;transform:translateX(536px);transition:transform .45s var(--spring)}
#cw-notetable-popup .nt-drawer.open{transform:translateX(0)}
#cw-notetable-popup .nt-drawer-in{position:absolute;inset:0;display:flex;flex-direction:column;padding:24px 48px 24px 24px;border-radius:20px 0 0 20px;background:var(--tone-2);box-shadow:0 8px 24px rgba(0,0,0,.08)}
#cw-notetable-popup .nt-d-head{display:flex;align-items:center;justify-content:space-between;min-height:32px;margin-bottom:16px}
#cw-notetable-popup .nt-d-head .nt-eyebrow{margin:0;flex:1}
#cw-notetable-popup .nt-pill{display:inline-flex;align-items:center;gap:8px;height:24px;padding:0 12px;border-radius:12px;font-size:12px;font-weight:500;background:var(--warn-bg);color:var(--warn);white-space:nowrap}
#cw-notetable-popup .nt-pill.ok{background:var(--ok-bg);color:var(--ok)}
#cw-notetable-popup .nt-d-scroll{flex:1;min-height:0;overflow-y:auto;margin-right:-8px;padding:0 8px 8px 0;scrollbar-width:thin;scrollbar-color:#dadce0 transparent}
#cw-notetable-popup .nt-note-card{padding:16px;border-radius:12px;background:#fff;box-shadow:0 4px 12px rgba(0,0,0,.05)}
#cw-notetable-popup .nt-note-card tr[data-row]{cursor:pointer}
#cw-notetable-popup .nt-note-card tr.nt-hl>*{background-color:#e8f0fe!important}
#cw-notetable-popup .nt-tab{position:absolute;left:-32px;top:96px;width:32px;height:112px;padding:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;border:0;border-radius:12px 0 0 12px;background:rgba(28,28,32,.85);backdrop-filter:blur(12px);color:#e8eaed;cursor:pointer;transition:background-color .2s var(--ease)}
#cw-notetable-popup .nt-tab:hover{background:rgba(28,28,32,.95)}
#cw-notetable-popup .nt-tab svg{width:20px;height:20px}
#cw-notetable-popup .nt-tab .nt-chev{transition:transform .3s var(--spring)}
#cw-notetable-popup .nt-drawer.open .nt-tab .nt-chev{transform:rotate(180deg)}
#cw-notetable-popup .nt-tab .nt-bd{display:grid;place-items:center;min-width:20px;height:20px;padding:0 4px;border-radius:10px;background:#fbbc05;color:#202124;font-size:11px;font-weight:500;font-variant-numeric:tabular-nums}
#cw-notetable-popup .nt-tab .nt-bd.ok{background:#34a853;color:#fff}
#cw-notetable-popup .nt-tab .nt-bd svg{width:12px;height:12px}
#cw-notetable-popup .nt-acts{display:flex;align-items:center;justify-content:flex-end;gap:4px;min-width:32px}
#cw-notetable-popup .nt-ghost{opacity:0;transition:opacity .15s var(--ease),background-color .2s var(--ease),color .2s var(--ease)}
#cw-notetable-popup .nt-row:hover .nt-ghost,#cw-notetable-popup .nt-row:focus-within .nt-ghost,#cw-notetable-popup .nt-row.pending .nt-ghost,#cw-notetable-popup .nt-ghost:focus-visible,#cw-notetable-popup .nt-na.nt-ghost[aria-pressed=true]{opacity:1}
#cw-notetable-popup .nt-cmt{display:grid;place-items:center;width:32px;height:32px;border:0;border-radius:8px;background:transparent;color:var(--hint2);cursor:pointer;transition:background-color .2s var(--ease),color .2s var(--ease)}
#cw-notetable-popup .nt-cmt svg{width:20px;height:20px}
#cw-notetable-popup .nt-cmt:hover{background:var(--tone-2);color:var(--ink2)}
#cw-notetable-popup .nt-cmt.on{color:var(--primary-ink)}
#cw-notetable-popup .nt-cmt:focus-visible{outline:2px solid var(--primary);outline-offset:2px}
#cw-notetable-popup .nt-row.stack .nt-acts{grid-area:n}
#cw-notetable-popup .nt-cmrow{grid-column:2/-1;padding-top:4px}
#cw-notetable-popup .nt-row.stack{grid-template-areas:"l n" "v v" "c c"}
#cw-notetable-popup .nt-row.stack .nt-cmrow{grid-area:c;grid-column:auto;padding-top:0}
#cw-notetable-popup .nt-cmrow input{display:block;width:100%;height:32px;padding:0 12px;border:0;outline:0;border-radius:8px;background:var(--tone-2);font-size:13px;line-height:20px;color:var(--ink)}
#cw-notetable-popup .nt-cmrow input::placeholder{color:var(--hint)}
#cw-notetable-popup .nt-rv.lk{display:flex;align-items:center;gap:8px}
#cw-notetable-popup .nt-rv.lk input{flex:1;min-width:0;width:auto}
#cw-notetable-popup .nt-rv .nt-ck{display:none;flex:none;width:20px;height:20px;color:var(--ok)}
#cw-notetable-popup .nt-rv .nt-ck svg{display:block;width:20px;height:20px}
#cw-notetable-popup .nt-rv.ok .nt-ck{display:block}
#cw-notetable-popup .nt-cap2{margin-top:8px;font-size:12px;line-height:16px;color:var(--sub)}
#cw-notetable-popup .nt-cap2 span{color:var(--ink);font-variant-numeric:tabular-nums}
#cw-notetable-popup .nt-pick .nt-v .nt-segtag{margin-right:8px;font-weight:500;color:var(--primary-ink)}
#cw-notetable-popup .nt-rv.sp input:not(:placeholder-shown)~.nt-chip{display:none}
#cw-notetable-popup{font-family:var(--font);font-size:14px;color:var(--ink2);-webkit-font-smoothing:antialiased}
#cw-notetable-popup .nt-win>div:first-child{flex:none}
#cw-notetable-popup .nt-split{flex:1;min-height:0;overflow:hidden;display:none;flex-direction:column}
#cw-notetable-popup.nt-split-on .nt-split{display:flex}
#cw-notetable-popup.nt-split-on .nt-bw,#cw-notetable-popup.nt-split-on .nt-foot,#cw-notetable-popup.nt-split-on .nt-drawer{display:none}
#cw-notetable-popup .nt-drawer.over{right:auto;left:0;margin-right:0;transform:none;opacity:0;visibility:hidden;transition:opacity .2s var(--ease),visibility .2s}
#cw-notetable-popup .nt-drawer.over .nt-tab{visibility:visible}
#cw-notetable-popup .nt-drawer.over.open{z-index:3;opacity:1;visibility:visible}
#cw-notetable-popup .nt-drawer.over .nt-drawer-in{border-radius:20px;padding:24px}
#cw-notetable-popup .nt-hbtn{color:#9aa0a6}
#cw-notetable-popup .nt-hbtn svg{width:20px;height:20px}
#cw-notetable-popup .nt-hbtn .nt-hcount{position:absolute;top:4px;right:4px;width:8px;height:8px;border-radius:50%;background:#fbbc05}
#cw-notetable-popup .nt-hbtn{position:relative}
#cw-notetable-popup .nt-drafts{position:absolute;right:16px;top:64px;z-index:40;width:320px;max-height:360px;overflow-y:auto;padding:8px;border-radius:16px;background:#fff;box-shadow:0 0 1px rgba(0,0,0,.08),0 8px 24px rgba(0,0,0,.12)}
#cw-notetable-popup .nt-drafts .nt-opt{height:auto;min-height:40px;padding:8px 12px;font-size:13px}
#cw-notetable-popup .nt-drafts .nt-opt span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#cw-notetable-popup .nt-drafts .nt-empty-s{padding:24px 12px;font-size:13px;line-height:20px}
#cw-notetable-popup .nt-emailrow{display:flex;align-items:center;gap:8px;min-height:32px;font-size:12px;line-height:16px;color:var(--sub);cursor:pointer}
#cw-notetable-popup .nt-emailrow input{width:16px;height:16px;margin:0;accent-color:var(--primary)}
#cw-notetable-popup .nt-tasks{padding:8px 16px 16px}
#cw-notetable-popup .nt-tasks-sum{font-size:15px;line-height:20px;color:var(--ink);overflow-wrap:anywhere}
#cw-notetable-popup .nt-prints{margin-bottom:24px}
#cw-notetable-popup .nt-btn.t.blocked{background:var(--tone-2);color:var(--hint)}
#cw-notetable-popup .nt-status{white-space:nowrap}
#cw-notetable-popup .nt-scen-menu{display:flex;flex-direction:column;gap:4px}
#cw-notetable-popup .nt-scen-menu .nt-opt{height:auto;min-height:40px;padding:8px 12px;font-size:13px;line-height:20px;white-space:normal}

`;

export function injectNoteTableStyles() {
    if (document.getElementById('cw-notetable-styles')) return;
    const style = document.createElement('style');
    style.id = 'cw-notetable-styles';
    style.textContent = CSS;
    document.head.appendChild(style);
}
