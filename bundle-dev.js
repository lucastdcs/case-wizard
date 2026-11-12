(()=>{var Jp="cw_ui_lang",Zp="cw_output_lang",ts="cw_profile_lang",mn=["pt","es","en"];var eu={"PT-BR":"pt",PT:"pt",ES:"es",EN:"en"};var Zr={pt:"pt-BR",es:"es-ES",en:"en-GB"};function Oa(e=ge()){return Zr[e]||Zr.pt}function gn(e=ge()){return e==="en"?"short":"2-digit"}function es(e){try{let t=typeof localStorage<"u"?localStorage.getItem(e):null;return mn.includes(t)?t:null}catch{return null}}function tu(e){return mn.includes(e)}function as(e,t){let a=es(e),o=a||es(ts)||"pt",n=new Set;return{get:()=>o,hasManualOverride:()=>!!a,set(i,{persist:r=!0}={}){if(!(!tu(i)||i===o)&&!(!r&&a)){if(o=i,r){a=i;try{typeof localStorage<"u"&&localStorage.setItem(e,i)}catch{}}n.forEach(s=>{try{s(o)}catch(l){console.warn(`i18n listener (${t}) falhou:`,l)}})}},onChange(i){return n.add(i),()=>n.delete(i)}}}var li=as(Jp,"interface"),ci=as(Zp,"sa\xEDda");function ge(){return li.get()}function No(e,t){li.set(e,t)}function je(e){return li.onChange(e)}function Tt(){return ci.get()}function di(e,t){ci.set(e,t)}function wa(e){return ci.onChange(e)}function os(e){let t=String(e?.defaultLanguage||"").toUpperCase(),a=eu[t];if(a){try{typeof localStorage<"u"&&localStorage.setItem(ts,a)}catch{}No(a,{persist:!1}),di(a,{persist:!1})}}function Qa(e){return function(a){return e[ge()]?.[a]??e.pt?.[a]??a}}var ns={production:"AKfycbxkheuq28ENsHMZMH8t9-u4EIrktHC6cBi-87boDre0jJfl1lnSCPBzaEkw6hy3Cx6fAg",development:"AKfycbyUtczRMulDAyO_1ku39Rb01zarPMw1JvO7aNOdJPYeAgCC7G9mmb-P_EuXP6kvo8l2LA"},fn="development",au=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",is=ns[fn]||ns.development,fi=au?"dev":"exec",ou=`https://script.google.com/a/macros/google.com/s/${is}/${fi}`,rs=is.slice(-6);function Ja(){return{env:fn,isDev:fn!=="production",endpoint:fi,fingerprint:rs}}console.log(`[Case Wizard] backend: ${fn}/${fi} \xB7 implanta\xE7\xE3o \u2026${rs}`);var nu="cw_data_broadcast",iu="cw_data_tips",pi="cw_content_",ui=new Set,ru=["Processando...","Mantenha o foco!","Aguarde..."];function su(e={}){return Object.keys(e).filter(t=>e[t]!==null&&e[t]!==void 0).map(t=>encodeURIComponent(t)+"="+encodeURIComponent(e[t])).join("&")}var gi={pt:{TIMEOUT:"Timeout: A API demorou muito para responder. (Apps Script bloqueado ou erro 500)",CONNECTION:"Erro de conex\xE3o JSONP.",BAU_SEND_FAILED:"Falha na opera\xE7\xE3o BAU",BAU_READ_FAILED:"Erro retornado pela API de leitura",BAU_UPDATE_FAILED:"Falha na atualiza\xE7\xE3o BAU",BAU_NOT_OWNER_EDIT:"Acesso negado. Voc\xEA s\xF3 pode editar seus pr\xF3prios casos.",BAU_NOT_OWNER_DELETE:"Acesso negado. Voc\xEA n\xE3o \xE9 o dono deste caso.",BAU_ALREADY_PROCESSED:"Este caso j\xE1 foi processado pelo TL e n\xE3o pode mais ser alterado.",BAU_NOT_FOUND:"Caso n\xE3o encontrado.",AGENT_EMAIL_REQUIRED:"Email do agente \xE9 obrigat\xF3rio."},es:{TIMEOUT:"Tiempo agotado: la API tard\xF3 demasiado en responder. (Apps Script bloqueado o error 500)",CONNECTION:"Error de conexi\xF3n JSONP.",BAU_SEND_FAILED:"Fall\xF3 la operaci\xF3n BAU",BAU_READ_FAILED:"Error devuelto por la API de lectura",BAU_UPDATE_FAILED:"Fall\xF3 la actualizaci\xF3n BAU",BAU_NOT_OWNER_EDIT:"Acceso denegado. Solo puedes editar tus propios casos.",BAU_NOT_OWNER_DELETE:"Acceso denegado. No eres el due\xF1o de este caso.",BAU_ALREADY_PROCESSED:"Este caso ya fue procesado por el TL y no se puede modificar.",BAU_NOT_FOUND:"Caso no encontrado.",AGENT_EMAIL_REQUIRED:"El correo del agente es obligatorio."},en:{TIMEOUT:"Timeout: the API took too long to respond. (Apps Script blocked or error 500)",CONNECTION:"JSONP connection error.",BAU_SEND_FAILED:"BAU operation failed",BAU_READ_FAILED:"Error returned by the read API",BAU_UPDATE_FAILED:"BAU update failed",BAU_NOT_OWNER_EDIT:"Access denied. You can only edit your own cases.",BAU_NOT_OWNER_DELETE:"Access denied. You are not the owner of this case.",BAU_ALREADY_PROCESSED:"This case has already been processed by the TL and can no longer be changed.",BAU_NOT_FOUND:"Case not found.",AGENT_EMAIL_REQUIRED:"The agent's email is required."}};function bn(e){return gi[ge()]?.[e]??gi.pt[e]}function mi(e,t){return e?.code&&gi.pt[e.code]?bn(e.code):e?.error||e?.message||bn(t)}function $t(e,t={}){return new Promise((a,o)=>{let n="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script"),r=setTimeout(()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[n],o(new Error(bn("TIMEOUT")))},15e3);window[n]=d=>{clearTimeout(r),document.body.contains(i)&&document.body.removeChild(i),delete window[n],a(d)};let s=su(t),l=`${ou}?op=${e}&callback=${n}&t=${Date.now()}&${s}`;i.src=l,i.onerror=()=>{clearTimeout(r),document.body.contains(i)&&document.body.removeChild(i),delete window[n],o(new Error(bn("CONNECTION")))},document.body.appendChild(i)})}var Te={fetchTips:async()=>{try{await Te.fetchContentModule("tips")}catch(e){console.warn("Tips offline",e)}},getCachedBroadcasts:()=>{try{return JSON.parse(localStorage.getItem(nu)||"[]")}catch{return[]}},fetchContentModule:async e=>{if(ui.has(e)){let a=Te.getCachedContent(e);if(a)return a}let t=`${pi}${e}`;try{let a=await $t("content_public",{module:e});if(a?.status==="success"&&Array.isArray(a.items))return localStorage.setItem(t,JSON.stringify(a.items)),ui.add(e),a.items}catch(a){console.warn(`Conte\xFAdo '${e}' offline`,a)}return Te.getCachedContent(e)},fetchContentModules:async e=>{let t=(e||[]).filter(Boolean);if(!t.length)return{};try{let a=await $t("content_public",{modules:t.join(",")});if(a?.status==="success"&&a.modules)return Object.keys(a.modules).forEach(o=>{let n=a.modules[o];Array.isArray(n)&&(localStorage.setItem(`${pi}${o}`,JSON.stringify(n)),ui.add(o))}),a.modules}catch(a){console.warn("Pr\xE9-carregamento de conte\xFAdo indispon\xEDvel",a)}return{}},getCachedContent:e=>{try{return JSON.parse(localStorage.getItem(`${pi}${e}`)||"null")}catch{return null}},getRandomTip:()=>{let e=null,t=Te.getCachedContent("tips");if(Array.isArray(t)&&t.length&&(e=t.map(a=>a.value).filter(Boolean)),!e||!e.length){let a=localStorage.getItem(iu);if(a)try{e=JSON.parse(a)}catch{}}return(!Array.isArray(e)||!e.length)&&(e=ru),e[Math.floor(Math.random()*e.length)]},logEvent:(e,t,a="",o=null)=>{try{let n="anon";try{let r=it();r&&(n=r.split("@")[0].toLowerCase())}catch{}let i={timestamp:new Date().toISOString(),user:n,version:"v5.1",category:e,action:t,label:a,value:o||""};$t("log",i).catch(r=>{})}catch(n){console.warn("Analytics error",n)}},logUsage:()=>{},sendBAUEscalation:async(e,t)=>{let a={...e,user:t,date:new Date().toISOString()};try{console.log("Executando create_bau...",a);let o=await $t("create_bau",a);if(o&&o.status==="success")return console.log("Sucesso: create_bau"),o;throw new Error(mi(o,"BAU_SEND_FAILED"))}catch(o){throw console.error("Erro JSONP (BAU):",o),o}},readAgentBAU:async()=>{let e=it();if(!e)return console.warn("Email n\xE3o encontrado. N\xE3o foi poss\xEDvel buscar casos BAU."),[];try{console.log("Buscando casos BAU para:",e);let t=await $t("read_agent_bau",{user:e});if(t&&t.status==="success"&&Array.isArray(t.cases))return t.cases;if(t&&t.status==="error")throw new Error(mi(t,"BAU_READ_FAILED"));return[]}catch(t){throw console.error("Erro ao buscar casos BAU:",t),t}},updateBAUStatus:async(e,t,a={})=>{let o=it();try{console.log(`Atualizando status BAU ${e} para ${t}...`);let n=await $t("update_bau_status",{id:e,status:t,user:o,...a});return n&&n.status==="success"}catch(n){return console.error("Erro ao atualizar status BAU:",n),!1}},updateBAUEscalation:async(e,t)=>{let a=it(),o={...t,id:e,user:a,date_edited:new Date().toISOString()};try{console.log(`Executando update_bau para ${e}...`,o);let n=await $t("update_bau",o);if(n&&n.status==="success")return console.log("Sucesso: update_bau"),n;throw new Error(mi(n,"BAU_UPDATE_FAILED"))}catch(n){throw console.error("Erro JSONP (Update BAU):",n),n}},fetchUserProfile:async e=>{try{console.log(`Buscando perfil para: ${e}`);let t=await $t("get_user_profile",{ldap:e});return console.log("Resposta bruta do servidor:",t),t&&t.status==="success"&&t.profile?t.profile:null}catch(t){return console.error("Erro ao buscar perfil:",t),null}},getUserSnippets:async e=>{try{return console.log("Buscando snippets para:",e),await $t("get_user_snippets",{user:e})}catch(t){return console.error("Erro ao carregar snippets:",t),{status:"error",snippets:[]}}},saveSnippet:async(e,t)=>{let a={id:e.id,type:e.type,title:e.title,content:e.content,subject:e.subject||"",isCode:e.isCode,isRich:e.isRich,user:t};try{console.log("Salvando snippet na nuvem:",a);let o=await $t("save_snippet",a);return o&&o.status==="success"}catch(o){return console.error("Erro ao salvar snippet:",o),!1}},deleteSnippet:async(e,t)=>{try{console.log(`Deletando snippet ${e}...`);let a=await $t("delete_snippet",{id:e,user:t});return a&&a.status==="success"}catch(a){return console.error("Erro ao deletar snippet:",a),!1}},getUserPrefs:async e=>{try{let t=await $t("get_user_prefs",{user:e});return t&&t.status==="success"?t.prefs||{}:null}catch(t){return console.warn("Erro ao carregar prefer\xEAncias:",t),null}},saveUserPrefs:async(e,t)=>{try{let a=await $t("save_user_prefs",{user:t,prefs:JSON.stringify(e||{})});return!!(a&&a.status==="success")}catch(a){return console.warn("Erro ao salvar prefer\xEAncias:",a),!1}}},ss=Te.sendBAUEscalation,ls=Te.readAgentBAU,Ef=Te.updateBAUStatus,cs=Te.updateBAUEscalation,Za=Te.fetchUserProfile,kf=Te.getUserSnippets,Tf=Te.saveSnippet,If=Te.deleteSnippet,Nf=Te.getUserPrefs,Lf=Te.saveUserPrefs;var Ne=e=>new Promise(t=>setTimeout(t,e));function kt(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(a=>e.dispatchEvent(new MouseEvent(a,t)))}function ya(e){e&&["mousedown","mouseup","click"].forEach(t=>e.dispatchEvent(new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window})))}function Ht(e,t,a){return Math.max(t,Math.min(e,a))}var Lo=0,eo=0;function Qe(){if(Lo===0&&(eo=window.innerWidth-document.documentElement.clientWidth,eo>0)){let e=parseFloat(getComputedStyle(document.body).paddingRight)||0;document.body.style.paddingRight=`${e+eo}px`}Lo++,document.body.style.overflow="hidden"}function Je(){if(Lo=Math.max(0,Lo-1),Lo===0&&(document.body.style.overflow="",eo>0)){let e=parseFloat(getComputedStyle(document.body).paddingRight)||0,t=Math.max(0,e-eo);document.body.style.paddingRight=t?`${t}px`:"",eo=0}}var ds=!1;function lu(){if(ds||document.getElementById("cw-filled-check-styles"))return;let e=document.createElement("style");e.id="cw-filled-check-styles",e.textContent=`
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
    `,document.head.appendChild(e),ds=!0}var ps=!1;function cu(){if(ps||document.getElementById("cw-empty-state-styles"))return;let e=document.createElement("style");e.id="cw-empty-state-styles",e.textContent=`
        .cw-empty-illustrated { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 12px; padding: 32px 20px; }
        .cw-empty-illustrated-badge { border-radius: 50%; background: #F8F9FA; display: flex; align-items: center; justify-content: center; color: #9AA0A6; flex-shrink: 0; }
        .cw-empty-illustrated-badge svg { width: 44%; height: 44%; }
        .cw-empty-illustrated-title { font-family: 'Google Sans', Roboto, sans-serif; font-size: 15px; font-weight: 600; color: #202124; }
        .cw-empty-illustrated-subtitle { font-size: 12px; color: #5F6368; line-height: 1.5; max-width: 240px; }
    `,document.head.appendChild(e),ps=!0}function _o({icon:e,title:t,subtitle:a="",size:o=88}){cu();let n=document.createElement("div");return n.className="cw-empty-illustrated",n.innerHTML=`
        <div class="cw-empty-illustrated-badge" style="width:${o}px;height:${o}px;">${e}</div>
        <div class="cw-empty-illustrated-title">${t}</div>
        ${a?`<div class="cw-empty-illustrated-subtitle">${a}</div>`:""}
    `,n}function hn(e,t){e.addEventListener("keydown",a=>{if(a.key!=="ArrowDown"&&a.key!=="ArrowUp")return;let o=document.activeElement;if(!o||!o.matches(t))return;let n=Array.from(e.querySelectorAll(t)).filter(s=>s.offsetParent!==null),i=n.indexOf(o);if(i===-1)return;a.preventDefault();let r=a.key==="ArrowDown"?Math.min(i+1,n.length-1):Math.max(i-1,0);n[r].focus()})}var us=!1;function du(){if(us||document.getElementById("cw-pending-field-styles"))return;let e=document.createElement("style");e.id="cw-pending-field-styles",e.textContent=`
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
    `,document.head.appendChild(e),us=!0}function vn(e,{duration:t=2400}={}){e&&(du(),e.classList.add("cw-quicklaunch-pending"),e.scrollIntoView({behavior:"smooth",block:"center"}),e.focus({preventScroll:!0}),setTimeout(()=>e.classList.remove("cw-quicklaunch-pending"),t))}function xn(e,{minLength:t=2}={}){lu();let a=e.parentElement;a&&getComputedStyle(a).position==="static"&&(a.style.position="relative"),e.classList.add("cw-dopamine-field");let o=document.createElement("span");o.className="cw-dopamine-check",o.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',e.insertAdjacentElement("afterend",o);let n=()=>{let i=e.value.trim().length>=t;e.classList.toggle("filled",i),o.classList.toggle("show",i)};e.addEventListener("input",n),n()}function pu(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim()}var uu={serviceHorizontal:["service horizontal","servico horizontal"],serviceOffering:["service offering","oferta de servicos","oferta de servicios"],specialization:["specialization","especializacao","especializacion"],routingChannel:["routing communication channel","canal de comunicacao de roteamento","canal de comunicacion de enrutamiento"],businessLanguage:["business language","linguagem comercial","idioma comercial"],vendorPartner:["vendor partner","parceiro fornecedor","socio proveedor"],appointmentTasks:["appointment tasks","tarefas de agendamento","tareas de la cita"],salesProgram:["sales program","programa de vendas","programa de ventas"],customerTimezone:["customer time zone","time zone","timezone","fuso horario do cliente","fuso horario","zona horaria del cliente","zona horaria"],externalCustomerId:["google ads external customer id","id de cliente externo do google ads","id de cliente externo de google ads"],additionalInfo:["additional info","informacoes adicionais","informacion adicional"],givenName:["given name","nome dado","nombre"],familyName:["family name","nome de familia","apellido"],contactEmail:["contact email","e-mail de contato","correo electronico de contacto"],loginEmail:["login email","e-mail de login","correo electronico de acceso"],phoneNumber:["phone number","numero de telefone","numero de telefono"],appointmentTime:["appointment time","horario da consulta","hora de la cita"],neoOrg:["neo org"],neoProduct:["neo product","produto neo","producto neo"],website:["website","site","sitio web"],program:["program","programa"],adsBusinessSector:["ads business sector"],interactionType:["interaction type"],salesRegion:["sales region"]},mu=".form-label, .data-pair-label";function wn(e,t=document){let a=uu[e];if(!a)return null;let o=new Set(a);return Array.from(t.querySelectorAll(mu)).find(n=>o.has(pu(n.textContent)))||null}function ms(e){return e?.innerText?.trim()||e?.textContent?.trim()||""}function qa(e,t=document){let a=wn(e,t);if(!a)return[];let o=a.closest("cuf-form-field");if(o){let s=Array.from(o.querySelectorAll('[debug-id="html-value"]')).map(ms).filter(Boolean);if(s.length)return s}let i=a.closest("home-data-item")?.querySelector(".data-pair-content")||a.parentElement?.querySelector(".data-pair-content")||a.parentElement?.querySelector("sanitized-content")||a.nextElementSibling,r=ms(i);return r?[r]:[]}function Lt(e,t=document){return qa(e,t)[0]||null}var gs=/[A-Za-z0-9._%+-]+@google\.com/g,gu=[/^ads-support@/i,/^noreply@/i,/^no-reply@/i,/-bot@/i],fs=e=>gu.some(t=>t.test(e));function fu(){return(document.querySelector('[debug-id="assignee"]')?.textContent.trim()||"").replace(/@.*$/,"").toLowerCase()||null}function hi(){let t=document.querySelector('[aria-label^="Signed in as"]')?.getAttribute("aria-label")?.replace(/^Signed in as\s+/i,"").trim();return t?t.toLowerCase():document.querySelector('img.photo[src*="/photos/"]')?.src?.match(/\/photos\/([^?/]+)/)?.[1]?.toLowerCase()||null}function bs(){return document.querySelector(".active-case-log-container")||document}function hs(){return Array.from(bs().querySelectorAll("case-message-view"))}function bi(){let e=new Set([fu(),hi()].filter(Boolean)),t=hs().flatMap(a=>a.textContent.match(gs)||[]).map(a=>a.toLowerCase());return[...new Set(t)].filter(a=>fs(a)?!1:!e.has(a.replace(/@.*$/,"")))}function bu(e){return(hs().find(o=>/contact us form|formul[áa]rio de contato|formulario de contacto/i.test(o.textContent))?.textContent.match(gs)||[]).map(o=>o.toLowerCase()).find(o=>e.includes(o))||null}function hu(){let e=document.querySelectorAll("internal-user-info");if(e.length!==1)return null;let t=e[0].querySelector(".email")?.textContent.trim().toLowerCase();return t&&!fs(t)?t:null}async function vu(){let e=Array.from(bs().querySelectorAll(".message-header")).filter(t=>t.getAttribute("aria-expanded")==="false");for(let t of e)if(ya(t),await Ne(400),bi().length)return}async function vs({expandir:e=!0}={}){let t=bi(),a="case-log-visivel";!t.length&&e&&(await vu(),t=bi(),a="case-log-expandido");let o=null;return t.length===1?o=t[0]:t.length>1&&(o=bu(t),a=o?"contact-us-form":a),o||(o=hu(),a=o?"internal-user-info":"nao-resolvido"),{email:o||null,origem:a}}var Sa=e=>document.querySelector(`[debug-id="${e}"]`)?.textContent.replace(/\s+/g," ").trim()||null;function xu(){return document.querySelector('[debug-id="case-summary-input"] input')?.value.trim()||null}function xs(){return{titulo:xu(),estado:Sa("state-button"),slaRotulo:Sa("due-in-label"),slaTexto:Sa("due-in-text"),criadoEm:Sa("date-created-value"),tier:Sa("badge-text"),programaBadge:Sa("sales-program-badge"),paisCobranca:Sa("adwords-billing-country"),assignee:Sa("assignee")}}var wu=/[A-Za-z0-9._%+-]+@google\.com/;function yu(){return Array.from(document.querySelectorAll("case-message-view")).map(e=>e.textContent.replace(/\s+/g," ").trim())}var yn=e=>yu().find(t=>e.test(t))||null;function Su(){let e=yn(/appointment has been successfully created|agendamento foi criado/i);if(!e)return null;let t=e.match(/on ([A-Z][a-z]+ \d{1,2}) at ([\d:]+\s?[AP]M)/i),a=e.match(/\[([^\]]+)\]/),o=e.match(wu);return{data:t?.[1]||null,hora:t?.[2]||null,timezone:a?.[1]||null,designado:o?.[0]||null}}function Cu(){let e=yn(/\bTransfer\b|\bTransferência\b/i);if(!e)return null;let t=e.match(/(?:Transfer|Transferência)\s+(?:From|De)\s+(.+?)\s+(?:to|para)\s+(.+?)(?:\.\.\.|$)/i);return t?{de:t[1].trim(),para:t[2].trim()}:null}function Au(){let e=yn(/appointment .*was (?:automatically )?canceled|foi cancelad/i);if(!e)return null;let t=e.match(/\(Reason:\s*([^)]+)\)/i),a=e.match(/AppointmentId=\s*(\d+)\s*\)/i);return{motivo:t?.[1].trim()||null,appointmentId:a?.[1]||null}}function Eu(){let e=yn(/\bDiscard\b|\bDescarte\b/i);if(!e)return null;let t=e.match(/(?:Discard|Descarte)\s+(.+?)(?:\.\.\.|$)/i);return t?{motivo:t[1].trim()}:null}function ws(){return{agendamento:Su(),transferencia:Cu(),cancelamento:Au(),descarte:Eu()}}var Do="Consultor",Ca="",Ra="",Mo=null;async function Oo(){try{if(!document.querySelector(".translated-form"))return!0;let e=document.querySelector('material-button[debug-id="toggle-translation-button"]');if(!e)return!1;console.log("TechSol: Tradu\xE7\xE3o detectada. Revertendo para o idioma original..."),e.click();for(let t=0;t<20;t++){if(!document.querySelector(".translated-form"))return!0;await Ne(100)}return console.warn("TechSol: tradu\xE7\xE3o n\xE3o reverteu; seguindo pelos r\xF3tulos traduzidos."),!1}catch(e){return console.warn("TechSol: Erro ao tentar reverter tradu\xE7\xE3o:",e),!1}}async function qo(){if(Ca&&Ra)return Ca;let e=hi();e&&!Ra&&(Ra=`${e}@google.com`);let t=e?e.split(/[._-]/)[0].replace(/^./,a=>a.toUpperCase()):null;try{let a=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!a)return Ca=t||Do,Ca;a.click(),await Ne(150);let o=t||Do,n=document.querySelector("profile-details .name");if(n){let s=n.textContent.trim().split(" ")[0];s&&(o=s.charAt(0).toUpperCase()+s.slice(1).toLowerCase())}let i=document.querySelector("profile-details .email");return i&&(Ra=i.textContent.trim(),console.log("TechSol: Identidade confirmada ->",Ra)),a.click(),document.body.click(),Ca=o,o}catch(a){return console.warn("Sherlock falhou:",a),Ca=t||Do,Ca}}function Ro(){return Ca||Do}function it(){return Ra||null}var ys={pt:{morning:"Bom dia",afternoon:"Boa tarde",evening:"Boa noite",friday:"\u{1F389} Sextou!",fallbackName:"Consultor",night:["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."],mondayMorning:["Vamos definir o tom da semana.","Nova semana, novas conquistas."],fridayMorning:["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."],weekdayMorning:["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."],afternoonPhrases:["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."],eveningPhrases:["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],weekend:["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]},es:{morning:"Buenos d\xEDas",afternoon:"Buenas tardes",evening:"Buenas noches",friday:"\u{1F389} \xA1Es viernes!",fallbackName:"Consultor",night:["Guerrero de la madrugada.","El mundo duerme, t\xFA avanzas.","Enfoque total."],mondayMorning:["Vamos a marcar el ritmo de la semana.","Nueva semana, nuevos logros."],fridayMorning:["El \xFAltimo empuj\xF3n antes del descanso.","Cerremos con broche de oro."],weekdayMorning:["Que tu d\xEDa sea productivo.","Enfoque y caf\xE9 para hoy."],afternoonPhrases:["Mant\xE9n el ritmo.","Una tarde productiva por delante.","Seguimos avanzando."],eveningPhrases:["Cerrando el d\xEDa con productividad.","Excelente dedicaci\xF3n."],weekend:["Tu dedicaci\xF3n el fin de semana es inspiradora.","Trabajo excepcional."]},en:{morning:"Good morning",afternoon:"Good afternoon",evening:"Good evening",friday:"\u{1F389} It's Friday!",fallbackName:"Consultant",night:["Night owl mode on.","The world sleeps, you move forward.","Full focus."],mondayMorning:["Let's set the tone for the week.","New week, new wins."],fridayMorning:["Last push before the break.","Let's close the week strong."],weekdayMorning:["Have a productive day.","Focus and coffee for today."],afternoonPhrases:["Keep the pace.","A productive afternoon ahead.","We keep moving forward."],eveningPhrases:["Wrapping up the day productively.","Excellent dedication."],weekend:["Your weekend dedication is inspiring.","Outstanding work."]}};function Ss(e){let t=ys[ge()]||ys.pt,a=new Date,o=a.getHours(),n=a.getDay(),i,r="";o>=5&&o<12?(i=t.morning,r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(i=t.afternoon,r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(i=t.evening,r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let s=[];o>=0&&o<5?s=t.night:o<12?n===1?s=t.mondayMorning:n===5?s=t.fridayMorning:s=t.weekdayMorning:o<18?s=t.afternoonPhrases:s=t.eveningPhrases,(n===0||n===6)&&(s=t.weekend);let l=s[Math.floor(Math.random()*s.length)];return{prefix:`${i},`,name:e===Do?t.fallbackName:e,suffix:l,icon:r,isFriday:n===5,fridayBadge:t.friday}}async function vi(){try{let e=wn("contactEmail");if(!e)return null;let t=e.closest("cuf-form-field")||e.parentElement,a=t.querySelector(".unmask-button")||t.querySelector('[aria-label="Click to view"]');a&&(a.click(),await Ne(500));let o=Lt("contactEmail");return o&&o.includes("@")&&!o.includes("Is this:")?o.trim():null}catch(e){return console.warn("Erro ao capturar email do cliente:",e),null}}function ku(e){let t=String(e||"").trim();if(!t||t.length>30||/^phone$/i.test(t)||t.includes("Is this:")||!/^[\d\s()+\-.]+$/.test(t))return!1;let a=t.replace(/\D/g,"");return a.length>=8&&a.length<=15}async function xi(){try{let e=wn("phoneNumber");if(!e)return null;let t=e.closest("cuf-form-field")||e.parentElement;if(!t)return null;let a=t.querySelector(".unmask-button")||t.querySelector('[aria-label="Click to view"]');a&&(a.click(),await Ne(500));let o=Lt("phoneNumber");return ku(o)?o.trim():null}catch(e){return console.warn("Erro ao capturar telefone do cliente:",e),null}}async function Tu(e){try{return await vs(e)}catch(t){return console.warn("Erro ao resolver AM:",t),{email:null,origem:"erro"}}}function Fa(){try{let e=Lt("externalCustomerId");if(!e)return"N/A";let t=e.replace(/\D/g,"");return t.length!==10?"N/A":t.replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(e){console.warn("Erro ao capturar CID:",e)}return"N/A"}function Iu(e){return e?.email||null}function Nu(){try{return Lt("customerTimezone")}catch(e){console.warn("Erro ao capturar Timezone:",e)}return null}async function to(){try{let t=document.querySelector('[debug-id="case-id"]')?.textContent?.match(/\d-\d{6,}/)?.[0];return t||window.location.href.split("/").pop()||"---"}catch(e){return console.warn("Falha ao capturar Case ID:",e),"---"}}function wi(){try{return Lt("salesProgram")||""}catch(e){console.warn("Erro ao capturar Sales Program:",e)}return""}function Lu(){try{return Lt("familyName")||""}catch(e){console.warn("Falha Sobrenome:",e)}return""}function Sn(){try{return Lt("businessLanguage")||"N/A"}catch(e){console.warn("Erro ao capturar Idioma:",e)}return"N/A"}function _u(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(a=>a.textContent.includes("Speakeasy ID")||a.textContent.includes("SE ID"));if(t){let a=t.closest(".data-pair")||t.parentElement,o=a.querySelector(".data-pair-content")||a.nextElementSibling;if(o&&o.textContent.trim())return o.textContent.trim()}}catch(e){console.warn("Erro ao capturar SE ID:",e)}return"N/A"}function Cs(e){e&&(Mo=e)}function Fo(){let e=String(Mo?.defaultLanguage||"").toUpperCase();return{ES:"ES",EN:"EN"}[e]||"PT"}async function Ut(){await Oo(),Ra||await qo();let e=Lt("givenName")||"Cliente",t=Lt("website")||"",a=qa("appointmentTasks"),[o,n]=await Promise.all([vi(),xi()]),i=await Tu(),r=Fa(),s=Iu(i),l=Nu(),d=xs(),c=ws(),g=await to(),u=wi(),b=Sn(),L=_u(),A=Lu(),C=it();if(C&&!Mo){let z=C.split("@")[0];try{Mo=await Za(z)}catch(G){console.warn("Falha ao carregar perfil do usu\xE1rio:",G)}}return{advertiserName:e,websiteUrl:t,clientEmail:o,internalEmail:i.email,cid:r,amName:s,amEmail:i.email,amOrigem:i.origem,appointmentTasks:a,caseContext:d,caseLog:c,timezone:l,agentName:Ro(),agentEmail:it(),caseId:g,userProfile:Mo,advName:e,site:t,website:t,email:o,advEmail:o,salesProgram:u,language:b,seId:L,advLastName:A,advPhone:n}}var za=null,yi=null,zo=null,Si=0,Vt=.3;var Bt=localStorage.getItem("cw_sounds_muted")==="true";function ia(){if(!za){let e=window.AudioContext||window.webkitAudioContext;e&&(za=new e)}return za&&za.state==="suspended"&&za.resume(),za}function As(e){if(yi)return yi;let t=e.sampleRate*2,a=e.createBuffer(1,t,e.sampleRate),o=a.getChannelData(0);for(let n=0;n<t;n++)o[n]=Math.random()*2-1;return yi=a,a}var y={setMuted:e=>{Bt=e,localStorage.setItem("cw_sounds_muted",e)},isMuted:()=>Bt,playClick:()=>{if(Bt)return;let e=ia();if(!e)return;let t=e.currentTime,a=e.createBufferSource();a.buffer=As(e);let o=e.createBiquadFilter();o.type="highpass",o.frequency.value=4e3;let n=e.createGain();n.gain.setValueAtTime(Vt*.8,t),n.gain.exponentialRampToValueAtTime(.001,t+.015),a.connect(o),o.connect(n),n.connect(e.destination),a.start(t),a.stop(t+.02)},playHover:()=>{if(Bt)return;let e=ia();if(!e)return;let t=e.currentTime,a=e.createOscillator();a.type="sine",a.frequency.setValueAtTime(400,t);let o=e.createGain();o.gain.setValueAtTime(0,t),o.gain.linearRampToValueAtTime(Vt*.1,t+.005),o.gain.linearRampToValueAtTime(0,t+.02),a.connect(o),o.connect(e.destination),a.start(t),a.stop(t+.03)},playSuccess:()=>{if(Bt)return;let e=ia();if(!e)return;let t=e.currentTime;[1046.5,1567.9].forEach((o,n)=>{let i=e.createOscillator(),r=e.createGain();i.type="sine",i.frequency.value=o,r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(Vt*.6,t+.05),r.gain.exponentialRampToValueAtTime(.001,t+.6),i.connect(r),r.connect(e.destination),i.start(t),i.stop(t+.7)})},playGenieOpen:()=>{if(Bt)return;let e=ia();if(!e)return;let t=e.currentTime,a=e.createBufferSource();a.buffer=As(e);let o=e.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(100,t),o.frequency.exponentialRampToValueAtTime(800,t+.2);let n=e.createGain();n.gain.setValueAtTime(0,t),n.gain.linearRampToValueAtTime(Vt*.5,t+.05),n.gain.linearRampToValueAtTime(0,t+.25),a.connect(o),o.connect(n),n.connect(e.destination),a.start(t),a.stop(t+.3)},playError:()=>{if(Bt)return;let e=ia();if(!e)return;let t=e.currentTime,a=e.createOscillator(),o=e.createGain();a.type="triangle",a.frequency.setValueAtTime(120,t),a.frequency.exponentialRampToValueAtTime(80,t+.1),o.gain.setValueAtTime(Vt,t),o.gain.exponentialRampToValueAtTime(.001,t+.15),a.connect(o),o.connect(e.destination),a.start(t),a.stop(t+.2)},playStartup:()=>{if(Bt)return;let e=ia();if(!e)return;let t=e.currentTime,a=.12,o=e.createOscillator(),n=e.createGain(),i=e.createBiquadFilter();o.type="square",o.frequency.setValueAtTime(400,t),o.frequency.exponentialRampToValueAtTime(50,t+.1),i.type="lowpass",i.frequency.setValueAtTime(800,t),i.frequency.exponentialRampToValueAtTime(100,t+.1),n.gain.setValueAtTime(Vt*4,t),n.gain.exponentialRampToValueAtTime(.001,t+.1),o.connect(i),i.connect(n),n.connect(e.destination),o.start(t),o.stop(t+.12);let r=e.createOscillator(),s=e.createGain();r.type="sine",r.frequency.setValueAtTime(150,t),r.frequency.exponentialRampToValueAtTime(50,t+.15),s.gain.setValueAtTime(Vt*1.5,t),s.gain.exponentialRampToValueAtTime(.001,t+.15),r.connect(s),s.connect(e.destination),r.start(t),r.stop(t+.15),[55,55.4,110.5].forEach(d=>{let c=e.createOscillator(),g=e.createGain(),u=e.createBiquadFilter();c.type="sawtooth",c.frequency.value=d,u.type="lowpass",u.frequency.setValueAtTime(30,t),u.frequency.linearRampToValueAtTime(900,t+a+.2),u.frequency.exponentialRampToValueAtTime(40,t+3),g.gain.setValueAtTime(0,t),g.gain.linearRampToValueAtTime(Vt*.6,t+a+.1),g.gain.exponentialRampToValueAtTime(.001,t+3.5),c.connect(u),u.connect(g),g.connect(e.destination),c.start(t),c.stop(t+3.6)})},playNotification:()=>{if(Bt)return;let e=ia();if(!e)return;let t=e.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(o=>{let n=e.createOscillator(),i=e.createGain();n.type="sine",n.frequency.setValueAtTime(o.freq,t),i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(Vt*o.vol,t+.004),i.gain.exponentialRampToValueAtTime(.001,t+o.dur),n.connect(i),i.connect(e.destination),n.start(t),n.stop(t+o.dur+.1)})},playReady:()=>{if(Bt)return;let e=ia();if(!e)return;let t=e.currentTime;[{freq:587.33,at:0,dur:.2,vol:.26},{freq:880,at:.09,dur:.3,vol:.3},{freq:1760,at:.09,dur:.26,vol:.08}].forEach(o=>{let n=e.createOscillator(),i=e.createGain();n.type="sine",n.frequency.value=o.freq;let r=t+o.at;i.gain.setValueAtTime(0,r),i.gain.linearRampToValueAtTime(Vt*o.vol,r+.02),i.gain.exponentialRampToValueAtTime(.001,r+o.dur),n.connect(i),i.connect(e.destination),n.start(r),n.stop(r+o.dur+.05)})},playNotice:()=>{if(Bt)return;let e=ia();if(!e)return;let t=e.currentTime;[{freq:783.99,at:0,dur:.22,vol:.2},{freq:659.25,at:.11,dur:.34,vol:.18}].forEach(o=>{let n=e.createOscillator(),i=e.createGain();n.type="sine",n.frequency.value=o.freq;let r=t+o.at;i.gain.setValueAtTime(0,r),i.gain.linearRampToValueAtTime(Vt*o.vol,r+.02),i.gain.exponentialRampToValueAtTime(.001,r+o.dur),n.connect(i),i.connect(e.destination),n.start(r),n.stop(r+o.dur+.05)})},startThinking:()=>{if(Bt)return;let e=ia();if(!e||zo)return;let t=[523.25,659.25,783.99];Si=0;let a=()=>{if(Bt)return;let o=e.currentTime,n=e.createOscillator(),i=e.createGain();n.type="sine",n.frequency.setValueAtTime(t[Si%t.length],o),i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(Vt*.15,o+.02),i.gain.exponentialRampToValueAtTime(.001,o+.22),n.connect(i),i.connect(e.destination),n.start(o),n.stop(o+.25),Si++};a(),zo=setInterval(a,370)},stopThinking:()=>{zo&&(clearInterval(zo),zo=null)},playSwoosh:()=>{y.playGenieOpen()},playReset:()=>{y.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let e=0,t=50;document.addEventListener("mouseover",a=>{if(!za)return;let o=a.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!o||o.contains(a.relatedTarget))return;let n=Date.now();n-e<t||(y.playHover(),e=n)},{passive:!0})}};var ft={MODULE_RESTING:2147483640,MODULE_FOCUSED:2147483641,PAGE_SPOTLIGHT_OVERLAY:2147483642,PAGE_SPOTLIGHT_TARGET:2147483643,TOAST:2147483644,FOCUS_BACKDROP:2147483646,TOP:2147483647};var Es=["lucaste","ricardogi"],ao="https://docs.google.com/forms/d/1v8mi4eLmx3a2GX2lEMmxMDR2n8AdzGL9WP_p_YEaveg/viewform",Cn="https://docs.google.com/presentation/d/1EOBUyK0xK2hXv29939NjIEJpgHsKeNG37HHgI8jWTc0/preview?resourcekey=0-_ct0TKJgzoEhOkhlxz6ZbA",Wt="@lucaste";var Ci=ft.MODULE_RESTING;function Ls(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}var ks={confirma:10,erro:[10,40,10],concluido:[10,30,10]};function Pa(e="confirma"){if(!navigator.vibrate)return!1;try{return navigator.vibrate(ks[e]??ks.confirma)}catch{return!1}}function ne(e,t={}){let a=document.createElement("div"),o=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(a.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:String(ft.TOAST),opacity:"0",transition:"all 0.4s var(--cw-ease-spring)",pointerEvents:"none"}),a.textContent=e,document.body.appendChild(a),t.error?y.playError():y.playSuccess(),requestAnimationFrame(()=>{a.style.opacity="1",a.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{a.style.opacity="0",a.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>a.remove(),400)},t.duration||4e3)}function _s(e,t=null){let a=0,o=0,n=0,i=0,r=t||e;r.style.cursor="grab",r.onmousedown=s;function s(c){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(c.target.tagName)||c.target.closest(".no-drag"))return;c=c||window.event,r.style.cursor="grabbing",e.style.transition="none";let g=e.getBoundingClientRect();e.style.transform="none",e.style.left=g.left+"px",e.style.top=g.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",Ci=Math.min(Ci+1,ft.MODULE_FOCUSED),e.style.zIndex=Ci,n=c.clientX,i=c.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=d,document.onmousemove=l}function l(c){c=c||window.event,c.preventDefault(),a=n-c.clientX,o=i-c.clientY,n=c.clientX,i=c.clientY;let g=e.offsetTop-o,u=e.offsetLeft-a,b=16,L=window.innerWidth,A=window.innerHeight,C=e.offsetWidth,z=e.offsetHeight;u=Ht(u,b,L-C-b),g=Ht(g,b,A-z-b),e.style.top=g+"px",e.style.left=u+"px"}function d(){document.onmouseup=null,document.onmousemove=null,r.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s var(--cw-ease-decelerate), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var bt={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:String(ft.MODULE_RESTING),overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08),
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var Ei={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Ds={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Ms={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var Ts=!1;function Du(){if(Ts||document.getElementById("techsol-google-styles"))return;let e=document.createElement("style");e.id="techsol-google-styles",e.innerHTML=`
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
    `,document.head.appendChild(e),Ts=!0}function Os(e){Du(),e.classList.remove("google-animate-click"),e.offsetWidth,e.classList.add("google-animate-click"),setTimeout(()=>{e.classList.remove("google-animate-click")},600)}async function Mu(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let a=e.querySelector(".cursor");await Ne(200);for(let o=0;o<t.length;o++){let n=t.charAt(o),i=document.createElement("span");i.textContent=n,a&&a.parentNode===e?a.before(i):e.appendChild(i);let r=Math.floor(Math.random()*60)+30;o===0&&(r=150),o>t.length-3&&(r=30),await Ne(r)}await Ne(600),a&&(a.style.display="none")}async function ki(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
            /* Google Sans j\xE1 vem via <link> logo acima em initGlobalStylesAndFont(),
               chamada antes da splash - esse @import era uma 3a requisi\xE7\xE3o redundante
               pra fonte (a 1a \xE9 o <link>, a 2a era o do command-center.js). */
            .splash-container { font-family: 'Google Sans', sans-serif; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #202124; z-index: ${ft.TOP}; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1); }
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
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await Ne(200);let t=await qo(),a=Ss(t),o=e.querySelector("#w-icon"),n=e.querySelector("#p1"),i=e.querySelector("#p2"),r=e.querySelector("#p3"),s=e.querySelector("#p-sextou");o&&(o.innerHTML=a.icon),n&&(n.textContent=a.prefix),r&&(r.textContent=a.suffix),await Ne(300);let l=o?o.querySelector("svg"):null;if(l&&(l.style.opacity="1",l.style.transform="scale(1)"),await Ne(400),n&&(n.style.opacity="1"),y.playStartup(),i&&await Mu(i,a.name),r&&(r.style.opacity="1",r.style.transform="translateY(0)"),a.isFriday&&s){await Ne(400),s.style.display="block",s.offsetWidth;let d=s.querySelector(".sextou-badge");d&&(d.textContent=a.fridayBadge,d.style.opacity="1",d.style.transform="scale(1)")}await Ne(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await Ne(900),e.parentNode&&e.parentNode.removeChild(e)}}function qs(e){if(!e)return;let t=e.getBoundingClientRect(),a=window.innerWidth,o=window.innerHeight,n=24,i=a-t.width-n,r=o-t.height-n,s=parseFloat(e.style.left)||t.left,l=parseFloat(e.style.top)||t.top,d=Ht(s,n,i),c=Ht(l,n,r);if(d!==s||c!==l){let g=e.style.transition;e.style.transition="left 0.3s var(--cw-ease-elastic), top 0.3s var(--cw-ease-elastic)",e.style.left=`${d}px`,e.style.top=`${c}px`,setTimeout(()=>{e.style.transition=g},300)}}var Yt={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Xt(e,t){t.onmousedown=a;function a(o){o.stopPropagation(),o.preventDefault();let n=e.style.transition;e.style.transition="none";let i=o.clientX,r=o.clientY,s=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),l=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),d=i,c=r,g=!1;function u(A){d=A.clientX,c=A.clientY,g||(window.requestAnimationFrame(()=>{b(),g=!1}),g=!0)}function b(){let A=s+(d-i),C=l+(c-r);A>360&&(e.style.width=A+"px"),C>300&&(e.style.height=C+"px")}function L(){document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",L),setTimeout(()=>{e.style.transition=n},50)}document.addEventListener("mousemove",u),document.addEventListener("mouseup",L)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}var Is={pt:{unavailable:"Data indispon\xEDvel",at:"\xE0s"},es:{unavailable:"Fecha no disponible",at:"a las"},en:{unavailable:"Date unavailable",at:"at"}};function Po(e){let t=ge(),a=Is[t]||Is.pt;if(!e||e==="N/A"||e==="undefined")return a.unavailable;if(String(e).includes(" | "))return e.split(" | ").map(o=>Po(o.trim())).filter(o=>o!==a.unavailable).join(" | ");try{let o=new Date(e);if(isNaN(o.getTime()))return a.unavailable;let n=Oa(t),i=o.toLocaleDateString(n,{day:"2-digit",month:gn(t),year:"numeric"}),r=o.toLocaleTimeString(n,{hour:"2-digit",minute:"2-digit"});return`${i} ${a.at} ${r}`}catch{return a.unavailable}}function Rs(e){if(!e)return"";let t={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return e.replace(/:([a-zA-Z0-9-_+]+):/g,a=>t[a]?t[a]:"")}function Fs(){let e=document.createElement("div");return e.className="cw-dialog-overlay",Object.assign(e.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:ft.TOP,opacity:0,transition:"opacity 0.3s ease"}),e}function zs(){let e=document.createElement("div");return Object.assign(e.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s var(--cw-ease-spring)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),e}var Ns={pt:{cancel:"Cancelar",confirm:"Confirmar",delete:"Excluir"},es:{cancel:"Cancelar",confirm:"Confirmar",delete:"Eliminar"},en:{cancel:"Cancel",confirm:"Confirm",delete:"Delete"}};function Ai(e){return(Ns[ge()]||Ns.pt)[e]}function ot(e,t={}){return new Promise(a=>{let o=Fs(),n=zs(),i=t.danger?"#FF3B30":"#007AFF",r=t.confirmText||Ai(t.danger?"delete":"confirm");n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${e}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">${Ai("cancel")}</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${i}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${r}</button>
            </div>
        `,o.appendChild(n),document.body.appendChild(o),requestAnimationFrame(()=>{o.style.opacity=1,n.style.transform="scale(1)"});let s=c=>{o.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{o.remove(),a(c)},300)},l=n.querySelector("#cw-conf-cancel"),d=n.querySelector("#cw-conf-ok");[l,d].forEach(c=>c.onmouseenter=()=>y.playHover()),l.onclick=()=>{y.playClick(),s(!1)},d.onclick=()=>{y.playClick(),s(!0)}})}function An(e,t=""){return new Promise(a=>{let o=Fs(),n=zs();n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${e}</div>
            <input type="text" id="cw-prompt-input" value="${t}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">${Ai("cancel")}</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,o.appendChild(n),document.body.appendChild(o);let i=n.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{o.style.opacity=1,n.style.transform="scale(1)",setTimeout(()=>i.focus(),100)});let r=d=>{o.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{o.remove(),a(d)},300)},s=n.querySelector("#cw-prompt-cancel"),l=n.querySelector("#cw-prompt-ok");[s,l].forEach(d=>d.onmouseenter=()=>y.playHover()),s.onclick=()=>{y.playClick(),r(null)},l.onclick=()=>{y.playClick(),r(i.value)},i.onkeydown=d=>{d.key==="Enter"&&l.click(),d.key==="Escape"&&s.click()}})}var $o=class{constructor(){this.visible=!1,this.currentLang="pt",this.reset()}reset(){this.currentCaseType="bau",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.activeFields=[];let t=typeof localStorage<"u"?localStorage.getItem("cw-notes-favorites"):null;this.favorites=new Set(JSON.parse(t||"[]")),this.screenshotMode="implementation",this.notify()}setCaseType(t){this.currentCaseType!==t&&(this.currentCaseType=t,this.isDirty=!0,this.notify())}setLanguage(t){this.currentLang!==t&&(this.currentLang=t,this.notify())}setPortugalCase(t){this.isPortugalCase!==t&&(this.isPortugalCase=t,this.isDirty=!0,this.notify())}setConsent(t){this.consent!==t&&(this.consent=t,this.isDirty=!0,this.notify())}setTagSupportUsed(t){this.tagSupportUsed=t,t||this.forcedScreenshots.clear(),this.isDirty=!0,this.notify()}setActiveFields(t){this.activeFields=[...t],this.isDirty=!0,this.notify()}removeField(t){this.activeFields=this.activeFields.filter(a=>a!==t),this.isDirty=!0,this.notify()}addFieldAt(t,a){this.activeFields.includes(t)||(this.activeFields.splice(a,0,t),this.isDirty=!0,this.notify())}setForcedScreenshots(t){this.forcedScreenshots=new Set(t),this.isDirty=!0,this.notify()}toggleForcedScreenshot(t,a){a?this.forcedScreenshots.add(t):this.forcedScreenshots.delete(t),this.isDirty=!0,this.notify()}setStatus(t){this.currentStatus!==t&&(this.currentStatus=t,this.isDirty=!0,this.notify())}setSubStatus(t){this.currentSubStatus!==t&&(this.currentSubStatus=t,this.isDirty=!0,this.notify())}setScreenshotMode(t){this.screenshotMode=t,this.notify()}setActiveTasks(t){this.activeTasks=t,this.isDirty=!0,this.notify()}toggleFavorite(t){this.favorites.has(t)?this.favorites.delete(t):this.favorites.add(t),typeof localStorage<"u"&&localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(t,a){this.formData[t]!==a&&(this.formData[t]=a,this.isDirty=!0,this.notify())}listeners=[];subscribe(t){return this.listeners.push(t),()=>this.listeners=this.listeners.filter(a=>a!==t)}notify(){this.listeners.forEach(t=>t(this))}},me=new $o;var Ps={pt:{helpTooltip:"Sobre & Feedback",closeTooltip:"Fechar",version:"Vers\xE3o",reportLink:"Reportar Bug ou Sugest\xE3o",docsLink:"Abrir a documenta\xE7\xE3o",backBtn:"Voltar",createdBy:"criado por"},es:{helpTooltip:"Acerca de y Comentarios",closeTooltip:"Cerrar",version:"Versi\xF3n",reportLink:"Reportar error o sugerencia",docsLink:"Abrir la documentaci\xF3n",backBtn:"Volver",createdBy:"creado por"},en:{helpTooltip:"About & Feedback",closeTooltip:"Close",version:"Version",reportLink:"Report a Bug or Suggestion",docsLink:"Open the documentation",backBtn:"Back",createdBy:"created by"}};function Rt(e){let t=ge();return Ps[t]?.[e]??Ps.pt[e]??e}var Ou={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},$s={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function rt(e,t,a,o,n,i){let r=document.createElement("div");Object.assign(r.style,Ou),_s(e,r);let s=document.createElement("div");if(Object.assign(s.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",backgroundSize:"300% auto",zIndex:"10",opacity:"0.8"}),!document.getElementById("cw-header-anim")){let G=document.createElement("style");G.id="cw-header-anim",G.innerHTML=`
            @keyframes cw-header-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `,document.head.appendChild(G)}window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||(s.style.animation="cw-header-flow 6s linear infinite"),r.appendChild(s),n&&(n.googleLine=s);let d=document.createElement("div");Object.assign(d.style,{display:"flex",alignItems:"center",gap:"12px"});let c=document.createElement("div");c.innerHTML='<svg viewBox="0 0 48 48" width="20" height="20"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/></svg>',Object.assign(c.style,{width:"20px",height:"20px",pointerEvents:"none",flexShrink:"0",display:"flex"});let g=document.createElement("span");g.textContent=t,d.appendChild(c),d.appendChild(g);let u=document.createElement("div");Object.assign(u.style,{display:"flex",alignItems:"center",gap:"4px"});let b='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',L='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',A=document.createElement("div");A.innerHTML=b,Object.assign(A.style,$s),A.title=Rt("helpTooltip"),A.classList.add("no-drag"),A.onmouseenter=()=>{A.style.background="rgba(255,255,255,0.1)",A.style.color="#FFF"},A.onmouseleave=()=>{A.style.color!=="rgb(138, 180, 248)"&&(A.style.background="transparent",A.style.color="#9AA0A6")};let C=document.createElement("div");C.innerHTML=L,Object.assign(C.style,$s),C.title=Rt("closeTooltip"),C.classList.add("no-drag","cw-header-close"),C.onmouseenter=()=>{C.style.background="rgba(242, 139, 130, 0.2)",C.style.color="#F28B82"},C.onmouseleave=()=>{C.style.background="transparent",C.style.color="#9AA0A6"},C.onmousedown=G=>G.stopPropagation(),A.onmousedown=G=>G.stopPropagation(),C.onclick=i;let z=qu(e,t,a,o);return A.onclick=G=>{G.stopPropagation(),z.style.opacity==="1"?(z.style.opacity="0",z.style.pointerEvents="none",A.style.color="#9AA0A6",A.style.background="transparent"):(z.style.opacity="1",z.style.pointerEvents="auto",A.style.color="#8AB4F8",A.style.background="rgba(138, 180, 248, 0.1)")},u.appendChild(A),u.appendChild(C),r.appendChild(d),r.appendChild(u),je(()=>{A.title=Rt("helpTooltip"),C.title=Rt("closeTooltip")}),r}var Bs=`
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
`;function qu(e,t,a,o){let n=document.createElement("div");return Object.assign(n.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),n.innerHTML=`
        <div class="cw-help-title" style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${t}</div>
        <div class="cw-help-version" style="color: #5f6368; font-size: 14px; margin-bottom: 24px;">${Rt("version")} ${a}</div>

        <div class="cw-help-description" style="color: #3c4043; font-size: 14px; max-width: 90%; line-height: 1.6; margin-bottom: 24px;">
            ${o}
        </div>

        <div style="margin-bottom: 32px; display: flex; flex-direction: column; align-items: center; gap: 10px;">
            <a href="${Cn}" target="_blank" rel="noopener noreferrer" class="cw-help-link" style="${Bs}">
                <span>\u{1F4D6}</span> <span class="cw-help-docs-link">${Rt("docsLink")}</span>
            </a>
            <a href="${ao}" target="_blank" rel="noopener noreferrer" id="cw-feedback-link" class="cw-help-link" style="${Bs}">
                <span>\u{1F4AC}</span> <span class="cw-help-report-link">${Rt("reportLink")}</span>
            </a>
        </div>

        <div class="cw-help-created-by" style="font-size: 12px; color: #9aa0a6;">
            ${Rt("createdBy")} <span style="color: #1a73e8; font-weight: 500;">${Wt}</span>
        </div>

        <button id="close-help-internal" style="margin-top: 24px; padding: 8px 24px; border: 1px solid #dadce0; background: white; border-radius: 18px; color: #5f6368; cursor: pointer; font-weight: 500; transition: background 0.2s;">
            ${Rt("backBtn")}
        </button>
    `,setTimeout(()=>{n.querySelectorAll(".cw-help-link").forEach(r=>{r.onmouseenter=()=>{r.style.backgroundColor="#E8F0FE",r.style.transform="scale(1.02)"},r.onmouseleave=()=>{r.style.backgroundColor="#F8F9FA",r.style.transform="scale(1)"}});let i=n.querySelector("#close-help-internal");i&&(i.onmouseover=()=>i.style.backgroundColor="#f8f9fa",i.onmouseout=()=>i.style.backgroundColor="white",i.onclick=()=>{n.style.opacity="0",n.style.pointerEvents="none"})},0),je(()=>{let i=n.querySelector(".cw-help-version");i&&(i.textContent=`${Rt("version")} ${a}`);let r=n.querySelector(".cw-help-docs-link");r&&(r.textContent=Rt("docsLink"));let s=n.querySelector(".cw-help-report-link");s&&(s.textContent=Rt("reportLink"));let l=n.querySelector(".cw-help-created-by");l&&(l.firstChild.textContent=`${Rt("createdBy")} `);let d=n.querySelector("#close-help-internal");d&&(d.textContent=Rt("backBtn"))}),e.appendChild(n),n}var J={blue:"#4285F4",red:"#EA4335",yellow:"#FBBC05",green:"#34A853",primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#34A853",warning:"#FBBC05",error:"#EA4335"},pt={small:"8px",medium:"12px",large:"20px",pill:"100px"},ua={subtle:"0 1px 3px rgba(0,0,0,0.08)",card:"0 4px 12px rgba(0,0,0,0.05)",elevated:"0 12px 24px rgba(0,0,0,0.08)",apple:"0 20px 40px rgba(0,0,0,0.12)"},$e="cubic-bezier(0.34, 1.56, 0.64, 1)",Ru={width:"100%",padding:"14px 16px",borderRadius:pt.medium,border:`1.5px solid ${J.border}`,backgroundColor:J.bgInput,fontSize:"14px",color:J.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`all 0.3s ${$e}`,outline:"none"},sb={...Ru,minHeight:"120px",resize:"vertical",lineHeight:"1.6"},lb={fontSize:"12px",fontWeight:"700",color:J.textSub,textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px 0"},cb={display:"block",fontSize:"14px",fontWeight:"600",color:J.text,marginBottom:"10px",marginTop:"20px"},db={fontSize:"12px",color:J.warning,marginTop:"8px",display:"flex",alignItems:"center",gap:"8px",fontWeight:"500"},Ti={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:J.primary},pb={display:"flex",alignItems:"center",marginBottom:"12px",fontSize:"14px",fontWeight:"500",color:J.text,cursor:"pointer",padding:"16px 20px",backgroundColor:J.surface,border:`1px solid ${J.border}`,borderRadius:pt.large,transition:`all 0.4s ${$e}`,userSelect:"none",boxShadow:ua.subtle},ub={padding:"14px 28px",color:"#fff",backgroundColor:J.primary,border:"none",borderRadius:pt.pill,fontSize:"15px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px 0 rgba(26,115,232,0.39)",transition:`all 0.25s ${$e}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",outline:"none"},mb={width:"100%",padding:"12px",background:"#FFFFFF",border:`1.5px dashed ${J.primary}`,color:J.primary,borderRadius:pt.medium,cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"16px",transition:`all 0.25s ${$e}`},gb={background:"transparent",border:`1px solid ${J.border}`,borderRadius:pt.pill,color:J.textSub,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",margin:"20px auto",transition:`all 0.25s ${$e}`};var Bo={pt:"Gera notas padronizadas com excel\xEAncia visual.",es:"Genera notas estandarizadas con excelencia visual.",en:"Builds standardized notes with visual polish."};function Gs(e,t){let a=document.createElement("div");a.id="notes-assistant-popup",a.classList.add("cw-module-window"),Object.assign(a.style,bt,{right:"100px",width:"520px",height:"740px",display:"flex",flexDirection:"column",transition:`width 0.4s ${$e}, height 0.4s ${$e}, transform 0.4s ${$e}, opacity 0.3s ease`,borderRadius:pt.large,boxShadow:ua.apple,border:"1px solid rgba(255, 255, 255, 0.7)"});let o={popup:a,googleLine:null},n=rt(a,"Case Notes",e,Bo[ge()]||Bo.pt,o,t);a.appendChild(n);let i=document.createElement("div");i.className="cw-popup-content",Object.assign(i.style,{padding:"24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"24px",background:J.surface}),a.appendChild(i);let r=document.createElement("div");r.textContent=`created by ${Wt}`,Object.assign(r.style,Ms,{padding:"16px 24px",borderTop:`1px solid ${J.bgInput}`,color:J.textSub,fontSize:"11px",marginTop:"auto",fontWeight:"500",letterSpacing:"0.5px"}),a.appendChild(r);let s=document.createElement("div");return Object.assign(s.style,Yt),s.className="no-drag",a.appendChild(s),Xt(a,s),Fu(),{popup:a,content:i,header:n,animRefs:o,credit:r}}function Fu(){if(document.getElementById("cw-notes-refactor-styles"))return;let e=document.createElement("style");e.id="cw-notes-refactor-styles",e.innerHTML=`
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
            transition: border-color 0.2s ${$e}, background-color 0.2s ${$e}, box-shadow 0.2s ${$e} !important;
            box-sizing: border-box !important;
            background: ${J.bgInput} !important;
            color: ${J.text} !important;
            outline: none !important;
            box-shadow: ${ua.subtle} !important;
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
            transition: border-color 0.2s ${$e}, background-color 0.2s ${$e}, box-shadow 0.2s ${$e} !important;
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
            transition: background-color 0.2s ${$e}, transform 0.2s ${$e}, box-shadow 0.2s ${$e};
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
            transition: background-color 0.2s ${$e}, border-color 0.2s ${$e}, color 0.2s ${$e};
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
    `,document.head.appendChild(e)}var st={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"Selecione",substatus:"Substatus:",select_substatus:"Selecione o Status",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",preencher_email_automaticamente:"Preencher email automaticamente?",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",trechos:"Trechos",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",atalhos_ajuda:"Atalhos para as implementa\xE7\xF5es mais frequentes.<br>Use a busca abaixo para o cat\xE1logo completo.",nenhum_resultado:"Nenhum resultado.",alternar_split:"Alternar para Split & Transfer",preencha_obrigatorio:"Preencha o campo obrigat\xF3rio antes de gerar",selecione_task_gerar:"Selecione ao menos uma tarefa antes de gerar a nota.",nota_nao_abriu:"N\xE3o foi poss\xEDvel abrir a nota no CRM. O conte\xFAdo j\xE1 est\xE1 copiado \u2014 cole manualmente.",sessao_restaurada:"Sess\xE3o restaurada!",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",ts_antes_dos_prints:"Responda antes de colar os prints. Com Sim, as tasks Ads Conversion Tracking e Enhanced Conversions dispensam os prints; as outras tasks seguem pedindo.",ts_nao_se_aplica:"Task n\xE3o se aplica ao uso do TSA.",ts_bloco_titulo:"Tag Support utilizado: prints dispensados",ts_bloco_corpo:"Os prints n\xE3o foram anexados porque o Tag Support foi utilizado. De acordo com o Win Criteria, n\xE3o s\xE3o necess\xE1rios prints das tasks em que ele foi usado.",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",link_aqui:"Link aqui",tag_support_output_label:"Utilizou Tag Support?",motivo_output_label:"Motivo:",auto_busca:"\u2728 Auto Busca",utilize_marcadores:"Utilize marcadores para detalhar...",descreva_consideracoes:"Descreva as considera\xE7\xF5es...",remover:"Remover",remover_campo_confirm:'Remover o campo "{campo}"?',meus_rascunhos:"Meus Rascunhos",confirmar_guardar_rascunho:"Deseja guardar o rascunho atual e limpar os campos?",rascunho_salvo_sucesso:"Rascunho salvo com sucesso!",erro_ler_dados:"Erro: N\xE3o foi poss\xEDvel ler os dados.",erro_ao_salvar:"Erro ao salvar.",cliente_sem_nome:"Cliente Sem Nome",sem_status:"Sem Status",retomar_caso:"Retomar Caso",descartar:"Descartar",retomar_rascunho_confirm:"Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.",rascunho_carregado:"Rascunho carregado.",excluir_rascunho_confirm:"Excluir este rascunho?",acoes_plural:"A\xE7\xF5es",acao_singular:"A\xE7\xE3o",definidas_plural:"definidas",definida_singular:"definida",renomear_tooltip:"Clique para renomear esta task",renomear_hint:"\u270E Renomear",substituir_rascunho_confirm:"Isso vai substituir o rascunho atual da nota. Deseja continuar?",salvar_como_atalho:"Salvar como atalho do Ctrl+K",atalho_nome_pergunta:"Como este atalho vai se chamar no Ctrl+K?",atalho_salvo:"Atalho salvo! J\xE1 aparece no Ctrl+K.",atalho_salvo_local:"Atalho salvo neste navegador (sem conex\xE3o com a nuvem).",atalho_limite:"Voc\xEA j\xE1 tem {max} atalhos. Apague um em Configura\xE7\xF5es antes de criar outro.",atalho_cenario_sumiu:"Este atalho apontava para um cen\xE1rio que n\xE3o existe mais. Revise-o em Configura\xE7\xF5es.",restaurar_rascunho_confirm:"Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?",cole_link_placeholder:"Cole o link aqui...",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",screenshots_aviso:"Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria.",caso_portugal:"Caso da Europa?",consentiu_gravacao:"\u23FA\uFE0F Anunciante consentiu com a grava\xE7\xE3o?",sim:"Sim",nao:"N\xE3o",pronto_comecar:"Pronto para come\xE7ar?",selecione_status_ajuda:"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Task(s) solicitada(s):",passos_executados:"\u{1F463} O que foi feito:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 D\xFAvidas do anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implementadas na call:",proximos_passos:"\u{1F680} Pr\xF3ximos passos (Acompanhamento):",consideracoes:"\u{1F4A1} Considera\xE7\xF5es adicionais:",contexto_call:"\u{1F4AC} Contexto/O que foi feito:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Minha A\xE7\xE3o:",dia:"\u{1F4C5} Dia do Follow-up (se aplic\xE1vel):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Data do reagendamento:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evid\xEAncias de Contato",evidencia:"Evid\xEAncia",nota_criada_rodape:"Nota criada atrav\xE9s do Cases Wizard.",ligacao_1:"Liga\xE7\xE3o 1",ligacao_2:"Liga\xE7\xE3o 2",mensagem_am:"Mensagem para AM",tentativa_ligacao:"\u{1F4DE} Tentativa de liga\xE7\xE3o:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"Seleccione",substatus:"Subestado:",select_substatus:"Seleccione el Estado",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",preencher_email_automaticamente:"\xBFRellenar correo autom\xE1ticamente?",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",trechos:"Fragmentos",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",atalhos_ajuda:"Atajos para las implementaciones m\xE1s frecuentes.<br>Use la b\xFAsqueda de abajo para el cat\xE1logo completo.",nenhum_resultado:"Sin resultados.",alternar_split:"Cambiar a Split & Transfer",preencha_obrigatorio:"Rellene el campo obligatorio antes de generar",selecione_task_gerar:"Seleccione al menos una tarea antes de generar la nota.",nota_nao_abriu:"No se pudo abrir la nota en el CRM. El contenido ya est\xE1 copiado: p\xE9guelo manualmente.",sessao_restaurada:"\xA1Sesi\xF3n restaurada!",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",ts_antes_dos_prints:"Responda antes de pegar las capturas. Con S\xED, las tasks Ads Conversion Tracking y Enhanced Conversions no requieren capturas; las dem\xE1s tasks las siguen pidiendo.",ts_nao_se_aplica:"La task no aplica al uso del TSA.",ts_bloco_titulo:"Tag Support utilizado: capturas no requeridas",ts_bloco_corpo:"No se adjuntaron las capturas porque se utiliz\xF3 Tag Support. Seg\xFAn el Win Criteria, no se requieren capturas de las tasks en las que se us\xF3.",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",link_aqui:"Enlace aqu\xED",tag_support_output_label:"\xBFUtiliz\xF3 Tag Support?",motivo_output_label:"Motivo:",auto_busca:"\u2728 B\xFAsqueda Autom\xE1tica",utilize_marcadores:"Utiliza vi\xF1etas para detallar...",descreva_consideracoes:"Describe las consideraciones...",remover:"Eliminar",remover_campo_confirm:'\xBFEliminar el campo "{campo}"?',meus_rascunhos:"Mis Borradores",confirmar_guardar_rascunho:"\xBFDesea guardar el borrador actual y limpiar los campos?",rascunho_salvo_sucesso:"\xA1Borrador guardado con \xE9xito!",erro_ler_dados:"Error: No fue posible leer los datos.",erro_ao_salvar:"Error al guardar.",cliente_sem_nome:"Cliente Sin Nombre",sem_status:"Sin Estado",retomar_caso:"Retomar Caso",descartar:"Descartar",retomar_rascunho_confirm:"\xBFRetomar este borrador? El formulario actual ser\xE1 reemplazado.",rascunho_carregado:"Borrador cargado.",excluir_rascunho_confirm:"\xBFEliminar este borrador?",acoes_plural:"Acciones",acao_singular:"Acci\xF3n",definidas_plural:"definidas",definida_singular:"definida",renomear_tooltip:"Haz clic para renombrar esta tarea",renomear_hint:"\u270E Renombrar",substituir_rascunho_confirm:"Esto reemplazar\xE1 el borrador actual de la nota. \xBFDeseas continuar?",salvar_como_atalho:"Guardar como atajo de Ctrl+K",atalho_nome_pergunta:"\xBFC\xF3mo se va a llamar este atajo en el Ctrl+K?",atalho_salvo:"\xA1Atajo guardado! Ya aparece en el Ctrl+K.",atalho_salvo_local:"Atajo guardado en este navegador (sin conexi\xF3n con la nube).",atalho_limite:"Ya tienes {max} atajos. Elimina uno en Configuraci\xF3n antes de crear otro.",atalho_cenario_sumiu:"Este atajo apuntaba a un escenario que ya no existe. Rev\xEDsalo en Configuraci\xF3n.",restaurar_rascunho_confirm:"Detectamos un borrador sin guardar de tu \xFAltima sesi\xF3n. \xBFDeseas restaurarlo?",cole_link_placeholder:"Pega el enlace aqu\xED...",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",screenshots_aviso:"Los screenshots siguen las directrices actuales de Win Criteria y las pol\xEDticas de Tag Support.",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Europa?",consentiu_gravacao:"\u23FA\uFE0F \xBFEl anunciante consinti\xF3 la grabaci\xF3n?",sim:"S\xED",nao:"No",pronto_comecar:"\xBFListo para empezar?",selecione_status_ajuda:"Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Tarea(s) solicitada(s):",passos_executados:"\u{1F463} Qu\xE9 se hizo:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 Dudas del anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resoluciones/Explicaciones:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tareas implementadas en la call:",proximos_passos:"\u{1F680} Pr\xF3ximos pasos:",consideracoes:"\u{1F4A1} Consideraciones adicionales:",contexto_call:"\u{1F4AC} Contexto/Qu\xE9 se hizo:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Mi Acci\xF3n:",dia:"\u{1F4C5} D\xEDa de Follow-up (si aplica):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Fecha de reprogramaci\xF3n:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evidencias de Contacto",evidencia:"Evidencia",nota_criada_rodape:"Nota creada a trav\xE9s de Cases Wizard.",ligacao_1:"Llamada 1",ligacao_2:"Llamada 2",mensagem_am:"Mensaje para AM",tentativa_ligacao:"\u{1F4DE} Intento de llamada:"},en:{idioma:"Language:",fluxo:"Flow:",status_principal:"Main Status:",select_status:"Select",substatus:"Substatus:",select_substatus:"Select the Status",cenarios_comuns:"Common Scenarios",selecione_tasks:"Select the Tasks",preencha_detalhes:"Fill In the Details",copiar:"Copy",preencher:"Fill in",limpar:"Clear",preencher_email_automaticamente:"Fill in the email automatically?",gostaria_de_adicionar_uma_task:"I would like to add a task",rascunhos_salvos:"Saved Drafts",nenhum_rascunho:"No drafts saved",guardar:"Park",trechos:"Snippets",acesso_rapido:"Quick Access",buscar_catalogo:"Search the catalog...",atalhos_ajuda:"Shortcuts for the most frequent implementations.<br>Use the search below for the full catalog.",nenhum_resultado:"No results.",alternar_split:"Switch to Split & Transfer",preencha_obrigatorio:"Fill in the required field before generating",selecione_task_gerar:"Select at least one task before generating the note.",nota_nao_abriu:"Could not open the note in the CRM. The content is already copied \u2014 paste it manually.",sessao_restaurada:"Session restored!",selecione_tarefas:"Select tasks to see the fields.",utilizou_tag_support:"Did you use Tag Support to create/verify?",ts_antes_dos_prints:"Answer before pasting the prints. With Yes, the Ads Conversion Tracking and Enhanced Conversions tasks need no prints; the other tasks still do.",ts_nao_se_aplica:"Task does not apply to TSA usage.",ts_bloco_titulo:"Tag Support used: screenshots not required",ts_bloco_corpo:"Screenshots were not attached because Tag Support was used. Per the Win Criteria, no screenshots are required for the tasks where it was used.",motivo_ts:"What was the reason?",lembre_preencher_form:"Remember to fill in the Form!",link_aqui:"Link here",tag_support_output_label:"Used Tag Support?",motivo_output_label:"Reason:",auto_busca:"\u2728 Auto Search",utilize_marcadores:"Use bullets to add detail...",descreva_consideracoes:"Describe the considerations...",remover:"Remove",remover_campo_confirm:'Remove the field "{campo}"?',meus_rascunhos:"My Drafts",confirmar_guardar_rascunho:"Park the current draft and clear the fields?",rascunho_salvo_sucesso:"Draft saved successfully!",erro_ler_dados:"Error: could not read the data.",erro_ao_salvar:"Error saving.",cliente_sem_nome:"Unnamed Customer",sem_status:"No Status",retomar_caso:"Resume Case",descartar:"Discard",retomar_rascunho_confirm:"Resume this draft? The current form will be replaced.",rascunho_carregado:"Draft loaded.",excluir_rascunho_confirm:"Delete this draft?",acoes_plural:"Actions",acao_singular:"Action",definidas_plural:"defined",definida_singular:"defined",renomear_tooltip:"Click to rename this task",renomear_hint:"\u270E Rename",substituir_rascunho_confirm:"This will replace the current note draft. Do you want to continue?",salvar_como_atalho:"Save as a Ctrl+K shortcut",atalho_nome_pergunta:"What should this shortcut be called in Ctrl+K?",atalho_salvo:"Shortcut saved! It already shows up in Ctrl+K.",atalho_salvo_local:"Shortcut saved in this browser (no cloud connection).",atalho_limite:"You already have {max} shortcuts. Delete one in Settings before creating another.",atalho_cenario_sumiu:"This shortcut pointed to a scenario that no longer exists. Review it in Settings.",restaurar_rascunho_confirm:"We found an unsaved draft from your last session. Would you like to restore it?",cole_link_placeholder:"Paste the link here...",copiado_sucesso:"Text copied successfully",inserido_copiado:"Text inserted and copied!",campo_nao_encontrado:"Field not found. The text has already been copied.",ts_disclaimer:"Screenshots are not required for conversions created/verified by Tag Support",screenshots_aviso:"Screenshots follow the current Win Criteria guidelines and Tag Support policies.",incluir_mesmo_assim:"Include anyway",ajuda_scenarios:"How do I use Scenarios?",ajuda_scenarios_desc:"Scenarios fill in several note fields automatically. Click a chip to apply it. You can combine several scenarios (e.g.: GTM Installation + WhatsApp).",ts_output_disclaimer:"Tag created/verified by Tag Support, as the note automatically added to the case indicates. I am not including the screenshots, in line with the Win Criteria guidance.",caso_portugal:"Europe case?",consentiu_gravacao:"\u23FA\uFE0F Did the advertiser consent to the recording?",sim:"Yes",nao:"No",pronto_comecar:"Ready to start?",selecione_status_ajuda:"Select a status and substatus to<br>start your technical note.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Requested task(s):",passos_executados:"\u{1F463} What was done:",resultado:"\u{1F3C6} Result:",duvidas:"\u2753 Advertiser questions:",problemas:"\u26A0\uFE0F Initial problem:",resolucoes:"\u2705 Resolutions/Explanations:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verified:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implemented on the call:",proximos_passos:"\u{1F680} Next steps (Follow-up):",consideracoes:"\u{1F4A1} Additional considerations:",contexto_call:"\u{1F4AC} Context/What was done:",impedimento_cliente:"\u{1F6A7} Blocker / Next step (Advertiser):",minha_acao:"\u{1F468}\u200D\u{1F4BB} My Action:",dia:"\u{1F4C5} Follow-up day (if applicable):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Rescheduling date:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Contact Evidence",evidencia:"Evidence",nota_criada_rodape:"Note created through Cases Wizard.",ligacao_1:"Call 1",ligacao_2:"Call 2",mensagem_am:"Message to the AM",tentativa_ligacao:"\u{1F4DE} Call attempt:"}},Ze={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},zu={"GTM Instalado":"GTM Instalado","Vinculador de convers\xF5es":"Vinculador de conversiones","Tag criada":"Etiqueta creada","Teste GTM":"Prueba GTM","Teste Ads":"Prueba Ads","Vers\xE3o Publicada":"Versi\xF3n Publicada","Status Ads":"Estado Ads","Termos aceitos no Ads":"T\xE9rminos aceptados en Ads","Tag implementada":"Etiqueta implementada","Painel do Ads (ap\xF3s 7 dias)":"Panel de Ads (despu\xE9s de 7 d\xEDas)","Tag do evento GA4 implementado no GTM":"Etiqueta del evento GA4 implementada en GTM","Teste GTM (tagassistant.google.com)":"Prueba GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)":"Prueba GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM":"Versi\xF3n publicada en GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4":"(Si hay par\xE1metros) Dimensiones personalizadas creadas en GA4","Evento marcado como principal no GA4":"Evento marcado como principal en GA4","GA4 e Google Ads vinculados corretamente":"GA4 y Google Ads vinculados correctamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)":"Evento principal de GA4 importado en Google Ads (como secundario)","M\xE9tricas app & web ativadas no Google Ads":"M\xE9tricas app y web activadas en Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)":"(Opcional) Prueba en el Informe de Tiempo Real (GA4)","Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)":"Validaci\xF3n: Cuenta GA4 (solo flujo web, no es sector salud)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)':'"Recopilaci\xF3n de datos proporcionados por el usuario" habilitada en GA4 (Administrador > Recopilaci\xF3n de Datos)',"Confirma\xE7\xE3o de coleta de dados (UI)":"Confirmaci\xF3n de recopilaci\xF3n de datos (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM":"Etiqueta del evento GA4 optimizado (UPD) implementada en GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)":"Prueba GTM (tagassistant - par\xE1metro 'em' sin error)","Teste GA4 (DebugView - tagassistant)":"Prueba GA4 (DebugView - tagassistant)","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio":"(Capacitaci\xF3n) Evento principal importado en Google Ads como secundario","Tag implementado no GTM":"Etiqueta implementada en GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo":"Prueba del disparo de la etiqueta de configuraci\xF3n en tag assistant en m\xE1s de una p\xE1gina, mostrando ID y etiqueta","Teste usando o #google-wcc-debug":"Prueba usando #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]":"Cambio del estado de la conversi\xF3n en Google Ads [Esperar algunos minutos]","1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas":"1. OGT (gTag/GTM con etiqueta de vinculador de conversi\xF3n) a\xF1adido en todas las p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)":"2. El etiquetado autom\xE1tico (auto tagging) est\xE1 habilitado en Google Ads (Administrador > Config. de la Cuenta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".':'3. [Si es GTM] El vinculador de conversi\xF3n est\xE1 presente y el activador definido para dispararse en "Todas las P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?":"4. \xBFEl gclid se mantiene sin redirecciones y se almacena en la cookie _gcl_aw en la landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?":"5. \xBFEl gclid fue pasado a la p\xE1gina de conversi\xF3n?"},Pu={"GTM Instalado":"GTM Installed","Vinculador de convers\xF5es":"Conversion Linker","Tag criada":"Tag created","Teste GTM":"GTM test","Teste Ads":"Ads test","Vers\xE3o Publicada":"Published Version","Status Ads":"Ads Status","Termos aceitos no Ads":"Terms accepted in Ads","Tag implementada":"Tag implemented","Painel do Ads (ap\xF3s 7 dias)":"Ads dashboard (after 7 days)","Tag do evento GA4 implementado no GTM":"GA4 event tag implemented in GTM","Teste GTM (tagassistant.google.com)":"GTM test (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)":"GA4 test (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM":"Version published in GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4":"(If there are parameters) Custom dimensions created in GA4","Evento marcado como principal no GA4":"Event marked as key event in GA4","GA4 e Google Ads vinculados corretamente":"GA4 and Google Ads linked correctly","Evento principal GA4 importado no Google Ads (como secund\xE1rio)":"GA4 key event imported into Google Ads (as secondary)","M\xE9tricas app & web ativadas no Google Ads":"App & web metrics enabled in Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)":"(Optional) Test in the Realtime report (GA4)","Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)":"Validation: GA4 account (web stream only, not healthcare)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)':'"User-provided data collection" enabled in GA4 (Admin > Data Collection)',"Confirma\xE7\xE3o de coleta de dados (UI)":"Data collection confirmation (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM":"Optimized GA4 event tag (UPD) implemented in GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)":"GTM test (tagassistant - 'em' parameter with no error)","Teste GA4 (DebugView - tagassistant)":"GA4 test (DebugView - tagassistant)","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio":"(Training) Key event imported into Google Ads as secondary","Tag implementado no GTM":"Tag implemented in GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo":"Test of the configuration tag firing in tag assistant on more than one page, showing ID and label","Teste usando o #google-wcc-debug":"Test using #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]":"Change of the conversion status in Google Ads [Wait a few minutes]","1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas":"1. OGT (gTag/GTM with Conversion Linker tag) added on all pages","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)":"2. Auto tagging is enabled in Google Ads (Admin > Account Settings)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".':'3. [If GTM] The Conversion Linker is present and the trigger set to fire on "All Pages".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?":"4. Is the gclid being kept without redirects and stored in the _gcl_aw cookie on the landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?":"5. Was the gclid passed to the conversion page?"},$u={es:zu,en:Pu};function js(e,t,a){let o=e?.screenshots?.[t]||[],n=$u[a];if(!n)return o;let i=e?.[`screenshots_${a}`]?.[t],r=s=>String(i?.[s]==null?"":i[s]).trim();return e?.daCentral?o.map((s,l)=>r(l)||s):Array.isArray(i)?o.map((s,l)=>r(l)||n[s]||s):o.map(s=>n[s]||s)}function Hs(e,t,a){let o=e?.[`fieldPrefixes_${a}`]?.[t];return o||e?.fieldPrefixes?.[t]||""}function oo(e,t,a){let o={es:kn,en:Tn}[t];if(!o)return e;let n=o[a];return n?{...e,...n}:e}function no(e,t){return Object.entries(Mt).filter(([,a])=>{let o=!a.type||a.type==="all"||a.type===t,n=Array.isArray(a.substatus)&&a.substatus.includes(e);return o&&n})}function Aa(e,t){let a=String(e||"");if(a.startsWith("quickfill-"))return a.slice(10);if(t){let n=`cw-${String(t).toLowerCase()}-`;if(a.startsWith(n))return a.slice(n.length)}let o=a.match(/^cw-[a-z0-9_]+-(.+)$/);return o?o[1]:a}function io(e,t){return Aa(e,t).replace(/-/g," ")}var Bu=["GTM_GA4_VERIFICADO","MULTIPLE_CIDS"],Gu=["REASON_COMMENTS"];function Go(e){let t=[...Gu];return e?.requiresTasks&&t.push("GTM_GA4_VERIFICADO"),t}function Us(e){let t=[...Bu,...e?.extraOptionalFields||[]],a=Go(e);return t.filter(o=>!a.includes(o))}var lt={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Caso Reagendado."},fieldPrefixes_es:{REASON_COMMENTS:"Caso Reprogramado."},fieldPrefixes_en:{REASON_COMMENTS:"Case Rescheduled."}},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Reagendamento aceit\xE1vel."},fieldPrefixes_es:{REASON_COMMENTS:"Reprogramaci\xF3n aceptable."},fieldPrefixes_en:{REASON_COMMENTS:"Acceptable rescheduling."}},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","DIA","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Aguardando Valida\xE7\xF5es no Google Ads."},fieldPrefixes_es:{REASON_COMMENTS:"Esperando Validaciones en Google Ads."},fieldPrefixes_en:{REASON_COMMENTS:"Awaiting Validations in Google Ads."}},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES"]},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","TENTATIVA_LIGACAO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PASSOS_EXECUTADOS","RESULTADO","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["PROXIMOS_PASSOS"],fieldPrefixes:{REASON_COMMENTS:"Task implementada com sucesso."},fieldPrefixes_es:{REASON_COMMENTS:"Tarea implementada con \xE9xito."},fieldPrefixes_en:{REASON_COMMENTS:"Task implemented successfully."}},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","DUVIDAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["PROXIMOS_PASSOS","CONSIDERACOES"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para tirar d\xFAvidas do anunciante."},fieldPrefixes_es:{REASON_COMMENTS:"Consultor\xEDa utilizada para resolver dudas del anunciante."},fieldPrefixes_en:{REASON_COMMENTS:"Consultation used to answer the advertiser\u2019s questions."}},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PROBLEMAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para testar e solucinar problemas da convers\xE3o."},fieldPrefixes_es:{REASON_COMMENTS:"Consultor\xEDa utilizada para probar y solucionar problemas de la conversi\xF3n."},fieldPrefixes_en:{REASON_COMMENTS:"Consultation used to test and troubleshoot the conversion."}},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,templateFields:["SPEAKEASY_ID","label_substatus","REASON_COMMENTS","COMENTARIOS"],customFooter:"Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},ra={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},ro=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],En=["CONSIDERACOES","COMENTARIOS"],Mt={"quickfill-gtm-install":{type:"all",substatus:["SO_Implementation_Only"],"field-REASON_COMMENTS":"Instala\xE7\xE3o do GTM finalizada.","field-TASKS_SOLICITADAS":"\u2022 Instala\xE7\xE3o do GTM","field-PASSOS_EXECUTADOS":`\u2022 Criamos a conta dentro do GTM
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

Irei abrir caso em BAU para o dia solicitado e pedir a inativa\xE7\xE3o do mesmo.`}},kn={"quickfill-gtm-install":{"field-REASON_COMMENTS":"Instalaci\xF3n de GTM finalizada.","field-TASKS_SOLICITADAS":"\u2022 Instalaci\xF3n de GTM","field-PASSOS_EXECUTADOS":`\u2022 Creamos la cuenta dentro de GTM
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

Abrir\xE9 un caso en BAU para el d\xEDa solicitado y pedir\xE9 la inactivaci\xF3n del mismo.`}},Tn={"quickfill-gtm-install":{"field-REASON_COMMENTS":"GTM installation completed.","field-TASKS_SOLICITADAS":"\u2022 GTM Installation","field-PASSOS_EXECUTADOS":`\u2022 We created the account inside GTM
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

I will open a BAU case for the requested day and ask for it to be inactivated.`}};var Vs={pt:{searching:"Buscando ID...",readingMessage:"Lendo mensagem...",idFound:e=>`ID Localizado: ${e}`,noIdFound:"Nenhum ID encontrado.",notFound:"N\xE3o encontrado",processingError:"Erro ao processar."},es:{searching:"Buscando ID...",readingMessage:"Leyendo mensaje...",idFound:e=>`ID Encontrado: ${e}`,noIdFound:"Ning\xFAn ID encontrado.",notFound:"No encontrado",processingError:"Error al procesar."},en:{searching:"Searching for ID...",readingMessage:"Reading message...",idFound:e=>`ID found: ${e}`,noIdFound:"No ID found.",notFound:"Not found",processingError:"Processing error."}};function so(e){let t=ge();return Vs[t]?.[e]??Vs.pt[e]}var Ws="cw-automation-styles";if(!document.getElementById(Ws)){let e=document.createElement("style");e.id=Ws,e.innerHTML=`
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
            z-index: ${ft.PAGE_SPOTLIGHT_TARGET} !important; 
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
            z-index: ${ft.PAGE_SPOTLIGHT_OVERLAY};   /* Fica atr\xE1s do Input */
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: all;                  /* Bloqueia cliques na p\xE1gina */
        }
    `,document.head.appendChild(e)}function Ys(e){let t=document.getElementById("cw-loading-overlay");e?t?t.style.opacity="1":(t=document.createElement("div"),t.id="cw-loading-overlay",document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1")):t&&(t.style.opacity="0",setTimeout(()=>t.remove(),300))}async function lo(e){await Oo();let t=typeof e=="string"?document.getElementById(e):e,a="";Ys(!0),t&&(a=t.placeholder,t.placeholder=so("searching"),t.value="",t.classList.add("cw-scanning-active"));try{let o=document.querySelector('material-button[debug-id="dock-item-case-log"]');o&&!o.classList.contains("selected")&&(ya(o),await Ne(1200));let n=document.querySelector("search-filter dropdown-button .button");if(n&&!(n.innerText||"").includes("All")){ya(n),await Ne(600);let u=document.querySelector('material-checkbox[debug-id="check-all-box"]');u&&u.getAttribute("aria-checked")!=="true"&&(ya(u),await Ne(300));let b=document.querySelector('material-button[debug-id="apply-filter"]');b&&(ya(b),await Ne(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await Ne(500));let r=Array.from(document.querySelectorAll(".message-header"));for(let g=r.length-1;g>=0;g--){let u=r[g],b=u.querySelector("i.material-icons-extended"),L=b&&b.innerText.trim()==="phone_in_talk",A=u.innerText||"",C=A.includes("Agent joined")||A.includes("outbound-call")||A.includes("Speakeasy");if(L||C){u.getAttribute("aria-expanded")==="true"||(t&&(t.placeholder=so("readingMessage")),ya(u),await Ne(1e3));break}}let l=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),d=/Speakeasy.*?(P\d{15,25})/i,c=null;for(let g=l.length-1;g>=0;g--){let u=l[g];if(u.offsetParent===null)continue;let b=(u.innerText||"").match(d);if(b&&b[1]){c=b[1];break}}if(t)if(c){try{await navigator.clipboard.writeText(c)}catch{}t.tagName==="INPUT"||t.tagName==="TEXTAREA"?t.value=c:t.textContent=c,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),y.playReady(),Pa("confirma"),ne(so("idFound")(c)),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}else y.playError(),Pa("erro"),ne(so("noIdFound"),{error:!0}),t.placeholder=so("notFound"),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}catch(o){console.error("Erro na automa\xE7\xE3o:",o),y.playError(),ne(so("processingError"),{error:!0})}finally{t&&(t.classList.remove("cw-scanning-active"),t.value||(t.placeholder=a)),Ys(!1)}}function Xs(e){e.dataset.bulletEnabled!=="true"&&(e.dataset.bulletEnabled="true",(e.value.trim()===""||e.value.trim()==="\u2022")&&(e.value="\u2022 "),e.addEventListener("keydown",function(t){let a=this.selectionStart,o=this.selectionEnd,n=this.value,i=n.lastIndexOf(`
`,a-1)+1,r=n.substring(i,a);if(t.key==="Enter"){t.preventDefault();let s=r.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(r.trim()==="\u2022"){this.value=n.substring(0,i)+`
`+n.substring(o),this.selectionStart=this.selectionEnd=i+1;return}let l=`
`+s;this.value=n.substring(0,a)+l+n.substring(o),this.selectionStart=this.selectionEnd=a+l.length}else if(t.key==="Tab")t.preventDefault(),t.shiftKey?r.startsWith("  ")&&(this.value=n.substring(0,i)+r.substring(2)+n.substring(a),this.selectionStart=this.selectionEnd=a-2):(this.value=n.substring(0,i)+"  "+r+n.substring(a),this.selectionStart=this.selectionEnd=a+2);else if(t.key==="Backspace"&&a===o&&a>0){let s=n.substring(0,a);s.endsWith("\u2022 ")?(t.preventDefault(),this.value=s.substring(0,a-2)+n.substring(o),this.selectionStart=this.selectionEnd=a-2):s.endsWith("  ")&&r.trim().startsWith("\u2022")&&(t.preventDefault(),this.value=s.substring(0,a-2)+n.substring(o),this.selectionStart=this.selectionEnd=a-2)}}))}var Ii=(e,t)=>st[e.currentLang]?.[t]||st.pt?.[t]||t,Ni=e=>st[ge()]?.[e]||st.pt?.[e]||e;function jo(e,t,a){t.innerHTML="";let o=lt[e];if(!o)return;let n=Go(o);if(a.activeFields.forEach(r=>{if(["TAGS_IMPLEMENTED","SCREENSHOTS_LIST","CONSENTIU_GRAVACAO","CASO_PORTUGAL","label_substatus"].includes(r))return;let s=`field-${r}`,l=document.createElement("label"),d=b=>Ii(a,b);l.textContent=d(r.toLowerCase())!==r.toLowerCase()?d(r.toLowerCase()):r.replace(/_/g," ").replace(/\b\w/g,b=>b.toUpperCase())+":",Object.assign(l.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px",fontWeight:"700",color:J.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let c=n.includes(r),g=document.createElement("span");if(g.textContent=l.textContent,c){let b=document.createElement("span");b.textContent=" *",b.style.color=J.error,g.appendChild(b)}if(l.innerHTML="",l.appendChild(g),r==="SPEAKEASY_ID"){let b=document.createElement("button");b.innerHTML=Ni("auto_busca"),b.style.cssText=`font-size: 11px; font-weight: 700; color: ${J.primary}; background-color: ${J.primaryBg}; border: none; border-radius: ${pt.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${$e};`,b.onmouseenter=()=>b.style.backgroundColor="#d2e3fc",b.onmouseleave=()=>b.style.backgroundColor=J.primaryBg,b.onclick=L=>{L.preventDefault(),y.playClick(),lo(s)},l.appendChild(b)}if(!c){let b=document.createElement("button");b.innerHTML="\u2715",b.style.cssText=`font-size: 14px; background: ${J.bgInput}; border: none; color: ${J.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${$e};`,b.onmouseenter=()=>{b.style.background=J.error,b.style.color=J.surface},b.onmouseleave=()=>{b.style.background=J.bgInput,b.style.color=J.textSub},b.onclick=async L=>{L.preventDefault(),y.playClick();let A=g.textContent.replace(/:\s*$/,"").trim();await ot(Ni("remover_campo_confirm").replace("{campo}",A),{danger:!0,confirmText:Ni("remover")})&&(a.removeField(r),jo(e,t,a))},l.appendChild(b)}let u;ro.includes(r)?(u=document.createElement("textarea"),u.classList.add("bullet-textarea","cw-textarea"),u.placeholder=d("utilize_marcadores"),Xs(u)):En.includes(r)?(u=document.createElement("textarea"),u.classList.add("cw-textarea"),u.placeholder=d("descreva_consideracoes")):(u=document.createElement("input"),u.type="text",u.classList.add("cw-input")),u.id=s,u.value=a.formData[s]||"",u.addEventListener("input",b=>a.updateField(s,b.target.value)),t.appendChild(l),t.appendChild(u)}),a.activeFields.includes("CONSENTIU_GRAVACAO")){let r=d=>Ii(a,d),s=document.createElement("label");s.textContent=r("consentiu_gravacao"),Object.assign(s.style,{display:"block",fontSize:"13px",fontWeight:"700",color:J.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let l=document.createElement("select");l.className="cw-select",l.innerHTML=`
            <option value="false">${r("nao")}</option>
            <option value="true">${r("sim")}</option>
        `,l.value=a.consent?"true":"false",l.onchange=()=>a.setConsent(l.value==="true"),t.appendChild(s),t.appendChild(l)}let i=(o.templateFields||[]).filter(r=>!n.includes(r)&&!a.activeFields.includes(r));if(i.length>0){let r=l=>Ii(a,l),s=document.createElement("div");Object.assign(s.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginTop:"24px"}),i.forEach(l=>{let d=r(l.toLowerCase())!==l.toLowerCase()?r(l.toLowerCase()):l.replace(/_/g," ").replace(/\b\w/g,g=>g.toUpperCase())+":",c=document.createElement("button");c.type="button",c.textContent=`+ ${d.replace(/:$/,"")}`,c.style.cssText=`font-size: 12px; font-weight: 600; color: ${J.primary}; background-color: ${J.primaryBg}; border: none; border-radius: ${pt.pill}; padding: 6px 14px; cursor: pointer; transition: all 0.2s ${$e};`,c.onmouseenter=()=>c.style.backgroundColor="#d2e3fc",c.onmouseleave=()=>c.style.backgroundColor=J.primaryBg,c.onclick=g=>{g.preventDefault(),y.playClick(),a.addFieldAt(l,a.activeFields.length),jo(e,t,a)},s.appendChild(c)}),t.appendChild(s)}}var Li={ES:{...kn},EN:{...Tn},substatus:Object.fromEntries(Object.entries(Mt).map(([e,t])=>[e,t.substatus||[]]))};function ju(e,t,a){let o=Aa(t,a[0]),n=Object.keys(Li[e]).find(i=>{let r=Li.substatus[i]||[];return Aa(i,r[0])===o&&a.some(s=>r.includes(s))});return n?Li[e][n]:void 0}function Hu(e){let t=String(e.label||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");return`cw-${String(e.key||"").toLowerCase()}-${t}`}function Uu(e){let t;try{t=JSON.parse(e||"{}")}catch{return null}let a=t.fields||{};return Object.keys(a).length?{fields:a,linkedTask:t.linkedTask,activeTasks:t.activeTasks}:null}function Ks(e){if(!Array.isArray(e)||!e.length)return!1;let t={},a={ES:{},EN:{}},o=e.slice().sort((n,i)=>(n.sortOrder||0)-(i.sortOrder||0));for(let n of o){if(!n.key)continue;let i=Uu(n.value);if(!i)continue;let r=Hu(n),s=String(n.lang||"").toUpperCase(),l=a[s];if(l){l[r]={...i.fields};continue}s&&s!=="PT"&&s!=="ALL"||(t[r]={type:(n.field||"all").toLowerCase(),substatus:[n.key],...i.fields,...i.linkedTask?{linkedTask:i.linkedTask}:{},...i.activeTasks?{activeTasks:i.activeTasks}:{}})}if(!Object.keys(t).length)return!1;for(let n of Object.keys(Mt))delete Mt[n];Object.assign(Mt,t);for(let[n,i]of[["ES",kn],["EN",Tn]]){let r={};for(let[s,l]of Object.entries(t)){let d=ju(n,s,l.substatus);d&&(r[s]=d)}Object.assign(r,a[n]);for(let s of Object.keys(i))delete i[s];Object.assign(i,r)}return!0}async function Qs(){let e=Te.getCachedContent("note_template"),t=Ks(e);try{let a=await Te.fetchContentModule("note_template");t=Ks(a)||t}catch(a){console.warn("Modelos de nota indispon\xEDveis; usando os embutidos.",a)}return t}function Vu(e){let t;try{t=JSON.parse(e||"{}")}catch{return null}let a=String(t.name||"").trim();if(!a)return null;let o=t.screenshots||{},n=Array.isArray(o.implementation)?o.implementation:[],i=Array.isArray(o.education)?o.education:[],r={name:a,daCentral:!0,screenshots:{implementation:n,education:i}};t.popular===!0&&(r.popular=!0);for(let s of["es","en"]){let l=`screenshots_${s}`,d=t[l];!d||!(Array.isArray(d.implementation)||Array.isArray(d.education))||(r[l]={},Array.isArray(d.implementation)&&(r[l].implementation=d.implementation),Array.isArray(d.education)&&(r[l].education=d.education))}return r}function Js(e){if(!Array.isArray(e)||!e.length)return!1;let t={},a=e.slice().sort((o,n)=>(o.sortOrder||0)-(n.sortOrder||0));for(let o of a){let n=String(o.key||"").trim();if(!n)continue;let i=Vu(o.value);i&&(t[n]=i)}if(!Object.keys(t).length)return!1;for(let o of Object.keys(Ze))delete Ze[o];return Object.assign(Ze,t),!0}var el=new Set,_i=null;function Zs(){for(let e of el)try{e()}catch(t){console.warn("Assinante do cat\xE1logo de tasks falhou.",t)}}async function Wu(){let e=Te.getCachedContent("task_screenshots"),t=Js(e);t&&Zs();try{let a=await Te.fetchContentModule("task_screenshots");Js(a)&&(t=!0,Zs())}catch(a){console.warn("Cat\xE1logo de tasks indispon\xEDvel; usando o embutido.",a)}return t}function co(e){return e&&el.add(e),_i||(_i=Wu()),_i}function Di(e,t,a,o=null){let n=e.currentSubStatus;if(!n)return null;let i=lt[n],r=st[e.currentLang]||st.pt,s=c=>r[c]||st.pt?.[c]||c,l='style="margin-bottom: 12px; padding-left: 30px;"',d="";if(e.activeFields.forEach(c=>{let g=s(c.toLowerCase()),u="N/A";if(c==="label_substatus")g=s("label_substatus"),u=i.name;else if(c==="TAGS_IMPLEMENTED"){g=s("tags_implemented");let b=[];t.getCheckedElements().forEach(A=>{let C=A.value,z=Ze[C],G=A.count||1,R=C==="ads_conversion_tracking"||C==="ads_enhanced_conversions";e.tagSupportUsed&&R&&!e.forcedScreenshots.has(C)?b.push(`${z.name} - ${s("ts_output_disclaimer")}`):b.push(G>1?`${z.name} (x${G})`:z.name)}),u=b.join(", ")||"N/A"}else if(c==="SCREENSHOTS_LIST"){g=s("screenshots_list");let b="",L=t.screenshotsElement;L&&Array.from(L.querySelectorAll('input[id^="name-"]')).forEach(C=>{let z=C.value,G=C.closest(".cw-screen-card");if(G){let R=G.querySelectorAll('input[id^="screen-"]'),O=!1,de="";R.forEach(te=>{let ee=te.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||s("evidencia"),w=te.value.trim();w&&(de+=`<li>${ee} - ${w}</li>`,O=!0)}),O&&(b+=`<div style="margin-bottom: 8px;"><b>${z}</b><ul ${l}>${de}</ul></div>`)}}),u=b||"N/A"}else if(c==="CASO_PORTUGAL")g=s("caso_portugal"),u=s("sim");else if(c==="CONSENTIU_GRAVACAO")g=s("consentiu_gravacao"),u=e.consent?s("sim"):s("nao");else{let b=`field-${c}`,L=e.formData[b],A=Hs(i,c,e.currentLang),C=A?A+" ":"";if(L&&L.trim()!==""&&L.trim()!=="\u2022"){let z=L.trim();if(ro.includes(c)){let G=z.split(`
`).map(R=>R.trim()).filter(R=>R!==""&&R!=="\u2022").map(R=>R.startsWith("\u2022 ")?R.substring(2):R).map(R=>`<li>${R}</li>`).join("");u=G?`${C}<ul ${l}>${G}</ul>`:"N/A"}else En.includes(c)?u=C+z.split(`
`).filter(G=>G.trim()!=="").map(G=>`<p style="margin: 0 0 8px 0;">${G}</p>`).join(""):u=C+z}else C&&(u=C.trim())}d+=`<b>${g}</b><br>${u}<br><br>`}),o){let c="";o.l1&&(c+=`<li>${s("ligacao_1")}: ${o.l1}</li>`),o.l2&&(c+=`<li>${s("ligacao_2")}: ${o.l2}</li>`),o.msg&&(c+=`<li>${s("mensagem_am")}: ${o.msg}</li>`),c&&(d+=`<b>${s("evidencias_contato")}</b><br><ul ${l}>${c}</ul><br>`)}if(i.customFooter&&(d+=`${i.customFooter}<br><br>`),a?.getOutput){let c=a.getOutput();c&&(d+=`${c}<br><br>`)}return d+=`<i>${s("nota_criada_rodape")}</i>`,d.replace(/(<br>\s*){3,}/g,"<br><br>").trim()}var tl={pt:"Passe o mouse sobre um cen\xE1rio para visualizar o texto...",es:"Pasa el mouse sobre un escenario para ver el texto...",en:"Hover over a scenario to preview the text..."};function Mi(){return tl[ge()]||tl.pt}function al(e){let t=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,a=document.createElement("div");a.className="cw-step-scenarios";let o=document.createElement("div");Object.assign(o.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let n=document.createElement("div");Object.assign(n.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"44px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"});let i=document.createElement("span");i.style.transition="opacity 0.05s ease, transform 0.05s ease",i.textContent=Mi(),n.appendChild(i);let r=new Set,s=null,l=!0;return je(()=>{l&&(i.textContent=Mi())}),a.render=(d,c)=>{r.clear();let g=no(d,c);o.innerHTML="",g.forEach(([u,b])=>{let L=document.createElement("div");L.textContent=io(u,d),L.dataset.id=u,L.dataset.sound="hover",Object.assign(L.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"});let A=oo(b,Tt(),u),C=A["field-REASON_COMMENTS"]||A["field-CONTEXTO_CALL"]||u;L.onmouseenter=()=>{s&&clearTimeout(s),r.has(u)||(L.style.background="#f1f3f4"),i.style.opacity="0",t||(i.style.transform="translateY(5px)"),s=setTimeout(()=>{l=!1,i.textContent=C.substring(0,120)+(C.length>120?"...":""),i.style.opacity="1",t||(i.style.transform="translateY(0)")},50)},L.onmouseleave=()=>{s&&clearTimeout(s),r.has(u)||(L.style.background="#ffffff"),s=setTimeout(()=>{r.size===0&&(i.style.opacity="0",setTimeout(()=>{l=!0,i.textContent=Mi(),i.style.opacity="1"},50))},100)},L.onclick=()=>{y.playClick();let z=!r.has(u);z?(r.add(u),L.style.background="#e8f0fe",L.style.borderColor="#1a73e8",L.style.color="#1967d2"):(r.delete(u),L.style.background="#ffffff",L.style.borderColor="#dadce0",L.style.color="#3c4043"),e(u,z)},o.appendChild(L)}),g.length===0?a.style.display="none":a.style.display="block"},a.getSelectedIds=()=>[...r],a.appendChild(o),a.appendChild(n),a}function Yu(e){return e==="ads_conversion_tracking"||e==="ads_enhanced_conversions"}function Oi(e,t){return t.tagSupportUsed&&Yu(e)&&!t.forcedScreenshots.has(e)}var ze={bg:J.bgInput,white:J.surface,border:J.border,textMain:J.text,textSub:J.textSub,blue:J.blue,blueLight:J.primaryBg,brands:{ads:{id:"ads",label:"Google Ads",color:J.blue,bg:J.primaryBg,icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:J.yellow,bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:J.primary,bg:J.primaryBg,icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:J.green,bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},$a={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function In(e,t,a){let o={};a&&a.subscribe(()=>{ee(),w()});function n(S){let D=S.toLowerCase();return D.includes("ads")||D.includes("conversion")||D.includes("remarketing")?ze.brands.ads:D.includes("ga4")||D.includes("analytics")?ze.brands.ga4:D.includes("gtm")||D.includes("tag manager")||D.includes("container")?ze.brands.gtm:D.includes("merchant")||D.includes("shopping")||D.includes("feed")?ze.brands.gmc:ze.brands.default}let i=[],r={};function s(){i=Object.entries(Ze).filter(([S,D])=>D.popular),r={},Object.entries(Ze).forEach(([S,D])=>{if(D.popular)return;let j=n(D.name);r[j.label]||(r[j.label]={brand:j,tasks:[]}),r[j.label].tasks.push({key:S,...D})})}s();let l="cw-zen-tasks";if(!document.getElementById(l)){let S=document.createElement("style");S.id=l,S.innerHTML=`
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
        `,document.head.appendChild(S)}let d=document.createElement("div");d.className="cw-zen-container";let c=document.createElement("div");Object.assign(c.style,{display:"none"});let g=document.createElement("div");g.className="cw-screens-container",c.appendChild(g),d.innerHTML=`
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
    `;let u=d.querySelector(".cw-hero-grid"),b=d.querySelector(".cw-acc-container"),L=d.querySelector(".cw-results-container"),A=d.querySelector(".cw-search-input");hn(d,".cw-acc-header, .cw-task-item");let C=d.querySelector(".cw-status-bar"),z=d.querySelector(".cw-status-text"),G=d.querySelector(".cw-footer-icons");function R(S,D){return j=>{if(j.target.closest(".cw-step-btn-hero, .cw-step-btn-list"))return;let F=o[S]?o[S].count:0;re(S,F>0?-F:1,D)}}function O(){u.innerHTML="",i.forEach(([S,D])=>{let j=n(D.name),F=document.createElement("div");F.className="cw-hero-card",F.id=`hero-${S}`,F.style.setProperty("--hero-color",j.color),F.innerHTML=`
              <div class="cw-hero-main">
                  <div class="cw-hero-icon">${$a[j.icon]}</div>
                  <div class="cw-hero-label">${D.name}</div>
              </div>
            
              <div class="cw-hero-stepper">
                  <div class="cw-step-btn-hero minus">\u2212</div>
                  <div class="cw-step-val">1</div>
                  <div class="cw-step-btn-hero plus">+</div>
              </div>
          `,F.onclick=R(S,D),F.querySelector(".minus").onclick=()=>re(S,-1,D),F.querySelector(".plus").onclick=()=>re(S,1,D),F.tabIndex=0,F.setAttribute("role","button"),F.setAttribute("aria-pressed","false"),F.addEventListener("keydown",Z=>{(Z.key==="Enter"||Z.key===" ")&&(Z.preventDefault(),F.click())}),F.dataset.color=j.color,u.appendChild(F)})}O();function de(S,D){let j=n(D.name),F=document.createElement("div");return F.className="cw-task-item",F.dataset.id=S,F.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${j.bg}; color:${j.color}">
                    ${$a[j.icon]||$a.default}
                </div>
                <div class="cw-task-label">${D.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn-list minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn-list plus">+</div>
            </div>
        `,F.onclick=R(S,D),F.querySelector(".minus").onclick=()=>re(S,-1,D),F.querySelector(".plus").onclick=()=>re(S,1,D),F.tabIndex=0,F.setAttribute("role","button"),F.setAttribute("aria-pressed","false"),F.setAttribute("aria-label",D.name),F.addEventListener("keydown",Z=>{(Z.key==="Enter"||Z.key===" ")&&(Z.preventDefault(),F.click())}),F}function te(){b.innerHTML="",Object.entries(r).forEach(([S,D])=>{let j=document.createElement("div");j.className="cw-acc-group";let F=document.createElement("div");F.className="cw-acc-header",F.innerHTML=`
              <div class="cw-acc-title">
                  <div class="cw-acc-dot" style="background:${D.brand.color}"></div>
                  ${S}
              </div>
              <div class="cw-acc-icon">\u25BC</div>
          `,F.tabIndex=0,F.setAttribute("role","button"),F.setAttribute("aria-expanded","false"),F.onclick=()=>{b.querySelectorAll(".cw-acc-group.open").forEach(he=>{he!==j&&(he.classList.remove("open"),he.querySelector(".cw-acc-header")?.setAttribute("aria-expanded","false"))});let fe=j.classList.toggle("open");F.setAttribute("aria-expanded",String(fe))},F.addEventListener("keydown",fe=>{(fe.key==="Enter"||fe.key===" ")&&(fe.preventDefault(),F.click())});let Z=document.createElement("div");Z.className="cw-acc-body",D.tasks.forEach(fe=>{let he=de(fe.key,fe);Z.appendChild(he)}),j.appendChild(F),j.appendChild(Z),b.appendChild(j)})}te();function re(S,D,j){o[S]||(o[S]={count:0,data:j,brand:n(j.name)}),o[S].count+=D,o[S].count<=0&&delete o[S],ee(),w(),e&&e()}function ee(){i.forEach(([Z])=>{let fe=u.querySelector(`#hero-${Z}`);if(!fe)return;let he=o[Z];he?(fe.classList.add("active"),fe.setAttribute("aria-pressed","true"),fe.querySelector(".cw-step-val").textContent=he.count,fe.querySelector(".cw-step-val").style.color=fe.dataset.color,fe.classList.toggle("ts-success",Oi(Z,a))):(fe.classList.remove("active"),fe.setAttribute("aria-pressed","false"),fe.classList.remove("ts-success"))}),d.querySelectorAll(".cw-task-item").forEach(Z=>{let fe=Z.dataset.id,he=o[fe];he?(Z.classList.add("selected"),Z.setAttribute("aria-pressed","true"),Z.querySelector(".cw-step-val").textContent=he.count,Z.classList.toggle("ts-success",Oi(fe,a))):(Z.classList.remove("selected"),Z.setAttribute("aria-pressed","false"),Z.classList.remove("ts-success"))});let D=Object.keys(o),j=0,F=[];if(D.forEach(Z=>{let fe=o[Z];j+=fe.count;for(let he=0;he<fe.count;he++)F.length<6&&F.push(fe.brand)}),j>0){C.classList.add("visible");let Z=j>1?t("acoes_plural"):t("acao_singular"),fe=j>1?t("definidas_plural"):t("definida_singular");z.textContent=`${j} ${Z} ${fe}`,G.innerHTML="",F.forEach(he=>{let ue=document.createElement("div");ue.className="cw-mini-icon-status",ue.innerHTML=$a[he.icon]||$a.default;let ce=ue.querySelector("svg");ce&&(ce.style.width="14px",ce.style.height="14px"),G.appendChild(ue)})}else C.classList.remove("visible"),z.textContent="",G.innerHTML=""}A.addEventListener("input",S=>{let D=S.target.value.toLowerCase();if(D.length>0){b.style.display="none",L.style.display="block",L.innerHTML="";let j=!1;Object.entries(Ze).forEach(([F,Z])=>{if(Z.name.toLowerCase().includes(D)){j=!0;let fe=de(F,Z);o[F]&&(fe.classList.add("selected"),fe.setAttribute("aria-pressed","true"),fe.querySelector(".cw-step-val").textContent=o[F].count),L.appendChild(fe)}}),j||(L.innerHTML=`<div style="padding:20px; text-align:center; font-size:13px; color:#999">${t("nenhum_resultado")}</div>`)}else b.style.display="block",L.style.display="none"});function w(){let S={};g.querySelectorAll(".cw-input-field").forEach(Z=>{S[Z.id]=Z.value}),g.innerHTML="";let D=Object.keys(o),j=!1;if(D.length===0){g.appendChild(_o({icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg>',title:t("selecione_tarefas")})),c.style.display="none";return}let F=document.createElement("div");F.className="cw-info-banner",F.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>${t("screenshots_aviso")}</span>
        `,g.appendChild(F),D.forEach(Z=>{let fe=o[Z].data,he=o[Z].count,ue=o[Z].brand,ce=Oi(Z,a),le=a.screenshotMode||"implementation",xe=js(fe,le,a.currentLang);if(xe.length>0||ce){j=!0;for(let E=1;E<=he;E++){let K=document.createElement("div");K.className="cw-screen-card",ce&&K.classList.add("ts-success"),K.style.setProperty("--brand-color",ue.color),K.style.setProperty("--brand-bg",ue.bg),K.style.setProperty("--brand-shadow",ue.color+"40");let se=document.createElement("div");se.className="cw-card-header";let V=document.createElement("div");V.className="cw-card-icon",V.innerHTML=$a[ue.icon]||$a.default;let q=document.createElement("div");q.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let T=document.createElement("input");T.className="cw-card-title-input",T.id=`name-${Z}-${E}`,T.value=`${fe.name}${he>1?" #"+E:""}`,T.title=t("renomear_tooltip");let H=document.createElement("span");if(H.className="cw-edit-hint",H.innerHTML=t("renomear_hint"),q.appendChild(T),q.appendChild(H),se.appendChild(V),se.appendChild(q),K.appendChild(se),ce){let ie=document.createElement("div");ie.className="cw-ts-disclaimer-box",ie.innerHTML=`
                <span>${t("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${t("incluir_mesmo_assim")}</button>
            `,ie.querySelector("button").onclick=()=>{a.toggleForcedScreenshot(Z,!0)},K.appendChild(ie)}else xe.forEach((ie,P)=>{let Q=document.createElement("div");Q.className="cw-input-group";let pe=document.createElement("label");pe.className="cw-input-label",pe.textContent=ie;let v=document.createElement("input");v.className="cw-input-field",v.id=`screen-${Z}-${E}-${P}`,v.placeholder=t("cole_link_placeholder"),v.setAttribute("autocomplete","off"),S[v.id]&&(v.value=S[v.id],v.value.trim().length>5&&v.classList.add("filled")),v.addEventListener("input",()=>{v.value.trim().length>5?v.classList.add("filled"):v.classList.remove("filled")});let h=document.createElement("div");h.className="cw-input-check",h.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',Q.appendChild(pe),Q.appendChild(v),Q.appendChild(h),K.appendChild(Q)});g.appendChild(K)}}}),c.style.display=j?"block":"none"}return{selectionElement:d,screenshotsElement:c,updateSubStatus:()=>w(),getCheckedElements:()=>Object.keys(o).map(S=>({value:S,count:o[S].count})),setTaskCount:(S,D)=>{o[S]&&delete o[S],D>0&&Ze[S]&&re(S,D,Ze[S])},toggleTask:(S,D=!0)=>{let j=o[S];D&&!j?re(S,1,Ze[S]):!D&&j&&re(S,-j.count,Ze[S])},setLanguage:S=>{t=S;let D=d.querySelector(".js-hero-title");D&&(D.textContent=t("acesso_rapido"));let j=d.querySelector(".js-hero-help");j&&(j.innerHTML=t("atalhos_ajuda"));let F=d.querySelector(".cw-search-input");F&&(F.placeholder=t("buscar_catalogo"));let Z=d.querySelector('label[for="cw-task-search-input"]');Z&&(Z.textContent=t("buscar_catalogo")),w(),ee()},refreshCatalog:()=>{s(),Object.keys(o).forEach(S=>{let D=Ze[S];D&&(o[S].data=D,o[S].brand=n(D.name))}),O(),te(),ee(),w()},reset:()=>{for(let S in o)delete o[S];A.value="",b.style.display="block",L.style.display="none",ee(),w()}}}var Xu={marginTop:"24px",marginBottom:"16px",padding:"20px",background:"#fff9e6",borderRadius:"20px",border:"2px solid #fbbc05",borderLeft:"8px solid #f29900",display:"none",boxShadow:"0 6px 18px rgba(251, 188, 5, 0.18)"},Ku={fontSize:"12px",color:"#b06000",marginTop:"8px",lineHeight:"1.4"},Qu={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #dadce0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",background:"#fff"},Ju={fontSize:"12px",color:"#5f6368",lineHeight:"1.4",margin:"4px 0 14px 0"},Zu={display:"flex",gap:"20px",marginBottom:"12px"};function ol(e){let t=document.createElement("div");t.id="tag-support-container",Object.assign(t.style,Xu);let a=document.createElement("label");a.className="js-ts-main-label",a.textContent=e("utilizou_tag_support"),Object.assign(a.style,Ei,{marginTop:"0"});let o=document.createElement("div");o.className="js-ts-helper",o.textContent=e("ts_antes_dos_prints"),Object.assign(o.style,Ju);let n=document.createElement("div");Object.assign(n.style,Zu);let i=document.createElement("input");i.type="radio",i.name="ts_usage_mod",i.value="Sim",Object.assign(i.style,Ti);let r=document.createElement("label");r.className="js-ts-sim-label",r.textContent=e("sim");let s=document.createElement("div");Object.assign(s.style,{display:"flex",alignItems:"center"}),s.appendChild(i),s.appendChild(r);let l=document.createElement("input");l.type="radio",l.name="ts_usage_mod",l.value="N\xE3o",l.checked=!0,Object.assign(l.style,Ti);let d=document.createElement("label");d.className="js-ts-nao-label",d.textContent=e("nao");let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center"}),c.appendChild(l),c.appendChild(d),n.appendChild(s),n.appendChild(c);let g=document.createElement("div");g.style.display="block";let u=document.createElement("label");u.className="js-ts-reason-label",u.textContent=e("motivo_ts"),Object.assign(u.style,Ei,{fontSize:"12px"});let b=document.createElement("input");b.type="text",Object.assign(b.style,Qu);let L=document.createElement("div");L.className="js-ts-warning",L.innerHTML=`\u26A0\uFE0F <strong>${e("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" rel="noopener noreferrer" style="color:#e37400; text-decoration:underline;">${e("link_aqui")}</a>`,Object.assign(L.style,Ku),g.appendChild(u),g.appendChild(b),g.appendChild(L),t.appendChild(a),t.appendChild(o),t.appendChild(n),t.appendChild(g),i.onchange=()=>{y.playClick(),g.style.display="none",me.setTagSupportUsed(!0)},l.onchange=()=>{y.playClick(),g.style.display="block",me.setTagSupportUsed(!1)};let A="none";function C(O,de){if(t.style.display="none",A="none",!O||!de||de.length===0)return;de.some(re=>re==="ads_conversion_tracking"||re==="ads_enhanced_conversions")?(A="ask",t.style.display="block"):(R(),me.setTagSupportUsed(!1),A="auto")}function z(){if(A==="auto")return`<br><b>${e("tag_support_output_label")}</b> \u274C ${e("nao")}<br><b>${e("motivo_output_label")}</b> ${e("ts_nao_se_aplica")}<br>`;if(A!=="ask")return"";let O=`<br><b>${e("tag_support_output_label")}</b> ${i.checked?`\u2705 ${e("sim")}`:`\u274C ${e("nao")}`}`;return l.checked&&b.value.trim()!==""&&(O+=`<br><b>${e("motivo_output_label")}</b> ${b.value}`),O+="<br>",O}function G(O){e=O,a.textContent=e("utilizou_tag_support"),o.textContent=e("ts_antes_dos_prints"),u.textContent=e("motivo_ts"),r.textContent=e("sim"),d.textContent=e("nao"),L.innerHTML=`\u26A0\uFE0F <strong>${e("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" rel="noopener noreferrer" style="color:#b06000; text-decoration:underline;">${e("link_aqui")}</a>`}function R(){t.style.display="none",l.checked=!0,i.checked=!1,g.style.display="block",b.value=""}return{element:t,updateVisibility:C,getOutput:z,setLanguage:G,reset:R}}var em="cw_notes_parking_lot",tm="cw_notes_emergency_save";function qi({storageKey:e,emergencyKey:t,maxDrafts:a=5}){let o={getAll:()=>{try{return JSON.parse(localStorage.getItem(e)||"[]")}catch{return[]}},save:n=>{let i=o.getAll(),r={id:Date.now().toString(),timestamp:new Date().toISOString(),...n};return i.unshift(r),i.length>a&&i.pop(),localStorage.setItem(e,JSON.stringify(i)),r},delete:n=>{let i=o.getAll();return i=i.filter(r=>r.id!==n),localStorage.setItem(e,JSON.stringify(i)),i},getCount:()=>o.getAll().length,saveEmergency:n=>{let i={timestamp:Date.now(),data:n};localStorage.setItem(t,JSON.stringify(i))},getEmergency:()=>{try{let n=localStorage.getItem(t);if(!n)return null;let i=JSON.parse(n);return Date.now()-i.timestamp>432e5?(localStorage.removeItem(t),null):!i.data||!i.data.subStatus?null:i.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(t)}};return o}var Gt=qi({storageKey:em,emergencyKey:tm});var nl="cw_case_streak_v1",am=[5,10,15,20,25,30,40,50];function il(){let e=new Date;return`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`}function Ri(){try{let e=JSON.parse(localStorage.getItem(nl)||"{}");return e.date===il()&&e.count||0}catch{return 0}}function rl(){let e=Ri()+1;try{localStorage.setItem(nl,JSON.stringify({date:il(),count:e}))}catch{}return{count:e,isMilestone:am.includes(e)}}var ll="cw_user_prefs_v1",Pi="cw_user_prefs_pending_v1",Fi=!1,Ho=null;function po(){try{let e=localStorage.getItem(ll),t=e?JSON.parse(e):null;return t&&typeof t=="object"?t:{}}catch{return{}}}function sl(e){try{localStorage.setItem(ll,JSON.stringify(e))}catch(t){console.warn("N\xE3o consegui gravar as prefer\xEAncias localmente:",t)}}function zi(e){try{e?localStorage.setItem(Pi,"1"):localStorage.removeItem(Pi)}catch{}}function om(){try{return localStorage.getItem(Pi)==="1"}catch{return!1}}var Xe={get(e,t=null){let a=po();return e in a?a[e]:t},async set(e,t){let a=po();a[e]=t,sl(a);let o=it();if(!o)return zi(!0),{saved:!0,synced:!1};Fi=!0;let n=!1;try{n=await Te.saveUserPrefs(a,o)}catch(i){console.warn("Falha ao salvar prefer\xEAncias na nuvem:",i)}finally{zi(!n),setTimeout(()=>{Fi=!1},2e3)}return{saved:!0,synced:n}},sync(){return Ho||(it()?(Ho=(async()=>{let e=it();try{if(om()){let a=po(),o=await Te.saveUserPrefs(a,e);return zi(!o),a}let t=await Te.getUserPrefs(e);if(t&&typeof t=="object"&&!Fi){let a=po();JSON.stringify(t)!==JSON.stringify(a)&&sl(t)}}catch(t){console.warn("Prefer\xEAncias indispon\xEDveis; seguindo com o cache local.",t)}finally{Ho=null}return po()})(),Ho):Promise.resolve(po()))}};var dl="pillLayout",uo=["notes","precall","bauform","email","script","links","library","timezone","configs","broadcast","notetable"],ma=7,nm={pinned:["notes","precall","bauform","email","script","links","broadcast"],drawer:["library","timezone","configs","notetable"]},Uo=e=>({pt:e,es:e,en:e}),im={notes:Uo("Case Notes"),precall:Uo("Pre-call Checklist"),bauform:Uo("BAU Form"),email:Uo("Email Assistant"),script:Uo("Call Script"),links:{pt:"Central de Links",es:"Central de Enlaces",en:"Links Central"},library:{pt:"Minha Biblioteca",es:"Mi Biblioteca",en:"My Library"},timezone:{pt:"Fusos Hor\xE1rios",es:"Husos Horarios",en:"Time Zones"},configs:{pt:"Configura\xE7\xF5es",es:"Configuraci\xF3n",en:"Settings"},broadcast:{pt:"Avisos",es:"Avisos",en:"Broadcast"},notetable:{pt:"Nota em tabela",es:"Nota en tabla",en:"Table note"}};function Wo(e,t=ge()){let a=im[e];return a?a[t]||a.pt:e}function rm(e){let t=e&&Array.isArray(e.pinned)&&Array.isArray(e.drawer)?e:nm,a=new Set(uo),o=new Set,n=l=>{let d=[];for(let c of l)a.has(c)&&!o.has(c)&&(o.add(c),d.push(c));return d},i=n(t.pinned),r=n(t.drawer);i.length>ma&&(r=[...i.slice(ma),...r],i=i.slice(0,ma));let s=uo.filter(l=>!o.has(l));return{pinned:i,drawer:[...r,...s]}}function sm(e,t,a,o){if(!uo.includes(t))return{ok:!1,reason:"unknown"};if(a!=="pinned"&&a!=="drawer")return{ok:!1,reason:"unknown"};let n=e.pinned.filter(l=>l!==t),i=e.drawer.filter(l=>l!==t),r=a==="pinned"?n:i;if(a==="pinned"&&n.length>=ma)return{ok:!1,reason:"full"};let s=Math.max(0,Math.min(Number.isFinite(o)?o:r.length,r.length));return r.splice(s,0,t),{ok:!0,layout:{pinned:n,drawer:i}}}var $i=new Set,Nn=null;function Vo(){return rm(Xe.get(dl,null))}function pl(){let e=Vo(),t=JSON.stringify(e);t!==Nn&&(Nn=t,$i.forEach(a=>{try{a(e)}catch(o){console.warn("pill-layout: ouvinte falhou:",o)}}))}function cl(e){let t=Xe.set(dl,e).then(a=>({synced:a.synced}));return pl(),{ok:!0,saved:t}}var sa={get:Vo,isFull(){return Vo().pinned.length>=ma},move(e,t,a){let o=sm(Vo(),e,t,a);return o.ok?cl(o.layout):o},reset(){return cl(null)},onChange(e){return Nn===null&&(Nn=JSON.stringify(Vo())),$i.add(e),()=>$i.delete(e)},refresh:pl};var ul={pt:{more:"Mais m\xF3dulos",milestoneToast:e=>`\u{1F525} ${e} casos hoje!`,quickSearch:"Busca r\xE1pida: Ctrl/Cmd+K",casesToday:"Casos conclu\xEDdos hoje",drag:"Arrastar",cancel:"Cancelar",cancelledToast:"Cancelado!",devEnvTitle:(e,t)=>`Ambiente de desenvolvimento \u2014 implanta\xE7\xE3o \u2026${e} (${t})`},es:{more:"M\xE1s m\xF3dulos",milestoneToast:e=>`\u{1F525} \xA1${e} casos hoy!`,quickSearch:"B\xFAsqueda r\xE1pida: Ctrl/Cmd+K",casesToday:"Casos completados hoy",drag:"Arrastrar",cancel:"Cancelar",cancelledToast:"\xA1Cancelado!",devEnvTitle:(e,t)=>`Entorno de desarrollo \u2014 implementaci\xF3n \u2026${e} (${t})`},en:{more:"More modules",milestoneToast:e=>`\u{1F525} ${e} cases today!`,quickSearch:"Quick search: Ctrl/Cmd+K",casesToday:"Cases completed today",drag:"Drag",cancel:"Cancel",cancelledToast:"Cancelled!",devEnvTitle:(e,t)=>`Development environment \u2014 deployment \u2026${e} (${t})`}};function Ft(e){let t=ge();return ul[t]?.[e]??ul.pt[e]}var He={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",yellow:"#FDD663",pink:"#F48FB1",gray:"#9AA0A6"},Bi=50,Gi=null,mo={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',precall:'<svg viewBox="0 0 24 24"><path d="M22 7h-9v2h9V7zm0 8h-9v2h9v-2zM5.54 11L2 7.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L5.54 11zm0 8L2 15.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L5.54 19z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg class="cw-logo-base" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',mainSpark:'<svg class="cw-logo-spark" viewBox="0 0 24 24"><defs><linearGradient id="cw-spark-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4285F4"/><stop offset="33%" stop-color="#EA4335"/><stop offset="66%" stop-color="#FBBC05"/><stop offset="100%" stop-color="#34A853"/></linearGradient></defs><path fill="url(#cw-spark-grad)" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',configs:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',notetable:'<svg viewBox="0 0 24 24"><path d="M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9z"/></svg>',bauform:'<svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>',apps:'<svg viewBox="0 0 24 24"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/></svg>'};function ml(e){return mo[e]||""}function Ln(e){let t=document.getElementById("cw-btn-notes");if(!t)return;let a=t.querySelector(".cw-dot-dirty");e?a||(a=document.createElement("div"),a.className="cw-dot-dirty",t.appendChild(a)):a&&a.remove()}function gl(){let e=document.getElementById("cw-streak-badge"),t=document.getElementById("cw-streak-count");if(!e||!t)return;let a=Ri();t.textContent=a,e.classList.toggle("visible",a>0);let o=document.querySelector(".cw-pill");o&&(o.classList.toggle("has-streak",a>0),o.classList.toggle("streak-tier-2",a>=5&&a<15),o.classList.toggle("streak-tier-3",a>=15&&a<30),o.classList.toggle("streak-tier-4",a>=30))}function _n(){let{count:e,isMilestone:t}=rl();if(gl(),t){let a=document.querySelector(".cw-pill");y.playSuccess(),a&&Os(a),ne(Ft("milestoneToast")(e))}}function fl(e,t){let a="cw-command-center-style";if(!document.getElementById(a)){let E=document.createElement("style");E.id=a,E.innerHTML=`
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
                width: ${Bi}px !important;
                height: ${Bi}px !important;
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
        `,document.head.appendChild(E)}function o(){let E=Ja();return E.isDev?`<div id="cw-env-tag" class="cw-env-badge" title="${Ft("devEnvTitle")(E.fingerprint,E.endpoint)}">Dev</div>`:""}let n=document.createElement("div");n.id="cw-floating-trigger",n.className="cw-pill side-right collapsed"+(Ja().isDev?" cw-env-dev":""),n.innerHTML=`
        <div id="cw-command-center" style="display:none;"></div>
        <div class="cw-main-logo js-cc-quicksearch" title="${Ft("quickSearch")}">${mo.main}${mo.mainSpark}</div>
        <div id="cw-admin-tag" class="cw-admin-badge">Admin</div>
        ${o()}
        <div id="cw-streak-badge" class="cw-streak-badge js-cc-casestoday" title="${Ft("casesToday")}">\u{1F525} <span id="cw-streak-count">0</span></div>

        <div class="cw-grip js-cc-drag" title="${Ft("drag")}">
            <div class="cw-grip-bar"></div>
        </div>
        <div class="cw-sep"></div>
        <button class="cw-btn more" id="cw-btn-more" aria-expanded="false" aria-controls="cw-drawer">${mo.apps}<span class="cw-badge cw-more-signal"></span></button>
        <div class="cw-status-container">
            <div class="cw-dots" id="cw-loader"><span></span><span></span><span></span></div>
            <div class="cw-check" id="cw-success" style="display:none;">${mo.check}</div>
        </div>
    `;let i=document.createElement("div");i.className="cw-focus-backdrop",document.body.appendChild(i),document.body.appendChild(n),gl(),je(()=>{let E=n.querySelector(".js-cc-quicksearch");E&&(E.title=Ft("quickSearch"));let K=n.querySelector(".js-cc-casestoday");K&&(K.title=Ft("casesToday"));let se=n.querySelector(".js-cc-drag");se&&(se.title=Ft("drag"));let V=n.querySelector("#cw-env-tag");if(V){let q=Ja();V.title=Ft("devEnvTitle")(q.fingerprint,q.endpoint)}L()});let r=E=>{y.playClick(),E()},s={notes:e.toggleNotes,precall:e.togglePrecall,bauform:e.toggleBAUForm,email:e.toggleEmail,script:e.toggleScript,links:e.toggleLinks,library:e.toggleLibrary,timezone:e.toggleTimezone,configs:e.toggleConfigs,notetable:e.toggleNoteTable,broadcast:()=>{let E=u.broadcast.querySelector(".cw-badge");E&&E.remove(),e.broadcastControl&&e.broadcastControl.toggle()}},l=n.querySelector(".cw-grip"),d=n.querySelector(".cw-sep"),c=n.querySelector("#cw-btn-more"),g=document.createElement("div");g.id="cw-drawer",g.className="cw-drawer",g.setAttribute("role","group"),document.body.appendChild(g);let u={},b={};uo.forEach(E=>{let K=document.createElement("button");K.className=`cw-btn ${E}`,K.id=`cw-btn-${E}`,K.innerHTML=mo[E],K.onclick=V=>{V.stopPropagation(),r(s[E]),te()},K.addEventListener("mouseenter",()=>y.playHover()),u[E]=K;let se=document.createElement("div");se.className="cw-drawer-tile",se.appendChild(Object.assign(document.createElement("span"),{className:"cw-drawer-label"})),se.onclick=V=>{V.target.closest("button")||K.click()},b[E]=se}),c.addEventListener("mouseenter",()=>y.playHover());function L(){uo.forEach(E=>{let K=Wo(E);u[E].dataset.label=K,u[E].setAttribute("aria-label",K),b[E].querySelector(".cw-drawer-label").textContent=K}),c.dataset.label=Ft("more"),c.setAttribute("aria-label",Ft("more")),g.setAttribute("aria-label",Ft("more"))}function A(){c.classList.toggle("active",!!g.querySelector(".cw-btn.active")),c.classList.toggle("has-signal",!!g.querySelector(".cw-badge, .cw-dot-dirty"))}new MutationObserver(A).observe(g,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["class"]});function C({pinned:E,drawer:K}){E.forEach(V=>n.insertBefore(u[V],d)),g.replaceChildren(),K.forEach(V=>{b[V].prepend(u[V]),g.appendChild(b[V])});let se=[l,...E.map(V=>u[V]),d,c];se.forEach((V,q)=>V.style.setProperty("--cw-i",q)),n.style.setProperty("--cw-n",se.length-1),A()}let z=!1;function G(){let se=n.getBoundingClientRect(),V=c.getBoundingClientRect(),q=g.offsetWidth,T=g.offsetHeight,H=n.classList.contains("side-right"),ie=Ht(H?se.left-12-q:se.right+12,8,window.innerWidth-q-8),P=Ht(V.bottom-T+10,8,window.innerHeight-T-8);g.style.left=`${ie}px`,g.style.top=`${P}px`,g.style.transformOrigin=`${H?q:0}px ${Ht(V.top+V.height/2-P,0,T)}px`}function R(E){g.contains(E.target)||c.contains(E.target)||te()}function O(E){E.key==="Escape"&&(E.stopPropagation(),te({restoreFocus:!0}))}function de(){z||n.classList.contains("collapsed")||(G(),z=!0,g.classList.add("open"),c.classList.add("open"),c.setAttribute("aria-expanded","true"),document.addEventListener("mousedown",R,!0),document.addEventListener("keydown",O,!0))}function te({restoreFocus:E=!1}={}){z&&(z=!1,g.classList.remove("open"),c.classList.remove("open"),c.setAttribute("aria-expanded","false"),document.removeEventListener("mousedown",R,!0),document.removeEventListener("keydown",O,!0),E&&c.focus())}if(c.onclick=E=>{if(E.stopPropagation(),y.playClick(),z){te();return}if(de(),E.detail===0){let K=g.querySelector("button");K&&K.focus()}},window.addEventListener("resize",()=>te()),e.broadcastControl&&e.broadcastControl.hasUnread){let E=document.createElement("div");E.className="cw-badge",u.broadcast.appendChild(E)}L(),C(sa.get()),sa.onChange(C);let re=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function ee(){if(re()){n.classList.remove("collapsed"),y.playGenieOpen();return}let E=n.getBoundingClientRect(),K=window.innerHeight,se=E.top>K/2,V=E.height;n.style.setProperty("transition","none","important"),n.classList.remove("collapsed");let q=n.scrollHeight;if(n.classList.add("collapsed"),n.style.height=`${V}px`,se){let T=K-E.bottom;n.style.top="auto",n.style.bottom=`${T}px`}else n.style.bottom="auto",n.style.top=`${E.top}px`;n.style.overflow="hidden",n.offsetWidth,n.style.removeProperty("transition"),n.classList.remove("collapsed"),n.style.height=`${q}px`,y.playGenieOpen(),setTimeout(()=>{n.style.height="",n.style.overflow=""},350)}function w(E=!0){if(n.classList.contains("collapsed"))return;if(te(),re()){n.classList.add("collapsed"),E&&y.playSwoosh();return}let K=n.getBoundingClientRect().height;n.style.setProperty("transition","none","important"),n.style.height=`${K}px`,n.offsetWidth,n.style.removeProperty("transition"),n.classList.add("collapsed"),n.style.height=`${Bi}px`,E&&y.playSwoosh(),setTimeout(()=>{n.style.height=""},700)}Gi=w;let S=null;function D(){document.querySelector(".cw-processing-card")||(S=setTimeout(()=>{n.querySelector(".cw-btn.active")||w()},3e3))}function j(){S&&clearTimeout(S)}n.onmouseleave=D,n.onmouseenter=j,g.onmouseenter=j,g.onmouseleave=D,(async function(){let K=()=>{let se=it();if(se){let V=se.split("@")[0].toLowerCase();if(Es.includes(V)){let q=n.querySelector("#cw-admin-tag");q&&q.classList.add("visible")}}else setTimeout(K,2e3)};if(K(),t&&typeof t.then=="function"){try{await t}catch{}await Ne(150)}else await Ne(2800);n.classList.add("arriving"),y.playReady(),n.querySelectorAll(".cw-sep").forEach(se=>se.classList.add("visible"))})();let F=!1,Z,fe,he,ue,ce=3;n.onmousedown=E=>{if(E.target.closest("button"))return;E.preventDefault(),Z=E.clientX,fe=E.clientY;let K=n.getBoundingClientRect();he=K.left,ue=K.top,document.addEventListener("mousemove",le),document.addEventListener("mouseup",xe)};function le(E){let K=E.clientX-Z,se=E.clientY-fe;!F&&Math.sqrt(K*K+se*se)>ce&&(F=!0,te(),n.classList.add("dragging"),n.style.transition="none",S&&clearTimeout(S)),F&&(n.style.left=`${he+K}px`,n.style.top=`${ue+se}px`,n.style.right="auto",n.style.bottom="auto",n.style.transform="none")}function xe(E){if(document.removeEventListener("mousemove",le),document.removeEventListener("mouseup",xe),F){F=!1,n.classList.remove("dragging");let K=window.innerWidth,se=window.innerHeight,V=n.getBoundingClientRect(),q=V.left+V.width/2,T;q<K/2?(T=24,n.classList.remove("side-right"),n.classList.add("side-left")):(T=K-V.width-24,n.classList.remove("side-left"),n.classList.add("side-right"));let H=Ht(V.top,24,se-V.height-24);setTimeout(()=>{n.style.setProperty("transition","left 0.3s cubic-bezier(0.4, 0, 0.2, 1), top 0.3s cubic-bezier(0.4, 0, 0.2, 1)","important"),n.style.left=`${T}px`,n.style.top=`${H}px`,n.style.bottom="auto",n.style.transform=""},10),setTimeout(()=>{n.style.transition="",n.style.removeProperty("transition")},700)}else{let K=n.querySelector(".cw-btn.active"),se=E.target.closest("button");n.classList.contains("collapsed")?ee():!K&&!se&&w(),se&&(se.style.transform="scale(0.9)",setTimeout(()=>se.style.transform="",150))}}}function Ba(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop");window._CW_ABORT_PROCESS=!1;let a=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;e&&Gi?Gi(!1):e&&e.classList.add("collapsed"),e&&e.classList.add("cw-busy");let o=document.createElement("div");o.className="cw-processing-card",o.innerHTML=`
      <div class="cw-center-slot">
        <div class="cw-center-dots"><span></span><span></span><span></span></div>
        <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
      </div>
      <div class="cw-center-text">${Te.getRandomTip()}</div>
  `;let n=document.createElement("div");n.className="cw-abort-btn",n.textContent=Ft("cancel"),n.onclick=l=>{l.stopPropagation(),window._CW_ABORT_PROCESS=!0,y.stopThinking(),ne(Ft("cancelledToast"),{duration:3e3}),s()},o.appendChild(n),document.body.appendChild(o),t&&t.classList.add("active"),requestAnimationFrame(()=>{requestAnimationFrame(()=>o.classList.add("visible"))}),y.startThinking();let i=Date.now(),r=!1;function s(){r||(r=!0,y.stopThinking(),t&&t.classList.remove("active"),e&&e.classList.remove("cw-busy"),o.classList.remove("visible"),setTimeout(()=>o.remove(),a?200:320))}return function(){if(window._CW_ABORT_PROCESS||r)return;let d=Math.max(0,2e3-(Date.now()-i));setTimeout(()=>{if(window._CW_ABORT_PROCESS||r)return;y.stopThinking();let c=o.querySelector(".cw-center-dots"),g=o.querySelector(".cw-center-success");c&&c.classList.add("hidden"),n.classList.add("hidden"),g&&g.classList.add("show"),setTimeout(()=>{g&&g.classList.remove("show"),setTimeout(s,200)},850)},d)}}function bl(e){let{onSaveCurrent:t,onLoadDraft:a,t:o}=e,n=document.createElement("button");n.className="js-btn-park",n.innerHTML=`
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
        transition: background-color 0.2s ${$e}, border-color 0.2s ${$e}, color 0.2s ${$e}, box-shadow 0.2s ${$e}, transform 0.1s ${$e};
        box-shadow: ${ua.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `,n.onmouseenter=()=>{n.style.backgroundColor="#F8F9FA",n.style.borderColor="#202124",n.style.color="#202124",n.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)"},n.onmouseleave=()=>{n.style.backgroundColor="#FFFFFF",n.style.borderColor="#DADCE0",n.style.color="#5F6368",n.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)"},n.onmousedown=()=>n.style.transform="scale(0.96)",n.onmouseup=()=>n.style.transform="scale(1)",n.onclick=async()=>{if(await ot(o("confirmar_guardar_rascunho")))try{let C=await t();C?(Gt.save(C),L(),l(),y.playSuccess(),ne(o("rascunho_salvo_sucesso"))):(y.playError(),ne(o("erro_ler_dados"),{error:!0}))}catch(C){console.error("Erro ao salvar rascunho:",C),y.playError(),ne(o("erro_ao_salvar"),{error:!0})}};let i=document.createElement("div");i.className="js-history-btn",i.title=o("meus_rascunhos"),i.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",i.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#9AA0A6"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let r=i.querySelector("svg"),s=document.createElement("div");s.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",i.appendChild(s),i.onmouseenter=()=>i.style.background="rgba(0,0,0,0.05)",i.onmouseleave=()=>i.style.background="transparent",i.onclick=A=>{A.stopPropagation(),b()};function l(){let A=Gt.getCount();Ln(A>0),r.style.color=A>0?J.primary:"#9AA0A6",A>0?(s.style.display="block",s.textContent=A,window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||s.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):s.style.display="none"}let d=document.createElement("div");d.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${J.surface}; z-index: 100;
        border-radius: ${pt.large} ${pt.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${$e};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;let c=document.createElement("div");c.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",c.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${o("rascunhos_salvos")}</span>`;let g=document.createElement("button");g.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',g.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",g.onmouseenter=()=>g.style.background="#F1F3F4",g.onmouseleave=()=>g.style.background="transparent",g.onclick=()=>b(!1),c.appendChild(g);let u=document.createElement("div");u.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",d.appendChild(c),d.appendChild(u);function b(A){let C=d.style.transform==="translateY(0%)";(A!==void 0?A:!C)?(L(),d.style.transform="translateY(0%)"):d.style.transform="translateY(110%)"}function L(){let A=Gt.getAll();if(u.innerHTML="",A.length===0){u.innerHTML=`
                <div style="text-align:center; padding:80px 20px; color:${J.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${o("nenhum_rascunho")}</div>
                </div>`;return}A.forEach(C=>{let z=document.createElement("div");z.style.cssText=`
                background: ${J.surface}; padding: 20px; border-radius: ${pt.large};
                border: 1.5px solid ${J.bgInput}; box-shadow: ${ua.subtle};
                position: relative;
            `;let R=new Date(C.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),O="";C.summaryTags&&C.summaryTags.length>0&&(O=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${C.summaryTags.slice(0,3).join(", ")+(C.summaryTags.length>3?"...":"")}</div>`),z.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${C.clientName||o("cliente_sem_nome")}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${R}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${C.cid||"---"}</span>
                    <span style="display:block; color:${C.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${C.subStatus||C.status||o("sem_status")}</span>
                    ${O}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3);">
                        ${o("retomar_caso")}
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center;" title="${o("descartar")}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let de=z.querySelector(".cw-resume-btn");de.onclick=async()=>{await ot(o("retomar_rascunho_confirm"))&&(a(C),Gt.delete(C.id),L(),l(),b(!1),y.playSwoosh(),ne(o("rascunho_carregado")))};let te=z.querySelector(".cw-del-btn");te.onclick=async()=>{await ot(o("excluir_rascunho_confirm"),{danger:!0})&&(Gt.delete(C.id),L(),l())},u.appendChild(z)})}return l(),{parkButton:n,historyBtnWrapper:i,drawer:d}}var hl={pt:"Falha ao copiar",es:"Error al copiar",en:"Failed to copy"};function ea(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let a=document.createRange();a.selectNodeContents(t);let o=window.getSelection();o.removeAllRanges(),o.addRange(a);try{document.execCommand("copy")}catch{y.playError(),ne(hl[ge()]||hl.pt,{error:!0})}o.removeAllRanges(),document.body.removeChild(t)}function Ea(e){["input","change","keydown","keyup"].forEach(a=>{let o=new Event(a,{bubbles:!0,cancelable:!0});e.dispatchEvent(o)})}function vl(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function ka(){let e=vl(),t=e.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(r=>r.innerText.trim()==="description");if(o){let r=o.closest("material-fab")||o.closest("material-button");r?(r.style&&(r.style.display="block",r.style.visibility="visible"),kt(r)):kt(o)}else{let r=document.querySelector("material-fab-speed-dial");if(r){let s=r.querySelector(".trigger");s?(s.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),kt(s)):r.click(),await Ne(800);let d=Array.from(document.querySelectorAll("i.material-icons-extended")).find(c=>c.innerText.trim()==="description");d&&kt(d)}}let n=null,i=0;for(;!n&&i<20;){await Ne(300);let r=vl();if(r.length>t)n=r.find(s=>!e.includes(s)),n||(n=r[r.length-1]);else if(i>10){let s=r.filter(l=>l.offsetParent!==null);s.length>0&&(n=s[s.length-1])}i++}return n}var xl={pt:{back:"Voltar",generateNote:"Gerar Nota",sopBefore:"Certifique-se de consultar o",sopAfter:"antes de transferir.",autoFill:"Auto-Preencher Dados da P\xE1gina",fetchingData:"Buscando dados...",technicalData:"Dados T\xE9cnicos",contactAndIssue:"Contato & Problema",ccCopies:"C\xF3pias (CC)",describeIssuePlaceholder:"Descreva o erro, passos para reproduzir...",whatTestedPlaceholder:"O que voc\xEA j\xE1 testou?",fieldsFilledToast:e=>`${e} campos preenchidos!`,noNewDataToast:"Nenhum dado novo encontrado.",readPageErrorToast:"Erro ao ler p\xE1gina.",fillRequiredToast:"Preencha os campos obrigat\xF3rios.",noteGeneratedToast:"Nota gerada e inserida!",copiedOpenNoteToast:"Copiado! Abra uma nota para colar."},es:{back:"Volver",generateNote:"Generar Nota",sopBefore:"Aseg\xFArate de consultar el",sopAfter:"antes de transferir.",autoFill:"Autocompletar Datos de la P\xE1gina",fetchingData:"Buscando datos...",technicalData:"Datos T\xE9cnicos",contactAndIssue:"Contacto y Problema",ccCopies:"Copias (CC)",describeIssuePlaceholder:"Describe el error, pasos para reproducirlo...",whatTestedPlaceholder:"\xBFQu\xE9 ya probaste?",fieldsFilledToast:e=>`\xA1${e} campos completados!`,noNewDataToast:"No se encontraron datos nuevos.",readPageErrorToast:"Error al leer la p\xE1gina.",fillRequiredToast:"Completa los campos obligatorios.",noteGeneratedToast:"\xA1Nota generada e insertada!",copiedOpenNoteToast:"\xA1Copiado! Abre una nota para pegar."},en:{back:"Back",generateNote:"Generate Note",sopBefore:"Make sure to check the",sopAfter:"before transferring.",autoFill:"Auto-Fill Page Data",fetchingData:"Fetching data...",technicalData:"Technical Data",contactAndIssue:"Contact & Issue",ccCopies:"Copies (CC)",describeIssuePlaceholder:"Describe the error, steps to reproduce...",whatTestedPlaceholder:"What have you already tested?",fieldsFilledToast:e=>`${e} fields filled in!`,noNewDataToast:"No new data found.",readPageErrorToast:"Error reading the page.",fillRequiredToast:"Fill in the required fields.",noteGeneratedToast:"Note generated and inserted!",copiedOpenNoteToast:"Copied! Open a note to paste it."}};function Ot(e){let t=ge();return xl[t]?.[e]??xl.pt[e]}function Dn(e,t){let a=[];function o(w){w(),a.push(w)}let n=document.createElement("div");n.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let i=document.createElement("div");i.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let r=document.createElement("div");r.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",n.appendChild(r),n.appendChild(i),i.addEventListener("scroll",()=>{r.style.boxShadow=i.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let s={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},l={};function d({id:w,label:S,type:D="text",placeholder:j="",required:F=!1,autocomplete:Z="",parent:fe=i}){let he=document.createElement("div");he.style.cssText=s.inputWrapper;let ue=document.createElement("label");ue.setAttribute("for",w),ue.style.cssText=s.label,ue.innerHTML=`${S} ${F?'<span style="color:#D93025">*</span>':""}`;let ce;return D==="textarea"?(ce=document.createElement("textarea"),ce.style.cssText=s.input+s.textarea):(ce=document.createElement("input"),ce.type=D,ce.style.cssText=s.input),ce.id=w,ce.placeholder=j,Z&&ce.setAttribute("autocomplete",Z),ce.addEventListener("focus",()=>{ce.style.borderColor="#1a73e8",ce.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),ce.addEventListener("blur",()=>{ce.style.borderColor="#DADCE0",ce.style.boxShadow="none",F&&ce.value.trim()!==""&&(ce.style.backgroundColor="#FFF")}),l[w]={input:ce,wrapper:he,required:F},he.appendChild(ue),he.appendChild(ce),D!=="textarea"&&xn(ce),fe.appendChild(he),he}function c({id:w,label:S,options:D=["Yes","No"],defaultValue:j="No",onChange:F=null}){let Z=document.createElement("div");Z.style.cssText=s.inputWrapper;let fe=document.createElement("label");fe.style.cssText=s.label,fe.textContent=S,Z.appendChild(fe);let he=document.createElement("div");he.style.cssText=s.radioGroup;let ue=document.createElement("input");return ue.type="hidden",ue.id=w,ue.value=j,Z.appendChild(ue),D.forEach(ce=>{let le=document.createElement("div");le.textContent=ce,le.style.cssText=s.radioLabel,ce===j&&(le.style.cssText+=s.radioActive),le.onclick=()=>{Array.from(he.children).forEach(E=>E.style.cssText=s.radioLabel),le.style.cssText+=s.radioActive,ue.value=ce,F&&F(ce)},he.appendChild(le)}),l[w]={input:ue,wrapper:Z,required:!1},Z.appendChild(he),i.appendChild(Z),Z}let g=document.createElement("div");g.style.cssText=s.banner,o(()=>{g.innerHTML=`
            <span>\u26A0\uFE0F</span>
            <div>
                <b>Out of Scope Check:</b><br>
                ${Ot("sopBefore")} <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> ${Ot("sopAfter")}
            </div>
        `}),i.appendChild(g);let u=document.createElement("div");u.style.marginBottom="24px";let b=document.createElement("button"),L=()=>{b.innerHTML=`\u2728 &nbsp; ${Ot("autoFill")}`};o(L),b.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",b.onmouseover=()=>b.style.background="#E1EFFF",b.onmouseout=()=>b.style.background="#F0F7FF",u.appendChild(b),i.appendChild(u);function A(w,S,D){let j=document.createElement("div");j.style.cssText=s.sectionTitle,o(()=>{j.textContent=`${S} ${Ot(D)}`}),w.appendChild(j)}let C=document.createElement("div");C.style.cssText=s.section,A(C,"\u{1F6E0}\uFE0F","technicalData"),i.appendChild(C),d({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:C}),d({id:"ga4",label:"GA4 Property ID",parent:C}),d({id:"gtm",label:"GTM Container ID",parent:C});let z=document.createElement("div");z.style.cssText=s.hiddenField,C.appendChild(z),c({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:w=>{w==="Yes"?z.style.cssText=s.visibleField+"margin-bottom:14px;":(z.style.cssText=s.hiddenField,l.accessEmail.input.value="")}}),d({id:"accessEmail",label:"User Access Email",parent:z}),c({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let G=document.createElement("div");G.style.cssText=s.section,A(G,"\u{1F4DE}","contactAndIssue"),i.appendChild(G),d({id:"name",label:"Advertiser Name",required:!0,autocomplete:"name",parent:G}),d({id:"url",label:"Website URL",type:"url",autocomplete:"url",parent:G}),d({id:"phone",label:"Phone Number",type:"tel",autocomplete:"tel",parent:G}),d({id:"email",label:"Contact Email",type:"email",autocomplete:"email",parent:G}),d({id:"callback",label:"Preferred Callback Time (Timezone)",parent:G}),d({id:"desc",label:"Detailed Issue Description",type:"textarea",required:!0,parent:G}),d({id:"checks",label:"Troubleshooting Performed",type:"textarea",parent:G}),o(()=>{l.desc.input.placeholder=Ot("describeIssuePlaceholder"),l.checks.input.placeholder=Ot("whatTestedPlaceholder")}),d({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:G});let R=document.createElement("div");R.style.cssText=s.section,A(R,"\u{1F4E7}","ccCopies"),i.appendChild(R),d({id:"cc_adv",label:"Advertiser Contact",parent:R}),d({id:"cc_am",label:"Account Manager",parent:R});let O=document.createElement("div");O.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let de=document.createElement("button");o(()=>{de.textContent=Ot("back")}),de.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",de.onclick=e;let te=document.createElement("button");o(()=>{te.textContent=Ot("generateNote")}),te.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",O.appendChild(de),O.appendChild(te),n.appendChild(O),b.onclick=async()=>{b.innerHTML=`\u23F3 ${Ot("fetchingData")}`;try{let w=await Ut(),S=0,D=(Z,fe)=>{let he=l[Z];fe&&he&&he.input.value===""&&(he.input.value=fe,he.input.style.backgroundColor="#E6F4EA",he.input.style.borderColor="#34A853",setTimeout(()=>{he.input.style.backgroundColor="#FFF",he.input.style.borderColor="#DADCE0"},1e3),S++)};D("name",w.advertiserName),D("url",w.websiteUrl),w.clientEmail&&(D("email",w.clientEmail),D("cc_adv",w.clientEmail));let F=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);F&&D("cid",F[0]),S>0?ne(Ot("fieldsFilledToast")(S)):ne(Ot("noNewDataToast"))}catch(w){console.error(w),ne(Ot("readPageErrorToast"))}finally{L()}};let re=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,ee=()=>{let w=!0,S=null,D=re();return Object.values(l).forEach(j=>{j.required&&!j.input.value.trim()&&(w=!1,j.input.style.cssText+=s.inputError,D||j.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),S||(S=j.input))}),S&&S.scrollIntoView({behavior:D?"auto":"smooth",block:"center"}),w};return te.onclick=async()=>{if(!ee()){y.playError(),ne(Ot("fillRequiredToast"),{error:!0});return}let w=fe=>l[fe].input.value||"N/A",S=w("hasAccess"),D=S==="Yes"?w("accessEmail"):"N/A",F=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${w("cid")}
<b>GA4 ID:</b> ${w("ga4")}
<b>GTM ID:</b> ${w("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${S==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${D}
<b>Ghosting Access Available (Y/N):</b> ${w("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${w("name")}
<b>Website:</b> ${w("url")}
<b>Phone Number:</b> ${w("phone")}
<b>Preferred Callback:</b> ${w("callback")}
<b>Email Address:</b> ${w("email")}

<b>Detailed Issue Description:</b>
${w("desc")}

<b>Uncropped screenshots:</b>
${w("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${w("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${w("cc_adv")}
<b>Account Manager:</b> ${w("cc_am")}
`.replace(/\n/g,"<br>");ea(F),t&&t();let Z=await ka();Z?(Z.innerText.trim()===""&&(Z.innerHTML=""),document.execCommand("insertHTML",!1,F),Ea(Z),y.playSuccess(),ne(Ot("noteGeneratedToast"))):ne(Ot("copiedOpenNoteToast"))},je(()=>a.forEach(w=>w())),n}var Yo="shortcuts",wl="shortcutsSortByUsage",Cl="cw_shortcut_usage_v1",ga=8,lm=[{id:"sc_default_ni_attempted",kind:"note",payload:{caseType:"bau",status:"NI",subStatus:"NI_Attempted_Contact",scenarios:[{id:"quickfill-ni-attempted-2day",substatus:"NI_Attempted_Contact"}]}},{id:"sc_default_in_not_reachable",kind:"note",payload:{caseType:"bau",status:"IN",subStatus:"IN_Not_Reachable",scenarios:[{id:"quickfill-in-no-show-bau",substatus:"IN_Not_Reachable"}]}}],yl={sc_default_ni_attempted:{pt:{label:"NI Attempted \u2014 In\xEDcio 2 Day Rule",alias:"2day inicio"},es:{label:"NI Attempted \u2014 Inicio 2 Day Rule",alias:"2day inicio"},en:{label:"NI Attempted \u2014 2 Day Rule (Start)",alias:"2day start"}},sc_default_in_not_reachable:{pt:{label:"IN Not Reachable \u2014 Finaliza\xE7\xE3o 2 Day Rule",alias:"2day fim"},es:{label:"IN Not Reachable \u2014 Cierre 2 Day Rule",alias:"2day cierre"},en:{label:"IN Not Reachable \u2014 2 Day Rule (End)",alias:"2day end"}}};function Xo(){return"sc_"+Date.now().toString(36)+Math.floor(Math.random()*1e3).toString(36)}function Hi(e){if(!e||!e.id)return null;if(Mt[e.id])return e.id;let t=Aa(e.id,e.substatus),a=Object.entries(Mt),o=a.find(([i,r])=>Aa(i,e.substatus)===t&&Array.isArray(r.substatus)&&r.substatus.includes(e.substatus));if(o)return o[0];let n=a.find(([i])=>Aa(i,e.substatus)===t);return n?n[0]:null}function Al(e){return(e.payload&&e.payload.scenarios||[]).filter(a=>!Hi(a)).map(a=>a.id)}function Sl(){try{return JSON.parse(localStorage.getItem(Cl)||"{}")}catch{return{}}}function ji(e){return Array.isArray(e)?e.filter(t=>t&&t.id&&t.payload&&t.payload.subStatus).map((t,a)=>({id:t.id,kind:t.kind||"note",label:String(t.label||"Atalho"),alias:String(t.alias||""),order:Number.isFinite(t.order)?t.order:a,payload:{caseType:t.payload.caseType||"bau",status:t.payload.status||String(t.payload.subStatus).split("_")[0],subStatus:t.payload.subStatus,scenarios:Array.isArray(t.payload.scenarios)?t.payload.scenarios.filter(o=>o&&o.id).map(o=>({id:o.id,substatus:o.substatus||t.payload.subStatus})):[]}})):[]}var ct={list(){let e=Xe.get(Yo,null),t=ji(e===null?ct.defaults():e),a=Sl();return t.slice().sort((o,n)=>{if(ct.isSortedByUsage()){let i=(a[n.id]||0)-(a[o.id]||0);if(i)return i}return o.order-n.order})},listRaw(){let e=Xe.get(Yo,null);return ji(e===null?ct.defaults():e).sort((t,a)=>t.order-a.order)},defaults(){let e=ge();return lm.map((t,a)=>({...t,...yl[t.id][e]||yl[t.id].pt,order:a}))},isSortedByUsage(){return Xe.get(wl,!0)!==!1},setSortedByUsage(e){return Xe.set(wl,!!e)},async save(e){let t=ct.listRaw(),a=t.findIndex(i=>i.id===e.id);if(a===-1&&t.length>=ga)return{ok:!1,reason:"limit"};let o=ji([{...e,id:e.id||Xo()}])[0];return o?(a===-1?(o.order=t.length,t.push(o)):(o.order=t[a].order,t[a]=o),{ok:!0,synced:(await Xe.set(Yo,t)).synced,shortcut:o}):{ok:!1,reason:"invalid"}},async remove(e){let t=ct.listRaw().filter(a=>a.id!==e).map((a,o)=>({...a,order:o}));await Xe.set(Yo,t)},async reorder(e,t){let a=ct.listRaw(),o=a.findIndex(r=>r.id===e);if(o===-1)return;let[n]=a.splice(o,1),i=Math.max(0,Math.min(t,a.length));a.splice(i,0,n),await Xe.set(Yo,a.map((r,s)=>({...r,order:s})))},registerUse(e){try{let t=Sl();t[e]=(t[e]||0)+1,localStorage.setItem(Cl,JSON.stringify(t))}catch{}}};var Mn=[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",category:"Tentativas & Agendamento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",placeholders:[{key:"[Seu Nome]",label:"Seu Nome",type:"text",auto:"agentName"},{key:"[INSERIR URL]",label:"URL do Site",type:"text"},{key:"[LINK DO MEET]",label:"Link da Reuni\xE3o",type:"text"}],template:"<p>Ol\xE1,</p><br><p>Aqui \xE9 o <strong>[Seu Nome]</strong> da equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tentei ligar no seguinte n\xFAmero: <strong>...</strong> sem sucesso, teria outro n\xFAmero para que eu pudesse entrar em contato?</p><br><p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>Em seu site: <strong>[INSERIR URL]</strong></p><p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, voc\xEA pode acessar o link da nossa reuni\xE3o: <strong>[LINK DO MEET]</strong></p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"reschedule2",name:"Proposta de Reagendamento",category:"Tentativas & Agendamento",subject:"Reagendamento de Consultoria",placeholders:[{key:"[DATA 1]",label:"Data 1",type:"text"},{key:"[HORA 1]",label:"Hora 1",type:"text"},{key:"[DATA 2]",label:"Data 2",type:"text"},{key:"[HORA 2]",label:"Hora 2",type:"text"},{key:"[DATA 3]",label:"Data 3",type:"text"},{key:"[HORA 3]",label:"Hora 3",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p><ul><li><strong>[DATA 1] \xE0s [HORA 1]</strong></li><li><strong>[DATA 2] \xE0s [HORA 2]</strong></li><li><strong>[DATA 3] \xE0s [HORA 3]</strong></li></ul><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email nas pr\xF3ximas 48 horas o caso ser\xE1 encerrado.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"max_reschedules",name:"Limite de Reagendamentos Excedido",category:"Tentativas & Agendamento",subject:"Status do Agendamento - Time de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este e-mail o encontre bem.</p><p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementa\xE7\xE3o das tags.</p><br><p>Infelizmente, <strong>n\xE3o podemos mais reagendar este caso espec\xEDfico</strong>, pois excedemos o limite m\xE1ximo de agendamentos permitido.</p><br><p>Se voc\xEA deseja prosseguir com a implementa\xE7\xE3o das tags, ser\xE1 necess\xE1rio abrir um <strong>novo caso</strong> diretamente com a <a href="https://support.google.com/google-ads">Ajuda do Google Ads</a>. Isso garantir\xE1 que voc\xEA receba o acompanhamento e o suporte necess\xE1rio para dar continuidade \xE0 sua solicita\xE7\xE3o.</p><br><p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colabora\xE7\xE3o.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"2_6_day3",name:"Dia 3 (Acompanhamento)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]",label:"A\xE7\xE3o Pendente",type:"text"},{key:"[MM/DD/YYYY]",label:"Data do Pr\xF3ximo Contato",type:"date"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Tentamos contato atrav\xE9s do N\xFAmero de Telefone, por\xE9m sem sucesso. Gostaria de saber se voc\xEA j\xE1 conseguiu <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, ou se voc\xEA j\xE1 possui uma previs\xE3o de quando essa a\xE7\xE3o ser\xE1 conclu\xEDda.</p><br><p>Continuarei monitorando o status da implementa\xE7\xE3o no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementa\xE7\xE3o.</p><p>Se voc\xEA tiver algum problema ou d\xFAvidas que impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_day6",name:"Dia 6 (Acompanhamento Final)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[URL]",label:"URL do Site",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Ap\xF3s an\xE1lise e revis\xE3o do status de implementa\xE7\xE3o da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda est\xE1 com a implementa\xE7\xE3o pendente. Tentamos contato atrav\xE9s do email, por\xE9m sem sucesso.</p><br><p>\xC9 essencial que seja implementado, pois ele oferece uma ampla gama de benef\xEDcios, como:</p><ul><li>Ajuda a rastrear convers\xF5es em tempo real</li><li>Melhora a gera\xE7\xE3o de receita, em termos de cliques</li><li>Serve para vincular o Google Analytics e os an\xFAncios e acompanhar convers\xF5es</li><li>Fornece informa\xE7\xF5es sobre a experi\xEAncia do usu\xE1rio</li></ul><br><p>Se voc\xEA tiver algum problema ou d\xFAvidas que o impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco. Teremos o maior prazer em ajudar.</p><p>Caso n\xE3o tenhamos nenhuma resposta nos pr\xF3ximos 3 dias, infelizmente o caso ser\xE1 encerrado.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_completed_reschedule",name:"A\xE7\xF5es Conclu\xEDdas (Solicitar Reagendamento)",category:"Follow Up",subject:"Continuidade da Implementa\xE7\xE3o - Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Disponibilidade em BAU]",label:"Pr\xF3xima Disponibilidade",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Maravilha! Muito bom saber que conseguiu concluir as a\xE7\xF5es pendentes. Sendo assim, agora podemos continuar com a implementa\xE7\xE3o das configura\xE7\xF5es em sua conta.</p><br><p>Para isso, pe\xE7o, por favor, que me envie algumas das pr\xF3ximas datas e hor\xE1rios em que est\xE1 dispon\xEDvel a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p><p>Assim que me enviar essa informa\xE7\xE3o, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"nrp_standard",name:"NRP - Padr\xE3o (3\xAA Tentativa)",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Task pedida pelo AM]",label:"Task Solicitada",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reuni\xE3o.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"nrp_dfa",name:"NRP - DFA",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'}],Tl={attempt_10min:{name:"Intento de Contacto (Antes de los 10min)",category:"Intentos y Programaci\xF3n",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Intento de Contacto",labels:{"[Seu Nome]":"Tu Nombre","[INSERIR URL]":"URL del Sitio","[LINK DO MEET]":"Enlace de la Reuni\xF3n"},template:"<p>Hola,</p><br><p>Le habla <strong>[Seu Nome]</strong> del equipo de Soluciones T\xE9cnicas de Google. Intent\xE9 llamar al siguiente n\xFAmero: <strong>...</strong> sin \xE9xito, \xBFtendr\xEDa otro n\xFAmero para que pueda ponerme en contacto?</p><br><p>Le recuerdo que voy a ayudarle a implementar la siguiente tarea:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>En su sitio: <strong>[INSERIR URL]</strong></p><p>Intentar\xE9 llamar nuevamente en 10 minutos; si lo prefiere, puede acceder al enlace de nuestra reuni\xF3n: <strong>[LINK DO MEET]</strong></p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},reschedule2:{name:"Propuesta de Reprogramaci\xF3n",category:"Intentos y Programaci\xF3n",subject:"Reprogramaci\xF3n de Consultor\xEDa",labels:{"[DATA 1]":"Fecha 1","[HORA 1]":"Hora 1","[DATA 2]":"Fecha 2","[HORA 2]":"Hora 2","[DATA 3]":"Fecha 3","[HORA 3]":"Hora 3","[Seu Nome]":"Firma"},template:"<p>Hola, \xBFc\xF3mo est\xE1?</p><br><p>Estas son las pr\xF3ximas fechas disponibles:</p><ul><li><strong>[DATA 1] a las [HORA 1]</strong></li><li><strong>[DATA 2] a las [HORA 2]</strong></li><li><strong>[DATA 3] a las [HORA 3]</strong></li></ul><br><p>Tambi\xE9n le informo que si no hay respuesta a este correo en las pr\xF3ximas 48 horas el caso ser\xE1 cerrado.</p><p>Le recuerdo que mi agenda es din\xE1mica, por lo que en cualquier momento se puede agendar una consultor\xEDa para los d\xEDas disponibles. Por lo tanto, cuanto m\xE1s r\xE1pido pueda responderme, m\xE1s garantizada ser\xE1 la programaci\xF3n de la fecha y el horario.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},max_reschedules:{name:"L\xEDmite de Reprogramaciones Excedido",category:"Intentos y Programaci\xF3n",subject:"Estado de la Programaci\xF3n - Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este correo le encuentre bien.</p><p>Le escribo en nombre del equipo de Google Ads para informarle sobre su solicitud de reprogramaci\xF3n para la implementaci\xF3n de las etiquetas.</p><br><p>Lamentablemente, <strong>ya no podemos reprogramar este caso espec\xEDfico</strong>, pues hemos excedido el l\xEDmite m\xE1ximo de programaciones permitido.</p><br><p>Si desea continuar con la implementaci\xF3n de las etiquetas, ser\xE1 necesario abrir un <strong>nuevo caso</strong> directamente con la <a href="https://support.google.com/google-ads">Ayuda de Google Ads</a>. Esto garantizar\xE1 que reciba el seguimiento y el soporte necesarios para dar continuidad a su solicitud.</p><br><p>Agradecemos su participaci\xF3n en este proceso y la oportunidad de ayudar. Esperamos continuar nuestra colaboraci\xF3n.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'},"2_6_day3":{name:"D\xEDa 3 (Seguimiento)",category:"Follow Up",subject:"Consultor\xEDa con el Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]":"Acci\xF3n Pendiente","[MM/DD/YYYY]":"Fecha del Pr\xF3ximo Contacto","[Seu Nome]":"Firma"},template:"<p>Hola, <strong>[Nome do Cliente]</strong></p><br><p>\xA1Espero que se encuentre bien!</p><p>Intentamos contactarle por tel\xE9fono, pero sin \xE9xito. Me gustar\xEDa saber si ya pudo <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, o si ya tiene una previsi\xF3n de cu\xE1ndo se concluir\xE1 esa acci\xF3n.</p><br><p>Continuar\xE9 monitoreando el estado de la implementaci\xF3n en su sitio, y el d\xEDa <strong>[MM/DD/YYYY]</strong> har\xE9 un nuevo seguimiento para verificar el avance de la implementaci\xF3n.</p><p>Si tiene alg\xFAn problema o duda que le impida realizar la implementaci\xF3n, no dude en compartirlo con nosotros.</p><br><p>Quedo a disposici\xF3n.</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>"},"2_6_day6":{name:"D\xEDa 6 (Seguimiento Final)",category:"Follow Up",subject:"Consultor\xEDa con el Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[URL]":"URL del Sitio","[Seu Nome]":"Firma"},template:"<p>Hola, <strong>[Nome do Cliente]</strong></p><br><p>\xA1Espero que se encuentre bien!</p><p>Tras analizar y revisar el estado de implementaci\xF3n de la etiqueta en su sitio, <strong>[URL]</strong>, verificamos que la etiqueta a\xFAn est\xE1 pendiente de implementaci\xF3n. Intentamos contactarle por correo, pero sin \xE9xito.</p><br><p>Es esencial que sea implementada, pues ofrece una amplia gama de beneficios, como:</p><ul><li>Ayuda a rastrear conversiones en tiempo real</li><li>Mejora la generaci\xF3n de ingresos, en t\xE9rminos de clics</li><li>Sirve para vincular Google Analytics con los anuncios y hacer seguimiento de las conversiones</li><li>Proporciona informaci\xF3n sobre la experiencia del usuario</li></ul><br><p>Si tiene alg\xFAn problema o duda que le impida realizar la implementaci\xF3n, no dude en compartirlo con nosotros. Estaremos encantados de ayudar.</p><p>Si no recibimos ninguna respuesta en los pr\xF3ximos 3 d\xEDas, lamentablemente el caso ser\xE1 cerrado.</p><br><p>Quedo a disposici\xF3n.</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>"},"2_6_completed_reschedule":{name:"Acciones Concluidas (Solicitar Reprogramaci\xF3n)",category:"Follow Up",subject:"Continuidad de la Implementaci\xF3n - Soluciones T\xE9cnicas de Google",labels:{"[Disponibilidade em BAU]":"Pr\xF3xima Disponibilidad","[Seu Nome]":"Firma"},template:"<p>Hola, \xBFc\xF3mo est\xE1?</p><br><p>\xA1Excelente! Muy bueno saber que logr\xF3 concluir las acciones pendientes. Siendo as\xED, ahora podemos continuar con la implementaci\xF3n de las configuraciones en su cuenta.</p><br><p>Para eso, le pido, por favor, que me env\xEDe algunas de las pr\xF3ximas fechas y horarios en los que est\xE9 disponible a partir del d\xEDa <strong>[Disponibilidade em BAU]</strong>.</p><p>En cuanto me env\xEDe esa informaci\xF3n, crear\xE9 una reprogramaci\xF3n para que uno de nuestros agentes contin\xFAe ayud\xE1ndole.</p><br><p>Tambi\xE9n le informo que si no hay respuesta a este correo, realizar\xE9 un seguimiento de este caso durante 6 d\xEDas, en el que me pondr\xE9 en contacto cada 3 d\xEDas para intentar reprogramar su caso lo antes posible.</p><p>Le recuerdo que mi agenda es din\xE1mica, por lo que en cualquier momento se puede agendar una consultor\xEDa para los d\xEDas disponibles. Por lo tanto, cuanto m\xE1s r\xE1pido pueda responderme, m\xE1s garantizada ser\xE1 la programaci\xF3n de la fecha y el horario.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},nrp_standard:{name:"NRP - Est\xE1ndar (3.\xBA Intento)",category:"NRP / Cierre",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Cierre",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Task pedida pelo AM]":"Tarea Solicitada","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Intentamos llamarle hoy sobre el caso de Implementaci\xF3n de la etiqueta referente a la solicitud de <strong>[Task pedida pelo AM]</strong>. Se hizo otro intento despu\xE9s de 10 minutos, pero tampoco logramos contactarle.</p><p>Debido a la alta demanda, no podemos reprogramar un horario. Por eso, vamos a cerrar este caso. Sin embargo, si a\xFAn desea continuar con la implementaci\xF3n, basta con acceder a este enlace y elegir la mejor fecha y horario para hablar con nuestro equipo, o si lo prefiere, p\xF3ngase en contacto con su gerente de cuentas de Google para agendar una nueva reuni\xF3n.</p><p>Lamentamos el inconveniente y esperamos trabajar con usted nuevamente en el futuro.</p><br><p>Si desea saber m\xE1s, consulte a continuaci\xF3n algunos enlaces \xFAtiles con recursos valiosos relacionados con la implementaci\xF3n de etiquetas y el soporte de Shopping.</p><p><strong>En relaci\xF3n con las etiquetas</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Soporte para la implementaci\xF3n de etiquetas</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>En relaci\xF3n con Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">C\xF3mo configurar la cuenta y el feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Optimizaci\xF3n del feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'},nrp_dfa:{name:"NRP - DFA",category:"NRP / Cierre",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Cierre",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Intentamos llamarle hoy sobre el caso de Implementaci\xF3n de la etiqueta referente a la solicitud. Se hizo otro intento despu\xE9s de 10 minutos, pero tampoco logramos contactarle.</p><p>Debido a la alta demanda, no podemos reprogramar un horario. Por eso, vamos a cerrar este caso. Sin embargo, si a\xFAn desea continuar con la implementaci\xF3n, basta con acceder a este enlace y elegir la mejor fecha y horario para hablar con nuestro equipo.</p><p>Lamentamos el inconveniente y esperamos trabajar con usted nuevamente en el futuro.</p><br><p>Si desea saber m\xE1s, consulte a continuaci\xF3n algunos enlaces \xFAtiles con recursos valiosos relacionados con la implementaci\xF3n de etiquetas y el soporte de Shopping.</p><p><strong>En relaci\xF3n con las etiquetas</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Soporte para la implementaci\xF3n de etiquetas</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>En relaci\xF3n con Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">C\xF3mo configurar la cuenta y el feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Optimizaci\xF3n del feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'}},Il={attempt_10min:{name:"Contact Attempt (Before the 10min)",category:"Attempts & Scheduling",subject:"Implementation with the Google Technical Solutions Team - Contact Attempt",labels:{"[Seu Nome]":"Signature","[INSERIR URL]":"Site URL","[LINK DO MEET]":"Meet Link"},template:"<p>Hello,</p><br><p>This is <strong>[Seu Nome]</strong> from the Google Technical Solutions team. I tried calling the following number: <strong>...</strong> without success. Would you have another number I could reach you on?</p><br><p>As a reminder, I will be helping you implement the following task:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>On your site: <strong>[INSERIR URL]</strong></p><p>I will try calling again within 10 minutes. If you prefer, you can join our meeting link: <strong>[LINK DO MEET]</strong></p><br><p>Best regards,</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google.</p>"},reschedule2:{name:"Rescheduling Proposal",category:"Attempts & Scheduling",subject:"Consultation Rescheduling",labels:{"[DATA 1]":"Date 1","[HORA 1]":"Time 1","[DATA 2]":"Date 2","[HORA 2]":"Time 2","[DATA 3]":"Date 3","[HORA 3]":"Time 3","[Seu Nome]":"Signature"},template:"<p>Hello, how are you?</p><br><p>Here are the next available dates:</p><ul><li><strong>[DATA 1] at [HORA 1]</strong></li><li><strong>[DATA 2] at [HORA 2]</strong></li><li><strong>[DATA 3] at [HORA 3]</strong></li></ul><br><p>Please note that if there is no reply to this email within the next 48 hours, the case will be closed.</p><p>My calendar is dynamic, so a consultation can be booked for the available days at any time. The sooner you can reply, the more likely it is that the date and time will be secured.</p><br><p>Best regards,</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google.</p>"},max_reschedules:{name:"Rescheduling Limit Exceeded",category:"Attempts & Scheduling",subject:"Scheduling Status - Google Technical Solutions Team",labels:{"[Nome do Cliente]":"Customer Name","[Seu Nome]":"Signature"},template:'<p>Hello, <strong>[Nome do Cliente]</strong>,</p><br><p>I hope this email finds you well.</p><p>I am writing on behalf of the Google Ads team regarding your rescheduling request for the tag implementation.</p><br><p>Unfortunately, <strong>we can no longer reschedule this particular case</strong>, as we have exceeded the maximum number of bookings allowed.</p><br><p>If you would like to proceed with the tag implementation, you will need to open a <strong>new case</strong> directly with <a href="https://support.google.com/google-ads">Google Ads Help</a>. That will ensure you receive the follow-up and support needed to continue with your request.</p><br><p>Thank you for your involvement in this process and for the opportunity to help. We look forward to continuing our collaboration.</p><br><p>Best regards,</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google</p>'},"2_6_day3":{name:"Day 3 (Follow-up)",category:"Follow Up",subject:"Consultation with the Google Technical Solutions Team",labels:{"[Nome do Cliente]":"Customer Name","[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]":"Pending Action","[MM/DD/YYYY]":"Next Contact Date","[Seu Nome]":"Signature"},template:"<p>Hello, <strong>[Nome do Cliente]</strong></p><br><p>I hope you are well!</p><p>We tried to reach you by phone, but without success. I would like to know whether you have been able to <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, or whether you have an estimate of when that action will be completed.</p><br><p>I will keep monitoring the implementation status on your site, and on <strong>[MM/DD/YYYY]</strong> I will follow up again to check on its progress.</p><p>If you run into any problem or question that prevents you from completing the implementation, please feel free to share it with us.</p><br><p>I remain at your disposal.</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google</p>"},"2_6_day6":{name:"Day 6 (Final Follow-up)",category:"Follow Up",subject:"Consultation with the Google Technical Solutions Team",labels:{"[Nome do Cliente]":"Customer Name","[URL]":"Site URL","[Seu Nome]":"Signature"},template:"<p>Hello, <strong>[Nome do Cliente]</strong></p><br><p>I hope you are well!</p><p>After analyzing and reviewing the tag implementation status on your site, <strong>[URL]</strong>, we found that the tag is still pending implementation. We tried to reach you by email, but without success.</p><br><p>Implementing it is essential, as it offers a wide range of benefits, such as:</p><ul><li>It helps track conversions in real time</li><li>It improves revenue generation, in terms of clicks</li><li>It links Google Analytics to your ads and tracks conversions</li><li>It provides insight into the user experience</li></ul><br><p>If you run into any problem or question that prevents you from completing the implementation, please feel free to share it with us. We would be glad to help.</p><p>If we do not hear back within the next 3 days, the case will unfortunately be closed.</p><br><p>I remain at your disposal.</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google</p>"},"2_6_completed_reschedule":{name:"Actions Completed (Request Rescheduling)",category:"Follow Up",subject:"Continuing the Implementation - Google Technical Solutions",labels:{"[Disponibilidade em BAU]":"Next Availability","[Seu Nome]":"Signature"},template:"<p>Hello, how are you?</p><br><p>Great! Good to hear you managed to complete the pending actions. That means we can now continue with the setup on your account.</p><br><p>For that, please send me a few of the next dates and times you are available from <strong>[Disponibilidade em BAU]</strong> onwards.</p><p>As soon as you send that over, I will create a rescheduling so one of our agents can continue helping you.</p><br><p>Please also note that if there is no reply to this email, I will follow up on this case for 6 days, getting in touch every 3 days so we can reschedule your case as soon as possible.</p><p>My calendar is dynamic, so a consultation can be booked for the available days at any time. The sooner you can reply, the more likely it is that the date and time will be secured.</p><br><p>Best regards,</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google.</p>"},nrp_standard:{name:"NRP - Standard (3rd Attempt)",category:"NRP / Closure",subject:"Implementation with the Google Technical Solutions Team - Closure",labels:{"[Nome do Cliente]":"Customer Name","[Task pedida pelo AM]":"Requested Task","[Seu Nome]":"Signature"},template:'<p>Hello, <strong>[Nome do Cliente]</strong>,</p><br><p>We tried to call you today about the tag Implementation case regarding the request for <strong>[Task pedida pelo AM]</strong>. Another attempt was made after 10 minutes, but we were unable to reach you then either.</p><p>Due to high demand, we are unable to reschedule a time. We will therefore be closing this case. However, if you would still like to continue with the implementation, you can use this link to pick the best date and time to speak with our team, or if you prefer, contact your Google account manager to book a new meeting.</p><p>We apologize for the inconvenience and hope to work with you again in the future.</p><br><p>If you would like to know more, below are some useful links with valuable resources about tag implementation and Shopping support.</p><p><strong>Regarding tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Tag implementation support</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Regarding Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">How to set up the account and the feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Feed optimization</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google platforms</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google</p>'},nrp_dfa:{name:"NRP - DFA",category:"NRP / Closure",subject:"Implementation with the Google Technical Solutions Team - Closure",labels:{"[Nome do Cliente]":"Customer Name","[Seu Nome]":"Signature"},template:'<p>Hello, <strong>[Nome do Cliente]</strong>,</p><br><p>We tried to call you today about the tag Implementation case regarding the request. Another attempt was made after 10 minutes, but we were unable to reach you then either.</p><p>Due to high demand, we are unable to reschedule a time. We will therefore be closing this case. However, if you would still like to continue with the implementation, you can use this link to pick the best date and time to speak with our team.</p><p>We apologize for the inconvenience and hope to work with you again in the future.</p><br><p>If you would like to know more, below are some useful links with valuable resources about tag implementation and Shopping support.</p><p><strong>Regarding tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Tag implementation support</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Regarding Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">How to set up the account and the feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Feed optimization</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google platforms</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google</p>'}},El={pt:"pt-BR",es:"es-ES",en:"en-US"};function Nl(e,t){return e.toLocaleDateString(El[t]||El.pt,{year:"numeric",month:"2-digit",day:"2-digit"})}function Ll(e,t){let a={es:Tl,en:Il}[t];if(!a)return e;let o=a[e?.id];return o?{...e,name:o.name??e.name,category:o.category??e.category,subject:o.subject??e.subject,template:o.template??e.template,placeholders:(e.placeholders||[]).map(n=>({...n,label:o.labels?.[n.key]??n.label}))}:e}function kl(e){if(!Array.isArray(e)||!e.length)return!1;let t=e.slice().sort((n,i)=>(n.sortOrder||0)-(i.sortOrder||0)),a=[],o={ES:{},EN:{}};for(let n of t){let i=n.key;if(!i)continue;let r;try{r=JSON.parse(n.value||"{}")}catch{continue}if(!r.subject||!r.template)continue;let s=String(n.lang||"").toUpperCase(),l=o[s];l?l[i]={name:n.label||"",category:n.field||"",subject:r.subject,template:r.template,labels:r.labels||{}}:(s==="PT"||s===""||s==="ALL")&&a.push({id:i,name:n.label||i,category:n.field||"",subject:r.subject,template:r.template,placeholders:r.placeholders||[]})}if(!a.length)return!1;Mn.length=0,Mn.push(...a);for(let[n,i]of[["ES",Tl],["EN",Il]])if(Object.keys(o[n]).length){for(let r of Object.keys(i))delete i[r];Object.assign(i,o[n])}return!0}async function _l(){let e=Te.getCachedContent("email_template"),t=kl(e);try{let a=await Te.fetchContentModule("email_template");t=kl(a)||t}catch(a){console.warn("Central de Conte\xFAdo indispon\xEDvel; usando modelos embutidos.",a)}return t}var qn={pt:{emailButtonNotFound:"Erro: Bot\xE3o de email n\xE3o encontrado.",clearingOldDraft:"Limpando rascunho antigo...",editorNotLoaded:"Erro: Editor n\xE3o carregou.",cannedResponseApplied:"Canned Response aplicada!",cannedResponseTimeout:e=>`Timeout: Template '${e}' n\xE3o carregou.`,cannedResponseButtonNotFound:"Bot\xE3o Canned Response n\xE3o encontrado.",emailFilledSuccess:"Email preenchido com sucesso!",editorFocusError:"Erro ao focar no editor.",verifyEmailWarning:"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente.",amCcWarning:"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.",fallbackClient:"Cliente",fallbackSite:"seu site"},es:{emailButtonNotFound:"Error: Bot\xF3n de email no encontrado.",clearingOldDraft:"Limpiando borrador antiguo...",editorNotLoaded:"Error: El editor no carg\xF3.",cannedResponseApplied:"\xA1Canned Response aplicada!",cannedResponseTimeout:e=>`Tiempo agotado: la plantilla '${e}' no carg\xF3.`,cannedResponseButtonNotFound:"Bot\xF3n Canned Response no encontrado.",emailFilledSuccess:"\xA1Email completado con \xE9xito!",editorFocusError:"Error al enfocar el editor.",verifyEmailWarning:"<strong>Verifica el correo:</strong> El CRM puede traducir los caracteres de forma incorrecta.",amCcWarning:"<strong>Atenci\xF3n:</strong> Verifica si el correo del AM debe ir en copia.",fallbackClient:"Cliente",fallbackSite:"su sitio"},en:{emailButtonNotFound:"Error: email button not found.",clearingOldDraft:"Clearing the old draft...",editorNotLoaded:"Error: the editor did not load.",cannedResponseApplied:"Canned Response applied!",cannedResponseTimeout:e=>`Timed out: template '${e}' did not load.`,cannedResponseButtonNotFound:"Canned Response button not found.",emailFilledSuccess:"Email filled in successfully!",editorFocusError:"Error focusing the editor.",verifyEmailWarning:"<strong>Check the email address:</strong> The CRM may translate characters incorrectly.",amCcWarning:"<strong>Heads up:</strong> Check whether the AM's email should be in CC.",fallbackClient:"Customer",fallbackSite:"your site"}};function Kt(e){let t=ge();return qn[t]?.[e]??qn.pt[e]}function On(e){let t=Tt();return qn[t]?.[e]??qn.pt[e]}function ut(e,t="info"){let a={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${e}`,a[t]||a.info)}function Rn(e,t){if(!e)return;let a=`cw-warning-${e.id||Math.random().toString(36).substr(2,9)}`,o=document.getElementById(a);o&&o.remove();let n=e.getBoundingClientRect(),i=document.createElement("div");i.id=a,i.style.cssText=`
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
        z-index: ${ft.TOAST};
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
    `;let r=i.querySelector(".cw-close-btn");r.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&r.click()},25e3)}async function Fn(e,t){if(!e||!t)return;e.focus(),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await Ne(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),await Ne(100),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function Vi(){let t=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(a=>{let o=a.offsetParent!==null,n=a.closest("case-message-view")!==null,i=a.closest(".editor")!==null||a.closest("write-card")!==null;return o&&!n&&i});return t&&ut("Editor visualmente detectado.","success"),t}var Ui=e=>!!e&&e.getClientRects().length>0&&e.getAttribute("aria-disabled")!=="true";async function cm(e,{timeout:t=3e3,intervalo:a=100}={}){let o=Date.now()+t;for(;Date.now()<o;){let n=e();if(n)return n;await Ne(a)}return null}function Dl(){let e=Array.from(document.querySelectorAll('material-button.compose, material-button.speed-dial-mini-fab[role="menuitem"]')),t=e.find(a=>a.classList.contains("compose")&&Ui(a));return t||e.find(a=>{let o=a.querySelector("i.material-icons-extended");return Ui(a)&&o&&o.textContent.trim()==="email"})||null}async function dm(){try{let e=Dl();if(e)ut("Menu do speed dial j\xE1 estava aberto.");else{let t=document.querySelector("#action-bar-speed-dial-container material-button")||document.querySelector("material-button.action-bar-speed-dial-button");if(!Ui(t))return ut("Speed dial (+ Open) n\xE3o encontrado.","warn"),!1;ut("Speed dial (+ Open) encontrado. Abrindo o menu..."),kt(t),await Ne(350),e=await cm(Dl,{timeout:3e3})}return e?(await Ne(120),kt(e),ut("Compose clicado via speed dial.","success"),!0):(ut("Menu abriu, mas o bot\xE3o Compose n\xE3o apareceu.","warn"),!1)}catch(e){return ut(`Falha no speed dial: ${e.message}`,"error"),!1}}async function pm(){let t=Array.from(document.querySelectorAll("i.material-icons-extended")).find(o=>o.innerText.trim()==="email");if(t&&t.offsetParent!==null){ut("Bot\xE3o de email direto encontrado.");let o=t.closest("material-button")||t.closest("material-fab")||t;return kt(o),!0}ut("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let a=document.querySelector("material-fab-speed-dial");if(a){let o=a.querySelector(".trigger");if(o){kt(o),await Ne(800);let i=Array.from(document.querySelectorAll("i.material-icons-extended")).find(r=>r.innerText.trim()==="email");if(i)return kt(i),ut("Email aberto pelo fluxo antigo.","success"),!0}}return!1}async function Ml(){ut("\u{1F680} FASE 1: Tentando abrir a janela de email...");let e=await dm();if(e||(ut("UI nova n\xE3o reconhecida. Voltando ao fluxo da UI antiga...","warn"),e=await pm()),!e)return y.playError(),ne(Kt("emailButtonNotFound"),{error:!0}),!1;ut("\u{1F680} FASE 2: Verificando rascunhos...");let t=null,a=0,o=20;for(;a<o;){await Ne(250);let d=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(t=Array.from(d).find(c=>c.offsetParent!==null),t){ut("\u26A0\uFE0F Rascunho detectado!","warn");break}a++}if(t){ut("\u{1F5D1}\uFE0F Descartando..."),kt(t),t.click();let d=null,c=0;for(;c<15;){await Ne(300);let g=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(d=Array.from(g).find(u=>u.offsetParent!==null),d)break;c++}d&&(kt(d),ne(Kt("clearingOldDraft"),{duration:2e3}),await Ne(2500))}ut("\u{1F680} FASE 3: Buscando editor final...");let n=0,i=null;for(;n<20&&(i=Vi(),!i);)await Ne(250),n++;if(!i)return y.playError(),ne(Kt("editorNotLoaded"),{error:!0}),!1;let r=i.closest('[id="email-body-content-top"]'),l=(i.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(r){if(l){let c=l.closest('[aria-hidden="true"]');c&&c.removeAttribute("aria-hidden"),l.focus(),kt(l)}await Ne(300),r.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let d=r.querySelector("#cases-body-field");if(d){let c=document.createRange();c.selectNodeContents(d),c.collapse(!0);let g=window.getSelection();g.removeAllRanges(),g.addRange(c)}return!0}return!1}async function go(e){if(!e||!await Ml())return;let a=await Ut();ut("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let o=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(o&&(o.click(),await Ne(600)),a.clientEmail&&a.clientEmail!=="N/A"&&a.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await Fn(i,a.clientEmail),Rn(i,Kt("verifyEmailWarning")))}if(a.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await Fn(i,a.internalEmail),Rn(i,Kt("amCcWarning")))}await Ne(500);let n=document.querySelector('material-button[debug-id="canned_response_button"]');if(n){kt(n),await Ne(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){kt(i),document.execCommand("insertText",!1,e),i.dispatchEvent(new Event("input",{bubbles:!0})),ut("\u23F3 Buscando resultado da Canned Response...","info");let r=null,s=0,l=15e3,d=500;for(;s<l&&(r=document.querySelector("material-select-dropdown-item"),!r);)await Ne(d),s+=d;if(r){kt(r),await Ne(1500);let c=Vi();if(c){let u=Array.from(c.querySelectorAll("span.field")).filter(L=>L.innerText.includes("{Requested Task Type}"));if(u.length>0){let L=u.map(C=>C.closest("tr")).filter(C=>C!==null),A=[...new Set(L)];if(A.length>0){let z=A[0].querySelector('td[width="100%"]');z&&(z.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let G=1;G<A.length;G++)A[G].remove()}}let b=c.innerHTML;a.advertiserName&&b.includes("{%ADVERTISER_NAME%}")&&(b=b.replace(/{%ADVERTISER_NAME%}/g,a.advertiserName)),b.includes("{%^79285%}")&&(b=b.replace(/{%\^79285%}/g,a.websiteUrl||On("fallbackSite"))),c.innerHTML=b}ne(Kt("cannedResponseApplied"))}else ut(`\u274C Timeout: Resultado '${e}' n\xE3o apareceu ap\xF3s 15s.`,"error"),y.playError(),ne(Kt("cannedResponseTimeout")(e),{error:!0})}}else y.playError(),ne(Kt("cannedResponseButtonNotFound"),{error:!0})}async function Ol(e){if(ut(`\u{1F680} Iniciando Quick Email: ${e.name}`),!await Ml())return;let a=await Ut(),o=Ro();await Ne(600);let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await Ne(600)),a.clientEmail&&a.clientEmail!=="N/A"&&a.clientEmail!=="N/A (Bloqueado)"){let s=document.querySelector('input[aria-label="Enter To email address"]');s&&(await Fn(s,a.clientEmail),Rn(s,Kt("verifyEmailWarning")))}if(a.internalEmail){let s=document.querySelector('input[aria-label="Enter Bcc email address"]');s&&(await Fn(s,a.internalEmail),Rn(s,Kt("amCcWarning")))}let i=document.querySelector('input[aria-label="Subject"]');i&&e.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,e.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await Ne(300));let r=Vi();if(r){let l=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');l&&(l.focus(),kt(l));let d=new Date;d.setDate(d.getDate()+3);let c=d.getDay();c===6?d.setDate(d.getDate()+2):c===0&&d.setDate(d.getDate()+1);let g=Nl(d,Tt()),u=e.body;u=u.replace(/\[Nome do Cliente\]/g,a.advertiserName||On("fallbackClient")),u=u.replace(/\[INSERIR URL\]/g,a.websiteUrl||On("fallbackSite")),u=u.replace(/\[URL\]/g,a.websiteUrl||On("fallbackSite")),u=u.replace(/\[Seu Nome\]/g,o),u=u.replace(/\[MM\/DD\/YYYY\]/g,g),document.execCommand("insertHTML",!1,u),l&&(l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))),ne(Kt("emailFilledSuccess"),{duration:2e3}),ut("\u2705 Processo finalizado com sucesso.","success")}else y.playError(),ne(Kt("editorFocusError"),{error:!0})}var Wi=460,Yi=280,um=200,Xi=.06;if(!document.getElementById("cw-module-styles")){let e=document.createElement("style");e.id="cw-module-styles",e.innerHTML=`
        /* M\xD3DULO BASE */
        .cw-module-window {
            /* Degrau de repouso da janela. Precisa estar AQUI, e n\xE3o s\xF3
               no estilo inline de stylePopup(): o fim do fechamento faz
               popup.style.zIndex = '', o que apaga o inline e deixaria a
               janela em z-index:auto na pr\xF3xima abertura. */
            z-index: ${ft.MODULE_RESTING};
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
            transform: scale(${Xi});

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
    `,document.head.appendChild(e)}window._cwEscapeListenerActive||(window._cwEscapeListenerActive=!0,document.addEventListener("keydown",e=>{if(e.key!=="Escape"||document.querySelector(".cw-dialog-overlay"))return;let t=document.querySelector(".cw-module-window.open");if(!t)return;let a=t.querySelector(".cw-header-close");a&&a.click()}));function Bl(){return!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)}function ql(e){let t=document.querySelector(".cw-pill"),a=e?document.getElementById(e):null,o=!!(t&&t.classList.contains("collapsed")),n=i=>{if(!i)return null;let r=i.getBoundingClientRect();return!r.width||!r.height?null:{x:r.left+r.width/2,y:r.top+r.height/2}};if(!o){let i=!!(a&&a.closest(".cw-drawer:not(.open)")),r=n(i?document.getElementById("cw-btn-more"):a);if(r)return r}return n(t)}function Rl(e,t){let a=e.style.transition,o=e.style.transform;e.style.transition="none",e.style.transform="none";let n=e.getBoundingClientRect();return e.style.transform=o,e.offsetWidth,e.style.transition=a,{left:t?n.left:n.left-n.width/2,top:t?n.top:n.top-n.height/2,width:n.width,height:n.height}}function Fl(e,t,a){if(!t){e.style.transformOrigin="50% 50%",e._cwOrigin=null;return}let o=`${Math.round(t.x-a.left)}px ${Math.round(t.y-a.top)}px`;e.style.transformOrigin=o,e._cwOrigin=o}function zl(e){return e?`translate(0, 0) scale(${Xi})`:`translate(-50%, -50%) scale(${Xi})`}function mm(e){return e?"translate(0, 0) scale(1)":"translate(-50%, -50%) scale(1)"}function Pl(e){!e||Bl()||(e.classList.remove("cw-absorbing"),e.offsetWidth,e.classList.add("cw-absorbing"),setTimeout(()=>e.classList.remove("cw-absorbing"),400))}function ht(e){return e?typeof e._cwOpen=="boolean"?e._cwOpen:e.classList.contains("open"):!1}function dt(e,t,a){let o=a?document.getElementById(a):null;if(!t)return;t._cwOpen=!!e;let n=(t._cwAnimToken||0)+1;t._cwAnimToken=n;let i=()=>t._cwAnimToken!==n;t._cwTeardown&&(t._cwTeardown(),t._cwTeardown=null);let r=Bl(),s=t.getAttribute("data-moved")==="true";if(e){y.playGenieOpen();let l=Rl(t,s);Fl(t,ql(a),l),t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",t.style.transform=zl(s),t.style.willChange="transform, opacity",t.classList.add("cw-animating"),t.offsetWidth,requestAnimationFrame(()=>{i()||(t.classList.add("open"),t.classList.remove("idle"),o&&o.classList.add("active"),Pl(o),t.style.transition=r?"opacity 0.15s ease":`opacity ${Math.round(Wi*.6)}ms ease-out, transform ${Wi}ms var(--cw-ease-decelerate), filter 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease`,t.style.opacity="1",t.style.transform=mm(s),$l(t,n,r?150:Wi,()=>{t.style.willChange="auto",t.classList.remove("cw-animating"),t._cwSettled=!0}))}),t._cwSettled=!1,gm(t,a)}else{if(y.playSwoosh(),t._cwSettled||!t._cwOrigin){let l=Rl(t,s);Fl(t,ql(a),l)}if(t.style.transition=r?"opacity 0.15s ease":`opacity ${Math.round(Yi*.8)}ms ease, transform ${Yi}ms var(--cw-ease-accelerate)`,t.style.pointerEvents="none",t.style.willChange="transform, opacity",t.classList.add("cw-animating"),o&&t.contains(document.activeElement))try{o.focus({preventScroll:!0})}catch{o.focus()}requestAnimationFrame(()=>{i()||(t.style.opacity="0",t.style.transform=zl(s),$l(t,n,r?150:Yi,()=>{t.classList.remove("open"),t.classList.remove("idle"),t.style.zIndex="",o&&o.classList.remove("active"),Pl(o),t.style.willChange="auto",t.classList.remove("cw-animating"),t.style.transition=""}))}),Gl(t)}}function $l(e,t,a,o){let n=!1,i=()=>{e.removeEventListener("transitionend",s),clearTimeout(l),e._cwTeardown===i&&(e._cwTeardown=null)},r=()=>{n||(n=!0,i(),e._cwAnimToken===t&&o())},s=d=>{d.target===e&&d.propertyName==="transform"&&r()};e.addEventListener("transitionend",s);let l=setTimeout(r,a+um);e._cwTeardown=i}function gm(e,t){Gl(e);let a=o=>{if(!e.classList.contains("open"))return;let n=e.contains(o.target),i=document.querySelector(".cw-pill"),r=document.querySelector(".cw-drawer"),s=i&&i.contains(o.target)||r&&r.contains(o.target);n?(e.classList.remove("idle"),e.style.zIndex=String(ft.MODULE_FOCUSED)):s||(e.classList.add("idle"),e.style.zIndex=String(ft.MODULE_RESTING))};e._idleHandler=a,document.addEventListener("mousedown",a)}function Gl(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var jl='<svg viewBox="0 0 24 24" fill="currentColor" style="width:13px;height:13px;flex-shrink:0;"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>';function Hl(){let e="v4.0.0",{popup:t,content:a,header:o,animRefs:n,credit:i}=Gs(e,j),r=ol(h),s=In(()=>{le(),me.setActiveTasks(s.getCheckedElements())},h,me),l=document.createElement("div");l.style.display="none";let d=al((f,x)=>{xe(f,x)});l.appendChild(d);let c=document.createElement("button");c.type="button",c.className="cw-save-shortcut-btn",c.style.cssText=`
        margin-top: 10px; padding: 7px 12px; border-radius: 8px;
        border: 1px dashed ${J.border}; background: transparent;
        color: ${J.textSub}; font-family: inherit; font-size: 11.5px;
        font-weight: 600; cursor: pointer; display: inline-flex; align-items: center;
        gap: 6px; transition: all 0.2s ${$e};
    `,c.onmouseenter=()=>{c.style.borderColor=J.primary,c.style.color=J.primary,y.playHover()},c.onmouseleave=()=>{c.style.borderColor=J.border,c.style.color=J.textSub},c.onclick=()=>pe(),c.innerHTML=`${jl}<span>${h("salvar_como_atalho")}</span>`,l.appendChild(c);let g=document.createElement("div");g.id="evidence-container",Object.assign(g.style,{display:"none",marginTop:"16px",padding:"16px",background:J.bgInput,border:`1px solid ${J.border}`,borderRadius:pt.medium,boxShadow:ua.subtle});let u=document.createElement("div");u.className="cw-section-title",u.textContent=h("evidencias_contato"),g.appendChild(u);let b={},L=(f,x)=>{let _=document.createElement("div");_.style.marginBottom="12px";let k=document.createElement("label");k.textContent=x,k.setAttribute("for",f),k.style.cssText=`display: block; font-size: 11px; font-weight: 700; color: ${J.textSub}; margin-bottom: 6px; text-transform: uppercase;`;let W=document.createElement("input");return W.type="text",W.id=f,W.className="cw-input",W.placeholder="https://screenshot.googleplex.com/...",W.style.marginBottom="0",_.appendChild(k),_.appendChild(W),xn(W,{minLength:8}),b[f]=W,_};g.appendChild(L("evidence-l1",h("ligacao_1"))),g.appendChild(L("evidence-l2",h("ligacao_2"))),g.appendChild(L("evidence-msg",h("mensagem_am")));let A=bl({onSaveCurrent:async()=>{let f=await T();return q(),f},onLoadDraft:f=>{ie(f)},t:f=>h(f)}),C=Z(),z=fe(),G=document.createElement("div"),R=N(),O=E(A,h);a.appendChild(C),a.appendChild(z),a.appendChild(R),a.appendChild(l),a.appendChild(G),a.appendChild(g),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none";let de=document.createElement("button");de.id="manual-task-toggle",de.textContent=h("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",de.style.cssText=`display: none; width: 100%; padding: 14px; border: 2px dashed ${J.primary}; background: ${J.surface}; color: ${J.primary}; border-radius: ${pt.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${$e}; text-transform: uppercase; letter-spacing: 0.5px;`,de.onmouseenter=()=>{de.style.background=J.primaryBg},de.onmouseleave=()=>{de.style.background=J.surface},de.onclick=()=>{s.selectionElement.style.display="block",s.screenshotsElement.style.display="block",de.style.display="none"},a.appendChild(de),a.appendChild(s.selectionElement),a.appendChild(r.element),a.appendChild(s.screenshotsElement),a.appendChild(O);let te=document.createElement("div");te.style.display="none",te.style.flexGrow="1",te.style.minHeight="0",te.style.overflow="hidden";let re=Dn(()=>F());re.style.height="100%",te.appendChild(re),t.insertBefore(te,i);let ee=p(),w=o.lastElementChild;w&&(w.insertBefore(A.historyBtnWrapper,w.firstChild),w.insertBefore(ee,w.firstChild)),t.appendChild(A.drawer);let S=null;me.subscribe(f=>{M(f),D(),f.isDirty?(S&&clearTimeout(S),S=setTimeout(async()=>{let x=await T(!0);x.subStatus?Gt.saveEmergency(x):Gt.clearEmergency(),f.isDirty=!1},2e3)):S&&(clearTimeout(S),S=null)});function D(){let f=Gt.getCount()>0,x=!!me.currentSubStatus;Ln(f||x)}function j(){me.visible=!me.visible,me.visible?Qe():Je(),dt(me.visible,t,"cw-btn-notes")}function F(){me.isSplitView=!me.isSplitView,me.isSplitView?(a.style.display="none",te.style.display="flex",te.style.flexDirection="column",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(a.style.display="flex",te.style.display="none",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function Z(){let f=document.createElement("div");if(f.innerHTML=`
            <div style="display: flex; gap: 12px; margin-bottom: 8px;">
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-fluxo" style="font-size: 10px; margin-bottom: 6px;">${h("fluxo")}</div>
                    <div class="cw-segmented-control" id="type-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-type="bau" class="active" style="z-index:2">BAU</button>
                        <button data-type="lm" style="z-index:2">LM</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-portugal" style="font-size: 10px; margin-bottom: 6px;">${h("caso_portugal")}</div>
                    <div class="cw-segmented-control" id="portugal-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-val="false" class="active" style="z-index:2">${h("nao")}</button>
                        <button data-val="true" style="z-index:2">${h("sim")}</button>
                    </div>
                </div>
            </div>
        `,!document.getElementById("cw-segmented-styles")){let _=document.createElement("style");_.id="cw-segmented-styles",_.innerHTML=`
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
                    transition: all 0.3s ${$e};
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
            `,document.head.appendChild(_)}let x=(_,k)=>{let U=f.querySelector(`#${_}`).querySelector(".cw-segmented-indicator");U&&(U.style.transform=`translateX(${k*100}%) translateX(${k*2}px)`)};return f.querySelectorAll("#type-selector button").forEach((_,k)=>{_.onclick=()=>{me.setCaseType(_.dataset.type),f.querySelectorAll("#type-selector button").forEach(W=>W.classList.remove("active")),_.classList.add("active"),x("type-selector",k),y.playClick(),me.currentSubStatus&&ce(me.currentSubStatus)}}),f.querySelectorAll("#portugal-selector button").forEach((_,k)=>{_.onclick=()=>{me.setPortugalCase(_.dataset.val==="true"),f.querySelectorAll("#portugal-selector button").forEach(W=>W.classList.remove("active")),_.classList.add("active"),x("portugal-selector",k),y.playClick(),me.currentSubStatus&&ce(me.currentSubStatus)}}),f}function fe(){let f=document.createElement("div");f.className="cw-status-section",f.style.cssText="display: flex; flex-direction: column; gap: 8px;",f.innerHTML=`
            <label class="cw-section-title js-label-status" for="main-status-select" style="margin-top: 8px;">${h("status_principal")}</label>
            <select id="main-status-select" class="cw-select">
                <option value="" disabled selected>${h("select_status")}</option>
                <option value="NI">NI - Need Info</option>
                <option value="SO">SO - Solution Offered</option>
                <option value="IN">IN - Inactive</option>
                <option value="AS">AS - Assigned</option>
                <option value="DC">DC - Discard</option>
            </select>
            <label class="cw-section-title js-label-substatus" for="sub-status-select" style="margin-top: 8px;">${h("substatus")}</label>
            <select id="sub-status-select" class="cw-select" disabled>
                <option value="">${h("select_substatus")}</option>
            </select>
        `;let x=f.querySelector("#main-status-select"),_=f.querySelector("#sub-status-select");return x.onchange=()=>{me.setStatus(x.value),ue(x.value,_),me.setSubStatus(""),ce("")},_.onchange=()=>{me.setSubStatus(_.value),ce(_.value)},f}function he(){return g.style.display==="none"?null:{l1:b["evidence-l1"]?.value.trim()||"",l2:b["evidence-l2"]?.value.trim()||"",msg:b["evidence-msg"]?.value.trim()||""}}function ue(f,x){if(x.innerHTML=`<option value="">${h("select_substatus")}</option>`,!f){x.disabled=!0;return}let _=f==="IN"?(()=>{let k=document.createElement("optgroup");return k.label="Fora de Escopo",k})():null;for(let k in lt)if(lt[k].status===f){let W=document.createElement("option");W.value=k,W.textContent=lt[k].name,_&&k.startsWith("IN_Out_of_Scope")?_.appendChild(W):x.appendChild(W)}_&&_.children.length>0&&x.appendChild(_),x.disabled=!1}function ce(f){let x=lt[f],_=f==="NI_Attempted_Contact"||x&&x.name&&x.name.toLowerCase().includes("attempted contact");if(d.render&&d.render(f,me.currentCaseType),!f){g.style.display="none",b["evidence-l1"]&&(b["evidence-l1"].value=""),b["evidence-l2"]&&(b["evidence-l2"].value=""),b["evidence-msg"]&&(b["evidence-msg"].value=""),l.style.display="none",G.style.display="none";let Ie=document.getElementById("manual-task-toggle");Ie&&(Ie.style.display="none"),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",le(),R.style.display="flex",R.style.opacity="1",O.style.display="none";return}if(_?g.style.display="block":(g.style.display="none",b["evidence-l1"]&&(b["evidence-l1"].value=""),b["evidence-l2"]&&(b["evidence-l2"].value=""),b["evidence-msg"]&&(b["evidence-msg"].value="")),R.style.opacity="0",setTimeout(()=>{me.currentSubStatus&&(R.style.display="none")},400),O.style.display="grid",x&&x.templateFields){let Ie=Us(x);me.setActiveFields(x.templateFields.filter(Oe=>!Ie.includes(Oe)))}V(),jo(f,G,me),G.style.display="block",l.style.display="block";let k=f.startsWith("SO_"),W=f==="NI_Awaiting_Validation",U=document.getElementById("manual-task-toggle");k||W?(s.selectionElement.style.display="block",U.style.display="none"):(s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",U.style.display="block");let oe=f==="SO_Education_Only"?"education":"implementation";me.setScreenshotMode(oe),s.updateSubStatus(f),le();let be=document.getElementById("email-automation-toggle-row");be&&(be.style.display=ra[f]?"flex":"none")}function le(){let f=s.getCheckedElements().map(x=>x.value);r.updateVisibility(me.currentSubStatus,f)}function xe(f,x){let _=oo(Mt[f],me.currentLang,f);if(_){for(let k in _)if(k==="linkedTask")s.toggleTask(_.linkedTask,x);else if(k==="activeTasks")_.activeTasks.forEach(W=>{x?s.setTaskCount(W.value,W.count):s.setTaskCount(W.value,0)});else if(k.startsWith("field-")){let W=k,U=_[k],oe=document.getElementById(W);if(oe){let be=ro.includes(W.replace("field-",""));if(x)if(be){let Ie=oe.value.trim();Ie.includes(U.trim())||(oe.value=Ie?Ie+`
`+U.trim():U.trim())}else oe.value=U;else if(be){let Ie=oe.value.trim(),Oe=U.trim();Ie.includes(Oe)&&(oe.value=Ie.replace(Oe,"").trim().replace(/\n{3,}/g,`

`))}else oe.value.trim()===U.trim()&&(oe.value="");me.updateField(W,oe.value),oe.dispatchEvent(new Event("input"))}}}}function E(f,x){let _=document.createElement("div");if(_.className="cw-actions-section",_.style.cssText=`
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 10px;
            margin-top: 16px;
            background: ${J.bgInput};
            border-radius: 12px;
            border: 1px solid ${J.border};
        `,!document.getElementById("cw-actions-hover-styles")){let Ie=document.createElement("style");Ie.id="cw-actions-hover-styles",Ie.innerHTML=`
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
            `,document.head.appendChild(Ie)}let k=document.createElement("div");k.id="email-automation-toggle-row",k.style.cssText="grid-column: 1 / -1; display: none; align-items: center; justify-content: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2px;",k.innerHTML=`
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 10.5px; font-weight: 600; color: ${J.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 13px; height: 13px; accent-color: ${J.primary};">
                <span class="js-label-email-toggle">${x("preencher_email_automaticamente")}</span>
            </label>
        `;let W=f.parkButton;W.classList.add("js-btn-park"),W.style.cssText="width: 100%; margin: 0; border-radius: 10px; height: 34px; font-weight: 600; font-size: 11.5px;";let U=document.createElement("button");U.className="cw-btn-secondary js-btn-reset",U.textContent=x("limpar"),U.style.cssText=`width: 100%; height: 34px; background: ${J.surface}; color: ${J.textSub}; border: 1px solid ${J.border}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,U.onclick=()=>q();let oe=document.createElement("button");oe.className="cw-btn-secondary js-btn-copy",oe.textContent=x("copiar"),oe.style.cssText=`width: 100%; height: 34px; background: ${J.surface}; color: ${J.primary}; border: 1px solid ${J.primary}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,oe.onclick=()=>K();let be=document.createElement("button");return be.className="cw-btn-primary js-btn-generate",be.textContent=x("preencher"),be.style.cssText=`width: 100%; height: 38px; background: ${J.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; grid-column: 1 / -1; font-size: 12.5px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 0px;`,be.onclick=()=>se(),_.appendChild(k),_.appendChild(W),_.appendChild(U),_.appendChild(oe),_.appendChild(be),_}async function K(){if(!me.currentSubStatus){y.playError(),ne(h("select_substatus"),{error:!0});return}let f=Di(me,s,r,he());f?(ea(f),ne(h("copiado_sucesso")),y.playClick()):(y.playError(),ne(h("select_substatus"),{error:!0}))}async function se(){if(!me.currentSubStatus){y.playError(),ne(h("select_substatus"),{error:!0});return}let f=lt[me.currentSubStatus],x=Go(f).filter(U=>{if(!me.activeFields.includes(U))return!1;let oe=me.formData[`field-${U}`];return!oe||!oe.trim()});if(x.length>0){y.playError(),ne(`${h("preencha_obrigatorio")}: ${h(x[0].toLowerCase())}`,{error:!0});return}if(f?.requiresTasks&&s.getCheckedElements().length===0){y.playError(),ne(h("selecione_task_gerar"),{error:!0});return}let _=Di(me,s,r,he());ea(_),j();let k=Ba(),W=await ka();if(W){W.focus(),document.execCommand("insertHTML",!1,_),Ea(W);let U=document.getElementById("email-automation-checkbox");(!U||U.checked)&&me.currentSubStatus&&ra[me.currentSubStatus]&&await go(ra[me.currentSubStatus]),ne(h("inserido_copiado")),y.playSuccess(),_n(),q()}else y.playError(),ne(h("nota_nao_abriu"),{error:!0}),j();k()}function V(){if(me.currentSubStatus){if(me.currentCaseType==="lm")me.removeField("ON_CALL");else{let f=lt[me.currentSubStatus];f&&f.templateFields.includes("ON_CALL")&&me.addFieldAt("ON_CALL",1)}me.isPortugalCase?(me.addFieldAt("CASO_PORTUGAL",1),me.addFieldAt("CONSENTIU_GRAVACAO",2)):(me.removeField("CASO_PORTUGAL"),me.removeField("CONSENTIU_GRAVACAO"))}}function q(){me.reset(),s.reset(),r.reset(),D(),Gt.clearEmergency(),a.querySelectorAll("select").forEach(x=>x.value=""),a.querySelector("#sub-status-select").disabled=!0;let f=document.getElementById("email-automation-toggle-row");f&&(f.style.display="none"),G.innerHTML="",l.style.display="none",R.style.display="flex",R.style.opacity="1",O.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",g.style.display="none",b["evidence-l1"]&&(b["evidence-l1"].value=""),b["evidence-l2"]&&(b["evidence-l2"].value=""),b["evidence-msg"]&&(b["evidence-msg"].value="")}async function T(f=!1){let x={};G.querySelectorAll("input, textarea, select").forEach(oe=>{(oe.id.startsWith("field-")||oe.id==="consent-select")&&(x[oe.id]=oe.value)});let _="Cliente",k="---";if(!f)try{let oe=await Ut();_=oe.advertiserName,k=oe.cid}catch(oe){console.warn("Erro ao coletar pageData:",oe)}let W=s.getCheckedElements().map(oe=>({key:oe.value,count:oe.count})),U=W.map(oe=>{let be=Ze[oe.key];return be?be.name:oe.key});return{currentCaseType:me.currentCaseType,currentLang:me.currentLang,isPortugalCase:me.isPortugalCase,consent:me.consent,tagSupportUsed:me.tagSupportUsed,forcedScreenshots:[...me.forcedScreenshots],activeFields:me.activeFields,status:me.currentStatus,subStatus:me.currentSubStatus,formData:x,activeTasks:W,summaryTags:U,clientName:_,cid:k,timestamp:new Date().toISOString()}}let H=f=>new Promise(x=>setTimeout(x,f));async function ie(f){me.setCaseType(f.currentCaseType||"bau"),me.setPortugalCase(f.isPortugalCase||!1),me.setConsent(f.consent||!1),f.activeFields&&me.setActiveFields(f.activeFields);let x=a.querySelector(`#type-selector button[data-type="${me.currentCaseType}"]`);x&&x.classList.add("active"),a.querySelectorAll("#type-selector button").forEach(k=>{k!==x&&k.classList.remove("active")});let _=a.querySelector(`#portugal-selector button[data-val="${me.isPortugalCase}"]`);if(_&&_.classList.add("active"),a.querySelectorAll("#portugal-selector button").forEach(k=>{k!==_&&k.classList.remove("active")}),f.status){let k=a.querySelector("#main-status-select");k.value=f.status,me.setStatus(f.status);let W=a.querySelector("#sub-status-select");if(ue(f.status,W),await H(50),f.subStatus){if(W.value=f.subStatus,me.setSubStatus(f.subStatus),ce(f.subStatus),await H(100),f.tagSupportUsed!==void 0){me.setTagSupportUsed(f.tagSupportUsed);let U=r.element.querySelector('input[value="Sim"]'),oe=r.element.querySelector('input[value="N\xE3o"]');f.tagSupportUsed&&U?U.checked=!0:oe&&(oe.checked=!0),r.element.querySelector("div:last-child").style.display=f.tagSupportUsed?"none":"block"}f.forcedScreenshots&&me.setForcedScreenshots(f.forcedScreenshots);for(let U in f.formData){let oe=document.getElementById(U);oe&&(oe.value=f.formData[U],me.updateField(U,oe.value))}f.activeTasks&&(f.activeTasks.forEach(U=>s.setTaskCount(U.key,U.count)),me.setActiveTasks(s.getCheckedElements()))}}me.isDirty=!1}async function P(f){let x=f&&f.payload;if(!x||!x.subStatus)return{ok:!1,reason:"invalid"};let _=x.scenarios||[],k=_.map(ke=>Hi(ke)),W=_.filter((ke,wt)=>!k[wt]);if(me.isDirty&&!await ot(h("substituir_rascunho_confirm")))return{ok:!1,reason:"cancelled"};let U=me.visible;if(U||j(),q(),U||await H(550),x.caseType&&x.caseType!==me.currentCaseType){let ke=a.querySelector(`#type-selector button[data-type="${x.caseType}"]`);ke&&ke.click(),await H(60)}let oe=a.querySelector("#main-status-select"),be=a.querySelector("#sub-status-select"),Ie=x.status||String(x.subStatus).split("_")[0];oe.value=Ie,me.setStatus(Ie),ue(Ie,be),await H(60),be.value=x.subStatus,me.setSubStatus(x.subStatus),ce(x.subStatus),await H(160);for(let ke of k.filter(Boolean)){let wt=l.querySelector(`[data-id="${ke}"]`);wt&&wt.click()}await H(120),W.length?(y.playError(),ne(h("atalho_cenario_sumiu"),{error:!0})):y.playSuccess();let Oe=Q();return Oe&&vn(Oe),{ok:!0,missing:W.map(ke=>ke.id)}}function Q(){let f=a.querySelectorAll('input[id^="field-"], textarea[id^="field-"], input[id^="evidence-"]');for(let x of f)if(x.offsetParent!==null&&!String(x.value||"").trim())return x;return null}async function pe(){let f=v();if(!f){y.playError(),ne(h("select_substatus"),{error:!0});return}if(ct.listRaw().length>=ga){y.playError(),ne(h("atalho_limite").replace("{max}",ga),{error:!0});return}let x=lt[f.payload.subStatus]?.name||f.payload.subStatus,_=await An(h("atalho_nome_pergunta"),x);if(_!==null){c.disabled=!0,c.style.opacity="0.6";try{let k=await ct.save({...f,id:Xo(),label:String(_).trim()||x});if(!k.ok){y.playError(),ne(h("atalho_limite").replace("{max}",ga),{error:!0});return}y.playSuccess(),ne(k.synced?h("atalho_salvo"):h("atalho_salvo_local"))}finally{c.disabled=!1,c.style.opacity=""}}}function v(){if(!me.currentSubStatus)return null;let f=d.getSelectedIds?d.getSelectedIds():[];return{kind:"note",payload:{caseType:me.currentCaseType,status:me.currentStatus,subStatus:me.currentSubStatus,scenarios:f.map(x=>({id:x,substatus:me.currentSubStatus}))}}}function h(f){return st[ge()]?.[f]||st.pt?.[f]||f}function p(){let f=document.createElement("div");return f.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',f.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",f.onclick=x=>{x.stopPropagation(),F()},f.title=h("alternar_split"),f}function N(){let f=document.createElement("div");return f.id="notes-empty-state",f.style.cssText=`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${$e};
        `,f.innerHTML=`
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
                    ${h("pronto_comecar")}
                </div>
                <div class="js-empty-help" style="font-size: 13px; color: ${J.textSub}; line-height: 1.6; opacity: 0.8;">
                    ${h("selecione_status_ajuda")}
                </div>
            </div>
        `,f}function M(f){let x=a.querySelector(".js-label-fluxo");x&&(x.textContent=h("fluxo"));let _=a.querySelector(".js-label-portugal");_&&(_.textContent=h("caso_portugal"));let k=a.querySelectorAll("#portugal-selector button");k.length===2&&(k[0].textContent=h("nao"),k[1].textContent=h("sim"));let W=a.querySelector(".js-empty-title");W&&(W.textContent=h("pronto_comecar"));let U=a.querySelector(".js-empty-help");U&&(U.innerHTML=h("selecione_status_ajuda")),ee.title=h("alternar_split");let oe=a.querySelector('#main-status-select option[value=""]');oe&&(oe.textContent=h("select_status"));let be=a.querySelector('#sub-status-select option[value=""]');be&&(be.textContent=h("select_substatus"));let Ie=a.querySelector(".js-label-status");Ie&&(Ie.textContent=h("status_principal"));let Oe=a.querySelector(".js-label-substatus");Oe&&(Oe.textContent=h("substatus"));let ke=a.querySelector(".js-btn-copy");ke&&(ke.textContent=h("copiar"));let wt=a.querySelector(".js-btn-generate");wt&&(wt.textContent=h("preencher"));let Ye=a.querySelector(".js-btn-reset");Ye&&(Ye.textContent=h("limpar"));let gt=document.getElementById("manual-task-toggle");gt&&(gt.textContent=h("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let oa=a.querySelector(".js-btn-park span");oa&&(oa.textContent=h("guardar")),u.textContent=h("evidencias_contato");let yt=g.querySelector('label[for="evidence-l1"]');yt&&(yt.textContent=h("ligacao_1"));let da=g.querySelector('label[for="evidence-l2"]');da&&(da.textContent=h("ligacao_2"));let va=g.querySelector('label[for="evidence-msg"]');va&&(va.textContent=h("mensagem_am"));let na=t.querySelector(".js-drawer-title");na&&(na.textContent=h("rascunhos_salvos"));let pa=t.querySelector(".js-history-btn");pa&&(pa.title=h("meus_rascunhos"));let ko=a.querySelector(".js-label-email-toggle");ko&&(ko.textContent=h("preencher_email_automaticamente")),c.innerHTML=`${jl}<span>${h("salvar_como_atalho")}</span>`,r&&r.setLanguage&&r.setLanguage(h),s&&s.setLanguage&&s.setLanguage(h)}return R.style.display="flex",O.style.display="none",me.setLanguage(Tt()),me.setCaseType("bau"),wa(f=>{me.setLanguage(f),me.currentSubStatus&&ce(me.currentSubStatus)}),je(f=>{let x=t.querySelector(".cw-help-description");x&&(x.textContent=Bo[f]||Bo.pt),M(me)}),D(),setTimeout(async()=>{let f=Gt.getEmergency();f&&(await ot(h("restaurar_rascunho_confirm"))?(ie(f),ne(h("sessao_restaurada"))):Gt.clearEmergency())},3e3),document.body.appendChild(t),co(()=>s.refreshCatalog()),Qs().then(f=>{f&&me.currentSubStatus&&(d.render&&d.render(me.currentSubStatus,me.currentCaseType),jo(me.currentSubStatus,G,me))}),j.openWithPreset=P,j}var fm="Pre-call checklist",Pn="None provided";var bm="Completed",Vl=[{value:"Live Meet case",key:"reasonLiveMeet"},{value:"Case arrived <1h before the call",key:"reasonLate"}],Wl=[{value:"Proceed",key:"nextProceed"},{value:"OOS",key:"nextOos"},{value:"Infeasible",key:"nextInfeasible"}],Ta=[{id:"duplicateCase",label:"Duplicate Case",kind:"yesno",required:!0},{id:"suite360",label:"360 Suite",kind:"yesno",required:!0},{id:"sgtm",label:"sGTM",kind:"yesno",required:!0},{id:"api",label:"API",kind:"yesno",required:!0},{id:"sellerCc",label:"Seller to be CCed",kind:"yesno",required:!0},{id:"tasks",label:"Task(s) [copy&paste]",kind:"textarea",auto:!0},{id:"contactNumber",label:"Contact number",kind:"text",auto:!0},{id:"email",label:"Email",kind:"text",auto:!0},{id:"websiteUrl",label:"Website URL",kind:"text",auto:!0},{id:"websiteCms",label:"Website CMS",kind:"text"},{id:"adsCid",label:"Ads CID",kind:"text",auto:!0},{id:"ga4Id",label:"GA4 Measurement ID",kind:"text"},{id:"specialInstructions",label:"Special instructions",kind:"textarea"},{id:"nextSteps",label:"Next steps",kind:"select",required:!0}],Yl=Ta.filter(e=>e.auto).map(e=>e.id),Ko=e=>String(e??"").trim();function Xl(e){return e.completed==="No"?Ko(e.exceptionReason)?[]:["exceptionReason"]:Ta.filter(t=>t.required&&!Ko(e[t.id])).map(t=>t.id)}var hm="Gerado pelo Cases Wizard";function vm(e){return e.completed==="No"?[{label:`${bm}:`,value:`No \u2192 ${Ko(e.exceptionReason)}`}]:Ta.map(t=>({label:`${t.label}:`,value:Ko(e[t.id])||Pn}))}function zn(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Kl(e){let t=a=>zn(a).replace(/\r?\n/g,"<br>");return[`<b>${zn(fm)}</b>`,...vm(e).map(({label:a,value:o})=>`<b>${zn(a)}</b> ${t(o)}`),`<i>${zn(hm)}</i>`].join("<br><br>")}var xm=/[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+/,Ul=/^[a-z0-9]+(_[a-z0-9]+)+$/;function wm(e,t){let a=Ul.test(e)?t(e):"";return a||(Ul.test(e)?e.split("_").map(o=>o.charAt(0).toUpperCase()+o.slice(1)).join(" "):e)}function Ql(e={},t=()=>""){let a=n=>{let i=Ko(n);return/^n\/a$/i.test(i)?"":i};return{tasks:[...new Set((e.tasks||[]).map(a).filter(Boolean).map(n=>wm(n,t)))].join(", "),contactNumber:a(e.phone),email:a(e.email).match(xm)?.[0]||"",websiteUrl:a(e.website),adsCid:a(e.cid)}}var Jl={pt:{headerDesc:"Checklist r\xE1pido antes da liga\xE7\xE3o, direto na nota.",outputNote:"A nota sai sempre em ingl\xEAs, qualquer que seja o idioma da interface.",completed:"Checklist conclu\xEDdo?",exceptionReason:"Motivo da exce\xE7\xE3o",reasonLiveMeet:"Caso Live Meet",reasonLate:"Caso chegou com menos de 1h para a liga\xE7\xE3o",duplicateCase:"Caso duplicado",suite360:"360 Suite",sgtm:"sGTM",api:"API",sellerCc:"Vendedor em c\xF3pia (CC)",tasks:"Task(s)",contactNumber:"Telefone de contato",email:"E-mail",websiteUrl:"URL do site",websiteCms:"CMS do site",adsCid:"Ads CID",ga4Id:"GA4 Measurement ID",specialInstructions:"Instru\xE7\xF5es especiais",nextSteps:"Pr\xF3ximos passos",yes:"Sim",no:"N\xE3o",select:"Selecione\u2026",nextProceed:"Prosseguir",nextOos:"OOS (fora de escopo)",nextInfeasible:"Invi\xE1vel",autoBadge:"Auto",autoBadgeTitle:"Preenchido automaticamente",capturing:"Capturando dados do caso\u2026",capturedOne:"1 campo preenchido automaticamente. Revise antes de usar.",capturedN:"{n} campos preenchidos automaticamente. Revise antes de usar.",captureNone:"Nada encontrado na tela do caso. Preencha \xE0 m\xE3o.",captureFailed:"N\xE3o foi poss\xEDvel ler a tela do caso. Preencha \xE0 m\xE3o.",clear:"Limpar",copy:"Copiar",copied:"Copiado",insert:"Inserir na nota",toastCopied:"Checklist copiado.",toastInserted:"Checklist inserido na nota (e copiado).",needAnswer:"Responda \u201C{field}\u201D antes de continuar.",insertFailed:"N\xE3o foi poss\xEDvel abrir a nota no CRM. O conte\xFAdo j\xE1 est\xE1 copiado \u2014 cole manualmente."},es:{headerDesc:"Checklist r\xE1pido antes de la llamada, directo en la nota.",outputNote:"La nota siempre sale en ingl\xE9s, sea cual sea el idioma de la interfaz.",completed:"\xBFChecklist completado?",exceptionReason:"Motivo de la excepci\xF3n",reasonLiveMeet:"Caso Live Meet",reasonLate:"El caso lleg\xF3 con menos de 1 h para la llamada",duplicateCase:"Caso duplicado",suite360:"360 Suite",sgtm:"sGTM",api:"API",sellerCc:"Vendedor en copia (CC)",tasks:"Task(s)",contactNumber:"Tel\xE9fono de contacto",email:"Correo electr\xF3nico",websiteUrl:"URL del sitio",websiteCms:"CMS del sitio",adsCid:"Ads CID",ga4Id:"GA4 Measurement ID",specialInstructions:"Instrucciones especiales",nextSteps:"Pr\xF3ximos pasos",yes:"S\xED",no:"No",select:"Selecciona\u2026",nextProceed:"Continuar",nextOos:"OOS (fuera de alcance)",nextInfeasible:"Inviable",autoBadge:"Auto",autoBadgeTitle:"Completado autom\xE1ticamente",capturing:"Capturando datos del caso\u2026",capturedOne:"1 campo completado autom\xE1ticamente. Rev\xEDsalo antes de usar.",capturedN:"{n} campos completados autom\xE1ticamente. Rev\xEDsalos antes de usar.",captureNone:"No se encontr\xF3 nada en la pantalla del caso. Compl\xE9talo a mano.",captureFailed:"No se pudo leer la pantalla del caso. Compl\xE9talo a mano.",clear:"Limpiar",copy:"Copiar",copied:"Copiado",insert:"Insertar en la nota",toastCopied:"Checklist copiado.",toastInserted:"Checklist insertado en la nota (y copiado).",needAnswer:"Responde \u201C{field}\u201D antes de continuar.",insertFailed:"No se pudo abrir la nota en el CRM. El contenido ya est\xE1 copiado \u2014 p\xE9galo manualmente."},en:{headerDesc:"Quick checklist before the call, straight into the note.",outputNote:"The note is always written in English, whatever the interface language.",completed:"Checklist completed?",exceptionReason:"Exception reason",reasonLiveMeet:"Live Meet case",reasonLate:"Case arrived <1h before the call",duplicateCase:"Duplicate case",suite360:"360 Suite",sgtm:"sGTM",api:"API",sellerCc:"Seller to be CCed",tasks:"Task(s)",contactNumber:"Contact number",email:"Email",websiteUrl:"Website URL",websiteCms:"Website CMS",adsCid:"Ads CID",ga4Id:"GA4 Measurement ID",specialInstructions:"Special instructions",nextSteps:"Next steps",yes:"Yes",no:"No",select:"Select\u2026",nextProceed:"Proceed",nextOos:"OOS (out of scope)",nextInfeasible:"Infeasible",autoBadge:"Auto",autoBadgeTitle:"Auto-filled",capturing:"Reading the case\u2026",capturedOne:"1 field filled automatically. Review it before using.",capturedN:"{n} fields filled automatically. Review them before using.",captureNone:"Nothing found on the case screen. Fill it in by hand.",captureFailed:"Couldn't read the case screen. Fill it in by hand.",clear:"Clear",copy:"Copy",copied:"Copied",insert:"Insert into note",toastCopied:"Checklist copied.",toastInserted:"Checklist inserted into the note (and copied).",needAnswer:"Answer \u201C{field}\u201D before continuing.",insertFailed:"Couldn't open the note in the CRM. The content is already copied \u2014 paste it manually."}};var ym="v1.0.0",Zl="Pre-call Checklist",Sm="cw-btn-precall",Cm=110,Am=1500,ec=[{value:"Yes",key:"yes"},{value:"No",key:"no"}],tc='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>';function mt(e,t,a){let o=document.createElement(e);return t&&(o.className=t),a!=null&&(o.textContent=a),o}var Em=()=>!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);async function km(){await Oo();let[e,t]=await Promise.all([vi(),xi()]);return{caseId:await to(),tasks:qa("appointmentTasks"),website:Lt("website"),cid:Fa(),email:e,phone:t}}function nc(){let e=Qa(Jl);Tm();let t=mt("div");t.id="cw-precall-popup",t.classList.add("cw-module-window"),t.setAttribute("role","dialog"),t.setAttribute("aria-label",Zl),Object.assign(t.style,bt,{width:"520px",height:"800px",display:"flex",flexDirection:"column",borderRadius:"24px"});let a=rt(t,Zl,ym,e("headerDesc"),{popup:t},()=>V());t.appendChild(a);let o=mt("div","cw-pc-body");t.appendChild(o);let n=mt("p","cw-pc-note"),i=mt("div","cw-pc-status");i.setAttribute("role","status"),i.setAttribute("aria-live","polite"),o.append(n,i);let r={},s={},l=new Set;function d(q,T,{auto:H=!1,numeric:ie=!1}={}){let P=mt("div","cw-pc-field"),Q=mt("div","cw-pc-label-row"),pe=mt("label","cw-pc-label");pe.htmlFor=`cw-pc-${q}`,Q.appendChild(pe);let v=null;if(H){let p=mt("span","cw-pc-auto");p.innerHTML=tc,v=mt("span"),p.appendChild(v),Q.appendChild(p)}let h=mt(T==="select"?"select":T==="textarea"?"textarea":"input","cw-pc-control");return h.id=`cw-pc-${q}`,T==="text"&&(h.type="text",h.placeholder=Pn,h.autocomplete="off",h.spellcheck=!1),T==="textarea"&&(h.rows=2,h.placeholder=Pn,h.spellcheck=!1),ie&&h.classList.add("cw-pc-num"),h.addEventListener("animationend",()=>h.classList.remove("cw-pc-fill")),h.addEventListener("input",()=>{l.delete(q)&&P.classList.remove("is-auto")}),T==="select"&&h.addEventListener("change",()=>h.classList.toggle("is-placeholder",!h.value)),P.append(Q,h),r[q]=h,s[q]={row:P,label:pe,badgeText:v,badge:v?.parentElement},P}let c=d("completed","select"),g=d("exceptionReason","select"),u={};Ta.forEach(q=>{u[q.id]=d(q.id,q.kind==="yesno"?"select":q.kind,{auto:q.auto,numeric:["contactNumber","adsCid","ga4Id"].includes(q.id)})});let b=(q,T)=>{let H=mt("div",`cw-pc-grid cols-${q}`);return T.forEach(ie=>H.appendChild(u[ie])),H},L=mt("div","cw-pc-stack");L.append(b(3,Ta.filter(q=>q.kind==="yesno").map(q=>q.id)),u.tasks,b(2,["contactNumber","email"]),b(2,["websiteUrl","websiteCms"]),b(2,["adsCid","ga4Id"]),u.specialInstructions,u.nextSteps),o.append(c,g,L);function A(){let q=r.completed.value==="No";g.hidden=!q,L.hidden=q}r.completed.addEventListener("change",A);let C=mt("div","cw-pc-footer"),z=mt("button","cw-pc-btn is-text"),G=mt("button","cw-pc-btn is-outline"),R=mt("button","cw-pc-btn is-filled");[z,G,R].forEach(q=>{q.type="button"});let O=mt("span","cw-pc-btn-icon");O.innerHTML=tc;let de=mt("span");G.append(O,de),C.append(z,G,R),t.appendChild(C);function te(q,T,{withPlaceholder:H}){let ie=q.value;if(q.textContent="",H){let P=mt("option",null,e("select"));P.value="",P.disabled=!0,q.appendChild(P)}T.forEach(({value:P,key:Q})=>{let pe=mt("option",null,e(Q));pe.value=P,q.appendChild(pe)}),q.value=ie||(H?"":T[0].value),q.classList.toggle("is-placeholder",!q.value)}let re=null,ee=!1;function w(){n.textContent=e("outputNote"),s.completed.label.textContent=e("completed"),te(r.completed,ec,{withPlaceholder:!1}),s.exceptionReason.label.textContent=e("exceptionReason"),te(r.exceptionReason,Vl,{withPlaceholder:!0}),Ta.forEach(T=>{s[T.id].label.textContent=e(T.id),s[T.id].badgeText&&(s[T.id].badgeText.textContent=e("autoBadge"),s[T.id].badge.title=e("autoBadgeTitle")),T.kind==="yesno"&&te(r[T.id],ec,{withPlaceholder:!0}),T.kind==="select"&&te(r[T.id],Wl,{withPlaceholder:!0})}),z.textContent=e("clear"),de.textContent=e(ee?"copied":"copy"),R.textContent=e("insert"),re&&S(re.kind,re.key,re.n);let q=t.querySelector(".cw-help-description");q&&(q.textContent=e("headerDesc"))}function S(q,T,H){re={kind:q,key:T,n:H},i.className=`cw-pc-status ${q?`is-${q}`:""}`,i.textContent=e(T).replace("{n}",H)}let D=0,j=null,F=!1,Z=!1;function fe(){G.disabled=R.disabled=F||Z}function he(){Object.values(r).forEach(q=>{q.value=""}),r.completed.value="Yes",r.completed.classList.remove("is-placeholder"),Object.values(s).forEach(({row:q})=>q.classList.remove("is-auto")),l.clear(),w(),A()}function ue(q,T){let H=Yl.filter(P=>q[P]&&!r[P].value.trim()),ie=Em();return H.forEach((P,Q)=>{window.setTimeout(()=>{if(T!==D)return;let pe=r[P];pe.value.trim()||(pe.value=q[P],l.add(P),s[P].row.classList.add("is-auto"),ie||(pe.classList.remove("cw-pc-fill"),pe.offsetWidth,pe.classList.add("cw-pc-fill")))},ie?0:Q*Cm)}),new Set([...l,...H]).size}async function ce(){let q=++D,T=`${await to()}|${Fa()}`;if(q===D){T!==j&&(he(),j=T),S("busy","capturing"),F=!0,fe();try{let H=await km();if(q!==D)return;let ie=ue(Ql(H,P=>Ze[P]?.name),q);ie===0?S("","captureNone"):S("auto",ie===1?"capturedOne":"capturedN",ie)}catch(H){console.warn("Pre-call: n\xE3o foi poss\xEDvel ler a tela do caso:",H),q===D&&S("","captureFailed")}finally{q===D&&(F=!1,fe())}}}function le(){let q={completed:r.completed.value,exceptionReason:r.exceptionReason.value};return Ta.forEach(T=>{q[T.id]=r[T.id].value}),q}function xe(){let q=le(),[T]=Xl(q);return T?(y.playError(),ne(e("needAnswer").replace("{field}",e(T)),{error:!0}),vn(r[T]),null):Kl(q)}function E(){ee=!0,G.classList.add("is-done"),de.textContent=e("copied"),window.setTimeout(()=>{ee=!1,G.classList.remove("is-done"),de.textContent=e("copy")},Am)}function K(){let q=xe();q&&(ea(q),E(),y.playSuccess(),navigator.vibrate&&navigator.vibrate(10),ne(e("toastCopied")))}async function se(){let q=xe();if(!q)return;Z=!0,fe(),ea(q),V();let T=await ka();T?(T.focus(),document.execCommand("insertHTML",!1,q),Ea(T),ne(e("toastInserted")),y.playSuccess(),navigator.vibrate&&navigator.vibrate(10)):(y.playError(),ne(e("insertFailed"),{error:!0}),V()),Z=!1,fe()}z.addEventListener("click",()=>{y.playClick(),he(),ce()}),G.addEventListener("click",K),R.addEventListener("click",se);function V(){let q=!ht(t);dt(q,t,Sm),q?(Qe(),ce()):Je()}return he(),je(w),document.body.appendChild(t),V}function Tm(){if(document.getElementById("cw-precall-styles"))return;let e=mt("style");e.id="cw-precall-styles",e.textContent=`
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
    `,document.head.appendChild(e)}var ic={_templates:null,_hydrated:!1,async getTemplates(){return this._templates?this._templates:(this._hydrated||(this._hydrated=!0,await _l()),this._templates=Mn,this._templates)}};var rc={pt:"Sem t\xEDtulo",es:"Sin t\xEDtulo",en:"Untitled"},sc={pt:"Erro: Usu\xE1rio n\xE3o identificado.",es:"Error: usuario no identificado.",en:"Error: user not identified."},lc="cw_personal_library_v1",fo=!1,It={getSnippets:(e="all")=>{let t=It._loadFromLocal(),a=it();return a&&a.includes("@")&&!fo&&It._syncWithServer(a),e==="all"?t:t.filter(o=>o.type===e)},save:async e=>{let t=it();if(!t)return y.playError(),ne(sc[ge()]||sc.pt,{error:!0}),!1;fo=!0;let a=It._loadFromLocal(),o=new Date().toISOString(),n={id:e.id||"local_"+Date.now(),type:e.type||"general",title:e.title||rc[ge()]||rc.pt,content:e.content||"",subject:e.subject||"",isCode:e.isCode||!1,isRich:e.isRich||!1,updated:o,_pendingSync:!0},i=a.filter(l=>l.id!==n.id);i.unshift(n),It._saveToLocal(i);let r=!1;try{r=await Te.saveSnippet(n,t),r?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais.")}catch(l){console.error("Erro na nuvem:",l)}finally{setTimeout(()=>{fo=!1},2e3)}n._pendingSync=!r;let s=It._loadFromLocal().filter(l=>l.id!==n.id);return s.unshift(n),It._saveToLocal(s),{...n,synced:r}},delete:async e=>{let t=it();fo=!0;let o=It._loadFromLocal().filter(n=>n.id!==e);return It._saveToLocal(o),t?Te.deleteSnippet(e,t).then(()=>{setTimeout(()=>{fo=!1},2e3)}):fo=!1,!0},_syncWithServer:async e=>{if(window._cw_library_syncing)return;window._cw_library_syncing=!0,setTimeout(()=>{window._cw_library_syncing=!1},3e4),console.log("\u{1F504} Sincronizando biblioteca...");let t=await Te.getUserSnippets(e);if(t&&t.status==="success"&&Array.isArray(t.snippets)){let a=t.snippets,o=It._loadFromLocal(),i=[...o.filter(l=>l._pendingSync),...a],r=JSON.stringify(i),s=JSON.stringify(o);r!==s&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),It._saveToLocal(i))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(lc)||"[]")}catch{return[]}},_saveToLocal:e=>{localStorage.setItem(lc,JSON.stringify(e))}};var cc={pt:{headerTitle:"Email Assistant",headerDesc:"Refatora\xE7\xE3o completa do m\xF3dulo de e-mail para uma experi\xEAncia moderna e eficiente.",searchPlaceholder:"Buscar templates...",previewTitle:"Preview do E-mail",noSubject:"Sem Assunto",emailCopiedToast:"E-mail copiado com sucesso!",copyErrorToast:"Erro ao copiar e-mail",fillErrorToast:"Erro ao preencher e-mail",smartCrErrorToast:"Erro ao aplicar Smart CR",personalCategory:"Pessoal",copyHtml:"Copiar HTML",fillInCrm:"Preencher no CRM",loading:"Carregando...",noResults:"Nenhum resultado para",emptyTitle:"Pronto para come\xE7ar?",emptyHint:"Selecione um template \xE0 esquerda para<br>gerar o seu e-mail t\xE9cnico.",smartCrPreview:"Este atalho ir\xE1 preencher automaticamente os destinat\xE1rios e abrir o menu de Canned Responses do CRM.",smartCrHint:"Este \xE9 um <b>Smart CR</b>. Clique no bot\xE3o laranja acima para aplicar o atalho diretamente no CRM."},es:{headerTitle:"Email Assistant",headerDesc:"Refactorizaci\xF3n completa del m\xF3dulo de email para una experiencia moderna y eficiente.",searchPlaceholder:"Buscar plantillas...",previewTitle:"Vista Previa del Email",noSubject:"Sin Asunto",emailCopiedToast:"\xA1Email copiado con \xE9xito!",copyErrorToast:"Error al copiar el email",fillErrorToast:"Error al completar el email",smartCrErrorToast:"Error al aplicar Smart CR",personalCategory:"Personal",copyHtml:"Copiar HTML",fillInCrm:"Rellenar en el CRM",loading:"Cargando...",noResults:"Sin resultados para",emptyTitle:"\xBFListo para empezar?",emptyHint:"Seleccione una plantilla a la izquierda para<br>generar su email t\xE9cnico.",smartCrPreview:"Este atajo rellenar\xE1 autom\xE1ticamente los destinatarios y abrir\xE1 el men\xFA de Canned Responses del CRM.",smartCrHint:"Este es un <b>Smart CR</b>. Haga clic en el bot\xF3n naranja de arriba para aplicar el atajo directamente en el CRM."},en:{headerTitle:"Email Assistant",headerDesc:"A complete rebuild of the email module for a modern, efficient experience.",searchPlaceholder:"Search templates...",previewTitle:"Email Preview",noSubject:"No Subject",emailCopiedToast:"Email copied successfully!",copyErrorToast:"Error copying the email",fillErrorToast:"Error filling in the email",smartCrErrorToast:"Error applying Smart CR",personalCategory:"Personal",copyHtml:"Copy HTML",fillInCrm:"Fill in CRM",loading:"Loading...",noResults:"No results for",emptyTitle:"Ready to start?",emptyHint:"Select a template on the left to<br>generate your technical email.",smartCrPreview:"This shortcut will automatically fill in the recipients and open the CRM's Canned Responses menu.",smartCrHint:"This is a <b>Smart CR</b>. Click the orange button above to apply the shortcut directly in the CRM."}};function at(e){let t=ge();return cc[t]?.[e]??cc.pt[e]}var Ki="\u{1F464} Pessoal";function Im(e){return e===Ki?`\u{1F464} ${at("personalCategory")}`:e}var Ue={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",warning:"#E67E22",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"};function Nm(){if(document.getElementById("cw-email-styles"))return;let e=document.createElement("style");e.id="cw-email-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function Lm(e,t){return e.map(a=>Ll(a,Tt())).filter(a=>a.name.toLowerCase().includes(t.toLowerCase())||a.category.toLowerCase().includes(t.toLowerCase()))}function _m(e){return Object.entries(ra).filter(([t,a])=>a&&(t.toLowerCase().includes(e.toLowerCase())||a.toLowerCase().includes(e.toLowerCase()))).map(([t,a])=>({id:t,name:t.replace(/_/g," "),category:"\u26A1 Smart CRs",code:a,isSmartCR:!0}))}function Dm(e){return It.getSnippets("email").filter(t=>t.title.toLowerCase().includes(e.toLowerCase())||t.subject&&t.subject.toLowerCase().includes(e.toLowerCase())).map(t=>{let a=[],o=t.content.match(/\[([^\]]+)\]/g);return o&&[...new Set(o)].forEach(n=>{a.push({key:n,label:n.replace("[","").replace("]",""),type:n.toLowerCase().includes("data")?"date":"text",auto:n.toLowerCase().includes("nome")&&n.toLowerCase().includes("seu")?"agentName":null})}),{id:t.id||`snippet-${Math.random()}`,name:t.title,category:Ki,subject:t.subject||at("noSubject"),template:t.content,placeholders:a}})}function Mm(e,t){return[...Lm(e,t),..._m(t),...Dm(t)]}function dc(){let e="v6.0.0",t=!1,a=[],o=null,n="",i=new Set;Nm();let r=document.createElement("div");r.id="email-assistant-popup",r.classList.add("cw-module-window","cw-email-popup"),Object.assign(r.style,bt,{width:"850px",height:"650px"}),r.style.display="none",r.style.flexDirection="column";let s=rt(r,at("headerTitle"),e,at("headerDesc"),{popup:r},()=>S()),l=document.createElement("div");l.className="cw-email-main";let d=document.createElement("div");d.className="cw-email-left-panel";let c=document.createElement("div");c.className="cw-email-search-container";let g=document.createElement("input");g.className="cw-email-search-input",g.placeholder=at("searchPlaceholder");let u=document.createElement("div");u.id="email-template-list",hn(u,".cw-email-cat-header, .cw-email-list-item");let b=document.createElement("div");b.className="cw-email-clear-btn",b.innerHTML="\u2715",b.onclick=()=>{g.value="",n="",b.style.display="none",Z(),g.focus()},c.appendChild(g),c.appendChild(b),d.appendChild(c),d.appendChild(u);let L=document.createElement("div");L.className="cw-email-right-panel";let A=document.createElement("div");A.className="cw-email-fields-section";let C=document.createElement("div");C.className="cw-email-preview-section";let z=document.createElement("div");z.className="cw-email-preview-header";let G=document.createElement("span");G.textContent=at("previewTitle"),G.className="cw-email-preview-title";let R=document.createElement("div");R.className="cw-email-preview-actions";let O=(le,xe=!1)=>{let E=document.createElement("button");return E.textContent=le,E.className="cw-email-btn"+(xe?" primary":""),E},de=O(at("copyHtml")),te=O(at("fillInCrm"),!0),re=O("Smart CR");re.classList.add("warning"),R.appendChild(re),R.appendChild(de),R.appendChild(te),z.appendChild(G),z.appendChild(R);let ee=document.createElement("div");ee.contentEditable="true",ee.className="cw-email-preview-content",C.appendChild(z),C.appendChild(ee),ce(),L.appendChild(A),L.appendChild(C),l.appendChild(d),l.appendChild(L),r.appendChild(s),r.appendChild(l);let w=document.createElement("div");Object.assign(w.style,Yt),r.appendChild(w),Xt(r,w),document.body.appendChild(r);function S(){t=!ht(r),t?(Qe(),r.style.display="flex",qs(r),a.length===0&&D()):(Je(),r.style.display="none"),dt(t,r,"cw-btn-email")}async function D(){u.innerHTML='<div style="padding: 20px; text-align: center; color: #5f6368;">'+at("loading")+"</div>",a=await ic.getTemplates(),Z()}function j(le,xe,E){let K=document.createElement("div");K.className="cw-email-cat-header",K.tabIndex=0,K.setAttribute("role","button"),K.setAttribute("aria-expanded",String(E));let se=document.createElement("span");se.textContent=Im(le),K.appendChild(se);let V=document.createElement("span");V.className="cw-email-cat-badge",V.textContent=xe;let q=document.createElement("span");q.className="cw-email-cat-arrow",q.textContent=E?"\u25BE":"\u25B8";let T=document.createElement("div");return T.className="cw-email-cat-right",T.appendChild(V),T.appendChild(q),K.appendChild(T),K.onclick=()=>{i.has(le)?i.delete(le):i.add(le),Z()},K.addEventListener("keydown",H=>{(H.key==="Enter"||H.key===" ")&&(H.preventDefault(),K.click())}),K}function F(le){let xe=o&&o.id===le.id,E=document.createElement("div");if(E.className="cw-email-list-item"+(xe?" selected":""),E.tabIndex=0,E.setAttribute("role","button"),E.setAttribute("aria-pressed",String(!!xe)),xe){let V=document.createElement("div");V.className="cw-email-list-indicator",E.appendChild(V)}let K=document.createElement("span");K.className="cw-email-list-icon",K.innerHTML=le.isSmartCR?"\u26A1":le.category===Ki?"\u{1F464}":"\u{1F4C4}",E.appendChild(K);let se=document.createElement("span");return se.className="cw-email-list-text",se.textContent=le.name,E.appendChild(se),E.onclick=()=>he(le),E.addEventListener("keydown",V=>{(V.key==="Enter"||V.key===" ")&&(V.preventDefault(),E.click())}),E}function Z(){u.innerHTML="";let le=Mm(a,n);if(le.length===0){u.innerHTML=`
                <div class="cw-email-list-empty">
                    <div class="cw-email-list-empty-icon">\u{1F50D}</div>
                    <div class="cw-email-list-empty-text">${at("noResults")} "${n}"</div>
                </div>`;return}[...new Set(le.map(E=>E.category))].sort((E,K)=>E.localeCompare(K)).forEach(E=>{let K=i.has(E)||n.length>0,se=le.filter(V=>V.category===E);u.appendChild(j(E,se.length,K)),K&&se.forEach(V=>{u.appendChild(F(V))})})}let fe=null;async function he(le){o?.id!==le.id&&(o=le,fe&&clearTimeout(fe),L.style.opacity="0",L.style.transform="translateY(5px)",fe=setTimeout(()=>{re.style.display=le.isSmartCR?"block":"none",te.style.display=le.isSmartCR?"none":"block",de.style.display=le.isSmartCR?"none":"block",Z(),ue(),ce(),L.style.opacity="1",L.style.transform="translateY(0)",fe=null},150))}function ue(){if(A.innerHTML="",!o||o.isSmartCR){o?.isSmartCR?(A.style.display="block",A.innerHTML=`<div class="cw-email-smartcr-hint">
                    <span class="cw-email-smartcr-hint-icon">\u{1F4A1}</span>
                    <span>${at("smartCrHint")}</span>
                </div>`):A.style.display="none";return}let le=o.placeholders&&o.placeholders.length>0;if(A.style.display=le?"block":"none",!le)return;let xe=document.createElement("div");xe.className="cw-email-fields-grid",(o.placeholders||[]).forEach(E=>{let K=document.createElement("div"),se=document.createElement("label");se.className="cw-email-field-label",se.textContent=E.label;let V=document.createElement("input");V.className="cw-email-field-input",V.type=E.type||"text",V.dataset.key=E.key,E.auto==="agentName"&&(V.value=Ro().split(" ")[0]),V.addEventListener("input",ce),K.appendChild(se),K.appendChild(V),xe.appendChild(K)}),A.appendChild(xe)}function ce(){if(!o){ee.innerHTML=`
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
                </div>`;return}if(o.isSmartCR){ee.innerHTML=`<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">\u26A1</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${o.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">${at("smartCrPreview")}</div></div>`;return}let le=o.template;(A.querySelectorAll("input")||[]).forEach(E=>{let K=E.dataset.key,se=E.value;if(E.type==="date"&&se){let[q,T,H]=se.split("-");se=`${T}/${H}/${q}`}se=se||`<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${K}</span>`;let V=K.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");le=le.replace(new RegExp(V,"g"),se)}),ee.innerHTML=le}return g.addEventListener("input",le=>{n=le.target.value,b.style.display=n?"block":"none",Z()}),de.onclick=()=>{let le=ee.innerHTML,xe=new Blob([le],{type:"text/html"}),E=ee.innerText,K=[new ClipboardItem({"text/html":xe,"text/plain":new Blob([E],{type:"text/plain"})})];navigator.clipboard.write(K).then(()=>ne(at("emailCopiedToast")),()=>{y.playError(),ne(at("copyErrorToast"),{error:!0})})},te.onclick=async()=>{if(!o)return;let le=Ba(),xe={...o,body:ee.innerHTML};try{await Ol(xe),S()}catch{y.playError(),ne(at("fillErrorToast"),{error:!0})}finally{le()}},re.onclick=async()=>{if(!o||!o.isSmartCR)return;let le=Ba();try{await go(o.code),S()}catch{y.playError(),ne(at("smartCrErrorToast"),{error:!0})}finally{le()}},je(()=>{let le=r.querySelector(".cw-help-title");le&&(le.textContent=at("headerTitle"));let xe=r.querySelector(".cw-help-description");xe&&(xe.textContent=at("headerDesc")),g.placeholder=at("searchPlaceholder"),G.textContent=at("previewTitle"),de.textContent=at("copyHtml"),te.textContent=at("fillInCrm"),a.length&&Z(),(!o||o.isSmartCR)&&(ue(),ce())}),S}var pc=["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],uc=["Offer implementation via Tag Support (Temporary Access)","Send and walk through acceptance of the 'Consent and authorization...' email","Confirm the access was received","Start the setup (warn about ~10min of silence)","[If declined] Continue with Screen Sharing"],Om={inicio:{PT:"Abertura",ES:"Apertura",EN:"Opening"},meio:{PT:"Implementa\xE7\xE3o (Tag Support)",ES:"Implementaci\xF3n",EN:"Implementation (Tag Support)"},fim:{PT:"Fechamento",ES:"Cierre",EN:"Closing"}};function gc(e,t){let a=Om[e];return a?.[t]||a?.PT||""}var bo={"PT BAU":{inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:pc,fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:pc,fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{inicio:["Introducci\xF3n (Nombre y Equipo).","La llamada puede ser grabada con fines de entrenamiento y calidad de acuerdo con nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xF3n.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar contenido sensible antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos pasos (\xBFCu\xE1nto tiempo seguir\xE1 el caso?)","Encuesta de Satisfacci\xF3n.","Estar\xE9 monitoreando su caso durante XX d\xEDas para asegurarme de que todo est\xE9 funcionando correctamente. Durante este tiempo, nuestro equipo de calidad podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la cuenta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condiciones.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las herramientas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfacci\xF3n.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes d\xEDas."]},"EN BAU":{inicio:["Introduction (Name and Team)","Recording notice and Privacy Policy","Confirm the CID and the email","(Optional) Validate the account authentication via link","Confirm the Task and the AM","State the call duration (30-45 min)","Ask them to close sensitive content (before sharing)","Validate the backup and admin access"],meio:uc,fim:["Call summary (what was done and how it works)","Offer further help / Open the floor for questions","Ask them to stop sharing their screen","Next steps (Follow-up for XX days)","Ask for consent for the QA test","Align on scope (Technical vs. Account Manager)","Satisfaction Survey (and confirm the email to send it to)","Sign-off"]},"EN LT":{inicio:["Hello [...], I am [...], and I am part of the Google Technical Solutions Team. How are you?","Our call may be recorded for training, quality and service improvement purposes, in line with our Privacy Policy.","For security reasons, I need you to give me your email and the CID (or number) of the Ads account, please","Confirm the Task and the AM","The consultation lasts around 30 to 45 minutes.","Please share your screen using the \u201CFull Screen\u201D option","Please close any and all confidential and sensitive content (conversations, important personal data, etc).","Do you have a backup of your site and all the access to the Google tools?"],meio:uc,fim:["Call summary (what was done and how it works)","Offer further help / Open the floor for questions","Ask them to stop sharing their screen","Next steps (Follow-up for XX days)","During that time, our quality team may run a conversion test to validate the implementation. Do you agree to that test so we can confirm the implementation is effective?","Align on scope (Technical vs. Account Manager)","Satisfaction Survey (and confirm the email to send it to)","Sign-off"]}},qm=["inicio","meio","fim"];function mc(e){if(!Array.isArray(e)||!e.length)return!1;let t={},a=e.slice().sort((o,n)=>(o.sortOrder||0)-(n.sortOrder||0));for(let o of a){let n=(o.lang||"").toUpperCase(),i=o.key||"",r=o.field||"",s=o.value||"";if(!n||!i||!qm.includes(r)||!s)continue;let l=`${n} ${i}`;t[l]||(t[l]={}),(t[l][r]=t[l][r]||[]).push(s)}if(!Object.keys(t).length)return!1;for(let o of Object.keys(bo))delete bo[o];return Object.assign(bo,t),!0}async function fc(e){let t=Te.getCachedContent("call_script");mc(t)&&e?.();try{let a=await Te.fetchContentModule("call_script");mc(a)&&e?.()}catch(a){console.warn("Central de Conte\xFAdo indispon\xEDvel; usando roteiro embutido.",a)}}var $n={pt:{headerTitle:"Call Script",headerDesc:"Guia interativo para condu\xE7\xE3o de chamadas.",loading:"Carregando...",unknownClient:"Cliente Desconhecido",notFound:"N\xE3o encontrado",activeMonitoring:"Monitoramento Ativo",cidLabel:"CID (Conta)",emailLabel:"Email de Contato",copied:"Copiado!",amMessageTitle:"Mensagem AM",amMessageSub:"Gerar aviso de insucesso",copyFinalMessage:"Copiar Mensagem Final",resize:"Redimensionar",resetScript:"Resetar Script",resetConfirm:"Resetar todo o progresso do script? Essa a\xE7\xE3o n\xE3o pode ser desfeita.",resetConfirmBtn:"Resetar",scriptNotConfigured:"Script n\xE3o configurado.",messageCopiedToast:"Mensagem copiada!",amMessage:(e,t)=>`Ol\xE1. Bom dia!

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
Email: ${e.clientEmail||"---"}`,dateLocale:"en-US"}};function bc(){return{es:"ES",en:"EN"}[Tt()]||"PT"}function Ve(e){let t=ge();return $n[t]?.[e]??$n.pt[e]}function hc(e){let t=Tt();return $n[t]?.[e]??$n.pt[e]}var qe={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",danger:"#D93025",dangerBg:"#FCE8E6",success:"#34A853",successBg:"#E6F4EA"};function Rm(){if(document.getElementById("csa-styles-v2"))return;let e=document.createElement("style");e.id="csa-styles-v2",e.textContent=`
        #call-script-popup { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

        /* --- BANNER DE CONTEXTO --- */
        .csa-context-banner {
            padding: 20px 20px 16px 20px;
            background: ${qe.bgSurface};
            border-bottom: 1px solid #F1F3F4;
            display: flex; flex-direction: column; gap: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
            position: relative; z-index: 5;
        }
        .csa-ctx-top { display: flex; justify-content: space-between; align-items: center; }
        .csa-ctx-name-wrap { display: flex; align-items: center; gap: 10px; }
        .csa-ctx-name { font-size: 16px; font-weight: 500; color: ${qe.textPrimary}; }
        .csa-live-badge {
            font-size: 10px; font-weight: 700; color: ${qe.primary}; background: ${qe.primaryBg};
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
        .csa-data-pill:hover { background: ${qe.bgSurface}; border-color: #DADCE0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transform: translateY(-1px); }
        .csa-data-pill:active { transform: scale(0.98); }
        .csa-data-pill.copied { background: ${qe.successBg} !important; border-color: ${qe.success} !important; }
        .csa-pill-label { font-size: 9px; font-weight: 700; color: ${qe.textSecondary}; text-transform: uppercase; margin-bottom: 2px; letter-spacing: 0.5px; }
        .csa-data-value { font-size: 13px; color: ${qe.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .csa-data-value.mono { font-family: 'SF Mono', 'Roboto Mono', monospace; font-weight: 500; color: ${qe.primary}; }
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
            width: 100%; background: ${qe.bgSurface}; border: 1px solid #DADCE0; border-radius: 10px; padding: 10px;
            display: flex; align-items: center; gap: 12px; cursor: pointer; box-sizing: border-box;
            transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.02);
        }
        .csa-am-btn:hover { border-color: ${qe.primary}; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .csa-am-icon { background: ${qe.primaryBg}; border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .csa-am-btn-text { text-align: left; }
        .csa-am-btn-title { font-size: 11px; font-weight: 700; color: #3C4043; }
        .csa-am-btn-sub { font-size: 10px; color: ${qe.textSecondary}; }

        .csa-am-review-container { display: none; max-height: 0; opacity: 0; overflow: hidden; margin-top: 0; transition: all 0.3s ease; }
        .csa-am-review-container.visible { display: block; max-height: 300px; opacity: 1; margin-top: 12px; }
        .csa-am-message-area {
            width: 100%; height: 120px; border: 1px solid #DADCE0; border-radius: 8px; padding: 10px;
            font-family: inherit; font-size: 13px; color: #3C4043; outline: none; resize: none;
            box-sizing: border-box; background: ${qe.bgSurface}; line-height: 1.4;
        }
        .csa-am-copy-final {
            width: 100%; margin-top: 8px; padding: 10px; background: ${qe.primary}; color: white; border: none;
            border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; transition: background 0.2s;
        }
        .csa-am-copy-final.copied-flash { background: ${qe.success}; }

        /* --- BARRA DE PROGRESSO --- */
        .csa-progress-container { height: 6px; background: ${qe.borderSubtle}; width: 100%; position: relative; overflow: hidden; }
        .csa-progress-fill {
            height: 100%; width: 0%; border-radius: 0 3px 3px 0;
            transition: width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
            background: linear-gradient(90deg, ${qe.primary}, #00C6FF, ${qe.primary});
            background-size: 200% 100%;
            animation: csaShimmer 2s infinite linear;
        }
        .csa-progress-fill.complete { background: ${qe.success}; animation: none; }
        @keyframes csaShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

        /* --- SEGMENTED CONTROL (Tipo / Idioma) --- */
        .csa-content-area { padding: 16px; overflow-y: auto; flex-grow: 1; background: ${qe.bgApp}; scroll-behavior: smooth; }
        .csa-controls { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .csa-segmented-control { display: flex; background: #E3E3E8; padding: 2px; border-radius: 10px; gap: 2px; position: relative; margin-bottom: 16px; }
        .csa-segmented-control button {
            flex: 1; border: none; background: transparent; padding: 8px 4px; font-size: 12px; font-weight: 600;
            border-radius: 8px; cursor: pointer; transition: color 0.3s ease; color: ${qe.textSecondary};
            position: relative; z-index: 2;
        }
        .csa-segmented-control button.active { color: ${qe.textPrimary}; }
        .csa-segmented-indicator {
            position: absolute; top: 2px; left: 2px; bottom: 2px; background: ${qe.bgSurface};
            border-radius: 8px; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1; box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        /* --- CARDS DO CHECKLIST --- */
        .csa-card { background: ${qe.bgSurface}; border: 1px solid ${qe.borderSubtle}; border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02); }
        .csa-card.done { box-shadow: inset 4px 0 0 ${qe.success}, 0 1px 3px rgba(0,0,0,0.05); }
        .csa-card-title { font-size: 11px; font-weight: 700; color: ${qe.textSecondary}; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; user-select: none; }
        .csa-card-counter { font-size: 11px; opacity: 0.7; font-weight: 500; background: #f1f3f4; padding: 2px 8px; border-radius: 10px; }
        .csa-card-counter.done { opacity: 1; color: #1e8e3e; background: ${qe.successBg}; }

        .csa-item-row { display: flex; align-items: flex-start; padding: 10px 8px; cursor: pointer; border-radius: 10px; transition: background 0.2s ease; color: ${qe.textPrimary}; font-size: 14px; line-height: 1.5; margin-bottom: 2px; }
        .csa-item-row:not(.completed):hover { background: rgba(0, 0, 0, 0.03); }
        .csa-item-row:not(.completed):hover .csa-checkbox { border-color: ${qe.primary}; }
        .csa-item-row.completed { background: rgba(0, 0, 0, 0.02); }

        .csa-checkbox {
            min-width: 20px; height: 20px; border-radius: 50%; border: 2px solid ${qe.borderSubtle};
            margin-right: 12px; margin-top: 1px; display: flex; align-items: center; justify-content: center;
            transition: border-color 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.15s ease;
            background: #fff;
        }
        .csa-checkbox.checked { background: ${qe.primary}; border-color: ${qe.primary}; }
        .csa-checkbox.pulse { transform: scale(1.15); }

        .csa-item-text { position: relative; display: inline-block; flex: 1; transition: color 0.3s ease; }
        .csa-item-text.completed { color: ${qe.textSecondary}; }
        .csa-item-text::after { content: ''; position: absolute; left: 0; top: 50%; width: 0; height: 1.5px; background: ${qe.textSecondary}; transition: width 0.3s ease; }
        .csa-item-text.completed::after { width: 100%; }

        .csa-empty-state { padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .csa-empty-state-icon { font-size: 24px; }

        /* --- FOOTER --- */
        .csa-footer { padding: 12px 16px; border-top: 1px solid #F1F3F4; background: ${qe.bgSurface}; display: flex; justify-content: space-between; align-items: center; }
        .csa-credit { font-size: 10px; color: #bdc1c6; }
        .csa-reset-btn {
            background: transparent; border: none; color: ${qe.danger}; font-size: 12px; font-weight: 600;
            cursor: pointer; padding: 6px 12px; border-radius: 20px; transition: background 0.2s ease, transform 0.15s ease;
            display: flex; align-items: center; gap: 4px;
        }
        .csa-reset-btn:hover { background: ${qe.dangerBg}; }
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
    `,document.head.appendChild(e)}function vc(){let e="v3.1.0";Rm();let t={},a=bc(),o="BAU",n=!1,i=document.createElement("div");i.id="call-script-popup",i.classList.add("cw-module-window"),Object.assign(i.style,bt,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let r={popup:i,googleLine:null},s=null;function l(){n&&Ut().then(V=>{let q=i.querySelector("#cw-ctx-name"),T=i.querySelector("#cw-ctx-cid"),H=i.querySelector("#cw-ctx-email");if(q&&(q.textContent=V.advertiserName||Ve("unknownClient")),T){let ie=V.cid||"---";T.textContent!==ie&&(T.textContent=ie)}if(H){let ie=V.clientEmail||Ve("notFound");H.textContent!==ie&&(H.textContent=ie,H.title=ie)}})}function d(){Ut().then(V=>{let q=new Date().toLocaleDateString(hc("dateLocale")),T=i.querySelector("#cw-am-message-area"),H=i.querySelector("#cw-am-review-container"),ie=hc("amMessage")(V,q);T&&(T.value=ie),H&&(H.classList.add("visible"),H.scrollIntoView({behavior:"smooth",block:"end"}))})}function c(){n=!ht(i),dt(n,i,"cw-btn-script"),n?(Qe(),l(),s||(s=setInterval(l,2e3))):(Je(),s&&(clearInterval(s),s=null))}let g=rt(i,Ve("headerTitle"),e,Ve("headerDesc"),r,()=>{c()});i.appendChild(g);let u=g.querySelector("span"),b=document.createElement("div");b.className="csa-context-banner",b.innerHTML=`
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
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${qe.primary}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
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
  `;let L=b.querySelector("#csa-toggle-options"),A=b.querySelector("#csa-options-content"),C=b.querySelector("#csa-options-arrow"),z=!1;L.onclick=()=>{z=!z,C.classList.toggle("expanded",z),A.classList.toggle("expanded",z),y.playClick()};let G=b.querySelector("#cw-pill-message"),R=b.querySelector("#cw-am-copy-final"),O=b.querySelector("#cw-am-message-area");G.addEventListener("click",()=>{d()}),R.addEventListener("click",()=>{O.value&&(navigator.clipboard.writeText(O.value),ne(Ve("messageCopiedToast")),y.playSuccess(),R.classList.add("copied-flash"),R.textContent=Ve("copied"),setTimeout(()=>{R.classList.remove("copied-flash"),R.textContent=Ve("copyFinalMessage")},2e3))});let de=(V,q)=>{let T=b.querySelector(V),H=b.querySelector(q);T.onclick=()=>{let ie=H.textContent;!ie||ie.includes("---")||ie===Ve("notFound")||(navigator.clipboard.writeText(ie),y.playSuccess(),T.classList.add("copied"),setTimeout(()=>T.classList.remove("copied"),1500))}};i.appendChild(b);let te=document.createElement("div");te.className="csa-progress-container";let re=document.createElement("div");re.className="csa-progress-fill",te.appendChild(re),i.appendChild(te);let ee=document.createElement("div");ee.id="csa-content",ee.className="csa-content-area",i.appendChild(ee);let w=document.createElement("div");w.className="csa-footer";let S=document.createElement("span");S.className="csa-credit",S.textContent=`by ${Wt}`;let D=document.createElement("button");D.className="csa-reset-btn",D.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> <span class="js-csa-reset-label">${Ve("resetScript")}</span>`,D.onclick=async()=>{if(await ot(Ve("resetConfirm"),{danger:!0,confirmText:Ve("resetConfirmBtn")})){for(let q in t)delete t[q];E()}},w.appendChild(S),w.appendChild(D),i.appendChild(w);let j=document.createElement("div");j.className="csa-controls";let F=document.createElement("div");F.className="csa-segmented-control",F.innerHTML=`
      <div class="csa-segmented-indicator" id="type-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-type="BAU">BAU</button>
      <button data-type="LT">LT</button>
  `,j.appendChild(F),ee.appendChild(j);let Z=F.querySelectorAll("button"),fe=F.querySelector("#type-indicator");Z.forEach((V,q)=>{V.onclick=()=>{Z.forEach(T=>T.classList.remove("active")),V.classList.add("active"),fe.style.transform=`translateX(${q*(F.offsetWidth/2-2)}px)`,o=V.dataset.type,y.playClick(),E()}}),wa(()=>{a=bc(),E()}),je(()=>{u&&(u.textContent=Ve("headerTitle"));let V=i.querySelector(".cw-help-title");V&&(V.textContent=Ve("headerTitle"));let q=i.querySelector(".cw-help-description");q&&(q.textContent=Ve("headerDesc"));let T=b.querySelector(".js-csa-monitoring");T&&(T.title=Ve("activeMonitoring"));let H=b.querySelector(".js-csa-cid-label");H&&(H.textContent=Ve("cidLabel"));let ie=b.querySelector(".js-csa-email-label");ie&&(ie.textContent=Ve("emailLabel")),b.querySelectorAll(".csa-copy-hint").forEach(v=>v.textContent=Ve("copied"));let P=b.querySelector(".js-csa-am-title");P&&(P.textContent=Ve("amMessageTitle"));let Q=b.querySelector(".js-csa-am-sub");Q&&(Q.textContent=Ve("amMessageSub")),R&&(R.textContent=Ve("copyFinalMessage"));let pe=D.querySelector(".js-csa-reset-label");pe&&(pe.textContent=Ve("resetScript")),ue.title=Ve("resize"),E()});let he=document.createElement("div");he.id="csa-checklist-area",ee.appendChild(he);let ue=document.createElement("div");Object.assign(ue.style,Yt),ue.className="no-drag",ue.title=Ve("resize"),i.appendChild(ue),Xt(i,ue),document.body.appendChild(i),de("#cw-pill-cid","#cw-ctx-cid"),de("#cw-pill-email","#cw-ctx-email");function ce(V){return V.replace(/\n/g,"<br>")}function le(V,q,T,H){let ie=`${V}-${q}-${H}`,P=!!t[ie],Q=document.createElement("div");Q.className="csa-item-row"+(P?" completed":"");let pe=document.createElement("div");pe.className="csa-checkbox"+(P?" checked":""),pe.innerHTML=P?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':"";let v=document.createElement("span");return v.className="csa-item-text"+(P?" completed":""),v.innerHTML=ce(T),Q.onclick=()=>{let h=!t[ie];t[ie]=h,y.playClick(),Q.classList.toggle("completed",h),v.classList.toggle("completed",h),pe.classList.toggle("checked",h),pe.innerHTML=h?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':"",h&&(pe.classList.add("pulse"),setTimeout(()=>pe.classList.remove("pulse"),150)),K(V,bo[V])},Q.appendChild(pe),Q.appendChild(v),{row:Q,isDone:P}}function xe(V,q,T){let H=document.createElement("div");H.className="csa-card";let ie=document.createElement("div");ie.className="csa-card-title",ie.textContent=gc(q,a);let P=document.createElement("span");P.className="csa-card-counter",ie.appendChild(P),H.appendChild(ie);let Q=0;T.forEach((v,h)=>{let{row:p,isDone:N}=le(V,q,v,h);N&&Q++,H.appendChild(p)});let pe=Q===T.length&&T.length>0;return H.classList.toggle("done",pe),P.classList.toggle("done",pe),P.textContent=`${Q}/${T.length}`,H}function E(){he.innerHTML="";let V=`${a} ${o}`,q=bo[V];if(!q){he.innerHTML=`<div class="csa-empty-state"><div class="csa-empty-state-icon">\u2615</div><div>${Ve("scriptNotConfigured")}</div></div>`,re.style.width="0%";return}let T=0,H=0;["inicio","meio","fim"].forEach(ie=>{q[ie]&&(T+=q[ie].length)}),["inicio","meio","fim"].forEach(ie=>{let P=q[ie];!P||P.length===0||(P.forEach((Q,pe)=>{let v=`${V}-${ie}-${pe}`;t[v]&&H++}),he.appendChild(xe(V,ie,P)))}),se(T,H)}function K(V,q){let T=0,H=0;["inicio","meio","fim"].forEach(ie=>{let P=q[ie]||[];T+=P.length,P.forEach((Q,pe)=>{t[`${V}-${ie}-${pe}`]&&H++})}),se(T,H),setTimeout(()=>E(),200)}function se(V,q){let T=V===0?0:q/V*100;re.style.width=`${T}%`,re.classList.toggle("complete",T===100)}return E(),fc(()=>E()),c}var Qi={cyan:{color:"#0097A7",bg:"#E0F7FA"},blue:{color:"#1967D2",bg:"#E8F0FE"},orange:{color:"#E37400",bg:"#FEF7E0"},green:{color:"#188038",bg:"#E6F4EA"},purple:{color:"#9334E6",bg:"#F3E8FD"},red:{color:"#C5221F",bg:"#FCE8E6"},slate:{color:"#5F6368",bg:"#F1F3F4"},amber:{color:"#F09D00",bg:"#FFF3E0"},sky:{color:"#0B57D0",bg:"#D3E3FD"},pink:{color:"#D01884",bg:"#FDE7F3"},teal:{color:"#00796B",bg:"#E0F2F1"},indigo:{color:"#3949AB",bg:"#E8EAF6"}},vt=e=>`<svg viewBox="0 0 24 24" fill="currentColor"><path d="${e}"/></svg>`,Ji={description:vt("M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"),assignment:vt("M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"),verified_user:vt("M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"),chat:vt("M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"),public:vt("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"),bar_chart:vt("M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"),shopping_cart:vt("M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"),code:vt("M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"),person:vt("M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"),folder:vt("M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"),bookmark:vt("M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"),star:vt("M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"),info:vt("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"),help:vt("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"),flag:vt("M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"),school:vt("M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"),build:vt("M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"),lightbulb:vt("M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"),event:vt("M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"),feedback:vt("M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z")},Zi={tasks:{color:"cyan",icon:"description",label:{pt:"Tarefas",es:"Tareas",en:"Tasks"}},ads:{color:"blue",icon:"public",label:{pt:"Ads",es:"Ads",en:"Ads"}},analytics:{color:"orange",icon:"bar_chart",label:{pt:"GA4",es:"GA4",en:"GA4"}},shopping:{color:"green",icon:"shopping_cart",label:{pt:"Shop",es:"Shop",en:"Shop"}},tech:{color:"purple",icon:"code",label:{pt:"Tech",es:"Tech",en:"Tech"}},hr:{color:"red",icon:"person",label:{pt:"RH",es:"RRHH",en:"HR"}},lm:{color:"slate",icon:"assignment",label:{pt:"Forms",es:"Forms",en:"Forms"}},qa:{color:"amber",icon:"verified_user",label:{pt:"QA",es:"QA",en:"QA"}},suporte:{color:"sky",icon:"chat",label:{pt:"Ajuda",es:"Ayuda",en:"Help"}},feedback:{color:"pink",icon:"feedback",label:{pt:"Feedback",es:"Feedback",en:"Feedback"}}},Qo={color:"slate",icon:"folder"},er=30,wc=10,Fm=3,zm=5;function tr(e){try{let t=JSON.parse(e||"{}");return t&&typeof t=="object"?t:{}}catch{return{}}}function la(e,t,a){if(!e)return"";let o=a==="es"||a==="en"?e[`${t}_${a}`]:"";return String(o||e[t]||"").trim()}function zt(e){return e.lineage||`u:${e.url}`}function ar(e){let t=tr(e.value);return{id:e.id||"",lineage:e.lineage||e.id||"",cat:String(e.key||""),name:String(t.name||""),url:String(t.url||""),desc:String(t.desc||""),desc_es:String(t.desc_es||""),desc_en:String(t.desc_en||""),about:String(t.about||""),about_es:String(t.about_es||""),about_en:String(t.about_en||""),when:String(t.when||""),when_es:String(t.when_es||""),when_en:String(t.when_en||"")}}function yc(e){let t={};return(e||[]).forEach(a=>{let o=String(a.key||"").trim();if(!o||Zi[o])return;let n=tr(a.value);n.label&&(t[o]={color:Qi[n.color]?n.color:Qo.color,icon:Ji[n.icon]?n.icon:Qo.icon,label:{pt:String(n.label),es:String(n.label_es||n.label),en:String(n.label_en||n.label)},custom:!0})}),t}function or(e,t){let a=Zi[e]||t&&t[e];return a||{...Qo,label:{pt:e,es:e,en:e},unknown:!0}}function Jo(e,t,a){let o=or(e,a);return o.label[t]||o.label.pt}function nr(e,t){let a=or(e,t);return Qi[a.color]||Qi[Qo.color]}function vo(e,t){let a=or(e,t);return Ji[a.icon]||Ji[Qo.icon]}function ir(e,t){let a=new Set(e.map(r=>r.cat)),o=Object.keys(Zi),n=Object.keys(t||{}),i=[...a].filter(r=>!o.includes(r)&&!n.includes(r));return[...o,...n,...i].filter(r=>a.has(r))}function Sc(e,t){let a=new Map;return ir(e,t).forEach(o=>a.set(o,[])),e.forEach(o=>a.get(o.cat).push(o)),a}function rr(e,t,a){let o=new Map(t.filter(c=>c.lineage).map(c=>[c.lineage,c])),n=[],i=[];(e||[]).forEach(c=>{let g=tr(c.value),u=o.get(String(g.linkLineage||""));if(!u)return;let b={id:c.id,link:u,linkId:zt(u),headline:la(g,"headline",a)||u.name,blurb:la(g,"blurb",a),position:g.position==="main"?"main":"secondary",startsAt:String(g.startsAt||""),endsAt:String(g.endsAt||"")};c.state==="active"?n.push(b):c.state==="ended"&&i.push(b)}),n.sort((c,g)=>(c.position==="main"?0:1)-(g.position==="main"?0:1)||g.startsAt.localeCompare(c.startsAt)||c.id.localeCompare(g.id));let r=n.slice(0,Fm),s=new Set(r.map(c=>c.linkId));i.sort((c,g)=>g.endsAt.localeCompare(c.endsAt));let l=new Set,d=i.filter(c=>s.has(c.linkId)||l.has(c.linkId)?!1:(l.add(c.linkId),!0)).slice(0,zm);return{active:r,ended:d}}function Cc(e,t,a=er){let o=Array.isArray(e)?e.filter(n=>typeof n=="string"):[];return o.includes(t)?{list:o.filter(n=>n!==t),added:!1,full:!1}:o.length>=a?{list:o,added:!1,full:!0}:{list:[t,...o],added:!0,full:!1}}function Ac(e,t,a,o=wc){let n=Array.isArray(e)?e.filter(i=>i&&typeof i.id=="string"):[];return[{id:t,t:a},...n.filter(i=>i.id!==t)].slice(0,o)}function Ec(e,t,a,o){if(typeof e!="string")return null;let n=e;return!t.has(e)&&e.startsWith("u:")&&a.has(e.slice(2))&&(n=zt(a.get(e.slice(2)))),!t.has(n)&&o?null:n}function kc(e){return{porId:new Map(e.map(t=>[zt(t),t])),porUrl:new Map(e.map(t=>[t.url,t]))}}function Tc(e,t,a){let{porId:o,porUrl:n}=kc(t),i=new Set,r=[];return(e||[]).forEach(s=>{let l=Ec(s,o,n,a);l===null||i.has(l)||(i.add(l),r.push(l))}),r}function Ic(e,t,a){let{porId:o,porUrl:n}=kc(t),i=new Set,r=[];return(Array.isArray(e)?e:[]).forEach(s=>{let l=s&&Ec(s.id,o,n,a);!l||i.has(l)||(i.add(l),r.push({id:l,t:s.t}))}),r}function Nc(e,t,a){let o=new Map(t.map(r=>[r.url,r])),n=new Set,i=[];return(Array.isArray(e)?e:[]).forEach((r,s)=>{let l=r&&o.get(r.url);!l||n.has(zt(l))||(n.add(zt(l)),i.push({id:zt(l),t:a-s*6e4}))}),i.slice(0,wc)}var Pm=new RegExp("[\u0300-\u036F]","g");function xc(e){return String(e??"").normalize("NFD").replace(Pm,"").toLowerCase()}function Lc(e,t,a,o){let n=xc(t).trim();return n?[e.name,la(e,"desc",a),la(e,"about",a),la(e,"when",a),Jo(e.cat,a,o)].some(r=>xc(r).includes(n)):!0}var ho={pt:"pt-BR",es:"es-ES",en:"en-US"};function _c(e){let t=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(String(e||""));return t?new Date(Number(t[1]),Number(t[2])-1,Number(t[3]),Number(t[4]),Number(t[5])):null}function Bn(e,t){let a=_c(e);return a?new Intl.DateTimeFormat(ho[t]||ho.pt,{day:"2-digit",month:"2-digit"}).format(a):""}function Dc(e,t){let a=_c(e);return a?new Intl.DateTimeFormat(ho[t]||ho.pt,{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).format(a):""}function Mc(e,t,a){let o=ho[a]||ho.pt,n=new Date(e),i=new Date(t),r=Math.round((new Date(i.getFullYear(),i.getMonth(),i.getDate())-new Date(n.getFullYear(),n.getMonth(),n.getDate()))/864e5);if(r<=0){let s=new Intl.DateTimeFormat(o,{hour:"2-digit",minute:"2-digit",hour12:!1}).format(n);return`${new Intl.RelativeTimeFormat(o,{numeric:"auto"}).format(0,"day")}, ${s}`}return r===1?new Intl.RelativeTimeFormat(o,{numeric:"auto"}).format(-1,"day"):new Intl.DateTimeFormat(o,{day:"2-digit",month:"2-digit"}).format(n)}var $m={"Ponto Eletr\xF4nico":"Control de Asistencia","Ferramenta de ajuda":"Herramienta de ayuda","Intranet Google":"Intranet Google","Relat\xF3rio Follow-ups":"Informe de Follow-ups","Dashboard WFM":"Dashboard WFM","Tech Solutions SAO":"Tech Solutions SAO","Form Grava\xE7\xE3o":"Form Grabaci\xF3n","Form Escala\xE7\xE3o":"Form Escalaci\xF3n","Instru\xE7\xF5es Split":"Instrucciones Split","Single Page App":"Single Page App","Procedimento Padr\xE3o":"Procedimiento Est\xE1ndar","Valida\xE7\xE3o C\xF3digo":"Validaci\xF3n C\xF3digo","Convers\xE3o Chamada":"Conversi\xF3n Llamada","Valida\xE7\xE3o WCC":"Validaci\xF3n WCC",ECW4:"ECW4","Monitoramento EC":"Monitoreo EC","Resolu\xE7\xE3o problemas":"Resoluci\xF3n de problemas","Implementa\xE7\xE3o RMKT":"Implementaci\xF3n RMKT","Pontua\xE7\xE3o Leads":"Puntuaci\xF3n de Leads","Instala\xE7\xE3o Container":"Instalaci\xF3n Container","Instala\xE7\xE3o Config.":"Instalaci\xF3n Config.","Valida\xE7\xE3o GA4":"Validaci\xF3n GA4","Guia Dev":"Gu\xEDa Dev","Resolu\xE7\xE3o Problemas":"Resoluci\xF3n de Problemas","Dom\xEDnio Cruzado":"Dominio Cruzado","Lista Oficial":"Lista Oficial","Criador URLs":"Creador de URLs","Setup Inicial":"Setup Inicial","Otimiza\xE7\xE3o Feed":"Optimizaci\xF3n Feed","Ferramenta Interna":"Herramienta Interna",Avalia\u00E7\u00F5es:"Rese\xF1as","Feeds Offline":"Feeds Offline","Help Center":"Help Center","Guias CMS":"Gu\xEDas CMS","Solu\xE7\xF5es Iframes":"Soluciones Iframes","Ghost Ads":"Ghost Ads","Ghost Analytics":"Ghost Analytics","Ghost GTM":"Ghost GTM",Ferramenta:"Herramienta","Ghost MC":"Ghost MC","Playground JS":"Playground JS","Testador Regex":"Probador Regex","Doc. CSP":"Doc. CSP","Guia CoMo":"Gu\xEDa CoMo","Debug CoMo":"Debug CoMo","Portal Colaborador":"Portal del Colaborador","Apps e Sistemas":"Apps y Sistemas","Folha Pagamento":"N\xF3mina","Reportar problemas":"Reportar problemas","Registro chamadas":"Registro de llamadas","Erros de sistema":"Errores de sistema","BAU/Descarte/Monitoria":"BAU/Descarte/Monitoreo","Feedback positivo":"Feedback positivo","Casos dif\xEDceis":"Casos dif\xEDciles","Chat/Email Ads":"Chat/Email Ads","Chat/Email Shopping":"Chat/Email Shopping","Perfil da Empresa":"Perfil de la Empresa","Console API":"Console API","Lista de n\xFAmeros":"Lista de n\xFAmeros",Cursos:"Cursos"},Bm={"Ponto Eletr\xF4nico":"Time Clock","Ferramenta de ajuda":"Help tool","Intranet Google":"Google Intranet","Relat\xF3rio Follow-ups":"Follow-ups report","Dashboard WFM":"WFM Dashboard","Tech Solutions SAO":"Tech Solutions SAO","Form Grava\xE7\xE3o":"Recording Form","Form Escala\xE7\xE3o":"Escalation Form","Instru\xE7\xF5es Split":"Split instructions","Single Page App":"Single Page App","Procedimento Padr\xE3o":"Standard Procedure","Valida\xE7\xE3o C\xF3digo":"Code validation","Convers\xE3o Chamada":"Call conversion","Valida\xE7\xE3o WCC":"WCC validation",ECW4:"ECW4","Monitoramento EC":"EC monitoring","Resolu\xE7\xE3o problemas":"Troubleshooting","Implementa\xE7\xE3o RMKT":"RMKT implementation","Pontua\xE7\xE3o Leads":"Lead scoring","Instala\xE7\xE3o Container":"Container installation","Instala\xE7\xE3o Config.":"Config. installation","Valida\xE7\xE3o GA4":"GA4 validation","Guia Dev":"Dev guide","Resolu\xE7\xE3o Problemas":"Troubleshooting","Dom\xEDnio Cruzado":"Cross-domain","Lista Oficial":"Official list","Criador URLs":"URL builder","Setup Inicial":"Initial setup","Otimiza\xE7\xE3o Feed":"Feed optimization","Ferramenta Interna":"Internal tool",Avalia\u00E7\u00F5es:"Reviews","Feeds Offline":"Offline feeds","Help Center":"Help Center","Guias CMS":"CMS guides","Solu\xE7\xF5es Iframes":"Iframe solutions","Ghost Ads":"Ghost Ads","Ghost Analytics":"Ghost Analytics","Ghost GTM":"Ghost GTM",Ferramenta:"Tool","Ghost MC":"Ghost MC","Playground JS":"JS Playground","Testador Regex":"Regex tester","Doc. CSP":"CSP docs","Guia CoMo":"CoMo guide","Debug CoMo":"CoMo debug","Portal Colaborador":"Employee Portal","Apps e Sistemas":"Apps and Systems","Folha Pagamento":"Payroll","Reportar problemas":"Report problems","Registro chamadas":"Call log","Erros de sistema":"System errors","BAU/Descarte/Monitoria":"BAU/Discard/Monitoring","Feedback positivo":"Positive feedback","Casos dif\xEDceis":"Difficult cases","Chat/Email Ads":"Chat/Email Ads","Chat/Email Shopping":"Chat/Email Shopping","Perfil da Empresa":"Business Profile","Console API":"API Console","Lista de n\xFAmeros":"Number list",Cursos:"Courses"},Oc={pt:{headerTitle:"Central de Links",headerDesc:"Navegue pelas categorias ou use a busca.",searchPlaceholder:"Buscar ferramenta ou SOP...",home:"In\xEDcio",featured:"Em destaque",tabFavorites:"Favoritos",tabRecent:"Recentes",tabEnded:"Sa\xEDram do destaque",until:e=>`at\xE9 ${e}`,endedOn:e=>`saiu em ${e}`,liveNow:"Em destaque agora",liveUntil:e=>`Em destaque at\xE9 ${e}`,open:"Abrir",openLink:"Abrir link",copyUrl:"Copiar URL",copied:"Copiado",favorite:"Favoritar",favorited:"Favorito",favoriteAdd:"Adicionar aos favoritos",favoriteRemove:"Remover dos favoritos",aboutLabel:"O que \xE9",whenLabel:"Quando usar",emptyFavTitle:"Nenhum favorito ainda",emptyFavSub:"Clique na estrela de um link para fix\xE1-lo aqui.",emptyRecentTitle:"Nada por aqui ainda",emptyRecentSub:"Os links que voc\xEA abrir aparecem aqui pra acesso r\xE1pido depois.",emptyEndedTitle:"Nenhum destaque encerrado",emptyEndedSub:"Os links que sa\xEDrem do destaque ficam aqui por 30 dias.",browseAll:"Ver todos os links",favoritesFull:e=>`Voc\xEA chegou a ${e} favoritos. Remova um para adicionar outro.`,resultsSummary:(e,t)=>`${e} ${e===1?"resultado":"resultados"} em ${t} ${t===1?"categoria":"categorias"}`,nothingFound:"Nada encontrado",noLinkMatches:e=>`Nenhum link bate com "${e}".`,linkCopiedToast:"Link copiado!",copyFailedToast:"N\xE3o foi poss\xEDvel copiar o link.",favAddedToast:"Adicionado aos favoritos",favRemovedToast:"Removido dos favoritos"},es:{headerTitle:"Central de Enlaces",headerDesc:"Navega por las categor\xEDas o usa la b\xFAsqueda.",searchPlaceholder:"Buscar herramienta o SOP...",home:"Inicio",featured:"Destacados",tabFavorites:"Favoritos",tabRecent:"Recientes",tabEnded:"Salieron de destacados",until:e=>`hasta ${e}`,endedOn:e=>`sali\xF3 el ${e}`,liveNow:"Destacado ahora",liveUntil:e=>`Destacado hasta ${e}`,open:"Abrir",openLink:"Abrir enlace",copyUrl:"Copiar URL",copied:"Copiado",favorite:"A\xF1adir a favoritos",favorited:"Favorito",favoriteAdd:"A\xF1adir a favoritos",favoriteRemove:"Quitar de favoritos",aboutLabel:"Qu\xE9 es",whenLabel:"Cu\xE1ndo usar",emptyFavTitle:"Todav\xEDa no hay favoritos",emptyFavSub:"Haz clic en la estrella de un enlace para fijarlo aqu\xED.",emptyRecentTitle:"Todav\xEDa no hay nada aqu\xED",emptyRecentSub:"Los enlaces que abras aparecen aqu\xED para acceso r\xE1pido despu\xE9s.",emptyEndedTitle:"Ning\xFAn destacado finalizado",emptyEndedSub:"Los enlaces que dejen de estar destacados quedan aqu\xED por 30 d\xEDas.",browseAll:"Ver todos los enlaces",favoritesFull:e=>`Llegaste a ${e} favoritos. Quita uno para a\xF1adir otro.`,resultsSummary:(e,t)=>`${e} ${e===1?"resultado":"resultados"} en ${t} ${t===1?"categor\xEDa":"categor\xEDas"}`,nothingFound:"No se encontr\xF3 nada",noLinkMatches:e=>`Ning\xFAn enlace coincide con "${e}".`,linkCopiedToast:"\xA1Enlace copiado!",copyFailedToast:"No se pudo copiar el enlace.",favAddedToast:"A\xF1adido a favoritos",favRemovedToast:"Quitado de favoritos"},en:{headerTitle:"Links Central",headerDesc:"Browse the categories or use the search.",searchPlaceholder:"Search for a tool or SOP...",home:"Home",featured:"Featured",tabFavorites:"Favorites",tabRecent:"Recent",tabEnded:"No longer featured",until:e=>`until ${e}`,endedOn:e=>`ended ${e}`,liveNow:"Featured now",liveUntil:e=>`Featured until ${e}`,open:"Open",openLink:"Open link",copyUrl:"Copy URL",copied:"Copied",favorite:"Favorite",favorited:"Favorited",favoriteAdd:"Add to favorites",favoriteRemove:"Remove from favorites",aboutLabel:"What it is",whenLabel:"When to use",emptyFavTitle:"No favorites yet",emptyFavSub:"Click the star on a link to pin it here.",emptyRecentTitle:"Nothing here yet",emptyRecentSub:"The links you open show up here for quick access later.",emptyEndedTitle:"No past highlights",emptyEndedSub:"Links that stop being featured stay here for 30 days.",browseAll:"Browse all links",favoritesFull:e=>`You reached ${e} favorites. Remove one to add another.`,resultsSummary:(e,t)=>`${e} ${e===1?"result":"results"} in ${t} ${t===1?"category":"categories"}`,nothingFound:"Nothing found",noLinkMatches:e=>`No link matches "${e}".`,linkCopiedToast:"Link copied!",copyFailedToast:"Could not copy the link.",favAddedToast:"Added to favorites",favRemovedToast:"Removed from favorites"}};function Pe(e){let t=ge();return Oc[t]?.[e]??Oc.pt[e]}var Gm={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]},feedback:{label:"Feedback",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"}]}},Be=lr(null,null,null);function jm(){let e=[];return Object.entries(Gm).forEach(([t,a])=>{a.links.forEach(o=>{e.push(ar({key:t,value:JSON.stringify({name:o.name,url:o.url,desc:o.desc||"",desc_es:$m[o.desc]||"",desc_en:Bm[o.desc]||""})}))})}),e}function lr(e,t,a){let o=(Array.isArray(e)?e:[]).map(ar).filter(l=>l.name&&l.url),n=o.length>0,i=n?o:jm(),r=yc(t),s=ge();return{links:i,custom:r,fromCentral:n,byId:new Map(i.map(l=>[zt(l),l])),highlights:rr(a,i,s),rawHighlights:a}}async function Hm(e){let t=o=>Te.getCachedContent(o),a=lr(t("links"),t("link_categories"),t("link_highlights"));a.fromCentral&&(Be=a,e?.());try{let[o,n,i]=await Promise.allSettled([Te.fetchContentModule("links"),Te.fetchContentModule("link_categories"),Te.fetchContentModule("link_highlights")]),r=l=>l.status==="fulfilled"?l.value:null,s=lr(r(o)??t("links"),r(n)??t("link_categories"),r(i)??t("link_highlights"));s.fromCentral&&(Be=s,e?.())}catch(o){console.warn("Central de Conte\xFAdo indispon\xEDvel; usando links embutidos.",o)}}var jt={home:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',starOutline:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>',open:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>',copy:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',check:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',search:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>'},Ke={textPrimary:"#202124",textSecondary:"#5F6368",blue:"#1A73E8",blueText:"#1967D2"};function Um(){if(document.getElementById("cw-links-styles"))return;let e=document.createElement("style");e.id="cw-links-styles",e.textContent=`
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
            cursor: pointer; color: ${Ke.textSecondary};
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
        .cw-links-search-wrap:focus-within { box-shadow: 0 4px 12px rgba(26,115,232,0.15); border-color: ${Ke.blue}; }
        .cw-links-search-icon { margin-left: 16px; display: flex; align-items: center; justify-content: center; pointer-events: none; }
        .cw-links-search-input {
            flex: 1; height: 100%; border: none; background: transparent;
            padding: 0 12px; font-size: 14px; color: ${Ke.textPrimary};
            outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
        }

        .cw-links-body { flex: 1; display: flex; min-height: 0; }
        .cw-links-scroll { flex: 1; min-width: 0; overflow-y: auto; padding: 8px 16px 32px 24px; scrollbar-width: thin; }

        .cw-links-label { margin: 8px 0; font-size: 12px; line-height: 16px; font-weight: 500; color: ${Ke.textSecondary}; }
        .cw-links-cathead { display: flex; align-items: center; gap: 8px; font-size: 12px; line-height: 16px; font-weight: 500; color: ${Ke.textSecondary}; margin: 16px 0 4px; padding-left: 12px; }
        .cw-links-cathead:first-child { margin-top: 0; }
        .cw-links-cat-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--cat-color); flex-shrink: 0; }

        /* --- ELEMENTOS COMUNS --- */
        .cw-links-ico { width: 32px; height: 32px; border-radius: 12px; background: var(--cat-bg); color: var(--cat-color); display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .cw-links-ico svg { width: 20px; height: 20px; }
        .cw-links-ico.lg { width: 40px; height: 40px; }
        .cw-links-ico.lg svg { width: 24px; height: 24px; }
        .cw-links-eyebrow { display: flex; align-items: center; gap: 8px; height: 20px; font-size: 12px; line-height: 16px; color: ${Ke.textSecondary}; }
        .cw-links-eyebrow svg { width: 16px; height: 16px; color: var(--cat-color); flex-shrink: 0; }
        .cw-links-eyebrow b { font-weight: 500; color: ${Ke.textPrimary}; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .cw-links-eyebrow .cw-links-eyebrow-end { margin-left: auto; white-space: nowrap; font-variant-numeric: tabular-nums; }

        /* --- DESTAQUES --- */
        .cw-links-hero {
            display: block; position: relative; border-radius: 20px; padding: 16px 20px;
            background: rgba(255,255,255,0.92); text-decoration: none; color: inherit; cursor: pointer;
            box-shadow: 0 8px 24px rgba(32,33,36,0.10), 0 1px 2px rgba(32,33,36,0.06);
            transition: transform 0.2s var(--cw-ease-elastic, cubic-bezier(.34,1.56,.64,1)), box-shadow 0.2s ease;
        }
        .cw-links-hero:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(32,33,36,0.14), 0 1px 2px rgba(32,33,36,0.06); }
        .cw-links-hero-title { margin: 8px 0 4px; font-size: 18px; line-height: 24px; font-weight: 500; color: ${Ke.textPrimary}; }
        .cw-links-hero-blurb { margin: 0; font-size: 13px; line-height: 20px; color: ${Ke.textSecondary}; }
        .cw-links-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; }
        .cw-links-grid2.single { grid-template-columns: 1fr; }
        .cw-links-mini {
            display: block; border-radius: 16px; padding: 16px; background: rgba(255,255,255,0.92);
            text-decoration: none; color: inherit; cursor: pointer; box-shadow: 0 1px 2px rgba(32,33,36,0.08);
            transition: transform 0.2s var(--cw-ease-elastic, cubic-bezier(.34,1.56,.64,1)), box-shadow 0.2s ease;
        }
        .cw-links-mini:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(32,33,36,0.12); }
        .cw-links-mini-title { margin: 8px 0 0; font-size: 14px; line-height: 20px; font-weight: 500; color: ${Ke.textPrimary}; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .cw-links-mini-until { margin-top: 8px; font-size: 12px; line-height: 16px; color: ${Ke.textSecondary}; font-variant-numeric: tabular-nums; }

        /* --- ABAS (controle segmentado) --- */
        .cw-links-seg { display: flex; background: rgba(60,64,67,0.08); border-radius: 999px; padding: 4px; margin: 24px 0 8px; }
        .cw-links-seg:first-child { margin-top: 0; }
        .cw-links-seg button {
            flex: 1; height: 32px; padding: 0; border: 0; background: transparent; border-radius: 999px;
            font-family: inherit; font-size: 13px; line-height: 20px; font-weight: 500; color: ${Ke.textSecondary}; cursor: pointer;
            transition: background-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
        }
        .cw-links-seg button:hover { color: ${Ke.textPrimary}; }
        .cw-links-seg button[aria-selected="true"] { background: #fff; color: ${Ke.blueText}; box-shadow: 0 1px 3px rgba(32,33,36,0.18); }

        /* --- LINHA --- */
        .cw-links-row {
            display: flex; align-items: center; gap: 8px; height: 56px; padding: 0 8px 0 12px; border-radius: 16px; position: relative;
            transition: background-color 0.15s ease, box-shadow 0.2s ease, transform 0.2s var(--cw-ease-elastic, cubic-bezier(.34,1.56,.64,1));
        }
        .cw-links-row:hover, .cw-links-row:focus-within { background: rgba(255,255,255,0.94); box-shadow: 0 1px 3px rgba(32,33,36,0.12); transform: translateY(-1px); }
        .cw-links-row-link { flex: 1; min-width: 0; height: 100%; display: flex; align-items: center; gap: 16px; text-decoration: none; color: inherit; border-radius: 16px; }
        .cw-links-row-text { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        .cw-links-row-name { font-size: 15px; line-height: 20px; font-weight: 500; color: ${Ke.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-links-row-name mark { background: none; color: ${Ke.blueText}; font-weight: 500; }
        .cw-links-row-desc { font-size: 12px; line-height: 16px; color: ${Ke.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-links-row-meta { font-size: 12px; color: ${Ke.textSecondary}; white-space: nowrap; font-variant-numeric: tabular-nums; }
        .cw-links-row-acts { display: flex; align-items: center; }
        .cw-links-row-acts .hid { opacity: 0; transition: opacity 0.15s ease; }
        .cw-links-row:hover .hid, .cw-links-row:focus-within .hid { opacity: 1; }

        .cw-links-ib {
            width: 32px; height: 32px; padding: 0; border-radius: 50%; border: none; background: transparent; color: ${Ke.textSecondary};
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
        .cw-links-pane-title { margin: 16px 0 4px; font-size: 18px; line-height: 24px; font-weight: 500; color: ${Ke.textPrimary}; }
        .cw-links-pane-sub { display: flex; align-items: center; gap: 8px; font-size: 12px; line-height: 16px; color: ${Ke.textSecondary}; }
        .cw-links-pane-sub .cw-links-cat-dot { width: 8px; height: 8px; }
        .cw-links-pane-live { margin-top: 8px; font-size: 12px; line-height: 16px; color: ${Ke.textSecondary}; font-variant-numeric: tabular-nums; }
        .cw-links-pane-block { margin-top: 16px; }
        .cw-links-pane-block h4 { margin: 0 0 4px; font-size: 12px; line-height: 16px; font-weight: 500; color: ${Ke.textSecondary}; }
        .cw-links-pane-block p { margin: 0; font-size: 14px; line-height: 20px; color: ${Ke.textPrimary}; }
        .cw-links-pane-plain { margin: 16px 0 0; font-size: 14px; line-height: 20px; color: ${Ke.textSecondary}; }
        .cw-links-pane-actions { margin-top: auto; padding-top: 24px; display: flex; flex-direction: column; gap: 8px; }
        .cw-links-pane-actions .row2 { display: flex; gap: 8px; }
        .cw-links-btn {
            height: 40px; padding: 0 24px; border-radius: 999px; background: ${Ke.blue}; color: #fff; font-size: 14px; font-weight: 500;
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

        .cw-links-empty-action { margin: 8px auto 0; display: block; background: none; border: none; color: ${Ke.blueText}; font-family: inherit; font-size: 13px; font-weight: 500; cursor: pointer; padding: 8px 16px; border-radius: 999px; }
        .cw-links-empty-action:hover { background: rgba(26,115,232,0.08); }

        .cw-links-popup :focus-visible { outline: 2px solid ${Ke.blue}; outline-offset: 2px; }
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
    `,document.head.appendChild(e)}var sr="links_fav",Gn="links_recent",Fc="cw_link_history_v4",Vm=4e3;function Wm(){try{return JSON.parse(localStorage.getItem(Fc)||"[]")}catch{return[]}}function Ee(e,t,a){let o=document.createElement(e);return t&&(o.className=t),a!=null&&(o.textContent=a),o}function Ga(e,t){let a=Ee("span",t);return a.setAttribute("aria-hidden","true"),a.innerHTML=e,a}function qc(e,t,a){let o=Ee("button",`cw-links-ib ${a||""}`);return o.type="button",o.title=t,o.setAttribute("aria-label",t),o.innerHTML=e,o}function Zo(e,t){let a=nr(t,Be.custom);e.style.setProperty("--cat-color",a.color),e.style.setProperty("--cat-bg",a.bg)}function Rc(){navigator.vibrate&&navigator.vibrate(10)}function zc(){let e="v5.0",t="",a="home",o=null,n=null,i=null,r=[],s=[],l=null,d=!1;Um();let c=document.createElement("div");c.id="links-popup",c.classList.add("cw-module-window","cw-links-popup"),Object.assign(c.style,bt,{right:"100px",width:"860px",height:"650px",maxWidth:"calc(100vw - 192px)",backgroundColor:"rgba(248,249,250,0.88)",overflow:"hidden"});let g={popup:c,googleLine:null},u=rt(c,Pe("headerTitle"),e,Pe("headerDesc"),g,()=>pe());c.appendChild(u);let b=u.querySelector("span"),L=Ee("div","cw-links-layout");c.appendChild(L);let A=Ee("nav","cw-links-sidebar");L.appendChild(A);let C=Ee("div","cw-links-content");L.appendChild(C);let z=Ee("div","cw-links-search-bar"),G=Ee("div","cw-links-search-wrap"),R=Ga(jt.search,"cw-links-search-icon"),O=Ee("input","cw-links-search-input");O.type="text",O.placeholder=Pe("searchPlaceholder"),O.setAttribute("aria-label",Pe("searchPlaceholder")),G.append(R,O),z.appendChild(G),C.appendChild(z);let de=Ee("div","cw-links-body"),te=Ee("div","cw-links-scroll"),re=Ee("div");re.style.display="contents",de.append(te,re),C.appendChild(de);function ee(){let v=Xe.get(sr,[]),h=Xe.get(Gn,[]);r=Array.isArray(v)?v.filter(p=>typeof p=="string"):[],s=Array.isArray(h)?h.filter(p=>p&&typeof p.id=="string"):[]}function w(){let v=JSON.stringify(r);r=Tc(r,Be.links,Be.fromCentral),JSON.stringify(r)!==v&&Xe.set(sr,r).catch(()=>{});let h=JSON.stringify(s);if(s=Ic(s,Be.links,Be.fromCentral),JSON.stringify(s)!==h&&Xe.set(Gn,s).catch(()=>{}),!d){d=!0;let p=Wm();if(p.length&&!s.length&&(s=Nc(p,Be.links,Date.now()),Xe.set(Gn,s).catch(()=>{})),p.length)try{localStorage.removeItem(Fc)}catch{}}}function S(){Xe.set(sr,r).catch(v=>console.warn("Favoritos n\xE3o sincronizaram",v))}function D(){l&&(clearTimeout(l),l=null,Xe.set(Gn,s).catch(v=>console.warn("Recentes n\xE3o sincronizaram",v)))}function j(v){s=Ac(s,v,Date.now()),l&&clearTimeout(l),l=setTimeout(D,Vm)}window.addEventListener("pagehide",D);function F(v){return r.includes(v)}function Z(v){let h=Cc(r,v);if(h.full){y.playError(),ne(Pe("favoritesFull")(er),{error:!0});return}r=h.list,S(),y.playClick(),Rc(),ne(Pe(h.added?"favAddedToast":"favRemovedToast")),Q()}function fe(v,h){navigator.clipboard.writeText(v.url).then(()=>{y.playClick(),Rc(),h.filter(Boolean).forEach(({node:p,restore:N})=>{p.classList.add("ok"),p.replaceChildren(),p.innerHTML=jt.check,N.label&&p.append(document.createTextNode(N.label)),setTimeout(()=>{p.isConnected&&(p.classList.remove("ok"),p.replaceChildren(),p.innerHTML=N.icon,N.text&&p.append(document.createTextNode(N.text)))},1500)}),j(zt(v)),ne(Pe("linkCopiedToast"))}).catch(()=>{y.playError(),ne(Pe("copyFailedToast"),{error:!0})})}function he(v){return Be.highlights.active.find(h=>h.linkId===v)||null}function ue(v){let h=ge(),p=zt(v),N=Ee("aside","cw-links-pane");N.setAttribute("aria-live","polite"),Zo(N,v.cat),N.appendChild(Ga(vo(v.cat,Be.custom),"cw-links-ico lg")),N.appendChild(Ee("h3","cw-links-pane-title",v.name));let M=Ee("div","cw-links-pane-sub");M.appendChild(Ee("i","cw-links-cat-dot"));let f="";try{f=new URL(v.url).host}catch{f=v.url}M.appendChild(Ee("span","",`${Jo(v.cat,h,Be.custom)} \xB7 ${f}`)),N.appendChild(M);let x=he(p);x&&N.appendChild(Ee("div","cw-links-pane-live",x.endsAt?Pe("liveUntil")(Dc(x.endsAt,h)):Pe("liveNow")));let _=la(v,"about",h),k=la(v,"when",h);if(_||k){if(_){let ke=Ee("div","cw-links-pane-block");ke.append(Ee("h4","",Pe("aboutLabel")),Ee("p","",_)),N.appendChild(ke)}if(k){let ke=Ee("div","cw-links-pane-block");ke.append(Ee("h4","",Pe("whenLabel")),Ee("p","",k)),N.appendChild(ke)}}else{let ke=la(v,"desc",h);ke&&N.appendChild(Ee("p","cw-links-pane-plain",ke))}let W=Ee("div","cw-links-pane-actions"),U=Ee("a","cw-links-btn");U.href=v.url,U.target="_blank",U.rel="noopener noreferrer",U.dataset.openId=p,U.append(Ga(jt.open),document.createTextNode(Pe("openLink"))),W.appendChild(U);let oe=Ee("div","row2"),be=Ee("button","cw-links-ghost");be.type="button",be.innerHTML=jt.copy,be.append(document.createTextNode(Pe("copyUrl"))),be.addEventListener("click",()=>fe(v,[{node:be,restore:{icon:jt.copy,text:Pe("copyUrl"),label:Pe("copied")}}]));let Ie=F(p),Oe=Ee("button",`cw-links-ghost ${Ie?"on":""}`);return Oe.type="button",Oe.setAttribute("aria-pressed",String(Ie)),Oe.innerHTML=Ie?jt.star:jt.starOutline,Oe.append(document.createTextNode(Pe(Ie?"favorited":"favorite"))),Oe.addEventListener("click",()=>Z(p)),oe.append(be,Oe),W.appendChild(oe),N.appendChild(W),N}function ce(v){let h=Be.byId.get(i);if(re.replaceChildren(),!h)return;let p=ue(h);v&&p.classList.add("swap"),re.appendChild(p)}function le(v){!v||v===i||!Be.byId.has(v)||(i=v,ce(!0))}function xe(v){if(v.includes(i))return i;let h=[Be.highlights.active[0]?.linkId,r.find(N=>Be.byId.has(N)),s.find(N=>Be.byId.has(N.id))?.id].filter(Boolean);return(a==="home"?h[0]:null)||v[0]||h[0]||zt(Be.links[0]||{url:""})}function E(v,h){v.addEventListener("click",()=>j(h)),v.addEventListener("auxclick",p=>{p.button===1&&j(h)})}function K(v){let h=ge(),p=Ee("a","cw-links-hero");p.href=v.link.url,p.target="_blank",p.rel="noopener noreferrer",p.dataset.linkId=v.linkId,Zo(p,v.link.cat);let N=Ee("div","cw-links-eyebrow");return N.append(Ga(vo(v.link.cat,Be.custom)),Ee("b","",v.link.name)),v.endsAt&&N.append(Ee("span","cw-links-eyebrow-end",Pe("until")(Bn(v.endsAt,h)))),p.append(N,Ee("h2","cw-links-hero-title",v.headline)),v.blurb&&p.append(Ee("p","cw-links-hero-blurb",v.blurb)),E(p,v.linkId),p}function se(v){let h=ge(),p=Ee("a","cw-links-mini");p.href=v.link.url,p.target="_blank",p.rel="noopener noreferrer",p.dataset.linkId=v.linkId,Zo(p,v.link.cat);let N=Ee("div","cw-links-eyebrow");return N.append(Ga(vo(v.link.cat,Be.custom)),Ee("b","",v.link.name)),p.append(N,Ee("div","cw-links-mini-title",v.headline)),v.endsAt&&p.append(Ee("div","cw-links-mini-until",Pe("until")(Bn(v.endsAt,h)))),E(p,v.linkId),p}function V(v,h,p){let N=ge(),M=zt(v),f=Ee("div","cw-links-row");f.dataset.linkId=M,Zo(f,v.cat);let x=Ee("a","cw-links-row-link");x.href=v.url,x.target="_blank",x.rel="noopener noreferrer";let _=Ee("div","cw-links-row-text"),k=Ee("div","cw-links-row-name");q(k,v.name,p),_.append(k,Ee("div","cw-links-row-desc",la(v,"desc",N))),x.append(Ga(vo(v.cat,Be.custom),"cw-links-ico"),_),h&&x.append(Ee("span","cw-links-row-meta",h)),E(x,M);let W=Ee("div","cw-links-row-acts"),U=F(M),oe=qc(U?jt.star:jt.starOutline,Pe(U?"favoriteRemove":"favoriteAdd"),`star ${U?"on":"hid"}`);oe.setAttribute("aria-pressed",String(U)),oe.addEventListener("click",()=>Z(M));let be=qc(jt.copy,Pe("copyUrl"),"hid");return be.addEventListener("click",()=>fe(v,[{node:be,restore:{icon:jt.copy}}])),W.append(oe,be),f.append(x,W),f}function q(v,h,p){let N=(p||"").trim();if(!N){v.textContent=h;return}let M=_=>_.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),f=M(h);if(f.length!==h.length){v.textContent=h;return}let x=f.indexOf(M(N));if(x===-1){v.textContent=h;return}v.append(document.createTextNode(h.slice(0,x)),Object.assign(Ee("mark"),{textContent:h.slice(x,x+N.length)}),document.createTextNode(h.slice(x+N.length)))}function T(){A.replaceChildren();let v=(M,f,x,_,k)=>{let W=Ee("button",`cw-links-nav-btn ${_?"active":""}`);return W.type="button",W.title=f,W.setAttribute("aria-label",f),_&&W.setAttribute("aria-current","page"),W.dataset.key=M,W.style.setProperty("--cat-color",k.color),W.style.setProperty("--cat-bg",k.bg),W.append(Ga(x,"cw-links-nav-icon"),Ee("span","cw-links-nav-label",f)),W},h=ge(),p=a==="home"&&!t.trim(),N=v("home",Pe("home"),jt.home,p,{color:Ke.blue,bg:"#E8F0FE"});N.id="cw-sidebar-btn-home",N.addEventListener("click",()=>{y.playClick(),H(),a="home",Q()}),A.appendChild(N),A.appendChild(Ee("div","cw-links-nav-sep")),ir(Be.links,Be.custom).forEach(M=>{let f=nr(M,Be.custom),x=a==="library"&&!t.trim()&&n===M,_=v(M,Jo(M,h,Be.custom),vo(M,Be.custom),x,f);_.id=`cw-sidebar-btn-${M}`,_.addEventListener("click",()=>{y.playClick(),H(),a="library",n=M,Q();let k=document.getElementById(`cat-anchor-${M}`);k&&k.scrollIntoView({behavior:"smooth",block:"start"})}),A.appendChild(_)}),A.querySelector(".cw-links-nav-btn.active")?.scrollIntoView?.({block:"nearest"})}function H(){t="",O.value=""}function ie(){let v=ge(),{active:h,ended:p}=Be.highlights,N=[];if(h.length){te.append(Ee("div","cw-links-label",Pe("featured"))),te.append(K(h[0])),N.push(h[0].linkId);let U=h.slice(1);if(U.length){let oe=Ee("div",`cw-links-grid2 ${U.length===1?"single":""}`);U.forEach(be=>{oe.append(se(be)),N.push(be.linkId)}),te.append(oe)}}let f={fav:(U=>U.map(oe=>Be.byId.get(oe)).filter(Boolean))(r).map(U=>({link:U,meta:""})),rec:s.map(U=>({link:Be.byId.get(U.id),meta:Mc(U.t,Date.now(),v)})).filter(U=>U.link),ex:p.map(U=>({link:U.link,meta:Pe("endedOn")(Bn(U.endsAt,v))}))},x=[["fav","tabFavorites"],["rec","tabRecent"],["ex","tabEnded"]],_=o||(x.find(([U])=>f[U].length)||x[0])[0],k=Ee("div","cw-links-seg");k.setAttribute("role","tablist"),x.forEach(([U,oe])=>{let be=Ee("button","",Pe(oe));be.type="button",be.setAttribute("role","tab"),be.setAttribute("aria-selected",String(U===_)),be.addEventListener("click",()=>{o=U,Q()}),k.append(be)}),te.append(k);let W=f[_];if(W.length)W.forEach(({link:U,meta:oe})=>{te.append(V(U,oe)),N.push(zt(U))});else{let U={fav:["emptyFavTitle","emptyFavSub"],rec:["emptyRecentTitle","emptyRecentSub"],ex:["emptyEndedTitle","emptyEndedSub"]}[_];te.append(_o({icon:jt.starOutline,title:Pe(U[0]),subtitle:Pe(U[1])}));let oe=Ee("button","cw-links-empty-action",Pe("browseAll"));oe.type="button",oe.addEventListener("click",()=>{a="library",n=null,Q()}),te.append(oe)}return N}function P(){let v=ge(),h=t.trim(),p=[],N=h?Be.links.filter(f=>Lc(f,h,v,Be.custom)):Be.links;if(h&&!N.length)return te.append(_o({icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',title:Pe("nothingFound"),subtitle:Pe("noLinkMatches")(h)})),p;let M=Sc(N,Be.custom);return h&&te.append(Ee("div","cw-links-label",Pe("resultsSummary")(N.length,M.size))),M.forEach((f,x)=>{let _=Ee("div","cw-links-cathead");_.id=`cat-anchor-${x}`,Zo(_,x),_.append(Ee("i","cw-links-cat-dot"),document.createTextNode(Jo(x,v,Be.custom))),te.append(_),f.forEach(k=>{te.append(V(k,"",h)),p.push(zt(k))})}),p}function Q(){let v=te.scrollTop;te.replaceChildren();let h=t.trim()||a==="library"?P():ie();T(),i=!h.length&&(t.trim()||a==="library")?null:xe(h),ce(!1),te.scrollTop=v}te.addEventListener("mouseover",v=>{let h=v.target.closest?.("[data-link-id]");h&&le(h.dataset.linkId)}),te.addEventListener("focusin",v=>{let h=v.target.closest?.("[data-link-id]");h&&le(h.dataset.linkId)}),re.addEventListener("click",v=>{let h=v.target.closest?.("a[data-open-id]");h&&j(h.dataset.openId)}),re.addEventListener("auxclick",v=>{let h=v.target.closest?.("a[data-open-id]");h&&v.button===1&&j(h.dataset.openId)}),O.addEventListener("input",v=>{t=v.target.value,Q()});function pe(){let v=!ht(c);v?(ee(),Q(),Qe()):(D(),Je()),dt(v,c,"cw-btn-links")}return document.body.appendChild(c),ee(),Q(),Hm(()=>{w(),Q()}),Xe.sync().then(()=>{ee(),w(),Q()}).catch(()=>{}),je(()=>{Be={...Be,highlights:rr(Be.rawHighlights,Be.links,ge())},b&&(b.textContent=Pe("headerTitle"));let v=c.querySelector(".cw-help-title");v&&(v.textContent=Pe("headerTitle"));let h=c.querySelector(".cw-help-description");h&&(h.textContent=Pe("headerDesc")),O.placeholder=Pe("searchPlaceholder"),O.setAttribute("aria-label",Pe("searchPlaceholder")),Q()}),pe}var Ym=60*1e3,Uc="cw_read_broadcasts",Pc={pt:{headerTitle:"Central de Avisos",headerDesc:"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",searchPlaceholder:"Buscar avisos\u2026",clearSearch:"Limpar a busca",markRead:e=>`Marcar \u201C${e}\u201D como lido`,markReadShort:"Marcar como lido",publishedBy:e=>`Publicado por ${e}`,system:"Sistema",bauAvailability:"Disponibilidade BAU",attention:"aten\xE7\xE3o",full:"total",noDates:"sem datas publicadas",asideLabel:"Estado da opera\xE7\xE3o",filtersTitle:"Filtrar por tipo",filterAll:"Todos",readTitle:"Leitura",readCount:e=>e===1?"1 lido":`${e} lidos`,markAllRead:"Marcar tudo como lido",updatedAgo:e=>`Atualizado ${e}`,swapTo:e=>`Ver disponibilidade de ${e}`,justNow:"agora",minutesAgo:e=>`h\xE1 ${e} min`,hoursAgo:e=>`h\xE1 ${e} h`,yesterday:"ontem",nothingFound:"Nada encontrado.",allRead:"Tudo lido!",history:e=>`Hist\xF3rico (${e})`,typeLabel:{info:"Info",critical:"Alerta",success:"Sucesso"},syncing:"Sincronizando\u2026",updated:"Atualizado",offline:"Sem conex\xE3o \u2014 mostrando o que j\xE1 estava aqui"},es:{headerTitle:"Central de Avisos",headerDesc:"Comunicaci\xF3n oficial de la operaci\xF3n.",searchPlaceholder:"Buscar avisos\u2026",clearSearch:"Limpiar la b\xFAsqueda",markRead:e=>`Marcar \u201C${e}\u201D como le\xEDdo`,markReadShort:"Marcar como le\xEDdo",publishedBy:e=>`Publicado por ${e}`,system:"Sistema",bauAvailability:"Disponibilidad BAU",attention:"atenci\xF3n",full:"total",noDates:"sin fechas publicadas",asideLabel:"Estado de la operaci\xF3n",filtersTitle:"Filtrar por tipo",filterAll:"Todos",readTitle:"Lectura",readCount:e=>e===1?"1 le\xEDdo":`${e} le\xEDdos`,markAllRead:"Marcar todo como le\xEDdo",updatedAgo:e=>`Actualizado ${e}`,swapTo:e=>`Ver disponibilidad de ${e}`,justNow:"ahora",minutesAgo:e=>`hace ${e} min`,hoursAgo:e=>`hace ${e} h`,yesterday:"ayer",nothingFound:"No se encontr\xF3 nada.",allRead:"\xA1Todo le\xEDdo!",history:e=>`Historial (${e})`,typeLabel:{info:"Info",critical:"Alerta",success:"\xC9xito"},syncing:"Sincronizando\u2026",updated:"Actualizado",offline:"Sin conexi\xF3n \u2014 mostrando lo que ya estaba aqu\xED"},en:{headerTitle:"Broadcast Central",headerDesc:"Official communication from the operation.",searchPlaceholder:"Search broadcasts\u2026",clearSearch:"Clear the search",markRead:e=>`Mark \u201C${e}\u201D as read`,markReadShort:"Mark as read",publishedBy:e=>`Published by ${e}`,system:"System",bauAvailability:"BAU Availability",attention:"caution",full:"full",noDates:"no dates published",asideLabel:"Operation status",filtersTitle:"Filter by type",filterAll:"All",readTitle:"Read",readCount:e=>e===1?"1 read":`${e} read`,markAllRead:"Mark all as read",updatedAgo:e=>`Updated ${e}`,swapTo:e=>`View ${e} availability`,justNow:"just now",minutesAgo:e=>`${e} min ago`,hoursAgo:e=>`${e} h ago`,yesterday:"yesterday",nothingFound:"Nothing found.",allRead:"All read!",history:e=>`History (${e})`,typeLabel:{info:"Info",critical:"Alert",success:"Success"},syncing:"Syncing\u2026",updated:"Updated",offline:"No connection \u2014 showing what was already here"}};function Re(e){let t=ge();return Pc[t]?.[e]??Pc.pt[e]}var jn={PT:{label:"PT-BR",flag:'<svg class="cw-bc-bau-flag" viewBox="0 0 21 15" aria-hidden="true"><rect width="21" height="15" fill="#009B3A"/><path d="M10.5 1.9 19.1 7.5 10.5 13.1 1.9 7.5Z" fill="#FEDF00"/><circle cx="10.5" cy="7.5" r="3.3" fill="#002776"/></svg>'},ES:{label:"ES",flag:'<svg class="cw-bc-bau-flag" viewBox="0 0 21 15" aria-hidden="true"><rect width="21" height="15" fill="#AA151B"/><rect y="3.75" width="21" height="7.5" fill="#F1BF00"/></svg>'},EN:{label:"EN",flag:'<svg class="cw-bc-bau-flag" viewBox="0 0 21 15" aria-hidden="true"><rect width="21" height="15" fill="#012169"/><path d="M0 0l21 15M21 0L0 15" stroke="#FFF" stroke-width="3"/><path d="M0 0l21 15M21 0L0 15" stroke="#C8102E" stroke-width="2"/><path d="M10.5 0v15M0 7.5h21" stroke="#FFF" stroke-width="5"/><path d="M10.5 0v15M0 7.5h21" stroke="#C8102E" stroke-width="3"/></svg>'}},Xm='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="17 2 21 6 17 10"></polyline><path d="M3 12V10a4 4 0 0 1 4-4h14"></path><polyline points="7 22 3 18 7 14"></polyline><path d="M21 12v2a4 4 0 0 1-4 4H3"></path></svg>',cr={critical:!0,info:!0,success:!0};function Km(){if(document.getElementById("cw-broadcast-styles"))return;let e=document.createElement("style");e.id="cw-broadcast-styles",e.textContent=`
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
    `,document.head.appendChild(e)}var Qm={pt:"pt-BR",es:"es-ES",en:"en-US"};function Vc(e){if(!e)return"";try{let t=new Date(e);return isNaN(t.getTime())?String(e):new Intl.DateTimeFormat(Qm[ge()]||"pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(t)}catch{return String(e)}}function Jm(e){let t=String(e||"").split("-");return t.length===3?`${t[2]}/${t[1]}`:String(e||"")}function Zm(e){let t=new Date(e).getTime();if(!t||isNaN(t))return"";let a=Math.floor((Date.now()-t)/6e4);if(a<1)return Re("justNow");if(a<60)return Re("minutesAgo")(a);let o=Math.floor(a/60);return o<24?Re("hoursAgo")(o):o<48?Re("yesterday"):Vc(e).split(",")[0]}function $c(e){if(!e||typeof e!="string")return"";let t=e;return t=t.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" class="cw-bc-link">$1</a>'),t=t.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),t=t.replace(/_(.*?)_/g,"<i>$1</i>"),t=t.replace(/\n/g,"<br>"),t=Rs(t),t}function Bc(e){if(!e)return null;let t={};try{t=JSON.parse(e.value||"{}")}catch{return null}let a=String(t.title||e.label||"").trim(),o=String(t.text||"").trim();return!a||!o?null:{id:String(e.key||e.id||""),type:cr[t.type]?t.type:"info",title:a,text:o,date:String(t.publishedAt||e.publishedAt||""),author:String(t.author||e.publishedBy||""),lang:String(e.lang||"ALL").toUpperCase()}}function eg(e){if(!e)return null;let t=String(e.title||"").trim(),a=String(e.text||"").trim();return!t||!a||t.toLowerCase().includes("disponibilidade bau")?null:{id:String(e.id||""),type:cr[e.type]?e.type:"info",title:t,text:a,date:String(e.date||""),author:String(e.author||""),lang:"ALL"}}function Gc(e){let t=(e||[])[0];if(!t)return null;let a={};try{a=JSON.parse(t.value||"{}")}catch{return null}let o=a.segments||{},n={};return Object.keys(o).forEach(i=>{let r=String(o[i]?.attention||""),s=String(o[i]?.full||"");(r||s)&&(n[i]={attention:r,full:s})}),Object.keys(n).length?{updatedAt:String(a.updatedAt||t.publishedAt||""),author:String(a.author||t.publishedBy||""),note:String(a.note||""),segments:n}:null}function jc(e,t){return e.lang==="ALL"||e.lang===t}function xo(){try{let e=JSON.parse(localStorage.getItem(Uc)||"[]");return Array.isArray(e)?e:[]}catch{return[]}}function Hc(e){try{localStorage.setItem(Uc,JSON.stringify(e))}catch{}}function Wc(){let e="v5.0",t=!1,a=null,o="",n=null,i=null,r=!1,s=[],l=null,d=null,c=null,g=null;Km();let u=document.createElement("div");u.id="broadcast-popup",u.classList.add("cw-module-window"),Object.assign(u.style,bt,{right:"auto",left:"50%",width:"760px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",overflow:"hidden"});let b={popup:u,googleLine:null};function L(){if(t=!ht(u),dt(t,u,"cw-btn-broadcast"),t){Qe();let P=document.getElementById("cw-btn-broadcast");P&&P.classList.remove("has-new"),n=null,i=null,r=!1,Z()}else Je()}let A=rt(u,Re("headerTitle"),e,Re("headerDesc"),b,()=>L()),C=A.querySelector("span");u.appendChild(A);let z=document.createElement("div");z.className="cw-bc-search-wrap";let G=document.createElement("div");G.className="cw-bc-search-icon",G.setAttribute("aria-hidden","true"),G.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';let R=document.createElement("input");R.className="cw-bc-search-input no-drag",R.type="search",R.name="cw-broadcast-search",R.autocomplete="off",R.spellcheck=!1,R.placeholder=Re("searchPlaceholder"),R.setAttribute("aria-label",Re("searchPlaceholder"));let O=document.createElement("button");O.type="button",O.className="cw-bc-search-clear",O.setAttribute("aria-label",Re("clearSearch")),O.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';let de=document.createElement("div");de.className="cw-bc-search-field",de.append(G,R,O),z.appendChild(de),u.appendChild(z),R.addEventListener("input",P=>{o=P.target.value,O.classList.toggle("visible",o.length>0),q()}),O.onclick=()=>{R.value="",o="",O.classList.remove("visible"),q(),R.focus()};let te=document.createElement("div");te.className="cw-bc-body",u.appendChild(te);let re=document.createElement("div");re.className="cw-nice-scroll cw-bc-feed",re.setAttribute("role","feed"),re.setAttribute("aria-label",Re("headerTitle")),te.appendChild(re);let ee=document.createElement("aside");ee.className="cw-nice-scroll cw-bc-aside",ee.setAttribute("aria-label",Re("asideLabel")),te.appendChild(ee);let w=document.createElement("div");w.id="cw-bau-widget",w.className="cw-bc-panel",w.style.display="none",ee.appendChild(w);let S=document.createElement("div");S.className="cw-bc-panel",ee.appendChild(S);let D=document.createElement("div");D.className="cw-bc-panel",ee.appendChild(D);let j=document.createElement("div");j.id="cw-update-status",j.className="cw-bc-sync",j.setAttribute("role","status"),j.setAttribute("aria-live","polite"),ee.appendChild(j);function F({syncing:P=!1,online:Q=!0}={}){if(j.classList.toggle("offline",!P&&!Q),P){j.innerHTML=`<span class="cw-bc-spinner" aria-hidden="true"></span><span>${Re("syncing")}</span>`;return}let pe=g?Zm(g):"",v=Q?pe?Re("updatedAgo")(pe):Re("updated"):Re("offline");j.innerHTML=`<span class="cw-bc-sync-dot" aria-hidden="true"></span><span>${v}</span>`}async function Z(){F({syncing:!0});let P=!0,Q=Fo();try{let[pe,v]=await Promise.all([Te.fetchContentModule("broadcast"),Te.fetchContentModule("bau_availability")]);if(Array.isArray(pe)){let h=pe.map(Bc).filter(Boolean).filter(p=>jc(p,Q));s=he(h)}else P=!1;l=Gc(v)}catch{P=!1}P&&(g=new Date().toISOString()),fe(),ue(),q(),F({online:P})}function fe(){let P=l?l.updatedAt:null;if(!(d===null)&&!t){let pe=xo();(s.some(p=>!d.has(p.id)&&!pe.includes(p.id))||P&&P!==c)&&y.playNotification()}d=new Set(s.map(pe=>pe.id)),c=P}function he(P){return P.slice().sort((Q,pe)=>{let v=new Date(Q.date).getTime()||0;return(new Date(pe.date).getTime()||0)-v})}function ue(){let P=document.getElementById("cw-btn-broadcast");if(!P)return;let Q=xo();if(s.some(v=>!Q.includes(v.id))){if(P.classList.add("has-new"),!P.querySelector(".cw-badge")){let v=document.createElement("div");v.className="cw-badge",Object.assign(v.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),P.appendChild(v)}}else{P.classList.remove("has-new");let v=P.querySelector(".cw-badge");v&&v.remove()}}function ce(){if(!l){w.style.display="none",w.innerHTML="";return}let P=Object.keys(jn).filter(x=>l.segments[x]);if(!P.length){w.style.display="none",w.innerHTML="";return}let Q=n&&P.includes(n)?n:P.includes(Fo())?Fo():P[0],pe=jn[Q],v=l.segments[Q]||{},h=(x,_)=>`
          <span class="cw-bc-bau-date ${x}">
              <span class="cw-bc-bau-dot"></span>
              <span class="cw-bc-bau-kind">${Re(x)}</span>
              <span class="cw-bc-bau-value">${Jm(_)}</span>
          </span>`,p=[v.attention?h("attention",v.attention):"",v.full?h("full",v.full):""].join(""),N=P[(P.indexOf(Q)+1)%P.length],M=N&&N!==Q?`<button class="cw-bc-bau-swap" type="button"
                     aria-label="${Re("swapTo")(jn[N].label)}"
                     title="${Re("swapTo")(jn[N].label)}">${Xm}</button>`:"";w.style.display="flex",w.innerHTML=`
          <div class="cw-bc-bau-top">
              ${pe.flag}
              <span class="cw-bc-bau-label">${Re("bauAvailability")}</span>
              <span class="cw-bc-bau-seg">${pe.label}</span>
              ${M}
          </div>
          <div class="cw-bc-bau-dates">
              ${p||`<span class="cw-bc-bau-empty">${Re("noDates")}</span>`}
          </div>
          ${l.note?`<div class="cw-bc-bau-note">${$c(l.note)}</div>`:""}
      `;let f=w.querySelector(".cw-bc-bau-swap");f&&(f.onclick=()=>{n=N,y.playClick(),ce()})}function le(){let P={critical:0,info:0,success:0};s.forEach(v=>{P[v.type]=(P[v.type]||0)+1});let Q=(v,h,p)=>`
          <button class="cw-bc-filter" type="button" data-tipo="${v}"
                  aria-pressed="${i===v}">
              ${v==="all"?"":`<span class="cw-bc-type-dot ${v}"></span>`}
              <span>${h}</span>
              <span class="cw-bc-filter-count">${p}</span>
          </button>`;S.innerHTML=`
          <div class="cw-bc-panel-title">${Re("filtersTitle")}</div>
          <div class="cw-bc-filters">
              ${Q("all",Re("filterAll"),s.length)}
              ${Object.keys(P).map(v=>Q(v,Re("typeLabel")[v],P[v])).join("")}
          </div>
      `,S.querySelectorAll(".cw-bc-filter").forEach(v=>{v.onclick=()=>{let h=v.dataset.tipo;i=h==="all"||h===i?null:h,y.playClick(),q()}});let pe=S.querySelector('[data-tipo="all"]');pe&&pe.setAttribute("aria-pressed",String(i===null))}function xe(){let P=xo(),Q=s.filter(v=>P.includes(v.id)).length,pe=s.length-Q;D.innerHTML=`
          <div class="cw-bc-panel-title">${Re("readTitle")}</div>
          <button class="cw-bc-history-divider" type="button"
                  aria-expanded="${r}" aria-controls="cw-bc-history">
              <span>${Re("readCount")(Q)}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <button class="cw-bc-clear-btn" type="button" ${pe?"":"disabled"}>
              ${Re("markAllRead")}
          </button>
      `,D.querySelector(".cw-bc-history-divider").onclick=()=>{y.playClick(),r=!r,q()},D.querySelector(".cw-bc-clear-btn").onclick=()=>{pe&&(y.playSuccess(),Hc(s.map(v=>v.id)),q(),ue())}}let E=0;function K(P,Q){let pe=document.createElement("article");pe.className="cw-bc-card"+(Q?" history":"");let v=cr[P.type]?P.type:"info",h=`cw-bc-title-${++E}`;pe.setAttribute("aria-labelledby",h);let p=document.createElement("div");if(p.className="cw-bc-card-meta",p.innerHTML=`
        <span class="cw-bc-type">
            <span class="cw-bc-type-dot ${v}"></span>${Re("typeLabel")[v]}
        </span>
        <span class="cw-bc-meta-sep" aria-hidden="true">\xB7</span>
        <span class="cw-bc-date-tag">${Vc(P.date)}</span>
    `,!Q){let x=document.createElement("button");x.type="button",x.className="cw-bc-dismiss-btn",x.setAttribute("aria-label",Re("markRead")(P.title)),x.title=Re("markReadShort"),x.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>',x.onclick=_=>{_.stopPropagation(),y.playClick(),pe.style.transform="translateX(20px)",pe.style.opacity="0",setTimeout(()=>{let k=xo();k.push(P.id),Hc(k),q(),ue()},300)},p.appendChild(x)}let N=document.createElement("h3");N.className="cw-bc-msg-title",N.id=h,N.textContent=P.title;let M=document.createElement("div");M.className="cw-bc-msg-body",M.innerHTML=$c(P.text);let f=document.createElement("div");return f.className="cw-bc-msg-author",f.textContent=Re("publishedBy")(P.author||Re("system")),pe.append(p,N,M,f),pe}function se(P,Q){return i&&P.type!==i?!1:Q?`${P.title||""} ${P.text||""}`.toLowerCase().includes(Q):!0}function V(P,Q){let pe=P.filter(h=>!Q.includes(h.id)),v=P.filter(h=>Q.includes(h.id));if(!pe.length&&!(r&&v.length)){let h=o.trim().length>0||i!==null,p=document.createElement("div");p.className="cw-bc-empty",p.innerHTML=h?`<div>${Re("nothingFound")}</div>`:`
               <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
               <div>${Re("allRead")}</div>
              `,re.appendChild(p);return}if(pe.forEach(h=>re.appendChild(K(h,!1))),r&&v.length){let h=document.createElement("div");h.className="cw-bc-history-container",h.id="cw-bc-history",h.style.display="flex",v.forEach(p=>h.appendChild(K(p,!0))),re.appendChild(h)}}function q(){ce(),le(),xe(),re.innerHTML="";let P=xo(),Q=o.trim().toLowerCase();V(s.filter(pe=>se(pe,Q)),P)}let T=Te.getCachedContent("broadcast");Array.isArray(T)&&T.length?s=he(T.map(Bc).filter(Boolean).filter(P=>jc(P,Fo()))):s=he(Te.getCachedBroadcasts().map(eg).filter(Boolean)),l=Gc(Te.getCachedContent("bau_availability")),q(),Z(),a||(a=setInterval(Z,Ym));let H=document.createElement("div");Object.assign(H.style,Yt),H.className="no-drag",u.appendChild(H),Xt(u,H),document.body.appendChild(u);let ie=s.some(P=>!xo().includes(P.id));return je(()=>{C&&(C.textContent=Re("headerTitle"));let P=u.querySelector(".cw-help-title");P&&(P.textContent=Re("headerTitle"));let Q=u.querySelector(".cw-help-description");Q&&(Q.textContent=Re("headerDesc")),R.placeholder=Re("searchPlaceholder"),R.setAttribute("aria-label",Re("searchPlaceholder")),O.setAttribute("aria-label",Re("clearSearch")),re.setAttribute("aria-label",Re("headerTitle")),ee.setAttribute("aria-label",Re("asideLabel")),q(),F({online:!0})}),{toggle:L,hasUnread:ie}}var Yc="cw-wizard-shell-styles",Xc={pt:{back:"Voltar",skip:"Pular",next:"Pr\xF3ximo",done:"Concluir",dotsGroup:"Navega\xE7\xE3o entre os slides",report:"Reportar bug ou sugest\xE3o",createdBy:"criado por",slideLabel:(e,t)=>`Slide ${e} de ${t}`,announce:(e,t,a,o)=>`Slide ${e} de ${t}: ${a}. ${o}`},es:{back:"Volver",skip:"Omitir",next:"Siguiente",done:"Finalizar",dotsGroup:"Navegaci\xF3n entre las diapositivas",report:"Reportar error o sugerencia",createdBy:"creado por",slideLabel:(e,t)=>`Diapositiva ${e} de ${t}`,announce:(e,t,a,o)=>`Diapositiva ${e} de ${t}: ${a}. ${o}`},en:{back:"Back",skip:"Skip",next:"Next",done:"Finish",dotsGroup:"Slide navigation",report:"Report a bug or suggestion",createdBy:"created by",slideLabel:(e,t)=>`Slide ${e} of ${t}`,announce:(e,t,a,o)=>`Slide ${e} of ${t}: ${a}. ${o}`}};function fa(e){let t=ge();return Xc[t]?.[e]??Xc.pt[e]}var Kc=160,dr=320,tg=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function ag(){if(document.getElementById(Yc))return;let e=document.createElement("style");e.id=Yc,e.textContent=`
        .cw-wiz-overlay {
            --cw-wiz-swap: ${Kc}ms;
            --cw-wiz-shell: ${dr}ms;

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
    `,document.head.appendChild(e)}var og='button:not([hidden]):not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';function Hn({slides:e,idPrefix:t,badge:a=null,nextLabel:o=null,finalLabel:n=null,skipLabel:i=null,onSkip:r=null,onClose:s=()=>{}}){let l={next:o||fa("next"),final:n||fa("done"),skip:i};if(!Array.isArray(e)||e.length===0)return console.warn("[wizard-shell] chamado sem slides; nada a mostrar."),{close:()=>{}};ag();let d=`${t}-title`,c=`${t}-text`,g=document.activeElement,u=0,b=!1,L=null,A=document.createElement("div");A.className="cw-wiz-overlay",A.setAttribute("role","dialog"),A.setAttribute("aria-modal","true"),A.setAttribute("aria-labelledby",d),A.setAttribute("aria-describedby",c);let C=document.createElement("div");if(C.className="cw-wiz-card",a){let E=document.createElement("div");E.className="cw-wiz-badge",E.textContent=a,C.appendChild(E)}let z=document.createElement("div");z.className="cw-wiz-stage";let G=document.createElement("div");G.className="cw-wiz-icon",G.setAttribute("aria-hidden","true");let R=document.createElement("div");R.className="cw-wiz-title",R.id=d;let O=document.createElement("div");O.className="cw-wiz-text",O.id=c,z.appendChild(G),z.appendChild(R),z.appendChild(O);let de=document.createElement("div");de.className="cw-wiz-live",de.setAttribute("aria-live","polite"),de.setAttribute("aria-atomic","true");let te=document.createElement("div");te.className="cw-wiz-dots",te.setAttribute("role","group"),te.setAttribute("aria-label",fa("dotsGroup"));let re=document.createElement("div");re.className="cw-wiz-actions";let ee=document.createElement("button");ee.type="button",ee.className="cw-wiz-btn cw-wiz-btn-ghost",ee.textContent=fa("back");let w=document.createElement("button");w.type="button",w.className="cw-wiz-skip",w.textContent=i||fa("skip"),i||(w.hidden=!0);let S=document.createElement("button");S.type="button",S.className="cw-wiz-btn cw-wiz-btn-primary",re.appendChild(ee),re.appendChild(S),i&&(C.classList.add("has-skip"),C.appendChild(w)),C.appendChild(z),C.appendChild(de),C.appendChild(te),C.appendChild(re);let D=document.createElement("div");D.className="cw-wiz-footer";let j=document.createElement("a");j.href=ao,j.target="_blank",j.rel="noopener noreferrer",j.textContent=fa("report");let F=document.createElement("span");F.textContent="\xB7",F.style.opacity="0.5",F.setAttribute("aria-hidden","true");let Z=document.createElement("span");Z.append(`${fa("createdBy")} `);let fe=document.createElement("span");fe.className="cw-wiz-credit-name",fe.textContent=Wt,Z.appendChild(fe),D.append(j,F,Z),C.appendChild(D),A.appendChild(C);let he=e.map((E,K)=>{let se=document.createElement("button");return se.type="button",se.className="cw-wiz-dot",se.setAttribute("aria-label",fa("slideLabel")(K+1,e.length)),se.onmouseenter=()=>y.playHover(),se.onclick=()=>{K!==u&&(y.playClick(),ce(K))},te.appendChild(se),se});function ue(E){let K=e[E];G.textContent=K.icon||"",R.textContent=K.title||"",O.textContent=K.text||"",he.forEach((V,q)=>{V.classList.toggle("active",q===E),V.setAttribute("aria-current",q===E?"true":"false")});let se=E===e.length-1;S.textContent=se?l.final:l.next,ee.hidden=E===0,w.hidden=!i||se,de.textContent=fa("announce")(E+1,e.length,K.title,K.text)}function ce(E){if(b||E===u||E<0||E>=e.length)return;let K=E>u?"swapping-next":"swapping-prev";if(u=E,tg()){ue(E);return}clearTimeout(L),z.classList.add(K),L=setTimeout(()=>{ue(E),z.classList.remove("swapping-next","swapping-prev")},Kc)}function le({silent:E=!1}={}){b||(b=!0,clearTimeout(L),document.removeEventListener("keydown",xe,!0),A.classList.add("closing"),A.classList.remove("open"),C.style.willChange="opacity, transform",E||y.playSuccess(),setTimeout(()=>{if(A.remove(),Je(),g&&document.contains(g))try{g.focus({preventScroll:!0})}catch{}s()},dr))}function xe(E){if(!b){if(E.key==="Tab"){let K=Array.from(C.querySelectorAll(og)).filter(q=>!q.hidden&&q.offsetParent!==null);if(K.length===0)return;let se=K[0],V=K[K.length-1];E.shiftKey&&document.activeElement===se?(E.preventDefault(),V.focus()):!E.shiftKey&&document.activeElement===V&&(E.preventDefault(),se.focus());return}if(E.key==="Enter"){if(document.activeElement&&document.activeElement.classList.contains("cw-wiz-dot"))return;E.preventDefault(),E.stopPropagation(),S.click()}else E.key==="Escape"?(E.preventDefault(),E.stopPropagation(),w.hidden?le():w.click()):E.key==="ArrowRight"?(E.preventDefault(),u<e.length-1&&(y.playClick(),ce(u+1))):E.key==="ArrowLeft"&&(E.preventDefault(),u>0&&(y.playClick(),ce(u-1)))}}return[ee,w,S].forEach(E=>{E.onmouseenter=()=>y.playHover()}),S.onclick=()=>{y.playClick(),u<e.length-1?ce(u+1):le()},ee.onclick=()=>{y.playClick(),ce(u-1)},w.onclick=async()=>{y.playClick(),!(typeof r=="function"&&!await r())&&le({silent:!0})},document.body.appendChild(A),Qe(),ue(0),C.style.willChange="opacity, transform",requestAnimationFrame(()=>{A.classList.add("open")}),setTimeout(()=>{C.style.removeProperty("will-change"),S.focus({preventScroll:!0})},dr),document.addEventListener("keydown",xe,!0),{close:le}}var Qc="cw_onboarding_seen_v1",Jc={pt:[{icon:"\u{1F680}",title:"Bem-vindo ao Case Wizard",text:"Uma camada de produtividade que roda por cima do CRM. Ela n\xE3o substitui nada do que voc\xEA j\xE1 usa \u2014 s\xF3 tira o trabalho repetitivo do caminho."},{icon:"\u2328\uFE0F",title:"Tudo come\xE7a em dois lugares",text:"A p\xEDlula flutuante, sempre no canto da tela, abre qualquer m\xF3dulo com um clique. E Ctrl+K (ou \u2318K) abre a paleta de comandos: digite o que quer e v\xE1 direto, sem tirar a m\xE3o do teclado."},{icon:"\u{1F4DD}",title:"Notas e BAU sem retrabalho",text:"O Case Notes monta a nota t\xE9cnica do caso a partir do status e das tasks que voc\xEA marcar. O BAU Form cuida das solicita\xE7\xF5es de cria\xE7\xE3o e descarte, passo a passo."},{icon:"\u{1F4AC}",title:"Na hora de falar com o cliente",text:"O Email Assistant sugere templates que leem o contexto do caso, e o Call Script te guia pela chamada com um roteiro interativo \u2014 sem script decorado."},{icon:"\u{1F4DA}",title:"Seu material e o do time",text:'Minha Biblioteca guarda seus snippets e respostas prontas. A Central de Links re\xFAne SOPs e ferramentas, os Avisos trazem disponibilidade BAU, e os Fusos Hor\xE1rios respondem "que horas s\xE3o pra ele agora?".'},{icon:"\u{1F6DF}",title:"Nada se perde",text:"O que voc\xEA digita \xE9 salvo sozinho a cada poucos segundos, e d\xE1 pra estacionar um caso no meio e retomar de onde parou. Fechar a aba sem querer n\xE3o custa mais nada. Bom trabalho!"}],es:[{icon:"\u{1F680}",title:"Bienvenido a Case Wizard",text:"Una capa de productividad que funciona sobre el CRM. No reemplaza nada de lo que ya usas \u2014 solo quita el trabajo repetitivo del camino."},{icon:"\u2328\uFE0F",title:"Todo empieza en dos lugares",text:"La p\xEDldora flotante, siempre en la esquina de la pantalla, abre cualquier m\xF3dulo con un clic. Y Ctrl+K (o \u2318K) abre la paleta de comandos: escribe lo que buscas y ve directo, sin soltar el teclado."},{icon:"\u{1F4DD}",title:"Notas y BAU sin rehacer trabajo",text:"Case Notes arma la nota t\xE9cnica del caso a partir del estado y de las tareas que marques. BAU Form se encarga de las solicitudes de creaci\xF3n y descarte, paso a paso."},{icon:"\u{1F4AC}",title:"A la hora de hablar con el cliente",text:"Email Assistant sugiere plantillas que leen el contexto del caso, y Call Script te gu\xEDa por la llamada con un guion interactivo \u2014 sin nada memorizado."},{icon:"\u{1F4DA}",title:"Tu material y el del equipo",text:'Mi Biblioteca guarda tus fragmentos y respuestas listas. La Central de Enlaces re\xFAne SOPs y herramientas, los Avisos traen la disponibilidad BAU, y las Zonas Horarias responden "\xBFqu\xE9 hora es para \xE9l ahora?".'},{icon:"\u{1F6DF}",title:"Nada se pierde",text:"Lo que escribes se guarda solo cada pocos segundos, y puedes aparcar un caso a mitad de camino y retomarlo donde lo dejaste. Cerrar la pesta\xF1a sin querer ya no cuesta nada. \xA1Buen trabajo!"}],en:[{icon:"\u{1F680}",title:"Welcome to Case Wizard",text:"A productivity layer that runs on top of the CRM. It replaces nothing you already use \u2014 it just gets the repetitive work out of your way."},{icon:"\u2328\uFE0F",title:"It all starts in two places",text:"The floating pill, always in the corner of the screen, opens any module with one click. And Ctrl+K (or \u2318K) opens the command palette: type what you want and go straight there, without leaving the keyboard."},{icon:"\u{1F4DD}",title:"Notes and BAU without rework",text:"Case Notes builds the case's technical note from the status and the tasks you select. BAU Form handles creation and discard requests, step by step."},{icon:"\u{1F4AC}",title:"When it is time to talk to the customer",text:"Email Assistant suggests templates that read the case context, and Call Script guides you through the call with an interactive script \u2014 nothing to memorize."},{icon:"\u{1F4DA}",title:"Your material and the team's",text:'My Library keeps your snippets and ready-made replies. The Links Central gathers SOPs and tools, Broadcast brings BAU availability, and Timezones answer "what time is it for them right now?".'},{icon:"\u{1F6DF}",title:"Nothing gets lost",text:"What you type is saved on its own every few seconds, and you can park a case halfway through and pick it up where you left off. Closing the tab by accident no longer costs you anything. Have a good shift!"}]},Zc={pt:{next:"Pr\xF3ximo",start:"Come\xE7ar \u{1F680}",skip:"Pular",skipConfirm:"Pular a apresenta\xE7\xE3o? Voc\xEA pode explorar tudo pelo menu flutuante.",readyToast:"Tudo pronto! Use o menu flutuante ou Ctrl+K."},es:{next:"Siguiente",start:"Empezar \u{1F680}",skip:"Omitir",skipConfirm:"\xBFOmitir la presentaci\xF3n? Puedes explorar todo desde el men\xFA flotante.",readyToast:"\xA1Todo listo! Usa el men\xFA flotante o Ctrl+K."},en:{next:"Next",start:"Get started \u{1F680}",skip:"Skip",skipConfirm:"Skip the walkthrough? You can explore everything from the floating menu.",readyToast:"All set! Use the floating menu or Ctrl+K."}},ng=[{lang:"pt",flag:"\u{1F1E7}\u{1F1F7}",name:"Portugu\xEAs"},{lang:"es",flag:"\u{1F1EA}\u{1F1F8}",name:"Espa\xF1ol"},{lang:"en",flag:"\u{1F1FA}\u{1F1F8}",name:"English"}];function ig(){return new Promise(e=>{let t="cw-ob-lang-styles";if(!document.getElementById(t)){let d=document.createElement("style");d.id=t,d.textContent=`
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
            `,document.head.appendChild(d)}let a=document.createElement("div");a.className="cw-ob-lang-overlay",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","Choose your language");let o=document.createElement("div");o.className="cw-ob-lang-card",o.innerHTML=`
            <div class="cw-ob-lang-icon">\u{1F310}</div>
            <h2 class="cw-ob-lang-title">Case Wizard</h2>
            <p class="cw-ob-lang-sub">
                Escolha o idioma da interface<br>
                Elige el idioma de la interfaz<br>
                Choose your interface language
            </p>
            <div class="cw-ob-lang-options"></div>
        `;let n=o.querySelector(".cw-ob-lang-options"),i=ng.filter(d=>mn.includes(d.lang)).map(d=>{let c=document.createElement("button");return c.type="button",c.className="cw-ob-lang-btn",c.dataset.lang=d.lang,c.innerHTML=`<span class="flag" aria-hidden="true">${d.flag}</span><span>${d.name}</span>`,c.onclick=()=>s(d.lang),n.appendChild(c),c}),r=!1;function s(d){r||(r=!0,No(d),document.removeEventListener("keydown",l,!0),a.classList.remove("open"),setTimeout(()=>a.remove(),320),e(d))}function l(d){if(d.key!=="ArrowDown"&&d.key!=="ArrowUp")return;d.preventDefault();let c=i.indexOf(document.activeElement),g=d.key==="ArrowDown"?1:-1,u=(c<0?0:c+g+i.length)%i.length;i[u].focus()}document.addEventListener("keydown",l,!0),a.appendChild(o),document.body.appendChild(a),requestAnimationFrame(()=>{a.classList.add("open"),(i.find(c=>c.dataset.lang===ge())||i[0])?.focus()})})}function ed(){return localStorage.getItem(Qc)?Promise.resolve():(localStorage.setItem(Qc,"true"),ig().then(rg))}function rg(e){let t=Jc[e]||Jc.pt,a=Zc[e]||Zc.pt;return new Promise(o=>{Hn({slides:t,idPrefix:"cw-onboarding",nextLabel:a.next,finalLabel:a.start,skipLabel:a.skip,onSkip:()=>ot(a.skipConfirm),onClose:()=>{ne(a.readyToast),o()}})})}var Un={version:"v6.6.0",title:{pt:"Case Wizard v6.6.0",es:"Case Wizard v6.6.0",en:"Case Wizard v6.6.0"},slides:[{icon:"\u{1F4CB}",title:{pt:"Pre-call Checklist, direto na nota",es:"Pre-call Checklist, directo en la nota",en:"Pre-call Checklist, straight into the note"},text:{pt:'Um bot\xE3o novo na p\xEDlula (e no Ctrl+K) abre um formul\xE1rio curto que escreve o bloco "Pre-call checklist" no card de nota do caso \u2014 ou s\xF3 copia. Tasks, telefone, e-mail, site e CID que a tela do caso j\xE1 mostra chegam preenchidos e marcados como Auto: confira antes de gerar. A nota sai sempre em ingl\xEAs, que \xE9 o que a auditoria procura.',es:'Un bot\xF3n nuevo en la p\xEDldora (y en Ctrl+K) abre un formulario corto que escribe el bloque "Pre-call checklist" en la tarjeta de nota del caso \u2014 o solo lo copia. Las tasks, el tel\xE9fono, el correo, el sitio y el CID que la pantalla del caso ya muestra llegan completados y marcados como Auto: rev\xEDsalos antes de generar. La nota sale siempre en ingl\xE9s, que es lo que busca la auditor\xEDa.',en:`A new button on the pill (and in Ctrl+K) opens a short form that writes the "Pre-call checklist" block into the case's note card \u2014 or just copies it. The tasks, phone, email, website and CID the case screen already shows arrive pre-filled and tagged Auto: check them before generating. The note is always written in English, which is what the audit looks for.`}},{icon:"\u{1F517}",title:{pt:"Links ganhou uma home",es:"Links ahora tiene una p\xE1gina de inicio",en:"Links now has a home screen"},text:{pt:'Ao abrir Links, voc\xEA v\xEA at\xE9 3 destaques do momento e, logo abaixo, seus Favoritos, os Recentes e o que saiu do destaque. A busca agora acha tamb\xE9m pela descri\xE7\xE3o e pelo nome da categoria, sem depender de acento, e um painel de pr\xE9via mostra "O que \xE9" e "Quando usar" ao passar o mouse. Favoritos e recentes ficam salvos na nuvem, ent\xE3o acompanham voc\xEA.',es:'Al abrir Links ves hasta 3 destacados del momento y, justo debajo, tus Favoritos, los Recientes y lo que sali\xF3 de destacados. La b\xFAsqueda ahora tambi\xE9n encuentra por descripci\xF3n y por nombre de categor\xEDa, sin depender de las tildes, y un panel de vista previa muestra "Qu\xE9 es" y "Cu\xE1ndo usar" al pasar el mouse. Favoritos y recientes se guardan en la nube, as\xED que te acompa\xF1an.',en:'When you open Links you see up to 3 current highlights and, right below, your Favorites, Recent and what is no longer featured. Search now also matches the description and the category name, without depending on accents, and a preview panel shows "What it is" and "When to use" as you hover. Favorites and recents are saved in the cloud, so they follow you.'}},{icon:"\u{1F4D6}",title:{pt:"A documenta\xE7\xE3o est\xE1 a um clique",es:"La documentaci\xF3n est\xE1 a un clic",en:"The documentation is one click away"},text:{pt:'O "?" do cabe\xE7alho de cada m\xF3dulo e a se\xE7\xE3o Suporte & Feedback, em Configura\xE7\xF5es, agora levam ao deck de documenta\xE7\xE3o do Case Wizard. Travou num m\xF3dulo? Comece por ele.',es:'El "?" del encabezado de cada m\xF3dulo y la secci\xF3n Soporte y Comentarios, en Configuraci\xF3n, ahora llevan a la presentaci\xF3n de documentaci\xF3n de Case Wizard. \xBFTe trabaste en un m\xF3dulo? Empieza por ah\xED.',en:`The "?" in each module's header and the Support & Feedback section in Settings now open the Case Wizard documentation deck. Stuck in a module? Start there.`}}]};var Wn="cw_last_version",td={pt:{updateBadge:e=>`Atualiza\xE7\xE3o ${e}`,nextBtn:"Pr\xF3ximo",doneBtn:"Entendi, vamos l\xE1! \u{1F44D}",updatedToast:e=>`Case Wizard atualizado para ${e}!`},es:{updateBadge:e=>`Actualizaci\xF3n ${e}`,nextBtn:"Siguiente",doneBtn:"\xA1Entendido, vamos! \u{1F44D}",updatedToast:e=>`\xA1Case Wizard actualizado a ${e}!`},en:{updateBadge:e=>`Update ${e}`,nextBtn:"Next",doneBtn:"Got it, let\u2019s go! \u{1F44D}",updatedToast:e=>`Case Wizard updated to ${e}!`}};function Vn(e){let t=ge();return td[t]?.[e]??td.pt[e]}function ad(e){let t=localStorage.getItem(Wn);if(!t){localStorage.setItem(Wn,e);return}if(t!==e){if(Un.version!==e){console.warn(`[changelog] APP_VERSION \xE9 ${e} mas RELEASE_NOTES.version \xE9 ${Un.version}. Modal suprimido at\xE9 os dois baterem (veja src/modules/changelog/changelog-data.js).`),localStorage.setItem(Wn,e);return}return lg(e)}}function sg(){let e=ge(),t=a=>a?.[e]??a?.pt??"";return(Un.slides||[]).map(a=>({...a,title:t(a.title),text:t(a.text)}))}function lg(e){let t=sg();return new Promise(a=>{t.length||a(),Hn({slides:t,idPrefix:"cw-changelog",badge:Vn("updateBadge")(e),nextLabel:Vn("nextBtn"),finalLabel:Vn("doneBtn"),onClose:()=>{localStorage.setItem(Wn,e),ne(Vn("updatedToast")(e)),a()}})})}var cg={pt:{title:"Lembrete de qualidade",text:"Siga as diretrizes de QA e o SOP do segmento do caso. O Case Wizard apenas auxilia no preenchimento; a qualidade do tratamento \xE9 responsabilidade do agente.",ok:"Entendi"},es:{title:"Recordatorio de calidad",text:"Sigue las directrices de QA y el SOP del segmento del caso. Case Wizard solo ayuda a rellenar; la calidad del tratamiento es responsabilidad del agente.",ok:"Entendido"},en:{title:"Quality reminder",text:"Follow the QA guidelines and the SOP for the case segment. Case Wizard only helps with filling things in; handling the case to the quality standard is the agent\u2019s responsibility.",ok:"Got it"}},pr=Qa(cg),od="cw-qa-notice",nd="cw-qa-notice-style",dg=12e3,pg=4e3,id=200;function ug(){if(document.getElementById(nd))return;let e=document.createElement("style");e.id=nd,e.textContent=`
        .cw-qa-notice {
            position: fixed; left: 24px; bottom: 24px;
            z-index: ${ft.TOAST};
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
            transition-duration: ${id}ms;
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
    `,document.head.appendChild(e)}function rd(){if(document.getElementById(od))return;ug();let e=document.createElement("aside");e.id=od,e.className="cw-qa-notice",e.setAttribute("role","status"),e.innerHTML=`
        <svg class="cw-qa-notice-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z"/>
        </svg>
        <div>
            <p class="cw-qa-notice-title"></p>
            <p class="cw-qa-notice-text"></p>
        </div>
        <div class="cw-qa-notice-actions"><button type="button" class="cw-qa-notice-btn"></button></div>
    `;let t=e.querySelector(".cw-qa-notice-btn"),a=()=>{e.querySelector(".cw-qa-notice-title").textContent=pr("title"),e.querySelector(".cw-qa-notice-text").textContent=pr("text"),t.textContent=pr("ok")};a();let o=je(a),n=dg,i=0,r=null,s=0,l=!1;function d(){i=Date.now(),r=setTimeout(b,n)}function c(){clearTimeout(r),n=Math.max(n-(Date.now()-i),pg)}let g=()=>{s++===0&&c()},u=()=>{s>0&&--s===0&&!l&&d()};function b(){l||(l=!0,clearTimeout(r),o(),e.classList.remove("open"),e.classList.add("closing"),setTimeout(()=>e.remove(),id))}e.addEventListener("mouseenter",g),e.addEventListener("mouseleave",u),e.addEventListener("focusin",g),e.addEventListener("focusout",u),t.addEventListener("click",b),d(),document.body.appendChild(e),requestAnimationFrame(()=>requestAnimationFrame(()=>e.classList.add("open"))),y.playNotice()}var Ia=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"br",name:"Brasil \u2014 Bras\xEDlia",flag:"\u{1F1E7}\u{1F1F7}",zone:"America/Sao_Paulo",label:"S\xE3o Paulo",region:"sa",home:!0},{id:"br-am",name:"Brasil \u2014 Amazonas",flag:"\u{1F1E7}\u{1F1F7}",zone:"America/Manaus",label:"Manaus",region:"sa",home:!0},{id:"br-ac",name:"Brasil \u2014 Acre",flag:"\u{1F1E7}\u{1F1F7}",zone:"America/Rio_Branco",label:"Rio Branco",region:"sa",home:!0},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"us-et",name:"EUA \u2014 Eastern",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/New_York",label:"Nova York",region:"us"},{id:"us-ct",name:"EUA \u2014 Central",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Chicago",label:"Chicago",region:"us"},{id:"us-mt",name:"EUA \u2014 Mountain",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Denver",label:"Denver",region:"us"},{id:"us-az",name:"EUA \u2014 Arizona",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Phoenix",label:"Phoenix",region:"us"},{id:"us-pt",name:"EUA \u2014 Pacific",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Los_Angeles",label:"Los Angeles",region:"us"},{id:"us-ak",name:"EUA \u2014 Alaska",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Anchorage",label:"Anchorage",region:"us"},{id:"us-hi",name:"EUA \u2014 Hava\xED",flag:"\u{1F1FA}\u{1F1F8}",zone:"Pacific/Honolulu",label:"Honolulu",region:"us"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],cd={es:{es:{name:"Espa\xF1a"},bo:{name:"Bolivia"},co:{name:"Colombia"},ec:{name:"Ecuador"},py:{name:"Paraguay",label:"Asunci\xF3n"},uy:{name:"Uruguay",label:"Montevideo"},ni:{name:"Nicaragua",label:"Managua"},pr:{name:"Puerto Rico"},gt:{label:"C. de Guatemala"},pa:{label:"C. de Panam\xE1"},"us-et":{name:"EE. UU. \u2014 Eastern",label:"Nueva York"},"us-ct":{name:"EE. UU. \u2014 Central"},"us-mt":{name:"EE. UU. \u2014 Mountain"},"us-az":{name:"EE. UU. \u2014 Arizona"},"us-pt":{name:"EE. UU. \u2014 Pacific"},"us-ak":{name:"EE. UU. \u2014 Alaska"},"us-hi":{name:"EE. UU. \u2014 Haw\xE1i"}},en:{pt:{label:"Lisbon"},es:{name:"Spain"},br:{name:"Brazil \u2014 Bras\xEDlia"},"br-am":{name:"Brazil \u2014 Amazonas"},"br-ac":{name:"Brazil \u2014 Acre"},bo:{name:"Bolivia"},co:{name:"Colombia"},ec:{name:"Ecuador"},py:{name:"Paraguay",label:"Asunci\xF3n"},uy:{name:"Uruguay",label:"Montevideo"},"us-et":{name:"USA \u2014 Eastern",label:"New York"},"us-ct":{name:"USA \u2014 Central"},"us-mt":{name:"USA \u2014 Mountain"},"us-az":{name:"USA \u2014 Arizona"},"us-pt":{name:"USA \u2014 Pacific"},"us-ak":{name:"USA \u2014 Alaska"},"us-hi":{name:"USA \u2014 Hawaii"},mx:{name:"Mexico"},gt:{label:"Guatemala City"},ni:{name:"Nicaragua",label:"Managua"},pa:{name:"Panama",label:"Panama City"},do:{name:"Dominican Rep."},pr:{name:"Puerto Rico"}}};function Yn(e,t){return cd[t]?.[e.id]?.name??e.name}function wo(e,t){return cd[t]?.[e.id]?.label??e.label}var Na="America/Sao_Paulo";function sd(e,t){let a=new Intl.DateTimeFormat("en-US",{timeZone:e,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}),o={};a.formatToParts(t).forEach(i=>{o[i.type]=i.value});let n=Date.UTC(Number(o.year),Number(o.month)-1,Number(o.day),Number(o.hour)%24,Number(o.minute),Number(o.second));return Math.round((n-t.getTime())/6e4)}function mg(e,t){let a=String(t||"").match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);if(!a)return null;let[,o,n,i,r,s]=a.map(Number),l=Date.UTC(o,n-1,i,r,s),d=sd(e,new Date(l));return d=sd(e,new Date(l-d*6e4)),d}function gg(e){let t=e<0?"-":"+",a=Math.abs(e),o=String(Math.floor(a/60)).padStart(2,"0"),n=String(a%60).padStart(2,"0");return`${t}${o}:${n}`}function ur(e,t){if(!e)return"";if(/[+-]\d{2}:\d{2}$/.test(e)||/Z$/.test(e))return e;let a=mg(t,e);return a===null?e:`${e.slice(0,16)}${gg(a)}`}var ld={"brazil/east":"America/Sao_Paulo","brazil/west":"America/Manaus","brazil/acre":"America/Rio_Branco","us/eastern":"America/New_York","us/central":"America/Chicago","us/mountain":"America/Denver","us/arizona":"America/Phoenix","us/pacific":"America/Los_Angeles","us/alaska":"America/Anchorage","us/hawaii":"Pacific/Honolulu","america/argentina/buenos_aires":"America/Argentina/Buenos_Aires","mexico/general":"America/Mexico_City"};function mr(e){let t=String(e||"").trim();if(!t)return null;let a=t.toLowerCase();if(ld[a])return ld[a];let o=Ia.find(n=>n.zone.toLowerCase()===a);return o?o.zone:null}var dd="cw_timezone_pinned",ba=e=>Yn(e,ge()),gr=e=>wo(e,ge()),pd={pt:{headerDesc:"Monitoramento global e planejamento de chamadas.",tabLive:"Monitoramento",tabPlan:"Planejador",searchPlaceholder:"Buscar cidade ou pa\xEDs...",noLocationFound:"Nenhum local encontrado",unpin:"Desafixar",pin:"Fixar",statusOpen:"Aberto",statusOpening:"Abrindo",statusClosing:"Fechando",statusClosed:"Fechado",whereIsClient:"Onde est\xE1 o cliente?",you:"Voc\xEA",yourTimezone:"Bras\xEDlia (GMT-3)",client:"Cliente",dragToSimulate:"Arraste para simular o hor\xE1rio:",idealBusinessHours:"Hor\xE1rio Comercial Ideal",limitHours:"Hor\xE1rio Limite (Aten\xE7\xE3o)",outOfHours:"Fora de Hor\xE1rio",filters:{all:"Todos",sa:"Am\xE9rica do Sul",us:"Estados Unidos",na:"Norte & Central",eu:"Europa"}},es:{headerDesc:"Monitoreo global y planificaci\xF3n de llamadas.",tabLive:"Monitoreo",tabPlan:"Planificador",searchPlaceholder:"Buscar ciudad o pa\xEDs...",noLocationFound:"No se encontr\xF3 ning\xFAn lugar",unpin:"Desanclar",pin:"Anclar",statusOpen:"Abierto",statusOpening:"Abriendo",statusClosing:"Cerrando",statusClosed:"Cerrado",whereIsClient:"\xBFD\xF3nde est\xE1 el cliente?",you:"T\xFA",yourTimezone:"Brasilia (GMT-3)",client:"Cliente",dragToSimulate:"Arrastra para simular el horario:",idealBusinessHours:"Horario Comercial Ideal",limitHours:"Horario L\xEDmite (Atenci\xF3n)",outOfHours:"Fuera de Horario",filters:{all:"Todos",sa:"Am\xE9rica del Sur",us:"Estados Unidos",na:"Norte y Central",eu:"Europa"}},en:{headerDesc:"Global monitoring and call planning.",tabLive:"Monitoring",tabPlan:"Planner",searchPlaceholder:"Search for a city or country...",noLocationFound:"No location found",unpin:"Unpin",pin:"Pin",statusOpen:"Open",statusOpening:"Opening",statusClosing:"Closing",statusClosed:"Closed",whereIsClient:"Where is the customer?",you:"You",yourTimezone:"Bras\xEDlia (GMT-3)",client:"Customer",dragToSimulate:"Drag to simulate the time:",idealBusinessHours:"Ideal Business Hours",limitHours:"Cutoff Hours (Caution)",outOfHours:"Outside Business Hours",filters:{all:"All",sa:"South America",us:"United States",na:"North & Central",eu:"Europe"}}};function et(e){let t=ge();return pd[t]?.[e]??pd.pt[e]}var fr=Ia.filter(e=>!e.home),ud=[{id:"all"},{id:"sa"},{id:"us"},{id:"na"},{id:"eu"}];function fg(){if(document.getElementById("cw-timezone-interactive-styles"))return;let e=document.createElement("style");e.id="cw-timezone-interactive-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function md(){fg();let e="v2.2 Pro",t=!1,a=null,o="mx",n=JSON.parse(localStorage.getItem(dd)||"[]"),i="",r="all",s=new Date;s.setHours(14,0,0,0);let l={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},d={container:{display:"flex",flexDirection:"column",height:"100%",background:l.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:l.surface,borderBottom:`1px solid ${l.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:l.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:l.primary,borderBottomColor:l.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:l.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:l.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${l.border}`,background:l.surface,color:l.textSub,transition:"all 0.2s"},chipActive:{background:l.primaryBg,color:l.primary,borderColor:l.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:l.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${l.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:l.surface,border:`1px solid ${l.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:l.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},c=document.createElement("div");c.id="timezone-popup",c.classList.add("cw-module-window"),Object.assign(c.style,bt,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let g={popup:c},u=rt(c,"Time Zone Traveler",e,et("headerDesc"),g,()=>he());c.appendChild(u);let b=document.createElement("div");Object.assign(b.style,d.container),c.appendChild(b);let L=document.createElement("div");Object.assign(L.style,d.tabHeader);let A=document.createElement("div");A.textContent=et("tabLive"),A.className="tz-tab-btn",A.tabIndex=0,A.setAttribute("role","tab"),Object.assign(A.style,d.tabBtn,d.tabActive);let C=document.createElement("div");C.textContent=et("tabPlan"),C.className="tz-tab-btn",C.tabIndex=0,C.setAttribute("role","tab"),Object.assign(C.style,d.tabBtn),[A,C].forEach(ue=>{ue.addEventListener("keydown",ce=>{(ce.key==="Enter"||ce.key===" ")&&(ce.preventDefault(),ue.click())})}),L.appendChild(A),L.appendChild(C),b.appendChild(L);let z=document.createElement("div");Object.assign(z.style,d.toolbar);let G=document.createElement("div");Object.assign(G.style,d.searchInputWrapper);let R=document.createElement("div");R.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(R.style,d.searchIcon);let O=document.createElement("input");O.placeholder=et("searchPlaceholder"),Object.assign(O.style,d.searchInput),O.onfocus=()=>{O.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",O.style.borderColor="rgba(26,115,232,0.3)"},O.onblur=()=>{O.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",O.style.borderColor="transparent"},O.oninput=ue=>{i=ue.target.value.toLowerCase(),j()},G.appendChild(R),G.appendChild(O),z.appendChild(G);let de=document.createElement("div");Object.assign(de.style,d.chipsRow),ud.forEach(ue=>{let ce=document.createElement("div");ce.textContent=et("filters")[ue.id],ce.id=`tz-filter-${ue.id}`,ce.className="tz-chip",ce.tabIndex=0,ce.setAttribute("role","button"),Object.assign(ce.style,d.chip),ue.id===r&&Object.assign(ce.style,d.chipActive),ce.onclick=()=>{y.playClick(),r=ue.id,Array.from(de.children).forEach(le=>{Object.assign(le.style,d.chip)}),Object.assign(ce.style,d.chipActive),j()},ce.addEventListener("keydown",le=>{(le.key==="Enter"||le.key===" ")&&(le.preventDefault(),ce.click())}),de.appendChild(ce)}),z.appendChild(de),b.appendChild(z);let te=document.createElement("div");Object.assign(te.style,d.listContainer);let re=document.createElement("style");re.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",b.appendChild(re);let ee=document.createElement("div");Object.assign(ee.style,d.plannerWrapper,{display:"none"}),b.appendChild(te),b.appendChild(ee),A.onclick=()=>w("live"),C.onclick=()=>w("plan");function w(ue){y.playClick(),ue==="live"?(Object.assign(A.style,d.tabActive),Object.assign(C.style,d.tabBtn),C.style.borderBottomColor="transparent",A.setAttribute("aria-selected","true"),C.setAttribute("aria-selected","false"),te.style.display="flex",z.style.display="flex",ee.style.display="none",Z()):(Object.assign(C.style,d.tabActive),Object.assign(A.style,d.tabBtn),A.style.borderBottomColor="transparent",ee.style.display="flex",te.style.display="none",z.style.display="none",fe(),F())}function S(ue){return ue>=9&&ue<17?{color:l.success,bg:l.successBg,label:et("statusOpen"),icon:"\u{1F7E2}"}:ue>=8&&ue<9?{color:l.warning,bg:l.warningBg,label:et("statusOpening"),icon:"\u{1F7E1}"}:ue>=17&&ue<19?{color:l.warning,bg:l.warningBg,label:et("statusClosing"),icon:"\u{1F7E1}"}:{color:l.textSub,bg:"#F1F3F4",label:et("statusClosed"),icon:"\u{1F534}"}}function D(ue){n.includes(ue)?n=n.filter(ce=>ce!==ue):n.push(ue),localStorage.setItem(dd,JSON.stringify(n)),j(),y.playClick()}function j(){te.innerHTML="";let ue=new Date,ce=fr.filter(xe=>{let E=ba(xe).toLowerCase().includes(i)||gr(xe).toLowerCase().includes(i),K=r==="all"||xe.region===r;return E&&K});if(ce.sort((xe,E)=>{let K=n.includes(xe.id),se=n.includes(E.id);return K&&!se?-1:!K&&se?1:ba(xe).localeCompare(ba(E))}),ce.length===0){te.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">${et("noLocationFound")}</div>
                </div>
            `;return}ce.forEach(xe=>{let E=n.includes(xe.id),K=ue.toLocaleTimeString(Oa(),{timeZone:xe.zone,hour:"2-digit",minute:"2-digit"}),se=parseInt(K.split(":")[0]),V=S(se),q=se<6||se>18,T=document.createElement("div");T.className="tz-hub-card",T.tabIndex=0,T.setAttribute("role","button"),T.setAttribute("aria-label",`${ba(xe)}, ${K}`),Object.assign(T.style,d.hubCard),E&&Object.assign(T.style,d.hubCardPinned);let H=E?"\u2605":"\u2606",ie=E?"#F9AB00":"#DADCE0";T.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn tz-pin-btn" tabindex="0" role="button" aria-label="${et(E?"unpin":"pin")} ${ba(xe)}" style="cursor:pointer; font-size:22px; color:${ie}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%;">${H}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${xe.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${l.text}; letter-spacing:-0.2px;">${ba(xe)}</div>
                        <div style="font-size:12px; color:${l.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${q?"\u{1F319}":"\u2600\uFE0F"} ${gr(xe)}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${l.text}; font-family:'Google Sans', sans-serif;">${K}</div>
                    <div style="font-size:11px; font-weight:600; color:${V.color}; background:${V.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${V.label}
                    </div>
                </div>
            `;let P=T.querySelector(".cw-pin-btn");P.onclick=Q=>{Q.stopPropagation(),D(xe.id)},P.addEventListener("keydown",Q=>{(Q.key==="Enter"||Q.key===" ")&&(Q.preventDefault(),Q.stopPropagation(),D(xe.id))}),T.onclick=()=>{o=xe.id,w("plan")},T.addEventListener("keydown",Q=>{(Q.key==="Enter"||Q.key===" ")&&Q.target===T&&(Q.preventDefault(),T.click())}),te.appendChild(T)});let le=document.createElement("div");le.style.height="20px",le.style.width="100%",te.appendChild(le)}function F(){ee.innerHTML="";let ue=document.createElement("div"),ce=document.createElement("label");ce.textContent=et("whereIsClient"),ce.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let le=document.createElement("select");Object.assign(le.style,Ds),le.style.padding="14px",[...fr].sort((M,f)=>ba(M).localeCompare(ba(f))).forEach(M=>{let f=document.createElement("option");f.value=M.id,f.textContent=`${M.flag} ${ba(M)} (${M.zone})`,M.id===o&&(f.selected=!0),le.appendChild(f)}),le.onchange=M=>{o=M.target.value,N(),y.playClick()},ue.appendChild(ce),ue.appendChild(le),ee.appendChild(ue);let E=document.createElement("div");Object.assign(E.style,d.timeComparisonRow);let K=document.createElement("div");Object.assign(K.style,d.timeCard),K.style.backgroundColor="#F8FAFF",K.style.borderColor="#E8F0FE",K.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} ${et("you")}</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">${et("yourTimezone")}</div>
        `;let se=document.createElement("div");Object.assign(se.style,d.timeCard),se.style.backgroundColor="#FFF8E1",se.style.borderColor="#FEF7E0",se.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">${et("client")}</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,E.appendChild(K),E.appendChild(se),ee.appendChild(E);let V=document.createElement("div");V.id="cw-planner-status",Object.assign(V.style,d.statusBadge),ee.appendChild(V);let q=document.createElement("div");Object.assign(q.style,{padding:"0 4px",marginTop:"12px"});let T=document.createElement("div");T.textContent=et("dragToSimulate"),T.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let H=document.createElement("div");Object.assign(H.style,d.timelineContainer);let ie=document.createElement("div");Object.assign(ie.style,d.timelineTrack);let P=document.createElement("div");Object.assign(P.style,d.dayZone),ie.appendChild(P);let Q=document.createElement("input");Q.type="range",Q.min="0",Q.max="1439",Q.step="15",Q.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let pe=document.createElement("div");pe.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",pe.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",H.appendChild(ie),H.appendChild(Q),H.appendChild(pe),q.appendChild(T),q.appendChild(H),ee.appendChild(q);let v=K.querySelector("#cw-time-input-br"),h=se.querySelector("#cw-time-display-client"),p=se.querySelector("#cw-client-label");function N(){let M=fr.find(U=>U.id===o);p.textContent=`${M.flag} ${gr(M)} (${M.zone})`;let f=s.getHours(),x=s.getMinutes(),_=`${String(f).padStart(2,"0")}:${String(x).padStart(2,"0")}`;v.value=_,Q.value=f*60+x;let k=s.toLocaleTimeString(Oa(),{timeZone:M.zone,hour:"2-digit",minute:"2-digit"});h.textContent=k;let W=parseInt(k.split(":")[0]);W>=9&&W<17?(V.style.background=l.successBg,V.style.color=l.success,V.innerHTML=`<span style="font-size:16px">\u2705</span> ${et("idealBusinessHours")}`):W>=8&&W<9||W>=17&&W<19?(V.style.background=l.warningBg,V.style.color=l.warning,V.innerHTML=`<span style="font-size:16px">\u26A0\uFE0F</span> ${et("limitHours")}`):(V.style.background=l.errorBg,V.style.color=l.error,V.innerHTML=`<span style="font-size:16px">\u26D4</span> ${et("outOfHours")}`)}Q.oninput=M=>{let f=parseInt(M.target.value);s.setHours(Math.floor(f/60)),s.setMinutes(f%60),N()},v.oninput=M=>{let[f,x]=M.target.value.split(":");f&&x&&(s.setHours(parseInt(f)),s.setMinutes(parseInt(x)),N())},N()}function Z(){j(),a||(a=setInterval(j,6e4))}function fe(){a&&(clearInterval(a),a=null)}function he(){t=!ht(c),dt(t,c,"cw-btn-timezone"),t?(Qe(),w("live")):(Je(),fe())}return document.body.appendChild(c),je(()=>{let ue=c.querySelector(".cw-help-description");ue&&(ue.textContent=et("headerDesc")),A.textContent=et("tabLive"),C.textContent=et("tabPlan"),O.placeholder=et("searchPlaceholder"),Array.from(de.children).forEach(ce=>{let le=ud.find(xe=>`tz-filter-${xe.id}`===ce.id);le&&(ce.textContent=et("filters")[le.id])}),te.style.display!=="none"&&j(),ee.style.display!=="none"&&F()}),he}var gd={pt:{headerTitle:"Minha Biblioteca",headerDesc:"Gerencie seus snippets, textos e templates.",mediaTag:"M\xEDdia",tabs:{general:"Geral",note:"Notas",email:"Emails"},searchPlaceholder:"Buscar por t\xEDtulo ou conte\xFAdo...",newItem:"Novo item",cancel:"Cancelar",recentlyUsed:"\u{1F552} Usados recentemente",nothingFound:"Nada encontrado",nothingHereYet:"Nada aqui ainda",noItemMatches:e=>`Nenhum item bate com "${e}" nesta aba.`,clickPlusToStart:"Clique no + para come\xE7ar sua cole\xE7\xE3o.",copy:"Copiar",moreActions:"Mais a\xE7\xF5es",edit:"Editar",delete:"Excluir",deleteConfirm:e=>`Excluir "${e}"?`,itemDeletedToast:"Item exclu\xEDdo.",copiedToast:"Copiado!",titleLabel:"T\xEDtulo / Nome",subjectLabel:"Assunto do Email",contentLabel:"Conte\xFAdo",emailBodyLabel:"Corpo do Email (HTML)",noteTextLabel:"Texto da Nota",editItemTitle:"Editar Item",newItemTitle:"Novo Item",save:"Salvar",saveChanges:"Salvar Altera\xE7\xF5es",saving:"Salvando...",bold:"Negrito",italic:"It\xE1lico",codeFormat:"Formato c\xF3digo",insertImage:"Inserir imagem",imageUrlPrompt:"Cole a URL da imagem:",fillTitleAndContent:"Preencha t\xEDtulo e conte\xFAdo.",subjectRequired:"Assunto \xE9 obrigat\xF3rio para emails.",saveFailedNoUser:"N\xE3o foi poss\xEDvel salvar: usu\xE1rio n\xE3o identificado. Recarregue a p\xE1gina e tente de novo.",savedLocalOnly:"Salvo localmente \u2014 sem conex\xE3o com a nuvem no momento.",savedAndSynced:"Salvo e sincronizado!",saveError:"Erro ao salvar item."},es:{headerTitle:"Mi Biblioteca",headerDesc:"Gestiona tus snippets, textos y plantillas.",mediaTag:"Multimedia",tabs:{general:"General",note:"Notas",email:"Emails"},searchPlaceholder:"Buscar por t\xEDtulo o contenido...",newItem:"Nuevo elemento",cancel:"Cancelar",recentlyUsed:"\u{1F552} Usados recientemente",nothingFound:"No se encontr\xF3 nada",nothingHereYet:"Todav\xEDa no hay nada aqu\xED",noItemMatches:e=>`Ning\xFAn elemento coincide con "${e}" en esta pesta\xF1a.`,clickPlusToStart:"Haz clic en + para empezar tu colecci\xF3n.",copy:"Copiar",moreActions:"M\xE1s acciones",edit:"Editar",delete:"Eliminar",deleteConfirm:e=>`\xBFEliminar "${e}"?`,itemDeletedToast:"Elemento eliminado.",copiedToast:"\xA1Copiado!",titleLabel:"T\xEDtulo / Nombre",subjectLabel:"Asunto del Email",contentLabel:"Contenido",emailBodyLabel:"Cuerpo del Email (HTML)",noteTextLabel:"Texto de la Nota",editItemTitle:"Editar Elemento",newItemTitle:"Nuevo Elemento",save:"Guardar",saveChanges:"Guardar Cambios",saving:"Guardando...",bold:"Negrita",italic:"Cursiva",codeFormat:"Formato c\xF3digo",insertImage:"Insertar imagen",imageUrlPrompt:"Pega la URL de la imagen:",fillTitleAndContent:"Completa el t\xEDtulo y el contenido.",subjectRequired:"El asunto es obligatorio para emails.",saveFailedNoUser:"No se pudo guardar: usuario no identificado. Recarga la p\xE1gina e int\xE9ntalo de nuevo.",savedLocalOnly:"Guardado localmente \u2014 sin conexi\xF3n con la nube en este momento.",savedAndSynced:"\xA1Guardado y sincronizado!",saveError:"Error al guardar el elemento."},en:{headerTitle:"My Library",headerDesc:"Manage your snippets, texts and templates.",mediaTag:"Media",tabs:{general:"General",note:"Notes",email:"Emails"},searchPlaceholder:"Search by title or content...",newItem:"New item",cancel:"Cancel",recentlyUsed:"\u{1F552} Recently used",nothingFound:"Nothing found",nothingHereYet:"Nothing here yet",noItemMatches:e=>`No item matches "${e}" in this tab.`,clickPlusToStart:"Click + to start your collection.",copy:"Copy",moreActions:"More actions",edit:"Edit",delete:"Delete",deleteConfirm:e=>`Delete "${e}"?`,itemDeletedToast:"Item deleted.",copiedToast:"Copied!",titleLabel:"Title / Name",subjectLabel:"Email Subject",contentLabel:"Content",emailBodyLabel:"Email Body (HTML)",noteTextLabel:"Note Text",editItemTitle:"Edit Item",newItemTitle:"New Item",save:"Save",saveChanges:"Save Changes",saving:"Saving...",bold:"Bold",italic:"Italic",codeFormat:"Code format",insertImage:"Insert image",imageUrlPrompt:"Paste the image URL:",fillTitleAndContent:"Fill in the title and the content.",subjectRequired:"A subject is required for emails.",saveFailedNoUser:"Could not save: user not identified. Reload the page and try again.",savedLocalOnly:"Saved locally \u2014 no cloud connection at the moment.",savedAndSynced:"Saved and synced!",saveError:"Error saving the item."}};function Le(e){let t=ge();return gd[t]?.[e]??gd.pt[e]}var Nt={tabs:{general:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',note:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z"></path><path d="M15 3v6h6"></path><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>',email:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'},search:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',clear:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',copy:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',more:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8"></circle><circle cx="12" cy="12" r="1.8"></circle><circle cx="12" cy="19" r="1.8"></circle></svg>',edit:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',delete:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',add:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',back:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',bold:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>',italic:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>',code:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',image:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',media:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',empty:'<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>'},br=[{id:"general",icon:Nt.tabs.general},{id:"note",icon:Nt.tabs.note},{id:"email",icon:Nt.tabs.email}],hr="cw_lib_recent_v1",fd=4;function bg(e){try{let t=JSON.parse(localStorage.getItem(hr)||"[]");t=t.filter(a=>a!==e),t.unshift(e),t=t.slice(0,fd*3),localStorage.setItem(hr,JSON.stringify(t))}catch(t){console.warn("Erro ao salvar uso recente",t)}}function hg(e){try{let t=JSON.parse(localStorage.getItem(hr)||"[]");if(t.length===0)return[];let a=new Map(It.getSnippets(e).map(o=>[o.id,o]));return t.map(o=>a.get(o)).filter(Boolean).slice(0,fd)}catch{return[]}}function vg(){if(document.getElementById("cw-lib-styles-v2"))return;let e=document.createElement("style");e.id="cw-lib-styles-v2",e.textContent=`
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
    `,document.head.appendChild(e)}function bd(){let e="v2.0",t=!1,a="general",o="",n=null,i=null;vg();let r=document.createElement("div");r.id="library-popup",r.classList.add("cw-module-window"),Object.assign(r.style,bt,{right:"auto",left:"50%",width:"620px",height:"680px",maxHeight:"90vh",transform:"translateX(-50%) scale(0.05)"});let s={popup:r},l=rt(r,Le("headerTitle"),e,Le("headerDesc"),s,()=>q());r.appendChild(l);let d=l.querySelector("span"),c=document.createElement("div");c.className="cw-lib-container",r.appendChild(c);let g=document.createElement("div");g.className="cw-lib-toolbar";let u=document.createElement("div");u.className="cw-lib-search-wrap";let b=document.createElement("div");b.className="cw-lib-search-icon",b.innerHTML=Nt.search;let L=document.createElement("input");L.className="cw-lib-search no-drag",L.placeholder=Le("searchPlaceholder"),L.type="text";let A=document.createElement("div");A.className="cw-lib-search-clear cw-tactile",A.innerHTML=Nt.clear,u.append(b,L,A);let C=document.createElement("div");C.className="cw-lib-tabs",br.forEach(T=>{let H=document.createElement("div");H.className="cw-lib-tab"+(T.id===a?" active":""),H.id=`lib-tab-${T.id}`,H.innerHTML=`${T.icon}<span class="js-lib-tab-label">${Le("tabs")[T.id]}</span>`,H.onmouseenter=()=>y.playHover(),H.onclick=()=>F(T.id),C.appendChild(H)}),g.append(u,C),c.appendChild(g);let z=document.createElement("div");z.className="cw-lib-grid",c.appendChild(z);let G=document.createElement("div");G.className="cw-lib-fab cw-tactile",G.title=Le("newItem"),G.innerHTML=Nt.add,G.onclick=()=>xe(),c.appendChild(G);let R=document.createElement("div");R.className="cw-lib-sheet";let O=document.createElement("div");O.className="cw-lib-sheet-handle";let de=document.createElement("div");de.className="cw-lib-sheet-head";let te=document.createElement("div");te.className="cw-lib-sheet-back no-drag",te.innerHTML=Nt.back,te.title=Le("cancel"),te.onclick=E;let re=document.createElement("span");re.className="cw-lib-sheet-title",re.textContent=Le("newItemTitle"),de.append(te,re);let ee=document.createElement("div");ee.className="cw-lib-sheet-body";let w=document.createElement("div");w.className="cw-lib-sheet-foot";let S=document.createElement("button");S.className="cw-lib-save-btn no-drag",S.textContent=Le("save"),S.onclick=K,w.appendChild(S);let D=document.createElement("div");D.className="cw-lib-loading",D.innerHTML=`<div class="cw-lib-spinner"></div><div class="cw-lib-loading-text js-lib-saving">${Le("saving")}</div>`,R.append(O,de,ee,w,D),c.appendChild(R);let j=document.createElement("div");Object.assign(j.style,Yt),j.className="no-drag",r.appendChild(j),Xt(r,j),document.body.appendChild(r),document.addEventListener("mousedown",T=>{i&&!i.contains(T.target)&&Z()});function F(T){y.playClick(),a=T,br.forEach(H=>{document.getElementById(`lib-tab-${H.id}`).classList.toggle("active",H.id===T)}),ue()}function Z(){if(i){let T=i.querySelector(".cw-lib-menu");T&&T.classList.remove("open"),i.classList.remove("menu-open"),i=null}}function fe(T,H){return H?`${T.title} ${T.content}`.toLowerCase().includes(H):!0}function he(T){let H=document.createElement("div");H.className="cw-lib-recent-section",H.innerHTML=`<div class="cw-lib-recent-title">${Le("recentlyUsed")}</div>`;let ie=document.createElement("div");return ie.className="cw-lib-recent-row",T.forEach(P=>{let Q=document.createElement("div");Q.className="cw-lib-recent-chip",Q.tabIndex=0,Q.setAttribute("role","button"),Q.title=P.title,Q.innerHTML=`<span>${V(P.title)}</span>`,Q.onclick=()=>{y.playClick(),le(P)},Q.addEventListener("keydown",pe=>{(pe.key==="Enter"||pe.key===" ")&&(pe.preventDefault(),Q.click())}),ie.appendChild(Q)}),H.appendChild(ie),H}function ue(){Z(),z.innerHTML="";let T=o.trim().toLowerCase(),H=It.getSnippets(a).filter(ie=>fe(ie,T));if(!T){let ie=hg(a);ie.length>0&&z.appendChild(he(ie))}if(H.length===0){let ie=document.createElement("div");ie.className="cw-lib-empty";let P=T.length>0;ie.innerHTML=`
                <div style="opacity:0.5;">${Nt.empty}</div>
                <div class="cw-lib-empty-title">${Le(P?"nothingFound":"nothingHereYet")}</div>
                <div class="cw-lib-empty-sub">${P?Le("noItemMatches")(o.trim()):Le("clickPlusToStart")}</div>
            `,z.appendChild(ie);return}H.forEach(ie=>z.appendChild(ce(ie)))}function ce(T){let H=document.createElement("div");H.className="cw-lib-card"+(T.isCode?" is-code":"");let ie=T.content,P="";if(T.isRich){let h=document.createElement("div");h.innerHTML=T.content;let p=!!h.querySelector("img");ie=h.innerText.substring(0,200),p&&(P=`<span class="cw-lib-media-tag">${Nt.media} ${Le("mediaTag")}</span>`)}let Q=[T.isCode?'<span class="cw-lib-badge code">CODE</span>':"",a==="email"?'<span class="cw-lib-badge template">TEMPLATE</span>':""].join("");H.innerHTML=`
            <div class="cw-lib-card-head">
                <div class="cw-lib-card-title">${V(T.title)}</div>
                <div class="cw-lib-card-badges">${Q}</div>
            </div>
            ${P}
            <div class="cw-lib-card-preview${T.isCode?" code":""}">${V(ie)}</div>
            <div class="cw-lib-card-foot">
                <div class="cw-lib-icon-btn cw-act-copy cw-tactile" title="${Le("copy")}">${Nt.copy}</div>
                <div class="cw-lib-icon-btn cw-act-more cw-tactile" title="${Le("moreActions")}">${Nt.more}</div>
                <div class="cw-lib-menu">
                    <div class="cw-lib-menu-item cw-act-edit">${Nt.edit} ${Le("edit")}</div>
                    <div class="cw-lib-menu-item danger cw-act-del">${Nt.delete} ${Le("delete")}</div>
                </div>
            </div>
        `,H.querySelector(".cw-act-copy").onclick=h=>{h.stopPropagation(),y.playClick(),le(T)};let pe=H.querySelector(".cw-act-more"),v=H.querySelector(".cw-lib-menu");return pe.onclick=h=>{h.stopPropagation(),y.playClick();let p=v.classList.contains("open");Z(),p||(v.classList.add("open"),H.classList.add("menu-open"),i=H)},H.querySelector(".cw-act-edit").onclick=h=>{h.stopPropagation(),y.playClick(),Z(),xe(T)},H.querySelector(".cw-act-del").onclick=async h=>{h.stopPropagation(),y.playClick(),Z(),await ot(Le("deleteConfirm")(T.title))&&(It.delete(T.id),ue(),ne(Le("itemDeletedToast")))},H}function le(T){if(T.isRich){let H=new Blob([T.content],{type:"text/html"}),ie=document.createElement("div");ie.innerHTML=T.content;let P=new Blob([ie.innerText],{type:"text/plain"});navigator.clipboard.write([new ClipboardItem({"text/html":H,"text/plain":P})])}else navigator.clipboard.writeText(T.content);bg(T.id),ne(Le("copiedToast"))}function xe(T=null){n=T?T.id:null,ee.innerHTML="",ee.appendChild(se("title",Le("titleLabel"),T?T.title:"")),a==="email"&&ee.appendChild(se("subject",Le("subjectLabel"),T?T.subject:""));let H=Le("contentLabel");a==="email"&&(H=Le("emailBodyLabel")),a==="note"&&(H=Le("noteTextLabel")),ee.appendChild(se("content",H,T?T.content:"",{isRich:!0,isCode:T?T.isCode:!1})),re.textContent=Le(T?"editItemTitle":"newItemTitle"),S.textContent=Le(T?"saveChanges":"save"),R.classList.add("open"),setTimeout(()=>{let ie=ee.querySelector("input");ie&&ie.focus()},500)}function E(){y.playSwoosh(),R.classList.remove("open"),setTimeout(()=>{n=null},500)}async function K(){D.classList.add("active"),S.disabled=!0;try{let T=ee.querySelector("#cw-lib-inp-title"),H=ee.querySelector("#cw-lib-inp-content"),ie=T.value.trim(),P=H.contentEditable==="true"?H.innerHTML:H.value.trim(),Q=H.getAttribute("data-is-code")==="true";if(!ie||!P||P==="<br>"){y.playError(),ne(Le("fillTitleAndContent"),{error:!0});return}let pe={id:n,type:a,title:ie,content:P,isCode:Q,isRich:H.contentEditable==="true"};if(a==="email"){let h=ee.querySelector("#cw-lib-inp-subject").value.trim();if(!h){y.playError(),ne(Le("subjectRequired"),{error:!0});return}pe.subject=h}let v=await It.save(pe);if(v===!1){y.playError(),ne(Le("saveFailedNoUser"),{error:!0});return}ue(),E(),v.synced===!1?(y.playError(),ne(Le("savedLocalOnly"),{error:!0})):(ne(Le("savedAndSynced")),y.playSuccess())}catch(T){console.error("Erro ao salvar item da biblioteca:",T),y.playError(),ne(Le("saveError"),{error:!0})}finally{D.classList.remove("active"),S.disabled=!1}}function se(T,H,ie,P={}){let Q=document.createElement("div");Q.className="cw-lib-field";let pe=document.createElement("label");pe.className="cw-lib-label",pe.textContent=H,Q.appendChild(pe);let v;if(P.isRich){let h=document.createElement("div");h.className="cw-lib-toolbar-mini",h.innerHTML=`
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-bold" title="${Le("bold")}">${Nt.bold}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-italic" title="${Le("italic")}">${Nt.italic}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-code" title="${Le("codeFormat")}">${Nt.code}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-img" title="${Le("insertImage")}">${Nt.image}</button>
            `,v=document.createElement("div"),v.className="cw-lib-input cw-lib-editable",v.contentEditable="true",v.innerHTML=ie||"",P.isCode&&(v.style.fontFamily="'Roboto Mono', monospace",v.style.background="#F8F9FA",v.setAttribute("data-is-code","true"),h.querySelector(".cw-tb-code").classList.add("active")),h.querySelectorAll(".cw-lib-tb-btn").forEach(p=>{p.onmouseenter=()=>y.playHover(),p.onmousedown=()=>y.playClick()}),h.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),v.focus()},h.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),v.focus()},h.querySelector(".cw-tb-code").onclick=p=>{let M=!(v.getAttribute("data-is-code")==="true");v.setAttribute("data-is-code",String(M)),v.style.fontFamily=M?"'Roboto Mono', monospace":"inherit",v.style.background=M?"#F8F9FA":"#fff",p.currentTarget.classList.toggle("active",M),v.focus()},h.querySelector(".cw-tb-img").onclick=async()=>{let p=await An(Le("imageUrlPrompt"));p&&(document.execCommand("insertImage",!1,p),v.querySelectorAll("img").forEach(N=>{N.style.maxWidth="100%",N.style.borderRadius="8px"}))},v.onpaste=p=>{let N=(p.clipboardData||p.originalEvent.clipboardData).items;for(let M of N)if(M.kind==="file"&&M.type.startsWith("image/")){p.preventDefault();let f=new FileReader;f.onload=x=>{document.execCommand("insertHTML",!1,`<img src="${x.target.result}" style="max-width:100%;border-radius:8px;margin:8px 0;display:block;">`)},f.readAsDataURL(M.getAsFile())}},Q.appendChild(h)}else v=document.createElement("input"),v.className="cw-lib-input",v.type="text",v.value=ie||"";return v.id=`cw-lib-inp-${T}`,Q.appendChild(v),Q}function V(T){let H=document.createElement("div");return H.textContent=T||"",H.innerHTML}L.addEventListener("input",T=>{o=T.target.value,A.classList.toggle("visible",o.length>0),ue()}),A.onclick=()=>{L.value="",o="",A.classList.remove("visible"),ue(),L.focus()};function q(){t=!ht(r),dt(t,r,"cw-btn-library"),t?(Qe(),ue()):(Je(),Z())}return je(()=>{d&&(d.textContent=Le("headerTitle"));let T=r.querySelector(".cw-help-title");T&&(T.textContent=Le("headerTitle"));let H=r.querySelector(".cw-help-description");H&&(H.textContent=Le("headerDesc")),br.forEach(P=>{let Q=document.querySelector(`#lib-tab-${P.id} .js-lib-tab-label`);Q&&(Q.textContent=Le("tabs")[P.id])}),L.placeholder=Le("searchPlaceholder"),G.title=Le("newItem"),te.title=Le("cancel");let ie=D.querySelector(".js-lib-saving");ie&&(ie.textContent=Le("saving")),ue()}),q}var xg='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>',wg='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>',yg='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',Sg='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>';function Cg(e){if(document.getElementById("cw-shortcuts-styles"))return;let t=document.createElement("style");t.id="cw-shortcuts-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function hd(e,t){Cg(t);let a=document.createElement("div");a.className="cw-configs-section",a.innerHTML=`
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
    `;let o=a.querySelector(".js-sc-body"),n=a.querySelector(".js-sc-sort-toggle");n.onchange=async u=>{y.playClick(),await ct.setSortedByUsage(u.target.checked),s()};function i(u){let b=lt[u.payload.subStatus],L=b?b.name:u.payload.subStatus,A=(u.payload.scenarios||[]).length,C=[u.payload.caseType.toUpperCase(),L,A===1?e("scOneScenario"):e("scNScenarios").replace("{n}",A)];return u.alias&&C.push(`"${u.alias}"`),C.join(" \xB7 ")}function r(u,b,L){if(u.textContent="",L){let A=document.createElement("span");A.className="cw-sc-warn",A.textContent=e("scBroken"),u.appendChild(A),u.appendChild(document.createTextNode(" \xB7 "))}u.appendChild(document.createTextNode(i(b)))}function s(){o.innerHTML="",n.checked=ct.isSortedByUsage();let u=ct.isSortedByUsage(),b=u?ct.list():ct.listRaw(),L=!u;if(!b.length){let C=document.createElement("div");C.className="cw-sc-empty",C.textContent=e("scEmpty"),o.appendChild(C)}b.forEach((C,z)=>{let G=Al(C),R=document.createElement("div");R.className="cw-sc-item"+(G.length?" broken":""),R.dataset.id=C.id,R.dataset.index=String(z),R.innerHTML=`
                ${L?`<button type="button" class="cw-sc-grip" aria-label="${e("scReorder")}">${wg}</button>`:""}
                <span class="cw-sc-bolt">${xg}</span>
                <span class="cw-sc-text">
                    <span class="cw-sc-label"></span>
                    <span class="cw-sc-meta"></span>
                </span>
                <button type="button" class="cw-sc-iconbtn js-sc-edit" aria-label="${e("scEdit")}">${yg}</button>
                <button type="button" class="cw-sc-iconbtn danger js-sc-del" aria-label="${e("scDelete")}">${Sg}</button>
            `;let O=R.querySelector(".cw-sc-label");O.textContent=C.label,O.title=C.label,r(R.querySelector(".cw-sc-meta"),C,G.length>0),R.querySelector(".js-sc-edit").onclick=()=>g(C),R.querySelector(".js-sc-del").onclick=()=>l(C),L&&d(R,z,b.length),o.appendChild(R)});let A=document.createElement("button");A.type="button",A.className="cw-sc-add",A.textContent=e("scAdd"),A.disabled=b.length>=ga,A.disabled&&(A.textContent=e("scLimit").replace("{max}",ga)),A.onclick=()=>g(null),o.appendChild(A)}async function l(u){await ot(e("scDeleteConfirm").replace("{name}",u.label),{danger:!0})&&(await ct.remove(u.id),y.playClick(),s())}function d(u,b,L){let A=u.querySelector(".cw-sc-grip");u.draggable=!0;let C=!1;A.onmousedown=()=>{C=!0},u.onmouseup=()=>{C=!1},A.onkeydown=async z=>{let G=z.key==="ArrowUp"?-1:z.key==="ArrowDown"?1:0;if(!G)return;z.preventDefault();let R=b+G;if(R<0||R>=L)return;await ct.reorder(u.dataset.id,R),y.playClick(),s();let O=o.querySelector(`.cw-sc-item[data-id="${u.dataset.id}"] .cw-sc-grip`);O&&O.focus()},u.ondragstart=z=>{if(!C){z.preventDefault();return}z.dataTransfer.effectAllowed="move",z.dataTransfer.setData("text/plain",u.dataset.id),u.classList.add("dragging")},u.ondragend=()=>{u.classList.remove("dragging"),C=!1,o.querySelectorAll(".drop-target").forEach(z=>z.classList.remove("drop-target"))},u.ondragover=z=>{z.preventDefault(),u.classList.add("drop-target")},u.ondragleave=()=>u.classList.remove("drop-target"),u.ondrop=async z=>{z.preventDefault(),u.classList.remove("drop-target");let G=z.dataTransfer.getData("text/plain");!G||G===u.dataset.id||(await ct.reorder(G,Number(u.dataset.index)),y.playClick(),s())}}function c(){let u=[];for(let b in lt){let L=lt[b].status;L&&!u.includes(L)&&u.push(L)}return u}function g(u){let L=!!u?JSON.parse(JSON.stringify(u)):{id:Xo(),kind:"note",label:"",alias:"",payload:{caseType:"bau",status:"",subStatus:"",scenarios:[]}};o.innerHTML="";let A=document.createElement("div");A.style.cssText="display: flex; flex-direction: column; gap: 14px;",A.innerHTML=`
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
        `,o.appendChild(A);let C=A.querySelector("#cw-sc-name"),z=A.querySelector("#cw-sc-alias"),G=A.querySelector("#cw-sc-type"),R=A.querySelector("#cw-sc-status"),O=A.querySelector("#cw-sc-sub"),de=A.querySelector(".js-sc-scenarios");C.value=L.label,z.value=L.alias,G.value=L.payload.caseType,R.innerHTML='<option value="">\u2014</option>'+c().map(w=>`<option value="${w}">${w}</option>`).join(""),R.value=L.payload.status;function te(){let w=R.value;O.innerHTML='<option value="">\u2014</option>';for(let S in lt){if(lt[S].status!==w)continue;let D=document.createElement("option");D.value=S,D.textContent=lt[S].name,O.appendChild(D)}O.disabled=!w}function re(){if(de.innerHTML="",!O.value){de.innerHTML=`<div class="cw-configs-desc">${e("scPickSubStatus")}</div>`;return}let w=no(O.value,G.value);if(!w.length){de.innerHTML=`<div class="cw-configs-desc">${e("scNoScenarios")}</div>`;return}w.forEach(([S])=>{let D=document.createElement("button");D.type="button",D.className="cw-sc-chip",D.textContent=io(S,O.value);let j=()=>L.payload.scenarios.some(F=>F.id===S);D.classList.toggle("on",j()),D.onclick=()=>{j()?L.payload.scenarios=L.payload.scenarios.filter(F=>F.id!==S):L.payload.scenarios.push({id:S,substatus:O.value}),D.classList.toggle("on",j()),y.playClick()},de.appendChild(D)})}te(),O.value=L.payload.subStatus,re(),R.onchange=()=>{L.payload.scenarios=[],te(),O.value="",re()},O.onchange=()=>{L.payload.scenarios=[],re()},G.onchange=()=>{L.payload.scenarios=[],re()},A.querySelector(".cw-sc-cancel").onclick=()=>{y.playClick(),s()};let ee=A.querySelector(".cw-sc-save");ee.onclick=async()=>{if(!O.value){y.playError(),ne(e("scPickSubStatus"),{error:!0});return}let w=ee.textContent;ee.disabled=!0,ee.textContent=e("scSaving");let S=C.value.trim()||lt[O.value].name,D=await ct.save({...L,label:S,alias:z.value.trim(),payload:{...L.payload,caseType:G.value,status:R.value||String(O.value).split("_")[0],subStatus:O.value}});if(!D.ok){ee.disabled=!1,ee.textContent=w,y.playError(),ne(e("scLimit").replace("{max}",ga),{error:!0});return}y.playSuccess(),ne(D.synced?e("scSaved"):e("scSavedLocal")),s()}}return a.refresh=s,a.applyTexts=()=>{a.querySelector(".js-sc-title").textContent=e("scSectionTitle"),a.querySelector(".js-sc-sort-label").textContent=e("scSortLabel"),a.querySelector(".js-sc-sort-desc").textContent=e("scSortDesc"),s()},s(),a}var Ag='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>',Eg='<svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>',kg='<svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;"><path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>';function Tg(e){if(document.getElementById("cw-pill-section-styles"))return;let t=document.createElement("style");t.id="cw-pill-section-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function vd(e,t){Tg(t);let a=document.createElement("div");a.className="cw-configs-section",a.innerHTML=`
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
    `;let o={pinned:a.querySelector(".js-pl-list-pinned"),drawer:a.querySelector(".js-pl-list-drawer")},n=c=>c.replace("{max}",ma);function i(c,g,u){let b=sa.move(c,g,u);return b.ok?(y.playClick(),!0):(b.reason==="full"&&(y.playError(),ne(n(e("plFull")),{error:!0})),!1)}function r(c){let g=a.querySelector(`.cw-pl-item[data-id="${c}"] .cw-pl-grip`);g&&g.focus()}function s(c,g,u,b,L,A){let C=c.querySelector(".cw-pl-grip"),z=c.querySelector(".cw-pl-move");z.onclick=()=>i(g,u==="pinned"?"drawer":"pinned",1/0),C.onkeydown=R=>{let O=R.key==="ArrowUp"?-1:R.key==="ArrowDown"?1:0;if(!O)return;R.preventDefault();let de=b+O;de<0||de>=L||i(g,u,de)&&r(g)},c.draggable=!0;let G=!1;C.onmousedown=()=>{G=!0},c.onmouseup=()=>{G=!1},c.ondragstart=R=>{if(!G){R.preventDefault();return}R.dataTransfer.effectAllowed="move",R.dataTransfer.setData("text/plain",g),c.classList.add("dragging")},c.ondragend=()=>{c.classList.remove("dragging"),G=!1,a.querySelectorAll(".drop-target").forEach(R=>R.classList.remove("drop-target"))},c.ondragover=R=>{R.preventDefault(),R.stopPropagation(),c.classList.add("drop-target")},c.ondragleave=()=>c.classList.remove("drop-target"),c.ondrop=R=>{R.preventDefault(),R.stopPropagation(),c.classList.remove("drop-target");let O=R.dataTransfer.getData("text/plain");!O||O===g||i(O,u,b)}}Object.entries(o).forEach(([c,g])=>{g.ondragover=u=>{u.preventDefault(),g.classList.add("drop-target")},g.ondragleave=u=>{g.contains(u.relatedTarget)||g.classList.remove("drop-target")},g.ondrop=u=>{u.preventDefault(),g.classList.remove("drop-target");let b=u.dataTransfer.getData("text/plain");b&&i(b,c,1/0)}});function l(){let c=sa.get(),g=c.pinned.length>=ma;Object.entries(o).forEach(([b,L])=>{L.replaceChildren();let A=c[b];if(!A.length){if(b==="pinned"){let C=document.createElement("div");C.className="cw-pl-empty",C.textContent=e("plPinnedEmpty"),L.appendChild(C)}return}A.forEach((C,z)=>{let G=document.createElement("div");G.className="cw-pl-item",G.dataset.id=C;let R=b==="drawer",O=R&&g,de=O?n(e("plFull")):e(R?"plMoveToPill":"plMoveToDrawer");G.innerHTML=`
                    <button type="button" class="cw-pl-grip" aria-label="${e("plReorder")}">${Ag}</button>
                    <span class="cw-pl-icon">${ml(C)}</span>
                    <span class="cw-pl-label"></span>
                    <button type="button" class="cw-pl-move" ${O?"disabled":""}>${R?kg:Eg}</button>
                `;let te=G.querySelector(".cw-pl-label");te.textContent=Wo(C);let re=G.querySelector(".cw-pl-move");re.title=de,re.setAttribute("aria-label",`${Wo(C)}: ${de}`),s(G,C,b,z,A.length,g),L.appendChild(G)})});let u=a.querySelector(".js-pl-count");u.textContent=`${c.pinned.length}/${ma}`,u.classList.toggle("full",g)}a.querySelector(".js-pl-reset").onclick=async()=>{await ot(e("plResetConfirm"))&&(sa.reset(),y.playClick())},sa.onChange(l);function d(){a.querySelector(".js-pl-title").textContent=e("plSectionTitle"),a.querySelector(".js-pl-desc").textContent=n(e("plDesc")),a.querySelector(".js-pl-pinned-title").textContent=e("plPinnedTitle"),a.querySelector(".js-pl-drawer-title").textContent=e("plDrawerTitle"),a.querySelector(".js-pl-reset").textContent=e("plReset"),l()}return d(),a.applyTexts=d,a.refresh=l,a}var vr="notes_default_segment",xd="notes_last_segment",xr="notes_default_flow",wd=["all","sbse","mms","last"],Ig=["bau","lm"];function Ng(e,t,a){let o=r=>a.includes(r),n=wd.includes(e)?e:"all",i=n==="last"?t:n;return o(i)?i:"all"}function Lg(e){return Ig.includes(e)?e:"bau"}function wr(){let e=Xe.get(vr,"all");return wd.includes(e)?e:"all"}function en(){return Lg(Xe.get(xr,"bau"))}function yd(e){return Ng(wr(),Xe.get(xd,"all"),e)}function Sd(e){Xe.set(xd,e).catch(()=>{})}var yr={pt:{title:"Nota em tabela",segLabel:"Abrir em",segDesc:'O tipo de nota que a Nota em tabela mostra ao abrir. "\xDAltimo" retoma o que voc\xEA usou por \xFAltimo.',flowLabel:"Fluxo padr\xE3o",flowDesc:'BAU ou LM ao abrir. Voc\xEA ainda troca na linha "Nota".',last:"\xDAltimo",saved:"Prefer\xEAncia salva."},es:{title:"Nota en tabla",segLabel:"Abrir en",segDesc:'El tipo de nota que muestra Nota en tabla al abrirse. "\xDAltimo" retoma el que us\xF3 por \xFAltima vez.',flowLabel:"Flujo predeterminado",flowDesc:'BAU o LM al abrir. Igual puede cambiarlo en la fila "Nota".',last:"\xDAltimo",saved:"Preferencia guardada."},en:{title:"Table note",segLabel:"Open in",segDesc:'The note type Table note shows when it opens. "Last" picks up the one you used last.',flowLabel:"Default flow",flowDesc:'BAU or LM when it opens. You can still switch it in the "Note" row.',last:"Last",saved:"Preference saved."}},yo=e=>(yr[ge()]||yr.pt)[e]||yr.pt[e];function Cd(){let e=document.createElement("div");e.className="cw-configs-section",e.innerHTML=`
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
    `;let t=e.querySelector("#cw-config-nt-segment"),a=e.querySelector("#cw-config-nt-flow");function o(){let i=wr(),r=en();t.querySelectorAll("button").forEach(s=>{s.classList.toggle("active",s.dataset.v===i),s.setAttribute("aria-pressed",String(s.dataset.v===i))}),a.querySelectorAll("button").forEach(s=>{s.classList.toggle("active",s.dataset.v===r),s.setAttribute("aria-pressed",String(s.dataset.v===r))})}let n=(i,r)=>i.querySelectorAll("button").forEach(s=>{s.onclick=()=>{Xe.set(r,s.dataset.v).catch(l=>console.warn("Prefer\xEAncia da Nota em tabela n\xE3o sincronizou",l)),o(),y.playClick()}});return n(t,vr),n(a,xr),e.applyTexts=()=>{e.querySelector(".js-nt-title").textContent=yo("title"),e.querySelector(".js-nt-seg-label").textContent=yo("segLabel"),e.querySelector(".js-nt-seg-desc").textContent=yo("segDesc"),e.querySelector(".js-nt-flow-label").textContent=yo("flowLabel"),e.querySelector(".js-nt-flow-desc").textContent=yo("flowDesc"),e.querySelector(".js-nt-last").textContent=yo("last"),o()},e.refresh=o,e.applyTexts(),e}var _g={pt:{title:"Configura\xE7\xF5es",headerDesc:"Personalize sua experi\xEAncia e prefer\xEAncias.",profileNotFound:"Perfil n\xE3o localizado na base de dados.",consultant:"Consultor",overheadBadge:"Gest\xE3o / Overhead",soundSectionTitle:"Prefer\xEAncias de Som",soundLabel:"Efeitos Sonoros",soundDesc:"Ativar ou desativar sons de interface.",langSectionTitle:"Idioma da Interface",langLabel:"Idioma",langDesc:"Escolha o idioma dos menus, bot\xF5es e mensagens do Case Wizard.",outLangLabel:"Idioma do Atendimento",outLangDesc:"Idioma do case note, do e-mail e do roteiro de chamada. \xC9 o idioma do anunciante, n\xE3o o seu.",supportSectionTitle:"Suporte & Feedback",docsLink:"Abrir a documenta\xE7\xE3o",reportBug:"Reportar Bug/Sugest\xF5es",diagSectionTitle:"Diagn\xF3stico",diagLabel:"Ambiente do backend",diagDesc:"Qual implanta\xE7\xE3o do Apps Script este bundle usa. O sufixo tem de bater com o do dashboard.",scSectionTitle:"Meus Atalhos (Ctrl+K)",scSortLabel:"Ordenar por frequ\xEAncia de uso",scSortDesc:"Desligue para definir voc\xEA mesmo a ordem, arrastando os atalhos.",scEmpty:"Voc\xEA ainda n\xE3o tem atalhos. Crie um aqui ou monte uma nota no Case Notes e clique em \u201CSalvar como atalho\u201D.",scAdd:"+ Criar atalho",scLimit:"Limite de {max} atalhos atingido",scEdit:"Editar atalho",scDelete:"Excluir atalho",scReorder:"Reordenar (arraste ou use as setas)",scDeleteConfirm:"Excluir o atalho \u201C{name}\u201D?",scBroken:"\u26A0 cen\xE1rio indispon\xEDvel",scOneScenario:"1 cen\xE1rio",scNScenarios:"{n} cen\xE1rios",scName:"Nome",scNamePlaceholder:"Ex: Fim do 2 Day Rule",scAlias:"Apelido de busca",scAliasPlaceholder:"Ex: 2day",scAliasDesc:"Palavra que encontra este atalho no Ctrl+K, al\xE9m do nome.",scFlow:"Fluxo",scStatus:"Status",scSubStatus:"Substatus",scScenarios:"Cen\xE1rios",scScenariosDesc:"Opcional: sem nenhum, o atalho s\xF3 abre a nota j\xE1 no substatus certo.",scPickSubStatus:"Escolha um substatus primeiro.",scNoScenarios:"Nenhum cen\xE1rio dispon\xEDvel para esta combina\xE7\xE3o.",scCancel:"Cancelar",scSave:"Salvar",scSaving:"Salvando\u2026",scSaved:"Atalho salvo!",scSavedLocal:"Atalho salvo neste navegador (sem conex\xE3o com a nuvem).",plSectionTitle:"P\xEDlula e Gaveta",plDesc:"Escolha o que fica fixado na p\xEDlula (at\xE9 {max}) e o que fica guardado na gaveta, atr\xE1s do bot\xE3o de grade. Arraste para reordenar. Tudo continua dispon\xEDvel no Ctrl+K.",plPinnedTitle:"Na p\xEDlula",plDrawerTitle:"Na gaveta",plPinnedEmpty:"Nenhum m\xF3dulo na p\xEDlula: s\xF3 o bot\xE3o de grade aparece.",plMoveToDrawer:"Guardar na gaveta",plMoveToPill:"Fixar na p\xEDlula",plFull:"A p\xEDlula comporta no m\xE1ximo {max} m\xF3dulos",plReorder:"Reordenar (arraste ou use as setas)",plReset:"Restaurar padr\xE3o",plResetConfirm:"Restaurar a p\xEDlula e a gaveta para o padr\xE3o?"},es:{title:"Configuraci\xF3n",headerDesc:"Personaliza tu experiencia y tus preferencias.",profileNotFound:"Perfil no encontrado en la base de datos.",consultant:"Consultor",overheadBadge:"Gesti\xF3n / Overhead",soundSectionTitle:"Preferencias de Sonido",soundLabel:"Efectos de Sonido",soundDesc:"Activar o desactivar los sonidos de la interfaz.",langSectionTitle:"Idioma de la Interfaz",langLabel:"Idioma",langDesc:"Elige el idioma de los men\xFAs, botones y mensajes del Case Wizard.",outLangLabel:"Idioma de la Atenci\xF3n",outLangDesc:"Idioma del case note, del correo y del guion de llamada. Es el idioma del anunciante, no el tuyo.",supportSectionTitle:"Soporte y Comentarios",docsLink:"Abrir la documentaci\xF3n",reportBug:"Reportar error o sugerencia",diagSectionTitle:"Diagn\xF3stico",diagLabel:"Entorno del backend",diagDesc:"Qu\xE9 implementaci\xF3n de Apps Script usa este bundle. El sufijo debe coincidir con el del panel.",scSectionTitle:"Mis Atajos (Ctrl+K)",scSortLabel:"Ordenar por frecuencia de uso",scSortDesc:"Desact\xEDvalo para definir t\xFA mismo el orden, arrastrando los atajos.",scEmpty:"Todav\xEDa no tienes atajos. Crea uno aqu\xED o arma una nota en Case Notes y haz clic en \u201CGuardar como atajo\u201D.",scAdd:"+ Crear atajo",scLimit:"L\xEDmite de {max} atajos alcanzado",scEdit:"Editar atajo",scDelete:"Eliminar atajo",scReorder:"Reordenar (arrastra o usa las flechas)",scDeleteConfirm:"\xBFEliminar el atajo \u201C{name}\u201D?",scBroken:"\u26A0 escenario no disponible",scOneScenario:"1 escenario",scNScenarios:"{n} escenarios",scName:"Nombre",scNamePlaceholder:"Ej: Fin del 2 Day Rule",scAlias:"Apodo de b\xFAsqueda",scAliasPlaceholder:"Ej: 2day",scAliasDesc:"Palabra que encuentra este atajo en el Ctrl+K, adem\xE1s del nombre.",scFlow:"Flujo",scStatus:"Estado",scSubStatus:"Subestado",scScenarios:"Escenarios",scScenariosDesc:"Opcional: sin ninguno, el atajo solo abre la nota ya en el subestado correcto.",scPickSubStatus:"Elige un subestado primero.",scNoScenarios:"Ning\xFAn escenario disponible para esta combinaci\xF3n.",scCancel:"Cancelar",scSave:"Guardar",scSaving:"Guardando\u2026",scSaved:"\xA1Atajo guardado!",scSavedLocal:"Atajo guardado en este navegador (sin conexi\xF3n con la nube).",plSectionTitle:"Barra flotante y Caj\xF3n",plDesc:"Elige qu\xE9 queda fijado en la barra flotante (hasta {max}) y qu\xE9 se guarda en el caj\xF3n, detr\xE1s del bot\xF3n de cuadr\xEDcula. Arrastra para reordenar. Todo sigue disponible en Ctrl+K.",plPinnedTitle:"En la barra",plDrawerTitle:"En el caj\xF3n",plPinnedEmpty:"Ning\xFAn m\xF3dulo en la barra: solo aparece el bot\xF3n de cuadr\xEDcula.",plMoveToDrawer:"Guardar en el caj\xF3n",plMoveToPill:"Fijar en la barra",plFull:"La barra admite como m\xE1ximo {max} m\xF3dulos",plReorder:"Reordenar (arrastra o usa las flechas)",plReset:"Restaurar valores predeterminados",plResetConfirm:"\xBFRestaurar la barra y el caj\xF3n a los valores predeterminados?"},en:{title:"Settings",headerDesc:"Customize your experience and preferences.",profileNotFound:"Profile not found in the database.",consultant:"Consultant",overheadBadge:"Management / Overhead",soundSectionTitle:"Sound Preferences",soundLabel:"Sound Effects",soundDesc:"Turn interface sounds on or off.",langSectionTitle:"Interface Language",langLabel:"Language",langDesc:"Choose the language of Case Wizard's menus, buttons and messages.",outLangLabel:"Case Language",outLangDesc:"Language of the case note, the email and the call script. This is the advertiser's language, not yours.",supportSectionTitle:"Support & Feedback",docsLink:"Open the documentation",reportBug:"Report a Bug/Suggestion",diagSectionTitle:"Diagnostics",diagLabel:"Backend environment",diagDesc:"Which Apps Script deployment this bundle uses. The suffix must match the dashboard's.",scSectionTitle:"My Shortcuts (Ctrl+K)",scSortLabel:"Sort by usage frequency",scSortDesc:"Turn this off to set the order yourself by dragging the shortcuts.",scEmpty:"You don\u2019t have any shortcuts yet. Create one here, or build a note in Case Notes and click \u201CSave as shortcut\u201D.",scAdd:"+ Create shortcut",scLimit:"Limit of {max} shortcuts reached",scEdit:"Edit shortcut",scDelete:"Delete shortcut",scReorder:"Reorder (drag or use the arrows)",scDeleteConfirm:"Delete the shortcut \u201C{name}\u201D?",scBroken:"\u26A0 scenario unavailable",scOneScenario:"1 scenario",scNScenarios:"{n} scenarios",scName:"Name",scNamePlaceholder:"e.g.: End of 2 Day Rule",scAlias:"Search alias",scAliasPlaceholder:"e.g.: 2day",scAliasDesc:"A word that finds this shortcut in Ctrl+K, in addition to the name.",scFlow:"Flow",scStatus:"Status",scSubStatus:"Substatus",scScenarios:"Scenarios",scScenariosDesc:"Optional: with none selected, the shortcut just opens the note already on the right substatus.",scPickSubStatus:"Choose a substatus first.",scNoScenarios:"No scenario available for this combination.",scCancel:"Cancel",scSave:"Save",scSaving:"Saving\u2026",scSaved:"Shortcut saved!",scSavedLocal:"Shortcut saved in this browser (no cloud connection).",plSectionTitle:"Pill & Drawer",plDesc:"Choose what stays pinned on the pill (up to {max}) and what is stowed in the drawer, behind the grid button. Drag to reorder. Everything is still available in Ctrl+K.",plPinnedTitle:"On the pill",plDrawerTitle:"In the drawer",plPinnedEmpty:"No modules on the pill: only the grid button shows.",plMoveToDrawer:"Stow in the drawer",plMoveToPill:"Pin to the pill",plFull:"The pill holds at most {max} modules",plReorder:"Reorder (drag or use the arrows)",plReset:"Restore defaults",plResetConfirm:"Restore the pill and the drawer to the defaults?"}};function Ad(){let e=Qa(_g),t="v1.1",a=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0",warnBorder:"#F9AB00",warnBg:"#FFFBF0",warnText:"#B06000"},n="cw-configs-styles";if(!document.getElementById(n)){let F=document.createElement("style");F.id=n,F.innerHTML=`
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
        `,document.head.appendChild(F)}let i=document.createElement("div");i.id="configs-popup",i.classList.add("cw-module-window"),Object.assign(i.style,bt,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let r={popup:i},s=rt(i,e("title"),t,e("headerDesc"),r,()=>j());i.appendChild(s);let l=s.querySelector("span"),d=document.createElement("div");d.className="cw-configs-container",i.appendChild(d);let c=document.createElement("div");c.className="cw-profile-card",c.id="cw-user-profile-section",c.style.display="none",d.appendChild(c);let g;function u(F,Z){if(g={ldap:F,profile:Z},!Z){c.innerHTML=`
                <div class="cw-profile-avatar" style="background: #e8eaed; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #5f6368; font-weight: bold;">
                    ${F.charAt(0).toUpperCase()}
                </div>
                <div class="cw-profile-info">
                    <h2 class="cw-profile-ldap">@${F}</h2>
                    <div class="cw-profile-badges">
                        <span class="cw-profile-badge">${e("consultant")}</span>
                    </div>
                    <div style="font-size: 12px; color: ${o.textSub}; margin-top: 4px;">
                        ${e("profileNotFound")}
                    </div>
                </div>
            `;return}c.innerHTML=`
        <img src="https://moma-teams-photos.corp.google.com/photos/${F}?sz=600&type=PLUS"
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
    `}async function b(){c.style.display="flex",c.innerHTML=`
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
        `,(async()=>{try{it()||await qo();let F=it(),Z=F?F.split("@")[0]:"user",fe=await Za(Z);u(Z,fe)}catch(F){console.warn("Erro ao renderizar perfil:",F),c.style.display="none"}})()}b();let L=document.createElement("div");if(L.className="cw-configs-section",L.innerHTML=`
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
    `,!document.getElementById("cw-lang-toggle-styles")){let F=document.createElement("style");F.id="cw-lang-toggle-styles",F.innerHTML=`
            .cw-lang-toggle { display: flex; border: 1px solid ${o.border}; border-radius: 8px; overflow: hidden; flex-shrink: 0; }
            .cw-lang-toggle button {
                border: none; background: white; padding: 8px 14px; font-size: 12px; font-weight: 700;
                cursor: pointer; color: ${o.textSub}; font-family: inherit; transition: all 0.2s;
            }
            .cw-lang-toggle button:not(:last-child) { border-right: 1px solid ${o.border}; }
            .cw-lang-toggle button.active { background: ${o.primary}; color: #fff; }
            .cw-lang-toggle button:hover:not(.active) { background: #f1f3f4; }
        `,document.head.appendChild(F)}let A=L.querySelector("#cw-config-lang-toggle"),C=L.querySelector("#cw-config-outlang-toggle");function z(){A.querySelectorAll("button").forEach(F=>{F.classList.toggle("active",F.dataset.lang===ge())}),C.querySelectorAll("button").forEach(F=>{F.classList.toggle("active",F.dataset.lang===Tt())})}z(),A.querySelectorAll("button").forEach(F=>{F.onclick=()=>{No(F.dataset.lang),y.playClick()}}),C.querySelectorAll("button").forEach(F=>{F.onclick=()=>{di(F.dataset.lang),z(),y.playClick()}}),d.appendChild(L);let G=hd(e,o);d.appendChild(G);let R=vd(e,o);d.appendChild(R);let O=Cd();d.appendChild(O);let de=document.createElement("div");de.className="cw-configs-section",de.innerHTML=`
        <div class="cw-configs-section-title js-sound-section-title"></div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label js-sound-label"></div>
                    <div class="cw-configs-desc js-sound-desc"></div>
                </div>
                <label class="cw-toggle-switch">
                    <input type="checkbox" id="cw-config-sound-toggle" ${y.isMuted()?"":"checked"}>
                    <span class="cw-toggle-track"></span>
                </label>
            </div>
        </div>
    `;let te=de.querySelector("#cw-config-sound-toggle");te.onchange=F=>{y.setMuted(!F.target.checked),F.target.checked&&y.playClick()},d.appendChild(de);let re=document.createElement("div");re.className="cw-configs-section",re.innerHTML=`
        <div class="cw-configs-section-title js-support-section-title"></div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn js-docs-link" href="${Cn}" target="_blank" rel="noopener noreferrer"></a>
                <a class="cw-configs-btn js-support-link" href="${ao}" target="_blank" rel="noopener noreferrer"></a>
            </div>
        </div>
    `,d.appendChild(re);let ee=Ja(),w=document.createElement("div");w.className="cw-configs-section",w.innerHTML=`
        <div class="cw-configs-section-title js-diag-section-title"></div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label js-diag-label"></div>
                    <div class="cw-configs-desc js-diag-desc"></div>
                </div>
                <div class="cw-env-chip ${ee.isDev?"is-dev":"is-prod"}"></div>
            </div>
        </div>
    `,w.querySelector(".cw-env-chip").textContent=`${ee.isDev?"DEV":"PROD"} \xB7 \u2026${ee.fingerprint}`,d.appendChild(w);let S=document.createElement("style");S.innerHTML=`
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
    `,w.appendChild(S);function D(){g&&u(g.ldap,g.profile),L.querySelector(".js-lang-section-title").textContent=e("langSectionTitle"),L.querySelector(".js-lang-label").textContent=e("langLabel"),L.querySelector(".js-lang-desc").textContent=e("langDesc"),L.querySelector(".js-outlang-label").textContent=e("outLangLabel"),L.querySelector(".js-outlang-desc").textContent=e("outLangDesc"),z(),G.applyTexts(),R.applyTexts(),O.applyTexts(),de.querySelector(".js-sound-section-title").textContent=e("soundSectionTitle"),de.querySelector(".js-sound-label").textContent=e("soundLabel"),de.querySelector(".js-sound-desc").textContent=e("soundDesc"),re.querySelector(".js-support-section-title").textContent=e("supportSectionTitle"),re.querySelector(".js-docs-link").textContent=e("docsLink"),re.querySelector(".js-support-link").textContent=e("reportBug"),w.querySelector(".js-diag-section-title").textContent=e("diagSectionTitle"),w.querySelector(".js-diag-label").textContent=e("diagLabel"),w.querySelector(".js-diag-desc").textContent=e("diagDesc"),l&&(l.textContent=e("title"));let F=i.querySelector(".cw-help-title");F&&(F.textContent=e("title"));let Z=i.querySelector(".cw-help-description");Z&&(Z.textContent=e("headerDesc"))}D(),je(D),wa(z);function j(){a=!ht(i),dt(a,i,"cw-btn-configs"),a?(G.refresh(),R.refresh(),O.refresh(),Qe(),y.playClick()):Je()}return document.body.appendChild(i),j}var Ct={blue:"#1A73E8",red:"#D93025",yellow:"#F9AB00",green:"#1E8E3E",blueLight:"#E8F0FE",redLight:"#FCE8E6",yellowLight:"#FEF7E0",greenLight:"#E6F4EA",textPrimary:"#202124",textSecondary:"#5F6368",border:"#DADCE0",surface:"rgba(255, 255, 255, 0.8)",white:"#FFFFFF"};var La="cubic-bezier(0.4, 0, 0.2, 1)",gw=`all 0.3s ${La}`,Ed=()=>{if(document.getElementById("bau-form-global-styles"))return;let e=document.createElement("style");e.id="bau-form-global-styles",e.textContent=`
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
      z-index: ${ft.MODULE_RESTING};
      
      background: #FFFFFF; 
      display: flex;
      flex-direction: column;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 12px 40px rgba(0,0,0,0.12);
      border: 1px solid #DADCE0;
      
      transform-origin: center center;
      animation: cw-genie-effect-in 0.4s ${La};
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
    .bau-metrics-refresh-btn:focus-visible { outline: 2px solid ${Ct.blue}; outline-offset: 2px; }
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
      transition-timing-function: ${La};
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
        animation: bauAuraCombined 5s ${La} 0.2s infinite;
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
        color: ${Ct.green};
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
        animation: bauCheckDraw 0.55s ${La} 0.75s forwards;
    }

    .bau-success-view.active .bau-success-title {
        font-size: 24px;
        font-weight: 500;
        color: #202124;
        margin: 0 0 8px 0;
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${La} 0.85s forwards;
    }

    .bau-success-view.active .bau-success-subtitle {
        font-size: 15px;
        color: #5F6368;
        margin-bottom: 36px;
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${La} 0.95s forwards;
    }

    .bau-success-view.active #bau-success-back-btn {
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${La} 1.05s forwards;
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
    .bau-rescan-btn:hover { color: ${Ct.blue}; background: #FFFFFF; }
    .bau-rescan-btn:focus-visible { outline: 2px solid ${Ct.blue}; outline-offset: 2px; }
    .bau-rescan-btn.spinning { cursor: default; color: ${Ct.blue}; }
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
      box-shadow: inset 0 0 0 2px ${Ct.blue};
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
    .bau-mini-btn-input:focus-visible { outline: 2px solid ${Ct.blue}; outline-offset: 2px; }

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
    .bau-md-copy:hover { background: #E8F0FE; color: ${Ct.blue}; }
    .bau-md-copy:focus-visible { outline: 2px solid ${Ct.blue}; outline-offset: 2px; }
    .bau-md-copy.is-done { opacity: 1; color: ${Ct.green}; }

    /* Card selecionado na lista: sem isso o agente perde de vista qual caso o
       painel da direita esta mostrando assim que a lista rola. */
    /* Acento numa aresta, nao moldura em volta: diz "e este" sem desenhar mais
       uma caixa. */
    .bau-case-card.is-selected {
      background: #E8F0FE;
      box-shadow: inset 3px 0 0 ${Ct.blue};
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

    .bau-mini-btn-input:hover { background: #E8F0FE; color: ${Ct.blue}; }

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
  `,document.head.appendChild(e)};function Td(){return Object.values(Ze).map(e=>String(e?.name||"").trim()).filter(Boolean)}var kd=[{value:"PT-BR",text:"Portugu\xEAs (PT-BR)"},{value:"ES",text:"Espanhol (ES)"},{value:"EN",text:"Ingl\xEAs (EN)"}],ha={steps:[{id:0,title:"Selecione o tipo de atendimento",isBranching:!0},{id:1,title:"Contexto e Valida\xE7\xE3o",fields:[{id:"advName",name:"advName",label:"Nome do Anunciante",type:"text",placeholder:"Nome do Anunciante",required:!0,isSmart:!0},{id:"advLastName",name:"advLastName",label:"Sobrenome do Anunciante",type:"text",placeholder:"Sobrenome do Anunciante",required:!1,isSmart:!0},{id:"advPhone",name:"advPhone",label:"Telefone do Anunciante",type:"text",placeholder:"+55 11 90000-0000",required:!1,isSmart:!0},{id:"advEmail",name:"advEmail",label:"Email do Anunciante",type:"text",placeholder:"email@exemplo.com",required:!0,isSmart:!0,validation:{regex:"^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",error:"Formato de email inv\xE1lido"}},{id:"cid",name:"cid",label:"CID",type:"text",placeholder:"000-000-0000",required:!0,isSmart:!0,tooltip:"Use o formato 000-000-0000 ou 10 d\xEDgitos",validation:{regex:"^(\\d{3}-\\d{3}-\\d{4}|\\d{10})$",error:"Formato de CID incorreto"}},{id:"amName",name:"amName",label:"Account Manager (AM)",type:"text",placeholder:"am@google.com",required:!0,isSmart:!0,validation:{regex:"^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",error:"Informe o e-mail do AM (ex.: am@google.com)"}},{id:"website",name:"website",label:"Website",type:"text",placeholder:"https://www.exemplo.com",required:!0,isSmart:!0},{id:"seId",name:"seId",label:"Speakeasy ID (SE ID)",type:"text-with-button",placeholder:"Speakeasy ID",required:!1,isSmart:!0,button:{id:"bau-top-se-search",icon:"wand",title:"Buscar ID automaticamente"}},{id:"language",name:"language",label:"Idioma do Atendimento",type:"select",required:!0,tooltip:"Vem do seu segmento na planilha People. Troque s\xF3 quando este caso fugir da regra.",options:kd}]},{id:2,title:"Tasks",fields:[{id:"reason",name:"reason",label:"O que deve ser feito em BAU",type:"textarea",placeholder:"Descreva as a\xE7\xF5es esperadas...",required:!0,style:{minHeight:"80px"}},{id:"taskType",name:"taskType",label:"Tasks para BAU (Selecione 1 ou mais)",type:"checkbox-grid",required:!0,tooltip:"Selecione os tipos de implementa\xE7\xE3o t\xE9cnica"}]},{id:3,title:"Justificativa e Agendamento",fields:[{id:"nonImplementationReason",name:"nonImplementationReason",label:"Motivo da N\xE3o Implementa\xE7\xE3o (Justificativa BAU)",type:"select",required:!0,options:[{value:"",text:"Selecione um motivo..."},{value:"Tempo da consultoria esgotado",text:"Tempo da consultoria esgotado"},{value:"Solicita\xE7\xE3o de reagendamento pelo anunciante",text:"Solicita\xE7\xE3o de reagendamento pelo anunciante"},{value:"Falta de acessos ou backup do site",text:"Falta de acessos ou backup do site"},{value:"Anunciante indispon\xEDvel ou n\xE3o preparado",text:"Anunciante indispon\xEDvel ou n\xE3o preparado"},{value:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)",text:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"},{value:"Solicita\xE7\xE3o de tarefas (tasks) adicionais",text:"Solicita\xE7\xE3o de tarefas (tasks) adicionais"},{value:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)",text:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"},{value:"Retorno de contato ap\xF3s prazo de 14 dias expirado",text:"Retorno de contato ap\xF3s prazo de 14 dias expirado"}]},{id:"description",i18nKey:"description_justificativa",name:"description",label:"Justificativa / Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva detalhadamente o que precisa ser feito...",required:!0},{id:"availability",name:"availability",label:"Disponibilidade (m\xEDnimo 1 op\xE7\xE3o)",type:"datetime-group",required:!0,fields:[{name:"availability_1",label:"Op\xE7\xE3o 1 (Prioridade)",required:!0},{name:"availability_2",label:"Op\xE7\xE3o 2 (Opcional)",required:!1},{name:"availability_3",label:"Op\xE7\xE3o 3 (Opcional)",required:!1}]},{id:"suggestDiscard",name:"suggestDiscard",label:"O caso deve ser descartado pelo TL?",type:"select",required:!1,options:[{value:"N\xE3o",text:"N\xE3o"},{value:"Sim",text:"Sim"}]}]},{id:4,title:"Confirma\xE7\xE3o",isConfirmation:!0},{id:5,title:"Solicitar Descarte",fields:[{id:"caseId",name:"caseId",label:"Case ID",type:"text",placeholder:"Case ID",required:!0,isSmart:!0},{id:"language",i18nKey:"language_descarte",name:"language",label:"Idioma do Atendimento",type:"select",required:!0,options:kd},{id:"seId",i18nKey:"seId_descarte",name:"seId",label:"Speakeasy ID (SE ID)",type:"text-with-button",placeholder:"Speakeasy ID",required:!0,isSmart:!0,button:{id:"bau-discard-se-search",icon:"wand",title:"Buscar ID automaticamente"}},{id:"description",i18nKey:"description_descarte",name:"description",label:"Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva o motivo do descarte...",required:!0},{id:"discardReason",name:"reason",label:"Motivo do Descarte",type:"select",required:!0,groups:[{label:"Live Appointments",options:[{value:"Caso Filho gerado no atendimento",text:"Caso Filho gerado no atendimento"},{value:"3\xAA Tentativa de contato sem sucesso",text:"3\xAA Tentativa de contato sem sucesso"}]},{label:"Live Meet",options:[{value:"Apenas o AM presente",text:"Apenas o AM presente"},{value:"Estouro de tempo para conclus\xE3o",text:"Estouro de tempo para conclus\xE3o"},{value:"Gera\xE7\xE3o de caso BAU (Reagendamento)",text:"Gera\xE7\xE3o de caso BAU (Reagendamento)"}]}]}]}]};var Dg={advName:{label:"Nombre del Anunciante",placeholder:"Nombre del Anunciante"},advLastName:{label:"Apellido del Anunciante",placeholder:"Apellido del Anunciante"},advPhone:{label:"Tel\xE9fono del Anunciante",placeholder:"+55 11 90000-0000"},advEmail:{label:"Email del Anunciante",placeholder:"email@ejemplo.com",error:"Formato de correo inv\xE1lido"},cid:{label:"CID",placeholder:"000-000-0000",tooltip:"Usa el formato 000-000-0000 o 10 d\xEDgitos",error:"Formato de CID incorrecto"},amName:{label:"Account Manager (AM)",placeholder:"am@google.com",error:"Informa el correo del AM (ej.: am@google.com)"},website:{label:"Website",placeholder:"https://www.ejemplo.com"},seId:{label:"Speakeasy ID (SE ID)",placeholder:"Speakeasy ID",buttonTitle:"Buscar ID autom\xE1ticamente"},seId_descarte:{label:"Speakeasy ID (SE ID)",placeholder:"Speakeasy ID",buttonTitle:"Buscar ID autom\xE1ticamente"},reason:{label:"Qu\xE9 debe hacerse en BAU",placeholder:"Describe las acciones esperadas..."},taskType:{label:"Tareas para BAU (Selecciona 1 o m\xE1s)",tooltip:"Selecciona los tipos de implementaci\xF3n t\xE9cnica"},nonImplementationReason:{label:"Motivo de la No Implementaci\xF3n (Justificaci\xF3n BAU)"},description_justificativa:{label:"Justificaci\xF3n / Descripci\xF3n",placeholder:"Describe detalladamente qu\xE9 se necesita hacer..."},availability:{label:"Disponibilidad (m\xEDnimo 1 opci\xF3n)"},availability_1:{label:"Opci\xF3n 1 (Prioridad)"},availability_2:{label:"Opci\xF3n 2 (Opcional)"},availability_3:{label:"Opci\xF3n 3 (Opcional)"},suggestDiscard:{label:"\xBFEl caso debe ser descartado por el TL?"},caseId:{label:"Case ID",placeholder:"Case ID"},language:{label:"Idioma de la Atenci\xF3n",tooltip:"Viene de tu segmento en la hoja People. C\xE1mbialo solo cuando este caso se salga de la regla."},language_descarte:{label:"Idioma de la Atenci\xF3n"},description_descarte:{label:"Descripci\xF3n",placeholder:"Describe el motivo del descarte..."},discardReason:{label:"Motivo del Descarte"}},Mg={advName:{label:"Advertiser Name",placeholder:"Advertiser Name"},advLastName:{label:"Advertiser Last Name",placeholder:"Advertiser Last Name"},advPhone:{label:"Advertiser Phone",placeholder:"+55 11 90000-0000"},advEmail:{label:"Advertiser Email",placeholder:"email@example.com",error:"Invalid email format"},cid:{label:"CID",placeholder:"000-000-0000",tooltip:"Use the format 000-000-0000 or 10 digits",error:"Incorrect CID format"},amName:{label:"Account Manager (AM)",placeholder:"am@google.com",error:"Enter the AM's email (e.g., am@google.com)"},website:{label:"Website",placeholder:"https://www.example.com"},seId:{label:"Speakeasy ID (SE ID)",placeholder:"Speakeasy ID",buttonTitle:"Look up ID automatically"},seId_descarte:{label:"Speakeasy ID (SE ID)",placeholder:"Speakeasy ID",buttonTitle:"Look up ID automatically"},reason:{label:"What needs to be done in BAU",placeholder:"Describe the expected actions..."},taskType:{label:"Tasks for BAU (Select 1 or more)",tooltip:"Select the types of technical implementation"},nonImplementationReason:{label:"Reason for Non-Implementation (BAU Justification)"},description_justificativa:{label:"Justification / Description",placeholder:"Describe in detail what needs to be done..."},availability:{label:"Availability (at least 1 option)"},availability_1:{label:"Option 1 (Priority)"},availability_2:{label:"Option 2 (Optional)"},availability_3:{label:"Option 3 (Optional)"},suggestDiscard:{label:"Should the case be discarded by the TL?"},caseId:{label:"Case ID",placeholder:"Case ID"},language:{label:"Support Language",tooltip:"Comes from your segment in the People sheet. Change it only when this case is an exception to the rule."},language_descarte:{label:"Support Language"},description_descarte:{label:"Description",placeholder:"Describe the reason for the discard..."},discardReason:{label:"Discard Reason"}},Og={"Selecione um motivo...":"Selecciona un motivo...","Tempo da consultoria esgotado":"Tiempo de la consultor\xEDa agotado","Solicita\xE7\xE3o de reagendamento pelo anunciante":"Solicitud de reprogramaci\xF3n por parte del anunciante","Falta de acessos ou backup do site":"Falta de accesos o copia de seguridad del sitio","Anunciante indispon\xEDvel ou n\xE3o preparado":"Anunciante no disponible o no preparado","Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)":"Implementaci\xF3n parcial (no todas las tareas completadas)","Solicita\xE7\xE3o de tarefas (tasks) adicionais":"Solicitud de tareas adicionales","Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)":"Necesidad de nuevos cambios (fase de seguimiento)","Retorno de contato ap\xF3s prazo de 14 dias expirado":"Retorno de contacto despu\xE9s de vencido el plazo de 14 d\xEDas","Caso Filho gerado no atendimento":"Caso Hijo generado en la atenci\xF3n","3\xAA Tentativa de contato sem sucesso":"3.\xBA intento de contacto sin \xE9xito","Apenas o AM presente":"Solo el AM presente","Estouro de tempo para conclus\xE3o":"Tiempo excedido para la conclusi\xF3n","Gera\xE7\xE3o de caso BAU (Reagendamento)":"Generaci\xF3n de caso BAU (Reprogramaci\xF3n)",Sim:"S\xED",N\u00E3o:"No","Portugu\xEAs (PT-BR)":"Portugu\xE9s (PT-BR)","Espanhol (ES)":"Espa\xF1ol (ES)","Ingl\xEAs (EN)":"Ingl\xE9s (EN)"},qg={"Selecione um motivo...":"Select a reason...","Tempo da consultoria esgotado":"Consultation time ran out","Solicita\xE7\xE3o de reagendamento pelo anunciante":"Reschedule requested by the advertiser","Falta de acessos ou backup do site":"Missing access or site backup","Anunciante indispon\xEDvel ou n\xE3o preparado":"Advertiser unavailable or not prepared","Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)":"Partial implementation (not all tasks completed)","Solicita\xE7\xE3o de tarefas (tasks) adicionais":"Request for additional tasks","Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)":"Need for new changes (follow-up phase)","Retorno de contato ap\xF3s prazo de 14 dias expirado":"Contact follow-up after the 14-day deadline expired","Caso Filho gerado no atendimento":"Child Case generated during support","3\xAA Tentativa de contato sem sucesso":"3rd contact attempt unsuccessful","Apenas o AM presente":"Only the AM present","Estouro de tempo para conclus\xE3o":"Time overrun for completion","Gera\xE7\xE3o de caso BAU (Reagendamento)":"BAU case generation (Reschedule)",Sim:"Yes",N\u00E3o:"No","Portugu\xEAs (PT-BR)":"Portuguese (PT-BR)","Espanhol (ES)":"Spanish (ES)","Ingl\xEAs (EN)":"English (EN)"},Rg={es:Dg,en:Mg},Fg={es:Og,en:qg};function zg(e){return e?.i18nKey||e?.id||e?.name}function _t(e,t){let a=e?.[t];return Rg[ge()]?.[zg(e)]?.[t]??a}function qt(e){return Fg[ge()]?.[e]??e}var Pg=(()=>{let e=[];for(let t=420;t<=1260;t+=30)e.push(String(Math.floor(t/60)).padStart(2,"0")+":"+String(t%60).padStart(2,"0"));return e})(),Id={pt:{statusPending:"Aguardando TL",statusApproved:"Aprovado / Criado",statusKeptActive:"Mantido ativo pelo TL",statusDiscarded:"Descartado pelo TL",statusCreationRejected:"Recusado pelo TL",statusCanceled:"Cancelado",statusDefault:"Pendente",timezoneWarningStrong:"Aten\xE7\xE3o:",timezoneWarningText:"Para clientes fora do fuso hor\xE1rio do Brasil, o hor\xE1rio inserido deve corresponder sempre ao hor\xE1rio local do cliente, e n\xE3o ao do agente.",checkTimezone:"Consultar Time Zone",timezoneModuleNotFound:"M\xF3dulo Time Zone n\xE3o encontrado.",headerTitle:"BAU Central",headerDesc:"Dashboard de Casos BAU",openBauCase:"Abrir caso para BAU",openBauCaseDesc:"Fluxo completo para implementa\xE7\xF5es t\xE9cnicas e suporte especializado.",requestDiscard:"Solicitar Descarte",requestDiscardDesc:"Fluxo simplificado para casos que n\xE3o requerem implementa\xE7\xE3o.",back:"Voltar",next:"Pr\xF3ximo",configuringEdit:"Configurando Edi\xE7\xE3o...",loadDashboardError:"Erro ao carregar Dashboard. Verifique sua conex\xE3o.",copiedToClipboard:"Copiado para a \xE1rea de transfer\xEAncia!",noAdditionalContext:"Nenhum contexto adicional fornecido pelo agente.",notCaptured:"N\xE3o capturado",none:"Nenhuma",language:"Idioma",lastName:"Sobrenome",phone:"Telefone",clientTimezone:"Fuso hor\xE1rio do cliente",echoEquivalence:(e,t,a)=>`<strong>${e}</strong> em ${t} equivale a <strong>${a}</strong> em Bras\xEDlia.`,echoSameZone:"O cliente est\xE1 no mesmo fuso que voc\xEA.",editPageWarning:"Aten\xE7\xE3o: Para editar as informa\xE7\xF5es, voc\xEA deve estar com a p\xE1gina deste Caso espec\xEDfico aberta no sistema. Caso contr\xE1rio, os dados capturados estar\xE3o incorretos.",onCorrectPage:"Estou na p\xE1gina correta",sending:"Enviando...",caseCreatedNoEmailConfirm:"Caso criado, mas n\xE3o conseguimos confirmar por email.",unknownError:"Erro desconhecido",newBauCase:"Novo Caso BAU",backToDashboard:"Voltar ao Dashboard",confirmDataBeforeSending:"Confirme os dados antes de enviar",submitToTl:"Enviar para o TL",saveChanges:"Salvar Altera\xE7\xF5es",editingCase:e=>`Editando Caso #${e}`,fillDetailsBelow:"Preencha os detalhes abaixo",caseSentSuccess:"Caso enviado com sucesso!",caseSentSuccessSub:"Sua solicita\xE7\xE3o foi recebida e ser\xE1 processada em breve.",genericErrorTitle:"Ops! Algo deu errado",genericErrorSub:"N\xE3o conseguimos carregar seus casos BAU no momento.",tryAgain:"Tentar Novamente",notInformed:"N\xE3o informado",reasonTooltip:"O que deve ser feito em BAU",reasonPrefix:"Motivo:",metricAwaitingTl:"Aguardando TL",caseDetailsTitle:"Detalhes do Caso",copy:"Copiar",advertiser:"Anunciante",status:"Status",cidLabel:"CID",caseIdLabel:"Case ID",speakeasyId:"Speakeasy ID",advertiserEmail:"Email do Anunciante",site:"Site",timezone:"Timezone",responsibleAm:"AM Respons\xE1vel",salesProgram:"Programa de Vendas",bauReason:"Motivo BAU",requestedTasks:"Tasks solicitadas",justification:"Justificativa",detailedDescription:"Descri\xE7\xE3o detalhada",availability:"Disponibilidade",urgent:"Urgente",undefinedName:"Nome indefinido",customerIdTooltip:"Customer ID do Anunciante",cidTooltip:"CID do Anunciante (Formato: 000-000-0000)",incompleteData:"Dados Incompletos",invalidCid:"CID Inv\xE1lido",contactSupport:"Contate o Suporte",editRequest:"Editar Solicita\xE7\xE3o",edit:"Editar",refresh:"Atualizar",noRecentCases:"Nenhum caso recente",casesWillAppear:"Seus casos BAU aparecer\xE3o aqui",createdApproved:"Criados / Aprovados",refreshDashboard:"Atualizar Dashboard",statusPendingDiscard:"Descarte em avalia\xE7\xE3o",copyFieldAria:e=>`Copiar ${e} para a \xE1rea de transfer\xEAncia`,metricAwaitingDiscard:"Descarte em avalia\xE7\xE3o",rescanTitle:"Recapturar os dados desta tela",rescanDone:"Dados recapturados da tela atual.",errorPrefix:e=>`Erro: ${e}`,selectAtLeastOne:e=>`Erro: Selecione pelo menos uma op\xE7\xE3o para "${e}".`,fieldRequiredDouble:e=>`Erro: O campo "${e}" \xE9 obrigat\xF3rio.`,fieldRequiredSingle:e=>`Erro: O campo '${e}' \xE9 obrigat\xF3rio.`,whatMustBeDone:"O que deve ser feito",editTasksHint:"Para editar as tasks, volte ao Passo 2",editScheduleHint:"Para editar o agendamento, volte ao Passo 3",bauJustification:"Justificativa BAU",description:"Descri\xE7\xE3o",availabilityPriority:"Disponibilidade (Prioridade)",suggestDiscardQuestion:"O caso deve ser descartado pelo TL?",editingCaseHash:e=>`Voc\xEA est\xE1 editando o caso #${e}`,editingDiscardHash:e=>`Voc\xEA est\xE1 editando o descarte do caso #${e}`,discardReason:"Motivo do Descarte",discardDescription:"Descri\xE7\xE3o do Descarte",notInformedPlaceholder:"N\xE3o informado",caseUpdatedSuccess:"Caso atualizado com sucesso!",caseDiscardSentSuccess:"Caso enviado para descarte com sucesso!"},es:{statusPending:"Esperando al TL",statusApproved:"Aprobado / Creado",statusKeptActive:"Mantenido activo por el TL",statusDiscarded:"Descartado por el TL",statusCreationRejected:"Rechazado por el TL",statusCanceled:"Cancelado",statusDefault:"Pendiente",timezoneWarningStrong:"Atenci\xF3n:",timezoneWarningText:"Para clientes fuera del huso horario de Brasil, el horario ingresado siempre debe corresponder al horario local del cliente, no al del agente.",checkTimezone:"Consultar Time Zone",timezoneModuleNotFound:"M\xF3dulo Time Zone no encontrado.",headerTitle:"BAU Central",headerDesc:"Panel de Casos BAU",openBauCase:"Abrir caso para BAU",openBauCaseDesc:"Flujo completo para implementaciones t\xE9cnicas y soporte especializado.",requestDiscard:"Solicitar Descarte",requestDiscardDesc:"Flujo simplificado para casos que no requieren implementaci\xF3n.",back:"Volver",next:"Siguiente",configuringEdit:"Configurando Edici\xF3n...",loadDashboardError:"Error al cargar el Panel. Verifica tu conexi\xF3n.",copiedToClipboard:"\xA1Copiado al portapapeles!",noAdditionalContext:"Ning\xFAn contexto adicional proporcionado por el agente.",notCaptured:"No capturado",none:"Ninguna",language:"Idioma",lastName:"Apellido",phone:"Tel\xE9fono",clientTimezone:"Huso horario del cliente",echoEquivalence:(e,t,a)=>`<strong>${e}</strong> en ${t} equivale a <strong>${a}</strong> en Brasilia.`,echoSameZone:"El cliente est\xE1 en el mismo huso que t\xFA.",editPageWarning:"Atenci\xF3n: Para editar la informaci\xF3n, debes tener abierta en el sistema la p\xE1gina de este Caso espec\xEDfico. De lo contrario, los datos capturados estar\xE1n incorrectos.",onCorrectPage:"Estoy en la p\xE1gina correcta",sending:"Enviando...",caseCreatedNoEmailConfirm:"Caso creado, pero no pudimos confirmar por email.",unknownError:"Error desconocido",newBauCase:"Nuevo Caso BAU",backToDashboard:"Volver al Panel",confirmDataBeforeSending:"Confirma los datos antes de enviar",submitToTl:"Enviar al TL",saveChanges:"Guardar Cambios",editingCase:e=>`Editando Caso #${e}`,fillDetailsBelow:"Completa los detalles a continuaci\xF3n",caseSentSuccess:"\xA1Caso enviado con \xE9xito!",caseSentSuccessSub:"Tu solicitud fue recibida y ser\xE1 procesada en breve.",genericErrorTitle:"\xA1Ups! Algo sali\xF3 mal",genericErrorSub:"No pudimos cargar tus casos BAU en este momento.",tryAgain:"Intentar de Nuevo",notInformed:"No informado",reasonTooltip:"Qu\xE9 debe hacerse en BAU",reasonPrefix:"Motivo:",metricAwaitingTl:"Esperando al TL",caseDetailsTitle:"Detalles del Caso",copy:"Copiar",advertiser:"Anunciante",status:"Estado",cidLabel:"CID",caseIdLabel:"Case ID",speakeasyId:"Speakeasy ID",advertiserEmail:"Email del Anunciante",site:"Sitio",timezone:"Timezone",responsibleAm:"AM Responsable",salesProgram:"Programa de Ventas",bauReason:"Motivo BAU",requestedTasks:"Tareas solicitadas",justification:"Justificaci\xF3n",detailedDescription:"Descripci\xF3n detallada",availability:"Disponibilidad",urgent:"Urgente",undefinedName:"Nombre indefinido",customerIdTooltip:"Customer ID del Anunciante",cidTooltip:"CID del Anunciante (Formato: 000-000-0000)",incompleteData:"Datos Incompletos",invalidCid:"CID Inv\xE1lido",contactSupport:"Contacta al Soporte",editRequest:"Editar Solicitud",edit:"Editar",refresh:"Actualizar",noRecentCases:"Ning\xFAn caso reciente",casesWillAppear:"Tus casos BAU aparecer\xE1n aqu\xED",createdApproved:"Creados / Aprobados",refreshDashboard:"Actualizar Panel",statusPendingDiscard:"Descarte en evaluaci\xF3n",copyFieldAria:e=>`Copiar ${e} al portapapeles`,metricAwaitingDiscard:"Descarte en evaluaci\xF3n",rescanTitle:"Recapturar los datos de esta pantalla",rescanDone:"Datos recapturados de la pantalla actual.",errorPrefix:e=>`Error: ${e}`,selectAtLeastOne:e=>`Error: Selecciona al menos una opci\xF3n para "${e}".`,fieldRequiredDouble:e=>`Error: El campo "${e}" es obligatorio.`,fieldRequiredSingle:e=>`Error: El campo '${e}' es obligatorio.`,whatMustBeDone:"Qu\xE9 debe hacerse",editTasksHint:"Para editar las tareas, vuelve al Paso 2",editScheduleHint:"Para editar la programaci\xF3n, vuelve al Paso 3",bauJustification:"Justificaci\xF3n BAU",description:"Descripci\xF3n",availabilityPriority:"Disponibilidad (Prioridad)",suggestDiscardQuestion:"\xBFEl caso debe ser descartado por el TL?",editingCaseHash:e=>`Est\xE1s editando el caso #${e}`,editingDiscardHash:e=>`Est\xE1s editando el descarte del caso #${e}`,discardReason:"Motivo del Descarte",discardDescription:"Descripci\xF3n del Descarte",notInformedPlaceholder:"No informado",caseUpdatedSuccess:"\xA1Caso actualizado con \xE9xito!",caseDiscardSentSuccess:"\xA1Caso enviado a descarte con \xE9xito!"},en:{statusPending:"Awaiting TL",statusApproved:"Approved / Created",statusKeptActive:"Kept active by the TL",statusDiscarded:"Discarded by the TL",statusCreationRejected:"Rejected by the TL",statusCanceled:"Cancelled",statusDefault:"Pending",timezoneWarningStrong:"Important:",timezoneWarningText:"For customers outside Brazil's time zone, the time you enter must always match the customer's local time, not the agent's.",checkTimezone:"Check Time Zone",timezoneModuleNotFound:"Time Zone module not found.",headerTitle:"BAU Central",headerDesc:"BAU Case Dashboard",openBauCase:"Open a case for BAU",openBauCaseDesc:"Full flow for technical implementations and specialized support.",requestDiscard:"Request a Discard",requestDiscardDesc:"Simplified flow for cases that do not require implementation.",back:"Back",next:"Next",configuringEdit:"Setting up editing...",loadDashboardError:"Error loading the Dashboard. Check your connection.",copiedToClipboard:"Copied to the clipboard!",noAdditionalContext:"No additional context provided by the agent.",notCaptured:"Not captured",none:"None",language:"Language",lastName:"Last name",phone:"Phone",clientTimezone:"Customer time zone",echoEquivalence:(e,t,a)=>`<strong>${e}</strong> in ${t} is <strong>${a}</strong> in Bras\xEDlia.`,echoSameZone:"The customer is in the same time zone as you.",editPageWarning:"Important: to edit this information you must have this specific case's page open in the system. Otherwise the captured data will be incorrect.",onCorrectPage:"I am on the correct page",sending:"Sending...",caseCreatedNoEmailConfirm:"Case created, but we could not confirm it by email.",unknownError:"Unknown error",newBauCase:"New BAU Case",backToDashboard:"Back to the Dashboard",confirmDataBeforeSending:"Confirm the data before sending",submitToTl:"Send to the TL",saveChanges:"Save Changes",editingCase:e=>`Editing Case #${e}`,fillDetailsBelow:"Fill in the details below",caseSentSuccess:"Case sent successfully!",caseSentSuccessSub:"Your request has been received and will be processed shortly.",genericErrorTitle:"Oops! Something went wrong",genericErrorSub:"We could not load your BAU cases right now.",tryAgain:"Try Again",notInformed:"Not provided",reasonTooltip:"What must be done in BAU",reasonPrefix:"Reason:",metricAwaitingTl:"Awaiting TL",caseDetailsTitle:"Case Details",copy:"Copy",advertiser:"Advertiser",status:"Status",cidLabel:"CID",caseIdLabel:"Case ID",speakeasyId:"Speakeasy ID",advertiserEmail:"Advertiser Email",site:"Site",timezone:"Timezone",responsibleAm:"Responsible AM",salesProgram:"Sales Program",bauReason:"BAU Reason",requestedTasks:"Requested tasks",justification:"Justification",detailedDescription:"Detailed description",availability:"Availability",urgent:"Urgent",undefinedName:"Name undefined",customerIdTooltip:"Advertiser's Customer ID",cidTooltip:"Advertiser's CID (Format: 000-000-0000)",incompleteData:"Incomplete Data",invalidCid:"Invalid CID",contactSupport:"Contact Support",editRequest:"Edit Request",edit:"Edit",refresh:"Refresh",noRecentCases:"No recent cases",casesWillAppear:"Your BAU cases will appear here",createdApproved:"Created / Approved",refreshDashboard:"Refresh Dashboard",statusPendingDiscard:"Discard under review",copyFieldAria:e=>`Copy ${e} to the clipboard`,metricAwaitingDiscard:"Discard under review",rescanTitle:"Recapture the data on this screen",rescanDone:"Data recaptured from the current screen.",errorPrefix:e=>`Error: ${e}`,selectAtLeastOne:e=>`Error: select at least one option for "${e}".`,fieldRequiredDouble:e=>`Error: the field "${e}" is required.`,fieldRequiredSingle:e=>`Error: the field '${e}' is required.`,whatMustBeDone:"What must be done",editTasksHint:"To edit the tasks, go back to Step 2",editScheduleHint:"To edit the scheduling, go back to Step 3",bauJustification:"BAU Justification",description:"Description",availabilityPriority:"Availability (Priority)",suggestDiscardQuestion:"Should the case be discarded by the TL?",editingCaseHash:e=>`You are editing case #${e}`,editingDiscardHash:e=>`You are editing the discard for case #${e}`,discardReason:"Discard Reason",discardDescription:"Discard Description",notInformedPlaceholder:"Not provided",caseUpdatedSuccess:"Case updated successfully!",caseDiscardSentSuccess:"Case sent for discard successfully!"}};function B(e){let t=ge();return Id[t]?.[e]??Id.pt[e]}function Md(e){let t=ge();return`${e.flag} ${Yn(e,t)} \u2014 ${wo(e,t)}`}var nt={add:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',back:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',wand:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.41l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/></svg>',send:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',check:'<svg width="64" height="64" viewBox="0 0 24 24" fill="none"><path class="bau-check-path" d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',folder:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',empty:'<svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.44 2s2.75-.81 3.44-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z"/></svg>',refresh:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',expand:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>'};function Nd(e,t){if(e==="CREATED"&&t==="KEPT_ACTIVE")return{text:B("statusKeptActive"),class:"status-green",aura:"status-green-aura"};if(e==="DISCARDED"&&t==="REJECTED_CREATION")return{text:B("statusCreationRejected"),class:"status-red",aura:"status-red-aura"};switch(e){case"PENDING_TL_CREATION":return{text:B("statusPending"),class:"status-yellow",aura:"status-yellow-aura"};case"PENDING_TL_DISCARD":return{text:B("statusPendingDiscard"),class:"status-orange",aura:"status-orange-aura"};case"CREATED":return{text:B("statusApproved"),class:"status-green",aura:"status-green-aura"};case"DISCARDED":return{text:B("statusDiscarded"),class:"status-red",aura:"status-red-aura"};case"CANCELED_BY_AGENT":return{text:B("statusCanceled"),class:"status-gray",aura:""};default:return{text:e||B("statusDefault"),class:"status-gray",aura:""}}}function $g(e,t,a){let o=document.createElement("label");return o.className="bau-task-item",o.classList.toggle("active",a),o.innerHTML=`<input type="checkbox" name="${t}" value="${e}"><span>${e}</span>`,o.querySelector("input").checked=a,o.addEventListener("click",n=>{n.preventDefault();let i=o.querySelector("input");i.checked=!i.checked,o.classList.toggle("active",i.checked),y.playClick()}),o}function Sr(e,t=[]){let a=e.dataset.fieldName||"taskType",o=new Set(Array.from(e.querySelectorAll("input:checked")).map(i=>i.value));t.map(i=>String(i||"").trim()).filter(Boolean).forEach(i=>o.add(i));let n=Td();o.forEach(i=>{n.includes(i)||n.push(i)}),e.innerHTML="",n.forEach(i=>e.appendChild($g(i,a,o.has(i))))}function Ld(e,t=[]){e.querySelectorAll("input:checked").forEach(a=>{a.checked=!1}),Sr(e,t)}function _d(e){let t=document.createElement("div");if(t.className="bau-dynamic-input",t.id=`wrapper-${e.id}`,e.label){let o=document.createElement("label");o.className="bau-label",o.textContent=_t(e,"label"),e.tooltip&&o.setAttribute("data-tooltip",_t(e,"tooltip")),t.appendChild(o)}let a;switch(e.type){case"textarea":a=document.createElement("textarea"),a.style.minHeight="80px",t.appendChild(a);break;case"select":a=document.createElement("select"),e.groups?e.groups.forEach(l=>{let d=document.createElement("optgroup");d.label=l.label,l.options.forEach(c=>{let g=document.createElement("option");g.value=c.value,g.textContent=qt(c.text),d.appendChild(g)}),a.appendChild(d)}):e.options&&e.options.forEach(l=>{let d=document.createElement("option");d.value=l.value,d.textContent=qt(l.text),a.appendChild(d)}),t.appendChild(a);break;case"checkbox-grid":return a=document.createElement("div"),a.className="bau-tasks-grid",a.dataset.fieldName=e.name,Sr(a),t.appendChild(a),t;case"datetime-group":a=document.createElement("div"),a.className="bau-availability-container";let o=document.createElement("div");o.className="bau-timezone-row",o.innerHTML=`
                <span class="bau-field-hint">${B("clientTimezone")}</span>
                <select name="availabilityTimezone" class="bau-select">
                    ${Ia.map(l=>`<option value="${l.zone}">${Md(l)}</option>`).join("")}
                </select>
            `,a.appendChild(o),e.fields.forEach(l=>{let d=document.createElement("div");d.className="bau-availability-field",d.innerHTML=`
                    <span class="bau-field-hint">${_t(l,"label")}</span>
                    <div class="bau-slot-row">
                        <input type="date" name="${l.name}_date" class="bau-input" ${l.required?"required":""}>
                        <select name="${l.name}_time" class="bau-select">
                            <option value="">--:--</option>
                            ${Pg.map(c=>`<option value="${c}">${c}</option>`).join("")}
                        </select>
                    </div>
                `,a.appendChild(d)});let n=document.createElement("div");n.className="bau-timezone-echo",n.id="bau-availability-echo",a.appendChild(n);let i=document.createElement("div");return i.className="bau-availability-disclaimer",i.innerHTML=`
                <div class="bau-disclaimer-text">
                    <strong>${B("timezoneWarningStrong")}</strong> ${B("timezoneWarningText")}
                </div>
                <button type="button" class="bau-timezone-link" id="bau-open-timezone">
                    ${nt.refresh}
                    ${B("checkTimezone")}
                </button>
            `,i.querySelector("#bau-open-timezone").onclick=()=>{let l=document.getElementById("cw-btn-timezone");l?(l.click(),y.playClick()):(y.playError(),ne(B("timezoneModuleNotFound"),{error:!0}))},t.appendChild(a),t.appendChild(i),t;case"text-with-button":let r=document.createElement("div");r.className="bau-input-group",a=document.createElement("input"),a.type="text";let s=document.createElement("button");s.type="button",s.id=e.button.id,s.className="bau-mini-btn-input",s.title=_t(e,"buttonTitle")||e.button.title,s.innerHTML=nt[e.button.icon]||"",r.appendChild(a),r.appendChild(s),t.appendChild(r);break;default:a=document.createElement("input"),a.type="text",t.appendChild(a)}return a&&e.type!=="checkbox-grid"&&e.type!=="datetime-group"&&(a.id=`bau-form-${e.id}`,a.name=e.name,a.className=e.type==="select"?"bau-select":e.type==="textarea"?"bau-textarea":"bau-input",e.placeholder&&(a.placeholder=_t(e,"placeholder")),e.required&&(a.required=!0)),t}function Dd(e){return _t(e,"error")||e?.validation?.error||""}function Od(){Ed();let e=!1,t="dashboard",a=null,o=0,n="BAU",i=!1,r=null,s=ha.steps.length,l=document.createElement("div");l.id="bau-form-popup",l.className="bau-popup cw-module-window",l.style.display="none";let d=B("headerTitle"),c=B("headerDesc"),g=rt(l,d,"v2.2.0",c,{},()=>h());l.appendChild(g);let u=document.createElement("div");u.className="bau-view-container",l.appendChild(u);let b=document.createElement("div");b.id="bau-view-dashboard",b.className="bau-view active",b.innerHTML=`
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
    `,u.appendChild(b);let L=document.createElement("div");L.id="bau-view-form",L.className="bau-view";let A=document.createElement("div");A.className="bau-view-header",A.innerHTML=`
      <button class="bau-back-btn" id="bau-form-back-btn">
        ${nt.back}
        <span class="js-bau-back-dashboard">${B("backToDashboard")}</span>
      </button>
    `,L.appendChild(A);let C=document.createElement("div");C.className="bau-content",L.appendChild(C);let z=document.createElement("div");z.className="bau-form-loading-overlay",z.innerHTML=`
        <div class="bau-spinner"></div>
        <div class="bau-loading-text js-bau-configuring-edit">${B("configuringEdit")}</div>
    `,C.appendChild(z);let G=p=>{z.classList.toggle("active",p)},R=document.createElement("div");R.className="bau-progress-indicator",C.appendChild(R);let O=document.createElement("form");O.id="bau-escalation-form",O.noValidate=!0,C.appendChild(O),ha.steps.forEach(p=>{let N=document.createElement("div");if(N.className="bau-step"+(p.id===o?" active":""),N.id=`bau-step-${p.id}`,p.isBranching)N.innerHTML=`
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
            `,N.querySelector("#bau-opt-full").onclick=()=>{n="BAU",o=1,O.querySelectorAll(".bau-highlight-panel").forEach(M=>M.classList.remove("discard-theme")),le(),y.playClick()},N.querySelector("#bau-opt-discard").onclick=()=>{n="DISCARD",o=5,O.querySelectorAll(".bau-highlight-panel").forEach(M=>M.classList.add("discard-theme")),le(),y.playClick()};else if(p.isConfirmation)N.innerHTML=`
                <div class="bau-card">
                    <h3 class="bau-step-title">${B("confirmDataBeforeSending")}</h3>
                    <div id="bau-confirmation-details"></div>
                </div>
            `;else{let M=document.createElement("div");if(M.className="bau-card",p.id===1||p.id===5){M.innerHTML=`
                    <div class="bau-vital-highlights bau-highlight-panel"></div>
                    <div class="bau-dynamic-inputs-container"></div>
                    <div class="bau-all-data"></div>
                `;let f=M.querySelector(".bau-dynamic-inputs-container");p.fields.forEach(_=>{f.appendChild(_d(_))});let x=M.querySelector("#wrapper-cid");if(x){let _=document.createElement("div");_.id="bau-cid-error",_.className="bau-cid-error-hint",_.style.display="none",_.textContent=Dd(p.fields.find(k=>k.id==="cid")),x.appendChild(_)}}else p.fields.forEach(f=>{M.appendChild(_d(f))});N.appendChild(M)}O.appendChild(N)});let de=document.createElement("div");de.className="bau-footer";let te=document.createElement("button");te.type="button",te.id="bau-step-back-btn",te.className="bau-btn-secondary",te.textContent=B("back");let re=document.createElement("button");re.type="button",re.id="bau-step-next-btn",re.className="bau-btn-primary",re.textContent=B("next");let ee=document.createElement("button");ee.type="submit",ee.className="bau-btn-submit",ee.innerHTML=`${nt.send} ${B("submitToTl")}`,ee.style.display="none",de.appendChild(te),de.appendChild(re),de.appendChild(ee),O.appendChild(de),u.appendChild(L);let w=document.createElement("div");w.id="bau-view-success",w.className="bau-view bau-success-view",w.innerHTML=`
        <div class="bau-success-content">
            <div class="bau-success-icon" style="color: ${Ct.green};">${nt.check}</div>
            <h2 class="bau-success-title js-bau-success-title">${B("caseSentSuccess")}</h2>
            <p class="bau-success-subtitle js-bau-success-sub">${B("caseSentSuccessSub")}</p>
            <button class="bau-btn-primary js-bau-success-back" id="bau-success-back-btn">${B("backToDashboard")}</button>
        </div>
    `,u.appendChild(w),document.body.appendChild(l),co(()=>{let p=O.querySelector(".bau-tasks-grid");p&&Sr(p)});function S(p){t=p,l.querySelectorAll(".bau-view").forEach(_=>_.classList.remove("active"));let N=l.querySelector(`#bau-view-${p}`);N&&N.classList.add("active");let M=g.querySelector(".cw-module-header-title")||g.querySelector("h2"),f=g.querySelector(".cw-module-header-subtitle")||g.querySelector("p");M&&(p==="form"?M.textContent=i?B("editingCase")(r):B("newBauCase"):M.textContent=B("headerTitle")),f&&(f.textContent=B(p==="form"?"fillDetailsBelow":"headerDesc"));let x=O.querySelector(".bau-btn-submit");x&&(x.innerHTML=i?`${nt.send} ${B("saveChanges")}`:`${nt.send} ${B("submitToTl")}`)}function D(){let p=l.querySelector("#bau-case-list-container"),N=l.querySelector("#bau-dashboard-metrics");N&&(N.innerHTML=`
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
            `),p&&(p.innerHTML=Array(5).fill(0).map(()=>`
            <div class="bau-skeleton-card">
                <div class="bau-shimmer"></div>
            </div>
        `).join(""))}async function j(){let p=l.querySelector("#bau-case-list-container"),N=l.querySelector("#bau-dashboard-metrics");if(!(!p||!N)){D();try{let M=await ls();if(!Array.isArray(M))throw new Error("API response is not a valid array");ce(M)}catch(M){console.error("Critical Error loading BAU cases:",M),N&&(N.innerHTML=""),p.innerHTML=`
                <div class="bau-empty-state bau-error-state">
                    <div style="color: ${Ct.red}; margin-bottom: 16px;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    </div>
                    <h3 class="bau-empty-title">${B("genericErrorTitle")}</h3>
                    <p class="bau-empty-subtitle">${B("genericErrorSub")}</p>
                    <button class="bau-btn-secondary" id="bau-retry-btn" style="margin-top: 16px;">
                        ${B("tryAgain")}
                    </button>
                </div>
            `,l.querySelector("#bau-retry-btn")?.addEventListener("click",()=>j()),y.playError(),ne(B("loadDashboardError"),{error:!0})}}}function F(p){let N=l.querySelector("#bau-md-detail");if(!N||!p)return;let M=Nd(p.status,p.processedAction),f=k=>k||"---",x=[{rotulo:B("cidLabel"),valor:p.cid,mono:!0},{rotulo:B("caseIdLabel"),valor:p.caseId,mono:!0},{rotulo:B("speakeasyId"),valor:p.seId,mono:!0},{rotulo:B("advertiserEmail"),valor:p.advEmail},{rotulo:B("phone"),valor:p.advPhone,mono:!0},{rotulo:B("site"),valor:p.site},{rotulo:B("responsibleAm"),valor:p.amName}],_=[{rotulo:B("bauReason"),valor:p.reason||B("notInformed")},{rotulo:B("requestedTasks"),valor:p.task||p.taskType||B("none")},{rotulo:B("justification"),valor:f(p.nonImplementationReason)},{rotulo:B("detailedDescription"),valor:f(p.description)},{rotulo:B("availability"),valor:Po(p.availability)},{rotulo:B("timezone"),valor:f(p.timezone)},{rotulo:B("language"),valor:f(p.language)},{rotulo:B("salesProgram"),valor:f(p.salesProgram)}];N.innerHTML=`
            <div class="bau-md-head">
                <h2 class="bau-md-title">${[p.advName,p.advLastName].filter(Boolean).join(" ")||B("undefinedName")}</h2>
                <div class="bau-md-head-meta">
                    <span class="bau-case-status-badge ${M.class}">${M.text}</span>
                    <span class="bau-md-date">${Po(p.date)}</span>
                </div>
            </div>

            <section class="bau-md-briefing" aria-label="${B("bauReason")}">
                ${_.map((k,W)=>`
                    <div class="bau-md-line${W===_.length-1?" is-last":""}">
                        <span class="bau-md-label">${k.rotulo}</span>
                        <span class="bau-md-value">${k.valor}</span>
                    </div>
                `).join("")}
            </section>

            <section class="bau-md-data" aria-label="${B("caseDetailsTitle")}">
                ${x.map((k,W)=>`
                    <div class="bau-md-line${W===x.length-1?" is-last":""}">
                        <span class="bau-md-label">${k.rotulo}</span>
                        <span class="bau-md-value${k.mono?" is-mono":""}">${f(k.valor)}</span>
                        ${k.valor?`
                            <button type="button" class="bau-md-copy"
                                    data-valor="${String(k.valor).replace(/"/g,"&quot;")}"
                                    aria-label="${B("copyFieldAria")(k.rotulo)}">
                                ${nt.wand}
                            </button>`:""}
                    </div>
                `).join("")}
            </section>
        `}function Z(p){if(!p)return"";let N=Nd(p?.status,p?.processedAction),M=Po(p?.date),f="",x="",_=String(p?.availability||"").split("|")[0].trim();if(p?.status==="PENDING_TL_CREATION"&&_){let be=new Date(_),Ie=new Date;!isNaN(be.getTime())&&(be<=Ie||be-Ie<36e5*2)&&(f=`<span class="bau-sla-badge">${B("urgent")}</span>`,x="bau-pulse-attention")}let k=p?.reason&&p.reason.trim()?p.reason:B("noAdditionalContext"),U=/^(\d{3}-\d{3}-\d{4}|\d{10})$/.test(p?.cid||""),oe=!p?.caseId||p.caseId==="N/A"||!U;return oe&&p?.status==="PENDING_TL_CREATION"&&(x="bau-pulse-attention"),`
            <li class="bau-case-card ${N.aura} ${x}" data-case-id="${p?.id||""}">
                <div class="bau-case-main">
                    <div class="bau-case-icon">${nt.folder}</div>
                    <div class="bau-case-info">
                        <div class="bau-case-header">
                            <h3 class="bau-case-title">${[p?.advName,p?.advLastName].filter(Boolean).join(" ")||B("undefinedName")}</h3>
                            ${f}
                            <span class="bau-case-date">${M}</span>
                        </div>
                        <p class="bau-case-details">
                            <span data-tooltip="${B("customerIdTooltip")}">Case: ${p?.caseId||"N/A"}</span> \u2022
                            <span data-tooltip="${B("cidTooltip")}" class="${U?"":"bau-error-text"}">CID: ${p?.cid||"N/A"}</span> \u2022
                            <span data-tooltip="${B("reasonTooltip")}">${B("reasonPrefix")} ${k}</span>
                        </p>
                        ${oe?`<div class="bau-data-error-hint">${!p?.caseId||p?.caseId==="N/A"?B("incompleteData"):B("invalidCid")} - ${B("contactSupport")}</div>`:""}
                    </div>
                </div>
                <div class="bau-case-actions">
                    <span class="bau-case-status-badge ${N.class}">${N.text}</span>
                    ${p?.status&&p.status.includes("PENDING")?`
                        <button class="bau-case-edit-btn" data-id="${p.id}" title="${B("editRequest")}">
                            ${nt.edit}
                            ${B("edit")}
                        </button>
                    `:""}
                </div>
            </li>
        `}let fe=null;function he(){fe=null,l.querySelector(".bau-md")?.classList.remove("is-open"),l.querySelectorAll("#bau-case-list-container .bau-case-card").forEach(p=>{p.classList.remove("is-selected"),p.setAttribute("aria-expanded","false")})}function ue(p,N){if(fe===N?.id){he(),y.playSwoosh();return}fe=N?.id||null,l.querySelectorAll("#bau-case-list-container .bau-case-card").forEach(M=>{let f=M===p;M.classList.toggle("is-selected",f),M.setAttribute("aria-expanded",f?"true":"false")}),F(N),l.querySelector(".bau-md")?.classList.add("is-open"),y.playClick()}function ce(p){let N=l.querySelector("#bau-case-list-container"),M=l.querySelector("#bau-dashboard-metrics");if(!N||!M)return;let f=Array.isArray(p)?p.filter(Boolean):[];if(f.length===0){M.innerHTML=`
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
            `,l.querySelector("#bau-refresh-dashboard")?.addEventListener("click",()=>j());return}let x=f.filter(be=>be.status==="PENDING_TL_CREATION").length,_=f.filter(be=>be.status==="PENDING_TL_DISCARD").length,k=f.filter(be=>be.status==="CREATED").length;M.innerHTML=`
            <div class="bau-metric-card">
                <span class="bau-metric-value">${x}</span>
                <span class="bau-metric-label">${B("metricAwaitingTl")}</span>
            </div>
            <div class="bau-metric-card">
                <span class="bau-metric-value">${_}</span>
                <span class="bau-metric-label">${B("metricAwaitingDiscard")}</span>
            </div>
            <div class="bau-metric-card">
                <span class="bau-metric-value">${k}</span>
                <span class="bau-metric-label">${B("createdApproved")}</span>
            </div>
            <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard" title="${B("refreshDashboard")}">
                ${nt.refresh}
            </button>
        `;let W=M.querySelector("#bau-refresh-dashboard");W?.addEventListener("click",async()=>{W.classList.contains("spinning")||(W.classList.add("spinning"),y.playClick(),await j(),setTimeout(()=>W.classList.remove("spinning"),1e3))}),N.innerHTML="",he();let U=f.slice(0,5),oe=f.slice(5);if(U.forEach(be=>{let Ie=Z(be),Oe=document.createElement("div");Oe.innerHTML=Ie;let ke=Oe.firstElementChild;ke.addEventListener("click",Ye=>{Ye.target.closest(".bau-case-edit-btn")||ue(ke,be)});let wt=ke.querySelector(".bau-case-edit-btn");wt&&(wt.onclick=Ye=>{Ye.stopPropagation(),pe(be)}),N.appendChild(ke)}),oe.length>0){let be=document.createElement("li");be.className="bau-accordion-container";let Ie=document.createElement("button");Ie.className="bau-accordion-toggle",Ie.innerHTML=`${nt.expand} <span>Mostrar ${oe.length} casos mais antigos</span>`;let Oe=document.createElement("ul");Oe.className="bau-case-list bau-accordion-content",Oe.style.display="none",oe.forEach(ke=>{let wt=Z(ke),Ye=document.createElement("div");Ye.innerHTML=wt;let gt=Ye.firstElementChild;gt.addEventListener("click",yt=>{yt.target.closest(".bau-case-edit-btn")||ue(gt,ke)});let oa=gt.querySelector(".bau-case-edit-btn");oa&&(oa.onclick=yt=>{yt.stopPropagation(),pe(ke)}),Oe.appendChild(gt)}),Ie.addEventListener("click",()=>{let ke=Oe.style.display==="none";Oe.style.display=ke?"block":"none",Ie.classList.toggle("expanded",ke),Ie.querySelector("span").textContent=ke?"Esconder casos mais antigos":`Mostrar ${oe.length} casos mais antigos`,y.playClick()}),be.appendChild(Ie),be.appendChild(Oe),N.appendChild(be)}}function le(){let p=n==="BAU"?[1,2,3,4]:[5,4];O.querySelectorAll(".bau-step").forEach(f=>{let x=parseInt(f.id.replace("bau-step-","")),_=x===o,k=p.includes(x)||x===0;f.classList.toggle("active",_),f.style.display=_?"block":"none",f.querySelectorAll("input, select, textarea").forEach(W=>{W.disabled=!k})});let N=o===0;if(R.style.display=N?"none":"flex",!N){R.innerHTML="";let f=n==="BAU"?[1,2,3,4]:[5,4];f.forEach((x,_)=>{let k=document.createElement("div"),W=x===o,U=f.indexOf(o),oe=_<U;k.className=`bau-progress-step ${W?"active":oe?"completed":""}`,k.textContent=_+1,R.appendChild(k)})}let M=o===4;te.style.display=o>0?"inline-block":"none",re.style.display=!N&&!M?"inline-block":"none",ee.style.display=M?"flex":"none",M&&Q()}function xe(p){let N=ha.steps.find(M=>M.id===p);if(!N||!N.fields||N.isConfirmation)return!0;for(let M of N.fields){let f=O.querySelector(`#bau-step-${p} #wrapper-${M.id}`);if(!(f&&f.style.display==="none")&&M.validation){let x=O.querySelector(`#bau-step-${p} [name="${M.name}"]`);if(x&&x.offsetParent!==null&&x.value.trim())if(new RegExp(M.validation.regex).test(x.value.trim())){x.classList.remove("invalid-cid");let k=O.querySelector("#bau-cid-error");k&&(k.style.display="none")}else{console.warn(`Validation failed for field "${M.name}" in step ${p}: Regex mismatch.`),y.playError(),ne(B("errorPrefix")(_t(M,"error")||M.validation.error),{error:!0}),x.classList.add("invalid-cid");let k=O.querySelector("#bau-cid-error");return k&&(k.style.display="flex"),!1}}}return!0}function E(p){Pa("erro"),p&&(p.classList.remove("bau-shake"),p.offsetWidth,p.classList.add("bau-shake"),p.addEventListener("animationend",()=>p.classList.remove("bau-shake"),{once:!0}),typeof p.focus=="function"&&p.focus({preventScroll:!1}))}function K(p){if(!O.querySelector(`#bau-step-${p}`))return!1;let M=ha.steps.find(x=>x.id===p);if(!M||!M.fields||M.isConfirmation)return!0;let f=!0;for(let x of M.fields){let _=O.querySelector(`#bau-step-${p} #wrapper-${x.id}`);if(!(_&&_.style.display==="none")&&x.required){let k=!0,W="";if(x.type==="checkbox-grid")O.querySelector(`#bau-step-${p} input[name="${x.name}"]:checked`)||(W="No option selected in checkbox-grid",y.playError(),ne(B("selectAtLeastOne")(_t(x,"label")),{error:!0}),k=!1);else if(x.type==="datetime-group"){let U=x.fields[0].name,oe=O.querySelector(`#bau-step-${p} input[name="${U}_date"]`),be=O.querySelector(`#bau-step-${p} select[name="${U}_time"]`);if(!oe||oe.offsetParent===null)continue;(!oe.value.trim()||!be||!be.value.trim())&&(W="Datetime group first field is empty",y.playError(),E(oe),ne(B("fieldRequiredDouble")(_t(x.fields[0],"label")),{error:!0}),k=!1)}else{let U=O.querySelector(`#bau-step-${p} [name="${x.name}"]`);if(!U||U.offsetParent===null)continue;U.value.trim()||(W="Field is empty",y.playError(),E(U),ne(B("fieldRequiredSingle")(_t(x,"label")),{error:!0}),k=!1)}if(!k){console.warn(`Validation failed for required field "${x.name}" in step ${p}: ${W}`),f=!1;break}}}return f}re.addEventListener("click",()=>{if(xe(o)&&K(o)){n==="BAU"?o++:o===5?o=4:o++,le();let p=l.querySelector(".bau-content");p&&(p.scrollTop=0),y.playClick()}}),te.addEventListener("click",()=>{o>0&&(n==="BAU"?o--:o===4?o=5:o===5?o=0:o--,le(),y.playClick())});async function se(){let p=await Ut()||{};a=p,O.querySelectorAll(".bau-vital-highlights").forEach(k=>{let W=[{label:"Anunciante",value:p.advName},{label:"CID",value:p.cid},{label:"Website",value:p.website||p.site},{label:"Case ID",value:p.caseId}];k.innerHTML=W.map(U=>{let oe=U.value&&U.value!=="N/A"&&U.value!=="undefined"&&U.value!=="null"?U.value:B("notCaptured");return`
                    <div class="bau-highlight-item">
                        <span class="bau-highlight-label">${U.label}</span>
                        <span class="bau-highlight-value">${oe}</span>
                    </div>
                `}).join("")+`
                <button type="button" class="bau-rescan-btn" title="${B("rescanTitle")}" aria-label="${B("rescanTitle")}">
                    ${nt.refresh}
                </button>
            `}),ha.steps.forEach(k=>{k.fields&&k.fields.forEach(W=>{if(W.isSmart){let U=p[W.id],oe=O.querySelector(`#bau-step-${k.id} [name="${W.name}"]`),be=O.querySelector(`#bau-step-${k.id} #wrapper-${W.id}`);if(oe&&(oe.value=U&&U!=="N/A"?U:""),be){let Ie=U&&U!==""&&U!=="N/A"&&U!=="undefined"&&U!=="null";be.style.display=Ie?"none":"block"}}})});let M=mr(p.timezone)||Na,f=O.querySelector('select[name="availabilityTimezone"]');f&&(f.value=M,ie());let x=p.userProfile?.defaultLanguage;x&&O.querySelectorAll('select[name="language"]').forEach(k=>{k.value=x}),O.querySelectorAll(".bau-all-data").forEach(k=>{let W=[{label:"Anunciante",value:p.advName},{label:"CID",value:p.cid},{label:"AM",value:p.amName},{label:"SE ID",value:p.seId},{label:"Site",value:p.website||p.site},{label:"Email",value:p.email},{label:"Timezone",value:p.timezone},{label:"Case ID",value:p.caseId},{label:"Programa",value:p.salesProgram},{label:"Idioma",value:p.language}];k.innerHTML=`
                <div class="bau-context-badges-grid">
                    ${W.filter(U=>U.value&&U.value!=="N/A"&&U.value!=="---"&&U.value!=="undefined"&&U.value!=="null").map(U=>`
                            <div class="bau-context-badge">
                                <span class="bau-badge-label">${U.label}:</span>
                                <span class="bau-badge-value">${U.value}</span>
                            </div>
                        `).join("")}
                </div>
            `})}l.addEventListener("keydown",p=>{p.key!=="Escape"||!fe||(p.stopPropagation(),he(),y.playSwoosh())}),l.addEventListener("click",async p=>{let N=p.target.closest(".bau-md-copy");if(!N)return;p.preventDefault();let M=N.getAttribute("data-valor")||"";if(M){try{await navigator.clipboard.writeText(M)}catch(f){console.warn("Falha ao copiar:",f),y.playError(),ne(B("genericErrorTitle"),{error:!0});return}N.classList.add("is-done"),N.innerHTML=nt.check||nt.wand,y.playClick(),Pa("confirma"),ne(B("copiedToClipboard")),setTimeout(()=>{N.classList.remove("is-done"),N.innerHTML=nt.wand},1500)}}),l.addEventListener("click",async p=>{let N=p.target.closest(".bau-rescan-btn");if(!(!N||N.classList.contains("spinning"))){p.preventDefault(),N.classList.add("spinning"),y.playClick();try{await se(),ne(B("rescanDone"))}catch(M){console.warn("Falha ao recapturar o contexto:",M),y.playError(),ne(B("genericErrorTitle"),{error:!0})}finally{l.querySelectorAll(".bau-rescan-btn.spinning").forEach(M=>M.classList.remove("spinning"))}}}),l.addEventListener("click",p=>{let N=p.target.closest(".bau-mini-btn-input");if(!N)return;let M=N.closest(".bau-input-group")?.querySelector('input[name="seId"]');M&&(p.preventDefault(),y.playClick(),lo(M))});let V=l.querySelector("#bau-form-cid");V&&V.addEventListener("input",()=>xe(1)),O.addEventListener("change",p=>{let N=p.target?.name||"";(N==="availabilityTimezone"||N.startsWith("availability_"))&&ie()});function q(p){let N=p.availabilityTimezone||Na;return["availability_1","availability_2","availability_3"].map(M=>{let f=p[`${M}_date`],x=p[`${M}_time`];return!f||!x?"":ur(`${f}T${x}`,N)}).filter(Boolean)}function T(p){let N=p.availabilityTimezone||Na,M=Ia.find(_=>_.zone===N),f=q(p);return f.length===0?B("notInformedPlaceholder"):`${f.map(_=>{let[k,W]=_.split("T"),[U,oe,be]=k.split("-");return`${be}/${oe} ${W.slice(0,5)}`}).join("  \xB7  ")} \u2014 ${M?wo(M,ge()):N}`}function H(p,N){((_,k)=>{let W=p.querySelector(_);W&&(W.textContent=k)})(".bau-timezone-row .bau-field-hint",B("clientTimezone")),p.querySelectorAll('select[name="availabilityTimezone"] option').forEach(_=>{let k=Ia.find(W=>W.zone===_.value);k&&(_.textContent=Md(k))}),p.querySelectorAll(".bau-availability-field .bau-field-hint").forEach((_,k)=>{N.fields[k]&&(_.textContent=_t(N.fields[k],"label"))});let f=p.querySelector(".bau-disclaimer-text");f&&(f.innerHTML=`<strong>${B("timezoneWarningStrong")}</strong> ${B("timezoneWarningText")}`);let x=p.querySelector("#bau-open-timezone");x&&(x.innerHTML=`${nt.refresh} ${B("checkTimezone")}`),ie()}function ie(){let p=O.querySelector("#bau-availability-echo");if(!p)return;let N=Object.fromEntries(new FormData(O).entries()),M=N.availabilityTimezone||Na,f=N.availability_1_date,x=N.availability_1_time;if(!f||!x){p.innerHTML="";return}if(M===Na){p.textContent=B("echoSameZone");return}let _=ur(`${f}T${x}`,M),k=new Date(_);if(isNaN(k.getTime())){p.innerHTML="";return}let W=new Intl.DateTimeFormat(Oa(),{timeZone:Na,day:"2-digit",month:gn(),hour:"2-digit",minute:"2-digit",hour12:!1}).format(k),U=Ia.find(oe=>oe.zone===M);p.innerHTML=B("echoEquivalence")(x,U?wo(U,ge()):M,W)}function P(p){return(ha.steps.flatMap(M=>M.fields||[]).find(M=>M.id==="language")?.options||[]).map(M=>`<option value="${M.value}" ${M.value===p?"selected":""}>${qt(M.text)}</option>`).join("")}function Q(){let p=new FormData(O),N=Object.fromEntries(p.entries()),M=l.querySelector("#bau-confirmation-details");if(M){if(n==="BAU"){let f=p.getAll("taskType"),x=f.length>0?f.join(", "):B("none");M.innerHTML=`
                ${i?`<div class="bau-highlight-panel" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${Ct.yellow}; background: rgba(255, 186, 0, 0.05); border-radius: 8px; font-weight: 500;">${B("editingCaseHash")(`<span style="color: ${Ct.yellow}">${r}</span>`)}</div>`:""}
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
                            <option value="Tempo da consultoria esgotado" ${N.nonImplementationReason==="Tempo da consultoria esgotado"?"selected":""}>${qt("Tempo da consultoria esgotado")}</option>
                            <option value="Solicita\xE7\xE3o de reagendamento pelo anunciante" ${N.nonImplementationReason==="Solicita\xE7\xE3o de reagendamento pelo anunciante"?"selected":""}>${qt("Solicita\xE7\xE3o de reagendamento pelo anunciante")}</option>
                            <option value="Falta de acessos ou backup do site" ${N.nonImplementationReason==="Falta de acessos ou backup do site"?"selected":""}>${qt("Falta de acessos ou backup do site")}</option>
                            <option value="Anunciante indispon\xEDvel ou n\xE3o preparado" ${N.nonImplementationReason==="Anunciante indispon\xEDvel ou n\xE3o preparado"?"selected":""}>${qt("Anunciante indispon\xEDvel ou n\xE3o preparado")}</option>
                            <option value="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)" ${N.nonImplementationReason==="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"?"selected":""}>${qt("Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)")}</option>
                            <option value="Solicita\xE7\xE3o de tarefas (tasks) adicionais" ${N.nonImplementationReason==="Solicita\xE7\xE3o de tarefas (tasks) adicionais"?"selected":""}>${qt("Solicita\xE7\xE3o de tarefas (tasks) adicionais")}</option>
                            <option value="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)" ${N.nonImplementationReason==="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"?"selected":""}>${qt("Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)")}</option>
                            <option value="Retorno de contato ap\xF3s prazo de 14 dias expirado" ${N.nonImplementationReason==="Retorno de contato ap\xF3s prazo de 14 dias expirado"?"selected":""}>${qt("Retorno de contato ap\xF3s prazo de 14 dias expirado")}</option>
                        </select>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${B("description")}</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="3" placeholder="---">${N.description||""}</textarea>
                    </div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${B("availabilityPriority")}</span>
                        <span class="bau-confirm-value-input" style="cursor: default; opacity: 0.8;" title="${B("editScheduleHint")}">${T(N)}</span>
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${B("suggestDiscardQuestion")}</span>
                        <select class="bau-confirm-value-input" data-field="suggestDiscard" data-step="3">
                            <option value="N\xE3o" ${N.suggestDiscard==="N\xE3o"?"selected":""}>${qt("N\xE3o")}</option>
                            <option value="Sim" ${N.suggestDiscard==="Sim"?"selected":""}>${qt("Sim")}</option>
                        </select>
                    </div>
                </div>
            `}else M.innerHTML=`
                ${i?`<div class="bau-highlight-panel discard-theme" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${Ct.red}; background: rgba(217, 48, 37, 0.05); border-radius: 8px; font-weight: 500;">${B("editingDiscardHash")(`<span style="color: ${Ct.red}">${r}</span>`)}</div>`:""}
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
            `;M.querySelectorAll(".bau-confirm-value-input").forEach(f=>{f.addEventListener("input",x=>{let _=x.target.dataset.field,k=x.target.dataset.step;if(!_||!k)return;let W=O.querySelector(`#bau-step-${k} [name="${_}"]`);W&&(W.value=x.target.value,_==="cid"&&xe(1))})})}}async function pe(p){if(!await ot(B("editPageWarning"),{confirmText:B("onCorrectPage")}))return;G(!0),v(),i=!0,r=p.id,n=p.status==="PENDING_TL_DISCARD"||p.reason&&!p.task?"DISCARD":"BAU",S("form"),await se(),a={...a,advName:p.advName||a.advName,advLastName:p.advLastName||a.advLastName,advPhone:p.advPhone||a.advPhone,cid:p.cid||a.cid,caseId:p.caseId||a.caseId,seId:p.seId||a.seId,site:p.site||p.website||a.site||a.website,email:p.advEmail||a.email,timezone:p.timezone||a.timezone,language:p.language||a.language,amName:p.amName||a.amName,salesProgram:p.salesProgram||a.salesProgram};let M=p.availability?p.availability.split("|").map(_=>_.trim()):[],f=(p.task||p.taskType||"").split(",").map(_=>_.trim()).filter(Boolean),x=O.querySelector(".bau-tasks-grid");x&&Ld(x,f),O.querySelectorAll("input, select, textarea").forEach(_=>{let k=_.name,U={advEmail:"advEmail",website:"site",site:"site"}[k]||k;if(k==="taskType"){let oe=(p.task||p.taskType||"").split(",").map(be=>be.trim());_.type==="checkbox"&&(_.checked=oe.includes(_.value),_.closest(".bau-task-item")?.classList.toggle("active",_.checked))}else if(k==="availabilityTimezone"){let oe=mr(p.timezone)||Na;Array.from(_.options).some(be=>be.value===oe)&&(_.value=oe)}else if(k.startsWith("availability_")){let oe=k.split("_"),be=parseInt(oe[1],10)-1,Ie=oe[2],Oe=M[be],ke=String(Oe||"").match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/);if(!ke)return;Ie==="date"&&(_.value=ke[1]),Ie==="time"&&(Array.from(_.options).some(wt=>wt.value===ke[2])||_.add(new Option(ke[2],ke[2])),_.value=ke[2])}else k==="language"||k==="suggestDiscard"?Array.from(_.options).some(be=>be.value===p[k])&&(_.value=p[k]):p[U]!==void 0?_.value=p[U]:k==="reason"?_.value=p.reason:k==="description"?_.value=p.description:k==="nonImplementationReason"&&(_.value=p.nonImplementationReason||"")}),o=n==="BAU"?1:5,le(),y.playClick(),setTimeout(()=>G(!1),500)}O.onsubmit=async p=>{p.preventDefault();let N=n==="BAU"?[1,2,3]:[5];for(let W of N)if(!ha.steps.find(oe=>oe.id===W)?.isConfirmation&&(!xe(W)||!K(W))){console.warn(`Form submission blocked by validation failure in step ${W}`),o=W,le();return}let M=l.querySelector(".bau-btn-submit");M.disabled=!0,M.innerHTML=B("sending");let f=new FormData(O),x=Object.fromEntries(f.entries()),_=a||{},k={..._,...x,requestType:n};if(x.advEmail?k.advEmail=x.advEmail:_.email&&(k.advEmail=_.email),x.website?k.website=x.website:_.website?k.website=_.website:_.site&&(k.website=_.site),n==="BAU"){let W=f.getAll("taskType"),U=q(x).join(" | ");k.taskType=W.join(", "),k.availability=U,i?(x.nonImplementationReason?k.nonImplementationReason=x.nonImplementationReason:delete k.nonImplementationReason,x.description?k.description=x.description:delete k.description):(k.nonImplementationReason=x.nonImplementationReason||"",k.description=x.description||"",k.nonImplementationReason||console.warn("Aviso: Campo 'Justificativa' (nonImplementationReason) est\xE1 saindo vazio."),k.description||console.warn("Aviso: Campo 'Descri\xE7\xE3o detalhada' (description) est\xE1 saindo vazio."))}else k.reason=x.reason,i?(x.description?k.description=x.description:delete k.description,delete k.taskType,delete k.availability,delete k.nonImplementationReason):(k.taskType="",k.availability="",k.nonImplementationReason="",k.description=x.description||"");try{let W=null;i?await cs(r,k):W=await ss(k,_.agentEmail||"anon"),y.playSuccess(),Pa("concluido");let U=l.querySelector(".bau-success-title");U&&(i?U.textContent=B("caseUpdatedSuccess"):U.textContent=B(n==="DISCARD"?"caseDiscardSentSuccess":"caseSentSuccess")),S("success"),!i&&W&&W.emailSent===!1&&(y.playError(),ne(B("caseCreatedNoEmailConfirm"),{error:!0}))}catch(W){y.playError(),ne(B("errorPrefix")(W.message||B("unknownError")),{error:!0}),console.error("Payload que tentou enviar:",k)}finally{M.disabled=!1,M.innerHTML=`${nt.send} ${B("submitToTl")}`}};function v(){O.reset(),o=0,n="BAU",i=!1,r=null,le();let p=O.querySelector(".bau-tasks-grid");p&&Ld(p)}l.querySelector("#bau-new-case-btn").addEventListener("click",()=>{v(),S("form"),se()}),l.querySelector("#bau-form-back-btn").addEventListener("click",()=>S("dashboard")),l.querySelector("#bau-success-back-btn").addEventListener("click",()=>S("dashboard"));async function h(){e=!ht(l),e&&(l.style.display="flex"),e?(Qe(),S("dashboard"),j()):Je(),dt(e,l,"cw-btn-bauform")}return le(),je(()=>{let p=l.querySelector(".cw-help-title");p&&(p.textContent=B("headerTitle"));let N=l.querySelector(".cw-help-description");N&&(N.textContent=B("headerDesc"));let M=l.querySelector(".js-bau-new-case");M&&(M.textContent=B("newBauCase"));let f=l.querySelector(".js-bau-back-dashboard");f&&(f.textContent=B("backToDashboard"));let x=l.querySelector(".js-bau-configuring-edit");x&&(x.textContent=B("configuringEdit"));let _=l.querySelector(".js-bau-success-title");_&&(_.textContent=B("caseSentSuccess"));let k=l.querySelector(".js-bau-success-sub");k&&(k.textContent=B("caseSentSuccessSub"));let W=l.querySelector(".js-bau-success-back");W&&(W.textContent=B("backToDashboard")),te.textContent=B("back"),re.textContent=B("next");let U=l.querySelector("#bau-md-detail");U&&U.setAttribute("aria-label",B("caseDetailsTitle")),S(t);let oe=(be,Ie)=>{let Oe=O.querySelector(be);Oe&&(Oe.textContent=Ie)};oe("#bau-opt-full .bau-branching-title",B("openBauCase")),oe("#bau-opt-full .bau-branching-subtitle",B("openBauCaseDesc")),oe("#bau-opt-discard .bau-branching-title",B("requestDiscard")),oe("#bau-opt-discard .bau-branching-subtitle",B("requestDiscardDesc")),oe("#bau-step-4 .bau-step-title",B("confirmDataBeforeSending")),O.querySelectorAll(".bau-step").forEach(be=>{let Ie=parseInt(be.id.replace("bau-step-",""),10),Oe=ha.steps.find(ke=>ke.id===Ie);!Oe||Oe.isBranching||Oe.isConfirmation||be.querySelectorAll(".bau-dynamic-input").forEach(ke=>{let wt=ke.id.replace("wrapper-",""),Ye=Oe.fields?.find(yt=>yt.id===wt);if(!Ye)return;let gt=ke.querySelector(".bau-label");gt&&Ye.label&&(gt.textContent=_t(Ye,"label"),Ye.tooltip&&gt.setAttribute("data-tooltip",_t(Ye,"tooltip")));let oa=ke.querySelector("input, textarea, select");if(oa&&Ye.placeholder&&(oa.placeholder=_t(Ye,"placeholder")),wt==="cid"){let yt=ke.querySelector("#bau-cid-error");yt&&(yt.textContent=Dd(Ye))}if(Ye.type==="datetime-group"&&H(ke,Ye),Ye.type==="text-with-button"){let yt=ke.querySelector(".bau-mini-btn-input");yt&&(yt.title=_t(Ye,"buttonTitle")||Ye.button.title)}if(Ye.type==="select"){let yt=Ye.groups?Ye.groups.flatMap(da=>da.options):Ye.options||[];ke.querySelectorAll("option").forEach((da,va)=>{let na=yt[va];na&&(da.textContent=qt(na.text))})}})}),t==="dashboard"&&j()}),h}var Xn=[["AS - Acceptable Reschedule","optional"],["AS - Reschedule 1","optional"],["NI - Awaiting Inputs","customer"],["NI - In Consult",3],["NI - Awaiting Validation",2],["NI - Attempted Contact","policy"],["DC - Test Case","na"],["DC - Not Needed","na"],["DC - No response (Hybrid case)","na"],["DC - Out of Scope","na"],["DC - Authentication Failed","na"],["IN - Infeasible","na"],["IN - Not Reachable","na"],["IN - Not Interested","na"],["IN - Not Ready","na"],["IN - Out of Scope - Rerouted","na"],["IN - Reschedule Limit Exceeded","na"],["IN - Troubleshooting [Transferred]","na"],["IN - Instruction Shared","na"],["SO - Implementation Only","na"],["SO - Educational Only","na"],["SO - Troubleshooting Only","na"]],Bg=["NI - Attempted Contact","IN - Not Reachable"],tn=["ads_conversion_tracking","ads_enhanced_conversions"],Ar=["before","impl","after"],qd={today:["before","impl"],past:["after"]},Er=["call_summary","case_comments","oncall_comments"],ja="extras",zd=["kv","group","cid"],Pd=["text","long","date","yesno","link","cid","speakeasy","derived"],$d=["tbw","cid","yn","text","link","smeyes"],kr=/^[a-z][a-z0-9_]{0,39}$/,Bd="ads_enhanced_conversions";function Kn(e={}){return Object.assign({seg:"all",flow:"bau",europe:!1,substatus:"",tasks:[],forced:[],active:[],optIn:[],vals:{},cids:[],taskPrints:[],splitUsed:!1},e)}function an(e=""){return{tbw:"TBW",cid:e,mcc:"",outcome:"",alink:"",sme:"YES",tag:"",caseid:"",elig:"",galactic:""}}function ta(e,t){return e.vals[t]||(e.vals[t]={v:"",na:!1,comment:"",touched:!1,auto:!1,defaulted:!1}),e.vals[t]}function _a(e,t){return e.segments.find(a=>a.key===t)||null}function Da(e,t){let a=_a(e,t);return a?a.blocks.some(o=>jd(e.blocks[o.b]).some(n=>n.type==="derived"&&n.auto==="tasks")):!1}function Gd(e,t){return Da(e,t.seg)?t.tasks||[]:[]}function Ha(e,t){return Gd(e,t).map(a=>a.key)}function Gg(e,t,a){return Ha(e,t).includes(a==="ecw"?Bd:a)}function jd(e){let t=[];if(!e)return t;for(let a of e.sections||[])a.rows&&t.push(...a.rows);return t}function So(e,t,a){if(!a)return!0;if(a.flow&&t.flow!==a.flow||a.europe!==void 0&&!!t.europe!==a.europe||a.substatusAny&&!a.substatusAny.includes(t.substatus))return!1;if(a.tasksAny){let o=Ha(e,t);if(!a.tasksAny.some(n=>o.includes(n)))return!1}if(a.tasksNone){let o=Ha(e,t);if(!o.length||a.tasksNone.some(n=>o.includes(n)))return!1}return!(a.splitAny&&!(t.splitUsed&&a.splitAny.includes(t.substatus))||a.rowIs&&ta(t,a.rowIs.id).v!==a.rowIs.v)}function Qn(e,t,a){return a.requiredWhen?So(e,t,a.requiredWhen):!!a.required}function Co(e,t,a,o={}){return a.visible===!1?!1:o.ignoreWhen?!0:!(a.onlyFor&&!a.onlyFor.every(n=>Gg(e,t,n))||!So(e,t,a.when)||a.optIn&&!(t.optIn||[]).includes(a.id)&&!(a.requiredWhen&&So(e,t,a.requiredWhen)))}function Tr(e){let t=Xn.find(a=>a[0]===e);return t?t[1]:null}function Hd(e){return Xn.some(t=>t[0]===e)}function Jn(e,t){return Ha(e,t).some(a=>tn.includes(a))&&ta(t,"ts_used").v==="Yes"}function Cr(e,t,a){return Jn(e,t)&&tn.includes(a)&&Ha(e,t).includes(a)&&!(t.forced||[]).includes(a)}function Ao(e,t,a,o){if(a.type!=="link"||!Ar.includes(o)||!Jn(e,t))return!1;if(a.onlyFor)return a.onlyFor.every(i=>Cr(e,t,i==="ecw"?Bd:i));let n=Ha(e,t).filter(i=>tn.includes(i));return n.length>0&&n.every(i=>Cr(e,t,i))}function jg(e,t,a=""){return Gd(e,t).map(o=>Cr(e,t,o.key)?`${o.name} - ${a}`:o.count>1?`${o.name} (x${o.count})`:o.name).join(", ")}function Ud(e,t){return Da(e,t.seg)?(t.taskPrints||[]).filter(a=>a&&String(a.v||"").trim()).map((a,o)=>({id:`tp_${o}`,label:{en:String(a.label||"")},type:"link",value:String(a.v).trim()})):[]}var Vd=e=>e.trim().toUpperCase()==="NA";function Ua(e,t,a,o={}){let n=ta(t,a.id),i=a.na!==!1;if(a.type==="derived"){if(a.auto==="substatus")return t.substatus||null;if(a.auto==="europe")return"Yes";if(a.auto==="fixed")return At(a.value,o.lang)||null;if(a.auto==="tasks"){let s=jg(e,t,o.tsDisclaimer);return s||(n.na?"NA":null)}return null}if(n.na&&i)return"NA";let r=String(n.v||"").trim();return r?Vd(r)?i?"NA":null:r:o.blockId&&Ao(e,t,a,o.blockId)?"NA":Qn(e,t,a)?null:"NA"}function on(e){return/^https?:\/\/\S+$/i.test(String(e||"").trim())}function Wd(e,t){let a=String(t||"").trim();return a?Vd(a)?e.na===!1:e.type==="date"?!/^\d{4}-\d{2}-\d{2}$/.test(a):e.type==="link"?!on(a):!1:!1}function Ir(e){let t=String(e||"").replace(/\D/g,"");return t.length===10?`${t.slice(0,3)}-${t.slice(3,6)}-${t.slice(6)}`:String(e||"")}function Nr(e,t){return e.type==="smeyes"?t.sme||"YES":e.type==="tbw"?t.tbw||"TBW":String(t[e.id]||"").trim()}function ca(e,t){let a=_a(e,t.seg);if(!a)return[];let o=t.active||[],n=a.blocks.filter(i=>o.includes(i.b)&&i.b!==ja&&e.blocks[i.b]);return n.length?(e.blocks[ja]&&n.push({b:ja,title:""}),n):[]}function Lr(e,t){let a=_a(e,t);return!a||!a.blocks.length?[]:a.select==="multi"?[...a.always||[]]:[a.blocks[0].b]}function Yd(e,t,a){let o=a.suggest;if(!o)return!1;let n=Ha(e,t);return!!(o.tasksAny&&o.tasksAny.some(i=>n.includes(i))||o.substatusAny&&o.substatusAny.includes(t.substatus)||o.splitAny&&t.splitUsed&&o.splitAny.includes(t.substatus))}var Rd=e=>String(e).padStart(2,"0"),Zn=e=>`${e.getFullYear()}-${Rd(e.getMonth()+1)}-${Rd(e.getDate())}`;function _r(e,t=new Date){let a=new Date(t.getFullYear(),t.getMonth(),t.getDate(),12),o=e;for(;o>0;){a.setDate(a.getDate()+1);let n=a.getDay();n!==0&&n!==6&&o--}return Zn(a)}var Hg={jan:1,ene:1,fev:2,feb:2,mar:3,abr:4,apr:4,mai:5,may:5,jun:6,jul:7,ago:8,aug:8,set:9,sep:9,sept:9,out:10,oct:10,nov:11,dez:12,dec:12,dic:12};function Ug(e){let t=String(e||"").trim();if(!t)return null;let a=t.match(/^(\d{4})-([A-Za-z]{3,4}\.?|\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?\s*(UTC|GMT|Z)?$/i);if(!a)return null;let o=+a[1],n=/^\d/.test(a[2])?+a[2]:Hg[a[2].replace(".","").toLowerCase()],i=+a[3];if(!n||n>12||i<1||i>31)return null;let r=a[4]!==void 0,s=r&&a[7]?new Date(Date.UTC(o,n-1,i,+a[4],+a[5],+(a[6]||0))):new Date(o,n-1,i,r?+a[4]:12,r?+a[5]:0);return Number.isNaN(s.getTime())||!(r&&a[7])&&(s.getMonth()!==n-1||s.getDate()!==i)?null:Zn(s)}function ei(e,t,a,o=new Date){let n=Lr(e,t),i=_a(e,t);if(!i||i.select!=="multi")return n;let r=Ug(a);if(!r)return n;let s=Zn(o),l=r===s?qd.today:r<s?qd.past:[],d=i.blocks.map(c=>c.b);return[...n,...l.filter(c=>d.includes(c)&&!n.includes(c))]}function Vg(e){let t=new Map;for(let a of Object.values(e.blocks))for(let o of jd(a))t.has(o.id)||t.set(o.id,o);return[...t.values()]}function Xd(e,t,a={}){let o=a.now||new Date,n=a.today||Zn(o);for(let i of Vg(e)){let r=ta(t,i.id);if(i.default!==void 0&&!r.touched&&!r.v&&!r.na&&(r.v=i.default),!(!i.auto||i.type==="derived"||r.touched))if(i.auto==="today")r.v=n,r.auto=!0;else if(i.auto==="cid")r.v=a.cid||"",r.auto=!!a.cid;else if(i.auto==="followup"){let s=Tr(t.substatus);typeof s=="number"?(r.v=_r(s,o),r.na=!1,r.auto=!0):s==="na"?(r.v="",r.na=!0,r.auto=!0):(r.auto&&(r.v="",r.na=!1),r.auto=!1)}else i.auto==="consent"&&(Bg.includes(t.substatus)?(r.na=!0,r.auto=!0,r.defaulted=!1):t.europe?(r.na=!1,r.auto=!1,r.defaulted&&(r.v=""),r.defaulted=!1):(r.na=!1,r.auto=!1,r.v="Yes",r.defaulted=!0))}return t}function nn(e,t){let a=ta(e,t);return a.touched=!0,a.auto=!1,a.defaulted=!1,a}var Fd=e=>String(e||"").replace(/[:?]\s*$/,"");function At(e,t){return typeof e=="string"?e:e&&(e[t]||e.en)||""}function Kd(e,t,a={}){let o=[],n=new Set,i=(r,s)=>{n.has(r)||(n.add(r),o.push({key:r,label:s}))};for(let r of ca(e,t)){let s=e.blocks[r.b];for(let l of s.sections){if(l.kind==="cid"){let d=t.cids||[];d.length||i(`cids:${r.b}`,"CID-Level Details"),d.forEach((c,g)=>l.columns.forEach(u=>{u.required!==!1&&!Nr(u,c)&&i(`cid:${g}:${u.id}`,`CID ${g+1}: ${Fd(At(u.label,a.lang))}`)}));continue}for(let d of l.rows||[])Co(e,t,d)&&Ua(e,t,d,{...a,blockId:r.b})===null&&i(d.id,Fd(At(d.label,a.lang)))}}return o}function Qd(e,t,a={}){let o=0;for(let n of ca(e,t))for(let i of e.blocks[n.b].sections)for(let r of i.rows||[])!Co(e,t,r)||r.na===!1||!Qn(e,t,r)||Ua(e,t,r,{...a,blockId:n.b})===null&&(ta(t,r.id).na=!0,o++);return o}var Pt={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",bgInput:"#f8f9fa",surface:"#fff"},Mr="'Google Sans', Roboto, Arial, sans-serif",Or="1px solid rgba(60,64,67,.16)",Yg="#fef7e0",Dr={bg:"#e6f4ea",text:"#137333",accent:"#34a853"},Xg="Additional Comments (Optional)",Jd={pt:"Nota criada atrav\xE9s do Cases Wizard.",es:"Nota creada a trav\xE9s de Cases Wizard.",en:"Note created through Cases Wizard."};function Dt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Eo(e){return String(e??"").replace(/\r\n?/g,`
`).split(`
`).filter(t=>t.trim()).map(t=>Dt(t.replace(/\s+$/,"")).replace(/\*\*([^*]+?)\*\*/g,"<b>$1</b>")).join("<br>")}function Kg({row:e,span:t=1,rowspan:a=1,head:o,bg:n,bold:i,color:r,valign:s="top",vline:l,accent:d},c){let g=["padding:8px 12px","font-size:13px","line-height:1.45",`vertical-align:${s}`,"word-break:break-word","overflow-wrap:anywhere",e>0?`border-top:${Or}`:"",d?`border-left:4px solid ${d}`:l?`border-left:${Or}`:"",`background-color:${n||Pt.surface}`,`color:${r||Pt.text}`,i||o?"font-weight:700":"font-weight:400","text-align:left"].filter(Boolean).join(";"),u=o?"th":"td";return`<${u}${t>1?` colspan="${t}"`:""}${a>1?` rowspan="${a}"`:""} style="${g}">${c}</${u}>`}function Qg(e,t){let a=[],o="";return e.forEach((n,i)=>{a[i]=a[i]||[];let r=0,s="";for(let l of n){for(;a[i][r];)r++;let d=l.span||1,c=l.rowspan||1;for(let g=0;g<c;g++){a[i+g]=a[i+g]||[];for(let u=0;u<d;u++)a[i+g][r+u]=!0}s+=Kg({...l,row:i,vline:!!l.vline&&r>0},l.html),r+=d}o+=`<tr${t&&n.rowId?` data-row="${Dt(n.rowId)}"`:""}>${s}</tr>`}),o}var ti=(e,t)=>Object.assign(e,{rowId:t});function Jg(e,t,a,o={}){let n=e.blocks[a.b];if(!n)return"";let i=n.cols,r=o.lang||"en",s=!!o.live,l=()=>s?{bg:Yg,html:`<span style="color:#b06000;font-style:italic">${Dt(o.pendingLabel||"pending")}</span>`}:{html:"NA"},d=[],c=a.b===ja?Ud(e,t):[],g=n.sections.map(z=>z.kind).lastIndexOf("kv");if(n.sections.forEach((z,G)=>{if(z.kind==="cid"){d.push([{span:i,head:!0,bg:Pt.primaryBg,html:Dt(At(z.title,r))}]),d.push(z.columns.map(w=>({head:!0,vline:!0,bg:Pt.bgInput,color:Pt.textSub,html:Dt(At(w.label,r))})));let ee=t.cids||[];ee.length||d.push([{span:i,...l()}]),ee.forEach((w,S)=>d.push(ti(z.columns.map((D,j)=>{let F=Nr(D,w);return F?{bold:j===0,vline:!0,html:Eo(F)}:{bold:j===0,vline:!0,...l()}}),`cid:${S}:${z.columns[0].id}`)));return}let R=(z.rows||[]).filter(ee=>Co(e,t,ee,{ignoreWhen:o.ignoreWhen})),O=G===g?c:[];if(!R.length&&!O.length)return;let de=[{span:i-1,head:!0,bg:Pt.primaryBg,html:Dt(At(z.title,r))},{head:!0,vline:!0,bg:Pt.bgInput,color:Pt.textSub,html:Xg}];d.push(de);let te={blockId:a.b,tsDisclaimer:o.tsDisclaimer,lang:r},re=o.tsBlockNote;if(re&&re.title&&z.kind==="group"&&Ar.includes(a.b)&&R.some(ee=>Ao(e,t,ee,a.b))&&d.push([{span:i,bg:Dr.bg,color:Dr.text,accent:Dr.accent,html:`<div style="font-weight:700">\u2713 ${Dt(re.title)}</div><div style="font-weight:400;margin-top:2px">${Dt(re.body||"")}</div>`}]),z.kind==="group")R.forEach((ee,w)=>{let S=Ua(e,t,ee,te),D=[];w===0&&D.push({rowspan:R.length,bold:!0,bg:Pt.bgInput,color:Pt.primary,valign:"middle",html:Dt(At(z.group,r))}),D.push({bold:!0,html:Dt(At(ee.label,r))}),D.push(S===null?l():{html:Eo(S)}),D.push({vline:!0,html:Eo(ta(t,ee.id).comment)}),d.push(ti(D,ee.id))});else{let ee=i===3?1:2,w=i-ee-1;for(let S of R){let D=Ua(e,t,S,te);d.push(ti([{span:ee,bold:!0,bg:Pt.bgInput,html:Dt(At(S.label,r))},D===null?{span:w,...l()}:{span:w,html:Eo(D)},{vline:!0,html:Eo(ta(t,S.id).comment)}],S.id))}for(let S of O)d.push(ti([{span:ee,bold:!0,bg:Pt.bgInput,html:Dt(S.label.en)},{span:w,html:Eo(S.value)},{vline:!0,html:""}],S.id))}}),!d.length)return"";let u=`width:100%;table-layout:fixed;border-collapse:separate;border-spacing:0;border:${Or};border-radius:12px;overflow:hidden;font-family:${Mr};margin:0 0 4px 0`,b=`<colgroup>${n.widths.map(z=>`<col style="width:${z}%">`).join("")}</colgroup>`,L=_a(e,t.seg),A=At(a.title,r);return`${L&&L.showTitle&&A?`<div${s?` data-block-h="${Dt(a.b)}"`:""} style="font-family:${Mr};font-size:13px;font-weight:700;color:${Pt.primary};margin:16px 0 6px 0">${Dt(A)}</div>`:""}<table${s?` data-block="${Dt(a.b)}"`:""} style="${u}">${b}<tbody>${Qg(d,s)}</tbody></table>`}function qr(e,t,a={}){let o=a.lang||"en",n=ca(e,t).map(r=>Jg(e,t,r,a)).filter(Boolean);if(!n.length)return"";let i=a.footer||Jd[o]||Jd.en;return n.join('<div style="height:10px"></div>')+`<div style="font-family:${Mr};font-size:12px;font-style:italic;color:${Pt.textSub};margin-top:8px">${Dt(i)}</div>`}var Rr={blocks:{general:{name:"General details",cols:4,widths:[16,16,46,22],sections:[{kind:"kv",title:"General Details (Mandatory)",rows:[{id:"date",label:{en:"Date:",pt:"Data:",es:"Fecha:"},type:"date",required:!0,na:!1,visible:!0,auto:"today",hint:{pt:"Data da call, da tentativa de contato ou do follow-up (YYYY-MM-DD).",es:"Fecha de la llamada, del intento de contacto o del follow-up (YYYY-MM-DD).",en:"Date of the call, the contact attempt or the follow-up (YYYY-MM-DD)."}},{id:"speakeasy",label:{en:"Speakeasy ID:",pt:"Speakeasy ID:",es:"Speakeasy ID:"},type:"speakeasy",required:!0,na:!0,visible:!0,hint:{pt:"ID exato da sess\xE3o do SpeakEasy. V\xE1rias liga\xE7\xF5es: separe por v\xEDrgula. NA para atendimento offline ou s\xF3 por e-mail.",es:"ID exacto de la sesi\xF3n de SpeakEasy. Varias llamadas: sep\xE1relos con coma. NA para atenci\xF3n offline o solo por correo.",en:"Exact SpeakEasy session ID. Several calls: separate with commas. NA for offline or email-only handling."}},{id:"substatus",label:{en:"Sub-status:",pt:"Sub-status:",es:"Subestado:"},type:"derived",required:!0,na:!1,visible:!0,auto:"substatus",hint:{pt:"Vem do campo Sub-status no topo.",es:"Viene del campo Subestado, arriba.",en:"Comes from the Sub-status field at the top."}},{id:"next_followup",label:{en:"Next Follow-Up Date:",pt:"Data do pr\xF3ximo follow-up:",es:"Fecha del pr\xF3ximo follow-up:"},type:"date",required:!0,na:!0,visible:!0,auto:"followup",hint:{pt:"Data do pr\xF3ximo follow-up, ou NA.",es:"Fecha del pr\xF3ximo follow-up, o NA.",en:"Next follow-up date, or NA."}},{id:"task_types",label:{en:"Task types:",pt:"Tipos de task:",es:"Tipos de task:"},type:"derived",required:!0,na:!0,visible:!0,auto:"tasks",hint:{pt:"V\xEAm das tasks marcadas. NA s\xF3 se nenhuma task esteve envolvida.",es:"Vienen de las tasks marcadas. NA solo si ninguna task estuvo involucrada.",en:"Comes from the selected tasks. NA only if no task was involved."}},{id:"impl_tags",label:{en:"Implemented tags:",pt:"Tags implementadas:",es:"Etiquetas implementadas:"},type:"text",required:!0,na:!0,visible:!0,hint:{pt:"Nome exato das conversion actions criadas, verificadas ou corrigidas, separados por v\xEDrgula (ex.: Phone_call, lead_form). NA se n\xE3o se aplica.",es:"Nombre exacto de las conversion actions creadas, verificadas o corregidas, separados por coma (ej.: Phone_call, lead_form). NA si no aplica.",en:"Exact names of the conversion actions created, verified or fixed, comma-separated (e.g. Phone_call, lead_form). NA if not applicable."}},{id:"cid",label:{en:"CID:",pt:"CID:",es:"CID:"},type:"cid",required:!0,na:!0,visible:!0,auto:"cid",hint:{pt:"CID de 10 d\xEDgitos (XXX-XXX-XXXX) confirmado com o anunciante. V\xE1rios: separe por v\xEDrgula.",es:"CID de 10 d\xEDgitos (XXX-XXX-XXXX) confirmado con el anunciante. Varios: sep\xE1relos con coma.",en:"10-digit CID (XXX-XXX-XXXX) confirmed with the advertiser. Several: separate with commas."}},{id:"consent",label:{en:"Checked and obtained recording consent from the customer before proceeding with the call?",pt:"Verificou e obteve o consentimento do cliente para a grava\xE7\xE3o antes de seguir com a call?",es:"\xBFVerific\xF3 y obtuvo el consentimiento del cliente para la grabaci\xF3n antes de continuar con la llamada?"},type:"yesno",required:!0,na:!0,visible:!0,auto:"consent",hint:{pt:'Fora da Europa o padr\xE3o \xE9 Yes (a alternativa fica em "Alterar"). No caso da Europa o agente marca. NA para NI - Attempted Contact e IN - Not Reachable.',es:'Fuera de Europa el valor predeterminado es Yes (la alternativa est\xE1 en "Cambiar"). En el caso de Europa, lo marca el agente. NA para NI - Attempted Contact e IN - Not Reachable.',en:'Outside Europe the default is Yes (the alternative is under "Change"). For a Europe case the agent marks it. NA for NI - Attempted Contact and IN - Not Reachable.'}},{id:"call_summary",label:{en:"Call Summary:",pt:"Resumo da call:",es:"Resumen de la llamada:"},type:"long",required:!0,na:!1,visible:!0,hint:{pt:"Resumo curto do que aconteceu na call ou no e-mail.",es:"Resumen breve de lo que pas\xF3 en la llamada o en el correo.",en:"Short summary of what happened on the call or in the email."}},{id:"substatus_reason",label:{en:"Sub-status Reason:",pt:"Motivo do sub-status:",es:"Motivo del subestado:"},type:"long",required:!0,na:!1,visible:!0,hint:{pt:"Justificativa exata do sub-status escolhido.",es:"Justificaci\xF3n exacta del subestado elegido.",en:"Exact justification for the chosen sub-status."}},{id:"additional_info",label:{en:"Additional information:",pt:"Informa\xE7\xF5es adicionais:",es:"Informaci\xF3n adicional:"},type:"long",required:!1,na:!0,visible:!0,hint:{pt:"Opcional. Vazio sai como NA.",es:"Opcional. Vac\xEDo sale como NA.",en:"Optional. Left empty, it goes out as NA."}}]},{kind:"kv",title:"Screenshots (Mandatory)",rows:[{id:"website",label:{en:"Website URL worked upon:",pt:"URL do site trabalhado:",es:"URL del sitio trabajado:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print do Tag Assistant mostrando o site conectado. NA s\xF3 se nenhuma task esteve envolvida.",es:"Captura de Tag Assistant con el sitio conectado. NA solo si ninguna task estuvo involucrada.",en:"Tag Assistant screenshot showing the connected site. NA only if no task was involved."}},{id:"qplus",label:{en:"Q+ entry:",pt:"Registro no Q+:",es:"Registro en Q+:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Link do print do Q+ preenchido ao fechar ou transferir o caso.",es:"Enlace de la captura de Q+ completado al cerrar o transferir el caso.",en:"Link to the screenshot of the Q+ entry filled in when closing or transferring the case."}},{id:"gvc",label:{en:"GVC Chat:",pt:"Chat do GVC:",es:"Chat de GVC:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print do chat do Meet se houve links ou instru\xE7\xF5es. Sen\xE3o, NA.",es:"Captura del chat de Meet si hubo enlaces o instrucciones. Si no, NA.",en:"Screenshot of the Meet chat if links or instructions were shared. Otherwise, NA."}},{id:"gam",label:{en:"GAM:",pt:"GAM:",es:"GAM:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print do ping ao Seller/GAM logo ap\xF3s a call, com resultado, status e pr\xF3ximos passos.",es:"Captura del ping al Seller/GAM justo despu\xE9s de la llamada, con resultado, estado y pr\xF3ximos pasos.",en:"Screenshot of the ping to the Seller/GAM right after the call, with outcome, status and next steps."}},{id:"extra_general",label:{en:"Additional Screenshots:",pt:"Prints adicionais:",es:"Capturas adicionales:"},type:"link",required:!1,na:!0,visible:!0,hint:{pt:"Opcional. Qualquer print extra exigido pelo cen\xE1rio.",es:"Opcional. Cualquier captura extra que exija el escenario.",en:"Optional. Any extra screenshot the scenario requires."}}]}]},before:{name:"Before implementation",cols:4,widths:[22,28,28,22],sections:[{kind:"group",title:"Screenshots (Mandatory)",group:"Before implementation:",rows:[{id:"b_status",label:{en:"Google Ads Conversion Status:",pt:"Status da convers\xE3o no Google Ads:",es:"Estado de la conversi\xF3n en Google Ads:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Status de rastreamento Unverified, Needs attention ou Tag inactive, com CID, nome da convers\xE3o e hor\xE1rio vis\xEDveis.",es:"Estado de seguimiento Unverified, Needs attention o Tag inactive, con CID, nombre de la conversi\xF3n y hora visibles.",en:"Tracking status Unverified, Needs attention or Tag inactive, with CID, conversion name and time visible."}},{id:"b_dup",label:{en:"Duplicate Tags / Repeat Rate:",pt:"Tags duplicadas / Repeat rate:",es:"Etiquetas duplicadas / Repeat rate:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Tabela de convers\xF5es com repeat rate elevado (> 1,3 ou > 2,0) antes de remover tags duplicadas.",es:"Tabla de conversiones con repeat rate alto (> 1,3 o > 2,0) antes de quitar las etiquetas duplicadas.",en:"Conversions table with a high repeat rate (> 1.3 or > 2.0) before removing duplicate tags."}},{id:"b_bid",label:{en:"Bidding Optimization:",pt:"Otimiza\xE7\xE3o de lances:",es:"Optimizaci\xF3n de pujas:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Configura\xE7\xE3o mostrando a otimiza\xE7\xE3o de a\xE7\xE3o inicial (Secondary ou Primary).",es:"Configuraci\xF3n con la optimizaci\xF3n de acci\xF3n inicial (Secondary o Primary).",en:"Settings showing the initial action optimization (Secondary or Primary)."}},{id:"b_diag",label:{en:"Tag Diagnostics:",pt:"Tag Diagnostics:",es:"Tag Diagnostics:"},type:"link",required:!0,na:!0,visible:!0,onlyFor:["ecw"],hint:{pt:"S\xF3 ECW. Print do alerta antes da corre\xE7\xE3o.",es:"Solo ECW. Captura de la alerta antes de la correcci\xF3n.",en:"ECW only. Screenshot of the alert before the fix."}},{id:"b_qual",label:{en:"EC Qualdash:",pt:"EC Qualdash:",es:"EC Qualdash:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"go/ec-qual-dash com Coverage Rate baixo (< 0,7) antes de remover tags duplicadas.",es:"go/ec-qual-dash con Coverage Rate bajo (< 0,7) antes de quitar las etiquetas duplicadas.",en:"go/ec-qual-dash with a low Coverage Rate (< 0.7) before removing duplicate tags."}}]}]},impl:{name:"Implementation",cols:4,widths:[22,28,28,22],sections:[{kind:"group",title:"Screenshots (Mandatory)",group:"Implementation:",rows:[{id:"i_status",label:{en:"Google Ads Conversion Status:",pt:"Status da convers\xE3o no Google Ads:",es:"Estado de la conversi\xF3n en Google Ads:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Resumo de convers\xF5es mostrando a transi\xE7\xE3o do status, com CID e nome da convers\xE3o iguais.",es:"Resumen de conversiones con la transici\xF3n del estado, con el mismo CID y nombre de conversi\xF3n.",en:"Conversions summary showing the status transition, with the same CID and conversion name."}},{id:"i_settings",label:{en:"Google Ads Conversion Settings:",pt:"Configura\xE7\xF5es da convers\xE3o no Google Ads:",es:"Configuraci\xF3n de la conversi\xF3n en Google Ads:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Categoria, otimiza\xE7\xE3o, contagem, valor, atribui\xE7\xE3o e Tag Setup (Conversion ID e Label).",es:"Categor\xEDa, optimizaci\xF3n, recuento, valor, atribuci\xF3n y Tag Setup (Conversion ID y Label).",en:"Category, optimization, count, value, attribution and Tag Setup (Conversion ID and Label)."}},{id:"i_gtm",label:{en:"GTM / Website Backend:",pt:"GTM / Backend do site:",es:"GTM / Backend del sitio:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Tag de convers\xE3o + Conversion Linker + gatilho no GTM, ou gtag.js manual.",es:"Etiqueta de conversi\xF3n + Conversion Linker + activador en GTM, o gtag.js manual.",en:"Conversion tag + Conversion Linker + trigger in GTM, or manual gtag.js."}},{id:"i_fired",label:{en:"Tag Assistant Tag Fired:",pt:"Tag disparada no Tag Assistant:",es:"Etiqueta disparada en Tag Assistant:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Tags disparadas com Conversion ID, Label e Value/Currency din\xE2micos.",es:"Etiquetas disparadas con Conversion ID, Label y Value/Currency din\xE1micos.",en:"Fired tags with Conversion ID, Label and dynamic Value/Currency."}},{id:"i_ec",label:{en:"Google Ads EC Settings:",pt:"Configura\xE7\xF5es de EC no Google Ads:",es:"Configuraci\xF3n de EC en Google Ads:"},type:"link",required:!0,na:!0,visible:!0,onlyFor:["ecw"],hint:{pt:"S\xF3 ECW. Enhanced conversions ligado e m\xE9todo escolhido.",es:"Solo ECW. Enhanced conversions activado y m\xE9todo elegido.",en:"ECW only. Enhanced conversions on and the method chosen."}},{id:"i_terms",label:{en:"Customer Data Terms Accepted:",pt:"Termos de dados do cliente aceitos:",es:"Condiciones de datos del cliente aceptadas:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Termos de dados do cliente aceitos no Google Ads.",es:"Condiciones de datos del cliente aceptadas en Google Ads.",en:"Customer data terms accepted in Google Ads."}},{id:"i_em",label:{en:"Error-Free em Parameter OR ecsid PII Stitching:",pt:"Par\xE2metro em sem erro OU PII Stitching por ecsid:",es:"Par\xE1metro em sin errores O PII Stitching por ecsid:"},type:"link",required:!0,na:!0,visible:!0,onlyFor:["ecw"],hint:{pt:"S\xF3 ECW. Par\xE2metro em com hash SHA-256 v\xE1lido (nunca em.e0), ou 2 prints com ecsid igual.",es:"Solo ECW. Par\xE1metro em con hash SHA-256 v\xE1lido (nunca em.e0), o 2 capturas con el mismo ecsid.",en:"ECW only. em parameter with a valid SHA-256 hash (never em.e0), or 2 screenshots with the same ecsid."}},{id:"i_hit",label:{en:"\u201CHit Sent\u201D in Tag Assistant OR Network Header 200 OK:",pt:"\u201CHit Sent\u201D no Tag Assistant OU Network Header 200 OK:",es:"\u201CHit Sent\u201D en Tag Assistant O Network Header 200 OK:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Hit para googleadservices.com com o Label certo e 200 OK.",es:"Hit a googleadservices.com con el Label correcto y 200 OK.",en:"Hit to googleadservices.com with the right Label and 200 OK."}},{id:"i_extra",label:{en:"Additional Screenshots:",pt:"Prints adicionais:",es:"Capturas adicionales:"},type:"link",required:!1,na:!0,visible:!0,hint:{pt:"Opcional.",es:"Opcional.",en:"Optional."}}]}]},after:{name:"After implementation",cols:4,widths:[22,28,28,22],sections:[{kind:"group",title:"Screenshots (Mandatory)",group:"After implementation:",rows:[{id:"a_status",label:{en:"Google Ads Conversion Status:",pt:"Status da convers\xE3o no Google Ads:",es:"Estado de la conversi\xF3n en Google Ads:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Resumo de convers\xF5es na janela de valida\xE7\xE3o de 2 a 3 dias.",es:"Resumen de conversiones en la ventana de validaci\xF3n de 2 a 3 d\xEDas.",en:"Conversions summary in the 2-to-3-day validation window."}},{id:"a_diag",label:{en:"Tag Diagnostics / EC Qualdash:",pt:"Tag Diagnostics / EC Qualdash:",es:"Tag Diagnostics / EC Qualdash:"},type:"link",required:!0,na:!0,visible:!0,onlyFor:["ecw"],hint:{pt:'S\xF3 ECW. Tag Diagnostics do dia 7 em "Recording enhanced conversions" e/ou EC Qualdash.',es:'Solo ECW. Tag Diagnostics del d\xEDa 7 en "Recording enhanced conversions" y/o EC Qualdash.',en:'ECW only. Day-7 Tag Diagnostics in "Recording enhanced conversions" and/or EC Qualdash.'}},{id:"a_dup",label:{en:"Duplicate Tags / Repeat Rate:",pt:"Tags duplicadas / Repeat rate:",es:"Etiquetas duplicadas / Repeat rate:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Repeat rate normalizado (~1,0) ap\xF3s 2 dias (ACT) ou 7 dias (ECW).",es:"Repeat rate normalizado (~1,0) despu\xE9s de 2 d\xEDas (ACT) o 7 d\xEDas (ECW).",en:"Repeat rate back to normal (~1.0) after 2 days (ACT) or 7 days (ECW)."}},{id:"a_bid",label:{en:"Bidding Optimization:",pt:"Otimiza\xE7\xE3o de lances:",es:"Optimizaci\xF3n de pujas:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Otimiza\xE7\xE3o de a\xE7\xE3o atualizada depois da mudan\xE7a.",es:"Optimizaci\xF3n de acci\xF3n actualizada despu\xE9s del cambio.",en:"Action optimization updated after the change."}},{id:"a_extra",label:{en:"Additional Screenshots:",pt:"Prints adicionais:",es:"Capturas adicionales:"},type:"link",required:!1,na:!0,visible:!0,hint:{pt:"Opcional.",es:"Opcional.",en:"Optional."}}]}]},consult:{name:"Consult routing path",cols:4,widths:[22,26,30,22],sections:[{kind:"group",title:"Screenshots (Mandatory)",group:"Consult Routing Path & SME Approval:",rows:[{id:"c_path",label:{en:"Consult Routing Path:",pt:"Caminho de roteamento da consulta:",es:"Ruta de enrutamiento de la consulta:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print confirmando o roteamento para a fila certa de M&A.",es:"Captura que confirma el enrutamiento a la fila correcta de M&A.",en:"Screenshot confirming the routing to the right M&A queue."}},{id:"c_sme",label:{en:"SME Approval:",pt:"Aprova\xE7\xE3o do SME:",es:"Aprobaci\xF3n del SME:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print ou nota registrada com a aprova\xE7\xE3o do SME para Split & Transfer ou Discard.",es:"Captura o nota registrada con la aprobaci\xF3n del SME para Split & Transfer o Discard.",en:"Screenshot or logged note with the SME approval for Split & Transfer or Discard."}}]}]},audit:{name:"Readiness Audit",cols:6,widths:[12,15,11,15,25,22],sections:[{kind:"cid",title:"CID-Level Details",columns:[{id:"tbw",label:{en:"To Be Worked?",pt:"A trabalhar?",es:"\xBFA trabajar?"},type:"tbw",required:!0},{id:"cid",label:{en:"CID",pt:"CID",es:"CID"},type:"cid",required:!0},{id:"mcc",label:{en:"Under MCC?",pt:"Sob MCC?",es:"\xBFBajo MCC?"},type:"yn",required:!0},{id:"outcome",label:{en:"Audit Outcome",pt:"Resultado da auditoria",es:"Resultado de la auditor\xEDa"},type:"text",required:!0},{id:"alink",label:{en:"Audit Link",pt:"Link da auditoria",es:"Enlace de la auditor\xEDa"},type:"link",required:!0},{id:"sme",label:{en:"SME sign-off",pt:"Aval do SME",es:"Visto bueno del SME"},type:"smeyes",required:!0}]},{kind:"kv",title:"General Details (Mandatory)",rows:[{id:"substatus",label:{en:"Current case Sub-Status:",pt:"Sub-status atual do caso:",es:"Subestado actual del caso:"},type:"derived",required:!0,na:!1,visible:!0,auto:"substatus",hint:{pt:"Vem do campo Sub-status no topo.",es:"Viene del campo Subestado, arriba.",en:"Comes from the Sub-status field at the top."}},{id:"next_followup",label:{en:"Next Follow up Date:",pt:"Data do pr\xF3ximo follow-up:",es:"Fecha del pr\xF3ximo follow-up:"},type:"date",required:!0,na:!0,visible:!0,auto:"followup",hint:{pt:"Data do pr\xF3ximo follow-up, ou NA.",es:"Fecha del pr\xF3ximo follow-up, o NA.",en:"Next follow-up date, or NA."}},{id:"case_comments",label:{en:"Case Comments:",pt:"Coment\xE1rios do caso:",es:"Comentarios del caso:"},type:"long",required:!0,na:!1,visible:!0,hint:{pt:"O que aconteceu no caso, com todos os detalhes e pr\xF3ximos passos.",es:"Lo que pas\xF3 en el caso, con todos los detalles y pr\xF3ximos pasos.",en:"What happened in the case, with all the details and next steps."}},{id:"audit_ss",label:{en:"Audit Screenshots:",pt:"Prints da auditoria:",es:"Capturas de la auditor\xEDa:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Link do print da auditoria.",es:"Enlace de la captura de la auditor\xEDa.",en:"Link to the audit screenshot."}},{id:"gam",label:{en:"GAM Ping, if any:",pt:"Ping ao GAM, se houver:",es:"Ping al GAM, si lo hubo:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print do ping ao GAM, se houve.",es:"Captura del ping al GAM, si lo hubo.",en:"Screenshot of the GAM ping, if there was one."}}]}]},impl_call:{name:"Implementation Call",cols:4,widths:[18,22,36,24],sections:[{kind:"cid",title:"CID-Level Details",columns:[{id:"tbw",label:{en:"To Be Worked?",pt:"A trabalhar?",es:"\xBFA trabajar?"},type:"tbw",required:!0},{id:"cid",label:{en:"CID",pt:"CID",es:"CID"},type:"cid",required:!0},{id:"tag",label:{en:"Tag implemented?",pt:"Tag implementada?",es:"\xBFEtiqueta implementada?"},type:"text",required:!0},{id:"caseid",label:{en:"Case ID mapping",pt:"Mapeamento do Case ID",es:"Mapeo del Case ID"},type:"text",required:!0}]},{kind:"kv",title:"General Details (Mandatory)",rows:[{id:"substatus",label:{en:"Current case Sub-status:",pt:"Sub-status atual do caso:",es:"Subestado actual del caso:"},type:"derived",required:!0,na:!1,visible:!0,auto:"substatus",hint:{pt:"Vem do campo Sub-status no topo.",es:"Viene del campo Subestado, arriba.",en:"Comes from the Sub-status field at the top."}},{id:"substatus_reason",label:{en:"Sub-status Reason:",pt:"Motivo do sub-status:",es:"Motivo del subestado:"},type:"long",required:!0,na:!1,visible:!0,hint:{pt:"Breve explica\xE7\xE3o do uso desse sub-status.",es:"Breve explicaci\xF3n del uso de este subestado.",en:"Brief explanation of why this sub-status was used."}},{id:"next_followup",label:{en:"Next Follow up Date:",pt:"Data do pr\xF3ximo follow-up:",es:"Fecha del pr\xF3ximo follow-up:"},type:"date",required:!0,na:!0,visible:!0,auto:"followup",hint:{pt:"Data do pr\xF3ximo follow-up, ou NA.",es:"Fecha del pr\xF3ximo follow-up, o NA.",en:"Next follow-up date, or NA."}},{id:"speakeasy",label:{en:"Speakeasy ID:",pt:"Speakeasy ID:",es:"Speakeasy ID:"},type:"speakeasy",required:!0,na:!0,visible:!0,hint:{pt:"ID exato da sess\xE3o do SpeakEasy.",es:"ID exacto de la sesi\xF3n de SpeakEasy.",en:"Exact SpeakEasy session ID."}},{id:"oncall_comments",label:{en:"On Call Comments:",pt:"Coment\xE1rios da call:",es:"Comentarios de la llamada:"},type:"long",required:!0,na:!1,visible:!0,hint:{pt:"O que aconteceu na call, com todos os detalhes e pr\xF3ximos passos.",es:"Lo que pas\xF3 en la llamada, con todos los detalles y pr\xF3ximos pasos.",en:"What happened on the call, with all the details and next steps."}},{id:"consent",label:{en:"Checked and obtained recording consent from the customer before proceeding with the call?",pt:"Verificou e obteve o consentimento do cliente para a grava\xE7\xE3o antes de seguir com a call?",es:"\xBFVerific\xF3 y obtuvo el consentimiento del cliente para la grabaci\xF3n antes de continuar con la llamada?"},type:"yesno",required:!0,na:!0,visible:!0,auto:"consent",hint:{pt:'Fora da Europa o padr\xE3o \xE9 Yes (a alternativa fica em "Alterar"). No caso da Europa o agente marca. NA para NI - Attempted Contact e IN - Not Reachable.',es:'Fuera de Europa el valor predeterminado es Yes (la alternativa est\xE1 en "Cambiar"). En el caso de Europa, lo marca el agente. NA para NI - Attempted Contact e IN - Not Reachable.',en:'Outside Europe the default is Yes (the alternative is under "Change"). For a Europe case the agent marks it. NA for NI - Attempted Contact and IN - Not Reachable.'}}]},{kind:"kv",title:"Screenshots (Mandatory)",rows:[{id:"oncall_ss",label:{en:"On Call Screenshot:",pt:"Print do On Call:",es:"Captura del On Call:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print mostrando o On Call e a data e hora do computador.",es:"Captura del On Call con la fecha y hora de la computadora.",en:"Screenshot showing the On Call and the computer's date and time."}},{id:"access_ss",label:{en:"Account verification access level:",pt:"N\xEDvel de acesso da verifica\xE7\xE3o da conta:",es:"Nivel de acceso de la verificaci\xF3n de la cuenta:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print do Google Ads, GTM e/ou GA4 mostrando o n\xEDvel de acesso do anunciante.",es:"Captura de Google Ads, GTM y/o GA4 con el nivel de acceso del anunciante.",en:"Screenshot of Google Ads, GTM and/or GA4 showing the advertiser's access level."}},{id:"gam",label:{en:"GAM Ping, if any:",pt:"Ping ao GAM, se houver:",es:"Ping al GAM, si lo hubo:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print do ping ao GAM, se houve.",es:"Captura del ping al GAM, si lo hubo.",en:"Screenshot of the GAM ping, if there was one."}},{id:"extra_all",label:{en:"All Additional Screenshots:",pt:"Todos os prints adicionais:",es:"Todas las capturas adicionales:"},type:"link",required:!1,na:!0,visible:!0,hint:{pt:"Opcional. Todo print necess\xE1rio ao andamento do caso.",es:"Opcional. Toda captura necesaria para el avance del caso.",en:"Optional. Any screenshot the case needs to move forward."}}]}]},interim:{name:"Interim check-ins",cols:3,widths:[30,48,22],sections:[{kind:"kv",title:"General Details (Mandatory)",rows:[{id:"substatus",label:{en:"Current case Sub-Status:",pt:"Sub-status atual do caso:",es:"Subestado actual del caso:"},type:"derived",required:!0,na:!1,visible:!0,auto:"substatus",hint:{pt:"Vem do campo Sub-status no topo.",es:"Viene del campo Subestado, arriba.",en:"Comes from the Sub-status field at the top."}},{id:"next_followup",label:{en:"Next Follow up Date:",pt:"Data do pr\xF3ximo follow-up:",es:"Fecha del pr\xF3ximo follow-up:"},type:"date",required:!0,na:!0,visible:!0,auto:"followup",hint:{pt:"Data do pr\xF3ximo follow-up, ou NA.",es:"Fecha del pr\xF3ximo follow-up, o NA.",en:"Next follow-up date, or NA."}},{id:"case_comments",label:{en:"Case Comments:",pt:"Coment\xE1rios do caso:",es:"Comentarios del caso:"},type:"long",required:!0,na:!1,visible:!0,hint:{pt:"O que aconteceu no caso, com todos os detalhes e pr\xF3ximos passos.",es:"Lo que pas\xF3 en el caso, con todos los detalles y pr\xF3ximos pasos.",en:"What happened in the case, with all the details and next steps."}},{id:"gam",label:{en:"GAM Ping, if any:",pt:"Ping ao GAM, se houver:",es:"Ping al GAM, si lo hubo:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print do ping ao GAM, se houve.",es:"Captura del ping al GAM, si lo hubo.",en:"Screenshot of the GAM ping, if there was one."}},{id:"extra_all",label:{en:"All Additional Screenshots:",pt:"Todos os prints adicionais:",es:"Todas las capturas adicionales:"},type:"link",required:!1,na:!0,visible:!0,hint:{pt:"Opcional.",es:"Opcional.",en:"Optional."}}]}]},triage:{name:"Initial Triage",cols:3,widths:[30,48,22],sections:[{kind:"kv",title:"General Details (Mandatory)",rows:[{id:"substatus",label:{en:"Current case Sub-Status:",pt:"Sub-status atual do caso:",es:"Subestado actual del caso:"},type:"derived",required:!0,na:!1,visible:!0,auto:"substatus",hint:{pt:"Vem do campo Sub-status no topo.",es:"Viene del campo Subestado, arriba.",en:"Comes from the Sub-status field at the top."}},{id:"next_followup",label:{en:"Next Follow up Date:",pt:"Data do pr\xF3ximo follow-up:",es:"Fecha del pr\xF3ximo follow-up:"},type:"date",required:!0,na:!0,visible:!0,auto:"followup",hint:{pt:"Data do pr\xF3ximo follow-up, ou NA.",es:"Fecha del pr\xF3ximo follow-up, o NA.",en:"Next follow-up date, or NA."}},{id:"case_comments",label:{en:"Case Comments:",pt:"Coment\xE1rios do caso:",es:"Comentarios del caso:"},type:"long",required:!0,na:!1,visible:!0,hint:{pt:"O que aconteceu no caso, com todos os detalhes e pr\xF3ximos passos.",es:"Lo que pas\xF3 en el caso, con todos los detalles y pr\xF3ximos pasos.",en:"What happened in the case, with all the details and next steps."}},{id:"gam",label:{en:"GAM Ping, if any:",pt:"Ping ao GAM, se houver:",es:"Ping al GAM, si lo hubo:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print do ping ao GAM, se houve.",es:"Captura del ping al GAM, si lo hubo.",en:"Screenshot of the GAM ping, if there was one."}}]}]},eligibility:{name:"Eligibility Verification",cols:5,widths:[16,17,20,25,22],sections:[{kind:"cid",title:"CID-Level Details",columns:[{id:"tbw",label:{en:"To Be Worked?",pt:"A trabalhar?",es:"\xBFA trabajar?"},type:"tbw",required:!0},{id:"cid",label:{en:"CID",pt:"CID",es:"CID"},type:"cid",required:!0},{id:"mcc",label:{en:"Under MCC?",pt:"Sob MCC?",es:"\xBFBajo MCC?"},type:"yn",required:!0},{id:"elig",label:{en:"Eligibility Status",pt:"Status de elegibilidade",es:"Estado de elegibilidad"},type:"text",required:!0},{id:"galactic",label:{en:"Galactic Screenshots",pt:"Prints do Galactic",es:"Capturas de Galactic"},type:"link",required:!0}]},{kind:"kv",title:"General Details (Mandatory)",rows:[{id:"substatus",label:{en:"Current case Sub-Status:",pt:"Sub-status atual do caso:",es:"Subestado actual del caso:"},type:"derived",required:!0,na:!1,visible:!0,auto:"substatus",hint:{pt:"Vem do campo Sub-status no topo.",es:"Viene del campo Subestado, arriba.",en:"Comes from the Sub-status field at the top."}},{id:"next_followup",label:{en:"Next Follow up Date:",pt:"Data do pr\xF3ximo follow-up:",es:"Fecha del pr\xF3ximo follow-up:"},type:"date",required:!0,na:!0,visible:!0,auto:"followup",hint:{pt:"Data do pr\xF3ximo follow-up, ou NA.",es:"Fecha del pr\xF3ximo follow-up, o NA.",en:"Next follow-up date, or NA."}},{id:"case_comments",label:{en:"Case Comments:",pt:"Coment\xE1rios do caso:",es:"Comentarios del caso:"},type:"long",required:!0,na:!1,visible:!0,hint:{pt:"O que aconteceu no caso, com todos os detalhes e pr\xF3ximos passos.",es:"Lo que pas\xF3 en el caso, con todos los detalles y pr\xF3ximos pasos.",en:"What happened in the case, with all the details and next steps."}},{id:"gam",label:{en:"GAM Ping, if any:",pt:"Ping ao GAM, se houver:",es:"Ping al GAM, si lo hubo:"},type:"link",required:!0,na:!0,visible:!0,hint:{pt:"Print do ping ao GAM, se houve.",es:"Captura del ping al GAM, si lo hubo.",en:"Screenshot of the GAM ping, if there was one."}}]}]},extras:{name:"Additional details",cols:3,widths:[32,46,22],sections:[{kind:"kv",title:"Additional Details",rows:[{id:"europe_case",label:{en:"Europe case?",pt:"Caso da Europa?",es:"\xBFCaso de Europa?"},type:"derived",required:!0,na:!1,visible:!0,auto:"europe",when:{europe:!0},hint:{pt:'Marcado em "Caso da Europa", no topo.',es:'Se marca en "Caso de Europa", arriba.',en:'Set in "Europe case", at the top.'}},{id:"oncall",label:{en:"On Call signaled on time?",pt:"On Call signaled on time?",es:"On Call signaled on time?"},type:"text",required:!1,na:!0,visible:!0,when:{flow:"bau"},hint:{pt:"Como aparece na tela do caso. N\xE3o existe no fluxo LM.",es:"Como aparece en la pantalla del caso. No existe en el flujo LM.",en:"As shown on the case screen. Not used in the LM flow."}},{id:"gtm_ga4",label:{en:"GTM/GA4 verified:",pt:"GTM/GA4 verificado:",es:"GTM/GA4 verificado:"},type:"text",required:!1,na:!0,visible:!0,optIn:!0,requiredWhen:{substatusAny:["SO - Implementation Only","SO - Educational Only","SO - Troubleshooting Only","NI - Awaiting Validation"]},hint:{pt:"Obrigat\xF3rio quando houve implementa\xE7\xE3o ou valida\xE7\xE3o; opcional nos demais.",es:"Obligatorio cuando hubo implementaci\xF3n o validaci\xF3n; opcional en los dem\xE1s.",en:"Required when there was an implementation or validation; optional otherwise."}},{id:"ts_used",label:{en:"Used Tag Support?",pt:"Usou o Tag Support?",es:"\xBFUs\xF3 Tag Support?"},type:"yesno",required:!0,na:!1,visible:!0,default:"No",when:{tasksAny:["ads_conversion_tracking","ads_enhanced_conversions"]},hint:{pt:"S\xF3 para ACT e ECW. Com Yes, a task leva o aviso do Win Criteria. Lembre-se de preencher o Form.",es:"Solo para ACT y ECW. Con Yes, la task lleva el aviso del Win Criteria. Recuerde completar el Form.",en:"ACT and ECW only. With Yes, the task carries the Win Criteria notice. Remember to fill in the Form."}},{id:"ts_reason",label:{en:"Reason:",pt:"Motivo:",es:"Motivo:"},type:"text",required:!1,na:!0,visible:!0,when:{tasksAny:["ads_conversion_tracking","ads_enhanced_conversions"],rowIs:{id:"ts_used",v:"No"}},hint:{pt:"Por que o Tag Support n\xE3o foi usado.",es:"Por qu\xE9 no se us\xF3 Tag Support.",en:"Why Tag Support was not used."}},{id:"ts_used_na",label:{en:"Used Tag Support?",pt:"Usou o Tag Support?",es:"\xBFUs\xF3 Tag Support?"},type:"derived",required:!1,na:!1,visible:!0,auto:"fixed",value:"No",when:{tasksNone:["ads_conversion_tracking","ads_enhanced_conversions"]},hint:{pt:"Preenchido: a task n\xE3o \xE9 ACT nem ECW.",es:"Completado: la task no es ACT ni ECW.",en:"Filled in: the task is neither ACT nor ECW."}},{id:"ts_reason_na",label:{en:"Reason:",pt:"Motivo:",es:"Motivo:"},type:"derived",required:!1,na:!1,visible:!0,auto:"fixed",value:{en:"Task does not apply to TSA usage.",pt:"Task n\xE3o se aplica ao uso do TSA.",es:"La task no aplica al uso del TSA."},when:{tasksNone:["ads_conversion_tracking","ads_enhanced_conversions"]},hint:{pt:"Preenchido: a task n\xE3o se aplica ao uso do TSA.",es:"Completado: la task no aplica al uso del TSA.",en:"Filled in: the task does not apply to TSA usage."}},{id:"call_attempt",label:{en:"Call attempt:",pt:"Tentativa de liga\xE7\xE3o:",es:"Intento de llamada:"},type:"link",required:!0,na:!0,visible:!0,when:{substatusAny:["IN - Not Reachable"]},hint:{pt:"Link da evid\xEAncia da tentativa de liga\xE7\xE3o.",es:"Enlace de la evidencia del intento de llamada.",en:"Link to the evidence of the call attempt."}},{id:"ev_call1",label:{en:"Contact evidence: Call 1",pt:"Evid\xEAncia de contato: liga\xE7\xE3o 1",es:"Evidencia de contacto: llamada 1"},type:"link",required:!1,na:!0,visible:!0,when:{substatusAny:["NI - Attempted Contact"]},hint:{pt:"Evid\xEAncia da primeira liga\xE7\xE3o.",es:"Evidencia de la primera llamada.",en:"Evidence of the first call."}},{id:"ev_call2",label:{en:"Contact evidence: Call 2",pt:"Evid\xEAncia de contato: liga\xE7\xE3o 2",es:"Evidencia de contacto: llamada 2"},type:"link",required:!1,na:!0,visible:!0,when:{substatusAny:["NI - Attempted Contact"]},hint:{pt:"Evid\xEAncia da segunda liga\xE7\xE3o.",es:"Evidencia de la segunda llamada.",en:"Evidence of the second call."}},{id:"ev_msg",label:{en:"Contact evidence: Message to the AM",pt:"Evid\xEAncia de contato: mensagem ao AM",es:"Evidencia de contacto: mensaje al AM"},type:"link",required:!1,na:!0,visible:!0,when:{substatusAny:["NI - Attempted Contact"]},hint:{pt:"Evid\xEAncia da mensagem ao AM.",es:"Evidencia del mensaje al AM.",en:"Evidence of the message to the AM."}}]}]}},segments:[{key:"all",name:"ALL TASKS",select:"multi",showTitle:!1,always:["general"],blocks:[{b:"general",title:"General details",when:"Sempre. Vale para toda call, tentativa de contato ou fechamento no mesmo dia."},{b:"before",title:"Before implementation",when:"S\xF3 ACT e ECW. Depois de appointments e fechamentos no mesmo dia.",suggest:{tasksAny:["ads_conversion_tracking","ads_enhanced_conversions"]}},{b:"impl",title:"Implementation",when:"S\xF3 ACT e ECW. Depois de appointments e fechamentos no mesmo dia.",suggest:{tasksAny:["ads_conversion_tracking","ads_enhanced_conversions"]}},{b:"after",title:"After implementation",when:"S\xF3 ACT e ECW. Em follow-ups ou ao fechar depois da janela (n\xE3o \xE9 o dia do appointment).",suggest:{tasksAny:["ads_conversion_tracking","ads_enhanced_conversions"]}},{b:"consult",title:"Consult routing path",when:"Ao consultar ou transferir o caso para M&A.",suggest:{substatusAny:["IN - Troubleshooting [Transferred]","IN - Out of Scope - Rerouted"],splitAny:["SO - Troubleshooting Only"]}}]},{key:"sbse",name:"ECL SBS-E",select:"single",showTitle:!0,blocks:[{b:"audit",title:"Phase 1: Readiness Audit",when:"Depois da auditoria conclu\xEDda E revisada/aprovada pelo SME."},{b:"impl_call",title:"Phase 2: Implementation Call",when:"Depois da call de implementa\xE7\xE3o."},{b:"interim",title:"Interim Check-Ins or Pre-Impl. Closure: Seller/Advertiser Engagement & Updates",when:"Ao fechar o caso no pre-call ou ao fazer follow-up com seller/anunciante."}]},{key:"mms",name:"ECL MMS",select:"single",showTitle:!0,blocks:[{b:"triage",title:"Phase 0: Initial Triage",when:"Depois do e-mail FR (CR 0A) enviado, mas com os CIDs ainda por confirmar."},{b:"eligibility",title:"Phase 1: Eligibility Verification",when:"FR enviado e elegibilidade dos CIDs confirmados checada no Galactic."},{b:"audit",title:"Phase 2: Readiness Audit & Scheduling",when:"Depois da auditoria conclu\xEDda E revisada/aprovada pelo SME."},{b:"impl_call",title:"Phase 3: Pre-Implementation Call",when:"Depois da call de pre-implementa\xE7\xE3o (3-way) ou ao fechar depois dela."},{b:"interim",title:"Interim Check-Ins or Pre-Impl. Closure: Seller/Advertiser Engagement & Updates",when:"Ao fechar na pr\xE9-implementa\xE7\xE3o ou ao fazer follow-up com seller/anunciante."}]}]};var Zd="note_blocks",ep="note_layouts",ip=e=>JSON.parse(JSON.stringify(e)),Qt=e=>console.warn(`[notetable] ${e}`);function rp(e){try{let t=JSON.parse(e||"null");return t&&typeof t=="object"&&!Array.isArray(t)?t:null}catch{return null}}var tp=e=>!!(e&&e.label&&typeof e.label=="object"&&String(e.label.en||"").trim());function Zg(e,t){let a=typeof t=="string"?rp(t):t;if(!a)return Qt(`bloco '${e}' ileg\xEDvel; mantido o embutido.`),null;let o=a.cols,n=Array.isArray(a.widths)?a.widths:[],i=n.reduce((s,l)=>s+(Number(l)||0),0);if(![3,4,5,6].includes(o)||n.length!==o||Math.abs(i-100)>.001)return Qt(`bloco '${e}' com grade inv\xE1lida; mantido o embutido.`),null;let r=[];for(let s of Array.isArray(a.sections)?a.sections:[]){if(!s||!zd.includes(s.kind)){Qt(`bloco '${e}': se\xE7\xE3o '${s&&s.kind}' desconhecida, ignorada.`);continue}if(s.kind==="cid"){let c=Array.isArray(s.columns)?s.columns:[];if(!(c.length===o&&c.every(u=>u&&kr.test(String(u.id||""))&&$d.includes(u.type)&&tp(u)))){Qt(`bloco '${e}': se\xE7\xE3o por CID com coluna desconhecida, ignorada.`);continue}r.push(s);continue}if(s.kind==="group"&&o!==4){Qt(`bloco '${e}': grupo fora de 4 colunas, ignorado.`);continue}let l=new Set,d=(Array.isArray(s.rows)?s.rows:[]).filter(c=>!c||!kr.test(String(c.id||""))||l.has(c.id)?(Qt(`bloco '${e}': linha sem id v\xE1lido, ignorada.`),!1):Pd.includes(c.type)?tp(c)?(l.add(c.id),!0):(Qt(`bloco '${e}': linha '${c.id}' sem r\xF3tulo, ignorada.`),!1):(Qt(`bloco '${e}': linha '${c.id}' de tipo '${c.type}' desconhecido, ignorada.`),!1));d.length&&r.push({...s,rows:d})}return r.length?{...a,sections:r}:(Qt(`bloco '${e}' sem se\xE7\xE3o que este app desenhe; mantido o embutido.`),null)}function ef(e,t,a){let o=typeof t=="string"?rp(t):t;if(!o||!["multi","single"].includes(o.select)||!Array.isArray(o.blocks))return Qt(`segmento '${e}' ileg\xEDvel; mantido o embutido.`),null;let n=o.blocks.filter(r=>r&&a[r.b]?!0:(Qt(`segmento '${e}': bloco '${r&&r.b}' desconhecido, ignorado.`),!1));if(!n.length)return Qt(`segmento '${e}' sem bloco conhecido; mantido o embutido.`),null;let i={key:e,...o,blocks:n};if(Array.isArray(o.always)){let r=n.map(s=>s.b);i.always=o.always.filter(s=>r.includes(s))}else delete i.always;return i}var ap=e=>(Array.isArray(e)?e:[]).slice().sort((t,a)=>(t.sortOrder||0)-(a.sortOrder||0));function tf(e,t,a){let o=ip(e),n=0;for(let i of ap(t)){let r=String(i&&i.key||"").trim();if(!r)continue;let s=Zg(r,i.value);s&&(o.blocks[r]=s,n++)}for(let i of ap(a)){let r=String(i&&i.key||"").trim();if(!r)continue;let s=ef(r,i.value,o.blocks);if(!s)continue;let l=o.segments.findIndex(d=>d.key===r);l>=0?o.segments[l]=s:o.segments.push(s),n++}return{catalog:o,applied:n}}var ai=ip(Rr),af=!1;function zr(){return ai}function op(e,t){let{catalog:a,applied:o}=tf(Rr,e,t);return ai=a,af=o>0,o>0}var sp=new Set,Fr=null;function np(){for(let e of sp)try{e(ai)}catch(t){console.warn("[notetable] assinante do cat\xE1logo falhou.",t)}}async function of(){let e=Te.getCachedContent(Zd),t=Te.getCachedContent(ep);op(e,t)&&np();try{let[a,o]=await Promise.all([Te.fetchContentModule(Zd),Te.fetchContentModule(ep)]);op(a,o)&&np()}catch(a){console.warn("[notetable] cat\xE1logo da Central indispon\xEDvel; usando o embutido.",a)}return ai}function lp(e){return e&&sp.add(e),Fr||(Fr=of()),Fr}var nf=`
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

`;function cp(){if(document.getElementById("cw-notetable-styles"))return;let e=document.createElement("style");e.id="cw-notetable-styles",e.textContent=nf,document.head.appendChild(e)}var Va=(e,t,a)=>e===1?t:a,Pr={pt:{title:"Nota em tabela",help:"Gera a nota do caso nas tabelas do padr\xE3o novo (ALL TASKS, ECL SBS-E e ECL MMS). O Case Notes de sempre continua no m\xF3dulo dele.",substatus:"Sub-status",choose:"Escolher",pickLabel:"Escolher sub-status",searchPh:"Buscar por nome ou atalho",searchLabel:"Buscar sub-status",noResult:"Sem resultado na lista",useTyped:e=>`Usar \u201C${e}\u201D`,useHint:"ex.: PI - \u2026",tasks:"Tasks",tasksNone:"Nenhuma task marcada",tsTitle:"Tag Support",tsHelp:"Responda antes de colar os prints. Com Yes, ACT e ECW dispensam os prints; as outras tasks seguem pedindo.",pvExplain:"Explica\xE7\xE3o \u2014 n\xE3o vai para a nota",pvGhost:"Este bloco ainda n\xE3o est\xE1 na nota. Ligue o chip para inclu\xED-lo; ele entraria aqui.",pvOpen:"Ver na pr\xE9via",pvGhostPhase:"Esta n\xE3o \xE9 a fase da nota agora. Escolha o chip para trocar para ela; a nota ficaria assim.",tsAutoNa:"N\xE3o se aplica a estas tasks: a nota j\xE1 leva N\xE3o e o motivo \u201CTask n\xE3o se aplica ao uso do TSA\u201D.",change:"Alterar",tasksClose:"Pronto",blocks:"Blocos",phase:"Fase",suggested:" (sugerido)",note:"Nota",type:"Tipo",typeLabel:"Tipo de nota",lang:"Idioma",flow:"Fluxo",europe:"Europa",europeLabel:"Caso da Europa",europeHint:"Com Sim, voc\xEA marca o consentimento",inEurope:"Caso da Europa",outEurope:"Fora da Europa",salesHint:"Sales program no CRM: ",noteFocus:"Tipo de nota, idioma, fluxo e Europa. Abra para trocar.",ctxPick:"Digite o nome ou o atalho (ex.: ts so verif) para achar o sub-status.",ctxOffList:"Fora da lista oficial. Confirme que est\xE1 id\xEAntico ao Q+.",ctxFuDays:e=>`Follow-up sugerido: ${e} dias \xFAteis.`,ctxFuNa:"Follow-up n\xE3o se aplica a este sub-status.",ctxFuAgent:"O follow-up deste sub-status \xE9 decis\xE3o sua.",emptyTitle:"Escolha o sub-status",emptySub:"Os campos da nota aparecem em seguida, s\xF3 os que pedem a sua aten\xE7\xE3o.",autoCard:"Preenchido automaticamente",autoTag:"Auto",autoTitle:"Preenchido automaticamente. Editar tira a marca.",defaultTag:"Padr\xE3o",defaultTitle:"Valor padr\xE3o. Use Alterar para mudar.",europeMark:"Caso da Europa: marque",more:e=>`Mais op\xE7\xF5es \xB7 ${e}`,less:"Menos op\xE7\xF5es",phDate:"AAAA-MM-DD",phLink:"Colar link ou NA",phSpeakeasy:"Colar o ID",phText:"Digitar",phComment:"Coment\xE1rio (opcional)",bdTitle:e=>`+${e} dias \xFAteis`,bdAria:e=>`Daqui a ${e} dias \xFAteis`,autoSearch:"Auto busca",speakeasyFound:"Speakeasy ID encontrado no case log.",commentBtn:"Coment\xE1rio da linha",commentAdd:"Adicionar coment\xE1rio (vai na coluna Additional Comments)",commentIs:e=>`Coment\xE1rio: ${e}`,commentOf:e=>`Coment\xE1rio de ${e}`,naMark:"Marcar como NA",naUndo:"Desfazer NA",undo:"Desfazer",cidDetails:"Detalhes por CID",cidHint:"A lista de CIDs fica com o caso: trocar de fase n\xE3o a perde.",addCid:"+ CID",removeCid:e=>`Remover CID ${e}`,maxCid:"M\xE1ximo de 6 CIDs, como no template.",scenario:"Cen\xE1rio r\xE1pido",scenarioMenu:e=>`${e} cen\xE1rios`,scenarioApplied:"Cen\xE1rio aplicado nos campos de texto.",prints:"Prints por task",pending:e=>`${e} ${Va(e,"pendente","pendentes")}`,ready:"Pronta para preencher",readyPill:"Pronta",next:"Pr\xF3xima",markRest:"Marcar o restante como NA",marked:e=>`${e} ${Va(e,"linha marcada","linhas marcadas")} como NA.`,nothingNa:"Nada para marcar como NA.",nothingPending:"Nada pendente.",clear:"Limpar",save:"Guardar",copy:"Copiar",fill:"Preencher",cleared:"Formul\xE1rio limpo.",copied:"Texto copiado.",inserted:"Texto inserido e copiado!",notOpened:"N\xE3o consegui abrir o editor de nota do CRM. A nota est\xE1 copiada: cole com Ctrl+V.",emailAuto:"Preencher e-mail automaticamente",preview:"Pr\xE9via da nota",tabAria:e=>e?`Ver a nota (${e} ${Va(e,"pendente","pendentes")})`:"Ver a nota (pronta)",stickyAria:"Voltar ao contexto da nota",noSubstatus:"Sem sub-status",drafts:"Rascunhos",draftsEmpty:"Nenhum rascunho guardado",draftSaved:"Rascunho guardado.",draftDelete:"Excluir",draftOpened:"Rascunho aberto.",needSubstatus:"Escolha o sub-status primeiro.",restoreConfirm:"H\xE1 uma nota em tabela n\xE3o terminada da \xFAltima sess\xE3o. Restaurar?",restored:"Sess\xE3o restaurada.",split:"Alternar para Split & Transfer",pendingCell:"pendente",capturing:"Lendo o caso\u2026"},es:{title:"Nota en tabla",help:"Genera la nota del caso en las tablas del est\xE1ndar nuevo (ALL TASKS, ECL SBS-E y ECL MMS). El Case Notes de siempre sigue en su m\xF3dulo.",substatus:"Subestado",choose:"Elegir",pickLabel:"Elegir subestado",searchPh:"Buscar por nombre o atajo",searchLabel:"Buscar subestado",noResult:"Sin resultados en la lista",useTyped:e=>`Usar \u201C${e}\u201D`,useHint:"ej.: PI - \u2026",tasks:"Tasks",tasksNone:"Ninguna task marcada",tsTitle:"Tag Support",tsHelp:"Responda antes de pegar las capturas. Con Yes, ACT y ECW no requieren capturas; las dem\xE1s tasks las siguen pidiendo.",pvExplain:"Explicaci\xF3n \u2014 no va en la nota",pvGhost:"Este bloque a\xFAn no est\xE1 en la nota. Active el chip para incluirlo; entrar\xEDa aqu\xED.",pvOpen:"Ver en la vista previa",pvGhostPhase:"Esta no es la fase de la nota ahora. Elija el chip para cambiar a ella; la nota quedar\xEDa as\xED.",tsAutoNa:"No aplica a estas tasks: la nota ya lleva No y el motivo \u201CLa task no aplica al uso del TSA\u201D.",change:"Cambiar",tasksClose:"Listo",blocks:"Bloques",phase:"Fase",suggested:" (sugerido)",note:"Nota",type:"Tipo",typeLabel:"Tipo de nota",lang:"Idioma",flow:"Flujo",europe:"Europa",europeLabel:"Caso de Europa",europeHint:"Con S\xED, usted marca el consentimiento",inEurope:"Caso de Europa",outEurope:"Fuera de Europa",salesHint:"Sales program en el CRM: ",noteFocus:"Tipo de nota, idioma, flujo y Europa. \xC1brala para cambiar.",ctxPick:"Escriba el nombre o el atajo (ej.: ts so verif) para encontrar el subestado.",ctxOffList:"Fuera de la lista oficial. Confirme que sea id\xE9ntico al de Q+.",ctxFuDays:e=>`Follow-up sugerido: ${e} d\xEDas h\xE1biles.`,ctxFuNa:"El follow-up no aplica a este subestado.",ctxFuAgent:"El follow-up de este subestado lo decide usted.",emptyTitle:"Elija el subestado",emptySub:"Los campos de la nota aparecen enseguida, solo los que piden su atenci\xF3n.",autoCard:"Completado autom\xE1ticamente",autoTag:"Auto",autoTitle:"Completado autom\xE1ticamente. Editarlo quita la marca.",defaultTag:"Predeterminado",defaultTitle:"Valor predeterminado. Use Cambiar para modificarlo.",europeMark:"Caso de Europa: marque",more:e=>`M\xE1s opciones \xB7 ${e}`,less:"Menos opciones",phDate:"AAAA-MM-DD",phLink:"Pegar enlace o NA",phSpeakeasy:"Pegar el ID",phText:"Escribir",phComment:"Comentario (opcional)",bdTitle:e=>`+${e} d\xEDas h\xE1biles`,bdAria:e=>`Dentro de ${e} d\xEDas h\xE1biles`,autoSearch:"B\xFAsqueda auto",speakeasyFound:"Speakeasy ID encontrado en el case log.",commentBtn:"Comentario de la fila",commentAdd:"Agregar comentario (va en la columna Additional Comments)",commentIs:e=>`Comentario: ${e}`,commentOf:e=>`Comentario de ${e}`,naMark:"Marcar como NA",naUndo:"Deshacer NA",undo:"Deshacer",cidDetails:"Detalles por CID",cidHint:"La lista de CIDs queda con el caso: cambiar de fase no la pierde.",addCid:"+ CID",removeCid:e=>`Quitar CID ${e}`,maxCid:"M\xE1ximo de 6 CIDs, como en la plantilla.",scenario:"Escenario r\xE1pido",scenarioMenu:e=>`${e} escenarios`,scenarioApplied:"Escenario aplicado en los campos de texto.",prints:"Capturas por task",pending:e=>`${e} ${Va(e,"pendiente","pendientes")}`,ready:"Lista para completar",readyPill:"Lista",next:"Siguiente",markRest:"Marcar el resto como NA",marked:e=>`${e} ${Va(e,"fila marcada","filas marcadas")} como NA.`,nothingNa:"Nada para marcar como NA.",nothingPending:"Nada pendiente.",clear:"Limpiar",save:"Guardar",copy:"Copiar",fill:"Completar",cleared:"Formulario limpio.",copied:"Texto copiado.",inserted:"\xA1Texto insertado y copiado!",notOpened:"No pude abrir el editor de notas del CRM. La nota est\xE1 copiada: p\xE9guela con Ctrl+V.",emailAuto:"Completar el correo autom\xE1ticamente",preview:"Vista previa de la nota",tabAria:e=>e?`Ver la nota (${e} ${Va(e,"pendiente","pendientes")})`:"Ver la nota (lista)",stickyAria:"Volver al contexto de la nota",noSubstatus:"Sin subestado",drafts:"Borradores",draftsEmpty:"Ning\xFAn borrador guardado",draftSaved:"Borrador guardado.",draftDelete:"Eliminar",draftOpened:"Borrador abierto.",needSubstatus:"Elija el subestado primero.",restoreConfirm:"Hay una nota en tabla sin terminar de la \xFAltima sesi\xF3n. \xBFRestaurar?",restored:"Sesi\xF3n restaurada.",split:"Cambiar a Split & Transfer",pendingCell:"pendiente",capturing:"Leyendo el caso\u2026"},en:{title:"Table note",help:"Builds the case note as the new standard's tables (ALL TASKS, ECL SBS-E and ECL MMS). The usual Case Notes stays in its own module.",substatus:"Sub-status",choose:"Choose",pickLabel:"Choose sub-status",searchPh:"Search by name or shortcut",searchLabel:"Search sub-status",noResult:"No match in the list",useTyped:e=>`Use \u201C${e}\u201D`,useHint:"e.g. PI - \u2026",tasks:"Tasks",tasksNone:"No task selected",tsTitle:"Tag Support",tsHelp:"Answer before pasting the prints. With Yes, ACT and ECW need no prints; the other tasks still do.",pvExplain:"Explanation \u2014 not part of the note",pvGhost:"This block is not in the note yet. Turn its chip on to include it; it would go here.",pvOpen:"Show in the preview",pvGhostPhase:"This is not the note's phase right now. Pick the chip to switch to it; the note would look like this.",tsAutoNa:"Does not apply to these tasks: the note already carries No and the reason \u201CTask does not apply to TSA usage\u201D.",change:"Change",tasksClose:"Done",blocks:"Blocks",phase:"Phase",suggested:" (suggested)",note:"Note",type:"Type",typeLabel:"Note type",lang:"Language",flow:"Flow",europe:"Europe",europeLabel:"Europe case",europeHint:"With Yes, you mark the consent",inEurope:"Europe case",outEurope:"Outside Europe",salesHint:"Sales program in the CRM: ",noteFocus:"Note type, language, flow and Europe. Open to change.",ctxPick:"Type the name or the shortcut (e.g. ts so verif) to find the sub-status.",ctxOffList:"Not in the official list. Make sure it matches Q+ exactly.",ctxFuDays:e=>`Suggested follow-up: ${e} business days.`,ctxFuNa:"Follow-up does not apply to this sub-status.",ctxFuAgent:"The follow-up for this sub-status is your call.",emptyTitle:"Choose the sub-status",emptySub:"The note fields show up next, only the ones that need your attention.",autoCard:"Filled in automatically",autoTag:"Auto",autoTitle:"Filled in automatically. Editing removes the mark.",defaultTag:"Default",defaultTitle:"Default value. Use Change to edit it.",europeMark:"Europe case: mark it",more:e=>`More options \xB7 ${e}`,less:"Fewer options",phDate:"YYYY-MM-DD",phLink:"Paste a link or NA",phSpeakeasy:"Paste the ID",phText:"Type",phComment:"Comment (optional)",bdTitle:e=>`+${e} business days`,bdAria:e=>`In ${e} business days`,autoSearch:"Auto search",speakeasyFound:"Speakeasy ID found in the case log.",commentBtn:"Row comment",commentAdd:"Add a comment (goes in the Additional Comments column)",commentIs:e=>`Comment: ${e}`,commentOf:e=>`Comment for ${e}`,naMark:"Mark as NA",naUndo:"Undo NA",undo:"Undo",cidDetails:"CID-level details",cidHint:"The CID list stays with the case: switching phase keeps it.",addCid:"+ CID",removeCid:e=>`Remove CID ${e}`,maxCid:"Up to 6 CIDs, as in the template.",scenario:"Quick scenario",scenarioMenu:e=>`${e} scenarios`,scenarioApplied:"Scenario applied to the text fields.",prints:"Screenshots per task",pending:e=>`${e} pending`,ready:"Ready to fill",readyPill:"Ready",next:"Next",markRest:"Mark the rest as NA",marked:e=>`${e} ${Va(e,"row","rows")} marked as NA.`,nothingNa:"Nothing to mark as NA.",nothingPending:"Nothing pending.",clear:"Clear",save:"Save",copy:"Copy",fill:"Fill",cleared:"Form cleared.",copied:"Text copied.",inserted:"Text inserted and copied!",notOpened:"I couldn't open the CRM note editor. The note is copied: paste it with Ctrl+V.",emailAuto:"Fill the email automatically",preview:"Note preview",tabAria:e=>e?`View the note (${e} pending)`:"View the note (ready)",stickyAria:"Back to the note context",noSubstatus:"No sub-status",drafts:"Drafts",draftsEmpty:"No saved drafts",draftSaved:"Draft saved.",draftDelete:"Delete",draftOpened:"Draft opened.",needSubstatus:"Choose the sub-status first.",restoreConfirm:"There is an unfinished table note from your last session. Restore it?",restored:"Session restored.",split:"Switch to Split & Transfer",pendingCell:"pending",capturing:"Reading the case\u2026"}};function X(e,...t){let a=Pr[ge()]||Pr.pt,o=a[e]!==void 0?a[e]:Pr.pt[e];return typeof o=="function"?o(...t):o===void 0?e:o}var dp={pt:{when:"Quando usar",statuses:"Sub-status",tasks:"Tasks",ts:"Tag Support",must:"Obrigat\xF3rio",flow:"Na linha do tempo",close:"Fechar",ask:e=>`O que \xE9 ${e}?`,notInNote:"Esta explica\xE7\xE3o \xE9 s\xF3 para voc\xEA: n\xE3o vai para a nota."},es:{when:"Cu\xE1ndo usar",statuses:"Sub-status",tasks:"Tasks",ts:"Tag Support",must:"Obligatorio",flow:"En la l\xEDnea de tiempo",close:"Cerrar",ask:e=>`\xBFQu\xE9 es ${e}?`,notInNote:"Esta explicaci\xF3n es solo para usted: no va en la nota."},en:{when:"When to use",statuses:"Sub-status",tasks:"Tasks",ts:"Tag Support",must:"Required",flow:"On the timeline",close:"Close",ask:e=>`What is ${e}?`,notInNote:"This explanation is for you only: it does not go into the note."}},rf={pt:{closed:"Todos os SO (Implementation, Education e Troubleshooting Only) e os IN/DC (Troubleshooting [Transferred], Out of Scope - Rerouted, Not Reachable, Reschedule Limit Exceeded etc.).",flow:"Before, Implementation e After pedem prints em momentos diferentes: antes de mexer, o que foi feito na call e a confirma\xE7\xE3o depois do follow-up.",tasks:"S\xF3 ACT (Ads Conversion Tracking) e ECW (Enhanced Conversions for Web).",ts:"Com Tag Support = Yes, as linhas de print de ACT/ECW viram NA autom\xE1tico. \u201CIncluir mesmo assim\u201D religa os prints da task.",na:"Cada linha aceita NA quando n\xE3o se aplica.",sameDayWhen:"Depois de appointments e de fechamentos no mesmo dia: sempre que voc\xEA registra a nota depois de uma call do SpeakEasy, de uma tentativa de contato (AC) ou do fechamento do caso no mesmo dia.",sameDayStatuses:[["Caso n\xE3o fechado no mesmo dia","NI (Awaiting Inputs, Awaiting Validation, In Consult, Attempted Contact) e AS (Acceptable Reschedule, Reschedule 1)."],["Caso fechado no dia do appointment","{closed}"]]},es:{closed:"Todos los SO (Implementation, Education y Troubleshooting Only) y los IN/DC (Troubleshooting [Transferred], Out of Scope - Rerouted, Not Reachable, Reschedule Limit Exceeded, etc.).",flow:"Before, Implementation y After piden capturas en momentos distintos: antes de tocar nada, lo que se hizo en la llamada y la confirmaci\xF3n despu\xE9s del seguimiento.",tasks:"Solo ACT (Ads Conversion Tracking) y ECW (Enhanced Conversions for Web).",ts:"Con Tag Support = Yes, las l\xEDneas de captura de ACT/ECW pasan a NA autom\xE1tico. \u201CIncluir de todos modos\u201D reactiva las capturas de la task.",na:"Cada l\xEDnea acepta NA cuando no aplica.",sameDayWhen:"Despu\xE9s de citas y de cierres el mismo d\xEDa: siempre que registre la nota despu\xE9s de una llamada de SpeakEasy, de un intento de contacto (AC) o del cierre del caso el mismo d\xEDa.",sameDayStatuses:[["Caso no cerrado el mismo d\xEDa","NI (Awaiting Inputs, Awaiting Validation, In Consult, Attempted Contact) y AS (Acceptable Reschedule, Reschedule 1)."],["Caso cerrado el d\xEDa de la cita","{closed}"]]},en:{closed:"All SO (Implementation, Education and Troubleshooting Only) and IN/DC (Troubleshooting [Transferred], Out of Scope - Rerouted, Not Reachable, Reschedule Limit Exceeded, etc.).",flow:"Before, Implementation and After ask for prints at different moments: before you change anything, what was done on the call, and the confirmation after the follow-up.",tasks:"ACT (Ads Conversion Tracking) and ECW (Enhanced Conversions for Web) only.",ts:"With Tag Support = Yes, the ACT/ECW print rows become automatic NA. \u201CInclude anyway\u201D brings the task's prints back.",na:"Every row accepts NA when it does not apply.",sameDayWhen:"After appointments and same-day closures: whenever you log the note after a SpeakEasy call, an Attempted Contact (AC) dial or a same-day case closure.",sameDayStatuses:[["Case not closed the same day","NI (Awaiting Inputs, Awaiting Validation, In Consult, Attempted Contact) and AS (Acceptable Reschedule, Reschedule 1)."],["Case closed on the day of the appointment","{closed}"]]}},mp={before:{pt:{what:"Os prints de como o caso chegou, antes de voc\xEA mexer: status da convers\xE3o no Google Ads, repeat rate elevado, otimiza\xE7\xE3o de lance inicial e EC Qualdash. S\xF3 no ECW: o alerta do Tag Diagnostics."},es:{what:"Las capturas de c\xF3mo lleg\xF3 el caso, antes de tocar nada: estado de la conversi\xF3n en Google Ads, repeat rate elevado, optimizaci\xF3n de puja inicial y EC Qualdash. Solo en ECW: la alerta de Tag Diagnostics."},en:{what:"Prints of how the case arrived, before you touch anything: conversion status in Google Ads, elevated repeat rate, initial bidding optimization and EC Qualdash. ECW only: the Tag Diagnostics alert."}},impl:{pt:{what:"Os prints do que foi feito na call: status da convers\xE3o no Google Ads, configura\xE7\xF5es da convers\xE3o (ID e label), GTM/backend do site, Tag Assistant com a tag disparada, termos de dados do cliente aceitos e o hit enviado (200 OK). S\xF3 no ECW: Enhanced Conversions ligado e o par\xE2metro em v\xE1lido (ou ecsid)."},es:{what:"Las capturas de lo que se hizo en la llamada: estado de la conversi\xF3n en Google Ads, configuraci\xF3n de la conversi\xF3n (ID y label), GTM/backend del sitio, Tag Assistant con la etiqueta disparada, t\xE9rminos de datos del cliente aceptados y el hit enviado (200 OK). Solo en ECW: Enhanced Conversions activado y el par\xE1metro em v\xE1lido (o ecsid)."},en:{what:"Prints of what was done on the call: conversion status in Google Ads, conversion settings (ID and label), GTM/site backend, Tag Assistant with the tag fired, Customer Data Terms accepted and the hit sent (200 OK). ECW only: Enhanced Conversions turned on and a valid em parameter (or ecsid)."}},after:{pt:{what:"Os prints da valida\xE7\xE3o depois da janela de follow-up: status da convers\xE3o, repeat rate normalizado (~1,0 depois de 2 dias no ACT e 7 dias no ECW) e otimiza\xE7\xE3o de lance depois da mudan\xE7a. S\xF3 no ECW: Tag Diagnostics do dia 7 e/ou EC Qualdash.",when:"Em follow-ups ou ao fechar o caso depois de cumprir a janela de follow-up. N\xE3o vale no dia do appointment.",statuses:[["Ainda h\xE1 follow-ups","NI (Awaiting Inputs, Awaiting Validation, In Consult) e AS (Acceptable Reschedule, Reschedule 1)."],["Caso fechado depois da janela de follow-up","{closed}"]]},es:{what:"Las capturas de la validaci\xF3n despu\xE9s de la ventana de seguimiento: estado de la conversi\xF3n, repeat rate normalizado (~1,0 tras 2 d\xEDas en ACT y 7 d\xEDas en ECW) y optimizaci\xF3n de puja despu\xE9s del cambio. Solo en ECW: Tag Diagnostics del d\xEDa 7 y/o EC Qualdash.",when:"En seguimientos o al cerrar el caso despu\xE9s de cumplir la ventana de seguimiento. No vale el d\xEDa de la cita.",statuses:[["A\xFAn hay seguimientos","NI (Awaiting Inputs, Awaiting Validation, In Consult) y AS (Acceptable Reschedule, Reschedule 1)."],["Caso cerrado despu\xE9s de la ventana de seguimiento","{closed}"]]},en:{what:"Prints of the validation after the follow-up window: conversion status, normalized repeat rate (~1.0 after 2 days for ACT and 7 days for ECW) and bidding optimization after the change. ECW only: Day 7 Tag Diagnostics and/or EC Qualdash.",when:"During follow-ups or when closing the case after completing the follow-up window. NOT on the day of the appointment.",statuses:[["More follow-ups are needed","NI (Awaiting Inputs, Awaiting Validation, In Consult) and AS (Acceptable Reschedule, Reschedule 1)."],["Case closed after the follow-up window","{closed}"]]}},consult:{pt:{what:"O caminho da consulta ou transfer\xEAncia para M&A e a aprova\xE7\xE3o do SME: print confirmando que o caso foi para a fila certa e print (ou nota registrada) com a aprova\xE7\xE3o do SME para o Split & Transfer ou o descarte.",when:"Sempre que voc\xEA precisar consultar ou transferir o caso para M&A, depois de uma call ou de uma janela de follow-up.",statuses:[["Caso fechado depois do Split & Transfer para M&A","{closed}"]],tasks:"Todas as tasks.",must:"Em IN - Troubleshooting [Transferred], SO - Troubleshooting Only com Split & Transfer e IN/DC - Out of Scope - Rerouted. Nos outros casos, escreva NA."},es:{what:"La ruta de la consulta o transferencia a M&A y la aprobaci\xF3n del SME: captura que confirma que el caso fue a la fila correcta y captura (o nota registrada) con la aprobaci\xF3n del SME para el Split & Transfer o el descarte.",when:"Siempre que deba consultar o transferir el caso a M&A, despu\xE9s de una llamada o de una ventana de seguimiento.",statuses:[["Caso cerrado despu\xE9s del Split & Transfer a M&A","{closed}"]],tasks:"Todas las tasks.",must:"En IN - Troubleshooting [Transferred], SO - Troubleshooting Only con Split & Transfer e IN/DC - Out of Scope - Rerouted. En los dem\xE1s casos, escriba NA."},en:{what:"The routing path of the consult or transfer to M&A and the SME approval: a screenshot confirming the case went to the right queue and a screenshot (or logged note) of the SME approval for the Split & Transfer or the discard.",when:"Whenever you need to consult or transfer the case to M&A, after a call or after a follow-up window.",statuses:[["Case closed after splitting & transferring to M&A","{closed}"]],tasks:"All tasks.",must:"For IN - Troubleshooting [Transferred], SO - Troubleshooting Only with Split & Transfer, and IN/DC - Out of Scope - Rerouted. Otherwise write NA."}}},sf={pt:{impl:[["Em andamento","Todos os NI (Awaiting Inputs, Awaiting Validation etc.)."],["Implementado","SO (Implementation, Troubleshooting e Education Only)."],["Inativo","IN (Instructions Shared etc.)."]],one:"Uma fase por nota: escolha a que descreve o que voc\xEA acabou de fazer."},es:{impl:[["En curso","Todos los NI (Awaiting Inputs, Awaiting Validation, etc.)."],["Implementado","SO (Implementation, Troubleshooting y Education Only)."],["Inactivo","IN (Instructions Shared, etc.)."]],one:"Una fase por nota: elija la que describe lo que acaba de hacer."},en:{impl:[["In progress","All NI (Awaiting Inputs, Awaiting Validation, etc.)."],["Implemented","SO (Implementation, Troubleshooting and Education Only)."],["Inactive","IN (Instructions Shared, etc.)."]],one:"One phase per note: pick the one that describes what you just did."}},gp={"sbse.audit":{pt:{what:"O registro da auditoria de prontid\xE3o: por CID (To Be Worked?, CID, Under MCC?, resultado e link da auditoria e aprova\xE7\xE3o do SME), os detalhes gerais e os prints da auditoria e do GAM Ping. TBW = CID a trabalhar; N-TBW = n\xE3o ser\xE1 trabalhado.",when:"Depois que a auditoria \xE9 conclu\xEDda E revisada/aprovada pelo SME."},es:{what:"El registro de la auditor\xEDa de preparaci\xF3n: por CID (To Be Worked?, CID, Under MCC?, resultado y enlace de la auditor\xEDa y aprobaci\xF3n del SME), los detalles generales y las capturas de la auditor\xEDa y del GAM Ping. TBW = CID a trabajar; N-TBW = no se trabajar\xE1.",when:"Despu\xE9s de que la auditor\xEDa se concluya Y sea revisada/aprobada por el SME."},en:{what:"The record of the readiness audit: per CID (To Be Worked?, CID, Under MCC?, audit outcome and link, and SME sign-off), the general details and the audit and GAM Ping screenshots. TBW = CID to be worked; N-TBW = will not be worked.",when:"After the audit is completed AND reviewed/signed-off by the SME."}},"sbse.impl_call":{pt:{what:"O registro da call de implementa\xE7\xE3o: por CID (To Be Worked?, CID, tag implementada?, mapeamento do Case ID), sub-status e motivo, follow-up, Speakeasy ID, coment\xE1rios da call, consentimento de grava\xE7\xE3o e os prints (da call, do n\xEDvel de acesso da conta, do GAM Ping e os demais).",when:"Depois que a call de implementa\xE7\xE3o \xE9 conclu\xEDda.",statuses:"{impl}"},es:{what:"El registro de la llamada de implementaci\xF3n: por CID (To Be Worked?, CID, \xBFetiqueta implementada?, mapeo del Case ID), sub-status y motivo, seguimiento, Speakeasy ID, comentarios de la llamada, consentimiento de grabaci\xF3n y las capturas (de la llamada, del nivel de acceso de la cuenta, del GAM Ping y las dem\xE1s).",when:"Despu\xE9s de que se concluya la llamada de implementaci\xF3n.",statuses:"{impl}"},en:{what:"The record of the implementation call: per CID (To Be Worked?, CID, tag implemented?, Case ID mapping), sub-status and reason, follow-up, Speakeasy ID, on-call comments, recording consent and the screenshots (on-call, account access level, GAM Ping and the rest).",when:"After the implementation call is completed.",statuses:"{impl}"}},"sbse.interim":{pt:{what:"Os acompanhamentos com o seller ou o anunciante e o fechamento antes da implementa\xE7\xE3o: sub-status, follow-up, coment\xE1rios do caso, GAM Ping e os demais prints.",when:"Sempre que voc\xEA fecha o caso na pr\xE9-call ou faz follow-up com o seller ou o anunciante nas etapas de implementa\xE7\xE3o."},es:{what:"Los seguimientos con el seller o el anunciante y el cierre antes de la implementaci\xF3n: sub-status, seguimiento, comentarios del caso, GAM Ping y las dem\xE1s capturas.",when:"Siempre que cierre el caso en la pre-llamada o haga seguimiento con el seller o el anunciante en las etapas de implementaci\xF3n."},en:{what:"The follow-ups with the seller or advertiser and the closure before implementation: sub-status, follow-up, case comments, GAM Ping and the other screenshots.",when:"Whenever you close a case in the pre-call or follow up with the seller or advertiser at the implementation stages."}},"mms.triage":{pt:{what:"O registro da triagem inicial: sub-status, follow-up, coment\xE1rios do caso e GAM Ping.",when:"Depois que o e-mail FR (CR 0A) \xE9 enviado, mas os CIDs ainda n\xE3o foram confirmados.",flow:"Fases em ordem: 0 Triagem inicial, 1 Verifica\xE7\xE3o de elegibilidade, 2 Auditoria e agendamento, 3 Call de pr\xE9-implementa\xE7\xE3o. O Interim cobre os acompanhamentos e fechamentos no meio do caminho.",statuses:[["Sub-status","PI - Eligibility Check In Progress."]]},es:{what:"El registro del triaje inicial: sub-status, seguimiento, comentarios del caso y GAM Ping.",when:"Despu\xE9s de enviar el correo FR (CR 0A), pero con los CID a\xFAn sin confirmar.",flow:"Fases en orden: 0 Triaje inicial, 1 Verificaci\xF3n de elegibilidad, 2 Auditor\xEDa y programaci\xF3n, 3 Llamada de pre-implementaci\xF3n. El Interim cubre los seguimientos y cierres intermedios.",statuses:[["Sub-status","PI - Eligibility Check In Progress."]]},en:{what:"The record of the initial triage: sub-status, follow-up, case comments and GAM Ping.",when:"After the FR email (CR 0A) has been sent BUT the CID(s) are yet to be confirmed.",flow:"Phases in order: 0 Initial Triage, 1 Eligibility Verification, 2 Readiness Audit & Scheduling, 3 Pre-Implementation Call. Interim covers the follow-ups and closures in between.",statuses:[["Sub-status","PI - Eligibility Check In Progress."]]}},"mms.eligibility":{pt:{what:"A verifica\xE7\xE3o de elegibilidade: por CID (To Be Worked?, CID, Under MCC?, status de elegibilidade e prints do Galactic), sub-status, follow-up, coment\xE1rios do caso e GAM Ping.",when:"Depois que o e-mail FR (CR 0A) \xE9 enviado E a elegibilidade dos CIDs confirmados foi checada no Galactic.",flow:"Fases em ordem: 0 Triagem inicial, 1 Verifica\xE7\xE3o de elegibilidade, 2 Auditoria e agendamento, 3 Call de pr\xE9-implementa\xE7\xE3o. O Interim cobre os acompanhamentos e fechamentos no meio do caminho.",statuses:[["Sub-status","PI - Audit In Progress e PI - Eligibility Check In Progress (CIDs confirmados pelo seller, mas ainda se busca identificar oportunidades espec\xEDficas de implementa\xE7\xE3o para a TechSol, com base no cen\xE1rio de Next Step do PCM Power)."]]},es:{what:"La verificaci\xF3n de elegibilidad: por CID (To Be Worked?, CID, Under MCC?, estado de elegibilidad y capturas de Galactic), sub-status, seguimiento, comentarios del caso y GAM Ping.",when:"Despu\xE9s de enviar el correo FR (CR 0A) Y de comprobar en Galactic la elegibilidad de los CID confirmados.",flow:"Fases en orden: 0 Triaje inicial, 1 Verificaci\xF3n de elegibilidad, 2 Auditor\xEDa y programaci\xF3n, 3 Llamada de pre-implementaci\xF3n. El Interim cubre los seguimientos y cierres intermedios.",statuses:[["Sub-status","PI - Audit In Progress y PI - Eligibility Check In Progress (CID confirmados por el seller, pero a\xFAn se buscan oportunidades espec\xEDficas de implementaci\xF3n para TechSol, seg\xFAn el escenario de Next Step de PCM Power)."]]},en:{what:"The eligibility verification: per CID (To Be Worked?, CID, Under MCC?, eligibility status and Galactic screenshots), sub-status, follow-up, case comments and GAM Ping.",when:"After the FR email (CR 0A) has been sent AND the eligibility of the confirmed CID(s) has been checked in Galactic.",flow:"Phases in order: 0 Initial Triage, 1 Eligibility Verification, 2 Readiness Audit & Scheduling, 3 Pre-Implementation Call. Interim covers the follow-ups and closures in between.",statuses:[["Sub-status","PI - Audit In Progress and PI - Eligibility Check In Progress (CIDs confirmed by the seller, but we are still probing for specific implementation opportunities for TechSol based on the PCM Power Next Step scenario)."]]}},"mms.audit":{pt:{what:"O registro da auditoria de prontid\xE3o e do agendamento: por CID (To Be Worked?, CID, Under MCC?, resultado e link da auditoria e aprova\xE7\xE3o do SME), os detalhes gerais e os prints da auditoria e do GAM Ping. TBW = CID a trabalhar; N-TBW = n\xE3o ser\xE1 trabalhado.",when:"Depois que a auditoria \xE9 conclu\xEDda E revisada/aprovada pelo SME.",flow:"Fases em ordem: 0 Triagem inicial, 1 Verifica\xE7\xE3o de elegibilidade, 2 Auditoria e agendamento, 3 Call de pr\xE9-implementa\xE7\xE3o. O Interim cobre os acompanhamentos e fechamentos no meio do caminho.",statuses:[["Sub-status","PI - Awaiting Appointment e PI - Appointment Scheduled."]]},es:{what:"El registro de la auditor\xEDa de preparaci\xF3n y la programaci\xF3n: por CID (To Be Worked?, CID, Under MCC?, resultado y enlace de la auditor\xEDa y aprobaci\xF3n del SME), los detalles generales y las capturas de la auditor\xEDa y del GAM Ping. TBW = CID a trabajar; N-TBW = no se trabajar\xE1.",when:"Despu\xE9s de que la auditor\xEDa se concluya Y sea revisada/aprobada por el SME.",flow:"Fases en orden: 0 Triaje inicial, 1 Verificaci\xF3n de elegibilidad, 2 Auditor\xEDa y programaci\xF3n, 3 Llamada de pre-implementaci\xF3n. El Interim cubre los seguimientos y cierres intermedios.",statuses:[["Sub-status","PI - Awaiting Appointment y PI - Appointment Scheduled."]]},en:{what:"The record of the readiness audit and scheduling: per CID (To Be Worked?, CID, Under MCC?, audit outcome and link, and SME sign-off), the general details and the audit and GAM Ping screenshots. TBW = CID to be worked; N-TBW = will not be worked.",when:"After the audit is completed AND reviewed/signed-off by the SME.",flow:"Phases in order: 0 Initial Triage, 1 Eligibility Verification, 2 Readiness Audit & Scheduling, 3 Pre-Implementation Call. Interim covers the follow-ups and closures in between.",statuses:[["Sub-status","PI - Awaiting Appointment and PI - Appointment Scheduled."]]}},"mms.impl_call":{pt:{what:"O registro da call de pr\xE9-implementa\xE7\xE3o (3-way): por CID (To Be Worked?, CID, tag implementada?, mapeamento do Case ID), sub-status e motivo, follow-up, Speakeasy ID, coment\xE1rios da call, consentimento de grava\xE7\xE3o e os prints (da call, do n\xEDvel de acesso da conta, do GAM Ping e os demais).",when:"Depois que a call de pr\xE9-implementa\xE7\xE3o (3-way) \xE9 conclu\xEDda OU ao fechar o caso depois de uma call de pr\xE9-implementa\xE7\xE3o bem-sucedida.",flow:"Fases em ordem: 0 Triagem inicial, 1 Verifica\xE7\xE3o de elegibilidade, 2 Auditoria e agendamento, 3 Call de pr\xE9-implementa\xE7\xE3o. O Interim cobre os acompanhamentos e fechamentos no meio do caminho.",statuses:"{impl}"},es:{what:"El registro de la llamada de pre-implementaci\xF3n (3-way): por CID (To Be Worked?, CID, \xBFetiqueta implementada?, mapeo del Case ID), sub-status y motivo, seguimiento, Speakeasy ID, comentarios de la llamada, consentimiento de grabaci\xF3n y las capturas (de la llamada, del nivel de acceso de la cuenta, del GAM Ping y las dem\xE1s).",when:"Despu\xE9s de que se concluya la llamada de pre-implementaci\xF3n (3-way) O al cerrar el caso tras una llamada de pre-implementaci\xF3n exitosa.",flow:"Fases en orden: 0 Triaje inicial, 1 Verificaci\xF3n de elegibilidad, 2 Auditor\xEDa y programaci\xF3n, 3 Llamada de pre-implementaci\xF3n. El Interim cubre los seguimientos y cierres intermedios.",statuses:"{impl}"},en:{what:"The record of the pre-implementation call (3-way): per CID (To Be Worked?, CID, tag implemented?, Case ID mapping), sub-status and reason, follow-up, Speakeasy ID, on-call comments, recording consent and the screenshots (on-call, account access level, GAM Ping and the rest).",when:"After the 3-way pre-implementation call is completed OR whenever we close a case after a successful pre-implementation call.",flow:"Phases in order: 0 Initial Triage, 1 Eligibility Verification, 2 Readiness Audit & Scheduling, 3 Pre-Implementation Call. Interim covers the follow-ups and closures in between.",statuses:"{impl}"}},"mms.interim":{pt:{what:"Os acompanhamentos com o seller ou o anunciante e o fechamento antes da implementa\xE7\xE3o: sub-status, follow-up, coment\xE1rios do caso, GAM Ping e os demais prints.",when:"Sempre que voc\xEA fecha o caso na pr\xE9-implementa\xE7\xE3o OU faz follow-up com o seller ou o anunciante, na pr\xE9-implementa\xE7\xE3o e na implementa\xE7\xE3o.",flow:"Fases em ordem: 0 Triagem inicial, 1 Verifica\xE7\xE3o de elegibilidade, 2 Auditoria e agendamento, 3 Call de pr\xE9-implementa\xE7\xE3o. O Interim cobre os acompanhamentos e fechamentos no meio do caminho.",statuses:[["Fechar na pr\xE9-implementa\xE7\xE3o","PI - Lead Not Ready (Not Reachable, Not Ready, Not Interested) e PI - Ineligible (API, Agency, Bidding, Pitch, Ineligible, Fully Adopted)."],["Acompanhar","PI - Eligibility Check In Progress, PI - Awaiting Appointment, NI - Awaiting Inputs e NI - In Consult."]]},es:{what:"Los seguimientos con el seller o el anunciante y el cierre antes de la implementaci\xF3n: sub-status, seguimiento, comentarios del caso, GAM Ping y las dem\xE1s capturas.",when:"Siempre que cierre el caso en la pre-implementaci\xF3n O haga seguimiento con el seller o el anunciante, en la pre-implementaci\xF3n y en la implementaci\xF3n.",flow:"Fases en orden: 0 Triaje inicial, 1 Verificaci\xF3n de elegibilidad, 2 Auditor\xEDa y programaci\xF3n, 3 Llamada de pre-implementaci\xF3n. El Interim cubre los seguimientos y cierres intermedios.",statuses:[["Cerrar en la pre-implementaci\xF3n","PI - Lead Not Ready (Not Reachable, Not Ready, Not Interested) y PI - Ineligible (API, Agency, Bidding, Pitch, Ineligible, Fully Adopted)."],["Dar seguimiento","PI - Eligibility Check In Progress, PI - Awaiting Appointment, NI - Awaiting Inputs y NI - In Consult."]]},en:{what:"The follow-ups with the seller or advertiser and the closure before implementation: sub-status, follow-up, case comments, GAM Ping and the other screenshots.",when:"Whenever we close a case in the pre-implementation stage OR follow up with the seller or advertiser at both the pre-implementation and implementation stages.",flow:"Phases in order: 0 Initial Triage, 1 Eligibility Verification, 2 Readiness Audit & Scheduling, 3 Pre-Implementation Call. Interim covers the follow-ups and closures in between.",statuses:[["Closing in pre-implementation","PI - Lead Not Ready (Not Reachable, Not Ready, Not Interested) and PI - Ineligible (API, Agency, Bidding, Pitch, Ineligible, Fully Adopted)."],["Following up","PI - Eligibility Check In Progress, PI - Awaiting Appointment, NI - Awaiting Inputs and NI - In Consult."]]}}},pp=["pt","es","en"];function lf(e,t){let a=gp[e][t],o=sf[t],n={...a,one:o.one};return a.statuses==="{impl}"&&(n.statuses=o.impl),n}function cf(e,t){let a=rf[t],o=e==="consult"?{}:{flow:a.flow,tasks:a.tasks,ts:a.ts,na:a.na},n=e==="before"||e==="impl"?{when:a.sameDayWhen,statuses:a.sameDayStatuses}:{},i={...o,...n,...mp[e][t]};return i.statuses=i.statuses.map(([r,s])=>[r,s.replace("{closed}",a.closed)]),i}var up={...Object.fromEntries(Object.keys(mp).map(e=>[e,Object.fromEntries(pp.map(t=>[t,cf(e,t)]))])),...Object.fromEntries(Object.keys(gp).map(e=>[e,Object.fromEntries(pp.map(t=>[t,lf(e,t)]))]))};function oi(e=ge()){return dp[e]||dp.pt}function rn(e,t=ge(),a=""){let o=a&&up[`${a}.${e}`]||up[e];return o?o[t]||o.pt:null}var df="cw-notetable-popup",pf="cw-btn-notetable",aa=qi({storageKey:"cw_notetable_parking_lot",emergencyKey:"cw_notetable_emergency_save"}),fp={"SO - Educational Only":"SO_Education_Only","IN - Out of Scope - Rerouted":"IN_Out_of_Scope_Rerouted"};function ni(e){if(fp[e])return fp[e];let t=Object.entries(lt).find(([,a])=>a.name===e);return t?t[0]:null}var uf={NI:"Need Info",SO:"Solution Offered",IN:"Inactive",AS:"Assigned",DC:"Discarded"},mf=["NI","SO","IN","AS","DC"].map(e=>[uf[e],Xn.filter(t=>t[0].startsWith(e+" ")).map(t=>t[0])]),gf={general:"General details",before:"Before implementation",impl:"Implementation",after:"After implementation",consult:"Consult routing path",audit:"Readiness audit",impl_call:"Implementation call",interim:"Interim check-ins",triage:"Initial triage",eligibility:"Eligibility verification",extras:"Additional details"},bp=["ts_used","ts_reason"],ff={"all.before":"Before","all.impl":"Implementation","all.after":"After","all.consult":"Consult","sbse.audit":"Phase 1 \xB7 Audit","sbse.impl_call":"Phase 2 \xB7 Impl. call","sbse.interim":"Interim","mms.triage":"Phase 0 \xB7 Triage","mms.eligibility":"Phase 1 \xB7 Eligibility","mms.audit":"Phase 2 \xB7 Audit","mms.impl_call":"Phase 3 \xB7 Pre-impl.","mms.interim":"Interim"},bf={date:"Date",next_followup:"Follow-up",cid:"CID",consent:"Consent"},hf={ads_conversion_tracking:"ACT",ads_enhanced_conversions:"ECW",ga4_event_tracking:"GA4",gtm_installation:"GTM"},vf=6,xf={chev:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>',check:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',checkc:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',search:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>',close:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',cmt:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/></svg>',cmtOn:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>',up:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>',note:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',left:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',split:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',history:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>'};function I(e,t={},...a){let o=document.createElement(e);for(let[n,i]of Object.entries(t))n==="class"?o.className=i:n==="style"?o.style.cssText=i:n.startsWith("on")&&typeof i=="function"?o.addEventListener(n.slice(2),i):i===!0?o.setAttribute(n,""):i!==!1&&i!=null&&o.setAttribute(n,i);for(let n of a.flat())n==null||n===!1||o.append(n.nodeType?n:document.createTextNode(String(n)));return o}function xt(e){let t=document.createElement("template");return t.innerHTML=xf[e].trim(),t.content.firstChild}var sn=e=>String(e||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();function hp(e){let t=sn(e);return!t||t==="n a"?null:/\bportu|\bpt\b/.test(t)?"pt":/\bspan|\bespan|\bes\b/.test(t)?"es":/\bengl|\bingl|\ben\b/.test(t)?"en":null}var vp=e=>{e.style.height="auto",e.style.height=Math.max(44,e.scrollHeight)+"px"};function xp(){let e="v1.0.0";cp();let t=zr(),a=Kn(),o=Tt(),n=!1,i={helpBlock:null,ctxOpen:!1,autoOpen:!1,more:{},drawer:!1,showPending:!1,pick:!1,tasksOpen:!1,tasksAuto:!1,scenOpen:!1,draftsOpen:!1,pi:0,split:!1,blocksTouched:!1},r={caseKey:null,cid:"",salesProgram:"",capturing:!1,restoredChecked:!1},s=!1,l=!0,d=new $o;d.currentLang=o;let c=m=>(st[ge()]||st.pt)[m]||st.pt[m]||m,g=In(()=>jr(),c,d);d.subscribe(()=>{let m=[...d.forcedScreenshots];JSON.stringify(m)!==JSON.stringify(a.forced)&&(a.forced=m,St(),Fe())});let u=I("div",{id:df,class:"cw-module-window"});Object.assign(u.style,bt,{right:"100px",width:"560px",height:"760px",overflow:"visible",backgroundColor:"transparent",boxShadow:"none",backdropFilter:"none",webkitBackdropFilter:"none",borderRadius:"20px"});let b=I("section",{class:"nt-win",role:"dialog","aria-label":X("title")});b.style.boxShadow="0 20px 40px rgba(0,0,0,.12)";let L={popup:u,googleLine:null},A=rt(u,X("title"),e,X("help"),L,()=>Io());A.style.flex="none";let C=I("div",{class:"nt-hbtn no-drag",role:"button",tabindex:"0",title:X("split"),"aria-label":X("split"),onclick:m=>{m.stopPropagation(),Jr()}},xt("split")),z=I("div",{class:"nt-hbtn no-drag",role:"button",tabindex:"0",title:X("drafts"),"aria-label":X("drafts"),onclick:m=>{m.stopPropagation(),i.draftsOpen=!i.draftsOpen,To()}},xt("history"));[C,z].forEach(m=>m.addEventListener("keydown",$=>{($.key==="Enter"||$.key===" ")&&($.preventDefault(),m.click())}));let G=A.lastElementChild;G&&(G.insertBefore(z,G.firstChild),G.insertBefore(C,G.firstChild));let R=I("button",{class:"nt-sticky",type:"button","aria-label":X("stickyAria")}),O=I("span"),de=I("button",{class:"nt-btn sm",type:"button"}),te=I("button",{class:"nt-btn sm t",type:"button"}),re=I("div",{class:"nt-pbar",role:"status","aria-live":"polite"},I("span",{class:"nt-d"}),O,I("span",{class:"nt-grow"}),de,te),ee=I("div"),w=I("div"),S=I("div",{class:"nt-form"}),D=I("div",{class:"nt-body"},ee,w,S),j=I("div",{class:"nt-bw"},R,re,D),F=I("span"),Z=I("button",{class:"nt-status",type:"button"},I("span",{class:"nt-d"}),F),fe=I("button",{class:"nt-btn",type:"button"}),he=I("button",{class:"nt-btn",type:"button"}),ue=I("button",{class:"nt-btn t",type:"button"}),ce=I("button",{class:"nt-btn p",type:"button"}),le=I("input",{type:"checkbox",checked:!0}),xe=I("span"),E=I("label",{class:"nt-emailrow"},le,xe);le.addEventListener("change",()=>{l=le.checked});let K=I("footer",{class:"nt-foot"},E,I("div",{class:"nt-foot-row"},Z,I("span",{class:"nt-grow"}),fe,he,ue,ce),I("div",{class:"nt-credit"},`created by ${Wt}`)),se=I("div",{class:"nt-split"}),V=Dn(()=>Jr(),()=>{a.splitUsed=!0,St(),Fe()});V.style.height="100%",se.append(V);let q=I("div",{class:"nt-drafts",hidden:!0,role:"dialog","aria-label":X("drafts")});b.append(A,j,se,K,q);let T=I("span",{class:"nt-bd"}),H=I("button",{class:"nt-tab",type:"button","aria-expanded":"false","aria-controls":"cw-nt-drawer-in"},T,xt("note"),(()=>{let m=xt("left");return m.classList.add("nt-chev"),m})()),ie=I("span",{class:"nt-pill"}),P=I("div",{class:"nt-eyebrow"}),Q=I("div",{class:"nt-note-card"}),pe=I("div",{class:"nt-drawer-in",id:"cw-nt-drawer-in",inert:!0},I("div",{class:"nt-d-head"},P,ie),I("div",{class:"nt-d-scroll"},Q)),v=I("aside",{class:"nt-drawer"},H,pe);u.append(v,b);let h=I("div",{class:"no-drag"});Object.assign(h.style,Yt),u.append(h),Xt(u,h),document.body.appendChild(u);let p=I("div",{class:"nt-prints"},g.screenshotsElement),N=I("div",{class:"nt-tasks"},g.selectionElement);function M(){let m=!1;g.screenshotsElement.querySelectorAll(".cw-screen-card").forEach($=>{let ae=$.querySelector('input[id^="name-"]')?.id||"",Se=!!tn.find(ye=>ae.startsWith(`name-${ye}-`))&&!$.classList.contains("ts-success");$.style.display=Se?"none":"",Se||(m=!0)}),p.style.display=m&&Da(t,a.seg)?"":"none"}new MutationObserver(()=>{M(),f()}).observe(g.screenshotsElement,{childList:!0,subtree:!0}),g.screenshotsElement.addEventListener("input",()=>{f(),St(),Zt()});function f(){let m=[];g.screenshotsElement.querySelectorAll(".cw-screen-card").forEach($=>{if($.style.display==="none")return;let ae=$.querySelector('input[id^="name-"]')?.value||"";$.querySelectorAll('input[id^="screen-"]').forEach(Y=>{let Se=Y.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"";m.push({label:`${ae} \u2014 ${Se}`.trim(),v:Y.value})})}),a.taskPrints=m}let x=()=>_a(t,a.seg)||t.segments[0],_=m=>At(m.label,o),k=m=>_(m).replace(/:\s*$/,""),W=m=>m.hint&&typeof m.hint=="object"?m.hint[ge()]||m.hint.pt||"":String(m.hint||""),U=m=>At(m,"en").replace(/\s*\(Mandatory\)/,"").replace(/^General Details$/,"Details"),oe=()=>(st[o]||st.pt).ts_output_disclaimer||"",be=()=>{let m=st[o]||st.pt;return{title:m.ts_bloco_titulo||"",body:m.ts_bloco_corpo||""}},Ie=()=>({lang:o,tsDisclaimer:oe(),tsBlockNote:be()}),Oe=m=>ta(a,m),ke=(m,$)=>Ua(t,a,m,{...Ie(),blockId:$}),wt=m=>Co(t,a,m),Ye=m=>Qn(t,a,m),gt=()=>Xd(t,a,{cid:r.cid}),oa=(m,$)=>m.type==="derived"&&(m.auto==="substatus"||m.auto==="europe"||m.auto==="tasks"&&ke(m,$)!==null),yt=(m,$)=>{if(m.type==="derived")return!1;let ae=Oe(m.id);return ke(m,$)!==null&&!!(ae.auto||ae.defaulted||Ao(t,a,m,$)&&!String(ae.v||"").trim()&&!ae.na)},da=m=>!Ye(m)&&!(m.optIn&&a.optIn.includes(m.id)),va=(m,$)=>(m.rows||[]).filter(wt).filter(ae=>!oa(ae,$));function na(){let m=[];for(let $ of ca(t,a))for(let ae of t.blocks[$.b].sections)for(let Y of va(ae,$.b))m.push([Y,$.b]);return m}let pa=()=>Kd(t,a,Ie()),ko=null;function St(){clearTimeout(ko),ko=setTimeout(()=>{a.substatus?aa.saveEmergency($r()):aa.clearEmergency()},2e3)}function $r(){return{subStatus:a.substatus,st:JSON.parse(JSON.stringify(a)),noteLang:o,caseKey:r.caseKey,tasks:g.getCheckedElements(),prints:[...g.screenshotsElement.querySelectorAll('input[id^="screen-"]')].map(m=>[m.id,m.value])}}function Br(m){if(!(!m||!m.st)){g.reset(),(m.tasks||[]).forEach($=>g.setTaskCount($.value,$.count)),a=Object.assign(Kn(),m.st),m.noteLang&&(o=m.noteLang,n=!0,d.currentLang=o),d.tagSupportUsed=Oe("ts_used").v==="Yes",d.forcedScreenshots=new Set(a.forced||[]),d.notify();for(let[$,ae]of m.prints||[]){let Y=g.screenshotsElement.querySelector(`#${CSS.escape($)}`);Y&&(Y.value=ae)}f(),Fe()}}function ln(){i.helpBlock=null,a=Kn({seg:un(),flow:en(),cids:[an(r.cid)]}),a.active=ei(t,a.seg,Lt("appointmentTime")||"",new Date),Object.assign(i,{ctxOpen:!1,autoOpen:!1,more:{},showPending:!1,scenOpen:!1,pi:0,blocksTouched:!1}),g.reset(),d.setTagSupportUsed(!1),Gr(),gt()}async function Ep(){let m=`${await to()}|${Fa()}`;r.caseKey!==null&&r.caseKey!==m&&(r.caseKey=m,r.cid="",ln(),Fe()),r.caseKey=m,r.capturing=!0,Zt();try{let $=Fa();r.cid=$&&$!=="N/A"?$:"",r.salesProgram=wi();let ae=hp(Sn());n||(o=ae||Tt()),d.currentLang=o,(!a.cids.length||a.cids.length===1&&!a.cids[0].cid)&&(a.cids=[Object.assign(a.cids[0]||an(),{cid:r.cid})]),i.blocksTouched||(a.active=ei(t,a.seg,Lt("appointmentTime")||"",new Date)),g.getCheckedElements().length||Gr(),gt()}finally{r.capturing=!1,Fe()}}function Gr(){let m=qa("appointmentTasks");if(!m.length||!Da(t,a.seg)){i.tasksAuto=!1,i.tasksOpen=!1;return}let $=Object.entries(Ze).map(([Y,Se])=>[Y,sn(Y),sn(Se.name)]),ae=m.map(Y=>$.find(([,Se,ye])=>sn(Y)===Se||sn(Y)===ye)).filter(Boolean);ae.forEach(([Y])=>g.toggleTask(Y,!0)),i.tasksAuto=ae.length>0&&ae.length===m.length,i.tasksOpen=!i.tasksAuto}function jr(){a.tasks=g.getCheckedElements().map(m=>({key:m.value,name:Ze[m.value]?.name||m.value,count:m.count})),i.tasksAuto=!1,gt(),cn(),St(),Fe()}function cn(){let m=Jn(t,a);d.tagSupportUsed!==m&&d.setTagSupportUsed(m)}function dn(m,$,ae,Y,Se){let ye=I("div",{class:"nt-seg"+(Se?" sm":""),role:"radiogroup","aria-label":m});return $.forEach(([Ce,Ae])=>{let ve=I("button",{type:"button",role:"radio","aria-checked":String(Ce===ae),tabindex:Ce===ae?"0":"-1",onclick:()=>Y(Ce)},Ae);ve.addEventListener("keydown",we=>{if(we.key!=="ArrowRight"&&we.key!=="ArrowLeft")return;we.preventDefault();let Ge=($.findIndex(We=>We[0]===ae)+(we.key==="ArrowRight"?1:$.length-1))%$.length;Y($[Ge][0]),queueMicrotask(()=>{let We=u.querySelector(`[aria-label="${CSS.escape(m)}"] [aria-checked=true]`);We&&We.focus()})}),ye.append(ve)}),ye}function Wa(m,$){let ae=I("div",{class:"nt-fn"},$||"");return ae.dataset.def=$||"",I("div",{class:"nt-cw"},m,ae)}function Ya(m,$){let ae=m.closest(".nt-cw"),Y=ae&&ae.querySelector(":scope>.nt-fn");Y&&(Y.textContent=$||Y.dataset.def||"")}function Hr(m,$){Q.querySelectorAll("tr[data-row]").forEach(ae=>ae.classList.toggle("nt-hl",$&&ae.dataset.row===m))}function Ur(m){let $=[...S.querySelectorAll(".nt-row[data-row]")],ae=$.indexOf(m.closest(".nt-row[data-row]"));for(let Y=ae+1;Y<$.length;Y++){let Se=$[Y].querySelector("input[type=text],textarea");if(Se&&!Se.value.trim()&&!$[Y].querySelector(".nt-na[aria-pressed=true]"))return Se.focus(),!0}return!1}function pn(m,$,ae){let Y=Oe(m.id),Se=Y.na&&m.na!==!1,ye=ke(m,$),Ce=Ao(t,a,m,$)&&!String(Y.v||"").trim()&&!Y.na,Ae=I("div",{class:"nt-row"+(m.type==="long"?" stack":"")+(ae?" pending":""),"data-row":m.id}),ve=[];(Y.auto||Ce)&&ve.push(I("span",{class:"nt-tag",title:X("autoTitle")},xt("check"),X("autoTag"))),Y.defaulted&&ve.push(I("span",{class:"nt-tag",title:X("defaultTitle")},X("defaultTag"))),m.auto==="consent"&&a.europe&&!Se&&ye===null&&ve.push(I("span",{class:"nt-tag warn"},X("europeMark"))),Ae.append(I("label",{class:"nt-rl",for:`nt-f-${m.id}`},k(m),...ve));let we=I("div",{class:"nt-rv"+(m.type==="date"?" date":"")+(m.type==="speakeasy"?" sp":"")+(m.type==="cid"?" cidv":"")+(m.type==="link"?" lk":"")+(m.type==="link"&&on(Y.v)?" ok":"")}),Me=null,Ge=()=>{nn(a,m.id),Ae.querySelectorAll(".nt-tag").forEach(De=>De.remove()),St()},We=De=>{let tt=De==="input"?I("input",{id:`nt-f-${m.id}`,type:"text",autocomplete:"off",spellcheck:"false",placeholder:kp(m)}):I("textarea",{id:`nt-f-${m.id}`,rows:"3",placeholder:X("phText")});return tt.value=Y.v||"",tt.addEventListener("input",()=>{Ge(),Y.v=tt.value,Ae.classList.toggle("bad",Wd(m,tt.value)),m.type==="link"&&we.classList.toggle("ok",on(tt.value)),De==="textarea"&&vp(tt),m.id==="ts_used"&&cn(),Zt()}),De==="input"&&(tt.addEventListener("keydown",Ma=>{Ma.key==="Enter"&&(Ma.preventDefault(),Ur(Ae))}),m.type==="link"&&tt.addEventListener("paste",()=>setTimeout(()=>{on(tt.value)&&Ur(Ae)},0))),m.type==="cid"&&tt.addEventListener("blur",()=>{let Ma=Ir(tt.value);Ma!==tt.value&&(tt.value=Y.v=Ma,Zt())}),tt};if(Se)we.append(I("span",{class:"nt-val muted"},"NA"));else if(Ce)we.append(I("span",{class:"nt-val muted"},"NA"));else if(m.type==="derived"){let De=m.auto==="tasks"?ye?a.tasks.map(tt=>tt.name).join(", "):X("tasksNone"):ye||"\u2014";we.append(I("span",{class:"nt-val"+(ye?"":" empty")},De))}else if(m.type==="yesno")m.auto==="consent"&&!a.europe&&Y.defaulted&&!Y.altOpen?(we.append(I("span",{class:"nt-val"},"Yes")),Me=I("button",{class:"nt-na",type:"button",onclick:()=>{Y.altOpen=!0,Fe()}},X("change"))):we.append(dn(k(m),[["Yes","Yes"],["No","No"]],Y.v,De=>{Ge(),Y.v=De,Y.na=!1,m.id==="ts_used"&&cn(),Fe()},!0));else if(m.type==="long"){let De=We("textarea");we.append(De),queueMicrotask(()=>vp(De))}else we.append(We("input")),m.type==="link"&&we.append(I("span",{class:"nt-ck","aria-hidden":"true"},xt("check"))),m.type==="date"&&m.auto==="followup"&&we.append(I("div",{class:"nt-quick"},[2,3,5].map(De=>I("button",{class:"nt-chip",type:"button",title:X("bdTitle",De),"aria-label":X("bdAria",De),onclick:()=>{Ge(),Y.v=_r(De),Y.na=!1,Fe()}},"+"+De)))),m.type==="speakeasy"&&we.append(I("button",{class:"nt-chip",type:"button",onclick:async()=>{let De=we.querySelector("input");await lo(De),De.value&&De.value.trim()&&(Ge(),Y.v=De.value.trim(),Y.na=!1,Fe(),ne(X("speakeasyFound")))}},X("autoSearch")));Ae.append(we);let _e=m.na!==!1&&m.type!=="derived"||m.type==="derived"&&m.auto==="tasks";if(Me)Ae.append(Me);else{let De=I("div",{class:"nt-acts"});m.type!=="derived"&&De.append(I("button",{class:"nt-cmt"+(Y.comment||Y.commentOpen?" on":" nt-ghost"),type:"button","aria-label":X("commentBtn"),"aria-pressed":String(!!Y.commentOpen),title:Y.comment?X("commentIs",Y.comment):X("commentAdd"),onclick:()=>{Y.commentOpen=!Y.commentOpen,Fe(),Y.commentOpen&&queueMicrotask(()=>{let tt=S.querySelector(`[data-row="${m.id}"] .nt-cmrow input`);tt&&tt.focus()})}},xt(Y.comment?"cmtOn":"cmt"))),_e&&De.append(I("button",{class:"nt-na nt-ghost","aria-pressed":String(Se),type:"button",title:Se?X("naUndo"):X("naMark"),onclick:()=>{Ge(),Y.na=!Y.na,Fe()}},Se?X("undo"):"NA")),Ae.append(De)}if(Y.commentOpen&&m.type!=="derived"){let De=I("input",{type:"text",autocomplete:"off",spellcheck:"false",placeholder:X("phComment"),"aria-label":X("commentOf",k(m))});De.value=Y.comment||"",De.addEventListener("input",()=>{Y.comment=De.value;let tt=Ae.querySelector(".nt-cmt");tt&&tt.replaceChildren(xt(De.value.trim()?"cmtOn":"cmt")),St(),Zt()}),De.addEventListener("blur",()=>{!De.value.trim()&&Y.commentOpen&&(Y.commentOpen=!1,Fe())}),Ae.append(I("div",{class:"nt-cmrow"},De))}return Ae.addEventListener("focusin",()=>{Ya(Ae,W(m)),Hr(m.id,!0)}),Ae.addEventListener("focusout",()=>{Ya(Ae,""),Hr(m.id,!1)}),Ae}function kp(m){return{date:X("phDate"),cid:"XXX-XXX-XXXX",link:X("phLink"),speakeasy:X("phSpeakeasy")}[m.type]||X("phText")}function Tp(m,$,ae,Y,Se){let Ce=va($,ae).filter(_e=>!yt(_e,ae)&&!bp.includes(_e.id)),Ae=Ce.filter(_e=>!da(_e)),ve=Ce.filter(da),we=($.rows||[]).filter(_e=>_e.optIn&&_e.visible!==!1&&!a.optIn.includes(_e.id)&&!(_e.requiredWhen&&So(t,a,_e.requiredWhen))&&So(t,a,_e.when));if(!Ae.length&&!ve.length&&!we.length&&!Se)return null;let Me=I("div",{class:"nt-card"});Se&&Me.append(Se),Ae.forEach(_e=>Me.append(pn(_e,ae,Y(_e.id))));let Ge=ve.length+we.length,We=!!i.more[m];return Ge&&(Me.append(I("button",{class:"nt-more",type:"button","aria-expanded":String(We),onclick:()=>{i.more[m]=!We,Fe()}},I("span",{},We?X("less"):X("more",Ge)),xt("chev"))),We&&(ve.forEach(_e=>Me.append(pn(_e,ae,Y(_e.id)))),we.forEach(_e=>Me.append(I("div",{class:"nt-row add"},I("span"),I("button",{class:"nt-add-btn",type:"button",onclick:()=>{a.optIn.push(_e.id),St(),Fe()}},"+ "+k(_e)),I("span")))))),Wa(Me,"")}function Ip(m,$){let ae=I("div",{class:"nt-card nt-ts"},I("div",{class:"nt-ts-h"},I("b",{},X("tsTitle")),I("span",{},X("tsHelp"))));return m.forEach(([Y,Se])=>ae.append(pn(Y,Se,$(Y.id)))),Wa(ae,"")}function Np(){return Wa(I("div",{class:"nt-card nt-ts-auto"},I("b",{},X("tsTitle")),I("span",{},X("tsAutoNa"))),"")}function Lp(m,$){let ae=i.autoOpen,Y=I("button",{class:"nt-auto-h",type:"button","aria-expanded":String(ae),onclick:()=>{i.autoOpen=!ae,Fe()}},I("span",{class:"nt-ic"},xt("checkc")),X("autoCard"),I("span",{class:"nt-c"},String(m.length),xt("chev"))),Se=I("div",{class:"nt-card"},Y);return ae?m.forEach(([ye,Ce])=>Se.append(pn(ye,Ce,$(ye.id)))):Se.append(I("div",{class:"nt-auto-sum"},m.map(([ye,Ce])=>I("span",{},(bf[ye.id]||k(ye))+" ",I("b",{},ke(ye,Ce)))))),Wa(Se,"")}function _p(m,$){let ae=I("div",{});return ae.append(I("div",{class:"nt-eyebrow"},X("cidDetails"))),a.cids.forEach((Y,Se)=>{let ye=I("div",{class:"nt-card"});m.columns.forEach((Ce,Ae)=>{let ve=`cid:${Se}:${Ce.id}`,we=I("div",{class:"nt-row"+($(ve)?" pending":""),"data-row":ve}),Me=At(Ce.label,o).replace(/:\s*$/,"");we.append(I("label",{class:"nt-rl",for:`nt-c-${Se}-${Ce.id}`},Me+(Ae===0&&a.cids.length>1?` ${Se+1}`:"")));let Ge=I("div",{class:"nt-rv"+(Ce.type==="cid"?" cidv":"")}),We=(_e,De,tt)=>Ge.append(dn(`${Me} ${Se+1}`,_e,De,Ma=>{tt(Ma),St(),Fe()},!0));if(Ce.type==="tbw")We([["TBW","TBW"],["N-TBW","N-TBW"]],Y.tbw,_e=>{Y.tbw=_e});else if(Ce.type==="yn")We([["YES","YES"],["NO","NO"]],Y[Ce.id],_e=>{Y[Ce.id]=_e});else if(Ce.type==="smeyes")We([["YES","YES"],["NO","NO"]],Y.sme||"YES",_e=>{Y.sme=_e});else{let _e=I("input",{id:`nt-c-${Se}-${Ce.id}`,type:"text",autocomplete:"off",spellcheck:"false",placeholder:Ce.type==="cid"?"XXX-XXX-XXXX":Ce.type==="link"?X("phLink"):X("phText")});_e.value=Y[Ce.id]||"",_e.addEventListener("input",()=>{Y[Ce.id]=_e.value,St(),Zt()}),Ce.type==="cid"&&_e.addEventListener("blur",()=>{let De=Ir(_e.value);De!==_e.value&&(_e.value=Y[Ce.id]=De,Zt())}),Ge.append(_e)}we.append(Ge),Ae===0&&a.cids.length>1?we.append(I("button",{class:"nt-na",type:"button","aria-label":X("removeCid",Se+1),onclick:()=>{a.cids.splice(Se,1),St(),Fe()}},xt("close"))):we.append(I("span")),we.addEventListener("focusin",()=>Ya(we,X("cidHint"))),we.addEventListener("focusout",()=>Ya(we,"")),ye.append(we)}),ae.append(Wa(ye,""))}),ae.append(I("div",{class:"nt-sec"},I("button",{class:"nt-chip",type:"button",onclick:()=>{if(a.cids.length>=vf){ne(X("maxCid"));return}a.cids.push(an()),St(),Fe()}},X("addCid")))),ae}function Dp(){let m=ni(a.substatus),$=m?no(m,a.flow):[];if(!$.length)return null;let ae=([Se])=>I("button",{class:$.length>3?"nt-opt":"nt-chip",type:"button",onclick:()=>Mp(Se,m)},io(Se,m));if($.length<=3)return I("div",{class:"nt-row stackc"},I("div",{class:"nt-rl"},X("scenario")),I("div",{class:"nt-chips"},$.map(ae)));let Y=I("button",{class:"nt-chip",type:"button","aria-expanded":String(i.scenOpen),onclick:()=>{i.scenOpen=!i.scenOpen,Fe()}},X("scenarioMenu",$.length),xt("chev"));return I("div",{class:"nt-row stackc"},I("div",{class:"nt-rl"},X("scenario")),I("div",{class:"nt-chips"},Y),i.scenOpen?I("div",{class:"nt-scen-menu"},$.map(ae)):null)}function Mp(m,$){let ae=oo(Mt[m],o,m)||{},Y=new Set(na().map(([we])=>we.id)),Se=Er.find(we=>Y.has(we)),ye=st[o]||st.pt,Ce=(we,Me)=>{let Ge=nn(a,we),We=String(Ge.v||"").trim();We.includes(Me.trim())||(Ge.v=We?`${We}
${Me}`:Me),Ge.na=!1},Ae=[];for(let[we,Me]of Object.entries(ae)){if(!we.startsWith("field-")||typeof Me!="string"||!Me.trim())continue;let Ge=we.slice(6);if(Ge==="SCREENSHOTS"){i.more["extras.0"]=!0;continue}if(["SPEAKEASY_ID","ON_CALL","GTM_GA4_VERIFICADO"].includes(Ge)){let _e={SPEAKEASY_ID:"speakeasy",ON_CALL:"oncall",GTM_GA4_VERIFICADO:"gtm_ga4"}[Ge];/^n\/?a$/i.test(Me.trim())&&Y.has(_e)&&(nn(a,_e).na=!0);continue}if(Ge==="REASON_COMMENTS"&&Y.has("substatus_reason")){Ce("substatus_reason",Me);continue}if(Ge==="DIA"&&Y.has("next_followup")){nn(a,"next_followup").v=Me.trim();continue}let We=String(ye[Ge.toLowerCase()]||Ge).replace(/^[^\p{L}\p{N}]+/u,"").replace(/:\s*$/,"").trim();Ae.push(`**${We}:** ${Me.trim()}`)}Se&&Ae.length&&Ce(Se,Ae.join(`
`));let ve=Mt[m]&&Mt[m].linkedTask;ve&&Da(t,a.seg)&&Ze[ve]&&g.toggleTask(ve,!0),St(),Fe(),ne(X("scenarioApplied"))}function Op(){if(!a.substatus)return X("ctxPick");if(!Hd(a.substatus))return X("ctxOffList");let m=Tr(a.substatus);return typeof m=="number"?X("ctxFuDays",m):m==="na"?X("ctxFuNa"):X("ctxFuAgent")}let un=()=>yd(t.segments.map(m=>m.key));function qp(m,$,ae,Y){if(!rn($.b,void 0,m.key))return Y;let Se=`${m.key}.${$.b}`,ye=oi().ask(ae),Ce=I("button",{class:"nt-q",type:"button","data-q":Se,"aria-expanded":String(i.helpBlock===Se),"aria-controls":"cw-nt-help","aria-label":ye,title:ye,onclick:()=>$p(Se)},"?");return I("span",{class:"nt-chipw"},Y,Ce)}function Rp(m){if(!i.helpBlock)return null;let $=m.blocks.find(Ce=>`${m.key}.${Ce.b}`===i.helpBlock),ae=$&&rn($.b,void 0,m.key);if(!ae)return null;let Y=oi(),Se=At($.title,"en"),ye=(Ce,Ae,ve="")=>Ae?I("div",{class:"nt-help-r"+ve},I("b",{},Ce),I("span",{},Ae)):null;return I("div",{class:"nt-help",id:"cw-nt-help",role:"region","aria-label":Se},I("div",{class:"nt-help-h"},I("b",{},Se),I("button",{class:"nt-help-x",type:"button","aria-label":Y.close,title:Y.close,onclick:Wr},"\xD7")),I("p",{class:"nt-help-w"},ae.what),ye(Y.flow,ae.flow),ye(Y.when,ae.when),ae.statuses&&ae.statuses.length?I("div",{class:"nt-help-g"},Y.statuses):null,...(ae.statuses||[]).map(([Ce,Ae])=>ye(Ce,Ae," s")),ye(Y.tasks,ae.tasks),ye(Y.must,ae.must),ye(Y.ts,ae.ts),ae.na?I("div",{class:"nt-help-n"},ae.na):null,ae.one?I("div",{class:"nt-help-n"},ae.one):null,I("div",{class:"nt-help-a"},I("button",{class:"nt-na",type:"button",onclick:Bp},X("pvOpen"))),I("div",{class:"nt-help-f"},Y.notInNote))}function Fp(){if(!i.helpBlock||!a.substatus)return null;let m=x(),$=m.blocks.find(ae=>`${m.key}.${ae.b}`===i.helpBlock);return!$||!rn($.b,void 0,m.key)?null:{id:$.b,title:At($.title,"en"),ghost:!a.active.includes($.b)}}function zp(m){return!m||!m.ghost?a:{...a,active:x().select==="single"?[m.id]:[...a.active,m.id]}}function Pp(m){if(!m)return;let $=Q.querySelector(`table[data-block="${m.id}"]`);if(!$)return;let ae=oi(),Y=rn(m.id,void 0,x().key);$.classList.add(m.ghost?"nt-pv-ghost":"nt-pv-hl");let Se=I("div",{class:"nt-pv-note",role:"note"},I("b",{},X("pvExplain")),m.ghost?I("span",{},X(x().select==="single"?"pvGhostPhase":"pvGhost")):null,Y.when?I("span",{},I("span",{class:"nt-pv-k"},ae.when+": "),Y.when):null);(Q.querySelector(`[data-block-h="${m.id}"]`)||$).before(Se),i.helpScroll&&(i.helpScroll=!1,requestAnimationFrame(()=>{let ye=Q.parentElement,Ce=Se.getBoundingClientRect().top-ye.getBoundingClientRect().top+ye.scrollTop-12,Ae=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;ye.scrollTo({top:Math.max(0,Ce),behavior:Ae?"auto":"smooth"})}))}function Vr(m){let $=ee.querySelector(`[data-q="${m}"]`);$&&$.focus()}function $p(m){let $=i.helpBlock!==m;i.helpBlock=$?m:null,$&&(i.helpScroll=!0,!i.drawer&&Yr()&&Ka(!0)),ii(),Zt(),Vr(m)}function Bp(){i.helpScroll=!0,Ka(!0),Zt()}function Wr(){let m=i.helpBlock;m&&(i.helpBlock=null,ii(),Zt(),Vr(m))}function ii(){ee.innerHTML="";let m=x(),$=I("div",{class:"nt-card ctx"}),ae=I("button",{class:"nt-pick",type:"button","aria-haspopup":"listbox","aria-expanded":String(i.pick),onclick:Ae=>{Ae.stopPropagation(),i.pick?xa():jp(ae)}},I("span",{class:"nt-rl"},X("substatus")),I("span",{class:"nt-v"+(a.substatus?"":" empty")},a.substatus||X("choose")),xt("chev"));if(ae.dataset.role="substatus",$.append(ae),Da(t,a.seg)){let Ae=a.tasks.map(We=>hf[We.key]||We.name),ve=I("div",{class:"nt-row chiprow","data-ctx":"tasks"},I("span",{class:"nt-rl"},X("tasks"))),we=a.tasks.length?I("span",{class:"nt-tasks-sum"},Ae.join(", ")):I("span",{class:"nt-val empty"},X("tasksNone")),Me=i.tasksAuto&&!i.tasksOpen?I("span",{class:"nt-tag",title:X("autoTitle")},xt("check"),X("autoTag")):null,Ge=i.tasksOpen?X("tasksClose"):a.tasks.length?X("change"):X("choose");ve.append(I("div",{class:"nt-rv"},we,Me),I("button",{class:"nt-na",type:"button","aria-expanded":String(i.tasksOpen),onclick:()=>{i.tasksOpen=!i.tasksOpen,Fe()}},Ge)),$.append(ve),i.tasksOpen&&$.append(N)}let Y=m.blocks.filter(Ae=>!(m.select==="multi"&&(m.always||[]).includes(Ae.b))).map(Ae=>{let ve=a.active.includes(Ae.b),we=Yd(t,a,Ae)&&!ve,Me=ff[`${m.key}.${Ae.b}`]||At(Ae.title,"en"),Ge=I("button",{class:"nt-chip",type:"button","aria-pressed":String(ve),title:(Ae.when||"")+(we?X("suggested"):""),onclick:()=>{i.blocksTouched=!0,m.select==="single"?a.active=[Ae.b]:a.active=ve?a.active.filter(We=>We!==Ae.b):[...a.active,Ae.b],St(),Fe()}},Me,we?I("span",{class:"nt-dot","aria-hidden":"true"}):null);return qp(m,Ae,Me,Ge)});$.append(I("div",{class:"nt-row chiprow","data-ctx":"blocks"},I("span",{class:"nt-rl"},m.select==="multi"?X("blocks"):X("phase")),I("div",{class:"nt-chips"},Y),I("span")));let Se=Rp(m);Se&&$.append(Se);let ye=[o.toUpperCase(),a.flow.toUpperCase(),a.europe?X("inEurope"):X("outEurope")].join(" \xB7 "),Ce=I("button",{class:"nt-pick",type:"button","aria-expanded":String(i.ctxOpen),onclick:()=>{i.ctxOpen=!i.ctxOpen,Fe()}},I("span",{class:"nt-rl"},X("note")),I("span",{class:"nt-v"+(a.europe?" warn":"")},a.seg!==un()?I("b",{class:"nt-segtag"},m.name):null,ye),xt("chev"));if(Ce.dataset.role="note",Ce.addEventListener("focusin",()=>Ya(Ce,X("noteFocus"))),Ce.addEventListener("focusout",()=>Ya(Ce,"")),$.append(Ce),i.ctxOpen){let Ae=(ve,we,Me,Ge)=>I("div",{class:"nt-row"},I("span",{class:"nt-rl"},ve),I("div",{class:"nt-rv"},dn(ve,we,Me,Ge,!0)),I("span"));$.append(I("div",{class:"nt-row"},I("span",{class:"nt-rl"},X("type")),I("div",{class:"nt-rv"},dn(X("typeLabel"),t.segments.map(ve=>[ve.key,ve.name]),a.seg,ve=>Gp(ve),!0),I("div",{class:"nt-cap2"},X("salesHint"),I("span",{},r.salesProgram||"\u2014"))),I("span"))),$.append(Ae(X("lang"),[["pt","PT"],["es","ES"],["en","EN"]],o,ve=>{o=ve,n=!0,d.setLanguage(ve),St(),Fe()})),$.append(Ae(X("flow"),[["bau","BAU"],["lm","LM"]],a.flow,ve=>{a.flow=ve,gt(),St(),Fe()})),$.append(I("div",{class:"nt-row"},I("span",{class:"nt-rl"},X("europe")),I("span",{class:"nt-val muted",style:"font-size:12px;line-height:16px"},X("europeHint")),I("button",{class:"nt-sw",type:"button",role:"switch","aria-checked":String(a.europe),"aria-label":X("europeLabel"),onclick:()=>{a.europe=!a.europe,gt(),St(),Fe()}})))}ee.append(Wa($,Op()))}function Gp(m){a.seg!==m&&(a.seg=m,a.active=ei(t,m,Lt("appointmentTime")||"",new Date),Sd(m),gt(),cn(),St(),Fe())}let Xa=null;function xa(){Xa&&Xa.remove(),Xa=null,i.pick=!1;let m=ee.querySelector('[data-role="substatus"]');m&&m.setAttribute("aria-expanded","false")}function jp(m){xa(),i.pick=!0;let $=m.getBoundingClientRect().bottom-j.getBoundingClientRect().top+4;Xa=I("div",{class:"nt-pop",role:"dialog","aria-label":X("pickLabel"),style:`top:${$}px`});let ae=I("input",{type:"text",placeholder:X("searchPh"),autocomplete:"off","aria-label":X("searchLabel")}),Y=I("div",{class:"nt-pop-l",role:"listbox"});Y.style.maxHeight=Math.max(160,j.clientHeight-$-72)+"px",Xa.append(I("div",{class:"nt-pop-s"},xt("search"),ae),Y);let Se=ve=>ra[ni(ve)]||"",ye=ve=>{a.substatus=ve,xa(),gt(),St(),Fe();let we=ee.querySelector('[data-role="substatus"]');we&&we.focus()},Ce=ve=>I("button",{class:"nt-opt"+(ve===a.substatus?" on":""),type:"button",role:"option","aria-selected":String(ve===a.substatus),onclick:()=>ye(ve)},I("span",{},ve),ve===a.substatus?I("span",{class:"nt-ck"},xt("check")):I("span",{class:"nt-hk"},Se(ve))),Ae=ve=>{Y.innerHTML="";let we=ve.trim().toLowerCase(),Me=!1;for(let[Ge,We]of mf){let _e=We.filter(De=>!we||De.toLowerCase().includes(we)||Se(De).toLowerCase().includes(we));_e.length&&(Me=!0,Y.append(I("div",{class:"nt-pop-g"},Ge)),_e.forEach(De=>Y.append(Ce(De))))}we&&!Me&&Y.append(I("div",{class:"nt-pop-g"},X("noResult")),I("button",{class:"nt-opt",type:"button",onclick:()=>ye(ve.trim())},I("span",{},X("useTyped",ve.trim())),I("span",{class:"nt-hk"},X("useHint"))))};ae.addEventListener("input",()=>Ae(ae.value)),ae.addEventListener("keydown",ve=>{if(ve.key==="Escape"&&(ve.stopPropagation(),xa(),m.focus()),ve.key==="Enter"){ve.preventDefault();let we=Y.querySelector(".nt-opt");we&&we.click()}if(ve.key==="ArrowDown"){ve.preventDefault();let we=Y.querySelector(".nt-opt");we&&we.focus()}}),Y.addEventListener("keydown",ve=>{let we=[...Y.querySelectorAll(".nt-opt")],Me=we.indexOf(document.activeElement);ve.key==="ArrowDown"&&(ve.preventDefault(),we[Math.min(we.length-1,Me+1)].focus()),ve.key==="ArrowUp"&&(ve.preventDefault(),Me<=0?ae.focus():we[Me-1].focus()),ve.key==="Escape"&&(ve.stopPropagation(),xa(),m.focus())}),Ae(""),j.append(Xa),m.setAttribute("aria-expanded","true"),ae.focus()}u.addEventListener("mousedown",m=>{i.pick&&!m.target.closest(".nt-pop")&&!m.target.closest('[data-role="substatus"]')&&xa()});function Hp(){if(S.innerHTML="",!a.substatus){S.append(I("div",{class:"nt-empty-s"},I("b",{},X("emptyTitle")),X("emptySub"))),p.remove();return}let m=new Set(pa().map(ye=>ye.key)),$=ye=>i.showPending&&m.has(ye),ae=na().filter(([ye])=>bp.includes(ye.id));ae.length?S.append(Ip(ae,$)):na().some(([ye])=>ye.id==="ts_used_na")&&S.append(Np());let Y=[],Se=new Set;na().forEach(([ye,Ce])=>{yt(ye,Ce)&&!Se.has(ye.id)&&(Se.add(ye.id),Y.push([ye,Ce]))}),Y.length&&S.append(Lp(Y,$));for(let ye of ca(t,a)){let Ce=t.blocks[ye.b],Ae=ye.b===ja,ve=[];Ce.sections.forEach((we,Me)=>{if(we.kind==="cid"){ve.push(_p(we,$));return}let Ge=`${ye.b}.${Me}`,We=!Ae&&va(we,ye.b).some(De=>Er.includes(De.id))?Dp():null,_e=Tp(Ge,we,ye.b,$,We);_e&&(Me>0&&ve.push(I("div",{class:"nt-sub-h"},U(we.title))),ve.push(_e))}),Ae&&Da(t,a.seg)&&ve.push(I("div",{class:"nt-sub-h"},X("prints")),p),ve.length&&S.append(I("div",{class:"nt-eyebrow"},gf[ye.b]||At(ye.title,"en")),...ve)}M()}function Zt(){let $=pa().length,ae=!$&&!!a.substatus&&ca(t,a).length>0,Y=Fp();Q.innerHTML=qr(t,zp(Y),{...Ie(),live:!0,pendingLabel:X("pendingCell")})||"",Pp(Y),F.textContent=r.capturing?X("capturing"):ae?X("ready"):X("pending",$||(a.substatus?0:1)),Z.classList.toggle("ready",ae),ce.classList.toggle("blocked",!ae||r.capturing),ue.classList.toggle("blocked",!ae||r.capturing),T.className="nt-bd"+(ae?" ok":""),T.replaceChildren(ae?xt("check"):document.createTextNode(String($))),ie.className="nt-pill"+(ae?" ok":""),ie.textContent=ae?X("readyPill"):X("pending",$),H.setAttribute("aria-label",X("tabAria",ae?0:$)),R.replaceChildren(),[...a.seg!==un()?[x().name]:[],a.flow.toUpperCase(),o.toUpperCase(),a.substatus||X("noSubstatus")].forEach((ye,Ce)=>{Ce&&R.append(I("i",{},"\xB7")),R.append(ye)}),R.append(xt("up")),$||(i.showPending=!1),re.classList.toggle("on",i.showPending&&$>0),O.textContent=X("pending",$);let Se=ra[ni(a.substatus)];E.hidden=!Se,ri()}function ri(){R.classList.toggle("on",D.scrollTop>w.offsetTop-8&&!re.classList.contains("on"))}function Up(){let m=A.querySelector("span");m&&(m.textContent=X("title")),b.setAttribute("aria-label",X("title"));let $=u.querySelector(".cw-help-description");$&&($.textContent=X("help"));let ae=u.querySelector(".cw-help-title");ae&&(ae.textContent=X("title")),C.title=X("split"),C.setAttribute("aria-label",X("split")),z.title=X("drafts"),z.setAttribute("aria-label",X("drafts")),R.setAttribute("aria-label",X("stickyAria")),de.textContent=X("next"),te.textContent=X("markRest"),fe.textContent=X("clear"),he.textContent=X("save"),ue.textContent=X("copy"),ce.textContent=X("fill"),xe.textContent=X("emailAuto"),P.textContent=X("preview")}function Fe(){let m=D.scrollTop;xa(),t=zr(),a.taskPrints=a.taskPrints||[],Up(),ii(),Hp(),Zt(),To(),D.scrollTop=m,ri()}let Yr=()=>u.getBoundingClientRect().left>=552;function Ka(m){i.drawer=m,v.classList.toggle("over",m&&!Yr()),v.classList.toggle("open",m),H.setAttribute("aria-expanded",String(m)),m?pe.removeAttribute("inert"):pe.setAttribute("inert","")}function si(m){let $=S.querySelector(`[data-row="${CSS.escape(m)}"]`);if($||(i.autoOpen=!0,ca(t,a).forEach(Y=>t.blocks[Y.b].sections.forEach((Se,ye)=>{i.more[`${Y.b}.${ye}`]=!0})),Fe(),$=S.querySelector(`[data-row="${CSS.escape(m)}"]`)),!$)return;$.scrollIntoView({block:"center",behavior:"smooth"});let ae=$.querySelector("input,textarea,button");ae&&ae.focus({preventScroll:!0})}function Xr(){i.showPending=!0,i.pi=0,Fe();let m=pa()[0];m&&si(m.key)}function Vp(){let m=pa().map($=>$.key);m.length&&(i.pi=(i.pi+1)%m.length,si(m[i.pi]))}function Kr(){return a.substatus?r.capturing?!1:pa().length||!ca(t,a).length?(y.playError(),Xr(),!1):!0:(y.playError(),ne(X("needSubstatus"),{error:!0}),!1)}let Qr=()=>qr(t,a,Ie());function Wp(){Kr()&&(ea(Qr()),y.playClick(),ne(X("copied")))}async function Yp(){if(!Kr())return;let m=Qr(),$=ra[ni(a.substatus)];ea(m),Io();let ae=Ba();try{let Y=await ka();Y?(Y.focus(),document.execCommand("insertHTML",!1,m),Ea(Y),l&&$&&await go($),ne(X("inserted")),y.playSuccess(),_n(),ln(),aa.clearEmergency(),Fe()):(y.playError(),ne(X("notOpened"),{error:!0}),Io())}finally{ae()}}function Xp(){ln(),aa.clearEmergency(),Fe(),ne(X("cleared"))}function Kp(){if(!a.substatus){y.playError(),ne(X("needSubstatus"),{error:!0});return}aa.save($r()),ln(),aa.clearEmergency(),Fe(),ne(X("draftSaved"))}function Qp(){let m=Qd(t,a,Ie());St(),Fe(),ne(m?X("marked",m):X("nothingNa"))}function To(){let m=aa.getAll();if(z.querySelector(".nt-hcount")?.remove(),m.length&&z.append(I("span",{class:"nt-hcount","aria-hidden":"true"})),q.hidden=!i.draftsOpen,!!i.draftsOpen){if(q.replaceChildren(),!m.length){q.append(I("div",{class:"nt-empty-s"},X("draftsEmpty")));return}m.forEach($=>{let ae=new Date($.timestamp).toLocaleString();q.append(I("div",{class:"nt-opt",role:"button",tabindex:"0","data-draft":$.id,onclick:Y=>{Y.target.closest(".nt-na")||(Br($),aa.delete($.id),i.draftsOpen=!1,To(),ne(X("draftOpened")))}},I("span",{},`${$.subStatus} \xB7 ${ae}`),I("button",{class:"nt-na",type:"button",onclick:()=>{aa.delete($.id),To()}},X("draftDelete"))))})}}function Jr(){i.split=!i.split,u.classList.toggle("nt-split-on",i.split),L.googleLine&&(L.googleLine.style.background=i.split?"linear-gradient(to right, #8e24aa, #7b1fa2)":"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)")}H.addEventListener("click",()=>Ka(!i.drawer)),R.addEventListener("click",()=>D.scrollTo({top:0,behavior:"smooth"})),D.addEventListener("scroll",ri,{passive:!0}),de.addEventListener("click",Vp),te.addEventListener("click",Qp),Z.addEventListener("click",()=>{pa().length?Xr():ne(X("nothingPending"))}),fe.addEventListener("click",Xp),he.addEventListener("click",Kp),ue.addEventListener("click",Wp),ce.addEventListener("click",Yp),Q.addEventListener("click",m=>{let $=m.target.closest("tr[data-row]");$&&!$.closest(".nt-pv-ghost")&&si($.dataset.row)}),u.addEventListener("keydown",m=>{if(m.key==="Escape"){if(i.pick){m.stopPropagation(),xa();return}if(i.draftsOpen){m.stopPropagation(),i.draftsOpen=!1,To();return}if(i.drawer&&v.classList.contains("over")){m.stopPropagation(),Ka(!1);return}if(i.helpBlock){m.stopPropagation(),Wr();return}i.drawer&&(m.stopPropagation(),Ka(!1))}});async function Io(){if(s=!ht(u),s?Qe():Je(),dt(s,u,pf),!s){Ka(!1);return}if(Fe(),await Ep(),!r.restoredChecked){r.restoredChecked=!0;let m=aa.getEmergency();m&&!a.substatus&&(await ot(X("restoreConfirm"))?(Br(m),ne(X("restored"))):aa.clearEmergency())}}return je(()=>{g.setLanguage&&g.setLanguage(c),Fe()}),wa(m=>{!n&&!hp(Sn())&&(o=m,d.setLanguage(m),Fe())}),co(()=>{g.refreshCatalog(),jr()}),lp(()=>Fe()),a.seg=un(),a.flow=en(),a.active=Lr(t,a.seg),a.cids=[an("")],gt(),Fe(),Io.isOpen=()=>s,Io}var Et={notes:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',precall:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-9v2h9V7zm0 8h-9v2h9v-2zM5.54 11L2 7.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L5.54 11zm0 8L2 15.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L5.54 19z"/></svg>',email:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',library:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',timezone:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',configs:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>',broadcast:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',enter:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>',arrowDown:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',arrowUp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>',bolt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>',notetable:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9z"/></svg>'};function wf(){if(document.getElementById("cw-palette-styles"))return;let e=document.createElement("style");e.id="cw-palette-styles",e.textContent=`
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
    `,document.head.appendChild(e)}var wp={pt:{ariaLabel:"Busca r\xE1pida",placeholder:"Buscar um m\xF3dulo...",empty:"Nada encontrado.",navigate:"navegar",select:"selecionar",close:"esc fechar",groupShortcuts:"Meus atalhos",groupModules:"M\xF3dulos"},en:{ariaLabel:"Quick search",placeholder:"Search for a module...",empty:"Nothing found.",navigate:"navigate",select:"select",close:"esc to close",groupShortcuts:"My shortcuts",groupModules:"Modules"},es:{ariaLabel:"B\xFAsqueda r\xE1pida",placeholder:"Buscar un m\xF3dulo...",empty:"No se encontr\xF3 nada.",navigate:"navegar",select:"seleccionar",close:"esc cerrar",groupShortcuts:"Mis atajos",groupModules:"M\xF3dulos"}};function Jt(e){let t=ge();return wp[t]?.[e]??wp.pt[e]}var yp=e=>typeof e=="string"?e:e[ge()]||e.pt,Sp=e=>typeof e=="string"?e:Object.values(e).join(" ");function Cp(e){wf();function t(w){return w.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function a(){return typeof e.toggleNotes!="function"||typeof e.toggleNotes.openWithPreset!="function"?[]:ct.list().map(w=>({id:`shortcut-${w.id}`,label:w.label,hint:{pt:"Atalho de nota \xB7 abre pr\xE9-preenchida",es:"Atajo de nota \xB7 abre precompletada",en:"Note shortcut \xB7 opens pre-filled"},keywords:`nota atalho atajo note shortcut preset ${w.alias||""}`,icon:Et.bolt,group:"shortcuts",isPreset:!0,run:()=>{ct.registerUse(w.id),e.toggleNotes.openWithPreset(w)}}))}let o=[{id:"notes",label:"Case Notes",hint:{pt:"Montar a nota t\xE9cnica do caso",es:"Armar la nota t\xE9cnica del caso",en:"Build the technical note for the case"},keywords:"notas nota caso anotacoes anotaciones notes case",icon:Et.notes,run:e.toggleNotes},{id:"precall",label:"Pre-call Checklist",hint:{pt:"Checklist antes da liga\xE7\xE3o, direto na nota",es:"Checklist antes de la llamada, directo en la nota",en:"Checklist before the call, straight into the note"},keywords:"precall pre call checklist ligacao llamada verificacao verificacion",icon:Et.precall,run:e.togglePrecall},{id:"bauform",label:"BAU Form",hint:{pt:"Solicita\xE7\xE3o de cria\xE7\xE3o/descarte BAU",es:"Solicitud de creaci\xF3n/descarte BAU",en:"Request to create/discard a BAU case"},keywords:"bau formulario solicitacao solicitud criacao creacion descarte form request create discard",icon:Et.bauform,run:e.toggleBAUForm},{id:"email",label:"Email Assistant",hint:{pt:"Templates inteligentes de e-mail",es:"Plantillas inteligentes de correo",en:"Smart email templates"},keywords:"email e-mail correio correo template plantilla",icon:Et.email,run:e.toggleEmail},{id:"script",label:"Call Script",hint:{pt:"Guia interativo de chamada",es:"Gu\xEDa interactiva de llamada",en:"Interactive call guide"},keywords:"script roteiro guion chamada llamada ligacao call",icon:Et.script,run:e.toggleScript},{id:"links",label:{pt:"Central de Links",es:"Central de Enlaces",en:"Links Central"},hint:{pt:"Ferramentas, SOPs e atalhos",es:"Herramientas, SOPs y atajos",en:"Tools, SOPs and shortcuts"},keywords:"links enlaces atalhos atajos ferramentas herramientas tools shortcuts sop sops",icon:Et.links,run:e.toggleLinks},{id:"library",label:{pt:"Minha Biblioteca",es:"Mi Biblioteca",en:"My Library"},hint:{pt:"Snippets e respostas salvas",es:"Snippets y respuestas guardadas",en:"Saved snippets and replies"},keywords:"biblioteca library snippets respostas respuestas replies salvas guardadas saved",icon:Et.library,run:e.toggleLibrary},{id:"timezone",label:{pt:"Fusos Hor\xE1rios",es:"Husos Horarios",en:"Time Zones"},hint:{pt:"Monitoramento e planejador de chamada",es:"Monitoreo y planificador de llamada",en:"Monitoring and call planner"},keywords:"fuso horario husos timezone time zone clock",icon:Et.timezone,run:e.toggleTimezone},{id:"broadcast",label:{pt:"Avisos",es:"Avisos",en:"Broadcast"},hint:{pt:"Comunicados e disponibilidade BAU",es:"Comunicados y disponibilidad BAU",en:"Announcements and BAU availability"},keywords:"avisos broadcast comunicados announcements notices disponibilidade disponibilidad availability",icon:Et.broadcast,run:()=>e.broadcastControl&&e.broadcastControl.toggle()},{id:"configs",label:{pt:"Configura\xE7\xF5es",es:"Configuraci\xF3n",en:"Settings"},hint:{pt:"Perfil, som e prefer\xEAncias",es:"Perfil, sonido y preferencias",en:"Profile, sound and preferences"},keywords:"configuracoes configuracion config settings preferencias preferences perfil profile som sonido sound",icon:Et.configs,run:e.toggleConfigs},{id:"notetable",label:{pt:"Nota em tabela",es:"Nota en tabla",en:"Table note"},hint:{pt:"Nota do caso nas tabelas do padr\xE3o novo (ALL TASKS, ECL)",es:"Nota del caso en las tablas del est\xE1ndar nuevo (ALL TASKS, ECL)",en:"Case note as the new standard's tables (ALL TASKS, ECL)"},keywords:"nota tabela tabla table note ecl sbs sbse mms all tasks padrao estandar standard",icon:Et.notetable,run:e.toggleNoteTable}].map(w=>({...w,group:"modules"}));function n(){return[...a(),...o].filter(w=>typeof w.run=="function").map(w=>({...w,_haystack:t(`${Sp(w.label)} ${Sp(w.hint)} ${w.keywords}`)}))}let i=".cw-dialog-overlay, .cw-wiz-overlay, .cw-ob-lang-overlay, .cw-processing-card",r=!1,s=0,l=n(),d=l,c=[],g=null,u=null,b=document.createElement("div");b.className="cw-palette-overlay",b.setAttribute("role","dialog"),b.setAttribute("aria-modal","true"),b.setAttribute("aria-label",Jt("ariaLabel"));let L=document.createElement("div");L.className="cw-palette",L.innerHTML=`
        <div class="cw-palette-search">
            <span class="cw-palette-search-icon">${Et.search}</span>
            <input type="text" class="cw-palette-input" placeholder="${Jt("placeholder")}" autocomplete="off" spellcheck="false">
        </div>
        <div class="cw-palette-list"></div>
        <div class="cw-palette-footer">
            <span class="js-cp-navigate">${Et.arrowDown}${Et.arrowUp} ${Jt("navigate")}</span>
            <span class="js-cp-select">${Et.enter} ${Jt("select")}</span>
            <span class="js-cp-close">${Jt("close")}</span>
        </div>
    `,b.appendChild(L),b.onmousedown=w=>{w.target===b&&re()};let A=L.querySelector(".cw-palette-input"),C=L.querySelector(".cw-palette-list");L.addEventListener("mousedown",w=>{w.target!==A&&w.preventDefault()});function z(w,{scroll:S=!1}={}){s=w,c.forEach((D,j)=>D.classList.toggle("selected",j===w)),S&&c[w]&&c[w].scrollIntoView({block:"nearest"})}function G(w){d.length&&z(Ht(s+w,0,d.length-1),{scroll:!0})}function R(){if(C.innerHTML="",c=[],d.length===0){C.innerHTML=`<div class="cw-palette-empty">${Jt("empty")}</div>`;return}let w=null;d.forEach((S,D)=>{if(S.group!==w){w=S.group;let F=document.createElement("div");F.className="cw-palette-group",F.textContent=Jt(S.group==="shortcuts"?"groupShortcuts":"groupModules"),F.setAttribute("aria-hidden","true"),C.appendChild(F)}let j=document.createElement("div");j.className="cw-palette-item",j.dataset.idx=D,j.innerHTML=`
                <span class="cw-palette-item-icon${S.isPreset?" cw-palette-item-icon--preset":""}">${S.icon}</span>
                <span class="cw-palette-item-text">
                    <span class="cw-palette-item-label"></span>
                    <span class="cw-palette-item-hint"></span>
                </span>
            `,j.querySelector(".cw-palette-item-label").textContent=yp(S.label),j.querySelector(".cw-palette-item-hint").textContent=yp(S.hint),C.appendChild(j),c.push(j)}),z(s,{scroll:!0})}let O={x:-1,y:-1};C.addEventListener("mousemove",w=>{if(w.clientX===O.x&&w.clientY===O.y)return;O={x:w.clientX,y:w.clientY};let S=w.target.closest(".cw-palette-item");S&&z(Number(S.dataset.idx))}),C.addEventListener("click",w=>{let S=w.target.closest(".cw-palette-item");S&&de(Number(S.dataset.idx))});function de(w){if(!r)return;let S=d[w];S&&(y.playClick(),re({restoreFocus:!1}),S.run())}function te(){r||(clearTimeout(g),r=!0,u=document.activeElement,l=n(),d=l,s=0,A.value="",R(),Qe(),document.body.appendChild(b),y.playGenieOpen(),requestAnimationFrame(()=>{r&&(b.classList.add("active"),A.focus())}))}function re({restoreFocus:w=!0}={}){if(r){if(r=!1,Je(),b.classList.remove("active"),g=setTimeout(()=>b.remove(),200),w&&u&&document.contains(u))try{u.focus({preventScroll:!0})}catch{}u=null}}function ee(){r?re():te()}return A.addEventListener("input",()=>{let w=t(A.value.trim());d=w?l.filter(S=>S._haystack.includes(w)):l,s=0,R()}),b.addEventListener("keydown",w=>{w.key==="ArrowDown"||w.key==="ArrowUp"||w.key==="Tab"?(w.preventDefault(),G(w.key==="ArrowUp"||w.key==="Tab"&&w.shiftKey?-1:1)):w.key==="Enter"?(w.preventDefault(),de(s)):w.key==="Escape"&&(w.preventDefault(),w.stopPropagation(),re())}),document.addEventListener("keydown",w=>{!(w.metaKey||w.ctrlKey)||w.altKey||w.shiftKey||typeof w.key!="string"||w.key.toLowerCase()!=="k"||(w.preventDefault(),!w.repeat&&(!r&&document.querySelector(i)||ee()))},!0),je(()=>{b.setAttribute("aria-label",Jt("ariaLabel")),A.placeholder=Jt("placeholder");let w=L.querySelector(".js-cp-navigate");w&&(w.innerHTML=`${Et.arrowDown}${Et.arrowUp} ${Jt("navigate")}`);let S=L.querySelector(".js-cp-select");S&&(S.innerHTML=`${Et.enter} ${Jt("select")}`);let D=L.querySelector(".js-cp-close");D&&(D.textContent=Jt("close")),R()}),{open:te,close:re,toggle:ee}}var Ap={pt:"Erro cr\xEDtico ao iniciar o Case Wizard.",es:"Error cr\xEDtico al iniciar Case Wizard.",en:"Critical error starting Case Wizard."};function yf(){if(window.techSolInitialized){ki();return}window.techSolInitialized=!0;let e="v6.6.0";console.log(`\u{1F680} TechSol Suite Initializing (${e})...`);try{Ls();try{y.initGlobalListeners()}catch(L){console.warn("\xC1udio bloqueado:",L)}Te.fetchContentModules(["tips","broadcast","bau_availability","links","call_script","email_template","note_template","task_screenshots","link_categories","link_highlights","note_blocks","note_layouts"]);let t=ki(),a=Hl(),o=nc(),n=dc(),i=vc(),r=zc(),s=md(),l=bd(),d=Ad(),c=Od(),g=xp(),u=Wc(),b={toggleNotes:a,togglePrecall:o,toggleEmail:n,toggleScript:i,toggleLinks:r,toggleTimezone:s,toggleLibrary:l,toggleConfigs:d,toggleBAUForm:c,toggleNoteTable:g,broadcastControl:u};fl(b,t),Cp(b),setTimeout(()=>{Te.logEvent("App","Start","Session Start");let L=it();Xe.sync().then(()=>sa.refresh()),(L?Za(L.split("@")[0]).then(C=>{C&&(os(C),Cs(C))}).catch(C=>console.warn("N\xE3o foi poss\xEDvel resolver o idioma do perfil:",C)):Promise.resolve()).finally(()=>{let C=Promise.resolve().then(()=>ed()),z=new Promise(G=>{setTimeout(()=>G(ad(e)),500)});Promise.allSettled([t,C,z]).then(()=>setTimeout(rd,1200))})},2500)}catch(t){console.error("Erro fatal na inicializa\xE7\xE3o:",t),y.playError(),ne(Ap[ge()]||Ap.pt,{error:!0})}}yf();})();
