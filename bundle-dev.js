(()=>{var Lo={production:"AKfycbxkheuq28ENsHMZMH8t9-u4EIrktHC6cBi-87boDre0jJfl1lnSCPBzaEkw6hy3Cx6fAg",development:"AKfycbyUtczRMulDAyO_1ku39Rb01zarPMw1JvO7aNOdJPYeAgCC7G9mmb-P_EuXP6kvo8l2LA"},pa="development",cr=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",Io=Lo[pa]||Lo.development,Ba=cr?"dev":"exec",dr=`https://script.google.com/a/macros/google.com/s/${Io}/${Ba}`,_o=Io.slice(-6);function Ut(){return{env:pa,isDev:pa!=="production",endpoint:Ba,fingerprint:_o}}console.log(`[Case Wizard] backend: ${pa}/${Ba} \xB7 implanta\xE7\xE3o \u2026${_o}`);var pr="cw_data_broadcast",ur="cw_data_tips",$a="cw_content_",Ra=new Set,mr=["Processando...","Mantenha o foco!","Aguarde..."];function Ke(e,t={}){return new Promise((a,o)=>{let n="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script"),r=setTimeout(()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[n],o(new Error("Timeout: A API demorou muito para responder. (Apps Script bloqueado ou erro 500)"))},15e3);window[n]=b=>{clearTimeout(r),document.body.contains(i)&&document.body.removeChild(i),delete window[n],a(b)};let l=Object.keys(t).map(b=>encodeURIComponent(b)+"="+encodeURIComponent(t[b])).join("&"),s=`${dr}?op=${e}&callback=${n}&t=${Date.now()}&${l}`;i.src=s,i.onerror=()=>{clearTimeout(r),document.body.contains(i)&&document.body.removeChild(i),delete window[n],o(new Error("Erro de conex\xE3o JSONP."))},document.body.appendChild(i)})}var me={fetchTips:async()=>{try{await me.fetchContentModule("tips")}catch(e){console.warn("Tips offline",e)}},getCachedBroadcasts:()=>{try{return JSON.parse(localStorage.getItem(pr)||"[]")}catch{return[]}},fetchContentModule:async e=>{if(Ra.has(e)){let a=me.getCachedContent(e);if(a)return a}let t=`${$a}${e}`;try{let a=await Ke("content_public",{module:e});if(a?.status==="success"&&Array.isArray(a.items))return localStorage.setItem(t,JSON.stringify(a.items)),Ra.add(e),a.items}catch(a){console.warn(`Conte\xFAdo '${e}' offline`,a)}return me.getCachedContent(e)},fetchContentModules:async e=>{let t=(e||[]).filter(Boolean);if(!t.length)return{};try{let a=await Ke("content_public",{modules:t.join(",")});if(a?.status==="success"&&a.modules)return Object.keys(a.modules).forEach(o=>{let n=a.modules[o];Array.isArray(n)&&(localStorage.setItem(`${$a}${o}`,JSON.stringify(n)),Ra.add(o))}),a.modules}catch(a){console.warn("Pr\xE9-carregamento de conte\xFAdo indispon\xEDvel",a)}return{}},getCachedContent:e=>{try{return JSON.parse(localStorage.getItem(`${$a}${e}`)||"null")}catch{return null}},getRandomTip:()=>{let e=null,t=me.getCachedContent("tips");if(Array.isArray(t)&&t.length&&(e=t.map(a=>a.value).filter(Boolean)),!e||!e.length){let a=localStorage.getItem(ur);if(a)try{e=JSON.parse(a)}catch{}}return(!Array.isArray(e)||!e.length)&&(e=mr),e[Math.floor(Math.random()*e.length)]},logEvent:(e,t,a="",o=null)=>{try{let n="anon";try{let r=Ne();r&&(n=r.split("@")[0].toLowerCase())}catch{}let i={timestamp:new Date().toISOString(),user:n,version:"v5.1",category:e,action:t,label:a,value:o||""};Ke("log",i).catch(r=>{})}catch(n){console.warn("Analytics error",n)}},logUsage:()=>{},sendBAUEscalation:async(e,t)=>{let a={...e,user:t,date:new Date().toISOString()};try{console.log("Executando create_bau...",a);let o=await Ke("create_bau",a);if(o&&o.status==="success")return console.log("Sucesso: create_bau"),o;throw new Error(o?.error||o?.message||"Falha na opera\xE7\xE3o BAU")}catch(o){throw console.error("Erro JSONP (BAU):",o),o}},readAgentBAU:async()=>{let e=Ne();if(!e)return console.warn("Email n\xE3o encontrado. N\xE3o foi poss\xEDvel buscar casos BAU."),[];try{console.log("Buscando casos BAU para:",e);let t=await Ke("read_agent_bau",{user:e});if(t&&t.status==="success"&&Array.isArray(t.cases))return t.cases;if(t&&t.status==="error")throw new Error(t.message||"Erro retornado pela API de leitura");return[]}catch(t){throw console.error("Erro ao buscar casos BAU:",t),t}},updateBAUStatus:async(e,t,a={})=>{let o=Ne();try{console.log(`Atualizando status BAU ${e} para ${t}...`);let n=await Ke("update_bau_status",{id:e,status:t,user:o,...a});return n&&n.status==="success"}catch(n){return console.error("Erro ao atualizar status BAU:",n),!1}},updateBAUEscalation:async(e,t)=>{let a=Ne(),o={...t,id:e,user:a,date_edited:new Date().toISOString()};try{console.log(`Executando update_bau para ${e}...`,o);let n=await Ke("update_bau",o);if(n&&n.status==="success")return console.log("Sucesso: update_bau"),n;throw new Error(n?.error||n?.message||"Falha na atualiza\xE7\xE3o BAU")}catch(n){throw console.error("Erro JSONP (Update BAU):",n),n}},fetchUserProfile:async e=>{try{console.log(`Buscando perfil para: ${e}`);let t=await Ke("get_user_profile",{ldap:e});return console.log("Resposta bruta do servidor:",t),t&&t.status==="success"&&t.profile?t.profile:null}catch(t){return console.error("Erro ao buscar perfil:",t),null}},getUserSnippets:async e=>{try{return console.log("Buscando snippets para:",e),await Ke("get_user_snippets",{user:e})}catch(t){return console.error("Erro ao carregar snippets:",t),{status:"error",snippets:[]}}},saveSnippet:async(e,t)=>{let a={id:e.id,type:e.type,title:e.title,content:e.content,subject:e.subject||"",isCode:e.isCode,isRich:e.isRich,user:t};try{console.log("Salvando snippet na nuvem:",a);let o=await Ke("save_snippet",a);return o&&o.status==="success"}catch(o){return console.error("Erro ao salvar snippet:",o),!1}},deleteSnippet:async(e,t)=>{try{console.log(`Deletando snippet ${e}...`);let a=await Ke("delete_snippet",{id:e,user:t});return a&&a.status==="success"}catch(a){return console.error("Erro ao deletar snippet:",a),!1}},getUserPrefs:async e=>{try{let t=await Ke("get_user_prefs",{user:e});return t&&t.status==="success"?t.prefs||{}:null}catch(t){return console.warn("Erro ao carregar prefer\xEAncias:",t),null}},saveUserPrefs:async(e,t)=>{try{let a=await Ke("save_user_prefs",{user:t,prefs:JSON.stringify(e||{})});return!!(a&&a.status==="success")}catch(a){return console.warn("Erro ao salvar prefer\xEAncias:",a),!1}}},Fo=me.sendBAUEscalation,Mo=me.readAgentBAU,sl=me.updateBAUStatus,Oo=me.updateBAUEscalation,Mt=me.fetchUserProfile,ll=me.getUserSnippets,cl=me.saveSnippet,dl=me.deleteSnippet,pl=me.getUserPrefs,ul=me.saveUserPrefs;var pe=e=>new Promise(t=>setTimeout(t,e));function Oe(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(a=>e.dispatchEvent(new MouseEvent(a,t)))}function vt(e){e&&["mousedown","mouseup","click"].forEach(t=>e.dispatchEvent(new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window})))}function Tt(e,t,a){return Math.max(t,Math.min(e,a))}var Vt=0,Ot=0;function ke(){if(Vt===0&&(Ot=window.innerWidth-document.documentElement.clientWidth,Ot>0)){let e=parseFloat(getComputedStyle(document.body).paddingRight)||0;document.body.style.paddingRight=`${e+Ot}px`}Vt++,document.body.style.overflow="hidden"}function Te(){if(Vt=Math.max(0,Vt-1),Vt===0&&(document.body.style.overflow="",Ot>0)){let e=parseFloat(getComputedStyle(document.body).paddingRight)||0,t=Math.max(0,e-Ot);document.body.style.paddingRight=t?`${t}px`:"",Ot=0}}var Do=!1;function gr(){if(Do||document.getElementById("cw-filled-check-styles"))return;let e=document.createElement("style");e.id="cw-filled-check-styles",e.textContent=`
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
    `,document.head.appendChild(e),Do=!0}var zo=!1;function br(){if(zo||document.getElementById("cw-empty-state-styles"))return;let e=document.createElement("style");e.id="cw-empty-state-styles",e.textContent=`
        .cw-empty-illustrated { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 12px; padding: 32px 20px; }
        .cw-empty-illustrated-badge { border-radius: 50%; background: #F8F9FA; display: flex; align-items: center; justify-content: center; color: #9AA0A6; flex-shrink: 0; }
        .cw-empty-illustrated-badge svg { width: 44%; height: 44%; }
        .cw-empty-illustrated-title { font-family: 'Google Sans', Roboto, sans-serif; font-size: 15px; font-weight: 600; color: #202124; }
        .cw-empty-illustrated-subtitle { font-size: 12px; color: #5F6368; line-height: 1.5; max-width: 240px; }
    `,document.head.appendChild(e),zo=!0}function Wt({icon:e,title:t,subtitle:a="",size:o=88}){br();let n=document.createElement("div");return n.className="cw-empty-illustrated",n.innerHTML=`
        <div class="cw-empty-illustrated-badge" style="width:${o}px;height:${o}px;">${e}</div>
        <div class="cw-empty-illustrated-title">${t}</div>
        ${a?`<div class="cw-empty-illustrated-subtitle">${a}</div>`:""}
    `,n}function ua(e,t){e.addEventListener("keydown",a=>{if(a.key!=="ArrowDown"&&a.key!=="ArrowUp")return;let o=document.activeElement;if(!o||!o.matches(t))return;let n=Array.from(e.querySelectorAll(t)).filter(l=>l.offsetParent!==null),i=n.indexOf(o);if(i===-1)return;a.preventDefault();let r=a.key==="ArrowDown"?Math.min(i+1,n.length-1):Math.max(i-1,0);n[r].focus()})}var $o=!1;function fr(){if($o||document.getElementById("cw-pending-field-styles"))return;let e=document.createElement("style");e.id="cw-pending-field-styles",e.textContent=`
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
    `,document.head.appendChild(e),$o=!0}function Ro(e,{duration:t=2400}={}){e&&(fr(),e.classList.add("cw-quicklaunch-pending"),e.scrollIntoView({behavior:"smooth",block:"center"}),e.focus({preventScroll:!0}),setTimeout(()=>e.classList.remove("cw-quicklaunch-pending"),t))}function ma(e,{minLength:t=2}={}){gr();let a=e.parentElement;a&&getComputedStyle(a).position==="static"&&(a.style.position="relative"),e.classList.add("cw-dopamine-field");let o=document.createElement("span");o.className="cw-dopamine-check",o.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',e.insertAdjacentElement("afterend",o);let n=()=>{let i=e.value.trim().length>=t;e.classList.toggle("filled",i),o.classList.toggle("show",i)};e.addEventListener("input",n),n()}function hr(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim()}var xr={serviceHorizontal:["service horizontal","servico horizontal"],serviceOffering:["service offering","oferta de servicos","oferta de servicios"],specialization:["specialization","especializacao","especializacion"],routingChannel:["routing communication channel","canal de comunicacao de roteamento","canal de comunicacion de enrutamiento"],businessLanguage:["business language","linguagem comercial","idioma comercial"],vendorPartner:["vendor partner","parceiro fornecedor","socio proveedor"],appointmentTasks:["appointment tasks","tarefas de agendamento","tareas de la cita"],salesProgram:["sales program","programa de vendas","programa de ventas"],customerTimezone:["customer time zone","time zone","timezone","fuso horario do cliente","fuso horario","zona horaria del cliente","zona horaria"],externalCustomerId:["google ads external customer id","id de cliente externo do google ads","id de cliente externo de google ads"],additionalInfo:["additional info","informacoes adicionais","informacion adicional"],givenName:["given name","nome dado","nombre"],familyName:["family name","nome de familia","apellido"],contactEmail:["contact email","e-mail de contato","correo electronico de contacto"],loginEmail:["login email","e-mail de login","correo electronico de acceso"],phoneNumber:["phone number","numero de telefone","numero de telefono"],appointmentTime:["appointment time","horario da consulta","hora de la cita"],neoOrg:["neo org"],neoProduct:["neo product","produto neo","producto neo"],website:["website","site","sitio web"],program:["program","programa"],adsBusinessSector:["ads business sector"],interactionType:["interaction type"],salesRegion:["sales region"]},vr=".form-label, .data-pair-label";function ga(e,t=document){let a=xr[e];if(!a)return null;let o=new Set(a);return Array.from(t.querySelectorAll(vr)).find(n=>o.has(hr(n.textContent)))||null}function Bo(e){return e?.innerText?.trim()||e?.textContent?.trim()||""}function Pa(e,t=document){let a=ga(e,t);if(!a)return[];let o=a.closest("cuf-form-field");if(o){let l=Array.from(o.querySelectorAll('[debug-id="html-value"]')).map(Bo).filter(Boolean);if(l.length)return l}let i=a.closest("home-data-item")?.querySelector(".data-pair-content")||a.parentElement?.querySelector(".data-pair-content")||a.parentElement?.querySelector("sanitized-content")||a.nextElementSibling,r=Bo(i);return r?[r]:[]}function rt(e,t=document){return Pa(e,t)[0]||null}var Po=/[A-Za-z0-9._%+-]+@google\.com/g,yr=[/^ads-support@/i,/^noreply@/i,/^no-reply@/i,/-bot@/i],Go=e=>yr.some(t=>t.test(e));function wr(){return(document.querySelector('[debug-id="assignee"]')?.textContent.trim()||"").replace(/@.*$/,"").toLowerCase()||null}function ja(){let t=document.querySelector('[aria-label^="Signed in as"]')?.getAttribute("aria-label")?.replace(/^Signed in as\s+/i,"").trim();return t?t.toLowerCase():document.querySelector('img.photo[src*="/photos/"]')?.src?.match(/\/photos\/([^?/]+)/)?.[1]?.toLowerCase()||null}function jo(){return Array.from(document.querySelectorAll("case-message-view"))}function Ga(){let e=new Set([wr(),ja()].filter(Boolean)),t=jo().flatMap(a=>a.textContent.match(Po)||[]).map(a=>a.toLowerCase());return[...new Set(t)].filter(a=>Go(a)?!1:!e.has(a.replace(/@.*$/,"")))}function Sr(e){return(jo().find(o=>/contact us form|formul[áa]rio de contato|formulario de contacto/i.test(o.textContent))?.textContent.match(Po)||[]).map(o=>o.toLowerCase()).find(o=>e.includes(o))||null}function Er(){let e=document.querySelector("internal-user-info");if(!e)return null;let t=e.querySelector(".email")?.textContent.trim().toLowerCase();return t&&!Go(t)?t:null}async function Ar(){let e=Array.from(document.querySelectorAll(".message-header")).filter(t=>t.getAttribute("aria-expanded")==="false");for(let t of e)if(vt(t),await pe(400),Ga().length)return}function Cr(e){return e&&Array.from(document.querySelectorAll("internal-user-info")).find(a=>a.querySelector(".email")?.textContent.trim().toLowerCase()===e)?.querySelector('[debug-id="name"]')?.textContent.trim()||null}async function Ho({expandir:e=!0}={}){let t=Ga(),a="case-log-visivel";!t.length&&e&&(await Ar(),t=Ga(),a="case-log-expandido");let o=null;return t.length===1?o=t[0]:t.length>1&&(o=Sr(t),a=o?"contact-us-form":a),o||(o=Er(),a=o?"internal-user-info":"nao-resolvido"),{email:o||null,nome:Cr(o),origem:a}}var yt=e=>document.querySelector(`[debug-id="${e}"]`)?.textContent.replace(/\s+/g," ").trim()||null;function kr(){return document.querySelector('[debug-id="case-summary-input"] input')?.value.trim()||null}function Uo(){return{titulo:kr(),estado:yt("state-button"),slaRotulo:yt("due-in-label"),slaTexto:yt("due-in-text"),criadoEm:yt("date-created-value"),tier:yt("badge-text"),programaBadge:yt("sales-program-badge"),paisCobranca:yt("adwords-billing-country"),assignee:yt("assignee")}}var Tr=/[A-Za-z0-9._%+-]+@google\.com/;function qr(){return Array.from(document.querySelectorAll("case-message-view")).map(e=>e.textContent.replace(/\s+/g," ").trim())}var ba=e=>qr().find(t=>e.test(t))||null;function Nr(){let e=ba(/appointment has been successfully created|agendamento foi criado/i);if(!e)return null;let t=e.match(/on ([A-Z][a-z]+ \d{1,2}) at ([\d:]+\s?[AP]M)/i),a=e.match(/\[([^\]]+)\]/),o=e.match(Tr);return{data:t?.[1]||null,hora:t?.[2]||null,timezone:a?.[1]||null,designado:o?.[0]||null}}function Lr(){let e=ba(/\bTransfer\b|\bTransferência\b/i);if(!e)return null;let t=e.match(/(?:Transfer|Transferência)\s+(?:From|De)\s+(.+?)\s+(?:to|para)\s+(.+?)(?:\.\.\.|$)/i);return t?{de:t[1].trim(),para:t[2].trim()}:null}function Ir(){let e=ba(/appointment .*was (?:automatically )?canceled|foi cancelad/i);if(!e)return null;let t=e.match(/\(Reason:\s*([^)]+)\)/i),a=e.match(/AppointmentId=\s*(\d+)\s*\)/i);return{motivo:t?.[1].trim()||null,appointmentId:a?.[1]||null}}function _r(){let e=ba(/\bDiscard\b|\bDescarte\b/i);if(!e)return null;let t=e.match(/(?:Discard|Descarte)\s+(.+?)(?:\.\.\.|$)/i);return t?{motivo:t[1].trim()}:null}function Vo(){return{agendamento:Nr(),transferencia:Lr(),cancelamento:Ir(),descarte:_r()}}var wt="",qt="",Yt=null;async function Ha(){try{if(!document.querySelector(".translated-form"))return!0;let e=document.querySelector('material-button[debug-id="toggle-translation-button"]');if(!e)return!1;console.log("TechSol: Tradu\xE7\xE3o detectada. Revertendo para o idioma original..."),e.click();for(let t=0;t<20;t++){if(!document.querySelector(".translated-form"))return!0;await pe(100)}return console.warn("TechSol: tradu\xE7\xE3o n\xE3o reverteu; seguindo pelos r\xF3tulos traduzidos."),!1}catch(e){return console.warn("TechSol: Erro ao tentar reverter tradu\xE7\xE3o:",e),!1}}async function Xt(){if(wt&&qt)return wt;let e=ja();e&&!qt&&(qt=`${e}@google.com`);let t=e?e.split(/[._-]/)[0].replace(/^./,a=>a.toUpperCase()):null;try{let a=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!a)return wt=t||"Consultor",wt;a.click(),await pe(150);let o=t||"Consultor",n=document.querySelector("profile-details .name");if(n){let l=n.textContent.trim().split(" ")[0];l&&(o=l.charAt(0).toUpperCase()+l.slice(1).toLowerCase())}let i=document.querySelector("profile-details .email");return i&&(qt=i.textContent.trim(),console.log("TechSol: Identidade confirmada ->",qt)),a.click(),document.body.click(),wt=o,o}catch(a){return console.warn("Sherlock falhou:",a),wt=t||"Consultor",wt}}function Kt(){return wt||"Consultor"}function Ne(){return qt||null}function Wo(e){let t=new Date,a=t.getHours(),o=t.getDay(),n="Ol\xE1",i="";a>=5&&a<12?(n="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):a>=12&&a<18?(n="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(n="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let r=[];a>=0&&a<5?r=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:a<12?o===1?r=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?r=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:r=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:a<18?r=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:r=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(r=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let l=r[Math.floor(Math.random()*r.length)];return{prefix:`${n},`,name:e,suffix:l,icon:i,isFriday:o===5}}async function Fr(){try{let e=ga("contactEmail");if(!e)return null;let t=e.closest("cuf-form-field")||e.parentElement,a=t.querySelector(".unmask-button")||t.querySelector('[aria-label="Click to view"]');a&&(a.click(),await pe(500));let o=rt("contactEmail");return o&&o.includes("@")&&!o.includes("Is this:")?o.trim():null}catch(e){return console.warn("Erro ao capturar email do cliente:",e),null}}function Mr(e){let t=String(e||"").trim();if(!t||t.length>30||/^phone$/i.test(t)||t.includes("Is this:")||!/^[\d\s()+\-.]+$/.test(t))return!1;let a=t.replace(/\D/g,"");return a.length>=8&&a.length<=15}async function Or(){try{let e=ga("phoneNumber");if(!e)return null;let t=e.closest("cuf-form-field")||e.parentElement;if(!t)return null;let a=t.querySelector(".unmask-button")||t.querySelector('[aria-label="Click to view"]');a&&(a.click(),await pe(500));let o=rt("phoneNumber");return Mr(o)?o.trim():null}catch(e){return console.warn("Erro ao capturar telefone do cliente:",e),null}}async function Dr(){try{return await Ho()}catch(e){return console.warn("Erro ao resolver AM:",e),{email:null,nome:null,origem:"erro"}}}function zr(){try{let e=rt("externalCustomerId");if(!e)return"N/A";let t=e.replace(/\D/g,"");return t.length!==10?"N/A":t.replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(e){console.warn("Erro ao capturar CID:",e)}return"N/A"}function $r(e){return e?.nome||e?.email||null}function Rr(){try{return rt("customerTimezone")}catch(e){console.warn("Erro ao capturar Timezone:",e)}return null}async function Br(){try{let t=document.querySelector('[debug-id="case-id"]')?.textContent?.match(/\d-\d{6,}/)?.[0];return t||window.location.href.split("/").pop()||"---"}catch(e){return console.warn("Falha ao capturar Case ID:",e),"---"}}function Pr(){try{return rt("salesProgram")||""}catch(e){console.warn("Erro ao capturar Sales Program:",e)}return""}function Gr(){try{return rt("familyName")||""}catch(e){console.warn("Falha Sobrenome:",e)}return""}function jr(){try{return rt("businessLanguage")||"N/A"}catch(e){console.warn("Erro ao capturar Idioma:",e)}return"N/A"}function Hr(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(a=>a.textContent.includes("Speakeasy ID")||a.textContent.includes("SE ID"));if(t){let a=t.closest(".data-pair")||t.parentElement,o=a.querySelector(".data-pair-content")||a.nextElementSibling;if(o&&o.textContent.trim())return o.textContent.trim()}}catch(e){console.warn("Erro ao capturar SE ID:",e)}return"N/A"}function Yo(e){e&&(Yt=e)}function Jt(){return String(Yt?.defaultLanguage||"").toUpperCase()==="ES"?"ES":"PT"}async function Qe(){await Ha(),qt||await Xt();let e=rt("givenName")||"Cliente",t=rt("website")||"",a=Pa("appointmentTasks"),[o,n]=await Promise.all([Fr(),Or()]),i=await Dr(),r=zr(),l=$r(i),s=Rr(),b=Uo(),p=Vo(),h=await Br(),m=Pr(),g=jr(),I=Hr(),x=Gr(),y=Ne();if(y&&!Yt){let z=y.split("@")[0];try{Yt=await Mt(z)}catch(A){console.warn("Falha ao carregar perfil do usu\xE1rio:",A)}}return{advertiserName:e,websiteUrl:t,clientEmail:o,internalEmail:i.email,cid:r,amName:l,amEmail:i.email,amOrigem:i.origem,appointmentTasks:a,caseContext:b,caseLog:p,timezone:s,agentName:Kt(),agentEmail:Ne(),caseId:h,userProfile:Yt,advName:e,site:t,website:t,email:o,advEmail:o,salesProgram:m,language:g,seId:I,advLastName:x,advPhone:n}}var Nt=null,Ua=null,Zt=null,Va=0,it=.3;var et=localStorage.getItem("cw_sounds_muted")==="true";function mt(){if(!Nt){let e=window.AudioContext||window.webkitAudioContext;e&&(Nt=new e)}return Nt&&Nt.state==="suspended"&&Nt.resume(),Nt}function Xo(e){if(Ua)return Ua;let t=e.sampleRate*2,a=e.createBuffer(1,t,e.sampleRate),o=a.getChannelData(0);for(let n=0;n<t;n++)o[n]=Math.random()*2-1;return Ua=a,a}var v={setMuted:e=>{et=e,localStorage.setItem("cw_sounds_muted",e)},isMuted:()=>et,playClick:()=>{if(et)return;let e=mt();if(!e)return;let t=e.currentTime,a=e.createBufferSource();a.buffer=Xo(e);let o=e.createBiquadFilter();o.type="highpass",o.frequency.value=4e3;let n=e.createGain();n.gain.setValueAtTime(it*.8,t),n.gain.exponentialRampToValueAtTime(.001,t+.015),a.connect(o),o.connect(n),n.connect(e.destination),a.start(t),a.stop(t+.02)},playHover:()=>{if(et)return;let e=mt();if(!e)return;let t=e.currentTime,a=e.createOscillator();a.type="sine",a.frequency.setValueAtTime(400,t);let o=e.createGain();o.gain.setValueAtTime(0,t),o.gain.linearRampToValueAtTime(it*.1,t+.005),o.gain.linearRampToValueAtTime(0,t+.02),a.connect(o),o.connect(e.destination),a.start(t),a.stop(t+.03)},playSuccess:()=>{if(et)return;let e=mt();if(!e)return;let t=e.currentTime;[1046.5,1567.9].forEach((o,n)=>{let i=e.createOscillator(),r=e.createGain();i.type="sine",i.frequency.value=o,r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(it*.6,t+.05),r.gain.exponentialRampToValueAtTime(.001,t+.6),i.connect(r),r.connect(e.destination),i.start(t),i.stop(t+.7)})},playGenieOpen:()=>{if(et)return;let e=mt();if(!e)return;let t=e.currentTime,a=e.createBufferSource();a.buffer=Xo(e);let o=e.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(100,t),o.frequency.exponentialRampToValueAtTime(800,t+.2);let n=e.createGain();n.gain.setValueAtTime(0,t),n.gain.linearRampToValueAtTime(it*.5,t+.05),n.gain.linearRampToValueAtTime(0,t+.25),a.connect(o),o.connect(n),n.connect(e.destination),a.start(t),a.stop(t+.3)},playError:()=>{if(et)return;let e=mt();if(!e)return;let t=e.currentTime,a=e.createOscillator(),o=e.createGain();a.type="triangle",a.frequency.setValueAtTime(120,t),a.frequency.exponentialRampToValueAtTime(80,t+.1),o.gain.setValueAtTime(it,t),o.gain.exponentialRampToValueAtTime(.001,t+.15),a.connect(o),o.connect(e.destination),a.start(t),a.stop(t+.2)},playStartup:()=>{if(et)return;let e=mt();if(!e)return;let t=e.currentTime,a=.12,o=e.createOscillator(),n=e.createGain(),i=e.createBiquadFilter();o.type="square",o.frequency.setValueAtTime(400,t),o.frequency.exponentialRampToValueAtTime(50,t+.1),i.type="lowpass",i.frequency.setValueAtTime(800,t),i.frequency.exponentialRampToValueAtTime(100,t+.1),n.gain.setValueAtTime(it*4,t),n.gain.exponentialRampToValueAtTime(.001,t+.1),o.connect(i),i.connect(n),n.connect(e.destination),o.start(t),o.stop(t+.12);let r=e.createOscillator(),l=e.createGain();r.type="sine",r.frequency.setValueAtTime(150,t),r.frequency.exponentialRampToValueAtTime(50,t+.15),l.gain.setValueAtTime(it*1.5,t),l.gain.exponentialRampToValueAtTime(.001,t+.15),r.connect(l),l.connect(e.destination),r.start(t),r.stop(t+.15),[55,55.4,110.5].forEach(b=>{let p=e.createOscillator(),h=e.createGain(),m=e.createBiquadFilter();p.type="sawtooth",p.frequency.value=b,m.type="lowpass",m.frequency.setValueAtTime(30,t),m.frequency.linearRampToValueAtTime(900,t+a+.2),m.frequency.exponentialRampToValueAtTime(40,t+3),h.gain.setValueAtTime(0,t),h.gain.linearRampToValueAtTime(it*.6,t+a+.1),h.gain.exponentialRampToValueAtTime(.001,t+3.5),p.connect(m),m.connect(h),h.connect(e.destination),p.start(t),p.stop(t+3.6)})},playNotification:()=>{if(et)return;let e=mt();if(!e)return;let t=e.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(o=>{let n=e.createOscillator(),i=e.createGain();n.type="sine",n.frequency.setValueAtTime(o.freq,t),i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(it*o.vol,t+.004),i.gain.exponentialRampToValueAtTime(.001,t+o.dur),n.connect(i),i.connect(e.destination),n.start(t),n.stop(t+o.dur+.1)})},playReady:()=>{if(et)return;let e=mt();if(!e)return;let t=e.currentTime;[{freq:587.33,at:0,dur:.2,vol:.26},{freq:880,at:.09,dur:.3,vol:.3},{freq:1760,at:.09,dur:.26,vol:.08}].forEach(o=>{let n=e.createOscillator(),i=e.createGain();n.type="sine",n.frequency.value=o.freq;let r=t+o.at;i.gain.setValueAtTime(0,r),i.gain.linearRampToValueAtTime(it*o.vol,r+.02),i.gain.exponentialRampToValueAtTime(.001,r+o.dur),n.connect(i),i.connect(e.destination),n.start(r),n.stop(r+o.dur+.05)})},startThinking:()=>{if(et)return;let e=mt();if(!e||Zt)return;let t=[523.25,659.25,783.99];Va=0;let a=()=>{if(et)return;let o=e.currentTime,n=e.createOscillator(),i=e.createGain();n.type="sine",n.frequency.setValueAtTime(t[Va%t.length],o),i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(it*.15,o+.02),i.gain.exponentialRampToValueAtTime(.001,o+.22),n.connect(i),i.connect(e.destination),n.start(o),n.stop(o+.25),Va++};a(),Zt=setInterval(a,370)},stopThinking:()=>{Zt&&(clearInterval(Zt),Zt=null)},playSwoosh:()=>{v.playGenieOpen()},playReset:()=>{v.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let e=0,t=50;document.addEventListener("mouseover",a=>{if(!Nt)return;let o=a.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!o||o.contains(a.relatedTarget))return;let n=Date.now();n-e<t||(v.playHover(),e=n)},{passive:!0})}};var Ko="cw_ui_lang",Jo=["pt","es"];function Ur(){try{let e=typeof localStorage<"u"?localStorage.getItem(Ko):null;return Jo.includes(e)?e:null}catch{return null}}var Ya=Ur(),Qt=Ya||"pt",Wa=new Set;function ce(){return Qt}function Vr(e){return Jo.includes(e)}function Xa(e,{persist:t=!0}={}){if(!(!Vr(e)||e===Qt)){if(Qt=e,t){Ya=e;try{typeof localStorage<"u"&&localStorage.setItem(Ko,e)}catch{}}Wa.forEach(a=>{try{a(Qt)}catch(o){console.warn("i18n listener falhou:",o)}})}}function Zo(e){if(Ya)return;let t=String(e?.defaultLanguage||"").toUpperCase(),o={"PT-BR":"pt",PT:"pt",ES:"es"}[t];o&&Xa(o,{persist:!1})}function Ee(e){return Wa.add(e),()=>Wa.delete(e)}function Qo(e){return function(a){return e[Qt]?.[a]??e.pt?.[a]??a}}var De={MODULE_RESTING:2147483640,MODULE_FOCUSED:2147483641,PAGE_SPOTLIGHT_OVERLAY:2147483642,PAGE_SPOTLIGHT_TARGET:2147483643,TOAST:2147483644,FOCUS_BACKDROP:2147483646,TOP:2147483647};var en=["lucaste","ricardogi"],Dt="https://docs.google.com/forms/d/1v8mi4eLmx3a2GX2lEMmxMDR2n8AdzGL9WP_p_YEaveg/viewform",st="@lucaste";var Ka=De.MODULE_RESTING;function an(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}function J(e,t={}){let a=document.createElement("div"),o=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(a.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:String(De.TOAST),opacity:"0",transition:"all 0.4s var(--cw-ease-spring)",pointerEvents:"none"}),a.textContent=e,document.body.appendChild(a),t.error?v.playError():v.playSuccess(),requestAnimationFrame(()=>{a.style.opacity="1",a.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{a.style.opacity="0",a.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>a.remove(),400)},t.duration||4e3)}function on(e,t=null){let a=0,o=0,n=0,i=0,r=t||e;r.style.cursor="grab",r.onmousedown=l;function l(p){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(p.target.tagName)||p.target.closest(".no-drag"))return;p=p||window.event,r.style.cursor="grabbing",e.style.transition="none";let h=e.getBoundingClientRect();e.style.transform="none",e.style.left=h.left+"px",e.style.top=h.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",Ka=Math.min(Ka+1,De.MODULE_FOCUSED),e.style.zIndex=Ka,n=p.clientX,i=p.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=b,document.onmousemove=s}function s(p){p=p||window.event,p.preventDefault(),a=n-p.clientX,o=i-p.clientY,n=p.clientX,i=p.clientY;let h=e.offsetTop-o,m=e.offsetLeft-a,g=16,I=window.innerWidth,x=window.innerHeight,y=e.offsetWidth,z=e.offsetHeight;m=Tt(m,g,I-y-g),h=Tt(h,g,x-z-g),e.style.top=h+"px",e.style.left=m+"px"}function b(){document.onmouseup=null,document.onmousemove=null,r.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s var(--cw-ease-decelerate), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var He={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:String(De.MODULE_RESTING),overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08),
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var Ja={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},nn={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var rn={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var tn=!1;function Wr(){if(tn||document.getElementById("techsol-google-styles"))return;let e=document.createElement("style");e.id="techsol-google-styles",e.innerHTML=`
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
    `,document.head.appendChild(e),tn=!0}function sn(e){Wr(),e.classList.remove("google-animate-click"),e.offsetWidth,e.classList.add("google-animate-click"),setTimeout(()=>{e.classList.remove("google-animate-click")},600)}async function Yr(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let a=e.querySelector(".cursor");await pe(200);for(let o=0;o<t.length;o++){let n=t.charAt(o),i=document.createElement("span");i.textContent=n,a&&a.parentNode===e?a.before(i):e.appendChild(i);let r=Math.floor(Math.random()*60)+30;o===0&&(r=150),o>t.length-3&&(r=30),await pe(r)}await pe(600),a&&(a.style.display="none")}async function Za(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
            /* Google Sans j\xE1 vem via <link> logo acima em initGlobalStylesAndFont(),
               chamada antes da splash - esse @import era uma 3a requisi\xE7\xE3o redundante
               pra fonte (a 1a \xE9 o <link>, a 2a era o do command-center.js). */
            .splash-container { font-family: 'Google Sans', sans-serif; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #202124; z-index: ${De.TOP}; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1); }
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
        <div class="credit-pro">created by <span>${st}</span></div>
        <div class="loader-line"></div>
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await pe(200);let t=await Xt(),a=Wo(t),o=e.querySelector("#w-icon"),n=e.querySelector("#p1"),i=e.querySelector("#p2"),r=e.querySelector("#p3"),l=e.querySelector("#p-sextou");o&&(o.innerHTML=a.icon),n&&(n.textContent=a.prefix),r&&(r.textContent=a.suffix),await pe(300);let s=o?o.querySelector("svg"):null;if(s&&(s.style.opacity="1",s.style.transform="scale(1)"),await pe(400),n&&(n.style.opacity="1"),v.playStartup(),i&&await Yr(i,a.name),r&&(r.style.opacity="1",r.style.transform="translateY(0)"),a.isFriday&&l){await pe(400),l.style.display="block",l.offsetWidth;let b=l.querySelector(".sextou-badge");b&&(b.style.opacity="1",b.style.transform="scale(1)")}await pe(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await pe(900),e.parentNode&&e.parentNode.removeChild(e)}}function ln(e){if(!e)return;let t=e.getBoundingClientRect(),a=window.innerWidth,o=window.innerHeight,n=24,i=a-t.width-n,r=o-t.height-n,l=parseFloat(e.style.left)||t.left,s=parseFloat(e.style.top)||t.top,b=Tt(l,n,i),p=Tt(s,n,r);if(b!==l||p!==s){let h=e.style.transition;e.style.transition="left 0.3s var(--cw-ease-elastic), top 0.3s var(--cw-ease-elastic)",e.style.left=`${b}px`,e.style.top=`${p}px`,setTimeout(()=>{e.style.transition=h},300)}}var lt={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function ct(e,t){t.onmousedown=a;function a(o){o.stopPropagation(),o.preventDefault();let n=e.style.transition;e.style.transition="none";let i=o.clientX,r=o.clientY,l=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),s=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),b=i,p=r,h=!1;function m(x){b=x.clientX,p=x.clientY,h||(window.requestAnimationFrame(()=>{g(),h=!1}),h=!0)}function g(){let x=l+(b-i),y=s+(p-r);x>360&&(e.style.width=x+"px"),y>300&&(e.style.height=y+"px")}function I(){document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",I),setTimeout(()=>{e.style.transition=n},50)}document.addEventListener("mousemove",m),document.addEventListener("mouseup",I)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}function fa(e){if(!e||e==="N/A"||e==="undefined")return"Data indispon\xEDvel";if(String(e).includes(" | "))return e.split(" | ").map(t=>fa(t.trim())).filter(t=>t!=="Data indispon\xEDvel").join(" | ");try{let t=new Date(e);if(isNaN(t.getTime()))return"Data indispon\xEDvel";let a=t.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}),o=t.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});return`${a} \xE0s ${o}`}catch{return"Data indispon\xEDvel"}}function cn(e){if(!e)return"";let t={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return e.replace(/:([a-zA-Z0-9-_+]+):/g,a=>t[a]?t[a]:"")}function dn(){let e=document.createElement("div");return e.className="cw-dialog-overlay",Object.assign(e.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:De.TOP,opacity:0,transition:"opacity 0.3s ease"}),e}function pn(){let e=document.createElement("div");return Object.assign(e.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s var(--cw-ease-spring)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),e}function Me(e,t={}){return new Promise(a=>{let o=dn(),n=pn(),i=t.danger?"#FF3B30":"#007AFF",r=ce()==="es"?"Eliminar":"Excluir",l=t.confirmText||(t.danger?r:"Confirmar");n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${e}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${i}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${l}</button>
            </div>
        `,o.appendChild(n),document.body.appendChild(o),requestAnimationFrame(()=>{o.style.opacity=1,n.style.transform="scale(1)"});let s=h=>{o.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{o.remove(),a(h)},300)},b=n.querySelector("#cw-conf-cancel"),p=n.querySelector("#cw-conf-ok");[b,p].forEach(h=>h.onmouseenter=()=>v.playHover()),b.onclick=()=>{v.playClick(),s(!1)},p.onclick=()=>{v.playClick(),s(!0)}})}function ha(e,t=""){return new Promise(a=>{let o=dn(),n=pn();n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${e}</div>
            <input type="text" id="cw-prompt-input" value="${t}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,o.appendChild(n),document.body.appendChild(o);let i=n.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{o.style.opacity=1,n.style.transform="scale(1)",setTimeout(()=>i.focus(),100)});let r=b=>{o.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{o.remove(),a(b)},300)},l=n.querySelector("#cw-prompt-cancel"),s=n.querySelector("#cw-prompt-ok");[l,s].forEach(b=>b.onmouseenter=()=>v.playHover()),l.onclick=()=>{v.playClick(),r(null)},s.onclick=()=>{v.playClick(),r(i.value)},i.onkeydown=b=>{b.key==="Enter"&&s.click(),b.key==="Escape"&&l.click()}})}var Qa=class{constructor(){this.visible=!1,this.reset()}reset(){this.currentCaseType="bau",this.currentLang="pt",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.activeFields=[];let t=typeof localStorage<"u"?localStorage.getItem("cw-notes-favorites"):null;this.favorites=new Set(JSON.parse(t||"[]")),this.screenshotMode="implementation",this.notify()}setCaseType(t){this.currentCaseType!==t&&(this.currentCaseType=t,this.isDirty=!0,this.notify())}setLanguage(t){this.currentLang!==t&&(this.currentLang=t,this.notify())}setPortugalCase(t){this.isPortugalCase!==t&&(this.isPortugalCase=t,this.isDirty=!0,this.notify())}setConsent(t){this.consent!==t&&(this.consent=t,this.isDirty=!0,this.notify())}setTagSupportUsed(t){this.tagSupportUsed=t,t||this.forcedScreenshots.clear(),this.isDirty=!0,this.notify()}setActiveFields(t){this.activeFields=[...t],this.isDirty=!0,this.notify()}removeField(t){this.activeFields=this.activeFields.filter(a=>a!==t),this.isDirty=!0,this.notify()}addFieldAt(t,a){this.activeFields.includes(t)||(this.activeFields.splice(a,0,t),this.isDirty=!0,this.notify())}setForcedScreenshots(t){this.forcedScreenshots=new Set(t),this.isDirty=!0,this.notify()}toggleForcedScreenshot(t,a){a?this.forcedScreenshots.add(t):this.forcedScreenshots.delete(t),this.isDirty=!0,this.notify()}setStatus(t){this.currentStatus!==t&&(this.currentStatus=t,this.isDirty=!0,this.notify())}setSubStatus(t){this.currentSubStatus!==t&&(this.currentSubStatus=t,this.isDirty=!0,this.notify())}setScreenshotMode(t){this.screenshotMode=t,this.notify()}setActiveTasks(t){this.activeTasks=t,this.isDirty=!0,this.notify()}toggleFavorite(t){this.favorites.has(t)?this.favorites.delete(t):this.favorites.add(t),typeof localStorage<"u"&&localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(t,a){this.formData[t]!==a&&(this.formData[t]=a,this.isDirty=!0,this.notify())}listeners=[];subscribe(t){return this.listeners.push(t),()=>this.listeners=this.listeners.filter(a=>a!==t)}notify(){this.listeners.forEach(t=>t(this))}},X=new Qa;var un={pt:{helpTooltip:"Sobre & Feedback",closeTooltip:"Fechar",version:"Vers\xE3o",reportLink:"Reportar Bug ou Sugest\xE3o",backBtn:"Voltar",createdBy:"criado por"},es:{helpTooltip:"Acerca de y Comentarios",closeTooltip:"Cerrar",version:"Versi\xF3n",reportLink:"Reportar error o sugerencia",backBtn:"Volver",createdBy:"creado por"}};function tt(e){let t=ce();return un[t]?.[e]??un.pt[e]??e}var Xr={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},mn={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function ze(e,t,a,o,n,i){let r=document.createElement("div");Object.assign(r.style,Xr),on(e,r);let l=document.createElement("div");if(Object.assign(l.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",backgroundSize:"300% auto",zIndex:"10",opacity:"0.8"}),!document.getElementById("cw-header-anim")){let A=document.createElement("style");A.id="cw-header-anim",A.innerHTML=`
            @keyframes cw-header-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `,document.head.appendChild(A)}window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||(l.style.animation="cw-header-flow 6s linear infinite"),r.appendChild(l),n&&(n.googleLine=l);let b=document.createElement("div");Object.assign(b.style,{display:"flex",alignItems:"center",gap:"12px"});let p=document.createElement("div");p.innerHTML='<svg viewBox="0 0 48 48" width="20" height="20"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/></svg>',Object.assign(p.style,{width:"20px",height:"20px",pointerEvents:"none",flexShrink:"0",display:"flex"});let h=document.createElement("span");h.textContent=t,b.appendChild(p),b.appendChild(h);let m=document.createElement("div");Object.assign(m.style,{display:"flex",alignItems:"center",gap:"4px"});let g='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',I='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',x=document.createElement("div");x.innerHTML=g,Object.assign(x.style,mn),x.title=tt("helpTooltip"),x.classList.add("no-drag"),x.onmouseenter=()=>{x.style.background="rgba(255,255,255,0.1)",x.style.color="#FFF"},x.onmouseleave=()=>{x.style.color!=="rgb(138, 180, 248)"&&(x.style.background="transparent",x.style.color="#9AA0A6")};let y=document.createElement("div");y.innerHTML=I,Object.assign(y.style,mn),y.title=tt("closeTooltip"),y.classList.add("no-drag","cw-header-close"),y.onmouseenter=()=>{y.style.background="rgba(242, 139, 130, 0.2)",y.style.color="#F28B82"},y.onmouseleave=()=>{y.style.background="transparent",y.style.color="#9AA0A6"},y.onmousedown=A=>A.stopPropagation(),x.onmousedown=A=>A.stopPropagation(),y.onclick=i;let z=Kr(e,t,a,o);return x.onclick=A=>{A.stopPropagation(),z.style.opacity==="1"?(z.style.opacity="0",z.style.pointerEvents="none",x.style.color="#9AA0A6",x.style.background="transparent"):(z.style.opacity="1",z.style.pointerEvents="auto",x.style.color="#8AB4F8",x.style.background="rgba(138, 180, 248, 0.1)")},m.appendChild(x),m.appendChild(y),r.appendChild(b),r.appendChild(m),Ee(()=>{x.title=tt("helpTooltip"),y.title=tt("closeTooltip")}),r}function Kr(e,t,a,o){let n=document.createElement("div");return Object.assign(n.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),n.innerHTML=`
        <div class="cw-help-title" style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${t}</div>
        <div class="cw-help-version" style="color: #5f6368; font-size: 14px; margin-bottom: 24px;">${tt("version")} ${a}</div>

        <div class="cw-help-description" style="color: #3c4043; font-size: 14px; max-width: 90%; line-height: 1.6; margin-bottom: 24px;">
            ${o}
        </div>

        <div style="margin-bottom: 32px;">
            <a href="${Dt}" target="_blank" rel="noopener noreferrer" id="cw-feedback-link" style="
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
                <span>\u{1F4AC}</span> <span class="cw-help-report-link">${tt("reportLink")}</span>
            </a>
        </div>

        <div class="cw-help-created-by" style="font-size: 12px; color: #9aa0a6;">
            ${tt("createdBy")} <span style="color: #1a73e8; font-weight: 500;">${st}</span>
        </div>

        <button id="close-help-internal" style="margin-top: 24px; padding: 8px 24px; border: 1px solid #dadce0; background: white; border-radius: 18px; color: #5f6368; cursor: pointer; font-weight: 500; transition: background 0.2s;">
            ${tt("backBtn")}
        </button>
    `,setTimeout(()=>{let i=n.querySelector("#cw-feedback-link");i&&(i.onmouseenter=()=>{i.style.backgroundColor="#E8F0FE",i.style.transform="scale(1.02)"},i.onmouseleave=()=>{i.style.backgroundColor="#F8F9FA",i.style.transform="scale(1)"});let r=n.querySelector("#close-help-internal");r&&(r.onmouseover=()=>r.style.backgroundColor="#f8f9fa",r.onmouseout=()=>r.style.backgroundColor="white",r.onclick=()=>{n.style.opacity="0",n.style.pointerEvents="none"})},0),Ee(()=>{let i=n.querySelector(".cw-help-version");i&&(i.textContent=`${tt("version")} ${a}`);let r=n.querySelector(".cw-help-report-link");r&&(r.textContent=tt("reportLink"));let l=n.querySelector(".cw-help-created-by");l&&(l.firstChild.textContent=`${tt("createdBy")} `);let s=n.querySelector("#close-help-internal");s&&(s.textContent=tt("backBtn"))}),e.appendChild(n),n}var j={blue:"#4285F4",red:"#EA4335",yellow:"#FBBC05",green:"#34A853",primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#34A853",warning:"#FBBC05",error:"#EA4335"},Le={small:"8px",medium:"12px",large:"20px",pill:"100px"},gt={subtle:"0 1px 3px rgba(0,0,0,0.08)",card:"0 4px 12px rgba(0,0,0,0.05)",elevated:"0 12px 24px rgba(0,0,0,0.08)",apple:"0 20px 40px rgba(0,0,0,0.12)"},xe="cubic-bezier(0.34, 1.56, 0.64, 1)",Jr={width:"100%",padding:"14px 16px",borderRadius:Le.medium,border:`1.5px solid ${j.border}`,backgroundColor:j.bgInput,fontSize:"14px",color:j.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`all 0.3s ${xe}`,outline:"none"},jl={...Jr,minHeight:"120px",resize:"vertical",lineHeight:"1.6"},Hl={fontSize:"12px",fontWeight:"700",color:j.textSub,textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px 0"},Ul={display:"block",fontSize:"14px",fontWeight:"600",color:j.text,marginBottom:"10px",marginTop:"20px"},Vl={fontSize:"12px",color:j.warning,marginTop:"8px",display:"flex",alignItems:"center",gap:"8px",fontWeight:"500"},eo={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:j.primary},Wl={display:"flex",alignItems:"center",marginBottom:"12px",fontSize:"14px",fontWeight:"500",color:j.text,cursor:"pointer",padding:"16px 20px",backgroundColor:j.surface,border:`1px solid ${j.border}`,borderRadius:Le.large,transition:`all 0.4s ${xe}`,userSelect:"none",boxShadow:gt.subtle},Yl={padding:"14px 28px",color:"#fff",backgroundColor:j.primary,border:"none",borderRadius:Le.pill,fontSize:"15px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px 0 rgba(26,115,232,0.39)",transition:`all 0.25s ${xe}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",outline:"none"},Xl={width:"100%",padding:"12px",background:"#FFFFFF",border:`1.5px dashed ${j.primary}`,color:j.primary,borderRadius:Le.medium,cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"16px",transition:`all 0.25s ${xe}`},Kl={background:"transparent",border:`1px solid ${j.border}`,borderRadius:Le.pill,color:j.textSub,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",margin:"20px auto",transition:`all 0.25s ${xe}`};var ea={pt:"Gera notas padronizadas com excel\xEAncia visual.",es:"Genera notas estandarizadas con excelencia visual."};function gn(e,t){let a=document.createElement("div");a.id="notes-assistant-popup",a.classList.add("cw-module-window"),Object.assign(a.style,He,{right:"100px",width:"520px",height:"740px",display:"flex",flexDirection:"column",transition:`width 0.4s ${xe}, height 0.4s ${xe}, transform 0.4s ${xe}, opacity 0.3s ease`,borderRadius:Le.large,boxShadow:gt.apple,border:"1px solid rgba(255, 255, 255, 0.7)"});let o={popup:a,googleLine:null},n=ze(a,"Case Notes",e,ea[ce()]||ea.pt,o,t);a.appendChild(n);let i=document.createElement("div");i.className="cw-popup-content",Object.assign(i.style,{padding:"24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"24px",background:j.surface}),a.appendChild(i);let r=document.createElement("div");r.textContent=`created by ${st}`,Object.assign(r.style,rn,{padding:"16px 24px",borderTop:`1px solid ${j.bgInput}`,color:j.textSub,fontSize:"11px",marginTop:"auto",fontWeight:"500",letterSpacing:"0.5px"}),a.appendChild(r);let l=document.createElement("div");return Object.assign(l.style,lt),l.className="no-drag",a.appendChild(l),ct(a,l),Zr(),{popup:a,content:i,header:n,animRefs:o,credit:r}}function Zr(){if(document.getElementById("cw-notes-refactor-styles"))return;let e=document.createElement("style");e.id="cw-notes-refactor-styles",e.innerHTML=`
        .cw-popup-content::-webkit-scrollbar { width: 8px; }
        .cw-popup-content::-webkit-scrollbar-track { background: transparent; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; border: 2px solid #fff; }
        .cw-popup-content::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .cw-input, .cw-textarea, .cw-select {
            width: 100% !important;
            padding: 12px 16px !important;
            border-radius: ${Le.medium} !important;
            border: 1.5px solid ${j.border} !important;
            font-size: 14px !important;
            font-family: 'Google Sans', Roboto, sans-serif !important;
            transition: border-color 0.2s ${xe}, background-color 0.2s ${xe}, box-shadow 0.2s ${xe} !important;
            box-sizing: border-box !important;
            background: ${j.bgInput} !important;
            color: ${j.text} !important;
            outline: none !important;
            box-shadow: ${gt.subtle} !important;
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
            transition: border-color 0.2s ${xe}, background-color 0.2s ${xe}, box-shadow 0.2s ${xe} !important;
        }

        .cw-input:hover, .cw-textarea:hover, #notes-assistant-popup .cw-select:hover {
            border-color: #bdc1c6 !important;
            background-color: #f1f3f4 !important;
            box-shadow: 0 1px 4px rgba(0,0,0,0.1) !important;
        }

        .cw-input:focus, .cw-textarea:focus, #notes-assistant-popup .cw-select:focus {
            border-color: ${j.primary} !important;
            background-color: #fff !important;
            box-shadow: 0 0 0 3px rgba(26,115,232,0.15), 0 2px 8px rgba(0,0,0,0.05) !important;
        }

        .cw-textarea { min-height: 100px; resize: vertical; line-height: 1.5; }

        .cw-section-title {
            font-size: 11px;
            font-weight: 700;
            color: ${j.textSub};
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
            background: ${j.bgInput};
        }

        .cw-btn-primary {
            background: ${j.primary};
            color: #fff;
            border: none;
            border-radius: ${Le.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ${xe}, transform 0.2s ${xe}, box-shadow 0.2s ${xe};
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
            color: ${j.textSub};
            border: 1px solid ${j.border};
            border-radius: ${Le.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ${xe}, border-color 0.2s ${xe}, color 0.2s ${xe};
        }
        .cw-btn-secondary:hover {
            background: ${j.bgInput};
            border-color: #bdc1c6;
            color: ${j.text};
        }

        @media (prefers-reduced-motion: reduce) {
            .cw-btn-primary, .cw-btn-secondary, .cw-input, .cw-textarea, .cw-select {
                transition: opacity 0.15s ease, background-color 0.15s ease, border-color 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}var Xe={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"Selecione",substatus:"Substatus:",select_substatus:"Selecione o Status",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",preencher_email_automaticamente:"Preencher email automaticamente?",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",trechos:"Trechos",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",link_aqui:"Link aqui",tag_support_output_label:"Utilizou Tag Support?",motivo_output_label:"Motivo:",auto_busca:"\u2728 Auto Busca",utilize_marcadores:"Utilize marcadores para detalhar...",descreva_consideracoes:"Descreva as considera\xE7\xF5es...",remover:"Remover",remover_campo_confirm:'Remover o campo "{campo}"?',meus_rascunhos:"Meus Rascunhos",confirmar_guardar_rascunho:"Deseja guardar o rascunho atual e limpar os campos?",rascunho_salvo_sucesso:"Rascunho salvo com sucesso!",erro_ler_dados:"Erro: N\xE3o foi poss\xEDvel ler os dados.",erro_ao_salvar:"Erro ao salvar.",cliente_sem_nome:"Cliente Sem Nome",sem_status:"Sem Status",retomar_caso:"Retomar Caso",descartar:"Descartar",retomar_rascunho_confirm:"Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.",rascunho_carregado:"Rascunho carregado.",excluir_rascunho_confirm:"Excluir este rascunho?",acoes_plural:"A\xE7\xF5es",acao_singular:"A\xE7\xE3o",definidas_plural:"definidas",definida_singular:"definida",renomear_tooltip:"Clique para renomear esta task",renomear_hint:"\u270E Renomear",substituir_rascunho_confirm:"Isso vai substituir o rascunho atual da nota. Deseja continuar?",salvar_como_atalho:"Salvar como atalho do Ctrl+K",atalho_nome_pergunta:"Como este atalho vai se chamar no Ctrl+K?",atalho_salvo:"Atalho salvo! J\xE1 aparece no Ctrl+K.",atalho_salvo_local:"Atalho salvo neste navegador (sem conex\xE3o com a nuvem).",atalho_limite:"Voc\xEA j\xE1 tem {max} atalhos. Apague um em Configura\xE7\xF5es antes de criar outro.",atalho_cenario_sumiu:"Este atalho apontava para um cen\xE1rio que n\xE3o existe mais. Revise-o em Configura\xE7\xF5es.",restaurar_rascunho_confirm:"Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?",cole_link_placeholder:"Cole o link aqui...",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F Anunciante consentiu com a grava\xE7\xE3o?",sim:"Sim",nao:"N\xE3o",pronto_comecar:"Pronto para come\xE7ar?",selecione_status_ajuda:"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Task(s) solicitada(s):",passos_executados:"\u{1F463} O que foi feito:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 D\xFAvidas do anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implementadas na call:",proximos_passos:"\u{1F680} Pr\xF3ximos passos (Acompanhamento):",consideracoes:"\u{1F4A1} Considera\xE7\xF5es adicionais:",contexto_call:"\u{1F4AC} Contexto/O que foi feito:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Minha A\xE7\xE3o:",dia:"\u{1F4C5} Dia do Follow-up (se aplic\xE1vel):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Data do reagendamento:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evid\xEAncias de Contato",ligacao_1:"Liga\xE7\xE3o 1",ligacao_2:"Liga\xE7\xE3o 2",mensagem_am:"Mensagem para AM",tentativa_ligacao:"\u{1F4DE} Tentativa de liga\xE7\xE3o:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"Seleccione",substatus:"Subestado:",select_substatus:"Seleccione el Estado",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",preencher_email_automaticamente:"\xBFRellenar correo autom\xE1ticamente?",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",trechos:"Fragmentos",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",link_aqui:"Enlace aqu\xED",tag_support_output_label:"\xBFUtiliz\xF3 Tag Support?",motivo_output_label:"Motivo:",auto_busca:"\u2728 B\xFAsqueda Autom\xE1tica",utilize_marcadores:"Utiliza vi\xF1etas para detallar...",descreva_consideracoes:"Describe las consideraciones...",remover:"Eliminar",remover_campo_confirm:'\xBFEliminar el campo "{campo}"?',meus_rascunhos:"Mis Borradores",confirmar_guardar_rascunho:"\xBFDesea guardar el borrador actual y limpiar los campos?",rascunho_salvo_sucesso:"\xA1Borrador guardado con \xE9xito!",erro_ler_dados:"Error: No fue posible leer los datos.",erro_ao_salvar:"Error al guardar.",cliente_sem_nome:"Cliente Sin Nombre",sem_status:"Sin Estado",retomar_caso:"Retomar Caso",descartar:"Descartar",retomar_rascunho_confirm:"\xBFRetomar este borrador? El formulario actual ser\xE1 reemplazado.",rascunho_carregado:"Borrador cargado.",excluir_rascunho_confirm:"\xBFEliminar este borrador?",acoes_plural:"Acciones",acao_singular:"Acci\xF3n",definidas_plural:"definidas",definida_singular:"definida",renomear_tooltip:"Haz clic para renombrar esta tarea",renomear_hint:"\u270E Renombrar",substituir_rascunho_confirm:"Esto reemplazar\xE1 el borrador actual de la nota. \xBFDeseas continuar?",salvar_como_atalho:"Guardar como atajo de Ctrl+K",atalho_nome_pergunta:"\xBFC\xF3mo se va a llamar este atajo en el Ctrl+K?",atalho_salvo:"\xA1Atajo guardado! Ya aparece en el Ctrl+K.",atalho_salvo_local:"Atajo guardado en este navegador (sin conexi\xF3n con la nube).",atalho_limite:"Ya tienes {max} atajos. Elimina uno en Configuraci\xF3n antes de crear otro.",atalho_cenario_sumiu:"Este atajo apuntaba a un escenario que ya no existe. Rev\xEDsalo en Configuraci\xF3n.",restaurar_rascunho_confirm:"Detectamos un borrador sin guardar de tu \xFAltima sesi\xF3n. \xBFDeseas restaurarlo?",cole_link_placeholder:"Pega el enlace aqu\xED...",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F \xBFEl anunciante consinti\xF3 la grabaci\xF3n?",sim:"S\xED",nao:"No",pronto_comecar:"\xBFListo para empezar?",selecione_status_ajuda:"Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Tarea(s) solicitada(s):",passos_executados:"\u{1F463} Qu\xE9 se hizo:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 Dudas del anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resoluciones/Explicaciones:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tareas implementadas en la call:",proximos_passos:"\u{1F680} Pr\xF3ximos pasos:",consideracoes:"\u{1F4A1} Consideraciones adicionales:",contexto_call:"\u{1F4AC} Contexto/Qu\xE9 se hizo:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Mi Acci\xF3n:",dia:"\u{1F4C5} D\xEDa de Follow-up (si aplica):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Fecha de reprogramaci\xF3n:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evidencias de Contacto",ligacao_1:"Llamada 1",ligacao_2:"Llamada 2",mensagem_am:"Mensaje para AM",tentativa_ligacao:"\u{1F4DE} Intento de llamada:"}},at={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},Qr={"GTM Instalado":"GTM Instalado","Vinculador de convers\xF5es":"Vinculador de conversiones","Tag criada":"Etiqueta creada","Teste GTM":"Prueba GTM","Teste Ads":"Prueba Ads","Vers\xE3o Publicada":"Versi\xF3n Publicada","Status Ads":"Estado Ads","Termos aceitos no Ads":"T\xE9rminos aceptados en Ads","Tag implementada":"Etiqueta implementada","Painel do Ads (ap\xF3s 7 dias)":"Panel de Ads (despu\xE9s de 7 d\xEDas)","Tag do evento GA4 implementado no GTM":"Etiqueta del evento GA4 implementada en GTM","Teste GTM (tagassistant.google.com)":"Prueba GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)":"Prueba GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM":"Versi\xF3n publicada en GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4":"(Si hay par\xE1metros) Dimensiones personalizadas creadas en GA4","Evento marcado como principal no GA4":"Evento marcado como principal en GA4","GA4 e Google Ads vinculados corretamente":"GA4 y Google Ads vinculados correctamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)":"Evento principal de GA4 importado en Google Ads (como secundario)","M\xE9tricas app & web ativadas no Google Ads":"M\xE9tricas app y web activadas en Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)":"(Opcional) Prueba en el Informe de Tiempo Real (GA4)","Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)":"Validaci\xF3n: Cuenta GA4 (solo flujo web, no es sector salud)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)':'"Recopilaci\xF3n de datos proporcionados por el usuario" habilitada en GA4 (Administrador > Recopilaci\xF3n de Datos)',"Confirma\xE7\xE3o de coleta de dados (UI)":"Confirmaci\xF3n de recopilaci\xF3n de datos (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM":"Etiqueta del evento GA4 optimizado (UPD) implementada en GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)":"Prueba GTM (tagassistant - par\xE1metro 'em' sin error)","Teste GA4 (DebugView - tagassistant)":"Prueba GA4 (DebugView - tagassistant)","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio":"(Capacitaci\xF3n) Evento principal importado en Google Ads como secundario","Tag implementado no GTM":"Etiqueta implementada en GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo":"Prueba del disparo de la etiqueta de configuraci\xF3n en tag assistant en m\xE1s de una p\xE1gina, mostrando ID y etiqueta","Teste usando o #google-wcc-debug":"Prueba usando #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]":"Cambio del estado de la conversi\xF3n en Google Ads [Esperar algunos minutos]","1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas":"1. OGT (gTag/GTM con etiqueta de vinculador de conversi\xF3n) a\xF1adido en todas las p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)":"2. El etiquetado autom\xE1tico (auto tagging) est\xE1 habilitado en Google Ads (Administrador > Config. de la Cuenta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".':'3. [Si es GTM] El vinculador de conversi\xF3n est\xE1 presente y el activador definido para dispararse en "Todas las P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?":"4. \xBFEl gclid se mantiene sin redirecciones y se almacena en la cookie _gcl_aw en la landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?":"5. \xBFEl gclid fue pasado a la p\xE1gina de conversi\xF3n?"};function bn(e,t,a){let o=e?.screenshots?.[t]||[];return a!=="es"?o:o.map(n=>Qr[n]||n)}function fn(e,t,a){return a==="es"&&e?.fieldPrefixes_es?.[t]?e.fieldPrefixes_es[t]:e?.fieldPrefixes?.[t]||""}function xa(e,t,a){if(t!=="es")return e;let o=oa[a];return o?{...e,...o}:e}function va(e,t){return Object.entries(dt).filter(([,a])=>{let o=!a.type||a.type==="all"||a.type===t,n=Array.isArray(a.substatus)&&a.substatus.includes(e);return o&&n})}function ta(e,t){let a=String(e||"");if(a.startsWith("quickfill-"))return a.slice(10);if(t){let n=`cw-${String(t).toLowerCase()}-`;if(a.startsWith(n))return a.slice(n.length)}let o=a.match(/^cw-[a-z0-9_]+-(.+)$/);return o?o[1]:a}function ya(e,t){return ta(e,t).replace(/-/g," ")}var es=["GTM_GA4_VERIFICADO","MULTIPLE_CIDS"],ts=["REASON_COMMENTS"];function aa(e){let t=[...ts];return e?.requiresTasks&&t.push("GTM_GA4_VERIFICADO"),t}function hn(e){let t=[...es,...e?.extraOptionalFields||[]],a=aa(e);return t.filter(o=>!a.includes(o))}var Fe={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Caso Reagendado."},fieldPrefixes_es:{REASON_COMMENTS:"Caso Reprogramado."}},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Reagendamento aceit\xE1vel."},fieldPrefixes_es:{REASON_COMMENTS:"Reprogramaci\xF3n aceptable."}},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","DIA","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Aguardando Valida\xE7\xF5es no Google Ads."},fieldPrefixes_es:{REASON_COMMENTS:"Esperando Validaciones en Google Ads."}},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES"]},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","TENTATIVA_LIGACAO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PASSOS_EXECUTADOS","RESULTADO","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["PROXIMOS_PASSOS"],fieldPrefixes:{REASON_COMMENTS:"Task implementada com sucesso."},fieldPrefixes_es:{REASON_COMMENTS:"Tarea implementada con \xE9xito."}},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","DUVIDAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["PROXIMOS_PASSOS","CONSIDERACOES"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para tirar d\xFAvidas do anunciante."},fieldPrefixes_es:{REASON_COMMENTS:"Consultor\xEDa utilizada para resolver dudas del anunciante."}},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PROBLEMAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para testar e solucinar problemas da convers\xE3o."},fieldPrefixes_es:{REASON_COMMENTS:"Consultor\xEDa utilizada para probar y solucionar problemas de la conversi\xF3n."}},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,templateFields:["SPEAKEASY_ID","label_substatus","REASON_COMMENTS","COMENTARIOS"],customFooter:"Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},zt={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},$t=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],wa=["CONSIDERACOES","COMENTARIOS"],dt={"quickfill-gtm-install":{type:"all",substatus:["SO_Implementation_Only"],"field-REASON_COMMENTS":"Instala\xE7\xE3o do GTM finalizada.","field-TASKS_SOLICITADAS":"\u2022 Instala\xE7\xE3o do GTM","field-PASSOS_EXECUTADOS":`\u2022 Criamos a conta dentro do GTM
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

Irei abrir caso em BAU para o dia solicitado e pedir a inativa\xE7\xE3o do mesmo.`}},oa={"quickfill-gtm-install":{"field-REASON_COMMENTS":"Instalaci\xF3n de GTM finalizada.","field-TASKS_SOLICITADAS":"\u2022 Instalaci\xF3n de GTM","field-PASSOS_EXECUTADOS":`\u2022 Creamos la cuenta dentro de GTM
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

Abrir\xE9 un caso en BAU para el d\xEDa solicitado y pedir\xE9 la inactivaci\xF3n del mismo.`}};var xn={pt:{searching:"Buscando ID...",readingMessage:"Lendo mensagem...",idFound:e=>`ID Localizado: ${e}`,noIdFound:"Nenhum ID encontrado.",notFound:"N\xE3o encontrado",processingError:"Erro ao processar."},es:{searching:"Buscando ID...",readingMessage:"Leyendo mensaje...",idFound:e=>`ID Encontrado: ${e}`,noIdFound:"Ning\xFAn ID encontrado.",notFound:"No encontrado",processingError:"Error al procesar."}};function Rt(e){let t=ce();return xn[t]?.[e]??xn.pt[e]}var vn="cw-automation-styles";if(!document.getElementById(vn)){let e=document.createElement("style");e.id=vn,e.innerHTML=`
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
            z-index: ${De.PAGE_SPOTLIGHT_TARGET} !important; 
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
            z-index: ${De.PAGE_SPOTLIGHT_OVERLAY};   /* Fica atr\xE1s do Input */
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: all;                  /* Bloqueia cliques na p\xE1gina */
        }
    `,document.head.appendChild(e)}function yn(e){let t=document.getElementById("cw-loading-overlay");e?t?t.style.opacity="1":(t=document.createElement("div"),t.id="cw-loading-overlay",document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1")):t&&(t.style.opacity="0",setTimeout(()=>t.remove(),300))}async function Sa(e){await Ha();let t=document.getElementById(e),a="";yn(!0),t&&(a=t.placeholder,t.placeholder=Rt("searching"),t.value="",t.classList.add("cw-scanning-active"));try{let o=document.querySelector('material-button[debug-id="dock-item-case-log"]');o&&!o.classList.contains("selected")&&(vt(o),await pe(1200));let n=document.querySelector("search-filter dropdown-button .button");if(n&&!(n.innerText||"").includes("All")){vt(n),await pe(600);let m=document.querySelector('material-checkbox[debug-id="check-all-box"]');m&&m.getAttribute("aria-checked")!=="true"&&(vt(m),await pe(300));let g=document.querySelector('material-button[debug-id="apply-filter"]');g&&(vt(g),await pe(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await pe(500));let r=Array.from(document.querySelectorAll(".message-header"));for(let h=r.length-1;h>=0;h--){let m=r[h],g=m.querySelector("i.material-icons-extended"),I=g&&g.innerText.trim()==="phone_in_talk",x=m.innerText||"",y=x.includes("Agent joined")||x.includes("outbound-call")||x.includes("Speakeasy");if(I||y){m.getAttribute("aria-expanded")==="true"||(t&&(t.placeholder=Rt("readingMessage")),vt(m),await pe(1e3));break}}let s=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),b=/Speakeasy.*?(P\d{15,25})/i,p=null;for(let h=s.length-1;h>=0;h--){let m=s[h];if(m.offsetParent===null)continue;let g=(m.innerText||"").match(b);if(g&&g[1]){p=g[1];break}}if(t)if(p){try{await navigator.clipboard.writeText(p)}catch{}t.tagName==="INPUT"||t.tagName==="TEXTAREA"?t.value=p:t.textContent=p,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),v.playSuccess(),J(Rt("idFound")(p)),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}else v.playError(),J(Rt("noIdFound"),{error:!0}),t.placeholder=Rt("notFound"),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}catch(o){console.error("Erro na automa\xE7\xE3o:",o),v.playError(),J(Rt("processingError"),{error:!0})}finally{t&&(t.classList.remove("cw-scanning-active"),t.value||(t.placeholder=a)),yn(!1)}}function wn(e){e.dataset.bulletEnabled!=="true"&&(e.dataset.bulletEnabled="true",(e.value.trim()===""||e.value.trim()==="\u2022")&&(e.value="\u2022 "),e.addEventListener("keydown",function(t){let a=this.selectionStart,o=this.selectionEnd,n=this.value,i=n.lastIndexOf(`
`,a-1)+1,r=n.substring(i,a);if(t.key==="Enter"){t.preventDefault();let l=r.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(r.trim()==="\u2022"){this.value=n.substring(0,i)+`
`+n.substring(o),this.selectionStart=this.selectionEnd=i+1;return}let s=`
`+l;this.value=n.substring(0,a)+s+n.substring(o),this.selectionStart=this.selectionEnd=a+s.length}else if(t.key==="Tab")t.preventDefault(),t.shiftKey?r.startsWith("  ")&&(this.value=n.substring(0,i)+r.substring(2)+n.substring(a),this.selectionStart=this.selectionEnd=a-2):(this.value=n.substring(0,i)+"  "+r+n.substring(a),this.selectionStart=this.selectionEnd=a+2);else if(t.key==="Backspace"&&a===o&&a>0){let l=n.substring(0,a);l.endsWith("\u2022 ")?(t.preventDefault(),this.value=l.substring(0,a-2)+n.substring(o),this.selectionStart=this.selectionEnd=a-2):l.endsWith("  ")&&r.trim().startsWith("\u2022")&&(t.preventDefault(),this.value=l.substring(0,a-2)+n.substring(o),this.selectionStart=this.selectionEnd=a-2)}}))}function na(e,t,a){t.innerHTML="";let o=Fe[e];if(!o)return;let n=aa(o);if(a.activeFields.forEach(r=>{if(["TAGS_IMPLEMENTED","SCREENSHOTS_LIST","CONSENTIU_GRAVACAO","CASO_PORTUGAL","label_substatus"].includes(r))return;let l=`field-${r}`,s=document.createElement("label"),b=g=>Xe[a.currentLang]?.[g]||Xe.pt?.[g]||g;s.textContent=b(r.toLowerCase())!==r.toLowerCase()?b(r.toLowerCase()):r.replace(/_/g," ").replace(/\b\w/g,g=>g.toUpperCase())+":",Object.assign(s.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px",fontWeight:"700",color:j.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let p=n.includes(r),h=document.createElement("span");if(h.textContent=s.textContent,p){let g=document.createElement("span");g.textContent=" *",g.style.color=j.error,h.appendChild(g)}if(s.innerHTML="",s.appendChild(h),r==="SPEAKEASY_ID"){let g=document.createElement("button");g.innerHTML=b("auto_busca"),g.style.cssText=`font-size: 11px; font-weight: 700; color: ${j.primary}; background-color: ${j.primaryBg}; border: none; border-radius: ${Le.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${xe};`,g.onmouseenter=()=>g.style.backgroundColor="#d2e3fc",g.onmouseleave=()=>g.style.backgroundColor=j.primaryBg,g.onclick=I=>{I.preventDefault(),v.playClick(),Sa(l)},s.appendChild(g)}if(!p){let g=document.createElement("button");g.innerHTML="\u2715",g.style.cssText=`font-size: 14px; background: ${j.bgInput}; border: none; color: ${j.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${xe};`,g.onmouseenter=()=>{g.style.background=j.error,g.style.color=j.surface},g.onmouseleave=()=>{g.style.background=j.bgInput,g.style.color=j.textSub},g.onclick=async I=>{I.preventDefault(),v.playClick();let x=h.textContent.replace(/:\s*$/,"").trim();await Me(b("remover_campo_confirm").replace("{campo}",x),{danger:!0,confirmText:b("remover")})&&(a.removeField(r),na(e,t,a))},s.appendChild(g)}let m;$t.includes(r)?(m=document.createElement("textarea"),m.classList.add("bullet-textarea","cw-textarea"),m.placeholder=b("utilize_marcadores"),wn(m)):wa.includes(r)?(m=document.createElement("textarea"),m.classList.add("cw-textarea"),m.placeholder=b("descreva_consideracoes")):(m=document.createElement("input"),m.type="text",m.classList.add("cw-input")),m.id=l,m.value=a.formData[l]||"",m.addEventListener("input",g=>a.updateField(l,g.target.value)),t.appendChild(s),t.appendChild(m)}),a.activeFields.includes("CONSENTIU_GRAVACAO")){let r=b=>Xe[a.currentLang]?.[b]||Xe.pt?.[b]||b,l=document.createElement("label");l.textContent=r("consentiu_gravacao"),Object.assign(l.style,{display:"block",fontSize:"13px",fontWeight:"700",color:j.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let s=document.createElement("select");s.className="cw-select",s.innerHTML=`
            <option value="false">${r("nao")}</option>
            <option value="true">${r("sim")}</option>
        `,s.value=a.consent?"true":"false",s.onchange=()=>a.setConsent(s.value==="true"),t.appendChild(l),t.appendChild(s)}let i=(o.templateFields||[]).filter(r=>!n.includes(r)&&!a.activeFields.includes(r));if(i.length>0){let r=s=>Xe[a.currentLang]?.[s]||Xe.pt?.[s]||s,l=document.createElement("div");Object.assign(l.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginTop:"24px"}),i.forEach(s=>{let b=r(s.toLowerCase())!==s.toLowerCase()?r(s.toLowerCase()):s.replace(/_/g," ").replace(/\b\w/g,h=>h.toUpperCase())+":",p=document.createElement("button");p.type="button",p.textContent=`+ ${b.replace(/:$/,"")}`,p.style.cssText=`font-size: 12px; font-weight: 600; color: ${j.primary}; background-color: ${j.primaryBg}; border: none; border-radius: ${Le.pill}; padding: 6px 14px; cursor: pointer; transition: all 0.2s ${xe};`,p.onmouseenter=()=>p.style.backgroundColor="#d2e3fc",p.onmouseleave=()=>p.style.backgroundColor=j.primaryBg,p.onclick=h=>{h.preventDefault(),v.playClick(),a.addFieldAt(s,a.activeFields.length),na(e,t,a)},l.appendChild(p)}),t.appendChild(l)}}function as(e){let t=String(e.label||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");return`cw-${String(e.key||"").toLowerCase()}-${t}`}function os(e){let t;try{t=JSON.parse(e||"{}")}catch{return null}let a=t.fields||{};return Object.keys(a).length?{fields:a,linkedTask:t.linkedTask,activeTasks:t.activeTasks}:null}function Sn(e){if(!Array.isArray(e)||!e.length)return!1;let t={},a={},o=e.slice().sort((n,i)=>(n.sortOrder||0)-(i.sortOrder||0));for(let n of o){if(!n.key)continue;let i=os(n.value);if(!i)continue;let r=as(n);if(String(n.lang).toUpperCase()==="ES"){a[r]={...i.fields};continue}t[r]={type:(n.field||"all").toLowerCase(),substatus:[n.key],...i.fields,...i.linkedTask?{linkedTask:i.linkedTask}:{},...i.activeTasks?{activeTasks:i.activeTasks}:{}}}if(!Object.keys(t).length)return!1;for(let n of Object.keys(dt))delete dt[n];Object.assign(dt,t);for(let n of Object.keys(oa))delete oa[n];return Object.assign(oa,a),!0}async function En(){let e=me.getCachedContent("note_template"),t=Sn(e);try{let a=await me.fetchContentModule("note_template");t=Sn(a)||t}catch(a){console.warn("Modelos de nota indispon\xEDveis; usando os embutidos.",a)}return t}function to(e,t,a,o=null){let n=e.currentSubStatus;if(!n)return null;let i=Fe[n],r=Xe[e.currentLang]||Xe.pt,l=p=>r[p]||Xe.pt?.[p]||p,s='style="margin-bottom: 12px; padding-left: 30px;"',b="";if(e.activeFields.forEach(p=>{let h=l(p.toLowerCase()),m="N/A";if(p==="label_substatus")h=l("label_substatus"),m=i.name;else if(p==="TAGS_IMPLEMENTED"){h=l("tags_implemented");let g=[];t.getCheckedElements().forEach(x=>{let y=x.value,z=at[y],A=x.count||1,$=y==="ads_conversion_tracking"||y==="ads_enhanced_conversions";e.tagSupportUsed&&$&&!e.forcedScreenshots.has(y)?g.push(`${z.name} - ${l("ts_output_disclaimer")}`):g.push(A>1?`${z.name} (x${A})`:z.name)}),m=g.join(", ")||"N/A"}else if(p==="SCREENSHOTS_LIST"){h=l("screenshots_list");let g="",I=t.screenshotsElement;I&&Array.from(I.querySelectorAll('input[id^="name-"]')).forEach(y=>{let z=y.value,A=y.closest(".cw-screen-card");if(A){let $=A.querySelectorAll('input[id^="screen-"]'),f=!1,C="";$.forEach(P=>{let E=P.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"Evid\xEAncia",N=P.value.trim();N&&(C+=`<li>${E} - ${N}</li>`,f=!0)}),f&&(g+=`<div style="margin-bottom: 8px;"><b>${z}</b><ul ${s}>${C}</ul></div>`)}}),m=g||"N/A"}else if(p==="CASO_PORTUGAL")h=l("caso_portugal"),m=l("sim");else if(p==="CONSENTIU_GRAVACAO")h=l("consentiu_gravacao"),m=e.consent?l("sim"):l("nao");else{let g=`field-${p}`,I=e.formData[g],x=fn(i,p,e.currentLang),y=x?x+" ":"";if(I&&I.trim()!==""&&I.trim()!=="\u2022"){let z=I.trim();if($t.includes(p)){let A=z.split(`
`).map($=>$.trim()).filter($=>$!==""&&$!=="\u2022").map($=>$.startsWith("\u2022 ")?$.substring(2):$).map($=>`<li>${$}</li>`).join("");m=A?`${y}<ul ${s}>${A}</ul>`:"N/A"}else wa.includes(p)?m=y+z.split(`
`).filter(A=>A.trim()!=="").map(A=>`<p style="margin: 0 0 8px 0;">${A}</p>`).join(""):m=y+z}else y&&(m=y.trim())}b+=`<b>${h}</b><br>${m}<br><br>`}),o){let p="";o.l1&&(p+=`<li>${l("ligacao_1")}: ${o.l1}</li>`),o.l2&&(p+=`<li>${l("ligacao_2")}: ${o.l2}</li>`),o.msg&&(p+=`<li>${l("mensagem_am")}: ${o.msg}</li>`),p&&(b+=`<b>${l("evidencias_contato")}</b><br><ul ${s}>${p}</ul><br>`)}if(i.customFooter&&(b+=`${i.customFooter}<br><br>`),a?.getOutput){let p=a.getOutput();p&&(b+=`${p}<br><br>`)}return b+="<i>Nota criada atrav\xE9s do Cases Wizard.</i>",b.replace(/(<br>\s*){3,}/g,"<br><br>").trim()}var An={pt:"Passe o mouse sobre um cen\xE1rio para visualizar o texto...",es:"Pasa el mouse sobre un escenario para ver el texto..."};function Cn(){return An[ce()]||An.pt}function kn(e){let t=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,a=document.createElement("div");a.className="cw-step-scenarios";let o=document.createElement("div");Object.assign(o.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let n=document.createElement("div");Object.assign(n.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"44px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"});let i=document.createElement("span");i.style.transition="opacity 0.05s ease, transform 0.05s ease",i.textContent=Cn(),n.appendChild(i);let r=new Set,l=null;return a.render=(s,b)=>{r.clear();let p=va(s,b);o.innerHTML="",p.forEach(([h,m])=>{let g=document.createElement("div");g.textContent=ya(h,s),g.dataset.id=h,g.dataset.sound="hover",Object.assign(g.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"});let I=xa(m,ce(),h),x=I["field-REASON_COMMENTS"]||I["field-CONTEXTO_CALL"]||h;g.onmouseenter=()=>{l&&clearTimeout(l),r.has(h)||(g.style.background="#f1f3f4"),i.style.opacity="0",t||(i.style.transform="translateY(5px)"),l=setTimeout(()=>{i.textContent=x.substring(0,120)+(x.length>120?"...":""),i.style.opacity="1",t||(i.style.transform="translateY(0)")},50)},g.onmouseleave=()=>{l&&clearTimeout(l),r.has(h)||(g.style.background="#ffffff"),l=setTimeout(()=>{r.size===0&&(i.style.opacity="0",setTimeout(()=>{i.textContent=Cn(),i.style.opacity="1"},50))},100)},g.onclick=()=>{v.playClick();let y=!r.has(h);y?(r.add(h),g.style.background="#e8f0fe",g.style.borderColor="#1a73e8",g.style.color="#1967d2"):(r.delete(h),g.style.background="#ffffff",g.style.borderColor="#dadce0",g.style.color="#3c4043"),e(h,y)},o.appendChild(g)}),p.length===0?a.style.display="none":a.style.display="block"},a.getSelectedIds=()=>[...r],a.appendChild(o),a.appendChild(n),a}function ns(e){return e==="ads_conversion_tracking"||e==="ads_enhanced_conversions"}function ao(e,t){return t.tagSupportUsed&&ns(e)&&!t.forcedScreenshots.has(e)}var fe={bg:j.bgInput,white:j.surface,border:j.border,textMain:j.text,textSub:j.textSub,blue:j.blue,blueLight:j.primaryBg,brands:{ads:{id:"ads",label:"Google Ads",color:j.blue,bg:j.primaryBg,icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:j.yellow,bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:j.primary,bg:j.primaryBg,icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:j.green,bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Lt={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Tn(e,t,a){let o={};a&&a.subscribe(()=>{C(),P()});function n(q){let E=q.toLowerCase();return E.includes("ads")||E.includes("conversion")||E.includes("remarketing")?fe.brands.ads:E.includes("ga4")||E.includes("analytics")?fe.brands.ga4:E.includes("gtm")||E.includes("tag manager")||E.includes("container")?fe.brands.gtm:E.includes("merchant")||E.includes("shopping")||E.includes("feed")?fe.brands.gmc:fe.brands.default}let i=Object.entries(at).filter(([q,E])=>E.popular),r={};Object.entries(at).forEach(([q,E])=>{if(E.popular)return;let N=n(E.name);r[N.label]||(r[N.label]={brand:N,tasks:[]}),r[N.label].tasks.push({key:q,...E})});let l="cw-zen-tasks";if(!document.getElementById(l)){let q=document.createElement("style");q.id=l,q.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column;
                font-family: ${fe.font}; background: ${fe.bg}; position: relative; overflow: visible;
                border-radius: 12px; border: 1px solid ${fe.border};
            }
            
            /* SCROLL AREA */
            .cw-zen-content { padding-bottom: 20px; }

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${fe.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${fe.white}; 
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
                font-size: 12px; font-weight: 500; color: ${fe.textMain}; line-height: 1.2; 
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
                color: ${fe.textMain}; display: flex; align-items: center; justify-content: center;
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
                border: 1px solid ${fe.border}; border-radius: 10px; background: ${fe.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${fe.blue}; box-shadow: 0 0 0 3px ${fe.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${fe.border}; border-radius: 10px; background: ${fe.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${fe.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${fe.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${fe.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${fe.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item:focus-visible, .cw-acc-header:focus-visible { outline: 2px solid ${fe.blue}; outline-offset: -2px; }
            .cw-task-item.selected { background: ${fe.blueLight}; }
            .cw-task-item.ts-success { background: #F0FDF4 !important; border-left: 4px solid #22C55E; }
            .cw-task-item.ts-success .cw-task-label { color: #166534 !important; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${fe.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${fe.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS (Lista: quadrado) */
            .cw-step-btn-list {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${fe.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn-list:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${fe.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: sticky; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${fe.border};
                border-bottom-left-radius: 11px;
                border-bottom-right-radius: 11px;
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                visibility: hidden;
                box-shadow: ${fe.shadowFloat}; z-index: 10;
                margin-top: auto;
            }
            /* .cw-zen-container usa overflow:visible (pros cards do hero n\xE3o
               cortarem sombra/hover), ent\xE3o sem visibility a barra "escondida"
               via transform continua sendo pintada logo abaixo do card,
               encostando/sobrepondo o que vem depois no layout. */
            .cw-status-bar.visible { transform: translateY(0); visibility: visible; }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${fe.textMain}; }
            
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
                font-family: ${fe.font}; font-size: 15px; font-weight: 600; color: ${fe.textMain};
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
                border-color: ${fe.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${fe.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${fe.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${fe.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 11px; font-weight: 700; color: ${fe.textSub};
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
        `,document.head.appendChild(q)}let s=document.createElement("div");s.className="cw-zen-container";let b=document.createElement("div");Object.assign(b.style,{display:"none"});let p=document.createElement("div");p.className="cw-screens-container",b.appendChild(p),s.innerHTML=`
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
    `;let h=s.querySelector(".cw-hero-grid"),m=s.querySelector(".cw-acc-container"),g=s.querySelector(".cw-results-container"),I=s.querySelector(".cw-search-input");ua(s,".cw-acc-header, .cw-task-item");let x=s.querySelector(".cw-status-bar"),y=s.querySelector(".cw-status-text"),z=s.querySelector(".cw-footer-icons");function A(q,E){return N=>{if(N.target.closest(".cw-step-btn-hero, .cw-step-btn-list"))return;let k=o[q]?o[q].count:0;f(q,k>0?-k:1,E)}}i.forEach(([q,E])=>{let N=n(E.name),k=document.createElement("div");k.className="cw-hero-card",k.id=`hero-${q}`,k.style.setProperty("--hero-color",N.color),k.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Lt[N.icon]}</div>
                <div class="cw-hero-label">${E.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn-hero minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn-hero plus">+</div>
            </div>
        `,k.onclick=A(q,E),k.querySelector(".minus").onclick=()=>f(q,-1,E),k.querySelector(".plus").onclick=()=>f(q,1,E),k.tabIndex=0,k.setAttribute("role","button"),k.setAttribute("aria-pressed","false"),k.addEventListener("keydown",F=>{(F.key==="Enter"||F.key===" ")&&(F.preventDefault(),k.click())}),k.dataset.color=N.color,h.appendChild(k)});function $(q,E){let N=n(E.name),k=document.createElement("div");return k.className="cw-task-item",k.dataset.id=q,k.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${N.bg}; color:${N.color}">
                    ${Lt[N.icon]||Lt.default}
                </div>
                <div class="cw-task-label">${E.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn-list minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn-list plus">+</div>
            </div>
        `,k.onclick=A(q,E),k.querySelector(".minus").onclick=()=>f(q,-1,E),k.querySelector(".plus").onclick=()=>f(q,1,E),k.tabIndex=0,k.setAttribute("role","button"),k.setAttribute("aria-pressed","false"),k.setAttribute("aria-label",E.name),k.addEventListener("keydown",F=>{(F.key==="Enter"||F.key===" ")&&(F.preventDefault(),k.click())}),k}Object.entries(r).forEach(([q,E])=>{let N=document.createElement("div");N.className="cw-acc-group";let k=document.createElement("div");k.className="cw-acc-header",k.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${E.brand.color}"></div>
                ${q}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,k.tabIndex=0,k.setAttribute("role","button"),k.setAttribute("aria-expanded","false"),k.onclick=()=>{m.querySelectorAll(".cw-acc-group.open").forEach(R=>{R!==N&&(R.classList.remove("open"),R.querySelector(".cw-acc-header")?.setAttribute("aria-expanded","false"))});let H=N.classList.toggle("open");k.setAttribute("aria-expanded",String(H))},k.addEventListener("keydown",H=>{(H.key==="Enter"||H.key===" ")&&(H.preventDefault(),k.click())});let F=document.createElement("div");F.className="cw-acc-body",E.tasks.forEach(H=>{let R=$(H.key,H);F.appendChild(R)}),N.appendChild(k),N.appendChild(F),m.appendChild(N)});function f(q,E,N){o[q]||(o[q]={count:0,data:N,brand:n(N.name)}),o[q].count+=E,o[q].count<=0&&delete o[q],C(),P(),e&&e()}function C(){i.forEach(([F])=>{let H=h.querySelector(`#hero-${F}`);if(!H)return;let R=o[F];R?(H.classList.add("active"),H.setAttribute("aria-pressed","true"),H.querySelector(".cw-step-val").textContent=R.count,H.querySelector(".cw-step-val").style.color=H.dataset.color,H.classList.toggle("ts-success",ao(F,a))):(H.classList.remove("active"),H.setAttribute("aria-pressed","false"),H.classList.remove("ts-success"))}),s.querySelectorAll(".cw-task-item").forEach(F=>{let H=F.dataset.id,R=o[H];R?(F.classList.add("selected"),F.setAttribute("aria-pressed","true"),F.querySelector(".cw-step-val").textContent=R.count,F.classList.toggle("ts-success",ao(H,a))):(F.classList.remove("selected"),F.setAttribute("aria-pressed","false"),F.classList.remove("ts-success"))});let E=Object.keys(o),N=0,k=[];if(E.forEach(F=>{let H=o[F];N+=H.count;for(let R=0;R<H.count;R++)k.length<6&&k.push(H.brand)}),N>0){x.classList.add("visible");let F=N>1?t("acoes_plural"):t("acao_singular"),H=N>1?t("definidas_plural"):t("definida_singular");y.textContent=`${N} ${F} ${H}`,z.innerHTML="",k.forEach(R=>{let Q=document.createElement("div");Q.className="cw-mini-icon-status",Q.innerHTML=Lt[R.icon]||Lt.default;let le=Q.querySelector("svg");le&&(le.style.width="14px",le.style.height="14px"),z.appendChild(Q)})}else x.classList.remove("visible"),y.textContent="",z.innerHTML=""}I.addEventListener("input",q=>{let E=q.target.value.toLowerCase();if(E.length>0){m.style.display="none",g.style.display="block",g.innerHTML="";let N=!1;Object.entries(at).forEach(([k,F])=>{if(F.name.toLowerCase().includes(E)){N=!0;let H=$(k,F);o[k]&&(H.classList.add("selected"),H.setAttribute("aria-pressed","true"),H.querySelector(".cw-step-val").textContent=o[k].count),g.appendChild(H)}}),N||(g.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else m.style.display="block",g.style.display="none"});function P(){let q={};p.querySelectorAll(".cw-input-field").forEach(F=>{q[F.id]=F.value}),p.innerHTML="";let E=Object.keys(o),N=!1;if(E.length===0){p.appendChild(Wt({icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg>',title:t("selecione_tarefas")})),b.style.display="none";return}let k=document.createElement("div");k.className="cw-info-banner",k.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.
            </span>
        `,p.appendChild(k),E.forEach(F=>{let H=o[F].data,R=o[F].count,Q=o[F].brand,le=ao(F,a),de=a.screenshotMode||"implementation",W=bn(H,de,a.currentLang);if(W.length>0||le){N=!0;for(let oe=1;oe<=R;oe++){let U=document.createElement("div");U.className="cw-screen-card",le&&U.classList.add("ts-success"),U.style.setProperty("--brand-color",Q.color),U.style.setProperty("--brand-bg",Q.bg),U.style.setProperty("--brand-shadow",Q.color+"40");let re=document.createElement("div");re.className="cw-card-header";let B=document.createElement("div");B.className="cw-card-icon",B.innerHTML=Lt[Q.icon]||Lt.default;let Z=document.createElement("div");Z.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let ne=document.createElement("input");ne.className="cw-card-title-input",ne.id=`name-${F}-${oe}`,ne.value=`${H.name}${R>1?" #"+oe:""}`,ne.title=t("renomear_tooltip");let V=document.createElement("span");if(V.className="cw-edit-hint",V.innerHTML=t("renomear_hint"),Z.appendChild(ne),Z.appendChild(V),re.appendChild(B),re.appendChild(Z),U.appendChild(re),le){let ie=document.createElement("div");ie.className="cw-ts-disclaimer-box",ie.innerHTML=`
                <span>${t("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${t("incluir_mesmo_assim")}</button>
            `,ie.querySelector("button").onclick=()=>{a.toggleForcedScreenshot(F,!0)},U.appendChild(ie)}else W.forEach((ie,_)=>{let G=document.createElement("div");G.className="cw-input-group";let K=document.createElement("label");K.className="cw-input-label",K.textContent=ie;let O=document.createElement("input");O.className="cw-input-field",O.id=`screen-${F}-${oe}-${_}`,O.placeholder=t("cole_link_placeholder"),O.setAttribute("autocomplete","off"),q[O.id]&&(O.value=q[O.id],O.value.trim().length>5&&O.classList.add("filled")),O.addEventListener("input",()=>{O.value.trim().length>5?O.classList.add("filled"):O.classList.remove("filled")});let c=document.createElement("div");c.className="cw-input-check",c.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',G.appendChild(K),G.appendChild(O),G.appendChild(c),U.appendChild(G)});p.appendChild(U)}}}),b.style.display=N?"block":"none"}return{selectionElement:s,screenshotsElement:b,updateSubStatus:()=>P(),getCheckedElements:()=>Object.keys(o).map(q=>({value:q,count:o[q].count})),setTaskCount:(q,E)=>{o[q]&&delete o[q],E>0&&at[q]&&f(q,E,at[q])},toggleTask:(q,E=!0)=>{let N=o[q];E&&!N?f(q,1,at[q]):!E&&N&&f(q,-N.count,at[q])},setLanguage:q=>{t=q;let E=s.querySelector(".js-hero-title");E&&(E.textContent=t("acesso_rapido"));let N=s.querySelector(".cw-search-input");N&&(N.placeholder=t("buscar_catalogo")),P(),C()},reset:()=>{for(let q in o)delete o[q];I.value="",m.style.display="block",g.style.display="none",C(),P()}}}var is={marginTop:"24px",marginBottom:"16px",padding:"20px",background:"#fff9e6",borderRadius:"20px",border:"1.5px solid #fbbc0540",display:"none",boxShadow:"0 4px 12px rgba(251, 188, 5, 0.05)"},rs={fontSize:"12px",color:"#b06000",marginTop:"8px",lineHeight:"1.4"},ss={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #dadce0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",background:"#fff"},ls={display:"flex",gap:"20px",marginBottom:"12px"};function qn(e){let t=document.createElement("div");t.id="tag-support-container",Object.assign(t.style,is);let a=document.createElement("label");a.className="js-ts-main-label",a.textContent=e("utilizou_tag_support"),Object.assign(a.style,Ja,{marginTop:"0"});let o=document.createElement("div");Object.assign(o.style,ls);let n=document.createElement("input");n.type="radio",n.name="ts_usage_mod",n.value="Sim",Object.assign(n.style,eo);let i=document.createElement("label");i.className="js-ts-sim-label",i.textContent=e("sim");let r=document.createElement("div");Object.assign(r.style,{display:"flex",alignItems:"center"}),r.appendChild(n),r.appendChild(i);let l=document.createElement("input");l.type="radio",l.name="ts_usage_mod",l.value="N\xE3o",l.checked=!0,Object.assign(l.style,eo);let s=document.createElement("label");s.className="js-ts-nao-label",s.textContent=e("nao");let b=document.createElement("div");Object.assign(b.style,{display:"flex",alignItems:"center"}),b.appendChild(l),b.appendChild(s),o.appendChild(r),o.appendChild(b);let p=document.createElement("div");p.style.display="block";let h=document.createElement("label");h.className="js-ts-reason-label",h.textContent=e("motivo_ts"),Object.assign(h.style,Ja,{fontSize:"12px"});let m=document.createElement("input");m.type="text",Object.assign(m.style,ss);let g=document.createElement("div");g.className="js-ts-warning",g.innerHTML=`\u26A0\uFE0F <strong>${e("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" rel="noopener noreferrer" style="color:#e37400; text-decoration:underline;">${e("link_aqui")}</a>`,Object.assign(g.style,rs),p.appendChild(h),p.appendChild(m),p.appendChild(g),t.appendChild(a),t.appendChild(o),t.appendChild(p),n.onchange=()=>{v.playClick(),p.style.display="none",X.setTagSupportUsed(!0)},l.onchange=()=>{v.playClick(),p.style.display="block",X.setTagSupportUsed(!1)};function I(A,$){if(t.style.display="none",!A||!$||$.length===0)return;$.some(C=>C==="ads_conversion_tracking"||C==="ads_enhanced_conversions")?t.style.display="block":(z(),X.setTagSupportUsed(!1))}function x(){if(t.style.display==="none")return"";let A=`<br><b>${e("tag_support_output_label")}</b> ${n.checked?`\u2705 ${e("sim")}`:`\u274C ${e("nao")}`}`;return l.checked&&m.value.trim()!==""&&(A+=`<br><b>${e("motivo_output_label")}</b> ${m.value}`),A+="<br>",A}function y(A){e=A,a.textContent=e("utilizou_tag_support"),h.textContent=e("motivo_ts"),i.textContent=e("sim"),s.textContent=e("nao"),g.innerHTML=`\u26A0\uFE0F <strong>${e("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" rel="noopener noreferrer" style="color:#b06000; text-decoration:underline;">${e("link_aqui")}</a>`}function z(){t.style.display="none",l.checked=!0,n.checked=!1,p.style.display="block",m.value=""}return{element:t,updateVisibility:I,getOutput:x,setLanguage:y,reset:z}}var oo="cw_notes_parking_lot",Ea="cw_notes_emergency_save";var Ue={getAll:()=>{try{return JSON.parse(localStorage.getItem(oo)||"[]")}catch{return[]}},save:e=>{let t=Ue.getAll(),a={id:Date.now().toString(),timestamp:new Date().toISOString(),...e};return t.unshift(a),t.length>5&&t.pop(),localStorage.setItem(oo,JSON.stringify(t)),a},delete:e=>{let t=Ue.getAll();return t=t.filter(a=>a.id!==e),localStorage.setItem(oo,JSON.stringify(t)),t},getCount:()=>Ue.getAll().length,saveEmergency:e=>{let t={timestamp:Date.now(),data:e};localStorage.setItem(Ea,JSON.stringify(t))},getEmergency:()=>{try{let e=localStorage.getItem(Ea);if(!e)return null;let t=JSON.parse(e);return Date.now()-t.timestamp>432e5?(localStorage.removeItem(Ea),null):!t.data||!t.data.subStatus?null:t.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(Ea)}};var Nn="cw_case_streak_v1",cs=[5,10,15,20,25,30,40,50];function Ln(){let e=new Date;return`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`}function no(){try{let e=JSON.parse(localStorage.getItem(Nn)||"{}");return e.date===Ln()&&e.count||0}catch{return 0}}function In(){let e=no()+1;try{localStorage.setItem(Nn,JSON.stringify({date:Ln(),count:e}))}catch{}return{count:e,isMilestone:cs.includes(e)}}var _n={pt:{milestoneToast:e=>`\u{1F525} ${e} casos hoje!`,quickSearch:"Busca r\xE1pida: Ctrl/Cmd+K",casesToday:"Casos conclu\xEDdos hoje",drag:"Arrastar",cancel:"Cancelar",cancelledToast:"Cancelado!"},es:{milestoneToast:e=>`\u{1F525} \xA1${e} casos hoy!`,quickSearch:"B\xFAsqueda r\xE1pida: Ctrl/Cmd+K",casesToday:"Casos completados hoy",drag:"Arrastrar",cancel:"Cancelar",cancelledToast:"\xA1Cancelado!"}};function It(e){let t=ce();return _n[t]?.[e]??_n.pt[e]}var Se={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1",gray:"#9AA0A6"},io=50,ro=null;function Aa(e){let t=document.getElementById("cw-btn-notes");if(!t)return;let a=t.querySelector(".cw-dot-dirty");e?a||(a=document.createElement("div"),a.className="cw-dot-dirty",t.appendChild(a)):a&&a.remove()}function Fn(){let e=document.getElementById("cw-streak-badge"),t=document.getElementById("cw-streak-count");if(!e||!t)return;let a=no();t.textContent=a,e.classList.toggle("visible",a>0);let o=document.querySelector(".cw-pill");o&&(o.classList.toggle("has-streak",a>0),o.classList.toggle("streak-tier-2",a>=5&&a<15),o.classList.toggle("streak-tier-3",a>=15&&a<30),o.classList.toggle("streak-tier-4",a>=30))}function Mn(){let{count:e,isMilestone:t}=In();if(Fn(),t){let a=document.querySelector(".cw-pill");v.playSuccess(),a&&sn(a),J(It("milestoneToast")(e))}}function On(e,t){let a="cw-command-center-style";if(!document.getElementById(a)){let f=document.createElement("style");f.id=a,f.innerHTML=`
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
                
                background: ${Se.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${Se.glassBorder}; border-radius: 50px;
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
                width: ${io}px !important;
                height: ${io}px !important;
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
                cursor: pointer; position: relative; color: ${Se.iconIdle};
                flex-shrink: 0;
                transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn { transition: background 0.2s ease, color 0.2s ease !important; }
            }
            .cw-btn:hover {
                background: ${Se.glassHighlight};
                color: ${Se.iconActive};
                /* S\xF3 scale (cresce do centro), sem translateY: bot\xF5es redondos
                   colados lado a lado numa fileira \xFAnica - um lift vertical
                   \xE9 o caso cl\xE1ssico de flicker quando o mouse passa raspando
                   a borda entre dois \xEDcones adjacentes. */
                transform: scale(1.18) !important;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn:hover { transform: none !important; }
            }

            .cw-btn.notes.active { color: ${Se.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${Se.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${Se.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${Se.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.library.active { color: ${Se.pink} !important; background: rgba(244, 143, 177, 0.15); } /* [NOVO] */
            .cw-btn.broadcast.active { color: ${Se.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${Se.teal} !important; background: rgba(0, 191, 165, 0.15); }
            .cw-btn.configs.active { color: ${Se.gray} !important; background: rgba(154, 160, 166, 0.15); }
            .cw-btn.bauform.active { color: ${Se.blue} !important; background: rgba(66, 133, 244, 0.15); }

            .cw-btn.notes:hover { color: ${Se.blue}; filter: drop-shadow(0 0 8px rgba(138, 180, 248, 0.6)); }
            .cw-btn.email:hover { color: ${Se.red}; filter: drop-shadow(0 0 8px rgba(242, 139, 130, 0.6)); }
            .cw-btn.script:hover { color: ${Se.purple}; filter: drop-shadow(0 0 8px rgba(197, 138, 249, 0.6)); }
            .cw-btn.links:hover { color: ${Se.green}; filter: drop-shadow(0 0 8px rgba(129, 201, 149, 0.6)); }
            .cw-btn.library:hover { color: ${Se.pink}; filter: drop-shadow(0 0 8px rgba(244, 143, 177, 0.6)); }
            .cw-btn.broadcast:hover { color: ${Se.orange}; filter: drop-shadow(0 0 8px rgba(249, 171, 0, 0.6)); }
            .cw-btn.timezone:hover { color: ${Se.teal}; filter: drop-shadow(0 0 8px rgba(0, 191, 165, 0.6)); }
            .cw-btn.configs:hover { color: ${Se.gray}; filter: drop-shadow(0 0 8px rgba(154, 160, 166, 0.6)); }

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
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${Se.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            @media (prefers-reduced-motion: reduce) {
                .cw-grip:hover .cw-grip-bar { transform: none !important; }
            }
            .cw-pill.dragging .cw-grip-bar { background-color: ${Se.blue}; width: 16px; opacity: 1; }

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
                border: 1px solid ${Se.glassBorder};
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
            .cw-center-dots span:nth-child(1) { background-color: ${Se.blue}; animation-delay: -0.22s; }
            .cw-center-dots span:nth-child(2) { background-color: ${Se.red}; animation-delay: -0.11s; }
            .cw-center-dots span:nth-child(3) { background-color: ${Se.green}; }
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
                color: ${Se.green};
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
        `,document.head.appendChild(f)}function o(){let f=Ut();return f.isDev?`<div id="cw-env-tag" class="cw-env-badge" title="${`Ambiente de desenvolvimento \u2014 implanta\xE7\xE3o \u2026${f.fingerprint} (${f.endpoint})`}">Dev</div>`:""}let n={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg class="cw-logo-base" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',mainSpark:'<svg class="cw-logo-spark" viewBox="0 0 24 24"><defs><linearGradient id="cw-spark-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4285F4"/><stop offset="33%" stop-color="#EA4335"/><stop offset="66%" stop-color="#FBBC05"/><stop offset="100%" stop-color="#34A853"/></linearGradient></defs><path fill="url(#cw-spark-grad)" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',configs:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>'},i=document.createElement("div");i.id="cw-floating-trigger",i.className="cw-pill side-right collapsed"+(Ut().isDev?" cw-env-dev":""),i.innerHTML=`
        <div id="cw-command-center" style="display:none;"></div>
        <div class="cw-main-logo js-cc-quicksearch" title="${It("quickSearch")}">${n.main}${n.mainSpark}</div>
        <div id="cw-admin-tag" class="cw-admin-badge">Admin</div>
        ${o()}
        <div id="cw-streak-badge" class="cw-streak-badge js-cc-casestoday" title="${It("casesToday")}">\u{1F525} <span id="cw-streak-count">0</span></div>

        <div class="cw-grip js-cc-drag" title="${It("drag")}">
            <div class="cw-grip-bar"></div>
        </div>
        <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${n.notes}</button>
        <button class="cw-btn bauform" id="cw-btn-bauform" data-label="BAU Form">${n.bauform}</button>
        <button class="cw-btn email" id="cw-btn-email" data-label="Email Assistant">${n.email}</button>
        <button class="cw-btn script" id="cw-btn-script" data-label="Call Script">${n.script}</button>
        <button class="cw-btn links" id="cw-btn-links" data-label="Links">${n.links}</button>
        <button class="cw-btn library" id="cw-btn-library" data-label="My Library">${n.library}</button>
        <button class="cw-btn timezone" id="cw-btn-timezone" data-label="Time Zones">${n.timezone}</button>
        <button class="cw-btn configs" id="cw-btn-configs" data-label="Configura\xE7\xF5es">${n.configs}</button>
        <div class="cw-sep"></div>
        <button class="cw-btn broadcast" id="cw-btn-broadcast" data-label="Avisos">${n.broadcast}</button>
        <div class="cw-status-container">
            <div class="cw-dots" id="cw-loader"><span></span><span></span><span></span></div>
            <div class="cw-check" id="cw-success" style="display:none;">${n.check}</div>
        </div>
    `;let r=document.createElement("div");r.className="cw-focus-backdrop",document.body.appendChild(r),document.body.appendChild(i),Fn(),Ee(()=>{let f=i.querySelector(".js-cc-quicksearch");f&&(f.title=It("quickSearch"));let C=i.querySelector(".js-cc-casestoday");C&&(C.title=It("casesToday"));let P=i.querySelector(".js-cc-drag");P&&(P.title=It("drag"))});let l=f=>{v.playClick(),f()};if(i.querySelector(".notes").onclick=f=>{f.stopPropagation(),l(e.toggleNotes)},i.querySelector(".bauform").onclick=f=>{f.stopPropagation(),l(e.toggleBAUForm)},i.querySelector(".email").onclick=f=>{f.stopPropagation(),l(e.toggleEmail)},i.querySelector(".script").onclick=f=>{f.stopPropagation(),l(e.toggleScript)},i.querySelector(".links").onclick=f=>{f.stopPropagation(),l(e.toggleLinks)},i.querySelector(".library").onclick=f=>{f.stopPropagation(),l(e.toggleLibrary)},i.querySelector(".timezone").onclick=f=>{f.stopPropagation(),l(e.toggleTimezone)},i.querySelector(".configs").onclick=f=>{f.stopPropagation(),l(e.toggleConfigs)},i.querySelector(".broadcast").onclick=f=>{f.stopPropagation(),l(()=>{let C=f.currentTarget.querySelector(".cw-badge");C&&C.remove(),e.broadcastControl&&e.broadcastControl.toggle()})},i.querySelectorAll(".cw-btn").forEach(f=>{f.addEventListener("mouseenter",()=>v.playHover())}),e.broadcastControl&&e.broadcastControl.hasUnread){let f=document.createElement("div");f.className="cw-badge",i.querySelector(".broadcast").appendChild(f)}let s=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function b(){if(s()){i.classList.remove("collapsed"),v.playGenieOpen();return}let f=i.getBoundingClientRect(),C=window.innerHeight,P=f.top>C/2,q=f.height;i.style.setProperty("transition","none","important"),i.classList.remove("collapsed");let E=i.scrollHeight;if(i.classList.add("collapsed"),i.style.height=`${q}px`,P){let N=C-f.bottom;i.style.top="auto",i.style.bottom=`${N}px`}else i.style.bottom="auto",i.style.top=`${f.top}px`;i.style.overflow="hidden",i.offsetWidth,i.style.removeProperty("transition"),i.classList.remove("collapsed"),i.style.height=`${E}px`,v.playGenieOpen(),setTimeout(()=>{i.style.height="",i.style.overflow=""},350)}function p(f=!0){if(i.classList.contains("collapsed"))return;if(s()){i.classList.add("collapsed"),f&&v.playSwoosh();return}let C=i.getBoundingClientRect().height;i.style.setProperty("transition","none","important"),i.style.height=`${C}px`,i.offsetWidth,i.style.removeProperty("transition"),i.classList.add("collapsed"),i.style.height=`${io}px`,f&&v.playSwoosh(),setTimeout(()=>{i.style.height=""},700)}ro=p;let h=null;i.onmouseleave=()=>{document.querySelector(".cw-processing-card")||(h=setTimeout(()=>{i.querySelector(".cw-btn.active")||p()},3e3))},i.onmouseenter=()=>{h&&clearTimeout(h)},(async function(){let C=()=>{let P=Ne();if(P){let q=P.split("@")[0].toLowerCase();if(en.includes(q)){let E=i.querySelector("#cw-admin-tag");E&&E.classList.add("visible")}}else setTimeout(C,2e3)};if(C(),t&&typeof t.then=="function"){try{await t}catch{}await pe(150)}else await pe(2800);i.classList.add("arriving"),v.playReady(),i.querySelectorAll(".cw-sep").forEach(P=>P.classList.add("visible"))})();let m=!1,g,I,x,y,z=3;i.onmousedown=f=>{if(f.target.closest("button"))return;f.preventDefault(),g=f.clientX,I=f.clientY;let C=i.getBoundingClientRect();x=C.left,y=C.top,document.addEventListener("mousemove",A),document.addEventListener("mouseup",$)};function A(f){let C=f.clientX-g,P=f.clientY-I;!m&&Math.sqrt(C*C+P*P)>z&&(m=!0,i.classList.add("dragging"),i.style.transition="none",h&&clearTimeout(h)),m&&(i.style.left=`${x+C}px`,i.style.top=`${y+P}px`,i.style.right="auto",i.style.bottom="auto",i.style.transform="none")}function $(f){if(document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",$),m){m=!1,i.classList.remove("dragging");let C=window.innerWidth,P=window.innerHeight,q=i.getBoundingClientRect(),E=q.left+q.width/2,N;E<C/2?(N=24,i.classList.remove("side-right"),i.classList.add("side-left")):(N=C-q.width-24,i.classList.remove("side-left"),i.classList.add("side-right"));let k=Tt(q.top,24,P-q.height-24);setTimeout(()=>{i.style.setProperty("transition","left 0.3s cubic-bezier(0.4, 0, 0.2, 1), top 0.3s cubic-bezier(0.4, 0, 0.2, 1)","important"),i.style.left=`${N}px`,i.style.top=`${k}px`,i.style.bottom="auto",i.style.transform=""},10),setTimeout(()=>{i.style.transition="",i.style.removeProperty("transition")},700)}else{let C=i.querySelector(".cw-btn.active"),P=f.target.closest("button");i.classList.contains("collapsed")?b():!C&&!P&&p(),P&&(P.style.transform="scale(0.9)",setTimeout(()=>P.style.transform="",150))}}}function ia(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop");window._CW_ABORT_PROCESS=!1;let a=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;e&&ro?ro(!1):e&&e.classList.add("collapsed"),e&&e.classList.add("cw-busy");let o=document.createElement("div");o.className="cw-processing-card",o.innerHTML=`
      <div class="cw-center-slot">
        <div class="cw-center-dots"><span></span><span></span><span></span></div>
        <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
      </div>
      <div class="cw-center-text">${me.getRandomTip()}</div>
  `;let n=document.createElement("div");n.className="cw-abort-btn",n.textContent="Cancelar",n.onclick=s=>{s.stopPropagation(),window._CW_ABORT_PROCESS=!0,v.stopThinking(),J("Cancelado!",{duration:3e3}),l()},o.appendChild(n),document.body.appendChild(o),t&&t.classList.add("active"),requestAnimationFrame(()=>{requestAnimationFrame(()=>o.classList.add("visible"))}),v.startThinking();let i=Date.now(),r=!1;function l(){r||(r=!0,v.stopThinking(),t&&t.classList.remove("active"),e&&e.classList.remove("cw-busy"),o.classList.remove("visible"),setTimeout(()=>o.remove(),a?200:320))}return function(){if(window._CW_ABORT_PROCESS||r)return;let b=Math.max(0,2e3-(Date.now()-i));setTimeout(()=>{if(window._CW_ABORT_PROCESS||r)return;v.stopThinking();let p=o.querySelector(".cw-center-dots"),h=o.querySelector(".cw-center-success");p&&p.classList.add("hidden"),n.classList.add("hidden"),h&&h.classList.add("show"),setTimeout(()=>{h&&h.classList.remove("show"),setTimeout(l,200)},850)},b)}}function Dn(e){let{onSaveCurrent:t,onLoadDraft:a,t:o}=e,n=document.createElement("button");n.className="js-btn-park",n.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${o("guardar")}</span>
    `,n.style.cssText=`
        flex: 1 1 0;
        padding: 12px 0;
        margin-top: 24px;
        border-radius: ${Le.pill};
        font-size: 14px;
        font-weight: 700;
        background: ${j.surface};
        color: ${j.textSub};
        border: 1px solid ${j.border};
        cursor: pointer;
        display: flex; 
        align-items: center; 
        justify-content: center;
        gap: 8px;
        transition: background-color 0.2s ${xe}, border-color 0.2s ${xe}, color 0.2s ${xe}, box-shadow 0.2s ${xe}, transform 0.1s ${xe};
        box-shadow: ${gt.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `,n.onmouseenter=()=>{n.style.backgroundColor="#F8F9FA",n.style.borderColor="#202124",n.style.color="#202124",n.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)"},n.onmouseleave=()=>{n.style.backgroundColor="#FFFFFF",n.style.borderColor="#DADCE0",n.style.color="#5F6368",n.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)"},n.onmousedown=()=>n.style.transform="scale(0.96)",n.onmouseup=()=>n.style.transform="scale(1)",n.onclick=async()=>{if(await Me(o("confirmar_guardar_rascunho")))try{let y=await t();y?(Ue.save(y),I(),s(),v.playSuccess(),J(o("rascunho_salvo_sucesso"))):(v.playError(),J(o("erro_ler_dados"),{error:!0}))}catch(y){console.error("Erro ao salvar rascunho:",y),v.playError(),J(o("erro_ao_salvar"),{error:!0})}};let i=document.createElement("div");i.className="js-history-btn",i.title=o("meus_rascunhos"),i.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",i.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#9AA0A6"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let r=i.querySelector("svg"),l=document.createElement("div");l.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",i.appendChild(l),i.onmouseenter=()=>i.style.background="rgba(0,0,0,0.05)",i.onmouseleave=()=>i.style.background="transparent",i.onclick=x=>{x.stopPropagation(),g()};function s(){let x=Ue.getCount();Aa(x>0),r.style.color=x>0?j.primary:"#9AA0A6",x>0?(l.style.display="block",l.textContent=x,window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||l.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):l.style.display="none"}let b=document.createElement("div");b.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${j.surface}; z-index: 100;
        border-radius: ${Le.large} ${Le.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${xe};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;let p=document.createElement("div");p.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",p.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${o("rascunhos_salvos")}</span>`;let h=document.createElement("button");h.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',h.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",h.onmouseenter=()=>h.style.background="#F1F3F4",h.onmouseleave=()=>h.style.background="transparent",h.onclick=()=>g(!1),p.appendChild(h);let m=document.createElement("div");m.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",b.appendChild(p),b.appendChild(m);function g(x){let y=b.style.transform==="translateY(0%)";(x!==void 0?x:!y)?(I(),b.style.transform="translateY(0%)"):b.style.transform="translateY(110%)"}function I(){let x=Ue.getAll();if(m.innerHTML="",x.length===0){m.innerHTML=`
                <div style="text-align:center; padding:80px 20px; color:${j.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${o("nenhum_rascunho")}</div>
                </div>`;return}x.forEach(y=>{let z=document.createElement("div");z.style.cssText=`
                background: ${j.surface}; padding: 20px; border-radius: ${Le.large};
                border: 1.5px solid ${j.bgInput}; box-shadow: ${gt.subtle};
                position: relative;
            `;let $=new Date(y.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),f="";y.summaryTags&&y.summaryTags.length>0&&(f=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${y.summaryTags.slice(0,3).join(", ")+(y.summaryTags.length>3?"...":"")}</div>`),z.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${y.clientName||o("cliente_sem_nome")}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${$}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${y.cid||"---"}</span>
                    <span style="display:block; color:${y.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${y.subStatus||y.status||o("sem_status")}</span>
                    ${f}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3);">
                        ${o("retomar_caso")}
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center;" title="${o("descartar")}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let C=z.querySelector(".cw-resume-btn");C.onclick=async()=>{await Me(o("retomar_rascunho_confirm"))&&(a(y),Ue.delete(y.id),I(),s(),g(!1),v.playSwoosh(),J(o("rascunho_carregado")))};let P=z.querySelector(".cw-del-btn");P.onclick=async()=>{await Me(o("excluir_rascunho_confirm"),{danger:!0})&&(Ue.delete(y.id),I(),s())},m.appendChild(z)})}return s(),{parkButton:n,historyBtnWrapper:i,drawer:b}}function ra(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let a=document.createRange();a.selectNodeContents(t);let o=window.getSelection();o.removeAllRanges(),o.addRange(a);try{document.execCommand("copy")}catch{v.playError(),J(ce()==="es"?"Error al copiar":"Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(t)}function Ca(e){["input","change","keydown","keyup"].forEach(a=>{let o=new Event(a,{bubbles:!0,cancelable:!0});e.dispatchEvent(o)})}function zn(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function ka(){let e=zn(),t=e.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(r=>r.innerText.trim()==="description");if(o){let r=o.closest("material-fab")||o.closest("material-button");r?(r.style&&(r.style.display="block",r.style.visibility="visible"),Oe(r)):Oe(o)}else{let r=document.querySelector("material-fab-speed-dial");if(r){let l=r.querySelector(".trigger");l?(l.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),Oe(l)):r.click(),await pe(800);let b=Array.from(document.querySelectorAll("i.material-icons-extended")).find(p=>p.innerText.trim()==="description");b&&Oe(b)}}let n=null,i=0;for(;!n&&i<20;){await pe(300);let r=zn();if(r.length>t)n=r.find(l=>!e.includes(l)),n||(n=r[r.length-1]);else if(i>10){let l=r.filter(s=>s.offsetParent!==null);l.length>0&&(n=l[l.length-1])}i++}return n}var $n={pt:{back:"Voltar",generateNote:"Gerar Nota",describeIssuePlaceholder:"Descreva o erro, passos para reproduzir...",whatTestedPlaceholder:"O que voc\xEA j\xE1 testou?",fieldsFilledToast:e=>`${e} campos preenchidos!`,noNewDataToast:"Nenhum dado novo encontrado.",readPageErrorToast:"Erro ao ler p\xE1gina.",fillRequiredToast:"Preencha os campos obrigat\xF3rios.",noteGeneratedToast:"Nota gerada e inserida!",copiedOpenNoteToast:"Copiado! Abra uma nota para colar."},es:{back:"Volver",generateNote:"Generar Nota",describeIssuePlaceholder:"Describe el error, pasos para reproducirlo...",whatTestedPlaceholder:"\xBFQu\xE9 ya probaste?",fieldsFilledToast:e=>`\xA1${e} campos completados!`,noNewDataToast:"No se encontraron datos nuevos.",readPageErrorToast:"Error al leer la p\xE1gina.",fillRequiredToast:"Completa los campos obligatorios.",noteGeneratedToast:"\xA1Nota generada e insertada!",copiedOpenNoteToast:"\xA1Copiado! Abre una nota para pegar."}};function pt(e){let t=ce();return $n[t]?.[e]??$n.pt[e]}function Rn(e){let t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let a=document.createElement("div");a.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let o=document.createElement("div");o.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",t.appendChild(o),t.appendChild(a),a.addEventListener("scroll",()=>{o.style.boxShadow=a.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let n={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},i={};function r({id:f,label:C,type:P="text",placeholder:q="",required:E=!1,autocomplete:N="",parent:k=a}){let F=document.createElement("div");F.style.cssText=n.inputWrapper;let H=document.createElement("label");H.setAttribute("for",f),H.style.cssText=n.label,H.innerHTML=`${C} ${E?'<span style="color:#D93025">*</span>':""}`;let R;return P==="textarea"?(R=document.createElement("textarea"),R.style.cssText=n.input+n.textarea):(R=document.createElement("input"),R.type=P,R.style.cssText=n.input),R.id=f,R.placeholder=q,N&&R.setAttribute("autocomplete",N),R.addEventListener("focus",()=>{R.style.borderColor="#1a73e8",R.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),R.addEventListener("blur",()=>{R.style.borderColor="#DADCE0",R.style.boxShadow="none",E&&R.value.trim()!==""&&(R.style.backgroundColor="#FFF")}),i[f]={input:R,wrapper:F,required:E},F.appendChild(H),F.appendChild(R),P!=="textarea"&&ma(R),k.appendChild(F),F}function l({id:f,label:C,options:P=["Yes","No"],defaultValue:q="No",onChange:E=null}){let N=document.createElement("div");N.style.cssText=n.inputWrapper;let k=document.createElement("label");k.style.cssText=n.label,k.textContent=C,N.appendChild(k);let F=document.createElement("div");F.style.cssText=n.radioGroup;let H=document.createElement("input");return H.type="hidden",H.id=f,H.value=q,N.appendChild(H),P.forEach(R=>{let Q=document.createElement("div");Q.textContent=R,Q.style.cssText=n.radioLabel,R===q&&(Q.style.cssText+=n.radioActive),Q.onclick=()=>{Array.from(F.children).forEach(de=>de.style.cssText=n.radioLabel),Q.style.cssText+=n.radioActive,H.value=R,E&&E(R)},F.appendChild(Q)}),i[f]={input:H,wrapper:N,required:!1},N.appendChild(F),a.appendChild(N),N}let s=document.createElement("div");s.style.cssText=n.banner,s.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,a.appendChild(s);let b=document.createElement("div");b.style.marginBottom="24px";let p=document.createElement("button");p.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",p.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",p.onmouseover=()=>p.style.background="#E1EFFF",p.onmouseout=()=>p.style.background="#F0F7FF",b.appendChild(p),a.appendChild(b);let h=document.createElement("div");h.style.cssText=n.section,h.innerHTML=`<div style="${n.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,a.appendChild(h),r({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:h}),r({id:"ga4",label:"GA4 Property ID",parent:h}),r({id:"gtm",label:"GTM Container ID",parent:h});let m=document.createElement("div");m.style.cssText=n.hiddenField,h.appendChild(m),l({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:f=>{f==="Yes"?m.style.cssText=n.visibleField+"margin-bottom:14px;":(m.style.cssText=n.hiddenField,i.accessEmail.input.value="")}}),r({id:"accessEmail",label:"User Access Email",parent:m}),l({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let g=document.createElement("div");g.style.cssText=n.section,g.innerHTML=`<div style="${n.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,a.appendChild(g),r({id:"name",label:"Advertiser Name",required:!0,autocomplete:"name",parent:g}),r({id:"url",label:"Website URL",type:"url",autocomplete:"url",parent:g}),r({id:"phone",label:"Phone Number",type:"tel",autocomplete:"tel",parent:g}),r({id:"email",label:"Contact Email",type:"email",autocomplete:"email",parent:g}),r({id:"callback",label:"Preferred Callback Time (Timezone)",parent:g}),r({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:pt("describeIssuePlaceholder"),required:!0,parent:g}),r({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:pt("whatTestedPlaceholder"),parent:g}),r({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:g});let I=document.createElement("div");I.style.cssText=n.section,I.innerHTML=`<div style="${n.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,a.appendChild(I),r({id:"cc_adv",label:"Advertiser Contact",parent:I}),r({id:"cc_am",label:"Account Manager",parent:I});let x=document.createElement("div");x.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let y=document.createElement("button");y.innerHTML=pt("back"),y.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",y.onclick=e;let z=document.createElement("button");z.textContent=pt("generateNote"),z.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",x.appendChild(y),x.appendChild(z),t.appendChild(x),p.onclick=async()=>{let f=p.innerHTML;p.innerHTML="\u23F3 Buscando dados...";try{let C=await Qe(),P=0,q=(k,F)=>{let H=i[k];F&&H&&H.input.value===""&&(H.input.value=F,H.input.style.backgroundColor="#E6F4EA",H.input.style.borderColor="#34A853",setTimeout(()=>{H.input.style.backgroundColor="#FFF",H.input.style.borderColor="#DADCE0"},1e3),P++)};q("name",C.advertiserName),q("url",C.websiteUrl),C.clientEmail&&(q("email",C.clientEmail),q("cc_adv",C.clientEmail));let N=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);N&&q("cid",N[0]),P>0?J(pt("fieldsFilledToast")(P)):J(pt("noNewDataToast"))}catch(C){console.error(C),J(pt("readPageErrorToast"))}finally{p.innerHTML=f}};let A=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,$=()=>{let f=!0,C=null,P=A();return Object.values(i).forEach(q=>{q.required&&!q.input.value.trim()&&(f=!1,q.input.style.cssText+=n.inputError,P||q.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),C||(C=q.input))}),C&&C.scrollIntoView({behavior:P?"auto":"smooth",block:"center"}),f};return z.onclick=async()=>{if(!$()){v.playError(),J(pt("fillRequiredToast"),{error:!0});return}let f=k=>i[k].input.value||"N/A",C=f("hasAccess"),P=C==="Yes"?f("accessEmail"):"N/A",E=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${f("cid")}
<b>GA4 ID:</b> ${f("ga4")}
<b>GTM ID:</b> ${f("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${C==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${P}
<b>Ghosting Access Available (Y/N):</b> ${f("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${f("name")}
<b>Website:</b> ${f("url")}
<b>Phone Number:</b> ${f("phone")}
<b>Preferred Callback:</b> ${f("callback")}
<b>Email Address:</b> ${f("email")}

<b>Detailed Issue Description:</b>
${f("desc")}

<b>Uncropped screenshots:</b>
${f("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${f("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${f("cc_adv")}
<b>Account Manager:</b> ${f("cc_am")}
`.replace(/\n/g,"<br>");ra(E);let N=await ka();N?(N.innerText.trim()===""&&(N.innerHTML=""),document.execCommand("insertHTML",!1,E),Ca(N),v.playSuccess(),J(pt("noteGeneratedToast"))):J(pt("copiedOpenNoteToast"))},t}var Pn="cw_user_prefs_v1",co="cw_user_prefs_pending_v1",so=!1,sa=null;function Bt(){try{let e=localStorage.getItem(Pn),t=e?JSON.parse(e):null;return t&&typeof t=="object"?t:{}}catch{return{}}}function Bn(e){try{localStorage.setItem(Pn,JSON.stringify(e))}catch(t){console.warn("N\xE3o consegui gravar as prefer\xEAncias localmente:",t)}}function lo(e){try{e?localStorage.setItem(co,"1"):localStorage.removeItem(co)}catch{}}function ds(){try{return localStorage.getItem(co)==="1"}catch{return!1}}var ut={get(e,t=null){let a=Bt();return e in a?a[e]:t},async set(e,t){let a=Bt();a[e]=t,Bn(a);let o=Ne();if(!o)return lo(!0),{saved:!0,synced:!1};so=!0;let n=!1;try{n=await me.saveUserPrefs(a,o)}catch(i){console.warn("Falha ao salvar prefer\xEAncias na nuvem:",i)}finally{lo(!n),setTimeout(()=>{so=!1},2e3)}return{saved:!0,synced:n}},sync(){return sa||(sa=(async()=>{let e=Ne();if(!e)return Bt();try{if(ds()){let a=Bt(),o=await me.saveUserPrefs(a,e);return lo(!o),a}let t=await me.getUserPrefs(e);if(t&&typeof t=="object"&&!so){let a=Bt();JSON.stringify(t)!==JSON.stringify(a)&&Bn(t)}}catch(t){console.warn("Prefer\xEAncias indispon\xEDveis; seguindo com o cache local.",t)}finally{sa=null}return Bt()})(),sa)}};var la="shortcuts",Gn="shortcutsSortByUsage",Hn="cw_shortcut_usage_v1",bt=8,ps=[{id:"sc_default_ni_attempted",kind:"note",label:"NI Attempted \u2014 In\xEDcio 2 Day Rule",alias:"2day inicio",payload:{caseType:"bau",status:"NI",subStatus:"NI_Attempted_Contact",scenarios:[{id:"quickfill-ni-attempted-2day",substatus:"NI_Attempted_Contact"}]}},{id:"sc_default_in_not_reachable",kind:"note",label:"IN Not Reachable \u2014 Finaliza\xE7\xE3o 2 Day Rule",alias:"2day fim",payload:{caseType:"bau",status:"IN",subStatus:"IN_Not_Reachable",scenarios:[{id:"quickfill-in-no-show-bau",substatus:"IN_Not_Reachable"}]}}];function ca(){return"sc_"+Date.now().toString(36)+Math.floor(Math.random()*1e3).toString(36)}function uo(e){if(!e||!e.id)return null;if(dt[e.id])return e.id;let t=ta(e.id,e.substatus),a=Object.entries(dt),o=a.find(([i,r])=>ta(i,e.substatus)===t&&Array.isArray(r.substatus)&&r.substatus.includes(e.substatus));if(o)return o[0];let n=a.find(([i])=>ta(i,e.substatus)===t);return n?n[0]:null}function Un(e){return(e.payload&&e.payload.scenarios||[]).filter(a=>!uo(a)).map(a=>a.id)}function jn(){try{return JSON.parse(localStorage.getItem(Hn)||"{}")}catch{return{}}}function po(e){return Array.isArray(e)?e.filter(t=>t&&t.id&&t.payload&&t.payload.subStatus).map((t,a)=>({id:t.id,kind:t.kind||"note",label:String(t.label||"Atalho"),alias:String(t.alias||""),order:Number.isFinite(t.order)?t.order:a,payload:{caseType:t.payload.caseType||"bau",status:t.payload.status||String(t.payload.subStatus).split("_")[0],subStatus:t.payload.subStatus,scenarios:Array.isArray(t.payload.scenarios)?t.payload.scenarios.filter(o=>o&&o.id).map(o=>({id:o.id,substatus:o.substatus||t.payload.subStatus})):[]}})):[]}var qe={list(){let e=ut.get(la,null),t=po(e===null?qe.defaults():e),a=jn();return t.slice().sort((o,n)=>{if(qe.isSortedByUsage()){let i=(a[n.id]||0)-(a[o.id]||0);if(i)return i}return o.order-n.order})},listRaw(){let e=ut.get(la,null);return po(e===null?qe.defaults():e).sort((t,a)=>t.order-a.order)},defaults(){return ps.map((e,t)=>({...e,order:t}))},isSortedByUsage(){return ut.get(Gn,!0)!==!1},setSortedByUsage(e){return ut.set(Gn,!!e)},async save(e){let t=qe.listRaw(),a=t.findIndex(i=>i.id===e.id);if(a===-1&&t.length>=bt)return{ok:!1,reason:"limit"};let o=po([{...e,id:e.id||ca()}])[0];return o?(a===-1?(o.order=t.length,t.push(o)):(o.order=t[a].order,t[a]=o),{ok:!0,synced:(await ut.set(la,t)).synced,shortcut:o}):{ok:!1,reason:"invalid"}},async remove(e){let t=qe.listRaw().filter(a=>a.id!==e).map((a,o)=>({...a,order:o}));await ut.set(la,t)},async reorder(e,t){let a=qe.listRaw(),o=a.findIndex(r=>r.id===e);if(o===-1)return;let[n]=a.splice(o,1),i=Math.max(0,Math.min(t,a.length));a.splice(i,0,n),await ut.set(la,a.map((r,l)=>({...r,order:l})))},registerUse(e){try{let t=jn();t[e]=(t[e]||0)+1,localStorage.setItem(Hn,JSON.stringify(t))}catch{}}};var Vn={pt:{emailButtonNotFound:"Erro: Bot\xE3o de email n\xE3o encontrado.",clearingOldDraft:"Limpando rascunho antigo...",editorNotLoaded:"Erro: Editor n\xE3o carregou.",cannedResponseApplied:"Canned Response aplicada!",cannedResponseTimeout:e=>`Timeout: Template '${e}' n\xE3o carregou.`,cannedResponseButtonNotFound:"Bot\xE3o Canned Response n\xE3o encontrado.",emailFilledSuccess:"Email preenchido com sucesso!",editorFocusError:"Erro ao focar no editor.",fallbackClient:"Cliente",fallbackSite:"seu site"},es:{emailButtonNotFound:"Error: Bot\xF3n de email no encontrado.",clearingOldDraft:"Limpiando borrador antiguo...",editorNotLoaded:"Error: El editor no carg\xF3.",cannedResponseApplied:"\xA1Canned Response aplicada!",cannedResponseTimeout:e=>`Tiempo agotado: la plantilla '${e}' no carg\xF3.`,cannedResponseButtonNotFound:"Bot\xF3n Canned Response no encontrado.",emailFilledSuccess:"\xA1Email completado con \xE9xito!",editorFocusError:"Error al enfocar el editor.",fallbackClient:"Cliente",fallbackSite:"su sitio"}};function ot(e){let t=ce();return Vn[t]?.[e]??Vn.pt[e]}function Ie(e,t="info"){let a={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${e}`,a[t]||a.info)}function Ta(e,t){if(!e)return;let a=`cw-warning-${e.id||Math.random().toString(36).substr(2,9)}`,o=document.getElementById(a);o&&o.remove();let n=e.getBoundingClientRect(),i=document.createElement("div");i.id=a,i.style.cssText=`
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
        z-index: ${De.TOAST};
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
    `;let r=i.querySelector(".cw-close-btn");r.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&r.click()},25e3)}async function qa(e,t){if(!e||!t)return;e.focus(),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await pe(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),await pe(100),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function go(){let t=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(a=>{let o=a.offsetParent!==null,n=a.closest("case-message-view")!==null,i=a.closest(".editor")!==null||a.closest("write-card")!==null;return o&&!n&&i});return t&&Ie("Editor visualmente detectado.","success"),t}var mo=e=>!!e&&e.getClientRects().length>0&&e.getAttribute("aria-disabled")!=="true";async function us(e,{timeout:t=3e3,intervalo:a=100}={}){let o=Date.now()+t;for(;Date.now()<o;){let n=e();if(n)return n;await pe(a)}return null}function Wn(){let e=Array.from(document.querySelectorAll('material-button.compose, material-button.speed-dial-mini-fab[role="menuitem"]')),t=e.find(a=>a.classList.contains("compose")&&mo(a));return t||e.find(a=>{let o=a.querySelector("i.material-icons-extended");return mo(a)&&o&&o.textContent.trim()==="email"})||null}async function ms(){try{let e=Wn();if(e)Ie("Menu do speed dial j\xE1 estava aberto.");else{let t=document.querySelector("#action-bar-speed-dial-container material-button")||document.querySelector("material-button.action-bar-speed-dial-button");if(!mo(t))return Ie("Speed dial (+ Open) n\xE3o encontrado.","warn"),!1;Ie("Speed dial (+ Open) encontrado. Abrindo o menu..."),Oe(t),await pe(350),e=await us(Wn,{timeout:3e3})}return e?(await pe(120),Oe(e),Ie("Compose clicado via speed dial.","success"),!0):(Ie("Menu abriu, mas o bot\xE3o Compose n\xE3o apareceu.","warn"),!1)}catch(e){return Ie(`Falha no speed dial: ${e.message}`,"error"),!1}}async function gs(){let t=Array.from(document.querySelectorAll("i.material-icons-extended")).find(o=>o.innerText.trim()==="email");if(t&&t.offsetParent!==null){Ie("Bot\xE3o de email direto encontrado.");let o=t.closest("material-button")||t.closest("material-fab")||t;return Oe(o),!0}Ie("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let a=document.querySelector("material-fab-speed-dial");if(a){let o=a.querySelector(".trigger");if(o){Oe(o),await pe(800);let i=Array.from(document.querySelectorAll("i.material-icons-extended")).find(r=>r.innerText.trim()==="email");if(i)return Oe(i),Ie("Email aberto pelo fluxo antigo.","success"),!0}}return!1}async function Yn(){Ie("\u{1F680} FASE 1: Tentando abrir a janela de email...");let e=await ms();if(e||(Ie("UI nova n\xE3o reconhecida. Voltando ao fluxo da UI antiga...","warn"),e=await gs()),!e)return v.playError(),J(ot("emailButtonNotFound"),{error:!0}),!1;Ie("\u{1F680} FASE 2: Verificando rascunhos...");let t=null,a=0,o=20;for(;a<o;){await pe(250);let b=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(t=Array.from(b).find(p=>p.offsetParent!==null),t){Ie("\u26A0\uFE0F Rascunho detectado!","warn");break}a++}if(t){Ie("\u{1F5D1}\uFE0F Descartando..."),Oe(t),t.click();let b=null,p=0;for(;p<15;){await pe(300);let h=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(b=Array.from(h).find(m=>m.offsetParent!==null),b)break;p++}b&&(Oe(b),J(ot("clearingOldDraft"),{duration:2e3}),await pe(2500))}Ie("\u{1F680} FASE 3: Buscando editor final...");let n=0,i=null;for(;n<20&&(i=go(),!i);)await pe(250),n++;if(!i)return v.playError(),J(ot("editorNotLoaded"),{error:!0}),!1;let r=i.closest('[id="email-body-content-top"]'),s=(i.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(r){if(s){let p=s.closest('[aria-hidden="true"]');p&&p.removeAttribute("aria-hidden"),s.focus(),Oe(s)}await pe(300),r.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let b=r.querySelector("#cases-body-field");if(b){let p=document.createRange();p.selectNodeContents(b),p.collapse(!0);let h=window.getSelection();h.removeAllRanges(),h.addRange(p)}return!0}return!1}async function Na(e){if(!e||!await Yn())return;let a=await Qe();Ie("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let o=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(o&&(o.click(),await pe(600)),a.clientEmail&&a.clientEmail!=="N/A"&&a.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await qa(i,a.clientEmail),Ta(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(a.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await qa(i,a.internalEmail),Ta(i,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await pe(500);let n=document.querySelector('material-button[debug-id="canned_response_button"]');if(n){Oe(n),await pe(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){Oe(i),document.execCommand("insertText",!1,e),i.dispatchEvent(new Event("input",{bubbles:!0})),Ie("\u23F3 Buscando resultado da Canned Response...","info");let r=null,l=0,s=15e3,b=500;for(;l<s&&(r=document.querySelector("material-select-dropdown-item"),!r);)await pe(b),l+=b;if(r){Oe(r),await pe(1500);let p=go();if(p){let m=Array.from(p.querySelectorAll("span.field")).filter(I=>I.innerText.includes("{Requested Task Type}"));if(m.length>0){let I=m.map(y=>y.closest("tr")).filter(y=>y!==null),x=[...new Set(I)];if(x.length>0){let z=x[0].querySelector('td[width="100%"]');z&&(z.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let A=1;A<x.length;A++)x[A].remove()}}let g=p.innerHTML;a.advertiserName&&g.includes("{%ADVERTISER_NAME%}")&&(g=g.replace(/{%ADVERTISER_NAME%}/g,a.advertiserName)),g.includes("{%^79285%}")&&(g=g.replace(/{%\^79285%}/g,a.websiteUrl||ot("fallbackSite"))),p.innerHTML=g}J(ot("cannedResponseApplied"))}else Ie(`\u274C Timeout: Resultado '${e}' n\xE3o apareceu ap\xF3s 15s.`,"error"),v.playError(),J(ot("cannedResponseTimeout")(e),{error:!0})}}else v.playError(),J(ot("cannedResponseButtonNotFound"),{error:!0})}async function Xn(e){if(Ie(`\u{1F680} Iniciando Quick Email: ${e.name}`),!await Yn())return;let a=await Qe(),o=Kt();await pe(600);let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await pe(600)),a.clientEmail&&a.clientEmail!=="N/A"&&a.clientEmail!=="N/A (Bloqueado)"){let l=document.querySelector('input[aria-label="Enter To email address"]');l&&(await qa(l,a.clientEmail),Ta(l,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(a.internalEmail){let l=document.querySelector('input[aria-label="Enter Bcc email address"]');l&&(await qa(l,a.internalEmail),Ta(l,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let i=document.querySelector('input[aria-label="Subject"]');i&&e.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,e.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await pe(300));let r=go();if(r){let s=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');s&&(s.focus(),Oe(s));let b=new Date;b.setDate(b.getDate()+3);let p=b.getDay();p===6?b.setDate(b.getDate()+2):p===0&&b.setDate(b.getDate()+1);let h=b.toLocaleDateString("pt-BR"),m=e.body;m=m.replace(/\[Nome do Cliente\]/g,a.advertiserName||ot("fallbackClient")),m=m.replace(/\[INSERIR URL\]/g,a.websiteUrl||ot("fallbackSite")),m=m.replace(/\[URL\]/g,a.websiteUrl||ot("fallbackSite")),m=m.replace(/\[Seu Nome\]/g,o),m=m.replace(/\[MM\/DD\/YYYY\]/g,h),document.execCommand("insertHTML",!1,m),s&&(s.dispatchEvent(new Event("input",{bubbles:!0})),s.dispatchEvent(new Event("change",{bubbles:!0}))),J(ot("emailFilledSuccess"),{duration:2e3}),Ie("\u2705 Processo finalizado com sucesso.","success")}else v.playError(),J(ot("editorFocusError"),{error:!0})}var bo=460,fo=280,bs=200,ho=.06;if(!document.getElementById("cw-module-styles")){let e=document.createElement("style");e.id="cw-module-styles",e.innerHTML=`
        /* M\xD3DULO BASE */
        .cw-module-window {
            /* Degrau de repouso da janela. Precisa estar AQUI, e n\xE3o s\xF3
               no estilo inline de stylePopup(): o fim do fechamento faz
               popup.style.zIndex = '', o que apaga o inline e deixaria a
               janela em z-index:auto na pr\xF3xima abertura. */
            z-index: ${De.MODULE_RESTING};
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
            transform: scale(${ho});

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
    `,document.head.appendChild(e)}window._cwEscapeListenerActive||(window._cwEscapeListenerActive=!0,document.addEventListener("keydown",e=>{if(e.key!=="Escape"||document.querySelector(".cw-dialog-overlay"))return;let t=document.querySelector(".cw-module-window.open");if(!t)return;let a=t.querySelector(".cw-header-close");a&&a.click()}));function ai(){return!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)}function Kn(e){let t=document.querySelector(".cw-pill"),a=e?document.getElementById(e):null,o=!!(t&&t.classList.contains("collapsed")),n=i=>{if(!i)return null;let r=i.getBoundingClientRect();return!r.width||!r.height?null:{x:r.left+r.width/2,y:r.top+r.height/2}};if(!o){let i=n(a);if(i)return i}return n(t)}function Jn(e,t){let a=e.style.transition,o=e.style.transform;e.style.transition="none",e.style.transform="none";let n=e.getBoundingClientRect();return e.style.transform=o,e.offsetWidth,e.style.transition=a,{left:t?n.left:n.left-n.width/2,top:t?n.top:n.top-n.height/2,width:n.width,height:n.height}}function Zn(e,t,a){if(!t){e.style.transformOrigin="50% 50%",e._cwOrigin=null;return}let o=`${Math.round(t.x-a.left)}px ${Math.round(t.y-a.top)}px`;e.style.transformOrigin=o,e._cwOrigin=o}function Qn(e){return e?`translate(0, 0) scale(${ho})`:`translate(-50%, -50%) scale(${ho})`}function fs(e){return e?"translate(0, 0) scale(1)":"translate(-50%, -50%) scale(1)"}function ei(e){!e||ai()||(e.classList.remove("cw-absorbing"),e.offsetWidth,e.classList.add("cw-absorbing"),setTimeout(()=>e.classList.remove("cw-absorbing"),400))}function Ve(e){return e?typeof e._cwOpen=="boolean"?e._cwOpen:e.classList.contains("open"):!1}function $e(e,t,a){let o=a?document.getElementById(a):null;if(!t)return;t._cwOpen=!!e;let n=(t._cwAnimToken||0)+1;t._cwAnimToken=n;let i=()=>t._cwAnimToken!==n;t._cwTeardown&&(t._cwTeardown(),t._cwTeardown=null);let r=ai(),l=t.getAttribute("data-moved")==="true";if(e){v.playGenieOpen();let s=Jn(t,l);Zn(t,Kn(a),s),t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",t.style.transform=Qn(l),t.style.willChange="transform, opacity",t.classList.add("cw-animating"),t.offsetWidth,requestAnimationFrame(()=>{i()||(t.classList.add("open"),t.classList.remove("idle"),o&&o.classList.add("active"),ei(o),t.style.transition=r?"opacity 0.15s ease":`opacity ${Math.round(bo*.6)}ms ease-out, transform ${bo}ms var(--cw-ease-decelerate), filter 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease`,t.style.opacity="1",t.style.transform=fs(l),ti(t,n,r?150:bo,()=>{t.style.willChange="auto",t.classList.remove("cw-animating"),t._cwSettled=!0}))}),t._cwSettled=!1,hs(t,a)}else{if(v.playSwoosh(),t._cwSettled||!t._cwOrigin){let s=Jn(t,l);Zn(t,Kn(a),s)}if(t.style.transition=r?"opacity 0.15s ease":`opacity ${Math.round(fo*.8)}ms ease, transform ${fo}ms var(--cw-ease-accelerate)`,t.style.pointerEvents="none",t.style.willChange="transform, opacity",t.classList.add("cw-animating"),o&&t.contains(document.activeElement))try{o.focus({preventScroll:!0})}catch{o.focus()}requestAnimationFrame(()=>{i()||(t.style.opacity="0",t.style.transform=Qn(l),ti(t,n,r?150:fo,()=>{t.classList.remove("open"),t.classList.remove("idle"),t.style.zIndex="",o&&o.classList.remove("active"),ei(o),t.style.willChange="auto",t.classList.remove("cw-animating"),t.style.transition=""}))}),oi(t)}}function ti(e,t,a,o){let n=!1,i=()=>{e.removeEventListener("transitionend",l),clearTimeout(s),e._cwTeardown===i&&(e._cwTeardown=null)},r=()=>{n||(n=!0,i(),e._cwAnimToken===t&&o())},l=b=>{b.target===e&&b.propertyName==="transform"&&r()};e.addEventListener("transitionend",l);let s=setTimeout(r,a+bs);e._cwTeardown=i}function hs(e,t){oi(e);let a=o=>{if(!e.classList.contains("open"))return;let n=e.contains(o.target),i=document.querySelector(".cw-pill"),r=i&&i.contains(o.target);n?(e.classList.remove("idle"),e.style.zIndex=String(De.MODULE_FOCUSED)):r||(e.classList.add("idle"),e.style.zIndex=String(De.MODULE_RESTING))};e._idleHandler=a,document.addEventListener("mousedown",a)}function oi(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var ni='<svg viewBox="0 0 24 24" fill="currentColor" style="width:13px;height:13px;flex-shrink:0;"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>';function ii(){let e="v4.0.0",{popup:t,content:a,header:o,animRefs:n,credit:i}=gn(e,F),r=qn(u),l=Tn(()=>{oe(),X.setActiveTasks(l.getCheckedElements())},u,X),s=document.createElement("div");s.style.display="none";let b=kn((d,w)=>{U(d,w)});s.appendChild(b);let p=document.createElement("button");p.type="button",p.className="cw-save-shortcut-btn",p.style.cssText=`
        margin-top: 10px; padding: 7px 12px; border-radius: 8px;
        border: 1px dashed ${j.border}; background: transparent;
        color: ${j.textSub}; font-family: inherit; font-size: 11.5px;
        font-weight: 600; cursor: pointer; display: inline-flex; align-items: center;
        gap: 6px; transition: all 0.2s ${xe};
    `,p.onmouseenter=()=>{p.style.borderColor=j.primary,p.style.color=j.primary,v.playHover()},p.onmouseleave=()=>{p.style.borderColor=j.border,p.style.color=j.textSub},p.onclick=()=>c(),p.innerHTML=`${ni}<span>${u("salvar_como_atalho")}</span>`,s.appendChild(p);let h=document.createElement("div");h.id="evidence-container",Object.assign(h.style,{display:"none",marginTop:"16px",padding:"16px",background:j.bgInput,border:`1px solid ${j.border}`,borderRadius:Le.medium,boxShadow:gt.subtle});let m=document.createElement("div");m.className="cw-section-title",m.textContent=u("evidencias_contato"),h.appendChild(m);let g={},I=(d,w)=>{let T=document.createElement("div");T.style.marginBottom="12px";let Y=document.createElement("label");Y.textContent=w,Y.setAttribute("for",d),Y.style.cssText=`display: block; font-size: 11px; font-weight: 700; color: ${j.textSub}; margin-bottom: 6px; text-transform: uppercase;`;let ee=document.createElement("input");return ee.type="text",ee.id=d,ee.className="cw-input",ee.placeholder="https://screenshot.googleplex.com/...",ee.style.marginBottom="0",T.appendChild(Y),T.appendChild(ee),ma(ee,{minLength:8}),g[d]=ee,T};h.appendChild(I("evidence-l1",u("ligacao_1"))),h.appendChild(I("evidence-l2",u("ligacao_2"))),h.appendChild(I("evidence-msg",u("mensagem_am")));let x=Dn({onSaveCurrent:async()=>{let d=await ie();return V(),d},onLoadDraft:d=>{G(d)},t:d=>u(d)}),y=R(),z=Q(),A=document.createElement("div"),$=M(),f=re(x,u);a.appendChild(y),a.appendChild(z),a.appendChild($),a.appendChild(s),a.appendChild(A),a.appendChild(h),l.selectionElement.style.display="none",l.screenshotsElement.style.display="none";let C=document.createElement("button");C.id="manual-task-toggle",C.textContent=u("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",C.style.cssText=`display: none; width: 100%; padding: 14px; border: 2px dashed ${j.primary}; background: ${j.surface}; color: ${j.primary}; border-radius: ${Le.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${xe}; text-transform: uppercase; letter-spacing: 0.5px;`,C.onmouseenter=()=>{C.style.background=j.primaryBg},C.onmouseleave=()=>{C.style.background=j.surface},C.onclick=()=>{l.selectionElement.style.display="block",l.screenshotsElement.style.display="block",C.style.display="none"},a.appendChild(C),a.appendChild(l.selectionElement),a.appendChild(r.element),a.appendChild(l.screenshotsElement),a.appendChild(f);let P=document.createElement("div");P.style.display="none",P.style.flexGrow="1",P.style.minHeight="0",P.style.overflow="hidden";let q=Rn(()=>H());q.style.height="100%",P.appendChild(q),t.insertBefore(P,i);let E=o.lastElementChild;E&&(E.insertBefore(x.historyBtnWrapper,E.firstChild),E.insertBefore(L(),E.firstChild)),t.appendChild(x.drawer);let N=null;X.subscribe(d=>{te(d),k(),d.isDirty?(N&&clearTimeout(N),N=setTimeout(async()=>{let w=await ie(!0);w.subStatus?Ue.saveEmergency(w):Ue.clearEmergency(),d.isDirty=!1},2e3)):N&&(clearTimeout(N),N=null)});function k(){let d=Ue.getCount()>0,w=!!X.currentSubStatus;Aa(d||w)}function F(){X.visible=!X.visible,X.visible?ke():Te(),$e(X.visible,t,"cw-btn-notes")}function H(){X.isSplitView=!X.isSplitView,X.isSplitView?(a.style.display="none",P.style.display="flex",P.style.flexDirection="column",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(a.style.display="flex",P.style.display="none",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function R(){let d=document.createElement("div");if(d.innerHTML=`
            <div style="display: flex; gap: 12px; margin-bottom: 8px;">
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-fluxo" style="font-size: 10px; margin-bottom: 6px;">${u("fluxo")}</div>
                    <div class="cw-segmented-control" id="type-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-type="bau" class="active" style="z-index:2">BAU</button>
                        <button data-type="lm" style="z-index:2">LM</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-portugal" style="font-size: 10px; margin-bottom: 6px;">${u("caso_portugal")}</div>
                    <div class="cw-segmented-control" id="portugal-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-val="false" class="active" style="z-index:2">${u("nao")}</button>
                        <button data-val="true" style="z-index:2">${u("sim")}</button>
                    </div>
                </div>
            </div>
        `,!document.getElementById("cw-segmented-styles")){let T=document.createElement("style");T.id="cw-segmented-styles",T.innerHTML=`
                .cw-segmented-control {
                    display: flex;
                    background: ${j.bgInput};
                    padding: 3px;
                    border-radius: 100px;
                    gap: 2px;
                    border: 1px solid ${j.border};
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
                    transition: all 0.3s ${xe};
                    color: ${j.textSub};
                    position: relative;
                }
                .cw-segmented-control button.active {
                    color: #fff;
                }
                .cw-segmented-control button:hover:not(.active) {
                    background: rgba(0,0,0,0.03);
                    color: ${j.text};
                }
                .cw-segmented-indicator {
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    bottom: 3px;
                    width: calc(50% - 4px);
                    background: ${j.primary};
                    border-radius: 100px;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 1;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
                }
            `,document.head.appendChild(T)}let w=(T,Y)=>{let ae=d.querySelector(`#${T}`).querySelector(".cw-segmented-indicator");ae&&(ae.style.transform=`translateX(${Y*100}%) translateX(${Y*2}px)`)};return d.querySelectorAll("#type-selector button").forEach((T,Y)=>{T.onclick=()=>{X.setCaseType(T.dataset.type),d.querySelectorAll("#type-selector button").forEach(ee=>ee.classList.remove("active")),T.classList.add("active"),w("type-selector",Y),v.playClick(),X.currentSubStatus&&W(X.currentSubStatus)}}),d.querySelectorAll("#portugal-selector button").forEach((T,Y)=>{T.onclick=()=>{X.setPortugalCase(T.dataset.val==="true"),d.querySelectorAll("#portugal-selector button").forEach(ee=>ee.classList.remove("active")),T.classList.add("active"),w("portugal-selector",Y),v.playClick(),X.currentSubStatus&&W(X.currentSubStatus)}}),d}function Q(){let d=document.createElement("div");d.className="cw-status-section",d.style.cssText="display: flex; flex-direction: column; gap: 8px;",d.innerHTML=`
            <label class="cw-section-title js-label-status" for="main-status-select" style="margin-top: 8px;">${u("status_principal")}</label>
            <select id="main-status-select" class="cw-select">
                <option value="" disabled selected>${u("select_status")}</option>
                <option value="NI">NI - Need Info</option>
                <option value="SO">SO - Solution Offered</option>
                <option value="IN">IN - Inactive</option>
                <option value="AS">AS - Assigned</option>
                <option value="DC">DC - Discard</option>
            </select>
            <label class="cw-section-title js-label-substatus" for="sub-status-select" style="margin-top: 8px;">${u("substatus")}</label>
            <select id="sub-status-select" class="cw-select" disabled>
                <option value="">${u("select_substatus")}</option>
            </select>
        `;let w=d.querySelector("#main-status-select"),T=d.querySelector("#sub-status-select");return w.onchange=()=>{X.setStatus(w.value),de(w.value,T),X.setSubStatus(""),W("")},T.onchange=()=>{X.setSubStatus(T.value),W(T.value)},d}function le(){return h.style.display==="none"?null:{l1:g["evidence-l1"]?.value.trim()||"",l2:g["evidence-l2"]?.value.trim()||"",msg:g["evidence-msg"]?.value.trim()||""}}function de(d,w){if(w.innerHTML=`<option value="">${u("select_substatus")}</option>`,!d){w.disabled=!0;return}let T=d==="IN"?(()=>{let Y=document.createElement("optgroup");return Y.label="Fora de Escopo",Y})():null;for(let Y in Fe)if(Fe[Y].status===d){let ee=document.createElement("option");ee.value=Y,ee.textContent=Fe[Y].name,T&&Y.startsWith("IN_Out_of_Scope")?T.appendChild(ee):w.appendChild(ee)}T&&T.children.length>0&&w.appendChild(T),w.disabled=!1}function W(d){let w=Fe[d],T=d==="NI_Attempted_Contact"||w&&w.name&&w.name.toLowerCase().includes("attempted contact");if(b.render&&b.render(d,X.currentCaseType),!d){h.style.display="none",g["evidence-l1"]&&(g["evidence-l1"].value=""),g["evidence-l2"]&&(g["evidence-l2"].value=""),g["evidence-msg"]&&(g["evidence-msg"].value=""),s.style.display="none",A.style.display="none";let we=document.getElementById("manual-task-toggle");we&&(we.style.display="none"),l.selectionElement.style.display="none",l.screenshotsElement.style.display="none",$.style.display="flex",$.style.opacity="1",f.style.display="none";return}if(T?h.style.display="block":(h.style.display="none",g["evidence-l1"]&&(g["evidence-l1"].value=""),g["evidence-l2"]&&(g["evidence-l2"].value=""),g["evidence-msg"]&&(g["evidence-msg"].value="")),$.style.opacity="0",setTimeout(()=>{X.currentSubStatus&&($.style.display="none")},400),f.style.display="grid",w&&w.templateFields){let we=hn(w);X.setActiveFields(w.templateFields.filter(Be=>!we.includes(Be)))}ne(),na(d,A,X),A.style.display="block",s.style.display="block";let Y=d.startsWith("SO_"),ee=d==="NI_Awaiting_Validation",ae=document.getElementById("manual-task-toggle");Y||ee?(l.selectionElement.style.display="block",ae.style.display="none"):(l.selectionElement.style.display="none",l.screenshotsElement.style.display="none",ae.style.display="block");let se=d==="SO_Education_Only"?"education":"implementation";X.setScreenshotMode(se),l.updateSubStatus(d),oe();let he=document.getElementById("email-automation-toggle-row");he&&(he.style.display=zt[d]?"flex":"none")}function oe(){let d=l.getCheckedElements().map(w=>w.value);r.updateVisibility(X.currentSubStatus,d)}function U(d,w){let T=xa(dt[d],X.currentLang,d);if(T){for(let Y in T)if(Y==="linkedTask")l.toggleTask(T.linkedTask,w);else if(Y==="activeTasks")T.activeTasks.forEach(ee=>{w?l.setTaskCount(ee.value,ee.count):l.setTaskCount(ee.value,0)});else if(Y.startsWith("field-")){let ee=Y,ae=T[Y],se=document.getElementById(ee);if(se){let he=$t.includes(ee.replace("field-",""));if(w)if(he){let we=se.value.trim();we.includes(ae.trim())||(se.value=we?we+`
`+ae.trim():ae.trim())}else se.value=ae;else if(he){let we=se.value.trim(),Be=ae.trim();we.includes(Be)&&(se.value=we.replace(Be,"").trim().replace(/\n{3,}/g,`

`))}else se.value.trim()===ae.trim()&&(se.value="");X.updateField(ee,se.value),se.dispatchEvent(new Event("input"))}}}}function re(d,w){let T=document.createElement("div");if(T.className="cw-actions-section",T.style.cssText=`
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 10px;
            margin-top: 16px;
            background: ${j.bgInput};
            border-radius: 12px;
            border: 1px solid ${j.border};
        `,!document.getElementById("cw-actions-hover-styles")){let we=document.createElement("style");we.id="cw-actions-hover-styles",we.innerHTML=`
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
                    border-color: ${j.primary} !important;
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
                    color: ${j.primary} !important;
                    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.05) !important;
                    transform: translateY(-1px);
                }
            `,document.head.appendChild(we)}let Y=document.createElement("div");Y.id="email-automation-toggle-row",Y.style.cssText="grid-column: 1 / -1; display: none; align-items: center; justify-content: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2px;",Y.innerHTML=`
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 10.5px; font-weight: 600; color: ${j.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 13px; height: 13px; accent-color: ${j.primary};">
                <span class="js-label-email-toggle">${w("preencher_email_automaticamente")}</span>
            </label>
        `;let ee=d.parkButton;ee.classList.add("js-btn-park"),ee.style.cssText="width: 100%; margin: 0; border-radius: 10px; height: 34px; font-weight: 600; font-size: 11.5px;";let ae=document.createElement("button");ae.className="cw-btn-secondary js-btn-reset",ae.textContent=w("limpar"),ae.style.cssText=`width: 100%; height: 34px; background: ${j.surface}; color: ${j.textSub}; border: 1px solid ${j.border}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,ae.onclick=()=>V();let se=document.createElement("button");se.className="cw-btn-secondary js-btn-copy",se.textContent=w("copiar"),se.style.cssText=`width: 100%; height: 34px; background: ${j.surface}; color: ${j.primary}; border: 1px solid ${j.primary}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,se.onclick=()=>B();let he=document.createElement("button");return he.className="cw-btn-primary js-btn-generate",he.textContent=w("preencher"),he.style.cssText=`width: 100%; height: 38px; background: ${j.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; grid-column: 1 / -1; font-size: 12.5px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 0px;`,he.onclick=()=>Z(),T.appendChild(Y),T.appendChild(ee),T.appendChild(ae),T.appendChild(se),T.appendChild(he),T}async function B(){if(!X.currentSubStatus){v.playError(),J(u("select_substatus"),{error:!0});return}let d=to(X,l,r,le());d?(ra(d),J(u("copiado_sucesso")),v.playClick()):(v.playError(),J(u("select_substatus"),{error:!0}))}async function Z(){if(!X.currentSubStatus){v.playError(),J(u("select_substatus"),{error:!0});return}let d=Fe[X.currentSubStatus],w=aa(d).filter(ae=>{if(!X.activeFields.includes(ae))return!1;let se=X.formData[`field-${ae}`];return!se||!se.trim()});if(w.length>0){v.playError(),J(`Preencha o campo obrigat\xF3rio antes de gerar: ${u(w[0].toLowerCase())}`,{error:!0});return}if(d?.requiresTasks&&l.getCheckedElements().length===0){v.playError(),J("Selecione ao menos uma tarefa antes de gerar a nota.",{error:!0});return}let T=to(X,l,r,le());ra(T),F();let Y=ia(),ee=await ka();if(ee){ee.focus(),document.execCommand("insertHTML",!1,T),Ca(ee);let ae=document.getElementById("email-automation-checkbox");(!ae||ae.checked)&&X.currentSubStatus&&zt[X.currentSubStatus]&&await Na(zt[X.currentSubStatus]),J(u("inserido_copiado")),v.playSuccess(),Mn(),V()}else v.playError(),J("N\xE3o foi poss\xEDvel abrir a nota no CRM. O conte\xFAdo j\xE1 est\xE1 copiado \u2014 cole manualmente.",{error:!0}),F();Y()}function ne(){if(X.currentSubStatus){if(X.currentCaseType==="lm")X.removeField("ON_CALL");else{let d=Fe[X.currentSubStatus];d&&d.templateFields.includes("ON_CALL")&&X.addFieldAt("ON_CALL",1)}X.isPortugalCase?(X.addFieldAt("CASO_PORTUGAL",1),X.addFieldAt("CONSENTIU_GRAVACAO",2)):(X.removeField("CASO_PORTUGAL"),X.removeField("CONSENTIU_GRAVACAO"))}}function V(){X.reset(),l.reset(),r.reset(),k(),Ue.clearEmergency(),a.querySelectorAll("select").forEach(w=>w.value=""),a.querySelector("#sub-status-select").disabled=!0;let d=document.getElementById("email-automation-toggle-row");d&&(d.style.display="none"),A.innerHTML="",s.style.display="none",$.style.display="flex",$.style.opacity="1",f.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),l.selectionElement.style.display="none",l.screenshotsElement.style.display="none",h.style.display="none",g["evidence-l1"]&&(g["evidence-l1"].value=""),g["evidence-l2"]&&(g["evidence-l2"].value=""),g["evidence-msg"]&&(g["evidence-msg"].value="")}async function ie(d=!1){let w={};A.querySelectorAll("input, textarea, select").forEach(se=>{(se.id.startsWith("field-")||se.id==="consent-select")&&(w[se.id]=se.value)});let T="Cliente",Y="---";if(!d)try{let se=await Qe();T=se.advertiserName,Y=se.cid}catch(se){console.warn("Erro ao coletar pageData:",se)}let ee=l.getCheckedElements().map(se=>({key:se.value,count:se.count})),ae=ee.map(se=>{let he=at[se.key];return he?he.name:se.key});return{currentCaseType:X.currentCaseType,currentLang:X.currentLang,isPortugalCase:X.isPortugalCase,consent:X.consent,tagSupportUsed:X.tagSupportUsed,forcedScreenshots:[...X.forcedScreenshots],activeFields:X.activeFields,status:X.currentStatus,subStatus:X.currentSubStatus,formData:w,activeTasks:ee,summaryTags:ae,clientName:T,cid:Y,timestamp:new Date().toISOString()}}let _=d=>new Promise(w=>setTimeout(w,d));async function G(d){X.setCaseType(d.currentCaseType||"bau"),X.setPortugalCase(d.isPortugalCase||!1),X.setConsent(d.consent||!1),d.activeFields&&X.setActiveFields(d.activeFields);let w=a.querySelector(`#type-selector button[data-type="${X.currentCaseType}"]`);w&&w.classList.add("active"),a.querySelectorAll("#type-selector button").forEach(Y=>{Y!==w&&Y.classList.remove("active")});let T=a.querySelector(`#portugal-selector button[data-val="${X.isPortugalCase}"]`);if(T&&T.classList.add("active"),a.querySelectorAll("#portugal-selector button").forEach(Y=>{Y!==T&&Y.classList.remove("active")}),d.status){let Y=a.querySelector("#main-status-select");Y.value=d.status,X.setStatus(d.status);let ee=a.querySelector("#sub-status-select");if(de(d.status,ee),await _(50),d.subStatus){if(ee.value=d.subStatus,X.setSubStatus(d.subStatus),W(d.subStatus),await _(100),d.tagSupportUsed!==void 0){X.setTagSupportUsed(d.tagSupportUsed);let ae=r.element.querySelector('input[value="Sim"]'),se=r.element.querySelector('input[value="N\xE3o"]');d.tagSupportUsed&&ae?ae.checked=!0:se&&(se.checked=!0),r.element.querySelector("div:last-child").style.display=d.tagSupportUsed?"none":"block"}d.forcedScreenshots&&X.setForcedScreenshots(d.forcedScreenshots);for(let ae in d.formData){let se=document.getElementById(ae);se&&(se.value=d.formData[ae],X.updateField(ae,se.value))}d.activeTasks&&(d.activeTasks.forEach(ae=>l.setTaskCount(ae.key,ae.count)),X.setActiveTasks(l.getCheckedElements()))}}X.isDirty=!1}async function K(d){let w=d&&d.payload;if(!w||!w.subStatus)return{ok:!1,reason:"invalid"};let T=w.scenarios||[],Y=T.map(_e=>uo(_e)),ee=T.filter((_e,We)=>!Y[We]);if(X.isDirty&&!await Me(u("substituir_rascunho_confirm")))return{ok:!1,reason:"cancelled"};let ae=X.visible;if(ae||F(),V(),ae||await _(550),w.caseType&&w.caseType!==X.currentCaseType){let _e=a.querySelector(`#type-selector button[data-type="${w.caseType}"]`);_e&&_e.click(),await _(60)}let se=a.querySelector("#main-status-select"),he=a.querySelector("#sub-status-select"),we=w.status||String(w.subStatus).split("_")[0];se.value=we,X.setStatus(we),de(we,he),await _(60),he.value=w.subStatus,X.setSubStatus(w.subStatus),W(w.subStatus),await _(160);for(let _e of Y.filter(Boolean)){let We=s.querySelector(`[data-id="${_e}"]`);We&&We.click()}await _(120),ee.length?(v.playError(),J(u("atalho_cenario_sumiu"),{error:!0})):v.playSuccess();let Be=O();return Be&&Ro(Be),{ok:!0,missing:ee.map(_e=>_e.id)}}function O(){let d=a.querySelectorAll('input[id^="field-"], textarea[id^="field-"], input[id^="evidence-"]');for(let w of d)if(w.offsetParent!==null&&!String(w.value||"").trim())return w;return null}async function c(){let d=S();if(!d){v.playError(),J(u("select_substatus"),{error:!0});return}if(qe.listRaw().length>=bt){v.playError(),J(u("atalho_limite").replace("{max}",bt),{error:!0});return}let w=Fe[d.payload.subStatus]?.name||d.payload.subStatus,T=await ha(u("atalho_nome_pergunta"),w);if(T!==null){p.disabled=!0,p.style.opacity="0.6";try{let Y=await qe.save({...d,id:ca(),label:String(T).trim()||w});if(!Y.ok){v.playError(),J(u("atalho_limite").replace("{max}",bt),{error:!0});return}v.playSuccess(),J(Y.synced?u("atalho_salvo"):u("atalho_salvo_local"))}finally{p.disabled=!1,p.style.opacity=""}}}function S(){if(!X.currentSubStatus)return null;let d=b.getSelectedIds?b.getSelectedIds():[];return{kind:"note",payload:{caseType:X.currentCaseType,status:X.currentStatus,subStatus:X.currentSubStatus,scenarios:d.map(w=>({id:w,substatus:X.currentSubStatus}))}}}function u(d){return Xe[X.currentLang]?.[d]||Xe.pt?.[d]||d}function L(){let d=document.createElement("div");return d.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',d.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",d.onclick=w=>{w.stopPropagation(),H()},d.title="Alternar para Split & Transfer",d}function M(){let d=document.createElement("div");return d.id="notes-empty-state",d.style.cssText=`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${xe};
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
                <div style="font-family: 'Google Sans', sans-serif; font-size: 16px; font-weight: 600; color: ${j.text}; margin-bottom: 4px;">
                    ${u("pronto_comecar")||"Pronto para come\xE7ar?"}
                </div>
                <div style="font-size: 13px; color: ${j.textSub}; line-height: 1.6; opacity: 0.8;">
                    ${u("selecione_status_ajuda")||"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica."}
                </div>
            </div>
        `,d}function te(d){let w=a.querySelector(".js-label-fluxo");w&&(w.textContent=u("fluxo"));let T=a.querySelector(".js-label-portugal");T&&(T.textContent=u("caso_portugal"));let Y=a.querySelectorAll("#portugal-selector button");Y.length===2&&(Y[0].textContent=u("nao"),Y[1].textContent=u("sim"));let ee=a.querySelector(".js-label-status");ee&&(ee.textContent=u("status_principal"));let ae=a.querySelector(".js-label-substatus");ae&&(ae.textContent=u("substatus"));let se=a.querySelector(".js-btn-copy");se&&(se.textContent=u("copiar"));let he=a.querySelector(".js-btn-generate");he&&(he.textContent=u("preencher"));let we=a.querySelector(".js-btn-reset");we&&(we.textContent=u("limpar"));let Be=document.getElementById("manual-task-toggle");Be&&(Be.textContent=u("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let _e=a.querySelector(".js-btn-park span");_e&&(_e.textContent=u("guardar")),m.textContent=u("evidencias_contato");let We=h.querySelector('label[for="evidence-l1"]');We&&(We.textContent=u("ligacao_1"));let da=h.querySelector('label[for="evidence-l2"]');da&&(da.textContent=u("ligacao_2"));let Ht=h.querySelector('label[for="evidence-msg"]');Ht&&(Ht.textContent=u("mensagem_am"));let To=t.querySelector(".js-drawer-title");To&&(To.textContent=u("rascunhos_salvos"));let qo=t.querySelector(".js-history-btn");qo&&(qo.title=u("meus_rascunhos"));let No=a.querySelector(".js-label-email-toggle");No&&(No.textContent=u("preencher_email_automaticamente")),p.innerHTML=`${ni}<span>${u("salvar_como_atalho")}</span>`,r&&r.setLanguage&&r.setLanguage(u),l&&l.setLanguage&&l.setLanguage(u)}return $.style.display="flex",f.style.display="none",X.setLanguage(ce()),X.setCaseType("bau"),Ee(d=>{X.setLanguage(d);let w=t.querySelector(".cw-help-description");w&&(w.textContent=ea[d]||ea.pt),X.currentSubStatus&&W(X.currentSubStatus)}),k(),setTimeout(async()=>{let d=Ue.getEmergency();d&&(await Me(u("restaurar_rascunho_confirm"))?(G(d),J("Sess\xE3o restaurada!")):Ue.clearEmergency())},3e3),document.body.appendChild(t),En().then(d=>{d&&X.currentSubStatus&&(b.render&&b.render(X.currentSubStatus,X.currentCaseType),na(X.currentSubStatus,A,X))}),F.openWithPreset=K,F}var Ia=[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",category:"Tentativas & Agendamento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",placeholders:[{key:"[Seu Nome]",label:"Seu Nome",type:"text",auto:"agentName"},{key:"[INSERIR URL]",label:"URL do Site",type:"text"},{key:"[LINK DO MEET]",label:"Link da Reuni\xE3o",type:"text"}],template:"<p>Ol\xE1,</p><br><p>Aqui \xE9 o <strong>[Seu Nome]</strong> da equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tentei ligar no seguinte n\xFAmero: <strong>...</strong> sem sucesso, teria outro n\xFAmero para que eu pudesse entrar em contato?</p><br><p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>Em seu site: <strong>[INSERIR URL]</strong></p><p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, voc\xEA pode acessar o link da nossa reuni\xE3o: <strong>[LINK DO MEET]</strong></p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"reschedule2",name:"Proposta de Reagendamento",category:"Tentativas & Agendamento",subject:"Reagendamento de Consultoria",placeholders:[{key:"[DATA 1]",label:"Data 1",type:"text"},{key:"[HORA 1]",label:"Hora 1",type:"text"},{key:"[DATA 2]",label:"Data 2",type:"text"},{key:"[HORA 2]",label:"Hora 2",type:"text"},{key:"[DATA 3]",label:"Data 3",type:"text"},{key:"[HORA 3]",label:"Hora 3",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p><ul><li><strong>[DATA 1] \xE0s [HORA 1]</strong></li><li><strong>[DATA 2] \xE0s [HORA 2]</strong></li><li><strong>[DATA 3] \xE0s [HORA 3]</strong></li></ul><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email nas pr\xF3ximas 48 horas o caso ser\xE1 encerrado.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"max_reschedules",name:"Limite de Reagendamentos Excedido",category:"Tentativas & Agendamento",subject:"Status do Agendamento - Time de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este e-mail o encontre bem.</p><p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementa\xE7\xE3o das tags.</p><br><p>Infelizmente, <strong>n\xE3o podemos mais reagendar este caso espec\xEDfico</strong>, pois excedemos o limite m\xE1ximo de agendamentos permitido.</p><br><p>Se voc\xEA deseja prosseguir com a implementa\xE7\xE3o das tags, ser\xE1 necess\xE1rio abrir um <strong>novo caso</strong> diretamente com a <a href="https://support.google.com/google-ads">Ajuda do Google Ads</a>. Isso garantir\xE1 que voc\xEA receba o acompanhamento e o suporte necess\xE1rio para dar continuidade \xE0 sua solicita\xE7\xE3o.</p><br><p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colabora\xE7\xE3o.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"2_6_day3",name:"Dia 3 (Acompanhamento)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]",label:"A\xE7\xE3o Pendente",type:"text"},{key:"[MM/DD/YYYY]",label:"Data do Pr\xF3ximo Contato",type:"date"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Tentamos contato atrav\xE9s do N\xFAmero de Telefone, por\xE9m sem sucesso. Gostaria de saber se voc\xEA j\xE1 conseguiu <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, ou se voc\xEA j\xE1 possui uma previs\xE3o de quando essa a\xE7\xE3o ser\xE1 conclu\xEDda.</p><br><p>Continuarei monitorando o status da implementa\xE7\xE3o no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementa\xE7\xE3o.</p><p>Se voc\xEA tiver algum problema ou d\xFAvidas que impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_day6",name:"Dia 6 (Acompanhamento Final)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[URL]",label:"URL do Site",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Ap\xF3s an\xE1lise e revis\xE3o do status de implementa\xE7\xE3o da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda est\xE1 com a implementa\xE7\xE3o pendente. Tentamos contato atrav\xE9s do email, por\xE9m sem sucesso.</p><br><p>\xC9 essencial que seja implementado, pois ele oferece uma ampla gama de benef\xEDcios, como:</p><ul><li>Ajuda a rastrear convers\xF5es em tempo real</li><li>Melhora a gera\xE7\xE3o de receita, em termos de cliques</li><li>Serve para vincular o Google Analytics e os an\xFAncios e acompanhar convers\xF5es</li><li>Fornece informa\xE7\xF5es sobre a experi\xEAncia do usu\xE1rio</li></ul><br><p>Se voc\xEA tiver algum problema ou d\xFAvidas que o impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco. Teremos o maior prazer em ajudar.</p><p>Caso n\xE3o tenhamos nenhuma resposta nos pr\xF3ximos 3 dias, infelizmente o caso ser\xE1 encerrado.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_completed_reschedule",name:"A\xE7\xF5es Conclu\xEDdas (Solicitar Reagendamento)",category:"Follow Up",subject:"Continuidade da Implementa\xE7\xE3o - Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Disponibilidade em BAU]",label:"Pr\xF3xima Disponibilidade",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Maravilha! Muito bom saber que conseguiu concluir as a\xE7\xF5es pendentes. Sendo assim, agora podemos continuar com a implementa\xE7\xE3o das configura\xE7\xF5es em sua conta.</p><br><p>Para isso, pe\xE7o, por favor, que me envie algumas das pr\xF3ximas datas e hor\xE1rios em que est\xE1 dispon\xEDvel a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p><p>Assim que me enviar essa informa\xE7\xE3o, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"nrp_standard",name:"NRP - Padr\xE3o (3\xAA Tentativa)",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Task pedida pelo AM]",label:"Task Solicitada",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reuni\xE3o.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"nrp_dfa",name:"NRP - DFA",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'}],La={attempt_10min:{name:"Intento de Contacto (Antes de los 10min)",category:"Intentos y Programaci\xF3n",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Intento de Contacto",labels:{"[Seu Nome]":"Tu Nombre","[INSERIR URL]":"URL del Sitio","[LINK DO MEET]":"Enlace de la Reuni\xF3n"},template:"<p>Hola,</p><br><p>Le habla <strong>[Seu Nome]</strong> del equipo de Soluciones T\xE9cnicas de Google. Intent\xE9 llamar al siguiente n\xFAmero: <strong>...</strong> sin \xE9xito, \xBFtendr\xEDa otro n\xFAmero para que pueda ponerme en contacto?</p><br><p>Le recuerdo que voy a ayudarle a implementar la siguiente tarea:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>En su sitio: <strong>[INSERIR URL]</strong></p><p>Intentar\xE9 llamar nuevamente en 10 minutos; si lo prefiere, puede acceder al enlace de nuestra reuni\xF3n: <strong>[LINK DO MEET]</strong></p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},reschedule2:{name:"Propuesta de Reprogramaci\xF3n",category:"Intentos y Programaci\xF3n",subject:"Reprogramaci\xF3n de Consultor\xEDa",labels:{"[DATA 1]":"Fecha 1","[HORA 1]":"Hora 1","[DATA 2]":"Fecha 2","[HORA 2]":"Hora 2","[DATA 3]":"Fecha 3","[HORA 3]":"Hora 3","[Seu Nome]":"Firma"},template:"<p>Hola, \xBFc\xF3mo est\xE1?</p><br><p>Estas son las pr\xF3ximas fechas disponibles:</p><ul><li><strong>[DATA 1] a las [HORA 1]</strong></li><li><strong>[DATA 2] a las [HORA 2]</strong></li><li><strong>[DATA 3] a las [HORA 3]</strong></li></ul><br><p>Tambi\xE9n le informo que si no hay respuesta a este correo en las pr\xF3ximas 48 horas el caso ser\xE1 cerrado.</p><p>Le recuerdo que mi agenda es din\xE1mica, por lo que en cualquier momento se puede agendar una consultor\xEDa para los d\xEDas disponibles. Por lo tanto, cuanto m\xE1s r\xE1pido pueda responderme, m\xE1s garantizada ser\xE1 la programaci\xF3n de la fecha y el horario.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},max_reschedules:{name:"L\xEDmite de Reprogramaciones Excedido",category:"Intentos y Programaci\xF3n",subject:"Estado de la Programaci\xF3n - Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este correo le encuentre bien.</p><p>Le escribo en nombre del equipo de Google Ads para informarle sobre su solicitud de reprogramaci\xF3n para la implementaci\xF3n de las etiquetas.</p><br><p>Lamentablemente, <strong>ya no podemos reprogramar este caso espec\xEDfico</strong>, pues hemos excedido el l\xEDmite m\xE1ximo de programaciones permitido.</p><br><p>Si desea continuar con la implementaci\xF3n de las etiquetas, ser\xE1 necesario abrir un <strong>nuevo caso</strong> directamente con la <a href="https://support.google.com/google-ads">Ayuda de Google Ads</a>. Esto garantizar\xE1 que reciba el seguimiento y el soporte necesarios para dar continuidad a su solicitud.</p><br><p>Agradecemos su participaci\xF3n en este proceso y la oportunidad de ayudar. Esperamos continuar nuestra colaboraci\xF3n.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'},"2_6_day3":{name:"D\xEDa 3 (Seguimiento)",category:"Follow Up",subject:"Consultor\xEDa con el Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]":"Acci\xF3n Pendiente","[MM/DD/YYYY]":"Fecha del Pr\xF3ximo Contacto","[Seu Nome]":"Firma"},template:"<p>Hola, <strong>[Nome do Cliente]</strong></p><br><p>\xA1Espero que se encuentre bien!</p><p>Intentamos contactarle por tel\xE9fono, pero sin \xE9xito. Me gustar\xEDa saber si ya pudo <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, o si ya tiene una previsi\xF3n de cu\xE1ndo se concluir\xE1 esa acci\xF3n.</p><br><p>Continuar\xE9 monitoreando el estado de la implementaci\xF3n en su sitio, y el d\xEDa <strong>[MM/DD/YYYY]</strong> har\xE9 un nuevo seguimiento para verificar el avance de la implementaci\xF3n.</p><p>Si tiene alg\xFAn problema o duda que le impida realizar la implementaci\xF3n, no dude en compartirlo con nosotros.</p><br><p>Quedo a disposici\xF3n.</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>"},"2_6_day6":{name:"D\xEDa 6 (Seguimiento Final)",category:"Follow Up",subject:"Consultor\xEDa con el Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[URL]":"URL del Sitio","[Seu Nome]":"Firma"},template:"<p>Hola, <strong>[Nome do Cliente]</strong></p><br><p>\xA1Espero que se encuentre bien!</p><p>Tras analizar y revisar el estado de implementaci\xF3n de la etiqueta en su sitio, <strong>[URL]</strong>, verificamos que la etiqueta a\xFAn est\xE1 pendiente de implementaci\xF3n. Intentamos contactarle por correo, pero sin \xE9xito.</p><br><p>Es esencial que sea implementada, pues ofrece una amplia gama de beneficios, como:</p><ul><li>Ayuda a rastrear conversiones en tiempo real</li><li>Mejora la generaci\xF3n de ingresos, en t\xE9rminos de clics</li><li>Sirve para vincular Google Analytics con los anuncios y hacer seguimiento de las conversiones</li><li>Proporciona informaci\xF3n sobre la experiencia del usuario</li></ul><br><p>Si tiene alg\xFAn problema o duda que le impida realizar la implementaci\xF3n, no dude en compartirlo con nosotros. Estaremos encantados de ayudar.</p><p>Si no recibimos ninguna respuesta en los pr\xF3ximos 3 d\xEDas, lamentablemente el caso ser\xE1 cerrado.</p><br><p>Quedo a disposici\xF3n.</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>"},"2_6_completed_reschedule":{name:"Acciones Concluidas (Solicitar Reprogramaci\xF3n)",category:"Follow Up",subject:"Continuidad de la Implementaci\xF3n - Soluciones T\xE9cnicas de Google",labels:{"[Disponibilidade em BAU]":"Pr\xF3xima Disponibilidad","[Seu Nome]":"Firma"},template:"<p>Hola, \xBFc\xF3mo est\xE1?</p><br><p>\xA1Excelente! Muy bueno saber que logr\xF3 concluir las acciones pendientes. Siendo as\xED, ahora podemos continuar con la implementaci\xF3n de las configuraciones en su cuenta.</p><br><p>Para eso, le pido, por favor, que me env\xEDe algunas de las pr\xF3ximas fechas y horarios en los que est\xE9 disponible a partir del d\xEDa <strong>[Disponibilidade em BAU]</strong>.</p><p>En cuanto me env\xEDe esa informaci\xF3n, crear\xE9 una reprogramaci\xF3n para que uno de nuestros agentes contin\xFAe ayud\xE1ndole.</p><br><p>Tambi\xE9n le informo que si no hay respuesta a este correo, realizar\xE9 un seguimiento de este caso durante 6 d\xEDas, en el que me pondr\xE9 en contacto cada 3 d\xEDas para intentar reprogramar su caso lo antes posible.</p><p>Le recuerdo que mi agenda es din\xE1mica, por lo que en cualquier momento se puede agendar una consultor\xEDa para los d\xEDas disponibles. Por lo tanto, cuanto m\xE1s r\xE1pido pueda responderme, m\xE1s garantizada ser\xE1 la programaci\xF3n de la fecha y el horario.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},nrp_standard:{name:"NRP - Est\xE1ndar (3.\xBA Intento)",category:"NRP / Cierre",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Cierre",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Task pedida pelo AM]":"Tarea Solicitada","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Intentamos llamarle hoy sobre el caso de Implementaci\xF3n de la etiqueta referente a la solicitud de <strong>[Task pedida pelo AM]</strong>. Se hizo otro intento despu\xE9s de 10 minutos, pero tampoco logramos contactarle.</p><p>Debido a la alta demanda, no podemos reprogramar un horario. Por eso, vamos a cerrar este caso. Sin embargo, si a\xFAn desea continuar con la implementaci\xF3n, basta con acceder a este enlace y elegir la mejor fecha y horario para hablar con nuestro equipo, o si lo prefiere, p\xF3ngase en contacto con su gerente de cuentas de Google para agendar una nueva reuni\xF3n.</p><p>Lamentamos el inconveniente y esperamos trabajar con usted nuevamente en el futuro.</p><br><p>Si desea saber m\xE1s, consulte a continuaci\xF3n algunos enlaces \xFAtiles con recursos valiosos relacionados con la implementaci\xF3n de etiquetas y el soporte de Shopping.</p><p><strong>En relaci\xF3n con las etiquetas</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Soporte para la implementaci\xF3n de etiquetas</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>En relaci\xF3n con Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">C\xF3mo configurar la cuenta y el feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Optimizaci\xF3n del feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'},nrp_dfa:{name:"NRP - DFA",category:"NRP / Cierre",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Cierre",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Intentamos llamarle hoy sobre el caso de Implementaci\xF3n de la etiqueta referente a la solicitud. Se hizo otro intento despu\xE9s de 10 minutos, pero tampoco logramos contactarle.</p><p>Debido a la alta demanda, no podemos reprogramar un horario. Por eso, vamos a cerrar este caso. Sin embargo, si a\xFAn desea continuar con la implementaci\xF3n, basta con acceder a este enlace y elegir la mejor fecha y horario para hablar con nuestro equipo.</p><p>Lamentamos el inconveniente y esperamos trabajar con usted nuevamente en el futuro.</p><br><p>Si desea saber m\xE1s, consulte a continuaci\xF3n algunos enlaces \xFAtiles con recursos valiosos relacionados con la implementaci\xF3n de etiquetas y el soporte de Shopping.</p><p><strong>En relaci\xF3n con las etiquetas</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Soporte para la implementaci\xF3n de etiquetas</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>En relaci\xF3n con Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">C\xF3mo configurar la cuenta y el feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Optimizaci\xF3n del feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'}};function si(e,t){if(t!=="es")return e;let a=La[e?.id];return a?{...e,name:a.name??e.name,category:a.category??e.category,subject:a.subject??e.subject,template:a.template??e.template,placeholders:(e.placeholders||[]).map(o=>({...o,label:a.labels?.[o.key]??o.label}))}:e}function ri(e){if(!Array.isArray(e)||!e.length)return!1;let t=e.slice().sort((n,i)=>(n.sortOrder||0)-(i.sortOrder||0)),a=[],o={};for(let n of t){let i=n.key;if(!i)continue;let r;try{r=JSON.parse(n.value||"{}")}catch{continue}!r.subject||!r.template||(String(n.lang).toUpperCase()==="ES"?o[i]={name:n.label||"",category:n.field||"",subject:r.subject,template:r.template,labels:r.labels||{}}:a.push({id:i,name:n.label||i,category:n.field||"",subject:r.subject,template:r.template,placeholders:r.placeholders||[]}))}if(!a.length)return!1;Ia.length=0,Ia.push(...a);for(let n of Object.keys(La))delete La[n];return Object.assign(La,o),!0}async function li(){let e=me.getCachedContent("email_template"),t=ri(e);try{let a=await me.fetchContentModule("email_template");t=ri(a)||t}catch(a){console.warn("Central de Conte\xFAdo indispon\xEDvel; usando modelos embutidos.",a)}return t}var ci={_templates:null,_hydrated:!1,async getTemplates(){return this._templates?this._templates:(this._hydrated||(this._hydrated=!0,await li()),this._templates=Ia,this._templates)}};var di="cw_personal_library_v1",Pt=!1,Pe={getSnippets:(e="all")=>{let t=Pe._loadFromLocal(),a=Ne();return a&&a.includes("@")&&!Pt&&Pe._syncWithServer(a),e==="all"?t:t.filter(o=>o.type===e)},save:async e=>{let t=Ne();if(!t)return v.playError(),J("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;Pt=!0;let a=Pe._loadFromLocal(),o=new Date().toISOString(),n={id:e.id||"local_"+Date.now(),type:e.type||"general",title:e.title||"Sem t\xEDtulo",content:e.content||"",subject:e.subject||"",isCode:e.isCode||!1,isRich:e.isRich||!1,updated:o,_pendingSync:!0},i=a.filter(s=>s.id!==n.id);i.unshift(n),Pe._saveToLocal(i);let r=!1;try{r=await me.saveSnippet(n,t),r?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais.")}catch(s){console.error("Erro na nuvem:",s)}finally{setTimeout(()=>{Pt=!1},2e3)}n._pendingSync=!r;let l=Pe._loadFromLocal().filter(s=>s.id!==n.id);return l.unshift(n),Pe._saveToLocal(l),{...n,synced:r}},delete:async e=>{let t=Ne();Pt=!0;let o=Pe._loadFromLocal().filter(n=>n.id!==e);return Pe._saveToLocal(o),t?me.deleteSnippet(e,t).then(()=>{setTimeout(()=>{Pt=!1},2e3)}):Pt=!1,!0},_syncWithServer:async e=>{if(window._cw_library_syncing)return;window._cw_library_syncing=!0,setTimeout(()=>{window._cw_library_syncing=!1},3e4),console.log("\u{1F504} Sincronizando biblioteca...");let t=await me.getUserSnippets(e);if(t&&t.status==="success"&&Array.isArray(t.snippets)){let a=t.snippets,o=Pe._loadFromLocal(),i=[...o.filter(s=>s._pendingSync),...a],r=JSON.stringify(i),l=JSON.stringify(o);r!==l&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),Pe._saveToLocal(i))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(di)||"[]")}catch{return[]}},_saveToLocal:e=>{localStorage.setItem(di,JSON.stringify(e))}};var pi={pt:{headerTitle:"Email Assistant",headerDesc:"Refatora\xE7\xE3o completa do m\xF3dulo de e-mail para uma experi\xEAncia moderna e eficiente.",searchPlaceholder:"Buscar templates...",previewTitle:"Preview do E-mail",noSubject:"Sem Assunto",emailCopiedToast:"E-mail copiado com sucesso!",copyErrorToast:"Erro ao copiar e-mail",fillErrorToast:"Erro ao preencher e-mail",smartCrErrorToast:"Erro ao aplicar Smart CR"},es:{headerTitle:"Email Assistant",headerDesc:"Refactorizaci\xF3n completa del m\xF3dulo de email para una experiencia moderna y eficiente.",searchPlaceholder:"Buscar plantillas...",previewTitle:"Vista Previa del Email",noSubject:"Sin Asunto",emailCopiedToast:"\xA1Email copiado con \xE9xito!",copyErrorToast:"Error al copiar el email",fillErrorToast:"Error al completar el email",smartCrErrorToast:"Error al aplicar Smart CR"}};function Je(e){let t=ce();return pi[t]?.[e]??pi.pt[e]}var ye={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",warning:"#E67E22",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"};function xs(){if(document.getElementById("cw-email-styles"))return;let e=document.createElement("style");e.id="cw-email-styles",e.textContent=`
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
        .cw-email-main { display: flex; flex: 1; overflow: hidden; background-color: ${ye.bgApp}; }

        /* --- PAINEL ESQUERDO --- */
        .cw-email-left-panel { width: 320px; background-color: #EFEFF0; border-right: 1px solid ${ye.borderSubtle}; display: flex; flex-direction: column; flex-shrink: 0; }
        .cw-email-search-container { padding: 16px; border-bottom: 1px solid ${ye.borderSubtle}; position: relative; }
        .cw-email-search-input {
            width: 100%; box-sizing: border-box; padding: 10px 14px 10px 36px;
            border-radius: 10px; border: 1.5px solid transparent; background-color: #E3E3E8;
            font-size: 15px; outline: none; color: ${ye.textPrimary};
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238A8A8E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
            background-repeat: no-repeat; background-position: 12px center;
            transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
        }
        .cw-email-search-input:focus {
            background-color: #FFFFFF; border-color: ${ye.primary};
            box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1); transform: scale(1.02);
        }
        .cw-email-clear-btn {
            position: absolute; right: 26px; top: 50%; transform: translateY(-50%);
            font-size: 10px; color: #fff; cursor: pointer; display: none;
            background-color: #C7C7CC; width: 16px; height: 16px; border-radius: 50%;
            text-align: center; line-height: 16px; font-weight: bold;
        }

        #email-template-list { flex: 1; overflow-y: auto; padding: 8px; scroll-behavior: smooth; }

        .cw-email-list-empty { padding: 40px 20px; text-align: center; color: ${ye.textSecondary}; opacity: 0.6; }
        .cw-email-list-empty-icon { font-size: 32px; margin-bottom: 12px; }
        .cw-email-list-empty-text { font-size: 14px; font-weight: 500; }

        .cw-email-cat-header {
            padding: 12px 16px 12px 24px; font-size: 11px; font-weight: 700; color: ${ye.textSecondary};
            text-transform: uppercase; letter-spacing: 0.8px; position: sticky; top: -8px;
            background-color: rgba(239, 239, 240, 0.9); z-index: 10; backdrop-filter: blur(20px);
            margin: 0 -8px 8px -8px; border-bottom: 0.5px solid ${ye.borderSubtle};
            cursor: pointer; display: flex; align-items: center; justify-content: space-between;
            user-select: none; transition: background-color 0.2s ease;
        }
        .cw-email-cat-header:hover { background-color: rgba(230, 230, 232, 0.9); }
        .cw-email-cat-header:focus-visible, .cw-email-list-item:focus-visible { outline: 2px solid ${ye.primary}; outline-offset: -2px; }
        .cw-email-cat-right { display: flex; align-items: center; }
        .cw-email-cat-badge { background-color: rgba(0, 0, 0, 0.05); padding: 2px 8px; border-radius: 10px; font-size: 10px; color: ${ye.textSecondary}; }
        .cw-email-cat-arrow { margin-left: 8px; transition: transform 0.3s ease; }

        .cw-email-list-item {
            padding: 12px 14px; font-size: 14px; cursor: pointer;
            transition: background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1), transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s cubic-bezier(0.25, 1, 0.5, 1), color 0.3s cubic-bezier(0.25, 1, 0.5, 1); border-radius: 10px;
            color: ${ye.textPrimary}; margin: 4px 6px; display: flex; align-items: center; gap: 12px;
            background-color: ${ye.bgSurface}; box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            border: 1px solid ${ye.borderSubtle}; position: relative; overflow: hidden;
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
            background-color: ${ye.primary}; box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
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
        .cw-email-right-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; background-color: ${ye.bgApp}; transition: opacity 0.15s ease, transform 0.15s ease; }
        .cw-email-fields-section { padding: 20px; border-bottom: 1px solid ${ye.borderSubtle}; background-color: ${ye.bgSurface}; max-height: 250px; overflow-y: auto; display: none; }
        .cw-email-fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .cw-email-field-label { display: block; font-size: 11px; font-weight: 700; color: ${ye.textSecondary}; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-email-field-input {
            width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px;
            border: 1.5px solid ${ye.borderSubtle}; background-color: #FBFBFD; font-size: 14px;
            transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease; outline: none;
        }
        .cw-email-field-input:focus { border-color: ${ye.primary}; background-color: #FFFFFF; box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1); }

        .cw-email-smartcr-hint {
            padding: 12px; font-size: 13px; color: #856404; background: #FFF3CD; border: 1px solid #FFEEBA;
            border-radius: 8px; display: flex; align-items: center; gap: 8px;
        }
        .cw-email-smartcr-hint-icon { font-size: 18px; }

        .cw-email-preview-section { flex: 1; display: flex; flex-direction: column; padding: 20px; background-color: ${ye.bgApp}; overflow: hidden; }
        .cw-email-preview-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .cw-email-preview-title { font-size: 12px; font-weight: 600; color: ${ye.textSecondary}; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-email-preview-actions { display: flex; gap: 8px; }
        .cw-email-preview-content {
            flex: 1; background-color: ${ye.bgSurface}; border: 1px solid ${ye.borderSubtle};
            border-radius: 8px; padding: 20px; font-size: 15px; line-height: 1.6; color: ${ye.textPrimary};
            overflow-y: auto; outline: none; box-shadow: inset 0 1px 2px rgba(0,0,0,0.02);
        }

        /* --- BOT\xD5ES DE A\xC7\xC3O --- */
        .cw-email-btn {
            padding: 8px 14px; border-radius: 10px; border: 1.5px solid ${ye.primary};
            background: transparent; color: ${ye.primary}; font-size: 13px; font-weight: 600;
            cursor: pointer; transition: background-color 0.2s cubic-bezier(0.25, 1, 0.5, 1), transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .cw-email-btn:hover { background-color: rgba(0, 122, 255, 0.05); }
        .cw-email-btn:active { transform: scale(0.94); }
        .cw-email-btn.primary {
            border: none; background: ${ye.primary}; color: #fff;
            box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }
        .cw-email-btn.primary:hover { background-color: #0062CC; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0, 122, 255, 0.4); }
        .cw-email-btn.warning { border-color: ${ye.warning}; color: ${ye.warning}; display: none; }
        .cw-email-btn.warning:hover { background-color: rgba(230, 126, 34, 0.08); }

        @media (prefers-reduced-motion: reduce) {
            .cw-animate-float { animation: none !important; }
            .cw-email-search-input, .cw-email-list-item, .cw-email-btn, .cw-email-right-panel {
                transition: opacity 0.15s ease, background-color 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}function vs(e,t){return e.map(a=>si(a,ce())).filter(a=>a.name.toLowerCase().includes(t.toLowerCase())||a.category.toLowerCase().includes(t.toLowerCase()))}function ys(e){return Object.entries(zt).filter(([t,a])=>a&&(t.toLowerCase().includes(e.toLowerCase())||a.toLowerCase().includes(e.toLowerCase()))).map(([t,a])=>({id:t,name:t.replace(/_/g," "),category:"\u26A1 Smart CRs",code:a,isSmartCR:!0}))}function ws(e){return Pe.getSnippets("email").filter(t=>t.title.toLowerCase().includes(e.toLowerCase())||t.subject&&t.subject.toLowerCase().includes(e.toLowerCase())).map(t=>{let a=[],o=t.content.match(/\[([^\]]+)\]/g);return o&&[...new Set(o)].forEach(n=>{a.push({key:n,label:n.replace("[","").replace("]",""),type:n.toLowerCase().includes("data")?"date":"text",auto:n.toLowerCase().includes("nome")&&n.toLowerCase().includes("seu")?"agentName":null})}),{id:t.id||`snippet-${Math.random()}`,name:t.title,category:"\u{1F464} Pessoal",subject:t.subject||Je("noSubject"),template:t.content,placeholders:a}})}function Ss(e,t){return[...vs(e,t),...ys(t),...ws(t)]}function ui(){let e="v6.0.0",t=!1,a=[],o=null,n="",i=new Set;xs();let r=document.createElement("div");r.id="email-assistant-popup",r.classList.add("cw-module-window","cw-email-popup"),Object.assign(r.style,He,{width:"850px",height:"650px"}),r.style.display="none",r.style.flexDirection="column";let l=ze(r,Je("headerTitle"),e,Je("headerDesc"),{popup:r},()=>k()),s=document.createElement("div");s.className="cw-email-main";let b=document.createElement("div");b.className="cw-email-left-panel";let p=document.createElement("div");p.className="cw-email-search-container";let h=document.createElement("input");h.className="cw-email-search-input",h.placeholder=Je("searchPlaceholder");let m=document.createElement("div");m.id="email-template-list",ua(m,".cw-email-cat-header, .cw-email-list-item");let g=document.createElement("div");g.className="cw-email-clear-btn",g.innerHTML="\u2715",g.onclick=()=>{h.value="",n="",g.style.display="none",Q(),h.focus()},p.appendChild(h),p.appendChild(g),b.appendChild(p),b.appendChild(m);let I=document.createElement("div");I.className="cw-email-right-panel";let x=document.createElement("div");x.className="cw-email-fields-section";let y=document.createElement("div");y.className="cw-email-preview-section";let z=document.createElement("div");z.className="cw-email-preview-header";let A=document.createElement("span");A.textContent=Je("previewTitle"),A.className="cw-email-preview-title";let $=document.createElement("div");$.className="cw-email-preview-actions";let f=(U,re=!1)=>{let B=document.createElement("button");return B.textContent=U,B.className="cw-email-btn"+(re?" primary":""),B},C=f("Copiar HTML"),P=f("Preencher no CRM",!0),q=f("Smart CR");q.classList.add("warning"),$.appendChild(q),$.appendChild(C),$.appendChild(P),z.appendChild(A),z.appendChild($);let E=document.createElement("div");E.contentEditable="true",E.className="cw-email-preview-content",y.appendChild(z),y.appendChild(E),oe(),I.appendChild(x),I.appendChild(y),s.appendChild(b),s.appendChild(I),r.appendChild(l),r.appendChild(s);let N=document.createElement("div");Object.assign(N.style,lt),r.appendChild(N),ct(r,N),document.body.appendChild(r);function k(){t=!Ve(r),t?(ke(),r.style.display="flex",ln(r),a.length===0&&F()):(Te(),r.style.display="none"),$e(t,r,"cw-btn-email")}async function F(){m.innerHTML='<div style="padding: 20px; text-align: center; color: #5f6368;">Carregando...</div>',a=await ci.getTemplates(),Q()}function H(U,re,B){let Z=document.createElement("div");Z.className="cw-email-cat-header",Z.tabIndex=0,Z.setAttribute("role","button"),Z.setAttribute("aria-expanded",String(B));let ne=document.createElement("span");ne.textContent=U,Z.appendChild(ne);let V=document.createElement("span");V.className="cw-email-cat-badge",V.textContent=re;let ie=document.createElement("span");ie.className="cw-email-cat-arrow",ie.textContent=B?"\u25BE":"\u25B8";let _=document.createElement("div");return _.className="cw-email-cat-right",_.appendChild(V),_.appendChild(ie),Z.appendChild(_),Z.onclick=()=>{i.has(U)?i.delete(U):i.add(U),Q()},Z.addEventListener("keydown",G=>{(G.key==="Enter"||G.key===" ")&&(G.preventDefault(),Z.click())}),Z}function R(U){let re=o&&o.id===U.id,B=document.createElement("div");if(B.className="cw-email-list-item"+(re?" selected":""),B.tabIndex=0,B.setAttribute("role","button"),B.setAttribute("aria-pressed",String(!!re)),re){let V=document.createElement("div");V.className="cw-email-list-indicator",B.appendChild(V)}let Z=document.createElement("span");Z.className="cw-email-list-icon",Z.innerHTML=U.isSmartCR?"\u26A1":U.category==="\u{1F464} Pessoal"?"\u{1F464}":"\u{1F4C4}",B.appendChild(Z);let ne=document.createElement("span");return ne.className="cw-email-list-text",ne.textContent=U.name,B.appendChild(ne),B.onclick=()=>de(U),B.addEventListener("keydown",V=>{(V.key==="Enter"||V.key===" ")&&(V.preventDefault(),B.click())}),B}function Q(){m.innerHTML="";let U=Ss(a,n);if(U.length===0){m.innerHTML=`
                <div class="cw-email-list-empty">
                    <div class="cw-email-list-empty-icon">\u{1F50D}</div>
                    <div class="cw-email-list-empty-text">Nenhum resultado para "${n}"</div>
                </div>`;return}[...new Set(U.map(B=>B.category))].sort((B,Z)=>B.localeCompare(Z)).forEach(B=>{let Z=i.has(B)||n.length>0,ne=U.filter(V=>V.category===B);m.appendChild(H(B,ne.length,Z)),Z&&ne.forEach(V=>{m.appendChild(R(V))})})}let le=null;async function de(U){o?.id!==U.id&&(o=U,le&&clearTimeout(le),I.style.opacity="0",I.style.transform="translateY(5px)",le=setTimeout(()=>{q.style.display=U.isSmartCR?"block":"none",P.style.display=U.isSmartCR?"none":"block",C.style.display=U.isSmartCR?"none":"block",Q(),W(),oe(),I.style.opacity="1",I.style.transform="translateY(0)",le=null},150))}function W(){if(x.innerHTML="",!o||o.isSmartCR){o?.isSmartCR?(x.style.display="block",x.innerHTML=`<div class="cw-email-smartcr-hint">
                    <span class="cw-email-smartcr-hint-icon">\u{1F4A1}</span>
                    <span>Este \xE9 um <b>Smart CR</b>. Clique no bot\xE3o laranja acima para aplicar o atalho diretamente no CRM.</span>
                </div>`):x.style.display="none";return}let U=o.placeholders&&o.placeholders.length>0;if(x.style.display=U?"block":"none",!U)return;let re=document.createElement("div");re.className="cw-email-fields-grid",(o.placeholders||[]).forEach(B=>{let Z=document.createElement("div"),ne=document.createElement("label");ne.className="cw-email-field-label",ne.textContent=B.label;let V=document.createElement("input");V.className="cw-email-field-input",V.type=B.type||"text",V.dataset.key=B.key,B.auto==="agentName"&&(V.value=Kt().split(" ")[0]),V.addEventListener("input",oe),Z.appendChild(ne),Z.appendChild(V),re.appendChild(Z)}),x.appendChild(re)}function oe(){if(!o){E.innerHTML=`
                <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center;">
                    <div class="cw-animate-float" style="width: 140px; height: 140px; margin-bottom: 24px;">
                        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="60" cy="60" r="55" fill="#f8f9fa"/>
                            <!-- Envelope Base -->
                            <path d="M30 40C30 37.7909 31.7909 36 34 36H86C88.2091 36 90 37.7909 90 40V80C90 82.2091 88.2091 84 86 84H34C31.7909 84 30 82.2091 30 80V40Z" fill="white" stroke="#e8eaed" stroke-width="2"/>
                            <!-- Detalhes decorativos (paleta Apple do m\xF3dulo, n\xE3o mais as cores oficiais do Google) -->
                            <path d="M30 40L60 60L90 40" stroke="${ye.primary}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M30 80L50 65" stroke="#FF3B30" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <path d="M90 80L70 65" stroke="#FF9500" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <!-- Small Floating icons -->
                            <circle cx="95" cy="30" r="8" fill="#34C759"/>
                            <path d="M92 30H98M95 27V33" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            <rect x="20" y="70" width="12" height="12" rx="3" fill="${ye.primary}" opacity="0.8"/>
                        </svg>
                    </div>
                    <div style="font-family: 'Google Sans', sans-serif; font-size: 18px; font-weight: 600; color: ${ye.textPrimary}; margin-bottom: 8px;">
                        Pronto para come\xE7ar?
                    </div>
                    <div style="font-size: 14px; color: ${ye.textSecondary}; line-height: 1.6; max-width: 280px; margin: 0 auto;">
                        Selecione um template \xE0 esquerda para<br>gerar o seu e-mail t\xE9cnico.
                    </div>
                </div>`;return}if(o.isSmartCR){E.innerHTML=`<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">\u26A1</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${o.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">Este atalho ir\xE1 preencher automaticamente os destinat\xE1rios e abrir o menu de Canned Responses do CRM.</div></div>`;return}let U=o.template;(x.querySelectorAll("input")||[]).forEach(B=>{let Z=B.dataset.key,ne=B.value;if(B.type==="date"&&ne){let[ie,_,G]=ne.split("-");ne=`${_}/${G}/${ie}`}ne=ne||`<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${Z}</span>`;let V=Z.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");U=U.replace(new RegExp(V,"g"),ne)}),E.innerHTML=U}return h.addEventListener("input",U=>{n=U.target.value,g.style.display=n?"block":"none",Q()}),C.onclick=()=>{let U=E.innerHTML,re=new Blob([U],{type:"text/html"}),B=E.innerText,Z=[new ClipboardItem({"text/html":re,"text/plain":new Blob([B],{type:"text/plain"})})];navigator.clipboard.write(Z).then(()=>J(Je("emailCopiedToast")),()=>{v.playError(),J(Je("copyErrorToast"),{error:!0})})},P.onclick=async()=>{if(!o)return;let U=ia(),re={...o,body:E.innerHTML};try{await Xn(re),k()}catch{v.playError(),J(Je("fillErrorToast"),{error:!0})}finally{U()}},q.onclick=async()=>{if(!o||!o.isSmartCR)return;let U=ia();try{await Na(o.code),k()}catch{v.playError(),J(Je("smartCrErrorToast"),{error:!0})}finally{U()}},Ee(()=>{let U=r.querySelector(".cw-help-title");U&&(U.textContent=Je("headerTitle"));let re=r.querySelector(".cw-help-description");re&&(re.textContent=Je("headerDesc")),h.placeholder=Je("searchPlaceholder"),A.textContent=Je("previewTitle")}),k}var mi=["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],Gt={"PT BAU":{inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:mi,fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:mi,fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{inicio:["Introducci\xF3n (Nombre y Equipo).","La llamada puede ser grabada con fines de entrenamiento y calidad de acuerdo con nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xF3n.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar contenido sensible antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos pasos (\xBFCu\xE1nto tiempo seguir\xE1 el caso?)","Encuesta de Satisfacci\xF3n.","Estar\xE9 monitoreando su caso durante XX d\xEDas para asegurarme de que todo est\xE9 funcionando correctamente. Durante este tiempo, nuestro equipo de calidad podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la cuenta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condiciones.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las herramientas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfacci\xF3n.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes d\xEDas."]}},Es=["inicio","meio","fim"];function gi(e){if(!Array.isArray(e)||!e.length)return!1;let t={},a=e.slice().sort((o,n)=>(o.sortOrder||0)-(n.sortOrder||0));for(let o of a){let n=(o.lang||"").toUpperCase(),i=o.key||"",r=o.field||"",l=o.value||"";if(!n||!i||!Es.includes(r)||!l)continue;let s=`${n} ${i}`;t[s]||(t[s]={}),(t[s][r]=t[s][r]||[]).push(l)}if(!Object.keys(t).length)return!1;for(let o of Object.keys(Gt))delete Gt[o];return Object.assign(Gt,t),!0}async function bi(e){let t=me.getCachedContent("call_script");gi(t)&&e?.();try{let a=await me.fetchContentModule("call_script");gi(a)&&e?.()}catch(a){console.warn("Central de Conte\xFAdo indispon\xEDvel; usando roteiro embutido.",a)}}var fi={pt:{headerTitle:"Call Script",headerDesc:"Guia interativo para condu\xE7\xE3o de chamadas.",loading:"Carregando...",unknownClient:"Cliente Desconhecido",notFound:"N\xE3o encontrado",activeMonitoring:"Monitoramento Ativo",cidLabel:"CID (Conta)",emailLabel:"Email de Contato",copied:"Copiado!",amMessageTitle:"Mensagem AM",amMessageSub:"Gerar aviso de insucesso",copyFinalMessage:"Copiar Mensagem Final",resize:"Redimensionar",resetScript:"Resetar Script",resetConfirm:"Resetar todo o progresso do script? Essa a\xE7\xE3o n\xE3o pode ser desfeita.",resetConfirmBtn:"Resetar",scriptNotConfigured:"Script n\xE3o configurado.",messageCopiedToast:"Mensagem copiada!",amMessage:(e,t)=>`Ol\xE1. Bom dia!

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
E-mail: ${e.clientEmail||"---"}`,dateLocale:"es-ES"}};function hi(){return ce()==="es"?"ES":"PT"}function ve(e){let t=ce();return fi[t]?.[e]??fi.pt[e]}var ge={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",danger:"#D93025",dangerBg:"#FCE8E6",success:"#34A853",successBg:"#E6F4EA"},As={inicio:{PT:"Abertura",ES:"Apertura"},meio:{PT:"Implementa\xE7\xE3o (Tag Support)",ES:"Implementaci\xF3n"},fim:{PT:"Fechamento",ES:"Cierre"}};function Cs(){if(document.getElementById("csa-styles-v2"))return;let e=document.createElement("style");e.id="csa-styles-v2",e.textContent=`
        #call-script-popup { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

        /* --- BANNER DE CONTEXTO --- */
        .csa-context-banner {
            padding: 20px 20px 16px 20px;
            background: ${ge.bgSurface};
            border-bottom: 1px solid #F1F3F4;
            display: flex; flex-direction: column; gap: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
            position: relative; z-index: 5;
        }
        .csa-ctx-top { display: flex; justify-content: space-between; align-items: center; }
        .csa-ctx-name-wrap { display: flex; align-items: center; gap: 10px; }
        .csa-ctx-name { font-size: 16px; font-weight: 500; color: ${ge.textPrimary}; }
        .csa-live-badge {
            font-size: 10px; font-weight: 700; color: ${ge.primary}; background: ${ge.primaryBg};
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
        .csa-data-pill:hover { background: ${ge.bgSurface}; border-color: #DADCE0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transform: translateY(-1px); }
        .csa-data-pill:active { transform: scale(0.98); }
        .csa-data-pill.copied { background: ${ge.successBg} !important; border-color: ${ge.success} !important; }
        .csa-pill-label { font-size: 9px; font-weight: 700; color: ${ge.textSecondary}; text-transform: uppercase; margin-bottom: 2px; letter-spacing: 0.5px; }
        .csa-data-value { font-size: 13px; color: ${ge.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .csa-data-value.mono { font-family: 'SF Mono', 'Roboto Mono', monospace; font-weight: 500; color: ${ge.primary}; }
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
            width: 100%; background: ${ge.bgSurface}; border: 1px solid #DADCE0; border-radius: 10px; padding: 10px;
            display: flex; align-items: center; gap: 12px; cursor: pointer; box-sizing: border-box;
            transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.02);
        }
        .csa-am-btn:hover { border-color: ${ge.primary}; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .csa-am-icon { background: ${ge.primaryBg}; border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .csa-am-btn-text { text-align: left; }
        .csa-am-btn-title { font-size: 11px; font-weight: 700; color: #3C4043; }
        .csa-am-btn-sub { font-size: 10px; color: ${ge.textSecondary}; }

        .csa-am-review-container { display: none; max-height: 0; opacity: 0; overflow: hidden; margin-top: 0; transition: all 0.3s ease; }
        .csa-am-review-container.visible { display: block; max-height: 300px; opacity: 1; margin-top: 12px; }
        .csa-am-message-area {
            width: 100%; height: 120px; border: 1px solid #DADCE0; border-radius: 8px; padding: 10px;
            font-family: inherit; font-size: 13px; color: #3C4043; outline: none; resize: none;
            box-sizing: border-box; background: ${ge.bgSurface}; line-height: 1.4;
        }
        .csa-am-copy-final {
            width: 100%; margin-top: 8px; padding: 10px; background: ${ge.primary}; color: white; border: none;
            border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; transition: background 0.2s;
        }
        .csa-am-copy-final.copied-flash { background: ${ge.success}; }

        /* --- BARRA DE PROGRESSO --- */
        .csa-progress-container { height: 6px; background: ${ge.borderSubtle}; width: 100%; position: relative; overflow: hidden; }
        .csa-progress-fill {
            height: 100%; width: 0%; border-radius: 0 3px 3px 0;
            transition: width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
            background: linear-gradient(90deg, ${ge.primary}, #00C6FF, ${ge.primary});
            background-size: 200% 100%;
            animation: csaShimmer 2s infinite linear;
        }
        .csa-progress-fill.complete { background: ${ge.success}; animation: none; }
        @keyframes csaShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

        /* --- SEGMENTED CONTROL (Tipo / Idioma) --- */
        .csa-content-area { padding: 16px; overflow-y: auto; flex-grow: 1; background: ${ge.bgApp}; scroll-behavior: smooth; }
        .csa-controls { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .csa-segmented-control { display: flex; background: #E3E3E8; padding: 2px; border-radius: 10px; gap: 2px; position: relative; margin-bottom: 16px; }
        .csa-segmented-control button {
            flex: 1; border: none; background: transparent; padding: 8px 4px; font-size: 12px; font-weight: 600;
            border-radius: 8px; cursor: pointer; transition: color 0.3s ease; color: ${ge.textSecondary};
            position: relative; z-index: 2;
        }
        .csa-segmented-control button.active { color: ${ge.textPrimary}; }
        .csa-segmented-indicator {
            position: absolute; top: 2px; left: 2px; bottom: 2px; background: ${ge.bgSurface};
            border-radius: 8px; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1; box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        /* --- CARDS DO CHECKLIST --- */
        .csa-card { background: ${ge.bgSurface}; border: 1px solid ${ge.borderSubtle}; border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02); }
        .csa-card.done { box-shadow: inset 4px 0 0 ${ge.success}, 0 1px 3px rgba(0,0,0,0.05); }
        .csa-card-title { font-size: 11px; font-weight: 700; color: ${ge.textSecondary}; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; user-select: none; }
        .csa-card-counter { font-size: 11px; opacity: 0.7; font-weight: 500; background: #f1f3f4; padding: 2px 8px; border-radius: 10px; }
        .csa-card-counter.done { opacity: 1; color: #1e8e3e; background: ${ge.successBg}; }

        .csa-item-row { display: flex; align-items: flex-start; padding: 10px 8px; cursor: pointer; border-radius: 10px; transition: background 0.2s ease; color: ${ge.textPrimary}; font-size: 14px; line-height: 1.5; margin-bottom: 2px; }
        .csa-item-row:not(.completed):hover { background: rgba(0, 0, 0, 0.03); }
        .csa-item-row:not(.completed):hover .csa-checkbox { border-color: ${ge.primary}; }
        .csa-item-row.completed { background: rgba(0, 0, 0, 0.02); }

        .csa-checkbox {
            min-width: 20px; height: 20px; border-radius: 50%; border: 2px solid ${ge.borderSubtle};
            margin-right: 12px; margin-top: 1px; display: flex; align-items: center; justify-content: center;
            transition: border-color 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.15s ease;
            background: #fff;
        }
        .csa-checkbox.checked { background: ${ge.primary}; border-color: ${ge.primary}; }
        .csa-checkbox.pulse { transform: scale(1.15); }

        .csa-item-text { position: relative; display: inline-block; flex: 1; transition: color 0.3s ease; }
        .csa-item-text.completed { color: ${ge.textSecondary}; }
        .csa-item-text::after { content: ''; position: absolute; left: 0; top: 50%; width: 0; height: 1.5px; background: ${ge.textSecondary}; transition: width 0.3s ease; }
        .csa-item-text.completed::after { width: 100%; }

        .csa-empty-state { padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .csa-empty-state-icon { font-size: 24px; }

        /* --- FOOTER --- */
        .csa-footer { padding: 12px 16px; border-top: 1px solid #F1F3F4; background: ${ge.bgSurface}; display: flex; justify-content: space-between; align-items: center; }
        .csa-credit { font-size: 10px; color: #bdc1c6; }
        .csa-reset-btn {
            background: transparent; border: none; color: ${ge.danger}; font-size: 12px; font-weight: 600;
            cursor: pointer; padding: 6px 12px; border-radius: 20px; transition: background 0.2s ease, transform 0.15s ease;
            display: flex; align-items: center; gap: 4px;
        }
        .csa-reset-btn:hover { background: ${ge.dangerBg}; }
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
    `,document.head.appendChild(e)}function xi(){let e="v3.1.0";Cs();let t={},a=hi(),o="BAU",n=!1,i=document.createElement("div");i.id="call-script-popup",i.classList.add("cw-module-window"),Object.assign(i.style,He,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let r={popup:i,googleLine:null},l=null;function s(){n&&Qe().then(V=>{let ie=i.querySelector("#cw-ctx-name"),_=i.querySelector("#cw-ctx-cid"),G=i.querySelector("#cw-ctx-email");if(ie&&(ie.textContent=V.advertiserName||ve("unknownClient")),_){let K=V.cid||"---";_.textContent!==K&&(_.textContent=K)}if(G){let K=V.clientEmail||ve("notFound");G.textContent!==K&&(G.textContent=K,G.title=K)}})}function b(){Qe().then(V=>{let ie=new Date().toLocaleDateString(ve("dateLocale")),_=i.querySelector("#cw-am-message-area"),G=i.querySelector("#cw-am-review-container"),K=ve("amMessage")(V,ie);_&&(_.value=K),G&&(G.classList.add("visible"),G.scrollIntoView({behavior:"smooth",block:"end"}))})}function p(){n=!Ve(i),$e(n,i,"cw-btn-script"),n?(ke(),s(),l||(l=setInterval(s,2e3))):(Te(),l&&(clearInterval(l),l=null))}let h=ze(i,ve("headerTitle"),e,ve("headerDesc"),r,()=>{p()});i.appendChild(h);let m=h.querySelector("span"),g=document.createElement("div");g.className="csa-context-banner",g.innerHTML=`
      <div class="csa-ctx-top">
          <div class="csa-ctx-name-wrap">
              <div class="csa-live-dot js-csa-monitoring" title="${ve("activeMonitoring")}"></div>
              <span id="cw-ctx-name" class="csa-ctx-name">${ve("loading")}</span>
          </div>
          <div class="csa-live-badge">Live</div>
      </div>

      <div class="csa-ctx-grid">
          <div class="csa-data-pill" id="cw-pill-cid">
              <div class="csa-pill-label js-csa-cid-label">${ve("cidLabel")}</div>
              <div id="cw-ctx-cid" class="csa-data-value mono">---</div>
              <div class="csa-copy-hint">${ve("copied")}</div>
          </div>

          <div class="csa-data-pill" id="cw-pill-email">
              <div class="csa-pill-label js-csa-email-label">${ve("emailLabel")}</div>
              <div id="cw-ctx-email" class="csa-data-value">---</div>
              <div class="csa-copy-hint">${ve("copied")}</div>
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
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${ge.primary}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </div>
                      <div class="csa-am-btn-text">
                          <div class="csa-am-btn-title js-csa-am-title">${ve("amMessageTitle")}</div>
                          <div class="csa-am-btn-sub js-csa-am-sub">${ve("amMessageSub")}</div>
                      </div>
                  </button>

                  <div id="cw-am-review-container" class="csa-am-review-container">
                      <textarea id="cw-am-message-area" class="csa-am-message-area"></textarea>
                      <button id="cw-am-copy-final" class="csa-am-copy-final">${ve("copyFinalMessage")}</button>
                  </div>
              </div>
          </div>
      </div>
  `;let I=g.querySelector("#csa-toggle-options"),x=g.querySelector("#csa-options-content"),y=g.querySelector("#csa-options-arrow"),z=!1;I.onclick=()=>{z=!z,y.classList.toggle("expanded",z),x.classList.toggle("expanded",z),v.playClick()};let A=g.querySelector("#cw-pill-message"),$=g.querySelector("#cw-am-copy-final"),f=g.querySelector("#cw-am-message-area");A.addEventListener("click",()=>{b()}),$.addEventListener("click",()=>{f.value&&(navigator.clipboard.writeText(f.value),J(ve("messageCopiedToast")),v.playSuccess(),$.classList.add("copied-flash"),$.textContent=ve("copied"),setTimeout(()=>{$.classList.remove("copied-flash"),$.textContent=ve("copyFinalMessage")},2e3))});let C=(V,ie)=>{let _=g.querySelector(V),G=g.querySelector(ie);_.onclick=()=>{let K=G.textContent;!K||K.includes("---")||K===ve("notFound")||(navigator.clipboard.writeText(K),v.playSuccess(),_.classList.add("copied"),setTimeout(()=>_.classList.remove("copied"),1500))}};i.appendChild(g);let P=document.createElement("div");P.className="csa-progress-container";let q=document.createElement("div");q.className="csa-progress-fill",P.appendChild(q),i.appendChild(P);let E=document.createElement("div");E.id="csa-content",E.className="csa-content-area",i.appendChild(E);let N=document.createElement("div");N.className="csa-footer";let k=document.createElement("span");k.className="csa-credit",k.textContent=`by ${st}`;let F=document.createElement("button");F.className="csa-reset-btn",F.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> <span class="js-csa-reset-label">${ve("resetScript")}</span>`,F.onclick=async()=>{if(await Me(ve("resetConfirm"),{danger:!0,confirmText:ve("resetConfirmBtn")})){for(let ie in t)delete t[ie];B()}},N.appendChild(k),N.appendChild(F),i.appendChild(N);let H=document.createElement("div");H.className="csa-controls";let R=document.createElement("div");R.className="csa-segmented-control",R.innerHTML=`
      <div class="csa-segmented-indicator" id="type-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-type="BAU">BAU</button>
      <button data-type="LT">LT</button>
  `,H.appendChild(R),E.appendChild(H);let Q=R.querySelectorAll("button"),le=R.querySelector("#type-indicator");Q.forEach((V,ie)=>{V.onclick=()=>{Q.forEach(_=>_.classList.remove("active")),V.classList.add("active"),le.style.transform=`translateX(${ie*(R.offsetWidth/2-2)}px)`,o=V.dataset.type,v.playClick(),B()}}),Ee(()=>{a=hi(),m&&(m.textContent=ve("headerTitle"));let V=i.querySelector(".cw-help-title");V&&(V.textContent=ve("headerTitle"));let ie=i.querySelector(".cw-help-description");ie&&(ie.textContent=ve("headerDesc"));let _=g.querySelector(".js-csa-monitoring");_&&(_.title=ve("activeMonitoring"));let G=g.querySelector(".js-csa-cid-label");G&&(G.textContent=ve("cidLabel"));let K=g.querySelector(".js-csa-email-label");K&&(K.textContent=ve("emailLabel")),g.querySelectorAll(".csa-copy-hint").forEach(u=>u.textContent=ve("copied"));let O=g.querySelector(".js-csa-am-title");O&&(O.textContent=ve("amMessageTitle"));let c=g.querySelector(".js-csa-am-sub");c&&(c.textContent=ve("amMessageSub")),$&&($.textContent=ve("copyFinalMessage"));let S=F.querySelector(".js-csa-reset-label");S&&(S.textContent=ve("resetScript")),B()});let de=document.createElement("div");de.id="csa-checklist-area",E.appendChild(de);let W=document.createElement("div");Object.assign(W.style,lt),W.className="no-drag",W.title=ve("resize"),i.appendChild(W),ct(i,W),document.body.appendChild(i),C("#cw-pill-cid","#cw-ctx-cid"),C("#cw-pill-email","#cw-ctx-email");function oe(V){return V.replace(/\n/g,"<br>")}function U(V,ie,_,G){let K=`${V}-${ie}-${G}`,O=!!t[K],c=document.createElement("div");c.className="csa-item-row"+(O?" completed":"");let S=document.createElement("div");S.className="csa-checkbox"+(O?" checked":""),S.innerHTML=O?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':"";let u=document.createElement("span");return u.className="csa-item-text"+(O?" completed":""),u.innerHTML=oe(_),c.onclick=()=>{let L=!t[K];t[K]=L,v.playClick(),c.classList.toggle("completed",L),u.classList.toggle("completed",L),S.classList.toggle("checked",L),S.innerHTML=L?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':"",L&&(S.classList.add("pulse"),setTimeout(()=>S.classList.remove("pulse"),150)),Z(V,Gt[V])},c.appendChild(S),c.appendChild(u),{row:c,isDone:O}}function re(V,ie,_){let G=document.createElement("div");G.className="csa-card";let K=document.createElement("div");K.className="csa-card-title",K.textContent=As[ie][a]||"";let O=document.createElement("span");O.className="csa-card-counter",K.appendChild(O),G.appendChild(K);let c=0;_.forEach((u,L)=>{let{row:M,isDone:te}=U(V,ie,u,L);te&&c++,G.appendChild(M)});let S=c===_.length&&_.length>0;return G.classList.toggle("done",S),O.classList.toggle("done",S),O.textContent=`${c}/${_.length}`,G}function B(){de.innerHTML="";let V=`${a} ${o}`,ie=Gt[V];if(!ie){de.innerHTML=`<div class="csa-empty-state"><div class="csa-empty-state-icon">\u2615</div><div>${ve("scriptNotConfigured")}</div></div>`,q.style.width="0%";return}let _=0,G=0;["inicio","meio","fim"].forEach(K=>{ie[K]&&(_+=ie[K].length)}),["inicio","meio","fim"].forEach(K=>{let O=ie[K];!O||O.length===0||(O.forEach((c,S)=>{let u=`${V}-${K}-${S}`;t[u]&&G++}),de.appendChild(re(V,K,O)))}),ne(_,G)}function Z(V,ie){let _=0,G=0;["inicio","meio","fim"].forEach(K=>{let O=ie[K]||[];_+=O.length,O.forEach((c,S)=>{t[`${V}-${K}-${S}`]&&G++})}),ne(_,G),setTimeout(()=>B(),200)}function ne(V,ie){let _=V===0?0:ie/V*100;q.style.width=`${_}%`,q.classList.toggle("complete",_===100)}return B(),bi(()=>B()),p}var ks={"Ponto Eletr\xF4nico":"Control de Asistencia","Ferramenta de ajuda":"Herramienta de ayuda","Intranet Google":"Intranet Google","Relat\xF3rio Follow-ups":"Informe de Follow-ups","Dashboard WFM":"Dashboard WFM","Tech Solutions SAO":"Tech Solutions SAO","Form Grava\xE7\xE3o":"Form Grabaci\xF3n","Form Escala\xE7\xE3o":"Form Escalaci\xF3n","Instru\xE7\xF5es Split":"Instrucciones Split","Single Page App":"Single Page App","Procedimento Padr\xE3o":"Procedimiento Est\xE1ndar","Valida\xE7\xE3o C\xF3digo":"Validaci\xF3n C\xF3digo","Convers\xE3o Chamada":"Conversi\xF3n Llamada","Valida\xE7\xE3o WCC":"Validaci\xF3n WCC",ECW4:"ECW4","Monitoramento EC":"Monitoreo EC","Resolu\xE7\xE3o problemas":"Resoluci\xF3n de problemas","Implementa\xE7\xE3o RMKT":"Implementaci\xF3n RMKT","Pontua\xE7\xE3o Leads":"Puntuaci\xF3n de Leads","Instala\xE7\xE3o Container":"Instalaci\xF3n Container","Instala\xE7\xE3o Config.":"Instalaci\xF3n Config.","Valida\xE7\xE3o GA4":"Validaci\xF3n GA4","Guia Dev":"Gu\xEDa Dev","Resolu\xE7\xE3o Problemas":"Resoluci\xF3n de Problemas","Dom\xEDnio Cruzado":"Dominio Cruzado","Lista Oficial":"Lista Oficial","Criador URLs":"Creador de URLs","Setup Inicial":"Setup Inicial","Otimiza\xE7\xE3o Feed":"Optimizaci\xF3n Feed","Ferramenta Interna":"Herramienta Interna",Avalia\u00E7\u00F5es:"Rese\xF1as","Feeds Offline":"Feeds Offline","Help Center":"Help Center","Guias CMS":"Gu\xEDas CMS","Solu\xE7\xF5es Iframes":"Soluciones Iframes","Ghost Ads":"Ghost Ads","Ghost Analytics":"Ghost Analytics","Ghost GTM":"Ghost GTM",Ferramenta:"Herramienta","Ghost MC":"Ghost MC","Playground JS":"Playground JS","Testador Regex":"Probador Regex","Doc. CSP":"Doc. CSP","Guia CoMo":"Gu\xEDa CoMo","Debug CoMo":"Debug CoMo","Portal Colaborador":"Portal del Colaborador","Apps e Sistemas":"Apps y Sistemas","Folha Pagamento":"N\xF3mina","Reportar problemas":"Reportar problemas","Registro chamadas":"Registro de llamadas","Erros de sistema":"Errores de sistema","BAU/Descarte/Monitoria":"BAU/Descarte/Monitoreo","Feedback positivo":"Feedback positivo","Casos dif\xEDceis":"Casos dif\xEDciles","Chat/Email Ads":"Chat/Email Ads","Chat/Email Shopping":"Chat/Email Shopping","Perfil da Empresa":"Perfil de la Empresa","Console API":"Console API","Lista de n\xFAmeros":"Lista de n\xFAmeros",Cursos:"Cursos"};function vi(e){let t=e&&typeof e=="object"?e:{desc:e},a=t.desc||"";return ce()!=="es"?a:t.descEs||ks[a]||a}var yi={pt:{headerTitle:"Central de Links",headerDesc:"Navegue pelas categorias ou use a busca.",searchPlaceholder:"Buscar ferramenta ou SOP...",recent:"Recentes",nothingHereYet:"Nada por aqui ainda",nothingHereSub:"Os links que voc\xEA abrir aparecem aqui pra acesso r\xE1pido depois.",searchResults:"Resultados da busca",nothingFound:"Nada encontrado",noLinkMatches:e=>`Nenhum link bate com "${e}".`,copyUrl:"Copiar URL",linkCopiedToast:"Link copiado!",copyFailedToast:"N\xE3o foi poss\xEDvel copiar o link.",categoryLabels:{tasks:"Tarefas",ads:"Ads",analytics:"GA4",shopping:"Shop",tech:"Tech",hr:"RH",lm:"Forms",qa:"QA",suporte:"Ajuda"}},es:{headerTitle:"Central de Enlaces",headerDesc:"Navega por las categor\xEDas o usa la b\xFAsqueda.",searchPlaceholder:"Buscar herramienta o SOP...",recent:"Recientes",nothingHereYet:"Todav\xEDa no hay nada aqu\xED",nothingHereSub:"Los enlaces que abras aparecen aqu\xED para acceso r\xE1pido despu\xE9s.",searchResults:"Resultados de la b\xFAsqueda",nothingFound:"No se encontr\xF3 nada",noLinkMatches:e=>`Ning\xFAn enlace coincide con "${e}".`,copyUrl:"Copiar URL",linkCopiedToast:"\xA1Enlace copiado!",copyFailedToast:"No se pudo copiar el enlace.",categoryLabels:{tasks:"Tareas",ads:"Ads",analytics:"GA4",shopping:"Shop",tech:"Tech",hr:"RRHH",lm:"Forms",qa:"QA",suporte:"Ayuda"}}};function Re(e){let t=ce();return yi[t]?.[e]??yi.pt[e]}function wi(e){return Re("categoryLabels")[e]??ft[e]?.label??e}var ft={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}};function Si(e){if(!Array.isArray(e)||!e.length)return!1;let t={};for(let a of e){let o=a.key;if(!o)continue;let n;try{n=JSON.parse(a.value||"{}")}catch{continue}!n.name||!n.url||(t[o]||(t[o]={label:ft[o]?.label||o,links:[]}),t[o].links.push({name:n.name,url:n.url,desc:n.desc||"",descEs:n.desc_es||""}))}if(!Object.keys(t).length)return!1;for(let a of Object.keys(ft))delete ft[a];return Object.assign(ft,t),!0}async function Ts(e){let t=me.getCachedContent("links");Si(t)&&e?.();try{let a=await me.fetchContentModule("links");Si(a)&&e?.()}catch(a){console.warn("Central de Conte\xFAdo indispon\xEDvel; usando links embutidos.",a)}}var St={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},Et={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},_a={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}};function qs(){if(document.getElementById("cw-links-styles"))return;let e=document.createElement("style");e.id="cw-links-styles",e.textContent=`
        .cw-links-layout { display: flex; height: calc(100% - 56px); width: 100%; position: relative; }

        /* --- SIDEBAR --- */
        .cw-links-sidebar {
            width: 80px; flex-shrink: 0; background: ${Et.bgSidebar};
            border-right: 1px solid ${Et.borderSubtle};
            display: flex; flex-direction: column; align-items: center;
            padding: 16px 0; overflow-y: auto; gap: 8px;
            scrollbar-width: none; z-index: 2;
        }
        .cw-links-nav-btn {
            width: 56px; height: 56px; border-radius: 16px;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            cursor: pointer; color: ${Et.textSecondary};
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
        .cw-links-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: ${Et.bgApp}; position: relative; z-index: 1; }

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
            padding: 0 12px; font-size: 14px; color: ${Et.textPrimary};
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
        .cw-links-card-title { font-size: 14px; font-weight: 600; color: ${Et.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-links-card-desc { font-size: 12px; color: ${Et.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

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
    `,document.head.appendChild(e)}var xo="cw_link_history_v4",Ns=10;function Ei(e,t){try{let a=JSON.parse(localStorage.getItem(xo)||"[]");a=a.filter(o=>o.url!==e.url),a.unshift({...e,_originalCat:t}),a=a.slice(0,Ns),localStorage.setItem(xo,JSON.stringify(a))}catch(a){console.warn("Erro ao salvar hist\xF3rico",a)}}function Ls(){try{return JSON.parse(localStorage.getItem(xo)||"[]")}catch{return[]}}function Ai(){let e="v4.6",t="",a=!1,o=null,n=!1;qs();let i=document.createElement("div");i.id="links-popup",i.classList.add("cw-module-window"),Object.assign(i.style,He,{right:"100px",width:"600px",height:"650px",background:Et.bgApp,overflow:"hidden"});let r={popup:i,googleLine:null},l=ze(i,Re("headerTitle"),e,Re("headerDesc"),r,()=>H());i.appendChild(l);let s=l.querySelector("span"),b=document.createElement("div");b.className="cw-links-layout",i.appendChild(b);let p=document.createElement("div");p.className="cw-links-sidebar",b.appendChild(p);let h=document.createElement("div");h.className="cw-links-content",b.appendChild(h);let m=document.createElement("div");m.className="cw-links-search-bar";let g=document.createElement("div");g.className="cw-links-search-wrap";let I=document.createElement("div");I.className="cw-links-search-icon",I.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';let x=document.createElement("input");x.className="cw-links-search-input",x.type="text",x.placeholder=Re("searchPlaceholder"),g.appendChild(I),g.appendChild(x),m.appendChild(g),h.appendChild(m);let y=document.createElement("div");y.className="cw-links-scroll",h.appendChild(y);let z=null;function A(){if(z)return;z=document.createElement("div"),z.className="cw-links-history-overlay";let R=document.createElement("div");R.className="cw-links-history-head",R.innerHTML=`<span class="cw-links-history-title js-links-recent">\u{1F552} ${Re("recent")}</span>`;let Q=document.createElement("button");Q.className="cw-links-history-close",Q.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',Q.onclick=()=>$(),R.appendChild(Q),z.appendChild(R);let le=document.createElement("div");le.id="cw-history-list",le.className="cw-links-history-list",z.appendChild(le),h.appendChild(z)}function $(){n&&(n=!1,C(),N())}function f(){z||A();let R=z.querySelector("#cw-history-list");R.innerHTML="";let Q=Ls();Q.length===0?R.appendChild(Wt({icon:St.history,title:Re("nothingHereYet"),subtitle:Re("nothingHereSub")})):Q.forEach(le=>{let de=F(le,St[le._originalCat],!0,le._originalCat);R.appendChild(de)}),requestAnimationFrame(()=>z.style.transform="translateY(0)")}function C(){z&&(z.style.transform="translateY(100%)")}document.addEventListener("mousedown",R=>{!n||!z||!z.contains(R.target)&&!p.contains(R.target)&&$()}),document.addEventListener("keydown",R=>{R.key==="Escape"&&n&&$()});function P(){p.innerHTML="";let R=q("history",Re("recent"),St.history);R.id="cw-sidebar-btn-history",R.onclick=()=>{v.playClick(),n=!n,n?f():C(),N()},p.appendChild(R);let Q=document.createElement("div");Q.className="cw-links-nav-sep",p.appendChild(Q),Object.keys(ft).forEach(le=>{let de=q(le,wi(le),St[le]);de.id=`cw-sidebar-btn-${le}`,de.onclick=()=>{v.playClick(),n&&$(),E(le)},p.appendChild(de)})}function q(R,Q,le){let de=document.createElement("div");de.className="cw-links-nav-btn",de.title=Q,de.dataset.key=R;let W=_a[R];W&&(de.style.setProperty("--cat-color",W.color),de.style.setProperty("--cat-bg",W.bg));let oe=document.createElement("div");oe.className="cw-links-nav-icon",oe.innerHTML=le||St.tasks;let U=document.createElement("div");return U.className="cw-links-nav-label",U.textContent=Q,de.appendChild(oe),de.appendChild(U),de}function E(R){let Q=document.getElementById(`cat-anchor-${R}`);Q&&(Q.scrollIntoView({behavior:"smooth",block:"start"}),o=R,N())}function N(){Object.keys(ft).forEach(Q=>{let le=p.querySelector(`#cw-sidebar-btn-${Q}`);le&&le.classList.toggle("active",o===Q&&!n)});let R=p.querySelector("#cw-sidebar-btn-history");R&&R.classList.toggle("history-open",n)}function k(){if(y.innerHTML="",t.trim()!==""){let Q=[];if(Object.entries(ft).forEach(([de,W])=>{let oe=W.links.filter(U=>U.name.toLowerCase().includes(t.toLowerCase())||vi(U).toLowerCase().includes(t.toLowerCase()));Q.push(...oe.map(U=>({...U,_cat:de})))}),Q.length===0){y.appendChild(Wt({icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',title:Re("nothingFound"),subtitle:Re("noLinkMatches")(t.trim())}));return}let le=document.createElement("div");le.className="cw-links-search-results-label",le.textContent=Re("searchResults"),y.appendChild(le),Q.forEach(de=>{let W=F(de,St[de._cat],!1,de._cat);y.appendChild(W)});return}Object.entries(ft).forEach(([Q,le])=>{let de=_a[Q],W=document.createElement("div"),oe=document.createElement("div");oe.id=`cat-anchor-${Q}`,oe.className="cw-links-cat-header",oe.style.setProperty("--cat-color",de.color),oe.innerHTML=`<div class="cw-links-cat-dot"></div>${wi(Q)}`,W.appendChild(oe);let U=document.createElement("div");U.className="cw-links-cat-grid",le.links.forEach(re=>{let B=F(re,St[Q],!1,Q);U.appendChild(B)}),W.appendChild(U),y.appendChild(W)});let R=document.createElement("div");R.className="cw-links-spacer",y.appendChild(R)}function F(R,Q,le,de){let W=document.createElement("a");W.className="cw-links-card",W.href=R.url,W.target="_blank",W.rel="noopener noreferrer";let oe=_a[de]||_a.history;W.style.setProperty("--cat-color",oe.color),W.style.setProperty("--cat-bg",oe.bg);let U=document.createElement("div");U.className="cw-links-icon-box",U.innerHTML=Q||St.tasks;let re=document.createElement("div");re.className="cw-links-card-meta";let B=document.createElement("div");B.className="cw-links-card-title",B.textContent=R.name;let Z=document.createElement("div");Z.className="cw-links-card-desc",Z.textContent=vi(R),re.appendChild(B),re.appendChild(Z);let ne=document.createElement("div");return ne.className="cw-links-copy-btn",ne.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',ne.title=Re("copyUrl"),W.onclick=()=>{!le&&de&&Ei(R,de)},ne.onclick=V=>{V.preventDefault(),V.stopPropagation(),navigator.clipboard.writeText(R.url).then(()=>{v.playClick(),!le&&de&&Ei(R,de),J(Re("linkCopiedToast"))}).catch(()=>{v.playError(),J(Re("copyFailedToast"),{error:!0})})},W.appendChild(U),W.appendChild(re),W.appendChild(ne),W}x.addEventListener("input",R=>{t=R.target.value,k()});function H(){a=!Ve(i),a?ke():Te(),$e(a,i,"cw-btn-links")}return document.body.appendChild(i),P(),k(),Ts(()=>{P(),k(),N()}),Ee(()=>{s&&(s.textContent=Re("headerTitle"));let R=i.querySelector(".cw-help-title");R&&(R.textContent=Re("headerTitle"));let Q=i.querySelector(".cw-help-description");Q&&(Q.textContent=Re("headerDesc")),x.placeholder=Re("searchPlaceholder"),P(),k(),N(),n&&f()}),H}var Is=60*1e3,Ii="cw_read_broadcasts",Ci={pt:{headerTitle:"Central de Avisos",headerDesc:"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",searchPlaceholder:"Buscar avisos\u2026",clearSearch:"Limpar a busca",markRead:e=>`Marcar \u201C${e}\u201D como lido`,markReadShort:"Marcar como lido",publishedBy:e=>`Publicado por ${e}`,system:"Sistema",bauAvailability:"Disponibilidade BAU",attention:"aten\xE7\xE3o",full:"total",noDates:"sem datas publicadas",asideLabel:"Estado da opera\xE7\xE3o",filtersTitle:"Filtrar por tipo",filterAll:"Todos",readTitle:"Leitura",readCount:e=>e===1?"1 lido":`${e} lidos`,markAllRead:"Marcar tudo como lido",updatedAgo:e=>`Atualizado ${e}`,swapTo:e=>`Ver disponibilidade de ${e}`,justNow:"agora",minutesAgo:e=>`h\xE1 ${e} min`,hoursAgo:e=>`h\xE1 ${e} h`,yesterday:"ontem",nothingFound:"Nada encontrado.",allRead:"Tudo lido!",history:e=>`Hist\xF3rico (${e})`,typeLabel:{info:"Info",critical:"Alerta",success:"Sucesso"},syncing:"Sincronizando\u2026",updated:"Atualizado",offline:"Sem conex\xE3o \u2014 mostrando o que j\xE1 estava aqui"},es:{headerTitle:"Central de Avisos",headerDesc:"Comunicaci\xF3n oficial de la operaci\xF3n.",searchPlaceholder:"Buscar avisos\u2026",clearSearch:"Limpiar la b\xFAsqueda",markRead:e=>`Marcar \u201C${e}\u201D como le\xEDdo`,markReadShort:"Marcar como le\xEDdo",publishedBy:e=>`Publicado por ${e}`,system:"Sistema",bauAvailability:"Disponibilidad BAU",attention:"atenci\xF3n",full:"total",noDates:"sin fechas publicadas",asideLabel:"Estado de la operaci\xF3n",filtersTitle:"Filtrar por tipo",filterAll:"Todos",readTitle:"Lectura",readCount:e=>e===1?"1 le\xEDdo":`${e} le\xEDdos`,markAllRead:"Marcar todo como le\xEDdo",updatedAgo:e=>`Actualizado ${e}`,swapTo:e=>`Ver disponibilidad de ${e}`,justNow:"ahora",minutesAgo:e=>`hace ${e} min`,hoursAgo:e=>`hace ${e} h`,yesterday:"ayer",nothingFound:"No se encontr\xF3 nada.",allRead:"\xA1Todo le\xEDdo!",history:e=>`Historial (${e})`,typeLabel:{info:"Info",critical:"Alerta",success:"\xC9xito"},syncing:"Sincronizando\u2026",updated:"Actualizado",offline:"Sin conexi\xF3n \u2014 mostrando lo que ya estaba aqu\xED"}};function be(e){let t=ce();return Ci[t]?.[e]??Ci.pt[e]}var Fa={PT:{label:"PT-BR",flag:'<svg class="cw-bc-bau-flag" viewBox="0 0 21 15" aria-hidden="true"><rect width="21" height="15" fill="#009B3A"/><path d="M10.5 1.9 19.1 7.5 10.5 13.1 1.9 7.5Z" fill="#FEDF00"/><circle cx="10.5" cy="7.5" r="3.3" fill="#002776"/></svg>'},ES:{label:"ES",flag:'<svg class="cw-bc-bau-flag" viewBox="0 0 21 15" aria-hidden="true"><rect width="21" height="15" fill="#AA151B"/><rect y="3.75" width="21" height="7.5" fill="#F1BF00"/></svg>'}},_s='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="17 2 21 6 17 10"></polyline><path d="M3 12V10a4 4 0 0 1 4-4h14"></path><polyline points="7 22 3 18 7 14"></polyline><path d="M21 12v2a4 4 0 0 1-4 4H3"></path></svg>',vo={critical:!0,info:!0,success:!0};function Fs(){if(document.getElementById("cw-broadcast-styles"))return;let e=document.createElement("style");e.id="cw-broadcast-styles",e.textContent=`
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
    `,document.head.appendChild(e)}var Ms={pt:"pt-BR",es:"es-ES"};function _i(e){if(!e)return"";try{let t=new Date(e);return isNaN(t.getTime())?String(e):new Intl.DateTimeFormat(Ms[ce()]||"pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(t)}catch{return String(e)}}function Os(e){let t=String(e||"").split("-");return t.length===3?`${t[2]}/${t[1]}`:String(e||"")}function Ds(e){let t=new Date(e).getTime();if(!t||isNaN(t))return"";let a=Math.floor((Date.now()-t)/6e4);if(a<1)return be("justNow");if(a<60)return be("minutesAgo")(a);let o=Math.floor(a/60);return o<24?be("hoursAgo")(o):o<48?be("yesterday"):_i(e).split(",")[0]}function ki(e){if(!e||typeof e!="string")return"";let t=e;return t=t.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" class="cw-bc-link">$1</a>'),t=t.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),t=t.replace(/_(.*?)_/g,"<i>$1</i>"),t=t.replace(/\n/g,"<br>"),t=cn(t),t}function Ti(e){if(!e)return null;let t={};try{t=JSON.parse(e.value||"{}")}catch{return null}let a=String(t.title||e.label||"").trim(),o=String(t.text||"").trim();return!a||!o?null:{id:String(e.key||e.id||""),type:vo[t.type]?t.type:"info",title:a,text:o,date:String(t.publishedAt||e.publishedAt||""),author:String(t.author||e.publishedBy||""),lang:String(e.lang||"ALL").toUpperCase()}}function zs(e){if(!e)return null;let t=String(e.title||"").trim(),a=String(e.text||"").trim();return!t||!a||t.toLowerCase().includes("disponibilidade bau")?null:{id:String(e.id||""),type:vo[e.type]?e.type:"info",title:t,text:a,date:String(e.date||""),author:String(e.author||""),lang:"ALL"}}function qi(e){let t=(e||[])[0];if(!t)return null;let a={};try{a=JSON.parse(t.value||"{}")}catch{return null}let o=a.segments||{},n={};return Object.keys(o).forEach(i=>{let r=String(o[i]?.attention||""),l=String(o[i]?.full||"");(r||l)&&(n[i]={attention:r,full:l})}),Object.keys(n).length?{updatedAt:String(a.updatedAt||t.publishedAt||""),author:String(a.author||t.publishedBy||""),note:String(a.note||""),segments:n}:null}function Ni(e,t){return e.lang==="ALL"||e.lang===t}function jt(){try{let e=JSON.parse(localStorage.getItem(Ii)||"[]");return Array.isArray(e)?e:[]}catch{return[]}}function Li(e){try{localStorage.setItem(Ii,JSON.stringify(e))}catch{}}function Fi(){let e="v5.0",t=!1,a=null,o="",n=null,i=null,r=!1,l=[],s=null,b=null,p=null,h=null;Fs();let m=document.createElement("div");m.id="broadcast-popup",m.classList.add("cw-module-window"),Object.assign(m.style,He,{right:"auto",left:"50%",width:"760px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",overflow:"hidden"});let g={popup:m,googleLine:null};function I(){if(t=!Ve(m),$e(t,m,"cw-btn-broadcast"),t){ke();let O=document.getElementById("cw-btn-broadcast");O&&O.classList.remove("has-new"),n=null,i=null,r=!1,Q()}else Te()}let x=ze(m,be("headerTitle"),e,be("headerDesc"),g,()=>I()),y=x.querySelector("span");m.appendChild(x);let z=document.createElement("div");z.className="cw-bc-search-wrap";let A=document.createElement("div");A.className="cw-bc-search-icon",A.setAttribute("aria-hidden","true"),A.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';let $=document.createElement("input");$.className="cw-bc-search-input no-drag",$.type="search",$.name="cw-broadcast-search",$.autocomplete="off",$.spellcheck=!1,$.placeholder=be("searchPlaceholder"),$.setAttribute("aria-label",be("searchPlaceholder"));let f=document.createElement("button");f.type="button",f.className="cw-bc-search-clear",f.setAttribute("aria-label",be("clearSearch")),f.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';let C=document.createElement("div");C.className="cw-bc-search-field",C.append(A,$,f),z.appendChild(C),m.appendChild(z),$.addEventListener("input",O=>{o=O.target.value,f.classList.toggle("visible",o.length>0),ie()}),f.onclick=()=>{$.value="",o="",f.classList.remove("visible"),ie(),$.focus()};let P=document.createElement("div");P.className="cw-bc-body",m.appendChild(P);let q=document.createElement("div");q.className="cw-nice-scroll cw-bc-feed",q.setAttribute("role","feed"),q.setAttribute("aria-label",be("headerTitle")),P.appendChild(q);let E=document.createElement("aside");E.className="cw-nice-scroll cw-bc-aside",E.setAttribute("aria-label",be("asideLabel")),P.appendChild(E);let N=document.createElement("div");N.id="cw-bau-widget",N.className="cw-bc-panel",N.style.display="none",E.appendChild(N);let k=document.createElement("div");k.className="cw-bc-panel",E.appendChild(k);let F=document.createElement("div");F.className="cw-bc-panel",E.appendChild(F);let H=document.createElement("div");H.id="cw-update-status",H.className="cw-bc-sync",H.setAttribute("role","status"),H.setAttribute("aria-live","polite"),E.appendChild(H);function R({syncing:O=!1,online:c=!0}={}){if(H.classList.toggle("offline",!O&&!c),O){H.innerHTML=`<span class="cw-bc-spinner" aria-hidden="true"></span><span>${be("syncing")}</span>`;return}let S=h?Ds(h):"",u=c?S?be("updatedAgo")(S):be("updated"):be("offline");H.innerHTML=`<span class="cw-bc-sync-dot" aria-hidden="true"></span><span>${u}</span>`}async function Q(){R({syncing:!0});let O=!0,c=Jt();try{let[S,u]=await Promise.all([me.fetchContentModule("broadcast"),me.fetchContentModule("bau_availability")]);if(Array.isArray(S)){let L=S.map(Ti).filter(Boolean).filter(M=>Ni(M,c));l=de(L)}else O=!1;s=qi(u)}catch{O=!1}O&&(h=new Date().toISOString()),le(),W(),ie(),R({online:O})}function le(){let O=s?s.updatedAt:null;if(!(b===null)&&!t){let S=jt();(l.some(M=>!b.has(M.id)&&!S.includes(M.id))||O&&O!==p)&&v.playNotification()}b=new Set(l.map(S=>S.id)),p=O}function de(O){return O.slice().sort((c,S)=>{let u=new Date(c.date).getTime()||0;return(new Date(S.date).getTime()||0)-u})}function W(){let O=document.getElementById("cw-btn-broadcast");if(!O)return;let c=jt();if(l.some(u=>!c.includes(u.id))){if(O.classList.add("has-new"),!O.querySelector(".cw-badge")){let u=document.createElement("div");u.className="cw-badge",Object.assign(u.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),O.appendChild(u)}}else{O.classList.remove("has-new");let u=O.querySelector(".cw-badge");u&&u.remove()}}function oe(){if(!s){N.style.display="none",N.innerHTML="";return}let O=Object.keys(Fa).filter(T=>s.segments[T]);if(!O.length){N.style.display="none",N.innerHTML="";return}let c=n&&O.includes(n)?n:O.includes(Jt())?Jt():O[0],S=Fa[c],u=s.segments[c]||{},L=(T,Y)=>`
          <span class="cw-bc-bau-date ${T}">
              <span class="cw-bc-bau-dot"></span>
              <span class="cw-bc-bau-kind">${be(T)}</span>
              <span class="cw-bc-bau-value">${Os(Y)}</span>
          </span>`,M=[u.attention?L("attention",u.attention):"",u.full?L("full",u.full):""].join(""),te=O.find(T=>T!==c),d=te?`<button class="cw-bc-bau-swap" type="button"
                     aria-label="${be("swapTo")(Fa[te].label)}"
                     title="${be("swapTo")(Fa[te].label)}">${_s}</button>`:"";N.style.display="flex",N.innerHTML=`
          <div class="cw-bc-bau-top">
              ${S.flag}
              <span class="cw-bc-bau-label">${be("bauAvailability")}</span>
              <span class="cw-bc-bau-seg">${S.label}</span>
              ${d}
          </div>
          <div class="cw-bc-bau-dates">
              ${M||`<span class="cw-bc-bau-empty">${be("noDates")}</span>`}
          </div>
          ${s.note?`<div class="cw-bc-bau-note">${ki(s.note)}</div>`:""}
      `;let w=N.querySelector(".cw-bc-bau-swap");w&&(w.onclick=()=>{n=te,v.playClick(),oe()})}function U(){let O={critical:0,info:0,success:0};l.forEach(u=>{O[u.type]=(O[u.type]||0)+1});let c=(u,L,M)=>`
          <button class="cw-bc-filter" type="button" data-tipo="${u}"
                  aria-pressed="${i===u}">
              ${u==="all"?"":`<span class="cw-bc-type-dot ${u}"></span>`}
              <span>${L}</span>
              <span class="cw-bc-filter-count">${M}</span>
          </button>`;k.innerHTML=`
          <div class="cw-bc-panel-title">${be("filtersTitle")}</div>
          <div class="cw-bc-filters">
              ${c("all",be("filterAll"),l.length)}
              ${Object.keys(O).map(u=>c(u,be("typeLabel")[u],O[u])).join("")}
          </div>
      `,k.querySelectorAll(".cw-bc-filter").forEach(u=>{u.onclick=()=>{let L=u.dataset.tipo;i=L==="all"||L===i?null:L,v.playClick(),ie()}});let S=k.querySelector('[data-tipo="all"]');S&&S.setAttribute("aria-pressed",String(i===null))}function re(){let O=jt(),c=l.filter(u=>O.includes(u.id)).length,S=l.length-c;F.innerHTML=`
          <div class="cw-bc-panel-title">${be("readTitle")}</div>
          <button class="cw-bc-history-divider" type="button"
                  aria-expanded="${r}" aria-controls="cw-bc-history">
              <span>${be("readCount")(c)}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <button class="cw-bc-clear-btn" type="button" ${S?"":"disabled"}>
              ${be("markAllRead")}
          </button>
      `,F.querySelector(".cw-bc-history-divider").onclick=()=>{v.playClick(),r=!r,ie()},F.querySelector(".cw-bc-clear-btn").onclick=()=>{S&&(v.playSuccess(),Li(l.map(u=>u.id)),ie(),W())}}let B=0;function Z(O,c){let S=document.createElement("article");S.className="cw-bc-card"+(c?" history":"");let u=vo[O.type]?O.type:"info",L=`cw-bc-title-${++B}`;S.setAttribute("aria-labelledby",L);let M=document.createElement("div");if(M.className="cw-bc-card-meta",M.innerHTML=`
        <span class="cw-bc-type">
            <span class="cw-bc-type-dot ${u}"></span>${be("typeLabel")[u]}
        </span>
        <span class="cw-bc-meta-sep" aria-hidden="true">\xB7</span>
        <span class="cw-bc-date-tag">${_i(O.date)}</span>
    `,!c){let T=document.createElement("button");T.type="button",T.className="cw-bc-dismiss-btn",T.setAttribute("aria-label",be("markRead")(O.title)),T.title=be("markReadShort"),T.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>',T.onclick=Y=>{Y.stopPropagation(),v.playClick(),S.style.transform="translateX(20px)",S.style.opacity="0",setTimeout(()=>{let ee=jt();ee.push(O.id),Li(ee),ie(),W()},300)},M.appendChild(T)}let te=document.createElement("h3");te.className="cw-bc-msg-title",te.id=L,te.textContent=O.title;let d=document.createElement("div");d.className="cw-bc-msg-body",d.innerHTML=ki(O.text);let w=document.createElement("div");return w.className="cw-bc-msg-author",w.textContent=be("publishedBy")(O.author||be("system")),S.append(M,te,d,w),S}function ne(O,c){return i&&O.type!==i?!1:c?`${O.title||""} ${O.text||""}`.toLowerCase().includes(c):!0}function V(O,c){let S=O.filter(L=>!c.includes(L.id)),u=O.filter(L=>c.includes(L.id));if(!S.length&&!(r&&u.length)){let L=o.trim().length>0||i!==null,M=document.createElement("div");M.className="cw-bc-empty",M.innerHTML=L?`<div>${be("nothingFound")}</div>`:`
               <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
               <div>${be("allRead")}</div>
              `,q.appendChild(M);return}if(S.forEach(L=>q.appendChild(Z(L,!1))),r&&u.length){let L=document.createElement("div");L.className="cw-bc-history-container",L.id="cw-bc-history",L.style.display="flex",u.forEach(M=>L.appendChild(Z(M,!0))),q.appendChild(L)}}function ie(){oe(),U(),re(),q.innerHTML="";let O=jt(),c=o.trim().toLowerCase();V(l.filter(S=>ne(S,c)),O)}let _=me.getCachedContent("broadcast");Array.isArray(_)&&_.length?l=de(_.map(Ti).filter(Boolean).filter(O=>Ni(O,Jt()))):l=de(me.getCachedBroadcasts().map(zs).filter(Boolean)),s=qi(me.getCachedContent("bau_availability")),ie(),Q(),a||(a=setInterval(Q,Is));let G=document.createElement("div");Object.assign(G.style,lt),G.className="no-drag",m.appendChild(G),ct(m,G),document.body.appendChild(m);let K=l.some(O=>!jt().includes(O.id));return Ee(()=>{y&&(y.textContent=be("headerTitle"));let O=m.querySelector(".cw-help-title");O&&(O.textContent=be("headerTitle"));let c=m.querySelector(".cw-help-description");c&&(c.textContent=be("headerDesc")),$.placeholder=be("searchPlaceholder"),$.setAttribute("aria-label",be("searchPlaceholder")),f.setAttribute("aria-label",be("clearSearch")),q.setAttribute("aria-label",be("headerTitle")),E.setAttribute("aria-label",be("asideLabel")),ie(),R({online:!0})}),{toggle:I,hasUnread:K}}var Mi="cw-wizard-shell-styles",Oi={pt:{back:"Voltar",skip:"Pular",next:"Pr\xF3ximo",done:"Concluir",dotsGroup:"Navega\xE7\xE3o entre os slides",report:"Reportar bug ou sugest\xE3o",slideLabel:(e,t)=>`Slide ${e} de ${t}`,announce:(e,t,a,o)=>`Slide ${e} de ${t}: ${a}. ${o}`},es:{back:"Volver",skip:"Omitir",next:"Siguiente",done:"Finalizar",dotsGroup:"Navegaci\xF3n entre las diapositivas",report:"Reportar error o sugerencia",slideLabel:(e,t)=>`Diapositiva ${e} de ${t}`,announce:(e,t,a,o)=>`Diapositiva ${e} de ${t}: ${a}. ${o}`}};function At(e){let t=ce();return Oi[t]?.[e]??Oi.pt[e]}var Di=160,yo=320,$s=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function Rs(){if(document.getElementById(Mi))return;let e=document.createElement("style");e.id=Mi,e.textContent=`
        .cw-wiz-overlay {
            --cw-wiz-swap: ${Di}ms;
            --cw-wiz-shell: ${yo}ms;

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
    `,document.head.appendChild(e)}var Bs='button:not([hidden]):not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';function Ma({slides:e,idPrefix:t,badge:a=null,nextLabel:o=null,finalLabel:n=null,skipLabel:i=null,onSkip:r=null,onClose:l=()=>{}}){let s={next:o||At("next"),final:n||At("done"),skip:i};if(!Array.isArray(e)||e.length===0)return console.warn("[wizard-shell] chamado sem slides; nada a mostrar."),{close:()=>{}};Rs();let b=`${t}-title`,p=`${t}-text`,h=document.activeElement,m=0,g=!1,I=null,x=document.createElement("div");x.className="cw-wiz-overlay",x.setAttribute("role","dialog"),x.setAttribute("aria-modal","true"),x.setAttribute("aria-labelledby",b),x.setAttribute("aria-describedby",p);let y=document.createElement("div");if(y.className="cw-wiz-card",a){let B=document.createElement("div");B.className="cw-wiz-badge",B.textContent=a,y.appendChild(B)}let z=document.createElement("div");z.className="cw-wiz-stage";let A=document.createElement("div");A.className="cw-wiz-icon",A.setAttribute("aria-hidden","true");let $=document.createElement("div");$.className="cw-wiz-title",$.id=b;let f=document.createElement("div");f.className="cw-wiz-text",f.id=p,z.appendChild(A),z.appendChild($),z.appendChild(f);let C=document.createElement("div");C.className="cw-wiz-live",C.setAttribute("aria-live","polite"),C.setAttribute("aria-atomic","true");let P=document.createElement("div");P.className="cw-wiz-dots",P.setAttribute("role","group"),P.setAttribute("aria-label",At("dotsGroup"));let q=document.createElement("div");q.className="cw-wiz-actions";let E=document.createElement("button");E.type="button",E.className="cw-wiz-btn cw-wiz-btn-ghost",E.textContent=At("back");let N=document.createElement("button");N.type="button",N.className="cw-wiz-skip",N.textContent=i||At("skip"),i||(N.hidden=!0);let k=document.createElement("button");k.type="button",k.className="cw-wiz-btn cw-wiz-btn-primary",q.appendChild(E),q.appendChild(k),i&&(y.classList.add("has-skip"),y.appendChild(N)),y.appendChild(z),y.appendChild(C),y.appendChild(P),y.appendChild(q);let F=document.createElement("div");F.className="cw-wiz-footer";let H=document.createElement("a");H.href=Dt,H.target="_blank",H.rel="noopener noreferrer",H.textContent=At("report");let R=document.createElement("span");R.textContent="\xB7",R.style.opacity="0.5",R.setAttribute("aria-hidden","true");let Q=document.createElement("span");Q.append(ce()==="es"?"creado por ":"criado por ");let le=document.createElement("span");le.className="cw-wiz-credit-name",le.textContent=st,Q.appendChild(le),F.append(H,R,Q),y.appendChild(F),x.appendChild(y);let de=e.map((B,Z)=>{let ne=document.createElement("button");return ne.type="button",ne.className="cw-wiz-dot",ne.setAttribute("aria-label",At("slideLabel")(Z+1,e.length)),ne.onmouseenter=()=>v.playHover(),ne.onclick=()=>{Z!==m&&(v.playClick(),oe(Z))},P.appendChild(ne),ne});function W(B){let Z=e[B];A.textContent=Z.icon||"",$.textContent=Z.title||"",f.textContent=Z.text||"",de.forEach((V,ie)=>{V.classList.toggle("active",ie===B),V.setAttribute("aria-current",ie===B?"true":"false")});let ne=B===e.length-1;k.textContent=ne?s.final:s.next,E.hidden=B===0,N.hidden=!i||ne,C.textContent=At("announce")(B+1,e.length,Z.title,Z.text)}function oe(B){if(g||B===m||B<0||B>=e.length)return;let Z=B>m?"swapping-next":"swapping-prev";if(m=B,$s()){W(B);return}clearTimeout(I),z.classList.add(Z),I=setTimeout(()=>{W(B),z.classList.remove("swapping-next","swapping-prev")},Di)}function U({silent:B=!1}={}){g||(g=!0,clearTimeout(I),document.removeEventListener("keydown",re,!0),x.classList.add("closing"),x.classList.remove("open"),y.style.willChange="opacity, transform",B||v.playSuccess(),setTimeout(()=>{if(x.remove(),Te(),h&&document.contains(h))try{h.focus({preventScroll:!0})}catch{}l()},yo))}function re(B){if(!g){if(B.key==="Tab"){let Z=Array.from(y.querySelectorAll(Bs)).filter(ie=>!ie.hidden&&ie.offsetParent!==null);if(Z.length===0)return;let ne=Z[0],V=Z[Z.length-1];B.shiftKey&&document.activeElement===ne?(B.preventDefault(),V.focus()):!B.shiftKey&&document.activeElement===V&&(B.preventDefault(),ne.focus());return}if(B.key==="Enter"){if(document.activeElement&&document.activeElement.classList.contains("cw-wiz-dot"))return;B.preventDefault(),B.stopPropagation(),k.click()}else B.key==="Escape"?(B.preventDefault(),B.stopPropagation(),N.hidden?U():N.click()):B.key==="ArrowRight"?(B.preventDefault(),m<e.length-1&&(v.playClick(),oe(m+1))):B.key==="ArrowLeft"&&(B.preventDefault(),m>0&&(v.playClick(),oe(m-1)))}}return[E,N,k].forEach(B=>{B.onmouseenter=()=>v.playHover()}),k.onclick=()=>{v.playClick(),m<e.length-1?oe(m+1):U()},E.onclick=()=>{v.playClick(),oe(m-1)},N.onclick=async()=>{v.playClick(),!(typeof r=="function"&&!await r())&&U({silent:!0})},document.body.appendChild(x),ke(),W(0),y.style.willChange="opacity, transform",requestAnimationFrame(()=>{x.classList.add("open")}),setTimeout(()=>{y.style.removeProperty("will-change"),k.focus({preventScroll:!0})},yo),document.addEventListener("keydown",re,!0),{close:U}}var zi="cw_onboarding_seen_v1",$i={pt:[{icon:"\u{1F680}",title:"Bem-vindo ao Case Wizard",text:"Uma camada de produtividade que roda por cima do CRM. Ela n\xE3o substitui nada do que voc\xEA j\xE1 usa \u2014 s\xF3 tira o trabalho repetitivo do caminho."},{icon:"\u2328\uFE0F",title:"Tudo come\xE7a em dois lugares",text:"A p\xEDlula flutuante, sempre no canto da tela, abre qualquer m\xF3dulo com um clique. E Ctrl+K (ou \u2318K) abre a paleta de comandos: digite o que quer e v\xE1 direto, sem tirar a m\xE3o do teclado."},{icon:"\u{1F4DD}",title:"Notas e BAU sem retrabalho",text:"O Case Notes monta a nota t\xE9cnica do caso a partir do status e das tasks que voc\xEA marcar. O BAU Form cuida das solicita\xE7\xF5es de cria\xE7\xE3o e descarte, passo a passo."},{icon:"\u{1F4AC}",title:"Na hora de falar com o cliente",text:"O Email Assistant sugere templates que leem o contexto do caso, e o Call Script te guia pela chamada com um roteiro interativo \u2014 sem script decorado."},{icon:"\u{1F4DA}",title:"Seu material e o do time",text:'Minha Biblioteca guarda seus snippets e respostas prontas. A Central de Links re\xFAne SOPs e ferramentas, os Avisos trazem disponibilidade BAU, e os Fusos Hor\xE1rios respondem "que horas s\xE3o pra ele agora?".'},{icon:"\u{1F6DF}",title:"Nada se perde",text:"O que voc\xEA digita \xE9 salvo sozinho a cada poucos segundos, e d\xE1 pra estacionar um caso no meio e retomar de onde parou. Fechar a aba sem querer n\xE3o custa mais nada. Bom trabalho!"}],es:[{icon:"\u{1F680}",title:"Bienvenido a Case Wizard",text:"Una capa de productividad que funciona sobre el CRM. No reemplaza nada de lo que ya usas \u2014 solo quita el trabajo repetitivo del camino."},{icon:"\u2328\uFE0F",title:"Todo empieza en dos lugares",text:"La p\xEDldora flotante, siempre en la esquina de la pantalla, abre cualquier m\xF3dulo con un clic. Y Ctrl+K (o \u2318K) abre la paleta de comandos: escribe lo que buscas y ve directo, sin soltar el teclado."},{icon:"\u{1F4DD}",title:"Notas y BAU sin rehacer trabajo",text:"Case Notes arma la nota t\xE9cnica del caso a partir del estado y de las tareas que marques. BAU Form se encarga de las solicitudes de creaci\xF3n y descarte, paso a paso."},{icon:"\u{1F4AC}",title:"A la hora de hablar con el cliente",text:"Email Assistant sugiere plantillas que leen el contexto del caso, y Call Script te gu\xEDa por la llamada con un guion interactivo \u2014 sin nada memorizado."},{icon:"\u{1F4DA}",title:"Tu material y el del equipo",text:'Mi Biblioteca guarda tus fragmentos y respuestas listas. La Central de Enlaces re\xFAne SOPs y herramientas, los Avisos traen la disponibilidad BAU, y las Zonas Horarias responden "\xBFqu\xE9 hora es para \xE9l ahora?".'},{icon:"\u{1F6DF}",title:"Nada se pierde",text:"Lo que escribes se guarda solo cada pocos segundos, y puedes aparcar un caso a mitad de camino y retomarlo donde lo dejaste. Cerrar la pesta\xF1a sin querer ya no cuesta nada. \xA1Buen trabajo!"}]},Ri={pt:{next:"Pr\xF3ximo",start:"Come\xE7ar \u{1F680}",skip:"Pular",skipConfirm:"Pular a apresenta\xE7\xE3o? Voc\xEA pode explorar tudo pelo menu flutuante.",readyToast:"Tudo pronto! Use o menu flutuante ou Ctrl+K."},es:{next:"Siguiente",start:"Empezar \u{1F680}",skip:"Omitir",skipConfirm:"\xBFOmitir la presentaci\xF3n? Puedes explorar todo desde el men\xFA flotante.",readyToast:"\xA1Todo listo! Usa el men\xFA flotante o Ctrl+K."}};function Bi(){if(localStorage.getItem(zi))return;localStorage.setItem(zi,"true");let e=ce(),t=$i[e]||$i.pt,a=Ri[e]||Ri.pt;Ma({slides:t,idPrefix:"cw-onboarding",nextLabel:a.next,finalLabel:a.start,skipLabel:a.skip,onSkip:()=>Me(a.skipConfirm),onClose:()=>J(a.readyToast)})}var Oa={version:"v6.3.0",title:"Case Wizard v6.3.0",slides:[{icon:"\u{1F550}",title:"O hor\xE1rio do agendamento agora diz de que fuso ele \xE9",text:"Antes voc\xEA digitava o hor\xE1rio do cliente e o campo n\xE3o guardava de onde ele era \u2014 quem lia depois adivinhava. Agora o fuso \xE9 escolhido junto com a data, e a hora virou uma lista em 24h: n\xE3o tem mais AM/PM para trocar sem perceber. Os fusos dos Estados Unidos entraram (inclusive Arizona, que n\xE3o faz hor\xE1rio de ver\xE3o), e a tela mostra ao lado quanto d\xE1 em Bras\xEDlia."},{icon:"\u270D\uFE0F",title:"Menos campo para preencher \xE0 m\xE3o",text:'Sobrenome e telefone do anunciante passam a ser capturados da p\xE1gina junto com o resto, e aparecem para voc\xEA editar quando a captura falha. O idioma parou de ir como "N/A": ele nasce no idioma que voc\xEA atende e continua troc\xE1vel caso este atendimento fuja da regra. E quando a lideran\xE7a aprova seu caso, o e-mail agora diz qual caso foi criado, em vez de s\xF3 avisar que foi.'},{icon:"\u2705",title:"Para a lideran\xE7a: aprovar agora registra o caso gerado",text:"Ao aprovar uma abertura, o painel pede o ID do caso BAU que voc\xEA criou no CRM. Ele fica no hist\xF3rico como link, entra na busca, e vai no e-mail do agente. O hist\xF3rico tamb\xE9m ganhou per\xEDodo \u2014 7, 30 ou 90 dias \u2014 e diz na tela at\xE9 onde ele alcan\xE7a, j\xE1 que o backup semanal arquiva os casos finalizados."}]};var za="cw_last_version",Pi={pt:{updateBadge:e=>`Atualiza\xE7\xE3o ${e}`,nextBtn:"Pr\xF3ximo",doneBtn:"Entendi, vamos l\xE1! \u{1F44D}",updatedToast:e=>`Case Wizard atualizado para ${e}!`},es:{updateBadge:e=>`Actualizaci\xF3n ${e}`,nextBtn:"Siguiente",doneBtn:"\xA1Entendido, vamos! \u{1F44D}",updatedToast:e=>`\xA1Case Wizard actualizado a ${e}!`}};function Da(e){let t=ce();return Pi[t]?.[e]??Pi.pt[e]}function Gi(e){let t=localStorage.getItem(za);if(!t){localStorage.setItem(za,e);return}if(t!==e){if(Oa.version!==e){console.warn(`[changelog] APP_VERSION \xE9 ${e} mas RELEASE_NOTES.version \xE9 ${Oa.version}. Modal suprimido at\xE9 os dois baterem (veja src/modules/changelog/changelog-data.js).`),localStorage.setItem(za,e);return}Ps(e)}}function Ps(e){Ma({slides:Oa.slides,idPrefix:"cw-changelog",badge:Da("updateBadge")(e),nextLabel:Da("nextBtn"),finalLabel:Da("doneBtn"),onClose:()=>{localStorage.setItem(za,e),J(Da("updatedToast")(e))}})}var _t=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"br",name:"Brasil \u2014 Bras\xEDlia",flag:"\u{1F1E7}\u{1F1F7}",zone:"America/Sao_Paulo",label:"S\xE3o Paulo",region:"sa",home:!0},{id:"br-am",name:"Brasil \u2014 Amazonas",flag:"\u{1F1E7}\u{1F1F7}",zone:"America/Manaus",label:"Manaus",region:"sa",home:!0},{id:"br-ac",name:"Brasil \u2014 Acre",flag:"\u{1F1E7}\u{1F1F7}",zone:"America/Rio_Branco",label:"Rio Branco",region:"sa",home:!0},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"us-et",name:"EUA \u2014 Eastern",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/New_York",label:"Nova York",region:"us"},{id:"us-ct",name:"EUA \u2014 Central",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Chicago",label:"Chicago",region:"us"},{id:"us-mt",name:"EUA \u2014 Mountain",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Denver",label:"Denver",region:"us"},{id:"us-az",name:"EUA \u2014 Arizona",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Phoenix",label:"Phoenix",region:"us"},{id:"us-pt",name:"EUA \u2014 Pacific",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Los_Angeles",label:"Los Angeles",region:"us"},{id:"us-ak",name:"EUA \u2014 Alaska",flag:"\u{1F1FA}\u{1F1F8}",zone:"America/Anchorage",label:"Anchorage",region:"us"},{id:"us-hi",name:"EUA \u2014 Hava\xED",flag:"\u{1F1FA}\u{1F1F8}",zone:"Pacific/Honolulu",label:"Honolulu",region:"us"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],Ct="America/Sao_Paulo";function ji(e,t){let a=new Intl.DateTimeFormat("en-US",{timeZone:e,hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}),o={};a.formatToParts(t).forEach(i=>{o[i.type]=i.value});let n=Date.UTC(Number(o.year),Number(o.month)-1,Number(o.day),Number(o.hour)%24,Number(o.minute),Number(o.second));return Math.round((n-t.getTime())/6e4)}function Gs(e,t){let a=String(t||"").match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);if(!a)return null;let[,o,n,i,r,l]=a.map(Number),s=Date.UTC(o,n-1,i,r,l),b=ji(e,new Date(s));return b=ji(e,new Date(s-b*6e4)),b}function js(e){let t=e<0?"-":"+",a=Math.abs(e),o=String(Math.floor(a/60)).padStart(2,"0"),n=String(a%60).padStart(2,"0");return`${t}${o}:${n}`}function wo(e,t){if(!e)return"";if(/[+-]\d{2}:\d{2}$/.test(e)||/Z$/.test(e))return e;let a=Gs(t,e);return a===null?e:`${e.slice(0,16)}${js(a)}`}var Hi={"brazil/east":"America/Sao_Paulo","brazil/west":"America/Manaus","brazil/acre":"America/Rio_Branco","us/eastern":"America/New_York","us/central":"America/Chicago","us/mountain":"America/Denver","us/arizona":"America/Phoenix","us/pacific":"America/Los_Angeles","us/alaska":"America/Anchorage","us/hawaii":"Pacific/Honolulu","america/argentina/buenos_aires":"America/Argentina/Buenos_Aires","mexico/general":"America/Mexico_City"};function So(e){let t=String(e||"").trim();if(!t)return null;let a=t.toLowerCase();if(Hi[a])return Hi[a];let o=_t.find(n=>n.zone.toLowerCase()===a);return o?o.zone:null}var Ui="cw_timezone_pinned",Yi={es:{name:"Espa\xF1a"},bo:{name:"Bolivia"},co:{name:"Colombia"},ec:{name:"Ecuador"},py:{name:"Paraguay",label:"Asunci\xF3n"},uy:{name:"Uruguay",label:"Montevideo"},ni:{name:"Nicaragua",label:"Managua"},pr:{name:"Puerto Rico"},gt:{label:"C. de Guatemala"},pa:{label:"C. de Panam\xE1"}};function ht(e){return ce()==="es"?Yi[e.id]?.name??e.name:e.name}function Eo(e){return ce()==="es"?Yi[e.id]?.label??e.label:e.label}var Vi={pt:{headerDesc:"Monitoramento global e planejamento de chamadas.",tabLive:"Monitoramento",tabPlan:"Planejador",searchPlaceholder:"Buscar cidade ou pa\xEDs...",noLocationFound:"Nenhum local encontrado",unpin:"Desafixar",pin:"Fixar",statusOpen:"Aberto",statusOpening:"Abrindo",statusClosing:"Fechando",statusClosed:"Fechado",whereIsClient:"Onde est\xE1 o cliente?",you:"Voc\xEA",yourTimezone:"Bras\xEDlia (GMT-3)",client:"Cliente",dragToSimulate:"Arraste para simular o hor\xE1rio:",idealBusinessHours:"Hor\xE1rio Comercial Ideal",limitHours:"Hor\xE1rio Limite (Aten\xE7\xE3o)",outOfHours:"Fora de Hor\xE1rio",filters:{all:"Todos",sa:"Am\xE9rica do Sul",us:"Estados Unidos",na:"Norte & Central",eu:"Europa"}},es:{headerDesc:"Monitoreo global y planificaci\xF3n de llamadas.",tabLive:"Monitoreo",tabPlan:"Planificador",searchPlaceholder:"Buscar ciudad o pa\xEDs...",noLocationFound:"No se encontr\xF3 ning\xFAn lugar",unpin:"Desanclar",pin:"Anclar",statusOpen:"Abierto",statusOpening:"Abriendo",statusClosing:"Cerrando",statusClosed:"Cerrado",whereIsClient:"\xBFD\xF3nde est\xE1 el cliente?",you:"T\xFA",yourTimezone:"Brasilia (GMT-3)",client:"Cliente",dragToSimulate:"Arrastra para simular el horario:",idealBusinessHours:"Horario Comercial Ideal",limitHours:"Horario L\xEDmite (Atenci\xF3n)",outOfHours:"Fuera de Horario",filters:{all:"Todos",sa:"Am\xE9rica del Sur",us:"Estados Unidos",na:"Norte y Central",eu:"Europa"}}};function Ae(e){let t=ce();return Vi[t]?.[e]??Vi.pt[e]}var Ao=_t.filter(e=>!e.home),Wi=[{id:"all"},{id:"sa"},{id:"us"},{id:"na"},{id:"eu"}];function Hs(){if(document.getElementById("cw-timezone-interactive-styles"))return;let e=document.createElement("style");e.id="cw-timezone-interactive-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function Xi(){Hs();let e="v2.2 Pro",t=!1,a=null,o="mx",n=JSON.parse(localStorage.getItem(Ui)||"[]"),i="",r="all",l=new Date;l.setHours(14,0,0,0);let s={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},b={container:{display:"flex",flexDirection:"column",height:"100%",background:s.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:s.surface,borderBottom:`1px solid ${s.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:s.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:s.primary,borderBottomColor:s.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:s.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:s.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${s.border}`,background:s.surface,color:s.textSub,transition:"all 0.2s"},chipActive:{background:s.primaryBg,color:s.primary,borderColor:s.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:s.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${s.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:s.surface,border:`1px solid ${s.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:s.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},p=document.createElement("div");p.id="timezone-popup",p.classList.add("cw-module-window"),Object.assign(p.style,He,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let h={popup:p},m=ze(p,"Time Zone Traveler",e,Ae("headerDesc"),h,()=>de());p.appendChild(m);let g=document.createElement("div");Object.assign(g.style,b.container),p.appendChild(g);let I=document.createElement("div");Object.assign(I.style,b.tabHeader);let x=document.createElement("div");x.textContent=Ae("tabLive"),x.className="tz-tab-btn",x.tabIndex=0,x.setAttribute("role","tab"),Object.assign(x.style,b.tabBtn,b.tabActive);let y=document.createElement("div");y.textContent=Ae("tabPlan"),y.className="tz-tab-btn",y.tabIndex=0,y.setAttribute("role","tab"),Object.assign(y.style,b.tabBtn),[x,y].forEach(W=>{W.addEventListener("keydown",oe=>{(oe.key==="Enter"||oe.key===" ")&&(oe.preventDefault(),W.click())})}),I.appendChild(x),I.appendChild(y),g.appendChild(I);let z=document.createElement("div");Object.assign(z.style,b.toolbar);let A=document.createElement("div");Object.assign(A.style,b.searchInputWrapper);let $=document.createElement("div");$.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign($.style,b.searchIcon);let f=document.createElement("input");f.placeholder=Ae("searchPlaceholder"),Object.assign(f.style,b.searchInput),f.onfocus=()=>{f.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",f.style.borderColor="rgba(26,115,232,0.3)"},f.onblur=()=>{f.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",f.style.borderColor="transparent"},f.oninput=W=>{i=W.target.value.toLowerCase(),H()},A.appendChild($),A.appendChild(f),z.appendChild(A);let C=document.createElement("div");Object.assign(C.style,b.chipsRow),Wi.forEach(W=>{let oe=document.createElement("div");oe.textContent=Ae("filters")[W.id],oe.id=`tz-filter-${W.id}`,oe.className="tz-chip",oe.tabIndex=0,oe.setAttribute("role","button"),Object.assign(oe.style,b.chip),W.id===r&&Object.assign(oe.style,b.chipActive),oe.onclick=()=>{v.playClick(),r=W.id,Array.from(C.children).forEach(U=>{Object.assign(U.style,b.chip)}),Object.assign(oe.style,b.chipActive),H()},oe.addEventListener("keydown",U=>{(U.key==="Enter"||U.key===" ")&&(U.preventDefault(),oe.click())}),C.appendChild(oe)}),z.appendChild(C),g.appendChild(z);let P=document.createElement("div");Object.assign(P.style,b.listContainer);let q=document.createElement("style");q.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",g.appendChild(q);let E=document.createElement("div");Object.assign(E.style,b.plannerWrapper,{display:"none"}),g.appendChild(P),g.appendChild(E),x.onclick=()=>N("live"),y.onclick=()=>N("plan");function N(W){v.playClick(),W==="live"?(Object.assign(x.style,b.tabActive),Object.assign(y.style,b.tabBtn),y.style.borderBottomColor="transparent",x.setAttribute("aria-selected","true"),y.setAttribute("aria-selected","false"),P.style.display="flex",z.style.display="flex",E.style.display="none",Q()):(Object.assign(y.style,b.tabActive),Object.assign(x.style,b.tabBtn),x.style.borderBottomColor="transparent",E.style.display="flex",P.style.display="none",z.style.display="none",le(),R())}function k(W){return W>=9&&W<17?{color:s.success,bg:s.successBg,label:Ae("statusOpen"),icon:"\u{1F7E2}"}:W>=8&&W<9?{color:s.warning,bg:s.warningBg,label:Ae("statusOpening"),icon:"\u{1F7E1}"}:W>=17&&W<19?{color:s.warning,bg:s.warningBg,label:Ae("statusClosing"),icon:"\u{1F7E1}"}:{color:s.textSub,bg:"#F1F3F4",label:Ae("statusClosed"),icon:"\u{1F534}"}}function F(W){n.includes(W)?n=n.filter(oe=>oe!==W):n.push(W),localStorage.setItem(Ui,JSON.stringify(n)),H(),v.playClick()}function H(){P.innerHTML="";let W=new Date,oe=Ao.filter(re=>{let B=ht(re).toLowerCase().includes(i)||Eo(re).toLowerCase().includes(i),Z=r==="all"||re.region===r;return B&&Z});if(oe.sort((re,B)=>{let Z=n.includes(re.id),ne=n.includes(B.id);return Z&&!ne?-1:!Z&&ne?1:ht(re).localeCompare(ht(B))}),oe.length===0){P.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">${Ae("noLocationFound")}</div>
                </div>
            `;return}oe.forEach(re=>{let B=n.includes(re.id),Z=W.toLocaleTimeString(ce()==="es"?"es-ES":"pt-BR",{timeZone:re.zone,hour:"2-digit",minute:"2-digit"}),ne=parseInt(Z.split(":")[0]),V=k(ne),ie=ne<6||ne>18,_=document.createElement("div");_.className="tz-hub-card",_.tabIndex=0,_.setAttribute("role","button"),_.setAttribute("aria-label",`${ht(re)}, ${Z}`),Object.assign(_.style,b.hubCard),B&&Object.assign(_.style,b.hubCardPinned);let G=B?"\u2605":"\u2606",K=B?"#F9AB00":"#DADCE0";_.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn tz-pin-btn" tabindex="0" role="button" aria-label="${Ae(B?"unpin":"pin")} ${ht(re)}" style="cursor:pointer; font-size:22px; color:${K}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%;">${G}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${re.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${s.text}; letter-spacing:-0.2px;">${ht(re)}</div>
                        <div style="font-size:12px; color:${s.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${ie?"\u{1F319}":"\u2600\uFE0F"} ${Eo(re)}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${s.text}; font-family:'Google Sans', sans-serif;">${Z}</div>
                    <div style="font-size:11px; font-weight:600; color:${V.color}; background:${V.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${V.label}
                    </div>
                </div>
            `;let O=_.querySelector(".cw-pin-btn");O.onclick=c=>{c.stopPropagation(),F(re.id)},O.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),c.stopPropagation(),F(re.id))}),_.onclick=()=>{o=re.id,N("plan")},_.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&c.target===_&&(c.preventDefault(),_.click())}),P.appendChild(_)});let U=document.createElement("div");U.style.height="20px",U.style.width="100%",P.appendChild(U)}function R(){E.innerHTML="";let W=document.createElement("div"),oe=document.createElement("label");oe.textContent=Ae("whereIsClient"),oe.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let U=document.createElement("select");Object.assign(U.style,nn),U.style.padding="14px",[...Ao].sort((d,w)=>ht(d).localeCompare(ht(w))).forEach(d=>{let w=document.createElement("option");w.value=d.id,w.textContent=`${d.flag} ${ht(d)} (${d.zone})`,d.id===o&&(w.selected=!0),U.appendChild(w)}),U.onchange=d=>{o=d.target.value,te(),v.playClick()},W.appendChild(oe),W.appendChild(U),E.appendChild(W);let B=document.createElement("div");Object.assign(B.style,b.timeComparisonRow);let Z=document.createElement("div");Object.assign(Z.style,b.timeCard),Z.style.backgroundColor="#F8FAFF",Z.style.borderColor="#E8F0FE",Z.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} ${Ae("you")}</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">${Ae("yourTimezone")}</div>
        `;let ne=document.createElement("div");Object.assign(ne.style,b.timeCard),ne.style.backgroundColor="#FFF8E1",ne.style.borderColor="#FEF7E0",ne.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">${Ae("client")}</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,B.appendChild(Z),B.appendChild(ne),E.appendChild(B);let V=document.createElement("div");V.id="cw-planner-status",Object.assign(V.style,b.statusBadge),E.appendChild(V);let ie=document.createElement("div");Object.assign(ie.style,{padding:"0 4px",marginTop:"12px"});let _=document.createElement("div");_.textContent=Ae("dragToSimulate"),_.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let G=document.createElement("div");Object.assign(G.style,b.timelineContainer);let K=document.createElement("div");Object.assign(K.style,b.timelineTrack);let O=document.createElement("div");Object.assign(O.style,b.dayZone),K.appendChild(O);let c=document.createElement("input");c.type="range",c.min="0",c.max="1439",c.step="15",c.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let S=document.createElement("div");S.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",S.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",G.appendChild(K),G.appendChild(c),G.appendChild(S),ie.appendChild(_),ie.appendChild(G),E.appendChild(ie);let u=Z.querySelector("#cw-time-input-br"),L=ne.querySelector("#cw-time-display-client"),M=ne.querySelector("#cw-client-label");function te(){let d=Ao.find(se=>se.id===o);M.textContent=`${d.flag} ${Eo(d)} (${d.zone})`;let w=l.getHours(),T=l.getMinutes(),Y=`${String(w).padStart(2,"0")}:${String(T).padStart(2,"0")}`;u.value=Y,c.value=w*60+T;let ee=l.toLocaleTimeString(ce()==="es"?"es-ES":"pt-BR",{timeZone:d.zone,hour:"2-digit",minute:"2-digit"});L.textContent=ee;let ae=parseInt(ee.split(":")[0]);ae>=9&&ae<17?(V.style.background=s.successBg,V.style.color=s.success,V.innerHTML=`<span style="font-size:16px">\u2705</span> ${Ae("idealBusinessHours")}`):ae>=8&&ae<9||ae>=17&&ae<19?(V.style.background=s.warningBg,V.style.color=s.warning,V.innerHTML=`<span style="font-size:16px">\u26A0\uFE0F</span> ${Ae("limitHours")}`):(V.style.background=s.errorBg,V.style.color=s.error,V.innerHTML=`<span style="font-size:16px">\u26D4</span> ${Ae("outOfHours")}`)}c.oninput=d=>{let w=parseInt(d.target.value);l.setHours(Math.floor(w/60)),l.setMinutes(w%60),te()},u.oninput=d=>{let[w,T]=d.target.value.split(":");w&&T&&(l.setHours(parseInt(w)),l.setMinutes(parseInt(T)),te())},te()}function Q(){H(),a||(a=setInterval(H,6e4))}function le(){a&&(clearInterval(a),a=null)}function de(){t=!Ve(p),$e(t,p,"cw-btn-timezone"),t?(ke(),N("live")):(Te(),le())}return document.body.appendChild(p),Ee(()=>{let W=p.querySelector(".cw-help-description");W&&(W.textContent=Ae("headerDesc")),x.textContent=Ae("tabLive"),y.textContent=Ae("tabPlan"),f.placeholder=Ae("searchPlaceholder"),Array.from(C.children).forEach(oe=>{let U=Wi.find(re=>`tz-filter-${re.id}`===oe.id);U&&(oe.textContent=Ae("filters")[U.id])}),P.style.display!=="none"&&H(),E.style.display!=="none"&&R()}),de}var Ki={pt:{headerTitle:"Minha Biblioteca",headerDesc:"Gerencie seus snippets, textos e templates.",tabs:{general:"Geral",note:"Notas",email:"Emails"},searchPlaceholder:"Buscar por t\xEDtulo ou conte\xFAdo...",newItem:"Novo item",cancel:"Cancelar",recentlyUsed:"\u{1F552} Usados recentemente",nothingFound:"Nada encontrado",nothingHereYet:"Nada aqui ainda",noItemMatches:e=>`Nenhum item bate com "${e}" nesta aba.`,clickPlusToStart:"Clique no + para come\xE7ar sua cole\xE7\xE3o.",copy:"Copiar",moreActions:"Mais a\xE7\xF5es",edit:"Editar",delete:"Excluir",deleteConfirm:e=>`Excluir "${e}"?`,itemDeletedToast:"Item exclu\xEDdo.",copiedToast:"Copiado!",titleLabel:"T\xEDtulo / Nome",subjectLabel:"Assunto do Email",contentLabel:"Conte\xFAdo",emailBodyLabel:"Corpo do Email (HTML)",noteTextLabel:"Texto da Nota",editItemTitle:"Editar Item",newItemTitle:"Novo Item",save:"Salvar",saveChanges:"Salvar Altera\xE7\xF5es",saving:"Salvando...",bold:"Negrito",italic:"It\xE1lico",codeFormat:"Formato c\xF3digo",insertImage:"Inserir imagem",imageUrlPrompt:"Cole a URL da imagem:",fillTitleAndContent:"Preencha t\xEDtulo e conte\xFAdo.",subjectRequired:"Assunto \xE9 obrigat\xF3rio para emails.",saveFailedNoUser:"N\xE3o foi poss\xEDvel salvar: usu\xE1rio n\xE3o identificado. Recarregue a p\xE1gina e tente de novo.",savedLocalOnly:"Salvo localmente \u2014 sem conex\xE3o com a nuvem no momento.",savedAndSynced:"Salvo e sincronizado!",saveError:"Erro ao salvar item."},es:{headerTitle:"Mi Biblioteca",headerDesc:"Gestiona tus snippets, textos y plantillas.",tabs:{general:"General",note:"Notas",email:"Emails"},searchPlaceholder:"Buscar por t\xEDtulo o contenido...",newItem:"Nuevo elemento",cancel:"Cancelar",recentlyUsed:"\u{1F552} Usados recientemente",nothingFound:"No se encontr\xF3 nada",nothingHereYet:"Todav\xEDa no hay nada aqu\xED",noItemMatches:e=>`Ning\xFAn elemento coincide con "${e}" en esta pesta\xF1a.`,clickPlusToStart:"Haz clic en + para empezar tu colecci\xF3n.",copy:"Copiar",moreActions:"M\xE1s acciones",edit:"Editar",delete:"Eliminar",deleteConfirm:e=>`\xBFEliminar "${e}"?`,itemDeletedToast:"Elemento eliminado.",copiedToast:"\xA1Copiado!",titleLabel:"T\xEDtulo / Nombre",subjectLabel:"Asunto del Email",contentLabel:"Contenido",emailBodyLabel:"Cuerpo del Email (HTML)",noteTextLabel:"Texto de la Nota",editItemTitle:"Editar Elemento",newItemTitle:"Nuevo Elemento",save:"Guardar",saveChanges:"Guardar Cambios",saving:"Guardando...",bold:"Negrita",italic:"Cursiva",codeFormat:"Formato c\xF3digo",insertImage:"Insertar imagen",imageUrlPrompt:"Pega la URL de la imagen:",fillTitleAndContent:"Completa el t\xEDtulo y el contenido.",subjectRequired:"El asunto es obligatorio para emails.",saveFailedNoUser:"No se pudo guardar: usuario no identificado. Recarga la p\xE1gina e int\xE9ntalo de nuevo.",savedLocalOnly:"Guardado localmente \u2014 sin conexi\xF3n con la nube en este momento.",savedAndSynced:"\xA1Guardado y sincronizado!",saveError:"Error al guardar el elemento."}};function ue(e){let t=ce();return Ki[t]?.[e]??Ki.pt[e]}var Ge={tabs:{general:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',note:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z"></path><path d="M15 3v6h6"></path><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>',email:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'},search:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',clear:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',copy:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',more:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8"></circle><circle cx="12" cy="12" r="1.8"></circle><circle cx="12" cy="19" r="1.8"></circle></svg>',edit:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',delete:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',add:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',back:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',bold:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>',italic:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>',code:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',image:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',media:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',empty:'<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>'},Co=[{id:"general",icon:Ge.tabs.general},{id:"note",icon:Ge.tabs.note},{id:"email",icon:Ge.tabs.email}],ko="cw_lib_recent_v1",Ji=4;function Us(e){try{let t=JSON.parse(localStorage.getItem(ko)||"[]");t=t.filter(a=>a!==e),t.unshift(e),t=t.slice(0,Ji*3),localStorage.setItem(ko,JSON.stringify(t))}catch(t){console.warn("Erro ao salvar uso recente",t)}}function Vs(e){try{let t=JSON.parse(localStorage.getItem(ko)||"[]");if(t.length===0)return[];let a=new Map(Pe.getSnippets(e).map(o=>[o.id,o]));return t.map(o=>a.get(o)).filter(Boolean).slice(0,Ji)}catch{return[]}}function Ws(){if(document.getElementById("cw-lib-styles-v2"))return;let e=document.createElement("style");e.id="cw-lib-styles-v2",e.textContent=`
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
    `,document.head.appendChild(e)}function Zi(){let e="v2.0",t=!1,a="general",o="",n=null,i=null;Ws();let r=document.createElement("div");r.id="library-popup",r.classList.add("cw-module-window"),Object.assign(r.style,He,{right:"auto",left:"50%",width:"620px",height:"680px",maxHeight:"90vh",transform:"translateX(-50%) scale(0.05)"});let l={popup:r},s=ze(r,ue("headerTitle"),e,ue("headerDesc"),l,()=>ie());r.appendChild(s);let b=s.querySelector("span"),p=document.createElement("div");p.className="cw-lib-container",r.appendChild(p);let h=document.createElement("div");h.className="cw-lib-toolbar";let m=document.createElement("div");m.className="cw-lib-search-wrap";let g=document.createElement("div");g.className="cw-lib-search-icon",g.innerHTML=Ge.search;let I=document.createElement("input");I.className="cw-lib-search no-drag",I.placeholder=ue("searchPlaceholder"),I.type="text";let x=document.createElement("div");x.className="cw-lib-search-clear cw-tactile",x.innerHTML=Ge.clear,m.append(g,I,x);let y=document.createElement("div");y.className="cw-lib-tabs",Co.forEach(_=>{let G=document.createElement("div");G.className="cw-lib-tab"+(_.id===a?" active":""),G.id=`lib-tab-${_.id}`,G.innerHTML=`${_.icon}<span class="js-lib-tab-label">${ue("tabs")[_.id]}</span>`,G.onmouseenter=()=>v.playHover(),G.onclick=()=>R(_.id),y.appendChild(G)}),h.append(m,y),p.appendChild(h);let z=document.createElement("div");z.className="cw-lib-grid",p.appendChild(z);let A=document.createElement("div");A.className="cw-lib-fab cw-tactile",A.title=ue("newItem"),A.innerHTML=Ge.add,A.onclick=()=>re(),p.appendChild(A);let $=document.createElement("div");$.className="cw-lib-sheet";let f=document.createElement("div");f.className="cw-lib-sheet-handle";let C=document.createElement("div");C.className="cw-lib-sheet-head";let P=document.createElement("div");P.className="cw-lib-sheet-back no-drag",P.innerHTML=Ge.back,P.title=ue("cancel"),P.onclick=B;let q=document.createElement("span");q.className="cw-lib-sheet-title",q.textContent=ue("newItemTitle"),C.append(P,q);let E=document.createElement("div");E.className="cw-lib-sheet-body";let N=document.createElement("div");N.className="cw-lib-sheet-foot";let k=document.createElement("button");k.className="cw-lib-save-btn no-drag",k.textContent=ue("save"),k.onclick=Z,N.appendChild(k);let F=document.createElement("div");F.className="cw-lib-loading",F.innerHTML=`<div class="cw-lib-spinner"></div><div class="cw-lib-loading-text js-lib-saving">${ue("saving")}</div>`,$.append(f,C,E,N,F),p.appendChild($);let H=document.createElement("div");Object.assign(H.style,lt),H.className="no-drag",r.appendChild(H),ct(r,H),document.body.appendChild(r),document.addEventListener("mousedown",_=>{i&&!i.contains(_.target)&&Q()});function R(_){v.playClick(),a=_,Co.forEach(G=>{document.getElementById(`lib-tab-${G.id}`).classList.toggle("active",G.id===_)}),W()}function Q(){if(i){let _=i.querySelector(".cw-lib-menu");_&&_.classList.remove("open"),i.classList.remove("menu-open"),i=null}}function le(_,G){return G?`${_.title} ${_.content}`.toLowerCase().includes(G):!0}function de(_){let G=document.createElement("div");G.className="cw-lib-recent-section",G.innerHTML=`<div class="cw-lib-recent-title">${ue("recentlyUsed")}</div>`;let K=document.createElement("div");return K.className="cw-lib-recent-row",_.forEach(O=>{let c=document.createElement("div");c.className="cw-lib-recent-chip",c.tabIndex=0,c.setAttribute("role","button"),c.title=O.title,c.innerHTML=`<span>${V(O.title)}</span>`,c.onclick=()=>{v.playClick(),U(O)},c.addEventListener("keydown",S=>{(S.key==="Enter"||S.key===" ")&&(S.preventDefault(),c.click())}),K.appendChild(c)}),G.appendChild(K),G}function W(){Q(),z.innerHTML="";let _=o.trim().toLowerCase(),G=Pe.getSnippets(a).filter(K=>le(K,_));if(!_){let K=Vs(a);K.length>0&&z.appendChild(de(K))}if(G.length===0){let K=document.createElement("div");K.className="cw-lib-empty";let O=_.length>0;K.innerHTML=`
                <div style="opacity:0.5;">${Ge.empty}</div>
                <div class="cw-lib-empty-title">${ue(O?"nothingFound":"nothingHereYet")}</div>
                <div class="cw-lib-empty-sub">${O?ue("noItemMatches")(o.trim()):ue("clickPlusToStart")}</div>
            `,z.appendChild(K);return}G.forEach(K=>z.appendChild(oe(K)))}function oe(_){let G=document.createElement("div");G.className="cw-lib-card"+(_.isCode?" is-code":"");let K=_.content,O="";if(_.isRich){let L=document.createElement("div");L.innerHTML=_.content;let M=!!L.querySelector("img");K=L.innerText.substring(0,200),M&&(O=`<span class="cw-lib-media-tag">${Ge.media} M\xEDdia</span>`)}let c=[_.isCode?'<span class="cw-lib-badge code">CODE</span>':"",a==="email"?'<span class="cw-lib-badge template">TEMPLATE</span>':""].join("");G.innerHTML=`
            <div class="cw-lib-card-head">
                <div class="cw-lib-card-title">${V(_.title)}</div>
                <div class="cw-lib-card-badges">${c}</div>
            </div>
            ${O}
            <div class="cw-lib-card-preview${_.isCode?" code":""}">${V(K)}</div>
            <div class="cw-lib-card-foot">
                <div class="cw-lib-icon-btn cw-act-copy cw-tactile" title="${ue("copy")}">${Ge.copy}</div>
                <div class="cw-lib-icon-btn cw-act-more cw-tactile" title="${ue("moreActions")}">${Ge.more}</div>
                <div class="cw-lib-menu">
                    <div class="cw-lib-menu-item cw-act-edit">${Ge.edit} ${ue("edit")}</div>
                    <div class="cw-lib-menu-item danger cw-act-del">${Ge.delete} ${ue("delete")}</div>
                </div>
            </div>
        `,G.querySelector(".cw-act-copy").onclick=L=>{L.stopPropagation(),v.playClick(),U(_)};let S=G.querySelector(".cw-act-more"),u=G.querySelector(".cw-lib-menu");return S.onclick=L=>{L.stopPropagation(),v.playClick();let M=u.classList.contains("open");Q(),M||(u.classList.add("open"),G.classList.add("menu-open"),i=G)},G.querySelector(".cw-act-edit").onclick=L=>{L.stopPropagation(),v.playClick(),Q(),re(_)},G.querySelector(".cw-act-del").onclick=async L=>{L.stopPropagation(),v.playClick(),Q(),await Me(ue("deleteConfirm")(_.title))&&(Pe.delete(_.id),W(),J(ue("itemDeletedToast")))},G}function U(_){if(_.isRich){let G=new Blob([_.content],{type:"text/html"}),K=document.createElement("div");K.innerHTML=_.content;let O=new Blob([K.innerText],{type:"text/plain"});navigator.clipboard.write([new ClipboardItem({"text/html":G,"text/plain":O})])}else navigator.clipboard.writeText(_.content);Us(_.id),J(ue("copiedToast"))}function re(_=null){n=_?_.id:null,E.innerHTML="",E.appendChild(ne("title",ue("titleLabel"),_?_.title:"")),a==="email"&&E.appendChild(ne("subject",ue("subjectLabel"),_?_.subject:""));let G=ue("contentLabel");a==="email"&&(G=ue("emailBodyLabel")),a==="note"&&(G=ue("noteTextLabel")),E.appendChild(ne("content",G,_?_.content:"",{isRich:!0,isCode:_?_.isCode:!1})),q.textContent=ue(_?"editItemTitle":"newItemTitle"),k.textContent=ue(_?"saveChanges":"save"),$.classList.add("open"),setTimeout(()=>{let K=E.querySelector("input");K&&K.focus()},500)}function B(){v.playSwoosh(),$.classList.remove("open"),setTimeout(()=>{n=null},500)}async function Z(){F.classList.add("active"),k.disabled=!0;try{let _=E.querySelector("#cw-lib-inp-title"),G=E.querySelector("#cw-lib-inp-content"),K=_.value.trim(),O=G.contentEditable==="true"?G.innerHTML:G.value.trim(),c=G.getAttribute("data-is-code")==="true";if(!K||!O||O==="<br>"){v.playError(),J(ue("fillTitleAndContent"),{error:!0});return}let S={id:n,type:a,title:K,content:O,isCode:c,isRich:G.contentEditable==="true"};if(a==="email"){let L=E.querySelector("#cw-lib-inp-subject").value.trim();if(!L){v.playError(),J(ue("subjectRequired"),{error:!0});return}S.subject=L}let u=await Pe.save(S);if(u===!1){v.playError(),J(ue("saveFailedNoUser"),{error:!0});return}W(),B(),u.synced===!1?(v.playError(),J(ue("savedLocalOnly"),{error:!0})):(J(ue("savedAndSynced")),v.playSuccess())}catch(_){console.error("Erro ao salvar item da biblioteca:",_),v.playError(),J(ue("saveError"),{error:!0})}finally{F.classList.remove("active"),k.disabled=!1}}function ne(_,G,K,O={}){let c=document.createElement("div");c.className="cw-lib-field";let S=document.createElement("label");S.className="cw-lib-label",S.textContent=G,c.appendChild(S);let u;if(O.isRich){let L=document.createElement("div");L.className="cw-lib-toolbar-mini",L.innerHTML=`
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-bold" title="${ue("bold")}">${Ge.bold}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-italic" title="${ue("italic")}">${Ge.italic}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-code" title="${ue("codeFormat")}">${Ge.code}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-img" title="${ue("insertImage")}">${Ge.image}</button>
            `,u=document.createElement("div"),u.className="cw-lib-input cw-lib-editable",u.contentEditable="true",u.innerHTML=K||"",O.isCode&&(u.style.fontFamily="'Roboto Mono', monospace",u.style.background="#F8F9FA",u.setAttribute("data-is-code","true"),L.querySelector(".cw-tb-code").classList.add("active")),L.querySelectorAll(".cw-lib-tb-btn").forEach(M=>{M.onmouseenter=()=>v.playHover(),M.onmousedown=()=>v.playClick()}),L.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),u.focus()},L.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),u.focus()},L.querySelector(".cw-tb-code").onclick=M=>{let d=!(u.getAttribute("data-is-code")==="true");u.setAttribute("data-is-code",String(d)),u.style.fontFamily=d?"'Roboto Mono', monospace":"inherit",u.style.background=d?"#F8F9FA":"#fff",M.currentTarget.classList.toggle("active",d),u.focus()},L.querySelector(".cw-tb-img").onclick=async()=>{let M=await ha(ue("imageUrlPrompt"));M&&(document.execCommand("insertImage",!1,M),u.querySelectorAll("img").forEach(te=>{te.style.maxWidth="100%",te.style.borderRadius="8px"}))},u.onpaste=M=>{let te=(M.clipboardData||M.originalEvent.clipboardData).items;for(let d of te)if(d.kind==="file"&&d.type.startsWith("image/")){M.preventDefault();let w=new FileReader;w.onload=T=>{document.execCommand("insertHTML",!1,`<img src="${T.target.result}" style="max-width:100%;border-radius:8px;margin:8px 0;display:block;">`)},w.readAsDataURL(d.getAsFile())}},c.appendChild(L)}else u=document.createElement("input"),u.className="cw-lib-input",u.type="text",u.value=K||"";return u.id=`cw-lib-inp-${_}`,c.appendChild(u),c}function V(_){let G=document.createElement("div");return G.textContent=_||"",G.innerHTML}I.addEventListener("input",_=>{o=_.target.value,x.classList.toggle("visible",o.length>0),W()}),x.onclick=()=>{I.value="",o="",x.classList.remove("visible"),W(),I.focus()};function ie(){t=!Ve(r),$e(t,r,"cw-btn-library"),t?(ke(),W()):(Te(),Q())}return Ee(()=>{b&&(b.textContent=ue("headerTitle"));let _=r.querySelector(".cw-help-title");_&&(_.textContent=ue("headerTitle"));let G=r.querySelector(".cw-help-description");G&&(G.textContent=ue("headerDesc")),Co.forEach(O=>{let c=document.querySelector(`#lib-tab-${O.id} .js-lib-tab-label`);c&&(c.textContent=ue("tabs")[O.id])}),I.placeholder=ue("searchPlaceholder"),A.title=ue("newItem"),P.title=ue("cancel");let K=F.querySelector(".js-lib-saving");K&&(K.textContent=ue("saving")),W()}),ie}var Ys='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>',Xs='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>',Ks='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',Js='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>';function Zs(e){if(document.getElementById("cw-shortcuts-styles"))return;let t=document.createElement("style");t.id="cw-shortcuts-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function Qi(e,t){Zs(t);let a=document.createElement("div");a.className="cw-configs-section",a.innerHTML=`
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
    `;let o=a.querySelector(".js-sc-body"),n=a.querySelector(".js-sc-sort-toggle");n.onchange=async m=>{v.playClick(),await qe.setSortedByUsage(m.target.checked),l()};function i(m){let g=Fe[m.payload.subStatus],I=g?g.name:m.payload.subStatus,x=(m.payload.scenarios||[]).length,y=[m.payload.caseType.toUpperCase(),I,x===1?e("scOneScenario"):e("scNScenarios").replace("{n}",x)];return m.alias&&y.push(`"${m.alias}"`),y.join(" \xB7 ")}function r(m,g,I){if(m.textContent="",I){let x=document.createElement("span");x.className="cw-sc-warn",x.textContent=e("scBroken"),m.appendChild(x),m.appendChild(document.createTextNode(" \xB7 "))}m.appendChild(document.createTextNode(i(g)))}function l(){o.innerHTML="",n.checked=qe.isSortedByUsage();let m=qe.isSortedByUsage(),g=m?qe.list():qe.listRaw(),I=!m;if(!g.length){let y=document.createElement("div");y.className="cw-sc-empty",y.textContent=e("scEmpty"),o.appendChild(y)}g.forEach((y,z)=>{let A=Un(y),$=document.createElement("div");$.className="cw-sc-item"+(A.length?" broken":""),$.dataset.id=y.id,$.dataset.index=String(z),$.innerHTML=`
                ${I?`<button type="button" class="cw-sc-grip" aria-label="${e("scReorder")}">${Xs}</button>`:""}
                <span class="cw-sc-bolt">${Ys}</span>
                <span class="cw-sc-text">
                    <span class="cw-sc-label"></span>
                    <span class="cw-sc-meta"></span>
                </span>
                <button type="button" class="cw-sc-iconbtn js-sc-edit" aria-label="${e("scEdit")}">${Ks}</button>
                <button type="button" class="cw-sc-iconbtn danger js-sc-del" aria-label="${e("scDelete")}">${Js}</button>
            `;let f=$.querySelector(".cw-sc-label");f.textContent=y.label,f.title=y.label,r($.querySelector(".cw-sc-meta"),y,A.length>0),$.querySelector(".js-sc-edit").onclick=()=>h(y),$.querySelector(".js-sc-del").onclick=()=>s(y),I&&b($,z,g.length),o.appendChild($)});let x=document.createElement("button");x.type="button",x.className="cw-sc-add",x.textContent=e("scAdd"),x.disabled=g.length>=bt,x.disabled&&(x.textContent=e("scLimit").replace("{max}",bt)),x.onclick=()=>h(null),o.appendChild(x)}async function s(m){await Me(e("scDeleteConfirm").replace("{name}",m.label),{danger:!0})&&(await qe.remove(m.id),v.playClick(),l())}function b(m,g,I){let x=m.querySelector(".cw-sc-grip");m.draggable=!0;let y=!1;x.onmousedown=()=>{y=!0},m.onmouseup=()=>{y=!1},x.onkeydown=async z=>{let A=z.key==="ArrowUp"?-1:z.key==="ArrowDown"?1:0;if(!A)return;z.preventDefault();let $=g+A;if($<0||$>=I)return;await qe.reorder(m.dataset.id,$),v.playClick(),l();let f=o.querySelector(`.cw-sc-item[data-id="${m.dataset.id}"] .cw-sc-grip`);f&&f.focus()},m.ondragstart=z=>{if(!y){z.preventDefault();return}z.dataTransfer.effectAllowed="move",z.dataTransfer.setData("text/plain",m.dataset.id),m.classList.add("dragging")},m.ondragend=()=>{m.classList.remove("dragging"),y=!1,o.querySelectorAll(".drop-target").forEach(z=>z.classList.remove("drop-target"))},m.ondragover=z=>{z.preventDefault(),m.classList.add("drop-target")},m.ondragleave=()=>m.classList.remove("drop-target"),m.ondrop=async z=>{z.preventDefault(),m.classList.remove("drop-target");let A=z.dataTransfer.getData("text/plain");!A||A===m.dataset.id||(await qe.reorder(A,Number(m.dataset.index)),v.playClick(),l())}}function p(){let m=[];for(let g in Fe){let I=Fe[g].status;I&&!m.includes(I)&&m.push(I)}return m}function h(m){let I=!!m?JSON.parse(JSON.stringify(m)):{id:ca(),kind:"note",label:"",alias:"",payload:{caseType:"bau",status:"",subStatus:"",scenarios:[]}};o.innerHTML="";let x=document.createElement("div");x.style.cssText="display: flex; flex-direction: column; gap: 14px;",x.innerHTML=`
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
        `,o.appendChild(x);let y=x.querySelector("#cw-sc-name"),z=x.querySelector("#cw-sc-alias"),A=x.querySelector("#cw-sc-type"),$=x.querySelector("#cw-sc-status"),f=x.querySelector("#cw-sc-sub"),C=x.querySelector(".js-sc-scenarios");y.value=I.label,z.value=I.alias,A.value=I.payload.caseType,$.innerHTML='<option value="">\u2014</option>'+p().map(N=>`<option value="${N}">${N}</option>`).join(""),$.value=I.payload.status;function P(){let N=$.value;f.innerHTML='<option value="">\u2014</option>';for(let k in Fe){if(Fe[k].status!==N)continue;let F=document.createElement("option");F.value=k,F.textContent=Fe[k].name,f.appendChild(F)}f.disabled=!N}function q(){if(C.innerHTML="",!f.value){C.innerHTML=`<div class="cw-configs-desc">${e("scPickSubStatus")}</div>`;return}let N=va(f.value,A.value);if(!N.length){C.innerHTML=`<div class="cw-configs-desc">${e("scNoScenarios")}</div>`;return}N.forEach(([k])=>{let F=document.createElement("button");F.type="button",F.className="cw-sc-chip",F.textContent=ya(k,f.value);let H=()=>I.payload.scenarios.some(R=>R.id===k);F.classList.toggle("on",H()),F.onclick=()=>{H()?I.payload.scenarios=I.payload.scenarios.filter(R=>R.id!==k):I.payload.scenarios.push({id:k,substatus:f.value}),F.classList.toggle("on",H()),v.playClick()},C.appendChild(F)})}P(),f.value=I.payload.subStatus,q(),$.onchange=()=>{I.payload.scenarios=[],P(),f.value="",q()},f.onchange=()=>{I.payload.scenarios=[],q()},A.onchange=()=>{I.payload.scenarios=[],q()},x.querySelector(".cw-sc-cancel").onclick=()=>{v.playClick(),l()};let E=x.querySelector(".cw-sc-save");E.onclick=async()=>{if(!f.value){v.playError(),J(e("scPickSubStatus"),{error:!0});return}let N=E.textContent;E.disabled=!0,E.textContent=e("scSaving");let k=y.value.trim()||Fe[f.value].name,F=await qe.save({...I,label:k,alias:z.value.trim(),payload:{...I.payload,caseType:A.value,status:$.value||String(f.value).split("_")[0],subStatus:f.value}});if(!F.ok){E.disabled=!1,E.textContent=N,v.playError(),J(e("scLimit").replace("{max}",bt),{error:!0});return}v.playSuccess(),J(F.synced?e("scSaved"):e("scSavedLocal")),l()}}return a.refresh=l,a.applyTexts=()=>{a.querySelector(".js-sc-title").textContent=e("scSectionTitle"),a.querySelector(".js-sc-sort-label").textContent=e("scSortLabel"),a.querySelector(".js-sc-sort-desc").textContent=e("scSortDesc"),l()},l(),a}var Qs={pt:{title:"Configura\xE7\xF5es",headerDesc:"Personalize sua experi\xEAncia e prefer\xEAncias.",profileNotFound:"Perfil n\xE3o localizado na base de dados.",consultant:"Consultor",overheadBadge:"Gest\xE3o / Overhead",soundSectionTitle:"Prefer\xEAncias de Som",soundLabel:"Efeitos Sonoros",soundDesc:"Ativar ou desativar sons de interface.",langSectionTitle:"Idioma da Interface",langLabel:"Idioma",langDesc:"Escolha o idioma dos menus, bot\xF5es e mensagens do Case Wizard.",supportSectionTitle:"Suporte & Feedback",reportBug:"Reportar Bug/Sugest\xF5es",diagSectionTitle:"Diagn\xF3stico",diagLabel:"Ambiente do backend",diagDesc:"Qual implanta\xE7\xE3o do Apps Script este bundle usa. O sufixo tem de bater com o do dashboard.",scSectionTitle:"Meus Atalhos (Ctrl+K)",scSortLabel:"Ordenar por frequ\xEAncia de uso",scSortDesc:"Desligue para definir voc\xEA mesmo a ordem, arrastando os atalhos.",scEmpty:"Voc\xEA ainda n\xE3o tem atalhos. Crie um aqui ou monte uma nota no Case Notes e clique em \u201CSalvar como atalho\u201D.",scAdd:"+ Criar atalho",scLimit:"Limite de {max} atalhos atingido",scEdit:"Editar atalho",scDelete:"Excluir atalho",scReorder:"Reordenar (arraste ou use as setas)",scDeleteConfirm:"Excluir o atalho \u201C{name}\u201D?",scBroken:"\u26A0 cen\xE1rio indispon\xEDvel",scOneScenario:"1 cen\xE1rio",scNScenarios:"{n} cen\xE1rios",scName:"Nome",scNamePlaceholder:"Ex: Fim do 2 Day Rule",scAlias:"Apelido de busca",scAliasPlaceholder:"Ex: 2day",scAliasDesc:"Palavra que encontra este atalho no Ctrl+K, al\xE9m do nome.",scFlow:"Fluxo",scStatus:"Status",scSubStatus:"Substatus",scScenarios:"Cen\xE1rios",scScenariosDesc:"Opcional: sem nenhum, o atalho s\xF3 abre a nota j\xE1 no substatus certo.",scPickSubStatus:"Escolha um substatus primeiro.",scNoScenarios:"Nenhum cen\xE1rio dispon\xEDvel para esta combina\xE7\xE3o.",scCancel:"Cancelar",scSave:"Salvar",scSaving:"Salvando\u2026",scSaved:"Atalho salvo!",scSavedLocal:"Atalho salvo neste navegador (sem conex\xE3o com a nuvem)."},es:{title:"Configuraci\xF3n",headerDesc:"Personaliza tu experiencia y tus preferencias.",profileNotFound:"Perfil no encontrado en la base de datos.",consultant:"Consultor",overheadBadge:"Gesti\xF3n / Overhead",soundSectionTitle:"Preferencias de Sonido",soundLabel:"Efectos de Sonido",soundDesc:"Activar o desactivar los sonidos de la interfaz.",langSectionTitle:"Idioma de la Interfaz",langLabel:"Idioma",langDesc:"Elige el idioma de los men\xFAs, botones y mensajes del Case Wizard.",supportSectionTitle:"Soporte y Comentarios",reportBug:"Reportar error o sugerencia",diagSectionTitle:"Diagn\xF3stico",diagLabel:"Entorno del backend",diagDesc:"Qu\xE9 implementaci\xF3n de Apps Script usa este bundle. El sufijo debe coincidir con el del panel.",scSectionTitle:"Mis Atajos (Ctrl+K)",scSortLabel:"Ordenar por frecuencia de uso",scSortDesc:"Desact\xEDvalo para definir t\xFA mismo el orden, arrastrando los atajos.",scEmpty:"Todav\xEDa no tienes atajos. Crea uno aqu\xED o arma una nota en Case Notes y haz clic en \u201CGuardar como atajo\u201D.",scAdd:"+ Crear atajo",scLimit:"L\xEDmite de {max} atajos alcanzado",scEdit:"Editar atajo",scDelete:"Eliminar atajo",scReorder:"Reordenar (arrastra o usa las flechas)",scDeleteConfirm:"\xBFEliminar el atajo \u201C{name}\u201D?",scBroken:"\u26A0 escenario no disponible",scOneScenario:"1 escenario",scNScenarios:"{n} escenarios",scName:"Nombre",scNamePlaceholder:"Ej: Fin del 2 Day Rule",scAlias:"Apodo de b\xFAsqueda",scAliasPlaceholder:"Ej: 2day",scAliasDesc:"Palabra que encuentra este atajo en el Ctrl+K, adem\xE1s del nombre.",scFlow:"Flujo",scStatus:"Estado",scSubStatus:"Subestado",scScenarios:"Escenarios",scScenariosDesc:"Opcional: sin ninguno, el atajo solo abre la nota ya en el subestado correcto.",scPickSubStatus:"Elige un subestado primero.",scNoScenarios:"Ning\xFAn escenario disponible para esta combinaci\xF3n.",scCancel:"Cancelar",scSave:"Guardar",scSaving:"Guardando\u2026",scSaved:"\xA1Atajo guardado!",scSavedLocal:"Atajo guardado en este navegador (sin conexi\xF3n con la nube)."}};function er(){let e=Qo(Qs),t="v1.1",a=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0",warnBorder:"#F9AB00",warnBg:"#FFFBF0",warnText:"#B06000"},n="cw-configs-styles";if(!document.getElementById(n)){let k=document.createElement("style");k.id=n,k.innerHTML=`
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
        `,document.head.appendChild(k)}let i=document.createElement("div");i.id="configs-popup",i.classList.add("cw-module-window"),Object.assign(i.style,He,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let r={popup:i},l=ze(i,e("title"),t,e("headerDesc"),r,()=>N());i.appendChild(l);let s=l.querySelector("span"),b=document.createElement("div");b.className="cw-configs-container",i.appendChild(b);let p=document.createElement("div");p.className="cw-profile-card",p.id="cw-user-profile-section",p.style.display="none",b.appendChild(p);let h;function m(k,F){if(h={ldap:k,profile:F},!F){p.innerHTML=`
                <div class="cw-profile-avatar" style="background: #e8eaed; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #5f6368; font-weight: bold;">
                    ${k.charAt(0).toUpperCase()}
                </div>
                <div class="cw-profile-info">
                    <h2 class="cw-profile-ldap">@${k}</h2>
                    <div class="cw-profile-badges">
                        <span class="cw-profile-badge">${e("consultant")}</span>
                    </div>
                    <div style="font-size: 12px; color: ${o.textSub}; margin-top: 4px;">
                        ${e("profileNotFound")}
                    </div>
                </div>
            `;return}p.innerHTML=`
        <img src="https://moma-teams-photos.corp.google.com/photos/${k}?sz=600&type=PLUS"
             class="cw-profile-avatar" alt="User Photo"
             onerror="this.style.display='none'">
        <div class="cw-profile-info">
            <h2 class="cw-profile-ldap">@${F.ldap}</h2>
            <div class="cw-profile-badges">
                <span class="cw-profile-badge">${F.roleCategory||"N/A"}</span>
                <span class="cw-profile-badge">${F.segment||"N/A"}</span>
                <span class="cw-profile-badge">${F.defaultLanguage||"N/A"}</span>
                ${F.isOverhead?`<span class="cw-profile-badge overhead">${e("overheadBadge")}</span>`:""}
            </div>
            <div style="font-size: 12px; color: ${o.textSub}; margin-top: 4px;">
                ${F.role||""}
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
        `,(async()=>{try{Ne()||await Xt();let k=Ne(),F=k?k.split("@")[0]:"user",H=await Mt(F);m(F,H)}catch(k){console.warn("Erro ao renderizar perfil:",k),p.style.display="none"}})()}g();let I=document.createElement("div");if(I.className="cw-configs-section",I.innerHTML=`
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
    `,!document.getElementById("cw-lang-toggle-styles")){let k=document.createElement("style");k.id="cw-lang-toggle-styles",k.innerHTML=`
            .cw-lang-toggle { display: flex; border: 1px solid ${o.border}; border-radius: 8px; overflow: hidden; flex-shrink: 0; }
            .cw-lang-toggle button {
                border: none; background: white; padding: 8px 14px; font-size: 12px; font-weight: 700;
                cursor: pointer; color: ${o.textSub}; font-family: inherit; transition: all 0.2s;
            }
            .cw-lang-toggle button:first-child { border-right: 1px solid ${o.border}; }
            .cw-lang-toggle button.active { background: ${o.primary}; color: #fff; }
            .cw-lang-toggle button:hover:not(.active) { background: #f1f3f4; }
        `,document.head.appendChild(k)}let x=I.querySelector("#cw-config-lang-toggle");function y(){x.querySelectorAll("button").forEach(k=>{k.classList.toggle("active",k.dataset.lang===ce())})}y(),x.querySelectorAll("button").forEach(k=>{k.onclick=()=>{Xa(k.dataset.lang),v.playClick()}}),b.appendChild(I);let z=Qi(e,o);b.appendChild(z);let A=document.createElement("div");A.className="cw-configs-section",A.innerHTML=`
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
    `;let $=A.querySelector("#cw-config-sound-toggle");$.onchange=k=>{v.setMuted(!k.target.checked),k.target.checked&&v.playClick()},b.appendChild(A);let f=document.createElement("div");f.className="cw-configs-section",f.innerHTML=`
        <div class="cw-configs-section-title js-support-section-title"></div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn js-support-link" href="${Dt}" target="_blank" rel="noopener noreferrer"></a>
            </div>
        </div>
    `,b.appendChild(f);let C=Ut(),P=document.createElement("div");P.className="cw-configs-section",P.innerHTML=`
        <div class="cw-configs-section-title js-diag-section-title"></div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label js-diag-label"></div>
                    <div class="cw-configs-desc js-diag-desc"></div>
                </div>
                <div class="cw-env-chip ${C.isDev?"is-dev":"is-prod"}"></div>
            </div>
        </div>
    `,P.querySelector(".cw-env-chip").textContent=`${C.isDev?"DEV":"PROD"} \xB7 \u2026${C.fingerprint}`,b.appendChild(P);let q=document.createElement("style");q.innerHTML=`
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
    `,P.appendChild(q);function E(){h&&m(h.ldap,h.profile),I.querySelector(".js-lang-section-title").textContent=e("langSectionTitle"),I.querySelector(".js-lang-label").textContent=e("langLabel"),I.querySelector(".js-lang-desc").textContent=e("langDesc"),y(),z.applyTexts(),A.querySelector(".js-sound-section-title").textContent=e("soundSectionTitle"),A.querySelector(".js-sound-label").textContent=e("soundLabel"),A.querySelector(".js-sound-desc").textContent=e("soundDesc"),f.querySelector(".js-support-section-title").textContent=e("supportSectionTitle"),f.querySelector(".js-support-link").textContent=e("reportBug"),P.querySelector(".js-diag-section-title").textContent=e("diagSectionTitle"),P.querySelector(".js-diag-label").textContent=e("diagLabel"),P.querySelector(".js-diag-desc").textContent=e("diagDesc"),s&&(s.textContent=e("title"));let k=i.querySelector(".cw-help-title");k&&(k.textContent=e("title"));let F=i.querySelector(".cw-help-description");F&&(F.textContent=e("headerDesc"))}E(),Ee(E);function N(){a=!Ve(i),$e(a,i,"cw-btn-configs"),a?(z.refresh(),ke(),v.playClick()):Te()}return document.body.appendChild(i),N}var kt={blue:"#1A73E8",red:"#D93025",yellow:"#F9AB00",green:"#1E8E3E",blueLight:"#E8F0FE",redLight:"#FCE8E6",yellowLight:"#FEF7E0",greenLight:"#E6F4EA",textPrimary:"#202124",textSecondary:"#5F6368",border:"#DADCE0",surface:"rgba(255, 255, 255, 0.8)",white:"#FFFFFF"};var Ft="cubic-bezier(0.4, 0, 0.2, 1)",em=`all 0.3s ${Ft}`,tr=()=>{if(document.getElementById("bau-form-global-styles"))return;let e=document.createElement("style");e.id="bau-form-global-styles",e.textContent=`
    /* --- 1. POSICIONAMENTO E ANCORAGEM --- */
    .bau-popup {
      width: 650px;
      max-width: 95vw;
      max-height: 90vh;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: ${De.MODULE_RESTING};
      
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
      overflow: scroll;
    }

    .bau-view {
      display: none;
      flex-direction: column;
      height: 100%;
      animation: bauFadeIn 0.3s ease;
      position: relative;
      box-sizing: border-box;
      overflow: hidden; /* Garante que o conte\xFAdo n\xE3o vaze */
      margin-top: 18px;
    }
    .bau-view.active { display: flex; }
    @keyframes bauFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    /* --- 3. ESTILOS GERAIS E CLASSES ADICIONAIS --- */
    .bau-dashboard-content {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      padding-bottom: 120px;
      scroll-behavior: smooth;
      height: 100%;
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
        background: #F8F9FA;
        border: 1px solid #DADCE0;
        border-radius: 12px;
        padding: 12px 20px;
        font-size: 13px;
        font-weight: 600;
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
      gap: 12px;
      margin-bottom: 24px;
    }

    .bau-metrics-refresh-btn {
      background: #F8F9FA;
      border: 1px solid #DADCE0;
      color: #5F6368;
      border-radius: 12px;
      padding: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 600;
      transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
      height: 60px; /* Alinha com os cards de m\xE9tricas */
    }
    .bau-metrics-refresh-btn:hover {
      background: #F1F3F4;
      color: #202124;
      border-color: #5F6368;
    }
    .bau-metrics-refresh-btn svg { width: 18px; height: 18px; }
    .bau-metrics-refresh-btn.spinning svg { animation: rotate 1s linear infinite; }

    @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    .bau-metric-card {
      flex: 1;
      background: #F8F9FA;
      border: 1px solid #DADCE0;
      border-radius: 12px;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      position: relative;
      overflow: hidden;
    }
    .bau-metric-value {
      font-size: 20px;
      font-weight: 700;
      color: #1A73E8;
    }
    .bau-metric-label {
      font-size: 11px;
      font-weight: 600;
      color: #5F6368;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .bau-case-list { list-style: none; padding: 0; margin: 0; }

    .bau-case-list li {
      margin-bottom: 12px;
      position: relative;
      overflow: hidden;
    }

    .bau-case-card {
      background: #F8F9FA;
      border: 1px solid #DADCE0;
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
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      border-color: rgba(26, 115, 232, 0.4);
      background: #F1F3F4;
    }

    /* Aura Status Overrides */
    .bau-case-card.status-yellow-aura { background: linear-gradient(135deg, rgba(249, 171, 0, 0.1) 0%, rgba(249, 171, 0, 0.05) 100%); border-color: rgba(249, 171, 0, 0.2); }
    .bau-case-card.status-green-aura { background: linear-gradient(135deg, rgba(30, 142, 62, 0.1) 0%, rgba(30, 142, 62, 0.05) 100%); border-color: rgba(30, 142, 62, 0.2); }
    .bau-case-card.status-red-aura { background: linear-gradient(135deg, rgba(217, 48, 37, 0.1) 0%, rgba(217, 48, 37, 0.05) 100%); border-color: rgba(217, 48, 37, 0.2); }

    .bau-case-main { display: flex; align-items: flex-start; gap: 12px; }
    .bau-case-icon { color: #5F6368; margin-top: 2px; }
    .bau-case-info { display: flex; flex-direction: column; gap: 4px; }
    .bau-case-header { display: flex; align-items: baseline; gap: 8px; }
    .bau-case-title { margin: 0; font-size: 15px; font-weight: 600; color: #202124; }
    .bau-case-date { font-size: 11px; color: #5F6368; }
    .bau-case-details { margin: 0; font-size: 12px; color: #5F6368; max-width: 400px;}

    .bau-case-status-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 100px;
      white-space: nowrap;
    }
    .bau-case-status-badge.status-yellow { background: rgba(249, 171, 0, 0.2); color: #F9AB00; }
    .bau-case-status-badge.status-green { background: rgba(30, 142, 62, 0.2); color: #1E8E3E; }
    .bau-case-status-badge.status-red { background: rgba(217, 48, 37, 0.2); color: #D93025; }
    .bau-case-status-badge.status-gray { background: rgba(128, 134, 139, 0.2); color: #5F6368; }

    .bau-case-edit-btn {
      background: transparent;
      border: 1px solid #DADCE0;
      color: #5F6368;
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 600;
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
    .bau-empty-title { font-size: 16px; font-weight: 600; color: #202124; margin: 0 0 4px 0; }

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
        color: ${kt.green};
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
        font-weight: 700;
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
      font-weight: 600;
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
    .bau-progress-step { width: 28px; height: 28px; border-radius: 50%; background: #FFFFFF; border: 2px solid #DADCE0; color: #5F6368; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; position: relative; z-index: 2; transition: border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease; }
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
      border: 1px solid rgba(218, 220, 224, 0.5);
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
      font-weight: 700;
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
    .bau-card { background: #F8F9FA; border: 1px solid #DADCE0; border-radius: 12px; padding: 20px; margin-bottom: 20px; }

    .bau-highlight-panel {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      padding: 20px;
      background: linear-gradient(135deg, #F8F9FA 0%, #F1F3F4 100%);
      backdrop-filter: blur(12px);
      border-radius: 12px;
      border: 1px solid #DADCE0;
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

    .bau-highlight-label { font-size: 11px; color: #5F6368; text-transform: uppercase; letter-spacing: 0.5px; }
    .bau-highlight-value { font-size: 14px; font-weight: 500; color: #202124; }

    .bau-label { display: block; font-size: 13px; font-weight: 600; color: #202124; margin-top: 20px; margin-bottom: 8px; }
    
    .bau-input, .bau-select, .bau-textarea {
      width: 100%;
      background: #FFFFFF;
      border: 1px solid #DADCE0;
      border-radius: 8px;
      padding: 12px 16px;
      color: #202124;
      font-size: 14px;
      transition: border-color 0.2s ease, background-color 0.2s ease;
      box-sizing: border-box;
    }

    .bau-input:focus, .bau-select:focus, .bau-textarea:focus {
      border-color: #1A73E8;
      background: #FFFFFF;
      outline: none;
      box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
    }

    .bau-tasks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 16px;
      margin-top: 12px;
    }
    .bau-task-item {
      background: #F8F9FA;
      border: 1px solid #DADCE0;
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
      border: 1px solid #DADCE0;
      color: #1A73E8;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
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
      border: 1px solid #DADCE0;
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
      border: 1px solid #DADCE0;
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
      font-weight: 700;
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
      font-weight: 600;
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
      border: 1px solid #DADCE0;
      color: #5F6368;
      border-radius: 8px;
      padding: 10px 24px;
      font-size: 14px;
      font-weight: 600;
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

    /* --- BAU DETAILS INTERNAL VIEW (Standard Regular Material) --- */
    .bau-details-view {
        position: absolute;
        top: 56px;
        left: 0;
        width: 100%;
        height: calc(100% - 56px);
        background: #F8F9FA;
        z-index: 200;
        display: none;
        flex-direction: column;
        pointer-events: none;
        opacity: 0;
        transform: scale(0.95) translateY(10px);
        transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                    transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        border-radius: 0 0 16px 16px;
        overflow: hidden;
    }

    .bau-details-view.active {
        display: flex;
        opacity: 1;
        pointer-events: auto;
        transform: scale(1) translateY(0);
    }

    .bau-details-header {
        padding: 16px 24px;
        background: #FFFFFF;
        border-bottom: 1px solid #DADCE0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
    }

    .bau-details-title {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #202124;
    }

    .bau-details-close-btn {
        background: #F1F3F4;
        border: 1px solid #DADCE0;
        color: #5F6368;
        cursor: pointer;
        padding: 6px 16px;
        border-radius: 100px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        font-weight: 500;
        transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
    }
    .bau-details-close-btn:hover { background: #E8EAED; color: #202124; transform: scale(1.02); }
    .bau-details-close-btn:active { transform: scale(0.95); transition: transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1); }

    .bau-details-content {
        padding: 24px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 20px;
        scrollbar-width: thin;
    }

    .bau-details-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }

    .bau-details-card {
        background: #FFFFFF;
        border: 1px solid #DADCE0;
        border-radius: 12px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        transition: transform 0.2s ease;
        /* min-width:0 \xE9 necess\xE1rio pra c\xE9lula de grid poder encolher abaixo
           do conte\xFAdo \u2014 sem isso, um texto sem quebra (URL, ID de rastreio)
           for\xE7a a coluna a ficar larga, estoura o grid, e o pai com
           overflow:hidden corta/sobrep\xF5e em vez de rolar. Casos j\xE1
           resolvidos tendem a ter os campos mais preenchidos, por isso o
           problema aparecia mais neles. */
        min-width: 0;
    }

    .bau-details-row {
        display: flex;
        flex-direction: column;
        gap: 4px;
        position: relative;
    }
    .bau-details-card.full-width { grid-column: 1 / -1; }

    .bau-details-label {
        font-size: 11px;
        font-weight: 700;
        color: #5F6368;
        text-transform: uppercase;
        letter-spacing: 0.8px;
    }

    .bau-details-value {
        font-size: 14px;
        font-weight: 500;
        color: #202124;
        line-height: 1.5;
        overflow-wrap: break-word;
        word-break: break-word;
    }

    .bau-copy-btn {
        position: absolute;
        top: 0;
        right: 0;
        background: transparent;
        border: none;
        color: #1A73E8;
        cursor: pointer;
        padding: 4px;
        opacity: 0;
        transition: opacity 0.2s ease, background-color 0.2s ease;
        border-radius: 6px;
    }
    .bau-details-row:hover .bau-copy-btn { opacity: 1; background: #E8F0FE; }
    .bau-copy-btn:active { transform: scale(0.85); transition: transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1); }

    .bau-details-divider {
        grid-column: 1 / -1;
        height: 1px;
        background: #DADCE0;
        margin: 8px 0;
    }

    .bau-input-group {
      display: flex;
    }

    .bau-input-group > .bau-input {
      border-radius: 8px 0 0 8px;
    }

    .bau-mini-btn-input {
      background: #F8F9FA;
      border: 1px solid #DADCE0;
      color: #5F6368;
      border-radius: 0 8px 8px 0;
      padding: 12px 16px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
      margin-left: -1px;
      display: flex;
      align-items: center;
      justify-content: center;
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
      font-weight: 600;
      color: #1A73E8;
      letter-spacing: 0.3px;
    }

    .bau-mini-btn-input:hover {
      background: #F1F3F4;
      color: #202124;
      border-color: #5F6368;
      z-index: 1;
    }

    @media (prefers-reduced-motion: reduce) {
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
  `,document.head.appendChild(e)};var ar=[{value:"PT-BR",text:"Portugu\xEAs (PT-BR)"},{value:"ES",text:"Espanhol (ES)"},{value:"EN",text:"Ingl\xEAs (EN)"}],xt={steps:[{id:0,title:"Selecione o tipo de atendimento",isBranching:!0},{id:1,title:"Contexto e Valida\xE7\xE3o",fields:[{id:"advName",name:"advName",label:"Nome do Anunciante",type:"text",placeholder:"Nome do Anunciante",required:!0,isSmart:!0},{id:"advLastName",name:"advLastName",label:"Sobrenome do Anunciante",type:"text",placeholder:"Sobrenome do Anunciante",required:!1,isSmart:!0},{id:"advPhone",name:"advPhone",label:"Telefone do Anunciante",type:"text",placeholder:"+55 11 90000-0000",required:!1,isSmart:!0},{id:"advEmail",name:"advEmail",label:"Email do Anunciante",type:"text",placeholder:"email@exemplo.com",required:!0,isSmart:!0,validation:{regex:"^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",error:"Formato de email inv\xE1lido"}},{id:"cid",name:"cid",label:"CID",type:"text",placeholder:"000-000-0000",required:!0,isSmart:!0,tooltip:"Use o formato 000-000-0000 ou 10 d\xEDgitos",validation:{regex:"^(\\d{3}-\\d{3}-\\d{4}|\\d{10})$",error:"Formato de CID incorreto"}},{id:"amName",name:"amName",label:"Account Manager (AM)",type:"text",placeholder:"Nome do AM",required:!0,isSmart:!0},{id:"website",name:"website",label:"Website",type:"text",placeholder:"https://www.exemplo.com",required:!0,isSmart:!0},{id:"seId",name:"seId",label:"Speakeasy ID (SE ID)",type:"text-with-button",placeholder:"Speakeasy ID",required:!1,isSmart:!0,button:{id:"bau-top-se-search",icon:"wand",title:"Buscar ID automaticamente"}},{id:"language",name:"language",label:"Idioma do Atendimento",type:"select",required:!0,tooltip:"Vem do seu segmento na planilha People. Troque s\xF3 quando este caso fugir da regra.",options:ar}]},{id:2,title:"Tasks",fields:[{id:"reason",name:"reason",label:"O que deve ser feito em BAU",type:"textarea",placeholder:"Descreva as a\xE7\xF5es esperadas...",required:!0,style:{minHeight:"80px"}},{id:"taskType",name:"taskType",label:"Tasks para BAU (Selecione 1 ou mais)",type:"checkbox-grid",required:!0,tooltip:"Selecione os tipos de implementa\xE7\xE3o t\xE9cnica",options:["Ads Conversion Tracking","Ads Dynamic Remarketing","Ads Enhanced Conversions","Ads Website Call Conversion","Ads Remarketing","Analytics Cross Domain Tracking","Analytics E-Commerce Tracking","Analytics Enhanced E-Commerce Tracking","Analytics Event Tracking","Analytics Health Check","Analytics Remarketing","Analytics Setup","Fix GA4 implementation","Consent Mode","Fix Sitewide Tagging (OGT & CT)","Google Tag Manager Installation","Customer Match"]}]},{id:3,title:"Justificativa e Agendamento",fields:[{id:"nonImplementationReason",name:"nonImplementationReason",label:"Motivo da N\xE3o Implementa\xE7\xE3o (Justificativa BAU)",type:"select",required:!0,options:[{value:"",text:"Selecione um motivo..."},{value:"Tempo da consultoria esgotado",text:"Tempo da consultoria esgotado"},{value:"Solicita\xE7\xE3o de reagendamento pelo anunciante",text:"Solicita\xE7\xE3o de reagendamento pelo anunciante"},{value:"Falta de acessos ou backup do site",text:"Falta de acessos ou backup do site"},{value:"Anunciante indispon\xEDvel ou n\xE3o preparado",text:"Anunciante indispon\xEDvel ou n\xE3o preparado"},{value:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)",text:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"},{value:"Solicita\xE7\xE3o de tarefas (tasks) adicionais",text:"Solicita\xE7\xE3o de tarefas (tasks) adicionais"},{value:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)",text:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"},{value:"Retorno de contato ap\xF3s prazo de 14 dias expirado",text:"Retorno de contato ap\xF3s prazo de 14 dias expirado"}]},{id:"description",i18nKey:"description_justificativa",name:"description",label:"Justificativa / Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva detalhadamente o que precisa ser feito...",required:!0},{id:"availability",name:"availability",label:"Disponibilidade (m\xEDnimo 1 op\xE7\xE3o)",type:"datetime-group",required:!0,fields:[{name:"availability_1",label:"Op\xE7\xE3o 1 (Prioridade)",required:!0},{name:"availability_2",label:"Op\xE7\xE3o 2 (Opcional)",required:!1},{name:"availability_3",label:"Op\xE7\xE3o 3 (Opcional)",required:!1}]},{id:"suggestDiscard",name:"suggestDiscard",label:"O caso deve ser descartado pelo TL?",type:"select",required:!1,options:[{value:"N\xE3o",text:"N\xE3o"},{value:"Sim",text:"Sim"}]}]},{id:4,title:"Confirma\xE7\xE3o",isConfirmation:!0},{id:5,title:"Solicitar Descarte",fields:[{id:"caseId",name:"caseId",label:"Case ID",type:"text",placeholder:"Case ID",required:!0,isSmart:!0},{id:"language",i18nKey:"language_descarte",name:"language",label:"Idioma do Atendimento",type:"select",required:!0,options:ar},{id:"seId",i18nKey:"seId_descarte",name:"seId",label:"Speakeasy ID (SE ID)",type:"text",placeholder:"Speakeasy ID",required:!0,isSmart:!0},{id:"description",i18nKey:"description_descarte",name:"description",label:"Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva o motivo do descarte...",required:!0},{id:"discardReason",name:"reason",label:"Motivo do Descarte",type:"select",required:!0,groups:[{label:"Live Appointments",options:[{value:"Caso Filho gerado no atendimento",text:"Caso Filho gerado no atendimento"},{value:"3\xAA Tentativa de contato sem sucesso",text:"3\xAA Tentativa de contato sem sucesso"}]},{label:"Live Meet",options:[{value:"Apenas o AM presente",text:"Apenas o AM presente"},{value:"Estouro de tempo para conclus\xE3o",text:"Estouro de tempo para conclus\xE3o"},{value:"Gera\xE7\xE3o de caso BAU (Reagendamento)",text:"Gera\xE7\xE3o de caso BAU (Reagendamento)"}]}]}]}]};var el={advName:{label:"Nombre del Anunciante",placeholder:"Nombre del Anunciante"},advLastName:{label:"Apellido del Anunciante",placeholder:"Apellido del Anunciante"},advPhone:{label:"Tel\xE9fono del Anunciante",placeholder:"+55 11 90000-0000"},advEmail:{label:"Email del Anunciante",placeholder:"email@ejemplo.com",error:"Formato de correo inv\xE1lido"},cid:{label:"CID",placeholder:"000-000-0000",tooltip:"Usa el formato 000-000-0000 o 10 d\xEDgitos",error:"Formato de CID incorrecto"},amName:{label:"Account Manager (AM)",placeholder:"Nombre del AM"},website:{label:"Website",placeholder:"https://www.ejemplo.com"},seId:{label:"Speakeasy ID (SE ID)",placeholder:"Speakeasy ID",buttonTitle:"Buscar ID autom\xE1ticamente"},seId_descarte:{label:"Speakeasy ID (SE ID)",placeholder:"Speakeasy ID"},reason:{label:"Qu\xE9 debe hacerse en BAU",placeholder:"Describe las acciones esperadas..."},taskType:{label:"Tareas para BAU (Selecciona 1 o m\xE1s)",tooltip:"Selecciona los tipos de implementaci\xF3n t\xE9cnica"},nonImplementationReason:{label:"Motivo de la No Implementaci\xF3n (Justificaci\xF3n BAU)"},description_justificativa:{label:"Justificaci\xF3n / Descripci\xF3n",placeholder:"Describe detalladamente qu\xE9 se necesita hacer..."},availability:{label:"Disponibilidad (m\xEDnimo 1 opci\xF3n)"},availability_1:{label:"Opci\xF3n 1 (Prioridad)"},availability_2:{label:"Opci\xF3n 2 (Opcional)"},availability_3:{label:"Opci\xF3n 3 (Opcional)"},suggestDiscard:{label:"\xBFEl caso debe ser descartado por el TL?"},caseId:{label:"Case ID",placeholder:"Case ID"},language:{label:"Idioma de la Atenci\xF3n",tooltip:"Viene de tu segmento en la hoja People. C\xE1mbialo solo cuando este caso se salga de la regla."},language_descarte:{label:"Idioma de la Atenci\xF3n"},description_descarte:{label:"Descripci\xF3n",placeholder:"Describe el motivo del descarte..."},discardReason:{label:"Motivo del Descarte"}},tl={"Selecione um motivo...":"Selecciona un motivo...","Tempo da consultoria esgotado":"Tiempo de la consultor\xEDa agotado","Solicita\xE7\xE3o de reagendamento pelo anunciante":"Solicitud de reprogramaci\xF3n por parte del anunciante","Falta de acessos ou backup do site":"Falta de accesos o copia de seguridad del sitio","Anunciante indispon\xEDvel ou n\xE3o preparado":"Anunciante no disponible o no preparado","Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)":"Implementaci\xF3n parcial (no todas las tareas completadas)","Solicita\xE7\xE3o de tarefas (tasks) adicionais":"Solicitud de tareas adicionales","Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)":"Necesidad de nuevos cambios (fase de seguimiento)","Retorno de contato ap\xF3s prazo de 14 dias expirado":"Retorno de contacto despu\xE9s de vencido el plazo de 14 d\xEDas","Caso Filho gerado no atendimento":"Caso Hijo generado en la atenci\xF3n","3\xAA Tentativa de contato sem sucesso":"3.\xBA intento de contacto sin \xE9xito","Apenas o AM presente":"Solo el AM presente","Estouro de tempo para conclus\xE3o":"Tiempo excedido para la conclusi\xF3n","Gera\xE7\xE3o de caso BAU (Reagendamento)":"Generaci\xF3n de caso BAU (Reprogramaci\xF3n)",Sim:"S\xED",N\u00E3o:"No","Portugu\xEAs (PT-BR)":"Portugu\xE9s (PT-BR)","Espanhol (ES)":"Espa\xF1ol (ES)","Ingl\xEAs (EN)":"Ingl\xE9s (EN)"};function al(e){return e?.i18nKey||e?.id||e?.name}function Ze(e,t){let a=e?.[t];return ce()!=="es"?a:el[al(e)]?.[t]??a}function Ye(e){return ce()!=="es"?e:tl[e]??e}var ol=(()=>{let e=[];for(let t=420;t<=1260;t+=30)e.push(String(Math.floor(t/60)).padStart(2,"0")+":"+String(t%60).padStart(2,"0"));return e})(),or={pt:{statusPending:"Aguardando TL",statusApproved:"Aprovado / Criado",statusDiscarded:"Descartado pelo TL",statusCanceled:"Cancelado",statusDefault:"Pendente",timezoneWarningStrong:"Aten\xE7\xE3o:",timezoneWarningText:"Para clientes fora do fuso hor\xE1rio do Brasil, o hor\xE1rio inserido deve corresponder sempre ao hor\xE1rio local do cliente, e n\xE3o ao do agente.",checkTimezone:"Consultar Time Zone",timezoneModuleNotFound:"M\xF3dulo Time Zone n\xE3o encontrado.",headerTitle:"BAU Central",headerDesc:"Dashboard de Casos BAU",openBauCase:"Abrir caso para BAU",openBauCaseDesc:"Fluxo completo para implementa\xE7\xF5es t\xE9cnicas e suporte especializado.",requestDiscard:"Solicitar Descarte",requestDiscardDesc:"Fluxo simplificado para casos que n\xE3o requerem implementa\xE7\xE3o.",back:"Voltar",next:"Pr\xF3ximo",configuringEdit:"Configurando Edi\xE7\xE3o...",loadDashboardError:"Erro ao carregar Dashboard. Verifique sua conex\xE3o.",copiedToClipboard:"Copiado para a \xE1rea de transfer\xEAncia!",noAdditionalContext:"Nenhum contexto adicional fornecido pelo agente.",notCaptured:"N\xE3o capturado",none:"Nenhuma",language:"Idioma",lastName:"Sobrenome",phone:"Telefone",clientTimezone:"Fuso hor\xE1rio do cliente",echoEquivalence:(e,t,a)=>`<strong>${e}</strong> em ${t} equivale a <strong>${a}</strong> em Bras\xEDlia.`,echoSameZone:"O cliente est\xE1 no mesmo fuso que voc\xEA.",editPageWarning:"Aten\xE7\xE3o: Para editar as informa\xE7\xF5es, voc\xEA deve estar com a p\xE1gina deste Caso espec\xEDfico aberta no sistema. Caso contr\xE1rio, os dados capturados estar\xE3o incorretos.",onCorrectPage:"Estou na p\xE1gina correta",sending:"Enviando...",caseCreatedNoEmailConfirm:"Caso criado, mas n\xE3o conseguimos confirmar por email.",unknownError:"Erro desconhecido",newBauCase:"Novo Caso BAU",backToDashboard:"Voltar ao Dashboard",confirmDataBeforeSending:"Confirme os dados antes de enviar",submitToTl:"Enviar para o TL",saveChanges:"Salvar Altera\xE7\xF5es",editingCase:e=>`Editando Caso #${e}`,fillDetailsBelow:"Preencha os detalhes abaixo",caseSentSuccess:"Caso enviado com sucesso!",caseSentSuccessSub:"Sua solicita\xE7\xE3o foi recebida e ser\xE1 processada em breve.",genericErrorTitle:"Ops! Algo deu errado",genericErrorSub:"N\xE3o conseguimos carregar seus casos BAU no momento.",tryAgain:"Tentar Novamente",notInformed:"N\xE3o informado",reasonTooltip:"O que deve ser feito em BAU",reasonPrefix:"Motivo:",metricAwaitingTl:"Aguardando TL",caseDetailsTitle:"Detalhes do Caso",copy:"Copiar",advertiser:"Anunciante",status:"Status",cidLabel:"CID",caseIdLabel:"Case ID",speakeasyId:"Speakeasy ID",advertiserEmail:"Email do Anunciante",site:"Site",timezone:"Timezone",responsibleAm:"AM Respons\xE1vel",salesProgram:"Programa de Vendas",bauReason:"Motivo BAU",requestedTasks:"Tasks solicitadas",justification:"Justificativa",detailedDescription:"Descri\xE7\xE3o detalhada",availability:"Disponibilidade",urgent:"Urgente",undefinedName:"Nome indefinido",customerIdTooltip:"Customer ID do Anunciante",cidTooltip:"CID do Anunciante (Formato: 000-000-0000)",incompleteData:"Dados Incompletos",invalidCid:"CID Inv\xE1lido",contactSupport:"Contate o Suporte",editRequest:"Editar Solicita\xE7\xE3o",edit:"Editar",refresh:"Atualizar",noRecentCases:"Nenhum caso recente",casesWillAppear:"Seus casos BAU aparecer\xE3o aqui",createdApproved:"Criados / Aprovados",refreshDashboard:"Atualizar Dashboard",errorPrefix:e=>`Erro: ${e}`,selectAtLeastOne:e=>`Erro: Selecione pelo menos uma op\xE7\xE3o para "${e}".`,fieldRequiredDouble:e=>`Erro: O campo "${e}" \xE9 obrigat\xF3rio.`,fieldRequiredSingle:e=>`Erro: O campo '${e}' \xE9 obrigat\xF3rio.`,whatMustBeDone:"O que deve ser feito",editTasksHint:"Para editar as tasks, volte ao Passo 2",editScheduleHint:"Para editar o agendamento, volte ao Passo 3",bauJustification:"Justificativa BAU",description:"Descri\xE7\xE3o",availabilityPriority:"Disponibilidade (Prioridade)",suggestDiscardQuestion:"O caso deve ser descartado pelo TL?",editingCaseHash:e=>`Voc\xEA est\xE1 editando o caso #${e}`,editingDiscardHash:e=>`Voc\xEA est\xE1 editando o descarte do caso #${e}`,discardReason:"Motivo do Descarte",discardDescription:"Descri\xE7\xE3o do Descarte",notInformedPlaceholder:"N\xE3o informado",caseUpdatedSuccess:"Caso atualizado com sucesso!",caseDiscardSentSuccess:"Caso enviado para descarte com sucesso!"},es:{statusPending:"Esperando al TL",statusApproved:"Aprobado / Creado",statusDiscarded:"Descartado por el TL",statusCanceled:"Cancelado",statusDefault:"Pendiente",timezoneWarningStrong:"Atenci\xF3n:",timezoneWarningText:"Para clientes fuera del huso horario de Brasil, el horario ingresado siempre debe corresponder al horario local del cliente, no al del agente.",checkTimezone:"Consultar Time Zone",timezoneModuleNotFound:"M\xF3dulo Time Zone no encontrado.",headerTitle:"BAU Central",headerDesc:"Panel de Casos BAU",openBauCase:"Abrir caso para BAU",openBauCaseDesc:"Flujo completo para implementaciones t\xE9cnicas y soporte especializado.",requestDiscard:"Solicitar Descarte",requestDiscardDesc:"Flujo simplificado para casos que no requieren implementaci\xF3n.",back:"Volver",next:"Siguiente",configuringEdit:"Configurando Edici\xF3n...",loadDashboardError:"Error al cargar el Panel. Verifica tu conexi\xF3n.",copiedToClipboard:"\xA1Copiado al portapapeles!",noAdditionalContext:"Ning\xFAn contexto adicional proporcionado por el agente.",notCaptured:"No capturado",none:"Ninguna",language:"Idioma",lastName:"Apellido",phone:"Tel\xE9fono",clientTimezone:"Huso horario del cliente",echoEquivalence:(e,t,a)=>`<strong>${e}</strong> en ${t} equivale a <strong>${a}</strong> en Brasilia.`,echoSameZone:"El cliente est\xE1 en el mismo huso que t\xFA.",editPageWarning:"Atenci\xF3n: Para editar la informaci\xF3n, debes tener abierta en el sistema la p\xE1gina de este Caso espec\xEDfico. De lo contrario, los datos capturados estar\xE1n incorrectos.",onCorrectPage:"Estoy en la p\xE1gina correcta",sending:"Enviando...",caseCreatedNoEmailConfirm:"Caso creado, pero no pudimos confirmar por email.",unknownError:"Error desconocido",newBauCase:"Nuevo Caso BAU",backToDashboard:"Volver al Panel",confirmDataBeforeSending:"Confirma los datos antes de enviar",submitToTl:"Enviar al TL",saveChanges:"Guardar Cambios",editingCase:e=>`Editando Caso #${e}`,fillDetailsBelow:"Completa los detalles a continuaci\xF3n",caseSentSuccess:"\xA1Caso enviado con \xE9xito!",caseSentSuccessSub:"Tu solicitud fue recibida y ser\xE1 procesada en breve.",genericErrorTitle:"\xA1Ups! Algo sali\xF3 mal",genericErrorSub:"No pudimos cargar tus casos BAU en este momento.",tryAgain:"Intentar de Nuevo",notInformed:"No informado",reasonTooltip:"Qu\xE9 debe hacerse en BAU",reasonPrefix:"Motivo:",metricAwaitingTl:"Esperando al TL",caseDetailsTitle:"Detalles del Caso",copy:"Copiar",advertiser:"Anunciante",status:"Estado",cidLabel:"CID",caseIdLabel:"Case ID",speakeasyId:"Speakeasy ID",advertiserEmail:"Email del Anunciante",site:"Sitio",timezone:"Timezone",responsibleAm:"AM Responsable",salesProgram:"Programa de Ventas",bauReason:"Motivo BAU",requestedTasks:"Tareas solicitadas",justification:"Justificaci\xF3n",detailedDescription:"Descripci\xF3n detallada",availability:"Disponibilidad",urgent:"Urgente",undefinedName:"Nombre indefinido",customerIdTooltip:"Customer ID del Anunciante",cidTooltip:"CID del Anunciante (Formato: 000-000-0000)",incompleteData:"Datos Incompletos",invalidCid:"CID Inv\xE1lido",contactSupport:"Contacta al Soporte",editRequest:"Editar Solicitud",edit:"Editar",refresh:"Actualizar",noRecentCases:"Ning\xFAn caso reciente",casesWillAppear:"Tus casos BAU aparecer\xE1n aqu\xED",createdApproved:"Creados / Aprobados",refreshDashboard:"Actualizar Panel",errorPrefix:e=>`Error: ${e}`,selectAtLeastOne:e=>`Error: Selecciona al menos una opci\xF3n para "${e}".`,fieldRequiredDouble:e=>`Error: El campo "${e}" es obligatorio.`,fieldRequiredSingle:e=>`Error: El campo '${e}' es obligatorio.`,whatMustBeDone:"Qu\xE9 debe hacerse",editTasksHint:"Para editar las tareas, vuelve al Paso 2",editScheduleHint:"Para editar la programaci\xF3n, vuelve al Paso 3",bauJustification:"Justificaci\xF3n BAU",description:"Descripci\xF3n",availabilityPriority:"Disponibilidad (Prioridad)",suggestDiscardQuestion:"\xBFEl caso debe ser descartado por el TL?",editingCaseHash:e=>`Est\xE1s editando el caso #${e}`,editingDiscardHash:e=>`Est\xE1s editando el descarte del caso #${e}`,discardReason:"Motivo del Descarte",discardDescription:"Descripci\xF3n del Descarte",notInformedPlaceholder:"No informado",caseUpdatedSuccess:"\xA1Caso actualizado con \xE9xito!",caseDiscardSentSuccess:"\xA1Caso enviado a descarte con \xE9xito!"}};function D(e){let t=ce();return or[t]?.[e]??or.pt[e]}var Ce={add:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',back:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',wand:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.41l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/></svg>',send:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',check:'<svg width="64" height="64" viewBox="0 0 24 24" fill="none"><path class="bau-check-path" d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',folder:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',empty:'<svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.44 2s2.75-.81 3.44-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z"/></svg>',refresh:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',expand:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>'};function nr(e){switch(e){case"PENDING_TL_CREATION":return{text:D("statusPending"),class:"status-yellow",aura:"status-yellow-aura"};case"CREATED":return{text:D("statusApproved"),class:"status-green",aura:"status-green-aura"};case"DISCARDED":return{text:D("statusDiscarded"),class:"status-red",aura:"status-red-aura"};case"CANCELED_BY_AGENT":return{text:D("statusCanceled"),class:"status-gray",aura:""};default:return{text:e||D("statusDefault"),class:"status-gray",aura:""}}}function ir(e){let t=document.createElement("div");if(t.className="bau-dynamic-input",t.id=`wrapper-${e.id}`,e.label){let o=document.createElement("label");o.className="bau-label",o.textContent=Ze(e,"label"),e.tooltip&&o.setAttribute("data-tooltip",Ze(e,"tooltip")),t.appendChild(o)}let a;switch(e.type){case"textarea":a=document.createElement("textarea"),a.style.minHeight="80px",t.appendChild(a);break;case"select":a=document.createElement("select"),e.groups?e.groups.forEach(s=>{let b=document.createElement("optgroup");b.label=s.label,s.options.forEach(p=>{let h=document.createElement("option");h.value=p.value,h.textContent=Ye(p.text),b.appendChild(h)}),a.appendChild(b)}):e.options&&e.options.forEach(s=>{let b=document.createElement("option");b.value=s.value,b.textContent=Ye(s.text),a.appendChild(b)}),t.appendChild(a);break;case"checkbox-grid":return a=document.createElement("div"),a.className="bau-tasks-grid",e.options.forEach(s=>{let b=document.createElement("label");b.className="bau-task-item",b.innerHTML=`<input type="checkbox" name="${e.name}" value="${s}"><span>${s}</span>`,b.addEventListener("click",p=>{p.preventDefault();let h=b.querySelector("input");h.checked=!h.checked,b.classList.toggle("active",h.checked),v.playClick()}),a.appendChild(b)}),t.appendChild(a),t;case"datetime-group":a=document.createElement("div"),a.className="bau-availability-container";let o=document.createElement("div");o.className="bau-timezone-row",o.innerHTML=`
                <span class="bau-field-hint">${D("clientTimezone")}</span>
                <select name="availabilityTimezone" class="bau-select">
                    ${_t.map(s=>`<option value="${s.zone}">${s.flag} ${s.name} \u2014 ${s.label}</option>`).join("")}
                </select>
            `,a.appendChild(o),e.fields.forEach(s=>{let b=document.createElement("div");b.className="bau-availability-field",b.innerHTML=`
                    <span class="bau-field-hint">${Ze(s,"label")}</span>
                    <div class="bau-slot-row">
                        <input type="date" name="${s.name}_date" class="bau-input" ${s.required?"required":""}>
                        <select name="${s.name}_time" class="bau-select">
                            <option value="">--:--</option>
                            ${ol.map(p=>`<option value="${p}">${p}</option>`).join("")}
                        </select>
                    </div>
                `,a.appendChild(b)});let n=document.createElement("div");n.className="bau-timezone-echo",n.id="bau-availability-echo",a.appendChild(n);let i=document.createElement("div");return i.className="bau-availability-disclaimer",i.innerHTML=`
                <div class="bau-disclaimer-text">
                    <strong>${D("timezoneWarningStrong")}</strong> ${D("timezoneWarningText")}
                </div>
                <button type="button" class="bau-timezone-link" id="bau-open-timezone">
                    ${Ce.refresh}
                    ${D("checkTimezone")}
                </button>
            `,i.querySelector("#bau-open-timezone").onclick=()=>{let s=document.getElementById("cw-btn-timezone");s?(s.click(),v.playClick()):(v.playError(),J(D("timezoneModuleNotFound"),{error:!0}))},t.appendChild(a),t.appendChild(i),t;case"text-with-button":let r=document.createElement("div");r.className="bau-input-group",a=document.createElement("input"),a.type="text";let l=document.createElement("button");l.type="button",l.id=e.button.id,l.className="bau-mini-btn-input",l.title=Ze(e,"buttonTitle")||e.button.title,l.innerHTML=Ce[e.button.icon]||"",r.appendChild(a),r.appendChild(l),t.appendChild(r);break;default:a=document.createElement("input"),a.type="text",t.appendChild(a)}return a&&e.type!=="checkbox-grid"&&e.type!=="datetime-group"&&(a.id=`bau-form-${e.id}`,a.name=e.name,a.className=e.type==="select"?"bau-select":e.type==="textarea"?"bau-textarea":"bau-input",e.placeholder&&(a.placeholder=Ze(e,"placeholder")),e.required&&(a.required=!0)),t}function rr(){tr();let e=!1,t="dashboard",a=null,o=0,n="BAU",i=!1,r=null,l=xt.steps.length,s=document.createElement("div");s.id="bau-form-popup",s.className="bau-popup cw-module-window",s.style.display="none";let b=D("headerTitle"),p=D("headerDesc"),h=ze(s,b,"v2.2.0",p,{},()=>O());s.appendChild(h);let m=document.createElement("div");m.className="bau-view-container",s.appendChild(m);let g=document.createElement("div");g.id="bau-view-details",g.className="bau-details-view",m.appendChild(g);let I=document.createElement("div");I.id="bau-view-dashboard",I.className="bau-view active",I.innerHTML=`
        <div class="bau-dashboard-content">
            <div class="bau-dashboard-metrics" id="bau-dashboard-metrics"></div>
            <ul class="bau-case-list" id="bau-case-list-container"></ul>
        </div>
        <button class="bau-dashboard-fab" id="bau-new-case-btn">
            ${Ce.add}
            <span class="js-bau-new-case">${D("newBauCase")}</span>
        </button>
    `,m.appendChild(I);let x=document.createElement("div");x.id="bau-view-form",x.className="bau-view";let y=document.createElement("div");y.className="bau-view-header",y.innerHTML=`
      <button class="bau-back-btn" id="bau-form-back-btn">
        ${Ce.back}
        <span class="js-bau-back-dashboard">${D("backToDashboard")}</span>
      </button>
    `,x.appendChild(y);let z=document.createElement("div");z.className="bau-content",x.appendChild(z);let A=document.createElement("div");A.className="bau-form-loading-overlay",A.innerHTML=`
        <div class="bau-spinner"></div>
        <div class="bau-loading-text js-bau-configuring-edit">${D("configuringEdit")}</div>
    `,z.appendChild(A);let $=c=>{A.classList.toggle("active",c)},f=document.createElement("div");f.className="bau-progress-indicator",z.appendChild(f);let C=document.createElement("form");C.id="bau-escalation-form",C.noValidate=!0,z.appendChild(C),xt.steps.forEach(c=>{let S=document.createElement("div");if(S.className="bau-step"+(c.id===o?" active":""),S.id=`bau-step-${c.id}`,c.isBranching)S.innerHTML=`
                <div class="bau-branching-container">
                    <div class="bau-branching-card" id="bau-opt-full">
                        <div class="bau-branching-icon">${Ce.add}</div>
                        <h3 class="bau-branching-title">${D("openBauCase")}</h3>
                        <p class="bau-branching-subtitle">${D("openBauCaseDesc")}</p>
                    </div>
                    <div class="bau-branching-card" id="bau-opt-discard">
                        <div class="bau-branching-icon">${Ce.empty}</div>
                        <h3 class="bau-branching-title">${D("requestDiscard")}</h3>
                        <p class="bau-branching-subtitle">${D("requestDiscardDesc")}</p>
                    </div>
                </div>
            `,S.querySelector("#bau-opt-full").onclick=()=>{n="BAU",o=1,C.querySelectorAll(".bau-highlight-panel").forEach(u=>u.classList.remove("discard-theme")),W(),v.playClick()},S.querySelector("#bau-opt-discard").onclick=()=>{n="DISCARD",o=5,C.querySelectorAll(".bau-highlight-panel").forEach(u=>u.classList.add("discard-theme")),W(),v.playClick()};else if(c.isConfirmation)S.innerHTML=`
                <div class="bau-card">
                    <h3 class="bau-step-title">${D("confirmDataBeforeSending")}</h3>
                    <div id="bau-confirmation-details"></div>
                </div>
            `;else{let u=document.createElement("div");if(u.className="bau-card",c.id===1||c.id===5){u.innerHTML=`
                    <div class="bau-vital-highlights bau-highlight-panel"></div>
                    <div class="bau-dynamic-inputs-container"></div>
                    <div class="bau-all-data"></div>
                `;let L=u.querySelector(".bau-dynamic-inputs-container");c.fields.forEach(te=>{L.appendChild(ir(te))});let M=u.querySelector("#wrapper-cid");if(M){let te=document.createElement("div");te.id="bau-cid-error",te.className="bau-cid-error-hint",te.style.display="none",te.textContent="Formato de CID incorreto",M.appendChild(te)}}else c.fields.forEach(L=>{u.appendChild(ir(L))});S.appendChild(u)}C.appendChild(S)});let P=document.createElement("div");P.className="bau-footer";let q=document.createElement("button");q.type="button",q.id="bau-step-back-btn",q.className="bau-btn-secondary",q.textContent=D("back");let E=document.createElement("button");E.type="button",E.id="bau-step-next-btn",E.className="bau-btn-primary",E.textContent=D("next");let N=document.createElement("button");N.type="submit",N.className="bau-btn-submit",N.innerHTML=`${Ce.send} ${D("submitToTl")}`,N.style.display="none",P.appendChild(q),P.appendChild(E),P.appendChild(N),C.appendChild(P),m.appendChild(x);let k=document.createElement("div");k.id="bau-view-success",k.className="bau-view bau-success-view",k.innerHTML=`
        <div class="bau-success-content">
            <div class="bau-success-icon" style="color: ${kt.green};">${Ce.check}</div>
            <h2 class="bau-success-title js-bau-success-title">${D("caseSentSuccess")}</h2>
            <p class="bau-success-subtitle js-bau-success-sub">${D("caseSentSuccessSub")}</p>
            <button class="bau-btn-primary js-bau-success-back" id="bau-success-back-btn">${D("backToDashboard")}</button>
        </div>
    `,m.appendChild(k),document.body.appendChild(s);function F(c){t=c,s.querySelectorAll(".bau-view").forEach(te=>te.classList.remove("active"));let S=s.querySelector(`#bau-view-${c}`);S&&S.classList.add("active");let u=h.querySelector(".cw-module-header-title")||h.querySelector("h2"),L=h.querySelector(".cw-module-header-subtitle")||h.querySelector("p");u&&(c==="form"?u.textContent=i?D("editingCase")(r):D("newBauCase"):u.textContent=D("headerTitle")),L&&(L.textContent=D(c==="form"?"fillDetailsBelow":"headerDesc"));let M=C.querySelector(".bau-btn-submit");M&&(M.innerHTML=i?`${Ce.send} ${D("saveChanges")}`:`${Ce.send} ${D("submitToTl")}`)}function H(){let c=s.querySelector("#bau-case-list-container"),S=s.querySelector("#bau-dashboard-metrics");S&&(S.innerHTML=`
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
            `),c&&(c.innerHTML=Array(5).fill(0).map(()=>`
            <div class="bau-skeleton-card">
                <div class="bau-shimmer"></div>
            </div>
        `).join(""))}async function R(){let c=s.querySelector("#bau-case-list-container"),S=s.querySelector("#bau-dashboard-metrics");if(!(!c||!S)){H();try{let u=await Mo();if(!Array.isArray(u))throw new Error("API response is not a valid array");de(u)}catch(u){console.error("Critical Error loading BAU cases:",u),S&&(S.innerHTML=""),c.innerHTML=`
                <div class="bau-empty-state bau-error-state">
                    <div style="color: ${kt.red}; margin-bottom: 16px;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    </div>
                    <h3 class="bau-empty-title">${D("genericErrorTitle")}</h3>
                    <p class="bau-empty-subtitle">${D("genericErrorSub")}</p>
                    <button class="bau-btn-secondary" id="bau-retry-btn" style="margin-top: 16px;">
                        ${D("tryAgain")}
                    </button>
                </div>
            `,s.querySelector("#bau-retry-btn")?.addEventListener("click",()=>R()),v.playError(),J(D("loadDashboardError"),{error:!0})}}}function Q(c){if(!c)return;let S=nr(c.status),u=(M,te)=>{navigator.clipboard.writeText(M).then(()=>{J(D("copiedToClipboard")),v.playClick();let d=te.style.color;te.style.color="#1E8E3E",setTimeout(()=>{te.style.color=d},800)})};g.innerHTML=`
            <div class="bau-details-header">
                <h2 class="bau-details-title">${D("caseDetailsTitle")}</h2>
                <button class="bau-details-close-btn">
                    ${Ce.back}
                    ${D("back")}
                </button>
            </div>
            <div class="bau-details-content">
                <div class="bau-details-grid">
                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${D("advertiser")}</span>
                            <span class="bau-details-value">${[c.advName,c.advLastName].filter(Boolean).join(" ")||"---"}</span>
                            <button class="bau-copy-btn" title="${D("copy")}">${Ce.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${D("status")}</span>
                            <span class="bau-case-status-badge ${S.class}">${S.text}</span>
                        </div>
                    </div>
                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${D("cidLabel")}</span>
                            <span class="bau-details-value">${c.cid||"---"}</span>
                            <button class="bau-copy-btn" title="${D("copy")}">${Ce.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${D("caseIdLabel")}</span>
                            <span class="bau-details-value">${c.caseId||"---"}</span>
                            <button class="bau-copy-btn" title="${D("copy")}">${Ce.wand}</button>
                        </div>
                    </div>

                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${D("speakeasyId")}</span>
                            <span class="bau-details-value">${c.seId||"---"}</span>
                            <button class="bau-copy-btn" title="${D("copy")}">${Ce.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${D("advertiserEmail")}</span>
                            <span class="bau-details-value">${c.advEmail||"---"}</span>
                            <button class="bau-copy-btn" title="${D("copy")}">${Ce.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${D("phone")}</span>
                            <span class="bau-details-value">${c.advPhone||"---"}</span>
                            <button class="bau-copy-btn" title="${D("copy")}">${Ce.wand}</button>
                        </div>
                    </div>
                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${D("site")}</span>
                            <span class="bau-details-value">${c.site||"---"}</span>
                            <button class="bau-copy-btn" title="${D("copy")}">${Ce.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${D("timezone")}</span>
                            <span class="bau-details-value">${c.timezone||"---"}</span>
                        </div>
                    </div>

                    <div class="bau-details-card full-width">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${D("language")}</span>
                            <span class="bau-details-value">${c.language||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${D("responsibleAm")}</span>
                            <span class="bau-details-value">${c.amName||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${D("salesProgram")}</span>
                            <span class="bau-details-value">${c.salesProgram||"---"}</span>
                        </div>
                    </div>

                    <div class="bau-details-card full-width">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${D("bauReason")}</span>
                            <span class="bau-details-value">${c.reason||D("notInformed")}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${D("requestedTasks")}</span>
                            <span class="bau-details-value">${c.task||c.taskType||D("none")}</span>
                        </div>
                    </div>

                    <div class="bau-details-card full-width">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${D("justification")}</span>
                            <span class="bau-details-value">${c.nonImplementationReason||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${D("detailedDescription")}</span>
                            <span class="bau-details-value">${c.description||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${D("availability")}</span>
                            <span class="bau-details-value">${fa(c.availability)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;let L=g.querySelector(".bau-details-close-btn");L.onclick=()=>{g.classList.remove("active"),v.playSwoosh(),setTimeout(()=>{g.style.display="none"},600)},g.querySelectorAll(".bau-copy-btn").forEach(M=>{M.onclick=te=>{let d=te.target.closest(".bau-details-row").querySelector(".bau-details-value").textContent;u(d,M)}}),g.style.display="flex",requestAnimationFrame(()=>{g.classList.add("active"),v.playClick()})}function le(c){if(!c)return"";let S=nr(c?.status),u=fa(c?.date),L="",M="",te=String(c?.availability||"").split("|")[0].trim();if(c?.status==="PENDING_TL_CREATION"&&te){let ee=new Date(te),ae=new Date;!isNaN(ee.getTime())&&(ee<=ae||ee-ae<36e5*2)&&(L=`<span class="bau-sla-badge">${D("urgent")}</span>`,M="bau-pulse-attention")}let d=c?.reason&&c.reason.trim()?c.reason:D("noAdditionalContext"),T=/^(\d{3}-\d{3}-\d{4}|\d{10})$/.test(c?.cid||""),Y=!c?.caseId||c.caseId==="N/A"||!T;return Y&&c?.status==="PENDING_TL_CREATION"&&(M="bau-pulse-attention"),`
            <li class="bau-case-card ${S.aura} ${M}" data-case-id="${c?.id||""}">
                <div class="bau-case-main">
                    <div class="bau-case-icon">${Ce.folder}</div>
                    <div class="bau-case-info">
                        <div class="bau-case-header">
                            <h3 class="bau-case-title">${c?.advName||D("undefinedName")}</h3>
                            ${L}
                            <span class="bau-case-date">${u}</span>
                        </div>
                        <p class="bau-case-details">
                            <span data-tooltip="${D("customerIdTooltip")}">Case: ${c?.caseId||"N/A"}</span> \u2022
                            <span data-tooltip="${D("cidTooltip")}" class="${T?"":"bau-error-text"}">CID: ${c?.cid||"N/A"}</span> \u2022
                            <span data-tooltip="${D("reasonTooltip")}">${D("reasonPrefix")} ${d}</span>
                        </p>
                        ${Y?`<div class="bau-data-error-hint">${!c?.caseId||c?.caseId==="N/A"?D("incompleteData"):D("invalidCid")} - ${D("contactSupport")}</div>`:""}
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                    <span class="bau-case-status-badge ${S.class}">${S.text}</span>
                    ${c?.status&&c.status.includes("PENDING")?`
                        <button class="bau-case-edit-btn" data-id="${c.id}" title="${D("editRequest")}">
                            ${Ce.edit}
                            ${D("edit")}
                        </button>
                    `:""}
                </div>
            </li>
        `}function de(c){let S=s.querySelector("#bau-case-list-container"),u=s.querySelector("#bau-dashboard-metrics");if(!S||!u)return;let L=Array.isArray(c)?c.filter(Boolean):[];if(L.length===0){u.innerHTML=`
                <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard">
                    ${Ce.refresh}
                    ${D("refresh")}
                </button>
            `,S.innerHTML=`
                <div class="bau-empty-state">
                    ${Ce.empty}
                    <h3 class="bau-empty-title">${D("noRecentCases")}</h3>
                    <p class="bau-empty-subtitle">${D("casesWillAppear")}</p>
                </div>
            `,s.querySelector("#bau-refresh-dashboard")?.addEventListener("click",()=>R());return}let M=L.filter(Y=>Y.status==="PENDING_TL_CREATION").length,te=L.filter(Y=>Y.status==="CREATED").length;u.innerHTML=`
            <div class="bau-metric-card">
                <span class="bau-metric-value">${M}</span>
                <span class="bau-metric-label">${D("metricAwaitingTl")}</span>
            </div>
            <div class="bau-metric-card">
                <span class="bau-metric-value">${te}</span>
                <span class="bau-metric-label">${D("createdApproved")}</span>
            </div>
            <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard" title="${D("refreshDashboard")}">
                ${Ce.refresh}
            </button>
        `;let d=u.querySelector("#bau-refresh-dashboard");d?.addEventListener("click",async()=>{d.classList.contains("spinning")||(d.classList.add("spinning"),v.playClick(),await R(),setTimeout(()=>d.classList.remove("spinning"),1e3))}),S.innerHTML="";let w=L.slice(0,5),T=L.slice(5);if(w.forEach(Y=>{let ee=le(Y),ae=document.createElement("div");ae.innerHTML=ee;let se=ae.firstElementChild;se.addEventListener("click",we=>{we.target.closest(".bau-case-edit-btn")||Q(Y)});let he=se.querySelector(".bau-case-edit-btn");he&&(he.onclick=we=>{we.stopPropagation(),G(Y)}),S.appendChild(se)}),T.length>0){let Y=document.createElement("li");Y.className="bau-accordion-container";let ee=document.createElement("button");ee.className="bau-accordion-toggle",ee.innerHTML=`${Ce.expand} <span>Mostrar ${T.length} casos mais antigos</span>`;let ae=document.createElement("ul");ae.className="bau-case-list bau-accordion-content",ae.style.display="none",T.forEach(se=>{let he=le(se),we=document.createElement("div");we.innerHTML=he;let Be=we.firstElementChild;Be.addEventListener("click",We=>{We.target.closest(".bau-case-edit-btn")||Q(se)});let _e=Be.querySelector(".bau-case-edit-btn");_e&&(_e.onclick=We=>{We.stopPropagation(),G(se)}),ae.appendChild(Be)}),ee.addEventListener("click",()=>{let se=ae.style.display==="none";ae.style.display=se?"block":"none",ee.classList.toggle("expanded",se),ee.querySelector("span").textContent=se?"Esconder casos mais antigos":`Mostrar ${T.length} casos mais antigos`,v.playClick()}),Y.appendChild(ee),Y.appendChild(ae),S.appendChild(Y)}}function W(){let c=n==="BAU"?[1,2,3,4]:[5,4];C.querySelectorAll(".bau-step").forEach(L=>{let M=parseInt(L.id.replace("bau-step-","")),te=M===o,d=c.includes(M)||M===0;L.classList.toggle("active",te),L.style.display=te?"block":"none",L.querySelectorAll("input, select, textarea").forEach(w=>{w.disabled=!d})});let S=o===0;if(f.style.display=S?"none":"flex",!S){f.innerHTML="";let L=n==="BAU"?[1,2,3,4]:[5,4];L.forEach((M,te)=>{let d=document.createElement("div"),w=M===o,T=L.indexOf(o),Y=te<T;d.className=`bau-progress-step ${w?"active":Y?"completed":""}`,d.textContent=te+1,f.appendChild(d)})}let u=o===4;q.style.display=o>0?"inline-block":"none",E.style.display=!S&&!u?"inline-block":"none",N.style.display=u?"flex":"none",u&&_()}function oe(c){let S=xt.steps.find(u=>u.id===c);if(!S||!S.fields||S.isConfirmation)return!0;for(let u of S.fields){let L=C.querySelector(`#bau-step-${c} #wrapper-${u.id}`);if(!(L&&L.style.display==="none")&&u.validation){let M=C.querySelector(`#bau-step-${c} [name="${u.name}"]`);if(M&&M.offsetParent!==null&&M.value.trim())if(new RegExp(u.validation.regex).test(M.value.trim())){M.classList.remove("invalid-cid");let d=C.querySelector("#bau-cid-error");d&&(d.style.display="none")}else{console.warn(`Validation failed for field "${u.name}" in step ${c}: Regex mismatch.`),v.playError(),J(D("errorPrefix")(Ze(u,"error")||u.validation.error),{error:!0}),M.classList.add("invalid-cid");let d=C.querySelector("#bau-cid-error");return d&&(d.style.display="flex"),!1}}}return!0}function U(c){if(!C.querySelector(`#bau-step-${c}`))return!1;let u=xt.steps.find(M=>M.id===c);if(!u||!u.fields||u.isConfirmation)return!0;let L=!0;for(let M of u.fields){let te=C.querySelector(`#bau-step-${c} #wrapper-${M.id}`);if(!(te&&te.style.display==="none")&&M.required){let d=!0,w="";if(M.type==="checkbox-grid")C.querySelector(`#bau-step-${c} input[name="${M.name}"]:checked`)||(w="No option selected in checkbox-grid",v.playError(),J(D("selectAtLeastOne")(Ze(M,"label")),{error:!0}),d=!1);else if(M.type==="datetime-group"){let T=M.fields[0].name,Y=C.querySelector(`#bau-step-${c} input[name="${T}_date"]`),ee=C.querySelector(`#bau-step-${c} select[name="${T}_time"]`);if(!Y||Y.offsetParent===null)continue;(!Y.value.trim()||!ee||!ee.value.trim())&&(w="Datetime group first field is empty",v.playError(),J(D("fieldRequiredDouble")(Ze(M.fields[0],"label")),{error:!0}),d=!1)}else{let T=C.querySelector(`#bau-step-${c} [name="${M.name}"]`);if(!T||T.offsetParent===null)continue;T.value.trim()||(w="Field is empty",v.playError(),J(D("fieldRequiredSingle")(Ze(M,"label")),{error:!0}),d=!1)}if(!d){console.warn(`Validation failed for required field "${M.name}" in step ${c}: ${w}`),L=!1;break}}}return L}E.addEventListener("click",()=>{if(oe(o)&&U(o)){n==="BAU"?o++:o===5?o=4:o++,W();let c=s.querySelector(".bau-content");c&&(c.scrollTop=0),v.playClick()}}),q.addEventListener("click",()=>{o>0&&(n==="BAU"?o--:o===4?o=5:o===5?o=0:o--,W(),v.playClick())});async function re(){let c=await Qe()||{};(!c.amName||c.amName==="N/A")&&(c.amName=c.internalEmail||"N/A"),a=c,C.querySelectorAll(".bau-vital-highlights").forEach(d=>{let w=[{label:"Anunciante",value:c.advName},{label:"CID",value:c.cid},{label:"Website",value:c.website||c.site},{label:"Case ID",value:c.caseId}];d.innerHTML=w.map(T=>{let Y=T.value&&T.value!=="N/A"&&T.value!=="undefined"&&T.value!=="null"?T.value:D("notCaptured");return`
                    <div class="bau-highlight-item">
                        <span class="bau-highlight-label">${T.label}</span>
                        <span class="bau-highlight-value">${Y}</span>
                    </div>
                `}).join("")}),xt.steps.forEach(d=>{d.fields&&d.fields.forEach(w=>{if(w.isSmart){let T=c[w.id],Y=C.querySelector(`#bau-step-${d.id} [name="${w.name}"]`),ee=C.querySelector(`#bau-step-${d.id} #wrapper-${w.id}`);if(Y&&(Y.value=T&&T!=="N/A"?T:""),ee){let ae=T&&T!==""&&T!=="N/A"&&T!=="undefined"&&T!=="null";ee.style.display=ae?"none":"block"}}})});let u=So(c.timezone)||Ct,L=C.querySelector('select[name="availabilityTimezone"]');L&&(L.value=u,V());let M=c.userProfile?.defaultLanguage;M&&C.querySelectorAll('select[name="language"]').forEach(d=>{d.value=M}),C.querySelectorAll(".bau-all-data").forEach(d=>{let w=[{label:"Anunciante",value:c.advName},{label:"CID",value:c.cid},{label:"AM",value:c.amName},{label:"SE ID",value:c.seId},{label:"Site",value:c.website||c.site},{label:"Email",value:c.email},{label:"Timezone",value:c.timezone},{label:"Case ID",value:c.caseId},{label:"Programa",value:c.salesProgram},{label:"Idioma",value:c.language}];d.innerHTML=`
                <div class="bau-context-badges-grid">
                    ${w.filter(T=>T.value&&T.value!=="N/A"&&T.value!=="---"&&T.value!=="undefined"&&T.value!=="null").map(T=>`
                            <div class="bau-context-badge">
                                <span class="bau-badge-label">${T.label}:</span>
                                <span class="bau-badge-value">${T.value}</span>
                            </div>
                        `).join("")}
                </div>
            `})}s.querySelector("#bau-top-se-search")?.addEventListener("click",c=>{c.preventDefault(),Sa("bau-form-seId")});let B=s.querySelector("#bau-form-cid");B&&B.addEventListener("input",()=>oe(1)),C.addEventListener("change",c=>{let S=c.target?.name||"";(S==="availabilityTimezone"||S.startsWith("availability_"))&&V()});function Z(c){let S=c.availabilityTimezone||Ct;return["availability_1","availability_2","availability_3"].map(u=>{let L=c[`${u}_date`],M=c[`${u}_time`];return!L||!M?"":wo(`${L}T${M}`,S)}).filter(Boolean)}function ne(c){let S=c.availabilityTimezone||Ct,u=_t.find(te=>te.zone===S),L=Z(c);return L.length===0?D("notInformedPlaceholder"):`${L.map(te=>{let[d,w]=te.split("T"),[T,Y,ee]=d.split("-");return`${ee}/${Y} ${w.slice(0,5)}`}).join("  \xB7  ")} \u2014 ${u?u.label:S}`}function V(){let c=C.querySelector("#bau-availability-echo");if(!c)return;let S=Object.fromEntries(new FormData(C).entries()),u=S.availabilityTimezone||Ct,L=S.availability_1_date,M=S.availability_1_time;if(!L||!M){c.innerHTML="";return}if(u===Ct){c.textContent=D("echoSameZone");return}let te=wo(`${L}T${M}`,u),d=new Date(te);if(isNaN(d.getTime())){c.innerHTML="";return}let w=new Intl.DateTimeFormat("pt-BR",{timeZone:Ct,day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).format(d),T=_t.find(Y=>Y.zone===u);c.innerHTML=D("echoEquivalence")(M,T?T.label:u,w)}function ie(c){return(xt.steps.flatMap(u=>u.fields||[]).find(u=>u.id==="language")?.options||[]).map(u=>`<option value="${u.value}" ${u.value===c?"selected":""}>${Ye(u.text)}</option>`).join("")}function _(){let c=new FormData(C),S=Object.fromEntries(c.entries()),u=s.querySelector("#bau-confirmation-details");if(u){if(n==="BAU"){let L=c.getAll("taskType"),M=L.length>0?L.join(", "):D("none");u.innerHTML=`
                ${i?`<div class="bau-highlight-panel" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${kt.yellow}; background: rgba(255, 186, 0, 0.05); border-radius: 8px; font-weight: 500;">${D("editingCaseHash")(`<span style="color: ${kt.yellow}">${r}</span>`)}</div>`:""}
                <div class="bau-confirmation-grid">
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Anunciante</span>
                        <input class="bau-confirm-value-input" data-field="advName" data-step="1" value="${S.advName||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${D("lastName")}</span>
                        <input class="bau-confirm-value-input" data-field="advLastName" data-step="1" value="${S.advLastName||""}" placeholder="${D("notInformedPlaceholder")}">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${D("advertiserEmail")}</span>
                        <input class="bau-confirm-value-input" data-field="advEmail" data-step="1" value="${S.advEmail||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${D("phone")}</span>
                        <input class="bau-confirm-value-input" data-field="advPhone" data-step="1" value="${S.advPhone||""}" placeholder="${D("notInformedPlaceholder")}">
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
                        <input class="bau-confirm-value-input" data-field="seId" data-step="1" value="${S.seId||""}" placeholder="${D("notInformedPlaceholder")}">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${D("language")}</span>
                        <select class="bau-confirm-value-input" data-field="language" data-step="1">
                            ${ie(S.language)}
                        </select>
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${D("whatMustBeDone")}</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="reason" data-step="2" placeholder="---">${S.reason||""}</textarea>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Tasks</span>
                        <span class="bau-confirm-value-input" style="cursor: default; opacity: 0.8;" title="${D("editTasksHint")}">${M}</span>
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${D("bauJustification")}</span>
                        <select class="bau-confirm-value-input" data-field="nonImplementationReason" data-step="3">
                            <option value="Tempo da consultoria esgotado" ${S.nonImplementationReason==="Tempo da consultoria esgotado"?"selected":""}>${Ye("Tempo da consultoria esgotado")}</option>
                            <option value="Solicita\xE7\xE3o de reagendamento pelo anunciante" ${S.nonImplementationReason==="Solicita\xE7\xE3o de reagendamento pelo anunciante"?"selected":""}>${Ye("Solicita\xE7\xE3o de reagendamento pelo anunciante")}</option>
                            <option value="Falta de acessos ou backup do site" ${S.nonImplementationReason==="Falta de acessos ou backup do site"?"selected":""}>${Ye("Falta de acessos ou backup do site")}</option>
                            <option value="Anunciante indispon\xEDvel ou n\xE3o preparado" ${S.nonImplementationReason==="Anunciante indispon\xEDvel ou n\xE3o preparado"?"selected":""}>${Ye("Anunciante indispon\xEDvel ou n\xE3o preparado")}</option>
                            <option value="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)" ${S.nonImplementationReason==="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"?"selected":""}>${Ye("Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)")}</option>
                            <option value="Solicita\xE7\xE3o de tarefas (tasks) adicionais" ${S.nonImplementationReason==="Solicita\xE7\xE3o de tarefas (tasks) adicionais"?"selected":""}>${Ye("Solicita\xE7\xE3o de tarefas (tasks) adicionais")}</option>
                            <option value="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)" ${S.nonImplementationReason==="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"?"selected":""}>${Ye("Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)")}</option>
                            <option value="Retorno de contato ap\xF3s prazo de 14 dias expirado" ${S.nonImplementationReason==="Retorno de contato ap\xF3s prazo de 14 dias expirado"?"selected":""}>${Ye("Retorno de contato ap\xF3s prazo de 14 dias expirado")}</option>
                        </select>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${D("description")}</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="3" placeholder="---">${S.description||""}</textarea>
                    </div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${D("availabilityPriority")}</span>
                        <span class="bau-confirm-value-input" style="cursor: default; opacity: 0.8;" title="${D("editScheduleHint")}">${ne(S)}</span>
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${D("suggestDiscardQuestion")}</span>
                        <select class="bau-confirm-value-input" data-field="suggestDiscard" data-step="3">
                            <option value="N\xE3o" ${S.suggestDiscard==="N\xE3o"?"selected":""}>${Ye("N\xE3o")}</option>
                            <option value="Sim" ${S.suggestDiscard==="Sim"?"selected":""}>${Ye("Sim")}</option>
                        </select>
                    </div>
                </div>
            `}else u.innerHTML=`
                ${i?`<div class="bau-highlight-panel discard-theme" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${kt.red}; background: rgba(217, 48, 37, 0.05); border-radius: 8px; font-weight: 500;">${D("editingDiscardHash")(`<span style="color: ${kt.red}">${r}</span>`)}</div>`:""}
                <div class="bau-confirmation-grid">
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Case ID</span>
                        <input class="bau-confirm-value-input" data-field="caseId" data-step="5" value="${S.caseId||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${D("language")}</span>
                        <select class="bau-confirm-value-input" data-field="language" data-step="5">
                            ${ie(S.language)}
                        </select>
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Speakeasy ID</span>
                        <input class="bau-confirm-value-input" data-field="seId" data-step="5" value="${S.seId||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${D("discardReason")}</span>
                        <input class="bau-confirm-value-input" data-field="reason" data-step="5" value="${S.reason||""}" placeholder="---" readonly style="opacity: 0.7;">
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${D("discardDescription")}</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="5" placeholder="---">${S.description||""}</textarea>
                    </div>
                </div>
            `;u.querySelectorAll(".bau-confirm-value-input").forEach(L=>{L.addEventListener("input",M=>{let te=M.target.dataset.field,d=M.target.dataset.step;if(!te||!d)return;let w=C.querySelector(`#bau-step-${d} [name="${te}"]`);w&&(w.value=M.target.value,te==="cid"&&oe(1))})})}}async function G(c){if(!await Me(D("editPageWarning"),{confirmText:D("onCorrectPage")}))return;$(!0),K(),i=!0,r=c.id,n=c.status==="PENDING_TL_DISCARD"||c.reason&&!c.task?"DISCARD":"BAU",F("form"),await re(),a={...a,advName:c.advName||a.advName,advLastName:c.advLastName||a.advLastName,advPhone:c.advPhone||a.advPhone,cid:c.cid||a.cid,caseId:c.caseId||a.caseId,seId:c.seId||a.seId,site:c.site||c.website||a.site||a.website,email:c.advEmail||a.email,timezone:c.timezone||a.timezone,language:c.language||a.language,amName:c.amName||a.amName,salesProgram:c.salesProgram||a.salesProgram};let u=c.availability?c.availability.split("|").map(L=>L.trim()):[];C.querySelectorAll("input, select, textarea").forEach(L=>{let M=L.name,d={advEmail:"advEmail",website:"site",site:"site"}[M]||M;if(M==="taskType"){let w=(c.task||c.taskType||"").split(",").map(T=>T.trim());L.type==="checkbox"&&(L.checked=w.includes(L.value),L.closest(".bau-task-item")?.classList.toggle("active",L.checked))}else if(M==="availabilityTimezone"){let w=So(c.timezone)||Ct;Array.from(L.options).some(T=>T.value===w)&&(L.value=w)}else if(M.startsWith("availability_")){let w=M.split("_"),T=parseInt(w[1],10)-1,Y=w[2],ee=u[T],ae=String(ee||"").match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/);if(!ae)return;Y==="date"&&(L.value=ae[1]),Y==="time"&&(Array.from(L.options).some(se=>se.value===ae[2])||L.add(new Option(ae[2],ae[2])),L.value=ae[2])}else M==="language"?Array.from(L.options).some(T=>T.value===c.language)&&(L.value=c.language):c[d]!==void 0?L.value=c[d]:M==="reason"?L.value=c.reason:M==="description"?L.value=c.description:M==="nonImplementationReason"&&(L.value=c.nonImplementationReason||"")}),o=n==="BAU"?1:5,W(),v.playClick(),setTimeout(()=>$(!1),500)}C.onsubmit=async c=>{c.preventDefault();let S=n==="BAU"?[1,2,3]:[5];for(let w of S)if(!xt.steps.find(Y=>Y.id===w)?.isConfirmation&&(!oe(w)||!U(w))){console.warn(`Form submission blocked by validation failure in step ${w}`),o=w,W();return}let u=s.querySelector(".bau-btn-submit");u.disabled=!0,u.innerHTML=D("sending");let L=new FormData(C),M=Object.fromEntries(L.entries()),te=a||{},d={...te,...M,requestType:n};if(M.advEmail?d.advEmail=M.advEmail:te.email&&(d.advEmail=te.email),M.website?d.website=M.website:te.website?d.website=te.website:te.site&&(d.website=te.site),n==="BAU"){let w=L.getAll("taskType"),T=Z(M).join(" | ");d.taskType=w.join(", "),d.availability=T,i?(M.nonImplementationReason?d.nonImplementationReason=M.nonImplementationReason:delete d.nonImplementationReason,M.description?d.description=M.description:delete d.description):(d.nonImplementationReason=M.nonImplementationReason||"",d.description=M.description||"",d.nonImplementationReason||console.warn("Aviso: Campo 'Justificativa' (nonImplementationReason) est\xE1 saindo vazio."),d.description||console.warn("Aviso: Campo 'Descri\xE7\xE3o detalhada' (description) est\xE1 saindo vazio."))}else d.reason=M.reason,i?(M.description?d.description=M.description:delete d.description,delete d.taskType,delete d.availability,delete d.nonImplementationReason):(d.taskType="",d.availability="",d.nonImplementationReason="",d.description=M.description||"");try{let w=null;i?await Oo(r,d):w=await Fo(d,te.agentEmail||"anon"),v.playSuccess();let T=s.querySelector(".bau-success-title");T&&(i?T.textContent=D("caseUpdatedSuccess"):T.textContent=D(n==="DISCARD"?"caseDiscardSentSuccess":"caseSentSuccess")),F("success"),!i&&w&&w.emailSent===!1&&(v.playError(),J(D("caseCreatedNoEmailConfirm"),{error:!0}))}catch(w){v.playError(),J(D("errorPrefix")(w.message||D("unknownError")),{error:!0}),console.error("Payload que tentou enviar:",d)}finally{u.disabled=!1,u.innerHTML=`${Ce.send} ${D("submitToTl")}`}};function K(){C.reset(),o=0,n="BAU",i=!1,r=null,W(),C.querySelectorAll(".bau-task-item.active").forEach(c=>c.classList.remove("active"))}s.querySelector("#bau-new-case-btn").addEventListener("click",()=>{K(),F("form"),re()}),s.querySelector("#bau-form-back-btn").addEventListener("click",()=>F("dashboard")),s.querySelector("#bau-success-back-btn").addEventListener("click",()=>F("dashboard"));async function O(){e=!Ve(s),e&&(s.style.display="flex"),e?(ke(),F("dashboard"),R()):Te(),$e(e,s,"cw-btn-bauform")}return W(),Ee(()=>{let c=s.querySelector(".cw-help-title");c&&(c.textContent=D("headerTitle"));let S=s.querySelector(".cw-help-description");S&&(S.textContent=D("headerDesc"));let u=s.querySelector(".js-bau-new-case");u&&(u.textContent=D("newBauCase"));let L=s.querySelector(".js-bau-back-dashboard");L&&(L.textContent=D("backToDashboard"));let M=s.querySelector(".js-bau-configuring-edit");M&&(M.textContent=D("configuringEdit"));let te=s.querySelector(".js-bau-success-title");te&&(te.textContent=D("caseSentSuccess"));let d=s.querySelector(".js-bau-success-sub");d&&(d.textContent=D("caseSentSuccessSub"));let w=s.querySelector(".js-bau-success-back");w&&(w.textContent=D("backToDashboard")),q.textContent=D("back"),E.textContent=D("next"),F(t),t==="form"&&C.querySelectorAll(".bau-step").forEach(T=>{let Y=parseInt(T.id.replace("bau-step-",""),10),ee=xt.steps.find(ae=>ae.id===Y);!ee||ee.isBranching||ee.isConfirmation||T.querySelectorAll(".bau-dynamic-input").forEach(ae=>{let se=ae.id.replace("wrapper-",""),he=ee.fields?.find(_e=>_e.id===se);if(!he)return;let we=ae.querySelector(".bau-label");we&&he.label&&(we.textContent=Ze(he,"label"),he.tooltip&&we.setAttribute("data-tooltip",Ze(he,"tooltip")));let Be=ae.querySelector("input, textarea, select");if(Be&&he.placeholder&&(Be.placeholder=Ze(he,"placeholder")),he.type==="select"){let _e=he.groups?he.groups.flatMap(We=>We.options):he.options||[];ae.querySelectorAll("option").forEach((We,da)=>{let Ht=_e[da];Ht&&(We.textContent=Ye(Ht.text))})}})}),t==="dashboard"&&R()}),O}var je={notes:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',library:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',timezone:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',configs:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>',broadcast:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',enter:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>',arrowDown:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',arrowUp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>',bolt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>'};function nl(){if(document.getElementById("cw-palette-styles"))return;let e=document.createElement("style");e.id="cw-palette-styles",e.textContent=`
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
    `,document.head.appendChild(e)}var sr={pt:{ariaLabel:"Busca r\xE1pida",placeholder:"Buscar um m\xF3dulo...",empty:"Nada encontrado.",navigate:"navegar",select:"selecionar",close:"esc fechar",groupShortcuts:"Meus atalhos",groupModules:"M\xF3dulos"},es:{ariaLabel:"B\xFAsqueda r\xE1pida",placeholder:"Buscar un m\xF3dulo...",empty:"No se encontr\xF3 nada.",navigate:"navegar",select:"seleccionar",close:"esc cerrar",groupShortcuts:"Mis atajos",groupModules:"M\xF3dulos"}};function nt(e){let t=ce();return sr[t]?.[e]??sr.pt[e]}function lr(e){nl();function t(A){return A.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function a(){return typeof e.toggleNotes!="function"||typeof e.toggleNotes.openWithPreset!="function"?[]:qe.list().map(A=>({id:`shortcut-${A.id}`,label:A.label,hint:{pt:"Atalho de nota \xB7 abre pr\xE9-preenchida",es:"Atajo de nota \xB7 abre precompletada"},keywords:`nota atalho atajo preset ${A.alias||""}`,icon:je.bolt,group:"shortcuts",isPreset:!0,run:()=>{qe.registerUse(A.id),e.toggleNotes.openWithPreset(A)}}))}let o=[{id:"notes",label:"Case Notes",hint:{pt:"Montar a nota t\xE9cnica do caso",es:"Armar la nota t\xE9cnica del caso"},keywords:"notas nota caso anotacoes anotaciones",icon:je.notes,run:e.toggleNotes},{id:"bauform",label:"BAU Form",hint:{pt:"Solicita\xE7\xE3o de cria\xE7\xE3o/descarte BAU",es:"Solicitud de creaci\xF3n/descarte BAU"},keywords:"bau formulario solicitacao solicitud criacao creacion descarte",icon:je.bauform,run:e.toggleBAUForm},{id:"email",label:"Email Assistant",hint:{pt:"Templates inteligentes de e-mail",es:"Plantillas inteligentes de correo"},keywords:"email e-mail correio correo template plantilla",icon:je.email,run:e.toggleEmail},{id:"script",label:"Call Script",hint:{pt:"Guia interativo de chamada",es:"Gu\xEDa interactiva de llamada"},keywords:"script roteiro guion chamada llamada ligacao",icon:je.script,run:e.toggleScript},{id:"links",label:"Central de Links",hint:{pt:"Ferramentas, SOPs e atalhos",es:"Herramientas, SOPs y atajos"},keywords:"links atalhos atajos ferramentas herramientas sop sops",icon:je.links,run:e.toggleLinks},{id:"library",label:"Minha Biblioteca",hint:{pt:"Snippets e respostas salvas",es:"Snippets y respuestas guardadas"},keywords:"biblioteca snippets respostas respuestas salvas guardadas",icon:je.library,run:e.toggleLibrary},{id:"timezone",label:"Fusos Hor\xE1rios",hint:{pt:"Monitoramento e planejador de chamada",es:"Monitoreo y planificador de llamada"},keywords:"fuso horario timezone",icon:je.timezone,run:e.toggleTimezone},{id:"broadcast",label:"Avisos",hint:{pt:"Comunicados e disponibilidade BAU",es:"Comunicados y disponibilidad BAU"},keywords:"avisos broadcast comunicados disponibilidade disponibilidad",icon:je.broadcast,run:()=>e.broadcastControl&&e.broadcastControl.toggle()},{id:"configs",label:"Configura\xE7\xF5es",hint:{pt:"Perfil, som e prefer\xEAncias",es:"Perfil, sonido y preferencias"},keywords:"configuracoes configuracion config preferencias perfil som sonido",icon:je.configs,run:e.toggleConfigs}].map(A=>({...A,group:"modules"}));function n(){return[...a(),...o].filter(A=>typeof A.run=="function").map(A=>({...A,_haystack:t(`${A.label} ${A.hint.pt} ${A.hint.es} ${A.keywords}`)}))}let i=!1,r=0,l=n(),s=l,b=document.createElement("div");b.className="cw-palette-overlay",b.setAttribute("role","dialog"),b.setAttribute("aria-modal","true"),b.setAttribute("aria-label",nt("ariaLabel"));let p=document.createElement("div");p.className="cw-palette",p.innerHTML=`
        <div class="cw-palette-search">
            <span class="cw-palette-search-icon">${je.search}</span>
            <input type="text" class="cw-palette-input" placeholder="${nt("placeholder")}" autocomplete="off" spellcheck="false">
        </div>
        <div class="cw-palette-list"></div>
        <div class="cw-palette-footer">
            <span class="js-cp-navigate">${je.arrowDown}${je.arrowUp} ${nt("navigate")}</span>
            <span class="js-cp-select">${je.enter} ${nt("select")}</span>
            <span class="js-cp-close">${nt("close")}</span>
        </div>
    `,b.appendChild(p),b.onmousedown=A=>{A.target===b&&y()};let h=p.querySelector(".cw-palette-input"),m=p.querySelector(".cw-palette-list");function g(){if(m.innerHTML="",s.length===0){m.innerHTML=`<div class="cw-palette-empty">${nt("empty")}</div>`;return}let A=[],$=null;s.forEach((C,P)=>{if(C.group!==$){$=C.group;let E=document.createElement("div");E.className="cw-palette-group",E.textContent=nt(C.group==="shortcuts"?"groupShortcuts":"groupModules"),E.setAttribute("aria-hidden","true"),m.appendChild(E)}let q=document.createElement("div");q.className="cw-palette-item"+(P===r?" selected":""),q.innerHTML=`
                <span class="cw-palette-item-icon${C.isPreset?" cw-palette-item-icon--preset":""}">${C.icon}</span>
                <span class="cw-palette-item-text">
                    <span class="cw-palette-item-label">${C.label}</span>
                    <span class="cw-palette-item-hint">${C.hint[ce()]||C.hint.pt}</span>
                </span>
            `,q.onmouseenter=()=>{r=P,g()},q.onclick=()=>I(P),m.appendChild(q),A.push(q)});let f=A[r];f&&f.scrollIntoView({block:"nearest"})}function I(A){let $=s[A];$&&(v.playClick(),y(),$.run())}function x(){i||(i=!0,l=n(),s=l,r=0,h.value="",g(),ke(),document.body.appendChild(b),v.playGenieOpen(),requestAnimationFrame(()=>{b.classList.add("active"),h.focus()}))}function y(){i&&(i=!1,Te(),b.classList.remove("active"),setTimeout(()=>b.remove(),200))}function z(){i?y():x()}return h.addEventListener("input",()=>{let A=t(h.value.trim());s=A?l.filter($=>$._haystack.includes(A)):l,r=0,g()}),h.addEventListener("keydown",A=>{A.key==="ArrowDown"?(A.preventDefault(),r=Math.min(r+1,s.length-1),g()):A.key==="ArrowUp"?(A.preventDefault(),r=Math.max(r-1,0),g()):A.key==="Enter"?(A.preventDefault(),I(r)):A.key==="Escape"&&(A.preventDefault(),y())}),document.addEventListener("keydown",A=>{(A.metaKey||A.ctrlKey)&&A.key.toLowerCase()==="k"&&(A.preventDefault(),z())}),Ee(()=>{b.setAttribute("aria-label",nt("ariaLabel")),h.placeholder=nt("placeholder");let A=p.querySelector(".js-cp-navigate");A&&(A.innerHTML=`${je.arrowDown}${je.arrowUp} ${nt("navigate")}`);let $=p.querySelector(".js-cp-select");$&&($.innerHTML=`${je.enter} ${nt("select")}`);let f=p.querySelector(".js-cp-close");f&&(f.textContent=nt("close")),g()}),{open:x,close:y,toggle:z}}function il(){if(window.techSolInitialized){Za();return}window.techSolInitialized=!0;let e="v6.3.0";console.log(`\u{1F680} TechSol Suite Initializing (${e})...`);try{an();try{v.initGlobalListeners()}catch(m){console.warn("\xC1udio bloqueado:",m)}me.fetchContentModules(["tips","broadcast","bau_availability","links","call_script","email_template","note_template"]);let t=Za(),a=ii(),o=ui(),n=xi(),i=Ai(),r=Xi(),l=Zi(),s=er(),b=rr(),p=Fi(),h={toggleNotes:a,toggleEmail:o,toggleScript:n,toggleLinks:i,toggleTimezone:r,toggleLibrary:l,toggleConfigs:s,toggleBAUForm:b,broadcastControl:p};On(h,t),lr(h),setTimeout(()=>{me.logEvent("App","Start","Session Start");let m=Ne();ut.sync(),(m?Mt(m.split("@")[0]).then(I=>{I&&(Zo(I),Yo(I))}).catch(I=>console.warn("N\xE3o foi poss\xEDvel resolver o idioma do perfil:",I)):Promise.resolve()).finally(()=>{Bi(),setTimeout(()=>{Gi(e)},500)})},2500)}catch(t){console.error("Erro fatal na inicializa\xE7\xE3o:",t),v.playError(),J("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}il();})();
