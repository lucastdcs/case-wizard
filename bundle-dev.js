(()=>{var Oo={production:"AKfycbxkheuq28ENsHMZMH8t9-u4EIrktHC6cBi-87boDre0jJfl1lnSCPBzaEkw6hy3Cx6fAg",development:"AKfycbyUtczRMulDAyO_1ku39Rb01zarPMw1JvO7aNOdJPYeAgCC7G9mmb-P_EuXP6kvo8l2LA"},ga="development",vr=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",Mo=Oo[ga]||Oo.development,Ga=vr?"dev":"exec",yr=`https://script.google.com/a/macros/google.com/s/${Mo}/${Ga}`,Do=Mo.slice(-6);function Yt(){return{env:ga,isDev:ga!=="production",endpoint:Ga,fingerprint:Do}}console.log(`[Case Wizard] backend: ${ga}/${Ga} \xB7 implanta\xE7\xE3o \u2026${Do}`);var wr="cw_data_broadcast",Sr="cw_data_tips",Ba="cw_content_",ja=new Set,Er=["Processando...","Mantenha o foco!","Aguarde..."];function Ar(e={}){return Object.keys(e).filter(t=>e[t]!==null&&e[t]!==void 0).map(t=>encodeURIComponent(t)+"="+encodeURIComponent(e[t])).join("&")}function Ze(e,t={}){return new Promise((a,o)=>{let i="cw_cb_"+Math.round(1e5*Math.random()),n=document.createElement("script"),r=setTimeout(()=>{document.body.contains(n)&&document.body.removeChild(n),delete window[i],o(new Error("Timeout: A API demorou muito para responder. (Apps Script bloqueado ou erro 500)"))},15e3);window[i]=m=>{clearTimeout(r),document.body.contains(n)&&document.body.removeChild(n),delete window[i],a(m)};let l=Ar(t),c=`${yr}?op=${e}&callback=${i}&t=${Date.now()}&${l}`;n.src=c,n.onerror=()=>{clearTimeout(r),document.body.contains(n)&&document.body.removeChild(n),delete window[i],o(new Error("Erro de conex\xE3o JSONP."))},document.body.appendChild(n)})}var me={fetchTips:async()=>{try{await me.fetchContentModule("tips")}catch(e){console.warn("Tips offline",e)}},getCachedBroadcasts:()=>{try{return JSON.parse(localStorage.getItem(wr)||"[]")}catch{return[]}},fetchContentModule:async e=>{if(ja.has(e)){let a=me.getCachedContent(e);if(a)return a}let t=`${Ba}${e}`;try{let a=await Ze("content_public",{module:e});if(a?.status==="success"&&Array.isArray(a.items))return localStorage.setItem(t,JSON.stringify(a.items)),ja.add(e),a.items}catch(a){console.warn(`Conte\xFAdo '${e}' offline`,a)}return me.getCachedContent(e)},fetchContentModules:async e=>{let t=(e||[]).filter(Boolean);if(!t.length)return{};try{let a=await Ze("content_public",{modules:t.join(",")});if(a?.status==="success"&&a.modules)return Object.keys(a.modules).forEach(o=>{let i=a.modules[o];Array.isArray(i)&&(localStorage.setItem(`${Ba}${o}`,JSON.stringify(i)),ja.add(o))}),a.modules}catch(a){console.warn("Pr\xE9-carregamento de conte\xFAdo indispon\xEDvel",a)}return{}},getCachedContent:e=>{try{return JSON.parse(localStorage.getItem(`${Ba}${e}`)||"null")}catch{return null}},getRandomTip:()=>{let e=null,t=me.getCachedContent("tips");if(Array.isArray(t)&&t.length&&(e=t.map(a=>a.value).filter(Boolean)),!e||!e.length){let a=localStorage.getItem(Sr);if(a)try{e=JSON.parse(a)}catch{}}return(!Array.isArray(e)||!e.length)&&(e=Er),e[Math.floor(Math.random()*e.length)]},logEvent:(e,t,a="",o=null)=>{try{let i="anon";try{let r=Ie();r&&(i=r.split("@")[0].toLowerCase())}catch{}let n={timestamp:new Date().toISOString(),user:i,version:"v5.1",category:e,action:t,label:a,value:o||""};Ze("log",n).catch(r=>{})}catch(i){console.warn("Analytics error",i)}},logUsage:()=>{},sendBAUEscalation:async(e,t)=>{let a={...e,user:t,date:new Date().toISOString()};try{console.log("Executando create_bau...",a);let o=await Ze("create_bau",a);if(o&&o.status==="success")return console.log("Sucesso: create_bau"),o;throw new Error(o?.error||o?.message||"Falha na opera\xE7\xE3o BAU")}catch(o){throw console.error("Erro JSONP (BAU):",o),o}},readAgentBAU:async()=>{let e=Ie();if(!e)return console.warn("Email n\xE3o encontrado. N\xE3o foi poss\xEDvel buscar casos BAU."),[];try{console.log("Buscando casos BAU para:",e);let t=await Ze("read_agent_bau",{user:e});if(t&&t.status==="success"&&Array.isArray(t.cases))return t.cases;if(t&&t.status==="error")throw new Error(t.message||"Erro retornado pela API de leitura");return[]}catch(t){throw console.error("Erro ao buscar casos BAU:",t),t}},updateBAUStatus:async(e,t,a={})=>{let o=Ie();try{console.log(`Atualizando status BAU ${e} para ${t}...`);let i=await Ze("update_bau_status",{id:e,status:t,user:o,...a});return i&&i.status==="success"}catch(i){return console.error("Erro ao atualizar status BAU:",i),!1}},updateBAUEscalation:async(e,t)=>{let a=Ie(),o={...t,id:e,user:a,date_edited:new Date().toISOString()};try{console.log(`Executando update_bau para ${e}...`,o);let i=await Ze("update_bau",o);if(i&&i.status==="success")return console.log("Sucesso: update_bau"),i;throw new Error(i?.error||i?.message||"Falha na atualiza\xE7\xE3o BAU")}catch(i){throw console.error("Erro JSONP (Update BAU):",i),i}},fetchUserProfile:async e=>{try{console.log(`Buscando perfil para: ${e}`);let t=await Ze("get_user_profile",{ldap:e});return console.log("Resposta bruta do servidor:",t),t&&t.status==="success"&&t.profile?t.profile:null}catch(t){return console.error("Erro ao buscar perfil:",t),null}},getUserSnippets:async e=>{try{return console.log("Buscando snippets para:",e),await Ze("get_user_snippets",{user:e})}catch(t){return console.error("Erro ao carregar snippets:",t),{status:"error",snippets:[]}}},saveSnippet:async(e,t)=>{let a={id:e.id,type:e.type,title:e.title,content:e.content,subject:e.subject||"",isCode:e.isCode,isRich:e.isRich,user:t};try{console.log("Salvando snippet na nuvem:",a);let o=await Ze("save_snippet",a);return o&&o.status==="success"}catch(o){return console.error("Erro ao salvar snippet:",o),!1}},deleteSnippet:async(e,t)=>{try{console.log(`Deletando snippet ${e}...`);let a=await Ze("delete_snippet",{id:e,user:t});return a&&a.status==="success"}catch(a){return console.error("Erro ao deletar snippet:",a),!1}},getUserPrefs:async e=>{try{let t=await Ze("get_user_prefs",{user:e});return t&&t.status==="success"?t.prefs||{}:null}catch(t){return console.warn("Erro ao carregar prefer\xEAncias:",t),null}},saveUserPrefs:async(e,t)=>{try{let a=await Ze("save_user_prefs",{user:t,prefs:JSON.stringify(e||{})});return!!(a&&a.status==="success")}catch(a){return console.warn("Erro ao salvar prefer\xEAncias:",a),!1}}},Fo=me.sendBAUEscalation,zo=me.readAgentBAU,vl=me.updateBAUStatus,Ro=me.updateBAUEscalation,zt=me.fetchUserProfile,yl=me.getUserSnippets,wl=me.saveSnippet,Sl=me.deleteSnippet,El=me.getUserPrefs,Al=me.saveUserPrefs;var pe=e=>new Promise(t=>setTimeout(t,e));function Re(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(a=>e.dispatchEvent(new MouseEvent(a,t)))}function Et(e){e&&["mousedown","mouseup","click"].forEach(t=>e.dispatchEvent(new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window})))}function Nt(e,t,a){return Math.max(t,Math.min(e,a))}var Xt=0,Rt=0;function Te(){if(Xt===0&&(Rt=window.innerWidth-document.documentElement.clientWidth,Rt>0)){let e=parseFloat(getComputedStyle(document.body).paddingRight)||0;document.body.style.paddingRight=`${e+Rt}px`}Xt++,document.body.style.overflow="hidden"}function qe(){if(Xt=Math.max(0,Xt-1),Xt===0&&(document.body.style.overflow="",Rt>0)){let e=parseFloat(getComputedStyle(document.body).paddingRight)||0,t=Math.max(0,e-Rt);document.body.style.paddingRight=t?`${t}px`:"",Rt=0}}var $o=!1;function Cr(){if($o||document.getElementById("cw-filled-check-styles"))return;let e=document.createElement("style");e.id="cw-filled-check-styles",e.textContent=`
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
    `,document.head.appendChild(e),$o=!0}var Po=!1;function kr(){if(Po||document.getElementById("cw-empty-state-styles"))return;let e=document.createElement("style");e.id="cw-empty-state-styles",e.textContent=`
        .cw-empty-illustrated { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 12px; padding: 32px 20px; }
        .cw-empty-illustrated-badge { border-radius: 50%; background: #F8F9FA; display: flex; align-items: center; justify-content: center; color: #9AA0A6; flex-shrink: 0; }
        .cw-empty-illustrated-badge svg { width: 44%; height: 44%; }
        .cw-empty-illustrated-title { font-family: 'Google Sans', Roboto, sans-serif; font-size: 15px; font-weight: 600; color: #202124; }
        .cw-empty-illustrated-subtitle { font-size: 12px; color: #5F6368; line-height: 1.5; max-width: 240px; }
    `,document.head.appendChild(e),Po=!0}function Kt({icon:e,title:t,subtitle:a="",size:o=88}){kr();let i=document.createElement("div");return i.className="cw-empty-illustrated",i.innerHTML=`
        <div class="cw-empty-illustrated-badge" style="width:${o}px;height:${o}px;">${e}</div>
        <div class="cw-empty-illustrated-title">${t}</div>
        ${a?`<div class="cw-empty-illustrated-subtitle">${a}</div>`:""}
    `,i}function ba(e,t){e.addEventListener("keydown",a=>{if(a.key!=="ArrowDown"&&a.key!=="ArrowUp")return;let o=document.activeElement;if(!o||!o.matches(t))return;let i=Array.from(e.querySelectorAll(t)).filter(l=>l.offsetParent!==null),n=i.indexOf(o);if(n===-1)return;a.preventDefault();let r=a.key==="ArrowDown"?Math.min(n+1,i.length-1):Math.max(n-1,0);i[r].focus()})}var Bo=!1;function Tr(){if(Bo||document.getElementById("cw-pending-field-styles"))return;let e=document.createElement("style");e.id="cw-pending-field-styles",e.textContent=`
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
    `,document.head.appendChild(e),Bo=!0}function jo(e,{duration:t=2400}={}){e&&(Tr(),e.classList.add("cw-quicklaunch-pending"),e.scrollIntoView({behavior:"smooth",block:"center"}),e.focus({preventScroll:!0}),setTimeout(()=>e.classList.remove("cw-quicklaunch-pending"),t))}function fa(e,{minLength:t=2}={}){Cr();let a=e.parentElement;a&&getComputedStyle(a).position==="static"&&(a.style.position="relative"),e.classList.add("cw-dopamine-field");let o=document.createElement("span");o.className="cw-dopamine-check",o.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',e.insertAdjacentElement("afterend",o);let i=()=>{let n=e.value.trim().length>=t;e.classList.toggle("filled",n),o.classList.toggle("show",n)};e.addEventListener("input",i),i()}function qr(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim()}var Lr={serviceHorizontal:["service horizontal","servico horizontal"],serviceOffering:["service offering","oferta de servicos","oferta de servicios"],specialization:["specialization","especializacao","especializacion"],routingChannel:["routing communication channel","canal de comunicacao de roteamento","canal de comunicacion de enrutamiento"],businessLanguage:["business language","linguagem comercial","idioma comercial"],vendorPartner:["vendor partner","parceiro fornecedor","socio proveedor"],appointmentTasks:["appointment tasks","tarefas de agendamento","tareas de la cita"],salesProgram:["sales program","programa de vendas","programa de ventas"],customerTimezone:["customer time zone","time zone","timezone","fuso horario do cliente","fuso horario","zona horaria del cliente","zona horaria"],externalCustomerId:["google ads external customer id","id de cliente externo do google ads","id de cliente externo de google ads"],additionalInfo:["additional info","informacoes adicionais","informacion adicional"],givenName:["given name","nome dado","nombre"],familyName:["family name","nome de familia","apellido"],contactEmail:["contact email","e-mail de contato","correo electronico de contacto"],loginEmail:["login email","e-mail de login","correo electronico de acceso"],phoneNumber:["phone number","numero de telefone","numero de telefono"],appointmentTime:["appointment time","horario da consulta","hora de la cita"],neoOrg:["neo org"],neoProduct:["neo product","produto neo","producto neo"],website:["website","site","sitio web"],program:["program","programa"],adsBusinessSector:["ads business sector"],interactionType:["interaction type"],salesRegion:["sales region"]},Nr=".form-label, .data-pair-label";function ha(e,t=document){let a=Lr[e];if(!a)return null;let o=new Set(a);return Array.from(t.querySelectorAll(Nr)).find(i=>o.has(qr(i.textContent)))||null}function Go(e){return e?.innerText?.trim()||e?.textContent?.trim()||""}function Ha(e,t=document){let a=ha(e,t);if(!a)return[];let o=a.closest("cuf-form-field");if(o){let l=Array.from(o.querySelectorAll('[debug-id="html-value"]')).map(Go).filter(Boolean);if(l.length)return l}let n=a.closest("home-data-item")?.querySelector(".data-pair-content")||a.parentElement?.querySelector(".data-pair-content")||a.parentElement?.querySelector("sanitized-content")||a.nextElementSibling,r=Go(n);return r?[r]:[]}function lt(e,t=document){return Ha(e,t)[0]||null}var Ho=/[A-Za-z0-9._%+-]+@google\.com/g,Ir=[/^ads-support@/i,/^noreply@/i,/^no-reply@/i,/-bot@/i],Uo=e=>Ir.some(t=>t.test(e));function _r(){return(document.querySelector('[debug-id="assignee"]')?.textContent.trim()||"").replace(/@.*$/,"").toLowerCase()||null}function Va(){let t=document.querySelector('[aria-label^="Signed in as"]')?.getAttribute("aria-label")?.replace(/^Signed in as\s+/i,"").trim();return t?t.toLowerCase():document.querySelector('img.photo[src*="/photos/"]')?.src?.match(/\/photos\/([^?/]+)/)?.[1]?.toLowerCase()||null}function Vo(){return document.querySelector(".active-case-log-container")||document}function Wo(){return Array.from(Vo().querySelectorAll("case-message-view"))}function Ua(){let e=new Set([_r(),Va()].filter(Boolean)),t=Wo().flatMap(a=>a.textContent.match(Ho)||[]).map(a=>a.toLowerCase());return[...new Set(t)].filter(a=>Uo(a)?!1:!e.has(a.replace(/@.*$/,"")))}function Or(e){return(Wo().find(o=>/contact us form|formul[áa]rio de contato|formulario de contacto/i.test(o.textContent))?.textContent.match(Ho)||[]).map(o=>o.toLowerCase()).find(o=>e.includes(o))||null}function Mr(){let e=document.querySelectorAll("internal-user-info");if(e.length!==1)return null;let t=e[0].querySelector(".email")?.textContent.trim().toLowerCase();return t&&!Uo(t)?t:null}async function Dr(){let e=Array.from(Vo().querySelectorAll(".message-header")).filter(t=>t.getAttribute("aria-expanded")==="false");for(let t of e)if(Et(t),await pe(400),Ua().length)return}async function Yo({expandir:e=!0}={}){let t=Ua(),a="case-log-visivel";!t.length&&e&&(await Dr(),t=Ua(),a="case-log-expandido");let o=null;return t.length===1?o=t[0]:t.length>1&&(o=Or(t),a=o?"contact-us-form":a),o||(o=Mr(),a=o?"internal-user-info":"nao-resolvido"),{email:o||null,origem:a}}var At=e=>document.querySelector(`[debug-id="${e}"]`)?.textContent.replace(/\s+/g," ").trim()||null;function Fr(){return document.querySelector('[debug-id="case-summary-input"] input')?.value.trim()||null}function Xo(){return{titulo:Fr(),estado:At("state-button"),slaRotulo:At("due-in-label"),slaTexto:At("due-in-text"),criadoEm:At("date-created-value"),tier:At("badge-text"),programaBadge:At("sales-program-badge"),paisCobranca:At("adwords-billing-country"),assignee:At("assignee")}}var zr=/[A-Za-z0-9._%+-]+@google\.com/;function Rr(){return Array.from(document.querySelectorAll("case-message-view")).map(e=>e.textContent.replace(/\s+/g," ").trim())}var xa=e=>Rr().find(t=>e.test(t))||null;function $r(){let e=xa(/appointment has been successfully created|agendamento foi criado/i);if(!e)return null;let t=e.match(/on ([A-Z][a-z]+ \d{1,2}) at ([\d:]+\s?[AP]M)/i),a=e.match(/\[([^\]]+)\]/),o=e.match(zr);return{data:t?.[1]||null,hora:t?.[2]||null,timezone:a?.[1]||null,designado:o?.[0]||null}}function Pr(){let e=xa(/\bTransfer\b|\bTransferência\b/i);if(!e)return null;let t=e.match(/(?:Transfer|Transferência)\s+(?:From|De)\s+(.+?)\s+(?:to|para)\s+(.+?)(?:\.\.\.|$)/i);return t?{de:t[1].trim(),para:t[2].trim()}:null}function Br(){let e=xa(/appointment .*was (?:automatically )?canceled|foi cancelad/i);if(!e)return null;let t=e.match(/\(Reason:\s*([^)]+)\)/i),a=e.match(/AppointmentId=\s*(\d+)\s*\)/i);return{motivo:t?.[1].trim()||null,appointmentId:a?.[1]||null}}function jr(){let e=xa(/\bDiscard\b|\bDescarte\b/i);if(!e)return null;let t=e.match(/(?:Discard|Descarte)\s+(.+?)(?:\.\.\.|$)/i);return t?{motivo:t[1].trim()}:null}function Ko(){return{agendamento:$r(),transferencia:Pr(),cancelamento:Br(),descarte:jr()}}var Ct="",It="",Jt=null;async function Wa(){try{if(!document.querySelector(".translated-form"))return!0;let e=document.querySelector('material-button[debug-id="toggle-translation-button"]');if(!e)return!1;console.log("TechSol: Tradu\xE7\xE3o detectada. Revertendo para o idioma original..."),e.click();for(let t=0;t<20;t++){if(!document.querySelector(".translated-form"))return!0;await pe(100)}return console.warn("TechSol: tradu\xE7\xE3o n\xE3o reverteu; seguindo pelos r\xF3tulos traduzidos."),!1}catch(e){return console.warn("TechSol: Erro ao tentar reverter tradu\xE7\xE3o:",e),!1}}async function Zt(){if(Ct&&It)return Ct;let e=Va();e&&!It&&(It=`${e}@google.com`);let t=e?e.split(/[._-]/)[0].replace(/^./,a=>a.toUpperCase()):null;try{let a=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!a)return Ct=t||"Consultor",Ct;a.click(),await pe(150);let o=t||"Consultor",i=document.querySelector("profile-details .name");if(i){let l=i.textContent.trim().split(" ")[0];l&&(o=l.charAt(0).toUpperCase()+l.slice(1).toLowerCase())}let n=document.querySelector("profile-details .email");return n&&(It=n.textContent.trim(),console.log("TechSol: Identidade confirmada ->",It)),a.click(),document.body.click(),Ct=o,o}catch(a){return console.warn("Sherlock falhou:",a),Ct=t||"Consultor",Ct}}function Qt(){return Ct||"Consultor"}function Ie(){return It||null}function Jo(e){let t=new Date,a=t.getHours(),o=t.getDay(),i="Ol\xE1",n="";a>=5&&a<12?(i="Bom dia",n='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):a>=12&&a<18?(i="Boa tarde",n='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(i="Boa noite",n='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let r=[];a>=0&&a<5?r=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:a<12?o===1?r=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?r=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:r=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:a<18?r=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:r=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(r=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let l=r[Math.floor(Math.random()*r.length)];return{prefix:`${i},`,name:e,suffix:l,icon:n,isFriday:o===5}}async function Gr(){try{let e=ha("contactEmail");if(!e)return null;let t=e.closest("cuf-form-field")||e.parentElement,a=t.querySelector(".unmask-button")||t.querySelector('[aria-label="Click to view"]');a&&(a.click(),await pe(500));let o=lt("contactEmail");return o&&o.includes("@")&&!o.includes("Is this:")?o.trim():null}catch(e){return console.warn("Erro ao capturar email do cliente:",e),null}}function Hr(e){let t=String(e||"").trim();if(!t||t.length>30||/^phone$/i.test(t)||t.includes("Is this:")||!/^[\d\s()+\-.]+$/.test(t))return!1;let a=t.replace(/\D/g,"");return a.length>=8&&a.length<=15}async function Ur(){try{let e=ha("phoneNumber");if(!e)return null;let t=e.closest("cuf-form-field")||e.parentElement;if(!t)return null;let a=t.querySelector(".unmask-button")||t.querySelector('[aria-label="Click to view"]');a&&(a.click(),await pe(500));let o=lt("phoneNumber");return Hr(o)?o.trim():null}catch(e){return console.warn("Erro ao capturar telefone do cliente:",e),null}}async function Vr(e){try{return await Yo(e)}catch(t){return console.warn("Erro ao resolver AM:",t),{email:null,origem:"erro"}}}function Wr(){try{let e=lt("externalCustomerId");if(!e)return"N/A";let t=e.replace(/\D/g,"");return t.length!==10?"N/A":t.replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(e){console.warn("Erro ao capturar CID:",e)}return"N/A"}function Yr(e){return e?.email||null}function Xr(){try{return lt("customerTimezone")}catch(e){console.warn("Erro ao capturar Timezone:",e)}return null}async function Kr(){try{let t=document.querySelector('[debug-id="case-id"]')?.textContent?.match(/\d-\d{6,}/)?.[0];return t||window.location.href.split("/").pop()||"---"}catch(e){return console.warn("Falha ao capturar Case ID:",e),"---"}}function Jr(){try{return lt("salesProgram")||""}catch(e){console.warn("Erro ao capturar Sales Program:",e)}return""}function Zr(){try{return lt("familyName")||""}catch(e){console.warn("Falha Sobrenome:",e)}return""}function Qr(){try{return lt("businessLanguage")||"N/A"}catch(e){console.warn("Erro ao capturar Idioma:",e)}return"N/A"}function es(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(a=>a.textContent.includes("Speakeasy ID")||a.textContent.includes("SE ID"));if(t){let a=t.closest(".data-pair")||t.parentElement,o=a.querySelector(".data-pair-content")||a.nextElementSibling;if(o&&o.textContent.trim())return o.textContent.trim()}}catch(e){console.warn("Erro ao capturar SE ID:",e)}return"N/A"}function Zo(e){e&&(Jt=e)}function ea(){return String(Jt?.defaultLanguage||"").toUpperCase()==="ES"?"ES":"PT"}async function tt(){await Wa(),It||await Zt();let e=lt("givenName")||"Cliente",t=lt("website")||"",a=Ha("appointmentTasks"),[o,i]=await Promise.all([Gr(),Ur()]),n=await Vr(),r=Wr(),l=Yr(n),c=Xr(),m=Xo(),p=Ko(),f=await Kr(),u=Jr(),g=Qr(),k=es(),w=Zr(),S=Ie();if(S&&!Jt){let I=S.split("@")[0];try{Jt=await zt(I)}catch(A){console.warn("Falha ao carregar perfil do usu\xE1rio:",A)}}return{advertiserName:e,websiteUrl:t,clientEmail:o,internalEmail:n.email,cid:r,amName:l,amEmail:n.email,amOrigem:n.origem,appointmentTasks:a,caseContext:m,caseLog:p,timezone:c,agentName:Qt(),agentEmail:Ie(),caseId:f,userProfile:Jt,advName:e,site:t,website:t,email:o,advEmail:o,salesProgram:u,language:g,seId:k,advLastName:w,advPhone:i}}var _t=null,Ya=null,ta=null,Xa=0,st=.3;var at=localStorage.getItem("cw_sounds_muted")==="true";function ft(){if(!_t){let e=window.AudioContext||window.webkitAudioContext;e&&(_t=new e)}return _t&&_t.state==="suspended"&&_t.resume(),_t}function Qo(e){if(Ya)return Ya;let t=e.sampleRate*2,a=e.createBuffer(1,t,e.sampleRate),o=a.getChannelData(0);for(let i=0;i<t;i++)o[i]=Math.random()*2-1;return Ya=a,a}var v={setMuted:e=>{at=e,localStorage.setItem("cw_sounds_muted",e)},isMuted:()=>at,playClick:()=>{if(at)return;let e=ft();if(!e)return;let t=e.currentTime,a=e.createBufferSource();a.buffer=Qo(e);let o=e.createBiquadFilter();o.type="highpass",o.frequency.value=4e3;let i=e.createGain();i.gain.setValueAtTime(st*.8,t),i.gain.exponentialRampToValueAtTime(.001,t+.015),a.connect(o),o.connect(i),i.connect(e.destination),a.start(t),a.stop(t+.02)},playHover:()=>{if(at)return;let e=ft();if(!e)return;let t=e.currentTime,a=e.createOscillator();a.type="sine",a.frequency.setValueAtTime(400,t);let o=e.createGain();o.gain.setValueAtTime(0,t),o.gain.linearRampToValueAtTime(st*.1,t+.005),o.gain.linearRampToValueAtTime(0,t+.02),a.connect(o),o.connect(e.destination),a.start(t),a.stop(t+.03)},playSuccess:()=>{if(at)return;let e=ft();if(!e)return;let t=e.currentTime;[1046.5,1567.9].forEach((o,i)=>{let n=e.createOscillator(),r=e.createGain();n.type="sine",n.frequency.value=o,r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(st*.6,t+.05),r.gain.exponentialRampToValueAtTime(.001,t+.6),n.connect(r),r.connect(e.destination),n.start(t),n.stop(t+.7)})},playGenieOpen:()=>{if(at)return;let e=ft();if(!e)return;let t=e.currentTime,a=e.createBufferSource();a.buffer=Qo(e);let o=e.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(100,t),o.frequency.exponentialRampToValueAtTime(800,t+.2);let i=e.createGain();i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(st*.5,t+.05),i.gain.linearRampToValueAtTime(0,t+.25),a.connect(o),o.connect(i),i.connect(e.destination),a.start(t),a.stop(t+.3)},playError:()=>{if(at)return;let e=ft();if(!e)return;let t=e.currentTime,a=e.createOscillator(),o=e.createGain();a.type="triangle",a.frequency.setValueAtTime(120,t),a.frequency.exponentialRampToValueAtTime(80,t+.1),o.gain.setValueAtTime(st,t),o.gain.exponentialRampToValueAtTime(.001,t+.15),a.connect(o),o.connect(e.destination),a.start(t),a.stop(t+.2)},playStartup:()=>{if(at)return;let e=ft();if(!e)return;let t=e.currentTime,a=.12,o=e.createOscillator(),i=e.createGain(),n=e.createBiquadFilter();o.type="square",o.frequency.setValueAtTime(400,t),o.frequency.exponentialRampToValueAtTime(50,t+.1),n.type="lowpass",n.frequency.setValueAtTime(800,t),n.frequency.exponentialRampToValueAtTime(100,t+.1),i.gain.setValueAtTime(st*4,t),i.gain.exponentialRampToValueAtTime(.001,t+.1),o.connect(n),n.connect(i),i.connect(e.destination),o.start(t),o.stop(t+.12);let r=e.createOscillator(),l=e.createGain();r.type="sine",r.frequency.setValueAtTime(150,t),r.frequency.exponentialRampToValueAtTime(50,t+.15),l.gain.setValueAtTime(st*1.5,t),l.gain.exponentialRampToValueAtTime(.001,t+.15),r.connect(l),l.connect(e.destination),r.start(t),r.stop(t+.15),[55,55.4,110.5].forEach(m=>{let p=e.createOscillator(),f=e.createGain(),u=e.createBiquadFilter();p.type="sawtooth",p.frequency.value=m,u.type="lowpass",u.frequency.setValueAtTime(30,t),u.frequency.linearRampToValueAtTime(900,t+a+.2),u.frequency.exponentialRampToValueAtTime(40,t+3),f.gain.setValueAtTime(0,t),f.gain.linearRampToValueAtTime(st*.6,t+a+.1),f.gain.exponentialRampToValueAtTime(.001,t+3.5),p.connect(u),u.connect(f),f.connect(e.destination),p.start(t),p.stop(t+3.6)})},playNotification:()=>{if(at)return;let e=ft();if(!e)return;let t=e.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(o=>{let i=e.createOscillator(),n=e.createGain();i.type="sine",i.frequency.setValueAtTime(o.freq,t),n.gain.setValueAtTime(0,t),n.gain.linearRampToValueAtTime(st*o.vol,t+.004),n.gain.exponentialRampToValueAtTime(.001,t+o.dur),i.connect(n),n.connect(e.destination),i.start(t),i.stop(t+o.dur+.1)})},playReady:()=>{if(at)return;let e=ft();if(!e)return;let t=e.currentTime;[{freq:587.33,at:0,dur:.2,vol:.26},{freq:880,at:.09,dur:.3,vol:.3},{freq:1760,at:.09,dur:.26,vol:.08}].forEach(o=>{let i=e.createOscillator(),n=e.createGain();i.type="sine",i.frequency.value=o.freq;let r=t+o.at;n.gain.setValueAtTime(0,r),n.gain.linearRampToValueAtTime(st*o.vol,r+.02),n.gain.exponentialRampToValueAtTime(.001,r+o.dur),i.connect(n),n.connect(e.destination),i.start(r),i.stop(r+o.dur+.05)})},startThinking:()=>{if(at)return;let e=ft();if(!e||ta)return;let t=[523.25,659.25,783.99];Xa=0;let a=()=>{if(at)return;let o=e.currentTime,i=e.createOscillator(),n=e.createGain();i.type="sine",i.frequency.setValueAtTime(t[Xa%t.length],o),n.gain.setValueAtTime(0,o),n.gain.linearRampToValueAtTime(st*.15,o+.02),n.gain.exponentialRampToValueAtTime(.001,o+.22),i.connect(n),n.connect(e.destination),i.start(o),i.stop(o+.25),Xa++};a(),ta=setInterval(a,370)},stopThinking:()=>{ta&&(clearInterval(ta),ta=null)},playSwoosh:()=>{v.playGenieOpen()},playReset:()=>{v.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let e=0,t=50;document.addEventListener("mouseover",a=>{if(!_t)return;let o=a.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!o||o.contains(a.relatedTarget))return;let i=Date.now();i-e<t||(v.playHover(),e=i)},{passive:!0})}};var en="cw_ui_lang",tn=["pt","es"];function ts(){try{let e=typeof localStorage<"u"?localStorage.getItem(en):null;return tn.includes(e)?e:null}catch{return null}}var Ja=ts(),aa=Ja||"pt",Ka=new Set;function de(){return aa}function as(e){return tn.includes(e)}function Za(e,{persist:t=!0}={}){if(!(!as(e)||e===aa)){if(aa=e,t){Ja=e;try{typeof localStorage<"u"&&localStorage.setItem(en,e)}catch{}}Ka.forEach(a=>{try{a(aa)}catch(o){console.warn("i18n listener falhou:",o)}})}}function an(e){if(Ja)return;let t=String(e?.defaultLanguage||"").toUpperCase(),o={"PT-BR":"pt",PT:"pt",ES:"es"}[t];o&&Za(o,{persist:!1})}function Ae(e){return Ka.add(e),()=>Ka.delete(e)}function on(e){return function(a){return e[aa]?.[a]??e.pt?.[a]??a}}var $e={MODULE_RESTING:2147483640,MODULE_FOCUSED:2147483641,PAGE_SPOTLIGHT_OVERLAY:2147483642,PAGE_SPOTLIGHT_TARGET:2147483643,TOAST:2147483644,FOCUS_BACKDROP:2147483646,TOP:2147483647};var nn=["lucaste","ricardogi"],$t="https://docs.google.com/forms/d/1v8mi4eLmx3a2GX2lEMmxMDR2n8AdzGL9WP_p_YEaveg/viewform",ct="@lucaste";var Qa=$e.MODULE_RESTING;function sn(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}function te(e,t={}){let a=document.createElement("div"),o=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(a.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:String($e.TOAST),opacity:"0",transition:"all 0.4s var(--cw-ease-spring)",pointerEvents:"none"}),a.textContent=e,document.body.appendChild(a),t.error?v.playError():v.playSuccess(),requestAnimationFrame(()=>{a.style.opacity="1",a.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{a.style.opacity="0",a.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>a.remove(),400)},t.duration||4e3)}function ln(e,t=null){let a=0,o=0,i=0,n=0,r=t||e;r.style.cursor="grab",r.onmousedown=l;function l(p){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(p.target.tagName)||p.target.closest(".no-drag"))return;p=p||window.event,r.style.cursor="grabbing",e.style.transition="none";let f=e.getBoundingClientRect();e.style.transform="none",e.style.left=f.left+"px",e.style.top=f.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",Qa=Math.min(Qa+1,$e.MODULE_FOCUSED),e.style.zIndex=Qa,i=p.clientX,n=p.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=m,document.onmousemove=c}function c(p){p=p||window.event,p.preventDefault(),a=i-p.clientX,o=n-p.clientY,i=p.clientX,n=p.clientY;let f=e.offsetTop-o,u=e.offsetLeft-a,g=16,k=window.innerWidth,w=window.innerHeight,S=e.offsetWidth,I=e.offsetHeight;u=Nt(u,g,k-S-g),f=Nt(f,g,w-I-g),e.style.top=f+"px",e.style.left=u+"px"}function m(){document.onmouseup=null,document.onmousemove=null,r.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s var(--cw-ease-decelerate), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var We={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:String($e.MODULE_RESTING),overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08),
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var eo={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},cn={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var dn={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var rn=!1;function os(){if(rn||document.getElementById("techsol-google-styles"))return;let e=document.createElement("style");e.id="techsol-google-styles",e.innerHTML=`
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
    `,document.head.appendChild(e),rn=!0}function pn(e){os(),e.classList.remove("google-animate-click"),e.offsetWidth,e.classList.add("google-animate-click"),setTimeout(()=>{e.classList.remove("google-animate-click")},600)}async function ns(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let a=e.querySelector(".cursor");await pe(200);for(let o=0;o<t.length;o++){let i=t.charAt(o),n=document.createElement("span");n.textContent=i,a&&a.parentNode===e?a.before(n):e.appendChild(n);let r=Math.floor(Math.random()*60)+30;o===0&&(r=150),o>t.length-3&&(r=30),await pe(r)}await pe(600),a&&(a.style.display="none")}async function to(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
            /* Google Sans j\xE1 vem via <link> logo acima em initGlobalStylesAndFont(),
               chamada antes da splash - esse @import era uma 3a requisi\xE7\xE3o redundante
               pra fonte (a 1a \xE9 o <link>, a 2a era o do command-center.js). */
            .splash-container { font-family: 'Google Sans', sans-serif; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #202124; z-index: ${$e.TOP}; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1); }
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
                <div class="sextou-badge">\u{1F389} Sextou!</div>
            </div>
        </div>
        <div class="credit-pro">created by <span>${ct}</span></div>
        <div class="loader-line"></div>
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await pe(200);let t=await Zt(),a=Jo(t),o=e.querySelector("#w-icon"),i=e.querySelector("#p1"),n=e.querySelector("#p2"),r=e.querySelector("#p3"),l=e.querySelector("#p-sextou");o&&(o.innerHTML=a.icon),i&&(i.textContent=a.prefix),r&&(r.textContent=a.suffix),await pe(300);let c=o?o.querySelector("svg"):null;if(c&&(c.style.opacity="1",c.style.transform="scale(1)"),await pe(400),i&&(i.style.opacity="1"),v.playStartup(),n&&await ns(n,a.name),r&&(r.style.opacity="1",r.style.transform="translateY(0)"),a.isFriday&&l){await pe(400),l.style.display="block",l.offsetWidth;let m=l.querySelector(".sextou-badge");m&&(m.style.opacity="1",m.style.transform="scale(1)")}await pe(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await pe(900),e.parentNode&&e.parentNode.removeChild(e)}}function un(e){if(!e)return;let t=e.getBoundingClientRect(),a=window.innerWidth,o=window.innerHeight,i=24,n=a-t.width-i,r=o-t.height-i,l=parseFloat(e.style.left)||t.left,c=parseFloat(e.style.top)||t.top,m=Nt(l,i,n),p=Nt(c,i,r);if(m!==l||p!==c){let f=e.style.transition;e.style.transition="left 0.3s var(--cw-ease-elastic), top 0.3s var(--cw-ease-elastic)",e.style.left=`${m}px`,e.style.top=`${p}px`,setTimeout(()=>{e.style.transition=f},300)}}var dt={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function pt(e,t){t.onmousedown=a;function a(o){o.stopPropagation(),o.preventDefault();let i=e.style.transition;e.style.transition="none";let n=o.clientX,r=o.clientY,l=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),c=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),m=n,p=r,f=!1;function u(w){m=w.clientX,p=w.clientY,f||(window.requestAnimationFrame(()=>{g(),f=!1}),f=!0)}function g(){let w=l+(m-n),S=c+(p-r);w>360&&(e.style.width=w+"px"),S>300&&(e.style.height=S+"px")}function k(){document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",k),setTimeout(()=>{e.style.transition=i},50)}document.addEventListener("mousemove",u),document.addEventListener("mouseup",k)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}function oa(e){if(!e||e==="N/A"||e==="undefined")return"Data indispon\xEDvel";if(String(e).includes(" | "))return e.split(" | ").map(t=>oa(t.trim())).filter(t=>t!=="Data indispon\xEDvel").join(" | ");try{let t=new Date(e);if(isNaN(t.getTime()))return"Data indispon\xEDvel";let a=t.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}),o=t.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});return`${a} \xE0s ${o}`}catch{return"Data indispon\xEDvel"}}function mn(e){if(!e)return"";let t={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return e.replace(/:([a-zA-Z0-9-_+]+):/g,a=>t[a]?t[a]:"")}function gn(){let e=document.createElement("div");return e.className="cw-dialog-overlay",Object.assign(e.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:$e.TOP,opacity:0,transition:"opacity 0.3s ease"}),e}function bn(){let e=document.createElement("div");return Object.assign(e.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s var(--cw-ease-spring)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),e}function De(e,t={}){return new Promise(a=>{let o=gn(),i=bn(),n=t.danger?"#FF3B30":"#007AFF",r=de()==="es"?"Eliminar":"Excluir",l=t.confirmText||(t.danger?r:"Confirmar");i.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${e}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${n}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${l}</button>
            </div>
        `,o.appendChild(i),document.body.appendChild(o),requestAnimationFrame(()=>{o.style.opacity=1,i.style.transform="scale(1)"});let c=f=>{o.style.opacity=0,i.style.transform="scale(0.9)",setTimeout(()=>{o.remove(),a(f)},300)},m=i.querySelector("#cw-conf-cancel"),p=i.querySelector("#cw-conf-ok");[m,p].forEach(f=>f.onmouseenter=()=>v.playHover()),m.onclick=()=>{v.playClick(),c(!1)},p.onclick=()=>{v.playClick(),c(!0)}})}function va(e,t=""){return new Promise(a=>{let o=gn(),i=bn();i.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${e}</div>
            <input type="text" id="cw-prompt-input" value="${t}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,o.appendChild(i),document.body.appendChild(o);let n=i.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{o.style.opacity=1,i.style.transform="scale(1)",setTimeout(()=>n.focus(),100)});let r=m=>{o.style.opacity=0,i.style.transform="scale(0.9)",setTimeout(()=>{o.remove(),a(m)},300)},l=i.querySelector("#cw-prompt-cancel"),c=i.querySelector("#cw-prompt-ok");[l,c].forEach(m=>m.onmouseenter=()=>v.playHover()),l.onclick=()=>{v.playClick(),r(null)},c.onclick=()=>{v.playClick(),r(n.value)},n.onkeydown=m=>{m.key==="Enter"&&c.click(),m.key==="Escape"&&l.click()}})}var ao=class{constructor(){this.visible=!1,this.reset()}reset(){this.currentCaseType="bau",this.currentLang="pt",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.activeFields=[];let t=typeof localStorage<"u"?localStorage.getItem("cw-notes-favorites"):null;this.favorites=new Set(JSON.parse(t||"[]")),this.screenshotMode="implementation",this.notify()}setCaseType(t){this.currentCaseType!==t&&(this.currentCaseType=t,this.isDirty=!0,this.notify())}setLanguage(t){this.currentLang!==t&&(this.currentLang=t,this.notify())}setPortugalCase(t){this.isPortugalCase!==t&&(this.isPortugalCase=t,this.isDirty=!0,this.notify())}setConsent(t){this.consent!==t&&(this.consent=t,this.isDirty=!0,this.notify())}setTagSupportUsed(t){this.tagSupportUsed=t,t||this.forcedScreenshots.clear(),this.isDirty=!0,this.notify()}setActiveFields(t){this.activeFields=[...t],this.isDirty=!0,this.notify()}removeField(t){this.activeFields=this.activeFields.filter(a=>a!==t),this.isDirty=!0,this.notify()}addFieldAt(t,a){this.activeFields.includes(t)||(this.activeFields.splice(a,0,t),this.isDirty=!0,this.notify())}setForcedScreenshots(t){this.forcedScreenshots=new Set(t),this.isDirty=!0,this.notify()}toggleForcedScreenshot(t,a){a?this.forcedScreenshots.add(t):this.forcedScreenshots.delete(t),this.isDirty=!0,this.notify()}setStatus(t){this.currentStatus!==t&&(this.currentStatus=t,this.isDirty=!0,this.notify())}setSubStatus(t){this.currentSubStatus!==t&&(this.currentSubStatus=t,this.isDirty=!0,this.notify())}setScreenshotMode(t){this.screenshotMode=t,this.notify()}setActiveTasks(t){this.activeTasks=t,this.isDirty=!0,this.notify()}toggleFavorite(t){this.favorites.has(t)?this.favorites.delete(t):this.favorites.add(t),typeof localStorage<"u"&&localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(t,a){this.formData[t]!==a&&(this.formData[t]=a,this.isDirty=!0,this.notify())}listeners=[];subscribe(t){return this.listeners.push(t),()=>this.listeners=this.listeners.filter(a=>a!==t)}notify(){this.listeners.forEach(t=>t(this))}},K=new ao;var fn={pt:{helpTooltip:"Sobre & Feedback",closeTooltip:"Fechar",version:"Vers\xE3o",reportLink:"Reportar Bug ou Sugest\xE3o",backBtn:"Voltar",createdBy:"criado por"},es:{helpTooltip:"Acerca de y Comentarios",closeTooltip:"Cerrar",version:"Versi\xF3n",reportLink:"Reportar error o sugerencia",backBtn:"Volver",createdBy:"creado por"}};function ot(e){let t=de();return fn[t]?.[e]??fn.pt[e]??e}var is={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},hn={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Pe(e,t,a,o,i,n){let r=document.createElement("div");Object.assign(r.style,is),ln(e,r);let l=document.createElement("div");if(Object.assign(l.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",backgroundSize:"300% auto",zIndex:"10",opacity:"0.8"}),!document.getElementById("cw-header-anim")){let A=document.createElement("style");A.id="cw-header-anim",A.innerHTML=`
            @keyframes cw-header-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `,document.head.appendChild(A)}window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||(l.style.animation="cw-header-flow 6s linear infinite"),r.appendChild(l),i&&(i.googleLine=l);let m=document.createElement("div");Object.assign(m.style,{display:"flex",alignItems:"center",gap:"12px"});let p=document.createElement("div");p.innerHTML='<svg viewBox="0 0 48 48" width="20" height="20"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/></svg>',Object.assign(p.style,{width:"20px",height:"20px",pointerEvents:"none",flexShrink:"0",display:"flex"});let f=document.createElement("span");f.textContent=t,m.appendChild(p),m.appendChild(f);let u=document.createElement("div");Object.assign(u.style,{display:"flex",alignItems:"center",gap:"4px"});let g='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',k='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',w=document.createElement("div");w.innerHTML=g,Object.assign(w.style,hn),w.title=ot("helpTooltip"),w.classList.add("no-drag"),w.onmouseenter=()=>{w.style.background="rgba(255,255,255,0.1)",w.style.color="#FFF"},w.onmouseleave=()=>{w.style.color!=="rgb(138, 180, 248)"&&(w.style.background="transparent",w.style.color="#9AA0A6")};let S=document.createElement("div");S.innerHTML=k,Object.assign(S.style,hn),S.title=ot("closeTooltip"),S.classList.add("no-drag","cw-header-close"),S.onmouseenter=()=>{S.style.background="rgba(242, 139, 130, 0.2)",S.style.color="#F28B82"},S.onmouseleave=()=>{S.style.background="transparent",S.style.color="#9AA0A6"},S.onmousedown=A=>A.stopPropagation(),w.onmousedown=A=>A.stopPropagation(),S.onclick=n;let I=rs(e,t,a,o);return w.onclick=A=>{A.stopPropagation(),I.style.opacity==="1"?(I.style.opacity="0",I.style.pointerEvents="none",w.style.color="#9AA0A6",w.style.background="transparent"):(I.style.opacity="1",I.style.pointerEvents="auto",w.style.color="#8AB4F8",w.style.background="rgba(138, 180, 248, 0.1)")},u.appendChild(w),u.appendChild(S),r.appendChild(m),r.appendChild(u),Ae(()=>{w.title=ot("helpTooltip"),S.title=ot("closeTooltip")}),r}function rs(e,t,a,o){let i=document.createElement("div");return Object.assign(i.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),i.innerHTML=`
        <div class="cw-help-title" style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${t}</div>
        <div class="cw-help-version" style="color: #5f6368; font-size: 14px; margin-bottom: 24px;">${ot("version")} ${a}</div>

        <div class="cw-help-description" style="color: #3c4043; font-size: 14px; max-width: 90%; line-height: 1.6; margin-bottom: 24px;">
            ${o}
        </div>

        <div style="margin-bottom: 32px;">
            <a href="${$t}" target="_blank" rel="noopener noreferrer" id="cw-feedback-link" style="
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
            ">
                <span>\u{1F4AC}</span> <span class="cw-help-report-link">${ot("reportLink")}</span>
            </a>
        </div>

        <div class="cw-help-created-by" style="font-size: 12px; color: #9aa0a6;">
            ${ot("createdBy")} <span style="color: #1a73e8; font-weight: 500;">${ct}</span>
        </div>

        <button id="close-help-internal" style="margin-top: 24px; padding: 8px 24px; border: 1px solid #dadce0; background: white; border-radius: 18px; color: #5f6368; cursor: pointer; font-weight: 500; transition: background 0.2s;">
            ${ot("backBtn")}
        </button>
    `,setTimeout(()=>{let n=i.querySelector("#cw-feedback-link");n&&(n.onmouseenter=()=>{n.style.backgroundColor="#E8F0FE",n.style.transform="scale(1.02)"},n.onmouseleave=()=>{n.style.backgroundColor="#F8F9FA",n.style.transform="scale(1)"});let r=i.querySelector("#close-help-internal");r&&(r.onmouseover=()=>r.style.backgroundColor="#f8f9fa",r.onmouseout=()=>r.style.backgroundColor="white",r.onclick=()=>{i.style.opacity="0",i.style.pointerEvents="none"})},0),Ae(()=>{let n=i.querySelector(".cw-help-version");n&&(n.textContent=`${ot("version")} ${a}`);let r=i.querySelector(".cw-help-report-link");r&&(r.textContent=ot("reportLink"));let l=i.querySelector(".cw-help-created-by");l&&(l.firstChild.textContent=`${ot("createdBy")} `);let c=i.querySelector("#close-help-internal");c&&(c.textContent=ot("backBtn"))}),e.appendChild(i),i}var V={blue:"#4285F4",red:"#EA4335",yellow:"#FBBC05",green:"#34A853",primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#34A853",warning:"#FBBC05",error:"#EA4335"},_e={small:"8px",medium:"12px",large:"20px",pill:"100px"},ht={subtle:"0 1px 3px rgba(0,0,0,0.08)",card:"0 4px 12px rgba(0,0,0,0.05)",elevated:"0 12px 24px rgba(0,0,0,0.08)",apple:"0 20px 40px rgba(0,0,0,0.12)"},ve="cubic-bezier(0.34, 1.56, 0.64, 1)",ss={width:"100%",padding:"14px 16px",borderRadius:_e.medium,border:`1.5px solid ${V.border}`,backgroundColor:V.bgInput,fontSize:"14px",color:V.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`all 0.3s ${ve}`,outline:"none"},tc={...ss,minHeight:"120px",resize:"vertical",lineHeight:"1.6"},ac={fontSize:"12px",fontWeight:"700",color:V.textSub,textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px 0"},oc={display:"block",fontSize:"14px",fontWeight:"600",color:V.text,marginBottom:"10px",marginTop:"20px"},nc={fontSize:"12px",color:V.warning,marginTop:"8px",display:"flex",alignItems:"center",gap:"8px",fontWeight:"500"},oo={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:V.primary},ic={display:"flex",alignItems:"center",marginBottom:"12px",fontSize:"14px",fontWeight:"500",color:V.text,cursor:"pointer",padding:"16px 20px",backgroundColor:V.surface,border:`1px solid ${V.border}`,borderRadius:_e.large,transition:`all 0.4s ${ve}`,userSelect:"none",boxShadow:ht.subtle},rc={padding:"14px 28px",color:"#fff",backgroundColor:V.primary,border:"none",borderRadius:_e.pill,fontSize:"15px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px 0 rgba(26,115,232,0.39)",transition:`all 0.25s ${ve}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",outline:"none"},sc={width:"100%",padding:"12px",background:"#FFFFFF",border:`1.5px dashed ${V.primary}`,color:V.primary,borderRadius:_e.medium,cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"16px",transition:`all 0.25s ${ve}`},lc={background:"transparent",border:`1px solid ${V.border}`,borderRadius:_e.pill,color:V.textSub,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",margin:"20px auto",transition:`all 0.25s ${ve}`};var na={pt:"Gera notas padronizadas com excel\xEAncia visual.",es:"Genera notas estandarizadas con excelencia visual."};function xn(e,t){let a=document.createElement("div");a.id="notes-assistant-popup",a.classList.add("cw-module-window"),Object.assign(a.style,We,{right:"100px",width:"520px",height:"740px",display:"flex",flexDirection:"column",transition:`width 0.4s ${ve}, height 0.4s ${ve}, transform 0.4s ${ve}, opacity 0.3s ease`,borderRadius:_e.large,boxShadow:ht.apple,border:"1px solid rgba(255, 255, 255, 0.7)"});let o={popup:a,googleLine:null},i=Pe(a,"Case Notes",e,na[de()]||na.pt,o,t);a.appendChild(i);let n=document.createElement("div");n.className="cw-popup-content",Object.assign(n.style,{padding:"24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"24px",background:V.surface}),a.appendChild(n);let r=document.createElement("div");r.textContent=`created by ${ct}`,Object.assign(r.style,dn,{padding:"16px 24px",borderTop:`1px solid ${V.bgInput}`,color:V.textSub,fontSize:"11px",marginTop:"auto",fontWeight:"500",letterSpacing:"0.5px"}),a.appendChild(r);let l=document.createElement("div");return Object.assign(l.style,dt),l.className="no-drag",a.appendChild(l),pt(a,l),ls(),{popup:a,content:n,header:i,animRefs:o,credit:r}}function ls(){if(document.getElementById("cw-notes-refactor-styles"))return;let e=document.createElement("style");e.id="cw-notes-refactor-styles",e.innerHTML=`
        .cw-popup-content::-webkit-scrollbar { width: 8px; }
        .cw-popup-content::-webkit-scrollbar-track { background: transparent; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; border: 2px solid #fff; }
        .cw-popup-content::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .cw-input, .cw-textarea, .cw-select {
            width: 100% !important;
            padding: 12px 16px !important;
            border-radius: ${_e.medium} !important;
            border: 1.5px solid ${V.border} !important;
            font-size: 14px !important;
            font-family: 'Google Sans', Roboto, sans-serif !important;
            transition: border-color 0.2s ${ve}, background-color 0.2s ${ve}, box-shadow 0.2s ${ve} !important;
            box-sizing: border-box !important;
            background: ${V.bgInput} !important;
            color: ${V.text} !important;
            outline: none !important;
            box-shadow: ${ht.subtle} !important;
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
            transition: border-color 0.2s ${ve}, background-color 0.2s ${ve}, box-shadow 0.2s ${ve} !important;
        }

        .cw-input:hover, .cw-textarea:hover, #notes-assistant-popup .cw-select:hover {
            border-color: #bdc1c6 !important;
            background-color: #f1f3f4 !important;
            box-shadow: 0 1px 4px rgba(0,0,0,0.1) !important;
        }

        .cw-input:focus, .cw-textarea:focus, #notes-assistant-popup .cw-select:focus {
            border-color: ${V.primary} !important;
            background-color: #fff !important;
            box-shadow: 0 0 0 3px rgba(26,115,232,0.15), 0 2px 8px rgba(0,0,0,0.05) !important;
        }

        .cw-textarea { min-height: 100px; resize: vertical; line-height: 1.5; }

        .cw-section-title {
            font-size: 11px;
            font-weight: 700;
            color: ${V.textSub};
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
            background: ${V.bgInput};
        }

        .cw-btn-primary {
            background: ${V.primary};
            color: #fff;
            border: none;
            border-radius: ${_e.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ${ve}, transform 0.2s ${ve}, box-shadow 0.2s ${ve};
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
            color: ${V.textSub};
            border: 1px solid ${V.border};
            border-radius: ${_e.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ${ve}, border-color 0.2s ${ve}, color 0.2s ${ve};
        }
        .cw-btn-secondary:hover {
            background: ${V.bgInput};
            border-color: #bdc1c6;
            color: ${V.text};
        }

        @media (prefers-reduced-motion: reduce) {
            .cw-btn-primary, .cw-btn-secondary, .cw-input, .cw-textarea, .cw-select {
                transition: opacity 0.15s ease, background-color 0.15s ease, border-color 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}var Je={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"Selecione",substatus:"Substatus:",select_substatus:"Selecione o Status",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",preencher_email_automaticamente:"Preencher email automaticamente?",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",trechos:"Trechos",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",link_aqui:"Link aqui",tag_support_output_label:"Utilizou Tag Support?",motivo_output_label:"Motivo:",auto_busca:"\u2728 Auto Busca",utilize_marcadores:"Utilize marcadores para detalhar...",descreva_consideracoes:"Descreva as considera\xE7\xF5es...",remover:"Remover",remover_campo_confirm:'Remover o campo "{campo}"?',meus_rascunhos:"Meus Rascunhos",confirmar_guardar_rascunho:"Deseja guardar o rascunho atual e limpar os campos?",rascunho_salvo_sucesso:"Rascunho salvo com sucesso!",erro_ler_dados:"Erro: N\xE3o foi poss\xEDvel ler os dados.",erro_ao_salvar:"Erro ao salvar.",cliente_sem_nome:"Cliente Sem Nome",sem_status:"Sem Status",retomar_caso:"Retomar Caso",descartar:"Descartar",retomar_rascunho_confirm:"Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.",rascunho_carregado:"Rascunho carregado.",excluir_rascunho_confirm:"Excluir este rascunho?",acoes_plural:"A\xE7\xF5es",acao_singular:"A\xE7\xE3o",definidas_plural:"definidas",definida_singular:"definida",renomear_tooltip:"Clique para renomear esta task",renomear_hint:"\u270E Renomear",substituir_rascunho_confirm:"Isso vai substituir o rascunho atual da nota. Deseja continuar?",salvar_como_atalho:"Salvar como atalho do Ctrl+K",atalho_nome_pergunta:"Como este atalho vai se chamar no Ctrl+K?",atalho_salvo:"Atalho salvo! J\xE1 aparece no Ctrl+K.",atalho_salvo_local:"Atalho salvo neste navegador (sem conex\xE3o com a nuvem).",atalho_limite:"Voc\xEA j\xE1 tem {max} atalhos. Apague um em Configura\xE7\xF5es antes de criar outro.",atalho_cenario_sumiu:"Este atalho apontava para um cen\xE1rio que n\xE3o existe mais. Revise-o em Configura\xE7\xF5es.",restaurar_rascunho_confirm:"Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?",cole_link_placeholder:"Cole o link aqui...",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F Anunciante consentiu com a grava\xE7\xE3o?",sim:"Sim",nao:"N\xE3o",pronto_comecar:"Pronto para come\xE7ar?",selecione_status_ajuda:"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Task(s) solicitada(s):",passos_executados:"\u{1F463} O que foi feito:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 D\xFAvidas do anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implementadas na call:",proximos_passos:"\u{1F680} Pr\xF3ximos passos (Acompanhamento):",consideracoes:"\u{1F4A1} Considera\xE7\xF5es adicionais:",contexto_call:"\u{1F4AC} Contexto/O que foi feito:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Minha A\xE7\xE3o:",dia:"\u{1F4C5} Dia do Follow-up (se aplic\xE1vel):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Data do reagendamento:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evid\xEAncias de Contato",ligacao_1:"Liga\xE7\xE3o 1",ligacao_2:"Liga\xE7\xE3o 2",mensagem_am:"Mensagem para AM",tentativa_ligacao:"\u{1F4DE} Tentativa de liga\xE7\xE3o:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"Seleccione",substatus:"Subestado:",select_substatus:"Seleccione el Estado",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",preencher_email_automaticamente:"\xBFRellenar correo autom\xE1ticamente?",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",trechos:"Fragmentos",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",link_aqui:"Enlace aqu\xED",tag_support_output_label:"\xBFUtiliz\xF3 Tag Support?",motivo_output_label:"Motivo:",auto_busca:"\u2728 B\xFAsqueda Autom\xE1tica",utilize_marcadores:"Utiliza vi\xF1etas para detallar...",descreva_consideracoes:"Describe las consideraciones...",remover:"Eliminar",remover_campo_confirm:'\xBFEliminar el campo "{campo}"?',meus_rascunhos:"Mis Borradores",confirmar_guardar_rascunho:"\xBFDesea guardar el borrador actual y limpiar los campos?",rascunho_salvo_sucesso:"\xA1Borrador guardado con \xE9xito!",erro_ler_dados:"Error: No fue posible leer los datos.",erro_ao_salvar:"Error al guardar.",cliente_sem_nome:"Cliente Sin Nombre",sem_status:"Sin Estado",retomar_caso:"Retomar Caso",descartar:"Descartar",retomar_rascunho_confirm:"\xBFRetomar este borrador? El formulario actual ser\xE1 reemplazado.",rascunho_carregado:"Borrador cargado.",excluir_rascunho_confirm:"\xBFEliminar este borrador?",acoes_plural:"Acciones",acao_singular:"Acci\xF3n",definidas_plural:"definidas",definida_singular:"definida",renomear_tooltip:"Haz clic para renombrar esta tarea",renomear_hint:"\u270E Renombrar",substituir_rascunho_confirm:"Esto reemplazar\xE1 el borrador actual de la nota. \xBFDeseas continuar?",salvar_como_atalho:"Guardar como atajo de Ctrl+K",atalho_nome_pergunta:"\xBFC\xF3mo se va a llamar este atajo en el Ctrl+K?",atalho_salvo:"\xA1Atajo guardado! Ya aparece en el Ctrl+K.",atalho_salvo_local:"Atajo guardado en este navegador (sin conexi\xF3n con la nube).",atalho_limite:"Ya tienes {max} atajos. Elimina uno en Configuraci\xF3n antes de crear otro.",atalho_cenario_sumiu:"Este atajo apuntaba a un escenario que ya no existe. Rev\xEDsalo en Configuraci\xF3n.",restaurar_rascunho_confirm:"Detectamos un borrador sin guardar de tu \xFAltima sesi\xF3n. \xBFDeseas restaurarlo?",cole_link_placeholder:"Pega el enlace aqu\xED...",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F \xBFEl anunciante consinti\xF3 la grabaci\xF3n?",sim:"S\xED",nao:"No",pronto_comecar:"\xBFListo para empezar?",selecione_status_ajuda:"Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Tarea(s) solicitada(s):",passos_executados:"\u{1F463} Qu\xE9 se hizo:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 Dudas del anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resoluciones/Explicaciones:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tareas implementadas en la call:",proximos_passos:"\u{1F680} Pr\xF3ximos pasos:",consideracoes:"\u{1F4A1} Consideraciones adicionales:",contexto_call:"\u{1F4AC} Contexto/Qu\xE9 se hizo:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Mi Acci\xF3n:",dia:"\u{1F4C5} D\xEDa de Follow-up (si aplica):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Fecha de reprogramaci\xF3n:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evidencias de Contacto",ligacao_1:"Llamada 1",ligacao_2:"Llamada 2",mensagem_am:"Mensaje para AM",tentativa_ligacao:"\u{1F4DE} Intento de llamada:"}},Fe={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},vn={"GTM Instalado":"GTM Instalado","Vinculador de convers\xF5es":"Vinculador de conversiones","Tag criada":"Etiqueta creada","Teste GTM":"Prueba GTM","Teste Ads":"Prueba Ads","Vers\xE3o Publicada":"Versi\xF3n Publicada","Status Ads":"Estado Ads","Termos aceitos no Ads":"T\xE9rminos aceptados en Ads","Tag implementada":"Etiqueta implementada","Painel do Ads (ap\xF3s 7 dias)":"Panel de Ads (despu\xE9s de 7 d\xEDas)","Tag do evento GA4 implementado no GTM":"Etiqueta del evento GA4 implementada en GTM","Teste GTM (tagassistant.google.com)":"Prueba GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)":"Prueba GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM":"Versi\xF3n publicada en GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4":"(Si hay par\xE1metros) Dimensiones personalizadas creadas en GA4","Evento marcado como principal no GA4":"Evento marcado como principal en GA4","GA4 e Google Ads vinculados corretamente":"GA4 y Google Ads vinculados correctamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)":"Evento principal de GA4 importado en Google Ads (como secundario)","M\xE9tricas app & web ativadas no Google Ads":"M\xE9tricas app y web activadas en Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)":"(Opcional) Prueba en el Informe de Tiempo Real (GA4)","Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)":"Validaci\xF3n: Cuenta GA4 (solo flujo web, no es sector salud)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)':'"Recopilaci\xF3n de datos proporcionados por el usuario" habilitada en GA4 (Administrador > Recopilaci\xF3n de Datos)',"Confirma\xE7\xE3o de coleta de dados (UI)":"Confirmaci\xF3n de recopilaci\xF3n de datos (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM":"Etiqueta del evento GA4 optimizado (UPD) implementada en GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)":"Prueba GTM (tagassistant - par\xE1metro 'em' sin error)","Teste GA4 (DebugView - tagassistant)":"Prueba GA4 (DebugView - tagassistant)","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio":"(Capacitaci\xF3n) Evento principal importado en Google Ads como secundario","Tag implementado no GTM":"Etiqueta implementada en GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo":"Prueba del disparo de la etiqueta de configuraci\xF3n en tag assistant en m\xE1s de una p\xE1gina, mostrando ID y etiqueta","Teste usando o #google-wcc-debug":"Prueba usando #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]":"Cambio del estado de la conversi\xF3n en Google Ads [Esperar algunos minutos]","1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas":"1. OGT (gTag/GTM con etiqueta de vinculador de conversi\xF3n) a\xF1adido en todas las p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)":"2. El etiquetado autom\xE1tico (auto tagging) est\xE1 habilitado en Google Ads (Administrador > Config. de la Cuenta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".':'3. [Si es GTM] El vinculador de conversi\xF3n est\xE1 presente y el activador definido para dispararse en "Todas las P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?":"4. \xBFEl gclid se mantiene sin redirecciones y se almacena en la cookie _gcl_aw en la landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?":"5. \xBFEl gclid fue pasado a la p\xE1gina de conversi\xF3n?"};function yn(e,t,a){let o=e?.screenshots?.[t]||[];if(a!=="es")return o;let i=e?.screenshots_es?.[t],n=r=>String(i?.[r]==null?"":i[r]).trim();return e?.daCentral?o.map((r,l)=>n(l)||r):Array.isArray(i)?o.map((r,l)=>n(l)||vn[r]||r):o.map(r=>vn[r]||r)}function wn(e,t,a){return a==="es"&&e?.fieldPrefixes_es?.[t]?e.fieldPrefixes_es[t]:e?.fieldPrefixes?.[t]||""}function ya(e,t,a){if(t!=="es")return e;let o=sa[a];return o?{...e,...o}:e}function wa(e,t){return Object.entries(ut).filter(([,a])=>{let o=!a.type||a.type==="all"||a.type===t,i=Array.isArray(a.substatus)&&a.substatus.includes(e);return o&&i})}function ia(e,t){let a=String(e||"");if(a.startsWith("quickfill-"))return a.slice(10);if(t){let i=`cw-${String(t).toLowerCase()}-`;if(a.startsWith(i))return a.slice(i.length)}let o=a.match(/^cw-[a-z0-9_]+-(.+)$/);return o?o[1]:a}function Sa(e,t){return ia(e,t).replace(/-/g," ")}var cs=["GTM_GA4_VERIFICADO","MULTIPLE_CIDS"],ds=["REASON_COMMENTS"];function ra(e){let t=[...ds];return e?.requiresTasks&&t.push("GTM_GA4_VERIFICADO"),t}function Sn(e){let t=[...cs,...e?.extraOptionalFields||[]],a=ra(e);return t.filter(o=>!a.includes(o))}var Me={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Caso Reagendado."},fieldPrefixes_es:{REASON_COMMENTS:"Caso Reprogramado."}},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Reagendamento aceit\xE1vel."},fieldPrefixes_es:{REASON_COMMENTS:"Reprogramaci\xF3n aceptable."}},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","DIA","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Aguardando Valida\xE7\xF5es no Google Ads."},fieldPrefixes_es:{REASON_COMMENTS:"Esperando Validaciones en Google Ads."}},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES"]},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","TENTATIVA_LIGACAO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PASSOS_EXECUTADOS","RESULTADO","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["PROXIMOS_PASSOS"],fieldPrefixes:{REASON_COMMENTS:"Task implementada com sucesso."},fieldPrefixes_es:{REASON_COMMENTS:"Tarea implementada con \xE9xito."}},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","DUVIDAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["PROXIMOS_PASSOS","CONSIDERACOES"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para tirar d\xFAvidas do anunciante."},fieldPrefixes_es:{REASON_COMMENTS:"Consultor\xEDa utilizada para resolver dudas del anunciante."}},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PROBLEMAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para testar e solucinar problemas da convers\xE3o."},fieldPrefixes_es:{REASON_COMMENTS:"Consultor\xEDa utilizada para probar y solucionar problemas de la conversi\xF3n."}},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,templateFields:["SPEAKEASY_ID","label_substatus","REASON_COMMENTS","COMENTARIOS"],customFooter:"Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},Pt={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},Bt=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],Ea=["CONSIDERACOES","COMENTARIOS"],ut={"quickfill-gtm-install":{type:"all",substatus:["SO_Implementation_Only"],"field-REASON_COMMENTS":"Instala\xE7\xE3o do GTM finalizada.","field-TASKS_SOLICITADAS":"\u2022 Instala\xE7\xE3o do GTM","field-PASSOS_EXECUTADOS":`\u2022 Criamos a conta dentro do GTM
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

Irei abrir caso em BAU para o dia solicitado e pedir a inativa\xE7\xE3o do mesmo.`}},sa={"quickfill-gtm-install":{"field-REASON_COMMENTS":"Instalaci\xF3n de GTM finalizada.","field-TASKS_SOLICITADAS":"\u2022 Instalaci\xF3n de GTM","field-PASSOS_EXECUTADOS":`\u2022 Creamos la cuenta dentro de GTM
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

Abrir\xE9 un caso en BAU para el d\xEDa solicitado y pedir\xE9 la inactivaci\xF3n del mismo.`}};var En={pt:{searching:"Buscando ID...",readingMessage:"Lendo mensagem...",idFound:e=>`ID Localizado: ${e}`,noIdFound:"Nenhum ID encontrado.",notFound:"N\xE3o encontrado",processingError:"Erro ao processar."},es:{searching:"Buscando ID...",readingMessage:"Leyendo mensaje...",idFound:e=>`ID Encontrado: ${e}`,noIdFound:"Ning\xFAn ID encontrado.",notFound:"No encontrado",processingError:"Error al procesar."}};function jt(e){let t=de();return En[t]?.[e]??En.pt[e]}var An="cw-automation-styles";if(!document.getElementById(An)){let e=document.createElement("style");e.id=An,e.innerHTML=`
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
            z-index: ${$e.PAGE_SPOTLIGHT_TARGET} !important; 
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
            z-index: ${$e.PAGE_SPOTLIGHT_OVERLAY};   /* Fica atr\xE1s do Input */
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: all;                  /* Bloqueia cliques na p\xE1gina */
        }
    `,document.head.appendChild(e)}function Cn(e){let t=document.getElementById("cw-loading-overlay");e?t?t.style.opacity="1":(t=document.createElement("div"),t.id="cw-loading-overlay",document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1")):t&&(t.style.opacity="0",setTimeout(()=>t.remove(),300))}async function Aa(e){await Wa();let t=typeof e=="string"?document.getElementById(e):e,a="";Cn(!0),t&&(a=t.placeholder,t.placeholder=jt("searching"),t.value="",t.classList.add("cw-scanning-active"));try{let o=document.querySelector('material-button[debug-id="dock-item-case-log"]');o&&!o.classList.contains("selected")&&(Et(o),await pe(1200));let i=document.querySelector("search-filter dropdown-button .button");if(i&&!(i.innerText||"").includes("All")){Et(i),await pe(600);let u=document.querySelector('material-checkbox[debug-id="check-all-box"]');u&&u.getAttribute("aria-checked")!=="true"&&(Et(u),await pe(300));let g=document.querySelector('material-button[debug-id="apply-filter"]');g&&(Et(g),await pe(1500))}let n=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");n&&(n.scrollTop=n.scrollHeight,await pe(500));let r=Array.from(document.querySelectorAll(".message-header"));for(let f=r.length-1;f>=0;f--){let u=r[f],g=u.querySelector("i.material-icons-extended"),k=g&&g.innerText.trim()==="phone_in_talk",w=u.innerText||"",S=w.includes("Agent joined")||w.includes("outbound-call")||w.includes("Speakeasy");if(k||S){u.getAttribute("aria-expanded")==="true"||(t&&(t.placeholder=jt("readingMessage")),Et(u),await pe(1e3));break}}let c=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),m=/Speakeasy.*?(P\d{15,25})/i,p=null;for(let f=c.length-1;f>=0;f--){let u=c[f];if(u.offsetParent===null)continue;let g=(u.innerText||"").match(m);if(g&&g[1]){p=g[1];break}}if(t)if(p){try{await navigator.clipboard.writeText(p)}catch{}t.tagName==="INPUT"||t.tagName==="TEXTAREA"?t.value=p:t.textContent=p,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),v.playSuccess(),te(jt("idFound")(p)),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}else v.playError(),te(jt("noIdFound"),{error:!0}),t.placeholder=jt("notFound"),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}catch(o){console.error("Erro na automa\xE7\xE3o:",o),v.playError(),te(jt("processingError"),{error:!0})}finally{t&&(t.classList.remove("cw-scanning-active"),t.value||(t.placeholder=a)),Cn(!1)}}function kn(e){e.dataset.bulletEnabled!=="true"&&(e.dataset.bulletEnabled="true",(e.value.trim()===""||e.value.trim()==="\u2022")&&(e.value="\u2022 "),e.addEventListener("keydown",function(t){let a=this.selectionStart,o=this.selectionEnd,i=this.value,n=i.lastIndexOf(`
`,a-1)+1,r=i.substring(n,a);if(t.key==="Enter"){t.preventDefault();let l=r.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(r.trim()==="\u2022"){this.value=i.substring(0,n)+`
`+i.substring(o),this.selectionStart=this.selectionEnd=n+1;return}let c=`
`+l;this.value=i.substring(0,a)+c+i.substring(o),this.selectionStart=this.selectionEnd=a+c.length}else if(t.key==="Tab")t.preventDefault(),t.shiftKey?r.startsWith("  ")&&(this.value=i.substring(0,n)+r.substring(2)+i.substring(a),this.selectionStart=this.selectionEnd=a-2):(this.value=i.substring(0,n)+"  "+r+i.substring(a),this.selectionStart=this.selectionEnd=a+2);else if(t.key==="Backspace"&&a===o&&a>0){let l=i.substring(0,a);l.endsWith("\u2022 ")?(t.preventDefault(),this.value=l.substring(0,a-2)+i.substring(o),this.selectionStart=this.selectionEnd=a-2):l.endsWith("  ")&&r.trim().startsWith("\u2022")&&(t.preventDefault(),this.value=l.substring(0,a-2)+i.substring(o),this.selectionStart=this.selectionEnd=a-2)}}))}function la(e,t,a){t.innerHTML="";let o=Me[e];if(!o)return;let i=ra(o);if(a.activeFields.forEach(r=>{if(["TAGS_IMPLEMENTED","SCREENSHOTS_LIST","CONSENTIU_GRAVACAO","CASO_PORTUGAL","label_substatus"].includes(r))return;let l=`field-${r}`,c=document.createElement("label"),m=g=>Je[a.currentLang]?.[g]||Je.pt?.[g]||g;c.textContent=m(r.toLowerCase())!==r.toLowerCase()?m(r.toLowerCase()):r.replace(/_/g," ").replace(/\b\w/g,g=>g.toUpperCase())+":",Object.assign(c.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px",fontWeight:"700",color:V.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let p=i.includes(r),f=document.createElement("span");if(f.textContent=c.textContent,p){let g=document.createElement("span");g.textContent=" *",g.style.color=V.error,f.appendChild(g)}if(c.innerHTML="",c.appendChild(f),r==="SPEAKEASY_ID"){let g=document.createElement("button");g.innerHTML=m("auto_busca"),g.style.cssText=`font-size: 11px; font-weight: 700; color: ${V.primary}; background-color: ${V.primaryBg}; border: none; border-radius: ${_e.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${ve};`,g.onmouseenter=()=>g.style.backgroundColor="#d2e3fc",g.onmouseleave=()=>g.style.backgroundColor=V.primaryBg,g.onclick=k=>{k.preventDefault(),v.playClick(),Aa(l)},c.appendChild(g)}if(!p){let g=document.createElement("button");g.innerHTML="\u2715",g.style.cssText=`font-size: 14px; background: ${V.bgInput}; border: none; color: ${V.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${ve};`,g.onmouseenter=()=>{g.style.background=V.error,g.style.color=V.surface},g.onmouseleave=()=>{g.style.background=V.bgInput,g.style.color=V.textSub},g.onclick=async k=>{k.preventDefault(),v.playClick();let w=f.textContent.replace(/:\s*$/,"").trim();await De(m("remover_campo_confirm").replace("{campo}",w),{danger:!0,confirmText:m("remover")})&&(a.removeField(r),la(e,t,a))},c.appendChild(g)}let u;Bt.includes(r)?(u=document.createElement("textarea"),u.classList.add("bullet-textarea","cw-textarea"),u.placeholder=m("utilize_marcadores"),kn(u)):Ea.includes(r)?(u=document.createElement("textarea"),u.classList.add("cw-textarea"),u.placeholder=m("descreva_consideracoes")):(u=document.createElement("input"),u.type="text",u.classList.add("cw-input")),u.id=l,u.value=a.formData[l]||"",u.addEventListener("input",g=>a.updateField(l,g.target.value)),t.appendChild(c),t.appendChild(u)}),a.activeFields.includes("CONSENTIU_GRAVACAO")){let r=m=>Je[a.currentLang]?.[m]||Je.pt?.[m]||m,l=document.createElement("label");l.textContent=r("consentiu_gravacao"),Object.assign(l.style,{display:"block",fontSize:"13px",fontWeight:"700",color:V.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let c=document.createElement("select");c.className="cw-select",c.innerHTML=`
            <option value="false">${r("nao")}</option>
            <option value="true">${r("sim")}</option>
        `,c.value=a.consent?"true":"false",c.onchange=()=>a.setConsent(c.value==="true"),t.appendChild(l),t.appendChild(c)}let n=(o.templateFields||[]).filter(r=>!i.includes(r)&&!a.activeFields.includes(r));if(n.length>0){let r=c=>Je[a.currentLang]?.[c]||Je.pt?.[c]||c,l=document.createElement("div");Object.assign(l.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginTop:"24px"}),n.forEach(c=>{let m=r(c.toLowerCase())!==c.toLowerCase()?r(c.toLowerCase()):c.replace(/_/g," ").replace(/\b\w/g,f=>f.toUpperCase())+":",p=document.createElement("button");p.type="button",p.textContent=`+ ${m.replace(/:$/,"")}`,p.style.cssText=`font-size: 12px; font-weight: 600; color: ${V.primary}; background-color: ${V.primaryBg}; border: none; border-radius: ${_e.pill}; padding: 6px 14px; cursor: pointer; transition: all 0.2s ${ve};`,p.onmouseenter=()=>p.style.backgroundColor="#d2e3fc",p.onmouseleave=()=>p.style.backgroundColor=V.primaryBg,p.onclick=f=>{f.preventDefault(),v.playClick(),a.addFieldAt(c,a.activeFields.length),la(e,t,a)},l.appendChild(p)}),t.appendChild(l)}}function ps(e){let t=String(e.label||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");return`cw-${String(e.key||"").toLowerCase()}-${t}`}function us(e){let t;try{t=JSON.parse(e||"{}")}catch{return null}let a=t.fields||{};return Object.keys(a).length?{fields:a,linkedTask:t.linkedTask,activeTasks:t.activeTasks}:null}function Tn(e){if(!Array.isArray(e)||!e.length)return!1;let t={},a={},o=e.slice().sort((i,n)=>(i.sortOrder||0)-(n.sortOrder||0));for(let i of o){if(!i.key)continue;let n=us(i.value);if(!n)continue;let r=ps(i);if(String(i.lang).toUpperCase()==="ES"){a[r]={...n.fields};continue}t[r]={type:(i.field||"all").toLowerCase(),substatus:[i.key],...n.fields,...n.linkedTask?{linkedTask:n.linkedTask}:{},...n.activeTasks?{activeTasks:n.activeTasks}:{}}}if(!Object.keys(t).length)return!1;for(let i of Object.keys(ut))delete ut[i];Object.assign(ut,t);for(let i of Object.keys(sa))delete sa[i];return Object.assign(sa,a),!0}async function qn(){let e=me.getCachedContent("note_template"),t=Tn(e);try{let a=await me.fetchContentModule("note_template");t=Tn(a)||t}catch(a){console.warn("Modelos de nota indispon\xEDveis; usando os embutidos.",a)}return t}function ms(e){let t;try{t=JSON.parse(e||"{}")}catch{return null}let a=String(t.name||"").trim();if(!a)return null;let o=t.screenshots||{},i=Array.isArray(o.implementation)?o.implementation:[],n=Array.isArray(o.education)?o.education:[],r={name:a,daCentral:!0,screenshots:{implementation:i,education:n}};t.popular===!0&&(r.popular=!0);let l=t.screenshots_es;return l&&(Array.isArray(l.implementation)||Array.isArray(l.education))&&(r.screenshots_es={},Array.isArray(l.implementation)&&(r.screenshots_es.implementation=l.implementation),Array.isArray(l.education)&&(r.screenshots_es.education=l.education)),r}function Ln(e){if(!Array.isArray(e)||!e.length)return!1;let t={},a=e.slice().sort((o,i)=>(o.sortOrder||0)-(i.sortOrder||0));for(let o of a){let i=String(o.key||"").trim();if(!i)continue;let n=ms(o.value);n&&(t[i]=n)}if(!Object.keys(t).length)return!1;for(let o of Object.keys(Fe))delete Fe[o];return Object.assign(Fe,t),!0}var In=new Set,no=null;function Nn(){for(let e of In)try{e()}catch(t){console.warn("Assinante do cat\xE1logo de tasks falhou.",t)}}async function gs(){let e=me.getCachedContent("task_screenshots"),t=Ln(e);t&&Nn();try{let a=await me.fetchContentModule("task_screenshots");Ln(a)&&(t=!0,Nn())}catch(a){console.warn("Cat\xE1logo de tasks indispon\xEDvel; usando o embutido.",a)}return t}function Ca(e){return e&&In.add(e),no||(no=gs()),no}function io(e,t,a,o=null){let i=e.currentSubStatus;if(!i)return null;let n=Me[i],r=Je[e.currentLang]||Je.pt,l=p=>r[p]||Je.pt?.[p]||p,c='style="margin-bottom: 12px; padding-left: 30px;"',m="";if(e.activeFields.forEach(p=>{let f=l(p.toLowerCase()),u="N/A";if(p==="label_substatus")f=l("label_substatus"),u=n.name;else if(p==="TAGS_IMPLEMENTED"){f=l("tags_implemented");let g=[];t.getCheckedElements().forEach(w=>{let S=w.value,I=Fe[S],A=w.count||1,_=S==="ads_conversion_tracking"||S==="ads_enhanced_conversions";e.tagSupportUsed&&_&&!e.forcedScreenshots.has(S)?g.push(`${I.name} - ${l("ts_output_disclaimer")}`):g.push(A>1?`${I.name} (x${A})`:I.name)}),u=g.join(", ")||"N/A"}else if(p==="SCREENSHOTS_LIST"){f=l("screenshots_list");let g="",k=t.screenshotsElement;k&&Array.from(k.querySelectorAll('input[id^="name-"]')).forEach(S=>{let I=S.value,A=S.closest(".cw-screen-card");if(A){let _=A.querySelectorAll('input[id^="screen-"]'),b=!1,M="";_.forEach(F=>{let B=F.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"Evid\xEAncia",G=F.value.trim();G&&(M+=`<li>${B} - ${G}</li>`,b=!0)}),b&&(g+=`<div style="margin-bottom: 8px;"><b>${I}</b><ul ${c}>${M}</ul></div>`)}}),u=g||"N/A"}else if(p==="CASO_PORTUGAL")f=l("caso_portugal"),u=l("sim");else if(p==="CONSENTIU_GRAVACAO")f=l("consentiu_gravacao"),u=e.consent?l("sim"):l("nao");else{let g=`field-${p}`,k=e.formData[g],w=wn(n,p,e.currentLang),S=w?w+" ":"";if(k&&k.trim()!==""&&k.trim()!=="\u2022"){let I=k.trim();if(Bt.includes(p)){let A=I.split(`
`).map(_=>_.trim()).filter(_=>_!==""&&_!=="\u2022").map(_=>_.startsWith("\u2022 ")?_.substring(2):_).map(_=>`<li>${_}</li>`).join("");u=A?`${S}<ul ${c}>${A}</ul>`:"N/A"}else Ea.includes(p)?u=S+I.split(`
`).filter(A=>A.trim()!=="").map(A=>`<p style="margin: 0 0 8px 0;">${A}</p>`).join(""):u=S+I}else S&&(u=S.trim())}m+=`<b>${f}</b><br>${u}<br><br>`}),o){let p="";o.l1&&(p+=`<li>${l("ligacao_1")}: ${o.l1}</li>`),o.l2&&(p+=`<li>${l("ligacao_2")}: ${o.l2}</li>`),o.msg&&(p+=`<li>${l("mensagem_am")}: ${o.msg}</li>`),p&&(m+=`<b>${l("evidencias_contato")}</b><br><ul ${c}>${p}</ul><br>`)}if(n.customFooter&&(m+=`${n.customFooter}<br><br>`),a?.getOutput){let p=a.getOutput();p&&(m+=`${p}<br><br>`)}return m+="<i>Nota criada atrav\xE9s do Cases Wizard.</i>",m.replace(/(<br>\s*){3,}/g,"<br><br>").trim()}var _n={pt:"Passe o mouse sobre um cen\xE1rio para visualizar o texto...",es:"Pasa el mouse sobre un escenario para ver el texto..."};function On(){return _n[de()]||_n.pt}function Mn(e){let t=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,a=document.createElement("div");a.className="cw-step-scenarios";let o=document.createElement("div");Object.assign(o.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let i=document.createElement("div");Object.assign(i.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"44px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"});let n=document.createElement("span");n.style.transition="opacity 0.05s ease, transform 0.05s ease",n.textContent=On(),i.appendChild(n);let r=new Set,l=null;return a.render=(c,m)=>{r.clear();let p=wa(c,m);o.innerHTML="",p.forEach(([f,u])=>{let g=document.createElement("div");g.textContent=Sa(f,c),g.dataset.id=f,g.dataset.sound="hover",Object.assign(g.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"});let k=ya(u,de(),f),w=k["field-REASON_COMMENTS"]||k["field-CONTEXTO_CALL"]||f;g.onmouseenter=()=>{l&&clearTimeout(l),r.has(f)||(g.style.background="#f1f3f4"),n.style.opacity="0",t||(n.style.transform="translateY(5px)"),l=setTimeout(()=>{n.textContent=w.substring(0,120)+(w.length>120?"...":""),n.style.opacity="1",t||(n.style.transform="translateY(0)")},50)},g.onmouseleave=()=>{l&&clearTimeout(l),r.has(f)||(g.style.background="#ffffff"),l=setTimeout(()=>{r.size===0&&(n.style.opacity="0",setTimeout(()=>{n.textContent=On(),n.style.opacity="1"},50))},100)},g.onclick=()=>{v.playClick();let S=!r.has(f);S?(r.add(f),g.style.background="#e8f0fe",g.style.borderColor="#1a73e8",g.style.color="#1967d2"):(r.delete(f),g.style.background="#ffffff",g.style.borderColor="#dadce0",g.style.color="#3c4043"),e(f,S)},o.appendChild(g)}),p.length===0?a.style.display="none":a.style.display="block"},a.getSelectedIds=()=>[...r],a.appendChild(o),a.appendChild(i),a}function bs(e){return e==="ads_conversion_tracking"||e==="ads_enhanced_conversions"}function ro(e,t){return t.tagSupportUsed&&bs(e)&&!t.forcedScreenshots.has(e)}var xe={bg:V.bgInput,white:V.surface,border:V.border,textMain:V.text,textSub:V.textSub,blue:V.blue,blueLight:V.primaryBg,brands:{ads:{id:"ads",label:"Google Ads",color:V.blue,bg:V.primaryBg,icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:V.yellow,bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:V.primary,bg:V.primaryBg,icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:V.green,bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Ot={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Dn(e,t,a){let o={};a&&a.subscribe(()=>{B(),G()});function i(E){let T=E.toLowerCase();return T.includes("ads")||T.includes("conversion")||T.includes("remarketing")?xe.brands.ads:T.includes("ga4")||T.includes("analytics")?xe.brands.ga4:T.includes("gtm")||T.includes("tag manager")||T.includes("container")?xe.brands.gtm:T.includes("merchant")||T.includes("shopping")||T.includes("feed")?xe.brands.gmc:xe.brands.default}let n=[],r={};function l(){n=Object.entries(Fe).filter(([E,T])=>T.popular),r={},Object.entries(Fe).forEach(([E,T])=>{if(T.popular)return;let R=i(T.name);r[R.label]||(r[R.label]={brand:R,tasks:[]}),r[R.label].tasks.push({key:E,...T})})}l();let c="cw-zen-tasks";if(!document.getElementById(c)){let E=document.createElement("style");E.id=c,E.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column;
                font-family: ${xe.font}; background: ${xe.bg}; position: relative; overflow: visible;
                border-radius: 12px; border: 1px solid ${xe.border};
            }
            
            /* SCROLL AREA */
            .cw-zen-content { padding-bottom: 20px; }

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${xe.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${xe.white}; 
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
                font-size: 12px; font-weight: 500; color: ${xe.textMain}; line-height: 1.2; 
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
                color: ${xe.textMain}; display: flex; align-items: center; justify-content: center;
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
                border: 1px solid ${xe.border}; border-radius: 10px; background: ${xe.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${xe.blue}; box-shadow: 0 0 0 3px ${xe.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${xe.border}; border-radius: 10px; background: ${xe.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${xe.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${xe.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${xe.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${xe.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item:focus-visible, .cw-acc-header:focus-visible { outline: 2px solid ${xe.blue}; outline-offset: -2px; }
            .cw-task-item.selected { background: ${xe.blueLight}; }
            .cw-task-item.ts-success { background: #F0FDF4 !important; border-left: 4px solid #22C55E; }
            .cw-task-item.ts-success .cw-task-label { color: #166534 !important; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${xe.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${xe.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS (Lista: quadrado) */
            .cw-step-btn-list {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${xe.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn-list:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${xe.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: sticky; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${xe.border};
                border-bottom-left-radius: 11px;
                border-bottom-right-radius: 11px;
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                visibility: hidden;
                box-shadow: ${xe.shadowFloat}; z-index: 10;
                margin-top: auto;
            }
            /* .cw-zen-container usa overflow:visible (pros cards do hero n\xE3o
               cortarem sombra/hover), ent\xE3o sem visibility a barra "escondida"
               via transform continua sendo pintada logo abaixo do card,
               encostando/sobrepondo o que vem depois no layout. */
            .cw-status-bar.visible { transform: translateY(0); visibility: visible; }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${xe.textMain}; }
            
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
                font-family: ${xe.font}; font-size: 15px; font-weight: 600; color: ${xe.textMain};
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
                border-color: ${xe.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${xe.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${xe.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${xe.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 11px; font-weight: 700; color: ${xe.textSub};
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
        `,document.head.appendChild(E)}let m=document.createElement("div");m.className="cw-zen-container";let p=document.createElement("div");Object.assign(p.style,{display:"none"});let f=document.createElement("div");f.className="cw-screens-container",p.appendChild(f),m.innerHTML=`
        <div class="cw-zen-content">
            <div class="cw-hero-section">
                <div class="cw-section-subtitle js-hero-title" style="font-size:11px; font-weight:700; color:#6B7280; text-transform:uppercase; letter-spacing:0.8px;">${t("acesso_rapido")}</div>
                <div class="cw-hero-grid"></div>
                <div class="cw-helper-text">Atalhos para as implementa\xE7\xF5es mais frequentes.<br>Use a busca abaixo para o cat\xE1logo completo.</div>
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
            <div class="cw-status-text">0 a\xE7\xF5es definidas</div>
            <div class="cw-footer-icons"></div>
        </div>
    `;let u=m.querySelector(".cw-hero-grid"),g=m.querySelector(".cw-acc-container"),k=m.querySelector(".cw-results-container"),w=m.querySelector(".cw-search-input");ba(m,".cw-acc-header, .cw-task-item");let S=m.querySelector(".cw-status-bar"),I=m.querySelector(".cw-status-text"),A=m.querySelector(".cw-footer-icons");function _(E,T){return R=>{if(R.target.closest(".cw-step-btn-hero, .cw-step-btn-list"))return;let C=o[E]?o[E].count:0;H(E,C>0?-C:1,T)}}function b(){u.innerHTML="",n.forEach(([E,T])=>{let R=i(T.name),C=document.createElement("div");C.className="cw-hero-card",C.id=`hero-${E}`,C.style.setProperty("--hero-color",R.color),C.innerHTML=`
              <div class="cw-hero-main">
                  <div class="cw-hero-icon">${Ot[R.icon]}</div>
                  <div class="cw-hero-label">${T.name}</div>
              </div>
            
              <div class="cw-hero-stepper">
                  <div class="cw-step-btn-hero minus">\u2212</div>
                  <div class="cw-step-val">1</div>
                  <div class="cw-step-btn-hero plus">+</div>
              </div>
          `,C.onclick=_(E,T),C.querySelector(".minus").onclick=()=>H(E,-1,T),C.querySelector(".plus").onclick=()=>H(E,1,T),C.tabIndex=0,C.setAttribute("role","button"),C.setAttribute("aria-pressed","false"),C.addEventListener("keydown",z=>{(z.key==="Enter"||z.key===" ")&&(z.preventDefault(),C.click())}),C.dataset.color=R.color,u.appendChild(C)})}b();function M(E,T){let R=i(T.name),C=document.createElement("div");return C.className="cw-task-item",C.dataset.id=E,C.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${R.bg}; color:${R.color}">
                    ${Ot[R.icon]||Ot.default}
                </div>
                <div class="cw-task-label">${T.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn-list minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn-list plus">+</div>
            </div>
        `,C.onclick=_(E,T),C.querySelector(".minus").onclick=()=>H(E,-1,T),C.querySelector(".plus").onclick=()=>H(E,1,T),C.tabIndex=0,C.setAttribute("role","button"),C.setAttribute("aria-pressed","false"),C.setAttribute("aria-label",T.name),C.addEventListener("keydown",z=>{(z.key==="Enter"||z.key===" ")&&(z.preventDefault(),C.click())}),C}function F(){g.innerHTML="",Object.entries(r).forEach(([E,T])=>{let R=document.createElement("div");R.className="cw-acc-group";let C=document.createElement("div");C.className="cw-acc-header",C.innerHTML=`
              <div class="cw-acc-title">
                  <div class="cw-acc-dot" style="background:${T.brand.color}"></div>
                  ${E}
              </div>
              <div class="cw-acc-icon">\u25BC</div>
          `,C.tabIndex=0,C.setAttribute("role","button"),C.setAttribute("aria-expanded","false"),C.onclick=()=>{g.querySelectorAll(".cw-acc-group.open").forEach(ie=>{ie!==R&&(ie.classList.remove("open"),ie.querySelector(".cw-acc-header")?.setAttribute("aria-expanded","false"))});let Q=R.classList.toggle("open");C.setAttribute("aria-expanded",String(Q))},C.addEventListener("keydown",Q=>{(Q.key==="Enter"||Q.key===" ")&&(Q.preventDefault(),C.click())});let z=document.createElement("div");z.className="cw-acc-body",T.tasks.forEach(Q=>{let ie=M(Q.key,Q);z.appendChild(ie)}),R.appendChild(C),R.appendChild(z),g.appendChild(R)})}F();function H(E,T,R){o[E]||(o[E]={count:0,data:R,brand:i(R.name)}),o[E].count+=T,o[E].count<=0&&delete o[E],B(),G(),e&&e()}function B(){n.forEach(([z])=>{let Q=u.querySelector(`#hero-${z}`);if(!Q)return;let ie=o[z];ie?(Q.classList.add("active"),Q.setAttribute("aria-pressed","true"),Q.querySelector(".cw-step-val").textContent=ie.count,Q.querySelector(".cw-step-val").style.color=Q.dataset.color,Q.classList.toggle("ts-success",ro(z,a))):(Q.classList.remove("active"),Q.setAttribute("aria-pressed","false"),Q.classList.remove("ts-success"))}),m.querySelectorAll(".cw-task-item").forEach(z=>{let Q=z.dataset.id,ie=o[Q];ie?(z.classList.add("selected"),z.setAttribute("aria-pressed","true"),z.querySelector(".cw-step-val").textContent=ie.count,z.classList.toggle("ts-success",ro(Q,a))):(z.classList.remove("selected"),z.setAttribute("aria-pressed","false"),z.classList.remove("ts-success"))});let T=Object.keys(o),R=0,C=[];if(T.forEach(z=>{let Q=o[z];R+=Q.count;for(let ie=0;ie<Q.count;ie++)C.length<6&&C.push(Q.brand)}),R>0){S.classList.add("visible");let z=R>1?t("acoes_plural"):t("acao_singular"),Q=R>1?t("definidas_plural"):t("definida_singular");I.textContent=`${R} ${z} ${Q}`,A.innerHTML="",C.forEach(ie=>{let Y=document.createElement("div");Y.className="cw-mini-icon-status",Y.innerHTML=Ot[ie.icon]||Ot.default;let re=Y.querySelector("svg");re&&(re.style.width="14px",re.style.height="14px"),A.appendChild(Y)})}else S.classList.remove("visible"),I.textContent="",A.innerHTML=""}w.addEventListener("input",E=>{let T=E.target.value.toLowerCase();if(T.length>0){g.style.display="none",k.style.display="block",k.innerHTML="";let R=!1;Object.entries(Fe).forEach(([C,z])=>{if(z.name.toLowerCase().includes(T)){R=!0;let Q=M(C,z);o[C]&&(Q.classList.add("selected"),Q.setAttribute("aria-pressed","true"),Q.querySelector(".cw-step-val").textContent=o[C].count),k.appendChild(Q)}}),R||(k.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else g.style.display="block",k.style.display="none"});function G(){let E={};f.querySelectorAll(".cw-input-field").forEach(z=>{E[z.id]=z.value}),f.innerHTML="";let T=Object.keys(o),R=!1;if(T.length===0){f.appendChild(Kt({icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg>',title:t("selecione_tarefas")})),p.style.display="none";return}let C=document.createElement("div");C.className="cw-info-banner",C.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.
            </span>
        `,f.appendChild(C),T.forEach(z=>{let Q=o[z].data,ie=o[z].count,Y=o[z].brand,re=ro(z,a),W=a.screenshotMode||"implementation",le=yn(Q,W,a.currentLang);if(le.length>0||re){R=!0;for(let O=1;O<=ie;O++){let ee=document.createElement("div");ee.className="cw-screen-card",re&&ee.classList.add("ts-success"),ee.style.setProperty("--brand-color",Y.color),ee.style.setProperty("--brand-bg",Y.bg),ee.style.setProperty("--brand-shadow",Y.color+"40");let se=document.createElement("div");se.className="cw-card-header";let X=document.createElement("div");X.className="cw-card-icon",X.innerHTML=Ot[Y.icon]||Ot.default;let ce=document.createElement("div");ce.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let q=document.createElement("input");q.className="cw-card-title-input",q.id=`name-${z}-${O}`,q.value=`${Q.name}${ie>1?" #"+O:""}`,q.title=t("renomear_tooltip");let j=document.createElement("span");if(j.className="cw-edit-hint",j.innerHTML=t("renomear_hint"),ce.appendChild(q),ce.appendChild(j),se.appendChild(X),se.appendChild(ce),ee.appendChild(se),re){let ae=document.createElement("div");ae.className="cw-ts-disclaimer-box",ae.innerHTML=`
                <span>${t("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${t("incluir_mesmo_assim")}</button>
            `,ae.querySelector("button").onclick=()=>{a.toggleForcedScreenshot(z,!0)},ee.appendChild(ae)}else le.forEach((ae,D)=>{let U=document.createElement("div");U.className="cw-input-group";let ne=document.createElement("label");ne.className="cw-input-label",ne.textContent=ae;let s=document.createElement("input");s.className="cw-input-field",s.id=`screen-${z}-${O}-${D}`,s.placeholder=t("cole_link_placeholder"),s.setAttribute("autocomplete","off"),E[s.id]&&(s.value=E[s.id],s.value.trim().length>5&&s.classList.add("filled")),s.addEventListener("input",()=>{s.value.trim().length>5?s.classList.add("filled"):s.classList.remove("filled")});let y=document.createElement("div");y.className="cw-input-check",y.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',U.appendChild(ne),U.appendChild(s),U.appendChild(y),ee.appendChild(U)});f.appendChild(ee)}}}),p.style.display=R?"block":"none"}return{selectionElement:m,screenshotsElement:p,updateSubStatus:()=>G(),getCheckedElements:()=>Object.keys(o).map(E=>({value:E,count:o[E].count})),setTaskCount:(E,T)=>{o[E]&&delete o[E],T>0&&Fe[E]&&H(E,T,Fe[E])},toggleTask:(E,T=!0)=>{let R=o[E];T&&!R?H(E,1,Fe[E]):!T&&R&&H(E,-R.count,Fe[E])},setLanguage:E=>{t=E;let T=m.querySelector(".js-hero-title");T&&(T.textContent=t("acesso_rapido"));let R=m.querySelector(".cw-search-input");R&&(R.placeholder=t("buscar_catalogo")),G(),B()},refreshCatalog:()=>{l(),Object.keys(o).forEach(E=>{let T=Fe[E];T&&(o[E].data=T,o[E].brand=i(T.name))}),b(),F(),B(),G()},reset:()=>{for(let E in o)delete o[E];w.value="",g.style.display="block",k.style.display="none",B(),G()}}}var fs={marginTop:"24px",marginBottom:"16px",padding:"20px",background:"#fff9e6",borderRadius:"20px",border:"1.5px solid #fbbc0540",display:"none",boxShadow:"0 4px 12px rgba(251, 188, 5, 0.05)"},hs={fontSize:"12px",color:"#b06000",marginTop:"8px",lineHeight:"1.4"},xs={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #dadce0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",background:"#fff"},vs={display:"flex",gap:"20px",marginBottom:"12px"};function Fn(e){let t=document.createElement("div");t.id="tag-support-container",Object.assign(t.style,fs);let a=document.createElement("label");a.className="js-ts-main-label",a.textContent=e("utilizou_tag_support"),Object.assign(a.style,eo,{marginTop:"0"});let o=document.createElement("div");Object.assign(o.style,vs);let i=document.createElement("input");i.type="radio",i.name="ts_usage_mod",i.value="Sim",Object.assign(i.style,oo);let n=document.createElement("label");n.className="js-ts-sim-label",n.textContent=e("sim");let r=document.createElement("div");Object.assign(r.style,{display:"flex",alignItems:"center"}),r.appendChild(i),r.appendChild(n);let l=document.createElement("input");l.type="radio",l.name="ts_usage_mod",l.value="N\xE3o",l.checked=!0,Object.assign(l.style,oo);let c=document.createElement("label");c.className="js-ts-nao-label",c.textContent=e("nao");let m=document.createElement("div");Object.assign(m.style,{display:"flex",alignItems:"center"}),m.appendChild(l),m.appendChild(c),o.appendChild(r),o.appendChild(m);let p=document.createElement("div");p.style.display="block";let f=document.createElement("label");f.className="js-ts-reason-label",f.textContent=e("motivo_ts"),Object.assign(f.style,eo,{fontSize:"12px"});let u=document.createElement("input");u.type="text",Object.assign(u.style,xs);let g=document.createElement("div");g.className="js-ts-warning",g.innerHTML=`\u26A0\uFE0F <strong>${e("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" rel="noopener noreferrer" style="color:#e37400; text-decoration:underline;">${e("link_aqui")}</a>`,Object.assign(g.style,hs),p.appendChild(f),p.appendChild(u),p.appendChild(g),t.appendChild(a),t.appendChild(o),t.appendChild(p),i.onchange=()=>{v.playClick(),p.style.display="none",K.setTagSupportUsed(!0)},l.onchange=()=>{v.playClick(),p.style.display="block",K.setTagSupportUsed(!1)};function k(A,_){if(t.style.display="none",!A||!_||_.length===0)return;_.some(M=>M==="ads_conversion_tracking"||M==="ads_enhanced_conversions")?t.style.display="block":(I(),K.setTagSupportUsed(!1))}function w(){if(t.style.display==="none")return"";let A=`<br><b>${e("tag_support_output_label")}</b> ${i.checked?`\u2705 ${e("sim")}`:`\u274C ${e("nao")}`}`;return l.checked&&u.value.trim()!==""&&(A+=`<br><b>${e("motivo_output_label")}</b> ${u.value}`),A+="<br>",A}function S(A){e=A,a.textContent=e("utilizou_tag_support"),f.textContent=e("motivo_ts"),n.textContent=e("sim"),c.textContent=e("nao"),g.innerHTML=`\u26A0\uFE0F <strong>${e("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" rel="noopener noreferrer" style="color:#b06000; text-decoration:underline;">${e("link_aqui")}</a>`}function I(){t.style.display="none",l.checked=!0,i.checked=!1,p.style.display="block",u.value=""}return{element:t,updateVisibility:k,getOutput:w,setLanguage:S,reset:I}}var so="cw_notes_parking_lot",ka="cw_notes_emergency_save";var Ye={getAll:()=>{try{return JSON.parse(localStorage.getItem(so)||"[]")}catch{return[]}},save:e=>{let t=Ye.getAll(),a={id:Date.now().toString(),timestamp:new Date().toISOString(),...e};return t.unshift(a),t.length>5&&t.pop(),localStorage.setItem(so,JSON.stringify(t)),a},delete:e=>{let t=Ye.getAll();return t=t.filter(a=>a.id!==e),localStorage.setItem(so,JSON.stringify(t)),t},getCount:()=>Ye.getAll().length,saveEmergency:e=>{let t={timestamp:Date.now(),data:e};localStorage.setItem(ka,JSON.stringify(t))},getEmergency:()=>{try{let e=localStorage.getItem(ka);if(!e)return null;let t=JSON.parse(e);return Date.now()-t.timestamp>432e5?(localStorage.removeItem(ka),null):!t.data||!t.data.subStatus?null:t.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(ka)}};var zn="cw_case_streak_v1",ys=[5,10,15,20,25,30,40,50];function Rn(){let e=new Date;return`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`}function lo(){try{let e=JSON.parse(localStorage.getItem(zn)||"{}");return e.date===Rn()&&e.count||0}catch{return 0}}function $n(){let e=lo()+1;try{localStorage.setItem(zn,JSON.stringify({date:Rn(),count:e}))}catch{}return{count:e,isMilestone:ys.includes(e)}}var Pn={pt:{milestoneToast:e=>`\u{1F525} ${e} casos hoje!`,quickSearch:"Busca r\xE1pida: Ctrl/Cmd+K",casesToday:"Casos conclu\xEDdos hoje",drag:"Arrastar",cancel:"Cancelar",cancelledToast:"Cancelado!"},es:{milestoneToast:e=>`\u{1F525} \xA1${e} casos hoy!`,quickSearch:"B\xFAsqueda r\xE1pida: Ctrl/Cmd+K",casesToday:"Casos completados hoy",drag:"Arrastrar",cancel:"Cancelar",cancelledToast:"\xA1Cancelado!"}};function Mt(e){let t=de();return Pn[t]?.[e]??Pn.pt[e]}var Ee={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1",gray:"#9AA0A6"},co=50,po=null;function Ta(e){let t=document.getElementById("cw-btn-notes");if(!t)return;let a=t.querySelector(".cw-dot-dirty");e?a||(a=document.createElement("div"),a.className="cw-dot-dirty",t.appendChild(a)):a&&a.remove()}function Bn(){let e=document.getElementById("cw-streak-badge"),t=document.getElementById("cw-streak-count");if(!e||!t)return;let a=lo();t.textContent=a,e.classList.toggle("visible",a>0);let o=document.querySelector(".cw-pill");o&&(o.classList.toggle("has-streak",a>0),o.classList.toggle("streak-tier-2",a>=5&&a<15),o.classList.toggle("streak-tier-3",a>=15&&a<30),o.classList.toggle("streak-tier-4",a>=30))}function jn(){let{count:e,isMilestone:t}=$n();if(Bn(),t){let a=document.querySelector(".cw-pill");v.playSuccess(),a&&pn(a),te(Mt("milestoneToast")(e))}}function Gn(e,t){let a="cw-command-center-style";if(!document.getElementById(a)){let b=document.createElement("style");b.id=a,b.innerHTML=`
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
                
                background: ${Ee.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${Ee.glassBorder}; border-radius: 50px;
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
                width: ${co}px !important;
                height: ${co}px !important;
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
                cursor: pointer; position: relative; color: ${Ee.iconIdle};
                flex-shrink: 0;
                transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn { transition: background 0.2s ease, color 0.2s ease !important; }
            }
            .cw-btn:hover {
                background: ${Ee.glassHighlight};
                color: ${Ee.iconActive};
                /* S\xF3 scale (cresce do centro), sem translateY: bot\xF5es redondos
                   colados lado a lado numa fileira \xFAnica - um lift vertical
                   \xE9 o caso cl\xE1ssico de flicker quando o mouse passa raspando
                   a borda entre dois \xEDcones adjacentes. */
                transform: scale(1.18) !important;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn:hover { transform: none !important; }
            }

            .cw-btn.notes.active { color: ${Ee.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${Ee.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${Ee.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${Ee.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.library.active { color: ${Ee.pink} !important; background: rgba(244, 143, 177, 0.15); } /* [NOVO] */
            .cw-btn.broadcast.active { color: ${Ee.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${Ee.teal} !important; background: rgba(0, 191, 165, 0.15); }
            .cw-btn.configs.active { color: ${Ee.gray} !important; background: rgba(154, 160, 166, 0.15); }
            .cw-btn.bauform.active { color: ${Ee.blue} !important; background: rgba(66, 133, 244, 0.15); }

            .cw-btn.notes:hover { color: ${Ee.blue}; filter: drop-shadow(0 0 8px rgba(138, 180, 248, 0.6)); }
            .cw-btn.email:hover { color: ${Ee.red}; filter: drop-shadow(0 0 8px rgba(242, 139, 130, 0.6)); }
            .cw-btn.script:hover { color: ${Ee.purple}; filter: drop-shadow(0 0 8px rgba(197, 138, 249, 0.6)); }
            .cw-btn.links:hover { color: ${Ee.green}; filter: drop-shadow(0 0 8px rgba(129, 201, 149, 0.6)); }
            .cw-btn.library:hover { color: ${Ee.pink}; filter: drop-shadow(0 0 8px rgba(244, 143, 177, 0.6)); }
            .cw-btn.broadcast:hover { color: ${Ee.orange}; filter: drop-shadow(0 0 8px rgba(249, 171, 0, 0.6)); }
            .cw-btn.timezone:hover { color: ${Ee.teal}; filter: drop-shadow(0 0 8px rgba(0, 191, 165, 0.6)); }
            .cw-btn.configs:hover { color: ${Ee.gray}; filter: drop-shadow(0 0 8px rgba(154, 160, 166, 0.6)); }

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
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${Ee.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            @media (prefers-reduced-motion: reduce) {
                .cw-grip:hover .cw-grip-bar { transform: none !important; }
            }
            .cw-pill.dragging .cw-grip-bar { background-color: ${Ee.blue}; width: 16px; opacity: 1; }

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
                border: 1px solid ${Ee.glassBorder};
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
            .cw-center-dots span:nth-child(1) { background-color: ${Ee.blue}; animation-delay: -0.22s; }
            .cw-center-dots span:nth-child(2) { background-color: ${Ee.red}; animation-delay: -0.11s; }
            .cw-center-dots span:nth-child(3) { background-color: ${Ee.green}; }
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
                color: ${Ee.green};
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
        `,document.head.appendChild(b)}function o(){let b=Yt();return b.isDev?`<div id="cw-env-tag" class="cw-env-badge" title="${`Ambiente de desenvolvimento \u2014 implanta\xE7\xE3o \u2026${b.fingerprint} (${b.endpoint})`}">Dev</div>`:""}let i={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg class="cw-logo-base" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',mainSpark:'<svg class="cw-logo-spark" viewBox="0 0 24 24"><defs><linearGradient id="cw-spark-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4285F4"/><stop offset="33%" stop-color="#EA4335"/><stop offset="66%" stop-color="#FBBC05"/><stop offset="100%" stop-color="#34A853"/></linearGradient></defs><path fill="url(#cw-spark-grad)" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',configs:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>'},n=document.createElement("div");n.id="cw-floating-trigger",n.className="cw-pill side-right collapsed"+(Yt().isDev?" cw-env-dev":""),n.innerHTML=`
        <div id="cw-command-center" style="display:none;"></div>
        <div class="cw-main-logo js-cc-quicksearch" title="${Mt("quickSearch")}">${i.main}${i.mainSpark}</div>
        <div id="cw-admin-tag" class="cw-admin-badge">Admin</div>
        ${o()}
        <div id="cw-streak-badge" class="cw-streak-badge js-cc-casestoday" title="${Mt("casesToday")}">\u{1F525} <span id="cw-streak-count">0</span></div>

        <div class="cw-grip js-cc-drag" title="${Mt("drag")}">
            <div class="cw-grip-bar"></div>
        </div>
        <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${i.notes}</button>
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
    `;let r=document.createElement("div");r.className="cw-focus-backdrop",document.body.appendChild(r),document.body.appendChild(n),Bn(),Ae(()=>{let b=n.querySelector(".js-cc-quicksearch");b&&(b.title=Mt("quickSearch"));let M=n.querySelector(".js-cc-casestoday");M&&(M.title=Mt("casesToday"));let F=n.querySelector(".js-cc-drag");F&&(F.title=Mt("drag"))});let l=b=>{v.playClick(),b()};if(n.querySelector(".notes").onclick=b=>{b.stopPropagation(),l(e.toggleNotes)},n.querySelector(".bauform").onclick=b=>{b.stopPropagation(),l(e.toggleBAUForm)},n.querySelector(".email").onclick=b=>{b.stopPropagation(),l(e.toggleEmail)},n.querySelector(".script").onclick=b=>{b.stopPropagation(),l(e.toggleScript)},n.querySelector(".links").onclick=b=>{b.stopPropagation(),l(e.toggleLinks)},n.querySelector(".library").onclick=b=>{b.stopPropagation(),l(e.toggleLibrary)},n.querySelector(".timezone").onclick=b=>{b.stopPropagation(),l(e.toggleTimezone)},n.querySelector(".configs").onclick=b=>{b.stopPropagation(),l(e.toggleConfigs)},n.querySelector(".broadcast").onclick=b=>{b.stopPropagation(),l(()=>{let M=b.currentTarget.querySelector(".cw-badge");M&&M.remove(),e.broadcastControl&&e.broadcastControl.toggle()})},n.querySelectorAll(".cw-btn").forEach(b=>{b.addEventListener("mouseenter",()=>v.playHover())}),e.broadcastControl&&e.broadcastControl.hasUnread){let b=document.createElement("div");b.className="cw-badge",n.querySelector(".broadcast").appendChild(b)}let c=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function m(){if(c()){n.classList.remove("collapsed"),v.playGenieOpen();return}let b=n.getBoundingClientRect(),M=window.innerHeight,F=b.top>M/2,H=b.height;n.style.setProperty("transition","none","important"),n.classList.remove("collapsed");let B=n.scrollHeight;if(n.classList.add("collapsed"),n.style.height=`${H}px`,F){let G=M-b.bottom;n.style.top="auto",n.style.bottom=`${G}px`}else n.style.bottom="auto",n.style.top=`${b.top}px`;n.style.overflow="hidden",n.offsetWidth,n.style.removeProperty("transition"),n.classList.remove("collapsed"),n.style.height=`${B}px`,v.playGenieOpen(),setTimeout(()=>{n.style.height="",n.style.overflow=""},350)}function p(b=!0){if(n.classList.contains("collapsed"))return;if(c()){n.classList.add("collapsed"),b&&v.playSwoosh();return}let M=n.getBoundingClientRect().height;n.style.setProperty("transition","none","important"),n.style.height=`${M}px`,n.offsetWidth,n.style.removeProperty("transition"),n.classList.add("collapsed"),n.style.height=`${co}px`,b&&v.playSwoosh(),setTimeout(()=>{n.style.height=""},700)}po=p;let f=null;n.onmouseleave=()=>{document.querySelector(".cw-processing-card")||(f=setTimeout(()=>{n.querySelector(".cw-btn.active")||p()},3e3))},n.onmouseenter=()=>{f&&clearTimeout(f)},(async function(){let M=()=>{let F=Ie();if(F){let H=F.split("@")[0].toLowerCase();if(nn.includes(H)){let B=n.querySelector("#cw-admin-tag");B&&B.classList.add("visible")}}else setTimeout(M,2e3)};if(M(),t&&typeof t.then=="function"){try{await t}catch{}await pe(150)}else await pe(2800);n.classList.add("arriving"),v.playReady(),n.querySelectorAll(".cw-sep").forEach(F=>F.classList.add("visible"))})();let u=!1,g,k,w,S,I=3;n.onmousedown=b=>{if(b.target.closest("button"))return;b.preventDefault(),g=b.clientX,k=b.clientY;let M=n.getBoundingClientRect();w=M.left,S=M.top,document.addEventListener("mousemove",A),document.addEventListener("mouseup",_)};function A(b){let M=b.clientX-g,F=b.clientY-k;!u&&Math.sqrt(M*M+F*F)>I&&(u=!0,n.classList.add("dragging"),n.style.transition="none",f&&clearTimeout(f)),u&&(n.style.left=`${w+M}px`,n.style.top=`${S+F}px`,n.style.right="auto",n.style.bottom="auto",n.style.transform="none")}function _(b){if(document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",_),u){u=!1,n.classList.remove("dragging");let M=window.innerWidth,F=window.innerHeight,H=n.getBoundingClientRect(),B=H.left+H.width/2,G;B<M/2?(G=24,n.classList.remove("side-right"),n.classList.add("side-left")):(G=M-H.width-24,n.classList.remove("side-left"),n.classList.add("side-right"));let E=Nt(H.top,24,F-H.height-24);setTimeout(()=>{n.style.setProperty("transition","left 0.3s cubic-bezier(0.4, 0, 0.2, 1), top 0.3s cubic-bezier(0.4, 0, 0.2, 1)","important"),n.style.left=`${G}px`,n.style.top=`${E}px`,n.style.bottom="auto",n.style.transform=""},10),setTimeout(()=>{n.style.transition="",n.style.removeProperty("transition")},700)}else{let M=n.querySelector(".cw-btn.active"),F=b.target.closest("button");n.classList.contains("collapsed")?m():!M&&!F&&p(),F&&(F.style.transform="scale(0.9)",setTimeout(()=>F.style.transform="",150))}}}function ca(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop");window._CW_ABORT_PROCESS=!1;let a=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;e&&po?po(!1):e&&e.classList.add("collapsed"),e&&e.classList.add("cw-busy");let o=document.createElement("div");o.className="cw-processing-card",o.innerHTML=`
      <div class="cw-center-slot">
        <div class="cw-center-dots"><span></span><span></span><span></span></div>
        <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
      </div>
      <div class="cw-center-text">${me.getRandomTip()}</div>
  `;let i=document.createElement("div");i.className="cw-abort-btn",i.textContent="Cancelar",i.onclick=c=>{c.stopPropagation(),window._CW_ABORT_PROCESS=!0,v.stopThinking(),te("Cancelado!",{duration:3e3}),l()},o.appendChild(i),document.body.appendChild(o),t&&t.classList.add("active"),requestAnimationFrame(()=>{requestAnimationFrame(()=>o.classList.add("visible"))}),v.startThinking();let n=Date.now(),r=!1;function l(){r||(r=!0,v.stopThinking(),t&&t.classList.remove("active"),e&&e.classList.remove("cw-busy"),o.classList.remove("visible"),setTimeout(()=>o.remove(),a?200:320))}return function(){if(window._CW_ABORT_PROCESS||r)return;let m=Math.max(0,2e3-(Date.now()-n));setTimeout(()=>{if(window._CW_ABORT_PROCESS||r)return;v.stopThinking();let p=o.querySelector(".cw-center-dots"),f=o.querySelector(".cw-center-success");p&&p.classList.add("hidden"),i.classList.add("hidden"),f&&f.classList.add("show"),setTimeout(()=>{f&&f.classList.remove("show"),setTimeout(l,200)},850)},m)}}function Hn(e){let{onSaveCurrent:t,onLoadDraft:a,t:o}=e,i=document.createElement("button");i.className="js-btn-park",i.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${o("guardar")}</span>
    `,i.style.cssText=`
        flex: 1 1 0;
        padding: 12px 0;
        margin-top: 24px;
        border-radius: ${_e.pill};
        font-size: 14px;
        font-weight: 700;
        background: ${V.surface};
        color: ${V.textSub};
        border: 1px solid ${V.border};
        cursor: pointer;
        display: flex; 
        align-items: center; 
        justify-content: center;
        gap: 8px;
        transition: background-color 0.2s ${ve}, border-color 0.2s ${ve}, color 0.2s ${ve}, box-shadow 0.2s ${ve}, transform 0.1s ${ve};
        box-shadow: ${ht.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `,i.onmouseenter=()=>{i.style.backgroundColor="#F8F9FA",i.style.borderColor="#202124",i.style.color="#202124",i.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)"},i.onmouseleave=()=>{i.style.backgroundColor="#FFFFFF",i.style.borderColor="#DADCE0",i.style.color="#5F6368",i.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)"},i.onmousedown=()=>i.style.transform="scale(0.96)",i.onmouseup=()=>i.style.transform="scale(1)",i.onclick=async()=>{if(await De(o("confirmar_guardar_rascunho")))try{let S=await t();S?(Ye.save(S),k(),c(),v.playSuccess(),te(o("rascunho_salvo_sucesso"))):(v.playError(),te(o("erro_ler_dados"),{error:!0}))}catch(S){console.error("Erro ao salvar rascunho:",S),v.playError(),te(o("erro_ao_salvar"),{error:!0})}};let n=document.createElement("div");n.className="js-history-btn",n.title=o("meus_rascunhos"),n.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",n.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#9AA0A6"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let r=n.querySelector("svg"),l=document.createElement("div");l.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",n.appendChild(l),n.onmouseenter=()=>n.style.background="rgba(0,0,0,0.05)",n.onmouseleave=()=>n.style.background="transparent",n.onclick=w=>{w.stopPropagation(),g()};function c(){let w=Ye.getCount();Ta(w>0),r.style.color=w>0?V.primary:"#9AA0A6",w>0?(l.style.display="block",l.textContent=w,window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||l.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):l.style.display="none"}let m=document.createElement("div");m.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${V.surface}; z-index: 100;
        border-radius: ${_e.large} ${_e.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${ve};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;let p=document.createElement("div");p.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",p.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${o("rascunhos_salvos")}</span>`;let f=document.createElement("button");f.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',f.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",f.onmouseenter=()=>f.style.background="#F1F3F4",f.onmouseleave=()=>f.style.background="transparent",f.onclick=()=>g(!1),p.appendChild(f);let u=document.createElement("div");u.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",m.appendChild(p),m.appendChild(u);function g(w){let S=m.style.transform==="translateY(0%)";(w!==void 0?w:!S)?(k(),m.style.transform="translateY(0%)"):m.style.transform="translateY(110%)"}function k(){let w=Ye.getAll();if(u.innerHTML="",w.length===0){u.innerHTML=`
                <div style="text-align:center; padding:80px 20px; color:${V.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${o("nenhum_rascunho")}</div>
                </div>`;return}w.forEach(S=>{let I=document.createElement("div");I.style.cssText=`
                background: ${V.surface}; padding: 20px; border-radius: ${_e.large};
                border: 1.5px solid ${V.bgInput}; box-shadow: ${ht.subtle};
                position: relative;
            `;let _=new Date(S.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),b="";S.summaryTags&&S.summaryTags.length>0&&(b=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${S.summaryTags.slice(0,3).join(", ")+(S.summaryTags.length>3?"...":"")}</div>`),I.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${S.clientName||o("cliente_sem_nome")}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${_}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${S.cid||"---"}</span>
                    <span style="display:block; color:${S.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${S.subStatus||S.status||o("sem_status")}</span>
                    ${b}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3);">
                        ${o("retomar_caso")}
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center;" title="${o("descartar")}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let M=I.querySelector(".cw-resume-btn");M.onclick=async()=>{await De(o("retomar_rascunho_confirm"))&&(a(S),Ye.delete(S.id),k(),c(),g(!1),v.playSwoosh(),te(o("rascunho_carregado")))};let F=I.querySelector(".cw-del-btn");F.onclick=async()=>{await De(o("excluir_rascunho_confirm"),{danger:!0})&&(Ye.delete(S.id),k(),c())},u.appendChild(I)})}return c(),{parkButton:i,historyBtnWrapper:n,drawer:m}}function da(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let a=document.createRange();a.selectNodeContents(t);let o=window.getSelection();o.removeAllRanges(),o.addRange(a);try{document.execCommand("copy")}catch{v.playError(),te(de()==="es"?"Error al copiar":"Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(t)}function qa(e){["input","change","keydown","keyup"].forEach(a=>{let o=new Event(a,{bubbles:!0,cancelable:!0});e.dispatchEvent(o)})}function Un(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function La(){let e=Un(),t=e.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(r=>r.innerText.trim()==="description");if(o){let r=o.closest("material-fab")||o.closest("material-button");r?(r.style&&(r.style.display="block",r.style.visibility="visible"),Re(r)):Re(o)}else{let r=document.querySelector("material-fab-speed-dial");if(r){let l=r.querySelector(".trigger");l?(l.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),Re(l)):r.click(),await pe(800);let m=Array.from(document.querySelectorAll("i.material-icons-extended")).find(p=>p.innerText.trim()==="description");m&&Re(m)}}let i=null,n=0;for(;!i&&n<20;){await pe(300);let r=Un();if(r.length>t)i=r.find(l=>!e.includes(l)),i||(i=r[r.length-1]);else if(n>10){let l=r.filter(c=>c.offsetParent!==null);l.length>0&&(i=l[l.length-1])}n++}return i}var Vn={pt:{back:"Voltar",generateNote:"Gerar Nota",describeIssuePlaceholder:"Descreva o erro, passos para reproduzir...",whatTestedPlaceholder:"O que voc\xEA j\xE1 testou?",fieldsFilledToast:e=>`${e} campos preenchidos!`,noNewDataToast:"Nenhum dado novo encontrado.",readPageErrorToast:"Erro ao ler p\xE1gina.",fillRequiredToast:"Preencha os campos obrigat\xF3rios.",noteGeneratedToast:"Nota gerada e inserida!",copiedOpenNoteToast:"Copiado! Abra uma nota para colar."},es:{back:"Volver",generateNote:"Generar Nota",describeIssuePlaceholder:"Describe el error, pasos para reproducirlo...",whatTestedPlaceholder:"\xBFQu\xE9 ya probaste?",fieldsFilledToast:e=>`\xA1${e} campos completados!`,noNewDataToast:"No se encontraron datos nuevos.",readPageErrorToast:"Error al leer la p\xE1gina.",fillRequiredToast:"Completa los campos obligatorios.",noteGeneratedToast:"\xA1Nota generada e insertada!",copiedOpenNoteToast:"\xA1Copiado! Abre una nota para pegar."}};function mt(e){let t=de();return Vn[t]?.[e]??Vn.pt[e]}function Wn(e){let t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let a=document.createElement("div");a.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let o=document.createElement("div");o.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",t.appendChild(o),t.appendChild(a),a.addEventListener("scroll",()=>{o.style.boxShadow=a.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let i={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},n={};function r({id:b,label:M,type:F="text",placeholder:H="",required:B=!1,autocomplete:G="",parent:E=a}){let T=document.createElement("div");T.style.cssText=i.inputWrapper;let R=document.createElement("label");R.setAttribute("for",b),R.style.cssText=i.label,R.innerHTML=`${M} ${B?'<span style="color:#D93025">*</span>':""}`;let C;return F==="textarea"?(C=document.createElement("textarea"),C.style.cssText=i.input+i.textarea):(C=document.createElement("input"),C.type=F,C.style.cssText=i.input),C.id=b,C.placeholder=H,G&&C.setAttribute("autocomplete",G),C.addEventListener("focus",()=>{C.style.borderColor="#1a73e8",C.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),C.addEventListener("blur",()=>{C.style.borderColor="#DADCE0",C.style.boxShadow="none",B&&C.value.trim()!==""&&(C.style.backgroundColor="#FFF")}),n[b]={input:C,wrapper:T,required:B},T.appendChild(R),T.appendChild(C),F!=="textarea"&&fa(C),E.appendChild(T),T}function l({id:b,label:M,options:F=["Yes","No"],defaultValue:H="No",onChange:B=null}){let G=document.createElement("div");G.style.cssText=i.inputWrapper;let E=document.createElement("label");E.style.cssText=i.label,E.textContent=M,G.appendChild(E);let T=document.createElement("div");T.style.cssText=i.radioGroup;let R=document.createElement("input");return R.type="hidden",R.id=b,R.value=H,G.appendChild(R),F.forEach(C=>{let z=document.createElement("div");z.textContent=C,z.style.cssText=i.radioLabel,C===H&&(z.style.cssText+=i.radioActive),z.onclick=()=>{Array.from(T.children).forEach(ie=>ie.style.cssText=i.radioLabel),z.style.cssText+=i.radioActive,R.value=C,B&&B(C)},T.appendChild(z)}),n[b]={input:R,wrapper:G,required:!1},G.appendChild(T),a.appendChild(G),G}let c=document.createElement("div");c.style.cssText=i.banner,c.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,a.appendChild(c);let m=document.createElement("div");m.style.marginBottom="24px";let p=document.createElement("button");p.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",p.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",p.onmouseover=()=>p.style.background="#E1EFFF",p.onmouseout=()=>p.style.background="#F0F7FF",m.appendChild(p),a.appendChild(m);let f=document.createElement("div");f.style.cssText=i.section,f.innerHTML=`<div style="${i.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,a.appendChild(f),r({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:f}),r({id:"ga4",label:"GA4 Property ID",parent:f}),r({id:"gtm",label:"GTM Container ID",parent:f});let u=document.createElement("div");u.style.cssText=i.hiddenField,f.appendChild(u),l({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:b=>{b==="Yes"?u.style.cssText=i.visibleField+"margin-bottom:14px;":(u.style.cssText=i.hiddenField,n.accessEmail.input.value="")}}),r({id:"accessEmail",label:"User Access Email",parent:u}),l({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let g=document.createElement("div");g.style.cssText=i.section,g.innerHTML=`<div style="${i.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,a.appendChild(g),r({id:"name",label:"Advertiser Name",required:!0,autocomplete:"name",parent:g}),r({id:"url",label:"Website URL",type:"url",autocomplete:"url",parent:g}),r({id:"phone",label:"Phone Number",type:"tel",autocomplete:"tel",parent:g}),r({id:"email",label:"Contact Email",type:"email",autocomplete:"email",parent:g}),r({id:"callback",label:"Preferred Callback Time (Timezone)",parent:g}),r({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:mt("describeIssuePlaceholder"),required:!0,parent:g}),r({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:mt("whatTestedPlaceholder"),parent:g}),r({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:g});let k=document.createElement("div");k.style.cssText=i.section,k.innerHTML=`<div style="${i.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,a.appendChild(k),r({id:"cc_adv",label:"Advertiser Contact",parent:k}),r({id:"cc_am",label:"Account Manager",parent:k});let w=document.createElement("div");w.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let S=document.createElement("button");S.innerHTML=mt("back"),S.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",S.onclick=e;let I=document.createElement("button");I.textContent=mt("generateNote"),I.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",w.appendChild(S),w.appendChild(I),t.appendChild(w),p.onclick=async()=>{let b=p.innerHTML;p.innerHTML="\u23F3 Buscando dados...";try{let M=await tt(),F=0,H=(E,T)=>{let R=n[E];T&&R&&R.input.value===""&&(R.input.value=T,R.input.style.backgroundColor="#E6F4EA",R.input.style.borderColor="#34A853",setTimeout(()=>{R.input.style.backgroundColor="#FFF",R.input.style.borderColor="#DADCE0"},1e3),F++)};H("name",M.advertiserName),H("url",M.websiteUrl),M.clientEmail&&(H("email",M.clientEmail),H("cc_adv",M.clientEmail));let G=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);G&&H("cid",G[0]),F>0?te(mt("fieldsFilledToast")(F)):te(mt("noNewDataToast"))}catch(M){console.error(M),te(mt("readPageErrorToast"))}finally{p.innerHTML=b}};let A=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,_=()=>{let b=!0,M=null,F=A();return Object.values(n).forEach(H=>{H.required&&!H.input.value.trim()&&(b=!1,H.input.style.cssText+=i.inputError,F||H.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),M||(M=H.input))}),M&&M.scrollIntoView({behavior:F?"auto":"smooth",block:"center"}),b};return I.onclick=async()=>{if(!_()){v.playError(),te(mt("fillRequiredToast"),{error:!0});return}let b=E=>n[E].input.value||"N/A",M=b("hasAccess"),F=M==="Yes"?b("accessEmail"):"N/A",B=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${b("cid")}
<b>GA4 ID:</b> ${b("ga4")}
<b>GTM ID:</b> ${b("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${M==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${F}
<b>Ghosting Access Available (Y/N):</b> ${b("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${b("name")}
<b>Website:</b> ${b("url")}
<b>Phone Number:</b> ${b("phone")}
<b>Preferred Callback:</b> ${b("callback")}
<b>Email Address:</b> ${b("email")}

<b>Detailed Issue Description:</b>
${b("desc")}

<b>Uncropped screenshots:</b>
${b("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${b("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${b("cc_adv")}
<b>Account Manager:</b> ${b("cc_am")}
`.replace(/\n/g,"<br>");da(B);let G=await La();G?(G.innerText.trim()===""&&(G.innerHTML=""),document.execCommand("insertHTML",!1,B),qa(G),v.playSuccess(),te(mt("noteGeneratedToast"))):te(mt("copiedOpenNoteToast"))},t}var Xn="cw_user_prefs_v1",go="cw_user_prefs_pending_v1",uo=!1,pa=null;function Gt(){try{let e=localStorage.getItem(Xn),t=e?JSON.parse(e):null;return t&&typeof t=="object"?t:{}}catch{return{}}}function Yn(e){try{localStorage.setItem(Xn,JSON.stringify(e))}catch(t){console.warn("N\xE3o consegui gravar as prefer\xEAncias localmente:",t)}}function mo(e){try{e?localStorage.setItem(go,"1"):localStorage.removeItem(go)}catch{}}function ws(){try{return localStorage.getItem(go)==="1"}catch{return!1}}var gt={get(e,t=null){let a=Gt();return e in a?a[e]:t},async set(e,t){let a=Gt();a[e]=t,Yn(a);let o=Ie();if(!o)return mo(!0),{saved:!0,synced:!1};uo=!0;let i=!1;try{i=await me.saveUserPrefs(a,o)}catch(n){console.warn("Falha ao salvar prefer\xEAncias na nuvem:",n)}finally{mo(!i),setTimeout(()=>{uo=!1},2e3)}return{saved:!0,synced:i}},sync(){return pa||(pa=(async()=>{let e=Ie();if(!e)return Gt();try{if(ws()){let a=Gt(),o=await me.saveUserPrefs(a,e);return mo(!o),a}let t=await me.getUserPrefs(e);if(t&&typeof t=="object"&&!uo){let a=Gt();JSON.stringify(t)!==JSON.stringify(a)&&Yn(t)}}catch(t){console.warn("Prefer\xEAncias indispon\xEDveis; seguindo com o cache local.",t)}finally{pa=null}return Gt()})(),pa)}};var ua="shortcuts",Kn="shortcutsSortByUsage",Zn="cw_shortcut_usage_v1",xt=8,Ss=[{id:"sc_default_ni_attempted",kind:"note",label:"NI Attempted \u2014 In\xEDcio 2 Day Rule",alias:"2day inicio",payload:{caseType:"bau",status:"NI",subStatus:"NI_Attempted_Contact",scenarios:[{id:"quickfill-ni-attempted-2day",substatus:"NI_Attempted_Contact"}]}},{id:"sc_default_in_not_reachable",kind:"note",label:"IN Not Reachable \u2014 Finaliza\xE7\xE3o 2 Day Rule",alias:"2day fim",payload:{caseType:"bau",status:"IN",subStatus:"IN_Not_Reachable",scenarios:[{id:"quickfill-in-no-show-bau",substatus:"IN_Not_Reachable"}]}}];function ma(){return"sc_"+Date.now().toString(36)+Math.floor(Math.random()*1e3).toString(36)}function fo(e){if(!e||!e.id)return null;if(ut[e.id])return e.id;let t=ia(e.id,e.substatus),a=Object.entries(ut),o=a.find(([n,r])=>ia(n,e.substatus)===t&&Array.isArray(r.substatus)&&r.substatus.includes(e.substatus));if(o)return o[0];let i=a.find(([n])=>ia(n,e.substatus)===t);return i?i[0]:null}function Qn(e){return(e.payload&&e.payload.scenarios||[]).filter(a=>!fo(a)).map(a=>a.id)}function Jn(){try{return JSON.parse(localStorage.getItem(Zn)||"{}")}catch{return{}}}function bo(e){return Array.isArray(e)?e.filter(t=>t&&t.id&&t.payload&&t.payload.subStatus).map((t,a)=>({id:t.id,kind:t.kind||"note",label:String(t.label||"Atalho"),alias:String(t.alias||""),order:Number.isFinite(t.order)?t.order:a,payload:{caseType:t.payload.caseType||"bau",status:t.payload.status||String(t.payload.subStatus).split("_")[0],subStatus:t.payload.subStatus,scenarios:Array.isArray(t.payload.scenarios)?t.payload.scenarios.filter(o=>o&&o.id).map(o=>({id:o.id,substatus:o.substatus||t.payload.subStatus})):[]}})):[]}var Le={list(){let e=gt.get(ua,null),t=bo(e===null?Le.defaults():e),a=Jn();return t.slice().sort((o,i)=>{if(Le.isSortedByUsage()){let n=(a[i.id]||0)-(a[o.id]||0);if(n)return n}return o.order-i.order})},listRaw(){let e=gt.get(ua,null);return bo(e===null?Le.defaults():e).sort((t,a)=>t.order-a.order)},defaults(){return Ss.map((e,t)=>({...e,order:t}))},isSortedByUsage(){return gt.get(Kn,!0)!==!1},setSortedByUsage(e){return gt.set(Kn,!!e)},async save(e){let t=Le.listRaw(),a=t.findIndex(n=>n.id===e.id);if(a===-1&&t.length>=xt)return{ok:!1,reason:"limit"};let o=bo([{...e,id:e.id||ma()}])[0];return o?(a===-1?(o.order=t.length,t.push(o)):(o.order=t[a].order,t[a]=o),{ok:!0,synced:(await gt.set(ua,t)).synced,shortcut:o}):{ok:!1,reason:"invalid"}},async remove(e){let t=Le.listRaw().filter(a=>a.id!==e).map((a,o)=>({...a,order:o}));await gt.set(ua,t)},async reorder(e,t){let a=Le.listRaw(),o=a.findIndex(r=>r.id===e);if(o===-1)return;let[i]=a.splice(o,1),n=Math.max(0,Math.min(t,a.length));a.splice(n,0,i),await gt.set(ua,a.map((r,l)=>({...r,order:l})))},registerUse(e){try{let t=Jn();t[e]=(t[e]||0)+1,localStorage.setItem(Zn,JSON.stringify(t))}catch{}}};var ei={pt:{emailButtonNotFound:"Erro: Bot\xE3o de email n\xE3o encontrado.",clearingOldDraft:"Limpando rascunho antigo...",editorNotLoaded:"Erro: Editor n\xE3o carregou.",cannedResponseApplied:"Canned Response aplicada!",cannedResponseTimeout:e=>`Timeout: Template '${e}' n\xE3o carregou.`,cannedResponseButtonNotFound:"Bot\xE3o Canned Response n\xE3o encontrado.",emailFilledSuccess:"Email preenchido com sucesso!",editorFocusError:"Erro ao focar no editor.",fallbackClient:"Cliente",fallbackSite:"seu site"},es:{emailButtonNotFound:"Error: Bot\xF3n de email no encontrado.",clearingOldDraft:"Limpiando borrador antiguo...",editorNotLoaded:"Error: El editor no carg\xF3.",cannedResponseApplied:"\xA1Canned Response aplicada!",cannedResponseTimeout:e=>`Tiempo agotado: la plantilla '${e}' no carg\xF3.`,cannedResponseButtonNotFound:"Bot\xF3n Canned Response no encontrado.",emailFilledSuccess:"\xA1Email completado con \xE9xito!",editorFocusError:"Error al enfocar el editor.",fallbackClient:"Cliente",fallbackSite:"su sitio"}};function nt(e){let t=de();return ei[t]?.[e]??ei.pt[e]}function Oe(e,t="info"){let a={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${e}`,a[t]||a.info)}function Na(e,t){if(!e)return;let a=`cw-warning-${e.id||Math.random().toString(36).substr(2,9)}`,o=document.getElementById(a);o&&o.remove();let i=e.getBoundingClientRect(),n=document.createElement("div");n.id=a,n.style.cssText=`
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
        z-index: ${$e.TOAST};
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
    `;let r=n.querySelector(".cw-close-btn");r.onclick=()=>{n.style.opacity="0",n.style.transform="translateY(-5px)",setTimeout(()=>n.remove(),300)},document.body.appendChild(n),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(n)&&r.click()},25e3)}async function Ia(e,t){if(!e||!t)return;e.focus(),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await pe(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),await pe(100),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function xo(){let t=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(a=>{let o=a.offsetParent!==null,i=a.closest("case-message-view")!==null,n=a.closest(".editor")!==null||a.closest("write-card")!==null;return o&&!i&&n});return t&&Oe("Editor visualmente detectado.","success"),t}var ho=e=>!!e&&e.getClientRects().length>0&&e.getAttribute("aria-disabled")!=="true";async function Es(e,{timeout:t=3e3,intervalo:a=100}={}){let o=Date.now()+t;for(;Date.now()<o;){let i=e();if(i)return i;await pe(a)}return null}function ti(){let e=Array.from(document.querySelectorAll('material-button.compose, material-button.speed-dial-mini-fab[role="menuitem"]')),t=e.find(a=>a.classList.contains("compose")&&ho(a));return t||e.find(a=>{let o=a.querySelector("i.material-icons-extended");return ho(a)&&o&&o.textContent.trim()==="email"})||null}async function As(){try{let e=ti();if(e)Oe("Menu do speed dial j\xE1 estava aberto.");else{let t=document.querySelector("#action-bar-speed-dial-container material-button")||document.querySelector("material-button.action-bar-speed-dial-button");if(!ho(t))return Oe("Speed dial (+ Open) n\xE3o encontrado.","warn"),!1;Oe("Speed dial (+ Open) encontrado. Abrindo o menu..."),Re(t),await pe(350),e=await Es(ti,{timeout:3e3})}return e?(await pe(120),Re(e),Oe("Compose clicado via speed dial.","success"),!0):(Oe("Menu abriu, mas o bot\xE3o Compose n\xE3o apareceu.","warn"),!1)}catch(e){return Oe(`Falha no speed dial: ${e.message}`,"error"),!1}}async function Cs(){let t=Array.from(document.querySelectorAll("i.material-icons-extended")).find(o=>o.innerText.trim()==="email");if(t&&t.offsetParent!==null){Oe("Bot\xE3o de email direto encontrado.");let o=t.closest("material-button")||t.closest("material-fab")||t;return Re(o),!0}Oe("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let a=document.querySelector("material-fab-speed-dial");if(a){let o=a.querySelector(".trigger");if(o){Re(o),await pe(800);let n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(r=>r.innerText.trim()==="email");if(n)return Re(n),Oe("Email aberto pelo fluxo antigo.","success"),!0}}return!1}async function ai(){Oe("\u{1F680} FASE 1: Tentando abrir a janela de email...");let e=await As();if(e||(Oe("UI nova n\xE3o reconhecida. Voltando ao fluxo da UI antiga...","warn"),e=await Cs()),!e)return v.playError(),te(nt("emailButtonNotFound"),{error:!0}),!1;Oe("\u{1F680} FASE 2: Verificando rascunhos...");let t=null,a=0,o=20;for(;a<o;){await pe(250);let m=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(t=Array.from(m).find(p=>p.offsetParent!==null),t){Oe("\u26A0\uFE0F Rascunho detectado!","warn");break}a++}if(t){Oe("\u{1F5D1}\uFE0F Descartando..."),Re(t),t.click();let m=null,p=0;for(;p<15;){await pe(300);let f=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(m=Array.from(f).find(u=>u.offsetParent!==null),m)break;p++}m&&(Re(m),te(nt("clearingOldDraft"),{duration:2e3}),await pe(2500))}Oe("\u{1F680} FASE 3: Buscando editor final...");let i=0,n=null;for(;i<20&&(n=xo(),!n);)await pe(250),i++;if(!n)return v.playError(),te(nt("editorNotLoaded"),{error:!0}),!1;let r=n.closest('[id="email-body-content-top"]'),c=(n.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(r){if(c){let p=c.closest('[aria-hidden="true"]');p&&p.removeAttribute("aria-hidden"),c.focus(),Re(c)}await pe(300),r.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let m=r.querySelector("#cases-body-field");if(m){let p=document.createRange();p.selectNodeContents(m),p.collapse(!0);let f=window.getSelection();f.removeAllRanges(),f.addRange(p)}return!0}return!1}async function _a(e){if(!e||!await ai())return;let a=await tt();Oe("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let o=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(o&&(o.click(),await pe(600)),a.clientEmail&&a.clientEmail!=="N/A"&&a.clientEmail!=="N/A (Bloqueado)"){let n=document.querySelector('input[aria-label="Enter To email address"]');n&&(await Ia(n,a.clientEmail),Na(n,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(a.internalEmail){let n=document.querySelector('input[aria-label="Enter Bcc email address"]');n&&(await Ia(n,a.internalEmail),Na(n,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await pe(500);let i=document.querySelector('material-button[debug-id="canned_response_button"]');if(i){Re(i),await pe(1e3);let n=document.querySelector("material-auto-suggest-input input");if(n){Re(n),document.execCommand("insertText",!1,e),n.dispatchEvent(new Event("input",{bubbles:!0})),Oe("\u23F3 Buscando resultado da Canned Response...","info");let r=null,l=0,c=15e3,m=500;for(;l<c&&(r=document.querySelector("material-select-dropdown-item"),!r);)await pe(m),l+=m;if(r){Re(r),await pe(1500);let p=xo();if(p){let u=Array.from(p.querySelectorAll("span.field")).filter(k=>k.innerText.includes("{Requested Task Type}"));if(u.length>0){let k=u.map(S=>S.closest("tr")).filter(S=>S!==null),w=[...new Set(k)];if(w.length>0){let I=w[0].querySelector('td[width="100%"]');I&&(I.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let A=1;A<w.length;A++)w[A].remove()}}let g=p.innerHTML;a.advertiserName&&g.includes("{%ADVERTISER_NAME%}")&&(g=g.replace(/{%ADVERTISER_NAME%}/g,a.advertiserName)),g.includes("{%^79285%}")&&(g=g.replace(/{%\^79285%}/g,a.websiteUrl||nt("fallbackSite"))),p.innerHTML=g}te(nt("cannedResponseApplied"))}else Oe(`\u274C Timeout: Resultado '${e}' n\xE3o apareceu ap\xF3s 15s.`,"error"),v.playError(),te(nt("cannedResponseTimeout")(e),{error:!0})}}else v.playError(),te(nt("cannedResponseButtonNotFound"),{error:!0})}async function oi(e){if(Oe(`\u{1F680} Iniciando Quick Email: ${e.name}`),!await ai())return;let a=await tt(),o=Qt();await pe(600);let i=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(i&&(i.click(),await pe(600)),a.clientEmail&&a.clientEmail!=="N/A"&&a.clientEmail!=="N/A (Bloqueado)"){let l=document.querySelector('input[aria-label="Enter To email address"]');l&&(await Ia(l,a.clientEmail),Na(l,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(a.internalEmail){let l=document.querySelector('input[aria-label="Enter Bcc email address"]');l&&(await Ia(l,a.internalEmail),Na(l,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let n=document.querySelector('input[aria-label="Subject"]');n&&e.subject&&(n.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(n,e.subject),n.dispatchEvent(new Event("input",{bubbles:!0})),await pe(300));let r=xo();if(r){let c=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');c&&(c.focus(),Re(c));let m=new Date;m.setDate(m.getDate()+3);let p=m.getDay();p===6?m.setDate(m.getDate()+2):p===0&&m.setDate(m.getDate()+1);let f=m.toLocaleDateString("pt-BR"),u=e.body;u=u.replace(/\[Nome do Cliente\]/g,a.advertiserName||nt("fallbackClient")),u=u.replace(/\[INSERIR URL\]/g,a.websiteUrl||nt("fallbackSite")),u=u.replace(/\[URL\]/g,a.websiteUrl||nt("fallbackSite")),u=u.replace(/\[Seu Nome\]/g,o),u=u.replace(/\[MM\/DD\/YYYY\]/g,f),document.execCommand("insertHTML",!1,u),c&&(c.dispatchEvent(new Event("input",{bubbles:!0})),c.dispatchEvent(new Event("change",{bubbles:!0}))),te(nt("emailFilledSuccess"),{duration:2e3}),Oe("\u2705 Processo finalizado com sucesso.","success")}else v.playError(),te(nt("editorFocusError"),{error:!0})}var vo=460,yo=280,ks=200,wo=.06;if(!document.getElementById("cw-module-styles")){let e=document.createElement("style");e.id="cw-module-styles",e.innerHTML=`
        /* M\xD3DULO BASE */
        .cw-module-window {
            /* Degrau de repouso da janela. Precisa estar AQUI, e n\xE3o s\xF3
               no estilo inline de stylePopup(): o fim do fechamento faz
               popup.style.zIndex = '', o que apaga o inline e deixaria a
               janela em z-index:auto na pr\xF3xima abertura. */
            z-index: ${$e.MODULE_RESTING};
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
            transform: scale(${wo});

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
    `,document.head.appendChild(e)}window._cwEscapeListenerActive||(window._cwEscapeListenerActive=!0,document.addEventListener("keydown",e=>{if(e.key!=="Escape"||document.querySelector(".cw-dialog-overlay"))return;let t=document.querySelector(".cw-module-window.open");if(!t)return;let a=t.querySelector(".cw-header-close");a&&a.click()}));function di(){return!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)}function ni(e){let t=document.querySelector(".cw-pill"),a=e?document.getElementById(e):null,o=!!(t&&t.classList.contains("collapsed")),i=n=>{if(!n)return null;let r=n.getBoundingClientRect();return!r.width||!r.height?null:{x:r.left+r.width/2,y:r.top+r.height/2}};if(!o){let n=i(a);if(n)return n}return i(t)}function ii(e,t){let a=e.style.transition,o=e.style.transform;e.style.transition="none",e.style.transform="none";let i=e.getBoundingClientRect();return e.style.transform=o,e.offsetWidth,e.style.transition=a,{left:t?i.left:i.left-i.width/2,top:t?i.top:i.top-i.height/2,width:i.width,height:i.height}}function ri(e,t,a){if(!t){e.style.transformOrigin="50% 50%",e._cwOrigin=null;return}let o=`${Math.round(t.x-a.left)}px ${Math.round(t.y-a.top)}px`;e.style.transformOrigin=o,e._cwOrigin=o}function si(e){return e?`translate(0, 0) scale(${wo})`:`translate(-50%, -50%) scale(${wo})`}function Ts(e){return e?"translate(0, 0) scale(1)":"translate(-50%, -50%) scale(1)"}function li(e){!e||di()||(e.classList.remove("cw-absorbing"),e.offsetWidth,e.classList.add("cw-absorbing"),setTimeout(()=>e.classList.remove("cw-absorbing"),400))}function Xe(e){return e?typeof e._cwOpen=="boolean"?e._cwOpen:e.classList.contains("open"):!1}function Be(e,t,a){let o=a?document.getElementById(a):null;if(!t)return;t._cwOpen=!!e;let i=(t._cwAnimToken||0)+1;t._cwAnimToken=i;let n=()=>t._cwAnimToken!==i;t._cwTeardown&&(t._cwTeardown(),t._cwTeardown=null);let r=di(),l=t.getAttribute("data-moved")==="true";if(e){v.playGenieOpen();let c=ii(t,l);ri(t,ni(a),c),t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",t.style.transform=si(l),t.style.willChange="transform, opacity",t.classList.add("cw-animating"),t.offsetWidth,requestAnimationFrame(()=>{n()||(t.classList.add("open"),t.classList.remove("idle"),o&&o.classList.add("active"),li(o),t.style.transition=r?"opacity 0.15s ease":`opacity ${Math.round(vo*.6)}ms ease-out, transform ${vo}ms var(--cw-ease-decelerate), filter 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease`,t.style.opacity="1",t.style.transform=Ts(l),ci(t,i,r?150:vo,()=>{t.style.willChange="auto",t.classList.remove("cw-animating"),t._cwSettled=!0}))}),t._cwSettled=!1,qs(t,a)}else{if(v.playSwoosh(),t._cwSettled||!t._cwOrigin){let c=ii(t,l);ri(t,ni(a),c)}if(t.style.transition=r?"opacity 0.15s ease":`opacity ${Math.round(yo*.8)}ms ease, transform ${yo}ms var(--cw-ease-accelerate)`,t.style.pointerEvents="none",t.style.willChange="transform, opacity",t.classList.add("cw-animating"),o&&t.contains(document.activeElement))try{o.focus({preventScroll:!0})}catch{o.focus()}requestAnimationFrame(()=>{n()||(t.style.opacity="0",t.style.transform=si(l),ci(t,i,r?150:yo,()=>{t.classList.remove("open"),t.classList.remove("idle"),t.style.zIndex="",o&&o.classList.remove("active"),li(o),t.style.willChange="auto",t.classList.remove("cw-animating"),t.style.transition=""}))}),pi(t)}}function ci(e,t,a,o){let i=!1,n=()=>{e.removeEventListener("transitionend",l),clearTimeout(c),e._cwTeardown===n&&(e._cwTeardown=null)},r=()=>{i||(i=!0,n(),e._cwAnimToken===t&&o())},l=m=>{m.target===e&&m.propertyName==="transform"&&r()};e.addEventListener("transitionend",l);let c=setTimeout(r,a+ks);e._cwTeardown=n}function qs(e,t){pi(e);let a=o=>{if(!e.classList.contains("open"))return;let i=e.contains(o.target),n=document.querySelector(".cw-pill"),r=n&&n.contains(o.target);i?(e.classList.remove("idle"),e.style.zIndex=String($e.MODULE_FOCUSED)):r||(e.classList.add("idle"),e.style.zIndex=String($e.MODULE_RESTING))};e._idleHandler=a,document.addEventListener("mousedown",a)}function pi(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var ui='<svg viewBox="0 0 24 24" fill="currentColor" style="width:13px;height:13px;flex-shrink:0;"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>';function mi(){let e="v4.0.0",{popup:t,content:a,header:o,animRefs:i,credit:n}=xn(e,T),r=Fn(s),l=Dn(()=>{re(),K.setActiveTasks(l.getCheckedElements())},s,K),c=document.createElement("div");c.style.display="none";let m=Mn((d,x)=>{W(d,x)});c.appendChild(m);let p=document.createElement("button");p.type="button",p.className="cw-save-shortcut-btn",p.style.cssText=`
        margin-top: 10px; padding: 7px 12px; border-radius: 8px;
        border: 1px dashed ${V.border}; background: transparent;
        color: ${V.textSub}; font-family: inherit; font-size: 11.5px;
        font-weight: 600; cursor: pointer; display: inline-flex; align-items: center;
        gap: 6px; transition: all 0.2s ${ve};
    `,p.onmouseenter=()=>{p.style.borderColor=V.primary,p.style.color=V.primary,v.playHover()},p.onmouseleave=()=>{p.style.borderColor=V.border,p.style.color=V.textSub},p.onclick=()=>U(),p.innerHTML=`${ui}<span>${s("salvar_como_atalho")}</span>`,c.appendChild(p);let f=document.createElement("div");f.id="evidence-container",Object.assign(f.style,{display:"none",marginTop:"16px",padding:"16px",background:V.bgInput,border:`1px solid ${V.border}`,borderRadius:_e.medium,boxShadow:ht.subtle});let u=document.createElement("div");u.className="cw-section-title",u.textContent=s("evidencias_contato"),f.appendChild(u);let g={},k=(d,x)=>{let h=document.createElement("div");h.style.marginBottom="12px";let $=document.createElement("label");$.textContent=x,$.setAttribute("for",d),$.style.cssText=`display: block; font-size: 11px; font-weight: 700; color: ${V.textSub}; margin-bottom: 6px; text-transform: uppercase;`;let P=document.createElement("input");return P.type="text",P.id=d,P.className="cw-input",P.placeholder="https://screenshot.googleplex.com/...",P.style.marginBottom="0",h.appendChild($),h.appendChild(P),fa(P,{minLength:8}),g[d]=P,h};f.appendChild(k("evidence-l1",s("ligacao_1"))),f.appendChild(k("evidence-l2",s("ligacao_2"))),f.appendChild(k("evidence-msg",s("mensagem_am")));let w=Hn({onSaveCurrent:async()=>{let d=await ce();return X(),d},onLoadDraft:d=>{j(d)},t:d=>s(d)}),S=C(),I=z(),A=document.createElement("div"),_=L(),b=le(w,s);a.appendChild(S),a.appendChild(I),a.appendChild(_),a.appendChild(c),a.appendChild(A),a.appendChild(f),l.selectionElement.style.display="none",l.screenshotsElement.style.display="none";let M=document.createElement("button");M.id="manual-task-toggle",M.textContent=s("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",M.style.cssText=`display: none; width: 100%; padding: 14px; border: 2px dashed ${V.primary}; background: ${V.surface}; color: ${V.primary}; border-radius: ${_e.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${ve}; text-transform: uppercase; letter-spacing: 0.5px;`,M.onmouseenter=()=>{M.style.background=V.primaryBg},M.onmouseleave=()=>{M.style.background=V.surface},M.onclick=()=>{l.selectionElement.style.display="block",l.screenshotsElement.style.display="block",M.style.display="none"},a.appendChild(M),a.appendChild(l.selectionElement),a.appendChild(r.element),a.appendChild(l.screenshotsElement),a.appendChild(b);let F=document.createElement("div");F.style.display="none",F.style.flexGrow="1",F.style.minHeight="0",F.style.overflow="hidden";let H=Wn(()=>R());H.style.height="100%",F.appendChild(H),t.insertBefore(F,n);let B=o.lastElementChild;B&&(B.insertBefore(w.historyBtnWrapper,B.firstChild),B.insertBefore(y(),B.firstChild)),t.appendChild(w.drawer);let G=null;K.subscribe(d=>{J(d),E(),d.isDirty?(G&&clearTimeout(G),G=setTimeout(async()=>{let x=await ce(!0);x.subStatus?Ye.saveEmergency(x):Ye.clearEmergency(),d.isDirty=!1},2e3)):G&&(clearTimeout(G),G=null)});function E(){let d=Ye.getCount()>0,x=!!K.currentSubStatus;Ta(d||x)}function T(){K.visible=!K.visible,K.visible?Te():qe(),Be(K.visible,t,"cw-btn-notes")}function R(){K.isSplitView=!K.isSplitView,K.isSplitView?(a.style.display="none",F.style.display="flex",F.style.flexDirection="column",i.googleLine&&(i.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(a.style.display="flex",F.style.display="none",i.googleLine&&(i.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function C(){let d=document.createElement("div");if(d.innerHTML=`
            <div style="display: flex; gap: 12px; margin-bottom: 8px;">
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-fluxo" style="font-size: 10px; margin-bottom: 6px;">${s("fluxo")}</div>
                    <div class="cw-segmented-control" id="type-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-type="bau" class="active" style="z-index:2">BAU</button>
                        <button data-type="lm" style="z-index:2">LM</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-portugal" style="font-size: 10px; margin-bottom: 6px;">${s("caso_portugal")}</div>
                    <div class="cw-segmented-control" id="portugal-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-val="false" class="active" style="z-index:2">${s("nao")}</button>
                        <button data-val="true" style="z-index:2">${s("sim")}</button>
                    </div>
                </div>
            </div>
        `,!document.getElementById("cw-segmented-styles")){let h=document.createElement("style");h.id="cw-segmented-styles",h.innerHTML=`
                .cw-segmented-control {
                    display: flex;
                    background: ${V.bgInput};
                    padding: 3px;
                    border-radius: 100px;
                    gap: 2px;
                    border: 1px solid ${V.border};
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
                    transition: all 0.3s ${ve};
                    color: ${V.textSub};
                    position: relative;
                }
                .cw-segmented-control button.active {
                    color: #fff;
                }
                .cw-segmented-control button:hover:not(.active) {
                    background: rgba(0,0,0,0.03);
                    color: ${V.text};
                }
                .cw-segmented-indicator {
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    bottom: 3px;
                    width: calc(50% - 4px);
                    background: ${V.primary};
                    border-radius: 100px;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 1;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
                }
            `,document.head.appendChild(h)}let x=(h,$)=>{let oe=d.querySelector(`#${h}`).querySelector(".cw-segmented-indicator");oe&&(oe.style.transform=`translateX(${$*100}%) translateX(${$*2}px)`)};return d.querySelectorAll("#type-selector button").forEach((h,$)=>{h.onclick=()=>{K.setCaseType(h.dataset.type),d.querySelectorAll("#type-selector button").forEach(P=>P.classList.remove("active")),h.classList.add("active"),x("type-selector",$),v.playClick(),K.currentSubStatus&&Y(K.currentSubStatus)}}),d.querySelectorAll("#portugal-selector button").forEach((h,$)=>{h.onclick=()=>{K.setPortugalCase(h.dataset.val==="true"),d.querySelectorAll("#portugal-selector button").forEach(P=>P.classList.remove("active")),h.classList.add("active"),x("portugal-selector",$),v.playClick(),K.currentSubStatus&&Y(K.currentSubStatus)}}),d}function z(){let d=document.createElement("div");d.className="cw-status-section",d.style.cssText="display: flex; flex-direction: column; gap: 8px;",d.innerHTML=`
            <label class="cw-section-title js-label-status" for="main-status-select" style="margin-top: 8px;">${s("status_principal")}</label>
            <select id="main-status-select" class="cw-select">
                <option value="" disabled selected>${s("select_status")}</option>
                <option value="NI">NI - Need Info</option>
                <option value="SO">SO - Solution Offered</option>
                <option value="IN">IN - Inactive</option>
                <option value="AS">AS - Assigned</option>
                <option value="DC">DC - Discard</option>
            </select>
            <label class="cw-section-title js-label-substatus" for="sub-status-select" style="margin-top: 8px;">${s("substatus")}</label>
            <select id="sub-status-select" class="cw-select" disabled>
                <option value="">${s("select_substatus")}</option>
            </select>
        `;let x=d.querySelector("#main-status-select"),h=d.querySelector("#sub-status-select");return x.onchange=()=>{K.setStatus(x.value),ie(x.value,h),K.setSubStatus(""),Y("")},h.onchange=()=>{K.setSubStatus(h.value),Y(h.value)},d}function Q(){return f.style.display==="none"?null:{l1:g["evidence-l1"]?.value.trim()||"",l2:g["evidence-l2"]?.value.trim()||"",msg:g["evidence-msg"]?.value.trim()||""}}function ie(d,x){if(x.innerHTML=`<option value="">${s("select_substatus")}</option>`,!d){x.disabled=!0;return}let h=d==="IN"?(()=>{let $=document.createElement("optgroup");return $.label="Fora de Escopo",$})():null;for(let $ in Me)if(Me[$].status===d){let P=document.createElement("option");P.value=$,P.textContent=Me[$].name,h&&$.startsWith("IN_Out_of_Scope")?h.appendChild(P):x.appendChild(P)}h&&h.children.length>0&&x.appendChild(h),x.disabled=!1}function Y(d){let x=Me[d],h=d==="NI_Attempted_Contact"||x&&x.name&&x.name.toLowerCase().includes("attempted contact");if(m.render&&m.render(d,K.currentCaseType),!d){f.style.display="none",g["evidence-l1"]&&(g["evidence-l1"].value=""),g["evidence-l2"]&&(g["evidence-l2"].value=""),g["evidence-msg"]&&(g["evidence-msg"].value=""),c.style.display="none",A.style.display="none";let ye=document.getElementById("manual-task-toggle");ye&&(ye.style.display="none"),l.selectionElement.style.display="none",l.screenshotsElement.style.display="none",_.style.display="flex",_.style.opacity="1",b.style.display="none";return}if(h?f.style.display="block":(f.style.display="none",g["evidence-l1"]&&(g["evidence-l1"].value=""),g["evidence-l2"]&&(g["evidence-l2"].value=""),g["evidence-msg"]&&(g["evidence-msg"].value="")),_.style.opacity="0",setTimeout(()=>{K.currentSubStatus&&(_.style.display="none")},400),b.style.display="grid",x&&x.templateFields){let ye=Sn(x);K.setActiveFields(x.templateFields.filter(be=>!ye.includes(be)))}se(),la(d,A,K),A.style.display="block",c.style.display="block";let $=d.startsWith("SO_"),P=d==="NI_Awaiting_Validation",oe=document.getElementById("manual-task-toggle");$||P?(l.selectionElement.style.display="block",oe.style.display="none"):(l.selectionElement.style.display="none",l.screenshotsElement.style.display="none",oe.style.display="block");let Z=d==="SO_Education_Only"?"education":"implementation";K.setScreenshotMode(Z),l.updateSubStatus(d),re();let ge=document.getElementById("email-automation-toggle-row");ge&&(ge.style.display=Pt[d]?"flex":"none")}function re(){let d=l.getCheckedElements().map(x=>x.value);r.updateVisibility(K.currentSubStatus,d)}function W(d,x){let h=ya(ut[d],K.currentLang,d);if(h){for(let $ in h)if($==="linkedTask")l.toggleTask(h.linkedTask,x);else if($==="activeTasks")h.activeTasks.forEach(P=>{x?l.setTaskCount(P.value,P.count):l.setTaskCount(P.value,0)});else if($.startsWith("field-")){let P=$,oe=h[$],Z=document.getElementById(P);if(Z){let ge=Bt.includes(P.replace("field-",""));if(x)if(ge){let ye=Z.value.trim();ye.includes(oe.trim())||(Z.value=ye?ye+`
`+oe.trim():oe.trim())}else Z.value=oe;else if(ge){let ye=Z.value.trim(),be=oe.trim();ye.includes(be)&&(Z.value=ye.replace(be,"").trim().replace(/\n{3,}/g,`

`))}else Z.value.trim()===oe.trim()&&(Z.value="");K.updateField(P,Z.value),Z.dispatchEvent(new Event("input"))}}}}function le(d,x){let h=document.createElement("div");if(h.className="cw-actions-section",h.style.cssText=`
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 10px;
            margin-top: 16px;
            background: ${V.bgInput};
            border-radius: 12px;
            border: 1px solid ${V.border};
        `,!document.getElementById("cw-actions-hover-styles")){let ye=document.createElement("style");ye.id="cw-actions-hover-styles",ye.innerHTML=`
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
                    border-color: ${V.primary} !important;
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
                    color: ${V.primary} !important;
                    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.05) !important;
                    transform: translateY(-1px);
                }
            `,document.head.appendChild(ye)}let $=document.createElement("div");$.id="email-automation-toggle-row",$.style.cssText="grid-column: 1 / -1; display: none; align-items: center; justify-content: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2px;",$.innerHTML=`
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 10.5px; font-weight: 600; color: ${V.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 13px; height: 13px; accent-color: ${V.primary};">
                <span class="js-label-email-toggle">${x("preencher_email_automaticamente")}</span>
            </label>
        `;let P=d.parkButton;P.classList.add("js-btn-park"),P.style.cssText="width: 100%; margin: 0; border-radius: 10px; height: 34px; font-weight: 600; font-size: 11.5px;";let oe=document.createElement("button");oe.className="cw-btn-secondary js-btn-reset",oe.textContent=x("limpar"),oe.style.cssText=`width: 100%; height: 34px; background: ${V.surface}; color: ${V.textSub}; border: 1px solid ${V.border}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,oe.onclick=()=>X();let Z=document.createElement("button");Z.className="cw-btn-secondary js-btn-copy",Z.textContent=x("copiar"),Z.style.cssText=`width: 100%; height: 34px; background: ${V.surface}; color: ${V.primary}; border: 1px solid ${V.primary}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,Z.onclick=()=>O();let ge=document.createElement("button");return ge.className="cw-btn-primary js-btn-generate",ge.textContent=x("preencher"),ge.style.cssText=`width: 100%; height: 38px; background: ${V.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; grid-column: 1 / -1; font-size: 12.5px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 0px;`,ge.onclick=()=>ee(),h.appendChild($),h.appendChild(P),h.appendChild(oe),h.appendChild(Z),h.appendChild(ge),h}async function O(){if(!K.currentSubStatus){v.playError(),te(s("select_substatus"),{error:!0});return}let d=io(K,l,r,Q());d?(da(d),te(s("copiado_sucesso")),v.playClick()):(v.playError(),te(s("select_substatus"),{error:!0}))}async function ee(){if(!K.currentSubStatus){v.playError(),te(s("select_substatus"),{error:!0});return}let d=Me[K.currentSubStatus],x=ra(d).filter(oe=>{if(!K.activeFields.includes(oe))return!1;let Z=K.formData[`field-${oe}`];return!Z||!Z.trim()});if(x.length>0){v.playError(),te(`Preencha o campo obrigat\xF3rio antes de gerar: ${s(x[0].toLowerCase())}`,{error:!0});return}if(d?.requiresTasks&&l.getCheckedElements().length===0){v.playError(),te("Selecione ao menos uma tarefa antes de gerar a nota.",{error:!0});return}let h=io(K,l,r,Q());da(h),T();let $=ca(),P=await La();if(P){P.focus(),document.execCommand("insertHTML",!1,h),qa(P);let oe=document.getElementById("email-automation-checkbox");(!oe||oe.checked)&&K.currentSubStatus&&Pt[K.currentSubStatus]&&await _a(Pt[K.currentSubStatus]),te(s("inserido_copiado")),v.playSuccess(),jn(),X()}else v.playError(),te("N\xE3o foi poss\xEDvel abrir a nota no CRM. O conte\xFAdo j\xE1 est\xE1 copiado \u2014 cole manualmente.",{error:!0}),T();$()}function se(){if(K.currentSubStatus){if(K.currentCaseType==="lm")K.removeField("ON_CALL");else{let d=Me[K.currentSubStatus];d&&d.templateFields.includes("ON_CALL")&&K.addFieldAt("ON_CALL",1)}K.isPortugalCase?(K.addFieldAt("CASO_PORTUGAL",1),K.addFieldAt("CONSENTIU_GRAVACAO",2)):(K.removeField("CASO_PORTUGAL"),K.removeField("CONSENTIU_GRAVACAO"))}}function X(){K.reset(),l.reset(),r.reset(),E(),Ye.clearEmergency(),a.querySelectorAll("select").forEach(x=>x.value=""),a.querySelector("#sub-status-select").disabled=!0;let d=document.getElementById("email-automation-toggle-row");d&&(d.style.display="none"),A.innerHTML="",c.style.display="none",_.style.display="flex",_.style.opacity="1",b.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),l.selectionElement.style.display="none",l.screenshotsElement.style.display="none",f.style.display="none",g["evidence-l1"]&&(g["evidence-l1"].value=""),g["evidence-l2"]&&(g["evidence-l2"].value=""),g["evidence-msg"]&&(g["evidence-msg"].value="")}async function ce(d=!1){let x={};A.querySelectorAll("input, textarea, select").forEach(Z=>{(Z.id.startsWith("field-")||Z.id==="consent-select")&&(x[Z.id]=Z.value)});let h="Cliente",$="---";if(!d)try{let Z=await tt();h=Z.advertiserName,$=Z.cid}catch(Z){console.warn("Erro ao coletar pageData:",Z)}let P=l.getCheckedElements().map(Z=>({key:Z.value,count:Z.count})),oe=P.map(Z=>{let ge=Fe[Z.key];return ge?ge.name:Z.key});return{currentCaseType:K.currentCaseType,currentLang:K.currentLang,isPortugalCase:K.isPortugalCase,consent:K.consent,tagSupportUsed:K.tagSupportUsed,forcedScreenshots:[...K.forcedScreenshots],activeFields:K.activeFields,status:K.currentStatus,subStatus:K.currentSubStatus,formData:x,activeTasks:P,summaryTags:oe,clientName:h,cid:$,timestamp:new Date().toISOString()}}let q=d=>new Promise(x=>setTimeout(x,d));async function j(d){K.setCaseType(d.currentCaseType||"bau"),K.setPortugalCase(d.isPortugalCase||!1),K.setConsent(d.consent||!1),d.activeFields&&K.setActiveFields(d.activeFields);let x=a.querySelector(`#type-selector button[data-type="${K.currentCaseType}"]`);x&&x.classList.add("active"),a.querySelectorAll("#type-selector button").forEach($=>{$!==x&&$.classList.remove("active")});let h=a.querySelector(`#portugal-selector button[data-val="${K.isPortugalCase}"]`);if(h&&h.classList.add("active"),a.querySelectorAll("#portugal-selector button").forEach($=>{$!==h&&$.classList.remove("active")}),d.status){let $=a.querySelector("#main-status-select");$.value=d.status,K.setStatus(d.status);let P=a.querySelector("#sub-status-select");if(ie(d.status,P),await q(50),d.subStatus){if(P.value=d.subStatus,K.setSubStatus(d.subStatus),Y(d.subStatus),await q(100),d.tagSupportUsed!==void 0){K.setTagSupportUsed(d.tagSupportUsed);let oe=r.element.querySelector('input[value="Sim"]'),Z=r.element.querySelector('input[value="N\xE3o"]');d.tagSupportUsed&&oe?oe.checked=!0:Z&&(Z.checked=!0),r.element.querySelector("div:last-child").style.display=d.tagSupportUsed?"none":"block"}d.forcedScreenshots&&K.setForcedScreenshots(d.forcedScreenshots);for(let oe in d.formData){let Z=document.getElementById(oe);Z&&(Z.value=d.formData[oe],K.updateField(oe,Z.value))}d.activeTasks&&(d.activeTasks.forEach(oe=>l.setTaskCount(oe.key,oe.count)),K.setActiveTasks(l.getCheckedElements()))}}K.isDirty=!1}async function ae(d){let x=d&&d.payload;if(!x||!x.subStatus)return{ok:!1,reason:"invalid"};let h=x.scenarios||[],$=h.map(ke=>fo(ke)),P=h.filter((ke,Ge)=>!$[Ge]);if(K.isDirty&&!await De(s("substituir_rascunho_confirm")))return{ok:!1,reason:"cancelled"};let oe=K.visible;if(oe||T(),X(),oe||await q(550),x.caseType&&x.caseType!==K.currentCaseType){let ke=a.querySelector(`#type-selector button[data-type="${x.caseType}"]`);ke&&ke.click(),await q(60)}let Z=a.querySelector("#main-status-select"),ge=a.querySelector("#sub-status-select"),ye=x.status||String(x.subStatus).split("_")[0];Z.value=ye,K.setStatus(ye),ie(ye,ge),await q(60),ge.value=x.subStatus,K.setSubStatus(x.subStatus),Y(x.subStatus),await q(160);for(let ke of $.filter(Boolean)){let Ge=c.querySelector(`[data-id="${ke}"]`);Ge&&Ge.click()}await q(120),P.length?(v.playError(),te(s("atalho_cenario_sumiu"),{error:!0})):v.playSuccess();let be=D();return be&&jo(be),{ok:!0,missing:P.map(ke=>ke.id)}}function D(){let d=a.querySelectorAll('input[id^="field-"], textarea[id^="field-"], input[id^="evidence-"]');for(let x of d)if(x.offsetParent!==null&&!String(x.value||"").trim())return x;return null}async function U(){let d=ne();if(!d){v.playError(),te(s("select_substatus"),{error:!0});return}if(Le.listRaw().length>=xt){v.playError(),te(s("atalho_limite").replace("{max}",xt),{error:!0});return}let x=Me[d.payload.subStatus]?.name||d.payload.subStatus,h=await va(s("atalho_nome_pergunta"),x);if(h!==null){p.disabled=!0,p.style.opacity="0.6";try{let $=await Le.save({...d,id:ma(),label:String(h).trim()||x});if(!$.ok){v.playError(),te(s("atalho_limite").replace("{max}",xt),{error:!0});return}v.playSuccess(),te($.synced?s("atalho_salvo"):s("atalho_salvo_local"))}finally{p.disabled=!1,p.style.opacity=""}}}function ne(){if(!K.currentSubStatus)return null;let d=m.getSelectedIds?m.getSelectedIds():[];return{kind:"note",payload:{caseType:K.currentCaseType,status:K.currentStatus,subStatus:K.currentSubStatus,scenarios:d.map(x=>({id:x,substatus:K.currentSubStatus}))}}}function s(d){return Je[K.currentLang]?.[d]||Je.pt?.[d]||d}function y(){let d=document.createElement("div");return d.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',d.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",d.onclick=x=>{x.stopPropagation(),R()},d.title="Alternar para Split & Transfer",d}function L(){let d=document.createElement("div");return d.id="notes-empty-state",d.style.cssText=`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${ve};
        `,d.innerHTML=`
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
                <div style="font-family: 'Google Sans', sans-serif; font-size: 16px; font-weight: 600; color: ${V.text}; margin-bottom: 4px;">
                    ${s("pronto_comecar")||"Pronto para come\xE7ar?"}
                </div>
                <div style="font-size: 13px; color: ${V.textSub}; line-height: 1.6; opacity: 0.8;">
                    ${s("selecione_status_ajuda")||"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica."}
                </div>
            </div>
        `,d}function J(d){let x=a.querySelector(".js-label-fluxo");x&&(x.textContent=s("fluxo"));let h=a.querySelector(".js-label-portugal");h&&(h.textContent=s("caso_portugal"));let $=a.querySelectorAll("#portugal-selector button");$.length===2&&($[0].textContent=s("nao"),$[1].textContent=s("sim"));let P=a.querySelector(".js-label-status");P&&(P.textContent=s("status_principal"));let oe=a.querySelector(".js-label-substatus");oe&&(oe.textContent=s("substatus"));let Z=a.querySelector(".js-btn-copy");Z&&(Z.textContent=s("copiar"));let ge=a.querySelector(".js-btn-generate");ge&&(ge.textContent=s("preencher"));let ye=a.querySelector(".js-btn-reset");ye&&(ye.textContent=s("limpar"));let be=document.getElementById("manual-task-toggle");be&&(be.textContent=s("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let ke=a.querySelector(".js-btn-park span");ke&&(ke.textContent=s("guardar")),u.textContent=s("evidencias_contato");let Ge=f.querySelector('label[for="evidence-l1"]');Ge&&(Ge.textContent=s("ligacao_1"));let rt=f.querySelector('label[for="evidence-l2"]');rt&&(rt.textContent=s("ligacao_2"));let bt=f.querySelector('label[for="evidence-msg"]');bt&&(bt.textContent=s("mensagem_am"));let St=t.querySelector(".js-drawer-title");St&&(St.textContent=s("rascunhos_salvos"));let Wt=t.querySelector(".js-history-btn");Wt&&(Wt.title=s("meus_rascunhos"));let _o=a.querySelector(".js-label-email-toggle");_o&&(_o.textContent=s("preencher_email_automaticamente")),p.innerHTML=`${ui}<span>${s("salvar_como_atalho")}</span>`,r&&r.setLanguage&&r.setLanguage(s),l&&l.setLanguage&&l.setLanguage(s)}return _.style.display="flex",b.style.display="none",K.setLanguage(de()),K.setCaseType("bau"),Ae(d=>{K.setLanguage(d);let x=t.querySelector(".cw-help-description");x&&(x.textContent=na[d]||na.pt),K.currentSubStatus&&Y(K.currentSubStatus)}),E(),setTimeout(async()=>{let d=Ye.getEmergency();d&&(await De(s("restaurar_rascunho_confirm"))?(j(d),te("Sess\xE3o restaurada!")):Ye.clearEmergency())},3e3),document.body.appendChild(t),Ca(()=>l.refreshCatalog()),qn().then(d=>{d&&K.currentSubStatus&&(m.render&&m.render(K.currentSubStatus,K.currentCaseType),la(K.currentSubStatus,A,K))}),T.openWithPreset=ae,T}var Ma=[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",category:"Tentativas & Agendamento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",placeholders:[{key:"[Seu Nome]",label:"Seu Nome",type:"text",auto:"agentName"},{key:"[INSERIR URL]",label:"URL do Site",type:"text"},{key:"[LINK DO MEET]",label:"Link da Reuni\xE3o",type:"text"}],template:"<p>Ol\xE1,</p><br><p>Aqui \xE9 o <strong>[Seu Nome]</strong> da equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tentei ligar no seguinte n\xFAmero: <strong>...</strong> sem sucesso, teria outro n\xFAmero para que eu pudesse entrar em contato?</p><br><p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>Em seu site: <strong>[INSERIR URL]</strong></p><p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, voc\xEA pode acessar o link da nossa reuni\xE3o: <strong>[LINK DO MEET]</strong></p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"reschedule2",name:"Proposta de Reagendamento",category:"Tentativas & Agendamento",subject:"Reagendamento de Consultoria",placeholders:[{key:"[DATA 1]",label:"Data 1",type:"text"},{key:"[HORA 1]",label:"Hora 1",type:"text"},{key:"[DATA 2]",label:"Data 2",type:"text"},{key:"[HORA 2]",label:"Hora 2",type:"text"},{key:"[DATA 3]",label:"Data 3",type:"text"},{key:"[HORA 3]",label:"Hora 3",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p><ul><li><strong>[DATA 1] \xE0s [HORA 1]</strong></li><li><strong>[DATA 2] \xE0s [HORA 2]</strong></li><li><strong>[DATA 3] \xE0s [HORA 3]</strong></li></ul><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email nas pr\xF3ximas 48 horas o caso ser\xE1 encerrado.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"max_reschedules",name:"Limite de Reagendamentos Excedido",category:"Tentativas & Agendamento",subject:"Status do Agendamento - Time de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este e-mail o encontre bem.</p><p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementa\xE7\xE3o das tags.</p><br><p>Infelizmente, <strong>n\xE3o podemos mais reagendar este caso espec\xEDfico</strong>, pois excedemos o limite m\xE1ximo de agendamentos permitido.</p><br><p>Se voc\xEA deseja prosseguir com a implementa\xE7\xE3o das tags, ser\xE1 necess\xE1rio abrir um <strong>novo caso</strong> diretamente com a <a href="https://support.google.com/google-ads">Ajuda do Google Ads</a>. Isso garantir\xE1 que voc\xEA receba o acompanhamento e o suporte necess\xE1rio para dar continuidade \xE0 sua solicita\xE7\xE3o.</p><br><p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colabora\xE7\xE3o.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"2_6_day3",name:"Dia 3 (Acompanhamento)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]",label:"A\xE7\xE3o Pendente",type:"text"},{key:"[MM/DD/YYYY]",label:"Data do Pr\xF3ximo Contato",type:"date"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Tentamos contato atrav\xE9s do N\xFAmero de Telefone, por\xE9m sem sucesso. Gostaria de saber se voc\xEA j\xE1 conseguiu <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, ou se voc\xEA j\xE1 possui uma previs\xE3o de quando essa a\xE7\xE3o ser\xE1 conclu\xEDda.</p><br><p>Continuarei monitorando o status da implementa\xE7\xE3o no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementa\xE7\xE3o.</p><p>Se voc\xEA tiver algum problema ou d\xFAvidas que impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_day6",name:"Dia 6 (Acompanhamento Final)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[URL]",label:"URL do Site",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Ap\xF3s an\xE1lise e revis\xE3o do status de implementa\xE7\xE3o da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda est\xE1 com a implementa\xE7\xE3o pendente. Tentamos contato atrav\xE9s do email, por\xE9m sem sucesso.</p><br><p>\xC9 essencial que seja implementado, pois ele oferece uma ampla gama de benef\xEDcios, como:</p><ul><li>Ajuda a rastrear convers\xF5es em tempo real</li><li>Melhora a gera\xE7\xE3o de receita, em termos de cliques</li><li>Serve para vincular o Google Analytics e os an\xFAncios e acompanhar convers\xF5es</li><li>Fornece informa\xE7\xF5es sobre a experi\xEAncia do usu\xE1rio</li></ul><br><p>Se voc\xEA tiver algum problema ou d\xFAvidas que o impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco. Teremos o maior prazer em ajudar.</p><p>Caso n\xE3o tenhamos nenhuma resposta nos pr\xF3ximos 3 dias, infelizmente o caso ser\xE1 encerrado.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_completed_reschedule",name:"A\xE7\xF5es Conclu\xEDdas (Solicitar Reagendamento)",category:"Follow Up",subject:"Continuidade da Implementa\xE7\xE3o - Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Disponibilidade em BAU]",label:"Pr\xF3xima Disponibilidade",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Maravilha! Muito bom saber que conseguiu concluir as a\xE7\xF5es pendentes. Sendo assim, agora podemos continuar com a implementa\xE7\xE3o das configura\xE7\xF5es em sua conta.</p><br><p>Para isso, pe\xE7o, por favor, que me envie algumas das pr\xF3ximas datas e hor\xE1rios em que est\xE1 dispon\xEDvel a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p><p>Assim que me enviar essa informa\xE7\xE3o, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"nrp_standard",name:"NRP - Padr\xE3o (3\xAA Tentativa)",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Task pedida pelo AM]",label:"Task Solicitada",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reuni\xE3o.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"nrp_dfa",name:"NRP - DFA",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'}],Oa={attempt_10min:{name:"Intento de Contacto (Antes de los 10min)",category:"Intentos y Programaci\xF3n",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Intento de Contacto",labels:{"[Seu Nome]":"Tu Nombre","[INSERIR URL]":"URL del Sitio","[LINK DO MEET]":"Enlace de la Reuni\xF3n"},template:"<p>Hola,</p><br><p>Le habla <strong>[Seu Nome]</strong> del equipo de Soluciones T\xE9cnicas de Google. Intent\xE9 llamar al siguiente n\xFAmero: <strong>...</strong> sin \xE9xito, \xBFtendr\xEDa otro n\xFAmero para que pueda ponerme en contacto?</p><br><p>Le recuerdo que voy a ayudarle a implementar la siguiente tarea:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>En su sitio: <strong>[INSERIR URL]</strong></p><p>Intentar\xE9 llamar nuevamente en 10 minutos; si lo prefiere, puede acceder al enlace de nuestra reuni\xF3n: <strong>[LINK DO MEET]</strong></p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},reschedule2:{name:"Propuesta de Reprogramaci\xF3n",category:"Intentos y Programaci\xF3n",subject:"Reprogramaci\xF3n de Consultor\xEDa",labels:{"[DATA 1]":"Fecha 1","[HORA 1]":"Hora 1","[DATA 2]":"Fecha 2","[HORA 2]":"Hora 2","[DATA 3]":"Fecha 3","[HORA 3]":"Hora 3","[Seu Nome]":"Firma"},template:"<p>Hola, \xBFc\xF3mo est\xE1?</p><br><p>Estas son las pr\xF3ximas fechas disponibles:</p><ul><li><strong>[DATA 1] a las [HORA 1]</strong></li><li><strong>[DATA 2] a las [HORA 2]</strong></li><li><strong>[DATA 3] a las [HORA 3]</strong></li></ul><br><p>Tambi\xE9n le informo que si no hay respuesta a este correo en las pr\xF3ximas 48 horas el caso ser\xE1 cerrado.</p><p>Le recuerdo que mi agenda es din\xE1mica, por lo que en cualquier momento se puede agendar una consultor\xEDa para los d\xEDas disponibles. Por lo tanto, cuanto m\xE1s r\xE1pido pueda responderme, m\xE1s garantizada ser\xE1 la programaci\xF3n de la fecha y el horario.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},max_reschedules:{name:"L\xEDmite de Reprogramaciones Excedido",category:"Intentos y Programaci\xF3n",subject:"Estado de la Programaci\xF3n - Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este correo le encuentre bien.</p><p>Le escribo en nombre del equipo de Google Ads para informarle sobre su solicitud de reprogramaci\xF3n para la implementaci\xF3n de las etiquetas.</p><br><p>Lamentablemente, <strong>ya no podemos reprogramar este caso espec\xEDfico</strong>, pues hemos excedido el l\xEDmite m\xE1ximo de programaciones permitido.</p><br><p>Si desea continuar con la implementaci\xF3n de las etiquetas, ser\xE1 necesario abrir un <strong>nuevo caso</strong> directamente con la <a href="https://support.google.com/google-ads">Ayuda de Google Ads</a>. Esto garantizar\xE1 que reciba el seguimiento y el soporte necesarios para dar continuidad a su solicitud.</p><br><p>Agradecemos su participaci\xF3n en este proceso y la oportunidad de ayudar. Esperamos continuar nuestra colaboraci\xF3n.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'},"2_6_day3":{name:"D\xEDa 3 (Seguimiento)",category:"Follow Up",subject:"Consultor\xEDa con el Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]":"Acci\xF3n Pendiente","[MM/DD/YYYY]":"Fecha del Pr\xF3ximo Contacto","[Seu Nome]":"Firma"},template:"<p>Hola, <strong>[Nome do Cliente]</strong></p><br><p>\xA1Espero que se encuentre bien!</p><p>Intentamos contactarle por tel\xE9fono, pero sin \xE9xito. Me gustar\xEDa saber si ya pudo <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, o si ya tiene una previsi\xF3n de cu\xE1ndo se concluir\xE1 esa acci\xF3n.</p><br><p>Continuar\xE9 monitoreando el estado de la implementaci\xF3n en su sitio, y el d\xEDa <strong>[MM/DD/YYYY]</strong> har\xE9 un nuevo seguimiento para verificar el avance de la implementaci\xF3n.</p><p>Si tiene alg\xFAn problema o duda que le impida realizar la implementaci\xF3n, no dude en compartirlo con nosotros.</p><br><p>Quedo a disposici\xF3n.</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>"},"2_6_day6":{name:"D\xEDa 6 (Seguimiento Final)",category:"Follow Up",subject:"Consultor\xEDa con el Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[URL]":"URL del Sitio","[Seu Nome]":"Firma"},template:"<p>Hola, <strong>[Nome do Cliente]</strong></p><br><p>\xA1Espero que se encuentre bien!</p><p>Tras analizar y revisar el estado de implementaci\xF3n de la etiqueta en su sitio, <strong>[URL]</strong>, verificamos que la etiqueta a\xFAn est\xE1 pendiente de implementaci\xF3n. Intentamos contactarle por correo, pero sin \xE9xito.</p><br><p>Es esencial que sea implementada, pues ofrece una amplia gama de beneficios, como:</p><ul><li>Ayuda a rastrear conversiones en tiempo real</li><li>Mejora la generaci\xF3n de ingresos, en t\xE9rminos de clics</li><li>Sirve para vincular Google Analytics con los anuncios y hacer seguimiento de las conversiones</li><li>Proporciona informaci\xF3n sobre la experiencia del usuario</li></ul><br><p>Si tiene alg\xFAn problema o duda que le impida realizar la implementaci\xF3n, no dude en compartirlo con nosotros. Estaremos encantados de ayudar.</p><p>Si no recibimos ninguna respuesta en los pr\xF3ximos 3 d\xEDas, lamentablemente el caso ser\xE1 cerrado.</p><br><p>Quedo a disposici\xF3n.</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>"},"2_6_completed_reschedule":{name:"Acciones Concluidas (Solicitar Reprogramaci\xF3n)",category:"Follow Up",subject:"Continuidad de la Implementaci\xF3n - Soluciones T\xE9cnicas de Google",labels:{"[Disponibilidade em BAU]":"Pr\xF3xima Disponibilidad","[Seu Nome]":"Firma"},template:"<p>Hola, \xBFc\xF3mo est\xE1?</p><br><p>\xA1Excelente! Muy bueno saber que logr\xF3 concluir las acciones pendientes. Siendo as\xED, ahora podemos continuar con la implementaci\xF3n de las configuraciones en su cuenta.</p><br><p>Para eso, le pido, por favor, que me env\xEDe algunas de las pr\xF3ximas fechas y horarios en los que est\xE9 disponible a partir del d\xEDa <strong>[Disponibilidade em BAU]</strong>.</p><p>En cuanto me env\xEDe esa informaci\xF3n, crear\xE9 una reprogramaci\xF3n para que uno de nuestros agentes contin\xFAe ayud\xE1ndole.</p><br><p>Tambi\xE9n le informo que si no hay respuesta a este correo, realizar\xE9 un seguimiento de este caso durante 6 d\xEDas, en el que me pondr\xE9 en contacto cada 3 d\xEDas para intentar reprogramar su caso lo antes posible.</p><p>Le recuerdo que mi agenda es din\xE1mica, por lo que en cualquier momento se puede agendar una consultor\xEDa para los d\xEDas disponibles. Por lo tanto, cuanto m\xE1s r\xE1pido pueda responderme, m\xE1s garantizada ser\xE1 la programaci\xF3n de la fecha y el horario.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},nrp_standard:{name:"NRP - Est\xE1ndar (3.\xBA Intento)",category:"NRP / Cierre",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Cierre",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Task pedida pelo AM]":"Tarea Solicitada","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Intentamos llamarle hoy sobre el caso de Implementaci\xF3n de la etiqueta referente a la solicitud de <strong>[Task pedida pelo AM]</strong>. Se hizo otro intento despu\xE9s de 10 minutos, pero tampoco logramos contactarle.</p><p>Debido a la alta demanda, no podemos reprogramar un horario. Por eso, vamos a cerrar este caso. Sin embargo, si a\xFAn desea continuar con la implementaci\xF3n, basta con acceder a este enlace y elegir la mejor fecha y horario para hablar con nuestro equipo, o si lo prefiere, p\xF3ngase en contacto con su gerente de cuentas de Google para agendar una nueva reuni\xF3n.</p><p>Lamentamos el inconveniente y esperamos trabajar con usted nuevamente en el futuro.</p><br><p>Si desea saber m\xE1s, consulte a continuaci\xF3n algunos enlaces \xFAtiles con recursos valiosos relacionados con la implementaci\xF3n de etiquetas y el soporte de Shopping.</p><p><strong>En relaci\xF3n con las etiquetas</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Soporte para la implementaci\xF3n de etiquetas</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>En relaci\xF3n con Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">C\xF3mo configurar la cuenta y el feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Optimizaci\xF3n del feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'},nrp_dfa:{name:"NRP - DFA",category:"NRP / Cierre",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Cierre",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Intentamos llamarle hoy sobre el caso de Implementaci\xF3n de la etiqueta referente a la solicitud. Se hizo otro intento despu\xE9s de 10 minutos, pero tampoco logramos contactarle.</p><p>Debido a la alta demanda, no podemos reprogramar un horario. Por eso, vamos a cerrar este caso. Sin embargo, si a\xFAn desea continuar con la implementaci\xF3n, basta con acceder a este enlace y elegir la mejor fecha y horario para hablar con nuestro equipo.</p><p>Lamentamos el inconveniente y esperamos trabajar con usted nuevamente en el futuro.</p><br><p>Si desea saber m\xE1s, consulte a continuaci\xF3n algunos enlaces \xFAtiles con recursos valiosos relacionados con la implementaci\xF3n de etiquetas y el soporte de Shopping.</p><p><strong>En relaci\xF3n con las etiquetas</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Soporte para la implementaci\xF3n de etiquetas</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>En relaci\xF3n con Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">C\xF3mo configurar la cuenta y el feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Optimizaci\xF3n del feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'}};function bi(e,t){if(t!=="es")return e;let a=Oa[e?.id];return a?{...e,name:a.name??e.name,category:a.category??e.category,subject:a.subject??e.subject,template:a.template??e.template,placeholders:(e.placeholders||[]).map(o=>({...o,label:a.labels?.[o.key]??o.label}))}:e}function gi(e){if(!Array.isArray(e)||!e.length)return!1;let t=e.slice().sort((i,n)=>(i.sortOrder||0)-(n.sortOrder||0)),a=[],o={};for(let i of t){let n=i.key;if(!n)continue;let r;try{r=JSON.parse(i.value||"{}")}catch{continue}!r.subject||!r.template||(String(i.lang).toUpperCase()==="ES"?o[n]={name:i.label||"",category:i.field||"",subject:r.subject,template:r.template,labels:r.labels||{}}:a.push({id:n,name:i.label||n,category:i.field||"",subject:r.subject,template:r.template,placeholders:r.placeholders||[]}))}if(!a.length)return!1;Ma.length=0,Ma.push(...a);for(let i of Object.keys(Oa))delete Oa[i];return Object.assign(Oa,o),!0}async function fi(){let e=me.getCachedContent("email_template"),t=gi(e);try{let a=await me.fetchContentModule("email_template");t=gi(a)||t}catch(a){console.warn("Central de Conte\xFAdo indispon\xEDvel; usando modelos embutidos.",a)}return t}var hi={_templates:null,_hydrated:!1,async getTemplates(){return this._templates?this._templates:(this._hydrated||(this._hydrated=!0,await fi()),this._templates=Ma,this._templates)}};var xi="cw_personal_library_v1",Ht=!1,He={getSnippets:(e="all")=>{let t=He._loadFromLocal(),a=Ie();return a&&a.includes("@")&&!Ht&&He._syncWithServer(a),e==="all"?t:t.filter(o=>o.type===e)},save:async e=>{let t=Ie();if(!t)return v.playError(),te("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;Ht=!0;let a=He._loadFromLocal(),o=new Date().toISOString(),i={id:e.id||"local_"+Date.now(),type:e.type||"general",title:e.title||"Sem t\xEDtulo",content:e.content||"",subject:e.subject||"",isCode:e.isCode||!1,isRich:e.isRich||!1,updated:o,_pendingSync:!0},n=a.filter(c=>c.id!==i.id);n.unshift(i),He._saveToLocal(n);let r=!1;try{r=await me.saveSnippet(i,t),r?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais.")}catch(c){console.error("Erro na nuvem:",c)}finally{setTimeout(()=>{Ht=!1},2e3)}i._pendingSync=!r;let l=He._loadFromLocal().filter(c=>c.id!==i.id);return l.unshift(i),He._saveToLocal(l),{...i,synced:r}},delete:async e=>{let t=Ie();Ht=!0;let o=He._loadFromLocal().filter(i=>i.id!==e);return He._saveToLocal(o),t?me.deleteSnippet(e,t).then(()=>{setTimeout(()=>{Ht=!1},2e3)}):Ht=!1,!0},_syncWithServer:async e=>{if(window._cw_library_syncing)return;window._cw_library_syncing=!0,setTimeout(()=>{window._cw_library_syncing=!1},3e4),console.log("\u{1F504} Sincronizando biblioteca...");let t=await me.getUserSnippets(e);if(t&&t.status==="success"&&Array.isArray(t.snippets)){let a=t.snippets,o=He._loadFromLocal(),n=[...o.filter(c=>c._pendingSync),...a],r=JSON.stringify(n),l=JSON.stringify(o);r!==l&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),He._saveToLocal(n))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(xi)||"[]")}catch{return[]}},_saveToLocal:e=>{localStorage.setItem(xi,JSON.stringify(e))}};var vi={pt:{headerTitle:"Email Assistant",headerDesc:"Refatora\xE7\xE3o completa do m\xF3dulo de e-mail para uma experi\xEAncia moderna e eficiente.",searchPlaceholder:"Buscar templates...",previewTitle:"Preview do E-mail",noSubject:"Sem Assunto",emailCopiedToast:"E-mail copiado com sucesso!",copyErrorToast:"Erro ao copiar e-mail",fillErrorToast:"Erro ao preencher e-mail",smartCrErrorToast:"Erro ao aplicar Smart CR"},es:{headerTitle:"Email Assistant",headerDesc:"Refactorizaci\xF3n completa del m\xF3dulo de email para una experiencia moderna y eficiente.",searchPlaceholder:"Buscar plantillas...",previewTitle:"Vista Previa del Email",noSubject:"Sin Asunto",emailCopiedToast:"\xA1Email copiado con \xE9xito!",copyErrorToast:"Error al copiar el email",fillErrorToast:"Error al completar el email",smartCrErrorToast:"Error al aplicar Smart CR"}};function Qe(e){let t=de();return vi[t]?.[e]??vi.pt[e]}var Se={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",warning:"#E67E22",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"};function Ls(){if(document.getElementById("cw-email-styles"))return;let e=document.createElement("style");e.id="cw-email-styles",e.textContent=`
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
        .cw-email-main { display: flex; flex: 1; overflow: hidden; background-color: ${Se.bgApp}; }

        /* --- PAINEL ESQUERDO --- */
        .cw-email-left-panel { width: 320px; background-color: #EFEFF0; border-right: 1px solid ${Se.borderSubtle}; display: flex; flex-direction: column; flex-shrink: 0; }
        .cw-email-search-container { padding: 16px; border-bottom: 1px solid ${Se.borderSubtle}; position: relative; }
        .cw-email-search-input {
            width: 100%; box-sizing: border-box; padding: 10px 14px 10px 36px;
            border-radius: 10px; border: 1.5px solid transparent; background-color: #E3E3E8;
            font-size: 15px; outline: none; color: ${Se.textPrimary};
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238A8A8E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
            background-repeat: no-repeat; background-position: 12px center;
            transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
        }
        .cw-email-search-input:focus {
            background-color: #FFFFFF; border-color: ${Se.primary};
            box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1); transform: scale(1.02);
        }
        .cw-email-clear-btn {
            position: absolute; right: 26px; top: 50%; transform: translateY(-50%);
            font-size: 10px; color: #fff; cursor: pointer; display: none;
            background-color: #C7C7CC; width: 16px; height: 16px; border-radius: 50%;
            text-align: center; line-height: 16px; font-weight: bold;
        }

        #email-template-list { flex: 1; overflow-y: auto; padding: 8px; scroll-behavior: smooth; }

        .cw-email-list-empty { padding: 40px 20px; text-align: center; color: ${Se.textSecondary}; opacity: 0.6; }
        .cw-email-list-empty-icon { font-size: 32px; margin-bottom: 12px; }
        .cw-email-list-empty-text { font-size: 14px; font-weight: 500; }

        .cw-email-cat-header {
            padding: 12px 16px 12px 24px; font-size: 11px; font-weight: 700; color: ${Se.textSecondary};
            text-transform: uppercase; letter-spacing: 0.8px; position: sticky; top: -8px;
            background-color: rgba(239, 239, 240, 0.9); z-index: 10; backdrop-filter: blur(20px);
            margin: 0 -8px 8px -8px; border-bottom: 0.5px solid ${Se.borderSubtle};
            cursor: pointer; display: flex; align-items: center; justify-content: space-between;
            user-select: none; transition: background-color 0.2s ease;
        }
        .cw-email-cat-header:hover { background-color: rgba(230, 230, 232, 0.9); }
        .cw-email-cat-header:focus-visible, .cw-email-list-item:focus-visible { outline: 2px solid ${Se.primary}; outline-offset: -2px; }
        .cw-email-cat-right { display: flex; align-items: center; }
        .cw-email-cat-badge { background-color: rgba(0, 0, 0, 0.05); padding: 2px 8px; border-radius: 10px; font-size: 10px; color: ${Se.textSecondary}; }
        .cw-email-cat-arrow { margin-left: 8px; transition: transform 0.3s ease; }

        .cw-email-list-item {
            padding: 12px 14px; font-size: 14px; cursor: pointer;
            transition: background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1), transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s cubic-bezier(0.25, 1, 0.5, 1), color 0.3s cubic-bezier(0.25, 1, 0.5, 1); border-radius: 10px;
            color: ${Se.textPrimary}; margin: 4px 6px; display: flex; align-items: center; gap: 12px;
            background-color: ${Se.bgSurface}; box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            border: 1px solid ${Se.borderSubtle}; position: relative; overflow: hidden;
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
            background-color: ${Se.primary}; box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
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
        .cw-email-right-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; background-color: ${Se.bgApp}; transition: opacity 0.15s ease, transform 0.15s ease; }
        .cw-email-fields-section { padding: 20px; border-bottom: 1px solid ${Se.borderSubtle}; background-color: ${Se.bgSurface}; max-height: 250px; overflow-y: auto; display: none; }
        .cw-email-fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .cw-email-field-label { display: block; font-size: 11px; font-weight: 700; color: ${Se.textSecondary}; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-email-field-input {
            width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px;
            border: 1.5px solid ${Se.borderSubtle}; background-color: #FBFBFD; font-size: 14px;
            transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease; outline: none;
        }
        .cw-email-field-input:focus { border-color: ${Se.primary}; background-color: #FFFFFF; box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1); }

        .cw-email-smartcr-hint {
            padding: 12px; font-size: 13px; color: #856404; background: #FFF3CD; border: 1px solid #FFEEBA;
            border-radius: 8px; display: flex; align-items: center; gap: 8px;
        }
        .cw-email-smartcr-hint-icon { font-size: 18px; }

        .cw-email-preview-section { flex: 1; display: flex; flex-direction: column; padding: 20px; background-color: ${Se.bgApp}; overflow: hidden; }
        .cw-email-preview-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .cw-email-preview-title { font-size: 12px; font-weight: 600; color: ${Se.textSecondary}; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-email-preview-actions { display: flex; gap: 8px; }
        .cw-email-preview-content {
            flex: 1; background-color: ${Se.bgSurface}; border: 1px solid ${Se.borderSubtle};
            border-radius: 8px; padding: 20px; font-size: 15px; line-height: 1.6; color: ${Se.textPrimary};
            overflow-y: auto; outline: none; box-shadow: inset 0 1px 2px rgba(0,0,0,0.02);
        }

        /* --- BOT\xD5ES DE A\xC7\xC3O --- */
        .cw-email-btn {
            padding: 8px 14px; border-radius: 10px; border: 1.5px solid ${Se.primary};
            background: transparent; color: ${Se.primary}; font-size: 13px; font-weight: 600;
            cursor: pointer; transition: background-color 0.2s cubic-bezier(0.25, 1, 0.5, 1), transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .cw-email-btn:hover { background-color: rgba(0, 122, 255, 0.05); }
        .cw-email-btn:active { transform: scale(0.94); }
        .cw-email-btn.primary {
            border: none; background: ${Se.primary}; color: #fff;
            box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }
        .cw-email-btn.primary:hover { background-color: #0062CC; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0, 122, 255, 0.4); }
        .cw-email-btn.warning { border-color: ${Se.warning}; color: ${Se.warning}; display: none; }
        .cw-email-btn.warning:hover { background-color: rgba(230, 126, 34, 0.08); }

        @media (prefers-reduced-motion: reduce) {
            .cw-animate-float { animation: none !important; }
            .cw-email-search-input, .cw-email-list-item, .cw-email-btn, .cw-email-right-panel {
                transition: opacity 0.15s ease, background-color 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}function Ns(e,t){return e.map(a=>bi(a,de())).filter(a=>a.name.toLowerCase().includes(t.toLowerCase())||a.category.toLowerCase().includes(t.toLowerCase()))}function Is(e){return Object.entries(Pt).filter(([t,a])=>a&&(t.toLowerCase().includes(e.toLowerCase())||a.toLowerCase().includes(e.toLowerCase()))).map(([t,a])=>({id:t,name:t.replace(/_/g," "),category:"\u26A1 Smart CRs",code:a,isSmartCR:!0}))}function _s(e){return He.getSnippets("email").filter(t=>t.title.toLowerCase().includes(e.toLowerCase())||t.subject&&t.subject.toLowerCase().includes(e.toLowerCase())).map(t=>{let a=[],o=t.content.match(/\[([^\]]+)\]/g);return o&&[...new Set(o)].forEach(i=>{a.push({key:i,label:i.replace("[","").replace("]",""),type:i.toLowerCase().includes("data")?"date":"text",auto:i.toLowerCase().includes("nome")&&i.toLowerCase().includes("seu")?"agentName":null})}),{id:t.id||`snippet-${Math.random()}`,name:t.title,category:"\u{1F464} Pessoal",subject:t.subject||Qe("noSubject"),template:t.content,placeholders:a}})}function Os(e,t){return[...Ns(e,t),...Is(t),..._s(t)]}function yi(){let e="v6.0.0",t=!1,a=[],o=null,i="",n=new Set;Ls();let r=document.createElement("div");r.id="email-assistant-popup",r.classList.add("cw-module-window","cw-email-popup"),Object.assign(r.style,We,{width:"850px",height:"650px"}),r.style.display="none",r.style.flexDirection="column";let l=Pe(r,Qe("headerTitle"),e,Qe("headerDesc"),{popup:r},()=>E()),c=document.createElement("div");c.className="cw-email-main";let m=document.createElement("div");m.className="cw-email-left-panel";let p=document.createElement("div");p.className="cw-email-search-container";let f=document.createElement("input");f.className="cw-email-search-input",f.placeholder=Qe("searchPlaceholder");let u=document.createElement("div");u.id="email-template-list",ba(u,".cw-email-cat-header, .cw-email-list-item");let g=document.createElement("div");g.className="cw-email-clear-btn",g.innerHTML="\u2715",g.onclick=()=>{f.value="",i="",g.style.display="none",z(),f.focus()},p.appendChild(f),p.appendChild(g),m.appendChild(p),m.appendChild(u);let k=document.createElement("div");k.className="cw-email-right-panel";let w=document.createElement("div");w.className="cw-email-fields-section";let S=document.createElement("div");S.className="cw-email-preview-section";let I=document.createElement("div");I.className="cw-email-preview-header";let A=document.createElement("span");A.textContent=Qe("previewTitle"),A.className="cw-email-preview-title";let _=document.createElement("div");_.className="cw-email-preview-actions";let b=(W,le=!1)=>{let O=document.createElement("button");return O.textContent=W,O.className="cw-email-btn"+(le?" primary":""),O},M=b("Copiar HTML"),F=b("Preencher no CRM",!0),H=b("Smart CR");H.classList.add("warning"),_.appendChild(H),_.appendChild(M),_.appendChild(F),I.appendChild(A),I.appendChild(_);let B=document.createElement("div");B.contentEditable="true",B.className="cw-email-preview-content",S.appendChild(I),S.appendChild(B),re(),k.appendChild(w),k.appendChild(S),c.appendChild(m),c.appendChild(k),r.appendChild(l),r.appendChild(c);let G=document.createElement("div");Object.assign(G.style,dt),r.appendChild(G),pt(r,G),document.body.appendChild(r);function E(){t=!Xe(r),t?(Te(),r.style.display="flex",un(r),a.length===0&&T()):(qe(),r.style.display="none"),Be(t,r,"cw-btn-email")}async function T(){u.innerHTML='<div style="padding: 20px; text-align: center; color: #5f6368;">Carregando...</div>',a=await hi.getTemplates(),z()}function R(W,le,O){let ee=document.createElement("div");ee.className="cw-email-cat-header",ee.tabIndex=0,ee.setAttribute("role","button"),ee.setAttribute("aria-expanded",String(O));let se=document.createElement("span");se.textContent=W,ee.appendChild(se);let X=document.createElement("span");X.className="cw-email-cat-badge",X.textContent=le;let ce=document.createElement("span");ce.className="cw-email-cat-arrow",ce.textContent=O?"\u25BE":"\u25B8";let q=document.createElement("div");return q.className="cw-email-cat-right",q.appendChild(X),q.appendChild(ce),ee.appendChild(q),ee.onclick=()=>{n.has(W)?n.delete(W):n.add(W),z()},ee.addEventListener("keydown",j=>{(j.key==="Enter"||j.key===" ")&&(j.preventDefault(),ee.click())}),ee}function C(W){let le=o&&o.id===W.id,O=document.createElement("div");if(O.className="cw-email-list-item"+(le?" selected":""),O.tabIndex=0,O.setAttribute("role","button"),O.setAttribute("aria-pressed",String(!!le)),le){let X=document.createElement("div");X.className="cw-email-list-indicator",O.appendChild(X)}let ee=document.createElement("span");ee.className="cw-email-list-icon",ee.innerHTML=W.isSmartCR?"\u26A1":W.category==="\u{1F464} Pessoal"?"\u{1F464}":"\u{1F4C4}",O.appendChild(ee);let se=document.createElement("span");return se.className="cw-email-list-text",se.textContent=W.name,O.appendChild(se),O.onclick=()=>ie(W),O.addEventListener("keydown",X=>{(X.key==="Enter"||X.key===" ")&&(X.preventDefault(),O.click())}),O}function z(){u.innerHTML="";let W=Os(a,i);if(W.length===0){u.innerHTML=`
                <div class="cw-email-list-empty">
                    <div class="cw-email-list-empty-icon">\u{1F50D}</div>
                    <div class="cw-email-list-empty-text">Nenhum resultado para "${i}"</div>
                </div>`;return}[...new Set(W.map(O=>O.category))].sort((O,ee)=>O.localeCompare(ee)).forEach(O=>{let ee=n.has(O)||i.length>0,se=W.filter(X=>X.category===O);u.appendChild(R(O,se.length,ee)),ee&&se.forEach(X=>{u.appendChild(C(X))})})}let Q=null;async function ie(W){o?.id!==W.id&&(o=W,Q&&clearTimeout(Q),k.style.opacity="0",k.style.transform="translateY(5px)",Q=setTimeout(()=>{H.style.display=W.isSmartCR?"block":"none",F.style.display=W.isSmartCR?"none":"block",M.style.display=W.isSmartCR?"none":"block",z(),Y(),re(),k.style.opacity="1",k.style.transform="translateY(0)",Q=null},150))}function Y(){if(w.innerHTML="",!o||o.isSmartCR){o?.isSmartCR?(w.style.display="block",w.innerHTML=`<div class="cw-email-smartcr-hint">
                    <span class="cw-email-smartcr-hint-icon">\u{1F4A1}</span>
                    <span>Este \xE9 um <b>Smart CR</b>. Clique no bot\xE3o laranja acima para aplicar o atalho diretamente no CRM.</span>
                </div>`):w.style.display="none";return}let W=o.placeholders&&o.placeholders.length>0;if(w.style.display=W?"block":"none",!W)return;let le=document.createElement("div");le.className="cw-email-fields-grid",(o.placeholders||[]).forEach(O=>{let ee=document.createElement("div"),se=document.createElement("label");se.className="cw-email-field-label",se.textContent=O.label;let X=document.createElement("input");X.className="cw-email-field-input",X.type=O.type||"text",X.dataset.key=O.key,O.auto==="agentName"&&(X.value=Qt().split(" ")[0]),X.addEventListener("input",re),ee.appendChild(se),ee.appendChild(X),le.appendChild(ee)}),w.appendChild(le)}function re(){if(!o){B.innerHTML=`
                <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center;">
                    <div class="cw-animate-float" style="width: 140px; height: 140px; margin-bottom: 24px;">
                        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="60" cy="60" r="55" fill="#f8f9fa"/>
                            <!-- Envelope Base -->
                            <path d="M30 40C30 37.7909 31.7909 36 34 36H86C88.2091 36 90 37.7909 90 40V80C90 82.2091 88.2091 84 86 84H34C31.7909 84 30 82.2091 30 80V40Z" fill="white" stroke="#e8eaed" stroke-width="2"/>
                            <!-- Detalhes decorativos (paleta Apple do m\xF3dulo, n\xE3o mais as cores oficiais do Google) -->
                            <path d="M30 40L60 60L90 40" stroke="${Se.primary}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M30 80L50 65" stroke="#FF3B30" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <path d="M90 80L70 65" stroke="#FF9500" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <!-- Small Floating icons -->
                            <circle cx="95" cy="30" r="8" fill="#34C759"/>
                            <path d="M92 30H98M95 27V33" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            <rect x="20" y="70" width="12" height="12" rx="3" fill="${Se.primary}" opacity="0.8"/>
                        </svg>
                    </div>
                    <div style="font-family: 'Google Sans', sans-serif; font-size: 18px; font-weight: 600; color: ${Se.textPrimary}; margin-bottom: 8px;">
                        Pronto para come\xE7ar?
                    </div>
                    <div style="font-size: 14px; color: ${Se.textSecondary}; line-height: 1.6; max-width: 280px; margin: 0 auto;">
                        Selecione um template \xE0 esquerda para<br>gerar o seu e-mail t\xE9cnico.
                    </div>
                </div>`;return}if(o.isSmartCR){B.innerHTML=`<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">\u26A1</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${o.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">Este atalho ir\xE1 preencher automaticamente os destinat\xE1rios e abrir o menu de Canned Responses do CRM.</div></div>`;return}let W=o.template;(w.querySelectorAll("input")||[]).forEach(O=>{let ee=O.dataset.key,se=O.value;if(O.type==="date"&&se){let[ce,q,j]=se.split("-");se=`${q}/${j}/${ce}`}se=se||`<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${ee}</span>`;let X=ee.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");W=W.replace(new RegExp(X,"g"),se)}),B.innerHTML=W}return f.addEventListener("input",W=>{i=W.target.value,g.style.display=i?"block":"none",z()}),M.onclick=()=>{let W=B.innerHTML,le=new Blob([W],{type:"text/html"}),O=B.innerText,ee=[new ClipboardItem({"text/html":le,"text/plain":new Blob([O],{type:"text/plain"})})];navigator.clipboard.write(ee).then(()=>te(Qe("emailCopiedToast")),()=>{v.playError(),te(Qe("copyErrorToast"),{error:!0})})},F.onclick=async()=>{if(!o)return;let W=ca(),le={...o,body:B.innerHTML};try{await oi(le),E()}catch{v.playError(),te(Qe("fillErrorToast"),{error:!0})}finally{W()}},H.onclick=async()=>{if(!o||!o.isSmartCR)return;let W=ca();try{await _a(o.code),E()}catch{v.playError(),te(Qe("smartCrErrorToast"),{error:!0})}finally{W()}},Ae(()=>{let W=r.querySelector(".cw-help-title");W&&(W.textContent=Qe("headerTitle"));let le=r.querySelector(".cw-help-description");le&&(le.textContent=Qe("headerDesc")),f.placeholder=Qe("searchPlaceholder"),A.textContent=Qe("previewTitle")}),E}var wi=["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],Ut={"PT BAU":{inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:wi,fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:wi,fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{inicio:["Introducci\xF3n (Nombre y Equipo).","La llamada puede ser grabada con fines de entrenamiento y calidad de acuerdo con nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xF3n.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar contenido sensible antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos pasos (\xBFCu\xE1nto tiempo seguir\xE1 el caso?)","Encuesta de Satisfacci\xF3n.","Estar\xE9 monitoreando su caso durante XX d\xEDas para asegurarme de que todo est\xE9 funcionando correctamente. Durante este tiempo, nuestro equipo de calidad podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la cuenta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condiciones.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las herramientas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfacci\xF3n.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes d\xEDas."]}},Ms=["inicio","meio","fim"];function Si(e){if(!Array.isArray(e)||!e.length)return!1;let t={},a=e.slice().sort((o,i)=>(o.sortOrder||0)-(i.sortOrder||0));for(let o of a){let i=(o.lang||"").toUpperCase(),n=o.key||"",r=o.field||"",l=o.value||"";if(!i||!n||!Ms.includes(r)||!l)continue;let c=`${i} ${n}`;t[c]||(t[c]={}),(t[c][r]=t[c][r]||[]).push(l)}if(!Object.keys(t).length)return!1;for(let o of Object.keys(Ut))delete Ut[o];return Object.assign(Ut,t),!0}async function Ei(e){let t=me.getCachedContent("call_script");Si(t)&&e?.();try{let a=await me.fetchContentModule("call_script");Si(a)&&e?.()}catch(a){console.warn("Central de Conte\xFAdo indispon\xEDvel; usando roteiro embutido.",a)}}var Ai={pt:{headerTitle:"Call Script",headerDesc:"Guia interativo para condu\xE7\xE3o de chamadas.",loading:"Carregando...",unknownClient:"Cliente Desconhecido",notFound:"N\xE3o encontrado",activeMonitoring:"Monitoramento Ativo",cidLabel:"CID (Conta)",emailLabel:"Email de Contato",copied:"Copiado!",amMessageTitle:"Mensagem AM",amMessageSub:"Gerar aviso de insucesso",copyFinalMessage:"Copiar Mensagem Final",resize:"Redimensionar",resetScript:"Resetar Script",resetConfirm:"Resetar todo o progresso do script? Essa a\xE7\xE3o n\xE3o pode ser desfeita.",resetConfirmBtn:"Resetar",scriptNotConfigured:"Script n\xE3o configurado.",messageCopiedToast:"Mensagem copiada!",amMessage:(e,t)=>`Ol\xE1. Bom dia!

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
E-mail: ${e.clientEmail||"---"}`,dateLocale:"es-ES"}};function Ci(){return de()==="es"?"ES":"PT"}function we(e){let t=de();return Ai[t]?.[e]??Ai.pt[e]}var fe={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",danger:"#D93025",dangerBg:"#FCE8E6",success:"#34A853",successBg:"#E6F4EA"},Ds={inicio:{PT:"Abertura",ES:"Apertura"},meio:{PT:"Implementa\xE7\xE3o (Tag Support)",ES:"Implementaci\xF3n"},fim:{PT:"Fechamento",ES:"Cierre"}};function Fs(){if(document.getElementById("csa-styles-v2"))return;let e=document.createElement("style");e.id="csa-styles-v2",e.textContent=`
        #call-script-popup { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

        /* --- BANNER DE CONTEXTO --- */
        .csa-context-banner {
            padding: 20px 20px 16px 20px;
            background: ${fe.bgSurface};
            border-bottom: 1px solid #F1F3F4;
            display: flex; flex-direction: column; gap: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
            position: relative; z-index: 5;
        }
        .csa-ctx-top { display: flex; justify-content: space-between; align-items: center; }
        .csa-ctx-name-wrap { display: flex; align-items: center; gap: 10px; }
        .csa-ctx-name { font-size: 16px; font-weight: 500; color: ${fe.textPrimary}; }
        .csa-live-badge {
            font-size: 10px; font-weight: 700; color: ${fe.primary}; background: ${fe.primaryBg};
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
        .csa-data-pill:hover { background: ${fe.bgSurface}; border-color: #DADCE0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transform: translateY(-1px); }
        .csa-data-pill:active { transform: scale(0.98); }
        .csa-data-pill.copied { background: ${fe.successBg} !important; border-color: ${fe.success} !important; }
        .csa-pill-label { font-size: 9px; font-weight: 700; color: ${fe.textSecondary}; text-transform: uppercase; margin-bottom: 2px; letter-spacing: 0.5px; }
        .csa-data-value { font-size: 13px; color: ${fe.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .csa-data-value.mono { font-family: 'SF Mono', 'Roboto Mono', monospace; font-weight: 500; color: ${fe.primary}; }
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
            width: 100%; background: ${fe.bgSurface}; border: 1px solid #DADCE0; border-radius: 10px; padding: 10px;
            display: flex; align-items: center; gap: 12px; cursor: pointer; box-sizing: border-box;
            transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.02);
        }
        .csa-am-btn:hover { border-color: ${fe.primary}; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .csa-am-icon { background: ${fe.primaryBg}; border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .csa-am-btn-text { text-align: left; }
        .csa-am-btn-title { font-size: 11px; font-weight: 700; color: #3C4043; }
        .csa-am-btn-sub { font-size: 10px; color: ${fe.textSecondary}; }

        .csa-am-review-container { display: none; max-height: 0; opacity: 0; overflow: hidden; margin-top: 0; transition: all 0.3s ease; }
        .csa-am-review-container.visible { display: block; max-height: 300px; opacity: 1; margin-top: 12px; }
        .csa-am-message-area {
            width: 100%; height: 120px; border: 1px solid #DADCE0; border-radius: 8px; padding: 10px;
            font-family: inherit; font-size: 13px; color: #3C4043; outline: none; resize: none;
            box-sizing: border-box; background: ${fe.bgSurface}; line-height: 1.4;
        }
        .csa-am-copy-final {
            width: 100%; margin-top: 8px; padding: 10px; background: ${fe.primary}; color: white; border: none;
            border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; transition: background 0.2s;
        }
        .csa-am-copy-final.copied-flash { background: ${fe.success}; }

        /* --- BARRA DE PROGRESSO --- */
        .csa-progress-container { height: 6px; background: ${fe.borderSubtle}; width: 100%; position: relative; overflow: hidden; }
        .csa-progress-fill {
            height: 100%; width: 0%; border-radius: 0 3px 3px 0;
            transition: width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
            background: linear-gradient(90deg, ${fe.primary}, #00C6FF, ${fe.primary});
            background-size: 200% 100%;
            animation: csaShimmer 2s infinite linear;
        }
        .csa-progress-fill.complete { background: ${fe.success}; animation: none; }
        @keyframes csaShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

        /* --- SEGMENTED CONTROL (Tipo / Idioma) --- */
        .csa-content-area { padding: 16px; overflow-y: auto; flex-grow: 1; background: ${fe.bgApp}; scroll-behavior: smooth; }
        .csa-controls { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .csa-segmented-control { display: flex; background: #E3E3E8; padding: 2px; border-radius: 10px; gap: 2px; position: relative; margin-bottom: 16px; }
        .csa-segmented-control button {
            flex: 1; border: none; background: transparent; padding: 8px 4px; font-size: 12px; font-weight: 600;
            border-radius: 8px; cursor: pointer; transition: color 0.3s ease; color: ${fe.textSecondary};
            position: relative; z-index: 2;
        }
        .csa-segmented-control button.active { color: ${fe.textPrimary}; }
        .csa-segmented-indicator {
            position: absolute; top: 2px; left: 2px; bottom: 2px; background: ${fe.bgSurface};
            border-radius: 8px; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1; box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        /* --- CARDS DO CHECKLIST --- */
        .csa-card { background: ${fe.bgSurface}; border: 1px solid ${fe.borderSubtle}; border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02); }
        .csa-card.done { box-shadow: inset 4px 0 0 ${fe.success}, 0 1px 3px rgba(0,0,0,0.05); }
        .csa-card-title { font-size: 11px; font-weight: 700; color: ${fe.textSecondary}; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; user-select: none; }
        .csa-card-counter { font-size: 11px; opacity: 0.7; font-weight: 500; background: #f1f3f4; padding: 2px 8px; border-radius: 10px; }
        .csa-card-counter.done { opacity: 1; color: #1e8e3e; background: ${fe.successBg}; }

        .csa-item-row { display: flex; align-items: flex-start; padding: 10px 8px; cursor: pointer; border-radius: 10px; transition: background 0.2s ease; color: ${fe.textPrimary}; font-size: 14px; line-height: 1.5; margin-bottom: 2px; }
        .csa-item-row:not(.completed):hover { background: rgba(0, 0, 0, 0.03); }
        .csa-item-row:not(.completed):hover .csa-checkbox { border-color: ${fe.primary}; }
        .csa-item-row.completed { background: rgba(0, 0, 0, 0.02); }

        .csa-checkbox {
            min-width: 20px; height: 20px; border-radius: 50%; border: 2px solid ${fe.borderSubtle};
            margin-right: 12px; margin-top: 1px; display: flex; align-items: center; justify-content: center;
            transition: border-color 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.15s ease;
            background: #fff;
        }
        .csa-checkbox.checked { background: ${fe.primary}; border-color: ${fe.primary}; }
        .csa-checkbox.pulse { transform: scale(1.15); }

        .csa-item-text { position: relative; display: inline-block; flex: 1; transition: color 0.3s ease; }
        .csa-item-text.completed { color: ${fe.textSecondary}; }
        .csa-item-text::after { content: ''; position: absolute; left: 0; top: 50%; width: 0; height: 1.5px; background: ${fe.textSecondary}; transition: width 0.3s ease; }
        .csa-item-text.completed::after { width: 100%; }

        .csa-empty-state { padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .csa-empty-state-icon { font-size: 24px; }

        /* --- FOOTER --- */
        .csa-footer { padding: 12px 16px; border-top: 1px solid #F1F3F4; background: ${fe.bgSurface}; display: flex; justify-content: space-between; align-items: center; }
        .csa-credit { font-size: 10px; color: #bdc1c6; }
        .csa-reset-btn {
            background: transparent; border: none; color: ${fe.danger}; font-size: 12px; font-weight: 600;
            cursor: pointer; padding: 6px 12px; border-radius: 20px; transition: background 0.2s ease, transform 0.15s ease;
            display: flex; align-items: center; gap: 4px;
        }
        .csa-reset-btn:hover { background: ${fe.dangerBg}; }
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
    `,document.head.appendChild(e)}function ki(){let e="v3.1.0";Fs();let t={},a=Ci(),o="BAU",i=!1,n=document.createElement("div");n.id="call-script-popup",n.classList.add("cw-module-window"),Object.assign(n.style,We,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let r={popup:n,googleLine:null},l=null;function c(){i&&tt().then(X=>{let ce=n.querySelector("#cw-ctx-name"),q=n.querySelector("#cw-ctx-cid"),j=n.querySelector("#cw-ctx-email");if(ce&&(ce.textContent=X.advertiserName||we("unknownClient")),q){let ae=X.cid||"---";q.textContent!==ae&&(q.textContent=ae)}if(j){let ae=X.clientEmail||we("notFound");j.textContent!==ae&&(j.textContent=ae,j.title=ae)}})}function m(){tt().then(X=>{let ce=new Date().toLocaleDateString(we("dateLocale")),q=n.querySelector("#cw-am-message-area"),j=n.querySelector("#cw-am-review-container"),ae=we("amMessage")(X,ce);q&&(q.value=ae),j&&(j.classList.add("visible"),j.scrollIntoView({behavior:"smooth",block:"end"}))})}function p(){i=!Xe(n),Be(i,n,"cw-btn-script"),i?(Te(),c(),l||(l=setInterval(c,2e3))):(qe(),l&&(clearInterval(l),l=null))}let f=Pe(n,we("headerTitle"),e,we("headerDesc"),r,()=>{p()});n.appendChild(f);let u=f.querySelector("span"),g=document.createElement("div");g.className="csa-context-banner",g.innerHTML=`
      <div class="csa-ctx-top">
          <div class="csa-ctx-name-wrap">
              <div class="csa-live-dot js-csa-monitoring" title="${we("activeMonitoring")}"></div>
              <span id="cw-ctx-name" class="csa-ctx-name">${we("loading")}</span>
          </div>
          <div class="csa-live-badge">Live</div>
      </div>

      <div class="csa-ctx-grid">
          <div class="csa-data-pill" id="cw-pill-cid">
              <div class="csa-pill-label js-csa-cid-label">${we("cidLabel")}</div>
              <div id="cw-ctx-cid" class="csa-data-value mono">---</div>
              <div class="csa-copy-hint">${we("copied")}</div>
          </div>

          <div class="csa-data-pill" id="cw-pill-email">
              <div class="csa-pill-label js-csa-email-label">${we("emailLabel")}</div>
              <div id="cw-ctx-email" class="csa-data-value">---</div>
              <div class="csa-copy-hint">${we("copied")}</div>
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
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${fe.primary}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </div>
                      <div class="csa-am-btn-text">
                          <div class="csa-am-btn-title js-csa-am-title">${we("amMessageTitle")}</div>
                          <div class="csa-am-btn-sub js-csa-am-sub">${we("amMessageSub")}</div>
                      </div>
                  </button>

                  <div id="cw-am-review-container" class="csa-am-review-container">
                      <textarea id="cw-am-message-area" class="csa-am-message-area"></textarea>
                      <button id="cw-am-copy-final" class="csa-am-copy-final">${we("copyFinalMessage")}</button>
                  </div>
              </div>
          </div>
      </div>
  `;let k=g.querySelector("#csa-toggle-options"),w=g.querySelector("#csa-options-content"),S=g.querySelector("#csa-options-arrow"),I=!1;k.onclick=()=>{I=!I,S.classList.toggle("expanded",I),w.classList.toggle("expanded",I),v.playClick()};let A=g.querySelector("#cw-pill-message"),_=g.querySelector("#cw-am-copy-final"),b=g.querySelector("#cw-am-message-area");A.addEventListener("click",()=>{m()}),_.addEventListener("click",()=>{b.value&&(navigator.clipboard.writeText(b.value),te(we("messageCopiedToast")),v.playSuccess(),_.classList.add("copied-flash"),_.textContent=we("copied"),setTimeout(()=>{_.classList.remove("copied-flash"),_.textContent=we("copyFinalMessage")},2e3))});let M=(X,ce)=>{let q=g.querySelector(X),j=g.querySelector(ce);q.onclick=()=>{let ae=j.textContent;!ae||ae.includes("---")||ae===we("notFound")||(navigator.clipboard.writeText(ae),v.playSuccess(),q.classList.add("copied"),setTimeout(()=>q.classList.remove("copied"),1500))}};n.appendChild(g);let F=document.createElement("div");F.className="csa-progress-container";let H=document.createElement("div");H.className="csa-progress-fill",F.appendChild(H),n.appendChild(F);let B=document.createElement("div");B.id="csa-content",B.className="csa-content-area",n.appendChild(B);let G=document.createElement("div");G.className="csa-footer";let E=document.createElement("span");E.className="csa-credit",E.textContent=`by ${ct}`;let T=document.createElement("button");T.className="csa-reset-btn",T.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> <span class="js-csa-reset-label">${we("resetScript")}</span>`,T.onclick=async()=>{if(await De(we("resetConfirm"),{danger:!0,confirmText:we("resetConfirmBtn")})){for(let ce in t)delete t[ce];O()}},G.appendChild(E),G.appendChild(T),n.appendChild(G);let R=document.createElement("div");R.className="csa-controls";let C=document.createElement("div");C.className="csa-segmented-control",C.innerHTML=`
      <div class="csa-segmented-indicator" id="type-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-type="BAU">BAU</button>
      <button data-type="LT">LT</button>
  `,R.appendChild(C),B.appendChild(R);let z=C.querySelectorAll("button"),Q=C.querySelector("#type-indicator");z.forEach((X,ce)=>{X.onclick=()=>{z.forEach(q=>q.classList.remove("active")),X.classList.add("active"),Q.style.transform=`translateX(${ce*(C.offsetWidth/2-2)}px)`,o=X.dataset.type,v.playClick(),O()}}),Ae(()=>{a=Ci(),u&&(u.textContent=we("headerTitle"));let X=n.querySelector(".cw-help-title");X&&(X.textContent=we("headerTitle"));let ce=n.querySelector(".cw-help-description");ce&&(ce.textContent=we("headerDesc"));let q=g.querySelector(".js-csa-monitoring");q&&(q.title=we("activeMonitoring"));let j=g.querySelector(".js-csa-cid-label");j&&(j.textContent=we("cidLabel"));let ae=g.querySelector(".js-csa-email-label");ae&&(ae.textContent=we("emailLabel")),g.querySelectorAll(".csa-copy-hint").forEach(s=>s.textContent=we("copied"));let D=g.querySelector(".js-csa-am-title");D&&(D.textContent=we("amMessageTitle"));let U=g.querySelector(".js-csa-am-sub");U&&(U.textContent=we("amMessageSub")),_&&(_.textContent=we("copyFinalMessage"));let ne=T.querySelector(".js-csa-reset-label");ne&&(ne.textContent=we("resetScript")),O()});let ie=document.createElement("div");ie.id="csa-checklist-area",B.appendChild(ie);let Y=document.createElement("div");Object.assign(Y.style,dt),Y.className="no-drag",Y.title=we("resize"),n.appendChild(Y),pt(n,Y),document.body.appendChild(n),M("#cw-pill-cid","#cw-ctx-cid"),M("#cw-pill-email","#cw-ctx-email");function re(X){return X.replace(/\n/g,"<br>")}function W(X,ce,q,j){let ae=`${X}-${ce}-${j}`,D=!!t[ae],U=document.createElement("div");U.className="csa-item-row"+(D?" completed":"");let ne=document.createElement("div");ne.className="csa-checkbox"+(D?" checked":""),ne.innerHTML=D?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':"";let s=document.createElement("span");return s.className="csa-item-text"+(D?" completed":""),s.innerHTML=re(q),U.onclick=()=>{let y=!t[ae];t[ae]=y,v.playClick(),U.classList.toggle("completed",y),s.classList.toggle("completed",y),ne.classList.toggle("checked",y),ne.innerHTML=y?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':"",y&&(ne.classList.add("pulse"),setTimeout(()=>ne.classList.remove("pulse"),150)),ee(X,Ut[X])},U.appendChild(ne),U.appendChild(s),{row:U,isDone:D}}function le(X,ce,q){let j=document.createElement("div");j.className="csa-card";let ae=document.createElement("div");ae.className="csa-card-title",ae.textContent=Ds[ce][a]||"";let D=document.createElement("span");D.className="csa-card-counter",ae.appendChild(D),j.appendChild(ae);let U=0;q.forEach((s,y)=>{let{row:L,isDone:J}=W(X,ce,s,y);J&&U++,j.appendChild(L)});let ne=U===q.length&&q.length>0;return j.classList.toggle("done",ne),D.classList.toggle("done",ne),D.textContent=`${U}/${q.length}`,j}function O(){ie.innerHTML="";let X=`${a} ${o}`,ce=Ut[X];if(!ce){ie.innerHTML=`<div class="csa-empty-state"><div class="csa-empty-state-icon">\u2615</div><div>${we("scriptNotConfigured")}</div></div>`,H.style.width="0%";return}let q=0,j=0;["inicio","meio","fim"].forEach(ae=>{ce[ae]&&(q+=ce[ae].length)}),["inicio","meio","fim"].forEach(ae=>{let D=ce[ae];!D||D.length===0||(D.forEach((U,ne)=>{let s=`${X}-${ae}-${ne}`;t[s]&&j++}),ie.appendChild(le(X,ae,D)))}),se(q,j)}function ee(X,ce){let q=0,j=0;["inicio","meio","fim"].forEach(ae=>{let D=ce[ae]||[];q+=D.length,D.forEach((U,ne)=>{t[`${X}-${ae}-${ne}`]&&j++})}),se(q,j),setTimeout(()=>O(),200)}function se(X,ce){let q=X===0?0:ce/X*100;H.style.width=`${q}%`,H.classList.toggle("complete",q===100)}return O(),Ei(()=>O()),p}var zs={"Ponto Eletr\xF4nico":"Control de Asistencia","Ferramenta de ajuda":"Herramienta de ayuda","Intranet Google":"Intranet Google","Relat\xF3rio Follow-ups":"Informe de Follow-ups","Dashboard WFM":"Dashboard WFM","Tech Solutions SAO":"Tech Solutions SAO","Form Grava\xE7\xE3o":"Form Grabaci\xF3n","Form Escala\xE7\xE3o":"Form Escalaci\xF3n","Instru\xE7\xF5es Split":"Instrucciones Split","Single Page App":"Single Page App","Procedimento Padr\xE3o":"Procedimiento Est\xE1ndar","Valida\xE7\xE3o C\xF3digo":"Validaci\xF3n C\xF3digo","Convers\xE3o Chamada":"Conversi\xF3n Llamada","Valida\xE7\xE3o WCC":"Validaci\xF3n WCC",ECW4:"ECW4","Monitoramento EC":"Monitoreo EC","Resolu\xE7\xE3o problemas":"Resoluci\xF3n de problemas","Implementa\xE7\xE3o RMKT":"Implementaci\xF3n RMKT","Pontua\xE7\xE3o Leads":"Puntuaci\xF3n de Leads","Instala\xE7\xE3o Container":"Instalaci\xF3n Container","Instala\xE7\xE3o Config.":"Instalaci\xF3n Config.","Valida\xE7\xE3o GA4":"Validaci\xF3n GA4","Guia Dev":"Gu\xEDa Dev","Resolu\xE7\xE3o Problemas":"Resoluci\xF3n de Problemas","Dom\xEDnio Cruzado":"Dominio Cruzado","Lista Oficial":"Lista Oficial","Criador URLs":"Creador de URLs","Setup Inicial":"Setup Inicial","Otimiza\xE7\xE3o Feed":"Optimizaci\xF3n Feed","Ferramenta Interna":"Herramienta Interna",Avalia\u00E7\u00F5es:"Rese\xF1as","Feeds Offline":"Feeds Offline","Help Center":"Help Center","Guias CMS":"Gu\xEDas CMS","Solu\xE7\xF5es Iframes":"Soluciones Iframes","Ghost Ads":"Ghost Ads","Ghost Analytics":"Ghost Analytics","Ghost GTM":"Ghost GTM",Ferramenta:"Herramienta","Ghost MC":"Ghost MC","Playground JS":"Playground JS","Testador Regex":"Probador Regex","Doc. CSP":"Doc. CSP","Guia CoMo":"Gu\xEDa CoMo","Debug CoMo":"Debug CoMo","Portal Colaborador":"Portal del Colaborador","Apps e Sistemas":"Apps y Sistemas","Folha Pagamento":"N\xF3mina","Reportar problemas":"Reportar problemas","Registro chamadas":"Registro de llamadas","Erros de sistema":"Errores de sistema","BAU/Descarte/Monitoria":"BAU/Descarte/Monitoreo","Feedback positivo":"Feedback positivo","Casos dif\xEDceis":"Casos dif\xEDciles","Chat/Email Ads":"Chat/Email Ads","Chat/Email Shopping":"Chat/Email Shopping","Perfil da Empresa":"Perfil de la Empresa","Console API":"Console API","Lista de n\xFAmeros":"Lista de n\xFAmeros",Cursos:"Cursos"};function Ti(e){let t=e&&typeof e=="object"?e:{desc:e},a=t.desc||"";return de()!=="es"?a:t.descEs||zs[a]||a}var qi={pt:{headerTitle:"Central de Links",headerDesc:"Navegue pelas categorias ou use a busca.",searchPlaceholder:"Buscar ferramenta ou SOP...",recent:"Recentes",nothingHereYet:"Nada por aqui ainda",nothingHereSub:"Os links que voc\xEA abrir aparecem aqui pra acesso r\xE1pido depois.",searchResults:"Resultados da busca",nothingFound:"Nada encontrado",noLinkMatches:e=>`Nenhum link bate com "${e}".`,copyUrl:"Copiar URL",linkCopiedToast:"Link copiado!",copyFailedToast:"N\xE3o foi poss\xEDvel copiar o link.",categoryLabels:{tasks:"Tarefas",ads:"Ads",analytics:"GA4",shopping:"Shop",tech:"Tech",hr:"RH",lm:"Forms",qa:"QA",suporte:"Ajuda"}},es:{headerTitle:"Central de Enlaces",headerDesc:"Navega por las categor\xEDas o usa la b\xFAsqueda.",searchPlaceholder:"Buscar herramienta o SOP...",recent:"Recientes",nothingHereYet:"Todav\xEDa no hay nada aqu\xED",nothingHereSub:"Los enlaces que abras aparecen aqu\xED para acceso r\xE1pido despu\xE9s.",searchResults:"Resultados de la b\xFAsqueda",nothingFound:"No se encontr\xF3 nada",noLinkMatches:e=>`Ning\xFAn enlace coincide con "${e}".`,copyUrl:"Copiar URL",linkCopiedToast:"\xA1Enlace copiado!",copyFailedToast:"No se pudo copiar el enlace.",categoryLabels:{tasks:"Tareas",ads:"Ads",analytics:"GA4",shopping:"Shop",tech:"Tech",hr:"RRHH",lm:"Forms",qa:"QA",suporte:"Ayuda"}}};function je(e){let t=de();return qi[t]?.[e]??qi.pt[e]}function Li(e){return je("categoryLabels")[e]??vt[e]?.label??e}var vt={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}};function Ni(e){if(!Array.isArray(e)||!e.length)return!1;let t={};for(let a of e){let o=a.key;if(!o)continue;let i;try{i=JSON.parse(a.value||"{}")}catch{continue}!i.name||!i.url||(t[o]||(t[o]={label:vt[o]?.label||o,links:[]}),t[o].links.push({name:i.name,url:i.url,desc:i.desc||"",descEs:i.desc_es||""}))}if(!Object.keys(t).length)return!1;for(let a of Object.keys(vt))delete vt[a];return Object.assign(vt,t),!0}async function Rs(e){let t=me.getCachedContent("links");Ni(t)&&e?.();try{let a=await me.fetchContentModule("links");Ni(a)&&e?.()}catch(a){console.warn("Central de Conte\xFAdo indispon\xEDvel; usando links embutidos.",a)}}var kt={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},Tt={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},Da={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}};function $s(){if(document.getElementById("cw-links-styles"))return;let e=document.createElement("style");e.id="cw-links-styles",e.textContent=`
        .cw-links-layout { display: flex; height: calc(100% - 56px); width: 100%; position: relative; }

        /* --- SIDEBAR --- */
        .cw-links-sidebar {
            width: 80px; flex-shrink: 0; background: ${Tt.bgSidebar};
            border-right: 1px solid ${Tt.borderSubtle};
            display: flex; flex-direction: column; align-items: center;
            padding: 16px 0; overflow-y: auto; gap: 8px;
            scrollbar-width: none; z-index: 2;
        }
        .cw-links-nav-btn {
            width: 56px; height: 56px; border-radius: 16px;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            cursor: pointer; color: ${Tt.textSecondary};
            transition: background 0.2s var(--cw-ease-standard), color 0.2s ease;
            position: relative; background: transparent;
        }
        .cw-links-nav-btn:hover:not(.active) { background: #F1F3F4; }
        .cw-links-nav-btn:hover:not(.active) .cw-links-nav-icon { transform: scale(1.1); }
        .cw-links-nav-btn.active { background: var(--cat-bg); color: var(--cat-color); }
        .cw-links-nav-btn.active .cw-links-nav-icon { transform: scale(1.1); }
        .cw-links-nav-btn.history-open { background: #3C4043; color: #FFFFFF; }
        .cw-links-nav-icon { width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s; }
        .cw-links-nav-label { font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px; }
        .cw-links-nav-sep { width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0; }

        /* --- CONTE\xDADO --- */
        .cw-links-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: ${Tt.bgApp}; position: relative; z-index: 1; }

        .cw-links-search-bar { padding: 16px 24px; flex-shrink: 0; }
        .cw-links-search-wrap {
            position: relative; width: 100%; height: 44px;
            border-radius: 12px; border: 1px solid transparent;
            background: #FFFFFF; transition: all 0.2s;
            display: flex; align-items: center;
            box-shadow: 0 2px 6px rgba(0,0,0,0.04); box-sizing: border-box;
        }
        .cw-links-search-wrap:focus-within { box-shadow: 0 4px 12px rgba(26,115,232,0.15); border-color: #1a73e8; }
        .cw-links-search-icon { margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none; }
        .cw-links-search-input {
            flex: 1; height: 100%; border: none; background: transparent;
            padding: 0 12px; font-size: 14px; color: ${Tt.textPrimary};
            outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
        }

        .cw-links-scroll { flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth; }
        .cw-links-search-results-label { font-size: 12px; font-weight: 700; color: #5f6368; margin: 20px 0 10px; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-links-empty { text-align: center; padding: 60px; color: #999; font-size: 13px; }

        .cw-links-cat-header {
            display: flex; align-items: center; gap: 8px;
            font-size: 13px; font-weight: 800; color: var(--cat-color);
            text-transform: uppercase; letter-spacing: 0.5px;
            margin: 32px 0 12px 0; padding-top: 10px;
        }
        .cw-links-cat-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--cat-color); }
        .cw-links-cat-grid { display: grid; grid-template-columns: 1fr; gap: 8px; }
        .cw-links-spacer { height: 80px; }

        /* --- CARD --- */
        .cw-links-card {
            display: flex; align-items: center; gap: 16px;
            padding: 12px 16px;
            background: #FFFFFF;
            border: 1px solid transparent;
            border-left: 4px solid transparent;
            border-radius: 16px;
            cursor: pointer;
            text-decoration: none; color: inherit;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            transition: transform 0.2s var(--cw-ease-elastic), box-shadow 0.2s var(--cw-ease-elastic), border-color 0.2s ease;
            position: relative; overflow: hidden; box-sizing: border-box;
        }
        .cw-links-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.08);
            border-color: rgba(0,0,0,0.05);
            border-left-color: var(--cat-color);
        }
        .cw-links-card:hover .cw-links-copy-btn { opacity: 1; background: #F1F3F4; }
        .cw-links-card:focus-visible { outline: 2px solid var(--cat-color); outline-offset: 2px; }

        .cw-links-icon-box {
            width: 40px; height: 40px; border-radius: 12px;
            background: var(--cat-bg); color: var(--cat-color);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
        }
        .cw-links-icon-box svg { width: 22px; height: 22px; }

        .cw-links-card-meta { flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden; }
        .cw-links-card-title { font-size: 14px; font-weight: 600; color: ${Tt.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-links-card-desc { font-size: 12px; color: ${Tt.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .cw-links-copy-btn {
            width: 32px; height: 32px; border-radius: 8px; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center;
            color: #9AA0A6; transition: all 0.2s; opacity: 0; cursor: pointer; flex-shrink: 0;
        }

        /* --- OVERLAY DE HIST\xD3RICO --- */
        .cw-links-history-overlay {
            position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
            background: rgba(255,255,255,0.98); z-index: 20;
            display: flex; flex-direction: column;
            transform: translateY(100%); transition: transform 0.3s var(--cw-ease-elastic);
            box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
        }
        .cw-links-history-head { padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4; }
        .cw-links-history-title { font-size: 16px; font-weight: 700; color: #202124; }
        .cw-links-history-close { background: none; border: none; cursor: pointer; color: #5f6368; padding: 4px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; }
        .cw-links-history-close:hover { background: #F1F3F4; }
        .cw-links-history-list { flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA; }
        .cw-links-history-empty { text-align: center; color: #999; margin-top: 60px; font-size: 13px; }

        @media (prefers-reduced-motion: reduce) {
            .cw-links-card, .cw-links-nav-btn, .cw-links-nav-icon, .cw-links-history-overlay {
                transition: opacity 0.15s ease, background 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}var So="cw_link_history_v4",Ps=10;function Ii(e,t){try{let a=JSON.parse(localStorage.getItem(So)||"[]");a=a.filter(o=>o.url!==e.url),a.unshift({...e,_originalCat:t}),a=a.slice(0,Ps),localStorage.setItem(So,JSON.stringify(a))}catch(a){console.warn("Erro ao salvar hist\xF3rico",a)}}function Bs(){try{return JSON.parse(localStorage.getItem(So)||"[]")}catch{return[]}}function _i(){let e="v4.6",t="",a=!1,o=null,i=!1;$s();let n=document.createElement("div");n.id="links-popup",n.classList.add("cw-module-window"),Object.assign(n.style,We,{right:"100px",width:"600px",height:"650px",background:Tt.bgApp,overflow:"hidden"});let r={popup:n,googleLine:null},l=Pe(n,je("headerTitle"),e,je("headerDesc"),r,()=>R());n.appendChild(l);let c=l.querySelector("span"),m=document.createElement("div");m.className="cw-links-layout",n.appendChild(m);let p=document.createElement("div");p.className="cw-links-sidebar",m.appendChild(p);let f=document.createElement("div");f.className="cw-links-content",m.appendChild(f);let u=document.createElement("div");u.className="cw-links-search-bar";let g=document.createElement("div");g.className="cw-links-search-wrap";let k=document.createElement("div");k.className="cw-links-search-icon",k.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';let w=document.createElement("input");w.className="cw-links-search-input",w.type="text",w.placeholder=je("searchPlaceholder"),g.appendChild(k),g.appendChild(w),u.appendChild(g),f.appendChild(u);let S=document.createElement("div");S.className="cw-links-scroll",f.appendChild(S);let I=null;function A(){if(I)return;I=document.createElement("div"),I.className="cw-links-history-overlay";let C=document.createElement("div");C.className="cw-links-history-head",C.innerHTML=`<span class="cw-links-history-title js-links-recent">\u{1F552} ${je("recent")}</span>`;let z=document.createElement("button");z.className="cw-links-history-close",z.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',z.onclick=()=>_(),C.appendChild(z),I.appendChild(C);let Q=document.createElement("div");Q.id="cw-history-list",Q.className="cw-links-history-list",I.appendChild(Q),f.appendChild(I)}function _(){i&&(i=!1,M(),G())}function b(){I||A();let C=I.querySelector("#cw-history-list");C.innerHTML="";let z=Bs();z.length===0?C.appendChild(Kt({icon:kt.history,title:je("nothingHereYet"),subtitle:je("nothingHereSub")})):z.forEach(Q=>{let ie=T(Q,kt[Q._originalCat],!0,Q._originalCat);C.appendChild(ie)}),requestAnimationFrame(()=>I.style.transform="translateY(0)")}function M(){I&&(I.style.transform="translateY(100%)")}document.addEventListener("mousedown",C=>{!i||!I||!I.contains(C.target)&&!p.contains(C.target)&&_()}),document.addEventListener("keydown",C=>{C.key==="Escape"&&i&&_()});function F(){p.innerHTML="";let C=H("history",je("recent"),kt.history);C.id="cw-sidebar-btn-history",C.onclick=()=>{v.playClick(),i=!i,i?b():M(),G()},p.appendChild(C);let z=document.createElement("div");z.className="cw-links-nav-sep",p.appendChild(z),Object.keys(vt).forEach(Q=>{let ie=H(Q,Li(Q),kt[Q]);ie.id=`cw-sidebar-btn-${Q}`,ie.onclick=()=>{v.playClick(),i&&_(),B(Q)},p.appendChild(ie)})}function H(C,z,Q){let ie=document.createElement("div");ie.className="cw-links-nav-btn",ie.title=z,ie.dataset.key=C;let Y=Da[C];Y&&(ie.style.setProperty("--cat-color",Y.color),ie.style.setProperty("--cat-bg",Y.bg));let re=document.createElement("div");re.className="cw-links-nav-icon",re.innerHTML=Q||kt.tasks;let W=document.createElement("div");return W.className="cw-links-nav-label",W.textContent=z,ie.appendChild(re),ie.appendChild(W),ie}function B(C){let z=document.getElementById(`cat-anchor-${C}`);z&&(z.scrollIntoView({behavior:"smooth",block:"start"}),o=C,G())}function G(){Object.keys(vt).forEach(z=>{let Q=p.querySelector(`#cw-sidebar-btn-${z}`);Q&&Q.classList.toggle("active",o===z&&!i)});let C=p.querySelector("#cw-sidebar-btn-history");C&&C.classList.toggle("history-open",i)}function E(){if(S.innerHTML="",t.trim()!==""){let z=[];if(Object.entries(vt).forEach(([ie,Y])=>{let re=Y.links.filter(W=>W.name.toLowerCase().includes(t.toLowerCase())||Ti(W).toLowerCase().includes(t.toLowerCase()));z.push(...re.map(W=>({...W,_cat:ie})))}),z.length===0){S.appendChild(Kt({icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',title:je("nothingFound"),subtitle:je("noLinkMatches")(t.trim())}));return}let Q=document.createElement("div");Q.className="cw-links-search-results-label",Q.textContent=je("searchResults"),S.appendChild(Q),z.forEach(ie=>{let Y=T(ie,kt[ie._cat],!1,ie._cat);S.appendChild(Y)});return}Object.entries(vt).forEach(([z,Q])=>{let ie=Da[z],Y=document.createElement("div"),re=document.createElement("div");re.id=`cat-anchor-${z}`,re.className="cw-links-cat-header",re.style.setProperty("--cat-color",ie.color),re.innerHTML=`<div class="cw-links-cat-dot"></div>${Li(z)}`,Y.appendChild(re);let W=document.createElement("div");W.className="cw-links-cat-grid",Q.links.forEach(le=>{let O=T(le,kt[z],!1,z);W.appendChild(O)}),Y.appendChild(W),S.appendChild(Y)});let C=document.createElement("div");C.className="cw-links-spacer",S.appendChild(C)}function T(C,z,Q,ie){let Y=document.createElement("a");Y.className="cw-links-card",Y.href=C.url,Y.target="_blank",Y.rel="noopener noreferrer";let re=Da[ie]||Da.history;Y.style.setProperty("--cat-color",re.color),Y.style.setProperty("--cat-bg",re.bg);let W=document.createElement("div");W.className="cw-links-icon-box",W.innerHTML=z||kt.tasks;let le=document.createElement("div");le.className="cw-links-card-meta";let O=document.createElement("div");O.className="cw-links-card-title",O.textContent=C.name;let ee=document.createElement("div");ee.className="cw-links-card-desc",ee.textContent=Ti(C),le.appendChild(O),le.appendChild(ee);let se=document.createElement("div");return se.className="cw-links-copy-btn",se.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',se.title=je("copyUrl"),Y.onclick=()=>{!Q&&ie&&Ii(C,ie)},se.onclick=X=>{X.preventDefault(),X.stopPropagation(),navigator.clipboard.writeText(C.url).then(()=>{v.playClick(),!Q&&ie&&Ii(C,ie),te(je("linkCopiedToast"))}).catch(()=>{v.playError(),te(je("copyFailedToast"),{error:!0})})},Y.appendChild(W),Y.appendChild(le),Y.appendChild(se),Y}w.addEventListener("input",C=>{t=C.target.value,E()});function R(){a=!Xe(n),a?Te():qe(),Be(a,n,"cw-btn-links")}return document.body.appendChild(n),F(),E(),Rs(()=>{F(),E(),G()}),Ae(()=>{c&&(c.textContent=je("headerTitle"));let C=n.querySelector(".cw-help-title");C&&(C.textContent=je("headerTitle"));let z=n.querySelector(".cw-help-description");z&&(z.textContent=je("headerDesc")),w.placeholder=je("searchPlaceholder"),F(),E(),G(),i&&b()}),R}var js=60*1e3,$i="cw_read_broadcasts",Oi={pt:{headerTitle:"Central de Avisos",headerDesc:"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",searchPlaceholder:"Buscar avisos\u2026",clearSearch:"Limpar a busca",markRead:e=>`Marcar \u201C${e}\u201D como lido`,markReadShort:"Marcar como lido",publishedBy:e=>`Publicado por ${e}`,system:"Sistema",bauAvailability:"Disponibilidade BAU",attention:"aten\xE7\xE3o",full:"total",noDates:"sem datas publicadas",asideLabel:"Estado da opera\xE7\xE3o",filtersTitle:"Filtrar por tipo",filterAll:"Todos",readTitle:"Leitura",readCount:e=>e===1?"1 lido":`${e} lidos`,markAllRead:"Marcar tudo como lido",updatedAgo:e=>`Atualizado ${e}`,swapTo:e=>`Ver disponibilidade de ${e}`,justNow:"agora",minutesAgo:e=>`h\xE1 ${e} min`,hoursAgo:e=>`h\xE1 ${e} h`,yesterday:"ontem",nothingFound:"Nada encontrado.",allRead:"Tudo lido!",history:e=>`Hist\xF3rico (${e})`,typeLabel:{info:"Info",critical:"Alerta",success:"Sucesso"},syncing:"Sincronizando\u2026",updated:"Atualizado",offline:"Sem conex\xE3o \u2014 mostrando o que j\xE1 estava aqui"},es:{headerTitle:"Central de Avisos",headerDesc:"Comunicaci\xF3n oficial de la operaci\xF3n.",searchPlaceholder:"Buscar avisos\u2026",clearSearch:"Limpiar la b\xFAsqueda",markRead:e=>`Marcar \u201C${e}\u201D como le\xEDdo`,markReadShort:"Marcar como le\xEDdo",publishedBy:e=>`Publicado por ${e}`,system:"Sistema",bauAvailability:"Disponibilidad BAU",attention:"atenci\xF3n",full:"total",noDates:"sin fechas publicadas",asideLabel:"Estado de la operaci\xF3n",filtersTitle:"Filtrar por tipo",filterAll:"Todos",readTitle:"Lectura",readCount:e=>e===1?"1 le\xEDdo":`${e} le\xEDdos`,markAllRead:"Marcar todo como le\xEDdo",updatedAgo:e=>`Actualizado ${e}`,swapTo:e=>`Ver disponibilidad de ${e}`,justNow:"ahora",minutesAgo:e=>`hace ${e} min`,hoursAgo:e=>`hace ${e} h`,yesterday:"ayer",nothingFound:"No se encontr\xF3 nada.",allRead:"\xA1Todo le\xEDdo!",history:e=>`Historial (${e})`,typeLabel:{info:"Info",critical:"Alerta",success:"\xC9xito"},syncing:"Sincronizando\u2026",updated:"Actualizado",offline:"Sin conexi\xF3n \u2014 mostrando lo que ya estaba aqu\xED"}};function he(e){let t=de();return Oi[t]?.[e]??Oi.pt[e]}var Fa={PT:{label:"PT-BR",flag:'<svg class="cw-bc-bau-flag" viewBox="0 0 21 15" aria-hidden="true"><rect width="21" height="15" fill="#009B3A"/><path d="M10.5 1.9 19.1 7.5 10.5 13.1 1.9 7.5Z" fill="#FEDF00"/><circle cx="10.5" cy="7.5" r="3.3" fill="#002776"/></svg>'},ES:{label:"ES",flag:'<svg class="cw-bc-bau-flag" viewBox="0 0 21 15" aria-hidden="true"><rect width="21" height="15" fill="#AA151B"/><rect y="3.75" width="21" height="7.5" fill="#F1BF00"/></svg>'}},Gs='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="17 2 21 6 17 10"></polyline><path d="M3 12V10a4 4 0 0 1 4-4h14"></path><polyline points="7 22 3 18 7 14"></polyline><path d="M21 12v2a4 4 0 0 1-4 4H3"></path></svg>',Eo={critical:!0,info:!0,success:!0};function Hs(){if(document.getElementById("cw-broadcast-styles"))return;let e=document.createElement("style");e.id="cw-broadcast-styles",e.textContent=`
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
    `,document.head.appendChild(e)}var Us={pt:"pt-BR",es:"es-ES"};function Pi(e){if(!e)return"";try{let t=new Date(e);return isNaN(t.getTime())?String(e):new Intl.DateTimeFormat(Us[de()]||"pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(t)}catch{return String(e)}}function Vs(e){let t=String(e||"").split("-");return t.length===3?`${t[2]}/${t[1]}`:String(e||"")}function Ws(e){let t=new Date(e).getTime();if(!t||isNaN(t))return"";let a=Math.floor((Date.now()-t)/6e4);if(a<1)return he("justNow");if(a<60)return he("minutesAgo")(a);let o=Math.floor(a/60);return o<24?he("hoursAgo")(o):o<48?he("yesterday"):Pi(e).split(",")[0]}function Mi(e){if(!e||typeof e!="string")return"";let t=e;return t=t.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" class="cw-bc-link">$1</a>'),t=t.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),t=t.replace(/_(.*?)_/g,"<i>$1</i>"),t=t.replace(/\n/g,"<br>"),t=mn(t),t}function Di(e){if(!e)return null;let t={};try{t=JSON.parse(e.value||"{}")}catch{return null}let a=String(t.title||e.label||"").trim(),o=String(t.text||"").trim();return!a||!o?null:{id:String(e.key||e.id||""),type:Eo[t.type]?t.type:"info",title:a,text:o,date:String(t.publishedAt||e.publishedAt||""),author:String(t.author||e.publishedBy||""),lang:String(e.lang||"ALL").toUpperCase()}}function Ys(e){if(!e)return null;let t=String(e.title||"").trim(),a=String(e.text||"").trim();return!t||!a||t.toLowerCase().includes("disponibilidade bau")?null:{id:String(e.id||""),type:Eo[e.type]?e.type:"info",title:t,text:a,date:String(e.date||""),author:String(e.author||""),lang:"ALL"}}function Fi(e){let t=(e||[])[0];if(!t)return null;let a={};try{a=JSON.parse(t.value||"{}")}catch{return null}let o=a.segments||{},i={};return Object.keys(o).forEach(n=>{let r=String(o[n]?.attention||""),l=String(o[n]?.full||"");(r||l)&&(i[n]={attention:r,full:l})}),Object.keys(i).length?{updatedAt:String(a.updatedAt||t.publishedAt||""),author:String(a.author||t.publishedBy||""),note:String(a.note||""),segments:i}:null}function zi(e,t){return e.lang==="ALL"||e.lang===t}function Vt(){try{let e=JSON.parse(localStorage.getItem($i)||"[]");return Array.isArray(e)?e:[]}catch{return[]}}function Ri(e){try{localStorage.setItem($i,JSON.stringify(e))}catch{}}function Bi(){let e="v5.0",t=!1,a=null,o="",i=null,n=null,r=!1,l=[],c=null,m=null,p=null,f=null;Hs();let u=document.createElement("div");u.id="broadcast-popup",u.classList.add("cw-module-window"),Object.assign(u.style,We,{right:"auto",left:"50%",width:"760px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",overflow:"hidden"});let g={popup:u,googleLine:null};function k(){if(t=!Xe(u),Be(t,u,"cw-btn-broadcast"),t){Te();let D=document.getElementById("cw-btn-broadcast");D&&D.classList.remove("has-new"),i=null,n=null,r=!1,z()}else qe()}let w=Pe(u,he("headerTitle"),e,he("headerDesc"),g,()=>k()),S=w.querySelector("span");u.appendChild(w);let I=document.createElement("div");I.className="cw-bc-search-wrap";let A=document.createElement("div");A.className="cw-bc-search-icon",A.setAttribute("aria-hidden","true"),A.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';let _=document.createElement("input");_.className="cw-bc-search-input no-drag",_.type="search",_.name="cw-broadcast-search",_.autocomplete="off",_.spellcheck=!1,_.placeholder=he("searchPlaceholder"),_.setAttribute("aria-label",he("searchPlaceholder"));let b=document.createElement("button");b.type="button",b.className="cw-bc-search-clear",b.setAttribute("aria-label",he("clearSearch")),b.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';let M=document.createElement("div");M.className="cw-bc-search-field",M.append(A,_,b),I.appendChild(M),u.appendChild(I),_.addEventListener("input",D=>{o=D.target.value,b.classList.toggle("visible",o.length>0),ce()}),b.onclick=()=>{_.value="",o="",b.classList.remove("visible"),ce(),_.focus()};let F=document.createElement("div");F.className="cw-bc-body",u.appendChild(F);let H=document.createElement("div");H.className="cw-nice-scroll cw-bc-feed",H.setAttribute("role","feed"),H.setAttribute("aria-label",he("headerTitle")),F.appendChild(H);let B=document.createElement("aside");B.className="cw-nice-scroll cw-bc-aside",B.setAttribute("aria-label",he("asideLabel")),F.appendChild(B);let G=document.createElement("div");G.id="cw-bau-widget",G.className="cw-bc-panel",G.style.display="none",B.appendChild(G);let E=document.createElement("div");E.className="cw-bc-panel",B.appendChild(E);let T=document.createElement("div");T.className="cw-bc-panel",B.appendChild(T);let R=document.createElement("div");R.id="cw-update-status",R.className="cw-bc-sync",R.setAttribute("role","status"),R.setAttribute("aria-live","polite"),B.appendChild(R);function C({syncing:D=!1,online:U=!0}={}){if(R.classList.toggle("offline",!D&&!U),D){R.innerHTML=`<span class="cw-bc-spinner" aria-hidden="true"></span><span>${he("syncing")}</span>`;return}let ne=f?Ws(f):"",s=U?ne?he("updatedAgo")(ne):he("updated"):he("offline");R.innerHTML=`<span class="cw-bc-sync-dot" aria-hidden="true"></span><span>${s}</span>`}async function z(){C({syncing:!0});let D=!0,U=ea();try{let[ne,s]=await Promise.all([me.fetchContentModule("broadcast"),me.fetchContentModule("bau_availability")]);if(Array.isArray(ne)){let y=ne.map(Di).filter(Boolean).filter(L=>zi(L,U));l=ie(y)}else D=!1;c=Fi(s)}catch{D=!1}D&&(f=new Date().toISOString()),Q(),Y(),ce(),C({online:D})}function Q(){let D=c?c.updatedAt:null;if(!(m===null)&&!t){let ne=Vt();(l.some(L=>!m.has(L.id)&&!ne.includes(L.id))||D&&D!==p)&&v.playNotification()}m=new Set(l.map(ne=>ne.id)),p=D}function ie(D){return D.slice().sort((U,ne)=>{let s=new Date(U.date).getTime()||0;return(new Date(ne.date).getTime()||0)-s})}function Y(){let D=document.getElementById("cw-btn-broadcast");if(!D)return;let U=Vt();if(l.some(s=>!U.includes(s.id))){if(D.classList.add("has-new"),!D.querySelector(".cw-badge")){let s=document.createElement("div");s.className="cw-badge",Object.assign(s.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),D.appendChild(s)}}else{D.classList.remove("has-new");let s=D.querySelector(".cw-badge");s&&s.remove()}}function re(){if(!c){G.style.display="none",G.innerHTML="";return}let D=Object.keys(Fa).filter(h=>c.segments[h]);if(!D.length){G.style.display="none",G.innerHTML="";return}let U=i&&D.includes(i)?i:D.includes(ea())?ea():D[0],ne=Fa[U],s=c.segments[U]||{},y=(h,$)=>`
          <span class="cw-bc-bau-date ${h}">
              <span class="cw-bc-bau-dot"></span>
              <span class="cw-bc-bau-kind">${he(h)}</span>
              <span class="cw-bc-bau-value">${Vs($)}</span>
          </span>`,L=[s.attention?y("attention",s.attention):"",s.full?y("full",s.full):""].join(""),J=D.find(h=>h!==U),d=J?`<button class="cw-bc-bau-swap" type="button"
                     aria-label="${he("swapTo")(Fa[J].label)}"
                     title="${he("swapTo")(Fa[J].label)}">${Gs}</button>`:"";G.style.display="flex",G.innerHTML=`
          <div class="cw-bc-bau-top">
              ${ne.flag}
              <span class="cw-bc-bau-label">${he("bauAvailability")}</span>
              <span class="cw-bc-bau-seg">${ne.label}</span>
              ${d}
          </div>
          <div class="cw-bc-bau-dates">
              ${L||`<span class="cw-bc-bau-empty">${he("noDates")}</span>`}
          </div>
          ${c.note?`<div class="cw-bc-bau-note">${Mi(c.note)}</div>`:""}
      `;let x=G.querySelector(".cw-bc-bau-swap");x&&(x.onclick=()=>{i=J,v.playClick(),re()})}function W(){let D={critical:0,info:0,success:0};l.forEach(s=>{D[s.type]=(D[s.type]||0)+1});let U=(s,y,L)=>`
          <button class="cw-bc-filter" type="button" data-tipo="${s}"
                  aria-pressed="${n===s}">
              ${s==="all"?"":`<span class="cw-bc-type-dot ${s}"></span>`}
              <span>${y}</span>
              <span class="cw-bc-filter-count">${L}</span>
          </button>`;E.innerHTML=`
          <div class="cw-bc-panel-title">${he("filtersTitle")}</div>
          <div class="cw-bc-filters">
              ${U("all",he("filterAll"),l.length)}
              ${Object.keys(D).map(s=>U(s,he("typeLabel")[s],D[s])).join("")}
          </div>
      `,E.querySelectorAll(".cw-bc-filter").forEach(s=>{s.onclick=()=>{let y=s.dataset.tipo;n=y==="all"||y===n?null:y,v.playClick(),ce()}});let ne=E.querySelector('[data-tipo="all"]');ne&&ne.setAttribute("aria-pressed",String(n===null))}function le(){let D=Vt(),U=l.filter(s=>D.includes(s.id)).length,ne=l.length-U;T.innerHTML=`
          <div class="cw-bc-panel-title">${he("readTitle")}</div>
          <button class="cw-bc-history-divider" type="button"
                  aria-expanded="${r}" aria-controls="cw-bc-history">
              <span>${he("readCount")(U)}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <button class="cw-bc-clear-btn" type="button" ${ne?"":"disabled"}>
              ${he("markAllRead")}
          </button>
      `,T.querySelector(".cw-bc-history-divider").onclick=()=>{v.playClick(),r=!r,ce()},T.querySelector(".cw-bc-clear-btn").onclick=()=>{ne&&(v.playSuccess(),Ri(l.map(s=>s.id)),ce(),Y())}}let O=0;function ee(D,U){let ne=document.createElement("article");ne.className="cw-bc-card"+(U?" history":"");let s=Eo[D.type]?D.type:"info",y=`cw-bc-title-${++O}`;ne.setAttribute("aria-labelledby",y);let L=document.createElement("div");if(L.className="cw-bc-card-meta",L.innerHTML=`
        <span class="cw-bc-type">
            <span class="cw-bc-type-dot ${s}"></span>${he("typeLabel")[s]}
        </span>
        <span class="cw-bc-meta-sep" aria-hidden="true">\xB7</span>
        <span class="cw-bc-date-tag">${Pi(D.date)}</span>
    `,!U){let h=document.createElement("button");h.type="button",h.className="cw-bc-dismiss-btn",h.setAttribute("aria-label",he("markRead")(D.title)),h.title=he("markReadShort"),h.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>',h.onclick=$=>{$.stopPropagation(),v.playClick(),ne.style.transform="translateX(20px)",ne.style.opacity="0",setTimeout(()=>{let P=Vt();P.push(D.id),Ri(P),ce(),Y()},300)},L.appendChild(h)}let J=document.createElement("h3");J.className="cw-bc-msg-title",J.id=y,J.textContent=D.title;let d=document.createElement("div");d.className="cw-bc-msg-body",d.innerHTML=Mi(D.text);let x=document.createElement("div");return x.className="cw-bc-msg-author",x.textContent=he("publishedBy")(D.author||he("system")),ne.append(L,J,d,x),ne}function se(D,U){return n&&D.type!==n?!1:U?`${D.title||""} ${D.text||""}`.toLowerCase().includes(U):!0}function X(D,U){let ne=D.filter(y=>!U.includes(y.id)),s=D.filter(y=>U.includes(y.id));if(!ne.length&&!(r&&s.length)){let y=o.trim().length>0||n!==null,L=document.createElement("div");L.className="cw-bc-empty",L.innerHTML=y?`<div>${he("nothingFound")}</div>`:`
               <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
               <div>${he("allRead")}</div>
              `,H.appendChild(L);return}if(ne.forEach(y=>H.appendChild(ee(y,!1))),r&&s.length){let y=document.createElement("div");y.className="cw-bc-history-container",y.id="cw-bc-history",y.style.display="flex",s.forEach(L=>y.appendChild(ee(L,!0))),H.appendChild(y)}}function ce(){re(),W(),le(),H.innerHTML="";let D=Vt(),U=o.trim().toLowerCase();X(l.filter(ne=>se(ne,U)),D)}let q=me.getCachedContent("broadcast");Array.isArray(q)&&q.length?l=ie(q.map(Di).filter(Boolean).filter(D=>zi(D,ea()))):l=ie(me.getCachedBroadcasts().map(Ys).filter(Boolean)),c=Fi(me.getCachedContent("bau_availability")),ce(),z(),a||(a=setInterval(z,js));let j=document.createElement("div");Object.assign(j.style,dt),j.className="no-drag",u.appendChild(j),pt(u,j),document.body.appendChild(u);let ae=l.some(D=>!Vt().includes(D.id));return Ae(()=>{S&&(S.textContent=he("headerTitle"));let D=u.querySelector(".cw-help-title");D&&(D.textContent=he("headerTitle"));let U=u.querySelector(".cw-help-description");U&&(U.textContent=he("headerDesc")),_.placeholder=he("searchPlaceholder"),_.setAttribute("aria-label",he("searchPlaceholder")),b.setAttribute("aria-label",he("clearSearch")),H.setAttribute("aria-label",he("headerTitle")),B.setAttribute("aria-label",he("asideLabel")),ce(),C({online:!0})}),{toggle:k,hasUnread:ae}}var ji="cw-wizard-shell-styles",Gi={pt:{back:"Voltar",skip:"Pular",next:"Pr\xF3ximo",done:"Concluir",dotsGroup:"Navega\xE7\xE3o entre os slides",report:"Reportar bug ou sugest\xE3o",slideLabel:(e,t)=>`Slide ${e} de ${t}`,announce:(e,t,a,o)=>`Slide ${e} de ${t}: ${a}. ${o}`},es:{back:"Volver",skip:"Omitir",next:"Siguiente",done:"Finalizar",dotsGroup:"Navegaci\xF3n entre las diapositivas",report:"Reportar error o sugerencia",slideLabel:(e,t)=>`Diapositiva ${e} de ${t}`,announce:(e,t,a,o)=>`Diapositiva ${e} de ${t}: ${a}. ${o}`}};function qt(e){let t=de();return Gi[t]?.[e]??Gi.pt[e]}var Hi=160,Ao=320,Xs=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function Ks(){if(document.getElementById(ji))return;let e=document.createElement("style");e.id=ji,e.textContent=`
        .cw-wiz-overlay {
            --cw-wiz-swap: ${Hi}ms;
            --cw-wiz-shell: ${Ao}ms;

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
    `,document.head.appendChild(e)}var Js='button:not([hidden]):not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';function za({slides:e,idPrefix:t,badge:a=null,nextLabel:o=null,finalLabel:i=null,skipLabel:n=null,onSkip:r=null,onClose:l=()=>{}}){let c={next:o||qt("next"),final:i||qt("done"),skip:n};if(!Array.isArray(e)||e.length===0)return console.warn("[wizard-shell] chamado sem slides; nada a mostrar."),{close:()=>{}};Ks();let m=`${t}-title`,p=`${t}-text`,f=document.activeElement,u=0,g=!1,k=null,w=document.createElement("div");w.className="cw-wiz-overlay",w.setAttribute("role","dialog"),w.setAttribute("aria-modal","true"),w.setAttribute("aria-labelledby",m),w.setAttribute("aria-describedby",p);let S=document.createElement("div");if(S.className="cw-wiz-card",a){let O=document.createElement("div");O.className="cw-wiz-badge",O.textContent=a,S.appendChild(O)}let I=document.createElement("div");I.className="cw-wiz-stage";let A=document.createElement("div");A.className="cw-wiz-icon",A.setAttribute("aria-hidden","true");let _=document.createElement("div");_.className="cw-wiz-title",_.id=m;let b=document.createElement("div");b.className="cw-wiz-text",b.id=p,I.appendChild(A),I.appendChild(_),I.appendChild(b);let M=document.createElement("div");M.className="cw-wiz-live",M.setAttribute("aria-live","polite"),M.setAttribute("aria-atomic","true");let F=document.createElement("div");F.className="cw-wiz-dots",F.setAttribute("role","group"),F.setAttribute("aria-label",qt("dotsGroup"));let H=document.createElement("div");H.className="cw-wiz-actions";let B=document.createElement("button");B.type="button",B.className="cw-wiz-btn cw-wiz-btn-ghost",B.textContent=qt("back");let G=document.createElement("button");G.type="button",G.className="cw-wiz-skip",G.textContent=n||qt("skip"),n||(G.hidden=!0);let E=document.createElement("button");E.type="button",E.className="cw-wiz-btn cw-wiz-btn-primary",H.appendChild(B),H.appendChild(E),n&&(S.classList.add("has-skip"),S.appendChild(G)),S.appendChild(I),S.appendChild(M),S.appendChild(F),S.appendChild(H);let T=document.createElement("div");T.className="cw-wiz-footer";let R=document.createElement("a");R.href=$t,R.target="_blank",R.rel="noopener noreferrer",R.textContent=qt("report");let C=document.createElement("span");C.textContent="\xB7",C.style.opacity="0.5",C.setAttribute("aria-hidden","true");let z=document.createElement("span");z.append(de()==="es"?"creado por ":"criado por ");let Q=document.createElement("span");Q.className="cw-wiz-credit-name",Q.textContent=ct,z.appendChild(Q),T.append(R,C,z),S.appendChild(T),w.appendChild(S);let ie=e.map((O,ee)=>{let se=document.createElement("button");return se.type="button",se.className="cw-wiz-dot",se.setAttribute("aria-label",qt("slideLabel")(ee+1,e.length)),se.onmouseenter=()=>v.playHover(),se.onclick=()=>{ee!==u&&(v.playClick(),re(ee))},F.appendChild(se),se});function Y(O){let ee=e[O];A.textContent=ee.icon||"",_.textContent=ee.title||"",b.textContent=ee.text||"",ie.forEach((X,ce)=>{X.classList.toggle("active",ce===O),X.setAttribute("aria-current",ce===O?"true":"false")});let se=O===e.length-1;E.textContent=se?c.final:c.next,B.hidden=O===0,G.hidden=!n||se,M.textContent=qt("announce")(O+1,e.length,ee.title,ee.text)}function re(O){if(g||O===u||O<0||O>=e.length)return;let ee=O>u?"swapping-next":"swapping-prev";if(u=O,Xs()){Y(O);return}clearTimeout(k),I.classList.add(ee),k=setTimeout(()=>{Y(O),I.classList.remove("swapping-next","swapping-prev")},Hi)}function W({silent:O=!1}={}){g||(g=!0,clearTimeout(k),document.removeEventListener("keydown",le,!0),w.classList.add("closing"),w.classList.remove("open"),S.style.willChange="opacity, transform",O||v.playSuccess(),setTimeout(()=>{if(w.remove(),qe(),f&&document.contains(f))try{f.focus({preventScroll:!0})}catch{}l()},Ao))}function le(O){if(!g){if(O.key==="Tab"){let ee=Array.from(S.querySelectorAll(Js)).filter(ce=>!ce.hidden&&ce.offsetParent!==null);if(ee.length===0)return;let se=ee[0],X=ee[ee.length-1];O.shiftKey&&document.activeElement===se?(O.preventDefault(),X.focus()):!O.shiftKey&&document.activeElement===X&&(O.preventDefault(),se.focus());return}if(O.key==="Enter"){if(document.activeElement&&document.activeElement.classList.contains("cw-wiz-dot"))return;O.preventDefault(),O.stopPropagation(),E.click()}else O.key==="Escape"?(O.preventDefault(),O.stopPropagation(),G.hidden?W():G.click()):O.key==="ArrowRight"?(O.preventDefault(),u<e.length-1&&(v.playClick(),re(u+1))):O.key==="ArrowLeft"&&(O.preventDefault(),u>0&&(v.playClick(),re(u-1)))}}return[B,G,E].forEach(O=>{O.onmouseenter=()=>v.playHover()}),E.onclick=()=>{v.playClick(),u<e.length-1?re(u+1):W()},B.onclick=()=>{v.playClick(),re(u-1)},G.onclick=async()=>{v.playClick(),!(typeof r=="function"&&!await r())&&W({silent:!0})},document.body.appendChild(w),Te(),Y(0),S.style.willChange="opacity, transform",requestAnimationFrame(()=>{w.classList.add("open")}),setTimeout(()=>{S.style.removeProperty("will-change"),E.focus({preventScroll:!0})},Ao),document.addEventListener("keydown",le,!0),{close:W}}var Ui="cw_onboarding_seen_v1",Vi={pt:[{icon:"\u{1F680}",title:"Bem-vindo ao Case Wizard",text:"Uma camada de produtividade que roda por cima do CRM. Ela n\xE3o substitui nada do que voc\xEA j\xE1 usa \u2014 s\xF3 tira o trabalho repetitivo do caminho."},{icon:"\u2328\uFE0F",title:"Tudo come\xE7a em dois lugares",text:"A p\xEDlula flutuante, sempre no canto da tela, abre qualquer m\xF3dulo com um clique. E Ctrl+K (ou \u2318K) abre a paleta de comandos: digite o que quer e v\xE1 direto, sem tirar a m\xE3o do teclado."},{icon:"\u{1F4DD}",title:"Notas e BAU sem retrabalho",text:"O Case Notes monta a nota t\xE9cnica do caso a partir do status e das tasks que voc\xEA marcar. O BAU Form cuida das solicita\xE7\xF5es de cria\xE7\xE3o e descarte, passo a passo."},{icon:"\u{1F4AC}",title:"Na hora de falar com o cliente",text:"O Email Assistant sugere templates que leem o contexto do caso, e o Call Script te guia pela chamada com um roteiro interativo \u2014 sem script decorado."},{icon:"\u{1F4DA}",title:"Seu material e o do time",text:'Minha Biblioteca guarda seus snippets e respostas prontas. A Central de Links re\xFAne SOPs e ferramentas, os Avisos trazem disponibilidade BAU, e os Fusos Hor\xE1rios respondem "que horas s\xE3o pra ele agora?".'},{icon:"\u{1F6DF}",title:"Nada se perde",text:"O que voc\xEA digita \xE9 salvo sozinho a cada poucos segundos, e d\xE1 pra estacionar um caso no meio e retomar de onde parou. Fechar a aba sem querer n\xE3o custa mais nada. Bom trabalho!"}],es:[{icon:"\u{1F680}",title:"Bienvenido a Case Wizard",text:"Una capa de productividad que funciona sobre el CRM. No reemplaza nada de lo que ya usas \u2014 solo quita el trabajo repetitivo del camino."},{icon:"\u2328\uFE0F",title:"Todo empieza en dos lugares",text:"La p\xEDldora flotante, siempre en la esquina de la pantalla, abre cualquier m\xF3dulo con un clic. Y Ctrl+K (o \u2318K) abre la paleta de comandos: escribe lo que buscas y ve directo, sin soltar el teclado."},{icon:"\u{1F4DD}",title:"Notas y BAU sin rehacer trabajo",text:"Case Notes arma la nota t\xE9cnica del caso a partir del estado y de las tareas que marques. BAU Form se encarga de las solicitudes de creaci\xF3n y descarte, paso a paso."},{icon:"\u{1F4AC}",title:"A la hora de hablar con el cliente",text:"Email Assistant sugiere plantillas que leen el contexto del caso, y Call Script te gu\xEDa por la llamada con un guion interactivo \u2014 sin nada memorizado."},{icon:"\u{1F4DA}",title:"Tu material y el del equipo",text:'Mi Biblioteca guarda tus fragmentos y respuestas listas. La Central de Enlaces re\xFAne SOPs y herramientas, los Avisos traen la disponibilidad BAU, y las Zonas Horarias responden "\xBFqu\xE9 hora es para \xE9l ahora?".'},{icon:"\u{1F6DF}",title:"Nada se pierde",text:"Lo que escribes se guarda solo cada pocos segundos, y puedes aparcar un caso a mitad de camino y retomarlo donde lo dejaste. Cerrar la pesta\xF1a sin querer ya no cuesta nada. \xA1Buen trabajo!"}]},Wi={pt:{next:"Pr\xF3ximo",start:"Come\xE7ar \u{1F680}",skip:"Pular",skipConfirm:"Pular a apresenta\xE7\xE3o? Voc\xEA pode explorar tudo pelo menu flutuante.",readyToast:"Tudo pronto! Use o menu flutuante ou Ctrl+K."},es:{next:"Siguiente",start:"Empezar \u{1F680}",skip:"Omitir",skipConfirm:"\xBFOmitir la presentaci\xF3n? Puedes explorar todo desde el men\xFA flotante.",readyToast:"\xA1Todo listo! Usa el men\xFA flotante o Ctrl+K."}};function Yi(){if(localStorage.getItem(Ui))return;localStorage.setItem(Ui,"true");let e=de(),t=Vi[e]||Vi.pt,a=Wi[e]||Wi.pt;za({slides:t,idPrefix:"cw-onboarding",nextLabel:a.next,finalLabel:a.start,skipLabel:a.skip,onSkip:()=>De(a.skipConfirm),onClose:()=>te(a.readyToast)})}var Ra={version:"v6.3.3",title:"Case Wizard v6.3.3",slides:[{icon:"\u{1F4E7}",title:"O AM agora vem como e-mail \u2014 e vem vazio quando n\xE3o d\xE1 para ter certeza",text:"O campo Account Manager passou a trazer o e-mail do AM, n\xE3o o nome: \xE9 o que a lideran\xE7a usa para acionar a pessoa a partir do painel dela, e um nome pr\xF3prio n\xE3o diz qual LDAP \xE9. Junto, o assistente parou de chutar: quando o case log n\xE3o deixa claro quem \xE9 o AM, o campo vem em branco em vez de preenchido com o primeiro contato da conta \u2014 que era sempre o mesmo em todos os casos daquele anunciante. Se vier vazio, preencha; o campo aceita s\xF3 e-mail."},{icon:"\u{1F4BE}",title:"Editar a sugest\xE3o de descarte agora salva de verdade",text:'No Passo 3, a resposta para "o caso deve ser descartado pelo TL?" podia ser alterada na edi\xE7\xE3o de um caso j\xE1 enviado, mas a mudan\xE7a n\xE3o chegava \xE0 lideran\xE7a: o TL continuava vendo o que foi gravado no envio original. Agora ela \xE9 gravada, e ao reabrir um caso para editar o campo j\xE1 vem marcado com o que est\xE1 valendo.'}]};var Pa="cw_last_version",Xi={pt:{updateBadge:e=>`Atualiza\xE7\xE3o ${e}`,nextBtn:"Pr\xF3ximo",doneBtn:"Entendi, vamos l\xE1! \u{1F44D}",updatedToast:e=>`Case Wizard atualizado para ${e}!`},es:{updateBadge:e=>`Actualizaci\xF3n ${e}`,nextBtn:"Siguiente",doneBtn:"\xA1Entendido, vamos! \u{1F44D}",updatedToast:e=>`\xA1Case Wizard actualizado a ${e}!`}};function $a(e){let t=de();return Xi[t]?.[e]??Xi.pt[e]}function Ki(e){let t=localStorage.getItem(Pa);if(!t){localStorage.setItem(Pa,e);return}if(t!==e){if(Ra.version!==e){console.warn(`[changelog] APP_VERSION \xE9 ${e} mas RELEASE_NOTES.version \xE9 ${Ra.version}. Modal suprimido at\xE9 os dois baterem (veja src/modules/changelog/changelog-data.js).`),localStorage.setItem(Pa,e);return}Zs(e)}}function Zs(e){za({slides:Ra.slides,idPrefix:"cw-changelog",badge:$a("updateBadge")(e),nextLabel:$a("nextBtn"),finalLabel:$a("doneBtn"),onClose:()=>{localStorage.setItem(Pa,e),te($a("updatedToast")(e))}})}var Dt=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"br",name:"Brasil \u2014 Bras\xEDlia",flag:"\u{1F1E7}\u{1F1F7}",zone:"America/Sao_Paulo",label:"S\xE3o Paulo",region:"sa",home:!0},{id:"br-am",name:"Brasil \u2014 Amazonas",flag:"\u{1F1E7}\u{1F1F7}",zone:"America/Manaus",label:"Manaus",region:"sa",home:!0},{id:"br-ac",name:"Brasil \u2014 Acre",flag:"\u{1F1E7}\u{1F1F7}",zone:"America/Rio_Branco",label:"Rio Branco",region:"sa",home:!0},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"us-et",name:"EUA \u2014 Eastern",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/New_York",label:"Nova York",region:"us"},{id:"us-ct",name:"EUA \u2014 Central",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Chicago",label:"Chicago",region:"us"},{id:"us-mt",name:"EUA \u2014 Mountain",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Denver",label:"Denver",region:"us"},{id:"us-az",name:"EUA \u2014 Arizona",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Phoenix",label:"Phoenix",region:"us"},{id:"us-pt",name:"EUA \u2014 Pacific",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Los_Angeles",label:"Los Angeles",region:"us"},{id:"us-ak",name:"EUA \u2014 Alaska",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Anchorage",label:"Anchorage",region:"us"},{id:"us-hi",name:"EUA \u2014 Hava\xED",flag:"\u{1F1FA}\u{1F1F8}",zone:"Pacific/Honolulu",label:"Honolulu",region:"us"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],Lt="America/Sao_Paulo";function Ji(e,t){let a=new Intl.DateTimeFormat("en-US",{timeZone:e,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}),o={};a.formatToParts(t).forEach(n=>{o[n.type]=n.value});let i=Date.UTC(Number(o.year),Number(o.month)-1,Number(o.day),Number(o.hour)%24,Number(o.minute),Number(o.second));return Math.round((i-t.getTime())/6e4)}function Qs(e,t){let a=String(t||"").match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);if(!a)return null;let[,o,i,n,r,l]=a.map(Number),c=Date.UTC(o,i-1,n,r,l),m=Ji(e,new Date(c));return m=Ji(e,new Date(c-m*6e4)),m}function el(e){let t=e<0?"-":"+",a=Math.abs(e),o=String(Math.floor(a/60)).padStart(2,"0"),i=String(a%60).padStart(2,"0");return`${t}${o}:${i}`}function Co(e,t){if(!e)return"";if(/[+-]\d{2}:\d{2}$/.test(e)||/Z$/.test(e))return e;let a=Qs(t,e);return a===null?e:`${e.slice(0,16)}${el(a)}`}var Zi={"brazil/east":"America/Sao_Paulo","brazil/west":"America/Manaus","brazil/acre":"America/Rio_Branco","us/eastern":"America/New_York","us/central":"America/Chicago","us/mountain":"America/Denver","us/arizona":"America/Phoenix","us/pacific":"America/Los_Angeles","us/alaska":"America/Anchorage","us/hawaii":"Pacific/Honolulu","america/argentina/buenos_aires":"America/Argentina/Buenos_Aires","mexico/general":"America/Mexico_City"};function ko(e){let t=String(e||"").trim();if(!t)return null;let a=t.toLowerCase();if(Zi[a])return Zi[a];let o=Dt.find(i=>i.zone.toLowerCase()===a);return o?o.zone:null}var Qi="cw_timezone_pinned",ar={es:{name:"Espa\xF1a"},bo:{name:"Bolivia"},co:{name:"Colombia"},ec:{name:"Ecuador"},py:{name:"Paraguay",label:"Asunci\xF3n"},uy:{name:"Uruguay",label:"Montevideo"},ni:{name:"Nicaragua",label:"Managua"},pr:{name:"Puerto Rico"},gt:{label:"C. de Guatemala"},pa:{label:"C. de Panam\xE1"}};function yt(e){return de()==="es"?ar[e.id]?.name??e.name:e.name}function To(e){return de()==="es"?ar[e.id]?.label??e.label:e.label}var er={pt:{headerDesc:"Monitoramento global e planejamento de chamadas.",tabLive:"Monitoramento",tabPlan:"Planejador",searchPlaceholder:"Buscar cidade ou pa\xEDs...",noLocationFound:"Nenhum local encontrado",unpin:"Desafixar",pin:"Fixar",statusOpen:"Aberto",statusOpening:"Abrindo",statusClosing:"Fechando",statusClosed:"Fechado",whereIsClient:"Onde est\xE1 o cliente?",you:"Voc\xEA",yourTimezone:"Bras\xEDlia (GMT-3)",client:"Cliente",dragToSimulate:"Arraste para simular o hor\xE1rio:",idealBusinessHours:"Hor\xE1rio Comercial Ideal",limitHours:"Hor\xE1rio Limite (Aten\xE7\xE3o)",outOfHours:"Fora de Hor\xE1rio",filters:{all:"Todos",sa:"Am\xE9rica do Sul",us:"Estados Unidos",na:"Norte & Central",eu:"Europa"}},es:{headerDesc:"Monitoreo global y planificaci\xF3n de llamadas.",tabLive:"Monitoreo",tabPlan:"Planificador",searchPlaceholder:"Buscar ciudad o pa\xEDs...",noLocationFound:"No se encontr\xF3 ning\xFAn lugar",unpin:"Desanclar",pin:"Anclar",statusOpen:"Abierto",statusOpening:"Abriendo",statusClosing:"Cerrando",statusClosed:"Cerrado",whereIsClient:"\xBFD\xF3nde est\xE1 el cliente?",you:"T\xFA",yourTimezone:"Brasilia (GMT-3)",client:"Cliente",dragToSimulate:"Arrastra para simular el horario:",idealBusinessHours:"Horario Comercial Ideal",limitHours:"Horario L\xEDmite (Atenci\xF3n)",outOfHours:"Fuera de Horario",filters:{all:"Todos",sa:"Am\xE9rica del Sur",us:"Estados Unidos",na:"Norte y Central",eu:"Europa"}}};function Ce(e){let t=de();return er[t]?.[e]??er.pt[e]}var qo=Dt.filter(e=>!e.home),tr=[{id:"all"},{id:"sa"},{id:"us"},{id:"na"},{id:"eu"}];function tl(){if(document.getElementById("cw-timezone-interactive-styles"))return;let e=document.createElement("style");e.id="cw-timezone-interactive-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function or(){tl();let e="v2.2 Pro",t=!1,a=null,o="mx",i=JSON.parse(localStorage.getItem(Qi)||"[]"),n="",r="all",l=new Date;l.setHours(14,0,0,0);let c={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},m={container:{display:"flex",flexDirection:"column",height:"100%",background:c.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:c.surface,borderBottom:`1px solid ${c.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:c.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:c.primary,borderBottomColor:c.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:c.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:c.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${c.border}`,background:c.surface,color:c.textSub,transition:"all 0.2s"},chipActive:{background:c.primaryBg,color:c.primary,borderColor:c.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:c.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${c.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:c.surface,border:`1px solid ${c.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:c.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},p=document.createElement("div");p.id="timezone-popup",p.classList.add("cw-module-window"),Object.assign(p.style,We,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let f={popup:p},u=Pe(p,"Time Zone Traveler",e,Ce("headerDesc"),f,()=>ie());p.appendChild(u);let g=document.createElement("div");Object.assign(g.style,m.container),p.appendChild(g);let k=document.createElement("div");Object.assign(k.style,m.tabHeader);let w=document.createElement("div");w.textContent=Ce("tabLive"),w.className="tz-tab-btn",w.tabIndex=0,w.setAttribute("role","tab"),Object.assign(w.style,m.tabBtn,m.tabActive);let S=document.createElement("div");S.textContent=Ce("tabPlan"),S.className="tz-tab-btn",S.tabIndex=0,S.setAttribute("role","tab"),Object.assign(S.style,m.tabBtn),[w,S].forEach(Y=>{Y.addEventListener("keydown",re=>{(re.key==="Enter"||re.key===" ")&&(re.preventDefault(),Y.click())})}),k.appendChild(w),k.appendChild(S),g.appendChild(k);let I=document.createElement("div");Object.assign(I.style,m.toolbar);let A=document.createElement("div");Object.assign(A.style,m.searchInputWrapper);let _=document.createElement("div");_.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(_.style,m.searchIcon);let b=document.createElement("input");b.placeholder=Ce("searchPlaceholder"),Object.assign(b.style,m.searchInput),b.onfocus=()=>{b.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",b.style.borderColor="rgba(26,115,232,0.3)"},b.onblur=()=>{b.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",b.style.borderColor="transparent"},b.oninput=Y=>{n=Y.target.value.toLowerCase(),R()},A.appendChild(_),A.appendChild(b),I.appendChild(A);let M=document.createElement("div");Object.assign(M.style,m.chipsRow),tr.forEach(Y=>{let re=document.createElement("div");re.textContent=Ce("filters")[Y.id],re.id=`tz-filter-${Y.id}`,re.className="tz-chip",re.tabIndex=0,re.setAttribute("role","button"),Object.assign(re.style,m.chip),Y.id===r&&Object.assign(re.style,m.chipActive),re.onclick=()=>{v.playClick(),r=Y.id,Array.from(M.children).forEach(W=>{Object.assign(W.style,m.chip)}),Object.assign(re.style,m.chipActive),R()},re.addEventListener("keydown",W=>{(W.key==="Enter"||W.key===" ")&&(W.preventDefault(),re.click())}),M.appendChild(re)}),I.appendChild(M),g.appendChild(I);let F=document.createElement("div");Object.assign(F.style,m.listContainer);let H=document.createElement("style");H.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",g.appendChild(H);let B=document.createElement("div");Object.assign(B.style,m.plannerWrapper,{display:"none"}),g.appendChild(F),g.appendChild(B),w.onclick=()=>G("live"),S.onclick=()=>G("plan");function G(Y){v.playClick(),Y==="live"?(Object.assign(w.style,m.tabActive),Object.assign(S.style,m.tabBtn),S.style.borderBottomColor="transparent",w.setAttribute("aria-selected","true"),S.setAttribute("aria-selected","false"),F.style.display="flex",I.style.display="flex",B.style.display="none",z()):(Object.assign(S.style,m.tabActive),Object.assign(w.style,m.tabBtn),w.style.borderBottomColor="transparent",B.style.display="flex",F.style.display="none",I.style.display="none",Q(),C())}function E(Y){return Y>=9&&Y<17?{color:c.success,bg:c.successBg,label:Ce("statusOpen"),icon:"\u{1F7E2}"}:Y>=8&&Y<9?{color:c.warning,bg:c.warningBg,label:Ce("statusOpening"),icon:"\u{1F7E1}"}:Y>=17&&Y<19?{color:c.warning,bg:c.warningBg,label:Ce("statusClosing"),icon:"\u{1F7E1}"}:{color:c.textSub,bg:"#F1F3F4",label:Ce("statusClosed"),icon:"\u{1F534}"}}function T(Y){i.includes(Y)?i=i.filter(re=>re!==Y):i.push(Y),localStorage.setItem(Qi,JSON.stringify(i)),R(),v.playClick()}function R(){F.innerHTML="";let Y=new Date,re=qo.filter(le=>{let O=yt(le).toLowerCase().includes(n)||To(le).toLowerCase().includes(n),ee=r==="all"||le.region===r;return O&&ee});if(re.sort((le,O)=>{let ee=i.includes(le.id),se=i.includes(O.id);return ee&&!se?-1:!ee&&se?1:yt(le).localeCompare(yt(O))}),re.length===0){F.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">${Ce("noLocationFound")}</div>
                </div>
            `;return}re.forEach(le=>{let O=i.includes(le.id),ee=Y.toLocaleTimeString(de()==="es"?"es-ES":"pt-BR",{timeZone:le.zone,hour:"2-digit",minute:"2-digit"}),se=parseInt(ee.split(":")[0]),X=E(se),ce=se<6||se>18,q=document.createElement("div");q.className="tz-hub-card",q.tabIndex=0,q.setAttribute("role","button"),q.setAttribute("aria-label",`${yt(le)}, ${ee}`),Object.assign(q.style,m.hubCard),O&&Object.assign(q.style,m.hubCardPinned);let j=O?"\u2605":"\u2606",ae=O?"#F9AB00":"#DADCE0";q.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn tz-pin-btn" tabindex="0" role="button" aria-label="${Ce(O?"unpin":"pin")} ${yt(le)}" style="cursor:pointer; font-size:22px; color:${ae}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%;">${j}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${le.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${c.text}; letter-spacing:-0.2px;">${yt(le)}</div>
                        <div style="font-size:12px; color:${c.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${ce?"\u{1F319}":"\u2600\uFE0F"} ${To(le)}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${c.text}; font-family:'Google Sans', sans-serif;">${ee}</div>
                    <div style="font-size:11px; font-weight:600; color:${X.color}; background:${X.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${X.label}
                    </div>
                </div>
            `;let D=q.querySelector(".cw-pin-btn");D.onclick=U=>{U.stopPropagation(),T(le.id)},D.addEventListener("keydown",U=>{(U.key==="Enter"||U.key===" ")&&(U.preventDefault(),U.stopPropagation(),T(le.id))}),q.onclick=()=>{o=le.id,G("plan")},q.addEventListener("keydown",U=>{(U.key==="Enter"||U.key===" ")&&U.target===q&&(U.preventDefault(),q.click())}),F.appendChild(q)});let W=document.createElement("div");W.style.height="20px",W.style.width="100%",F.appendChild(W)}function C(){B.innerHTML="";let Y=document.createElement("div"),re=document.createElement("label");re.textContent=Ce("whereIsClient"),re.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let W=document.createElement("select");Object.assign(W.style,cn),W.style.padding="14px",[...qo].sort((d,x)=>yt(d).localeCompare(yt(x))).forEach(d=>{let x=document.createElement("option");x.value=d.id,x.textContent=`${d.flag} ${yt(d)} (${d.zone})`,d.id===o&&(x.selected=!0),W.appendChild(x)}),W.onchange=d=>{o=d.target.value,J(),v.playClick()},Y.appendChild(re),Y.appendChild(W),B.appendChild(Y);let O=document.createElement("div");Object.assign(O.style,m.timeComparisonRow);let ee=document.createElement("div");Object.assign(ee.style,m.timeCard),ee.style.backgroundColor="#F8FAFF",ee.style.borderColor="#E8F0FE",ee.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} ${Ce("you")}</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">${Ce("yourTimezone")}</div>
        `;let se=document.createElement("div");Object.assign(se.style,m.timeCard),se.style.backgroundColor="#FFF8E1",se.style.borderColor="#FEF7E0",se.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">${Ce("client")}</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,O.appendChild(ee),O.appendChild(se),B.appendChild(O);let X=document.createElement("div");X.id="cw-planner-status",Object.assign(X.style,m.statusBadge),B.appendChild(X);let ce=document.createElement("div");Object.assign(ce.style,{padding:"0 4px",marginTop:"12px"});let q=document.createElement("div");q.textContent=Ce("dragToSimulate"),q.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let j=document.createElement("div");Object.assign(j.style,m.timelineContainer);let ae=document.createElement("div");Object.assign(ae.style,m.timelineTrack);let D=document.createElement("div");Object.assign(D.style,m.dayZone),ae.appendChild(D);let U=document.createElement("input");U.type="range",U.min="0",U.max="1439",U.step="15",U.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let ne=document.createElement("div");ne.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",ne.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",j.appendChild(ae),j.appendChild(U),j.appendChild(ne),ce.appendChild(q),ce.appendChild(j),B.appendChild(ce);let s=ee.querySelector("#cw-time-input-br"),y=se.querySelector("#cw-time-display-client"),L=se.querySelector("#cw-client-label");function J(){let d=qo.find(Z=>Z.id===o);L.textContent=`${d.flag} ${To(d)} (${d.zone})`;let x=l.getHours(),h=l.getMinutes(),$=`${String(x).padStart(2,"0")}:${String(h).padStart(2,"0")}`;s.value=$,U.value=x*60+h;let P=l.toLocaleTimeString(de()==="es"?"es-ES":"pt-BR",{timeZone:d.zone,hour:"2-digit",minute:"2-digit"});y.textContent=P;let oe=parseInt(P.split(":")[0]);oe>=9&&oe<17?(X.style.background=c.successBg,X.style.color=c.success,X.innerHTML=`<span style="font-size:16px">\u2705</span> ${Ce("idealBusinessHours")}`):oe>=8&&oe<9||oe>=17&&oe<19?(X.style.background=c.warningBg,X.style.color=c.warning,X.innerHTML=`<span style="font-size:16px">\u26A0\uFE0F</span> ${Ce("limitHours")}`):(X.style.background=c.errorBg,X.style.color=c.error,X.innerHTML=`<span style="font-size:16px">\u26D4</span> ${Ce("outOfHours")}`)}U.oninput=d=>{let x=parseInt(d.target.value);l.setHours(Math.floor(x/60)),l.setMinutes(x%60),J()},s.oninput=d=>{let[x,h]=d.target.value.split(":");x&&h&&(l.setHours(parseInt(x)),l.setMinutes(parseInt(h)),J())},J()}function z(){R(),a||(a=setInterval(R,6e4))}function Q(){a&&(clearInterval(a),a=null)}function ie(){t=!Xe(p),Be(t,p,"cw-btn-timezone"),t?(Te(),G("live")):(qe(),Q())}return document.body.appendChild(p),Ae(()=>{let Y=p.querySelector(".cw-help-description");Y&&(Y.textContent=Ce("headerDesc")),w.textContent=Ce("tabLive"),S.textContent=Ce("tabPlan"),b.placeholder=Ce("searchPlaceholder"),Array.from(M.children).forEach(re=>{let W=tr.find(le=>`tz-filter-${le.id}`===re.id);W&&(re.textContent=Ce("filters")[W.id])}),F.style.display!=="none"&&R(),B.style.display!=="none"&&C()}),ie}var nr={pt:{headerTitle:"Minha Biblioteca",headerDesc:"Gerencie seus snippets, textos e templates.",tabs:{general:"Geral",note:"Notas",email:"Emails"},searchPlaceholder:"Buscar por t\xEDtulo ou conte\xFAdo...",newItem:"Novo item",cancel:"Cancelar",recentlyUsed:"\u{1F552} Usados recentemente",nothingFound:"Nada encontrado",nothingHereYet:"Nada aqui ainda",noItemMatches:e=>`Nenhum item bate com "${e}" nesta aba.`,clickPlusToStart:"Clique no + para come\xE7ar sua cole\xE7\xE3o.",copy:"Copiar",moreActions:"Mais a\xE7\xF5es",edit:"Editar",delete:"Excluir",deleteConfirm:e=>`Excluir "${e}"?`,itemDeletedToast:"Item exclu\xEDdo.",copiedToast:"Copiado!",titleLabel:"T\xEDtulo / Nome",subjectLabel:"Assunto do Email",contentLabel:"Conte\xFAdo",emailBodyLabel:"Corpo do Email (HTML)",noteTextLabel:"Texto da Nota",editItemTitle:"Editar Item",newItemTitle:"Novo Item",save:"Salvar",saveChanges:"Salvar Altera\xE7\xF5es",saving:"Salvando...",bold:"Negrito",italic:"It\xE1lico",codeFormat:"Formato c\xF3digo",insertImage:"Inserir imagem",imageUrlPrompt:"Cole a URL da imagem:",fillTitleAndContent:"Preencha t\xEDtulo e conte\xFAdo.",subjectRequired:"Assunto \xE9 obrigat\xF3rio para emails.",saveFailedNoUser:"N\xE3o foi poss\xEDvel salvar: usu\xE1rio n\xE3o identificado. Recarregue a p\xE1gina e tente de novo.",savedLocalOnly:"Salvo localmente \u2014 sem conex\xE3o com a nuvem no momento.",savedAndSynced:"Salvo e sincronizado!",saveError:"Erro ao salvar item."},es:{headerTitle:"Mi Biblioteca",headerDesc:"Gestiona tus snippets, textos y plantillas.",tabs:{general:"General",note:"Notas",email:"Emails"},searchPlaceholder:"Buscar por t\xEDtulo o contenido...",newItem:"Nuevo elemento",cancel:"Cancelar",recentlyUsed:"\u{1F552} Usados recientemente",nothingFound:"No se encontr\xF3 nada",nothingHereYet:"Todav\xEDa no hay nada aqu\xED",noItemMatches:e=>`Ning\xFAn elemento coincide con "${e}" en esta pesta\xF1a.`,clickPlusToStart:"Haz clic en + para empezar tu colecci\xF3n.",copy:"Copiar",moreActions:"M\xE1s acciones",edit:"Editar",delete:"Eliminar",deleteConfirm:e=>`\xBFEliminar "${e}"?`,itemDeletedToast:"Elemento eliminado.",copiedToast:"\xA1Copiado!",titleLabel:"T\xEDtulo / Nombre",subjectLabel:"Asunto del Email",contentLabel:"Contenido",emailBodyLabel:"Cuerpo del Email (HTML)",noteTextLabel:"Texto de la Nota",editItemTitle:"Editar Elemento",newItemTitle:"Nuevo Elemento",save:"Guardar",saveChanges:"Guardar Cambios",saving:"Guardando...",bold:"Negrita",italic:"Cursiva",codeFormat:"Formato c\xF3digo",insertImage:"Insertar imagen",imageUrlPrompt:"Pega la URL de la imagen:",fillTitleAndContent:"Completa el t\xEDtulo y el contenido.",subjectRequired:"El asunto es obligatorio para emails.",saveFailedNoUser:"No se pudo guardar: usuario no identificado. Recarga la p\xE1gina e int\xE9ntalo de nuevo.",savedLocalOnly:"Guardado localmente \u2014 sin conexi\xF3n con la nube en este momento.",savedAndSynced:"\xA1Guardado y sincronizado!",saveError:"Error al guardar el elemento."}};function ue(e){let t=de();return nr[t]?.[e]??nr.pt[e]}var Ue={tabs:{general:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',note:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z"></path><path d="M15 3v6h6"></path><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>',email:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'},search:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',clear:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',copy:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',more:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8"></circle><circle cx="12" cy="12" r="1.8"></circle><circle cx="12" cy="19" r="1.8"></circle></svg>',edit:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',delete:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',add:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',back:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',bold:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>',italic:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>',code:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',image:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',media:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',empty:'<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>'},Lo=[{id:"general",icon:Ue.tabs.general},{id:"note",icon:Ue.tabs.note},{id:"email",icon:Ue.tabs.email}],No="cw_lib_recent_v1",ir=4;function al(e){try{let t=JSON.parse(localStorage.getItem(No)||"[]");t=t.filter(a=>a!==e),t.unshift(e),t=t.slice(0,ir*3),localStorage.setItem(No,JSON.stringify(t))}catch(t){console.warn("Erro ao salvar uso recente",t)}}function ol(e){try{let t=JSON.parse(localStorage.getItem(No)||"[]");if(t.length===0)return[];let a=new Map(He.getSnippets(e).map(o=>[o.id,o]));return t.map(o=>a.get(o)).filter(Boolean).slice(0,ir)}catch{return[]}}function nl(){if(document.getElementById("cw-lib-styles-v2"))return;let e=document.createElement("style");e.id="cw-lib-styles-v2",e.textContent=`
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
    `,document.head.appendChild(e)}function rr(){let e="v2.0",t=!1,a="general",o="",i=null,n=null;nl();let r=document.createElement("div");r.id="library-popup",r.classList.add("cw-module-window"),Object.assign(r.style,We,{right:"auto",left:"50%",width:"620px",height:"680px",maxHeight:"90vh",transform:"translateX(-50%) scale(0.05)"});let l={popup:r},c=Pe(r,ue("headerTitle"),e,ue("headerDesc"),l,()=>ce());r.appendChild(c);let m=c.querySelector("span"),p=document.createElement("div");p.className="cw-lib-container",r.appendChild(p);let f=document.createElement("div");f.className="cw-lib-toolbar";let u=document.createElement("div");u.className="cw-lib-search-wrap";let g=document.createElement("div");g.className="cw-lib-search-icon",g.innerHTML=Ue.search;let k=document.createElement("input");k.className="cw-lib-search no-drag",k.placeholder=ue("searchPlaceholder"),k.type="text";let w=document.createElement("div");w.className="cw-lib-search-clear cw-tactile",w.innerHTML=Ue.clear,u.append(g,k,w);let S=document.createElement("div");S.className="cw-lib-tabs",Lo.forEach(q=>{let j=document.createElement("div");j.className="cw-lib-tab"+(q.id===a?" active":""),j.id=`lib-tab-${q.id}`,j.innerHTML=`${q.icon}<span class="js-lib-tab-label">${ue("tabs")[q.id]}</span>`,j.onmouseenter=()=>v.playHover(),j.onclick=()=>C(q.id),S.appendChild(j)}),f.append(u,S),p.appendChild(f);let I=document.createElement("div");I.className="cw-lib-grid",p.appendChild(I);let A=document.createElement("div");A.className="cw-lib-fab cw-tactile",A.title=ue("newItem"),A.innerHTML=Ue.add,A.onclick=()=>le(),p.appendChild(A);let _=document.createElement("div");_.className="cw-lib-sheet";let b=document.createElement("div");b.className="cw-lib-sheet-handle";let M=document.createElement("div");M.className="cw-lib-sheet-head";let F=document.createElement("div");F.className="cw-lib-sheet-back no-drag",F.innerHTML=Ue.back,F.title=ue("cancel"),F.onclick=O;let H=document.createElement("span");H.className="cw-lib-sheet-title",H.textContent=ue("newItemTitle"),M.append(F,H);let B=document.createElement("div");B.className="cw-lib-sheet-body";let G=document.createElement("div");G.className="cw-lib-sheet-foot";let E=document.createElement("button");E.className="cw-lib-save-btn no-drag",E.textContent=ue("save"),E.onclick=ee,G.appendChild(E);let T=document.createElement("div");T.className="cw-lib-loading",T.innerHTML=`<div class="cw-lib-spinner"></div><div class="cw-lib-loading-text js-lib-saving">${ue("saving")}</div>`,_.append(b,M,B,G,T),p.appendChild(_);let R=document.createElement("div");Object.assign(R.style,dt),R.className="no-drag",r.appendChild(R),pt(r,R),document.body.appendChild(r),document.addEventListener("mousedown",q=>{n&&!n.contains(q.target)&&z()});function C(q){v.playClick(),a=q,Lo.forEach(j=>{document.getElementById(`lib-tab-${j.id}`).classList.toggle("active",j.id===q)}),Y()}function z(){if(n){let q=n.querySelector(".cw-lib-menu");q&&q.classList.remove("open"),n.classList.remove("menu-open"),n=null}}function Q(q,j){return j?`${q.title} ${q.content}`.toLowerCase().includes(j):!0}function ie(q){let j=document.createElement("div");j.className="cw-lib-recent-section",j.innerHTML=`<div class="cw-lib-recent-title">${ue("recentlyUsed")}</div>`;let ae=document.createElement("div");return ae.className="cw-lib-recent-row",q.forEach(D=>{let U=document.createElement("div");U.className="cw-lib-recent-chip",U.tabIndex=0,U.setAttribute("role","button"),U.title=D.title,U.innerHTML=`<span>${X(D.title)}</span>`,U.onclick=()=>{v.playClick(),W(D)},U.addEventListener("keydown",ne=>{(ne.key==="Enter"||ne.key===" ")&&(ne.preventDefault(),U.click())}),ae.appendChild(U)}),j.appendChild(ae),j}function Y(){z(),I.innerHTML="";let q=o.trim().toLowerCase(),j=He.getSnippets(a).filter(ae=>Q(ae,q));if(!q){let ae=ol(a);ae.length>0&&I.appendChild(ie(ae))}if(j.length===0){let ae=document.createElement("div");ae.className="cw-lib-empty";let D=q.length>0;ae.innerHTML=`
                <div style="opacity:0.5;">${Ue.empty}</div>
                <div class="cw-lib-empty-title">${ue(D?"nothingFound":"nothingHereYet")}</div>
                <div class="cw-lib-empty-sub">${D?ue("noItemMatches")(o.trim()):ue("clickPlusToStart")}</div>
            `,I.appendChild(ae);return}j.forEach(ae=>I.appendChild(re(ae)))}function re(q){let j=document.createElement("div");j.className="cw-lib-card"+(q.isCode?" is-code":"");let ae=q.content,D="";if(q.isRich){let y=document.createElement("div");y.innerHTML=q.content;let L=!!y.querySelector("img");ae=y.innerText.substring(0,200),L&&(D=`<span class="cw-lib-media-tag">${Ue.media} M\xEDdia</span>`)}let U=[q.isCode?'<span class="cw-lib-badge code">CODE</span>':"",a==="email"?'<span class="cw-lib-badge template">TEMPLATE</span>':""].join("");j.innerHTML=`
            <div class="cw-lib-card-head">
                <div class="cw-lib-card-title">${X(q.title)}</div>
                <div class="cw-lib-card-badges">${U}</div>
            </div>
            ${D}
            <div class="cw-lib-card-preview${q.isCode?" code":""}">${X(ae)}</div>
            <div class="cw-lib-card-foot">
                <div class="cw-lib-icon-btn cw-act-copy cw-tactile" title="${ue("copy")}">${Ue.copy}</div>
                <div class="cw-lib-icon-btn cw-act-more cw-tactile" title="${ue("moreActions")}">${Ue.more}</div>
                <div class="cw-lib-menu">
                    <div class="cw-lib-menu-item cw-act-edit">${Ue.edit} ${ue("edit")}</div>
                    <div class="cw-lib-menu-item danger cw-act-del">${Ue.delete} ${ue("delete")}</div>
                </div>
            </div>
        `,j.querySelector(".cw-act-copy").onclick=y=>{y.stopPropagation(),v.playClick(),W(q)};let ne=j.querySelector(".cw-act-more"),s=j.querySelector(".cw-lib-menu");return ne.onclick=y=>{y.stopPropagation(),v.playClick();let L=s.classList.contains("open");z(),L||(s.classList.add("open"),j.classList.add("menu-open"),n=j)},j.querySelector(".cw-act-edit").onclick=y=>{y.stopPropagation(),v.playClick(),z(),le(q)},j.querySelector(".cw-act-del").onclick=async y=>{y.stopPropagation(),v.playClick(),z(),await De(ue("deleteConfirm")(q.title))&&(He.delete(q.id),Y(),te(ue("itemDeletedToast")))},j}function W(q){if(q.isRich){let j=new Blob([q.content],{type:"text/html"}),ae=document.createElement("div");ae.innerHTML=q.content;let D=new Blob([ae.innerText],{type:"text/plain"});navigator.clipboard.write([new ClipboardItem({"text/html":j,"text/plain":D})])}else navigator.clipboard.writeText(q.content);al(q.id),te(ue("copiedToast"))}function le(q=null){i=q?q.id:null,B.innerHTML="",B.appendChild(se("title",ue("titleLabel"),q?q.title:"")),a==="email"&&B.appendChild(se("subject",ue("subjectLabel"),q?q.subject:""));let j=ue("contentLabel");a==="email"&&(j=ue("emailBodyLabel")),a==="note"&&(j=ue("noteTextLabel")),B.appendChild(se("content",j,q?q.content:"",{isRich:!0,isCode:q?q.isCode:!1})),H.textContent=ue(q?"editItemTitle":"newItemTitle"),E.textContent=ue(q?"saveChanges":"save"),_.classList.add("open"),setTimeout(()=>{let ae=B.querySelector("input");ae&&ae.focus()},500)}function O(){v.playSwoosh(),_.classList.remove("open"),setTimeout(()=>{i=null},500)}async function ee(){T.classList.add("active"),E.disabled=!0;try{let q=B.querySelector("#cw-lib-inp-title"),j=B.querySelector("#cw-lib-inp-content"),ae=q.value.trim(),D=j.contentEditable==="true"?j.innerHTML:j.value.trim(),U=j.getAttribute("data-is-code")==="true";if(!ae||!D||D==="<br>"){v.playError(),te(ue("fillTitleAndContent"),{error:!0});return}let ne={id:i,type:a,title:ae,content:D,isCode:U,isRich:j.contentEditable==="true"};if(a==="email"){let y=B.querySelector("#cw-lib-inp-subject").value.trim();if(!y){v.playError(),te(ue("subjectRequired"),{error:!0});return}ne.subject=y}let s=await He.save(ne);if(s===!1){v.playError(),te(ue("saveFailedNoUser"),{error:!0});return}Y(),O(),s.synced===!1?(v.playError(),te(ue("savedLocalOnly"),{error:!0})):(te(ue("savedAndSynced")),v.playSuccess())}catch(q){console.error("Erro ao salvar item da biblioteca:",q),v.playError(),te(ue("saveError"),{error:!0})}finally{T.classList.remove("active"),E.disabled=!1}}function se(q,j,ae,D={}){let U=document.createElement("div");U.className="cw-lib-field";let ne=document.createElement("label");ne.className="cw-lib-label",ne.textContent=j,U.appendChild(ne);let s;if(D.isRich){let y=document.createElement("div");y.className="cw-lib-toolbar-mini",y.innerHTML=`
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-bold" title="${ue("bold")}">${Ue.bold}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-italic" title="${ue("italic")}">${Ue.italic}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-code" title="${ue("codeFormat")}">${Ue.code}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-img" title="${ue("insertImage")}">${Ue.image}</button>
            `,s=document.createElement("div"),s.className="cw-lib-input cw-lib-editable",s.contentEditable="true",s.innerHTML=ae||"",D.isCode&&(s.style.fontFamily="'Roboto Mono', monospace",s.style.background="#F8F9FA",s.setAttribute("data-is-code","true"),y.querySelector(".cw-tb-code").classList.add("active")),y.querySelectorAll(".cw-lib-tb-btn").forEach(L=>{L.onmouseenter=()=>v.playHover(),L.onmousedown=()=>v.playClick()}),y.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),s.focus()},y.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),s.focus()},y.querySelector(".cw-tb-code").onclick=L=>{let d=!(s.getAttribute("data-is-code")==="true");s.setAttribute("data-is-code",String(d)),s.style.fontFamily=d?"'Roboto Mono', monospace":"inherit",s.style.background=d?"#F8F9FA":"#fff",L.currentTarget.classList.toggle("active",d),s.focus()},y.querySelector(".cw-tb-img").onclick=async()=>{let L=await va(ue("imageUrlPrompt"));L&&(document.execCommand("insertImage",!1,L),s.querySelectorAll("img").forEach(J=>{J.style.maxWidth="100%",J.style.borderRadius="8px"}))},s.onpaste=L=>{let J=(L.clipboardData||L.originalEvent.clipboardData).items;for(let d of J)if(d.kind==="file"&&d.type.startsWith("image/")){L.preventDefault();let x=new FileReader;x.onload=h=>{document.execCommand("insertHTML",!1,`<img src="${h.target.result}" style="max-width:100%;border-radius:8px;margin:8px 0;display:block;">`)},x.readAsDataURL(d.getAsFile())}},U.appendChild(y)}else s=document.createElement("input"),s.className="cw-lib-input",s.type="text",s.value=ae||"";return s.id=`cw-lib-inp-${q}`,U.appendChild(s),U}function X(q){let j=document.createElement("div");return j.textContent=q||"",j.innerHTML}k.addEventListener("input",q=>{o=q.target.value,w.classList.toggle("visible",o.length>0),Y()}),w.onclick=()=>{k.value="",o="",w.classList.remove("visible"),Y(),k.focus()};function ce(){t=!Xe(r),Be(t,r,"cw-btn-library"),t?(Te(),Y()):(qe(),z())}return Ae(()=>{m&&(m.textContent=ue("headerTitle"));let q=r.querySelector(".cw-help-title");q&&(q.textContent=ue("headerTitle"));let j=r.querySelector(".cw-help-description");j&&(j.textContent=ue("headerDesc")),Lo.forEach(D=>{let U=document.querySelector(`#lib-tab-${D.id} .js-lib-tab-label`);U&&(U.textContent=ue("tabs")[D.id])}),k.placeholder=ue("searchPlaceholder"),A.title=ue("newItem"),F.title=ue("cancel");let ae=T.querySelector(".js-lib-saving");ae&&(ae.textContent=ue("saving")),Y()}),ce}var il='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>',rl='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>',sl='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',ll='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>';function cl(e){if(document.getElementById("cw-shortcuts-styles"))return;let t=document.createElement("style");t.id="cw-shortcuts-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function sr(e,t){cl(t);let a=document.createElement("div");a.className="cw-configs-section",a.innerHTML=`
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
    `;let o=a.querySelector(".js-sc-body"),i=a.querySelector(".js-sc-sort-toggle");i.onchange=async u=>{v.playClick(),await Le.setSortedByUsage(u.target.checked),l()};function n(u){let g=Me[u.payload.subStatus],k=g?g.name:u.payload.subStatus,w=(u.payload.scenarios||[]).length,S=[u.payload.caseType.toUpperCase(),k,w===1?e("scOneScenario"):e("scNScenarios").replace("{n}",w)];return u.alias&&S.push(`"${u.alias}"`),S.join(" \xB7 ")}function r(u,g,k){if(u.textContent="",k){let w=document.createElement("span");w.className="cw-sc-warn",w.textContent=e("scBroken"),u.appendChild(w),u.appendChild(document.createTextNode(" \xB7 "))}u.appendChild(document.createTextNode(n(g)))}function l(){o.innerHTML="",i.checked=Le.isSortedByUsage();let u=Le.isSortedByUsage(),g=u?Le.list():Le.listRaw(),k=!u;if(!g.length){let S=document.createElement("div");S.className="cw-sc-empty",S.textContent=e("scEmpty"),o.appendChild(S)}g.forEach((S,I)=>{let A=Qn(S),_=document.createElement("div");_.className="cw-sc-item"+(A.length?" broken":""),_.dataset.id=S.id,_.dataset.index=String(I),_.innerHTML=`
                ${k?`<button type="button" class="cw-sc-grip" aria-label="${e("scReorder")}">${rl}</button>`:""}
                <span class="cw-sc-bolt">${il}</span>
                <span class="cw-sc-text">
                    <span class="cw-sc-label"></span>
                    <span class="cw-sc-meta"></span>
                </span>
                <button type="button" class="cw-sc-iconbtn js-sc-edit" aria-label="${e("scEdit")}">${sl}</button>
                <button type="button" class="cw-sc-iconbtn danger js-sc-del" aria-label="${e("scDelete")}">${ll}</button>
            `;let b=_.querySelector(".cw-sc-label");b.textContent=S.label,b.title=S.label,r(_.querySelector(".cw-sc-meta"),S,A.length>0),_.querySelector(".js-sc-edit").onclick=()=>f(S),_.querySelector(".js-sc-del").onclick=()=>c(S),k&&m(_,I,g.length),o.appendChild(_)});let w=document.createElement("button");w.type="button",w.className="cw-sc-add",w.textContent=e("scAdd"),w.disabled=g.length>=xt,w.disabled&&(w.textContent=e("scLimit").replace("{max}",xt)),w.onclick=()=>f(null),o.appendChild(w)}async function c(u){await De(e("scDeleteConfirm").replace("{name}",u.label),{danger:!0})&&(await Le.remove(u.id),v.playClick(),l())}function m(u,g,k){let w=u.querySelector(".cw-sc-grip");u.draggable=!0;let S=!1;w.onmousedown=()=>{S=!0},u.onmouseup=()=>{S=!1},w.onkeydown=async I=>{let A=I.key==="ArrowUp"?-1:I.key==="ArrowDown"?1:0;if(!A)return;I.preventDefault();let _=g+A;if(_<0||_>=k)return;await Le.reorder(u.dataset.id,_),v.playClick(),l();let b=o.querySelector(`.cw-sc-item[data-id="${u.dataset.id}"] .cw-sc-grip`);b&&b.focus()},u.ondragstart=I=>{if(!S){I.preventDefault();return}I.dataTransfer.effectAllowed="move",I.dataTransfer.setData("text/plain",u.dataset.id),u.classList.add("dragging")},u.ondragend=()=>{u.classList.remove("dragging"),S=!1,o.querySelectorAll(".drop-target").forEach(I=>I.classList.remove("drop-target"))},u.ondragover=I=>{I.preventDefault(),u.classList.add("drop-target")},u.ondragleave=()=>u.classList.remove("drop-target"),u.ondrop=async I=>{I.preventDefault(),u.classList.remove("drop-target");let A=I.dataTransfer.getData("text/plain");!A||A===u.dataset.id||(await Le.reorder(A,Number(u.dataset.index)),v.playClick(),l())}}function p(){let u=[];for(let g in Me){let k=Me[g].status;k&&!u.includes(k)&&u.push(k)}return u}function f(u){let k=!!u?JSON.parse(JSON.stringify(u)):{id:ma(),kind:"note",label:"",alias:"",payload:{caseType:"bau",status:"",subStatus:"",scenarios:[]}};o.innerHTML="";let w=document.createElement("div");w.style.cssText="display: flex; flex-direction: column; gap: 14px;",w.innerHTML=`
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
        `,o.appendChild(w);let S=w.querySelector("#cw-sc-name"),I=w.querySelector("#cw-sc-alias"),A=w.querySelector("#cw-sc-type"),_=w.querySelector("#cw-sc-status"),b=w.querySelector("#cw-sc-sub"),M=w.querySelector(".js-sc-scenarios");S.value=k.label,I.value=k.alias,A.value=k.payload.caseType,_.innerHTML='<option value="">\u2014</option>'+p().map(G=>`<option value="${G}">${G}</option>`).join(""),_.value=k.payload.status;function F(){let G=_.value;b.innerHTML='<option value="">\u2014</option>';for(let E in Me){if(Me[E].status!==G)continue;let T=document.createElement("option");T.value=E,T.textContent=Me[E].name,b.appendChild(T)}b.disabled=!G}function H(){if(M.innerHTML="",!b.value){M.innerHTML=`<div class="cw-configs-desc">${e("scPickSubStatus")}</div>`;return}let G=wa(b.value,A.value);if(!G.length){M.innerHTML=`<div class="cw-configs-desc">${e("scNoScenarios")}</div>`;return}G.forEach(([E])=>{let T=document.createElement("button");T.type="button",T.className="cw-sc-chip",T.textContent=Sa(E,b.value);let R=()=>k.payload.scenarios.some(C=>C.id===E);T.classList.toggle("on",R()),T.onclick=()=>{R()?k.payload.scenarios=k.payload.scenarios.filter(C=>C.id!==E):k.payload.scenarios.push({id:E,substatus:b.value}),T.classList.toggle("on",R()),v.playClick()},M.appendChild(T)})}F(),b.value=k.payload.subStatus,H(),_.onchange=()=>{k.payload.scenarios=[],F(),b.value="",H()},b.onchange=()=>{k.payload.scenarios=[],H()},A.onchange=()=>{k.payload.scenarios=[],H()},w.querySelector(".cw-sc-cancel").onclick=()=>{v.playClick(),l()};let B=w.querySelector(".cw-sc-save");B.onclick=async()=>{if(!b.value){v.playError(),te(e("scPickSubStatus"),{error:!0});return}let G=B.textContent;B.disabled=!0,B.textContent=e("scSaving");let E=S.value.trim()||Me[b.value].name,T=await Le.save({...k,label:E,alias:I.value.trim(),payload:{...k.payload,caseType:A.value,status:_.value||String(b.value).split("_")[0],subStatus:b.value}});if(!T.ok){B.disabled=!1,B.textContent=G,v.playError(),te(e("scLimit").replace("{max}",xt),{error:!0});return}v.playSuccess(),te(T.synced?e("scSaved"):e("scSavedLocal")),l()}}return a.refresh=l,a.applyTexts=()=>{a.querySelector(".js-sc-title").textContent=e("scSectionTitle"),a.querySelector(".js-sc-sort-label").textContent=e("scSortLabel"),a.querySelector(".js-sc-sort-desc").textContent=e("scSortDesc"),l()},l(),a}var dl={pt:{title:"Configura\xE7\xF5es",headerDesc:"Personalize sua experi\xEAncia e prefer\xEAncias.",profileNotFound:"Perfil n\xE3o localizado na base de dados.",consultant:"Consultor",overheadBadge:"Gest\xE3o / Overhead",soundSectionTitle:"Prefer\xEAncias de Som",soundLabel:"Efeitos Sonoros",soundDesc:"Ativar ou desativar sons de interface.",langSectionTitle:"Idioma da Interface",langLabel:"Idioma",langDesc:"Escolha o idioma dos menus, bot\xF5es e mensagens do Case Wizard.",supportSectionTitle:"Suporte & Feedback",reportBug:"Reportar Bug/Sugest\xF5es",diagSectionTitle:"Diagn\xF3stico",diagLabel:"Ambiente do backend",diagDesc:"Qual implanta\xE7\xE3o do Apps Script este bundle usa. O sufixo tem de bater com o do dashboard.",scSectionTitle:"Meus Atalhos (Ctrl+K)",scSortLabel:"Ordenar por frequ\xEAncia de uso",scSortDesc:"Desligue para definir voc\xEA mesmo a ordem, arrastando os atalhos.",scEmpty:"Voc\xEA ainda n\xE3o tem atalhos. Crie um aqui ou monte uma nota no Case Notes e clique em \u201CSalvar como atalho\u201D.",scAdd:"+ Criar atalho",scLimit:"Limite de {max} atalhos atingido",scEdit:"Editar atalho",scDelete:"Excluir atalho",scReorder:"Reordenar (arraste ou use as setas)",scDeleteConfirm:"Excluir o atalho \u201C{name}\u201D?",scBroken:"\u26A0 cen\xE1rio indispon\xEDvel",scOneScenario:"1 cen\xE1rio",scNScenarios:"{n} cen\xE1rios",scName:"Nome",scNamePlaceholder:"Ex: Fim do 2 Day Rule",scAlias:"Apelido de busca",scAliasPlaceholder:"Ex: 2day",scAliasDesc:"Palavra que encontra este atalho no Ctrl+K, al\xE9m do nome.",scFlow:"Fluxo",scStatus:"Status",scSubStatus:"Substatus",scScenarios:"Cen\xE1rios",scScenariosDesc:"Opcional: sem nenhum, o atalho s\xF3 abre a nota j\xE1 no substatus certo.",scPickSubStatus:"Escolha um substatus primeiro.",scNoScenarios:"Nenhum cen\xE1rio dispon\xEDvel para esta combina\xE7\xE3o.",scCancel:"Cancelar",scSave:"Salvar",scSaving:"Salvando\u2026",scSaved:"Atalho salvo!",scSavedLocal:"Atalho salvo neste navegador (sem conex\xE3o com a nuvem)."},es:{title:"Configuraci\xF3n",headerDesc:"Personaliza tu experiencia y tus preferencias.",profileNotFound:"Perfil no encontrado en la base de datos.",consultant:"Consultor",overheadBadge:"Gesti\xF3n / Overhead",soundSectionTitle:"Preferencias de Sonido",soundLabel:"Efectos de Sonido",soundDesc:"Activar o desactivar los sonidos de la interfaz.",langSectionTitle:"Idioma de la Interfaz",langLabel:"Idioma",langDesc:"Elige el idioma de los men\xFAs, botones y mensajes del Case Wizard.",supportSectionTitle:"Soporte y Comentarios",reportBug:"Reportar error o sugerencia",diagSectionTitle:"Diagn\xF3stico",diagLabel:"Entorno del backend",diagDesc:"Qu\xE9 implementaci\xF3n de Apps Script usa este bundle. El sufijo debe coincidir con el del panel.",scSectionTitle:"Mis Atajos (Ctrl+K)",scSortLabel:"Ordenar por frecuencia de uso",scSortDesc:"Desact\xEDvalo para definir t\xFA mismo el orden, arrastrando los atajos.",scEmpty:"Todav\xEDa no tienes atajos. Crea uno aqu\xED o arma una nota en Case Notes y haz clic en \u201CGuardar como atajo\u201D.",scAdd:"+ Crear atajo",scLimit:"L\xEDmite de {max} atajos alcanzado",scEdit:"Editar atajo",scDelete:"Eliminar atajo",scReorder:"Reordenar (arrastra o usa las flechas)",scDeleteConfirm:"\xBFEliminar el atajo \u201C{name}\u201D?",scBroken:"\u26A0 escenario no disponible",scOneScenario:"1 escenario",scNScenarios:"{n} escenarios",scName:"Nombre",scNamePlaceholder:"Ej: Fin del 2 Day Rule",scAlias:"Apodo de b\xFAsqueda",scAliasPlaceholder:"Ej: 2day",scAliasDesc:"Palabra que encuentra este atajo en el Ctrl+K, adem\xE1s del nombre.",scFlow:"Flujo",scStatus:"Estado",scSubStatus:"Subestado",scScenarios:"Escenarios",scScenariosDesc:"Opcional: sin ninguno, el atajo solo abre la nota ya en el subestado correcto.",scPickSubStatus:"Elige un subestado primero.",scNoScenarios:"Ning\xFAn escenario disponible para esta combinaci\xF3n.",scCancel:"Cancelar",scSave:"Guardar",scSaving:"Guardando\u2026",scSaved:"\xA1Atajo guardado!",scSavedLocal:"Atajo guardado en este navegador (sin conexi\xF3n con la nube)."}};function lr(){let e=on(dl),t="v1.1",a=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0",warnBorder:"#F9AB00",warnBg:"#FFFBF0",warnText:"#B06000"},i="cw-configs-styles";if(!document.getElementById(i)){let E=document.createElement("style");E.id=i,E.innerHTML=`
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
        `,document.head.appendChild(E)}let n=document.createElement("div");n.id="configs-popup",n.classList.add("cw-module-window"),Object.assign(n.style,We,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let r={popup:n},l=Pe(n,e("title"),t,e("headerDesc"),r,()=>G());n.appendChild(l);let c=l.querySelector("span"),m=document.createElement("div");m.className="cw-configs-container",n.appendChild(m);let p=document.createElement("div");p.className="cw-profile-card",p.id="cw-user-profile-section",p.style.display="none",m.appendChild(p);let f;function u(E,T){if(f={ldap:E,profile:T},!T){p.innerHTML=`
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
            `;return}p.innerHTML=`
        <img src="https://moma-teams-photos.corp.google.com/photos/${E}?sz=600&type=PLUS"
             class="cw-profile-avatar" alt="User Photo"
             onerror="this.style.display='none'">
        <div class="cw-profile-info">
            <h2 class="cw-profile-ldap">@${T.ldap}</h2>
            <div class="cw-profile-badges">
                <span class="cw-profile-badge">${T.roleCategory||"N/A"}</span>
                <span class="cw-profile-badge">${T.segment||"N/A"}</span>
                <span class="cw-profile-badge">${T.defaultLanguage||"N/A"}</span>
                ${T.isOverhead?`<span class="cw-profile-badge overhead">${e("overheadBadge")}</span>`:""}
            </div>
            <div style="font-size: 12px; color: ${o.textSub}; margin-top: 4px;">
                ${T.role||""}
            </div>
        </div>
    `}async function g(){p.style.display="flex",p.innerHTML=`
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
        `,(async()=>{try{Ie()||await Zt();let E=Ie(),T=E?E.split("@")[0]:"user",R=await zt(T);u(T,R)}catch(E){console.warn("Erro ao renderizar perfil:",E),p.style.display="none"}})()}g();let k=document.createElement("div");if(k.className="cw-configs-section",k.innerHTML=`
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
                </div>
            </div>
        </div>
    `,!document.getElementById("cw-lang-toggle-styles")){let E=document.createElement("style");E.id="cw-lang-toggle-styles",E.innerHTML=`
            .cw-lang-toggle { display: flex; border: 1px solid ${o.border}; border-radius: 8px; overflow: hidden; flex-shrink: 0; }
            .cw-lang-toggle button {
                border: none; background: white; padding: 8px 14px; font-size: 12px; font-weight: 700;
                cursor: pointer; color: ${o.textSub}; font-family: inherit; transition: all 0.2s;
            }
            .cw-lang-toggle button:first-child { border-right: 1px solid ${o.border}; }
            .cw-lang-toggle button.active { background: ${o.primary}; color: #fff; }
            .cw-lang-toggle button:hover:not(.active) { background: #f1f3f4; }
        `,document.head.appendChild(E)}let w=k.querySelector("#cw-config-lang-toggle");function S(){w.querySelectorAll("button").forEach(E=>{E.classList.toggle("active",E.dataset.lang===de())})}S(),w.querySelectorAll("button").forEach(E=>{E.onclick=()=>{Za(E.dataset.lang),v.playClick()}}),m.appendChild(k);let I=sr(e,o);m.appendChild(I);let A=document.createElement("div");A.className="cw-configs-section",A.innerHTML=`
        <div class="cw-configs-section-title js-sound-section-title"></div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label js-sound-label"></div>
                    <div class="cw-configs-desc js-sound-desc"></div>
                </div>
                <label class="cw-toggle-switch">
                    <input type="checkbox" id="cw-config-sound-toggle" ${v.isMuted()?"":"checked"}>
                    <span class="cw-toggle-track"></span>
                </label>
            </div>
        </div>
    `;let _=A.querySelector("#cw-config-sound-toggle");_.onchange=E=>{v.setMuted(!E.target.checked),E.target.checked&&v.playClick()},m.appendChild(A);let b=document.createElement("div");b.className="cw-configs-section",b.innerHTML=`
        <div class="cw-configs-section-title js-support-section-title"></div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn js-support-link" href="${$t}" target="_blank" rel="noopener noreferrer"></a>
            </div>
        </div>
    `,m.appendChild(b);let M=Yt(),F=document.createElement("div");F.className="cw-configs-section",F.innerHTML=`
        <div class="cw-configs-section-title js-diag-section-title"></div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label js-diag-label"></div>
                    <div class="cw-configs-desc js-diag-desc"></div>
                </div>
                <div class="cw-env-chip ${M.isDev?"is-dev":"is-prod"}"></div>
            </div>
        </div>
    `,F.querySelector(".cw-env-chip").textContent=`${M.isDev?"DEV":"PROD"} \xB7 \u2026${M.fingerprint}`,m.appendChild(F);let H=document.createElement("style");H.innerHTML=`
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
    `,F.appendChild(H);function B(){f&&u(f.ldap,f.profile),k.querySelector(".js-lang-section-title").textContent=e("langSectionTitle"),k.querySelector(".js-lang-label").textContent=e("langLabel"),k.querySelector(".js-lang-desc").textContent=e("langDesc"),S(),I.applyTexts(),A.querySelector(".js-sound-section-title").textContent=e("soundSectionTitle"),A.querySelector(".js-sound-label").textContent=e("soundLabel"),A.querySelector(".js-sound-desc").textContent=e("soundDesc"),b.querySelector(".js-support-section-title").textContent=e("supportSectionTitle"),b.querySelector(".js-support-link").textContent=e("reportBug"),F.querySelector(".js-diag-section-title").textContent=e("diagSectionTitle"),F.querySelector(".js-diag-label").textContent=e("diagLabel"),F.querySelector(".js-diag-desc").textContent=e("diagDesc"),c&&(c.textContent=e("title"));let E=n.querySelector(".cw-help-title");E&&(E.textContent=e("title"));let T=n.querySelector(".cw-help-description");T&&(T.textContent=e("headerDesc"))}B(),Ae(B);function G(){a=!Xe(n),Be(a,n,"cw-btn-configs"),a?(I.refresh(),Te(),v.playClick()):qe()}return document.body.appendChild(n),G}var ze={blue:"#1A73E8",red:"#D93025",yellow:"#F9AB00",green:"#1E8E3E",blueLight:"#E8F0FE",redLight:"#FCE8E6",yellowLight:"#FEF7E0",greenLight:"#E6F4EA",textPrimary:"#202124",textSecondary:"#5F6368",border:"#DADCE0",surface:"rgba(255, 255, 255, 0.8)",white:"#FFFFFF"};var Ft="cubic-bezier(0.4, 0, 0.2, 1)",fm=`all 0.3s ${Ft}`,cr=()=>{if(document.getElementById("bau-form-global-styles"))return;let e=document.createElement("style");e.id="bau-form-global-styles",e.textContent=`
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
      z-index: ${$e.MODULE_RESTING};
      
      background: #FFFFFF; 
      display: flex;
      flex-direction: column;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 12px 40px rgba(0,0,0,0.12);
      border: 1px solid #DADCE0;
      
      transform-origin: center center;
      animation: cw-genie-effect-in 0.4s ${Ft};
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
    .bau-metrics-refresh-btn:focus-visible { outline: 2px solid ${ze.blue}; outline-offset: 2px; }
    .bau-metrics-refresh-btn svg { width: 18px; height: 18px; }
    .bau-metrics-refresh-btn.spinning svg { animation: rotate 1s linear infinite; }

    @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

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
        animation: bauAuraCombined 5s ${Ft} 0.2s infinite;
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
        color: ${ze.green};
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
        animation: bauCheckDraw 0.55s ${Ft} 0.75s forwards;
    }

    .bau-success-view.active .bau-success-title {
        font-size: 24px;
        font-weight: 500;
        color: #202124;
        margin: 0 0 8px 0;
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${Ft} 0.85s forwards;
    }

    .bau-success-view.active .bau-success-subtitle {
        font-size: 15px;
        color: #5F6368;
        margin-bottom: 36px;
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${Ft} 0.95s forwards;
    }

    .bau-success-view.active #bau-success-back-btn {
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${Ft} 1.05s forwards;
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
      transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
    .bau-rescan-btn:hover { color: ${ze.blue}; background: #FFFFFF; }
    .bau-rescan-btn:focus-visible { outline: 2px solid ${ze.blue}; outline-offset: 2px; }
    .bau-rescan-btn.spinning { cursor: default; color: ${ze.blue}; }
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
      box-shadow: inset 0 0 0 2px ${ze.blue};
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
    .bau-mini-btn-input:focus-visible { outline: 2px solid ${ze.blue}; outline-offset: 2px; }

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
      grid-template-columns: minmax(0, 1fr) 0fr;
      gap: 0;
      transition: grid-template-columns 260ms cubic-bezier(.34, 1.12, .64, 1),
                  gap 260ms cubic-bezier(.34, 1.12, .64, 1);
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
      transition: opacity 180ms ease, padding 260ms cubic-bezier(.34, 1.12, .64, 1);
    }
    .bau-md.is-open .bau-md-detail {
      opacity: 1;
      padding: 16px;
      overflow-y: auto;
      /* O conteudo entra deslizando 12px da direita \u2014 espacial, curto, uma vez
         por selecao. O atraso deixa a coluna abrir primeiro: o olho segue a
         moldura e so entao le o conteudo. */
      animation: bauDetailIn 260ms cubic-bezier(.34, 1.12, .64, 1) 60ms both;
    }
    @keyframes bauDetailIn {
      from { transform: translateX(12px); }
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
    .bau-md-copy:hover { background: #E8F0FE; color: ${ze.blue}; }
    .bau-md-copy:focus-visible { outline: 2px solid ${ze.blue}; outline-offset: 2px; }
    .bau-md-copy.is-done { opacity: 1; color: ${ze.green}; }

    /* Card selecionado na lista: sem isso o agente perde de vista qual caso o
       painel da direita esta mostrando assim que a lista rola. */
    /* Acento numa aresta, nao moldura em volta: diz "e este" sem desenhar mais
       uma caixa. */
    .bau-case-card.is-selected {
      background: #E8F0FE;
      box-shadow: inset 3px 0 0 ${ze.blue};
    }

    /* Abaixo de 900px a janela encolhe (max-width: 95vw) e duas colunas viram
       duas colunas espremidas. Empilha: o detalhe vai para baixo da lista. */
    @media (max-width: 900px) {
      .bau-md { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1fr) 0fr;
                transition: grid-template-rows 260ms cubic-bezier(.34, 1.12, .64, 1), gap 260ms ease; }
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

    .bau-mini-btn-input:hover { background: #E8F0FE; color: ${ze.blue}; }

    @media (prefers-reduced-motion: reduce) {
      /* A abertura do detalhe continua acontecendo, mas sem a sobra da curva e
         sem o deslize: sumir/aparecer num quadro tambem desorienta. */
      .bau-md { transition-timing-function: linear; }
      .bau-md.is-open .bau-md-detail { animation: none; }

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
  `,document.head.appendChild(e)};function pr(){return Object.values(Fe).map(e=>String(e?.name||"").trim()).filter(Boolean)}var dr=[{value:"PT-BR",text:"Portugu\xEAs (PT-BR)"},{value:"ES",text:"Espanhol (ES)"},{value:"EN",text:"Ingl\xEAs (EN)"}],wt={steps:[{id:0,title:"Selecione o tipo de atendimento",isBranching:!0},{id:1,title:"Contexto e Valida\xE7\xE3o",fields:[{id:"advName",name:"advName",label:"Nome do Anunciante",type:"text",placeholder:"Nome do Anunciante",required:!0,isSmart:!0},{id:"advLastName",name:"advLastName",label:"Sobrenome do Anunciante",type:"text",placeholder:"Sobrenome do Anunciante",required:!1,isSmart:!0},{id:"advPhone",name:"advPhone",label:"Telefone do Anunciante",type:"text",placeholder:"+55 11 90000-0000",required:!1,isSmart:!0},{id:"advEmail",name:"advEmail",label:"Email do Anunciante",type:"text",placeholder:"email@exemplo.com",required:!0,isSmart:!0,validation:{regex:"^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",error:"Formato de email inv\xE1lido"}},{id:"cid",name:"cid",label:"CID",type:"text",placeholder:"000-000-0000",required:!0,isSmart:!0,tooltip:"Use o formato 000-000-0000 ou 10 d\xEDgitos",validation:{regex:"^(\\d{3}-\\d{3}-\\d{4}|\\d{10})$",error:"Formato de CID incorreto"}},{id:"amName",name:"amName",label:"Account Manager (AM)",type:"text",placeholder:"am@google.com",required:!0,isSmart:!0,validation:{regex:"^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",error:"Informe o e-mail do AM (ex.: am@google.com)"}},{id:"website",name:"website",label:"Website",type:"text",placeholder:"https://www.exemplo.com",required:!0,isSmart:!0},{id:"seId",name:"seId",label:"Speakeasy ID (SE ID)",type:"text-with-button",placeholder:"Speakeasy ID",required:!1,isSmart:!0,button:{id:"bau-top-se-search",icon:"wand",title:"Buscar ID automaticamente"}},{id:"language",name:"language",label:"Idioma do Atendimento",type:"select",required:!0,tooltip:"Vem do seu segmento na planilha People. Troque s\xF3 quando este caso fugir da regra.",options:dr}]},{id:2,title:"Tasks",fields:[{id:"reason",name:"reason",label:"O que deve ser feito em BAU",type:"textarea",placeholder:"Descreva as a\xE7\xF5es esperadas...",required:!0,style:{minHeight:"80px"}},{id:"taskType",name:"taskType",label:"Tasks para BAU (Selecione 1 ou mais)",type:"checkbox-grid",required:!0,tooltip:"Selecione os tipos de implementa\xE7\xE3o t\xE9cnica"}]},{id:3,title:"Justificativa e Agendamento",fields:[{id:"nonImplementationReason",name:"nonImplementationReason",label:"Motivo da N\xE3o Implementa\xE7\xE3o (Justificativa BAU)",type:"select",required:!0,options:[{value:"",text:"Selecione um motivo..."},{value:"Tempo da consultoria esgotado",text:"Tempo da consultoria esgotado"},{value:"Solicita\xE7\xE3o de reagendamento pelo anunciante",text:"Solicita\xE7\xE3o de reagendamento pelo anunciante"},{value:"Falta de acessos ou backup do site",text:"Falta de acessos ou backup do site"},{value:"Anunciante indispon\xEDvel ou n\xE3o preparado",text:"Anunciante indispon\xEDvel ou n\xE3o preparado"},{value:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)",text:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"},{value:"Solicita\xE7\xE3o de tarefas (tasks) adicionais",text:"Solicita\xE7\xE3o de tarefas (tasks) adicionais"},{value:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)",text:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"},{value:"Retorno de contato ap\xF3s prazo de 14 dias expirado",text:"Retorno de contato ap\xF3s prazo de 14 dias expirado"}]},{id:"description",i18nKey:"description_justificativa",name:"description",label:"Justificativa / Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva detalhadamente o que precisa ser feito...",required:!0},{id:"availability",name:"availability",label:"Disponibilidade (m\xEDnimo 1 op\xE7\xE3o)",type:"datetime-group",required:!0,fields:[{name:"availability_1",label:"Op\xE7\xE3o 1 (Prioridade)",required:!0},{name:"availability_2",label:"Op\xE7\xE3o 2 (Opcional)",required:!1},{name:"availability_3",label:"Op\xE7\xE3o 3 (Opcional)",required:!1}]},{id:"suggestDiscard",name:"suggestDiscard",label:"O caso deve ser descartado pelo TL?",type:"select",required:!1,options:[{value:"N\xE3o",text:"N\xE3o"},{value:"Sim",text:"Sim"}]}]},{id:4,title:"Confirma\xE7\xE3o",isConfirmation:!0},{id:5,title:"Solicitar Descarte",fields:[{id:"caseId",name:"caseId",label:"Case ID",type:"text",placeholder:"Case ID",required:!0,isSmart:!0},{id:"language",i18nKey:"language_descarte",name:"language",label:"Idioma do Atendimento",type:"select",required:!0,options:dr},{id:"seId",i18nKey:"seId_descarte",name:"seId",label:"Speakeasy ID (SE ID)",type:"text-with-button",placeholder:"Speakeasy ID",required:!0,isSmart:!0,button:{id:"bau-discard-se-search",icon:"wand",title:"Buscar ID automaticamente"}},{id:"description",i18nKey:"description_descarte",name:"description",label:"Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva o motivo do descarte...",required:!0},{id:"discardReason",name:"reason",label:"Motivo do Descarte",type:"select",required:!0,groups:[{label:"Live Appointments",options:[{value:"Caso Filho gerado no atendimento",text:"Caso Filho gerado no atendimento"},{value:"3\xAA Tentativa de contato sem sucesso",text:"3\xAA Tentativa de contato sem sucesso"}]},{label:"Live Meet",options:[{value:"Apenas o AM presente",text:"Apenas o AM presente"},{value:"Estouro de tempo para conclus\xE3o",text:"Estouro de tempo para conclus\xE3o"},{value:"Gera\xE7\xE3o de caso BAU (Reagendamento)",text:"Gera\xE7\xE3o de caso BAU (Reagendamento)"}]}]}]}]};var pl={advName:{label:"Nombre del Anunciante",placeholder:"Nombre del Anunciante"},advLastName:{label:"Apellido del Anunciante",placeholder:"Apellido del Anunciante"},advPhone:{label:"Tel\xE9fono del Anunciante",placeholder:"+55 11 90000-0000"},advEmail:{label:"Email del Anunciante",placeholder:"email@ejemplo.com",error:"Formato de correo inv\xE1lido"},cid:{label:"CID",placeholder:"000-000-0000",tooltip:"Usa el formato 000-000-0000 o 10 d\xEDgitos",error:"Formato de CID incorrecto"},amName:{label:"Account Manager (AM)",placeholder:"am@google.com",error:"Informa el correo del AM (ej.: am@google.com)"},website:{label:"Website",placeholder:"https://www.ejemplo.com"},seId:{label:"Speakeasy ID (SE ID)",placeholder:"Speakeasy ID",buttonTitle:"Buscar ID autom\xE1ticamente"},seId_descarte:{label:"Speakeasy ID (SE ID)",placeholder:"Speakeasy ID",buttonTitle:"Buscar ID autom\xE1ticamente"},reason:{label:"Qu\xE9 debe hacerse en BAU",placeholder:"Describe las acciones esperadas..."},taskType:{label:"Tareas para BAU (Selecciona 1 o m\xE1s)",tooltip:"Selecciona los tipos de implementaci\xF3n t\xE9cnica"},nonImplementationReason:{label:"Motivo de la No Implementaci\xF3n (Justificaci\xF3n BAU)"},description_justificativa:{label:"Justificaci\xF3n / Descripci\xF3n",placeholder:"Describe detalladamente qu\xE9 se necesita hacer..."},availability:{label:"Disponibilidad (m\xEDnimo 1 opci\xF3n)"},availability_1:{label:"Opci\xF3n 1 (Prioridad)"},availability_2:{label:"Opci\xF3n 2 (Opcional)"},availability_3:{label:"Opci\xF3n 3 (Opcional)"},suggestDiscard:{label:"\xBFEl caso debe ser descartado por el TL?"},caseId:{label:"Case ID",placeholder:"Case ID"},language:{label:"Idioma de la Atenci\xF3n",tooltip:"Viene de tu segmento en la hoja People. C\xE1mbialo solo cuando este caso se salga de la regla."},language_descarte:{label:"Idioma de la Atenci\xF3n"},description_descarte:{label:"Descripci\xF3n",placeholder:"Describe el motivo del descarte..."},discardReason:{label:"Motivo del Descarte"}},ul={"Selecione um motivo...":"Selecciona un motivo...","Tempo da consultoria esgotado":"Tiempo de la consultor\xEDa agotado","Solicita\xE7\xE3o de reagendamento pelo anunciante":"Solicitud de reprogramaci\xF3n por parte del anunciante","Falta de acessos ou backup do site":"Falta de accesos o copia de seguridad del sitio","Anunciante indispon\xEDvel ou n\xE3o preparado":"Anunciante no disponible o no preparado","Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)":"Implementaci\xF3n parcial (no todas las tareas completadas)","Solicita\xE7\xE3o de tarefas (tasks) adicionais":"Solicitud de tareas adicionales","Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)":"Necesidad de nuevos cambios (fase de seguimiento)","Retorno de contato ap\xF3s prazo de 14 dias expirado":"Retorno de contacto despu\xE9s de vencido el plazo de 14 d\xEDas","Caso Filho gerado no atendimento":"Caso Hijo generado en la atenci\xF3n","3\xAA Tentativa de contato sem sucesso":"3.\xBA intento de contacto sin \xE9xito","Apenas o AM presente":"Solo el AM presente","Estouro de tempo para conclus\xE3o":"Tiempo excedido para la conclusi\xF3n","Gera\xE7\xE3o de caso BAU (Reagendamento)":"Generaci\xF3n de caso BAU (Reprogramaci\xF3n)",Sim:"S\xED",N\u00E3o:"No","Portugu\xEAs (PT-BR)":"Portugu\xE9s (PT-BR)","Espanhol (ES)":"Espa\xF1ol (ES)","Ingl\xEAs (EN)":"Ingl\xE9s (EN)"};function ml(e){return e?.i18nKey||e?.id||e?.name}function et(e,t){let a=e?.[t];return de()!=="es"?a:pl[ml(e)]?.[t]??a}function Ke(e){return de()!=="es"?e:ul[e]??e}var gl=(()=>{let e=[];for(let t=420;t<=1260;t+=30)e.push(String(Math.floor(t/60)).padStart(2,"0")+":"+String(t%60).padStart(2,"0"));return e})(),ur={pt:{statusPending:"Aguardando TL",statusApproved:"Aprovado / Criado",statusDiscarded:"Descartado pelo TL",statusCanceled:"Cancelado",statusDefault:"Pendente",timezoneWarningStrong:"Aten\xE7\xE3o:",timezoneWarningText:"Para clientes fora do fuso hor\xE1rio do Brasil, o hor\xE1rio inserido deve corresponder sempre ao hor\xE1rio local do cliente, e n\xE3o ao do agente.",checkTimezone:"Consultar Time Zone",timezoneModuleNotFound:"M\xF3dulo Time Zone n\xE3o encontrado.",headerTitle:"BAU Central",headerDesc:"Dashboard de Casos BAU",openBauCase:"Abrir caso para BAU",openBauCaseDesc:"Fluxo completo para implementa\xE7\xF5es t\xE9cnicas e suporte especializado.",requestDiscard:"Solicitar Descarte",requestDiscardDesc:"Fluxo simplificado para casos que n\xE3o requerem implementa\xE7\xE3o.",back:"Voltar",next:"Pr\xF3ximo",configuringEdit:"Configurando Edi\xE7\xE3o...",loadDashboardError:"Erro ao carregar Dashboard. Verifique sua conex\xE3o.",copiedToClipboard:"Copiado para a \xE1rea de transfer\xEAncia!",noAdditionalContext:"Nenhum contexto adicional fornecido pelo agente.",notCaptured:"N\xE3o capturado",none:"Nenhuma",language:"Idioma",lastName:"Sobrenome",phone:"Telefone",clientTimezone:"Fuso hor\xE1rio do cliente",echoEquivalence:(e,t,a)=>`<strong>${e}</strong> em ${t} equivale a <strong>${a}</strong> em Bras\xEDlia.`,echoSameZone:"O cliente est\xE1 no mesmo fuso que voc\xEA.",editPageWarning:"Aten\xE7\xE3o: Para editar as informa\xE7\xF5es, voc\xEA deve estar com a p\xE1gina deste Caso espec\xEDfico aberta no sistema. Caso contr\xE1rio, os dados capturados estar\xE3o incorretos.",onCorrectPage:"Estou na p\xE1gina correta",sending:"Enviando...",caseCreatedNoEmailConfirm:"Caso criado, mas n\xE3o conseguimos confirmar por email.",unknownError:"Erro desconhecido",newBauCase:"Novo Caso BAU",backToDashboard:"Voltar ao Dashboard",confirmDataBeforeSending:"Confirme os dados antes de enviar",submitToTl:"Enviar para o TL",saveChanges:"Salvar Altera\xE7\xF5es",editingCase:e=>`Editando Caso #${e}`,fillDetailsBelow:"Preencha os detalhes abaixo",caseSentSuccess:"Caso enviado com sucesso!",caseSentSuccessSub:"Sua solicita\xE7\xE3o foi recebida e ser\xE1 processada em breve.",genericErrorTitle:"Ops! Algo deu errado",genericErrorSub:"N\xE3o conseguimos carregar seus casos BAU no momento.",tryAgain:"Tentar Novamente",notInformed:"N\xE3o informado",reasonTooltip:"O que deve ser feito em BAU",reasonPrefix:"Motivo:",metricAwaitingTl:"Aguardando TL",caseDetailsTitle:"Detalhes do Caso",copy:"Copiar",advertiser:"Anunciante",status:"Status",cidLabel:"CID",caseIdLabel:"Case ID",speakeasyId:"Speakeasy ID",advertiserEmail:"Email do Anunciante",site:"Site",timezone:"Timezone",responsibleAm:"AM Respons\xE1vel",salesProgram:"Programa de Vendas",bauReason:"Motivo BAU",requestedTasks:"Tasks solicitadas",justification:"Justificativa",detailedDescription:"Descri\xE7\xE3o detalhada",availability:"Disponibilidade",urgent:"Urgente",undefinedName:"Nome indefinido",customerIdTooltip:"Customer ID do Anunciante",cidTooltip:"CID do Anunciante (Formato: 000-000-0000)",incompleteData:"Dados Incompletos",invalidCid:"CID Inv\xE1lido",contactSupport:"Contate o Suporte",editRequest:"Editar Solicita\xE7\xE3o",edit:"Editar",refresh:"Atualizar",noRecentCases:"Nenhum caso recente",casesWillAppear:"Seus casos BAU aparecer\xE3o aqui",createdApproved:"Criados / Aprovados",refreshDashboard:"Atualizar Dashboard",statusPendingDiscard:"Descarte em avalia\xE7\xE3o",copyFieldAria:e=>`Copiar ${e} para a \xE1rea de transfer\xEAncia`,metricAwaitingDiscard:"Descarte em avalia\xE7\xE3o",rescanTitle:"Recapturar os dados desta tela",rescanDone:"Dados recapturados da tela atual.",errorPrefix:e=>`Erro: ${e}`,selectAtLeastOne:e=>`Erro: Selecione pelo menos uma op\xE7\xE3o para "${e}".`,fieldRequiredDouble:e=>`Erro: O campo "${e}" \xE9 obrigat\xF3rio.`,fieldRequiredSingle:e=>`Erro: O campo '${e}' \xE9 obrigat\xF3rio.`,whatMustBeDone:"O que deve ser feito",editTasksHint:"Para editar as tasks, volte ao Passo 2",editScheduleHint:"Para editar o agendamento, volte ao Passo 3",bauJustification:"Justificativa BAU",description:"Descri\xE7\xE3o",availabilityPriority:"Disponibilidade (Prioridade)",suggestDiscardQuestion:"O caso deve ser descartado pelo TL?",editingCaseHash:e=>`Voc\xEA est\xE1 editando o caso #${e}`,editingDiscardHash:e=>`Voc\xEA est\xE1 editando o descarte do caso #${e}`,discardReason:"Motivo do Descarte",discardDescription:"Descri\xE7\xE3o do Descarte",notInformedPlaceholder:"N\xE3o informado",caseUpdatedSuccess:"Caso atualizado com sucesso!",caseDiscardSentSuccess:"Caso enviado para descarte com sucesso!"},es:{statusPending:"Esperando al TL",statusApproved:"Aprobado / Creado",statusDiscarded:"Descartado por el TL",statusCanceled:"Cancelado",statusDefault:"Pendiente",timezoneWarningStrong:"Atenci\xF3n:",timezoneWarningText:"Para clientes fuera del huso horario de Brasil, el horario ingresado siempre debe corresponder al horario local del cliente, no al del agente.",checkTimezone:"Consultar Time Zone",timezoneModuleNotFound:"M\xF3dulo Time Zone no encontrado.",headerTitle:"BAU Central",headerDesc:"Panel de Casos BAU",openBauCase:"Abrir caso para BAU",openBauCaseDesc:"Flujo completo para implementaciones t\xE9cnicas y soporte especializado.",requestDiscard:"Solicitar Descarte",requestDiscardDesc:"Flujo simplificado para casos que no requieren implementaci\xF3n.",back:"Volver",next:"Siguiente",configuringEdit:"Configurando Edici\xF3n...",loadDashboardError:"Error al cargar el Panel. Verifica tu conexi\xF3n.",copiedToClipboard:"\xA1Copiado al portapapeles!",noAdditionalContext:"Ning\xFAn contexto adicional proporcionado por el agente.",notCaptured:"No capturado",none:"Ninguna",language:"Idioma",lastName:"Apellido",phone:"Tel\xE9fono",clientTimezone:"Huso horario del cliente",echoEquivalence:(e,t,a)=>`<strong>${e}</strong> en ${t} equivale a <strong>${a}</strong> en Brasilia.`,echoSameZone:"El cliente est\xE1 en el mismo huso que t\xFA.",editPageWarning:"Atenci\xF3n: Para editar la informaci\xF3n, debes tener abierta en el sistema la p\xE1gina de este Caso espec\xEDfico. De lo contrario, los datos capturados estar\xE1n incorrectos.",onCorrectPage:"Estoy en la p\xE1gina correcta",sending:"Enviando...",caseCreatedNoEmailConfirm:"Caso creado, pero no pudimos confirmar por email.",unknownError:"Error desconocido",newBauCase:"Nuevo Caso BAU",backToDashboard:"Volver al Panel",confirmDataBeforeSending:"Confirma los datos antes de enviar",submitToTl:"Enviar al TL",saveChanges:"Guardar Cambios",editingCase:e=>`Editando Caso #${e}`,fillDetailsBelow:"Completa los detalles a continuaci\xF3n",caseSentSuccess:"\xA1Caso enviado con \xE9xito!",caseSentSuccessSub:"Tu solicitud fue recibida y ser\xE1 procesada en breve.",genericErrorTitle:"\xA1Ups! Algo sali\xF3 mal",genericErrorSub:"No pudimos cargar tus casos BAU en este momento.",tryAgain:"Intentar de Nuevo",notInformed:"No informado",reasonTooltip:"Qu\xE9 debe hacerse en BAU",reasonPrefix:"Motivo:",metricAwaitingTl:"Esperando al TL",caseDetailsTitle:"Detalles del Caso",copy:"Copiar",advertiser:"Anunciante",status:"Estado",cidLabel:"CID",caseIdLabel:"Case ID",speakeasyId:"Speakeasy ID",advertiserEmail:"Email del Anunciante",site:"Sitio",timezone:"Timezone",responsibleAm:"AM Responsable",salesProgram:"Programa de Ventas",bauReason:"Motivo BAU",requestedTasks:"Tareas solicitadas",justification:"Justificaci\xF3n",detailedDescription:"Descripci\xF3n detallada",availability:"Disponibilidad",urgent:"Urgente",undefinedName:"Nombre indefinido",customerIdTooltip:"Customer ID del Anunciante",cidTooltip:"CID del Anunciante (Formato: 000-000-0000)",incompleteData:"Datos Incompletos",invalidCid:"CID Inv\xE1lido",contactSupport:"Contacta al Soporte",editRequest:"Editar Solicitud",edit:"Editar",refresh:"Actualizar",noRecentCases:"Ning\xFAn caso reciente",casesWillAppear:"Tus casos BAU aparecer\xE1n aqu\xED",createdApproved:"Creados / Aprobados",refreshDashboard:"Actualizar Panel",statusPendingDiscard:"Descarte en evaluaci\xF3n",copyFieldAria:e=>`Copiar ${e} al portapapeles`,metricAwaitingDiscard:"Descarte en evaluaci\xF3n",rescanTitle:"Recapturar los datos de esta pantalla",rescanDone:"Datos recapturados de la pantalla actual.",errorPrefix:e=>`Error: ${e}`,selectAtLeastOne:e=>`Error: Selecciona al menos una opci\xF3n para "${e}".`,fieldRequiredDouble:e=>`Error: El campo "${e}" es obligatorio.`,fieldRequiredSingle:e=>`Error: El campo '${e}' es obligatorio.`,whatMustBeDone:"Qu\xE9 debe hacerse",editTasksHint:"Para editar las tareas, vuelve al Paso 2",editScheduleHint:"Para editar la programaci\xF3n, vuelve al Paso 3",bauJustification:"Justificaci\xF3n BAU",description:"Descripci\xF3n",availabilityPriority:"Disponibilidad (Prioridad)",suggestDiscardQuestion:"\xBFEl caso debe ser descartado por el TL?",editingCaseHash:e=>`Est\xE1s editando el caso #${e}`,editingDiscardHash:e=>`Est\xE1s editando el descarte del caso #${e}`,discardReason:"Motivo del Descarte",discardDescription:"Descripci\xF3n del Descarte",notInformedPlaceholder:"No informado",caseUpdatedSuccess:"\xA1Caso actualizado con \xE9xito!",caseDiscardSentSuccess:"\xA1Caso enviado a descarte con \xE9xito!"}};function N(e){let t=de();return ur[t]?.[e]??ur.pt[e]}var Ne={add:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',back:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',wand:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.41l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/></svg>',send:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',check:'<svg width="64" height="64" viewBox="0 0 24 24" fill="none"><path class="bau-check-path" d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',folder:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',empty:'<svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.44 2s2.75-.81 3.44-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z"/></svg>',refresh:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',expand:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>'};function mr(e){switch(e){case"PENDING_TL_CREATION":return{text:N("statusPending"),class:"status-yellow",aura:"status-yellow-aura"};case"PENDING_TL_DISCARD":return{text:N("statusPendingDiscard"),class:"status-orange",aura:"status-orange-aura"};case"CREATED":return{text:N("statusApproved"),class:"status-green",aura:"status-green-aura"};case"DISCARDED":return{text:N("statusDiscarded"),class:"status-red",aura:"status-red-aura"};case"CANCELED_BY_AGENT":return{text:N("statusCanceled"),class:"status-gray",aura:""};default:return{text:e||N("statusDefault"),class:"status-gray",aura:""}}}function bl(e,t,a){let o=document.createElement("label");return o.className="bau-task-item",o.classList.toggle("active",a),o.innerHTML=`<input type="checkbox" name="${t}" value="${e}"><span>${e}</span>`,o.querySelector("input").checked=a,o.addEventListener("click",i=>{i.preventDefault();let n=o.querySelector("input");n.checked=!n.checked,o.classList.toggle("active",n.checked),v.playClick()}),o}function Io(e,t=[]){let a=e.dataset.fieldName||"taskType",o=new Set(Array.from(e.querySelectorAll("input:checked")).map(n=>n.value));t.map(n=>String(n||"").trim()).filter(Boolean).forEach(n=>o.add(n));let i=pr();o.forEach(n=>{i.includes(n)||i.push(n)}),e.innerHTML="",i.forEach(n=>e.appendChild(bl(n,a,o.has(n))))}function gr(e,t=[]){e.querySelectorAll("input:checked").forEach(a=>{a.checked=!1}),Io(e,t)}function br(e){let t=document.createElement("div");if(t.className="bau-dynamic-input",t.id=`wrapper-${e.id}`,e.label){let o=document.createElement("label");o.className="bau-label",o.textContent=et(e,"label"),e.tooltip&&o.setAttribute("data-tooltip",et(e,"tooltip")),t.appendChild(o)}let a;switch(e.type){case"textarea":a=document.createElement("textarea"),a.style.minHeight="80px",t.appendChild(a);break;case"select":a=document.createElement("select"),e.groups?e.groups.forEach(c=>{let m=document.createElement("optgroup");m.label=c.label,c.options.forEach(p=>{let f=document.createElement("option");f.value=p.value,f.textContent=Ke(p.text),m.appendChild(f)}),a.appendChild(m)}):e.options&&e.options.forEach(c=>{let m=document.createElement("option");m.value=c.value,m.textContent=Ke(c.text),a.appendChild(m)}),t.appendChild(a);break;case"checkbox-grid":return a=document.createElement("div"),a.className="bau-tasks-grid",a.dataset.fieldName=e.name,Io(a),t.appendChild(a),t;case"datetime-group":a=document.createElement("div"),a.className="bau-availability-container";let o=document.createElement("div");o.className="bau-timezone-row",o.innerHTML=`
                <span class="bau-field-hint">${N("clientTimezone")}</span>
                <select name="availabilityTimezone" class="bau-select">
                    ${Dt.map(c=>`<option value="${c.zone}">${c.flag} ${c.name} \u2014 ${c.label}</option>`).join("")}
                </select>
            `,a.appendChild(o),e.fields.forEach(c=>{let m=document.createElement("div");m.className="bau-availability-field",m.innerHTML=`
                    <span class="bau-field-hint">${et(c,"label")}</span>
                    <div class="bau-slot-row">
                        <input type="date" name="${c.name}_date" class="bau-input" ${c.required?"required":""}>
                        <select name="${c.name}_time" class="bau-select">
                            <option value="">--:--</option>
                            ${gl.map(p=>`<option value="${p}">${p}</option>`).join("")}
                        </select>
                    </div>
                `,a.appendChild(m)});let i=document.createElement("div");i.className="bau-timezone-echo",i.id="bau-availability-echo",a.appendChild(i);let n=document.createElement("div");return n.className="bau-availability-disclaimer",n.innerHTML=`
                <div class="bau-disclaimer-text">
                    <strong>${N("timezoneWarningStrong")}</strong> ${N("timezoneWarningText")}
                </div>
                <button type="button" class="bau-timezone-link" id="bau-open-timezone">
                    ${Ne.refresh}
                    ${N("checkTimezone")}
                </button>
            `,n.querySelector("#bau-open-timezone").onclick=()=>{let c=document.getElementById("cw-btn-timezone");c?(c.click(),v.playClick()):(v.playError(),te(N("timezoneModuleNotFound"),{error:!0}))},t.appendChild(a),t.appendChild(n),t;case"text-with-button":let r=document.createElement("div");r.className="bau-input-group",a=document.createElement("input"),a.type="text";let l=document.createElement("button");l.type="button",l.id=e.button.id,l.className="bau-mini-btn-input",l.title=et(e,"buttonTitle")||e.button.title,l.innerHTML=Ne[e.button.icon]||"",r.appendChild(a),r.appendChild(l),t.appendChild(r);break;default:a=document.createElement("input"),a.type="text",t.appendChild(a)}return a&&e.type!=="checkbox-grid"&&e.type!=="datetime-group"&&(a.id=`bau-form-${e.id}`,a.name=e.name,a.className=e.type==="select"?"bau-select":e.type==="textarea"?"bau-textarea":"bau-input",e.placeholder&&(a.placeholder=et(e,"placeholder")),e.required&&(a.required=!0)),t}function fr(){cr();let e=!1,t="dashboard",a=null,o=0,i="BAU",n=!1,r=null,l=wt.steps.length,c=document.createElement("div");c.id="bau-form-popup",c.className="bau-popup cw-module-window",c.style.display="none";let m=N("headerTitle"),p=N("headerDesc"),f=Pe(c,m,"v2.2.0",p,{},()=>ne());c.appendChild(f);let u=document.createElement("div");u.className="bau-view-container",c.appendChild(u);let g=document.createElement("div");g.id="bau-view-dashboard",g.className="bau-view active",g.innerHTML=`
        <div class="bau-dashboard-content">
            <div class="bau-dashboard-metrics" id="bau-dashboard-metrics"></div>
            <div class="bau-md">
                <div class="bau-md-list">
                    <ul class="bau-case-list" id="bau-case-list-container"></ul>
                </div>
                <section class="bau-md-detail" id="bau-md-detail"
                         aria-live="polite" aria-label="${N("caseDetailsTitle")}"></section>
            </div>
        </div>
        <button class="bau-dashboard-fab" id="bau-new-case-btn">
            ${Ne.add}
            <span class="js-bau-new-case">${N("newBauCase")}</span>
        </button>
    `,u.appendChild(g);let k=document.createElement("div");k.id="bau-view-form",k.className="bau-view";let w=document.createElement("div");w.className="bau-view-header",w.innerHTML=`
      <button class="bau-back-btn" id="bau-form-back-btn">
        ${Ne.back}
        <span class="js-bau-back-dashboard">${N("backToDashboard")}</span>
      </button>
    `,k.appendChild(w);let S=document.createElement("div");S.className="bau-content",k.appendChild(S);let I=document.createElement("div");I.className="bau-form-loading-overlay",I.innerHTML=`
        <div class="bau-spinner"></div>
        <div class="bau-loading-text js-bau-configuring-edit">${N("configuringEdit")}</div>
    `,S.appendChild(I);let A=s=>{I.classList.toggle("active",s)},_=document.createElement("div");_.className="bau-progress-indicator",S.appendChild(_);let b=document.createElement("form");b.id="bau-escalation-form",b.noValidate=!0,S.appendChild(b),wt.steps.forEach(s=>{let y=document.createElement("div");if(y.className="bau-step"+(s.id===o?" active":""),y.id=`bau-step-${s.id}`,s.isBranching)y.innerHTML=`
                <div class="bau-branching-container">
                    <div class="bau-branching-card" id="bau-opt-full">
                        <div class="bau-branching-icon">${Ne.add}</div>
                        <h3 class="bau-branching-title">${N("openBauCase")}</h3>
                        <p class="bau-branching-subtitle">${N("openBauCaseDesc")}</p>
                    </div>
                    <div class="bau-branching-card" id="bau-opt-discard">
                        <div class="bau-branching-icon">${Ne.empty}</div>
                        <h3 class="bau-branching-title">${N("requestDiscard")}</h3>
                        <p class="bau-branching-subtitle">${N("requestDiscardDesc")}</p>
                    </div>
                </div>
            `,y.querySelector("#bau-opt-full").onclick=()=>{i="BAU",o=1,b.querySelectorAll(".bau-highlight-panel").forEach(L=>L.classList.remove("discard-theme")),W(),v.playClick()},y.querySelector("#bau-opt-discard").onclick=()=>{i="DISCARD",o=5,b.querySelectorAll(".bau-highlight-panel").forEach(L=>L.classList.add("discard-theme")),W(),v.playClick()};else if(s.isConfirmation)y.innerHTML=`
                <div class="bau-card">
                    <h3 class="bau-step-title">${N("confirmDataBeforeSending")}</h3>
                    <div id="bau-confirmation-details"></div>
                </div>
            `;else{let L=document.createElement("div");if(L.className="bau-card",s.id===1||s.id===5){L.innerHTML=`
                    <div class="bau-vital-highlights bau-highlight-panel"></div>
                    <div class="bau-dynamic-inputs-container"></div>
                    <div class="bau-all-data"></div>
                `;let J=L.querySelector(".bau-dynamic-inputs-container");s.fields.forEach(x=>{J.appendChild(br(x))});let d=L.querySelector("#wrapper-cid");if(d){let x=document.createElement("div");x.id="bau-cid-error",x.className="bau-cid-error-hint",x.style.display="none",x.textContent="Formato de CID incorreto",d.appendChild(x)}}else s.fields.forEach(J=>{L.appendChild(br(J))});y.appendChild(L)}b.appendChild(y)});let M=document.createElement("div");M.className="bau-footer";let F=document.createElement("button");F.type="button",F.id="bau-step-back-btn",F.className="bau-btn-secondary",F.textContent=N("back");let H=document.createElement("button");H.type="button",H.id="bau-step-next-btn",H.className="bau-btn-primary",H.textContent=N("next");let B=document.createElement("button");B.type="submit",B.className="bau-btn-submit",B.innerHTML=`${Ne.send} ${N("submitToTl")}`,B.style.display="none",M.appendChild(F),M.appendChild(H),M.appendChild(B),b.appendChild(M),u.appendChild(k);let G=document.createElement("div");G.id="bau-view-success",G.className="bau-view bau-success-view",G.innerHTML=`
        <div class="bau-success-content">
            <div class="bau-success-icon" style="color: ${ze.green};">${Ne.check}</div>
            <h2 class="bau-success-title js-bau-success-title">${N("caseSentSuccess")}</h2>
            <p class="bau-success-subtitle js-bau-success-sub">${N("caseSentSuccessSub")}</p>
            <button class="bau-btn-primary js-bau-success-back" id="bau-success-back-btn">${N("backToDashboard")}</button>
        </div>
    `,u.appendChild(G),document.body.appendChild(c),Ca(()=>{let s=b.querySelector(".bau-tasks-grid");s&&Io(s)});function E(s){t=s,c.querySelectorAll(".bau-view").forEach(x=>x.classList.remove("active"));let y=c.querySelector(`#bau-view-${s}`);y&&y.classList.add("active");let L=f.querySelector(".cw-module-header-title")||f.querySelector("h2"),J=f.querySelector(".cw-module-header-subtitle")||f.querySelector("p");L&&(s==="form"?L.textContent=n?N("editingCase")(r):N("newBauCase"):L.textContent=N("headerTitle")),J&&(J.textContent=N(s==="form"?"fillDetailsBelow":"headerDesc"));let d=b.querySelector(".bau-btn-submit");d&&(d.innerHTML=n?`${Ne.send} ${N("saveChanges")}`:`${Ne.send} ${N("submitToTl")}`)}function T(){let s=c.querySelector("#bau-case-list-container"),y=c.querySelector("#bau-dashboard-metrics");y&&(y.innerHTML=`
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
            `),s&&(s.innerHTML=Array(5).fill(0).map(()=>`
            <div class="bau-skeleton-card">
                <div class="bau-shimmer"></div>
            </div>
        `).join(""))}async function R(){let s=c.querySelector("#bau-case-list-container"),y=c.querySelector("#bau-dashboard-metrics");if(!(!s||!y)){T();try{let L=await zo();if(!Array.isArray(L))throw new Error("API response is not a valid array");re(L)}catch(L){console.error("Critical Error loading BAU cases:",L),y&&(y.innerHTML=""),s.innerHTML=`
                <div class="bau-empty-state bau-error-state">
                    <div style="color: ${ze.red}; margin-bottom: 16px;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    </div>
                    <h3 class="bau-empty-title">${N("genericErrorTitle")}</h3>
                    <p class="bau-empty-subtitle">${N("genericErrorSub")}</p>
                    <button class="bau-btn-secondary" id="bau-retry-btn" style="margin-top: 16px;">
                        ${N("tryAgain")}
                    </button>
                </div>
            `,c.querySelector("#bau-retry-btn")?.addEventListener("click",()=>R()),v.playError(),te(N("loadDashboardError"),{error:!0})}}}function C(s){let y=c.querySelector("#bau-md-detail");if(!y||!s)return;let L=mr(s.status),J=h=>h||"---",d=[{rotulo:N("cidLabel"),valor:s.cid,mono:!0},{rotulo:N("caseIdLabel"),valor:s.caseId,mono:!0},{rotulo:N("speakeasyId"),valor:s.seId,mono:!0},{rotulo:N("advertiserEmail"),valor:s.advEmail},{rotulo:N("phone"),valor:s.advPhone,mono:!0},{rotulo:N("site"),valor:s.site},{rotulo:N("responsibleAm"),valor:s.amName}],x=[{rotulo:N("bauReason"),valor:s.reason||N("notInformed")},{rotulo:N("requestedTasks"),valor:s.task||s.taskType||N("none")},{rotulo:N("justification"),valor:J(s.nonImplementationReason)},{rotulo:N("detailedDescription"),valor:J(s.description)},{rotulo:N("availability"),valor:oa(s.availability)},{rotulo:N("timezone"),valor:J(s.timezone)},{rotulo:N("language"),valor:J(s.language)},{rotulo:N("salesProgram"),valor:J(s.salesProgram)}];y.innerHTML=`
            <div class="bau-md-head">
                <h2 class="bau-md-title">${[s.advName,s.advLastName].filter(Boolean).join(" ")||N("undefinedName")}</h2>
                <div class="bau-md-head-meta">
                    <span class="bau-case-status-badge ${L.class}">${L.text}</span>
                    <span class="bau-md-date">${oa(s.date)}</span>
                </div>
            </div>

            <section class="bau-md-briefing" aria-label="${N("bauReason")}">
                ${x.map((h,$)=>`
                    <div class="bau-md-line${$===x.length-1?" is-last":""}">
                        <span class="bau-md-label">${h.rotulo}</span>
                        <span class="bau-md-value">${h.valor}</span>
                    </div>
                `).join("")}
            </section>

            <section class="bau-md-data" aria-label="${N("caseDetailsTitle")}">
                ${d.map((h,$)=>`
                    <div class="bau-md-line${$===d.length-1?" is-last":""}">
                        <span class="bau-md-label">${h.rotulo}</span>
                        <span class="bau-md-value${h.mono?" is-mono":""}">${J(h.valor)}</span>
                        ${h.valor?`
                            <button type="button" class="bau-md-copy"
                                    data-valor="${String(h.valor).replace(/"/g,"&quot;")}"
                                    aria-label="${N("copyFieldAria")(h.rotulo)}">
                                ${Ne.wand}
                            </button>`:""}
                    </div>
                `).join("")}
            </section>
        `}function z(s){if(!s)return"";let y=mr(s?.status),L=oa(s?.date),J="",d="",x=String(s?.availability||"").split("|")[0].trim();if(s?.status==="PENDING_TL_CREATION"&&x){let Z=new Date(x),ge=new Date;!isNaN(Z.getTime())&&(Z<=ge||Z-ge<36e5*2)&&(J=`<span class="bau-sla-badge">${N("urgent")}</span>`,d="bau-pulse-attention")}let h=s?.reason&&s.reason.trim()?s.reason:N("noAdditionalContext"),P=/^(\d{3}-\d{3}-\d{4}|\d{10})$/.test(s?.cid||""),oe=!s?.caseId||s.caseId==="N/A"||!P;return oe&&s?.status==="PENDING_TL_CREATION"&&(d="bau-pulse-attention"),`
            <li class="bau-case-card ${y.aura} ${d}" data-case-id="${s?.id||""}">
                <div class="bau-case-main">
                    <div class="bau-case-icon">${Ne.folder}</div>
                    <div class="bau-case-info">
                        <div class="bau-case-header">
                            <h3 class="bau-case-title">${[s?.advName,s?.advLastName].filter(Boolean).join(" ")||N("undefinedName")}</h3>
                            ${J}
                            <span class="bau-case-date">${L}</span>
                        </div>
                        <p class="bau-case-details">
                            <span data-tooltip="${N("customerIdTooltip")}">Case: ${s?.caseId||"N/A"}</span> \u2022
                            <span data-tooltip="${N("cidTooltip")}" class="${P?"":"bau-error-text"}">CID: ${s?.cid||"N/A"}</span> \u2022
                            <span data-tooltip="${N("reasonTooltip")}">${N("reasonPrefix")} ${h}</span>
                        </p>
                        ${oe?`<div class="bau-data-error-hint">${!s?.caseId||s?.caseId==="N/A"?N("incompleteData"):N("invalidCid")} - ${N("contactSupport")}</div>`:""}
                    </div>
                </div>
                <div class="bau-case-actions">
                    <span class="bau-case-status-badge ${y.class}">${y.text}</span>
                    ${s?.status&&s.status.includes("PENDING")?`
                        <button class="bau-case-edit-btn" data-id="${s.id}" title="${N("editRequest")}">
                            ${Ne.edit}
                            ${N("edit")}
                        </button>
                    `:""}
                </div>
            </li>
        `}let Q=null;function ie(){Q=null,c.querySelector(".bau-md")?.classList.remove("is-open"),c.querySelectorAll("#bau-case-list-container .bau-case-card").forEach(s=>{s.classList.remove("is-selected"),s.setAttribute("aria-expanded","false")})}function Y(s,y){if(Q===y?.id){ie(),v.playSwoosh();return}Q=y?.id||null,c.querySelectorAll("#bau-case-list-container .bau-case-card").forEach(L=>{let J=L===s;L.classList.toggle("is-selected",J),L.setAttribute("aria-expanded",J?"true":"false")}),C(y),c.querySelector(".bau-md")?.classList.add("is-open"),v.playClick()}function re(s){let y=c.querySelector("#bau-case-list-container"),L=c.querySelector("#bau-dashboard-metrics");if(!y||!L)return;let J=Array.isArray(s)?s.filter(Boolean):[];if(J.length===0){L.innerHTML=`
                <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard">
                    ${Ne.refresh}
                    ${N("refresh")}
                </button>
            `,y.innerHTML=`
                <div class="bau-empty-state">
                    ${Ne.empty}
                    <h3 class="bau-empty-title">${N("noRecentCases")}</h3>
                    <p class="bau-empty-subtitle">${N("casesWillAppear")}</p>
                </div>
            `,c.querySelector("#bau-refresh-dashboard")?.addEventListener("click",()=>R());return}let d=J.filter(Z=>Z.status==="PENDING_TL_CREATION").length,x=J.filter(Z=>Z.status==="PENDING_TL_DISCARD").length,h=J.filter(Z=>Z.status==="CREATED").length;L.innerHTML=`
            <div class="bau-metric-card">
                <span class="bau-metric-value">${d}</span>
                <span class="bau-metric-label">${N("metricAwaitingTl")}</span>
            </div>
            <div class="bau-metric-card">
                <span class="bau-metric-value">${x}</span>
                <span class="bau-metric-label">${N("metricAwaitingDiscard")}</span>
            </div>
            <div class="bau-metric-card">
                <span class="bau-metric-value">${h}</span>
                <span class="bau-metric-label">${N("createdApproved")}</span>
            </div>
            <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard" title="${N("refreshDashboard")}">
                ${Ne.refresh}
            </button>
        `;let $=L.querySelector("#bau-refresh-dashboard");$?.addEventListener("click",async()=>{$.classList.contains("spinning")||($.classList.add("spinning"),v.playClick(),await R(),setTimeout(()=>$.classList.remove("spinning"),1e3))}),y.innerHTML="",ie();let P=J.slice(0,5),oe=J.slice(5);if(P.forEach(Z=>{let ge=z(Z),ye=document.createElement("div");ye.innerHTML=ge;let be=ye.firstElementChild;be.addEventListener("click",Ge=>{Ge.target.closest(".bau-case-edit-btn")||Y(be,Z)});let ke=be.querySelector(".bau-case-edit-btn");ke&&(ke.onclick=Ge=>{Ge.stopPropagation(),D(Z)}),y.appendChild(be)}),oe.length>0){let Z=document.createElement("li");Z.className="bau-accordion-container";let ge=document.createElement("button");ge.className="bau-accordion-toggle",ge.innerHTML=`${Ne.expand} <span>Mostrar ${oe.length} casos mais antigos</span>`;let ye=document.createElement("ul");ye.className="bau-case-list bau-accordion-content",ye.style.display="none",oe.forEach(be=>{let ke=z(be),Ge=document.createElement("div");Ge.innerHTML=ke;let rt=Ge.firstElementChild;rt.addEventListener("click",St=>{St.target.closest(".bau-case-edit-btn")||Y(rt,be)});let bt=rt.querySelector(".bau-case-edit-btn");bt&&(bt.onclick=St=>{St.stopPropagation(),D(be)}),ye.appendChild(rt)}),ge.addEventListener("click",()=>{let be=ye.style.display==="none";ye.style.display=be?"block":"none",ge.classList.toggle("expanded",be),ge.querySelector("span").textContent=be?"Esconder casos mais antigos":`Mostrar ${oe.length} casos mais antigos`,v.playClick()}),Z.appendChild(ge),Z.appendChild(ye),y.appendChild(Z)}}function W(){let s=i==="BAU"?[1,2,3,4]:[5,4];b.querySelectorAll(".bau-step").forEach(J=>{let d=parseInt(J.id.replace("bau-step-","")),x=d===o,h=s.includes(d)||d===0;J.classList.toggle("active",x),J.style.display=x?"block":"none",J.querySelectorAll("input, select, textarea").forEach($=>{$.disabled=!h})});let y=o===0;if(_.style.display=y?"none":"flex",!y){_.innerHTML="";let J=i==="BAU"?[1,2,3,4]:[5,4];J.forEach((d,x)=>{let h=document.createElement("div"),$=d===o,P=J.indexOf(o),oe=x<P;h.className=`bau-progress-step ${$?"active":oe?"completed":""}`,h.textContent=x+1,_.appendChild(h)})}let L=o===4;F.style.display=o>0?"inline-block":"none",H.style.display=!y&&!L?"inline-block":"none",B.style.display=L?"flex":"none",L&&ae()}function le(s){let y=wt.steps.find(L=>L.id===s);if(!y||!y.fields||y.isConfirmation)return!0;for(let L of y.fields){let J=b.querySelector(`#bau-step-${s} #wrapper-${L.id}`);if(!(J&&J.style.display==="none")&&L.validation){let d=b.querySelector(`#bau-step-${s} [name="${L.name}"]`);if(d&&d.offsetParent!==null&&d.value.trim())if(new RegExp(L.validation.regex).test(d.value.trim())){d.classList.remove("invalid-cid");let h=b.querySelector("#bau-cid-error");h&&(h.style.display="none")}else{console.warn(`Validation failed for field "${L.name}" in step ${s}: Regex mismatch.`),v.playError(),te(N("errorPrefix")(et(L,"error")||L.validation.error),{error:!0}),d.classList.add("invalid-cid");let h=b.querySelector("#bau-cid-error");return h&&(h.style.display="flex"),!1}}}return!0}function O(s){if(!b.querySelector(`#bau-step-${s}`))return!1;let L=wt.steps.find(d=>d.id===s);if(!L||!L.fields||L.isConfirmation)return!0;let J=!0;for(let d of L.fields){let x=b.querySelector(`#bau-step-${s} #wrapper-${d.id}`);if(!(x&&x.style.display==="none")&&d.required){let h=!0,$="";if(d.type==="checkbox-grid")b.querySelector(`#bau-step-${s} input[name="${d.name}"]:checked`)||($="No option selected in checkbox-grid",v.playError(),te(N("selectAtLeastOne")(et(d,"label")),{error:!0}),h=!1);else if(d.type==="datetime-group"){let P=d.fields[0].name,oe=b.querySelector(`#bau-step-${s} input[name="${P}_date"]`),Z=b.querySelector(`#bau-step-${s} select[name="${P}_time"]`);if(!oe||oe.offsetParent===null)continue;(!oe.value.trim()||!Z||!Z.value.trim())&&($="Datetime group first field is empty",v.playError(),te(N("fieldRequiredDouble")(et(d.fields[0],"label")),{error:!0}),h=!1)}else{let P=b.querySelector(`#bau-step-${s} [name="${d.name}"]`);if(!P||P.offsetParent===null)continue;P.value.trim()||($="Field is empty",v.playError(),te(N("fieldRequiredSingle")(et(d,"label")),{error:!0}),h=!1)}if(!h){console.warn(`Validation failed for required field "${d.name}" in step ${s}: ${$}`),J=!1;break}}}return J}H.addEventListener("click",()=>{if(le(o)&&O(o)){i==="BAU"?o++:o===5?o=4:o++,W();let s=c.querySelector(".bau-content");s&&(s.scrollTop=0),v.playClick()}}),F.addEventListener("click",()=>{o>0&&(i==="BAU"?o--:o===4?o=5:o===5?o=0:o--,W(),v.playClick())});async function ee(){let s=await tt()||{};a=s,b.querySelectorAll(".bau-vital-highlights").forEach(h=>{let $=[{label:"Anunciante",value:s.advName},{label:"CID",value:s.cid},{label:"Website",value:s.website||s.site},{label:"Case ID",value:s.caseId}];h.innerHTML=$.map(P=>{let oe=P.value&&P.value!=="N/A"&&P.value!=="undefined"&&P.value!=="null"?P.value:N("notCaptured");return`
                    <div class="bau-highlight-item">
                        <span class="bau-highlight-label">${P.label}</span>
                        <span class="bau-highlight-value">${oe}</span>
                    </div>
                `}).join("")+`
                <button type="button" class="bau-rescan-btn" title="${N("rescanTitle")}" aria-label="${N("rescanTitle")}">
                    ${Ne.refresh}
                </button>
            `}),wt.steps.forEach(h=>{h.fields&&h.fields.forEach($=>{if($.isSmart){let P=s[$.id],oe=b.querySelector(`#bau-step-${h.id} [name="${$.name}"]`),Z=b.querySelector(`#bau-step-${h.id} #wrapper-${$.id}`);if(oe&&(oe.value=P&&P!=="N/A"?P:""),Z){let ge=P&&P!==""&&P!=="N/A"&&P!=="undefined"&&P!=="null";Z.style.display=ge?"none":"block"}}})});let L=ko(s.timezone)||Lt,J=b.querySelector('select[name="availabilityTimezone"]');J&&(J.value=L,q());let d=s.userProfile?.defaultLanguage;d&&b.querySelectorAll('select[name="language"]').forEach(h=>{h.value=d}),b.querySelectorAll(".bau-all-data").forEach(h=>{let $=[{label:"Anunciante",value:s.advName},{label:"CID",value:s.cid},{label:"AM",value:s.amName},{label:"SE ID",value:s.seId},{label:"Site",value:s.website||s.site},{label:"Email",value:s.email},{label:"Timezone",value:s.timezone},{label:"Case ID",value:s.caseId},{label:"Programa",value:s.salesProgram},{label:"Idioma",value:s.language}];h.innerHTML=`
                <div class="bau-context-badges-grid">
                    ${$.filter(P=>P.value&&P.value!=="N/A"&&P.value!=="---"&&P.value!=="undefined"&&P.value!=="null").map(P=>`
                            <div class="bau-context-badge">
                                <span class="bau-badge-label">${P.label}:</span>
                                <span class="bau-badge-value">${P.value}</span>
                            </div>
                        `).join("")}
                </div>
            `})}c.addEventListener("keydown",s=>{s.key!=="Escape"||!Q||(s.stopPropagation(),ie(),v.playSwoosh())}),c.addEventListener("click",async s=>{let y=s.target.closest(".bau-md-copy");if(!y)return;s.preventDefault();let L=y.getAttribute("data-valor")||"";if(L){try{await navigator.clipboard.writeText(L)}catch(J){console.warn("Falha ao copiar:",J),v.playError(),te(N("genericErrorTitle"),{error:!0});return}y.classList.add("is-done"),y.innerHTML=Ne.check||Ne.wand,v.playClick(),navigator.vibrate&&navigator.vibrate(10),te(N("copiedToClipboard")),setTimeout(()=>{y.classList.remove("is-done"),y.innerHTML=Ne.wand},1500)}}),c.addEventListener("click",async s=>{let y=s.target.closest(".bau-rescan-btn");if(!(!y||y.classList.contains("spinning"))){s.preventDefault(),y.classList.add("spinning"),v.playClick();try{await ee(),te(N("rescanDone"))}catch(L){console.warn("Falha ao recapturar o contexto:",L),v.playError(),te(N("genericErrorTitle"),{error:!0})}finally{c.querySelectorAll(".bau-rescan-btn.spinning").forEach(L=>L.classList.remove("spinning"))}}}),c.addEventListener("click",s=>{let y=s.target.closest(".bau-mini-btn-input");if(!y)return;let L=y.closest(".bau-input-group")?.querySelector('input[name="seId"]');L&&(s.preventDefault(),v.playClick(),Aa(L))});let se=c.querySelector("#bau-form-cid");se&&se.addEventListener("input",()=>le(1)),b.addEventListener("change",s=>{let y=s.target?.name||"";(y==="availabilityTimezone"||y.startsWith("availability_"))&&q()});function X(s){let y=s.availabilityTimezone||Lt;return["availability_1","availability_2","availability_3"].map(L=>{let J=s[`${L}_date`],d=s[`${L}_time`];return!J||!d?"":Co(`${J}T${d}`,y)}).filter(Boolean)}function ce(s){let y=s.availabilityTimezone||Lt,L=Dt.find(x=>x.zone===y),J=X(s);return J.length===0?N("notInformedPlaceholder"):`${J.map(x=>{let[h,$]=x.split("T"),[P,oe,Z]=h.split("-");return`${Z}/${oe} ${$.slice(0,5)}`}).join("  \xB7  ")} \u2014 ${L?L.label:y}`}function q(){let s=b.querySelector("#bau-availability-echo");if(!s)return;let y=Object.fromEntries(new FormData(b).entries()),L=y.availabilityTimezone||Lt,J=y.availability_1_date,d=y.availability_1_time;if(!J||!d){s.innerHTML="";return}if(L===Lt){s.textContent=N("echoSameZone");return}let x=Co(`${J}T${d}`,L),h=new Date(x);if(isNaN(h.getTime())){s.innerHTML="";return}let $=new Intl.DateTimeFormat("pt-BR",{timeZone:Lt,day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).format(h),P=Dt.find(oe=>oe.zone===L);s.innerHTML=N("echoEquivalence")(d,P?P.label:L,$)}function j(s){return(wt.steps.flatMap(L=>L.fields||[]).find(L=>L.id==="language")?.options||[]).map(L=>`<option value="${L.value}" ${L.value===s?"selected":""}>${Ke(L.text)}</option>`).join("")}function ae(){let s=new FormData(b),y=Object.fromEntries(s.entries()),L=c.querySelector("#bau-confirmation-details");if(L){if(i==="BAU"){let J=s.getAll("taskType"),d=J.length>0?J.join(", "):N("none");L.innerHTML=`
                ${n?`<div class="bau-highlight-panel" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${ze.yellow}; background: rgba(255, 186, 0, 0.05); border-radius: 8px; font-weight: 500;">${N("editingCaseHash")(`<span style="color: ${ze.yellow}">${r}</span>`)}</div>`:""}
                <div class="bau-confirmation-grid">
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Anunciante</span>
                        <input class="bau-confirm-value-input" data-field="advName" data-step="1" value="${y.advName||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${N("lastName")}</span>
                        <input class="bau-confirm-value-input" data-field="advLastName" data-step="1" value="${y.advLastName||""}" placeholder="${N("notInformedPlaceholder")}">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${N("advertiserEmail")}</span>
                        <input class="bau-confirm-value-input" data-field="advEmail" data-step="1" value="${y.advEmail||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${N("phone")}</span>
                        <input class="bau-confirm-value-input" data-field="advPhone" data-step="1" value="${y.advPhone||""}" placeholder="${N("notInformedPlaceholder")}">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">CID</span>
                        <input class="bau-confirm-value-input" data-field="cid" data-step="1" value="${y.cid||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">AM</span>
                        <input class="bau-confirm-value-input" data-field="amName" data-step="1" value="${y.amName||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Website</span>
                        <input class="bau-confirm-value-input" data-field="website" data-step="1" value="${y.website||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Speakeasy ID</span>
                        <input class="bau-confirm-value-input" data-field="seId" data-step="1" value="${y.seId||""}" placeholder="${N("notInformedPlaceholder")}">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${N("language")}</span>
                        <select class="bau-confirm-value-input" data-field="language" data-step="1">
                            ${j(y.language)}
                        </select>
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${N("whatMustBeDone")}</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="reason" data-step="2" placeholder="---">${y.reason||""}</textarea>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Tasks</span>
                        <span class="bau-confirm-value-input" style="cursor: default; opacity: 0.8;" title="${N("editTasksHint")}">${d}</span>
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${N("bauJustification")}</span>
                        <select class="bau-confirm-value-input" data-field="nonImplementationReason" data-step="3">
                            <option value="Tempo da consultoria esgotado" ${y.nonImplementationReason==="Tempo da consultoria esgotado"?"selected":""}>${Ke("Tempo da consultoria esgotado")}</option>
                            <option value="Solicita\xE7\xE3o de reagendamento pelo anunciante" ${y.nonImplementationReason==="Solicita\xE7\xE3o de reagendamento pelo anunciante"?"selected":""}>${Ke("Solicita\xE7\xE3o de reagendamento pelo anunciante")}</option>
                            <option value="Falta de acessos ou backup do site" ${y.nonImplementationReason==="Falta de acessos ou backup do site"?"selected":""}>${Ke("Falta de acessos ou backup do site")}</option>
                            <option value="Anunciante indispon\xEDvel ou n\xE3o preparado" ${y.nonImplementationReason==="Anunciante indispon\xEDvel ou n\xE3o preparado"?"selected":""}>${Ke("Anunciante indispon\xEDvel ou n\xE3o preparado")}</option>
                            <option value="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)" ${y.nonImplementationReason==="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"?"selected":""}>${Ke("Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)")}</option>
                            <option value="Solicita\xE7\xE3o de tarefas (tasks) adicionais" ${y.nonImplementationReason==="Solicita\xE7\xE3o de tarefas (tasks) adicionais"?"selected":""}>${Ke("Solicita\xE7\xE3o de tarefas (tasks) adicionais")}</option>
                            <option value="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)" ${y.nonImplementationReason==="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"?"selected":""}>${Ke("Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)")}</option>
                            <option value="Retorno de contato ap\xF3s prazo de 14 dias expirado" ${y.nonImplementationReason==="Retorno de contato ap\xF3s prazo de 14 dias expirado"?"selected":""}>${Ke("Retorno de contato ap\xF3s prazo de 14 dias expirado")}</option>
                        </select>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${N("description")}</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="3" placeholder="---">${y.description||""}</textarea>
                    </div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${N("availabilityPriority")}</span>
                        <span class="bau-confirm-value-input" style="cursor: default; opacity: 0.8;" title="${N("editScheduleHint")}">${ce(y)}</span>
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${N("suggestDiscardQuestion")}</span>
                        <select class="bau-confirm-value-input" data-field="suggestDiscard" data-step="3">
                            <option value="N\xE3o" ${y.suggestDiscard==="N\xE3o"?"selected":""}>${Ke("N\xE3o")}</option>
                            <option value="Sim" ${y.suggestDiscard==="Sim"?"selected":""}>${Ke("Sim")}</option>
                        </select>
                    </div>
                </div>
            `}else L.innerHTML=`
                ${n?`<div class="bau-highlight-panel discard-theme" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${ze.red}; background: rgba(217, 48, 37, 0.05); border-radius: 8px; font-weight: 500;">${N("editingDiscardHash")(`<span style="color: ${ze.red}">${r}</span>`)}</div>`:""}
                <div class="bau-confirmation-grid">
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Case ID</span>
                        <input class="bau-confirm-value-input" data-field="caseId" data-step="5" value="${y.caseId||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${N("language")}</span>
                        <select class="bau-confirm-value-input" data-field="language" data-step="5">
                            ${j(y.language)}
                        </select>
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Speakeasy ID</span>
                        <input class="bau-confirm-value-input" data-field="seId" data-step="5" value="${y.seId||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${N("discardReason")}</span>
                        <input class="bau-confirm-value-input" data-field="reason" data-step="5" value="${y.reason||""}" placeholder="---" readonly style="opacity: 0.7;">
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${N("discardDescription")}</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="5" placeholder="---">${y.description||""}</textarea>
                    </div>
                </div>
            `;L.querySelectorAll(".bau-confirm-value-input").forEach(J=>{J.addEventListener("input",d=>{let x=d.target.dataset.field,h=d.target.dataset.step;if(!x||!h)return;let $=b.querySelector(`#bau-step-${h} [name="${x}"]`);$&&($.value=d.target.value,x==="cid"&&le(1))})})}}async function D(s){if(!await De(N("editPageWarning"),{confirmText:N("onCorrectPage")}))return;A(!0),U(),n=!0,r=s.id,i=s.status==="PENDING_TL_DISCARD"||s.reason&&!s.task?"DISCARD":"BAU",E("form"),await ee(),a={...a,advName:s.advName||a.advName,advLastName:s.advLastName||a.advLastName,advPhone:s.advPhone||a.advPhone,cid:s.cid||a.cid,caseId:s.caseId||a.caseId,seId:s.seId||a.seId,site:s.site||s.website||a.site||a.website,email:s.advEmail||a.email,timezone:s.timezone||a.timezone,language:s.language||a.language,amName:s.amName||a.amName,salesProgram:s.salesProgram||a.salesProgram};let L=s.availability?s.availability.split("|").map(x=>x.trim()):[],J=(s.task||s.taskType||"").split(",").map(x=>x.trim()).filter(Boolean),d=b.querySelector(".bau-tasks-grid");d&&gr(d,J),b.querySelectorAll("input, select, textarea").forEach(x=>{let h=x.name,P={advEmail:"advEmail",website:"site",site:"site"}[h]||h;if(h==="taskType"){let oe=(s.task||s.taskType||"").split(",").map(Z=>Z.trim());x.type==="checkbox"&&(x.checked=oe.includes(x.value),x.closest(".bau-task-item")?.classList.toggle("active",x.checked))}else if(h==="availabilityTimezone"){let oe=ko(s.timezone)||Lt;Array.from(x.options).some(Z=>Z.value===oe)&&(x.value=oe)}else if(h.startsWith("availability_")){let oe=h.split("_"),Z=parseInt(oe[1],10)-1,ge=oe[2],ye=L[Z],be=String(ye||"").match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/);if(!be)return;ge==="date"&&(x.value=be[1]),ge==="time"&&(Array.from(x.options).some(ke=>ke.value===be[2])||x.add(new Option(be[2],be[2])),x.value=be[2])}else h==="language"||h==="suggestDiscard"?Array.from(x.options).some(Z=>Z.value===s[h])&&(x.value=s[h]):s[P]!==void 0?x.value=s[P]:h==="reason"?x.value=s.reason:h==="description"?x.value=s.description:h==="nonImplementationReason"&&(x.value=s.nonImplementationReason||"")}),o=i==="BAU"?1:5,W(),v.playClick(),setTimeout(()=>A(!1),500)}b.onsubmit=async s=>{s.preventDefault();let y=i==="BAU"?[1,2,3]:[5];for(let $ of y)if(!wt.steps.find(oe=>oe.id===$)?.isConfirmation&&(!le($)||!O($))){console.warn(`Form submission blocked by validation failure in step ${$}`),o=$,W();return}let L=c.querySelector(".bau-btn-submit");L.disabled=!0,L.innerHTML=N("sending");let J=new FormData(b),d=Object.fromEntries(J.entries()),x=a||{},h={...x,...d,requestType:i};if(d.advEmail?h.advEmail=d.advEmail:x.email&&(h.advEmail=x.email),d.website?h.website=d.website:x.website?h.website=x.website:x.site&&(h.website=x.site),i==="BAU"){let $=J.getAll("taskType"),P=X(d).join(" | ");h.taskType=$.join(", "),h.availability=P,n?(d.nonImplementationReason?h.nonImplementationReason=d.nonImplementationReason:delete h.nonImplementationReason,d.description?h.description=d.description:delete h.description):(h.nonImplementationReason=d.nonImplementationReason||"",h.description=d.description||"",h.nonImplementationReason||console.warn("Aviso: Campo 'Justificativa' (nonImplementationReason) est\xE1 saindo vazio."),h.description||console.warn("Aviso: Campo 'Descri\xE7\xE3o detalhada' (description) est\xE1 saindo vazio."))}else h.reason=d.reason,n?(d.description?h.description=d.description:delete h.description,delete h.taskType,delete h.availability,delete h.nonImplementationReason):(h.taskType="",h.availability="",h.nonImplementationReason="",h.description=d.description||"");try{let $=null;n?await Ro(r,h):$=await Fo(h,x.agentEmail||"anon"),v.playSuccess();let P=c.querySelector(".bau-success-title");P&&(n?P.textContent=N("caseUpdatedSuccess"):P.textContent=N(i==="DISCARD"?"caseDiscardSentSuccess":"caseSentSuccess")),E("success"),!n&&$&&$.emailSent===!1&&(v.playError(),te(N("caseCreatedNoEmailConfirm"),{error:!0}))}catch($){v.playError(),te(N("errorPrefix")($.message||N("unknownError")),{error:!0}),console.error("Payload que tentou enviar:",h)}finally{L.disabled=!1,L.innerHTML=`${Ne.send} ${N("submitToTl")}`}};function U(){b.reset(),o=0,i="BAU",n=!1,r=null,W();let s=b.querySelector(".bau-tasks-grid");s&&gr(s)}c.querySelector("#bau-new-case-btn").addEventListener("click",()=>{U(),E("form"),ee()}),c.querySelector("#bau-form-back-btn").addEventListener("click",()=>E("dashboard")),c.querySelector("#bau-success-back-btn").addEventListener("click",()=>E("dashboard"));async function ne(){e=!Xe(c),e&&(c.style.display="flex"),e?(Te(),E("dashboard"),R()):qe(),Be(e,c,"cw-btn-bauform")}return W(),Ae(()=>{let s=c.querySelector(".cw-help-title");s&&(s.textContent=N("headerTitle"));let y=c.querySelector(".cw-help-description");y&&(y.textContent=N("headerDesc"));let L=c.querySelector(".js-bau-new-case");L&&(L.textContent=N("newBauCase"));let J=c.querySelector(".js-bau-back-dashboard");J&&(J.textContent=N("backToDashboard"));let d=c.querySelector(".js-bau-configuring-edit");d&&(d.textContent=N("configuringEdit"));let x=c.querySelector(".js-bau-success-title");x&&(x.textContent=N("caseSentSuccess"));let h=c.querySelector(".js-bau-success-sub");h&&(h.textContent=N("caseSentSuccessSub"));let $=c.querySelector(".js-bau-success-back");$&&($.textContent=N("backToDashboard")),F.textContent=N("back"),H.textContent=N("next"),E(t),t==="form"&&b.querySelectorAll(".bau-step").forEach(P=>{let oe=parseInt(P.id.replace("bau-step-",""),10),Z=wt.steps.find(ge=>ge.id===oe);!Z||Z.isBranching||Z.isConfirmation||P.querySelectorAll(".bau-dynamic-input").forEach(ge=>{let ye=ge.id.replace("wrapper-",""),be=Z.fields?.find(rt=>rt.id===ye);if(!be)return;let ke=ge.querySelector(".bau-label");ke&&be.label&&(ke.textContent=et(be,"label"),be.tooltip&&ke.setAttribute("data-tooltip",et(be,"tooltip")));let Ge=ge.querySelector("input, textarea, select");if(Ge&&be.placeholder&&(Ge.placeholder=et(be,"placeholder")),be.type==="select"){let rt=be.groups?be.groups.flatMap(bt=>bt.options):be.options||[];ge.querySelectorAll("option").forEach((bt,St)=>{let Wt=rt[St];Wt&&(bt.textContent=Ke(Wt.text))})}})}),t==="dashboard"&&R()}),ne}var Ve={notes:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',library:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',timezone:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',configs:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>',broadcast:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',enter:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>',arrowDown:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',arrowUp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>',bolt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>'};function fl(){if(document.getElementById("cw-palette-styles"))return;let e=document.createElement("style");e.id="cw-palette-styles",e.textContent=`
        .cw-palette-overlay {
            position: fixed; inset: 0;
            background: rgba(32,33,36,0.4);
            backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
            z-index: 2147483647;
            display: flex; align-items: flex-start; justify-content: center;
            padding-top: 14vh;
            opacity: 0; pointer-events: none;
            transition: opacity 0.2s ease;
        }
        .cw-palette-overlay.active { opacity: 1; pointer-events: auto; }

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

        .cw-palette-list { max-height: 340px; overflow-y: auto; padding: 8px; }
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
    `,document.head.appendChild(e)}var hr={pt:{ariaLabel:"Busca r\xE1pida",placeholder:"Buscar um m\xF3dulo...",empty:"Nada encontrado.",navigate:"navegar",select:"selecionar",close:"esc fechar",groupShortcuts:"Meus atalhos",groupModules:"M\xF3dulos"},es:{ariaLabel:"B\xFAsqueda r\xE1pida",placeholder:"Buscar un m\xF3dulo...",empty:"No se encontr\xF3 nada.",navigate:"navegar",select:"seleccionar",close:"esc cerrar",groupShortcuts:"Mis atajos",groupModules:"M\xF3dulos"}};function it(e){let t=de();return hr[t]?.[e]??hr.pt[e]}function xr(e){fl();function t(A){return A.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function a(){return typeof e.toggleNotes!="function"||typeof e.toggleNotes.openWithPreset!="function"?[]:Le.list().map(A=>({id:`shortcut-${A.id}`,label:A.label,hint:{pt:"Atalho de nota \xB7 abre pr\xE9-preenchida",es:"Atajo de nota \xB7 abre precompletada"},keywords:`nota atalho atajo preset ${A.alias||""}`,icon:Ve.bolt,group:"shortcuts",isPreset:!0,run:()=>{Le.registerUse(A.id),e.toggleNotes.openWithPreset(A)}}))}let o=[{id:"notes",label:"Case Notes",hint:{pt:"Montar a nota t\xE9cnica do caso",es:"Armar la nota t\xE9cnica del caso"},keywords:"notas nota caso anotacoes anotaciones",icon:Ve.notes,run:e.toggleNotes},{id:"bauform",label:"BAU Form",hint:{pt:"Solicita\xE7\xE3o de cria\xE7\xE3o/descarte BAU",es:"Solicitud de creaci\xF3n/descarte BAU"},keywords:"bau formulario solicitacao solicitud criacao creacion descarte",icon:Ve.bauform,run:e.toggleBAUForm},{id:"email",label:"Email Assistant",hint:{pt:"Templates inteligentes de e-mail",es:"Plantillas inteligentes de correo"},keywords:"email e-mail correio correo template plantilla",icon:Ve.email,run:e.toggleEmail},{id:"script",label:"Call Script",hint:{pt:"Guia interativo de chamada",es:"Gu\xEDa interactiva de llamada"},keywords:"script roteiro guion chamada llamada ligacao",icon:Ve.script,run:e.toggleScript},{id:"links",label:"Central de Links",hint:{pt:"Ferramentas, SOPs e atalhos",es:"Herramientas, SOPs y atajos"},keywords:"links atalhos atajos ferramentas herramientas sop sops",icon:Ve.links,run:e.toggleLinks},{id:"library",label:"Minha Biblioteca",hint:{pt:"Snippets e respostas salvas",es:"Snippets y respuestas guardadas"},keywords:"biblioteca snippets respostas respuestas salvas guardadas",icon:Ve.library,run:e.toggleLibrary},{id:"timezone",label:"Fusos Hor\xE1rios",hint:{pt:"Monitoramento e planejador de chamada",es:"Monitoreo y planificador de llamada"},keywords:"fuso horario timezone",icon:Ve.timezone,run:e.toggleTimezone},{id:"broadcast",label:"Avisos",hint:{pt:"Comunicados e disponibilidade BAU",es:"Comunicados y disponibilidad BAU"},keywords:"avisos broadcast comunicados disponibilidade disponibilidad",icon:Ve.broadcast,run:()=>e.broadcastControl&&e.broadcastControl.toggle()},{id:"configs",label:"Configura\xE7\xF5es",hint:{pt:"Perfil, som e prefer\xEAncias",es:"Perfil, sonido y preferencias"},keywords:"configuracoes configuracion config preferencias perfil som sonido",icon:Ve.configs,run:e.toggleConfigs}].map(A=>({...A,group:"modules"}));function i(){return[...a(),...o].filter(A=>typeof A.run=="function").map(A=>({...A,_haystack:t(`${A.label} ${A.hint.pt} ${A.hint.es} ${A.keywords}`)}))}let n=!1,r=0,l=i(),c=l,m=document.createElement("div");m.className="cw-palette-overlay",m.setAttribute("role","dialog"),m.setAttribute("aria-modal","true"),m.setAttribute("aria-label",it("ariaLabel"));let p=document.createElement("div");p.className="cw-palette",p.innerHTML=`
        <div class="cw-palette-search">
            <span class="cw-palette-search-icon">${Ve.search}</span>
            <input type="text" class="cw-palette-input" placeholder="${it("placeholder")}" autocomplete="off" spellcheck="false">
        </div>
        <div class="cw-palette-list"></div>
        <div class="cw-palette-footer">
            <span class="js-cp-navigate">${Ve.arrowDown}${Ve.arrowUp} ${it("navigate")}</span>
            <span class="js-cp-select">${Ve.enter} ${it("select")}</span>
            <span class="js-cp-close">${it("close")}</span>
        </div>
    `,m.appendChild(p),m.onmousedown=A=>{A.target===m&&S()};let f=p.querySelector(".cw-palette-input"),u=p.querySelector(".cw-palette-list");function g(){if(u.innerHTML="",c.length===0){u.innerHTML=`<div class="cw-palette-empty">${it("empty")}</div>`;return}let A=[],_=null;c.forEach((M,F)=>{if(M.group!==_){_=M.group;let B=document.createElement("div");B.className="cw-palette-group",B.textContent=it(M.group==="shortcuts"?"groupShortcuts":"groupModules"),B.setAttribute("aria-hidden","true"),u.appendChild(B)}let H=document.createElement("div");H.className="cw-palette-item"+(F===r?" selected":""),H.innerHTML=`
                <span class="cw-palette-item-icon${M.isPreset?" cw-palette-item-icon--preset":""}">${M.icon}</span>
                <span class="cw-palette-item-text">
                    <span class="cw-palette-item-label">${M.label}</span>
                    <span class="cw-palette-item-hint">${M.hint[de()]||M.hint.pt}</span>
                </span>
            `,H.onmouseenter=()=>{r=F,g()},H.onclick=()=>k(F),u.appendChild(H),A.push(H)});let b=A[r];b&&b.scrollIntoView({block:"nearest"})}function k(A){let _=c[A];_&&(v.playClick(),S(),_.run())}function w(){n||(n=!0,l=i(),c=l,r=0,f.value="",g(),Te(),document.body.appendChild(m),v.playGenieOpen(),requestAnimationFrame(()=>{m.classList.add("active"),f.focus()}))}function S(){n&&(n=!1,qe(),m.classList.remove("active"),setTimeout(()=>m.remove(),200))}function I(){n?S():w()}return f.addEventListener("input",()=>{let A=t(f.value.trim());c=A?l.filter(_=>_._haystack.includes(A)):l,r=0,g()}),f.addEventListener("keydown",A=>{A.key==="ArrowDown"?(A.preventDefault(),r=Math.min(r+1,c.length-1),g()):A.key==="ArrowUp"?(A.preventDefault(),r=Math.max(r-1,0),g()):A.key==="Enter"?(A.preventDefault(),k(r)):A.key==="Escape"&&(A.preventDefault(),S())}),document.addEventListener("keydown",A=>{(A.metaKey||A.ctrlKey)&&A.key.toLowerCase()==="k"&&(A.preventDefault(),I())}),Ae(()=>{m.setAttribute("aria-label",it("ariaLabel")),f.placeholder=it("placeholder");let A=p.querySelector(".js-cp-navigate");A&&(A.innerHTML=`${Ve.arrowDown}${Ve.arrowUp} ${it("navigate")}`);let _=p.querySelector(".js-cp-select");_&&(_.innerHTML=`${Ve.enter} ${it("select")}`);let b=p.querySelector(".js-cp-close");b&&(b.textContent=it("close")),g()}),{open:w,close:S,toggle:I}}function hl(){if(window.techSolInitialized){to();return}window.techSolInitialized=!0;let e="v6.3.3";console.log(`\u{1F680} TechSol Suite Initializing (${e})...`);try{sn();try{v.initGlobalListeners()}catch(u){console.warn("\xC1udio bloqueado:",u)}me.fetchContentModules(["tips","broadcast","bau_availability","links","call_script","email_template","note_template","task_screenshots"]);let t=to(),a=mi(),o=yi(),i=ki(),n=_i(),r=or(),l=rr(),c=lr(),m=fr(),p=Bi(),f={toggleNotes:a,toggleEmail:o,toggleScript:i,toggleLinks:n,toggleTimezone:r,toggleLibrary:l,toggleConfigs:c,toggleBAUForm:m,broadcastControl:p};Gn(f,t),xr(f),setTimeout(()=>{me.logEvent("App","Start","Session Start");let u=Ie();gt.sync(),(u?zt(u.split("@")[0]).then(k=>{k&&(an(k),Zo(k))}).catch(k=>console.warn("N\xE3o foi poss\xEDvel resolver o idioma do perfil:",k)):Promise.resolve()).finally(()=>{Yi(),setTimeout(()=>{Ki(e)},500)})},2500)}catch(t){console.error("Erro fatal na inicializa\xE7\xE3o:",t),v.playError(),te("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}hl();})();
