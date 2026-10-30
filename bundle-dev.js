(()=>{var wl="cw_ui_lang",Sl="cw_output_lang",jn="cw_profile_lang",Ba=["pt","es","en"];var Al={"PT-BR":"pt",PT:"pt",ES:"es",EN:"en"};var Bn={pt:"pt-BR",es:"es-ES",en:"en-GB"};function Ut(e=se()){return Bn[e]||Bn.pt}function Ga(e=se()){return e==="en"?"short":"2-digit"}function Gn(e){try{let t=typeof localStorage<"u"?localStorage.getItem(e):null;return Ba.includes(t)?t:null}catch{return null}}function Cl(e){return Ba.includes(e)}function Hn(e,t){let a=Gn(e),o=a||Gn(jn)||"pt",i=new Set;return{get:()=>o,hasManualOverride:()=>!!a,set(n,{persist:r=!0}={}){if(!(!Cl(n)||n===o)&&!(!r&&a)){if(o=n,r){a=n;try{typeof localStorage<"u"&&localStorage.setItem(e,n)}catch{}}i.forEach(s=>{try{s(o)}catch(l){console.warn(`i18n listener (${t}) falhou:`,l)}})}},onChange(n){return i.add(n),()=>i.delete(n)}}}var Lo=Hn(wl,"interface"),Io=Hn(Sl,"sa\xEDda");function se(){return Lo.get()}function ha(e,t){Lo.set(e,t)}function Le(e){return Lo.onChange(e)}function ct(){return Io.get()}function No(e,t){Io.set(e,t)}function Qt(e){return Io.onChange(e)}function Un(e){let t=String(e?.defaultLanguage||"").toUpperCase(),a=Al[t];if(a){try{typeof localStorage<"u"&&localStorage.setItem(jn,a)}catch{}ha(a,{persist:!1}),No(a,{persist:!1})}}function Zt(e){return function(a){return e[se()]?.[a]??e.pt?.[a]??a}}var Vn={production:"AKfycbxkheuq28ENsHMZMH8t9-u4EIrktHC6cBi-87boDre0jJfl1lnSCPBzaEkw6hy3Cx6fAg",development:"AKfycbyUtczRMulDAyO_1ku39Rb01zarPMw1JvO7aNOdJPYeAgCC7G9mmb-P_EuXP6kvo8l2LA"},ja="development",El=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",Wn=Vn[ja]||Vn.development,qo=El?"dev":"exec",kl=`https://script.google.com/a/macros/google.com/s/${Wn}/${qo}`,Yn=Wn.slice(-6);function ea(){return{env:ja,isDev:ja!=="production",endpoint:qo,fingerprint:Yn}}console.log(`[Case Wizard] backend: ${ja}/${qo} \xB7 implanta\xE7\xE3o \u2026${Yn}`);var Tl="cw_data_broadcast",Ll="cw_data_tips",_o="cw_content_",Oo=new Set,Il=["Processando...","Mantenha o foco!","Aguarde..."];function Nl(e={}){return Object.keys(e).filter(t=>e[t]!==null&&e[t]!==void 0).map(t=>encodeURIComponent(t)+"="+encodeURIComponent(e[t])).join("&")}var Mo={pt:{TIMEOUT:"Timeout: A API demorou muito para responder. (Apps Script bloqueado ou erro 500)",CONNECTION:"Erro de conex\xE3o JSONP.",BAU_SEND_FAILED:"Falha na opera\xE7\xE3o BAU",BAU_READ_FAILED:"Erro retornado pela API de leitura",BAU_UPDATE_FAILED:"Falha na atualiza\xE7\xE3o BAU",BAU_NOT_OWNER_EDIT:"Acesso negado. Voc\xEA s\xF3 pode editar seus pr\xF3prios casos.",BAU_NOT_OWNER_DELETE:"Acesso negado. Voc\xEA n\xE3o \xE9 o dono deste caso.",BAU_ALREADY_PROCESSED:"Este caso j\xE1 foi processado pelo TL e n\xE3o pode mais ser alterado.",BAU_NOT_FOUND:"Caso n\xE3o encontrado.",AGENT_EMAIL_REQUIRED:"Email do agente \xE9 obrigat\xF3rio."},es:{TIMEOUT:"Tiempo agotado: la API tard\xF3 demasiado en responder. (Apps Script bloqueado o error 500)",CONNECTION:"Error de conexi\xF3n JSONP.",BAU_SEND_FAILED:"Fall\xF3 la operaci\xF3n BAU",BAU_READ_FAILED:"Error devuelto por la API de lectura",BAU_UPDATE_FAILED:"Fall\xF3 la actualizaci\xF3n BAU",BAU_NOT_OWNER_EDIT:"Acceso denegado. Solo puedes editar tus propios casos.",BAU_NOT_OWNER_DELETE:"Acceso denegado. No eres el due\xF1o de este caso.",BAU_ALREADY_PROCESSED:"Este caso ya fue procesado por el TL y no se puede modificar.",BAU_NOT_FOUND:"Caso no encontrado.",AGENT_EMAIL_REQUIRED:"El correo del agente es obligatorio."},en:{TIMEOUT:"Timeout: the API took too long to respond. (Apps Script blocked or error 500)",CONNECTION:"JSONP connection error.",BAU_SEND_FAILED:"BAU operation failed",BAU_READ_FAILED:"Error returned by the read API",BAU_UPDATE_FAILED:"BAU update failed",BAU_NOT_OWNER_EDIT:"Access denied. You can only edit your own cases.",BAU_NOT_OWNER_DELETE:"Access denied. You are not the owner of this case.",BAU_ALREADY_PROCESSED:"This case has already been processed by the TL and can no longer be changed.",BAU_NOT_FOUND:"Case not found.",AGENT_EMAIL_REQUIRED:"The agent's email is required."}};function Ha(e){return Mo[se()]?.[e]??Mo.pt[e]}function Do(e,t){return e?.code&&Mo.pt[e.code]?Ha(e.code):e?.error||e?.message||Ha(t)}function ut(e,t={}){return new Promise((a,o)=>{let i="cw_cb_"+Math.round(1e5*Math.random()),n=document.createElement("script"),r=setTimeout(()=>{document.body.contains(n)&&document.body.removeChild(n),delete window[i],o(new Error(Ha("TIMEOUT")))},15e3);window[i]=p=>{clearTimeout(r),document.body.contains(n)&&document.body.removeChild(n),delete window[i],a(p)};let s=Nl(t),l=`${kl}?op=${e}&callback=${i}&t=${Date.now()}&${s}`;n.src=l,n.onerror=()=>{clearTimeout(r),document.body.contains(n)&&document.body.removeChild(n),delete window[i],o(new Error(Ha("CONNECTION")))},document.body.appendChild(n)})}var fe={fetchTips:async()=>{try{await fe.fetchContentModule("tips")}catch(e){console.warn("Tips offline",e)}},getCachedBroadcasts:()=>{try{return JSON.parse(localStorage.getItem(Tl)||"[]")}catch{return[]}},fetchContentModule:async e=>{if(Oo.has(e)){let a=fe.getCachedContent(e);if(a)return a}let t=`${_o}${e}`;try{let a=await ut("content_public",{module:e});if(a?.status==="success"&&Array.isArray(a.items))return localStorage.setItem(t,JSON.stringify(a.items)),Oo.add(e),a.items}catch(a){console.warn(`Conte\xFAdo '${e}' offline`,a)}return fe.getCachedContent(e)},fetchContentModules:async e=>{let t=(e||[]).filter(Boolean);if(!t.length)return{};try{let a=await ut("content_public",{modules:t.join(",")});if(a?.status==="success"&&a.modules)return Object.keys(a.modules).forEach(o=>{let i=a.modules[o];Array.isArray(i)&&(localStorage.setItem(`${_o}${o}`,JSON.stringify(i)),Oo.add(o))}),a.modules}catch(a){console.warn("Pr\xE9-carregamento de conte\xFAdo indispon\xEDvel",a)}return{}},getCachedContent:e=>{try{return JSON.parse(localStorage.getItem(`${_o}${e}`)||"null")}catch{return null}},getRandomTip:()=>{let e=null,t=fe.getCachedContent("tips");if(Array.isArray(t)&&t.length&&(e=t.map(a=>a.value).filter(Boolean)),!e||!e.length){let a=localStorage.getItem(Ll);if(a)try{e=JSON.parse(a)}catch{}}return(!Array.isArray(e)||!e.length)&&(e=Il),e[Math.floor(Math.random()*e.length)]},logEvent:(e,t,a="",o=null)=>{try{let i="anon";try{let r=ze();r&&(i=r.split("@")[0].toLowerCase())}catch{}let n={timestamp:new Date().toISOString(),user:i,version:"v5.1",category:e,action:t,label:a,value:o||""};ut("log",n).catch(r=>{})}catch(i){console.warn("Analytics error",i)}},logUsage:()=>{},sendBAUEscalation:async(e,t)=>{let a={...e,user:t,date:new Date().toISOString()};try{console.log("Executando create_bau...",a);let o=await ut("create_bau",a);if(o&&o.status==="success")return console.log("Sucesso: create_bau"),o;throw new Error(Do(o,"BAU_SEND_FAILED"))}catch(o){throw console.error("Erro JSONP (BAU):",o),o}},readAgentBAU:async()=>{let e=ze();if(!e)return console.warn("Email n\xE3o encontrado. N\xE3o foi poss\xEDvel buscar casos BAU."),[];try{console.log("Buscando casos BAU para:",e);let t=await ut("read_agent_bau",{user:e});if(t&&t.status==="success"&&Array.isArray(t.cases))return t.cases;if(t&&t.status==="error")throw new Error(Do(t,"BAU_READ_FAILED"));return[]}catch(t){throw console.error("Erro ao buscar casos BAU:",t),t}},updateBAUStatus:async(e,t,a={})=>{let o=ze();try{console.log(`Atualizando status BAU ${e} para ${t}...`);let i=await ut("update_bau_status",{id:e,status:t,user:o,...a});return i&&i.status==="success"}catch(i){return console.error("Erro ao atualizar status BAU:",i),!1}},updateBAUEscalation:async(e,t)=>{let a=ze(),o={...t,id:e,user:a,date_edited:new Date().toISOString()};try{console.log(`Executando update_bau para ${e}...`,o);let i=await ut("update_bau",o);if(i&&i.status==="success")return console.log("Sucesso: update_bau"),i;throw new Error(Do(i,"BAU_UPDATE_FAILED"))}catch(i){throw console.error("Erro JSONP (Update BAU):",i),i}},fetchUserProfile:async e=>{try{console.log(`Buscando perfil para: ${e}`);let t=await ut("get_user_profile",{ldap:e});return console.log("Resposta bruta do servidor:",t),t&&t.status==="success"&&t.profile?t.profile:null}catch(t){return console.error("Erro ao buscar perfil:",t),null}},getUserSnippets:async e=>{try{return console.log("Buscando snippets para:",e),await ut("get_user_snippets",{user:e})}catch(t){return console.error("Erro ao carregar snippets:",t),{status:"error",snippets:[]}}},saveSnippet:async(e,t)=>{let a={id:e.id,type:e.type,title:e.title,content:e.content,subject:e.subject||"",isCode:e.isCode,isRich:e.isRich,user:t};try{console.log("Salvando snippet na nuvem:",a);let o=await ut("save_snippet",a);return o&&o.status==="success"}catch(o){return console.error("Erro ao salvar snippet:",o),!1}},deleteSnippet:async(e,t)=>{try{console.log(`Deletando snippet ${e}...`);let a=await ut("delete_snippet",{id:e,user:t});return a&&a.status==="success"}catch(a){return console.error("Erro ao deletar snippet:",a),!1}},getUserPrefs:async e=>{try{let t=await ut("get_user_prefs",{user:e});return t&&t.status==="success"?t.prefs||{}:null}catch(t){return console.warn("Erro ao carregar prefer\xEAncias:",t),null}},saveUserPrefs:async(e,t)=>{try{let a=await ut("save_user_prefs",{user:t,prefs:JSON.stringify(e||{})});return!!(a&&a.status==="success")}catch(a){return console.warn("Erro ao salvar prefer\xEAncias:",a),!1}}},Kn=fe.sendBAUEscalation,Xn=fe.readAgentBAU,op=fe.updateBAUStatus,Jn=fe.updateBAUEscalation,ta=fe.fetchUserProfile,np=fe.getUserSnippets,ip=fe.saveSnippet,rp=fe.deleteSnippet,sp=fe.getUserPrefs,lp=fe.saveUserPrefs;var be=e=>new Promise(t=>setTimeout(t,e));function Je(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(a=>e.dispatchEvent(new MouseEvent(a,t)))}function Ft(e){e&&["mousedown","mouseup","click"].forEach(t=>e.dispatchEvent(new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window})))}function It(e,t,a){return Math.max(t,Math.min(e,a))}var xa=0,aa=0;function De(){if(xa===0&&(aa=window.innerWidth-document.documentElement.clientWidth,aa>0)){let e=parseFloat(getComputedStyle(document.body).paddingRight)||0;document.body.style.paddingRight=`${e+aa}px`}xa++,document.body.style.overflow="hidden"}function Me(){if(xa=Math.max(0,xa-1),xa===0&&(document.body.style.overflow="",aa>0)){let e=parseFloat(getComputedStyle(document.body).paddingRight)||0,t=Math.max(0,e-aa);document.body.style.paddingRight=t?`${t}px`:"",aa=0}}var Qn=!1;function _l(){if(Qn||document.getElementById("cw-filled-check-styles"))return;let e=document.createElement("style");e.id="cw-filled-check-styles",e.textContent=`
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
    `,document.head.appendChild(e),Qn=!0}var Zn=!1;function Ol(){if(Zn||document.getElementById("cw-empty-state-styles"))return;let e=document.createElement("style");e.id="cw-empty-state-styles",e.textContent=`
        .cw-empty-illustrated { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 12px; padding: 32px 20px; }
        .cw-empty-illustrated-badge { border-radius: 50%; background: #F8F9FA; display: flex; align-items: center; justify-content: center; color: #9AA0A6; flex-shrink: 0; }
        .cw-empty-illustrated-badge svg { width: 44%; height: 44%; }
        .cw-empty-illustrated-title { font-family: 'Google Sans', Roboto, sans-serif; font-size: 15px; font-weight: 600; color: #202124; }
        .cw-empty-illustrated-subtitle { font-size: 12px; color: #5F6368; line-height: 1.5; max-width: 240px; }
    `,document.head.appendChild(e),Zn=!0}function va({icon:e,title:t,subtitle:a="",size:o=88}){Ol();let i=document.createElement("div");return i.className="cw-empty-illustrated",i.innerHTML=`
        <div class="cw-empty-illustrated-badge" style="width:${o}px;height:${o}px;">${e}</div>
        <div class="cw-empty-illustrated-title">${t}</div>
        ${a?`<div class="cw-empty-illustrated-subtitle">${a}</div>`:""}
    `,i}function Ua(e,t){e.addEventListener("keydown",a=>{if(a.key!=="ArrowDown"&&a.key!=="ArrowUp")return;let o=document.activeElement;if(!o||!o.matches(t))return;let i=Array.from(e.querySelectorAll(t)).filter(s=>s.offsetParent!==null),n=i.indexOf(o);if(n===-1)return;a.preventDefault();let r=a.key==="ArrowDown"?Math.min(n+1,i.length-1):Math.max(n-1,0);i[r].focus()})}var ei=!1;function Dl(){if(ei||document.getElementById("cw-pending-field-styles"))return;let e=document.createElement("style");e.id="cw-pending-field-styles",e.textContent=`
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
    `,document.head.appendChild(e),ei=!0}function Va(e,{duration:t=2400}={}){e&&(Dl(),e.classList.add("cw-quicklaunch-pending"),e.scrollIntoView({behavior:"smooth",block:"center"}),e.focus({preventScroll:!0}),setTimeout(()=>e.classList.remove("cw-quicklaunch-pending"),t))}function Wa(e,{minLength:t=2}={}){_l();let a=e.parentElement;a&&getComputedStyle(a).position==="static"&&(a.style.position="relative"),e.classList.add("cw-dopamine-field");let o=document.createElement("span");o.className="cw-dopamine-check",o.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',e.insertAdjacentElement("afterend",o);let i=()=>{let n=e.value.trim().length>=t;e.classList.toggle("filled",n),o.classList.toggle("show",n)};e.addEventListener("input",i),i()}function Ml(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim()}var ql={serviceHorizontal:["service horizontal","servico horizontal"],serviceOffering:["service offering","oferta de servicos","oferta de servicios"],specialization:["specialization","especializacao","especializacion"],routingChannel:["routing communication channel","canal de comunicacao de roteamento","canal de comunicacion de enrutamiento"],businessLanguage:["business language","linguagem comercial","idioma comercial"],vendorPartner:["vendor partner","parceiro fornecedor","socio proveedor"],appointmentTasks:["appointment tasks","tarefas de agendamento","tareas de la cita"],salesProgram:["sales program","programa de vendas","programa de ventas"],customerTimezone:["customer time zone","time zone","timezone","fuso horario do cliente","fuso horario","zona horaria del cliente","zona horaria"],externalCustomerId:["google ads external customer id","id de cliente externo do google ads","id de cliente externo de google ads"],additionalInfo:["additional info","informacoes adicionais","informacion adicional"],givenName:["given name","nome dado","nombre"],familyName:["family name","nome de familia","apellido"],contactEmail:["contact email","e-mail de contato","correo electronico de contacto"],loginEmail:["login email","e-mail de login","correo electronico de acceso"],phoneNumber:["phone number","numero de telefone","numero de telefono"],appointmentTime:["appointment time","horario da consulta","hora de la cita"],neoOrg:["neo org"],neoProduct:["neo product","produto neo","producto neo"],website:["website","site","sitio web"],program:["program","programa"],adsBusinessSector:["ads business sector"],interactionType:["interaction type"],salesRegion:["sales region"]},Fl=".form-label, .data-pair-label";function Ya(e,t=document){let a=ql[e];if(!a)return null;let o=new Set(a);return Array.from(t.querySelectorAll(Fl)).find(i=>o.has(Ml(i.textContent)))||null}function ti(e){return e?.innerText?.trim()||e?.textContent?.trim()||""}function ya(e,t=document){let a=Ya(e,t);if(!a)return[];let o=a.closest("cuf-form-field");if(o){let s=Array.from(o.querySelectorAll('[debug-id="html-value"]')).map(ti).filter(Boolean);if(s.length)return s}let n=a.closest("home-data-item")?.querySelector(".data-pair-content")||a.parentElement?.querySelector(".data-pair-content")||a.parentElement?.querySelector("sanitized-content")||a.nextElementSibling,r=ti(n);return r?[r]:[]}function ft(e,t=document){return ya(e,t)[0]||null}var ai=/[A-Za-z0-9._%+-]+@google\.com/g,Rl=[/^ads-support@/i,/^noreply@/i,/^no-reply@/i,/-bot@/i],oi=e=>Rl.some(t=>t.test(e));function zl(){return(document.querySelector('[debug-id="assignee"]')?.textContent.trim()||"").replace(/@.*$/,"").toLowerCase()||null}function Ro(){let t=document.querySelector('[aria-label^="Signed in as"]')?.getAttribute("aria-label")?.replace(/^Signed in as\s+/i,"").trim();return t?t.toLowerCase():document.querySelector('img.photo[src*="/photos/"]')?.src?.match(/\/photos\/([^?/]+)/)?.[1]?.toLowerCase()||null}function ni(){return document.querySelector(".active-case-log-container")||document}function ii(){return Array.from(ni().querySelectorAll("case-message-view"))}function Fo(){let e=new Set([zl(),Ro()].filter(Boolean)),t=ii().flatMap(a=>a.textContent.match(ai)||[]).map(a=>a.toLowerCase());return[...new Set(t)].filter(a=>oi(a)?!1:!e.has(a.replace(/@.*$/,"")))}function $l(e){return(ii().find(o=>/contact us form|formul[áa]rio de contato|formulario de contacto/i.test(o.textContent))?.textContent.match(ai)||[]).map(o=>o.toLowerCase()).find(o=>e.includes(o))||null}function Pl(){let e=document.querySelectorAll("internal-user-info");if(e.length!==1)return null;let t=e[0].querySelector(".email")?.textContent.trim().toLowerCase();return t&&!oi(t)?t:null}async function Bl(){let e=Array.from(ni().querySelectorAll(".message-header")).filter(t=>t.getAttribute("aria-expanded")==="false");for(let t of e)if(Ft(t),await be(400),Fo().length)return}async function ri({expandir:e=!0}={}){let t=Fo(),a="case-log-visivel";!t.length&&e&&(await Bl(),t=Fo(),a="case-log-expandido");let o=null;return t.length===1?o=t[0]:t.length>1&&(o=$l(t),a=o?"contact-us-form":a),o||(o=Pl(),a=o?"internal-user-info":"nao-resolvido"),{email:o||null,origem:a}}var Rt=e=>document.querySelector(`[debug-id="${e}"]`)?.textContent.replace(/\s+/g," ").trim()||null;function Gl(){return document.querySelector('[debug-id="case-summary-input"] input')?.value.trim()||null}function si(){return{titulo:Gl(),estado:Rt("state-button"),slaRotulo:Rt("due-in-label"),slaTexto:Rt("due-in-text"),criadoEm:Rt("date-created-value"),tier:Rt("badge-text"),programaBadge:Rt("sales-program-badge"),paisCobranca:Rt("adwords-billing-country"),assignee:Rt("assignee")}}var jl=/[A-Za-z0-9._%+-]+@google\.com/;function Hl(){return Array.from(document.querySelectorAll("case-message-view")).map(e=>e.textContent.replace(/\s+/g," ").trim())}var Ka=e=>Hl().find(t=>e.test(t))||null;function Ul(){let e=Ka(/appointment has been successfully created|agendamento foi criado/i);if(!e)return null;let t=e.match(/on ([A-Z][a-z]+ \d{1,2}) at ([\d:]+\s?[AP]M)/i),a=e.match(/\[([^\]]+)\]/),o=e.match(jl);return{data:t?.[1]||null,hora:t?.[2]||null,timezone:a?.[1]||null,designado:o?.[0]||null}}function Vl(){let e=Ka(/\bTransfer\b|\bTransferência\b/i);if(!e)return null;let t=e.match(/(?:Transfer|Transferência)\s+(?:From|De)\s+(.+?)\s+(?:to|para)\s+(.+?)(?:\.\.\.|$)/i);return t?{de:t[1].trim(),para:t[2].trim()}:null}function Wl(){let e=Ka(/appointment .*was (?:automatically )?canceled|foi cancelad/i);if(!e)return null;let t=e.match(/\(Reason:\s*([^)]+)\)/i),a=e.match(/AppointmentId=\s*(\d+)\s*\)/i);return{motivo:t?.[1].trim()||null,appointmentId:a?.[1]||null}}function Yl(){let e=Ka(/\bDiscard\b|\bDescarte\b/i);if(!e)return null;let t=e.match(/(?:Discard|Descarte)\s+(.+?)(?:\.\.\.|$)/i);return t?{motivo:t[1].trim()}:null}function li(){return{agendamento:Ul(),transferencia:Vl(),cancelamento:Wl(),descarte:Yl()}}var wa="Consultor",zt="",Vt="",Sa=null;async function Aa(){try{if(!document.querySelector(".translated-form"))return!0;let e=document.querySelector('material-button[debug-id="toggle-translation-button"]');if(!e)return!1;console.log("TechSol: Tradu\xE7\xE3o detectada. Revertendo para o idioma original..."),e.click();for(let t=0;t<20;t++){if(!document.querySelector(".translated-form"))return!0;await be(100)}return console.warn("TechSol: tradu\xE7\xE3o n\xE3o reverteu; seguindo pelos r\xF3tulos traduzidos."),!1}catch(e){return console.warn("TechSol: Erro ao tentar reverter tradu\xE7\xE3o:",e),!1}}async function Ca(){if(zt&&Vt)return zt;let e=Ro();e&&!Vt&&(Vt=`${e}@google.com`);let t=e?e.split(/[._-]/)[0].replace(/^./,a=>a.toUpperCase()):null;try{let a=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!a)return zt=t||wa,zt;a.click(),await be(150);let o=t||wa,i=document.querySelector("profile-details .name");if(i){let s=i.textContent.trim().split(" ")[0];s&&(o=s.charAt(0).toUpperCase()+s.slice(1).toLowerCase())}let n=document.querySelector("profile-details .email");return n&&(Vt=n.textContent.trim(),console.log("TechSol: Identidade confirmada ->",Vt)),a.click(),document.body.click(),zt=o,o}catch(a){return console.warn("Sherlock falhou:",a),zt=t||wa,zt}}function Ea(){return zt||wa}function ze(){return Vt||null}var ci={pt:{morning:"Bom dia",afternoon:"Boa tarde",evening:"Boa noite",friday:"\u{1F389} Sextou!",fallbackName:"Consultor",night:["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."],mondayMorning:["Vamos definir o tom da semana.","Nova semana, novas conquistas."],fridayMorning:["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."],weekdayMorning:["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."],afternoonPhrases:["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."],eveningPhrases:["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],weekend:["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]},es:{morning:"Buenos d\xEDas",afternoon:"Buenas tardes",evening:"Buenas noches",friday:"\u{1F389} \xA1Es viernes!",fallbackName:"Consultor",night:["Guerrero de la madrugada.","El mundo duerme, t\xFA avanzas.","Enfoque total."],mondayMorning:["Vamos a marcar el ritmo de la semana.","Nueva semana, nuevos logros."],fridayMorning:["El \xFAltimo empuj\xF3n antes del descanso.","Cerremos con broche de oro."],weekdayMorning:["Que tu d\xEDa sea productivo.","Enfoque y caf\xE9 para hoy."],afternoonPhrases:["Mant\xE9n el ritmo.","Una tarde productiva por delante.","Seguimos avanzando."],eveningPhrases:["Cerrando el d\xEDa con productividad.","Excelente dedicaci\xF3n."],weekend:["Tu dedicaci\xF3n el fin de semana es inspiradora.","Trabajo excepcional."]},en:{morning:"Good morning",afternoon:"Good afternoon",evening:"Good evening",friday:"\u{1F389} It's Friday!",fallbackName:"Consultant",night:["Night owl mode on.","The world sleeps, you move forward.","Full focus."],mondayMorning:["Let's set the tone for the week.","New week, new wins."],fridayMorning:["Last push before the break.","Let's close the week strong."],weekdayMorning:["Have a productive day.","Focus and coffee for today."],afternoonPhrases:["Keep the pace.","A productive afternoon ahead.","We keep moving forward."],eveningPhrases:["Wrapping up the day productively.","Excellent dedication."],weekend:["Your weekend dedication is inspiring.","Outstanding work."]}};function di(e){let t=ci[se()]||ci.pt,a=new Date,o=a.getHours(),i=a.getDay(),n,r="";o>=5&&o<12?(n=t.morning,r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(n=t.afternoon,r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(n=t.evening,r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let s=[];o>=0&&o<5?s=t.night:o<12?i===1?s=t.mondayMorning:i===5?s=t.fridayMorning:s=t.weekdayMorning:o<18?s=t.afternoonPhrases:s=t.eveningPhrases,(i===0||i===6)&&(s=t.weekend);let l=s[Math.floor(Math.random()*s.length)];return{prefix:`${n},`,name:e===wa?t.fallbackName:e,suffix:l,icon:r,isFriday:i===5,fridayBadge:t.friday}}async function zo(){try{let e=Ya("contactEmail");if(!e)return null;let t=e.closest("cuf-form-field")||e.parentElement,a=t.querySelector(".unmask-button")||t.querySelector('[aria-label="Click to view"]');a&&(a.click(),await be(500));let o=ft("contactEmail");return o&&o.includes("@")&&!o.includes("Is this:")?o.trim():null}catch(e){return console.warn("Erro ao capturar email do cliente:",e),null}}function Kl(e){let t=String(e||"").trim();if(!t||t.length>30||/^phone$/i.test(t)||t.includes("Is this:")||!/^[\d\s()+\-.]+$/.test(t))return!1;let a=t.replace(/\D/g,"");return a.length>=8&&a.length<=15}async function $o(){try{let e=Ya("phoneNumber");if(!e)return null;let t=e.closest("cuf-form-field")||e.parentElement;if(!t)return null;let a=t.querySelector(".unmask-button")||t.querySelector('[aria-label="Click to view"]');a&&(a.click(),await be(500));let o=ft("phoneNumber");return Kl(o)?o.trim():null}catch(e){return console.warn("Erro ao capturar telefone do cliente:",e),null}}async function Xl(e){try{return await ri(e)}catch(t){return console.warn("Erro ao resolver AM:",t),{email:null,origem:"erro"}}}function Xa(){try{let e=ft("externalCustomerId");if(!e)return"N/A";let t=e.replace(/\D/g,"");return t.length!==10?"N/A":t.replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(e){console.warn("Erro ao capturar CID:",e)}return"N/A"}function Jl(e){return e?.email||null}function Ql(){try{return ft("customerTimezone")}catch(e){console.warn("Erro ao capturar Timezone:",e)}return null}async function Ja(){try{let t=document.querySelector('[debug-id="case-id"]')?.textContent?.match(/\d-\d{6,}/)?.[0];return t||window.location.href.split("/").pop()||"---"}catch(e){return console.warn("Falha ao capturar Case ID:",e),"---"}}function Zl(){try{return ft("salesProgram")||""}catch(e){console.warn("Erro ao capturar Sales Program:",e)}return""}function ec(){try{return ft("familyName")||""}catch(e){console.warn("Falha Sobrenome:",e)}return""}function tc(){try{return ft("businessLanguage")||"N/A"}catch(e){console.warn("Erro ao capturar Idioma:",e)}return"N/A"}function ac(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(a=>a.textContent.includes("Speakeasy ID")||a.textContent.includes("SE ID"));if(t){let a=t.closest(".data-pair")||t.parentElement,o=a.querySelector(".data-pair-content")||a.nextElementSibling;if(o&&o.textContent.trim())return o.textContent.trim()}}catch(e){console.warn("Erro ao capturar SE ID:",e)}return"N/A"}function pi(e){e&&(Sa=e)}function ka(){let e=String(Sa?.defaultLanguage||"").toUpperCase();return{ES:"ES",EN:"EN"}[e]||"PT"}async function bt(){await Aa(),Vt||await Ca();let e=ft("givenName")||"Cliente",t=ft("website")||"",a=ya("appointmentTasks"),[o,i]=await Promise.all([zo(),$o()]),n=await Xl(),r=Xa(),s=Jl(n),l=Ql(),p=si(),d=li(),A=await Ja(),u=Zl(),h=tc(),N=ac(),v=ec(),I=ze();if(I&&!Sa){let z=I.split("@")[0];try{Sa=await ta(z)}catch(U){console.warn("Falha ao carregar perfil do usu\xE1rio:",U)}}return{advertiserName:e,websiteUrl:t,clientEmail:o,internalEmail:n.email,cid:r,amName:s,amEmail:n.email,amOrigem:n.origem,appointmentTasks:a,caseContext:p,caseLog:d,timezone:l,agentName:Ea(),agentEmail:ze(),caseId:A,userProfile:Sa,advName:e,site:t,website:t,email:o,advEmail:o,salesProgram:u,language:h,seId:N,advLastName:v,advPhone:i}}var Wt=null,Po=null,Ta=null,Bo=0,ht=.3;var mt=localStorage.getItem("cw_sounds_muted")==="true";function Ct(){if(!Wt){let e=window.AudioContext||window.webkitAudioContext;e&&(Wt=new e)}return Wt&&Wt.state==="suspended"&&Wt.resume(),Wt}function ui(e){if(Po)return Po;let t=e.sampleRate*2,a=e.createBuffer(1,t,e.sampleRate),o=a.getChannelData(0);for(let i=0;i<t;i++)o[i]=Math.random()*2-1;return Po=a,a}var y={setMuted:e=>{mt=e,localStorage.setItem("cw_sounds_muted",e)},isMuted:()=>mt,playClick:()=>{if(mt)return;let e=Ct();if(!e)return;let t=e.currentTime,a=e.createBufferSource();a.buffer=ui(e);let o=e.createBiquadFilter();o.type="highpass",o.frequency.value=4e3;let i=e.createGain();i.gain.setValueAtTime(ht*.8,t),i.gain.exponentialRampToValueAtTime(.001,t+.015),a.connect(o),o.connect(i),i.connect(e.destination),a.start(t),a.stop(t+.02)},playHover:()=>{if(mt)return;let e=Ct();if(!e)return;let t=e.currentTime,a=e.createOscillator();a.type="sine",a.frequency.setValueAtTime(400,t);let o=e.createGain();o.gain.setValueAtTime(0,t),o.gain.linearRampToValueAtTime(ht*.1,t+.005),o.gain.linearRampToValueAtTime(0,t+.02),a.connect(o),o.connect(e.destination),a.start(t),a.stop(t+.03)},playSuccess:()=>{if(mt)return;let e=Ct();if(!e)return;let t=e.currentTime;[1046.5,1567.9].forEach((o,i)=>{let n=e.createOscillator(),r=e.createGain();n.type="sine",n.frequency.value=o,r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(ht*.6,t+.05),r.gain.exponentialRampToValueAtTime(.001,t+.6),n.connect(r),r.connect(e.destination),n.start(t),n.stop(t+.7)})},playGenieOpen:()=>{if(mt)return;let e=Ct();if(!e)return;let t=e.currentTime,a=e.createBufferSource();a.buffer=ui(e);let o=e.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(100,t),o.frequency.exponentialRampToValueAtTime(800,t+.2);let i=e.createGain();i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(ht*.5,t+.05),i.gain.linearRampToValueAtTime(0,t+.25),a.connect(o),o.connect(i),i.connect(e.destination),a.start(t),a.stop(t+.3)},playError:()=>{if(mt)return;let e=Ct();if(!e)return;let t=e.currentTime,a=e.createOscillator(),o=e.createGain();a.type="triangle",a.frequency.setValueAtTime(120,t),a.frequency.exponentialRampToValueAtTime(80,t+.1),o.gain.setValueAtTime(ht,t),o.gain.exponentialRampToValueAtTime(.001,t+.15),a.connect(o),o.connect(e.destination),a.start(t),a.stop(t+.2)},playStartup:()=>{if(mt)return;let e=Ct();if(!e)return;let t=e.currentTime,a=.12,o=e.createOscillator(),i=e.createGain(),n=e.createBiquadFilter();o.type="square",o.frequency.setValueAtTime(400,t),o.frequency.exponentialRampToValueAtTime(50,t+.1),n.type="lowpass",n.frequency.setValueAtTime(800,t),n.frequency.exponentialRampToValueAtTime(100,t+.1),i.gain.setValueAtTime(ht*4,t),i.gain.exponentialRampToValueAtTime(.001,t+.1),o.connect(n),n.connect(i),i.connect(e.destination),o.start(t),o.stop(t+.12);let r=e.createOscillator(),s=e.createGain();r.type="sine",r.frequency.setValueAtTime(150,t),r.frequency.exponentialRampToValueAtTime(50,t+.15),s.gain.setValueAtTime(ht*1.5,t),s.gain.exponentialRampToValueAtTime(.001,t+.15),r.connect(s),s.connect(e.destination),r.start(t),r.stop(t+.15),[55,55.4,110.5].forEach(p=>{let d=e.createOscillator(),A=e.createGain(),u=e.createBiquadFilter();d.type="sawtooth",d.frequency.value=p,u.type="lowpass",u.frequency.setValueAtTime(30,t),u.frequency.linearRampToValueAtTime(900,t+a+.2),u.frequency.exponentialRampToValueAtTime(40,t+3),A.gain.setValueAtTime(0,t),A.gain.linearRampToValueAtTime(ht*.6,t+a+.1),A.gain.exponentialRampToValueAtTime(.001,t+3.5),d.connect(u),u.connect(A),A.connect(e.destination),d.start(t),d.stop(t+3.6)})},playNotification:()=>{if(mt)return;let e=Ct();if(!e)return;let t=e.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(o=>{let i=e.createOscillator(),n=e.createGain();i.type="sine",i.frequency.setValueAtTime(o.freq,t),n.gain.setValueAtTime(0,t),n.gain.linearRampToValueAtTime(ht*o.vol,t+.004),n.gain.exponentialRampToValueAtTime(.001,t+o.dur),i.connect(n),n.connect(e.destination),i.start(t),i.stop(t+o.dur+.1)})},playReady:()=>{if(mt)return;let e=Ct();if(!e)return;let t=e.currentTime;[{freq:587.33,at:0,dur:.2,vol:.26},{freq:880,at:.09,dur:.3,vol:.3},{freq:1760,at:.09,dur:.26,vol:.08}].forEach(o=>{let i=e.createOscillator(),n=e.createGain();i.type="sine",i.frequency.value=o.freq;let r=t+o.at;n.gain.setValueAtTime(0,r),n.gain.linearRampToValueAtTime(ht*o.vol,r+.02),n.gain.exponentialRampToValueAtTime(.001,r+o.dur),i.connect(n),n.connect(e.destination),i.start(r),i.stop(r+o.dur+.05)})},playNotice:()=>{if(mt)return;let e=Ct();if(!e)return;let t=e.currentTime;[{freq:783.99,at:0,dur:.22,vol:.2},{freq:659.25,at:.11,dur:.34,vol:.18}].forEach(o=>{let i=e.createOscillator(),n=e.createGain();i.type="sine",i.frequency.value=o.freq;let r=t+o.at;n.gain.setValueAtTime(0,r),n.gain.linearRampToValueAtTime(ht*o.vol,r+.02),n.gain.exponentialRampToValueAtTime(.001,r+o.dur),i.connect(n),n.connect(e.destination),i.start(r),i.stop(r+o.dur+.05)})},startThinking:()=>{if(mt)return;let e=Ct();if(!e||Ta)return;let t=[523.25,659.25,783.99];Bo=0;let a=()=>{if(mt)return;let o=e.currentTime,i=e.createOscillator(),n=e.createGain();i.type="sine",i.frequency.setValueAtTime(t[Bo%t.length],o),n.gain.setValueAtTime(0,o),n.gain.linearRampToValueAtTime(ht*.15,o+.02),n.gain.exponentialRampToValueAtTime(.001,o+.22),i.connect(n),n.connect(e.destination),i.start(o),i.stop(o+.25),Bo++};a(),Ta=setInterval(a,370)},stopThinking:()=>{Ta&&(clearInterval(Ta),Ta=null)},playSwoosh:()=>{y.playGenieOpen()},playReset:()=>{y.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let e=0,t=50;document.addEventListener("mouseover",a=>{if(!Wt)return;let o=a.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!o||o.contains(a.relatedTarget))return;let i=Date.now();i-e<t||(y.playHover(),e=i)},{passive:!0})}};var je={MODULE_RESTING:2147483640,MODULE_FOCUSED:2147483641,PAGE_SPOTLIGHT_OVERLAY:2147483642,PAGE_SPOTLIGHT_TARGET:2147483643,TOAST:2147483644,FOCUS_BACKDROP:2147483646,TOP:2147483647};var mi=["lucaste","ricardogi"],oa="https://docs.google.com/forms/d/1v8mi4eLmx3a2GX2lEMmxMDR2n8AdzGL9WP_p_YEaveg/viewform",Qa="https://docs.google.com/presentation/d/1EOBUyK0xK2hXv29939NjIEJpgHsKeNG37HHgI8jWTc0/preview?resourcekey=0-_ct0TKJgzoEhOkhlxz6ZbA",Et="@lucaste";var Go=je.MODULE_RESTING;function xi(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}var gi={confirma:10,erro:[10,40,10],concluido:[10,30,10]};function Yt(e="confirma"){if(!navigator.vibrate)return!1;try{return navigator.vibrate(gi[e]??gi.confirma)}catch{return!1}}function te(e,t={}){let a=document.createElement("div"),o=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(a.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:String(je.TOAST),opacity:"0",transition:"all 0.4s var(--cw-ease-spring)",pointerEvents:"none"}),a.textContent=e,document.body.appendChild(a),t.error?y.playError():y.playSuccess(),requestAnimationFrame(()=>{a.style.opacity="1",a.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{a.style.opacity="0",a.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>a.remove(),400)},t.duration||4e3)}function vi(e,t=null){let a=0,o=0,i=0,n=0,r=t||e;r.style.cursor="grab",r.onmousedown=s;function s(d){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(d.target.tagName)||d.target.closest(".no-drag"))return;d=d||window.event,r.style.cursor="grabbing",e.style.transition="none";let A=e.getBoundingClientRect();e.style.transform="none",e.style.left=A.left+"px",e.style.top=A.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",Go=Math.min(Go+1,je.MODULE_FOCUSED),e.style.zIndex=Go,i=d.clientX,n=d.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=p,document.onmousemove=l}function l(d){d=d||window.event,d.preventDefault(),a=i-d.clientX,o=n-d.clientY,i=d.clientX,n=d.clientY;let A=e.offsetTop-o,u=e.offsetLeft-a,h=16,N=window.innerWidth,v=window.innerHeight,I=e.offsetWidth,z=e.offsetHeight;u=It(u,h,N-I-h),A=It(A,h,v-z-h),e.style.top=A+"px",e.style.left=u+"px"}function p(){document.onmouseup=null,document.onmousemove=null,r.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s var(--cw-ease-decelerate), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var Qe={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:String(je.MODULE_RESTING),overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08),
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var Ho={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},yi={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var wi={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var fi=!1;function oc(){if(fi||document.getElementById("techsol-google-styles"))return;let e=document.createElement("style");e.id="techsol-google-styles",e.innerHTML=`
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
    `,document.head.appendChild(e),fi=!0}function Si(e){oc(),e.classList.remove("google-animate-click"),e.offsetWidth,e.classList.add("google-animate-click"),setTimeout(()=>{e.classList.remove("google-animate-click")},600)}async function nc(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let a=e.querySelector(".cursor");await be(200);for(let o=0;o<t.length;o++){let i=t.charAt(o),n=document.createElement("span");n.textContent=i,a&&a.parentNode===e?a.before(n):e.appendChild(n);let r=Math.floor(Math.random()*60)+30;o===0&&(r=150),o>t.length-3&&(r=30),await be(r)}await be(600),a&&(a.style.display="none")}async function Uo(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
            /* Google Sans j\xE1 vem via <link> logo acima em initGlobalStylesAndFont(),
               chamada antes da splash - esse @import era uma 3a requisi\xE7\xE3o redundante
               pra fonte (a 1a \xE9 o <link>, a 2a era o do command-center.js). */
            .splash-container { font-family: 'Google Sans', sans-serif; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #202124; z-index: ${je.TOP}; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1); }
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
        <div class="credit-pro">created by <span>${Et}</span></div>
        <div class="loader-line"></div>
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await be(200);let t=await Ca(),a=di(t),o=e.querySelector("#w-icon"),i=e.querySelector("#p1"),n=e.querySelector("#p2"),r=e.querySelector("#p3"),s=e.querySelector("#p-sextou");o&&(o.innerHTML=a.icon),i&&(i.textContent=a.prefix),r&&(r.textContent=a.suffix),await be(300);let l=o?o.querySelector("svg"):null;if(l&&(l.style.opacity="1",l.style.transform="scale(1)"),await be(400),i&&(i.style.opacity="1"),y.playStartup(),n&&await nc(n,a.name),r&&(r.style.opacity="1",r.style.transform="translateY(0)"),a.isFriday&&s){await be(400),s.style.display="block",s.offsetWidth;let p=s.querySelector(".sextou-badge");p&&(p.textContent=a.fridayBadge,p.style.opacity="1",p.style.transform="scale(1)")}await be(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await be(900),e.parentNode&&e.parentNode.removeChild(e)}}function Ai(e){if(!e)return;let t=e.getBoundingClientRect(),a=window.innerWidth,o=window.innerHeight,i=24,n=a-t.width-i,r=o-t.height-i,s=parseFloat(e.style.left)||t.left,l=parseFloat(e.style.top)||t.top,p=It(s,i,n),d=It(l,i,r);if(p!==s||d!==l){let A=e.style.transition;e.style.transition="left 0.3s var(--cw-ease-elastic), top 0.3s var(--cw-ease-elastic)",e.style.left=`${p}px`,e.style.top=`${d}px`,setTimeout(()=>{e.style.transition=A},300)}}var kt={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Tt(e,t){t.onmousedown=a;function a(o){o.stopPropagation(),o.preventDefault();let i=e.style.transition;e.style.transition="none";let n=o.clientX,r=o.clientY,s=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),l=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),p=n,d=r,A=!1;function u(v){p=v.clientX,d=v.clientY,A||(window.requestAnimationFrame(()=>{h(),A=!1}),A=!0)}function h(){let v=s+(p-n),I=l+(d-r);v>360&&(e.style.width=v+"px"),I>300&&(e.style.height=I+"px")}function N(){document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",N),setTimeout(()=>{e.style.transition=i},50)}document.addEventListener("mousemove",u),document.addEventListener("mouseup",N)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}var bi={pt:{unavailable:"Data indispon\xEDvel",at:"\xE0s"},es:{unavailable:"Fecha no disponible",at:"a las"},en:{unavailable:"Date unavailable",at:"at"}};function La(e){let t=se(),a=bi[t]||bi.pt;if(!e||e==="N/A"||e==="undefined")return a.unavailable;if(String(e).includes(" | "))return e.split(" | ").map(o=>La(o.trim())).filter(o=>o!==a.unavailable).join(" | ");try{let o=new Date(e);if(isNaN(o.getTime()))return a.unavailable;let i=Ut(t),n=o.toLocaleDateString(i,{day:"2-digit",month:Ga(t),year:"numeric"}),r=o.toLocaleTimeString(i,{hour:"2-digit",minute:"2-digit"});return`${n} ${a.at} ${r}`}catch{return a.unavailable}}function Ci(e){if(!e)return"";let t={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return e.replace(/:([a-zA-Z0-9-_+]+):/g,a=>t[a]?t[a]:"")}function Ei(){let e=document.createElement("div");return e.className="cw-dialog-overlay",Object.assign(e.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:je.TOP,opacity:0,transition:"opacity 0.3s ease"}),e}function ki(){let e=document.createElement("div");return Object.assign(e.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s var(--cw-ease-spring)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),e}var hi={pt:{cancel:"Cancelar",confirm:"Confirmar",delete:"Excluir"},es:{cancel:"Cancelar",confirm:"Confirmar",delete:"Eliminar"},en:{cancel:"Cancel",confirm:"Confirm",delete:"Delete"}};function jo(e){return(hi[se()]||hi.pt)[e]}function Ye(e,t={}){return new Promise(a=>{let o=Ei(),i=ki(),n=t.danger?"#FF3B30":"#007AFF",r=t.confirmText||jo(t.danger?"delete":"confirm");i.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${e}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">${jo("cancel")}</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${n}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${r}</button>
            </div>
        `,o.appendChild(i),document.body.appendChild(o),requestAnimationFrame(()=>{o.style.opacity=1,i.style.transform="scale(1)"});let s=d=>{o.style.opacity=0,i.style.transform="scale(0.9)",setTimeout(()=>{o.remove(),a(d)},300)},l=i.querySelector("#cw-conf-cancel"),p=i.querySelector("#cw-conf-ok");[l,p].forEach(d=>d.onmouseenter=()=>y.playHover()),l.onclick=()=>{y.playClick(),s(!1)},p.onclick=()=>{y.playClick(),s(!0)}})}function Za(e,t=""){return new Promise(a=>{let o=Ei(),i=ki();i.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${e}</div>
            <input type="text" id="cw-prompt-input" value="${t}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">${jo("cancel")}</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,o.appendChild(i),document.body.appendChild(o);let n=i.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{o.style.opacity=1,i.style.transform="scale(1)",setTimeout(()=>n.focus(),100)});let r=p=>{o.style.opacity=0,i.style.transform="scale(0.9)",setTimeout(()=>{o.remove(),a(p)},300)},s=i.querySelector("#cw-prompt-cancel"),l=i.querySelector("#cw-prompt-ok");[s,l].forEach(p=>p.onmouseenter=()=>y.playHover()),s.onclick=()=>{y.playClick(),r(null)},l.onclick=()=>{y.playClick(),r(n.value)},n.onkeydown=p=>{p.key==="Enter"&&l.click(),p.key==="Escape"&&s.click()}})}var Vo=class{constructor(){this.visible=!1,this.currentLang="pt",this.reset()}reset(){this.currentCaseType="bau",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.activeFields=[];let t=typeof localStorage<"u"?localStorage.getItem("cw-notes-favorites"):null;this.favorites=new Set(JSON.parse(t||"[]")),this.screenshotMode="implementation",this.notify()}setCaseType(t){this.currentCaseType!==t&&(this.currentCaseType=t,this.isDirty=!0,this.notify())}setLanguage(t){this.currentLang!==t&&(this.currentLang=t,this.notify())}setPortugalCase(t){this.isPortugalCase!==t&&(this.isPortugalCase=t,this.isDirty=!0,this.notify())}setConsent(t){this.consent!==t&&(this.consent=t,this.isDirty=!0,this.notify())}setTagSupportUsed(t){this.tagSupportUsed=t,t||this.forcedScreenshots.clear(),this.isDirty=!0,this.notify()}setActiveFields(t){this.activeFields=[...t],this.isDirty=!0,this.notify()}removeField(t){this.activeFields=this.activeFields.filter(a=>a!==t),this.isDirty=!0,this.notify()}addFieldAt(t,a){this.activeFields.includes(t)||(this.activeFields.splice(a,0,t),this.isDirty=!0,this.notify())}setForcedScreenshots(t){this.forcedScreenshots=new Set(t),this.isDirty=!0,this.notify()}toggleForcedScreenshot(t,a){a?this.forcedScreenshots.add(t):this.forcedScreenshots.delete(t),this.isDirty=!0,this.notify()}setStatus(t){this.currentStatus!==t&&(this.currentStatus=t,this.isDirty=!0,this.notify())}setSubStatus(t){this.currentSubStatus!==t&&(this.currentSubStatus=t,this.isDirty=!0,this.notify())}setScreenshotMode(t){this.screenshotMode=t,this.notify()}setActiveTasks(t){this.activeTasks=t,this.isDirty=!0,this.notify()}toggleFavorite(t){this.favorites.has(t)?this.favorites.delete(t):this.favorites.add(t),typeof localStorage<"u"&&localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(t,a){this.formData[t]!==a&&(this.formData[t]=a,this.isDirty=!0,this.notify())}listeners=[];subscribe(t){return this.listeners.push(t),()=>this.listeners=this.listeners.filter(a=>a!==t)}notify(){this.listeners.forEach(t=>t(this))}},ee=new Vo;var Ti={pt:{helpTooltip:"Sobre & Feedback",closeTooltip:"Fechar",version:"Vers\xE3o",reportLink:"Reportar Bug ou Sugest\xE3o",docsLink:"Abrir a documenta\xE7\xE3o",backBtn:"Voltar",createdBy:"criado por"},es:{helpTooltip:"Acerca de y Comentarios",closeTooltip:"Cerrar",version:"Versi\xF3n",reportLink:"Reportar error o sugerencia",docsLink:"Abrir la documentaci\xF3n",backBtn:"Volver",createdBy:"creado por"},en:{helpTooltip:"About & Feedback",closeTooltip:"Close",version:"Version",reportLink:"Report a Bug or Suggestion",docsLink:"Open the documentation",backBtn:"Back",createdBy:"created by"}};function dt(e){let t=se();return Ti[t]?.[e]??Ti.pt[e]??e}var ic={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Li={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function He(e,t,a,o,i,n){let r=document.createElement("div");Object.assign(r.style,ic),vi(e,r);let s=document.createElement("div");if(Object.assign(s.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",backgroundSize:"300% auto",zIndex:"10",opacity:"0.8"}),!document.getElementById("cw-header-anim")){let U=document.createElement("style");U.id="cw-header-anim",U.innerHTML=`
            @keyframes cw-header-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `,document.head.appendChild(U)}window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||(s.style.animation="cw-header-flow 6s linear infinite"),r.appendChild(s),i&&(i.googleLine=s);let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center",gap:"12px"});let d=document.createElement("div");d.innerHTML='<svg viewBox="0 0 48 48" width="20" height="20"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/></svg>',Object.assign(d.style,{width:"20px",height:"20px",pointerEvents:"none",flexShrink:"0",display:"flex"});let A=document.createElement("span");A.textContent=t,p.appendChild(d),p.appendChild(A);let u=document.createElement("div");Object.assign(u.style,{display:"flex",alignItems:"center",gap:"4px"});let h='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',N='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',v=document.createElement("div");v.innerHTML=h,Object.assign(v.style,Li),v.title=dt("helpTooltip"),v.classList.add("no-drag"),v.onmouseenter=()=>{v.style.background="rgba(255,255,255,0.1)",v.style.color="#FFF"},v.onmouseleave=()=>{v.style.color!=="rgb(138, 180, 248)"&&(v.style.background="transparent",v.style.color="#9AA0A6")};let I=document.createElement("div");I.innerHTML=N,Object.assign(I.style,Li),I.title=dt("closeTooltip"),I.classList.add("no-drag","cw-header-close"),I.onmouseenter=()=>{I.style.background="rgba(242, 139, 130, 0.2)",I.style.color="#F28B82"},I.onmouseleave=()=>{I.style.background="transparent",I.style.color="#9AA0A6"},I.onmousedown=U=>U.stopPropagation(),v.onmousedown=U=>U.stopPropagation(),I.onclick=n;let z=rc(e,t,a,o);return v.onclick=U=>{U.stopPropagation(),z.style.opacity==="1"?(z.style.opacity="0",z.style.pointerEvents="none",v.style.color="#9AA0A6",v.style.background="transparent"):(z.style.opacity="1",z.style.pointerEvents="auto",v.style.color="#8AB4F8",v.style.background="rgba(138, 180, 248, 0.1)")},u.appendChild(v),u.appendChild(I),r.appendChild(p),r.appendChild(u),Le(()=>{v.title=dt("helpTooltip"),I.title=dt("closeTooltip")}),r}var Ii=`
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
`;function rc(e,t,a,o){let i=document.createElement("div");return Object.assign(i.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),i.innerHTML=`
        <div class="cw-help-title" style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${t}</div>
        <div class="cw-help-version" style="color: #5f6368; font-size: 14px; margin-bottom: 24px;">${dt("version")} ${a}</div>

        <div class="cw-help-description" style="color: #3c4043; font-size: 14px; max-width: 90%; line-height: 1.6; margin-bottom: 24px;">
            ${o}
        </div>

        <div style="margin-bottom: 32px; display: flex; flex-direction: column; align-items: center; gap: 10px;">
            <a href="${Qa}" target="_blank" rel="noopener noreferrer" class="cw-help-link" style="${Ii}">
                <span>\u{1F4D6}</span> <span class="cw-help-docs-link">${dt("docsLink")}</span>
            </a>
            <a href="${oa}" target="_blank" rel="noopener noreferrer" id="cw-feedback-link" class="cw-help-link" style="${Ii}">
                <span>\u{1F4AC}</span> <span class="cw-help-report-link">${dt("reportLink")}</span>
            </a>
        </div>

        <div class="cw-help-created-by" style="font-size: 12px; color: #9aa0a6;">
            ${dt("createdBy")} <span style="color: #1a73e8; font-weight: 500;">${Et}</span>
        </div>

        <button id="close-help-internal" style="margin-top: 24px; padding: 8px 24px; border: 1px solid #dadce0; background: white; border-radius: 18px; color: #5f6368; cursor: pointer; font-weight: 500; transition: background 0.2s;">
            ${dt("backBtn")}
        </button>
    `,setTimeout(()=>{i.querySelectorAll(".cw-help-link").forEach(r=>{r.onmouseenter=()=>{r.style.backgroundColor="#E8F0FE",r.style.transform="scale(1.02)"},r.onmouseleave=()=>{r.style.backgroundColor="#F8F9FA",r.style.transform="scale(1)"}});let n=i.querySelector("#close-help-internal");n&&(n.onmouseover=()=>n.style.backgroundColor="#f8f9fa",n.onmouseout=()=>n.style.backgroundColor="white",n.onclick=()=>{i.style.opacity="0",i.style.pointerEvents="none"})},0),Le(()=>{let n=i.querySelector(".cw-help-version");n&&(n.textContent=`${dt("version")} ${a}`);let r=i.querySelector(".cw-help-docs-link");r&&(r.textContent=dt("docsLink"));let s=i.querySelector(".cw-help-report-link");s&&(s.textContent=dt("reportLink"));let l=i.querySelector(".cw-help-created-by");l&&(l.firstChild.textContent=`${dt("createdBy")} `);let p=i.querySelector("#close-help-internal");p&&(p.textContent=dt("backBtn"))}),e.appendChild(i),i}var G={blue:"#4285F4",red:"#EA4335",yellow:"#FBBC05",green:"#34A853",primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#34A853",warning:"#FBBC05",error:"#EA4335"},$e={small:"8px",medium:"12px",large:"20px",pill:"100px"},Nt={subtle:"0 1px 3px rgba(0,0,0,0.08)",card:"0 4px 12px rgba(0,0,0,0.05)",elevated:"0 12px 24px rgba(0,0,0,0.08)",apple:"0 20px 40px rgba(0,0,0,0.12)"},Ce="cubic-bezier(0.34, 1.56, 0.64, 1)",sc={width:"100%",padding:"14px 16px",borderRadius:$e.medium,border:`1.5px solid ${G.border}`,backgroundColor:G.bgInput,fontSize:"14px",color:G.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`all 0.3s ${Ce}`,outline:"none"},$p={...sc,minHeight:"120px",resize:"vertical",lineHeight:"1.6"},Pp={fontSize:"12px",fontWeight:"700",color:G.textSub,textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px 0"},Bp={display:"block",fontSize:"14px",fontWeight:"600",color:G.text,marginBottom:"10px",marginTop:"20px"},Gp={fontSize:"12px",color:G.warning,marginTop:"8px",display:"flex",alignItems:"center",gap:"8px",fontWeight:"500"},Wo={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:G.primary},jp={display:"flex",alignItems:"center",marginBottom:"12px",fontSize:"14px",fontWeight:"500",color:G.text,cursor:"pointer",padding:"16px 20px",backgroundColor:G.surface,border:`1px solid ${G.border}`,borderRadius:$e.large,transition:`all 0.4s ${Ce}`,userSelect:"none",boxShadow:Nt.subtle},Hp={padding:"14px 28px",color:"#fff",backgroundColor:G.primary,border:"none",borderRadius:$e.pill,fontSize:"15px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px 0 rgba(26,115,232,0.39)",transition:`all 0.25s ${Ce}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",outline:"none"},Up={width:"100%",padding:"12px",background:"#FFFFFF",border:`1.5px dashed ${G.primary}`,color:G.primary,borderRadius:$e.medium,cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"16px",transition:`all 0.25s ${Ce}`},Vp={background:"transparent",border:`1px solid ${G.border}`,borderRadius:$e.pill,color:G.textSub,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",margin:"20px auto",transition:`all 0.25s ${Ce}`};var Ia={pt:"Gera notas padronizadas com excel\xEAncia visual.",es:"Genera notas estandarizadas con excelencia visual.",en:"Builds standardized notes with visual polish."};function Ni(e,t){let a=document.createElement("div");a.id="notes-assistant-popup",a.classList.add("cw-module-window"),Object.assign(a.style,Qe,{right:"100px",width:"520px",height:"740px",display:"flex",flexDirection:"column",transition:`width 0.4s ${Ce}, height 0.4s ${Ce}, transform 0.4s ${Ce}, opacity 0.3s ease`,borderRadius:$e.large,boxShadow:Nt.apple,border:"1px solid rgba(255, 255, 255, 0.7)"});let o={popup:a,googleLine:null},i=He(a,"Case Notes",e,Ia[se()]||Ia.pt,o,t);a.appendChild(i);let n=document.createElement("div");n.className="cw-popup-content",Object.assign(n.style,{padding:"24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"24px",background:G.surface}),a.appendChild(n);let r=document.createElement("div");r.textContent=`created by ${Et}`,Object.assign(r.style,wi,{padding:"16px 24px",borderTop:`1px solid ${G.bgInput}`,color:G.textSub,fontSize:"11px",marginTop:"auto",fontWeight:"500",letterSpacing:"0.5px"}),a.appendChild(r);let s=document.createElement("div");return Object.assign(s.style,kt),s.className="no-drag",a.appendChild(s),Tt(a,s),lc(),{popup:a,content:n,header:i,animRefs:o,credit:r}}function lc(){if(document.getElementById("cw-notes-refactor-styles"))return;let e=document.createElement("style");e.id="cw-notes-refactor-styles",e.innerHTML=`
        .cw-popup-content::-webkit-scrollbar { width: 8px; }
        .cw-popup-content::-webkit-scrollbar-track { background: transparent; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; border: 2px solid #fff; }
        .cw-popup-content::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .cw-input, .cw-textarea, .cw-select {
            width: 100% !important;
            padding: 12px 16px !important;
            border-radius: ${$e.medium} !important;
            border: 1.5px solid ${G.border} !important;
            font-size: 14px !important;
            font-family: 'Google Sans', Roboto, sans-serif !important;
            transition: border-color 0.2s ${Ce}, background-color 0.2s ${Ce}, box-shadow 0.2s ${Ce} !important;
            box-sizing: border-box !important;
            background: ${G.bgInput} !important;
            color: ${G.text} !important;
            outline: none !important;
            box-shadow: ${Nt.subtle} !important;
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
            transition: border-color 0.2s ${Ce}, background-color 0.2s ${Ce}, box-shadow 0.2s ${Ce} !important;
        }

        .cw-input:hover, .cw-textarea:hover, #notes-assistant-popup .cw-select:hover {
            border-color: #bdc1c6 !important;
            background-color: #f1f3f4 !important;
            box-shadow: 0 1px 4px rgba(0,0,0,0.1) !important;
        }

        .cw-input:focus, .cw-textarea:focus, #notes-assistant-popup .cw-select:focus {
            border-color: ${G.primary} !important;
            background-color: #fff !important;
            box-shadow: 0 0 0 3px rgba(26,115,232,0.15), 0 2px 8px rgba(0,0,0,0.05) !important;
        }

        .cw-textarea { min-height: 100px; resize: vertical; line-height: 1.5; }

        .cw-section-title {
            font-size: 11px;
            font-weight: 700;
            color: ${G.textSub};
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
            background: ${G.bgInput};
        }

        .cw-btn-primary {
            background: ${G.primary};
            color: #fff;
            border: none;
            border-radius: ${$e.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ${Ce}, transform 0.2s ${Ce}, box-shadow 0.2s ${Ce};
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
            color: ${G.textSub};
            border: 1px solid ${G.border};
            border-radius: ${$e.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ${Ce}, border-color 0.2s ${Ce}, color 0.2s ${Ce};
        }
        .cw-btn-secondary:hover {
            background: ${G.bgInput};
            border-color: #bdc1c6;
            color: ${G.text};
        }

        @media (prefers-reduced-motion: reduce) {
            .cw-btn-primary, .cw-btn-secondary, .cw-input, .cw-textarea, .cw-select {
                transition: opacity 0.15s ease, background-color 0.15s ease, border-color 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}var xt={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"Selecione",substatus:"Substatus:",select_substatus:"Selecione o Status",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",preencher_email_automaticamente:"Preencher email automaticamente?",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",trechos:"Trechos",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",atalhos_ajuda:"Atalhos para as implementa\xE7\xF5es mais frequentes.<br>Use a busca abaixo para o cat\xE1logo completo.",nenhum_resultado:"Nenhum resultado.",alternar_split:"Alternar para Split & Transfer",preencha_obrigatorio:"Preencha o campo obrigat\xF3rio antes de gerar",selecione_task_gerar:"Selecione ao menos uma tarefa antes de gerar a nota.",nota_nao_abriu:"N\xE3o foi poss\xEDvel abrir a nota no CRM. O conte\xFAdo j\xE1 est\xE1 copiado \u2014 cole manualmente.",sessao_restaurada:"Sess\xE3o restaurada!",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",link_aqui:"Link aqui",tag_support_output_label:"Utilizou Tag Support?",motivo_output_label:"Motivo:",auto_busca:"\u2728 Auto Busca",utilize_marcadores:"Utilize marcadores para detalhar...",descreva_consideracoes:"Descreva as considera\xE7\xF5es...",remover:"Remover",remover_campo_confirm:'Remover o campo "{campo}"?',meus_rascunhos:"Meus Rascunhos",confirmar_guardar_rascunho:"Deseja guardar o rascunho atual e limpar os campos?",rascunho_salvo_sucesso:"Rascunho salvo com sucesso!",erro_ler_dados:"Erro: N\xE3o foi poss\xEDvel ler os dados.",erro_ao_salvar:"Erro ao salvar.",cliente_sem_nome:"Cliente Sem Nome",sem_status:"Sem Status",retomar_caso:"Retomar Caso",descartar:"Descartar",retomar_rascunho_confirm:"Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.",rascunho_carregado:"Rascunho carregado.",excluir_rascunho_confirm:"Excluir este rascunho?",acoes_plural:"A\xE7\xF5es",acao_singular:"A\xE7\xE3o",definidas_plural:"definidas",definida_singular:"definida",renomear_tooltip:"Clique para renomear esta task",renomear_hint:"\u270E Renomear",substituir_rascunho_confirm:"Isso vai substituir o rascunho atual da nota. Deseja continuar?",salvar_como_atalho:"Salvar como atalho do Ctrl+K",atalho_nome_pergunta:"Como este atalho vai se chamar no Ctrl+K?",atalho_salvo:"Atalho salvo! J\xE1 aparece no Ctrl+K.",atalho_salvo_local:"Atalho salvo neste navegador (sem conex\xE3o com a nuvem).",atalho_limite:"Voc\xEA j\xE1 tem {max} atalhos. Apague um em Configura\xE7\xF5es antes de criar outro.",atalho_cenario_sumiu:"Este atalho apontava para um cen\xE1rio que n\xE3o existe mais. Revise-o em Configura\xE7\xF5es.",restaurar_rascunho_confirm:"Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?",cole_link_placeholder:"Cole o link aqui...",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",screenshots_aviso:"Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria.",caso_portugal:"Caso da Europa?",consentiu_gravacao:"\u23FA\uFE0F Anunciante consentiu com a grava\xE7\xE3o?",sim:"Sim",nao:"N\xE3o",pronto_comecar:"Pronto para come\xE7ar?",selecione_status_ajuda:"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Task(s) solicitada(s):",passos_executados:"\u{1F463} O que foi feito:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 D\xFAvidas do anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implementadas na call:",proximos_passos:"\u{1F680} Pr\xF3ximos passos (Acompanhamento):",consideracoes:"\u{1F4A1} Considera\xE7\xF5es adicionais:",contexto_call:"\u{1F4AC} Contexto/O que foi feito:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Minha A\xE7\xE3o:",dia:"\u{1F4C5} Dia do Follow-up (se aplic\xE1vel):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Data do reagendamento:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evid\xEAncias de Contato",evidencia:"Evid\xEAncia",nota_criada_rodape:"Nota criada atrav\xE9s do Cases Wizard.",ligacao_1:"Liga\xE7\xE3o 1",ligacao_2:"Liga\xE7\xE3o 2",mensagem_am:"Mensagem para AM",tentativa_ligacao:"\u{1F4DE} Tentativa de liga\xE7\xE3o:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"Seleccione",substatus:"Subestado:",select_substatus:"Seleccione el Estado",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",preencher_email_automaticamente:"\xBFRellenar correo autom\xE1ticamente?",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",trechos:"Fragmentos",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",atalhos_ajuda:"Atajos para las implementaciones m\xE1s frecuentes.<br>Use la b\xFAsqueda de abajo para el cat\xE1logo completo.",nenhum_resultado:"Sin resultados.",alternar_split:"Cambiar a Split & Transfer",preencha_obrigatorio:"Rellene el campo obligatorio antes de generar",selecione_task_gerar:"Seleccione al menos una tarea antes de generar la nota.",nota_nao_abriu:"No se pudo abrir la nota en el CRM. El contenido ya est\xE1 copiado: p\xE9guelo manualmente.",sessao_restaurada:"\xA1Sesi\xF3n restaurada!",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",link_aqui:"Enlace aqu\xED",tag_support_output_label:"\xBFUtiliz\xF3 Tag Support?",motivo_output_label:"Motivo:",auto_busca:"\u2728 B\xFAsqueda Autom\xE1tica",utilize_marcadores:"Utiliza vi\xF1etas para detallar...",descreva_consideracoes:"Describe las consideraciones...",remover:"Eliminar",remover_campo_confirm:'\xBFEliminar el campo "{campo}"?',meus_rascunhos:"Mis Borradores",confirmar_guardar_rascunho:"\xBFDesea guardar el borrador actual y limpiar los campos?",rascunho_salvo_sucesso:"\xA1Borrador guardado con \xE9xito!",erro_ler_dados:"Error: No fue posible leer los datos.",erro_ao_salvar:"Error al guardar.",cliente_sem_nome:"Cliente Sin Nombre",sem_status:"Sin Estado",retomar_caso:"Retomar Caso",descartar:"Descartar",retomar_rascunho_confirm:"\xBFRetomar este borrador? El formulario actual ser\xE1 reemplazado.",rascunho_carregado:"Borrador cargado.",excluir_rascunho_confirm:"\xBFEliminar este borrador?",acoes_plural:"Acciones",acao_singular:"Acci\xF3n",definidas_plural:"definidas",definida_singular:"definida",renomear_tooltip:"Haz clic para renombrar esta tarea",renomear_hint:"\u270E Renombrar",substituir_rascunho_confirm:"Esto reemplazar\xE1 el borrador actual de la nota. \xBFDeseas continuar?",salvar_como_atalho:"Guardar como atajo de Ctrl+K",atalho_nome_pergunta:"\xBFC\xF3mo se va a llamar este atajo en el Ctrl+K?",atalho_salvo:"\xA1Atajo guardado! Ya aparece en el Ctrl+K.",atalho_salvo_local:"Atajo guardado en este navegador (sin conexi\xF3n con la nube).",atalho_limite:"Ya tienes {max} atajos. Elimina uno en Configuraci\xF3n antes de crear otro.",atalho_cenario_sumiu:"Este atajo apuntaba a un escenario que ya no existe. Rev\xEDsalo en Configuraci\xF3n.",restaurar_rascunho_confirm:"Detectamos un borrador sin guardar de tu \xFAltima sesi\xF3n. \xBFDeseas restaurarlo?",cole_link_placeholder:"Pega el enlace aqu\xED...",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",screenshots_aviso:"Los screenshots siguen las directrices actuales de Win Criteria y las pol\xEDticas de Tag Support.",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Europa?",consentiu_gravacao:"\u23FA\uFE0F \xBFEl anunciante consinti\xF3 la grabaci\xF3n?",sim:"S\xED",nao:"No",pronto_comecar:"\xBFListo para empezar?",selecione_status_ajuda:"Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Tarea(s) solicitada(s):",passos_executados:"\u{1F463} Qu\xE9 se hizo:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 Dudas del anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resoluciones/Explicaciones:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tareas implementadas en la call:",proximos_passos:"\u{1F680} Pr\xF3ximos pasos:",consideracoes:"\u{1F4A1} Consideraciones adicionales:",contexto_call:"\u{1F4AC} Contexto/Qu\xE9 se hizo:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Mi Acci\xF3n:",dia:"\u{1F4C5} D\xEDa de Follow-up (si aplica):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Fecha de reprogramaci\xF3n:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evidencias de Contacto",evidencia:"Evidencia",nota_criada_rodape:"Nota creada a trav\xE9s de Cases Wizard.",ligacao_1:"Llamada 1",ligacao_2:"Llamada 2",mensagem_am:"Mensaje para AM",tentativa_ligacao:"\u{1F4DE} Intento de llamada:"},en:{idioma:"Language:",fluxo:"Flow:",status_principal:"Main Status:",select_status:"Select",substatus:"Substatus:",select_substatus:"Select the Status",cenarios_comuns:"Common Scenarios",selecione_tasks:"Select the Tasks",preencha_detalhes:"Fill In the Details",copiar:"Copy",preencher:"Fill in",limpar:"Clear",preencher_email_automaticamente:"Fill in the email automatically?",gostaria_de_adicionar_uma_task:"I would like to add a task",rascunhos_salvos:"Saved Drafts",nenhum_rascunho:"No drafts saved",guardar:"Park",trechos:"Snippets",acesso_rapido:"Quick Access",buscar_catalogo:"Search the catalog...",atalhos_ajuda:"Shortcuts for the most frequent implementations.<br>Use the search below for the full catalog.",nenhum_resultado:"No results.",alternar_split:"Switch to Split & Transfer",preencha_obrigatorio:"Fill in the required field before generating",selecione_task_gerar:"Select at least one task before generating the note.",nota_nao_abriu:"Could not open the note in the CRM. The content is already copied \u2014 paste it manually.",sessao_restaurada:"Session restored!",selecione_tarefas:"Select tasks to see the fields.",utilizou_tag_support:"Did you use Tag Support to create/verify?",motivo_ts:"What was the reason?",lembre_preencher_form:"Remember to fill in the Form!",link_aqui:"Link here",tag_support_output_label:"Used Tag Support?",motivo_output_label:"Reason:",auto_busca:"\u2728 Auto Search",utilize_marcadores:"Use bullets to add detail...",descreva_consideracoes:"Describe the considerations...",remover:"Remove",remover_campo_confirm:'Remove the field "{campo}"?',meus_rascunhos:"My Drafts",confirmar_guardar_rascunho:"Park the current draft and clear the fields?",rascunho_salvo_sucesso:"Draft saved successfully!",erro_ler_dados:"Error: could not read the data.",erro_ao_salvar:"Error saving.",cliente_sem_nome:"Unnamed Customer",sem_status:"No Status",retomar_caso:"Resume Case",descartar:"Discard",retomar_rascunho_confirm:"Resume this draft? The current form will be replaced.",rascunho_carregado:"Draft loaded.",excluir_rascunho_confirm:"Delete this draft?",acoes_plural:"Actions",acao_singular:"Action",definidas_plural:"defined",definida_singular:"defined",renomear_tooltip:"Click to rename this task",renomear_hint:"\u270E Rename",substituir_rascunho_confirm:"This will replace the current note draft. Do you want to continue?",salvar_como_atalho:"Save as a Ctrl+K shortcut",atalho_nome_pergunta:"What should this shortcut be called in Ctrl+K?",atalho_salvo:"Shortcut saved! It already shows up in Ctrl+K.",atalho_salvo_local:"Shortcut saved in this browser (no cloud connection).",atalho_limite:"You already have {max} shortcuts. Delete one in Settings before creating another.",atalho_cenario_sumiu:"This shortcut pointed to a scenario that no longer exists. Review it in Settings.",restaurar_rascunho_confirm:"We found an unsaved draft from your last session. Would you like to restore it?",cole_link_placeholder:"Paste the link here...",copiado_sucesso:"Text copied successfully",inserido_copiado:"Text inserted and copied!",campo_nao_encontrado:"Field not found. The text has already been copied.",ts_disclaimer:"Screenshots are not required for conversions created/verified by Tag Support",screenshots_aviso:"Screenshots follow the current Win Criteria guidelines and Tag Support policies.",incluir_mesmo_assim:"Include anyway",ajuda_scenarios:"How do I use Scenarios?",ajuda_scenarios_desc:"Scenarios fill in several note fields automatically. Click a chip to apply it. You can combine several scenarios (e.g.: GTM Installation + WhatsApp).",ts_output_disclaimer:"Tag created/verified by Tag Support, as the note automatically added to the case indicates. I am not including the screenshots, in line with the Win Criteria guidance.",caso_portugal:"Europe case?",consentiu_gravacao:"\u23FA\uFE0F Did the advertiser consent to the recording?",sim:"Yes",nao:"No",pronto_comecar:"Ready to start?",selecione_status_ajuda:"Select a status and substatus to<br>start your technical note.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Requested task(s):",passos_executados:"\u{1F463} What was done:",resultado:"\u{1F3C6} Result:",duvidas:"\u2753 Advertiser questions:",problemas:"\u26A0\uFE0F Initial problem:",resolucoes:"\u2705 Resolutions/Explanations:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verified:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implemented on the call:",proximos_passos:"\u{1F680} Next steps (Follow-up):",consideracoes:"\u{1F4A1} Additional considerations:",contexto_call:"\u{1F4AC} Context/What was done:",impedimento_cliente:"\u{1F6A7} Blocker / Next step (Advertiser):",minha_acao:"\u{1F468}\u200D\u{1F4BB} My Action:",dia:"\u{1F4C5} Follow-up day (if applicable):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Rescheduling date:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Contact Evidence",evidencia:"Evidence",nota_criada_rodape:"Note created through Cases Wizard.",ligacao_1:"Call 1",ligacao_2:"Call 2",mensagem_am:"Message to the AM",tentativa_ligacao:"\u{1F4DE} Call attempt:"}},Pe={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},cc={"GTM Instalado":"GTM Instalado","Vinculador de convers\xF5es":"Vinculador de conversiones","Tag criada":"Etiqueta creada","Teste GTM":"Prueba GTM","Teste Ads":"Prueba Ads","Vers\xE3o Publicada":"Versi\xF3n Publicada","Status Ads":"Estado Ads","Termos aceitos no Ads":"T\xE9rminos aceptados en Ads","Tag implementada":"Etiqueta implementada","Painel do Ads (ap\xF3s 7 dias)":"Panel de Ads (despu\xE9s de 7 d\xEDas)","Tag do evento GA4 implementado no GTM":"Etiqueta del evento GA4 implementada en GTM","Teste GTM (tagassistant.google.com)":"Prueba GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)":"Prueba GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM":"Versi\xF3n publicada en GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4":"(Si hay par\xE1metros) Dimensiones personalizadas creadas en GA4","Evento marcado como principal no GA4":"Evento marcado como principal en GA4","GA4 e Google Ads vinculados corretamente":"GA4 y Google Ads vinculados correctamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)":"Evento principal de GA4 importado en Google Ads (como secundario)","M\xE9tricas app & web ativadas no Google Ads":"M\xE9tricas app y web activadas en Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)":"(Opcional) Prueba en el Informe de Tiempo Real (GA4)","Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)":"Validaci\xF3n: Cuenta GA4 (solo flujo web, no es sector salud)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)':'"Recopilaci\xF3n de datos proporcionados por el usuario" habilitada en GA4 (Administrador > Recopilaci\xF3n de Datos)',"Confirma\xE7\xE3o de coleta de dados (UI)":"Confirmaci\xF3n de recopilaci\xF3n de datos (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM":"Etiqueta del evento GA4 optimizado (UPD) implementada en GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)":"Prueba GTM (tagassistant - par\xE1metro 'em' sin error)","Teste GA4 (DebugView - tagassistant)":"Prueba GA4 (DebugView - tagassistant)","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio":"(Capacitaci\xF3n) Evento principal importado en Google Ads como secundario","Tag implementado no GTM":"Etiqueta implementada en GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo":"Prueba del disparo de la etiqueta de configuraci\xF3n en tag assistant en m\xE1s de una p\xE1gina, mostrando ID y etiqueta","Teste usando o #google-wcc-debug":"Prueba usando #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]":"Cambio del estado de la conversi\xF3n en Google Ads [Esperar algunos minutos]","1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas":"1. OGT (gTag/GTM con etiqueta de vinculador de conversi\xF3n) a\xF1adido en todas las p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)":"2. El etiquetado autom\xE1tico (auto tagging) est\xE1 habilitado en Google Ads (Administrador > Config. de la Cuenta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".':'3. [Si es GTM] El vinculador de conversi\xF3n est\xE1 presente y el activador definido para dispararse en "Todas las P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?":"4. \xBFEl gclid se mantiene sin redirecciones y se almacena en la cookie _gcl_aw en la landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?":"5. \xBFEl gclid fue pasado a la p\xE1gina de conversi\xF3n?"},dc={"GTM Instalado":"GTM Installed","Vinculador de convers\xF5es":"Conversion Linker","Tag criada":"Tag created","Teste GTM":"GTM test","Teste Ads":"Ads test","Vers\xE3o Publicada":"Published Version","Status Ads":"Ads Status","Termos aceitos no Ads":"Terms accepted in Ads","Tag implementada":"Tag implemented","Painel do Ads (ap\xF3s 7 dias)":"Ads dashboard (after 7 days)","Tag do evento GA4 implementado no GTM":"GA4 event tag implemented in GTM","Teste GTM (tagassistant.google.com)":"GTM test (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)":"GA4 test (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM":"Version published in GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4":"(If there are parameters) Custom dimensions created in GA4","Evento marcado como principal no GA4":"Event marked as key event in GA4","GA4 e Google Ads vinculados corretamente":"GA4 and Google Ads linked correctly","Evento principal GA4 importado no Google Ads (como secund\xE1rio)":"GA4 key event imported into Google Ads (as secondary)","M\xE9tricas app & web ativadas no Google Ads":"App & web metrics enabled in Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)":"(Optional) Test in the Realtime report (GA4)","Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)":"Validation: GA4 account (web stream only, not healthcare)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)':'"User-provided data collection" enabled in GA4 (Admin > Data Collection)',"Confirma\xE7\xE3o de coleta de dados (UI)":"Data collection confirmation (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM":"Optimized GA4 event tag (UPD) implemented in GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)":"GTM test (tagassistant - 'em' parameter with no error)","Teste GA4 (DebugView - tagassistant)":"GA4 test (DebugView - tagassistant)","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio":"(Training) Key event imported into Google Ads as secondary","Tag implementado no GTM":"Tag implemented in GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo":"Test of the configuration tag firing in tag assistant on more than one page, showing ID and label","Teste usando o #google-wcc-debug":"Test using #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]":"Change of the conversion status in Google Ads [Wait a few minutes]","1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas":"1. OGT (gTag/GTM with Conversion Linker tag) added on all pages","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)":"2. Auto tagging is enabled in Google Ads (Admin > Account Settings)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".':'3. [If GTM] The Conversion Linker is present and the trigger set to fire on "All Pages".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?":"4. Is the gclid being kept without redirects and stored in the _gcl_aw cookie on the landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?":"5. Was the gclid passed to the conversion page?"},pc={es:cc,en:dc};function _i(e,t,a){let o=e?.screenshots?.[t]||[],i=pc[a];if(!i)return o;let n=e?.[`screenshots_${a}`]?.[t],r=s=>String(n?.[s]==null?"":n[s]).trim();return e?.daCentral?o.map((s,l)=>r(l)||s):Array.isArray(n)?o.map((s,l)=>r(l)||i[s]||s):o.map(s=>i[s]||s)}function Oi(e,t,a){let o=e?.[`fieldPrefixes_${a}`]?.[t];return o||e?.fieldPrefixes?.[t]||""}function eo(e,t,a){let o={es:no,en:io}[t];if(!o)return e;let i=o[a];return i?{...e,...i}:e}function to(e,t){return Object.entries(St).filter(([,a])=>{let o=!a.type||a.type==="all"||a.type===t,i=Array.isArray(a.substatus)&&a.substatus.includes(e);return o&&i})}function $t(e,t){let a=String(e||"");if(a.startsWith("quickfill-"))return a.slice(10);if(t){let i=`cw-${String(t).toLowerCase()}-`;if(a.startsWith(i))return a.slice(i.length)}let o=a.match(/^cw-[a-z0-9_]+-(.+)$/);return o?o[1]:a}function ao(e,t){return $t(e,t).replace(/-/g," ")}var uc=["GTM_GA4_VERIFICADO","MULTIPLE_CIDS"],mc=["REASON_COMMENTS"];function Na(e){let t=[...mc];return e?.requiresTasks&&t.push("GTM_GA4_VERIFICADO"),t}function Di(e){let t=[...uc,...e?.extraOptionalFields||[]],a=Na(e);return t.filter(o=>!a.includes(o))}var Ue={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Caso Reagendado."},fieldPrefixes_es:{REASON_COMMENTS:"Caso Reprogramado."},fieldPrefixes_en:{REASON_COMMENTS:"Case Rescheduled."}},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Reagendamento aceit\xE1vel."},fieldPrefixes_es:{REASON_COMMENTS:"Reprogramaci\xF3n aceptable."},fieldPrefixes_en:{REASON_COMMENTS:"Acceptable rescheduling."}},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","DIA","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Aguardando Valida\xE7\xF5es no Google Ads."},fieldPrefixes_es:{REASON_COMMENTS:"Esperando Validaciones en Google Ads."},fieldPrefixes_en:{REASON_COMMENTS:"Awaiting Validations in Google Ads."}},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES"]},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","TENTATIVA_LIGACAO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PASSOS_EXECUTADOS","RESULTADO","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["PROXIMOS_PASSOS"],fieldPrefixes:{REASON_COMMENTS:"Task implementada com sucesso."},fieldPrefixes_es:{REASON_COMMENTS:"Tarea implementada con \xE9xito."},fieldPrefixes_en:{REASON_COMMENTS:"Task implemented successfully."}},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","DUVIDAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["PROXIMOS_PASSOS","CONSIDERACOES"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para tirar d\xFAvidas do anunciante."},fieldPrefixes_es:{REASON_COMMENTS:"Consultor\xEDa utilizada para resolver dudas del anunciante."},fieldPrefixes_en:{REASON_COMMENTS:"Consultation used to answer the advertiser\u2019s questions."}},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PROBLEMAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para testar e solucinar problemas da convers\xE3o."},fieldPrefixes_es:{REASON_COMMENTS:"Consultor\xEDa utilizada para probar y solucionar problemas de la conversi\xF3n."},fieldPrefixes_en:{REASON_COMMENTS:"Consultation used to test and troubleshoot the conversion."}},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,templateFields:["SPEAKEASY_ID","label_substatus","REASON_COMMENTS","COMENTARIOS"],customFooter:"Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},na={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},ia=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],oo=["CONSIDERACOES","COMENTARIOS"],St={"quickfill-gtm-install":{type:"all",substatus:["SO_Implementation_Only"],"field-REASON_COMMENTS":"Instala\xE7\xE3o do GTM finalizada.","field-TASKS_SOLICITADAS":"\u2022 Instala\xE7\xE3o do GTM","field-PASSOS_EXECUTADOS":`\u2022 Criamos a conta dentro do GTM
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

Irei abrir caso em BAU para o dia solicitado e pedir a inativa\xE7\xE3o do mesmo.`}},no={"quickfill-gtm-install":{"field-REASON_COMMENTS":"Instalaci\xF3n de GTM finalizada.","field-TASKS_SOLICITADAS":"\u2022 Instalaci\xF3n de GTM","field-PASSOS_EXECUTADOS":`\u2022 Creamos la cuenta dentro de GTM
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

Abrir\xE9 un caso en BAU para el d\xEDa solicitado y pedir\xE9 la inactivaci\xF3n del mismo.`}},io={"quickfill-gtm-install":{"field-REASON_COMMENTS":"GTM installation completed.","field-TASKS_SOLICITADAS":"\u2022 GTM Installation","field-PASSOS_EXECUTADOS":`\u2022 We created the account inside GTM
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

I will open a BAU case for the requested day and ask for it to be inactivated.`}};var Mi={pt:{searching:"Buscando ID...",readingMessage:"Lendo mensagem...",idFound:e=>`ID Localizado: ${e}`,noIdFound:"Nenhum ID encontrado.",notFound:"N\xE3o encontrado",processingError:"Erro ao processar."},es:{searching:"Buscando ID...",readingMessage:"Leyendo mensaje...",idFound:e=>`ID Encontrado: ${e}`,noIdFound:"Ning\xFAn ID encontrado.",notFound:"No encontrado",processingError:"Error al procesar."},en:{searching:"Searching for ID...",readingMessage:"Reading message...",idFound:e=>`ID found: ${e}`,noIdFound:"No ID found.",notFound:"Not found",processingError:"Processing error."}};function ra(e){let t=se();return Mi[t]?.[e]??Mi.pt[e]}var qi="cw-automation-styles";if(!document.getElementById(qi)){let e=document.createElement("style");e.id=qi,e.innerHTML=`
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
            z-index: ${je.PAGE_SPOTLIGHT_TARGET} !important; 
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
            z-index: ${je.PAGE_SPOTLIGHT_OVERLAY};   /* Fica atr\xE1s do Input */
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: all;                  /* Bloqueia cliques na p\xE1gina */
        }
    `,document.head.appendChild(e)}function Fi(e){let t=document.getElementById("cw-loading-overlay");e?t?t.style.opacity="1":(t=document.createElement("div"),t.id="cw-loading-overlay",document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1")):t&&(t.style.opacity="0",setTimeout(()=>t.remove(),300))}async function ro(e){await Aa();let t=typeof e=="string"?document.getElementById(e):e,a="";Fi(!0),t&&(a=t.placeholder,t.placeholder=ra("searching"),t.value="",t.classList.add("cw-scanning-active"));try{let o=document.querySelector('material-button[debug-id="dock-item-case-log"]');o&&!o.classList.contains("selected")&&(Ft(o),await be(1200));let i=document.querySelector("search-filter dropdown-button .button");if(i&&!(i.innerText||"").includes("All")){Ft(i),await be(600);let u=document.querySelector('material-checkbox[debug-id="check-all-box"]');u&&u.getAttribute("aria-checked")!=="true"&&(Ft(u),await be(300));let h=document.querySelector('material-button[debug-id="apply-filter"]');h&&(Ft(h),await be(1500))}let n=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");n&&(n.scrollTop=n.scrollHeight,await be(500));let r=Array.from(document.querySelectorAll(".message-header"));for(let A=r.length-1;A>=0;A--){let u=r[A],h=u.querySelector("i.material-icons-extended"),N=h&&h.innerText.trim()==="phone_in_talk",v=u.innerText||"",I=v.includes("Agent joined")||v.includes("outbound-call")||v.includes("Speakeasy");if(N||I){u.getAttribute("aria-expanded")==="true"||(t&&(t.placeholder=ra("readingMessage")),Ft(u),await be(1e3));break}}let l=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),p=/Speakeasy.*?(P\d{15,25})/i,d=null;for(let A=l.length-1;A>=0;A--){let u=l[A];if(u.offsetParent===null)continue;let h=(u.innerText||"").match(p);if(h&&h[1]){d=h[1];break}}if(t)if(d){try{await navigator.clipboard.writeText(d)}catch{}t.tagName==="INPUT"||t.tagName==="TEXTAREA"?t.value=d:t.textContent=d,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),y.playReady(),Yt("confirma"),te(ra("idFound")(d)),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}else y.playError(),Yt("erro"),te(ra("noIdFound"),{error:!0}),t.placeholder=ra("notFound"),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}catch(o){console.error("Erro na automa\xE7\xE3o:",o),y.playError(),te(ra("processingError"),{error:!0})}finally{t&&(t.classList.remove("cw-scanning-active"),t.value||(t.placeholder=a)),Fi(!1)}}function Ri(e){e.dataset.bulletEnabled!=="true"&&(e.dataset.bulletEnabled="true",(e.value.trim()===""||e.value.trim()==="\u2022")&&(e.value="\u2022 "),e.addEventListener("keydown",function(t){let a=this.selectionStart,o=this.selectionEnd,i=this.value,n=i.lastIndexOf(`
`,a-1)+1,r=i.substring(n,a);if(t.key==="Enter"){t.preventDefault();let s=r.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(r.trim()==="\u2022"){this.value=i.substring(0,n)+`
`+i.substring(o),this.selectionStart=this.selectionEnd=n+1;return}let l=`
`+s;this.value=i.substring(0,a)+l+i.substring(o),this.selectionStart=this.selectionEnd=a+l.length}else if(t.key==="Tab")t.preventDefault(),t.shiftKey?r.startsWith("  ")&&(this.value=i.substring(0,n)+r.substring(2)+i.substring(a),this.selectionStart=this.selectionEnd=a-2):(this.value=i.substring(0,n)+"  "+r+i.substring(a),this.selectionStart=this.selectionEnd=a+2);else if(t.key==="Backspace"&&a===o&&a>0){let s=i.substring(0,a);s.endsWith("\u2022 ")?(t.preventDefault(),this.value=s.substring(0,a-2)+i.substring(o),this.selectionStart=this.selectionEnd=a-2):s.endsWith("  ")&&r.trim().startsWith("\u2022")&&(t.preventDefault(),this.value=s.substring(0,a-2)+i.substring(o),this.selectionStart=this.selectionEnd=a-2)}}))}var Yo=(e,t)=>xt[e.currentLang]?.[t]||xt.pt?.[t]||t,Ko=e=>xt[se()]?.[e]||xt.pt?.[e]||e;function _a(e,t,a){t.innerHTML="";let o=Ue[e];if(!o)return;let i=Na(o);if(a.activeFields.forEach(r=>{if(["TAGS_IMPLEMENTED","SCREENSHOTS_LIST","CONSENTIU_GRAVACAO","CASO_PORTUGAL","label_substatus"].includes(r))return;let s=`field-${r}`,l=document.createElement("label"),p=h=>Yo(a,h);l.textContent=p(r.toLowerCase())!==r.toLowerCase()?p(r.toLowerCase()):r.replace(/_/g," ").replace(/\b\w/g,h=>h.toUpperCase())+":",Object.assign(l.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px",fontWeight:"700",color:G.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let d=i.includes(r),A=document.createElement("span");if(A.textContent=l.textContent,d){let h=document.createElement("span");h.textContent=" *",h.style.color=G.error,A.appendChild(h)}if(l.innerHTML="",l.appendChild(A),r==="SPEAKEASY_ID"){let h=document.createElement("button");h.innerHTML=Ko("auto_busca"),h.style.cssText=`font-size: 11px; font-weight: 700; color: ${G.primary}; background-color: ${G.primaryBg}; border: none; border-radius: ${$e.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${Ce};`,h.onmouseenter=()=>h.style.backgroundColor="#d2e3fc",h.onmouseleave=()=>h.style.backgroundColor=G.primaryBg,h.onclick=N=>{N.preventDefault(),y.playClick(),ro(s)},l.appendChild(h)}if(!d){let h=document.createElement("button");h.innerHTML="\u2715",h.style.cssText=`font-size: 14px; background: ${G.bgInput}; border: none; color: ${G.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${Ce};`,h.onmouseenter=()=>{h.style.background=G.error,h.style.color=G.surface},h.onmouseleave=()=>{h.style.background=G.bgInput,h.style.color=G.textSub},h.onclick=async N=>{N.preventDefault(),y.playClick();let v=A.textContent.replace(/:\s*$/,"").trim();await Ye(Ko("remover_campo_confirm").replace("{campo}",v),{danger:!0,confirmText:Ko("remover")})&&(a.removeField(r),_a(e,t,a))},l.appendChild(h)}let u;ia.includes(r)?(u=document.createElement("textarea"),u.classList.add("bullet-textarea","cw-textarea"),u.placeholder=p("utilize_marcadores"),Ri(u)):oo.includes(r)?(u=document.createElement("textarea"),u.classList.add("cw-textarea"),u.placeholder=p("descreva_consideracoes")):(u=document.createElement("input"),u.type="text",u.classList.add("cw-input")),u.id=s,u.value=a.formData[s]||"",u.addEventListener("input",h=>a.updateField(s,h.target.value)),t.appendChild(l),t.appendChild(u)}),a.activeFields.includes("CONSENTIU_GRAVACAO")){let r=p=>Yo(a,p),s=document.createElement("label");s.textContent=r("consentiu_gravacao"),Object.assign(s.style,{display:"block",fontSize:"13px",fontWeight:"700",color:G.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let l=document.createElement("select");l.className="cw-select",l.innerHTML=`
            <option value="false">${r("nao")}</option>
            <option value="true">${r("sim")}</option>
        `,l.value=a.consent?"true":"false",l.onchange=()=>a.setConsent(l.value==="true"),t.appendChild(s),t.appendChild(l)}let n=(o.templateFields||[]).filter(r=>!i.includes(r)&&!a.activeFields.includes(r));if(n.length>0){let r=l=>Yo(a,l),s=document.createElement("div");Object.assign(s.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginTop:"24px"}),n.forEach(l=>{let p=r(l.toLowerCase())!==l.toLowerCase()?r(l.toLowerCase()):l.replace(/_/g," ").replace(/\b\w/g,A=>A.toUpperCase())+":",d=document.createElement("button");d.type="button",d.textContent=`+ ${p.replace(/:$/,"")}`,d.style.cssText=`font-size: 12px; font-weight: 600; color: ${G.primary}; background-color: ${G.primaryBg}; border: none; border-radius: ${$e.pill}; padding: 6px 14px; cursor: pointer; transition: all 0.2s ${Ce};`,d.onmouseenter=()=>d.style.backgroundColor="#d2e3fc",d.onmouseleave=()=>d.style.backgroundColor=G.primaryBg,d.onclick=A=>{A.preventDefault(),y.playClick(),a.addFieldAt(l,a.activeFields.length),_a(e,t,a)},s.appendChild(d)}),t.appendChild(s)}}var Xo={ES:{...no},EN:{...io},substatus:Object.fromEntries(Object.entries(St).map(([e,t])=>[e,t.substatus||[]]))};function gc(e,t,a){let o=$t(t,a[0]),i=Object.keys(Xo[e]).find(n=>{let r=Xo.substatus[n]||[];return $t(n,r[0])===o&&a.some(s=>r.includes(s))});return i?Xo[e][i]:void 0}function fc(e){let t=String(e.label||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");return`cw-${String(e.key||"").toLowerCase()}-${t}`}function bc(e){let t;try{t=JSON.parse(e||"{}")}catch{return null}let a=t.fields||{};return Object.keys(a).length?{fields:a,linkedTask:t.linkedTask,activeTasks:t.activeTasks}:null}function zi(e){if(!Array.isArray(e)||!e.length)return!1;let t={},a={ES:{},EN:{}},o=e.slice().sort((i,n)=>(i.sortOrder||0)-(n.sortOrder||0));for(let i of o){if(!i.key)continue;let n=bc(i.value);if(!n)continue;let r=fc(i),s=String(i.lang||"").toUpperCase(),l=a[s];if(l){l[r]={...n.fields};continue}s&&s!=="PT"&&s!=="ALL"||(t[r]={type:(i.field||"all").toLowerCase(),substatus:[i.key],...n.fields,...n.linkedTask?{linkedTask:n.linkedTask}:{},...n.activeTasks?{activeTasks:n.activeTasks}:{}})}if(!Object.keys(t).length)return!1;for(let i of Object.keys(St))delete St[i];Object.assign(St,t);for(let[i,n]of[["ES",no],["EN",io]]){let r={};for(let[s,l]of Object.entries(t)){let p=gc(i,s,l.substatus);p&&(r[s]=p)}Object.assign(r,a[i]);for(let s of Object.keys(n))delete n[s];Object.assign(n,r)}return!0}async function $i(){let e=fe.getCachedContent("note_template"),t=zi(e);try{let a=await fe.fetchContentModule("note_template");t=zi(a)||t}catch(a){console.warn("Modelos de nota indispon\xEDveis; usando os embutidos.",a)}return t}function hc(e){let t;try{t=JSON.parse(e||"{}")}catch{return null}let a=String(t.name||"").trim();if(!a)return null;let o=t.screenshots||{},i=Array.isArray(o.implementation)?o.implementation:[],n=Array.isArray(o.education)?o.education:[],r={name:a,daCentral:!0,screenshots:{implementation:i,education:n}};t.popular===!0&&(r.popular=!0);for(let s of["es","en"]){let l=`screenshots_${s}`,p=t[l];!p||!(Array.isArray(p.implementation)||Array.isArray(p.education))||(r[l]={},Array.isArray(p.implementation)&&(r[l].implementation=p.implementation),Array.isArray(p.education)&&(r[l].education=p.education))}return r}function Pi(e){if(!Array.isArray(e)||!e.length)return!1;let t={},a=e.slice().sort((o,i)=>(o.sortOrder||0)-(i.sortOrder||0));for(let o of a){let i=String(o.key||"").trim();if(!i)continue;let n=hc(o.value);n&&(t[i]=n)}if(!Object.keys(t).length)return!1;for(let o of Object.keys(Pe))delete Pe[o];return Object.assign(Pe,t),!0}var Gi=new Set,Jo=null;function Bi(){for(let e of Gi)try{e()}catch(t){console.warn("Assinante do cat\xE1logo de tasks falhou.",t)}}async function xc(){let e=fe.getCachedContent("task_screenshots"),t=Pi(e);t&&Bi();try{let a=await fe.fetchContentModule("task_screenshots");Pi(a)&&(t=!0,Bi())}catch(a){console.warn("Cat\xE1logo de tasks indispon\xEDvel; usando o embutido.",a)}return t}function so(e){return e&&Gi.add(e),Jo||(Jo=xc()),Jo}function Qo(e,t,a,o=null){let i=e.currentSubStatus;if(!i)return null;let n=Ue[i],r=xt[e.currentLang]||xt.pt,s=d=>r[d]||xt.pt?.[d]||d,l='style="margin-bottom: 12px; padding-left: 30px;"',p="";if(e.activeFields.forEach(d=>{let A=s(d.toLowerCase()),u="N/A";if(d==="label_substatus")A=s("label_substatus"),u=n.name;else if(d==="TAGS_IMPLEMENTED"){A=s("tags_implemented");let h=[];t.getCheckedElements().forEach(v=>{let I=v.value,z=Pe[I],U=v.count||1,B=I==="ads_conversion_tracking"||I==="ads_enhanced_conversions";e.tagSupportUsed&&B&&!e.forcedScreenshots.has(I)?h.push(`${z.name} - ${s("ts_output_disclaimer")}`):h.push(U>1?`${z.name} (x${U})`:z.name)}),u=h.join(", ")||"N/A"}else if(d==="SCREENSHOTS_LIST"){A=s("screenshots_list");let h="",N=t.screenshotsElement;N&&Array.from(N.querySelectorAll('input[id^="name-"]')).forEach(I=>{let z=I.value,U=I.closest(".cw-screen-card");if(U){let B=U.querySelectorAll('input[id^="screen-"]'),x=!1,K="";B.forEach(W=>{let O=W.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||s("evidencia"),k=W.value.trim();k&&(K+=`<li>${O} - ${k}</li>`,x=!0)}),x&&(h+=`<div style="margin-bottom: 8px;"><b>${z}</b><ul ${l}>${K}</ul></div>`)}}),u=h||"N/A"}else if(d==="CASO_PORTUGAL")A=s("caso_portugal"),u=s("sim");else if(d==="CONSENTIU_GRAVACAO")A=s("consentiu_gravacao"),u=e.consent?s("sim"):s("nao");else{let h=`field-${d}`,N=e.formData[h],v=Oi(n,d,e.currentLang),I=v?v+" ":"";if(N&&N.trim()!==""&&N.trim()!=="\u2022"){let z=N.trim();if(ia.includes(d)){let U=z.split(`
`).map(B=>B.trim()).filter(B=>B!==""&&B!=="\u2022").map(B=>B.startsWith("\u2022 ")?B.substring(2):B).map(B=>`<li>${B}</li>`).join("");u=U?`${I}<ul ${l}>${U}</ul>`:"N/A"}else oo.includes(d)?u=I+z.split(`
`).filter(U=>U.trim()!=="").map(U=>`<p style="margin: 0 0 8px 0;">${U}</p>`).join(""):u=I+z}else I&&(u=I.trim())}p+=`<b>${A}</b><br>${u}<br><br>`}),o){let d="";o.l1&&(d+=`<li>${s("ligacao_1")}: ${o.l1}</li>`),o.l2&&(d+=`<li>${s("ligacao_2")}: ${o.l2}</li>`),o.msg&&(d+=`<li>${s("mensagem_am")}: ${o.msg}</li>`),d&&(p+=`<b>${s("evidencias_contato")}</b><br><ul ${l}>${d}</ul><br>`)}if(n.customFooter&&(p+=`${n.customFooter}<br><br>`),a?.getOutput){let d=a.getOutput();d&&(p+=`${d}<br><br>`)}return p+=`<i>${s("nota_criada_rodape")}</i>`,p.replace(/(<br>\s*){3,}/g,"<br><br>").trim()}var ji={pt:"Passe o mouse sobre um cen\xE1rio para visualizar o texto...",es:"Pasa el mouse sobre un escenario para ver el texto...",en:"Hover over a scenario to preview the text..."};function Zo(){return ji[se()]||ji.pt}function Hi(e){let t=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,a=document.createElement("div");a.className="cw-step-scenarios";let o=document.createElement("div");Object.assign(o.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let i=document.createElement("div");Object.assign(i.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"44px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"});let n=document.createElement("span");n.style.transition="opacity 0.05s ease, transform 0.05s ease",n.textContent=Zo(),i.appendChild(n);let r=new Set,s=null,l=!0;return Le(()=>{l&&(n.textContent=Zo())}),a.render=(p,d)=>{r.clear();let A=to(p,d);o.innerHTML="",A.forEach(([u,h])=>{let N=document.createElement("div");N.textContent=ao(u,p),N.dataset.id=u,N.dataset.sound="hover",Object.assign(N.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"});let v=eo(h,ct(),u),I=v["field-REASON_COMMENTS"]||v["field-CONTEXTO_CALL"]||u;N.onmouseenter=()=>{s&&clearTimeout(s),r.has(u)||(N.style.background="#f1f3f4"),n.style.opacity="0",t||(n.style.transform="translateY(5px)"),s=setTimeout(()=>{l=!1,n.textContent=I.substring(0,120)+(I.length>120?"...":""),n.style.opacity="1",t||(n.style.transform="translateY(0)")},50)},N.onmouseleave=()=>{s&&clearTimeout(s),r.has(u)||(N.style.background="#ffffff"),s=setTimeout(()=>{r.size===0&&(n.style.opacity="0",setTimeout(()=>{l=!0,n.textContent=Zo(),n.style.opacity="1"},50))},100)},N.onclick=()=>{y.playClick();let z=!r.has(u);z?(r.add(u),N.style.background="#e8f0fe",N.style.borderColor="#1a73e8",N.style.color="#1967d2"):(r.delete(u),N.style.background="#ffffff",N.style.borderColor="#dadce0",N.style.color="#3c4043"),e(u,z)},o.appendChild(N)}),A.length===0?a.style.display="none":a.style.display="block"},a.getSelectedIds=()=>[...r],a.appendChild(o),a.appendChild(i),a}function vc(e){return e==="ads_conversion_tracking"||e==="ads_enhanced_conversions"}function en(e,t){return t.tagSupportUsed&&vc(e)&&!t.forcedScreenshots.has(e)}var we={bg:G.bgInput,white:G.surface,border:G.border,textMain:G.text,textSub:G.textSub,blue:G.blue,blueLight:G.primaryBg,brands:{ads:{id:"ads",label:"Google Ads",color:G.blue,bg:G.primaryBg,icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:G.yellow,bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:G.primary,bg:G.primaryBg,icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:G.green,bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Kt={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Ui(e,t,a){let o={};a&&a.subscribe(()=>{O(),k()});function i(T){let E=T.toLowerCase();return E.includes("ads")||E.includes("conversion")||E.includes("remarketing")?we.brands.ads:E.includes("ga4")||E.includes("analytics")?we.brands.ga4:E.includes("gtm")||E.includes("tag manager")||E.includes("container")?we.brands.gtm:E.includes("merchant")||E.includes("shopping")||E.includes("feed")?we.brands.gmc:we.brands.default}let n=[],r={};function s(){n=Object.entries(Pe).filter(([T,E])=>E.popular),r={},Object.entries(Pe).forEach(([T,E])=>{if(E.popular)return;let R=i(E.name);r[R.label]||(r[R.label]={brand:R,tasks:[]}),r[R.label].tasks.push({key:T,...E})})}s();let l="cw-zen-tasks";if(!document.getElementById(l)){let T=document.createElement("style");T.id=l,T.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column;
                font-family: ${we.font}; background: ${we.bg}; position: relative; overflow: visible;
                border-radius: 12px; border: 1px solid ${we.border};
            }
            
            /* SCROLL AREA */
            .cw-zen-content { padding-bottom: 20px; }

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${we.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${we.white}; 
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
                font-size: 12px; font-weight: 500; color: ${we.textMain}; line-height: 1.2; 
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
                color: ${we.textMain}; display: flex; align-items: center; justify-content: center;
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
                border: 1px solid ${we.border}; border-radius: 10px; background: ${we.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${we.blue}; box-shadow: 0 0 0 3px ${we.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${we.border}; border-radius: 10px; background: ${we.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${we.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${we.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${we.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${we.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item:focus-visible, .cw-acc-header:focus-visible { outline: 2px solid ${we.blue}; outline-offset: -2px; }
            .cw-task-item.selected { background: ${we.blueLight}; }
            .cw-task-item.ts-success { background: #F0FDF4 !important; border-left: 4px solid #22C55E; }
            .cw-task-item.ts-success .cw-task-label { color: #166534 !important; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${we.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${we.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS (Lista: quadrado) */
            .cw-step-btn-list {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${we.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn-list:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${we.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: sticky; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${we.border};
                border-bottom-left-radius: 11px;
                border-bottom-right-radius: 11px;
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                visibility: hidden;
                box-shadow: ${we.shadowFloat}; z-index: 10;
                margin-top: auto;
            }
            /* .cw-zen-container usa overflow:visible (pros cards do hero n\xE3o
               cortarem sombra/hover), ent\xE3o sem visibility a barra "escondida"
               via transform continua sendo pintada logo abaixo do card,
               encostando/sobrepondo o que vem depois no layout. */
            .cw-status-bar.visible { transform: translateY(0); visibility: visible; }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${we.textMain}; }
            
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
                font-family: ${we.font}; font-size: 15px; font-weight: 600; color: ${we.textMain};
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
                border-color: ${we.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${we.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${we.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${we.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 11px; font-weight: 700; color: ${we.textSub};
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
        `,document.head.appendChild(T)}let p=document.createElement("div");p.className="cw-zen-container";let d=document.createElement("div");Object.assign(d.style,{display:"none"});let A=document.createElement("div");A.className="cw-screens-container",d.appendChild(A),p.innerHTML=`
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
    `;let u=p.querySelector(".cw-hero-grid"),h=p.querySelector(".cw-acc-container"),N=p.querySelector(".cw-results-container"),v=p.querySelector(".cw-search-input");Ua(p,".cw-acc-header, .cw-task-item");let I=p.querySelector(".cw-status-bar"),z=p.querySelector(".cw-status-text"),U=p.querySelector(".cw-footer-icons");function B(T,E){return R=>{if(R.target.closest(".cw-step-btn-hero, .cw-step-btn-list"))return;let V=o[T]?o[T].count:0;X(T,V>0?-V:1,E)}}function x(){u.innerHTML="",n.forEach(([T,E])=>{let R=i(E.name),V=document.createElement("div");V.className="cw-hero-card",V.id=`hero-${T}`,V.style.setProperty("--hero-color",R.color),V.innerHTML=`
              <div class="cw-hero-main">
                  <div class="cw-hero-icon">${Kt[R.icon]}</div>
                  <div class="cw-hero-label">${E.name}</div>
              </div>
            
              <div class="cw-hero-stepper">
                  <div class="cw-step-btn-hero minus">\u2212</div>
                  <div class="cw-step-val">1</div>
                  <div class="cw-step-btn-hero plus">+</div>
              </div>
          `,V.onclick=B(T,E),V.querySelector(".minus").onclick=()=>X(T,-1,E),V.querySelector(".plus").onclick=()=>X(T,1,E),V.tabIndex=0,V.setAttribute("role","button"),V.setAttribute("aria-pressed","false"),V.addEventListener("keydown",ae=>{(ae.key==="Enter"||ae.key===" ")&&(ae.preventDefault(),V.click())}),V.dataset.color=R.color,u.appendChild(V)})}x();function K(T,E){let R=i(E.name),V=document.createElement("div");return V.className="cw-task-item",V.dataset.id=T,V.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${R.bg}; color:${R.color}">
                    ${Kt[R.icon]||Kt.default}
                </div>
                <div class="cw-task-label">${E.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn-list minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn-list plus">+</div>
            </div>
        `,V.onclick=B(T,E),V.querySelector(".minus").onclick=()=>X(T,-1,E),V.querySelector(".plus").onclick=()=>X(T,1,E),V.tabIndex=0,V.setAttribute("role","button"),V.setAttribute("aria-pressed","false"),V.setAttribute("aria-label",E.name),V.addEventListener("keydown",ae=>{(ae.key==="Enter"||ae.key===" ")&&(ae.preventDefault(),V.click())}),V}function W(){h.innerHTML="",Object.entries(r).forEach(([T,E])=>{let R=document.createElement("div");R.className="cw-acc-group";let V=document.createElement("div");V.className="cw-acc-header",V.innerHTML=`
              <div class="cw-acc-title">
                  <div class="cw-acc-dot" style="background:${E.brand.color}"></div>
                  ${T}
              </div>
              <div class="cw-acc-icon">\u25BC</div>
          `,V.tabIndex=0,V.setAttribute("role","button"),V.setAttribute("aria-expanded","false"),V.onclick=()=>{h.querySelectorAll(".cw-acc-group.open").forEach(ue=>{ue!==R&&(ue.classList.remove("open"),ue.querySelector(".cw-acc-header")?.setAttribute("aria-expanded","false"))});let ie=R.classList.toggle("open");V.setAttribute("aria-expanded",String(ie))},V.addEventListener("keydown",ie=>{(ie.key==="Enter"||ie.key===" ")&&(ie.preventDefault(),V.click())});let ae=document.createElement("div");ae.className="cw-acc-body",E.tasks.forEach(ie=>{let ue=K(ie.key,ie);ae.appendChild(ue)}),R.appendChild(V),R.appendChild(ae),h.appendChild(R)})}W();function X(T,E,R){o[T]||(o[T]={count:0,data:R,brand:i(R.name)}),o[T].count+=E,o[T].count<=0&&delete o[T],O(),k(),e&&e()}function O(){n.forEach(([ae])=>{let ie=u.querySelector(`#hero-${ae}`);if(!ie)return;let ue=o[ae];ue?(ie.classList.add("active"),ie.setAttribute("aria-pressed","true"),ie.querySelector(".cw-step-val").textContent=ue.count,ie.querySelector(".cw-step-val").style.color=ie.dataset.color,ie.classList.toggle("ts-success",en(ae,a))):(ie.classList.remove("active"),ie.setAttribute("aria-pressed","false"),ie.classList.remove("ts-success"))}),p.querySelectorAll(".cw-task-item").forEach(ae=>{let ie=ae.dataset.id,ue=o[ie];ue?(ae.classList.add("selected"),ae.setAttribute("aria-pressed","true"),ae.querySelector(".cw-step-val").textContent=ue.count,ae.classList.toggle("ts-success",en(ie,a))):(ae.classList.remove("selected"),ae.setAttribute("aria-pressed","false"),ae.classList.remove("ts-success"))});let E=Object.keys(o),R=0,V=[];if(E.forEach(ae=>{let ie=o[ae];R+=ie.count;for(let ue=0;ue<ie.count;ue++)V.length<6&&V.push(ie.brand)}),R>0){I.classList.add("visible");let ae=R>1?t("acoes_plural"):t("acao_singular"),ie=R>1?t("definidas_plural"):t("definida_singular");z.textContent=`${R} ${ae} ${ie}`,U.innerHTML="",V.forEach(ue=>{let Q=document.createElement("div");Q.className="cw-mini-icon-status",Q.innerHTML=Kt[ue.icon]||Kt.default;let ce=Q.querySelector("svg");ce&&(ce.style.width="14px",ce.style.height="14px"),U.appendChild(Q)})}else I.classList.remove("visible"),z.textContent="",U.innerHTML=""}v.addEventListener("input",T=>{let E=T.target.value.toLowerCase();if(E.length>0){h.style.display="none",N.style.display="block",N.innerHTML="";let R=!1;Object.entries(Pe).forEach(([V,ae])=>{if(ae.name.toLowerCase().includes(E)){R=!0;let ie=K(V,ae);o[V]&&(ie.classList.add("selected"),ie.setAttribute("aria-pressed","true"),ie.querySelector(".cw-step-val").textContent=o[V].count),N.appendChild(ie)}}),R||(N.innerHTML=`<div style="padding:20px; text-align:center; font-size:13px; color:#999">${t("nenhum_resultado")}</div>`)}else h.style.display="block",N.style.display="none"});function k(){let T={};A.querySelectorAll(".cw-input-field").forEach(ae=>{T[ae.id]=ae.value}),A.innerHTML="";let E=Object.keys(o),R=!1;if(E.length===0){A.appendChild(va({icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg>',title:t("selecione_tarefas")})),d.style.display="none";return}let V=document.createElement("div");V.className="cw-info-banner",V.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>${t("screenshots_aviso")}</span>
        `,A.appendChild(V),E.forEach(ae=>{let ie=o[ae].data,ue=o[ae].count,Q=o[ae].brand,ce=en(ae,a),ne=a.screenshotMode||"implementation",pe=_i(ie,ne,a.currentLang);if(pe.length>0||ce){R=!0;for(let j=1;j<=ue;j++){let re=document.createElement("div");re.className="cw-screen-card",ce&&re.classList.add("ts-success"),re.style.setProperty("--brand-color",Q.color),re.style.setProperty("--brand-bg",Q.bg),re.style.setProperty("--brand-shadow",Q.color+"40");let de=document.createElement("div");de.className="cw-card-header";let Z=document.createElement("div");Z.className="cw-card-icon",Z.innerHTML=Kt[Q.icon]||Kt.default;let q=document.createElement("div");q.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let C=document.createElement("input");C.className="cw-card-title-input",C.id=`name-${ae}-${j}`,C.value=`${ie.name}${ue>1?" #"+j:""}`,C.title=t("renomear_tooltip");let $=document.createElement("span");if($.className="cw-edit-hint",$.innerHTML=t("renomear_hint"),q.appendChild(C),q.appendChild($),de.appendChild(Z),de.appendChild(q),re.appendChild(de),ce){let J=document.createElement("div");J.className="cw-ts-disclaimer-box",J.innerHTML=`
                <span>${t("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${t("incluir_mesmo_assim")}</button>
            `,J.querySelector("button").onclick=()=>{a.toggleForcedScreenshot(ae,!0)},re.appendChild(J)}else pe.forEach((J,D)=>{let H=document.createElement("div");H.className="cw-input-group";let oe=document.createElement("label");oe.className="cw-input-label",oe.textContent=J;let f=document.createElement("input");f.className="cw-input-field",f.id=`screen-${ae}-${j}-${D}`,f.placeholder=t("cole_link_placeholder"),f.setAttribute("autocomplete","off"),T[f.id]&&(f.value=T[f.id],f.value.trim().length>5&&f.classList.add("filled")),f.addEventListener("input",()=>{f.value.trim().length>5?f.classList.add("filled"):f.classList.remove("filled")});let g=document.createElement("div");g.className="cw-input-check",g.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',H.appendChild(oe),H.appendChild(f),H.appendChild(g),re.appendChild(H)});A.appendChild(re)}}}),d.style.display=R?"block":"none"}return{selectionElement:p,screenshotsElement:d,updateSubStatus:()=>k(),getCheckedElements:()=>Object.keys(o).map(T=>({value:T,count:o[T].count})),setTaskCount:(T,E)=>{o[T]&&delete o[T],E>0&&Pe[T]&&X(T,E,Pe[T])},toggleTask:(T,E=!0)=>{let R=o[T];E&&!R?X(T,1,Pe[T]):!E&&R&&X(T,-R.count,Pe[T])},setLanguage:T=>{t=T;let E=p.querySelector(".js-hero-title");E&&(E.textContent=t("acesso_rapido"));let R=p.querySelector(".js-hero-help");R&&(R.innerHTML=t("atalhos_ajuda"));let V=p.querySelector(".cw-search-input");V&&(V.placeholder=t("buscar_catalogo"));let ae=p.querySelector('label[for="cw-task-search-input"]');ae&&(ae.textContent=t("buscar_catalogo")),k(),O()},refreshCatalog:()=>{s(),Object.keys(o).forEach(T=>{let E=Pe[T];E&&(o[T].data=E,o[T].brand=i(E.name))}),x(),W(),O(),k()},reset:()=>{for(let T in o)delete o[T];v.value="",h.style.display="block",N.style.display="none",O(),k()}}}var yc={marginTop:"24px",marginBottom:"16px",padding:"20px",background:"#fff9e6",borderRadius:"20px",border:"1.5px solid #fbbc0540",display:"none",boxShadow:"0 4px 12px rgba(251, 188, 5, 0.05)"},wc={fontSize:"12px",color:"#b06000",marginTop:"8px",lineHeight:"1.4"},Sc={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #dadce0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",background:"#fff"},Ac={display:"flex",gap:"20px",marginBottom:"12px"};function Vi(e){let t=document.createElement("div");t.id="tag-support-container",Object.assign(t.style,yc);let a=document.createElement("label");a.className="js-ts-main-label",a.textContent=e("utilizou_tag_support"),Object.assign(a.style,Ho,{marginTop:"0"});let o=document.createElement("div");Object.assign(o.style,Ac);let i=document.createElement("input");i.type="radio",i.name="ts_usage_mod",i.value="Sim",Object.assign(i.style,Wo);let n=document.createElement("label");n.className="js-ts-sim-label",n.textContent=e("sim");let r=document.createElement("div");Object.assign(r.style,{display:"flex",alignItems:"center"}),r.appendChild(i),r.appendChild(n);let s=document.createElement("input");s.type="radio",s.name="ts_usage_mod",s.value="N\xE3o",s.checked=!0,Object.assign(s.style,Wo);let l=document.createElement("label");l.className="js-ts-nao-label",l.textContent=e("nao");let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center"}),p.appendChild(s),p.appendChild(l),o.appendChild(r),o.appendChild(p);let d=document.createElement("div");d.style.display="block";let A=document.createElement("label");A.className="js-ts-reason-label",A.textContent=e("motivo_ts"),Object.assign(A.style,Ho,{fontSize:"12px"});let u=document.createElement("input");u.type="text",Object.assign(u.style,Sc);let h=document.createElement("div");h.className="js-ts-warning",h.innerHTML=`\u26A0\uFE0F <strong>${e("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" rel="noopener noreferrer" style="color:#e37400; text-decoration:underline;">${e("link_aqui")}</a>`,Object.assign(h.style,wc),d.appendChild(A),d.appendChild(u),d.appendChild(h),t.appendChild(a),t.appendChild(o),t.appendChild(d),i.onchange=()=>{y.playClick(),d.style.display="none",ee.setTagSupportUsed(!0)},s.onchange=()=>{y.playClick(),d.style.display="block",ee.setTagSupportUsed(!1)};function N(U,B){if(t.style.display="none",!U||!B||B.length===0)return;B.some(K=>K==="ads_conversion_tracking"||K==="ads_enhanced_conversions")?t.style.display="block":(z(),ee.setTagSupportUsed(!1))}function v(){if(t.style.display==="none")return"";let U=`<br><b>${e("tag_support_output_label")}</b> ${i.checked?`\u2705 ${e("sim")}`:`\u274C ${e("nao")}`}`;return s.checked&&u.value.trim()!==""&&(U+=`<br><b>${e("motivo_output_label")}</b> ${u.value}`),U+="<br>",U}function I(U){e=U,a.textContent=e("utilizou_tag_support"),A.textContent=e("motivo_ts"),n.textContent=e("sim"),l.textContent=e("nao"),h.innerHTML=`\u26A0\uFE0F <strong>${e("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" rel="noopener noreferrer" style="color:#b06000; text-decoration:underline;">${e("link_aqui")}</a>`}function z(){t.style.display="none",s.checked=!0,i.checked=!1,d.style.display="block",u.value=""}return{element:t,updateVisibility:N,getOutput:v,setLanguage:I,reset:z}}var tn="cw_notes_parking_lot",lo="cw_notes_emergency_save";var it={getAll:()=>{try{return JSON.parse(localStorage.getItem(tn)||"[]")}catch{return[]}},save:e=>{let t=it.getAll(),a={id:Date.now().toString(),timestamp:new Date().toISOString(),...e};return t.unshift(a),t.length>5&&t.pop(),localStorage.setItem(tn,JSON.stringify(t)),a},delete:e=>{let t=it.getAll();return t=t.filter(a=>a.id!==e),localStorage.setItem(tn,JSON.stringify(t)),t},getCount:()=>it.getAll().length,saveEmergency:e=>{let t={timestamp:Date.now(),data:e};localStorage.setItem(lo,JSON.stringify(t))},getEmergency:()=>{try{let e=localStorage.getItem(lo);if(!e)return null;let t=JSON.parse(e);return Date.now()-t.timestamp>432e5?(localStorage.removeItem(lo),null):!t.data||!t.data.subStatus?null:t.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(lo)}};var Wi="cw_case_streak_v1",Cc=[5,10,15,20,25,30,40,50];function Yi(){let e=new Date;return`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`}function an(){try{let e=JSON.parse(localStorage.getItem(Wi)||"{}");return e.date===Yi()&&e.count||0}catch{return 0}}function Ki(){let e=an()+1;try{localStorage.setItem(Wi,JSON.stringify({date:Yi(),count:e}))}catch{}return{count:e,isMilestone:Cc.includes(e)}}var Xi={pt:{milestoneToast:e=>`\u{1F525} ${e} casos hoje!`,quickSearch:"Busca r\xE1pida: Ctrl/Cmd+K",casesToday:"Casos conclu\xEDdos hoje",drag:"Arrastar",cancel:"Cancelar",cancelledToast:"Cancelado!",devEnvTitle:(e,t)=>`Ambiente de desenvolvimento \u2014 implanta\xE7\xE3o \u2026${e} (${t})`},es:{milestoneToast:e=>`\u{1F525} \xA1${e} casos hoy!`,quickSearch:"B\xFAsqueda r\xE1pida: Ctrl/Cmd+K",casesToday:"Casos completados hoy",drag:"Arrastrar",cancel:"Cancelar",cancelledToast:"\xA1Cancelado!",devEnvTitle:(e,t)=>`Entorno de desarrollo \u2014 implementaci\xF3n \u2026${e} (${t})`},en:{milestoneToast:e=>`\u{1F525} ${e} cases today!`,quickSearch:"Quick search: Ctrl/Cmd+K",casesToday:"Cases completed today",drag:"Drag",cancel:"Cancel",cancelledToast:"Cancelled!",devEnvTitle:(e,t)=>`Development environment \u2014 deployment \u2026${e} (${t})`}};function At(e){let t=se();return Xi[t]?.[e]??Xi.pt[e]}var Ie={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",yellow:"#FDD663",pink:"#F48FB1",gray:"#9AA0A6"},on=50,nn=null;function co(e){let t=document.getElementById("cw-btn-notes");if(!t)return;let a=t.querySelector(".cw-dot-dirty");e?a||(a=document.createElement("div"),a.className="cw-dot-dirty",t.appendChild(a)):a&&a.remove()}function Ji(){let e=document.getElementById("cw-streak-badge"),t=document.getElementById("cw-streak-count");if(!e||!t)return;let a=an();t.textContent=a,e.classList.toggle("visible",a>0);let o=document.querySelector(".cw-pill");o&&(o.classList.toggle("has-streak",a>0),o.classList.toggle("streak-tier-2",a>=5&&a<15),o.classList.toggle("streak-tier-3",a>=15&&a<30),o.classList.toggle("streak-tier-4",a>=30))}function Qi(){let{count:e,isMilestone:t}=Ki();if(Ji(),t){let a=document.querySelector(".cw-pill");y.playSuccess(),a&&Si(a),te(At("milestoneToast")(e))}}function Zi(e,t){let a="cw-command-center-style";if(!document.getElementById(a)){let x=document.createElement("style");x.id=a,x.innerHTML=`
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
                
                background: ${Ie.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${Ie.glassBorder}; border-radius: 50px;
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
                width: ${on}px !important;
                height: ${on}px !important;
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

            /* --- CASCATAS DE ENTRADA ---
               \xCDndices recalculados pro DOM atual (admin-tag e streak-badge
               entraram no meio do markup depois que isso foi escrito
               originalmente, empurrando todo mundo 2 posi\xE7\xF5es - a lista
               antiga estava aplicando o delay do "Grip" no .cw-main-logo, o
               do "Notes" no admin-tag, etc. Efeito colateral: o logo ganhava
               um delay de abertura de 0.15s que n\xE3o devia existir (ver
               .cw-pill:not(.collapsed) .cw-main-logo acima, que quer delay
               0). admin-tag/streak-badge saem da lista de prop\xF3sito: cada
               um j\xE1 tem sua pr\xF3pria transi\xE7\xE3o dedicada. */
            .cw-pill:not(.collapsed) > *:nth-child(5) { transition-delay: 0.15s; } /* Grip */
            .cw-pill:not(.collapsed) > *:nth-child(6) { transition-delay: 0.17s; } /* Notes */
            .cw-pill:not(.collapsed) > *:nth-child(7) { transition-delay: 0.19s; } /* BAU Form */
            .cw-pill:not(.collapsed) > *:nth-child(8) { transition-delay: 0.21s; } /* Email */
            .cw-pill:not(.collapsed) > *:nth-child(9) { transition-delay: 0.23s; } /* Script */
            .cw-pill:not(.collapsed) > *:nth-child(10) { transition-delay: 0.25s; } /* Links */
            .cw-pill:not(.collapsed) > *:nth-child(11) { transition-delay: 0.27s; } /* Library */
            .cw-pill:not(.collapsed) > *:nth-child(12) { transition-delay: 0.29s; } /* Timezone */
            .cw-pill:not(.collapsed) > *:nth-child(13) { transition-delay: 0.31s; } /* Configs */
            .cw-pill:not(.collapsed) > *:nth-child(14) { transition-delay: 0.33s; } /* Sep */
            .cw-pill:not(.collapsed) > *:nth-child(15) { transition-delay: 0.35s; } /* Broadcast */

            /* --- CASCATA DE SA\xCDDA ---
               Antes todo o conte\xFAdo sumia de uma vez s\xF3 (delay 0s pra todo
               mundo) - os 9 bot\xF5es se sobrepunham num \xFAnico flash em vez de
               cada um ter seu pr\xF3prio momento. Agora sai em cascata reversa
               (o \xFAltimo a aparecer na abertura \xE9 o primeiro a sumir no
               fechamento - o mesmo "unwind" de um z\xEDper fechando de baixo
               pra cima), com folga suficiente entre cada um pra dar tempo de
               respirar antes da c\xE1psula (que s\xF3 come\xE7a a encolher depois -
               ver .cw-pill.collapsed acima) entrar em cena. */
            .cw-pill.collapsed > *:nth-child(15) { transition-delay: 0s; }    /* Broadcast */
            .cw-pill.collapsed > *:nth-child(14) { transition-delay: 0.02s; } /* Sep */
            .cw-pill.collapsed > *:nth-child(13) { transition-delay: 0.04s; } /* Configs */
            .cw-pill.collapsed > *:nth-child(12) { transition-delay: 0.06s; } /* Timezone */
            .cw-pill.collapsed > *:nth-child(11) { transition-delay: 0.08s; } /* Library */
            .cw-pill.collapsed > *:nth-child(10) { transition-delay: 0.10s; } /* Links */
            .cw-pill.collapsed > *:nth-child(9)  { transition-delay: 0.12s; } /* Script */
            .cw-pill.collapsed > *:nth-child(8)  { transition-delay: 0.14s; } /* Email */
            .cw-pill.collapsed > *:nth-child(7)  { transition-delay: 0.16s; } /* BAU Form */
            .cw-pill.collapsed > *:nth-child(6)  { transition-delay: 0.18s; } /* Notes */
            .cw-pill.collapsed > *:nth-child(5)  { transition-delay: 0.20s; } /* Grip */

            /* --- ESTILOS DOS BOT\xD5ES --- */
            .cw-btn {
                width: 40px; height: 40px; 
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative; color: ${Ie.iconIdle};
                flex-shrink: 0;
                transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn { transition: background 0.2s ease, color 0.2s ease !important; }
            }
            .cw-btn:hover {
                background: ${Ie.glassHighlight};
                color: ${Ie.iconActive};
                /* S\xF3 scale (cresce do centro), sem translateY: bot\xF5es redondos
                   colados lado a lado numa fileira \xFAnica - um lift vertical
                   \xE9 o caso cl\xE1ssico de flicker quando o mouse passa raspando
                   a borda entre dois \xEDcones adjacentes. */
                transform: scale(1.18) !important;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn:hover { transform: none !important; }
            }

            .cw-btn.notes.active { color: ${Ie.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.precall.active { color: ${Ie.yellow} !important; background: rgba(253, 214, 99, 0.15); }
            .cw-btn.email.active { color: ${Ie.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${Ie.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${Ie.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.library.active { color: ${Ie.pink} !important; background: rgba(244, 143, 177, 0.15); } /* [NOVO] */
            .cw-btn.broadcast.active { color: ${Ie.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${Ie.teal} !important; background: rgba(0, 191, 165, 0.15); }
            .cw-btn.configs.active { color: ${Ie.gray} !important; background: rgba(154, 160, 166, 0.15); }
            .cw-btn.bauform.active { color: ${Ie.blue} !important; background: rgba(66, 133, 244, 0.15); }

            .cw-btn.notes:hover { color: ${Ie.blue}; filter: drop-shadow(0 0 8px rgba(138, 180, 248, 0.6)); }
            .cw-btn.precall:hover { color: ${Ie.yellow}; filter: drop-shadow(0 0 8px rgba(253, 214, 99, 0.6)); }
            .cw-btn.email:hover { color: ${Ie.red}; filter: drop-shadow(0 0 8px rgba(242, 139, 130, 0.6)); }
            .cw-btn.script:hover { color: ${Ie.purple}; filter: drop-shadow(0 0 8px rgba(197, 138, 249, 0.6)); }
            .cw-btn.links:hover { color: ${Ie.green}; filter: drop-shadow(0 0 8px rgba(129, 201, 149, 0.6)); }
            .cw-btn.library:hover { color: ${Ie.pink}; filter: drop-shadow(0 0 8px rgba(244, 143, 177, 0.6)); }
            .cw-btn.broadcast:hover { color: ${Ie.orange}; filter: drop-shadow(0 0 8px rgba(249, 171, 0, 0.6)); }
            .cw-btn.timezone:hover { color: ${Ie.teal}; filter: drop-shadow(0 0 8px rgba(0, 191, 165, 0.6)); }
            .cw-btn.configs:hover { color: ${Ie.gray}; filter: drop-shadow(0 0 8px rgba(154, 160, 166, 0.6)); }

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
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${Ie.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            @media (prefers-reduced-motion: reduce) {
                .cw-grip:hover .cw-grip-bar { transform: none !important; }
            }
            .cw-pill.dragging .cw-grip-bar { background-color: ${Ie.blue}; width: 16px; opacity: 1; }

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
                border: 1px solid ${Ie.glassBorder};
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
            .cw-center-dots span:nth-child(1) { background-color: ${Ie.blue}; animation-delay: -0.22s; }
            .cw-center-dots span:nth-child(2) { background-color: ${Ie.red}; animation-delay: -0.11s; }
            .cw-center-dots span:nth-child(3) { background-color: ${Ie.green}; }
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
                color: ${Ie.green};
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
        `,document.head.appendChild(x)}function o(){let x=ea();return x.isDev?`<div id="cw-env-tag" class="cw-env-badge" title="${At("devEnvTitle")(x.fingerprint,x.endpoint)}">Dev</div>`:""}let i={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',precall:'<svg viewBox="0 0 24 24"><path d="M22 7h-9v2h9V7zm0 8h-9v2h9v-2zM5.54 11L2 7.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L5.54 11zm0 8L2 15.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L5.54 19z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg class="cw-logo-base" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',mainSpark:'<svg class="cw-logo-spark" viewBox="0 0 24 24"><defs><linearGradient id="cw-spark-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4285F4"/><stop offset="33%" stop-color="#EA4335"/><stop offset="66%" stop-color="#FBBC05"/><stop offset="100%" stop-color="#34A853"/></linearGradient></defs><path fill="url(#cw-spark-grad)" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',configs:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>'},n=document.createElement("div");n.id="cw-floating-trigger",n.className="cw-pill side-right collapsed"+(ea().isDev?" cw-env-dev":""),n.innerHTML=`
        <div id="cw-command-center" style="display:none;"></div>
        <div class="cw-main-logo js-cc-quicksearch" title="${At("quickSearch")}">${i.main}${i.mainSpark}</div>
        <div id="cw-admin-tag" class="cw-admin-badge">Admin</div>
        ${o()}
        <div id="cw-streak-badge" class="cw-streak-badge js-cc-casestoday" title="${At("casesToday")}">\u{1F525} <span id="cw-streak-count">0</span></div>

        <div class="cw-grip js-cc-drag" title="${At("drag")}">
            <div class="cw-grip-bar"></div>
        </div>
        <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${i.notes}</button>
        <button class="cw-btn precall" id="cw-btn-precall" data-label="Pre-call Checklist">${i.precall}</button>
        <button class="cw-btn bauform" id="cw-btn-bauform" data-label="BAU Form">${i.bauform}</button>
        <button class="cw-btn email" id="cw-btn-email" data-label="Email Assistant">${i.email}</button>
        <button class="cw-btn script" id="cw-btn-script" data-label="Call Script">${i.script}</button>
        <button class="cw-btn links" id="cw-btn-links" data-label="Links">${i.links}</button>
        <button class="cw-btn library" id="cw-btn-library" data-label="My Library">${i.library}</button>
        <button class="cw-btn timezone" id="cw-btn-timezone" data-label="Time Zones">${i.timezone}</button>
        <button class="cw-btn configs" id="cw-btn-configs" data-label="Configura\xE7\xF5es">${i.configs}</button>
        <div class="cw-sep"></div>
        <button class="cw-btn broadcast" id="cw-btn-broadcast" data-label="Avisos">${i.broadcast}</button>
        <div class="cw-status-container">
            <div class="cw-dots" id="cw-loader"><span></span><span></span><span></span></div>
            <div class="cw-check" id="cw-success" style="display:none;">${i.check}</div>
        </div>
    `;let r=document.createElement("div");r.className="cw-focus-backdrop",document.body.appendChild(r),document.body.appendChild(n),Ji(),Le(()=>{let x=n.querySelector(".js-cc-quicksearch");x&&(x.title=At("quickSearch"));let K=n.querySelector(".js-cc-casestoday");K&&(K.title=At("casesToday"));let W=n.querySelector(".js-cc-drag");W&&(W.title=At("drag"));let X=n.querySelector("#cw-env-tag");if(X){let O=ea();X.title=At("devEnvTitle")(O.fingerprint,O.endpoint)}});let s=x=>{y.playClick(),x()};if(n.querySelector(".notes").onclick=x=>{x.stopPropagation(),s(e.toggleNotes)},n.querySelector(".precall").onclick=x=>{x.stopPropagation(),s(e.togglePrecall)},n.querySelector(".bauform").onclick=x=>{x.stopPropagation(),s(e.toggleBAUForm)},n.querySelector(".email").onclick=x=>{x.stopPropagation(),s(e.toggleEmail)},n.querySelector(".script").onclick=x=>{x.stopPropagation(),s(e.toggleScript)},n.querySelector(".links").onclick=x=>{x.stopPropagation(),s(e.toggleLinks)},n.querySelector(".library").onclick=x=>{x.stopPropagation(),s(e.toggleLibrary)},n.querySelector(".timezone").onclick=x=>{x.stopPropagation(),s(e.toggleTimezone)},n.querySelector(".configs").onclick=x=>{x.stopPropagation(),s(e.toggleConfigs)},n.querySelector(".broadcast").onclick=x=>{x.stopPropagation(),s(()=>{let K=x.currentTarget.querySelector(".cw-badge");K&&K.remove(),e.broadcastControl&&e.broadcastControl.toggle()})},n.querySelectorAll(".cw-btn").forEach(x=>{x.addEventListener("mouseenter",()=>y.playHover())}),e.broadcastControl&&e.broadcastControl.hasUnread){let x=document.createElement("div");x.className="cw-badge",n.querySelector(".broadcast").appendChild(x)}let l=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function p(){if(l()){n.classList.remove("collapsed"),y.playGenieOpen();return}let x=n.getBoundingClientRect(),K=window.innerHeight,W=x.top>K/2,X=x.height;n.style.setProperty("transition","none","important"),n.classList.remove("collapsed");let O=n.scrollHeight;if(n.classList.add("collapsed"),n.style.height=`${X}px`,W){let k=K-x.bottom;n.style.top="auto",n.style.bottom=`${k}px`}else n.style.bottom="auto",n.style.top=`${x.top}px`;n.style.overflow="hidden",n.offsetWidth,n.style.removeProperty("transition"),n.classList.remove("collapsed"),n.style.height=`${O}px`,y.playGenieOpen(),setTimeout(()=>{n.style.height="",n.style.overflow=""},350)}function d(x=!0){if(n.classList.contains("collapsed"))return;if(l()){n.classList.add("collapsed"),x&&y.playSwoosh();return}let K=n.getBoundingClientRect().height;n.style.setProperty("transition","none","important"),n.style.height=`${K}px`,n.offsetWidth,n.style.removeProperty("transition"),n.classList.add("collapsed"),n.style.height=`${on}px`,x&&y.playSwoosh(),setTimeout(()=>{n.style.height=""},700)}nn=d;let A=null;n.onmouseleave=()=>{document.querySelector(".cw-processing-card")||(A=setTimeout(()=>{n.querySelector(".cw-btn.active")||d()},3e3))},n.onmouseenter=()=>{A&&clearTimeout(A)},(async function(){let K=()=>{let W=ze();if(W){let X=W.split("@")[0].toLowerCase();if(mi.includes(X)){let O=n.querySelector("#cw-admin-tag");O&&O.classList.add("visible")}}else setTimeout(K,2e3)};if(K(),t&&typeof t.then=="function"){try{await t}catch{}await be(150)}else await be(2800);n.classList.add("arriving"),y.playReady(),n.querySelectorAll(".cw-sep").forEach(W=>W.classList.add("visible"))})();let u=!1,h,N,v,I,z=3;n.onmousedown=x=>{if(x.target.closest("button"))return;x.preventDefault(),h=x.clientX,N=x.clientY;let K=n.getBoundingClientRect();v=K.left,I=K.top,document.addEventListener("mousemove",U),document.addEventListener("mouseup",B)};function U(x){let K=x.clientX-h,W=x.clientY-N;!u&&Math.sqrt(K*K+W*W)>z&&(u=!0,n.classList.add("dragging"),n.style.transition="none",A&&clearTimeout(A)),u&&(n.style.left=`${v+K}px`,n.style.top=`${I+W}px`,n.style.right="auto",n.style.bottom="auto",n.style.transform="none")}function B(x){if(document.removeEventListener("mousemove",U),document.removeEventListener("mouseup",B),u){u=!1,n.classList.remove("dragging");let K=window.innerWidth,W=window.innerHeight,X=n.getBoundingClientRect(),O=X.left+X.width/2,k;O<K/2?(k=24,n.classList.remove("side-right"),n.classList.add("side-left")):(k=K-X.width-24,n.classList.remove("side-left"),n.classList.add("side-right"));let T=It(X.top,24,W-X.height-24);setTimeout(()=>{n.style.setProperty("transition","left 0.3s cubic-bezier(0.4, 0, 0.2, 1), top 0.3s cubic-bezier(0.4, 0, 0.2, 1)","important"),n.style.left=`${k}px`,n.style.top=`${T}px`,n.style.bottom="auto",n.style.transform=""},10),setTimeout(()=>{n.style.transition="",n.style.removeProperty("transition")},700)}else{let K=n.querySelector(".cw-btn.active"),W=x.target.closest("button");n.classList.contains("collapsed")?p():!K&&!W&&d(),W&&(W.style.transform="scale(0.9)",setTimeout(()=>W.style.transform="",150))}}}function Oa(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop");window._CW_ABORT_PROCESS=!1;let a=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;e&&nn?nn(!1):e&&e.classList.add("collapsed"),e&&e.classList.add("cw-busy");let o=document.createElement("div");o.className="cw-processing-card",o.innerHTML=`
      <div class="cw-center-slot">
        <div class="cw-center-dots"><span></span><span></span><span></span></div>
        <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
      </div>
      <div class="cw-center-text">${fe.getRandomTip()}</div>
  `;let i=document.createElement("div");i.className="cw-abort-btn",i.textContent=At("cancel"),i.onclick=l=>{l.stopPropagation(),window._CW_ABORT_PROCESS=!0,y.stopThinking(),te(At("cancelledToast"),{duration:3e3}),s()},o.appendChild(i),document.body.appendChild(o),t&&t.classList.add("active"),requestAnimationFrame(()=>{requestAnimationFrame(()=>o.classList.add("visible"))}),y.startThinking();let n=Date.now(),r=!1;function s(){r||(r=!0,y.stopThinking(),t&&t.classList.remove("active"),e&&e.classList.remove("cw-busy"),o.classList.remove("visible"),setTimeout(()=>o.remove(),a?200:320))}return function(){if(window._CW_ABORT_PROCESS||r)return;let p=Math.max(0,2e3-(Date.now()-n));setTimeout(()=>{if(window._CW_ABORT_PROCESS||r)return;y.stopThinking();let d=o.querySelector(".cw-center-dots"),A=o.querySelector(".cw-center-success");d&&d.classList.add("hidden"),i.classList.add("hidden"),A&&A.classList.add("show"),setTimeout(()=>{A&&A.classList.remove("show"),setTimeout(s,200)},850)},p)}}function er(e){let{onSaveCurrent:t,onLoadDraft:a,t:o}=e,i=document.createElement("button");i.className="js-btn-park",i.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${o("guardar")}</span>
    `,i.style.cssText=`
        flex: 1 1 0;
        padding: 12px 0;
        margin-top: 24px;
        border-radius: ${$e.pill};
        font-size: 14px;
        font-weight: 700;
        background: ${G.surface};
        color: ${G.textSub};
        border: 1px solid ${G.border};
        cursor: pointer;
        display: flex; 
        align-items: center; 
        justify-content: center;
        gap: 8px;
        transition: background-color 0.2s ${Ce}, border-color 0.2s ${Ce}, color 0.2s ${Ce}, box-shadow 0.2s ${Ce}, transform 0.1s ${Ce};
        box-shadow: ${Nt.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `,i.onmouseenter=()=>{i.style.backgroundColor="#F8F9FA",i.style.borderColor="#202124",i.style.color="#202124",i.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)"},i.onmouseleave=()=>{i.style.backgroundColor="#FFFFFF",i.style.borderColor="#DADCE0",i.style.color="#5F6368",i.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)"},i.onmousedown=()=>i.style.transform="scale(0.96)",i.onmouseup=()=>i.style.transform="scale(1)",i.onclick=async()=>{if(await Ye(o("confirmar_guardar_rascunho")))try{let I=await t();I?(it.save(I),N(),l(),y.playSuccess(),te(o("rascunho_salvo_sucesso"))):(y.playError(),te(o("erro_ler_dados"),{error:!0}))}catch(I){console.error("Erro ao salvar rascunho:",I),y.playError(),te(o("erro_ao_salvar"),{error:!0})}};let n=document.createElement("div");n.className="js-history-btn",n.title=o("meus_rascunhos"),n.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",n.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#9AA0A6"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let r=n.querySelector("svg"),s=document.createElement("div");s.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",n.appendChild(s),n.onmouseenter=()=>n.style.background="rgba(0,0,0,0.05)",n.onmouseleave=()=>n.style.background="transparent",n.onclick=v=>{v.stopPropagation(),h()};function l(){let v=it.getCount();co(v>0),r.style.color=v>0?G.primary:"#9AA0A6",v>0?(s.style.display="block",s.textContent=v,window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||s.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):s.style.display="none"}let p=document.createElement("div");p.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${G.surface}; z-index: 100;
        border-radius: ${$e.large} ${$e.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${Ce};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;let d=document.createElement("div");d.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",d.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${o("rascunhos_salvos")}</span>`;let A=document.createElement("button");A.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',A.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",A.onmouseenter=()=>A.style.background="#F1F3F4",A.onmouseleave=()=>A.style.background="transparent",A.onclick=()=>h(!1),d.appendChild(A);let u=document.createElement("div");u.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",p.appendChild(d),p.appendChild(u);function h(v){let I=p.style.transform==="translateY(0%)";(v!==void 0?v:!I)?(N(),p.style.transform="translateY(0%)"):p.style.transform="translateY(110%)"}function N(){let v=it.getAll();if(u.innerHTML="",v.length===0){u.innerHTML=`
                <div style="text-align:center; padding:80px 20px; color:${G.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${o("nenhum_rascunho")}</div>
                </div>`;return}v.forEach(I=>{let z=document.createElement("div");z.style.cssText=`
                background: ${G.surface}; padding: 20px; border-radius: ${$e.large};
                border: 1.5px solid ${G.bgInput}; box-shadow: ${Nt.subtle};
                position: relative;
            `;let B=new Date(I.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),x="";I.summaryTags&&I.summaryTags.length>0&&(x=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${I.summaryTags.slice(0,3).join(", ")+(I.summaryTags.length>3?"...":"")}</div>`),z.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${I.clientName||o("cliente_sem_nome")}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${B}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${I.cid||"---"}</span>
                    <span style="display:block; color:${I.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${I.subStatus||I.status||o("sem_status")}</span>
                    ${x}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3);">
                        ${o("retomar_caso")}
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center;" title="${o("descartar")}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let K=z.querySelector(".cw-resume-btn");K.onclick=async()=>{await Ye(o("retomar_rascunho_confirm"))&&(a(I),it.delete(I.id),N(),l(),h(!1),y.playSwoosh(),te(o("rascunho_carregado")))};let W=z.querySelector(".cw-del-btn");W.onclick=async()=>{await Ye(o("excluir_rascunho_confirm"),{danger:!0})&&(it.delete(I.id),N(),l())},u.appendChild(z)})}return l(),{parkButton:i,historyBtnWrapper:n,drawer:p}}var tr={pt:"Falha ao copiar",es:"Error al copiar",en:"Failed to copy"};function Pt(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let a=document.createRange();a.selectNodeContents(t);let o=window.getSelection();o.removeAllRanges(),o.addRange(a);try{document.execCommand("copy")}catch{y.playError(),te(tr[se()]||tr.pt,{error:!0})}o.removeAllRanges(),document.body.removeChild(t)}function sa(e){["input","change","keydown","keyup"].forEach(a=>{let o=new Event(a,{bubbles:!0,cancelable:!0});e.dispatchEvent(o)})}function ar(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function la(){let e=ar(),t=e.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(r=>r.innerText.trim()==="description");if(o){let r=o.closest("material-fab")||o.closest("material-button");r?(r.style&&(r.style.display="block",r.style.visibility="visible"),Je(r)):Je(o)}else{let r=document.querySelector("material-fab-speed-dial");if(r){let s=r.querySelector(".trigger");s?(s.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),Je(s)):r.click(),await be(800);let p=Array.from(document.querySelectorAll("i.material-icons-extended")).find(d=>d.innerText.trim()==="description");p&&Je(p)}}let i=null,n=0;for(;!i&&n<20;){await be(300);let r=ar();if(r.length>t)i=r.find(s=>!e.includes(s)),i||(i=r[r.length-1]);else if(n>10){let s=r.filter(l=>l.offsetParent!==null);s.length>0&&(i=s[s.length-1])}n++}return i}var or={pt:{back:"Voltar",generateNote:"Gerar Nota",sopBefore:"Certifique-se de consultar o",sopAfter:"antes de transferir.",autoFill:"Auto-Preencher Dados da P\xE1gina",fetchingData:"Buscando dados...",technicalData:"Dados T\xE9cnicos",contactAndIssue:"Contato & Problema",ccCopies:"C\xF3pias (CC)",describeIssuePlaceholder:"Descreva o erro, passos para reproduzir...",whatTestedPlaceholder:"O que voc\xEA j\xE1 testou?",fieldsFilledToast:e=>`${e} campos preenchidos!`,noNewDataToast:"Nenhum dado novo encontrado.",readPageErrorToast:"Erro ao ler p\xE1gina.",fillRequiredToast:"Preencha os campos obrigat\xF3rios.",noteGeneratedToast:"Nota gerada e inserida!",copiedOpenNoteToast:"Copiado! Abra uma nota para colar."},es:{back:"Volver",generateNote:"Generar Nota",sopBefore:"Aseg\xFArate de consultar el",sopAfter:"antes de transferir.",autoFill:"Autocompletar Datos de la P\xE1gina",fetchingData:"Buscando datos...",technicalData:"Datos T\xE9cnicos",contactAndIssue:"Contacto y Problema",ccCopies:"Copias (CC)",describeIssuePlaceholder:"Describe el error, pasos para reproducirlo...",whatTestedPlaceholder:"\xBFQu\xE9 ya probaste?",fieldsFilledToast:e=>`\xA1${e} campos completados!`,noNewDataToast:"No se encontraron datos nuevos.",readPageErrorToast:"Error al leer la p\xE1gina.",fillRequiredToast:"Completa los campos obligatorios.",noteGeneratedToast:"\xA1Nota generada e insertada!",copiedOpenNoteToast:"\xA1Copiado! Abre una nota para pegar."},en:{back:"Back",generateNote:"Generate Note",sopBefore:"Make sure to check the",sopAfter:"before transferring.",autoFill:"Auto-Fill Page Data",fetchingData:"Fetching data...",technicalData:"Technical Data",contactAndIssue:"Contact & Issue",ccCopies:"Copies (CC)",describeIssuePlaceholder:"Describe the error, steps to reproduce...",whatTestedPlaceholder:"What have you already tested?",fieldsFilledToast:e=>`${e} fields filled in!`,noNewDataToast:"No new data found.",readPageErrorToast:"Error reading the page.",fillRequiredToast:"Fill in the required fields.",noteGeneratedToast:"Note generated and inserted!",copiedOpenNoteToast:"Copied! Open a note to paste it."}};function st(e){let t=se();return or[t]?.[e]??or.pt[e]}function nr(e){let t=[];function a(O){O(),t.push(O)}let o=document.createElement("div");o.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let i=document.createElement("div");i.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let n=document.createElement("div");n.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",o.appendChild(n),o.appendChild(i),i.addEventListener("scroll",()=>{n.style.boxShadow=i.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let r={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},s={};function l({id:O,label:k,type:T="text",placeholder:E="",required:R=!1,autocomplete:V="",parent:ae=i}){let ie=document.createElement("div");ie.style.cssText=r.inputWrapper;let ue=document.createElement("label");ue.setAttribute("for",O),ue.style.cssText=r.label,ue.innerHTML=`${k} ${R?'<span style="color:#D93025">*</span>':""}`;let Q;return T==="textarea"?(Q=document.createElement("textarea"),Q.style.cssText=r.input+r.textarea):(Q=document.createElement("input"),Q.type=T,Q.style.cssText=r.input),Q.id=O,Q.placeholder=E,V&&Q.setAttribute("autocomplete",V),Q.addEventListener("focus",()=>{Q.style.borderColor="#1a73e8",Q.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),Q.addEventListener("blur",()=>{Q.style.borderColor="#DADCE0",Q.style.boxShadow="none",R&&Q.value.trim()!==""&&(Q.style.backgroundColor="#FFF")}),s[O]={input:Q,wrapper:ie,required:R},ie.appendChild(ue),ie.appendChild(Q),T!=="textarea"&&Wa(Q),ae.appendChild(ie),ie}function p({id:O,label:k,options:T=["Yes","No"],defaultValue:E="No",onChange:R=null}){let V=document.createElement("div");V.style.cssText=r.inputWrapper;let ae=document.createElement("label");ae.style.cssText=r.label,ae.textContent=k,V.appendChild(ae);let ie=document.createElement("div");ie.style.cssText=r.radioGroup;let ue=document.createElement("input");return ue.type="hidden",ue.id=O,ue.value=E,V.appendChild(ue),T.forEach(Q=>{let ce=document.createElement("div");ce.textContent=Q,ce.style.cssText=r.radioLabel,Q===E&&(ce.style.cssText+=r.radioActive),ce.onclick=()=>{Array.from(ie.children).forEach(pe=>pe.style.cssText=r.radioLabel),ce.style.cssText+=r.radioActive,ue.value=Q,R&&R(Q)},ie.appendChild(ce)}),s[O]={input:ue,wrapper:V,required:!1},V.appendChild(ie),i.appendChild(V),V}let d=document.createElement("div");d.style.cssText=r.banner,a(()=>{d.innerHTML=`
            <span>\u26A0\uFE0F</span>
            <div>
                <b>Out of Scope Check:</b><br>
                ${st("sopBefore")} <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> ${st("sopAfter")}
            </div>
        `}),i.appendChild(d);let A=document.createElement("div");A.style.marginBottom="24px";let u=document.createElement("button"),h=()=>{u.innerHTML=`\u2728 &nbsp; ${st("autoFill")}`};a(h),u.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",u.onmouseover=()=>u.style.background="#E1EFFF",u.onmouseout=()=>u.style.background="#F0F7FF",A.appendChild(u),i.appendChild(A);function N(O,k,T){let E=document.createElement("div");E.style.cssText=r.sectionTitle,a(()=>{E.textContent=`${k} ${st(T)}`}),O.appendChild(E)}let v=document.createElement("div");v.style.cssText=r.section,N(v,"\u{1F6E0}\uFE0F","technicalData"),i.appendChild(v),l({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:v}),l({id:"ga4",label:"GA4 Property ID",parent:v}),l({id:"gtm",label:"GTM Container ID",parent:v});let I=document.createElement("div");I.style.cssText=r.hiddenField,v.appendChild(I),p({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:O=>{O==="Yes"?I.style.cssText=r.visibleField+"margin-bottom:14px;":(I.style.cssText=r.hiddenField,s.accessEmail.input.value="")}}),l({id:"accessEmail",label:"User Access Email",parent:I}),p({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let z=document.createElement("div");z.style.cssText=r.section,N(z,"\u{1F4DE}","contactAndIssue"),i.appendChild(z),l({id:"name",label:"Advertiser Name",required:!0,autocomplete:"name",parent:z}),l({id:"url",label:"Website URL",type:"url",autocomplete:"url",parent:z}),l({id:"phone",label:"Phone Number",type:"tel",autocomplete:"tel",parent:z}),l({id:"email",label:"Contact Email",type:"email",autocomplete:"email",parent:z}),l({id:"callback",label:"Preferred Callback Time (Timezone)",parent:z}),l({id:"desc",label:"Detailed Issue Description",type:"textarea",required:!0,parent:z}),l({id:"checks",label:"Troubleshooting Performed",type:"textarea",parent:z}),a(()=>{s.desc.input.placeholder=st("describeIssuePlaceholder"),s.checks.input.placeholder=st("whatTestedPlaceholder")}),l({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:z});let U=document.createElement("div");U.style.cssText=r.section,N(U,"\u{1F4E7}","ccCopies"),i.appendChild(U),l({id:"cc_adv",label:"Advertiser Contact",parent:U}),l({id:"cc_am",label:"Account Manager",parent:U});let B=document.createElement("div");B.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let x=document.createElement("button");a(()=>{x.textContent=st("back")}),x.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",x.onclick=e;let K=document.createElement("button");a(()=>{K.textContent=st("generateNote")}),K.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",B.appendChild(x),B.appendChild(K),o.appendChild(B),u.onclick=async()=>{u.innerHTML=`\u23F3 ${st("fetchingData")}`;try{let O=await bt(),k=0,T=(V,ae)=>{let ie=s[V];ae&&ie&&ie.input.value===""&&(ie.input.value=ae,ie.input.style.backgroundColor="#E6F4EA",ie.input.style.borderColor="#34A853",setTimeout(()=>{ie.input.style.backgroundColor="#FFF",ie.input.style.borderColor="#DADCE0"},1e3),k++)};T("name",O.advertiserName),T("url",O.websiteUrl),O.clientEmail&&(T("email",O.clientEmail),T("cc_adv",O.clientEmail));let R=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);R&&T("cid",R[0]),k>0?te(st("fieldsFilledToast")(k)):te(st("noNewDataToast"))}catch(O){console.error(O),te(st("readPageErrorToast"))}finally{h()}};let W=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,X=()=>{let O=!0,k=null,T=W();return Object.values(s).forEach(E=>{E.required&&!E.input.value.trim()&&(O=!1,E.input.style.cssText+=r.inputError,T||E.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),k||(k=E.input))}),k&&k.scrollIntoView({behavior:T?"auto":"smooth",block:"center"}),O};return K.onclick=async()=>{if(!X()){y.playError(),te(st("fillRequiredToast"),{error:!0});return}let O=ae=>s[ae].input.value||"N/A",k=O("hasAccess"),T=k==="Yes"?O("accessEmail"):"N/A",R=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${O("cid")}
<b>GA4 ID:</b> ${O("ga4")}
<b>GTM ID:</b> ${O("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${k==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${T}
<b>Ghosting Access Available (Y/N):</b> ${O("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${O("name")}
<b>Website:</b> ${O("url")}
<b>Phone Number:</b> ${O("phone")}
<b>Preferred Callback:</b> ${O("callback")}
<b>Email Address:</b> ${O("email")}

<b>Detailed Issue Description:</b>
${O("desc")}

<b>Uncropped screenshots:</b>
${O("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${O("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${O("cc_adv")}
<b>Account Manager:</b> ${O("cc_am")}
`.replace(/\n/g,"<br>");Pt(R);let V=await la();V?(V.innerText.trim()===""&&(V.innerHTML=""),document.execCommand("insertHTML",!1,R),sa(V),y.playSuccess(),te(st("noteGeneratedToast"))):te(st("copiedOpenNoteToast"))},Le(()=>t.forEach(O=>O())),o}var rr="cw_user_prefs_v1",ln="cw_user_prefs_pending_v1",rn=!1,Da=null;function ca(){try{let e=localStorage.getItem(rr),t=e?JSON.parse(e):null;return t&&typeof t=="object"?t:{}}catch{return{}}}function ir(e){try{localStorage.setItem(rr,JSON.stringify(e))}catch(t){console.warn("N\xE3o consegui gravar as prefer\xEAncias localmente:",t)}}function sn(e){try{e?localStorage.setItem(ln,"1"):localStorage.removeItem(ln)}catch{}}function Ec(){try{return localStorage.getItem(ln)==="1"}catch{return!1}}var Ke={get(e,t=null){let a=ca();return e in a?a[e]:t},async set(e,t){let a=ca();a[e]=t,ir(a);let o=ze();if(!o)return sn(!0),{saved:!0,synced:!1};rn=!0;let i=!1;try{i=await fe.saveUserPrefs(a,o)}catch(n){console.warn("Falha ao salvar prefer\xEAncias na nuvem:",n)}finally{sn(!i),setTimeout(()=>{rn=!1},2e3)}return{saved:!0,synced:i}},sync(){return Da||(Da=(async()=>{let e=ze();if(!e)return ca();try{if(Ec()){let a=ca(),o=await fe.saveUserPrefs(a,e);return sn(!o),a}let t=await fe.getUserPrefs(e);if(t&&typeof t=="object"&&!rn){let a=ca();JSON.stringify(t)!==JSON.stringify(a)&&ir(t)}}catch(t){console.warn("Prefer\xEAncias indispon\xEDveis; seguindo com o cache local.",t)}finally{Da=null}return ca()})(),Da)}};var Ma="shortcuts",sr="shortcutsSortByUsage",dr="cw_shortcut_usage_v1",_t=8,kc=[{id:"sc_default_ni_attempted",kind:"note",payload:{caseType:"bau",status:"NI",subStatus:"NI_Attempted_Contact",scenarios:[{id:"quickfill-ni-attempted-2day",substatus:"NI_Attempted_Contact"}]}},{id:"sc_default_in_not_reachable",kind:"note",payload:{caseType:"bau",status:"IN",subStatus:"IN_Not_Reachable",scenarios:[{id:"quickfill-in-no-show-bau",substatus:"IN_Not_Reachable"}]}}],lr={sc_default_ni_attempted:{pt:{label:"NI Attempted \u2014 In\xEDcio 2 Day Rule",alias:"2day inicio"},es:{label:"NI Attempted \u2014 Inicio 2 Day Rule",alias:"2day inicio"},en:{label:"NI Attempted \u2014 2 Day Rule (Start)",alias:"2day start"}},sc_default_in_not_reachable:{pt:{label:"IN Not Reachable \u2014 Finaliza\xE7\xE3o 2 Day Rule",alias:"2day fim"},es:{label:"IN Not Reachable \u2014 Cierre 2 Day Rule",alias:"2day cierre"},en:{label:"IN Not Reachable \u2014 2 Day Rule (End)",alias:"2day end"}}};function qa(){return"sc_"+Date.now().toString(36)+Math.floor(Math.random()*1e3).toString(36)}function dn(e){if(!e||!e.id)return null;if(St[e.id])return e.id;let t=$t(e.id,e.substatus),a=Object.entries(St),o=a.find(([n,r])=>$t(n,e.substatus)===t&&Array.isArray(r.substatus)&&r.substatus.includes(e.substatus));if(o)return o[0];let i=a.find(([n])=>$t(n,e.substatus)===t);return i?i[0]:null}function pr(e){return(e.payload&&e.payload.scenarios||[]).filter(a=>!dn(a)).map(a=>a.id)}function cr(){try{return JSON.parse(localStorage.getItem(dr)||"{}")}catch{return{}}}function cn(e){return Array.isArray(e)?e.filter(t=>t&&t.id&&t.payload&&t.payload.subStatus).map((t,a)=>({id:t.id,kind:t.kind||"note",label:String(t.label||"Atalho"),alias:String(t.alias||""),order:Number.isFinite(t.order)?t.order:a,payload:{caseType:t.payload.caseType||"bau",status:t.payload.status||String(t.payload.subStatus).split("_")[0],subStatus:t.payload.subStatus,scenarios:Array.isArray(t.payload.scenarios)?t.payload.scenarios.filter(o=>o&&o.id).map(o=>({id:o.id,substatus:o.substatus||t.payload.subStatus})):[]}})):[]}var Re={list(){let e=Ke.get(Ma,null),t=cn(e===null?Re.defaults():e),a=cr();return t.slice().sort((o,i)=>{if(Re.isSortedByUsage()){let n=(a[i.id]||0)-(a[o.id]||0);if(n)return n}return o.order-i.order})},listRaw(){let e=Ke.get(Ma,null);return cn(e===null?Re.defaults():e).sort((t,a)=>t.order-a.order)},defaults(){let e=se();return kc.map((t,a)=>({...t,...lr[t.id][e]||lr[t.id].pt,order:a}))},isSortedByUsage(){return Ke.get(sr,!0)!==!1},setSortedByUsage(e){return Ke.set(sr,!!e)},async save(e){let t=Re.listRaw(),a=t.findIndex(n=>n.id===e.id);if(a===-1&&t.length>=_t)return{ok:!1,reason:"limit"};let o=cn([{...e,id:e.id||qa()}])[0];return o?(a===-1?(o.order=t.length,t.push(o)):(o.order=t[a].order,t[a]=o),{ok:!0,synced:(await Ke.set(Ma,t)).synced,shortcut:o}):{ok:!1,reason:"invalid"}},async remove(e){let t=Re.listRaw().filter(a=>a.id!==e).map((a,o)=>({...a,order:o}));await Ke.set(Ma,t)},async reorder(e,t){let a=Re.listRaw(),o=a.findIndex(r=>r.id===e);if(o===-1)return;let[i]=a.splice(o,1),n=Math.max(0,Math.min(t,a.length));a.splice(n,0,i),await Ke.set(Ma,a.map((r,s)=>({...r,order:s})))},registerUse(e){try{let t=cr();t[e]=(t[e]||0)+1,localStorage.setItem(dr,JSON.stringify(t))}catch{}}};var po=[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",category:"Tentativas & Agendamento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",placeholders:[{key:"[Seu Nome]",label:"Seu Nome",type:"text",auto:"agentName"},{key:"[INSERIR URL]",label:"URL do Site",type:"text"},{key:"[LINK DO MEET]",label:"Link da Reuni\xE3o",type:"text"}],template:"<p>Ol\xE1,</p><br><p>Aqui \xE9 o <strong>[Seu Nome]</strong> da equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tentei ligar no seguinte n\xFAmero: <strong>...</strong> sem sucesso, teria outro n\xFAmero para que eu pudesse entrar em contato?</p><br><p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>Em seu site: <strong>[INSERIR URL]</strong></p><p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, voc\xEA pode acessar o link da nossa reuni\xE3o: <strong>[LINK DO MEET]</strong></p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"reschedule2",name:"Proposta de Reagendamento",category:"Tentativas & Agendamento",subject:"Reagendamento de Consultoria",placeholders:[{key:"[DATA 1]",label:"Data 1",type:"text"},{key:"[HORA 1]",label:"Hora 1",type:"text"},{key:"[DATA 2]",label:"Data 2",type:"text"},{key:"[HORA 2]",label:"Hora 2",type:"text"},{key:"[DATA 3]",label:"Data 3",type:"text"},{key:"[HORA 3]",label:"Hora 3",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p><ul><li><strong>[DATA 1] \xE0s [HORA 1]</strong></li><li><strong>[DATA 2] \xE0s [HORA 2]</strong></li><li><strong>[DATA 3] \xE0s [HORA 3]</strong></li></ul><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email nas pr\xF3ximas 48 horas o caso ser\xE1 encerrado.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"max_reschedules",name:"Limite de Reagendamentos Excedido",category:"Tentativas & Agendamento",subject:"Status do Agendamento - Time de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este e-mail o encontre bem.</p><p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementa\xE7\xE3o das tags.</p><br><p>Infelizmente, <strong>n\xE3o podemos mais reagendar este caso espec\xEDfico</strong>, pois excedemos o limite m\xE1ximo de agendamentos permitido.</p><br><p>Se voc\xEA deseja prosseguir com a implementa\xE7\xE3o das tags, ser\xE1 necess\xE1rio abrir um <strong>novo caso</strong> diretamente com a <a href="https://support.google.com/google-ads">Ajuda do Google Ads</a>. Isso garantir\xE1 que voc\xEA receba o acompanhamento e o suporte necess\xE1rio para dar continuidade \xE0 sua solicita\xE7\xE3o.</p><br><p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colabora\xE7\xE3o.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"2_6_day3",name:"Dia 3 (Acompanhamento)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]",label:"A\xE7\xE3o Pendente",type:"text"},{key:"[MM/DD/YYYY]",label:"Data do Pr\xF3ximo Contato",type:"date"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Tentamos contato atrav\xE9s do N\xFAmero de Telefone, por\xE9m sem sucesso. Gostaria de saber se voc\xEA j\xE1 conseguiu <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, ou se voc\xEA j\xE1 possui uma previs\xE3o de quando essa a\xE7\xE3o ser\xE1 conclu\xEDda.</p><br><p>Continuarei monitorando o status da implementa\xE7\xE3o no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementa\xE7\xE3o.</p><p>Se voc\xEA tiver algum problema ou d\xFAvidas que impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_day6",name:"Dia 6 (Acompanhamento Final)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[URL]",label:"URL do Site",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Ap\xF3s an\xE1lise e revis\xE3o do status de implementa\xE7\xE3o da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda est\xE1 com a implementa\xE7\xE3o pendente. Tentamos contato atrav\xE9s do email, por\xE9m sem sucesso.</p><br><p>\xC9 essencial que seja implementado, pois ele oferece uma ampla gama de benef\xEDcios, como:</p><ul><li>Ajuda a rastrear convers\xF5es em tempo real</li><li>Melhora a gera\xE7\xE3o de receita, em termos de cliques</li><li>Serve para vincular o Google Analytics e os an\xFAncios e acompanhar convers\xF5es</li><li>Fornece informa\xE7\xF5es sobre a experi\xEAncia do usu\xE1rio</li></ul><br><p>Se voc\xEA tiver algum problema ou d\xFAvidas que o impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco. Teremos o maior prazer em ajudar.</p><p>Caso n\xE3o tenhamos nenhuma resposta nos pr\xF3ximos 3 dias, infelizmente o caso ser\xE1 encerrado.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_completed_reschedule",name:"A\xE7\xF5es Conclu\xEDdas (Solicitar Reagendamento)",category:"Follow Up",subject:"Continuidade da Implementa\xE7\xE3o - Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Disponibilidade em BAU]",label:"Pr\xF3xima Disponibilidade",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Maravilha! Muito bom saber que conseguiu concluir as a\xE7\xF5es pendentes. Sendo assim, agora podemos continuar com a implementa\xE7\xE3o das configura\xE7\xF5es em sua conta.</p><br><p>Para isso, pe\xE7o, por favor, que me envie algumas das pr\xF3ximas datas e hor\xE1rios em que est\xE1 dispon\xEDvel a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p><p>Assim que me enviar essa informa\xE7\xE3o, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"nrp_standard",name:"NRP - Padr\xE3o (3\xAA Tentativa)",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Task pedida pelo AM]",label:"Task Solicitada",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reuni\xE3o.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"nrp_dfa",name:"NRP - DFA",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'}],gr={attempt_10min:{name:"Intento de Contacto (Antes de los 10min)",category:"Intentos y Programaci\xF3n",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Intento de Contacto",labels:{"[Seu Nome]":"Tu Nombre","[INSERIR URL]":"URL del Sitio","[LINK DO MEET]":"Enlace de la Reuni\xF3n"},template:"<p>Hola,</p><br><p>Le habla <strong>[Seu Nome]</strong> del equipo de Soluciones T\xE9cnicas de Google. Intent\xE9 llamar al siguiente n\xFAmero: <strong>...</strong> sin \xE9xito, \xBFtendr\xEDa otro n\xFAmero para que pueda ponerme en contacto?</p><br><p>Le recuerdo que voy a ayudarle a implementar la siguiente tarea:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>En su sitio: <strong>[INSERIR URL]</strong></p><p>Intentar\xE9 llamar nuevamente en 10 minutos; si lo prefiere, puede acceder al enlace de nuestra reuni\xF3n: <strong>[LINK DO MEET]</strong></p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},reschedule2:{name:"Propuesta de Reprogramaci\xF3n",category:"Intentos y Programaci\xF3n",subject:"Reprogramaci\xF3n de Consultor\xEDa",labels:{"[DATA 1]":"Fecha 1","[HORA 1]":"Hora 1","[DATA 2]":"Fecha 2","[HORA 2]":"Hora 2","[DATA 3]":"Fecha 3","[HORA 3]":"Hora 3","[Seu Nome]":"Firma"},template:"<p>Hola, \xBFc\xF3mo est\xE1?</p><br><p>Estas son las pr\xF3ximas fechas disponibles:</p><ul><li><strong>[DATA 1] a las [HORA 1]</strong></li><li><strong>[DATA 2] a las [HORA 2]</strong></li><li><strong>[DATA 3] a las [HORA 3]</strong></li></ul><br><p>Tambi\xE9n le informo que si no hay respuesta a este correo en las pr\xF3ximas 48 horas el caso ser\xE1 cerrado.</p><p>Le recuerdo que mi agenda es din\xE1mica, por lo que en cualquier momento se puede agendar una consultor\xEDa para los d\xEDas disponibles. Por lo tanto, cuanto m\xE1s r\xE1pido pueda responderme, m\xE1s garantizada ser\xE1 la programaci\xF3n de la fecha y el horario.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},max_reschedules:{name:"L\xEDmite de Reprogramaciones Excedido",category:"Intentos y Programaci\xF3n",subject:"Estado de la Programaci\xF3n - Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este correo le encuentre bien.</p><p>Le escribo en nombre del equipo de Google Ads para informarle sobre su solicitud de reprogramaci\xF3n para la implementaci\xF3n de las etiquetas.</p><br><p>Lamentablemente, <strong>ya no podemos reprogramar este caso espec\xEDfico</strong>, pues hemos excedido el l\xEDmite m\xE1ximo de programaciones permitido.</p><br><p>Si desea continuar con la implementaci\xF3n de las etiquetas, ser\xE1 necesario abrir un <strong>nuevo caso</strong> directamente con la <a href="https://support.google.com/google-ads">Ayuda de Google Ads</a>. Esto garantizar\xE1 que reciba el seguimiento y el soporte necesarios para dar continuidad a su solicitud.</p><br><p>Agradecemos su participaci\xF3n en este proceso y la oportunidad de ayudar. Esperamos continuar nuestra colaboraci\xF3n.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'},"2_6_day3":{name:"D\xEDa 3 (Seguimiento)",category:"Follow Up",subject:"Consultor\xEDa con el Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]":"Acci\xF3n Pendiente","[MM/DD/YYYY]":"Fecha del Pr\xF3ximo Contacto","[Seu Nome]":"Firma"},template:"<p>Hola, <strong>[Nome do Cliente]</strong></p><br><p>\xA1Espero que se encuentre bien!</p><p>Intentamos contactarle por tel\xE9fono, pero sin \xE9xito. Me gustar\xEDa saber si ya pudo <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, o si ya tiene una previsi\xF3n de cu\xE1ndo se concluir\xE1 esa acci\xF3n.</p><br><p>Continuar\xE9 monitoreando el estado de la implementaci\xF3n en su sitio, y el d\xEDa <strong>[MM/DD/YYYY]</strong> har\xE9 un nuevo seguimiento para verificar el avance de la implementaci\xF3n.</p><p>Si tiene alg\xFAn problema o duda que le impida realizar la implementaci\xF3n, no dude en compartirlo con nosotros.</p><br><p>Quedo a disposici\xF3n.</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>"},"2_6_day6":{name:"D\xEDa 6 (Seguimiento Final)",category:"Follow Up",subject:"Consultor\xEDa con el Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[URL]":"URL del Sitio","[Seu Nome]":"Firma"},template:"<p>Hola, <strong>[Nome do Cliente]</strong></p><br><p>\xA1Espero que se encuentre bien!</p><p>Tras analizar y revisar el estado de implementaci\xF3n de la etiqueta en su sitio, <strong>[URL]</strong>, verificamos que la etiqueta a\xFAn est\xE1 pendiente de implementaci\xF3n. Intentamos contactarle por correo, pero sin \xE9xito.</p><br><p>Es esencial que sea implementada, pues ofrece una amplia gama de beneficios, como:</p><ul><li>Ayuda a rastrear conversiones en tiempo real</li><li>Mejora la generaci\xF3n de ingresos, en t\xE9rminos de clics</li><li>Sirve para vincular Google Analytics con los anuncios y hacer seguimiento de las conversiones</li><li>Proporciona informaci\xF3n sobre la experiencia del usuario</li></ul><br><p>Si tiene alg\xFAn problema o duda que le impida realizar la implementaci\xF3n, no dude en compartirlo con nosotros. Estaremos encantados de ayudar.</p><p>Si no recibimos ninguna respuesta en los pr\xF3ximos 3 d\xEDas, lamentablemente el caso ser\xE1 cerrado.</p><br><p>Quedo a disposici\xF3n.</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>"},"2_6_completed_reschedule":{name:"Acciones Concluidas (Solicitar Reprogramaci\xF3n)",category:"Follow Up",subject:"Continuidad de la Implementaci\xF3n - Soluciones T\xE9cnicas de Google",labels:{"[Disponibilidade em BAU]":"Pr\xF3xima Disponibilidad","[Seu Nome]":"Firma"},template:"<p>Hola, \xBFc\xF3mo est\xE1?</p><br><p>\xA1Excelente! Muy bueno saber que logr\xF3 concluir las acciones pendientes. Siendo as\xED, ahora podemos continuar con la implementaci\xF3n de las configuraciones en su cuenta.</p><br><p>Para eso, le pido, por favor, que me env\xEDe algunas de las pr\xF3ximas fechas y horarios en los que est\xE9 disponible a partir del d\xEDa <strong>[Disponibilidade em BAU]</strong>.</p><p>En cuanto me env\xEDe esa informaci\xF3n, crear\xE9 una reprogramaci\xF3n para que uno de nuestros agentes contin\xFAe ayud\xE1ndole.</p><br><p>Tambi\xE9n le informo que si no hay respuesta a este correo, realizar\xE9 un seguimiento de este caso durante 6 d\xEDas, en el que me pondr\xE9 en contacto cada 3 d\xEDas para intentar reprogramar su caso lo antes posible.</p><p>Le recuerdo que mi agenda es din\xE1mica, por lo que en cualquier momento se puede agendar una consultor\xEDa para los d\xEDas disponibles. Por lo tanto, cuanto m\xE1s r\xE1pido pueda responderme, m\xE1s garantizada ser\xE1 la programaci\xF3n de la fecha y el horario.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},nrp_standard:{name:"NRP - Est\xE1ndar (3.\xBA Intento)",category:"NRP / Cierre",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Cierre",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Task pedida pelo AM]":"Tarea Solicitada","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Intentamos llamarle hoy sobre el caso de Implementaci\xF3n de la etiqueta referente a la solicitud de <strong>[Task pedida pelo AM]</strong>. Se hizo otro intento despu\xE9s de 10 minutos, pero tampoco logramos contactarle.</p><p>Debido a la alta demanda, no podemos reprogramar un horario. Por eso, vamos a cerrar este caso. Sin embargo, si a\xFAn desea continuar con la implementaci\xF3n, basta con acceder a este enlace y elegir la mejor fecha y horario para hablar con nuestro equipo, o si lo prefiere, p\xF3ngase en contacto con su gerente de cuentas de Google para agendar una nueva reuni\xF3n.</p><p>Lamentamos el inconveniente y esperamos trabajar con usted nuevamente en el futuro.</p><br><p>Si desea saber m\xE1s, consulte a continuaci\xF3n algunos enlaces \xFAtiles con recursos valiosos relacionados con la implementaci\xF3n de etiquetas y el soporte de Shopping.</p><p><strong>En relaci\xF3n con las etiquetas</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Soporte para la implementaci\xF3n de etiquetas</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>En relaci\xF3n con Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">C\xF3mo configurar la cuenta y el feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Optimizaci\xF3n del feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'},nrp_dfa:{name:"NRP - DFA",category:"NRP / Cierre",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Cierre",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Intentamos llamarle hoy sobre el caso de Implementaci\xF3n de la etiqueta referente a la solicitud. Se hizo otro intento despu\xE9s de 10 minutos, pero tampoco logramos contactarle.</p><p>Debido a la alta demanda, no podemos reprogramar un horario. Por eso, vamos a cerrar este caso. Sin embargo, si a\xFAn desea continuar con la implementaci\xF3n, basta con acceder a este enlace y elegir la mejor fecha y horario para hablar con nuestro equipo.</p><p>Lamentamos el inconveniente y esperamos trabajar con usted nuevamente en el futuro.</p><br><p>Si desea saber m\xE1s, consulte a continuaci\xF3n algunos enlaces \xFAtiles con recursos valiosos relacionados con la implementaci\xF3n de etiquetas y el soporte de Shopping.</p><p><strong>En relaci\xF3n con las etiquetas</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Soporte para la implementaci\xF3n de etiquetas</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>En relaci\xF3n con Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">C\xF3mo configurar la cuenta y el feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Optimizaci\xF3n del feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'}},fr={attempt_10min:{name:"Contact Attempt (Before the 10min)",category:"Attempts & Scheduling",subject:"Implementation with the Google Technical Solutions Team - Contact Attempt",labels:{"[Seu Nome]":"Signature","[INSERIR URL]":"Site URL","[LINK DO MEET]":"Meet Link"},template:"<p>Hello,</p><br><p>This is <strong>[Seu Nome]</strong> from the Google Technical Solutions team. I tried calling the following number: <strong>...</strong> without success. Would you have another number I could reach you on?</p><br><p>As a reminder, I will be helping you implement the following task:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>On your site: <strong>[INSERIR URL]</strong></p><p>I will try calling again within 10 minutes. If you prefer, you can join our meeting link: <strong>[LINK DO MEET]</strong></p><br><p>Best regards,</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google.</p>"},reschedule2:{name:"Rescheduling Proposal",category:"Attempts & Scheduling",subject:"Consultation Rescheduling",labels:{"[DATA 1]":"Date 1","[HORA 1]":"Time 1","[DATA 2]":"Date 2","[HORA 2]":"Time 2","[DATA 3]":"Date 3","[HORA 3]":"Time 3","[Seu Nome]":"Signature"},template:"<p>Hello, how are you?</p><br><p>Here are the next available dates:</p><ul><li><strong>[DATA 1] at [HORA 1]</strong></li><li><strong>[DATA 2] at [HORA 2]</strong></li><li><strong>[DATA 3] at [HORA 3]</strong></li></ul><br><p>Please note that if there is no reply to this email within the next 48 hours, the case will be closed.</p><p>My calendar is dynamic, so a consultation can be booked for the available days at any time. The sooner you can reply, the more likely it is that the date and time will be secured.</p><br><p>Best regards,</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google.</p>"},max_reschedules:{name:"Rescheduling Limit Exceeded",category:"Attempts & Scheduling",subject:"Scheduling Status - Google Technical Solutions Team",labels:{"[Nome do Cliente]":"Customer Name","[Seu Nome]":"Signature"},template:'<p>Hello, <strong>[Nome do Cliente]</strong>,</p><br><p>I hope this email finds you well.</p><p>I am writing on behalf of the Google Ads team regarding your rescheduling request for the tag implementation.</p><br><p>Unfortunately, <strong>we can no longer reschedule this particular case</strong>, as we have exceeded the maximum number of bookings allowed.</p><br><p>If you would like to proceed with the tag implementation, you will need to open a <strong>new case</strong> directly with <a href="https://support.google.com/google-ads">Google Ads Help</a>. That will ensure you receive the follow-up and support needed to continue with your request.</p><br><p>Thank you for your involvement in this process and for the opportunity to help. We look forward to continuing our collaboration.</p><br><p>Best regards,</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google</p>'},"2_6_day3":{name:"Day 3 (Follow-up)",category:"Follow Up",subject:"Consultation with the Google Technical Solutions Team",labels:{"[Nome do Cliente]":"Customer Name","[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]":"Pending Action","[MM/DD/YYYY]":"Next Contact Date","[Seu Nome]":"Signature"},template:"<p>Hello, <strong>[Nome do Cliente]</strong></p><br><p>I hope you are well!</p><p>We tried to reach you by phone, but without success. I would like to know whether you have been able to <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, or whether you have an estimate of when that action will be completed.</p><br><p>I will keep monitoring the implementation status on your site, and on <strong>[MM/DD/YYYY]</strong> I will follow up again to check on its progress.</p><p>If you run into any problem or question that prevents you from completing the implementation, please feel free to share it with us.</p><br><p>I remain at your disposal.</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google</p>"},"2_6_day6":{name:"Day 6 (Final Follow-up)",category:"Follow Up",subject:"Consultation with the Google Technical Solutions Team",labels:{"[Nome do Cliente]":"Customer Name","[URL]":"Site URL","[Seu Nome]":"Signature"},template:"<p>Hello, <strong>[Nome do Cliente]</strong></p><br><p>I hope you are well!</p><p>After analyzing and reviewing the tag implementation status on your site, <strong>[URL]</strong>, we found that the tag is still pending implementation. We tried to reach you by email, but without success.</p><br><p>Implementing it is essential, as it offers a wide range of benefits, such as:</p><ul><li>It helps track conversions in real time</li><li>It improves revenue generation, in terms of clicks</li><li>It links Google Analytics to your ads and tracks conversions</li><li>It provides insight into the user experience</li></ul><br><p>If you run into any problem or question that prevents you from completing the implementation, please feel free to share it with us. We would be glad to help.</p><p>If we do not hear back within the next 3 days, the case will unfortunately be closed.</p><br><p>I remain at your disposal.</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google</p>"},"2_6_completed_reschedule":{name:"Actions Completed (Request Rescheduling)",category:"Follow Up",subject:"Continuing the Implementation - Google Technical Solutions",labels:{"[Disponibilidade em BAU]":"Next Availability","[Seu Nome]":"Signature"},template:"<p>Hello, how are you?</p><br><p>Great! Good to hear you managed to complete the pending actions. That means we can now continue with the setup on your account.</p><br><p>For that, please send me a few of the next dates and times you are available from <strong>[Disponibilidade em BAU]</strong> onwards.</p><p>As soon as you send that over, I will create a rescheduling so one of our agents can continue helping you.</p><br><p>Please also note that if there is no reply to this email, I will follow up on this case for 6 days, getting in touch every 3 days so we can reschedule your case as soon as possible.</p><p>My calendar is dynamic, so a consultation can be booked for the available days at any time. The sooner you can reply, the more likely it is that the date and time will be secured.</p><br><p>Best regards,</p><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google.</p>"},nrp_standard:{name:"NRP - Standard (3rd Attempt)",category:"NRP / Closure",subject:"Implementation with the Google Technical Solutions Team - Closure",labels:{"[Nome do Cliente]":"Customer Name","[Task pedida pelo AM]":"Requested Task","[Seu Nome]":"Signature"},template:'<p>Hello, <strong>[Nome do Cliente]</strong>,</p><br><p>We tried to call you today about the tag Implementation case regarding the request for <strong>[Task pedida pelo AM]</strong>. Another attempt was made after 10 minutes, but we were unable to reach you then either.</p><p>Due to high demand, we are unable to reschedule a time. We will therefore be closing this case. However, if you would still like to continue with the implementation, you can use this link to pick the best date and time to speak with our team, or if you prefer, contact your Google account manager to book a new meeting.</p><p>We apologize for the inconvenience and hope to work with you again in the future.</p><br><p>If you would like to know more, below are some useful links with valuable resources about tag implementation and Shopping support.</p><p><strong>Regarding tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Tag implementation support</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Regarding Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">How to set up the account and the feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Feed optimization</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google platforms</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google</p>'},nrp_dfa:{name:"NRP - DFA",category:"NRP / Closure",subject:"Implementation with the Google Technical Solutions Team - Closure",labels:{"[Nome do Cliente]":"Customer Name","[Seu Nome]":"Signature"},template:'<p>Hello, <strong>[Nome do Cliente]</strong>,</p><br><p>We tried to call you today about the tag Implementation case regarding the request. Another attempt was made after 10 minutes, but we were unable to reach you then either.</p><p>Due to high demand, we are unable to reschedule a time. We will therefore be closing this case. However, if you would still like to continue with the implementation, you can use this link to pick the best date and time to speak with our team.</p><p>We apologize for the inconvenience and hope to work with you again in the future.</p><br><p>If you would like to know more, below are some useful links with valuable resources about tag implementation and Shopping support.</p><p><strong>Regarding tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Tag implementation support</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Regarding Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">How to set up the account and the feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Feed optimization</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google platforms</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Cognizant Technical Solutions Team, on behalf of Google</p>'}},ur={pt:"pt-BR",es:"es-ES",en:"en-US"};function br(e,t){return e.toLocaleDateString(ur[t]||ur.pt,{year:"numeric",month:"2-digit",day:"2-digit"})}function hr(e,t){let a={es:gr,en:fr}[t];if(!a)return e;let o=a[e?.id];return o?{...e,name:o.name??e.name,category:o.category??e.category,subject:o.subject??e.subject,template:o.template??e.template,placeholders:(e.placeholders||[]).map(i=>({...i,label:o.labels?.[i.key]??i.label}))}:e}function mr(e){if(!Array.isArray(e)||!e.length)return!1;let t=e.slice().sort((i,n)=>(i.sortOrder||0)-(n.sortOrder||0)),a=[],o={ES:{},EN:{}};for(let i of t){let n=i.key;if(!n)continue;let r;try{r=JSON.parse(i.value||"{}")}catch{continue}if(!r.subject||!r.template)continue;let s=String(i.lang||"").toUpperCase(),l=o[s];l?l[n]={name:i.label||"",category:i.field||"",subject:r.subject,template:r.template,labels:r.labels||{}}:(s==="PT"||s===""||s==="ALL")&&a.push({id:n,name:i.label||n,category:i.field||"",subject:r.subject,template:r.template,placeholders:r.placeholders||[]})}if(!a.length)return!1;po.length=0,po.push(...a);for(let[i,n]of[["ES",gr],["EN",fr]])if(Object.keys(o[i]).length){for(let r of Object.keys(n))delete n[r];Object.assign(n,o[i])}return!0}async function xr(){let e=fe.getCachedContent("email_template"),t=mr(e);try{let a=await fe.fetchContentModule("email_template");t=mr(a)||t}catch(a){console.warn("Central de Conte\xFAdo indispon\xEDvel; usando modelos embutidos.",a)}return t}var mo={pt:{emailButtonNotFound:"Erro: Bot\xE3o de email n\xE3o encontrado.",clearingOldDraft:"Limpando rascunho antigo...",editorNotLoaded:"Erro: Editor n\xE3o carregou.",cannedResponseApplied:"Canned Response aplicada!",cannedResponseTimeout:e=>`Timeout: Template '${e}' n\xE3o carregou.`,cannedResponseButtonNotFound:"Bot\xE3o Canned Response n\xE3o encontrado.",emailFilledSuccess:"Email preenchido com sucesso!",editorFocusError:"Erro ao focar no editor.",verifyEmailWarning:"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente.",amCcWarning:"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.",fallbackClient:"Cliente",fallbackSite:"seu site"},es:{emailButtonNotFound:"Error: Bot\xF3n de email no encontrado.",clearingOldDraft:"Limpiando borrador antiguo...",editorNotLoaded:"Error: El editor no carg\xF3.",cannedResponseApplied:"\xA1Canned Response aplicada!",cannedResponseTimeout:e=>`Tiempo agotado: la plantilla '${e}' no carg\xF3.`,cannedResponseButtonNotFound:"Bot\xF3n Canned Response no encontrado.",emailFilledSuccess:"\xA1Email completado con \xE9xito!",editorFocusError:"Error al enfocar el editor.",verifyEmailWarning:"<strong>Verifica el correo:</strong> El CRM puede traducir los caracteres de forma incorrecta.",amCcWarning:"<strong>Atenci\xF3n:</strong> Verifica si el correo del AM debe ir en copia.",fallbackClient:"Cliente",fallbackSite:"su sitio"},en:{emailButtonNotFound:"Error: email button not found.",clearingOldDraft:"Clearing the old draft...",editorNotLoaded:"Error: the editor did not load.",cannedResponseApplied:"Canned Response applied!",cannedResponseTimeout:e=>`Timed out: template '${e}' did not load.`,cannedResponseButtonNotFound:"Canned Response button not found.",emailFilledSuccess:"Email filled in successfully!",editorFocusError:"Error focusing the editor.",verifyEmailWarning:"<strong>Check the email address:</strong> The CRM may translate characters incorrectly.",amCcWarning:"<strong>Heads up:</strong> Check whether the AM's email should be in CC.",fallbackClient:"Customer",fallbackSite:"your site"}};function vt(e){let t=se();return mo[t]?.[e]??mo.pt[e]}function uo(e){let t=ct();return mo[t]?.[e]??mo.pt[e]}function Be(e,t="info"){let a={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${e}`,a[t]||a.info)}function go(e,t){if(!e)return;let a=`cw-warning-${e.id||Math.random().toString(36).substr(2,9)}`,o=document.getElementById(a);o&&o.remove();let i=e.getBoundingClientRect(),n=document.createElement("div");n.id=a,n.style.cssText=`
        position: fixed;
        top: ${i.bottom+8}px;
        left: ${i.left}px;
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
        z-index: ${je.TOAST};
        font-family: 'Google Sans', Roboto, sans-serif;
        font-size: 13px;
        color: #202124;
        opacity: 0;
        transform: translateY(-5px);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        pointer-events: auto;
    `,n.innerHTML=`
        <div style="display:flex; align-items:flex-start; gap:10px;">
            <span style="color:#F9AB00; font-size:16px; margin-top:1px;">\u26A0\uFE0F</span>
            <span style="line-height:1.4;">${t}</span>
        </div>
        <div class="cw-close-btn" style="
            cursor: pointer; color: #5f6368; font-weight: bold; font-size: 16px; 
            padding: 0 4px; line-height: 1; opacity: 0.6; transition: opacity 0.2s;
        ">\xD7</div>
    `;let r=n.querySelector(".cw-close-btn");r.onclick=()=>{n.style.opacity="0",n.style.transform="translateY(-5px)",setTimeout(()=>n.remove(),300)},document.body.appendChild(n),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(n)&&r.click()},25e3)}async function fo(e,t){if(!e||!t)return;e.focus(),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await be(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),await be(100),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function un(){let t=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(a=>{let o=a.offsetParent!==null,i=a.closest("case-message-view")!==null,n=a.closest(".editor")!==null||a.closest("write-card")!==null;return o&&!i&&n});return t&&Be("Editor visualmente detectado.","success"),t}var pn=e=>!!e&&e.getClientRects().length>0&&e.getAttribute("aria-disabled")!=="true";async function Tc(e,{timeout:t=3e3,intervalo:a=100}={}){let o=Date.now()+t;for(;Date.now()<o;){let i=e();if(i)return i;await be(a)}return null}function vr(){let e=Array.from(document.querySelectorAll('material-button.compose, material-button.speed-dial-mini-fab[role="menuitem"]')),t=e.find(a=>a.classList.contains("compose")&&pn(a));return t||e.find(a=>{let o=a.querySelector("i.material-icons-extended");return pn(a)&&o&&o.textContent.trim()==="email"})||null}async function Lc(){try{let e=vr();if(e)Be("Menu do speed dial j\xE1 estava aberto.");else{let t=document.querySelector("#action-bar-speed-dial-container material-button")||document.querySelector("material-button.action-bar-speed-dial-button");if(!pn(t))return Be("Speed dial (+ Open) n\xE3o encontrado.","warn"),!1;Be("Speed dial (+ Open) encontrado. Abrindo o menu..."),Je(t),await be(350),e=await Tc(vr,{timeout:3e3})}return e?(await be(120),Je(e),Be("Compose clicado via speed dial.","success"),!0):(Be("Menu abriu, mas o bot\xE3o Compose n\xE3o apareceu.","warn"),!1)}catch(e){return Be(`Falha no speed dial: ${e.message}`,"error"),!1}}async function Ic(){let t=Array.from(document.querySelectorAll("i.material-icons-extended")).find(o=>o.innerText.trim()==="email");if(t&&t.offsetParent!==null){Be("Bot\xE3o de email direto encontrado.");let o=t.closest("material-button")||t.closest("material-fab")||t;return Je(o),!0}Be("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let a=document.querySelector("material-fab-speed-dial");if(a){let o=a.querySelector(".trigger");if(o){Je(o),await be(800);let n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(r=>r.innerText.trim()==="email");if(n)return Je(n),Be("Email aberto pelo fluxo antigo.","success"),!0}}return!1}async function yr(){Be("\u{1F680} FASE 1: Tentando abrir a janela de email...");let e=await Lc();if(e||(Be("UI nova n\xE3o reconhecida. Voltando ao fluxo da UI antiga...","warn"),e=await Ic()),!e)return y.playError(),te(vt("emailButtonNotFound"),{error:!0}),!1;Be("\u{1F680} FASE 2: Verificando rascunhos...");let t=null,a=0,o=20;for(;a<o;){await be(250);let p=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(t=Array.from(p).find(d=>d.offsetParent!==null),t){Be("\u26A0\uFE0F Rascunho detectado!","warn");break}a++}if(t){Be("\u{1F5D1}\uFE0F Descartando..."),Je(t),t.click();let p=null,d=0;for(;d<15;){await be(300);let A=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(p=Array.from(A).find(u=>u.offsetParent!==null),p)break;d++}p&&(Je(p),te(vt("clearingOldDraft"),{duration:2e3}),await be(2500))}Be("\u{1F680} FASE 3: Buscando editor final...");let i=0,n=null;for(;i<20&&(n=un(),!n);)await be(250),i++;if(!n)return y.playError(),te(vt("editorNotLoaded"),{error:!0}),!1;let r=n.closest('[id="email-body-content-top"]'),l=(n.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(r){if(l){let d=l.closest('[aria-hidden="true"]');d&&d.removeAttribute("aria-hidden"),l.focus(),Je(l)}await be(300),r.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let p=r.querySelector("#cases-body-field");if(p){let d=document.createRange();d.selectNodeContents(p),d.collapse(!0);let A=window.getSelection();A.removeAllRanges(),A.addRange(d)}return!0}return!1}async function bo(e){if(!e||!await yr())return;let a=await bt();Be("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let o=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(o&&(o.click(),await be(600)),a.clientEmail&&a.clientEmail!=="N/A"&&a.clientEmail!=="N/A (Bloqueado)"){let n=document.querySelector('input[aria-label="Enter To email address"]');n&&(await fo(n,a.clientEmail),go(n,vt("verifyEmailWarning")))}if(a.internalEmail){let n=document.querySelector('input[aria-label="Enter Bcc email address"]');n&&(await fo(n,a.internalEmail),go(n,vt("amCcWarning")))}await be(500);let i=document.querySelector('material-button[debug-id="canned_response_button"]');if(i){Je(i),await be(1e3);let n=document.querySelector("material-auto-suggest-input input");if(n){Je(n),document.execCommand("insertText",!1,e),n.dispatchEvent(new Event("input",{bubbles:!0})),Be("\u23F3 Buscando resultado da Canned Response...","info");let r=null,s=0,l=15e3,p=500;for(;s<l&&(r=document.querySelector("material-select-dropdown-item"),!r);)await be(p),s+=p;if(r){Je(r),await be(1500);let d=un();if(d){let u=Array.from(d.querySelectorAll("span.field")).filter(N=>N.innerText.includes("{Requested Task Type}"));if(u.length>0){let N=u.map(I=>I.closest("tr")).filter(I=>I!==null),v=[...new Set(N)];if(v.length>0){let z=v[0].querySelector('td[width="100%"]');z&&(z.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let U=1;U<v.length;U++)v[U].remove()}}let h=d.innerHTML;a.advertiserName&&h.includes("{%ADVERTISER_NAME%}")&&(h=h.replace(/{%ADVERTISER_NAME%}/g,a.advertiserName)),h.includes("{%^79285%}")&&(h=h.replace(/{%\^79285%}/g,a.websiteUrl||uo("fallbackSite"))),d.innerHTML=h}te(vt("cannedResponseApplied"))}else Be(`\u274C Timeout: Resultado '${e}' n\xE3o apareceu ap\xF3s 15s.`,"error"),y.playError(),te(vt("cannedResponseTimeout")(e),{error:!0})}}else y.playError(),te(vt("cannedResponseButtonNotFound"),{error:!0})}async function wr(e){if(Be(`\u{1F680} Iniciando Quick Email: ${e.name}`),!await yr())return;let a=await bt(),o=Ea();await be(600);let i=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(i&&(i.click(),await be(600)),a.clientEmail&&a.clientEmail!=="N/A"&&a.clientEmail!=="N/A (Bloqueado)"){let s=document.querySelector('input[aria-label="Enter To email address"]');s&&(await fo(s,a.clientEmail),go(s,vt("verifyEmailWarning")))}if(a.internalEmail){let s=document.querySelector('input[aria-label="Enter Bcc email address"]');s&&(await fo(s,a.internalEmail),go(s,vt("amCcWarning")))}let n=document.querySelector('input[aria-label="Subject"]');n&&e.subject&&(n.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(n,e.subject),n.dispatchEvent(new Event("input",{bubbles:!0})),await be(300));let r=un();if(r){let l=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');l&&(l.focus(),Je(l));let p=new Date;p.setDate(p.getDate()+3);let d=p.getDay();d===6?p.setDate(p.getDate()+2):d===0&&p.setDate(p.getDate()+1);let A=br(p,ct()),u=e.body;u=u.replace(/\[Nome do Cliente\]/g,a.advertiserName||uo("fallbackClient")),u=u.replace(/\[INSERIR URL\]/g,a.websiteUrl||uo("fallbackSite")),u=u.replace(/\[URL\]/g,a.websiteUrl||uo("fallbackSite")),u=u.replace(/\[Seu Nome\]/g,o),u=u.replace(/\[MM\/DD\/YYYY\]/g,A),document.execCommand("insertHTML",!1,u),l&&(l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))),te(vt("emailFilledSuccess"),{duration:2e3}),Be("\u2705 Processo finalizado com sucesso.","success")}else y.playError(),te(vt("editorFocusError"),{error:!0})}var mn=460,gn=280,Nc=200,fn=.06;if(!document.getElementById("cw-module-styles")){let e=document.createElement("style");e.id="cw-module-styles",e.innerHTML=`
        /* M\xD3DULO BASE */
        .cw-module-window {
            /* Degrau de repouso da janela. Precisa estar AQUI, e n\xE3o s\xF3
               no estilo inline de stylePopup(): o fim do fechamento faz
               popup.style.zIndex = '', o que apaga o inline e deixaria a
               janela em z-index:auto na pr\xF3xima abertura. */
            z-index: ${je.MODULE_RESTING};
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
            transform: scale(${fn});

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
    `,document.head.appendChild(e)}window._cwEscapeListenerActive||(window._cwEscapeListenerActive=!0,document.addEventListener("keydown",e=>{if(e.key!=="Escape"||document.querySelector(".cw-dialog-overlay"))return;let t=document.querySelector(".cw-module-window.open");if(!t)return;let a=t.querySelector(".cw-header-close");a&&a.click()}));function Lr(){return!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)}function Sr(e){let t=document.querySelector(".cw-pill"),a=e?document.getElementById(e):null,o=!!(t&&t.classList.contains("collapsed")),i=n=>{if(!n)return null;let r=n.getBoundingClientRect();return!r.width||!r.height?null:{x:r.left+r.width/2,y:r.top+r.height/2}};if(!o){let n=i(a);if(n)return n}return i(t)}function Ar(e,t){let a=e.style.transition,o=e.style.transform;e.style.transition="none",e.style.transform="none";let i=e.getBoundingClientRect();return e.style.transform=o,e.offsetWidth,e.style.transition=a,{left:t?i.left:i.left-i.width/2,top:t?i.top:i.top-i.height/2,width:i.width,height:i.height}}function Cr(e,t,a){if(!t){e.style.transformOrigin="50% 50%",e._cwOrigin=null;return}let o=`${Math.round(t.x-a.left)}px ${Math.round(t.y-a.top)}px`;e.style.transformOrigin=o,e._cwOrigin=o}function Er(e){return e?`translate(0, 0) scale(${fn})`:`translate(-50%, -50%) scale(${fn})`}function _c(e){return e?"translate(0, 0) scale(1)":"translate(-50%, -50%) scale(1)"}function kr(e){!e||Lr()||(e.classList.remove("cw-absorbing"),e.offsetWidth,e.classList.add("cw-absorbing"),setTimeout(()=>e.classList.remove("cw-absorbing"),400))}function Ze(e){return e?typeof e._cwOpen=="boolean"?e._cwOpen:e.classList.contains("open"):!1}function Ve(e,t,a){let o=a?document.getElementById(a):null;if(!t)return;t._cwOpen=!!e;let i=(t._cwAnimToken||0)+1;t._cwAnimToken=i;let n=()=>t._cwAnimToken!==i;t._cwTeardown&&(t._cwTeardown(),t._cwTeardown=null);let r=Lr(),s=t.getAttribute("data-moved")==="true";if(e){y.playGenieOpen();let l=Ar(t,s);Cr(t,Sr(a),l),t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",t.style.transform=Er(s),t.style.willChange="transform, opacity",t.classList.add("cw-animating"),t.offsetWidth,requestAnimationFrame(()=>{n()||(t.classList.add("open"),t.classList.remove("idle"),o&&o.classList.add("active"),kr(o),t.style.transition=r?"opacity 0.15s ease":`opacity ${Math.round(mn*.6)}ms ease-out, transform ${mn}ms var(--cw-ease-decelerate), filter 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease`,t.style.opacity="1",t.style.transform=_c(s),Tr(t,i,r?150:mn,()=>{t.style.willChange="auto",t.classList.remove("cw-animating"),t._cwSettled=!0}))}),t._cwSettled=!1,Oc(t,a)}else{if(y.playSwoosh(),t._cwSettled||!t._cwOrigin){let l=Ar(t,s);Cr(t,Sr(a),l)}if(t.style.transition=r?"opacity 0.15s ease":`opacity ${Math.round(gn*.8)}ms ease, transform ${gn}ms var(--cw-ease-accelerate)`,t.style.pointerEvents="none",t.style.willChange="transform, opacity",t.classList.add("cw-animating"),o&&t.contains(document.activeElement))try{o.focus({preventScroll:!0})}catch{o.focus()}requestAnimationFrame(()=>{n()||(t.style.opacity="0",t.style.transform=Er(s),Tr(t,i,r?150:gn,()=>{t.classList.remove("open"),t.classList.remove("idle"),t.style.zIndex="",o&&o.classList.remove("active"),kr(o),t.style.willChange="auto",t.classList.remove("cw-animating"),t.style.transition=""}))}),Ir(t)}}function Tr(e,t,a,o){let i=!1,n=()=>{e.removeEventListener("transitionend",s),clearTimeout(l),e._cwTeardown===n&&(e._cwTeardown=null)},r=()=>{i||(i=!0,n(),e._cwAnimToken===t&&o())},s=p=>{p.target===e&&p.propertyName==="transform"&&r()};e.addEventListener("transitionend",s);let l=setTimeout(r,a+Nc);e._cwTeardown=n}function Oc(e,t){Ir(e);let a=o=>{if(!e.classList.contains("open"))return;let i=e.contains(o.target),n=document.querySelector(".cw-pill"),r=n&&n.contains(o.target);i?(e.classList.remove("idle"),e.style.zIndex=String(je.MODULE_FOCUSED)):r||(e.classList.add("idle"),e.style.zIndex=String(je.MODULE_RESTING))};e._idleHandler=a,document.addEventListener("mousedown",a)}function Ir(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var Nr='<svg viewBox="0 0 24 24" fill="currentColor" style="width:13px;height:13px;flex-shrink:0;"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>';function _r(){let e="v4.0.0",{popup:t,content:a,header:o,animRefs:i,credit:n}=Ni(e,R),r=Vi(g),s=Ui(()=>{ne(),ee.setActiveTasks(s.getCheckedElements())},g,ee),l=document.createElement("div");l.style.display="none";let p=Hi((m,b)=>{pe(m,b)});l.appendChild(p);let d=document.createElement("button");d.type="button",d.className="cw-save-shortcut-btn",d.style.cssText=`
        margin-top: 10px; padding: 7px 12px; border-radius: 8px;
        border: 1px dashed ${G.border}; background: transparent;
        color: ${G.textSub}; font-family: inherit; font-size: 11.5px;
        font-weight: 600; cursor: pointer; display: inline-flex; align-items: center;
        gap: 6px; transition: all 0.2s ${Ce};
    `,d.onmouseenter=()=>{d.style.borderColor=G.primary,d.style.color=G.primary,y.playHover()},d.onmouseleave=()=>{d.style.borderColor=G.border,d.style.color=G.textSub},d.onclick=()=>oe(),d.innerHTML=`${Nr}<span>${g("salvar_como_atalho")}</span>`,l.appendChild(d);let A=document.createElement("div");A.id="evidence-container",Object.assign(A.style,{display:"none",marginTop:"16px",padding:"16px",background:G.bgInput,border:`1px solid ${G.border}`,borderRadius:$e.medium,boxShadow:Nt.subtle});let u=document.createElement("div");u.className="cw-section-title",u.textContent=g("evidencias_contato"),A.appendChild(u);let h={},N=(m,b)=>{let L=document.createElement("div");L.style.marginBottom="12px";let w=document.createElement("label");w.textContent=b,w.setAttribute("for",m),w.style.cssText=`display: block; font-size: 11px; font-weight: 700; color: ${G.textSub}; margin-bottom: 6px; text-transform: uppercase;`;let P=document.createElement("input");return P.type="text",P.id=m,P.className="cw-input",P.placeholder="https://screenshot.googleplex.com/...",P.style.marginBottom="0",L.appendChild(w),L.appendChild(P),Wa(P,{minLength:8}),h[m]=P,L};A.appendChild(N("evidence-l1",g("ligacao_1"))),A.appendChild(N("evidence-l2",g("ligacao_2"))),A.appendChild(N("evidence-msg",g("mensagem_am")));let v=er({onSaveCurrent:async()=>{let m=await C();return q(),m},onLoadDraft:m=>{J(m)},t:m=>g(m)}),I=ae(),z=ie(),U=document.createElement("div"),B=S(),x=j(v,g);a.appendChild(I),a.appendChild(z),a.appendChild(B),a.appendChild(l),a.appendChild(U),a.appendChild(A),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none";let K=document.createElement("button");K.id="manual-task-toggle",K.textContent=g("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",K.style.cssText=`display: none; width: 100%; padding: 14px; border: 2px dashed ${G.primary}; background: ${G.surface}; color: ${G.primary}; border-radius: ${$e.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${Ce}; text-transform: uppercase; letter-spacing: 0.5px;`,K.onmouseenter=()=>{K.style.background=G.primaryBg},K.onmouseleave=()=>{K.style.background=G.surface},K.onclick=()=>{s.selectionElement.style.display="block",s.screenshotsElement.style.display="block",K.style.display="none"},a.appendChild(K),a.appendChild(s.selectionElement),a.appendChild(r.element),a.appendChild(s.screenshotsElement),a.appendChild(x);let W=document.createElement("div");W.style.display="none",W.style.flexGrow="1",W.style.minHeight="0",W.style.overflow="hidden";let X=nr(()=>V());X.style.height="100%",W.appendChild(X),t.insertBefore(W,n);let O=c(),k=o.lastElementChild;k&&(k.insertBefore(v.historyBtnWrapper,k.firstChild),k.insertBefore(O,k.firstChild)),t.appendChild(v.drawer);let T=null;ee.subscribe(m=>{_(m),E(),m.isDirty?(T&&clearTimeout(T),T=setTimeout(async()=>{let b=await C(!0);b.subStatus?it.saveEmergency(b):it.clearEmergency(),m.isDirty=!1},2e3)):T&&(clearTimeout(T),T=null)});function E(){let m=it.getCount()>0,b=!!ee.currentSubStatus;co(m||b)}function R(){ee.visible=!ee.visible,ee.visible?De():Me(),Ve(ee.visible,t,"cw-btn-notes")}function V(){ee.isSplitView=!ee.isSplitView,ee.isSplitView?(a.style.display="none",W.style.display="flex",W.style.flexDirection="column",i.googleLine&&(i.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(a.style.display="flex",W.style.display="none",i.googleLine&&(i.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function ae(){let m=document.createElement("div");if(m.innerHTML=`
            <div style="display: flex; gap: 12px; margin-bottom: 8px;">
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-fluxo" style="font-size: 10px; margin-bottom: 6px;">${g("fluxo")}</div>
                    <div class="cw-segmented-control" id="type-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-type="bau" class="active" style="z-index:2">BAU</button>
                        <button data-type="lm" style="z-index:2">LM</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-portugal" style="font-size: 10px; margin-bottom: 6px;">${g("caso_portugal")}</div>
                    <div class="cw-segmented-control" id="portugal-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-val="false" class="active" style="z-index:2">${g("nao")}</button>
                        <button data-val="true" style="z-index:2">${g("sim")}</button>
                    </div>
                </div>
            </div>
        `,!document.getElementById("cw-segmented-styles")){let L=document.createElement("style");L.id="cw-segmented-styles",L.innerHTML=`
                .cw-segmented-control {
                    display: flex;
                    background: ${G.bgInput};
                    padding: 3px;
                    border-radius: 100px;
                    gap: 2px;
                    border: 1px solid ${G.border};
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
                    transition: all 0.3s ${Ce};
                    color: ${G.textSub};
                    position: relative;
                }
                .cw-segmented-control button.active {
                    color: #fff;
                }
                .cw-segmented-control button:hover:not(.active) {
                    background: rgba(0,0,0,0.03);
                    color: ${G.text};
                }
                .cw-segmented-indicator {
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    bottom: 3px;
                    width: calc(50% - 4px);
                    background: ${G.primary};
                    border-radius: 100px;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 1;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
                }
            `,document.head.appendChild(L)}let b=(L,w)=>{let F=m.querySelector(`#${L}`).querySelector(".cw-segmented-indicator");F&&(F.style.transform=`translateX(${w*100}%) translateX(${w*2}px)`)};return m.querySelectorAll("#type-selector button").forEach((L,w)=>{L.onclick=()=>{ee.setCaseType(L.dataset.type),m.querySelectorAll("#type-selector button").forEach(P=>P.classList.remove("active")),L.classList.add("active"),b("type-selector",w),y.playClick(),ee.currentSubStatus&&ce(ee.currentSubStatus)}}),m.querySelectorAll("#portugal-selector button").forEach((L,w)=>{L.onclick=()=>{ee.setPortugalCase(L.dataset.val==="true"),m.querySelectorAll("#portugal-selector button").forEach(P=>P.classList.remove("active")),L.classList.add("active"),b("portugal-selector",w),y.playClick(),ee.currentSubStatus&&ce(ee.currentSubStatus)}}),m}function ie(){let m=document.createElement("div");m.className="cw-status-section",m.style.cssText="display: flex; flex-direction: column; gap: 8px;",m.innerHTML=`
            <label class="cw-section-title js-label-status" for="main-status-select" style="margin-top: 8px;">${g("status_principal")}</label>
            <select id="main-status-select" class="cw-select">
                <option value="" disabled selected>${g("select_status")}</option>
                <option value="NI">NI - Need Info</option>
                <option value="SO">SO - Solution Offered</option>
                <option value="IN">IN - Inactive</option>
                <option value="AS">AS - Assigned</option>
                <option value="DC">DC - Discard</option>
            </select>
            <label class="cw-section-title js-label-substatus" for="sub-status-select" style="margin-top: 8px;">${g("substatus")}</label>
            <select id="sub-status-select" class="cw-select" disabled>
                <option value="">${g("select_substatus")}</option>
            </select>
        `;let b=m.querySelector("#main-status-select"),L=m.querySelector("#sub-status-select");return b.onchange=()=>{ee.setStatus(b.value),Q(b.value,L),ee.setSubStatus(""),ce("")},L.onchange=()=>{ee.setSubStatus(L.value),ce(L.value)},m}function ue(){return A.style.display==="none"?null:{l1:h["evidence-l1"]?.value.trim()||"",l2:h["evidence-l2"]?.value.trim()||"",msg:h["evidence-msg"]?.value.trim()||""}}function Q(m,b){if(b.innerHTML=`<option value="">${g("select_substatus")}</option>`,!m){b.disabled=!0;return}let L=m==="IN"?(()=>{let w=document.createElement("optgroup");return w.label="Fora de Escopo",w})():null;for(let w in Ue)if(Ue[w].status===m){let P=document.createElement("option");P.value=w,P.textContent=Ue[w].name,L&&w.startsWith("IN_Out_of_Scope")?L.appendChild(P):b.appendChild(P)}L&&L.children.length>0&&b.appendChild(L),b.disabled=!1}function ce(m){let b=Ue[m],L=m==="NI_Attempted_Contact"||b&&b.name&&b.name.toLowerCase().includes("attempted contact");if(p.render&&p.render(m,ee.currentCaseType),!m){A.style.display="none",h["evidence-l1"]&&(h["evidence-l1"].value=""),h["evidence-l2"]&&(h["evidence-l2"].value=""),h["evidence-msg"]&&(h["evidence-msg"].value=""),l.style.display="none",U.style.display="none";let xe=document.getElementById("manual-task-toggle");xe&&(xe.style.display="none"),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",B.style.display="flex",B.style.opacity="1",x.style.display="none";return}if(L?A.style.display="block":(A.style.display="none",h["evidence-l1"]&&(h["evidence-l1"].value=""),h["evidence-l2"]&&(h["evidence-l2"].value=""),h["evidence-msg"]&&(h["evidence-msg"].value="")),B.style.opacity="0",setTimeout(()=>{ee.currentSubStatus&&(B.style.display="none")},400),x.style.display="grid",b&&b.templateFields){let xe=Di(b);ee.setActiveFields(b.templateFields.filter(Ae=>!xe.includes(Ae)))}Z(),_a(m,U,ee),U.style.display="block",l.style.display="block";let w=m.startsWith("SO_"),P=m==="NI_Awaiting_Validation",F=document.getElementById("manual-task-toggle");w||P?(s.selectionElement.style.display="block",F.style.display="none"):(s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",F.style.display="block");let Y=m==="SO_Education_Only"?"education":"implementation";ee.setScreenshotMode(Y),s.updateSubStatus(m),ne();let le=document.getElementById("email-automation-toggle-row");le&&(le.style.display=na[m]?"flex":"none")}function ne(){let m=s.getCheckedElements().map(b=>b.value);r.updateVisibility(ee.currentSubStatus,m)}function pe(m,b){let L=eo(St[m],ee.currentLang,m);if(L){for(let w in L)if(w==="linkedTask")s.toggleTask(L.linkedTask,b);else if(w==="activeTasks")L.activeTasks.forEach(P=>{b?s.setTaskCount(P.value,P.count):s.setTaskCount(P.value,0)});else if(w.startsWith("field-")){let P=w,F=L[w],Y=document.getElementById(P);if(Y){let le=ia.includes(P.replace("field-",""));if(b)if(le){let xe=Y.value.trim();xe.includes(F.trim())||(Y.value=xe?xe+`
`+F.trim():F.trim())}else Y.value=F;else if(le){let xe=Y.value.trim(),Ae=F.trim();xe.includes(Ae)&&(Y.value=xe.replace(Ae,"").trim().replace(/\n{3,}/g,`

`))}else Y.value.trim()===F.trim()&&(Y.value="");ee.updateField(P,Y.value),Y.dispatchEvent(new Event("input"))}}}}function j(m,b){let L=document.createElement("div");if(L.className="cw-actions-section",L.style.cssText=`
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 10px;
            margin-top: 16px;
            background: ${G.bgInput};
            border-radius: 12px;
            border: 1px solid ${G.border};
        `,!document.getElementById("cw-actions-hover-styles")){let xe=document.createElement("style");xe.id="cw-actions-hover-styles",xe.innerHTML=`
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
                    border-color: ${G.primary} !important;
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
                    color: ${G.primary} !important;
                    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.05) !important;
                    transform: translateY(-1px);
                }
            `,document.head.appendChild(xe)}let w=document.createElement("div");w.id="email-automation-toggle-row",w.style.cssText="grid-column: 1 / -1; display: none; align-items: center; justify-content: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2px;",w.innerHTML=`
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 10.5px; font-weight: 600; color: ${G.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 13px; height: 13px; accent-color: ${G.primary};">
                <span class="js-label-email-toggle">${b("preencher_email_automaticamente")}</span>
            </label>
        `;let P=m.parkButton;P.classList.add("js-btn-park"),P.style.cssText="width: 100%; margin: 0; border-radius: 10px; height: 34px; font-weight: 600; font-size: 11.5px;";let F=document.createElement("button");F.className="cw-btn-secondary js-btn-reset",F.textContent=b("limpar"),F.style.cssText=`width: 100%; height: 34px; background: ${G.surface}; color: ${G.textSub}; border: 1px solid ${G.border}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,F.onclick=()=>q();let Y=document.createElement("button");Y.className="cw-btn-secondary js-btn-copy",Y.textContent=b("copiar"),Y.style.cssText=`width: 100%; height: 34px; background: ${G.surface}; color: ${G.primary}; border: 1px solid ${G.primary}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,Y.onclick=()=>re();let le=document.createElement("button");return le.className="cw-btn-primary js-btn-generate",le.textContent=b("preencher"),le.style.cssText=`width: 100%; height: 38px; background: ${G.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; grid-column: 1 / -1; font-size: 12.5px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 0px;`,le.onclick=()=>de(),L.appendChild(w),L.appendChild(P),L.appendChild(F),L.appendChild(Y),L.appendChild(le),L}async function re(){if(!ee.currentSubStatus){y.playError(),te(g("select_substatus"),{error:!0});return}let m=Qo(ee,s,r,ue());m?(Pt(m),te(g("copiado_sucesso")),y.playClick()):(y.playError(),te(g("select_substatus"),{error:!0}))}async function de(){if(!ee.currentSubStatus){y.playError(),te(g("select_substatus"),{error:!0});return}let m=Ue[ee.currentSubStatus],b=Na(m).filter(F=>{if(!ee.activeFields.includes(F))return!1;let Y=ee.formData[`field-${F}`];return!Y||!Y.trim()});if(b.length>0){y.playError(),te(`${g("preencha_obrigatorio")}: ${g(b[0].toLowerCase())}`,{error:!0});return}if(m?.requiresTasks&&s.getCheckedElements().length===0){y.playError(),te(g("selecione_task_gerar"),{error:!0});return}let L=Qo(ee,s,r,ue());Pt(L),R();let w=Oa(),P=await la();if(P){P.focus(),document.execCommand("insertHTML",!1,L),sa(P);let F=document.getElementById("email-automation-checkbox");(!F||F.checked)&&ee.currentSubStatus&&na[ee.currentSubStatus]&&await bo(na[ee.currentSubStatus]),te(g("inserido_copiado")),y.playSuccess(),Qi(),q()}else y.playError(),te(g("nota_nao_abriu"),{error:!0}),R();w()}function Z(){if(ee.currentSubStatus){if(ee.currentCaseType==="lm")ee.removeField("ON_CALL");else{let m=Ue[ee.currentSubStatus];m&&m.templateFields.includes("ON_CALL")&&ee.addFieldAt("ON_CALL",1)}ee.isPortugalCase?(ee.addFieldAt("CASO_PORTUGAL",1),ee.addFieldAt("CONSENTIU_GRAVACAO",2)):(ee.removeField("CASO_PORTUGAL"),ee.removeField("CONSENTIU_GRAVACAO"))}}function q(){ee.reset(),s.reset(),r.reset(),E(),it.clearEmergency(),a.querySelectorAll("select").forEach(b=>b.value=""),a.querySelector("#sub-status-select").disabled=!0;let m=document.getElementById("email-automation-toggle-row");m&&(m.style.display="none"),U.innerHTML="",l.style.display="none",B.style.display="flex",B.style.opacity="1",x.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",A.style.display="none",h["evidence-l1"]&&(h["evidence-l1"].value=""),h["evidence-l2"]&&(h["evidence-l2"].value=""),h["evidence-msg"]&&(h["evidence-msg"].value="")}async function C(m=!1){let b={};U.querySelectorAll("input, textarea, select").forEach(Y=>{(Y.id.startsWith("field-")||Y.id==="consent-select")&&(b[Y.id]=Y.value)});let L="Cliente",w="---";if(!m)try{let Y=await bt();L=Y.advertiserName,w=Y.cid}catch(Y){console.warn("Erro ao coletar pageData:",Y)}let P=s.getCheckedElements().map(Y=>({key:Y.value,count:Y.count})),F=P.map(Y=>{let le=Pe[Y.key];return le?le.name:Y.key});return{currentCaseType:ee.currentCaseType,currentLang:ee.currentLang,isPortugalCase:ee.isPortugalCase,consent:ee.consent,tagSupportUsed:ee.tagSupportUsed,forcedScreenshots:[...ee.forcedScreenshots],activeFields:ee.activeFields,status:ee.currentStatus,subStatus:ee.currentSubStatus,formData:b,activeTasks:P,summaryTags:F,clientName:L,cid:w,timestamp:new Date().toISOString()}}let $=m=>new Promise(b=>setTimeout(b,m));async function J(m){ee.setCaseType(m.currentCaseType||"bau"),ee.setPortugalCase(m.isPortugalCase||!1),ee.setConsent(m.consent||!1),m.activeFields&&ee.setActiveFields(m.activeFields);let b=a.querySelector(`#type-selector button[data-type="${ee.currentCaseType}"]`);b&&b.classList.add("active"),a.querySelectorAll("#type-selector button").forEach(w=>{w!==b&&w.classList.remove("active")});let L=a.querySelector(`#portugal-selector button[data-val="${ee.isPortugalCase}"]`);if(L&&L.classList.add("active"),a.querySelectorAll("#portugal-selector button").forEach(w=>{w!==L&&w.classList.remove("active")}),m.status){let w=a.querySelector("#main-status-select");w.value=m.status,ee.setStatus(m.status);let P=a.querySelector("#sub-status-select");if(Q(m.status,P),await $(50),m.subStatus){if(P.value=m.subStatus,ee.setSubStatus(m.subStatus),ce(m.subStatus),await $(100),m.tagSupportUsed!==void 0){ee.setTagSupportUsed(m.tagSupportUsed);let F=r.element.querySelector('input[value="Sim"]'),Y=r.element.querySelector('input[value="N\xE3o"]');m.tagSupportUsed&&F?F.checked=!0:Y&&(Y.checked=!0),r.element.querySelector("div:last-child").style.display=m.tagSupportUsed?"none":"block"}m.forcedScreenshots&&ee.setForcedScreenshots(m.forcedScreenshots);for(let F in m.formData){let Y=document.getElementById(F);Y&&(Y.value=m.formData[F],ee.updateField(F,Y.value))}m.activeTasks&&(m.activeTasks.forEach(F=>s.setTaskCount(F.key,F.count)),ee.setActiveTasks(s.getCheckedElements()))}}ee.isDirty=!1}async function D(m){let b=m&&m.payload;if(!b||!b.subStatus)return{ok:!1,reason:"invalid"};let L=b.scenarios||[],w=L.map(ge=>dn(ge)),P=L.filter((ge,tt)=>!w[tt]);if(ee.isDirty&&!await Ye(g("substituir_rascunho_confirm")))return{ok:!1,reason:"cancelled"};let F=ee.visible;if(F||R(),q(),F||await $(550),b.caseType&&b.caseType!==ee.currentCaseType){let ge=a.querySelector(`#type-selector button[data-type="${b.caseType}"]`);ge&&ge.click(),await $(60)}let Y=a.querySelector("#main-status-select"),le=a.querySelector("#sub-status-select"),xe=b.status||String(b.subStatus).split("_")[0];Y.value=xe,ee.setStatus(xe),Q(xe,le),await $(60),le.value=b.subStatus,ee.setSubStatus(b.subStatus),ce(b.subStatus),await $(160);for(let ge of w.filter(Boolean)){let tt=l.querySelector(`[data-id="${ge}"]`);tt&&tt.click()}await $(120),P.length?(y.playError(),te(g("atalho_cenario_sumiu"),{error:!0})):y.playSuccess();let Ae=H();return Ae&&Va(Ae),{ok:!0,missing:P.map(ge=>ge.id)}}function H(){let m=a.querySelectorAll('input[id^="field-"], textarea[id^="field-"], input[id^="evidence-"]');for(let b of m)if(b.offsetParent!==null&&!String(b.value||"").trim())return b;return null}async function oe(){let m=f();if(!m){y.playError(),te(g("select_substatus"),{error:!0});return}if(Re.listRaw().length>=_t){y.playError(),te(g("atalho_limite").replace("{max}",_t),{error:!0});return}let b=Ue[m.payload.subStatus]?.name||m.payload.subStatus,L=await Za(g("atalho_nome_pergunta"),b);if(L!==null){d.disabled=!0,d.style.opacity="0.6";try{let w=await Re.save({...m,id:qa(),label:String(L).trim()||b});if(!w.ok){y.playError(),te(g("atalho_limite").replace("{max}",_t),{error:!0});return}y.playSuccess(),te(w.synced?g("atalho_salvo"):g("atalho_salvo_local"))}finally{d.disabled=!1,d.style.opacity=""}}}function f(){if(!ee.currentSubStatus)return null;let m=p.getSelectedIds?p.getSelectedIds():[];return{kind:"note",payload:{caseType:ee.currentCaseType,status:ee.currentStatus,subStatus:ee.currentSubStatus,scenarios:m.map(b=>({id:b,substatus:ee.currentSubStatus}))}}}function g(m){return xt[se()]?.[m]||xt.pt?.[m]||m}function c(){let m=document.createElement("div");return m.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',m.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",m.onclick=b=>{b.stopPropagation(),V()},m.title=g("alternar_split"),m}function S(){let m=document.createElement("div");return m.id="notes-empty-state",m.style.cssText=`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${Ce};
        `,m.innerHTML=`
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
                <div class="js-empty-title" style="font-family: 'Google Sans', sans-serif; font-size: 16px; font-weight: 600; color: ${G.text}; margin-bottom: 4px;">
                    ${g("pronto_comecar")}
                </div>
                <div class="js-empty-help" style="font-size: 13px; color: ${G.textSub}; line-height: 1.6; opacity: 0.8;">
                    ${g("selecione_status_ajuda")}
                </div>
            </div>
        `,m}function _(m){let b=a.querySelector(".js-label-fluxo");b&&(b.textContent=g("fluxo"));let L=a.querySelector(".js-label-portugal");L&&(L.textContent=g("caso_portugal"));let w=a.querySelectorAll("#portugal-selector button");w.length===2&&(w[0].textContent=g("nao"),w[1].textContent=g("sim"));let P=a.querySelector(".js-empty-title");P&&(P.textContent=g("pronto_comecar"));let F=a.querySelector(".js-empty-help");F&&(F.innerHTML=g("selecione_status_ajuda")),O.title=g("alternar_split");let Y=a.querySelector('#main-status-select option[value=""]');Y&&(Y.textContent=g("select_status"));let le=a.querySelector('#sub-status-select option[value=""]');le&&(le.textContent=g("select_substatus"));let xe=a.querySelector(".js-label-status");xe&&(xe.textContent=g("status_principal"));let Ae=a.querySelector(".js-label-substatus");Ae&&(Ae.textContent=g("substatus"));let ge=a.querySelector(".js-btn-copy");ge&&(ge.textContent=g("copiar"));let tt=a.querySelector(".js-btn-generate");tt&&(tt.textContent=g("preencher"));let _e=a.querySelector(".js-btn-reset");_e&&(_e.textContent=g("limpar"));let wt=document.getElementById("manual-task-toggle");wt&&(wt.textContent=g("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let qt=a.querySelector(".js-btn-park span");qt&&(qt.textContent=g("guardar")),u.textContent=g("evidencias_contato");let nt=A.querySelector('label[for="evidence-l1"]');nt&&(nt.textContent=g("ligacao_1"));let Jt=A.querySelector('label[for="evidence-l2"]');Jt&&(Jt.textContent=g("ligacao_2"));let Pa=A.querySelector('label[for="evidence-msg"]');Pa&&(Pa.textContent=g("mensagem_am"));let ba=t.querySelector(".js-drawer-title");ba&&(ba.textContent=g("rascunhos_salvos"));let $n=t.querySelector(".js-history-btn");$n&&($n.title=g("meus_rascunhos"));let Pn=a.querySelector(".js-label-email-toggle");Pn&&(Pn.textContent=g("preencher_email_automaticamente")),d.innerHTML=`${Nr}<span>${g("salvar_como_atalho")}</span>`,r&&r.setLanguage&&r.setLanguage(g),s&&s.setLanguage&&s.setLanguage(g)}return B.style.display="flex",x.style.display="none",ee.setLanguage(ct()),ee.setCaseType("bau"),Qt(m=>{ee.setLanguage(m),ee.currentSubStatus&&ce(ee.currentSubStatus)}),Le(m=>{let b=t.querySelector(".cw-help-description");b&&(b.textContent=Ia[m]||Ia.pt),_(ee)}),E(),setTimeout(async()=>{let m=it.getEmergency();m&&(await Ye(g("restaurar_rascunho_confirm"))?(J(m),te(g("sessao_restaurada"))):it.clearEmergency())},3e3),document.body.appendChild(t),so(()=>s.refreshCatalog()),$i().then(m=>{m&&ee.currentSubStatus&&(p.render&&p.render(ee.currentSubStatus,ee.currentCaseType),_a(ee.currentSubStatus,U,ee))}),R.openWithPreset=D,R}var Dc="Pre-call checklist",xo="None provided";var Mc="Completed",Dr=[{value:"Live Meet case",key:"reasonLiveMeet"},{value:"Case arrived <1h before the call",key:"reasonLate"}],Mr=[{value:"Proceed",key:"nextProceed"},{value:"OOS",key:"nextOos"},{value:"Infeasible",key:"nextInfeasible"}],Bt=[{id:"duplicateCase",label:"Duplicate Case",kind:"yesno",required:!0},{id:"suite360",label:"360 Suite",kind:"yesno",required:!0},{id:"sgtm",label:"sGTM",kind:"yesno",required:!0},{id:"api",label:"API",kind:"yesno",required:!0},{id:"sellerCc",label:"Seller to be CCed",kind:"yesno",required:!0},{id:"tasks",label:"Task(s) [copy&paste]",kind:"textarea",auto:!0},{id:"contactNumber",label:"Contact number",kind:"text",auto:!0},{id:"email",label:"Email",kind:"text",auto:!0},{id:"websiteUrl",label:"Website URL",kind:"text",auto:!0},{id:"websiteCms",label:"Website CMS",kind:"text"},{id:"adsCid",label:"Ads CID",kind:"text",auto:!0},{id:"ga4Id",label:"GA4 Measurement ID",kind:"text"},{id:"specialInstructions",label:"Special instructions",kind:"textarea"},{id:"nextSteps",label:"Next steps",kind:"select",required:!0}],qr=Bt.filter(e=>e.auto).map(e=>e.id),Fa=e=>String(e??"").trim();function Fr(e){return e.completed==="No"?Fa(e.exceptionReason)?[]:["exceptionReason"]:Bt.filter(t=>t.required&&!Fa(e[t.id])).map(t=>t.id)}var qc="Gerado pelo Cases Wizard";function Fc(e){return e.completed==="No"?[{label:`${Mc}:`,value:`No \u2192 ${Fa(e.exceptionReason)}`}]:Bt.map(t=>({label:`${t.label}:`,value:Fa(e[t.id])||xo}))}function ho(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Rr(e){let t=a=>ho(a).replace(/\r?\n/g,"<br>");return[`<b>${ho(Dc)}</b>`,...Fc(e).map(({label:a,value:o})=>`<b>${ho(a)}</b> ${t(o)}`),`<i>${ho(qc)}</i>`].join("<br><br>")}var Rc=/[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+/,Or=/^[a-z0-9]+(_[a-z0-9]+)+$/;function zc(e,t){let a=Or.test(e)?t(e):"";return a||(Or.test(e)?e.split("_").map(o=>o.charAt(0).toUpperCase()+o.slice(1)).join(" "):e)}function zr(e={},t=()=>""){let a=i=>{let n=Fa(i);return/^n\/a$/i.test(n)?"":n};return{tasks:[...new Set((e.tasks||[]).map(a).filter(Boolean).map(i=>zc(i,t)))].join(", "),contactNumber:a(e.phone),email:a(e.email).match(Rc)?.[0]||"",websiteUrl:a(e.website),adsCid:a(e.cid)}}var $r={pt:{headerDesc:"Checklist r\xE1pido antes da liga\xE7\xE3o, direto na nota.",outputNote:"A nota sai sempre em ingl\xEAs, qualquer que seja o idioma da interface.",completed:"Checklist conclu\xEDdo?",exceptionReason:"Motivo da exce\xE7\xE3o",reasonLiveMeet:"Caso Live Meet",reasonLate:"Caso chegou com menos de 1h para a liga\xE7\xE3o",duplicateCase:"Caso duplicado",suite360:"360 Suite",sgtm:"sGTM",api:"API",sellerCc:"Vendedor em c\xF3pia (CC)",tasks:"Task(s)",contactNumber:"Telefone de contato",email:"E-mail",websiteUrl:"URL do site",websiteCms:"CMS do site",adsCid:"Ads CID",ga4Id:"GA4 Measurement ID",specialInstructions:"Instru\xE7\xF5es especiais",nextSteps:"Pr\xF3ximos passos",yes:"Sim",no:"N\xE3o",select:"Selecione\u2026",nextProceed:"Prosseguir",nextOos:"OOS (fora de escopo)",nextInfeasible:"Invi\xE1vel",autoBadge:"Auto",autoBadgeTitle:"Preenchido automaticamente",capturing:"Capturando dados do caso\u2026",capturedOne:"1 campo preenchido automaticamente. Revise antes de usar.",capturedN:"{n} campos preenchidos automaticamente. Revise antes de usar.",captureNone:"Nada encontrado na tela do caso. Preencha \xE0 m\xE3o.",captureFailed:"N\xE3o foi poss\xEDvel ler a tela do caso. Preencha \xE0 m\xE3o.",clear:"Limpar",copy:"Copiar",copied:"Copiado",insert:"Inserir na nota",toastCopied:"Checklist copiado.",toastInserted:"Checklist inserido na nota (e copiado).",needAnswer:"Responda \u201C{field}\u201D antes de continuar.",insertFailed:"N\xE3o foi poss\xEDvel abrir a nota no CRM. O conte\xFAdo j\xE1 est\xE1 copiado \u2014 cole manualmente."},es:{headerDesc:"Checklist r\xE1pido antes de la llamada, directo en la nota.",outputNote:"La nota siempre sale en ingl\xE9s, sea cual sea el idioma de la interfaz.",completed:"\xBFChecklist completado?",exceptionReason:"Motivo de la excepci\xF3n",reasonLiveMeet:"Caso Live Meet",reasonLate:"El caso lleg\xF3 con menos de 1 h para la llamada",duplicateCase:"Caso duplicado",suite360:"360 Suite",sgtm:"sGTM",api:"API",sellerCc:"Vendedor en copia (CC)",tasks:"Task(s)",contactNumber:"Tel\xE9fono de contacto",email:"Correo electr\xF3nico",websiteUrl:"URL del sitio",websiteCms:"CMS del sitio",adsCid:"Ads CID",ga4Id:"GA4 Measurement ID",specialInstructions:"Instrucciones especiales",nextSteps:"Pr\xF3ximos pasos",yes:"S\xED",no:"No",select:"Selecciona\u2026",nextProceed:"Continuar",nextOos:"OOS (fuera de alcance)",nextInfeasible:"Inviable",autoBadge:"Auto",autoBadgeTitle:"Completado autom\xE1ticamente",capturing:"Capturando datos del caso\u2026",capturedOne:"1 campo completado autom\xE1ticamente. Rev\xEDsalo antes de usar.",capturedN:"{n} campos completados autom\xE1ticamente. Rev\xEDsalos antes de usar.",captureNone:"No se encontr\xF3 nada en la pantalla del caso. Compl\xE9talo a mano.",captureFailed:"No se pudo leer la pantalla del caso. Compl\xE9talo a mano.",clear:"Limpiar",copy:"Copiar",copied:"Copiado",insert:"Insertar en la nota",toastCopied:"Checklist copiado.",toastInserted:"Checklist insertado en la nota (y copiado).",needAnswer:"Responde \u201C{field}\u201D antes de continuar.",insertFailed:"No se pudo abrir la nota en el CRM. El contenido ya est\xE1 copiado \u2014 p\xE9galo manualmente."},en:{headerDesc:"Quick checklist before the call, straight into the note.",outputNote:"The note is always written in English, whatever the interface language.",completed:"Checklist completed?",exceptionReason:"Exception reason",reasonLiveMeet:"Live Meet case",reasonLate:"Case arrived <1h before the call",duplicateCase:"Duplicate case",suite360:"360 Suite",sgtm:"sGTM",api:"API",sellerCc:"Seller to be CCed",tasks:"Task(s)",contactNumber:"Contact number",email:"Email",websiteUrl:"Website URL",websiteCms:"Website CMS",adsCid:"Ads CID",ga4Id:"GA4 Measurement ID",specialInstructions:"Special instructions",nextSteps:"Next steps",yes:"Yes",no:"No",select:"Select\u2026",nextProceed:"Proceed",nextOos:"OOS (out of scope)",nextInfeasible:"Infeasible",autoBadge:"Auto",autoBadgeTitle:"Auto-filled",capturing:"Reading the case\u2026",capturedOne:"1 field filled automatically. Review it before using.",capturedN:"{n} fields filled automatically. Review them before using.",captureNone:"Nothing found on the case screen. Fill it in by hand.",captureFailed:"Couldn't read the case screen. Fill it in by hand.",clear:"Clear",copy:"Copy",copied:"Copied",insert:"Insert into note",toastCopied:"Checklist copied.",toastInserted:"Checklist inserted into the note (and copied).",needAnswer:"Answer \u201C{field}\u201D before continuing.",insertFailed:"Couldn't open the note in the CRM. The content is already copied \u2014 paste it manually."}};var $c="v1.0.0",Pr="Pre-call Checklist",Pc="cw-btn-precall",Bc=110,Gc=1500,Br=[{value:"Yes",key:"yes"},{value:"No",key:"no"}],Gr='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>';function Ge(e,t,a){let o=document.createElement(e);return t&&(o.className=t),a!=null&&(o.textContent=a),o}var jc=()=>!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);async function Hc(){await Aa();let[e,t]=await Promise.all([zo(),$o()]);return{caseId:await Ja(),tasks:ya("appointmentTasks"),website:ft("website"),cid:Xa(),email:e,phone:t}}function Ur(){let e=Zt($r);Uc();let t=Ge("div");t.id="cw-precall-popup",t.classList.add("cw-module-window"),t.setAttribute("role","dialog"),t.setAttribute("aria-label",Pr),Object.assign(t.style,Qe,{width:"520px",height:"800px",display:"flex",flexDirection:"column",borderRadius:"24px"});let a=He(t,Pr,$c,e("headerDesc"),{popup:t},()=>Z());t.appendChild(a);let o=Ge("div","cw-pc-body");t.appendChild(o);let i=Ge("p","cw-pc-note"),n=Ge("div","cw-pc-status");n.setAttribute("role","status"),n.setAttribute("aria-live","polite"),o.append(i,n);let r={},s={},l=new Set;function p(q,C,{auto:$=!1,numeric:J=!1}={}){let D=Ge("div","cw-pc-field"),H=Ge("div","cw-pc-label-row"),oe=Ge("label","cw-pc-label");oe.htmlFor=`cw-pc-${q}`,H.appendChild(oe);let f=null;if($){let c=Ge("span","cw-pc-auto");c.innerHTML=Gr,f=Ge("span"),c.appendChild(f),H.appendChild(c)}let g=Ge(C==="select"?"select":C==="textarea"?"textarea":"input","cw-pc-control");return g.id=`cw-pc-${q}`,C==="text"&&(g.type="text",g.placeholder=xo,g.autocomplete="off",g.spellcheck=!1),C==="textarea"&&(g.rows=2,g.placeholder=xo,g.spellcheck=!1),J&&g.classList.add("cw-pc-num"),g.addEventListener("animationend",()=>g.classList.remove("cw-pc-fill")),g.addEventListener("input",()=>{l.delete(q)&&D.classList.remove("is-auto")}),C==="select"&&g.addEventListener("change",()=>g.classList.toggle("is-placeholder",!g.value)),D.append(H,g),r[q]=g,s[q]={row:D,label:oe,badgeText:f,badge:f?.parentElement},D}let d=p("completed","select"),A=p("exceptionReason","select"),u={};Bt.forEach(q=>{u[q.id]=p(q.id,q.kind==="yesno"?"select":q.kind,{auto:q.auto,numeric:["contactNumber","adsCid","ga4Id"].includes(q.id)})});let h=(q,C)=>{let $=Ge("div",`cw-pc-grid cols-${q}`);return C.forEach(J=>$.appendChild(u[J])),$},N=Ge("div","cw-pc-stack");N.append(h(3,Bt.filter(q=>q.kind==="yesno").map(q=>q.id)),u.tasks,h(2,["contactNumber","email"]),h(2,["websiteUrl","websiteCms"]),h(2,["adsCid","ga4Id"]),u.specialInstructions,u.nextSteps),o.append(d,A,N);function v(){let q=r.completed.value==="No";A.hidden=!q,N.hidden=q}r.completed.addEventListener("change",v);let I=Ge("div","cw-pc-footer"),z=Ge("button","cw-pc-btn is-text"),U=Ge("button","cw-pc-btn is-outline"),B=Ge("button","cw-pc-btn is-filled");[z,U,B].forEach(q=>{q.type="button"});let x=Ge("span","cw-pc-btn-icon");x.innerHTML=Gr;let K=Ge("span");U.append(x,K),I.append(z,U,B),t.appendChild(I);function W(q,C,{withPlaceholder:$}){let J=q.value;if(q.textContent="",$){let D=Ge("option",null,e("select"));D.value="",D.disabled=!0,q.appendChild(D)}C.forEach(({value:D,key:H})=>{let oe=Ge("option",null,e(H));oe.value=D,q.appendChild(oe)}),q.value=J||($?"":C[0].value),q.classList.toggle("is-placeholder",!q.value)}let X=null,O=!1;function k(){i.textContent=e("outputNote"),s.completed.label.textContent=e("completed"),W(r.completed,Br,{withPlaceholder:!1}),s.exceptionReason.label.textContent=e("exceptionReason"),W(r.exceptionReason,Dr,{withPlaceholder:!0}),Bt.forEach(C=>{s[C.id].label.textContent=e(C.id),s[C.id].badgeText&&(s[C.id].badgeText.textContent=e("autoBadge"),s[C.id].badge.title=e("autoBadgeTitle")),C.kind==="yesno"&&W(r[C.id],Br,{withPlaceholder:!0}),C.kind==="select"&&W(r[C.id],Mr,{withPlaceholder:!0})}),z.textContent=e("clear"),K.textContent=e(O?"copied":"copy"),B.textContent=e("insert"),X&&T(X.kind,X.key,X.n);let q=t.querySelector(".cw-help-description");q&&(q.textContent=e("headerDesc"))}function T(q,C,$){X={kind:q,key:C,n:$},n.className=`cw-pc-status ${q?`is-${q}`:""}`,n.textContent=e(C).replace("{n}",$)}let E=0,R=null,V=!1,ae=!1;function ie(){U.disabled=B.disabled=V||ae}function ue(){Object.values(r).forEach(q=>{q.value=""}),r.completed.value="Yes",r.completed.classList.remove("is-placeholder"),Object.values(s).forEach(({row:q})=>q.classList.remove("is-auto")),l.clear(),k(),v()}function Q(q,C){let $=qr.filter(D=>q[D]&&!r[D].value.trim()),J=jc();return $.forEach((D,H)=>{window.setTimeout(()=>{if(C!==E)return;let oe=r[D];oe.value.trim()||(oe.value=q[D],l.add(D),s[D].row.classList.add("is-auto"),J||(oe.classList.remove("cw-pc-fill"),oe.offsetWidth,oe.classList.add("cw-pc-fill")))},J?0:H*Bc)}),new Set([...l,...$]).size}async function ce(){let q=++E,C=`${await Ja()}|${Xa()}`;if(q===E){C!==R&&(ue(),R=C),T("busy","capturing"),V=!0,ie();try{let $=await Hc();if(q!==E)return;let J=Q(zr($,D=>Pe[D]?.name),q);J===0?T("","captureNone"):T("auto",J===1?"capturedOne":"capturedN",J)}catch($){console.warn("Pre-call: n\xE3o foi poss\xEDvel ler a tela do caso:",$),q===E&&T("","captureFailed")}finally{q===E&&(V=!1,ie())}}}function ne(){let q={completed:r.completed.value,exceptionReason:r.exceptionReason.value};return Bt.forEach(C=>{q[C.id]=r[C.id].value}),q}function pe(){let q=ne(),[C]=Fr(q);return C?(y.playError(),te(e("needAnswer").replace("{field}",e(C)),{error:!0}),Va(r[C]),null):Rr(q)}function j(){O=!0,U.classList.add("is-done"),K.textContent=e("copied"),window.setTimeout(()=>{O=!1,U.classList.remove("is-done"),K.textContent=e("copy")},Gc)}function re(){let q=pe();q&&(Pt(q),j(),y.playSuccess(),navigator.vibrate&&navigator.vibrate(10),te(e("toastCopied")))}async function de(){let q=pe();if(!q)return;ae=!0,ie(),Pt(q),Z();let C=await la();C?(C.focus(),document.execCommand("insertHTML",!1,q),sa(C),te(e("toastInserted")),y.playSuccess(),navigator.vibrate&&navigator.vibrate(10)):(y.playError(),te(e("insertFailed"),{error:!0}),Z()),ae=!1,ie()}z.addEventListener("click",()=>{y.playClick(),ue(),ce()}),U.addEventListener("click",re),B.addEventListener("click",de);function Z(){let q=!Ze(t);Ve(q,t,Pc),q?(De(),ce()):Me()}return ue(),Le(k),document.body.appendChild(t),Z}function Uc(){if(document.getElementById("cw-precall-styles"))return;let e=Ge("style");e.id="cw-precall-styles",e.textContent=`
        #cw-precall-popup { font-family: 'Google Sans', Roboto, sans-serif; color: ${G.text}; }
        #cw-precall-popup [hidden] { display: none !important; }

        #cw-precall-popup .cw-pc-body {
            flex: 1 1 auto; min-height: 0; overflow-y: auto;
            padding: 16px 24px; background: ${G.surface};
            display: flex; flex-direction: column; gap: 16px;
        }
        #cw-precall-popup .cw-pc-note { margin: 0; font-size: 12px; line-height: 16px; color: ${G.textSub}; }

        #cw-precall-popup .cw-pc-status {
            display: flex; align-items: center; gap: 8px; min-height: 16px;
            font-size: 12px; line-height: 16px; color: ${G.textSub};
        }
        #cw-precall-popup .cw-pc-status::before {
            content: ''; flex: 0 0 8px; width: 8px; height: 8px; border-radius: 50%;
            background: #9aa0a6; transition: background-color 0.2s ease;
        }
        #cw-precall-popup .cw-pc-status.is-auto::before,
        #cw-precall-popup .cw-pc-status.is-busy::before { background: ${G.primary}; }
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
            font-size: 12px; line-height: 16px; font-weight: 500; color: ${G.textSub};
        }

        #cw-precall-popup .cw-pc-auto {
            display: none; align-items: center; gap: 4px; white-space: nowrap;
            font-size: 11px; line-height: 16px; color: ${G.primary};
        }
        #cw-precall-popup .cw-pc-auto svg { width: 12px; height: 12px; fill: currentColor; flex-shrink: 0; }
        #cw-precall-popup .cw-pc-field.is-auto .cw-pc-auto { display: inline-flex; }

        #cw-precall-popup .cw-pc-control {
            width: 100%; box-sizing: border-box; min-height: 40px; padding: 8px 12px;
            border: 1px solid transparent; border-radius: 8px;
            background-color: ${G.bgInput}; color: ${G.text};
            font: 400 14px/20px 'Google Sans', Roboto, sans-serif; outline: none;
            transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        #cw-precall-popup .cw-pc-control:hover { background-color: #f1f3f4; }
        #cw-precall-popup .cw-pc-control:focus-visible {
            background-color: #fff; border-color: ${G.primary}; box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.15);
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
            0%   { opacity: 0; transform: translateY(4px); background-color: ${G.primaryBg}; }
            50%  { opacity: 1; transform: translateY(0); background-color: ${G.primaryBg}; }
            100% { opacity: 1; transform: translateY(0); background-color: ${G.bgInput}; }
        }
        #cw-precall-popup .cw-pc-control.cw-pc-fill { animation: cw-pc-fill 700ms cubic-bezier(0.2, 0, 0, 1) both; }

        #cw-precall-popup .cw-pc-footer {
            flex: 0 0 auto; display: flex; align-items: center; gap: 8px; padding: 16px 24px;
            background: ${G.surface}; border-top: 1px solid rgba(0, 0, 0, 0.06);
        }
        #cw-precall-popup .cw-pc-btn {
            height: 40px; padding: 0 20px; border: 1px solid transparent; border-radius: 100px;
            display: inline-flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer;
            font: 500 14px/20px 'Google Sans', Roboto, sans-serif;
            transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
        }
        #cw-precall-popup .cw-pc-btn:focus-visible { outline: 2px solid ${G.primary}; outline-offset: 2px; }
        #cw-precall-popup .cw-pc-btn:disabled { opacity: 0.5; cursor: default; }
        #cw-precall-popup .cw-pc-btn.is-text { margin-right: auto; padding: 0 12px; background: transparent; color: ${G.textSub}; }
        #cw-precall-popup .cw-pc-btn.is-text:hover { background: ${G.bgInput}; color: ${G.text}; }
        #cw-precall-popup .cw-pc-btn.is-outline { background: #fff; color: ${G.primary}; border-color: rgba(26, 115, 232, 0.4); }
        #cw-precall-popup .cw-pc-btn.is-outline:hover:not(:disabled) { background: ${G.primaryBg}; }
        #cw-precall-popup .cw-pc-btn.is-filled { background: ${G.primary}; color: #fff; box-shadow: 0 1px 2px rgba(26, 115, 232, 0.3); }
        #cw-precall-popup .cw-pc-btn.is-filled:hover:not(:disabled) { background: #1765cc; }
        #cw-precall-popup .cw-pc-btn.is-outline.is-done { background: #e6f4ea; color: #137333; border-color: rgba(19, 115, 51, 0.4); }
        #cw-precall-popup .cw-pc-btn-icon { display: none; }
        #cw-precall-popup .cw-pc-btn-icon svg { width: 16px; height: 16px; fill: currentColor; display: block; }
        #cw-precall-popup .cw-pc-btn.is-done .cw-pc-btn-icon { display: inline-flex; }

        @media (prefers-reduced-motion: reduce) {
            #cw-precall-popup .cw-pc-control.cw-pc-fill,
            #cw-precall-popup .cw-pc-status.is-busy::before { animation: none; }
        }
    `,document.head.appendChild(e)}var Vr={_templates:null,_hydrated:!1,async getTemplates(){return this._templates?this._templates:(this._hydrated||(this._hydrated=!0,await xr()),this._templates=po,this._templates)}};var Wr={pt:"Sem t\xEDtulo",es:"Sin t\xEDtulo",en:"Untitled"},Yr={pt:"Erro: Usu\xE1rio n\xE3o identificado.",es:"Error: usuario no identificado.",en:"Error: user not identified."},Kr="cw_personal_library_v1",da=!1,at={getSnippets:(e="all")=>{let t=at._loadFromLocal(),a=ze();return a&&a.includes("@")&&!da&&at._syncWithServer(a),e==="all"?t:t.filter(o=>o.type===e)},save:async e=>{let t=ze();if(!t)return y.playError(),te(Yr[se()]||Yr.pt,{error:!0}),!1;da=!0;let a=at._loadFromLocal(),o=new Date().toISOString(),i={id:e.id||"local_"+Date.now(),type:e.type||"general",title:e.title||Wr[se()]||Wr.pt,content:e.content||"",subject:e.subject||"",isCode:e.isCode||!1,isRich:e.isRich||!1,updated:o,_pendingSync:!0},n=a.filter(l=>l.id!==i.id);n.unshift(i),at._saveToLocal(n);let r=!1;try{r=await fe.saveSnippet(i,t),r?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais.")}catch(l){console.error("Erro na nuvem:",l)}finally{setTimeout(()=>{da=!1},2e3)}i._pendingSync=!r;let s=at._loadFromLocal().filter(l=>l.id!==i.id);return s.unshift(i),at._saveToLocal(s),{...i,synced:r}},delete:async e=>{let t=ze();da=!0;let o=at._loadFromLocal().filter(i=>i.id!==e);return at._saveToLocal(o),t?fe.deleteSnippet(e,t).then(()=>{setTimeout(()=>{da=!1},2e3)}):da=!1,!0},_syncWithServer:async e=>{if(window._cw_library_syncing)return;window._cw_library_syncing=!0,setTimeout(()=>{window._cw_library_syncing=!1},3e4),console.log("\u{1F504} Sincronizando biblioteca...");let t=await fe.getUserSnippets(e);if(t&&t.status==="success"&&Array.isArray(t.snippets)){let a=t.snippets,o=at._loadFromLocal(),n=[...o.filter(l=>l._pendingSync),...a],r=JSON.stringify(n),s=JSON.stringify(o);r!==s&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),at._saveToLocal(n))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(Kr)||"[]")}catch{return[]}},_saveToLocal:e=>{localStorage.setItem(Kr,JSON.stringify(e))}};var Xr={pt:{headerTitle:"Email Assistant",headerDesc:"Refatora\xE7\xE3o completa do m\xF3dulo de e-mail para uma experi\xEAncia moderna e eficiente.",searchPlaceholder:"Buscar templates...",previewTitle:"Preview do E-mail",noSubject:"Sem Assunto",emailCopiedToast:"E-mail copiado com sucesso!",copyErrorToast:"Erro ao copiar e-mail",fillErrorToast:"Erro ao preencher e-mail",smartCrErrorToast:"Erro ao aplicar Smart CR",personalCategory:"Pessoal",copyHtml:"Copiar HTML",fillInCrm:"Preencher no CRM",loading:"Carregando...",noResults:"Nenhum resultado para",emptyTitle:"Pronto para come\xE7ar?",emptyHint:"Selecione um template \xE0 esquerda para<br>gerar o seu e-mail t\xE9cnico.",smartCrPreview:"Este atalho ir\xE1 preencher automaticamente os destinat\xE1rios e abrir o menu de Canned Responses do CRM.",smartCrHint:"Este \xE9 um <b>Smart CR</b>. Clique no bot\xE3o laranja acima para aplicar o atalho diretamente no CRM."},es:{headerTitle:"Email Assistant",headerDesc:"Refactorizaci\xF3n completa del m\xF3dulo de email para una experiencia moderna y eficiente.",searchPlaceholder:"Buscar plantillas...",previewTitle:"Vista Previa del Email",noSubject:"Sin Asunto",emailCopiedToast:"\xA1Email copiado con \xE9xito!",copyErrorToast:"Error al copiar el email",fillErrorToast:"Error al completar el email",smartCrErrorToast:"Error al aplicar Smart CR",personalCategory:"Personal",copyHtml:"Copiar HTML",fillInCrm:"Rellenar en el CRM",loading:"Cargando...",noResults:"Sin resultados para",emptyTitle:"\xBFListo para empezar?",emptyHint:"Seleccione una plantilla a la izquierda para<br>generar su email t\xE9cnico.",smartCrPreview:"Este atajo rellenar\xE1 autom\xE1ticamente los destinatarios y abrir\xE1 el men\xFA de Canned Responses del CRM.",smartCrHint:"Este es un <b>Smart CR</b>. Haga clic en el bot\xF3n naranja de arriba para aplicar el atajo directamente en el CRM."},en:{headerTitle:"Email Assistant",headerDesc:"A complete rebuild of the email module for a modern, efficient experience.",searchPlaceholder:"Search templates...",previewTitle:"Email Preview",noSubject:"No Subject",emailCopiedToast:"Email copied successfully!",copyErrorToast:"Error copying the email",fillErrorToast:"Error filling in the email",smartCrErrorToast:"Error applying Smart CR",personalCategory:"Personal",copyHtml:"Copy HTML",fillInCrm:"Fill in CRM",loading:"Loading...",noResults:"No results for",emptyTitle:"Ready to start?",emptyHint:"Select a template on the left to<br>generate your technical email.",smartCrPreview:"This shortcut will automatically fill in the recipients and open the CRM's Canned Responses menu.",smartCrHint:"This is a <b>Smart CR</b>. Click the orange button above to apply the shortcut directly in the CRM."}};function qe(e){let t=se();return Xr[t]?.[e]??Xr.pt[e]}var bn="\u{1F464} Pessoal";function Vc(e){return e===bn?`\u{1F464} ${qe("personalCategory")}`:e}var ke={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",warning:"#E67E22",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"};function Wc(){if(document.getElementById("cw-email-styles"))return;let e=document.createElement("style");e.id="cw-email-styles",e.textContent=`
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
        .cw-email-main { display: flex; flex: 1; overflow: hidden; background-color: ${ke.bgApp}; }

        /* --- PAINEL ESQUERDO --- */
        .cw-email-left-panel { width: 320px; background-color: #EFEFF0; border-right: 1px solid ${ke.borderSubtle}; display: flex; flex-direction: column; flex-shrink: 0; }
        .cw-email-search-container { padding: 16px; border-bottom: 1px solid ${ke.borderSubtle}; position: relative; }
        .cw-email-search-input {
            width: 100%; box-sizing: border-box; padding: 10px 14px 10px 36px;
            border-radius: 10px; border: 1.5px solid transparent; background-color: #E3E3E8;
            font-size: 15px; outline: none; color: ${ke.textPrimary};
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238A8A8E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
            background-repeat: no-repeat; background-position: 12px center;
            transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
        }
        .cw-email-search-input:focus {
            background-color: #FFFFFF; border-color: ${ke.primary};
            box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1); transform: scale(1.02);
        }
        .cw-email-clear-btn {
            position: absolute; right: 26px; top: 50%; transform: translateY(-50%);
            font-size: 10px; color: #fff; cursor: pointer; display: none;
            background-color: #C7C7CC; width: 16px; height: 16px; border-radius: 50%;
            text-align: center; line-height: 16px; font-weight: bold;
        }

        #email-template-list { flex: 1; overflow-y: auto; padding: 8px; scroll-behavior: smooth; }

        .cw-email-list-empty { padding: 40px 20px; text-align: center; color: ${ke.textSecondary}; opacity: 0.6; }
        .cw-email-list-empty-icon { font-size: 32px; margin-bottom: 12px; }
        .cw-email-list-empty-text { font-size: 14px; font-weight: 500; }

        .cw-email-cat-header {
            padding: 12px 16px 12px 24px; font-size: 11px; font-weight: 700; color: ${ke.textSecondary};
            text-transform: uppercase; letter-spacing: 0.8px; position: sticky; top: -8px;
            background-color: rgba(239, 239, 240, 0.9); z-index: 10; backdrop-filter: blur(20px);
            margin: 0 -8px 8px -8px; border-bottom: 0.5px solid ${ke.borderSubtle};
            cursor: pointer; display: flex; align-items: center; justify-content: space-between;
            user-select: none; transition: background-color 0.2s ease;
        }
        .cw-email-cat-header:hover { background-color: rgba(230, 230, 232, 0.9); }
        .cw-email-cat-header:focus-visible, .cw-email-list-item:focus-visible { outline: 2px solid ${ke.primary}; outline-offset: -2px; }
        .cw-email-cat-right { display: flex; align-items: center; }
        .cw-email-cat-badge { background-color: rgba(0, 0, 0, 0.05); padding: 2px 8px; border-radius: 10px; font-size: 10px; color: ${ke.textSecondary}; }
        .cw-email-cat-arrow { margin-left: 8px; transition: transform 0.3s ease; }

        .cw-email-list-item {
            padding: 12px 14px; font-size: 14px; cursor: pointer;
            transition: background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1), transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s cubic-bezier(0.25, 1, 0.5, 1), color 0.3s cubic-bezier(0.25, 1, 0.5, 1); border-radius: 10px;
            color: ${ke.textPrimary}; margin: 4px 6px; display: flex; align-items: center; gap: 12px;
            background-color: ${ke.bgSurface}; box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            border: 1px solid ${ke.borderSubtle}; position: relative; overflow: hidden;
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
            background-color: ${ke.primary}; box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
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
        .cw-email-right-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; background-color: ${ke.bgApp}; transition: opacity 0.15s ease, transform 0.15s ease; }
        .cw-email-fields-section { padding: 20px; border-bottom: 1px solid ${ke.borderSubtle}; background-color: ${ke.bgSurface}; max-height: 250px; overflow-y: auto; display: none; }
        .cw-email-fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .cw-email-field-label { display: block; font-size: 11px; font-weight: 700; color: ${ke.textSecondary}; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-email-field-input {
            width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px;
            border: 1.5px solid ${ke.borderSubtle}; background-color: #FBFBFD; font-size: 14px;
            transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease; outline: none;
        }
        .cw-email-field-input:focus { border-color: ${ke.primary}; background-color: #FFFFFF; box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1); }

        .cw-email-smartcr-hint {
            padding: 12px; font-size: 13px; color: #856404; background: #FFF3CD; border: 1px solid #FFEEBA;
            border-radius: 8px; display: flex; align-items: center; gap: 8px;
        }
        .cw-email-smartcr-hint-icon { font-size: 18px; }

        .cw-email-preview-section { flex: 1; display: flex; flex-direction: column; padding: 20px; background-color: ${ke.bgApp}; overflow: hidden; }
        .cw-email-preview-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .cw-email-preview-title { font-size: 12px; font-weight: 600; color: ${ke.textSecondary}; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-email-preview-actions { display: flex; gap: 8px; }
        .cw-email-preview-content {
            flex: 1; background-color: ${ke.bgSurface}; border: 1px solid ${ke.borderSubtle};
            border-radius: 8px; padding: 20px; font-size: 15px; line-height: 1.6; color: ${ke.textPrimary};
            overflow-y: auto; outline: none; box-shadow: inset 0 1px 2px rgba(0,0,0,0.02);
        }

        /* --- BOT\xD5ES DE A\xC7\xC3O --- */
        .cw-email-btn {
            padding: 8px 14px; border-radius: 10px; border: 1.5px solid ${ke.primary};
            background: transparent; color: ${ke.primary}; font-size: 13px; font-weight: 600;
            cursor: pointer; transition: background-color 0.2s cubic-bezier(0.25, 1, 0.5, 1), transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .cw-email-btn:hover { background-color: rgba(0, 122, 255, 0.05); }
        .cw-email-btn:active { transform: scale(0.94); }
        .cw-email-btn.primary {
            border: none; background: ${ke.primary}; color: #fff;
            box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }
        .cw-email-btn.primary:hover { background-color: #0062CC; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0, 122, 255, 0.4); }
        .cw-email-btn.warning { border-color: ${ke.warning}; color: ${ke.warning}; display: none; }
        .cw-email-btn.warning:hover { background-color: rgba(230, 126, 34, 0.08); }

        @media (prefers-reduced-motion: reduce) {
            .cw-animate-float { animation: none !important; }
            .cw-email-search-input, .cw-email-list-item, .cw-email-btn, .cw-email-right-panel {
                transition: opacity 0.15s ease, background-color 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}function Yc(e,t){return e.map(a=>hr(a,ct())).filter(a=>a.name.toLowerCase().includes(t.toLowerCase())||a.category.toLowerCase().includes(t.toLowerCase()))}function Kc(e){return Object.entries(na).filter(([t,a])=>a&&(t.toLowerCase().includes(e.toLowerCase())||a.toLowerCase().includes(e.toLowerCase()))).map(([t,a])=>({id:t,name:t.replace(/_/g," "),category:"\u26A1 Smart CRs",code:a,isSmartCR:!0}))}function Xc(e){return at.getSnippets("email").filter(t=>t.title.toLowerCase().includes(e.toLowerCase())||t.subject&&t.subject.toLowerCase().includes(e.toLowerCase())).map(t=>{let a=[],o=t.content.match(/\[([^\]]+)\]/g);return o&&[...new Set(o)].forEach(i=>{a.push({key:i,label:i.replace("[","").replace("]",""),type:i.toLowerCase().includes("data")?"date":"text",auto:i.toLowerCase().includes("nome")&&i.toLowerCase().includes("seu")?"agentName":null})}),{id:t.id||`snippet-${Math.random()}`,name:t.title,category:bn,subject:t.subject||qe("noSubject"),template:t.content,placeholders:a}})}function Jc(e,t){return[...Yc(e,t),...Kc(t),...Xc(t)]}function Jr(){let e="v6.0.0",t=!1,a=[],o=null,i="",n=new Set;Wc();let r=document.createElement("div");r.id="email-assistant-popup",r.classList.add("cw-module-window","cw-email-popup"),Object.assign(r.style,Qe,{width:"850px",height:"650px"}),r.style.display="none",r.style.flexDirection="column";let s=He(r,qe("headerTitle"),e,qe("headerDesc"),{popup:r},()=>T()),l=document.createElement("div");l.className="cw-email-main";let p=document.createElement("div");p.className="cw-email-left-panel";let d=document.createElement("div");d.className="cw-email-search-container";let A=document.createElement("input");A.className="cw-email-search-input",A.placeholder=qe("searchPlaceholder");let u=document.createElement("div");u.id="email-template-list",Ua(u,".cw-email-cat-header, .cw-email-list-item");let h=document.createElement("div");h.className="cw-email-clear-btn",h.innerHTML="\u2715",h.onclick=()=>{A.value="",i="",h.style.display="none",ae(),A.focus()},d.appendChild(A),d.appendChild(h),p.appendChild(d),p.appendChild(u);let N=document.createElement("div");N.className="cw-email-right-panel";let v=document.createElement("div");v.className="cw-email-fields-section";let I=document.createElement("div");I.className="cw-email-preview-section";let z=document.createElement("div");z.className="cw-email-preview-header";let U=document.createElement("span");U.textContent=qe("previewTitle"),U.className="cw-email-preview-title";let B=document.createElement("div");B.className="cw-email-preview-actions";let x=(ne,pe=!1)=>{let j=document.createElement("button");return j.textContent=ne,j.className="cw-email-btn"+(pe?" primary":""),j},K=x(qe("copyHtml")),W=x(qe("fillInCrm"),!0),X=x("Smart CR");X.classList.add("warning"),B.appendChild(X),B.appendChild(K),B.appendChild(W),z.appendChild(U),z.appendChild(B);let O=document.createElement("div");O.contentEditable="true",O.className="cw-email-preview-content",I.appendChild(z),I.appendChild(O),ce(),N.appendChild(v),N.appendChild(I),l.appendChild(p),l.appendChild(N),r.appendChild(s),r.appendChild(l);let k=document.createElement("div");Object.assign(k.style,kt),r.appendChild(k),Tt(r,k),document.body.appendChild(r);function T(){t=!Ze(r),t?(De(),r.style.display="flex",Ai(r),a.length===0&&E()):(Me(),r.style.display="none"),Ve(t,r,"cw-btn-email")}async function E(){u.innerHTML='<div style="padding: 20px; text-align: center; color: #5f6368;">'+qe("loading")+"</div>",a=await Vr.getTemplates(),ae()}function R(ne,pe,j){let re=document.createElement("div");re.className="cw-email-cat-header",re.tabIndex=0,re.setAttribute("role","button"),re.setAttribute("aria-expanded",String(j));let de=document.createElement("span");de.textContent=Vc(ne),re.appendChild(de);let Z=document.createElement("span");Z.className="cw-email-cat-badge",Z.textContent=pe;let q=document.createElement("span");q.className="cw-email-cat-arrow",q.textContent=j?"\u25BE":"\u25B8";let C=document.createElement("div");return C.className="cw-email-cat-right",C.appendChild(Z),C.appendChild(q),re.appendChild(C),re.onclick=()=>{n.has(ne)?n.delete(ne):n.add(ne),ae()},re.addEventListener("keydown",$=>{($.key==="Enter"||$.key===" ")&&($.preventDefault(),re.click())}),re}function V(ne){let pe=o&&o.id===ne.id,j=document.createElement("div");if(j.className="cw-email-list-item"+(pe?" selected":""),j.tabIndex=0,j.setAttribute("role","button"),j.setAttribute("aria-pressed",String(!!pe)),pe){let Z=document.createElement("div");Z.className="cw-email-list-indicator",j.appendChild(Z)}let re=document.createElement("span");re.className="cw-email-list-icon",re.innerHTML=ne.isSmartCR?"\u26A1":ne.category===bn?"\u{1F464}":"\u{1F4C4}",j.appendChild(re);let de=document.createElement("span");return de.className="cw-email-list-text",de.textContent=ne.name,j.appendChild(de),j.onclick=()=>ue(ne),j.addEventListener("keydown",Z=>{(Z.key==="Enter"||Z.key===" ")&&(Z.preventDefault(),j.click())}),j}function ae(){u.innerHTML="";let ne=Jc(a,i);if(ne.length===0){u.innerHTML=`
                <div class="cw-email-list-empty">
                    <div class="cw-email-list-empty-icon">\u{1F50D}</div>
                    <div class="cw-email-list-empty-text">${qe("noResults")} "${i}"</div>
                </div>`;return}[...new Set(ne.map(j=>j.category))].sort((j,re)=>j.localeCompare(re)).forEach(j=>{let re=n.has(j)||i.length>0,de=ne.filter(Z=>Z.category===j);u.appendChild(R(j,de.length,re)),re&&de.forEach(Z=>{u.appendChild(V(Z))})})}let ie=null;async function ue(ne){o?.id!==ne.id&&(o=ne,ie&&clearTimeout(ie),N.style.opacity="0",N.style.transform="translateY(5px)",ie=setTimeout(()=>{X.style.display=ne.isSmartCR?"block":"none",W.style.display=ne.isSmartCR?"none":"block",K.style.display=ne.isSmartCR?"none":"block",ae(),Q(),ce(),N.style.opacity="1",N.style.transform="translateY(0)",ie=null},150))}function Q(){if(v.innerHTML="",!o||o.isSmartCR){o?.isSmartCR?(v.style.display="block",v.innerHTML=`<div class="cw-email-smartcr-hint">
                    <span class="cw-email-smartcr-hint-icon">\u{1F4A1}</span>
                    <span>${qe("smartCrHint")}</span>
                </div>`):v.style.display="none";return}let ne=o.placeholders&&o.placeholders.length>0;if(v.style.display=ne?"block":"none",!ne)return;let pe=document.createElement("div");pe.className="cw-email-fields-grid",(o.placeholders||[]).forEach(j=>{let re=document.createElement("div"),de=document.createElement("label");de.className="cw-email-field-label",de.textContent=j.label;let Z=document.createElement("input");Z.className="cw-email-field-input",Z.type=j.type||"text",Z.dataset.key=j.key,j.auto==="agentName"&&(Z.value=Ea().split(" ")[0]),Z.addEventListener("input",ce),re.appendChild(de),re.appendChild(Z),pe.appendChild(re)}),v.appendChild(pe)}function ce(){if(!o){O.innerHTML=`
                <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center;">
                    <div class="cw-animate-float" style="width: 140px; height: 140px; margin-bottom: 24px;">
                        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="60" cy="60" r="55" fill="#f8f9fa"/>
                            <!-- Envelope Base -->
                            <path d="M30 40C30 37.7909 31.7909 36 34 36H86C88.2091 36 90 37.7909 90 40V80C90 82.2091 88.2091 84 86 84H34C31.7909 84 30 82.2091 30 80V40Z" fill="white" stroke="#e8eaed" stroke-width="2"/>
                            <!-- Detalhes decorativos (paleta Apple do m\xF3dulo, n\xE3o mais as cores oficiais do Google) -->
                            <path d="M30 40L60 60L90 40" stroke="${ke.primary}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M30 80L50 65" stroke="#FF3B30" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <path d="M90 80L70 65" stroke="#FF9500" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <!-- Small Floating icons -->
                            <circle cx="95" cy="30" r="8" fill="#34C759"/>
                            <path d="M92 30H98M95 27V33" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            <rect x="20" y="70" width="12" height="12" rx="3" fill="${ke.primary}" opacity="0.8"/>
                        </svg>
                    </div>
                    <div style="font-family: 'Google Sans', sans-serif; font-size: 18px; font-weight: 600; color: ${ke.textPrimary}; margin-bottom: 8px;">
                        ${qe("emptyTitle")}
                    </div>
                    <div style="font-size: 14px; color: ${ke.textSecondary}; line-height: 1.6; max-width: 280px; margin: 0 auto;">
                        ${qe("emptyHint")}
                    </div>
                </div>`;return}if(o.isSmartCR){O.innerHTML=`<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">\u26A1</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${o.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">${qe("smartCrPreview")}</div></div>`;return}let ne=o.template;(v.querySelectorAll("input")||[]).forEach(j=>{let re=j.dataset.key,de=j.value;if(j.type==="date"&&de){let[q,C,$]=de.split("-");de=`${C}/${$}/${q}`}de=de||`<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${re}</span>`;let Z=re.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");ne=ne.replace(new RegExp(Z,"g"),de)}),O.innerHTML=ne}return A.addEventListener("input",ne=>{i=ne.target.value,h.style.display=i?"block":"none",ae()}),K.onclick=()=>{let ne=O.innerHTML,pe=new Blob([ne],{type:"text/html"}),j=O.innerText,re=[new ClipboardItem({"text/html":pe,"text/plain":new Blob([j],{type:"text/plain"})})];navigator.clipboard.write(re).then(()=>te(qe("emailCopiedToast")),()=>{y.playError(),te(qe("copyErrorToast"),{error:!0})})},W.onclick=async()=>{if(!o)return;let ne=Oa(),pe={...o,body:O.innerHTML};try{await wr(pe),T()}catch{y.playError(),te(qe("fillErrorToast"),{error:!0})}finally{ne()}},X.onclick=async()=>{if(!o||!o.isSmartCR)return;let ne=Oa();try{await bo(o.code),T()}catch{y.playError(),te(qe("smartCrErrorToast"),{error:!0})}finally{ne()}},Le(()=>{let ne=r.querySelector(".cw-help-title");ne&&(ne.textContent=qe("headerTitle"));let pe=r.querySelector(".cw-help-description");pe&&(pe.textContent=qe("headerDesc")),A.placeholder=qe("searchPlaceholder"),U.textContent=qe("previewTitle"),K.textContent=qe("copyHtml"),W.textContent=qe("fillInCrm"),a.length&&ae(),(!o||o.isSmartCR)&&(Q(),ce())}),T}var Qr=["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],Zr=["Offer implementation via Tag Support (Temporary Access)","Send and walk through acceptance of the 'Consent and authorization...' email","Confirm the access was received","Start the setup (warn about ~10min of silence)","[If declined] Continue with Screen Sharing"],Qc={inicio:{PT:"Abertura",ES:"Apertura",EN:"Opening"},meio:{PT:"Implementa\xE7\xE3o (Tag Support)",ES:"Implementaci\xF3n",EN:"Implementation (Tag Support)"},fim:{PT:"Fechamento",ES:"Cierre",EN:"Closing"}};function ts(e,t){let a=Qc[e];return a?.[t]||a?.PT||""}var pa={"PT BAU":{inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:Qr,fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:Qr,fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{inicio:["Introducci\xF3n (Nombre y Equipo).","La llamada puede ser grabada con fines de entrenamiento y calidad de acuerdo con nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xF3n.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar contenido sensible antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos pasos (\xBFCu\xE1nto tiempo seguir\xE1 el caso?)","Encuesta de Satisfacci\xF3n.","Estar\xE9 monitoreando su caso durante XX d\xEDas para asegurarme de que todo est\xE9 funcionando correctamente. Durante este tiempo, nuestro equipo de calidad podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la cuenta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condiciones.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las herramientas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfacci\xF3n.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes d\xEDas."]},"EN BAU":{inicio:["Introduction (Name and Team)","Recording notice and Privacy Policy","Confirm the CID and the email","(Optional) Validate the account authentication via link","Confirm the Task and the AM","State the call duration (30-45 min)","Ask them to close sensitive content (before sharing)","Validate the backup and admin access"],meio:Zr,fim:["Call summary (what was done and how it works)","Offer further help / Open the floor for questions","Ask them to stop sharing their screen","Next steps (Follow-up for XX days)","Ask for consent for the QA test","Align on scope (Technical vs. Account Manager)","Satisfaction Survey (and confirm the email to send it to)","Sign-off"]},"EN LT":{inicio:["Hello [...], I am [...], and I am part of the Google Technical Solutions Team. How are you?","Our call may be recorded for training, quality and service improvement purposes, in line with our Privacy Policy.","For security reasons, I need you to give me your email and the CID (or number) of the Ads account, please","Confirm the Task and the AM","The consultation lasts around 30 to 45 minutes.","Please share your screen using the \u201CFull Screen\u201D option","Please close any and all confidential and sensitive content (conversations, important personal data, etc).","Do you have a backup of your site and all the access to the Google tools?"],meio:Zr,fim:["Call summary (what was done and how it works)","Offer further help / Open the floor for questions","Ask them to stop sharing their screen","Next steps (Follow-up for XX days)","During that time, our quality team may run a conversion test to validate the implementation. Do you agree to that test so we can confirm the implementation is effective?","Align on scope (Technical vs. Account Manager)","Satisfaction Survey (and confirm the email to send it to)","Sign-off"]}},Zc=["inicio","meio","fim"];function es(e){if(!Array.isArray(e)||!e.length)return!1;let t={},a=e.slice().sort((o,i)=>(o.sortOrder||0)-(i.sortOrder||0));for(let o of a){let i=(o.lang||"").toUpperCase(),n=o.key||"",r=o.field||"",s=o.value||"";if(!i||!n||!Zc.includes(r)||!s)continue;let l=`${i} ${n}`;t[l]||(t[l]={}),(t[l][r]=t[l][r]||[]).push(s)}if(!Object.keys(t).length)return!1;for(let o of Object.keys(pa))delete pa[o];return Object.assign(pa,t),!0}async function as(e){let t=fe.getCachedContent("call_script");es(t)&&e?.();try{let a=await fe.fetchContentModule("call_script");es(a)&&e?.()}catch(a){console.warn("Central de Conte\xFAdo indispon\xEDvel; usando roteiro embutido.",a)}}var vo={pt:{headerTitle:"Call Script",headerDesc:"Guia interativo para condu\xE7\xE3o de chamadas.",loading:"Carregando...",unknownClient:"Cliente Desconhecido",notFound:"N\xE3o encontrado",activeMonitoring:"Monitoramento Ativo",cidLabel:"CID (Conta)",emailLabel:"Email de Contato",copied:"Copiado!",amMessageTitle:"Mensagem AM",amMessageSub:"Gerar aviso de insucesso",copyFinalMessage:"Copiar Mensagem Final",resize:"Redimensionar",resetScript:"Resetar Script",resetConfirm:"Resetar todo o progresso do script? Essa a\xE7\xE3o n\xE3o pode ser desfeita.",resetConfirmBtn:"Resetar",scriptNotConfigured:"Script n\xE3o configurado.",messageCopiedToast:"Mensagem copiada!",amMessage:(e,t)=>`Ol\xE1. Bom dia!

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
Email: ${e.clientEmail||"---"}`,dateLocale:"en-US"}};function os(){return{es:"ES",en:"EN"}[ct()]||"PT"}function Te(e){let t=se();return vo[t]?.[e]??vo.pt[e]}function ns(e){let t=ct();return vo[t]?.[e]??vo.pt[e]}var ve={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",danger:"#D93025",dangerBg:"#FCE8E6",success:"#34A853",successBg:"#E6F4EA"};function ed(){if(document.getElementById("csa-styles-v2"))return;let e=document.createElement("style");e.id="csa-styles-v2",e.textContent=`
        #call-script-popup { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

        /* --- BANNER DE CONTEXTO --- */
        .csa-context-banner {
            padding: 20px 20px 16px 20px;
            background: ${ve.bgSurface};
            border-bottom: 1px solid #F1F3F4;
            display: flex; flex-direction: column; gap: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
            position: relative; z-index: 5;
        }
        .csa-ctx-top { display: flex; justify-content: space-between; align-items: center; }
        .csa-ctx-name-wrap { display: flex; align-items: center; gap: 10px; }
        .csa-ctx-name { font-size: 16px; font-weight: 500; color: ${ve.textPrimary}; }
        .csa-live-badge {
            font-size: 10px; font-weight: 700; color: ${ve.primary}; background: ${ve.primaryBg};
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
        .csa-data-pill:hover { background: ${ve.bgSurface}; border-color: #DADCE0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transform: translateY(-1px); }
        .csa-data-pill:active { transform: scale(0.98); }
        .csa-data-pill.copied { background: ${ve.successBg} !important; border-color: ${ve.success} !important; }
        .csa-pill-label { font-size: 9px; font-weight: 700; color: ${ve.textSecondary}; text-transform: uppercase; margin-bottom: 2px; letter-spacing: 0.5px; }
        .csa-data-value { font-size: 13px; color: ${ve.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .csa-data-value.mono { font-family: 'SF Mono', 'Roboto Mono', monospace; font-weight: 500; color: ${ve.primary}; }
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
            width: 100%; background: ${ve.bgSurface}; border: 1px solid #DADCE0; border-radius: 10px; padding: 10px;
            display: flex; align-items: center; gap: 12px; cursor: pointer; box-sizing: border-box;
            transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.02);
        }
        .csa-am-btn:hover { border-color: ${ve.primary}; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .csa-am-icon { background: ${ve.primaryBg}; border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .csa-am-btn-text { text-align: left; }
        .csa-am-btn-title { font-size: 11px; font-weight: 700; color: #3C4043; }
        .csa-am-btn-sub { font-size: 10px; color: ${ve.textSecondary}; }

        .csa-am-review-container { display: none; max-height: 0; opacity: 0; overflow: hidden; margin-top: 0; transition: all 0.3s ease; }
        .csa-am-review-container.visible { display: block; max-height: 300px; opacity: 1; margin-top: 12px; }
        .csa-am-message-area {
            width: 100%; height: 120px; border: 1px solid #DADCE0; border-radius: 8px; padding: 10px;
            font-family: inherit; font-size: 13px; color: #3C4043; outline: none; resize: none;
            box-sizing: border-box; background: ${ve.bgSurface}; line-height: 1.4;
        }
        .csa-am-copy-final {
            width: 100%; margin-top: 8px; padding: 10px; background: ${ve.primary}; color: white; border: none;
            border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; transition: background 0.2s;
        }
        .csa-am-copy-final.copied-flash { background: ${ve.success}; }

        /* --- BARRA DE PROGRESSO --- */
        .csa-progress-container { height: 6px; background: ${ve.borderSubtle}; width: 100%; position: relative; overflow: hidden; }
        .csa-progress-fill {
            height: 100%; width: 0%; border-radius: 0 3px 3px 0;
            transition: width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
            background: linear-gradient(90deg, ${ve.primary}, #00C6FF, ${ve.primary});
            background-size: 200% 100%;
            animation: csaShimmer 2s infinite linear;
        }
        .csa-progress-fill.complete { background: ${ve.success}; animation: none; }
        @keyframes csaShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

        /* --- SEGMENTED CONTROL (Tipo / Idioma) --- */
        .csa-content-area { padding: 16px; overflow-y: auto; flex-grow: 1; background: ${ve.bgApp}; scroll-behavior: smooth; }
        .csa-controls { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .csa-segmented-control { display: flex; background: #E3E3E8; padding: 2px; border-radius: 10px; gap: 2px; position: relative; margin-bottom: 16px; }
        .csa-segmented-control button {
            flex: 1; border: none; background: transparent; padding: 8px 4px; font-size: 12px; font-weight: 600;
            border-radius: 8px; cursor: pointer; transition: color 0.3s ease; color: ${ve.textSecondary};
            position: relative; z-index: 2;
        }
        .csa-segmented-control button.active { color: ${ve.textPrimary}; }
        .csa-segmented-indicator {
            position: absolute; top: 2px; left: 2px; bottom: 2px; background: ${ve.bgSurface};
            border-radius: 8px; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1; box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        /* --- CARDS DO CHECKLIST --- */
        .csa-card { background: ${ve.bgSurface}; border: 1px solid ${ve.borderSubtle}; border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02); }
        .csa-card.done { box-shadow: inset 4px 0 0 ${ve.success}, 0 1px 3px rgba(0,0,0,0.05); }
        .csa-card-title { font-size: 11px; font-weight: 700; color: ${ve.textSecondary}; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; user-select: none; }
        .csa-card-counter { font-size: 11px; opacity: 0.7; font-weight: 500; background: #f1f3f4; padding: 2px 8px; border-radius: 10px; }
        .csa-card-counter.done { opacity: 1; color: #1e8e3e; background: ${ve.successBg}; }

        .csa-item-row { display: flex; align-items: flex-start; padding: 10px 8px; cursor: pointer; border-radius: 10px; transition: background 0.2s ease; color: ${ve.textPrimary}; font-size: 14px; line-height: 1.5; margin-bottom: 2px; }
        .csa-item-row:not(.completed):hover { background: rgba(0, 0, 0, 0.03); }
        .csa-item-row:not(.completed):hover .csa-checkbox { border-color: ${ve.primary}; }
        .csa-item-row.completed { background: rgba(0, 0, 0, 0.02); }

        .csa-checkbox {
            min-width: 20px; height: 20px; border-radius: 50%; border: 2px solid ${ve.borderSubtle};
            margin-right: 12px; margin-top: 1px; display: flex; align-items: center; justify-content: center;
            transition: border-color 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.15s ease;
            background: #fff;
        }
        .csa-checkbox.checked { background: ${ve.primary}; border-color: ${ve.primary}; }
        .csa-checkbox.pulse { transform: scale(1.15); }

        .csa-item-text { position: relative; display: inline-block; flex: 1; transition: color 0.3s ease; }
        .csa-item-text.completed { color: ${ve.textSecondary}; }
        .csa-item-text::after { content: ''; position: absolute; left: 0; top: 50%; width: 0; height: 1.5px; background: ${ve.textSecondary}; transition: width 0.3s ease; }
        .csa-item-text.completed::after { width: 100%; }

        .csa-empty-state { padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .csa-empty-state-icon { font-size: 24px; }

        /* --- FOOTER --- */
        .csa-footer { padding: 12px 16px; border-top: 1px solid #F1F3F4; background: ${ve.bgSurface}; display: flex; justify-content: space-between; align-items: center; }
        .csa-credit { font-size: 10px; color: #bdc1c6; }
        .csa-reset-btn {
            background: transparent; border: none; color: ${ve.danger}; font-size: 12px; font-weight: 600;
            cursor: pointer; padding: 6px 12px; border-radius: 20px; transition: background 0.2s ease, transform 0.15s ease;
            display: flex; align-items: center; gap: 4px;
        }
        .csa-reset-btn:hover { background: ${ve.dangerBg}; }
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
    `,document.head.appendChild(e)}function is(){let e="v3.1.0";ed();let t={},a=os(),o="BAU",i=!1,n=document.createElement("div");n.id="call-script-popup",n.classList.add("cw-module-window"),Object.assign(n.style,Qe,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let r={popup:n,googleLine:null},s=null;function l(){i&&bt().then(Z=>{let q=n.querySelector("#cw-ctx-name"),C=n.querySelector("#cw-ctx-cid"),$=n.querySelector("#cw-ctx-email");if(q&&(q.textContent=Z.advertiserName||Te("unknownClient")),C){let J=Z.cid||"---";C.textContent!==J&&(C.textContent=J)}if($){let J=Z.clientEmail||Te("notFound");$.textContent!==J&&($.textContent=J,$.title=J)}})}function p(){bt().then(Z=>{let q=new Date().toLocaleDateString(ns("dateLocale")),C=n.querySelector("#cw-am-message-area"),$=n.querySelector("#cw-am-review-container"),J=ns("amMessage")(Z,q);C&&(C.value=J),$&&($.classList.add("visible"),$.scrollIntoView({behavior:"smooth",block:"end"}))})}function d(){i=!Ze(n),Ve(i,n,"cw-btn-script"),i?(De(),l(),s||(s=setInterval(l,2e3))):(Me(),s&&(clearInterval(s),s=null))}let A=He(n,Te("headerTitle"),e,Te("headerDesc"),r,()=>{d()});n.appendChild(A);let u=A.querySelector("span"),h=document.createElement("div");h.className="csa-context-banner",h.innerHTML=`
      <div class="csa-ctx-top">
          <div class="csa-ctx-name-wrap">
              <div class="csa-live-dot js-csa-monitoring" title="${Te("activeMonitoring")}"></div>
              <span id="cw-ctx-name" class="csa-ctx-name">${Te("loading")}</span>
          </div>
          <div class="csa-live-badge">Live</div>
      </div>

      <div class="csa-ctx-grid">
          <div class="csa-data-pill" id="cw-pill-cid">
              <div class="csa-pill-label js-csa-cid-label">${Te("cidLabel")}</div>
              <div id="cw-ctx-cid" class="csa-data-value mono">---</div>
              <div class="csa-copy-hint">${Te("copied")}</div>
          </div>

          <div class="csa-data-pill" id="cw-pill-email">
              <div class="csa-pill-label js-csa-email-label">${Te("emailLabel")}</div>
              <div id="cw-ctx-email" class="csa-data-value">---</div>
              <div class="csa-copy-hint">${Te("copied")}</div>
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
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${ve.primary}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </div>
                      <div class="csa-am-btn-text">
                          <div class="csa-am-btn-title js-csa-am-title">${Te("amMessageTitle")}</div>
                          <div class="csa-am-btn-sub js-csa-am-sub">${Te("amMessageSub")}</div>
                      </div>
                  </button>

                  <div id="cw-am-review-container" class="csa-am-review-container">
                      <textarea id="cw-am-message-area" class="csa-am-message-area"></textarea>
                      <button id="cw-am-copy-final" class="csa-am-copy-final">${Te("copyFinalMessage")}</button>
                  </div>
              </div>
          </div>
      </div>
  `;let N=h.querySelector("#csa-toggle-options"),v=h.querySelector("#csa-options-content"),I=h.querySelector("#csa-options-arrow"),z=!1;N.onclick=()=>{z=!z,I.classList.toggle("expanded",z),v.classList.toggle("expanded",z),y.playClick()};let U=h.querySelector("#cw-pill-message"),B=h.querySelector("#cw-am-copy-final"),x=h.querySelector("#cw-am-message-area");U.addEventListener("click",()=>{p()}),B.addEventListener("click",()=>{x.value&&(navigator.clipboard.writeText(x.value),te(Te("messageCopiedToast")),y.playSuccess(),B.classList.add("copied-flash"),B.textContent=Te("copied"),setTimeout(()=>{B.classList.remove("copied-flash"),B.textContent=Te("copyFinalMessage")},2e3))});let K=(Z,q)=>{let C=h.querySelector(Z),$=h.querySelector(q);C.onclick=()=>{let J=$.textContent;!J||J.includes("---")||J===Te("notFound")||(navigator.clipboard.writeText(J),y.playSuccess(),C.classList.add("copied"),setTimeout(()=>C.classList.remove("copied"),1500))}};n.appendChild(h);let W=document.createElement("div");W.className="csa-progress-container";let X=document.createElement("div");X.className="csa-progress-fill",W.appendChild(X),n.appendChild(W);let O=document.createElement("div");O.id="csa-content",O.className="csa-content-area",n.appendChild(O);let k=document.createElement("div");k.className="csa-footer";let T=document.createElement("span");T.className="csa-credit",T.textContent=`by ${Et}`;let E=document.createElement("button");E.className="csa-reset-btn",E.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> <span class="js-csa-reset-label">${Te("resetScript")}</span>`,E.onclick=async()=>{if(await Ye(Te("resetConfirm"),{danger:!0,confirmText:Te("resetConfirmBtn")})){for(let q in t)delete t[q];j()}},k.appendChild(T),k.appendChild(E),n.appendChild(k);let R=document.createElement("div");R.className="csa-controls";let V=document.createElement("div");V.className="csa-segmented-control",V.innerHTML=`
      <div class="csa-segmented-indicator" id="type-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-type="BAU">BAU</button>
      <button data-type="LT">LT</button>
  `,R.appendChild(V),O.appendChild(R);let ae=V.querySelectorAll("button"),ie=V.querySelector("#type-indicator");ae.forEach((Z,q)=>{Z.onclick=()=>{ae.forEach(C=>C.classList.remove("active")),Z.classList.add("active"),ie.style.transform=`translateX(${q*(V.offsetWidth/2-2)}px)`,o=Z.dataset.type,y.playClick(),j()}}),Qt(()=>{a=os(),j()}),Le(()=>{u&&(u.textContent=Te("headerTitle"));let Z=n.querySelector(".cw-help-title");Z&&(Z.textContent=Te("headerTitle"));let q=n.querySelector(".cw-help-description");q&&(q.textContent=Te("headerDesc"));let C=h.querySelector(".js-csa-monitoring");C&&(C.title=Te("activeMonitoring"));let $=h.querySelector(".js-csa-cid-label");$&&($.textContent=Te("cidLabel"));let J=h.querySelector(".js-csa-email-label");J&&(J.textContent=Te("emailLabel")),h.querySelectorAll(".csa-copy-hint").forEach(f=>f.textContent=Te("copied"));let D=h.querySelector(".js-csa-am-title");D&&(D.textContent=Te("amMessageTitle"));let H=h.querySelector(".js-csa-am-sub");H&&(H.textContent=Te("amMessageSub")),B&&(B.textContent=Te("copyFinalMessage"));let oe=E.querySelector(".js-csa-reset-label");oe&&(oe.textContent=Te("resetScript")),Q.title=Te("resize"),j()});let ue=document.createElement("div");ue.id="csa-checklist-area",O.appendChild(ue);let Q=document.createElement("div");Object.assign(Q.style,kt),Q.className="no-drag",Q.title=Te("resize"),n.appendChild(Q),Tt(n,Q),document.body.appendChild(n),K("#cw-pill-cid","#cw-ctx-cid"),K("#cw-pill-email","#cw-ctx-email");function ce(Z){return Z.replace(/\n/g,"<br>")}function ne(Z,q,C,$){let J=`${Z}-${q}-${$}`,D=!!t[J],H=document.createElement("div");H.className="csa-item-row"+(D?" completed":"");let oe=document.createElement("div");oe.className="csa-checkbox"+(D?" checked":""),oe.innerHTML=D?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':"";let f=document.createElement("span");return f.className="csa-item-text"+(D?" completed":""),f.innerHTML=ce(C),H.onclick=()=>{let g=!t[J];t[J]=g,y.playClick(),H.classList.toggle("completed",g),f.classList.toggle("completed",g),oe.classList.toggle("checked",g),oe.innerHTML=g?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':"",g&&(oe.classList.add("pulse"),setTimeout(()=>oe.classList.remove("pulse"),150)),re(Z,pa[Z])},H.appendChild(oe),H.appendChild(f),{row:H,isDone:D}}function pe(Z,q,C){let $=document.createElement("div");$.className="csa-card";let J=document.createElement("div");J.className="csa-card-title",J.textContent=ts(q,a);let D=document.createElement("span");D.className="csa-card-counter",J.appendChild(D),$.appendChild(J);let H=0;C.forEach((f,g)=>{let{row:c,isDone:S}=ne(Z,q,f,g);S&&H++,$.appendChild(c)});let oe=H===C.length&&C.length>0;return $.classList.toggle("done",oe),D.classList.toggle("done",oe),D.textContent=`${H}/${C.length}`,$}function j(){ue.innerHTML="";let Z=`${a} ${o}`,q=pa[Z];if(!q){ue.innerHTML=`<div class="csa-empty-state"><div class="csa-empty-state-icon">\u2615</div><div>${Te("scriptNotConfigured")}</div></div>`,X.style.width="0%";return}let C=0,$=0;["inicio","meio","fim"].forEach(J=>{q[J]&&(C+=q[J].length)}),["inicio","meio","fim"].forEach(J=>{let D=q[J];!D||D.length===0||(D.forEach((H,oe)=>{let f=`${Z}-${J}-${oe}`;t[f]&&$++}),ue.appendChild(pe(Z,J,D)))}),de(C,$)}function re(Z,q){let C=0,$=0;["inicio","meio","fim"].forEach(J=>{let D=q[J]||[];C+=D.length,D.forEach((H,oe)=>{t[`${Z}-${J}-${oe}`]&&$++})}),de(C,$),setTimeout(()=>j(),200)}function de(Z,q){let C=Z===0?0:q/Z*100;X.style.width=`${C}%`,X.classList.toggle("complete",C===100)}return j(),as(()=>j()),d}var hn={cyan:{color:"#0097A7",bg:"#E0F7FA"},blue:{color:"#1967D2",bg:"#E8F0FE"},orange:{color:"#E37400",bg:"#FEF7E0"},green:{color:"#188038",bg:"#E6F4EA"},purple:{color:"#9334E6",bg:"#F3E8FD"},red:{color:"#C5221F",bg:"#FCE8E6"},slate:{color:"#5F6368",bg:"#F1F3F4"},amber:{color:"#F09D00",bg:"#FFF3E0"},sky:{color:"#0B57D0",bg:"#D3E3FD"},pink:{color:"#D01884",bg:"#FDE7F3"},teal:{color:"#00796B",bg:"#E0F2F1"},indigo:{color:"#3949AB",bg:"#E8EAF6"}},We=e=>`<svg viewBox="0 0 24 24" fill="currentColor"><path d="${e}"/></svg>`,xn={description:We("M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"),assignment:We("M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"),verified_user:We("M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"),chat:We("M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"),public:We("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"),bar_chart:We("M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"),shopping_cart:We("M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"),code:We("M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"),person:We("M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"),folder:We("M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"),bookmark:We("M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"),star:We("M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"),info:We("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"),help:We("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"),flag:We("M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"),school:We("M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"),build:We("M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"),lightbulb:We("M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"),event:We("M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"),feedback:We("M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z")},vn={tasks:{color:"cyan",icon:"description",label:{pt:"Tarefas",es:"Tareas",en:"Tasks"}},ads:{color:"blue",icon:"public",label:{pt:"Ads",es:"Ads",en:"Ads"}},analytics:{color:"orange",icon:"bar_chart",label:{pt:"GA4",es:"GA4",en:"GA4"}},shopping:{color:"green",icon:"shopping_cart",label:{pt:"Shop",es:"Shop",en:"Shop"}},tech:{color:"purple",icon:"code",label:{pt:"Tech",es:"Tech",en:"Tech"}},hr:{color:"red",icon:"person",label:{pt:"RH",es:"RRHH",en:"HR"}},lm:{color:"slate",icon:"assignment",label:{pt:"Forms",es:"Forms",en:"Forms"}},qa:{color:"amber",icon:"verified_user",label:{pt:"QA",es:"QA",en:"QA"}},suporte:{color:"sky",icon:"chat",label:{pt:"Ajuda",es:"Ayuda",en:"Help"}},feedback:{color:"pink",icon:"feedback",label:{pt:"Feedback",es:"Feedback",en:"Feedback"}}},Ra={color:"slate",icon:"folder"},yn=30,ss=10,td=3,ad=5;function wn(e){try{let t=JSON.parse(e||"{}");return t&&typeof t=="object"?t:{}}catch{return{}}}function Lt(e,t,a){if(!e)return"";let o=a==="es"||a==="en"?e[`${t}_${a}`]:"";return String(o||e[t]||"").trim()}function pt(e){return e.lineage||`u:${e.url}`}function Sn(e){let t=wn(e.value);return{id:e.id||"",lineage:e.lineage||e.id||"",cat:String(e.key||""),name:String(t.name||""),url:String(t.url||""),desc:String(t.desc||""),desc_es:String(t.desc_es||""),desc_en:String(t.desc_en||""),about:String(t.about||""),about_es:String(t.about_es||""),about_en:String(t.about_en||""),when:String(t.when||""),when_es:String(t.when_es||""),when_en:String(t.when_en||"")}}function ls(e){let t={};return(e||[]).forEach(a=>{let o=String(a.key||"").trim();if(!o||vn[o])return;let i=wn(a.value);i.label&&(t[o]={color:hn[i.color]?i.color:Ra.color,icon:xn[i.icon]?i.icon:Ra.icon,label:{pt:String(i.label),es:String(i.label_es||i.label),en:String(i.label_en||i.label)},custom:!0})}),t}function An(e,t){let a=vn[e]||t&&t[e];return a||{...Ra,label:{pt:e,es:e,en:e},unknown:!0}}function za(e,t,a){let o=An(e,a);return o.label[t]||o.label.pt}function Cn(e,t){let a=An(e,t);return hn[a.color]||hn[Ra.color]}function ma(e,t){let a=An(e,t);return xn[a.icon]||xn[Ra.icon]}function En(e,t){let a=new Set(e.map(r=>r.cat)),o=Object.keys(vn),i=Object.keys(t||{}),n=[...a].filter(r=>!o.includes(r)&&!i.includes(r));return[...o,...i,...n].filter(r=>a.has(r))}function cs(e,t){let a=new Map;return En(e,t).forEach(o=>a.set(o,[])),e.forEach(o=>a.get(o.cat).push(o)),a}function kn(e,t,a){let o=new Map(t.filter(d=>d.lineage).map(d=>[d.lineage,d])),i=[],n=[];(e||[]).forEach(d=>{let A=wn(d.value),u=o.get(String(A.linkLineage||""));if(!u)return;let h={id:d.id,link:u,linkId:pt(u),headline:Lt(A,"headline",a)||u.name,blurb:Lt(A,"blurb",a),position:A.position==="main"?"main":"secondary",startsAt:String(A.startsAt||""),endsAt:String(A.endsAt||"")};d.state==="active"?i.push(h):d.state==="ended"&&n.push(h)}),i.sort((d,A)=>(d.position==="main"?0:1)-(A.position==="main"?0:1)||A.startsAt.localeCompare(d.startsAt)||d.id.localeCompare(A.id));let r=i.slice(0,td),s=new Set(r.map(d=>d.linkId));n.sort((d,A)=>A.endsAt.localeCompare(d.endsAt));let l=new Set,p=n.filter(d=>s.has(d.linkId)||l.has(d.linkId)?!1:(l.add(d.linkId),!0)).slice(0,ad);return{active:r,ended:p}}function ds(e,t,a=yn){let o=Array.isArray(e)?e.filter(i=>typeof i=="string"):[];return o.includes(t)?{list:o.filter(i=>i!==t),added:!1,full:!1}:o.length>=a?{list:o,added:!1,full:!0}:{list:[t,...o],added:!0,full:!1}}function ps(e,t,a,o=ss){let i=Array.isArray(e)?e.filter(n=>n&&typeof n.id=="string"):[];return[{id:t,t:a},...i.filter(n=>n.id!==t)].slice(0,o)}function us(e,t,a,o){if(typeof e!="string")return null;let i=e;return!t.has(e)&&e.startsWith("u:")&&a.has(e.slice(2))&&(i=pt(a.get(e.slice(2)))),!t.has(i)&&o?null:i}function ms(e){return{porId:new Map(e.map(t=>[pt(t),t])),porUrl:new Map(e.map(t=>[t.url,t]))}}function gs(e,t,a){let{porId:o,porUrl:i}=ms(t),n=new Set,r=[];return(e||[]).forEach(s=>{let l=us(s,o,i,a);l===null||n.has(l)||(n.add(l),r.push(l))}),r}function fs(e,t,a){let{porId:o,porUrl:i}=ms(t),n=new Set,r=[];return(Array.isArray(e)?e:[]).forEach(s=>{let l=s&&us(s.id,o,i,a);!l||n.has(l)||(n.add(l),r.push({id:l,t:s.t}))}),r}function bs(e,t,a){let o=new Map(t.map(r=>[r.url,r])),i=new Set,n=[];return(Array.isArray(e)?e:[]).forEach((r,s)=>{let l=r&&o.get(r.url);!l||i.has(pt(l))||(i.add(pt(l)),n.push({id:pt(l),t:a-s*6e4}))}),n.slice(0,ss)}var od=new RegExp("[\u0300-\u036F]","g");function rs(e){return String(e??"").normalize("NFD").replace(od,"").toLowerCase()}function hs(e,t,a,o){let i=rs(t).trim();return i?[e.name,Lt(e,"desc",a),Lt(e,"about",a),Lt(e,"when",a),za(e.cat,a,o)].some(r=>rs(r).includes(i)):!0}var ua={pt:"pt-BR",es:"es-ES",en:"en-US"};function xs(e){let t=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(String(e||""));return t?new Date(Number(t[1]),Number(t[2])-1,Number(t[3]),Number(t[4]),Number(t[5])):null}function yo(e,t){let a=xs(e);return a?new Intl.DateTimeFormat(ua[t]||ua.pt,{day:"2-digit",month:"2-digit"}).format(a):""}function vs(e,t){let a=xs(e);return a?new Intl.DateTimeFormat(ua[t]||ua.pt,{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).format(a):""}function ys(e,t,a){let o=ua[a]||ua.pt,i=new Date(e),n=new Date(t),r=Math.round((new Date(n.getFullYear(),n.getMonth(),n.getDate())-new Date(i.getFullYear(),i.getMonth(),i.getDate()))/864e5);if(r<=0){let s=new Intl.DateTimeFormat(o,{hour:"2-digit",minute:"2-digit",hour12:!1}).format(i);return`${new Intl.RelativeTimeFormat(o,{numeric:"auto"}).format(0,"day")}, ${s}`}return r===1?new Intl.RelativeTimeFormat(o,{numeric:"auto"}).format(-1,"day"):new Intl.DateTimeFormat(o,{day:"2-digit",month:"2-digit"}).format(i)}var nd={"Ponto Eletr\xF4nico":"Control de Asistencia","Ferramenta de ajuda":"Herramienta de ayuda","Intranet Google":"Intranet Google","Relat\xF3rio Follow-ups":"Informe de Follow-ups","Dashboard WFM":"Dashboard WFM","Tech Solutions SAO":"Tech Solutions SAO","Form Grava\xE7\xE3o":"Form Grabaci\xF3n","Form Escala\xE7\xE3o":"Form Escalaci\xF3n","Instru\xE7\xF5es Split":"Instrucciones Split","Single Page App":"Single Page App","Procedimento Padr\xE3o":"Procedimiento Est\xE1ndar","Valida\xE7\xE3o C\xF3digo":"Validaci\xF3n C\xF3digo","Convers\xE3o Chamada":"Conversi\xF3n Llamada","Valida\xE7\xE3o WCC":"Validaci\xF3n WCC",ECW4:"ECW4","Monitoramento EC":"Monitoreo EC","Resolu\xE7\xE3o problemas":"Resoluci\xF3n de problemas","Implementa\xE7\xE3o RMKT":"Implementaci\xF3n RMKT","Pontua\xE7\xE3o Leads":"Puntuaci\xF3n de Leads","Instala\xE7\xE3o Container":"Instalaci\xF3n Container","Instala\xE7\xE3o Config.":"Instalaci\xF3n Config.","Valida\xE7\xE3o GA4":"Validaci\xF3n GA4","Guia Dev":"Gu\xEDa Dev","Resolu\xE7\xE3o Problemas":"Resoluci\xF3n de Problemas","Dom\xEDnio Cruzado":"Dominio Cruzado","Lista Oficial":"Lista Oficial","Criador URLs":"Creador de URLs","Setup Inicial":"Setup Inicial","Otimiza\xE7\xE3o Feed":"Optimizaci\xF3n Feed","Ferramenta Interna":"Herramienta Interna",Avalia\u00E7\u00F5es:"Rese\xF1as","Feeds Offline":"Feeds Offline","Help Center":"Help Center","Guias CMS":"Gu\xEDas CMS","Solu\xE7\xF5es Iframes":"Soluciones Iframes","Ghost Ads":"Ghost Ads","Ghost Analytics":"Ghost Analytics","Ghost GTM":"Ghost GTM",Ferramenta:"Herramienta","Ghost MC":"Ghost MC","Playground JS":"Playground JS","Testador Regex":"Probador Regex","Doc. CSP":"Doc. CSP","Guia CoMo":"Gu\xEDa CoMo","Debug CoMo":"Debug CoMo","Portal Colaborador":"Portal del Colaborador","Apps e Sistemas":"Apps y Sistemas","Folha Pagamento":"N\xF3mina","Reportar problemas":"Reportar problemas","Registro chamadas":"Registro de llamadas","Erros de sistema":"Errores de sistema","BAU/Descarte/Monitoria":"BAU/Descarte/Monitoreo","Feedback positivo":"Feedback positivo","Casos dif\xEDceis":"Casos dif\xEDciles","Chat/Email Ads":"Chat/Email Ads","Chat/Email Shopping":"Chat/Email Shopping","Perfil da Empresa":"Perfil de la Empresa","Console API":"Console API","Lista de n\xFAmeros":"Lista de n\xFAmeros",Cursos:"Cursos"},id={"Ponto Eletr\xF4nico":"Time Clock","Ferramenta de ajuda":"Help tool","Intranet Google":"Google Intranet","Relat\xF3rio Follow-ups":"Follow-ups report","Dashboard WFM":"WFM Dashboard","Tech Solutions SAO":"Tech Solutions SAO","Form Grava\xE7\xE3o":"Recording Form","Form Escala\xE7\xE3o":"Escalation Form","Instru\xE7\xF5es Split":"Split instructions","Single Page App":"Single Page App","Procedimento Padr\xE3o":"Standard Procedure","Valida\xE7\xE3o C\xF3digo":"Code validation","Convers\xE3o Chamada":"Call conversion","Valida\xE7\xE3o WCC":"WCC validation",ECW4:"ECW4","Monitoramento EC":"EC monitoring","Resolu\xE7\xE3o problemas":"Troubleshooting","Implementa\xE7\xE3o RMKT":"RMKT implementation","Pontua\xE7\xE3o Leads":"Lead scoring","Instala\xE7\xE3o Container":"Container installation","Instala\xE7\xE3o Config.":"Config. installation","Valida\xE7\xE3o GA4":"GA4 validation","Guia Dev":"Dev guide","Resolu\xE7\xE3o Problemas":"Troubleshooting","Dom\xEDnio Cruzado":"Cross-domain","Lista Oficial":"Official list","Criador URLs":"URL builder","Setup Inicial":"Initial setup","Otimiza\xE7\xE3o Feed":"Feed optimization","Ferramenta Interna":"Internal tool",Avalia\u00E7\u00F5es:"Reviews","Feeds Offline":"Offline feeds","Help Center":"Help Center","Guias CMS":"CMS guides","Solu\xE7\xF5es Iframes":"Iframe solutions","Ghost Ads":"Ghost Ads","Ghost Analytics":"Ghost Analytics","Ghost GTM":"Ghost GTM",Ferramenta:"Tool","Ghost MC":"Ghost MC","Playground JS":"JS Playground","Testador Regex":"Regex tester","Doc. CSP":"CSP docs","Guia CoMo":"CoMo guide","Debug CoMo":"CoMo debug","Portal Colaborador":"Employee Portal","Apps e Sistemas":"Apps and Systems","Folha Pagamento":"Payroll","Reportar problemas":"Report problems","Registro chamadas":"Call log","Erros de sistema":"System errors","BAU/Descarte/Monitoria":"BAU/Discard/Monitoring","Feedback positivo":"Positive feedback","Casos dif\xEDceis":"Difficult cases","Chat/Email Ads":"Chat/Email Ads","Chat/Email Shopping":"Chat/Email Shopping","Perfil da Empresa":"Business Profile","Console API":"API Console","Lista de n\xFAmeros":"Number list",Cursos:"Courses"},ws={pt:{headerTitle:"Central de Links",headerDesc:"Navegue pelas categorias ou use a busca.",searchPlaceholder:"Buscar ferramenta ou SOP...",home:"In\xEDcio",featured:"Em destaque",tabFavorites:"Favoritos",tabRecent:"Recentes",tabEnded:"Sa\xEDram do destaque",until:e=>`at\xE9 ${e}`,endedOn:e=>`saiu em ${e}`,liveNow:"Em destaque agora",liveUntil:e=>`Em destaque at\xE9 ${e}`,open:"Abrir",openLink:"Abrir link",copyUrl:"Copiar URL",copied:"Copiado",favorite:"Favoritar",favorited:"Favorito",favoriteAdd:"Adicionar aos favoritos",favoriteRemove:"Remover dos favoritos",aboutLabel:"O que \xE9",whenLabel:"Quando usar",emptyFavTitle:"Nenhum favorito ainda",emptyFavSub:"Clique na estrela de um link para fix\xE1-lo aqui.",emptyRecentTitle:"Nada por aqui ainda",emptyRecentSub:"Os links que voc\xEA abrir aparecem aqui pra acesso r\xE1pido depois.",emptyEndedTitle:"Nenhum destaque encerrado",emptyEndedSub:"Os links que sa\xEDrem do destaque ficam aqui por 30 dias.",browseAll:"Ver todos os links",favoritesFull:e=>`Voc\xEA chegou a ${e} favoritos. Remova um para adicionar outro.`,resultsSummary:(e,t)=>`${e} ${e===1?"resultado":"resultados"} em ${t} ${t===1?"categoria":"categorias"}`,nothingFound:"Nada encontrado",noLinkMatches:e=>`Nenhum link bate com "${e}".`,linkCopiedToast:"Link copiado!",copyFailedToast:"N\xE3o foi poss\xEDvel copiar o link.",favAddedToast:"Adicionado aos favoritos",favRemovedToast:"Removido dos favoritos"},es:{headerTitle:"Central de Enlaces",headerDesc:"Navega por las categor\xEDas o usa la b\xFAsqueda.",searchPlaceholder:"Buscar herramienta o SOP...",home:"Inicio",featured:"Destacados",tabFavorites:"Favoritos",tabRecent:"Recientes",tabEnded:"Salieron de destacados",until:e=>`hasta ${e}`,endedOn:e=>`sali\xF3 el ${e}`,liveNow:"Destacado ahora",liveUntil:e=>`Destacado hasta ${e}`,open:"Abrir",openLink:"Abrir enlace",copyUrl:"Copiar URL",copied:"Copiado",favorite:"A\xF1adir a favoritos",favorited:"Favorito",favoriteAdd:"A\xF1adir a favoritos",favoriteRemove:"Quitar de favoritos",aboutLabel:"Qu\xE9 es",whenLabel:"Cu\xE1ndo usar",emptyFavTitle:"Todav\xEDa no hay favoritos",emptyFavSub:"Haz clic en la estrella de un enlace para fijarlo aqu\xED.",emptyRecentTitle:"Todav\xEDa no hay nada aqu\xED",emptyRecentSub:"Los enlaces que abras aparecen aqu\xED para acceso r\xE1pido despu\xE9s.",emptyEndedTitle:"Ning\xFAn destacado finalizado",emptyEndedSub:"Los enlaces que dejen de estar destacados quedan aqu\xED por 30 d\xEDas.",browseAll:"Ver todos los enlaces",favoritesFull:e=>`Llegaste a ${e} favoritos. Quita uno para a\xF1adir otro.`,resultsSummary:(e,t)=>`${e} ${e===1?"resultado":"resultados"} en ${t} ${t===1?"categor\xEDa":"categor\xEDas"}`,nothingFound:"No se encontr\xF3 nada",noLinkMatches:e=>`Ning\xFAn enlace coincide con "${e}".`,linkCopiedToast:"\xA1Enlace copiado!",copyFailedToast:"No se pudo copiar el enlace.",favAddedToast:"A\xF1adido a favoritos",favRemovedToast:"Quitado de favoritos"},en:{headerTitle:"Links Central",headerDesc:"Browse the categories or use the search.",searchPlaceholder:"Search for a tool or SOP...",home:"Home",featured:"Featured",tabFavorites:"Favorites",tabRecent:"Recent",tabEnded:"No longer featured",until:e=>`until ${e}`,endedOn:e=>`ended ${e}`,liveNow:"Featured now",liveUntil:e=>`Featured until ${e}`,open:"Open",openLink:"Open link",copyUrl:"Copy URL",copied:"Copied",favorite:"Favorite",favorited:"Favorited",favoriteAdd:"Add to favorites",favoriteRemove:"Remove from favorites",aboutLabel:"What it is",whenLabel:"When to use",emptyFavTitle:"No favorites yet",emptyFavSub:"Click the star on a link to pin it here.",emptyRecentTitle:"Nothing here yet",emptyRecentSub:"The links you open show up here for quick access later.",emptyEndedTitle:"No past highlights",emptyEndedSub:"Links that stop being featured stay here for 30 days.",browseAll:"Browse all links",favoritesFull:e=>`You reached ${e} favorites. Remove one to add another.`,resultsSummary:(e,t)=>`${e} ${e===1?"result":"results"} in ${t} ${t===1?"category":"categories"}`,nothingFound:"Nothing found",noLinkMatches:e=>`No link matches "${e}".`,linkCopiedToast:"Link copied!",copyFailedToast:"Could not copy the link.",favAddedToast:"Added to favorites",favRemovedToast:"Removed from favorites"}};function Se(e){let t=se();return ws[t]?.[e]??ws.pt[e]}var rd={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]},feedback:{label:"Feedback",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"}]}},Ee=Ln(null,null,null);function sd(){let e=[];return Object.entries(rd).forEach(([t,a])=>{a.links.forEach(o=>{e.push(Sn({key:t,value:JSON.stringify({name:o.name,url:o.url,desc:o.desc||"",desc_es:nd[o.desc]||"",desc_en:id[o.desc]||""})}))})}),e}function Ln(e,t,a){let o=(Array.isArray(e)?e:[]).map(Sn).filter(l=>l.name&&l.url),i=o.length>0,n=i?o:sd(),r=ls(t),s=se();return{links:n,custom:r,fromCentral:i,byId:new Map(n.map(l=>[pt(l),l])),highlights:kn(a,n,s),rawHighlights:a}}async function ld(e){let t=o=>fe.getCachedContent(o),a=Ln(t("links"),t("link_categories"),t("link_highlights"));a.fromCentral&&(Ee=a,e?.());try{let[o,i,n]=await Promise.allSettled([fe.fetchContentModule("links"),fe.fetchContentModule("link_categories"),fe.fetchContentModule("link_highlights")]),r=l=>l.status==="fulfilled"?l.value:null,s=Ln(r(o)??t("links"),r(i)??t("link_categories"),r(n)??t("link_highlights"));s.fromCentral&&(Ee=s,e?.())}catch(o){console.warn("Central de Conte\xFAdo indispon\xEDvel; usando links embutidos.",o)}}var gt={home:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',starOutline:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>',open:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>',copy:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',check:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',search:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>'},Ne={textPrimary:"#202124",textSecondary:"#5F6368",blue:"#1A73E8",blueText:"#1967D2"};function cd(){if(document.getElementById("cw-links-styles"))return;let e=document.createElement("style");e.id="cw-links-styles",e.textContent=`
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
            cursor: pointer; color: ${Ne.textSecondary};
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
        .cw-links-search-wrap:focus-within { box-shadow: 0 4px 12px rgba(26,115,232,0.15); border-color: ${Ne.blue}; }
        .cw-links-search-icon { margin-left: 16px; display: flex; align-items: center; justify-content: center; pointer-events: none; }
        .cw-links-search-input {
            flex: 1; height: 100%; border: none; background: transparent;
            padding: 0 12px; font-size: 14px; color: ${Ne.textPrimary};
            outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
        }

        .cw-links-body { flex: 1; display: flex; min-height: 0; }
        .cw-links-scroll { flex: 1; min-width: 0; overflow-y: auto; padding: 8px 16px 32px 24px; scrollbar-width: thin; }

        .cw-links-label { margin: 8px 0; font-size: 12px; line-height: 16px; font-weight: 500; color: ${Ne.textSecondary}; }
        .cw-links-cathead { display: flex; align-items: center; gap: 8px; font-size: 12px; line-height: 16px; font-weight: 500; color: ${Ne.textSecondary}; margin: 16px 0 4px; padding-left: 12px; }
        .cw-links-cathead:first-child { margin-top: 0; }
        .cw-links-cat-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--cat-color); flex-shrink: 0; }

        /* --- ELEMENTOS COMUNS --- */
        .cw-links-ico { width: 32px; height: 32px; border-radius: 12px; background: var(--cat-bg); color: var(--cat-color); display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .cw-links-ico svg { width: 20px; height: 20px; }
        .cw-links-ico.lg { width: 40px; height: 40px; }
        .cw-links-ico.lg svg { width: 24px; height: 24px; }
        .cw-links-eyebrow { display: flex; align-items: center; gap: 8px; height: 20px; font-size: 12px; line-height: 16px; color: ${Ne.textSecondary}; }
        .cw-links-eyebrow svg { width: 16px; height: 16px; color: var(--cat-color); flex-shrink: 0; }
        .cw-links-eyebrow b { font-weight: 500; color: ${Ne.textPrimary}; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .cw-links-eyebrow .cw-links-eyebrow-end { margin-left: auto; white-space: nowrap; font-variant-numeric: tabular-nums; }

        /* --- DESTAQUES --- */
        .cw-links-hero {
            display: block; position: relative; border-radius: 20px; padding: 16px 20px;
            background: rgba(255,255,255,0.92); text-decoration: none; color: inherit; cursor: pointer;
            box-shadow: 0 8px 24px rgba(32,33,36,0.10), 0 1px 2px rgba(32,33,36,0.06);
            transition: transform 0.2s var(--cw-ease-elastic, cubic-bezier(.34,1.56,.64,1)), box-shadow 0.2s ease;
        }
        .cw-links-hero:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(32,33,36,0.14), 0 1px 2px rgba(32,33,36,0.06); }
        .cw-links-hero-title { margin: 8px 0 4px; font-size: 18px; line-height: 24px; font-weight: 500; color: ${Ne.textPrimary}; }
        .cw-links-hero-blurb { margin: 0; font-size: 13px; line-height: 20px; color: ${Ne.textSecondary}; }
        .cw-links-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; }
        .cw-links-grid2.single { grid-template-columns: 1fr; }
        .cw-links-mini {
            display: block; border-radius: 16px; padding: 16px; background: rgba(255,255,255,0.92);
            text-decoration: none; color: inherit; cursor: pointer; box-shadow: 0 1px 2px rgba(32,33,36,0.08);
            transition: transform 0.2s var(--cw-ease-elastic, cubic-bezier(.34,1.56,.64,1)), box-shadow 0.2s ease;
        }
        .cw-links-mini:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(32,33,36,0.12); }
        .cw-links-mini-title { margin: 8px 0 0; font-size: 14px; line-height: 20px; font-weight: 500; color: ${Ne.textPrimary}; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .cw-links-mini-until { margin-top: 8px; font-size: 12px; line-height: 16px; color: ${Ne.textSecondary}; font-variant-numeric: tabular-nums; }

        /* --- ABAS (controle segmentado) --- */
        .cw-links-seg { display: flex; background: rgba(60,64,67,0.08); border-radius: 999px; padding: 4px; margin: 24px 0 8px; }
        .cw-links-seg:first-child { margin-top: 0; }
        .cw-links-seg button {
            flex: 1; height: 32px; padding: 0; border: 0; background: transparent; border-radius: 999px;
            font-family: inherit; font-size: 13px; line-height: 20px; font-weight: 500; color: ${Ne.textSecondary}; cursor: pointer;
            transition: background-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
        }
        .cw-links-seg button:hover { color: ${Ne.textPrimary}; }
        .cw-links-seg button[aria-selected="true"] { background: #fff; color: ${Ne.blueText}; box-shadow: 0 1px 3px rgba(32,33,36,0.18); }

        /* --- LINHA --- */
        .cw-links-row {
            display: flex; align-items: center; gap: 8px; height: 56px; padding: 0 8px 0 12px; border-radius: 16px; position: relative;
            transition: background-color 0.15s ease, box-shadow 0.2s ease, transform 0.2s var(--cw-ease-elastic, cubic-bezier(.34,1.56,.64,1));
        }
        .cw-links-row:hover, .cw-links-row:focus-within { background: rgba(255,255,255,0.94); box-shadow: 0 1px 3px rgba(32,33,36,0.12); transform: translateY(-1px); }
        .cw-links-row-link { flex: 1; min-width: 0; height: 100%; display: flex; align-items: center; gap: 16px; text-decoration: none; color: inherit; border-radius: 16px; }
        .cw-links-row-text { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        .cw-links-row-name { font-size: 15px; line-height: 20px; font-weight: 500; color: ${Ne.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-links-row-name mark { background: none; color: ${Ne.blueText}; font-weight: 500; }
        .cw-links-row-desc { font-size: 12px; line-height: 16px; color: ${Ne.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-links-row-meta { font-size: 12px; color: ${Ne.textSecondary}; white-space: nowrap; font-variant-numeric: tabular-nums; }
        .cw-links-row-acts { display: flex; align-items: center; }
        .cw-links-row-acts .hid { opacity: 0; transition: opacity 0.15s ease; }
        .cw-links-row:hover .hid, .cw-links-row:focus-within .hid { opacity: 1; }

        .cw-links-ib {
            width: 32px; height: 32px; padding: 0; border-radius: 50%; border: none; background: transparent; color: ${Ne.textSecondary};
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
        .cw-links-pane-title { margin: 16px 0 4px; font-size: 18px; line-height: 24px; font-weight: 500; color: ${Ne.textPrimary}; }
        .cw-links-pane-sub { display: flex; align-items: center; gap: 8px; font-size: 12px; line-height: 16px; color: ${Ne.textSecondary}; }
        .cw-links-pane-sub .cw-links-cat-dot { width: 8px; height: 8px; }
        .cw-links-pane-live { margin-top: 8px; font-size: 12px; line-height: 16px; color: ${Ne.textSecondary}; font-variant-numeric: tabular-nums; }
        .cw-links-pane-block { margin-top: 16px; }
        .cw-links-pane-block h4 { margin: 0 0 4px; font-size: 12px; line-height: 16px; font-weight: 500; color: ${Ne.textSecondary}; }
        .cw-links-pane-block p { margin: 0; font-size: 14px; line-height: 20px; color: ${Ne.textPrimary}; }
        .cw-links-pane-plain { margin: 16px 0 0; font-size: 14px; line-height: 20px; color: ${Ne.textSecondary}; }
        .cw-links-pane-actions { margin-top: auto; padding-top: 24px; display: flex; flex-direction: column; gap: 8px; }
        .cw-links-pane-actions .row2 { display: flex; gap: 8px; }
        .cw-links-btn {
            height: 40px; padding: 0 24px; border-radius: 999px; background: ${Ne.blue}; color: #fff; font-size: 14px; font-weight: 500;
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

        .cw-links-empty-action { margin: 8px auto 0; display: block; background: none; border: none; color: ${Ne.blueText}; font-family: inherit; font-size: 13px; font-weight: 500; cursor: pointer; padding: 8px 16px; border-radius: 999px; }
        .cw-links-empty-action:hover { background: rgba(26,115,232,0.08); }

        .cw-links-popup :focus-visible { outline: 2px solid ${Ne.blue}; outline-offset: 2px; }
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
    `,document.head.appendChild(e)}var Tn="links_fav",wo="links_recent",Cs="cw_link_history_v4",dd=4e3;function pd(){try{return JSON.parse(localStorage.getItem(Cs)||"[]")}catch{return[]}}function me(e,t,a){let o=document.createElement(e);return t&&(o.className=t),a!=null&&(o.textContent=a),o}function Xt(e,t){let a=me("span",t);return a.setAttribute("aria-hidden","true"),a.innerHTML=e,a}function Ss(e,t,a){let o=me("button",`cw-links-ib ${a||""}`);return o.type="button",o.title=t,o.setAttribute("aria-label",t),o.innerHTML=e,o}function $a(e,t){let a=Cn(t,Ee.custom);e.style.setProperty("--cat-color",a.color),e.style.setProperty("--cat-bg",a.bg)}function As(){navigator.vibrate&&navigator.vibrate(10)}function Es(){let e="v5.0",t="",a="home",o=null,i=null,n=null,r=[],s=[],l=null,p=!1;cd();let d=document.createElement("div");d.id="links-popup",d.classList.add("cw-module-window","cw-links-popup"),Object.assign(d.style,Qe,{right:"100px",width:"860px",height:"650px",maxWidth:"calc(100vw - 192px)",backgroundColor:"rgba(248,249,250,0.88)",overflow:"hidden"});let A={popup:d,googleLine:null},u=He(d,Se("headerTitle"),e,Se("headerDesc"),A,()=>oe());d.appendChild(u);let h=u.querySelector("span"),N=me("div","cw-links-layout");d.appendChild(N);let v=me("nav","cw-links-sidebar");N.appendChild(v);let I=me("div","cw-links-content");N.appendChild(I);let z=me("div","cw-links-search-bar"),U=me("div","cw-links-search-wrap"),B=Xt(gt.search,"cw-links-search-icon"),x=me("input","cw-links-search-input");x.type="text",x.placeholder=Se("searchPlaceholder"),x.setAttribute("aria-label",Se("searchPlaceholder")),U.append(B,x),z.appendChild(U),I.appendChild(z);let K=me("div","cw-links-body"),W=me("div","cw-links-scroll"),X=me("div");X.style.display="contents",K.append(W,X),I.appendChild(K);function O(){let f=Ke.get(Tn,[]),g=Ke.get(wo,[]);r=Array.isArray(f)?f.filter(c=>typeof c=="string"):[],s=Array.isArray(g)?g.filter(c=>c&&typeof c.id=="string"):[]}function k(){let f=JSON.stringify(r);r=gs(r,Ee.links,Ee.fromCentral),JSON.stringify(r)!==f&&Ke.set(Tn,r).catch(()=>{});let g=JSON.stringify(s);if(s=fs(s,Ee.links,Ee.fromCentral),JSON.stringify(s)!==g&&Ke.set(wo,s).catch(()=>{}),!p){p=!0;let c=pd();if(c.length&&!s.length&&(s=bs(c,Ee.links,Date.now()),Ke.set(wo,s).catch(()=>{})),c.length)try{localStorage.removeItem(Cs)}catch{}}}function T(){Ke.set(Tn,r).catch(f=>console.warn("Favoritos n\xE3o sincronizaram",f))}function E(){l&&(clearTimeout(l),l=null,Ke.set(wo,s).catch(f=>console.warn("Recentes n\xE3o sincronizaram",f)))}function R(f){s=ps(s,f,Date.now()),l&&clearTimeout(l),l=setTimeout(E,dd)}window.addEventListener("pagehide",E);function V(f){return r.includes(f)}function ae(f){let g=ds(r,f);if(g.full){y.playError(),te(Se("favoritesFull")(yn),{error:!0});return}r=g.list,T(),y.playClick(),As(),te(Se(g.added?"favAddedToast":"favRemovedToast")),H()}function ie(f,g){navigator.clipboard.writeText(f.url).then(()=>{y.playClick(),As(),g.filter(Boolean).forEach(({node:c,restore:S})=>{c.classList.add("ok"),c.replaceChildren(),c.innerHTML=gt.check,S.label&&c.append(document.createTextNode(S.label)),setTimeout(()=>{c.isConnected&&(c.classList.remove("ok"),c.replaceChildren(),c.innerHTML=S.icon,S.text&&c.append(document.createTextNode(S.text)))},1500)}),R(pt(f)),te(Se("linkCopiedToast"))}).catch(()=>{y.playError(),te(Se("copyFailedToast"),{error:!0})})}function ue(f){return Ee.highlights.active.find(g=>g.linkId===f)||null}function Q(f){let g=se(),c=pt(f),S=me("aside","cw-links-pane");S.setAttribute("aria-live","polite"),$a(S,f.cat),S.appendChild(Xt(ma(f.cat,Ee.custom),"cw-links-ico lg")),S.appendChild(me("h3","cw-links-pane-title",f.name));let _=me("div","cw-links-pane-sub");_.appendChild(me("i","cw-links-cat-dot"));let m="";try{m=new URL(f.url).host}catch{m=f.url}_.appendChild(me("span","",`${za(f.cat,g,Ee.custom)} \xB7 ${m}`)),S.appendChild(_);let b=ue(c);b&&S.appendChild(me("div","cw-links-pane-live",b.endsAt?Se("liveUntil")(vs(b.endsAt,g)):Se("liveNow")));let L=Lt(f,"about",g),w=Lt(f,"when",g);if(L||w){if(L){let ge=me("div","cw-links-pane-block");ge.append(me("h4","",Se("aboutLabel")),me("p","",L)),S.appendChild(ge)}if(w){let ge=me("div","cw-links-pane-block");ge.append(me("h4","",Se("whenLabel")),me("p","",w)),S.appendChild(ge)}}else{let ge=Lt(f,"desc",g);ge&&S.appendChild(me("p","cw-links-pane-plain",ge))}let P=me("div","cw-links-pane-actions"),F=me("a","cw-links-btn");F.href=f.url,F.target="_blank",F.rel="noopener noreferrer",F.dataset.openId=c,F.append(Xt(gt.open),document.createTextNode(Se("openLink"))),P.appendChild(F);let Y=me("div","row2"),le=me("button","cw-links-ghost");le.type="button",le.innerHTML=gt.copy,le.append(document.createTextNode(Se("copyUrl"))),le.addEventListener("click",()=>ie(f,[{node:le,restore:{icon:gt.copy,text:Se("copyUrl"),label:Se("copied")}}]));let xe=V(c),Ae=me("button",`cw-links-ghost ${xe?"on":""}`);return Ae.type="button",Ae.setAttribute("aria-pressed",String(xe)),Ae.innerHTML=xe?gt.star:gt.starOutline,Ae.append(document.createTextNode(Se(xe?"favorited":"favorite"))),Ae.addEventListener("click",()=>ae(c)),Y.append(le,Ae),P.appendChild(Y),S.appendChild(P),S}function ce(f){let g=Ee.byId.get(n);if(X.replaceChildren(),!g)return;let c=Q(g);f&&c.classList.add("swap"),X.appendChild(c)}function ne(f){!f||f===n||!Ee.byId.has(f)||(n=f,ce(!0))}function pe(f){if(f.includes(n))return n;let g=[Ee.highlights.active[0]?.linkId,r.find(S=>Ee.byId.has(S)),s.find(S=>Ee.byId.has(S.id))?.id].filter(Boolean);return(a==="home"?g[0]:null)||f[0]||g[0]||pt(Ee.links[0]||{url:""})}function j(f,g){f.addEventListener("click",()=>R(g)),f.addEventListener("auxclick",c=>{c.button===1&&R(g)})}function re(f){let g=se(),c=me("a","cw-links-hero");c.href=f.link.url,c.target="_blank",c.rel="noopener noreferrer",c.dataset.linkId=f.linkId,$a(c,f.link.cat);let S=me("div","cw-links-eyebrow");return S.append(Xt(ma(f.link.cat,Ee.custom)),me("b","",f.link.name)),f.endsAt&&S.append(me("span","cw-links-eyebrow-end",Se("until")(yo(f.endsAt,g)))),c.append(S,me("h2","cw-links-hero-title",f.headline)),f.blurb&&c.append(me("p","cw-links-hero-blurb",f.blurb)),j(c,f.linkId),c}function de(f){let g=se(),c=me("a","cw-links-mini");c.href=f.link.url,c.target="_blank",c.rel="noopener noreferrer",c.dataset.linkId=f.linkId,$a(c,f.link.cat);let S=me("div","cw-links-eyebrow");return S.append(Xt(ma(f.link.cat,Ee.custom)),me("b","",f.link.name)),c.append(S,me("div","cw-links-mini-title",f.headline)),f.endsAt&&c.append(me("div","cw-links-mini-until",Se("until")(yo(f.endsAt,g)))),j(c,f.linkId),c}function Z(f,g,c){let S=se(),_=pt(f),m=me("div","cw-links-row");m.dataset.linkId=_,$a(m,f.cat);let b=me("a","cw-links-row-link");b.href=f.url,b.target="_blank",b.rel="noopener noreferrer";let L=me("div","cw-links-row-text"),w=me("div","cw-links-row-name");q(w,f.name,c),L.append(w,me("div","cw-links-row-desc",Lt(f,"desc",S))),b.append(Xt(ma(f.cat,Ee.custom),"cw-links-ico"),L),g&&b.append(me("span","cw-links-row-meta",g)),j(b,_);let P=me("div","cw-links-row-acts"),F=V(_),Y=Ss(F?gt.star:gt.starOutline,Se(F?"favoriteRemove":"favoriteAdd"),`star ${F?"on":"hid"}`);Y.setAttribute("aria-pressed",String(F)),Y.addEventListener("click",()=>ae(_));let le=Ss(gt.copy,Se("copyUrl"),"hid");return le.addEventListener("click",()=>ie(f,[{node:le,restore:{icon:gt.copy}}])),P.append(Y,le),m.append(b,P),m}function q(f,g,c){let S=(c||"").trim();if(!S){f.textContent=g;return}let _=L=>L.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),m=_(g);if(m.length!==g.length){f.textContent=g;return}let b=m.indexOf(_(S));if(b===-1){f.textContent=g;return}f.append(document.createTextNode(g.slice(0,b)),Object.assign(me("mark"),{textContent:g.slice(b,b+S.length)}),document.createTextNode(g.slice(b+S.length)))}function C(){v.replaceChildren();let f=(_,m,b,L,w)=>{let P=me("button",`cw-links-nav-btn ${L?"active":""}`);return P.type="button",P.title=m,P.setAttribute("aria-label",m),L&&P.setAttribute("aria-current","page"),P.dataset.key=_,P.style.setProperty("--cat-color",w.color),P.style.setProperty("--cat-bg",w.bg),P.append(Xt(b,"cw-links-nav-icon"),me("span","cw-links-nav-label",m)),P},g=se(),c=a==="home"&&!t.trim(),S=f("home",Se("home"),gt.home,c,{color:Ne.blue,bg:"#E8F0FE"});S.id="cw-sidebar-btn-home",S.addEventListener("click",()=>{y.playClick(),$(),a="home",H()}),v.appendChild(S),v.appendChild(me("div","cw-links-nav-sep")),En(Ee.links,Ee.custom).forEach(_=>{let m=Cn(_,Ee.custom),b=a==="library"&&!t.trim()&&i===_,L=f(_,za(_,g,Ee.custom),ma(_,Ee.custom),b,m);L.id=`cw-sidebar-btn-${_}`,L.addEventListener("click",()=>{y.playClick(),$(),a="library",i=_,H();let w=document.getElementById(`cat-anchor-${_}`);w&&w.scrollIntoView({behavior:"smooth",block:"start"})}),v.appendChild(L)}),v.querySelector(".cw-links-nav-btn.active")?.scrollIntoView?.({block:"nearest"})}function $(){t="",x.value=""}function J(){let f=se(),{active:g,ended:c}=Ee.highlights,S=[];if(g.length){W.append(me("div","cw-links-label",Se("featured"))),W.append(re(g[0])),S.push(g[0].linkId);let F=g.slice(1);if(F.length){let Y=me("div",`cw-links-grid2 ${F.length===1?"single":""}`);F.forEach(le=>{Y.append(de(le)),S.push(le.linkId)}),W.append(Y)}}let m={fav:(F=>F.map(Y=>Ee.byId.get(Y)).filter(Boolean))(r).map(F=>({link:F,meta:""})),rec:s.map(F=>({link:Ee.byId.get(F.id),meta:ys(F.t,Date.now(),f)})).filter(F=>F.link),ex:c.map(F=>({link:F.link,meta:Se("endedOn")(yo(F.endsAt,f))}))},b=[["fav","tabFavorites"],["rec","tabRecent"],["ex","tabEnded"]],L=o||(b.find(([F])=>m[F].length)||b[0])[0],w=me("div","cw-links-seg");w.setAttribute("role","tablist"),b.forEach(([F,Y])=>{let le=me("button","",Se(Y));le.type="button",le.setAttribute("role","tab"),le.setAttribute("aria-selected",String(F===L)),le.addEventListener("click",()=>{o=F,H()}),w.append(le)}),W.append(w);let P=m[L];if(P.length)P.forEach(({link:F,meta:Y})=>{W.append(Z(F,Y)),S.push(pt(F))});else{let F={fav:["emptyFavTitle","emptyFavSub"],rec:["emptyRecentTitle","emptyRecentSub"],ex:["emptyEndedTitle","emptyEndedSub"]}[L];W.append(va({icon:gt.starOutline,title:Se(F[0]),subtitle:Se(F[1])}));let Y=me("button","cw-links-empty-action",Se("browseAll"));Y.type="button",Y.addEventListener("click",()=>{a="library",i=null,H()}),W.append(Y)}return S}function D(){let f=se(),g=t.trim(),c=[],S=g?Ee.links.filter(m=>hs(m,g,f,Ee.custom)):Ee.links;if(g&&!S.length)return W.append(va({icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',title:Se("nothingFound"),subtitle:Se("noLinkMatches")(g)})),c;let _=cs(S,Ee.custom);return g&&W.append(me("div","cw-links-label",Se("resultsSummary")(S.length,_.size))),_.forEach((m,b)=>{let L=me("div","cw-links-cathead");L.id=`cat-anchor-${b}`,$a(L,b),L.append(me("i","cw-links-cat-dot"),document.createTextNode(za(b,f,Ee.custom))),W.append(L),m.forEach(w=>{W.append(Z(w,"",g)),c.push(pt(w))})}),c}function H(){let f=W.scrollTop;W.replaceChildren();let g=t.trim()||a==="library"?D():J();C(),n=!g.length&&(t.trim()||a==="library")?null:pe(g),ce(!1),W.scrollTop=f}W.addEventListener("mouseover",f=>{let g=f.target.closest?.("[data-link-id]");g&&ne(g.dataset.linkId)}),W.addEventListener("focusin",f=>{let g=f.target.closest?.("[data-link-id]");g&&ne(g.dataset.linkId)}),X.addEventListener("click",f=>{let g=f.target.closest?.("a[data-open-id]");g&&R(g.dataset.openId)}),X.addEventListener("auxclick",f=>{let g=f.target.closest?.("a[data-open-id]");g&&f.button===1&&R(g.dataset.openId)}),x.addEventListener("input",f=>{t=f.target.value,H()});function oe(){let f=!Ze(d);f?(O(),H(),De()):(E(),Me()),Ve(f,d,"cw-btn-links")}return document.body.appendChild(d),O(),H(),ld(()=>{k(),H()}),Ke.sync().then(()=>{O(),k(),H()}).catch(()=>{}),Le(()=>{Ee={...Ee,highlights:kn(Ee.rawHighlights,Ee.links,se())},h&&(h.textContent=Se("headerTitle"));let f=d.querySelector(".cw-help-title");f&&(f.textContent=Se("headerTitle"));let g=d.querySelector(".cw-help-description");g&&(g.textContent=Se("headerDesc")),x.placeholder=Se("searchPlaceholder"),x.setAttribute("aria-label",Se("searchPlaceholder")),H()}),oe}var ud=60*1e3,Os="cw_read_broadcasts",ks={pt:{headerTitle:"Central de Avisos",headerDesc:"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",searchPlaceholder:"Buscar avisos\u2026",clearSearch:"Limpar a busca",markRead:e=>`Marcar \u201C${e}\u201D como lido`,markReadShort:"Marcar como lido",publishedBy:e=>`Publicado por ${e}`,system:"Sistema",bauAvailability:"Disponibilidade BAU",attention:"aten\xE7\xE3o",full:"total",noDates:"sem datas publicadas",asideLabel:"Estado da opera\xE7\xE3o",filtersTitle:"Filtrar por tipo",filterAll:"Todos",readTitle:"Leitura",readCount:e=>e===1?"1 lido":`${e} lidos`,markAllRead:"Marcar tudo como lido",updatedAgo:e=>`Atualizado ${e}`,swapTo:e=>`Ver disponibilidade de ${e}`,justNow:"agora",minutesAgo:e=>`h\xE1 ${e} min`,hoursAgo:e=>`h\xE1 ${e} h`,yesterday:"ontem",nothingFound:"Nada encontrado.",allRead:"Tudo lido!",history:e=>`Hist\xF3rico (${e})`,typeLabel:{info:"Info",critical:"Alerta",success:"Sucesso"},syncing:"Sincronizando\u2026",updated:"Atualizado",offline:"Sem conex\xE3o \u2014 mostrando o que j\xE1 estava aqui"},es:{headerTitle:"Central de Avisos",headerDesc:"Comunicaci\xF3n oficial de la operaci\xF3n.",searchPlaceholder:"Buscar avisos\u2026",clearSearch:"Limpiar la b\xFAsqueda",markRead:e=>`Marcar \u201C${e}\u201D como le\xEDdo`,markReadShort:"Marcar como le\xEDdo",publishedBy:e=>`Publicado por ${e}`,system:"Sistema",bauAvailability:"Disponibilidad BAU",attention:"atenci\xF3n",full:"total",noDates:"sin fechas publicadas",asideLabel:"Estado de la operaci\xF3n",filtersTitle:"Filtrar por tipo",filterAll:"Todos",readTitle:"Lectura",readCount:e=>e===1?"1 le\xEDdo":`${e} le\xEDdos`,markAllRead:"Marcar todo como le\xEDdo",updatedAgo:e=>`Actualizado ${e}`,swapTo:e=>`Ver disponibilidad de ${e}`,justNow:"ahora",minutesAgo:e=>`hace ${e} min`,hoursAgo:e=>`hace ${e} h`,yesterday:"ayer",nothingFound:"No se encontr\xF3 nada.",allRead:"\xA1Todo le\xEDdo!",history:e=>`Historial (${e})`,typeLabel:{info:"Info",critical:"Alerta",success:"\xC9xito"},syncing:"Sincronizando\u2026",updated:"Actualizado",offline:"Sin conexi\xF3n \u2014 mostrando lo que ya estaba aqu\xED"},en:{headerTitle:"Broadcast Central",headerDesc:"Official communication from the operation.",searchPlaceholder:"Search broadcasts\u2026",clearSearch:"Clear the search",markRead:e=>`Mark \u201C${e}\u201D as read`,markReadShort:"Mark as read",publishedBy:e=>`Published by ${e}`,system:"System",bauAvailability:"BAU Availability",attention:"caution",full:"full",noDates:"no dates published",asideLabel:"Operation status",filtersTitle:"Filter by type",filterAll:"All",readTitle:"Read",readCount:e=>e===1?"1 read":`${e} read`,markAllRead:"Mark all as read",updatedAgo:e=>`Updated ${e}`,swapTo:e=>`View ${e} availability`,justNow:"just now",minutesAgo:e=>`${e} min ago`,hoursAgo:e=>`${e} h ago`,yesterday:"yesterday",nothingFound:"Nothing found.",allRead:"All read!",history:e=>`History (${e})`,typeLabel:{info:"Info",critical:"Alert",success:"Success"},syncing:"Syncing\u2026",updated:"Updated",offline:"No connection \u2014 showing what was already here"}};function ye(e){let t=se();return ks[t]?.[e]??ks.pt[e]}var So={PT:{label:"PT-BR",flag:'<svg class="cw-bc-bau-flag" viewBox="0 0 21 15" aria-hidden="true"><rect width="21" height="15" fill="#009B3A"/><path d="M10.5 1.9 19.1 7.5 10.5 13.1 1.9 7.5Z" fill="#FEDF00"/><circle cx="10.5" cy="7.5" r="3.3" fill="#002776"/></svg>'},ES:{label:"ES",flag:'<svg class="cw-bc-bau-flag" viewBox="0 0 21 15" aria-hidden="true"><rect width="21" height="15" fill="#AA151B"/><rect y="3.75" width="21" height="7.5" fill="#F1BF00"/></svg>'},EN:{label:"EN",flag:'<svg class="cw-bc-bau-flag" viewBox="0 0 21 15" aria-hidden="true"><rect width="21" height="15" fill="#012169"/><path d="M0 0l21 15M21 0L0 15" stroke="#FFF" stroke-width="3"/><path d="M0 0l21 15M21 0L0 15" stroke="#C8102E" stroke-width="2"/><path d="M10.5 0v15M0 7.5h21" stroke="#FFF" stroke-width="5"/><path d="M10.5 0v15M0 7.5h21" stroke="#C8102E" stroke-width="3"/></svg>'}},md='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="17 2 21 6 17 10"></polyline><path d="M3 12V10a4 4 0 0 1 4-4h14"></path><polyline points="7 22 3 18 7 14"></polyline><path d="M21 12v2a4 4 0 0 1-4 4H3"></path></svg>',In={critical:!0,info:!0,success:!0};function gd(){if(document.getElementById("cw-broadcast-styles"))return;let e=document.createElement("style");e.id="cw-broadcast-styles",e.textContent=`
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
    `,document.head.appendChild(e)}var fd={pt:"pt-BR",es:"es-ES",en:"en-US"};function Ds(e){if(!e)return"";try{let t=new Date(e);return isNaN(t.getTime())?String(e):new Intl.DateTimeFormat(fd[se()]||"pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(t)}catch{return String(e)}}function bd(e){let t=String(e||"").split("-");return t.length===3?`${t[2]}/${t[1]}`:String(e||"")}function hd(e){let t=new Date(e).getTime();if(!t||isNaN(t))return"";let a=Math.floor((Date.now()-t)/6e4);if(a<1)return ye("justNow");if(a<60)return ye("minutesAgo")(a);let o=Math.floor(a/60);return o<24?ye("hoursAgo")(o):o<48?ye("yesterday"):Ds(e).split(",")[0]}function Ts(e){if(!e||typeof e!="string")return"";let t=e;return t=t.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" class="cw-bc-link">$1</a>'),t=t.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),t=t.replace(/_(.*?)_/g,"<i>$1</i>"),t=t.replace(/\n/g,"<br>"),t=Ci(t),t}function Ls(e){if(!e)return null;let t={};try{t=JSON.parse(e.value||"{}")}catch{return null}let a=String(t.title||e.label||"").trim(),o=String(t.text||"").trim();return!a||!o?null:{id:String(e.key||e.id||""),type:In[t.type]?t.type:"info",title:a,text:o,date:String(t.publishedAt||e.publishedAt||""),author:String(t.author||e.publishedBy||""),lang:String(e.lang||"ALL").toUpperCase()}}function xd(e){if(!e)return null;let t=String(e.title||"").trim(),a=String(e.text||"").trim();return!t||!a||t.toLowerCase().includes("disponibilidade bau")?null:{id:String(e.id||""),type:In[e.type]?e.type:"info",title:t,text:a,date:String(e.date||""),author:String(e.author||""),lang:"ALL"}}function Is(e){let t=(e||[])[0];if(!t)return null;let a={};try{a=JSON.parse(t.value||"{}")}catch{return null}let o=a.segments||{},i={};return Object.keys(o).forEach(n=>{let r=String(o[n]?.attention||""),s=String(o[n]?.full||"");(r||s)&&(i[n]={attention:r,full:s})}),Object.keys(i).length?{updatedAt:String(a.updatedAt||t.publishedAt||""),author:String(a.author||t.publishedBy||""),note:String(a.note||""),segments:i}:null}function Ns(e,t){return e.lang==="ALL"||e.lang===t}function ga(){try{let e=JSON.parse(localStorage.getItem(Os)||"[]");return Array.isArray(e)?e:[]}catch{return[]}}function _s(e){try{localStorage.setItem(Os,JSON.stringify(e))}catch{}}function Ms(){let e="v5.0",t=!1,a=null,o="",i=null,n=null,r=!1,s=[],l=null,p=null,d=null,A=null;gd();let u=document.createElement("div");u.id="broadcast-popup",u.classList.add("cw-module-window"),Object.assign(u.style,Qe,{right:"auto",left:"50%",width:"760px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",overflow:"hidden"});let h={popup:u,googleLine:null};function N(){if(t=!Ze(u),Ve(t,u,"cw-btn-broadcast"),t){De();let D=document.getElementById("cw-btn-broadcast");D&&D.classList.remove("has-new"),i=null,n=null,r=!1,ae()}else Me()}let v=He(u,ye("headerTitle"),e,ye("headerDesc"),h,()=>N()),I=v.querySelector("span");u.appendChild(v);let z=document.createElement("div");z.className="cw-bc-search-wrap";let U=document.createElement("div");U.className="cw-bc-search-icon",U.setAttribute("aria-hidden","true"),U.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';let B=document.createElement("input");B.className="cw-bc-search-input no-drag",B.type="search",B.name="cw-broadcast-search",B.autocomplete="off",B.spellcheck=!1,B.placeholder=ye("searchPlaceholder"),B.setAttribute("aria-label",ye("searchPlaceholder"));let x=document.createElement("button");x.type="button",x.className="cw-bc-search-clear",x.setAttribute("aria-label",ye("clearSearch")),x.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';let K=document.createElement("div");K.className="cw-bc-search-field",K.append(U,B,x),z.appendChild(K),u.appendChild(z),B.addEventListener("input",D=>{o=D.target.value,x.classList.toggle("visible",o.length>0),q()}),x.onclick=()=>{B.value="",o="",x.classList.remove("visible"),q(),B.focus()};let W=document.createElement("div");W.className="cw-bc-body",u.appendChild(W);let X=document.createElement("div");X.className="cw-nice-scroll cw-bc-feed",X.setAttribute("role","feed"),X.setAttribute("aria-label",ye("headerTitle")),W.appendChild(X);let O=document.createElement("aside");O.className="cw-nice-scroll cw-bc-aside",O.setAttribute("aria-label",ye("asideLabel")),W.appendChild(O);let k=document.createElement("div");k.id="cw-bau-widget",k.className="cw-bc-panel",k.style.display="none",O.appendChild(k);let T=document.createElement("div");T.className="cw-bc-panel",O.appendChild(T);let E=document.createElement("div");E.className="cw-bc-panel",O.appendChild(E);let R=document.createElement("div");R.id="cw-update-status",R.className="cw-bc-sync",R.setAttribute("role","status"),R.setAttribute("aria-live","polite"),O.appendChild(R);function V({syncing:D=!1,online:H=!0}={}){if(R.classList.toggle("offline",!D&&!H),D){R.innerHTML=`<span class="cw-bc-spinner" aria-hidden="true"></span><span>${ye("syncing")}</span>`;return}let oe=A?hd(A):"",f=H?oe?ye("updatedAgo")(oe):ye("updated"):ye("offline");R.innerHTML=`<span class="cw-bc-sync-dot" aria-hidden="true"></span><span>${f}</span>`}async function ae(){V({syncing:!0});let D=!0,H=ka();try{let[oe,f]=await Promise.all([fe.fetchContentModule("broadcast"),fe.fetchContentModule("bau_availability")]);if(Array.isArray(oe)){let g=oe.map(Ls).filter(Boolean).filter(c=>Ns(c,H));s=ue(g)}else D=!1;l=Is(f)}catch{D=!1}D&&(A=new Date().toISOString()),ie(),Q(),q(),V({online:D})}function ie(){let D=l?l.updatedAt:null;if(!(p===null)&&!t){let oe=ga();(s.some(c=>!p.has(c.id)&&!oe.includes(c.id))||D&&D!==d)&&y.playNotification()}p=new Set(s.map(oe=>oe.id)),d=D}function ue(D){return D.slice().sort((H,oe)=>{let f=new Date(H.date).getTime()||0;return(new Date(oe.date).getTime()||0)-f})}function Q(){let D=document.getElementById("cw-btn-broadcast");if(!D)return;let H=ga();if(s.some(f=>!H.includes(f.id))){if(D.classList.add("has-new"),!D.querySelector(".cw-badge")){let f=document.createElement("div");f.className="cw-badge",Object.assign(f.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),D.appendChild(f)}}else{D.classList.remove("has-new");let f=D.querySelector(".cw-badge");f&&f.remove()}}function ce(){if(!l){k.style.display="none",k.innerHTML="";return}let D=Object.keys(So).filter(b=>l.segments[b]);if(!D.length){k.style.display="none",k.innerHTML="";return}let H=i&&D.includes(i)?i:D.includes(ka())?ka():D[0],oe=So[H],f=l.segments[H]||{},g=(b,L)=>`
          <span class="cw-bc-bau-date ${b}">
              <span class="cw-bc-bau-dot"></span>
              <span class="cw-bc-bau-kind">${ye(b)}</span>
              <span class="cw-bc-bau-value">${bd(L)}</span>
          </span>`,c=[f.attention?g("attention",f.attention):"",f.full?g("full",f.full):""].join(""),S=D[(D.indexOf(H)+1)%D.length],_=S&&S!==H?`<button class="cw-bc-bau-swap" type="button"
                     aria-label="${ye("swapTo")(So[S].label)}"
                     title="${ye("swapTo")(So[S].label)}">${md}</button>`:"";k.style.display="flex",k.innerHTML=`
          <div class="cw-bc-bau-top">
              ${oe.flag}
              <span class="cw-bc-bau-label">${ye("bauAvailability")}</span>
              <span class="cw-bc-bau-seg">${oe.label}</span>
              ${_}
          </div>
          <div class="cw-bc-bau-dates">
              ${c||`<span class="cw-bc-bau-empty">${ye("noDates")}</span>`}
          </div>
          ${l.note?`<div class="cw-bc-bau-note">${Ts(l.note)}</div>`:""}
      `;let m=k.querySelector(".cw-bc-bau-swap");m&&(m.onclick=()=>{i=S,y.playClick(),ce()})}function ne(){let D={critical:0,info:0,success:0};s.forEach(f=>{D[f.type]=(D[f.type]||0)+1});let H=(f,g,c)=>`
          <button class="cw-bc-filter" type="button" data-tipo="${f}"
                  aria-pressed="${n===f}">
              ${f==="all"?"":`<span class="cw-bc-type-dot ${f}"></span>`}
              <span>${g}</span>
              <span class="cw-bc-filter-count">${c}</span>
          </button>`;T.innerHTML=`
          <div class="cw-bc-panel-title">${ye("filtersTitle")}</div>
          <div class="cw-bc-filters">
              ${H("all",ye("filterAll"),s.length)}
              ${Object.keys(D).map(f=>H(f,ye("typeLabel")[f],D[f])).join("")}
          </div>
      `,T.querySelectorAll(".cw-bc-filter").forEach(f=>{f.onclick=()=>{let g=f.dataset.tipo;n=g==="all"||g===n?null:g,y.playClick(),q()}});let oe=T.querySelector('[data-tipo="all"]');oe&&oe.setAttribute("aria-pressed",String(n===null))}function pe(){let D=ga(),H=s.filter(f=>D.includes(f.id)).length,oe=s.length-H;E.innerHTML=`
          <div class="cw-bc-panel-title">${ye("readTitle")}</div>
          <button class="cw-bc-history-divider" type="button"
                  aria-expanded="${r}" aria-controls="cw-bc-history">
              <span>${ye("readCount")(H)}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <button class="cw-bc-clear-btn" type="button" ${oe?"":"disabled"}>
              ${ye("markAllRead")}
          </button>
      `,E.querySelector(".cw-bc-history-divider").onclick=()=>{y.playClick(),r=!r,q()},E.querySelector(".cw-bc-clear-btn").onclick=()=>{oe&&(y.playSuccess(),_s(s.map(f=>f.id)),q(),Q())}}let j=0;function re(D,H){let oe=document.createElement("article");oe.className="cw-bc-card"+(H?" history":"");let f=In[D.type]?D.type:"info",g=`cw-bc-title-${++j}`;oe.setAttribute("aria-labelledby",g);let c=document.createElement("div");if(c.className="cw-bc-card-meta",c.innerHTML=`
        <span class="cw-bc-type">
            <span class="cw-bc-type-dot ${f}"></span>${ye("typeLabel")[f]}
        </span>
        <span class="cw-bc-meta-sep" aria-hidden="true">\xB7</span>
        <span class="cw-bc-date-tag">${Ds(D.date)}</span>
    `,!H){let b=document.createElement("button");b.type="button",b.className="cw-bc-dismiss-btn",b.setAttribute("aria-label",ye("markRead")(D.title)),b.title=ye("markReadShort"),b.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>',b.onclick=L=>{L.stopPropagation(),y.playClick(),oe.style.transform="translateX(20px)",oe.style.opacity="0",setTimeout(()=>{let w=ga();w.push(D.id),_s(w),q(),Q()},300)},c.appendChild(b)}let S=document.createElement("h3");S.className="cw-bc-msg-title",S.id=g,S.textContent=D.title;let _=document.createElement("div");_.className="cw-bc-msg-body",_.innerHTML=Ts(D.text);let m=document.createElement("div");return m.className="cw-bc-msg-author",m.textContent=ye("publishedBy")(D.author||ye("system")),oe.append(c,S,_,m),oe}function de(D,H){return n&&D.type!==n?!1:H?`${D.title||""} ${D.text||""}`.toLowerCase().includes(H):!0}function Z(D,H){let oe=D.filter(g=>!H.includes(g.id)),f=D.filter(g=>H.includes(g.id));if(!oe.length&&!(r&&f.length)){let g=o.trim().length>0||n!==null,c=document.createElement("div");c.className="cw-bc-empty",c.innerHTML=g?`<div>${ye("nothingFound")}</div>`:`
               <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
               <div>${ye("allRead")}</div>
              `,X.appendChild(c);return}if(oe.forEach(g=>X.appendChild(re(g,!1))),r&&f.length){let g=document.createElement("div");g.className="cw-bc-history-container",g.id="cw-bc-history",g.style.display="flex",f.forEach(c=>g.appendChild(re(c,!0))),X.appendChild(g)}}function q(){ce(),ne(),pe(),X.innerHTML="";let D=ga(),H=o.trim().toLowerCase();Z(s.filter(oe=>de(oe,H)),D)}let C=fe.getCachedContent("broadcast");Array.isArray(C)&&C.length?s=ue(C.map(Ls).filter(Boolean).filter(D=>Ns(D,ka()))):s=ue(fe.getCachedBroadcasts().map(xd).filter(Boolean)),l=Is(fe.getCachedContent("bau_availability")),q(),ae(),a||(a=setInterval(ae,ud));let $=document.createElement("div");Object.assign($.style,kt),$.className="no-drag",u.appendChild($),Tt(u,$),document.body.appendChild(u);let J=s.some(D=>!ga().includes(D.id));return Le(()=>{I&&(I.textContent=ye("headerTitle"));let D=u.querySelector(".cw-help-title");D&&(D.textContent=ye("headerTitle"));let H=u.querySelector(".cw-help-description");H&&(H.textContent=ye("headerDesc")),B.placeholder=ye("searchPlaceholder"),B.setAttribute("aria-label",ye("searchPlaceholder")),x.setAttribute("aria-label",ye("clearSearch")),X.setAttribute("aria-label",ye("headerTitle")),O.setAttribute("aria-label",ye("asideLabel")),q(),V({online:!0})}),{toggle:N,hasUnread:J}}var qs="cw-wizard-shell-styles",Fs={pt:{back:"Voltar",skip:"Pular",next:"Pr\xF3ximo",done:"Concluir",dotsGroup:"Navega\xE7\xE3o entre os slides",report:"Reportar bug ou sugest\xE3o",createdBy:"criado por",slideLabel:(e,t)=>`Slide ${e} de ${t}`,announce:(e,t,a,o)=>`Slide ${e} de ${t}: ${a}. ${o}`},es:{back:"Volver",skip:"Omitir",next:"Siguiente",done:"Finalizar",dotsGroup:"Navegaci\xF3n entre las diapositivas",report:"Reportar error o sugerencia",createdBy:"creado por",slideLabel:(e,t)=>`Diapositiva ${e} de ${t}`,announce:(e,t,a,o)=>`Diapositiva ${e} de ${t}: ${a}. ${o}`},en:{back:"Back",skip:"Skip",next:"Next",done:"Finish",dotsGroup:"Slide navigation",report:"Report a bug or suggestion",createdBy:"created by",slideLabel:(e,t)=>`Slide ${e} of ${t}`,announce:(e,t,a,o)=>`Slide ${e} of ${t}: ${a}. ${o}`}};function Ot(e){let t=se();return Fs[t]?.[e]??Fs.pt[e]}var Rs=160,Nn=320,vd=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function yd(){if(document.getElementById(qs))return;let e=document.createElement("style");e.id=qs,e.textContent=`
        .cw-wiz-overlay {
            --cw-wiz-swap: ${Rs}ms;
            --cw-wiz-shell: ${Nn}ms;

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
    `,document.head.appendChild(e)}var wd='button:not([hidden]):not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';function Ao({slides:e,idPrefix:t,badge:a=null,nextLabel:o=null,finalLabel:i=null,skipLabel:n=null,onSkip:r=null,onClose:s=()=>{}}){let l={next:o||Ot("next"),final:i||Ot("done"),skip:n};if(!Array.isArray(e)||e.length===0)return console.warn("[wizard-shell] chamado sem slides; nada a mostrar."),{close:()=>{}};yd();let p=`${t}-title`,d=`${t}-text`,A=document.activeElement,u=0,h=!1,N=null,v=document.createElement("div");v.className="cw-wiz-overlay",v.setAttribute("role","dialog"),v.setAttribute("aria-modal","true"),v.setAttribute("aria-labelledby",p),v.setAttribute("aria-describedby",d);let I=document.createElement("div");if(I.className="cw-wiz-card",a){let j=document.createElement("div");j.className="cw-wiz-badge",j.textContent=a,I.appendChild(j)}let z=document.createElement("div");z.className="cw-wiz-stage";let U=document.createElement("div");U.className="cw-wiz-icon",U.setAttribute("aria-hidden","true");let B=document.createElement("div");B.className="cw-wiz-title",B.id=p;let x=document.createElement("div");x.className="cw-wiz-text",x.id=d,z.appendChild(U),z.appendChild(B),z.appendChild(x);let K=document.createElement("div");K.className="cw-wiz-live",K.setAttribute("aria-live","polite"),K.setAttribute("aria-atomic","true");let W=document.createElement("div");W.className="cw-wiz-dots",W.setAttribute("role","group"),W.setAttribute("aria-label",Ot("dotsGroup"));let X=document.createElement("div");X.className="cw-wiz-actions";let O=document.createElement("button");O.type="button",O.className="cw-wiz-btn cw-wiz-btn-ghost",O.textContent=Ot("back");let k=document.createElement("button");k.type="button",k.className="cw-wiz-skip",k.textContent=n||Ot("skip"),n||(k.hidden=!0);let T=document.createElement("button");T.type="button",T.className="cw-wiz-btn cw-wiz-btn-primary",X.appendChild(O),X.appendChild(T),n&&(I.classList.add("has-skip"),I.appendChild(k)),I.appendChild(z),I.appendChild(K),I.appendChild(W),I.appendChild(X);let E=document.createElement("div");E.className="cw-wiz-footer";let R=document.createElement("a");R.href=oa,R.target="_blank",R.rel="noopener noreferrer",R.textContent=Ot("report");let V=document.createElement("span");V.textContent="\xB7",V.style.opacity="0.5",V.setAttribute("aria-hidden","true");let ae=document.createElement("span");ae.append(`${Ot("createdBy")} `);let ie=document.createElement("span");ie.className="cw-wiz-credit-name",ie.textContent=Et,ae.appendChild(ie),E.append(R,V,ae),I.appendChild(E),v.appendChild(I);let ue=e.map((j,re)=>{let de=document.createElement("button");return de.type="button",de.className="cw-wiz-dot",de.setAttribute("aria-label",Ot("slideLabel")(re+1,e.length)),de.onmouseenter=()=>y.playHover(),de.onclick=()=>{re!==u&&(y.playClick(),ce(re))},W.appendChild(de),de});function Q(j){let re=e[j];U.textContent=re.icon||"",B.textContent=re.title||"",x.textContent=re.text||"",ue.forEach((Z,q)=>{Z.classList.toggle("active",q===j),Z.setAttribute("aria-current",q===j?"true":"false")});let de=j===e.length-1;T.textContent=de?l.final:l.next,O.hidden=j===0,k.hidden=!n||de,K.textContent=Ot("announce")(j+1,e.length,re.title,re.text)}function ce(j){if(h||j===u||j<0||j>=e.length)return;let re=j>u?"swapping-next":"swapping-prev";if(u=j,vd()){Q(j);return}clearTimeout(N),z.classList.add(re),N=setTimeout(()=>{Q(j),z.classList.remove("swapping-next","swapping-prev")},Rs)}function ne({silent:j=!1}={}){h||(h=!0,clearTimeout(N),document.removeEventListener("keydown",pe,!0),v.classList.add("closing"),v.classList.remove("open"),I.style.willChange="opacity, transform",j||y.playSuccess(),setTimeout(()=>{if(v.remove(),Me(),A&&document.contains(A))try{A.focus({preventScroll:!0})}catch{}s()},Nn))}function pe(j){if(!h){if(j.key==="Tab"){let re=Array.from(I.querySelectorAll(wd)).filter(q=>!q.hidden&&q.offsetParent!==null);if(re.length===0)return;let de=re[0],Z=re[re.length-1];j.shiftKey&&document.activeElement===de?(j.preventDefault(),Z.focus()):!j.shiftKey&&document.activeElement===Z&&(j.preventDefault(),de.focus());return}if(j.key==="Enter"){if(document.activeElement&&document.activeElement.classList.contains("cw-wiz-dot"))return;j.preventDefault(),j.stopPropagation(),T.click()}else j.key==="Escape"?(j.preventDefault(),j.stopPropagation(),k.hidden?ne():k.click()):j.key==="ArrowRight"?(j.preventDefault(),u<e.length-1&&(y.playClick(),ce(u+1))):j.key==="ArrowLeft"&&(j.preventDefault(),u>0&&(y.playClick(),ce(u-1)))}}return[O,k,T].forEach(j=>{j.onmouseenter=()=>y.playHover()}),T.onclick=()=>{y.playClick(),u<e.length-1?ce(u+1):ne()},O.onclick=()=>{y.playClick(),ce(u-1)},k.onclick=async()=>{y.playClick(),!(typeof r=="function"&&!await r())&&ne({silent:!0})},document.body.appendChild(v),De(),Q(0),I.style.willChange="opacity, transform",requestAnimationFrame(()=>{v.classList.add("open")}),setTimeout(()=>{I.style.removeProperty("will-change"),T.focus({preventScroll:!0})},Nn),document.addEventListener("keydown",pe,!0),{close:ne}}var zs="cw_onboarding_seen_v1",$s={pt:[{icon:"\u{1F680}",title:"Bem-vindo ao Case Wizard",text:"Uma camada de produtividade que roda por cima do CRM. Ela n\xE3o substitui nada do que voc\xEA j\xE1 usa \u2014 s\xF3 tira o trabalho repetitivo do caminho."},{icon:"\u2328\uFE0F",title:"Tudo come\xE7a em dois lugares",text:"A p\xEDlula flutuante, sempre no canto da tela, abre qualquer m\xF3dulo com um clique. E Ctrl+K (ou \u2318K) abre a paleta de comandos: digite o que quer e v\xE1 direto, sem tirar a m\xE3o do teclado."},{icon:"\u{1F4DD}",title:"Notas e BAU sem retrabalho",text:"O Case Notes monta a nota t\xE9cnica do caso a partir do status e das tasks que voc\xEA marcar. O BAU Form cuida das solicita\xE7\xF5es de cria\xE7\xE3o e descarte, passo a passo."},{icon:"\u{1F4AC}",title:"Na hora de falar com o cliente",text:"O Email Assistant sugere templates que leem o contexto do caso, e o Call Script te guia pela chamada com um roteiro interativo \u2014 sem script decorado."},{icon:"\u{1F4DA}",title:"Seu material e o do time",text:'Minha Biblioteca guarda seus snippets e respostas prontas. A Central de Links re\xFAne SOPs e ferramentas, os Avisos trazem disponibilidade BAU, e os Fusos Hor\xE1rios respondem "que horas s\xE3o pra ele agora?".'},{icon:"\u{1F6DF}",title:"Nada se perde",text:"O que voc\xEA digita \xE9 salvo sozinho a cada poucos segundos, e d\xE1 pra estacionar um caso no meio e retomar de onde parou. Fechar a aba sem querer n\xE3o custa mais nada. Bom trabalho!"}],es:[{icon:"\u{1F680}",title:"Bienvenido a Case Wizard",text:"Una capa de productividad que funciona sobre el CRM. No reemplaza nada de lo que ya usas \u2014 solo quita el trabajo repetitivo del camino."},{icon:"\u2328\uFE0F",title:"Todo empieza en dos lugares",text:"La p\xEDldora flotante, siempre en la esquina de la pantalla, abre cualquier m\xF3dulo con un clic. Y Ctrl+K (o \u2318K) abre la paleta de comandos: escribe lo que buscas y ve directo, sin soltar el teclado."},{icon:"\u{1F4DD}",title:"Notas y BAU sin rehacer trabajo",text:"Case Notes arma la nota t\xE9cnica del caso a partir del estado y de las tareas que marques. BAU Form se encarga de las solicitudes de creaci\xF3n y descarte, paso a paso."},{icon:"\u{1F4AC}",title:"A la hora de hablar con el cliente",text:"Email Assistant sugiere plantillas que leen el contexto del caso, y Call Script te gu\xEDa por la llamada con un guion interactivo \u2014 sin nada memorizado."},{icon:"\u{1F4DA}",title:"Tu material y el del equipo",text:'Mi Biblioteca guarda tus fragmentos y respuestas listas. La Central de Enlaces re\xFAne SOPs y herramientas, los Avisos traen la disponibilidad BAU, y las Zonas Horarias responden "\xBFqu\xE9 hora es para \xE9l ahora?".'},{icon:"\u{1F6DF}",title:"Nada se pierde",text:"Lo que escribes se guarda solo cada pocos segundos, y puedes aparcar un caso a mitad de camino y retomarlo donde lo dejaste. Cerrar la pesta\xF1a sin querer ya no cuesta nada. \xA1Buen trabajo!"}],en:[{icon:"\u{1F680}",title:"Welcome to Case Wizard",text:"A productivity layer that runs on top of the CRM. It replaces nothing you already use \u2014 it just gets the repetitive work out of your way."},{icon:"\u2328\uFE0F",title:"It all starts in two places",text:"The floating pill, always in the corner of the screen, opens any module with one click. And Ctrl+K (or \u2318K) opens the command palette: type what you want and go straight there, without leaving the keyboard."},{icon:"\u{1F4DD}",title:"Notes and BAU without rework",text:"Case Notes builds the case's technical note from the status and the tasks you select. BAU Form handles creation and discard requests, step by step."},{icon:"\u{1F4AC}",title:"When it is time to talk to the customer",text:"Email Assistant suggests templates that read the case context, and Call Script guides you through the call with an interactive script \u2014 nothing to memorize."},{icon:"\u{1F4DA}",title:"Your material and the team's",text:'My Library keeps your snippets and ready-made replies. The Links Central gathers SOPs and tools, Broadcast brings BAU availability, and Timezones answer "what time is it for them right now?".'},{icon:"\u{1F6DF}",title:"Nothing gets lost",text:"What you type is saved on its own every few seconds, and you can park a case halfway through and pick it up where you left off. Closing the tab by accident no longer costs you anything. Have a good shift!"}]},Ps={pt:{next:"Pr\xF3ximo",start:"Come\xE7ar \u{1F680}",skip:"Pular",skipConfirm:"Pular a apresenta\xE7\xE3o? Voc\xEA pode explorar tudo pelo menu flutuante.",readyToast:"Tudo pronto! Use o menu flutuante ou Ctrl+K."},es:{next:"Siguiente",start:"Empezar \u{1F680}",skip:"Omitir",skipConfirm:"\xBFOmitir la presentaci\xF3n? Puedes explorar todo desde el men\xFA flotante.",readyToast:"\xA1Todo listo! Usa el men\xFA flotante o Ctrl+K."},en:{next:"Next",start:"Get started \u{1F680}",skip:"Skip",skipConfirm:"Skip the walkthrough? You can explore everything from the floating menu.",readyToast:"All set! Use the floating menu or Ctrl+K."}},Sd=[{lang:"pt",flag:"\u{1F1E7}\u{1F1F7}",name:"Portugu\xEAs"},{lang:"es",flag:"\u{1F1EA}\u{1F1F8}",name:"Espa\xF1ol"},{lang:"en",flag:"\u{1F1FA}\u{1F1F8}",name:"English"}];function Ad(){return new Promise(e=>{let t="cw-ob-lang-styles";if(!document.getElementById(t)){let p=document.createElement("style");p.id=t,p.textContent=`
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
        `;let i=o.querySelector(".cw-ob-lang-options"),n=Sd.filter(p=>Ba.includes(p.lang)).map(p=>{let d=document.createElement("button");return d.type="button",d.className="cw-ob-lang-btn",d.dataset.lang=p.lang,d.innerHTML=`<span class="flag" aria-hidden="true">${p.flag}</span><span>${p.name}</span>`,d.onclick=()=>s(p.lang),i.appendChild(d),d}),r=!1;function s(p){r||(r=!0,ha(p),document.removeEventListener("keydown",l,!0),a.classList.remove("open"),setTimeout(()=>a.remove(),320),e(p))}function l(p){if(p.key!=="ArrowDown"&&p.key!=="ArrowUp")return;p.preventDefault();let d=n.indexOf(document.activeElement),A=p.key==="ArrowDown"?1:-1,u=(d<0?0:d+A+n.length)%n.length;n[u].focus()}document.addEventListener("keydown",l,!0),a.appendChild(o),document.body.appendChild(a),requestAnimationFrame(()=>{a.classList.add("open"),(n.find(d=>d.dataset.lang===se())||n[0])?.focus()})})}function Bs(){return localStorage.getItem(zs)?Promise.resolve():(localStorage.setItem(zs,"true"),Ad().then(Cd))}function Cd(e){let t=$s[e]||$s.pt,a=Ps[e]||Ps.pt;return new Promise(o=>{Ao({slides:t,idPrefix:"cw-onboarding",nextLabel:a.next,finalLabel:a.start,skipLabel:a.skip,onSkip:()=>Ye(a.skipConfirm),onClose:()=>{te(a.readyToast),o()}})})}var Co={version:"v6.6.0",title:{pt:"Case Wizard v6.6.0",es:"Case Wizard v6.6.0",en:"Case Wizard v6.6.0"},slides:[{icon:"\u{1F4CB}",title:{pt:"Pre-call Checklist, direto na nota",es:"Pre-call Checklist, directo en la nota",en:"Pre-call Checklist, straight into the note"},text:{pt:'Um bot\xE3o novo na p\xEDlula (e no Ctrl+K) abre um formul\xE1rio curto que escreve o bloco "Pre-call checklist" no card de nota do caso \u2014 ou s\xF3 copia. Tasks, telefone, e-mail, site e CID que a tela do caso j\xE1 mostra chegam preenchidos e marcados como Auto: confira antes de gerar. A nota sai sempre em ingl\xEAs, que \xE9 o que a auditoria procura.',es:'Un bot\xF3n nuevo en la p\xEDldora (y en Ctrl+K) abre un formulario corto que escribe el bloque "Pre-call checklist" en la tarjeta de nota del caso \u2014 o solo lo copia. Las tasks, el tel\xE9fono, el correo, el sitio y el CID que la pantalla del caso ya muestra llegan completados y marcados como Auto: rev\xEDsalos antes de generar. La nota sale siempre en ingl\xE9s, que es lo que busca la auditor\xEDa.',en:`A new button on the pill (and in Ctrl+K) opens a short form that writes the "Pre-call checklist" block into the case's note card \u2014 or just copies it. The tasks, phone, email, website and CID the case screen already shows arrive pre-filled and tagged Auto: check them before generating. The note is always written in English, which is what the audit looks for.`}},{icon:"\u{1F517}",title:{pt:"Links ganhou uma home",es:"Links ahora tiene una p\xE1gina de inicio",en:"Links now has a home screen"},text:{pt:'Ao abrir Links, voc\xEA v\xEA at\xE9 3 destaques do momento e, logo abaixo, seus Favoritos, os Recentes e o que saiu do destaque. A busca agora acha tamb\xE9m pela descri\xE7\xE3o e pelo nome da categoria, sem depender de acento, e um painel de pr\xE9via mostra "O que \xE9" e "Quando usar" ao passar o mouse. Favoritos e recentes ficam salvos na nuvem, ent\xE3o acompanham voc\xEA.',es:'Al abrir Links ves hasta 3 destacados del momento y, justo debajo, tus Favoritos, los Recientes y lo que sali\xF3 de destacados. La b\xFAsqueda ahora tambi\xE9n encuentra por descripci\xF3n y por nombre de categor\xEDa, sin depender de las tildes, y un panel de vista previa muestra "Qu\xE9 es" y "Cu\xE1ndo usar" al pasar el mouse. Favoritos y recientes se guardan en la nube, as\xED que te acompa\xF1an.',en:'When you open Links you see up to 3 current highlights and, right below, your Favorites, Recent and what is no longer featured. Search now also matches the description and the category name, without depending on accents, and a preview panel shows "What it is" and "When to use" as you hover. Favorites and recents are saved in the cloud, so they follow you.'}},{icon:"\u{1F4D6}",title:{pt:"A documenta\xE7\xE3o est\xE1 a um clique",es:"La documentaci\xF3n est\xE1 a un clic",en:"The documentation is one click away"},text:{pt:'O "?" do cabe\xE7alho de cada m\xF3dulo e a se\xE7\xE3o Suporte & Feedback, em Configura\xE7\xF5es, agora levam ao deck de documenta\xE7\xE3o do Case Wizard. Travou num m\xF3dulo? Comece por ele.',es:'El "?" del encabezado de cada m\xF3dulo y la secci\xF3n Soporte y Comentarios, en Configuraci\xF3n, ahora llevan a la presentaci\xF3n de documentaci\xF3n de Case Wizard. \xBFTe trabaste en un m\xF3dulo? Empieza por ah\xED.',en:`The "?" in each module's header and the Support & Feedback section in Settings now open the Case Wizard documentation deck. Stuck in a module? Start there.`}}]};var ko="cw_last_version",Gs={pt:{updateBadge:e=>`Atualiza\xE7\xE3o ${e}`,nextBtn:"Pr\xF3ximo",doneBtn:"Entendi, vamos l\xE1! \u{1F44D}",updatedToast:e=>`Case Wizard atualizado para ${e}!`},es:{updateBadge:e=>`Actualizaci\xF3n ${e}`,nextBtn:"Siguiente",doneBtn:"\xA1Entendido, vamos! \u{1F44D}",updatedToast:e=>`\xA1Case Wizard actualizado a ${e}!`},en:{updateBadge:e=>`Update ${e}`,nextBtn:"Next",doneBtn:"Got it, let\u2019s go! \u{1F44D}",updatedToast:e=>`Case Wizard updated to ${e}!`}};function Eo(e){let t=se();return Gs[t]?.[e]??Gs.pt[e]}function js(e){let t=localStorage.getItem(ko);if(!t){localStorage.setItem(ko,e);return}if(t!==e){if(Co.version!==e){console.warn(`[changelog] APP_VERSION \xE9 ${e} mas RELEASE_NOTES.version \xE9 ${Co.version}. Modal suprimido at\xE9 os dois baterem (veja src/modules/changelog/changelog-data.js).`),localStorage.setItem(ko,e);return}return kd(e)}}function Ed(){let e=se(),t=a=>a?.[e]??a?.pt??"";return(Co.slides||[]).map(a=>({...a,title:t(a.title),text:t(a.text)}))}function kd(e){let t=Ed();return new Promise(a=>{t.length||a(),Ao({slides:t,idPrefix:"cw-changelog",badge:Eo("updateBadge")(e),nextLabel:Eo("nextBtn"),finalLabel:Eo("doneBtn"),onClose:()=>{localStorage.setItem(ko,e),te(Eo("updatedToast")(e)),a()}})})}var Td={pt:{title:"Lembrete de qualidade",text:"Siga as diretrizes de QA e o SOP do segmento do caso. O Case Wizard apenas auxilia no preenchimento; a qualidade do tratamento \xE9 responsabilidade do agente.",ok:"Entendi"},es:{title:"Recordatorio de calidad",text:"Sigue las directrices de QA y el SOP del segmento del caso. Case Wizard solo ayuda a rellenar; la calidad del tratamiento es responsabilidad del agente.",ok:"Entendido"},en:{title:"Quality reminder",text:"Follow the QA guidelines and the SOP for the case segment. Case Wizard only helps with filling things in; handling the case to the quality standard is the agent\u2019s responsibility.",ok:"Got it"}},_n=Zt(Td),Hs="cw-qa-notice",Us="cw-qa-notice-style",Ld=12e3,Id=4e3,Vs=200;function Nd(){if(document.getElementById(Us))return;let e=document.createElement("style");e.id=Us,e.textContent=`
        .cw-qa-notice {
            position: fixed; left: 24px; bottom: 24px;
            z-index: ${je.TOAST};
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
            transition-duration: ${Vs}ms;
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
    `,document.head.appendChild(e)}function Ws(){if(document.getElementById(Hs))return;Nd();let e=document.createElement("aside");e.id=Hs,e.className="cw-qa-notice",e.setAttribute("role","status"),e.innerHTML=`
        <svg class="cw-qa-notice-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z"/>
        </svg>
        <div>
            <p class="cw-qa-notice-title"></p>
            <p class="cw-qa-notice-text"></p>
        </div>
        <div class="cw-qa-notice-actions"><button type="button" class="cw-qa-notice-btn"></button></div>
    `;let t=e.querySelector(".cw-qa-notice-btn"),a=()=>{e.querySelector(".cw-qa-notice-title").textContent=_n("title"),e.querySelector(".cw-qa-notice-text").textContent=_n("text"),t.textContent=_n("ok")};a();let o=Le(a),i=Ld,n=0,r=null,s=0,l=!1;function p(){n=Date.now(),r=setTimeout(h,i)}function d(){clearTimeout(r),i=Math.max(i-(Date.now()-n),Id)}let A=()=>{s++===0&&d()},u=()=>{s>0&&--s===0&&!l&&p()};function h(){l||(l=!0,clearTimeout(r),o(),e.classList.remove("open"),e.classList.add("closing"),setTimeout(()=>e.remove(),Vs))}e.addEventListener("mouseenter",A),e.addEventListener("mouseleave",u),e.addEventListener("focusin",A),e.addEventListener("focusout",u),t.addEventListener("click",h),p(),document.body.appendChild(e),requestAnimationFrame(()=>requestAnimationFrame(()=>e.classList.add("open"))),y.playNotice()}var Gt=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"br",name:"Brasil \u2014 Bras\xEDlia",flag:"\u{1F1E7}\u{1F1F7}",zone:"America/Sao_Paulo",label:"S\xE3o Paulo",region:"sa",home:!0},{id:"br-am",name:"Brasil \u2014 Amazonas",flag:"\u{1F1E7}\u{1F1F7}",zone:"America/Manaus",label:"Manaus",region:"sa",home:!0},{id:"br-ac",name:"Brasil \u2014 Acre",flag:"\u{1F1E7}\u{1F1F7}",zone:"America/Rio_Branco",label:"Rio Branco",region:"sa",home:!0},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"us-et",name:"EUA \u2014 Eastern",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/New_York",label:"Nova York",region:"us"},{id:"us-ct",name:"EUA \u2014 Central",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Chicago",label:"Chicago",region:"us"},{id:"us-mt",name:"EUA \u2014 Mountain",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Denver",label:"Denver",region:"us"},{id:"us-az",name:"EUA \u2014 Arizona",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Phoenix",label:"Phoenix",region:"us"},{id:"us-pt",name:"EUA \u2014 Pacific",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Los_Angeles",label:"Los Angeles",region:"us"},{id:"us-ak",name:"EUA \u2014 Alaska",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Anchorage",label:"Anchorage",region:"us"},{id:"us-hi",name:"EUA \u2014 Hava\xED",flag:"\u{1F1FA}\u{1F1F8}",zone:"Pacific/Honolulu",label:"Honolulu",region:"us"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],Xs={es:{es:{name:"Espa\xF1a"},bo:{name:"Bolivia"},co:{name:"Colombia"},ec:{name:"Ecuador"},py:{name:"Paraguay",label:"Asunci\xF3n"},uy:{name:"Uruguay",label:"Montevideo"},ni:{name:"Nicaragua",label:"Managua"},pr:{name:"Puerto Rico"},gt:{label:"C. de Guatemala"},pa:{label:"C. de Panam\xE1"},"us-et":{name:"EE. UU. \u2014 Eastern",label:"Nueva York"},"us-ct":{name:"EE. UU. \u2014 Central"},"us-mt":{name:"EE. UU. \u2014 Mountain"},"us-az":{name:"EE. UU. \u2014 Arizona"},"us-pt":{name:"EE. UU. \u2014 Pacific"},"us-ak":{name:"EE. UU. \u2014 Alaska"},"us-hi":{name:"EE. UU. \u2014 Haw\xE1i"}},en:{pt:{label:"Lisbon"},es:{name:"Spain"},br:{name:"Brazil \u2014 Bras\xEDlia"},"br-am":{name:"Brazil \u2014 Amazonas"},"br-ac":{name:"Brazil \u2014 Acre"},bo:{name:"Bolivia"},co:{name:"Colombia"},ec:{name:"Ecuador"},py:{name:"Paraguay",label:"Asunci\xF3n"},uy:{name:"Uruguay",label:"Montevideo"},"us-et":{name:"USA \u2014 Eastern",label:"New York"},"us-ct":{name:"USA \u2014 Central"},"us-mt":{name:"USA \u2014 Mountain"},"us-az":{name:"USA \u2014 Arizona"},"us-pt":{name:"USA \u2014 Pacific"},"us-ak":{name:"USA \u2014 Alaska"},"us-hi":{name:"USA \u2014 Hawaii"},mx:{name:"Mexico"},gt:{label:"Guatemala City"},ni:{name:"Nicaragua",label:"Managua"},pa:{name:"Panama",label:"Panama City"},do:{name:"Dominican Rep."},pr:{name:"Puerto Rico"}}};function To(e,t){return Xs[t]?.[e.id]?.name??e.name}function fa(e,t){return Xs[t]?.[e.id]?.label??e.label}var jt="America/Sao_Paulo";function Ys(e,t){let a=new Intl.DateTimeFormat("en-US",{timeZone:e,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}),o={};a.formatToParts(t).forEach(n=>{o[n.type]=n.value});let i=Date.UTC(Number(o.year),Number(o.month)-1,Number(o.day),Number(o.hour)%24,Number(o.minute),Number(o.second));return Math.round((i-t.getTime())/6e4)}function _d(e,t){let a=String(t||"").match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);if(!a)return null;let[,o,i,n,r,s]=a.map(Number),l=Date.UTC(o,i-1,n,r,s),p=Ys(e,new Date(l));return p=Ys(e,new Date(l-p*6e4)),p}function Od(e){let t=e<0?"-":"+",a=Math.abs(e),o=String(Math.floor(a/60)).padStart(2,"0"),i=String(a%60).padStart(2,"0");return`${t}${o}:${i}`}function On(e,t){if(!e)return"";if(/[+-]\d{2}:\d{2}$/.test(e)||/Z$/.test(e))return e;let a=_d(t,e);return a===null?e:`${e.slice(0,16)}${Od(a)}`}var Ks={"brazil/east":"America/Sao_Paulo","brazil/west":"America/Manaus","brazil/acre":"America/Rio_Branco","us/eastern":"America/New_York","us/central":"America/Chicago","us/mountain":"America/Denver","us/arizona":"America/Phoenix","us/pacific":"America/Los_Angeles","us/alaska":"America/Anchorage","us/hawaii":"Pacific/Honolulu","america/argentina/buenos_aires":"America/Argentina/Buenos_Aires","mexico/general":"America/Mexico_City"};function Dn(e){let t=String(e||"").trim();if(!t)return null;let a=t.toLowerCase();if(Ks[a])return Ks[a];let o=Gt.find(i=>i.zone.toLowerCase()===a);return o?o.zone:null}var Js="cw_timezone_pinned",Dt=e=>To(e,se()),Mn=e=>fa(e,se()),Qs={pt:{headerDesc:"Monitoramento global e planejamento de chamadas.",tabLive:"Monitoramento",tabPlan:"Planejador",searchPlaceholder:"Buscar cidade ou pa\xEDs...",noLocationFound:"Nenhum local encontrado",unpin:"Desafixar",pin:"Fixar",statusOpen:"Aberto",statusOpening:"Abrindo",statusClosing:"Fechando",statusClosed:"Fechado",whereIsClient:"Onde est\xE1 o cliente?",you:"Voc\xEA",yourTimezone:"Bras\xEDlia (GMT-3)",client:"Cliente",dragToSimulate:"Arraste para simular o hor\xE1rio:",idealBusinessHours:"Hor\xE1rio Comercial Ideal",limitHours:"Hor\xE1rio Limite (Aten\xE7\xE3o)",outOfHours:"Fora de Hor\xE1rio",filters:{all:"Todos",sa:"Am\xE9rica do Sul",us:"Estados Unidos",na:"Norte & Central",eu:"Europa"}},es:{headerDesc:"Monitoreo global y planificaci\xF3n de llamadas.",tabLive:"Monitoreo",tabPlan:"Planificador",searchPlaceholder:"Buscar ciudad o pa\xEDs...",noLocationFound:"No se encontr\xF3 ning\xFAn lugar",unpin:"Desanclar",pin:"Anclar",statusOpen:"Abierto",statusOpening:"Abriendo",statusClosing:"Cerrando",statusClosed:"Cerrado",whereIsClient:"\xBFD\xF3nde est\xE1 el cliente?",you:"T\xFA",yourTimezone:"Brasilia (GMT-3)",client:"Cliente",dragToSimulate:"Arrastra para simular el horario:",idealBusinessHours:"Horario Comercial Ideal",limitHours:"Horario L\xEDmite (Atenci\xF3n)",outOfHours:"Fuera de Horario",filters:{all:"Todos",sa:"Am\xE9rica del Sur",us:"Estados Unidos",na:"Norte y Central",eu:"Europa"}},en:{headerDesc:"Global monitoring and call planning.",tabLive:"Monitoring",tabPlan:"Planner",searchPlaceholder:"Search for a city or country...",noLocationFound:"No location found",unpin:"Unpin",pin:"Pin",statusOpen:"Open",statusOpening:"Opening",statusClosing:"Closing",statusClosed:"Closed",whereIsClient:"Where is the customer?",you:"You",yourTimezone:"Bras\xEDlia (GMT-3)",client:"Customer",dragToSimulate:"Drag to simulate the time:",idealBusinessHours:"Ideal Business Hours",limitHours:"Cutoff Hours (Caution)",outOfHours:"Outside Business Hours",filters:{all:"All",sa:"South America",us:"United States",na:"North & Central",eu:"Europe"}}};function Oe(e){let t=se();return Qs[t]?.[e]??Qs.pt[e]}var qn=Gt.filter(e=>!e.home),Zs=[{id:"all"},{id:"sa"},{id:"us"},{id:"na"},{id:"eu"}];function Dd(){if(document.getElementById("cw-timezone-interactive-styles"))return;let e=document.createElement("style");e.id="cw-timezone-interactive-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function el(){Dd();let e="v2.2 Pro",t=!1,a=null,o="mx",i=JSON.parse(localStorage.getItem(Js)||"[]"),n="",r="all",s=new Date;s.setHours(14,0,0,0);let l={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},p={container:{display:"flex",flexDirection:"column",height:"100%",background:l.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:l.surface,borderBottom:`1px solid ${l.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:l.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:l.primary,borderBottomColor:l.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:l.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:l.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${l.border}`,background:l.surface,color:l.textSub,transition:"all 0.2s"},chipActive:{background:l.primaryBg,color:l.primary,borderColor:l.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:l.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${l.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:l.surface,border:`1px solid ${l.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:l.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},d=document.createElement("div");d.id="timezone-popup",d.classList.add("cw-module-window"),Object.assign(d.style,Qe,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let A={popup:d},u=He(d,"Time Zone Traveler",e,Oe("headerDesc"),A,()=>ue());d.appendChild(u);let h=document.createElement("div");Object.assign(h.style,p.container),d.appendChild(h);let N=document.createElement("div");Object.assign(N.style,p.tabHeader);let v=document.createElement("div");v.textContent=Oe("tabLive"),v.className="tz-tab-btn",v.tabIndex=0,v.setAttribute("role","tab"),Object.assign(v.style,p.tabBtn,p.tabActive);let I=document.createElement("div");I.textContent=Oe("tabPlan"),I.className="tz-tab-btn",I.tabIndex=0,I.setAttribute("role","tab"),Object.assign(I.style,p.tabBtn),[v,I].forEach(Q=>{Q.addEventListener("keydown",ce=>{(ce.key==="Enter"||ce.key===" ")&&(ce.preventDefault(),Q.click())})}),N.appendChild(v),N.appendChild(I),h.appendChild(N);let z=document.createElement("div");Object.assign(z.style,p.toolbar);let U=document.createElement("div");Object.assign(U.style,p.searchInputWrapper);let B=document.createElement("div");B.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(B.style,p.searchIcon);let x=document.createElement("input");x.placeholder=Oe("searchPlaceholder"),Object.assign(x.style,p.searchInput),x.onfocus=()=>{x.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",x.style.borderColor="rgba(26,115,232,0.3)"},x.onblur=()=>{x.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",x.style.borderColor="transparent"},x.oninput=Q=>{n=Q.target.value.toLowerCase(),R()},U.appendChild(B),U.appendChild(x),z.appendChild(U);let K=document.createElement("div");Object.assign(K.style,p.chipsRow),Zs.forEach(Q=>{let ce=document.createElement("div");ce.textContent=Oe("filters")[Q.id],ce.id=`tz-filter-${Q.id}`,ce.className="tz-chip",ce.tabIndex=0,ce.setAttribute("role","button"),Object.assign(ce.style,p.chip),Q.id===r&&Object.assign(ce.style,p.chipActive),ce.onclick=()=>{y.playClick(),r=Q.id,Array.from(K.children).forEach(ne=>{Object.assign(ne.style,p.chip)}),Object.assign(ce.style,p.chipActive),R()},ce.addEventListener("keydown",ne=>{(ne.key==="Enter"||ne.key===" ")&&(ne.preventDefault(),ce.click())}),K.appendChild(ce)}),z.appendChild(K),h.appendChild(z);let W=document.createElement("div");Object.assign(W.style,p.listContainer);let X=document.createElement("style");X.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",h.appendChild(X);let O=document.createElement("div");Object.assign(O.style,p.plannerWrapper,{display:"none"}),h.appendChild(W),h.appendChild(O),v.onclick=()=>k("live"),I.onclick=()=>k("plan");function k(Q){y.playClick(),Q==="live"?(Object.assign(v.style,p.tabActive),Object.assign(I.style,p.tabBtn),I.style.borderBottomColor="transparent",v.setAttribute("aria-selected","true"),I.setAttribute("aria-selected","false"),W.style.display="flex",z.style.display="flex",O.style.display="none",ae()):(Object.assign(I.style,p.tabActive),Object.assign(v.style,p.tabBtn),v.style.borderBottomColor="transparent",O.style.display="flex",W.style.display="none",z.style.display="none",ie(),V())}function T(Q){return Q>=9&&Q<17?{color:l.success,bg:l.successBg,label:Oe("statusOpen"),icon:"\u{1F7E2}"}:Q>=8&&Q<9?{color:l.warning,bg:l.warningBg,label:Oe("statusOpening"),icon:"\u{1F7E1}"}:Q>=17&&Q<19?{color:l.warning,bg:l.warningBg,label:Oe("statusClosing"),icon:"\u{1F7E1}"}:{color:l.textSub,bg:"#F1F3F4",label:Oe("statusClosed"),icon:"\u{1F534}"}}function E(Q){i.includes(Q)?i=i.filter(ce=>ce!==Q):i.push(Q),localStorage.setItem(Js,JSON.stringify(i)),R(),y.playClick()}function R(){W.innerHTML="";let Q=new Date,ce=qn.filter(pe=>{let j=Dt(pe).toLowerCase().includes(n)||Mn(pe).toLowerCase().includes(n),re=r==="all"||pe.region===r;return j&&re});if(ce.sort((pe,j)=>{let re=i.includes(pe.id),de=i.includes(j.id);return re&&!de?-1:!re&&de?1:Dt(pe).localeCompare(Dt(j))}),ce.length===0){W.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">${Oe("noLocationFound")}</div>
                </div>
            `;return}ce.forEach(pe=>{let j=i.includes(pe.id),re=Q.toLocaleTimeString(Ut(),{timeZone:pe.zone,hour:"2-digit",minute:"2-digit"}),de=parseInt(re.split(":")[0]),Z=T(de),q=de<6||de>18,C=document.createElement("div");C.className="tz-hub-card",C.tabIndex=0,C.setAttribute("role","button"),C.setAttribute("aria-label",`${Dt(pe)}, ${re}`),Object.assign(C.style,p.hubCard),j&&Object.assign(C.style,p.hubCardPinned);let $=j?"\u2605":"\u2606",J=j?"#F9AB00":"#DADCE0";C.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn tz-pin-btn" tabindex="0" role="button" aria-label="${Oe(j?"unpin":"pin")} ${Dt(pe)}" style="cursor:pointer; font-size:22px; color:${J}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%;">${$}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${pe.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${l.text}; letter-spacing:-0.2px;">${Dt(pe)}</div>
                        <div style="font-size:12px; color:${l.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${q?"\u{1F319}":"\u2600\uFE0F"} ${Mn(pe)}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${l.text}; font-family:'Google Sans', sans-serif;">${re}</div>
                    <div style="font-size:11px; font-weight:600; color:${Z.color}; background:${Z.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${Z.label}
                    </div>
                </div>
            `;let D=C.querySelector(".cw-pin-btn");D.onclick=H=>{H.stopPropagation(),E(pe.id)},D.addEventListener("keydown",H=>{(H.key==="Enter"||H.key===" ")&&(H.preventDefault(),H.stopPropagation(),E(pe.id))}),C.onclick=()=>{o=pe.id,k("plan")},C.addEventListener("keydown",H=>{(H.key==="Enter"||H.key===" ")&&H.target===C&&(H.preventDefault(),C.click())}),W.appendChild(C)});let ne=document.createElement("div");ne.style.height="20px",ne.style.width="100%",W.appendChild(ne)}function V(){O.innerHTML="";let Q=document.createElement("div"),ce=document.createElement("label");ce.textContent=Oe("whereIsClient"),ce.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let ne=document.createElement("select");Object.assign(ne.style,yi),ne.style.padding="14px",[...qn].sort((_,m)=>Dt(_).localeCompare(Dt(m))).forEach(_=>{let m=document.createElement("option");m.value=_.id,m.textContent=`${_.flag} ${Dt(_)} (${_.zone})`,_.id===o&&(m.selected=!0),ne.appendChild(m)}),ne.onchange=_=>{o=_.target.value,S(),y.playClick()},Q.appendChild(ce),Q.appendChild(ne),O.appendChild(Q);let j=document.createElement("div");Object.assign(j.style,p.timeComparisonRow);let re=document.createElement("div");Object.assign(re.style,p.timeCard),re.style.backgroundColor="#F8FAFF",re.style.borderColor="#E8F0FE",re.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} ${Oe("you")}</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">${Oe("yourTimezone")}</div>
        `;let de=document.createElement("div");Object.assign(de.style,p.timeCard),de.style.backgroundColor="#FFF8E1",de.style.borderColor="#FEF7E0",de.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">${Oe("client")}</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,j.appendChild(re),j.appendChild(de),O.appendChild(j);let Z=document.createElement("div");Z.id="cw-planner-status",Object.assign(Z.style,p.statusBadge),O.appendChild(Z);let q=document.createElement("div");Object.assign(q.style,{padding:"0 4px",marginTop:"12px"});let C=document.createElement("div");C.textContent=Oe("dragToSimulate"),C.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let $=document.createElement("div");Object.assign($.style,p.timelineContainer);let J=document.createElement("div");Object.assign(J.style,p.timelineTrack);let D=document.createElement("div");Object.assign(D.style,p.dayZone),J.appendChild(D);let H=document.createElement("input");H.type="range",H.min="0",H.max="1439",H.step="15",H.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let oe=document.createElement("div");oe.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",oe.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",$.appendChild(J),$.appendChild(H),$.appendChild(oe),q.appendChild(C),q.appendChild($),O.appendChild(q);let f=re.querySelector("#cw-time-input-br"),g=de.querySelector("#cw-time-display-client"),c=de.querySelector("#cw-client-label");function S(){let _=qn.find(F=>F.id===o);c.textContent=`${_.flag} ${Mn(_)} (${_.zone})`;let m=s.getHours(),b=s.getMinutes(),L=`${String(m).padStart(2,"0")}:${String(b).padStart(2,"0")}`;f.value=L,H.value=m*60+b;let w=s.toLocaleTimeString(Ut(),{timeZone:_.zone,hour:"2-digit",minute:"2-digit"});g.textContent=w;let P=parseInt(w.split(":")[0]);P>=9&&P<17?(Z.style.background=l.successBg,Z.style.color=l.success,Z.innerHTML=`<span style="font-size:16px">\u2705</span> ${Oe("idealBusinessHours")}`):P>=8&&P<9||P>=17&&P<19?(Z.style.background=l.warningBg,Z.style.color=l.warning,Z.innerHTML=`<span style="font-size:16px">\u26A0\uFE0F</span> ${Oe("limitHours")}`):(Z.style.background=l.errorBg,Z.style.color=l.error,Z.innerHTML=`<span style="font-size:16px">\u26D4</span> ${Oe("outOfHours")}`)}H.oninput=_=>{let m=parseInt(_.target.value);s.setHours(Math.floor(m/60)),s.setMinutes(m%60),S()},f.oninput=_=>{let[m,b]=_.target.value.split(":");m&&b&&(s.setHours(parseInt(m)),s.setMinutes(parseInt(b)),S())},S()}function ae(){R(),a||(a=setInterval(R,6e4))}function ie(){a&&(clearInterval(a),a=null)}function ue(){t=!Ze(d),Ve(t,d,"cw-btn-timezone"),t?(De(),k("live")):(Me(),ie())}return document.body.appendChild(d),Le(()=>{let Q=d.querySelector(".cw-help-description");Q&&(Q.textContent=Oe("headerDesc")),v.textContent=Oe("tabLive"),I.textContent=Oe("tabPlan"),x.placeholder=Oe("searchPlaceholder"),Array.from(K.children).forEach(ce=>{let ne=Zs.find(pe=>`tz-filter-${pe.id}`===ce.id);ne&&(ce.textContent=Oe("filters")[ne.id])}),W.style.display!=="none"&&R(),O.style.display!=="none"&&V()}),ue}var tl={pt:{headerTitle:"Minha Biblioteca",headerDesc:"Gerencie seus snippets, textos e templates.",mediaTag:"M\xEDdia",tabs:{general:"Geral",note:"Notas",email:"Emails"},searchPlaceholder:"Buscar por t\xEDtulo ou conte\xFAdo...",newItem:"Novo item",cancel:"Cancelar",recentlyUsed:"\u{1F552} Usados recentemente",nothingFound:"Nada encontrado",nothingHereYet:"Nada aqui ainda",noItemMatches:e=>`Nenhum item bate com "${e}" nesta aba.`,clickPlusToStart:"Clique no + para come\xE7ar sua cole\xE7\xE3o.",copy:"Copiar",moreActions:"Mais a\xE7\xF5es",edit:"Editar",delete:"Excluir",deleteConfirm:e=>`Excluir "${e}"?`,itemDeletedToast:"Item exclu\xEDdo.",copiedToast:"Copiado!",titleLabel:"T\xEDtulo / Nome",subjectLabel:"Assunto do Email",contentLabel:"Conte\xFAdo",emailBodyLabel:"Corpo do Email (HTML)",noteTextLabel:"Texto da Nota",editItemTitle:"Editar Item",newItemTitle:"Novo Item",save:"Salvar",saveChanges:"Salvar Altera\xE7\xF5es",saving:"Salvando...",bold:"Negrito",italic:"It\xE1lico",codeFormat:"Formato c\xF3digo",insertImage:"Inserir imagem",imageUrlPrompt:"Cole a URL da imagem:",fillTitleAndContent:"Preencha t\xEDtulo e conte\xFAdo.",subjectRequired:"Assunto \xE9 obrigat\xF3rio para emails.",saveFailedNoUser:"N\xE3o foi poss\xEDvel salvar: usu\xE1rio n\xE3o identificado. Recarregue a p\xE1gina e tente de novo.",savedLocalOnly:"Salvo localmente \u2014 sem conex\xE3o com a nuvem no momento.",savedAndSynced:"Salvo e sincronizado!",saveError:"Erro ao salvar item."},es:{headerTitle:"Mi Biblioteca",headerDesc:"Gestiona tus snippets, textos y plantillas.",mediaTag:"Multimedia",tabs:{general:"General",note:"Notas",email:"Emails"},searchPlaceholder:"Buscar por t\xEDtulo o contenido...",newItem:"Nuevo elemento",cancel:"Cancelar",recentlyUsed:"\u{1F552} Usados recientemente",nothingFound:"No se encontr\xF3 nada",nothingHereYet:"Todav\xEDa no hay nada aqu\xED",noItemMatches:e=>`Ning\xFAn elemento coincide con "${e}" en esta pesta\xF1a.`,clickPlusToStart:"Haz clic en + para empezar tu colecci\xF3n.",copy:"Copiar",moreActions:"M\xE1s acciones",edit:"Editar",delete:"Eliminar",deleteConfirm:e=>`\xBFEliminar "${e}"?`,itemDeletedToast:"Elemento eliminado.",copiedToast:"\xA1Copiado!",titleLabel:"T\xEDtulo / Nombre",subjectLabel:"Asunto del Email",contentLabel:"Contenido",emailBodyLabel:"Cuerpo del Email (HTML)",noteTextLabel:"Texto de la Nota",editItemTitle:"Editar Elemento",newItemTitle:"Nuevo Elemento",save:"Guardar",saveChanges:"Guardar Cambios",saving:"Guardando...",bold:"Negrita",italic:"Cursiva",codeFormat:"Formato c\xF3digo",insertImage:"Insertar imagen",imageUrlPrompt:"Pega la URL de la imagen:",fillTitleAndContent:"Completa el t\xEDtulo y el contenido.",subjectRequired:"El asunto es obligatorio para emails.",saveFailedNoUser:"No se pudo guardar: usuario no identificado. Recarga la p\xE1gina e int\xE9ntalo de nuevo.",savedLocalOnly:"Guardado localmente \u2014 sin conexi\xF3n con la nube en este momento.",savedAndSynced:"\xA1Guardado y sincronizado!",saveError:"Error al guardar el elemento."},en:{headerTitle:"My Library",headerDesc:"Manage your snippets, texts and templates.",mediaTag:"Media",tabs:{general:"General",note:"Notes",email:"Emails"},searchPlaceholder:"Search by title or content...",newItem:"New item",cancel:"Cancel",recentlyUsed:"\u{1F552} Recently used",nothingFound:"Nothing found",nothingHereYet:"Nothing here yet",noItemMatches:e=>`No item matches "${e}" in this tab.`,clickPlusToStart:"Click + to start your collection.",copy:"Copy",moreActions:"More actions",edit:"Edit",delete:"Delete",deleteConfirm:e=>`Delete "${e}"?`,itemDeletedToast:"Item deleted.",copiedToast:"Copied!",titleLabel:"Title / Name",subjectLabel:"Email Subject",contentLabel:"Content",emailBodyLabel:"Email Body (HTML)",noteTextLabel:"Note Text",editItemTitle:"Edit Item",newItemTitle:"New Item",save:"Save",saveChanges:"Save Changes",saving:"Saving...",bold:"Bold",italic:"Italic",codeFormat:"Code format",insertImage:"Insert image",imageUrlPrompt:"Paste the image URL:",fillTitleAndContent:"Fill in the title and the content.",subjectRequired:"A subject is required for emails.",saveFailedNoUser:"Could not save: user not identified. Reload the page and try again.",savedLocalOnly:"Saved locally \u2014 no cloud connection at the moment.",savedAndSynced:"Saved and synced!",saveError:"Error saving the item."}};function he(e){let t=se();return tl[t]?.[e]??tl.pt[e]}var ot={tabs:{general:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',note:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z"></path><path d="M15 3v6h6"></path><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>',email:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'},search:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',clear:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',copy:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',more:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8"></circle><circle cx="12" cy="12" r="1.8"></circle><circle cx="12" cy="19" r="1.8"></circle></svg>',edit:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',delete:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',add:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',back:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',bold:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>',italic:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>',code:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',image:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',media:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',empty:'<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>'},Fn=[{id:"general",icon:ot.tabs.general},{id:"note",icon:ot.tabs.note},{id:"email",icon:ot.tabs.email}],Rn="cw_lib_recent_v1",al=4;function Md(e){try{let t=JSON.parse(localStorage.getItem(Rn)||"[]");t=t.filter(a=>a!==e),t.unshift(e),t=t.slice(0,al*3),localStorage.setItem(Rn,JSON.stringify(t))}catch(t){console.warn("Erro ao salvar uso recente",t)}}function qd(e){try{let t=JSON.parse(localStorage.getItem(Rn)||"[]");if(t.length===0)return[];let a=new Map(at.getSnippets(e).map(o=>[o.id,o]));return t.map(o=>a.get(o)).filter(Boolean).slice(0,al)}catch{return[]}}function Fd(){if(document.getElementById("cw-lib-styles-v2"))return;let e=document.createElement("style");e.id="cw-lib-styles-v2",e.textContent=`
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
    `,document.head.appendChild(e)}function ol(){let e="v2.0",t=!1,a="general",o="",i=null,n=null;Fd();let r=document.createElement("div");r.id="library-popup",r.classList.add("cw-module-window"),Object.assign(r.style,Qe,{right:"auto",left:"50%",width:"620px",height:"680px",maxHeight:"90vh",transform:"translateX(-50%) scale(0.05)"});let s={popup:r},l=He(r,he("headerTitle"),e,he("headerDesc"),s,()=>q());r.appendChild(l);let p=l.querySelector("span"),d=document.createElement("div");d.className="cw-lib-container",r.appendChild(d);let A=document.createElement("div");A.className="cw-lib-toolbar";let u=document.createElement("div");u.className="cw-lib-search-wrap";let h=document.createElement("div");h.className="cw-lib-search-icon",h.innerHTML=ot.search;let N=document.createElement("input");N.className="cw-lib-search no-drag",N.placeholder=he("searchPlaceholder"),N.type="text";let v=document.createElement("div");v.className="cw-lib-search-clear cw-tactile",v.innerHTML=ot.clear,u.append(h,N,v);let I=document.createElement("div");I.className="cw-lib-tabs",Fn.forEach(C=>{let $=document.createElement("div");$.className="cw-lib-tab"+(C.id===a?" active":""),$.id=`lib-tab-${C.id}`,$.innerHTML=`${C.icon}<span class="js-lib-tab-label">${he("tabs")[C.id]}</span>`,$.onmouseenter=()=>y.playHover(),$.onclick=()=>V(C.id),I.appendChild($)}),A.append(u,I),d.appendChild(A);let z=document.createElement("div");z.className="cw-lib-grid",d.appendChild(z);let U=document.createElement("div");U.className="cw-lib-fab cw-tactile",U.title=he("newItem"),U.innerHTML=ot.add,U.onclick=()=>pe(),d.appendChild(U);let B=document.createElement("div");B.className="cw-lib-sheet";let x=document.createElement("div");x.className="cw-lib-sheet-handle";let K=document.createElement("div");K.className="cw-lib-sheet-head";let W=document.createElement("div");W.className="cw-lib-sheet-back no-drag",W.innerHTML=ot.back,W.title=he("cancel"),W.onclick=j;let X=document.createElement("span");X.className="cw-lib-sheet-title",X.textContent=he("newItemTitle"),K.append(W,X);let O=document.createElement("div");O.className="cw-lib-sheet-body";let k=document.createElement("div");k.className="cw-lib-sheet-foot";let T=document.createElement("button");T.className="cw-lib-save-btn no-drag",T.textContent=he("save"),T.onclick=re,k.appendChild(T);let E=document.createElement("div");E.className="cw-lib-loading",E.innerHTML=`<div class="cw-lib-spinner"></div><div class="cw-lib-loading-text js-lib-saving">${he("saving")}</div>`,B.append(x,K,O,k,E),d.appendChild(B);let R=document.createElement("div");Object.assign(R.style,kt),R.className="no-drag",r.appendChild(R),Tt(r,R),document.body.appendChild(r),document.addEventListener("mousedown",C=>{n&&!n.contains(C.target)&&ae()});function V(C){y.playClick(),a=C,Fn.forEach($=>{document.getElementById(`lib-tab-${$.id}`).classList.toggle("active",$.id===C)}),Q()}function ae(){if(n){let C=n.querySelector(".cw-lib-menu");C&&C.classList.remove("open"),n.classList.remove("menu-open"),n=null}}function ie(C,$){return $?`${C.title} ${C.content}`.toLowerCase().includes($):!0}function ue(C){let $=document.createElement("div");$.className="cw-lib-recent-section",$.innerHTML=`<div class="cw-lib-recent-title">${he("recentlyUsed")}</div>`;let J=document.createElement("div");return J.className="cw-lib-recent-row",C.forEach(D=>{let H=document.createElement("div");H.className="cw-lib-recent-chip",H.tabIndex=0,H.setAttribute("role","button"),H.title=D.title,H.innerHTML=`<span>${Z(D.title)}</span>`,H.onclick=()=>{y.playClick(),ne(D)},H.addEventListener("keydown",oe=>{(oe.key==="Enter"||oe.key===" ")&&(oe.preventDefault(),H.click())}),J.appendChild(H)}),$.appendChild(J),$}function Q(){ae(),z.innerHTML="";let C=o.trim().toLowerCase(),$=at.getSnippets(a).filter(J=>ie(J,C));if(!C){let J=qd(a);J.length>0&&z.appendChild(ue(J))}if($.length===0){let J=document.createElement("div");J.className="cw-lib-empty";let D=C.length>0;J.innerHTML=`
                <div style="opacity:0.5;">${ot.empty}</div>
                <div class="cw-lib-empty-title">${he(D?"nothingFound":"nothingHereYet")}</div>
                <div class="cw-lib-empty-sub">${D?he("noItemMatches")(o.trim()):he("clickPlusToStart")}</div>
            `,z.appendChild(J);return}$.forEach(J=>z.appendChild(ce(J)))}function ce(C){let $=document.createElement("div");$.className="cw-lib-card"+(C.isCode?" is-code":"");let J=C.content,D="";if(C.isRich){let g=document.createElement("div");g.innerHTML=C.content;let c=!!g.querySelector("img");J=g.innerText.substring(0,200),c&&(D=`<span class="cw-lib-media-tag">${ot.media} ${he("mediaTag")}</span>`)}let H=[C.isCode?'<span class="cw-lib-badge code">CODE</span>':"",a==="email"?'<span class="cw-lib-badge template">TEMPLATE</span>':""].join("");$.innerHTML=`
            <div class="cw-lib-card-head">
                <div class="cw-lib-card-title">${Z(C.title)}</div>
                <div class="cw-lib-card-badges">${H}</div>
            </div>
            ${D}
            <div class="cw-lib-card-preview${C.isCode?" code":""}">${Z(J)}</div>
            <div class="cw-lib-card-foot">
                <div class="cw-lib-icon-btn cw-act-copy cw-tactile" title="${he("copy")}">${ot.copy}</div>
                <div class="cw-lib-icon-btn cw-act-more cw-tactile" title="${he("moreActions")}">${ot.more}</div>
                <div class="cw-lib-menu">
                    <div class="cw-lib-menu-item cw-act-edit">${ot.edit} ${he("edit")}</div>
                    <div class="cw-lib-menu-item danger cw-act-del">${ot.delete} ${he("delete")}</div>
                </div>
            </div>
        `,$.querySelector(".cw-act-copy").onclick=g=>{g.stopPropagation(),y.playClick(),ne(C)};let oe=$.querySelector(".cw-act-more"),f=$.querySelector(".cw-lib-menu");return oe.onclick=g=>{g.stopPropagation(),y.playClick();let c=f.classList.contains("open");ae(),c||(f.classList.add("open"),$.classList.add("menu-open"),n=$)},$.querySelector(".cw-act-edit").onclick=g=>{g.stopPropagation(),y.playClick(),ae(),pe(C)},$.querySelector(".cw-act-del").onclick=async g=>{g.stopPropagation(),y.playClick(),ae(),await Ye(he("deleteConfirm")(C.title))&&(at.delete(C.id),Q(),te(he("itemDeletedToast")))},$}function ne(C){if(C.isRich){let $=new Blob([C.content],{type:"text/html"}),J=document.createElement("div");J.innerHTML=C.content;let D=new Blob([J.innerText],{type:"text/plain"});navigator.clipboard.write([new ClipboardItem({"text/html":$,"text/plain":D})])}else navigator.clipboard.writeText(C.content);Md(C.id),te(he("copiedToast"))}function pe(C=null){i=C?C.id:null,O.innerHTML="",O.appendChild(de("title",he("titleLabel"),C?C.title:"")),a==="email"&&O.appendChild(de("subject",he("subjectLabel"),C?C.subject:""));let $=he("contentLabel");a==="email"&&($=he("emailBodyLabel")),a==="note"&&($=he("noteTextLabel")),O.appendChild(de("content",$,C?C.content:"",{isRich:!0,isCode:C?C.isCode:!1})),X.textContent=he(C?"editItemTitle":"newItemTitle"),T.textContent=he(C?"saveChanges":"save"),B.classList.add("open"),setTimeout(()=>{let J=O.querySelector("input");J&&J.focus()},500)}function j(){y.playSwoosh(),B.classList.remove("open"),setTimeout(()=>{i=null},500)}async function re(){E.classList.add("active"),T.disabled=!0;try{let C=O.querySelector("#cw-lib-inp-title"),$=O.querySelector("#cw-lib-inp-content"),J=C.value.trim(),D=$.contentEditable==="true"?$.innerHTML:$.value.trim(),H=$.getAttribute("data-is-code")==="true";if(!J||!D||D==="<br>"){y.playError(),te(he("fillTitleAndContent"),{error:!0});return}let oe={id:i,type:a,title:J,content:D,isCode:H,isRich:$.contentEditable==="true"};if(a==="email"){let g=O.querySelector("#cw-lib-inp-subject").value.trim();if(!g){y.playError(),te(he("subjectRequired"),{error:!0});return}oe.subject=g}let f=await at.save(oe);if(f===!1){y.playError(),te(he("saveFailedNoUser"),{error:!0});return}Q(),j(),f.synced===!1?(y.playError(),te(he("savedLocalOnly"),{error:!0})):(te(he("savedAndSynced")),y.playSuccess())}catch(C){console.error("Erro ao salvar item da biblioteca:",C),y.playError(),te(he("saveError"),{error:!0})}finally{E.classList.remove("active"),T.disabled=!1}}function de(C,$,J,D={}){let H=document.createElement("div");H.className="cw-lib-field";let oe=document.createElement("label");oe.className="cw-lib-label",oe.textContent=$,H.appendChild(oe);let f;if(D.isRich){let g=document.createElement("div");g.className="cw-lib-toolbar-mini",g.innerHTML=`
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-bold" title="${he("bold")}">${ot.bold}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-italic" title="${he("italic")}">${ot.italic}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-code" title="${he("codeFormat")}">${ot.code}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-img" title="${he("insertImage")}">${ot.image}</button>
            `,f=document.createElement("div"),f.className="cw-lib-input cw-lib-editable",f.contentEditable="true",f.innerHTML=J||"",D.isCode&&(f.style.fontFamily="'Roboto Mono', monospace",f.style.background="#F8F9FA",f.setAttribute("data-is-code","true"),g.querySelector(".cw-tb-code").classList.add("active")),g.querySelectorAll(".cw-lib-tb-btn").forEach(c=>{c.onmouseenter=()=>y.playHover(),c.onmousedown=()=>y.playClick()}),g.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),f.focus()},g.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),f.focus()},g.querySelector(".cw-tb-code").onclick=c=>{let _=!(f.getAttribute("data-is-code")==="true");f.setAttribute("data-is-code",String(_)),f.style.fontFamily=_?"'Roboto Mono', monospace":"inherit",f.style.background=_?"#F8F9FA":"#fff",c.currentTarget.classList.toggle("active",_),f.focus()},g.querySelector(".cw-tb-img").onclick=async()=>{let c=await Za(he("imageUrlPrompt"));c&&(document.execCommand("insertImage",!1,c),f.querySelectorAll("img").forEach(S=>{S.style.maxWidth="100%",S.style.borderRadius="8px"}))},f.onpaste=c=>{let S=(c.clipboardData||c.originalEvent.clipboardData).items;for(let _ of S)if(_.kind==="file"&&_.type.startsWith("image/")){c.preventDefault();let m=new FileReader;m.onload=b=>{document.execCommand("insertHTML",!1,`<img src="${b.target.result}" style="max-width:100%;border-radius:8px;margin:8px 0;display:block;">`)},m.readAsDataURL(_.getAsFile())}},H.appendChild(g)}else f=document.createElement("input"),f.className="cw-lib-input",f.type="text",f.value=J||"";return f.id=`cw-lib-inp-${C}`,H.appendChild(f),H}function Z(C){let $=document.createElement("div");return $.textContent=C||"",$.innerHTML}N.addEventListener("input",C=>{o=C.target.value,v.classList.toggle("visible",o.length>0),Q()}),v.onclick=()=>{N.value="",o="",v.classList.remove("visible"),Q(),N.focus()};function q(){t=!Ze(r),Ve(t,r,"cw-btn-library"),t?(De(),Q()):(Me(),ae())}return Le(()=>{p&&(p.textContent=he("headerTitle"));let C=r.querySelector(".cw-help-title");C&&(C.textContent=he("headerTitle"));let $=r.querySelector(".cw-help-description");$&&($.textContent=he("headerDesc")),Fn.forEach(D=>{let H=document.querySelector(`#lib-tab-${D.id} .js-lib-tab-label`);H&&(H.textContent=he("tabs")[D.id])}),N.placeholder=he("searchPlaceholder"),U.title=he("newItem"),W.title=he("cancel");let J=E.querySelector(".js-lib-saving");J&&(J.textContent=he("saving")),Q()}),q}var Rd='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>',zd='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>',$d='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',Pd='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>';function Bd(e){if(document.getElementById("cw-shortcuts-styles"))return;let t=document.createElement("style");t.id="cw-shortcuts-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function nl(e,t){Bd(t);let a=document.createElement("div");a.className="cw-configs-section",a.innerHTML=`
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
    `;let o=a.querySelector(".js-sc-body"),i=a.querySelector(".js-sc-sort-toggle");i.onchange=async u=>{y.playClick(),await Re.setSortedByUsage(u.target.checked),s()};function n(u){let h=Ue[u.payload.subStatus],N=h?h.name:u.payload.subStatus,v=(u.payload.scenarios||[]).length,I=[u.payload.caseType.toUpperCase(),N,v===1?e("scOneScenario"):e("scNScenarios").replace("{n}",v)];return u.alias&&I.push(`"${u.alias}"`),I.join(" \xB7 ")}function r(u,h,N){if(u.textContent="",N){let v=document.createElement("span");v.className="cw-sc-warn",v.textContent=e("scBroken"),u.appendChild(v),u.appendChild(document.createTextNode(" \xB7 "))}u.appendChild(document.createTextNode(n(h)))}function s(){o.innerHTML="",i.checked=Re.isSortedByUsage();let u=Re.isSortedByUsage(),h=u?Re.list():Re.listRaw(),N=!u;if(!h.length){let I=document.createElement("div");I.className="cw-sc-empty",I.textContent=e("scEmpty"),o.appendChild(I)}h.forEach((I,z)=>{let U=pr(I),B=document.createElement("div");B.className="cw-sc-item"+(U.length?" broken":""),B.dataset.id=I.id,B.dataset.index=String(z),B.innerHTML=`
                ${N?`<button type="button" class="cw-sc-grip" aria-label="${e("scReorder")}">${zd}</button>`:""}
                <span class="cw-sc-bolt">${Rd}</span>
                <span class="cw-sc-text">
                    <span class="cw-sc-label"></span>
                    <span class="cw-sc-meta"></span>
                </span>
                <button type="button" class="cw-sc-iconbtn js-sc-edit" aria-label="${e("scEdit")}">${$d}</button>
                <button type="button" class="cw-sc-iconbtn danger js-sc-del" aria-label="${e("scDelete")}">${Pd}</button>
            `;let x=B.querySelector(".cw-sc-label");x.textContent=I.label,x.title=I.label,r(B.querySelector(".cw-sc-meta"),I,U.length>0),B.querySelector(".js-sc-edit").onclick=()=>A(I),B.querySelector(".js-sc-del").onclick=()=>l(I),N&&p(B,z,h.length),o.appendChild(B)});let v=document.createElement("button");v.type="button",v.className="cw-sc-add",v.textContent=e("scAdd"),v.disabled=h.length>=_t,v.disabled&&(v.textContent=e("scLimit").replace("{max}",_t)),v.onclick=()=>A(null),o.appendChild(v)}async function l(u){await Ye(e("scDeleteConfirm").replace("{name}",u.label),{danger:!0})&&(await Re.remove(u.id),y.playClick(),s())}function p(u,h,N){let v=u.querySelector(".cw-sc-grip");u.draggable=!0;let I=!1;v.onmousedown=()=>{I=!0},u.onmouseup=()=>{I=!1},v.onkeydown=async z=>{let U=z.key==="ArrowUp"?-1:z.key==="ArrowDown"?1:0;if(!U)return;z.preventDefault();let B=h+U;if(B<0||B>=N)return;await Re.reorder(u.dataset.id,B),y.playClick(),s();let x=o.querySelector(`.cw-sc-item[data-id="${u.dataset.id}"] .cw-sc-grip`);x&&x.focus()},u.ondragstart=z=>{if(!I){z.preventDefault();return}z.dataTransfer.effectAllowed="move",z.dataTransfer.setData("text/plain",u.dataset.id),u.classList.add("dragging")},u.ondragend=()=>{u.classList.remove("dragging"),I=!1,o.querySelectorAll(".drop-target").forEach(z=>z.classList.remove("drop-target"))},u.ondragover=z=>{z.preventDefault(),u.classList.add("drop-target")},u.ondragleave=()=>u.classList.remove("drop-target"),u.ondrop=async z=>{z.preventDefault(),u.classList.remove("drop-target");let U=z.dataTransfer.getData("text/plain");!U||U===u.dataset.id||(await Re.reorder(U,Number(u.dataset.index)),y.playClick(),s())}}function d(){let u=[];for(let h in Ue){let N=Ue[h].status;N&&!u.includes(N)&&u.push(N)}return u}function A(u){let N=!!u?JSON.parse(JSON.stringify(u)):{id:qa(),kind:"note",label:"",alias:"",payload:{caseType:"bau",status:"",subStatus:"",scenarios:[]}};o.innerHTML="";let v=document.createElement("div");v.style.cssText="display: flex; flex-direction: column; gap: 14px;",v.innerHTML=`
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
        `,o.appendChild(v);let I=v.querySelector("#cw-sc-name"),z=v.querySelector("#cw-sc-alias"),U=v.querySelector("#cw-sc-type"),B=v.querySelector("#cw-sc-status"),x=v.querySelector("#cw-sc-sub"),K=v.querySelector(".js-sc-scenarios");I.value=N.label,z.value=N.alias,U.value=N.payload.caseType,B.innerHTML='<option value="">\u2014</option>'+d().map(k=>`<option value="${k}">${k}</option>`).join(""),B.value=N.payload.status;function W(){let k=B.value;x.innerHTML='<option value="">\u2014</option>';for(let T in Ue){if(Ue[T].status!==k)continue;let E=document.createElement("option");E.value=T,E.textContent=Ue[T].name,x.appendChild(E)}x.disabled=!k}function X(){if(K.innerHTML="",!x.value){K.innerHTML=`<div class="cw-configs-desc">${e("scPickSubStatus")}</div>`;return}let k=to(x.value,U.value);if(!k.length){K.innerHTML=`<div class="cw-configs-desc">${e("scNoScenarios")}</div>`;return}k.forEach(([T])=>{let E=document.createElement("button");E.type="button",E.className="cw-sc-chip",E.textContent=ao(T,x.value);let R=()=>N.payload.scenarios.some(V=>V.id===T);E.classList.toggle("on",R()),E.onclick=()=>{R()?N.payload.scenarios=N.payload.scenarios.filter(V=>V.id!==T):N.payload.scenarios.push({id:T,substatus:x.value}),E.classList.toggle("on",R()),y.playClick()},K.appendChild(E)})}W(),x.value=N.payload.subStatus,X(),B.onchange=()=>{N.payload.scenarios=[],W(),x.value="",X()},x.onchange=()=>{N.payload.scenarios=[],X()},U.onchange=()=>{N.payload.scenarios=[],X()},v.querySelector(".cw-sc-cancel").onclick=()=>{y.playClick(),s()};let O=v.querySelector(".cw-sc-save");O.onclick=async()=>{if(!x.value){y.playError(),te(e("scPickSubStatus"),{error:!0});return}let k=O.textContent;O.disabled=!0,O.textContent=e("scSaving");let T=I.value.trim()||Ue[x.value].name,E=await Re.save({...N,label:T,alias:z.value.trim(),payload:{...N.payload,caseType:U.value,status:B.value||String(x.value).split("_")[0],subStatus:x.value}});if(!E.ok){O.disabled=!1,O.textContent=k,y.playError(),te(e("scLimit").replace("{max}",_t),{error:!0});return}y.playSuccess(),te(E.synced?e("scSaved"):e("scSavedLocal")),s()}}return a.refresh=s,a.applyTexts=()=>{a.querySelector(".js-sc-title").textContent=e("scSectionTitle"),a.querySelector(".js-sc-sort-label").textContent=e("scSortLabel"),a.querySelector(".js-sc-sort-desc").textContent=e("scSortDesc"),s()},s(),a}var Gd={pt:{title:"Configura\xE7\xF5es",headerDesc:"Personalize sua experi\xEAncia e prefer\xEAncias.",profileNotFound:"Perfil n\xE3o localizado na base de dados.",consultant:"Consultor",overheadBadge:"Gest\xE3o / Overhead",soundSectionTitle:"Prefer\xEAncias de Som",soundLabel:"Efeitos Sonoros",soundDesc:"Ativar ou desativar sons de interface.",langSectionTitle:"Idioma da Interface",langLabel:"Idioma",langDesc:"Escolha o idioma dos menus, bot\xF5es e mensagens do Case Wizard.",outLangLabel:"Idioma do Atendimento",outLangDesc:"Idioma do case note, do e-mail e do roteiro de chamada. \xC9 o idioma do anunciante, n\xE3o o seu.",supportSectionTitle:"Suporte & Feedback",docsLink:"Abrir a documenta\xE7\xE3o",reportBug:"Reportar Bug/Sugest\xF5es",diagSectionTitle:"Diagn\xF3stico",diagLabel:"Ambiente do backend",diagDesc:"Qual implanta\xE7\xE3o do Apps Script este bundle usa. O sufixo tem de bater com o do dashboard.",scSectionTitle:"Meus Atalhos (Ctrl+K)",scSortLabel:"Ordenar por frequ\xEAncia de uso",scSortDesc:"Desligue para definir voc\xEA mesmo a ordem, arrastando os atalhos.",scEmpty:"Voc\xEA ainda n\xE3o tem atalhos. Crie um aqui ou monte uma nota no Case Notes e clique em \u201CSalvar como atalho\u201D.",scAdd:"+ Criar atalho",scLimit:"Limite de {max} atalhos atingido",scEdit:"Editar atalho",scDelete:"Excluir atalho",scReorder:"Reordenar (arraste ou use as setas)",scDeleteConfirm:"Excluir o atalho \u201C{name}\u201D?",scBroken:"\u26A0 cen\xE1rio indispon\xEDvel",scOneScenario:"1 cen\xE1rio",scNScenarios:"{n} cen\xE1rios",scName:"Nome",scNamePlaceholder:"Ex: Fim do 2 Day Rule",scAlias:"Apelido de busca",scAliasPlaceholder:"Ex: 2day",scAliasDesc:"Palavra que encontra este atalho no Ctrl+K, al\xE9m do nome.",scFlow:"Fluxo",scStatus:"Status",scSubStatus:"Substatus",scScenarios:"Cen\xE1rios",scScenariosDesc:"Opcional: sem nenhum, o atalho s\xF3 abre a nota j\xE1 no substatus certo.",scPickSubStatus:"Escolha um substatus primeiro.",scNoScenarios:"Nenhum cen\xE1rio dispon\xEDvel para esta combina\xE7\xE3o.",scCancel:"Cancelar",scSave:"Salvar",scSaving:"Salvando\u2026",scSaved:"Atalho salvo!",scSavedLocal:"Atalho salvo neste navegador (sem conex\xE3o com a nuvem)."},es:{title:"Configuraci\xF3n",headerDesc:"Personaliza tu experiencia y tus preferencias.",profileNotFound:"Perfil no encontrado en la base de datos.",consultant:"Consultor",overheadBadge:"Gesti\xF3n / Overhead",soundSectionTitle:"Preferencias de Sonido",soundLabel:"Efectos de Sonido",soundDesc:"Activar o desactivar los sonidos de la interfaz.",langSectionTitle:"Idioma de la Interfaz",langLabel:"Idioma",langDesc:"Elige el idioma de los men\xFAs, botones y mensajes del Case Wizard.",outLangLabel:"Idioma de la Atenci\xF3n",outLangDesc:"Idioma del case note, del correo y del guion de llamada. Es el idioma del anunciante, no el tuyo.",supportSectionTitle:"Soporte y Comentarios",docsLink:"Abrir la documentaci\xF3n",reportBug:"Reportar error o sugerencia",diagSectionTitle:"Diagn\xF3stico",diagLabel:"Entorno del backend",diagDesc:"Qu\xE9 implementaci\xF3n de Apps Script usa este bundle. El sufijo debe coincidir con el del panel.",scSectionTitle:"Mis Atajos (Ctrl+K)",scSortLabel:"Ordenar por frecuencia de uso",scSortDesc:"Desact\xEDvalo para definir t\xFA mismo el orden, arrastrando los atajos.",scEmpty:"Todav\xEDa no tienes atajos. Crea uno aqu\xED o arma una nota en Case Notes y haz clic en \u201CGuardar como atajo\u201D.",scAdd:"+ Crear atajo",scLimit:"L\xEDmite de {max} atajos alcanzado",scEdit:"Editar atajo",scDelete:"Eliminar atajo",scReorder:"Reordenar (arrastra o usa las flechas)",scDeleteConfirm:"\xBFEliminar el atajo \u201C{name}\u201D?",scBroken:"\u26A0 escenario no disponible",scOneScenario:"1 escenario",scNScenarios:"{n} escenarios",scName:"Nombre",scNamePlaceholder:"Ej: Fin del 2 Day Rule",scAlias:"Apodo de b\xFAsqueda",scAliasPlaceholder:"Ej: 2day",scAliasDesc:"Palabra que encuentra este atajo en el Ctrl+K, adem\xE1s del nombre.",scFlow:"Flujo",scStatus:"Estado",scSubStatus:"Subestado",scScenarios:"Escenarios",scScenariosDesc:"Opcional: sin ninguno, el atajo solo abre la nota ya en el subestado correcto.",scPickSubStatus:"Elige un subestado primero.",scNoScenarios:"Ning\xFAn escenario disponible para esta combinaci\xF3n.",scCancel:"Cancelar",scSave:"Guardar",scSaving:"Guardando\u2026",scSaved:"\xA1Atajo guardado!",scSavedLocal:"Atajo guardado en este navegador (sin conexi\xF3n con la nube)."},en:{title:"Settings",headerDesc:"Customize your experience and preferences.",profileNotFound:"Profile not found in the database.",consultant:"Consultant",overheadBadge:"Management / Overhead",soundSectionTitle:"Sound Preferences",soundLabel:"Sound Effects",soundDesc:"Turn interface sounds on or off.",langSectionTitle:"Interface Language",langLabel:"Language",langDesc:"Choose the language of Case Wizard's menus, buttons and messages.",outLangLabel:"Case Language",outLangDesc:"Language of the case note, the email and the call script. This is the advertiser's language, not yours.",supportSectionTitle:"Support & Feedback",docsLink:"Open the documentation",reportBug:"Report a Bug/Suggestion",diagSectionTitle:"Diagnostics",diagLabel:"Backend environment",diagDesc:"Which Apps Script deployment this bundle uses. The suffix must match the dashboard's.",scSectionTitle:"My Shortcuts (Ctrl+K)",scSortLabel:"Sort by usage frequency",scSortDesc:"Turn this off to set the order yourself by dragging the shortcuts.",scEmpty:"You don\u2019t have any shortcuts yet. Create one here, or build a note in Case Notes and click \u201CSave as shortcut\u201D.",scAdd:"+ Create shortcut",scLimit:"Limit of {max} shortcuts reached",scEdit:"Edit shortcut",scDelete:"Delete shortcut",scReorder:"Reorder (drag or use the arrows)",scDeleteConfirm:"Delete the shortcut \u201C{name}\u201D?",scBroken:"\u26A0 scenario unavailable",scOneScenario:"1 scenario",scNScenarios:"{n} scenarios",scName:"Name",scNamePlaceholder:"e.g.: End of 2 Day Rule",scAlias:"Search alias",scAliasPlaceholder:"e.g.: 2day",scAliasDesc:"A word that finds this shortcut in Ctrl+K, in addition to the name.",scFlow:"Flow",scStatus:"Status",scSubStatus:"Substatus",scScenarios:"Scenarios",scScenariosDesc:"Optional: with none selected, the shortcut just opens the note already on the right substatus.",scPickSubStatus:"Choose a substatus first.",scNoScenarios:"No scenario available for this combination.",scCancel:"Cancel",scSave:"Save",scSaving:"Saving\u2026",scSaved:"Shortcut saved!",scSavedLocal:"Shortcut saved in this browser (no cloud connection)."}};function il(){let e=Zt(Gd),t="v1.1",a=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0",warnBorder:"#F9AB00",warnBg:"#FFFBF0",warnText:"#B06000"},i="cw-configs-styles";if(!document.getElementById(i)){let E=document.createElement("style");E.id=i,E.innerHTML=`
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
        `,document.head.appendChild(E)}let n=document.createElement("div");n.id="configs-popup",n.classList.add("cw-module-window"),Object.assign(n.style,Qe,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let r={popup:n},s=He(n,e("title"),t,e("headerDesc"),r,()=>T());n.appendChild(s);let l=s.querySelector("span"),p=document.createElement("div");p.className="cw-configs-container",n.appendChild(p);let d=document.createElement("div");d.className="cw-profile-card",d.id="cw-user-profile-section",d.style.display="none",p.appendChild(d);let A;function u(E,R){if(A={ldap:E,profile:R},!R){d.innerHTML=`
                <div class="cw-profile-avatar" style="background: #e8eaed; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #5f6368; font-weight: bold;">
                    ${E.charAt(0).toUpperCase()}
                </div>
                <div class="cw-profile-info">
                    <h2 class="cw-profile-ldap">@${E}</h2>
                    <div class="cw-profile-badges">
                        <span class="cw-profile-badge">${e("consultant")}</span>
                    </div>
                    <div style="font-size: 12px; color: ${o.textSub}; margin-top: 4px;">
                        ${e("profileNotFound")}
                    </div>
                </div>
            `;return}d.innerHTML=`
        <img src="https://moma-teams-photos.corp.google.com/photos/${E}?sz=600&type=PLUS"
             class="cw-profile-avatar" alt="User Photo"
             onerror="this.style.display='none'">
        <div class="cw-profile-info">
            <h2 class="cw-profile-ldap">@${R.ldap}</h2>
            <div class="cw-profile-badges">
                <span class="cw-profile-badge">${R.roleCategory||"N/A"}</span>
                <span class="cw-profile-badge">${R.segment||"N/A"}</span>
                <span class="cw-profile-badge">${R.defaultLanguage||"N/A"}</span>
                ${R.isOverhead?`<span class="cw-profile-badge overhead">${e("overheadBadge")}</span>`:""}
            </div>
            <div style="font-size: 12px; color: ${o.textSub}; margin-top: 4px;">
                ${R.role||""}
            </div>
        </div>
    `}async function h(){d.style.display="flex",d.innerHTML=`
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
        `,(async()=>{try{ze()||await Ca();let E=ze(),R=E?E.split("@")[0]:"user",V=await ta(R);u(R,V)}catch(E){console.warn("Erro ao renderizar perfil:",E),d.style.display="none"}})()}h();let N=document.createElement("div");if(N.className="cw-configs-section",N.innerHTML=`
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
    `,!document.getElementById("cw-lang-toggle-styles")){let E=document.createElement("style");E.id="cw-lang-toggle-styles",E.innerHTML=`
            .cw-lang-toggle { display: flex; border: 1px solid ${o.border}; border-radius: 8px; overflow: hidden; flex-shrink: 0; }
            .cw-lang-toggle button {
                border: none; background: white; padding: 8px 14px; font-size: 12px; font-weight: 700;
                cursor: pointer; color: ${o.textSub}; font-family: inherit; transition: all 0.2s;
            }
            .cw-lang-toggle button:not(:last-child) { border-right: 1px solid ${o.border}; }
            .cw-lang-toggle button.active { background: ${o.primary}; color: #fff; }
            .cw-lang-toggle button:hover:not(.active) { background: #f1f3f4; }
        `,document.head.appendChild(E)}let v=N.querySelector("#cw-config-lang-toggle"),I=N.querySelector("#cw-config-outlang-toggle");function z(){v.querySelectorAll("button").forEach(E=>{E.classList.toggle("active",E.dataset.lang===se())}),I.querySelectorAll("button").forEach(E=>{E.classList.toggle("active",E.dataset.lang===ct())})}z(),v.querySelectorAll("button").forEach(E=>{E.onclick=()=>{ha(E.dataset.lang),y.playClick()}}),I.querySelectorAll("button").forEach(E=>{E.onclick=()=>{No(E.dataset.lang),z(),y.playClick()}}),p.appendChild(N);let U=nl(e,o);p.appendChild(U);let B=document.createElement("div");B.className="cw-configs-section",B.innerHTML=`
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
    `;let x=B.querySelector("#cw-config-sound-toggle");x.onchange=E=>{y.setMuted(!E.target.checked),E.target.checked&&y.playClick()},p.appendChild(B);let K=document.createElement("div");K.className="cw-configs-section",K.innerHTML=`
        <div class="cw-configs-section-title js-support-section-title"></div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn js-docs-link" href="${Qa}" target="_blank" rel="noopener noreferrer"></a>
                <a class="cw-configs-btn js-support-link" href="${oa}" target="_blank" rel="noopener noreferrer"></a>
            </div>
        </div>
    `,p.appendChild(K);let W=ea(),X=document.createElement("div");X.className="cw-configs-section",X.innerHTML=`
        <div class="cw-configs-section-title js-diag-section-title"></div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label js-diag-label"></div>
                    <div class="cw-configs-desc js-diag-desc"></div>
                </div>
                <div class="cw-env-chip ${W.isDev?"is-dev":"is-prod"}"></div>
            </div>
        </div>
    `,X.querySelector(".cw-env-chip").textContent=`${W.isDev?"DEV":"PROD"} \xB7 \u2026${W.fingerprint}`,p.appendChild(X);let O=document.createElement("style");O.innerHTML=`
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
    `,X.appendChild(O);function k(){A&&u(A.ldap,A.profile),N.querySelector(".js-lang-section-title").textContent=e("langSectionTitle"),N.querySelector(".js-lang-label").textContent=e("langLabel"),N.querySelector(".js-lang-desc").textContent=e("langDesc"),N.querySelector(".js-outlang-label").textContent=e("outLangLabel"),N.querySelector(".js-outlang-desc").textContent=e("outLangDesc"),z(),U.applyTexts(),B.querySelector(".js-sound-section-title").textContent=e("soundSectionTitle"),B.querySelector(".js-sound-label").textContent=e("soundLabel"),B.querySelector(".js-sound-desc").textContent=e("soundDesc"),K.querySelector(".js-support-section-title").textContent=e("supportSectionTitle"),K.querySelector(".js-docs-link").textContent=e("docsLink"),K.querySelector(".js-support-link").textContent=e("reportBug"),X.querySelector(".js-diag-section-title").textContent=e("diagSectionTitle"),X.querySelector(".js-diag-label").textContent=e("diagLabel"),X.querySelector(".js-diag-desc").textContent=e("diagDesc"),l&&(l.textContent=e("title"));let E=n.querySelector(".cw-help-title");E&&(E.textContent=e("title"));let R=n.querySelector(".cw-help-description");R&&(R.textContent=e("headerDesc"))}k(),Le(k),Qt(z);function T(){a=!Ze(n),Ve(a,n,"cw-btn-configs"),a?(U.refresh(),De(),y.playClick()):Me()}return document.body.appendChild(n),T}var Xe={blue:"#1A73E8",red:"#D93025",yellow:"#F9AB00",green:"#1E8E3E",blueLight:"#E8F0FE",redLight:"#FCE8E6",yellowLight:"#FEF7E0",greenLight:"#E6F4EA",textPrimary:"#202124",textSecondary:"#5F6368",border:"#DADCE0",surface:"rgba(255, 255, 255, 0.8)",white:"#FFFFFF"};var Ht="cubic-bezier(0.4, 0, 0.2, 1)",Ib=`all 0.3s ${Ht}`,rl=()=>{if(document.getElementById("bau-form-global-styles"))return;let e=document.createElement("style");e.id="bau-form-global-styles",e.textContent=`
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
      z-index: ${je.MODULE_RESTING};
      
      background: #FFFFFF; 
      display: flex;
      flex-direction: column;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 12px 40px rgba(0,0,0,0.12);
      border: 1px solid #DADCE0;
      
      transform-origin: center center;
      animation: cw-genie-effect-in 0.4s ${Ht};
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
    .bau-metrics-refresh-btn:focus-visible { outline: 2px solid ${Xe.blue}; outline-offset: 2px; }
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
      transition-timing-function: ${Ht};
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
        animation: bauAuraCombined 5s ${Ht} 0.2s infinite;
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
        color: ${Xe.green};
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
        animation: bauCheckDraw 0.55s ${Ht} 0.75s forwards;
    }

    .bau-success-view.active .bau-success-title {
        font-size: 24px;
        font-weight: 500;
        color: #202124;
        margin: 0 0 8px 0;
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${Ht} 0.85s forwards;
    }

    .bau-success-view.active .bau-success-subtitle {
        font-size: 15px;
        color: #5F6368;
        margin-bottom: 36px;
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${Ht} 0.95s forwards;
    }

    .bau-success-view.active #bau-success-back-btn {
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${Ht} 1.05s forwards;
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
    .bau-rescan-btn:hover { color: ${Xe.blue}; background: #FFFFFF; }
    .bau-rescan-btn:focus-visible { outline: 2px solid ${Xe.blue}; outline-offset: 2px; }
    .bau-rescan-btn.spinning { cursor: default; color: ${Xe.blue}; }
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
      box-shadow: inset 0 0 0 2px ${Xe.blue};
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
    .bau-mini-btn-input:focus-visible { outline: 2px solid ${Xe.blue}; outline-offset: 2px; }

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
    .bau-md-copy:hover { background: #E8F0FE; color: ${Xe.blue}; }
    .bau-md-copy:focus-visible { outline: 2px solid ${Xe.blue}; outline-offset: 2px; }
    .bau-md-copy.is-done { opacity: 1; color: ${Xe.green}; }

    /* Card selecionado na lista: sem isso o agente perde de vista qual caso o
       painel da direita esta mostrando assim que a lista rola. */
    /* Acento numa aresta, nao moldura em volta: diz "e este" sem desenhar mais
       uma caixa. */
    .bau-case-card.is-selected {
      background: #E8F0FE;
      box-shadow: inset 3px 0 0 ${Xe.blue};
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

    .bau-mini-btn-input:hover { background: #E8F0FE; color: ${Xe.blue}; }

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
  `,document.head.appendChild(e)};function ll(){return Object.values(Pe).map(e=>String(e?.name||"").trim()).filter(Boolean)}var sl=[{value:"PT-BR",text:"Portugu\xEAs (PT-BR)"},{value:"ES",text:"Espanhol (ES)"},{value:"EN",text:"Ingl\xEAs (EN)"}],Mt={steps:[{id:0,title:"Selecione o tipo de atendimento",isBranching:!0},{id:1,title:"Contexto e Valida\xE7\xE3o",fields:[{id:"advName",name:"advName",label:"Nome do Anunciante",type:"text",placeholder:"Nome do Anunciante",required:!0,isSmart:!0},{id:"advLastName",name:"advLastName",label:"Sobrenome do Anunciante",type:"text",placeholder:"Sobrenome do Anunciante",required:!1,isSmart:!0},{id:"advPhone",name:"advPhone",label:"Telefone do Anunciante",type:"text",placeholder:"+55 11 90000-0000",required:!1,isSmart:!0},{id:"advEmail",name:"advEmail",label:"Email do Anunciante",type:"text",placeholder:"email@exemplo.com",required:!0,isSmart:!0,validation:{regex:"^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",error:"Formato de email inv\xE1lido"}},{id:"cid",name:"cid",label:"CID",type:"text",placeholder:"000-000-0000",required:!0,isSmart:!0,tooltip:"Use o formato 000-000-0000 ou 10 d\xEDgitos",validation:{regex:"^(\\d{3}-\\d{3}-\\d{4}|\\d{10})$",error:"Formato de CID incorreto"}},{id:"amName",name:"amName",label:"Account Manager (AM)",type:"text",placeholder:"am@google.com",required:!0,isSmart:!0,validation:{regex:"^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",error:"Informe o e-mail do AM (ex.: am@google.com)"}},{id:"website",name:"website",label:"Website",type:"text",placeholder:"https://www.exemplo.com",required:!0,isSmart:!0},{id:"seId",name:"seId",label:"Speakeasy ID (SE ID)",type:"text-with-button",placeholder:"Speakeasy ID",required:!1,isSmart:!0,button:{id:"bau-top-se-search",icon:"wand",title:"Buscar ID automaticamente"}},{id:"language",name:"language",label:"Idioma do Atendimento",type:"select",required:!0,tooltip:"Vem do seu segmento na planilha People. Troque s\xF3 quando este caso fugir da regra.",options:sl}]},{id:2,title:"Tasks",fields:[{id:"reason",name:"reason",label:"O que deve ser feito em BAU",type:"textarea",placeholder:"Descreva as a\xE7\xF5es esperadas...",required:!0,style:{minHeight:"80px"}},{id:"taskType",name:"taskType",label:"Tasks para BAU (Selecione 1 ou mais)",type:"checkbox-grid",required:!0,tooltip:"Selecione os tipos de implementa\xE7\xE3o t\xE9cnica"}]},{id:3,title:"Justificativa e Agendamento",fields:[{id:"nonImplementationReason",name:"nonImplementationReason",label:"Motivo da N\xE3o Implementa\xE7\xE3o (Justificativa BAU)",type:"select",required:!0,options:[{value:"",text:"Selecione um motivo..."},{value:"Tempo da consultoria esgotado",text:"Tempo da consultoria esgotado"},{value:"Solicita\xE7\xE3o de reagendamento pelo anunciante",text:"Solicita\xE7\xE3o de reagendamento pelo anunciante"},{value:"Falta de acessos ou backup do site",text:"Falta de acessos ou backup do site"},{value:"Anunciante indispon\xEDvel ou n\xE3o preparado",text:"Anunciante indispon\xEDvel ou n\xE3o preparado"},{value:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)",text:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"},{value:"Solicita\xE7\xE3o de tarefas (tasks) adicionais",text:"Solicita\xE7\xE3o de tarefas (tasks) adicionais"},{value:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)",text:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"},{value:"Retorno de contato ap\xF3s prazo de 14 dias expirado",text:"Retorno de contato ap\xF3s prazo de 14 dias expirado"}]},{id:"description",i18nKey:"description_justificativa",name:"description",label:"Justificativa / Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva detalhadamente o que precisa ser feito...",required:!0},{id:"availability",name:"availability",label:"Disponibilidade (m\xEDnimo 1 op\xE7\xE3o)",type:"datetime-group",required:!0,fields:[{name:"availability_1",label:"Op\xE7\xE3o 1 (Prioridade)",required:!0},{name:"availability_2",label:"Op\xE7\xE3o 2 (Opcional)",required:!1},{name:"availability_3",label:"Op\xE7\xE3o 3 (Opcional)",required:!1}]},{id:"suggestDiscard",name:"suggestDiscard",label:"O caso deve ser descartado pelo TL?",type:"select",required:!1,options:[{value:"N\xE3o",text:"N\xE3o"},{value:"Sim",text:"Sim"}]}]},{id:4,title:"Confirma\xE7\xE3o",isConfirmation:!0},{id:5,title:"Solicitar Descarte",fields:[{id:"caseId",name:"caseId",label:"Case ID",type:"text",placeholder:"Case ID",required:!0,isSmart:!0},{id:"language",i18nKey:"language_descarte",name:"language",label:"Idioma do Atendimento",type:"select",required:!0,options:sl},{id:"seId",i18nKey:"seId_descarte",name:"seId",label:"Speakeasy ID (SE ID)",type:"text-with-button",placeholder:"Speakeasy ID",required:!0,isSmart:!0,button:{id:"bau-discard-se-search",icon:"wand",title:"Buscar ID automaticamente"}},{id:"description",i18nKey:"description_descarte",name:"description",label:"Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva o motivo do descarte...",required:!0},{id:"discardReason",name:"reason",label:"Motivo do Descarte",type:"select",required:!0,groups:[{label:"Live Appointments",options:[{value:"Caso Filho gerado no atendimento",text:"Caso Filho gerado no atendimento"},{value:"3\xAA Tentativa de contato sem sucesso",text:"3\xAA Tentativa de contato sem sucesso"}]},{label:"Live Meet",options:[{value:"Apenas o AM presente",text:"Apenas o AM presente"},{value:"Estouro de tempo para conclus\xE3o",text:"Estouro de tempo para conclus\xE3o"},{value:"Gera\xE7\xE3o de caso BAU (Reagendamento)",text:"Gera\xE7\xE3o de caso BAU (Reagendamento)"}]}]}]}]};var jd={advName:{label:"Nombre del Anunciante",placeholder:"Nombre del Anunciante"},advLastName:{label:"Apellido del Anunciante",placeholder:"Apellido del Anunciante"},advPhone:{label:"Tel\xE9fono del Anunciante",placeholder:"+55 11 90000-0000"},advEmail:{label:"Email del Anunciante",placeholder:"email@ejemplo.com",error:"Formato de correo inv\xE1lido"},cid:{label:"CID",placeholder:"000-000-0000",tooltip:"Usa el formato 000-000-0000 o 10 d\xEDgitos",error:"Formato de CID incorrecto"},amName:{label:"Account Manager (AM)",placeholder:"am@google.com",error:"Informa el correo del AM (ej.: am@google.com)"},website:{label:"Website",placeholder:"https://www.ejemplo.com"},seId:{label:"Speakeasy ID (SE ID)",placeholder:"Speakeasy ID",buttonTitle:"Buscar ID autom\xE1ticamente"},seId_descarte:{label:"Speakeasy ID (SE ID)",placeholder:"Speakeasy ID",buttonTitle:"Buscar ID autom\xE1ticamente"},reason:{label:"Qu\xE9 debe hacerse en BAU",placeholder:"Describe las acciones esperadas..."},taskType:{label:"Tareas para BAU (Selecciona 1 o m\xE1s)",tooltip:"Selecciona los tipos de implementaci\xF3n t\xE9cnica"},nonImplementationReason:{label:"Motivo de la No Implementaci\xF3n (Justificaci\xF3n BAU)"},description_justificativa:{label:"Justificaci\xF3n / Descripci\xF3n",placeholder:"Describe detalladamente qu\xE9 se necesita hacer..."},availability:{label:"Disponibilidad (m\xEDnimo 1 opci\xF3n)"},availability_1:{label:"Opci\xF3n 1 (Prioridad)"},availability_2:{label:"Opci\xF3n 2 (Opcional)"},availability_3:{label:"Opci\xF3n 3 (Opcional)"},suggestDiscard:{label:"\xBFEl caso debe ser descartado por el TL?"},caseId:{label:"Case ID",placeholder:"Case ID"},language:{label:"Idioma de la Atenci\xF3n",tooltip:"Viene de tu segmento en la hoja People. C\xE1mbialo solo cuando este caso se salga de la regla."},language_descarte:{label:"Idioma de la Atenci\xF3n"},description_descarte:{label:"Descripci\xF3n",placeholder:"Describe el motivo del descarte..."},discardReason:{label:"Motivo del Descarte"}},Hd={advName:{label:"Advertiser Name",placeholder:"Advertiser Name"},advLastName:{label:"Advertiser Last Name",placeholder:"Advertiser Last Name"},advPhone:{label:"Advertiser Phone",placeholder:"+55 11 90000-0000"},advEmail:{label:"Advertiser Email",placeholder:"email@example.com",error:"Invalid email format"},cid:{label:"CID",placeholder:"000-000-0000",tooltip:"Use the format 000-000-0000 or 10 digits",error:"Incorrect CID format"},amName:{label:"Account Manager (AM)",placeholder:"am@google.com",error:"Enter the AM's email (e.g., am@google.com)"},website:{label:"Website",placeholder:"https://www.example.com"},seId:{label:"Speakeasy ID (SE ID)",placeholder:"Speakeasy ID",buttonTitle:"Look up ID automatically"},seId_descarte:{label:"Speakeasy ID (SE ID)",placeholder:"Speakeasy ID",buttonTitle:"Look up ID automatically"},reason:{label:"What needs to be done in BAU",placeholder:"Describe the expected actions..."},taskType:{label:"Tasks for BAU (Select 1 or more)",tooltip:"Select the types of technical implementation"},nonImplementationReason:{label:"Reason for Non-Implementation (BAU Justification)"},description_justificativa:{label:"Justification / Description",placeholder:"Describe in detail what needs to be done..."},availability:{label:"Availability (at least 1 option)"},availability_1:{label:"Option 1 (Priority)"},availability_2:{label:"Option 2 (Optional)"},availability_3:{label:"Option 3 (Optional)"},suggestDiscard:{label:"Should the case be discarded by the TL?"},caseId:{label:"Case ID",placeholder:"Case ID"},language:{label:"Support Language",tooltip:"Comes from your segment in the People sheet. Change it only when this case is an exception to the rule."},language_descarte:{label:"Support Language"},description_descarte:{label:"Description",placeholder:"Describe the reason for the discard..."},discardReason:{label:"Discard Reason"}},Ud={"Selecione um motivo...":"Selecciona un motivo...","Tempo da consultoria esgotado":"Tiempo de la consultor\xEDa agotado","Solicita\xE7\xE3o de reagendamento pelo anunciante":"Solicitud de reprogramaci\xF3n por parte del anunciante","Falta de acessos ou backup do site":"Falta de accesos o copia de seguridad del sitio","Anunciante indispon\xEDvel ou n\xE3o preparado":"Anunciante no disponible o no preparado","Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)":"Implementaci\xF3n parcial (no todas las tareas completadas)","Solicita\xE7\xE3o de tarefas (tasks) adicionais":"Solicitud de tareas adicionales","Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)":"Necesidad de nuevos cambios (fase de seguimiento)","Retorno de contato ap\xF3s prazo de 14 dias expirado":"Retorno de contacto despu\xE9s de vencido el plazo de 14 d\xEDas","Caso Filho gerado no atendimento":"Caso Hijo generado en la atenci\xF3n","3\xAA Tentativa de contato sem sucesso":"3.\xBA intento de contacto sin \xE9xito","Apenas o AM presente":"Solo el AM presente","Estouro de tempo para conclus\xE3o":"Tiempo excedido para la conclusi\xF3n","Gera\xE7\xE3o de caso BAU (Reagendamento)":"Generaci\xF3n de caso BAU (Reprogramaci\xF3n)",Sim:"S\xED",N\u00E3o:"No","Portugu\xEAs (PT-BR)":"Portugu\xE9s (PT-BR)","Espanhol (ES)":"Espa\xF1ol (ES)","Ingl\xEAs (EN)":"Ingl\xE9s (EN)"},Vd={"Selecione um motivo...":"Select a reason...","Tempo da consultoria esgotado":"Consultation time ran out","Solicita\xE7\xE3o de reagendamento pelo anunciante":"Reschedule requested by the advertiser","Falta de acessos ou backup do site":"Missing access or site backup","Anunciante indispon\xEDvel ou n\xE3o preparado":"Advertiser unavailable or not prepared","Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)":"Partial implementation (not all tasks completed)","Solicita\xE7\xE3o de tarefas (tasks) adicionais":"Request for additional tasks","Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)":"Need for new changes (follow-up phase)","Retorno de contato ap\xF3s prazo de 14 dias expirado":"Contact follow-up after the 14-day deadline expired","Caso Filho gerado no atendimento":"Child Case generated during support","3\xAA Tentativa de contato sem sucesso":"3rd contact attempt unsuccessful","Apenas o AM presente":"Only the AM present","Estouro de tempo para conclus\xE3o":"Time overrun for completion","Gera\xE7\xE3o de caso BAU (Reagendamento)":"BAU case generation (Reschedule)",Sim:"Yes",N\u00E3o:"No","Portugu\xEAs (PT-BR)":"Portuguese (PT-BR)","Espanhol (ES)":"Spanish (ES)","Ingl\xEAs (EN)":"English (EN)"},Wd={es:jd,en:Hd},Yd={es:Ud,en:Vd};function Kd(e){return e?.i18nKey||e?.id||e?.name}function rt(e,t){let a=e?.[t];return Wd[se()]?.[Kd(e)]?.[t]??a}function lt(e){return Yd[se()]?.[e]??e}var Xd=(()=>{let e=[];for(let t=420;t<=1260;t+=30)e.push(String(Math.floor(t/60)).padStart(2,"0")+":"+String(t%60).padStart(2,"0"));return e})(),cl={pt:{statusPending:"Aguardando TL",statusApproved:"Aprovado / Criado",statusKeptActive:"Mantido ativo pelo TL",statusDiscarded:"Descartado pelo TL",statusCreationRejected:"Recusado pelo TL",statusCanceled:"Cancelado",statusDefault:"Pendente",timezoneWarningStrong:"Aten\xE7\xE3o:",timezoneWarningText:"Para clientes fora do fuso hor\xE1rio do Brasil, o hor\xE1rio inserido deve corresponder sempre ao hor\xE1rio local do cliente, e n\xE3o ao do agente.",checkTimezone:"Consultar Time Zone",timezoneModuleNotFound:"M\xF3dulo Time Zone n\xE3o encontrado.",headerTitle:"BAU Central",headerDesc:"Dashboard de Casos BAU",openBauCase:"Abrir caso para BAU",openBauCaseDesc:"Fluxo completo para implementa\xE7\xF5es t\xE9cnicas e suporte especializado.",requestDiscard:"Solicitar Descarte",requestDiscardDesc:"Fluxo simplificado para casos que n\xE3o requerem implementa\xE7\xE3o.",back:"Voltar",next:"Pr\xF3ximo",configuringEdit:"Configurando Edi\xE7\xE3o...",loadDashboardError:"Erro ao carregar Dashboard. Verifique sua conex\xE3o.",copiedToClipboard:"Copiado para a \xE1rea de transfer\xEAncia!",noAdditionalContext:"Nenhum contexto adicional fornecido pelo agente.",notCaptured:"N\xE3o capturado",none:"Nenhuma",language:"Idioma",lastName:"Sobrenome",phone:"Telefone",clientTimezone:"Fuso hor\xE1rio do cliente",echoEquivalence:(e,t,a)=>`<strong>${e}</strong> em ${t} equivale a <strong>${a}</strong> em Bras\xEDlia.`,echoSameZone:"O cliente est\xE1 no mesmo fuso que voc\xEA.",editPageWarning:"Aten\xE7\xE3o: Para editar as informa\xE7\xF5es, voc\xEA deve estar com a p\xE1gina deste Caso espec\xEDfico aberta no sistema. Caso contr\xE1rio, os dados capturados estar\xE3o incorretos.",onCorrectPage:"Estou na p\xE1gina correta",sending:"Enviando...",caseCreatedNoEmailConfirm:"Caso criado, mas n\xE3o conseguimos confirmar por email.",unknownError:"Erro desconhecido",newBauCase:"Novo Caso BAU",backToDashboard:"Voltar ao Dashboard",confirmDataBeforeSending:"Confirme os dados antes de enviar",submitToTl:"Enviar para o TL",saveChanges:"Salvar Altera\xE7\xF5es",editingCase:e=>`Editando Caso #${e}`,fillDetailsBelow:"Preencha os detalhes abaixo",caseSentSuccess:"Caso enviado com sucesso!",caseSentSuccessSub:"Sua solicita\xE7\xE3o foi recebida e ser\xE1 processada em breve.",genericErrorTitle:"Ops! Algo deu errado",genericErrorSub:"N\xE3o conseguimos carregar seus casos BAU no momento.",tryAgain:"Tentar Novamente",notInformed:"N\xE3o informado",reasonTooltip:"O que deve ser feito em BAU",reasonPrefix:"Motivo:",metricAwaitingTl:"Aguardando TL",caseDetailsTitle:"Detalhes do Caso",copy:"Copiar",advertiser:"Anunciante",status:"Status",cidLabel:"CID",caseIdLabel:"Case ID",speakeasyId:"Speakeasy ID",advertiserEmail:"Email do Anunciante",site:"Site",timezone:"Timezone",responsibleAm:"AM Respons\xE1vel",salesProgram:"Programa de Vendas",bauReason:"Motivo BAU",requestedTasks:"Tasks solicitadas",justification:"Justificativa",detailedDescription:"Descri\xE7\xE3o detalhada",availability:"Disponibilidade",urgent:"Urgente",undefinedName:"Nome indefinido",customerIdTooltip:"Customer ID do Anunciante",cidTooltip:"CID do Anunciante (Formato: 000-000-0000)",incompleteData:"Dados Incompletos",invalidCid:"CID Inv\xE1lido",contactSupport:"Contate o Suporte",editRequest:"Editar Solicita\xE7\xE3o",edit:"Editar",refresh:"Atualizar",noRecentCases:"Nenhum caso recente",casesWillAppear:"Seus casos BAU aparecer\xE3o aqui",createdApproved:"Criados / Aprovados",refreshDashboard:"Atualizar Dashboard",statusPendingDiscard:"Descarte em avalia\xE7\xE3o",copyFieldAria:e=>`Copiar ${e} para a \xE1rea de transfer\xEAncia`,metricAwaitingDiscard:"Descarte em avalia\xE7\xE3o",rescanTitle:"Recapturar os dados desta tela",rescanDone:"Dados recapturados da tela atual.",errorPrefix:e=>`Erro: ${e}`,selectAtLeastOne:e=>`Erro: Selecione pelo menos uma op\xE7\xE3o para "${e}".`,fieldRequiredDouble:e=>`Erro: O campo "${e}" \xE9 obrigat\xF3rio.`,fieldRequiredSingle:e=>`Erro: O campo '${e}' \xE9 obrigat\xF3rio.`,whatMustBeDone:"O que deve ser feito",editTasksHint:"Para editar as tasks, volte ao Passo 2",editScheduleHint:"Para editar o agendamento, volte ao Passo 3",bauJustification:"Justificativa BAU",description:"Descri\xE7\xE3o",availabilityPriority:"Disponibilidade (Prioridade)",suggestDiscardQuestion:"O caso deve ser descartado pelo TL?",editingCaseHash:e=>`Voc\xEA est\xE1 editando o caso #${e}`,editingDiscardHash:e=>`Voc\xEA est\xE1 editando o descarte do caso #${e}`,discardReason:"Motivo do Descarte",discardDescription:"Descri\xE7\xE3o do Descarte",notInformedPlaceholder:"N\xE3o informado",caseUpdatedSuccess:"Caso atualizado com sucesso!",caseDiscardSentSuccess:"Caso enviado para descarte com sucesso!"},es:{statusPending:"Esperando al TL",statusApproved:"Aprobado / Creado",statusKeptActive:"Mantenido activo por el TL",statusDiscarded:"Descartado por el TL",statusCreationRejected:"Rechazado por el TL",statusCanceled:"Cancelado",statusDefault:"Pendiente",timezoneWarningStrong:"Atenci\xF3n:",timezoneWarningText:"Para clientes fuera del huso horario de Brasil, el horario ingresado siempre debe corresponder al horario local del cliente, no al del agente.",checkTimezone:"Consultar Time Zone",timezoneModuleNotFound:"M\xF3dulo Time Zone no encontrado.",headerTitle:"BAU Central",headerDesc:"Panel de Casos BAU",openBauCase:"Abrir caso para BAU",openBauCaseDesc:"Flujo completo para implementaciones t\xE9cnicas y soporte especializado.",requestDiscard:"Solicitar Descarte",requestDiscardDesc:"Flujo simplificado para casos que no requieren implementaci\xF3n.",back:"Volver",next:"Siguiente",configuringEdit:"Configurando Edici\xF3n...",loadDashboardError:"Error al cargar el Panel. Verifica tu conexi\xF3n.",copiedToClipboard:"\xA1Copiado al portapapeles!",noAdditionalContext:"Ning\xFAn contexto adicional proporcionado por el agente.",notCaptured:"No capturado",none:"Ninguna",language:"Idioma",lastName:"Apellido",phone:"Tel\xE9fono",clientTimezone:"Huso horario del cliente",echoEquivalence:(e,t,a)=>`<strong>${e}</strong> en ${t} equivale a <strong>${a}</strong> en Brasilia.`,echoSameZone:"El cliente est\xE1 en el mismo huso que t\xFA.",editPageWarning:"Atenci\xF3n: Para editar la informaci\xF3n, debes tener abierta en el sistema la p\xE1gina de este Caso espec\xEDfico. De lo contrario, los datos capturados estar\xE1n incorrectos.",onCorrectPage:"Estoy en la p\xE1gina correcta",sending:"Enviando...",caseCreatedNoEmailConfirm:"Caso creado, pero no pudimos confirmar por email.",unknownError:"Error desconocido",newBauCase:"Nuevo Caso BAU",backToDashboard:"Volver al Panel",confirmDataBeforeSending:"Confirma los datos antes de enviar",submitToTl:"Enviar al TL",saveChanges:"Guardar Cambios",editingCase:e=>`Editando Caso #${e}`,fillDetailsBelow:"Completa los detalles a continuaci\xF3n",caseSentSuccess:"\xA1Caso enviado con \xE9xito!",caseSentSuccessSub:"Tu solicitud fue recibida y ser\xE1 procesada en breve.",genericErrorTitle:"\xA1Ups! Algo sali\xF3 mal",genericErrorSub:"No pudimos cargar tus casos BAU en este momento.",tryAgain:"Intentar de Nuevo",notInformed:"No informado",reasonTooltip:"Qu\xE9 debe hacerse en BAU",reasonPrefix:"Motivo:",metricAwaitingTl:"Esperando al TL",caseDetailsTitle:"Detalles del Caso",copy:"Copiar",advertiser:"Anunciante",status:"Estado",cidLabel:"CID",caseIdLabel:"Case ID",speakeasyId:"Speakeasy ID",advertiserEmail:"Email del Anunciante",site:"Sitio",timezone:"Timezone",responsibleAm:"AM Responsable",salesProgram:"Programa de Ventas",bauReason:"Motivo BAU",requestedTasks:"Tareas solicitadas",justification:"Justificaci\xF3n",detailedDescription:"Descripci\xF3n detallada",availability:"Disponibilidad",urgent:"Urgente",undefinedName:"Nombre indefinido",customerIdTooltip:"Customer ID del Anunciante",cidTooltip:"CID del Anunciante (Formato: 000-000-0000)",incompleteData:"Datos Incompletos",invalidCid:"CID Inv\xE1lido",contactSupport:"Contacta al Soporte",editRequest:"Editar Solicitud",edit:"Editar",refresh:"Actualizar",noRecentCases:"Ning\xFAn caso reciente",casesWillAppear:"Tus casos BAU aparecer\xE1n aqu\xED",createdApproved:"Creados / Aprobados",refreshDashboard:"Actualizar Panel",statusPendingDiscard:"Descarte en evaluaci\xF3n",copyFieldAria:e=>`Copiar ${e} al portapapeles`,metricAwaitingDiscard:"Descarte en evaluaci\xF3n",rescanTitle:"Recapturar los datos de esta pantalla",rescanDone:"Datos recapturados de la pantalla actual.",errorPrefix:e=>`Error: ${e}`,selectAtLeastOne:e=>`Error: Selecciona al menos una opci\xF3n para "${e}".`,fieldRequiredDouble:e=>`Error: El campo "${e}" es obligatorio.`,fieldRequiredSingle:e=>`Error: El campo '${e}' es obligatorio.`,whatMustBeDone:"Qu\xE9 debe hacerse",editTasksHint:"Para editar las tareas, vuelve al Paso 2",editScheduleHint:"Para editar la programaci\xF3n, vuelve al Paso 3",bauJustification:"Justificaci\xF3n BAU",description:"Descripci\xF3n",availabilityPriority:"Disponibilidad (Prioridad)",suggestDiscardQuestion:"\xBFEl caso debe ser descartado por el TL?",editingCaseHash:e=>`Est\xE1s editando el caso #${e}`,editingDiscardHash:e=>`Est\xE1s editando el descarte del caso #${e}`,discardReason:"Motivo del Descarte",discardDescription:"Descripci\xF3n del Descarte",notInformedPlaceholder:"No informado",caseUpdatedSuccess:"\xA1Caso actualizado con \xE9xito!",caseDiscardSentSuccess:"\xA1Caso enviado a descarte con \xE9xito!"},en:{statusPending:"Awaiting TL",statusApproved:"Approved / Created",statusKeptActive:"Kept active by the TL",statusDiscarded:"Discarded by the TL",statusCreationRejected:"Rejected by the TL",statusCanceled:"Cancelled",statusDefault:"Pending",timezoneWarningStrong:"Important:",timezoneWarningText:"For customers outside Brazil's time zone, the time you enter must always match the customer's local time, not the agent's.",checkTimezone:"Check Time Zone",timezoneModuleNotFound:"Time Zone module not found.",headerTitle:"BAU Central",headerDesc:"BAU Case Dashboard",openBauCase:"Open a case for BAU",openBauCaseDesc:"Full flow for technical implementations and specialized support.",requestDiscard:"Request a Discard",requestDiscardDesc:"Simplified flow for cases that do not require implementation.",back:"Back",next:"Next",configuringEdit:"Setting up editing...",loadDashboardError:"Error loading the Dashboard. Check your connection.",copiedToClipboard:"Copied to the clipboard!",noAdditionalContext:"No additional context provided by the agent.",notCaptured:"Not captured",none:"None",language:"Language",lastName:"Last name",phone:"Phone",clientTimezone:"Customer time zone",echoEquivalence:(e,t,a)=>`<strong>${e}</strong> in ${t} is <strong>${a}</strong> in Bras\xEDlia.`,echoSameZone:"The customer is in the same time zone as you.",editPageWarning:"Important: to edit this information you must have this specific case's page open in the system. Otherwise the captured data will be incorrect.",onCorrectPage:"I am on the correct page",sending:"Sending...",caseCreatedNoEmailConfirm:"Case created, but we could not confirm it by email.",unknownError:"Unknown error",newBauCase:"New BAU Case",backToDashboard:"Back to the Dashboard",confirmDataBeforeSending:"Confirm the data before sending",submitToTl:"Send to the TL",saveChanges:"Save Changes",editingCase:e=>`Editing Case #${e}`,fillDetailsBelow:"Fill in the details below",caseSentSuccess:"Case sent successfully!",caseSentSuccessSub:"Your request has been received and will be processed shortly.",genericErrorTitle:"Oops! Something went wrong",genericErrorSub:"We could not load your BAU cases right now.",tryAgain:"Try Again",notInformed:"Not provided",reasonTooltip:"What must be done in BAU",reasonPrefix:"Reason:",metricAwaitingTl:"Awaiting TL",caseDetailsTitle:"Case Details",copy:"Copy",advertiser:"Advertiser",status:"Status",cidLabel:"CID",caseIdLabel:"Case ID",speakeasyId:"Speakeasy ID",advertiserEmail:"Advertiser Email",site:"Site",timezone:"Timezone",responsibleAm:"Responsible AM",salesProgram:"Sales Program",bauReason:"BAU Reason",requestedTasks:"Requested tasks",justification:"Justification",detailedDescription:"Detailed description",availability:"Availability",urgent:"Urgent",undefinedName:"Name undefined",customerIdTooltip:"Advertiser's Customer ID",cidTooltip:"Advertiser's CID (Format: 000-000-0000)",incompleteData:"Incomplete Data",invalidCid:"Invalid CID",contactSupport:"Contact Support",editRequest:"Edit Request",edit:"Edit",refresh:"Refresh",noRecentCases:"No recent cases",casesWillAppear:"Your BAU cases will appear here",createdApproved:"Created / Approved",refreshDashboard:"Refresh Dashboard",statusPendingDiscard:"Discard under review",copyFieldAria:e=>`Copy ${e} to the clipboard`,metricAwaitingDiscard:"Discard under review",rescanTitle:"Recapture the data on this screen",rescanDone:"Data recaptured from the current screen.",errorPrefix:e=>`Error: ${e}`,selectAtLeastOne:e=>`Error: select at least one option for "${e}".`,fieldRequiredDouble:e=>`Error: the field "${e}" is required.`,fieldRequiredSingle:e=>`Error: the field '${e}' is required.`,whatMustBeDone:"What must be done",editTasksHint:"To edit the tasks, go back to Step 2",editScheduleHint:"To edit the scheduling, go back to Step 3",bauJustification:"BAU Justification",description:"Description",availabilityPriority:"Availability (Priority)",suggestDiscardQuestion:"Should the case be discarded by the TL?",editingCaseHash:e=>`You are editing case #${e}`,editingDiscardHash:e=>`You are editing the discard for case #${e}`,discardReason:"Discard Reason",discardDescription:"Discard Description",notInformedPlaceholder:"Not provided",caseUpdatedSuccess:"Case updated successfully!",caseDiscardSentSuccess:"Case sent for discard successfully!"}};function M(e){let t=se();return cl[t]?.[e]??cl.pt[e]}function gl(e){let t=se();return`${e.flag} ${To(e,t)} \u2014 ${fa(e,t)}`}var Fe={add:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',back:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',wand:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.41l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/></svg>',send:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',check:'<svg width="64" height="64" viewBox="0 0 24 24" fill="none"><path class="bau-check-path" d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',folder:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',empty:'<svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.44 2s2.75-.81 3.44-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z"/></svg>',refresh:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',expand:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>'};function dl(e,t){if(e==="CREATED"&&t==="KEPT_ACTIVE")return{text:M("statusKeptActive"),class:"status-green",aura:"status-green-aura"};if(e==="DISCARDED"&&t==="REJECTED_CREATION")return{text:M("statusCreationRejected"),class:"status-red",aura:"status-red-aura"};switch(e){case"PENDING_TL_CREATION":return{text:M("statusPending"),class:"status-yellow",aura:"status-yellow-aura"};case"PENDING_TL_DISCARD":return{text:M("statusPendingDiscard"),class:"status-orange",aura:"status-orange-aura"};case"CREATED":return{text:M("statusApproved"),class:"status-green",aura:"status-green-aura"};case"DISCARDED":return{text:M("statusDiscarded"),class:"status-red",aura:"status-red-aura"};case"CANCELED_BY_AGENT":return{text:M("statusCanceled"),class:"status-gray",aura:""};default:return{text:e||M("statusDefault"),class:"status-gray",aura:""}}}function Jd(e,t,a){let o=document.createElement("label");return o.className="bau-task-item",o.classList.toggle("active",a),o.innerHTML=`<input type="checkbox" name="${t}" value="${e}"><span>${e}</span>`,o.querySelector("input").checked=a,o.addEventListener("click",i=>{i.preventDefault();let n=o.querySelector("input");n.checked=!n.checked,o.classList.toggle("active",n.checked),y.playClick()}),o}function zn(e,t=[]){let a=e.dataset.fieldName||"taskType",o=new Set(Array.from(e.querySelectorAll("input:checked")).map(n=>n.value));t.map(n=>String(n||"").trim()).filter(Boolean).forEach(n=>o.add(n));let i=ll();o.forEach(n=>{i.includes(n)||i.push(n)}),e.innerHTML="",i.forEach(n=>e.appendChild(Jd(n,a,o.has(n))))}function pl(e,t=[]){e.querySelectorAll("input:checked").forEach(a=>{a.checked=!1}),zn(e,t)}function ul(e){let t=document.createElement("div");if(t.className="bau-dynamic-input",t.id=`wrapper-${e.id}`,e.label){let o=document.createElement("label");o.className="bau-label",o.textContent=rt(e,"label"),e.tooltip&&o.setAttribute("data-tooltip",rt(e,"tooltip")),t.appendChild(o)}let a;switch(e.type){case"textarea":a=document.createElement("textarea"),a.style.minHeight="80px",t.appendChild(a);break;case"select":a=document.createElement("select"),e.groups?e.groups.forEach(l=>{let p=document.createElement("optgroup");p.label=l.label,l.options.forEach(d=>{let A=document.createElement("option");A.value=d.value,A.textContent=lt(d.text),p.appendChild(A)}),a.appendChild(p)}):e.options&&e.options.forEach(l=>{let p=document.createElement("option");p.value=l.value,p.textContent=lt(l.text),a.appendChild(p)}),t.appendChild(a);break;case"checkbox-grid":return a=document.createElement("div"),a.className="bau-tasks-grid",a.dataset.fieldName=e.name,zn(a),t.appendChild(a),t;case"datetime-group":a=document.createElement("div"),a.className="bau-availability-container";let o=document.createElement("div");o.className="bau-timezone-row",o.innerHTML=`
                <span class="bau-field-hint">${M("clientTimezone")}</span>
                <select name="availabilityTimezone" class="bau-select">
                    ${Gt.map(l=>`<option value="${l.zone}">${gl(l)}</option>`).join("")}
                </select>
            `,a.appendChild(o),e.fields.forEach(l=>{let p=document.createElement("div");p.className="bau-availability-field",p.innerHTML=`
                    <span class="bau-field-hint">${rt(l,"label")}</span>
                    <div class="bau-slot-row">
                        <input type="date" name="${l.name}_date" class="bau-input" ${l.required?"required":""}>
                        <select name="${l.name}_time" class="bau-select">
                            <option value="">--:--</option>
                            ${Xd.map(d=>`<option value="${d}">${d}</option>`).join("")}
                        </select>
                    </div>
                `,a.appendChild(p)});let i=document.createElement("div");i.className="bau-timezone-echo",i.id="bau-availability-echo",a.appendChild(i);let n=document.createElement("div");return n.className="bau-availability-disclaimer",n.innerHTML=`
                <div class="bau-disclaimer-text">
                    <strong>${M("timezoneWarningStrong")}</strong> ${M("timezoneWarningText")}
                </div>
                <button type="button" class="bau-timezone-link" id="bau-open-timezone">
                    ${Fe.refresh}
                    ${M("checkTimezone")}
                </button>
            `,n.querySelector("#bau-open-timezone").onclick=()=>{let l=document.getElementById("cw-btn-timezone");l?(l.click(),y.playClick()):(y.playError(),te(M("timezoneModuleNotFound"),{error:!0}))},t.appendChild(a),t.appendChild(n),t;case"text-with-button":let r=document.createElement("div");r.className="bau-input-group",a=document.createElement("input"),a.type="text";let s=document.createElement("button");s.type="button",s.id=e.button.id,s.className="bau-mini-btn-input",s.title=rt(e,"buttonTitle")||e.button.title,s.innerHTML=Fe[e.button.icon]||"",r.appendChild(a),r.appendChild(s),t.appendChild(r);break;default:a=document.createElement("input"),a.type="text",t.appendChild(a)}return a&&e.type!=="checkbox-grid"&&e.type!=="datetime-group"&&(a.id=`bau-form-${e.id}`,a.name=e.name,a.className=e.type==="select"?"bau-select":e.type==="textarea"?"bau-textarea":"bau-input",e.placeholder&&(a.placeholder=rt(e,"placeholder")),e.required&&(a.required=!0)),t}function ml(e){return rt(e,"error")||e?.validation?.error||""}function fl(){rl();let e=!1,t="dashboard",a=null,o=0,i="BAU",n=!1,r=null,s=Mt.steps.length,l=document.createElement("div");l.id="bau-form-popup",l.className="bau-popup cw-module-window",l.style.display="none";let p=M("headerTitle"),d=M("headerDesc"),A=He(l,p,"v2.2.0",d,{},()=>g());l.appendChild(A);let u=document.createElement("div");u.className="bau-view-container",l.appendChild(u);let h=document.createElement("div");h.id="bau-view-dashboard",h.className="bau-view active",h.innerHTML=`
        <div class="bau-dashboard-content">
            <div class="bau-dashboard-metrics" id="bau-dashboard-metrics"></div>
            <div class="bau-md">
                <div class="bau-md-list">
                    <ul class="bau-case-list" id="bau-case-list-container"></ul>
                </div>
                <section class="bau-md-detail" id="bau-md-detail"
                         aria-live="polite" aria-label="${M("caseDetailsTitle")}"></section>
            </div>
        </div>
        <button class="bau-dashboard-fab" id="bau-new-case-btn">
            ${Fe.add}
            <span class="js-bau-new-case">${M("newBauCase")}</span>
        </button>
    `,u.appendChild(h);let N=document.createElement("div");N.id="bau-view-form",N.className="bau-view";let v=document.createElement("div");v.className="bau-view-header",v.innerHTML=`
      <button class="bau-back-btn" id="bau-form-back-btn">
        ${Fe.back}
        <span class="js-bau-back-dashboard">${M("backToDashboard")}</span>
      </button>
    `,N.appendChild(v);let I=document.createElement("div");I.className="bau-content",N.appendChild(I);let z=document.createElement("div");z.className="bau-form-loading-overlay",z.innerHTML=`
        <div class="bau-spinner"></div>
        <div class="bau-loading-text js-bau-configuring-edit">${M("configuringEdit")}</div>
    `,I.appendChild(z);let U=c=>{z.classList.toggle("active",c)},B=document.createElement("div");B.className="bau-progress-indicator",I.appendChild(B);let x=document.createElement("form");x.id="bau-escalation-form",x.noValidate=!0,I.appendChild(x),Mt.steps.forEach(c=>{let S=document.createElement("div");if(S.className="bau-step"+(c.id===o?" active":""),S.id=`bau-step-${c.id}`,c.isBranching)S.innerHTML=`
                <div class="bau-branching-container">
                    <div class="bau-branching-card" id="bau-opt-full">
                        <div class="bau-branching-icon">${Fe.add}</div>
                        <h3 class="bau-branching-title">${M("openBauCase")}</h3>
                        <p class="bau-branching-subtitle">${M("openBauCaseDesc")}</p>
                    </div>
                    <div class="bau-branching-card" id="bau-opt-discard">
                        <div class="bau-branching-icon">${Fe.empty}</div>
                        <h3 class="bau-branching-title">${M("requestDiscard")}</h3>
                        <p class="bau-branching-subtitle">${M("requestDiscardDesc")}</p>
                    </div>
                </div>
            `,S.querySelector("#bau-opt-full").onclick=()=>{i="BAU",o=1,x.querySelectorAll(".bau-highlight-panel").forEach(_=>_.classList.remove("discard-theme")),ne(),y.playClick()},S.querySelector("#bau-opt-discard").onclick=()=>{i="DISCARD",o=5,x.querySelectorAll(".bau-highlight-panel").forEach(_=>_.classList.add("discard-theme")),ne(),y.playClick()};else if(c.isConfirmation)S.innerHTML=`
                <div class="bau-card">
                    <h3 class="bau-step-title">${M("confirmDataBeforeSending")}</h3>
                    <div id="bau-confirmation-details"></div>
                </div>
            `;else{let _=document.createElement("div");if(_.className="bau-card",c.id===1||c.id===5){_.innerHTML=`
                    <div class="bau-vital-highlights bau-highlight-panel"></div>
                    <div class="bau-dynamic-inputs-container"></div>
                    <div class="bau-all-data"></div>
                `;let m=_.querySelector(".bau-dynamic-inputs-container");c.fields.forEach(L=>{m.appendChild(ul(L))});let b=_.querySelector("#wrapper-cid");if(b){let L=document.createElement("div");L.id="bau-cid-error",L.className="bau-cid-error-hint",L.style.display="none",L.textContent=ml(c.fields.find(w=>w.id==="cid")),b.appendChild(L)}}else c.fields.forEach(m=>{_.appendChild(ul(m))});S.appendChild(_)}x.appendChild(S)});let K=document.createElement("div");K.className="bau-footer";let W=document.createElement("button");W.type="button",W.id="bau-step-back-btn",W.className="bau-btn-secondary",W.textContent=M("back");let X=document.createElement("button");X.type="button",X.id="bau-step-next-btn",X.className="bau-btn-primary",X.textContent=M("next");let O=document.createElement("button");O.type="submit",O.className="bau-btn-submit",O.innerHTML=`${Fe.send} ${M("submitToTl")}`,O.style.display="none",K.appendChild(W),K.appendChild(X),K.appendChild(O),x.appendChild(K),u.appendChild(N);let k=document.createElement("div");k.id="bau-view-success",k.className="bau-view bau-success-view",k.innerHTML=`
        <div class="bau-success-content">
            <div class="bau-success-icon" style="color: ${Xe.green};">${Fe.check}</div>
            <h2 class="bau-success-title js-bau-success-title">${M("caseSentSuccess")}</h2>
            <p class="bau-success-subtitle js-bau-success-sub">${M("caseSentSuccessSub")}</p>
            <button class="bau-btn-primary js-bau-success-back" id="bau-success-back-btn">${M("backToDashboard")}</button>
        </div>
    `,u.appendChild(k),document.body.appendChild(l),so(()=>{let c=x.querySelector(".bau-tasks-grid");c&&zn(c)});function T(c){t=c,l.querySelectorAll(".bau-view").forEach(L=>L.classList.remove("active"));let S=l.querySelector(`#bau-view-${c}`);S&&S.classList.add("active");let _=A.querySelector(".cw-module-header-title")||A.querySelector("h2"),m=A.querySelector(".cw-module-header-subtitle")||A.querySelector("p");_&&(c==="form"?_.textContent=n?M("editingCase")(r):M("newBauCase"):_.textContent=M("headerTitle")),m&&(m.textContent=M(c==="form"?"fillDetailsBelow":"headerDesc"));let b=x.querySelector(".bau-btn-submit");b&&(b.innerHTML=n?`${Fe.send} ${M("saveChanges")}`:`${Fe.send} ${M("submitToTl")}`)}function E(){let c=l.querySelector("#bau-case-list-container"),S=l.querySelector("#bau-dashboard-metrics");S&&(S.innerHTML=`
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
            `),c&&(c.innerHTML=Array(5).fill(0).map(()=>`
            <div class="bau-skeleton-card">
                <div class="bau-shimmer"></div>
            </div>
        `).join(""))}async function R(){let c=l.querySelector("#bau-case-list-container"),S=l.querySelector("#bau-dashboard-metrics");if(!(!c||!S)){E();try{let _=await Xn();if(!Array.isArray(_))throw new Error("API response is not a valid array");ce(_)}catch(_){console.error("Critical Error loading BAU cases:",_),S&&(S.innerHTML=""),c.innerHTML=`
                <div class="bau-empty-state bau-error-state">
                    <div style="color: ${Xe.red}; margin-bottom: 16px;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    </div>
                    <h3 class="bau-empty-title">${M("genericErrorTitle")}</h3>
                    <p class="bau-empty-subtitle">${M("genericErrorSub")}</p>
                    <button class="bau-btn-secondary" id="bau-retry-btn" style="margin-top: 16px;">
                        ${M("tryAgain")}
                    </button>
                </div>
            `,l.querySelector("#bau-retry-btn")?.addEventListener("click",()=>R()),y.playError(),te(M("loadDashboardError"),{error:!0})}}}function V(c){let S=l.querySelector("#bau-md-detail");if(!S||!c)return;let _=dl(c.status,c.processedAction),m=w=>w||"---",b=[{rotulo:M("cidLabel"),valor:c.cid,mono:!0},{rotulo:M("caseIdLabel"),valor:c.caseId,mono:!0},{rotulo:M("speakeasyId"),valor:c.seId,mono:!0},{rotulo:M("advertiserEmail"),valor:c.advEmail},{rotulo:M("phone"),valor:c.advPhone,mono:!0},{rotulo:M("site"),valor:c.site},{rotulo:M("responsibleAm"),valor:c.amName}],L=[{rotulo:M("bauReason"),valor:c.reason||M("notInformed")},{rotulo:M("requestedTasks"),valor:c.task||c.taskType||M("none")},{rotulo:M("justification"),valor:m(c.nonImplementationReason)},{rotulo:M("detailedDescription"),valor:m(c.description)},{rotulo:M("availability"),valor:La(c.availability)},{rotulo:M("timezone"),valor:m(c.timezone)},{rotulo:M("language"),valor:m(c.language)},{rotulo:M("salesProgram"),valor:m(c.salesProgram)}];S.innerHTML=`
            <div class="bau-md-head">
                <h2 class="bau-md-title">${[c.advName,c.advLastName].filter(Boolean).join(" ")||M("undefinedName")}</h2>
                <div class="bau-md-head-meta">
                    <span class="bau-case-status-badge ${_.class}">${_.text}</span>
                    <span class="bau-md-date">${La(c.date)}</span>
                </div>
            </div>

            <section class="bau-md-briefing" aria-label="${M("bauReason")}">
                ${L.map((w,P)=>`
                    <div class="bau-md-line${P===L.length-1?" is-last":""}">
                        <span class="bau-md-label">${w.rotulo}</span>
                        <span class="bau-md-value">${w.valor}</span>
                    </div>
                `).join("")}
            </section>

            <section class="bau-md-data" aria-label="${M("caseDetailsTitle")}">
                ${b.map((w,P)=>`
                    <div class="bau-md-line${P===b.length-1?" is-last":""}">
                        <span class="bau-md-label">${w.rotulo}</span>
                        <span class="bau-md-value${w.mono?" is-mono":""}">${m(w.valor)}</span>
                        ${w.valor?`
                            <button type="button" class="bau-md-copy"
                                    data-valor="${String(w.valor).replace(/"/g,"&quot;")}"
                                    aria-label="${M("copyFieldAria")(w.rotulo)}">
                                ${Fe.wand}
                            </button>`:""}
                    </div>
                `).join("")}
            </section>
        `}function ae(c){if(!c)return"";let S=dl(c?.status,c?.processedAction),_=La(c?.date),m="",b="",L=String(c?.availability||"").split("|")[0].trim();if(c?.status==="PENDING_TL_CREATION"&&L){let le=new Date(L),xe=new Date;!isNaN(le.getTime())&&(le<=xe||le-xe<36e5*2)&&(m=`<span class="bau-sla-badge">${M("urgent")}</span>`,b="bau-pulse-attention")}let w=c?.reason&&c.reason.trim()?c.reason:M("noAdditionalContext"),F=/^(\d{3}-\d{3}-\d{4}|\d{10})$/.test(c?.cid||""),Y=!c?.caseId||c.caseId==="N/A"||!F;return Y&&c?.status==="PENDING_TL_CREATION"&&(b="bau-pulse-attention"),`
            <li class="bau-case-card ${S.aura} ${b}" data-case-id="${c?.id||""}">
                <div class="bau-case-main">
                    <div class="bau-case-icon">${Fe.folder}</div>
                    <div class="bau-case-info">
                        <div class="bau-case-header">
                            <h3 class="bau-case-title">${[c?.advName,c?.advLastName].filter(Boolean).join(" ")||M("undefinedName")}</h3>
                            ${m}
                            <span class="bau-case-date">${_}</span>
                        </div>
                        <p class="bau-case-details">
                            <span data-tooltip="${M("customerIdTooltip")}">Case: ${c?.caseId||"N/A"}</span> \u2022
                            <span data-tooltip="${M("cidTooltip")}" class="${F?"":"bau-error-text"}">CID: ${c?.cid||"N/A"}</span> \u2022
                            <span data-tooltip="${M("reasonTooltip")}">${M("reasonPrefix")} ${w}</span>
                        </p>
                        ${Y?`<div class="bau-data-error-hint">${!c?.caseId||c?.caseId==="N/A"?M("incompleteData"):M("invalidCid")} - ${M("contactSupport")}</div>`:""}
                    </div>
                </div>
                <div class="bau-case-actions">
                    <span class="bau-case-status-badge ${S.class}">${S.text}</span>
                    ${c?.status&&c.status.includes("PENDING")?`
                        <button class="bau-case-edit-btn" data-id="${c.id}" title="${M("editRequest")}">
                            ${Fe.edit}
                            ${M("edit")}
                        </button>
                    `:""}
                </div>
            </li>
        `}let ie=null;function ue(){ie=null,l.querySelector(".bau-md")?.classList.remove("is-open"),l.querySelectorAll("#bau-case-list-container .bau-case-card").forEach(c=>{c.classList.remove("is-selected"),c.setAttribute("aria-expanded","false")})}function Q(c,S){if(ie===S?.id){ue(),y.playSwoosh();return}ie=S?.id||null,l.querySelectorAll("#bau-case-list-container .bau-case-card").forEach(_=>{let m=_===c;_.classList.toggle("is-selected",m),_.setAttribute("aria-expanded",m?"true":"false")}),V(S),l.querySelector(".bau-md")?.classList.add("is-open"),y.playClick()}function ce(c){let S=l.querySelector("#bau-case-list-container"),_=l.querySelector("#bau-dashboard-metrics");if(!S||!_)return;let m=Array.isArray(c)?c.filter(Boolean):[];if(m.length===0){_.innerHTML=`
                <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard">
                    ${Fe.refresh}
                    ${M("refresh")}
                </button>
            `,S.innerHTML=`
                <div class="bau-empty-state">
                    ${Fe.empty}
                    <h3 class="bau-empty-title">${M("noRecentCases")}</h3>
                    <p class="bau-empty-subtitle">${M("casesWillAppear")}</p>
                </div>
            `,l.querySelector("#bau-refresh-dashboard")?.addEventListener("click",()=>R());return}let b=m.filter(le=>le.status==="PENDING_TL_CREATION").length,L=m.filter(le=>le.status==="PENDING_TL_DISCARD").length,w=m.filter(le=>le.status==="CREATED").length;_.innerHTML=`
            <div class="bau-metric-card">
                <span class="bau-metric-value">${b}</span>
                <span class="bau-metric-label">${M("metricAwaitingTl")}</span>
            </div>
            <div class="bau-metric-card">
                <span class="bau-metric-value">${L}</span>
                <span class="bau-metric-label">${M("metricAwaitingDiscard")}</span>
            </div>
            <div class="bau-metric-card">
                <span class="bau-metric-value">${w}</span>
                <span class="bau-metric-label">${M("createdApproved")}</span>
            </div>
            <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard" title="${M("refreshDashboard")}">
                ${Fe.refresh}
            </button>
        `;let P=_.querySelector("#bau-refresh-dashboard");P?.addEventListener("click",async()=>{P.classList.contains("spinning")||(P.classList.add("spinning"),y.playClick(),await R(),setTimeout(()=>P.classList.remove("spinning"),1e3))}),S.innerHTML="",ue();let F=m.slice(0,5),Y=m.slice(5);if(F.forEach(le=>{let xe=ae(le),Ae=document.createElement("div");Ae.innerHTML=xe;let ge=Ae.firstElementChild;ge.addEventListener("click",_e=>{_e.target.closest(".bau-case-edit-btn")||Q(ge,le)});let tt=ge.querySelector(".bau-case-edit-btn");tt&&(tt.onclick=_e=>{_e.stopPropagation(),oe(le)}),S.appendChild(ge)}),Y.length>0){let le=document.createElement("li");le.className="bau-accordion-container";let xe=document.createElement("button");xe.className="bau-accordion-toggle",xe.innerHTML=`${Fe.expand} <span>Mostrar ${Y.length} casos mais antigos</span>`;let Ae=document.createElement("ul");Ae.className="bau-case-list bau-accordion-content",Ae.style.display="none",Y.forEach(ge=>{let tt=ae(ge),_e=document.createElement("div");_e.innerHTML=tt;let wt=_e.firstElementChild;wt.addEventListener("click",nt=>{nt.target.closest(".bau-case-edit-btn")||Q(wt,ge)});let qt=wt.querySelector(".bau-case-edit-btn");qt&&(qt.onclick=nt=>{nt.stopPropagation(),oe(ge)}),Ae.appendChild(wt)}),xe.addEventListener("click",()=>{let ge=Ae.style.display==="none";Ae.style.display=ge?"block":"none",xe.classList.toggle("expanded",ge),xe.querySelector("span").textContent=ge?"Esconder casos mais antigos":`Mostrar ${Y.length} casos mais antigos`,y.playClick()}),le.appendChild(xe),le.appendChild(Ae),S.appendChild(le)}}function ne(){let c=i==="BAU"?[1,2,3,4]:[5,4];x.querySelectorAll(".bau-step").forEach(m=>{let b=parseInt(m.id.replace("bau-step-","")),L=b===o,w=c.includes(b)||b===0;m.classList.toggle("active",L),m.style.display=L?"block":"none",m.querySelectorAll("input, select, textarea").forEach(P=>{P.disabled=!w})});let S=o===0;if(B.style.display=S?"none":"flex",!S){B.innerHTML="";let m=i==="BAU"?[1,2,3,4]:[5,4];m.forEach((b,L)=>{let w=document.createElement("div"),P=b===o,F=m.indexOf(o),Y=L<F;w.className=`bau-progress-step ${P?"active":Y?"completed":""}`,w.textContent=L+1,B.appendChild(w)})}let _=o===4;W.style.display=o>0?"inline-block":"none",X.style.display=!S&&!_?"inline-block":"none",O.style.display=_?"flex":"none",_&&H()}function pe(c){let S=Mt.steps.find(_=>_.id===c);if(!S||!S.fields||S.isConfirmation)return!0;for(let _ of S.fields){let m=x.querySelector(`#bau-step-${c} #wrapper-${_.id}`);if(!(m&&m.style.display==="none")&&_.validation){let b=x.querySelector(`#bau-step-${c} [name="${_.name}"]`);if(b&&b.offsetParent!==null&&b.value.trim())if(new RegExp(_.validation.regex).test(b.value.trim())){b.classList.remove("invalid-cid");let w=x.querySelector("#bau-cid-error");w&&(w.style.display="none")}else{console.warn(`Validation failed for field "${_.name}" in step ${c}: Regex mismatch.`),y.playError(),te(M("errorPrefix")(rt(_,"error")||_.validation.error),{error:!0}),b.classList.add("invalid-cid");let w=x.querySelector("#bau-cid-error");return w&&(w.style.display="flex"),!1}}}return!0}function j(c){Yt("erro"),c&&(c.classList.remove("bau-shake"),c.offsetWidth,c.classList.add("bau-shake"),c.addEventListener("animationend",()=>c.classList.remove("bau-shake"),{once:!0}),typeof c.focus=="function"&&c.focus({preventScroll:!1}))}function re(c){if(!x.querySelector(`#bau-step-${c}`))return!1;let _=Mt.steps.find(b=>b.id===c);if(!_||!_.fields||_.isConfirmation)return!0;let m=!0;for(let b of _.fields){let L=x.querySelector(`#bau-step-${c} #wrapper-${b.id}`);if(!(L&&L.style.display==="none")&&b.required){let w=!0,P="";if(b.type==="checkbox-grid")x.querySelector(`#bau-step-${c} input[name="${b.name}"]:checked`)||(P="No option selected in checkbox-grid",y.playError(),te(M("selectAtLeastOne")(rt(b,"label")),{error:!0}),w=!1);else if(b.type==="datetime-group"){let F=b.fields[0].name,Y=x.querySelector(`#bau-step-${c} input[name="${F}_date"]`),le=x.querySelector(`#bau-step-${c} select[name="${F}_time"]`);if(!Y||Y.offsetParent===null)continue;(!Y.value.trim()||!le||!le.value.trim())&&(P="Datetime group first field is empty",y.playError(),j(Y),te(M("fieldRequiredDouble")(rt(b.fields[0],"label")),{error:!0}),w=!1)}else{let F=x.querySelector(`#bau-step-${c} [name="${b.name}"]`);if(!F||F.offsetParent===null)continue;F.value.trim()||(P="Field is empty",y.playError(),j(F),te(M("fieldRequiredSingle")(rt(b,"label")),{error:!0}),w=!1)}if(!w){console.warn(`Validation failed for required field "${b.name}" in step ${c}: ${P}`),m=!1;break}}}return m}X.addEventListener("click",()=>{if(pe(o)&&re(o)){i==="BAU"?o++:o===5?o=4:o++,ne();let c=l.querySelector(".bau-content");c&&(c.scrollTop=0),y.playClick()}}),W.addEventListener("click",()=>{o>0&&(i==="BAU"?o--:o===4?o=5:o===5?o=0:o--,ne(),y.playClick())});async function de(){let c=await bt()||{};a=c,x.querySelectorAll(".bau-vital-highlights").forEach(w=>{let P=[{label:"Anunciante",value:c.advName},{label:"CID",value:c.cid},{label:"Website",value:c.website||c.site},{label:"Case ID",value:c.caseId}];w.innerHTML=P.map(F=>{let Y=F.value&&F.value!=="N/A"&&F.value!=="undefined"&&F.value!=="null"?F.value:M("notCaptured");return`
                    <div class="bau-highlight-item">
                        <span class="bau-highlight-label">${F.label}</span>
                        <span class="bau-highlight-value">${Y}</span>
                    </div>
                `}).join("")+`
                <button type="button" class="bau-rescan-btn" title="${M("rescanTitle")}" aria-label="${M("rescanTitle")}">
                    ${Fe.refresh}
                </button>
            `}),Mt.steps.forEach(w=>{w.fields&&w.fields.forEach(P=>{if(P.isSmart){let F=c[P.id],Y=x.querySelector(`#bau-step-${w.id} [name="${P.name}"]`),le=x.querySelector(`#bau-step-${w.id} #wrapper-${P.id}`);if(Y&&(Y.value=F&&F!=="N/A"?F:""),le){let xe=F&&F!==""&&F!=="N/A"&&F!=="undefined"&&F!=="null";le.style.display=xe?"none":"block"}}})});let _=Dn(c.timezone)||jt,m=x.querySelector('select[name="availabilityTimezone"]');m&&(m.value=_,J());let b=c.userProfile?.defaultLanguage;b&&x.querySelectorAll('select[name="language"]').forEach(w=>{w.value=b}),x.querySelectorAll(".bau-all-data").forEach(w=>{let P=[{label:"Anunciante",value:c.advName},{label:"CID",value:c.cid},{label:"AM",value:c.amName},{label:"SE ID",value:c.seId},{label:"Site",value:c.website||c.site},{label:"Email",value:c.email},{label:"Timezone",value:c.timezone},{label:"Case ID",value:c.caseId},{label:"Programa",value:c.salesProgram},{label:"Idioma",value:c.language}];w.innerHTML=`
                <div class="bau-context-badges-grid">
                    ${P.filter(F=>F.value&&F.value!=="N/A"&&F.value!=="---"&&F.value!=="undefined"&&F.value!=="null").map(F=>`
                            <div class="bau-context-badge">
                                <span class="bau-badge-label">${F.label}:</span>
                                <span class="bau-badge-value">${F.value}</span>
                            </div>
                        `).join("")}
                </div>
            `})}l.addEventListener("keydown",c=>{c.key!=="Escape"||!ie||(c.stopPropagation(),ue(),y.playSwoosh())}),l.addEventListener("click",async c=>{let S=c.target.closest(".bau-md-copy");if(!S)return;c.preventDefault();let _=S.getAttribute("data-valor")||"";if(_){try{await navigator.clipboard.writeText(_)}catch(m){console.warn("Falha ao copiar:",m),y.playError(),te(M("genericErrorTitle"),{error:!0});return}S.classList.add("is-done"),S.innerHTML=Fe.check||Fe.wand,y.playClick(),Yt("confirma"),te(M("copiedToClipboard")),setTimeout(()=>{S.classList.remove("is-done"),S.innerHTML=Fe.wand},1500)}}),l.addEventListener("click",async c=>{let S=c.target.closest(".bau-rescan-btn");if(!(!S||S.classList.contains("spinning"))){c.preventDefault(),S.classList.add("spinning"),y.playClick();try{await de(),te(M("rescanDone"))}catch(_){console.warn("Falha ao recapturar o contexto:",_),y.playError(),te(M("genericErrorTitle"),{error:!0})}finally{l.querySelectorAll(".bau-rescan-btn.spinning").forEach(_=>_.classList.remove("spinning"))}}}),l.addEventListener("click",c=>{let S=c.target.closest(".bau-mini-btn-input");if(!S)return;let _=S.closest(".bau-input-group")?.querySelector('input[name="seId"]');_&&(c.preventDefault(),y.playClick(),ro(_))});let Z=l.querySelector("#bau-form-cid");Z&&Z.addEventListener("input",()=>pe(1)),x.addEventListener("change",c=>{let S=c.target?.name||"";(S==="availabilityTimezone"||S.startsWith("availability_"))&&J()});function q(c){let S=c.availabilityTimezone||jt;return["availability_1","availability_2","availability_3"].map(_=>{let m=c[`${_}_date`],b=c[`${_}_time`];return!m||!b?"":On(`${m}T${b}`,S)}).filter(Boolean)}function C(c){let S=c.availabilityTimezone||jt,_=Gt.find(L=>L.zone===S),m=q(c);return m.length===0?M("notInformedPlaceholder"):`${m.map(L=>{let[w,P]=L.split("T"),[F,Y,le]=w.split("-");return`${le}/${Y} ${P.slice(0,5)}`}).join("  \xB7  ")} \u2014 ${_?fa(_,se()):S}`}function $(c,S){((L,w)=>{let P=c.querySelector(L);P&&(P.textContent=w)})(".bau-timezone-row .bau-field-hint",M("clientTimezone")),c.querySelectorAll('select[name="availabilityTimezone"] option').forEach(L=>{let w=Gt.find(P=>P.zone===L.value);w&&(L.textContent=gl(w))}),c.querySelectorAll(".bau-availability-field .bau-field-hint").forEach((L,w)=>{S.fields[w]&&(L.textContent=rt(S.fields[w],"label"))});let m=c.querySelector(".bau-disclaimer-text");m&&(m.innerHTML=`<strong>${M("timezoneWarningStrong")}</strong> ${M("timezoneWarningText")}`);let b=c.querySelector("#bau-open-timezone");b&&(b.innerHTML=`${Fe.refresh} ${M("checkTimezone")}`),J()}function J(){let c=x.querySelector("#bau-availability-echo");if(!c)return;let S=Object.fromEntries(new FormData(x).entries()),_=S.availabilityTimezone||jt,m=S.availability_1_date,b=S.availability_1_time;if(!m||!b){c.innerHTML="";return}if(_===jt){c.textContent=M("echoSameZone");return}let L=On(`${m}T${b}`,_),w=new Date(L);if(isNaN(w.getTime())){c.innerHTML="";return}let P=new Intl.DateTimeFormat(Ut(),{timeZone:jt,day:"2-digit",month:Ga(),hour:"2-digit",minute:"2-digit",hour12:!1}).format(w),F=Gt.find(Y=>Y.zone===_);c.innerHTML=M("echoEquivalence")(b,F?fa(F,se()):_,P)}function D(c){return(Mt.steps.flatMap(_=>_.fields||[]).find(_=>_.id==="language")?.options||[]).map(_=>`<option value="${_.value}" ${_.value===c?"selected":""}>${lt(_.text)}</option>`).join("")}function H(){let c=new FormData(x),S=Object.fromEntries(c.entries()),_=l.querySelector("#bau-confirmation-details");if(_){if(i==="BAU"){let m=c.getAll("taskType"),b=m.length>0?m.join(", "):M("none");_.innerHTML=`
                ${n?`<div class="bau-highlight-panel" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${Xe.yellow}; background: rgba(255, 186, 0, 0.05); border-radius: 8px; font-weight: 500;">${M("editingCaseHash")(`<span style="color: ${Xe.yellow}">${r}</span>`)}</div>`:""}
                <div class="bau-confirmation-grid">
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Anunciante</span>
                        <input class="bau-confirm-value-input" data-field="advName" data-step="1" value="${S.advName||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${M("lastName")}</span>
                        <input class="bau-confirm-value-input" data-field="advLastName" data-step="1" value="${S.advLastName||""}" placeholder="${M("notInformedPlaceholder")}">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${M("advertiserEmail")}</span>
                        <input class="bau-confirm-value-input" data-field="advEmail" data-step="1" value="${S.advEmail||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${M("phone")}</span>
                        <input class="bau-confirm-value-input" data-field="advPhone" data-step="1" value="${S.advPhone||""}" placeholder="${M("notInformedPlaceholder")}">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">CID</span>
                        <input class="bau-confirm-value-input" data-field="cid" data-step="1" value="${S.cid||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">AM</span>
                        <input class="bau-confirm-value-input" data-field="amName" data-step="1" value="${S.amName||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Website</span>
                        <input class="bau-confirm-value-input" data-field="website" data-step="1" value="${S.website||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Speakeasy ID</span>
                        <input class="bau-confirm-value-input" data-field="seId" data-step="1" value="${S.seId||""}" placeholder="${M("notInformedPlaceholder")}">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${M("language")}</span>
                        <select class="bau-confirm-value-input" data-field="language" data-step="1">
                            ${D(S.language)}
                        </select>
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${M("whatMustBeDone")}</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="reason" data-step="2" placeholder="---">${S.reason||""}</textarea>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Tasks</span>
                        <span class="bau-confirm-value-input" style="cursor: default; opacity: 0.8;" title="${M("editTasksHint")}">${b}</span>
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${M("bauJustification")}</span>
                        <select class="bau-confirm-value-input" data-field="nonImplementationReason" data-step="3">
                            <option value="Tempo da consultoria esgotado" ${S.nonImplementationReason==="Tempo da consultoria esgotado"?"selected":""}>${lt("Tempo da consultoria esgotado")}</option>
                            <option value="Solicita\xE7\xE3o de reagendamento pelo anunciante" ${S.nonImplementationReason==="Solicita\xE7\xE3o de reagendamento pelo anunciante"?"selected":""}>${lt("Solicita\xE7\xE3o de reagendamento pelo anunciante")}</option>
                            <option value="Falta de acessos ou backup do site" ${S.nonImplementationReason==="Falta de acessos ou backup do site"?"selected":""}>${lt("Falta de acessos ou backup do site")}</option>
                            <option value="Anunciante indispon\xEDvel ou n\xE3o preparado" ${S.nonImplementationReason==="Anunciante indispon\xEDvel ou n\xE3o preparado"?"selected":""}>${lt("Anunciante indispon\xEDvel ou n\xE3o preparado")}</option>
                            <option value="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)" ${S.nonImplementationReason==="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"?"selected":""}>${lt("Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)")}</option>
                            <option value="Solicita\xE7\xE3o de tarefas (tasks) adicionais" ${S.nonImplementationReason==="Solicita\xE7\xE3o de tarefas (tasks) adicionais"?"selected":""}>${lt("Solicita\xE7\xE3o de tarefas (tasks) adicionais")}</option>
                            <option value="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)" ${S.nonImplementationReason==="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"?"selected":""}>${lt("Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)")}</option>
                            <option value="Retorno de contato ap\xF3s prazo de 14 dias expirado" ${S.nonImplementationReason==="Retorno de contato ap\xF3s prazo de 14 dias expirado"?"selected":""}>${lt("Retorno de contato ap\xF3s prazo de 14 dias expirado")}</option>
                        </select>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${M("description")}</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="3" placeholder="---">${S.description||""}</textarea>
                    </div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${M("availabilityPriority")}</span>
                        <span class="bau-confirm-value-input" style="cursor: default; opacity: 0.8;" title="${M("editScheduleHint")}">${C(S)}</span>
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${M("suggestDiscardQuestion")}</span>
                        <select class="bau-confirm-value-input" data-field="suggestDiscard" data-step="3">
                            <option value="N\xE3o" ${S.suggestDiscard==="N\xE3o"?"selected":""}>${lt("N\xE3o")}</option>
                            <option value="Sim" ${S.suggestDiscard==="Sim"?"selected":""}>${lt("Sim")}</option>
                        </select>
                    </div>
                </div>
            `}else _.innerHTML=`
                ${n?`<div class="bau-highlight-panel discard-theme" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${Xe.red}; background: rgba(217, 48, 37, 0.05); border-radius: 8px; font-weight: 500;">${M("editingDiscardHash")(`<span style="color: ${Xe.red}">${r}</span>`)}</div>`:""}
                <div class="bau-confirmation-grid">
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Case ID</span>
                        <input class="bau-confirm-value-input" data-field="caseId" data-step="5" value="${S.caseId||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${M("language")}</span>
                        <select class="bau-confirm-value-input" data-field="language" data-step="5">
                            ${D(S.language)}
                        </select>
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Speakeasy ID</span>
                        <input class="bau-confirm-value-input" data-field="seId" data-step="5" value="${S.seId||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${M("discardReason")}</span>
                        <input class="bau-confirm-value-input" data-field="reason" data-step="5" value="${S.reason||""}" placeholder="---" readonly style="opacity: 0.7;">
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${M("discardDescription")}</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="5" placeholder="---">${S.description||""}</textarea>
                    </div>
                </div>
            `;_.querySelectorAll(".bau-confirm-value-input").forEach(m=>{m.addEventListener("input",b=>{let L=b.target.dataset.field,w=b.target.dataset.step;if(!L||!w)return;let P=x.querySelector(`#bau-step-${w} [name="${L}"]`);P&&(P.value=b.target.value,L==="cid"&&pe(1))})})}}async function oe(c){if(!await Ye(M("editPageWarning"),{confirmText:M("onCorrectPage")}))return;U(!0),f(),n=!0,r=c.id,i=c.status==="PENDING_TL_DISCARD"||c.reason&&!c.task?"DISCARD":"BAU",T("form"),await de(),a={...a,advName:c.advName||a.advName,advLastName:c.advLastName||a.advLastName,advPhone:c.advPhone||a.advPhone,cid:c.cid||a.cid,caseId:c.caseId||a.caseId,seId:c.seId||a.seId,site:c.site||c.website||a.site||a.website,email:c.advEmail||a.email,timezone:c.timezone||a.timezone,language:c.language||a.language,amName:c.amName||a.amName,salesProgram:c.salesProgram||a.salesProgram};let _=c.availability?c.availability.split("|").map(L=>L.trim()):[],m=(c.task||c.taskType||"").split(",").map(L=>L.trim()).filter(Boolean),b=x.querySelector(".bau-tasks-grid");b&&pl(b,m),x.querySelectorAll("input, select, textarea").forEach(L=>{let w=L.name,F={advEmail:"advEmail",website:"site",site:"site"}[w]||w;if(w==="taskType"){let Y=(c.task||c.taskType||"").split(",").map(le=>le.trim());L.type==="checkbox"&&(L.checked=Y.includes(L.value),L.closest(".bau-task-item")?.classList.toggle("active",L.checked))}else if(w==="availabilityTimezone"){let Y=Dn(c.timezone)||jt;Array.from(L.options).some(le=>le.value===Y)&&(L.value=Y)}else if(w.startsWith("availability_")){let Y=w.split("_"),le=parseInt(Y[1],10)-1,xe=Y[2],Ae=_[le],ge=String(Ae||"").match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/);if(!ge)return;xe==="date"&&(L.value=ge[1]),xe==="time"&&(Array.from(L.options).some(tt=>tt.value===ge[2])||L.add(new Option(ge[2],ge[2])),L.value=ge[2])}else w==="language"||w==="suggestDiscard"?Array.from(L.options).some(le=>le.value===c[w])&&(L.value=c[w]):c[F]!==void 0?L.value=c[F]:w==="reason"?L.value=c.reason:w==="description"?L.value=c.description:w==="nonImplementationReason"&&(L.value=c.nonImplementationReason||"")}),o=i==="BAU"?1:5,ne(),y.playClick(),setTimeout(()=>U(!1),500)}x.onsubmit=async c=>{c.preventDefault();let S=i==="BAU"?[1,2,3]:[5];for(let P of S)if(!Mt.steps.find(Y=>Y.id===P)?.isConfirmation&&(!pe(P)||!re(P))){console.warn(`Form submission blocked by validation failure in step ${P}`),o=P,ne();return}let _=l.querySelector(".bau-btn-submit");_.disabled=!0,_.innerHTML=M("sending");let m=new FormData(x),b=Object.fromEntries(m.entries()),L=a||{},w={...L,...b,requestType:i};if(b.advEmail?w.advEmail=b.advEmail:L.email&&(w.advEmail=L.email),b.website?w.website=b.website:L.website?w.website=L.website:L.site&&(w.website=L.site),i==="BAU"){let P=m.getAll("taskType"),F=q(b).join(" | ");w.taskType=P.join(", "),w.availability=F,n?(b.nonImplementationReason?w.nonImplementationReason=b.nonImplementationReason:delete w.nonImplementationReason,b.description?w.description=b.description:delete w.description):(w.nonImplementationReason=b.nonImplementationReason||"",w.description=b.description||"",w.nonImplementationReason||console.warn("Aviso: Campo 'Justificativa' (nonImplementationReason) est\xE1 saindo vazio."),w.description||console.warn("Aviso: Campo 'Descri\xE7\xE3o detalhada' (description) est\xE1 saindo vazio."))}else w.reason=b.reason,n?(b.description?w.description=b.description:delete w.description,delete w.taskType,delete w.availability,delete w.nonImplementationReason):(w.taskType="",w.availability="",w.nonImplementationReason="",w.description=b.description||"");try{let P=null;n?await Jn(r,w):P=await Kn(w,L.agentEmail||"anon"),y.playSuccess(),Yt("concluido");let F=l.querySelector(".bau-success-title");F&&(n?F.textContent=M("caseUpdatedSuccess"):F.textContent=M(i==="DISCARD"?"caseDiscardSentSuccess":"caseSentSuccess")),T("success"),!n&&P&&P.emailSent===!1&&(y.playError(),te(M("caseCreatedNoEmailConfirm"),{error:!0}))}catch(P){y.playError(),te(M("errorPrefix")(P.message||M("unknownError")),{error:!0}),console.error("Payload que tentou enviar:",w)}finally{_.disabled=!1,_.innerHTML=`${Fe.send} ${M("submitToTl")}`}};function f(){x.reset(),o=0,i="BAU",n=!1,r=null,ne();let c=x.querySelector(".bau-tasks-grid");c&&pl(c)}l.querySelector("#bau-new-case-btn").addEventListener("click",()=>{f(),T("form"),de()}),l.querySelector("#bau-form-back-btn").addEventListener("click",()=>T("dashboard")),l.querySelector("#bau-success-back-btn").addEventListener("click",()=>T("dashboard"));async function g(){e=!Ze(l),e&&(l.style.display="flex"),e?(De(),T("dashboard"),R()):Me(),Ve(e,l,"cw-btn-bauform")}return ne(),Le(()=>{let c=l.querySelector(".cw-help-title");c&&(c.textContent=M("headerTitle"));let S=l.querySelector(".cw-help-description");S&&(S.textContent=M("headerDesc"));let _=l.querySelector(".js-bau-new-case");_&&(_.textContent=M("newBauCase"));let m=l.querySelector(".js-bau-back-dashboard");m&&(m.textContent=M("backToDashboard"));let b=l.querySelector(".js-bau-configuring-edit");b&&(b.textContent=M("configuringEdit"));let L=l.querySelector(".js-bau-success-title");L&&(L.textContent=M("caseSentSuccess"));let w=l.querySelector(".js-bau-success-sub");w&&(w.textContent=M("caseSentSuccessSub"));let P=l.querySelector(".js-bau-success-back");P&&(P.textContent=M("backToDashboard")),W.textContent=M("back"),X.textContent=M("next");let F=l.querySelector("#bau-md-detail");F&&F.setAttribute("aria-label",M("caseDetailsTitle")),T(t);let Y=(le,xe)=>{let Ae=x.querySelector(le);Ae&&(Ae.textContent=xe)};Y("#bau-opt-full .bau-branching-title",M("openBauCase")),Y("#bau-opt-full .bau-branching-subtitle",M("openBauCaseDesc")),Y("#bau-opt-discard .bau-branching-title",M("requestDiscard")),Y("#bau-opt-discard .bau-branching-subtitle",M("requestDiscardDesc")),Y("#bau-step-4 .bau-step-title",M("confirmDataBeforeSending")),x.querySelectorAll(".bau-step").forEach(le=>{let xe=parseInt(le.id.replace("bau-step-",""),10),Ae=Mt.steps.find(ge=>ge.id===xe);!Ae||Ae.isBranching||Ae.isConfirmation||le.querySelectorAll(".bau-dynamic-input").forEach(ge=>{let tt=ge.id.replace("wrapper-",""),_e=Ae.fields?.find(nt=>nt.id===tt);if(!_e)return;let wt=ge.querySelector(".bau-label");wt&&_e.label&&(wt.textContent=rt(_e,"label"),_e.tooltip&&wt.setAttribute("data-tooltip",rt(_e,"tooltip")));let qt=ge.querySelector("input, textarea, select");if(qt&&_e.placeholder&&(qt.placeholder=rt(_e,"placeholder")),tt==="cid"){let nt=ge.querySelector("#bau-cid-error");nt&&(nt.textContent=ml(_e))}if(_e.type==="datetime-group"&&$(ge,_e),_e.type==="text-with-button"){let nt=ge.querySelector(".bau-mini-btn-input");nt&&(nt.title=rt(_e,"buttonTitle")||_e.button.title)}if(_e.type==="select"){let nt=_e.groups?_e.groups.flatMap(Jt=>Jt.options):_e.options||[];ge.querySelectorAll("option").forEach((Jt,Pa)=>{let ba=nt[Pa];ba&&(Jt.textContent=lt(ba.text))})}})}),t==="dashboard"&&R()}),g}var et={notes:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',precall:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-9v2h9V7zm0 8h-9v2h9v-2zM5.54 11L2 7.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L5.54 11zm0 8L2 15.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L5.54 19z"/></svg>',email:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',library:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',timezone:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',configs:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>',broadcast:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',enter:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>',arrowDown:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',arrowUp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>',bolt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>'};function Qd(){if(document.getElementById("cw-palette-styles"))return;let e=document.createElement("style");e.id="cw-palette-styles",e.textContent=`
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
    `,document.head.appendChild(e)}var bl={pt:{ariaLabel:"Busca r\xE1pida",placeholder:"Buscar um m\xF3dulo...",empty:"Nada encontrado.",navigate:"navegar",select:"selecionar",close:"esc fechar",groupShortcuts:"Meus atalhos",groupModules:"M\xF3dulos"},en:{ariaLabel:"Quick search",placeholder:"Search for a module...",empty:"Nothing found.",navigate:"navigate",select:"select",close:"esc to close",groupShortcuts:"My shortcuts",groupModules:"Modules"},es:{ariaLabel:"B\xFAsqueda r\xE1pida",placeholder:"Buscar un m\xF3dulo...",empty:"No se encontr\xF3 nada.",navigate:"navegar",select:"seleccionar",close:"esc cerrar",groupShortcuts:"Mis atajos",groupModules:"M\xF3dulos"}};function yt(e){let t=se();return bl[t]?.[e]??bl.pt[e]}var hl=e=>typeof e=="string"?e:e[se()]||e.pt,xl=e=>typeof e=="string"?e:Object.values(e).join(" ");function vl(e){Qd();function t(k){return k.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function a(){return typeof e.toggleNotes!="function"||typeof e.toggleNotes.openWithPreset!="function"?[]:Re.list().map(k=>({id:`shortcut-${k.id}`,label:k.label,hint:{pt:"Atalho de nota \xB7 abre pr\xE9-preenchida",es:"Atajo de nota \xB7 abre precompletada",en:"Note shortcut \xB7 opens pre-filled"},keywords:`nota atalho atajo note shortcut preset ${k.alias||""}`,icon:et.bolt,group:"shortcuts",isPreset:!0,run:()=>{Re.registerUse(k.id),e.toggleNotes.openWithPreset(k)}}))}let o=[{id:"notes",label:"Case Notes",hint:{pt:"Montar a nota t\xE9cnica do caso",es:"Armar la nota t\xE9cnica del caso",en:"Build the technical note for the case"},keywords:"notas nota caso anotacoes anotaciones notes case",icon:et.notes,run:e.toggleNotes},{id:"precall",label:"Pre-call Checklist",hint:{pt:"Checklist antes da liga\xE7\xE3o, direto na nota",es:"Checklist antes de la llamada, directo en la nota",en:"Checklist before the call, straight into the note"},keywords:"precall pre call checklist ligacao llamada verificacao verificacion",icon:et.precall,run:e.togglePrecall},{id:"bauform",label:"BAU Form",hint:{pt:"Solicita\xE7\xE3o de cria\xE7\xE3o/descarte BAU",es:"Solicitud de creaci\xF3n/descarte BAU",en:"Request to create/discard a BAU case"},keywords:"bau formulario solicitacao solicitud criacao creacion descarte form request create discard",icon:et.bauform,run:e.toggleBAUForm},{id:"email",label:"Email Assistant",hint:{pt:"Templates inteligentes de e-mail",es:"Plantillas inteligentes de correo",en:"Smart email templates"},keywords:"email e-mail correio correo template plantilla",icon:et.email,run:e.toggleEmail},{id:"script",label:"Call Script",hint:{pt:"Guia interativo de chamada",es:"Gu\xEDa interactiva de llamada",en:"Interactive call guide"},keywords:"script roteiro guion chamada llamada ligacao call",icon:et.script,run:e.toggleScript},{id:"links",label:{pt:"Central de Links",es:"Central de Enlaces",en:"Links Central"},hint:{pt:"Ferramentas, SOPs e atalhos",es:"Herramientas, SOPs y atajos",en:"Tools, SOPs and shortcuts"},keywords:"links enlaces atalhos atajos ferramentas herramientas tools shortcuts sop sops",icon:et.links,run:e.toggleLinks},{id:"library",label:{pt:"Minha Biblioteca",es:"Mi Biblioteca",en:"My Library"},hint:{pt:"Snippets e respostas salvas",es:"Snippets y respuestas guardadas",en:"Saved snippets and replies"},keywords:"biblioteca library snippets respostas respuestas replies salvas guardadas saved",icon:et.library,run:e.toggleLibrary},{id:"timezone",label:{pt:"Fusos Hor\xE1rios",es:"Husos Horarios",en:"Time Zones"},hint:{pt:"Monitoramento e planejador de chamada",es:"Monitoreo y planificador de llamada",en:"Monitoring and call planner"},keywords:"fuso horario husos timezone time zone clock",icon:et.timezone,run:e.toggleTimezone},{id:"broadcast",label:{pt:"Avisos",es:"Avisos",en:"Broadcast"},hint:{pt:"Comunicados e disponibilidade BAU",es:"Comunicados y disponibilidad BAU",en:"Announcements and BAU availability"},keywords:"avisos broadcast comunicados announcements notices disponibilidade disponibilidad availability",icon:et.broadcast,run:()=>e.broadcastControl&&e.broadcastControl.toggle()},{id:"configs",label:{pt:"Configura\xE7\xF5es",es:"Configuraci\xF3n",en:"Settings"},hint:{pt:"Perfil, som e prefer\xEAncias",es:"Perfil, sonido y preferencias",en:"Profile, sound and preferences"},keywords:"configuracoes configuracion config settings preferencias preferences perfil profile som sonido sound",icon:et.configs,run:e.toggleConfigs}].map(k=>({...k,group:"modules"}));function i(){return[...a(),...o].filter(k=>typeof k.run=="function").map(k=>({...k,_haystack:t(`${xl(k.label)} ${xl(k.hint)} ${k.keywords}`)}))}let n=".cw-dialog-overlay, .cw-wiz-overlay, .cw-ob-lang-overlay, .cw-processing-card",r=!1,s=0,l=i(),p=l,d=[],A=null,u=null,h=document.createElement("div");h.className="cw-palette-overlay",h.setAttribute("role","dialog"),h.setAttribute("aria-modal","true"),h.setAttribute("aria-label",yt("ariaLabel"));let N=document.createElement("div");N.className="cw-palette",N.innerHTML=`
        <div class="cw-palette-search">
            <span class="cw-palette-search-icon">${et.search}</span>
            <input type="text" class="cw-palette-input" placeholder="${yt("placeholder")}" autocomplete="off" spellcheck="false">
        </div>
        <div class="cw-palette-list"></div>
        <div class="cw-palette-footer">
            <span class="js-cp-navigate">${et.arrowDown}${et.arrowUp} ${yt("navigate")}</span>
            <span class="js-cp-select">${et.enter} ${yt("select")}</span>
            <span class="js-cp-close">${yt("close")}</span>
        </div>
    `,h.appendChild(N),h.onmousedown=k=>{k.target===h&&X()};let v=N.querySelector(".cw-palette-input"),I=N.querySelector(".cw-palette-list");N.addEventListener("mousedown",k=>{k.target!==v&&k.preventDefault()});function z(k,{scroll:T=!1}={}){s=k,d.forEach((E,R)=>E.classList.toggle("selected",R===k)),T&&d[k]&&d[k].scrollIntoView({block:"nearest"})}function U(k){p.length&&z(It(s+k,0,p.length-1),{scroll:!0})}function B(){if(I.innerHTML="",d=[],p.length===0){I.innerHTML=`<div class="cw-palette-empty">${yt("empty")}</div>`;return}let k=null;p.forEach((T,E)=>{if(T.group!==k){k=T.group;let V=document.createElement("div");V.className="cw-palette-group",V.textContent=yt(T.group==="shortcuts"?"groupShortcuts":"groupModules"),V.setAttribute("aria-hidden","true"),I.appendChild(V)}let R=document.createElement("div");R.className="cw-palette-item",R.dataset.idx=E,R.innerHTML=`
                <span class="cw-palette-item-icon${T.isPreset?" cw-palette-item-icon--preset":""}">${T.icon}</span>
                <span class="cw-palette-item-text">
                    <span class="cw-palette-item-label"></span>
                    <span class="cw-palette-item-hint"></span>
                </span>
            `,R.querySelector(".cw-palette-item-label").textContent=hl(T.label),R.querySelector(".cw-palette-item-hint").textContent=hl(T.hint),I.appendChild(R),d.push(R)}),z(s,{scroll:!0})}let x={x:-1,y:-1};I.addEventListener("mousemove",k=>{if(k.clientX===x.x&&k.clientY===x.y)return;x={x:k.clientX,y:k.clientY};let T=k.target.closest(".cw-palette-item");T&&z(Number(T.dataset.idx))}),I.addEventListener("click",k=>{let T=k.target.closest(".cw-palette-item");T&&K(Number(T.dataset.idx))});function K(k){if(!r)return;let T=p[k];T&&(y.playClick(),X({restoreFocus:!1}),T.run())}function W(){r||(clearTimeout(A),r=!0,u=document.activeElement,l=i(),p=l,s=0,v.value="",B(),De(),document.body.appendChild(h),y.playGenieOpen(),requestAnimationFrame(()=>{r&&(h.classList.add("active"),v.focus())}))}function X({restoreFocus:k=!0}={}){if(r){if(r=!1,Me(),h.classList.remove("active"),A=setTimeout(()=>h.remove(),200),k&&u&&document.contains(u))try{u.focus({preventScroll:!0})}catch{}u=null}}function O(){r?X():W()}return v.addEventListener("input",()=>{let k=t(v.value.trim());p=k?l.filter(T=>T._haystack.includes(k)):l,s=0,B()}),h.addEventListener("keydown",k=>{k.key==="ArrowDown"||k.key==="ArrowUp"||k.key==="Tab"?(k.preventDefault(),U(k.key==="ArrowUp"||k.key==="Tab"&&k.shiftKey?-1:1)):k.key==="Enter"?(k.preventDefault(),K(s)):k.key==="Escape"&&(k.preventDefault(),k.stopPropagation(),X())}),document.addEventListener("keydown",k=>{!(k.metaKey||k.ctrlKey)||k.altKey||k.shiftKey||typeof k.key!="string"||k.key.toLowerCase()!=="k"||(k.preventDefault(),!k.repeat&&(!r&&document.querySelector(n)||O()))},!0),Le(()=>{h.setAttribute("aria-label",yt("ariaLabel")),v.placeholder=yt("placeholder");let k=N.querySelector(".js-cp-navigate");k&&(k.innerHTML=`${et.arrowDown}${et.arrowUp} ${yt("navigate")}`);let T=N.querySelector(".js-cp-select");T&&(T.innerHTML=`${et.enter} ${yt("select")}`);let E=N.querySelector(".js-cp-close");E&&(E.textContent=yt("close")),B()}),{open:W,close:X,toggle:O}}var yl={pt:"Erro cr\xEDtico ao iniciar o Case Wizard.",es:"Error cr\xEDtico al iniciar Case Wizard.",en:"Critical error starting Case Wizard."};function Zd(){if(window.techSolInitialized){Uo();return}window.techSolInitialized=!0;let e="v6.6.0";console.log(`\u{1F680} TechSol Suite Initializing (${e})...`);try{xi();try{y.initGlobalListeners()}catch(h){console.warn("\xC1udio bloqueado:",h)}fe.fetchContentModules(["tips","broadcast","bau_availability","links","call_script","email_template","note_template","task_screenshots","link_categories","link_highlights"]);let t=Uo(),a=_r(),o=Ur(),i=Jr(),n=is(),r=Es(),s=el(),l=ol(),p=il(),d=fl(),A=Ms(),u={toggleNotes:a,togglePrecall:o,toggleEmail:i,toggleScript:n,toggleLinks:r,toggleTimezone:s,toggleLibrary:l,toggleConfigs:p,toggleBAUForm:d,broadcastControl:A};Zi(u,t),vl(u),setTimeout(()=>{fe.logEvent("App","Start","Session Start");let h=ze();Ke.sync(),(h?ta(h.split("@")[0]).then(v=>{v&&(Un(v),pi(v))}).catch(v=>console.warn("N\xE3o foi poss\xEDvel resolver o idioma do perfil:",v)):Promise.resolve()).finally(()=>{let v=Promise.resolve().then(()=>Bs()),I=new Promise(z=>{setTimeout(()=>z(js(e)),500)});Promise.allSettled([t,v,I]).then(()=>setTimeout(Ws,1200))})},2500)}catch(t){console.error("Erro fatal na inicializa\xE7\xE3o:",t),y.playError(),te(yl[se()]||yl.pt,{error:!0})}}Zd();})();
