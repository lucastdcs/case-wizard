(()=>{var Lp="cw_ui_lang",Ip="cw_output_lang",Vr="cw_profile_lang",ln=["pt","es","en"];var _p={"PT-BR":"pt",PT:"pt",ES:"es",EN:"en"};var Hr={pt:"pt-BR",es:"es-ES",en:"en-GB"};function Ma(e=ge()){return Hr[e]||Hr.pt}function cn(e=ge()){return e==="en"?"short":"2-digit"}function Ur(e){try{let t=typeof localStorage<"u"?localStorage.getItem(e):null;return ln.includes(t)?t:null}catch{return null}}function Dp(e){return ln.includes(e)}function Wr(e,t){let a=Ur(e),o=a||Ur(Vr)||"pt",n=new Set;return{get:()=>o,hasManualOverride:()=>!!a,set(i,{persist:r=!0}={}){if(!(!Dp(i)||i===o)&&!(!r&&a)){if(o=i,r){a=i;try{typeof localStorage<"u"&&localStorage.setItem(e,i)}catch{}}n.forEach(s=>{try{s(o)}catch(l){console.warn(`i18n listener (${t}) falhou:`,l)}})}},onChange(i){return n.add(i),()=>n.delete(i)}}}var ni=Wr(Lp,"interface"),ii=Wr(Ip,"sa\xEDda");function ge(){return ni.get()}function Eo(e,t){ni.set(e,t)}function je(e){return ni.onChange(e)}function Et(){return ii.get()}function ri(e,t){ii.set(e,t)}function va(e){return ii.onChange(e)}function Yr(e){let t=String(e?.defaultLanguage||"").toUpperCase(),a=_p[t];if(a){try{typeof localStorage<"u"&&localStorage.setItem(Vr,a)}catch{}Eo(a,{persist:!1}),ri(a,{persist:!1})}}function Wa(e){return function(a){return e[ge()]?.[a]??e.pt?.[a]??a}}var Xr={production:"AKfycbxkheuq28ENsHMZMH8t9-u4EIrktHC6cBi-87boDre0jJfl1lnSCPBzaEkw6hy3Cx6fAg",development:"AKfycbyUtczRMulDAyO_1ku39Rb01zarPMw1JvO7aNOdJPYeAgCC7G9mmb-P_EuXP6kvo8l2LA"},dn="development",Mp=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",Kr=Xr[dn]||Xr.development,pi=Mp?"dev":"exec",Op=`https://script.google.com/a/macros/google.com/s/${Kr}/${pi}`,Jr=Kr.slice(-6);function Ya(){return{env:dn,isDev:dn!=="production",endpoint:pi,fingerprint:Jr}}console.log(`[Case Wizard] backend: ${dn}/${pi} \xB7 implanta\xE7\xE3o \u2026${Jr}`);var qp="cw_data_broadcast",Fp="cw_data_tips",si="cw_content_",li=new Set,Rp=["Processando...","Mantenha o foco!","Aguarde..."];function zp(e={}){return Object.keys(e).filter(t=>e[t]!==null&&e[t]!==void 0).map(t=>encodeURIComponent(t)+"="+encodeURIComponent(e[t])).join("&")}var di={pt:{TIMEOUT:"Timeout: A API demorou muito para responder. (Apps Script bloqueado ou erro 500)",CONNECTION:"Erro de conex\xE3o JSONP.",BAU_SEND_FAILED:"Falha na opera\xE7\xE3o BAU",BAU_READ_FAILED:"Erro retornado pela API de leitura",BAU_UPDATE_FAILED:"Falha na atualiza\xE7\xE3o BAU",BAU_NOT_OWNER_EDIT:"Acesso negado. Voc\xEA s\xF3 pode editar seus pr\xF3prios casos.",BAU_NOT_OWNER_DELETE:"Acesso negado. Voc\xEA n\xE3o \xE9 o dono deste caso.",BAU_ALREADY_PROCESSED:"Este caso j\xE1 foi processado pelo TL e n\xE3o pode mais ser alterado.",BAU_NOT_FOUND:"Caso n\xE3o encontrado.",AGENT_EMAIL_REQUIRED:"Email do agente \xE9 obrigat\xF3rio."},es:{TIMEOUT:"Tiempo agotado: la API tard\xF3 demasiado en responder. (Apps Script bloqueado o error 500)",CONNECTION:"Error de conexi\xF3n JSONP.",BAU_SEND_FAILED:"Fall\xF3 la operaci\xF3n BAU",BAU_READ_FAILED:"Error devuelto por la API de lectura",BAU_UPDATE_FAILED:"Fall\xF3 la actualizaci\xF3n BAU",BAU_NOT_OWNER_EDIT:"Acceso denegado. Solo puedes editar tus propios casos.",BAU_NOT_OWNER_DELETE:"Acceso denegado. No eres el due\xF1o de este caso.",BAU_ALREADY_PROCESSED:"Este caso ya fue procesado por el TL y no se puede modificar.",BAU_NOT_FOUND:"Caso no encontrado.",AGENT_EMAIL_REQUIRED:"El correo del agente es obligatorio."},en:{TIMEOUT:"Timeout: the API took too long to respond. (Apps Script blocked or error 500)",CONNECTION:"JSONP connection error.",BAU_SEND_FAILED:"BAU operation failed",BAU_READ_FAILED:"Error returned by the read API",BAU_UPDATE_FAILED:"BAU update failed",BAU_NOT_OWNER_EDIT:"Access denied. You can only edit your own cases.",BAU_NOT_OWNER_DELETE:"Access denied. You are not the owner of this case.",BAU_ALREADY_PROCESSED:"This case has already been processed by the TL and can no longer be changed.",BAU_NOT_FOUND:"Case not found.",AGENT_EMAIL_REQUIRED:"The agent's email is required."}};function pn(e){return di[ge()]?.[e]??di.pt[e]}function ci(e,t){return e?.code&&di.pt[e.code]?pn(e.code):e?.error||e?.message||pn(t)}function $t(e,t={}){return new Promise((a,o)=>{let n="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script"),r=setTimeout(()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[n],o(new Error(pn("TIMEOUT")))},15e3);window[n]=p=>{clearTimeout(r),document.body.contains(i)&&document.body.removeChild(i),delete window[n],a(p)};let s=zp(t),l=`${Op}?op=${e}&callback=${n}&t=${Date.now()}&${s}`;i.src=l,i.onerror=()=>{clearTimeout(r),document.body.contains(i)&&document.body.removeChild(i),delete window[n],o(new Error(pn("CONNECTION")))},document.body.appendChild(i)})}var ke={fetchTips:async()=>{try{await ke.fetchContentModule("tips")}catch(e){console.warn("Tips offline",e)}},getCachedBroadcasts:()=>{try{return JSON.parse(localStorage.getItem(qp)||"[]")}catch{return[]}},fetchContentModule:async e=>{if(li.has(e)){let a=ke.getCachedContent(e);if(a)return a}let t=`${si}${e}`;try{let a=await $t("content_public",{module:e});if(a?.status==="success"&&Array.isArray(a.items))return localStorage.setItem(t,JSON.stringify(a.items)),li.add(e),a.items}catch(a){console.warn(`Conte\xFAdo '${e}' offline`,a)}return ke.getCachedContent(e)},fetchContentModules:async e=>{let t=(e||[]).filter(Boolean);if(!t.length)return{};try{let a=await $t("content_public",{modules:t.join(",")});if(a?.status==="success"&&a.modules)return Object.keys(a.modules).forEach(o=>{let n=a.modules[o];Array.isArray(n)&&(localStorage.setItem(`${si}${o}`,JSON.stringify(n)),li.add(o))}),a.modules}catch(a){console.warn("Pr\xE9-carregamento de conte\xFAdo indispon\xEDvel",a)}return{}},getCachedContent:e=>{try{return JSON.parse(localStorage.getItem(`${si}${e}`)||"null")}catch{return null}},getRandomTip:()=>{let e=null,t=ke.getCachedContent("tips");if(Array.isArray(t)&&t.length&&(e=t.map(a=>a.value).filter(Boolean)),!e||!e.length){let a=localStorage.getItem(Fp);if(a)try{e=JSON.parse(a)}catch{}}return(!Array.isArray(e)||!e.length)&&(e=Rp),e[Math.floor(Math.random()*e.length)]},logEvent:(e,t,a="",o=null)=>{try{let n="anon";try{let r=it();r&&(n=r.split("@")[0].toLowerCase())}catch{}let i={timestamp:new Date().toISOString(),user:n,version:"v5.1",category:e,action:t,label:a,value:o||""};$t("log",i).catch(r=>{})}catch(n){console.warn("Analytics error",n)}},logUsage:()=>{},sendBAUEscalation:async(e,t)=>{let a={...e,user:t,date:new Date().toISOString()};try{console.log("Executando create_bau...",a);let o=await $t("create_bau",a);if(o&&o.status==="success")return console.log("Sucesso: create_bau"),o;throw new Error(ci(o,"BAU_SEND_FAILED"))}catch(o){throw console.error("Erro JSONP (BAU):",o),o}},readAgentBAU:async()=>{let e=it();if(!e)return console.warn("Email n\xE3o encontrado. N\xE3o foi poss\xEDvel buscar casos BAU."),[];try{console.log("Buscando casos BAU para:",e);let t=await $t("read_agent_bau",{user:e});if(t&&t.status==="success"&&Array.isArray(t.cases))return t.cases;if(t&&t.status==="error")throw new Error(ci(t,"BAU_READ_FAILED"));return[]}catch(t){throw console.error("Erro ao buscar casos BAU:",t),t}},updateBAUStatus:async(e,t,a={})=>{let o=it();try{console.log(`Atualizando status BAU ${e} para ${t}...`);let n=await $t("update_bau_status",{id:e,status:t,user:o,...a});return n&&n.status==="success"}catch(n){return console.error("Erro ao atualizar status BAU:",n),!1}},updateBAUEscalation:async(e,t)=>{let a=it(),o={...t,id:e,user:a,date_edited:new Date().toISOString()};try{console.log(`Executando update_bau para ${e}...`,o);let n=await $t("update_bau",o);if(n&&n.status==="success")return console.log("Sucesso: update_bau"),n;throw new Error(ci(n,"BAU_UPDATE_FAILED"))}catch(n){throw console.error("Erro JSONP (Update BAU):",n),n}},fetchUserProfile:async e=>{try{console.log(`Buscando perfil para: ${e}`);let t=await $t("get_user_profile",{ldap:e});return console.log("Resposta bruta do servidor:",t),t&&t.status==="success"&&t.profile?t.profile:null}catch(t){return console.error("Erro ao buscar perfil:",t),null}},getUserSnippets:async e=>{try{return console.log("Buscando snippets para:",e),await $t("get_user_snippets",{user:e})}catch(t){return console.error("Erro ao carregar snippets:",t),{status:"error",snippets:[]}}},saveSnippet:async(e,t)=>{let a={id:e.id,type:e.type,title:e.title,content:e.content,subject:e.subject||"",isCode:e.isCode,isRich:e.isRich,user:t};try{console.log("Salvando snippet na nuvem:",a);let o=await $t("save_snippet",a);return o&&o.status==="success"}catch(o){return console.error("Erro ao salvar snippet:",o),!1}},deleteSnippet:async(e,t)=>{try{console.log(`Deletando snippet ${e}...`);let a=await $t("delete_snippet",{id:e,user:t});return a&&a.status==="success"}catch(a){return console.error("Erro ao deletar snippet:",a),!1}},getUserPrefs:async e=>{try{let t=await $t("get_user_prefs",{user:e});return t&&t.status==="success"?t.prefs||{}:null}catch(t){return console.warn("Erro ao carregar prefer\xEAncias:",t),null}},saveUserPrefs:async(e,t)=>{try{let a=await $t("save_user_prefs",{user:t,prefs:JSON.stringify(e||{})});return!!(a&&a.status==="success")}catch(a){return console.warn("Erro ao salvar prefer\xEAncias:",a),!1}}},Qr=ke.sendBAUEscalation,Zr=ke.readAgentBAU,Jg=ke.updateBAUStatus,es=ke.updateBAUEscalation,Xa=ke.fetchUserProfile,Qg=ke.getUserSnippets,Zg=ke.saveSnippet,ef=ke.deleteSnippet,tf=ke.getUserPrefs,af=ke.saveUserPrefs;var Ne=e=>new Promise(t=>setTimeout(t,e));function At(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(a=>e.dispatchEvent(new MouseEvent(a,t)))}function xa(e){e&&["mousedown","mouseup","click"].forEach(t=>e.dispatchEvent(new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window})))}function Ht(e,t,a){return Math.max(t,Math.min(e,a))}var ko=0,Ka=0;function Je(){if(ko===0&&(Ka=window.innerWidth-document.documentElement.clientWidth,Ka>0)){let e=parseFloat(getComputedStyle(document.body).paddingRight)||0;document.body.style.paddingRight=`${e+Ka}px`}ko++,document.body.style.overflow="hidden"}function Qe(){if(ko=Math.max(0,ko-1),ko===0&&(document.body.style.overflow="",Ka>0)){let e=parseFloat(getComputedStyle(document.body).paddingRight)||0,t=Math.max(0,e-Ka);document.body.style.paddingRight=t?`${t}px`:"",Ka=0}}var ts=!1;function $p(){if(ts||document.getElementById("cw-filled-check-styles"))return;let e=document.createElement("style");e.id="cw-filled-check-styles",e.textContent=`
        .cw-dopamine-field.filled {
            background-color: #F0FDF4 !important;
            border-color: #86EFAC !important;
            color: #166534;
            padding-right: 36px !important;
        }
        .cw-dopamine-check {
            position: absolute; right: 10px; top: 50%; transform: translateY(-50%) scale(0.5);
            color: #16A34A; width: 16px; height: 16px;
            opacity: 0; pointer-events: none;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .cw-dopamine-check.show { opacity: 1; transform: translateY(-50%) scale(1); }
        @media (prefers-reduced-motion: reduce) {
            .cw-dopamine-check { transition: opacity 0.15s ease !important; }
        }
    `,document.head.appendChild(e),ts=!0}var as=!1;function Pp(){if(as||document.getElementById("cw-empty-state-styles"))return;let e=document.createElement("style");e.id="cw-empty-state-styles",e.textContent=`
        .cw-empty-illustrated { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 12px; padding: 32px 20px; }
        .cw-empty-illustrated-badge { border-radius: 50%; background: #F8F9FA; display: flex; align-items: center; justify-content: center; color: #9AA0A6; flex-shrink: 0; }
        .cw-empty-illustrated-badge svg { width: 44%; height: 44%; }
        .cw-empty-illustrated-title { font-family: 'Google Sans', Roboto, sans-serif; font-size: 15px; font-weight: 600; color: #202124; }
        .cw-empty-illustrated-subtitle { font-size: 12px; color: #5F6368; line-height: 1.5; max-width: 240px; }
    `,document.head.appendChild(e),as=!0}function To({icon:e,title:t,subtitle:a="",size:o=88}){Pp();let n=document.createElement("div");return n.className="cw-empty-illustrated",n.innerHTML=`
        <div class="cw-empty-illustrated-badge" style="width:${o}px;height:${o}px;">${e}</div>
        <div class="cw-empty-illustrated-title">${t}</div>
        ${a?`<div class="cw-empty-illustrated-subtitle">${a}</div>`:""}
    `,n}function un(e,t){e.addEventListener("keydown",a=>{if(a.key!=="ArrowDown"&&a.key!=="ArrowUp")return;let o=document.activeElement;if(!o||!o.matches(t))return;let n=Array.from(e.querySelectorAll(t)).filter(s=>s.offsetParent!==null),i=n.indexOf(o);if(i===-1)return;a.preventDefault();let r=a.key==="ArrowDown"?Math.min(i+1,n.length-1):Math.max(i-1,0);n[r].focus()})}var os=!1;function Bp(){if(os||document.getElementById("cw-pending-field-styles"))return;let e=document.createElement("style");e.id="cw-pending-field-styles",e.textContent=`
        @keyframes cwPendingPulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(251, 188, 5, 0.45); }
            50% { box-shadow: 0 0 0 6px rgba(251, 188, 5, 0); }
        }
        .cw-quicklaunch-pending {
            border-color: #FBBC05 !important;
            animation: cwPendingPulse 1.1s ease-out 2;
        }
        @media (prefers-reduced-motion: reduce) {
            .cw-quicklaunch-pending { animation: none !important; }
        }
    `,document.head.appendChild(e),os=!0}function mn(e,{duration:t=2400}={}){e&&(Bp(),e.classList.add("cw-quicklaunch-pending"),e.scrollIntoView({behavior:"smooth",block:"center"}),e.focus({preventScroll:!0}),setTimeout(()=>e.classList.remove("cw-quicklaunch-pending"),t))}function gn(e,{minLength:t=2}={}){$p();let a=e.parentElement;a&&getComputedStyle(a).position==="static"&&(a.style.position="relative"),e.classList.add("cw-dopamine-field");let o=document.createElement("span");o.className="cw-dopamine-check",o.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',e.insertAdjacentElement("afterend",o);let n=()=>{let i=e.value.trim().length>=t;e.classList.toggle("filled",i),o.classList.toggle("show",i)};e.addEventListener("input",n),n()}function Gp(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim()}var jp={serviceHorizontal:["service horizontal","servico horizontal"],serviceOffering:["service offering","oferta de servicos","oferta de servicios"],specialization:["specialization","especializacao","especializacion"],routingChannel:["routing communication channel","canal de comunicacao de roteamento","canal de comunicacion de enrutamiento"],businessLanguage:["business language","linguagem comercial","idioma comercial"],vendorPartner:["vendor partner","parceiro fornecedor","socio proveedor"],appointmentTasks:["appointment tasks","tarefas de agendamento","tareas de la cita"],salesProgram:["sales program","programa de vendas","programa de ventas"],customerTimezone:["customer time zone","time zone","timezone","fuso horario do cliente","fuso horario","zona horaria del cliente","zona horaria"],externalCustomerId:["google ads external customer id","id de cliente externo do google ads","id de cliente externo de google ads"],additionalInfo:["additional info","informacoes adicionais","informacion adicional"],givenName:["given name","nome dado","nombre"],familyName:["family name","nome de familia","apellido"],contactEmail:["contact email","e-mail de contato","correo electronico de contacto"],loginEmail:["login email","e-mail de login","correo electronico de acceso"],phoneNumber:["phone number","numero de telefone","numero de telefono"],appointmentTime:["appointment time","horario da consulta","hora de la cita"],neoOrg:["neo org"],neoProduct:["neo product","produto neo","producto neo"],website:["website","site","sitio web"],program:["program","programa"],adsBusinessSector:["ads business sector"],interactionType:["interaction type"],salesRegion:["sales region"]},Hp=".form-label, .data-pair-label";function fn(e,t=document){let a=jp[e];if(!a)return null;let o=new Set(a);return Array.from(t.querySelectorAll(Hp)).find(n=>o.has(Gp(n.textContent)))||null}function ns(e){return e?.innerText?.trim()||e?.textContent?.trim()||""}function Oa(e,t=document){let a=fn(e,t);if(!a)return[];let o=a.closest("cuf-form-field");if(o){let s=Array.from(o.querySelectorAll('[debug-id="html-value"]')).map(ns).filter(Boolean);if(s.length)return s}let i=a.closest("home-data-item")?.querySelector(".data-pair-content")||a.parentElement?.querySelector(".data-pair-content")||a.parentElement?.querySelector("sanitized-content")||a.nextElementSibling,r=ns(i);return r?[r]:[]}function Nt(e,t=document){return Oa(e,t)[0]||null}var is=/[A-Za-z0-9._%+-]+@google\.com/g,Up=[/^ads-support@/i,/^noreply@/i,/^no-reply@/i,/-bot@/i],rs=e=>Up.some(t=>t.test(e));function Vp(){return(document.querySelector('[debug-id="assignee"]')?.textContent.trim()||"").replace(/@.*$/,"").toLowerCase()||null}function mi(){let t=document.querySelector('[aria-label^="Signed in as"]')?.getAttribute("aria-label")?.replace(/^Signed in as\s+/i,"").trim();return t?t.toLowerCase():document.querySelector('img.photo[src*="/photos/"]')?.src?.match(/\/photos\/([^?/]+)/)?.[1]?.toLowerCase()||null}function ss(){return document.querySelector(".active-case-log-container")||document}function ls(){return Array.from(ss().querySelectorAll("case-message-view"))}function ui(){let e=new Set([Vp(),mi()].filter(Boolean)),t=ls().flatMap(a=>a.textContent.match(is)||[]).map(a=>a.toLowerCase());return[...new Set(t)].filter(a=>rs(a)?!1:!e.has(a.replace(/@.*$/,"")))}function Wp(e){return(ls().find(o=>/contact us form|formul[áa]rio de contato|formulario de contacto/i.test(o.textContent))?.textContent.match(is)||[]).map(o=>o.toLowerCase()).find(o=>e.includes(o))||null}function Yp(){let e=document.querySelectorAll("internal-user-info");if(e.length!==1)return null;let t=e[0].querySelector(".email")?.textContent.trim().toLowerCase();return t&&!rs(t)?t:null}async function Xp(){let e=Array.from(ss().querySelectorAll(".message-header")).filter(t=>t.getAttribute("aria-expanded")==="false");for(let t of e)if(xa(t),await Ne(400),ui().length)return}async function cs({expandir:e=!0}={}){let t=ui(),a="case-log-visivel";!t.length&&e&&(await Xp(),t=ui(),a="case-log-expandido");let o=null;return t.length===1?o=t[0]:t.length>1&&(o=Wp(t),a=o?"contact-us-form":a),o||(o=Yp(),a=o?"internal-user-info":"nao-resolvido"),{email:o||null,origem:a}}var wa=e=>document.querySelector(`[debug-id="${e}"]`)?.textContent.replace(/\s+/g," ").trim()||null;function Kp(){return document.querySelector('[debug-id="case-summary-input"] input')?.value.trim()||null}function ds(){return{titulo:Kp(),estado:wa("state-button"),slaRotulo:wa("due-in-label"),slaTexto:wa("due-in-text"),criadoEm:wa("date-created-value"),tier:wa("badge-text"),programaBadge:wa("sales-program-badge"),paisCobranca:wa("adwords-billing-country"),assignee:wa("assignee")}}var Jp=/[A-Za-z0-9._%+-]+@google\.com/;function Qp(){return Array.from(document.querySelectorAll("case-message-view")).map(e=>e.textContent.replace(/\s+/g," ").trim())}var bn=e=>Qp().find(t=>e.test(t))||null;function Zp(){let e=bn(/appointment has been successfully created|agendamento foi criado/i);if(!e)return null;let t=e.match(/on ([A-Z][a-z]+ \d{1,2}) at ([\d:]+\s?[AP]M)/i),a=e.match(/\[([^\]]+)\]/),o=e.match(Jp);return{data:t?.[1]||null,hora:t?.[2]||null,timezone:a?.[1]||null,designado:o?.[0]||null}}function eu(){let e=bn(/\bTransfer\b|\bTransferência\b/i);if(!e)return null;let t=e.match(/(?:Transfer|Transferência)\s+(?:From|De)\s+(.+?)\s+(?:to|para)\s+(.+?)(?:\.\.\.|$)/i);return t?{de:t[1].trim(),para:t[2].trim()}:null}function tu(){let e=bn(/appointment .*was (?:automatically )?canceled|foi cancelad/i);if(!e)return null;let t=e.match(/\(Reason:\s*([^)]+)\)/i),a=e.match(/AppointmentId=\s*(\d+)\s*\)/i);return{motivo:t?.[1].trim()||null,appointmentId:a?.[1]||null}}function au(){let e=bn(/\bDiscard\b|\bDescarte\b/i);if(!e)return null;let t=e.match(/(?:Discard|Descarte)\s+(.+?)(?:\.\.\.|$)/i);return t?{motivo:t[1].trim()}:null}function ps(){return{agendamento:Zp(),transferencia:eu(),cancelamento:tu(),descarte:au()}}var No="Consultor",ya="",qa="",Lo=null;async function Io(){try{if(!document.querySelector(".translated-form"))return!0;let e=document.querySelector('material-button[debug-id="toggle-translation-button"]');if(!e)return!1;console.log("TechSol: Tradu\xE7\xE3o detectada. Revertendo para o idioma original..."),e.click();for(let t=0;t<20;t++){if(!document.querySelector(".translated-form"))return!0;await Ne(100)}return console.warn("TechSol: tradu\xE7\xE3o n\xE3o reverteu; seguindo pelos r\xF3tulos traduzidos."),!1}catch(e){return console.warn("TechSol: Erro ao tentar reverter tradu\xE7\xE3o:",e),!1}}async function _o(){if(ya&&qa)return ya;let e=mi();e&&!qa&&(qa=`${e}@google.com`);let t=e?e.split(/[._-]/)[0].replace(/^./,a=>a.toUpperCase()):null;try{let a=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!a)return ya=t||No,ya;a.click(),await Ne(150);let o=t||No,n=document.querySelector("profile-details .name");if(n){let s=n.textContent.trim().split(" ")[0];s&&(o=s.charAt(0).toUpperCase()+s.slice(1).toLowerCase())}let i=document.querySelector("profile-details .email");return i&&(qa=i.textContent.trim(),console.log("TechSol: Identidade confirmada ->",qa)),a.click(),document.body.click(),ya=o,o}catch(a){return console.warn("Sherlock falhou:",a),ya=t||No,ya}}function Do(){return ya||No}function it(){return qa||null}var us={pt:{morning:"Bom dia",afternoon:"Boa tarde",evening:"Boa noite",friday:"\u{1F389} Sextou!",fallbackName:"Consultor",night:["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."],mondayMorning:["Vamos definir o tom da semana.","Nova semana, novas conquistas."],fridayMorning:["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."],weekdayMorning:["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."],afternoonPhrases:["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."],eveningPhrases:["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],weekend:["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]},es:{morning:"Buenos d\xEDas",afternoon:"Buenas tardes",evening:"Buenas noches",friday:"\u{1F389} \xA1Es viernes!",fallbackName:"Consultor",night:["Guerrero de la madrugada.","El mundo duerme, t\xFA avanzas.","Enfoque total."],mondayMorning:["Vamos a marcar el ritmo de la semana.","Nueva semana, nuevos logros."],fridayMorning:["El \xFAltimo empuj\xF3n antes del descanso.","Cerremos con broche de oro."],weekdayMorning:["Que tu d\xEDa sea productivo.","Enfoque y caf\xE9 para hoy."],afternoonPhrases:["Mant\xE9n el ritmo.","Una tarde productiva por delante.","Seguimos avanzando."],eveningPhrases:["Cerrando el d\xEDa con productividad.","Excelente dedicaci\xF3n."],weekend:["Tu dedicaci\xF3n el fin de semana es inspiradora.","Trabajo excepcional."]},en:{morning:"Good morning",afternoon:"Good afternoon",evening:"Good evening",friday:"\u{1F389} It's Friday!",fallbackName:"Consultant",night:["Night owl mode on.","The world sleeps, you move forward.","Full focus."],mondayMorning:["Let's set the tone for the week.","New week, new wins."],fridayMorning:["Last push before the break.","Let's close the week strong."],weekdayMorning:["Have a productive day.","Focus and coffee for today."],afternoonPhrases:["Keep the pace.","A productive afternoon ahead.","We keep moving forward."],eveningPhrases:["Wrapping up the day productively.","Excellent dedication."],weekend:["Your weekend dedication is inspiring.","Outstanding work."]}};function ms(e){let t=us[ge()]||us.pt,a=new Date,o=a.getHours(),n=a.getDay(),i,r="";o>=5&&o<12?(i=t.morning,r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(i=t.afternoon,r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(i=t.evening,r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let s=[];o>=0&&o<5?s=t.night:o<12?n===1?s=t.mondayMorning:n===5?s=t.fridayMorning:s=t.weekdayMorning:o<18?s=t.afternoonPhrases:s=t.eveningPhrases,(n===0||n===6)&&(s=t.weekend);let l=s[Math.floor(Math.random()*s.length)];return{prefix:`${i},`,name:e===No?t.fallbackName:e,suffix:l,icon:r,isFriday:n===5,fridayBadge:t.friday}}async function gi(){try{let e=fn("contactEmail");if(!e)return null;let t=e.closest("cuf-form-field")||e.parentElement,a=t.querySelector(".unmask-button")||t.querySelector('[aria-label="Click to view"]');a&&(a.click(),await Ne(500));let o=Nt("contactEmail");return o&&o.includes("@")&&!o.includes("Is this:")?o.trim():null}catch(e){return console.warn("Erro ao capturar email do cliente:",e),null}}function ou(e){let t=String(e||"").trim();if(!t||t.length>30||/^phone$/i.test(t)||t.includes("Is this:")||!/^[\d\s()+\-.]+$/.test(t))return!1;let a=t.replace(/\D/g,"");return a.length>=8&&a.length<=15}async function fi(){try{let e=fn("phoneNumber");if(!e)return null;let t=e.closest("cuf-form-field")||e.parentElement;if(!t)return null;let a=t.querySelector(".unmask-button")||t.querySelector('[aria-label="Click to view"]');a&&(a.click(),await Ne(500));let o=Nt("phoneNumber");return ou(o)?o.trim():null}catch(e){return console.warn("Erro ao capturar telefone do cliente:",e),null}}async function nu(e){try{return await cs(e)}catch(t){return console.warn("Erro ao resolver AM:",t),{email:null,origem:"erro"}}}function Fa(){try{let e=Nt("externalCustomerId");if(!e)return"N/A";let t=e.replace(/\D/g,"");return t.length!==10?"N/A":t.replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(e){console.warn("Erro ao capturar CID:",e)}return"N/A"}function iu(e){return e?.email||null}function ru(){try{return Nt("customerTimezone")}catch(e){console.warn("Erro ao capturar Timezone:",e)}return null}async function Ja(){try{let t=document.querySelector('[debug-id="case-id"]')?.textContent?.match(/\d-\d{6,}/)?.[0];return t||window.location.href.split("/").pop()||"---"}catch(e){return console.warn("Falha ao capturar Case ID:",e),"---"}}function bi(){try{return Nt("salesProgram")||""}catch(e){console.warn("Erro ao capturar Sales Program:",e)}return""}function su(){try{return Nt("familyName")||""}catch(e){console.warn("Falha Sobrenome:",e)}return""}function hn(){try{return Nt("businessLanguage")||"N/A"}catch(e){console.warn("Erro ao capturar Idioma:",e)}return"N/A"}function lu(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(a=>a.textContent.includes("Speakeasy ID")||a.textContent.includes("SE ID"));if(t){let a=t.closest(".data-pair")||t.parentElement,o=a.querySelector(".data-pair-content")||a.nextElementSibling;if(o&&o.textContent.trim())return o.textContent.trim()}}catch(e){console.warn("Erro ao capturar SE ID:",e)}return"N/A"}function gs(e){e&&(Lo=e)}function Mo(){let e=String(Lo?.defaultLanguage||"").toUpperCase();return{ES:"ES",EN:"EN"}[e]||"PT"}async function Ut(){await Io(),qa||await _o();let e=Nt("givenName")||"Cliente",t=Nt("website")||"",a=Oa("appointmentTasks"),[o,n]=await Promise.all([gi(),fi()]),i=await nu(),r=Fa(),s=iu(i),l=ru(),p=ds(),c=ps(),m=await Ja(),u=bi(),h=hn(),L=lu(),S=su(),C=it();if(C&&!Lo){let D=C.split("@")[0];try{Lo=await Xa(D)}catch(G){console.warn("Falha ao carregar perfil do usu\xE1rio:",G)}}return{advertiserName:e,websiteUrl:t,clientEmail:o,internalEmail:i.email,cid:r,amName:s,amEmail:i.email,amOrigem:i.origem,appointmentTasks:a,caseContext:p,caseLog:c,timezone:l,agentName:Do(),agentEmail:it(),caseId:m,userProfile:Lo,advName:e,site:t,website:t,email:o,advEmail:o,salesProgram:u,language:h,seId:L,advLastName:S,advPhone:n}}var Ra=null,hi=null,Oo=null,vi=0,Vt=.3;var Pt=localStorage.getItem("cw_sounds_muted")==="true";function ia(){if(!Ra){let e=window.AudioContext||window.webkitAudioContext;e&&(Ra=new e)}return Ra&&Ra.state==="suspended"&&Ra.resume(),Ra}function fs(e){if(hi)return hi;let t=e.sampleRate*2,a=e.createBuffer(1,t,e.sampleRate),o=a.getChannelData(0);for(let n=0;n<t;n++)o[n]=Math.random()*2-1;return hi=a,a}var w={setMuted:e=>{Pt=e,localStorage.setItem("cw_sounds_muted",e)},isMuted:()=>Pt,playClick:()=>{if(Pt)return;let e=ia();if(!e)return;let t=e.currentTime,a=e.createBufferSource();a.buffer=fs(e);let o=e.createBiquadFilter();o.type="highpass",o.frequency.value=4e3;let n=e.createGain();n.gain.setValueAtTime(Vt*.8,t),n.gain.exponentialRampToValueAtTime(.001,t+.015),a.connect(o),o.connect(n),n.connect(e.destination),a.start(t),a.stop(t+.02)},playHover:()=>{if(Pt)return;let e=ia();if(!e)return;let t=e.currentTime,a=e.createOscillator();a.type="sine",a.frequency.setValueAtTime(400,t);let o=e.createGain();o.gain.setValueAtTime(0,t),o.gain.linearRampToValueAtTime(Vt*.1,t+.005),o.gain.linearRampToValueAtTime(0,t+.02),a.connect(o),o.connect(e.destination),a.start(t),a.stop(t+.03)},playSuccess:()=>{if(Pt)return;let e=ia();if(!e)return;let t=e.currentTime;[1046.5,1567.9].forEach((o,n)=>{let i=e.createOscillator(),r=e.createGain();i.type="sine",i.frequency.value=o,r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(Vt*.6,t+.05),r.gain.exponentialRampToValueAtTime(.001,t+.6),i.connect(r),r.connect(e.destination),i.start(t),i.stop(t+.7)})},playGenieOpen:()=>{if(Pt)return;let e=ia();if(!e)return;let t=e.currentTime,a=e.createBufferSource();a.buffer=fs(e);let o=e.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(100,t),o.frequency.exponentialRampToValueAtTime(800,t+.2);let n=e.createGain();n.gain.setValueAtTime(0,t),n.gain.linearRampToValueAtTime(Vt*.5,t+.05),n.gain.linearRampToValueAtTime(0,t+.25),a.connect(o),o.connect(n),n.connect(e.destination),a.start(t),a.stop(t+.3)},playError:()=>{if(Pt)return;let e=ia();if(!e)return;let t=e.currentTime,a=e.createOscillator(),o=e.createGain();a.type="triangle",a.frequency.setValueAtTime(120,t),a.frequency.exponentialRampToValueAtTime(80,t+.1),o.gain.setValueAtTime(Vt,t),o.gain.exponentialRampToValueAtTime(.001,t+.15),a.connect(o),o.connect(e.destination),a.start(t),a.stop(t+.2)},playStartup:()=>{if(Pt)return;let e=ia();if(!e)return;let t=e.currentTime,a=.12,o=e.createOscillator(),n=e.createGain(),i=e.createBiquadFilter();o.type="square",o.frequency.setValueAtTime(400,t),o.frequency.exponentialRampToValueAtTime(50,t+.1),i.type="lowpass",i.frequency.setValueAtTime(800,t),i.frequency.exponentialRampToValueAtTime(100,t+.1),n.gain.setValueAtTime(Vt*4,t),n.gain.exponentialRampToValueAtTime(.001,t+.1),o.connect(i),i.connect(n),n.connect(e.destination),o.start(t),o.stop(t+.12);let r=e.createOscillator(),s=e.createGain();r.type="sine",r.frequency.setValueAtTime(150,t),r.frequency.exponentialRampToValueAtTime(50,t+.15),s.gain.setValueAtTime(Vt*1.5,t),s.gain.exponentialRampToValueAtTime(.001,t+.15),r.connect(s),s.connect(e.destination),r.start(t),r.stop(t+.15),[55,55.4,110.5].forEach(p=>{let c=e.createOscillator(),m=e.createGain(),u=e.createBiquadFilter();c.type="sawtooth",c.frequency.value=p,u.type="lowpass",u.frequency.setValueAtTime(30,t),u.frequency.linearRampToValueAtTime(900,t+a+.2),u.frequency.exponentialRampToValueAtTime(40,t+3),m.gain.setValueAtTime(0,t),m.gain.linearRampToValueAtTime(Vt*.6,t+a+.1),m.gain.exponentialRampToValueAtTime(.001,t+3.5),c.connect(u),u.connect(m),m.connect(e.destination),c.start(t),c.stop(t+3.6)})},playNotification:()=>{if(Pt)return;let e=ia();if(!e)return;let t=e.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(o=>{let n=e.createOscillator(),i=e.createGain();n.type="sine",n.frequency.setValueAtTime(o.freq,t),i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(Vt*o.vol,t+.004),i.gain.exponentialRampToValueAtTime(.001,t+o.dur),n.connect(i),i.connect(e.destination),n.start(t),n.stop(t+o.dur+.1)})},playReady:()=>{if(Pt)return;let e=ia();if(!e)return;let t=e.currentTime;[{freq:587.33,at:0,dur:.2,vol:.26},{freq:880,at:.09,dur:.3,vol:.3},{freq:1760,at:.09,dur:.26,vol:.08}].forEach(o=>{let n=e.createOscillator(),i=e.createGain();n.type="sine",n.frequency.value=o.freq;let r=t+o.at;i.gain.setValueAtTime(0,r),i.gain.linearRampToValueAtTime(Vt*o.vol,r+.02),i.gain.exponentialRampToValueAtTime(.001,r+o.dur),n.connect(i),i.connect(e.destination),n.start(r),n.stop(r+o.dur+.05)})},playNotice:()=>{if(Pt)return;let e=ia();if(!e)return;let t=e.currentTime;[{freq:783.99,at:0,dur:.22,vol:.2},{freq:659.25,at:.11,dur:.34,vol:.18}].forEach(o=>{let n=e.createOscillator(),i=e.createGain();n.type="sine",n.frequency.value=o.freq;let r=t+o.at;i.gain.setValueAtTime(0,r),i.gain.linearRampToValueAtTime(Vt*o.vol,r+.02),i.gain.exponentialRampToValueAtTime(.001,r+o.dur),n.connect(i),i.connect(e.destination),n.start(r),n.stop(r+o.dur+.05)})},startThinking:()=>{if(Pt)return;let e=ia();if(!e||Oo)return;let t=[523.25,659.25,783.99];vi=0;let a=()=>{if(Pt)return;let o=e.currentTime,n=e.createOscillator(),i=e.createGain();n.type="sine",n.frequency.setValueAtTime(t[vi%t.length],o),i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(Vt*.15,o+.02),i.gain.exponentialRampToValueAtTime(.001,o+.22),n.connect(i),i.connect(e.destination),n.start(o),n.stop(o+.25),vi++};a(),Oo=setInterval(a,370)},stopThinking:()=>{Oo&&(clearInterval(Oo),Oo=null)},playSwoosh:()=>{w.playGenieOpen()},playReset:()=>{w.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let e=0,t=50;document.addEventListener("mouseover",a=>{if(!Ra)return;let o=a.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!o||o.contains(a.relatedTarget))return;let n=Date.now();n-e<t||(w.playHover(),e=n)},{passive:!0})}};var gt={MODULE_RESTING:2147483640,MODULE_FOCUSED:2147483641,PAGE_SPOTLIGHT_OVERLAY:2147483642,PAGE_SPOTLIGHT_TARGET:2147483643,TOAST:2147483644,FOCUS_BACKDROP:2147483646,TOP:2147483647};var bs=["lucaste","ricardogi"],Qa="https://docs.google.com/forms/d/1v8mi4eLmx3a2GX2lEMmxMDR2n8AdzGL9WP_p_YEaveg/viewform",vn="https://docs.google.com/presentation/d/1EOBUyK0xK2hXv29939NjIEJpgHsKeNG37HHgI8jWTc0/preview?resourcekey=0-_ct0TKJgzoEhOkhlxz6ZbA",Wt="@lucaste";var xi=gt.MODULE_RESTING;function ys(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
        :root {
            --cw-primary: #1a73e8;
            --cw-primary-hover: #1557b0;
            --cw-surface: #ffffff;
            --cw-surface-glass: rgba(255, 255, 255, 0.95);
            --cw-border: #dadce0;
            --cw-text: #202124;
            --cw-text-sub: #5f6368;
            --cw-ease-elastic: cubic-bezier(0.25, 0.8, 0.25, 1);

            /* --- TOKENS DE MOVIMENTO --- */
            /* 4 curvas can\xF4nicas, escolhidas a partir das que j\xE1 dominavam o
               projeto (por contagem de uso) - n\xE3o curvas novas. O resto do
               c\xF3digo tinha ~15 variantes cubic-bezier distintas, v\xE1rias delas
               diferindo por 1 d\xEDgito sem nenhuma escolha deliberada por tr\xE1s
               (ex: 0.2,0.8,0.2,1 vs 0.25,0.8,0.25,1, usadas quase o mesmo
               n\xFAmero de vezes em arquivos que nunca se falaram). Todo c\xF3digo
               novo deveria escolher entre essas 4 em vez de inventar mais uma. */
            --cw-ease-standard: cubic-bezier(0.4, 0, 0.2, 1);      /* Material padr\xE3o - j\xE1 a curva mais usada do projeto */
            --cw-ease-decelerate: cubic-bezier(0.19, 1, 0.22, 1);  /* Entrada - a curva do genie abrindo */
            --cw-ease-accelerate: cubic-bezier(0.5, 0, 1, 1);      /* Sa\xEDda - a curva do genie fechando */
            --cw-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);   /* Bounce/overshoot - j\xE1 \xE9 o EASE de notes-styles.js */
        }

        /* RESET DE BOX MODEL (Escopado s\xF3 ao app, nunca ao CRM host) */
        /* Sem isso, qualquer elemento com width + padding "estoura" o container,
           porque o padding some do c\xE1lculo em vez de ser inclu\xEDdo na largura. */
        .cw-pill, .cw-pill *,
        .cw-module-window, .cw-module-window * {
            box-sizing: border-box;
        }

        /* Rollbar e Ajustes Globais */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.4); }

        /* FONTE GOOGLE OFICIAL & RENDERING APPLE */
        body, button, input, select, textarea, .cw-pill, .cw-module, .cw-btn::after {
            font-family: 'Google Sans', 'Roboto', sans-serif !important;
            -webkit-font-smoothing: antialiased;
        }

        /* FOCUS STATES (Anel Google) */
        input:focus, textarea:focus, select:focus {
            outline: none !important;
            border-color: var(--cw-primary) !important;
            box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2) !important;
        }

        /* FEEDBACK T\xC1TIL GLOBAL (Clique F\xEDsico) */
        button:active, .cw-clickable:active {
            transform: scale(0.96) translateY(1px);
            transition: transform 0.1s var(--cw-ease-elastic);
        }

        textarea.bullet-textarea { padding-left: 10px; }

        /* Classes utilit\xE1rias do Script Assistant (Refinadas) */
        .csa-group-container { border-left: 3px solid transparent; padding-left: 8px; transition: all 0.3s ease-out; }
        .csa-group-title { transition: color 0.3s ease-out; }
        .csa-group-container.csa-group-completed { border-left: 3px solid #34a853; }
        .csa-group-container.csa-group-completed .csa-group-title { color: #34a853; }

        .csa-li {
            margin: 6px 0 !important;
            padding: 10px 12px; border-radius: 8px;
            border: 1px solid transparent;
            transition: all 0.2s var(--cw-ease-elastic);
            font-size: 14px; cursor: pointer; user-select: none;
            background-color: #f8f9fa; color: var(--cw-text); line-height: 1.4;
            text-decoration: none; transform: scale(1);
        }
        .csa-li:hover {
            background-color: #e8f0fe;
            color: var(--cw-primary);
            transform: translateX(4px);
        }
        .csa-li.csa-completed {
            text-decoration: line-through;
            color: var(--cw-text-sub);
            opacity: 0.7;
            background: transparent;
            border: 1px dashed var(--cw-border);
        }

        /* Classe base para todos os selects do projeto */
    .cw-select {
        /* 1. Resetando o estilo nativo (O segredo) */
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;

        /* 2. Dimens\xF5es e Fonte */
        width: 100%;
        padding: 10px 36px 10px 12px; /* Espa\xE7o extra na direita para a seta */
        font-family: 'Google Sans', Roboto, Arial, sans-serif;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.5;
        color: #3C4043; /* Google Grey 800 */

        /* 3. A Caixa (Material Design) */
        background-color: #FFFFFF;
        border: 1px solid #DADCE0; /* Borda suave */
        border-radius: 6px; /* Canto levemente arredondado */
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

        /* 4. A Seta Customizada (SVG via Data URI) */
        /* Isso desenha um chevron cinza escuro, igual ao do Gmail */
        background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235F6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");
        background-repeat: no-repeat;
        background-position: right 8px center;
        background-size: 18px;
    }

    /* Hover: Escurece levemente a borda e o fundo */
    .cw-select:hover {
        border-color: #202124;
        background-color: #F8F9FA;
    }

    /* Focus: O anel azul caracter\xEDstico do Google */
    .cw-select:focus {
        border-color: #1A73E8;
        box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
        outline: none;
        background-color: #FFFFFF;
    }

    /* Disabled: Visual apagado */
    .cw-select:disabled {
        background-color: #F1F3F4;
        color: #9AA0A6;
        cursor: not-allowed;
        background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239AA0A6%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");
    }

    /* Label flutuante (Opcional, se voc\xEA usar labels acima dos selects) */
    .cw-input-label {
        display: block;
        font-size: 12px;
        font-weight: 700;
        color: #5F6368;
        margin-bottom: 6px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
        /* Container do Dropdown Customizado */
.cw-dropdown-container {
    position: relative;
    width: 100%;
    font-family: 'Google Sans', Roboto, sans-serif;
}

/* O Bot\xE3o (A caixa fechada) */
.cw-dropdown-trigger {
    background: #fff;
    border: 1px solid #DADCE0;
    border-radius: 6px;
    padding: 10px 12px;
    font-size: 14px;
    color: #3C4043;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s;
}
.cw-dropdown-trigger:hover { background: #F8F9FA; border-color: #202124; }
.cw-dropdown-trigger.active {
    border-color: #1A73E8;
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
}
.cw-dropdown-trigger.disabled {
    background: #F1F3F4; color: #9AA0A6; pointer-events: none;
}

/* A Seta */
.cw-dropdown-arrow {
    width: 18px; height: 18px;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235F6368' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: center;
    transition: transform 0.2s;
}
.cw-dropdown-trigger.active .cw-dropdown-arrow { transform: rotate(180deg); }

/* A Lista (O menu aberto) */
.cw-dropdown-menu {
    position: absolute;
    top: 100%; left: 0; width: 100%;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 4px 6px rgba(32,33,36,0.28);
    margin-top: 4px;
    padding: 6px 0;
    z-index: 9999;
    display: none;
    max-height: 250px;
    overflow-y: auto;
    opacity: 0; transform: translateY(-10px);
    transition: opacity 0.2s, transform 0.2s;
}
.cw-dropdown-menu.open {
    display: block;
    opacity: 1; transform: translateY(0);
}

/* As Op\xE7\xF5es */
.cw-dropdown-option {
    padding: 10px 16px;
    font-size: 14px;
    color: #3C4043;
    cursor: pointer;
    transition: background 0.1s;
}
.cw-dropdown-option:hover { background-color: #F1F3F4; }
.cw-dropdown-option.selected {
    color: #1A73E8;
    background-color: #E8F0FE;
    font-weight: 500;
}

/* Sistema de di\xE1logo (alertDialog/confirmDialog/promptDialog): \xE9 o ponto de
   maior consequ\xEAncia do app - toda a\xE7\xE3o destrutiva passa por aqui, v\xE1rias
   vezes por turno - e n\xE3o tinha nenhuma prote\xE7\xE3o de reduced-motion, ao
   contr\xE1rio da p\xEDlula (a mais bem coberta do projeto). O overlay usa a
   classe .cw-dialog-overlay (createBaseOverlay em utils.js); a caixa do
   di\xE1logo \xE9 sempre o filho direto dela. */
@media (prefers-reduced-motion: reduce) {
    .cw-dialog-overlay { transition: opacity 0.15s ease !important; }
    .cw-dialog-overlay > div { transition: opacity 0.15s ease !important; transform: none !important; }
}
    `,document.head.appendChild(t)}var hs={confirma:10,erro:[10,40,10],concluido:[10,30,10]};function za(e="confirma"){if(!navigator.vibrate)return!1;try{return navigator.vibrate(hs[e]??hs.confirma)}catch{return!1}}function ne(e,t={}){let a=document.createElement("div"),o=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(a.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:String(gt.TOAST),opacity:"0",transition:"all 0.4s var(--cw-ease-spring)",pointerEvents:"none"}),a.textContent=e,document.body.appendChild(a),t.error?w.playError():w.playSuccess(),requestAnimationFrame(()=>{a.style.opacity="1",a.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{a.style.opacity="0",a.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>a.remove(),400)},t.duration||4e3)}function Ss(e,t=null){let a=0,o=0,n=0,i=0,r=t||e;r.style.cursor="grab",r.onmousedown=s;function s(c){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(c.target.tagName)||c.target.closest(".no-drag"))return;c=c||window.event,r.style.cursor="grabbing",e.style.transition="none";let m=e.getBoundingClientRect();e.style.transform="none",e.style.left=m.left+"px",e.style.top=m.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",xi=Math.min(xi+1,gt.MODULE_FOCUSED),e.style.zIndex=xi,n=c.clientX,i=c.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=p,document.onmousemove=l}function l(c){c=c||window.event,c.preventDefault(),a=n-c.clientX,o=i-c.clientY,n=c.clientX,i=c.clientY;let m=e.offsetTop-o,u=e.offsetLeft-a,h=16,L=window.innerWidth,S=window.innerHeight,C=e.offsetWidth,D=e.offsetHeight;u=Ht(u,h,L-C-h),m=Ht(m,h,S-D-h),e.style.top=m+"px",e.style.left=u+"px"}function p(){document.onmouseup=null,document.onmousemove=null,r.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s var(--cw-ease-decelerate), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var ft={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:String(gt.MODULE_RESTING),overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08),
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var yi={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Cs={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var As={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var vs=!1;function cu(){if(vs||document.getElementById("techsol-google-styles"))return;let e=document.createElement("style");e.id="techsol-google-styles",e.innerHTML=`
        @keyframes google-pulse-ring {
            0% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.7); }
            25% { box-shadow: 0 0 0 10px rgba(234, 67, 53, 0); }
            50% { box-shadow: 0 0 0 20px rgba(251, 188, 5, 0); }
            100% { box-shadow: 0 0 0 30px rgba(52, 168, 83, 0); }
        }
        .google-animate-click { animation: google-pulse-ring 0.6s var(--cw-ease-spring); }
        .google-active-state { position: relative !important; overflow: visible !important; }
        .google-active-state::before {
            content: ''; position: absolute; top: -1px; left: -1px; right: -1px; bottom: -1px; border-radius: 50%;
            background: conic-gradient(from 0deg, #4285F4, #EA4335, #FBBC05, #34A853, #4285F4); z-index: -1; opacity: 0.25; filter: blur(3px);
        }
    `,document.head.appendChild(e),vs=!0}function Es(e){cu(),e.classList.remove("google-animate-click"),e.offsetWidth,e.classList.add("google-animate-click"),setTimeout(()=>{e.classList.remove("google-animate-click")},600)}async function du(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let a=e.querySelector(".cursor");await Ne(200);for(let o=0;o<t.length;o++){let n=t.charAt(o),i=document.createElement("span");i.textContent=n,a&&a.parentNode===e?a.before(i):e.appendChild(i);let r=Math.floor(Math.random()*60)+30;o===0&&(r=150),o>t.length-3&&(r=30),await Ne(r)}await Ne(600),a&&(a.style.display="none")}async function Si(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
            /* Google Sans j\xE1 vem via <link> logo acima em initGlobalStylesAndFont(),
               chamada antes da splash - esse @import era uma 3a requisi\xE7\xE3o redundante
               pra fonte (a 1a \xE9 o <link>, a 2a era o do command-center.js). */
            .splash-container { font-family: 'Google Sans', sans-serif; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #202124; z-index: ${gt.TOP}; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1); }
            .splash-exit { animation: focus-out 0.9s cubic-bezier(0.4, 0.0, 0.2, 1) forwards; }
            @keyframes focus-out { 0% { opacity: 1; transform: scale(1); filter: blur(0); } 100% { opacity: 0; transform: scale(1.15); filter: blur(15px); } }

            .sentence-wrapper { display: flex; flex-wrap: wrap; justify-content: center; align-items: baseline; gap: 10px; max-width: 80%; position: relative; }
            .text-part { font-size: 32px; color: #E8EAED; opacity: 0; transition: opacity 0.8s ease; }
            .text-name { font-size: 32px; font-weight: 700; background: linear-gradient(90deg, #8AB4F8, #C58AF9, #F28B82); -webkit-background-clip: text; -webkit-text-fill-color: transparent; opacity: 0; }
            .text-footer { font-size: 20px; color: #9AA0A6; font-weight: 400; width: 100%; text-align: center; margin-top: 12px; opacity: 0; transform: translateY(10px); transition: all 1s cubic-bezier(0.0, 0.0, 0.2, 1); }

            .sextou-badge { display: inline-flex; align-items: center; gap: 6px; margin-top: 16px; padding: 6px 16px; border-radius: 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #F28B82; font-size: 14px; font-weight: 500; opacity: 0; transform: scale(0.8); transition: all 1s var(--cw-ease-spring); }
            .cursor { color: #8AB4F8; -webkit-text-fill-color: #8AB4F8; font-weight: 100; margin-left: 1px; animation: blink 1s infinite; }

            .brand-logo { position: absolute; top: 40px; font-size: 20px; font-weight: 500; color: #5f6368; letter-spacing: 1px; text-transform: uppercase; opacity: 0; animation: fade-in-down 0.8s ease forwards; }
            .weather-icon { width: 42px; height: 42px; margin-bottom: 24px; opacity: 0; transform: scale(0.8); transition: all 0.6s var(--cw-ease-spring); }
            .credit-pro { position: absolute; bottom: 30px; font-size: 11px; color: #5f6368; letter-spacing: 0.5px; opacity: 0; animation: fade-in-simple 1.5s ease 1s forwards; }
            .credit-pro span { color: #8AB4F8; font-weight: 500; opacity: 0.9; }

            .loader-line { position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853); transform: scaleX(0); transform-origin: left; animation: load-line 4s linear forwards; }

            @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            @keyframes fade-in-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes load-line { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
            @keyframes fade-in-simple { to { opacity: 1; } }

            /* A primeira tela que qualquer agente v\xEA, todo santo dia - e n\xE3o
               tinha nenhuma prote\xE7\xE3o de reduced-motion, apesar de combinar
               blur(15px) + scale(1.15) na sa\xEDda (o efeito de "zoom" mais
               forte do app inteiro) e um cursor piscando em loop infinito. */
            @media (prefers-reduced-motion: reduce) {
                .splash-container { transition: opacity 0.2s ease !important; }
                .splash-exit { animation: fade-out-simple 0.2s ease forwards !important; }
                @keyframes fade-out-simple { to { opacity: 0; } }
                .text-footer { transition: opacity 0.3s ease !important; transform: none !important; }
                .sextou-badge, .weather-icon { transition: opacity 0.2s ease !important; transform: none !important; }
                .cursor { animation: none !important; opacity: 1 !important; }
            }
        `,document.head.appendChild(t)}let e=document.createElement("div");e.id="techsol-splash-screen",e.className="splash-container",e.innerHTML=`
        <div class="brand-logo">Case Wizard</div>
        <div id="w-icon"></div>
        <div class="sentence-wrapper">
            <div id="p1" class="text-part"></div>
            <div id="p2" class="text-name"></div>
            <div id="p3" class="text-footer"></div>
            <div id="p-sextou" style="width: 100%; text-align: center; display: none;">
                <div class="sextou-badge"></div>
            </div>
        </div>
        <div class="credit-pro">created by <span>${Wt}</span></div>
        <div class="loader-line"></div>
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await Ne(200);let t=await _o(),a=ms(t),o=e.querySelector("#w-icon"),n=e.querySelector("#p1"),i=e.querySelector("#p2"),r=e.querySelector("#p3"),s=e.querySelector("#p-sextou");o&&(o.innerHTML=a.icon),n&&(n.textContent=a.prefix),r&&(r.textContent=a.suffix),await Ne(300);let l=o?o.querySelector("svg"):null;if(l&&(l.style.opacity="1",l.style.transform="scale(1)"),await Ne(400),n&&(n.style.opacity="1"),w.playStartup(),i&&await du(i,a.name),r&&(r.style.opacity="1",r.style.transform="translateY(0)"),a.isFriday&&s){await Ne(400),s.style.display="block",s.offsetWidth;let p=s.querySelector(".sextou-badge");p&&(p.textContent=a.fridayBadge,p.style.opacity="1",p.style.transform="scale(1)")}await Ne(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await Ne(900),e.parentNode&&e.parentNode.removeChild(e)}}function ks(e){if(!e)return;let t=e.getBoundingClientRect(),a=window.innerWidth,o=window.innerHeight,n=24,i=a-t.width-n,r=o-t.height-n,s=parseFloat(e.style.left)||t.left,l=parseFloat(e.style.top)||t.top,p=Ht(s,n,i),c=Ht(l,n,r);if(p!==s||c!==l){let m=e.style.transition;e.style.transition="left 0.3s var(--cw-ease-elastic), top 0.3s var(--cw-ease-elastic)",e.style.left=`${p}px`,e.style.top=`${c}px`,setTimeout(()=>{e.style.transition=m},300)}}var Yt={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Xt(e,t){t.onmousedown=a;function a(o){o.stopPropagation(),o.preventDefault();let n=e.style.transition;e.style.transition="none";let i=o.clientX,r=o.clientY,s=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),l=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),p=i,c=r,m=!1;function u(S){p=S.clientX,c=S.clientY,m||(window.requestAnimationFrame(()=>{h(),m=!1}),m=!0)}function h(){let S=s+(p-i),C=l+(c-r);S>360&&(e.style.width=S+"px"),C>300&&(e.style.height=C+"px")}function L(){document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",L),setTimeout(()=>{e.style.transition=n},50)}document.addEventListener("mousemove",u),document.addEventListener("mouseup",L)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}var xs={pt:{unavailable:"Data indispon\xEDvel",at:"\xE0s"},es:{unavailable:"Fecha no disponible",at:"a las"},en:{unavailable:"Date unavailable",at:"at"}};function qo(e){let t=ge(),a=xs[t]||xs.pt;if(!e||e==="N/A"||e==="undefined")return a.unavailable;if(String(e).includes(" | "))return e.split(" | ").map(o=>qo(o.trim())).filter(o=>o!==a.unavailable).join(" | ");try{let o=new Date(e);if(isNaN(o.getTime()))return a.unavailable;let n=Ma(t),i=o.toLocaleDateString(n,{day:"2-digit",month:cn(t),year:"numeric"}),r=o.toLocaleTimeString(n,{hour:"2-digit",minute:"2-digit"});return`${i} ${a.at} ${r}`}catch{return a.unavailable}}function Ts(e){if(!e)return"";let t={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return e.replace(/:([a-zA-Z0-9-_+]+):/g,a=>t[a]?t[a]:"")}function Ns(){let e=document.createElement("div");return e.className="cw-dialog-overlay",Object.assign(e.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:gt.TOP,opacity:0,transition:"opacity 0.3s ease"}),e}function Ls(){let e=document.createElement("div");return Object.assign(e.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s var(--cw-ease-spring)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),e}var ws={pt:{cancel:"Cancelar",confirm:"Confirmar",delete:"Excluir"},es:{cancel:"Cancelar",confirm:"Confirmar",delete:"Eliminar"},en:{cancel:"Cancel",confirm:"Confirm",delete:"Delete"}};function wi(e){return(ws[ge()]||ws.pt)[e]}function ot(e,t={}){return new Promise(a=>{let o=Ns(),n=Ls(),i=t.danger?"#FF3B30":"#007AFF",r=t.confirmText||wi(t.danger?"delete":"confirm");n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${e}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">${wi("cancel")}</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${i}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${r}</button>
            </div>
        `,o.appendChild(n),document.body.appendChild(o),requestAnimationFrame(()=>{o.style.opacity=1,n.style.transform="scale(1)"});let s=c=>{o.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{o.remove(),a(c)},300)},l=n.querySelector("#cw-conf-cancel"),p=n.querySelector("#cw-conf-ok");[l,p].forEach(c=>c.onmouseenter=()=>w.playHover()),l.onclick=()=>{w.playClick(),s(!1)},p.onclick=()=>{w.playClick(),s(!0)}})}function xn(e,t=""){return new Promise(a=>{let o=Ns(),n=Ls();n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${e}</div>
            <input type="text" id="cw-prompt-input" value="${t}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">${wi("cancel")}</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,o.appendChild(n),document.body.appendChild(o);let i=n.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{o.style.opacity=1,n.style.transform="scale(1)",setTimeout(()=>i.focus(),100)});let r=p=>{o.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{o.remove(),a(p)},300)},s=n.querySelector("#cw-prompt-cancel"),l=n.querySelector("#cw-prompt-ok");[s,l].forEach(p=>p.onmouseenter=()=>w.playHover()),s.onclick=()=>{w.playClick(),r(null)},l.onclick=()=>{w.playClick(),r(i.value)},i.onkeydown=p=>{p.key==="Enter"&&l.click(),p.key==="Escape"&&s.click()}})}var Fo=class{constructor(){this.visible=!1,this.currentLang="pt",this.reset()}reset(){this.currentCaseType="bau",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.activeFields=[];let t=typeof localStorage<"u"?localStorage.getItem("cw-notes-favorites"):null;this.favorites=new Set(JSON.parse(t||"[]")),this.screenshotMode="implementation",this.notify()}setCaseType(t){this.currentCaseType!==t&&(this.currentCaseType=t,this.isDirty=!0,this.notify())}setLanguage(t){this.currentLang!==t&&(this.currentLang=t,this.notify())}setPortugalCase(t){this.isPortugalCase!==t&&(this.isPortugalCase=t,this.isDirty=!0,this.notify())}setConsent(t){this.consent!==t&&(this.consent=t,this.isDirty=!0,this.notify())}setTagSupportUsed(t){this.tagSupportUsed=t,t||this.forcedScreenshots.clear(),this.isDirty=!0,this.notify()}setActiveFields(t){this.activeFields=[...t],this.isDirty=!0,this.notify()}removeField(t){this.activeFields=this.activeFields.filter(a=>a!==t),this.isDirty=!0,this.notify()}addFieldAt(t,a){this.activeFields.includes(t)||(this.activeFields.splice(a,0,t),this.isDirty=!0,this.notify())}setForcedScreenshots(t){this.forcedScreenshots=new Set(t),this.isDirty=!0,this.notify()}toggleForcedScreenshot(t,a){a?this.forcedScreenshots.add(t):this.forcedScreenshots.delete(t),this.isDirty=!0,this.notify()}setStatus(t){this.currentStatus!==t&&(this.currentStatus=t,this.isDirty=!0,this.notify())}setSubStatus(t){this.currentSubStatus!==t&&(this.currentSubStatus=t,this.isDirty=!0,this.notify())}setScreenshotMode(t){this.screenshotMode=t,this.notify()}setActiveTasks(t){this.activeTasks=t,this.isDirty=!0,this.notify()}toggleFavorite(t){this.favorites.has(t)?this.favorites.delete(t):this.favorites.add(t),typeof localStorage<"u"&&localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(t,a){this.formData[t]!==a&&(this.formData[t]=a,this.isDirty=!0,this.notify())}listeners=[];subscribe(t){return this.listeners.push(t),()=>this.listeners=this.listeners.filter(a=>a!==t)}notify(){this.listeners.forEach(t=>t(this))}},ue=new Fo;var Is={pt:{helpTooltip:"Sobre & Feedback",closeTooltip:"Fechar",version:"Vers\xE3o",reportLink:"Reportar Bug ou Sugest\xE3o",docsLink:"Abrir a documenta\xE7\xE3o",backBtn:"Voltar",createdBy:"criado por"},es:{helpTooltip:"Acerca de y Comentarios",closeTooltip:"Cerrar",version:"Versi\xF3n",reportLink:"Reportar error o sugerencia",docsLink:"Abrir la documentaci\xF3n",backBtn:"Volver",createdBy:"creado por"},en:{helpTooltip:"About & Feedback",closeTooltip:"Close",version:"Version",reportLink:"Report a Bug or Suggestion",docsLink:"Open the documentation",backBtn:"Back",createdBy:"created by"}};function Ot(e){let t=ge();return Is[t]?.[e]??Is.pt[e]??e}var pu={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},_s={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function rt(e,t,a,o,n,i){let r=document.createElement("div");Object.assign(r.style,pu),Ss(e,r);let s=document.createElement("div");if(Object.assign(s.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",backgroundSize:"300% auto",zIndex:"10",opacity:"0.8"}),!document.getElementById("cw-header-anim")){let G=document.createElement("style");G.id="cw-header-anim",G.innerHTML=`
            @keyframes cw-header-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `,document.head.appendChild(G)}window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||(s.style.animation="cw-header-flow 6s linear infinite"),r.appendChild(s),n&&(n.googleLine=s);let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center",gap:"12px"});let c=document.createElement("div");c.innerHTML='<svg viewBox="0 0 48 48" width="20" height="20"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/></svg>',Object.assign(c.style,{width:"20px",height:"20px",pointerEvents:"none",flexShrink:"0",display:"flex"});let m=document.createElement("span");m.textContent=t,p.appendChild(c),p.appendChild(m);let u=document.createElement("div");Object.assign(u.style,{display:"flex",alignItems:"center",gap:"4px"});let h='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',L='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',S=document.createElement("div");S.innerHTML=h,Object.assign(S.style,_s),S.title=Ot("helpTooltip"),S.classList.add("no-drag"),S.onmouseenter=()=>{S.style.background="rgba(255,255,255,0.1)",S.style.color="#FFF"},S.onmouseleave=()=>{S.style.color!=="rgb(138, 180, 248)"&&(S.style.background="transparent",S.style.color="#9AA0A6")};let C=document.createElement("div");C.innerHTML=L,Object.assign(C.style,_s),C.title=Ot("closeTooltip"),C.classList.add("no-drag","cw-header-close"),C.onmouseenter=()=>{C.style.background="rgba(242, 139, 130, 0.2)",C.style.color="#F28B82"},C.onmouseleave=()=>{C.style.background="transparent",C.style.color="#9AA0A6"},C.onmousedown=G=>G.stopPropagation(),S.onmousedown=G=>G.stopPropagation(),C.onclick=i;let D=uu(e,t,a,o);return S.onclick=G=>{G.stopPropagation(),D.style.opacity==="1"?(D.style.opacity="0",D.style.pointerEvents="none",S.style.color="#9AA0A6",S.style.background="transparent"):(D.style.opacity="1",D.style.pointerEvents="auto",S.style.color="#8AB4F8",S.style.background="rgba(138, 180, 248, 0.1)")},u.appendChild(S),u.appendChild(C),r.appendChild(p),r.appendChild(u),je(()=>{S.title=Ot("helpTooltip"),C.title=Ot("closeTooltip")}),r}var Ds=`
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 20px;
    background-color: #F8F9FA;
    border: 1px dashed #1a73e8;
    border-radius: 20px;
    color: #1a73e8;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
`;function uu(e,t,a,o){let n=document.createElement("div");return Object.assign(n.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),n.innerHTML=`
        <div class="cw-help-title" style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${t}</div>
        <div class="cw-help-version" style="color: #5f6368; font-size: 14px; margin-bottom: 24px;">${Ot("version")} ${a}</div>

        <div class="cw-help-description" style="color: #3c4043; font-size: 14px; max-width: 90%; line-height: 1.6; margin-bottom: 24px;">
            ${o}
        </div>

        <div style="margin-bottom: 32px; display: flex; flex-direction: column; align-items: center; gap: 10px;">
            <a href="${vn}" target="_blank" rel="noopener noreferrer" class="cw-help-link" style="${Ds}">
                <span>\u{1F4D6}</span> <span class="cw-help-docs-link">${Ot("docsLink")}</span>
            </a>
            <a href="${Qa}" target="_blank" rel="noopener noreferrer" id="cw-feedback-link" class="cw-help-link" style="${Ds}">
                <span>\u{1F4AC}</span> <span class="cw-help-report-link">${Ot("reportLink")}</span>
            </a>
        </div>

        <div class="cw-help-created-by" style="font-size: 12px; color: #9aa0a6;">
            ${Ot("createdBy")} <span style="color: #1a73e8; font-weight: 500;">${Wt}</span>
        </div>

        <button id="close-help-internal" style="margin-top: 24px; padding: 8px 24px; border: 1px solid #dadce0; background: white; border-radius: 18px; color: #5f6368; cursor: pointer; font-weight: 500; transition: background 0.2s;">
            ${Ot("backBtn")}
        </button>
    `,setTimeout(()=>{n.querySelectorAll(".cw-help-link").forEach(r=>{r.onmouseenter=()=>{r.style.backgroundColor="#E8F0FE",r.style.transform="scale(1.02)"},r.onmouseleave=()=>{r.style.backgroundColor="#F8F9FA",r.style.transform="scale(1)"}});let i=n.querySelector("#close-help-internal");i&&(i.onmouseover=()=>i.style.backgroundColor="#f8f9fa",i.onmouseout=()=>i.style.backgroundColor="white",i.onclick=()=>{n.style.opacity="0",n.style.pointerEvents="none"})},0),je(()=>{let i=n.querySelector(".cw-help-version");i&&(i.textContent=`${Ot("version")} ${a}`);let r=n.querySelector(".cw-help-docs-link");r&&(r.textContent=Ot("docsLink"));let s=n.querySelector(".cw-help-report-link");s&&(s.textContent=Ot("reportLink"));let l=n.querySelector(".cw-help-created-by");l&&(l.firstChild.textContent=`${Ot("createdBy")} `);let p=n.querySelector("#close-help-internal");p&&(p.textContent=Ot("backBtn"))}),e.appendChild(n),n}var J={blue:"#4285F4",red:"#EA4335",yellow:"#FBBC05",green:"#34A853",primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#34A853",warning:"#FBBC05",error:"#EA4335"},pt={small:"8px",medium:"12px",large:"20px",pill:"100px"},da={subtle:"0 1px 3px rgba(0,0,0,0.08)",card:"0 4px 12px rgba(0,0,0,0.05)",elevated:"0 12px 24px rgba(0,0,0,0.08)",apple:"0 20px 40px rgba(0,0,0,0.12)"},Pe="cubic-bezier(0.34, 1.56, 0.64, 1)",mu={width:"100%",padding:"14px 16px",borderRadius:pt.medium,border:`1.5px solid ${J.border}`,backgroundColor:J.bgInput,fontSize:"14px",color:J.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`all 0.3s ${Pe}`,outline:"none"},Of={...mu,minHeight:"120px",resize:"vertical",lineHeight:"1.6"},qf={fontSize:"12px",fontWeight:"700",color:J.textSub,textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px 0"},Ff={display:"block",fontSize:"14px",fontWeight:"600",color:J.text,marginBottom:"10px",marginTop:"20px"},Rf={fontSize:"12px",color:J.warning,marginTop:"8px",display:"flex",alignItems:"center",gap:"8px",fontWeight:"500"},Ci={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:J.primary},zf={display:"flex",alignItems:"center",marginBottom:"12px",fontSize:"14px",fontWeight:"500",color:J.text,cursor:"pointer",padding:"16px 20px",backgroundColor:J.surface,border:`1px solid ${J.border}`,borderRadius:pt.large,transition:`all 0.4s ${Pe}`,userSelect:"none",boxShadow:da.subtle},$f={padding:"14px 28px",color:"#fff",backgroundColor:J.primary,border:"none",borderRadius:pt.pill,fontSize:"15px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px 0 rgba(26,115,232,0.39)",transition:`all 0.25s ${Pe}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",outline:"none"},Pf={width:"100%",padding:"12px",background:"#FFFFFF",border:`1.5px dashed ${J.primary}`,color:J.primary,borderRadius:pt.medium,cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"16px",transition:`all 0.25s ${Pe}`},Bf={background:"transparent",border:`1px solid ${J.border}`,borderRadius:pt.pill,color:J.textSub,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",margin:"20px auto",transition:`all 0.25s ${Pe}`};var Ro={pt:"Gera notas padronizadas com excel\xEAncia visual.",es:"Genera notas estandarizadas con excelencia visual.",en:"Builds standardized notes with visual polish."};function Ms(e,t){let a=document.createElement("div");a.id="notes-assistant-popup",a.classList.add("cw-module-window"),Object.assign(a.style,ft,{right:"100px",width:"520px",height:"740px",display:"flex",flexDirection:"column",transition:`width 0.4s ${Pe}, height 0.4s ${Pe}, transform 0.4s ${Pe}, opacity 0.3s ease`,borderRadius:pt.large,boxShadow:da.apple,border:"1px solid rgba(255, 255, 255, 0.7)"});let o={popup:a,googleLine:null},n=rt(a,"Case Notes",e,Ro[ge()]||Ro.pt,o,t);a.appendChild(n);let i=document.createElement("div");i.className="cw-popup-content",Object.assign(i.style,{padding:"24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"24px",background:J.surface}),a.appendChild(i);let r=document.createElement("div");r.textContent=`created by ${Wt}`,Object.assign(r.style,As,{padding:"16px 24px",borderTop:`1px solid ${J.bgInput}`,color:J.textSub,fontSize:"11px",marginTop:"auto",fontWeight:"500",letterSpacing:"0.5px"}),a.appendChild(r);let s=document.createElement("div");return Object.assign(s.style,Yt),s.className="no-drag",a.appendChild(s),Xt(a,s),gu(),{popup:a,content:i,header:n,animRefs:o,credit:r}}function gu(){if(document.getElementById("cw-notes-refactor-styles"))return;let e=document.createElement("style");e.id="cw-notes-refactor-styles",e.innerHTML=`
        .cw-popup-content::-webkit-scrollbar { width: 8px; }
        .cw-popup-content::-webkit-scrollbar-track { background: transparent; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; border: 2px solid #fff; }
        .cw-popup-content::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .cw-input, .cw-textarea, .cw-select {
            width: 100% !important;
            padding: 12px 16px !important;
            border-radius: ${pt.medium} !important;
            border: 1.5px solid ${J.border} !important;
            font-size: 14px !important;
            font-family: 'Google Sans', Roboto, sans-serif !important;
            transition: border-color 0.2s ${Pe}, background-color 0.2s ${Pe}, box-shadow 0.2s ${Pe} !important;
            box-sizing: border-box !important;
            background: ${J.bgInput} !important;
            color: ${J.text} !important;
            outline: none !important;
            box-shadow: ${da.subtle} !important;
        }

        #notes-assistant-popup .cw-select {
            appearance: none !important;
            -webkit-appearance: none !important;
            -moz-appearance: none !important;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E") !important;
            background-repeat: no-repeat !important;
            background-position: right 14px center !important;
            background-size: 16px !important;
            padding-right: 40px !important;
            cursor: pointer !important;
            font-weight: 500 !important;
            line-height: 1.5 !important;
            /* Ensure background and border transitions are smooth while icon stays static */
            transition: border-color 0.2s ${Pe}, background-color 0.2s ${Pe}, box-shadow 0.2s ${Pe} !important;
        }

        .cw-input:hover, .cw-textarea:hover, #notes-assistant-popup .cw-select:hover {
            border-color: #bdc1c6 !important;
            background-color: #f1f3f4 !important;
            box-shadow: 0 1px 4px rgba(0,0,0,0.1) !important;
        }

        .cw-input:focus, .cw-textarea:focus, #notes-assistant-popup .cw-select:focus {
            border-color: ${J.primary} !important;
            background-color: #fff !important;
            box-shadow: 0 0 0 3px rgba(26,115,232,0.15), 0 2px 8px rgba(0,0,0,0.05) !important;
        }

        .cw-textarea { min-height: 100px; resize: vertical; line-height: 1.5; }

        .cw-section-title {
            font-size: 11px;
            font-weight: 700;
            color: ${J.textSub};
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 8px 0 12px 0;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .cw-section-title::after {
            content: "";
            flex: 1;
            height: 1px;
            background: ${J.bgInput};
        }

        .cw-btn-primary {
            background: ${J.primary};
            color: #fff;
            border: none;
            border-radius: ${pt.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ${Pe}, transform 0.2s ${Pe}, box-shadow 0.2s ${Pe};
            box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        .cw-btn-primary:hover {
            background: #1765cc;
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(26, 115, 232, 0.4);
        }
        .cw-btn-primary:active { transform: translateY(0); }

        .cw-btn-secondary {
            background: #fff;
            color: ${J.textSub};
            border: 1px solid ${J.border};
            border-radius: ${pt.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ${Pe}, border-color 0.2s ${Pe}, color 0.2s ${Pe};
        }
        .cw-btn-secondary:hover {
            background: ${J.bgInput};
            border-color: #bdc1c6;
            color: ${J.text};
        }

        @media (prefers-reduced-motion: reduce) {
            .cw-btn-primary, .cw-btn-secondary, .cw-input, .cw-textarea, .cw-select {
                transition: opacity 0.15s ease, background-color 0.15s ease, border-color 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}var bt={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"Selecione",substatus:"Substatus:",select_substatus:"Selecione o Status",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",preencher_email_automaticamente:"Preencher email automaticamente?",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",trechos:"Trechos",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",atalhos_ajuda:"Atalhos para as implementa\xE7\xF5es mais frequentes.<br>Use a busca abaixo para o cat\xE1logo completo.",nenhum_resultado:"Nenhum resultado.",alternar_split:"Alternar para Split & Transfer",preencha_obrigatorio:"Preencha o campo obrigat\xF3rio antes de gerar",selecione_task_gerar:"Selecione ao menos uma tarefa antes de gerar a nota.",nota_nao_abriu:"N\xE3o foi poss\xEDvel abrir a nota no CRM. O conte\xFAdo j\xE1 est\xE1 copiado \u2014 cole manualmente.",sessao_restaurada:"Sess\xE3o restaurada!",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",link_aqui:"Link aqui",tag_support_output_label:"Utilizou Tag Support?",motivo_output_label:"Motivo:",auto_busca:"\u2728 Auto Busca",utilize_marcadores:"Utilize marcadores para detalhar...",descreva_consideracoes:"Descreva as considera\xE7\xF5es...",remover:"Remover",remover_campo_confirm:'Remover o campo "{campo}"?',meus_rascunhos:"Meus Rascunhos",confirmar_guardar_rascunho:"Deseja guardar o rascunho atual e limpar os campos?",rascunho_salvo_sucesso:"Rascunho salvo com sucesso!",erro_ler_dados:"Erro: N\xE3o foi poss\xEDvel ler os dados.",erro_ao_salvar:"Erro ao salvar.",cliente_sem_nome:"Cliente Sem Nome",sem_status:"Sem Status",retomar_caso:"Retomar Caso",descartar:"Descartar",retomar_rascunho_confirm:"Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.",rascunho_carregado:"Rascunho carregado.",excluir_rascunho_confirm:"Excluir este rascunho?",acoes_plural:"A\xE7\xF5es",acao_singular:"A\xE7\xE3o",definidas_plural:"definidas",definida_singular:"definida",renomear_tooltip:"Clique para renomear esta task",renomear_hint:"\u270E Renomear",substituir_rascunho_confirm:"Isso vai substituir o rascunho atual da nota. Deseja continuar?",salvar_como_atalho:"Salvar como atalho do Ctrl+K",atalho_nome_pergunta:"Como este atalho vai se chamar no Ctrl+K?",atalho_salvo:"Atalho salvo! J\xE1 aparece no Ctrl+K.",atalho_salvo_local:"Atalho salvo neste navegador (sem conex\xE3o com a nuvem).",atalho_limite:"Voc\xEA j\xE1 tem {max} atalhos. Apague um em Configura\xE7\xF5es antes de criar outro.",atalho_cenario_sumiu:"Este atalho apontava para um cen\xE1rio que n\xE3o existe mais. Revise-o em Configura\xE7\xF5es.",restaurar_rascunho_confirm:"Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?",cole_link_placeholder:"Cole o link aqui...",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",screenshots_aviso:"Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria.",caso_portugal:"Caso da Europa?",consentiu_gravacao:"\u23FA\uFE0F Anunciante consentiu com a grava\xE7\xE3o?",sim:"Sim",nao:"N\xE3o",pronto_comecar:"Pronto para come\xE7ar?",selecione_status_ajuda:"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Task(s) solicitada(s):",passos_executados:"\u{1F463} O que foi feito:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 D\xFAvidas do anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implementadas na call:",proximos_passos:"\u{1F680} Pr\xF3ximos passos (Acompanhamento):",consideracoes:"\u{1F4A1} Considera\xE7\xF5es adicionais:",contexto_call:"\u{1F4AC} Contexto/O que foi feito:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Minha A\xE7\xE3o:",dia:"\u{1F4C5} Dia do Follow-up (se aplic\xE1vel):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Data do reagendamento:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evid\xEAncias de Contato",evidencia:"Evid\xEAncia",nota_criada_rodape:"Nota criada atrav\xE9s do Cases Wizard.",ligacao_1:"Liga\xE7\xE3o 1",ligacao_2:"Liga\xE7\xE3o 2",mensagem_am:"Mensagem para AM",tentativa_ligacao:"\u{1F4DE} Tentativa de liga\xE7\xE3o:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"Seleccione",substatus:"Subestado:",select_substatus:"Seleccione el Estado",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",preencher_email_automaticamente:"\xBFRellenar correo autom\xE1ticamente?",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",trechos:"Fragmentos",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",atalhos_ajuda:"Atajos para las implementaciones m\xE1s frecuentes.<br>Use la b\xFAsqueda de abajo para el cat\xE1logo completo.",nenhum_resultado:"Sin resultados.",alternar_split:"Cambiar a Split & Transfer",preencha_obrigatorio:"Rellene el campo obligatorio antes de generar",selecione_task_gerar:"Seleccione al menos una tarea antes de generar la nota.",nota_nao_abriu:"No se pudo abrir la nota en el CRM. El contenido ya est\xE1 copiado: p\xE9guelo manualmente.",sessao_restaurada:"\xA1Sesi\xF3n restaurada!",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",link_aqui:"Enlace aqu\xED",tag_support_output_label:"\xBFUtiliz\xF3 Tag Support?",motivo_output_label:"Motivo:",auto_busca:"\u2728 B\xFAsqueda Autom\xE1tica",utilize_marcadores:"Utiliza vi\xF1etas para detallar...",descreva_consideracoes:"Describe las consideraciones...",remover:"Eliminar",remover_campo_confirm:'\xBFEliminar el campo "{campo}"?',meus_rascunhos:"Mis Borradores",confirmar_guardar_rascunho:"\xBFDesea guardar el borrador actual y limpiar los campos?",rascunho_salvo_sucesso:"\xA1Borrador guardado con \xE9xito!",erro_ler_dados:"Error: No fue posible leer los datos.",erro_ao_salvar:"Error al guardar.",cliente_sem_nome:"Cliente Sin Nombre",sem_status:"Sin Estado",retomar_caso:"Retomar Caso",descartar:"Descartar",retomar_rascunho_confirm:"\xBFRetomar este borrador? El formulario actual ser\xE1 reemplazado.",rascunho_carregado:"Borrador cargado.",excluir_rascunho_confirm:"\xBFEliminar este borrador?",acoes_plural:"Acciones",acao_singular:"Acci\xF3n",definidas_plural:"definidas",definida_singular:"definida",renomear_tooltip:"Haz clic para renombrar esta tarea",renomear_hint:"\u270E Renombrar",substituir_rascunho_confirm:"Esto reemplazar\xE1 el borrador actual de la nota. \xBFDeseas continuar?",salvar_como_atalho:"Guardar como atajo de Ctrl+K",atalho_nome_pergunta:"\xBFC\xF3mo se va a llamar este atajo en el Ctrl+K?",atalho_salvo:"\xA1Atajo guardado! Ya aparece en el Ctrl+K.",atalho_salvo_local:"Atajo guardado en este navegador (sin conexi\xF3n con la nube).",atalho_limite:"Ya tienes {max} atajos. Elimina uno en Configuraci\xF3n antes de crear otro.",atalho_cenario_sumiu:"Este atajo apuntaba a un escenario que ya no existe. Rev\xEDsalo en Configuraci\xF3n.",restaurar_rascunho_confirm:"Detectamos un borrador sin guardar de tu \xFAltima sesi\xF3n. \xBFDeseas restaurarlo?",cole_link_placeholder:"Pega el enlace aqu\xED...",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",screenshots_aviso:"Los screenshots siguen las directrices actuales de Win Criteria y las pol\xEDticas de Tag Support.",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Europa?",consentiu_gravacao:"\u23FA\uFE0F \xBFEl anunciante consinti\xF3 la grabaci\xF3n?",sim:"S\xED",nao:"No",pronto_comecar:"\xBFListo para empezar?",selecione_status_ajuda:"Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Tarea(s) solicitada(s):",passos_executados:"\u{1F463} Qu\xE9 se hizo:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 Dudas del anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resoluciones/Explicaciones:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tareas implementadas en la call:",proximos_passos:"\u{1F680} Pr\xF3ximos pasos:",consideracoes:"\u{1F4A1} Consideraciones adicionales:",contexto_call:"\u{1F4AC} Contexto/Qu\xE9 se hizo:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Mi Acci\xF3n:",dia:"\u{1F4C5} D\xEDa de Follow-up (si aplica):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Fecha de reprogramaci\xF3n:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evidencias de Contacto",evidencia:"Evidencia",nota_criada_rodape:"Nota creada a trav\xE9s de Cases Wizard.",ligacao_1:"Llamada 1",ligacao_2:"Llamada 2",mensagem_am:"Mensaje para AM",tentativa_ligacao:"\u{1F4DE} Intento de llamada:"},en:{idioma:"Language:",fluxo:"Flow:",status_principal:"Main Status:",select_status:"Select",substatus:"Substatus:",select_substatus:"Select the Status",cenarios_comuns:"Common Scenarios",selecione_tasks:"Select the Tasks",preencha_detalhes:"Fill In the Details",copiar:"Copy",preencher:"Fill in",limpar:"Clear",preencher_email_automaticamente:"Fill in the email automatically?",gostaria_de_adicionar_uma_task:"I would like to add a task",rascunhos_salvos:"Saved Drafts",nenhum_rascunho:"No drafts saved",guardar:"Park",trechos:"Snippets",acesso_rapido:"Quick Access",buscar_catalogo:"Search the catalog...",atalhos_ajuda:"Shortcuts for the most frequent implementations.<br>Use the search below for the full catalog.",nenhum_resultado:"No results.",alternar_split:"Switch to Split & Transfer",preencha_obrigatorio:"Fill in the required field before generating",selecione_task_gerar:"Select at least one task before generating the note.",nota_nao_abriu:"Could not open the note in the CRM. The content is already copied \u2014 paste it manually.",sessao_restaurada:"Session restored!",selecione_tarefas:"Select tasks to see the fields.",utilizou_tag_support:"Did you use Tag Support to create/verify?",motivo_ts:"What was the reason?",lembre_preencher_form:"Remember to fill in the Form!",link_aqui:"Link here",tag_support_output_label:"Used Tag Support?",motivo_output_label:"Reason:",auto_busca:"\u2728 Auto Search",utilize_marcadores:"Use bullets to add detail...",descreva_consideracoes:"Describe the considerations...",remover:"Remove",remover_campo_confirm:'Remove the field "{campo}"?',meus_rascunhos:"My Drafts",confirmar_guardar_rascunho:"Park the current draft and clear the fields?",rascunho_salvo_sucesso:"Draft saved successfully!",erro_ler_dados:"Error: could not read the data.",erro_ao_salvar:"Error saving.",cliente_sem_nome:"Unnamed Customer",sem_status:"No Status",retomar_caso:"Resume Case",descartar:"Discard",retomar_rascunho_confirm:"Resume this draft? The current form will be replaced.",rascunho_carregado:"Draft loaded.",excluir_rascunho_confirm:"Delete this draft?",acoes_plural:"Actions",acao_singular:"Action",definidas_plural:"defined",definida_singular:"defined",renomear_tooltip:"Click to rename this task",renomear_hint:"\u270E Rename",substituir_rascunho_confirm:"This will replace the current note draft. Do you want to continue?",salvar_como_atalho:"Save as a Ctrl+K shortcut",atalho_nome_pergunta:"What should this shortcut be called in Ctrl+K?",atalho_salvo:"Shortcut saved! It already shows up in Ctrl+K.",atalho_salvo_local:"Shortcut saved in this browser (no cloud connection).",atalho_limite:"You already have {max} shortcuts. Delete one in Settings before creating another.",atalho_cenario_sumiu:"This shortcut pointed to a scenario that no longer exists. Review it in Settings.",restaurar_rascunho_confirm:"We found an unsaved draft from your last session. Would you like to restore it?",cole_link_placeholder:"Paste the link here...",copiado_sucesso:"Text copied successfully",inserido_copiado:"Text inserted and copied!",campo_nao_encontrado:"Field not found. The text has already been copied.",ts_disclaimer:"Screenshots are not required for conversions created/verified by Tag Support",screenshots_aviso:"Screenshots follow the current Win Criteria guidelines and Tag Support policies.",incluir_mesmo_assim:"Include anyway",ajuda_scenarios:"How do I use Scenarios?",ajuda_scenarios_desc:"Scenarios fill in several note fields automatically. Click a chip to apply it. You can combine several scenarios (e.g.: GTM Installation + WhatsApp).",ts_output_disclaimer:"Tag created/verified by Tag Support, as the note automatically added to the case indicates. I am not including the screenshots, in line with the Win Criteria guidance.",caso_portugal:"Europe case?",consentiu_gravacao:"\u23FA\uFE0F Did the advertiser consent to the recording?",sim:"Yes",nao:"No",pronto_comecar:"Ready to start?",selecione_status_ajuda:"Select a status and substatus to<br>start your technical note.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Requested task(s):",passos_executados:"\u{1F463} What was done:",resultado:"\u{1F3C6} Result:",duvidas:"\u2753 Advertiser questions:",problemas:"\u26A0\uFE0F Initial problem:",resolucoes:"\u2705 Resolutions/Explanations:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verified:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implemented on the call:",proximos_passos:"\u{1F680} Next steps (Follow-up):",consideracoes:"\u{1F4A1} Additional considerations:",contexto_call:"\u{1F4AC} Context/What was done:",impedimento_cliente:"\u{1F6A7} Blocker / Next step (Advertiser):",minha_acao:"\u{1F468}\u200D\u{1F4BB} My Action:",dia:"\u{1F4C5} Follow-up day (if applicable):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Rescheduling date:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Contact Evidence",evidencia:"Evidence",nota_criada_rodape:"Note created through Cases Wizard.",ligacao_1:"Call 1",ligacao_2:"Call 2",mensagem_am:"Message to the AM",tentativa_ligacao:"\u{1F4DE} Call attempt:"}},Ze={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},fu={"GTM Instalado":"GTM Instalado","Vinculador de convers\xF5es":"Vinculador de conversiones","Tag criada":"Etiqueta creada","Teste GTM":"Prueba GTM","Teste Ads":"Prueba Ads","Vers\xE3o Publicada":"Versi\xF3n Publicada","Status Ads":"Estado Ads","Termos aceitos no Ads":"T\xE9rminos aceptados en Ads","Tag implementada":"Etiqueta implementada","Painel do Ads (ap\xF3s 7 dias)":"Panel de Ads (despu\xE9s de 7 d\xEDas)","Tag do evento GA4 implementado no GTM":"Etiqueta del evento GA4 implementada en GTM","Teste GTM (tagassistant.google.com)":"Prueba GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)":"Prueba GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM":"Versi\xF3n publicada en GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4":"(Si hay par\xE1metros) Dimensiones personalizadas creadas en GA4","Evento marcado como principal no GA4":"Evento marcado como principal en GA4","GA4 e Google Ads vinculados corretamente":"GA4 y Google Ads vinculados correctamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)":"Evento principal de GA4 importado en Google Ads (como secundario)","M\xE9tricas app & web ativadas no Google Ads":"M\xE9tricas app y web activadas en Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)":"(Opcional) Prueba en el Informe de Tiempo Real (GA4)","Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)":"Validaci\xF3n: Cuenta GA4 (solo flujo web, no es sector salud)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)':'"Recopilaci\xF3n de datos proporcionados por el usuario" habilitada en GA4 (Administrador > Recopilaci\xF3n de Datos)',"Confirma\xE7\xE3o de coleta de dados (UI)":"Confirmaci\xF3n de recopilaci\xF3n de datos (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM":"Etiqueta del evento GA4 optimizado (UPD) implementada en GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)":"Prueba GTM (tagassistant - par\xE1metro 'em' sin error)","Teste GA4 (DebugView - tagassistant)":"Prueba GA4 (DebugView - tagassistant)","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio":"(Capacitaci\xF3n) Evento principal importado en Google Ads como secundario","Tag implementado no GTM":"Etiqueta implementada en GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo":"Prueba del disparo de la etiqueta de configuraci\xF3n en tag assistant en m\xE1s de una p\xE1gina, mostrando ID y etiqueta","Teste usando o #google-wcc-debug":"Prueba usando #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]":"Cambio del estado de la conversi\xF3n en Google Ads [Esperar algunos minutos]","1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas":"1. OGT (gTag/GTM con etiqueta de vinculador de conversi\xF3n) a\xF1adido en todas las p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)":"2. El etiquetado autom\xE1tico (auto tagging) est\xE1 habilitado en Google Ads (Administrador > Config. de la Cuenta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".':'3. [Si es GTM] El vinculador de conversi\xF3n est\xE1 presente y el activador definido para dispararse en "Todas las P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?":"4. \xBFEl gclid se mantiene sin redirecciones y se almacena en la cookie _gcl_aw en la landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?":"5. \xBFEl gclid fue pasado a la p\xE1gina de conversi\xF3n?"},bu={"GTM Instalado":"GTM Installed","Vinculador de convers\xF5es":"Conversion Linker","Tag criada":"Tag created","Teste GTM":"GTM test","Teste Ads":"Ads test","Vers\xE3o Publicada":"Published Version","Status Ads":"Ads Status","Termos aceitos no Ads":"Terms accepted in Ads","Tag implementada":"Tag implemented","Painel do Ads (ap\xF3s 7 dias)":"Ads dashboard (after 7 days)","Tag do evento GA4 implementado no GTM":"GA4 event tag implemented in GTM","Teste GTM (tagassistant.google.com)":"GTM test (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)":"GA4 test (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM":"Version published in GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4":"(If there are parameters) Custom dimensions created in GA4","Evento marcado como principal no GA4":"Event marked as key event in GA4","GA4 e Google Ads vinculados corretamente":"GA4 and Google Ads linked correctly","Evento principal GA4 importado no Google Ads (como secund\xE1rio)":"GA4 key event imported into Google Ads (as secondary)","M\xE9tricas app & web ativadas no Google Ads":"App & web metrics enabled in Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)":"(Optional) Test in the Realtime report (GA4)","Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)":"Validation: GA4 account (web stream only, not healthcare)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)':'"User-provided data collection" enabled in GA4 (Admin > Data Collection)',"Confirma\xE7\xE3o de coleta de dados (UI)":"Data collection confirmation (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM":"Optimized GA4 event tag (UPD) implemented in GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)":"GTM test (tagassistant - 'em' parameter with no error)","Teste GA4 (DebugView - tagassistant)":"GA4 test (DebugView - tagassistant)","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio":"(Training) Key event imported into Google Ads as secondary","Tag implementado no GTM":"Tag implemented in GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo":"Test of the configuration tag firing in tag assistant on more than one page, showing ID and label","Teste usando o #google-wcc-debug":"Test using #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]":"Change of the conversion status in Google Ads [Wait a few minutes]","1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas":"1. OGT (gTag/GTM with Conversion Linker tag) added on all pages","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)":"2. Auto tagging is enabled in Google Ads (Admin > Account Settings)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".':'3. [If GTM] The Conversion Linker is present and the trigger set to fire on "All Pages".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?":"4. Is the gclid being kept without redirects and stored in the _gcl_aw cookie on the landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?":"5. Was the gclid passed to the conversion page?"},hu={es:fu,en:bu};function Os(e,t,a){let o=e?.screenshots?.[t]||[],n=hu[a];if(!n)return o;let i=e?.[`screenshots_${a}`]?.[t],r=s=>String(i?.[s]==null?"":i[s]).trim();return e?.daCentral?o.map((s,l)=>r(l)||s):Array.isArray(i)?o.map((s,l)=>r(l)||n[s]||s):o.map(s=>n[s]||s)}function qs(e,t,a){let o=e?.[`fieldPrefixes_${a}`]?.[t];return o||e?.fieldPrefixes?.[t]||""}function Za(e,t,a){let o={es:yn,en:Sn}[t];if(!o)return e;let n=o[a];return n?{...e,...n}:e}function eo(e,t){return Object.entries(_t).filter(([,a])=>{let o=!a.type||a.type==="all"||a.type===t,n=Array.isArray(a.substatus)&&a.substatus.includes(e);return o&&n})}function Sa(e,t){let a=String(e||"");if(a.startsWith("quickfill-"))return a.slice(10);if(t){let n=`cw-${String(t).toLowerCase()}-`;if(a.startsWith(n))return a.slice(n.length)}let o=a.match(/^cw-[a-z0-9_]+-(.+)$/);return o?o[1]:a}function to(e,t){return Sa(e,t).replace(/-/g," ")}var vu=["GTM_GA4_VERIFICADO","MULTIPLE_CIDS"],xu=["REASON_COMMENTS"];function zo(e){let t=[...xu];return e?.requiresTasks&&t.push("GTM_GA4_VERIFICADO"),t}function Fs(e){let t=[...vu,...e?.extraOptionalFields||[]],a=zo(e);return t.filter(o=>!a.includes(o))}var st={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Caso Reagendado."},fieldPrefixes_es:{REASON_COMMENTS:"Caso Reprogramado."},fieldPrefixes_en:{REASON_COMMENTS:"Case Rescheduled."}},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Reagendamento aceit\xE1vel."},fieldPrefixes_es:{REASON_COMMENTS:"Reprogramaci\xF3n aceptable."},fieldPrefixes_en:{REASON_COMMENTS:"Acceptable rescheduling."}},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","DIA","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Aguardando Valida\xE7\xF5es no Google Ads."},fieldPrefixes_es:{REASON_COMMENTS:"Esperando Validaciones en Google Ads."},fieldPrefixes_en:{REASON_COMMENTS:"Awaiting Validations in Google Ads."}},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES"]},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","TENTATIVA_LIGACAO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PASSOS_EXECUTADOS","RESULTADO","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["PROXIMOS_PASSOS"],fieldPrefixes:{REASON_COMMENTS:"Task implementada com sucesso."},fieldPrefixes_es:{REASON_COMMENTS:"Tarea implementada con \xE9xito."},fieldPrefixes_en:{REASON_COMMENTS:"Task implemented successfully."}},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","DUVIDAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["PROXIMOS_PASSOS","CONSIDERACOES"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para tirar d\xFAvidas do anunciante."},fieldPrefixes_es:{REASON_COMMENTS:"Consultor\xEDa utilizada para resolver dudas del anunciante."},fieldPrefixes_en:{REASON_COMMENTS:"Consultation used to answer the advertiser\u2019s questions."}},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PROBLEMAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para testar e solucinar problemas da convers\xE3o."},fieldPrefixes_es:{REASON_COMMENTS:"Consultor\xEDa utilizada para probar y solucionar problemas de la conversi\xF3n."},fieldPrefixes_en:{REASON_COMMENTS:"Consultation used to test and troubleshoot the conversion."}},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,templateFields:["SPEAKEASY_ID","label_substatus","REASON_COMMENTS","COMENTARIOS"],customFooter:"Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},ra={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},ao=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],wn=["CONSIDERACOES","COMENTARIOS"],_t={"quickfill-gtm-install":{type:"all",substatus:["SO_Implementation_Only"],"field-REASON_COMMENTS":"Instala\xE7\xE3o do GTM finalizada.","field-TASKS_SOLICITADAS":"\u2022 Instala\xE7\xE3o do GTM","field-PASSOS_EXECUTADOS":`\u2022 Criamos a conta dentro do GTM
\u2022 Instalamos dentro do CMS/Hospedagem.
\u2022 Criamos o Vinculador de Convers\xF5es.`,"field-RESULTADO":"\u2022 Validei a instala\xE7\xE3o.",linkedTask:"gtm_installation"},"quickfill-whatsapp":{type:"all",substatus:["SO_Implementation_Only"],"field-REASON_COMMENTS":"Instala\xE7\xE3o do Ads Conversion tracking para Whatsapp finalizada.","field-TASKS_SOLICITADAS":"\u2022 Cria\xE7\xE3o de convers\xE3o para WHATSAPP","field-PASSOS_EXECUTADOS":`\u2022 Fizemos a cria\xE7\xE3o da convers\xE3o no Ads.
\u2022 Criamos a Tag no GTM para os bot\xF5es de WhatsApp.
\u2022 Realizamos os testes e validamos o funcionamento.`,"field-RESULTADO":"\u2022 Task implementada com sucesso. Fecho o caso sem acompanhamento.",linkedTask:"ads_conversion_tracking"},"quickfill-form":{type:"all",substatus:["SO_Implementation_Only"],"field-REASON_COMMENTS":"Instala\xE7\xE3o do Ads Conversion tracking para Form finalizada.","field-TASKS_SOLICITADAS":"\u2022 Cria\xE7\xE3o de convers\xE3o para FORMUL\xC1RIO (padr\xE3o, n\xE3o-otimizada).","field-PASSOS_EXECUTADOS":`\u2022 Fizemos a cria\xE7\xE3o da convers\xE3o no Ads.
\u2022 Criamos a Tag no GTM.
\u2022 Realizamos os testes e validamos o funcionamento.`,"field-RESULTADO":"\u2022 Task implementada com sucesso. Fecho o caso sem acompanhamento.",linkedTask:"ads_conversion_tracking"},"quickfill-ecw4-close":{type:"all",substatus:["SO_Implementation_Only"],"field-REASON_COMMENTS":"Finaliza\xE7\xE3o do acompanhamento de EC.","field-TASKS_SOLICITADAS":"\u2022 Acompanhamento da convers\xE3o otimizada (ECW4).","field-PASSOS_EXECUTADOS":`\u2022 Ap\xF3s o per\xEDodo de acompanhamento, verifiquei o painel do Ads.
\u2022 A convers\xE3o est\xE1 sendo registrada corretamente.`,"field-RESULTADO":`\u2022 Valido o bom funcionamento da convers\xE3o otimizada.
\u2022 Assim, fecho o caso.`,linkedTask:"ads_enhanced_conversions"},"quickfill-ga4-event-close":{type:"all",substatus:["SO_Implementation_Only"],"field-REASON_COMMENTS":"Finaliza\xE7\xE3o do Acompanhamento de GA4.","field-TASKS_SOLICITADAS":"\u2022 Acompanhamento de Eventos GA4 ap\xF3s 48h.","field-PASSOS_EXECUTADOS":`\u2022 Ap\xF3s o per\xEDodo de 48h de acompanhamento, verifiquei o painel.
\u2022 O evento est\xE1 sendo registrado corretamente.`,"field-RESULTADO":`\u2022 Valido o bom funcionamento do rastreamento de eventos.
\u2022 Assim, fecho o caso.`,linkedTask:"ga4_event_tracking"},"quickfill-ni-inicio-manual":{type:"all",substatus:["NI_Awaiting_Inputs"],"field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all",substatus:["NI_Awaiting_Inputs"],"field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
\u2022 Configura\xE7\xE3o de Convers\xF5es`,"field-CONTEXTO_CALL":`\u2022 Percebi que o(a) anunciante n\xE3o tinha GTM Instalado.
\u2022 Seguimos com a cria\xE7\xE3o de conta no GTM.
\u2022 Entretanto, a conta de acesso ao painel do site (ex: WordPress) n\xE3o tinha permiss\xE3o para instalar plugins ou editar o c\xF3digo.`,"field-IMPEDIMENTO_CLIENTE":`\u2022 Anunciante precisa conseguir acesso de administrador ao painel do site.
\u2022 OU
\u2022 Anunciante precisa contatar o(a) desenvolvedor(a) para que ele(a) instale o GTM.`,"field-MINHA_ACAO":`\u2022 Coloco o caso em 2/6.
\u2022 Assim que o anunciante tiver o acesso ou a instala\xE7\xE3o for feita, abrirei um caso em BAU para dar continuidade.`,"field-SCREENSHOTS":"\u2022 Print do painel do CMS mostrando a falta de permiss\xE3o (opcional)."},"quickfill-ni-lack-of-access":{type:"all",substatus:["NI_Awaiting_Inputs"],"field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (Falta de acessos necess\xE1rios)","field-CONTEXTO_CALL":`\u2022 Durante a call, identificamos que os acessos necess\xE1rios para prosseguir com a implementa\xE7\xE3o n\xE3o estavam dispon\xEDveis.
\u2022 Orientei o(a) anunciante sobre quais acessos s\xE3o necess\xE1rios e como obt\xEA-los.`,"field-IMPEDIMENTO_CLIENTE":"\u2022 Anunciante precisa providenciar os acessos necess\xE1rios (ex: painel do site, plataforma de an\xFAncios, ou contato com o(a) desenvolvedor(a)) para que a implementa\xE7\xE3o seja conclu\xEDda.","field-MINHA_ACAO":`\u2022 Coloco o caso em 2/6.
\u2022 Assim que o anunciante obtiver os acessos, abrirei um caso em BAU para dar continuidade.`},"quickfill-ni-awaiting-ecw4":{type:"all",substatus:["NI_Awaiting_Validation"],"field-REASON_COMMENTS":"Aguardando valida\xE7\xE3o de dados (ECW4 - 7 Dias)","field-TASKS_SOLICITADAS":"\u2022 Implementa\xE7\xE3o de Convers\xF5es Otimizadas (ECW4)","field-CONTEXTO_CALL":`\u2022 Criamos a convers\xE3o no Google Ads.
\u2022 Configuramos o disparo das tags via GTM.
\u2022 Adicionamos a tag de UPD (User Provided Data).
\u2022 Testamos juntos e validamos o bom funcionamento.`,"field-MINHA_ACAO":"\u2022 Coloco o caso em status de Awaiting Validation para acompanhamento de 7 dias.",linkedTask:"ads_enhanced_conversions"},"quickfill-ni-awaiting-ga4":{type:"all",substatus:["NI_Awaiting_Validation"],"field-REASON_COMMENTS":"Aguardando valida\xE7\xE3o de dados (GA4 Event - 48h)","field-TASKS_SOLICITADAS":"\u2022 Implementa\xE7\xE3o de Eventos GA4","field-CONTEXTO_CALL":`\u2022 Criamos o evento no GA4.
\u2022 Configuramos o disparo das tags via GTM.
\u2022 Testamos juntos e validamos o bom funcionamento.`,"field-MINHA_ACAO":"\u2022 Coloco o caso em status de Awaiting Validation para acompanhamento de 48h.",linkedTask:"ga4_event_tracking"},"quickfill-ni-followup-bau":{type:"bau",substatus:["NI_Awaiting_Inputs"],"field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (Follow-up BAU 2/6)","field-SPEAKEASY_ID":"N/A","field-ON_CALL":"N/A","field-CONTEXTO_CALL":"\u2022 No dia {DIA} do 2/6 fiz duas tentativas de contatos seguidas, mas n\xE3o obtive resposta. Envio na sequ\xEAncia o email referente ao dia respectivo.","field-TASKS_SOLICITADAS":"N/A","field-IMPEDIMENTO_CLIENTE":"N/A","field-MINHA_ACAO":"N/A","field-GTM_GA4_VERIFICADO":"N/A","field-SCREENSHOTS":`\u2022 Tentativa 1 -
\u2022 Tentativa 2 -`},"quickfill-ni-followup-lm":{type:"lm",substatus:["NI_Attempted_Contact"],"field-REASON_COMMENTS":"Tentativa de contato sem sucesso (Follow-up LM 2/6)","field-SPEAKEASY_ID":"N/A","field-ON_CALL":"N/A","field-CONTEXTO_CALL":"\u2022 No dia {DIA} do 2/6 enviei e-mail de follow-up (caso LM, sem tentativas de liga\xE7\xE3o), mas n\xE3o obtive resposta.","field-TASKS_SOLICITADAS":"N/A","field-IMPEDIMENTO_CLIENTE":"N/A","field-MINHA_ACAO":"N/A","field-GTM_GA4_VERIFICADO":"N/A","field-SCREENSHOTS":"\u2022 E-mail de follow-up enviado (LM) -"},"quickfill-ni-attempted-2day":{type:"bau",substatus:["NI_Attempted_Contact"],"field-REASON_COMMENTS":"Attempted Contact (In\xEDcio 2 Day Rule)","field-CONTEXTO_CALL":`\u2022 Fiz a primeira tentativa de liga\xE7\xE3o, sem sucesso.
\u2022 Enviei uma message no chat para o AM.
\u2022 Aguardei 5 minutos e fiz a segunda tentativa de liga\xE7\xE3o, novamente sem sucesso.
\u2022 Aguardei mais 5 minutos e agora farei o acompanhamento 2 Day Rule.`,"field-SCREENSHOTS":`\u2022 MSG AM -
\u2022 Tentativa 1 -
\u2022 Tentativa 2 -`},"quickfill-in-nrp-bau":{type:"bau",substatus:["IN_Not_Reachable"],"field-REASON_COMMENTS":"NRP (BAU - 3 tentativas)","field-COMENTARIOS":`\u2022 Duas liga\xE7\xF5es seguidas, e e-mail "Antes dos 10 minutos" e uma terceira e ultima tentativa de liga\xE7\xE3o.
\u2022 N\xE3o houve resposta \xE0s tentativas de liga\xE7\xE3o ou e-mail, por isso o caso ser\xE1 inativado.`,"field-SCREENSHOTS":`\u2022 Tentativa 1 -
\u2022 Tentativa 2 -
\u2022 Tentativa 3 -`,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-no-show-bau":{type:"bau",substatus:["IN_Not_Reachable"],"field-REASON_COMMENTS":"Sem resposta ao 2 Day Rule.","field-ON_CALL":"N/A","field-COMENTARIOS":`\u2022 O caso foi gerado e entrei na chamada no hor\xE1rio agendado.
\u2022 O anunciante n\xE3o compareceu \xE0 reuni\xE3o.
\u2022 Segui o protocolo de espera (BAU): realizei duas tentativas de liga\xE7\xE3o, sem sucesso.
\u2022 Nenhuma das liga\xE7\xF5es foi atendida (ex: Caixa Postal).
\u2022 Caso inativado ap\xF3s 2 Day Rule.`,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-2-6-final":{type:"all",substatus:["IN_Not_Reachable"],"field-REASON_COMMENTS":"Finaliza\xE7\xE3o (2/6)","field-SPEAKEASY_ID":"-","field-ON_CALL":"-","field-COMENTARIOS":"\u2022 Dia 9 finaliza\xE7\xE3o do 2/6, durante o per\xEDodo do acompanhamento n\xE3o houve retorno do anunciante, ent\xE3o o caso ser\xE1 encerrado.","field-SCREENSHOTS":"\u2022 N/A","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-not-reachable-no-return":{type:"all",substatus:["IN_Not_Reachable"],"field-REASON_COMMENTS":"Inativa\xE7\xE3o por aus\xEAncia de retorno do anunciante","field-COMENTARIOS":`O(a) anunciante n\xE3o compareceu \xE0 consultoria. Fiz as tentativas de liga\xE7\xE3o, mas n\xE3o obtive retorno.

Irei solicitar a inativa\xE7\xE3o do caso, levando em conta a aus\xEAncia de contato.`},"quickfill-in-not-ready-lack-of-access":{type:"all",substatus:["IN_Not_Ready"],"field-REASON_COMMENTS":"Inativa\xE7\xE3o por falta de acessos (Reagendamento solicitado)","field-COMENTARIOS":`N\xE3o conseguimos implementar nada durante a consultoria, j\xE1 que o(a) anunciante n\xE3o tinha os acessos necess\xE1rios.

Irei abrir caso em BAU para o dia solicitado e pedir a inativa\xE7\xE3o do mesmo, levando em conta a falta de acessos e a solicita\xE7\xE3o de reagendamento.`},"quickfill-in-infeasible":{type:"all",substatus:["IN_Infeasible"],"field-REASON_COMMENTS":"Inativa\xE7\xE3o por inviabilidade t\xE9cnica","field-COMENTARIOS":`\u2022 Avaliamos a implementa\xE7\xE3o solicitada e identificamos que n\xE3o \xE9 poss\xEDvel realiz\xE1-la devido \xE0 complexidade t\xE9cnica/estrutura do site (ex: [descrever a limita\xE7\xE3o encontrada]).
\u2022 N\xE3o se trata de uma limita\xE7\xE3o do Google, e sim da estrutura atual do site/plataforma do anunciante.
\u2022 Oriento o(a) anunciante sobre as op\xE7\xF5es dispon\xEDveis (ex: altera\xE7\xE3o da plataforma, apoio de um(a) desenvolvedor(a) especializado(a)).`},"quickfill-in-not-interested":{type:"all",substatus:["IN_Not_Interested"],"field-REASON_COMMENTS":"Inativa\xE7\xE3o por falta de interesse do anunciante","field-COMENTARIOS":`\u2022 O(a) anunciante informou que n\xE3o tem interesse em prosseguir com a consultoria neste momento.
\u2022 [Ou] O contato se limitou a perguntas gerais, sem inten\xE7\xE3o de realizar a implementa\xE7\xE3o.
\u2022 N\xE3o h\xE1 mais a\xE7\xF5es pendentes da nossa parte; caso encerrado a pedido do(a) anunciante.`},"quickfill-in-troubleshooting-transferred":{type:"all",substatus:["IN_Troubleshooting_Transferred"],"field-REASON_COMMENTS":"Inativa\xE7\xE3o - Troubleshooting sem sucesso, caso transferido","field-COMENTARIOS":`\u2022 Realizamos os passos de troubleshooting padr\xE3o para o problema relatado (ex: [listar testes/verifica\xE7\xF5es feitas]).
\u2022 Os passos n\xE3o resolveram o problema.
\u2022 Encaminho o caso para o time respons\xE1vel ([nome do time]) para continuidade.`},"quickfill-in-manual":{type:"all",substatus:[],"field-REASON_COMMENTS":"Outro (Manual)","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-as-no-show":{type:"all",substatus:["AS_Reschedule_1"],"field-MOTIVO_REAGENDAMENTO":"\u2022 Precisamos reagendar o caso, j\xE1 que o anunciante n\xE3o compareceu na meet, por\xE9m respondeu o e-mail pedindo o reagendamento"},"quickfill-as-insufficient-time":{type:"all",substatus:["AS_Reschedule_1"],"field-MOTIVO_REAGENDAMENTO":`\u2022 Precisamos reagendar o caso, j\xE1 que o tempo foi insuficiente para terminar as Tasks
\u2022 Implementamos [descrever o que foi feito]`},"quickfill-as-no-access":{type:"all",substatus:["AS_Reschedule_1"],"field-MOTIVO_REAGENDAMENTO":"\u2022 Precisamos reagendar o caso, j\xE1 que o(a) anunciante n\xE3o tinha acesso ao site, ao c\xF3digo ou ao CMS necess\xE1rios para a instala\xE7\xE3o do Google Tag Manager"},"quickfill-as-force-majeure":{type:"all",substatus:["AS_Acceptable_Reschedule"],"field-MOTIVO_REAGENDAMENTO":`\u2022 Reagendamento por fator maior fora do controle do anunciante (ex: falta de internet/energia, motivo de sa\xFAde) - dentro dos crit\xE9rios de reagendamento aceit\xE1vel.
\u2022 [Detalhar o fator espec\xEDfico relatado pelo anunciante]`},"quickfill-dc-lm-incomplete":{type:"all",substatus:["DC_Other"],"field-REASON_COMMENTS":"Nada foi implementado durante a consultoria (tempo insuficiente, limite de reagendamento excedido)","field-COMENTARIOS":`N\xE3o conseguimos implementar nada durante a consultoria, pois n\xE3o houve tempo o suficiente para terminar a task relacionada e o limite de reagendamentos j\xE1 foi atingido.

Irei abrir caso em BAU para o dia solicitado e pedir a inativa\xE7\xE3o do mesmo.`}},yn={"quickfill-gtm-install":{"field-REASON_COMMENTS":"Instalaci\xF3n de GTM finalizada.","field-TASKS_SOLICITADAS":"\u2022 Instalaci\xF3n de GTM","field-PASSOS_EXECUTADOS":`\u2022 Creamos la cuenta dentro de GTM
\u2022 Lo instalamos dentro del CMS/Hosting.
\u2022 Creamos el Vinculador de Conversiones.`,"field-RESULTADO":"\u2022 Valid\xE9 la instalaci\xF3n."},"quickfill-whatsapp":{"field-REASON_COMMENTS":"Instalaci\xF3n del Ads Conversion Tracking para WhatsApp finalizada.","field-TASKS_SOLICITADAS":"\u2022 Creaci\xF3n de conversi\xF3n para WHATSAPP","field-PASSOS_EXECUTADOS":`\u2022 Realizamos la creaci\xF3n de la conversi\xF3n en Ads.
\u2022 Creamos la etiqueta en GTM para los botones de WhatsApp.
\u2022 Realizamos las pruebas y validamos el funcionamiento.`,"field-RESULTADO":"\u2022 Tarea implementada con \xE9xito. Cierro el caso sin seguimiento."},"quickfill-form":{"field-REASON_COMMENTS":"Instalaci\xF3n del Ads Conversion Tracking para Formulario finalizada.","field-TASKS_SOLICITADAS":"\u2022 Creaci\xF3n de conversi\xF3n para FORMULARIO (est\xE1ndar, no optimizada).","field-PASSOS_EXECUTADOS":`\u2022 Realizamos la creaci\xF3n de la conversi\xF3n en Ads.
\u2022 Creamos la etiqueta en GTM.
\u2022 Realizamos las pruebas y validamos el funcionamiento.`,"field-RESULTADO":"\u2022 Tarea implementada con \xE9xito. Cierro el caso sin seguimiento."},"quickfill-ecw4-close":{"field-REASON_COMMENTS":"Finalizaci\xF3n del seguimiento de EC.","field-TASKS_SOLICITADAS":"\u2022 Seguimiento de la conversi\xF3n optimizada (ECW4).","field-PASSOS_EXECUTADOS":`\u2022 Despu\xE9s del per\xEDodo de seguimiento, verifiqu\xE9 el panel de Ads.
\u2022 La conversi\xF3n se est\xE1 registrando correctamente.`,"field-RESULTADO":`\u2022 Valido el buen funcionamiento de la conversi\xF3n optimizada.
\u2022 As\xED, cierro el caso.`},"quickfill-ga4-event-close":{"field-REASON_COMMENTS":"Finalizaci\xF3n del seguimiento de GA4.","field-TASKS_SOLICITADAS":"\u2022 Seguimiento de Eventos GA4 despu\xE9s de 48h.","field-PASSOS_EXECUTADOS":`\u2022 Despu\xE9s del per\xEDodo de 48h de seguimiento, verifiqu\xE9 el panel.
\u2022 El evento se est\xE1 registrando correctamente.`,"field-RESULTADO":`\u2022 Valido el buen funcionamiento del rastreo de eventos.
\u2022 As\xED, cierro el caso.`},"quickfill-ni-inicio-manual":{"field-REASON_COMMENTS":"Esperando informaci\xF3n por parte del anunciante (Inicio 2/6)"},"quickfill-ni-cms-access":{"field-REASON_COMMENTS":"Esperando informaci\xF3n por parte del anunciante (Inicio 2/6 - Sin Acceso al CMS)","field-TASKS_SOLICITADAS":`\u2022 Instalaci\xF3n de GTM
\u2022 Configuraci\xF3n de Conversiones`,"field-CONTEXTO_CALL":`\u2022 Not\xE9 que el/la anunciante no ten\xEDa GTM instalado.
\u2022 Seguimos con la creaci\xF3n de la cuenta en GTM.
\u2022 Sin embargo, la cuenta de acceso al panel del sitio (ej: WordPress) no ten\xEDa permiso para instalar plugins o editar el c\xF3digo.`,"field-IMPEDIMENTO_CLIENTE":`\u2022 El/la anunciante necesita conseguir acceso de administrador al panel del sitio.
\u2022 O
\u2022 El/la anunciante necesita contactar al/a la desarrollador(a) para que instale GTM.`,"field-MINHA_ACAO":`\u2022 Coloco el caso en 2/6.
\u2022 Una vez que el/la anunciante tenga el acceso o se realice la instalaci\xF3n, abrir\xE9 un caso en BAU para dar continuidad.`,"field-SCREENSHOTS":"\u2022 Captura del panel del CMS mostrando la falta de permiso (opcional)."},"quickfill-ni-lack-of-access":{"field-REASON_COMMENTS":"Esperando informaci\xF3n por parte del anunciante (Falta de accesos necesarios)","field-CONTEXTO_CALL":`\u2022 Durante la call, identificamos que los accesos necesarios para continuar con la implementaci\xF3n no estaban disponibles.
\u2022 Orient\xE9 al/a la anunciante sobre qu\xE9 accesos son necesarios y c\xF3mo obtenerlos.`,"field-IMPEDIMENTO_CLIENTE":"\u2022 El/la anunciante necesita proporcionar los accesos necesarios (ej: panel del sitio, plataforma de anuncios, o contacto con el/la desarrollador(a)) para que la implementaci\xF3n sea concluida.","field-MINHA_ACAO":`\u2022 Coloco el caso en 2/6.
\u2022 Una vez que el/la anunciante obtenga los accesos, abrir\xE9 un caso en BAU para dar continuidad.`},"quickfill-ni-followup-bau":{"field-REASON_COMMENTS":"Esperando informaci\xF3n por parte del anunciante (Follow-up BAU 2/6)","field-CONTEXTO_CALL":"\u2022 El d\xEDa {DIA} del 2/6 hice dos intentos de contacto seguidos, pero no obtuve respuesta. Env\xEDo a continuaci\xF3n el correo correspondiente al d\xEDa respectivo.","field-SCREENSHOTS":`\u2022 Intento 1 -
\u2022 Intento 2 -`},"quickfill-ni-awaiting-ecw4":{"field-REASON_COMMENTS":"Esperando validaci\xF3n de datos (ECW4 - 7 D\xEDas)","field-TASKS_SOLICITADAS":"\u2022 Implementaci\xF3n de Conversiones Optimizadas (ECW4)","field-CONTEXTO_CALL":`\u2022 Creamos la conversi\xF3n en Google Ads.
\u2022 Configuramos el disparo de las etiquetas v\xEDa GTM.
\u2022 Agregamos la etiqueta de UPD (User Provided Data).
\u2022 Probamos juntos y validamos el buen funcionamiento.`,"field-MINHA_ACAO":"\u2022 Coloco el caso en estado de Awaiting Validation para seguimiento de 7 d\xEDas."},"quickfill-ni-awaiting-ga4":{"field-REASON_COMMENTS":"Esperando validaci\xF3n de datos (GA4 Event - 48h)","field-TASKS_SOLICITADAS":"\u2022 Implementaci\xF3n de Eventos GA4","field-CONTEXTO_CALL":`\u2022 Creamos el evento en GA4.
\u2022 Configuramos el disparo de las etiquetas v\xEDa GTM.
\u2022 Probamos juntos y validamos el buen funcionamiento.`,"field-MINHA_ACAO":"\u2022 Coloco el caso en estado de Awaiting Validation para seguimiento de 48h."},"quickfill-ni-followup-lm":{"field-REASON_COMMENTS":"Intento de contacto sin \xE9xito (Follow-up LM 2/6)","field-CONTEXTO_CALL":"\u2022 El d\xEDa {DIA} del 2/6 envi\xE9 correo de follow-up (caso LM, sin intentos de llamada), pero no obtuve respuesta.","field-SCREENSHOTS":"\u2022 Correo de follow-up enviado (LM) -"},"quickfill-ni-attempted-2day":{"field-REASON_COMMENTS":"Attempted Contact (Inicio 2 Day Rule)","field-CONTEXTO_CALL":`\u2022 Hice el primer intento de llamada, sin \xE9xito.
\u2022 Envi\xE9 un mensaje en el chat al AM.
\u2022 Esper\xE9 5 minutos e hice el segundo intento de llamada, nuevamente sin \xE9xito.
\u2022 Esper\xE9 5 minutos m\xE1s y ahora har\xE9 el seguimiento 2 Day Rule.`,"field-SCREENSHOTS":`\u2022 MSG AM -
\u2022 Intento 1 -
\u2022 Intento 2 -`},"quickfill-in-nrp-bau":{"field-REASON_COMMENTS":"NRP (BAU - 3 intentos)","field-COMENTARIOS":`\u2022 Dos llamadas seguidas, y correo "Antes de los 10 minutos" y un tercer y \xFAltimo intento de llamada.
\u2022 No hubo respuesta a los intentos de llamada o correo, por eso el caso ser\xE1 inactivado.`,"field-SCREENSHOTS":`\u2022 Intento 1 -
\u2022 Intento 2 -
\u2022 Intento 3 -`},"quickfill-in-no-show-bau":{"field-REASON_COMMENTS":"Sin respuesta al 2 Day Rule.","field-COMENTARIOS":`\u2022 El caso fue generado y entr\xE9 a la llamada en el horario agendado.
\u2022 El/la anunciante no asisti\xF3 a la reuni\xF3n.
\u2022 Segu\xED el protocolo de espera (BAU): realic\xE9 dos intentos de llamada, sin \xE9xito.
\u2022 Ninguna de las llamadas fue atendida (ej: Buz\xF3n de voz).
\u2022 Caso inactivado despu\xE9s del 2 Day Rule.`},"quickfill-in-2-6-final":{"field-REASON_COMMENTS":"Finalizaci\xF3n (2/6)","field-COMENTARIOS":"\u2022 D\xEDa 9 finalizaci\xF3n del 2/6, durante el per\xEDodo de seguimiento no hubo respuesta del/de la anunciante, entonces el caso ser\xE1 cerrado."},"quickfill-in-not-reachable-no-return":{"field-REASON_COMMENTS":"Inactivaci\xF3n por ausencia de respuesta del/de la anunciante","field-COMENTARIOS":`El/la anunciante no asisti\xF3 a la consultor\xEDa. Hice los intentos de llamada, pero no obtuve respuesta.

Solicitar\xE9 la inactivaci\xF3n del caso, teniendo en cuenta la ausencia de contacto.`},"quickfill-in-not-ready-lack-of-access":{"field-REASON_COMMENTS":"Inactivaci\xF3n por falta de accesos (Reprogramaci\xF3n solicitada)","field-COMENTARIOS":`No pudimos implementar nada durante la consultor\xEDa, ya que el/la anunciante no ten\xEDa los accesos necesarios.

Abrir\xE9 un caso en BAU para el d\xEDa solicitado y pedir\xE9 la inactivaci\xF3n del mismo, teniendo en cuenta la falta de accesos y la solicitud de reprogramaci\xF3n.`},"quickfill-in-infeasible":{"field-REASON_COMMENTS":"Inactivaci\xF3n por inviabilidad t\xE9cnica","field-COMENTARIOS":`\u2022 Evaluamos la implementaci\xF3n solicitada e identificamos que no es posible realizarla debido a la complejidad t\xE9cnica/estructura del sitio (ej: [describir la limitaci\xF3n encontrada]).
\u2022 No se trata de una limitaci\xF3n de Google, sino de la estructura actual del sitio/plataforma del/de la anunciante.
\u2022 Oriento al/a la anunciante sobre las opciones disponibles (ej: cambio de plataforma, apoyo de un(a) desarrollador(a) especializado(a)).`},"quickfill-in-not-interested":{"field-REASON_COMMENTS":"Inactivaci\xF3n por falta de inter\xE9s del/de la anunciante","field-COMENTARIOS":`\u2022 El/la anunciante inform\xF3 que no tiene inter\xE9s en continuar con la consultor\xEDa en este momento.
\u2022 [O] El contacto se limit\xF3 a preguntas generales, sin intenci\xF3n de realizar la implementaci\xF3n.
\u2022 No hay m\xE1s acciones pendientes de nuestra parte; caso cerrado a pedido del/de la anunciante.`},"quickfill-in-troubleshooting-transferred":{"field-REASON_COMMENTS":"Inactivaci\xF3n - Troubleshooting sin \xE9xito, caso transferido","field-COMENTARIOS":`\u2022 Realizamos los pasos de troubleshooting est\xE1ndar para el problema reportado (ej: [listar pruebas/verificaciones realizadas]).
\u2022 Los pasos no resolvieron el problema.
\u2022 Derivo el caso al equipo responsable ([nombre del equipo]) para su continuidad.`},"quickfill-in-manual":{"field-REASON_COMMENTS":"Otro (Manual)"},"quickfill-as-no-show":{"field-MOTIVO_REAGENDAMENTO":"\u2022 Necesitamos reprogramar el caso, ya que el/la anunciante no asisti\xF3 al meet, pero respondi\xF3 el correo pidiendo la reprogramaci\xF3n"},"quickfill-as-insufficient-time":{"field-MOTIVO_REAGENDAMENTO":`\u2022 Necesitamos reprogramar el caso, ya que el tiempo fue insuficiente para terminar las Tareas
\u2022 Implementamos [describir lo que se hizo]`},"quickfill-as-no-access":{"field-MOTIVO_REAGENDAMENTO":"\u2022 Necesitamos reprogramar el caso, ya que el/la anunciante no ten\xEDa acceso al sitio, al c\xF3digo o al CMS necesarios para la instalaci\xF3n de Google Tag Manager"},"quickfill-as-force-majeure":{"field-MOTIVO_REAGENDAMENTO":`\u2022 Reprogramaci\xF3n por fuerza mayor fuera del control del/de la anunciante (ej: falta de internet/energ\xEDa, motivo de salud) - dentro de los criterios de reprogramaci\xF3n aceptable.
\u2022 [Detallar el factor espec\xEDfico reportado por el/la anunciante]`},"quickfill-dc-lm-incomplete":{"field-REASON_COMMENTS":"Nada fue implementado durante la consultor\xEDa (tiempo insuficiente, l\xEDmite de reprogramaci\xF3n excedido)","field-COMENTARIOS":`No pudimos implementar nada durante la consultor\xEDa, pues no hubo tiempo suficiente para terminar la tarea relacionada y el l\xEDmite de reprogramaciones ya fue alcanzado.

Abrir\xE9 un caso en BAU para el d\xEDa solicitado y pedir\xE9 la inactivaci\xF3n del mismo.`}},Sn={"quickfill-gtm-install":{"field-REASON_COMMENTS":"GTM installation completed.","field-TASKS_SOLICITADAS":"\u2022 GTM Installation","field-PASSOS_EXECUTADOS":`\u2022 We created the account inside GTM
\u2022 We installed it inside the CMS/Hosting.
\u2022 We created the Conversion Linker.`,"field-RESULTADO":"\u2022 I validated the installation."},"quickfill-whatsapp":{"field-REASON_COMMENTS":"Ads Conversion Tracking installation for WhatsApp completed.","field-TASKS_SOLICITADAS":"\u2022 Conversion creation for WHATSAPP","field-PASSOS_EXECUTADOS":`\u2022 We created the conversion in Ads.
\u2022 We created the Tag in GTM for the WhatsApp buttons.
\u2022 We ran the tests and validated that it works.`,"field-RESULTADO":"\u2022 Task implemented successfully. I am closing the case with no follow-up."},"quickfill-form":{"field-REASON_COMMENTS":"Ads Conversion Tracking installation for Form completed.","field-TASKS_SOLICITADAS":"\u2022 Conversion creation for FORM (standard, not optimized).","field-PASSOS_EXECUTADOS":`\u2022 We created the conversion in Ads.
\u2022 We created the Tag in GTM.
\u2022 We ran the tests and validated that it works.`,"field-RESULTADO":"\u2022 Task implemented successfully. I am closing the case with no follow-up."},"quickfill-ecw4-close":{"field-REASON_COMMENTS":"End of the EC follow-up.","field-TASKS_SOLICITADAS":"\u2022 Follow-up of the optimized conversion (ECW4).","field-PASSOS_EXECUTADOS":`\u2022 After the follow-up period, I checked the Ads dashboard.
\u2022 The conversion is being recorded correctly.`,"field-RESULTADO":`\u2022 I confirm the optimized conversion is working.
\u2022 I am therefore closing the case.`},"quickfill-ga4-event-close":{"field-REASON_COMMENTS":"End of the GA4 follow-up.","field-TASKS_SOLICITADAS":"\u2022 GA4 Events follow-up after 48h.","field-PASSOS_EXECUTADOS":`\u2022 After the 48h follow-up period, I checked the dashboard.
\u2022 The event is being recorded correctly.`,"field-RESULTADO":`\u2022 I confirm the event tracking is working.
\u2022 I am therefore closing the case.`},"quickfill-ni-inicio-manual":{"field-REASON_COMMENTS":"Awaiting information from the advertiser (Start 2/6)"},"quickfill-ni-cms-access":{"field-REASON_COMMENTS":"Awaiting information from the advertiser (Start 2/6 - No CMS Access)","field-TASKS_SOLICITADAS":`\u2022 GTM Installation
\u2022 Conversion setup`,"field-CONTEXTO_CALL":`\u2022 I noticed the advertiser did not have GTM installed.
\u2022 We went ahead with creating the GTM account.
\u2022 However, the account used to access the site's panel (e.g.: WordPress) did not have permission to install plugins or edit the code.`,"field-IMPEDIMENTO_CLIENTE":`\u2022 The advertiser needs to obtain administrator access to the site's panel.
\u2022 OR
\u2022 The advertiser needs to contact their developer so that they install GTM.`,"field-MINHA_ACAO":`\u2022 I am placing the case in 2/6.
\u2022 As soon as the advertiser has access or the installation is done, I will open a BAU case to continue.`,"field-SCREENSHOTS":"\u2022 Screenshot of the CMS panel showing the missing permission (optional)."},"quickfill-ni-lack-of-access":{"field-REASON_COMMENTS":"Awaiting information from the advertiser (Missing required access)","field-CONTEXTO_CALL":`\u2022 During the call we identified that the access required to proceed with the implementation was not available.
\u2022 I walked the advertiser through which access is required and how to obtain it.`,"field-IMPEDIMENTO_CLIENTE":"\u2022 The advertiser needs to arrange the required access (e.g.: site panel, ads platform, or contact with their developer) so the implementation can be completed.","field-MINHA_ACAO":`\u2022 I am placing the case in 2/6.
\u2022 As soon as the advertiser obtains the access, I will open a BAU case to continue.`},"quickfill-ni-awaiting-ecw4":{"field-REASON_COMMENTS":"Awaiting data validation (ECW4 - 7 Days)","field-TASKS_SOLICITADAS":"\u2022 Enhanced Conversions implementation (ECW4)","field-CONTEXTO_CALL":`\u2022 We created the conversion in Google Ads.
\u2022 We set up the tag firing via GTM.
\u2022 We added the UPD (User Provided Data) tag.
\u2022 We tested together and validated that it works.`,"field-MINHA_ACAO":"\u2022 I am moving the case to Awaiting Validation for a 7-day follow-up."},"quickfill-ni-awaiting-ga4":{"field-REASON_COMMENTS":"Awaiting data validation (GA4 Event - 48h)","field-TASKS_SOLICITADAS":"\u2022 GA4 Events implementation","field-CONTEXTO_CALL":`\u2022 We created the event in GA4.
\u2022 We set up the tag firing via GTM.
\u2022 We tested together and validated that it works.`,"field-MINHA_ACAO":"\u2022 I am moving the case to Awaiting Validation for a 48h follow-up."},"quickfill-ni-followup-bau":{"field-REASON_COMMENTS":"Awaiting information from the advertiser (BAU Follow-up 2/6)","field-CONTEXTO_CALL":"\u2022 On day {DIA} of the 2/6 I made two consecutive contact attempts with no answer. I am sending the email for that day next.","field-SCREENSHOTS":`\u2022 Attempt 1 - 
\u2022 Attempt 2 - `},"quickfill-ni-followup-lm":{"field-REASON_COMMENTS":"Contact attempt unsuccessful (LM Follow-up 2/6)","field-CONTEXTO_CALL":"\u2022 On day {DIA} of the 2/6 I sent a follow-up email (LM case, no call attempts) with no answer.","field-SCREENSHOTS":"\u2022 Follow-up email sent (LM) - "},"quickfill-ni-attempted-2day":{"field-REASON_COMMENTS":"Attempted Contact (Start 2 Day Rule)","field-CONTEXTO_CALL":`\u2022 I made the first call attempt, with no success.
\u2022 I sent a chat message to the AM.
\u2022 I waited 5 minutes and made the second call attempt, again with no success.
\u2022 I waited another 5 minutes and will now proceed with the 2 Day Rule follow-up.`,"field-SCREENSHOTS":`\u2022 MSG AM - 
\u2022 Attempt 1 - 
\u2022 Attempt 2 - `},"quickfill-in-nrp-bau":{"field-REASON_COMMENTS":"NRP (BAU - 3 attempts)","field-COMENTARIOS":`\u2022 Two consecutive calls, the "Before the 10 minutes" email and a third and final call attempt.
\u2022 There was no answer to the call attempts or the email, so the case will be inactivated.`,"field-SCREENSHOTS":`\u2022 Attempt 1 - 
\u2022 Attempt 2 - 
\u2022 Attempt 3 - `},"quickfill-in-no-show-bau":{"field-REASON_COMMENTS":"No answer to the 2 Day Rule.","field-COMENTARIOS":`\u2022 The case was created and I joined the call at the scheduled time.
\u2022 The advertiser did not attend the meeting.
\u2022 I followed the waiting protocol (BAU): I made two call attempts, with no success.
\u2022 Neither call was answered (e.g.: voicemail).
\u2022 Case inactivated after the 2 Day Rule.`},"quickfill-in-2-6-final":{"field-REASON_COMMENTS":"Closure (2/6)","field-COMENTARIOS":"\u2022 Day 9, closure of the 2/6. There was no response from the advertiser during the follow-up period, so the case will be closed."},"quickfill-in-not-reachable-no-return":{"field-REASON_COMMENTS":"Inactivation due to no response from the advertiser","field-COMENTARIOS":`The advertiser did not attend the consultation. I made the call attempts but got no response.

I will request the inactivation of the case, taking the lack of contact into account.`},"quickfill-in-not-ready-lack-of-access":{"field-REASON_COMMENTS":"Inactivation due to missing access (Rescheduling requested)","field-COMENTARIOS":`We were unable to implement anything during the consultation, as the advertiser did not have the required access.

I will open a BAU case for the requested day and ask for it to be inactivated, taking into account the missing access and the rescheduling request.`},"quickfill-in-infeasible":{"field-REASON_COMMENTS":"Inactivation due to technical infeasibility","field-COMENTARIOS":`\u2022 We assessed the requested implementation and found that it cannot be carried out due to the technical complexity/structure of the site (e.g.: [describe the limitation found]).
\u2022 This is not a Google limitation, but the current structure of the advertiser's site/platform.
\u2022 I walked the advertiser through the available options (e.g.: changing platform, support from a specialized developer).`},"quickfill-in-not-interested":{"field-REASON_COMMENTS":"Inactivation due to lack of advertiser interest","field-COMENTARIOS":`\u2022 The advertiser said they are not interested in proceeding with the consultation at this time.
\u2022 [Or] The contact was limited to general questions, with no intention of carrying out the implementation.
\u2022 There are no further actions pending on our side; case closed at the advertiser's request.`},"quickfill-in-troubleshooting-transferred":{"field-REASON_COMMENTS":"Inactivation - Troubleshooting unsuccessful, case transferred","field-COMENTARIOS":`\u2022 We ran the standard troubleshooting steps for the reported problem (e.g.: [list the tests/checks performed]).
\u2022 The steps did not resolve the problem.
\u2022 I am forwarding the case to the responsible team ([team name]) to continue.`},"quickfill-in-manual":{"field-REASON_COMMENTS":"Other (Manual)"},"quickfill-as-no-show":{"field-MOTIVO_REAGENDAMENTO":"\u2022 We need to reschedule the case, as the advertiser did not attend the meet but replied to the email asking to reschedule"},"quickfill-as-insufficient-time":{"field-MOTIVO_REAGENDAMENTO":`\u2022 We need to reschedule the case, as there was not enough time to finish the Tasks
\u2022 We implemented [describe what was done]`},"quickfill-as-no-access":{"field-MOTIVO_REAGENDAMENTO":"\u2022 We need to reschedule the case, as the advertiser did not have access to the site, the code or the CMS required to install Google Tag Manager"},"quickfill-as-force-majeure":{"field-MOTIVO_REAGENDAMENTO":`\u2022 Rescheduling due to force majeure outside the advertiser's control (e.g.: no internet/power, health reasons) - within the acceptable rescheduling criteria.
\u2022 [Detail the specific factor reported by the advertiser]`},"quickfill-dc-lm-incomplete":{"field-REASON_COMMENTS":"Nothing was implemented during the consultation (insufficient time, rescheduling limit exceeded)","field-COMENTARIOS":`We were unable to implement anything during the consultation, as there was not enough time to finish the related task and the rescheduling limit has already been reached.

I will open a BAU case for the requested day and ask for it to be inactivated.`}};var Rs={pt:{searching:"Buscando ID...",readingMessage:"Lendo mensagem...",idFound:e=>`ID Localizado: ${e}`,noIdFound:"Nenhum ID encontrado.",notFound:"N\xE3o encontrado",processingError:"Erro ao processar."},es:{searching:"Buscando ID...",readingMessage:"Leyendo mensaje...",idFound:e=>`ID Encontrado: ${e}`,noIdFound:"Ning\xFAn ID encontrado.",notFound:"No encontrado",processingError:"Error al procesar."},en:{searching:"Searching for ID...",readingMessage:"Reading message...",idFound:e=>`ID found: ${e}`,noIdFound:"No ID found.",notFound:"Not found",processingError:"Processing error."}};function oo(e){let t=ge();return Rs[t]?.[e]??Rs.pt[e]}var zs="cw-automation-styles";if(!document.getElementById(zs)){let e=document.createElement("style");e.id=zs,e.innerHTML=`
        /* Anima\xE7\xE3o da Borda Google */
        @keyframes google-border-spin {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .cw-scanning-active {
            /* Borda gradiente animada */
            border: 2px solid transparent !important;
            border-radius: 8px !important;
            background-image: linear-gradient(#fff, #fff), 
                              linear-gradient(90deg, #4285F4, #EA4335, #FBBC04, #34A853);
            background-origin: border-box;
            background-clip: padding-box, border-box;
            background-size: 200% 200%;
            animation: google-border-spin 1.5s linear infinite;
            box-shadow: 0 4px 15px rgba(66, 133, 244, 0.3) !important;
            
            /* Traz para frente do Overlay */
            position: relative;
            z-index: ${gt.PAGE_SPOTLIGHT_TARGET} !important; 
            pointer-events: none;
        }

        /* Overlay Limpo (Sem texto, s\xF3 Blur) */
        #cw-loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(255, 255, 255, 0.4); /* Branco Transl\xFAcido */
            backdrop-filter: blur(5px);           /* O Desfoque Apple Glass */
            -webkit-backdrop-filter: blur(5px);
            z-index: ${gt.PAGE_SPOTLIGHT_OVERLAY};   /* Fica atr\xE1s do Input */
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: all;                  /* Bloqueia cliques na p\xE1gina */
        }
    `,document.head.appendChild(e)}function $s(e){let t=document.getElementById("cw-loading-overlay");e?t?t.style.opacity="1":(t=document.createElement("div"),t.id="cw-loading-overlay",document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1")):t&&(t.style.opacity="0",setTimeout(()=>t.remove(),300))}async function no(e){await Io();let t=typeof e=="string"?document.getElementById(e):e,a="";$s(!0),t&&(a=t.placeholder,t.placeholder=oo("searching"),t.value="",t.classList.add("cw-scanning-active"));try{let o=document.querySelector('material-button[debug-id="dock-item-case-log"]');o&&!o.classList.contains("selected")&&(xa(o),await Ne(1200));let n=document.querySelector("search-filter dropdown-button .button");if(n&&!(n.innerText||"").includes("All")){xa(n),await Ne(600);let u=document.querySelector('material-checkbox[debug-id="check-all-box"]');u&&u.getAttribute("aria-checked")!=="true"&&(xa(u),await Ne(300));let h=document.querySelector('material-button[debug-id="apply-filter"]');h&&(xa(h),await Ne(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await Ne(500));let r=Array.from(document.querySelectorAll(".message-header"));for(let m=r.length-1;m>=0;m--){let u=r[m],h=u.querySelector("i.material-icons-extended"),L=h&&h.innerText.trim()==="phone_in_talk",S=u.innerText||"",C=S.includes("Agent joined")||S.includes("outbound-call")||S.includes("Speakeasy");if(L||C){u.getAttribute("aria-expanded")==="true"||(t&&(t.placeholder=oo("readingMessage")),xa(u),await Ne(1e3));break}}let l=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),p=/Speakeasy.*?(P\d{15,25})/i,c=null;for(let m=l.length-1;m>=0;m--){let u=l[m];if(u.offsetParent===null)continue;let h=(u.innerText||"").match(p);if(h&&h[1]){c=h[1];break}}if(t)if(c){try{await navigator.clipboard.writeText(c)}catch{}t.tagName==="INPUT"||t.tagName==="TEXTAREA"?t.value=c:t.textContent=c,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),w.playReady(),za("confirma"),ne(oo("idFound")(c)),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}else w.playError(),za("erro"),ne(oo("noIdFound"),{error:!0}),t.placeholder=oo("notFound"),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}catch(o){console.error("Erro na automa\xE7\xE3o:",o),w.playError(),ne(oo("processingError"),{error:!0})}finally{t&&(t.classList.remove("cw-scanning-active"),t.value||(t.placeholder=a)),$s(!1)}}function Ps(e){e.dataset.bulletEnabled!=="true"&&(e.dataset.bulletEnabled="true",(e.value.trim()===""||e.value.trim()==="\u2022")&&(e.value="\u2022 "),e.addEventListener("keydown",function(t){let a=this.selectionStart,o=this.selectionEnd,n=this.value,i=n.lastIndexOf(`
`,a-1)+1,r=n.substring(i,a);if(t.key==="Enter"){t.preventDefault();let s=r.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(r.trim()==="\u2022"){this.value=n.substring(0,i)+`
`+n.substring(o),this.selectionStart=this.selectionEnd=i+1;return}let l=`
`+s;this.value=n.substring(0,a)+l+n.substring(o),this.selectionStart=this.selectionEnd=a+l.length}else if(t.key==="Tab")t.preventDefault(),t.shiftKey?r.startsWith("  ")&&(this.value=n.substring(0,i)+r.substring(2)+n.substring(a),this.selectionStart=this.selectionEnd=a-2):(this.value=n.substring(0,i)+"  "+r+n.substring(a),this.selectionStart=this.selectionEnd=a+2);else if(t.key==="Backspace"&&a===o&&a>0){let s=n.substring(0,a);s.endsWith("\u2022 ")?(t.preventDefault(),this.value=s.substring(0,a-2)+n.substring(o),this.selectionStart=this.selectionEnd=a-2):s.endsWith("  ")&&r.trim().startsWith("\u2022")&&(t.preventDefault(),this.value=s.substring(0,a-2)+n.substring(o),this.selectionStart=this.selectionEnd=a-2)}}))}var Ai=(e,t)=>bt[e.currentLang]?.[t]||bt.pt?.[t]||t,Ei=e=>bt[ge()]?.[e]||bt.pt?.[e]||e;function $o(e,t,a){t.innerHTML="";let o=st[e];if(!o)return;let n=zo(o);if(a.activeFields.forEach(r=>{if(["TAGS_IMPLEMENTED","SCREENSHOTS_LIST","CONSENTIU_GRAVACAO","CASO_PORTUGAL","label_substatus"].includes(r))return;let s=`field-${r}`,l=document.createElement("label"),p=h=>Ai(a,h);l.textContent=p(r.toLowerCase())!==r.toLowerCase()?p(r.toLowerCase()):r.replace(/_/g," ").replace(/\b\w/g,h=>h.toUpperCase())+":",Object.assign(l.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px",fontWeight:"700",color:J.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let c=n.includes(r),m=document.createElement("span");if(m.textContent=l.textContent,c){let h=document.createElement("span");h.textContent=" *",h.style.color=J.error,m.appendChild(h)}if(l.innerHTML="",l.appendChild(m),r==="SPEAKEASY_ID"){let h=document.createElement("button");h.innerHTML=Ei("auto_busca"),h.style.cssText=`font-size: 11px; font-weight: 700; color: ${J.primary}; background-color: ${J.primaryBg}; border: none; border-radius: ${pt.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${Pe};`,h.onmouseenter=()=>h.style.backgroundColor="#d2e3fc",h.onmouseleave=()=>h.style.backgroundColor=J.primaryBg,h.onclick=L=>{L.preventDefault(),w.playClick(),no(s)},l.appendChild(h)}if(!c){let h=document.createElement("button");h.innerHTML="\u2715",h.style.cssText=`font-size: 14px; background: ${J.bgInput}; border: none; color: ${J.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${Pe};`,h.onmouseenter=()=>{h.style.background=J.error,h.style.color=J.surface},h.onmouseleave=()=>{h.style.background=J.bgInput,h.style.color=J.textSub},h.onclick=async L=>{L.preventDefault(),w.playClick();let S=m.textContent.replace(/:\s*$/,"").trim();await ot(Ei("remover_campo_confirm").replace("{campo}",S),{danger:!0,confirmText:Ei("remover")})&&(a.removeField(r),$o(e,t,a))},l.appendChild(h)}let u;ao.includes(r)?(u=document.createElement("textarea"),u.classList.add("bullet-textarea","cw-textarea"),u.placeholder=p("utilize_marcadores"),Ps(u)):wn.includes(r)?(u=document.createElement("textarea"),u.classList.add("cw-textarea"),u.placeholder=p("descreva_consideracoes")):(u=document.createElement("input"),u.type="text",u.classList.add("cw-input")),u.id=s,u.value=a.formData[s]||"",u.addEventListener("input",h=>a.updateField(s,h.target.value)),t.appendChild(l),t.appendChild(u)}),a.activeFields.includes("CONSENTIU_GRAVACAO")){let r=p=>Ai(a,p),s=document.createElement("label");s.textContent=r("consentiu_gravacao"),Object.assign(s.style,{display:"block",fontSize:"13px",fontWeight:"700",color:J.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let l=document.createElement("select");l.className="cw-select",l.innerHTML=`
            <option value="false">${r("nao")}</option>
            <option value="true">${r("sim")}</option>
        `,l.value=a.consent?"true":"false",l.onchange=()=>a.setConsent(l.value==="true"),t.appendChild(s),t.appendChild(l)}let i=(o.templateFields||[]).filter(r=>!n.includes(r)&&!a.activeFields.includes(r));if(i.length>0){let r=l=>Ai(a,l),s=document.createElement("div");Object.assign(s.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginTop:"24px"}),i.forEach(l=>{let p=r(l.toLowerCase())!==l.toLowerCase()?r(l.toLowerCase()):l.replace(/_/g," ").replace(/\b\w/g,m=>m.toUpperCase())+":",c=document.createElement("button");c.type="button",c.textContent=`+ ${p.replace(/:$/,"")}`,c.style.cssText=`font-size: 12px; font-weight: 600; color: ${J.primary}; background-color: ${J.primaryBg}; border: none; border-radius: ${pt.pill}; padding: 6px 14px; cursor: pointer; transition: all 0.2s ${Pe};`,c.onmouseenter=()=>c.style.backgroundColor="#d2e3fc",c.onmouseleave=()=>c.style.backgroundColor=J.primaryBg,c.onclick=m=>{m.preventDefault(),w.playClick(),a.addFieldAt(l,a.activeFields.length),$o(e,t,a)},s.appendChild(c)}),t.appendChild(s)}}var ki={ES:{...yn},EN:{...Sn},substatus:Object.fromEntries(Object.entries(_t).map(([e,t])=>[e,t.substatus||[]]))};function wu(e,t,a){let o=Sa(t,a[0]),n=Object.keys(ki[e]).find(i=>{let r=ki.substatus[i]||[];return Sa(i,r[0])===o&&a.some(s=>r.includes(s))});return n?ki[e][n]:void 0}function yu(e){let t=String(e.label||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");return`cw-${String(e.key||"").toLowerCase()}-${t}`}function Su(e){let t;try{t=JSON.parse(e||"{}")}catch{return null}let a=t.fields||{};return Object.keys(a).length?{fields:a,linkedTask:t.linkedTask,activeTasks:t.activeTasks}:null}function Bs(e){if(!Array.isArray(e)||!e.length)return!1;let t={},a={ES:{},EN:{}},o=e.slice().sort((n,i)=>(n.sortOrder||0)-(i.sortOrder||0));for(let n of o){if(!n.key)continue;let i=Su(n.value);if(!i)continue;let r=yu(n),s=String(n.lang||"").toUpperCase(),l=a[s];if(l){l[r]={...i.fields};continue}s&&s!=="PT"&&s!=="ALL"||(t[r]={type:(n.field||"all").toLowerCase(),substatus:[n.key],...i.fields,...i.linkedTask?{linkedTask:i.linkedTask}:{},...i.activeTasks?{activeTasks:i.activeTasks}:{}})}if(!Object.keys(t).length)return!1;for(let n of Object.keys(_t))delete _t[n];Object.assign(_t,t);for(let[n,i]of[["ES",yn],["EN",Sn]]){let r={};for(let[s,l]of Object.entries(t)){let p=wu(n,s,l.substatus);p&&(r[s]=p)}Object.assign(r,a[n]);for(let s of Object.keys(i))delete i[s];Object.assign(i,r)}return!0}async function Gs(){let e=ke.getCachedContent("note_template"),t=Bs(e);try{let a=await ke.fetchContentModule("note_template");t=Bs(a)||t}catch(a){console.warn("Modelos de nota indispon\xEDveis; usando os embutidos.",a)}return t}function Cu(e){let t;try{t=JSON.parse(e||"{}")}catch{return null}let a=String(t.name||"").trim();if(!a)return null;let o=t.screenshots||{},n=Array.isArray(o.implementation)?o.implementation:[],i=Array.isArray(o.education)?o.education:[],r={name:a,daCentral:!0,screenshots:{implementation:n,education:i}};t.popular===!0&&(r.popular=!0);for(let s of["es","en"]){let l=`screenshots_${s}`,p=t[l];!p||!(Array.isArray(p.implementation)||Array.isArray(p.education))||(r[l]={},Array.isArray(p.implementation)&&(r[l].implementation=p.implementation),Array.isArray(p.education)&&(r[l].education=p.education))}return r}function js(e){if(!Array.isArray(e)||!e.length)return!1;let t={},a=e.slice().sort((o,n)=>(o.sortOrder||0)-(n.sortOrder||0));for(let o of a){let n=String(o.key||"").trim();if(!n)continue;let i=Cu(o.value);i&&(t[n]=i)}if(!Object.keys(t).length)return!1;for(let o of Object.keys(Ze))delete Ze[o];return Object.assign(Ze,t),!0}var Us=new Set,Ti=null;function Hs(){for(let e of Us)try{e()}catch(t){console.warn("Assinante do cat\xE1logo de tasks falhou.",t)}}async function Au(){let e=ke.getCachedContent("task_screenshots"),t=js(e);t&&Hs();try{let a=await ke.fetchContentModule("task_screenshots");js(a)&&(t=!0,Hs())}catch(a){console.warn("Cat\xE1logo de tasks indispon\xEDvel; usando o embutido.",a)}return t}function io(e){return e&&Us.add(e),Ti||(Ti=Au()),Ti}function Ni(e,t,a,o=null){let n=e.currentSubStatus;if(!n)return null;let i=st[n],r=bt[e.currentLang]||bt.pt,s=c=>r[c]||bt.pt?.[c]||c,l='style="margin-bottom: 12px; padding-left: 30px;"',p="";if(e.activeFields.forEach(c=>{let m=s(c.toLowerCase()),u="N/A";if(c==="label_substatus")m=s("label_substatus"),u=i.name;else if(c==="TAGS_IMPLEMENTED"){m=s("tags_implemented");let h=[];t.getCheckedElements().forEach(S=>{let C=S.value,D=Ze[C],G=S.count||1,F=C==="ads_conversion_tracking"||C==="ads_enhanced_conversions";e.tagSupportUsed&&F&&!e.forcedScreenshots.has(C)?h.push(`${D.name} - ${s("ts_output_disclaimer")}`):h.push(G>1?`${D.name} (x${G})`:D.name)}),u=h.join(", ")||"N/A"}else if(c==="SCREENSHOTS_LIST"){m=s("screenshots_list");let h="",L=t.screenshotsElement;L&&Array.from(L.querySelectorAll('input[id^="name-"]')).forEach(C=>{let D=C.value,G=C.closest(".cw-screen-card");if(G){let F=G.querySelectorAll('input[id^="screen-"]'),R=!1,le="";F.forEach(te=>{let $=te.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||s("evidencia"),A=te.value.trim();A&&(le+=`<li>${$} - ${A}</li>`,R=!0)}),R&&(h+=`<div style="margin-bottom: 8px;"><b>${D}</b><ul ${l}>${le}</ul></div>`)}}),u=h||"N/A"}else if(c==="CASO_PORTUGAL")m=s("caso_portugal"),u=s("sim");else if(c==="CONSENTIU_GRAVACAO")m=s("consentiu_gravacao"),u=e.consent?s("sim"):s("nao");else{let h=`field-${c}`,L=e.formData[h],S=qs(i,c,e.currentLang),C=S?S+" ":"";if(L&&L.trim()!==""&&L.trim()!=="\u2022"){let D=L.trim();if(ao.includes(c)){let G=D.split(`
`).map(F=>F.trim()).filter(F=>F!==""&&F!=="\u2022").map(F=>F.startsWith("\u2022 ")?F.substring(2):F).map(F=>`<li>${F}</li>`).join("");u=G?`${C}<ul ${l}>${G}</ul>`:"N/A"}else wn.includes(c)?u=C+D.split(`
`).filter(G=>G.trim()!=="").map(G=>`<p style="margin: 0 0 8px 0;">${G}</p>`).join(""):u=C+D}else C&&(u=C.trim())}p+=`<b>${m}</b><br>${u}<br><br>`}),o){let c="";o.l1&&(c+=`<li>${s("ligacao_1")}: ${o.l1}</li>`),o.l2&&(c+=`<li>${s("ligacao_2")}: ${o.l2}</li>`),o.msg&&(c+=`<li>${s("mensagem_am")}: ${o.msg}</li>`),c&&(p+=`<b>${s("evidencias_contato")}</b><br><ul ${l}>${c}</ul><br>`)}if(i.customFooter&&(p+=`${i.customFooter}<br><br>`),a?.getOutput){let c=a.getOutput();c&&(p+=`${c}<br><br>`)}return p+=`<i>${s("nota_criada_rodape")}</i>`,p.replace(/(<br>\s*){3,}/g,"<br><br>").trim()}var Vs={pt:"Passe o mouse sobre um cen\xE1rio para visualizar o texto...",es:"Pasa el mouse sobre un escenario para ver el texto...",en:"Hover over a scenario to preview the text..."};function Li(){return Vs[ge()]||Vs.pt}function Ws(e){let t=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,a=document.createElement("div");a.className="cw-step-scenarios";let o=document.createElement("div");Object.assign(o.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let n=document.createElement("div");Object.assign(n.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"44px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"});let i=document.createElement("span");i.style.transition="opacity 0.05s ease, transform 0.05s ease",i.textContent=Li(),n.appendChild(i);let r=new Set,s=null,l=!0;return je(()=>{l&&(i.textContent=Li())}),a.render=(p,c)=>{r.clear();let m=eo(p,c);o.innerHTML="",m.forEach(([u,h])=>{let L=document.createElement("div");L.textContent=to(u,p),L.dataset.id=u,L.dataset.sound="hover",Object.assign(L.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"});let S=Za(h,Et(),u),C=S["field-REASON_COMMENTS"]||S["field-CONTEXTO_CALL"]||u;L.onmouseenter=()=>{s&&clearTimeout(s),r.has(u)||(L.style.background="#f1f3f4"),i.style.opacity="0",t||(i.style.transform="translateY(5px)"),s=setTimeout(()=>{l=!1,i.textContent=C.substring(0,120)+(C.length>120?"...":""),i.style.opacity="1",t||(i.style.transform="translateY(0)")},50)},L.onmouseleave=()=>{s&&clearTimeout(s),r.has(u)||(L.style.background="#ffffff"),s=setTimeout(()=>{r.size===0&&(i.style.opacity="0",setTimeout(()=>{l=!0,i.textContent=Li(),i.style.opacity="1"},50))},100)},L.onclick=()=>{w.playClick();let D=!r.has(u);D?(r.add(u),L.style.background="#e8f0fe",L.style.borderColor="#1a73e8",L.style.color="#1967d2"):(r.delete(u),L.style.background="#ffffff",L.style.borderColor="#dadce0",L.style.color="#3c4043"),e(u,D)},o.appendChild(L)}),m.length===0?a.style.display="none":a.style.display="block"},a.getSelectedIds=()=>[...r],a.appendChild(o),a.appendChild(n),a}function Eu(e){return e==="ads_conversion_tracking"||e==="ads_enhanced_conversions"}function Ii(e,t){return t.tagSupportUsed&&Eu(e)&&!t.forcedScreenshots.has(e)}var ze={bg:J.bgInput,white:J.surface,border:J.border,textMain:J.text,textSub:J.textSub,blue:J.blue,blueLight:J.primaryBg,brands:{ads:{id:"ads",label:"Google Ads",color:J.blue,bg:J.primaryBg,icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:J.yellow,bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:J.primary,bg:J.primaryBg,icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:J.green,bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},$a={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Cn(e,t,a){let o={};a&&a.subscribe(()=>{$(),A()});function n(y){let z=y.toLowerCase();return z.includes("ads")||z.includes("conversion")||z.includes("remarketing")?ze.brands.ads:z.includes("ga4")||z.includes("analytics")?ze.brands.ga4:z.includes("gtm")||z.includes("tag manager")||z.includes("container")?ze.brands.gtm:z.includes("merchant")||z.includes("shopping")||z.includes("feed")?ze.brands.gmc:ze.brands.default}let i=[],r={};function s(){i=Object.entries(Ze).filter(([y,z])=>z.popular),r={},Object.entries(Ze).forEach(([y,z])=>{if(z.popular)return;let U=n(z.name);r[U.label]||(r[U.label]={brand:U,tasks:[]}),r[U.label].tasks.push({key:y,...z})})}s();let l="cw-zen-tasks";if(!document.getElementById(l)){let y=document.createElement("style");y.id=l,y.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column;
                font-family: ${ze.font}; background: ${ze.bg}; position: relative; overflow: visible;
                border-radius: 12px; border: 1px solid ${ze.border};
            }
            
            /* SCROLL AREA */
            .cw-zen-content { padding-bottom: 20px; }

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${ze.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${ze.white}; 
                border: 1.5px solid #f1f3f4;
                border-radius: 20px;
                padding: 16px;
                cursor: pointer; 
                position: relative; 
                height: 90px;
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                transition: all 0.4s var(--cw-ease-decelerate);
                box-shadow: 0 2px 6px rgba(0,0,0,0.02);
                overflow: hidden;
            }
            
            /* Corre\xE7\xE3o do Grid \xCDmpar */
            .cw-hero-card:last-child:nth-child(odd) { grid-column: span 2; }

            /* Intera\xE7\xE3o */
            .cw-hero-card:hover { border-color: var(--hero-color); box-shadow: 0 8px 20px rgba(0,0,0,0.06); transform: translateY(-3px); }
            .cw-hero-card:active { transform: scale(0.96) translateY(0); }
            .cw-hero-card:focus-visible { outline: 2px solid var(--hero-color); outline-offset: 2px; }

            /* HERO ACTIVE STATE (Borda Colorida Apenas) */
            .cw-hero-card.active {
                background: #FFFFFF;
                border-color: var(--hero-color);
                box-shadow: 0 0 0 1px var(--hero-color), 0 10px 20px rgba(0,0,0,0.04);
            }

            .cw-hero-card.ts-success {
                background: #F0FDF4 !important;
                border-color: #22C55E !important;
                box-shadow: 0 0 0 1px #22C55E, 0 4px 12px rgba(34, 197, 94, 0.1) !important;
            }
            .cw-hero-card.ts-success .cw-hero-label { color: #166534 !important; }

            /* CONTAINER DE CONTE\xDADO (Para anima\xE7\xE3o de deslize) */
            .cw-hero-main {
                display: flex; align-items: center; gap: 10px;
                transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                width: 100%; justify-content: center;
            }
            /* Quando ativo, sobe um pouquinho para caber o stepper */
            .cw-hero-card.active .cw-hero-main { transform: translateY(-12px); }

            /* \xCDCONE (Sempre Neutro) */
            .cw-hero-icon { 
                width: 32px; height: 32px; border-radius: 8px; 
                background: #F3F4F6; /* Cinza Apple Neutro */
                display: flex; align-items: center; justify-content: center; flex-shrink: 0;
                transition: background 0.2s;
            }
            /* \xCDcone SVG sempre vis\xEDvel */
            .cw-hero-icon svg { width: 20px; height: 20px; }
            
            /* No active, o \xEDcone pode ficar branco puro para destacar o logo */
            .cw-hero-card.active .cw-hero-icon { background: #FFFFFF; border: 1px solid #F3F4F6; }

            /* TEXTO */
            .cw-hero-label { 
                font-size: 12px; font-weight: 500; color: ${ze.textMain}; line-height: 1.2; 
                text-align: left;
            }
            .cw-hero-card.active .cw-hero-label { font-weight: 600; color: var(--hero-color); }

            /* STEPPER (Surge de baixo) */
            .cw-hero-stepper {
                position: absolute; bottom: 8px; left: 0; right: 0;
                display: flex; align-items: center; justify-content: center; gap: 12px;
                opacity: 0; transform: translateY(10px);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                pointer-events: none;
            }
            .cw-hero-card.active .cw-hero-stepper { opacity: 1; transform: translateY(0); pointer-events: auto; }
            
            /* Bot\xF5es do Stepper (Hero: circular) */
            .cw-step-btn-hero {
                width: 24px; height: 24px; border-radius: 50%; background: #F3F4F6;
                color: ${ze.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn-hero:hover { background: #E5E7EB; color: var(--hero-color); }            /* Some SR (Screen Reader) s\xF3 - o placeholder do campo de busca j\xE1
               \xE9 a dica visual; isso d\xE1 o mesmo texto pra quem usa leitor de
               tela, sem duplicar nada na tela pra quem enxerga. */
            .cw-sr-only {
                position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
                overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
            }

            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${ze.border}; border-radius: 10px; background: ${ze.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${ze.blue}; box-shadow: 0 0 0 3px ${ze.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${ze.border}; border-radius: 10px; background: ${ze.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${ze.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${ze.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${ze.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${ze.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item:focus-visible, .cw-acc-header:focus-visible { outline: 2px solid ${ze.blue}; outline-offset: -2px; }
            .cw-task-item.selected { background: ${ze.blueLight}; }
            .cw-task-item.ts-success { background: #F0FDF4 !important; border-left: 4px solid #22C55E; }
            .cw-task-item.ts-success .cw-task-label { color: #166534 !important; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${ze.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${ze.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS (Lista: quadrado) */
            .cw-step-btn-list {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${ze.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn-list:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${ze.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: sticky; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${ze.border};
                border-bottom-left-radius: 11px;
                border-bottom-right-radius: 11px;
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                visibility: hidden;
                box-shadow: ${ze.shadowFloat}; z-index: 10;
                margin-top: auto;
            }
            /* .cw-zen-container usa overflow:visible (pros cards do hero n\xE3o
               cortarem sombra/hover), ent\xE3o sem visibility a barra "escondida"
               via transform continua sendo pintada logo abaixo do card,
               encostando/sobrepondo o que vem depois no layout. */
            .cw-status-bar.visible { transform: translateY(0); visibility: visible; }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${ze.textMain}; }
            
            .cw-footer-icons { display: flex; flex-direction: row-reverse; padding-left: 8px; }
            .cw-mini-icon-status {
                width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;
                color: white; display: flex; align-items: center; justify-content: center;
                box-shadow: 0 1px 2px rgba(0,0,0,0.15); position: relative; margin-left: -8px;
            }
            .cw-mini-icon-status svg { width: 12px; height: 12px; fill: currentColor; }

            @keyframes cwSlideDown { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }

/* --- SCREENSHOTS: FINE & ELEGANT (Step 3) --- */
            
            .cw-screens-container {
                display: flex; flex-direction: column; gap: 12px;
                padding: 4px 4px 40px 4px; /* Respiro para n\xE3o cortar sombras */
            }

            /* CART\xC3O (Base F\xEDsica) */
            .cw-screen-card {
                background: #FFFFFF;
                border-radius: 24px;
                border: 1.5px solid #f1f3f4;
                border-left: 8px solid var(--brand-color);
                
                padding: 24px;
                position: relative;
                transition: all 0.4s var(--cw-ease-decelerate);
                box-shadow: 0 4px 12px rgba(0,0,0,0.03);
                margin-bottom: 16px;
            }

            .cw-screen-card:hover {
                box-shadow: 0 12px 30px rgba(0,0,0,0.06);
                border-color: #e5e7eb;
            }

            .cw-screen-card.ts-success {
                background: #F0FDF4;
                border-color: #BBF7D0;
                border-left-color: #22C55E;
            }

            .cw-ts-disclaimer-box {
                padding: 12px;
                background: #DCFCE7;
                border-radius: 8px;
                font-size: 12px;
                color: #166534;
                margin-top: 8px;
                line-height: 1.4;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .cw-btn-ts-force {
                align-self: flex-start;
                padding: 4px 10px;
                background: #fff;
                border: 1px solid #22C55E;
                color: #166534;
                border-radius: 6px;
                cursor: pointer;
                font-size: 11px;
                font-weight: 600;
            }
            .cw-btn-ts-force:hover { background: #f0fdf4; }

            /* Intera\xE7\xE3o de Foco no Cart\xE3o */
            .cw-screen-card:focus-within {
                border-color: #E5E7EB; 
                border-left-width: 6px; /* A faixa engorda levemente */
                background: #FFFFFF;
                /* Sombra difusa estilo Apple ao focar */
                box-shadow: 0 4px 12px rgba(0,0,0,0.05); 
                transform: translateX(2px); /* Micro-movimento lateral */
            }

            /* HEADER DO CART\xC3O */
            .cw-card-header {
                display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
                /* Sem borda inferior para visual mais limpo/moderno */
            }
            
            /* \xCDCONE (Puro, sem fundo) */
            .cw-card-icon {
                width: 24px; height: 24px; flex-shrink: 0;
                display: flex; align-items: center; justify-content: center;
            }
            .cw-card-icon svg { width: 100%; height: 100%; }

            /* T\xCDTULO EDIT\xC1VEL */
            .cw-card-title-input {
                font-family: ${ze.font}; font-size: 15px; font-weight: 600; color: ${ze.textMain};
                border: 1px solid transparent; 
                border-radius: 6px;
                background: transparent; 
                width: 100%; outline: none;
                padding: 4px 8px; margin-left: -8px; /* Alinhamento \xF3ptico */
                transition: all 0.2s ease;
                cursor: text;
            }

            /* Hover no header revela que \xE9 edit\xE1vel */
            .cw-card-header:hover .cw-card-title-input {
                background: #F1F3F4;
                border-color: transparent;
            }
            
            /* Foco no t\xEDtulo: Azul Google Padr\xE3o para indicar edi\xE7\xE3o de texto */
            .cw-card-title-input:focus {
                background: #FFFFFF;
                border-color: ${ze.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${ze.textSub}; opacity: 0; 
                transform: translateX(-10px); transition: all 0.2s ease;
                pointer-events: none; white-space: nowrap;
            }
            .cw-card-header:hover .cw-edit-hint { opacity: 1; transform: translateX(0); }

            /* INFO BANNER (Win Criteria) */
            .cw-info-banner {
                margin: 0 4px 16px 4px;
                padding: 10px 14px;
                background: #F8F9FA;
                border: 1px dashed #DADCE0;
                border-radius: 8px;
                font-size: 11px; color: ${ze.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${ze.brands.ads.color}; text-decoration: none; font-weight: 600; }
            .cw-info-link:hover { text-decoration: underline; }

            /* FOOTER ICONS (Limpo & Original) */
            .cw-mini-icon-screenshot {
                width: 26px; height: 26px; border-radius: 50%;
                background: #FFFFFF; border: 1px solid #E0E0E0;
                display: flex; align-items: center; justify-content: center;
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                margin-left: -8px; position: relative; z-index: 1;
            }
            .cw-mini-icon-screenshot svg { width: 14px; height: 14px; }

            /* INPUTS (Campos de Link) */
            .cw-input-group { margin-bottom: 16px; position: relative; }
            .cw-input-group:last-child { margin-bottom: 0; }

            .cw-input-label {
                display: block; font-size: 11px; font-weight: 700; color: ${ze.textSub};
                margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.8px;
            }

            .cw-input-field {
                width: 100%; box-sizing: border-box;
                padding: 12px 14px;
                border-radius: 12px;
                border: 1.5px solid #f1f3f4;
                background: #f8f9fa;
                font-size: 14px; color: #374151;
                transition: all 0.25s var(--cw-ease-decelerate); outline: none;
            }

            /* Foco no Input: Usa a cor da marca */
            .cw-input-field:focus {
                background: #FFFFFF;
                border-color: var(--brand-color); /* Din\xE2mico! */
                box-shadow: 0 0 0 2px var(--brand-bg); /* Anel de foco din\xE2mico */
            }
            
            /* Sucesso (Dopamina) */
            .cw-input-field.filled {
                background-color: #F0FDF4;
                border-color: #DCFCE7;
                color: #166534;
                padding-right: 36px;
            }

            /* Check Icon Animado */
            .cw-input-check {
                position: absolute; right: 10px; bottom: 10px;
                color: #16A34A; width: 16px; height: 16px;
                opacity: 0; transform: scale(0.5);
                transition: all 0.3s var(--cw-ease-spring);
                pointer-events: none;
            }
            .cw-input-field.filled + .cw-input-check { opacity: 1; transform: scale(1); }

            /* Esta \xE9 a etapa mais repetida do app inteiro (escolher a task do
               caso) e n\xE3o tinha nenhuma prote\xE7\xE3o de reduced-motion, apesar
               dos hero cards, do accordion e do "check verde" animarem
               transform em praticamente toda intera\xE7\xE3o. */
            @media (prefers-reduced-motion: reduce) {
                .cw-hero-card, .cw-hero-card:hover, .cw-hero-main, .cw-hero-stepper,
                .cw-task-item, .cw-acc-icon, .cw-status-bar, .cw-input-check {
                    transition: opacity 0.15s ease !important;
                    transform: none !important;
                }
                .cw-acc-group.open .cw-acc-body { animation: none !important; }
            }
        `,document.head.appendChild(y)}let p=document.createElement("div");p.className="cw-zen-container";let c=document.createElement("div");Object.assign(c.style,{display:"none"});let m=document.createElement("div");m.className="cw-screens-container",c.appendChild(m),p.innerHTML=`
        <div class="cw-zen-content">
            <div class="cw-hero-section">
                <div class="cw-section-subtitle js-hero-title" style="font-size:11px; font-weight:700; color:#6B7280; text-transform:uppercase; letter-spacing:0.8px;">${t("acesso_rapido")}</div>
                <div class="cw-hero-grid"></div>
                <div class="cw-helper-text js-hero-help">${t("atalhos_ajuda")}</div>
            </div>

            <div class="cw-list-section">
                <div class="cw-search-wrapper">
                    <label class="cw-sr-only" for="cw-task-search-input">${t("buscar_catalogo")}</label>
                    <input id="cw-task-search-input" class="cw-search-input" placeholder="${t("buscar_catalogo")}">
                </div>
                <div class="cw-acc-container"></div>
                <div class="cw-results-container" style="display:none"></div>
            </div>
        </div>

        <div class="cw-status-bar">
            <div class="cw-status-text"></div>
            <div class="cw-footer-icons"></div>
        </div>
    `;let u=p.querySelector(".cw-hero-grid"),h=p.querySelector(".cw-acc-container"),L=p.querySelector(".cw-results-container"),S=p.querySelector(".cw-search-input");un(p,".cw-acc-header, .cw-task-item");let C=p.querySelector(".cw-status-bar"),D=p.querySelector(".cw-status-text"),G=p.querySelector(".cw-footer-icons");function F(y,z){return U=>{if(U.target.closest(".cw-step-btn-hero, .cw-step-btn-list"))return;let M=o[y]?o[y].count:0;ee(y,M>0?-M:1,z)}}function R(){u.innerHTML="",i.forEach(([y,z])=>{let U=n(z.name),M=document.createElement("div");M.className="cw-hero-card",M.id=`hero-${y}`,M.style.setProperty("--hero-color",U.color),M.innerHTML=`
              <div class="cw-hero-main">
                  <div class="cw-hero-icon">${$a[U.icon]}</div>
                  <div class="cw-hero-label">${z.name}</div>
              </div>
            
              <div class="cw-hero-stepper">
                  <div class="cw-step-btn-hero minus">\u2212</div>
                  <div class="cw-step-val">1</div>
                  <div class="cw-step-btn-hero plus">+</div>
              </div>
          `,M.onclick=F(y,z),M.querySelector(".minus").onclick=()=>ee(y,-1,z),M.querySelector(".plus").onclick=()=>ee(y,1,z),M.tabIndex=0,M.setAttribute("role","button"),M.setAttribute("aria-pressed","false"),M.addEventListener("keydown",Z=>{(Z.key==="Enter"||Z.key===" ")&&(Z.preventDefault(),M.click())}),M.dataset.color=U.color,u.appendChild(M)})}R();function le(y,z){let U=n(z.name),M=document.createElement("div");return M.className="cw-task-item",M.dataset.id=y,M.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${U.bg}; color:${U.color}">
                    ${$a[U.icon]||$a.default}
                </div>
                <div class="cw-task-label">${z.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn-list minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn-list plus">+</div>
            </div>
        `,M.onclick=F(y,z),M.querySelector(".minus").onclick=()=>ee(y,-1,z),M.querySelector(".plus").onclick=()=>ee(y,1,z),M.tabIndex=0,M.setAttribute("role","button"),M.setAttribute("aria-pressed","false"),M.setAttribute("aria-label",z.name),M.addEventListener("keydown",Z=>{(Z.key==="Enter"||Z.key===" ")&&(Z.preventDefault(),M.click())}),M}function te(){h.innerHTML="",Object.entries(r).forEach(([y,z])=>{let U=document.createElement("div");U.className="cw-acc-group";let M=document.createElement("div");M.className="cw-acc-header",M.innerHTML=`
              <div class="cw-acc-title">
                  <div class="cw-acc-dot" style="background:${z.brand.color}"></div>
                  ${y}
              </div>
              <div class="cw-acc-icon">\u25BC</div>
          `,M.tabIndex=0,M.setAttribute("role","button"),M.setAttribute("aria-expanded","false"),M.onclick=()=>{h.querySelectorAll(".cw-acc-group.open").forEach(ve=>{ve!==U&&(ve.classList.remove("open"),ve.querySelector(".cw-acc-header")?.setAttribute("aria-expanded","false"))});let de=U.classList.toggle("open");M.setAttribute("aria-expanded",String(de))},M.addEventListener("keydown",de=>{(de.key==="Enter"||de.key===" ")&&(de.preventDefault(),M.click())});let Z=document.createElement("div");Z.className="cw-acc-body",z.tasks.forEach(de=>{let ve=le(de.key,de);Z.appendChild(ve)}),U.appendChild(M),U.appendChild(Z),h.appendChild(U)})}te();function ee(y,z,U){o[y]||(o[y]={count:0,data:U,brand:n(U.name)}),o[y].count+=z,o[y].count<=0&&delete o[y],$(),A(),e&&e()}function $(){i.forEach(([Z])=>{let de=u.querySelector(`#hero-${Z}`);if(!de)return;let ve=o[Z];ve?(de.classList.add("active"),de.setAttribute("aria-pressed","true"),de.querySelector(".cw-step-val").textContent=ve.count,de.querySelector(".cw-step-val").style.color=de.dataset.color,de.classList.toggle("ts-success",Ii(Z,a))):(de.classList.remove("active"),de.setAttribute("aria-pressed","false"),de.classList.remove("ts-success"))}),p.querySelectorAll(".cw-task-item").forEach(Z=>{let de=Z.dataset.id,ve=o[de];ve?(Z.classList.add("selected"),Z.setAttribute("aria-pressed","true"),Z.querySelector(".cw-step-val").textContent=ve.count,Z.classList.toggle("ts-success",Ii(de,a))):(Z.classList.remove("selected"),Z.setAttribute("aria-pressed","false"),Z.classList.remove("ts-success"))});let z=Object.keys(o),U=0,M=[];if(z.forEach(Z=>{let de=o[Z];U+=de.count;for(let ve=0;ve<de.count;ve++)M.length<6&&M.push(de.brand)}),U>0){C.classList.add("visible");let Z=U>1?t("acoes_plural"):t("acao_singular"),de=U>1?t("definidas_plural"):t("definida_singular");D.textContent=`${U} ${Z} ${de}`,G.innerHTML="",M.forEach(ve=>{let re=document.createElement("div");re.className="cw-mini-icon-status",re.innerHTML=$a[ve.icon]||$a.default;let be=re.querySelector("svg");be&&(be.style.width="14px",be.style.height="14px"),G.appendChild(re)})}else C.classList.remove("visible"),D.textContent="",G.innerHTML=""}S.addEventListener("input",y=>{let z=y.target.value.toLowerCase();if(z.length>0){h.style.display="none",L.style.display="block",L.innerHTML="";let U=!1;Object.entries(Ze).forEach(([M,Z])=>{if(Z.name.toLowerCase().includes(z)){U=!0;let de=le(M,Z);o[M]&&(de.classList.add("selected"),de.setAttribute("aria-pressed","true"),de.querySelector(".cw-step-val").textContent=o[M].count),L.appendChild(de)}}),U||(L.innerHTML=`<div style="padding:20px; text-align:center; font-size:13px; color:#999">${t("nenhum_resultado")}</div>`)}else h.style.display="block",L.style.display="none"});function A(){let y={};m.querySelectorAll(".cw-input-field").forEach(Z=>{y[Z.id]=Z.value}),m.innerHTML="";let z=Object.keys(o),U=!1;if(z.length===0){m.appendChild(To({icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg>',title:t("selecione_tarefas")})),c.style.display="none";return}let M=document.createElement("div");M.className="cw-info-banner",M.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>${t("screenshots_aviso")}</span>
        `,m.appendChild(M),z.forEach(Z=>{let de=o[Z].data,ve=o[Z].count,re=o[Z].brand,be=Ii(Z,a),pe=a.screenshotMode||"implementation",he=Os(de,pe,a.currentLang);if(he.length>0||be){U=!0;for(let T=1;T<=ve;T++){let Y=document.createElement("div");Y.className="cw-screen-card",be&&Y.classList.add("ts-success"),Y.style.setProperty("--brand-color",re.color),Y.style.setProperty("--brand-bg",re.bg),Y.style.setProperty("--brand-shadow",re.color+"40");let se=document.createElement("div");se.className="cw-card-header";let V=document.createElement("div");V.className="cw-card-icon",V.innerHTML=$a[re.icon]||$a.default;let O=document.createElement("div");O.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let k=document.createElement("input");k.className="cw-card-title-input",k.id=`name-${Z}-${T}`,k.value=`${de.name}${ve>1?" #"+T:""}`,k.title=t("renomear_tooltip");let j=document.createElement("span");if(j.className="cw-edit-hint",j.innerHTML=t("renomear_hint"),O.appendChild(k),O.appendChild(j),se.appendChild(V),se.appendChild(O),Y.appendChild(se),be){let ie=document.createElement("div");ie.className="cw-ts-disclaimer-box",ie.innerHTML=`
                <span>${t("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${t("incluir_mesmo_assim")}</button>
            `,ie.querySelector("button").onclick=()=>{a.toggleForcedScreenshot(Z,!0)},Y.appendChild(ie)}else he.forEach((ie,P)=>{let X=document.createElement("div");X.className="cw-input-group";let ce=document.createElement("label");ce.className="cw-input-label",ce.textContent=ie;let v=document.createElement("input");v.className="cw-input-field",v.id=`screen-${Z}-${T}-${P}`,v.placeholder=t("cole_link_placeholder"),v.setAttribute("autocomplete","off"),y[v.id]&&(v.value=y[v.id],v.value.trim().length>5&&v.classList.add("filled")),v.addEventListener("input",()=>{v.value.trim().length>5?v.classList.add("filled"):v.classList.remove("filled")});let b=document.createElement("div");b.className="cw-input-check",b.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',X.appendChild(ce),X.appendChild(v),X.appendChild(b),Y.appendChild(X)});m.appendChild(Y)}}}),c.style.display=U?"block":"none"}return{selectionElement:p,screenshotsElement:c,updateSubStatus:()=>A(),getCheckedElements:()=>Object.keys(o).map(y=>({value:y,count:o[y].count})),setTaskCount:(y,z)=>{o[y]&&delete o[y],z>0&&Ze[y]&&ee(y,z,Ze[y])},toggleTask:(y,z=!0)=>{let U=o[y];z&&!U?ee(y,1,Ze[y]):!z&&U&&ee(y,-U.count,Ze[y])},setLanguage:y=>{t=y;let z=p.querySelector(".js-hero-title");z&&(z.textContent=t("acesso_rapido"));let U=p.querySelector(".js-hero-help");U&&(U.innerHTML=t("atalhos_ajuda"));let M=p.querySelector(".cw-search-input");M&&(M.placeholder=t("buscar_catalogo"));let Z=p.querySelector('label[for="cw-task-search-input"]');Z&&(Z.textContent=t("buscar_catalogo")),A(),$()},refreshCatalog:()=>{s(),Object.keys(o).forEach(y=>{let z=Ze[y];z&&(o[y].data=z,o[y].brand=n(z.name))}),R(),te(),$(),A()},reset:()=>{for(let y in o)delete o[y];S.value="",h.style.display="block",L.style.display="none",$(),A()}}}var ku={marginTop:"24px",marginBottom:"16px",padding:"20px",background:"#fff9e6",borderRadius:"20px",border:"1.5px solid #fbbc0540",display:"none",boxShadow:"0 4px 12px rgba(251, 188, 5, 0.05)"},Tu={fontSize:"12px",color:"#b06000",marginTop:"8px",lineHeight:"1.4"},Nu={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #dadce0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",background:"#fff"},Lu={display:"flex",gap:"20px",marginBottom:"12px"};function Ys(e){let t=document.createElement("div");t.id="tag-support-container",Object.assign(t.style,ku);let a=document.createElement("label");a.className="js-ts-main-label",a.textContent=e("utilizou_tag_support"),Object.assign(a.style,yi,{marginTop:"0"});let o=document.createElement("div");Object.assign(o.style,Lu);let n=document.createElement("input");n.type="radio",n.name="ts_usage_mod",n.value="Sim",Object.assign(n.style,Ci);let i=document.createElement("label");i.className="js-ts-sim-label",i.textContent=e("sim");let r=document.createElement("div");Object.assign(r.style,{display:"flex",alignItems:"center"}),r.appendChild(n),r.appendChild(i);let s=document.createElement("input");s.type="radio",s.name="ts_usage_mod",s.value="N\xE3o",s.checked=!0,Object.assign(s.style,Ci);let l=document.createElement("label");l.className="js-ts-nao-label",l.textContent=e("nao");let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center"}),p.appendChild(s),p.appendChild(l),o.appendChild(r),o.appendChild(p);let c=document.createElement("div");c.style.display="block";let m=document.createElement("label");m.className="js-ts-reason-label",m.textContent=e("motivo_ts"),Object.assign(m.style,yi,{fontSize:"12px"});let u=document.createElement("input");u.type="text",Object.assign(u.style,Nu);let h=document.createElement("div");h.className="js-ts-warning",h.innerHTML=`\u26A0\uFE0F <strong>${e("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" rel="noopener noreferrer" style="color:#e37400; text-decoration:underline;">${e("link_aqui")}</a>`,Object.assign(h.style,Tu),c.appendChild(m),c.appendChild(u),c.appendChild(h),t.appendChild(a),t.appendChild(o),t.appendChild(c),n.onchange=()=>{w.playClick(),c.style.display="none",ue.setTagSupportUsed(!0)},s.onchange=()=>{w.playClick(),c.style.display="block",ue.setTagSupportUsed(!1)};function L(G,F){if(t.style.display="none",!G||!F||F.length===0)return;F.some(le=>le==="ads_conversion_tracking"||le==="ads_enhanced_conversions")?t.style.display="block":(D(),ue.setTagSupportUsed(!1))}function S(){if(t.style.display==="none")return"";let G=`<br><b>${e("tag_support_output_label")}</b> ${n.checked?`\u2705 ${e("sim")}`:`\u274C ${e("nao")}`}`;return s.checked&&u.value.trim()!==""&&(G+=`<br><b>${e("motivo_output_label")}</b> ${u.value}`),G+="<br>",G}function C(G){e=G,a.textContent=e("utilizou_tag_support"),m.textContent=e("motivo_ts"),i.textContent=e("sim"),l.textContent=e("nao"),h.innerHTML=`\u26A0\uFE0F <strong>${e("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" rel="noopener noreferrer" style="color:#b06000; text-decoration:underline;">${e("link_aqui")}</a>`}function D(){t.style.display="none",s.checked=!0,n.checked=!1,c.style.display="block",u.value=""}return{element:t,updateVisibility:L,getOutput:S,setLanguage:C,reset:D}}var Iu="cw_notes_parking_lot",_u="cw_notes_emergency_save";function _i({storageKey:e,emergencyKey:t,maxDrafts:a=5}){let o={getAll:()=>{try{return JSON.parse(localStorage.getItem(e)||"[]")}catch{return[]}},save:n=>{let i=o.getAll(),r={id:Date.now().toString(),timestamp:new Date().toISOString(),...n};return i.unshift(r),i.length>a&&i.pop(),localStorage.setItem(e,JSON.stringify(i)),r},delete:n=>{let i=o.getAll();return i=i.filter(r=>r.id!==n),localStorage.setItem(e,JSON.stringify(i)),i},getCount:()=>o.getAll().length,saveEmergency:n=>{let i={timestamp:Date.now(),data:n};localStorage.setItem(t,JSON.stringify(i))},getEmergency:()=>{try{let n=localStorage.getItem(t);if(!n)return null;let i=JSON.parse(n);return Date.now()-i.timestamp>432e5?(localStorage.removeItem(t),null):!i.data||!i.data.subStatus?null:i.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(t)}};return o}var Bt=_i({storageKey:Iu,emergencyKey:_u});var Xs="cw_case_streak_v1",Du=[5,10,15,20,25,30,40,50];function Ks(){let e=new Date;return`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`}function Di(){try{let e=JSON.parse(localStorage.getItem(Xs)||"{}");return e.date===Ks()&&e.count||0}catch{return 0}}function Js(){let e=Di()+1;try{localStorage.setItem(Xs,JSON.stringify({date:Ks(),count:e}))}catch{}return{count:e,isMilestone:Du.includes(e)}}var Zs="cw_user_prefs_v1",qi="cw_user_prefs_pending_v1",Mi=!1,Po=null;function ro(){try{let e=localStorage.getItem(Zs),t=e?JSON.parse(e):null;return t&&typeof t=="object"?t:{}}catch{return{}}}function Qs(e){try{localStorage.setItem(Zs,JSON.stringify(e))}catch(t){console.warn("N\xE3o consegui gravar as prefer\xEAncias localmente:",t)}}function Oi(e){try{e?localStorage.setItem(qi,"1"):localStorage.removeItem(qi)}catch{}}function Mu(){try{return localStorage.getItem(qi)==="1"}catch{return!1}}var Ye={get(e,t=null){let a=ro();return e in a?a[e]:t},async set(e,t){let a=ro();a[e]=t,Qs(a);let o=it();if(!o)return Oi(!0),{saved:!0,synced:!1};Mi=!0;let n=!1;try{n=await ke.saveUserPrefs(a,o)}catch(i){console.warn("Falha ao salvar prefer\xEAncias na nuvem:",i)}finally{Oi(!n),setTimeout(()=>{Mi=!1},2e3)}return{saved:!0,synced:n}},sync(){return Po||(it()?(Po=(async()=>{let e=it();try{if(Mu()){let a=ro(),o=await ke.saveUserPrefs(a,e);return Oi(!o),a}let t=await ke.getUserPrefs(e);if(t&&typeof t=="object"&&!Mi){let a=ro();JSON.stringify(t)!==JSON.stringify(a)&&Qs(t)}}catch(t){console.warn("Prefer\xEAncias indispon\xEDveis; seguindo com o cache local.",t)}finally{Po=null}return ro()})(),Po):Promise.resolve(ro()))}};var tl="pillLayout",so=["notes","precall","bauform","email","script","links","library","timezone","configs","broadcast","notetable"],pa=7,Ou={pinned:["notes","precall","bauform","email","script","links","broadcast"],drawer:["library","timezone","configs","notetable"]},Bo=e=>({pt:e,es:e,en:e}),qu={notes:Bo("Case Notes"),precall:Bo("Pre-call Checklist"),bauform:Bo("BAU Form"),email:Bo("Email Assistant"),script:Bo("Call Script"),links:{pt:"Central de Links",es:"Central de Enlaces",en:"Links Central"},library:{pt:"Minha Biblioteca",es:"Mi Biblioteca",en:"My Library"},timezone:{pt:"Fusos Hor\xE1rios",es:"Husos Horarios",en:"Time Zones"},configs:{pt:"Configura\xE7\xF5es",es:"Configuraci\xF3n",en:"Settings"},broadcast:{pt:"Avisos",es:"Avisos",en:"Broadcast"},notetable:{pt:"Nota em tabela",es:"Nota en tabla",en:"Table note"}};function jo(e,t=ge()){let a=qu[e];return a?a[t]||a.pt:e}function Fu(e){let t=e&&Array.isArray(e.pinned)&&Array.isArray(e.drawer)?e:Ou,a=new Set(so),o=new Set,n=l=>{let p=[];for(let c of l)a.has(c)&&!o.has(c)&&(o.add(c),p.push(c));return p},i=n(t.pinned),r=n(t.drawer);i.length>pa&&(r=[...i.slice(pa),...r],i=i.slice(0,pa));let s=so.filter(l=>!o.has(l));return{pinned:i,drawer:[...r,...s]}}function Ru(e,t,a,o){if(!so.includes(t))return{ok:!1,reason:"unknown"};if(a!=="pinned"&&a!=="drawer")return{ok:!1,reason:"unknown"};let n=e.pinned.filter(l=>l!==t),i=e.drawer.filter(l=>l!==t),r=a==="pinned"?n:i;if(a==="pinned"&&n.length>=pa)return{ok:!1,reason:"full"};let s=Math.max(0,Math.min(Number.isFinite(o)?o:r.length,r.length));return r.splice(s,0,t),{ok:!0,layout:{pinned:n,drawer:i}}}var Fi=new Set,An=null;function Go(){return Fu(Ye.get(tl,null))}function al(){let e=Go(),t=JSON.stringify(e);t!==An&&(An=t,Fi.forEach(a=>{try{a(e)}catch(o){console.warn("pill-layout: ouvinte falhou:",o)}}))}function el(e){let t=Ye.set(tl,e).then(a=>({synced:a.synced}));return al(),{ok:!0,saved:t}}var sa={get:Go,isFull(){return Go().pinned.length>=pa},move(e,t,a){let o=Ru(Go(),e,t,a);return o.ok?el(o.layout):o},reset(){return el(null)},onChange(e){return An===null&&(An=JSON.stringify(Go())),Fi.add(e),()=>Fi.delete(e)},refresh:al};var ol={pt:{more:"Mais m\xF3dulos",milestoneToast:e=>`\u{1F525} ${e} casos hoje!`,quickSearch:"Busca r\xE1pida: Ctrl/Cmd+K",casesToday:"Casos conclu\xEDdos hoje",drag:"Arrastar",cancel:"Cancelar",cancelledToast:"Cancelado!",devEnvTitle:(e,t)=>`Ambiente de desenvolvimento \u2014 implanta\xE7\xE3o \u2026${e} (${t})`},es:{more:"M\xE1s m\xF3dulos",milestoneToast:e=>`\u{1F525} \xA1${e} casos hoy!`,quickSearch:"B\xFAsqueda r\xE1pida: Ctrl/Cmd+K",casesToday:"Casos completados hoy",drag:"Arrastrar",cancel:"Cancelar",cancelledToast:"\xA1Cancelado!",devEnvTitle:(e,t)=>`Entorno de desarrollo \u2014 implementaci\xF3n \u2026${e} (${t})`},en:{more:"More modules",milestoneToast:e=>`\u{1F525} ${e} cases today!`,quickSearch:"Quick search: Ctrl/Cmd+K",casesToday:"Cases completed today",drag:"Drag",cancel:"Cancel",cancelledToast:"Cancelled!",devEnvTitle:(e,t)=>`Development environment \u2014 deployment \u2026${e} (${t})`}};function qt(e){let t=ge();return ol[t]?.[e]??ol.pt[e]}var He={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",yellow:"#FDD663",pink:"#F48FB1",gray:"#9AA0A6"},Ri=50,zi=null,lo={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',precall:'<svg viewBox="0 0 24 24"><path d="M22 7h-9v2h9V7zm0 8h-9v2h9v-2zM5.54 11L2 7.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L5.54 11zm0 8L2 15.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L5.54 19z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg class="cw-logo-base" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',mainSpark:'<svg class="cw-logo-spark" viewBox="0 0 24 24"><defs><linearGradient id="cw-spark-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4285F4"/><stop offset="33%" stop-color="#EA4335"/><stop offset="66%" stop-color="#FBBC05"/><stop offset="100%" stop-color="#34A853"/></linearGradient></defs><path fill="url(#cw-spark-grad)" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',configs:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',notetable:'<svg viewBox="0 0 24 24"><path d="M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9z"/></svg>',bauform:'<svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>',apps:'<svg viewBox="0 0 24 24"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/></svg>'};function nl(e){return lo[e]||""}function En(e){let t=document.getElementById("cw-btn-notes");if(!t)return;let a=t.querySelector(".cw-dot-dirty");e?a||(a=document.createElement("div"),a.className="cw-dot-dirty",t.appendChild(a)):a&&a.remove()}function il(){let e=document.getElementById("cw-streak-badge"),t=document.getElementById("cw-streak-count");if(!e||!t)return;let a=Di();t.textContent=a,e.classList.toggle("visible",a>0);let o=document.querySelector(".cw-pill");o&&(o.classList.toggle("has-streak",a>0),o.classList.toggle("streak-tier-2",a>=5&&a<15),o.classList.toggle("streak-tier-3",a>=15&&a<30),o.classList.toggle("streak-tier-4",a>=30))}function kn(){let{count:e,isMilestone:t}=Js();if(il(),t){let a=document.querySelector(".cw-pill");w.playSuccess(),a&&Es(a),ne(qt("milestoneToast")(e))}}function rl(e,t){let a="cw-command-center-style";if(!document.getElementById(a)){let T=document.createElement("style");T.id=a,T.innerHTML=`
            /* Google Sans (400/500/700) j\xE1 vem via <link> em initGlobalStylesAndFont()
               (utils.js), que roda antes de qualquer m\xF3dulo inicializar - esse @import
               era uma segunda requisi\xE7\xE3o redundante e bloqueava o parse do CSSOM. */

            .cw-focus-backdrop {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
                z-index: 2147483646; opacity: 0; pointer-events: none;
                transition: opacity 0.3s ease;
            }
            .cw-focus-backdrop.active { opacity: 1; pointer-events: auto; }

            /* --- PILL PRINCIPAL --- */
            .cw-pill {
                position: fixed; bottom: 10%; right: 24px;
                display: flex; flex-direction: column; align-items: center; gap: 14px;
                padding: 18px 8px;
                
                background: ${He.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${He.glassBorder}; border-radius: 50px;
                box-shadow: 0 12px 32px rgba(0,0,0,0.25); z-index: 2147483647;
                
                opacity: 0;
                width: 56px;
                height: auto;
                /* \xDAnico elemento persistente do app que anima quase o tempo
                   todo (hover em 9 bot\xF5es, abrir/fechar, drag) - \xFAnico caso
                   onde will-change est\xE1tico (em vez de ligar/desligar por
                   intera\xE7\xE3o) compensa, j\xE1 que \xE9 sempre 1 elemento s\xF3. */
                will-change: transform, opacity, width, height;

                overflow: visible;

                /* ABRIR: A p\xEDlula expande PRIMEIRO. Curva de entrada
                   (--cw-ease-decelerate) - mesma usada pelo genie dos m\xF3dulos,
                   pra parar de ser a \xFAnica transi\xE7\xE3o do app na curva
                   "standard" sem dire\xE7\xE3o. (max-height saiu da lista: o estado
                   aberto nunca define um valor num\xE9rico pra ela, ent\xE3o ia de
                   /para "none" - n\xE3o interpol\xE1vel, a transi\xE7\xE3o n\xE3o fazia nada.
                   "height" entra no lugar dela, mas s\xF3 funciona porque \xE9
                   primado via JS com um valor em px medido de verdade
                   (openPill(), abaixo) - "auto" tamb\xE9m n\xE3o \xE9 interpol\xE1vel, e
                   height \xE9 a dimens\xE3o que mais muda ao abrir.) */
                transition:
                    width 0.3s var(--cw-ease-decelerate),
                    height 0.3s var(--cw-ease-decelerate),
                    padding 0.3s var(--cw-ease-decelerate),
                    opacity 0.2s ease,
                    transform 0.3s var(--cw-ease-decelerate);
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill { transition: opacity 0.2s ease !important; transform: none !important; }
            }

            /* --- SURGIMENTO (primeiro boot) --- */
            /* Antes era s\xF3 um fade de opacity (praticamente impercept\xEDvel).
               Agora a p\xEDlula chega com peso: sobe, d\xE1 um leve overshoot
               (--cw-ease-spring) e assenta - acompanhado de SoundManager.playReady(). */
            @keyframes cw-pill-arrive {
                from { opacity: 0; transform: translateY(28px) scale(0.4); }
                to   { opacity: 1; transform: translateY(0) scale(1); }
            }
            .cw-pill.arriving {
                animation: cw-pill-arrive 0.6s var(--cw-ease-spring) forwards;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill.arriving { animation: fadeIn 0.3s ease forwards; }
            }

            /* --- ESTADO COLAPSADO (FECHANDO) --- */
            .cw-pill.collapsed {
                width: ${Ri}px !important;
                height: ${Ri}px !important;
                padding: 0 !important;
                gap: 0 !important;
                border-radius: 50% !important;
                cursor: pointer;

                overflow: hidden !important;

                /* FECHAR: A p\xEDlula s\xF3 come\xE7a a colapsar depois que a cascata
                   de sa\xEDda dos \xEDcones termina (delay 0.38s - o \xFAltimo \xEDcone,
                   o Grip, j\xE1 come\xE7ou a sumir em 0.20s e leva mais 0.2s pra
                   terminar; ver CASCATA DE SA\xCDDA abaixo). Antes era um delay
                   fixo de 0.15s, pensado pra quando todo o conte\xFAdo sumia de
                   uma vez s\xF3 - com a cascata isso deixava a c\xE1psula
                   encolhendo por baixo de \xEDcones que ainda estavam saindo.
                   O logo (ver .cw-pill.collapsed .cw-main-logo abaixo) usa o
                   mesmo delay, pra aparecer no instante exato em que a
                   c\xE1psula come\xE7a a encolher.
                   width/padding/border-radius/transform usam
                   --cw-ease-accelerate, espelhando --cw-ease-decelerate da
                   abertura acima - cursos pequenos (poucos px), ent\xE3o a
                   "chegada r\xE1pida" do accelerate n\xE3o incomoda.
                   "height" \xE9 a exce\xE7\xE3o: em vez de max-height (n\xE3o
                   interpol\xE1vel de/para "none", s\xF3 pulava pro valor final -
                   por isso tinha sa\xEDdo da lista de transi\xE7\xE3o), agora \xE9
                   primada via JS com um valor em px real (collapsePill()).
                   E usa --cw-ease-elastic, n\xE3o --cw-ease-accelerate: o curso
                   \xE9 grande (pode passar de 500px), e uma curva que "acelera
                   at\xE9 o fim" nesse tamanho de percurso l\xEA como a p\xEDlula
                   caindo com for\xE7a no c\xEDrculo final - exatamente a
                   brutalidade que devia sumir. --cw-ease-elastic desacelera
                   suavemente at\xE9 o alvo, sem overshoot (que, na mesma
                   dist\xE2ncia, faria a p\xEDlula encolher quase at\xE9 sumir antes
                   de voltar). */
                transition:
                    width 0.3s var(--cw-ease-accelerate) 0.38s,
                    height 0.3s var(--cw-ease-elastic) 0.38s,
                    padding 0.3s var(--cw-ease-accelerate) 0.38s,
                    border-radius 0.3s var(--cw-ease-accelerate) 0.38s,
                    opacity 0.2s ease 0s,
                    transform 0.3s var(--cw-ease-accelerate) 0.38s !important;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill.collapsed { transition: opacity 0.2s ease !important; }
            }
            
            /* --- LOGO DA BOLINHA --- */
            .cw-main-logo {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                display: flex; align-items: center; justify-content: center;
                pointer-events: none; 
                opacity: 0;
                transform: rotate(-180deg) scale(0.5);
                color: #fff;
                transition: opacity 0.2s ease 0s, transform 0.2s ease 0s;
            }
            /* Duas camadas de SVG empilhadas (base branca + spark com
               gradiente j\xE1 embutido no pr\xF3prio <linearGradient>) que fazem
               cross-fade de opacidade no hover - troca real e anim\xE1vel, em
               vez do mask/background-image de antes: essas duas propriedades
               n\xE3o s\xE3o interpol\xE1veis em CSS, ent\xE3o a cor "estalava" no meio
               de um scale que era o \xFAnico peda\xE7o realmente animando. */
            .cw-main-logo svg { position: absolute; inset: 0; margin: auto; width: 24px; height: 24px; pointer-events: none; }
            .cw-main-logo .cw-logo-base { fill: #fff; opacity: 1; transition: opacity 0.25s var(--cw-ease-standard); }
            .cw-main-logo .cw-logo-spark { opacity: 0; transition: opacity 0.25s var(--cw-ease-standard); }
            @media (prefers-reduced-motion: reduce) {
                .cw-main-logo .cw-logo-base, .cw-main-logo .cw-logo-spark { transition: opacity 0.15s ease !important; }
            }

            .cw-pill:not(.collapsed) .cw-main-logo {
                transform: rotate(360deg) scale(0);
                opacity: 0;
                transition: opacity 0.2s var(--cw-ease-accelerate), transform 0.2s var(--cw-ease-accelerate);
            }
            .cw-pill.collapsed .cw-main-logo {
                opacity: 1;
                transform: rotate(0) scale(1);
                /* Aparece no mesmo instante em que a c\xE1psula come\xE7a a
                   encolher (delay 0.38s, ver .cw-pill.collapsed acima - s\xF3
                   depois que a cascata de sa\xEDda dos \xEDcones termina). */
                transition: opacity 0.3s var(--cw-ease-decelerate) 0.38s, transform 0.3s var(--cw-ease-decelerate) 0.38s;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill:not(.collapsed) .cw-main-logo,
                .cw-pill.collapsed .cw-main-logo { transition: opacity 0.15s ease !important; transform: none !important; }
            }
            .cw-pill.collapsed:hover .cw-main-logo {
                transform: scale(1.15) rotate(0deg);
                transition-delay: 0s;
            }
            .cw-pill.collapsed:hover .cw-main-logo .cw-logo-base { opacity: 0; }
            .cw-pill.collapsed:hover .cw-main-logo .cw-logo-spark { opacity: 1; }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill.collapsed:hover .cw-main-logo { transform: none !important; }
            }

            /* Halo quente atr\xE1s do raio quando h\xE1 streak do dia, s\xF3 na
               bolinha fechada (j\xE1 que o badge com o n\xFAmero n\xE3o aparece mais
               a\xED - ver .cw-streak-badge). Intensifica junto dos mesmos
               patamares do toast de marco (5/15/30, ver MILESTONES). */
            .cw-pill.collapsed.has-streak .cw-main-logo { filter: drop-shadow(0 0 6px rgba(253, 214, 99, 0.5)); transition: filter 0.3s ease; }
            .cw-pill.collapsed.streak-tier-2 .cw-main-logo { filter: drop-shadow(0 0 6px rgba(251, 188, 5, 0.55)); }
            .cw-pill.collapsed.streak-tier-3 .cw-main-logo { filter: drop-shadow(0 0 7px rgba(249, 171, 0, 0.6)); }
            .cw-pill.collapsed.streak-tier-4 .cw-main-logo { filter: drop-shadow(0 0 8px rgba(234, 67, 53, 0.65)); }

            /* --- CONTE\xDADO INTERNO --- */
            .cw-pill > *:not(.cw-main-logo) {
                opacity: 1; transform: scale(1) translateY(0); visibility: visible;
                /* Aparece depois que a p\xEDlula expandiu (delay 0.15s), com um
                   leve "pop" el\xE1stico (--cw-ease-spring) em vez de um scale
                   linear seco - d\xE1 a coreografia que faltava na abertura. */
                transition:
                    opacity 0.25s ease 0.15s,
                    transform 0.3s var(--cw-ease-spring) 0.15s,
                    visibility 0s linear 0.15s,
                    filter 0.15s ease 0.15s;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill > *:not(.cw-main-logo) { transition: opacity 0.2s ease 0.1s !important; transform: none !important; }
            }

            .cw-pill.collapsed > *:not(.cw-main-logo) {
                opacity: 0; pointer-events: none; visibility: hidden;
                transform: scale(0.5); filter: blur(8px);
                /* Dura\xE7\xE3o base (0s de delay aqui) - cada \xEDcone ganha seu
                   pr\xF3prio delay individual logo abaixo, na cascata de sa\xEDda,
                   ent\xE3o esse "0s" s\xF3 vale pra quem n\xE3o tiver um delay mais
                   espec\xEDfico. Dura\xE7\xE3o subiu de 0.15s pra 0.2s (respiro maior
                   por \xEDcone, n\xE3o s\xF3 um corte seco). */
                transition:
                    opacity 0.2s var(--cw-ease-accelerate) 0s,
                    transform 0.2s var(--cw-ease-accelerate) 0s,
                    filter 0.2s ease 0s,
                    visibility 0s linear 0s;
            }

            /* --- CASCATAS DE ENTRADA E SA\xCDDA ---
               O atraso de cada item vem do \xEDndice dele (--cw-i, gravado por
               applyLayout() sempre que o layout muda), e n\xE3o de :nth-child com
               posi\xE7\xF5es fixas: a ordem dos \xEDcones agora \xE9 escolha do agente, e
               a lista antiga dava o atraso ao item errado assim que algo sa\xEDa
               do lugar (j\xE1 errava em dev, onde o selo "Dev" empurra todo mundo
               uma posi\xE7\xE3o). \xCDndices: punho = 0, fixados = 1..n, separador,
               bot\xE3o Mais. --cw-n \xE9 o \xFAltimo deles.

               Entrada: 0.15s + 0.02s por posi\xE7\xE3o, de cima pra baixo.
               Sa\xEDda: ordem reversa (o \xFAltimo a entrar \xE9 o primeiro a sair - o
               mesmo "unwind" de z\xEDper de antes), pra cada \xEDcone ter o seu
               momento antes de a c\xE1psula come\xE7ar a encolher (delay 0.38s, ver
               .cw-pill.collapsed). Com 7 fixados --cw-n = 9, ou seja, a
               cascata de sa\xEDda dura 0.18s, dentro da folga (era 0.20s). */
            .cw-pill:not(.collapsed) > .cw-grip,
            .cw-pill:not(.collapsed) > .cw-btn,
            .cw-pill:not(.collapsed) > .cw-sep {
                transition-delay: calc(0.15s + var(--cw-i, 0) * 0.02s);
            }
            .cw-pill.collapsed > .cw-grip,
            .cw-pill.collapsed > .cw-btn,
            .cw-pill.collapsed > .cw-sep {
                transition-delay: calc((var(--cw-n, 0) - var(--cw-i, 0)) * 0.02s);
            }

            /* --- ESTILOS DOS BOT\xD5ES --- */
            .cw-btn {
                width: 40px; height: 40px; 
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative; color: ${He.iconIdle};
                flex-shrink: 0;
                transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn { transition: background 0.2s ease, color 0.2s ease !important; }
            }
            .cw-btn:hover {
                background: ${He.glassHighlight};
                color: ${He.iconActive};
                /* S\xF3 scale (cresce do centro), sem translateY: bot\xF5es redondos
                   colados lado a lado numa fileira \xFAnica - um lift vertical
                   \xE9 o caso cl\xE1ssico de flicker quando o mouse passa raspando
                   a borda entre dois \xEDcones adjacentes. */
                transform: scale(1.18) !important;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn:hover { transform: none !important; }
            }

            .cw-btn.notes.active { color: ${He.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.precall.active { color: ${He.yellow} !important; background: rgba(253, 214, 99, 0.15); }
            .cw-btn.email.active { color: ${He.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${He.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${He.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.library.active { color: ${He.pink} !important; background: rgba(244, 143, 177, 0.15); } /* [NOVO] */
            .cw-btn.broadcast.active { color: ${He.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${He.teal} !important; background: rgba(0, 191, 165, 0.15); }
            .cw-btn.configs.active { color: ${He.gray} !important; background: rgba(154, 160, 166, 0.15); }
            .cw-btn.bauform.active { color: ${He.blue} !important; background: rgba(66, 133, 244, 0.15); }

            .cw-btn.notes:hover { color: ${He.blue}; filter: drop-shadow(0 0 8px rgba(138, 180, 248, 0.6)); }
            .cw-btn.precall:hover { color: ${He.yellow}; filter: drop-shadow(0 0 8px rgba(253, 214, 99, 0.6)); }
            .cw-btn.email:hover { color: ${He.red}; filter: drop-shadow(0 0 8px rgba(242, 139, 130, 0.6)); }
            .cw-btn.script:hover { color: ${He.purple}; filter: drop-shadow(0 0 8px rgba(197, 138, 249, 0.6)); }
            .cw-btn.links:hover { color: ${He.green}; filter: drop-shadow(0 0 8px rgba(129, 201, 149, 0.6)); }
            .cw-btn.library:hover { color: ${He.pink}; filter: drop-shadow(0 0 8px rgba(244, 143, 177, 0.6)); }
            .cw-btn.broadcast:hover { color: ${He.orange}; filter: drop-shadow(0 0 8px rgba(249, 171, 0, 0.6)); }
            .cw-btn.timezone:hover { color: ${He.teal}; filter: drop-shadow(0 0 8px rgba(0, 191, 165, 0.6)); }
            .cw-btn.configs:hover { color: ${He.gray}; filter: drop-shadow(0 0 8px rgba(154, 160, 166, 0.6)); }

            /* --- BOT\xC3O MAIS + GAVETA ---
               A gaveta \xE9 um elemento IRM\xC3O da p\xEDlula (filho de <body>), n\xE3o
               um filho dela: mesma li\xE7\xE3o do .cw-processing-card mais abaixo -
               a p\xEDlula \xE9 fixed, arrast\xE1vel, com transi\xE7\xE3o pr\xF3pria e regras
               em tudo que \xE9 filho direto, e abrir algo DENTRO dela significa
               brigar com esse CSS. Fora, entrada e sa\xEDda s\xE3o s\xF3 opacity +
               scale, e o fundo pode ser vidro de verdade (backdrop-filter
               aninhado dentro do da p\xEDlula n\xE3o borra o que est\xE1 atr\xE1s dela).

               "Mais" ganha .active quando um m\xF3dulo guardado est\xE1 aberto
               (reaproveita o ponto de .cw-btn.active::before e faz a p\xEDlula
               n\xE3o recolher por baixo dele), .open enquanto a gaveta est\xE1
               aberta e .has-signal quando algum m\xF3dulo guardado tem aviso
               pendente (Avisos n\xE3o lidos, rascunho do Case Notes) - sem
               isso, guardar esses m\xF3dulos os deixaria mudos. */
            .cw-btn.more.open,
            .cw-btn.more.active { color: ${He.iconActive}; background: ${He.glassHighlight}; }
            .cw-btn.more .cw-more-signal { display: none; }
            .cw-btn.more.has-signal .cw-more-signal { display: block; }

            .cw-drawer {
                position: fixed; z-index: 2147483647;
                display: grid; grid-template-columns: repeat(3, 88px); gap: 2px;
                padding: 10px; box-sizing: border-box;
                background: rgba(32, 33, 36, 0.9);
                backdrop-filter: blur(16px) saturate(160%); -webkit-backdrop-filter: blur(16px) saturate(160%);
                border: 1px solid ${He.glassBorder}; border-radius: 22px;
                box-shadow: 0 12px 32px rgba(0,0,0,0.3);
                font-family: 'Google Sans', Roboto, sans-serif;
                /* visibility (e n\xE3o display:none) mant\xE9m o layout med\xEDvel pra
                   posicionar antes de abrir; tamb\xE9m tira os bot\xF5es do Tab. */
                opacity: 0; transform: scale(0.92); visibility: hidden; pointer-events: none;
                transition: opacity 0.18s var(--cw-ease-accelerate),
                            transform 0.18s var(--cw-ease-accelerate),
                            visibility 0s linear 0.18s;
            }
            .cw-drawer * { box-sizing: border-box; }
            .cw-drawer.open {
                opacity: 1; transform: scale(1); visibility: visible; pointer-events: auto;
                transition: opacity 0.22s var(--cw-ease-standard),
                            transform 0.28s var(--cw-ease-spring),
                            visibility 0s;
            }
            .cw-drawer-tile {
                display: flex; flex-direction: column; align-items: center; gap: 4px;
                padding: 8px 4px 6px; border-radius: 14px; cursor: pointer;
                transition: background-color 0.15s var(--cw-ease-standard);
            }
            .cw-drawer-tile:hover { background: rgba(255,255,255,0.08); }
            .cw-drawer-label {
                font-size: 11px; font-weight: 500; line-height: 1.25; color: #E8EAED;
                text-align: center; max-width: 80px; overflow-wrap: break-word;
            }
            /* Aqui o nome j\xE1 est\xE1 escrito embaixo do \xEDcone: a dica flutuante s\xF3
               repetiria (e, sem .cw-pill.side-*, ficaria sem posi\xE7\xE3o). */
            .cw-drawer .cw-btn::after { display: none; }
            @media (prefers-reduced-motion: reduce) {
                .cw-drawer, .cw-drawer.open { transition: opacity 0.15s ease !important; transform: none !important; }
                .cw-drawer-tile { transition: none !important; }
            }

            .cw-btn::before {
                content: ''; position: absolute; bottom: 2px; left: 50%; width: 4px; height: 4px; border-radius: 50%;
                background-color: currentColor; box-shadow: 0 0 6px currentColor;
                transform: translateX(-50%) scale(0); opacity: 0; visibility: hidden;
                transition: transform 0.2s, opacity 0.2s; pointer-events: none;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn::before { transition: opacity 0.2s ease !important; transform: translateX(-50%) !important; }
            }
            .cw-btn.active::before { transform: translateX(-50%) scale(1); opacity: 1; visibility: visible; }
            
            .cw-btn svg { width: 22px; height: 22px; fill: currentColor; pointer-events: none; }

            .cw-btn::after { 
                content: attr(data-label); position: absolute; top: 50%; transform: translateY(-50%) scale(0.9); 
                padding: 6px 12px; border-radius: 6px; background: #202124; color: #fff; 
                font-family: 'Google Sans', sans-serif; font-size: 12px; font-weight: 500; 
                opacity: 0; visibility: hidden; pointer-events: none; 
                transition: all 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.3); white-space: nowrap; 
                border: 1px solid rgba(255,255,255,0.15); z-index: 2147483648; 
            }
            .cw-btn:hover::after { opacity: 1; visibility: visible; transform: translateY(-50%) scale(1); }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn::after { transition: opacity 0.2s ease !important; }
                .cw-btn:hover::after { transform: translateY(-50%) !important; }
            }
            .cw-pill.side-right .cw-btn::after { right: 55px; transform-origin: right center; }
            .cw-pill.side-left .cw-btn::after { left: 55px; transform-origin: left center; }

            .cw-badge { position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; background: #d93025; border-radius: 50%; border: 1px solid #fff; pointer-events: none; box-shadow: 0 1px 2px rgba(0,0,0,0.2); z-index: 10; animation: popIn 0.3s; }
            @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }

            .cw-sep { width: 20px; height: 1px; background: rgba(255,255,255,0.2); margin: 4px 0; }
            .cw-sep.visible { opacity: 1; }
            .cw-pill.collapsed .cw-sep { opacity: 0; transition: opacity 0.1s ease 0s; }

            .cw-grip { width: 100%; height: 24px; display: flex; align-items: center; justify-content: center; cursor: grab; margin-bottom: 2px; }
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${He.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            @media (prefers-reduced-motion: reduce) {
                .cw-grip:hover .cw-grip-bar { transform: none !important; }
            }
            .cw-pill.dragging .cw-grip-bar { background-color: ${He.blue}; width: 16px; opacity: 1; }

            .cw-pill.dragging {
                box-shadow:
                    0 8px 32px rgba(0,0,0,0.3),
                    0 0 20px rgba(138, 180, 248, 0.4);
                filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
                transform: scale(1.02) !important;
                transition: box-shadow 0.2s ease, filter 0.2s ease, transform 0.2s ease !important;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill.dragging { transform: none !important; }
            }

            /* ============================================================
               PROCESSING CARD (tela de carregamento)
               ============================================================
               Elemento PR\xD3PRIO, irm\xE3o da p\xEDlula - n\xE3o \xE9 mais a p\xEDlula
               "virando" um card. As tr\xEAs tentativas anteriores morfavam a
               .cw-pill em modal centralizado, e cada uma quebrou de um jeito
               novo: a p\xEDlula \xE9 fixed ancorada em bottom/right, arrast\xE1vel,
               com transi\xE7\xE3o pr\xF3pria e !important em tudo, e 15 filhos com
               delays em cascata. Morfar isso significa brigar com o CSS dela
               nos dois sentidos - o \xFAltimo sintoma foi o card travar na
               largura da p\xEDlula (56px), porque medir o alvo com
               getBoundingClientRect() logo ap\xF3s trocar a classe devolve o
               valor ANIMADO daquele instante, n\xE3o o alvo do CSS.
               Com um elemento separado, entrada e sa\xEDda s\xE3o s\xF3 opacity +
               scale: nada pra medir, nada pra sincronizar. */
            .cw-processing-card {
                position: fixed;
                top: 50%; left: 50%;
                /* 300px d\xE1 linha de leitura de verdade pra dica (na vers\xE3o
                   morfada o texto quebrava uma palavra por linha). */
                width: 300px;
                max-width: calc(100vw - 48px);
                box-sizing: border-box;
                padding: 26px 24px;
                border-radius: 20px;
                /* Mesmo Liquid Glass do resto do app (ver design-system.md). */
                background: rgba(32, 33, 36, 0.82);
                backdrop-filter: blur(24px) saturate(160%);
                -webkit-backdrop-filter: blur(24px) saturate(160%);
                border: 1px solid ${He.glassBorder};
                box-shadow: 0 16px 40px rgba(0,0,0,0.35);
                display: flex; flex-direction: column; align-items: center;
                gap: 18px;
                z-index: 2147483647;
                /* O reset de box-sizing l\xE1 em cima s\xF3 cobre .cw-pill e
                   .cw-module-window - este card n\xE3o \xE9 filho de nenhum dos
                   dois, ent\xE3o precisa declarar o seu (e o dos filhos). */
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.92);
                transition: opacity 0.26s var(--cw-ease-standard),
                            transform 0.3s var(--cw-ease-decelerate);
            }
            .cw-processing-card * { box-sizing: border-box; }
            /* A p\xEDlula continua vis\xEDvel no cantinho durante o carregamento
               (z-index acima do backdrop), o que d\xE1 continuidade - mas ela n\xE3o
               pode ser clic\xE1vel enquanto o card manda na tela. */
            .cw-pill.cw-busy { pointer-events: none !important; }
            .cw-processing-card.visible {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-processing-card { transition: opacity 0.2s ease !important; transform: translate(-50%, -50%) !important; }
            }

            .cw-center-dots {
                grid-area: 1 / 1;
                display: flex; gap: 10px;
                opacity: 1;
                transition: opacity 0.18s var(--cw-ease-standard);
            }
            /* Coreografia pr\xF3pria (era um "googleBounce" gen\xE9rico, ease-in-out puro):
               usa a curva spring j\xE1 can\xF4nica do audit de motion (--cw-ease-spring)
               pra um overshoot vivo, e soma um scale pulse ao bounce vertical. */
            .cw-center-dots span {
                width: 8px; height: 8px; border-radius: 50%;
                animation: cw-dot-dance 1.1s var(--cw-ease-spring) infinite both;
                will-change: transform;
            }
            .cw-center-dots span:nth-child(1) { background-color: ${He.blue}; animation-delay: -0.22s; }
            .cw-center-dots span:nth-child(2) { background-color: ${He.red}; animation-delay: -0.11s; }
            .cw-center-dots span:nth-child(3) { background-color: ${He.green}; }
            @media (prefers-reduced-motion: reduce) {
                /* Antes n\xE3o tinha fallback nenhum - as bolinhas ficavam
                   quicando pra sempre mesmo com reduced-motion ativado. */
                .cw-center-dots span { animation: cw-dot-fade 1.6s ease-in-out infinite; }
            }
            
            /* Sem anima\xE7\xE3o de entrada pr\xF3pria: o card inteiro j\xE1 entra com
               fade+scale, e uma segunda anima\xE7\xE3o por dentro s\xF3 competia com
               ela (era o que o .cw-center-stage fazia na vers\xE3o morfada). */
            .cw-center-text {
                font-family: 'Google Sans', Roboto, sans-serif;
                font-size: 14px;
                color: #E8EAED;
                text-align: center;
                width: 100%;
                font-weight: 500;
                line-height: 1.55;
                letter-spacing: 0.2px;
            }

            .cw-dot-dirty {
                position: absolute; top: 8px; right: 8px;
                width: 6px; height: 6px;
                background-color: #F9AB00;
                border-radius: 50%;
                border: 1px solid #3c4043;
                pointer-events: none;
                z-index: 11;
                animation: popIn 0.3s;
            }

            .cw-admin-badge {
                position: absolute;
                bottom: -10px;
                left: 50%;
                transform: translateX(-50%) scale(0);
                background: linear-gradient(135deg, #1a73e8, #4285f4);
                color: white;
                font-size: 8px;
                font-weight: 800;
                padding: 2px 6px;
                border-radius: 10px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                border: 1px solid rgba(255,255,255,0.2);
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: none;
                z-index: 20;
                white-space: nowrap;
            }
            .cw-pill:not(.collapsed) .cw-admin-badge.visible {
                transform: translateX(-50%) scale(1);
            }

            /* --- SELO DE AMBIENTE (s\xF3 desenvolvimento) --- */
            /* Em produ\xE7\xE3o este elemento nem chega a ser criado: a decis\xE3o foi
               n\xE3o p\xF4r chrome extra na tela do agente, e um selo permanente
               dizendo "est\xE1 tudo normal" \xE9 exatamente isso. Quem precisa
               confirmar produ\xE7\xE3o olha Configura\xE7\xF5es \u2192 Diagn\xF3stico (ou o
               console), onde a informa\xE7\xE3o est\xE1 sempre, de gra\xE7a.

               Aparece em cima, do lado oposto ao streak, e com a p\xEDlula
               ABERTA - na bolinha fechada n\xE3o h\xE1 espa\xE7o e o agente n\xE3o est\xE1
               operando nada. \xC2mbar, n\xE3o vermelho: \xE9 um aviso de contexto
               ("cuidado, aqui \xE9 dev"), n\xE3o um erro. */
            .cw-env-badge {
                position: absolute; top: -8px; left: -6px;
                background: #F29900; color: #202124;
                font-size: 9px; font-weight: 800;
                letter-spacing: 0.6px; text-transform: uppercase;
                padding: 2px 7px; border-radius: 100px;
                border: 1px solid rgba(255,255,255,0.25);
                box-shadow: 0 2px 6px rgba(0,0,0,0.28);
                white-space: nowrap;
                pointer-events: none;
                z-index: 21;
                opacity: 0;
                transform: scale(0.6);
                transition:
                    opacity 0.3s var(--cw-ease-standard),
                    transform 0.3s var(--cw-ease-spring);
            }
            .cw-pill:not(.collapsed) .cw-env-badge {
                opacity: 1;
                transform: scale(1);
            }

            /* O selo escrito s\xF3 cabe com a p\xEDlula aberta - mas ela passa a
               maior parte do tempo colapsada numa bolinha de 50px, e uma marca
               de ambiente que some justamente no estado mais comum n\xE3o serve
               pra nada. Ent\xE3o o estado colapsado ganha um anel \xE2mbar.
               box-shadow, e n\xE3o border: o anel \xE9 desenhado FORA da caixa, logo
               n\xE3o \xE9 cortado pelo "overflow: hidden" do .collapsed nem empurra
               o layout interno. A sombra original vem junto na mesma
               declara\xE7\xE3o porque box-shadow n\xE3o se acumula entre regras. */
            .cw-pill.cw-env-dev.collapsed {
                box-shadow:
                    0 12px 32px rgba(0,0,0,0.25),
                    0 0 0 3px #F29900;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-env-badge { transition: opacity 0.2s linear !important; transform: none !important; }
                .cw-pill:not(.collapsed) .cw-env-badge { transform: none !important; }
            }

            /* --- RITMO DO TURNO (contador de casos hoje) --- */
            /* S\xF3 aparece com a p\xEDlula ABERTA - \xE9 um indicador de contexto (tem
               espa\xE7o pro n\xFAmero, n\xE3o corta em overflow:hidden), n\xE3o uma
               notifica\xE7\xE3o que precise brigar pela aten\xE7\xE3o na bolinha fechada.
               Segue a regra geral de "esconder no collapsed" (seletor l\xE1 em
               cima) como qualquer outro conte\xFAdo interno; o que sobra aqui \xE9
               s\xF3 o gate extra de "s\xF3 se tiver streak" pro estado aberto -
               mesmo formato de .cw-admin-badge.visible logo acima, que j\xE1
               resolve esse specificity certo. */
            .cw-streak-badge {
                position: absolute; top: -6px; right: -6px;
                background: #202124; color: #FDD663;
                font-size: 10px; font-weight: 800;
                padding: 3px 7px; border-radius: 100px;
                display: flex; align-items: center; gap: 3px;
                border: 1px solid rgba(255,255,255,0.15);
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                pointer-events: none; z-index: 25;
                transition: opacity 0.2s ease, transform 0.2s var(--cw-ease-spring), color 0.3s ease;
            }
            .cw-pill:not(.collapsed) .cw-streak-badge:not(.visible) { opacity: 0; transform: scale(0.5); }
            .cw-pill:not(.collapsed) .cw-streak-badge.visible { opacity: 1; transform: scale(1); }
            @media (prefers-reduced-motion: reduce) {
                .cw-streak-badge { transition: opacity 0.15s ease !important; transform: none !important; }
            }
            /* Temperatura da chama sobe com o count - mesmos patamares do
               MILESTONES (5/15/30) que j\xE1 disparam o toast de marco. */
            .cw-pill.streak-tier-2 #cw-streak-count { color: #FBBC05; }
            .cw-pill.streak-tier-3 #cw-streak-count { color: #F9AB00; }
            .cw-pill.streak-tier-4 #cw-streak-count { color: #EA4335; }

            /* Ocupa a MESMA c\xE9lula do grid que as bolinhas (ver
               .cw-center-slot): as duas coisas se revezam no mesmo lugar, ent\xE3o
               a troca "bolinhas -> check" n\xE3o muda a altura do card. Na vers\xE3o
               anterior era display:none/block, e alternar isso reflowava o card
               inteiro no meio da anima\xE7\xE3o. */
            .cw-center-success {
                grid-area: 1 / 1;
                color: ${He.green};
                opacity: 0; transform: scale(0.5);
                transition: opacity 0.22s var(--cw-ease-standard), transform 0.22s var(--cw-ease-spring);
                pointer-events: none;
            }
            .cw-center-success svg { width: 36px; height: 36px; display: block; }
            .cw-center-success.show { opacity: 1; transform: scale(1); }
            @media (prefers-reduced-motion: reduce) {
                .cw-center-success { transition: opacity 0.15s ease !important; transform: none !important; }
            }

            /* Bolinhas e check dividem uma c\xE9lula s\xF3. O slot tem altura fixa
               (a do check, o maior dos dois) pra que a troca no fim do
               carregamento n\xE3o fa\xE7a o card "pular" de tamanho. */
            .cw-center-slot {
                display: grid;
                place-items: center;
                height: 36px;
            }
            .cw-center-dots.hidden { opacity: 0; }

            .cw-abort-btn {
                font-size: 12px; color: #9AA0A6;
                cursor: pointer; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 700;
                padding: 8px 16px; border-radius: 20px;
                background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
                /* Propriedades expl\xEDcitas em vez de "all" - o audit de motion
                   (fase 5) tirou "transition: all" do resto do app justamente
                   pra n\xE3o animar propriedade que ningu\xE9m pediu. */
                transition: color 0.2s var(--cw-ease-standard),
                            background-color 0.2s var(--cw-ease-standard),
                            border-color 0.2s var(--cw-ease-standard),
                            transform 0.2s var(--cw-ease-standard),
                            opacity 0.2s var(--cw-ease-standard);
                user-select: none;
                display: flex; align-items: center; gap: 6px;
            }
            .cw-abort-btn:hover {
                color: #F28B82; background: rgba(242, 139, 130, 0.1); border-color: rgba(242, 139, 130, 0.3);
                transform: translateY(-1px);
            }
            .cw-abort-btn:active { transform: scale(0.95); }
            /* Some junto com as bolinhas quando o check entra - n\xE3o faz mais
               sentido oferecer "cancelar" depois que j\xE1 deu certo. */
            .cw-abort-btn.hidden { opacity: 0; pointer-events: none; }
            @media (prefers-reduced-motion: reduce) {
                .cw-abort-btn { transition: opacity 0.15s ease, color 0.15s ease, background-color 0.15s ease !important; transform: none !important; }
            }

            @keyframes fadeIn { to { opacity: 1; } }
            @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            @keyframes cw-dot-dance { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-10px) scale(1.2); } }
            @keyframes cw-dot-fade { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
        `,document.head.appendChild(T)}function o(){let T=Ya();return T.isDev?`<div id="cw-env-tag" class="cw-env-badge" title="${qt("devEnvTitle")(T.fingerprint,T.endpoint)}">Dev</div>`:""}let n=document.createElement("div");n.id="cw-floating-trigger",n.className="cw-pill side-right collapsed"+(Ya().isDev?" cw-env-dev":""),n.innerHTML=`
        <div id="cw-command-center" style="display:none;"></div>
        <div class="cw-main-logo js-cc-quicksearch" title="${qt("quickSearch")}">${lo.main}${lo.mainSpark}</div>
        <div id="cw-admin-tag" class="cw-admin-badge">Admin</div>
        ${o()}
        <div id="cw-streak-badge" class="cw-streak-badge js-cc-casestoday" title="${qt("casesToday")}">\u{1F525} <span id="cw-streak-count">0</span></div>

        <div class="cw-grip js-cc-drag" title="${qt("drag")}">
            <div class="cw-grip-bar"></div>
        </div>
        <div class="cw-sep"></div>
        <button class="cw-btn more" id="cw-btn-more" aria-expanded="false" aria-controls="cw-drawer">${lo.apps}<span class="cw-badge cw-more-signal"></span></button>
        <div class="cw-status-container">
            <div class="cw-dots" id="cw-loader"><span></span><span></span><span></span></div>
            <div class="cw-check" id="cw-success" style="display:none;">${lo.check}</div>
        </div>
    `;let i=document.createElement("div");i.className="cw-focus-backdrop",document.body.appendChild(i),document.body.appendChild(n),il(),je(()=>{let T=n.querySelector(".js-cc-quicksearch");T&&(T.title=qt("quickSearch"));let Y=n.querySelector(".js-cc-casestoday");Y&&(Y.title=qt("casesToday"));let se=n.querySelector(".js-cc-drag");se&&(se.title=qt("drag"));let V=n.querySelector("#cw-env-tag");if(V){let O=Ya();V.title=qt("devEnvTitle")(O.fingerprint,O.endpoint)}L()});let r=T=>{w.playClick(),T()},s={notes:e.toggleNotes,precall:e.togglePrecall,bauform:e.toggleBAUForm,email:e.toggleEmail,script:e.toggleScript,links:e.toggleLinks,library:e.toggleLibrary,timezone:e.toggleTimezone,configs:e.toggleConfigs,notetable:e.toggleNoteTable,broadcast:()=>{let T=u.broadcast.querySelector(".cw-badge");T&&T.remove(),e.broadcastControl&&e.broadcastControl.toggle()}},l=n.querySelector(".cw-grip"),p=n.querySelector(".cw-sep"),c=n.querySelector("#cw-btn-more"),m=document.createElement("div");m.id="cw-drawer",m.className="cw-drawer",m.setAttribute("role","group"),document.body.appendChild(m);let u={},h={};so.forEach(T=>{let Y=document.createElement("button");Y.className=`cw-btn ${T}`,Y.id=`cw-btn-${T}`,Y.innerHTML=lo[T],Y.onclick=V=>{V.stopPropagation(),r(s[T]),te()},Y.addEventListener("mouseenter",()=>w.playHover()),u[T]=Y;let se=document.createElement("div");se.className="cw-drawer-tile",se.appendChild(Object.assign(document.createElement("span"),{className:"cw-drawer-label"})),se.onclick=V=>{V.target.closest("button")||Y.click()},h[T]=se}),c.addEventListener("mouseenter",()=>w.playHover());function L(){so.forEach(T=>{let Y=jo(T);u[T].dataset.label=Y,u[T].setAttribute("aria-label",Y),h[T].querySelector(".cw-drawer-label").textContent=Y}),c.dataset.label=qt("more"),c.setAttribute("aria-label",qt("more")),m.setAttribute("aria-label",qt("more"))}function S(){c.classList.toggle("active",!!m.querySelector(".cw-btn.active")),c.classList.toggle("has-signal",!!m.querySelector(".cw-badge, .cw-dot-dirty"))}new MutationObserver(S).observe(m,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["class"]});function C({pinned:T,drawer:Y}){T.forEach(V=>n.insertBefore(u[V],p)),m.replaceChildren(),Y.forEach(V=>{h[V].prepend(u[V]),m.appendChild(h[V])});let se=[l,...T.map(V=>u[V]),p,c];se.forEach((V,O)=>V.style.setProperty("--cw-i",O)),n.style.setProperty("--cw-n",se.length-1),S()}let D=!1;function G(){let se=n.getBoundingClientRect(),V=c.getBoundingClientRect(),O=m.offsetWidth,k=m.offsetHeight,j=n.classList.contains("side-right"),ie=Ht(j?se.left-12-O:se.right+12,8,window.innerWidth-O-8),P=Ht(V.bottom-k+10,8,window.innerHeight-k-8);m.style.left=`${ie}px`,m.style.top=`${P}px`,m.style.transformOrigin=`${j?O:0}px ${Ht(V.top+V.height/2-P,0,k)}px`}function F(T){m.contains(T.target)||c.contains(T.target)||te()}function R(T){T.key==="Escape"&&(T.stopPropagation(),te({restoreFocus:!0}))}function le(){D||n.classList.contains("collapsed")||(G(),D=!0,m.classList.add("open"),c.classList.add("open"),c.setAttribute("aria-expanded","true"),document.addEventListener("mousedown",F,!0),document.addEventListener("keydown",R,!0))}function te({restoreFocus:T=!1}={}){D&&(D=!1,m.classList.remove("open"),c.classList.remove("open"),c.setAttribute("aria-expanded","false"),document.removeEventListener("mousedown",F,!0),document.removeEventListener("keydown",R,!0),T&&c.focus())}if(c.onclick=T=>{if(T.stopPropagation(),w.playClick(),D){te();return}if(le(),T.detail===0){let Y=m.querySelector("button");Y&&Y.focus()}},window.addEventListener("resize",()=>te()),e.broadcastControl&&e.broadcastControl.hasUnread){let T=document.createElement("div");T.className="cw-badge",u.broadcast.appendChild(T)}L(),C(sa.get()),sa.onChange(C);let ee=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function $(){if(ee()){n.classList.remove("collapsed"),w.playGenieOpen();return}let T=n.getBoundingClientRect(),Y=window.innerHeight,se=T.top>Y/2,V=T.height;n.style.setProperty("transition","none","important"),n.classList.remove("collapsed");let O=n.scrollHeight;if(n.classList.add("collapsed"),n.style.height=`${V}px`,se){let k=Y-T.bottom;n.style.top="auto",n.style.bottom=`${k}px`}else n.style.bottom="auto",n.style.top=`${T.top}px`;n.style.overflow="hidden",n.offsetWidth,n.style.removeProperty("transition"),n.classList.remove("collapsed"),n.style.height=`${O}px`,w.playGenieOpen(),setTimeout(()=>{n.style.height="",n.style.overflow=""},350)}function A(T=!0){if(n.classList.contains("collapsed"))return;if(te(),ee()){n.classList.add("collapsed"),T&&w.playSwoosh();return}let Y=n.getBoundingClientRect().height;n.style.setProperty("transition","none","important"),n.style.height=`${Y}px`,n.offsetWidth,n.style.removeProperty("transition"),n.classList.add("collapsed"),n.style.height=`${Ri}px`,T&&w.playSwoosh(),setTimeout(()=>{n.style.height=""},700)}zi=A;let y=null;function z(){document.querySelector(".cw-processing-card")||(y=setTimeout(()=>{n.querySelector(".cw-btn.active")||A()},3e3))}function U(){y&&clearTimeout(y)}n.onmouseleave=z,n.onmouseenter=U,m.onmouseenter=U,m.onmouseleave=z,(async function(){let Y=()=>{let se=it();if(se){let V=se.split("@")[0].toLowerCase();if(bs.includes(V)){let O=n.querySelector("#cw-admin-tag");O&&O.classList.add("visible")}}else setTimeout(Y,2e3)};if(Y(),t&&typeof t.then=="function"){try{await t}catch{}await Ne(150)}else await Ne(2800);n.classList.add("arriving"),w.playReady(),n.querySelectorAll(".cw-sep").forEach(se=>se.classList.add("visible"))})();let M=!1,Z,de,ve,re,be=3;n.onmousedown=T=>{if(T.target.closest("button"))return;T.preventDefault(),Z=T.clientX,de=T.clientY;let Y=n.getBoundingClientRect();ve=Y.left,re=Y.top,document.addEventListener("mousemove",pe),document.addEventListener("mouseup",he)};function pe(T){let Y=T.clientX-Z,se=T.clientY-de;!M&&Math.sqrt(Y*Y+se*se)>be&&(M=!0,te(),n.classList.add("dragging"),n.style.transition="none",y&&clearTimeout(y)),M&&(n.style.left=`${ve+Y}px`,n.style.top=`${re+se}px`,n.style.right="auto",n.style.bottom="auto",n.style.transform="none")}function he(T){if(document.removeEventListener("mousemove",pe),document.removeEventListener("mouseup",he),M){M=!1,n.classList.remove("dragging");let Y=window.innerWidth,se=window.innerHeight,V=n.getBoundingClientRect(),O=V.left+V.width/2,k;O<Y/2?(k=24,n.classList.remove("side-right"),n.classList.add("side-left")):(k=Y-V.width-24,n.classList.remove("side-left"),n.classList.add("side-right"));let j=Ht(V.top,24,se-V.height-24);setTimeout(()=>{n.style.setProperty("transition","left 0.3s cubic-bezier(0.4, 0, 0.2, 1), top 0.3s cubic-bezier(0.4, 0, 0.2, 1)","important"),n.style.left=`${k}px`,n.style.top=`${j}px`,n.style.bottom="auto",n.style.transform=""},10),setTimeout(()=>{n.style.transition="",n.style.removeProperty("transition")},700)}else{let Y=n.querySelector(".cw-btn.active"),se=T.target.closest("button");n.classList.contains("collapsed")?$():!Y&&!se&&A(),se&&(se.style.transform="scale(0.9)",setTimeout(()=>se.style.transform="",150))}}}function Pa(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop");window._CW_ABORT_PROCESS=!1;let a=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;e&&zi?zi(!1):e&&e.classList.add("collapsed"),e&&e.classList.add("cw-busy");let o=document.createElement("div");o.className="cw-processing-card",o.innerHTML=`
      <div class="cw-center-slot">
        <div class="cw-center-dots"><span></span><span></span><span></span></div>
        <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
      </div>
      <div class="cw-center-text">${ke.getRandomTip()}</div>
  `;let n=document.createElement("div");n.className="cw-abort-btn",n.textContent=qt("cancel"),n.onclick=l=>{l.stopPropagation(),window._CW_ABORT_PROCESS=!0,w.stopThinking(),ne(qt("cancelledToast"),{duration:3e3}),s()},o.appendChild(n),document.body.appendChild(o),t&&t.classList.add("active"),requestAnimationFrame(()=>{requestAnimationFrame(()=>o.classList.add("visible"))}),w.startThinking();let i=Date.now(),r=!1;function s(){r||(r=!0,w.stopThinking(),t&&t.classList.remove("active"),e&&e.classList.remove("cw-busy"),o.classList.remove("visible"),setTimeout(()=>o.remove(),a?200:320))}return function(){if(window._CW_ABORT_PROCESS||r)return;let p=Math.max(0,2e3-(Date.now()-i));setTimeout(()=>{if(window._CW_ABORT_PROCESS||r)return;w.stopThinking();let c=o.querySelector(".cw-center-dots"),m=o.querySelector(".cw-center-success");c&&c.classList.add("hidden"),n.classList.add("hidden"),m&&m.classList.add("show"),setTimeout(()=>{m&&m.classList.remove("show"),setTimeout(s,200)},850)},p)}}function sl(e){let{onSaveCurrent:t,onLoadDraft:a,t:o}=e,n=document.createElement("button");n.className="js-btn-park",n.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${o("guardar")}</span>
    `,n.style.cssText=`
        flex: 1 1 0;
        padding: 12px 0;
        margin-top: 24px;
        border-radius: ${pt.pill};
        font-size: 14px;
        font-weight: 700;
        background: ${J.surface};
        color: ${J.textSub};
        border: 1px solid ${J.border};
        cursor: pointer;
        display: flex; 
        align-items: center; 
        justify-content: center;
        gap: 8px;
        transition: background-color 0.2s ${Pe}, border-color 0.2s ${Pe}, color 0.2s ${Pe}, box-shadow 0.2s ${Pe}, transform 0.1s ${Pe};
        box-shadow: ${da.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `,n.onmouseenter=()=>{n.style.backgroundColor="#F8F9FA",n.style.borderColor="#202124",n.style.color="#202124",n.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)"},n.onmouseleave=()=>{n.style.backgroundColor="#FFFFFF",n.style.borderColor="#DADCE0",n.style.color="#5F6368",n.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)"},n.onmousedown=()=>n.style.transform="scale(0.96)",n.onmouseup=()=>n.style.transform="scale(1)",n.onclick=async()=>{if(await ot(o("confirmar_guardar_rascunho")))try{let C=await t();C?(Bt.save(C),L(),l(),w.playSuccess(),ne(o("rascunho_salvo_sucesso"))):(w.playError(),ne(o("erro_ler_dados"),{error:!0}))}catch(C){console.error("Erro ao salvar rascunho:",C),w.playError(),ne(o("erro_ao_salvar"),{error:!0})}};let i=document.createElement("div");i.className="js-history-btn",i.title=o("meus_rascunhos"),i.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",i.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#9AA0A6"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let r=i.querySelector("svg"),s=document.createElement("div");s.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",i.appendChild(s),i.onmouseenter=()=>i.style.background="rgba(0,0,0,0.05)",i.onmouseleave=()=>i.style.background="transparent",i.onclick=S=>{S.stopPropagation(),h()};function l(){let S=Bt.getCount();En(S>0),r.style.color=S>0?J.primary:"#9AA0A6",S>0?(s.style.display="block",s.textContent=S,window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||s.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):s.style.display="none"}let p=document.createElement("div");p.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${J.surface}; z-index: 100;
        border-radius: ${pt.large} ${pt.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${Pe};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;let c=document.createElement("div");c.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",c.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${o("rascunhos_salvos")}</span>`;let m=document.createElement("button");m.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',m.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",m.onmouseenter=()=>m.style.background="#F1F3F4",m.onmouseleave=()=>m.style.background="transparent",m.onclick=()=>h(!1),c.appendChild(m);let u=document.createElement("div");u.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",p.appendChild(c),p.appendChild(u);function h(S){let C=p.style.transform==="translateY(0%)";(S!==void 0?S:!C)?(L(),p.style.transform="translateY(0%)"):p.style.transform="translateY(110%)"}function L(){let S=Bt.getAll();if(u.innerHTML="",S.length===0){u.innerHTML=`
                <div style="text-align:center; padding:80px 20px; color:${J.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${o("nenhum_rascunho")}</div>
                </div>`;return}S.forEach(C=>{let D=document.createElement("div");D.style.cssText=`
                background: ${J.surface}; padding: 20px; border-radius: ${pt.large};
                border: 1.5px solid ${J.bgInput}; box-shadow: ${da.subtle};
                position: relative;
            `;let F=new Date(C.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),R="";C.summaryTags&&C.summaryTags.length>0&&(R=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${C.summaryTags.slice(0,3).join(", ")+(C.summaryTags.length>3?"...":"")}</div>`),D.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${C.clientName||o("cliente_sem_nome")}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${F}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${C.cid||"---"}</span>
                    <span style="display:block; color:${C.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${C.subStatus||C.status||o("sem_status")}</span>
                    ${R}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3);">
                        ${o("retomar_caso")}
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center;" title="${o("descartar")}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let le=D.querySelector(".cw-resume-btn");le.onclick=async()=>{await ot(o("retomar_rascunho_confirm"))&&(a(C),Bt.delete(C.id),L(),l(),h(!1),w.playSwoosh(),ne(o("rascunho_carregado")))};let te=D.querySelector(".cw-del-btn");te.onclick=async()=>{await ot(o("excluir_rascunho_confirm"),{danger:!0})&&(Bt.delete(C.id),L(),l())},u.appendChild(D)})}return l(),{parkButton:n,historyBtnWrapper:i,drawer:p}}var ll={pt:"Falha ao copiar",es:"Error al copiar",en:"Failed to copy"};function ta(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let a=document.createRange();a.selectNodeContents(t);let o=window.getSelection();o.removeAllRanges(),o.addRange(a);try{document.execCommand("copy")}catch{w.playError(),ne(ll[ge()]||ll.pt,{error:!0})}o.removeAllRanges(),document.body.removeChild(t)}function Ca(e){["input","change","keydown","keyup"].forEach(a=>{let o=new Event(a,{bubbles:!0,cancelable:!0});e.dispatchEvent(o)})}function cl(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function Aa(){let e=cl(),t=e.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(r=>r.innerText.trim()==="description");if(o){let r=o.closest("material-fab")||o.closest("material-button");r?(r.style&&(r.style.display="block",r.style.visibility="visible"),At(r)):At(o)}else{let r=document.querySelector("material-fab-speed-dial");if(r){let s=r.querySelector(".trigger");s?(s.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),At(s)):r.click(),await Ne(800);let p=Array.from(document.querySelectorAll("i.material-icons-extended")).find(c=>c.innerText.trim()==="description");p&&At(p)}}let n=null,i=0;for(;!n&&i<20;){await Ne(300);let r=cl();if(r.length>t)n=r.find(s=>!e.includes(s)),n||(n=r[r.length-1]);else if(i>10){let s=r.filter(l=>l.offsetParent!==null);s.length>0&&(n=s[s.length-1])}i++}return n}var dl={pt:{back:"Voltar",generateNote:"Gerar Nota",sopBefore:"Certifique-se de consultar o",sopAfter:"antes de transferir.",autoFill:"Auto-Preencher Dados da P\xE1gina",fetchingData:"Buscando dados...",technicalData:"Dados T\xE9cnicos",contactAndIssue:"Contato & Problema",ccCopies:"C\xF3pias (CC)",describeIssuePlaceholder:"Descreva o erro, passos para reproduzir...",whatTestedPlaceholder:"O que voc\xEA j\xE1 testou?",fieldsFilledToast:e=>`${e} campos preenchidos!`,noNewDataToast:"Nenhum dado novo encontrado.",readPageErrorToast:"Erro ao ler p\xE1gina.",fillRequiredToast:"Preencha os campos obrigat\xF3rios.",noteGeneratedToast:"Nota gerada e inserida!",copiedOpenNoteToast:"Copiado! Abra uma nota para colar."},es:{back:"Volver",generateNote:"Generar Nota",sopBefore:"Aseg\xFArate de consultar el",sopAfter:"antes de transferir.",autoFill:"Autocompletar Datos de la P\xE1gina",fetchingData:"Buscando datos...",technicalData:"Datos T\xE9cnicos",contactAndIssue:"Contacto y Problema",ccCopies:"Copias (CC)",describeIssuePlaceholder:"Describe el error, pasos para reproducirlo...",whatTestedPlaceholder:"\xBFQu\xE9 ya probaste?",fieldsFilledToast:e=>`\xA1${e} campos completados!`,noNewDataToast:"No se encontraron datos nuevos.",readPageErrorToast:"Error al leer la p\xE1gina.",fillRequiredToast:"Completa los campos obligatorios.",noteGeneratedToast:"\xA1Nota generada e insertada!",copiedOpenNoteToast:"\xA1Copiado! Abre una nota para pegar."},en:{back:"Back",generateNote:"Generate Note",sopBefore:"Make sure to check the",sopAfter:"before transferring.",autoFill:"Auto-Fill Page Data",fetchingData:"Fetching data...",technicalData:"Technical Data",contactAndIssue:"Contact & Issue",ccCopies:"Copies (CC)",describeIssuePlaceholder:"Describe the error, steps to reproduce...",whatTestedPlaceholder:"What have you already tested?",fieldsFilledToast:e=>`${e} fields filled in!`,noNewDataToast:"No new data found.",readPageErrorToast:"Error reading the page.",fillRequiredToast:"Fill in the required fields.",noteGeneratedToast:"Note generated and inserted!",copiedOpenNoteToast:"Copied! Open a note to paste it."}};function Dt(e){let t=ge();return dl[t]?.[e]??dl.pt[e]}function Tn(e){let t=[];function a($){$(),t.push($)}let o=document.createElement("div");o.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let n=document.createElement("div");n.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let i=document.createElement("div");i.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",o.appendChild(i),o.appendChild(n),n.addEventListener("scroll",()=>{i.style.boxShadow=n.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let r={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},s={};function l({id:$,label:A,type:y="text",placeholder:z="",required:U=!1,autocomplete:M="",parent:Z=n}){let de=document.createElement("div");de.style.cssText=r.inputWrapper;let ve=document.createElement("label");ve.setAttribute("for",$),ve.style.cssText=r.label,ve.innerHTML=`${A} ${U?'<span style="color:#D93025">*</span>':""}`;let re;return y==="textarea"?(re=document.createElement("textarea"),re.style.cssText=r.input+r.textarea):(re=document.createElement("input"),re.type=y,re.style.cssText=r.input),re.id=$,re.placeholder=z,M&&re.setAttribute("autocomplete",M),re.addEventListener("focus",()=>{re.style.borderColor="#1a73e8",re.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),re.addEventListener("blur",()=>{re.style.borderColor="#DADCE0",re.style.boxShadow="none",U&&re.value.trim()!==""&&(re.style.backgroundColor="#FFF")}),s[$]={input:re,wrapper:de,required:U},de.appendChild(ve),de.appendChild(re),y!=="textarea"&&gn(re),Z.appendChild(de),de}function p({id:$,label:A,options:y=["Yes","No"],defaultValue:z="No",onChange:U=null}){let M=document.createElement("div");M.style.cssText=r.inputWrapper;let Z=document.createElement("label");Z.style.cssText=r.label,Z.textContent=A,M.appendChild(Z);let de=document.createElement("div");de.style.cssText=r.radioGroup;let ve=document.createElement("input");return ve.type="hidden",ve.id=$,ve.value=z,M.appendChild(ve),y.forEach(re=>{let be=document.createElement("div");be.textContent=re,be.style.cssText=r.radioLabel,re===z&&(be.style.cssText+=r.radioActive),be.onclick=()=>{Array.from(de.children).forEach(he=>he.style.cssText=r.radioLabel),be.style.cssText+=r.radioActive,ve.value=re,U&&U(re)},de.appendChild(be)}),s[$]={input:ve,wrapper:M,required:!1},M.appendChild(de),n.appendChild(M),M}let c=document.createElement("div");c.style.cssText=r.banner,a(()=>{c.innerHTML=`
            <span>\u26A0\uFE0F</span>
            <div>
                <b>Out of Scope Check:</b><br>
                ${Dt("sopBefore")} <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> ${Dt("sopAfter")}
            </div>
        `}),n.appendChild(c);let m=document.createElement("div");m.style.marginBottom="24px";let u=document.createElement("button"),h=()=>{u.innerHTML=`\u2728 &nbsp; ${Dt("autoFill")}`};a(h),u.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",u.onmouseover=()=>u.style.background="#E1EFFF",u.onmouseout=()=>u.style.background="#F0F7FF",m.appendChild(u),n.appendChild(m);function L($,A,y){let z=document.createElement("div");z.style.cssText=r.sectionTitle,a(()=>{z.textContent=`${A} ${Dt(y)}`}),$.appendChild(z)}let S=document.createElement("div");S.style.cssText=r.section,L(S,"\u{1F6E0}\uFE0F","technicalData"),n.appendChild(S),l({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:S}),l({id:"ga4",label:"GA4 Property ID",parent:S}),l({id:"gtm",label:"GTM Container ID",parent:S});let C=document.createElement("div");C.style.cssText=r.hiddenField,S.appendChild(C),p({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:$=>{$==="Yes"?C.style.cssText=r.visibleField+"margin-bottom:14px;":(C.style.cssText=r.hiddenField,s.accessEmail.input.value="")}}),l({id:"accessEmail",label:"User Access Email",parent:C}),p({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let D=document.createElement("div");D.style.cssText=r.section,L(D,"\u{1F4DE}","contactAndIssue"),n.appendChild(D),l({id:"name",label:"Advertiser Name",required:!0,autocomplete:"name",parent:D}),l({id:"url",label:"Website URL",type:"url",autocomplete:"url",parent:D}),l({id:"phone",label:"Phone Number",type:"tel",autocomplete:"tel",parent:D}),l({id:"email",label:"Contact Email",type:"email",autocomplete:"email",parent:D}),l({id:"callback",label:"Preferred Callback Time (Timezone)",parent:D}),l({id:"desc",label:"Detailed Issue Description",type:"textarea",required:!0,parent:D}),l({id:"checks",label:"Troubleshooting Performed",type:"textarea",parent:D}),a(()=>{s.desc.input.placeholder=Dt("describeIssuePlaceholder"),s.checks.input.placeholder=Dt("whatTestedPlaceholder")}),l({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:D});let G=document.createElement("div");G.style.cssText=r.section,L(G,"\u{1F4E7}","ccCopies"),n.appendChild(G),l({id:"cc_adv",label:"Advertiser Contact",parent:G}),l({id:"cc_am",label:"Account Manager",parent:G});let F=document.createElement("div");F.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let R=document.createElement("button");a(()=>{R.textContent=Dt("back")}),R.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",R.onclick=e;let le=document.createElement("button");a(()=>{le.textContent=Dt("generateNote")}),le.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",F.appendChild(R),F.appendChild(le),o.appendChild(F),u.onclick=async()=>{u.innerHTML=`\u23F3 ${Dt("fetchingData")}`;try{let $=await Ut(),A=0,y=(M,Z)=>{let de=s[M];Z&&de&&de.input.value===""&&(de.input.value=Z,de.input.style.backgroundColor="#E6F4EA",de.input.style.borderColor="#34A853",setTimeout(()=>{de.input.style.backgroundColor="#FFF",de.input.style.borderColor="#DADCE0"},1e3),A++)};y("name",$.advertiserName),y("url",$.websiteUrl),$.clientEmail&&(y("email",$.clientEmail),y("cc_adv",$.clientEmail));let U=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);U&&y("cid",U[0]),A>0?ne(Dt("fieldsFilledToast")(A)):ne(Dt("noNewDataToast"))}catch($){console.error($),ne(Dt("readPageErrorToast"))}finally{h()}};let te=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,ee=()=>{let $=!0,A=null,y=te();return Object.values(s).forEach(z=>{z.required&&!z.input.value.trim()&&($=!1,z.input.style.cssText+=r.inputError,y||z.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),A||(A=z.input))}),A&&A.scrollIntoView({behavior:y?"auto":"smooth",block:"center"}),$};return le.onclick=async()=>{if(!ee()){w.playError(),ne(Dt("fillRequiredToast"),{error:!0});return}let $=Z=>s[Z].input.value||"N/A",A=$("hasAccess"),y=A==="Yes"?$("accessEmail"):"N/A",U=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${$("cid")}
<b>GA4 ID:</b> ${$("ga4")}
<b>GTM ID:</b> ${$("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${A==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${y}
<b>Ghosting Access Available (Y/N):</b> ${$("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${$("name")}
<b>Website:</b> ${$("url")}
<b>Phone Number:</b> ${$("phone")}
<b>Preferred Callback:</b> ${$("callback")}
<b>Email Address:</b> ${$("email")}

<b>Detailed Issue Description:</b>
${$("desc")}

<b>Uncropped screenshots:</b>
${$("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${$("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${$("cc_adv")}
<b>Account Manager:</b> ${$("cc_am")}
`.replace(/\n/g,"<br>");ta(U);let M=await Aa();M?(M.innerText.trim()===""&&(M.innerHTML=""),document.execCommand("insertHTML",!1,U),Ca(M),w.playSuccess(),ne(Dt("noteGeneratedToast"))):ne(Dt("copiedOpenNoteToast"))},je(()=>t.forEach($=>$())),o}var Ho="shortcuts",pl="shortcutsSortByUsage",gl="cw_shortcut_usage_v1",ua=8,zu=[{id:"sc_default_ni_attempted",kind:"note",payload:{caseType:"bau",status:"NI",subStatus:"NI_Attempted_Contact",scenarios:[{id:"quickfill-ni-attempted-2day",substatus:"NI_Attempted_Contact"}]}},{id:"sc_default_in_not_reachable",kind:"note",payload:{caseType:"bau",status:"IN",subStatus:"IN_Not_Reachable",scenarios:[{id:"quickfill-in-no-show-bau",substatus:"IN_Not_Reachable"}]}}],ul={sc_default_ni_attempted:{pt:{label:"NI Attempted \u2014 In\xEDcio 2 Day Rule",alias:"2day inicio"},es:{label:"NI Attempted \u2014 Inicio 2 Day Rule",alias:"2day inicio"},en:{label:"NI Attempted \u2014 2 Day Rule (Start)",alias:"2day start"}},sc_default_in_not_reachable:{pt:{label:"IN Not Reachable \u2014 Finaliza\xE7\xE3o 2 Day Rule",alias:"2day fim"},es:{label:"IN Not Reachable \u2014 Cierre 2 Day Rule",alias:"2day cierre"},en:{label:"IN Not Reachable \u2014 2 Day Rule (End)",alias:"2day end"}}};function Uo(){return"sc_"+Date.now().toString(36)+Math.floor(Math.random()*1e3).toString(36)}function Pi(e){if(!e||!e.id)return null;if(_t[e.id])return e.id;let t=Sa(e.id,e.substatus),a=Object.entries(_t),o=a.find(([i,r])=>Sa(i,e.substatus)===t&&Array.isArray(r.substatus)&&r.substatus.includes(e.substatus));if(o)return o[0];let n=a.find(([i])=>Sa(i,e.substatus)===t);return n?n[0]:null}function fl(e){return(e.payload&&e.payload.scenarios||[]).filter(a=>!Pi(a)).map(a=>a.id)}function ml(){try{return JSON.parse(localStorage.getItem(gl)||"{}")}catch{return{}}}function $i(e){return Array.isArray(e)?e.filter(t=>t&&t.id&&t.payload&&t.payload.subStatus).map((t,a)=>({id:t.id,kind:t.kind||"note",label:String(t.label||"Atalho"),alias:String(t.alias||""),order:Number.isFinite(t.order)?t.order:a,payload:{caseType:t.payload.caseType||"bau",status:t.payload.status||String(t.payload.subStatus).split("_")[0],subStatus:t.payload.subStatus,scenarios:Array.isArray(t.payload.scenarios)?t.payload.scenarios.filter(o=>o&&o.id).map(o=>({id:o.id,substatus:o.substatus||t.payload.subStatus})):[]}})):[]}var lt={list(){let e=Ye.get(Ho,null),t=$i(e===null?lt.defaults():e),a=ml();return t.slice().sort((o,n)=>{if(lt.isSortedByUsage()){let i=(a[n.id]||0)-(a[o.id]||0);if(i)return i}return o.order-n.order})},listRaw(){let e=Ye.get(Ho,null);return $i(e===null?lt.defaults():e).sort((t,a)=>t.order-a.order)},defaults(){let e=ge();return zu.map((t,a)=>({...t,...ul[t.id][e]||ul[t.id].pt,order:a}))},isSortedByUsage(){return Ye.get(pl,!0)!==!1},setSortedByUsage(e){return Ye.set(pl,!!e)},async save(e){let t=lt.listRaw(),a=t.findIndex(i=>i.id===e.id);if(a===-1&&t.length>=ua)return{ok:!1,reason:"limit"};let o=$i([{...e,id:e.id||Uo()}])[0];return o?(a===-1?(o.order=t.length,t.push(o)):(o.order=t[a].order,t[a]=o),{ok:!0,synced:(await Ye.set(Ho,t)).synced,shortcut:o}):{ok:!1,reason:"invalid"}},async remove(e){let t=lt.listRaw().filter(a=>a.id!==e).map((a,o)=>({...a,order:o}));await Ye.set(Ho,t)},async reorder(e,t){let a=lt.listRaw(),o=a.findIndex(r=>r.id===e);if(o===-1)return;let[n]=a.splice(o,1),i=Math.max(0,Math.min(t,a.length));a.splice(i,0,n),await Ye.set(Ho,a.map((r,s)=>({...r,order:s})))},registerUse(e){try{let t=ml();t[e]=(t[e]||0)+1,localStorage.setItem(gl,JSON.stringify(t))}catch{}}};var Nn=[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",category:"Tentativas & Agendamento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",placeholders:[{key:"[Seu Nome]",label:"Seu Nome",type:"text",auto:"agentName"},{key:"[INSERIR URL]",label:"URL do Site",type:"text"},{key:"[LINK DO MEET]",label:"Link da Reuni\xE3o",type:"text"}],template:"<p>Ol\xE1,</p><br><p>Aqui \xE9 o <strong>[Seu Nome]</strong> da equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tentei ligar no seguinte n\xFAmero: <strong>...</strong> sem sucesso, teria outro n\xFAmero para que eu pudesse entrar em contato?</p><br><p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>Em seu site: <strong>[INSERIR URL]</strong></p><p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, voc\xEA pode acessar o link da nossa reuni\xE3o: <strong>[LINK DO MEET]</strong></p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"reschedule2",name:"Proposta de Reagendamento",category:"Tentativas & Agendamento",subject:"Reagendamento de Consultoria",placeholders:[{key:"[DATA 1]",label:"Data 1",type:"text"},{key:"[HORA 1]",label:"Hora 1",type:"text"},{key:"[DATA 2]",label:"Data 2",type:"text"},{key:"[HORA 2]",label:"Hora 2",type:"text"},{key:"[DATA 3]",label:"Data 3",type:"text"},{key:"[HORA 3]",label:"Hora 3",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p><ul><li><strong>[DATA 1] \xE0s [HORA 1]</strong></li><li><strong>[DATA 2] \xE0s [HORA 2]</strong></li><li><strong>[DATA 3] \xE0s [HORA 3]</strong></li></ul><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email nas pr\xF3ximas 48 horas o caso ser\xE1 encerrado.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"max_reschedules",name:"Limite de Reagendamentos Excedido",category:"Tentativas & Agendamento",subject:"Status do Agendamento - Time de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este e-mail o encontre bem.</p><p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementa\xE7\xE3o das tags.</p><br><p>Infelizmente, <strong>n\xE3o podemos mais reagendar este caso espec\xEDfico</strong>, pois excedemos o limite m\xE1ximo de agendamentos permitido.</p><br><p>Se voc\xEA deseja prosseguir com a implementa\xE7\xE3o das tags, ser\xE1 necess\xE1rio abrir um <strong>novo caso</strong> diretamente com a <a href="https://support.google.com/google-ads">Ajuda do Google Ads</a>. Isso garantir\xE1 que voc\xEA receba o acompanhamento e o suporte necess\xE1rio para dar continuidade \xE0 sua solicita\xE7\xE3o.</p><br><p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colabora\xE7\xE3o.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"2_6_day3",name:"Dia 3 (Acompanhamento)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]",label:"A\xE7\xE3o Pendente",type:"text"},{key:"[MM/DD/YYYY]",label:"Data do Pr\xF3ximo Contato",type:"date"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Tentamos contato atrav\xE9s do N\xFAmero de Telefone, por\xE9m sem sucesso. Gostaria de saber se voc\xEA j\xE1 conseguiu <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, ou se voc\xEA j\xE1 possui uma previs\xE3o de quando essa a\xE7\xE3o ser\xE1 conclu\xEDda.</p><br><p>Continuarei monitorando o status da implementa\xE7\xE3o no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementa\xE7\xE3o.</p><p>Se voc\xEA tiver algum problema ou d\xFAvidas que impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_day6",name:"Dia 6 (Acompanhamento Final)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[URL]",label:"URL do Site",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Ap\xF3s an\xE1lise e revis\xE3o do status de implementa\xE7\xE3o da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda est\xE1 com a implementa\xE7\xE3o pendente. Tentamos contato atrav\xE9s do email, por\xE9m sem sucesso.</p><br><p>\xC9 essencial que seja implementado, pois ele oferece uma ampla gama de benef\xEDcios, como:</p><ul><li>Ajuda a rastrear convers\xF5es em tempo real</li><li>Melhora a gera\xE7\xE3o de receita, em termos de cliques</li><li>Serve para vincular o Google Analytics e os an\xFAncios e acompanhar convers\xF5es</li><li>Fornece informa\xE7\xF5es sobre a experi\xEAncia do usu\xE1rio</li></ul><br><p>Se voc\xEA tiver algum problema ou d\xFAvidas que o impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco. Teremos o maior prazer em ajudar.</p><p>Caso n\xE3o tenhamos nenhuma resposta nos pr\xF3ximos 3 dias, infelizmente o caso ser\xE1 encerrado.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_completed_reschedule",name:"A\xE7\xF5es Conclu\xEDdas (Solicitar Reagendamento)",category:"Follow Up",subject:"Continuidade da Implementa\xE7\xE3o - Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Disponibilidade em BAU]",label:"Pr\xF3xima Disponibilidade",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Maravilha! Muito bom saber que conseguiu concluir as a\xE7\xF5es pendentes. Sendo assim, agora podemos continuar com a implementa\xE7\xE3o das configura\xE7\xF5es em sua conta.</p><br><p>Para isso, pe\xE7o, por favor, que me envie algumas das pr\xF3ximas datas e hor\xE1rios em que est\xE1 dispon\xEDvel a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p><p>Assim que me enviar essa informa\xE7\xE3o, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"nrp_standard",name:"NRP - Padr\xE3o (3\xAA Tentativa)",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Task pedida pelo AM]",label:"Task Solicitada",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reuni\xE3o.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"nrp_dfa",name:"NRP - DFA",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'}],vl={attempt_10min:{name:"Intento de Contacto (Antes de los 10min)",category:"Intentos y Programaci\xF3n",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Intento de Contacto",labels:{"[Seu Nome]":"Tu Nombre","[INSERIR URL]":"URL del Sitio","[LINK DO MEET]":"Enlace de la Reuni\xF3n"},template:"<p>Hola,</p><br><p>Le habla <strong>[Seu Nome]</strong> del equipo de Soluciones T\xE9cnicas de Google. Intent\xE9 llamar al siguiente n\xFAmero: <strong>...</strong> sin \xE9xito, \xBFtendr\xEDa otro n\xFAmero para que pueda ponerme en contacto?</p><br><p>Le recuerdo que voy a ayudarle a implementar la siguiente tarea:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>En su sitio: <strong>[INSERIR URL]</strong></p><p>Intentar\xE9 llamar nuevamente en 10 minutos; si lo prefiere, puede acceder al enlace de nuestra reuni\xF3n: <strong>[LINK DO MEET]</strong></p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},reschedule2:{name:"Propuesta de Reprogramaci\xF3n",category:"Intentos y Programaci\xF3n",subject:"Reprogramaci\xF3n de Consultor\xEDa",labels:{"[DATA 1]":"Fecha 1","[HORA 1]":"Hora 1","[DATA 2]":"Fecha 2","[HORA 2]":"Hora 2","[DATA 3]":"Fecha 3","[HORA 3]":"Hora 3","[Seu Nome]":"Firma"},template:"<p>Hola, \xBFc\xF3mo est\xE1?</p><br><p>Estas son las pr\xF3ximas fechas disponibles:</p><ul><li><strong>[DATA 1] a las [HORA 1]</strong></li><li><strong>[DATA 2] a las [HORA 2]</strong></li><li><strong>[DATA 3] a las [HORA 3]</strong></li></ul><br><p>Tambi\xE9n le informo que si no hay respuesta a este correo en las pr\xF3ximas 48 horas el caso ser\xE1 cerrado.</p><p>Le recuerdo que mi agenda es din\xE1mica, por lo que en cualquier momento se puede agendar una consultor\xEDa para los d\xEDas disponibles. Por lo tanto, cuanto m\xE1s r\xE1pido pueda responderme, m\xE1s garantizada ser\xE1 la programaci\xF3n de la fecha y el horario.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},max_reschedules:{name:"L\xEDmite de Reprogramaciones Excedido",category:"Intentos y Programaci\xF3n",subject:"Estado de la Programaci\xF3n - Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este correo le encuentre bien.</p><p>Le escribo en nombre del equipo de Google Ads para informarle sobre su solicitud de reprogramaci\xF3n para la implementaci\xF3n de las etiquetas.</p><br><p>Lamentablemente, <strong>ya no podemos reprogramar este caso espec\xEDfico</strong>, pues hemos excedido el l\xEDmite m\xE1ximo de programaciones permitido.</p><br><p>Si desea continuar con la implementaci\xF3n de las etiquetas, ser\xE1 necesario abrir un <strong>nuevo caso</strong> directamente con la <a href="https://support.google.com/google-ads">Ayuda de Google Ads</a>. Esto garantizar\xE1 que reciba el seguimiento y el soporte necesarios para dar continuidad a su solicitud.</p><br><p>Agradecemos su participaci\xF3n en este proceso y la oportunidad de ayudar. Esperamos continuar nuestra colaboraci\xF3n.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'},"2_6_day3":{name:"D\xEDa 3 (Seguimiento)",category:"Follow Up",subject:"Consultor\xEDa con el Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]":"Acci\xF3n Pendiente","[MM/DD/YYYY]":"Fecha del Pr\xF3ximo Contacto","[Seu Nome]":"Firma"},template:"<p>Hola, <strong>[Nome do Cliente]</strong></p><br><p>\xA1Espero que se encuentre bien!</p><p>Intentamos contactarle por tel\xE9fono, pero sin \xE9xito. Me gustar\xEDa saber si ya pudo <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, o si ya tiene una previsi\xF3n de cu\xE1ndo se concluir\xE1 esa acci\xF3n.</p><br><p>Continuar\xE9 monitoreando el estado de la implementaci\xF3n en su sitio, y el d\xEDa <strong>[MM/DD/YYYY]</strong> har\xE9 un nuevo seguimiento para verificar el avance de la implementaci\xF3n.</p><p>Si tiene alg\xFAn problema o duda que le impida realizar la implementaci\xF3n, no dude en compartirlo con nosotros.</p><br><p>Quedo a disposici\xF3n.</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>"},"2_6_day6":{name:"D\xEDa 6 (Seguimiento Final)",category:"Follow Up",subject:"Consultor\xEDa con el Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[URL]":"URL del Sitio","[Seu Nome]":"Firma"},template:"<p>Hola, <strong>[Nome do Cliente]</strong></p><br><p>\xA1Espero que se encuentre bien!</p><p>Tras analizar y revisar el estado de implementaci\xF3n de la etiqueta en su sitio, <strong>[URL]</strong>, verificamos que la etiqueta a\xFAn est\xE1 pendiente de implementaci\xF3n. Intentamos contactarle por correo, pero sin \xE9xito.</p><br><p>Es esencial que sea implementada, pues ofrece una amplia gama de beneficios, como:</p><ul><li>Ayuda a rastrear conversiones en tiempo real</li><li>Mejora la generaci\xF3n de ingresos, en t\xE9rminos de clics</li><li>Sirve para vincular Google Analytics con los anuncios y hacer seguimiento de las conversiones</li><li>Proporciona informaci\xF3n sobre la experiencia del usuario</li></ul><br><p>Si tiene alg\xFAn problema o duda que le impida realizar la implementaci\xF3n, no dude en compartirlo con nosotros. Estaremos encantados de ayudar.</p><p>Si no recibimos ninguna respuesta en los pr\xF3ximos 3 d\xEDas, lamentablemente el caso ser\xE1 cerrado.</p><br><p>Quedo a disposici\xF3n.</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>"},"2_6_completed_reschedule":{name:"Acciones Concluidas (Solicitar Reprogramaci\xF3n)",category:"Follow Up",subject:"Continuidad de la Implementaci\xF3n - Soluciones T\xE9cnicas de Google",labels:{"[Disponibilidade em BAU]":"Pr\xF3xima Disponibilidad","[Seu Nome]":"Firma"},template:"<p>Hola, \xBFc\xF3mo est\xE1?</p><br><p>\xA1Excelente! Muy bueno saber que logr\xF3 concluir las acciones pendientes. Siendo as\xED, ahora podemos continuar con la implementaci\xF3n de las configuraciones en su cuenta.</p><br><p>Para eso, le pido, por favor, que me env\xEDe algunas de las pr\xF3ximas fechas y horarios en los que est\xE9 disponible a partir del d\xEDa <strong>[Disponibilidade em BAU]</strong>.</p><p>En cuanto me env\xEDe esa informaci\xF3n, crear\xE9 una reprogramaci\xF3n para que uno de nuestros agentes contin\xFAe ayud\xE1ndole.</p><br><p>Tambi\xE9n le informo que si no hay respuesta a este correo, realizar\xE9 un seguimiento de este caso durante 6 d\xEDas, en el que me pondr\xE9 en contacto cada 3 d\xEDas para intentar reprogramar su caso lo antes posible.</p><p>Le recuerdo que mi agenda es din\xE1mica, por lo que en cualquier momento se puede agendar una consultor\xEDa para los d\xEDas disponibles. Por lo tanto, cuanto m\xE1s r\xE1pido pueda responderme, m\xE1s garantizada ser\xE1 la programaci\xF3n de la fecha y el horario.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},nrp_standard:{name:"NRP - Est\xE1ndar (3.\xBA Intento)",category:"NRP / Cierre",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Cierre",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Task pedida pelo AM]":"Tarea Solicitada","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Intentamos llamarle hoy sobre el caso de Implementaci\xF3n de la etiqueta referente a la solicitud de <strong>[Task pedida pelo AM]</strong>. Se hizo otro intento despu\xE9s de 10 minutos, pero tampoco logramos contactarle.</p><p>Debido a la alta demanda, no podemos reprogramar un horario. Por eso, vamos a cerrar este caso. Sin embargo, si a\xFAn desea continuar con la implementaci\xF3n, basta con acceder a este enlace y elegir la mejor fecha y horario para hablar con nuestro equipo, o si lo prefiere, p\xF3ngase en contacto con su gerente de cuentas de Google para agendar una nueva reuni\xF3n.</p><p>Lamentamos el inconveniente y esperamos trabajar con usted nuevamente en el futuro.</p><br><p>Si desea saber m\xE1s, consulte a continuaci\xF3n algunos enlaces \xFAtiles con recursos valiosos relacionados con la implementaci\xF3n de etiquetas y el soporte de Shopping.</p><p><strong>En relaci\xF3n con las etiquetas</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Soporte para la implementaci\xF3n de etiquetas</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>En relaci\xF3n con Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">C\xF3mo configurar la cuenta y el feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Optimizaci\xF3n del feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'},nrp_dfa:{name:"NRP - DFA",category:"NRP / Cierre",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Cierre",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Intentamos llamarle hoy sobre el caso de Implementaci\xF3n de la etiqueta referente a la solicitud. Se hizo otro intento despu\xE9s de 10 minutos, pero tampoco logramos contactarle.</p><p>Debido a la alta demanda, no podemos reprogramar un horario. Por eso, vamos a cerrar este caso. Sin embargo, si a\xFAn desea continuar con la implementaci\xF3n, basta con acceder a este enlace y elegir la mejor fecha y horario para hablar con nuestro equipo.</p><p>Lamentamos el inconveniente y esperamos trabajar con usted nuevamente en el futuro.</p><br><p>Si desea saber m\xE1s, consulte a continuaci\xF3n algunos enlaces \xFAtiles con recursos valiosos relacionados con la implementaci\xF3n de etiquetas y el soporte de Shopping.</p><p><strong>En relaci\xF3n con las etiquetas</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Soporte para la implementaci\xF3n de etiquetas</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>En relaci\xF3n con Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">C\xF3mo configurar la cuenta y el feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Optimizaci\xF3n del feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'}},xl={attempt_10min:{name:"Contact Attempt (Before the 10min)",category:"Attempts & Scheduling",subject:"Implementation with the Google Technical Solutions Team - Contact Attempt",labels:{"[Seu Nome]":"Signature","[INSERIR URL]":"Site URL","[LINK DO MEET]":"Meet Link"},template:"<p>Hello,</p><br><p>This is <strong>[Seu Nome]</strong> from the Google Technical Solutions team. I tried calling the following number: <strong>...</strong> without success. Would you have another number I could reach you on?</p><br><p>As a reminder, I will be helping you implement the following task:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>On your site: <strong>[INSERIR URL]</strong></p><p>I will try calling again within 10 minutes. If you prefer, you can join our meeting link: <strong>[LINK DO MEET]</strong></p><br><p>Best regards,</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google.</p>"},reschedule2:{name:"Rescheduling Proposal",category:"Attempts & Scheduling",subject:"Consultation Rescheduling",labels:{"[DATA 1]":"Date 1","[HORA 1]":"Time 1","[DATA 2]":"Date 2","[HORA 2]":"Time 2","[DATA 3]":"Date 3","[HORA 3]":"Time 3","[Seu Nome]":"Signature"},template:"<p>Hello, how are you?</p><br><p>Here are the next available dates:</p><ul><li><strong>[DATA 1] at [HORA 1]</strong></li><li><strong>[DATA 2] at [HORA 2]</strong></li><li><strong>[DATA 3] at [HORA 3]</strong></li></ul><br><p>Please note that if there is no reply to this email within the next 48 hours, the case will be closed.</p><p>My calendar is dynamic, so a consultation can be booked for the available days at any time. The sooner you can reply, the more likely it is that the date and time will be secured.</p><br><p>Best regards,</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google.</p>"},max_reschedules:{name:"Rescheduling Limit Exceeded",category:"Attempts & Scheduling",subject:"Scheduling Status - Google Technical Solutions Team",labels:{"[Nome do Cliente]":"Customer Name","[Seu Nome]":"Signature"},template:'<p>Hello, <strong>[Nome do Cliente]</strong>,</p><br><p>I hope this email finds you well.</p><p>I am writing on behalf of the Google Ads team regarding your rescheduling request for the tag implementation.</p><br><p>Unfortunately, <strong>we can no longer reschedule this particular case</strong>, as we have exceeded the maximum number of bookings allowed.</p><br><p>If you would like to proceed with the tag implementation, you will need to open a <strong>new case</strong> directly with <a href="https://support.google.com/google-ads">Google Ads Help</a>. That will ensure you receive the follow-up and support needed to continue with your request.</p><br><p>Thank you for your involvement in this process and for the opportunity to help. We look forward to continuing our collaboration.</p><br><p>Best regards,</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google</p>'},"2_6_day3":{name:"Day 3 (Follow-up)",category:"Follow Up",subject:"Consultation with the Google Technical Solutions Team",labels:{"[Nome do Cliente]":"Customer Name","[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]":"Pending Action","[MM/DD/YYYY]":"Next Contact Date","[Seu Nome]":"Signature"},template:"<p>Hello, <strong>[Nome do Cliente]</strong></p><br><p>I hope you are well!</p><p>We tried to reach you by phone, but without success. I would like to know whether you have been able to <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, or whether you have an estimate of when that action will be completed.</p><br><p>I will keep monitoring the implementation status on your site, and on <strong>[MM/DD/YYYY]</strong> I will follow up again to check on its progress.</p><p>If you run into any problem or question that prevents you from completing the implementation, please feel free to share it with us.</p><br><p>I remain at your disposal.</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google</p>"},"2_6_day6":{name:"Day 6 (Final Follow-up)",category:"Follow Up",subject:"Consultation with the Google Technical Solutions Team",labels:{"[Nome do Cliente]":"Customer Name","[URL]":"Site URL","[Seu Nome]":"Signature"},template:"<p>Hello, <strong>[Nome do Cliente]</strong></p><br><p>I hope you are well!</p><p>After analyzing and reviewing the tag implementation status on your site, <strong>[URL]</strong>, we found that the tag is still pending implementation. We tried to reach you by email, but without success.</p><br><p>Implementing it is essential, as it offers a wide range of benefits, such as:</p><ul><li>It helps track conversions in real time</li><li>It improves revenue generation, in terms of clicks</li><li>It links Google Analytics to your ads and tracks conversions</li><li>It provides insight into the user experience</li></ul><br><p>If you run into any problem or question that prevents you from completing the implementation, please feel free to share it with us. We would be glad to help.</p><p>If we do not hear back within the next 3 days, the case will unfortunately be closed.</p><br><p>I remain at your disposal.</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google</p>"},"2_6_completed_reschedule":{name:"Actions Completed (Request Rescheduling)",category:"Follow Up",subject:"Continuing the Implementation - Google Technical Solutions",labels:{"[Disponibilidade em BAU]":"Next Availability","[Seu Nome]":"Signature"},template:"<p>Hello, how are you?</p><br><p>Great! Good to hear you managed to complete the pending actions. That means we can now continue with the setup on your account.</p><br><p>For that, please send me a few of the next dates and times you are available from <strong>[Disponibilidade em BAU]</strong> onwards.</p><p>As soon as you send that over, I will create a rescheduling so one of our agents can continue helping you.</p><br><p>Please also note that if there is no reply to this email, I will follow up on this case for 6 days, getting in touch every 3 days so we can reschedule your case as soon as possible.</p><p>My calendar is dynamic, so a consultation can be booked for the available days at any time. The sooner you can reply, the more likely it is that the date and time will be secured.</p><br><p>Best regards,</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google.</p>"},nrp_standard:{name:"NRP - Standard (3rd Attempt)",category:"NRP / Closure",subject:"Implementation with the Google Technical Solutions Team - Closure",labels:{"[Nome do Cliente]":"Customer Name","[Task pedida pelo AM]":"Requested Task","[Seu Nome]":"Signature"},template:'<p>Hello, <strong>[Nome do Cliente]</strong>,</p><br><p>We tried to call you today about the tag Implementation case regarding the request for <strong>[Task pedida pelo AM]</strong>. Another attempt was made after 10 minutes, but we were unable to reach you then either.</p><p>Due to high demand, we are unable to reschedule a time. We will therefore be closing this case. However, if you would still like to continue with the implementation, you can use this link to pick the best date and time to speak with our team, or if you prefer, contact your Google account manager to book a new meeting.</p><p>We apologize for the inconvenience and hope to work with you again in the future.</p><br><p>If you would like to know more, below are some useful links with valuable resources about tag implementation and Shopping support.</p><p><strong>Regarding tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Tag implementation support</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Regarding Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">How to set up the account and the feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Feed optimization</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google platforms</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google</p>'},nrp_dfa:{name:"NRP - DFA",category:"NRP / Closure",subject:"Implementation with the Google Technical Solutions Team - Closure",labels:{"[Nome do Cliente]":"Customer Name","[Seu Nome]":"Signature"},template:'<p>Hello, <strong>[Nome do Cliente]</strong>,</p><br><p>We tried to call you today about the tag Implementation case regarding the request. Another attempt was made after 10 minutes, but we were unable to reach you then either.</p><p>Due to high demand, we are unable to reschedule a time. We will therefore be closing this case. However, if you would still like to continue with the implementation, you can use this link to pick the best date and time to speak with our team.</p><p>We apologize for the inconvenience and hope to work with you again in the future.</p><br><p>If you would like to know more, below are some useful links with valuable resources about tag implementation and Shopping support.</p><p><strong>Regarding tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Tag implementation support</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Regarding Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">How to set up the account and the feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Feed optimization</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google platforms</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google</p>'}},bl={pt:"pt-BR",es:"es-ES",en:"en-US"};function wl(e,t){return e.toLocaleDateString(bl[t]||bl.pt,{year:"numeric",month:"2-digit",day:"2-digit"})}function yl(e,t){let a={es:vl,en:xl}[t];if(!a)return e;let o=a[e?.id];return o?{...e,name:o.name??e.name,category:o.category??e.category,subject:o.subject??e.subject,template:o.template??e.template,placeholders:(e.placeholders||[]).map(n=>({...n,label:o.labels?.[n.key]??n.label}))}:e}function hl(e){if(!Array.isArray(e)||!e.length)return!1;let t=e.slice().sort((n,i)=>(n.sortOrder||0)-(i.sortOrder||0)),a=[],o={ES:{},EN:{}};for(let n of t){let i=n.key;if(!i)continue;let r;try{r=JSON.parse(n.value||"{}")}catch{continue}if(!r.subject||!r.template)continue;let s=String(n.lang||"").toUpperCase(),l=o[s];l?l[i]={name:n.label||"",category:n.field||"",subject:r.subject,template:r.template,labels:r.labels||{}}:(s==="PT"||s===""||s==="ALL")&&a.push({id:i,name:n.label||i,category:n.field||"",subject:r.subject,template:r.template,placeholders:r.placeholders||[]})}if(!a.length)return!1;Nn.length=0,Nn.push(...a);for(let[n,i]of[["ES",vl],["EN",xl]])if(Object.keys(o[n]).length){for(let r of Object.keys(i))delete i[r];Object.assign(i,o[n])}return!0}async function Sl(){let e=ke.getCachedContent("email_template"),t=hl(e);try{let a=await ke.fetchContentModule("email_template");t=hl(a)||t}catch(a){console.warn("Central de Conte\xFAdo indispon\xEDvel; usando modelos embutidos.",a)}return t}var In={pt:{emailButtonNotFound:"Erro: Bot\xE3o de email n\xE3o encontrado.",clearingOldDraft:"Limpando rascunho antigo...",editorNotLoaded:"Erro: Editor n\xE3o carregou.",cannedResponseApplied:"Canned Response aplicada!",cannedResponseTimeout:e=>`Timeout: Template '${e}' n\xE3o carregou.`,cannedResponseButtonNotFound:"Bot\xE3o Canned Response n\xE3o encontrado.",emailFilledSuccess:"Email preenchido com sucesso!",editorFocusError:"Erro ao focar no editor.",verifyEmailWarning:"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente.",amCcWarning:"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.",fallbackClient:"Cliente",fallbackSite:"seu site"},es:{emailButtonNotFound:"Error: Bot\xF3n de email no encontrado.",clearingOldDraft:"Limpiando borrador antiguo...",editorNotLoaded:"Error: El editor no carg\xF3.",cannedResponseApplied:"\xA1Canned Response aplicada!",cannedResponseTimeout:e=>`Tiempo agotado: la plantilla '${e}' no carg\xF3.`,cannedResponseButtonNotFound:"Bot\xF3n Canned Response no encontrado.",emailFilledSuccess:"\xA1Email completado con \xE9xito!",editorFocusError:"Error al enfocar el editor.",verifyEmailWarning:"<strong>Verifica el correo:</strong> El CRM puede traducir los caracteres de forma incorrecta.",amCcWarning:"<strong>Atenci\xF3n:</strong> Verifica si el correo del AM debe ir en copia.",fallbackClient:"Cliente",fallbackSite:"su sitio"},en:{emailButtonNotFound:"Error: email button not found.",clearingOldDraft:"Clearing the old draft...",editorNotLoaded:"Error: the editor did not load.",cannedResponseApplied:"Canned Response applied!",cannedResponseTimeout:e=>`Timed out: template '${e}' did not load.`,cannedResponseButtonNotFound:"Canned Response button not found.",emailFilledSuccess:"Email filled in successfully!",editorFocusError:"Error focusing the editor.",verifyEmailWarning:"<strong>Check the email address:</strong> The CRM may translate characters incorrectly.",amCcWarning:"<strong>Heads up:</strong> Check whether the AM's email should be in CC.",fallbackClient:"Customer",fallbackSite:"your site"}};function Kt(e){let t=ge();return In[t]?.[e]??In.pt[e]}function Ln(e){let t=Et();return In[t]?.[e]??In.pt[e]}function ut(e,t="info"){let a={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${e}`,a[t]||a.info)}function _n(e,t){if(!e)return;let a=`cw-warning-${e.id||Math.random().toString(36).substr(2,9)}`,o=document.getElementById(a);o&&o.remove();let n=e.getBoundingClientRect(),i=document.createElement("div");i.id=a,i.style.cssText=`
        position: fixed;
        top: ${n.bottom+8}px;
        left: ${n.left}px;
        min-width: 300px;
        max-width: 400px;
        background: #ffffff;
        border-left: 4px solid #F9AB00;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        padding: 12px 16px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 10px;
        z-index: ${gt.TOAST};
        font-family: 'Google Sans', Roboto, sans-serif;
        font-size: 13px;
        color: #202124;
        opacity: 0;
        transform: translateY(-5px);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        pointer-events: auto;
    `,i.innerHTML=`
        <div style="display:flex; align-items:flex-start; gap:10px;">
            <span style="color:#F9AB00; font-size:16px; margin-top:1px;">\u26A0\uFE0F</span>
            <span style="line-height:1.4;">${t}</span>
        </div>
        <div class="cw-close-btn" style="
            cursor: pointer; color: #5f6368; font-weight: bold; font-size: 16px; 
            padding: 0 4px; line-height: 1; opacity: 0.6; transition: opacity 0.2s;
        ">\xD7</div>
    `;let r=i.querySelector(".cw-close-btn");r.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&r.click()},25e3)}async function Dn(e,t){if(!e||!t)return;e.focus(),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await Ne(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),await Ne(100),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function Gi(){let t=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(a=>{let o=a.offsetParent!==null,n=a.closest("case-message-view")!==null,i=a.closest(".editor")!==null||a.closest("write-card")!==null;return o&&!n&&i});return t&&ut("Editor visualmente detectado.","success"),t}var Bi=e=>!!e&&e.getClientRects().length>0&&e.getAttribute("aria-disabled")!=="true";async function $u(e,{timeout:t=3e3,intervalo:a=100}={}){let o=Date.now()+t;for(;Date.now()<o;){let n=e();if(n)return n;await Ne(a)}return null}function Cl(){let e=Array.from(document.querySelectorAll('material-button.compose, material-button.speed-dial-mini-fab[role="menuitem"]')),t=e.find(a=>a.classList.contains("compose")&&Bi(a));return t||e.find(a=>{let o=a.querySelector("i.material-icons-extended");return Bi(a)&&o&&o.textContent.trim()==="email"})||null}async function Pu(){try{let e=Cl();if(e)ut("Menu do speed dial j\xE1 estava aberto.");else{let t=document.querySelector("#action-bar-speed-dial-container material-button")||document.querySelector("material-button.action-bar-speed-dial-button");if(!Bi(t))return ut("Speed dial (+ Open) n\xE3o encontrado.","warn"),!1;ut("Speed dial (+ Open) encontrado. Abrindo o menu..."),At(t),await Ne(350),e=await $u(Cl,{timeout:3e3})}return e?(await Ne(120),At(e),ut("Compose clicado via speed dial.","success"),!0):(ut("Menu abriu, mas o bot\xE3o Compose n\xE3o apareceu.","warn"),!1)}catch(e){return ut(`Falha no speed dial: ${e.message}`,"error"),!1}}async function Bu(){let t=Array.from(document.querySelectorAll("i.material-icons-extended")).find(o=>o.innerText.trim()==="email");if(t&&t.offsetParent!==null){ut("Bot\xE3o de email direto encontrado.");let o=t.closest("material-button")||t.closest("material-fab")||t;return At(o),!0}ut("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let a=document.querySelector("material-fab-speed-dial");if(a){let o=a.querySelector(".trigger");if(o){At(o),await Ne(800);let i=Array.from(document.querySelectorAll("i.material-icons-extended")).find(r=>r.innerText.trim()==="email");if(i)return At(i),ut("Email aberto pelo fluxo antigo.","success"),!0}}return!1}async function Al(){ut("\u{1F680} FASE 1: Tentando abrir a janela de email...");let e=await Pu();if(e||(ut("UI nova n\xE3o reconhecida. Voltando ao fluxo da UI antiga...","warn"),e=await Bu()),!e)return w.playError(),ne(Kt("emailButtonNotFound"),{error:!0}),!1;ut("\u{1F680} FASE 2: Verificando rascunhos...");let t=null,a=0,o=20;for(;a<o;){await Ne(250);let p=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(t=Array.from(p).find(c=>c.offsetParent!==null),t){ut("\u26A0\uFE0F Rascunho detectado!","warn");break}a++}if(t){ut("\u{1F5D1}\uFE0F Descartando..."),At(t),t.click();let p=null,c=0;for(;c<15;){await Ne(300);let m=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(p=Array.from(m).find(u=>u.offsetParent!==null),p)break;c++}p&&(At(p),ne(Kt("clearingOldDraft"),{duration:2e3}),await Ne(2500))}ut("\u{1F680} FASE 3: Buscando editor final...");let n=0,i=null;for(;n<20&&(i=Gi(),!i);)await Ne(250),n++;if(!i)return w.playError(),ne(Kt("editorNotLoaded"),{error:!0}),!1;let r=i.closest('[id="email-body-content-top"]'),l=(i.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(r){if(l){let c=l.closest('[aria-hidden="true"]');c&&c.removeAttribute("aria-hidden"),l.focus(),At(l)}await Ne(300),r.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let p=r.querySelector("#cases-body-field");if(p){let c=document.createRange();c.selectNodeContents(p),c.collapse(!0);let m=window.getSelection();m.removeAllRanges(),m.addRange(c)}return!0}return!1}async function co(e){if(!e||!await Al())return;let a=await Ut();ut("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let o=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(o&&(o.click(),await Ne(600)),a.clientEmail&&a.clientEmail!=="N/A"&&a.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await Dn(i,a.clientEmail),_n(i,Kt("verifyEmailWarning")))}if(a.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await Dn(i,a.internalEmail),_n(i,Kt("amCcWarning")))}await Ne(500);let n=document.querySelector('material-button[debug-id="canned_response_button"]');if(n){At(n),await Ne(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){At(i),document.execCommand("insertText",!1,e),i.dispatchEvent(new Event("input",{bubbles:!0})),ut("\u23F3 Buscando resultado da Canned Response...","info");let r=null,s=0,l=15e3,p=500;for(;s<l&&(r=document.querySelector("material-select-dropdown-item"),!r);)await Ne(p),s+=p;if(r){At(r),await Ne(1500);let c=Gi();if(c){let u=Array.from(c.querySelectorAll("span.field")).filter(L=>L.innerText.includes("{Requested Task Type}"));if(u.length>0){let L=u.map(C=>C.closest("tr")).filter(C=>C!==null),S=[...new Set(L)];if(S.length>0){let D=S[0].querySelector('td[width="100%"]');D&&(D.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let G=1;G<S.length;G++)S[G].remove()}}let h=c.innerHTML;a.advertiserName&&h.includes("{%ADVERTISER_NAME%}")&&(h=h.replace(/{%ADVERTISER_NAME%}/g,a.advertiserName)),h.includes("{%^79285%}")&&(h=h.replace(/{%\^79285%}/g,a.websiteUrl||Ln("fallbackSite"))),c.innerHTML=h}ne(Kt("cannedResponseApplied"))}else ut(`\u274C Timeout: Resultado '${e}' n\xE3o apareceu ap\xF3s 15s.`,"error"),w.playError(),ne(Kt("cannedResponseTimeout")(e),{error:!0})}}else w.playError(),ne(Kt("cannedResponseButtonNotFound"),{error:!0})}async function El(e){if(ut(`\u{1F680} Iniciando Quick Email: ${e.name}`),!await Al())return;let a=await Ut(),o=Do();await Ne(600);let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await Ne(600)),a.clientEmail&&a.clientEmail!=="N/A"&&a.clientEmail!=="N/A (Bloqueado)"){let s=document.querySelector('input[aria-label="Enter To email address"]');s&&(await Dn(s,a.clientEmail),_n(s,Kt("verifyEmailWarning")))}if(a.internalEmail){let s=document.querySelector('input[aria-label="Enter Bcc email address"]');s&&(await Dn(s,a.internalEmail),_n(s,Kt("amCcWarning")))}let i=document.querySelector('input[aria-label="Subject"]');i&&e.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,e.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await Ne(300));let r=Gi();if(r){let l=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');l&&(l.focus(),At(l));let p=new Date;p.setDate(p.getDate()+3);let c=p.getDay();c===6?p.setDate(p.getDate()+2):c===0&&p.setDate(p.getDate()+1);let m=wl(p,Et()),u=e.body;u=u.replace(/\[Nome do Cliente\]/g,a.advertiserName||Ln("fallbackClient")),u=u.replace(/\[INSERIR URL\]/g,a.websiteUrl||Ln("fallbackSite")),u=u.replace(/\[URL\]/g,a.websiteUrl||Ln("fallbackSite")),u=u.replace(/\[Seu Nome\]/g,o),u=u.replace(/\[MM\/DD\/YYYY\]/g,m),document.execCommand("insertHTML",!1,u),l&&(l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))),ne(Kt("emailFilledSuccess"),{duration:2e3}),ut("\u2705 Processo finalizado com sucesso.","success")}else w.playError(),ne(Kt("editorFocusError"),{error:!0})}var ji=460,Hi=280,Gu=200,Ui=.06;if(!document.getElementById("cw-module-styles")){let e=document.createElement("style");e.id="cw-module-styles",e.innerHTML=`
        /* M\xD3DULO BASE */
        .cw-module-window {
            /* Degrau de repouso da janela. Precisa estar AQUI, e n\xE3o s\xF3
               no estilo inline de stylePopup(): o fim do fechamento faz
               popup.style.zIndex = '', o que apaga o inline e deixaria a
               janela em z-index:auto na pr\xF3xima abertura. */
            z-index: ${gt.MODULE_RESTING};
            /* A transi\xE7\xE3o real de abrir/fechar \xE9 aplicada inline por
               toggleGenieAnimation(); esta aqui s\xF3 cobre as mudan\xE7as de
               estado visual (idle/foco) enquanto a janela est\xE1 aberta. */
            transition:
                opacity 0.3s ease,
                filter 0.3s ease,
                border-color 0.3s ease,
                box-shadow 0.3s ease;

            opacity: 0;
            pointer-events: none;
            /* Fora de cena de verdade: sem visibility a janela fechada
               continuava no tab order e no leitor de tela, invis\xEDvel s\xF3 por
               causa do opacity. */
            visibility: hidden;
            transform: scale(${Ui});

            /* Visual Ceramic Light */
            background: #F8F9FA;
            backdrop-filter: blur(12px);
            box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.18);
            border: 1px solid rgba(0, 0, 0, 0.12);
            border-radius: 16px;
            overflow: hidden;

            /* Fonte Base */
            font-family: 'Google Sans', Roboto, sans-serif;
        }

        /* ESTADO ABERTO (Ativo) */
        .cw-module-window.open {
            opacity: 1;
            pointer-events: auto;
            visibility: visible;
            filter: brightness(1);
            /* Sombra alta */
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
        }

        /* ESTADO IDLE (Segundo Plano) */
        .cw-module-window.idle {
            /* Sem transform aqui: o transform da janela \xE9 sempre inline
               (\xE9 ele que faz o voo at\xE9 a p\xEDlula), ent\xE3o um scale nesta regra
               nunca chegava a valer nada - e virava alvo fantasma quando o
               inline era limpo no meio do fechamento. O efeito de "encostou
               na mesa" vem todo de opacity/filter/sombra. */
            opacity: 0.9;
            filter: brightness(0.96) saturate(0.5);
            border-color: rgba(0, 0, 0, 0.2);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1); /* Sombra cai (encostou na mesa) */

            cursor: pointer; /* Indica clic\xE1vel */
        }

        /* DURANTE O VOO: sem blur de fundo.
           Compor um backdrop-filter: blur(20px) numa janela de 600x650 a cada
           quadro enquanto ela \xE9 escalada \xE9 das coisas mais caras que d\xE1 pra
           pedir ao compositor - e \xE9 exatamente o que acontecia nos ~460ms de
           abertura, ainda por cima concorrendo com o CRM. O custo n\xE3o comprava
           nada: o fundo do popup \xE9 rgba(255,255,255,0.98), quase opaco, ent\xE3o
           o que passa pelo blur \xE9 ~2% da imagem. Desligamos no trajeto e
           devolvemos no repouso, onde ele n\xE3o custa quadro nenhum.
           Precisa de !important porque stylePopup aplica o blur inline. */
        .cw-module-window.cw-animating {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
        }

        /* Pulso de "absor\xE7\xE3o" no \xEDcone da p\xEDlula: um anel colapsa pra dentro
           do bot\xE3o no momento exato em que a janela \xE9 sugada (e quando ela
           sai), dando a leitura de que os dois s\xE3o o mesmo objeto.
           \xC9 um anel de box-shadow, e n\xE3o um scale, porque .cw-btn:hover j\xE1
           usa transform com !important - o mouse quase sempre est\xE1 em cima
           do bot\xE3o na hora do clique, e um pulso de scale simplesmente n\xE3o
           apareceria. */
        @keyframes cw-btn-absorb {
            0%   { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.28); }
            100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
        .cw-btn.cw-absorbing { animation: cw-btn-absorb 0.34s var(--cw-ease-decelerate, ease-out); }

        @media (prefers-reduced-motion: reduce) {
            .cw-btn.cw-absorbing { animation: none; }
        }
    `,document.head.appendChild(e)}window._cwEscapeListenerActive||(window._cwEscapeListenerActive=!0,document.addEventListener("keydown",e=>{if(e.key!=="Escape"||document.querySelector(".cw-dialog-overlay"))return;let t=document.querySelector(".cw-module-window.open");if(!t)return;let a=t.querySelector(".cw-header-close");a&&a.click()}));function Dl(){return!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)}function kl(e){let t=document.querySelector(".cw-pill"),a=e?document.getElementById(e):null,o=!!(t&&t.classList.contains("collapsed")),n=i=>{if(!i)return null;let r=i.getBoundingClientRect();return!r.width||!r.height?null:{x:r.left+r.width/2,y:r.top+r.height/2}};if(!o){let i=!!(a&&a.closest(".cw-drawer:not(.open)")),r=n(i?document.getElementById("cw-btn-more"):a);if(r)return r}return n(t)}function Tl(e,t){let a=e.style.transition,o=e.style.transform;e.style.transition="none",e.style.transform="none";let n=e.getBoundingClientRect();return e.style.transform=o,e.offsetWidth,e.style.transition=a,{left:t?n.left:n.left-n.width/2,top:t?n.top:n.top-n.height/2,width:n.width,height:n.height}}function Nl(e,t,a){if(!t){e.style.transformOrigin="50% 50%",e._cwOrigin=null;return}let o=`${Math.round(t.x-a.left)}px ${Math.round(t.y-a.top)}px`;e.style.transformOrigin=o,e._cwOrigin=o}function Ll(e){return e?`translate(0, 0) scale(${Ui})`:`translate(-50%, -50%) scale(${Ui})`}function ju(e){return e?"translate(0, 0) scale(1)":"translate(-50%, -50%) scale(1)"}function Il(e){!e||Dl()||(e.classList.remove("cw-absorbing"),e.offsetWidth,e.classList.add("cw-absorbing"),setTimeout(()=>e.classList.remove("cw-absorbing"),400))}function ht(e){return e?typeof e._cwOpen=="boolean"?e._cwOpen:e.classList.contains("open"):!1}function ct(e,t,a){let o=a?document.getElementById(a):null;if(!t)return;t._cwOpen=!!e;let n=(t._cwAnimToken||0)+1;t._cwAnimToken=n;let i=()=>t._cwAnimToken!==n;t._cwTeardown&&(t._cwTeardown(),t._cwTeardown=null);let r=Dl(),s=t.getAttribute("data-moved")==="true";if(e){w.playGenieOpen();let l=Tl(t,s);Nl(t,kl(a),l),t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",t.style.transform=Ll(s),t.style.willChange="transform, opacity",t.classList.add("cw-animating"),t.offsetWidth,requestAnimationFrame(()=>{i()||(t.classList.add("open"),t.classList.remove("idle"),o&&o.classList.add("active"),Il(o),t.style.transition=r?"opacity 0.15s ease":`opacity ${Math.round(ji*.6)}ms ease-out, transform ${ji}ms var(--cw-ease-decelerate), filter 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease`,t.style.opacity="1",t.style.transform=ju(s),_l(t,n,r?150:ji,()=>{t.style.willChange="auto",t.classList.remove("cw-animating"),t._cwSettled=!0}))}),t._cwSettled=!1,Hu(t,a)}else{if(w.playSwoosh(),t._cwSettled||!t._cwOrigin){let l=Tl(t,s);Nl(t,kl(a),l)}if(t.style.transition=r?"opacity 0.15s ease":`opacity ${Math.round(Hi*.8)}ms ease, transform ${Hi}ms var(--cw-ease-accelerate)`,t.style.pointerEvents="none",t.style.willChange="transform, opacity",t.classList.add("cw-animating"),o&&t.contains(document.activeElement))try{o.focus({preventScroll:!0})}catch{o.focus()}requestAnimationFrame(()=>{i()||(t.style.opacity="0",t.style.transform=Ll(s),_l(t,n,r?150:Hi,()=>{t.classList.remove("open"),t.classList.remove("idle"),t.style.zIndex="",o&&o.classList.remove("active"),Il(o),t.style.willChange="auto",t.classList.remove("cw-animating"),t.style.transition=""}))}),Ml(t)}}function _l(e,t,a,o){let n=!1,i=()=>{e.removeEventListener("transitionend",s),clearTimeout(l),e._cwTeardown===i&&(e._cwTeardown=null)},r=()=>{n||(n=!0,i(),e._cwAnimToken===t&&o())},s=p=>{p.target===e&&p.propertyName==="transform"&&r()};e.addEventListener("transitionend",s);let l=setTimeout(r,a+Gu);e._cwTeardown=i}function Hu(e,t){Ml(e);let a=o=>{if(!e.classList.contains("open"))return;let n=e.contains(o.target),i=document.querySelector(".cw-pill"),r=document.querySelector(".cw-drawer"),s=i&&i.contains(o.target)||r&&r.contains(o.target);n?(e.classList.remove("idle"),e.style.zIndex=String(gt.MODULE_FOCUSED)):s||(e.classList.add("idle"),e.style.zIndex=String(gt.MODULE_RESTING))};e._idleHandler=a,document.addEventListener("mousedown",a)}function Ml(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var Ol='<svg viewBox="0 0 24 24" fill="currentColor" style="width:13px;height:13px;flex-shrink:0;"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>';function ql(){let e="v4.0.0",{popup:t,content:a,header:o,animRefs:n,credit:i}=Ms(e,U),r=Ys(b),s=Cn(()=>{pe(),ue.setActiveTasks(s.getCheckedElements())},b,ue),l=document.createElement("div");l.style.display="none";let p=Ws((g,x)=>{he(g,x)});l.appendChild(p);let c=document.createElement("button");c.type="button",c.className="cw-save-shortcut-btn",c.style.cssText=`
        margin-top: 10px; padding: 7px 12px; border-radius: 8px;
        border: 1px dashed ${J.border}; background: transparent;
        color: ${J.textSub}; font-family: inherit; font-size: 11.5px;
        font-weight: 600; cursor: pointer; display: inline-flex; align-items: center;
        gap: 6px; transition: all 0.2s ${Pe};
    `,c.onmouseenter=()=>{c.style.borderColor=J.primary,c.style.color=J.primary,w.playHover()},c.onmouseleave=()=>{c.style.borderColor=J.border,c.style.color=J.textSub},c.onclick=()=>ce(),c.innerHTML=`${Ol}<span>${b("salvar_como_atalho")}</span>`,l.appendChild(c);let m=document.createElement("div");m.id="evidence-container",Object.assign(m.style,{display:"none",marginTop:"16px",padding:"16px",background:J.bgInput,border:`1px solid ${J.border}`,borderRadius:pt.medium,boxShadow:da.subtle});let u=document.createElement("div");u.className="cw-section-title",u.textContent=b("evidencias_contato"),m.appendChild(u);let h={},L=(g,x)=>{let I=document.createElement("div");I.style.marginBottom="12px";let E=document.createElement("label");E.textContent=x,E.setAttribute("for",g),E.style.cssText=`display: block; font-size: 11px; font-weight: 700; color: ${J.textSub}; margin-bottom: 6px; text-transform: uppercase;`;let W=document.createElement("input");return W.type="text",W.id=g,W.className="cw-input",W.placeholder="https://screenshot.googleplex.com/...",W.style.marginBottom="0",I.appendChild(E),I.appendChild(W),gn(W,{minLength:8}),h[g]=W,I};m.appendChild(L("evidence-l1",b("ligacao_1"))),m.appendChild(L("evidence-l2",b("ligacao_2"))),m.appendChild(L("evidence-msg",b("mensagem_am")));let S=sl({onSaveCurrent:async()=>{let g=await k();return O(),g},onLoadDraft:g=>{ie(g)},t:g=>b(g)}),C=Z(),D=de(),G=document.createElement("div"),F=N(),R=T(S,b);a.appendChild(C),a.appendChild(D),a.appendChild(F),a.appendChild(l),a.appendChild(G),a.appendChild(m),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none";let le=document.createElement("button");le.id="manual-task-toggle",le.textContent=b("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",le.style.cssText=`display: none; width: 100%; padding: 14px; border: 2px dashed ${J.primary}; background: ${J.surface}; color: ${J.primary}; border-radius: ${pt.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${Pe}; text-transform: uppercase; letter-spacing: 0.5px;`,le.onmouseenter=()=>{le.style.background=J.primaryBg},le.onmouseleave=()=>{le.style.background=J.surface},le.onclick=()=>{s.selectionElement.style.display="block",s.screenshotsElement.style.display="block",le.style.display="none"},a.appendChild(le),a.appendChild(s.selectionElement),a.appendChild(r.element),a.appendChild(s.screenshotsElement),a.appendChild(R);let te=document.createElement("div");te.style.display="none",te.style.flexGrow="1",te.style.minHeight="0",te.style.overflow="hidden";let ee=Tn(()=>M());ee.style.height="100%",te.appendChild(ee),t.insertBefore(te,i);let $=d(),A=o.lastElementChild;A&&(A.insertBefore(S.historyBtnWrapper,A.firstChild),A.insertBefore($,A.firstChild)),t.appendChild(S.drawer);let y=null;ue.subscribe(g=>{_(g),z(),g.isDirty?(y&&clearTimeout(y),y=setTimeout(async()=>{let x=await k(!0);x.subStatus?Bt.saveEmergency(x):Bt.clearEmergency(),g.isDirty=!1},2e3)):y&&(clearTimeout(y),y=null)});function z(){let g=Bt.getCount()>0,x=!!ue.currentSubStatus;En(g||x)}function U(){ue.visible=!ue.visible,ue.visible?Je():Qe(),ct(ue.visible,t,"cw-btn-notes")}function M(){ue.isSplitView=!ue.isSplitView,ue.isSplitView?(a.style.display="none",te.style.display="flex",te.style.flexDirection="column",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(a.style.display="flex",te.style.display="none",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function Z(){let g=document.createElement("div");if(g.innerHTML=`
            <div style="display: flex; gap: 12px; margin-bottom: 8px;">
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-fluxo" style="font-size: 10px; margin-bottom: 6px;">${b("fluxo")}</div>
                    <div class="cw-segmented-control" id="type-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-type="bau" class="active" style="z-index:2">BAU</button>
                        <button data-type="lm" style="z-index:2">LM</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-portugal" style="font-size: 10px; margin-bottom: 6px;">${b("caso_portugal")}</div>
                    <div class="cw-segmented-control" id="portugal-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-val="false" class="active" style="z-index:2">${b("nao")}</button>
                        <button data-val="true" style="z-index:2">${b("sim")}</button>
                    </div>
                </div>
            </div>
        `,!document.getElementById("cw-segmented-styles")){let I=document.createElement("style");I.id="cw-segmented-styles",I.innerHTML=`
                .cw-segmented-control {
                    display: flex;
                    background: ${J.bgInput};
                    padding: 3px;
                    border-radius: 100px;
                    gap: 2px;
                    border: 1px solid ${J.border};
                    position: relative;
                    overflow: hidden;
                }
                .cw-segmented-control button {
                    flex: 1;
                    border: none;
                    background: transparent;
                    padding: 6px 4px;
                    font-size: 11px;
                    font-weight: 700;
                    border-radius: 100px;
                    cursor: pointer;
                    transition: all 0.3s ${Pe};
                    color: ${J.textSub};
                    position: relative;
                }
                .cw-segmented-control button.active {
                    color: #fff;
                }
                .cw-segmented-control button:hover:not(.active) {
                    background: rgba(0,0,0,0.03);
                    color: ${J.text};
                }
                .cw-segmented-indicator {
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    bottom: 3px;
                    width: calc(50% - 4px);
                    background: ${J.primary};
                    border-radius: 100px;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 1;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
                }
            `,document.head.appendChild(I)}let x=(I,E)=>{let H=g.querySelector(`#${I}`).querySelector(".cw-segmented-indicator");H&&(H.style.transform=`translateX(${E*100}%) translateX(${E*2}px)`)};return g.querySelectorAll("#type-selector button").forEach((I,E)=>{I.onclick=()=>{ue.setCaseType(I.dataset.type),g.querySelectorAll("#type-selector button").forEach(W=>W.classList.remove("active")),I.classList.add("active"),x("type-selector",E),w.playClick(),ue.currentSubStatus&&be(ue.currentSubStatus)}}),g.querySelectorAll("#portugal-selector button").forEach((I,E)=>{I.onclick=()=>{ue.setPortugalCase(I.dataset.val==="true"),g.querySelectorAll("#portugal-selector button").forEach(W=>W.classList.remove("active")),I.classList.add("active"),x("portugal-selector",E),w.playClick(),ue.currentSubStatus&&be(ue.currentSubStatus)}}),g}function de(){let g=document.createElement("div");g.className="cw-status-section",g.style.cssText="display: flex; flex-direction: column; gap: 8px;",g.innerHTML=`
            <label class="cw-section-title js-label-status" for="main-status-select" style="margin-top: 8px;">${b("status_principal")}</label>
            <select id="main-status-select" class="cw-select">
                <option value="" disabled selected>${b("select_status")}</option>
                <option value="NI">NI - Need Info</option>
                <option value="SO">SO - Solution Offered</option>
                <option value="IN">IN - Inactive</option>
                <option value="AS">AS - Assigned</option>
                <option value="DC">DC - Discard</option>
            </select>
            <label class="cw-section-title js-label-substatus" for="sub-status-select" style="margin-top: 8px;">${b("substatus")}</label>
            <select id="sub-status-select" class="cw-select" disabled>
                <option value="">${b("select_substatus")}</option>
            </select>
        `;let x=g.querySelector("#main-status-select"),I=g.querySelector("#sub-status-select");return x.onchange=()=>{ue.setStatus(x.value),re(x.value,I),ue.setSubStatus(""),be("")},I.onchange=()=>{ue.setSubStatus(I.value),be(I.value)},g}function ve(){return m.style.display==="none"?null:{l1:h["evidence-l1"]?.value.trim()||"",l2:h["evidence-l2"]?.value.trim()||"",msg:h["evidence-msg"]?.value.trim()||""}}function re(g,x){if(x.innerHTML=`<option value="">${b("select_substatus")}</option>`,!g){x.disabled=!0;return}let I=g==="IN"?(()=>{let E=document.createElement("optgroup");return E.label="Fora de Escopo",E})():null;for(let E in st)if(st[E].status===g){let W=document.createElement("option");W.value=E,W.textContent=st[E].name,I&&E.startsWith("IN_Out_of_Scope")?I.appendChild(W):x.appendChild(W)}I&&I.children.length>0&&x.appendChild(I),x.disabled=!1}function be(g){let x=st[g],I=g==="NI_Attempted_Contact"||x&&x.name&&x.name.toLowerCase().includes("attempted contact");if(p.render&&p.render(g,ue.currentCaseType),!g){m.style.display="none",h["evidence-l1"]&&(h["evidence-l1"].value=""),h["evidence-l2"]&&(h["evidence-l2"].value=""),h["evidence-msg"]&&(h["evidence-msg"].value=""),l.style.display="none",G.style.display="none";let Te=document.getElementById("manual-task-toggle");Te&&(Te.style.display="none"),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",F.style.display="flex",F.style.opacity="1",R.style.display="none";return}if(I?m.style.display="block":(m.style.display="none",h["evidence-l1"]&&(h["evidence-l1"].value=""),h["evidence-l2"]&&(h["evidence-l2"].value=""),h["evidence-msg"]&&(h["evidence-msg"].value="")),F.style.opacity="0",setTimeout(()=>{ue.currentSubStatus&&(F.style.display="none")},400),R.style.display="grid",x&&x.templateFields){let Te=Fs(x);ue.setActiveFields(x.templateFields.filter(Me=>!Te.includes(Me)))}V(),$o(g,G,ue),G.style.display="block",l.style.display="block";let E=g.startsWith("SO_"),W=g==="NI_Awaiting_Validation",H=document.getElementById("manual-task-toggle");E||W?(s.selectionElement.style.display="block",H.style.display="none"):(s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",H.style.display="block");let ae=g==="SO_Education_Only"?"education":"implementation";ue.setScreenshotMode(ae),s.updateSubStatus(g),pe();let fe=document.getElementById("email-automation-toggle-row");fe&&(fe.style.display=ra[g]?"flex":"none")}function pe(){let g=s.getCheckedElements().map(x=>x.value);r.updateVisibility(ue.currentSubStatus,g)}function he(g,x){let I=Za(_t[g],ue.currentLang,g);if(I){for(let E in I)if(E==="linkedTask")s.toggleTask(I.linkedTask,x);else if(E==="activeTasks")I.activeTasks.forEach(W=>{x?s.setTaskCount(W.value,W.count):s.setTaskCount(W.value,0)});else if(E.startsWith("field-")){let W=E,H=I[E],ae=document.getElementById(W);if(ae){let fe=ao.includes(W.replace("field-",""));if(x)if(fe){let Te=ae.value.trim();Te.includes(H.trim())||(ae.value=Te?Te+`
`+H.trim():H.trim())}else ae.value=H;else if(fe){let Te=ae.value.trim(),Me=H.trim();Te.includes(Me)&&(ae.value=Te.replace(Me,"").trim().replace(/\n{3,}/g,`

`))}else ae.value.trim()===H.trim()&&(ae.value="");ue.updateField(W,ae.value),ae.dispatchEvent(new Event("input"))}}}}function T(g,x){let I=document.createElement("div");if(I.className="cw-actions-section",I.style.cssText=`
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 10px;
            margin-top: 16px;
            background: ${J.bgInput};
            border-radius: 12px;
            border: 1px solid ${J.border};
        `,!document.getElementById("cw-actions-hover-styles")){let Te=document.createElement("style");Te.id="cw-actions-hover-styles",Te.innerHTML=`
                .cw-actions-section button {
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
                    position: relative;
                    overflow: hidden;
                }
                .cw-actions-section button:active {
                    transform: scale(0.98) !important;
                }
                .cw-actions-section .js-btn-generate:hover {
                    background: #1765cc !important;
                    box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3) !important;
                    transform: translateY(-1px);
                }
                .cw-actions-section .js-btn-copy:hover {
                    background: #f8f9fa !important;
                    border-color: ${J.primary} !important;
                    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.1) !important;
                    transform: translateY(-1px);
                }
                .cw-actions-section .js-btn-reset:hover {
                    background: #fff5f5 !important;
                    border-color: #ff8787 !important;
                    color: #e03131 !important;
                    box-shadow: 0 2px 8px rgba(234, 67, 53, 0.1) !important;
                    transform: translateY(-1px);
                }
                .cw-actions-section .js-btn-park:hover {
                    background: #f0f7ff !important;
                    color: ${J.primary} !important;
                    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.05) !important;
                    transform: translateY(-1px);
                }
            `,document.head.appendChild(Te)}let E=document.createElement("div");E.id="email-automation-toggle-row",E.style.cssText="grid-column: 1 / -1; display: none; align-items: center; justify-content: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2px;",E.innerHTML=`
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 10.5px; font-weight: 600; color: ${J.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 13px; height: 13px; accent-color: ${J.primary};">
                <span class="js-label-email-toggle">${x("preencher_email_automaticamente")}</span>
            </label>
        `;let W=g.parkButton;W.classList.add("js-btn-park"),W.style.cssText="width: 100%; margin: 0; border-radius: 10px; height: 34px; font-weight: 600; font-size: 11.5px;";let H=document.createElement("button");H.className="cw-btn-secondary js-btn-reset",H.textContent=x("limpar"),H.style.cssText=`width: 100%; height: 34px; background: ${J.surface}; color: ${J.textSub}; border: 1px solid ${J.border}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,H.onclick=()=>O();let ae=document.createElement("button");ae.className="cw-btn-secondary js-btn-copy",ae.textContent=x("copiar"),ae.style.cssText=`width: 100%; height: 34px; background: ${J.surface}; color: ${J.primary}; border: 1px solid ${J.primary}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,ae.onclick=()=>Y();let fe=document.createElement("button");return fe.className="cw-btn-primary js-btn-generate",fe.textContent=x("preencher"),fe.style.cssText=`width: 100%; height: 38px; background: ${J.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; grid-column: 1 / -1; font-size: 12.5px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 0px;`,fe.onclick=()=>se(),I.appendChild(E),I.appendChild(W),I.appendChild(H),I.appendChild(ae),I.appendChild(fe),I}async function Y(){if(!ue.currentSubStatus){w.playError(),ne(b("select_substatus"),{error:!0});return}let g=Ni(ue,s,r,ve());g?(ta(g),ne(b("copiado_sucesso")),w.playClick()):(w.playError(),ne(b("select_substatus"),{error:!0}))}async function se(){if(!ue.currentSubStatus){w.playError(),ne(b("select_substatus"),{error:!0});return}let g=st[ue.currentSubStatus],x=zo(g).filter(H=>{if(!ue.activeFields.includes(H))return!1;let ae=ue.formData[`field-${H}`];return!ae||!ae.trim()});if(x.length>0){w.playError(),ne(`${b("preencha_obrigatorio")}: ${b(x[0].toLowerCase())}`,{error:!0});return}if(g?.requiresTasks&&s.getCheckedElements().length===0){w.playError(),ne(b("selecione_task_gerar"),{error:!0});return}let I=Ni(ue,s,r,ve());ta(I),U();let E=Pa(),W=await Aa();if(W){W.focus(),document.execCommand("insertHTML",!1,I),Ca(W);let H=document.getElementById("email-automation-checkbox");(!H||H.checked)&&ue.currentSubStatus&&ra[ue.currentSubStatus]&&await co(ra[ue.currentSubStatus]),ne(b("inserido_copiado")),w.playSuccess(),kn(),O()}else w.playError(),ne(b("nota_nao_abriu"),{error:!0}),U();E()}function V(){if(ue.currentSubStatus){if(ue.currentCaseType==="lm")ue.removeField("ON_CALL");else{let g=st[ue.currentSubStatus];g&&g.templateFields.includes("ON_CALL")&&ue.addFieldAt("ON_CALL",1)}ue.isPortugalCase?(ue.addFieldAt("CASO_PORTUGAL",1),ue.addFieldAt("CONSENTIU_GRAVACAO",2)):(ue.removeField("CASO_PORTUGAL"),ue.removeField("CONSENTIU_GRAVACAO"))}}function O(){ue.reset(),s.reset(),r.reset(),z(),Bt.clearEmergency(),a.querySelectorAll("select").forEach(x=>x.value=""),a.querySelector("#sub-status-select").disabled=!0;let g=document.getElementById("email-automation-toggle-row");g&&(g.style.display="none"),G.innerHTML="",l.style.display="none",F.style.display="flex",F.style.opacity="1",R.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",m.style.display="none",h["evidence-l1"]&&(h["evidence-l1"].value=""),h["evidence-l2"]&&(h["evidence-l2"].value=""),h["evidence-msg"]&&(h["evidence-msg"].value="")}async function k(g=!1){let x={};G.querySelectorAll("input, textarea, select").forEach(ae=>{(ae.id.startsWith("field-")||ae.id==="consent-select")&&(x[ae.id]=ae.value)});let I="Cliente",E="---";if(!g)try{let ae=await Ut();I=ae.advertiserName,E=ae.cid}catch(ae){console.warn("Erro ao coletar pageData:",ae)}let W=s.getCheckedElements().map(ae=>({key:ae.value,count:ae.count})),H=W.map(ae=>{let fe=Ze[ae.key];return fe?fe.name:ae.key});return{currentCaseType:ue.currentCaseType,currentLang:ue.currentLang,isPortugalCase:ue.isPortugalCase,consent:ue.consent,tagSupportUsed:ue.tagSupportUsed,forcedScreenshots:[...ue.forcedScreenshots],activeFields:ue.activeFields,status:ue.currentStatus,subStatus:ue.currentSubStatus,formData:x,activeTasks:W,summaryTags:H,clientName:I,cid:E,timestamp:new Date().toISOString()}}let j=g=>new Promise(x=>setTimeout(x,g));async function ie(g){ue.setCaseType(g.currentCaseType||"bau"),ue.setPortugalCase(g.isPortugalCase||!1),ue.setConsent(g.consent||!1),g.activeFields&&ue.setActiveFields(g.activeFields);let x=a.querySelector(`#type-selector button[data-type="${ue.currentCaseType}"]`);x&&x.classList.add("active"),a.querySelectorAll("#type-selector button").forEach(E=>{E!==x&&E.classList.remove("active")});let I=a.querySelector(`#portugal-selector button[data-val="${ue.isPortugalCase}"]`);if(I&&I.classList.add("active"),a.querySelectorAll("#portugal-selector button").forEach(E=>{E!==I&&E.classList.remove("active")}),g.status){let E=a.querySelector("#main-status-select");E.value=g.status,ue.setStatus(g.status);let W=a.querySelector("#sub-status-select");if(re(g.status,W),await j(50),g.subStatus){if(W.value=g.subStatus,ue.setSubStatus(g.subStatus),be(g.subStatus),await j(100),g.tagSupportUsed!==void 0){ue.setTagSupportUsed(g.tagSupportUsed);let H=r.element.querySelector('input[value="Sim"]'),ae=r.element.querySelector('input[value="N\xE3o"]');g.tagSupportUsed&&H?H.checked=!0:ae&&(ae.checked=!0),r.element.querySelector("div:last-child").style.display=g.tagSupportUsed?"none":"block"}g.forcedScreenshots&&ue.setForcedScreenshots(g.forcedScreenshots);for(let H in g.formData){let ae=document.getElementById(H);ae&&(ae.value=g.formData[H],ue.updateField(H,ae.value))}g.activeTasks&&(g.activeTasks.forEach(H=>s.setTaskCount(H.key,H.count)),ue.setActiveTasks(s.getCheckedElements()))}}ue.isDirty=!1}async function P(g){let x=g&&g.payload;if(!x||!x.subStatus)return{ok:!1,reason:"invalid"};let I=x.scenarios||[],E=I.map(Ee=>Pi(Ee)),W=I.filter((Ee,wt)=>!E[wt]);if(ue.isDirty&&!await ot(b("substituir_rascunho_confirm")))return{ok:!1,reason:"cancelled"};let H=ue.visible;if(H||U(),O(),H||await j(550),x.caseType&&x.caseType!==ue.currentCaseType){let Ee=a.querySelector(`#type-selector button[data-type="${x.caseType}"]`);Ee&&Ee.click(),await j(60)}let ae=a.querySelector("#main-status-select"),fe=a.querySelector("#sub-status-select"),Te=x.status||String(x.subStatus).split("_")[0];ae.value=Te,ue.setStatus(Te),re(Te,fe),await j(60),fe.value=x.subStatus,ue.setSubStatus(x.subStatus),be(x.subStatus),await j(160);for(let Ee of E.filter(Boolean)){let wt=l.querySelector(`[data-id="${Ee}"]`);wt&&wt.click()}await j(120),W.length?(w.playError(),ne(b("atalho_cenario_sumiu"),{error:!0})):w.playSuccess();let Me=X();return Me&&mn(Me),{ok:!0,missing:W.map(Ee=>Ee.id)}}function X(){let g=a.querySelectorAll('input[id^="field-"], textarea[id^="field-"], input[id^="evidence-"]');for(let x of g)if(x.offsetParent!==null&&!String(x.value||"").trim())return x;return null}async function ce(){let g=v();if(!g){w.playError(),ne(b("select_substatus"),{error:!0});return}if(lt.listRaw().length>=ua){w.playError(),ne(b("atalho_limite").replace("{max}",ua),{error:!0});return}let x=st[g.payload.subStatus]?.name||g.payload.subStatus,I=await xn(b("atalho_nome_pergunta"),x);if(I!==null){c.disabled=!0,c.style.opacity="0.6";try{let E=await lt.save({...g,id:Uo(),label:String(I).trim()||x});if(!E.ok){w.playError(),ne(b("atalho_limite").replace("{max}",ua),{error:!0});return}w.playSuccess(),ne(E.synced?b("atalho_salvo"):b("atalho_salvo_local"))}finally{c.disabled=!1,c.style.opacity=""}}}function v(){if(!ue.currentSubStatus)return null;let g=p.getSelectedIds?p.getSelectedIds():[];return{kind:"note",payload:{caseType:ue.currentCaseType,status:ue.currentStatus,subStatus:ue.currentSubStatus,scenarios:g.map(x=>({id:x,substatus:ue.currentSubStatus}))}}}function b(g){return bt[ge()]?.[g]||bt.pt?.[g]||g}function d(){let g=document.createElement("div");return g.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',g.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",g.onclick=x=>{x.stopPropagation(),M()},g.title=b("alternar_split"),g}function N(){let g=document.createElement("div");return g.id="notes-empty-state",g.style.cssText=`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${Pe};
        `,g.innerHTML=`
            <div style="width: 140px; height: 140px; margin-bottom: 8px;">
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="60" cy="60" r="50" fill="#f8f9fa"/>
                    <rect x="35" y="25" width="50" height="70" rx="8" fill="white" stroke="#e8eaed" stroke-width="2"/>
                    <rect x="45" y="40" width="30" height="4" rx="2" fill="#4285F4" opacity="0.6"/>
                    <rect x="45" y="52" width="30" height="4" rx="2" fill="#EA4335" opacity="0.6"/>
                    <rect x="45" y="64" width="20" height="4" rx="2" fill="#FBBC05" opacity="0.6"/>
                    <circle cx="85" cy="85" r="18" fill="#34A853"/>
                    <path d="M85 77V93M77 85H93" stroke="white" stroke-width="4" stroke-linecap="round"/>
                </svg>
            </div>
            <div style="text-align: center;">
                <div class="js-empty-title" style="font-family: 'Google Sans', sans-serif; font-size: 16px; font-weight: 600; color: ${J.text}; margin-bottom: 4px;">
                    ${b("pronto_comecar")}
                </div>
                <div class="js-empty-help" style="font-size: 13px; color: ${J.textSub}; line-height: 1.6; opacity: 0.8;">
                    ${b("selecione_status_ajuda")}
                </div>
            </div>
        `,g}function _(g){let x=a.querySelector(".js-label-fluxo");x&&(x.textContent=b("fluxo"));let I=a.querySelector(".js-label-portugal");I&&(I.textContent=b("caso_portugal"));let E=a.querySelectorAll("#portugal-selector button");E.length===2&&(E[0].textContent=b("nao"),E[1].textContent=b("sim"));let W=a.querySelector(".js-empty-title");W&&(W.textContent=b("pronto_comecar"));let H=a.querySelector(".js-empty-help");H&&(H.innerHTML=b("selecione_status_ajuda")),$.title=b("alternar_split");let ae=a.querySelector('#main-status-select option[value=""]');ae&&(ae.textContent=b("select_status"));let fe=a.querySelector('#sub-status-select option[value=""]');fe&&(fe.textContent=b("select_substatus"));let Te=a.querySelector(".js-label-status");Te&&(Te.textContent=b("status_principal"));let Me=a.querySelector(".js-label-substatus");Me&&(Me.textContent=b("substatus"));let Ee=a.querySelector(".js-btn-copy");Ee&&(Ee.textContent=b("copiar"));let wt=a.querySelector(".js-btn-generate");wt&&(wt.textContent=b("preencher"));let Ge=a.querySelector(".js-btn-reset");Ge&&(Ge.textContent=b("limpar"));let zt=document.getElementById("manual-task-toggle");zt&&(zt.textContent=b("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let ea=a.querySelector(".js-btn-park span");ea&&(ea.textContent=b("guardar")),u.textContent=b("evidencias_contato");let yt=m.querySelector('label[for="evidence-l1"]');yt&&(yt.textContent=b("ligacao_1"));let na=m.querySelector('label[for="evidence-l2"]');na&&(na.textContent=b("ligacao_2"));let _a=m.querySelector('label[for="evidence-msg"]');_a&&(_a.textContent=b("mensagem_am"));let jt=t.querySelector(".js-drawer-title");jt&&(jt.textContent=b("rascunhos_salvos"));let So=t.querySelector(".js-history-btn");So&&(So.title=b("meus_rascunhos"));let dt=a.querySelector(".js-label-email-toggle");dt&&(dt.textContent=b("preencher_email_automaticamente")),c.innerHTML=`${Ol}<span>${b("salvar_como_atalho")}</span>`,r&&r.setLanguage&&r.setLanguage(b),s&&s.setLanguage&&s.setLanguage(b)}return F.style.display="flex",R.style.display="none",ue.setLanguage(Et()),ue.setCaseType("bau"),va(g=>{ue.setLanguage(g),ue.currentSubStatus&&be(ue.currentSubStatus)}),je(g=>{let x=t.querySelector(".cw-help-description");x&&(x.textContent=Ro[g]||Ro.pt),_(ue)}),z(),setTimeout(async()=>{let g=Bt.getEmergency();g&&(await ot(b("restaurar_rascunho_confirm"))?(ie(g),ne(b("sessao_restaurada"))):Bt.clearEmergency())},3e3),document.body.appendChild(t),io(()=>s.refreshCatalog()),Gs().then(g=>{g&&ue.currentSubStatus&&(p.render&&p.render(ue.currentSubStatus,ue.currentCaseType),$o(ue.currentSubStatus,G,ue))}),U.openWithPreset=P,U}var Uu="Pre-call checklist",On="None provided";var Vu="Completed",Rl=[{value:"Live Meet case",key:"reasonLiveMeet"},{value:"Case arrived <1h before the call",key:"reasonLate"}],zl=[{value:"Proceed",key:"nextProceed"},{value:"OOS",key:"nextOos"},{value:"Infeasible",key:"nextInfeasible"}],Ea=[{id:"duplicateCase",label:"Duplicate Case",kind:"yesno",required:!0},{id:"suite360",label:"360 Suite",kind:"yesno",required:!0},{id:"sgtm",label:"sGTM",kind:"yesno",required:!0},{id:"api",label:"API",kind:"yesno",required:!0},{id:"sellerCc",label:"Seller to be CCed",kind:"yesno",required:!0},{id:"tasks",label:"Task(s) [copy&paste]",kind:"textarea",auto:!0},{id:"contactNumber",label:"Contact number",kind:"text",auto:!0},{id:"email",label:"Email",kind:"text",auto:!0},{id:"websiteUrl",label:"Website URL",kind:"text",auto:!0},{id:"websiteCms",label:"Website CMS",kind:"text"},{id:"adsCid",label:"Ads CID",kind:"text",auto:!0},{id:"ga4Id",label:"GA4 Measurement ID",kind:"text"},{id:"specialInstructions",label:"Special instructions",kind:"textarea"},{id:"nextSteps",label:"Next steps",kind:"select",required:!0}],$l=Ea.filter(e=>e.auto).map(e=>e.id),Vo=e=>String(e??"").trim();function Pl(e){return e.completed==="No"?Vo(e.exceptionReason)?[]:["exceptionReason"]:Ea.filter(t=>t.required&&!Vo(e[t.id])).map(t=>t.id)}var Wu="Gerado pelo Cases Wizard";function Yu(e){return e.completed==="No"?[{label:`${Vu}:`,value:`No \u2192 ${Vo(e.exceptionReason)}`}]:Ea.map(t=>({label:`${t.label}:`,value:Vo(e[t.id])||On}))}function Mn(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Bl(e){let t=a=>Mn(a).replace(/\r?\n/g,"<br>");return[`<b>${Mn(Uu)}</b>`,...Yu(e).map(({label:a,value:o})=>`<b>${Mn(a)}</b> ${t(o)}`),`<i>${Mn(Wu)}</i>`].join("<br><br>")}var Xu=/[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+/,Fl=/^[a-z0-9]+(_[a-z0-9]+)+$/;function Ku(e,t){let a=Fl.test(e)?t(e):"";return a||(Fl.test(e)?e.split("_").map(o=>o.charAt(0).toUpperCase()+o.slice(1)).join(" "):e)}function Gl(e={},t=()=>""){let a=n=>{let i=Vo(n);return/^n\/a$/i.test(i)?"":i};return{tasks:[...new Set((e.tasks||[]).map(a).filter(Boolean).map(n=>Ku(n,t)))].join(", "),contactNumber:a(e.phone),email:a(e.email).match(Xu)?.[0]||"",websiteUrl:a(e.website),adsCid:a(e.cid)}}var jl={pt:{headerDesc:"Checklist r\xE1pido antes da liga\xE7\xE3o, direto na nota.",outputNote:"A nota sai sempre em ingl\xEAs, qualquer que seja o idioma da interface.",completed:"Checklist conclu\xEDdo?",exceptionReason:"Motivo da exce\xE7\xE3o",reasonLiveMeet:"Caso Live Meet",reasonLate:"Caso chegou com menos de 1h para a liga\xE7\xE3o",duplicateCase:"Caso duplicado",suite360:"360 Suite",sgtm:"sGTM",api:"API",sellerCc:"Vendedor em c\xF3pia (CC)",tasks:"Task(s)",contactNumber:"Telefone de contato",email:"E-mail",websiteUrl:"URL do site",websiteCms:"CMS do site",adsCid:"Ads CID",ga4Id:"GA4 Measurement ID",specialInstructions:"Instru\xE7\xF5es especiais",nextSteps:"Pr\xF3ximos passos",yes:"Sim",no:"N\xE3o",select:"Selecione\u2026",nextProceed:"Prosseguir",nextOos:"OOS (fora de escopo)",nextInfeasible:"Invi\xE1vel",autoBadge:"Auto",autoBadgeTitle:"Preenchido automaticamente",capturing:"Capturando dados do caso\u2026",capturedOne:"1 campo preenchido automaticamente. Revise antes de usar.",capturedN:"{n} campos preenchidos automaticamente. Revise antes de usar.",captureNone:"Nada encontrado na tela do caso. Preencha \xE0 m\xE3o.",captureFailed:"N\xE3o foi poss\xEDvel ler a tela do caso. Preencha \xE0 m\xE3o.",clear:"Limpar",copy:"Copiar",copied:"Copiado",insert:"Inserir na nota",toastCopied:"Checklist copiado.",toastInserted:"Checklist inserido na nota (e copiado).",needAnswer:"Responda \u201C{field}\u201D antes de continuar.",insertFailed:"N\xE3o foi poss\xEDvel abrir a nota no CRM. O conte\xFAdo j\xE1 est\xE1 copiado \u2014 cole manualmente."},es:{headerDesc:"Checklist r\xE1pido antes de la llamada, directo en la nota.",outputNote:"La nota siempre sale en ingl\xE9s, sea cual sea el idioma de la interfaz.",completed:"\xBFChecklist completado?",exceptionReason:"Motivo de la excepci\xF3n",reasonLiveMeet:"Caso Live Meet",reasonLate:"El caso lleg\xF3 con menos de 1 h para la llamada",duplicateCase:"Caso duplicado",suite360:"360 Suite",sgtm:"sGTM",api:"API",sellerCc:"Vendedor en copia (CC)",tasks:"Task(s)",contactNumber:"Tel\xE9fono de contacto",email:"Correo electr\xF3nico",websiteUrl:"URL del sitio",websiteCms:"CMS del sitio",adsCid:"Ads CID",ga4Id:"GA4 Measurement ID",specialInstructions:"Instrucciones especiales",nextSteps:"Pr\xF3ximos pasos",yes:"S\xED",no:"No",select:"Selecciona\u2026",nextProceed:"Continuar",nextOos:"OOS (fuera de alcance)",nextInfeasible:"Inviable",autoBadge:"Auto",autoBadgeTitle:"Completado autom\xE1ticamente",capturing:"Capturando datos del caso\u2026",capturedOne:"1 campo completado autom\xE1ticamente. Rev\xEDsalo antes de usar.",capturedN:"{n} campos completados autom\xE1ticamente. Rev\xEDsalos antes de usar.",captureNone:"No se encontr\xF3 nada en la pantalla del caso. Compl\xE9talo a mano.",captureFailed:"No se pudo leer la pantalla del caso. Compl\xE9talo a mano.",clear:"Limpiar",copy:"Copiar",copied:"Copiado",insert:"Insertar en la nota",toastCopied:"Checklist copiado.",toastInserted:"Checklist insertado en la nota (y copiado).",needAnswer:"Responde \u201C{field}\u201D antes de continuar.",insertFailed:"No se pudo abrir la nota en el CRM. El contenido ya est\xE1 copiado \u2014 p\xE9galo manualmente."},en:{headerDesc:"Quick checklist before the call, straight into the note.",outputNote:"The note is always written in English, whatever the interface language.",completed:"Checklist completed?",exceptionReason:"Exception reason",reasonLiveMeet:"Live Meet case",reasonLate:"Case arrived <1h before the call",duplicateCase:"Duplicate case",suite360:"360 Suite",sgtm:"sGTM",api:"API",sellerCc:"Seller to be CCed",tasks:"Task(s)",contactNumber:"Contact number",email:"Email",websiteUrl:"Website URL",websiteCms:"Website CMS",adsCid:"Ads CID",ga4Id:"GA4 Measurement ID",specialInstructions:"Special instructions",nextSteps:"Next steps",yes:"Yes",no:"No",select:"Select\u2026",nextProceed:"Proceed",nextOos:"OOS (out of scope)",nextInfeasible:"Infeasible",autoBadge:"Auto",autoBadgeTitle:"Auto-filled",capturing:"Reading the case\u2026",capturedOne:"1 field filled automatically. Review it before using.",capturedN:"{n} fields filled automatically. Review them before using.",captureNone:"Nothing found on the case screen. Fill it in by hand.",captureFailed:"Couldn't read the case screen. Fill it in by hand.",clear:"Clear",copy:"Copy",copied:"Copied",insert:"Insert into note",toastCopied:"Checklist copied.",toastInserted:"Checklist inserted into the note (and copied).",needAnswer:"Answer \u201C{field}\u201D before continuing.",insertFailed:"Couldn't open the note in the CRM. The content is already copied \u2014 paste it manually."}};var Ju="v1.0.0",Hl="Pre-call Checklist",Qu="cw-btn-precall",Zu=110,em=1500,Ul=[{value:"Yes",key:"yes"},{value:"No",key:"no"}],Vl='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>';function mt(e,t,a){let o=document.createElement(e);return t&&(o.className=t),a!=null&&(o.textContent=a),o}var tm=()=>!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);async function am(){await Io();let[e,t]=await Promise.all([gi(),fi()]);return{caseId:await Ja(),tasks:Oa("appointmentTasks"),website:Nt("website"),cid:Fa(),email:e,phone:t}}function Xl(){let e=Wa(jl);om();let t=mt("div");t.id="cw-precall-popup",t.classList.add("cw-module-window"),t.setAttribute("role","dialog"),t.setAttribute("aria-label",Hl),Object.assign(t.style,ft,{width:"520px",height:"800px",display:"flex",flexDirection:"column",borderRadius:"24px"});let a=rt(t,Hl,Ju,e("headerDesc"),{popup:t},()=>V());t.appendChild(a);let o=mt("div","cw-pc-body");t.appendChild(o);let n=mt("p","cw-pc-note"),i=mt("div","cw-pc-status");i.setAttribute("role","status"),i.setAttribute("aria-live","polite"),o.append(n,i);let r={},s={},l=new Set;function p(O,k,{auto:j=!1,numeric:ie=!1}={}){let P=mt("div","cw-pc-field"),X=mt("div","cw-pc-label-row"),ce=mt("label","cw-pc-label");ce.htmlFor=`cw-pc-${O}`,X.appendChild(ce);let v=null;if(j){let d=mt("span","cw-pc-auto");d.innerHTML=Vl,v=mt("span"),d.appendChild(v),X.appendChild(d)}let b=mt(k==="select"?"select":k==="textarea"?"textarea":"input","cw-pc-control");return b.id=`cw-pc-${O}`,k==="text"&&(b.type="text",b.placeholder=On,b.autocomplete="off",b.spellcheck=!1),k==="textarea"&&(b.rows=2,b.placeholder=On,b.spellcheck=!1),ie&&b.classList.add("cw-pc-num"),b.addEventListener("animationend",()=>b.classList.remove("cw-pc-fill")),b.addEventListener("input",()=>{l.delete(O)&&P.classList.remove("is-auto")}),k==="select"&&b.addEventListener("change",()=>b.classList.toggle("is-placeholder",!b.value)),P.append(X,b),r[O]=b,s[O]={row:P,label:ce,badgeText:v,badge:v?.parentElement},P}let c=p("completed","select"),m=p("exceptionReason","select"),u={};Ea.forEach(O=>{u[O.id]=p(O.id,O.kind==="yesno"?"select":O.kind,{auto:O.auto,numeric:["contactNumber","adsCid","ga4Id"].includes(O.id)})});let h=(O,k)=>{let j=mt("div",`cw-pc-grid cols-${O}`);return k.forEach(ie=>j.appendChild(u[ie])),j},L=mt("div","cw-pc-stack");L.append(h(3,Ea.filter(O=>O.kind==="yesno").map(O=>O.id)),u.tasks,h(2,["contactNumber","email"]),h(2,["websiteUrl","websiteCms"]),h(2,["adsCid","ga4Id"]),u.specialInstructions,u.nextSteps),o.append(c,m,L);function S(){let O=r.completed.value==="No";m.hidden=!O,L.hidden=O}r.completed.addEventListener("change",S);let C=mt("div","cw-pc-footer"),D=mt("button","cw-pc-btn is-text"),G=mt("button","cw-pc-btn is-outline"),F=mt("button","cw-pc-btn is-filled");[D,G,F].forEach(O=>{O.type="button"});let R=mt("span","cw-pc-btn-icon");R.innerHTML=Vl;let le=mt("span");G.append(R,le),C.append(D,G,F),t.appendChild(C);function te(O,k,{withPlaceholder:j}){let ie=O.value;if(O.textContent="",j){let P=mt("option",null,e("select"));P.value="",P.disabled=!0,O.appendChild(P)}k.forEach(({value:P,key:X})=>{let ce=mt("option",null,e(X));ce.value=P,O.appendChild(ce)}),O.value=ie||(j?"":k[0].value),O.classList.toggle("is-placeholder",!O.value)}let ee=null,$=!1;function A(){n.textContent=e("outputNote"),s.completed.label.textContent=e("completed"),te(r.completed,Ul,{withPlaceholder:!1}),s.exceptionReason.label.textContent=e("exceptionReason"),te(r.exceptionReason,Rl,{withPlaceholder:!0}),Ea.forEach(k=>{s[k.id].label.textContent=e(k.id),s[k.id].badgeText&&(s[k.id].badgeText.textContent=e("autoBadge"),s[k.id].badge.title=e("autoBadgeTitle")),k.kind==="yesno"&&te(r[k.id],Ul,{withPlaceholder:!0}),k.kind==="select"&&te(r[k.id],zl,{withPlaceholder:!0})}),D.textContent=e("clear"),le.textContent=e($?"copied":"copy"),F.textContent=e("insert"),ee&&y(ee.kind,ee.key,ee.n);let O=t.querySelector(".cw-help-description");O&&(O.textContent=e("headerDesc"))}function y(O,k,j){ee={kind:O,key:k,n:j},i.className=`cw-pc-status ${O?`is-${O}`:""}`,i.textContent=e(k).replace("{n}",j)}let z=0,U=null,M=!1,Z=!1;function de(){G.disabled=F.disabled=M||Z}function ve(){Object.values(r).forEach(O=>{O.value=""}),r.completed.value="Yes",r.completed.classList.remove("is-placeholder"),Object.values(s).forEach(({row:O})=>O.classList.remove("is-auto")),l.clear(),A(),S()}function re(O,k){let j=$l.filter(P=>O[P]&&!r[P].value.trim()),ie=tm();return j.forEach((P,X)=>{window.setTimeout(()=>{if(k!==z)return;let ce=r[P];ce.value.trim()||(ce.value=O[P],l.add(P),s[P].row.classList.add("is-auto"),ie||(ce.classList.remove("cw-pc-fill"),ce.offsetWidth,ce.classList.add("cw-pc-fill")))},ie?0:X*Zu)}),new Set([...l,...j]).size}async function be(){let O=++z,k=`${await Ja()}|${Fa()}`;if(O===z){k!==U&&(ve(),U=k),y("busy","capturing"),M=!0,de();try{let j=await am();if(O!==z)return;let ie=re(Gl(j,P=>Ze[P]?.name),O);ie===0?y("","captureNone"):y("auto",ie===1?"capturedOne":"capturedN",ie)}catch(j){console.warn("Pre-call: n\xE3o foi poss\xEDvel ler a tela do caso:",j),O===z&&y("","captureFailed")}finally{O===z&&(M=!1,de())}}}function pe(){let O={completed:r.completed.value,exceptionReason:r.exceptionReason.value};return Ea.forEach(k=>{O[k.id]=r[k.id].value}),O}function he(){let O=pe(),[k]=Pl(O);return k?(w.playError(),ne(e("needAnswer").replace("{field}",e(k)),{error:!0}),mn(r[k]),null):Bl(O)}function T(){$=!0,G.classList.add("is-done"),le.textContent=e("copied"),window.setTimeout(()=>{$=!1,G.classList.remove("is-done"),le.textContent=e("copy")},em)}function Y(){let O=he();O&&(ta(O),T(),w.playSuccess(),navigator.vibrate&&navigator.vibrate(10),ne(e("toastCopied")))}async function se(){let O=he();if(!O)return;Z=!0,de(),ta(O),V();let k=await Aa();k?(k.focus(),document.execCommand("insertHTML",!1,O),Ca(k),ne(e("toastInserted")),w.playSuccess(),navigator.vibrate&&navigator.vibrate(10)):(w.playError(),ne(e("insertFailed"),{error:!0}),V()),Z=!1,de()}D.addEventListener("click",()=>{w.playClick(),ve(),be()}),G.addEventListener("click",Y),F.addEventListener("click",se);function V(){let O=!ht(t);ct(O,t,Qu),O?(Je(),be()):Qe()}return ve(),je(A),document.body.appendChild(t),V}function om(){if(document.getElementById("cw-precall-styles"))return;let e=mt("style");e.id="cw-precall-styles",e.textContent=`
        #cw-precall-popup { font-family: 'Google Sans', Roboto, sans-serif; color: ${J.text}; }
        #cw-precall-popup [hidden] { display: none !important; }

        #cw-precall-popup .cw-pc-body {
            flex: 1 1 auto; min-height: 0; overflow-y: auto;
            padding: 16px 24px; background: ${J.surface};
            display: flex; flex-direction: column; gap: 16px;
        }
        #cw-precall-popup .cw-pc-note { margin: 0; font-size: 12px; line-height: 16px; color: ${J.textSub}; }

        #cw-precall-popup .cw-pc-status {
            display: flex; align-items: center; gap: 8px; min-height: 16px;
            font-size: 12px; line-height: 16px; color: ${J.textSub};
        }
        #cw-precall-popup .cw-pc-status::before {
            content: ''; flex: 0 0 8px; width: 8px; height: 8px; border-radius: 50%;
            background: #9aa0a6; transition: background-color 0.2s ease;
        }
        #cw-precall-popup .cw-pc-status.is-auto::before,
        #cw-precall-popup .cw-pc-status.is-busy::before { background: ${J.primary}; }
        #cw-precall-popup .cw-pc-status.is-busy::before { animation: cw-pc-pulse 1s ease-in-out infinite; }
        @keyframes cw-pc-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        #cw-precall-popup .cw-pc-stack { display: flex; flex-direction: column; gap: 16px; }
        #cw-precall-popup .cw-pc-grid { display: grid; gap: 16px; }
        #cw-precall-popup .cw-pc-grid.cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        #cw-precall-popup .cw-pc-grid.cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        #cw-precall-popup .cw-pc-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        #cw-precall-popup .cw-pc-label-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 16px; }
        #cw-precall-popup .cw-pc-label {
            min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
            font-size: 12px; line-height: 16px; font-weight: 500; color: ${J.textSub};
        }

        #cw-precall-popup .cw-pc-auto {
            display: none; align-items: center; gap: 4px; white-space: nowrap;
            font-size: 11px; line-height: 16px; color: ${J.primary};
        }
        #cw-precall-popup .cw-pc-auto svg { width: 12px; height: 12px; fill: currentColor; flex-shrink: 0; }
        #cw-precall-popup .cw-pc-field.is-auto .cw-pc-auto { display: inline-flex; }

        #cw-precall-popup .cw-pc-control {
            width: 100%; box-sizing: border-box; min-height: 40px; padding: 8px 12px;
            border: 1px solid transparent; border-radius: 8px;
            background-color: ${J.bgInput}; color: ${J.text};
            font: 400 14px/20px 'Google Sans', Roboto, sans-serif; outline: none;
            transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        #cw-precall-popup .cw-pc-control:hover { background-color: #f1f3f4; }
        #cw-precall-popup .cw-pc-control:focus-visible {
            background-color: #fff; border-color: ${J.primary}; box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.15);
        }
        #cw-precall-popup .cw-pc-control::placeholder { color: #70757a; }
        #cw-precall-popup textarea.cw-pc-control { resize: vertical; min-height: 64px; }
        #cw-precall-popup .cw-pc-num { font-variant-numeric: tabular-nums; }
        #cw-precall-popup select.cw-pc-control {
            appearance: none; -webkit-appearance: none; cursor: pointer; padding-right: 36px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235f6368' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
            background-repeat: no-repeat; background-position: right 12px center; background-size: 16px;
        }
        #cw-precall-popup select.cw-pc-control.is-placeholder { color: #70757a; }

        /* Campo que acabou de ser preenchido pela captura: entra do fundo e o
           realce azul se dissolve. S\xF3 opacity/transform/cor, sem overshoot. */
        @keyframes cw-pc-fill {
            0%   { opacity: 0; transform: translateY(4px); background-color: ${J.primaryBg}; }
            50%  { opacity: 1; transform: translateY(0); background-color: ${J.primaryBg}; }
            100% { opacity: 1; transform: translateY(0); background-color: ${J.bgInput}; }
        }
        #cw-precall-popup .cw-pc-control.cw-pc-fill { animation: cw-pc-fill 700ms cubic-bezier(0.2, 0, 0, 1) both; }

        #cw-precall-popup .cw-pc-footer {
            flex: 0 0 auto; display: flex; align-items: center; gap: 8px; padding: 16px 24px;
            background: ${J.surface}; border-top: 1px solid rgba(0, 0, 0, 0.06);
        }
        #cw-precall-popup .cw-pc-btn {
            height: 40px; padding: 0 20px; border: 1px solid transparent; border-radius: 100px;
            display: inline-flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer;
            font: 500 14px/20px 'Google Sans', Roboto, sans-serif;
            transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
        }
        #cw-precall-popup .cw-pc-btn:focus-visible { outline: 2px solid ${J.primary}; outline-offset: 2px; }
        #cw-precall-popup .cw-pc-btn:disabled { opacity: 0.5; cursor: default; }
        #cw-precall-popup .cw-pc-btn.is-text { margin-right: auto; padding: 0 12px; background: transparent; color: ${J.textSub}; }
        #cw-precall-popup .cw-pc-btn.is-text:hover { background: ${J.bgInput}; color: ${J.text}; }
        #cw-precall-popup .cw-pc-btn.is-outline { background: #fff; color: ${J.primary}; border-color: rgba(26, 115, 232, 0.4); }
        #cw-precall-popup .cw-pc-btn.is-outline:hover:not(:disabled) { background: ${J.primaryBg}; }
        #cw-precall-popup .cw-pc-btn.is-filled { background: ${J.primary}; color: #fff; box-shadow: 0 1px 2px rgba(26, 115, 232, 0.3); }
        #cw-precall-popup .cw-pc-btn.is-filled:hover:not(:disabled) { background: #1765cc; }
        #cw-precall-popup .cw-pc-btn.is-outline.is-done { background: #e6f4ea; color: #137333; border-color: rgba(19, 115, 51, 0.4); }
        #cw-precall-popup .cw-pc-btn-icon { display: none; }
        #cw-precall-popup .cw-pc-btn-icon svg { width: 16px; height: 16px; fill: currentColor; display: block; }
        #cw-precall-popup .cw-pc-btn.is-done .cw-pc-btn-icon { display: inline-flex; }

        @media (prefers-reduced-motion: reduce) {
            #cw-precall-popup .cw-pc-control.cw-pc-fill,
            #cw-precall-popup .cw-pc-status.is-busy::before { animation: none; }
        }
    `,document.head.appendChild(e)}var Kl={_templates:null,_hydrated:!1,async getTemplates(){return this._templates?this._templates:(this._hydrated||(this._hydrated=!0,await Sl()),this._templates=Nn,this._templates)}};var Jl={pt:"Sem t\xEDtulo",es:"Sin t\xEDtulo",en:"Untitled"},Ql={pt:"Erro: Usu\xE1rio n\xE3o identificado.",es:"Error: usuario no identificado.",en:"Error: user not identified."},Zl="cw_personal_library_v1",po=!1,kt={getSnippets:(e="all")=>{let t=kt._loadFromLocal(),a=it();return a&&a.includes("@")&&!po&&kt._syncWithServer(a),e==="all"?t:t.filter(o=>o.type===e)},save:async e=>{let t=it();if(!t)return w.playError(),ne(Ql[ge()]||Ql.pt,{error:!0}),!1;po=!0;let a=kt._loadFromLocal(),o=new Date().toISOString(),n={id:e.id||"local_"+Date.now(),type:e.type||"general",title:e.title||Jl[ge()]||Jl.pt,content:e.content||"",subject:e.subject||"",isCode:e.isCode||!1,isRich:e.isRich||!1,updated:o,_pendingSync:!0},i=a.filter(l=>l.id!==n.id);i.unshift(n),kt._saveToLocal(i);let r=!1;try{r=await ke.saveSnippet(n,t),r?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais.")}catch(l){console.error("Erro na nuvem:",l)}finally{setTimeout(()=>{po=!1},2e3)}n._pendingSync=!r;let s=kt._loadFromLocal().filter(l=>l.id!==n.id);return s.unshift(n),kt._saveToLocal(s),{...n,synced:r}},delete:async e=>{let t=it();po=!0;let o=kt._loadFromLocal().filter(n=>n.id!==e);return kt._saveToLocal(o),t?ke.deleteSnippet(e,t).then(()=>{setTimeout(()=>{po=!1},2e3)}):po=!1,!0},_syncWithServer:async e=>{if(window._cw_library_syncing)return;window._cw_library_syncing=!0,setTimeout(()=>{window._cw_library_syncing=!1},3e4),console.log("\u{1F504} Sincronizando biblioteca...");let t=await ke.getUserSnippets(e);if(t&&t.status==="success"&&Array.isArray(t.snippets)){let a=t.snippets,o=kt._loadFromLocal(),i=[...o.filter(l=>l._pendingSync),...a],r=JSON.stringify(i),s=JSON.stringify(o);r!==s&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),kt._saveToLocal(i))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(Zl)||"[]")}catch{return[]}},_saveToLocal:e=>{localStorage.setItem(Zl,JSON.stringify(e))}};var ec={pt:{headerTitle:"Email Assistant",headerDesc:"Refatora\xE7\xE3o completa do m\xF3dulo de e-mail para uma experi\xEAncia moderna e eficiente.",searchPlaceholder:"Buscar templates...",previewTitle:"Preview do E-mail",noSubject:"Sem Assunto",emailCopiedToast:"E-mail copiado com sucesso!",copyErrorToast:"Erro ao copiar e-mail",fillErrorToast:"Erro ao preencher e-mail",smartCrErrorToast:"Erro ao aplicar Smart CR",personalCategory:"Pessoal",copyHtml:"Copiar HTML",fillInCrm:"Preencher no CRM",loading:"Carregando...",noResults:"Nenhum resultado para",emptyTitle:"Pronto para come\xE7ar?",emptyHint:"Selecione um template \xE0 esquerda para<br>gerar o seu e-mail t\xE9cnico.",smartCrPreview:"Este atalho ir\xE1 preencher automaticamente os destinat\xE1rios e abrir o menu de Canned Responses do CRM.",smartCrHint:"Este \xE9 um <b>Smart CR</b>. Clique no bot\xE3o laranja acima para aplicar o atalho diretamente no CRM."},es:{headerTitle:"Email Assistant",headerDesc:"Refactorizaci\xF3n completa del m\xF3dulo de email para una experiencia moderna y eficiente.",searchPlaceholder:"Buscar plantillas...",previewTitle:"Vista Previa del Email",noSubject:"Sin Asunto",emailCopiedToast:"\xA1Email copiado con \xE9xito!",copyErrorToast:"Error al copiar el email",fillErrorToast:"Error al completar el email",smartCrErrorToast:"Error al aplicar Smart CR",personalCategory:"Personal",copyHtml:"Copiar HTML",fillInCrm:"Rellenar en el CRM",loading:"Cargando...",noResults:"Sin resultados para",emptyTitle:"\xBFListo para empezar?",emptyHint:"Seleccione una plantilla a la izquierda para<br>generar su email t\xE9cnico.",smartCrPreview:"Este atajo rellenar\xE1 autom\xE1ticamente los destinatarios y abrir\xE1 el men\xFA de Canned Responses del CRM.",smartCrHint:"Este es un <b>Smart CR</b>. Haga clic en el bot\xF3n naranja de arriba para aplicar el atajo directamente en el CRM."},en:{headerTitle:"Email Assistant",headerDesc:"A complete rebuild of the email module for a modern, efficient experience.",searchPlaceholder:"Search templates...",previewTitle:"Email Preview",noSubject:"No Subject",emailCopiedToast:"Email copied successfully!",copyErrorToast:"Error copying the email",fillErrorToast:"Error filling in the email",smartCrErrorToast:"Error applying Smart CR",personalCategory:"Personal",copyHtml:"Copy HTML",fillInCrm:"Fill in CRM",loading:"Loading...",noResults:"No results for",emptyTitle:"Ready to start?",emptyHint:"Select a template on the left to<br>generate your technical email.",smartCrPreview:"This shortcut will automatically fill in the recipients and open the CRM's Canned Responses menu.",smartCrHint:"This is a <b>Smart CR</b>. Click the orange button above to apply the shortcut directly in the CRM."}};function at(e){let t=ge();return ec[t]?.[e]??ec.pt[e]}var Vi="\u{1F464} Pessoal";function nm(e){return e===Vi?`\u{1F464} ${at("personalCategory")}`:e}var Ue={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",warning:"#E67E22",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"};function im(){if(document.getElementById("cw-email-styles"))return;let e=document.createElement("style");e.id="cw-email-styles",e.textContent=`
        #email-template-list::-webkit-scrollbar { width: 4px; }
        #email-template-list::-webkit-scrollbar-track { background: transparent; }
        #email-template-list::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.1); border-radius: 10px; }
        #email-template-list::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.2); }

        @keyframes cw-floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .cw-animate-float { animation: cw-floating 3s ease-in-out infinite; }

        .cw-email-popup {
            width: 850px; height: 650px;
            font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
            border-radius: 12px; overflow: hidden;
        }
        .cw-email-main { display: flex; flex: 1; overflow: hidden; background-color: ${Ue.bgApp}; }

        /* --- PAINEL ESQUERDO --- */
        .cw-email-left-panel { width: 320px; background-color: #EFEFF0; border-right: 1px solid ${Ue.borderSubtle}; display: flex; flex-direction: column; flex-shrink: 0; }
        .cw-email-search-container { padding: 16px; border-bottom: 1px solid ${Ue.borderSubtle}; position: relative; }
        .cw-email-search-input {
            width: 100%; box-sizing: border-box; padding: 10px 14px 10px 36px;
            border-radius: 10px; border: 1.5px solid transparent; background-color: #E3E3E8;
            font-size: 15px; outline: none; color: ${Ue.textPrimary};
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238A8A8E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
            background-repeat: no-repeat; background-position: 12px center;
            transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
        }
        .cw-email-search-input:focus {
            background-color: #FFFFFF; border-color: ${Ue.primary};
            box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1); transform: scale(1.02);
        }
        .cw-email-clear-btn {
            position: absolute; right: 26px; top: 50%; transform: translateY(-50%);
            font-size: 10px; color: #fff; cursor: pointer; display: none;
            background-color: #C7C7CC; width: 16px; height: 16px; border-radius: 50%;
            text-align: center; line-height: 16px; font-weight: bold;
        }

        #email-template-list { flex: 1; overflow-y: auto; padding: 8px; scroll-behavior: smooth; }

        .cw-email-list-empty { padding: 40px 20px; text-align: center; color: ${Ue.textSecondary}; opacity: 0.6; }
        .cw-email-list-empty-icon { font-size: 32px; margin-bottom: 12px; }
        .cw-email-list-empty-text { font-size: 14px; font-weight: 500; }

        .cw-email-cat-header {
            padding: 12px 16px 12px 24px; font-size: 11px; font-weight: 700; color: ${Ue.textSecondary};
            text-transform: uppercase; letter-spacing: 0.8px; position: sticky; top: -8px;
            background-color: rgba(239, 239, 240, 0.9); z-index: 10; backdrop-filter: blur(20px);
            margin: 0 -8px 8px -8px; border-bottom: 0.5px solid ${Ue.borderSubtle};
            cursor: pointer; display: flex; align-items: center; justify-content: space-between;
            user-select: none; transition: background-color 0.2s ease;
        }
        .cw-email-cat-header:hover { background-color: rgba(230, 230, 232, 0.9); }
        .cw-email-cat-header:focus-visible, .cw-email-list-item:focus-visible { outline: 2px solid ${Ue.primary}; outline-offset: -2px; }
        .cw-email-cat-right { display: flex; align-items: center; }
        .cw-email-cat-badge { background-color: rgba(0, 0, 0, 0.05); padding: 2px 8px; border-radius: 10px; font-size: 10px; color: ${Ue.textSecondary}; }
        .cw-email-cat-arrow { margin-left: 8px; transition: transform 0.3s ease; }

        .cw-email-list-item {
            padding: 12px 14px; font-size: 14px; cursor: pointer;
            transition: background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1), transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s cubic-bezier(0.25, 1, 0.5, 1), color 0.3s cubic-bezier(0.25, 1, 0.5, 1); border-radius: 10px;
            color: ${Ue.textPrimary}; margin: 4px 6px; display: flex; align-items: center; gap: 12px;
            background-color: ${Ue.bgSurface}; box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            border: 1px solid ${Ue.borderSubtle}; position: relative; overflow: hidden;
        }
        .cw-email-list-item:hover:not(.selected) {
            /* Sem transform aqui: itens empilhados verticalmente e bem juntos
               s\xE3o o caso cl\xE1ssico de flicker de hover quando o pr\xF3prio item
               se desloca. Sombra/borda j\xE1 comunicam o hover sem mover nada. */
            background-color: #f8f8f9;
            box-shadow: 0 4px 8px rgba(0,0,0,0.08); border-color: rgba(0, 122, 255, 0.2);
        }
        .cw-email-list-item:active:not(.selected) { transform: scale(0.98); }
        .cw-email-list-item.selected {
            background-color: ${Ue.primary}; box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
            border: none; color: #fff; font-weight: 600;
        }
        .cw-email-list-item.selected:active { transform: scale(0.97); }
        .cw-email-list-indicator { position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background-color: #fff; border-radius: 0 4px 4px 0; }
        .cw-email-list-icon { font-size: 12px; opacity: 0.7; flex-shrink: 0; }
        .cw-email-list-item.selected .cw-email-list-icon { opacity: 1; }
        .cw-email-list-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }

        /* --- PAINEL DIREITO --- */
        /* 0.15s bate com o setTimeout de selectTemplate() (linha ~476) - o
           swap de conte\xFAdo acontece exatamente quando o fade-out termina,
           n\xE3o no meio dele. */
        .cw-email-right-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; background-color: ${Ue.bgApp}; transition: opacity 0.15s ease, transform 0.15s ease; }
        .cw-email-fields-section { padding: 20px; border-bottom: 1px solid ${Ue.borderSubtle}; background-color: ${Ue.bgSurface}; max-height: 250px; overflow-y: auto; display: none; }
        .cw-email-fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .cw-email-field-label { display: block; font-size: 11px; font-weight: 700; color: ${Ue.textSecondary}; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-email-field-input {
            width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px;
            border: 1.5px solid ${Ue.borderSubtle}; background-color: #FBFBFD; font-size: 14px;
            transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease; outline: none;
        }
        .cw-email-field-input:focus { border-color: ${Ue.primary}; background-color: #FFFFFF; box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1); }

        .cw-email-smartcr-hint {
            padding: 12px; font-size: 13px; color: #856404; background: #FFF3CD; border: 1px solid #FFEEBA;
            border-radius: 8px; display: flex; align-items: center; gap: 8px;
        }
        .cw-email-smartcr-hint-icon { font-size: 18px; }

        .cw-email-preview-section { flex: 1; display: flex; flex-direction: column; padding: 20px; background-color: ${Ue.bgApp}; overflow: hidden; }
        .cw-email-preview-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .cw-email-preview-title { font-size: 12px; font-weight: 600; color: ${Ue.textSecondary}; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-email-preview-actions { display: flex; gap: 8px; }
        .cw-email-preview-content {
            flex: 1; background-color: ${Ue.bgSurface}; border: 1px solid ${Ue.borderSubtle};
            border-radius: 8px; padding: 20px; font-size: 15px; line-height: 1.6; color: ${Ue.textPrimary};
            overflow-y: auto; outline: none; box-shadow: inset 0 1px 2px rgba(0,0,0,0.02);
        }

        /* --- BOT\xD5ES DE A\xC7\xC3O --- */
        .cw-email-btn {
            padding: 8px 14px; border-radius: 10px; border: 1.5px solid ${Ue.primary};
            background: transparent; color: ${Ue.primary}; font-size: 13px; font-weight: 600;
            cursor: pointer; transition: background-color 0.2s cubic-bezier(0.25, 1, 0.5, 1), transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .cw-email-btn:hover { background-color: rgba(0, 122, 255, 0.05); }
        .cw-email-btn:active { transform: scale(0.94); }
        .cw-email-btn.primary {
            border: none; background: ${Ue.primary}; color: #fff;
            box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }
        .cw-email-btn.primary:hover { background-color: #0062CC; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0, 122, 255, 0.4); }
        .cw-email-btn.warning { border-color: ${Ue.warning}; color: ${Ue.warning}; display: none; }
        .cw-email-btn.warning:hover { background-color: rgba(230, 126, 34, 0.08); }

        @media (prefers-reduced-motion: reduce) {
            .cw-animate-float { animation: none !important; }
            .cw-email-search-input, .cw-email-list-item, .cw-email-btn, .cw-email-right-panel {
                transition: opacity 0.15s ease, background-color 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}function rm(e,t){return e.map(a=>yl(a,Et())).filter(a=>a.name.toLowerCase().includes(t.toLowerCase())||a.category.toLowerCase().includes(t.toLowerCase()))}function sm(e){return Object.entries(ra).filter(([t,a])=>a&&(t.toLowerCase().includes(e.toLowerCase())||a.toLowerCase().includes(e.toLowerCase()))).map(([t,a])=>({id:t,name:t.replace(/_/g," "),category:"\u26A1 Smart CRs",code:a,isSmartCR:!0}))}function lm(e){return kt.getSnippets("email").filter(t=>t.title.toLowerCase().includes(e.toLowerCase())||t.subject&&t.subject.toLowerCase().includes(e.toLowerCase())).map(t=>{let a=[],o=t.content.match(/\[([^\]]+)\]/g);return o&&[...new Set(o)].forEach(n=>{a.push({key:n,label:n.replace("[","").replace("]",""),type:n.toLowerCase().includes("data")?"date":"text",auto:n.toLowerCase().includes("nome")&&n.toLowerCase().includes("seu")?"agentName":null})}),{id:t.id||`snippet-${Math.random()}`,name:t.title,category:Vi,subject:t.subject||at("noSubject"),template:t.content,placeholders:a}})}function cm(e,t){return[...rm(e,t),...sm(t),...lm(t)]}function tc(){let e="v6.0.0",t=!1,a=[],o=null,n="",i=new Set;im();let r=document.createElement("div");r.id="email-assistant-popup",r.classList.add("cw-module-window","cw-email-popup"),Object.assign(r.style,ft,{width:"850px",height:"650px"}),r.style.display="none",r.style.flexDirection="column";let s=rt(r,at("headerTitle"),e,at("headerDesc"),{popup:r},()=>y()),l=document.createElement("div");l.className="cw-email-main";let p=document.createElement("div");p.className="cw-email-left-panel";let c=document.createElement("div");c.className="cw-email-search-container";let m=document.createElement("input");m.className="cw-email-search-input",m.placeholder=at("searchPlaceholder");let u=document.createElement("div");u.id="email-template-list",un(u,".cw-email-cat-header, .cw-email-list-item");let h=document.createElement("div");h.className="cw-email-clear-btn",h.innerHTML="\u2715",h.onclick=()=>{m.value="",n="",h.style.display="none",Z(),m.focus()},c.appendChild(m),c.appendChild(h),p.appendChild(c),p.appendChild(u);let L=document.createElement("div");L.className="cw-email-right-panel";let S=document.createElement("div");S.className="cw-email-fields-section";let C=document.createElement("div");C.className="cw-email-preview-section";let D=document.createElement("div");D.className="cw-email-preview-header";let G=document.createElement("span");G.textContent=at("previewTitle"),G.className="cw-email-preview-title";let F=document.createElement("div");F.className="cw-email-preview-actions";let R=(pe,he=!1)=>{let T=document.createElement("button");return T.textContent=pe,T.className="cw-email-btn"+(he?" primary":""),T},le=R(at("copyHtml")),te=R(at("fillInCrm"),!0),ee=R("Smart CR");ee.classList.add("warning"),F.appendChild(ee),F.appendChild(le),F.appendChild(te),D.appendChild(G),D.appendChild(F);let $=document.createElement("div");$.contentEditable="true",$.className="cw-email-preview-content",C.appendChild(D),C.appendChild($),be(),L.appendChild(S),L.appendChild(C),l.appendChild(p),l.appendChild(L),r.appendChild(s),r.appendChild(l);let A=document.createElement("div");Object.assign(A.style,Yt),r.appendChild(A),Xt(r,A),document.body.appendChild(r);function y(){t=!ht(r),t?(Je(),r.style.display="flex",ks(r),a.length===0&&z()):(Qe(),r.style.display="none"),ct(t,r,"cw-btn-email")}async function z(){u.innerHTML='<div style="padding: 20px; text-align: center; color: #5f6368;">'+at("loading")+"</div>",a=await Kl.getTemplates(),Z()}function U(pe,he,T){let Y=document.createElement("div");Y.className="cw-email-cat-header",Y.tabIndex=0,Y.setAttribute("role","button"),Y.setAttribute("aria-expanded",String(T));let se=document.createElement("span");se.textContent=nm(pe),Y.appendChild(se);let V=document.createElement("span");V.className="cw-email-cat-badge",V.textContent=he;let O=document.createElement("span");O.className="cw-email-cat-arrow",O.textContent=T?"\u25BE":"\u25B8";let k=document.createElement("div");return k.className="cw-email-cat-right",k.appendChild(V),k.appendChild(O),Y.appendChild(k),Y.onclick=()=>{i.has(pe)?i.delete(pe):i.add(pe),Z()},Y.addEventListener("keydown",j=>{(j.key==="Enter"||j.key===" ")&&(j.preventDefault(),Y.click())}),Y}function M(pe){let he=o&&o.id===pe.id,T=document.createElement("div");if(T.className="cw-email-list-item"+(he?" selected":""),T.tabIndex=0,T.setAttribute("role","button"),T.setAttribute("aria-pressed",String(!!he)),he){let V=document.createElement("div");V.className="cw-email-list-indicator",T.appendChild(V)}let Y=document.createElement("span");Y.className="cw-email-list-icon",Y.innerHTML=pe.isSmartCR?"\u26A1":pe.category===Vi?"\u{1F464}":"\u{1F4C4}",T.appendChild(Y);let se=document.createElement("span");return se.className="cw-email-list-text",se.textContent=pe.name,T.appendChild(se),T.onclick=()=>ve(pe),T.addEventListener("keydown",V=>{(V.key==="Enter"||V.key===" ")&&(V.preventDefault(),T.click())}),T}function Z(){u.innerHTML="";let pe=cm(a,n);if(pe.length===0){u.innerHTML=`
                <div class="cw-email-list-empty">
                    <div class="cw-email-list-empty-icon">\u{1F50D}</div>
                    <div class="cw-email-list-empty-text">${at("noResults")} "${n}"</div>
                </div>`;return}[...new Set(pe.map(T=>T.category))].sort((T,Y)=>T.localeCompare(Y)).forEach(T=>{let Y=i.has(T)||n.length>0,se=pe.filter(V=>V.category===T);u.appendChild(U(T,se.length,Y)),Y&&se.forEach(V=>{u.appendChild(M(V))})})}let de=null;async function ve(pe){o?.id!==pe.id&&(o=pe,de&&clearTimeout(de),L.style.opacity="0",L.style.transform="translateY(5px)",de=setTimeout(()=>{ee.style.display=pe.isSmartCR?"block":"none",te.style.display=pe.isSmartCR?"none":"block",le.style.display=pe.isSmartCR?"none":"block",Z(),re(),be(),L.style.opacity="1",L.style.transform="translateY(0)",de=null},150))}function re(){if(S.innerHTML="",!o||o.isSmartCR){o?.isSmartCR?(S.style.display="block",S.innerHTML=`<div class="cw-email-smartcr-hint">
                    <span class="cw-email-smartcr-hint-icon">\u{1F4A1}</span>
                    <span>${at("smartCrHint")}</span>
                </div>`):S.style.display="none";return}let pe=o.placeholders&&o.placeholders.length>0;if(S.style.display=pe?"block":"none",!pe)return;let he=document.createElement("div");he.className="cw-email-fields-grid",(o.placeholders||[]).forEach(T=>{let Y=document.createElement("div"),se=document.createElement("label");se.className="cw-email-field-label",se.textContent=T.label;let V=document.createElement("input");V.className="cw-email-field-input",V.type=T.type||"text",V.dataset.key=T.key,T.auto==="agentName"&&(V.value=Do().split(" ")[0]),V.addEventListener("input",be),Y.appendChild(se),Y.appendChild(V),he.appendChild(Y)}),S.appendChild(he)}function be(){if(!o){$.innerHTML=`
                <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center;">
                    <div class="cw-animate-float" style="width: 140px; height: 140px; margin-bottom: 24px;">
                        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="60" cy="60" r="55" fill="#f8f9fa"/>
                            <!-- Envelope Base -->
                            <path d="M30 40C30 37.7909 31.7909 36 34 36H86C88.2091 36 90 37.7909 90 40V80C90 82.2091 88.2091 84 86 84H34C31.7909 84 30 82.2091 30 80V40Z" fill="white" stroke="#e8eaed" stroke-width="2"/>
                            <!-- Detalhes decorativos (paleta Apple do m\xF3dulo, n\xE3o mais as cores oficiais do Google) -->
                            <path d="M30 40L60 60L90 40" stroke="${Ue.primary}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M30 80L50 65" stroke="#FF3B30" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <path d="M90 80L70 65" stroke="#FF9500" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <!-- Small Floating icons -->
                            <circle cx="95" cy="30" r="8" fill="#34C759"/>
                            <path d="M92 30H98M95 27V33" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            <rect x="20" y="70" width="12" height="12" rx="3" fill="${Ue.primary}" opacity="0.8"/>
                        </svg>
                    </div>
                    <div style="font-family: 'Google Sans', sans-serif; font-size: 18px; font-weight: 600; color: ${Ue.textPrimary}; margin-bottom: 8px;">
                        ${at("emptyTitle")}
                    </div>
                    <div style="font-size: 14px; color: ${Ue.textSecondary}; line-height: 1.6; max-width: 280px; margin: 0 auto;">
                        ${at("emptyHint")}
                    </div>
                </div>`;return}if(o.isSmartCR){$.innerHTML=`<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">\u26A1</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${o.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">${at("smartCrPreview")}</div></div>`;return}let pe=o.template;(S.querySelectorAll("input")||[]).forEach(T=>{let Y=T.dataset.key,se=T.value;if(T.type==="date"&&se){let[O,k,j]=se.split("-");se=`${k}/${j}/${O}`}se=se||`<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${Y}</span>`;let V=Y.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");pe=pe.replace(new RegExp(V,"g"),se)}),$.innerHTML=pe}return m.addEventListener("input",pe=>{n=pe.target.value,h.style.display=n?"block":"none",Z()}),le.onclick=()=>{let pe=$.innerHTML,he=new Blob([pe],{type:"text/html"}),T=$.innerText,Y=[new ClipboardItem({"text/html":he,"text/plain":new Blob([T],{type:"text/plain"})})];navigator.clipboard.write(Y).then(()=>ne(at("emailCopiedToast")),()=>{w.playError(),ne(at("copyErrorToast"),{error:!0})})},te.onclick=async()=>{if(!o)return;let pe=Pa(),he={...o,body:$.innerHTML};try{await El(he),y()}catch{w.playError(),ne(at("fillErrorToast"),{error:!0})}finally{pe()}},ee.onclick=async()=>{if(!o||!o.isSmartCR)return;let pe=Pa();try{await co(o.code),y()}catch{w.playError(),ne(at("smartCrErrorToast"),{error:!0})}finally{pe()}},je(()=>{let pe=r.querySelector(".cw-help-title");pe&&(pe.textContent=at("headerTitle"));let he=r.querySelector(".cw-help-description");he&&(he.textContent=at("headerDesc")),m.placeholder=at("searchPlaceholder"),G.textContent=at("previewTitle"),le.textContent=at("copyHtml"),te.textContent=at("fillInCrm"),a.length&&Z(),(!o||o.isSmartCR)&&(re(),be())}),y}var ac=["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],oc=["Offer implementation via Tag Support (Temporary Access)","Send and walk through acceptance of the 'Consent and authorization...' email","Confirm the access was received","Start the setup (warn about ~10min of silence)","[If declined] Continue with Screen Sharing"],dm={inicio:{PT:"Abertura",ES:"Apertura",EN:"Opening"},meio:{PT:"Implementa\xE7\xE3o (Tag Support)",ES:"Implementaci\xF3n",EN:"Implementation (Tag Support)"},fim:{PT:"Fechamento",ES:"Cierre",EN:"Closing"}};function ic(e,t){let a=dm[e];return a?.[t]||a?.PT||""}var uo={"PT BAU":{inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:ac,fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:ac,fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{inicio:["Introducci\xF3n (Nombre y Equipo).","La llamada puede ser grabada con fines de entrenamiento y calidad de acuerdo con nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xF3n.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar contenido sensible antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos pasos (\xBFCu\xE1nto tiempo seguir\xE1 el caso?)","Encuesta de Satisfacci\xF3n.","Estar\xE9 monitoreando su caso durante XX d\xEDas para asegurarme de que todo est\xE9 funcionando correctamente. Durante este tiempo, nuestro equipo de calidad podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la cuenta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condiciones.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las herramientas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfacci\xF3n.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes d\xEDas."]},"EN BAU":{inicio:["Introduction (Name and Team)","Recording notice and Privacy Policy","Confirm the CID and the email","(Optional) Validate the account authentication via link","Confirm the Task and the AM","State the call duration (30-45 min)","Ask them to close sensitive content (before sharing)","Validate the backup and admin access"],meio:oc,fim:["Call summary (what was done and how it works)","Offer further help / Open the floor for questions","Ask them to stop sharing their screen","Next steps (Follow-up for XX days)","Ask for consent for the QA test","Align on scope (Technical vs. Account Manager)","Satisfaction Survey (and confirm the email to send it to)","Sign-off"]},"EN LT":{inicio:["Hello [...], I am [...], and I am part of the Google Technical Solutions Team. How are you?","Our call may be recorded for training, quality and service improvement purposes, in line with our Privacy Policy.","For security reasons, I need you to give me your email and the CID (or number) of the Ads account, please","Confirm the Task and the AM","The consultation lasts around 30 to 45 minutes.","Please share your screen using the \u201CFull Screen\u201D option","Please close any and all confidential and sensitive content (conversations, important personal data, etc).","Do you have a backup of your site and all the access to the Google tools?"],meio:oc,fim:["Call summary (what was done and how it works)","Offer further help / Open the floor for questions","Ask them to stop sharing their screen","Next steps (Follow-up for XX days)","During that time, our quality team may run a conversion test to validate the implementation. Do you agree to that test so we can confirm the implementation is effective?","Align on scope (Technical vs. Account Manager)","Satisfaction Survey (and confirm the email to send it to)","Sign-off"]}},pm=["inicio","meio","fim"];function nc(e){if(!Array.isArray(e)||!e.length)return!1;let t={},a=e.slice().sort((o,n)=>(o.sortOrder||0)-(n.sortOrder||0));for(let o of a){let n=(o.lang||"").toUpperCase(),i=o.key||"",r=o.field||"",s=o.value||"";if(!n||!i||!pm.includes(r)||!s)continue;let l=`${n} ${i}`;t[l]||(t[l]={}),(t[l][r]=t[l][r]||[]).push(s)}if(!Object.keys(t).length)return!1;for(let o of Object.keys(uo))delete uo[o];return Object.assign(uo,t),!0}async function rc(e){let t=ke.getCachedContent("call_script");nc(t)&&e?.();try{let a=await ke.fetchContentModule("call_script");nc(a)&&e?.()}catch(a){console.warn("Central de Conte\xFAdo indispon\xEDvel; usando roteiro embutido.",a)}}var qn={pt:{headerTitle:"Call Script",headerDesc:"Guia interativo para condu\xE7\xE3o de chamadas.",loading:"Carregando...",unknownClient:"Cliente Desconhecido",notFound:"N\xE3o encontrado",activeMonitoring:"Monitoramento Ativo",cidLabel:"CID (Conta)",emailLabel:"Email de Contato",copied:"Copiado!",amMessageTitle:"Mensagem AM",amMessageSub:"Gerar aviso de insucesso",copyFinalMessage:"Copiar Mensagem Final",resize:"Redimensionar",resetScript:"Resetar Script",resetConfirm:"Resetar todo o progresso do script? Essa a\xE7\xE3o n\xE3o pode ser desfeita.",resetConfirmBtn:"Resetar",scriptNotConfigured:"Script n\xE3o configurado.",messageCopiedToast:"Mensagem copiada!",amMessage:(e,t)=>`Ol\xE1. Bom dia!

Estou com um caso do seu cliente (${e.advertiserName||"Cliente"}) em andamento hoje (${t}). Fiz a primeira tentativa de contato agora h\xE1 pouco, mas n\xE3o tive sucesso.

Farei uma nova tentativa em alguns minutos. Caso ele n\xE3o atenda novamente, seguirei com o e-mail padr\xE3o de reagendamento/no-show e te mantenho no radar.

Dados do caso para seu controle:

Cliente: ${e.advertiserName||"---"}
CID: ${e.cid||"---"}
Case ID: ${e.caseId||"---"}
E-mail: ${e.clientEmail||"---"}`,dateLocale:"pt-BR"},es:{headerTitle:"Call Script",headerDesc:"Gu\xEDa interactiva para conducir llamadas.",loading:"Cargando...",unknownClient:"Cliente Desconocido",notFound:"No encontrado",activeMonitoring:"Monitoreo Activo",cidLabel:"CID (Cuenta)",emailLabel:"Email de Contacto",copied:"\xA1Copiado!",amMessageTitle:"Mensaje AM",amMessageSub:"Generar aviso de contacto fallido",copyFinalMessage:"Copiar Mensaje Final",resize:"Redimensionar",resetScript:"Reiniciar Script",resetConfirm:"\xBFReiniciar todo el progreso del script? Esta acci\xF3n no se puede deshacer.",resetConfirmBtn:"Reiniciar",scriptNotConfigured:"Script no configurado.",messageCopiedToast:"\xA1Mensaje copiado!",amMessage:(e,t)=>`Hola. \xA1Buenos d\xEDas!

Tengo un caso de su cliente (${e.advertiserName||"Cliente"}) en curso hoy (${t}). Hice el primer intento de contacto hace un momento, pero no tuve \xE9xito.

Har\xE9 un nuevo intento en unos minutos. Si no responde nuevamente, seguir\xE9 con el correo est\xE1ndar de reprogramaci\xF3n/no-show y lo mantendr\xE9 informado.

Datos del caso para su control:

Cliente: ${e.advertiserName||"---"}
CID: ${e.cid||"---"}
Case ID: ${e.caseId||"---"}
E-mail: ${e.clientEmail||"---"}`,dateLocale:"es-ES"},en:{headerTitle:"Call Script",headerDesc:"Interactive guide for running calls.",loading:"Loading...",unknownClient:"Unknown Customer",notFound:"Not found",activeMonitoring:"Active Monitoring",cidLabel:"CID (Account)",emailLabel:"Contact Email",copied:"Copied!",amMessageTitle:"AM Message",amMessageSub:"Generate a failed-contact notice",copyFinalMessage:"Copy Final Message",resize:"Resize",resetScript:"Reset Script",resetConfirm:"Reset all script progress? This action cannot be undone.",resetConfirmBtn:"Reset",scriptNotConfigured:"Script not configured.",messageCopiedToast:"Message copied!",amMessage:(e,t)=>`Hello. Good morning!

I have a case for your client (${e.advertiserName||"Customer"}) in progress today (${t}). I made the first contact attempt a moment ago, but was unsuccessful.

I will make another attempt in a few minutes. If they do not answer again, I will proceed with the standard rescheduling/no-show email and keep you posted.

Case details for your records:

Customer: ${e.advertiserName||"---"}
CID: ${e.cid||"---"}
Case ID: ${e.caseId||"---"}
Email: ${e.clientEmail||"---"}`,dateLocale:"en-US"}};function sc(){return{es:"ES",en:"EN"}[Et()]||"PT"}function Ve(e){let t=ge();return qn[t]?.[e]??qn.pt[e]}function lc(e){let t=Et();return qn[t]?.[e]??qn.pt[e]}var Oe={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",danger:"#D93025",dangerBg:"#FCE8E6",success:"#34A853",successBg:"#E6F4EA"};function um(){if(document.getElementById("csa-styles-v2"))return;let e=document.createElement("style");e.id="csa-styles-v2",e.textContent=`
        #call-script-popup { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

        /* --- BANNER DE CONTEXTO --- */
        .csa-context-banner {
            padding: 20px 20px 16px 20px;
            background: ${Oe.bgSurface};
            border-bottom: 1px solid #F1F3F4;
            display: flex; flex-direction: column; gap: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
            position: relative; z-index: 5;
        }
        .csa-ctx-top { display: flex; justify-content: space-between; align-items: center; }
        .csa-ctx-name-wrap { display: flex; align-items: center; gap: 10px; }
        .csa-ctx-name { font-size: 16px; font-weight: 500; color: ${Oe.textPrimary}; }
        .csa-live-badge {
            font-size: 10px; font-weight: 700; color: ${Oe.primary}; background: ${Oe.primaryBg};
            padding: 2px 8px; border-radius: 4px; text-transform: uppercase;
        }
        .csa-live-dot {
            width: 8px; height: 8px; background: #10B981; border-radius: 50%;
            animation: csaPulseGreen 2s infinite;
        }
        @keyframes csaPulseGreen {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
            70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .csa-ctx-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .csa-data-pill {
            background: #F8F9FA; border: 1px solid transparent; border-radius: 10px; padding: 8px 12px;
            cursor: pointer; position: relative; overflow: hidden;
            transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .csa-data-pill:hover { background: ${Oe.bgSurface}; border-color: #DADCE0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transform: translateY(-1px); }
        .csa-data-pill:active { transform: scale(0.98); }
        .csa-data-pill.copied { background: ${Oe.successBg} !important; border-color: ${Oe.success} !important; }
        .csa-pill-label { font-size: 9px; font-weight: 700; color: ${Oe.textSecondary}; text-transform: uppercase; margin-bottom: 2px; letter-spacing: 0.5px; }
        .csa-data-value { font-size: 13px; color: ${Oe.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .csa-data-value.mono { font-family: 'SF Mono', 'Roboto Mono', monospace; font-weight: 500; color: ${Oe.primary}; }
        .csa-copy-hint {
            position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
            font-size: 10px; color: #1E8E3E; font-weight: 700; text-transform: uppercase;
            opacity: 0; transition: opacity 0.2s; pointer-events: none;
        }
        .csa-data-pill.copied .csa-copy-hint { opacity: 1; }
        .csa-data-pill.copied .csa-data-value { opacity: 0.3; }

        /* --- MENSAGEM AM (op\xE7\xF5es extras) --- */
        .csa-more-options { margin-top: 8px; }
        .csa-toggle-options-btn {
            width: 100%; background: transparent; border: none; padding: 4px 0;
            display: flex; align-items: center; justify-content: center; cursor: pointer;
            color: #9AA0A6; transition: color 0.2s;
        }
        .csa-options-arrow { transition: transform 0.3s ease; }
        .csa-options-arrow.expanded { transform: rotate(180deg); }
        .csa-options-content {
            max-height: 0; overflow: hidden; opacity: 0; padding: 0 4px;
            transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease, margin-top 0.4s ease;
        }
        .csa-options-content.expanded { max-height: 400px; opacity: 1; margin-top: 8px; }

        .csa-am-card { padding: 12px; background: #F8F9FA; border: 1px solid #DADCE0; border-radius: 12px; margin-bottom: 8px; }
        .csa-am-btn {
            width: 100%; background: ${Oe.bgSurface}; border: 1px solid #DADCE0; border-radius: 10px; padding: 10px;
            display: flex; align-items: center; gap: 12px; cursor: pointer; box-sizing: border-box;
            transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.02);
        }
        .csa-am-btn:hover { border-color: ${Oe.primary}; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .csa-am-icon { background: ${Oe.primaryBg}; border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .csa-am-btn-text { text-align: left; }
        .csa-am-btn-title { font-size: 11px; font-weight: 700; color: #3C4043; }
        .csa-am-btn-sub { font-size: 10px; color: ${Oe.textSecondary}; }

        .csa-am-review-container { display: none; max-height: 0; opacity: 0; overflow: hidden; margin-top: 0; transition: all 0.3s ease; }
        .csa-am-review-container.visible { display: block; max-height: 300px; opacity: 1; margin-top: 12px; }
        .csa-am-message-area {
            width: 100%; height: 120px; border: 1px solid #DADCE0; border-radius: 8px; padding: 10px;
            font-family: inherit; font-size: 13px; color: #3C4043; outline: none; resize: none;
            box-sizing: border-box; background: ${Oe.bgSurface}; line-height: 1.4;
        }
        .csa-am-copy-final {
            width: 100%; margin-top: 8px; padding: 10px; background: ${Oe.primary}; color: white; border: none;
            border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; transition: background 0.2s;
        }
        .csa-am-copy-final.copied-flash { background: ${Oe.success}; }

        /* --- BARRA DE PROGRESSO --- */
        .csa-progress-container { height: 6px; background: ${Oe.borderSubtle}; width: 100%; position: relative; overflow: hidden; }
        .csa-progress-fill {
            height: 100%; width: 0%; border-radius: 0 3px 3px 0;
            transition: width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
            background: linear-gradient(90deg, ${Oe.primary}, #00C6FF, ${Oe.primary});
            background-size: 200% 100%;
            animation: csaShimmer 2s infinite linear;
        }
        .csa-progress-fill.complete { background: ${Oe.success}; animation: none; }
        @keyframes csaShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

        /* --- SEGMENTED CONTROL (Tipo / Idioma) --- */
        .csa-content-area { padding: 16px; overflow-y: auto; flex-grow: 1; background: ${Oe.bgApp}; scroll-behavior: smooth; }
        .csa-controls { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .csa-segmented-control { display: flex; background: #E3E3E8; padding: 2px; border-radius: 10px; gap: 2px; position: relative; margin-bottom: 16px; }
        .csa-segmented-control button {
            flex: 1; border: none; background: transparent; padding: 8px 4px; font-size: 12px; font-weight: 600;
            border-radius: 8px; cursor: pointer; transition: color 0.3s ease; color: ${Oe.textSecondary};
            position: relative; z-index: 2;
        }
        .csa-segmented-control button.active { color: ${Oe.textPrimary}; }
        .csa-segmented-indicator {
            position: absolute; top: 2px; left: 2px; bottom: 2px; background: ${Oe.bgSurface};
            border-radius: 8px; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1; box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        /* --- CARDS DO CHECKLIST --- */
        .csa-card { background: ${Oe.bgSurface}; border: 1px solid ${Oe.borderSubtle}; border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02); }
        .csa-card.done { box-shadow: inset 4px 0 0 ${Oe.success}, 0 1px 3px rgba(0,0,0,0.05); }
        .csa-card-title { font-size: 11px; font-weight: 700; color: ${Oe.textSecondary}; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; user-select: none; }
        .csa-card-counter { font-size: 11px; opacity: 0.7; font-weight: 500; background: #f1f3f4; padding: 2px 8px; border-radius: 10px; }
        .csa-card-counter.done { opacity: 1; color: #1e8e3e; background: ${Oe.successBg}; }

        .csa-item-row { display: flex; align-items: flex-start; padding: 10px 8px; cursor: pointer; border-radius: 10px; transition: background 0.2s ease; color: ${Oe.textPrimary}; font-size: 14px; line-height: 1.5; margin-bottom: 2px; }
        .csa-item-row:not(.completed):hover { background: rgba(0, 0, 0, 0.03); }
        .csa-item-row:not(.completed):hover .csa-checkbox { border-color: ${Oe.primary}; }
        .csa-item-row.completed { background: rgba(0, 0, 0, 0.02); }

        .csa-checkbox {
            min-width: 20px; height: 20px; border-radius: 50%; border: 2px solid ${Oe.borderSubtle};
            margin-right: 12px; margin-top: 1px; display: flex; align-items: center; justify-content: center;
            transition: border-color 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.15s ease;
            background: #fff;
        }
        .csa-checkbox.checked { background: ${Oe.primary}; border-color: ${Oe.primary}; }
        .csa-checkbox.pulse { transform: scale(1.15); }

        .csa-item-text { position: relative; display: inline-block; flex: 1; transition: color 0.3s ease; }
        .csa-item-text.completed { color: ${Oe.textSecondary}; }
        .csa-item-text::after { content: ''; position: absolute; left: 0; top: 50%; width: 0; height: 1.5px; background: ${Oe.textSecondary}; transition: width 0.3s ease; }
        .csa-item-text.completed::after { width: 100%; }

        .csa-empty-state { padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .csa-empty-state-icon { font-size: 24px; }

        /* --- FOOTER --- */
        .csa-footer { padding: 12px 16px; border-top: 1px solid #F1F3F4; background: ${Oe.bgSurface}; display: flex; justify-content: space-between; align-items: center; }
        .csa-credit { font-size: 10px; color: #bdc1c6; }
        .csa-reset-btn {
            background: transparent; border: none; color: ${Oe.danger}; font-size: 12px; font-weight: 600;
            cursor: pointer; padding: 6px 12px; border-radius: 20px; transition: background 0.2s ease, transform 0.15s ease;
            display: flex; align-items: center; gap: 4px;
        }
        .csa-reset-btn:hover { background: ${Oe.dangerBg}; }
        .csa-reset-btn:active { transform: scale(0.9); }

        /* Duas anima\xE7\xF5es infinite (dot "ao vivo" e shimmer da barra de
           progresso) rodando o tempo inteiro que o script fica aberto,
           sem nenhuma prote\xE7\xE3o de reduced-motion. */
        @media (prefers-reduced-motion: reduce) {
            .csa-live-dot { animation: none !important; }
            .csa-progress-fill { animation: none !important; }
            .csa-checkbox, .csa-checkbox.pulse, .cw-step-btn-hero,
            .csa-data-pill, .csa-segmented-indicator {
                transition: opacity 0.15s ease, background-color 0.15s ease, border-color 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}function cc(){let e="v3.1.0";um();let t={},a=sc(),o="BAU",n=!1,i=document.createElement("div");i.id="call-script-popup",i.classList.add("cw-module-window"),Object.assign(i.style,ft,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let r={popup:i,googleLine:null},s=null;function l(){n&&Ut().then(V=>{let O=i.querySelector("#cw-ctx-name"),k=i.querySelector("#cw-ctx-cid"),j=i.querySelector("#cw-ctx-email");if(O&&(O.textContent=V.advertiserName||Ve("unknownClient")),k){let ie=V.cid||"---";k.textContent!==ie&&(k.textContent=ie)}if(j){let ie=V.clientEmail||Ve("notFound");j.textContent!==ie&&(j.textContent=ie,j.title=ie)}})}function p(){Ut().then(V=>{let O=new Date().toLocaleDateString(lc("dateLocale")),k=i.querySelector("#cw-am-message-area"),j=i.querySelector("#cw-am-review-container"),ie=lc("amMessage")(V,O);k&&(k.value=ie),j&&(j.classList.add("visible"),j.scrollIntoView({behavior:"smooth",block:"end"}))})}function c(){n=!ht(i),ct(n,i,"cw-btn-script"),n?(Je(),l(),s||(s=setInterval(l,2e3))):(Qe(),s&&(clearInterval(s),s=null))}let m=rt(i,Ve("headerTitle"),e,Ve("headerDesc"),r,()=>{c()});i.appendChild(m);let u=m.querySelector("span"),h=document.createElement("div");h.className="csa-context-banner",h.innerHTML=`
      <div class="csa-ctx-top">
          <div class="csa-ctx-name-wrap">
              <div class="csa-live-dot js-csa-monitoring" title="${Ve("activeMonitoring")}"></div>
              <span id="cw-ctx-name" class="csa-ctx-name">${Ve("loading")}</span>
          </div>
          <div class="csa-live-badge">Live</div>
      </div>

      <div class="csa-ctx-grid">
          <div class="csa-data-pill" id="cw-pill-cid">
              <div class="csa-pill-label js-csa-cid-label">${Ve("cidLabel")}</div>
              <div id="cw-ctx-cid" class="csa-data-value mono">---</div>
              <div class="csa-copy-hint">${Ve("copied")}</div>
          </div>

          <div class="csa-data-pill" id="cw-pill-email">
              <div class="csa-pill-label js-csa-email-label">${Ve("emailLabel")}</div>
              <div id="cw-ctx-email" class="csa-data-value">---</div>
              <div class="csa-copy-hint">${Ve("copied")}</div>
          </div>
      </div>

      <div class="csa-more-options">
          <button id="csa-toggle-options" class="csa-toggle-options-btn">
              <svg id="csa-options-arrow" class="csa-options-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>

          <div id="csa-options-content" class="csa-options-content">
              <div class="csa-am-card">
                  <button id="cw-pill-message" class="csa-am-btn">
                      <div class="csa-am-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${Oe.primary}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </div>
                      <div class="csa-am-btn-text">
                          <div class="csa-am-btn-title js-csa-am-title">${Ve("amMessageTitle")}</div>
                          <div class="csa-am-btn-sub js-csa-am-sub">${Ve("amMessageSub")}</div>
                      </div>
                  </button>

                  <div id="cw-am-review-container" class="csa-am-review-container">
                      <textarea id="cw-am-message-area" class="csa-am-message-area"></textarea>
                      <button id="cw-am-copy-final" class="csa-am-copy-final">${Ve("copyFinalMessage")}</button>
                  </div>
              </div>
          </div>
      </div>
  `;let L=h.querySelector("#csa-toggle-options"),S=h.querySelector("#csa-options-content"),C=h.querySelector("#csa-options-arrow"),D=!1;L.onclick=()=>{D=!D,C.classList.toggle("expanded",D),S.classList.toggle("expanded",D),w.playClick()};let G=h.querySelector("#cw-pill-message"),F=h.querySelector("#cw-am-copy-final"),R=h.querySelector("#cw-am-message-area");G.addEventListener("click",()=>{p()}),F.addEventListener("click",()=>{R.value&&(navigator.clipboard.writeText(R.value),ne(Ve("messageCopiedToast")),w.playSuccess(),F.classList.add("copied-flash"),F.textContent=Ve("copied"),setTimeout(()=>{F.classList.remove("copied-flash"),F.textContent=Ve("copyFinalMessage")},2e3))});let le=(V,O)=>{let k=h.querySelector(V),j=h.querySelector(O);k.onclick=()=>{let ie=j.textContent;!ie||ie.includes("---")||ie===Ve("notFound")||(navigator.clipboard.writeText(ie),w.playSuccess(),k.classList.add("copied"),setTimeout(()=>k.classList.remove("copied"),1500))}};i.appendChild(h);let te=document.createElement("div");te.className="csa-progress-container";let ee=document.createElement("div");ee.className="csa-progress-fill",te.appendChild(ee),i.appendChild(te);let $=document.createElement("div");$.id="csa-content",$.className="csa-content-area",i.appendChild($);let A=document.createElement("div");A.className="csa-footer";let y=document.createElement("span");y.className="csa-credit",y.textContent=`by ${Wt}`;let z=document.createElement("button");z.className="csa-reset-btn",z.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> <span class="js-csa-reset-label">${Ve("resetScript")}</span>`,z.onclick=async()=>{if(await ot(Ve("resetConfirm"),{danger:!0,confirmText:Ve("resetConfirmBtn")})){for(let O in t)delete t[O];T()}},A.appendChild(y),A.appendChild(z),i.appendChild(A);let U=document.createElement("div");U.className="csa-controls";let M=document.createElement("div");M.className="csa-segmented-control",M.innerHTML=`
      <div class="csa-segmented-indicator" id="type-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-type="BAU">BAU</button>
      <button data-type="LT">LT</button>
  `,U.appendChild(M),$.appendChild(U);let Z=M.querySelectorAll("button"),de=M.querySelector("#type-indicator");Z.forEach((V,O)=>{V.onclick=()=>{Z.forEach(k=>k.classList.remove("active")),V.classList.add("active"),de.style.transform=`translateX(${O*(M.offsetWidth/2-2)}px)`,o=V.dataset.type,w.playClick(),T()}}),va(()=>{a=sc(),T()}),je(()=>{u&&(u.textContent=Ve("headerTitle"));let V=i.querySelector(".cw-help-title");V&&(V.textContent=Ve("headerTitle"));let O=i.querySelector(".cw-help-description");O&&(O.textContent=Ve("headerDesc"));let k=h.querySelector(".js-csa-monitoring");k&&(k.title=Ve("activeMonitoring"));let j=h.querySelector(".js-csa-cid-label");j&&(j.textContent=Ve("cidLabel"));let ie=h.querySelector(".js-csa-email-label");ie&&(ie.textContent=Ve("emailLabel")),h.querySelectorAll(".csa-copy-hint").forEach(v=>v.textContent=Ve("copied"));let P=h.querySelector(".js-csa-am-title");P&&(P.textContent=Ve("amMessageTitle"));let X=h.querySelector(".js-csa-am-sub");X&&(X.textContent=Ve("amMessageSub")),F&&(F.textContent=Ve("copyFinalMessage"));let ce=z.querySelector(".js-csa-reset-label");ce&&(ce.textContent=Ve("resetScript")),re.title=Ve("resize"),T()});let ve=document.createElement("div");ve.id="csa-checklist-area",$.appendChild(ve);let re=document.createElement("div");Object.assign(re.style,Yt),re.className="no-drag",re.title=Ve("resize"),i.appendChild(re),Xt(i,re),document.body.appendChild(i),le("#cw-pill-cid","#cw-ctx-cid"),le("#cw-pill-email","#cw-ctx-email");function be(V){return V.replace(/\n/g,"<br>")}function pe(V,O,k,j){let ie=`${V}-${O}-${j}`,P=!!t[ie],X=document.createElement("div");X.className="csa-item-row"+(P?" completed":"");let ce=document.createElement("div");ce.className="csa-checkbox"+(P?" checked":""),ce.innerHTML=P?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':"";let v=document.createElement("span");return v.className="csa-item-text"+(P?" completed":""),v.innerHTML=be(k),X.onclick=()=>{let b=!t[ie];t[ie]=b,w.playClick(),X.classList.toggle("completed",b),v.classList.toggle("completed",b),ce.classList.toggle("checked",b),ce.innerHTML=b?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':"",b&&(ce.classList.add("pulse"),setTimeout(()=>ce.classList.remove("pulse"),150)),Y(V,uo[V])},X.appendChild(ce),X.appendChild(v),{row:X,isDone:P}}function he(V,O,k){let j=document.createElement("div");j.className="csa-card";let ie=document.createElement("div");ie.className="csa-card-title",ie.textContent=ic(O,a);let P=document.createElement("span");P.className="csa-card-counter",ie.appendChild(P),j.appendChild(ie);let X=0;k.forEach((v,b)=>{let{row:d,isDone:N}=pe(V,O,v,b);N&&X++,j.appendChild(d)});let ce=X===k.length&&k.length>0;return j.classList.toggle("done",ce),P.classList.toggle("done",ce),P.textContent=`${X}/${k.length}`,j}function T(){ve.innerHTML="";let V=`${a} ${o}`,O=uo[V];if(!O){ve.innerHTML=`<div class="csa-empty-state"><div class="csa-empty-state-icon">\u2615</div><div>${Ve("scriptNotConfigured")}</div></div>`,ee.style.width="0%";return}let k=0,j=0;["inicio","meio","fim"].forEach(ie=>{O[ie]&&(k+=O[ie].length)}),["inicio","meio","fim"].forEach(ie=>{let P=O[ie];!P||P.length===0||(P.forEach((X,ce)=>{let v=`${V}-${ie}-${ce}`;t[v]&&j++}),ve.appendChild(he(V,ie,P)))}),se(k,j)}function Y(V,O){let k=0,j=0;["inicio","meio","fim"].forEach(ie=>{let P=O[ie]||[];k+=P.length,P.forEach((X,ce)=>{t[`${V}-${ie}-${ce}`]&&j++})}),se(k,j),setTimeout(()=>T(),200)}function se(V,O){let k=V===0?0:O/V*100;ee.style.width=`${k}%`,ee.classList.toggle("complete",k===100)}return T(),rc(()=>T()),c}var Wi={cyan:{color:"#0097A7",bg:"#E0F7FA"},blue:{color:"#1967D2",bg:"#E8F0FE"},orange:{color:"#E37400",bg:"#FEF7E0"},green:{color:"#188038",bg:"#E6F4EA"},purple:{color:"#9334E6",bg:"#F3E8FD"},red:{color:"#C5221F",bg:"#FCE8E6"},slate:{color:"#5F6368",bg:"#F1F3F4"},amber:{color:"#F09D00",bg:"#FFF3E0"},sky:{color:"#0B57D0",bg:"#D3E3FD"},pink:{color:"#D01884",bg:"#FDE7F3"},teal:{color:"#00796B",bg:"#E0F2F1"},indigo:{color:"#3949AB",bg:"#E8EAF6"}},vt=e=>`<svg viewBox="0 0 24 24" fill="currentColor"><path d="${e}"/></svg>`,Yi={description:vt("M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"),assignment:vt("M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"),verified_user:vt("M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"),chat:vt("M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"),public:vt("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"),bar_chart:vt("M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"),shopping_cart:vt("M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"),code:vt("M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"),person:vt("M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"),folder:vt("M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"),bookmark:vt("M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"),star:vt("M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"),info:vt("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"),help:vt("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"),flag:vt("M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"),school:vt("M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"),build:vt("M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"),lightbulb:vt("M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"),event:vt("M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"),feedback:vt("M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z")},Xi={tasks:{color:"cyan",icon:"description",label:{pt:"Tarefas",es:"Tareas",en:"Tasks"}},ads:{color:"blue",icon:"public",label:{pt:"Ads",es:"Ads",en:"Ads"}},analytics:{color:"orange",icon:"bar_chart",label:{pt:"GA4",es:"GA4",en:"GA4"}},shopping:{color:"green",icon:"shopping_cart",label:{pt:"Shop",es:"Shop",en:"Shop"}},tech:{color:"purple",icon:"code",label:{pt:"Tech",es:"Tech",en:"Tech"}},hr:{color:"red",icon:"person",label:{pt:"RH",es:"RRHH",en:"HR"}},lm:{color:"slate",icon:"assignment",label:{pt:"Forms",es:"Forms",en:"Forms"}},qa:{color:"amber",icon:"verified_user",label:{pt:"QA",es:"QA",en:"QA"}},suporte:{color:"sky",icon:"chat",label:{pt:"Ajuda",es:"Ayuda",en:"Help"}},feedback:{color:"pink",icon:"feedback",label:{pt:"Feedback",es:"Feedback",en:"Feedback"}}},Wo={color:"slate",icon:"folder"},Ki=30,pc=10,mm=3,gm=5;function Ji(e){try{let t=JSON.parse(e||"{}");return t&&typeof t=="object"?t:{}}catch{return{}}}function la(e,t,a){if(!e)return"";let o=a==="es"||a==="en"?e[`${t}_${a}`]:"";return String(o||e[t]||"").trim()}function Ft(e){return e.lineage||`u:${e.url}`}function Qi(e){let t=Ji(e.value);return{id:e.id||"",lineage:e.lineage||e.id||"",cat:String(e.key||""),name:String(t.name||""),url:String(t.url||""),desc:String(t.desc||""),desc_es:String(t.desc_es||""),desc_en:String(t.desc_en||""),about:String(t.about||""),about_es:String(t.about_es||""),about_en:String(t.about_en||""),when:String(t.when||""),when_es:String(t.when_es||""),when_en:String(t.when_en||"")}}function uc(e){let t={};return(e||[]).forEach(a=>{let o=String(a.key||"").trim();if(!o||Xi[o])return;let n=Ji(a.value);n.label&&(t[o]={color:Wi[n.color]?n.color:Wo.color,icon:Yi[n.icon]?n.icon:Wo.icon,label:{pt:String(n.label),es:String(n.label_es||n.label),en:String(n.label_en||n.label)},custom:!0})}),t}function Zi(e,t){let a=Xi[e]||t&&t[e];return a||{...Wo,label:{pt:e,es:e,en:e},unknown:!0}}function Yo(e,t,a){let o=Zi(e,a);return o.label[t]||o.label.pt}function er(e,t){let a=Zi(e,t);return Wi[a.color]||Wi[Wo.color]}function go(e,t){let a=Zi(e,t);return Yi[a.icon]||Yi[Wo.icon]}function tr(e,t){let a=new Set(e.map(r=>r.cat)),o=Object.keys(Xi),n=Object.keys(t||{}),i=[...a].filter(r=>!o.includes(r)&&!n.includes(r));return[...o,...n,...i].filter(r=>a.has(r))}function mc(e,t){let a=new Map;return tr(e,t).forEach(o=>a.set(o,[])),e.forEach(o=>a.get(o.cat).push(o)),a}function ar(e,t,a){let o=new Map(t.filter(c=>c.lineage).map(c=>[c.lineage,c])),n=[],i=[];(e||[]).forEach(c=>{let m=Ji(c.value),u=o.get(String(m.linkLineage||""));if(!u)return;let h={id:c.id,link:u,linkId:Ft(u),headline:la(m,"headline",a)||u.name,blurb:la(m,"blurb",a),position:m.position==="main"?"main":"secondary",startsAt:String(m.startsAt||""),endsAt:String(m.endsAt||"")};c.state==="active"?n.push(h):c.state==="ended"&&i.push(h)}),n.sort((c,m)=>(c.position==="main"?0:1)-(m.position==="main"?0:1)||m.startsAt.localeCompare(c.startsAt)||c.id.localeCompare(m.id));let r=n.slice(0,mm),s=new Set(r.map(c=>c.linkId));i.sort((c,m)=>m.endsAt.localeCompare(c.endsAt));let l=new Set,p=i.filter(c=>s.has(c.linkId)||l.has(c.linkId)?!1:(l.add(c.linkId),!0)).slice(0,gm);return{active:r,ended:p}}function gc(e,t,a=Ki){let o=Array.isArray(e)?e.filter(n=>typeof n=="string"):[];return o.includes(t)?{list:o.filter(n=>n!==t),added:!1,full:!1}:o.length>=a?{list:o,added:!1,full:!0}:{list:[t,...o],added:!0,full:!1}}function fc(e,t,a,o=pc){let n=Array.isArray(e)?e.filter(i=>i&&typeof i.id=="string"):[];return[{id:t,t:a},...n.filter(i=>i.id!==t)].slice(0,o)}function bc(e,t,a,o){if(typeof e!="string")return null;let n=e;return!t.has(e)&&e.startsWith("u:")&&a.has(e.slice(2))&&(n=Ft(a.get(e.slice(2)))),!t.has(n)&&o?null:n}function hc(e){return{porId:new Map(e.map(t=>[Ft(t),t])),porUrl:new Map(e.map(t=>[t.url,t]))}}function vc(e,t,a){let{porId:o,porUrl:n}=hc(t),i=new Set,r=[];return(e||[]).forEach(s=>{let l=bc(s,o,n,a);l===null||i.has(l)||(i.add(l),r.push(l))}),r}function xc(e,t,a){let{porId:o,porUrl:n}=hc(t),i=new Set,r=[];return(Array.isArray(e)?e:[]).forEach(s=>{let l=s&&bc(s.id,o,n,a);!l||i.has(l)||(i.add(l),r.push({id:l,t:s.t}))}),r}function wc(e,t,a){let o=new Map(t.map(r=>[r.url,r])),n=new Set,i=[];return(Array.isArray(e)?e:[]).forEach((r,s)=>{let l=r&&o.get(r.url);!l||n.has(Ft(l))||(n.add(Ft(l)),i.push({id:Ft(l),t:a-s*6e4}))}),i.slice(0,pc)}var fm=new RegExp("[\u0300-\u036F]","g");function dc(e){return String(e??"").normalize("NFD").replace(fm,"").toLowerCase()}function yc(e,t,a,o){let n=dc(t).trim();return n?[e.name,la(e,"desc",a),la(e,"about",a),la(e,"when",a),Yo(e.cat,a,o)].some(r=>dc(r).includes(n)):!0}var mo={pt:"pt-BR",es:"es-ES",en:"en-US"};function Sc(e){let t=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(String(e||""));return t?new Date(Number(t[1]),Number(t[2])-1,Number(t[3]),Number(t[4]),Number(t[5])):null}function Fn(e,t){let a=Sc(e);return a?new Intl.DateTimeFormat(mo[t]||mo.pt,{day:"2-digit",month:"2-digit"}).format(a):""}function Cc(e,t){let a=Sc(e);return a?new Intl.DateTimeFormat(mo[t]||mo.pt,{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).format(a):""}function Ac(e,t,a){let o=mo[a]||mo.pt,n=new Date(e),i=new Date(t),r=Math.round((new Date(i.getFullYear(),i.getMonth(),i.getDate())-new Date(n.getFullYear(),n.getMonth(),n.getDate()))/864e5);if(r<=0){let s=new Intl.DateTimeFormat(o,{hour:"2-digit",minute:"2-digit",hour12:!1}).format(n);return`${new Intl.RelativeTimeFormat(o,{numeric:"auto"}).format(0,"day")}, ${s}`}return r===1?new Intl.RelativeTimeFormat(o,{numeric:"auto"}).format(-1,"day"):new Intl.DateTimeFormat(o,{day:"2-digit",month:"2-digit"}).format(n)}var bm={"Ponto Eletr\xF4nico":"Control de Asistencia","Ferramenta de ajuda":"Herramienta de ayuda","Intranet Google":"Intranet Google","Relat\xF3rio Follow-ups":"Informe de Follow-ups","Dashboard WFM":"Dashboard WFM","Tech Solutions SAO":"Tech Solutions SAO","Form Grava\xE7\xE3o":"Form Grabaci\xF3n","Form Escala\xE7\xE3o":"Form Escalaci\xF3n","Instru\xE7\xF5es Split":"Instrucciones Split","Single Page App":"Single Page App","Procedimento Padr\xE3o":"Procedimiento Est\xE1ndar","Valida\xE7\xE3o C\xF3digo":"Validaci\xF3n C\xF3digo","Convers\xE3o Chamada":"Conversi\xF3n Llamada","Valida\xE7\xE3o WCC":"Validaci\xF3n WCC",ECW4:"ECW4","Monitoramento EC":"Monitoreo EC","Resolu\xE7\xE3o problemas":"Resoluci\xF3n de problemas","Implementa\xE7\xE3o RMKT":"Implementaci\xF3n RMKT","Pontua\xE7\xE3o Leads":"Puntuaci\xF3n de Leads","Instala\xE7\xE3o Container":"Instalaci\xF3n Container","Instala\xE7\xE3o Config.":"Instalaci\xF3n Config.","Valida\xE7\xE3o GA4":"Validaci\xF3n GA4","Guia Dev":"Gu\xEDa Dev","Resolu\xE7\xE3o Problemas":"Resoluci\xF3n de Problemas","Dom\xEDnio Cruzado":"Dominio Cruzado","Lista Oficial":"Lista Oficial","Criador URLs":"Creador de URLs","Setup Inicial":"Setup Inicial","Otimiza\xE7\xE3o Feed":"Optimizaci\xF3n Feed","Ferramenta Interna":"Herramienta Interna",Avalia\u00E7\u00F5es:"Rese\xF1as","Feeds Offline":"Feeds Offline","Help Center":"Help Center","Guias CMS":"Gu\xEDas CMS","Solu\xE7\xF5es Iframes":"Soluciones Iframes","Ghost Ads":"Ghost Ads","Ghost Analytics":"Ghost Analytics","Ghost GTM":"Ghost GTM",Ferramenta:"Herramienta","Ghost MC":"Ghost MC","Playground JS":"Playground JS","Testador Regex":"Probador Regex","Doc. CSP":"Doc. CSP","Guia CoMo":"Gu\xEDa CoMo","Debug CoMo":"Debug CoMo","Portal Colaborador":"Portal del Colaborador","Apps e Sistemas":"Apps y Sistemas","Folha Pagamento":"N\xF3mina","Reportar problemas":"Reportar problemas","Registro chamadas":"Registro de llamadas","Erros de sistema":"Errores de sistema","BAU/Descarte/Monitoria":"BAU/Descarte/Monitoreo","Feedback positivo":"Feedback positivo","Casos dif\xEDceis":"Casos dif\xEDciles","Chat/Email Ads":"Chat/Email Ads","Chat/Email Shopping":"Chat/Email Shopping","Perfil da Empresa":"Perfil de la Empresa","Console API":"Console API","Lista de n\xFAmeros":"Lista de n\xFAmeros",Cursos:"Cursos"},hm={"Ponto Eletr\xF4nico":"Time Clock","Ferramenta de ajuda":"Help tool","Intranet Google":"Google Intranet","Relat\xF3rio Follow-ups":"Follow-ups report","Dashboard WFM":"WFM Dashboard","Tech Solutions SAO":"Tech Solutions SAO","Form Grava\xE7\xE3o":"Recording Form","Form Escala\xE7\xE3o":"Escalation Form","Instru\xE7\xF5es Split":"Split instructions","Single Page App":"Single Page App","Procedimento Padr\xE3o":"Standard Procedure","Valida\xE7\xE3o C\xF3digo":"Code validation","Convers\xE3o Chamada":"Call conversion","Valida\xE7\xE3o WCC":"WCC validation",ECW4:"ECW4","Monitoramento EC":"EC monitoring","Resolu\xE7\xE3o problemas":"Troubleshooting","Implementa\xE7\xE3o RMKT":"RMKT implementation","Pontua\xE7\xE3o Leads":"Lead scoring","Instala\xE7\xE3o Container":"Container installation","Instala\xE7\xE3o Config.":"Config. installation","Valida\xE7\xE3o GA4":"GA4 validation","Guia Dev":"Dev guide","Resolu\xE7\xE3o Problemas":"Troubleshooting","Dom\xEDnio Cruzado":"Cross-domain","Lista Oficial":"Official list","Criador URLs":"URL builder","Setup Inicial":"Initial setup","Otimiza\xE7\xE3o Feed":"Feed optimization","Ferramenta Interna":"Internal tool",Avalia\u00E7\u00F5es:"Reviews","Feeds Offline":"Offline feeds","Help Center":"Help Center","Guias CMS":"CMS guides","Solu\xE7\xF5es Iframes":"Iframe solutions","Ghost Ads":"Ghost Ads","Ghost Analytics":"Ghost Analytics","Ghost GTM":"Ghost GTM",Ferramenta:"Tool","Ghost MC":"Ghost MC","Playground JS":"JS Playground","Testador Regex":"Regex tester","Doc. CSP":"CSP docs","Guia CoMo":"CoMo guide","Debug CoMo":"CoMo debug","Portal Colaborador":"Employee Portal","Apps e Sistemas":"Apps and Systems","Folha Pagamento":"Payroll","Reportar problemas":"Report problems","Registro chamadas":"Call log","Erros de sistema":"System errors","BAU/Descarte/Monitoria":"BAU/Discard/Monitoring","Feedback positivo":"Positive feedback","Casos dif\xEDceis":"Difficult cases","Chat/Email Ads":"Chat/Email Ads","Chat/Email Shopping":"Chat/Email Shopping","Perfil da Empresa":"Business Profile","Console API":"API Console","Lista de n\xFAmeros":"Number list",Cursos:"Courses"},Ec={pt:{headerTitle:"Central de Links",headerDesc:"Navegue pelas categorias ou use a busca.",searchPlaceholder:"Buscar ferramenta ou SOP...",home:"In\xEDcio",featured:"Em destaque",tabFavorites:"Favoritos",tabRecent:"Recentes",tabEnded:"Sa\xEDram do destaque",until:e=>`at\xE9 ${e}`,endedOn:e=>`saiu em ${e}`,liveNow:"Em destaque agora",liveUntil:e=>`Em destaque at\xE9 ${e}`,open:"Abrir",openLink:"Abrir link",copyUrl:"Copiar URL",copied:"Copiado",favorite:"Favoritar",favorited:"Favorito",favoriteAdd:"Adicionar aos favoritos",favoriteRemove:"Remover dos favoritos",aboutLabel:"O que \xE9",whenLabel:"Quando usar",emptyFavTitle:"Nenhum favorito ainda",emptyFavSub:"Clique na estrela de um link para fix\xE1-lo aqui.",emptyRecentTitle:"Nada por aqui ainda",emptyRecentSub:"Os links que voc\xEA abrir aparecem aqui pra acesso r\xE1pido depois.",emptyEndedTitle:"Nenhum destaque encerrado",emptyEndedSub:"Os links que sa\xEDrem do destaque ficam aqui por 30 dias.",browseAll:"Ver todos os links",favoritesFull:e=>`Voc\xEA chegou a ${e} favoritos. Remova um para adicionar outro.`,resultsSummary:(e,t)=>`${e} ${e===1?"resultado":"resultados"} em ${t} ${t===1?"categoria":"categorias"}`,nothingFound:"Nada encontrado",noLinkMatches:e=>`Nenhum link bate com "${e}".`,linkCopiedToast:"Link copiado!",copyFailedToast:"N\xE3o foi poss\xEDvel copiar o link.",favAddedToast:"Adicionado aos favoritos",favRemovedToast:"Removido dos favoritos"},es:{headerTitle:"Central de Enlaces",headerDesc:"Navega por las categor\xEDas o usa la b\xFAsqueda.",searchPlaceholder:"Buscar herramienta o SOP...",home:"Inicio",featured:"Destacados",tabFavorites:"Favoritos",tabRecent:"Recientes",tabEnded:"Salieron de destacados",until:e=>`hasta ${e}`,endedOn:e=>`sali\xF3 el ${e}`,liveNow:"Destacado ahora",liveUntil:e=>`Destacado hasta ${e}`,open:"Abrir",openLink:"Abrir enlace",copyUrl:"Copiar URL",copied:"Copiado",favorite:"A\xF1adir a favoritos",favorited:"Favorito",favoriteAdd:"A\xF1adir a favoritos",favoriteRemove:"Quitar de favoritos",aboutLabel:"Qu\xE9 es",whenLabel:"Cu\xE1ndo usar",emptyFavTitle:"Todav\xEDa no hay favoritos",emptyFavSub:"Haz clic en la estrella de un enlace para fijarlo aqu\xED.",emptyRecentTitle:"Todav\xEDa no hay nada aqu\xED",emptyRecentSub:"Los enlaces que abras aparecen aqu\xED para acceso r\xE1pido despu\xE9s.",emptyEndedTitle:"Ning\xFAn destacado finalizado",emptyEndedSub:"Los enlaces que dejen de estar destacados quedan aqu\xED por 30 d\xEDas.",browseAll:"Ver todos los enlaces",favoritesFull:e=>`Llegaste a ${e} favoritos. Quita uno para a\xF1adir otro.`,resultsSummary:(e,t)=>`${e} ${e===1?"resultado":"resultados"} en ${t} ${t===1?"categor\xEDa":"categor\xEDas"}`,nothingFound:"No se encontr\xF3 nada",noLinkMatches:e=>`Ning\xFAn enlace coincide con "${e}".`,linkCopiedToast:"\xA1Enlace copiado!",copyFailedToast:"No se pudo copiar el enlace.",favAddedToast:"A\xF1adido a favoritos",favRemovedToast:"Quitado de favoritos"},en:{headerTitle:"Links Central",headerDesc:"Browse the categories or use the search.",searchPlaceholder:"Search for a tool or SOP...",home:"Home",featured:"Featured",tabFavorites:"Favorites",tabRecent:"Recent",tabEnded:"No longer featured",until:e=>`until ${e}`,endedOn:e=>`ended ${e}`,liveNow:"Featured now",liveUntil:e=>`Featured until ${e}`,open:"Open",openLink:"Open link",copyUrl:"Copy URL",copied:"Copied",favorite:"Favorite",favorited:"Favorited",favoriteAdd:"Add to favorites",favoriteRemove:"Remove from favorites",aboutLabel:"What it is",whenLabel:"When to use",emptyFavTitle:"No favorites yet",emptyFavSub:"Click the star on a link to pin it here.",emptyRecentTitle:"Nothing here yet",emptyRecentSub:"The links you open show up here for quick access later.",emptyEndedTitle:"No past highlights",emptyEndedSub:"Links that stop being featured stay here for 30 days.",browseAll:"Browse all links",favoritesFull:e=>`You reached ${e} favorites. Remove one to add another.`,resultsSummary:(e,t)=>`${e} ${e===1?"result":"results"} in ${t} ${t===1?"category":"categories"}`,nothingFound:"Nothing found",noLinkMatches:e=>`No link matches "${e}".`,linkCopiedToast:"Link copied!",copyFailedToast:"Could not copy the link.",favAddedToast:"Added to favorites",favRemovedToast:"Removed from favorites"}};function $e(e){let t=ge();return Ec[t]?.[e]??Ec.pt[e]}var vm={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]},feedback:{label:"Feedback",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"}]}},Be=nr(null,null,null);function xm(){let e=[];return Object.entries(vm).forEach(([t,a])=>{a.links.forEach(o=>{e.push(Qi({key:t,value:JSON.stringify({name:o.name,url:o.url,desc:o.desc||"",desc_es:bm[o.desc]||"",desc_en:hm[o.desc]||""})}))})}),e}function nr(e,t,a){let o=(Array.isArray(e)?e:[]).map(Qi).filter(l=>l.name&&l.url),n=o.length>0,i=n?o:xm(),r=uc(t),s=ge();return{links:i,custom:r,fromCentral:n,byId:new Map(i.map(l=>[Ft(l),l])),highlights:ar(a,i,s),rawHighlights:a}}async function wm(e){let t=o=>ke.getCachedContent(o),a=nr(t("links"),t("link_categories"),t("link_highlights"));a.fromCentral&&(Be=a,e?.());try{let[o,n,i]=await Promise.allSettled([ke.fetchContentModule("links"),ke.fetchContentModule("link_categories"),ke.fetchContentModule("link_highlights")]),r=l=>l.status==="fulfilled"?l.value:null,s=nr(r(o)??t("links"),r(n)??t("link_categories"),r(i)??t("link_highlights"));s.fromCentral&&(Be=s,e?.())}catch(o){console.warn("Central de Conte\xFAdo indispon\xEDvel; usando links embutidos.",o)}}var Gt={home:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',starOutline:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>',open:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>',copy:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',check:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',search:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>'},Xe={textPrimary:"#202124",textSecondary:"#5F6368",blue:"#1A73E8",blueText:"#1967D2"};function ym(){if(document.getElementById("cw-links-styles"))return;let e=document.createElement("style");e.id="cw-links-styles",e.textContent=`
        .cw-links-layout { display: flex; height: calc(100% - 56px); width: 100%; position: relative; }

        /* --- SIDEBAR --- */
        .cw-links-sidebar {
            width: 88px; flex-shrink: 0; background: rgba(255,255,255,0.64);
            backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
            border-right: 1px solid rgba(0,0,0,0.06);
            display: flex; flex-direction: column; align-items: center;
            padding: 16px 0; overflow-y: auto; gap: 8px;
            scrollbar-width: none; z-index: 2;
        }
        .cw-links-nav-btn {
            width: 64px; height: 56px; flex-shrink: 0; border-radius: 16px; border: none; padding: 0;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            cursor: pointer; color: ${Xe.textSecondary};
            transition: background-color 0.2s var(--cw-ease-standard), color 0.2s ease;
            position: relative; background: transparent; font-family: inherit;
        }
        .cw-links-nav-btn:hover:not(.active) { background: rgba(60,64,67,0.08); }
        .cw-links-nav-btn:hover:not(.active) .cw-links-nav-icon { transform: scale(1.1); }
        .cw-links-nav-btn.active { background: var(--cat-bg); color: var(--cat-color); }
        .cw-links-nav-btn.active .cw-links-nav-icon { transform: scale(1.1); }
        .cw-links-nav-icon { width: 24px; height: 24px; margin-bottom: 4px; transition: transform 0.2s; }
        .cw-links-nav-icon svg { width: 100%; height: 100%; }
        .cw-links-nav-label { font-size: 9px; font-weight: 500; opacity: 0.8; letter-spacing: 0.3px; max-width: 60px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .cw-links-nav-sep { width: 40px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0; flex-shrink: 0; }

        /* --- CONTE\xDADO --- */
        .cw-links-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: transparent; position: relative; z-index: 1; min-width: 0; }

        .cw-links-search-bar { padding: 16px 24px 8px; flex-shrink: 0; }
        .cw-links-search-wrap {
            position: relative; width: 100%; height: 44px;
            border-radius: 12px; border: 1px solid transparent;
            background: #FFFFFF; transition: box-shadow 0.2s, border-color 0.2s;
            display: flex; align-items: center;
            box-shadow: 0 2px 6px rgba(0,0,0,0.04); box-sizing: border-box;
        }
        .cw-links-search-wrap:focus-within { box-shadow: 0 4px 12px rgba(26,115,232,0.15); border-color: ${Xe.blue}; }
        .cw-links-search-icon { margin-left: 16px; display: flex; align-items: center; justify-content: center; pointer-events: none; }
        .cw-links-search-input {
            flex: 1; height: 100%; border: none; background: transparent;
            padding: 0 12px; font-size: 14px; color: ${Xe.textPrimary};
            outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
        }

        .cw-links-body { flex: 1; display: flex; min-height: 0; }
        .cw-links-scroll { flex: 1; min-width: 0; overflow-y: auto; padding: 8px 16px 32px 24px; scrollbar-width: thin; }

        .cw-links-label { margin: 8px 0; font-size: 12px; line-height: 16px; font-weight: 500; color: ${Xe.textSecondary}; }
        .cw-links-cathead { display: flex; align-items: center; gap: 8px; font-size: 12px; line-height: 16px; font-weight: 500; color: ${Xe.textSecondary}; margin: 16px 0 4px; padding-left: 12px; }
        .cw-links-cathead:first-child { margin-top: 0; }
        .cw-links-cat-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--cat-color); flex-shrink: 0; }

        /* --- ELEMENTOS COMUNS --- */
        .cw-links-ico { width: 32px; height: 32px; border-radius: 12px; background: var(--cat-bg); color: var(--cat-color); display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .cw-links-ico svg { width: 20px; height: 20px; }
        .cw-links-ico.lg { width: 40px; height: 40px; }
        .cw-links-ico.lg svg { width: 24px; height: 24px; }
        .cw-links-eyebrow { display: flex; align-items: center; gap: 8px; height: 20px; font-size: 12px; line-height: 16px; color: ${Xe.textSecondary}; }
        .cw-links-eyebrow svg { width: 16px; height: 16px; color: var(--cat-color); flex-shrink: 0; }
        .cw-links-eyebrow b { font-weight: 500; color: ${Xe.textPrimary}; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .cw-links-eyebrow .cw-links-eyebrow-end { margin-left: auto; white-space: nowrap; font-variant-numeric: tabular-nums; }

        /* --- DESTAQUES --- */
        .cw-links-hero {
            display: block; position: relative; border-radius: 20px; padding: 16px 20px;
            background: rgba(255,255,255,0.92); text-decoration: none; color: inherit; cursor: pointer;
            box-shadow: 0 8px 24px rgba(32,33,36,0.10), 0 1px 2px rgba(32,33,36,0.06);
            transition: transform 0.2s var(--cw-ease-elastic, cubic-bezier(.34,1.56,.64,1)), box-shadow 0.2s ease;
        }
        .cw-links-hero:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(32,33,36,0.14), 0 1px 2px rgba(32,33,36,0.06); }
        .cw-links-hero-title { margin: 8px 0 4px; font-size: 18px; line-height: 24px; font-weight: 500; color: ${Xe.textPrimary}; }
        .cw-links-hero-blurb { margin: 0; font-size: 13px; line-height: 20px; color: ${Xe.textSecondary}; }
        .cw-links-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; }
        .cw-links-grid2.single { grid-template-columns: 1fr; }
        .cw-links-mini {
            display: block; border-radius: 16px; padding: 16px; background: rgba(255,255,255,0.92);
            text-decoration: none; color: inherit; cursor: pointer; box-shadow: 0 1px 2px rgba(32,33,36,0.08);
            transition: transform 0.2s var(--cw-ease-elastic, cubic-bezier(.34,1.56,.64,1)), box-shadow 0.2s ease;
        }
        .cw-links-mini:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(32,33,36,0.12); }
        .cw-links-mini-title { margin: 8px 0 0; font-size: 14px; line-height: 20px; font-weight: 500; color: ${Xe.textPrimary}; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .cw-links-mini-until { margin-top: 8px; font-size: 12px; line-height: 16px; color: ${Xe.textSecondary}; font-variant-numeric: tabular-nums; }

        /* --- ABAS (controle segmentado) --- */
        .cw-links-seg { display: flex; background: rgba(60,64,67,0.08); border-radius: 999px; padding: 4px; margin: 24px 0 8px; }
        .cw-links-seg:first-child { margin-top: 0; }
        .cw-links-seg button {
            flex: 1; height: 32px; padding: 0; border: 0; background: transparent; border-radius: 999px;
            font-family: inherit; font-size: 13px; line-height: 20px; font-weight: 500; color: ${Xe.textSecondary}; cursor: pointer;
            transition: background-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
        }
        .cw-links-seg button:hover { color: ${Xe.textPrimary}; }
        .cw-links-seg button[aria-selected="true"] { background: #fff; color: ${Xe.blueText}; box-shadow: 0 1px 3px rgba(32,33,36,0.18); }

        /* --- LINHA --- */
        .cw-links-row {
            display: flex; align-items: center; gap: 8px; height: 56px; padding: 0 8px 0 12px; border-radius: 16px; position: relative;
            transition: background-color 0.15s ease, box-shadow 0.2s ease, transform 0.2s var(--cw-ease-elastic, cubic-bezier(.34,1.56,.64,1));
        }
        .cw-links-row:hover, .cw-links-row:focus-within { background: rgba(255,255,255,0.94); box-shadow: 0 1px 3px rgba(32,33,36,0.12); transform: translateY(-1px); }
        .cw-links-row-link { flex: 1; min-width: 0; height: 100%; display: flex; align-items: center; gap: 16px; text-decoration: none; color: inherit; border-radius: 16px; }
        .cw-links-row-text { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        .cw-links-row-name { font-size: 15px; line-height: 20px; font-weight: 500; color: ${Xe.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-links-row-name mark { background: none; color: ${Xe.blueText}; font-weight: 500; }
        .cw-links-row-desc { font-size: 12px; line-height: 16px; color: ${Xe.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-links-row-meta { font-size: 12px; color: ${Xe.textSecondary}; white-space: nowrap; font-variant-numeric: tabular-nums; }
        .cw-links-row-acts { display: flex; align-items: center; }
        .cw-links-row-acts .hid { opacity: 0; transition: opacity 0.15s ease; }
        .cw-links-row:hover .hid, .cw-links-row:focus-within .hid { opacity: 1; }

        .cw-links-ib {
            width: 32px; height: 32px; padding: 0; border-radius: 50%; border: none; background: transparent; color: ${Xe.textSecondary};
            display: inline-flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0;
            transition: background-color 0.15s ease, color 0.15s ease;
        }
        .cw-links-ib:hover { background: rgba(60,64,67,0.10); }
        .cw-links-ib svg { width: 20px; height: 20px; }
        .cw-links-ib.star.on { color: #F9AB00; }
        .cw-links-ib.ok { color: #188038; background: #E6F4EA; }

        /* --- PAINEL DE PR\xC9VIA (recuado, vidro, sem borda) --- */
        .cw-links-pane {
            width: 288px; flex-shrink: 0; background: rgba(60,64,67,0.06);
            backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
            padding: 24px; display: flex; flex-direction: column; overflow-y: auto;
        }
        .cw-links-pane.swap > * { animation: cw-links-fade 0.16s ease; }
        @keyframes cw-links-fade { from { opacity: 0; } to { opacity: 1; } }
        .cw-links-pane-title { margin: 16px 0 4px; font-size: 18px; line-height: 24px; font-weight: 500; color: ${Xe.textPrimary}; }
        .cw-links-pane-sub { display: flex; align-items: center; gap: 8px; font-size: 12px; line-height: 16px; color: ${Xe.textSecondary}; }
        .cw-links-pane-sub .cw-links-cat-dot { width: 8px; height: 8px; }
        .cw-links-pane-live { margin-top: 8px; font-size: 12px; line-height: 16px; color: ${Xe.textSecondary}; font-variant-numeric: tabular-nums; }
        .cw-links-pane-block { margin-top: 16px; }
        .cw-links-pane-block h4 { margin: 0 0 4px; font-size: 12px; line-height: 16px; font-weight: 500; color: ${Xe.textSecondary}; }
        .cw-links-pane-block p { margin: 0; font-size: 14px; line-height: 20px; color: ${Xe.textPrimary}; }
        .cw-links-pane-plain { margin: 16px 0 0; font-size: 14px; line-height: 20px; color: ${Xe.textSecondary}; }
        .cw-links-pane-actions { margin-top: auto; padding-top: 24px; display: flex; flex-direction: column; gap: 8px; }
        .cw-links-pane-actions .row2 { display: flex; gap: 8px; }
        .cw-links-btn {
            height: 40px; padding: 0 24px; border-radius: 999px; background: ${Xe.blue}; color: #fff; font-size: 14px; font-weight: 500;
            display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: none; cursor: pointer; font-family: inherit; text-decoration: none;
            transition: background-color 0.15s ease, box-shadow 0.15s ease;
        }
        .cw-links-btn:hover { background: #1765CC; box-shadow: 0 2px 8px rgba(26,115,232,0.35); }
        .cw-links-btn svg { width: 18px; height: 18px; }
        .cw-links-ghost {
            flex: 1; height: 36px; padding: 0 8px; border-radius: 999px; border: 1px solid rgba(60,64,67,0.24); background: transparent;
            font-size: 13px; font-weight: 500; color: #3C4043; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
            cursor: pointer; font-family: inherit; transition: background-color 0.15s ease;
        }
        .cw-links-ghost:hover { background: rgba(255,255,255,0.7); }
        .cw-links-ghost svg { width: 18px; height: 18px; }
        .cw-links-ghost.on svg { color: #F9AB00; }
        .cw-links-ghost.ok { color: #188038; background: #E6F4EA; border-color: #188038; }
        .cw-links-ghost.ok svg { color: #188038; }

        .cw-links-empty-action { margin: 8px auto 0; display: block; background: none; border: none; color: ${Xe.blueText}; font-family: inherit; font-size: 13px; font-weight: 500; cursor: pointer; padding: 8px 16px; border-radius: 999px; }
        .cw-links-empty-action:hover { background: rgba(26,115,232,0.08); }

        .cw-links-popup :focus-visible { outline: 2px solid ${Xe.blue}; outline-offset: 2px; }
        /* O campo de busca j\xE1 mostra o foco no cont\xEAiner (:focus-within). */
        .cw-links-popup .cw-links-search-input:focus-visible { outline: none; }

        /* Janela estreita: o painel some e a lista ocupa tudo. A pr\xE9via s\xF3 existe
           para quem tem espa\xE7o \u2014 o texto do destaque continua no her\xF3i. */
        @media (max-width: 1000px) { .cw-links-pane { display: none; } }

        @media (prefers-reduced-motion: reduce) {
            .cw-links-hero, .cw-links-mini, .cw-links-row, .cw-links-nav-btn, .cw-links-nav-icon {
                transition: background-color 0.15s ease, box-shadow 0.15s ease !important;
                transform: none !important;
            }
            .cw-links-pane.swap > * { animation: none; }
        }
    `,document.head.appendChild(e)}var or="links_fav",Rn="links_recent",Nc="cw_link_history_v4",Sm=4e3;function Cm(){try{return JSON.parse(localStorage.getItem(Nc)||"[]")}catch{return[]}}function Se(e,t,a){let o=document.createElement(e);return t&&(o.className=t),a!=null&&(o.textContent=a),o}function Ba(e,t){let a=Se("span",t);return a.setAttribute("aria-hidden","true"),a.innerHTML=e,a}function kc(e,t,a){let o=Se("button",`cw-links-ib ${a||""}`);return o.type="button",o.title=t,o.setAttribute("aria-label",t),o.innerHTML=e,o}function Xo(e,t){let a=er(t,Be.custom);e.style.setProperty("--cat-color",a.color),e.style.setProperty("--cat-bg",a.bg)}function Tc(){navigator.vibrate&&navigator.vibrate(10)}function Lc(){let e="v5.0",t="",a="home",o=null,n=null,i=null,r=[],s=[],l=null,p=!1;ym();let c=document.createElement("div");c.id="links-popup",c.classList.add("cw-module-window","cw-links-popup"),Object.assign(c.style,ft,{right:"100px",width:"860px",height:"650px",maxWidth:"calc(100vw - 192px)",backgroundColor:"rgba(248,249,250,0.88)",overflow:"hidden"});let m={popup:c,googleLine:null},u=rt(c,$e("headerTitle"),e,$e("headerDesc"),m,()=>ce());c.appendChild(u);let h=u.querySelector("span"),L=Se("div","cw-links-layout");c.appendChild(L);let S=Se("nav","cw-links-sidebar");L.appendChild(S);let C=Se("div","cw-links-content");L.appendChild(C);let D=Se("div","cw-links-search-bar"),G=Se("div","cw-links-search-wrap"),F=Ba(Gt.search,"cw-links-search-icon"),R=Se("input","cw-links-search-input");R.type="text",R.placeholder=$e("searchPlaceholder"),R.setAttribute("aria-label",$e("searchPlaceholder")),G.append(F,R),D.appendChild(G),C.appendChild(D);let le=Se("div","cw-links-body"),te=Se("div","cw-links-scroll"),ee=Se("div");ee.style.display="contents",le.append(te,ee),C.appendChild(le);function $(){let v=Ye.get(or,[]),b=Ye.get(Rn,[]);r=Array.isArray(v)?v.filter(d=>typeof d=="string"):[],s=Array.isArray(b)?b.filter(d=>d&&typeof d.id=="string"):[]}function A(){let v=JSON.stringify(r);r=vc(r,Be.links,Be.fromCentral),JSON.stringify(r)!==v&&Ye.set(or,r).catch(()=>{});let b=JSON.stringify(s);if(s=xc(s,Be.links,Be.fromCentral),JSON.stringify(s)!==b&&Ye.set(Rn,s).catch(()=>{}),!p){p=!0;let d=Cm();if(d.length&&!s.length&&(s=wc(d,Be.links,Date.now()),Ye.set(Rn,s).catch(()=>{})),d.length)try{localStorage.removeItem(Nc)}catch{}}}function y(){Ye.set(or,r).catch(v=>console.warn("Favoritos n\xE3o sincronizaram",v))}function z(){l&&(clearTimeout(l),l=null,Ye.set(Rn,s).catch(v=>console.warn("Recentes n\xE3o sincronizaram",v)))}function U(v){s=fc(s,v,Date.now()),l&&clearTimeout(l),l=setTimeout(z,Sm)}window.addEventListener("pagehide",z);function M(v){return r.includes(v)}function Z(v){let b=gc(r,v);if(b.full){w.playError(),ne($e("favoritesFull")(Ki),{error:!0});return}r=b.list,y(),w.playClick(),Tc(),ne($e(b.added?"favAddedToast":"favRemovedToast")),X()}function de(v,b){navigator.clipboard.writeText(v.url).then(()=>{w.playClick(),Tc(),b.filter(Boolean).forEach(({node:d,restore:N})=>{d.classList.add("ok"),d.replaceChildren(),d.innerHTML=Gt.check,N.label&&d.append(document.createTextNode(N.label)),setTimeout(()=>{d.isConnected&&(d.classList.remove("ok"),d.replaceChildren(),d.innerHTML=N.icon,N.text&&d.append(document.createTextNode(N.text)))},1500)}),U(Ft(v)),ne($e("linkCopiedToast"))}).catch(()=>{w.playError(),ne($e("copyFailedToast"),{error:!0})})}function ve(v){return Be.highlights.active.find(b=>b.linkId===v)||null}function re(v){let b=ge(),d=Ft(v),N=Se("aside","cw-links-pane");N.setAttribute("aria-live","polite"),Xo(N,v.cat),N.appendChild(Ba(go(v.cat,Be.custom),"cw-links-ico lg")),N.appendChild(Se("h3","cw-links-pane-title",v.name));let _=Se("div","cw-links-pane-sub");_.appendChild(Se("i","cw-links-cat-dot"));let g="";try{g=new URL(v.url).host}catch{g=v.url}_.appendChild(Se("span","",`${Yo(v.cat,b,Be.custom)} \xB7 ${g}`)),N.appendChild(_);let x=ve(d);x&&N.appendChild(Se("div","cw-links-pane-live",x.endsAt?$e("liveUntil")(Cc(x.endsAt,b)):$e("liveNow")));let I=la(v,"about",b),E=la(v,"when",b);if(I||E){if(I){let Ee=Se("div","cw-links-pane-block");Ee.append(Se("h4","",$e("aboutLabel")),Se("p","",I)),N.appendChild(Ee)}if(E){let Ee=Se("div","cw-links-pane-block");Ee.append(Se("h4","",$e("whenLabel")),Se("p","",E)),N.appendChild(Ee)}}else{let Ee=la(v,"desc",b);Ee&&N.appendChild(Se("p","cw-links-pane-plain",Ee))}let W=Se("div","cw-links-pane-actions"),H=Se("a","cw-links-btn");H.href=v.url,H.target="_blank",H.rel="noopener noreferrer",H.dataset.openId=d,H.append(Ba(Gt.open),document.createTextNode($e("openLink"))),W.appendChild(H);let ae=Se("div","row2"),fe=Se("button","cw-links-ghost");fe.type="button",fe.innerHTML=Gt.copy,fe.append(document.createTextNode($e("copyUrl"))),fe.addEventListener("click",()=>de(v,[{node:fe,restore:{icon:Gt.copy,text:$e("copyUrl"),label:$e("copied")}}]));let Te=M(d),Me=Se("button",`cw-links-ghost ${Te?"on":""}`);return Me.type="button",Me.setAttribute("aria-pressed",String(Te)),Me.innerHTML=Te?Gt.star:Gt.starOutline,Me.append(document.createTextNode($e(Te?"favorited":"favorite"))),Me.addEventListener("click",()=>Z(d)),ae.append(fe,Me),W.appendChild(ae),N.appendChild(W),N}function be(v){let b=Be.byId.get(i);if(ee.replaceChildren(),!b)return;let d=re(b);v&&d.classList.add("swap"),ee.appendChild(d)}function pe(v){!v||v===i||!Be.byId.has(v)||(i=v,be(!0))}function he(v){if(v.includes(i))return i;let b=[Be.highlights.active[0]?.linkId,r.find(N=>Be.byId.has(N)),s.find(N=>Be.byId.has(N.id))?.id].filter(Boolean);return(a==="home"?b[0]:null)||v[0]||b[0]||Ft(Be.links[0]||{url:""})}function T(v,b){v.addEventListener("click",()=>U(b)),v.addEventListener("auxclick",d=>{d.button===1&&U(b)})}function Y(v){let b=ge(),d=Se("a","cw-links-hero");d.href=v.link.url,d.target="_blank",d.rel="noopener noreferrer",d.dataset.linkId=v.linkId,Xo(d,v.link.cat);let N=Se("div","cw-links-eyebrow");return N.append(Ba(go(v.link.cat,Be.custom)),Se("b","",v.link.name)),v.endsAt&&N.append(Se("span","cw-links-eyebrow-end",$e("until")(Fn(v.endsAt,b)))),d.append(N,Se("h2","cw-links-hero-title",v.headline)),v.blurb&&d.append(Se("p","cw-links-hero-blurb",v.blurb)),T(d,v.linkId),d}function se(v){let b=ge(),d=Se("a","cw-links-mini");d.href=v.link.url,d.target="_blank",d.rel="noopener noreferrer",d.dataset.linkId=v.linkId,Xo(d,v.link.cat);let N=Se("div","cw-links-eyebrow");return N.append(Ba(go(v.link.cat,Be.custom)),Se("b","",v.link.name)),d.append(N,Se("div","cw-links-mini-title",v.headline)),v.endsAt&&d.append(Se("div","cw-links-mini-until",$e("until")(Fn(v.endsAt,b)))),T(d,v.linkId),d}function V(v,b,d){let N=ge(),_=Ft(v),g=Se("div","cw-links-row");g.dataset.linkId=_,Xo(g,v.cat);let x=Se("a","cw-links-row-link");x.href=v.url,x.target="_blank",x.rel="noopener noreferrer";let I=Se("div","cw-links-row-text"),E=Se("div","cw-links-row-name");O(E,v.name,d),I.append(E,Se("div","cw-links-row-desc",la(v,"desc",N))),x.append(Ba(go(v.cat,Be.custom),"cw-links-ico"),I),b&&x.append(Se("span","cw-links-row-meta",b)),T(x,_);let W=Se("div","cw-links-row-acts"),H=M(_),ae=kc(H?Gt.star:Gt.starOutline,$e(H?"favoriteRemove":"favoriteAdd"),`star ${H?"on":"hid"}`);ae.setAttribute("aria-pressed",String(H)),ae.addEventListener("click",()=>Z(_));let fe=kc(Gt.copy,$e("copyUrl"),"hid");return fe.addEventListener("click",()=>de(v,[{node:fe,restore:{icon:Gt.copy}}])),W.append(ae,fe),g.append(x,W),g}function O(v,b,d){let N=(d||"").trim();if(!N){v.textContent=b;return}let _=I=>I.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),g=_(b);if(g.length!==b.length){v.textContent=b;return}let x=g.indexOf(_(N));if(x===-1){v.textContent=b;return}v.append(document.createTextNode(b.slice(0,x)),Object.assign(Se("mark"),{textContent:b.slice(x,x+N.length)}),document.createTextNode(b.slice(x+N.length)))}function k(){S.replaceChildren();let v=(_,g,x,I,E)=>{let W=Se("button",`cw-links-nav-btn ${I?"active":""}`);return W.type="button",W.title=g,W.setAttribute("aria-label",g),I&&W.setAttribute("aria-current","page"),W.dataset.key=_,W.style.setProperty("--cat-color",E.color),W.style.setProperty("--cat-bg",E.bg),W.append(Ba(x,"cw-links-nav-icon"),Se("span","cw-links-nav-label",g)),W},b=ge(),d=a==="home"&&!t.trim(),N=v("home",$e("home"),Gt.home,d,{color:Xe.blue,bg:"#E8F0FE"});N.id="cw-sidebar-btn-home",N.addEventListener("click",()=>{w.playClick(),j(),a="home",X()}),S.appendChild(N),S.appendChild(Se("div","cw-links-nav-sep")),tr(Be.links,Be.custom).forEach(_=>{let g=er(_,Be.custom),x=a==="library"&&!t.trim()&&n===_,I=v(_,Yo(_,b,Be.custom),go(_,Be.custom),x,g);I.id=`cw-sidebar-btn-${_}`,I.addEventListener("click",()=>{w.playClick(),j(),a="library",n=_,X();let E=document.getElementById(`cat-anchor-${_}`);E&&E.scrollIntoView({behavior:"smooth",block:"start"})}),S.appendChild(I)}),S.querySelector(".cw-links-nav-btn.active")?.scrollIntoView?.({block:"nearest"})}function j(){t="",R.value=""}function ie(){let v=ge(),{active:b,ended:d}=Be.highlights,N=[];if(b.length){te.append(Se("div","cw-links-label",$e("featured"))),te.append(Y(b[0])),N.push(b[0].linkId);let H=b.slice(1);if(H.length){let ae=Se("div",`cw-links-grid2 ${H.length===1?"single":""}`);H.forEach(fe=>{ae.append(se(fe)),N.push(fe.linkId)}),te.append(ae)}}let g={fav:(H=>H.map(ae=>Be.byId.get(ae)).filter(Boolean))(r).map(H=>({link:H,meta:""})),rec:s.map(H=>({link:Be.byId.get(H.id),meta:Ac(H.t,Date.now(),v)})).filter(H=>H.link),ex:d.map(H=>({link:H.link,meta:$e("endedOn")(Fn(H.endsAt,v))}))},x=[["fav","tabFavorites"],["rec","tabRecent"],["ex","tabEnded"]],I=o||(x.find(([H])=>g[H].length)||x[0])[0],E=Se("div","cw-links-seg");E.setAttribute("role","tablist"),x.forEach(([H,ae])=>{let fe=Se("button","",$e(ae));fe.type="button",fe.setAttribute("role","tab"),fe.setAttribute("aria-selected",String(H===I)),fe.addEventListener("click",()=>{o=H,X()}),E.append(fe)}),te.append(E);let W=g[I];if(W.length)W.forEach(({link:H,meta:ae})=>{te.append(V(H,ae)),N.push(Ft(H))});else{let H={fav:["emptyFavTitle","emptyFavSub"],rec:["emptyRecentTitle","emptyRecentSub"],ex:["emptyEndedTitle","emptyEndedSub"]}[I];te.append(To({icon:Gt.starOutline,title:$e(H[0]),subtitle:$e(H[1])}));let ae=Se("button","cw-links-empty-action",$e("browseAll"));ae.type="button",ae.addEventListener("click",()=>{a="library",n=null,X()}),te.append(ae)}return N}function P(){let v=ge(),b=t.trim(),d=[],N=b?Be.links.filter(g=>yc(g,b,v,Be.custom)):Be.links;if(b&&!N.length)return te.append(To({icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',title:$e("nothingFound"),subtitle:$e("noLinkMatches")(b)})),d;let _=mc(N,Be.custom);return b&&te.append(Se("div","cw-links-label",$e("resultsSummary")(N.length,_.size))),_.forEach((g,x)=>{let I=Se("div","cw-links-cathead");I.id=`cat-anchor-${x}`,Xo(I,x),I.append(Se("i","cw-links-cat-dot"),document.createTextNode(Yo(x,v,Be.custom))),te.append(I),g.forEach(E=>{te.append(V(E,"",b)),d.push(Ft(E))})}),d}function X(){let v=te.scrollTop;te.replaceChildren();let b=t.trim()||a==="library"?P():ie();k(),i=!b.length&&(t.trim()||a==="library")?null:he(b),be(!1),te.scrollTop=v}te.addEventListener("mouseover",v=>{let b=v.target.closest?.("[data-link-id]");b&&pe(b.dataset.linkId)}),te.addEventListener("focusin",v=>{let b=v.target.closest?.("[data-link-id]");b&&pe(b.dataset.linkId)}),ee.addEventListener("click",v=>{let b=v.target.closest?.("a[data-open-id]");b&&U(b.dataset.openId)}),ee.addEventListener("auxclick",v=>{let b=v.target.closest?.("a[data-open-id]");b&&v.button===1&&U(b.dataset.openId)}),R.addEventListener("input",v=>{t=v.target.value,X()});function ce(){let v=!ht(c);v?($(),X(),Je()):(z(),Qe()),ct(v,c,"cw-btn-links")}return document.body.appendChild(c),$(),X(),wm(()=>{A(),X()}),Ye.sync().then(()=>{$(),A(),X()}).catch(()=>{}),je(()=>{Be={...Be,highlights:ar(Be.rawHighlights,Be.links,ge())},h&&(h.textContent=$e("headerTitle"));let v=c.querySelector(".cw-help-title");v&&(v.textContent=$e("headerTitle"));let b=c.querySelector(".cw-help-description");b&&(b.textContent=$e("headerDesc")),R.placeholder=$e("searchPlaceholder"),R.setAttribute("aria-label",$e("searchPlaceholder")),X()}),ce}var Am=60*1e3,Fc="cw_read_broadcasts",Ic={pt:{headerTitle:"Central de Avisos",headerDesc:"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",searchPlaceholder:"Buscar avisos\u2026",clearSearch:"Limpar a busca",markRead:e=>`Marcar \u201C${e}\u201D como lido`,markReadShort:"Marcar como lido",publishedBy:e=>`Publicado por ${e}`,system:"Sistema",bauAvailability:"Disponibilidade BAU",attention:"aten\xE7\xE3o",full:"total",noDates:"sem datas publicadas",asideLabel:"Estado da opera\xE7\xE3o",filtersTitle:"Filtrar por tipo",filterAll:"Todos",readTitle:"Leitura",readCount:e=>e===1?"1 lido":`${e} lidos`,markAllRead:"Marcar tudo como lido",updatedAgo:e=>`Atualizado ${e}`,swapTo:e=>`Ver disponibilidade de ${e}`,justNow:"agora",minutesAgo:e=>`h\xE1 ${e} min`,hoursAgo:e=>`h\xE1 ${e} h`,yesterday:"ontem",nothingFound:"Nada encontrado.",allRead:"Tudo lido!",history:e=>`Hist\xF3rico (${e})`,typeLabel:{info:"Info",critical:"Alerta",success:"Sucesso"},syncing:"Sincronizando\u2026",updated:"Atualizado",offline:"Sem conex\xE3o \u2014 mostrando o que j\xE1 estava aqui"},es:{headerTitle:"Central de Avisos",headerDesc:"Comunicaci\xF3n oficial de la operaci\xF3n.",searchPlaceholder:"Buscar avisos\u2026",clearSearch:"Limpiar la b\xFAsqueda",markRead:e=>`Marcar \u201C${e}\u201D como le\xEDdo`,markReadShort:"Marcar como le\xEDdo",publishedBy:e=>`Publicado por ${e}`,system:"Sistema",bauAvailability:"Disponibilidad BAU",attention:"atenci\xF3n",full:"total",noDates:"sin fechas publicadas",asideLabel:"Estado de la operaci\xF3n",filtersTitle:"Filtrar por tipo",filterAll:"Todos",readTitle:"Lectura",readCount:e=>e===1?"1 le\xEDdo":`${e} le\xEDdos`,markAllRead:"Marcar todo como le\xEDdo",updatedAgo:e=>`Actualizado ${e}`,swapTo:e=>`Ver disponibilidad de ${e}`,justNow:"ahora",minutesAgo:e=>`hace ${e} min`,hoursAgo:e=>`hace ${e} h`,yesterday:"ayer",nothingFound:"No se encontr\xF3 nada.",allRead:"\xA1Todo le\xEDdo!",history:e=>`Historial (${e})`,typeLabel:{info:"Info",critical:"Alerta",success:"\xC9xito"},syncing:"Sincronizando\u2026",updated:"Actualizado",offline:"Sin conexi\xF3n \u2014 mostrando lo que ya estaba aqu\xED"},en:{headerTitle:"Broadcast Central",headerDesc:"Official communication from the operation.",searchPlaceholder:"Search broadcasts\u2026",clearSearch:"Clear the search",markRead:e=>`Mark \u201C${e}\u201D as read`,markReadShort:"Mark as read",publishedBy:e=>`Published by ${e}`,system:"System",bauAvailability:"BAU Availability",attention:"caution",full:"full",noDates:"no dates published",asideLabel:"Operation status",filtersTitle:"Filter by type",filterAll:"All",readTitle:"Read",readCount:e=>e===1?"1 read":`${e} read`,markAllRead:"Mark all as read",updatedAgo:e=>`Updated ${e}`,swapTo:e=>`View ${e} availability`,justNow:"just now",minutesAgo:e=>`${e} min ago`,hoursAgo:e=>`${e} h ago`,yesterday:"yesterday",nothingFound:"Nothing found.",allRead:"All read!",history:e=>`History (${e})`,typeLabel:{info:"Info",critical:"Alert",success:"Success"},syncing:"Syncing\u2026",updated:"Updated",offline:"No connection \u2014 showing what was already here"}};function qe(e){let t=ge();return Ic[t]?.[e]??Ic.pt[e]}var zn={PT:{label:"PT-BR",flag:'<svg class="cw-bc-bau-flag" viewBox="0 0 21 15" aria-hidden="true"><rect width="21" height="15" fill="#009B3A"/><path d="M10.5 1.9 19.1 7.5 10.5 13.1 1.9 7.5Z" fill="#FEDF00"/><circle cx="10.5" cy="7.5" r="3.3" fill="#002776"/></svg>'},ES:{label:"ES",flag:'<svg class="cw-bc-bau-flag" viewBox="0 0 21 15" aria-hidden="true"><rect width="21" height="15" fill="#AA151B"/><rect y="3.75" width="21" height="7.5" fill="#F1BF00"/></svg>'},EN:{label:"EN",flag:'<svg class="cw-bc-bau-flag" viewBox="0 0 21 15" aria-hidden="true"><rect width="21" height="15" fill="#012169"/><path d="M0 0l21 15M21 0L0 15" stroke="#FFF" stroke-width="3"/><path d="M0 0l21 15M21 0L0 15" stroke="#C8102E" stroke-width="2"/><path d="M10.5 0v15M0 7.5h21" stroke="#FFF" stroke-width="5"/><path d="M10.5 0v15M0 7.5h21" stroke="#C8102E" stroke-width="3"/></svg>'}},Em='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="17 2 21 6 17 10"></polyline><path d="M3 12V10a4 4 0 0 1 4-4h14"></path><polyline points="7 22 3 18 7 14"></polyline><path d="M21 12v2a4 4 0 0 1-4 4H3"></path></svg>',ir={critical:!0,info:!0,success:!0};function km(){if(document.getElementById("cw-broadcast-styles"))return;let e=document.createElement("style");e.id="cw-broadcast-styles",e.textContent=`
        .cw-btn-interactive { transition: transform 0.1s ease, background 0.2s ease; cursor: pointer; user-select: none; }
        .cw-btn-interactive:active { transform: scale(0.96); }

        /* --- SUPERF\xCDCIES ---
           O vidro precisa de um ch\xE3o. A vers\xE3o anterior empilhava card branco
           transl\xFAcido sobre um popup branco quase s\xF3lido, com borda de realce
           branca \u2014 medido, a borda dava contraste 1.00 (invis\xEDvel) e o card n\xE3o
           se separava do fundo. Era o "tudo branco junto" que tornava a leitura
           dif\xEDcil.

           A janela SEGUE transl\xFAcida (o backgroundColor de stylePopup n\xE3o \xE9
           sobrescrito). O fundo ambiente vai na \xE1rea de conte\xFAdo, aqui dentro:
           assim o m\xF3dulo continua sendo um painel de vidro sobre o CRM, e os
           cards passam a ter sobre o que flutuar. */
        /* O contexto de container fica na JANELA, n\xE3o no corpo. Um elemento n\xE3o
           pode ser estilizado pela pr\xF3pria container query: com o
           container-type aqui no .cw-bc-body, a regra que troca o
           flex-direction dele mais abaixo simplesmente n\xE3o valia, e encolher a
           janela espremia o feed a uma coluna de um caractere. */
        #broadcast-popup { container-type: inline-size; container-name: cwbc; }
        .cw-bc-body {
            flex: 1; min-height: 0; display: flex; gap: 0;
            background: linear-gradient(160deg, #E1E7EF 0%, #EFF2F7 55%, #E6EBF2 100%);
        }

        /* --- BUSCA --- */
        /* O padding e o posicionamento dos \xEDcones ficam em elementos
           DIFERENTES de prop\xF3sito. Quando estavam no mesmo, o top:50% dos
           \xEDcones era relativo \xE0 caixa com padding, n\xE3o ao input \u2014 e qualquer
           padding vertical assim\xE9trico os jogava fora do centro. Foi um bug
           real duas vezes neste arquivo; separar resolve por constru\xE7\xE3o. */
        .cw-bc-search-wrap { padding: 14px 20px; flex-shrink: 0; background: rgba(255,255,255,0.55); border-bottom: 1px solid rgba(0,0,0,0.07); }
        .cw-bc-search-field { position: relative; display: flex; }
        .cw-bc-search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #5f6368; pointer-events: none; display: flex; }
        .cw-bc-search-input {
            width: 100%; box-sizing: border-box; height: 38px; padding: 0 36px;
            border-radius: 10px; border: 1px solid rgba(0,0,0,0.10);
            background: rgba(255,255,255,0.85); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
            font-size: 13px; font-family: 'Google Sans', Roboto, sans-serif; color: #202124; outline: none;
            transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .cw-bc-search-input::placeholder { color: #70757a; }
        .cw-bc-search-input:focus { background: #fff; border-color: #1a73e8; box-shadow: 0 0 0 3px rgba(26,115,232,0.14); }
        .cw-bc-search-clear {
            position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
            width: 22px; height: 22px; padding: 0; border: none; border-radius: 50%; display: none;
            align-items: center; justify-content: center; color: #5f6368; cursor: pointer;
            background: transparent; touch-action: manipulation;
            transition: background-color 0.15s ease, color 0.15s ease;
        }
        .cw-bc-search-clear:hover { background: rgba(0,0,0,0.08); color: #202124; }
        .cw-bc-search-clear.visible { display: flex; }

        /* --- FEED --- */
        /* overscroll-behavior: o feed rola dentro de uma janela flutuante, e
           sem isto chegar ao fim dele passa a rolagem para a p\xE1gina do CRM
           atr\xE1s. */
        .cw-bc-feed {
            padding: 16px 20px 72px 20px; overflow-y: auto; overscroll-behavior: contain;
            flex: 1; min-width: 0;
            display: flex; flex-direction: column; gap: 12px;
        }

        /* Um cont\xEAiner por aviso, e s\xF3 um. A vers\xE3o anterior era caixa dentro
           de caixa: o card tinha borda e sombra, o cabe\xE7alho tinha outra borda
           embaixo, e o rodap\xE9 de a\xE7\xF5es tinha fundo pr\xF3prio. A hierarquia agora
           vem de tipografia e espa\xE7o, que \xE9 como o Material resolve.

           As duas arestas s\xE3o o que faz o vidro ler: hairline escura por fora
           para separar do fundo, realce branco por dentro para o painel ter
           volume. S\xF3 a de dentro, sobre fundo claro, n\xE3o separa nada. */
        .cw-bc-card {
            background: rgba(255,255,255,0.82); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
            border: 1px solid rgba(0,0,0,0.12); border-radius: 14px;
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 3px rgba(60,64,67,0.14);
            padding: 14px 16px; width: 100%; box-sizing: border-box; flex-shrink: 0;
            display: flex; flex-direction: column; gap: 6px;
            transition: opacity 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .cw-bc-card.history { box-shadow: none; opacity: 0.72; background: rgba(255,255,255,0.5); }

        .cw-bc-card-meta { display: flex; align-items: center; gap: 8px; min-width: 0; }
        /* O tipo do aviso \xE9 dito em texto normal, com um ponto na cor
           sem\xE2ntica. Era uma p\xEDlula em caixa alta sobre fundo colorido, que l\xEA
           como selo decorativo \u2014 e disputava com o t\xEDtulo a primeira leitura
           do card, sendo a informa\xE7\xE3o menos importante dos dois. */
        .cw-bc-type { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: #444746; white-space: nowrap; }
        .cw-bc-type-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .cw-bc-type-dot.critical { background: #C5221F; }
        .cw-bc-type-dot.info { background: #1A73E8; }
        .cw-bc-type-dot.success { background: #188038; }
        .cw-bc-meta-sep { color: #9aa0a6; font-size: 12px; }
        .cw-bc-date-tag { font-size: 12px; color: #5f6368; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }

        .cw-bc-msg-title { font-size: 15px; font-weight: 600; color: #202124; line-height: 1.35; margin: 0; text-wrap: pretty; }
        .cw-bc-msg-body { font-size: 13.5px; color: #3c4043; line-height: 1.55; white-space: pre-wrap; overflow-wrap: anywhere; }
        /* Global (n\xE3o escopado a .cw-bc-msg-body): parseMessageText() \xE9 usada
           tanto nos cards quanto na nota da faixa de disponibilidade. */
        .cw-bc-link { color: #1967d2; text-decoration: none; font-weight: 500; }
        .cw-bc-link:hover { text-decoration: underline; }
        .cw-bc-msg-author { font-size: 11px; color: #5f6368; }

        .cw-bc-dismiss-btn {
            width: 28px; height: 28px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.12);
            background: rgba(255,255,255,0.7); color: #444746; cursor: pointer; flex-shrink: 0;
            display: flex; align-items: center; justify-content: center; margin-left: auto;
            padding: 0; touch-action: manipulation;
            transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
        }
        .cw-bc-dismiss-btn:hover { color: #137333; background: #e6f4ea; border-color: #137333; }

        .cw-bc-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px 16px; color: #5f6368; gap: 14px; text-align: center; font-size: 13px; }
        .cw-bc-empty svg { color: #9aa0a6; }

        .cw-bc-history-container { display: none; flex-direction: column; gap: 12px; }

        /* --- ASIDE ---
           O que \xE9 ESTADO fica aqui; o que \xE9 FLUXO fica no feed. A
           disponibilidade BAU era uma faixa fixa em cima da lista, empurrando
           os avisos para baixo em toda abertura \u2014 estado ocupando o lugar do
           fluxo. Junto com ela vieram os filtros, o hist\xF3rico e o estado de
           sincroniza\xE7\xE3o, que tamb\xE9m s\xE3o estado e tamb\xE9m estavam espalhados
           dentro do feed. */
        .cw-bc-aside {
            width: 264px; flex-shrink: 0; overflow-y: auto; overscroll-behavior: contain;
            padding: 16px 16px 72px 0;
            display: flex; flex-direction: column; gap: 12px;
        }
        /* A janela \xE9 redimension\xE1vel. Abaixo de 620px as duas colunas ficariam
           espremidas, ent\xE3o o aside passa para cima do feed, em linha. */
        @container cwbc (max-width: 620px) {
            .cw-bc-body { flex-direction: column-reverse; }
            .cw-bc-aside {
                width: auto; padding: 12px 20px 0 20px; overflow: visible;
                flex-direction: row; flex-wrap: wrap; align-items: flex-start; gap: 8px;
            }
            /* align-items: flex-start acima, sen\xE3o os pain\xE9is esticam para a
               altura da linha e viram tr\xEAs ret\xE2ngulos vazios. */
            .cw-bc-aside .cw-bc-panel { flex: 1 1 200px; }
            .cw-bc-feed { padding-top: 12px; }
        }

        .cw-bc-panel {
            background: rgba(255,255,255,0.72); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(0,0,0,0.11); border-radius: 12px;
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.85);
            padding: 12px 14px; display: flex; flex-direction: column; gap: 10px;
        }
        .cw-bc-panel-title {
            font-size: 11px; font-weight: 600; color: #444746;
            letter-spacing: 0.3px;
        }

        /* --- Disponibilidade BAU (agora um item do aside) --- */
        .cw-bc-bau-top { display: flex; align-items: center; gap: 8px; }
        /* O contorno de 1px existe para a faixa amarela da bandeira da Espanha
           e o verde claro da do Brasil n\xE3o encostarem no fundo claro. */
        .cw-bc-bau-flag { width: 16px; height: 11px; border-radius: 1px; box-shadow: 0 0 0 1px rgba(0,0,0,0.25); flex-shrink: 0; display: block; }
        .cw-bc-bau-label { font-size: 12px; font-weight: 600; color: #202124; white-space: nowrap; }
        .cw-bc-bau-seg { font-size: 11px; color: #5f6368; }
        .cw-bc-bau-swap {
            width: 26px; height: 26px; border-radius: 50%; border: none; padding: 0;
            background: transparent; color: #5f6368; cursor: pointer; flex-shrink: 0;
            margin-left: auto;
            display: flex; align-items: center; justify-content: center;
            transition: background-color 0.15s ease, color 0.15s ease;
        }
        .cw-bc-bau-swap:hover { background: rgba(0,0,0,0.07); color: #202124; }
        .cw-bc-bau-dates { display: flex; flex-direction: column; gap: 6px; }
        .cw-bc-bau-date { display: flex; align-items: center; gap: 7px; }
        .cw-bc-bau-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .cw-bc-bau-date.attention .cw-bc-bau-dot { background: #B06000; }
        .cw-bc-bau-date.full .cw-bc-bau-dot { background: #137333; }
        .cw-bc-bau-kind { font-size: 11.5px; color: #5f6368; flex: 1; }
        /* tabular-nums para as datas n\xE3o dan\xE7arem de largura entre um poll e
           outro (o "1" \xE9 mais estreito que os outros d\xEDgitos em Google Sans). */
        .cw-bc-bau-value { font-size: 14px; font-weight: 600; color: #202124; font-variant-numeric: tabular-nums; }
        .cw-bc-bau-empty { font-size: 12px; color: #5f6368; }
        .cw-bc-bau-note { font-size: 11.5px; line-height: 1.45; color: #5f6368; }

        /* --- Filtros por tipo ---
           A contagem n\xE3o muda com a busca de prop\xF3sito: um n\xFAmero que dan\xE7a
           enquanto se digita n\xE3o serve para nada. Ela conta os avisos do
           segmento; a busca estreita o que aparece, n\xE3o o que existe. */
        .cw-bc-filters { display: flex; flex-direction: column; gap: 2px; }
        .cw-bc-filter {
            display: flex; align-items: center; gap: 8px; width: 100%;
            padding: 7px 8px; border: none; border-radius: 8px; cursor: pointer;
            background: transparent; font-family: inherit; font-size: 12.5px; color: #3c4043;
            text-align: left; touch-action: manipulation;
            transition: background-color 0.15s ease;
        }
        .cw-bc-filter:hover { background: rgba(0,0,0,0.055); }
        .cw-bc-filter[aria-pressed="true"] { background: #E8F0FE; color: #1967d2; font-weight: 600; }
        .cw-bc-filter-count { margin-left: auto; font-size: 12px; color: #5f6368; font-variant-numeric: tabular-nums; }
        .cw-bc-filter[aria-pressed="true"] .cw-bc-filter-count { color: #1967d2; }

        /* --- Hist\xF3rico, limpar e sincroniza\xE7\xE3o --- */
        .cw-bc-history-divider {
            display: flex; align-items: center; gap: 8px; width: 100%;
            padding: 7px 8px; border: none; border-radius: 8px; cursor: pointer;
            background: transparent; font-family: inherit; font-size: 12.5px; color: #3c4043;
            text-align: left; touch-action: manipulation; transition: background-color 0.15s ease;
        }
        .cw-bc-history-divider:hover { background: rgba(0,0,0,0.055); }
        .cw-bc-history-divider svg { margin-left: auto; transition: transform 0.25s ease; color: #5f6368; }
        .cw-bc-history-divider[aria-expanded="true"] { background: #E8F0FE; color: #1967d2; font-weight: 600; }
        .cw-bc-history-divider[aria-expanded="true"] svg { transform: rotate(180deg); }

        .cw-bc-clear-btn {
            border: none; background: transparent; color: #1967d2; cursor: pointer;
            font-family: inherit; font-size: 12.5px; font-weight: 500;
            padding: 7px 8px; border-radius: 8px; text-align: left; touch-action: manipulation;
            transition: background-color 0.15s ease;
        }
        .cw-bc-clear-btn:hover { background: rgba(26,115,232,0.10); }
        .cw-bc-clear-btn:disabled { color: #70757a; cursor: default; background: transparent; }

        /* O texto "Sincronizando" morava numa faixa no topo do feed, que
           aparecia e sumia empurrando a lista inteira. Virou um ponto fixo no
           aside: gira enquanto busca, e fora disso diz quando foi a \xFAltima vez. */
        .cw-bc-sync { display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: #5f6368; }
        .cw-bc-sync.offline { color: #9A5400; }
        .cw-bc-spinner {
            width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; box-sizing: border-box;
            border: 2px solid rgba(0,0,0,0.14); border-top-color: #1a73e8;
            animation: cw-bc-spin 0.7s linear infinite;
        }
        @keyframes cw-bc-spin { to { transform: rotate(360deg); } }
        .cw-bc-sync-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; background: #137333; }
        .cw-bc-sync.offline .cw-bc-sync-dot { background: #9A5400; }

        /* --- FOCO ---
           Uma regra s\xF3, para todo controle do m\xF3dulo. Antes nenhum tinha foco
           vis\xEDvel: quem navega por teclado percorria o feed \xE0s cegas. */
        .cw-bc-search-input:focus-visible,
        .cw-bc-search-clear:focus-visible,
        .cw-bc-dismiss-btn:focus-visible,
        .cw-bc-history-divider:focus-visible,
        .cw-bc-filter:focus-visible,
        .cw-bc-clear-btn:focus-visible,
        .cw-bc-bau-swap:focus-visible {
            outline: 2px solid #1a73e8;
            outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
            .cw-bc-spinner { animation: none; border-top-color: rgba(0,0,0,0.14); }
            .cw-bc-card {
                transition: opacity 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}var Tm={pt:"pt-BR",es:"es-ES",en:"en-US"};function Rc(e){if(!e)return"";try{let t=new Date(e);return isNaN(t.getTime())?String(e):new Intl.DateTimeFormat(Tm[ge()]||"pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(t)}catch{return String(e)}}function Nm(e){let t=String(e||"").split("-");return t.length===3?`${t[2]}/${t[1]}`:String(e||"")}function Lm(e){let t=new Date(e).getTime();if(!t||isNaN(t))return"";let a=Math.floor((Date.now()-t)/6e4);if(a<1)return qe("justNow");if(a<60)return qe("minutesAgo")(a);let o=Math.floor(a/60);return o<24?qe("hoursAgo")(o):o<48?qe("yesterday"):Rc(e).split(",")[0]}function _c(e){if(!e||typeof e!="string")return"";let t=e;return t=t.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" class="cw-bc-link">$1</a>'),t=t.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),t=t.replace(/_(.*?)_/g,"<i>$1</i>"),t=t.replace(/\n/g,"<br>"),t=Ts(t),t}function Dc(e){if(!e)return null;let t={};try{t=JSON.parse(e.value||"{}")}catch{return null}let a=String(t.title||e.label||"").trim(),o=String(t.text||"").trim();return!a||!o?null:{id:String(e.key||e.id||""),type:ir[t.type]?t.type:"info",title:a,text:o,date:String(t.publishedAt||e.publishedAt||""),author:String(t.author||e.publishedBy||""),lang:String(e.lang||"ALL").toUpperCase()}}function Im(e){if(!e)return null;let t=String(e.title||"").trim(),a=String(e.text||"").trim();return!t||!a||t.toLowerCase().includes("disponibilidade bau")?null:{id:String(e.id||""),type:ir[e.type]?e.type:"info",title:t,text:a,date:String(e.date||""),author:String(e.author||""),lang:"ALL"}}function Mc(e){let t=(e||[])[0];if(!t)return null;let a={};try{a=JSON.parse(t.value||"{}")}catch{return null}let o=a.segments||{},n={};return Object.keys(o).forEach(i=>{let r=String(o[i]?.attention||""),s=String(o[i]?.full||"");(r||s)&&(n[i]={attention:r,full:s})}),Object.keys(n).length?{updatedAt:String(a.updatedAt||t.publishedAt||""),author:String(a.author||t.publishedBy||""),note:String(a.note||""),segments:n}:null}function Oc(e,t){return e.lang==="ALL"||e.lang===t}function fo(){try{let e=JSON.parse(localStorage.getItem(Fc)||"[]");return Array.isArray(e)?e:[]}catch{return[]}}function qc(e){try{localStorage.setItem(Fc,JSON.stringify(e))}catch{}}function zc(){let e="v5.0",t=!1,a=null,o="",n=null,i=null,r=!1,s=[],l=null,p=null,c=null,m=null;km();let u=document.createElement("div");u.id="broadcast-popup",u.classList.add("cw-module-window"),Object.assign(u.style,ft,{right:"auto",left:"50%",width:"760px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",overflow:"hidden"});let h={popup:u,googleLine:null};function L(){if(t=!ht(u),ct(t,u,"cw-btn-broadcast"),t){Je();let P=document.getElementById("cw-btn-broadcast");P&&P.classList.remove("has-new"),n=null,i=null,r=!1,Z()}else Qe()}let S=rt(u,qe("headerTitle"),e,qe("headerDesc"),h,()=>L()),C=S.querySelector("span");u.appendChild(S);let D=document.createElement("div");D.className="cw-bc-search-wrap";let G=document.createElement("div");G.className="cw-bc-search-icon",G.setAttribute("aria-hidden","true"),G.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';let F=document.createElement("input");F.className="cw-bc-search-input no-drag",F.type="search",F.name="cw-broadcast-search",F.autocomplete="off",F.spellcheck=!1,F.placeholder=qe("searchPlaceholder"),F.setAttribute("aria-label",qe("searchPlaceholder"));let R=document.createElement("button");R.type="button",R.className="cw-bc-search-clear",R.setAttribute("aria-label",qe("clearSearch")),R.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';let le=document.createElement("div");le.className="cw-bc-search-field",le.append(G,F,R),D.appendChild(le),u.appendChild(D),F.addEventListener("input",P=>{o=P.target.value,R.classList.toggle("visible",o.length>0),O()}),R.onclick=()=>{F.value="",o="",R.classList.remove("visible"),O(),F.focus()};let te=document.createElement("div");te.className="cw-bc-body",u.appendChild(te);let ee=document.createElement("div");ee.className="cw-nice-scroll cw-bc-feed",ee.setAttribute("role","feed"),ee.setAttribute("aria-label",qe("headerTitle")),te.appendChild(ee);let $=document.createElement("aside");$.className="cw-nice-scroll cw-bc-aside",$.setAttribute("aria-label",qe("asideLabel")),te.appendChild($);let A=document.createElement("div");A.id="cw-bau-widget",A.className="cw-bc-panel",A.style.display="none",$.appendChild(A);let y=document.createElement("div");y.className="cw-bc-panel",$.appendChild(y);let z=document.createElement("div");z.className="cw-bc-panel",$.appendChild(z);let U=document.createElement("div");U.id="cw-update-status",U.className="cw-bc-sync",U.setAttribute("role","status"),U.setAttribute("aria-live","polite"),$.appendChild(U);function M({syncing:P=!1,online:X=!0}={}){if(U.classList.toggle("offline",!P&&!X),P){U.innerHTML=`<span class="cw-bc-spinner" aria-hidden="true"></span><span>${qe("syncing")}</span>`;return}let ce=m?Lm(m):"",v=X?ce?qe("updatedAgo")(ce):qe("updated"):qe("offline");U.innerHTML=`<span class="cw-bc-sync-dot" aria-hidden="true"></span><span>${v}</span>`}async function Z(){M({syncing:!0});let P=!0,X=Mo();try{let[ce,v]=await Promise.all([ke.fetchContentModule("broadcast"),ke.fetchContentModule("bau_availability")]);if(Array.isArray(ce)){let b=ce.map(Dc).filter(Boolean).filter(d=>Oc(d,X));s=ve(b)}else P=!1;l=Mc(v)}catch{P=!1}P&&(m=new Date().toISOString()),de(),re(),O(),M({online:P})}function de(){let P=l?l.updatedAt:null;if(!(p===null)&&!t){let ce=fo();(s.some(d=>!p.has(d.id)&&!ce.includes(d.id))||P&&P!==c)&&w.playNotification()}p=new Set(s.map(ce=>ce.id)),c=P}function ve(P){return P.slice().sort((X,ce)=>{let v=new Date(X.date).getTime()||0;return(new Date(ce.date).getTime()||0)-v})}function re(){let P=document.getElementById("cw-btn-broadcast");if(!P)return;let X=fo();if(s.some(v=>!X.includes(v.id))){if(P.classList.add("has-new"),!P.querySelector(".cw-badge")){let v=document.createElement("div");v.className="cw-badge",Object.assign(v.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),P.appendChild(v)}}else{P.classList.remove("has-new");let v=P.querySelector(".cw-badge");v&&v.remove()}}function be(){if(!l){A.style.display="none",A.innerHTML="";return}let P=Object.keys(zn).filter(x=>l.segments[x]);if(!P.length){A.style.display="none",A.innerHTML="";return}let X=n&&P.includes(n)?n:P.includes(Mo())?Mo():P[0],ce=zn[X],v=l.segments[X]||{},b=(x,I)=>`
          <span class="cw-bc-bau-date ${x}">
              <span class="cw-bc-bau-dot"></span>
              <span class="cw-bc-bau-kind">${qe(x)}</span>
              <span class="cw-bc-bau-value">${Nm(I)}</span>
          </span>`,d=[v.attention?b("attention",v.attention):"",v.full?b("full",v.full):""].join(""),N=P[(P.indexOf(X)+1)%P.length],_=N&&N!==X?`<button class="cw-bc-bau-swap" type="button"
                     aria-label="${qe("swapTo")(zn[N].label)}"
                     title="${qe("swapTo")(zn[N].label)}">${Em}</button>`:"";A.style.display="flex",A.innerHTML=`
          <div class="cw-bc-bau-top">
              ${ce.flag}
              <span class="cw-bc-bau-label">${qe("bauAvailability")}</span>
              <span class="cw-bc-bau-seg">${ce.label}</span>
              ${_}
          </div>
          <div class="cw-bc-bau-dates">
              ${d||`<span class="cw-bc-bau-empty">${qe("noDates")}</span>`}
          </div>
          ${l.note?`<div class="cw-bc-bau-note">${_c(l.note)}</div>`:""}
      `;let g=A.querySelector(".cw-bc-bau-swap");g&&(g.onclick=()=>{n=N,w.playClick(),be()})}function pe(){let P={critical:0,info:0,success:0};s.forEach(v=>{P[v.type]=(P[v.type]||0)+1});let X=(v,b,d)=>`
          <button class="cw-bc-filter" type="button" data-tipo="${v}"
                  aria-pressed="${i===v}">
              ${v==="all"?"":`<span class="cw-bc-type-dot ${v}"></span>`}
              <span>${b}</span>
              <span class="cw-bc-filter-count">${d}</span>
          </button>`;y.innerHTML=`
          <div class="cw-bc-panel-title">${qe("filtersTitle")}</div>
          <div class="cw-bc-filters">
              ${X("all",qe("filterAll"),s.length)}
              ${Object.keys(P).map(v=>X(v,qe("typeLabel")[v],P[v])).join("")}
          </div>
      `,y.querySelectorAll(".cw-bc-filter").forEach(v=>{v.onclick=()=>{let b=v.dataset.tipo;i=b==="all"||b===i?null:b,w.playClick(),O()}});let ce=y.querySelector('[data-tipo="all"]');ce&&ce.setAttribute("aria-pressed",String(i===null))}function he(){let P=fo(),X=s.filter(v=>P.includes(v.id)).length,ce=s.length-X;z.innerHTML=`
          <div class="cw-bc-panel-title">${qe("readTitle")}</div>
          <button class="cw-bc-history-divider" type="button"
                  aria-expanded="${r}" aria-controls="cw-bc-history">
              <span>${qe("readCount")(X)}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <button class="cw-bc-clear-btn" type="button" ${ce?"":"disabled"}>
              ${qe("markAllRead")}
          </button>
      `,z.querySelector(".cw-bc-history-divider").onclick=()=>{w.playClick(),r=!r,O()},z.querySelector(".cw-bc-clear-btn").onclick=()=>{ce&&(w.playSuccess(),qc(s.map(v=>v.id)),O(),re())}}let T=0;function Y(P,X){let ce=document.createElement("article");ce.className="cw-bc-card"+(X?" history":"");let v=ir[P.type]?P.type:"info",b=`cw-bc-title-${++T}`;ce.setAttribute("aria-labelledby",b);let d=document.createElement("div");if(d.className="cw-bc-card-meta",d.innerHTML=`
        <span class="cw-bc-type">
            <span class="cw-bc-type-dot ${v}"></span>${qe("typeLabel")[v]}
        </span>
        <span class="cw-bc-meta-sep" aria-hidden="true">\xB7</span>
        <span class="cw-bc-date-tag">${Rc(P.date)}</span>
    `,!X){let x=document.createElement("button");x.type="button",x.className="cw-bc-dismiss-btn",x.setAttribute("aria-label",qe("markRead")(P.title)),x.title=qe("markReadShort"),x.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>',x.onclick=I=>{I.stopPropagation(),w.playClick(),ce.style.transform="translateX(20px)",ce.style.opacity="0",setTimeout(()=>{let E=fo();E.push(P.id),qc(E),O(),re()},300)},d.appendChild(x)}let N=document.createElement("h3");N.className="cw-bc-msg-title",N.id=b,N.textContent=P.title;let _=document.createElement("div");_.className="cw-bc-msg-body",_.innerHTML=_c(P.text);let g=document.createElement("div");return g.className="cw-bc-msg-author",g.textContent=qe("publishedBy")(P.author||qe("system")),ce.append(d,N,_,g),ce}function se(P,X){return i&&P.type!==i?!1:X?`${P.title||""} ${P.text||""}`.toLowerCase().includes(X):!0}function V(P,X){let ce=P.filter(b=>!X.includes(b.id)),v=P.filter(b=>X.includes(b.id));if(!ce.length&&!(r&&v.length)){let b=o.trim().length>0||i!==null,d=document.createElement("div");d.className="cw-bc-empty",d.innerHTML=b?`<div>${qe("nothingFound")}</div>`:`
               <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
               <div>${qe("allRead")}</div>
              `,ee.appendChild(d);return}if(ce.forEach(b=>ee.appendChild(Y(b,!1))),r&&v.length){let b=document.createElement("div");b.className="cw-bc-history-container",b.id="cw-bc-history",b.style.display="flex",v.forEach(d=>b.appendChild(Y(d,!0))),ee.appendChild(b)}}function O(){be(),pe(),he(),ee.innerHTML="";let P=fo(),X=o.trim().toLowerCase();V(s.filter(ce=>se(ce,X)),P)}let k=ke.getCachedContent("broadcast");Array.isArray(k)&&k.length?s=ve(k.map(Dc).filter(Boolean).filter(P=>Oc(P,Mo()))):s=ve(ke.getCachedBroadcasts().map(Im).filter(Boolean)),l=Mc(ke.getCachedContent("bau_availability")),O(),Z(),a||(a=setInterval(Z,Am));let j=document.createElement("div");Object.assign(j.style,Yt),j.className="no-drag",u.appendChild(j),Xt(u,j),document.body.appendChild(u);let ie=s.some(P=>!fo().includes(P.id));return je(()=>{C&&(C.textContent=qe("headerTitle"));let P=u.querySelector(".cw-help-title");P&&(P.textContent=qe("headerTitle"));let X=u.querySelector(".cw-help-description");X&&(X.textContent=qe("headerDesc")),F.placeholder=qe("searchPlaceholder"),F.setAttribute("aria-label",qe("searchPlaceholder")),R.setAttribute("aria-label",qe("clearSearch")),ee.setAttribute("aria-label",qe("headerTitle")),$.setAttribute("aria-label",qe("asideLabel")),O(),M({online:!0})}),{toggle:L,hasUnread:ie}}var $c="cw-wizard-shell-styles",Pc={pt:{back:"Voltar",skip:"Pular",next:"Pr\xF3ximo",done:"Concluir",dotsGroup:"Navega\xE7\xE3o entre os slides",report:"Reportar bug ou sugest\xE3o",createdBy:"criado por",slideLabel:(e,t)=>`Slide ${e} de ${t}`,announce:(e,t,a,o)=>`Slide ${e} de ${t}: ${a}. ${o}`},es:{back:"Volver",skip:"Omitir",next:"Siguiente",done:"Finalizar",dotsGroup:"Navegaci\xF3n entre las diapositivas",report:"Reportar error o sugerencia",createdBy:"creado por",slideLabel:(e,t)=>`Diapositiva ${e} de ${t}`,announce:(e,t,a,o)=>`Diapositiva ${e} de ${t}: ${a}. ${o}`},en:{back:"Back",skip:"Skip",next:"Next",done:"Finish",dotsGroup:"Slide navigation",report:"Report a bug or suggestion",createdBy:"created by",slideLabel:(e,t)=>`Slide ${e} of ${t}`,announce:(e,t,a,o)=>`Slide ${e} of ${t}: ${a}. ${o}`}};function ma(e){let t=ge();return Pc[t]?.[e]??Pc.pt[e]}var Bc=160,rr=320,_m=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function Dm(){if(document.getElementById($c))return;let e=document.createElement("style");e.id=$c,e.textContent=`
        .cw-wiz-overlay {
            --cw-wiz-swap: ${Bc}ms;
            --cw-wiz-shell: ${rr}ms;

            position: fixed; inset: 0;
            background: rgba(32, 33, 36, 0.62);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 2147483646;
            display: flex; align-items: center; justify-content: center;
            padding: 24px;
            box-sizing: border-box;
            opacity: 0;
            transition: opacity var(--cw-wiz-shell) var(--cw-ease-standard);
        }
        .cw-wiz-overlay.open { opacity: 1; }

        .cw-wiz-card {
            position: relative;
            width: 400px;
            max-width: 100%;
            max-height: 100%;
            overflow-y: auto;
            box-sizing: border-box;
            background: var(--cw-surface, #fff);
            border-radius: 24px;
            padding: 32px;
            text-align: center;
            font-family: 'Google Sans', Roboto, sans-serif;
            box-shadow: 0 24px 60px rgba(0, 0, 0, 0.32);
            /* A entrada \xE9 o \xFAnico momento em que o card se move, ent\xE3o
               will-change entra aqui e sai (removeProperty) assim que a
               anima\xE7\xE3o de abertura termina - Fase 2 da auditoria. */
            opacity: 0;
            transform: translateY(24px) scale(0.96);
            transition:
                opacity var(--cw-wiz-shell) var(--cw-ease-decelerate),
                transform var(--cw-wiz-shell) var(--cw-ease-decelerate);
        }
        .cw-wiz-overlay.open .cw-wiz-card {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        /* Sa\xEDda usa a curva de acelera\xE7\xE3o - sai mais r\xE1pido do que entrou,
           que \xE9 a assimetria que o resto do app j\xE1 segue (genie open/close). */
        .cw-wiz-overlay.closing .cw-wiz-card {
            transition:
                opacity var(--cw-wiz-shell) var(--cw-ease-accelerate),
                transform var(--cw-wiz-shell) var(--cw-ease-accelerate);
        }

        /* "Pular" vive no canto, n\xE3o no rodap\xE9. Com ele l\xE1 embaixo eram tr\xEAs
           bot\xF5es numa linha de 336px \xFAteis, e a 380px de viewport a linha
           estourava (scrollWidth > clientWidth) espremendo o bot\xE3o principal.
           No canto ele tamb\xE9m para de competir visualmente com a a\xE7\xE3o que a
           gente de fato quer que a pessoa tome. */
        .cw-wiz-card.has-skip { padding-top: 48px; }
        .cw-wiz-skip {
            position: absolute;
            top: 14px; right: 16px;
            padding: 6px 12px;
            border: none; border-radius: 14px;
            background: transparent;
            color: var(--cw-text-sub, #5f6368);
            font-family: inherit; font-size: 13px; font-weight: 600;
            cursor: pointer;
            transition:
                background-color 0.2s var(--cw-ease-standard),
                color 0.2s var(--cw-ease-standard);
        }
        .cw-wiz-skip:hover {
            background: rgba(60, 64, 67, 0.08);
            color: var(--cw-text, #202124);
        }
        .cw-wiz-skip:focus-visible {
            outline: 2px solid var(--cw-primary, #1a73e8);
            outline-offset: 2px;
        }
        .cw-wiz-skip[hidden] { display: none; }

        .cw-wiz-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            background: #E8F0FE;
            color: #1967D2;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 16px;
        }

        /* O "palco": tudo que troca de um slide pro outro vive aqui dentro,
           pra que o cross-fade seja UM efeito s\xF3, e n\xE3o tr\xEAs elementos
           desaparecendo em tempos ligeiramente diferentes. */
        .cw-wiz-stage {
            transition:
                opacity var(--cw-wiz-swap) var(--cw-ease-standard),
                transform var(--cw-wiz-swap) var(--cw-ease-standard);
        }
        .cw-wiz-stage.swapping-next { opacity: 0; transform: translateX(-10px); }
        .cw-wiz-stage.swapping-prev { opacity: 0; transform: translateX(10px); }

        .cw-wiz-icon { font-size: 44px; line-height: 1; margin-bottom: 18px; display: block; }
        .cw-wiz-title {
            font-size: 21px; font-weight: 700; line-height: 1.3;
            color: var(--cw-text, #202124); margin-bottom: 10px;
        }
        .cw-wiz-text {
            font-size: 14.5px; line-height: 1.6;
            color: var(--cw-text-sub, #5f6368);
            /* Reserva a altura de ~3 linhas pra que slides curtos n\xE3o encolham
               o card e slides longos n\xE3o o estiquem de repente - o card
               "pulando" entre slides era o efeito mais percept\xEDvel dos dois
               wizards antigos. */
            min-height: 4.8em;
            margin-bottom: 28px;
        }

        .cw-wiz-dots {
            display: flex; justify-content: center; align-items: center;
            gap: 8px; margin-bottom: 22px;
        }
        .cw-wiz-dot {
            width: 8px; height: 8px; padding: 0;
            border: none; border-radius: 50%;
            background: var(--cw-border, #dadce0);
            cursor: pointer; appearance: none;
            transition:
                width var(--cw-wiz-swap) var(--cw-ease-spring),
                background-color var(--cw-wiz-swap) var(--cw-ease-standard);
        }
        .cw-wiz-dot:hover { background: #bdc1c6; }
        .cw-wiz-dot.active {
            width: 24px; border-radius: 4px;
            background: var(--cw-primary, #1a73e8);
        }
        .cw-wiz-dot:focus-visible {
            outline: 2px solid var(--cw-primary, #1a73e8);
            outline-offset: 3px;
        }

        .cw-wiz-actions {
            display: flex; align-items: center; gap: 8px;
        }

        /* Onboarding e Changelog s\xE3o as duas \xFAnicas telas do app que n\xE3o
           passam pelo header-factory, ent\xE3o n\xE3o herdavam o overlay de ajuda
           com cr\xE9dito e link de report. Este rodap\xE9 \xE9 o equivalente enxuto:
           uma linha, sem competir com os bot\xF5es de navega\xE7\xE3o acima. */
        .cw-wiz-footer {
            margin-top: 20px;
            padding-top: 16px;
            border-top: 1px solid var(--cw-hairline, #e8eaed);
            display: flex; justify-content: center; align-items: center; gap: 8px;
            font-size: 11px; color: #9aa0a6; letter-spacing: 0.3px;
        }
        .cw-wiz-footer a {
            color: var(--cw-primary, #1a73e8); text-decoration: none;
        }
        .cw-wiz-footer a:hover { text-decoration: underline; }
        .cw-wiz-footer a:focus-visible {
            outline: 2px solid var(--cw-primary, #1a73e8);
            outline-offset: 2px; border-radius: 2px;
        }
        .cw-wiz-footer .cw-wiz-credit-name { color: var(--cw-primary, #1a73e8); font-weight: 500; }
        .cw-wiz-btn {
            padding: 11px 24px;
            border-radius: 20px;
            border: none;
            cursor: pointer;
            font-family: inherit;
            font-size: 14px;
            font-weight: 600;
            /* Propriedades expl\xEDcitas: "transition: all" foi removido de ~25
               regras na Fase 5 e n\xE3o volta por aqui. */
            transition:
                background-color 0.2s var(--cw-ease-standard),
                box-shadow 0.2s var(--cw-ease-standard),
                color 0.2s var(--cw-ease-standard);
        }
        .cw-wiz-btn:focus-visible {
            outline: 2px solid var(--cw-primary, #1a73e8);
            outline-offset: 2px;
        }
        /* Hover \xE9 background/sombra, nunca transform. O transform no hover \xE9 o
           anti-padr\xE3o auto-referencial que a Fase 5 removeu de 7 lugares: o
           elemento cresce, sai de baixo do cursor, dispara mouseout, encolhe,
           volta pro cursor - e treme. */
        .cw-wiz-btn-primary {
            background: var(--cw-primary, #1a73e8);
            color: #fff;
            box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
            flex: 1;
        }
        .cw-wiz-btn-primary:hover {
            background: var(--cw-primary-hover, #1557b0);
            box-shadow: 0 6px 18px rgba(26, 115, 232, 0.38);
        }
        .cw-wiz-btn-ghost {
            background: transparent;
            color: var(--cw-text-sub, #5f6368);
        }
        .cw-wiz-btn-ghost:hover {
            background: rgba(60, 64, 67, 0.08);
            color: var(--cw-text, #202124);
        }
        .cw-wiz-btn[hidden] { display: none; }

        /* S\xF3 existe pra leitor de tela: anuncia o slide novo. Sem isso, avan\xE7ar
           o wizard \xE9 uma troca de conte\xFAdo completamente silenciosa. */
        .cw-wiz-live {
            position: absolute;
            width: 1px; height: 1px;
            margin: -1px; padding: 0; border: 0;
            clip: rect(0 0 0 0);
            clip-path: inset(50%);
            overflow: hidden; white-space: nowrap;
        }

        @media (prefers-reduced-motion: reduce) {
            .cw-wiz-overlay,
            .cw-wiz-overlay .cw-wiz-card,
            .cw-wiz-overlay.closing .cw-wiz-card {
                transition: opacity 0.15s linear !important;
                transform: none !important;
            }
            .cw-wiz-stage {
                transition: none !important;
                transform: none !important;
            }
            /* O conte\xFAdo ainda precisa sumir e voltar (sen\xE3o a troca acontece
               "por baixo" e some o feedback de que algo mudou), mas sem
               deslocamento lateral. */
            .cw-wiz-stage.swapping-next,
            .cw-wiz-stage.swapping-prev { opacity: 0; }
            .cw-wiz-dot { transition: none !important; }
        }

        /* Telas baixas (notebook em CRM com v\xE1rias barras): o card encosta nas
           bordas e o conte\xFAdo rola por dentro, em vez de estourar a viewport. */
        @media (max-height: 560px) {
            .cw-wiz-card { padding: 24px; }
            .cw-wiz-icon { font-size: 34px; margin-bottom: 12px; }
            .cw-wiz-text { min-height: 0; margin-bottom: 20px; }
        }
    `,document.head.appendChild(e)}var Mm='button:not([hidden]):not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';function $n({slides:e,idPrefix:t,badge:a=null,nextLabel:o=null,finalLabel:n=null,skipLabel:i=null,onSkip:r=null,onClose:s=()=>{}}){let l={next:o||ma("next"),final:n||ma("done"),skip:i};if(!Array.isArray(e)||e.length===0)return console.warn("[wizard-shell] chamado sem slides; nada a mostrar."),{close:()=>{}};Dm();let p=`${t}-title`,c=`${t}-text`,m=document.activeElement,u=0,h=!1,L=null,S=document.createElement("div");S.className="cw-wiz-overlay",S.setAttribute("role","dialog"),S.setAttribute("aria-modal","true"),S.setAttribute("aria-labelledby",p),S.setAttribute("aria-describedby",c);let C=document.createElement("div");if(C.className="cw-wiz-card",a){let T=document.createElement("div");T.className="cw-wiz-badge",T.textContent=a,C.appendChild(T)}let D=document.createElement("div");D.className="cw-wiz-stage";let G=document.createElement("div");G.className="cw-wiz-icon",G.setAttribute("aria-hidden","true");let F=document.createElement("div");F.className="cw-wiz-title",F.id=p;let R=document.createElement("div");R.className="cw-wiz-text",R.id=c,D.appendChild(G),D.appendChild(F),D.appendChild(R);let le=document.createElement("div");le.className="cw-wiz-live",le.setAttribute("aria-live","polite"),le.setAttribute("aria-atomic","true");let te=document.createElement("div");te.className="cw-wiz-dots",te.setAttribute("role","group"),te.setAttribute("aria-label",ma("dotsGroup"));let ee=document.createElement("div");ee.className="cw-wiz-actions";let $=document.createElement("button");$.type="button",$.className="cw-wiz-btn cw-wiz-btn-ghost",$.textContent=ma("back");let A=document.createElement("button");A.type="button",A.className="cw-wiz-skip",A.textContent=i||ma("skip"),i||(A.hidden=!0);let y=document.createElement("button");y.type="button",y.className="cw-wiz-btn cw-wiz-btn-primary",ee.appendChild($),ee.appendChild(y),i&&(C.classList.add("has-skip"),C.appendChild(A)),C.appendChild(D),C.appendChild(le),C.appendChild(te),C.appendChild(ee);let z=document.createElement("div");z.className="cw-wiz-footer";let U=document.createElement("a");U.href=Qa,U.target="_blank",U.rel="noopener noreferrer",U.textContent=ma("report");let M=document.createElement("span");M.textContent="\xB7",M.style.opacity="0.5",M.setAttribute("aria-hidden","true");let Z=document.createElement("span");Z.append(`${ma("createdBy")} `);let de=document.createElement("span");de.className="cw-wiz-credit-name",de.textContent=Wt,Z.appendChild(de),z.append(U,M,Z),C.appendChild(z),S.appendChild(C);let ve=e.map((T,Y)=>{let se=document.createElement("button");return se.type="button",se.className="cw-wiz-dot",se.setAttribute("aria-label",ma("slideLabel")(Y+1,e.length)),se.onmouseenter=()=>w.playHover(),se.onclick=()=>{Y!==u&&(w.playClick(),be(Y))},te.appendChild(se),se});function re(T){let Y=e[T];G.textContent=Y.icon||"",F.textContent=Y.title||"",R.textContent=Y.text||"",ve.forEach((V,O)=>{V.classList.toggle("active",O===T),V.setAttribute("aria-current",O===T?"true":"false")});let se=T===e.length-1;y.textContent=se?l.final:l.next,$.hidden=T===0,A.hidden=!i||se,le.textContent=ma("announce")(T+1,e.length,Y.title,Y.text)}function be(T){if(h||T===u||T<0||T>=e.length)return;let Y=T>u?"swapping-next":"swapping-prev";if(u=T,_m()){re(T);return}clearTimeout(L),D.classList.add(Y),L=setTimeout(()=>{re(T),D.classList.remove("swapping-next","swapping-prev")},Bc)}function pe({silent:T=!1}={}){h||(h=!0,clearTimeout(L),document.removeEventListener("keydown",he,!0),S.classList.add("closing"),S.classList.remove("open"),C.style.willChange="opacity, transform",T||w.playSuccess(),setTimeout(()=>{if(S.remove(),Qe(),m&&document.contains(m))try{m.focus({preventScroll:!0})}catch{}s()},rr))}function he(T){if(!h){if(T.key==="Tab"){let Y=Array.from(C.querySelectorAll(Mm)).filter(O=>!O.hidden&&O.offsetParent!==null);if(Y.length===0)return;let se=Y[0],V=Y[Y.length-1];T.shiftKey&&document.activeElement===se?(T.preventDefault(),V.focus()):!T.shiftKey&&document.activeElement===V&&(T.preventDefault(),se.focus());return}if(T.key==="Enter"){if(document.activeElement&&document.activeElement.classList.contains("cw-wiz-dot"))return;T.preventDefault(),T.stopPropagation(),y.click()}else T.key==="Escape"?(T.preventDefault(),T.stopPropagation(),A.hidden?pe():A.click()):T.key==="ArrowRight"?(T.preventDefault(),u<e.length-1&&(w.playClick(),be(u+1))):T.key==="ArrowLeft"&&(T.preventDefault(),u>0&&(w.playClick(),be(u-1)))}}return[$,A,y].forEach(T=>{T.onmouseenter=()=>w.playHover()}),y.onclick=()=>{w.playClick(),u<e.length-1?be(u+1):pe()},$.onclick=()=>{w.playClick(),be(u-1)},A.onclick=async()=>{w.playClick(),!(typeof r=="function"&&!await r())&&pe({silent:!0})},document.body.appendChild(S),Je(),re(0),C.style.willChange="opacity, transform",requestAnimationFrame(()=>{S.classList.add("open")}),setTimeout(()=>{C.style.removeProperty("will-change"),y.focus({preventScroll:!0})},rr),document.addEventListener("keydown",he,!0),{close:pe}}var Gc="cw_onboarding_seen_v1",jc={pt:[{icon:"\u{1F680}",title:"Bem-vindo ao Case Wizard",text:"Uma camada de produtividade que roda por cima do CRM. Ela n\xE3o substitui nada do que voc\xEA j\xE1 usa \u2014 s\xF3 tira o trabalho repetitivo do caminho."},{icon:"\u2328\uFE0F",title:"Tudo come\xE7a em dois lugares",text:"A p\xEDlula flutuante, sempre no canto da tela, abre qualquer m\xF3dulo com um clique. E Ctrl+K (ou \u2318K) abre a paleta de comandos: digite o que quer e v\xE1 direto, sem tirar a m\xE3o do teclado."},{icon:"\u{1F4DD}",title:"Notas e BAU sem retrabalho",text:"O Case Notes monta a nota t\xE9cnica do caso a partir do status e das tasks que voc\xEA marcar. O BAU Form cuida das solicita\xE7\xF5es de cria\xE7\xE3o e descarte, passo a passo."},{icon:"\u{1F4AC}",title:"Na hora de falar com o cliente",text:"O Email Assistant sugere templates que leem o contexto do caso, e o Call Script te guia pela chamada com um roteiro interativo \u2014 sem script decorado."},{icon:"\u{1F4DA}",title:"Seu material e o do time",text:'Minha Biblioteca guarda seus snippets e respostas prontas. A Central de Links re\xFAne SOPs e ferramentas, os Avisos trazem disponibilidade BAU, e os Fusos Hor\xE1rios respondem "que horas s\xE3o pra ele agora?".'},{icon:"\u{1F6DF}",title:"Nada se perde",text:"O que voc\xEA digita \xE9 salvo sozinho a cada poucos segundos, e d\xE1 pra estacionar um caso no meio e retomar de onde parou. Fechar a aba sem querer n\xE3o custa mais nada. Bom trabalho!"}],es:[{icon:"\u{1F680}",title:"Bienvenido a Case Wizard",text:"Una capa de productividad que funciona sobre el CRM. No reemplaza nada de lo que ya usas \u2014 solo quita el trabajo repetitivo del camino."},{icon:"\u2328\uFE0F",title:"Todo empieza en dos lugares",text:"La p\xEDldora flotante, siempre en la esquina de la pantalla, abre cualquier m\xF3dulo con un clic. Y Ctrl+K (o \u2318K) abre la paleta de comandos: escribe lo que buscas y ve directo, sin soltar el teclado."},{icon:"\u{1F4DD}",title:"Notas y BAU sin rehacer trabajo",text:"Case Notes arma la nota t\xE9cnica del caso a partir del estado y de las tareas que marques. BAU Form se encarga de las solicitudes de creaci\xF3n y descarte, paso a paso."},{icon:"\u{1F4AC}",title:"A la hora de hablar con el cliente",text:"Email Assistant sugiere plantillas que leen el contexto del caso, y Call Script te gu\xEDa por la llamada con un guion interactivo \u2014 sin nada memorizado."},{icon:"\u{1F4DA}",title:"Tu material y el del equipo",text:'Mi Biblioteca guarda tus fragmentos y respuestas listas. La Central de Enlaces re\xFAne SOPs y herramientas, los Avisos traen la disponibilidad BAU, y las Zonas Horarias responden "\xBFqu\xE9 hora es para \xE9l ahora?".'},{icon:"\u{1F6DF}",title:"Nada se pierde",text:"Lo que escribes se guarda solo cada pocos segundos, y puedes aparcar un caso a mitad de camino y retomarlo donde lo dejaste. Cerrar la pesta\xF1a sin querer ya no cuesta nada. \xA1Buen trabajo!"}],en:[{icon:"\u{1F680}",title:"Welcome to Case Wizard",text:"A productivity layer that runs on top of the CRM. It replaces nothing you already use \u2014 it just gets the repetitive work out of your way."},{icon:"\u2328\uFE0F",title:"It all starts in two places",text:"The floating pill, always in the corner of the screen, opens any module with one click. And Ctrl+K (or \u2318K) opens the command palette: type what you want and go straight there, without leaving the keyboard."},{icon:"\u{1F4DD}",title:"Notes and BAU without rework",text:"Case Notes builds the case's technical note from the status and the tasks you select. BAU Form handles creation and discard requests, step by step."},{icon:"\u{1F4AC}",title:"When it is time to talk to the customer",text:"Email Assistant suggests templates that read the case context, and Call Script guides you through the call with an interactive script \u2014 nothing to memorize."},{icon:"\u{1F4DA}",title:"Your material and the team's",text:'My Library keeps your snippets and ready-made replies. The Links Central gathers SOPs and tools, Broadcast brings BAU availability, and Timezones answer "what time is it for them right now?".'},{icon:"\u{1F6DF}",title:"Nothing gets lost",text:"What you type is saved on its own every few seconds, and you can park a case halfway through and pick it up where you left off. Closing the tab by accident no longer costs you anything. Have a good shift!"}]},Hc={pt:{next:"Pr\xF3ximo",start:"Come\xE7ar \u{1F680}",skip:"Pular",skipConfirm:"Pular a apresenta\xE7\xE3o? Voc\xEA pode explorar tudo pelo menu flutuante.",readyToast:"Tudo pronto! Use o menu flutuante ou Ctrl+K."},es:{next:"Siguiente",start:"Empezar \u{1F680}",skip:"Omitir",skipConfirm:"\xBFOmitir la presentaci\xF3n? Puedes explorar todo desde el men\xFA flotante.",readyToast:"\xA1Todo listo! Usa el men\xFA flotante o Ctrl+K."},en:{next:"Next",start:"Get started \u{1F680}",skip:"Skip",skipConfirm:"Skip the walkthrough? You can explore everything from the floating menu.",readyToast:"All set! Use the floating menu or Ctrl+K."}},Om=[{lang:"pt",flag:"\u{1F1E7}\u{1F1F7}",name:"Portugu\xEAs"},{lang:"es",flag:"\u{1F1EA}\u{1F1F8}",name:"Espa\xF1ol"},{lang:"en",flag:"\u{1F1FA}\u{1F1F8}",name:"English"}];function qm(){return new Promise(e=>{let t="cw-ob-lang-styles";if(!document.getElementById(t)){let p=document.createElement("style");p.id=t,p.textContent=`
                .cw-ob-lang-overlay {
                    position: fixed; inset: 0; z-index: 2147483646;
                    background: rgba(32, 33, 36, 0.62);
                    backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
                    display: flex; align-items: center; justify-content: center;
                    padding: 24px; box-sizing: border-box; opacity: 0;
                    transition: opacity 320ms var(--cw-ease-standard, ease);
                }
                .cw-ob-lang-overlay.open { opacity: 1; }
                .cw-ob-lang-card {
                    width: 400px; max-width: 100%; box-sizing: border-box;
                    background: var(--cw-surface, #fff); border-radius: 24px;
                    padding: 32px; text-align: center;
                    font-family: 'Google Sans', Roboto, sans-serif;
                    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.32);
                }
                .cw-ob-lang-icon { font-size: 44px; line-height: 1; margin-bottom: 16px; }
                .cw-ob-lang-title {
                    font-size: 20px; font-weight: 700; color: var(--cw-text, #202124);
                    margin: 0 0 6px;
                }
                .cw-ob-lang-sub {
                    font-size: 13px; color: var(--cw-text-sub, #5F6368);
                    margin: 0 0 24px; line-height: 1.5;
                }
                .cw-ob-lang-options { display: flex; flex-direction: column; gap: 10px; }
                .cw-ob-lang-btn {
                    display: flex; align-items: center; gap: 14px;
                    padding: 14px 18px; border-radius: 12px; cursor: pointer;
                    border: 1px solid var(--cw-border, #DADCE0); background: #fff;
                    font-family: inherit; font-size: 15px; font-weight: 500;
                    color: var(--cw-text, #202124); text-align: left;
                    transition: background-color 160ms var(--cw-ease-standard, ease),
                                border-color 160ms var(--cw-ease-standard, ease);
                }
                .cw-ob-lang-btn:hover { background: #f1f3f4; border-color: #bdc1c6; }
                .cw-ob-lang-btn:focus-visible {
                    outline: 2px solid var(--cw-primary, #1A73E8); outline-offset: 2px;
                }
                .cw-ob-lang-btn .flag { font-size: 22px; }
                @media (prefers-reduced-motion: reduce) {
                    .cw-ob-lang-overlay, .cw-ob-lang-btn { transition: none !important; }
                }
            `,document.head.appendChild(p)}let a=document.createElement("div");a.className="cw-ob-lang-overlay",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","Choose your language");let o=document.createElement("div");o.className="cw-ob-lang-card",o.innerHTML=`
            <div class="cw-ob-lang-icon">\u{1F310}</div>
            <h2 class="cw-ob-lang-title">Case Wizard</h2>
            <p class="cw-ob-lang-sub">
                Escolha o idioma da interface<br>
                Elige el idioma de la interfaz<br>
                Choose your interface language
            </p>
            <div class="cw-ob-lang-options"></div>
        `;let n=o.querySelector(".cw-ob-lang-options"),i=Om.filter(p=>ln.includes(p.lang)).map(p=>{let c=document.createElement("button");return c.type="button",c.className="cw-ob-lang-btn",c.dataset.lang=p.lang,c.innerHTML=`<span class="flag" aria-hidden="true">${p.flag}</span><span>${p.name}</span>`,c.onclick=()=>s(p.lang),n.appendChild(c),c}),r=!1;function s(p){r||(r=!0,Eo(p),document.removeEventListener("keydown",l,!0),a.classList.remove("open"),setTimeout(()=>a.remove(),320),e(p))}function l(p){if(p.key!=="ArrowDown"&&p.key!=="ArrowUp")return;p.preventDefault();let c=i.indexOf(document.activeElement),m=p.key==="ArrowDown"?1:-1,u=(c<0?0:c+m+i.length)%i.length;i[u].focus()}document.addEventListener("keydown",l,!0),a.appendChild(o),document.body.appendChild(a),requestAnimationFrame(()=>{a.classList.add("open"),(i.find(c=>c.dataset.lang===ge())||i[0])?.focus()})})}function Uc(){return localStorage.getItem(Gc)?Promise.resolve():(localStorage.setItem(Gc,"true"),qm().then(Fm))}function Fm(e){let t=jc[e]||jc.pt,a=Hc[e]||Hc.pt;return new Promise(o=>{$n({slides:t,idPrefix:"cw-onboarding",nextLabel:a.next,finalLabel:a.start,skipLabel:a.skip,onSkip:()=>ot(a.skipConfirm),onClose:()=>{ne(a.readyToast),o()}})})}var Pn={version:"v6.6.0",title:{pt:"Case Wizard v6.6.0",es:"Case Wizard v6.6.0",en:"Case Wizard v6.6.0"},slides:[{icon:"\u{1F4CB}",title:{pt:"Pre-call Checklist, direto na nota",es:"Pre-call Checklist, directo en la nota",en:"Pre-call Checklist, straight into the note"},text:{pt:'Um bot\xE3o novo na p\xEDlula (e no Ctrl+K) abre um formul\xE1rio curto que escreve o bloco "Pre-call checklist" no card de nota do caso \u2014 ou s\xF3 copia. Tasks, telefone, e-mail, site e CID que a tela do caso j\xE1 mostra chegam preenchidos e marcados como Auto: confira antes de gerar. A nota sai sempre em ingl\xEAs, que \xE9 o que a auditoria procura.',es:'Un bot\xF3n nuevo en la p\xEDldora (y en Ctrl+K) abre un formulario corto que escribe el bloque "Pre-call checklist" en la tarjeta de nota del caso \u2014 o solo lo copia. Las tasks, el tel\xE9fono, el correo, el sitio y el CID que la pantalla del caso ya muestra llegan completados y marcados como Auto: rev\xEDsalos antes de generar. La nota sale siempre en ingl\xE9s, que es lo que busca la auditor\xEDa.',en:`A new button on the pill (and in Ctrl+K) opens a short form that writes the "Pre-call checklist" block into the case's note card \u2014 or just copies it. The tasks, phone, email, website and CID the case screen already shows arrive pre-filled and tagged Auto: check them before generating. The note is always written in English, which is what the audit looks for.`}},{icon:"\u{1F517}",title:{pt:"Links ganhou uma home",es:"Links ahora tiene una p\xE1gina de inicio",en:"Links now has a home screen"},text:{pt:'Ao abrir Links, voc\xEA v\xEA at\xE9 3 destaques do momento e, logo abaixo, seus Favoritos, os Recentes e o que saiu do destaque. A busca agora acha tamb\xE9m pela descri\xE7\xE3o e pelo nome da categoria, sem depender de acento, e um painel de pr\xE9via mostra "O que \xE9" e "Quando usar" ao passar o mouse. Favoritos e recentes ficam salvos na nuvem, ent\xE3o acompanham voc\xEA.',es:'Al abrir Links ves hasta 3 destacados del momento y, justo debajo, tus Favoritos, los Recientes y lo que sali\xF3 de destacados. La b\xFAsqueda ahora tambi\xE9n encuentra por descripci\xF3n y por nombre de categor\xEDa, sin depender de las tildes, y un panel de vista previa muestra "Qu\xE9 es" y "Cu\xE1ndo usar" al pasar el mouse. Favoritos y recientes se guardan en la nube, as\xED que te acompa\xF1an.',en:'When you open Links you see up to 3 current highlights and, right below, your Favorites, Recent and what is no longer featured. Search now also matches the description and the category name, without depending on accents, and a preview panel shows "What it is" and "When to use" as you hover. Favorites and recents are saved in the cloud, so they follow you.'}},{icon:"\u{1F4D6}",title:{pt:"A documenta\xE7\xE3o est\xE1 a um clique",es:"La documentaci\xF3n est\xE1 a un clic",en:"The documentation is one click away"},text:{pt:'O "?" do cabe\xE7alho de cada m\xF3dulo e a se\xE7\xE3o Suporte & Feedback, em Configura\xE7\xF5es, agora levam ao deck de documenta\xE7\xE3o do Case Wizard. Travou num m\xF3dulo? Comece por ele.',es:'El "?" del encabezado de cada m\xF3dulo y la secci\xF3n Soporte y Comentarios, en Configuraci\xF3n, ahora llevan a la presentaci\xF3n de documentaci\xF3n de Case Wizard. \xBFTe trabaste en un m\xF3dulo? Empieza por ah\xED.',en:`The "?" in each module's header and the Support & Feedback section in Settings now open the Case Wizard documentation deck. Stuck in a module? Start there.`}}]};var Gn="cw_last_version",Vc={pt:{updateBadge:e=>`Atualiza\xE7\xE3o ${e}`,nextBtn:"Pr\xF3ximo",doneBtn:"Entendi, vamos l\xE1! \u{1F44D}",updatedToast:e=>`Case Wizard atualizado para ${e}!`},es:{updateBadge:e=>`Actualizaci\xF3n ${e}`,nextBtn:"Siguiente",doneBtn:"\xA1Entendido, vamos! \u{1F44D}",updatedToast:e=>`\xA1Case Wizard actualizado a ${e}!`},en:{updateBadge:e=>`Update ${e}`,nextBtn:"Next",doneBtn:"Got it, let\u2019s go! \u{1F44D}",updatedToast:e=>`Case Wizard updated to ${e}!`}};function Bn(e){let t=ge();return Vc[t]?.[e]??Vc.pt[e]}function Wc(e){let t=localStorage.getItem(Gn);if(!t){localStorage.setItem(Gn,e);return}if(t!==e){if(Pn.version!==e){console.warn(`[changelog] APP_VERSION \xE9 ${e} mas RELEASE_NOTES.version \xE9 ${Pn.version}. Modal suprimido at\xE9 os dois baterem (veja src/modules/changelog/changelog-data.js).`),localStorage.setItem(Gn,e);return}return zm(e)}}function Rm(){let e=ge(),t=a=>a?.[e]??a?.pt??"";return(Pn.slides||[]).map(a=>({...a,title:t(a.title),text:t(a.text)}))}function zm(e){let t=Rm();return new Promise(a=>{t.length||a(),$n({slides:t,idPrefix:"cw-changelog",badge:Bn("updateBadge")(e),nextLabel:Bn("nextBtn"),finalLabel:Bn("doneBtn"),onClose:()=>{localStorage.setItem(Gn,e),ne(Bn("updatedToast")(e)),a()}})})}var $m={pt:{title:"Lembrete de qualidade",text:"Siga as diretrizes de QA e o SOP do segmento do caso. O Case Wizard apenas auxilia no preenchimento; a qualidade do tratamento \xE9 responsabilidade do agente.",ok:"Entendi"},es:{title:"Recordatorio de calidad",text:"Sigue las directrices de QA y el SOP del segmento del caso. Case Wizard solo ayuda a rellenar; la calidad del tratamiento es responsabilidad del agente.",ok:"Entendido"},en:{title:"Quality reminder",text:"Follow the QA guidelines and the SOP for the case segment. Case Wizard only helps with filling things in; handling the case to the quality standard is the agent\u2019s responsibility.",ok:"Got it"}},sr=Wa($m),Yc="cw-qa-notice",Xc="cw-qa-notice-style",Pm=12e3,Bm=4e3,Kc=200;function Gm(){if(document.getElementById(Xc))return;let e=document.createElement("style");e.id=Xc,e.textContent=`
        .cw-qa-notice {
            position: fixed; left: 24px; bottom: 24px;
            z-index: ${gt.TOAST};
            box-sizing: border-box; width: 360px; max-width: calc(100vw - 48px);
            display: grid; grid-template-columns: 24px 1fr; column-gap: 12px;
            padding: 16px 16px 12px;
            background: rgba(248, 249, 250, 0.88);
            backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
            border-radius: 16px;
            box-shadow: 0 1px 2px rgba(60, 64, 67, 0.12),
                        0 8px 24px rgba(60, 64, 67, 0.18),
                        inset 0 0 0 1px rgba(255, 255, 255, 0.6);
            font-family: 'Google Sans', Roboto, sans-serif;
            color: var(--cw-text, #202124);
            opacity: 0; transform: translateY(8px);
            transition: opacity 280ms var(--cw-ease-decelerate, ease),
                        transform 280ms var(--cw-ease-decelerate, ease);
        }
        .cw-qa-notice.open { opacity: 1; transform: translateY(0); }
        .cw-qa-notice.closing {
            opacity: 0; transform: translateY(4px);
            transition-duration: ${Kc}ms;
            transition-timing-function: var(--cw-ease-standard, ease);
        }
        .cw-qa-notice-icon { width: 24px; height: 24px; color: var(--cw-primary, #1a73e8); }
        .cw-qa-notice-title { margin: 0 0 4px; font-size: 14px; font-weight: 500; line-height: 24px; }
        .cw-qa-notice-text {
            margin: 0; font-size: 13px; font-weight: 400; line-height: 20px;
            color: var(--cw-text-sub, #5f6368);
        }
        .cw-qa-notice-actions { grid-column: 2; display: flex; justify-content: flex-end; margin-top: 8px; }
        .cw-qa-notice-btn {
            min-height: 32px; padding: 0 12px; border: 0; border-radius: 16px;
            background: transparent; cursor: pointer;
            font: 500 13px 'Google Sans', Roboto, sans-serif; color: var(--cw-primary, #1a73e8);
            transition: background-color 160ms var(--cw-ease-standard, ease);
        }
        .cw-qa-notice-btn:hover { background: rgba(26, 115, 232, 0.08); }
        .cw-qa-notice-btn:focus-visible { outline: 2px solid var(--cw-primary, #1a73e8); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
            .cw-qa-notice, .cw-qa-notice.closing { transform: none !important; transition: opacity 150ms ease !important; }
            .cw-qa-notice-btn { transition: none !important; }
        }
    `,document.head.appendChild(e)}function Jc(){if(document.getElementById(Yc))return;Gm();let e=document.createElement("aside");e.id=Yc,e.className="cw-qa-notice",e.setAttribute("role","status"),e.innerHTML=`
        <svg class="cw-qa-notice-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z"/>
        </svg>
        <div>
            <p class="cw-qa-notice-title"></p>
            <p class="cw-qa-notice-text"></p>
        </div>
        <div class="cw-qa-notice-actions"><button type="button" class="cw-qa-notice-btn"></button></div>
    `;let t=e.querySelector(".cw-qa-notice-btn"),a=()=>{e.querySelector(".cw-qa-notice-title").textContent=sr("title"),e.querySelector(".cw-qa-notice-text").textContent=sr("text"),t.textContent=sr("ok")};a();let o=je(a),n=Pm,i=0,r=null,s=0,l=!1;function p(){i=Date.now(),r=setTimeout(h,n)}function c(){clearTimeout(r),n=Math.max(n-(Date.now()-i),Bm)}let m=()=>{s++===0&&c()},u=()=>{s>0&&--s===0&&!l&&p()};function h(){l||(l=!0,clearTimeout(r),o(),e.classList.remove("open"),e.classList.add("closing"),setTimeout(()=>e.remove(),Kc))}e.addEventListener("mouseenter",m),e.addEventListener("mouseleave",u),e.addEventListener("focusin",m),e.addEventListener("focusout",u),t.addEventListener("click",h),p(),document.body.appendChild(e),requestAnimationFrame(()=>requestAnimationFrame(()=>e.classList.add("open"))),w.playNotice()}var ka=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"br",name:"Brasil \u2014 Bras\xEDlia",flag:"\u{1F1E7}\u{1F1F7}",zone:"America/Sao_Paulo",label:"S\xE3o Paulo",region:"sa",home:!0},{id:"br-am",name:"Brasil \u2014 Amazonas",flag:"\u{1F1E7}\u{1F1F7}",zone:"America/Manaus",label:"Manaus",region:"sa",home:!0},{id:"br-ac",name:"Brasil \u2014 Acre",flag:"\u{1F1E7}\u{1F1F7}",zone:"America/Rio_Branco",label:"Rio Branco",region:"sa",home:!0},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"us-et",name:"EUA \u2014 Eastern",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/New_York",label:"Nova York",region:"us"},{id:"us-ct",name:"EUA \u2014 Central",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Chicago",label:"Chicago",region:"us"},{id:"us-mt",name:"EUA \u2014 Mountain",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Denver",label:"Denver",region:"us"},{id:"us-az",name:"EUA \u2014 Arizona",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Phoenix",label:"Phoenix",region:"us"},{id:"us-pt",name:"EUA \u2014 Pacific",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Los_Angeles",label:"Los Angeles",region:"us"},{id:"us-ak",name:"EUA \u2014 Alaska",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Anchorage",label:"Anchorage",region:"us"},{id:"us-hi",name:"EUA \u2014 Hava\xED",flag:"\u{1F1FA}\u{1F1F8}",zone:"Pacific/Honolulu",label:"Honolulu",region:"us"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],ed={es:{es:{name:"Espa\xF1a"},bo:{name:"Bolivia"},co:{name:"Colombia"},ec:{name:"Ecuador"},py:{name:"Paraguay",label:"Asunci\xF3n"},uy:{name:"Uruguay",label:"Montevideo"},ni:{name:"Nicaragua",label:"Managua"},pr:{name:"Puerto Rico"},gt:{label:"C. de Guatemala"},pa:{label:"C. de Panam\xE1"},"us-et":{name:"EE. UU. \u2014 Eastern",label:"Nueva York"},"us-ct":{name:"EE. UU. \u2014 Central"},"us-mt":{name:"EE. UU. \u2014 Mountain"},"us-az":{name:"EE. UU. \u2014 Arizona"},"us-pt":{name:"EE. UU. \u2014 Pacific"},"us-ak":{name:"EE. UU. \u2014 Alaska"},"us-hi":{name:"EE. UU. \u2014 Haw\xE1i"}},en:{pt:{label:"Lisbon"},es:{name:"Spain"},br:{name:"Brazil \u2014 Bras\xEDlia"},"br-am":{name:"Brazil \u2014 Amazonas"},"br-ac":{name:"Brazil \u2014 Acre"},bo:{name:"Bolivia"},co:{name:"Colombia"},ec:{name:"Ecuador"},py:{name:"Paraguay",label:"Asunci\xF3n"},uy:{name:"Uruguay",label:"Montevideo"},"us-et":{name:"USA \u2014 Eastern",label:"New York"},"us-ct":{name:"USA \u2014 Central"},"us-mt":{name:"USA \u2014 Mountain"},"us-az":{name:"USA \u2014 Arizona"},"us-pt":{name:"USA \u2014 Pacific"},"us-ak":{name:"USA \u2014 Alaska"},"us-hi":{name:"USA \u2014 Hawaii"},mx:{name:"Mexico"},gt:{label:"Guatemala City"},ni:{name:"Nicaragua",label:"Managua"},pa:{name:"Panama",label:"Panama City"},do:{name:"Dominican Rep."},pr:{name:"Puerto Rico"}}};function jn(e,t){return ed[t]?.[e.id]?.name??e.name}function bo(e,t){return ed[t]?.[e.id]?.label??e.label}var Ta="America/Sao_Paulo";function Qc(e,t){let a=new Intl.DateTimeFormat("en-US",{timeZone:e,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}),o={};a.formatToParts(t).forEach(i=>{o[i.type]=i.value});let n=Date.UTC(Number(o.year),Number(o.month)-1,Number(o.day),Number(o.hour)%24,Number(o.minute),Number(o.second));return Math.round((n-t.getTime())/6e4)}function jm(e,t){let a=String(t||"").match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);if(!a)return null;let[,o,n,i,r,s]=a.map(Number),l=Date.UTC(o,n-1,i,r,s),p=Qc(e,new Date(l));return p=Qc(e,new Date(l-p*6e4)),p}function Hm(e){let t=e<0?"-":"+",a=Math.abs(e),o=String(Math.floor(a/60)).padStart(2,"0"),n=String(a%60).padStart(2,"0");return`${t}${o}:${n}`}function lr(e,t){if(!e)return"";if(/[+-]\d{2}:\d{2}$/.test(e)||/Z$/.test(e))return e;let a=jm(t,e);return a===null?e:`${e.slice(0,16)}${Hm(a)}`}var Zc={"brazil/east":"America/Sao_Paulo","brazil/west":"America/Manaus","brazil/acre":"America/Rio_Branco","us/eastern":"America/New_York","us/central":"America/Chicago","us/mountain":"America/Denver","us/arizona":"America/Phoenix","us/pacific":"America/Los_Angeles","us/alaska":"America/Anchorage","us/hawaii":"Pacific/Honolulu","america/argentina/buenos_aires":"America/Argentina/Buenos_Aires","mexico/general":"America/Mexico_City"};function cr(e){let t=String(e||"").trim();if(!t)return null;let a=t.toLowerCase();if(Zc[a])return Zc[a];let o=ka.find(n=>n.zone.toLowerCase()===a);return o?o.zone:null}var td="cw_timezone_pinned",ga=e=>jn(e,ge()),dr=e=>bo(e,ge()),ad={pt:{headerDesc:"Monitoramento global e planejamento de chamadas.",tabLive:"Monitoramento",tabPlan:"Planejador",searchPlaceholder:"Buscar cidade ou pa\xEDs...",noLocationFound:"Nenhum local encontrado",unpin:"Desafixar",pin:"Fixar",statusOpen:"Aberto",statusOpening:"Abrindo",statusClosing:"Fechando",statusClosed:"Fechado",whereIsClient:"Onde est\xE1 o cliente?",you:"Voc\xEA",yourTimezone:"Bras\xEDlia (GMT-3)",client:"Cliente",dragToSimulate:"Arraste para simular o hor\xE1rio:",idealBusinessHours:"Hor\xE1rio Comercial Ideal",limitHours:"Hor\xE1rio Limite (Aten\xE7\xE3o)",outOfHours:"Fora de Hor\xE1rio",filters:{all:"Todos",sa:"Am\xE9rica do Sul",us:"Estados Unidos",na:"Norte & Central",eu:"Europa"}},es:{headerDesc:"Monitoreo global y planificaci\xF3n de llamadas.",tabLive:"Monitoreo",tabPlan:"Planificador",searchPlaceholder:"Buscar ciudad o pa\xEDs...",noLocationFound:"No se encontr\xF3 ning\xFAn lugar",unpin:"Desanclar",pin:"Anclar",statusOpen:"Abierto",statusOpening:"Abriendo",statusClosing:"Cerrando",statusClosed:"Cerrado",whereIsClient:"\xBFD\xF3nde est\xE1 el cliente?",you:"T\xFA",yourTimezone:"Brasilia (GMT-3)",client:"Cliente",dragToSimulate:"Arrastra para simular el horario:",idealBusinessHours:"Horario Comercial Ideal",limitHours:"Horario L\xEDmite (Atenci\xF3n)",outOfHours:"Fuera de Horario",filters:{all:"Todos",sa:"Am\xE9rica del Sur",us:"Estados Unidos",na:"Norte y Central",eu:"Europa"}},en:{headerDesc:"Global monitoring and call planning.",tabLive:"Monitoring",tabPlan:"Planner",searchPlaceholder:"Search for a city or country...",noLocationFound:"No location found",unpin:"Unpin",pin:"Pin",statusOpen:"Open",statusOpening:"Opening",statusClosing:"Closing",statusClosed:"Closed",whereIsClient:"Where is the customer?",you:"You",yourTimezone:"Bras\xEDlia (GMT-3)",client:"Customer",dragToSimulate:"Drag to simulate the time:",idealBusinessHours:"Ideal Business Hours",limitHours:"Cutoff Hours (Caution)",outOfHours:"Outside Business Hours",filters:{all:"All",sa:"South America",us:"United States",na:"North & Central",eu:"Europe"}}};function et(e){let t=ge();return ad[t]?.[e]??ad.pt[e]}var pr=ka.filter(e=>!e.home),od=[{id:"all"},{id:"sa"},{id:"us"},{id:"na"},{id:"eu"}];function Um(){if(document.getElementById("cw-timezone-interactive-styles"))return;let e=document.createElement("style");e.id="cw-timezone-interactive-styles",e.textContent=`
        .tz-tab-btn:focus-visible,
        .tz-chip:focus-visible,
        .tz-hub-card:focus-visible,
        .tz-pin-btn:focus-visible {
            outline: 2px solid #1A73E8;
            outline-offset: 2px;
        }
        .tz-chip:hover { border-color: #1A73E8; }
        .tz-hub-card {
            transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease;
        }
        .tz-hub-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(60,64,67,0.1);
        }
        .tz-pin-btn { transition: background-color 0.2s ease; }
        .tz-pin-btn:hover { background-color: #F1F3F4; }
        @media (prefers-reduced-motion: reduce) {
            .tz-hub-card { transition: box-shadow 0.2s ease !important; }
            .tz-hub-card:hover { transform: none !important; }
        }
    `,document.head.appendChild(e)}function nd(){Um();let e="v2.2 Pro",t=!1,a=null,o="mx",n=JSON.parse(localStorage.getItem(td)||"[]"),i="",r="all",s=new Date;s.setHours(14,0,0,0);let l={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},p={container:{display:"flex",flexDirection:"column",height:"100%",background:l.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:l.surface,borderBottom:`1px solid ${l.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:l.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:l.primary,borderBottomColor:l.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:l.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:l.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${l.border}`,background:l.surface,color:l.textSub,transition:"all 0.2s"},chipActive:{background:l.primaryBg,color:l.primary,borderColor:l.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:l.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${l.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:l.surface,border:`1px solid ${l.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:l.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},c=document.createElement("div");c.id="timezone-popup",c.classList.add("cw-module-window"),Object.assign(c.style,ft,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let m={popup:c},u=rt(c,"Time Zone Traveler",e,et("headerDesc"),m,()=>ve());c.appendChild(u);let h=document.createElement("div");Object.assign(h.style,p.container),c.appendChild(h);let L=document.createElement("div");Object.assign(L.style,p.tabHeader);let S=document.createElement("div");S.textContent=et("tabLive"),S.className="tz-tab-btn",S.tabIndex=0,S.setAttribute("role","tab"),Object.assign(S.style,p.tabBtn,p.tabActive);let C=document.createElement("div");C.textContent=et("tabPlan"),C.className="tz-tab-btn",C.tabIndex=0,C.setAttribute("role","tab"),Object.assign(C.style,p.tabBtn),[S,C].forEach(re=>{re.addEventListener("keydown",be=>{(be.key==="Enter"||be.key===" ")&&(be.preventDefault(),re.click())})}),L.appendChild(S),L.appendChild(C),h.appendChild(L);let D=document.createElement("div");Object.assign(D.style,p.toolbar);let G=document.createElement("div");Object.assign(G.style,p.searchInputWrapper);let F=document.createElement("div");F.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(F.style,p.searchIcon);let R=document.createElement("input");R.placeholder=et("searchPlaceholder"),Object.assign(R.style,p.searchInput),R.onfocus=()=>{R.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",R.style.borderColor="rgba(26,115,232,0.3)"},R.onblur=()=>{R.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",R.style.borderColor="transparent"},R.oninput=re=>{i=re.target.value.toLowerCase(),U()},G.appendChild(F),G.appendChild(R),D.appendChild(G);let le=document.createElement("div");Object.assign(le.style,p.chipsRow),od.forEach(re=>{let be=document.createElement("div");be.textContent=et("filters")[re.id],be.id=`tz-filter-${re.id}`,be.className="tz-chip",be.tabIndex=0,be.setAttribute("role","button"),Object.assign(be.style,p.chip),re.id===r&&Object.assign(be.style,p.chipActive),be.onclick=()=>{w.playClick(),r=re.id,Array.from(le.children).forEach(pe=>{Object.assign(pe.style,p.chip)}),Object.assign(be.style,p.chipActive),U()},be.addEventListener("keydown",pe=>{(pe.key==="Enter"||pe.key===" ")&&(pe.preventDefault(),be.click())}),le.appendChild(be)}),D.appendChild(le),h.appendChild(D);let te=document.createElement("div");Object.assign(te.style,p.listContainer);let ee=document.createElement("style");ee.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",h.appendChild(ee);let $=document.createElement("div");Object.assign($.style,p.plannerWrapper,{display:"none"}),h.appendChild(te),h.appendChild($),S.onclick=()=>A("live"),C.onclick=()=>A("plan");function A(re){w.playClick(),re==="live"?(Object.assign(S.style,p.tabActive),Object.assign(C.style,p.tabBtn),C.style.borderBottomColor="transparent",S.setAttribute("aria-selected","true"),C.setAttribute("aria-selected","false"),te.style.display="flex",D.style.display="flex",$.style.display="none",Z()):(Object.assign(C.style,p.tabActive),Object.assign(S.style,p.tabBtn),S.style.borderBottomColor="transparent",$.style.display="flex",te.style.display="none",D.style.display="none",de(),M())}function y(re){return re>=9&&re<17?{color:l.success,bg:l.successBg,label:et("statusOpen"),icon:"\u{1F7E2}"}:re>=8&&re<9?{color:l.warning,bg:l.warningBg,label:et("statusOpening"),icon:"\u{1F7E1}"}:re>=17&&re<19?{color:l.warning,bg:l.warningBg,label:et("statusClosing"),icon:"\u{1F7E1}"}:{color:l.textSub,bg:"#F1F3F4",label:et("statusClosed"),icon:"\u{1F534}"}}function z(re){n.includes(re)?n=n.filter(be=>be!==re):n.push(re),localStorage.setItem(td,JSON.stringify(n)),U(),w.playClick()}function U(){te.innerHTML="";let re=new Date,be=pr.filter(he=>{let T=ga(he).toLowerCase().includes(i)||dr(he).toLowerCase().includes(i),Y=r==="all"||he.region===r;return T&&Y});if(be.sort((he,T)=>{let Y=n.includes(he.id),se=n.includes(T.id);return Y&&!se?-1:!Y&&se?1:ga(he).localeCompare(ga(T))}),be.length===0){te.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">${et("noLocationFound")}</div>
                </div>
            `;return}be.forEach(he=>{let T=n.includes(he.id),Y=re.toLocaleTimeString(Ma(),{timeZone:he.zone,hour:"2-digit",minute:"2-digit"}),se=parseInt(Y.split(":")[0]),V=y(se),O=se<6||se>18,k=document.createElement("div");k.className="tz-hub-card",k.tabIndex=0,k.setAttribute("role","button"),k.setAttribute("aria-label",`${ga(he)}, ${Y}`),Object.assign(k.style,p.hubCard),T&&Object.assign(k.style,p.hubCardPinned);let j=T?"\u2605":"\u2606",ie=T?"#F9AB00":"#DADCE0";k.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn tz-pin-btn" tabindex="0" role="button" aria-label="${et(T?"unpin":"pin")} ${ga(he)}" style="cursor:pointer; font-size:22px; color:${ie}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%;">${j}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${he.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${l.text}; letter-spacing:-0.2px;">${ga(he)}</div>
                        <div style="font-size:12px; color:${l.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${O?"\u{1F319}":"\u2600\uFE0F"} ${dr(he)}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${l.text}; font-family:'Google Sans', sans-serif;">${Y}</div>
                    <div style="font-size:11px; font-weight:600; color:${V.color}; background:${V.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${V.label}
                    </div>
                </div>
            `;let P=k.querySelector(".cw-pin-btn");P.onclick=X=>{X.stopPropagation(),z(he.id)},P.addEventListener("keydown",X=>{(X.key==="Enter"||X.key===" ")&&(X.preventDefault(),X.stopPropagation(),z(he.id))}),k.onclick=()=>{o=he.id,A("plan")},k.addEventListener("keydown",X=>{(X.key==="Enter"||X.key===" ")&&X.target===k&&(X.preventDefault(),k.click())}),te.appendChild(k)});let pe=document.createElement("div");pe.style.height="20px",pe.style.width="100%",te.appendChild(pe)}function M(){$.innerHTML="";let re=document.createElement("div"),be=document.createElement("label");be.textContent=et("whereIsClient"),be.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let pe=document.createElement("select");Object.assign(pe.style,Cs),pe.style.padding="14px",[...pr].sort((_,g)=>ga(_).localeCompare(ga(g))).forEach(_=>{let g=document.createElement("option");g.value=_.id,g.textContent=`${_.flag} ${ga(_)} (${_.zone})`,_.id===o&&(g.selected=!0),pe.appendChild(g)}),pe.onchange=_=>{o=_.target.value,N(),w.playClick()},re.appendChild(be),re.appendChild(pe),$.appendChild(re);let T=document.createElement("div");Object.assign(T.style,p.timeComparisonRow);let Y=document.createElement("div");Object.assign(Y.style,p.timeCard),Y.style.backgroundColor="#F8FAFF",Y.style.borderColor="#E8F0FE",Y.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} ${et("you")}</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">${et("yourTimezone")}</div>
        `;let se=document.createElement("div");Object.assign(se.style,p.timeCard),se.style.backgroundColor="#FFF8E1",se.style.borderColor="#FEF7E0",se.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">${et("client")}</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,T.appendChild(Y),T.appendChild(se),$.appendChild(T);let V=document.createElement("div");V.id="cw-planner-status",Object.assign(V.style,p.statusBadge),$.appendChild(V);let O=document.createElement("div");Object.assign(O.style,{padding:"0 4px",marginTop:"12px"});let k=document.createElement("div");k.textContent=et("dragToSimulate"),k.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let j=document.createElement("div");Object.assign(j.style,p.timelineContainer);let ie=document.createElement("div");Object.assign(ie.style,p.timelineTrack);let P=document.createElement("div");Object.assign(P.style,p.dayZone),ie.appendChild(P);let X=document.createElement("input");X.type="range",X.min="0",X.max="1439",X.step="15",X.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let ce=document.createElement("div");ce.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",ce.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",j.appendChild(ie),j.appendChild(X),j.appendChild(ce),O.appendChild(k),O.appendChild(j),$.appendChild(O);let v=Y.querySelector("#cw-time-input-br"),b=se.querySelector("#cw-time-display-client"),d=se.querySelector("#cw-client-label");function N(){let _=pr.find(H=>H.id===o);d.textContent=`${_.flag} ${dr(_)} (${_.zone})`;let g=s.getHours(),x=s.getMinutes(),I=`${String(g).padStart(2,"0")}:${String(x).padStart(2,"0")}`;v.value=I,X.value=g*60+x;let E=s.toLocaleTimeString(Ma(),{timeZone:_.zone,hour:"2-digit",minute:"2-digit"});b.textContent=E;let W=parseInt(E.split(":")[0]);W>=9&&W<17?(V.style.background=l.successBg,V.style.color=l.success,V.innerHTML=`<span style="font-size:16px">\u2705</span> ${et("idealBusinessHours")}`):W>=8&&W<9||W>=17&&W<19?(V.style.background=l.warningBg,V.style.color=l.warning,V.innerHTML=`<span style="font-size:16px">\u26A0\uFE0F</span> ${et("limitHours")}`):(V.style.background=l.errorBg,V.style.color=l.error,V.innerHTML=`<span style="font-size:16px">\u26D4</span> ${et("outOfHours")}`)}X.oninput=_=>{let g=parseInt(_.target.value);s.setHours(Math.floor(g/60)),s.setMinutes(g%60),N()},v.oninput=_=>{let[g,x]=_.target.value.split(":");g&&x&&(s.setHours(parseInt(g)),s.setMinutes(parseInt(x)),N())},N()}function Z(){U(),a||(a=setInterval(U,6e4))}function de(){a&&(clearInterval(a),a=null)}function ve(){t=!ht(c),ct(t,c,"cw-btn-timezone"),t?(Je(),A("live")):(Qe(),de())}return document.body.appendChild(c),je(()=>{let re=c.querySelector(".cw-help-description");re&&(re.textContent=et("headerDesc")),S.textContent=et("tabLive"),C.textContent=et("tabPlan"),R.placeholder=et("searchPlaceholder"),Array.from(le.children).forEach(be=>{let pe=od.find(he=>`tz-filter-${he.id}`===be.id);pe&&(be.textContent=et("filters")[pe.id])}),te.style.display!=="none"&&U(),$.style.display!=="none"&&M()}),ve}var id={pt:{headerTitle:"Minha Biblioteca",headerDesc:"Gerencie seus snippets, textos e templates.",mediaTag:"M\xEDdia",tabs:{general:"Geral",note:"Notas",email:"Emails"},searchPlaceholder:"Buscar por t\xEDtulo ou conte\xFAdo...",newItem:"Novo item",cancel:"Cancelar",recentlyUsed:"\u{1F552} Usados recentemente",nothingFound:"Nada encontrado",nothingHereYet:"Nada aqui ainda",noItemMatches:e=>`Nenhum item bate com "${e}" nesta aba.`,clickPlusToStart:"Clique no + para come\xE7ar sua cole\xE7\xE3o.",copy:"Copiar",moreActions:"Mais a\xE7\xF5es",edit:"Editar",delete:"Excluir",deleteConfirm:e=>`Excluir "${e}"?`,itemDeletedToast:"Item exclu\xEDdo.",copiedToast:"Copiado!",titleLabel:"T\xEDtulo / Nome",subjectLabel:"Assunto do Email",contentLabel:"Conte\xFAdo",emailBodyLabel:"Corpo do Email (HTML)",noteTextLabel:"Texto da Nota",editItemTitle:"Editar Item",newItemTitle:"Novo Item",save:"Salvar",saveChanges:"Salvar Altera\xE7\xF5es",saving:"Salvando...",bold:"Negrito",italic:"It\xE1lico",codeFormat:"Formato c\xF3digo",insertImage:"Inserir imagem",imageUrlPrompt:"Cole a URL da imagem:",fillTitleAndContent:"Preencha t\xEDtulo e conte\xFAdo.",subjectRequired:"Assunto \xE9 obrigat\xF3rio para emails.",saveFailedNoUser:"N\xE3o foi poss\xEDvel salvar: usu\xE1rio n\xE3o identificado. Recarregue a p\xE1gina e tente de novo.",savedLocalOnly:"Salvo localmente \u2014 sem conex\xE3o com a nuvem no momento.",savedAndSynced:"Salvo e sincronizado!",saveError:"Erro ao salvar item."},es:{headerTitle:"Mi Biblioteca",headerDesc:"Gestiona tus snippets, textos y plantillas.",mediaTag:"Multimedia",tabs:{general:"General",note:"Notas",email:"Emails"},searchPlaceholder:"Buscar por t\xEDtulo o contenido...",newItem:"Nuevo elemento",cancel:"Cancelar",recentlyUsed:"\u{1F552} Usados recientemente",nothingFound:"No se encontr\xF3 nada",nothingHereYet:"Todav\xEDa no hay nada aqu\xED",noItemMatches:e=>`Ning\xFAn elemento coincide con "${e}" en esta pesta\xF1a.`,clickPlusToStart:"Haz clic en + para empezar tu colecci\xF3n.",copy:"Copiar",moreActions:"M\xE1s acciones",edit:"Editar",delete:"Eliminar",deleteConfirm:e=>`\xBFEliminar "${e}"?`,itemDeletedToast:"Elemento eliminado.",copiedToast:"\xA1Copiado!",titleLabel:"T\xEDtulo / Nombre",subjectLabel:"Asunto del Email",contentLabel:"Contenido",emailBodyLabel:"Cuerpo del Email (HTML)",noteTextLabel:"Texto de la Nota",editItemTitle:"Editar Elemento",newItemTitle:"Nuevo Elemento",save:"Guardar",saveChanges:"Guardar Cambios",saving:"Guardando...",bold:"Negrita",italic:"Cursiva",codeFormat:"Formato c\xF3digo",insertImage:"Insertar imagen",imageUrlPrompt:"Pega la URL de la imagen:",fillTitleAndContent:"Completa el t\xEDtulo y el contenido.",subjectRequired:"El asunto es obligatorio para emails.",saveFailedNoUser:"No se pudo guardar: usuario no identificado. Recarga la p\xE1gina e int\xE9ntalo de nuevo.",savedLocalOnly:"Guardado localmente \u2014 sin conexi\xF3n con la nube en este momento.",savedAndSynced:"\xA1Guardado y sincronizado!",saveError:"Error al guardar el elemento."},en:{headerTitle:"My Library",headerDesc:"Manage your snippets, texts and templates.",mediaTag:"Media",tabs:{general:"General",note:"Notes",email:"Emails"},searchPlaceholder:"Search by title or content...",newItem:"New item",cancel:"Cancel",recentlyUsed:"\u{1F552} Recently used",nothingFound:"Nothing found",nothingHereYet:"Nothing here yet",noItemMatches:e=>`No item matches "${e}" in this tab.`,clickPlusToStart:"Click + to start your collection.",copy:"Copy",moreActions:"More actions",edit:"Edit",delete:"Delete",deleteConfirm:e=>`Delete "${e}"?`,itemDeletedToast:"Item deleted.",copiedToast:"Copied!",titleLabel:"Title / Name",subjectLabel:"Email Subject",contentLabel:"Content",emailBodyLabel:"Email Body (HTML)",noteTextLabel:"Note Text",editItemTitle:"Edit Item",newItemTitle:"New Item",save:"Save",saveChanges:"Save Changes",saving:"Saving...",bold:"Bold",italic:"Italic",codeFormat:"Code format",insertImage:"Insert image",imageUrlPrompt:"Paste the image URL:",fillTitleAndContent:"Fill in the title and the content.",subjectRequired:"A subject is required for emails.",saveFailedNoUser:"Could not save: user not identified. Reload the page and try again.",savedLocalOnly:"Saved locally \u2014 no cloud connection at the moment.",savedAndSynced:"Saved and synced!",saveError:"Error saving the item."}};function Le(e){let t=ge();return id[t]?.[e]??id.pt[e]}var Tt={tabs:{general:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',note:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z"></path><path d="M15 3v6h6"></path><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>',email:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'},search:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',clear:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',copy:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',more:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8"></circle><circle cx="12" cy="12" r="1.8"></circle><circle cx="12" cy="19" r="1.8"></circle></svg>',edit:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',delete:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',add:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',back:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',bold:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>',italic:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>',code:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',image:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',media:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',empty:'<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>'},ur=[{id:"general",icon:Tt.tabs.general},{id:"note",icon:Tt.tabs.note},{id:"email",icon:Tt.tabs.email}],mr="cw_lib_recent_v1",rd=4;function Vm(e){try{let t=JSON.parse(localStorage.getItem(mr)||"[]");t=t.filter(a=>a!==e),t.unshift(e),t=t.slice(0,rd*3),localStorage.setItem(mr,JSON.stringify(t))}catch(t){console.warn("Erro ao salvar uso recente",t)}}function Wm(e){try{let t=JSON.parse(localStorage.getItem(mr)||"[]");if(t.length===0)return[];let a=new Map(kt.getSnippets(e).map(o=>[o.id,o]));return t.map(o=>a.get(o)).filter(Boolean).slice(0,rd)}catch{return[]}}function Ym(){if(document.getElementById("cw-lib-styles-v2"))return;let e=document.createElement("style");e.id="cw-lib-styles-v2",e.textContent=`
        #library-popup {
            width: 620px !important;
            max-width: 95vw !important;
            height: 680px !important;
            max-height: 90vh !important;
        }

        .cw-lib-container {
            display: flex; flex-direction: column; height: 100%;
            background: linear-gradient(180deg, #FAFBFC 0%, #F1F3F9 100%);
            font-family: 'Google Sans', Roboto, sans-serif;
            position: relative; overflow: hidden;
        }

        /* --- TOOLBAR: BUSCA + ABAS SEGMENTADAS --- */
        .cw-lib-toolbar { padding: 16px 20px 12px 20px; display: flex; flex-direction: column; gap: 12px; flex-shrink: 0; }

        .cw-lib-search-wrap { position: relative; }
        .cw-lib-search-icon {
            position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
            color: #80868b; pointer-events: none; display: flex;
        }
        .cw-lib-search {
            width: 100%; box-sizing: border-box; height: 40px;
            padding: 0 38px 0 40px; border-radius: 12px; border: 1px solid transparent;
            background: rgba(255,255,255,0.75); backdrop-filter: blur(8px);
            font-size: 13.5px; font-family: inherit; color: #202124; outline: none;
            box-shadow: 0 1px 2px rgba(0,0,0,0.04);
            transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .cw-lib-search::placeholder { color: #9aa0a6; }
        .cw-lib-search:focus { background: #fff; border-color: #1a73e8; box-shadow: 0 0 0 3px rgba(26,115,232,0.14); }
        .cw-lib-search-clear {
            position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
            width: 22px; height: 22px; border-radius: 50%; display: none;
            align-items: center; justify-content: center; color: #80868b; cursor: pointer;
            transition: background 0.15s ease;
        }
        .cw-lib-search-clear:hover { background: rgba(0,0,0,0.06); }
        .cw-lib-search-clear.visible { display: flex; }

        .cw-lib-tabs {
            display: flex; gap: 4px; padding: 4px;
            background: rgba(0,0,0,0.045); border-radius: 100px;
        }
        .cw-lib-tab {
            flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
            padding: 8px 10px; border-radius: 100px; cursor: pointer; user-select: none;
            font-size: 12.5px; font-weight: 500; color: #5f6368;
            transition: background-color 0.25s var(--cw-ease-standard), color 0.25s var(--cw-ease-standard), box-shadow 0.25s var(--cw-ease-standard);
        }
        .cw-lib-tab svg { flex-shrink: 0; }
        .cw-lib-tab:hover { color: #202124; }
        .cw-lib-tab.active { background: #fff; color: #1a73e8; font-weight: 600; box-shadow: 0 1px 4px rgba(0,0,0,0.12); }

        /* --- GRID DE CARDS --- */
        .cw-lib-grid {
            flex: 1; overflow-y: auto; padding: 4px 20px 96px 20px;
            display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 14px;
            align-content: start;
        }

        .cw-lib-card {
            background: rgba(255,255,255,0.68); backdrop-filter: blur(14px);
            border: 1px solid rgba(255,255,255,0.5);
            border-radius: 18px; padding: 16px 16px 12px 16px;
            position: relative; isolation: isolate;
            box-shadow: 0 1px 3px rgba(60,64,67,0.08);
            transition: box-shadow 0.35s var(--cw-ease-elastic), border-color 0.35s ease;
            display: flex; flex-direction: column;
        }
        /* isolation:isolate d\xE1 a cada card seu pr\xF3prio contexto de empilhamento,
           ent\xE3o um z-index alto s\xF3 no .cw-lib-menu n\xE3o basta pra ele ficar
           acima do card da linha seguinte (que vem depois no DOM e por isso
           pinta por cima por padr\xE3o) \u2014 precisa levantar o card inteiro. */
        .cw-lib-card.menu-open { z-index: 5; }
        .cw-lib-card::before {
            content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
            background: linear-gradient(135deg, rgba(138,180,248,0.16), rgba(197,138,249,0.16), rgba(242,139,130,0.16));
            background-size: 300% 300%; opacity: 0; transition: opacity 0.4s ease;
        }
        /* Sem transform no pr\xF3prio card - hit-box parado evita flicker de
           hover perto da borda. Eleva\xE7\xE3o s\xF3 por sombra/borda. */
        .cw-lib-card:hover { box-shadow: 0 10px 24px rgba(60,64,67,0.14); border-color: rgba(255,255,255,0.9); }
        .cw-lib-card:hover::before { opacity: 1; animation: cwLibAura 8s ease infinite; }
        .cw-lib-card.is-code { border-left: 3px solid #1a73e8; }
        @keyframes cwLibAura { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

        .cw-lib-card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 6px; }
        .cw-lib-card-title { font-size: 14px; font-weight: 600; color: #202124; letter-spacing: -0.01em; line-height: 1.35; }
        .cw-lib-card-badges { display: flex; gap: 4px; flex-shrink: 0; }
        .cw-lib-badge { font-size: 9.5px; font-weight: 700; letter-spacing: 0.3px; padding: 2px 6px; border-radius: 5px; white-space: nowrap; }
        .cw-lib-badge.code { background: rgba(26,115,232,0.1); color: #1a73e8; font-family: 'Roboto Mono', monospace; }
        .cw-lib-badge.template { background: rgba(0,0,0,0.05); color: #5f6368; }

        .cw-lib-media-tag {
            display: inline-flex; align-items: center; gap: 4px;
            background: rgba(26,115,232,0.1); color: #1a73e8;
            padding: 2px 8px; border-radius: 8px; font-size: 10.5px; font-weight: 600;
            margin-bottom: 6px; width: fit-content;
        }

        .cw-lib-card-preview {
            font-size: 12.5px; color: #5f6368; line-height: 1.55; flex: 1;
            display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;
            word-break: break-word;
        }
        .cw-lib-card-preview.code { font-family: 'Roboto Mono', monospace; font-size: 11.5px; background: rgba(0,0,0,0.03); padding: 8px 10px; border-radius: 8px; }

        .cw-lib-card-foot { display: flex; align-items: center; justify-content: flex-end; gap: 2px; margin-top: 10px; }
        .cw-lib-icon-btn {
            width: 30px; height: 30px; border-radius: 50%; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center; cursor: pointer; color: #5f6368;
            transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease;
            position: relative;
        }
        .cw-lib-icon-btn:hover { background: rgba(26,115,232,0.1); color: #1a73e8; }
        .cw-lib-icon-btn:active { transform: scale(0.92); }
        .cw-lib-icon-btn.danger:hover { background: rgba(217,48,37,0.1); color: #d93025; }

        /* --- MENU DE OVERFLOW (Editar / Excluir) --- */
        .cw-lib-menu {
            position: absolute; top: calc(100% + 4px); right: 0; z-index: 30;
            background: rgba(255,255,255,0.96); backdrop-filter: blur(16px);
            border: 1px solid rgba(0,0,0,0.06); border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.16); padding: 6px; min-width: 140px;
            opacity: 0; transform: translateY(-4px) scale(0.96); pointer-events: none;
            transition: opacity 0.15s ease, transform 0.15s ease; transform-origin: top right;
        }
        .cw-lib-menu.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
        .cw-lib-menu-item {
            display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 8px;
            font-size: 13px; font-weight: 500; color: #3c4043; cursor: pointer; transition: background 0.12s ease;
        }
        .cw-lib-menu-item:hover { background: rgba(0,0,0,0.05); }
        .cw-lib-menu-item.danger { color: #d93025; }
        .cw-lib-menu-item.danger:hover { background: rgba(217,48,37,0.08); }

        /* --- ESTADO VAZIO --- */
        .cw-lib-empty {
            grid-column: 1 / -1; padding: 56px 24px; text-align: center;
            display: flex; flex-direction: column; align-items: center; gap: 12px; color: #80868b;
        }
        .cw-lib-empty-title { font-weight: 600; font-size: 15px; color: #3c4043; }
        .cw-lib-empty-sub { font-size: 13px; max-width: 260px; line-height: 1.5; }

        /* --- USADOS RECENTEMENTE --- */
        .cw-lib-recent-section { grid-column: 1 / -1; margin-bottom: 4px; }
        .cw-lib-recent-title {
            font-size: 11px; font-weight: 700; color: #80868b; text-transform: uppercase;
            letter-spacing: 0.6px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;
        }
        .cw-lib-recent-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .cw-lib-recent-chip {
            display: flex; align-items: center; gap: 6px; padding: 7px 14px;
            background: rgba(26,115,232,0.08); border: 1px solid rgba(26,115,232,0.18);
            border-radius: 100px; font-size: 12.5px; font-weight: 600; color: #1a73e8;
            cursor: pointer; max-width: 220px; transition: background-color 0.15s ease, transform 0.15s ease;
        }
        .cw-lib-recent-chip span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .cw-lib-recent-chip:hover { background: rgba(26,115,232,0.14); }
        .cw-lib-recent-chip:focus-visible { outline: 2px solid #1a73e8; outline-offset: 2px; }

        /* --- FAB --- */
        .cw-lib-fab {
            position: absolute; bottom: 24px; right: 24px; z-index: 15;
            width: 56px; height: 56px; border-radius: 18px;
            background: linear-gradient(135deg, #1a73e8, #0059c1); color: #fff;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 6px 20px rgba(26,115,232,0.42); cursor: pointer;
            transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
        }
        .cw-lib-fab:hover { transform: scale(1.08) rotate(90deg); box-shadow: 0 10px 28px rgba(26,115,232,0.5); }
        .cw-lib-fab:active { transform: scale(0.94) rotate(90deg); }

        /* --- SHEET DO EDITOR (Apple glass, transl\xFAcido de verdade) --- */
        .cw-lib-sheet {
            position: absolute; inset: 0; z-index: 25;
            background: rgba(250,251,252,0.6); backdrop-filter: blur(36px) saturate(180%); -webkit-backdrop-filter: blur(36px) saturate(180%);
            transform: translateY(100%); transition: transform 0.5s var(--cw-ease-decelerate);
            display: flex; flex-direction: column;
        }
        .cw-lib-sheet.open { transform: translateY(0); }
        .cw-lib-sheet-handle { display: flex; justify-content: center; padding: 10px 0 4px 0; flex-shrink: 0; }
        .cw-lib-sheet-handle::after { content: ''; width: 36px; height: 4px; border-radius: 3px; background: rgba(0,0,0,0.15); }
        .cw-lib-sheet-head {
            padding: 8px 20px 16px 20px; display: flex; align-items: center; gap: 12px; flex-shrink: 0;
            border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .cw-lib-sheet-back {
            width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
            color: #5f6368; cursor: pointer; transition: background 0.15s ease; flex-shrink: 0;
        }
        .cw-lib-sheet-back:hover { background: rgba(0,0,0,0.06); }
        .cw-lib-sheet-title { font-weight: 700; font-size: 16px; color: #202124; flex: 1; }
        .cw-lib-sheet-body { flex: 1; overflow-y: auto; padding: 20px; }
        .cw-lib-sheet-foot { padding: 16px 20px; border-top: 1px solid rgba(0,0,0,0.06); display: flex; justify-content: flex-end; }

        .cw-lib-field { margin-bottom: 20px; }
        .cw-lib-label { display: block; font-size: 12px; font-weight: 700; color: #5f6368; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.4px; }
        .cw-lib-input {
            width: 100%; box-sizing: border-box; padding: 12px 14px; border-radius: 12px;
            border: 1px solid rgba(0,0,0,0.1); font-size: 14px; font-family: inherit; outline: none;
            background: #fff; transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .cw-lib-input:focus { border-color: #1a73e8; box-shadow: 0 0 0 3px rgba(26,115,232,0.14); }

        .cw-lib-toolbar-mini { display: flex; gap: 4px; margin-bottom: 12px; background: rgba(255,255,255,0.6); padding: 6px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.06); width: fit-content; }
        .cw-lib-tb-btn {
            width: 32px; height: 32px; border-radius: 8px; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center; cursor: pointer; color: #474747;
            transition: background-color 0.15s ease, color 0.15s ease;
        }
        .cw-lib-tb-btn:hover { background: rgba(0,0,0,0.05); color: #1a73e8; }
        .cw-lib-tb-btn.active { background: rgba(26,115,232,0.12); color: #1a73e8; }

        .cw-lib-editable {
            min-height: 180px; max-height: 340px; overflow-y: auto; white-space: pre-wrap;
            line-height: 1.65; outline: none;
        }

        .cw-lib-save-btn {
            padding: 11px 28px; border-radius: 100px; border: none; cursor: pointer;
            background: linear-gradient(135deg, #1a73e8, #0059c1); color: #fff; font-weight: 600; font-size: 14px;
            box-shadow: 0 4px 14px rgba(26,115,232,0.35); transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
        }
        .cw-lib-save-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(26,115,232,0.44); }
        .cw-lib-save-btn:active { transform: scale(0.97); }
        .cw-lib-save-btn:disabled { opacity: 0.6; cursor: default; transform: none; }

        .cw-lib-loading {
            position: absolute; inset: 0; z-index: 40; background: rgba(255,255,255,0.7); backdrop-filter: blur(6px);
            display: none; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
        }
        .cw-lib-loading.active { display: flex; }
        .cw-lib-spinner { width: 34px; height: 34px; border: 3px solid rgba(26,115,232,0.15); border-top-color: #1a73e8; border-radius: 50%; animation: cwLibSpin 0.8s linear infinite; }
        @keyframes cwLibSpin { to { transform: rotate(360deg); } }
        .cw-lib-loading-text { font-size: 13px; font-weight: 600; color: #1a73e8; }

        .cw-tactile { transition: transform 0.15s ease; }
        .cw-tactile:active { transform: scale(0.94); }

        /* O spinner de carregamento fica de fora de prop\xF3sito - \xE9
           informativo (comunica "ainda trabalhando"), n\xE3o decorativo.
           O resto (aura infinita no hover, cards, FAB, painel deslizando)
           \xE9 puro movimento e n\xE3o tinha nenhuma prote\xE7\xE3o. */
        @media (prefers-reduced-motion: reduce) {
            .cw-lib-card::before { animation: none !important; }
            .cw-lib-card, .cw-lib-recent-chip, .cw-lib-fab, .cw-lib-save-btn,
            .cw-lib-menu, .cw-lib-sheet {
                transition: opacity 0.15s ease, background-color 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}function sd(){let e="v2.0",t=!1,a="general",o="",n=null,i=null;Ym();let r=document.createElement("div");r.id="library-popup",r.classList.add("cw-module-window"),Object.assign(r.style,ft,{right:"auto",left:"50%",width:"620px",height:"680px",maxHeight:"90vh",transform:"translateX(-50%) scale(0.05)"});let s={popup:r},l=rt(r,Le("headerTitle"),e,Le("headerDesc"),s,()=>O());r.appendChild(l);let p=l.querySelector("span"),c=document.createElement("div");c.className="cw-lib-container",r.appendChild(c);let m=document.createElement("div");m.className="cw-lib-toolbar";let u=document.createElement("div");u.className="cw-lib-search-wrap";let h=document.createElement("div");h.className="cw-lib-search-icon",h.innerHTML=Tt.search;let L=document.createElement("input");L.className="cw-lib-search no-drag",L.placeholder=Le("searchPlaceholder"),L.type="text";let S=document.createElement("div");S.className="cw-lib-search-clear cw-tactile",S.innerHTML=Tt.clear,u.append(h,L,S);let C=document.createElement("div");C.className="cw-lib-tabs",ur.forEach(k=>{let j=document.createElement("div");j.className="cw-lib-tab"+(k.id===a?" active":""),j.id=`lib-tab-${k.id}`,j.innerHTML=`${k.icon}<span class="js-lib-tab-label">${Le("tabs")[k.id]}</span>`,j.onmouseenter=()=>w.playHover(),j.onclick=()=>M(k.id),C.appendChild(j)}),m.append(u,C),c.appendChild(m);let D=document.createElement("div");D.className="cw-lib-grid",c.appendChild(D);let G=document.createElement("div");G.className="cw-lib-fab cw-tactile",G.title=Le("newItem"),G.innerHTML=Tt.add,G.onclick=()=>he(),c.appendChild(G);let F=document.createElement("div");F.className="cw-lib-sheet";let R=document.createElement("div");R.className="cw-lib-sheet-handle";let le=document.createElement("div");le.className="cw-lib-sheet-head";let te=document.createElement("div");te.className="cw-lib-sheet-back no-drag",te.innerHTML=Tt.back,te.title=Le("cancel"),te.onclick=T;let ee=document.createElement("span");ee.className="cw-lib-sheet-title",ee.textContent=Le("newItemTitle"),le.append(te,ee);let $=document.createElement("div");$.className="cw-lib-sheet-body";let A=document.createElement("div");A.className="cw-lib-sheet-foot";let y=document.createElement("button");y.className="cw-lib-save-btn no-drag",y.textContent=Le("save"),y.onclick=Y,A.appendChild(y);let z=document.createElement("div");z.className="cw-lib-loading",z.innerHTML=`<div class="cw-lib-spinner"></div><div class="cw-lib-loading-text js-lib-saving">${Le("saving")}</div>`,F.append(R,le,$,A,z),c.appendChild(F);let U=document.createElement("div");Object.assign(U.style,Yt),U.className="no-drag",r.appendChild(U),Xt(r,U),document.body.appendChild(r),document.addEventListener("mousedown",k=>{i&&!i.contains(k.target)&&Z()});function M(k){w.playClick(),a=k,ur.forEach(j=>{document.getElementById(`lib-tab-${j.id}`).classList.toggle("active",j.id===k)}),re()}function Z(){if(i){let k=i.querySelector(".cw-lib-menu");k&&k.classList.remove("open"),i.classList.remove("menu-open"),i=null}}function de(k,j){return j?`${k.title} ${k.content}`.toLowerCase().includes(j):!0}function ve(k){let j=document.createElement("div");j.className="cw-lib-recent-section",j.innerHTML=`<div class="cw-lib-recent-title">${Le("recentlyUsed")}</div>`;let ie=document.createElement("div");return ie.className="cw-lib-recent-row",k.forEach(P=>{let X=document.createElement("div");X.className="cw-lib-recent-chip",X.tabIndex=0,X.setAttribute("role","button"),X.title=P.title,X.innerHTML=`<span>${V(P.title)}</span>`,X.onclick=()=>{w.playClick(),pe(P)},X.addEventListener("keydown",ce=>{(ce.key==="Enter"||ce.key===" ")&&(ce.preventDefault(),X.click())}),ie.appendChild(X)}),j.appendChild(ie),j}function re(){Z(),D.innerHTML="";let k=o.trim().toLowerCase(),j=kt.getSnippets(a).filter(ie=>de(ie,k));if(!k){let ie=Wm(a);ie.length>0&&D.appendChild(ve(ie))}if(j.length===0){let ie=document.createElement("div");ie.className="cw-lib-empty";let P=k.length>0;ie.innerHTML=`
                <div style="opacity:0.5;">${Tt.empty}</div>
                <div class="cw-lib-empty-title">${Le(P?"nothingFound":"nothingHereYet")}</div>
                <div class="cw-lib-empty-sub">${P?Le("noItemMatches")(o.trim()):Le("clickPlusToStart")}</div>
            `,D.appendChild(ie);return}j.forEach(ie=>D.appendChild(be(ie)))}function be(k){let j=document.createElement("div");j.className="cw-lib-card"+(k.isCode?" is-code":"");let ie=k.content,P="";if(k.isRich){let b=document.createElement("div");b.innerHTML=k.content;let d=!!b.querySelector("img");ie=b.innerText.substring(0,200),d&&(P=`<span class="cw-lib-media-tag">${Tt.media} ${Le("mediaTag")}</span>`)}let X=[k.isCode?'<span class="cw-lib-badge code">CODE</span>':"",a==="email"?'<span class="cw-lib-badge template">TEMPLATE</span>':""].join("");j.innerHTML=`
            <div class="cw-lib-card-head">
                <div class="cw-lib-card-title">${V(k.title)}</div>
                <div class="cw-lib-card-badges">${X}</div>
            </div>
            ${P}
            <div class="cw-lib-card-preview${k.isCode?" code":""}">${V(ie)}</div>
            <div class="cw-lib-card-foot">
                <div class="cw-lib-icon-btn cw-act-copy cw-tactile" title="${Le("copy")}">${Tt.copy}</div>
                <div class="cw-lib-icon-btn cw-act-more cw-tactile" title="${Le("moreActions")}">${Tt.more}</div>
                <div class="cw-lib-menu">
                    <div class="cw-lib-menu-item cw-act-edit">${Tt.edit} ${Le("edit")}</div>
                    <div class="cw-lib-menu-item danger cw-act-del">${Tt.delete} ${Le("delete")}</div>
                </div>
            </div>
        `,j.querySelector(".cw-act-copy").onclick=b=>{b.stopPropagation(),w.playClick(),pe(k)};let ce=j.querySelector(".cw-act-more"),v=j.querySelector(".cw-lib-menu");return ce.onclick=b=>{b.stopPropagation(),w.playClick();let d=v.classList.contains("open");Z(),d||(v.classList.add("open"),j.classList.add("menu-open"),i=j)},j.querySelector(".cw-act-edit").onclick=b=>{b.stopPropagation(),w.playClick(),Z(),he(k)},j.querySelector(".cw-act-del").onclick=async b=>{b.stopPropagation(),w.playClick(),Z(),await ot(Le("deleteConfirm")(k.title))&&(kt.delete(k.id),re(),ne(Le("itemDeletedToast")))},j}function pe(k){if(k.isRich){let j=new Blob([k.content],{type:"text/html"}),ie=document.createElement("div");ie.innerHTML=k.content;let P=new Blob([ie.innerText],{type:"text/plain"});navigator.clipboard.write([new ClipboardItem({"text/html":j,"text/plain":P})])}else navigator.clipboard.writeText(k.content);Vm(k.id),ne(Le("copiedToast"))}function he(k=null){n=k?k.id:null,$.innerHTML="",$.appendChild(se("title",Le("titleLabel"),k?k.title:"")),a==="email"&&$.appendChild(se("subject",Le("subjectLabel"),k?k.subject:""));let j=Le("contentLabel");a==="email"&&(j=Le("emailBodyLabel")),a==="note"&&(j=Le("noteTextLabel")),$.appendChild(se("content",j,k?k.content:"",{isRich:!0,isCode:k?k.isCode:!1})),ee.textContent=Le(k?"editItemTitle":"newItemTitle"),y.textContent=Le(k?"saveChanges":"save"),F.classList.add("open"),setTimeout(()=>{let ie=$.querySelector("input");ie&&ie.focus()},500)}function T(){w.playSwoosh(),F.classList.remove("open"),setTimeout(()=>{n=null},500)}async function Y(){z.classList.add("active"),y.disabled=!0;try{let k=$.querySelector("#cw-lib-inp-title"),j=$.querySelector("#cw-lib-inp-content"),ie=k.value.trim(),P=j.contentEditable==="true"?j.innerHTML:j.value.trim(),X=j.getAttribute("data-is-code")==="true";if(!ie||!P||P==="<br>"){w.playError(),ne(Le("fillTitleAndContent"),{error:!0});return}let ce={id:n,type:a,title:ie,content:P,isCode:X,isRich:j.contentEditable==="true"};if(a==="email"){let b=$.querySelector("#cw-lib-inp-subject").value.trim();if(!b){w.playError(),ne(Le("subjectRequired"),{error:!0});return}ce.subject=b}let v=await kt.save(ce);if(v===!1){w.playError(),ne(Le("saveFailedNoUser"),{error:!0});return}re(),T(),v.synced===!1?(w.playError(),ne(Le("savedLocalOnly"),{error:!0})):(ne(Le("savedAndSynced")),w.playSuccess())}catch(k){console.error("Erro ao salvar item da biblioteca:",k),w.playError(),ne(Le("saveError"),{error:!0})}finally{z.classList.remove("active"),y.disabled=!1}}function se(k,j,ie,P={}){let X=document.createElement("div");X.className="cw-lib-field";let ce=document.createElement("label");ce.className="cw-lib-label",ce.textContent=j,X.appendChild(ce);let v;if(P.isRich){let b=document.createElement("div");b.className="cw-lib-toolbar-mini",b.innerHTML=`
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-bold" title="${Le("bold")}">${Tt.bold}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-italic" title="${Le("italic")}">${Tt.italic}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-code" title="${Le("codeFormat")}">${Tt.code}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-img" title="${Le("insertImage")}">${Tt.image}</button>
            `,v=document.createElement("div"),v.className="cw-lib-input cw-lib-editable",v.contentEditable="true",v.innerHTML=ie||"",P.isCode&&(v.style.fontFamily="'Roboto Mono', monospace",v.style.background="#F8F9FA",v.setAttribute("data-is-code","true"),b.querySelector(".cw-tb-code").classList.add("active")),b.querySelectorAll(".cw-lib-tb-btn").forEach(d=>{d.onmouseenter=()=>w.playHover(),d.onmousedown=()=>w.playClick()}),b.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),v.focus()},b.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),v.focus()},b.querySelector(".cw-tb-code").onclick=d=>{let _=!(v.getAttribute("data-is-code")==="true");v.setAttribute("data-is-code",String(_)),v.style.fontFamily=_?"'Roboto Mono', monospace":"inherit",v.style.background=_?"#F8F9FA":"#fff",d.currentTarget.classList.toggle("active",_),v.focus()},b.querySelector(".cw-tb-img").onclick=async()=>{let d=await xn(Le("imageUrlPrompt"));d&&(document.execCommand("insertImage",!1,d),v.querySelectorAll("img").forEach(N=>{N.style.maxWidth="100%",N.style.borderRadius="8px"}))},v.onpaste=d=>{let N=(d.clipboardData||d.originalEvent.clipboardData).items;for(let _ of N)if(_.kind==="file"&&_.type.startsWith("image/")){d.preventDefault();let g=new FileReader;g.onload=x=>{document.execCommand("insertHTML",!1,`<img src="${x.target.result}" style="max-width:100%;border-radius:8px;margin:8px 0;display:block;">`)},g.readAsDataURL(_.getAsFile())}},X.appendChild(b)}else v=document.createElement("input"),v.className="cw-lib-input",v.type="text",v.value=ie||"";return v.id=`cw-lib-inp-${k}`,X.appendChild(v),X}function V(k){let j=document.createElement("div");return j.textContent=k||"",j.innerHTML}L.addEventListener("input",k=>{o=k.target.value,S.classList.toggle("visible",o.length>0),re()}),S.onclick=()=>{L.value="",o="",S.classList.remove("visible"),re(),L.focus()};function O(){t=!ht(r),ct(t,r,"cw-btn-library"),t?(Je(),re()):(Qe(),Z())}return je(()=>{p&&(p.textContent=Le("headerTitle"));let k=r.querySelector(".cw-help-title");k&&(k.textContent=Le("headerTitle"));let j=r.querySelector(".cw-help-description");j&&(j.textContent=Le("headerDesc")),ur.forEach(P=>{let X=document.querySelector(`#lib-tab-${P.id} .js-lib-tab-label`);X&&(X.textContent=Le("tabs")[P.id])}),L.placeholder=Le("searchPlaceholder"),G.title=Le("newItem"),te.title=Le("cancel");let ie=z.querySelector(".js-lib-saving");ie&&(ie.textContent=Le("saving")),re()}),O}var Xm='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>',Km='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>',Jm='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',Qm='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>';function Zm(e){if(document.getElementById("cw-shortcuts-styles"))return;let t=document.createElement("style");t.id="cw-shortcuts-styles",t.innerHTML=`
        .cw-sc-item {
            display: flex; align-items: center; gap: 10px; padding: 10px 12px;
            border: 1px solid ${e.border}; border-radius: 10px; background: #fff;
            transition: border-color 0.2s var(--cw-ease-standard),
                        box-shadow 0.2s var(--cw-ease-standard),
                        opacity 0.2s var(--cw-ease-standard);
        }
        .cw-sc-item + .cw-sc-item { margin-top: 8px; }
        .cw-sc-item:hover { border-color: #bdc1c6; }
        .cw-sc-item.dragging { opacity: 0.4; }
        .cw-sc-item.drop-target { border-color: ${e.primary}; box-shadow: 0 0 0 2px rgba(26,115,232,0.15); }
        .cw-sc-item.broken { border-color: ${e.warnBorder}; background: ${e.warnBg}; }
        .cw-sc-grip {
            color: #9aa0a6; cursor: grab; display: flex; background: none; border: none;
            padding: 2px; border-radius: 4px; flex-shrink: 0;
        }
        .cw-sc-grip:active { cursor: grabbing; }
        .cw-sc-grip:focus-visible { outline: 2px solid ${e.primary}; outline-offset: 1px; }
        .cw-sc-bolt {
            width: 26px; height: 26px; border-radius: 8px; background: #FEF7E0; color: #F9A825;
            display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .cw-sc-text { flex: 1; min-width: 0; }
        /* display:block \xE9 o que faz o ellipsis existir: label e meta s\xE3o
           <span>, e overflow/text-overflow n\xE3o valem em caixa inline - sem
           isso o nome comprido do atalho passava por cima do l\xE1pis e da
           lixeira em vez de ser cortado. */
        .cw-sc-label {
            display: block;
            font-size: 13px; font-weight: 600; color: ${e.text};
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cw-sc-meta {
            display: block;
            font-size: 11px; color: ${e.textSub}; margin-top: 2px;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cw-sc-warn { color: ${e.warnText}; font-weight: 600; }
        .cw-sc-iconbtn {
            width: 28px; height: 28px; flex-shrink: 0;
            border-radius: 8px; border: none; background: transparent;
            color: ${e.textSub}; cursor: pointer; display: flex; align-items: center;
            justify-content: center; transition: background 0.15s var(--cw-ease-standard), color 0.15s var(--cw-ease-standard);
        }
        .cw-sc-iconbtn:hover { background: #f1f3f4; color: ${e.text}; }
        .cw-sc-iconbtn.danger:hover { background: #fce8e6; color: #d93025; }
        .cw-sc-empty {
            font-size: 12px; color: ${e.textSub}; text-align: center;
            padding: 18px 12px; border: 1px dashed ${e.border}; border-radius: 10px;
        }
        .cw-sc-add {
            margin-top: 10px; width: 100%; padding: 10px; border-radius: 10px;
            border: 1px dashed ${e.border}; background: transparent; cursor: pointer;
            font-family: inherit; font-weight: 600; font-size: 12px; color: ${e.textSub};
            transition: all 0.2s var(--cw-ease-standard);
        }
        .cw-sc-add:hover:not(:disabled) { border-color: ${e.primary}; color: ${e.primary}; }
        .cw-sc-add:disabled { opacity: 0.5; cursor: not-allowed; }
        .cw-sc-field { display: flex; flex-direction: column; gap: 6px; }
        .cw-sc-field label { font-size: 11px; font-weight: 700; color: ${e.textSub}; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-sc-field input, .cw-sc-field select {
            padding: 9px 10px; border-radius: 8px; border: 1px solid ${e.border};
            font-family: inherit; font-size: 13px; color: ${e.text}; background: #fff; outline: none;
        }
        .cw-sc-field input:focus, .cw-sc-field select:focus { border-color: ${e.primary}; }
        .cw-sc-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        /* Mesma forma dos chips de cen\xE1rio do Case Notes (step-scenarios.js):
           \xE9 o mesmo objeto aparecendo em duas telas. */
        .cw-sc-chip {
            padding: 6px 12px; border-radius: 16px; border: 1px solid #dadce0;
            background: #ffffff; font-size: 13px; color: #3c4043; cursor: pointer;
            font-family: inherit; transition: all 0.2s var(--cw-ease-elastic);
        }
        .cw-sc-chip:hover:not(.on) { background: #f1f3f4; }
        .cw-sc-chip.on { background: #e8f0fe; border-color: #1a73e8; color: #1967d2; font-weight: 600; }
        .cw-sc-editor-actions { display: flex; gap: 8px; }
        .cw-sc-editor-actions button {
            flex: 1; padding: 10px; border-radius: 10px; font-family: inherit;
            font-weight: 600; font-size: 13px; cursor: pointer;
        }
        .cw-sc-cancel { border: 1px solid ${e.border}; background: #fff; color: ${e.textSub}; }
        .cw-sc-save { border: none; background: ${e.primary}; color: #fff; }
        .cw-sc-save:disabled { opacity: 0.6; cursor: progress; }

        /* Foco de teclado vis\xEDvel em TODO controle da se\xE7\xE3o - antes s\xF3 o punho
           de arrastar tinha, e quem navega por Tab ficava sem saber onde est\xE1. */
        .cw-sc-iconbtn:focus-visible,
        .cw-sc-chip:focus-visible,
        .cw-sc-add:focus-visible,
        .cw-sc-editor-actions button:focus-visible,
        .cw-sc-field input:focus-visible,
        .cw-sc-field select:focus-visible {
            outline: 2px solid ${e.primary};
            outline-offset: 1px;
        }

        /* Mesma cortesia que o resto do app j\xE1 faz (configs-assistant.js,
           animations.js, step-scenarios.js): quem pediu menos movimento n\xE3o
           deve receber transi\xE7\xE3o nenhuma daqui. */
        @media (prefers-reduced-motion: reduce) {
            .cw-sc-item, .cw-sc-iconbtn, .cw-sc-add, .cw-sc-chip {
                transition: none !important;
            }
        }
    `,document.head.appendChild(t)}function ld(e,t){Zm(t);let a=document.createElement("div");a.className="cw-configs-section",a.innerHTML=`
        <div class="cw-configs-section-title js-sc-title"></div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label js-sc-sort-label"></div>
                    <div class="cw-configs-desc js-sc-sort-desc"></div>
                </div>
                <label class="cw-toggle-switch">
                    <input type="checkbox" class="js-sc-sort-toggle">
                    <span class="cw-toggle-track"></span>
                </label>
            </div>
            <div class="js-sc-body"></div>
        </div>
    `;let o=a.querySelector(".js-sc-body"),n=a.querySelector(".js-sc-sort-toggle");n.onchange=async u=>{w.playClick(),await lt.setSortedByUsage(u.target.checked),s()};function i(u){let h=st[u.payload.subStatus],L=h?h.name:u.payload.subStatus,S=(u.payload.scenarios||[]).length,C=[u.payload.caseType.toUpperCase(),L,S===1?e("scOneScenario"):e("scNScenarios").replace("{n}",S)];return u.alias&&C.push(`"${u.alias}"`),C.join(" \xB7 ")}function r(u,h,L){if(u.textContent="",L){let S=document.createElement("span");S.className="cw-sc-warn",S.textContent=e("scBroken"),u.appendChild(S),u.appendChild(document.createTextNode(" \xB7 "))}u.appendChild(document.createTextNode(i(h)))}function s(){o.innerHTML="",n.checked=lt.isSortedByUsage();let u=lt.isSortedByUsage(),h=u?lt.list():lt.listRaw(),L=!u;if(!h.length){let C=document.createElement("div");C.className="cw-sc-empty",C.textContent=e("scEmpty"),o.appendChild(C)}h.forEach((C,D)=>{let G=fl(C),F=document.createElement("div");F.className="cw-sc-item"+(G.length?" broken":""),F.dataset.id=C.id,F.dataset.index=String(D),F.innerHTML=`
                ${L?`<button type="button" class="cw-sc-grip" aria-label="${e("scReorder")}">${Km}</button>`:""}
                <span class="cw-sc-bolt">${Xm}</span>
                <span class="cw-sc-text">
                    <span class="cw-sc-label"></span>
                    <span class="cw-sc-meta"></span>
                </span>
                <button type="button" class="cw-sc-iconbtn js-sc-edit" aria-label="${e("scEdit")}">${Jm}</button>
                <button type="button" class="cw-sc-iconbtn danger js-sc-del" aria-label="${e("scDelete")}">${Qm}</button>
            `;let R=F.querySelector(".cw-sc-label");R.textContent=C.label,R.title=C.label,r(F.querySelector(".cw-sc-meta"),C,G.length>0),F.querySelector(".js-sc-edit").onclick=()=>m(C),F.querySelector(".js-sc-del").onclick=()=>l(C),L&&p(F,D,h.length),o.appendChild(F)});let S=document.createElement("button");S.type="button",S.className="cw-sc-add",S.textContent=e("scAdd"),S.disabled=h.length>=ua,S.disabled&&(S.textContent=e("scLimit").replace("{max}",ua)),S.onclick=()=>m(null),o.appendChild(S)}async function l(u){await ot(e("scDeleteConfirm").replace("{name}",u.label),{danger:!0})&&(await lt.remove(u.id),w.playClick(),s())}function p(u,h,L){let S=u.querySelector(".cw-sc-grip");u.draggable=!0;let C=!1;S.onmousedown=()=>{C=!0},u.onmouseup=()=>{C=!1},S.onkeydown=async D=>{let G=D.key==="ArrowUp"?-1:D.key==="ArrowDown"?1:0;if(!G)return;D.preventDefault();let F=h+G;if(F<0||F>=L)return;await lt.reorder(u.dataset.id,F),w.playClick(),s();let R=o.querySelector(`.cw-sc-item[data-id="${u.dataset.id}"] .cw-sc-grip`);R&&R.focus()},u.ondragstart=D=>{if(!C){D.preventDefault();return}D.dataTransfer.effectAllowed="move",D.dataTransfer.setData("text/plain",u.dataset.id),u.classList.add("dragging")},u.ondragend=()=>{u.classList.remove("dragging"),C=!1,o.querySelectorAll(".drop-target").forEach(D=>D.classList.remove("drop-target"))},u.ondragover=D=>{D.preventDefault(),u.classList.add("drop-target")},u.ondragleave=()=>u.classList.remove("drop-target"),u.ondrop=async D=>{D.preventDefault(),u.classList.remove("drop-target");let G=D.dataTransfer.getData("text/plain");!G||G===u.dataset.id||(await lt.reorder(G,Number(u.dataset.index)),w.playClick(),s())}}function c(){let u=[];for(let h in st){let L=st[h].status;L&&!u.includes(L)&&u.push(L)}return u}function m(u){let L=!!u?JSON.parse(JSON.stringify(u)):{id:Uo(),kind:"note",label:"",alias:"",payload:{caseType:"bau",status:"",subStatus:"",scenarios:[]}};o.innerHTML="";let S=document.createElement("div");S.style.cssText="display: flex; flex-direction: column; gap: 14px;",S.innerHTML=`
            <div class="cw-sc-field">
                <label for="cw-sc-name">${e("scName")}</label>
                <input id="cw-sc-name" type="text" maxlength="60" placeholder="${e("scNamePlaceholder")}">
            </div>
            <div class="cw-sc-field">
                <label for="cw-sc-alias">${e("scAlias")}</label>
                <input id="cw-sc-alias" type="text" maxlength="40" placeholder="${e("scAliasPlaceholder")}">
                <div class="cw-configs-desc">${e("scAliasDesc")}</div>
            </div>
            <div class="cw-sc-field">
                <label for="cw-sc-type">${e("scFlow")}</label>
                <select id="cw-sc-type">
                    <option value="bau">BAU</option>
                    <option value="lm">LM</option>
                </select>
            </div>
            <div class="cw-sc-field">
                <label for="cw-sc-status">${e("scStatus")}</label>
                <select id="cw-sc-status"></select>
            </div>
            <div class="cw-sc-field">
                <label for="cw-sc-sub">${e("scSubStatus")}</label>
                <select id="cw-sc-sub"></select>
            </div>
            <div class="cw-sc-field">
                <label>${e("scScenarios")}</label>
                <div class="cw-sc-chips js-sc-scenarios"></div>
                <div class="cw-configs-desc">${e("scScenariosDesc")}</div>
            </div>
            <div class="cw-sc-editor-actions">
                <button type="button" class="cw-sc-cancel">${e("scCancel")}</button>
                <button type="button" class="cw-sc-save">${e("scSave")}</button>
            </div>
        `,o.appendChild(S);let C=S.querySelector("#cw-sc-name"),D=S.querySelector("#cw-sc-alias"),G=S.querySelector("#cw-sc-type"),F=S.querySelector("#cw-sc-status"),R=S.querySelector("#cw-sc-sub"),le=S.querySelector(".js-sc-scenarios");C.value=L.label,D.value=L.alias,G.value=L.payload.caseType,F.innerHTML='<option value="">\u2014</option>'+c().map(A=>`<option value="${A}">${A}</option>`).join(""),F.value=L.payload.status;function te(){let A=F.value;R.innerHTML='<option value="">\u2014</option>';for(let y in st){if(st[y].status!==A)continue;let z=document.createElement("option");z.value=y,z.textContent=st[y].name,R.appendChild(z)}R.disabled=!A}function ee(){if(le.innerHTML="",!R.value){le.innerHTML=`<div class="cw-configs-desc">${e("scPickSubStatus")}</div>`;return}let A=eo(R.value,G.value);if(!A.length){le.innerHTML=`<div class="cw-configs-desc">${e("scNoScenarios")}</div>`;return}A.forEach(([y])=>{let z=document.createElement("button");z.type="button",z.className="cw-sc-chip",z.textContent=to(y,R.value);let U=()=>L.payload.scenarios.some(M=>M.id===y);z.classList.toggle("on",U()),z.onclick=()=>{U()?L.payload.scenarios=L.payload.scenarios.filter(M=>M.id!==y):L.payload.scenarios.push({id:y,substatus:R.value}),z.classList.toggle("on",U()),w.playClick()},le.appendChild(z)})}te(),R.value=L.payload.subStatus,ee(),F.onchange=()=>{L.payload.scenarios=[],te(),R.value="",ee()},R.onchange=()=>{L.payload.scenarios=[],ee()},G.onchange=()=>{L.payload.scenarios=[],ee()},S.querySelector(".cw-sc-cancel").onclick=()=>{w.playClick(),s()};let $=S.querySelector(".cw-sc-save");$.onclick=async()=>{if(!R.value){w.playError(),ne(e("scPickSubStatus"),{error:!0});return}let A=$.textContent;$.disabled=!0,$.textContent=e("scSaving");let y=C.value.trim()||st[R.value].name,z=await lt.save({...L,label:y,alias:D.value.trim(),payload:{...L.payload,caseType:G.value,status:F.value||String(R.value).split("_")[0],subStatus:R.value}});if(!z.ok){$.disabled=!1,$.textContent=A,w.playError(),ne(e("scLimit").replace("{max}",ua),{error:!0});return}w.playSuccess(),ne(z.synced?e("scSaved"):e("scSavedLocal")),s()}}return a.refresh=s,a.applyTexts=()=>{a.querySelector(".js-sc-title").textContent=e("scSectionTitle"),a.querySelector(".js-sc-sort-label").textContent=e("scSortLabel"),a.querySelector(".js-sc-sort-desc").textContent=e("scSortDesc"),s()},s(),a}var eg='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>',tg='<svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>',ag='<svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;"><path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>';function og(e){if(document.getElementById("cw-pill-section-styles"))return;let t=document.createElement("style");t.id="cw-pill-section-styles",t.innerHTML=`
        .cw-pl-group + .cw-pl-group { margin-top: 4px; }
        .cw-pl-head {
            display: flex; align-items: center; justify-content: space-between;
            font-size: 11px; font-weight: 700; color: ${e.textSub};
            text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;
        }
        .cw-pl-count { font-weight: 600; letter-spacing: 0; }
        .cw-pl-count.full { color: ${e.warnText}; }
        /* Altura m\xEDnima: arrastar para uma lista vazia precisa de onde soltar. */
        .cw-pl-list { display: flex; flex-direction: column; gap: 6px; min-height: 44px; border-radius: 10px; }
        .cw-pl-list.drop-target { outline: 2px dashed ${e.primary}; outline-offset: 2px; }
        .cw-pl-empty {
            font-size: 12px; color: ${e.textSub}; text-align: center;
            padding: 12px; border: 1px dashed ${e.border}; border-radius: 10px;
        }
        .cw-pl-item {
            display: flex; align-items: center; gap: 10px; padding: 8px 10px;
            border: 1px solid ${e.border}; border-radius: 10px; background: #fff;
            transition: border-color 0.2s var(--cw-ease-standard),
                        box-shadow 0.2s var(--cw-ease-standard),
                        opacity 0.2s var(--cw-ease-standard);
        }
        .cw-pl-item:hover { border-color: #bdc1c6; }
        .cw-pl-item.dragging { opacity: 0.4; }
        .cw-pl-item.drop-target { border-color: ${e.primary}; box-shadow: 0 0 0 2px rgba(26,115,232,0.15); }
        .cw-pl-grip {
            color: #9aa0a6; cursor: grab; display: flex; background: none; border: none;
            padding: 2px; border-radius: 4px; flex-shrink: 0;
        }
        .cw-pl-grip:active { cursor: grabbing; }
        .cw-pl-icon {
            width: 28px; height: 28px; border-radius: 8px; background: #F1F3F4; color: #5F6368;
            display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .cw-pl-icon svg { width: 18px; height: 18px; fill: currentColor; }
        .cw-pl-label {
            flex: 1; min-width: 0; font-size: 13px; font-weight: 600; color: ${e.text};
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cw-pl-move {
            width: 28px; height: 28px; flex-shrink: 0; border-radius: 8px; border: none;
            background: transparent; color: ${e.textSub}; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            transition: background 0.15s var(--cw-ease-standard), color 0.15s var(--cw-ease-standard);
        }
        .cw-pl-move:hover:not(:disabled) { background: #f1f3f4; color: ${e.text}; }
        .cw-pl-move:disabled { opacity: 0.35; cursor: not-allowed; }
        .cw-pl-reset {
            margin-top: 4px; width: 100%; padding: 10px; border-radius: 10px;
            border: 1px dashed ${e.border}; background: transparent; cursor: pointer;
            font-family: inherit; font-weight: 600; font-size: 12px; color: ${e.textSub};
            transition: all 0.2s var(--cw-ease-standard);
        }
        .cw-pl-reset:hover { border-color: ${e.primary}; color: ${e.primary}; }
        .cw-pl-grip:focus-visible, .cw-pl-move:focus-visible, .cw-pl-reset:focus-visible {
            outline: 2px solid ${e.primary}; outline-offset: 1px;
        }
        @media (prefers-reduced-motion: reduce) {
            .cw-pl-item, .cw-pl-move, .cw-pl-reset { transition: none !important; }
        }
    `,document.head.appendChild(t)}function cd(e,t){og(t);let a=document.createElement("div");a.className="cw-configs-section",a.innerHTML=`
        <div class="cw-configs-section-title js-pl-title"></div>
        <div class="cw-configs-card">
            <div class="cw-configs-desc js-pl-desc" style="margin-top:0;"></div>
            <div class="cw-pl-group">
                <div class="cw-pl-head"><span class="js-pl-pinned-title"></span><span class="cw-pl-count js-pl-count"></span></div>
                <div class="cw-pl-list js-pl-list-pinned" data-list="pinned"></div>
            </div>
            <div class="cw-pl-group">
                <div class="cw-pl-head"><span class="js-pl-drawer-title"></span></div>
                <div class="cw-pl-list js-pl-list-drawer" data-list="drawer"></div>
            </div>
            <button type="button" class="cw-pl-reset js-pl-reset"></button>
        </div>
    `;let o={pinned:a.querySelector(".js-pl-list-pinned"),drawer:a.querySelector(".js-pl-list-drawer")},n=c=>c.replace("{max}",pa);function i(c,m,u){let h=sa.move(c,m,u);return h.ok?(w.playClick(),!0):(h.reason==="full"&&(w.playError(),ne(n(e("plFull")),{error:!0})),!1)}function r(c){let m=a.querySelector(`.cw-pl-item[data-id="${c}"] .cw-pl-grip`);m&&m.focus()}function s(c,m,u,h,L,S){let C=c.querySelector(".cw-pl-grip"),D=c.querySelector(".cw-pl-move");D.onclick=()=>i(m,u==="pinned"?"drawer":"pinned",1/0),C.onkeydown=F=>{let R=F.key==="ArrowUp"?-1:F.key==="ArrowDown"?1:0;if(!R)return;F.preventDefault();let le=h+R;le<0||le>=L||i(m,u,le)&&r(m)},c.draggable=!0;let G=!1;C.onmousedown=()=>{G=!0},c.onmouseup=()=>{G=!1},c.ondragstart=F=>{if(!G){F.preventDefault();return}F.dataTransfer.effectAllowed="move",F.dataTransfer.setData("text/plain",m),c.classList.add("dragging")},c.ondragend=()=>{c.classList.remove("dragging"),G=!1,a.querySelectorAll(".drop-target").forEach(F=>F.classList.remove("drop-target"))},c.ondragover=F=>{F.preventDefault(),F.stopPropagation(),c.classList.add("drop-target")},c.ondragleave=()=>c.classList.remove("drop-target"),c.ondrop=F=>{F.preventDefault(),F.stopPropagation(),c.classList.remove("drop-target");let R=F.dataTransfer.getData("text/plain");!R||R===m||i(R,u,h)}}Object.entries(o).forEach(([c,m])=>{m.ondragover=u=>{u.preventDefault(),m.classList.add("drop-target")},m.ondragleave=u=>{m.contains(u.relatedTarget)||m.classList.remove("drop-target")},m.ondrop=u=>{u.preventDefault(),m.classList.remove("drop-target");let h=u.dataTransfer.getData("text/plain");h&&i(h,c,1/0)}});function l(){let c=sa.get(),m=c.pinned.length>=pa;Object.entries(o).forEach(([h,L])=>{L.replaceChildren();let S=c[h];if(!S.length){if(h==="pinned"){let C=document.createElement("div");C.className="cw-pl-empty",C.textContent=e("plPinnedEmpty"),L.appendChild(C)}return}S.forEach((C,D)=>{let G=document.createElement("div");G.className="cw-pl-item",G.dataset.id=C;let F=h==="drawer",R=F&&m,le=R?n(e("plFull")):e(F?"plMoveToPill":"plMoveToDrawer");G.innerHTML=`
                    <button type="button" class="cw-pl-grip" aria-label="${e("plReorder")}">${eg}</button>
                    <span class="cw-pl-icon">${nl(C)}</span>
                    <span class="cw-pl-label"></span>
                    <button type="button" class="cw-pl-move" ${R?"disabled":""}>${F?ag:tg}</button>
                `;let te=G.querySelector(".cw-pl-label");te.textContent=jo(C);let ee=G.querySelector(".cw-pl-move");ee.title=le,ee.setAttribute("aria-label",`${jo(C)}: ${le}`),s(G,C,h,D,S.length,m),L.appendChild(G)})});let u=a.querySelector(".js-pl-count");u.textContent=`${c.pinned.length}/${pa}`,u.classList.toggle("full",m)}a.querySelector(".js-pl-reset").onclick=async()=>{await ot(e("plResetConfirm"))&&(sa.reset(),w.playClick())},sa.onChange(l);function p(){a.querySelector(".js-pl-title").textContent=e("plSectionTitle"),a.querySelector(".js-pl-desc").textContent=n(e("plDesc")),a.querySelector(".js-pl-pinned-title").textContent=e("plPinnedTitle"),a.querySelector(".js-pl-drawer-title").textContent=e("plDrawerTitle"),a.querySelector(".js-pl-reset").textContent=e("plReset"),l()}return p(),a.applyTexts=p,a.refresh=l,a}var gr="notes_default_segment",dd="notes_last_segment",fr="notes_default_flow",pd=["all","sbse","mms","last"],ng=["bau","lm"];function ig(e,t,a){let o=r=>a.includes(r),n=pd.includes(e)?e:"all",i=n==="last"?t:n;return o(i)?i:"all"}function rg(e){return ng.includes(e)?e:"bau"}function br(){let e=Ye.get(gr,"all");return pd.includes(e)?e:"all"}function Ko(){return rg(Ye.get(fr,"bau"))}function ud(e){return ig(br(),Ye.get(dd,"all"),e)}function md(e){Ye.set(dd,e).catch(()=>{})}var hr={pt:{title:"Nota em tabela",segLabel:"Abrir em",segDesc:'O tipo de nota que a Nota em tabela mostra ao abrir. "\xDAltimo" retoma o que voc\xEA usou por \xFAltimo.',flowLabel:"Fluxo padr\xE3o",flowDesc:'BAU ou LM ao abrir. Voc\xEA ainda troca na linha "Nota".',last:"\xDAltimo",saved:"Prefer\xEAncia salva."},es:{title:"Nota en tabla",segLabel:"Abrir en",segDesc:'El tipo de nota que muestra Nota en tabla al abrirse. "\xDAltimo" retoma el que us\xF3 por \xFAltima vez.',flowLabel:"Flujo predeterminado",flowDesc:'BAU o LM al abrir. Igual puede cambiarlo en la fila "Nota".',last:"\xDAltimo",saved:"Preferencia guardada."},en:{title:"Table note",segLabel:"Open in",segDesc:'The note type Table note shows when it opens. "Last" picks up the one you used last.',flowLabel:"Default flow",flowDesc:'BAU or LM when it opens. You can still switch it in the "Note" row.',last:"Last",saved:"Preference saved."}},ho=e=>(hr[ge()]||hr.pt)[e]||hr.pt[e];function gd(){let e=document.createElement("div");e.className="cw-configs-section",e.innerHTML=`
        <div class="cw-configs-section-title js-nt-title"></div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label js-nt-seg-label"></div>
                    <div class="cw-configs-desc js-nt-seg-desc"></div>
                </div>
                <div class="cw-lang-toggle" id="cw-config-nt-segment" role="group">
                    <button type="button" data-v="all">ALL</button>
                    <button type="button" data-v="sbse">SBS-E</button>
                    <button type="button" data-v="mms">MMS</button>
                    <button type="button" data-v="last" class="js-nt-last"></button>
                </div>
            </div>
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label js-nt-flow-label"></div>
                    <div class="cw-configs-desc js-nt-flow-desc"></div>
                </div>
                <div class="cw-lang-toggle" id="cw-config-nt-flow" role="group">
                    <button type="button" data-v="bau">BAU</button>
                    <button type="button" data-v="lm">LM</button>
                </div>
            </div>
        </div>
    `;let t=e.querySelector("#cw-config-nt-segment"),a=e.querySelector("#cw-config-nt-flow");function o(){let i=br(),r=Ko();t.querySelectorAll("button").forEach(s=>{s.classList.toggle("active",s.dataset.v===i),s.setAttribute("aria-pressed",String(s.dataset.v===i))}),a.querySelectorAll("button").forEach(s=>{s.classList.toggle("active",s.dataset.v===r),s.setAttribute("aria-pressed",String(s.dataset.v===r))})}let n=(i,r)=>i.querySelectorAll("button").forEach(s=>{s.onclick=()=>{Ye.set(r,s.dataset.v).catch(l=>console.warn("Prefer\xEAncia da Nota em tabela n\xE3o sincronizou",l)),o(),w.playClick()}});return n(t,gr),n(a,fr),e.applyTexts=()=>{e.querySelector(".js-nt-title").textContent=ho("title"),e.querySelector(".js-nt-seg-label").textContent=ho("segLabel"),e.querySelector(".js-nt-seg-desc").textContent=ho("segDesc"),e.querySelector(".js-nt-flow-label").textContent=ho("flowLabel"),e.querySelector(".js-nt-flow-desc").textContent=ho("flowDesc"),e.querySelector(".js-nt-last").textContent=ho("last"),o()},e.refresh=o,e.applyTexts(),e}var sg={pt:{title:"Configura\xE7\xF5es",headerDesc:"Personalize sua experi\xEAncia e prefer\xEAncias.",profileNotFound:"Perfil n\xE3o localizado na base de dados.",consultant:"Consultor",overheadBadge:"Gest\xE3o / Overhead",soundSectionTitle:"Prefer\xEAncias de Som",soundLabel:"Efeitos Sonoros",soundDesc:"Ativar ou desativar sons de interface.",langSectionTitle:"Idioma da Interface",langLabel:"Idioma",langDesc:"Escolha o idioma dos menus, bot\xF5es e mensagens do Case Wizard.",outLangLabel:"Idioma do Atendimento",outLangDesc:"Idioma do case note, do e-mail e do roteiro de chamada. \xC9 o idioma do anunciante, n\xE3o o seu.",supportSectionTitle:"Suporte & Feedback",docsLink:"Abrir a documenta\xE7\xE3o",reportBug:"Reportar Bug/Sugest\xF5es",diagSectionTitle:"Diagn\xF3stico",diagLabel:"Ambiente do backend",diagDesc:"Qual implanta\xE7\xE3o do Apps Script este bundle usa. O sufixo tem de bater com o do dashboard.",scSectionTitle:"Meus Atalhos (Ctrl+K)",scSortLabel:"Ordenar por frequ\xEAncia de uso",scSortDesc:"Desligue para definir voc\xEA mesmo a ordem, arrastando os atalhos.",scEmpty:"Voc\xEA ainda n\xE3o tem atalhos. Crie um aqui ou monte uma nota no Case Notes e clique em \u201CSalvar como atalho\u201D.",scAdd:"+ Criar atalho",scLimit:"Limite de {max} atalhos atingido",scEdit:"Editar atalho",scDelete:"Excluir atalho",scReorder:"Reordenar (arraste ou use as setas)",scDeleteConfirm:"Excluir o atalho \u201C{name}\u201D?",scBroken:"\u26A0 cen\xE1rio indispon\xEDvel",scOneScenario:"1 cen\xE1rio",scNScenarios:"{n} cen\xE1rios",scName:"Nome",scNamePlaceholder:"Ex: Fim do 2 Day Rule",scAlias:"Apelido de busca",scAliasPlaceholder:"Ex: 2day",scAliasDesc:"Palavra que encontra este atalho no Ctrl+K, al\xE9m do nome.",scFlow:"Fluxo",scStatus:"Status",scSubStatus:"Substatus",scScenarios:"Cen\xE1rios",scScenariosDesc:"Opcional: sem nenhum, o atalho s\xF3 abre a nota j\xE1 no substatus certo.",scPickSubStatus:"Escolha um substatus primeiro.",scNoScenarios:"Nenhum cen\xE1rio dispon\xEDvel para esta combina\xE7\xE3o.",scCancel:"Cancelar",scSave:"Salvar",scSaving:"Salvando\u2026",scSaved:"Atalho salvo!",scSavedLocal:"Atalho salvo neste navegador (sem conex\xE3o com a nuvem).",plSectionTitle:"P\xEDlula e Gaveta",plDesc:"Escolha o que fica fixado na p\xEDlula (at\xE9 {max}) e o que fica guardado na gaveta, atr\xE1s do bot\xE3o de grade. Arraste para reordenar. Tudo continua dispon\xEDvel no Ctrl+K.",plPinnedTitle:"Na p\xEDlula",plDrawerTitle:"Na gaveta",plPinnedEmpty:"Nenhum m\xF3dulo na p\xEDlula: s\xF3 o bot\xE3o de grade aparece.",plMoveToDrawer:"Guardar na gaveta",plMoveToPill:"Fixar na p\xEDlula",plFull:"A p\xEDlula comporta no m\xE1ximo {max} m\xF3dulos",plReorder:"Reordenar (arraste ou use as setas)",plReset:"Restaurar padr\xE3o",plResetConfirm:"Restaurar a p\xEDlula e a gaveta para o padr\xE3o?"},es:{title:"Configuraci\xF3n",headerDesc:"Personaliza tu experiencia y tus preferencias.",profileNotFound:"Perfil no encontrado en la base de datos.",consultant:"Consultor",overheadBadge:"Gesti\xF3n / Overhead",soundSectionTitle:"Preferencias de Sonido",soundLabel:"Efectos de Sonido",soundDesc:"Activar o desactivar los sonidos de la interfaz.",langSectionTitle:"Idioma de la Interfaz",langLabel:"Idioma",langDesc:"Elige el idioma de los men\xFAs, botones y mensajes del Case Wizard.",outLangLabel:"Idioma de la Atenci\xF3n",outLangDesc:"Idioma del case note, del correo y del guion de llamada. Es el idioma del anunciante, no el tuyo.",supportSectionTitle:"Soporte y Comentarios",docsLink:"Abrir la documentaci\xF3n",reportBug:"Reportar error o sugerencia",diagSectionTitle:"Diagn\xF3stico",diagLabel:"Entorno del backend",diagDesc:"Qu\xE9 implementaci\xF3n de Apps Script usa este bundle. El sufijo debe coincidir con el del panel.",scSectionTitle:"Mis Atajos (Ctrl+K)",scSortLabel:"Ordenar por frecuencia de uso",scSortDesc:"Desact\xEDvalo para definir t\xFA mismo el orden, arrastrando los atajos.",scEmpty:"Todav\xEDa no tienes atajos. Crea uno aqu\xED o arma una nota en Case Notes y haz clic en \u201CGuardar como atajo\u201D.",scAdd:"+ Crear atajo",scLimit:"L\xEDmite de {max} atajos alcanzado",scEdit:"Editar atajo",scDelete:"Eliminar atajo",scReorder:"Reordenar (arrastra o usa las flechas)",scDeleteConfirm:"\xBFEliminar el atajo \u201C{name}\u201D?",scBroken:"\u26A0 escenario no disponible",scOneScenario:"1 escenario",scNScenarios:"{n} escenarios",scName:"Nombre",scNamePlaceholder:"Ej: Fin del 2 Day Rule",scAlias:"Apodo de b\xFAsqueda",scAliasPlaceholder:"Ej: 2day",scAliasDesc:"Palabra que encuentra este atajo en el Ctrl+K, adem\xE1s del nombre.",scFlow:"Flujo",scStatus:"Estado",scSubStatus:"Subestado",scScenarios:"Escenarios",scScenariosDesc:"Opcional: sin ninguno, el atajo solo abre la nota ya en el subestado correcto.",scPickSubStatus:"Elige un subestado primero.",scNoScenarios:"Ning\xFAn escenario disponible para esta combinaci\xF3n.",scCancel:"Cancelar",scSave:"Guardar",scSaving:"Guardando\u2026",scSaved:"\xA1Atajo guardado!",scSavedLocal:"Atajo guardado en este navegador (sin conexi\xF3n con la nube).",plSectionTitle:"Barra flotante y Caj\xF3n",plDesc:"Elige qu\xE9 queda fijado en la barra flotante (hasta {max}) y qu\xE9 se guarda en el caj\xF3n, detr\xE1s del bot\xF3n de cuadr\xEDcula. Arrastra para reordenar. Todo sigue disponible en Ctrl+K.",plPinnedTitle:"En la barra",plDrawerTitle:"En el caj\xF3n",plPinnedEmpty:"Ning\xFAn m\xF3dulo en la barra: solo aparece el bot\xF3n de cuadr\xEDcula.",plMoveToDrawer:"Guardar en el caj\xF3n",plMoveToPill:"Fijar en la barra",plFull:"La barra admite como m\xE1ximo {max} m\xF3dulos",plReorder:"Reordenar (arrastra o usa las flechas)",plReset:"Restaurar valores predeterminados",plResetConfirm:"\xBFRestaurar la barra y el caj\xF3n a los valores predeterminados?"},en:{title:"Settings",headerDesc:"Customize your experience and preferences.",profileNotFound:"Profile not found in the database.",consultant:"Consultant",overheadBadge:"Management / Overhead",soundSectionTitle:"Sound Preferences",soundLabel:"Sound Effects",soundDesc:"Turn interface sounds on or off.",langSectionTitle:"Interface Language",langLabel:"Language",langDesc:"Choose the language of Case Wizard's menus, buttons and messages.",outLangLabel:"Case Language",outLangDesc:"Language of the case note, the email and the call script. This is the advertiser's language, not yours.",supportSectionTitle:"Support & Feedback",docsLink:"Open the documentation",reportBug:"Report a Bug/Suggestion",diagSectionTitle:"Diagnostics",diagLabel:"Backend environment",diagDesc:"Which Apps Script deployment this bundle uses. The suffix must match the dashboard's.",scSectionTitle:"My Shortcuts (Ctrl+K)",scSortLabel:"Sort by usage frequency",scSortDesc:"Turn this off to set the order yourself by dragging the shortcuts.",scEmpty:"You don\u2019t have any shortcuts yet. Create one here, or build a note in Case Notes and click \u201CSave as shortcut\u201D.",scAdd:"+ Create shortcut",scLimit:"Limit of {max} shortcuts reached",scEdit:"Edit shortcut",scDelete:"Delete shortcut",scReorder:"Reorder (drag or use the arrows)",scDeleteConfirm:"Delete the shortcut \u201C{name}\u201D?",scBroken:"\u26A0 scenario unavailable",scOneScenario:"1 scenario",scNScenarios:"{n} scenarios",scName:"Name",scNamePlaceholder:"e.g.: End of 2 Day Rule",scAlias:"Search alias",scAliasPlaceholder:"e.g.: 2day",scAliasDesc:"A word that finds this shortcut in Ctrl+K, in addition to the name.",scFlow:"Flow",scStatus:"Status",scSubStatus:"Substatus",scScenarios:"Scenarios",scScenariosDesc:"Optional: with none selected, the shortcut just opens the note already on the right substatus.",scPickSubStatus:"Choose a substatus first.",scNoScenarios:"No scenario available for this combination.",scCancel:"Cancel",scSave:"Save",scSaving:"Saving\u2026",scSaved:"Shortcut saved!",scSavedLocal:"Shortcut saved in this browser (no cloud connection).",plSectionTitle:"Pill & Drawer",plDesc:"Choose what stays pinned on the pill (up to {max}) and what is stowed in the drawer, behind the grid button. Drag to reorder. Everything is still available in Ctrl+K.",plPinnedTitle:"On the pill",plDrawerTitle:"In the drawer",plPinnedEmpty:"No modules on the pill: only the grid button shows.",plMoveToDrawer:"Stow in the drawer",plMoveToPill:"Pin to the pill",plFull:"The pill holds at most {max} modules",plReorder:"Reorder (drag or use the arrows)",plReset:"Restore defaults",plResetConfirm:"Restore the pill and the drawer to the defaults?"}};function fd(){let e=Wa(sg),t="v1.1",a=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0",warnBorder:"#F9AB00",warnBg:"#FFFBF0",warnText:"#B06000"},n="cw-configs-styles";if(!document.getElementById(n)){let M=document.createElement("style");M.id=n,M.innerHTML=`
            .cw-configs-container {
                display: flex; flex-direction: column; height: 100%;
                background: ${o.bg}; font-family: 'Google Sans', Roboto, sans-serif;
                padding: 20px; gap: 24px; overflow-y: auto;
            }
            .cw-configs-section { display: flex; flex-direction: column; gap: 12px; }
            .cw-configs-section-title {
                font-size: 12px; font-weight: 700; color: ${o.textSub};
                text-transform: uppercase; letter-spacing: 0.8px;
            }
            .cw-configs-card {
                background: ${o.surface}; border-radius: 12px; padding: 16px;
                border: 1px solid ${o.border}; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                display: flex; flex-direction: column; gap: 16px;
            }
            .cw-configs-row { display: flex; align-items: center; justify-content: space-between; }
            .cw-configs-label { font-size: 14px; font-weight: 500; color: ${o.text}; }
            .cw-configs-desc { font-size: 12px; color: ${o.textSub}; margin-top: 2px; }
            .cw-configs-btn {
                padding: 10px; border-radius: 8px; border: 1px solid ${o.border};
                background: white; cursor: pointer; font-weight: 500; font-family: inherit;
                transition: all 0.2s;
            }
            .cw-configs-btn:hover { background: #f1f3f4; border-color: #bdc1c6; }

            /* --- PROFILE CARD PREMIUM --- */
            .cw-profile-card {
                background: ${o.surface}; border-radius: 12px; padding: 20px;
                border: 1px solid ${o.border}; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                display: flex; align-items: center; gap: 20px; margin-bottom: 8px;
            }
            .cw-profile-avatar {
                width: 80px; height: 80px; border-radius: 50%; object-fit: cover;
                border: 2px solid #e8f0fe; box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .cw-profile-info { display: flex; flex-direction: column; gap: 4px; flex: 1; }
            .cw-profile-ldap {
                font-size: 18px; font-weight: 700; color: ${o.text}; margin: 0;
                font-family: 'Google Sans', sans-serif;
            }
            .cw-profile-badges { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
            .cw-profile-badge {
                padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600;
                background: #f1f3f4; color: #5f6368; border: 1px solid #dadce0;
                text-transform: uppercase; letter-spacing: 0.3px;
            }
            .cw-profile-badge.overhead {
                background: #e8f0fe; color: #1a73e8; border-color: #d2e3fc;
            }

            /* --- SKELETON LOADING --- */
            .cw-skeleton {
                background: #eee;
                background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
                border-radius: 5px;
                background-size: 200% 100%;
                animation: 1.5s shine linear infinite;
            }
            .cw-skeleton-avatar { width: 80px; height: 80px; border-radius: 50%; }
            .cw-skeleton-text { height: 14px; width: 120px; margin-bottom: 8px; }
            .cw-skeleton-title { height: 22px; width: 100px; margin-bottom: 12px; }
            .cw-skeleton-badge { width: 60px; height: 22px; border-radius: 6px; }

            @keyframes shine {
                to { background-position-x: -200%; }
            }

            /* --- TOGGLE SWITCH --- */
            /* O checkbox nativo continua no DOM (checked/foco/teclado de gra\xE7a),
               s\xF3 o visual \xE9 trocado - \xFAnico controle de OS "cru" que sobrava
               no popup inteiro, destoando do resto do design system. */
            .cw-toggle-switch { position: relative; display: inline-block; width: 40px; height: 22px; flex-shrink: 0; }
            .cw-toggle-switch input {
                position: absolute; inset: 0; width: 100%; height: 100%; margin: 0;
                opacity: 0; cursor: pointer; z-index: 1;
            }
            .cw-toggle-track {
                position: absolute; inset: 0; background: ${o.border};
                border-radius: 100px; transition: background-color 0.2s ease; pointer-events: none;
            }
            .cw-toggle-track::before {
                content: ''; position: absolute; top: 2px; left: 2px; width: 18px; height: 18px;
                background: #fff; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .cw-toggle-switch input:checked + .cw-toggle-track { background: ${o.primary}; }
            .cw-toggle-switch input:checked + .cw-toggle-track::before { transform: translateX(18px); }
            .cw-toggle-switch input:focus-visible + .cw-toggle-track { outline: 2px solid ${o.primary}; outline-offset: 2px; }
            @media (prefers-reduced-motion: reduce) {
                .cw-toggle-track, .cw-toggle-track::before { transition: none !important; }
            }
        `,document.head.appendChild(M)}let i=document.createElement("div");i.id="configs-popup",i.classList.add("cw-module-window"),Object.assign(i.style,ft,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let r={popup:i},s=rt(i,e("title"),t,e("headerDesc"),r,()=>U());i.appendChild(s);let l=s.querySelector("span"),p=document.createElement("div");p.className="cw-configs-container",i.appendChild(p);let c=document.createElement("div");c.className="cw-profile-card",c.id="cw-user-profile-section",c.style.display="none",p.appendChild(c);let m;function u(M,Z){if(m={ldap:M,profile:Z},!Z){c.innerHTML=`
                <div class="cw-profile-avatar" style="background: #e8eaed; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #5f6368; font-weight: bold;">
                    ${M.charAt(0).toUpperCase()}
                </div>
                <div class="cw-profile-info">
                    <h2 class="cw-profile-ldap">@${M}</h2>
                    <div class="cw-profile-badges">
                        <span class="cw-profile-badge">${e("consultant")}</span>
                    </div>
                    <div style="font-size: 12px; color: ${o.textSub}; margin-top: 4px;">
                        ${e("profileNotFound")}
                    </div>
                </div>
            `;return}c.innerHTML=`
        <img src="https://moma-teams-photos.corp.google.com/photos/${M}?sz=600&type=PLUS"
             class="cw-profile-avatar" alt="User Photo"
             onerror="this.style.display='none'">
        <div class="cw-profile-info">
            <h2 class="cw-profile-ldap">@${Z.ldap}</h2>
            <div class="cw-profile-badges">
                <span class="cw-profile-badge">${Z.roleCategory||"N/A"}</span>
                <span class="cw-profile-badge">${Z.segment||"N/A"}</span>
                <span class="cw-profile-badge">${Z.defaultLanguage||"N/A"}</span>
                ${Z.isOverhead?`<span class="cw-profile-badge overhead">${e("overheadBadge")}</span>`:""}
            </div>
            <div style="font-size: 12px; color: ${o.textSub}; margin-top: 4px;">
                ${Z.role||""}
            </div>
        </div>
    `}async function h(){c.style.display="flex",c.innerHTML=`
            <div class="cw-skeleton cw-skeleton-avatar"></div>
            <div class="cw-profile-info">
                <div class="cw-skeleton cw-skeleton-title"></div>
                <div class="cw-profile-badges">
                    <div class="cw-skeleton cw-skeleton-badge"></div>
                    <div class="cw-skeleton cw-skeleton-badge"></div>
                    <div class="cw-skeleton cw-skeleton-badge"></div>
                </div>
                <div class="cw-skeleton cw-skeleton-text" style="margin-top: 8px;"></div>
            </div>
        `,(async()=>{try{it()||await _o();let M=it(),Z=M?M.split("@")[0]:"user",de=await Xa(Z);u(Z,de)}catch(M){console.warn("Erro ao renderizar perfil:",M),c.style.display="none"}})()}h();let L=document.createElement("div");if(L.className="cw-configs-section",L.innerHTML=`
        <div class="cw-configs-section-title js-lang-section-title"></div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label js-lang-label"></div>
                    <div class="cw-configs-desc js-lang-desc"></div>
                </div>
                <div class="cw-lang-toggle" id="cw-config-lang-toggle" role="group">
                    <button type="button" data-lang="pt">PT</button>
                    <button type="button" data-lang="es">ES</button>
                    <button type="button" data-lang="en">EN</button>
                </div>
            </div>
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label js-outlang-label"></div>
                    <div class="cw-configs-desc js-outlang-desc"></div>
                </div>
                <div class="cw-lang-toggle" id="cw-config-outlang-toggle" role="group">
                    <button type="button" data-lang="pt">PT</button>
                    <button type="button" data-lang="es">ES</button>
                    <button type="button" data-lang="en">EN</button>
                </div>
            </div>
        </div>
    `,!document.getElementById("cw-lang-toggle-styles")){let M=document.createElement("style");M.id="cw-lang-toggle-styles",M.innerHTML=`
            .cw-lang-toggle { display: flex; border: 1px solid ${o.border}; border-radius: 8px; overflow: hidden; flex-shrink: 0; }
            .cw-lang-toggle button {
                border: none; background: white; padding: 8px 14px; font-size: 12px; font-weight: 700;
                cursor: pointer; color: ${o.textSub}; font-family: inherit; transition: all 0.2s;
            }
            .cw-lang-toggle button:not(:last-child) { border-right: 1px solid ${o.border}; }
            .cw-lang-toggle button.active { background: ${o.primary}; color: #fff; }
            .cw-lang-toggle button:hover:not(.active) { background: #f1f3f4; }
        `,document.head.appendChild(M)}let S=L.querySelector("#cw-config-lang-toggle"),C=L.querySelector("#cw-config-outlang-toggle");function D(){S.querySelectorAll("button").forEach(M=>{M.classList.toggle("active",M.dataset.lang===ge())}),C.querySelectorAll("button").forEach(M=>{M.classList.toggle("active",M.dataset.lang===Et())})}D(),S.querySelectorAll("button").forEach(M=>{M.onclick=()=>{Eo(M.dataset.lang),w.playClick()}}),C.querySelectorAll("button").forEach(M=>{M.onclick=()=>{ri(M.dataset.lang),D(),w.playClick()}}),p.appendChild(L);let G=ld(e,o);p.appendChild(G);let F=cd(e,o);p.appendChild(F);let R=gd();p.appendChild(R);let le=document.createElement("div");le.className="cw-configs-section",le.innerHTML=`
        <div class="cw-configs-section-title js-sound-section-title"></div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label js-sound-label"></div>
                    <div class="cw-configs-desc js-sound-desc"></div>
                </div>
                <label class="cw-toggle-switch">
                    <input type="checkbox" id="cw-config-sound-toggle" ${w.isMuted()?"":"checked"}>
                    <span class="cw-toggle-track"></span>
                </label>
            </div>
        </div>
    `;let te=le.querySelector("#cw-config-sound-toggle");te.onchange=M=>{w.setMuted(!M.target.checked),M.target.checked&&w.playClick()},p.appendChild(le);let ee=document.createElement("div");ee.className="cw-configs-section",ee.innerHTML=`
        <div class="cw-configs-section-title js-support-section-title"></div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn js-docs-link" href="${vn}" target="_blank" rel="noopener noreferrer"></a>
                <a class="cw-configs-btn js-support-link" href="${Qa}" target="_blank" rel="noopener noreferrer"></a>
            </div>
        </div>
    `,p.appendChild(ee);let $=Ya(),A=document.createElement("div");A.className="cw-configs-section",A.innerHTML=`
        <div class="cw-configs-section-title js-diag-section-title"></div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label js-diag-label"></div>
                    <div class="cw-configs-desc js-diag-desc"></div>
                </div>
                <div class="cw-env-chip ${$.isDev?"is-dev":"is-prod"}"></div>
            </div>
        </div>
    `,A.querySelector(".cw-env-chip").textContent=`${$.isDev?"DEV":"PROD"} \xB7 \u2026${$.fingerprint}`,p.appendChild(A);let y=document.createElement("style");y.innerHTML=`
        .cw-env-chip {
            font-family: 'Roboto Mono', ui-monospace, monospace;
            font-size: 11px; font-weight: 700; letter-spacing: 0.4px;
            padding: 5px 10px; border-radius: 100px; white-space: nowrap;
            border: 1px solid transparent;
        }
        .cw-env-chip.is-prod {
            background: #E6F4EA; color: #137333; border-color: #CEEAD6;
        }
        .cw-env-chip.is-dev {
            background: #FEF7E0; color: #B06000; border-color: #FEEFC3;
        }
    `,A.appendChild(y);function z(){m&&u(m.ldap,m.profile),L.querySelector(".js-lang-section-title").textContent=e("langSectionTitle"),L.querySelector(".js-lang-label").textContent=e("langLabel"),L.querySelector(".js-lang-desc").textContent=e("langDesc"),L.querySelector(".js-outlang-label").textContent=e("outLangLabel"),L.querySelector(".js-outlang-desc").textContent=e("outLangDesc"),D(),G.applyTexts(),F.applyTexts(),R.applyTexts(),le.querySelector(".js-sound-section-title").textContent=e("soundSectionTitle"),le.querySelector(".js-sound-label").textContent=e("soundLabel"),le.querySelector(".js-sound-desc").textContent=e("soundDesc"),ee.querySelector(".js-support-section-title").textContent=e("supportSectionTitle"),ee.querySelector(".js-docs-link").textContent=e("docsLink"),ee.querySelector(".js-support-link").textContent=e("reportBug"),A.querySelector(".js-diag-section-title").textContent=e("diagSectionTitle"),A.querySelector(".js-diag-label").textContent=e("diagLabel"),A.querySelector(".js-diag-desc").textContent=e("diagDesc"),l&&(l.textContent=e("title"));let M=i.querySelector(".cw-help-title");M&&(M.textContent=e("title"));let Z=i.querySelector(".cw-help-description");Z&&(Z.textContent=e("headerDesc"))}z(),je(z),va(D);function U(){a=!ht(i),ct(a,i,"cw-btn-configs"),a?(G.refresh(),F.refresh(),R.refresh(),Je(),w.playClick()):Qe()}return document.body.appendChild(i),U}var St={blue:"#1A73E8",red:"#D93025",yellow:"#F9AB00",green:"#1E8E3E",blueLight:"#E8F0FE",redLight:"#FCE8E6",yellowLight:"#FEF7E0",greenLight:"#E6F4EA",textPrimary:"#202124",textSecondary:"#5F6368",border:"#DADCE0",surface:"rgba(255, 255, 255, 0.8)",white:"#FFFFFF"};var Na="cubic-bezier(0.4, 0, 0.2, 1)",Bx=`all 0.3s ${Na}`,bd=()=>{if(document.getElementById("bau-form-global-styles"))return;let e=document.createElement("style");e.id="bau-form-global-styles",e.textContent=`
    /* --- 1. POSICIONAMENTO E ANCORAGEM --- */
    .bau-popup {
      /* 650px era o mais estreito dos m\xF3dulos principais (o Email Assistant \xE9
         850x650, a Personal Library 620x680) e este \xE9 o que carrega mais dado
         por tela: a vista de detalhes tinha 600px de conte\xFAdo abaixo da dobra.
         Altura fixa junto com a largura porque, sem ela, a janela pulava de
         466px (escolha do fluxo) para 810px (formul\xE1rio) a cada passo. */
      width: 900px;
      height: 720px;
      max-width: 95vw;
      max-height: 90vh;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: ${gt.MODULE_RESTING};
      
      background: #FFFFFF; 
      display: flex;
      flex-direction: column;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 12px 40px rgba(0,0,0,0.12);
      border: 1px solid #DADCE0;
      
      transform-origin: center center;
      animation: cw-genie-effect-in 0.4s ${Na};
      color: #202124;
    }

    .bau-view-container {
      flex: 1;
      position: relative;
      min-height: 400px;
      /* 'scroll' literal punha um segundo contexto de rolagem por cima do
         .bau-dashboard-content / .bau-details-content, que j\xE1 rolam sozinhos:
         rolar um n\xE3o movia o outro, e a janela de detalhes deslizava para fora
         do pr\xF3prio quadro. Quem rola aqui \xE9 o painel de dentro. */
      overflow: hidden;
    }

    .bau-view {
      display: none;
      flex-direction: column;
      height: 100%;
      animation: bauFadeIn 0.3s ease;
      position: relative;
      box-sizing: border-box;
      overflow: hidden; /* Garante que o conte\xFAdo n\xE3o vaze */
      /* Era 'margin-top: 18px', que somado a 'height: 100%' fazia a view
         ultrapassar o container em exatos 18px \u2014 invis\xEDvel enquanto o
         container rolava, e 18px decepados agora que ele n\xE3o rola.
         Como padding, o respiro \xE9 o mesmo e cabe dentro (box-sizing acima). */
      padding-top: 18px;
    }
    .bau-view.active { display: flex; }
    @keyframes bauFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    /* --- 3. ESTILOS GERAIS E CLASSES ADICIONAIS --- */
    .bau-dashboard-content {
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
      /* Nao rola: no mestre-detalhe quem rola sao os DOIS paineis, cada um no
         seu eixo. Uma rolagem so para os dois obrigaria a descer a lista para
         ler o fim do detalhe. */
      overflow: hidden;
      padding: 24px;
      box-sizing: border-box;

      scrollbar-width: thin;
      scrollbar-color: #DADCE0 transparent;
    }
    .bau-dashboard-content::-webkit-scrollbar {
      width: 6px;
    }
    .bau-dashboard-content::-webkit-scrollbar-track {
      background: transparent;
    }
    .bau-dashboard-content::-webkit-scrollbar-thumb {
      background-color: #DADCE0;
      border-radius: 4px;
      border: 2px solid #FFFFFF;
    }

    /* --- ACCORDION PARA CASOS ANTIGOS --- */
    .bau-accordion-container { 
        list-style: none;
        margin-top: 12px; 
    }
    .bau-accordion-toggle {
        width: 100%;
        background: transparent;
        border: none;
        border-radius: 12px;
        padding: 12px 20px;
        font-size: 13px;
        font-weight: 400;
        color: #5F6368;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: background-color 0.2s ease, color 0.2s ease;
        margin-bottom: 24px;
    }
    .bau-accordion-toggle:hover { background-color: #F1F3F4; color: #202124; }
    .bau-accordion-toggle svg {
        transition: transform 0.3s ease;
    }
    .bau-accordion-toggle.expanded svg {
        transform: rotate(180deg);
    }
    .bau-accordion-content {
        padding: 12px 0 0 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    /* --- DEMAIS ESTILOS --- */

    .bau-dashboard-metrics {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 24px;
      padding: 0 4px;
    }

    .bau-metrics-refresh-btn {
      background: transparent;
      border: none;
      color: #5F6368;
      border-radius: 12px;
      padding: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 400;
      transition: background-color 0.2s ease, color 0.2s ease;
      height: 40px;
    }
    .bau-metrics-refresh-btn:hover { background: #F1F3F4; color: #202124; }
    .bau-metrics-refresh-btn:focus-visible { outline: 2px solid ${St.blue}; outline-offset: 2px; }
    .bau-metrics-refresh-btn svg { width: 18px; height: 18px; }
    .bau-metrics-refresh-btn.spinning svg { animation: rotate 1s linear infinite; }

    @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    /* Tremor de erro. E bounce AMORTECIDO, e a metafora e "nao passa daqui":
       espacial (translateX), dois ciclos, amplitude caindo. Nunca em cor ou
       opacidade \u2014 overshoot ali vira piscada. */
    @keyframes bauShake {
      0%, 100% { transform: translateX(0); }
      20%      { transform: translateX(-6px); }
      40%      { transform: translateX(6px); }
      60%      { transform: translateX(-3px); }
      80%      { transform: translateX(3px); }
    }
    .bau-shake { animation: bauShake 300ms cubic-bezier(.36, .07, .19, .97); }

    /* --- ELASTICO, SO ONDE A ANALISE APROVOU -------------------------------
       Propriedades ESPACIAIS (scale, translate) podem passar do alvo e voltar;
       cor e opacidade nunca. Orcamento: no maximo um overshoot visivel por
       transicao \u2014 dois elasticos simultaneos se cancelam e a tela parece
       instavel em vez de viva. */

    /* O gesto mais clicado da tela: afunda no toque e volta com sobra, que e o
       que da sensacao de botao fisico. A curva vive na regra completa do FAB
       mais abaixo \u2014 declarar transition aqui perdia para ela na cascata. */
    .bau-dashboard-fab:active { transform: scale(0.94); }

    /* Minimo de proposito: 1.5% confirma "foi este" sem empurrar os vizinhos
       da lista. */
    @keyframes bauCardPick {
      0%   { transform: scale(1); }
      55%  { transform: scale(1.015); }
      100% { transform: scale(1); }
    }
    .bau-case-card.is-selected { animation: bauCardPick 200ms cubic-bezier(.34, 1.4, .64, 1); }

    /* Botoes de acao: afundam no toque, sem sobra na volta (sao pequenos e
       frequentes \u2014 sobra aqui vira tique). */
    .bau-mini-btn-input:active,
    .bau-md-copy:active,
    .bau-rescan-btn:active,
    .bau-case-edit-btn:active { transform: scale(0.92); }
    .bau-mini-btn-input, .bau-md-copy, .bau-rescan-btn, .bau-case-edit-btn {
      transition-property: transform, background-color, color, opacity;
      transition-duration: 120ms;
      transition-timing-function: ${Na};
    }

    /* Sem borda E sem caixa. A hierarquia que a pesquisa recomenda comeca por
       ESPACO EM BRANCO \u2014 so depois tom, so depois elevacao, e borda apenas se
       os tres falharem. Para tres numeros com rotulo, o espaco e o degrau
       tipografico (22 contra 12) ja bastam: tres caixas tonais identicas em
       fila sao o mesmo tell de "grade de cards" que a borda era.
       O separador vertical fino fica so entre elas, nao em volta. */
    .bau-metric-card {
      flex: 1;
      background: transparent;
      border: none;
      padding: 4px 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
      position: relative;
    }
    .bau-metric-card + .bau-metric-card { padding-left: 24px; box-shadow: inset 1px 0 0 #E8EAED; }
    .bau-metric-value {
      font-size: 22px;
      font-weight: 400;
      color: #202124;
      font-variant-numeric: tabular-nums;
      line-height: 1.2;
    }
    /* Sem uppercase e sem letter-spacing: o spec ja proibia, e e a assinatura
       visual de dashboard antigo. Degrau tipografico real faz o trabalho
       (22 contra 12), nao a caixa alta. */
    .bau-metric-label {
      font-size: 12px;
      font-weight: 400;
      color: #5F6368;
    }

    .bau-case-list { list-style: none; padding: 0; margin: 0; }

    .bau-case-list li {
      margin-bottom: 12px;
      position: relative;
      overflow: hidden;
    }

    /* Tom neutro, nao tingido por status. O que pesava era a SEGUNDA camada de
       cor: o ponto do selo ja diz o estado, e lavar o card inteiro na mesma cor
       repetia a informacao. Mas branco puro sobre fundo branco apaga o card
       como unidade \u2014 o degrau de ~3% e o minimo para ele existir sem moldura. */
    .bau-case-card {
      background: #F8F9FA;
      border: none;
      border-radius: 12px;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: default;
      position: relative;
      overflow: hidden;
    }

    .bau-case-card:hover {
      /* Sem transform no pr\xF3prio card: hit-box parado evita o flicker
         hover-liga/desliga perto da borda superior quando ele "sobe". A
         eleva\xE7\xE3o vem s\xF3 da sombra crescendo. */
      box-shadow: 0 1px 6px rgba(60,64,67,0.10);
      background: #F1F3F4;
      background: #F1F3F4;
    }

    /* Aura Status Overrides */

    .bau-case-main { display: flex; align-items: flex-start; gap: 12px; }
    .bau-case-icon { color: #5F6368; margin-top: 2px; }
    .bau-case-info { display: flex; flex-direction: column; gap: 4px; }
    .bau-case-header { display: flex; align-items: baseline; gap: 8px; }
    /* 500, nao 600. Peso alto em corpo pequeno e o que faz uma tela parecer
       painel administrativo de 2012; a hierarquia aqui vem do tamanho e da cor. */
    .bau-case-title { margin: 0; font-size: 15px; font-weight: 500; color: #202124; }
    .bau-case-date { font-size: 11px; color: #5F6368; }
    .bau-case-details { margin: 0; font-size: 12px; color: #5F6368; max-width: 400px;}

    /* O design-system PROIBE "pilula em maiusculas com status decorativo": o
       estado se diz em TEXTO NORMAL, com um ponto na cor semantica. A pilula de
       peso 700 era o item que mais datava a tela \u2014 e era violacao do proprio
       spec, nao so gosto. O ponto carrega a cor; o texto fica legivel. */
    .bau-case-status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 400;
      color: #5F6368;
      background: none;
      padding: 0;
      white-space: nowrap;
    }
    .bau-case-status-badge::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 100px;
      background: currentColor;
      flex-shrink: 0;
    }
    .bau-case-status-badge.status-yellow::before { background: #F9AB00; }
    .bau-case-status-badge.status-green::before { background: #1E8E3E; }
    .bau-case-status-badge.status-red::before { background: #D93025; }
    .bau-case-status-badge.status-gray::before { background: #9AA0A6; }
    /* Descarte pendente. Laranja, e nao o amarelo da criacao pendente: os dois
       esperam o TL, mas pedem o OPOSTO um do outro (abrir x fechar um caso), e
       compartilhar cor apagava a distincao justamente na lista onde os dois
       aparecem lado a lado. Nao e o vermelho do descarte JA feito: aqui ainda
       nao ha desfecho. */
    .bau-case-status-badge.status-orange::before { background: #E65100; }

    .bau-case-edit-btn {
      background: rgba(255,255,255,0.7);
      border: none;
      color: #5F6368;
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 400;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
      white-space: nowrap;
    }

    .bau-case-edit-btn:hover {
      background: rgba(26, 115, 232, 0.08);
      color: #1A73E8;
      border-color: #1A73E8;
    }

    .bau-case-edit-btn svg {
      width: 14px;
      height: 14px;
    }

    .bau-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      text-align: center;
      color: #5F6368;
      height: 100%;
    }
    .bau-empty-state svg { margin-bottom: 16px; opacity: 0.5; }
    .bau-empty-title { font-size: 16px; font-weight: 500; color: #202124; margin: 0 0 4px 0; }

    .bau-success-view {
        display: none;
    }

    .bau-success-view.active {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      text-align: center;
      height: 100%;
      background: #FFFFFF;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
    }

    .bau-success-content {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1;
        width: 100%;
    }

    .bau-success-view.active .bau-success-content::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 320px;
        height: 320px;
        transform: translate(-50%, -50%) scale(0.8);
        background: radial-gradient(circle, rgba(30, 142, 62, 0.25) 0%, rgba(26, 115, 232, 0.15) 45%, transparent 75%);
        filter: blur(45px);
        z-index: -1;
        opacity: 0;
        animation: bauAuraCombined 5s ${Na} 0.2s infinite;
    }

    @keyframes bauAuraCombined {
      0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
      20% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
      50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.6; }
      100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
    }

    @keyframes bau-success-pop {
      0% { transform: scale(0.4); opacity: 0; }
      75% { transform: scale(1.08); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }

    @keyframes bauCheckDraw {
        from { stroke-dashoffset: 35; }
        to { stroke-dashoffset: 0; }
    }

    @keyframes bauSlideUpFade {
        from { transform: translateY(15px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }

    @keyframes bauBtnShimmer {
        0% { transform: translateX(-150%) skewX(-15deg); }
        35%, 100% { transform: translateX(250%) skewX(-15deg); }
    }

    .bau-success-view.active .bau-success-icon {
        width: 88px;
        height: 88px;
        background: rgba(30, 142, 62, 0.12);
        backdrop-filter: blur(16px);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 24px;
        color: ${St.green};
        animation: bau-success-pop 0.7s var(--cw-ease-spring) forwards;
        box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.6), 0 12px 32px rgba(30, 142, 62, 0.2);
        border: 0.5px solid rgba(255, 255, 255, 0.25);
    }

    .bau-success-view.active .bau-success-icon svg {
        width: 44px;
        height: 44px;
    }

    .bau-success-view.active .bau-check-path {
        stroke-dasharray: 35;
        stroke-dashoffset: 35;
        animation: bauCheckDraw 0.55s ${Na} 0.75s forwards;
    }

    .bau-success-view.active .bau-success-title {
        font-size: 24px;
        font-weight: 500;
        color: #202124;
        margin: 0 0 8px 0;
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${Na} 0.85s forwards;
    }

    .bau-success-view.active .bau-success-subtitle {
        font-size: 15px;
        color: #5F6368;
        margin-bottom: 36px;
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${Na} 0.95s forwards;
    }

    .bau-success-view.active #bau-success-back-btn {
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${Na} 1.05s forwards;
        position: relative;
        overflow: hidden;
    }

    .bau-success-view.active #bau-success-back-btn::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        transform: translateX(-150%) skewX(-15deg);
        animation: bauBtnShimmer 2.5s ease-in-out 1.8s forwards;
    }
    
    /* STICKY FAB */
    .bau-dashboard-fab {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #1a73e8;
      color: #ffffff;
      border: none;
      border-radius: 100px;
      padding: 14px 24px;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      box-shadow: 0 6px 16px rgba(26,115,232,0.4);
      /* So o TRANSFORM leva a curva com sobra \u2014 cor e sombra sao efeito e
         precisam chegar sem ultrapassar. */
      transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                  transform 320ms cubic-bezier(.34, 1.56, .64, 1),
                  box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 10;
    }
    .bau-dashboard-fab:hover {
      background: #1557b0;
      box-shadow: 0 8px 24px rgba(26,115,232,0.5);
    }

    .bau-view-header { margin-bottom: 20px; padding: 0 24px; }
    .bau-content {
      overflow-y: auto;
      flex: 1;
      padding: 0 24px;
      box-sizing: border-box;
    }
    .bau-back-btn { background: transparent; border: none; color: #5F6368; font-size: 14px; display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 4px 0; }
    .bau-back-btn:hover { color: #202124; }

    .bau-progress-indicator { display: flex; justify-content: space-between; margin-bottom: 24px; position: relative; }
    .bau-progress-indicator::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 2px; background: #DADCE0; z-index: 1; transform: translateY(-50%); }
    .bau-progress-step { width: 28px; height: 28px; border-radius: 50%; background: #F1F3F4; border: none; color: #5F6368; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 500; position: relative; z-index: 2; transition: border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease; }
    .bau-progress-step.active { border-color: #1A73E8; background: #1A73E8; color: #FFFFFF; }
    .bau-progress-step.completed { border-color: #1E8E3E; background: #1E8E3E; color: #FFFFFF; }

    .bau-step {
      display: none;
      padding-bottom: 80px;
    }

    /* --- BRANCHING (STEP 0) --- */
    .bau-branching-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      padding: 10px 0;
    }

    .bau-branching-card {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      border: none;
      border-radius: 16px;
      padding: 32px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      cursor: pointer;
      transition: transform 0.4s var(--cw-ease-spring), border-color 0.4s var(--cw-ease-spring), box-shadow 0.4s var(--cw-ease-spring), background-color 0.4s var(--cw-ease-spring);
      position: relative;
      overflow: hidden;
    }

    .bau-branching-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(135deg, rgba(26, 115, 232, 0.05) 0%, rgba(161, 75, 255, 0.05) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .bau-branching-card:hover {
      /* Era o pior caso do arquivo: -8px + scale no pr\xF3prio card, maior
         chance de flicker de hit-box de todo o app. A eleva\xE7\xE3o continua
         n\xEDtida s\xF3 com sombra+borda; o "movimento" fica com o \xEDcone filho
         (:hover .bau-branching-icon, abaixo). */
      border-color: #1A73E8;
      box-shadow: 0 12px 32px rgba(26, 115, 232, 0.15);
      background: rgba(255, 255, 255, 0.9);
    }

    .bau-branching-card:hover::before {
      opacity: 1;
    }

    .bau-branching-icon {
      width: 56px;
      height: 56px;
      background: #F8F9FA;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      color: #1A73E8;
      transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
    }

    .bau-branching-card:hover .bau-branching-icon {
      background: #1A73E8;
      color: #FFFFFF;
      transform: rotate(5deg);
    }

    .bau-branching-title {
      font-size: 16px;
      font-weight: 500;
      color: #202124;
      margin-bottom: 8px;
    }

    .bau-branching-subtitle {
      font-size: 12px;
      color: #5F6368;
      line-height: 1.5;
    }
    .bau-step.active {
      display: block;
      animation: bauFadeIn 0.3s;
    }

    /* FORM INPUTS - GEMINI SYSTEM */
    .bau-card { background: #F8F9FA; border: none; border-radius: 12px; padding: 20px; margin-bottom: 20px; }

    .bau-highlight-panel {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      padding: 20px;
      background: linear-gradient(135deg, #F8F9FA 0%, #F1F3F4 100%);
      backdrop-filter: blur(12px);
      border-radius: 12px;
      border: none;
      margin-bottom: 24px;
      position: relative;
      overflow: hidden;
    }

    .bau-highlight-panel::before {
        content: '';
        position: absolute;
        top: -50%; left: -50%; width: 200%; height: 200%;
        background: radial-gradient(circle, rgba(26, 115, 232, 0.1) 0%, transparent 70%);
        animation: geminiPulse 8s infinite alternate;
    }

    .bau-highlight-panel.discard-theme::before {
        background: radial-gradient(circle, rgba(217, 48, 37, 0.12) 0%, transparent 70%);
    }

    @keyframes geminiPulse {
        0% { transform: translate(-10%, -10%) scale(1); }
        100% { transform: translate(10%, 10%) scale(1.1); }
    }

    .bau-highlight-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      z-index: 1;
      padding: 8px 12px;
      border-radius: 10px;
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      cursor: default;
    }

    .bau-highlight-item:hover {
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }

    .bau-highlight-label { font-size: 12px; color: #5F6368; }
    .bau-highlight-value { font-size: 15px; font-weight: 400; color: #202124; }

    /* Recaptura do contexto. Posicionado por cima da grade (o painel j\xE1 \xE9
       position: relative) para n\xE3o ocupar uma c\xE9lula e desalinhar os vitais. */
    .bau-rescan-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      border-radius: 50%;
      background: rgba(255,255,255,0.75);
      color: #5F6368;
      cursor: pointer;
      transition: color 0.2s ease, background-color 0.2s ease;
    }
    .bau-rescan-btn svg { width: 16px; height: 16px; }
    .bau-rescan-btn:hover { color: ${St.blue}; background: #FFFFFF; }
    .bau-rescan-btn:focus-visible { outline: 2px solid ${St.blue}; outline-offset: 2px; }
    .bau-rescan-btn.spinning { cursor: default; color: ${St.blue}; }
    .bau-rescan-btn.spinning svg { animation: rotate 1s linear infinite; }

    .bau-label { display: block; font-size: 13px; font-weight: 500; color: #202124; margin-top: 20px; margin-bottom: 8px; }
    
    /* Campo sobre tom, sem moldura cinza: mesma ordem de separacao do resto da
       tela. A borda aparece so no foco, onde ela TEM funcao. */
    .bau-input, .bau-select, .bau-textarea {
      width: 100%;
      background: #F1F3F4;
      border: none;
      border-radius: 8px;
      padding: 12px 16px;
      color: #202124;
      font-size: 14px;
      font-family: inherit;
      transition: background-color 0.2s ease, box-shadow 0.2s ease;
      box-sizing: border-box;
    }

    .bau-input:focus, .bau-select:focus, .bau-textarea:focus {
      background: #FFFFFF;
      outline: none;
      box-shadow: inset 0 0 0 2px ${St.blue};
    }

    /* --- CAMPO COM BOTAO ACOPLADO (busca do SE ID) ------------------------
       Estas tres regras existiam e EU as apaguei junto com o bloco do painel
       sobreposto, no commit do mestre-detalhe: a heuristica que achava o fim
       daquele bloco passou do ponto e levou o que vinha depois. O resultado e
       o que o Lucas viu \u2014 botao cru do navegador, fora do campo, "como se o
       CSS nao o atingisse". Voltam no registro novo, sem moldura. */
    .bau-input-group {
      display: flex;
      align-items: stretch;
      gap: 4px;
      width: 100%;
    }
    .bau-input-group > .bau-input { flex: 1; min-width: 0; }

    .bau-mini-btn-input {
      flex-shrink: 0;
      width: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      background: #F1F3F4;
      border: none;
      border-radius: 8px;
      color: #5F6368;
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease;
    }
    .bau-mini-btn-input svg { width: 18px; height: 18px; }
    .bau-mini-btn-input:focus-visible { outline: 2px solid ${St.blue}; outline-offset: 2px; }

    .bau-tasks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 16px;
      margin-top: 12px;
    }
    .bau-task-item {
      background: #F8F9FA;
      border: none;
      border-radius: 8px;
      padding: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
    }
    .bau-task-item:hover { background: #F1F3F4; border-color: #5F6368; }
    .bau-task-item.active { background: rgba(26, 115, 232, 0.1); border-color: #1A73E8; color: #1A73E8; }
    .bau-task-item input { display: none; }
    .bau-task-item span { font-size: 12px; font-weight: 500; line-height: 1.2; }

    .bau-availability-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
    .bau-field-hint { font-size: 11px; color: #5F6368; }

    /* Data e hora lado a lado. A hora \xE9 um <select> de 24h, n\xE3o um
       datetime-local: o formato daquele vem do locale do navegador e n\xE3o h\xE1
       como for\xE7ar 24h por CSS ou atributo (ADR-0010). */
    .bau-slot-row { display: grid; grid-template-columns: 1fr 120px; gap: 8px; }

    @media (max-width: 480px) {
      .bau-slot-row { grid-template-columns: 1fr; }
    }

    .bau-timezone-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid #E8EAED;
    }

    .bau-timezone-echo {
      font-size: 12px;
      color: #5F6368;
      line-height: 1.5;
      margin-top: 8px;
    }

    .bau-timezone-echo strong { color: #202124; }

    .bau-availability-disclaimer {
      margin-top: 16px;
      padding: 12px 16px;
      background: #FFF8E1;
      border: 1px solid #FFE082;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .bau-disclaimer-text {
      font-size: 12px;
      color: #795548;
      line-height: 1.5;
    }

    .bau-timezone-link {
      background: #FFFFFF;
      border: none;
      color: #1A73E8;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      align-self: flex-start;
    }

    .bau-timezone-link:hover {
      background: #F1F3F4;
      border-color: #1A73E8;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .bau-timezone-link svg {
      width: 14px;
      height: 14px;
    }

    /* BADGES */
    .bau-context-badges-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
    }
    .bau-context-badge {
      background: #F8F9FA;
      border: none;
      border-radius: 6px;
      padding: 4px 10px;
      display: flex;
      gap: 6px;
      font-size: 11px;
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      cursor: default;
    }

    .bau-context-badge:hover {
      transform: scale(1.08);
      background: rgba(26, 115, 232, 0.05);
      border-color: #1A73E8;
      backdrop-filter: blur(4px);
      box-shadow: 0 2px 8px rgba(26,115,232,0.1);
    }
    .bau-badge-label { color: #5F6368; }
    .bau-badge-value { color: #202124; font-weight: 500; }

    /* CONFIRMATION STEP 4 */
    .bau-confirmation-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 16px;
    }
    .bau-confirm-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 10px 14px;
      background: #F8F9FA;
      border-radius: 10px;
      border: none;
      transition: background-color 0.2s ease, border-color 0.2s ease;
      position: relative;
    }
    .bau-confirm-row:hover {
      background: #F1F3F4;
      border-color: #1A73E8;
    }
    .bau-confirm-row.full-width {
      grid-column: 1 / -1;
    }
    .bau-confirm-label {
      font-size: 10px;
      color: #1A73E8;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      font-weight: 500;
      margin-bottom: 2px;
    }
    .bau-confirm-value-input {
      font-family: inherit;
      font-size: 13px;
      color: #202124;
      line-height: 1.5;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 4px;
      padding: 4px 8px;
      margin-left: -8px;
      width: calc(100% + 16px);
      outline: none;
      transition: background-color 0.2s ease, border-color 0.2s ease;
      cursor: text;
      box-sizing: border-box;
    }
    .bau-confirm-row:hover .bau-confirm-value-input {
      background: #FFFFFF;
      border-color: #DADCE0;
    }
    .bau-confirm-value-input:focus {
      background: #FFFFFF;
      border-color: #1A73E8;
      box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
    }
    .bau-confirm-textarea {
      resize: vertical;
      min-height: 40px;
    }
    .bau-confirm-divider {
      grid-column: 1 / -1;
      height: 1px;
      background: linear-gradient(90deg, transparent, #DADCE0, transparent);
      margin: 12px 0;
    }

    .bau-footer { 
        position: absolute; 
        bottom: 0; 
        left: 0; 
        right: 0; 
        background: rgba(255,255,255,0.8);
        backdrop-filter: blur(10px);
        display: flex; 
        justify-content: flex-end; 
        gap: 12px; 
        padding: 16px 24px;
        border-top: 1px solid #DADCE0;
        z-index: 100;
    }

    .bau-btn-primary, .bau-btn-submit {
      background: #1a73e8;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 10px 24px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .bau-btn-submit { width: 100%; justify-content: center; box-shadow: 0 4px 12px rgba(26,115,232,0.3); }
    .bau-btn-primary:hover, .bau-btn-submit:hover { background: #1557b0; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(26,115,232,0.4); }

    .bau-btn-secondary {
      background: transparent;
      border: none;
      color: #5F6368;
      border-radius: 8px;
      padding: 10px 24px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    }
    .bau-btn-secondary:hover { background: #F1F3F4; color: #202124; border-color: #5F6368; }

    .bau-shimmer {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent);
      animation: shimmer 1.5s infinite;
    }
    @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }

    .bau-skeleton-card { height: 80px; background: #F1F3F4; border-radius: 12px; position: relative; overflow: hidden; margin-bottom: 12px; }
    .bau-skeleton-metric { height: 60px; background: #F1F3F4; border-radius: 12px; flex: 1; position: relative; overflow: hidden; }

    .bau-error-text { color: #D93025 !important; }
    .bau-data-error-hint { font-size: 10px; color: #D93025; margin-top: 4px; font-weight: 500; }
    .bau-pulse-attention { animation: pulseGlow 2s infinite; }
    @keyframes pulseGlow { 0% { box-shadow: 0 0 0 0 rgba(217, 48, 37, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(217, 48, 37, 0); } 100% { box-shadow: 0 0 0 0 rgba(217, 48, 37, 0); } }

    /* --- MESTRE-DETALHE ---------------------------------------------------
       Lista e detalhe lado a lado. Substitui o painel sobreposto: nao ha mais
       nada absoluto por cima de nada, entao offset, z-index e rolagem dupla
       deixam de ser possiveis. */
    /* O detalhe e um TOGGLE: sem caso escolhido a coluna nao existe, e a lista
       ocupa a largura toda. Um painel vazio permanente e area morta \u2014 pior, le
       como parte quebrada da tela.
       A abertura anima a COLUNA (grid-template-columns e o gap), que e
       propriedade espacial: por isso pode ter uma sobra minima no fim. A
       opacidade do conteudo acompanha SEM sobra, porque e efeito \u2014 overshoot em
       opacidade vira piscada. Ver a analise de elastico no PLAN. */
    .bau-md {
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 0fr);
      gap: 0;
      /* Curva DESACELERANTE, sem sobra. grid-template-columns e propriedade de
         LAYOUT: passar do alvo faz o texto refluir na largura errada e refluir
         de novo na certa, duas vezes em 260ms. Isso nao le como mola, le como
         tremor \u2014 foi medido em 49px (10,9%) de sobra, contra os 3% que a regra
         previa. Sobra em layout nunca compensa; o carater do movimento fica por
         conta do deslize do conteudo, que e transform e nao reflui nada. */
      transition: grid-template-columns 260ms cubic-bezier(.2, 0, 0, 1),
                  gap 260ms cubic-bezier(.2, 0, 0, 1);
    }
    .bau-md.is-open {
      grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
      gap: 16px;
    }

    .bau-md-list,
    .bau-md-detail {
      min-width: 0;
      min-height: 0;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #DADCE0 transparent;
    }
    .bau-md-list::-webkit-scrollbar,
    .bau-md-detail::-webkit-scrollbar { width: 6px; }
    .bau-md-list::-webkit-scrollbar-thumb,
    .bau-md-detail::-webkit-scrollbar-thumb { background-color: #DADCE0; border-radius: 4px; }

    /* O FAB flutua sobre AS DUAS colunas (esta ancorado no canto da janela, nao
       da lista). Este respiro e o que garante que o ultimo card, o acordeao e a
       ultima linha do detalhe alcancem o fim da rolagem sem ficar embaixo dele. */
    .bau-md-list,
    .bau-md-detail { padding-bottom: 88px; }

    /* Empilhar so vale na coluna ESTREITA (~380px) do detalhe aberto: em linha
       unica ali o titulo sobrava com 145px e quebrava em tres linhas. Com o
       detalhe fechado a lista tem 850px e o layout em linha e o certo \u2014 senao
       as acoes ficam isoladas no canto direito, com um vao no meio. */
    .bau-md.is-open .bau-md-list .bau-case-card { flex-direction: column; align-items: stretch; gap: 12px; }
    .bau-md.is-open .bau-md-list .bau-case-header { flex-wrap: wrap; gap: 4px 8px; }
    .bau-md.is-open .bau-md-list .bau-case-title { flex: 1 1 100%; }
    /* Fora do mestre (largura cheia) segue empilhado a direita, como era. */
    .bau-case-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
    .bau-md.is-open .bau-md-list .bau-case-actions { flex-direction: row; align-items: center; justify-content: flex-end; }

    /* Zona de leitura: recuada (tonal, sem sombra), como manda o design-system
       para "material de referencia, o que a pessoa le". A sombra fica para o
       que a pessoa leva embora \u2014 um elevado por tela, que aqui e o FAB. */
    .bau-md-detail {
      min-width: 0;
      background: #F8F9FA;
      border: none;
      border-radius: 12px;
      padding: 0;
      opacity: 0;
      /* Fechado o painel tem largura zero: sem isto o conteudo vazaria para
         fora da coluna enquanto ela encolhe. */
      overflow: hidden;
      transition: opacity 180ms ease, padding 260ms cubic-bezier(.2, 0, 0, 1);
    }
    .bau-md.is-open .bau-md-detail {
      opacity: 1;
      padding: 16px;
      overflow-y: auto;
      /* O conteudo entra deslizando 8px da direita. E transform: nao reflui,
         entao e o unico lugar desta transicao onde sobra seria segura \u2014 mas
         aqui ela tambem sai. O painel abre a cada clique de caso, e o proprio
         estudo dizia "espacial e frequente: muito bounce enjoa rapido". O que
         da carater e a COREOGRAFIA (a moldura abre, o conteudo entra 60ms
         depois), nao a sobra. */
      animation: bauDetailIn 260ms cubic-bezier(.2, 0, 0, 1) 60ms both;
    }
    @keyframes bauDetailIn {
      from { transform: translateX(8px); }
      to   { transform: translateX(0); }
    }

    .bau-md-head { margin-bottom: 16px; }
    .bau-md-title {
      margin: 0 0 8px 0;
      font-size: 18px;
      font-weight: 500;
      color: #202124;
      line-height: 1.3;
    }
    .bau-md-head-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .bau-md-date {
      font-size: 12px;
      color: #5F6368;
      font-variant-numeric: tabular-nums;
    }

    /* Um contentor por unidade de informacao: o briefing e UMA caixa, nao uma
       caixa por campo. Hierarquia por tipografia e hairline, como o spec pede. */
    .bau-md-briefing,
    .bau-md-data { display: flex; flex-direction: column; }
    .bau-md-briefing { margin-bottom: 16px; }

    .bau-md-line {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 0 8px;
      padding: 8px 0;
      border-bottom: 1px solid #E8EAED;
      align-items: start;
    }
    /* Separador nao fica pendurado: o ultimo item nao leva hairline. */
    .bau-md-line.is-last { border-bottom: none; }

    /* Degrau tipografico real (12 contra 15), nao dois pixels de diferenca. */
    .bau-md-label {
      grid-column: 1 / -1;
      font-size: 12px;
      color: #5F6368;
      margin-bottom: 2px;
    }
    .bau-md-value {
      grid-column: 1;
      font-size: 15px;
      color: #202124;
      word-break: break-word;
      line-height: 1.45;
    }
    .bau-md-value.is-mono { font-variant-numeric: tabular-nums; }

    /* O botao de copiar significa UMA coisa: "isto vai para o outro sistema".
       So existe na zona de dados, e so aparece no hover/foco da linha. */
    .bau-md-copy {
      grid-column: 2;
      grid-row: 2;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: #5F6368;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.2s ease, color 0.2s ease, background-color 0.2s ease;
    }
    .bau-md-copy svg { width: 16px; height: 16px; }
    .bau-md-line:hover .bau-md-copy,
    .bau-md-copy:focus-visible { opacity: 1; }
    .bau-md-copy:hover { background: #E8F0FE; color: ${St.blue}; }
    .bau-md-copy:focus-visible { outline: 2px solid ${St.blue}; outline-offset: 2px; }
    .bau-md-copy.is-done { opacity: 1; color: ${St.green}; }

    /* Card selecionado na lista: sem isso o agente perde de vista qual caso o
       painel da direita esta mostrando assim que a lista rola. */
    /* Acento numa aresta, nao moldura em volta: diz "e este" sem desenhar mais
       uma caixa. */
    .bau-case-card.is-selected {
      background: #E8F0FE;
      box-shadow: inset 3px 0 0 ${St.blue};
    }

    /* Abaixo de 900px a janela encolhe (max-width: 95vw) e duas colunas viram
       duas colunas espremidas. Empilha: o detalhe vai para baixo da lista. */
    @media (max-width: 900px) {
      .bau-md { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1fr) 0fr;
                transition: grid-template-rows 260ms cubic-bezier(.2, 0, 0, 1), gap 260ms ease; }
      .bau-md.is-open { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1fr) minmax(0, 1fr); }
    }

    /* --- LOADING OVERLAY --- */
    .bau-form-loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(8px);
      z-index: 1000;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      animation: bauFadeIn 0.3s ease;
    }

    .bau-form-loading-overlay.active {
      display: flex;
    }

    .bau-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(26, 115, 232, 0.1);
      border-top-color: #1A73E8;
      border-radius: 50%;
      animation: rotate 0.8s linear infinite;
      margin-bottom: 12px;
    }

    .bau-loading-text {
      font-size: 14px;
      font-weight: 500;
      color: #1A73E8;
      letter-spacing: 0.3px;
    }

    .bau-mini-btn-input:hover { background: #E8F0FE; color: ${St.blue}; }

    @media (prefers-reduced-motion: reduce) {
      /* A abertura do detalhe continua acontecendo, mas sem a sobra da curva e
         sem o deslize: sumir/aparecer num quadro tambem desorienta. */
      .bau-md { transition-timing-function: linear; }
      .bau-md.is-open .bau-md-detail { animation: none; }

      /* Todo overshoot cai; o que sobra e transicao linear de mesma duracao. */
      .bau-shake,
      .bau-case-card.is-selected { animation: none !important; }
      .bau-dashboard-fab { transition-timing-function: linear !important; }
      .bau-dashboard-fab:active,
      .bau-mini-btn-input:active,
      .bau-md-copy:active,
      .bau-rescan-btn:active,
      .bau-case-edit-btn:active { transform: none !important; }

      /* Auras/pulsos puramente decorativos - infinitos, sem fun\xE7\xE3o de status.
         Spinners (.bau-spinner, .bau-metrics-refresh-btn.spinning svg) e o
         .bau-shimmer de skeleton ficam de fora: carregam estado de "carregando"
         real, mesmo padr\xE3o adotado no cwLibSpin da Biblioteca Pessoal. */
      .bau-success-view.active .bau-success-content::before,
      .bau-highlight-panel::before,
      .bau-pulse-attention {
        animation: none !important;
      }

      /* Sequ\xEAncia de sucesso (ao submeter um caso) simplificada pra fade puro -
         mesmo tratamento dado \xE0 splash screen em utils.js. */
      .bau-success-view.active .bau-success-icon,
      .bau-success-view.active .bau-success-title,
      .bau-success-view.active .bau-success-subtitle,
      .bau-success-view.active #bau-success-back-btn {
        animation-name: bauFadeIn !important;
        transform: none !important;
      }
      .bau-success-view.active #bau-success-back-btn::after {
        animation: none !important;
      }

      .bau-case-card:hover,
      .bau-dashboard-fab:hover,
      .bau-branching-card:hover,
      .bau-branching-card:hover .bau-branching-icon,
      .bau-highlight-item:hover,
      .bau-btn-primary:hover, .bau-btn-submit:hover,
      .bau-details-close-btn:hover,
      .bau-details-close-btn:active,
      .bau-copy-btn:active {
        transform: none !important;
      }
    }
  `,document.head.appendChild(e)};function vd(){return Object.values(Ze).map(e=>String(e?.name||"").trim()).filter(Boolean)}var hd=[{value:"PT-BR",text:"Portugu\xEAs (PT-BR)"},{value:"ES",text:"Espanhol (ES)"},{value:"EN",text:"Ingl\xEAs (EN)"}],fa={steps:[{id:0,title:"Selecione o tipo de atendimento",isBranching:!0},{id:1,title:"Contexto e Valida\xE7\xE3o",fields:[{id:"advName",name:"advName",label:"Nome do Anunciante",type:"text",placeholder:"Nome do Anunciante",required:!0,isSmart:!0},{id:"advLastName",name:"advLastName",label:"Sobrenome do Anunciante",type:"text",placeholder:"Sobrenome do Anunciante",required:!1,isSmart:!0},{id:"advPhone",name:"advPhone",label:"Telefone do Anunciante",type:"text",placeholder:"+55 11 90000-0000",required:!1,isSmart:!0},{id:"advEmail",name:"advEmail",label:"Email do Anunciante",type:"text",placeholder:"email@exemplo.com",required:!0,isSmart:!0,validation:{regex:"^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",error:"Formato de email inv\xE1lido"}},{id:"cid",name:"cid",label:"CID",type:"text",placeholder:"000-000-0000",required:!0,isSmart:!0,tooltip:"Use o formato 000-000-0000 ou 10 d\xEDgitos",validation:{regex:"^(\\d{3}-\\d{3}-\\d{4}|\\d{10})$",error:"Formato de CID incorreto"}},{id:"amName",name:"amName",label:"Account Manager (AM)",type:"text",placeholder:"am@google.com",required:!0,isSmart:!0,validation:{regex:"^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",error:"Informe o e-mail do AM (ex.: am@google.com)"}},{id:"website",name:"website",label:"Website",type:"text",placeholder:"https://www.exemplo.com",required:!0,isSmart:!0},{id:"seId",name:"seId",label:"Speakeasy ID (SE ID)",type:"text-with-button",placeholder:"Speakeasy ID",required:!1,isSmart:!0,button:{id:"bau-top-se-search",icon:"wand",title:"Buscar ID automaticamente"}},{id:"language",name:"language",label:"Idioma do Atendimento",type:"select",required:!0,tooltip:"Vem do seu segmento na planilha People. Troque s\xF3 quando este caso fugir da regra.",options:hd}]},{id:2,title:"Tasks",fields:[{id:"reason",name:"reason",label:"O que deve ser feito em BAU",type:"textarea",placeholder:"Descreva as a\xE7\xF5es esperadas...",required:!0,style:{minHeight:"80px"}},{id:"taskType",name:"taskType",label:"Tasks para BAU (Selecione 1 ou mais)",type:"checkbox-grid",required:!0,tooltip:"Selecione os tipos de implementa\xE7\xE3o t\xE9cnica"}]},{id:3,title:"Justificativa e Agendamento",fields:[{id:"nonImplementationReason",name:"nonImplementationReason",label:"Motivo da N\xE3o Implementa\xE7\xE3o (Justificativa BAU)",type:"select",required:!0,options:[{value:"",text:"Selecione um motivo..."},{value:"Tempo da consultoria esgotado",text:"Tempo da consultoria esgotado"},{value:"Solicita\xE7\xE3o de reagendamento pelo anunciante",text:"Solicita\xE7\xE3o de reagendamento pelo anunciante"},{value:"Falta de acessos ou backup do site",text:"Falta de acessos ou backup do site"},{value:"Anunciante indispon\xEDvel ou n\xE3o preparado",text:"Anunciante indispon\xEDvel ou n\xE3o preparado"},{value:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)",text:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"},{value:"Solicita\xE7\xE3o de tarefas (tasks) adicionais",text:"Solicita\xE7\xE3o de tarefas (tasks) adicionais"},{value:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)",text:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"},{value:"Retorno de contato ap\xF3s prazo de 14 dias expirado",text:"Retorno de contato ap\xF3s prazo de 14 dias expirado"}]},{id:"description",i18nKey:"description_justificativa",name:"description",label:"Justificativa / Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva detalhadamente o que precisa ser feito...",required:!0},{id:"availability",name:"availability",label:"Disponibilidade (m\xEDnimo 1 op\xE7\xE3o)",type:"datetime-group",required:!0,fields:[{name:"availability_1",label:"Op\xE7\xE3o 1 (Prioridade)",required:!0},{name:"availability_2",label:"Op\xE7\xE3o 2 (Opcional)",required:!1},{name:"availability_3",label:"Op\xE7\xE3o 3 (Opcional)",required:!1}]},{id:"suggestDiscard",name:"suggestDiscard",label:"O caso deve ser descartado pelo TL?",type:"select",required:!1,options:[{value:"N\xE3o",text:"N\xE3o"},{value:"Sim",text:"Sim"}]}]},{id:4,title:"Confirma\xE7\xE3o",isConfirmation:!0},{id:5,title:"Solicitar Descarte",fields:[{id:"caseId",name:"caseId",label:"Case ID",type:"text",placeholder:"Case ID",required:!0,isSmart:!0},{id:"language",i18nKey:"language_descarte",name:"language",label:"Idioma do Atendimento",type:"select",required:!0,options:hd},{id:"seId",i18nKey:"seId_descarte",name:"seId",label:"Speakeasy ID (SE ID)",type:"text-with-button",placeholder:"Speakeasy ID",required:!0,isSmart:!0,button:{id:"bau-discard-se-search",icon:"wand",title:"Buscar ID automaticamente"}},{id:"description",i18nKey:"description_descarte",name:"description",label:"Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva o motivo do descarte...",required:!0},{id:"discardReason",name:"reason",label:"Motivo do Descarte",type:"select",required:!0,groups:[{label:"Live Appointments",options:[{value:"Caso Filho gerado no atendimento",text:"Caso Filho gerado no atendimento"},{value:"3\xAA Tentativa de contato sem sucesso",text:"3\xAA Tentativa de contato sem sucesso"}]},{label:"Live Meet",options:[{value:"Apenas o AM presente",text:"Apenas o AM presente"},{value:"Estouro de tempo para conclus\xE3o",text:"Estouro de tempo para conclus\xE3o"},{value:"Gera\xE7\xE3o de caso BAU (Reagendamento)",text:"Gera\xE7\xE3o de caso BAU (Reagendamento)"}]}]}]}]};var lg={advName:{label:"Nombre del Anunciante",placeholder:"Nombre del Anunciante"},advLastName:{label:"Apellido del Anunciante",placeholder:"Apellido del Anunciante"},advPhone:{label:"Tel\xE9fono del Anunciante",placeholder:"+55 11 90000-0000"},advEmail:{label:"Email del Anunciante",placeholder:"email@ejemplo.com",error:"Formato de correo inv\xE1lido"},cid:{label:"CID",placeholder:"000-000-0000",tooltip:"Usa el formato 000-000-0000 o 10 d\xEDgitos",error:"Formato de CID incorrecto"},amName:{label:"Account Manager (AM)",placeholder:"am@google.com",error:"Informa el correo del AM (ej.: am@google.com)"},website:{label:"Website",placeholder:"https://www.ejemplo.com"},seId:{label:"Speakeasy ID (SE ID)",placeholder:"Speakeasy ID",buttonTitle:"Buscar ID autom\xE1ticamente"},seId_descarte:{label:"Speakeasy ID (SE ID)",placeholder:"Speakeasy ID",buttonTitle:"Buscar ID autom\xE1ticamente"},reason:{label:"Qu\xE9 debe hacerse en BAU",placeholder:"Describe las acciones esperadas..."},taskType:{label:"Tareas para BAU (Selecciona 1 o m\xE1s)",tooltip:"Selecciona los tipos de implementaci\xF3n t\xE9cnica"},nonImplementationReason:{label:"Motivo de la No Implementaci\xF3n (Justificaci\xF3n BAU)"},description_justificativa:{label:"Justificaci\xF3n / Descripci\xF3n",placeholder:"Describe detalladamente qu\xE9 se necesita hacer..."},availability:{label:"Disponibilidad (m\xEDnimo 1 opci\xF3n)"},availability_1:{label:"Opci\xF3n 1 (Prioridad)"},availability_2:{label:"Opci\xF3n 2 (Opcional)"},availability_3:{label:"Opci\xF3n 3 (Opcional)"},suggestDiscard:{label:"\xBFEl caso debe ser descartado por el TL?"},caseId:{label:"Case ID",placeholder:"Case ID"},language:{label:"Idioma de la Atenci\xF3n",tooltip:"Viene de tu segmento en la hoja People. C\xE1mbialo solo cuando este caso se salga de la regla."},language_descarte:{label:"Idioma de la Atenci\xF3n"},description_descarte:{label:"Descripci\xF3n",placeholder:"Describe el motivo del descarte..."},discardReason:{label:"Motivo del Descarte"}},cg={advName:{label:"Advertiser Name",placeholder:"Advertiser Name"},advLastName:{label:"Advertiser Last Name",placeholder:"Advertiser Last Name"},advPhone:{label:"Advertiser Phone",placeholder:"+55 11 90000-0000"},advEmail:{label:"Advertiser Email",placeholder:"email@example.com",error:"Invalid email format"},cid:{label:"CID",placeholder:"000-000-0000",tooltip:"Use the format 000-000-0000 or 10 digits",error:"Incorrect CID format"},amName:{label:"Account Manager (AM)",placeholder:"am@google.com",error:"Enter the AM's email (e.g., am@google.com)"},website:{label:"Website",placeholder:"https://www.example.com"},seId:{label:"Speakeasy ID (SE ID)",placeholder:"Speakeasy ID",buttonTitle:"Look up ID automatically"},seId_descarte:{label:"Speakeasy ID (SE ID)",placeholder:"Speakeasy ID",buttonTitle:"Look up ID automatically"},reason:{label:"What needs to be done in BAU",placeholder:"Describe the expected actions..."},taskType:{label:"Tasks for BAU (Select 1 or more)",tooltip:"Select the types of technical implementation"},nonImplementationReason:{label:"Reason for Non-Implementation (BAU Justification)"},description_justificativa:{label:"Justification / Description",placeholder:"Describe in detail what needs to be done..."},availability:{label:"Availability (at least 1 option)"},availability_1:{label:"Option 1 (Priority)"},availability_2:{label:"Option 2 (Optional)"},availability_3:{label:"Option 3 (Optional)"},suggestDiscard:{label:"Should the case be discarded by the TL?"},caseId:{label:"Case ID",placeholder:"Case ID"},language:{label:"Support Language",tooltip:"Comes from your segment in the People sheet. Change it only when this case is an exception to the rule."},language_descarte:{label:"Support Language"},description_descarte:{label:"Description",placeholder:"Describe the reason for the discard..."},discardReason:{label:"Discard Reason"}},dg={"Selecione um motivo...":"Selecciona un motivo...","Tempo da consultoria esgotado":"Tiempo de la consultor\xEDa agotado","Solicita\xE7\xE3o de reagendamento pelo anunciante":"Solicitud de reprogramaci\xF3n por parte del anunciante","Falta de acessos ou backup do site":"Falta de accesos o copia de seguridad del sitio","Anunciante indispon\xEDvel ou n\xE3o preparado":"Anunciante no disponible o no preparado","Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)":"Implementaci\xF3n parcial (no todas las tareas completadas)","Solicita\xE7\xE3o de tarefas (tasks) adicionais":"Solicitud de tareas adicionales","Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)":"Necesidad de nuevos cambios (fase de seguimiento)","Retorno de contato ap\xF3s prazo de 14 dias expirado":"Retorno de contacto despu\xE9s de vencido el plazo de 14 d\xEDas","Caso Filho gerado no atendimento":"Caso Hijo generado en la atenci\xF3n","3\xAA Tentativa de contato sem sucesso":"3.\xBA intento de contacto sin \xE9xito","Apenas o AM presente":"Solo el AM presente","Estouro de tempo para conclus\xE3o":"Tiempo excedido para la conclusi\xF3n","Gera\xE7\xE3o de caso BAU (Reagendamento)":"Generaci\xF3n de caso BAU (Reprogramaci\xF3n)",Sim:"S\xED",N\u00E3o:"No","Portugu\xEAs (PT-BR)":"Portugu\xE9s (PT-BR)","Espanhol (ES)":"Espa\xF1ol (ES)","Ingl\xEAs (EN)":"Ingl\xE9s (EN)"},pg={"Selecione um motivo...":"Select a reason...","Tempo da consultoria esgotado":"Consultation time ran out","Solicita\xE7\xE3o de reagendamento pelo anunciante":"Reschedule requested by the advertiser","Falta de acessos ou backup do site":"Missing access or site backup","Anunciante indispon\xEDvel ou n\xE3o preparado":"Advertiser unavailable or not prepared","Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)":"Partial implementation (not all tasks completed)","Solicita\xE7\xE3o de tarefas (tasks) adicionais":"Request for additional tasks","Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)":"Need for new changes (follow-up phase)","Retorno de contato ap\xF3s prazo de 14 dias expirado":"Contact follow-up after the 14-day deadline expired","Caso Filho gerado no atendimento":"Child Case generated during support","3\xAA Tentativa de contato sem sucesso":"3rd contact attempt unsuccessful","Apenas o AM presente":"Only the AM present","Estouro de tempo para conclus\xE3o":"Time overrun for completion","Gera\xE7\xE3o de caso BAU (Reagendamento)":"BAU case generation (Reschedule)",Sim:"Yes",N\u00E3o:"No","Portugu\xEAs (PT-BR)":"Portuguese (PT-BR)","Espanhol (ES)":"Spanish (ES)","Ingl\xEAs (EN)":"English (EN)"},ug={es:lg,en:cg},mg={es:dg,en:pg};function gg(e){return e?.i18nKey||e?.id||e?.name}function Lt(e,t){let a=e?.[t];return ug[ge()]?.[gg(e)]?.[t]??a}function Mt(e){return mg[ge()]?.[e]??e}var fg=(()=>{let e=[];for(let t=420;t<=1260;t+=30)e.push(String(Math.floor(t/60)).padStart(2,"0")+":"+String(t%60).padStart(2,"0"));return e})(),xd={pt:{statusPending:"Aguardando TL",statusApproved:"Aprovado / Criado",statusKeptActive:"Mantido ativo pelo TL",statusDiscarded:"Descartado pelo TL",statusCreationRejected:"Recusado pelo TL",statusCanceled:"Cancelado",statusDefault:"Pendente",timezoneWarningStrong:"Aten\xE7\xE3o:",timezoneWarningText:"Para clientes fora do fuso hor\xE1rio do Brasil, o hor\xE1rio inserido deve corresponder sempre ao hor\xE1rio local do cliente, e n\xE3o ao do agente.",checkTimezone:"Consultar Time Zone",timezoneModuleNotFound:"M\xF3dulo Time Zone n\xE3o encontrado.",headerTitle:"BAU Central",headerDesc:"Dashboard de Casos BAU",openBauCase:"Abrir caso para BAU",openBauCaseDesc:"Fluxo completo para implementa\xE7\xF5es t\xE9cnicas e suporte especializado.",requestDiscard:"Solicitar Descarte",requestDiscardDesc:"Fluxo simplificado para casos que n\xE3o requerem implementa\xE7\xE3o.",back:"Voltar",next:"Pr\xF3ximo",configuringEdit:"Configurando Edi\xE7\xE3o...",loadDashboardError:"Erro ao carregar Dashboard. Verifique sua conex\xE3o.",copiedToClipboard:"Copiado para a \xE1rea de transfer\xEAncia!",noAdditionalContext:"Nenhum contexto adicional fornecido pelo agente.",notCaptured:"N\xE3o capturado",none:"Nenhuma",language:"Idioma",lastName:"Sobrenome",phone:"Telefone",clientTimezone:"Fuso hor\xE1rio do cliente",echoEquivalence:(e,t,a)=>`<strong>${e}</strong> em ${t} equivale a <strong>${a}</strong> em Bras\xEDlia.`,echoSameZone:"O cliente est\xE1 no mesmo fuso que voc\xEA.",editPageWarning:"Aten\xE7\xE3o: Para editar as informa\xE7\xF5es, voc\xEA deve estar com a p\xE1gina deste Caso espec\xEDfico aberta no sistema. Caso contr\xE1rio, os dados capturados estar\xE3o incorretos.",onCorrectPage:"Estou na p\xE1gina correta",sending:"Enviando...",caseCreatedNoEmailConfirm:"Caso criado, mas n\xE3o conseguimos confirmar por email.",unknownError:"Erro desconhecido",newBauCase:"Novo Caso BAU",backToDashboard:"Voltar ao Dashboard",confirmDataBeforeSending:"Confirme os dados antes de enviar",submitToTl:"Enviar para o TL",saveChanges:"Salvar Altera\xE7\xF5es",editingCase:e=>`Editando Caso #${e}`,fillDetailsBelow:"Preencha os detalhes abaixo",caseSentSuccess:"Caso enviado com sucesso!",caseSentSuccessSub:"Sua solicita\xE7\xE3o foi recebida e ser\xE1 processada em breve.",genericErrorTitle:"Ops! Algo deu errado",genericErrorSub:"N\xE3o conseguimos carregar seus casos BAU no momento.",tryAgain:"Tentar Novamente",notInformed:"N\xE3o informado",reasonTooltip:"O que deve ser feito em BAU",reasonPrefix:"Motivo:",metricAwaitingTl:"Aguardando TL",caseDetailsTitle:"Detalhes do Caso",copy:"Copiar",advertiser:"Anunciante",status:"Status",cidLabel:"CID",caseIdLabel:"Case ID",speakeasyId:"Speakeasy ID",advertiserEmail:"Email do Anunciante",site:"Site",timezone:"Timezone",responsibleAm:"AM Respons\xE1vel",salesProgram:"Programa de Vendas",bauReason:"Motivo BAU",requestedTasks:"Tasks solicitadas",justification:"Justificativa",detailedDescription:"Descri\xE7\xE3o detalhada",availability:"Disponibilidade",urgent:"Urgente",undefinedName:"Nome indefinido",customerIdTooltip:"Customer ID do Anunciante",cidTooltip:"CID do Anunciante (Formato: 000-000-0000)",incompleteData:"Dados Incompletos",invalidCid:"CID Inv\xE1lido",contactSupport:"Contate o Suporte",editRequest:"Editar Solicita\xE7\xE3o",edit:"Editar",refresh:"Atualizar",noRecentCases:"Nenhum caso recente",casesWillAppear:"Seus casos BAU aparecer\xE3o aqui",createdApproved:"Criados / Aprovados",refreshDashboard:"Atualizar Dashboard",statusPendingDiscard:"Descarte em avalia\xE7\xE3o",copyFieldAria:e=>`Copiar ${e} para a \xE1rea de transfer\xEAncia`,metricAwaitingDiscard:"Descarte em avalia\xE7\xE3o",rescanTitle:"Recapturar os dados desta tela",rescanDone:"Dados recapturados da tela atual.",errorPrefix:e=>`Erro: ${e}`,selectAtLeastOne:e=>`Erro: Selecione pelo menos uma op\xE7\xE3o para "${e}".`,fieldRequiredDouble:e=>`Erro: O campo "${e}" \xE9 obrigat\xF3rio.`,fieldRequiredSingle:e=>`Erro: O campo '${e}' \xE9 obrigat\xF3rio.`,whatMustBeDone:"O que deve ser feito",editTasksHint:"Para editar as tasks, volte ao Passo 2",editScheduleHint:"Para editar o agendamento, volte ao Passo 3",bauJustification:"Justificativa BAU",description:"Descri\xE7\xE3o",availabilityPriority:"Disponibilidade (Prioridade)",suggestDiscardQuestion:"O caso deve ser descartado pelo TL?",editingCaseHash:e=>`Voc\xEA est\xE1 editando o caso #${e}`,editingDiscardHash:e=>`Voc\xEA est\xE1 editando o descarte do caso #${e}`,discardReason:"Motivo do Descarte",discardDescription:"Descri\xE7\xE3o do Descarte",notInformedPlaceholder:"N\xE3o informado",caseUpdatedSuccess:"Caso atualizado com sucesso!",caseDiscardSentSuccess:"Caso enviado para descarte com sucesso!"},es:{statusPending:"Esperando al TL",statusApproved:"Aprobado / Creado",statusKeptActive:"Mantenido activo por el TL",statusDiscarded:"Descartado por el TL",statusCreationRejected:"Rechazado por el TL",statusCanceled:"Cancelado",statusDefault:"Pendiente",timezoneWarningStrong:"Atenci\xF3n:",timezoneWarningText:"Para clientes fuera del huso horario de Brasil, el horario ingresado siempre debe corresponder al horario local del cliente, no al del agente.",checkTimezone:"Consultar Time Zone",timezoneModuleNotFound:"M\xF3dulo Time Zone no encontrado.",headerTitle:"BAU Central",headerDesc:"Panel de Casos BAU",openBauCase:"Abrir caso para BAU",openBauCaseDesc:"Flujo completo para implementaciones t\xE9cnicas y soporte especializado.",requestDiscard:"Solicitar Descarte",requestDiscardDesc:"Flujo simplificado para casos que no requieren implementaci\xF3n.",back:"Volver",next:"Siguiente",configuringEdit:"Configurando Edici\xF3n...",loadDashboardError:"Error al cargar el Panel. Verifica tu conexi\xF3n.",copiedToClipboard:"\xA1Copiado al portapapeles!",noAdditionalContext:"Ning\xFAn contexto adicional proporcionado por el agente.",notCaptured:"No capturado",none:"Ninguna",language:"Idioma",lastName:"Apellido",phone:"Tel\xE9fono",clientTimezone:"Huso horario del cliente",echoEquivalence:(e,t,a)=>`<strong>${e}</strong> en ${t} equivale a <strong>${a}</strong> en Brasilia.`,echoSameZone:"El cliente est\xE1 en el mismo huso que t\xFA.",editPageWarning:"Atenci\xF3n: Para editar la informaci\xF3n, debes tener abierta en el sistema la p\xE1gina de este Caso espec\xEDfico. De lo contrario, los datos capturados estar\xE1n incorrectos.",onCorrectPage:"Estoy en la p\xE1gina correcta",sending:"Enviando...",caseCreatedNoEmailConfirm:"Caso creado, pero no pudimos confirmar por email.",unknownError:"Error desconocido",newBauCase:"Nuevo Caso BAU",backToDashboard:"Volver al Panel",confirmDataBeforeSending:"Confirma los datos antes de enviar",submitToTl:"Enviar al TL",saveChanges:"Guardar Cambios",editingCase:e=>`Editando Caso #${e}`,fillDetailsBelow:"Completa los detalles a continuaci\xF3n",caseSentSuccess:"\xA1Caso enviado con \xE9xito!",caseSentSuccessSub:"Tu solicitud fue recibida y ser\xE1 procesada en breve.",genericErrorTitle:"\xA1Ups! Algo sali\xF3 mal",genericErrorSub:"No pudimos cargar tus casos BAU en este momento.",tryAgain:"Intentar de Nuevo",notInformed:"No informado",reasonTooltip:"Qu\xE9 debe hacerse en BAU",reasonPrefix:"Motivo:",metricAwaitingTl:"Esperando al TL",caseDetailsTitle:"Detalles del Caso",copy:"Copiar",advertiser:"Anunciante",status:"Estado",cidLabel:"CID",caseIdLabel:"Case ID",speakeasyId:"Speakeasy ID",advertiserEmail:"Email del Anunciante",site:"Sitio",timezone:"Timezone",responsibleAm:"AM Responsable",salesProgram:"Programa de Ventas",bauReason:"Motivo BAU",requestedTasks:"Tareas solicitadas",justification:"Justificaci\xF3n",detailedDescription:"Descripci\xF3n detallada",availability:"Disponibilidad",urgent:"Urgente",undefinedName:"Nombre indefinido",customerIdTooltip:"Customer ID del Anunciante",cidTooltip:"CID del Anunciante (Formato: 000-000-0000)",incompleteData:"Datos Incompletos",invalidCid:"CID Inv\xE1lido",contactSupport:"Contacta al Soporte",editRequest:"Editar Solicitud",edit:"Editar",refresh:"Actualizar",noRecentCases:"Ning\xFAn caso reciente",casesWillAppear:"Tus casos BAU aparecer\xE1n aqu\xED",createdApproved:"Creados / Aprobados",refreshDashboard:"Actualizar Panel",statusPendingDiscard:"Descarte en evaluaci\xF3n",copyFieldAria:e=>`Copiar ${e} al portapapeles`,metricAwaitingDiscard:"Descarte en evaluaci\xF3n",rescanTitle:"Recapturar los datos de esta pantalla",rescanDone:"Datos recapturados de la pantalla actual.",errorPrefix:e=>`Error: ${e}`,selectAtLeastOne:e=>`Error: Selecciona al menos una opci\xF3n para "${e}".`,fieldRequiredDouble:e=>`Error: El campo "${e}" es obligatorio.`,fieldRequiredSingle:e=>`Error: El campo '${e}' es obligatorio.`,whatMustBeDone:"Qu\xE9 debe hacerse",editTasksHint:"Para editar las tareas, vuelve al Paso 2",editScheduleHint:"Para editar la programaci\xF3n, vuelve al Paso 3",bauJustification:"Justificaci\xF3n BAU",description:"Descripci\xF3n",availabilityPriority:"Disponibilidad (Prioridad)",suggestDiscardQuestion:"\xBFEl caso debe ser descartado por el TL?",editingCaseHash:e=>`Est\xE1s editando el caso #${e}`,editingDiscardHash:e=>`Est\xE1s editando el descarte del caso #${e}`,discardReason:"Motivo del Descarte",discardDescription:"Descripci\xF3n del Descarte",notInformedPlaceholder:"No informado",caseUpdatedSuccess:"\xA1Caso actualizado con \xE9xito!",caseDiscardSentSuccess:"\xA1Caso enviado a descarte con \xE9xito!"},en:{statusPending:"Awaiting TL",statusApproved:"Approved / Created",statusKeptActive:"Kept active by the TL",statusDiscarded:"Discarded by the TL",statusCreationRejected:"Rejected by the TL",statusCanceled:"Cancelled",statusDefault:"Pending",timezoneWarningStrong:"Important:",timezoneWarningText:"For customers outside Brazil's time zone, the time you enter must always match the customer's local time, not the agent's.",checkTimezone:"Check Time Zone",timezoneModuleNotFound:"Time Zone module not found.",headerTitle:"BAU Central",headerDesc:"BAU Case Dashboard",openBauCase:"Open a case for BAU",openBauCaseDesc:"Full flow for technical implementations and specialized support.",requestDiscard:"Request a Discard",requestDiscardDesc:"Simplified flow for cases that do not require implementation.",back:"Back",next:"Next",configuringEdit:"Setting up editing...",loadDashboardError:"Error loading the Dashboard. Check your connection.",copiedToClipboard:"Copied to the clipboard!",noAdditionalContext:"No additional context provided by the agent.",notCaptured:"Not captured",none:"None",language:"Language",lastName:"Last name",phone:"Phone",clientTimezone:"Customer time zone",echoEquivalence:(e,t,a)=>`<strong>${e}</strong> in ${t} is <strong>${a}</strong> in Bras\xEDlia.`,echoSameZone:"The customer is in the same time zone as you.",editPageWarning:"Important: to edit this information you must have this specific case's page open in the system. Otherwise the captured data will be incorrect.",onCorrectPage:"I am on the correct page",sending:"Sending...",caseCreatedNoEmailConfirm:"Case created, but we could not confirm it by email.",unknownError:"Unknown error",newBauCase:"New BAU Case",backToDashboard:"Back to the Dashboard",confirmDataBeforeSending:"Confirm the data before sending",submitToTl:"Send to the TL",saveChanges:"Save Changes",editingCase:e=>`Editing Case #${e}`,fillDetailsBelow:"Fill in the details below",caseSentSuccess:"Case sent successfully!",caseSentSuccessSub:"Your request has been received and will be processed shortly.",genericErrorTitle:"Oops! Something went wrong",genericErrorSub:"We could not load your BAU cases right now.",tryAgain:"Try Again",notInformed:"Not provided",reasonTooltip:"What must be done in BAU",reasonPrefix:"Reason:",metricAwaitingTl:"Awaiting TL",caseDetailsTitle:"Case Details",copy:"Copy",advertiser:"Advertiser",status:"Status",cidLabel:"CID",caseIdLabel:"Case ID",speakeasyId:"Speakeasy ID",advertiserEmail:"Advertiser Email",site:"Site",timezone:"Timezone",responsibleAm:"Responsible AM",salesProgram:"Sales Program",bauReason:"BAU Reason",requestedTasks:"Requested tasks",justification:"Justification",detailedDescription:"Detailed description",availability:"Availability",urgent:"Urgent",undefinedName:"Name undefined",customerIdTooltip:"Advertiser's Customer ID",cidTooltip:"Advertiser's CID (Format: 000-000-0000)",incompleteData:"Incomplete Data",invalidCid:"Invalid CID",contactSupport:"Contact Support",editRequest:"Edit Request",edit:"Edit",refresh:"Refresh",noRecentCases:"No recent cases",casesWillAppear:"Your BAU cases will appear here",createdApproved:"Created / Approved",refreshDashboard:"Refresh Dashboard",statusPendingDiscard:"Discard under review",copyFieldAria:e=>`Copy ${e} to the clipboard`,metricAwaitingDiscard:"Discard under review",rescanTitle:"Recapture the data on this screen",rescanDone:"Data recaptured from the current screen.",errorPrefix:e=>`Error: ${e}`,selectAtLeastOne:e=>`Error: select at least one option for "${e}".`,fieldRequiredDouble:e=>`Error: the field "${e}" is required.`,fieldRequiredSingle:e=>`Error: the field '${e}' is required.`,whatMustBeDone:"What must be done",editTasksHint:"To edit the tasks, go back to Step 2",editScheduleHint:"To edit the scheduling, go back to Step 3",bauJustification:"BAU Justification",description:"Description",availabilityPriority:"Availability (Priority)",suggestDiscardQuestion:"Should the case be discarded by the TL?",editingCaseHash:e=>`You are editing case #${e}`,editingDiscardHash:e=>`You are editing the discard for case #${e}`,discardReason:"Discard Reason",discardDescription:"Discard Description",notInformedPlaceholder:"Not provided",caseUpdatedSuccess:"Case updated successfully!",caseDiscardSentSuccess:"Case sent for discard successfully!"}};function B(e){let t=ge();return xd[t]?.[e]??xd.pt[e]}function Ad(e){let t=ge();return`${e.flag} ${jn(e,t)} \u2014 ${bo(e,t)}`}var nt={add:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',back:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',wand:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.41l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/></svg>',send:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',check:'<svg width="64" height="64" viewBox="0 0 24 24" fill="none"><path class="bau-check-path" d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',folder:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',empty:'<svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.44 2s2.75-.81 3.44-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z"/></svg>',refresh:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',expand:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>'};function wd(e,t){if(e==="CREATED"&&t==="KEPT_ACTIVE")return{text:B("statusKeptActive"),class:"status-green",aura:"status-green-aura"};if(e==="DISCARDED"&&t==="REJECTED_CREATION")return{text:B("statusCreationRejected"),class:"status-red",aura:"status-red-aura"};switch(e){case"PENDING_TL_CREATION":return{text:B("statusPending"),class:"status-yellow",aura:"status-yellow-aura"};case"PENDING_TL_DISCARD":return{text:B("statusPendingDiscard"),class:"status-orange",aura:"status-orange-aura"};case"CREATED":return{text:B("statusApproved"),class:"status-green",aura:"status-green-aura"};case"DISCARDED":return{text:B("statusDiscarded"),class:"status-red",aura:"status-red-aura"};case"CANCELED_BY_AGENT":return{text:B("statusCanceled"),class:"status-gray",aura:""};default:return{text:e||B("statusDefault"),class:"status-gray",aura:""}}}function bg(e,t,a){let o=document.createElement("label");return o.className="bau-task-item",o.classList.toggle("active",a),o.innerHTML=`<input type="checkbox" name="${t}" value="${e}"><span>${e}</span>`,o.querySelector("input").checked=a,o.addEventListener("click",n=>{n.preventDefault();let i=o.querySelector("input");i.checked=!i.checked,o.classList.toggle("active",i.checked),w.playClick()}),o}function vr(e,t=[]){let a=e.dataset.fieldName||"taskType",o=new Set(Array.from(e.querySelectorAll("input:checked")).map(i=>i.value));t.map(i=>String(i||"").trim()).filter(Boolean).forEach(i=>o.add(i));let n=vd();o.forEach(i=>{n.includes(i)||n.push(i)}),e.innerHTML="",n.forEach(i=>e.appendChild(bg(i,a,o.has(i))))}function yd(e,t=[]){e.querySelectorAll("input:checked").forEach(a=>{a.checked=!1}),vr(e,t)}function Sd(e){let t=document.createElement("div");if(t.className="bau-dynamic-input",t.id=`wrapper-${e.id}`,e.label){let o=document.createElement("label");o.className="bau-label",o.textContent=Lt(e,"label"),e.tooltip&&o.setAttribute("data-tooltip",Lt(e,"tooltip")),t.appendChild(o)}let a;switch(e.type){case"textarea":a=document.createElement("textarea"),a.style.minHeight="80px",t.appendChild(a);break;case"select":a=document.createElement("select"),e.groups?e.groups.forEach(l=>{let p=document.createElement("optgroup");p.label=l.label,l.options.forEach(c=>{let m=document.createElement("option");m.value=c.value,m.textContent=Mt(c.text),p.appendChild(m)}),a.appendChild(p)}):e.options&&e.options.forEach(l=>{let p=document.createElement("option");p.value=l.value,p.textContent=Mt(l.text),a.appendChild(p)}),t.appendChild(a);break;case"checkbox-grid":return a=document.createElement("div"),a.className="bau-tasks-grid",a.dataset.fieldName=e.name,vr(a),t.appendChild(a),t;case"datetime-group":a=document.createElement("div"),a.className="bau-availability-container";let o=document.createElement("div");o.className="bau-timezone-row",o.innerHTML=`
                <span class="bau-field-hint">${B("clientTimezone")}</span>
                <select name="availabilityTimezone" class="bau-select">
                    ${ka.map(l=>`<option value="${l.zone}">${Ad(l)}</option>`).join("")}
                </select>
            `,a.appendChild(o),e.fields.forEach(l=>{let p=document.createElement("div");p.className="bau-availability-field",p.innerHTML=`
                    <span class="bau-field-hint">${Lt(l,"label")}</span>
                    <div class="bau-slot-row">
                        <input type="date" name="${l.name}_date" class="bau-input" ${l.required?"required":""}>
                        <select name="${l.name}_time" class="bau-select">
                            <option value="">--:--</option>
                            ${fg.map(c=>`<option value="${c}">${c}</option>`).join("")}
                        </select>
                    </div>
                `,a.appendChild(p)});let n=document.createElement("div");n.className="bau-timezone-echo",n.id="bau-availability-echo",a.appendChild(n);let i=document.createElement("div");return i.className="bau-availability-disclaimer",i.innerHTML=`
                <div class="bau-disclaimer-text">
                    <strong>${B("timezoneWarningStrong")}</strong> ${B("timezoneWarningText")}
                </div>
                <button type="button" class="bau-timezone-link" id="bau-open-timezone">
                    ${nt.refresh}
                    ${B("checkTimezone")}
                </button>
            `,i.querySelector("#bau-open-timezone").onclick=()=>{let l=document.getElementById("cw-btn-timezone");l?(l.click(),w.playClick()):(w.playError(),ne(B("timezoneModuleNotFound"),{error:!0}))},t.appendChild(a),t.appendChild(i),t;case"text-with-button":let r=document.createElement("div");r.className="bau-input-group",a=document.createElement("input"),a.type="text";let s=document.createElement("button");s.type="button",s.id=e.button.id,s.className="bau-mini-btn-input",s.title=Lt(e,"buttonTitle")||e.button.title,s.innerHTML=nt[e.button.icon]||"",r.appendChild(a),r.appendChild(s),t.appendChild(r);break;default:a=document.createElement("input"),a.type="text",t.appendChild(a)}return a&&e.type!=="checkbox-grid"&&e.type!=="datetime-group"&&(a.id=`bau-form-${e.id}`,a.name=e.name,a.className=e.type==="select"?"bau-select":e.type==="textarea"?"bau-textarea":"bau-input",e.placeholder&&(a.placeholder=Lt(e,"placeholder")),e.required&&(a.required=!0)),t}function Cd(e){return Lt(e,"error")||e?.validation?.error||""}function Ed(){bd();let e=!1,t="dashboard",a=null,o=0,n="BAU",i=!1,r=null,s=fa.steps.length,l=document.createElement("div");l.id="bau-form-popup",l.className="bau-popup cw-module-window",l.style.display="none";let p=B("headerTitle"),c=B("headerDesc"),m=rt(l,p,"v2.2.0",c,{},()=>b());l.appendChild(m);let u=document.createElement("div");u.className="bau-view-container",l.appendChild(u);let h=document.createElement("div");h.id="bau-view-dashboard",h.className="bau-view active",h.innerHTML=`
        <div class="bau-dashboard-content">
            <div class="bau-dashboard-metrics" id="bau-dashboard-metrics"></div>
            <div class="bau-md">
                <div class="bau-md-list">
                    <ul class="bau-case-list" id="bau-case-list-container"></ul>
                </div>
                <section class="bau-md-detail" id="bau-md-detail"
                         aria-live="polite" aria-label="${B("caseDetailsTitle")}"></section>
            </div>
        </div>
        <button class="bau-dashboard-fab" id="bau-new-case-btn">
            ${nt.add}
            <span class="js-bau-new-case">${B("newBauCase")}</span>
        </button>
    `,u.appendChild(h);let L=document.createElement("div");L.id="bau-view-form",L.className="bau-view";let S=document.createElement("div");S.className="bau-view-header",S.innerHTML=`
      <button class="bau-back-btn" id="bau-form-back-btn">
        ${nt.back}
        <span class="js-bau-back-dashboard">${B("backToDashboard")}</span>
      </button>
    `,L.appendChild(S);let C=document.createElement("div");C.className="bau-content",L.appendChild(C);let D=document.createElement("div");D.className="bau-form-loading-overlay",D.innerHTML=`
        <div class="bau-spinner"></div>
        <div class="bau-loading-text js-bau-configuring-edit">${B("configuringEdit")}</div>
    `,C.appendChild(D);let G=d=>{D.classList.toggle("active",d)},F=document.createElement("div");F.className="bau-progress-indicator",C.appendChild(F);let R=document.createElement("form");R.id="bau-escalation-form",R.noValidate=!0,C.appendChild(R),fa.steps.forEach(d=>{let N=document.createElement("div");if(N.className="bau-step"+(d.id===o?" active":""),N.id=`bau-step-${d.id}`,d.isBranching)N.innerHTML=`
                <div class="bau-branching-container">
                    <div class="bau-branching-card" id="bau-opt-full">
                        <div class="bau-branching-icon">${nt.add}</div>
                        <h3 class="bau-branching-title">${B("openBauCase")}</h3>
                        <p class="bau-branching-subtitle">${B("openBauCaseDesc")}</p>
                    </div>
                    <div class="bau-branching-card" id="bau-opt-discard">
                        <div class="bau-branching-icon">${nt.empty}</div>
                        <h3 class="bau-branching-title">${B("requestDiscard")}</h3>
                        <p class="bau-branching-subtitle">${B("requestDiscardDesc")}</p>
                    </div>
                </div>
            `,N.querySelector("#bau-opt-full").onclick=()=>{n="BAU",o=1,R.querySelectorAll(".bau-highlight-panel").forEach(_=>_.classList.remove("discard-theme")),pe(),w.playClick()},N.querySelector("#bau-opt-discard").onclick=()=>{n="DISCARD",o=5,R.querySelectorAll(".bau-highlight-panel").forEach(_=>_.classList.add("discard-theme")),pe(),w.playClick()};else if(d.isConfirmation)N.innerHTML=`
                <div class="bau-card">
                    <h3 class="bau-step-title">${B("confirmDataBeforeSending")}</h3>
                    <div id="bau-confirmation-details"></div>
                </div>
            `;else{let _=document.createElement("div");if(_.className="bau-card",d.id===1||d.id===5){_.innerHTML=`
                    <div class="bau-vital-highlights bau-highlight-panel"></div>
                    <div class="bau-dynamic-inputs-container"></div>
                    <div class="bau-all-data"></div>
                `;let g=_.querySelector(".bau-dynamic-inputs-container");d.fields.forEach(I=>{g.appendChild(Sd(I))});let x=_.querySelector("#wrapper-cid");if(x){let I=document.createElement("div");I.id="bau-cid-error",I.className="bau-cid-error-hint",I.style.display="none",I.textContent=Cd(d.fields.find(E=>E.id==="cid")),x.appendChild(I)}}else d.fields.forEach(g=>{_.appendChild(Sd(g))});N.appendChild(_)}R.appendChild(N)});let le=document.createElement("div");le.className="bau-footer";let te=document.createElement("button");te.type="button",te.id="bau-step-back-btn",te.className="bau-btn-secondary",te.textContent=B("back");let ee=document.createElement("button");ee.type="button",ee.id="bau-step-next-btn",ee.className="bau-btn-primary",ee.textContent=B("next");let $=document.createElement("button");$.type="submit",$.className="bau-btn-submit",$.innerHTML=`${nt.send} ${B("submitToTl")}`,$.style.display="none",le.appendChild(te),le.appendChild(ee),le.appendChild($),R.appendChild(le),u.appendChild(L);let A=document.createElement("div");A.id="bau-view-success",A.className="bau-view bau-success-view",A.innerHTML=`
        <div class="bau-success-content">
            <div class="bau-success-icon" style="color: ${St.green};">${nt.check}</div>
            <h2 class="bau-success-title js-bau-success-title">${B("caseSentSuccess")}</h2>
            <p class="bau-success-subtitle js-bau-success-sub">${B("caseSentSuccessSub")}</p>
            <button class="bau-btn-primary js-bau-success-back" id="bau-success-back-btn">${B("backToDashboard")}</button>
        </div>
    `,u.appendChild(A),document.body.appendChild(l),io(()=>{let d=R.querySelector(".bau-tasks-grid");d&&vr(d)});function y(d){t=d,l.querySelectorAll(".bau-view").forEach(I=>I.classList.remove("active"));let N=l.querySelector(`#bau-view-${d}`);N&&N.classList.add("active");let _=m.querySelector(".cw-module-header-title")||m.querySelector("h2"),g=m.querySelector(".cw-module-header-subtitle")||m.querySelector("p");_&&(d==="form"?_.textContent=i?B("editingCase")(r):B("newBauCase"):_.textContent=B("headerTitle")),g&&(g.textContent=B(d==="form"?"fillDetailsBelow":"headerDesc"));let x=R.querySelector(".bau-btn-submit");x&&(x.innerHTML=i?`${nt.send} ${B("saveChanges")}`:`${nt.send} ${B("submitToTl")}`)}function z(){let d=l.querySelector("#bau-case-list-container"),N=l.querySelector("#bau-dashboard-metrics");N&&(N.innerHTML=`
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
            `),d&&(d.innerHTML=Array(5).fill(0).map(()=>`
            <div class="bau-skeleton-card">
                <div class="bau-shimmer"></div>
            </div>
        `).join(""))}async function U(){let d=l.querySelector("#bau-case-list-container"),N=l.querySelector("#bau-dashboard-metrics");if(!(!d||!N)){z();try{let _=await Zr();if(!Array.isArray(_))throw new Error("API response is not a valid array");be(_)}catch(_){console.error("Critical Error loading BAU cases:",_),N&&(N.innerHTML=""),d.innerHTML=`
                <div class="bau-empty-state bau-error-state">
                    <div style="color: ${St.red}; margin-bottom: 16px;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    </div>
                    <h3 class="bau-empty-title">${B("genericErrorTitle")}</h3>
                    <p class="bau-empty-subtitle">${B("genericErrorSub")}</p>
                    <button class="bau-btn-secondary" id="bau-retry-btn" style="margin-top: 16px;">
                        ${B("tryAgain")}
                    </button>
                </div>
            `,l.querySelector("#bau-retry-btn")?.addEventListener("click",()=>U()),w.playError(),ne(B("loadDashboardError"),{error:!0})}}}function M(d){let N=l.querySelector("#bau-md-detail");if(!N||!d)return;let _=wd(d.status,d.processedAction),g=E=>E||"---",x=[{rotulo:B("cidLabel"),valor:d.cid,mono:!0},{rotulo:B("caseIdLabel"),valor:d.caseId,mono:!0},{rotulo:B("speakeasyId"),valor:d.seId,mono:!0},{rotulo:B("advertiserEmail"),valor:d.advEmail},{rotulo:B("phone"),valor:d.advPhone,mono:!0},{rotulo:B("site"),valor:d.site},{rotulo:B("responsibleAm"),valor:d.amName}],I=[{rotulo:B("bauReason"),valor:d.reason||B("notInformed")},{rotulo:B("requestedTasks"),valor:d.task||d.taskType||B("none")},{rotulo:B("justification"),valor:g(d.nonImplementationReason)},{rotulo:B("detailedDescription"),valor:g(d.description)},{rotulo:B("availability"),valor:qo(d.availability)},{rotulo:B("timezone"),valor:g(d.timezone)},{rotulo:B("language"),valor:g(d.language)},{rotulo:B("salesProgram"),valor:g(d.salesProgram)}];N.innerHTML=`
            <div class="bau-md-head">
                <h2 class="bau-md-title">${[d.advName,d.advLastName].filter(Boolean).join(" ")||B("undefinedName")}</h2>
                <div class="bau-md-head-meta">
                    <span class="bau-case-status-badge ${_.class}">${_.text}</span>
                    <span class="bau-md-date">${qo(d.date)}</span>
                </div>
            </div>

            <section class="bau-md-briefing" aria-label="${B("bauReason")}">
                ${I.map((E,W)=>`
                    <div class="bau-md-line${W===I.length-1?" is-last":""}">
                        <span class="bau-md-label">${E.rotulo}</span>
                        <span class="bau-md-value">${E.valor}</span>
                    </div>
                `).join("")}
            </section>

            <section class="bau-md-data" aria-label="${B("caseDetailsTitle")}">
                ${x.map((E,W)=>`
                    <div class="bau-md-line${W===x.length-1?" is-last":""}">
                        <span class="bau-md-label">${E.rotulo}</span>
                        <span class="bau-md-value${E.mono?" is-mono":""}">${g(E.valor)}</span>
                        ${E.valor?`
                            <button type="button" class="bau-md-copy"
                                    data-valor="${String(E.valor).replace(/"/g,"&quot;")}"
                                    aria-label="${B("copyFieldAria")(E.rotulo)}">
                                ${nt.wand}
                            </button>`:""}
                    </div>
                `).join("")}
            </section>
        `}function Z(d){if(!d)return"";let N=wd(d?.status,d?.processedAction),_=qo(d?.date),g="",x="",I=String(d?.availability||"").split("|")[0].trim();if(d?.status==="PENDING_TL_CREATION"&&I){let fe=new Date(I),Te=new Date;!isNaN(fe.getTime())&&(fe<=Te||fe-Te<36e5*2)&&(g=`<span class="bau-sla-badge">${B("urgent")}</span>`,x="bau-pulse-attention")}let E=d?.reason&&d.reason.trim()?d.reason:B("noAdditionalContext"),H=/^(\d{3}-\d{3}-\d{4}|\d{10})$/.test(d?.cid||""),ae=!d?.caseId||d.caseId==="N/A"||!H;return ae&&d?.status==="PENDING_TL_CREATION"&&(x="bau-pulse-attention"),`
            <li class="bau-case-card ${N.aura} ${x}" data-case-id="${d?.id||""}">
                <div class="bau-case-main">
                    <div class="bau-case-icon">${nt.folder}</div>
                    <div class="bau-case-info">
                        <div class="bau-case-header">
                            <h3 class="bau-case-title">${[d?.advName,d?.advLastName].filter(Boolean).join(" ")||B("undefinedName")}</h3>
                            ${g}
                            <span class="bau-case-date">${_}</span>
                        </div>
                        <p class="bau-case-details">
                            <span data-tooltip="${B("customerIdTooltip")}">Case: ${d?.caseId||"N/A"}</span> \u2022
                            <span data-tooltip="${B("cidTooltip")}" class="${H?"":"bau-error-text"}">CID: ${d?.cid||"N/A"}</span> \u2022
                            <span data-tooltip="${B("reasonTooltip")}">${B("reasonPrefix")} ${E}</span>
                        </p>
                        ${ae?`<div class="bau-data-error-hint">${!d?.caseId||d?.caseId==="N/A"?B("incompleteData"):B("invalidCid")} - ${B("contactSupport")}</div>`:""}
                    </div>
                </div>
                <div class="bau-case-actions">
                    <span class="bau-case-status-badge ${N.class}">${N.text}</span>
                    ${d?.status&&d.status.includes("PENDING")?`
                        <button class="bau-case-edit-btn" data-id="${d.id}" title="${B("editRequest")}">
                            ${nt.edit}
                            ${B("edit")}
                        </button>
                    `:""}
                </div>
            </li>
        `}let de=null;function ve(){de=null,l.querySelector(".bau-md")?.classList.remove("is-open"),l.querySelectorAll("#bau-case-list-container .bau-case-card").forEach(d=>{d.classList.remove("is-selected"),d.setAttribute("aria-expanded","false")})}function re(d,N){if(de===N?.id){ve(),w.playSwoosh();return}de=N?.id||null,l.querySelectorAll("#bau-case-list-container .bau-case-card").forEach(_=>{let g=_===d;_.classList.toggle("is-selected",g),_.setAttribute("aria-expanded",g?"true":"false")}),M(N),l.querySelector(".bau-md")?.classList.add("is-open"),w.playClick()}function be(d){let N=l.querySelector("#bau-case-list-container"),_=l.querySelector("#bau-dashboard-metrics");if(!N||!_)return;let g=Array.isArray(d)?d.filter(Boolean):[];if(g.length===0){_.innerHTML=`
                <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard">
                    ${nt.refresh}
                    ${B("refresh")}
                </button>
            `,N.innerHTML=`
                <div class="bau-empty-state">
                    ${nt.empty}
                    <h3 class="bau-empty-title">${B("noRecentCases")}</h3>
                    <p class="bau-empty-subtitle">${B("casesWillAppear")}</p>
                </div>
            `,l.querySelector("#bau-refresh-dashboard")?.addEventListener("click",()=>U());return}let x=g.filter(fe=>fe.status==="PENDING_TL_CREATION").length,I=g.filter(fe=>fe.status==="PENDING_TL_DISCARD").length,E=g.filter(fe=>fe.status==="CREATED").length;_.innerHTML=`
            <div class="bau-metric-card">
                <span class="bau-metric-value">${x}</span>
                <span class="bau-metric-label">${B("metricAwaitingTl")}</span>
            </div>
            <div class="bau-metric-card">
                <span class="bau-metric-value">${I}</span>
                <span class="bau-metric-label">${B("metricAwaitingDiscard")}</span>
            </div>
            <div class="bau-metric-card">
                <span class="bau-metric-value">${E}</span>
                <span class="bau-metric-label">${B("createdApproved")}</span>
            </div>
            <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard" title="${B("refreshDashboard")}">
                ${nt.refresh}
            </button>
        `;let W=_.querySelector("#bau-refresh-dashboard");W?.addEventListener("click",async()=>{W.classList.contains("spinning")||(W.classList.add("spinning"),w.playClick(),await U(),setTimeout(()=>W.classList.remove("spinning"),1e3))}),N.innerHTML="",ve();let H=g.slice(0,5),ae=g.slice(5);if(H.forEach(fe=>{let Te=Z(fe),Me=document.createElement("div");Me.innerHTML=Te;let Ee=Me.firstElementChild;Ee.addEventListener("click",Ge=>{Ge.target.closest(".bau-case-edit-btn")||re(Ee,fe)});let wt=Ee.querySelector(".bau-case-edit-btn");wt&&(wt.onclick=Ge=>{Ge.stopPropagation(),ce(fe)}),N.appendChild(Ee)}),ae.length>0){let fe=document.createElement("li");fe.className="bau-accordion-container";let Te=document.createElement("button");Te.className="bau-accordion-toggle",Te.innerHTML=`${nt.expand} <span>Mostrar ${ae.length} casos mais antigos</span>`;let Me=document.createElement("ul");Me.className="bau-case-list bau-accordion-content",Me.style.display="none",ae.forEach(Ee=>{let wt=Z(Ee),Ge=document.createElement("div");Ge.innerHTML=wt;let zt=Ge.firstElementChild;zt.addEventListener("click",yt=>{yt.target.closest(".bau-case-edit-btn")||re(zt,Ee)});let ea=zt.querySelector(".bau-case-edit-btn");ea&&(ea.onclick=yt=>{yt.stopPropagation(),ce(Ee)}),Me.appendChild(zt)}),Te.addEventListener("click",()=>{let Ee=Me.style.display==="none";Me.style.display=Ee?"block":"none",Te.classList.toggle("expanded",Ee),Te.querySelector("span").textContent=Ee?"Esconder casos mais antigos":`Mostrar ${ae.length} casos mais antigos`,w.playClick()}),fe.appendChild(Te),fe.appendChild(Me),N.appendChild(fe)}}function pe(){let d=n==="BAU"?[1,2,3,4]:[5,4];R.querySelectorAll(".bau-step").forEach(g=>{let x=parseInt(g.id.replace("bau-step-","")),I=x===o,E=d.includes(x)||x===0;g.classList.toggle("active",I),g.style.display=I?"block":"none",g.querySelectorAll("input, select, textarea").forEach(W=>{W.disabled=!E})});let N=o===0;if(F.style.display=N?"none":"flex",!N){F.innerHTML="";let g=n==="BAU"?[1,2,3,4]:[5,4];g.forEach((x,I)=>{let E=document.createElement("div"),W=x===o,H=g.indexOf(o),ae=I<H;E.className=`bau-progress-step ${W?"active":ae?"completed":""}`,E.textContent=I+1,F.appendChild(E)})}let _=o===4;te.style.display=o>0?"inline-block":"none",ee.style.display=!N&&!_?"inline-block":"none",$.style.display=_?"flex":"none",_&&X()}function he(d){let N=fa.steps.find(_=>_.id===d);if(!N||!N.fields||N.isConfirmation)return!0;for(let _ of N.fields){let g=R.querySelector(`#bau-step-${d} #wrapper-${_.id}`);if(!(g&&g.style.display==="none")&&_.validation){let x=R.querySelector(`#bau-step-${d} [name="${_.name}"]`);if(x&&x.offsetParent!==null&&x.value.trim())if(new RegExp(_.validation.regex).test(x.value.trim())){x.classList.remove("invalid-cid");let E=R.querySelector("#bau-cid-error");E&&(E.style.display="none")}else{console.warn(`Validation failed for field "${_.name}" in step ${d}: Regex mismatch.`),w.playError(),ne(B("errorPrefix")(Lt(_,"error")||_.validation.error),{error:!0}),x.classList.add("invalid-cid");let E=R.querySelector("#bau-cid-error");return E&&(E.style.display="flex"),!1}}}return!0}function T(d){za("erro"),d&&(d.classList.remove("bau-shake"),d.offsetWidth,d.classList.add("bau-shake"),d.addEventListener("animationend",()=>d.classList.remove("bau-shake"),{once:!0}),typeof d.focus=="function"&&d.focus({preventScroll:!1}))}function Y(d){if(!R.querySelector(`#bau-step-${d}`))return!1;let _=fa.steps.find(x=>x.id===d);if(!_||!_.fields||_.isConfirmation)return!0;let g=!0;for(let x of _.fields){let I=R.querySelector(`#bau-step-${d} #wrapper-${x.id}`);if(!(I&&I.style.display==="none")&&x.required){let E=!0,W="";if(x.type==="checkbox-grid")R.querySelector(`#bau-step-${d} input[name="${x.name}"]:checked`)||(W="No option selected in checkbox-grid",w.playError(),ne(B("selectAtLeastOne")(Lt(x,"label")),{error:!0}),E=!1);else if(x.type==="datetime-group"){let H=x.fields[0].name,ae=R.querySelector(`#bau-step-${d} input[name="${H}_date"]`),fe=R.querySelector(`#bau-step-${d} select[name="${H}_time"]`);if(!ae||ae.offsetParent===null)continue;(!ae.value.trim()||!fe||!fe.value.trim())&&(W="Datetime group first field is empty",w.playError(),T(ae),ne(B("fieldRequiredDouble")(Lt(x.fields[0],"label")),{error:!0}),E=!1)}else{let H=R.querySelector(`#bau-step-${d} [name="${x.name}"]`);if(!H||H.offsetParent===null)continue;H.value.trim()||(W="Field is empty",w.playError(),T(H),ne(B("fieldRequiredSingle")(Lt(x,"label")),{error:!0}),E=!1)}if(!E){console.warn(`Validation failed for required field "${x.name}" in step ${d}: ${W}`),g=!1;break}}}return g}ee.addEventListener("click",()=>{if(he(o)&&Y(o)){n==="BAU"?o++:o===5?o=4:o++,pe();let d=l.querySelector(".bau-content");d&&(d.scrollTop=0),w.playClick()}}),te.addEventListener("click",()=>{o>0&&(n==="BAU"?o--:o===4?o=5:o===5?o=0:o--,pe(),w.playClick())});async function se(){let d=await Ut()||{};a=d,R.querySelectorAll(".bau-vital-highlights").forEach(E=>{let W=[{label:"Anunciante",value:d.advName},{label:"CID",value:d.cid},{label:"Website",value:d.website||d.site},{label:"Case ID",value:d.caseId}];E.innerHTML=W.map(H=>{let ae=H.value&&H.value!=="N/A"&&H.value!=="undefined"&&H.value!=="null"?H.value:B("notCaptured");return`
                    <div class="bau-highlight-item">
                        <span class="bau-highlight-label">${H.label}</span>
                        <span class="bau-highlight-value">${ae}</span>
                    </div>
                `}).join("")+`
                <button type="button" class="bau-rescan-btn" title="${B("rescanTitle")}" aria-label="${B("rescanTitle")}">
                    ${nt.refresh}
                </button>
            `}),fa.steps.forEach(E=>{E.fields&&E.fields.forEach(W=>{if(W.isSmart){let H=d[W.id],ae=R.querySelector(`#bau-step-${E.id} [name="${W.name}"]`),fe=R.querySelector(`#bau-step-${E.id} #wrapper-${W.id}`);if(ae&&(ae.value=H&&H!=="N/A"?H:""),fe){let Te=H&&H!==""&&H!=="N/A"&&H!=="undefined"&&H!=="null";fe.style.display=Te?"none":"block"}}})});let _=cr(d.timezone)||Ta,g=R.querySelector('select[name="availabilityTimezone"]');g&&(g.value=_,ie());let x=d.userProfile?.defaultLanguage;x&&R.querySelectorAll('select[name="language"]').forEach(E=>{E.value=x}),R.querySelectorAll(".bau-all-data").forEach(E=>{let W=[{label:"Anunciante",value:d.advName},{label:"CID",value:d.cid},{label:"AM",value:d.amName},{label:"SE ID",value:d.seId},{label:"Site",value:d.website||d.site},{label:"Email",value:d.email},{label:"Timezone",value:d.timezone},{label:"Case ID",value:d.caseId},{label:"Programa",value:d.salesProgram},{label:"Idioma",value:d.language}];E.innerHTML=`
                <div class="bau-context-badges-grid">
                    ${W.filter(H=>H.value&&H.value!=="N/A"&&H.value!=="---"&&H.value!=="undefined"&&H.value!=="null").map(H=>`
                            <div class="bau-context-badge">
                                <span class="bau-badge-label">${H.label}:</span>
                                <span class="bau-badge-value">${H.value}</span>
                            </div>
                        `).join("")}
                </div>
            `})}l.addEventListener("keydown",d=>{d.key!=="Escape"||!de||(d.stopPropagation(),ve(),w.playSwoosh())}),l.addEventListener("click",async d=>{let N=d.target.closest(".bau-md-copy");if(!N)return;d.preventDefault();let _=N.getAttribute("data-valor")||"";if(_){try{await navigator.clipboard.writeText(_)}catch(g){console.warn("Falha ao copiar:",g),w.playError(),ne(B("genericErrorTitle"),{error:!0});return}N.classList.add("is-done"),N.innerHTML=nt.check||nt.wand,w.playClick(),za("confirma"),ne(B("copiedToClipboard")),setTimeout(()=>{N.classList.remove("is-done"),N.innerHTML=nt.wand},1500)}}),l.addEventListener("click",async d=>{let N=d.target.closest(".bau-rescan-btn");if(!(!N||N.classList.contains("spinning"))){d.preventDefault(),N.classList.add("spinning"),w.playClick();try{await se(),ne(B("rescanDone"))}catch(_){console.warn("Falha ao recapturar o contexto:",_),w.playError(),ne(B("genericErrorTitle"),{error:!0})}finally{l.querySelectorAll(".bau-rescan-btn.spinning").forEach(_=>_.classList.remove("spinning"))}}}),l.addEventListener("click",d=>{let N=d.target.closest(".bau-mini-btn-input");if(!N)return;let _=N.closest(".bau-input-group")?.querySelector('input[name="seId"]');_&&(d.preventDefault(),w.playClick(),no(_))});let V=l.querySelector("#bau-form-cid");V&&V.addEventListener("input",()=>he(1)),R.addEventListener("change",d=>{let N=d.target?.name||"";(N==="availabilityTimezone"||N.startsWith("availability_"))&&ie()});function O(d){let N=d.availabilityTimezone||Ta;return["availability_1","availability_2","availability_3"].map(_=>{let g=d[`${_}_date`],x=d[`${_}_time`];return!g||!x?"":lr(`${g}T${x}`,N)}).filter(Boolean)}function k(d){let N=d.availabilityTimezone||Ta,_=ka.find(I=>I.zone===N),g=O(d);return g.length===0?B("notInformedPlaceholder"):`${g.map(I=>{let[E,W]=I.split("T"),[H,ae,fe]=E.split("-");return`${fe}/${ae} ${W.slice(0,5)}`}).join("  \xB7  ")} \u2014 ${_?bo(_,ge()):N}`}function j(d,N){((I,E)=>{let W=d.querySelector(I);W&&(W.textContent=E)})(".bau-timezone-row .bau-field-hint",B("clientTimezone")),d.querySelectorAll('select[name="availabilityTimezone"] option').forEach(I=>{let E=ka.find(W=>W.zone===I.value);E&&(I.textContent=Ad(E))}),d.querySelectorAll(".bau-availability-field .bau-field-hint").forEach((I,E)=>{N.fields[E]&&(I.textContent=Lt(N.fields[E],"label"))});let g=d.querySelector(".bau-disclaimer-text");g&&(g.innerHTML=`<strong>${B("timezoneWarningStrong")}</strong> ${B("timezoneWarningText")}`);let x=d.querySelector("#bau-open-timezone");x&&(x.innerHTML=`${nt.refresh} ${B("checkTimezone")}`),ie()}function ie(){let d=R.querySelector("#bau-availability-echo");if(!d)return;let N=Object.fromEntries(new FormData(R).entries()),_=N.availabilityTimezone||Ta,g=N.availability_1_date,x=N.availability_1_time;if(!g||!x){d.innerHTML="";return}if(_===Ta){d.textContent=B("echoSameZone");return}let I=lr(`${g}T${x}`,_),E=new Date(I);if(isNaN(E.getTime())){d.innerHTML="";return}let W=new Intl.DateTimeFormat(Ma(),{timeZone:Ta,day:"2-digit",month:cn(),hour:"2-digit",minute:"2-digit",hour12:!1}).format(E),H=ka.find(ae=>ae.zone===_);d.innerHTML=B("echoEquivalence")(x,H?bo(H,ge()):_,W)}function P(d){return(fa.steps.flatMap(_=>_.fields||[]).find(_=>_.id==="language")?.options||[]).map(_=>`<option value="${_.value}" ${_.value===d?"selected":""}>${Mt(_.text)}</option>`).join("")}function X(){let d=new FormData(R),N=Object.fromEntries(d.entries()),_=l.querySelector("#bau-confirmation-details");if(_){if(n==="BAU"){let g=d.getAll("taskType"),x=g.length>0?g.join(", "):B("none");_.innerHTML=`
                ${i?`<div class="bau-highlight-panel" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${St.yellow}; background: rgba(255, 186, 0, 0.05); border-radius: 8px; font-weight: 500;">${B("editingCaseHash")(`<span style="color: ${St.yellow}">${r}</span>`)}</div>`:""}
                <div class="bau-confirmation-grid">
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Anunciante</span>
                        <input class="bau-confirm-value-input" data-field="advName" data-step="1" value="${N.advName||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${B("lastName")}</span>
                        <input class="bau-confirm-value-input" data-field="advLastName" data-step="1" value="${N.advLastName||""}" placeholder="${B("notInformedPlaceholder")}">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${B("advertiserEmail")}</span>
                        <input class="bau-confirm-value-input" data-field="advEmail" data-step="1" value="${N.advEmail||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${B("phone")}</span>
                        <input class="bau-confirm-value-input" data-field="advPhone" data-step="1" value="${N.advPhone||""}" placeholder="${B("notInformedPlaceholder")}">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">CID</span>
                        <input class="bau-confirm-value-input" data-field="cid" data-step="1" value="${N.cid||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">AM</span>
                        <input class="bau-confirm-value-input" data-field="amName" data-step="1" value="${N.amName||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Website</span>
                        <input class="bau-confirm-value-input" data-field="website" data-step="1" value="${N.website||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Speakeasy ID</span>
                        <input class="bau-confirm-value-input" data-field="seId" data-step="1" value="${N.seId||""}" placeholder="${B("notInformedPlaceholder")}">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${B("language")}</span>
                        <select class="bau-confirm-value-input" data-field="language" data-step="1">
                            ${P(N.language)}
                        </select>
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${B("whatMustBeDone")}</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="reason" data-step="2" placeholder="---">${N.reason||""}</textarea>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Tasks</span>
                        <span class="bau-confirm-value-input" style="cursor: default; opacity: 0.8;" title="${B("editTasksHint")}">${x}</span>
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${B("bauJustification")}</span>
                        <select class="bau-confirm-value-input" data-field="nonImplementationReason" data-step="3">
                            <option value="Tempo da consultoria esgotado" ${N.nonImplementationReason==="Tempo da consultoria esgotado"?"selected":""}>${Mt("Tempo da consultoria esgotado")}</option>
                            <option value="Solicita\xE7\xE3o de reagendamento pelo anunciante" ${N.nonImplementationReason==="Solicita\xE7\xE3o de reagendamento pelo anunciante"?"selected":""}>${Mt("Solicita\xE7\xE3o de reagendamento pelo anunciante")}</option>
                            <option value="Falta de acessos ou backup do site" ${N.nonImplementationReason==="Falta de acessos ou backup do site"?"selected":""}>${Mt("Falta de acessos ou backup do site")}</option>
                            <option value="Anunciante indispon\xEDvel ou n\xE3o preparado" ${N.nonImplementationReason==="Anunciante indispon\xEDvel ou n\xE3o preparado"?"selected":""}>${Mt("Anunciante indispon\xEDvel ou n\xE3o preparado")}</option>
                            <option value="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)" ${N.nonImplementationReason==="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"?"selected":""}>${Mt("Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)")}</option>
                            <option value="Solicita\xE7\xE3o de tarefas (tasks) adicionais" ${N.nonImplementationReason==="Solicita\xE7\xE3o de tarefas (tasks) adicionais"?"selected":""}>${Mt("Solicita\xE7\xE3o de tarefas (tasks) adicionais")}</option>
                            <option value="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)" ${N.nonImplementationReason==="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"?"selected":""}>${Mt("Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)")}</option>
                            <option value="Retorno de contato ap\xF3s prazo de 14 dias expirado" ${N.nonImplementationReason==="Retorno de contato ap\xF3s prazo de 14 dias expirado"?"selected":""}>${Mt("Retorno de contato ap\xF3s prazo de 14 dias expirado")}</option>
                        </select>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${B("description")}</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="3" placeholder="---">${N.description||""}</textarea>
                    </div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${B("availabilityPriority")}</span>
                        <span class="bau-confirm-value-input" style="cursor: default; opacity: 0.8;" title="${B("editScheduleHint")}">${k(N)}</span>
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${B("suggestDiscardQuestion")}</span>
                        <select class="bau-confirm-value-input" data-field="suggestDiscard" data-step="3">
                            <option value="N\xE3o" ${N.suggestDiscard==="N\xE3o"?"selected":""}>${Mt("N\xE3o")}</option>
                            <option value="Sim" ${N.suggestDiscard==="Sim"?"selected":""}>${Mt("Sim")}</option>
                        </select>
                    </div>
                </div>
            `}else _.innerHTML=`
                ${i?`<div class="bau-highlight-panel discard-theme" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${St.red}; background: rgba(217, 48, 37, 0.05); border-radius: 8px; font-weight: 500;">${B("editingDiscardHash")(`<span style="color: ${St.red}">${r}</span>`)}</div>`:""}
                <div class="bau-confirmation-grid">
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Case ID</span>
                        <input class="bau-confirm-value-input" data-field="caseId" data-step="5" value="${N.caseId||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${B("language")}</span>
                        <select class="bau-confirm-value-input" data-field="language" data-step="5">
                            ${P(N.language)}
                        </select>
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Speakeasy ID</span>
                        <input class="bau-confirm-value-input" data-field="seId" data-step="5" value="${N.seId||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${B("discardReason")}</span>
                        <input class="bau-confirm-value-input" data-field="reason" data-step="5" value="${N.reason||""}" placeholder="---" readonly style="opacity: 0.7;">
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${B("discardDescription")}</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="5" placeholder="---">${N.description||""}</textarea>
                    </div>
                </div>
            `;_.querySelectorAll(".bau-confirm-value-input").forEach(g=>{g.addEventListener("input",x=>{let I=x.target.dataset.field,E=x.target.dataset.step;if(!I||!E)return;let W=R.querySelector(`#bau-step-${E} [name="${I}"]`);W&&(W.value=x.target.value,I==="cid"&&he(1))})})}}async function ce(d){if(!await ot(B("editPageWarning"),{confirmText:B("onCorrectPage")}))return;G(!0),v(),i=!0,r=d.id,n=d.status==="PENDING_TL_DISCARD"||d.reason&&!d.task?"DISCARD":"BAU",y("form"),await se(),a={...a,advName:d.advName||a.advName,advLastName:d.advLastName||a.advLastName,advPhone:d.advPhone||a.advPhone,cid:d.cid||a.cid,caseId:d.caseId||a.caseId,seId:d.seId||a.seId,site:d.site||d.website||a.site||a.website,email:d.advEmail||a.email,timezone:d.timezone||a.timezone,language:d.language||a.language,amName:d.amName||a.amName,salesProgram:d.salesProgram||a.salesProgram};let _=d.availability?d.availability.split("|").map(I=>I.trim()):[],g=(d.task||d.taskType||"").split(",").map(I=>I.trim()).filter(Boolean),x=R.querySelector(".bau-tasks-grid");x&&yd(x,g),R.querySelectorAll("input, select, textarea").forEach(I=>{let E=I.name,H={advEmail:"advEmail",website:"site",site:"site"}[E]||E;if(E==="taskType"){let ae=(d.task||d.taskType||"").split(",").map(fe=>fe.trim());I.type==="checkbox"&&(I.checked=ae.includes(I.value),I.closest(".bau-task-item")?.classList.toggle("active",I.checked))}else if(E==="availabilityTimezone"){let ae=cr(d.timezone)||Ta;Array.from(I.options).some(fe=>fe.value===ae)&&(I.value=ae)}else if(E.startsWith("availability_")){let ae=E.split("_"),fe=parseInt(ae[1],10)-1,Te=ae[2],Me=_[fe],Ee=String(Me||"").match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/);if(!Ee)return;Te==="date"&&(I.value=Ee[1]),Te==="time"&&(Array.from(I.options).some(wt=>wt.value===Ee[2])||I.add(new Option(Ee[2],Ee[2])),I.value=Ee[2])}else E==="language"||E==="suggestDiscard"?Array.from(I.options).some(fe=>fe.value===d[E])&&(I.value=d[E]):d[H]!==void 0?I.value=d[H]:E==="reason"?I.value=d.reason:E==="description"?I.value=d.description:E==="nonImplementationReason"&&(I.value=d.nonImplementationReason||"")}),o=n==="BAU"?1:5,pe(),w.playClick(),setTimeout(()=>G(!1),500)}R.onsubmit=async d=>{d.preventDefault();let N=n==="BAU"?[1,2,3]:[5];for(let W of N)if(!fa.steps.find(ae=>ae.id===W)?.isConfirmation&&(!he(W)||!Y(W))){console.warn(`Form submission blocked by validation failure in step ${W}`),o=W,pe();return}let _=l.querySelector(".bau-btn-submit");_.disabled=!0,_.innerHTML=B("sending");let g=new FormData(R),x=Object.fromEntries(g.entries()),I=a||{},E={...I,...x,requestType:n};if(x.advEmail?E.advEmail=x.advEmail:I.email&&(E.advEmail=I.email),x.website?E.website=x.website:I.website?E.website=I.website:I.site&&(E.website=I.site),n==="BAU"){let W=g.getAll("taskType"),H=O(x).join(" | ");E.taskType=W.join(", "),E.availability=H,i?(x.nonImplementationReason?E.nonImplementationReason=x.nonImplementationReason:delete E.nonImplementationReason,x.description?E.description=x.description:delete E.description):(E.nonImplementationReason=x.nonImplementationReason||"",E.description=x.description||"",E.nonImplementationReason||console.warn("Aviso: Campo 'Justificativa' (nonImplementationReason) est\xE1 saindo vazio."),E.description||console.warn("Aviso: Campo 'Descri\xE7\xE3o detalhada' (description) est\xE1 saindo vazio."))}else E.reason=x.reason,i?(x.description?E.description=x.description:delete E.description,delete E.taskType,delete E.availability,delete E.nonImplementationReason):(E.taskType="",E.availability="",E.nonImplementationReason="",E.description=x.description||"");try{let W=null;i?await es(r,E):W=await Qr(E,I.agentEmail||"anon"),w.playSuccess(),za("concluido");let H=l.querySelector(".bau-success-title");H&&(i?H.textContent=B("caseUpdatedSuccess"):H.textContent=B(n==="DISCARD"?"caseDiscardSentSuccess":"caseSentSuccess")),y("success"),!i&&W&&W.emailSent===!1&&(w.playError(),ne(B("caseCreatedNoEmailConfirm"),{error:!0}))}catch(W){w.playError(),ne(B("errorPrefix")(W.message||B("unknownError")),{error:!0}),console.error("Payload que tentou enviar:",E)}finally{_.disabled=!1,_.innerHTML=`${nt.send} ${B("submitToTl")}`}};function v(){R.reset(),o=0,n="BAU",i=!1,r=null,pe();let d=R.querySelector(".bau-tasks-grid");d&&yd(d)}l.querySelector("#bau-new-case-btn").addEventListener("click",()=>{v(),y("form"),se()}),l.querySelector("#bau-form-back-btn").addEventListener("click",()=>y("dashboard")),l.querySelector("#bau-success-back-btn").addEventListener("click",()=>y("dashboard"));async function b(){e=!ht(l),e&&(l.style.display="flex"),e?(Je(),y("dashboard"),U()):Qe(),ct(e,l,"cw-btn-bauform")}return pe(),je(()=>{let d=l.querySelector(".cw-help-title");d&&(d.textContent=B("headerTitle"));let N=l.querySelector(".cw-help-description");N&&(N.textContent=B("headerDesc"));let _=l.querySelector(".js-bau-new-case");_&&(_.textContent=B("newBauCase"));let g=l.querySelector(".js-bau-back-dashboard");g&&(g.textContent=B("backToDashboard"));let x=l.querySelector(".js-bau-configuring-edit");x&&(x.textContent=B("configuringEdit"));let I=l.querySelector(".js-bau-success-title");I&&(I.textContent=B("caseSentSuccess"));let E=l.querySelector(".js-bau-success-sub");E&&(E.textContent=B("caseSentSuccessSub"));let W=l.querySelector(".js-bau-success-back");W&&(W.textContent=B("backToDashboard")),te.textContent=B("back"),ee.textContent=B("next");let H=l.querySelector("#bau-md-detail");H&&H.setAttribute("aria-label",B("caseDetailsTitle")),y(t);let ae=(fe,Te)=>{let Me=R.querySelector(fe);Me&&(Me.textContent=Te)};ae("#bau-opt-full .bau-branching-title",B("openBauCase")),ae("#bau-opt-full .bau-branching-subtitle",B("openBauCaseDesc")),ae("#bau-opt-discard .bau-branching-title",B("requestDiscard")),ae("#bau-opt-discard .bau-branching-subtitle",B("requestDiscardDesc")),ae("#bau-step-4 .bau-step-title",B("confirmDataBeforeSending")),R.querySelectorAll(".bau-step").forEach(fe=>{let Te=parseInt(fe.id.replace("bau-step-",""),10),Me=fa.steps.find(Ee=>Ee.id===Te);!Me||Me.isBranching||Me.isConfirmation||fe.querySelectorAll(".bau-dynamic-input").forEach(Ee=>{let wt=Ee.id.replace("wrapper-",""),Ge=Me.fields?.find(yt=>yt.id===wt);if(!Ge)return;let zt=Ee.querySelector(".bau-label");zt&&Ge.label&&(zt.textContent=Lt(Ge,"label"),Ge.tooltip&&zt.setAttribute("data-tooltip",Lt(Ge,"tooltip")));let ea=Ee.querySelector("input, textarea, select");if(ea&&Ge.placeholder&&(ea.placeholder=Lt(Ge,"placeholder")),wt==="cid"){let yt=Ee.querySelector("#bau-cid-error");yt&&(yt.textContent=Cd(Ge))}if(Ge.type==="datetime-group"&&j(Ee,Ge),Ge.type==="text-with-button"){let yt=Ee.querySelector(".bau-mini-btn-input");yt&&(yt.title=Lt(Ge,"buttonTitle")||Ge.button.title)}if(Ge.type==="select"){let yt=Ge.groups?Ge.groups.flatMap(na=>na.options):Ge.options||[];Ee.querySelectorAll("option").forEach((na,_a)=>{let jt=yt[_a];jt&&(na.textContent=Mt(jt.text))})}})}),t==="dashboard"&&U()}),b}var Hn=[["AS - Acceptable Reschedule","optional"],["AS - Reschedule 1","optional"],["NI - Awaiting Inputs","customer"],["NI - In Consult",3],["NI - Awaiting Validation",2],["NI - Attempted Contact","policy"],["DC - Test Case","na"],["DC - Not Needed","na"],["DC - No response (Hybrid case)","na"],["DC - Out of Scope","na"],["DC - Authentication Failed","na"],["IN - Infeasible","na"],["IN - Not Reachable","na"],["IN - Not Interested","na"],["IN - Not Ready","na"],["IN - Out of Scope - Rerouted","na"],["IN - Reschedule Limit Exceeded","na"],["IN - Troubleshooting [Transferred]","na"],["IN - Instruction Shared","na"],["SO - Implementation Only","na"],["SO - Educational Only","na"],["SO - Troubleshooting Only","na"]],hg=["NI - Attempted Contact","IN - Not Reachable"],Jo=["ads_conversion_tracking","ads_enhanced_conversions"],vg=["before","impl","after"],kd={today:["before","impl"],past:["after"]},wr=["call_summary","case_comments","oncall_comments"],Ga="extras",Ld=["kv","group","cid"],Id=["text","long","date","yesno","link","cid","speakeasy","derived"],_d=["tbw","cid","yn","text","link","smeyes"],yr=/^[a-z][a-z0-9_]{0,39}$/,Dd="ads_enhanced_conversions";function Un(e={}){return Object.assign({seg:"all",flow:"bau",europe:!1,substatus:"",tasks:[],forced:[],active:[],optIn:[],vals:{},cids:[],taskPrints:[]},e)}function Qo(e=""){return{tbw:"TBW",cid:e,mcc:"",outcome:"",alink:"",sme:"YES",tag:"",caseid:"",elig:"",galactic:""}}function aa(e,t){return e.vals[t]||(e.vals[t]={v:"",na:!1,comment:"",touched:!1,auto:!1,defaulted:!1}),e.vals[t]}function La(e,t){return e.segments.find(a=>a.key===t)||null}function Ia(e,t){let a=La(e,t);return a?a.blocks.some(o=>Od(e.blocks[o.b]).some(n=>n.type==="derived"&&n.auto==="tasks")):!1}function Md(e,t){return Ia(e,t.seg)?t.tasks||[]:[]}function xo(e,t){return Md(e,t).map(a=>a.key)}function xg(e,t,a){return xo(e,t).includes(a==="ecw"?Dd:a)}function Od(e){let t=[];if(!e)return t;for(let a of e.sections||[])a.rows&&t.push(...a.rows);return t}function vo(e,t,a){if(!a)return!0;if(a.flow&&t.flow!==a.flow||a.europe!==void 0&&!!t.europe!==a.europe||a.substatusAny&&!a.substatusAny.includes(t.substatus))return!1;if(a.tasksAny){let o=xo(e,t);if(!a.tasksAny.some(n=>o.includes(n)))return!1}return!(a.rowIs&&aa(t,a.rowIs.id).v!==a.rowIs.v)}function Vn(e,t,a){return a.requiredWhen?vo(e,t,a.requiredWhen):!!a.required}function wo(e,t,a,o={}){return a.visible===!1?!1:o.ignoreWhen?!0:!(a.onlyFor&&!a.onlyFor.every(n=>xg(e,t,n))||!vo(e,t,a.when)||a.optIn&&!(t.optIn||[]).includes(a.id)&&!(a.requiredWhen&&vo(e,t,a.requiredWhen)))}function Sr(e){let t=Hn.find(a=>a[0]===e);return t?t[1]:null}function qd(e){return Hn.some(t=>t[0]===e)}function Wn(e,t){return xo(e,t).some(a=>Jo.includes(a))&&aa(t,"ts_used").v==="Yes"}function xr(e,t,a){return Wn(e,t)&&Jo.includes(a)&&xo(e,t).includes(a)&&!(t.forced||[]).includes(a)}function Yn(e,t,a,o){if(a.type!=="link"||!vg.includes(o)||!Wn(e,t))return!1;if(a.onlyFor)return a.onlyFor.every(i=>xr(e,t,i==="ecw"?Dd:i));let n=xo(e,t).filter(i=>Jo.includes(i));return n.length>0&&n.every(i=>xr(e,t,i))}function wg(e,t,a=""){return Md(e,t).map(o=>xr(e,t,o.key)?`${o.name} - ${a}`:o.count>1?`${o.name} (x${o.count})`:o.name).join(", ")}function Fd(e,t){return Ia(e,t.seg)?(t.taskPrints||[]).filter(a=>a&&String(a.v||"").trim()).map((a,o)=>({id:`tp_${o}`,label:{en:String(a.label||"")},type:"link",value:String(a.v).trim()})):[]}var Rd=e=>e.trim().toUpperCase()==="NA";function ja(e,t,a,o={}){let n=aa(t,a.id),i=a.na!==!1;if(a.type==="derived"){if(a.auto==="substatus")return t.substatus||null;if(a.auto==="europe")return"Yes";if(a.auto==="tasks"){let s=wg(e,t,o.tsDisclaimer);return s||(n.na?"NA":null)}return null}if(n.na&&i)return"NA";let r=String(n.v||"").trim();return r?Rd(r)?i?"NA":null:r:o.blockId&&Yn(e,t,a,o.blockId)?"NA":Vn(e,t,a)?null:"NA"}function Zo(e){return/^https?:\/\/\S+$/i.test(String(e||"").trim())}function zd(e,t){let a=String(t||"").trim();return a?Rd(a)?e.na===!1:e.type==="date"?!/^\d{4}-\d{2}-\d{2}$/.test(a):e.type==="link"?!Zo(a):!1:!1}function Cr(e){let t=String(e||"").replace(/\D/g,"");return t.length===10?`${t.slice(0,3)}-${t.slice(3,6)}-${t.slice(6)}`:String(e||"")}function Ar(e,t){return e.type==="smeyes"?t.sme||"YES":e.type==="tbw"?t.tbw||"TBW":String(t[e.id]||"").trim()}function ca(e,t){let a=La(e,t.seg);if(!a)return[];let o=t.active||[],n=a.blocks.filter(i=>o.includes(i.b)&&i.b!==Ga&&e.blocks[i.b]);return n.length?(e.blocks[Ga]&&n.push({b:Ga,title:""}),n):[]}function Er(e,t){let a=La(e,t);return!a||!a.blocks.length?[]:a.select==="multi"?[...a.always||[]]:[a.blocks[0].b]}function $d(e,t,a){let o=a.suggest;if(!o)return!1;let n=xo(e,t);return!!(o.tasksAny&&o.tasksAny.some(i=>n.includes(i))||o.substatusAny&&o.substatusAny.includes(t.substatus))}var Td=e=>String(e).padStart(2,"0"),Xn=e=>`${e.getFullYear()}-${Td(e.getMonth()+1)}-${Td(e.getDate())}`;function kr(e,t=new Date){let a=new Date(t.getFullYear(),t.getMonth(),t.getDate(),12),o=e;for(;o>0;){a.setDate(a.getDate()+1);let n=a.getDay();n!==0&&n!==6&&o--}return Xn(a)}var yg={jan:1,ene:1,fev:2,feb:2,mar:3,abr:4,apr:4,mai:5,may:5,jun:6,jul:7,ago:8,aug:8,set:9,sep:9,sept:9,out:10,oct:10,nov:11,dez:12,dec:12,dic:12};function Sg(e){let t=String(e||"").trim();if(!t)return null;let a=t.match(/^(\d{4})-([A-Za-z]{3,4}\.?|\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?\s*(UTC|GMT|Z)?$/i);if(!a)return null;let o=+a[1],n=/^\d/.test(a[2])?+a[2]:yg[a[2].replace(".","").toLowerCase()],i=+a[3];if(!n||n>12||i<1||i>31)return null;let r=a[4]!==void 0,s=r&&a[7]?new Date(Date.UTC(o,n-1,i,+a[4],+a[5],+(a[6]||0))):new Date(o,n-1,i,r?+a[4]:12,r?+a[5]:0);return Number.isNaN(s.getTime())||!(r&&a[7])&&(s.getMonth()!==n-1||s.getDate()!==i)?null:Xn(s)}function Kn(e,t,a,o=new Date){let n=Er(e,t),i=La(e,t);if(!i||i.select!=="multi")return n;let r=Sg(a);if(!r)return n;let s=Xn(o),l=r===s?kd.today:r<s?kd.past:[],p=i.blocks.map(c=>c.b);return[...n,...l.filter(c=>p.includes(c)&&!n.includes(c))]}function Cg(e){let t=new Map;for(let a of Object.values(e.blocks))for(let o of Od(a))t.has(o.id)||t.set(o.id,o);return[...t.values()]}function Pd(e,t,a={}){let o=a.now||new Date,n=a.today||Xn(o);for(let i of Cg(e)){let r=aa(t,i.id);if(i.default!==void 0&&!r.touched&&!r.v&&!r.na&&(r.v=i.default),!(!i.auto||i.type==="derived"||r.touched))if(i.auto==="today")r.v=n,r.auto=!0;else if(i.auto==="cid")r.v=a.cid||"",r.auto=!!a.cid;else if(i.auto==="followup"){let s=Sr(t.substatus);typeof s=="number"?(r.v=kr(s,o),r.na=!1,r.auto=!0):s==="na"?(r.v="",r.na=!0,r.auto=!0):(r.auto&&(r.v="",r.na=!1),r.auto=!1)}else i.auto==="consent"&&(hg.includes(t.substatus)?(r.na=!0,r.auto=!0,r.defaulted=!1):t.europe?(r.na=!1,r.auto=!1,r.defaulted&&(r.v=""),r.defaulted=!1):(r.na=!1,r.auto=!1,r.v="Yes",r.defaulted=!0))}return t}function en(e,t){let a=aa(e,t);return a.touched=!0,a.auto=!1,a.defaulted=!1,a}var Nd=e=>String(e||"").replace(/[:?]\s*$/,"");function It(e,t){return typeof e=="string"?e:e&&(e[t]||e.en)||""}function Bd(e,t,a={}){let o=[],n=new Set,i=(r,s)=>{n.has(r)||(n.add(r),o.push({key:r,label:s}))};for(let r of ca(e,t)){let s=e.blocks[r.b];for(let l of s.sections){if(l.kind==="cid"){let p=t.cids||[];p.length||i(`cids:${r.b}`,"CID-Level Details"),p.forEach((c,m)=>l.columns.forEach(u=>{u.required!==!1&&!Ar(u,c)&&i(`cid:${m}:${u.id}`,`CID ${m+1}: ${Nd(It(u.label,a.lang))}`)}));continue}for(let p of l.rows||[])wo(e,t,p)&&ja(e,t,p,{...a,blockId:r.b})===null&&i(p.id,Nd(It(p.label,a.lang)))}}return o}function Gd(e,t,a={}){let o=0;for(let n of ca(e,t))for(let i of e.blocks[n.b].sections)for(let r of i.rows||[])!wo(e,t,r)||r.na===!1||!Vn(e,t,r)||ja(e,t,r,{...a,blockId:n.b})===null&&(aa(t,r.id).na=!0,o++);return o}var Rt={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",bgInput:"#f8f9fa",surface:"#fff"},Tr="'Google Sans', Roboto, Arial, sans-serif",Nr="1px solid rgba(60,64,67,.16)",Eg="#fef7e0",kg="Additional Comments (Optional)",jd={pt:"Nota criada atrav\xE9s do Cases Wizard.",es:"Nota creada a trav\xE9s de Cases Wizard.",en:"Note created through Cases Wizard."};function Jt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function yo(e){return String(e??"").replace(/\r\n?/g,`
`).split(`
`).filter(t=>t.trim()).map(t=>Jt(t.replace(/\s+$/,"")).replace(/\*\*([^*]+?)\*\*/g,"<b>$1</b>")).join("<br>")}function Tg({row:e,span:t=1,rowspan:a=1,head:o,bg:n,bold:i,color:r,valign:s="top",vline:l},p){let c=["padding:8px 12px","font-size:13px","line-height:1.45",`vertical-align:${s}`,"word-break:break-word","overflow-wrap:anywhere",e>0?`border-top:${Nr}`:"",l?`border-left:${Nr}`:"",`background-color:${n||Rt.surface}`,`color:${r||Rt.text}`,i||o?"font-weight:700":"font-weight:400","text-align:left"].filter(Boolean).join(";"),m=o?"th":"td";return`<${m}${t>1?` colspan="${t}"`:""}${a>1?` rowspan="${a}"`:""} style="${c}">${p}</${m}>`}function Ng(e,t){let a=[],o="";return e.forEach((n,i)=>{a[i]=a[i]||[];let r=0,s="";for(let l of n){for(;a[i][r];)r++;let p=l.span||1,c=l.rowspan||1;for(let m=0;m<c;m++){a[i+m]=a[i+m]||[];for(let u=0;u<p;u++)a[i+m][r+u]=!0}s+=Tg({...l,row:i,vline:!!l.vline&&r>0},l.html),r+=p}o+=`<tr${t&&n.rowId?` data-row="${Jt(n.rowId)}"`:""}>${s}</tr>`}),o}var Jn=(e,t)=>Object.assign(e,{rowId:t});function Lg(e,t,a,o={}){let n=e.blocks[a.b];if(!n)return"";let i=n.cols,r=o.lang||"en",s=!!o.live,l=()=>s?{bg:Eg,html:`<span style="color:#b06000;font-style:italic">${Jt(o.pendingLabel||"pending")}</span>`}:{html:"NA"},p=[],c=a.b===Ga?Fd(e,t):[],m=n.sections.map(D=>D.kind).lastIndexOf("kv");if(n.sections.forEach((D,G)=>{if(D.kind==="cid"){p.push([{span:i,head:!0,bg:Rt.primaryBg,html:Jt(It(D.title,r))}]),p.push(D.columns.map($=>({head:!0,vline:!0,bg:Rt.bgInput,color:Rt.textSub,html:Jt(It($.label,r))})));let ee=t.cids||[];ee.length||p.push([{span:i,...l()}]),ee.forEach(($,A)=>p.push(Jn(D.columns.map((y,z)=>{let U=Ar(y,$);return U?{bold:z===0,vline:!0,html:yo(U)}:{bold:z===0,vline:!0,...l()}}),`cid:${A}:${D.columns[0].id}`)));return}let F=(D.rows||[]).filter(ee=>wo(e,t,ee,{ignoreWhen:o.ignoreWhen})),R=G===m?c:[];if(!F.length&&!R.length)return;let le=[{span:i-1,head:!0,bg:Rt.primaryBg,html:Jt(It(D.title,r))},{head:!0,vline:!0,bg:Rt.bgInput,color:Rt.textSub,html:kg}];p.push(le);let te={blockId:a.b,tsDisclaimer:o.tsDisclaimer};if(D.kind==="group")F.forEach((ee,$)=>{let A=ja(e,t,ee,te),y=[];$===0&&y.push({rowspan:F.length,bold:!0,bg:Rt.bgInput,color:Rt.primary,valign:"middle",html:Jt(It(D.group,r))}),y.push({bold:!0,html:Jt(It(ee.label,r))}),y.push(A===null?l():{html:yo(A)}),y.push({vline:!0,html:yo(aa(t,ee.id).comment)}),p.push(Jn(y,ee.id))});else{let ee=i===3?1:2,$=i-ee-1;for(let A of F){let y=ja(e,t,A,te);p.push(Jn([{span:ee,bold:!0,bg:Rt.bgInput,html:Jt(It(A.label,r))},y===null?{span:$,...l()}:{span:$,html:yo(y)},{vline:!0,html:yo(aa(t,A.id).comment)}],A.id))}for(let A of R)p.push(Jn([{span:ee,bold:!0,bg:Rt.bgInput,html:Jt(A.label.en)},{span:$,html:yo(A.value)},{vline:!0,html:""}],A.id))}}),!p.length)return"";let u=`width:100%;table-layout:fixed;border-collapse:separate;border-spacing:0;border:${Nr};border-radius:12px;overflow:hidden;font-family:${Tr};margin:0 0 4px 0`,h=`<colgroup>${n.widths.map(D=>`<col style="width:${D}%">`).join("")}</colgroup>`,L=La(e,t.seg),S=It(a.title,r);return`${L&&L.showTitle&&S?`<div style="font-family:${Tr};font-size:13px;font-weight:700;color:${Rt.primary};margin:16px 0 6px 0">${Jt(S)}</div>`:""}<table style="${u}">${h}<tbody>${Ng(p,s)}</tbody></table>`}function Lr(e,t,a={}){let o=a.lang||"en",n=ca(e,t).map(r=>Lg(e,t,r,a)).filter(Boolean);if(!n.length)return"";let i=a.footer||jd[o]||jd.en;return n.join('<div style="height:10px"></div>')+`<div style="font-family:${Tr};font-size:12px;font-style:italic;color:${Rt.textSub};margin-top:8px">${Jt(i)}</div>`}var Ir={blocks:{general:{name:"General details",cols:4,widths:[16,16,46,22],sections:[{kind:"kv",title:"General Details (Mandatory)",rows:[{id:"date",label:{en:"Date:",pt:"Data:",es:"Fecha:"},type:"date",required:!0,na:!1,visible:!0,auto:"today",hint:{pt:"Data da call, da tentativa de contato ou do follow-up (YYYY-MM-DD).",es:"Fecha de la llamada, del intento de contacto o del follow-up (YYYY-MM-DD).",en:"Date of the call, the contact attempt or the follow-up (YYYY-MM-DD)."}},{id:"speakeasy",label:{en:"Speakeasy ID:",pt:"Speakeasy ID:",es:"Speakeasy ID:"},type:"speakeasy",required:!0,na:!0,visible:!0,hint:{pt:"ID exato da sess\xE3o do SpeakEasy. V\xE1rias liga\xE7\xF5es: separe por v\xEDrgula. NA para atendimento offline ou s\xF3 por e-mail.",es:"ID exacto de la sesi\xF3n de SpeakEasy. Varias llamadas: sep\xE1relos con coma. NA para atenci\xF3n offline o solo por correo.",en:"Exact SpeakEasy session ID. Several calls: separate with commas. NA for offline or email-only handling."}},{id:"substatus",label:{en:"Sub-status:",pt:"Sub-status:",es:"Subestado:"},type:"derived",required:!0,na:!1,visible:!0,auto:"substatus",hint:{pt:"Vem do campo Sub-status no topo.",es:"Viene del campo Subestado, arriba.",en:"Comes from the Sub-status field at the top."}},{id:"next_followup",label:{en:"Next Follow-Up Date:",pt:"Data do pr\xF3ximo follow-up:",es:"Fecha del pr\xF3ximo follow-up:"},type:"date",required:!0,na:!0,visible:!0,auto:"followup",hint:{pt:"Data do pr\xF3ximo follow-up, ou NA.",es:"Fecha del pr\xF3ximo follow-up, o NA.",en:"Next follow-up date, or NA."}},{id:"task_types",label:{en:"Task types:",pt:"Tipos de task:",es:"Tipos de task:"},type:"derived",required:!0,na:!0,visible:!0,auto:"tasks",hint:{pt:"V\xEAm das tasks marcadas. NA s\xF3 se nenhuma task esteve envolvida.",es:"Vienen de las tasks marcadas. NA solo si ninguna task estuvo involucrada.",en:"Comes from the selected tasks. NA only if no task was involved."}},{id:"impl_tags",label:{en:"Implemented tags:",pt:"Tags implementadas:",es:"Etiquetas implementadas:"},type:"text",required:!0,na:!0,visible:!0,hint:{pt:"Nome exato das conversion actions criadas, verificadas ou corrigidas, separados por v\xEDrgula (ex.: Phone_call, lead_form). NA se n\xE3o se aplica.",es:"Nombre exacto de las conversion actions creadas, verificadas o corregidas, separados por coma (ej.: Phone_call, lead_form). NA si no aplica.",en:"Exact names of the conversion actions created, verified or fixed, comma-separated (e.g. Phone_call, lead_form). NA if not applicable."}},{id:"cid",label:{en:"CID:",pt:"CID:",es:"CID:"},type:"cid",required:!0,na:!0,visible:!0,auto:"cid",hint:{pt:"CID de 10 d\xEDgitos (XXX-XXX-XXXX) confirmado com o anunciante. V\xE1rios: separe por v\xEDrgula.",es:"CID de 10 d\xEDgitos (XXX-XXX-XXXX) confirmado con el anunciante. Varios: sep\xE1relos con coma.",en:"10-digit CID (XXX-XXX-XXXX) confirmed with the advertiser. Several: separate with commas."}},{id:"consent",label:{en:"Checked and obtained recording consent from the customer before proceeding with the call?",pt:"Verificou e obteve o consentimento do cliente para a grava\xE7\xE3o antes de seguir com a call?",es:"\xBFVerific\xF3 y obtuvo el consentimiento del cliente para la grabaci\xF3n antes de continuar con la llamada?"},type:"yesno",required:!0,na:!0,visible:!0,auto:"consent",hint:{pt:'Fora da Europa o padr\xE3o \xE9 Yes (a alternativa fica em "Alterar"). No caso da Europa o agente marca. NA para NI - Attempted Contact e IN - Not Reachable.',es:'Fuera de Europa el valor predeterminado es Yes (la alternativa est\xE1 en "Cambiar"). En el caso de Europa, lo marca el agente. NA para NI - Attempted Contact e IN - Not Reachable.',en:'Outside Europe the default is Yes (the alternative is under "Change"). For a Europe case the agent marks it. NA for NI - Attempted Contact and IN - Not Reachable.'}},{id:"call_summary",label:{en:"Call Summary:",pt:"Resumo da call:",es:"Resumen de la llamada:"},type:"long",required:!0,na:!1,visible:!0,hint:{pt:"Resumo curto do que aconteceu na call ou no e-mail.",es:"Resumen breve de lo que pas\xF3 en la llamada o en el correo.",en:"Short summary of what happened on the call or in the email."}},{id:"substatus_reason",label:{en:"Sub-status Reason:",pt:"Motivo do sub-status:",es:"Motivo del subestado:"},type:"long",required:!0,na:!1,visible:!0,hint:{pt:"Justificativa exata do sub-status escolhido.",es:"Justificaci\xF3n exacta del subestado elegido.",en:"Exact justification for the chosen sub-status."}},{id:"additional_info",label:{en:"Additional information:",pt:"Informa\xE7\xF5es adicionais:",es:"Informaci\xF3n adicional:"},type:"long",required:!1,na:!0,visible:!0,hint:{pt:"Opcional. Vazio sai como NA.",es:"Opcional. Vac\xEDo sale como NA.",en:"Optional. Left empty, it goes out as NA."}}]},{kind:"kv",title:"Screenshots (Mandatory)",rows:[{id:"website",label:{en:"Website URL worked upon:",pt:"URL do site trabalhado:",es:"URL del sitio trabajado:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print do Tag Assistant mostrando o site conectado. NA s\xF3 se nenhuma task esteve envolvida.",es:"Captura de Tag Assistant con el sitio conectado. NA solo si ninguna task estuvo involucrada.",en:"Tag Assistant screenshot showing the connected site. NA only if no task was involved."}},{id:"qplus",label:{en:"Q+ entry:",pt:"Registro no Q+:",es:"Registro en Q+:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Link do print do Q+ preenchido ao fechar ou transferir o caso.",es:"Enlace de la captura de Q+ completado al cerrar o transferir el caso.",en:"Link to the screenshot of the Q+ entry filled in when closing or transferring the case."}},{id:"gvc",label:{en:"GVC Chat:",pt:"Chat do GVC:",es:"Chat de GVC:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print do chat do Meet se houve links ou instru\xE7\xF5es. Sen\xE3o, NA.",es:"Captura del chat de Meet si hubo enlaces o instrucciones. Si no, NA.",en:"Screenshot of the Meet chat if links or instructions were shared. Otherwise, NA."}},{id:"gam",label:{en:"GAM:",pt:"GAM:",es:"GAM:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print do ping ao Seller/GAM logo ap\xF3s a call, com resultado, status e pr\xF3ximos passos.",es:"Captura del ping al Seller/GAM justo despu\xE9s de la llamada, con resultado, estado y pr\xF3ximos pasos.",en:"Screenshot of the ping to the Seller/GAM right after the call, with outcome, status and next steps."}},{id:"extra_general",label:{en:"Additional Screenshots:",pt:"Prints adicionais:",es:"Capturas adicionales:"},type:"link",required:!1,na:!0,visible:!0,hint:{pt:"Opcional. Qualquer print extra exigido pelo cen\xE1rio.",es:"Opcional. Cualquier captura extra que exija el escenario.",en:"Optional. Any extra screenshot the scenario requires."}}]}]},before:{name:"Before implementation",cols:4,widths:[22,28,28,22],sections:[{kind:"group",title:"Screenshots (Mandatory)",group:"Before implementation:",rows:[{id:"b_status",label:{en:"Google Ads Conversion Status:",pt:"Status da convers\xE3o no Google Ads:",es:"Estado de la conversi\xF3n en Google Ads:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Status de rastreamento Unverified, Needs attention ou Tag inactive, com CID, nome da convers\xE3o e hor\xE1rio vis\xEDveis.",es:"Estado de seguimiento Unverified, Needs attention o Tag inactive, con CID, nombre de la conversi\xF3n y hora visibles.",en:"Tracking status Unverified, Needs attention or Tag inactive, with CID, conversion name and time visible."}},{id:"b_dup",label:{en:"Duplicate Tags / Repeat Rate:",pt:"Tags duplicadas / Repeat rate:",es:"Etiquetas duplicadas / Repeat rate:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Tabela de convers\xF5es com repeat rate elevado (> 1,3 ou > 2,0) antes de remover tags duplicadas.",es:"Tabla de conversiones con repeat rate alto (> 1,3 o > 2,0) antes de quitar las etiquetas duplicadas.",en:"Conversions table with a high repeat rate (> 1.3 or > 2.0) before removing duplicate tags."}},{id:"b_bid",label:{en:"Bidding Optimization:",pt:"Otimiza\xE7\xE3o de lances:",es:"Optimizaci\xF3n de pujas:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Configura\xE7\xE3o mostrando a otimiza\xE7\xE3o de a\xE7\xE3o inicial (Secondary ou Primary).",es:"Configuraci\xF3n con la optimizaci\xF3n de acci\xF3n inicial (Secondary o Primary).",en:"Settings showing the initial action optimization (Secondary or Primary)."}},{id:"b_diag",label:{en:"Tag Diagnostics:",pt:"Tag Diagnostics:",es:"Tag Diagnostics:"},type:"link",required:!0,na:!0,visible:!0,onlyFor:["ecw"],hint:{pt:"S\xF3 ECW. Print do alerta antes da corre\xE7\xE3o.",es:"Solo ECW. Captura de la alerta antes de la correcci\xF3n.",en:"ECW only. Screenshot of the alert before the fix."}},{id:"b_qual",label:{en:"EC Qualdash:",pt:"EC Qualdash:",es:"EC Qualdash:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"go/ec-qual-dash com Coverage Rate baixo (< 0,7) antes de remover tags duplicadas.",es:"go/ec-qual-dash con Coverage Rate bajo (< 0,7) antes de quitar las etiquetas duplicadas.",en:"go/ec-qual-dash with a low Coverage Rate (< 0.7) before removing duplicate tags."}}]}]},impl:{name:"Implementation",cols:4,widths:[22,28,28,22],sections:[{kind:"group",title:"Screenshots (Mandatory)",group:"Implementation:",rows:[{id:"i_status",label:{en:"Google Ads Conversion Status:",pt:"Status da convers\xE3o no Google Ads:",es:"Estado de la conversi\xF3n en Google Ads:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Resumo de convers\xF5es mostrando a transi\xE7\xE3o do status, com CID e nome da convers\xE3o iguais.",es:"Resumen de conversiones con la transici\xF3n del estado, con el mismo CID y nombre de conversi\xF3n.",en:"Conversions summary showing the status transition, with the same CID and conversion name."}},{id:"i_settings",label:{en:"Google Ads Conversion Settings:",pt:"Configura\xE7\xF5es da convers\xE3o no Google Ads:",es:"Configuraci\xF3n de la conversi\xF3n en Google Ads:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Categoria, otimiza\xE7\xE3o, contagem, valor, atribui\xE7\xE3o e Tag Setup (Conversion ID e Label).",es:"Categor\xEDa, optimizaci\xF3n, recuento, valor, atribuci\xF3n y Tag Setup (Conversion ID y Label).",en:"Category, optimization, count, value, attribution and Tag Setup (Conversion ID and Label)."}},{id:"i_gtm",label:{en:"GTM / Website Backend:",pt:"GTM / Backend do site:",es:"GTM / Backend del sitio:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Tag de convers\xE3o + Conversion Linker + gatilho no GTM, ou gtag.js manual.",es:"Etiqueta de conversi\xF3n + Conversion Linker + activador en GTM, o gtag.js manual.",en:"Conversion tag + Conversion Linker + trigger in GTM, or manual gtag.js."}},{id:"i_fired",label:{en:"Tag Assistant Tag Fired:",pt:"Tag disparada no Tag Assistant:",es:"Etiqueta disparada en Tag Assistant:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Tags disparadas com Conversion ID, Label e Value/Currency din\xE2micos.",es:"Etiquetas disparadas con Conversion ID, Label y Value/Currency din\xE1micos.",en:"Fired tags with Conversion ID, Label and dynamic Value/Currency."}},{id:"i_ec",label:{en:"Google Ads EC Settings:",pt:"Configura\xE7\xF5es de EC no Google Ads:",es:"Configuraci\xF3n de EC en Google Ads:"},type:"link",required:!0,na:!0,visible:!0,onlyFor:["ecw"],hint:{pt:"S\xF3 ECW. Enhanced conversions ligado e m\xE9todo escolhido.",es:"Solo ECW. Enhanced conversions activado y m\xE9todo elegido.",en:"ECW only. Enhanced conversions on and the method chosen."}},{id:"i_terms",label:{en:"Customer Data Terms Accepted:",pt:"Termos de dados do cliente aceitos:",es:"Condiciones de datos del cliente aceptadas:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Termos de dados do cliente aceitos no Google Ads.",es:"Condiciones de datos del cliente aceptadas en Google Ads.",en:"Customer data terms accepted in Google Ads."}},{id:"i_em",label:{en:"Error-Free em Parameter OR ecsid PII Stitching:",pt:"Par\xE2metro em sem erro OU PII Stitching por ecsid:",es:"Par\xE1metro em sin errores O PII Stitching por ecsid:"},type:"link",required:!0,na:!0,visible:!0,onlyFor:["ecw"],hint:{pt:"S\xF3 ECW. Par\xE2metro em com hash SHA-256 v\xE1lido (nunca em.e0), ou 2 prints com ecsid igual.",es:"Solo ECW. Par\xE1metro em con hash SHA-256 v\xE1lido (nunca em.e0), o 2 capturas con el mismo ecsid.",en:"ECW only. em parameter with a valid SHA-256 hash (never em.e0), or 2 screenshots with the same ecsid."}},{id:"i_hit",label:{en:"\u201CHit Sent\u201D in Tag Assistant OR Network Header 200 OK:",pt:"\u201CHit Sent\u201D no Tag Assistant OU Network Header 200 OK:",es:"\u201CHit Sent\u201D en Tag Assistant O Network Header 200 OK:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Hit para googleadservices.com com o Label certo e 200 OK.",es:"Hit a googleadservices.com con el Label correcto y 200 OK.",en:"Hit to googleadservices.com with the right Label and 200 OK."}},{id:"i_extra",label:{en:"Additional Screenshots:",pt:"Prints adicionais:",es:"Capturas adicionales:"},type:"link",required:!1,na:!0,visible:!0,hint:{pt:"Opcional.",es:"Opcional.",en:"Optional."}}]}]},after:{name:"After implementation",cols:4,widths:[22,28,28,22],sections:[{kind:"group",title:"Screenshots (Mandatory)",group:"After implementation:",rows:[{id:"a_status",label:{en:"Google Ads Conversion Status:",pt:"Status da convers\xE3o no Google Ads:",es:"Estado de la conversi\xF3n en Google Ads:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Resumo de convers\xF5es na janela de valida\xE7\xE3o de 2 a 3 dias.",es:"Resumen de conversiones en la ventana de validaci\xF3n de 2 a 3 d\xEDas.",en:"Conversions summary in the 2-to-3-day validation window."}},{id:"a_diag",label:{en:"Tag Diagnostics / EC Qualdash:",pt:"Tag Diagnostics / EC Qualdash:",es:"Tag Diagnostics / EC Qualdash:"},type:"link",required:!0,na:!0,visible:!0,onlyFor:["ecw"],hint:{pt:'S\xF3 ECW. Tag Diagnostics do dia 7 em "Recording enhanced conversions" e/ou EC Qualdash.',es:'Solo ECW. Tag Diagnostics del d\xEDa 7 en "Recording enhanced conversions" y/o EC Qualdash.',en:'ECW only. Day-7 Tag Diagnostics in "Recording enhanced conversions" and/or EC Qualdash.'}},{id:"a_dup",label:{en:"Duplicate Tags / Repeat Rate:",pt:"Tags duplicadas / Repeat rate:",es:"Etiquetas duplicadas / Repeat rate:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Repeat rate normalizado (~1,0) ap\xF3s 2 dias (ACT) ou 7 dias (ECW).",es:"Repeat rate normalizado (~1,0) despu\xE9s de 2 d\xEDas (ACT) o 7 d\xEDas (ECW).",en:"Repeat rate back to normal (~1.0) after 2 days (ACT) or 7 days (ECW)."}},{id:"a_bid",label:{en:"Bidding Optimization:",pt:"Otimiza\xE7\xE3o de lances:",es:"Optimizaci\xF3n de pujas:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Otimiza\xE7\xE3o de a\xE7\xE3o atualizada depois da mudan\xE7a.",es:"Optimizaci\xF3n de acci\xF3n actualizada despu\xE9s del cambio.",en:"Action optimization updated after the change."}},{id:"a_extra",label:{en:"Additional Screenshots:",pt:"Prints adicionais:",es:"Capturas adicionales:"},type:"link",required:!1,na:!0,visible:!0,hint:{pt:"Opcional.",es:"Opcional.",en:"Optional."}}]}]},consult:{name:"Consult routing path",cols:4,widths:[22,26,30,22],sections:[{kind:"group",title:"Screenshots (Mandatory)",group:"Consult Routing Path & SME Approval:",rows:[{id:"c_path",label:{en:"Consult Routing Path:",pt:"Caminho de roteamento da consulta:",es:"Ruta de enrutamiento de la consulta:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print confirmando o roteamento para a fila certa de M&A.",es:"Captura que confirma el enrutamiento a la fila correcta de M&A.",en:"Screenshot confirming the routing to the right M&A queue."}},{id:"c_sme",label:{en:"SME Approval:",pt:"Aprova\xE7\xE3o do SME:",es:"Aprobaci\xF3n del SME:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print ou nota registrada com a aprova\xE7\xE3o do SME para Split & Transfer ou Discard.",es:"Captura o nota registrada con la aprobaci\xF3n del SME para Split & Transfer o Discard.",en:"Screenshot or logged note with the SME approval for Split & Transfer or Discard."}}]}]},audit:{name:"Readiness Audit",cols:6,widths:[12,15,11,15,25,22],sections:[{kind:"cid",title:"CID-Level Details",columns:[{id:"tbw",label:{en:"To Be Worked?",pt:"A trabalhar?",es:"\xBFA trabajar?"},type:"tbw",required:!0},{id:"cid",label:{en:"CID",pt:"CID",es:"CID"},type:"cid",required:!0},{id:"mcc",label:{en:"Under MCC?",pt:"Sob MCC?",es:"\xBFBajo MCC?"},type:"yn",required:!0},{id:"outcome",label:{en:"Audit Outcome",pt:"Resultado da auditoria",es:"Resultado de la auditor\xEDa"},type:"text",required:!0},{id:"alink",label:{en:"Audit Link",pt:"Link da auditoria",es:"Enlace de la auditor\xEDa"},type:"link",required:!0},{id:"sme",label:{en:"SME sign-off",pt:"Aval do SME",es:"Visto bueno del SME"},type:"smeyes",required:!0}]},{kind:"kv",title:"General Details (Mandatory)",rows:[{id:"substatus",label:{en:"Current case Sub-Status:",pt:"Sub-status atual do caso:",es:"Subestado actual del caso:"},type:"derived",required:!0,na:!1,visible:!0,auto:"substatus",hint:{pt:"Vem do campo Sub-status no topo.",es:"Viene del campo Subestado, arriba.",en:"Comes from the Sub-status field at the top."}},{id:"next_followup",label:{en:"Next Follow up Date:",pt:"Data do pr\xF3ximo follow-up:",es:"Fecha del pr\xF3ximo follow-up:"},type:"date",required:!0,na:!0,visible:!0,auto:"followup",hint:{pt:"Data do pr\xF3ximo follow-up, ou NA.",es:"Fecha del pr\xF3ximo follow-up, o NA.",en:"Next follow-up date, or NA."}},{id:"case_comments",label:{en:"Case Comments:",pt:"Coment\xE1rios do caso:",es:"Comentarios del caso:"},type:"long",required:!0,na:!1,visible:!0,hint:{pt:"O que aconteceu no caso, com todos os detalhes e pr\xF3ximos passos.",es:"Lo que pas\xF3 en el caso, con todos los detalles y pr\xF3ximos pasos.",en:"What happened in the case, with all the details and next steps."}},{id:"audit_ss",label:{en:"Audit Screenshots:",pt:"Prints da auditoria:",es:"Capturas de la auditor\xEDa:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Link do print da auditoria.",es:"Enlace de la captura de la auditor\xEDa.",en:"Link to the audit screenshot."}},{id:"gam",label:{en:"GAM Ping, if any:",pt:"Ping ao GAM, se houver:",es:"Ping al GAM, si lo hubo:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print do ping ao GAM, se houve.",es:"Captura del ping al GAM, si lo hubo.",en:"Screenshot of the GAM ping, if there was one."}}]}]},impl_call:{name:"Implementation Call",cols:4,widths:[18,22,36,24],sections:[{kind:"cid",title:"CID-Level Details",columns:[{id:"tbw",label:{en:"To Be Worked?",pt:"A trabalhar?",es:"\xBFA trabajar?"},type:"tbw",required:!0},{id:"cid",label:{en:"CID",pt:"CID",es:"CID"},type:"cid",required:!0},{id:"tag",label:{en:"Tag implemented?",pt:"Tag implementada?",es:"\xBFEtiqueta implementada?"},type:"text",required:!0},{id:"caseid",label:{en:"Case ID mapping",pt:"Mapeamento do Case ID",es:"Mapeo del Case ID"},type:"text",required:!0}]},{kind:"kv",title:"General Details (Mandatory)",rows:[{id:"substatus",label:{en:"Current case Sub-status:",pt:"Sub-status atual do caso:",es:"Subestado actual del caso:"},type:"derived",required:!0,na:!1,visible:!0,auto:"substatus",hint:{pt:"Vem do campo Sub-status no topo.",es:"Viene del campo Subestado, arriba.",en:"Comes from the Sub-status field at the top."}},{id:"substatus_reason",label:{en:"Sub-status Reason:",pt:"Motivo do sub-status:",es:"Motivo del subestado:"},type:"long",required:!0,na:!1,visible:!0,hint:{pt:"Breve explica\xE7\xE3o do uso desse sub-status.",es:"Breve explicaci\xF3n del uso de este subestado.",en:"Brief explanation of why this sub-status was used."}},{id:"next_followup",label:{en:"Next Follow up Date:",pt:"Data do pr\xF3ximo follow-up:",es:"Fecha del pr\xF3ximo follow-up:"},type:"date",required:!0,na:!0,visible:!0,auto:"followup",hint:{pt:"Data do pr\xF3ximo follow-up, ou NA.",es:"Fecha del pr\xF3ximo follow-up, o NA.",en:"Next follow-up date, or NA."}},{id:"speakeasy",label:{en:"Speakeasy ID:",pt:"Speakeasy ID:",es:"Speakeasy ID:"},type:"speakeasy",required:!0,na:!0,visible:!0,hint:{pt:"ID exato da sess\xE3o do SpeakEasy.",es:"ID exacto de la sesi\xF3n de SpeakEasy.",en:"Exact SpeakEasy session ID."}},{id:"oncall_comments",label:{en:"On Call Comments:",pt:"Coment\xE1rios da call:",es:"Comentarios de la llamada:"},type:"long",required:!0,na:!1,visible:!0,hint:{pt:"O que aconteceu na call, com todos os detalhes e pr\xF3ximos passos.",es:"Lo que pas\xF3 en la llamada, con todos los detalles y pr\xF3ximos pasos.",en:"What happened on the call, with all the details and next steps."}},{id:"consent",label:{en:"Checked and obtained recording consent from the customer before proceeding with the call?",pt:"Verificou e obteve o consentimento do cliente para a grava\xE7\xE3o antes de seguir com a call?",es:"\xBFVerific\xF3 y obtuvo el consentimiento del cliente para la grabaci\xF3n antes de continuar con la llamada?"},type:"yesno",required:!0,na:!0,visible:!0,auto:"consent",hint:{pt:'Fora da Europa o padr\xE3o \xE9 Yes (a alternativa fica em "Alterar"). No caso da Europa o agente marca. NA para NI - Attempted Contact e IN - Not Reachable.',es:'Fuera de Europa el valor predeterminado es Yes (la alternativa est\xE1 en "Cambiar"). En el caso de Europa, lo marca el agente. NA para NI - Attempted Contact e IN - Not Reachable.',en:'Outside Europe the default is Yes (the alternative is under "Change"). For a Europe case the agent marks it. NA for NI - Attempted Contact and IN - Not Reachable.'}}]},{kind:"kv",title:"Screenshots (Mandatory)",rows:[{id:"oncall_ss",label:{en:"On Call Screenshot:",pt:"Print do On Call:",es:"Captura del On Call:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print mostrando o On Call e a data e hora do computador.",es:"Captura del On Call con la fecha y hora de la computadora.",en:"Screenshot showing the On Call and the computer's date and time."}},{id:"access_ss",label:{en:"Account verification access level:",pt:"N\xEDvel de acesso da verifica\xE7\xE3o da conta:",es:"Nivel de acceso de la verificaci\xF3n de la cuenta:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print do Google Ads, GTM e/ou GA4 mostrando o n\xEDvel de acesso do anunciante.",es:"Captura de Google Ads, GTM y/o GA4 con el nivel de acceso del anunciante.",en:"Screenshot of Google Ads, GTM and/or GA4 showing the advertiser's access level."}},{id:"gam",label:{en:"GAM Ping, if any:",pt:"Ping ao GAM, se houver:",es:"Ping al GAM, si lo hubo:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print do ping ao GAM, se houve.",es:"Captura del ping al GAM, si lo hubo.",en:"Screenshot of the GAM ping, if there was one."}},{id:"extra_all",label:{en:"All Additional Screenshots:",pt:"Todos os prints adicionais:",es:"Todas las capturas adicionales:"},type:"link",required:!1,na:!0,visible:!0,hint:{pt:"Opcional. Todo print necess\xE1rio ao andamento do caso.",es:"Opcional. Toda captura necesaria para el avance del caso.",en:"Optional. Any screenshot the case needs to move forward."}}]}]},interim:{name:"Interim check-ins",cols:3,widths:[30,48,22],sections:[{kind:"kv",title:"General Details (Mandatory)",rows:[{id:"substatus",label:{en:"Current case Sub-Status:",pt:"Sub-status atual do caso:",es:"Subestado actual del caso:"},type:"derived",required:!0,na:!1,visible:!0,auto:"substatus",hint:{pt:"Vem do campo Sub-status no topo.",es:"Viene del campo Subestado, arriba.",en:"Comes from the Sub-status field at the top."}},{id:"next_followup",label:{en:"Next Follow up Date:",pt:"Data do pr\xF3ximo follow-up:",es:"Fecha del pr\xF3ximo follow-up:"},type:"date",required:!0,na:!0,visible:!0,auto:"followup",hint:{pt:"Data do pr\xF3ximo follow-up, ou NA.",es:"Fecha del pr\xF3ximo follow-up, o NA.",en:"Next follow-up date, or NA."}},{id:"case_comments",label:{en:"Case Comments:",pt:"Coment\xE1rios do caso:",es:"Comentarios del caso:"},type:"long",required:!0,na:!1,visible:!0,hint:{pt:"O que aconteceu no caso, com todos os detalhes e pr\xF3ximos passos.",es:"Lo que pas\xF3 en el caso, con todos los detalles y pr\xF3ximos pasos.",en:"What happened in the case, with all the details and next steps."}},{id:"gam",label:{en:"GAM Ping, if any:",pt:"Ping ao GAM, se houver:",es:"Ping al GAM, si lo hubo:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print do ping ao GAM, se houve.",es:"Captura del ping al GAM, si lo hubo.",en:"Screenshot of the GAM ping, if there was one."}},{id:"extra_all",label:{en:"All Additional Screenshots:",pt:"Todos os prints adicionais:",es:"Todas las capturas adicionales:"},type:"link",required:!1,na:!0,visible:!0,hint:{pt:"Opcional.",es:"Opcional.",en:"Optional."}}]}]},triage:{name:"Initial Triage",cols:3,widths:[30,48,22],sections:[{kind:"kv",title:"General Details (Mandatory)",rows:[{id:"substatus",label:{en:"Current case Sub-Status:",pt:"Sub-status atual do caso:",es:"Subestado actual del caso:"},type:"derived",required:!0,na:!1,visible:!0,auto:"substatus",hint:{pt:"Vem do campo Sub-status no topo.",es:"Viene del campo Subestado, arriba.",en:"Comes from the Sub-status field at the top."}},{id:"next_followup",label:{en:"Next Follow up Date:",pt:"Data do pr\xF3ximo follow-up:",es:"Fecha del pr\xF3ximo follow-up:"},type:"date",required:!0,na:!0,visible:!0,auto:"followup",hint:{pt:"Data do pr\xF3ximo follow-up, ou NA.",es:"Fecha del pr\xF3ximo follow-up, o NA.",en:"Next follow-up date, or NA."}},{id:"case_comments",label:{en:"Case Comments:",pt:"Coment\xE1rios do caso:",es:"Comentarios del caso:"},type:"long",required:!0,na:!1,visible:!0,hint:{pt:"O que aconteceu no caso, com todos os detalhes e pr\xF3ximos passos.",es:"Lo que pas\xF3 en el caso, con todos los detalles y pr\xF3ximos pasos.",en:"What happened in the case, with all the details and next steps."}},{id:"gam",label:{en:"GAM Ping, if any:",pt:"Ping ao GAM, se houver:",es:"Ping al GAM, si lo hubo:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print do ping ao GAM, se houve.",es:"Captura del ping al GAM, si lo hubo.",en:"Screenshot of the GAM ping, if there was one."}}]}]},eligibility:{name:"Eligibility Verification",cols:5,widths:[16,17,20,25,22],sections:[{kind:"cid",title:"CID-Level Details",columns:[{id:"tbw",label:{en:"To Be Worked?",pt:"A trabalhar?",es:"\xBFA trabajar?"},type:"tbw",required:!0},{id:"cid",label:{en:"CID",pt:"CID",es:"CID"},type:"cid",required:!0},{id:"mcc",label:{en:"Under MCC?",pt:"Sob MCC?",es:"\xBFBajo MCC?"},type:"yn",required:!0},{id:"elig",label:{en:"Eligibility Status",pt:"Status de elegibilidade",es:"Estado de elegibilidad"},type:"text",required:!0},{id:"galactic",label:{en:"Galactic Screenshots",pt:"Prints do Galactic",es:"Capturas de Galactic"},type:"link",required:!0}]},{kind:"kv",title:"General Details (Mandatory)",rows:[{id:"substatus",label:{en:"Current case Sub-Status:",pt:"Sub-status atual do caso:",es:"Subestado actual del caso:"},type:"derived",required:!0,na:!1,visible:!0,auto:"substatus",hint:{pt:"Vem do campo Sub-status no topo.",es:"Viene del campo Subestado, arriba.",en:"Comes from the Sub-status field at the top."}},{id:"next_followup",label:{en:"Next Follow up Date:",pt:"Data do pr\xF3ximo follow-up:",es:"Fecha del pr\xF3ximo follow-up:"},type:"date",required:!0,na:!0,visible:!0,auto:"followup",hint:{pt:"Data do pr\xF3ximo follow-up, ou NA.",es:"Fecha del pr\xF3ximo follow-up, o NA.",en:"Next follow-up date, or NA."}},{id:"case_comments",label:{en:"Case Comments:",pt:"Coment\xE1rios do caso:",es:"Comentarios del caso:"},type:"long",required:!0,na:!1,visible:!0,hint:{pt:"O que aconteceu no caso, com todos os detalhes e pr\xF3ximos passos.",es:"Lo que pas\xF3 en el caso, con todos los detalles y pr\xF3ximos pasos.",en:"What happened in the case, with all the details and next steps."}},{id:"gam",label:{en:"GAM Ping, if any:",pt:"Ping ao GAM, se houver:",es:"Ping al GAM, si lo hubo:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print do ping ao GAM, se houve.",es:"Captura del ping al GAM, si lo hubo.",en:"Screenshot of the GAM ping, if there was one."}}]}]},extras:{name:"Additional details",cols:3,widths:[32,46,22],sections:[{kind:"kv",title:"Additional Details",rows:[{id:"europe_case",label:{en:"Europe case?",pt:"Caso da Europa?",es:"\xBFCaso de Europa?"},type:"derived",required:!0,na:!1,visible:!0,auto:"europe",when:{europe:!0},hint:{pt:'Marcado em "Caso da Europa", no topo.',es:'Se marca en "Caso de Europa", arriba.',en:'Set in "Europe case", at the top.'}},{id:"oncall",label:{en:"On Call signaled on time?",pt:"On Call signaled on time?",es:"On Call signaled on time?"},type:"text",required:!1,na:!0,visible:!0,when:{flow:"bau"},hint:{pt:"Como aparece na tela do caso. N\xE3o existe no fluxo LM.",es:"Como aparece en la pantalla del caso. No existe en el flujo LM.",en:"As shown on the case screen. Not used in the LM flow."}},{id:"gtm_ga4",label:{en:"GTM/GA4 verified:",pt:"GTM/GA4 verificado:",es:"GTM/GA4 verificado:"},type:"text",required:!1,na:!0,visible:!0,optIn:!0,requiredWhen:{substatusAny:["SO - Implementation Only","SO - Educational Only","SO - Troubleshooting Only","NI - Awaiting Validation"]},hint:{pt:"Obrigat\xF3rio quando houve implementa\xE7\xE3o ou valida\xE7\xE3o; opcional nos demais.",es:"Obligatorio cuando hubo implementaci\xF3n o validaci\xF3n; opcional en los dem\xE1s.",en:"Required when there was an implementation or validation; optional otherwise."}},{id:"ts_used",label:{en:"Used Tag Support?",pt:"Usou o Tag Support?",es:"\xBFUs\xF3 Tag Support?"},type:"yesno",required:!0,na:!1,visible:!0,default:"No",when:{tasksAny:["ads_conversion_tracking","ads_enhanced_conversions"]},hint:{pt:"S\xF3 para ACT e ECW. Com Yes, a task leva o aviso do Win Criteria. Lembre-se de preencher o Form.",es:"Solo para ACT y ECW. Con Yes, la task lleva el aviso del Win Criteria. Recuerde completar el Form.",en:"ACT and ECW only. With Yes, the task carries the Win Criteria notice. Remember to fill in the Form."}},{id:"ts_reason",label:{en:"Reason:",pt:"Motivo:",es:"Motivo:"},type:"text",required:!1,na:!0,visible:!0,when:{tasksAny:["ads_conversion_tracking","ads_enhanced_conversions"],rowIs:{id:"ts_used",v:"No"}},hint:{pt:"Por que o Tag Support n\xE3o foi usado.",es:"Por qu\xE9 no se us\xF3 Tag Support.",en:"Why Tag Support was not used."}},{id:"call_attempt",label:{en:"Call attempt:",pt:"Tentativa de liga\xE7\xE3o:",es:"Intento de llamada:"},type:"link",required:!0,na:!0,visible:!0,when:{substatusAny:["IN - Not Reachable"]},hint:{pt:"Link da evid\xEAncia da tentativa de liga\xE7\xE3o.",es:"Enlace de la evidencia del intento de llamada.",en:"Link to the evidence of the call attempt."}},{id:"ev_call1",label:{en:"Contact evidence: Call 1",pt:"Evid\xEAncia de contato: liga\xE7\xE3o 1",es:"Evidencia de contacto: llamada 1"},type:"link",required:!1,na:!0,visible:!0,when:{substatusAny:["NI - Attempted Contact"]},hint:{pt:"Evid\xEAncia da primeira liga\xE7\xE3o.",es:"Evidencia de la primera llamada.",en:"Evidence of the first call."}},{id:"ev_call2",label:{en:"Contact evidence: Call 2",pt:"Evid\xEAncia de contato: liga\xE7\xE3o 2",es:"Evidencia de contacto: llamada 2"},type:"link",required:!1,na:!0,visible:!0,when:{substatusAny:["NI - Attempted Contact"]},hint:{pt:"Evid\xEAncia da segunda liga\xE7\xE3o.",es:"Evidencia de la segunda llamada.",en:"Evidence of the second call."}},{id:"ev_msg",label:{en:"Contact evidence: Message to the AM",pt:"Evid\xEAncia de contato: mensagem ao AM",es:"Evidencia de contacto: mensaje al AM"},type:"link",required:!1,na:!0,visible:!0,when:{substatusAny:["NI - Attempted Contact"]},hint:{pt:"Evid\xEAncia da mensagem ao AM.",es:"Evidencia del mensaje al AM.",en:"Evidence of the message to the AM."}}]}]}},segments:[{key:"all",name:"ALL TASKS",select:"multi",showTitle:!1,always:["general"],blocks:[{b:"general",title:"General details",when:"Sempre. Vale para toda call, tentativa de contato ou fechamento no mesmo dia."},{b:"before",title:"Before implementation",when:"S\xF3 ACT e ECW. Depois de appointments e fechamentos no mesmo dia.",suggest:{tasksAny:["ads_conversion_tracking","ads_enhanced_conversions"]}},{b:"impl",title:"Implementation",when:"S\xF3 ACT e ECW. Depois de appointments e fechamentos no mesmo dia.",suggest:{tasksAny:["ads_conversion_tracking","ads_enhanced_conversions"]}},{b:"after",title:"After implementation",when:"S\xF3 ACT e ECW. Em follow-ups ou ao fechar depois da janela (n\xE3o \xE9 o dia do appointment).",suggest:{tasksAny:["ads_conversion_tracking","ads_enhanced_conversions"]}},{b:"consult",title:"Consult routing path",when:"Ao consultar ou transferir o caso para M&A.",suggest:{substatusAny:["IN - Troubleshooting [Transferred]","IN - Out of Scope - Rerouted"]}}]},{key:"sbse",name:"ECL SBS-E",select:"single",showTitle:!0,blocks:[{b:"audit",title:"Phase 1: Readiness Audit",when:"Depois da auditoria conclu\xEDda E revisada/aprovada pelo SME."},{b:"impl_call",title:"Phase 2: Implementation Call",when:"Depois da call de implementa\xE7\xE3o."},{b:"interim",title:"Interim Check-Ins or Pre-Impl. Closure: Seller/Advertiser Engagement & Updates",when:"Ao fechar o caso no pre-call ou ao fazer follow-up com seller/anunciante."}]},{key:"mms",name:"ECL MMS",select:"single",showTitle:!0,blocks:[{b:"triage",title:"Phase 0: Initial Triage",when:"Depois do e-mail FR (CR 0A) enviado, mas com os CIDs ainda por confirmar."},{b:"eligibility",title:"Phase 1: Eligibility Verification",when:"FR enviado e elegibilidade dos CIDs confirmados checada no Galactic."},{b:"audit",title:"Phase 2: Readiness Audit & Scheduling",when:"Depois da auditoria conclu\xEDda E revisada/aprovada pelo SME."},{b:"impl_call",title:"Phase 3: Pre-Implementation Call",when:"Depois da call de pre-implementa\xE7\xE3o (3-way) ou ao fechar depois dela."},{b:"interim",title:"Interim Check-Ins or Pre-Impl. Closure: Seller/Advertiser Engagement & Updates",when:"Ao fechar na pr\xE9-implementa\xE7\xE3o ou ao fazer follow-up com seller/anunciante."}]}]};var Hd="note_blocks",Ud="note_layouts",Kd=e=>JSON.parse(JSON.stringify(e)),Qt=e=>console.warn(`[notetable] ${e}`);function Jd(e){try{let t=JSON.parse(e||"null");return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch{return null}}var Vd=e=>!!(e&&e.label&&typeof e.label=="object"&&String(e.label.en||"").trim());function Ig(e,t){let a=typeof t=="string"?Jd(t):t;if(!a)return Qt(`bloco '${e}' ileg\xEDvel; mantido o embutido.`),null;let o=a.cols,n=Array.isArray(a.widths)?a.widths:[],i=n.reduce((s,l)=>s+(Number(l)||0),0);if(![3,4,5,6].includes(o)||n.length!==o||Math.abs(i-100)>.001)return Qt(`bloco '${e}' com grade inv\xE1lida; mantido o embutido.`),null;let r=[];for(let s of Array.isArray(a.sections)?a.sections:[]){if(!s||!Ld.includes(s.kind)){Qt(`bloco '${e}': se\xE7\xE3o '${s&&s.kind}' desconhecida, ignorada.`);continue}if(s.kind==="cid"){let c=Array.isArray(s.columns)?s.columns:[];if(!(c.length===o&&c.every(u=>u&&yr.test(String(u.id||""))&&_d.includes(u.type)&&Vd(u)))){Qt(`bloco '${e}': se\xE7\xE3o por CID com coluna desconhecida, ignorada.`);continue}r.push(s);continue}if(s.kind==="group"&&o!==4){Qt(`bloco '${e}': grupo fora de 4 colunas, ignorado.`);continue}let l=new Set,p=(Array.isArray(s.rows)?s.rows:[]).filter(c=>!c||!yr.test(String(c.id||""))||l.has(c.id)?(Qt(`bloco '${e}': linha sem id v\xE1lido, ignorada.`),!1):Id.includes(c.type)?Vd(c)?(l.add(c.id),!0):(Qt(`bloco '${e}': linha '${c.id}' sem r\xF3tulo, ignorada.`),!1):(Qt(`bloco '${e}': linha '${c.id}' de tipo '${c.type}' desconhecido, ignorada.`),!1));p.length&&r.push({...s,rows:p})}return r.length?{...a,sections:r}:(Qt(`bloco '${e}' sem se\xE7\xE3o que este app desenhe; mantido o embutido.`),null)}function _g(e,t,a){let o=typeof t=="string"?Jd(t):t;if(!o||!["multi","single"].includes(o.select)||!Array.isArray(o.blocks))return Qt(`segmento '${e}' ileg\xEDvel; mantido o embutido.`),null;let n=o.blocks.filter(r=>r&&a[r.b]?!0:(Qt(`segmento '${e}': bloco '${r&&r.b}' desconhecido, ignorado.`),!1));if(!n.length)return Qt(`segmento '${e}' sem bloco conhecido; mantido o embutido.`),null;let i={key:e,...o,blocks:n};if(Array.isArray(o.always)){let r=n.map(s=>s.b);i.always=o.always.filter(s=>r.includes(s))}else delete i.always;return i}var Wd=e=>(Array.isArray(e)?e:[]).slice().sort((t,a)=>(t.sortOrder||0)-(a.sortOrder||0));function Dg(e,t,a){let o=Kd(e),n=0;for(let i of Wd(t)){let r=String(i&&i.key||"").trim();if(!r)continue;let s=Ig(r,i.value);s&&(o.blocks[r]=s,n++)}for(let i of Wd(a)){let r=String(i&&i.key||"").trim();if(!r)continue;let s=_g(r,i.value,o.blocks);if(!s)continue;let l=o.segments.findIndex(p=>p.key===r);l>=0?o.segments[l]=s:o.segments.push(s),n++}return{catalog:o,applied:n}}var Qn=Kd(Ir),Mg=!1;function Dr(){return Qn}function Yd(e,t){let{catalog:a,applied:o}=Dg(Ir,e,t);return Qn=a,Mg=o>0,o>0}var Qd=new Set,_r=null;function Xd(){for(let e of Qd)try{e(Qn)}catch(t){console.warn("[notetable] assinante do cat\xE1logo falhou.",t)}}async function Og(){let e=ke.getCachedContent(Hd),t=ke.getCachedContent(Ud);Yd(e,t)&&Xd();try{let[a,o]=await Promise.all([ke.fetchContentModule(Hd),ke.fetchContentModule(Ud)]);Yd(a,o)&&Xd()}catch(a){console.warn("[notetable] cat\xE1logo da Central indispon\xEDvel; usando o embutido.",a)}return Qn}function Zd(e){return e&&Qd.add(e),_r||(_r=Og()),_r}var qg=`
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

`;function ep(){if(document.getElementById("cw-notetable-styles"))return;let e=document.createElement("style");e.id="cw-notetable-styles",e.textContent=qg,document.head.appendChild(e)}var Ha=(e,t,a)=>e===1?t:a,Mr={pt:{title:"Nota em tabela",help:"Gera a nota do caso nas tabelas do padr\xE3o novo (ALL TASKS, ECL SBS-E e ECL MMS). O Case Notes de sempre continua no m\xF3dulo dele.",substatus:"Sub-status",choose:"Escolher",pickLabel:"Escolher sub-status",searchPh:"Buscar por nome ou atalho",searchLabel:"Buscar sub-status",noResult:"Sem resultado na lista",useTyped:e=>`Usar \u201C${e}\u201D`,useHint:"ex.: PI - \u2026",tasks:"Tasks",tasksNone:"Nenhuma task marcada",change:"Alterar",tasksClose:"Pronto",blocks:"Blocos",phase:"Fase",suggested:" (sugerido)",note:"Nota",type:"Tipo",typeLabel:"Tipo de nota",lang:"Idioma",flow:"Fluxo",europe:"Europa",europeLabel:"Caso da Europa",europeHint:"Com Sim, voc\xEA marca o consentimento",inEurope:"Caso da Europa",outEurope:"Fora da Europa",salesHint:"Sales program no CRM: ",noteFocus:"Tipo de nota, idioma, fluxo e Europa. Abra para trocar.",ctxPick:"Digite o nome ou o atalho (ex.: ts so verif) para achar o sub-status.",ctxOffList:"Fora da lista oficial. Confirme que est\xE1 id\xEAntico ao Q+.",ctxFuDays:e=>`Follow-up sugerido: ${e} dias \xFAteis.`,ctxFuNa:"Follow-up n\xE3o se aplica a este sub-status.",ctxFuAgent:"O follow-up deste sub-status \xE9 decis\xE3o sua.",emptyTitle:"Escolha o sub-status",emptySub:"Os campos da nota aparecem em seguida, s\xF3 os que pedem a sua aten\xE7\xE3o.",autoCard:"Preenchido automaticamente",autoTag:"Auto",autoTitle:"Preenchido automaticamente. Editar tira a marca.",defaultTag:"Padr\xE3o",defaultTitle:"Valor padr\xE3o. Use Alterar para mudar.",europeMark:"Caso da Europa: marque",more:e=>`Mais op\xE7\xF5es \xB7 ${e}`,less:"Menos op\xE7\xF5es",phDate:"AAAA-MM-DD",phLink:"Colar link ou NA",phSpeakeasy:"Colar o ID",phText:"Digitar",phComment:"Coment\xE1rio (opcional)",bdTitle:e=>`+${e} dias \xFAteis`,bdAria:e=>`Daqui a ${e} dias \xFAteis`,autoSearch:"Auto busca",speakeasyFound:"Speakeasy ID encontrado no case log.",commentBtn:"Coment\xE1rio da linha",commentAdd:"Adicionar coment\xE1rio (vai na coluna Additional Comments)",commentIs:e=>`Coment\xE1rio: ${e}`,commentOf:e=>`Coment\xE1rio de ${e}`,naMark:"Marcar como NA",naUndo:"Desfazer NA",undo:"Desfazer",cidDetails:"Detalhes por CID",cidHint:"A lista de CIDs fica com o caso: trocar de fase n\xE3o a perde.",addCid:"+ CID",removeCid:e=>`Remover CID ${e}`,maxCid:"M\xE1ximo de 6 CIDs, como no template.",scenario:"Cen\xE1rio r\xE1pido",scenarioMenu:e=>`${e} cen\xE1rios`,scenarioApplied:"Cen\xE1rio aplicado nos campos de texto.",prints:"Prints por task",pending:e=>`${e} ${Ha(e,"pendente","pendentes")}`,ready:"Pronta para preencher",readyPill:"Pronta",next:"Pr\xF3xima",markRest:"Marcar o restante como NA",marked:e=>`${e} ${Ha(e,"linha marcada","linhas marcadas")} como NA.`,nothingNa:"Nada para marcar como NA.",nothingPending:"Nada pendente.",clear:"Limpar",save:"Guardar",copy:"Copiar",fill:"Preencher",cleared:"Formul\xE1rio limpo.",copied:"Texto copiado.",inserted:"Texto inserido e copiado!",notOpened:"N\xE3o consegui abrir o editor de nota do CRM. A nota est\xE1 copiada: cole com Ctrl+V.",emailAuto:"Preencher e-mail automaticamente",preview:"Pr\xE9via da nota",tabAria:e=>e?`Ver a nota (${e} ${Ha(e,"pendente","pendentes")})`:"Ver a nota (pronta)",stickyAria:"Voltar ao contexto da nota",noSubstatus:"Sem sub-status",drafts:"Rascunhos",draftsEmpty:"Nenhum rascunho guardado",draftSaved:"Rascunho guardado.",draftDelete:"Excluir",draftOpened:"Rascunho aberto.",needSubstatus:"Escolha o sub-status primeiro.",restoreConfirm:"H\xE1 uma nota em tabela n\xE3o terminada da \xFAltima sess\xE3o. Restaurar?",restored:"Sess\xE3o restaurada.",split:"Alternar para Split & Transfer",pendingCell:"pendente",capturing:"Lendo o caso\u2026"},es:{title:"Nota en tabla",help:"Genera la nota del caso en las tablas del est\xE1ndar nuevo (ALL TASKS, ECL SBS-E y ECL MMS). El Case Notes de siempre sigue en su m\xF3dulo.",substatus:"Subestado",choose:"Elegir",pickLabel:"Elegir subestado",searchPh:"Buscar por nombre o atajo",searchLabel:"Buscar subestado",noResult:"Sin resultados en la lista",useTyped:e=>`Usar \u201C${e}\u201D`,useHint:"ej.: PI - \u2026",tasks:"Tasks",tasksNone:"Ninguna task marcada",change:"Cambiar",tasksClose:"Listo",blocks:"Bloques",phase:"Fase",suggested:" (sugerido)",note:"Nota",type:"Tipo",typeLabel:"Tipo de nota",lang:"Idioma",flow:"Flujo",europe:"Europa",europeLabel:"Caso de Europa",europeHint:"Con S\xED, usted marca el consentimiento",inEurope:"Caso de Europa",outEurope:"Fuera de Europa",salesHint:"Sales program en el CRM: ",noteFocus:"Tipo de nota, idioma, flujo y Europa. \xC1brala para cambiar.",ctxPick:"Escriba el nombre o el atajo (ej.: ts so verif) para encontrar el subestado.",ctxOffList:"Fuera de la lista oficial. Confirme que sea id\xE9ntico al de Q+.",ctxFuDays:e=>`Follow-up sugerido: ${e} d\xEDas h\xE1biles.`,ctxFuNa:"El follow-up no aplica a este subestado.",ctxFuAgent:"El follow-up de este subestado lo decide usted.",emptyTitle:"Elija el subestado",emptySub:"Los campos de la nota aparecen enseguida, solo los que piden su atenci\xF3n.",autoCard:"Completado autom\xE1ticamente",autoTag:"Auto",autoTitle:"Completado autom\xE1ticamente. Editarlo quita la marca.",defaultTag:"Predeterminado",defaultTitle:"Valor predeterminado. Use Cambiar para modificarlo.",europeMark:"Caso de Europa: marque",more:e=>`M\xE1s opciones \xB7 ${e}`,less:"Menos opciones",phDate:"AAAA-MM-DD",phLink:"Pegar enlace o NA",phSpeakeasy:"Pegar el ID",phText:"Escribir",phComment:"Comentario (opcional)",bdTitle:e=>`+${e} d\xEDas h\xE1biles`,bdAria:e=>`Dentro de ${e} d\xEDas h\xE1biles`,autoSearch:"B\xFAsqueda auto",speakeasyFound:"Speakeasy ID encontrado en el case log.",commentBtn:"Comentario de la fila",commentAdd:"Agregar comentario (va en la columna Additional Comments)",commentIs:e=>`Comentario: ${e}`,commentOf:e=>`Comentario de ${e}`,naMark:"Marcar como NA",naUndo:"Deshacer NA",undo:"Deshacer",cidDetails:"Detalles por CID",cidHint:"La lista de CIDs queda con el caso: cambiar de fase no la pierde.",addCid:"+ CID",removeCid:e=>`Quitar CID ${e}`,maxCid:"M\xE1ximo de 6 CIDs, como en la plantilla.",scenario:"Escenario r\xE1pido",scenarioMenu:e=>`${e} escenarios`,scenarioApplied:"Escenario aplicado en los campos de texto.",prints:"Capturas por task",pending:e=>`${e} ${Ha(e,"pendiente","pendientes")}`,ready:"Lista para completar",readyPill:"Lista",next:"Siguiente",markRest:"Marcar el resto como NA",marked:e=>`${e} ${Ha(e,"fila marcada","filas marcadas")} como NA.`,nothingNa:"Nada para marcar como NA.",nothingPending:"Nada pendiente.",clear:"Limpiar",save:"Guardar",copy:"Copiar",fill:"Completar",cleared:"Formulario limpio.",copied:"Texto copiado.",inserted:"\xA1Texto insertado y copiado!",notOpened:"No pude abrir el editor de notas del CRM. La nota est\xE1 copiada: p\xE9guela con Ctrl+V.",emailAuto:"Completar el correo autom\xE1ticamente",preview:"Vista previa de la nota",tabAria:e=>e?`Ver la nota (${e} ${Ha(e,"pendiente","pendientes")})`:"Ver la nota (lista)",stickyAria:"Volver al contexto de la nota",noSubstatus:"Sin subestado",drafts:"Borradores",draftsEmpty:"Ning\xFAn borrador guardado",draftSaved:"Borrador guardado.",draftDelete:"Eliminar",draftOpened:"Borrador abierto.",needSubstatus:"Elija el subestado primero.",restoreConfirm:"Hay una nota en tabla sin terminar de la \xFAltima sesi\xF3n. \xBFRestaurar?",restored:"Sesi\xF3n restaurada.",split:"Cambiar a Split & Transfer",pendingCell:"pendiente",capturing:"Leyendo el caso\u2026"},en:{title:"Table note",help:"Builds the case note as the new standard's tables (ALL TASKS, ECL SBS-E and ECL MMS). The usual Case Notes stays in its own module.",substatus:"Sub-status",choose:"Choose",pickLabel:"Choose sub-status",searchPh:"Search by name or shortcut",searchLabel:"Search sub-status",noResult:"No match in the list",useTyped:e=>`Use \u201C${e}\u201D`,useHint:"e.g. PI - \u2026",tasks:"Tasks",tasksNone:"No task selected",change:"Change",tasksClose:"Done",blocks:"Blocks",phase:"Phase",suggested:" (suggested)",note:"Note",type:"Type",typeLabel:"Note type",lang:"Language",flow:"Flow",europe:"Europe",europeLabel:"Europe case",europeHint:"With Yes, you mark the consent",inEurope:"Europe case",outEurope:"Outside Europe",salesHint:"Sales program in the CRM: ",noteFocus:"Note type, language, flow and Europe. Open to change.",ctxPick:"Type the name or the shortcut (e.g. ts so verif) to find the sub-status.",ctxOffList:"Not in the official list. Make sure it matches Q+ exactly.",ctxFuDays:e=>`Suggested follow-up: ${e} business days.`,ctxFuNa:"Follow-up does not apply to this sub-status.",ctxFuAgent:"The follow-up for this sub-status is your call.",emptyTitle:"Choose the sub-status",emptySub:"The note fields show up next, only the ones that need your attention.",autoCard:"Filled in automatically",autoTag:"Auto",autoTitle:"Filled in automatically. Editing removes the mark.",defaultTag:"Default",defaultTitle:"Default value. Use Change to edit it.",europeMark:"Europe case: mark it",more:e=>`More options \xB7 ${e}`,less:"Fewer options",phDate:"YYYY-MM-DD",phLink:"Paste a link or NA",phSpeakeasy:"Paste the ID",phText:"Type",phComment:"Comment (optional)",bdTitle:e=>`+${e} business days`,bdAria:e=>`In ${e} business days`,autoSearch:"Auto search",speakeasyFound:"Speakeasy ID found in the case log.",commentBtn:"Row comment",commentAdd:"Add a comment (goes in the Additional Comments column)",commentIs:e=>`Comment: ${e}`,commentOf:e=>`Comment for ${e}`,naMark:"Mark as NA",naUndo:"Undo NA",undo:"Undo",cidDetails:"CID-level details",cidHint:"The CID list stays with the case: switching phase keeps it.",addCid:"+ CID",removeCid:e=>`Remove CID ${e}`,maxCid:"Up to 6 CIDs, as in the template.",scenario:"Quick scenario",scenarioMenu:e=>`${e} scenarios`,scenarioApplied:"Scenario applied to the text fields.",prints:"Screenshots per task",pending:e=>`${e} pending`,ready:"Ready to fill",readyPill:"Ready",next:"Next",markRest:"Mark the rest as NA",marked:e=>`${e} ${Ha(e,"row","rows")} marked as NA.`,nothingNa:"Nothing to mark as NA.",nothingPending:"Nothing pending.",clear:"Clear",save:"Save",copy:"Copy",fill:"Fill",cleared:"Form cleared.",copied:"Text copied.",inserted:"Text inserted and copied!",notOpened:"I couldn't open the CRM note editor. The note is copied: paste it with Ctrl+V.",emailAuto:"Fill the email automatically",preview:"Note preview",tabAria:e=>e?`View the note (${e} pending)`:"View the note (ready)",stickyAria:"Back to the note context",noSubstatus:"No sub-status",drafts:"Drafts",draftsEmpty:"No saved drafts",draftSaved:"Draft saved.",draftDelete:"Delete",draftOpened:"Draft opened.",needSubstatus:"Choose the sub-status first.",restoreConfirm:"There is an unfinished table note from your last session. Restore it?",restored:"Session restored.",split:"Switch to Split & Transfer",pendingCell:"pending",capturing:"Reading the case\u2026"}};function K(e,...t){let a=Mr[ge()]||Mr.pt,o=a[e]!==void 0?a[e]:Mr.pt[e];return typeof o=="function"?o(...t):o===void 0?e:o}var Fg="cw-notetable-popup",Rg="cw-btn-notetable",oa=_i({storageKey:"cw_notetable_parking_lot",emergencyKey:"cw_notetable_emergency_save"}),tp={"SO - Educational Only":"SO_Education_Only","IN - Out of Scope - Rerouted":"IN_Out_of_Scope_Rerouted"};function Zn(e){if(tp[e])return tp[e];let t=Object.entries(st).find(([,a])=>a.name===e);return t?t[0]:null}var zg={NI:"Need Info",SO:"Solution Offered",IN:"Inactive",AS:"Assigned",DC:"Discarded"},$g=["NI","SO","IN","AS","DC"].map(e=>[zg[e],Hn.filter(t=>t[0].startsWith(e+" ")).map(t=>t[0])]),Pg={general:"General details",before:"Before implementation",impl:"Implementation",after:"After implementation",consult:"Consult routing path",audit:"Readiness audit",impl_call:"Implementation call",interim:"Interim check-ins",triage:"Initial triage",eligibility:"Eligibility verification",extras:"Additional details"},Bg={"all.before":"Before","all.impl":"Implementation","all.after":"After","all.consult":"Consult","sbse.audit":"Phase 1 \xB7 Audit","sbse.impl_call":"Phase 2 \xB7 Impl. call","sbse.interim":"Interim","mms.triage":"Phase 0 \xB7 Triage","mms.eligibility":"Phase 1 \xB7 Eligibility","mms.audit":"Phase 2 \xB7 Audit","mms.impl_call":"Phase 3 \xB7 Pre-impl.","mms.interim":"Interim"},Gg={date:"Date",next_followup:"Follow-up",cid:"CID",consent:"Consent"},jg={ads_conversion_tracking:"ACT",ads_enhanced_conversions:"ECW",ga4_event_tracking:"GA4",gtm_installation:"GTM"},Hg=6,Ug={chev:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>',check:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',checkc:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',search:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>',close:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',cmt:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/></svg>',cmtOn:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>',up:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>',note:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',left:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',split:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',history:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>'};function q(e,t={},...a){let o=document.createElement(e);for(let[n,i]of Object.entries(t))n==="class"?o.className=i:n==="style"?o.style.cssText=i:n.startsWith("on")&&typeof i=="function"?o.addEventListener(n.slice(2),i):i===!0?o.setAttribute(n,""):i!==!1&&i!=null&&o.setAttribute(n,i);for(let n of a.flat())n==null||n===!1||o.append(n.nodeType?n:document.createTextNode(String(n)));return o}function xt(e){let t=document.createElement("template");return t.innerHTML=Ug[e].trim(),t.content.firstChild}var tn=e=>String(e||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();function ap(e){let t=tn(e);return!t||t==="n a"?null:/\bportu|\bpt\b/.test(t)?"pt":/\bspan|\bespan|\bes\b/.test(t)?"es":/\bengl|\bingl|\ben\b/.test(t)?"en":null}var op=e=>{e.style.height="auto",e.style.height=Math.max(44,e.scrollHeight)+"px"};function np(){let e="v1.0.0";ep();let t=Dr(),a=Un(),o=Et(),n=!1,i={ctxOpen:!1,autoOpen:!1,more:{},drawer:!1,showPending:!1,pick:!1,tasksOpen:!1,tasksAuto:!1,scenOpen:!1,draftsOpen:!1,pi:0,split:!1,blocksTouched:!1},r={caseKey:null,cid:"",salesProgram:"",capturing:!1,restoredChecked:!1},s=!1,l=!0,p=new Fo;p.currentLang=o;let c=f=>(bt[ge()]||bt.pt)[f]||bt.pt[f]||f,m=Cn(()=>Rr(),c,p);p.subscribe(()=>{let f=[...p.forcedScreenshots];JSON.stringify(f)!==JSON.stringify(a.forced)&&(a.forced=f,dt(),Fe())});let u=q("div",{id:Fg,class:"cw-module-window"});Object.assign(u.style,ft,{right:"100px",width:"560px",height:"760px",overflow:"visible",backgroundColor:"transparent",boxShadow:"none",backdropFilter:"none",webkitBackdropFilter:"none",borderRadius:"20px"});let h=q("section",{class:"nt-win",role:"dialog","aria-label":K("title")});h.style.boxShadow="0 20px 40px rgba(0,0,0,.12)";let L={popup:u,googleLine:null},S=rt(u,K("title"),e,K("help"),L,()=>Ao());S.style.flex="none";let C=q("div",{class:"nt-hbtn no-drag",role:"button",tabindex:"0",title:K("split"),"aria-label":K("split"),onclick:f=>{f.stopPropagation(),jr()}},xt("split")),D=q("div",{class:"nt-hbtn no-drag",role:"button",tabindex:"0",title:K("drafts"),"aria-label":K("drafts"),onclick:f=>{f.stopPropagation(),i.draftsOpen=!i.draftsOpen,Co()}},xt("history"));[C,D].forEach(f=>f.addEventListener("keydown",Q=>{(Q.key==="Enter"||Q.key===" ")&&(Q.preventDefault(),f.click())}));let G=S.lastElementChild;G&&(G.insertBefore(D,G.firstChild),G.insertBefore(C,G.firstChild));let F=q("button",{class:"nt-sticky",type:"button","aria-label":K("stickyAria")}),R=q("span"),le=q("button",{class:"nt-btn sm",type:"button"}),te=q("button",{class:"nt-btn sm t",type:"button"}),ee=q("div",{class:"nt-pbar",role:"status","aria-live":"polite"},q("span",{class:"nt-d"}),R,q("span",{class:"nt-grow"}),le,te),$=q("div"),A=q("div"),y=q("div",{class:"nt-form"}),z=q("div",{class:"nt-body"},$,A,y),U=q("div",{class:"nt-bw"},F,ee,z),M=q("span"),Z=q("button",{class:"nt-status",type:"button"},q("span",{class:"nt-d"}),M),de=q("button",{class:"nt-btn",type:"button"}),ve=q("button",{class:"nt-btn",type:"button"}),re=q("button",{class:"nt-btn t",type:"button"}),be=q("button",{class:"nt-btn p",type:"button"}),pe=q("input",{type:"checkbox",checked:!0}),he=q("span"),T=q("label",{class:"nt-emailrow"},pe,he);pe.addEventListener("change",()=>{l=pe.checked});let Y=q("footer",{class:"nt-foot"},T,q("div",{class:"nt-foot-row"},Z,q("span",{class:"nt-grow"}),de,ve,re,be),q("div",{class:"nt-credit"},`created by ${Wt}`)),se=q("div",{class:"nt-split"}),V=Tn(()=>jr());V.style.height="100%",se.append(V);let O=q("div",{class:"nt-drafts",hidden:!0,role:"dialog","aria-label":K("drafts")});h.append(S,U,se,Y,O);let k=q("span",{class:"nt-bd"}),j=q("button",{class:"nt-tab",type:"button","aria-expanded":"false","aria-controls":"cw-nt-drawer-in"},k,xt("note"),(()=>{let f=xt("left");return f.classList.add("nt-chev"),f})()),ie=q("span",{class:"nt-pill"}),P=q("div",{class:"nt-eyebrow"}),X=q("div",{class:"nt-note-card"}),ce=q("div",{class:"nt-drawer-in",id:"cw-nt-drawer-in",inert:!0},q("div",{class:"nt-d-head"},P,ie),q("div",{class:"nt-d-scroll"},X)),v=q("aside",{class:"nt-drawer"},j,ce);u.append(v,h);let b=q("div",{class:"no-drag"});Object.assign(b.style,Yt),u.append(b),Xt(u,b),document.body.appendChild(u);let d=q("div",{class:"nt-prints"},m.screenshotsElement),N=q("div",{class:"nt-tasks"},m.selectionElement);function _(){let f=!1;m.screenshotsElement.querySelectorAll(".cw-screen-card").forEach(Q=>{let me=Q.querySelector('input[id^="name-"]')?.id||"",we=!!Jo.find(De=>me.startsWith(`name-${De}-`))&&!Q.classList.contains("ts-success");Q.style.display=we?"none":"",we||(f=!0)}),d.style.display=f&&Ia(t,a.seg)?"":"none"}new MutationObserver(()=>{_(),g()}).observe(m.screenshotsElement,{childList:!0,subtree:!0}),m.screenshotsElement.addEventListener("input",()=>{g(),dt(),ha()});function g(){let f=[];m.screenshotsElement.querySelectorAll(".cw-screen-card").forEach(Q=>{if(Q.style.display==="none")return;let me=Q.querySelector('input[id^="name-"]')?.value||"";Q.querySelectorAll('input[id^="screen-"]').forEach(oe=>{let we=oe.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"";f.push({label:`${me} \u2014 ${we}`.trim(),v:oe.value})})}),a.taskPrints=f}let x=()=>La(t,a.seg)||t.segments[0],I=f=>It(f.label,o),E=f=>I(f).replace(/:\s*$/,""),W=f=>f.hint&&typeof f.hint=="object"?f.hint[ge()]||f.hint.pt||"":String(f.hint||""),H=f=>It(f,"en").replace(/\s*\(Mandatory\)/,"").replace(/^General Details$/,"Details"),ae=()=>(bt[o]||bt.pt).ts_output_disclaimer||"",fe=()=>({lang:o,tsDisclaimer:ae()}),Te=f=>aa(a,f),Me=(f,Q)=>ja(t,a,f,{...fe(),blockId:Q}),Ee=f=>wo(t,a,f),wt=f=>Vn(t,a,f),Ge=()=>Pd(t,a,{cid:r.cid}),zt=(f,Q)=>f.type==="derived"&&(f.auto==="substatus"||f.auto==="europe"||f.auto==="tasks"&&Me(f,Q)!==null),ea=(f,Q)=>{if(f.type==="derived")return!1;let me=Te(f.id);return Me(f,Q)!==null&&!!(me.auto||me.defaulted||Yn(t,a,f,Q)&&!String(me.v||"").trim()&&!me.na)},yt=f=>!wt(f)&&!(f.optIn&&a.optIn.includes(f.id)),na=(f,Q)=>(f.rows||[]).filter(Ee).filter(me=>!zt(me,Q));function _a(){let f=[];for(let Q of ca(t,a))for(let me of t.blocks[Q.b].sections)for(let oe of na(me,Q.b))f.push([oe,Q.b]);return f}let jt=()=>Bd(t,a,fe()),So=null;function dt(){clearTimeout(So),So=setTimeout(()=>{a.substatus?oa.saveEmergency(Or()):oa.clearEmergency()},2e3)}function Or(){return{subStatus:a.substatus,st:JSON.parse(JSON.stringify(a)),noteLang:o,caseKey:r.caseKey,tasks:m.getCheckedElements(),prints:[...m.screenshotsElement.querySelectorAll('input[id^="screen-"]')].map(f=>[f.id,f.value])}}function qr(f){if(!(!f||!f.st)){m.reset(),(f.tasks||[]).forEach(Q=>m.setTaskCount(Q.value,Q.count)),a=Object.assign(Un(),f.st),f.noteLang&&(o=f.noteLang,n=!0,p.currentLang=o),p.tagSupportUsed=Te("ts_used").v==="Yes",p.forcedScreenshots=new Set(a.forced||[]),p.notify();for(let[Q,me]of f.prints||[]){let oe=m.screenshotsElement.querySelector(`#${CSS.escape(Q)}`);oe&&(oe.value=me)}g(),Fe()}}function an(){a=Un({seg:sn(),flow:Ko(),cids:[Qo(r.cid)]}),a.active=Kn(t,a.seg,Nt("appointmentTime")||"",new Date),Object.assign(i,{ctxOpen:!1,autoOpen:!1,more:{},showPending:!1,scenOpen:!1,pi:0,blocksTouched:!1}),m.reset(),p.setTagSupportUsed(!1),Fr(),Ge()}async function dp(){let f=`${await Ja()}|${Fa()}`;r.caseKey!==null&&r.caseKey!==f&&(r.caseKey=f,r.cid="",an(),Fe()),r.caseKey=f,r.capturing=!0,ha();try{let Q=Fa();r.cid=Q&&Q!=="N/A"?Q:"",r.salesProgram=bi();let me=ap(hn());n||(o=me||Et()),p.currentLang=o,(!a.cids.length||a.cids.length===1&&!a.cids[0].cid)&&(a.cids=[Object.assign(a.cids[0]||Qo(),{cid:r.cid})]),i.blocksTouched||(a.active=Kn(t,a.seg,Nt("appointmentTime")||"",new Date)),m.getCheckedElements().length||Fr(),Ge()}finally{r.capturing=!1,Fe()}}function Fr(){let f=Oa("appointmentTasks");if(!f.length||!Ia(t,a.seg)){i.tasksAuto=!1,i.tasksOpen=!1;return}let Q=Object.entries(Ze).map(([oe,we])=>[oe,tn(oe),tn(we.name)]),me=f.map(oe=>Q.find(([,we,De])=>tn(oe)===we||tn(oe)===De)).filter(Boolean);me.forEach(([oe])=>m.toggleTask(oe,!0)),i.tasksAuto=me.length>0&&me.length===f.length,i.tasksOpen=!i.tasksAuto}function Rr(){a.tasks=m.getCheckedElements().map(f=>({key:f.value,name:Ze[f.value]?.name||f.value,count:f.count})),i.tasksAuto=!1,Ge(),on(),dt(),Fe()}function on(){let f=Wn(t,a);p.tagSupportUsed!==f&&p.setTagSupportUsed(f)}function nn(f,Q,me,oe,we){let De=q("div",{class:"nt-seg"+(we?" sm":""),role:"radiogroup","aria-label":f});return Q.forEach(([Ae,Ce])=>{let ye=q("button",{type:"button",role:"radio","aria-checked":String(Ae===me),tabindex:Ae===me?"0":"-1",onclick:()=>oe(Ae)},Ce);ye.addEventListener("keydown",xe=>{if(xe.key!=="ArrowRight"&&xe.key!=="ArrowLeft")return;xe.preventDefault();let We=(Q.findIndex(Ke=>Ke[0]===me)+(xe.key==="ArrowRight"?1:Q.length-1))%Q.length;oe(Q[We][0]),queueMicrotask(()=>{let Ke=u.querySelector(`[aria-label="${CSS.escape(f)}"] [aria-checked=true]`);Ke&&Ke.focus()})}),De.append(ye)}),De}function rn(f,Q){let me=q("div",{class:"nt-fn"},Q||"");return me.dataset.def=Q||"",q("div",{class:"nt-cw"},f,me)}function Ua(f,Q){let me=f.closest(".nt-cw"),oe=me&&me.querySelector(":scope>.nt-fn");oe&&(oe.textContent=Q||oe.dataset.def||"")}function zr(f,Q){X.querySelectorAll("tr[data-row]").forEach(me=>me.classList.toggle("nt-hl",Q&&me.dataset.row===f))}function $r(f){let Q=[...y.querySelectorAll(".nt-row[data-row]")],me=Q.indexOf(f.closest(".nt-row[data-row]"));for(let oe=me+1;oe<Q.length;oe++){let we=Q[oe].querySelector("input[type=text],textarea");if(we&&!we.value.trim()&&!Q[oe].querySelector(".nt-na[aria-pressed=true]"))return we.focus(),!0}return!1}function ei(f,Q,me){let oe=Te(f.id),we=oe.na&&f.na!==!1,De=Me(f,Q),Ae=Yn(t,a,f,Q)&&!String(oe.v||"").trim()&&!oe.na,Ce=q("div",{class:"nt-row"+(f.type==="long"?" stack":"")+(me?" pending":""),"data-row":f.id}),ye=[];(oe.auto||Ae)&&ye.push(q("span",{class:"nt-tag",title:K("autoTitle")},xt("check"),K("autoTag"))),oe.defaulted&&ye.push(q("span",{class:"nt-tag",title:K("defaultTitle")},K("defaultTag"))),f.auto==="consent"&&a.europe&&!we&&De===null&&ye.push(q("span",{class:"nt-tag warn"},K("europeMark"))),Ce.append(q("label",{class:"nt-rl",for:`nt-f-${f.id}`},E(f),...ye));let xe=q("div",{class:"nt-rv"+(f.type==="date"?" date":"")+(f.type==="speakeasy"?" sp":"")+(f.type==="cid"?" cidv":"")+(f.type==="link"?" lk":"")+(f.type==="link"&&Zo(oe.v)?" ok":"")}),Re=null,We=()=>{en(a,f.id),Ce.querySelectorAll(".nt-tag").forEach(_e=>_e.remove()),dt()},Ke=_e=>{let tt=_e==="input"?q("input",{id:`nt-f-${f.id}`,type:"text",autocomplete:"off",spellcheck:"false",placeholder:pp(f)}):q("textarea",{id:`nt-f-${f.id}`,rows:"3",placeholder:K("phText")});return tt.value=oe.v||"",tt.addEventListener("input",()=>{We(),oe.v=tt.value,Ce.classList.toggle("bad",zd(f,tt.value)),f.type==="link"&&xe.classList.toggle("ok",Zo(tt.value)),_e==="textarea"&&op(tt),f.id==="ts_used"&&on(),ha()}),_e==="input"&&(tt.addEventListener("keydown",Da=>{Da.key==="Enter"&&(Da.preventDefault(),$r(Ce))}),f.type==="link"&&tt.addEventListener("paste",()=>setTimeout(()=>{Zo(tt.value)&&$r(Ce)},0))),f.type==="cid"&&tt.addEventListener("blur",()=>{let Da=Cr(tt.value);Da!==tt.value&&(tt.value=oe.v=Da,ha())}),tt};if(we)xe.append(q("span",{class:"nt-val muted"},"NA"));else if(Ae)xe.append(q("span",{class:"nt-val muted"},"NA"));else if(f.type==="derived"){let _e=f.auto==="tasks"?De?a.tasks.map(tt=>tt.name).join(", "):K("tasksNone"):De||"\u2014";xe.append(q("span",{class:"nt-val"+(De?"":" empty")},_e))}else if(f.type==="yesno")f.auto==="consent"&&!a.europe&&oe.defaulted&&!oe.altOpen?(xe.append(q("span",{class:"nt-val"},"Yes")),Re=q("button",{class:"nt-na",type:"button",onclick:()=>{oe.altOpen=!0,Fe()}},K("change"))):xe.append(nn(E(f),[["Yes","Yes"],["No","No"]],oe.v,_e=>{We(),oe.v=_e,oe.na=!1,f.id==="ts_used"&&on(),Fe()},!0));else if(f.type==="long"){let _e=Ke("textarea");xe.append(_e),queueMicrotask(()=>op(_e))}else xe.append(Ke("input")),f.type==="link"&&xe.append(q("span",{class:"nt-ck","aria-hidden":"true"},xt("check"))),f.type==="date"&&f.auto==="followup"&&xe.append(q("div",{class:"nt-quick"},[2,3,5].map(_e=>q("button",{class:"nt-chip",type:"button",title:K("bdTitle",_e),"aria-label":K("bdAria",_e),onclick:()=>{We(),oe.v=kr(_e),oe.na=!1,Fe()}},"+"+_e)))),f.type==="speakeasy"&&xe.append(q("button",{class:"nt-chip",type:"button",onclick:async()=>{let _e=xe.querySelector("input");await no(_e),_e.value&&_e.value.trim()&&(We(),oe.v=_e.value.trim(),oe.na=!1,Fe(),ne(K("speakeasyFound")))}},K("autoSearch")));Ce.append(xe);let Ie=f.na!==!1&&f.type!=="derived"||f.type==="derived"&&f.auto==="tasks";if(Re)Ce.append(Re);else{let _e=q("div",{class:"nt-acts"});f.type!=="derived"&&_e.append(q("button",{class:"nt-cmt"+(oe.comment||oe.commentOpen?" on":" nt-ghost"),type:"button","aria-label":K("commentBtn"),"aria-pressed":String(!!oe.commentOpen),title:oe.comment?K("commentIs",oe.comment):K("commentAdd"),onclick:()=>{oe.commentOpen=!oe.commentOpen,Fe(),oe.commentOpen&&queueMicrotask(()=>{let tt=y.querySelector(`[data-row="${f.id}"] .nt-cmrow input`);tt&&tt.focus()})}},xt(oe.comment?"cmtOn":"cmt"))),Ie&&_e.append(q("button",{class:"nt-na nt-ghost","aria-pressed":String(we),type:"button",title:we?K("naUndo"):K("naMark"),onclick:()=>{We(),oe.na=!oe.na,Fe()}},we?K("undo"):"NA")),Ce.append(_e)}if(oe.commentOpen&&f.type!=="derived"){let _e=q("input",{type:"text",autocomplete:"off",spellcheck:"false",placeholder:K("phComment"),"aria-label":K("commentOf",E(f))});_e.value=oe.comment||"",_e.addEventListener("input",()=>{oe.comment=_e.value;let tt=Ce.querySelector(".nt-cmt");tt&&tt.replaceChildren(xt(_e.value.trim()?"cmtOn":"cmt")),dt(),ha()}),_e.addEventListener("blur",()=>{!_e.value.trim()&&oe.commentOpen&&(oe.commentOpen=!1,Fe())}),Ce.append(q("div",{class:"nt-cmrow"},_e))}return Ce.addEventListener("focusin",()=>{Ua(Ce,W(f)),zr(f.id,!0)}),Ce.addEventListener("focusout",()=>{Ua(Ce,""),zr(f.id,!1)}),Ce}function pp(f){return{date:K("phDate"),cid:"XXX-XXX-XXXX",link:K("phLink"),speakeasy:K("phSpeakeasy")}[f.type]||K("phText")}function up(f,Q,me,oe,we){let Ae=na(Q,me).filter(Ie=>!ea(Ie,me)),Ce=Ae.filter(Ie=>!yt(Ie)),ye=Ae.filter(yt),xe=(Q.rows||[]).filter(Ie=>Ie.optIn&&Ie.visible!==!1&&!a.optIn.includes(Ie.id)&&!(Ie.requiredWhen&&vo(t,a,Ie.requiredWhen))&&vo(t,a,Ie.when));if(!Ce.length&&!ye.length&&!xe.length&&!we)return null;let Re=q("div",{class:"nt-card"});we&&Re.append(we),Ce.forEach(Ie=>Re.append(ei(Ie,me,oe(Ie.id))));let We=ye.length+xe.length,Ke=!!i.more[f];return We&&(Re.append(q("button",{class:"nt-more",type:"button","aria-expanded":String(Ke),onclick:()=>{i.more[f]=!Ke,Fe()}},q("span",{},Ke?K("less"):K("more",We)),xt("chev"))),Ke&&(ye.forEach(Ie=>Re.append(ei(Ie,me,oe(Ie.id)))),xe.forEach(Ie=>Re.append(q("div",{class:"nt-row add"},q("span"),q("button",{class:"nt-add-btn",type:"button",onclick:()=>{a.optIn.push(Ie.id),dt(),Fe()}},"+ "+E(Ie)),q("span")))))),rn(Re,"")}function mp(f,Q){let me=i.autoOpen,oe=q("button",{class:"nt-auto-h",type:"button","aria-expanded":String(me),onclick:()=>{i.autoOpen=!me,Fe()}},q("span",{class:"nt-ic"},xt("checkc")),K("autoCard"),q("span",{class:"nt-c"},String(f.length),xt("chev"))),we=q("div",{class:"nt-card"},oe);return me?f.forEach(([De,Ae])=>we.append(ei(De,Ae,Q(De.id)))):we.append(q("div",{class:"nt-auto-sum"},f.map(([De,Ae])=>q("span",{},(Gg[De.id]||E(De))+" ",q("b",{},Me(De,Ae)))))),rn(we,"")}function gp(f,Q){let me=q("div",{});return me.append(q("div",{class:"nt-eyebrow"},K("cidDetails"))),a.cids.forEach((oe,we)=>{let De=q("div",{class:"nt-card"});f.columns.forEach((Ae,Ce)=>{let ye=`cid:${we}:${Ae.id}`,xe=q("div",{class:"nt-row"+(Q(ye)?" pending":""),"data-row":ye}),Re=It(Ae.label,o).replace(/:\s*$/,"");xe.append(q("label",{class:"nt-rl",for:`nt-c-${we}-${Ae.id}`},Re+(Ce===0&&a.cids.length>1?` ${we+1}`:"")));let We=q("div",{class:"nt-rv"+(Ae.type==="cid"?" cidv":"")}),Ke=(Ie,_e,tt)=>We.append(nn(`${Re} ${we+1}`,Ie,_e,Da=>{tt(Da),dt(),Fe()},!0));if(Ae.type==="tbw")Ke([["TBW","TBW"],["N-TBW","N-TBW"]],oe.tbw,Ie=>{oe.tbw=Ie});else if(Ae.type==="yn")Ke([["YES","YES"],["NO","NO"]],oe[Ae.id],Ie=>{oe[Ae.id]=Ie});else if(Ae.type==="smeyes")Ke([["YES","YES"],["NO","NO"]],oe.sme||"YES",Ie=>{oe.sme=Ie});else{let Ie=q("input",{id:`nt-c-${we}-${Ae.id}`,type:"text",autocomplete:"off",spellcheck:"false",placeholder:Ae.type==="cid"?"XXX-XXX-XXXX":Ae.type==="link"?K("phLink"):K("phText")});Ie.value=oe[Ae.id]||"",Ie.addEventListener("input",()=>{oe[Ae.id]=Ie.value,dt(),ha()}),Ae.type==="cid"&&Ie.addEventListener("blur",()=>{let _e=Cr(Ie.value);_e!==Ie.value&&(Ie.value=oe[Ae.id]=_e,ha())}),We.append(Ie)}xe.append(We),Ce===0&&a.cids.length>1?xe.append(q("button",{class:"nt-na",type:"button","aria-label":K("removeCid",we+1),onclick:()=>{a.cids.splice(we,1),dt(),Fe()}},xt("close"))):xe.append(q("span")),xe.addEventListener("focusin",()=>Ua(xe,K("cidHint"))),xe.addEventListener("focusout",()=>Ua(xe,"")),De.append(xe)}),me.append(rn(De,""))}),me.append(q("div",{class:"nt-sec"},q("button",{class:"nt-chip",type:"button",onclick:()=>{if(a.cids.length>=Hg){ne(K("maxCid"));return}a.cids.push(Qo()),dt(),Fe()}},K("addCid")))),me}function fp(){let f=Zn(a.substatus),Q=f?eo(f,a.flow):[];if(!Q.length)return null;let me=([we])=>q("button",{class:Q.length>3?"nt-opt":"nt-chip",type:"button",onclick:()=>bp(we,f)},to(we,f));if(Q.length<=3)return q("div",{class:"nt-row stackc"},q("div",{class:"nt-rl"},K("scenario")),q("div",{class:"nt-chips"},Q.map(me)));let oe=q("button",{class:"nt-chip",type:"button","aria-expanded":String(i.scenOpen),onclick:()=>{i.scenOpen=!i.scenOpen,Fe()}},K("scenarioMenu",Q.length),xt("chev"));return q("div",{class:"nt-row stackc"},q("div",{class:"nt-rl"},K("scenario")),q("div",{class:"nt-chips"},oe),i.scenOpen?q("div",{class:"nt-scen-menu"},Q.map(me)):null)}function bp(f,Q){let me=Za(_t[f],o,f)||{},oe=new Set(_a().map(([xe])=>xe.id)),we=wr.find(xe=>oe.has(xe)),De=bt[o]||bt.pt,Ae=(xe,Re)=>{let We=en(a,xe),Ke=String(We.v||"").trim();Ke.includes(Re.trim())||(We.v=Ke?`${Ke}
${Re}`:Re),We.na=!1},Ce=[];for(let[xe,Re]of Object.entries(me)){if(!xe.startsWith("field-")||typeof Re!="string"||!Re.trim())continue;let We=xe.slice(6);if(We==="SCREENSHOTS"){i.more["extras.0"]=!0;continue}if(["SPEAKEASY_ID","ON_CALL","GTM_GA4_VERIFICADO"].includes(We)){let Ie={SPEAKEASY_ID:"speakeasy",ON_CALL:"oncall",GTM_GA4_VERIFICADO:"gtm_ga4"}[We];/^n\/?a$/i.test(Re.trim())&&oe.has(Ie)&&(en(a,Ie).na=!0);continue}if(We==="REASON_COMMENTS"&&oe.has("substatus_reason")){Ae("substatus_reason",Re);continue}if(We==="DIA"&&oe.has("next_followup")){en(a,"next_followup").v=Re.trim();continue}let Ke=String(De[We.toLowerCase()]||We).replace(/^[^\p{L}\p{N}]+/u,"").replace(/:\s*$/,"").trim();Ce.push(`**${Ke}:** ${Re.trim()}`)}we&&Ce.length&&Ae(we,Ce.join(`
`));let ye=_t[f]&&_t[f].linkedTask;ye&&Ia(t,a.seg)&&Ze[ye]&&m.toggleTask(ye,!0),dt(),Fe(),ne(K("scenarioApplied"))}function hp(){if(!a.substatus)return K("ctxPick");if(!qd(a.substatus))return K("ctxOffList");let f=Sr(a.substatus);return typeof f=="number"?K("ctxFuDays",f):f==="na"?K("ctxFuNa"):K("ctxFuAgent")}let sn=()=>ud(t.segments.map(f=>f.key));function vp(){$.innerHTML="";let f=x(),Q=q("div",{class:"nt-card ctx"}),me=q("button",{class:"nt-pick",type:"button","aria-haspopup":"listbox","aria-expanded":String(i.pick),onclick:Ae=>{Ae.stopPropagation(),i.pick?ba():wp(me)}},q("span",{class:"nt-rl"},K("substatus")),q("span",{class:"nt-v"+(a.substatus?"":" empty")},a.substatus||K("choose")),xt("chev"));if(me.dataset.role="substatus",Q.append(me),Ia(t,a.seg)){let Ae=a.tasks.map(We=>jg[We.key]||We.name),Ce=q("div",{class:"nt-row chiprow","data-ctx":"tasks"},q("span",{class:"nt-rl"},K("tasks"))),ye=a.tasks.length?q("span",{class:"nt-tasks-sum"},Ae.join(", ")):q("span",{class:"nt-val empty"},K("tasksNone")),xe=i.tasksAuto&&!i.tasksOpen?q("span",{class:"nt-tag",title:K("autoTitle")},xt("check"),K("autoTag")):null,Re=i.tasksOpen?K("tasksClose"):a.tasks.length?K("change"):K("choose");Ce.append(q("div",{class:"nt-rv"},ye,xe),q("button",{class:"nt-na",type:"button","aria-expanded":String(i.tasksOpen),onclick:()=>{i.tasksOpen=!i.tasksOpen,Fe()}},Re)),Q.append(Ce),i.tasksOpen&&Q.append(N)}let oe=f.blocks.filter(Ae=>!(f.select==="multi"&&(f.always||[]).includes(Ae.b))).map(Ae=>{let Ce=a.active.includes(Ae.b),ye=$d(t,a,Ae)&&!Ce;return q("button",{class:"nt-chip",type:"button","aria-pressed":String(Ce),title:(Ae.when||"")+(ye?K("suggested"):""),onclick:()=>{i.blocksTouched=!0,f.select==="single"?a.active=[Ae.b]:a.active=Ce?a.active.filter(xe=>xe!==Ae.b):[...a.active,Ae.b],dt(),Fe()}},Bg[`${f.key}.${Ae.b}`]||It(Ae.title,"en"),ye?q("span",{class:"nt-dot","aria-hidden":"true"}):null)});Q.append(q("div",{class:"nt-row chiprow","data-ctx":"blocks"},q("span",{class:"nt-rl"},f.select==="multi"?K("blocks"):K("phase")),q("div",{class:"nt-chips"},oe),q("span")));let we=[o.toUpperCase(),a.flow.toUpperCase(),a.europe?K("inEurope"):K("outEurope")].join(" \xB7 "),De=q("button",{class:"nt-pick",type:"button","aria-expanded":String(i.ctxOpen),onclick:()=>{i.ctxOpen=!i.ctxOpen,Fe()}},q("span",{class:"nt-rl"},K("note")),q("span",{class:"nt-v"+(a.europe?" warn":"")},a.seg!==sn()?q("b",{class:"nt-segtag"},f.name):null,we),xt("chev"));if(De.dataset.role="note",De.addEventListener("focusin",()=>Ua(De,K("noteFocus"))),De.addEventListener("focusout",()=>Ua(De,"")),Q.append(De),i.ctxOpen){let Ae=(Ce,ye,xe,Re)=>q("div",{class:"nt-row"},q("span",{class:"nt-rl"},Ce),q("div",{class:"nt-rv"},nn(Ce,ye,xe,Re,!0)),q("span"));Q.append(q("div",{class:"nt-row"},q("span",{class:"nt-rl"},K("type")),q("div",{class:"nt-rv"},nn(K("typeLabel"),t.segments.map(Ce=>[Ce.key,Ce.name]),a.seg,Ce=>xp(Ce),!0),q("div",{class:"nt-cap2"},K("salesHint"),q("span",{},r.salesProgram||"\u2014"))),q("span"))),Q.append(Ae(K("lang"),[["pt","PT"],["es","ES"],["en","EN"]],o,Ce=>{o=Ce,n=!0,p.setLanguage(Ce),dt(),Fe()})),Q.append(Ae(K("flow"),[["bau","BAU"],["lm","LM"]],a.flow,Ce=>{a.flow=Ce,Ge(),dt(),Fe()})),Q.append(q("div",{class:"nt-row"},q("span",{class:"nt-rl"},K("europe")),q("span",{class:"nt-val muted",style:"font-size:12px;line-height:16px"},K("europeHint")),q("button",{class:"nt-sw",type:"button",role:"switch","aria-checked":String(a.europe),"aria-label":K("europeLabel"),onclick:()=>{a.europe=!a.europe,Ge(),dt(),Fe()}})))}$.append(rn(Q,hp()))}function xp(f){a.seg!==f&&(a.seg=f,a.active=Kn(t,f,Nt("appointmentTime")||"",new Date),md(f),Ge(),on(),dt(),Fe())}let Va=null;function ba(){Va&&Va.remove(),Va=null,i.pick=!1;let f=$.querySelector('[data-role="substatus"]');f&&f.setAttribute("aria-expanded","false")}function wp(f){ba(),i.pick=!0;let Q=f.getBoundingClientRect().bottom-U.getBoundingClientRect().top+4;Va=q("div",{class:"nt-pop",role:"dialog","aria-label":K("pickLabel"),style:`top:${Q}px`});let me=q("input",{type:"text",placeholder:K("searchPh"),autocomplete:"off","aria-label":K("searchLabel")}),oe=q("div",{class:"nt-pop-l",role:"listbox"});oe.style.maxHeight=Math.max(160,U.clientHeight-Q-72)+"px",Va.append(q("div",{class:"nt-pop-s"},xt("search"),me),oe);let we=ye=>ra[Zn(ye)]||"",De=ye=>{a.substatus=ye,ba(),Ge(),dt(),Fe();let xe=$.querySelector('[data-role="substatus"]');xe&&xe.focus()},Ae=ye=>q("button",{class:"nt-opt"+(ye===a.substatus?" on":""),type:"button",role:"option","aria-selected":String(ye===a.substatus),onclick:()=>De(ye)},q("span",{},ye),ye===a.substatus?q("span",{class:"nt-ck"},xt("check")):q("span",{class:"nt-hk"},we(ye))),Ce=ye=>{oe.innerHTML="";let xe=ye.trim().toLowerCase(),Re=!1;for(let[We,Ke]of $g){let Ie=Ke.filter(_e=>!xe||_e.toLowerCase().includes(xe)||we(_e).toLowerCase().includes(xe));Ie.length&&(Re=!0,oe.append(q("div",{class:"nt-pop-g"},We)),Ie.forEach(_e=>oe.append(Ae(_e))))}xe&&!Re&&oe.append(q("div",{class:"nt-pop-g"},K("noResult")),q("button",{class:"nt-opt",type:"button",onclick:()=>De(ye.trim())},q("span",{},K("useTyped",ye.trim())),q("span",{class:"nt-hk"},K("useHint"))))};me.addEventListener("input",()=>Ce(me.value)),me.addEventListener("keydown",ye=>{if(ye.key==="Escape"&&(ye.stopPropagation(),ba(),f.focus()),ye.key==="Enter"){ye.preventDefault();let xe=oe.querySelector(".nt-opt");xe&&xe.click()}if(ye.key==="ArrowDown"){ye.preventDefault();let xe=oe.querySelector(".nt-opt");xe&&xe.focus()}}),oe.addEventListener("keydown",ye=>{let xe=[...oe.querySelectorAll(".nt-opt")],Re=xe.indexOf(document.activeElement);ye.key==="ArrowDown"&&(ye.preventDefault(),xe[Math.min(xe.length-1,Re+1)].focus()),ye.key==="ArrowUp"&&(ye.preventDefault(),Re<=0?me.focus():xe[Re-1].focus()),ye.key==="Escape"&&(ye.stopPropagation(),ba(),f.focus())}),Ce(""),U.append(Va),f.setAttribute("aria-expanded","true"),me.focus()}u.addEventListener("mousedown",f=>{i.pick&&!f.target.closest(".nt-pop")&&!f.target.closest('[data-role="substatus"]')&&ba()});function yp(){if(y.innerHTML="",!a.substatus){y.append(q("div",{class:"nt-empty-s"},q("b",{},K("emptyTitle")),K("emptySub"))),d.remove();return}let f=new Set(jt().map(we=>we.key)),Q=we=>i.showPending&&f.has(we),me=[],oe=new Set;_a().forEach(([we,De])=>{ea(we,De)&&!oe.has(we.id)&&(oe.add(we.id),me.push([we,De]))}),me.length&&y.append(mp(me,Q));for(let we of ca(t,a)){let De=t.blocks[we.b],Ae=we.b===Ga,Ce=[];De.sections.forEach((ye,xe)=>{if(ye.kind==="cid"){Ce.push(gp(ye,Q));return}let Re=`${we.b}.${xe}`,We=!Ae&&na(ye,we.b).some(Ie=>wr.includes(Ie.id))?fp():null,Ke=up(Re,ye,we.b,Q,We);Ke&&(xe>0&&Ce.push(q("div",{class:"nt-sub-h"},H(ye.title))),Ce.push(Ke))}),Ae&&Ia(t,a.seg)&&Ce.push(q("div",{class:"nt-sub-h"},K("prints")),d),Ce.length&&y.append(q("div",{class:"nt-eyebrow"},Pg[we.b]||It(we.title,"en")),...Ce)}_()}function ha(){let Q=jt().length,me=!Q&&!!a.substatus&&ca(t,a).length>0;X.innerHTML=Lr(t,a,{...fe(),live:!0,pendingLabel:K("pendingCell")})||"",M.textContent=r.capturing?K("capturing"):me?K("ready"):K("pending",Q||(a.substatus?0:1)),Z.classList.toggle("ready",me),be.classList.toggle("blocked",!me||r.capturing),re.classList.toggle("blocked",!me||r.capturing),k.className="nt-bd"+(me?" ok":""),k.replaceChildren(me?xt("check"):document.createTextNode(String(Q))),ie.className="nt-pill"+(me?" ok":""),ie.textContent=me?K("readyPill"):K("pending",Q),j.setAttribute("aria-label",K("tabAria",me?0:Q)),F.replaceChildren(),[...a.seg!==sn()?[x().name]:[],a.flow.toUpperCase(),o.toUpperCase(),a.substatus||K("noSubstatus")].forEach((we,De)=>{De&&F.append(q("i",{},"\xB7")),F.append(we)}),F.append(xt("up")),Q||(i.showPending=!1),ee.classList.toggle("on",i.showPending&&Q>0),R.textContent=K("pending",Q);let oe=ra[Zn(a.substatus)];T.hidden=!oe,ti()}function ti(){F.classList.toggle("on",z.scrollTop>A.offsetTop-8&&!ee.classList.contains("on"))}function Sp(){let f=S.querySelector("span");f&&(f.textContent=K("title")),h.setAttribute("aria-label",K("title"));let Q=u.querySelector(".cw-help-description");Q&&(Q.textContent=K("help"));let me=u.querySelector(".cw-help-title");me&&(me.textContent=K("title")),C.title=K("split"),C.setAttribute("aria-label",K("split")),D.title=K("drafts"),D.setAttribute("aria-label",K("drafts")),F.setAttribute("aria-label",K("stickyAria")),le.textContent=K("next"),te.textContent=K("markRest"),de.textContent=K("clear"),ve.textContent=K("save"),re.textContent=K("copy"),be.textContent=K("fill"),he.textContent=K("emailAuto"),P.textContent=K("preview")}function Fe(){let f=z.scrollTop;ba(),t=Dr(),a.taskPrints=a.taskPrints||[],Sp(),vp(),yp(),ha(),Co(),z.scrollTop=f,ti()}function ai(f){i.drawer=f;let Q=u.getBoundingClientRect().left;v.classList.toggle("over",f&&Q<552),v.classList.toggle("open",f),j.setAttribute("aria-expanded",String(f)),f?ce.removeAttribute("inert"):ce.setAttribute("inert","")}function oi(f){let Q=y.querySelector(`[data-row="${CSS.escape(f)}"]`);if(Q||(i.autoOpen=!0,ca(t,a).forEach(oe=>t.blocks[oe.b].sections.forEach((we,De)=>{i.more[`${oe.b}.${De}`]=!0})),Fe(),Q=y.querySelector(`[data-row="${CSS.escape(f)}"]`)),!Q)return;Q.scrollIntoView({block:"center",behavior:"smooth"});let me=Q.querySelector("input,textarea,button");me&&me.focus({preventScroll:!0})}function Pr(){i.showPending=!0,i.pi=0,Fe();let f=jt()[0];f&&oi(f.key)}function Cp(){let f=jt().map(Q=>Q.key);f.length&&(i.pi=(i.pi+1)%f.length,oi(f[i.pi]))}function Br(){return a.substatus?r.capturing?!1:jt().length||!ca(t,a).length?(w.playError(),Pr(),!1):!0:(w.playError(),ne(K("needSubstatus"),{error:!0}),!1)}let Gr=()=>Lr(t,a,fe());function Ap(){Br()&&(ta(Gr()),w.playClick(),ne(K("copied")))}async function Ep(){if(!Br())return;let f=Gr(),Q=ra[Zn(a.substatus)];ta(f),Ao();let me=Pa();try{let oe=await Aa();oe?(oe.focus(),document.execCommand("insertHTML",!1,f),Ca(oe),l&&Q&&await co(Q),ne(K("inserted")),w.playSuccess(),kn(),an(),oa.clearEmergency(),Fe()):(w.playError(),ne(K("notOpened"),{error:!0}),Ao())}finally{me()}}function kp(){an(),oa.clearEmergency(),Fe(),ne(K("cleared"))}function Tp(){if(!a.substatus){w.playError(),ne(K("needSubstatus"),{error:!0});return}oa.save(Or()),an(),oa.clearEmergency(),Fe(),ne(K("draftSaved"))}function Np(){let f=Gd(t,a,fe());dt(),Fe(),ne(f?K("marked",f):K("nothingNa"))}function Co(){let f=oa.getAll();if(D.querySelector(".nt-hcount")?.remove(),f.length&&D.append(q("span",{class:"nt-hcount","aria-hidden":"true"})),O.hidden=!i.draftsOpen,!!i.draftsOpen){if(O.replaceChildren(),!f.length){O.append(q("div",{class:"nt-empty-s"},K("draftsEmpty")));return}f.forEach(Q=>{let me=new Date(Q.timestamp).toLocaleString();O.append(q("div",{class:"nt-opt",role:"button",tabindex:"0","data-draft":Q.id,onclick:oe=>{oe.target.closest(".nt-na")||(qr(Q),oa.delete(Q.id),i.draftsOpen=!1,Co(),ne(K("draftOpened")))}},q("span",{},`${Q.subStatus} \xB7 ${me}`),q("button",{class:"nt-na",type:"button",onclick:()=>{oa.delete(Q.id),Co()}},K("draftDelete"))))})}}function jr(){i.split=!i.split,u.classList.toggle("nt-split-on",i.split),L.googleLine&&(L.googleLine.style.background=i.split?"linear-gradient(to right, #8e24aa, #7b1fa2)":"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)")}j.addEventListener("click",()=>ai(!i.drawer)),F.addEventListener("click",()=>z.scrollTo({top:0,behavior:"smooth"})),z.addEventListener("scroll",ti,{passive:!0}),le.addEventListener("click",Cp),te.addEventListener("click",Np),Z.addEventListener("click",()=>{jt().length?Pr():ne(K("nothingPending"))}),de.addEventListener("click",kp),ve.addEventListener("click",Tp),re.addEventListener("click",Ap),be.addEventListener("click",Ep),X.addEventListener("click",f=>{let Q=f.target.closest("tr[data-row]");Q&&oi(Q.dataset.row)}),u.addEventListener("keydown",f=>{if(f.key==="Escape"){if(i.pick){f.stopPropagation(),ba();return}if(i.draftsOpen){f.stopPropagation(),i.draftsOpen=!1,Co();return}i.drawer&&(f.stopPropagation(),ai(!1))}});async function Ao(){if(s=!ht(u),s?Je():Qe(),ct(s,u,Rg),!s){ai(!1);return}if(Fe(),await dp(),!r.restoredChecked){r.restoredChecked=!0;let f=oa.getEmergency();f&&!a.substatus&&(await ot(K("restoreConfirm"))?(qr(f),ne(K("restored"))):oa.clearEmergency())}}return je(()=>{m.setLanguage&&m.setLanguage(c),Fe()}),va(f=>{!n&&!ap(hn())&&(o=f,p.setLanguage(f),Fe())}),io(()=>{m.refreshCatalog(),Rr()}),Zd(()=>Fe()),a.seg=sn(),a.flow=Ko(),a.active=Er(t,a.seg),a.cids=[Qo("")],Ge(),Fe(),Ao.isOpen=()=>s,Ao}var Ct={notes:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',precall:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-9v2h9V7zm0 8h-9v2h9v-2zM5.54 11L2 7.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L5.54 11zm0 8L2 15.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L5.54 19z"/></svg>',email:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',library:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',timezone:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',configs:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>',broadcast:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',enter:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>',arrowDown:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',arrowUp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>',bolt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>',notetable:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9z"/></svg>'};function Vg(){if(document.getElementById("cw-palette-styles"))return;let e=document.createElement("style");e.id="cw-palette-styles",e.textContent=`
        .cw-palette-overlay {
            position: fixed; inset: 0;
            background: rgba(32,33,36,0.4);
            backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
            z-index: 2147483647;
            display: flex; align-items: flex-start; justify-content: center;
            padding-top: 14vh;
            opacity: 0;
            transition: opacity 0.2s ease;
        }
        /* Sem pointer-events: none no estado fechado: o overlay fica no DOM
           por 200ms depois de fechar, e nesse intervalo ele precisa continuar
           engolindo o clique. Sem isso, o 2\xBA clique de um duplo clique num item
           atravessava a palette e ca\xEDa no CRM. */
        .cw-palette-overlay.active { opacity: 1; }

        .cw-palette {
            width: 560px; max-width: 90vw;
            background: rgba(255,255,255,0.98);
            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            border-radius: 20px;
            box-shadow: 0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.5);
            overflow: hidden;
            transform: scale(0.96) translateY(-8px);
            transition: transform 0.25s var(--cw-ease-decelerate);
            font-family: 'Google Sans', Roboto, sans-serif;
        }
        .cw-palette-overlay.active .cw-palette { transform: scale(1) translateY(0); }
        @media (prefers-reduced-motion: reduce) {
            .cw-palette-overlay, .cw-palette { transition: opacity 0.15s ease !important; transform: none !important; }
        }

        .cw-palette-search { display: flex; align-items: center; gap: 12px; padding: 18px 20px; border-bottom: 1px solid #F1F3F4; }
        .cw-palette-search-icon { color: #9AA0A6; display: flex; flex-shrink: 0; }
        .cw-palette-search-icon svg { width: 20px; height: 20px; }
        .cw-palette-input { flex: 1; border: none; outline: none; background: transparent; font-size: 16px; color: #202124; font-family: inherit; }
        .cw-palette-input::placeholder { color: #9AA0A6; }

        /* O teto de 340px n\xE3o olhava a janela: com o DevTools encaixado ou
           zoom alto o rodap\xE9 sa\xEDa da tela (overlay n\xE3o rola). 86vh - 130px \xE9 o
           que sobra depois do respiro de cima (14vh), da busca e do rodap\xE9. */
        .cw-palette-list { max-height: min(340px, calc(86vh - 130px)); overflow-y: auto; padding: 8px; }
        .cw-palette-item { display: flex; align-items: center; gap: 14px; padding: 10px 12px; border-radius: 12px; cursor: pointer; transition: background 0.1s ease; }
        .cw-palette-item.selected { background: #E8F0FE; }
        .cw-palette-item-icon { width: 32px; height: 32px; border-radius: 9px; background: #F1F3F4; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #5F6368; transition: background-color 0.1s ease, color 0.1s ease; }
        .cw-palette-item-icon svg { width: 18px; height: 18px; }
        .cw-palette-item.selected .cw-palette-item-icon { background: #FFFFFF; color: #1A73E8; }
        .cw-palette-item-icon--preset { background: #FEF7E0; color: #F9A825; }
        .cw-palette-item.selected .cw-palette-item-icon--preset { background: #FFFFFF; color: #F9A825; }
        .cw-palette-item-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .cw-palette-item-label { font-size: 14px; font-weight: 600; color: #202124; }
        .cw-palette-item-hint { font-size: 12px; color: #5F6368; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-palette-empty { padding: 32px; text-align: center; color: #9AA0A6; font-size: 13px; }
        .cw-palette-group {
            padding: 10px 12px 4px; font-size: 10.5px; font-weight: 700;
            color: #9AA0A6; text-transform: uppercase; letter-spacing: 0.8px;
        }
        .cw-palette-group:first-child { padding-top: 4px; }

        .cw-palette-footer { display: flex; gap: 16px; padding: 10px 20px; border-top: 1px solid #F1F3F4; background: #FAFAFA; font-size: 11px; color: #9AA0A6; font-weight: 600; }
        .cw-palette-footer span { display: flex; align-items: center; gap: 4px; }
        .cw-palette-footer svg { width: 12px; height: 12px; }
    `,document.head.appendChild(e)}var ip={pt:{ariaLabel:"Busca r\xE1pida",placeholder:"Buscar um m\xF3dulo...",empty:"Nada encontrado.",navigate:"navegar",select:"selecionar",close:"esc fechar",groupShortcuts:"Meus atalhos",groupModules:"M\xF3dulos"},en:{ariaLabel:"Quick search",placeholder:"Search for a module...",empty:"Nothing found.",navigate:"navigate",select:"select",close:"esc to close",groupShortcuts:"My shortcuts",groupModules:"Modules"},es:{ariaLabel:"B\xFAsqueda r\xE1pida",placeholder:"Buscar un m\xF3dulo...",empty:"No se encontr\xF3 nada.",navigate:"navegar",select:"seleccionar",close:"esc cerrar",groupShortcuts:"Mis atajos",groupModules:"M\xF3dulos"}};function Zt(e){let t=ge();return ip[t]?.[e]??ip.pt[e]}var rp=e=>typeof e=="string"?e:e[ge()]||e.pt,sp=e=>typeof e=="string"?e:Object.values(e).join(" ");function lp(e){Vg();function t(A){return A.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function a(){return typeof e.toggleNotes!="function"||typeof e.toggleNotes.openWithPreset!="function"?[]:lt.list().map(A=>({id:`shortcut-${A.id}`,label:A.label,hint:{pt:"Atalho de nota \xB7 abre pr\xE9-preenchida",es:"Atajo de nota \xB7 abre precompletada",en:"Note shortcut \xB7 opens pre-filled"},keywords:`nota atalho atajo note shortcut preset ${A.alias||""}`,icon:Ct.bolt,group:"shortcuts",isPreset:!0,run:()=>{lt.registerUse(A.id),e.toggleNotes.openWithPreset(A)}}))}let o=[{id:"notes",label:"Case Notes",hint:{pt:"Montar a nota t\xE9cnica do caso",es:"Armar la nota t\xE9cnica del caso",en:"Build the technical note for the case"},keywords:"notas nota caso anotacoes anotaciones notes case",icon:Ct.notes,run:e.toggleNotes},{id:"precall",label:"Pre-call Checklist",hint:{pt:"Checklist antes da liga\xE7\xE3o, direto na nota",es:"Checklist antes de la llamada, directo en la nota",en:"Checklist before the call, straight into the note"},keywords:"precall pre call checklist ligacao llamada verificacao verificacion",icon:Ct.precall,run:e.togglePrecall},{id:"bauform",label:"BAU Form",hint:{pt:"Solicita\xE7\xE3o de cria\xE7\xE3o/descarte BAU",es:"Solicitud de creaci\xF3n/descarte BAU",en:"Request to create/discard a BAU case"},keywords:"bau formulario solicitacao solicitud criacao creacion descarte form request create discard",icon:Ct.bauform,run:e.toggleBAUForm},{id:"email",label:"Email Assistant",hint:{pt:"Templates inteligentes de e-mail",es:"Plantillas inteligentes de correo",en:"Smart email templates"},keywords:"email e-mail correio correo template plantilla",icon:Ct.email,run:e.toggleEmail},{id:"script",label:"Call Script",hint:{pt:"Guia interativo de chamada",es:"Gu\xEDa interactiva de llamada",en:"Interactive call guide"},keywords:"script roteiro guion chamada llamada ligacao call",icon:Ct.script,run:e.toggleScript},{id:"links",label:{pt:"Central de Links",es:"Central de Enlaces",en:"Links Central"},hint:{pt:"Ferramentas, SOPs e atalhos",es:"Herramientas, SOPs y atajos",en:"Tools, SOPs and shortcuts"},keywords:"links enlaces atalhos atajos ferramentas herramientas tools shortcuts sop sops",icon:Ct.links,run:e.toggleLinks},{id:"library",label:{pt:"Minha Biblioteca",es:"Mi Biblioteca",en:"My Library"},hint:{pt:"Snippets e respostas salvas",es:"Snippets y respuestas guardadas",en:"Saved snippets and replies"},keywords:"biblioteca library snippets respostas respuestas replies salvas guardadas saved",icon:Ct.library,run:e.toggleLibrary},{id:"timezone",label:{pt:"Fusos Hor\xE1rios",es:"Husos Horarios",en:"Time Zones"},hint:{pt:"Monitoramento e planejador de chamada",es:"Monitoreo y planificador de llamada",en:"Monitoring and call planner"},keywords:"fuso horario husos timezone time zone clock",icon:Ct.timezone,run:e.toggleTimezone},{id:"broadcast",label:{pt:"Avisos",es:"Avisos",en:"Broadcast"},hint:{pt:"Comunicados e disponibilidade BAU",es:"Comunicados y disponibilidad BAU",en:"Announcements and BAU availability"},keywords:"avisos broadcast comunicados announcements notices disponibilidade disponibilidad availability",icon:Ct.broadcast,run:()=>e.broadcastControl&&e.broadcastControl.toggle()},{id:"configs",label:{pt:"Configura\xE7\xF5es",es:"Configuraci\xF3n",en:"Settings"},hint:{pt:"Perfil, som e prefer\xEAncias",es:"Perfil, sonido y preferencias",en:"Profile, sound and preferences"},keywords:"configuracoes configuracion config settings preferencias preferences perfil profile som sonido sound",icon:Ct.configs,run:e.toggleConfigs},{id:"notetable",label:{pt:"Nota em tabela",es:"Nota en tabla",en:"Table note"},hint:{pt:"Nota do caso nas tabelas do padr\xE3o novo (ALL TASKS, ECL)",es:"Nota del caso en las tablas del est\xE1ndar nuevo (ALL TASKS, ECL)",en:"Case note as the new standard's tables (ALL TASKS, ECL)"},keywords:"nota tabela tabla table note ecl sbs sbse mms all tasks padrao estandar standard",icon:Ct.notetable,run:e.toggleNoteTable}].map(A=>({...A,group:"modules"}));function n(){return[...a(),...o].filter(A=>typeof A.run=="function").map(A=>({...A,_haystack:t(`${sp(A.label)} ${sp(A.hint)} ${A.keywords}`)}))}let i=".cw-dialog-overlay, .cw-wiz-overlay, .cw-ob-lang-overlay, .cw-processing-card",r=!1,s=0,l=n(),p=l,c=[],m=null,u=null,h=document.createElement("div");h.className="cw-palette-overlay",h.setAttribute("role","dialog"),h.setAttribute("aria-modal","true"),h.setAttribute("aria-label",Zt("ariaLabel"));let L=document.createElement("div");L.className="cw-palette",L.innerHTML=`
        <div class="cw-palette-search">
            <span class="cw-palette-search-icon">${Ct.search}</span>
            <input type="text" class="cw-palette-input" placeholder="${Zt("placeholder")}" autocomplete="off" spellcheck="false">
        </div>
        <div class="cw-palette-list"></div>
        <div class="cw-palette-footer">
            <span class="js-cp-navigate">${Ct.arrowDown}${Ct.arrowUp} ${Zt("navigate")}</span>
            <span class="js-cp-select">${Ct.enter} ${Zt("select")}</span>
            <span class="js-cp-close">${Zt("close")}</span>
        </div>
    `,h.appendChild(L),h.onmousedown=A=>{A.target===h&&ee()};let S=L.querySelector(".cw-palette-input"),C=L.querySelector(".cw-palette-list");L.addEventListener("mousedown",A=>{A.target!==S&&A.preventDefault()});function D(A,{scroll:y=!1}={}){s=A,c.forEach((z,U)=>z.classList.toggle("selected",U===A)),y&&c[A]&&c[A].scrollIntoView({block:"nearest"})}function G(A){p.length&&D(Ht(s+A,0,p.length-1),{scroll:!0})}function F(){if(C.innerHTML="",c=[],p.length===0){C.innerHTML=`<div class="cw-palette-empty">${Zt("empty")}</div>`;return}let A=null;p.forEach((y,z)=>{if(y.group!==A){A=y.group;let M=document.createElement("div");M.className="cw-palette-group",M.textContent=Zt(y.group==="shortcuts"?"groupShortcuts":"groupModules"),M.setAttribute("aria-hidden","true"),C.appendChild(M)}let U=document.createElement("div");U.className="cw-palette-item",U.dataset.idx=z,U.innerHTML=`
                <span class="cw-palette-item-icon${y.isPreset?" cw-palette-item-icon--preset":""}">${y.icon}</span>
                <span class="cw-palette-item-text">
                    <span class="cw-palette-item-label"></span>
                    <span class="cw-palette-item-hint"></span>
                </span>
            `,U.querySelector(".cw-palette-item-label").textContent=rp(y.label),U.querySelector(".cw-palette-item-hint").textContent=rp(y.hint),C.appendChild(U),c.push(U)}),D(s,{scroll:!0})}let R={x:-1,y:-1};C.addEventListener("mousemove",A=>{if(A.clientX===R.x&&A.clientY===R.y)return;R={x:A.clientX,y:A.clientY};let y=A.target.closest(".cw-palette-item");y&&D(Number(y.dataset.idx))}),C.addEventListener("click",A=>{let y=A.target.closest(".cw-palette-item");y&&le(Number(y.dataset.idx))});function le(A){if(!r)return;let y=p[A];y&&(w.playClick(),ee({restoreFocus:!1}),y.run())}function te(){r||(clearTimeout(m),r=!0,u=document.activeElement,l=n(),p=l,s=0,S.value="",F(),Je(),document.body.appendChild(h),w.playGenieOpen(),requestAnimationFrame(()=>{r&&(h.classList.add("active"),S.focus())}))}function ee({restoreFocus:A=!0}={}){if(r){if(r=!1,Qe(),h.classList.remove("active"),m=setTimeout(()=>h.remove(),200),A&&u&&document.contains(u))try{u.focus({preventScroll:!0})}catch{}u=null}}function $(){r?ee():te()}return S.addEventListener("input",()=>{let A=t(S.value.trim());p=A?l.filter(y=>y._haystack.includes(A)):l,s=0,F()}),h.addEventListener("keydown",A=>{A.key==="ArrowDown"||A.key==="ArrowUp"||A.key==="Tab"?(A.preventDefault(),G(A.key==="ArrowUp"||A.key==="Tab"&&A.shiftKey?-1:1)):A.key==="Enter"?(A.preventDefault(),le(s)):A.key==="Escape"&&(A.preventDefault(),A.stopPropagation(),ee())}),document.addEventListener("keydown",A=>{!(A.metaKey||A.ctrlKey)||A.altKey||A.shiftKey||typeof A.key!="string"||A.key.toLowerCase()!=="k"||(A.preventDefault(),!A.repeat&&(!r&&document.querySelector(i)||$()))},!0),je(()=>{h.setAttribute("aria-label",Zt("ariaLabel")),S.placeholder=Zt("placeholder");let A=L.querySelector(".js-cp-navigate");A&&(A.innerHTML=`${Ct.arrowDown}${Ct.arrowUp} ${Zt("navigate")}`);let y=L.querySelector(".js-cp-select");y&&(y.innerHTML=`${Ct.enter} ${Zt("select")}`);let z=L.querySelector(".js-cp-close");z&&(z.textContent=Zt("close")),F()}),{open:te,close:ee,toggle:$}}var cp={pt:"Erro cr\xEDtico ao iniciar o Case Wizard.",es:"Error cr\xEDtico al iniciar Case Wizard.",en:"Critical error starting Case Wizard."};function Wg(){if(window.techSolInitialized){Si();return}window.techSolInitialized=!0;let e="v6.6.0";console.log(`\u{1F680} TechSol Suite Initializing (${e})...`);try{ys();try{w.initGlobalListeners()}catch(L){console.warn("\xC1udio bloqueado:",L)}ke.fetchContentModules(["tips","broadcast","bau_availability","links","call_script","email_template","note_template","task_screenshots","link_categories","link_highlights","note_blocks","note_layouts"]);let t=Si(),a=ql(),o=Xl(),n=tc(),i=cc(),r=Lc(),s=nd(),l=sd(),p=fd(),c=Ed(),m=np(),u=zc(),h={toggleNotes:a,togglePrecall:o,toggleEmail:n,toggleScript:i,toggleLinks:r,toggleTimezone:s,toggleLibrary:l,toggleConfigs:p,toggleBAUForm:c,toggleNoteTable:m,broadcastControl:u};rl(h,t),lp(h),setTimeout(()=>{ke.logEvent("App","Start","Session Start");let L=it();Ye.sync().then(()=>sa.refresh()),(L?Xa(L.split("@")[0]).then(C=>{C&&(Yr(C),gs(C))}).catch(C=>console.warn("N\xE3o foi poss\xEDvel resolver o idioma do perfil:",C)):Promise.resolve()).finally(()=>{let C=Promise.resolve().then(()=>Uc()),D=new Promise(G=>{setTimeout(()=>G(Wc(e)),500)});Promise.allSettled([t,C,D]).then(()=>setTimeout(Jc,1200))})},2500)}catch(t){console.error("Erro fatal na inicializa\xE7\xE3o:",t),w.playError(),ne(cp[ge()]||cp.pt,{error:!0})}}Wg();})();
