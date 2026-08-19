(()=>{var kn=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",Oa="AKfycbxkheuq28ENsHMZMH8t9-u4EIrktHC6cBi-87boDre0jJfl1lnSCPBzaEkw6hy3Cx6fAg",Tn=kn?`https://script.google.com/a/macros/google.com/s/${Oa}/dev`:`https://script.google.com/a/macros/google.com/s/${Oa}/exec`,ea="cw_data_broadcast",Ma="cw_data_tips",Da="cw_content_",In=["Processando...","Mantenha o foco!","Aguarde..."];function ze(e,t={}){return new Promise((a,n)=>{let o="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script"),r=setTimeout(()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[o],n(new Error("Timeout: A API demorou muito para responder. (Apps Script bloqueado ou erro 500)"))},15e3);window[o]=h=>{clearTimeout(r),document.body.contains(i)&&document.body.removeChild(i),delete window[o],a(h)};let l=Object.keys(t).map(h=>encodeURIComponent(h)+"="+encodeURIComponent(t[h])).join("&"),c=`${Tn}?op=${e}&callback=${o}&t=${Date.now()}&${l}`;i.src=c,i.onerror=()=>{clearTimeout(r),document.body.contains(i)&&document.body.removeChild(i),delete window[o],n(new Error("Erro de conex\xE3o JSONP."))},document.body.appendChild(i)})}var he={fetchTips:async()=>{try{let e=await ze("tips");e?.tips&&localStorage.setItem(Ma,JSON.stringify(e.tips))}catch(e){console.warn("Tips offline",e)}},fetchData:async()=>{try{let e=await ze("broadcast");if(e?.broadcast)return localStorage.setItem(ea,JSON.stringify(e.broadcast)),e}catch(e){console.warn("Broadcast offline",e)}return{broadcast:JSON.parse(localStorage.getItem(ea)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(ea)||"[]"),fetchContentModule:async e=>{let t=`${Da}${e}`;try{let a=await ze("content_public",{module:e});if(a?.status==="success"&&Array.isArray(a.items))return localStorage.setItem(t,JSON.stringify(a.items)),a.items}catch(a){console.warn(`Conte\xFAdo '${e}' offline`,a)}return he.getCachedContent(e)},getCachedContent:e=>{try{return JSON.parse(localStorage.getItem(`${Da}${e}`)||"null")}catch{return null}},getRandomTip:()=>{let e=In,t=localStorage.getItem(Ma);if(t)try{e=JSON.parse(t)}catch{}return e[Math.floor(Math.random()*e.length)]},sendBroadcast:async e=>{let t={...e,date:new Date().toISOString(),id:Date.now().toString()};return await he._performOp("new_broadcast",t)},updateBroadcast:async(e,t)=>{let a={id:e,...t};return await he._performOp("update_broadcast",a)},deleteBroadcast:async e=>await he._performOp("delete_broadcast",{id:e}),_performOp:async(e,t)=>{try{console.log(`Executando ${e}...`,t);let a=await ze(e,t);return a&&a.status==="success"?(console.log("Sucesso:",e),!0):(console.warn("Falha:",a),!1)}catch(a){return console.error("Erro JSONP:",a),!1}},logEvent:(e,t,a="",n=null)=>{try{let o="anon";try{let r=ke();r&&(o=r.split("@")[0].toLowerCase())}catch{}let i={timestamp:new Date().toISOString(),user:o,version:"v5.1",category:e,action:t,label:a,value:n||""};ze("log",i).catch(r=>{})}catch(o){console.warn("Analytics error",o)}},logUsage:()=>{},sendBAUEscalation:async(e,t)=>{let a={...e,user:t,date:new Date().toISOString()};try{console.log("Executando create_bau...",a);let n=await ze("create_bau",a);if(n&&n.status==="success")return console.log("Sucesso: create_bau"),n;throw new Error(n?.error||n?.message||"Falha na opera\xE7\xE3o BAU")}catch(n){throw console.error("Erro JSONP (BAU):",n),n}},readAgentBAU:async()=>{let e=ke();if(!e)return console.warn("Email n\xE3o encontrado. N\xE3o foi poss\xEDvel buscar casos BAU."),[];try{console.log("Buscando casos BAU para:",e);let t=await ze("read_agent_bau",{user:e});if(t&&t.status==="success"&&Array.isArray(t.cases))return t.cases;if(t&&t.status==="error")throw new Error(t.message||"Erro retornado pela API de leitura");return[]}catch(t){throw console.error("Erro ao buscar casos BAU:",t),t}},updateBAUStatus:async(e,t,a={})=>{let n=ke();try{console.log(`Atualizando status BAU ${e} para ${t}...`);let o=await ze("update_bau_status",{id:e,status:t,user:n,...a});return o&&o.status==="success"}catch(o){return console.error("Erro ao atualizar status BAU:",o),!1}},updateBAUEscalation:async(e,t)=>{let a=ke(),n={...t,id:e,user:a,date_edited:new Date().toISOString()};try{console.log(`Executando update_bau para ${e}...`,n);let o=await ze("update_bau",n);if(o&&o.status==="success")return console.log("Sucesso: update_bau"),o;throw new Error(o?.error||o?.message||"Falha na atualiza\xE7\xE3o BAU")}catch(o){throw console.error("Erro JSONP (Update BAU):",o),o}},fetchUserProfile:async e=>{try{console.log(`Buscando perfil para: ${e}`);let t=await ze("get_user_profile",{ldap:e});return console.log("Resposta bruta do servidor:",t),t&&t.status==="success"&&t.profile?t.profile:null}catch(t){return console.error("Erro ao buscar perfil:",t),null}},getUserSnippets:async e=>{try{return console.log("Buscando snippets para:",e),await ze("get_user_snippets",{user:e})}catch(t){return console.error("Erro ao carregar snippets:",t),{status:"error",snippets:[]}}},saveSnippet:async(e,t)=>{let a={id:e.id,type:e.type,title:e.title,content:e.content,subject:e.subject||"",isCode:e.isCode,isRich:e.isRich,user:t};try{console.log("Salvando snippet na nuvem:",a);let n=await ze("save_snippet",a);return n&&n.status==="success"}catch(n){return console.error("Erro ao salvar snippet:",n),!1}},deleteSnippet:async(e,t)=>{try{console.log(`Deletando snippet ${e}...`);let a=await ze("delete_snippet",{id:e,user:t});return a&&a.status==="success"}catch(a){return console.error("Erro ao deletar snippet:",a),!1}}},_a=he.sendBAUEscalation,Ra=he.readAgentBAU,Oi=he.updateBAUStatus,za=he.updateBAUEscalation,ht=he.fetchUserProfile,Mi=he.getUserSnippets,Di=he.saveSnippet,_i=he.deleteSnippet;var ce=e=>new Promise(t=>setTimeout(t,e));function Me(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(a=>e.dispatchEvent(new MouseEvent(a,t)))}function xt(e){e&&["mousedown","mouseup","click"].forEach(t=>e.dispatchEvent(new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window})))}function pt(e,t,a){return Math.max(t,Math.min(e,a))}var Dt=0;function Se(){Dt++,document.body.style.overflow="hidden"}function Ee(){Dt=Math.max(0,Dt-1),Dt===0&&(document.body.style.overflow="")}var $a=!1;function Ln(){if($a||document.getElementById("cw-filled-check-styles"))return;let e=document.createElement("style");e.id="cw-filled-check-styles",e.textContent=`
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
    `,document.head.appendChild(e),$a=!0}var Ba=!1;function qn(){if(Ba||document.getElementById("cw-empty-state-styles"))return;let e=document.createElement("style");e.id="cw-empty-state-styles",e.textContent=`
        .cw-empty-illustrated { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 12px; padding: 32px 20px; }
        .cw-empty-illustrated-badge { border-radius: 50%; background: #F8F9FA; display: flex; align-items: center; justify-content: center; color: #9AA0A6; flex-shrink: 0; }
        .cw-empty-illustrated-badge svg { width: 44%; height: 44%; }
        .cw-empty-illustrated-title { font-family: 'Google Sans', Roboto, sans-serif; font-size: 15px; font-weight: 600; color: #202124; }
        .cw-empty-illustrated-subtitle { font-size: 12px; color: #5F6368; line-height: 1.5; max-width: 240px; }
    `,document.head.appendChild(e),Ba=!0}function Ct({icon:e,title:t,subtitle:a="",size:n=88}){qn();let o=document.createElement("div");return o.className="cw-empty-illustrated",o.innerHTML=`
        <div class="cw-empty-illustrated-badge" style="width:${n}px;height:${n}px;">${e}</div>
        <div class="cw-empty-illustrated-title">${t}</div>
        ${a?`<div class="cw-empty-illustrated-subtitle">${a}</div>`:""}
    `,o}function _t(e,t){e.addEventListener("keydown",a=>{if(a.key!=="ArrowDown"&&a.key!=="ArrowUp")return;let n=document.activeElement;if(!n||!n.matches(t))return;let o=Array.from(e.querySelectorAll(t)).filter(l=>l.offsetParent!==null),i=o.indexOf(n);if(i===-1)return;a.preventDefault();let r=a.key==="ArrowDown"?Math.min(i+1,o.length-1):Math.max(i-1,0);o[r].focus()})}var Pa=!1;function Fn(){if(Pa||document.getElementById("cw-pending-field-styles"))return;let e=document.createElement("style");e.id="cw-pending-field-styles",e.textContent=`
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
    `,document.head.appendChild(e),Pa=!0}function Ga(e,{duration:t=2400}={}){e&&(Fn(),e.classList.add("cw-quicklaunch-pending"),e.scrollIntoView({behavior:"smooth",block:"center"}),e.focus({preventScroll:!0}),setTimeout(()=>e.classList.remove("cw-quicklaunch-pending"),t))}function Rt(e,{minLength:t=2}={}){Ln();let a=e.parentElement;a&&getComputedStyle(a).position==="static"&&(a.style.position="relative"),e.classList.add("cw-dopamine-field");let n=document.createElement("span");n.className="cw-dopamine-check",n.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',e.insertAdjacentElement("afterend",n);let o=()=>{let i=e.value.trim().length>=t;e.classList.toggle("filled",i),n.classList.toggle("show",i)};e.addEventListener("input",o),o()}var zt="",At="",ta=null;async function aa(){try{let e=document.querySelector('material-button[debug-id="toggle-translation-button"]');if(e){let t=e.textContent.toLowerCase();(t.includes("show original")||t.includes("mostrar original"))&&(console.log("TechSol: Tradu\xE7\xE3o detectada. Revertendo para o idioma original..."),e.click(),await ce(400))}}catch(e){console.warn("TechSol: Erro ao tentar reverter tradu\xE7\xE3o:",e)}}async function kt(){if(zt&&At)return zt;try{let e=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!e)return"Agente";e.click(),await ce(150);let t="Consultor",a=document.querySelector("profile-details .name");if(a)t=a.textContent.trim().split(" ")[0],t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();else{let o=document.querySelector("profile-details img");if(o&&o.src.includes("/photos/")){let i=o.src.match(/\/photos\/([^\?]+)/)[1];t=i.charAt(0).toUpperCase()+i.slice(1)}}let n=document.querySelector("profile-details .email");return n&&(At=n.textContent.trim(),console.log("TechSol: Identidade confirmada ->",At)),e.click(),document.body.click(),zt=t,t}catch(e){return console.warn("Sherlock falhou:",e),"Consultor"}}function Tt(){return zt||"Consultor"}function ke(){return At||null}function ja(e){let t=new Date,a=t.getHours(),n=t.getDay(),o="Ol\xE1",i="";a>=5&&a<12?(o="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):a>=12&&a<18?(o="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(o="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let r=[];a>=0&&a<5?r=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:a<12?n===1?r=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:n===5?r=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:r=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:a<18?r=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:r=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(n===0||n===6)&&(r=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let l=r[Math.floor(Math.random()*r.length)];return{prefix:`${o},`,name:e,suffix:l,icon:i,isFriday:n===5}}async function Nn(){try{let t=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!t)return null;let a=t.parentElement,n=a.querySelector(".unmask-button")||a.querySelector('[aria-label="Click to view"]');n&&(n.click(),await ce(500));let i=Array.from(a.querySelectorAll("a, span, div, pii-value")).find(r=>{let l=r.innerText.trim();return l.includes("@")&&!l.includes("Is this:")&&l.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(e){return console.warn("Erro ao capturar email do cliente:",e),null}}function On(){try{let e=document.querySelector('material-input[debug-id="account-id-input"]');if(e){let t=e.querySelector("input");if(t){let a=t.value.trim();if(a)return a.includes("@")?a:`${a}@google.com`}}}catch(e){console.warn("Erro ao capturar email interno:",e)}return null}function Mn(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.includes("Google Ads External Customer ID")||o.textContent.includes("Customer ID"));if(t){let o=t.closest("home-data-item")||t.parentElement;if(o){let i=o.querySelector(".data-pair-content");if(i)return i.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let n=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(n)return n[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(e){console.warn("Erro ao capturar CID:",e)}return"N/A"}function Dn(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(a=>a.textContent.includes("Account Manager")||a.textContent.includes("AM Name")||a.textContent.includes("Sales Rep"));if(t){let a=t.closest(".data-pair")||t.parentElement,n=a.querySelector(".data-pair-content")||a.nextElementSibling;if(n)return n.textContent.trim()}}catch(e){console.warn("Erro ao capturar AM:",e)}return null}function _n(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(a=>a.textContent.toLowerCase().includes("customer time zone")||a.textContent.toLowerCase().includes("time zone")||a.textContent.toLowerCase().includes("timezone"));if(t){let a=t.parentElement;if(a){let n=a.querySelector("sanitized-content");if(n&&n.textContent.trim())return n.textContent.trim();let o=a.querySelector(".data-pair-content")||t.nextElementSibling;if(o&&o.textContent.trim()){let i=o.textContent.trim();if(i&&i!=="---"&&i!=="N/A")return i}}}}catch(e){console.warn("Erro ao capturar Timezone:",e)}return null}async function Rn(){let e="---";try{e=window.location.href.split("/").pop()}catch(t){console.warn("Falha URL:",t)}return e}function zn(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(a=>a.textContent.toLowerCase().includes("sales program")||a.textContent.toLowerCase().trim()==="program"||a.textContent.toLowerCase().includes("programa"));if(t){let a=t.closest(".data-pair")||t.parentElement,n=a.querySelector('sanitized-content ng-template[debug-id="html-value"]')||a.querySelector("sanitized-content");if(n)return n.textContent.trim();let o=a.querySelector(".data-pair-content")||a.nextElementSibling;if(o)return o.textContent.trim()}}catch(e){console.warn("Erro ao capturar Sales Program:",e)}return""}function $n(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(a=>a.textContent.includes("Language")||a.textContent.includes("Idioma"));if(t){let a=t.closest(".data-pair")||t.parentElement,n=a.querySelector(".data-pair-content")||a.nextElementSibling;if(n)return n.textContent.trim()}}catch(e){console.warn("Erro ao capturar Idioma:",e)}return"N/A"}function Bn(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.includes("Speakeasy ID")||o.textContent.includes("SE ID"));if(t){let o=t.closest(".data-pair")||t.parentElement,i=o.querySelector(".data-pair-content")||o.nextElementSibling;if(i&&i.textContent.trim())return i.textContent.trim()}let a=/Speakeasy.*?(P\d{15,25})/i,n=Array.from(document.querySelectorAll("textarea, .preview, .message-body, .notes-content"));for(let o=n.length-1;o>=0;o--){let r=(n[o].value||n[o].innerText||"").match(a);if(r&&r[1])return r[1]}}catch(e){console.warn("Erro ao capturar SE ID:",e)}return"N/A"}async function Ge(){await aa(),At||await kt();let e="Cliente",t="";try{let g=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(g&&g.nextElementSibling){let O=g.nextElementSibling.innerText.trim();O&&(e=O)}}catch(b){console.warn("Falha Nome:",b)}try{let g=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(g&&g.nextElementSibling){let O=g.nextElementSibling.innerText.trim();O&&(t=O)}}catch(b){console.warn("Falha URL:",b)}let a=await Nn(),n=On(),o=Mn(),i=Dn(),r=_n(),l=await Rn(),c=zn(),h=$n(),p=Bn(),f=ke();if(f&&!ta){let b=f.split("@")[0];try{ta=await ht(b)}catch(g){console.warn("Falha ao carregar perfil do usu\xE1rio:",g)}}return{advertiserName:e,websiteUrl:t,clientEmail:a,internalEmail:n,cid:o,amName:i,timezone:r,agentName:Tt(),agentEmail:ke(),caseId:l,userProfile:ta,advName:e,site:t,website:t,email:a,salesProgram:c,language:h,seId:p}}var ut=null,oa=null,It=null,na=0,Xe=.3;var je=localStorage.getItem("cw_sounds_muted")==="true";function at(){if(!ut){let e=window.AudioContext||window.webkitAudioContext;e&&(ut=new e)}return ut&&ut.state==="suspended"&&ut.resume(),ut}function Ha(e){if(oa)return oa;let t=e.sampleRate*2,a=e.createBuffer(1,t,e.sampleRate),n=a.getChannelData(0);for(let o=0;o<t;o++)n[o]=Math.random()*2-1;return oa=a,a}var S={setMuted:e=>{je=e,localStorage.setItem("cw_sounds_muted",e)},isMuted:()=>je,playClick:()=>{if(je)return;let e=at();if(!e)return;let t=e.currentTime,a=e.createBufferSource();a.buffer=Ha(e);let n=e.createBiquadFilter();n.type="highpass",n.frequency.value=4e3;let o=e.createGain();o.gain.setValueAtTime(Xe*.8,t),o.gain.exponentialRampToValueAtTime(.001,t+.015),a.connect(n),n.connect(o),o.connect(e.destination),a.start(t),a.stop(t+.02)},playHover:()=>{if(je)return;let e=at();if(!e)return;let t=e.currentTime,a=e.createOscillator();a.type="sine",a.frequency.setValueAtTime(400,t);let n=e.createGain();n.gain.setValueAtTime(0,t),n.gain.linearRampToValueAtTime(Xe*.1,t+.005),n.gain.linearRampToValueAtTime(0,t+.02),a.connect(n),n.connect(e.destination),a.start(t),a.stop(t+.03)},playSuccess:()=>{if(je)return;let e=at();if(!e)return;let t=e.currentTime;[1046.5,1567.9].forEach((n,o)=>{let i=e.createOscillator(),r=e.createGain();i.type="sine",i.frequency.value=n,r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(Xe*.6,t+.05),r.gain.exponentialRampToValueAtTime(.001,t+.6),i.connect(r),r.connect(e.destination),i.start(t),i.stop(t+.7)})},playGenieOpen:()=>{if(je)return;let e=at();if(!e)return;let t=e.currentTime,a=e.createBufferSource();a.buffer=Ha(e);let n=e.createBiquadFilter();n.type="lowpass",n.frequency.setValueAtTime(100,t),n.frequency.exponentialRampToValueAtTime(800,t+.2);let o=e.createGain();o.gain.setValueAtTime(0,t),o.gain.linearRampToValueAtTime(Xe*.5,t+.05),o.gain.linearRampToValueAtTime(0,t+.25),a.connect(n),n.connect(o),o.connect(e.destination),a.start(t),a.stop(t+.3)},playError:()=>{if(je)return;let e=at();if(!e)return;let t=e.currentTime,a=e.createOscillator(),n=e.createGain();a.type="triangle",a.frequency.setValueAtTime(120,t),a.frequency.exponentialRampToValueAtTime(80,t+.1),n.gain.setValueAtTime(Xe,t),n.gain.exponentialRampToValueAtTime(.001,t+.15),a.connect(n),n.connect(e.destination),a.start(t),a.stop(t+.2)},playStartup:()=>{if(je)return;let e=at();if(!e)return;let t=e.currentTime,a=.12,n=e.createOscillator(),o=e.createGain(),i=e.createBiquadFilter();n.type="square",n.frequency.setValueAtTime(400,t),n.frequency.exponentialRampToValueAtTime(50,t+.1),i.type="lowpass",i.frequency.setValueAtTime(800,t),i.frequency.exponentialRampToValueAtTime(100,t+.1),o.gain.setValueAtTime(Xe*4,t),o.gain.exponentialRampToValueAtTime(.001,t+.1),n.connect(i),i.connect(o),o.connect(e.destination),n.start(t),n.stop(t+.12);let r=e.createOscillator(),l=e.createGain();r.type="sine",r.frequency.setValueAtTime(150,t),r.frequency.exponentialRampToValueAtTime(50,t+.15),l.gain.setValueAtTime(Xe*1.5,t),l.gain.exponentialRampToValueAtTime(.001,t+.15),r.connect(l),l.connect(e.destination),r.start(t),r.stop(t+.15),[55,55.4,110.5].forEach(h=>{let p=e.createOscillator(),f=e.createGain(),b=e.createBiquadFilter();p.type="sawtooth",p.frequency.value=h,b.type="lowpass",b.frequency.setValueAtTime(30,t),b.frequency.linearRampToValueAtTime(900,t+a+.2),b.frequency.exponentialRampToValueAtTime(40,t+3),f.gain.setValueAtTime(0,t),f.gain.linearRampToValueAtTime(Xe*.6,t+a+.1),f.gain.exponentialRampToValueAtTime(.001,t+3.5),p.connect(b),b.connect(f),f.connect(e.destination),p.start(t),p.stop(t+3.6)})},playNotification:()=>{if(je)return;let e=at();if(!e)return;let t=e.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(n=>{let o=e.createOscillator(),i=e.createGain();o.type="sine",o.frequency.setValueAtTime(n.freq,t),i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(Xe*n.vol,t+.004),i.gain.exponentialRampToValueAtTime(.001,t+n.dur),o.connect(i),i.connect(e.destination),o.start(t),o.stop(t+n.dur+.1)})},playReady:()=>{if(je)return;let e=at();if(!e)return;let t=e.currentTime;[{freq:587.33,at:0,dur:.2,vol:.26},{freq:880,at:.09,dur:.3,vol:.3},{freq:1760,at:.09,dur:.26,vol:.08}].forEach(n=>{let o=e.createOscillator(),i=e.createGain();o.type="sine",o.frequency.value=n.freq;let r=t+n.at;i.gain.setValueAtTime(0,r),i.gain.linearRampToValueAtTime(Xe*n.vol,r+.02),i.gain.exponentialRampToValueAtTime(.001,r+n.dur),o.connect(i),i.connect(e.destination),o.start(r),o.stop(r+n.dur+.05)})},startThinking:()=>{if(je)return;let e=at();if(!e||It)return;let t=[523.25,659.25,783.99];na=0;let a=()=>{if(je)return;let n=e.currentTime,o=e.createOscillator(),i=e.createGain();o.type="sine",o.frequency.setValueAtTime(t[na%t.length],n),i.gain.setValueAtTime(0,n),i.gain.linearRampToValueAtTime(Xe*.15,n+.02),i.gain.exponentialRampToValueAtTime(.001,n+.22),o.connect(i),i.connect(e.destination),o.start(n),o.stop(n+.25),na++};a(),It=setInterval(a,370)},stopThinking:()=>{It&&(clearInterval(It),It=null)},playSwoosh:()=>{S.playGenieOpen()},playReset:()=>{S.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let e=0,t=50;document.addEventListener("mouseover",a=>{if(!ut)return;let n=a.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!n||n.contains(a.relatedTarget))return;let o=Date.now();o-e<t||(S.playHover(),e=o)},{passive:!0})}};var Ua="cw_ui_lang",Va=["pt","es"];function Pn(){try{let e=typeof localStorage<"u"?localStorage.getItem(Ua):null;return Va.includes(e)?e:null}catch{return null}}var ra=Pn(),Lt=ra||"pt",ia=new Set;function se(){return Lt}function Gn(e){return Va.includes(e)}function sa(e,{persist:t=!0}={}){if(!(!Gn(e)||e===Lt)){if(Lt=e,t){ra=e;try{typeof localStorage<"u"&&localStorage.setItem(Ua,e)}catch{}}ia.forEach(a=>{try{a(Lt)}catch(n){console.warn("i18n listener falhou:",n)}})}}function Wa(e){if(ra)return;let t=String(e?.defaultLanguage||"").toUpperCase(),n={"PT-BR":"pt",PT:"pt",ES:"es"}[t];n&&sa(n,{persist:!1})}function ye(e){return ia.add(e),()=>ia.delete(e)}function Ya(e){return function(a){return e[Lt]?.[a]??e.pt?.[a]??a}}var Xa=1e4;function Ja(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}function J(e,t={}){let a=document.createElement("div"),n=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(a.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:n,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s var(--cw-ease-spring)",pointerEvents:"none"}),a.textContent=e,document.body.appendChild(a),t.error?S.playError():S.playSuccess(),requestAnimationFrame(()=>{a.style.opacity="1",a.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{a.style.opacity="0",a.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>a.remove(),400)},t.duration||4e3)}function Qa(e,t=null){let a=0,n=0,o=0,i=0,r=t||e;r.style.cursor="grab",r.onmousedown=l;function l(p){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(p.target.tagName)||p.target.closest(".no-drag"))return;p=p||window.event,r.style.cursor="grabbing",e.style.transition="none";let f=e.getBoundingClientRect();e.style.transform="none",e.style.left=f.left+"px",e.style.top=f.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",Xa++,e.style.zIndex=Xa,o=p.clientX,i=p.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=h,document.onmousemove=c}function c(p){p=p||window.event,p.preventDefault(),a=o-p.clientX,n=i-p.clientY,o=p.clientX,i=p.clientY;let f=e.offsetTop-n,b=e.offsetLeft-a,g=16,O=window.innerWidth,C=window.innerHeight,x=e.offsetWidth,L=e.offsetHeight;b=pt(b,g,O-x-g),f=pt(f,g,C-L-g),e.style.top=f+"px",e.style.left=b+"px"}function h(){document.onmouseup=null,document.onmousemove=null,r.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s var(--cw-ease-decelerate), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var De={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08),
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var la={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Za={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var eo={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var Ka=!1;function jn(){if(Ka||document.getElementById("techsol-google-styles"))return;let e=document.createElement("style");e.id="techsol-google-styles",e.innerHTML=`
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
    `,document.head.appendChild(e),Ka=!0}function to(e){jn(),e.classList.remove("google-animate-click"),e.offsetWidth,e.classList.add("google-animate-click"),setTimeout(()=>{e.classList.remove("google-animate-click")},600)}async function Hn(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let a=e.querySelector(".cursor");await ce(200);for(let n=0;n<t.length;n++){let o=t.charAt(n),i=document.createElement("span");i.textContent=o,a&&a.parentNode===e?a.before(i):e.appendChild(i);let r=Math.floor(Math.random()*60)+30;n===0&&(r=150),n>t.length-3&&(r=30),await ce(r)}await ce(600),a&&(a.style.display="none")}async function ca(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
            /* Google Sans j\xE1 vem via <link> logo acima em initGlobalStylesAndFont(),
               chamada antes da splash - esse @import era uma 3a requisi\xE7\xE3o redundante
               pra fonte (a 1a \xE9 o <link>, a 2a era o do command-center.js). */
            .splash-container { font-family: 'Google Sans', sans-serif; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #202124; z-index: 2147483647; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1); }
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
        <div class="credit-pro">created by <span>@lucaste</span></div>
        <div class="loader-line"></div>
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await ce(200);let t=await kt(),a=ja(t),n=e.querySelector("#w-icon"),o=e.querySelector("#p1"),i=e.querySelector("#p2"),r=e.querySelector("#p3"),l=e.querySelector("#p-sextou");n&&(n.innerHTML=a.icon),o&&(o.textContent=a.prefix),r&&(r.textContent=a.suffix),await ce(300);let c=n?n.querySelector("svg"):null;if(c&&(c.style.opacity="1",c.style.transform="scale(1)"),await ce(400),o&&(o.style.opacity="1"),S.playStartup(),i&&await Hn(i,a.name),r&&(r.style.opacity="1",r.style.transform="translateY(0)"),a.isFriday&&l){await ce(400),l.style.display="block",l.offsetWidth;let h=l.querySelector(".sextou-badge");h&&(h.style.opacity="1",h.style.transform="scale(1)")}await ce(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await ce(900),e.parentNode&&e.parentNode.removeChild(e)}}function ao(e){if(!e)return;let t=e.getBoundingClientRect(),a=window.innerWidth,n=window.innerHeight,o=24,i=a-t.width-o,r=n-t.height-o,l=parseFloat(e.style.left)||t.left,c=parseFloat(e.style.top)||t.top,h=pt(l,o,i),p=pt(c,o,r);if(h!==l||p!==c){let f=e.style.transition;e.style.transition="left 0.3s var(--cw-ease-elastic), top 0.3s var(--cw-ease-elastic)",e.style.left=`${h}px`,e.style.top=`${p}px`,setTimeout(()=>{e.style.transition=f},300)}}var Ze={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function et(e,t){t.onmousedown=a;function a(n){n.stopPropagation(),n.preventDefault();let o=e.style.transition;e.style.transition="none";let i=n.clientX,r=n.clientY,l=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),c=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),h=i,p=r,f=!1;function b(C){h=C.clientX,p=C.clientY,f||(window.requestAnimationFrame(()=>{g(),f=!1}),f=!0)}function g(){let C=l+(h-i),x=c+(p-r);C>360&&(e.style.width=C+"px"),x>300&&(e.style.height=x+"px")}function O(){document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",O),setTimeout(()=>{e.style.transition=o},50)}document.addEventListener("mousemove",b),document.addEventListener("mouseup",O)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}function $t(e){if(!e||e==="N/A"||e==="undefined")return"Data indispon\xEDvel";if(String(e).includes(" | "))return e.split(" | ").map(t=>$t(t.trim())).filter(t=>t!=="Data indispon\xEDvel").join(" | ");try{let t=new Date(e);if(isNaN(t.getTime()))return"Data indispon\xEDvel";let a=t.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}),n=t.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});return`${a} \xE0s ${n}`}catch{return"Data indispon\xEDvel"}}function oo(e){if(!e)return"";let t={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return e.replace(/:([a-zA-Z0-9-_+]+):/g,a=>t[a]?t[a]:"")}function no(){let e=document.createElement("div");return e.className="cw-dialog-overlay",Object.assign(e.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2147483647,opacity:0,transition:"opacity 0.3s ease"}),e}function io(){let e=document.createElement("div");return Object.assign(e.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s var(--cw-ease-spring)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),e}function Te(e,t={}){return new Promise(a=>{let n=no(),o=io(),i=t.danger?"#FF3B30":"#007AFF",r=se()==="es"?"Eliminar":"Excluir",l=t.confirmText||(t.danger?r:"Confirmar");o.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${e}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${i}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${l}</button>
            </div>
        `,n.appendChild(o),document.body.appendChild(n),requestAnimationFrame(()=>{n.style.opacity=1,o.style.transform="scale(1)"});let c=f=>{n.style.opacity=0,o.style.transform="scale(0.9)",setTimeout(()=>{n.remove(),a(f)},300)},h=o.querySelector("#cw-conf-cancel"),p=o.querySelector("#cw-conf-ok");[h,p].forEach(f=>f.onmouseenter=()=>S.playHover()),h.onclick=()=>{S.playClick(),c(!1)},p.onclick=()=>{S.playClick(),c(!0)}})}function ro(e,t=""){return new Promise(a=>{let n=no(),o=io();o.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${e}</div>
            <input type="text" id="cw-prompt-input" value="${t}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,n.appendChild(o),document.body.appendChild(n);let i=o.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{n.style.opacity=1,o.style.transform="scale(1)",setTimeout(()=>i.focus(),100)});let r=h=>{n.style.opacity=0,o.style.transform="scale(0.9)",setTimeout(()=>{n.remove(),a(h)},300)},l=o.querySelector("#cw-prompt-cancel"),c=o.querySelector("#cw-prompt-ok");[l,c].forEach(h=>h.onmouseenter=()=>S.playHover()),l.onclick=()=>{S.playClick(),r(null)},c.onclick=()=>{S.playClick(),r(i.value)},i.onkeydown=h=>{h.key==="Enter"&&c.click(),h.key==="Escape"&&l.click()}})}var da=class{constructor(){this.reset()}reset(){this.currentCaseType="bau",this.currentLang="pt",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.visible=!1,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.activeFields=[];let t=typeof localStorage<"u"?localStorage.getItem("cw-notes-favorites"):null;this.favorites=new Set(JSON.parse(t||"[]")),this.screenshotMode="implementation",this.notify()}setCaseType(t){this.currentCaseType!==t&&(this.currentCaseType=t,this.isDirty=!0,this.notify())}setLanguage(t){this.currentLang!==t&&(this.currentLang=t,this.notify())}setPortugalCase(t){this.isPortugalCase!==t&&(this.isPortugalCase=t,this.isDirty=!0,this.notify())}setConsent(t){this.consent!==t&&(this.consent=t,this.isDirty=!0,this.notify())}setTagSupportUsed(t){this.tagSupportUsed=t,t||this.forcedScreenshots.clear(),this.isDirty=!0,this.notify()}setActiveFields(t){this.activeFields=[...t],this.isDirty=!0,this.notify()}removeField(t){this.activeFields=this.activeFields.filter(a=>a!==t),this.isDirty=!0,this.notify()}addFieldAt(t,a){this.activeFields.includes(t)||(this.activeFields.splice(a,0,t),this.isDirty=!0,this.notify())}setForcedScreenshots(t){this.forcedScreenshots=new Set(t),this.isDirty=!0,this.notify()}toggleForcedScreenshot(t,a){a?this.forcedScreenshots.add(t):this.forcedScreenshots.delete(t),this.isDirty=!0,this.notify()}setStatus(t){this.currentStatus!==t&&(this.currentStatus=t,this.isDirty=!0,this.notify())}setSubStatus(t){this.currentSubStatus!==t&&(this.currentSubStatus=t,this.isDirty=!0,this.notify())}setScreenshotMode(t){this.screenshotMode=t,this.notify()}setActiveTasks(t){this.activeTasks=t,this.isDirty=!0,this.notify()}toggleFavorite(t){this.favorites.has(t)?this.favorites.delete(t):this.favorites.add(t),typeof localStorage<"u"&&localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(t,a){this.formData[t]!==a&&(this.formData[t]=a,this.isDirty=!0,this.notify())}listeners=[];subscribe(t){return this.listeners.push(t),()=>this.listeners=this.listeners.filter(a=>a!==t)}notify(){this.listeners.forEach(t=>t(this))}},X=new da;var so={pt:{helpTooltip:"Sobre & Feedback",closeTooltip:"Fechar",version:"Vers\xE3o",reportLink:"Reportar Bug ou Sugest\xE3o",backBtn:"Voltar",createdBy:"criado por"},es:{helpTooltip:"Acerca de y Comentarios",closeTooltip:"Cerrar",version:"Versi\xF3n",reportLink:"Reportar error o sugerencia",backBtn:"Volver",createdBy:"creado por"}};function He(e){let t=se();return so[t]?.[e]??so.pt[e]??e}var Un={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},lo={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Ie(e,t,a,n,o,i){let r=document.createElement("div");Object.assign(r.style,Un),Qa(e,r);let l=document.createElement("div");if(Object.assign(l.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",backgroundSize:"300% auto",zIndex:"10",opacity:"0.8"}),!document.getElementById("cw-header-anim")){let j=document.createElement("style");j.id="cw-header-anim",j.innerHTML=`
            @keyframes cw-header-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `,document.head.appendChild(j)}window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||(l.style.animation="cw-header-flow 6s linear infinite"),r.appendChild(l),o&&(o.googleLine=l);let h=document.createElement("div");Object.assign(h.style,{display:"flex",alignItems:"center",gap:"12px"});let p=document.createElement("div");p.innerHTML='<svg viewBox="0 0 48 48" width="20" height="20"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/></svg>',Object.assign(p.style,{width:"20px",height:"20px",pointerEvents:"none",flexShrink:"0",display:"flex"});let f=document.createElement("span");f.textContent=t,h.appendChild(p),h.appendChild(f);let b=document.createElement("div");Object.assign(b.style,{display:"flex",alignItems:"center",gap:"4px"});let g='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',O='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',C=document.createElement("div");C.innerHTML=g,Object.assign(C.style,lo),C.title=He("helpTooltip"),C.classList.add("no-drag"),C.onmouseenter=()=>{C.style.background="rgba(255,255,255,0.1)",C.style.color="#FFF"},C.onmouseleave=()=>{C.style.color!=="rgb(138, 180, 248)"&&(C.style.background="transparent",C.style.color="#9AA0A6")};let x=document.createElement("div");x.innerHTML=O,Object.assign(x.style,lo),x.title=He("closeTooltip"),x.classList.add("no-drag","cw-header-close"),x.onmouseenter=()=>{x.style.background="rgba(242, 139, 130, 0.2)",x.style.color="#F28B82"},x.onmouseleave=()=>{x.style.background="transparent",x.style.color="#9AA0A6"},x.onmousedown=j=>j.stopPropagation(),C.onmousedown=j=>j.stopPropagation(),x.onclick=i;let L=Vn(e,t,a,n);return C.onclick=j=>{j.stopPropagation(),L.style.opacity==="1"?(L.style.opacity="0",L.style.pointerEvents="none",C.style.color="#9AA0A6",C.style.background="transparent"):(L.style.opacity="1",L.style.pointerEvents="auto",C.style.color="#8AB4F8",C.style.background="rgba(138, 180, 248, 0.1)")},b.appendChild(C),b.appendChild(x),r.appendChild(h),r.appendChild(b),ye(()=>{C.title=He("helpTooltip"),x.title=He("closeTooltip")}),r}function Vn(e,t,a,n){let o=document.createElement("div");return Object.assign(o.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),o.innerHTML=`
        <div class="cw-help-title" style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${t}</div>
        <div class="cw-help-version" style="color: #5f6368; font-size: 14px; margin-bottom: 24px;">${He("version")} ${a}</div>

        <div class="cw-help-description" style="color: #3c4043; font-size: 14px; max-width: 90%; line-height: 1.6; margin-bottom: 24px;">
            ${n}
        </div>

        <div style="margin-bottom: 32px;">
            <a href="https://forms.gle/vkvMzSEiuEHpTnKu6" target="_blank" id="cw-feedback-link" style="
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
                <span>\u{1F4AC}</span> <span class="cw-help-report-link">${He("reportLink")}</span>
            </a>
        </div>

        <div class="cw-help-created-by" style="font-size: 12px; color: #9aa0a6;">
            ${He("createdBy")} <span style="color: #1a73e8; font-weight: 500;">@lucaste</span>
        </div>

        <button id="close-help-internal" style="margin-top: 24px; padding: 8px 24px; border: 1px solid #dadce0; background: white; border-radius: 18px; color: #5f6368; cursor: pointer; font-weight: 500; transition: background 0.2s;">
            ${He("backBtn")}
        </button>
    `,setTimeout(()=>{let i=o.querySelector("#cw-feedback-link");i&&(i.onmouseenter=()=>{i.style.backgroundColor="#E8F0FE",i.style.transform="scale(1.02)"},i.onmouseleave=()=>{i.style.backgroundColor="#F8F9FA",i.style.transform="scale(1)"});let r=o.querySelector("#close-help-internal");r&&(r.onmouseover=()=>r.style.backgroundColor="#f8f9fa",r.onmouseout=()=>r.style.backgroundColor="white",r.onclick=()=>{o.style.opacity="0",o.style.pointerEvents="none"})},0),ye(()=>{let i=o.querySelector(".cw-help-version");i&&(i.textContent=`${He("version")} ${a}`);let r=o.querySelector(".cw-help-report-link");r&&(r.textContent=He("reportLink"));let l=o.querySelector(".cw-help-created-by");l&&(l.firstChild.textContent=`${He("createdBy")} `);let c=o.querySelector("#close-help-internal");c&&(c.textContent=He("backBtn"))}),e.appendChild(o),o}var H={blue:"#4285F4",red:"#EA4335",yellow:"#FBBC05",green:"#34A853",primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#34A853",warning:"#FBBC05",error:"#EA4335"},Ae={small:"8px",medium:"12px",large:"20px",pill:"100px"},ot={subtle:"0 1px 3px rgba(0,0,0,0.08)",card:"0 4px 12px rgba(0,0,0,0.05)",elevated:"0 12px 24px rgba(0,0,0,0.08)",apple:"0 20px 40px rgba(0,0,0,0.12)"},me="cubic-bezier(0.34, 1.56, 0.64, 1)",Wn={width:"100%",padding:"14px 16px",borderRadius:Ae.medium,border:`1.5px solid ${H.border}`,backgroundColor:H.bgInput,fontSize:"14px",color:H.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`all 0.3s ${me}`,outline:"none"},Zi={...Wn,minHeight:"120px",resize:"vertical",lineHeight:"1.6"},er={fontSize:"12px",fontWeight:"700",color:H.textSub,textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px 0"},tr={display:"block",fontSize:"14px",fontWeight:"600",color:H.text,marginBottom:"10px",marginTop:"20px"},ar={fontSize:"12px",color:H.warning,marginTop:"8px",display:"flex",alignItems:"center",gap:"8px",fontWeight:"500"},pa={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:H.primary},or={display:"flex",alignItems:"center",marginBottom:"12px",fontSize:"14px",fontWeight:"500",color:H.text,cursor:"pointer",padding:"16px 20px",backgroundColor:H.surface,border:`1px solid ${H.border}`,borderRadius:Ae.large,transition:`all 0.4s ${me}`,userSelect:"none",boxShadow:ot.subtle},nr={padding:"14px 28px",color:"#fff",backgroundColor:H.primary,border:"none",borderRadius:Ae.pill,fontSize:"15px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px 0 rgba(26,115,232,0.39)",transition:`all 0.25s ${me}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",outline:"none"},ir={width:"100%",padding:"12px",background:"#FFFFFF",border:`1.5px dashed ${H.primary}`,color:H.primary,borderRadius:Ae.medium,cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"16px",transition:`all 0.25s ${me}`},rr={background:"transparent",border:`1px solid ${H.border}`,borderRadius:Ae.pill,color:H.textSub,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",margin:"20px auto",transition:`all 0.25s ${me}`};var qt={pt:"Gera notas padronizadas com excel\xEAncia visual.",es:"Genera notas estandarizadas con excelencia visual."};function co(e,t){let a=document.createElement("div");a.id="notes-assistant-popup",a.classList.add("cw-module-window"),Object.assign(a.style,De,{right:"100px",width:"520px",height:"740px",display:"flex",flexDirection:"column",transition:`width 0.4s ${me}, height 0.4s ${me}, transform 0.4s ${me}, opacity 0.3s ease`,borderRadius:Ae.large,boxShadow:ot.apple,border:"1px solid rgba(255, 255, 255, 0.7)"});let n={popup:a,googleLine:null},o=Ie(a,"Case Notes",e,qt[se()]||qt.pt,n,t);a.appendChild(o);let i=document.createElement("div");i.className="cw-popup-content",Object.assign(i.style,{padding:"24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"24px",background:H.surface}),a.appendChild(i);let r=document.createElement("div");r.textContent="created by lucaste@",Object.assign(r.style,eo,{padding:"16px 24px",borderTop:`1px solid ${H.bgInput}`,color:H.textSub,fontSize:"11px",marginTop:"auto",fontWeight:"500",letterSpacing:"0.5px"}),a.appendChild(r);let l=document.createElement("div");return Object.assign(l.style,Ze),l.className="no-drag",a.appendChild(l),et(a,l),Yn(),{popup:a,content:i,header:o,animRefs:n,credit:r}}function Yn(){if(document.getElementById("cw-notes-refactor-styles"))return;let e=document.createElement("style");e.id="cw-notes-refactor-styles",e.innerHTML=`
        .cw-popup-content::-webkit-scrollbar { width: 8px; }
        .cw-popup-content::-webkit-scrollbar-track { background: transparent; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; border: 2px solid #fff; }
        .cw-popup-content::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .cw-input, .cw-textarea, .cw-select {
            width: 100% !important;
            padding: 12px 16px !important;
            border-radius: ${Ae.medium} !important;
            border: 1.5px solid ${H.border} !important;
            font-size: 14px !important;
            font-family: 'Google Sans', Roboto, sans-serif !important;
            transition: border-color 0.2s ${me}, background-color 0.2s ${me}, box-shadow 0.2s ${me} !important;
            box-sizing: border-box !important;
            background: ${H.bgInput} !important;
            color: ${H.text} !important;
            outline: none !important;
            box-shadow: ${ot.subtle} !important;
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
            transition: border-color 0.2s ${me}, background-color 0.2s ${me}, box-shadow 0.2s ${me} !important;
        }

        .cw-input:hover, .cw-textarea:hover, #notes-assistant-popup .cw-select:hover {
            border-color: #bdc1c6 !important;
            background-color: #f1f3f4 !important;
            box-shadow: 0 1px 4px rgba(0,0,0,0.1) !important;
        }

        .cw-input:focus, .cw-textarea:focus, #notes-assistant-popup .cw-select:focus {
            border-color: ${H.primary} !important;
            background-color: #fff !important;
            box-shadow: 0 0 0 3px rgba(26,115,232,0.15), 0 2px 8px rgba(0,0,0,0.05) !important;
        }

        .cw-textarea { min-height: 100px; resize: vertical; line-height: 1.5; }

        .cw-section-title {
            font-size: 11px;
            font-weight: 700;
            color: ${H.textSub};
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
            background: ${H.bgInput};
        }

        .cw-btn-primary {
            background: ${H.primary};
            color: #fff;
            border: none;
            border-radius: ${Ae.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ${me}, transform 0.2s ${me}, box-shadow 0.2s ${me};
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
            color: ${H.textSub};
            border: 1px solid ${H.border};
            border-radius: ${Ae.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ${me}, border-color 0.2s ${me}, color 0.2s ${me};
        }
        .cw-btn-secondary:hover {
            background: ${H.bgInput};
            border-color: #bdc1c6;
            color: ${H.text};
        }

        @media (prefers-reduced-motion: reduce) {
            .cw-btn-primary, .cw-btn-secondary, .cw-input, .cw-textarea, .cw-select {
                transition: opacity 0.15s ease, background-color 0.15s ease, border-color 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}var Re={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"Selecione",substatus:"Substatus:",select_substatus:"Selecione o Status",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",preencher_email_automaticamente:"Preencher email automaticamente?",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",link_aqui:"Link aqui",tag_support_output_label:"Utilizou Tag Support?",motivo_output_label:"Motivo:",auto_busca:"\u2728 Auto Busca",utilize_marcadores:"Utilize marcadores para detalhar...",descreva_consideracoes:"Descreva as considera\xE7\xF5es...",remover:"Remover",remover_campo_confirm:'Remover o campo "{campo}"?',meus_rascunhos:"Meus Rascunhos",confirmar_guardar_rascunho:"Deseja guardar o rascunho atual e limpar os campos?",rascunho_salvo_sucesso:"Rascunho salvo com sucesso!",erro_ler_dados:"Erro: N\xE3o foi poss\xEDvel ler os dados.",erro_ao_salvar:"Erro ao salvar.",cliente_sem_nome:"Cliente Sem Nome",sem_status:"Sem Status",retomar_caso:"Retomar Caso",descartar:"Descartar",retomar_rascunho_confirm:"Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.",rascunho_carregado:"Rascunho carregado.",excluir_rascunho_confirm:"Excluir este rascunho?",acoes_plural:"A\xE7\xF5es",acao_singular:"A\xE7\xE3o",definidas_plural:"definidas",definida_singular:"definida",renomear_tooltip:"Clique para renomear esta task",renomear_hint:"\u270E Renomear",substituir_rascunho_confirm:"Isso vai substituir o rascunho atual da nota. Deseja continuar?",restaurar_rascunho_confirm:"Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?",cole_link_placeholder:"Cole o link aqui...",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F Anunciante consentiu com a grava\xE7\xE3o?",sim:"Sim",nao:"N\xE3o",pronto_comecar:"Pronto para come\xE7ar?",selecione_status_ajuda:"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Task(s) solicitada(s):",passos_executados:"\u{1F463} O que foi feito:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 D\xFAvidas do anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implementadas na call:",proximos_passos:"\u{1F680} Pr\xF3ximos passos (Acompanhamento):",consideracoes:"\u{1F4A1} Considera\xE7\xF5es adicionais:",contexto_call:"\u{1F4AC} Contexto/O que foi feito:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Minha A\xE7\xE3o:",dia:"\u{1F4C5} Dia do Follow-up (se aplic\xE1vel):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Data do reagendamento:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evid\xEAncias de Contato",ligacao_1:"Liga\xE7\xE3o 1",ligacao_2:"Liga\xE7\xE3o 2",mensagem_am:"Mensagem para AM",tentativa_ligacao:"\u{1F4DE} Tentativa de liga\xE7\xE3o:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"Seleccione",substatus:"Subestado:",select_substatus:"Seleccione el Estado",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",preencher_email_automaticamente:"\xBFRellenar correo autom\xE1ticamente?",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",link_aqui:"Enlace aqu\xED",tag_support_output_label:"\xBFUtiliz\xF3 Tag Support?",motivo_output_label:"Motivo:",auto_busca:"\u2728 B\xFAsqueda Autom\xE1tica",utilize_marcadores:"Utiliza vi\xF1etas para detallar...",descreva_consideracoes:"Describe las consideraciones...",remover:"Eliminar",remover_campo_confirm:'\xBFEliminar el campo "{campo}"?',meus_rascunhos:"Mis Borradores",confirmar_guardar_rascunho:"\xBFDesea guardar el borrador actual y limpiar los campos?",rascunho_salvo_sucesso:"\xA1Borrador guardado con \xE9xito!",erro_ler_dados:"Error: No fue posible leer los datos.",erro_ao_salvar:"Error al guardar.",cliente_sem_nome:"Cliente Sin Nombre",sem_status:"Sin Estado",retomar_caso:"Retomar Caso",descartar:"Descartar",retomar_rascunho_confirm:"\xBFRetomar este borrador? El formulario actual ser\xE1 reemplazado.",rascunho_carregado:"Borrador cargado.",excluir_rascunho_confirm:"\xBFEliminar este borrador?",acoes_plural:"Acciones",acao_singular:"Acci\xF3n",definidas_plural:"definidas",definida_singular:"definida",renomear_tooltip:"Haz clic para renombrar esta tarea",renomear_hint:"\u270E Renombrar",substituir_rascunho_confirm:"Esto reemplazar\xE1 el borrador actual de la nota. \xBFDeseas continuar?",restaurar_rascunho_confirm:"Detectamos un borrador sin guardar de tu \xFAltima sesi\xF3n. \xBFDeseas restaurarlo?",cole_link_placeholder:"Pega el enlace aqu\xED...",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F \xBFEl anunciante consinti\xF3 la grabaci\xF3n?",sim:"S\xED",nao:"No",pronto_comecar:"\xBFListo para empezar?",selecione_status_ajuda:"Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Tarea(s) solicitada(s):",passos_executados:"\u{1F463} Qu\xE9 se hizo:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 Dudas del anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resoluciones/Explicaciones:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tareas implementadas en la call:",proximos_passos:"\u{1F680} Pr\xF3ximos pasos:",consideracoes:"\u{1F4A1} Consideraciones adicionales:",contexto_call:"\u{1F4AC} Contexto/Qu\xE9 se hizo:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Mi Acci\xF3n:",dia:"\u{1F4C5} D\xEDa de Follow-up (si aplica):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Fecha de reprogramaci\xF3n:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evidencias de Contacto",ligacao_1:"Llamada 1",ligacao_2:"Llamada 2",mensagem_am:"Mensaje para AM",tentativa_ligacao:"\u{1F4DE} Intento de llamada:"}},Ue={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},Xn={"GTM Instalado":"GTM Instalado","Vinculador de convers\xF5es":"Vinculador de conversiones","Tag criada":"Etiqueta creada","Teste GTM":"Prueba GTM","Teste Ads":"Prueba Ads","Vers\xE3o Publicada":"Versi\xF3n Publicada","Status Ads":"Estado Ads","Termos aceitos no Ads":"T\xE9rminos aceptados en Ads","Tag implementada":"Etiqueta implementada","Painel do Ads (ap\xF3s 7 dias)":"Panel de Ads (despu\xE9s de 7 d\xEDas)","Tag do evento GA4 implementado no GTM":"Etiqueta del evento GA4 implementada en GTM","Teste GTM (tagassistant.google.com)":"Prueba GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)":"Prueba GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM":"Versi\xF3n publicada en GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4":"(Si hay par\xE1metros) Dimensiones personalizadas creadas en GA4","Evento marcado como principal no GA4":"Evento marcado como principal en GA4","GA4 e Google Ads vinculados corretamente":"GA4 y Google Ads vinculados correctamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)":"Evento principal de GA4 importado en Google Ads (como secundario)","M\xE9tricas app & web ativadas no Google Ads":"M\xE9tricas app y web activadas en Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)":"(Opcional) Prueba en el Informe de Tiempo Real (GA4)","Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)":"Validaci\xF3n: Cuenta GA4 (solo flujo web, no es sector salud)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)':'"Recopilaci\xF3n de datos proporcionados por el usuario" habilitada en GA4 (Administrador > Recopilaci\xF3n de Datos)',"Confirma\xE7\xE3o de coleta de dados (UI)":"Confirmaci\xF3n de recopilaci\xF3n de datos (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM":"Etiqueta del evento GA4 optimizado (UPD) implementada en GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)":"Prueba GTM (tagassistant - par\xE1metro 'em' sin error)","Teste GA4 (DebugView - tagassistant)":"Prueba GA4 (DebugView - tagassistant)","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio":"(Capacitaci\xF3n) Evento principal importado en Google Ads como secundario","Tag implementado no GTM":"Etiqueta implementada en GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo":"Prueba del disparo de la etiqueta de configuraci\xF3n en tag assistant en m\xE1s de una p\xE1gina, mostrando ID y etiqueta","Teste usando o #google-wcc-debug":"Prueba usando #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]":"Cambio del estado de la conversi\xF3n en Google Ads [Esperar algunos minutos]","1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas":"1. OGT (gTag/GTM con etiqueta de vinculador de conversi\xF3n) a\xF1adido en todas las p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)":"2. El etiquetado autom\xE1tico (auto tagging) est\xE1 habilitado en Google Ads (Administrador > Config. de la Cuenta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".':'3. [Si es GTM] El vinculador de conversi\xF3n est\xE1 presente y el activador definido para dispararse en "Todas las P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?":"4. \xBFEl gclid se mantiene sin redirecciones y se almacena en la cookie _gcl_aw en la landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?":"5. \xBFEl gclid fue pasado a la p\xE1gina de conversi\xF3n?"};function po(e,t,a){let n=e?.screenshots?.[t]||[];return a!=="es"?n:n.map(o=>Xn[o]||o)}function uo(e,t,a){return a==="es"&&e?.fieldPrefixes_es?.[t]?e.fieldPrefixes_es[t]:e?.fieldPrefixes?.[t]||""}function Bt(e,t,a){if(t!=="es")return e;let n=Qn[a];return n?{...e,...n}:e}var Kn=["GTM_GA4_VERIFICADO","MULTIPLE_CIDS"],Jn=["REASON_COMMENTS"];function Ft(e){let t=[...Jn];return e?.requiresTasks&&t.push("GTM_GA4_VERIFICADO"),t}function mo(e){let t=[...Kn,...e?.extraOptionalFields||[]],a=Ft(e);return t.filter(n=>!a.includes(n))}var Ke={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Caso Reagendado."},fieldPrefixes_es:{REASON_COMMENTS:"Caso Reprogramado."}},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Reagendamento aceit\xE1vel."},fieldPrefixes_es:{REASON_COMMENTS:"Reprogramaci\xF3n aceptable."}},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","DIA","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Aguardando Valida\xE7\xF5es no Google Ads."},fieldPrefixes_es:{REASON_COMMENTS:"Esperando Validaciones en Google Ads."}},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES"]},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","TENTATIVA_LIGACAO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PASSOS_EXECUTADOS","RESULTADO","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["PROXIMOS_PASSOS"],fieldPrefixes:{REASON_COMMENTS:"Task implementada com sucesso."},fieldPrefixes_es:{REASON_COMMENTS:"Tarea implementada con \xE9xito."}},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","DUVIDAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["PROXIMOS_PASSOS","CONSIDERACOES"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para tirar d\xFAvidas do anunciante."},fieldPrefixes_es:{REASON_COMMENTS:"Consultor\xEDa utilizada para resolver dudas del anunciante."}},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PROBLEMAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para testar e solucinar problemas da convers\xE3o."},fieldPrefixes_es:{REASON_COMMENTS:"Consultor\xEDa utilizada para probar y solucionar problemas de la conversi\xF3n."}},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,templateFields:["SPEAKEASY_ID","label_substatus","REASON_COMMENTS","COMENTARIOS"],customFooter:"Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},yt={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},vt=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],Pt=["CONSIDERACOES","COMENTARIOS"],mt={"quickfill-gtm-install":{type:"all",substatus:["SO_Implementation_Only"],"field-REASON_COMMENTS":"Instala\xE7\xE3o do GTM finalizada.","field-TASKS_SOLICITADAS":"\u2022 Instala\xE7\xE3o do GTM","field-PASSOS_EXECUTADOS":`\u2022 Criamos a conta dentro do GTM
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
\u2022 Tentativa 2 -`},"quickfill-ni-followup-lm":{type:"lm",substatus:["NI_Attempted_Contact"],"field-REASON_COMMENTS":"Tentativa de contato sem sucesso (Follow-up LM 2/6)","field-SPEAKEASY_ID":"N/A","field-ON_CALL":"N/A","field-CONTEXTO_CALL":"\u2022 No dia {DIA} do 2/6 enviei e-mail de follow-up (caso LM, sem tentativas de liga\xE7\xE3o), mas n\xE3o obtive resposta.","field-TASKS_SOLICITADAS":"N/A","field-IMPEDIMENTO_CLIENTE":"N/A","field-MINHA_ACAO":"N/A","field-GTM_GA4_VERIFICADO":"N/A","field-SCREENSHOTS":"\u2022 E-mail de follow-up enviado (LM) -"},"quickfill-ni-attempted-2day":{type:"bau",substatus:["NI_Attempted_Contact"],quickLaunch:{status:"NI",subStatus:"NI_Attempted_Contact",label:"NI Attempted \u2014 In\xEDcio 2 Day Rule",keywords:"2 day ligacao attempted contact inicio",focusIds:["field-SPEAKEASY_ID","evidence-l1","evidence-l2","evidence-msg"]},"field-REASON_COMMENTS":"Attempted Contact (In\xEDcio 2 Day Rule)","field-CONTEXTO_CALL":`\u2022 Fiz a primeira tentativa de liga\xE7\xE3o, sem sucesso.
\u2022 Enviei uma message no chat para o AM.
\u2022 Aguardei 5 minutos e fiz a segunda tentativa de liga\xE7\xE3o, novamente sem sucesso.
\u2022 Aguardei mais 5 minutos e agora farei o acompanhamento 2 Day Rule.`,"field-SCREENSHOTS":`\u2022 MSG AM -
\u2022 Tentativa 1 -
\u2022 Tentativa 2 -`},"quickfill-in-nrp-bau":{type:"bau",substatus:["IN_Not_Reachable"],"field-REASON_COMMENTS":"NRP (BAU - 3 tentativas)","field-COMENTARIOS":`\u2022 Duas liga\xE7\xF5es seguidas, e e-mail "Antes dos 10 minutos" e uma terceira e ultima tentativa de liga\xE7\xE3o.
\u2022 N\xE3o houve resposta \xE0s tentativas de liga\xE7\xE3o ou e-mail, por isso o caso ser\xE1 inativado.`,"field-SCREENSHOTS":`\u2022 Tentativa 1 -
\u2022 Tentativa 2 -
\u2022 Tentativa 3 -`,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-no-show-bau":{type:"bau",substatus:["IN_Not_Reachable"],quickLaunch:{status:"IN",subStatus:"IN_Not_Reachable",label:"IN Not Reachable \u2014 Finaliza\xE7\xE3o 2 Day Rule",keywords:"2 day finalizacao nao atendeu ligacoes reachable",focusIds:["field-SPEAKEASY_ID"]},"field-REASON_COMMENTS":"Sem resposta ao 2 Day Rule.","field-ON_CALL":"N/A","field-COMENTARIOS":`\u2022 O caso foi gerado e entrei na chamada no hor\xE1rio agendado.
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

Irei abrir caso em BAU para o dia solicitado e pedir a inativa\xE7\xE3o do mesmo.`}},Qn={"quickfill-gtm-install":{"field-REASON_COMMENTS":"Instalaci\xF3n de GTM finalizada.","field-TASKS_SOLICITADAS":"\u2022 Instalaci\xF3n de GTM","field-PASSOS_EXECUTADOS":`\u2022 Creamos la cuenta dentro de GTM
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

Abrir\xE9 un caso en BAU para el d\xEDa solicitado y pedir\xE9 la inactivaci\xF3n del mismo.`}};var go={pt:{searching:"Buscando ID...",readingMessage:"Lendo mensagem...",idFound:e=>`ID Localizado: ${e}`,noIdFound:"Nenhum ID encontrado.",notFound:"N\xE3o encontrado",processingError:"Erro ao processar."},es:{searching:"Buscando ID...",readingMessage:"Leyendo mensaje...",idFound:e=>`ID Encontrado: ${e}`,noIdFound:"Ning\xFAn ID encontrado.",notFound:"No encontrado",processingError:"Error al procesar."}};function wt(e){let t=se();return go[t]?.[e]??go.pt[e]}var bo="cw-automation-styles";if(!document.getElementById(bo)){let e=document.createElement("style");e.id=bo,e.innerHTML=`
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
            z-index: 1000000 !important; 
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
            z-index: 999999;                      /* Fica atr\xE1s do Input (1000000) */
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: all;                  /* Bloqueia cliques na p\xE1gina */
        }
    `,document.head.appendChild(e)}function fo(e){let t=document.getElementById("cw-loading-overlay");e?t?t.style.opacity="1":(t=document.createElement("div"),t.id="cw-loading-overlay",document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1")):t&&(t.style.opacity="0",setTimeout(()=>t.remove(),300))}async function Gt(e){await aa();let t=document.getElementById(e),a="";fo(!0),t&&(a=t.placeholder,t.placeholder=wt("searching"),t.value="",t.classList.add("cw-scanning-active"));try{let n=document.querySelector('material-button[debug-id="dock-item-case-log"]');n&&!n.classList.contains("selected")&&(xt(n),await ce(1200));let o=document.querySelector("search-filter dropdown-button .button");if(o&&!(o.innerText||"").includes("All")){xt(o),await ce(600);let b=document.querySelector('material-checkbox[debug-id="check-all-box"]');b&&b.getAttribute("aria-checked")!=="true"&&(xt(b),await ce(300));let g=document.querySelector('material-button[debug-id="apply-filter"]');g&&(xt(g),await ce(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await ce(500));let r=Array.from(document.querySelectorAll(".message-header"));for(let f=r.length-1;f>=0;f--){let b=r[f],g=b.querySelector("i.material-icons-extended"),O=g&&g.innerText.trim()==="phone_in_talk",C=b.innerText||"",x=C.includes("Agent joined")||C.includes("outbound-call")||C.includes("Speakeasy");if(O||x){b.getAttribute("aria-expanded")==="true"||(t&&(t.placeholder=wt("readingMessage")),xt(b),await ce(1e3));break}}let c=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),h=/Speakeasy.*?(P\d{15,25})/i,p=null;for(let f=c.length-1;f>=0;f--){let b=c[f];if(b.offsetParent===null)continue;let g=(b.innerText||"").match(h);if(g&&g[1]){p=g[1];break}}if(t)if(p){try{await navigator.clipboard.writeText(p)}catch{}t.tagName==="INPUT"||t.tagName==="TEXTAREA"?t.value=p:t.textContent=p,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),S.playSuccess(),J(wt("idFound")(p)),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}else S.playError(),J(wt("noIdFound"),{error:!0}),t.placeholder=wt("notFound"),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}catch(n){console.error("Erro na automa\xE7\xE3o:",n),S.playError(),J(wt("processingError"),{error:!0})}finally{t&&(t.classList.remove("cw-scanning-active"),t.value||(t.placeholder=a)),fo(!1)}}function ho(e){e.dataset.bulletEnabled!=="true"&&(e.dataset.bulletEnabled="true",(e.value.trim()===""||e.value.trim()==="\u2022")&&(e.value="\u2022 "),e.addEventListener("keydown",function(t){let a=this.selectionStart,n=this.selectionEnd,o=this.value,i=o.lastIndexOf(`
`,a-1)+1,r=o.substring(i,a);if(t.key==="Enter"){t.preventDefault();let l=r.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(r.trim()==="\u2022"){this.value=o.substring(0,i)+`
`+o.substring(n),this.selectionStart=this.selectionEnd=i+1;return}let c=`
`+l;this.value=o.substring(0,a)+c+o.substring(n),this.selectionStart=this.selectionEnd=a+c.length}else if(t.key==="Tab")t.preventDefault(),t.shiftKey?r.startsWith("  ")&&(this.value=o.substring(0,i)+r.substring(2)+o.substring(a),this.selectionStart=this.selectionEnd=a-2):(this.value=o.substring(0,i)+"  "+r+o.substring(a),this.selectionStart=this.selectionEnd=a+2);else if(t.key==="Backspace"&&a===n&&a>0){let l=o.substring(0,a);l.endsWith("\u2022 ")?(t.preventDefault(),this.value=l.substring(0,a-2)+o.substring(n),this.selectionStart=this.selectionEnd=a-2):l.endsWith("  ")&&r.trim().startsWith("\u2022")&&(t.preventDefault(),this.value=l.substring(0,a-2)+o.substring(n),this.selectionStart=this.selectionEnd=a-2)}}))}function jt(e,t,a){t.innerHTML="";let n=Ke[e];if(!n)return;let o=Ft(n);if(a.activeFields.forEach(r=>{if(["TAGS_IMPLEMENTED","SCREENSHOTS_LIST","CONSENTIU_GRAVACAO","CASO_PORTUGAL","label_substatus"].includes(r))return;let l=`field-${r}`,c=document.createElement("label"),h=g=>Re[a.currentLang]?.[g]||Re.pt?.[g]||g;c.textContent=h(r.toLowerCase())!==r.toLowerCase()?h(r.toLowerCase()):r.replace(/_/g," ").replace(/\b\w/g,g=>g.toUpperCase())+":",Object.assign(c.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px",fontWeight:"700",color:H.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let p=o.includes(r),f=document.createElement("span");if(f.textContent=c.textContent,p){let g=document.createElement("span");g.textContent=" *",g.style.color=H.error,f.appendChild(g)}if(c.innerHTML="",c.appendChild(f),r==="SPEAKEASY_ID"){let g=document.createElement("button");g.innerHTML=h("auto_busca"),g.style.cssText=`font-size: 11px; font-weight: 700; color: ${H.primary}; background-color: ${H.primaryBg}; border: none; border-radius: ${Ae.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${me};`,g.onmouseenter=()=>g.style.backgroundColor="#d2e3fc",g.onmouseleave=()=>g.style.backgroundColor=H.primaryBg,g.onclick=O=>{O.preventDefault(),S.playClick(),Gt(l)},c.appendChild(g)}if(!p){let g=document.createElement("button");g.innerHTML="\u2715",g.style.cssText=`font-size: 14px; background: ${H.bgInput}; border: none; color: ${H.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${me};`,g.onmouseenter=()=>{g.style.background=H.error,g.style.color=H.surface},g.onmouseleave=()=>{g.style.background=H.bgInput,g.style.color=H.textSub},g.onclick=async O=>{O.preventDefault(),S.playClick();let C=f.textContent.replace(/:\s*$/,"").trim();await Te(h("remover_campo_confirm").replace("{campo}",C),{danger:!0,confirmText:h("remover")})&&(a.removeField(r),jt(e,t,a))},c.appendChild(g)}let b;vt.includes(r)?(b=document.createElement("textarea"),b.classList.add("bullet-textarea","cw-textarea"),b.placeholder=h("utilize_marcadores"),ho(b)):Pt.includes(r)?(b=document.createElement("textarea"),b.classList.add("cw-textarea"),b.placeholder=h("descreva_consideracoes")):(b=document.createElement("input"),b.type="text",b.classList.add("cw-input")),b.id=l,b.value=a.formData[l]||"",b.addEventListener("input",g=>a.updateField(l,g.target.value)),t.appendChild(c),t.appendChild(b)}),a.activeFields.includes("CONSENTIU_GRAVACAO")){let r=h=>Re[a.currentLang]?.[h]||Re.pt?.[h]||h,l=document.createElement("label");l.textContent=r("consentiu_gravacao"),Object.assign(l.style,{display:"block",fontSize:"13px",fontWeight:"700",color:H.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let c=document.createElement("select");c.className="cw-select",c.innerHTML=`
            <option value="false">${r("nao")}</option>
            <option value="true">${r("sim")}</option>
        `,c.value=a.consent?"true":"false",c.onchange=()=>a.setConsent(c.value==="true"),t.appendChild(l),t.appendChild(c)}let i=(n.templateFields||[]).filter(r=>!o.includes(r)&&!a.activeFields.includes(r));if(i.length>0){let r=c=>Re[a.currentLang]?.[c]||Re.pt?.[c]||c,l=document.createElement("div");Object.assign(l.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginTop:"24px"}),i.forEach(c=>{let h=r(c.toLowerCase())!==c.toLowerCase()?r(c.toLowerCase()):c.replace(/_/g," ").replace(/\b\w/g,f=>f.toUpperCase())+":",p=document.createElement("button");p.type="button",p.textContent=`+ ${h.replace(/:$/,"")}`,p.style.cssText=`font-size: 12px; font-weight: 600; color: ${H.primary}; background-color: ${H.primaryBg}; border: none; border-radius: ${Ae.pill}; padding: 6px 14px; cursor: pointer; transition: all 0.2s ${me};`,p.onmouseenter=()=>p.style.backgroundColor="#d2e3fc",p.onmouseleave=()=>p.style.backgroundColor=H.primaryBg,p.onclick=f=>{f.preventDefault(),S.playClick(),a.addFieldAt(c,a.activeFields.length),jt(e,t,a)},l.appendChild(p)}),t.appendChild(l)}}function ua(e,t,a,n=null){let o=e.currentSubStatus;if(!o)return null;let i=Ke[o],r=Re[e.currentLang]||Re.pt,l=p=>r[p]||Re.pt?.[p]||p,c='style="margin-bottom: 12px; padding-left: 30px;"',h="";if(e.activeFields.forEach(p=>{let f=l(p.toLowerCase()),b="N/A";if(p==="label_substatus")f=l("label_substatus"),b=i.name;else if(p==="TAGS_IMPLEMENTED"){f=l("tags_implemented");let g=[];t.getCheckedElements().forEach(C=>{let x=C.value,L=Ue[x],j=C.count||1,I=x==="ads_conversion_tracking"||x==="ads_enhanced_conversions";e.tagSupportUsed&&I&&!e.forcedScreenshots.has(x)?g.push(`${L.name} - ${l("ts_output_disclaimer")}`):g.push(j>1?`${L.name} (x${j})`:L.name)}),b=g.join(", ")||"N/A"}else if(p==="SCREENSHOTS_LIST"){f=l("screenshots_list");let g="",O=t.screenshotsElement;O&&Array.from(O.querySelectorAll('input[id^="name-"]')).forEach(x=>{let L=x.value,j=x.closest(".cw-screen-card");if(j){let I=j.querySelectorAll('input[id^="screen-"]'),F=!1,N="";I.forEach(R=>{let q=R.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"Evid\xEAncia",B=R.value.trim();B&&(N+=`<li>${q} - ${B}</li>`,F=!0)}),F&&(g+=`<div style="margin-bottom: 8px;"><b>${L}</b><ul ${c}>${N}</ul></div>`)}}),b=g||"N/A"}else if(p==="CASO_PORTUGAL")f=l("caso_portugal"),b=l("sim");else if(p==="CONSENTIU_GRAVACAO")f=l("consentiu_gravacao"),b=e.consent?l("sim"):l("nao");else{let g=`field-${p}`,O=e.formData[g],C=uo(i,p,e.currentLang),x=C?C+" ":"";if(O&&O.trim()!==""&&O.trim()!=="\u2022"){let L=O.trim();if(vt.includes(p)){let j=L.split(`
`).map(I=>I.trim()).filter(I=>I!==""&&I!=="\u2022").map(I=>I.startsWith("\u2022 ")?I.substring(2):I).map(I=>`<li>${I}</li>`).join("");b=j?`${x}<ul ${c}>${j}</ul>`:"N/A"}else Pt.includes(p)?b=x+L.split(`
`).filter(j=>j.trim()!=="").map(j=>`<p style="margin: 0 0 8px 0;">${j}</p>`).join(""):b=x+L}else x&&(b=x.trim())}h+=`<b>${f}</b><br>${b}<br><br>`}),n){let p="";n.l1&&(p+=`<li>${l("ligacao_1")}: ${n.l1}</li>`),n.l2&&(p+=`<li>${l("ligacao_2")}: ${n.l2}</li>`),n.msg&&(p+=`<li>${l("mensagem_am")}: ${n.msg}</li>`),p&&(h+=`<b>${l("evidencias_contato")}</b><br><ul ${c}>${p}</ul><br>`)}if(i.customFooter&&(h+=`${i.customFooter}<br><br>`),a?.getOutput){let p=a.getOutput();p&&(h+=`${p}<br><br>`)}return h+="<i>Nota criada atrav\xE9s do Cases Wizard.</i>",h.replace(/(<br>\s*){3,}/g,"<br><br>").trim()}var xo={pt:"Passe o mouse sobre um cen\xE1rio para visualizar o texto...",es:"Pasa el mouse sobre un escenario para ver el texto..."};function yo(){return xo[se()]||xo.pt}function vo(e){let t=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,a=document.createElement("div");a.className="cw-step-scenarios";let n=document.createElement("div");Object.assign(n.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let o=document.createElement("div");Object.assign(o.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"44px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"});let i=document.createElement("span");i.style.transition="opacity 0.05s ease, transform 0.05s ease",i.textContent=yo(),o.appendChild(i);let r=new Set,l=null;return a.render=(c,h)=>{r.clear();let p=Object.entries(mt).filter(([f,b])=>{let g=!b.type||b.type==="all"||b.type===h,O=Array.isArray(b.substatus)&&b.substatus.includes(c);return g&&O});n.innerHTML="",p.forEach(([f,b])=>{let g=document.createElement("div"),O=f.replace("quickfill-","").replace(/-/g," ");g.textContent=O,g.dataset.id=f,g.dataset.sound="hover",Object.assign(g.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"});let C=Bt(b,se(),f),x=C["field-REASON_COMMENTS"]||C["field-CONTEXTO_CALL"]||f;g.onmouseenter=()=>{l&&clearTimeout(l),r.has(f)||(g.style.background="#f1f3f4"),i.style.opacity="0",t||(i.style.transform="translateY(5px)"),l=setTimeout(()=>{i.textContent=x.substring(0,120)+(x.length>120?"...":""),i.style.opacity="1",t||(i.style.transform="translateY(0)")},50)},g.onmouseleave=()=>{l&&clearTimeout(l),r.has(f)||(g.style.background="#ffffff"),l=setTimeout(()=>{r.size===0&&(i.style.opacity="0",setTimeout(()=>{i.textContent=yo(),i.style.opacity="1"},50))},100)},g.onclick=()=>{S.playClick();let L=!r.has(f);L?(r.add(f),g.style.background="#e8f0fe",g.style.borderColor="#1a73e8",g.style.color="#1967d2"):(r.delete(f),g.style.background="#ffffff",g.style.borderColor="#dadce0",g.style.color="#3c4043"),e(f,L)},n.appendChild(g)}),p.length===0?a.style.display="none":a.style.display="block"},a.appendChild(n),a.appendChild(o),a}function Zn(e){return e==="ads_conversion_tracking"||e==="ads_enhanced_conversions"}function ma(e,t){return t.tagSupportUsed&&Zn(e)&&!t.forcedScreenshots.has(e)}var ue={bg:H.bgInput,white:H.surface,border:H.border,textMain:H.text,textSub:H.textSub,blue:H.blue,blueLight:H.primaryBg,brands:{ads:{id:"ads",label:"Google Ads",color:H.blue,bg:H.primaryBg,icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:H.yellow,bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:H.primary,bg:H.primaryBg,icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:H.green,bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},gt={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function wo(e,t,a){let n={};a&&a.subscribe(()=>{N(),R()});function o(T){let q=T.toLowerCase();return q.includes("ads")||q.includes("conversion")||q.includes("remarketing")?ue.brands.ads:q.includes("ga4")||q.includes("analytics")?ue.brands.ga4:q.includes("gtm")||q.includes("tag manager")||q.includes("container")?ue.brands.gtm:q.includes("merchant")||q.includes("shopping")||q.includes("feed")?ue.brands.gmc:ue.brands.default}let i=Object.entries(Ue).filter(([T,q])=>q.popular),r={};Object.entries(Ue).forEach(([T,q])=>{if(q.popular)return;let B=o(q.name);r[B.label]||(r[B.label]={brand:B,tasks:[]}),r[B.label].tasks.push({key:T,...q})});let l="cw-zen-tasks";if(!document.getElementById(l)){let T=document.createElement("style");T.id=l,T.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column;
                font-family: ${ue.font}; background: ${ue.bg}; position: relative; overflow: visible;
                border-radius: 12px; border: 1px solid ${ue.border};
            }
            
            /* SCROLL AREA */
            .cw-zen-content { padding-bottom: 20px; }

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${ue.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${ue.white}; 
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
                font-size: 12px; font-weight: 500; color: ${ue.textMain}; line-height: 1.2; 
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
                color: ${ue.textMain}; display: flex; align-items: center; justify-content: center;
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
                border: 1px solid ${ue.border}; border-radius: 10px; background: ${ue.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${ue.blue}; box-shadow: 0 0 0 3px ${ue.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${ue.border}; border-radius: 10px; background: ${ue.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${ue.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${ue.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${ue.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${ue.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item:focus-visible, .cw-acc-header:focus-visible { outline: 2px solid ${ue.blue}; outline-offset: -2px; }
            .cw-task-item.selected { background: ${ue.blueLight}; }
            .cw-task-item.ts-success { background: #F0FDF4 !important; border-left: 4px solid #22C55E; }
            .cw-task-item.ts-success .cw-task-label { color: #166534 !important; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${ue.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${ue.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS (Lista: quadrado) */
            .cw-step-btn-list {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${ue.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn-list:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${ue.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: sticky; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${ue.border};
                border-bottom-left-radius: 11px;
                border-bottom-right-radius: 11px;
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                visibility: hidden;
                box-shadow: ${ue.shadowFloat}; z-index: 10;
                margin-top: auto;
            }
            /* .cw-zen-container usa overflow:visible (pros cards do hero n\xE3o
               cortarem sombra/hover), ent\xE3o sem visibility a barra "escondida"
               via transform continua sendo pintada logo abaixo do card,
               encostando/sobrepondo o que vem depois no layout. */
            .cw-status-bar.visible { transform: translateY(0); visibility: visible; }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${ue.textMain}; }
            
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
                font-family: ${ue.font}; font-size: 15px; font-weight: 600; color: ${ue.textMain};
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
                border-color: ${ue.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${ue.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${ue.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${ue.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 11px; font-weight: 700; color: ${ue.textSub};
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
        `,document.head.appendChild(T)}let c=document.createElement("div");c.className="cw-zen-container";let h=document.createElement("div");Object.assign(h.style,{display:"none"});let p=document.createElement("div");p.className="cw-screens-container",h.appendChild(p),c.innerHTML=`
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
    `;let f=c.querySelector(".cw-hero-grid"),b=c.querySelector(".cw-acc-container"),g=c.querySelector(".cw-results-container"),O=c.querySelector(".cw-search-input");_t(c,".cw-acc-header, .cw-task-item");let C=c.querySelector(".cw-status-bar"),x=c.querySelector(".cw-status-text"),L=c.querySelector(".cw-footer-icons");function j(T,q){return B=>{if(B.target.closest(".cw-step-btn-hero, .cw-step-btn-list"))return;let P=n[T]?n[T].count:0;F(T,P>0?-P:1,q)}}i.forEach(([T,q])=>{let B=o(q.name),P=document.createElement("div");P.className="cw-hero-card",P.id=`hero-${T}`,P.style.setProperty("--hero-color",B.color),P.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${gt[B.icon]}</div>
                <div class="cw-hero-label">${q.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn-hero minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn-hero plus">+</div>
            </div>
        `,P.onclick=j(T,q),P.querySelector(".minus").onclick=()=>F(T,-1,q),P.querySelector(".plus").onclick=()=>F(T,1,q),P.tabIndex=0,P.setAttribute("role","button"),P.setAttribute("aria-pressed","false"),P.addEventListener("keydown",U=>{(U.key==="Enter"||U.key===" ")&&(U.preventDefault(),P.click())}),P.dataset.color=B.color,f.appendChild(P)});function I(T,q){let B=o(q.name),P=document.createElement("div");return P.className="cw-task-item",P.dataset.id=T,P.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${B.bg}; color:${B.color}">
                    ${gt[B.icon]||gt.default}
                </div>
                <div class="cw-task-label">${q.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn-list minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn-list plus">+</div>
            </div>
        `,P.onclick=j(T,q),P.querySelector(".minus").onclick=()=>F(T,-1,q),P.querySelector(".plus").onclick=()=>F(T,1,q),P.tabIndex=0,P.setAttribute("role","button"),P.setAttribute("aria-pressed","false"),P.setAttribute("aria-label",q.name),P.addEventListener("keydown",U=>{(U.key==="Enter"||U.key===" ")&&(U.preventDefault(),P.click())}),P}Object.entries(r).forEach(([T,q])=>{let B=document.createElement("div");B.className="cw-acc-group";let P=document.createElement("div");P.className="cw-acc-header",P.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${q.brand.color}"></div>
                ${T}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,P.tabIndex=0,P.setAttribute("role","button"),P.setAttribute("aria-expanded","false"),P.onclick=()=>{b.querySelectorAll(".cw-acc-group.open").forEach(_=>{_!==B&&(_.classList.remove("open"),_.querySelector(".cw-acc-header")?.setAttribute("aria-expanded","false"))});let V=B.classList.toggle("open");P.setAttribute("aria-expanded",String(V))},P.addEventListener("keydown",V=>{(V.key==="Enter"||V.key===" ")&&(V.preventDefault(),P.click())});let U=document.createElement("div");U.className="cw-acc-body",q.tasks.forEach(V=>{let _=I(V.key,V);U.appendChild(_)}),B.appendChild(P),B.appendChild(U),b.appendChild(B)});function F(T,q,B){n[T]||(n[T]={count:0,data:B,brand:o(B.name)}),n[T].count+=q,n[T].count<=0&&delete n[T],N(),R(),e&&e()}function N(){i.forEach(([U])=>{let V=f.querySelector(`#hero-${U}`);if(!V)return;let _=n[U];_?(V.classList.add("active"),V.setAttribute("aria-pressed","true"),V.querySelector(".cw-step-val").textContent=_.count,V.querySelector(".cw-step-val").style.color=V.dataset.color,V.classList.toggle("ts-success",ma(U,a))):(V.classList.remove("active"),V.setAttribute("aria-pressed","false"),V.classList.remove("ts-success"))}),c.querySelectorAll(".cw-task-item").forEach(U=>{let V=U.dataset.id,_=n[V];_?(U.classList.add("selected"),U.setAttribute("aria-pressed","true"),U.querySelector(".cw-step-val").textContent=_.count,U.classList.toggle("ts-success",ma(V,a))):(U.classList.remove("selected"),U.setAttribute("aria-pressed","false"),U.classList.remove("ts-success"))});let q=Object.keys(n),B=0,P=[];if(q.forEach(U=>{let V=n[U];B+=V.count;for(let _=0;_<V.count;_++)P.length<6&&P.push(V.brand)}),B>0){C.classList.add("visible");let U=B>1?t("acoes_plural"):t("acao_singular"),V=B>1?t("definidas_plural"):t("definida_singular");x.textContent=`${B} ${U} ${V}`,L.innerHTML="",P.forEach(_=>{let Z=document.createElement("div");Z.className="cw-mini-icon-status",Z.innerHTML=gt[_.icon]||gt.default;let ie=Z.querySelector("svg");ie&&(ie.style.width="14px",ie.style.height="14px"),L.appendChild(Z)})}else C.classList.remove("visible"),x.textContent="",L.innerHTML=""}O.addEventListener("input",T=>{let q=T.target.value.toLowerCase();if(q.length>0){b.style.display="none",g.style.display="block",g.innerHTML="";let B=!1;Object.entries(Ue).forEach(([P,U])=>{if(U.name.toLowerCase().includes(q)){B=!0;let V=I(P,U);n[P]&&(V.classList.add("selected"),V.setAttribute("aria-pressed","true"),V.querySelector(".cw-step-val").textContent=n[P].count),g.appendChild(V)}}),B||(g.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else b.style.display="block",g.style.display="none"});function R(){let T={};p.querySelectorAll(".cw-input-field").forEach(U=>{T[U.id]=U.value}),p.innerHTML="";let q=Object.keys(n),B=!1;if(q.length===0){p.appendChild(Ct({icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg>',title:t("selecione_tarefas")})),h.style.display="none";return}let P=document.createElement("div");P.className="cw-info-banner",P.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.
            </span>
        `,p.appendChild(P),q.forEach(U=>{let V=n[U].data,_=n[U].count,Z=n[U].brand,ie=ma(U,a),re=a.screenshotMode||"implementation",W=po(V,re,a.currentLang);if(W.length>0||ie){B=!0;for(let ee=1;ee<=_;ee++){let G=document.createElement("div");G.className="cw-screen-card",ie&&G.classList.add("ts-success"),G.style.setProperty("--brand-color",Z.color),G.style.setProperty("--brand-bg",Z.bg),G.style.setProperty("--brand-shadow",Z.color+"40");let te=document.createElement("div");te.className="cw-card-header";let Q=document.createElement("div");Q.className="cw-card-icon",Q.innerHTML=gt[Z.icon]||gt.default;let oe=document.createElement("div");oe.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let ae=document.createElement("input");ae.className="cw-card-title-input",ae.id=`name-${U}-${ee}`,ae.value=`${V.name}${_>1?" #"+ee:""}`,ae.title=t("renomear_tooltip");let v=document.createElement("span");if(v.className="cw-edit-hint",v.innerHTML=t("renomear_hint"),oe.appendChild(ae),oe.appendChild(v),te.appendChild(Q),te.appendChild(oe),G.appendChild(te),ie){let $=document.createElement("div");$.className="cw-ts-disclaimer-box",$.innerHTML=`
                <span>${t("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${t("incluir_mesmo_assim")}</button>
            `,$.querySelector("button").onclick=()=>{a.toggleForcedScreenshot(U,!0)},G.appendChild($)}else W.forEach(($,s)=>{let u=document.createElement("div");u.className="cw-input-group";let m=document.createElement("label");m.className="cw-input-label",m.textContent=$;let E=document.createElement("input");E.className="cw-input-field",E.id=`screen-${U}-${ee}-${s}`,E.placeholder=t("cole_link_placeholder"),E.setAttribute("autocomplete","off"),T[E.id]&&(E.value=T[E.id],E.value.trim().length>5&&E.classList.add("filled")),E.addEventListener("input",()=>{E.value.trim().length>5?E.classList.add("filled"):E.classList.remove("filled")});let y=document.createElement("div");y.className="cw-input-check",y.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',u.appendChild(m),u.appendChild(E),u.appendChild(y),G.appendChild(u)});p.appendChild(G)}}}),h.style.display=B?"block":"none"}return{selectionElement:c,screenshotsElement:h,updateSubStatus:()=>R(),getCheckedElements:()=>Object.keys(n).map(T=>({value:T,count:n[T].count})),setTaskCount:(T,q)=>{n[T]&&delete n[T],q>0&&Ue[T]&&F(T,q,Ue[T])},toggleTask:(T,q=!0)=>{let B=n[T];q&&!B?F(T,1,Ue[T]):!q&&B&&F(T,-B.count,Ue[T])},setLanguage:T=>{t=T;let q=c.querySelector(".js-hero-title");q&&(q.textContent=t("acesso_rapido"));let B=c.querySelector(".cw-search-input");B&&(B.placeholder=t("buscar_catalogo")),R(),N()},reset:()=>{for(let T in n)delete n[T];O.value="",b.style.display="block",g.style.display="none",N(),R()}}}var ei={marginTop:"24px",marginBottom:"16px",padding:"20px",background:"#fff9e6",borderRadius:"20px",border:"1.5px solid #fbbc0540",display:"none",boxShadow:"0 4px 12px rgba(251, 188, 5, 0.05)"},ti={fontSize:"12px",color:"#b06000",marginTop:"8px",lineHeight:"1.4"},ai={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #dadce0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",background:"#fff"},oi={display:"flex",gap:"20px",marginBottom:"12px"};function So(e){let t=document.createElement("div");t.id="tag-support-container",Object.assign(t.style,ei);let a=document.createElement("label");a.className="js-ts-main-label",a.textContent=e("utilizou_tag_support"),Object.assign(a.style,la,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,oi);let o=document.createElement("input");o.type="radio",o.name="ts_usage_mod",o.value="Sim",Object.assign(o.style,pa);let i=document.createElement("label");i.className="js-ts-sim-label",i.textContent=e("sim");let r=document.createElement("div");Object.assign(r.style,{display:"flex",alignItems:"center"}),r.appendChild(o),r.appendChild(i);let l=document.createElement("input");l.type="radio",l.name="ts_usage_mod",l.value="N\xE3o",l.checked=!0,Object.assign(l.style,pa);let c=document.createElement("label");c.className="js-ts-nao-label",c.textContent=e("nao");let h=document.createElement("div");Object.assign(h.style,{display:"flex",alignItems:"center"}),h.appendChild(l),h.appendChild(c),n.appendChild(r),n.appendChild(h);let p=document.createElement("div");p.style.display="block";let f=document.createElement("label");f.className="js-ts-reason-label",f.textContent=e("motivo_ts"),Object.assign(f.style,la,{fontSize:"12px"});let b=document.createElement("input");b.type="text",Object.assign(b.style,ai);let g=document.createElement("div");g.className="js-ts-warning",g.innerHTML=`\u26A0\uFE0F <strong>${e("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" rel="noopener noreferrer" style="color:#e37400; text-decoration:underline;">${e("link_aqui")}</a>`,Object.assign(g.style,ti),p.appendChild(f),p.appendChild(b),p.appendChild(g),t.appendChild(a),t.appendChild(n),t.appendChild(p),o.onchange=()=>{S.playClick(),p.style.display="none",X.setTagSupportUsed(!0)},l.onchange=()=>{S.playClick(),p.style.display="block",X.setTagSupportUsed(!1)};function O(j,I){if(t.style.display="none",!j||!I||I.length===0)return;I.some(N=>N==="ads_conversion_tracking"||N==="ads_enhanced_conversions")?t.style.display="block":(L(),X.setTagSupportUsed(!1))}function C(){if(t.style.display==="none")return"";let j=`<br><b>${e("tag_support_output_label")}</b> ${o.checked?`\u2705 ${e("sim")}`:`\u274C ${e("nao")}`}`;return l.checked&&b.value.trim()!==""&&(j+=`<br><b>${e("motivo_output_label")}</b> ${b.value}`),j+="<br>",j}function x(j){e=j,a.textContent=e("utilizou_tag_support"),f.textContent=e("motivo_ts"),i.textContent=e("sim"),c.textContent=e("nao"),g.innerHTML=`\u26A0\uFE0F <strong>${e("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" rel="noopener noreferrer" style="color:#b06000; text-decoration:underline;">${e("link_aqui")}</a>`}function L(){t.style.display="none",l.checked=!0,o.checked=!1,p.style.display="block",b.value=""}return{element:t,updateVisibility:O,getOutput:C,setLanguage:x,reset:L}}var ga="cw_notes_parking_lot",Ht="cw_notes_emergency_save";var _e={getAll:()=>{try{return JSON.parse(localStorage.getItem(ga)||"[]")}catch{return[]}},save:e=>{let t=_e.getAll(),a={id:Date.now().toString(),timestamp:new Date().toISOString(),...e};return t.unshift(a),t.length>5&&t.pop(),localStorage.setItem(ga,JSON.stringify(t)),a},delete:e=>{let t=_e.getAll();return t=t.filter(a=>a.id!==e),localStorage.setItem(ga,JSON.stringify(t)),t},getCount:()=>_e.getAll().length,saveEmergency:e=>{let t={timestamp:Date.now(),data:e};localStorage.setItem(Ht,JSON.stringify(t))},getEmergency:()=>{try{let e=localStorage.getItem(Ht);if(!e)return null;let t=JSON.parse(e);return Date.now()-t.timestamp>432e5?(localStorage.removeItem(Ht),null):!t.data||!t.data.subStatus?null:t.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(Ht)}};var Ut=["lucaste","ricardogi"];var Eo="cw_case_streak_v1",ni=[5,10,15,20,25,30,40,50];function Co(){let e=new Date;return`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`}function ba(){try{let e=JSON.parse(localStorage.getItem(Eo)||"{}");return e.date===Co()&&e.count||0}catch{return 0}}function Ao(){let e=ba()+1;try{localStorage.setItem(Eo,JSON.stringify({date:Co(),count:e}))}catch{}return{count:e,isMilestone:ni.includes(e)}}var ko={pt:{milestoneToast:e=>`\u{1F525} ${e} casos hoje!`,quickSearch:"Busca r\xE1pida: Ctrl/Cmd+K",casesToday:"Casos conclu\xEDdos hoje",drag:"Arrastar",cancel:"Cancelar",cancelledToast:"Cancelado!"},es:{milestoneToast:e=>`\u{1F525} \xA1${e} casos hoy!`,quickSearch:"B\xFAsqueda r\xE1pida: Ctrl/Cmd+K",casesToday:"Casos completados hoy",drag:"Arrastrar",cancel:"Cancelar",cancelledToast:"\xA1Cancelado!"}};function bt(e){let t=se();return ko[t]?.[e]??ko.pt[e]}var xe={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1",gray:"#9AA0A6"},fa=50,ha=null;function Vt(e){let t=document.getElementById("cw-btn-notes");if(!t)return;let a=t.querySelector(".cw-dot-dirty");e?a||(a=document.createElement("div"),a.className="cw-dot-dirty",t.appendChild(a)):a&&a.remove()}function To(){let e=document.getElementById("cw-streak-badge"),t=document.getElementById("cw-streak-count");if(!e||!t)return;let a=ba();t.textContent=a,e.classList.toggle("visible",a>0);let n=document.querySelector(".cw-pill");n&&(n.classList.toggle("has-streak",a>0),n.classList.toggle("streak-tier-2",a>=5&&a<15),n.classList.toggle("streak-tier-3",a>=15&&a<30),n.classList.toggle("streak-tier-4",a>=30))}function Io(){let{count:e,isMilestone:t}=Ao();if(To(),t){let a=document.querySelector(".cw-pill");S.playSuccess(),a&&to(a),J(bt("milestoneToast")(e))}}function Lo(e,t){let a="cw-command-center-style";if(!document.getElementById(a)){let I=document.createElement("style");I.id=a,I.innerHTML=`
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
                
                background: ${xe.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${xe.glassBorder}; border-radius: 50px;
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
                width: ${fa}px !important;
                height: ${fa}px !important;
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
                cursor: pointer; position: relative; color: ${xe.iconIdle};
                flex-shrink: 0;
                transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn { transition: background 0.2s ease, color 0.2s ease !important; }
            }
            .cw-btn:hover {
                background: ${xe.glassHighlight};
                color: ${xe.iconActive};
                /* S\xF3 scale (cresce do centro), sem translateY: bot\xF5es redondos
                   colados lado a lado numa fileira \xFAnica - um lift vertical
                   \xE9 o caso cl\xE1ssico de flicker quando o mouse passa raspando
                   a borda entre dois \xEDcones adjacentes. */
                transform: scale(1.18) !important;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn:hover { transform: none !important; }
            }

            .cw-btn.notes.active { color: ${xe.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${xe.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${xe.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${xe.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.library.active { color: ${xe.pink} !important; background: rgba(244, 143, 177, 0.15); } /* [NOVO] */
            .cw-btn.broadcast.active { color: ${xe.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${xe.teal} !important; background: rgba(0, 191, 165, 0.15); }
            .cw-btn.configs.active { color: ${xe.gray} !important; background: rgba(154, 160, 166, 0.15); }
            .cw-btn.bauform.active { color: ${xe.blue} !important; background: rgba(66, 133, 244, 0.15); }

            .cw-btn.notes:hover { color: ${xe.blue}; filter: drop-shadow(0 0 8px rgba(138, 180, 248, 0.6)); }
            .cw-btn.email:hover { color: ${xe.red}; filter: drop-shadow(0 0 8px rgba(242, 139, 130, 0.6)); }
            .cw-btn.script:hover { color: ${xe.purple}; filter: drop-shadow(0 0 8px rgba(197, 138, 249, 0.6)); }
            .cw-btn.links:hover { color: ${xe.green}; filter: drop-shadow(0 0 8px rgba(129, 201, 149, 0.6)); }
            .cw-btn.library:hover { color: ${xe.pink}; filter: drop-shadow(0 0 8px rgba(244, 143, 177, 0.6)); }
            .cw-btn.broadcast:hover { color: ${xe.orange}; filter: drop-shadow(0 0 8px rgba(249, 171, 0, 0.6)); }
            .cw-btn.timezone:hover { color: ${xe.teal}; filter: drop-shadow(0 0 8px rgba(0, 191, 165, 0.6)); }
            .cw-btn.configs:hover { color: ${xe.gray}; filter: drop-shadow(0 0 8px rgba(154, 160, 166, 0.6)); }

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
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${xe.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            @media (prefers-reduced-motion: reduce) {
                .cw-grip:hover .cw-grip-bar { transform: none !important; }
            }
            .cw-pill.dragging .cw-grip-bar { background-color: ${xe.blue}; width: 16px; opacity: 1; }

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
                border: 1px solid ${xe.glassBorder};
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
            .cw-center-dots span:nth-child(1) { background-color: ${xe.blue}; animation-delay: -0.22s; }
            .cw-center-dots span:nth-child(2) { background-color: ${xe.red}; animation-delay: -0.11s; }
            .cw-center-dots span:nth-child(3) { background-color: ${xe.green}; }
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
                color: ${xe.green};
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
        `,document.head.appendChild(I)}let n={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg class="cw-logo-base" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',mainSpark:'<svg class="cw-logo-spark" viewBox="0 0 24 24"><defs><linearGradient id="cw-spark-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4285F4"/><stop offset="33%" stop-color="#EA4335"/><stop offset="66%" stop-color="#FBBC05"/><stop offset="100%" stop-color="#34A853"/></linearGradient></defs><path fill="url(#cw-spark-grad)" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',configs:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>'},o=document.createElement("div");o.id="cw-floating-trigger",o.className="cw-pill side-right collapsed",o.innerHTML=`
        <div id="cw-command-center" style="display:none;"></div>
        <div class="cw-main-logo js-cc-quicksearch" title="${bt("quickSearch")}">${n.main}${n.mainSpark}</div>
        <div id="cw-admin-tag" class="cw-admin-badge">Admin</div>
        <div id="cw-streak-badge" class="cw-streak-badge js-cc-casestoday" title="${bt("casesToday")}">\u{1F525} <span id="cw-streak-count">0</span></div>

        <div class="cw-grip js-cc-drag" title="${bt("drag")}">
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
    `;let i=document.createElement("div");i.className="cw-focus-backdrop",document.body.appendChild(i),document.body.appendChild(o),To(),ye(()=>{let I=o.querySelector(".js-cc-quicksearch");I&&(I.title=bt("quickSearch"));let F=o.querySelector(".js-cc-casestoday");F&&(F.title=bt("casesToday"));let N=o.querySelector(".js-cc-drag");N&&(N.title=bt("drag"))});let r=(I,F)=>{S.playClick(),o.querySelector(`.${I}`).classList.toggle("active"),F()};if(o.querySelector(".notes").onclick=I=>{I.stopPropagation(),r("notes",e.toggleNotes)},o.querySelector(".bauform").onclick=I=>{I.stopPropagation(),r("bauform",e.toggleBAUForm)},o.querySelector(".email").onclick=I=>{I.stopPropagation(),r("email",e.toggleEmail)},o.querySelector(".script").onclick=I=>{I.stopPropagation(),r("script",e.toggleScript)},o.querySelector(".links").onclick=I=>{I.stopPropagation(),r("links",e.toggleLinks)},o.querySelector(".library").onclick=I=>{I.stopPropagation(),r("library",e.toggleLibrary)},o.querySelector(".timezone").onclick=I=>{I.stopPropagation(),r("timezone",e.toggleTimezone)},o.querySelector(".configs").onclick=I=>{I.stopPropagation(),r("configs",e.toggleConfigs)},o.querySelector(".broadcast").onclick=I=>{I.stopPropagation(),r("broadcast",()=>{let F=I.currentTarget.querySelector(".cw-badge");F&&F.remove(),e.broadcastControl&&e.broadcastControl.toggle()})},o.querySelectorAll(".cw-btn").forEach(I=>{I.addEventListener("mouseenter",()=>S.playHover())}),e.broadcastControl&&e.broadcastControl.hasUnread){let I=document.createElement("div");I.className="cw-badge",o.querySelector(".broadcast").appendChild(I)}let l=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function c(){if(l()){o.classList.remove("collapsed"),S.playGenieOpen();return}let I=o.getBoundingClientRect(),F=window.innerHeight,N=I.top>F/2,R=I.height;o.style.setProperty("transition","none","important"),o.classList.remove("collapsed");let T=o.scrollHeight;if(o.classList.add("collapsed"),o.style.height=`${R}px`,N){let q=F-I.bottom;o.style.top="auto",o.style.bottom=`${q}px`}else o.style.bottom="auto",o.style.top=`${I.top}px`;o.style.overflow="hidden",o.offsetWidth,o.style.removeProperty("transition"),o.classList.remove("collapsed"),o.style.height=`${T}px`,S.playGenieOpen(),setTimeout(()=>{o.style.height="",o.style.overflow=""},350)}function h(I=!0){if(o.classList.contains("collapsed"))return;if(l()){o.classList.add("collapsed"),I&&S.playSwoosh();return}let F=o.getBoundingClientRect().height;o.style.setProperty("transition","none","important"),o.style.height=`${F}px`,o.offsetWidth,o.style.removeProperty("transition"),o.classList.add("collapsed"),o.style.height=`${fa}px`,I&&S.playSwoosh(),setTimeout(()=>{o.style.height=""},700)}ha=h;let p=null;o.onmouseleave=()=>{document.querySelector(".cw-processing-card")||(p=setTimeout(()=>{o.querySelector(".cw-btn.active")||h()},3e3))},o.onmouseenter=()=>{p&&clearTimeout(p)},(async function(){let F=()=>{let N=ke();if(N){let R=N.split("@")[0].toLowerCase();if(Ut.includes(R)){let T=o.querySelector("#cw-admin-tag");T&&T.classList.add("visible")}}else setTimeout(F,2e3)};if(F(),t&&typeof t.then=="function"){try{await t}catch{}await ce(150)}else await ce(2800);o.classList.add("arriving"),S.playReady(),o.querySelectorAll(".cw-sep").forEach(N=>N.classList.add("visible"))})();let f=!1,b,g,O,C,x=3;o.onmousedown=I=>{if(I.target.closest("button"))return;I.preventDefault(),b=I.clientX,g=I.clientY;let F=o.getBoundingClientRect();O=F.left,C=F.top,document.addEventListener("mousemove",L),document.addEventListener("mouseup",j)};function L(I){let F=I.clientX-b,N=I.clientY-g;!f&&Math.sqrt(F*F+N*N)>x&&(f=!0,o.classList.add("dragging"),o.style.transition="none",p&&clearTimeout(p)),f&&(o.style.left=`${O+F}px`,o.style.top=`${C+N}px`,o.style.right="auto",o.style.bottom="auto",o.style.transform="none")}function j(I){if(document.removeEventListener("mousemove",L),document.removeEventListener("mouseup",j),f){f=!1,o.classList.remove("dragging");let F=window.innerWidth,N=window.innerHeight,R=o.getBoundingClientRect(),T=R.left+R.width/2,q;T<F/2?(q=24,o.classList.remove("side-right"),o.classList.add("side-left")):(q=F-R.width-24,o.classList.remove("side-left"),o.classList.add("side-right"));let B=pt(R.top,24,N-R.height-24);setTimeout(()=>{o.style.setProperty("transition","left 0.3s cubic-bezier(0.4, 0, 0.2, 1), top 0.3s cubic-bezier(0.4, 0, 0.2, 1)","important"),o.style.left=`${q}px`,o.style.top=`${B}px`,o.style.bottom="auto",o.style.transform=""},10),setTimeout(()=>{o.style.transition="",o.style.removeProperty("transition")},700)}else{let F=o.querySelector(".cw-btn.active"),N=I.target.closest("button");o.classList.contains("collapsed")?c():!F&&!N&&h(),N&&(N.style.transform="scale(0.9)",setTimeout(()=>N.style.transform="",150))}}}function Nt(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop");window._CW_ABORT_PROCESS=!1;let a=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;e&&ha?ha(!1):e&&e.classList.add("collapsed"),e&&e.classList.add("cw-busy");let n=document.createElement("div");n.className="cw-processing-card",n.innerHTML=`
      <div class="cw-center-slot">
        <div class="cw-center-dots"><span></span><span></span><span></span></div>
        <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
      </div>
      <div class="cw-center-text">${he.getRandomTip()}</div>
  `;let o=document.createElement("div");o.className="cw-abort-btn",o.textContent="Cancelar",o.onclick=c=>{c.stopPropagation(),window._CW_ABORT_PROCESS=!0,S.stopThinking(),J("Cancelado!",{duration:3e3}),l()},n.appendChild(o),document.body.appendChild(n),t&&t.classList.add("active"),requestAnimationFrame(()=>{requestAnimationFrame(()=>n.classList.add("visible"))}),S.startThinking();let i=Date.now(),r=!1;function l(){r||(r=!0,S.stopThinking(),t&&t.classList.remove("active"),e&&e.classList.remove("cw-busy"),n.classList.remove("visible"),setTimeout(()=>n.remove(),a?200:320))}return function(){if(window._CW_ABORT_PROCESS||r)return;let h=Math.max(0,2e3-(Date.now()-i));setTimeout(()=>{if(window._CW_ABORT_PROCESS||r)return;S.stopThinking();let p=n.querySelector(".cw-center-dots"),f=n.querySelector(".cw-center-success");p&&p.classList.add("hidden"),o.classList.add("hidden"),f&&f.classList.add("show"),setTimeout(()=>{f&&f.classList.remove("show"),setTimeout(l,200)},850)},h)}}function qo(e){let{onSaveCurrent:t,onLoadDraft:a,t:n}=e,o=document.createElement("button");o.className="js-btn-park",o.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${n("guardar")}</span>
    `,o.style.cssText=`
        flex: 1 1 0;
        padding: 12px 0;
        margin-top: 24px;
        border-radius: ${Ae.pill};
        font-size: 14px;
        font-weight: 700;
        background: ${H.surface};
        color: ${H.textSub};
        border: 1px solid ${H.border};
        cursor: pointer;
        display: flex; 
        align-items: center; 
        justify-content: center;
        gap: 8px;
        transition: background-color 0.2s ${me}, border-color 0.2s ${me}, color 0.2s ${me}, box-shadow 0.2s ${me}, transform 0.1s ${me};
        box-shadow: ${ot.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `,o.onmouseenter=()=>{o.style.backgroundColor="#F8F9FA",o.style.borderColor="#202124",o.style.color="#202124",o.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)"},o.onmouseleave=()=>{o.style.backgroundColor="#FFFFFF",o.style.borderColor="#DADCE0",o.style.color="#5F6368",o.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)"},o.onmousedown=()=>o.style.transform="scale(0.96)",o.onmouseup=()=>o.style.transform="scale(1)",o.onclick=async()=>{if(await Te(n("confirmar_guardar_rascunho")))try{let x=await t();x?(_e.save(x),O(),c(),S.playSuccess(),J(n("rascunho_salvo_sucesso"))):(S.playError(),J(n("erro_ler_dados"),{error:!0}))}catch(x){console.error("Erro ao salvar rascunho:",x),S.playError(),J(n("erro_ao_salvar"),{error:!0})}};let i=document.createElement("div");i.className="js-history-btn",i.title=n("meus_rascunhos"),i.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",i.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#9AA0A6"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let r=i.querySelector("svg"),l=document.createElement("div");l.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",i.appendChild(l),i.onmouseenter=()=>i.style.background="rgba(0,0,0,0.05)",i.onmouseleave=()=>i.style.background="transparent",i.onclick=C=>{C.stopPropagation(),g()};function c(){let C=_e.getCount();Vt(C>0),r.style.color=C>0?H.primary:"#9AA0A6",C>0?(l.style.display="block",l.textContent=C,window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||l.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):l.style.display="none"}let h=document.createElement("div");h.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${H.surface}; z-index: 100;
        border-radius: ${Ae.large} ${Ae.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${me};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;let p=document.createElement("div");p.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",p.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${n("rascunhos_salvos")}</span>`;let f=document.createElement("button");f.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',f.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",f.onmouseenter=()=>f.style.background="#F1F3F4",f.onmouseleave=()=>f.style.background="transparent",f.onclick=()=>g(!1),p.appendChild(f);let b=document.createElement("div");b.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",h.appendChild(p),h.appendChild(b);function g(C){let x=h.style.transform==="translateY(0%)";(C!==void 0?C:!x)?(O(),h.style.transform="translateY(0%)"):h.style.transform="translateY(110%)"}function O(){let C=_e.getAll();if(b.innerHTML="",C.length===0){b.innerHTML=`
                <div style="text-align:center; padding:80px 20px; color:${H.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${n("nenhum_rascunho")}</div>
                </div>`;return}C.forEach(x=>{let L=document.createElement("div");L.style.cssText=`
                background: ${H.surface}; padding: 20px; border-radius: ${Ae.large};
                border: 1.5px solid ${H.bgInput}; box-shadow: ${ot.subtle};
                position: relative;
            `;let I=new Date(x.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),F="";x.summaryTags&&x.summaryTags.length>0&&(F=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${x.summaryTags.slice(0,3).join(", ")+(x.summaryTags.length>3?"...":"")}</div>`),L.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${x.clientName||n("cliente_sem_nome")}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${I}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${x.cid||"---"}</span>
                    <span style="display:block; color:${x.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${x.subStatus||x.status||n("sem_status")}</span>
                    ${F}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3);">
                        ${n("retomar_caso")}
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center;" title="${n("descartar")}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let N=L.querySelector(".cw-resume-btn");N.onclick=async()=>{await Te(n("retomar_rascunho_confirm"))&&(a(x),_e.delete(x.id),O(),c(),g(!1),S.playSwoosh(),J(n("rascunho_carregado")))};let R=L.querySelector(".cw-del-btn");R.onclick=async()=>{await Te(n("excluir_rascunho_confirm"),{danger:!0})&&(_e.delete(x.id),O(),c())},b.appendChild(L)})}return c(),{parkButton:o,historyBtnWrapper:i,drawer:h}}function Ot(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let a=document.createRange();a.selectNodeContents(t);let n=window.getSelection();n.removeAllRanges(),n.addRange(a);try{document.execCommand("copy")}catch{S.playError(),J(se()==="es"?"Error al copiar":"Falha ao copiar",{error:!0})}n.removeAllRanges(),document.body.removeChild(t)}function Wt(e){["input","change","keydown","keyup"].forEach(a=>{let n=new Event(a,{bubbles:!0,cancelable:!0});e.dispatchEvent(n)})}function Fo(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function Yt(){let e=Fo(),t=e.length,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(r=>r.innerText.trim()==="description");if(n){let r=n.closest("material-fab")||n.closest("material-button");r?(r.style&&(r.style.display="block",r.style.visibility="visible"),Me(r)):Me(n)}else{let r=document.querySelector("material-fab-speed-dial");if(r){let l=r.querySelector(".trigger");l?(l.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),Me(l)):r.click(),await ce(800);let h=Array.from(document.querySelectorAll("i.material-icons-extended")).find(p=>p.innerText.trim()==="description");h&&Me(h)}}let o=null,i=0;for(;!o&&i<20;){await ce(300);let r=Fo();if(r.length>t)o=r.find(l=>!e.includes(l)),o||(o=r[r.length-1]);else if(i>10){let l=r.filter(c=>c.offsetParent!==null);l.length>0&&(o=l[l.length-1])}i++}return o}var No={pt:{back:"Voltar",generateNote:"Gerar Nota",describeIssuePlaceholder:"Descreva o erro, passos para reproduzir...",whatTestedPlaceholder:"O que voc\xEA j\xE1 testou?",fieldsFilledToast:e=>`${e} campos preenchidos!`,noNewDataToast:"Nenhum dado novo encontrado.",readPageErrorToast:"Erro ao ler p\xE1gina.",fillRequiredToast:"Preencha os campos obrigat\xF3rios.",noteGeneratedToast:"Nota gerada e inserida!",copiedOpenNoteToast:"Copiado! Abra uma nota para colar."},es:{back:"Volver",generateNote:"Generar Nota",describeIssuePlaceholder:"Describe el error, pasos para reproducirlo...",whatTestedPlaceholder:"\xBFQu\xE9 ya probaste?",fieldsFilledToast:e=>`\xA1${e} campos completados!`,noNewDataToast:"No se encontraron datos nuevos.",readPageErrorToast:"Error al leer la p\xE1gina.",fillRequiredToast:"Completa los campos obligatorios.",noteGeneratedToast:"\xA1Nota generada e insertada!",copiedOpenNoteToast:"\xA1Copiado! Abre una nota para pegar."}};function tt(e){let t=se();return No[t]?.[e]??No.pt[e]}function Oo(e){let t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let a=document.createElement("div");a.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let n=document.createElement("div");n.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",t.appendChild(n),t.appendChild(a),a.addEventListener("scroll",()=>{n.style.boxShadow=a.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let o={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},i={};function r({id:F,label:N,type:R="text",placeholder:T="",required:q=!1,autocomplete:B="",parent:P=a}){let U=document.createElement("div");U.style.cssText=o.inputWrapper;let V=document.createElement("label");V.setAttribute("for",F),V.style.cssText=o.label,V.innerHTML=`${N} ${q?'<span style="color:#D93025">*</span>':""}`;let _;return R==="textarea"?(_=document.createElement("textarea"),_.style.cssText=o.input+o.textarea):(_=document.createElement("input"),_.type=R,_.style.cssText=o.input),_.id=F,_.placeholder=T,B&&_.setAttribute("autocomplete",B),_.addEventListener("focus",()=>{_.style.borderColor="#1a73e8",_.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),_.addEventListener("blur",()=>{_.style.borderColor="#DADCE0",_.style.boxShadow="none",q&&_.value.trim()!==""&&(_.style.backgroundColor="#FFF")}),i[F]={input:_,wrapper:U,required:q},U.appendChild(V),U.appendChild(_),R!=="textarea"&&Rt(_),P.appendChild(U),U}function l({id:F,label:N,options:R=["Yes","No"],defaultValue:T="No",onChange:q=null}){let B=document.createElement("div");B.style.cssText=o.inputWrapper;let P=document.createElement("label");P.style.cssText=o.label,P.textContent=N,B.appendChild(P);let U=document.createElement("div");U.style.cssText=o.radioGroup;let V=document.createElement("input");return V.type="hidden",V.id=F,V.value=T,B.appendChild(V),R.forEach(_=>{let Z=document.createElement("div");Z.textContent=_,Z.style.cssText=o.radioLabel,_===T&&(Z.style.cssText+=o.radioActive),Z.onclick=()=>{Array.from(U.children).forEach(re=>re.style.cssText=o.radioLabel),Z.style.cssText+=o.radioActive,V.value=_,q&&q(_)},U.appendChild(Z)}),i[F]={input:V,wrapper:B,required:!1},B.appendChild(U),a.appendChild(B),B}let c=document.createElement("div");c.style.cssText=o.banner,c.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,a.appendChild(c);let h=document.createElement("div");h.style.marginBottom="24px";let p=document.createElement("button");p.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",p.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",p.onmouseover=()=>p.style.background="#E1EFFF",p.onmouseout=()=>p.style.background="#F0F7FF",h.appendChild(p),a.appendChild(h);let f=document.createElement("div");f.style.cssText=o.section,f.innerHTML=`<div style="${o.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,a.appendChild(f),r({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:f}),r({id:"ga4",label:"GA4 Property ID",parent:f}),r({id:"gtm",label:"GTM Container ID",parent:f});let b=document.createElement("div");b.style.cssText=o.hiddenField,f.appendChild(b),l({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:F=>{F==="Yes"?b.style.cssText=o.visibleField+"margin-bottom:14px;":(b.style.cssText=o.hiddenField,i.accessEmail.input.value="")}}),r({id:"accessEmail",label:"User Access Email",parent:b}),l({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let g=document.createElement("div");g.style.cssText=o.section,g.innerHTML=`<div style="${o.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,a.appendChild(g),r({id:"name",label:"Advertiser Name",required:!0,autocomplete:"name",parent:g}),r({id:"url",label:"Website URL",type:"url",autocomplete:"url",parent:g}),r({id:"phone",label:"Phone Number",type:"tel",autocomplete:"tel",parent:g}),r({id:"email",label:"Contact Email",type:"email",autocomplete:"email",parent:g}),r({id:"callback",label:"Preferred Callback Time (Timezone)",parent:g}),r({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:tt("describeIssuePlaceholder"),required:!0,parent:g}),r({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:tt("whatTestedPlaceholder"),parent:g}),r({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:g});let O=document.createElement("div");O.style.cssText=o.section,O.innerHTML=`<div style="${o.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,a.appendChild(O),r({id:"cc_adv",label:"Advertiser Contact",parent:O}),r({id:"cc_am",label:"Account Manager",parent:O});let C=document.createElement("div");C.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let x=document.createElement("button");x.innerHTML=tt("back"),x.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",x.onclick=e;let L=document.createElement("button");L.textContent=tt("generateNote"),L.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",C.appendChild(x),C.appendChild(L),t.appendChild(C),p.onclick=async()=>{let F=p.innerHTML;p.innerHTML="\u23F3 Buscando dados...";try{let N=await Ge(),R=0,T=(P,U)=>{let V=i[P];U&&V&&V.input.value===""&&(V.input.value=U,V.input.style.backgroundColor="#E6F4EA",V.input.style.borderColor="#34A853",setTimeout(()=>{V.input.style.backgroundColor="#FFF",V.input.style.borderColor="#DADCE0"},1e3),R++)};T("name",N.advertiserName),T("url",N.websiteUrl),N.clientEmail&&(T("email",N.clientEmail),T("cc_adv",N.clientEmail));let B=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);B&&T("cid",B[0]),R>0?J(tt("fieldsFilledToast")(R)):J(tt("noNewDataToast"))}catch(N){console.error(N),J(tt("readPageErrorToast"))}finally{p.innerHTML=F}};let j=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,I=()=>{let F=!0,N=null,R=j();return Object.values(i).forEach(T=>{T.required&&!T.input.value.trim()&&(F=!1,T.input.style.cssText+=o.inputError,R||T.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),N||(N=T.input))}),N&&N.scrollIntoView({behavior:R?"auto":"smooth",block:"center"}),F};return L.onclick=async()=>{if(!I()){S.playError(),J(tt("fillRequiredToast"),{error:!0});return}let F=P=>i[P].input.value||"N/A",N=F("hasAccess"),R=N==="Yes"?F("accessEmail"):"N/A",q=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${F("cid")}
<b>GA4 ID:</b> ${F("ga4")}
<b>GTM ID:</b> ${F("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${N==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${R}
<b>Ghosting Access Available (Y/N):</b> ${F("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${F("name")}
<b>Website:</b> ${F("url")}
<b>Phone Number:</b> ${F("phone")}
<b>Preferred Callback:</b> ${F("callback")}
<b>Email Address:</b> ${F("email")}

<b>Detailed Issue Description:</b>
${F("desc")}

<b>Uncropped screenshots:</b>
${F("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${F("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${F("cc_adv")}
<b>Account Manager:</b> ${F("cc_am")}
`.replace(/\n/g,"<br>");Ot(q);let B=await Yt();B?(B.innerText.trim()===""&&(B.innerHTML=""),document.execCommand("insertHTML",!1,q),Wt(B),S.playSuccess(),J(tt("noteGeneratedToast"))):J(tt("copiedOpenNoteToast"))},t}var Mo={pt:{emailButtonNotFound:"Erro: Bot\xE3o de email n\xE3o encontrado.",clearingOldDraft:"Limpando rascunho antigo...",editorNotLoaded:"Erro: Editor n\xE3o carregou.",cannedResponseApplied:"Canned Response aplicada!",cannedResponseTimeout:e=>`Timeout: Template '${e}' n\xE3o carregou.`,cannedResponseButtonNotFound:"Bot\xE3o Canned Response n\xE3o encontrado.",emailFilledSuccess:"Email preenchido com sucesso!",editorFocusError:"Erro ao focar no editor.",fallbackClient:"Cliente",fallbackSite:"seu site"},es:{emailButtonNotFound:"Error: Bot\xF3n de email no encontrado.",clearingOldDraft:"Limpiando borrador antiguo...",editorNotLoaded:"Error: El editor no carg\xF3.",cannedResponseApplied:"\xA1Canned Response aplicada!",cannedResponseTimeout:e=>`Tiempo agotado: la plantilla '${e}' no carg\xF3.`,cannedResponseButtonNotFound:"Bot\xF3n Canned Response no encontrado.",emailFilledSuccess:"\xA1Email completado con \xE9xito!",editorFocusError:"Error al enfocar el editor.",fallbackClient:"Cliente",fallbackSite:"su sitio"}};function Ve(e){let t=se();return Mo[t]?.[e]??Mo.pt[e]}function $e(e,t="info"){let a={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${e}`,a[t]||a.info)}function Xt(e,t){if(!e)return;let a=`cw-warning-${e.id||Math.random().toString(36).substr(2,9)}`,n=document.getElementById(a);n&&n.remove();let o=e.getBoundingClientRect(),i=document.createElement("div");i.id=a,i.style.cssText=`
        position: fixed;
        top: ${o.bottom+8}px;
        left: ${o.left}px;
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
        z-index: 999999;
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
    `;let r=i.querySelector(".cw-close-btn");r.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&r.click()},25e3)}async function Kt(e,t){if(!e||!t)return;e.focus(),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await ce(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),await ce(100),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function xa(){let t=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(a=>{let n=a.offsetParent!==null,o=a.closest("case-message-view")!==null,i=a.closest(".editor")!==null||a.closest("write-card")!==null;return n&&!o&&i});return t&&$e("Editor visualmente detectado.","success"),t}async function Do(){$e("\u{1F680} FASE 1: Tentando abrir a janela de email...");let e=!1,a=Array.from(document.querySelectorAll("i.material-icons-extended")).find(f=>f.innerText.trim()==="email");if(a&&a.offsetParent!==null){$e("Bot\xE3o de email direto encontrado.");let f=a.closest("material-button")||a.closest("material-fab")||a;Me(f),e=!0}else{$e("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let f=document.querySelector("material-fab-speed-dial");if(f){let b=f.querySelector(".trigger");if(b){Me(b),await ce(800);let O=Array.from(document.querySelectorAll("i.material-icons-extended")).find(C=>C.innerText.trim()==="email");O&&(Me(O),e=!0)}}}if(!e)return S.playError(),J(Ve("emailButtonNotFound"),{error:!0}),!1;$e("\u{1F680} FASE 2: Verificando rascunhos...");let n=null,o=0,i=20;for(;o<i;){await ce(250);let f=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(n=Array.from(f).find(b=>b.offsetParent!==null),n){$e("\u26A0\uFE0F Rascunho detectado!","warn");break}o++}if(n){$e("\u{1F5D1}\uFE0F Descartando..."),Me(n),n.click();let f=null,b=0;for(;b<15;){await ce(300);let g=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(f=Array.from(g).find(O=>O.offsetParent!==null),f)break;b++}f&&(Me(f),J(Ve("clearingOldDraft"),{duration:2e3}),await ce(2500))}$e("\u{1F680} FASE 3: Buscando editor final...");let r=0,l=null;for(;r<20&&(l=xa(),!l);)await ce(250),r++;if(!l)return S.playError(),J(Ve("editorNotLoaded"),{error:!0}),!1;let c=l.closest('[id="email-body-content-top"]'),p=(l.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(c){if(p){let b=p.closest('[aria-hidden="true"]');b&&b.removeAttribute("aria-hidden"),p.focus(),Me(p)}await ce(300),c.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let f=c.querySelector("#cases-body-field");if(f){let b=document.createRange();b.selectNodeContents(f),b.collapse(!0);let g=window.getSelection();g.removeAllRanges(),g.addRange(b)}return!0}return!1}async function Jt(e){if(!e||!await Do())return;let a=await Ge();$e("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await ce(600)),a.clientEmail&&a.clientEmail!=="N/A"&&a.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await Kt(i,a.clientEmail),Xt(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(a.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await Kt(i,a.internalEmail),Xt(i,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await ce(500);let o=document.querySelector('material-button[debug-id="canned_response_button"]');if(o){Me(o),await ce(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){Me(i),document.execCommand("insertText",!1,e),i.dispatchEvent(new Event("input",{bubbles:!0})),$e("\u23F3 Buscando resultado da Canned Response...","info");let r=null,l=0,c=15e3,h=500;for(;l<c&&(r=document.querySelector("material-select-dropdown-item"),!r);)await ce(h),l+=h;if(r){Me(r),await ce(1500);let p=xa();if(p){let b=Array.from(p.querySelectorAll("span.field")).filter(O=>O.innerText.includes("{Requested Task Type}"));if(b.length>0){let O=b.map(x=>x.closest("tr")).filter(x=>x!==null),C=[...new Set(O)];if(C.length>0){let L=C[0].querySelector('td[width="100%"]');L&&(L.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let j=1;j<C.length;j++)C[j].remove()}}let g=p.innerHTML;a.advertiserName&&g.includes("{%ADVERTISER_NAME%}")&&(g=g.replace(/{%ADVERTISER_NAME%}/g,a.advertiserName)),g.includes("{%^79285%}")&&(g=g.replace(/{%\^79285%}/g,a.websiteUrl||Ve("fallbackSite"))),p.innerHTML=g}J(Ve("cannedResponseApplied"))}else $e(`\u274C Timeout: Resultado '${e}' n\xE3o apareceu ap\xF3s 15s.`,"error"),S.playError(),J(Ve("cannedResponseTimeout")(e),{error:!0})}}else S.playError(),J(Ve("cannedResponseButtonNotFound"),{error:!0})}async function _o(e){if($e(`\u{1F680} Iniciando Quick Email: ${e.name}`),!await Do())return;let a=await Ge(),n=Tt();await ce(600);let o=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(o&&(o.click(),await ce(600)),a.clientEmail&&a.clientEmail!=="N/A"&&a.clientEmail!=="N/A (Bloqueado)"){let l=document.querySelector('input[aria-label="Enter To email address"]');l&&(await Kt(l,a.clientEmail),Xt(l,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(a.internalEmail){let l=document.querySelector('input[aria-label="Enter Bcc email address"]');l&&(await Kt(l,a.internalEmail),Xt(l,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let i=document.querySelector('input[aria-label="Subject"]');i&&e.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,e.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await ce(300));let r=xa();if(r){let c=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');c&&(c.focus(),Me(c));let h=new Date;h.setDate(h.getDate()+3);let p=h.getDay();p===6?h.setDate(h.getDate()+2):p===0&&h.setDate(h.getDate()+1);let f=h.toLocaleDateString("pt-BR"),b=e.body;b=b.replace(/\[Nome do Cliente\]/g,a.advertiserName||Ve("fallbackClient")),b=b.replace(/\[INSERIR URL\]/g,a.websiteUrl||Ve("fallbackSite")),b=b.replace(/\[URL\]/g,a.websiteUrl||Ve("fallbackSite")),b=b.replace(/\[Seu Nome\]/g,n),b=b.replace(/\[MM\/DD\/YYYY\]/g,f),document.execCommand("insertHTML",!1,b),c&&(c.dispatchEvent(new Event("input",{bubbles:!0})),c.dispatchEvent(new Event("change",{bubbles:!0}))),J(Ve("emailFilledSuccess"),{duration:2e3}),$e("\u2705 Processo finalizado com sucesso.","success")}else S.playError(),J(Ve("editorFocusError"),{error:!0})}if(!document.getElementById("cw-module-styles")){let e=document.createElement("style");e.id="cw-module-styles",e.innerHTML=`
        /* M\xD3DULO BASE */
        .cw-module-window {
            /* Anima\xE7\xE3o Apple Spring (Ida e Volta) */
            transition: 
                opacity 0.3s ease,
                transform 0.45s var(--cw-ease-decelerate),
                filter 0.3s ease,
                box-shadow 0.3s ease;
            
            opacity: 0; 
            pointer-events: none;
            transform: scale(0.05); /* Come\xE7a dentro do bot\xE3o */
            
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
            transform: scale(1); 
            pointer-events: auto;
            filter: brightness(1);
            /* Sombra alta */
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
        }

        /* ESTADO IDLE (Segundo Plano) */
        .cw-module-window.idle {
            /* FIX DO DESLOCAMENTO: */
            /* Scale muito sutil (0.99) para n\xE3o "puxar" para o lado */
            transform: scale(0.99); 
            
            /* O efeito vem daqui: */
            opacity: 0.9;
            filter: brightness(0.96) saturate(0.5);
            border-color: rgba(0, 0, 0, 0.2);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1); /* Sombra cai (encostou na mesa) */
            
            cursor: pointer; /* Indica clic\xE1vel */
        }
    `,document.head.appendChild(e)}window._cwEscapeListenerActive||(window._cwEscapeListenerActive=!0,document.addEventListener("keydown",e=>{if(e.key!=="Escape"||document.querySelector(".cw-dialog-overlay"))return;let t=document.querySelector(".cw-module-window.open");if(!t)return;let a=t.querySelector(".cw-header-close");a&&a.click()}));function Le(e,t,a){let n=document.getElementById(a);if(!t)return;let o=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,i=t.getAttribute("data-moved")==="true",r={x:0,y:0};if(n){let f=n.getBoundingClientRect();r.x=f.left+f.width/2,r.y=f.top+f.height/2}let l,c;if(!i)l=window.innerWidth/2,c=window.innerHeight/2;else{let f=t.getBoundingClientRect();l=f.left+f.width/2,c=f.top+f.height/2,l===0&&c===0&&(l=window.innerWidth/2,c=window.innerHeight/2)}let h=r.x-l,p=r.y-c;e?(S.playGenieOpen(),t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",t.style.willChange="transform, opacity",setTimeout(()=>{t.style.willChange="auto"},550),i?t.style.transform=`translate(${h}px, ${p}px) scale(0.05)`:t.style.transform=`translate(calc(-50% + ${h}px), calc(-50% + ${p}px)) scale(0.05)`,t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("open"),n&&n.classList.add("active"),t.style.transition=o?"opacity 0.15s ease":"opacity 0.4s ease-out, transform 0.5s var(--cw-ease-decelerate)",t.style.opacity="1",i?t.style.transform="translate(0, 0) scale(1)":t.style.transform="translate(-50%, -50%) scale(1)"}),typeof Ro=="function"&&Ro(t,a)):(S.playSwoosh(),t.style.transition=o?"opacity 0.15s ease":"opacity 0.25s ease, transform 0.3s var(--cw-ease-accelerate)",t.style.pointerEvents="none",t.style.willChange="transform, opacity",requestAnimationFrame(()=>{t.style.opacity="0",i?t.style.transform=`translate(${h}px, ${p}px) scale(0.1)`:t.style.transform=`translate(calc(-50% + ${h}px), calc(-50% + ${p}px)) scale(0.1)`}),setTimeout(()=>{t.classList.remove("open"),n&&n.classList.remove("active"),t.style.transition="",t.style.transform="",t.style.willChange="auto"},300),typeof ya=="function"&&ya(t))}function Ro(e,t){ya(e);let a=n=>{if(!e.classList.contains("open"))return;let o=e.contains(n.target),i=document.querySelector(".cw-pill"),r=i&&i.contains(n.target);o?(e.classList.remove("idle"),e.style.zIndex="2147483648"):r||(e.classList.add("idle"),e.style.zIndex="2147483646")};e._idleHandler=a,document.addEventListener("mousedown",a)}function ya(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}function zo(){let e="v4.0.0",{popup:t,content:a,header:n,animRefs:o,credit:i}=co(e,P),r=So(m),l=wo(()=>{W(),X.setActiveTasks(l.getCheckedElements())},m,X),c=document.createElement("div");c.style.display="none";let h=vo((d,w)=>{ee(d,w)});c.appendChild(h);let p=document.createElement("div");p.id="evidence-container",Object.assign(p.style,{display:"none",marginTop:"16px",padding:"16px",background:H.bgInput,border:`1px solid ${H.border}`,borderRadius:Ae.medium,boxShadow:ot.subtle});let f=document.createElement("div");f.className="cw-section-title",f.textContent=m("evidencias_contato"),p.appendChild(f);let b={},g=(d,w)=>{let k=document.createElement("div");k.style.marginBottom="12px";let z=document.createElement("label");z.textContent=w,z.setAttribute("for",d),z.style.cssText=`display: block; font-size: 11px; font-weight: 700; color: ${H.textSub}; margin-bottom: 6px; text-transform: uppercase;`;let D=document.createElement("input");return D.type="text",D.id=d,D.className="cw-input",D.placeholder="https://screenshot.googleplex.com/...",D.style.marginBottom="0",k.appendChild(z),k.appendChild(D),Rt(D,{minLength:8}),b[d]=D,k};p.appendChild(g("evidence-l1",m("ligacao_1"))),p.appendChild(g("evidence-l2",m("ligacao_2"))),p.appendChild(g("evidence-msg",m("mensagem_am")));let O=qo({onSaveCurrent:async()=>{let d=await v();return ae(),d},onLoadDraft:d=>{s(d)},t:d=>m(d)}),C=V(),x=_(),L=document.createElement("div"),j=y(),I=G(O,m);a.appendChild(C),a.appendChild(x),a.appendChild(j),a.appendChild(c),a.appendChild(L),a.appendChild(p),l.selectionElement.style.display="none",l.screenshotsElement.style.display="none";let F=document.createElement("button");F.id="manual-task-toggle",F.textContent=m("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",F.style.cssText=`display: none; width: 100%; padding: 14px; border: 2px dashed ${H.primary}; background: ${H.surface}; color: ${H.primary}; border-radius: ${Ae.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${me}; text-transform: uppercase; letter-spacing: 0.5px;`,F.onmouseenter=()=>{F.style.background=H.primaryBg},F.onmouseleave=()=>{F.style.background=H.surface},F.onclick=()=>{l.selectionElement.style.display="block",l.screenshotsElement.style.display="block",F.style.display="none"},a.appendChild(F),a.appendChild(l.selectionElement),a.appendChild(r.element),a.appendChild(l.screenshotsElement),a.appendChild(I);let N=document.createElement("div");N.style.display="none",N.style.flexGrow="1",N.style.minHeight="0",N.style.overflow="hidden";let R=Oo(()=>U());R.style.height="100%",N.appendChild(R),t.insertBefore(N,i);let T=n.lastElementChild;T&&(T.insertBefore(O.historyBtnWrapper,T.firstChild),T.insertBefore(E(),T.firstChild)),t.appendChild(O.drawer);let q=null;X.subscribe(d=>{A(d),B(),d.isDirty?(q&&clearTimeout(q),q=setTimeout(async()=>{let w=await v(!0);w.subStatus?_e.saveEmergency(w):_e.clearEmergency(),d.isDirty=!1},2e3)):q&&(clearTimeout(q),q=null)});function B(){let d=_e.getCount()>0,w=!!X.currentSubStatus;Vt(d||w)}function P(){X.visible=!X.visible,X.visible?Se():Ee(),Le(X.visible,t,"cw-btn-notes")}function U(){X.isSplitView=!X.isSplitView,X.isSplitView?(a.style.display="none",N.style.display="flex",N.style.flexDirection="column",o.googleLine&&(o.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(a.style.display="flex",N.style.display="none",o.googleLine&&(o.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function V(){let d=document.createElement("div");if(d.innerHTML=`
            <div style="display: flex; gap: 12px; margin-bottom: 8px;">
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-fluxo" style="font-size: 10px; margin-bottom: 6px;">${m("fluxo")}</div>
                    <div class="cw-segmented-control" id="type-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-type="bau" class="active" style="z-index:2">BAU</button>
                        <button data-type="lm" style="z-index:2">LM</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-portugal" style="font-size: 10px; margin-bottom: 6px;">${m("caso_portugal")}</div>
                    <div class="cw-segmented-control" id="portugal-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-val="false" class="active" style="z-index:2">${m("nao")}</button>
                        <button data-val="true" style="z-index:2">${m("sim")}</button>
                    </div>
                </div>
            </div>
        `,!document.getElementById("cw-segmented-styles")){let k=document.createElement("style");k.id="cw-segmented-styles",k.innerHTML=`
                .cw-segmented-control {
                    display: flex;
                    background: ${H.bgInput};
                    padding: 3px;
                    border-radius: 100px;
                    gap: 2px;
                    border: 1px solid ${H.border};
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
                    transition: all 0.3s ${me};
                    color: ${H.textSub};
                    position: relative;
                }
                .cw-segmented-control button.active {
                    color: #fff;
                }
                .cw-segmented-control button:hover:not(.active) {
                    background: rgba(0,0,0,0.03);
                    color: ${H.text};
                }
                .cw-segmented-indicator {
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    bottom: 3px;
                    width: calc(50% - 4px);
                    background: ${H.primary};
                    border-radius: 100px;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 1;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
                }
            `,document.head.appendChild(k)}let w=(k,z)=>{let Y=d.querySelector(`#${k}`).querySelector(".cw-segmented-indicator");Y&&(Y.style.transform=`translateX(${z*100}%) translateX(${z*2}px)`)};return d.querySelectorAll("#type-selector button").forEach((k,z)=>{k.onclick=()=>{X.setCaseType(k.dataset.type),d.querySelectorAll("#type-selector button").forEach(D=>D.classList.remove("active")),k.classList.add("active"),w("type-selector",z),S.playClick(),X.currentSubStatus&&re(X.currentSubStatus)}}),d.querySelectorAll("#portugal-selector button").forEach((k,z)=>{k.onclick=()=>{X.setPortugalCase(k.dataset.val==="true"),d.querySelectorAll("#portugal-selector button").forEach(D=>D.classList.remove("active")),k.classList.add("active"),w("portugal-selector",z),S.playClick(),X.currentSubStatus&&re(X.currentSubStatus)}}),d}function _(){let d=document.createElement("div");d.className="cw-status-section",d.style.cssText="display: flex; flex-direction: column; gap: 8px;",d.innerHTML=`
            <label class="cw-section-title js-label-status" for="main-status-select" style="margin-top: 8px;">${m("status_principal")}</label>
            <select id="main-status-select" class="cw-select">
                <option value="" disabled selected>${m("select_status")}</option>
                <option value="NI">NI - Need Info</option>
                <option value="SO">SO - Solution Offered</option>
                <option value="IN">IN - Inactive</option>
                <option value="AS">AS - Assigned</option>
                <option value="DC">DC - Discard</option>
            </select>
            <label class="cw-section-title js-label-substatus" for="sub-status-select" style="margin-top: 8px;">${m("substatus")}</label>
            <select id="sub-status-select" class="cw-select" disabled>
                <option value="">${m("select_substatus")}</option>
            </select>
        `;let w=d.querySelector("#main-status-select"),k=d.querySelector("#sub-status-select");return w.onchange=()=>{X.setStatus(w.value),ie(w.value,k),X.setSubStatus(""),re("")},k.onchange=()=>{X.setSubStatus(k.value),re(k.value)},d}function Z(){return p.style.display==="none"?null:{l1:b["evidence-l1"]?.value.trim()||"",l2:b["evidence-l2"]?.value.trim()||"",msg:b["evidence-msg"]?.value.trim()||""}}function ie(d,w){if(w.innerHTML=`<option value="">${m("select_substatus")}</option>`,!d){w.disabled=!0;return}let k=d==="IN"?(()=>{let z=document.createElement("optgroup");return z.label="Fora de Escopo",z})():null;for(let z in Ke)if(Ke[z].status===d){let D=document.createElement("option");D.value=z,D.textContent=Ke[z].name,k&&z.startsWith("IN_Out_of_Scope")?k.appendChild(D):w.appendChild(D)}k&&k.children.length>0&&w.appendChild(k),w.disabled=!1}function re(d){let w=Ke[d],k=d==="NI_Attempted_Contact"||w&&w.name&&w.name.toLowerCase().includes("attempted contact");if(h.render&&h.render(d,X.currentCaseType),!d){p.style.display="none",b["evidence-l1"]&&(b["evidence-l1"].value=""),b["evidence-l2"]&&(b["evidence-l2"].value=""),b["evidence-msg"]&&(b["evidence-msg"].value=""),c.style.display="none",L.style.display="none";let ge=document.getElementById("manual-task-toggle");ge&&(ge.style.display="none"),l.selectionElement.style.display="none",l.screenshotsElement.style.display="none",j.style.display="flex",j.style.opacity="1",I.style.display="none";return}if(k?p.style.display="block":(p.style.display="none",b["evidence-l1"]&&(b["evidence-l1"].value=""),b["evidence-l2"]&&(b["evidence-l2"].value=""),b["evidence-msg"]&&(b["evidence-msg"].value="")),j.style.opacity="0",setTimeout(()=>{X.currentSubStatus&&(j.style.display="none")},400),I.style.display="grid",w&&w.templateFields){let ge=mo(w);X.setActiveFields(w.templateFields.filter(we=>!ge.includes(we)))}oe(),jt(d,L,X),L.style.display="block",c.style.display="block";let z=d.startsWith("SO_"),D=d==="NI_Awaiting_Validation",Y=document.getElementById("manual-task-toggle");z||D?(l.selectionElement.style.display="block",Y.style.display="none"):(l.selectionElement.style.display="none",l.screenshotsElement.style.display="none",Y.style.display="block");let K=d==="SO_Education_Only"?"education":"implementation";X.setScreenshotMode(K),l.updateSubStatus(d),W();let pe=document.getElementById("email-automation-toggle-row");pe&&(pe.style.display=yt[d]?"flex":"none")}function W(){let d=l.getCheckedElements().map(w=>w.value);r.updateVisibility(X.currentSubStatus,d)}function ee(d,w){let k=Bt(mt[d],X.currentLang,d);if(k){for(let z in k)if(z==="linkedTask")l.toggleTask(k.linkedTask,w);else if(z==="activeTasks")k.activeTasks.forEach(D=>{w?l.setTaskCount(D.value,D.count):l.setTaskCount(D.value,0)});else if(z.startsWith("field-")){let D=z,Y=k[z],K=document.getElementById(D);if(K){let pe=vt.includes(D.replace("field-",""));if(w)if(pe){let ge=K.value.trim();ge.includes(Y.trim())||(K.value=ge?ge+`
`+Y.trim():Y.trim())}else K.value=Y;else if(pe){let ge=K.value.trim(),we=Y.trim();ge.includes(we)&&(K.value=ge.replace(we,"").trim().replace(/\n{3,}/g,`

`))}else K.value.trim()===Y.trim()&&(K.value="");X.updateField(D,K.value),K.dispatchEvent(new Event("input"))}}}}function G(d,w){let k=document.createElement("div");if(k.className="cw-actions-section",k.style.cssText=`
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 10px;
            margin-top: 16px;
            background: ${H.bgInput};
            border-radius: 12px;
            border: 1px solid ${H.border};
        `,!document.getElementById("cw-actions-hover-styles")){let ge=document.createElement("style");ge.id="cw-actions-hover-styles",ge.innerHTML=`
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
                    border-color: ${H.primary} !important;
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
                    color: ${H.primary} !important;
                    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.05) !important;
                    transform: translateY(-1px);
                }
            `,document.head.appendChild(ge)}let z=document.createElement("div");z.id="email-automation-toggle-row",z.style.cssText="grid-column: 1 / -1; display: none; align-items: center; justify-content: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2px;",z.innerHTML=`
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 10.5px; font-weight: 600; color: ${H.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 13px; height: 13px; accent-color: ${H.primary};">
                <span class="js-label-email-toggle">${w("preencher_email_automaticamente")}</span>
            </label>
        `;let D=d.parkButton;D.classList.add("js-btn-park"),D.style.cssText="width: 100%; margin: 0; border-radius: 10px; height: 34px; font-weight: 600; font-size: 11.5px;";let Y=document.createElement("button");Y.className="cw-btn-secondary js-btn-reset",Y.textContent=w("limpar"),Y.style.cssText=`width: 100%; height: 34px; background: ${H.surface}; color: ${H.textSub}; border: 1px solid ${H.border}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,Y.onclick=()=>ae();let K=document.createElement("button");K.className="cw-btn-secondary js-btn-copy",K.textContent=w("copiar"),K.style.cssText=`width: 100%; height: 34px; background: ${H.surface}; color: ${H.primary}; border: 1px solid ${H.primary}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,K.onclick=()=>te();let pe=document.createElement("button");return pe.className="cw-btn-primary js-btn-generate",pe.textContent=w("preencher"),pe.style.cssText=`width: 100%; height: 38px; background: ${H.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; grid-column: 1 / -1; font-size: 12.5px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 0px;`,pe.onclick=()=>Q(),k.appendChild(z),k.appendChild(D),k.appendChild(Y),k.appendChild(K),k.appendChild(pe),k}async function te(){if(!X.currentSubStatus){S.playError(),J(m("select_substatus"),{error:!0});return}let d=ua(X,l,r,Z());d?(Ot(d),J(m("copiado_sucesso")),S.playClick()):(S.playError(),J(m("select_substatus"),{error:!0}))}async function Q(){if(!X.currentSubStatus){S.playError(),J(m("select_substatus"),{error:!0});return}let d=Ke[X.currentSubStatus],w=Ft(d).filter(Y=>{if(!X.activeFields.includes(Y))return!1;let K=X.formData[`field-${Y}`];return!K||!K.trim()});if(w.length>0){S.playError(),J(`Preencha o campo obrigat\xF3rio antes de gerar: ${m(w[0].toLowerCase())}`,{error:!0});return}if(d?.requiresTasks&&l.getCheckedElements().length===0){S.playError(),J("Selecione ao menos uma tarefa antes de gerar a nota.",{error:!0});return}let k=ua(X,l,r,Z());Ot(k),P();let z=Nt(),D=await Yt();if(D){D.focus(),document.execCommand("insertHTML",!1,k),Wt(D);let Y=document.getElementById("email-automation-checkbox");(!Y||Y.checked)&&X.currentSubStatus&&yt[X.currentSubStatus]&&await Jt(yt[X.currentSubStatus]),J(m("inserido_copiado")),S.playSuccess(),Io(),ae()}else S.playError(),J("N\xE3o foi poss\xEDvel abrir a nota no CRM. O conte\xFAdo j\xE1 est\xE1 copiado \u2014 cole manualmente.",{error:!0}),P();z()}function oe(){if(X.currentSubStatus){if(X.currentCaseType==="lm")X.removeField("ON_CALL");else{let d=Ke[X.currentSubStatus];d&&d.templateFields.includes("ON_CALL")&&X.addFieldAt("ON_CALL",1)}X.isPortugalCase?(X.addFieldAt("CASO_PORTUGAL",1),X.addFieldAt("CONSENTIU_GRAVACAO",2)):(X.removeField("CASO_PORTUGAL"),X.removeField("CONSENTIU_GRAVACAO"))}}function ae(){X.reset(),l.reset(),r.reset(),B(),_e.clearEmergency(),a.querySelectorAll("select").forEach(w=>w.value=""),a.querySelector("#sub-status-select").disabled=!0;let d=document.getElementById("email-automation-toggle-row");d&&(d.style.display="none"),L.innerHTML="",c.style.display="none",j.style.display="flex",j.style.opacity="1",I.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),l.selectionElement.style.display="none",l.screenshotsElement.style.display="none",p.style.display="none",b["evidence-l1"]&&(b["evidence-l1"].value=""),b["evidence-l2"]&&(b["evidence-l2"].value=""),b["evidence-msg"]&&(b["evidence-msg"].value="")}async function v(d=!1){let w={};L.querySelectorAll("input, textarea, select").forEach(K=>{(K.id.startsWith("field-")||K.id==="consent-select")&&(w[K.id]=K.value)});let k="Cliente",z="---";if(!d)try{let K=await Ge();k=K.advertiserName,z=K.cid}catch(K){console.warn("Erro ao coletar pageData:",K)}let D=l.getCheckedElements().map(K=>({key:K.value,count:K.count})),Y=D.map(K=>{let pe=Ue[K.key];return pe?pe.name:K.key});return{currentCaseType:X.currentCaseType,currentLang:X.currentLang,isPortugalCase:X.isPortugalCase,consent:X.consent,tagSupportUsed:X.tagSupportUsed,forcedScreenshots:[...X.forcedScreenshots],activeFields:X.activeFields,status:X.currentStatus,subStatus:X.currentSubStatus,formData:w,activeTasks:D,summaryTags:Y,clientName:k,cid:z,timestamp:new Date().toISOString()}}let $=d=>new Promise(w=>setTimeout(w,d));async function s(d){X.setCaseType(d.currentCaseType||"bau"),X.setPortugalCase(d.isPortugalCase||!1),X.setConsent(d.consent||!1),d.activeFields&&X.setActiveFields(d.activeFields);let w=a.querySelector(`#type-selector button[data-type="${X.currentCaseType}"]`);w&&w.classList.add("active"),a.querySelectorAll("#type-selector button").forEach(z=>{z!==w&&z.classList.remove("active")});let k=a.querySelector(`#portugal-selector button[data-val="${X.isPortugalCase}"]`);if(k&&k.classList.add("active"),a.querySelectorAll("#portugal-selector button").forEach(z=>{z!==k&&z.classList.remove("active")}),d.status){let z=a.querySelector("#main-status-select");z.value=d.status,X.setStatus(d.status);let D=a.querySelector("#sub-status-select");if(ie(d.status,D),await $(50),d.subStatus){if(D.value=d.subStatus,X.setSubStatus(d.subStatus),re(d.subStatus),await $(100),d.tagSupportUsed!==void 0){X.setTagSupportUsed(d.tagSupportUsed);let Y=r.element.querySelector('input[value="Sim"]'),K=r.element.querySelector('input[value="N\xE3o"]');d.tagSupportUsed&&Y?Y.checked=!0:K&&(K.checked=!0),r.element.querySelector("div:last-child").style.display=d.tagSupportUsed?"none":"block"}d.forcedScreenshots&&X.setForcedScreenshots(d.forcedScreenshots);for(let Y in d.formData){let K=document.getElementById(Y);K&&(K.value=d.formData[Y],X.updateField(Y,K.value))}d.activeTasks&&(d.activeTasks.forEach(Y=>l.setTaskCount(Y.key,Y.count)),X.setActiveTasks(l.getCheckedElements()))}}X.isDirty=!1}async function u(d){let w=mt[d],k=w&&w.quickLaunch;if(!k||X.isDirty&&!await Te(m("substituir_rascunho_confirm")))return;let z=X.visible;z||P(),ae(),z||await $(550);let D=a.querySelector("#main-status-select"),Y=a.querySelector("#sub-status-select");D.value=k.status,X.setStatus(k.status),ie(k.status,Y),await $(60),Y.value=k.subStatus,X.setSubStatus(k.subStatus),re(k.subStatus),await $(160);let K=c.querySelector(`[data-id="${d}"]`);K&&K.click(),await $(120),S.playSuccess();let pe=(k.focusIds||[]).find(ge=>{let we=document.getElementById(ge);return we&&!we.value.trim()});pe&&Ga(document.getElementById(pe))}function m(d){return Re[X.currentLang]?.[d]||Re.pt?.[d]||d}function E(){let d=document.createElement("div");return d.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',d.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",d.onclick=w=>{w.stopPropagation(),U()},d.title="Alternar para Split & Transfer",d}function y(){let d=document.createElement("div");return d.id="notes-empty-state",d.style.cssText=`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${me};
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
                <div style="font-family: 'Google Sans', sans-serif; font-size: 16px; font-weight: 600; color: ${H.text}; margin-bottom: 4px;">
                    ${m("pronto_comecar")||"Pronto para come\xE7ar?"}
                </div>
                <div style="font-size: 13px; color: ${H.textSub}; line-height: 1.6; opacity: 0.8;">
                    ${m("selecione_status_ajuda")||"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica."}
                </div>
            </div>
        `,d}function A(d){let w=a.querySelector(".js-label-fluxo");w&&(w.textContent=m("fluxo"));let k=a.querySelector(".js-label-portugal");k&&(k.textContent=m("caso_portugal"));let z=a.querySelectorAll("#portugal-selector button");z.length===2&&(z[0].textContent=m("nao"),z[1].textContent=m("sim"));let D=a.querySelector(".js-label-status");D&&(D.textContent=m("status_principal"));let Y=a.querySelector(".js-label-substatus");Y&&(Y.textContent=m("substatus"));let K=a.querySelector(".js-btn-copy");K&&(K.textContent=m("copiar"));let pe=a.querySelector(".js-btn-generate");pe&&(pe.textContent=m("preencher"));let ge=a.querySelector(".js-btn-reset");ge&&(ge.textContent=m("limpar"));let we=document.getElementById("manual-task-toggle");we&&(we.textContent=m("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let Ye=a.querySelector(".js-btn-park span");Ye&&(Ye.textContent=m("guardar")),f.textContent=m("evidencias_contato");let Qe=p.querySelector('label[for="evidence-l1"]');Qe&&(Qe.textContent=m("ligacao_1"));let Mt=p.querySelector('label[for="evidence-l2"]');Mt&&(Mt.textContent=m("ligacao_2"));let Et=p.querySelector('label[for="evidence-msg"]');Et&&(Et.textContent=m("mensagem_am"));let qa=t.querySelector(".js-drawer-title");qa&&(qa.textContent=m("rascunhos_salvos"));let Fa=t.querySelector(".js-history-btn");Fa&&(Fa.title=m("meus_rascunhos"));let Na=a.querySelector(".js-label-email-toggle");Na&&(Na.textContent=m("preencher_email_automaticamente")),r&&r.setLanguage&&r.setLanguage(m),l&&l.setLanguage&&l.setLanguage(m)}return j.style.display="flex",I.style.display="none",X.setLanguage(se()),X.setCaseType("bau"),ye(d=>{X.setLanguage(d);let w=t.querySelector(".cw-help-description");w&&(w.textContent=qt[d]||qt.pt),X.currentSubStatus&&re(X.currentSubStatus)}),B(),setTimeout(async()=>{let d=_e.getEmergency();d&&(await Te(m("restaurar_rascunho_confirm"))?(s(d),J("Sess\xE3o restaurada!")):_e.clearEmergency())},3e3),document.body.appendChild(t),P.openWithPreset=u,P}var $o=[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",category:"Tentativas & Agendamento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",placeholders:[{key:"[Seu Nome]",label:"Seu Nome",type:"text",auto:"agentName"},{key:"[INSERIR URL]",label:"URL do Site",type:"text"},{key:"[LINK DO MEET]",label:"Link da Reuni\xE3o",type:"text"}],template:"<p>Ol\xE1,</p><br><p>Aqui \xE9 o <strong>[Seu Nome]</strong> da equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tentei ligar no seguinte n\xFAmero: <strong>...</strong> sem sucesso, teria outro n\xFAmero para que eu pudesse entrar em contato?</p><br><p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>Em seu site: <strong>[INSERIR URL]</strong></p><p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, voc\xEA pode acessar o link da nossa reuni\xE3o: <strong>[LINK DO MEET]</strong></p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"reschedule2",name:"Proposta de Reagendamento",category:"Tentativas & Agendamento",subject:"Reagendamento de Consultoria",placeholders:[{key:"[DATA 1]",label:"Data 1",type:"text"},{key:"[HORA 1]",label:"Hora 1",type:"text"},{key:"[DATA 2]",label:"Data 2",type:"text"},{key:"[HORA 2]",label:"Hora 2",type:"text"},{key:"[DATA 3]",label:"Data 3",type:"text"},{key:"[HORA 3]",label:"Hora 3",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p><ul><li><strong>[DATA 1] \xE0s [HORA 1]</strong></li><li><strong>[DATA 2] \xE0s [HORA 2]</strong></li><li><strong>[DATA 3] \xE0s [HORA 3]</strong></li></ul><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email nas pr\xF3ximas 48 horas o caso ser\xE1 encerrado.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"max_reschedules",name:"Limite de Reagendamentos Excedido",category:"Tentativas & Agendamento",subject:"Status do Agendamento - Time de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este e-mail o encontre bem.</p><p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementa\xE7\xE3o das tags.</p><br><p>Infelizmente, <strong>n\xE3o podemos mais reagendar este caso espec\xEDfico</strong>, pois excedemos o limite m\xE1ximo de agendamentos permitido.</p><br><p>Se voc\xEA deseja prosseguir com a implementa\xE7\xE3o das tags, ser\xE1 necess\xE1rio abrir um <strong>novo caso</strong> diretamente com a <a href="https://support.google.com/google-ads">Ajuda do Google Ads</a>. Isso garantir\xE1 que voc\xEA receba o acompanhamento e o suporte necess\xE1rio para dar continuidade \xE0 sua solicita\xE7\xE3o.</p><br><p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colabora\xE7\xE3o.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"2_6_day3",name:"Dia 3 (Acompanhamento)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]",label:"A\xE7\xE3o Pendente",type:"text"},{key:"[MM/DD/YYYY]",label:"Data do Pr\xF3ximo Contato",type:"date"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Tentamos contato atrav\xE9s do N\xFAmero de Telefone, por\xE9m sem sucesso. Gostaria de saber se voc\xEA j\xE1 conseguiu <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, ou se voc\xEA j\xE1 possui uma previs\xE3o de quando essa a\xE7\xE3o ser\xE1 conclu\xEDda.</p><br><p>Continuarei monitorando o status da implementa\xE7\xE3o no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementa\xE7\xE3o.</p><p>Se voc\xEA tiver algum problema ou d\xFAvidas que impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_day6",name:"Dia 6 (Acompanhamento Final)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[URL]",label:"URL do Site",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Ap\xF3s an\xE1lise e revis\xE3o do status de implementa\xE7\xE3o da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda est\xE1 com a implementa\xE7\xE3o pendente. Tentamos contato atrav\xE9s do email, por\xE9m sem sucesso.</p><br><p>\xC9 essencial que seja implementado, pois ele oferece uma ampla gama de benef\xEDcios, como:</p><ul><li>Ajuda a rastrear convers\xF5es em tempo real</li><li>Melhora a gera\xE7\xE3o de receita, em termos de cliques</li><li>Serve para vincular o Google Analytics e os an\xFAncios e acompanhar convers\xF5es</li><li>Fornece informa\xE7\xF5es sobre a experi\xEAncia do usu\xE1rio</li></ul><br><p>Se voc\xEA tiver algum problema ou d\xFAvidas que o impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco. Teremos o maior prazer em ajudar.</p><p>Caso n\xE3o tenhamos nenhuma resposta nos pr\xF3ximos 3 dias, infelizmente o caso ser\xE1 encerrado.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_completed_reschedule",name:"A\xE7\xF5es Conclu\xEDdas (Solicitar Reagendamento)",category:"Follow Up",subject:"Continuidade da Implementa\xE7\xE3o - Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Disponibilidade em BAU]",label:"Pr\xF3xima Disponibilidade",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Maravilha! Muito bom saber que conseguiu concluir as a\xE7\xF5es pendentes. Sendo assim, agora podemos continuar com a implementa\xE7\xE3o das configura\xE7\xF5es em sua conta.</p><br><p>Para isso, pe\xE7o, por favor, que me envie algumas das pr\xF3ximas datas e hor\xE1rios em que est\xE1 dispon\xEDvel a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p><p>Assim que me enviar essa informa\xE7\xE3o, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"nrp_standard",name:"NRP - Padr\xE3o (3\xAA Tentativa)",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Task pedida pelo AM]",label:"Task Solicitada",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reuni\xE3o.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"nrp_dfa",name:"NRP - DFA",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'}],ii={attempt_10min:{name:"Intento de Contacto (Antes de los 10min)",category:"Intentos y Programaci\xF3n",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Intento de Contacto",labels:{"[Seu Nome]":"Tu Nombre","[INSERIR URL]":"URL del Sitio","[LINK DO MEET]":"Enlace de la Reuni\xF3n"},template:"<p>Hola,</p><br><p>Le habla <strong>[Seu Nome]</strong> del equipo de Soluciones T\xE9cnicas de Google. Intent\xE9 llamar al siguiente n\xFAmero: <strong>...</strong> sin \xE9xito, \xBFtendr\xEDa otro n\xFAmero para que pueda ponerme en contacto?</p><br><p>Le recuerdo que voy a ayudarle a implementar la siguiente tarea:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>En su sitio: <strong>[INSERIR URL]</strong></p><p>Intentar\xE9 llamar nuevamente en 10 minutos; si lo prefiere, puede acceder al enlace de nuestra reuni\xF3n: <strong>[LINK DO MEET]</strong></p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},reschedule2:{name:"Propuesta de Reprogramaci\xF3n",category:"Intentos y Programaci\xF3n",subject:"Reprogramaci\xF3n de Consultor\xEDa",labels:{"[DATA 1]":"Fecha 1","[HORA 1]":"Hora 1","[DATA 2]":"Fecha 2","[HORA 2]":"Hora 2","[DATA 3]":"Fecha 3","[HORA 3]":"Hora 3","[Seu Nome]":"Firma"},template:"<p>Hola, \xBFc\xF3mo est\xE1?</p><br><p>Estas son las pr\xF3ximas fechas disponibles:</p><ul><li><strong>[DATA 1] a las [HORA 1]</strong></li><li><strong>[DATA 2] a las [HORA 2]</strong></li><li><strong>[DATA 3] a las [HORA 3]</strong></li></ul><br><p>Tambi\xE9n le informo que si no hay respuesta a este correo en las pr\xF3ximas 48 horas el caso ser\xE1 cerrado.</p><p>Le recuerdo que mi agenda es din\xE1mica, por lo que en cualquier momento se puede agendar una consultor\xEDa para los d\xEDas disponibles. Por lo tanto, cuanto m\xE1s r\xE1pido pueda responderme, m\xE1s garantizada ser\xE1 la programaci\xF3n de la fecha y el horario.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},max_reschedules:{name:"L\xEDmite de Reprogramaciones Excedido",category:"Intentos y Programaci\xF3n",subject:"Estado de la Programaci\xF3n - Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este correo le encuentre bien.</p><p>Le escribo en nombre del equipo de Google Ads para informarle sobre su solicitud de reprogramaci\xF3n para la implementaci\xF3n de las etiquetas.</p><br><p>Lamentablemente, <strong>ya no podemos reprogramar este caso espec\xEDfico</strong>, pues hemos excedido el l\xEDmite m\xE1ximo de programaciones permitido.</p><br><p>Si desea continuar con la implementaci\xF3n de las etiquetas, ser\xE1 necesario abrir un <strong>nuevo caso</strong> directamente con la <a href="https://support.google.com/google-ads">Ayuda de Google Ads</a>. Esto garantizar\xE1 que reciba el seguimiento y el soporte necesarios para dar continuidad a su solicitud.</p><br><p>Agradecemos su participaci\xF3n en este proceso y la oportunidad de ayudar. Esperamos continuar nuestra colaboraci\xF3n.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'},"2_6_day3":{name:"D\xEDa 3 (Seguimiento)",category:"Follow Up",subject:"Consultor\xEDa con el Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]":"Acci\xF3n Pendiente","[MM/DD/YYYY]":"Fecha del Pr\xF3ximo Contacto","[Seu Nome]":"Firma"},template:"<p>Hola, <strong>[Nome do Cliente]</strong></p><br><p>\xA1Espero que se encuentre bien!</p><p>Intentamos contactarle por tel\xE9fono, pero sin \xE9xito. Me gustar\xEDa saber si ya pudo <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, o si ya tiene una previsi\xF3n de cu\xE1ndo se concluir\xE1 esa acci\xF3n.</p><br><p>Continuar\xE9 monitoreando el estado de la implementaci\xF3n en su sitio, y el d\xEDa <strong>[MM/DD/YYYY]</strong> har\xE9 un nuevo seguimiento para verificar el avance de la implementaci\xF3n.</p><p>Si tiene alg\xFAn problema o duda que le impida realizar la implementaci\xF3n, no dude en compartirlo con nosotros.</p><br><p>Quedo a disposici\xF3n.</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>"},"2_6_day6":{name:"D\xEDa 6 (Seguimiento Final)",category:"Follow Up",subject:"Consultor\xEDa con el Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[URL]":"URL del Sitio","[Seu Nome]":"Firma"},template:"<p>Hola, <strong>[Nome do Cliente]</strong></p><br><p>\xA1Espero que se encuentre bien!</p><p>Tras analizar y revisar el estado de implementaci\xF3n de la etiqueta en su sitio, <strong>[URL]</strong>, verificamos que la etiqueta a\xFAn est\xE1 pendiente de implementaci\xF3n. Intentamos contactarle por correo, pero sin \xE9xito.</p><br><p>Es esencial que sea implementada, pues ofrece una amplia gama de beneficios, como:</p><ul><li>Ayuda a rastrear conversiones en tiempo real</li><li>Mejora la generaci\xF3n de ingresos, en t\xE9rminos de clics</li><li>Sirve para vincular Google Analytics con los anuncios y hacer seguimiento de las conversiones</li><li>Proporciona informaci\xF3n sobre la experiencia del usuario</li></ul><br><p>Si tiene alg\xFAn problema o duda que le impida realizar la implementaci\xF3n, no dude en compartirlo con nosotros. Estaremos encantados de ayudar.</p><p>Si no recibimos ninguna respuesta en los pr\xF3ximos 3 d\xEDas, lamentablemente el caso ser\xE1 cerrado.</p><br><p>Quedo a disposici\xF3n.</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>"},"2_6_completed_reschedule":{name:"Acciones Concluidas (Solicitar Reprogramaci\xF3n)",category:"Follow Up",subject:"Continuidad de la Implementaci\xF3n - Soluciones T\xE9cnicas de Google",labels:{"[Disponibilidade em BAU]":"Pr\xF3xima Disponibilidad","[Seu Nome]":"Firma"},template:"<p>Hola, \xBFc\xF3mo est\xE1?</p><br><p>\xA1Excelente! Muy bueno saber que logr\xF3 concluir las acciones pendientes. Siendo as\xED, ahora podemos continuar con la implementaci\xF3n de las configuraciones en su cuenta.</p><br><p>Para eso, le pido, por favor, que me env\xEDe algunas de las pr\xF3ximas fechas y horarios en los que est\xE9 disponible a partir del d\xEDa <strong>[Disponibilidade em BAU]</strong>.</p><p>En cuanto me env\xEDe esa informaci\xF3n, crear\xE9 una reprogramaci\xF3n para que uno de nuestros agentes contin\xFAe ayud\xE1ndole.</p><br><p>Tambi\xE9n le informo que si no hay respuesta a este correo, realizar\xE9 un seguimiento de este caso durante 6 d\xEDas, en el que me pondr\xE9 en contacto cada 3 d\xEDas para intentar reprogramar su caso lo antes posible.</p><p>Le recuerdo que mi agenda es din\xE1mica, por lo que en cualquier momento se puede agendar una consultor\xEDa para los d\xEDas disponibles. Por lo tanto, cuanto m\xE1s r\xE1pido pueda responderme, m\xE1s garantizada ser\xE1 la programaci\xF3n de la fecha y el horario.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},nrp_standard:{name:"NRP - Est\xE1ndar (3.\xBA Intento)",category:"NRP / Cierre",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Cierre",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Task pedida pelo AM]":"Tarea Solicitada","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Intentamos llamarle hoy sobre el caso de Implementaci\xF3n de la etiqueta referente a la solicitud de <strong>[Task pedida pelo AM]</strong>. Se hizo otro intento despu\xE9s de 10 minutos, pero tampoco logramos contactarle.</p><p>Debido a la alta demanda, no podemos reprogramar un horario. Por eso, vamos a cerrar este caso. Sin embargo, si a\xFAn desea continuar con la implementaci\xF3n, basta con acceder a este enlace y elegir la mejor fecha y horario para hablar con nuestro equipo, o si lo prefiere, p\xF3ngase en contacto con su gerente de cuentas de Google para agendar una nueva reuni\xF3n.</p><p>Lamentamos el inconveniente y esperamos trabajar con usted nuevamente en el futuro.</p><br><p>Si desea saber m\xE1s, consulte a continuaci\xF3n algunos enlaces \xFAtiles con recursos valiosos relacionados con la implementaci\xF3n de etiquetas y el soporte de Shopping.</p><p><strong>En relaci\xF3n con las etiquetas</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Soporte para la implementaci\xF3n de etiquetas</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>En relaci\xF3n con Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">C\xF3mo configurar la cuenta y el feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Optimizaci\xF3n del feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'},nrp_dfa:{name:"NRP - DFA",category:"NRP / Cierre",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Cierre",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Intentamos llamarle hoy sobre el caso de Implementaci\xF3n de la etiqueta referente a la solicitud. Se hizo otro intento despu\xE9s de 10 minutos, pero tampoco logramos contactarle.</p><p>Debido a la alta demanda, no podemos reprogramar un horario. Por eso, vamos a cerrar este caso. Sin embargo, si a\xFAn desea continuar con la implementaci\xF3n, basta con acceder a este enlace y elegir la mejor fecha y horario para hablar con nuestro equipo.</p><p>Lamentamos el inconveniente y esperamos trabajar con usted nuevamente en el futuro.</p><br><p>Si desea saber m\xE1s, consulte a continuaci\xF3n algunos enlaces \xFAtiles con recursos valiosos relacionados con la implementaci\xF3n de etiquetas y el soporte de Shopping.</p><p><strong>En relaci\xF3n con las etiquetas</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Soporte para la implementaci\xF3n de etiquetas</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>En relaci\xF3n con Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">C\xF3mo configurar la cuenta y el feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Optimizaci\xF3n del feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'}};function Bo(e,t){if(t!=="es")return e;let a=ii[e?.id];return a?{...e,name:a.name??e.name,category:a.category??e.category,subject:a.subject??e.subject,template:a.template??e.template,placeholders:(e.placeholders||[]).map(n=>({...n,label:a.labels?.[n.key]??n.label}))}:e}var Po={_templates:null,async getTemplates(){return this._templates?this._templates:(this._templates=$o,this._templates)}};var Go="cw_personal_library_v1",St=!1,Fe={getSnippets:(e="all")=>{let t=Fe._loadFromLocal(),a=ke();return a&&a.includes("@")&&!St&&Fe._syncWithServer(a),e==="all"?t:t.filter(n=>n.type===e)},save:async e=>{let t=ke();if(!t)return S.playError(),J("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;St=!0;let a=Fe._loadFromLocal(),n=new Date().toISOString(),o={id:e.id||"local_"+Date.now(),type:e.type||"general",title:e.title||"Sem t\xEDtulo",content:e.content||"",subject:e.subject||"",isCode:e.isCode||!1,isRich:e.isRich||!1,updated:n,_pendingSync:!0},i=a.filter(c=>c.id!==o.id);i.unshift(o),Fe._saveToLocal(i);let r=!1;try{r=await he.saveSnippet(o,t),r?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais.")}catch(c){console.error("Erro na nuvem:",c)}finally{setTimeout(()=>{St=!1},2e3)}o._pendingSync=!r;let l=Fe._loadFromLocal().filter(c=>c.id!==o.id);return l.unshift(o),Fe._saveToLocal(l),{...o,synced:r}},delete:async e=>{let t=ke();St=!0;let n=Fe._loadFromLocal().filter(o=>o.id!==e);return Fe._saveToLocal(n),t?he.deleteSnippet(e,t).then(()=>{setTimeout(()=>{St=!1},2e3)}):St=!1,!0},_syncWithServer:async e=>{if(window._cw_library_syncing)return;window._cw_library_syncing=!0,setTimeout(()=>{window._cw_library_syncing=!1},3e4),console.log("\u{1F504} Sincronizando biblioteca...");let t=await he.getUserSnippets(e);if(t&&t.status==="success"&&Array.isArray(t.snippets)){let a=t.snippets,n=Fe._loadFromLocal(),i=[...n.filter(c=>c._pendingSync),...a],r=JSON.stringify(i),l=JSON.stringify(n);r!==l&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),Fe._saveToLocal(i))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(Go)||"[]")}catch{return[]}},_saveToLocal:e=>{localStorage.setItem(Go,JSON.stringify(e))}};var jo={pt:{headerTitle:"Email Assistant",headerDesc:"Refatora\xE7\xE3o completa do m\xF3dulo de e-mail para uma experi\xEAncia moderna e eficiente.",searchPlaceholder:"Buscar templates...",previewTitle:"Preview do E-mail",noSubject:"Sem Assunto",emailCopiedToast:"E-mail copiado com sucesso!",copyErrorToast:"Erro ao copiar e-mail",fillErrorToast:"Erro ao preencher e-mail",smartCrErrorToast:"Erro ao aplicar Smart CR"},es:{headerTitle:"Email Assistant",headerDesc:"Refactorizaci\xF3n completa del m\xF3dulo de email para una experiencia moderna y eficiente.",searchPlaceholder:"Buscar plantillas...",previewTitle:"Vista Previa del Email",noSubject:"Sin Asunto",emailCopiedToast:"\xA1Email copiado con \xE9xito!",copyErrorToast:"Error al copiar el email",fillErrorToast:"Error al completar el email",smartCrErrorToast:"Error al aplicar Smart CR"}};function Be(e){let t=se();return jo[t]?.[e]??jo.pt[e]}var fe={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",warning:"#E67E22",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"};function ri(){if(document.getElementById("cw-email-styles"))return;let e=document.createElement("style");e.id="cw-email-styles",e.textContent=`
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
        .cw-email-main { display: flex; flex: 1; overflow: hidden; background-color: ${fe.bgApp}; }

        /* --- PAINEL ESQUERDO --- */
        .cw-email-left-panel { width: 320px; background-color: #EFEFF0; border-right: 1px solid ${fe.borderSubtle}; display: flex; flex-direction: column; flex-shrink: 0; }
        .cw-email-search-container { padding: 16px; border-bottom: 1px solid ${fe.borderSubtle}; position: relative; }
        .cw-email-search-input {
            width: 100%; box-sizing: border-box; padding: 10px 14px 10px 36px;
            border-radius: 10px; border: 1.5px solid transparent; background-color: #E3E3E8;
            font-size: 15px; outline: none; color: ${fe.textPrimary};
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238A8A8E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
            background-repeat: no-repeat; background-position: 12px center;
            transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
        }
        .cw-email-search-input:focus {
            background-color: #FFFFFF; border-color: ${fe.primary};
            box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1); transform: scale(1.02);
        }
        .cw-email-clear-btn {
            position: absolute; right: 26px; top: 50%; transform: translateY(-50%);
            font-size: 10px; color: #fff; cursor: pointer; display: none;
            background-color: #C7C7CC; width: 16px; height: 16px; border-radius: 50%;
            text-align: center; line-height: 16px; font-weight: bold;
        }

        #email-template-list { flex: 1; overflow-y: auto; padding: 8px; scroll-behavior: smooth; }

        .cw-email-list-empty { padding: 40px 20px; text-align: center; color: ${fe.textSecondary}; opacity: 0.6; }
        .cw-email-list-empty-icon { font-size: 32px; margin-bottom: 12px; }
        .cw-email-list-empty-text { font-size: 14px; font-weight: 500; }

        .cw-email-cat-header {
            padding: 12px 16px 12px 24px; font-size: 11px; font-weight: 700; color: ${fe.textSecondary};
            text-transform: uppercase; letter-spacing: 0.8px; position: sticky; top: -8px;
            background-color: rgba(239, 239, 240, 0.9); z-index: 10; backdrop-filter: blur(20px);
            margin: 0 -8px 8px -8px; border-bottom: 0.5px solid ${fe.borderSubtle};
            cursor: pointer; display: flex; align-items: center; justify-content: space-between;
            user-select: none; transition: background-color 0.2s ease;
        }
        .cw-email-cat-header:hover { background-color: rgba(230, 230, 232, 0.9); }
        .cw-email-cat-header:focus-visible, .cw-email-list-item:focus-visible { outline: 2px solid ${fe.primary}; outline-offset: -2px; }
        .cw-email-cat-right { display: flex; align-items: center; }
        .cw-email-cat-badge { background-color: rgba(0, 0, 0, 0.05); padding: 2px 8px; border-radius: 10px; font-size: 10px; color: ${fe.textSecondary}; }
        .cw-email-cat-arrow { margin-left: 8px; transition: transform 0.3s ease; }

        .cw-email-list-item {
            padding: 12px 14px; font-size: 14px; cursor: pointer;
            transition: background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1), transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s cubic-bezier(0.25, 1, 0.5, 1), color 0.3s cubic-bezier(0.25, 1, 0.5, 1); border-radius: 10px;
            color: ${fe.textPrimary}; margin: 4px 6px; display: flex; align-items: center; gap: 12px;
            background-color: ${fe.bgSurface}; box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            border: 1px solid ${fe.borderSubtle}; position: relative; overflow: hidden;
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
            background-color: ${fe.primary}; box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
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
        .cw-email-right-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; background-color: ${fe.bgApp}; transition: opacity 0.15s ease, transform 0.15s ease; }
        .cw-email-fields-section { padding: 20px; border-bottom: 1px solid ${fe.borderSubtle}; background-color: ${fe.bgSurface}; max-height: 250px; overflow-y: auto; display: none; }
        .cw-email-fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .cw-email-field-label { display: block; font-size: 11px; font-weight: 700; color: ${fe.textSecondary}; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-email-field-input {
            width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px;
            border: 1.5px solid ${fe.borderSubtle}; background-color: #FBFBFD; font-size: 14px;
            transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease; outline: none;
        }
        .cw-email-field-input:focus { border-color: ${fe.primary}; background-color: #FFFFFF; box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1); }

        .cw-email-smartcr-hint {
            padding: 12px; font-size: 13px; color: #856404; background: #FFF3CD; border: 1px solid #FFEEBA;
            border-radius: 8px; display: flex; align-items: center; gap: 8px;
        }
        .cw-email-smartcr-hint-icon { font-size: 18px; }

        .cw-email-preview-section { flex: 1; display: flex; flex-direction: column; padding: 20px; background-color: ${fe.bgApp}; overflow: hidden; }
        .cw-email-preview-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .cw-email-preview-title { font-size: 12px; font-weight: 600; color: ${fe.textSecondary}; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-email-preview-actions { display: flex; gap: 8px; }
        .cw-email-preview-content {
            flex: 1; background-color: ${fe.bgSurface}; border: 1px solid ${fe.borderSubtle};
            border-radius: 8px; padding: 20px; font-size: 15px; line-height: 1.6; color: ${fe.textPrimary};
            overflow-y: auto; outline: none; box-shadow: inset 0 1px 2px rgba(0,0,0,0.02);
        }

        /* --- BOT\xD5ES DE A\xC7\xC3O --- */
        .cw-email-btn {
            padding: 8px 14px; border-radius: 10px; border: 1.5px solid ${fe.primary};
            background: transparent; color: ${fe.primary}; font-size: 13px; font-weight: 600;
            cursor: pointer; transition: background-color 0.2s cubic-bezier(0.25, 1, 0.5, 1), transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .cw-email-btn:hover { background-color: rgba(0, 122, 255, 0.05); }
        .cw-email-btn:active { transform: scale(0.94); }
        .cw-email-btn.primary {
            border: none; background: ${fe.primary}; color: #fff;
            box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }
        .cw-email-btn.primary:hover { background-color: #0062CC; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0, 122, 255, 0.4); }
        .cw-email-btn.warning { border-color: ${fe.warning}; color: ${fe.warning}; display: none; }
        .cw-email-btn.warning:hover { background-color: rgba(230, 126, 34, 0.08); }

        @media (prefers-reduced-motion: reduce) {
            .cw-animate-float { animation: none !important; }
            .cw-email-search-input, .cw-email-list-item, .cw-email-btn, .cw-email-right-panel {
                transition: opacity 0.15s ease, background-color 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}function si(e,t){return e.map(a=>Bo(a,se())).filter(a=>a.name.toLowerCase().includes(t.toLowerCase())||a.category.toLowerCase().includes(t.toLowerCase()))}function li(e){return Object.entries(yt).filter(([t,a])=>a&&(t.toLowerCase().includes(e.toLowerCase())||a.toLowerCase().includes(e.toLowerCase()))).map(([t,a])=>({id:t,name:t.replace(/_/g," "),category:"\u26A1 Smart CRs",code:a,isSmartCR:!0}))}function ci(e){return Fe.getSnippets("email").filter(t=>t.title.toLowerCase().includes(e.toLowerCase())||t.subject&&t.subject.toLowerCase().includes(e.toLowerCase())).map(t=>{let a=[],n=t.content.match(/\[([^\]]+)\]/g);return n&&[...new Set(n)].forEach(o=>{a.push({key:o,label:o.replace("[","").replace("]",""),type:o.toLowerCase().includes("data")?"date":"text",auto:o.toLowerCase().includes("nome")&&o.toLowerCase().includes("seu")?"agentName":null})}),{id:t.id||`snippet-${Math.random()}`,name:t.title,category:"\u{1F464} Pessoal",subject:t.subject||Be("noSubject"),template:t.content,placeholders:a}})}function di(e,t){return[...si(e,t),...li(t),...ci(t)]}function Ho(){let e="v6.0.0",t=!1,a=[],n=null,o="",i=new Set;ri();let r=document.createElement("div");r.id="email-assistant-popup",r.classList.add("cw-module-window","cw-email-popup"),Object.assign(r.style,De,{width:"850px",height:"650px"}),r.style.display="none",r.style.flexDirection="column";let l=Ie(r,Be("headerTitle"),e,Be("headerDesc"),{popup:r},()=>P()),c=document.createElement("div");c.className="cw-email-main";let h=document.createElement("div");h.className="cw-email-left-panel";let p=document.createElement("div");p.className="cw-email-search-container";let f=document.createElement("input");f.className="cw-email-search-input",f.placeholder=Be("searchPlaceholder");let b=document.createElement("div");b.id="email-template-list",_t(b,".cw-email-cat-header, .cw-email-list-item");let g=document.createElement("div");g.className="cw-email-clear-btn",g.innerHTML="\u2715",g.onclick=()=>{f.value="",o="",g.style.display="none",Z(),f.focus()},p.appendChild(f),p.appendChild(g),h.appendChild(p),h.appendChild(b);let O=document.createElement("div");O.className="cw-email-right-panel";let C=document.createElement("div");C.className="cw-email-fields-section";let x=document.createElement("div");x.className="cw-email-preview-section";let L=document.createElement("div");L.className="cw-email-preview-header";let j=document.createElement("span");j.textContent=Be("previewTitle"),j.className="cw-email-preview-title";let I=document.createElement("div");I.className="cw-email-preview-actions";let F=(G,te=!1)=>{let Q=document.createElement("button");return Q.textContent=G,Q.className="cw-email-btn"+(te?" primary":""),Q},N=F("Copiar HTML"),R=F("Preencher no CRM",!0),T=F("Smart CR");T.classList.add("warning"),I.appendChild(T),I.appendChild(N),I.appendChild(R),L.appendChild(j),L.appendChild(I);let q=document.createElement("div");q.contentEditable="true",q.className="cw-email-preview-content",x.appendChild(L),x.appendChild(q),ee(),O.appendChild(C),O.appendChild(x),c.appendChild(h),c.appendChild(O),r.appendChild(l),r.appendChild(c);let B=document.createElement("div");Object.assign(B.style,Ze),r.appendChild(B),et(r,B),document.body.appendChild(r);function P(){t=!t,t?(Se(),r.style.display="flex",ao(r),a.length===0&&U()):(Ee(),r.style.display="none"),Le(t,r,"cw-btn-email")}async function U(){b.innerHTML='<div style="padding: 20px; text-align: center; color: #5f6368;">Carregando...</div>',a=await Po.getTemplates(),Z()}function V(G,te,Q){let oe=document.createElement("div");oe.className="cw-email-cat-header",oe.tabIndex=0,oe.setAttribute("role","button"),oe.setAttribute("aria-expanded",String(Q));let ae=document.createElement("span");ae.textContent=G,oe.appendChild(ae);let v=document.createElement("span");v.className="cw-email-cat-badge",v.textContent=te;let $=document.createElement("span");$.className="cw-email-cat-arrow",$.textContent=Q?"\u25BE":"\u25B8";let s=document.createElement("div");return s.className="cw-email-cat-right",s.appendChild(v),s.appendChild($),oe.appendChild(s),oe.onclick=()=>{i.has(G)?i.delete(G):i.add(G),Z()},oe.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),oe.click())}),oe}function _(G){let te=n&&n.id===G.id,Q=document.createElement("div");if(Q.className="cw-email-list-item"+(te?" selected":""),Q.tabIndex=0,Q.setAttribute("role","button"),Q.setAttribute("aria-pressed",String(!!te)),te){let v=document.createElement("div");v.className="cw-email-list-indicator",Q.appendChild(v)}let oe=document.createElement("span");oe.className="cw-email-list-icon",oe.innerHTML=G.isSmartCR?"\u26A1":G.category==="\u{1F464} Pessoal"?"\u{1F464}":"\u{1F4C4}",Q.appendChild(oe);let ae=document.createElement("span");return ae.className="cw-email-list-text",ae.textContent=G.name,Q.appendChild(ae),Q.onclick=()=>re(G),Q.addEventListener("keydown",v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),Q.click())}),Q}function Z(){b.innerHTML="";let G=di(a,o);if(G.length===0){b.innerHTML=`
                <div class="cw-email-list-empty">
                    <div class="cw-email-list-empty-icon">\u{1F50D}</div>
                    <div class="cw-email-list-empty-text">Nenhum resultado para "${o}"</div>
                </div>`;return}[...new Set(G.map(Q=>Q.category))].sort((Q,oe)=>Q.localeCompare(oe)).forEach(Q=>{let oe=i.has(Q)||o.length>0,ae=G.filter(v=>v.category===Q);b.appendChild(V(Q,ae.length,oe)),oe&&ae.forEach(v=>{b.appendChild(_(v))})})}let ie=null;async function re(G){n?.id!==G.id&&(n=G,ie&&clearTimeout(ie),O.style.opacity="0",O.style.transform="translateY(5px)",ie=setTimeout(()=>{T.style.display=G.isSmartCR?"block":"none",R.style.display=G.isSmartCR?"none":"block",N.style.display=G.isSmartCR?"none":"block",Z(),W(),ee(),O.style.opacity="1",O.style.transform="translateY(0)",ie=null},150))}function W(){if(C.innerHTML="",!n||n.isSmartCR){n?.isSmartCR?(C.style.display="block",C.innerHTML=`<div class="cw-email-smartcr-hint">
                    <span class="cw-email-smartcr-hint-icon">\u{1F4A1}</span>
                    <span>Este \xE9 um <b>Smart CR</b>. Clique no bot\xE3o laranja acima para aplicar o atalho diretamente no CRM.</span>
                </div>`):C.style.display="none";return}let G=n.placeholders&&n.placeholders.length>0;if(C.style.display=G?"block":"none",!G)return;let te=document.createElement("div");te.className="cw-email-fields-grid",(n.placeholders||[]).forEach(Q=>{let oe=document.createElement("div"),ae=document.createElement("label");ae.className="cw-email-field-label",ae.textContent=Q.label;let v=document.createElement("input");v.className="cw-email-field-input",v.type=Q.type||"text",v.dataset.key=Q.key,Q.auto==="agentName"&&(v.value=Tt().split(" ")[0]),v.addEventListener("input",ee),oe.appendChild(ae),oe.appendChild(v),te.appendChild(oe)}),C.appendChild(te)}function ee(){if(!n){q.innerHTML=`
                <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center;">
                    <div class="cw-animate-float" style="width: 140px; height: 140px; margin-bottom: 24px;">
                        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="60" cy="60" r="55" fill="#f8f9fa"/>
                            <!-- Envelope Base -->
                            <path d="M30 40C30 37.7909 31.7909 36 34 36H86C88.2091 36 90 37.7909 90 40V80C90 82.2091 88.2091 84 86 84H34C31.7909 84 30 82.2091 30 80V40Z" fill="white" stroke="#e8eaed" stroke-width="2"/>
                            <!-- Detalhes decorativos (paleta Apple do m\xF3dulo, n\xE3o mais as cores oficiais do Google) -->
                            <path d="M30 40L60 60L90 40" stroke="${fe.primary}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M30 80L50 65" stroke="#FF3B30" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <path d="M90 80L70 65" stroke="#FF9500" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <!-- Small Floating icons -->
                            <circle cx="95" cy="30" r="8" fill="#34C759"/>
                            <path d="M92 30H98M95 27V33" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            <rect x="20" y="70" width="12" height="12" rx="3" fill="${fe.primary}" opacity="0.8"/>
                        </svg>
                    </div>
                    <div style="font-family: 'Google Sans', sans-serif; font-size: 18px; font-weight: 600; color: ${fe.textPrimary}; margin-bottom: 8px;">
                        Pronto para come\xE7ar?
                    </div>
                    <div style="font-size: 14px; color: ${fe.textSecondary}; line-height: 1.6; max-width: 280px; margin: 0 auto;">
                        Selecione um template \xE0 esquerda para<br>gerar o seu e-mail t\xE9cnico.
                    </div>
                </div>`;return}if(n.isSmartCR){q.innerHTML=`<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">\u26A1</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${n.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">Este atalho ir\xE1 preencher automaticamente os destinat\xE1rios e abrir o menu de Canned Responses do CRM.</div></div>`;return}let G=n.template;(C.querySelectorAll("input")||[]).forEach(Q=>{let oe=Q.dataset.key,ae=Q.value;if(Q.type==="date"&&ae){let[$,s,u]=ae.split("-");ae=`${s}/${u}/${$}`}ae=ae||`<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${oe}</span>`;let v=oe.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");G=G.replace(new RegExp(v,"g"),ae)}),q.innerHTML=G}return f.addEventListener("input",G=>{o=G.target.value,g.style.display=o?"block":"none",Z()}),N.onclick=()=>{let G=q.innerHTML,te=new Blob([G],{type:"text/html"}),Q=q.innerText,oe=[new ClipboardItem({"text/html":te,"text/plain":new Blob([Q],{type:"text/plain"})})];navigator.clipboard.write(oe).then(()=>J(Be("emailCopiedToast")),()=>{S.playError(),J(Be("copyErrorToast"),{error:!0})})},R.onclick=async()=>{if(!n)return;let G=Nt(),te={...n,body:q.innerHTML};try{await _o(te),P()}catch{S.playError(),J(Be("fillErrorToast"),{error:!0})}finally{G()}},T.onclick=async()=>{if(!n||!n.isSmartCR)return;let G=Nt();try{await Jt(n.code),P()}catch{S.playError(),J(Be("smartCrErrorToast"),{error:!0})}finally{G()}},ye(()=>{let G=r.querySelector(".cw-help-title");G&&(G.textContent=Be("headerTitle"));let te=r.querySelector(".cw-help-description");te&&(te.textContent=Be("headerDesc")),f.placeholder=Be("searchPlaceholder"),j.textContent=Be("previewTitle")}),P}var Uo=["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],va={"PT BAU":{inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:Uo,fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:Uo,fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{inicio:["Introducci\xF3n (Nombre y Equipo).","La llamada puede ser grabada con fines de entrenamiento y calidad de acuerdo con nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xF3n.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar contenido sensible antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos pasos (\xBFCu\xE1nto tiempo seguir\xE1 el caso?)","Encuesta de Satisfacci\xF3n.","Estar\xE9 monitoreando su caso durante XX d\xEDas para asegurarme de que todo est\xE9 funcionando correctamente. Durante este tiempo, nuestro equipo de calidad podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la cuenta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condiciones.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las herramientas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfacci\xF3n.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes d\xEDas."]}};var Vo={pt:{headerTitle:"Call Script",headerDesc:"Guia interativo para condu\xE7\xE3o de chamadas.",loading:"Carregando...",unknownClient:"Cliente Desconhecido",notFound:"N\xE3o encontrado",activeMonitoring:"Monitoramento Ativo",cidLabel:"CID (Conta)",emailLabel:"Email de Contato",copied:"Copiado!",amMessageTitle:"Mensagem AM",amMessageSub:"Gerar aviso de insucesso",copyFinalMessage:"Copiar Mensagem Final",resize:"Redimensionar",resetScript:"Resetar Script",resetConfirm:"Resetar todo o progresso do script? Essa a\xE7\xE3o n\xE3o pode ser desfeita.",resetConfirmBtn:"Resetar",scriptNotConfigured:"Script n\xE3o configurado.",messageCopiedToast:"Mensagem copiada!",amMessage:(e,t)=>`Ol\xE1. Bom dia!

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
E-mail: ${e.clientEmail||"---"}`,dateLocale:"es-ES"}};function Wo(){return se()==="es"?"ES":"PT"}function be(e){let t=se();return Vo[t]?.[e]??Vo.pt[e]}var de={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",danger:"#D93025",dangerBg:"#FCE8E6",success:"#34A853",successBg:"#E6F4EA"},pi={inicio:{PT:"Abertura",ES:"Apertura"},meio:{PT:"Implementa\xE7\xE3o (Tag Support)",ES:"Implementaci\xF3n"},fim:{PT:"Fechamento",ES:"Cierre"}};function ui(){if(document.getElementById("csa-styles-v2"))return;let e=document.createElement("style");e.id="csa-styles-v2",e.textContent=`
        #call-script-popup { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

        /* --- BANNER DE CONTEXTO --- */
        .csa-context-banner {
            padding: 20px 20px 16px 20px;
            background: ${de.bgSurface};
            border-bottom: 1px solid #F1F3F4;
            display: flex; flex-direction: column; gap: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
            position: relative; z-index: 5;
        }
        .csa-ctx-top { display: flex; justify-content: space-between; align-items: center; }
        .csa-ctx-name-wrap { display: flex; align-items: center; gap: 10px; }
        .csa-ctx-name { font-size: 16px; font-weight: 500; color: ${de.textPrimary}; }
        .csa-live-badge {
            font-size: 10px; font-weight: 700; color: ${de.primary}; background: ${de.primaryBg};
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
        .csa-data-pill:hover { background: ${de.bgSurface}; border-color: #DADCE0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transform: translateY(-1px); }
        .csa-data-pill:active { transform: scale(0.98); }
        .csa-data-pill.copied { background: ${de.successBg} !important; border-color: ${de.success} !important; }
        .csa-pill-label { font-size: 9px; font-weight: 700; color: ${de.textSecondary}; text-transform: uppercase; margin-bottom: 2px; letter-spacing: 0.5px; }
        .csa-data-value { font-size: 13px; color: ${de.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .csa-data-value.mono { font-family: 'SF Mono', 'Roboto Mono', monospace; font-weight: 500; color: ${de.primary}; }
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
            width: 100%; background: ${de.bgSurface}; border: 1px solid #DADCE0; border-radius: 10px; padding: 10px;
            display: flex; align-items: center; gap: 12px; cursor: pointer; box-sizing: border-box;
            transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.02);
        }
        .csa-am-btn:hover { border-color: ${de.primary}; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .csa-am-icon { background: ${de.primaryBg}; border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .csa-am-btn-text { text-align: left; }
        .csa-am-btn-title { font-size: 11px; font-weight: 700; color: #3C4043; }
        .csa-am-btn-sub { font-size: 10px; color: ${de.textSecondary}; }

        .csa-am-review-container { display: none; max-height: 0; opacity: 0; overflow: hidden; margin-top: 0; transition: all 0.3s ease; }
        .csa-am-review-container.visible { display: block; max-height: 300px; opacity: 1; margin-top: 12px; }
        .csa-am-message-area {
            width: 100%; height: 120px; border: 1px solid #DADCE0; border-radius: 8px; padding: 10px;
            font-family: inherit; font-size: 13px; color: #3C4043; outline: none; resize: none;
            box-sizing: border-box; background: ${de.bgSurface}; line-height: 1.4;
        }
        .csa-am-copy-final {
            width: 100%; margin-top: 8px; padding: 10px; background: ${de.primary}; color: white; border: none;
            border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; transition: background 0.2s;
        }
        .csa-am-copy-final.copied-flash { background: ${de.success}; }

        /* --- BARRA DE PROGRESSO --- */
        .csa-progress-container { height: 6px; background: ${de.borderSubtle}; width: 100%; position: relative; overflow: hidden; }
        .csa-progress-fill {
            height: 100%; width: 0%; border-radius: 0 3px 3px 0;
            transition: width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
            background: linear-gradient(90deg, ${de.primary}, #00C6FF, ${de.primary});
            background-size: 200% 100%;
            animation: csaShimmer 2s infinite linear;
        }
        .csa-progress-fill.complete { background: ${de.success}; animation: none; }
        @keyframes csaShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

        /* --- SEGMENTED CONTROL (Tipo / Idioma) --- */
        .csa-content-area { padding: 16px; overflow-y: auto; flex-grow: 1; background: ${de.bgApp}; scroll-behavior: smooth; }
        .csa-controls { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .csa-segmented-control { display: flex; background: #E3E3E8; padding: 2px; border-radius: 10px; gap: 2px; position: relative; margin-bottom: 16px; }
        .csa-segmented-control button {
            flex: 1; border: none; background: transparent; padding: 8px 4px; font-size: 12px; font-weight: 600;
            border-radius: 8px; cursor: pointer; transition: color 0.3s ease; color: ${de.textSecondary};
            position: relative; z-index: 2;
        }
        .csa-segmented-control button.active { color: ${de.textPrimary}; }
        .csa-segmented-indicator {
            position: absolute; top: 2px; left: 2px; bottom: 2px; background: ${de.bgSurface};
            border-radius: 8px; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1; box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        /* --- CARDS DO CHECKLIST --- */
        .csa-card { background: ${de.bgSurface}; border: 1px solid ${de.borderSubtle}; border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02); }
        .csa-card.done { box-shadow: inset 4px 0 0 ${de.success}, 0 1px 3px rgba(0,0,0,0.05); }
        .csa-card-title { font-size: 11px; font-weight: 700; color: ${de.textSecondary}; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; user-select: none; }
        .csa-card-counter { font-size: 11px; opacity: 0.7; font-weight: 500; background: #f1f3f4; padding: 2px 8px; border-radius: 10px; }
        .csa-card-counter.done { opacity: 1; color: #1e8e3e; background: ${de.successBg}; }

        .csa-item-row { display: flex; align-items: flex-start; padding: 10px 8px; cursor: pointer; border-radius: 10px; transition: background 0.2s ease; color: ${de.textPrimary}; font-size: 14px; line-height: 1.5; margin-bottom: 2px; }
        .csa-item-row:not(.completed):hover { background: rgba(0, 0, 0, 0.03); }
        .csa-item-row:not(.completed):hover .csa-checkbox { border-color: ${de.primary}; }
        .csa-item-row.completed { background: rgba(0, 0, 0, 0.02); }

        .csa-checkbox {
            min-width: 20px; height: 20px; border-radius: 50%; border: 2px solid ${de.borderSubtle};
            margin-right: 12px; margin-top: 1px; display: flex; align-items: center; justify-content: center;
            transition: border-color 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.15s ease;
            background: #fff;
        }
        .csa-checkbox.checked { background: ${de.primary}; border-color: ${de.primary}; }
        .csa-checkbox.pulse { transform: scale(1.15); }

        .csa-item-text { position: relative; display: inline-block; flex: 1; transition: color 0.3s ease; }
        .csa-item-text.completed { color: ${de.textSecondary}; }
        .csa-item-text::after { content: ''; position: absolute; left: 0; top: 50%; width: 0; height: 1.5px; background: ${de.textSecondary}; transition: width 0.3s ease; }
        .csa-item-text.completed::after { width: 100%; }

        .csa-empty-state { padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .csa-empty-state-icon { font-size: 24px; }

        /* --- FOOTER --- */
        .csa-footer { padding: 12px 16px; border-top: 1px solid #F1F3F4; background: ${de.bgSurface}; display: flex; justify-content: space-between; align-items: center; }
        .csa-credit { font-size: 10px; color: #bdc1c6; }
        .csa-reset-btn {
            background: transparent; border: none; color: ${de.danger}; font-size: 12px; font-weight: 600;
            cursor: pointer; padding: 6px 12px; border-radius: 20px; transition: background 0.2s ease, transform 0.15s ease;
            display: flex; align-items: center; gap: 4px;
        }
        .csa-reset-btn:hover { background: ${de.dangerBg}; }
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
    `,document.head.appendChild(e)}function Yo(){let e="v3.1.0";ui();let t={},a=Wo(),n="BAU",o=!1,i=document.createElement("div");i.id="call-script-popup",i.classList.add("cw-module-window"),Object.assign(i.style,De,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let r={popup:i,googleLine:null},l=null;function c(){o&&Ge().then(v=>{let $=i.querySelector("#cw-ctx-name"),s=i.querySelector("#cw-ctx-cid"),u=i.querySelector("#cw-ctx-email");if($&&($.textContent=v.advertiserName||be("unknownClient")),s){let m=v.cid||"---";s.textContent!==m&&(s.textContent=m)}if(u){let m=v.clientEmail||be("notFound");u.textContent!==m&&(u.textContent=m,u.title=m)}})}function h(){Ge().then(v=>{let $=new Date().toLocaleDateString(be("dateLocale")),s=i.querySelector("#cw-am-message-area"),u=i.querySelector("#cw-am-review-container"),m=be("amMessage")(v,$);s&&(s.value=m),u&&(u.classList.add("visible"),u.scrollIntoView({behavior:"smooth",block:"end"}))})}function p(){o=!o,Le(o,i,"cw-btn-script"),o?(Se(),c(),l||(l=setInterval(c,2e3))):(Ee(),l&&(clearInterval(l),l=null))}let f=Ie(i,be("headerTitle"),e,be("headerDesc"),r,()=>{p()});i.appendChild(f);let b=f.querySelector("span"),g=document.createElement("div");g.className="csa-context-banner",g.innerHTML=`
      <div class="csa-ctx-top">
          <div class="csa-ctx-name-wrap">
              <div class="csa-live-dot js-csa-monitoring" title="${be("activeMonitoring")}"></div>
              <span id="cw-ctx-name" class="csa-ctx-name">${be("loading")}</span>
          </div>
          <div class="csa-live-badge">Live</div>
      </div>

      <div class="csa-ctx-grid">
          <div class="csa-data-pill" id="cw-pill-cid">
              <div class="csa-pill-label js-csa-cid-label">${be("cidLabel")}</div>
              <div id="cw-ctx-cid" class="csa-data-value mono">---</div>
              <div class="csa-copy-hint">${be("copied")}</div>
          </div>

          <div class="csa-data-pill" id="cw-pill-email">
              <div class="csa-pill-label js-csa-email-label">${be("emailLabel")}</div>
              <div id="cw-ctx-email" class="csa-data-value">---</div>
              <div class="csa-copy-hint">${be("copied")}</div>
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
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${de.primary}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </div>
                      <div class="csa-am-btn-text">
                          <div class="csa-am-btn-title js-csa-am-title">${be("amMessageTitle")}</div>
                          <div class="csa-am-btn-sub js-csa-am-sub">${be("amMessageSub")}</div>
                      </div>
                  </button>

                  <div id="cw-am-review-container" class="csa-am-review-container">
                      <textarea id="cw-am-message-area" class="csa-am-message-area"></textarea>
                      <button id="cw-am-copy-final" class="csa-am-copy-final">${be("copyFinalMessage")}</button>
                  </div>
              </div>
          </div>
      </div>
  `;let O=g.querySelector("#csa-toggle-options"),C=g.querySelector("#csa-options-content"),x=g.querySelector("#csa-options-arrow"),L=!1;O.onclick=()=>{L=!L,x.classList.toggle("expanded",L),C.classList.toggle("expanded",L),S.playClick()};let j=g.querySelector("#cw-pill-message"),I=g.querySelector("#cw-am-copy-final"),F=g.querySelector("#cw-am-message-area");j.addEventListener("click",()=>{h()}),I.addEventListener("click",()=>{F.value&&(navigator.clipboard.writeText(F.value),J(be("messageCopiedToast")),S.playSuccess(),I.classList.add("copied-flash"),I.textContent=be("copied"),setTimeout(()=>{I.classList.remove("copied-flash"),I.textContent=be("copyFinalMessage")},2e3))});let N=(v,$)=>{let s=g.querySelector(v),u=g.querySelector($);s.onclick=()=>{let m=u.textContent;!m||m.includes("---")||m===be("notFound")||(navigator.clipboard.writeText(m),S.playSuccess(),s.classList.add("copied"),setTimeout(()=>s.classList.remove("copied"),1500))}};i.appendChild(g);let R=document.createElement("div");R.className="csa-progress-container";let T=document.createElement("div");T.className="csa-progress-fill",R.appendChild(T),i.appendChild(R);let q=document.createElement("div");q.id="csa-content",q.className="csa-content-area",i.appendChild(q);let B=document.createElement("div");B.className="csa-footer";let P=document.createElement("span");P.className="csa-credit",P.textContent="by lucaste@";let U=document.createElement("button");U.className="csa-reset-btn",U.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> <span class="js-csa-reset-label">${be("resetScript")}</span>`,U.onclick=async()=>{if(await Te(be("resetConfirm"),{danger:!0,confirmText:be("resetConfirmBtn")})){for(let $ in t)delete t[$];Q()}},B.appendChild(P),B.appendChild(U),i.appendChild(B);let V=document.createElement("div");V.className="csa-controls";let _=document.createElement("div");_.className="csa-segmented-control",_.innerHTML=`
      <div class="csa-segmented-indicator" id="type-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-type="BAU">BAU</button>
      <button data-type="LT">LT</button>
  `,V.appendChild(_),q.appendChild(V);let Z=_.querySelectorAll("button"),ie=_.querySelector("#type-indicator");Z.forEach((v,$)=>{v.onclick=()=>{Z.forEach(s=>s.classList.remove("active")),v.classList.add("active"),ie.style.transform=`translateX(${$*(_.offsetWidth/2-2)}px)`,n=v.dataset.type,S.playClick(),Q()}}),ye(()=>{a=Wo(),b&&(b.textContent=be("headerTitle"));let v=i.querySelector(".cw-help-title");v&&(v.textContent=be("headerTitle"));let $=i.querySelector(".cw-help-description");$&&($.textContent=be("headerDesc"));let s=g.querySelector(".js-csa-monitoring");s&&(s.title=be("activeMonitoring"));let u=g.querySelector(".js-csa-cid-label");u&&(u.textContent=be("cidLabel"));let m=g.querySelector(".js-csa-email-label");m&&(m.textContent=be("emailLabel")),g.querySelectorAll(".csa-copy-hint").forEach(d=>d.textContent=be("copied"));let E=g.querySelector(".js-csa-am-title");E&&(E.textContent=be("amMessageTitle"));let y=g.querySelector(".js-csa-am-sub");y&&(y.textContent=be("amMessageSub")),I&&(I.textContent=be("copyFinalMessage"));let A=U.querySelector(".js-csa-reset-label");A&&(A.textContent=be("resetScript")),Q()});let re=document.createElement("div");re.id="csa-checklist-area",q.appendChild(re);let W=document.createElement("div");Object.assign(W.style,Ze),W.className="no-drag",W.title=be("resize"),i.appendChild(W),et(i,W),document.body.appendChild(i),N("#cw-pill-cid","#cw-ctx-cid"),N("#cw-pill-email","#cw-ctx-email");function ee(v){return v.replace(/\n/g,"<br>")}function G(v,$,s,u){let m=`${v}-${$}-${u}`,E=!!t[m],y=document.createElement("div");y.className="csa-item-row"+(E?" completed":"");let A=document.createElement("div");A.className="csa-checkbox"+(E?" checked":""),A.innerHTML=E?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':"";let d=document.createElement("span");return d.className="csa-item-text"+(E?" completed":""),d.innerHTML=ee(s),y.onclick=()=>{let w=!t[m];t[m]=w,S.playClick(),y.classList.toggle("completed",w),d.classList.toggle("completed",w),A.classList.toggle("checked",w),A.innerHTML=w?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':"",w&&(A.classList.add("pulse"),setTimeout(()=>A.classList.remove("pulse"),150)),oe(v,va[v])},y.appendChild(A),y.appendChild(d),{row:y,isDone:E}}function te(v,$,s){let u=document.createElement("div");u.className="csa-card";let m=document.createElement("div");m.className="csa-card-title",m.textContent=pi[$][a]||"";let E=document.createElement("span");E.className="csa-card-counter",m.appendChild(E),u.appendChild(m);let y=0;s.forEach((d,w)=>{let{row:k,isDone:z}=G(v,$,d,w);z&&y++,u.appendChild(k)});let A=y===s.length&&s.length>0;return u.classList.toggle("done",A),E.classList.toggle("done",A),E.textContent=`${y}/${s.length}`,u}function Q(){re.innerHTML="";let v=`${a} ${n}`,$=va[v];if(!$){re.innerHTML=`<div class="csa-empty-state"><div class="csa-empty-state-icon">\u2615</div><div>${be("scriptNotConfigured")}</div></div>`,T.style.width="0%";return}let s=0,u=0;["inicio","meio","fim"].forEach(m=>{$[m]&&(s+=$[m].length)}),["inicio","meio","fim"].forEach(m=>{let E=$[m];!E||E.length===0||(E.forEach((y,A)=>{let d=`${v}-${m}-${A}`;t[d]&&u++}),re.appendChild(te(v,m,E)))}),ae(s,u)}function oe(v,$){let s=0,u=0;["inicio","meio","fim"].forEach(m=>{let E=$[m]||[];s+=E.length,E.forEach((y,A)=>{t[`${v}-${m}-${A}`]&&u++})}),ae(s,u),setTimeout(()=>Q(),200)}function ae(v,$){let s=v===0?0:$/v*100;T.style.width=`${s}%`,T.classList.toggle("complete",s===100)}return Q(),p}var mi={"Ponto Eletr\xF4nico":"Control de Asistencia","Ferramenta de ajuda":"Herramienta de ayuda","Intranet Google":"Intranet Google","Relat\xF3rio Follow-ups":"Informe de Follow-ups","Dashboard WFM":"Dashboard WFM","Tech Solutions SAO":"Tech Solutions SAO","Form Grava\xE7\xE3o":"Form Grabaci\xF3n","Form Escala\xE7\xE3o":"Form Escalaci\xF3n","Instru\xE7\xF5es Split":"Instrucciones Split","Single Page App":"Single Page App","Procedimento Padr\xE3o":"Procedimiento Est\xE1ndar","Valida\xE7\xE3o C\xF3digo":"Validaci\xF3n C\xF3digo","Convers\xE3o Chamada":"Conversi\xF3n Llamada","Valida\xE7\xE3o WCC":"Validaci\xF3n WCC",ECW4:"ECW4","Monitoramento EC":"Monitoreo EC","Resolu\xE7\xE3o problemas":"Resoluci\xF3n de problemas","Implementa\xE7\xE3o RMKT":"Implementaci\xF3n RMKT","Pontua\xE7\xE3o Leads":"Puntuaci\xF3n de Leads","Instala\xE7\xE3o Container":"Instalaci\xF3n Container","Instala\xE7\xE3o Config.":"Instalaci\xF3n Config.","Valida\xE7\xE3o GA4":"Validaci\xF3n GA4","Guia Dev":"Gu\xEDa Dev","Resolu\xE7\xE3o Problemas":"Resoluci\xF3n de Problemas","Dom\xEDnio Cruzado":"Dominio Cruzado","Lista Oficial":"Lista Oficial","Criador URLs":"Creador de URLs","Setup Inicial":"Setup Inicial","Otimiza\xE7\xE3o Feed":"Optimizaci\xF3n Feed","Ferramenta Interna":"Herramienta Interna",Avalia\u00E7\u00F5es:"Rese\xF1as","Feeds Offline":"Feeds Offline","Help Center":"Help Center","Guias CMS":"Gu\xEDas CMS","Solu\xE7\xF5es Iframes":"Soluciones Iframes","Ghost Ads":"Ghost Ads","Ghost Analytics":"Ghost Analytics","Ghost GTM":"Ghost GTM",Ferramenta:"Herramienta","Ghost MC":"Ghost MC","Playground JS":"Playground JS","Testador Regex":"Probador Regex","Doc. CSP":"Doc. CSP","Guia CoMo":"Gu\xEDa CoMo","Debug CoMo":"Debug CoMo","Portal Colaborador":"Portal del Colaborador","Apps e Sistemas":"Apps y Sistemas","Folha Pagamento":"N\xF3mina","Reportar problemas":"Reportar problemas","Registro chamadas":"Registro de llamadas","Erros de sistema":"Errores de sistema","BAU/Descarte/Monitoria":"BAU/Descarte/Monitoreo","Feedback positivo":"Feedback positivo","Casos dif\xEDceis":"Casos dif\xEDciles","Chat/Email Ads":"Chat/Email Ads","Chat/Email Shopping":"Chat/Email Shopping","Perfil da Empresa":"Perfil de la Empresa","Console API":"Console API","Lista de n\xFAmeros":"Lista de n\xFAmeros",Cursos:"Cursos"};function Xo(e){let t=e&&typeof e=="object"?e:{desc:e},a=t.desc||"";return se()!=="es"?a:t.descEs||mi[a]||a}var Ko={pt:{headerTitle:"Central de Links",headerDesc:"Navegue pelas categorias ou use a busca.",searchPlaceholder:"Buscar ferramenta ou SOP...",recent:"Recentes",nothingHereYet:"Nada por aqui ainda",nothingHereSub:"Os links que voc\xEA abrir aparecem aqui pra acesso r\xE1pido depois.",searchResults:"Resultados da busca",nothingFound:"Nada encontrado",noLinkMatches:e=>`Nenhum link bate com "${e}".`,copyUrl:"Copiar URL",linkCopiedToast:"Link copiado!",copyFailedToast:"N\xE3o foi poss\xEDvel copiar o link.",categoryLabels:{tasks:"Tarefas",ads:"Ads",analytics:"GA4",shopping:"Shop",tech:"Tech",hr:"RH",lm:"Forms",qa:"QA",suporte:"Ajuda"}},es:{headerTitle:"Central de Enlaces",headerDesc:"Navega por las categor\xEDas o usa la b\xFAsqueda.",searchPlaceholder:"Buscar herramienta o SOP...",recent:"Recientes",nothingHereYet:"Todav\xEDa no hay nada aqu\xED",nothingHereSub:"Los enlaces que abras aparecen aqu\xED para acceso r\xE1pido despu\xE9s.",searchResults:"Resultados de la b\xFAsqueda",nothingFound:"No se encontr\xF3 nada",noLinkMatches:e=>`Ning\xFAn enlace coincide con "${e}".`,copyUrl:"Copiar URL",linkCopiedToast:"\xA1Enlace copiado!",copyFailedToast:"No se pudo copiar el enlace.",categoryLabels:{tasks:"Tareas",ads:"Ads",analytics:"GA4",shopping:"Shop",tech:"Tech",hr:"RRHH",lm:"Forms",qa:"QA",suporte:"Ayuda"}}};function qe(e){let t=se();return Ko[t]?.[e]??Ko.pt[e]}function Jo(e){return qe("categoryLabels")[e]??nt[e]?.label??e}var nt={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}};function Qo(e){if(!Array.isArray(e)||!e.length)return!1;let t={};for(let a of e){let n=a.key;if(!n)continue;let o;try{o=JSON.parse(a.value||"{}")}catch{continue}!o.name||!o.url||(t[n]||(t[n]={label:nt[n]?.label||n,links:[]}),t[n].links.push({name:o.name,url:o.url,desc:o.desc||"",descEs:o.desc_es||""}))}if(!Object.keys(t).length)return!1;for(let a of Object.keys(nt))delete nt[a];return Object.assign(nt,t),!0}async function gi(e){let t=he.getCachedContent("links");Qo(t)&&e?.();try{let a=await he.fetchContentModule("links");Qo(a)&&e?.()}catch(a){console.warn("Central de Conte\xFAdo indispon\xEDvel; usando links embutidos.",a)}}var rt={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},st={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},Qt={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}};function bi(){if(document.getElementById("cw-links-styles"))return;let e=document.createElement("style");e.id="cw-links-styles",e.textContent=`
        .cw-links-layout { display: flex; height: calc(100% - 56px); width: 100%; position: relative; }

        /* --- SIDEBAR --- */
        .cw-links-sidebar {
            width: 80px; flex-shrink: 0; background: ${st.bgSidebar};
            border-right: 1px solid ${st.borderSubtle};
            display: flex; flex-direction: column; align-items: center;
            padding: 16px 0; overflow-y: auto; gap: 8px;
            scrollbar-width: none; z-index: 2;
        }
        .cw-links-nav-btn {
            width: 56px; height: 56px; border-radius: 16px;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            cursor: pointer; color: ${st.textSecondary};
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
        .cw-links-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: ${st.bgApp}; position: relative; z-index: 1; }

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
            padding: 0 12px; font-size: 14px; color: ${st.textPrimary};
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
        .cw-links-card-title { font-size: 14px; font-weight: 600; color: ${st.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-links-card-desc { font-size: 12px; color: ${st.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

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
    `,document.head.appendChild(e)}var wa="cw_link_history_v4",fi=10;function Zo(e,t){try{let a=JSON.parse(localStorage.getItem(wa)||"[]");a=a.filter(n=>n.url!==e.url),a.unshift({...e,_originalCat:t}),a=a.slice(0,fi),localStorage.setItem(wa,JSON.stringify(a))}catch(a){console.warn("Erro ao salvar hist\xF3rico",a)}}function hi(){try{return JSON.parse(localStorage.getItem(wa)||"[]")}catch{return[]}}function en(){let e="v4.6",t="",a=!1,n=null,o=!1;bi();let i=document.createElement("div");i.id="links-popup",i.classList.add("cw-module-window"),Object.assign(i.style,De,{right:"100px",width:"600px",height:"650px",background:st.bgApp,overflow:"hidden"});let r={popup:i,googleLine:null},l=Ie(i,qe("headerTitle"),e,qe("headerDesc"),r,()=>V());i.appendChild(l);let c=l.querySelector("span"),h=document.createElement("div");h.className="cw-links-layout",i.appendChild(h);let p=document.createElement("div");p.className="cw-links-sidebar",h.appendChild(p);let f=document.createElement("div");f.className="cw-links-content",h.appendChild(f);let b=document.createElement("div");b.className="cw-links-search-bar";let g=document.createElement("div");g.className="cw-links-search-wrap";let O=document.createElement("div");O.className="cw-links-search-icon",O.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';let C=document.createElement("input");C.className="cw-links-search-input",C.type="text",C.placeholder=qe("searchPlaceholder"),g.appendChild(O),g.appendChild(C),b.appendChild(g),f.appendChild(b);let x=document.createElement("div");x.className="cw-links-scroll",f.appendChild(x);let L=null;function j(){if(L)return;L=document.createElement("div"),L.className="cw-links-history-overlay";let _=document.createElement("div");_.className="cw-links-history-head",_.innerHTML=`<span class="cw-links-history-title js-links-recent">\u{1F552} ${qe("recent")}</span>`;let Z=document.createElement("button");Z.className="cw-links-history-close",Z.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',Z.onclick=()=>I(),_.appendChild(Z),L.appendChild(_);let ie=document.createElement("div");ie.id="cw-history-list",ie.className="cw-links-history-list",L.appendChild(ie),f.appendChild(L)}function I(){o&&(o=!1,N(),B())}function F(){L||j();let _=L.querySelector("#cw-history-list");_.innerHTML="";let Z=hi();Z.length===0?_.appendChild(Ct({icon:rt.history,title:qe("nothingHereYet"),subtitle:qe("nothingHereSub")})):Z.forEach(ie=>{let re=U(ie,rt[ie._originalCat],!0,ie._originalCat);_.appendChild(re)}),requestAnimationFrame(()=>L.style.transform="translateY(0)")}function N(){L&&(L.style.transform="translateY(100%)")}document.addEventListener("mousedown",_=>{!o||!L||!L.contains(_.target)&&!p.contains(_.target)&&I()}),document.addEventListener("keydown",_=>{_.key==="Escape"&&o&&I()});function R(){p.innerHTML="";let _=T("history",qe("recent"),rt.history);_.id="cw-sidebar-btn-history",_.onclick=()=>{S.playClick(),o=!o,o?F():N(),B()},p.appendChild(_);let Z=document.createElement("div");Z.className="cw-links-nav-sep",p.appendChild(Z),Object.keys(nt).forEach(ie=>{let re=T(ie,Jo(ie),rt[ie]);re.id=`cw-sidebar-btn-${ie}`,re.onclick=()=>{S.playClick(),o&&I(),q(ie)},p.appendChild(re)})}function T(_,Z,ie){let re=document.createElement("div");re.className="cw-links-nav-btn",re.title=Z,re.dataset.key=_;let W=Qt[_];W&&(re.style.setProperty("--cat-color",W.color),re.style.setProperty("--cat-bg",W.bg));let ee=document.createElement("div");ee.className="cw-links-nav-icon",ee.innerHTML=ie||rt.tasks;let G=document.createElement("div");return G.className="cw-links-nav-label",G.textContent=Z,re.appendChild(ee),re.appendChild(G),re}function q(_){let Z=document.getElementById(`cat-anchor-${_}`);Z&&(Z.scrollIntoView({behavior:"smooth",block:"start"}),n=_,B())}function B(){Object.keys(nt).forEach(Z=>{let ie=p.querySelector(`#cw-sidebar-btn-${Z}`);ie&&ie.classList.toggle("active",n===Z&&!o)});let _=p.querySelector("#cw-sidebar-btn-history");_&&_.classList.toggle("history-open",o)}function P(){if(x.innerHTML="",t.trim()!==""){let Z=[];if(Object.entries(nt).forEach(([re,W])=>{let ee=W.links.filter(G=>G.name.toLowerCase().includes(t.toLowerCase())||Xo(G).toLowerCase().includes(t.toLowerCase()));Z.push(...ee.map(G=>({...G,_cat:re})))}),Z.length===0){x.appendChild(Ct({icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',title:qe("nothingFound"),subtitle:qe("noLinkMatches")(t.trim())}));return}let ie=document.createElement("div");ie.className="cw-links-search-results-label",ie.textContent=qe("searchResults"),x.appendChild(ie),Z.forEach(re=>{let W=U(re,rt[re._cat],!1,re._cat);x.appendChild(W)});return}Object.entries(nt).forEach(([Z,ie])=>{let re=Qt[Z],W=document.createElement("div"),ee=document.createElement("div");ee.id=`cat-anchor-${Z}`,ee.className="cw-links-cat-header",ee.style.setProperty("--cat-color",re.color),ee.innerHTML=`<div class="cw-links-cat-dot"></div>${Jo(Z)}`,W.appendChild(ee);let G=document.createElement("div");G.className="cw-links-cat-grid",ie.links.forEach(te=>{let Q=U(te,rt[Z],!1,Z);G.appendChild(Q)}),W.appendChild(G),x.appendChild(W)});let _=document.createElement("div");_.className="cw-links-spacer",x.appendChild(_)}function U(_,Z,ie,re){let W=document.createElement("a");W.className="cw-links-card",W.href=_.url,W.target="_blank",W.rel="noopener noreferrer";let ee=Qt[re]||Qt.history;W.style.setProperty("--cat-color",ee.color),W.style.setProperty("--cat-bg",ee.bg);let G=document.createElement("div");G.className="cw-links-icon-box",G.innerHTML=Z||rt.tasks;let te=document.createElement("div");te.className="cw-links-card-meta";let Q=document.createElement("div");Q.className="cw-links-card-title",Q.textContent=_.name;let oe=document.createElement("div");oe.className="cw-links-card-desc",oe.textContent=Xo(_),te.appendChild(Q),te.appendChild(oe);let ae=document.createElement("div");return ae.className="cw-links-copy-btn",ae.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',ae.title=qe("copyUrl"),W.onclick=()=>{!ie&&re&&Zo(_,re)},ae.onclick=v=>{v.preventDefault(),v.stopPropagation(),navigator.clipboard.writeText(_.url).then(()=>{S.playClick(),!ie&&re&&Zo(_,re),J(qe("linkCopiedToast"))}).catch(()=>{S.playError(),J(qe("copyFailedToast"),{error:!0})})},W.appendChild(G),W.appendChild(te),W.appendChild(ae),W}C.addEventListener("input",_=>{t=_.target.value,P()});function V(){a=!a,a?Se():Ee(),Le(a,i,"cw-btn-links")}return document.body.appendChild(i),R(),P(),gi(()=>{R(),P(),B()}),ye(()=>{c&&(c.textContent=qe("headerTitle"));let _=i.querySelector(".cw-help-title");_&&(_.textContent=qe("headerTitle"));let Z=i.querySelector(".cw-help-description");Z&&(Z.textContent=qe("headerDesc")),C.placeholder=qe("searchPlaceholder"),R(),P(),B(),o&&F()}),V}var lt=[];function Sa(e){lt=e}var xi=60*1e3,tn={pt:{headerTitle:"Central de Avisos",headerDesc:"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",newNotice:"Novo Aviso",clear:"Limpar",searchPlaceholder:"Buscar avisos...",editNotice:"Editar Aviso",saveChanges:"Salvar Altera\xE7\xF5es",publish:"Publicar",saving:"Salvando...",noticeTypeLabel:"TIPO DO COMUNICADO",typeInfo:"\u2139\uFE0F Info",typeCritical:"\u{1F6A8} Alerta",typeSuccess:"\u2705 Sucesso",titleLabel:"T\xCDTULO",titlePlaceholder:"Resumo do assunto",messageLabel:"MENSAGEM",messagePlaceholder:"Escreva os detalhes aqui... Suporta HTML e Emojis :)",cancel:"Cancelar",fillAllFields:"Preencha todos os campos!",updatedToast:"Atualizado!",publishedToast:"Publicado!",saveErrorToast:"Erro ao salvar. Verifique a conex\xE3o.",deleteConfirm:"Confirma a exclus\xE3o deste aviso?",deletedToast:"Aviso removido.",deleteErrorToast:"Erro ao excluir.",details:"Detalhes",hide:"Ocultar",bauAvailability:"Disponibilidade BAU",dates:"datas",date:"data",viewDetails:"Ver detalhes",nothingFound:"Nada encontrado.",allRead:"Tudo lido!",history:e=>`Hist\xF3rico (${e})`,edit:"Editar",delete:"Excluir",typeLabel:{info:"Info",critical:"Alerta",success:"Sucesso"},syncing:"\u{1F504} Sincronizando...",updated:'<span style="color:#137333">\u2713 Atualizado</span>',offline:"\u26A0\uFE0F Offline"},es:{headerTitle:"Central de Avisos",headerDesc:"Comunicaci\xF3n oficial de la operaci\xF3n.",newNotice:"Nuevo Aviso",clear:"Limpiar",searchPlaceholder:"Buscar avisos...",editNotice:"Editar Aviso",saveChanges:"Guardar Cambios",publish:"Publicar",saving:"Guardando...",noticeTypeLabel:"TIPO DE COMUNICADO",typeInfo:"\u2139\uFE0F Info",typeCritical:"\u{1F6A8} Alerta",typeSuccess:"\u2705 \xC9xito",titleLabel:"T\xCDTULO",titlePlaceholder:"Resumen del asunto",messageLabel:"MENSAJE",messagePlaceholder:"Escribe los detalles aqu\xED... Admite HTML y Emojis :)",cancel:"Cancelar",fillAllFields:"\xA1Complete todos los campos!",updatedToast:"\xA1Actualizado!",publishedToast:"\xA1Publicado!",saveErrorToast:"Error al guardar. Verifique la conexi\xF3n.",deleteConfirm:"\xBFConfirma la eliminaci\xF3n de este aviso?",deletedToast:"Aviso eliminado.",deleteErrorToast:"Error al eliminar.",details:"Detalles",hide:"Ocultar",bauAvailability:"Disponibilidad BAU",dates:"fechas",date:"fecha",viewDetails:"Ver detalles",nothingFound:"No se encontr\xF3 nada.",allRead:"\xA1Todo le\xEDdo!",history:e=>`Historial (${e})`,edit:"Editar",delete:"Eliminar",typeLabel:{info:"Info",critical:"Alerta",success:"\xC9xito"},syncing:"\u{1F504} Sincronizando...",updated:'<span style="color:#137333">\u2713 Actualizado</span>',offline:"\u26A0\uFE0F Sin conexi\xF3n"}};function ne(e){let t=se();return tn[t]?.[e]??tn.pt[e]}var Ea={critical:{icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function yi(){if(document.getElementById("cw-broadcast-styles"))return;let e=document.createElement("style");e.id="cw-broadcast-styles",e.textContent=`
        @keyframes cw-bc-pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(147, 51, 234, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(147, 51, 234, 0); }
        }

        .cw-btn-interactive { transition: transform 0.1s ease, background 0.2s ease; cursor: pointer; user-select: none; }
        .cw-btn-interactive:active { transform: scale(0.96); }

        /* --- BUSCA --- */
        /* padding vertical sim\xE9trico (12px em cima E embaixo) \xE9 o que importa
           aqui: os \xEDcones s\xE3o posicionados com top:50% relativo \xE0 caixa do
           wrap, que inclui o padding. Com padding-top/bottom diferentes
           (era 12px/0), os 50% do wrap n\xE3o batiam com o centro vertical
           real do input \u2014 os \xEDcones ficavam "flutuando" alguns pixels acima. */
        .cw-bc-search-wrap { position: relative; padding: 12px 24px; flex-shrink: 0; background: #FAFAFA; }
        .cw-bc-search-icon { position: absolute; left: 36px; top: 50%; transform: translateY(-50%); color: #80868b; pointer-events: none; display: flex; }
        .cw-bc-search-input {
            width: 100%; box-sizing: border-box; height: 36px; padding: 0 34px 0 34px;
            border-radius: 10px; border: 1px solid #DADCE0; background: #fff;
            font-size: 13px; font-family: 'Google Sans', Roboto, sans-serif; color: #202124; outline: none;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .cw-bc-search-input::placeholder { color: #9aa0a6; }
        .cw-bc-search-input:focus { border-color: #1a73e8; box-shadow: 0 0 0 3px rgba(26,115,232,0.14); }
        .cw-bc-search-clear {
            position: absolute; right: 30px; top: 50%; transform: translateY(-50%);
            width: 20px; height: 20px; border-radius: 50%; display: none;
            align-items: center; justify-content: center; color: #80868b; cursor: pointer;
        }
        .cw-bc-search-clear:hover { background: rgba(0,0,0,0.06); }
        .cw-bc-search-clear.visible { display: flex; }

        /* --- FEED --- */
        .cw-bc-feed { padding: 20px 24px 80px 24px; overflow-y: auto; flex-grow: 1; background: #F8F9FA; display: flex; flex-direction: column; gap: 20px; }

        .cw-bc-card {
            background: #FFFFFF; border-radius: 16px; border: 1px solid rgba(0,0,0,0.12);
            box-shadow: 0 4px 12px rgba(60,64,67,0.08);
            overflow: hidden; transition: opacity 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease; position: relative; width: 100%; box-sizing: border-box; flex-shrink: 0;
        }
        .cw-bc-card.history {
            border: 1px solid rgba(0,0,0,0.05); box-shadow: none; opacity: 0.6; filter: grayscale(0.8);
            margin-bottom: 16px;
        }

        .cw-bc-card-head { padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4; }
        .cw-bc-type-tag { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; padding: 4px 8px; border-radius: 6px; }
        .cw-bc-type-tag.critical { color: #991B1B; background: #FEF2F2; }
        .cw-bc-type-tag.info { color: #1E40AF; background: #EFF6FF; }
        .cw-bc-type-tag.success { color: #166534; background: #F0FDF4; }
        .cw-bc-date-tag { font-size: 11px; color: #5f6368; font-weight: 500; }
        .cw-bc-card-content { padding: 16px 20px 20px 20px; }
        .cw-bc-msg-title { font-size: 16px; font-weight: 700; color: #202124; margin-bottom: 8px; line-height: 1.4; }
        .cw-bc-msg-body { font-size: 14px; color: #3c4043; line-height: 1.6; white-space: pre-wrap; word-break: break-word; }
        /* Global (n\xE3o escopado a .cw-bc-msg-body): parseMessageText() \xE9 usada
           tanto nos cards normais quanto no texto do widget BAU. */
        .cw-bc-link { color: #1967d2; text-decoration: none; font-weight: 500; }
        .cw-bc-msg-meta { font-size: 11px; color: #9aa0a6; margin-top: 12px; display: flex; align-items: center; gap: 6px; }

        .cw-bc-dismiss-btn {
            width: 28px; height: 28px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.1);
            background: #fff; color: #5f6368; cursor: pointer; display: flex; align-items: center; justify-content: center;
            transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease; margin-left: 12px;
        }
        .cw-bc-dismiss-btn:hover { color: #1e8e3e; background: #e6f4ea; border-color: #1e8e3e; }

        .cw-card-actions { display: flex; justify-content: flex-end; gap: 12px; padding: 12px 20px; background: #F8F9FA; border-top: 1px solid #F1F3F4; }
        .cw-action-btn { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; border: 1px solid transparent; background: transparent; transition: background-color 0.2s; }
        .cw-action-btn.edit { color: #1967D2; }
        .cw-action-btn.edit:hover { background: #E8F0FE; }
        .cw-action-btn.delete { color: #D93025; }
        .cw-action-btn.delete:hover { background: #FCE8E6; }

        .cw-bc-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 0; color: #BDC1C6; gap: 16px; text-align: center; }
        .cw-bc-history-divider { display: flex; align-items: center; justify-content: center; margin: 20px 0; cursor: pointer; color: #1a73e8; font-size: 13px; font-weight: 500; gap: 8px; padding: 8px 16px; border-radius: 20px; background: #E8F0FE; }
        .cw-bc-history-container { display: none; flex-direction: column; gap: 16px; opacity: 0.8; }

        /* --- WIDGET BAU (destaque proposital, paleta roxa pr\xF3pria) ---
           Papel secund\xE1rio por padr\xE3o: s\xF3 a faixa de resumo (cw-bc-bau-header)
           fica sempre vis\xEDvel, compacta. O conte\xFAdo completo (mesmo layout de
           sempre \u2014 slots, bot\xF5es, texto integral) s\xF3 aparece expandido, com
           1 clique na faixa. Quem usa BAU com frequ\xEAncia (LM) expande e o
           app lembra disso enquanto o popup ficar aberto; pra todo mundo
           que s\xF3 passa o olho nos avisos gerais, ele ocupa bem menos espa\xE7o. */
        .cw-bc-bau { margin: 16px 24px 0 24px; padding: 12px 16px; background: #F3E8FD; border: 1px solid #D8B4FE; border-radius: 16px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 4px 12px rgba(147, 51, 234, 0.1); transition: padding 0.25s ease; }
        .cw-bc-bau.expanded { padding: 16px; }
        .cw-bc-bau-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; cursor: pointer; }
        .cw-bc-bau.expanded .cw-bc-bau-header { margin-bottom: -4px; }
        .cw-bc-bau-timestamp { font-size: 10px; opacity: 0.7; color: #7E22CE; flex-shrink: 0; }
        .cw-bc-live-indicator { display: flex; align-items: center; gap: 8px; min-width: 0; }
        .cw-bc-pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #9333EA; box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.7); animation: cw-bc-pulse 2s infinite; flex-shrink: 0; }
        .cw-bc-bau-label { font-size: 11px; font-weight: 800; color: #7E22CE; text-transform: uppercase; letter-spacing: 0.8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-bc-bau-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .cw-bc-bau-hint { font-size: 11px; font-weight: 600; color: #6D28D9; white-space: nowrap; }
        .cw-bc-bau.expanded .cw-bc-bau-hint { display: none; }
        .cw-bc-bau-chevron { color: #7E22CE; transition: transform 0.25s ease; flex-shrink: 0; }
        .cw-bc-bau.expanded .cw-bc-bau-chevron { transform: rotate(180deg); }
        .cw-bc-bau-detail { display: none; flex-direction: column; gap: 12px; }
        .cw-bc-bau.expanded .cw-bc-bau-detail { display: flex; }
        .cw-bc-bau-slots { display: flex; justify-content: space-between; align-items: center; }
        .cw-bc-bau-slots-row { flex: 1; display: flex; gap: 8px; }
        .cw-bc-bau-slot { display: flex; align-items: center; gap: 10px; padding: 8px 12px; background: rgba(255,255,255,0.5); border-radius: 8px; flex: 1; justify-content: center; }
        .cw-bc-bau-flag { font-size: 18px; line-height: 1; }
        .cw-bc-bau-date { font-size: 16px; font-weight: 700; color: #581C87; letter-spacing: -0.5px; }
        .cw-bc-bau-actions { display: flex; gap: 8px; margin-left: 12px; align-items: center; }
        .cw-bc-bau-toggle-btn { background: rgba(255,255,255,0.7); border: 1px solid rgba(139, 92, 246, 0.4); border-radius: 12px; padding: 8px 12px; color: #6D28D9; font-size: 12px; font-weight: 600; }
        .cw-bc-bau-edit-btn { border: 1px solid rgba(139, 92, 246, 0.2); background: rgba(255,255,255,0.5); border-radius: 12px; padding: 8px; color: #6D28D9; display: flex; align-items: center; justify-content: center; }
        .cw-bc-bau-edit-btn.compact { border: none; border-radius: 6px; padding: 6px; }
        .cw-bc-bau-full { display: none; margin-top: 12px; padding-top: 12px; border-top: 1px dashed rgba(139, 92, 246, 0.3); font-size: 13px; line-height: 1.5; color: #581C87; }
        .cw-bc-bau-plain { display: flex; justify-content: space-between; align-items: flex-start; }
        .cw-bc-bau-plain-text { font-size: 13px; color: #581C87; line-height: 1.5; flex: 1; }

        /* --- EDITOR --- */
        .cw-editor-overlay {
            position: absolute; inset: 0; background: rgba(255, 255, 255, 0.98);
            z-index: 200; display: flex; flex-direction: column;
            transform: translateY(100%); transition: transform 0.35s var(--cw-ease-elastic);
            box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
        }
        .cw-editor-overlay.active { transform: translateY(0); }
        .cw-bc-editor-body { flex: 1; overflow-y: auto; padding: 24px; }
        .cw-bc-editor-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .cw-bc-editor-title { font-size: 20px; font-weight: 700; color: #202124; }
        .cw-bc-editor-field { margin-bottom: 20px; }
        .cw-bc-field-label { font-size: 12px; font-weight: 700; color: #5f6368; margin-bottom: 8px; display: block; }
        .cw-bc-editor-foot { padding: 16px 24px; border-top: 1px solid #F1F3F4; background: #fff; display: flex; justify-content: flex-end; gap: 12px; }

        .cw-hd-input {
            width: 100%; padding: 12px 14px; border: 1px solid #DADCE0; border-radius: 12px;
            font-size: 14px; color: #202124; background: #FFF;
            transition: border 0.2s, box-shadow 0.2s; box-sizing: border-box; outline: none; font-family: 'Google Sans', Roboto, sans-serif;
        }
        .cw-hd-input:focus { border-color: #1a73e8; box-shadow: 0 0 0 3px rgba(26,115,232,0.1); }
        .cw-hd-input::placeholder { color: #9AA0A6; }

        .cw-radio-group { display: flex; gap: 12px; }
        .cw-radio-option {
            flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
            padding: 12px; border-radius: 12px; border: 1px solid #E0E0E0;
            font-size: 13px; font-weight: 600; cursor: pointer; transition: background-color 0.2s, color 0.2s, border-color 0.2s; position: relative; color: #5F6368;
        }
        .cw-radio-option:hover { background: #F8F9FA; }
        .cw-radio-option input { position: absolute; opacity: 0; }
        .cw-radio-option.info.checked { background: #E8F0FE; color: #1967D2; border-color: #1967D2; }
        .cw-radio-option.critical.checked { background: #FEE2E2; color: #B91C1C; border-color: #EF4444; }
        .cw-radio-option.success.checked { background: #DCFCE7; color: #15803D; border-color: #22C55E; }

        .cw-bc-btn-secondary { padding: 10px 20px; background: white; border: 1px solid #dadce0; color: #5f6368; border-radius: 24px; font-weight: 600; font-size: 13px; }
        .cw-bc-btn-primary { padding: 10px 24px; background: #1a73e8; color: white; border: none; border-radius: 24px; font-weight: 600; box-shadow: 0 4px 12px rgba(26,115,232,0.3); font-size: 13px; }
        .cw-bc-editor-close { background: none; border: none; color: #5f6368; padding: 8px; }

        @media (prefers-reduced-motion: reduce) {
            .cw-bc-pulse-dot { animation: none !important; }
            .cw-bc-card, .cw-bc-bau, .cw-bc-bau-chevron, .cw-editor-overlay {
                transition: opacity 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}function Ca(e){if(!e)return"";try{let t=new Date(e);return isNaN(t.getTime())?String(e):t.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(e)}}function Aa(e){if(!e||typeof e!="string")return"";let t=e;return t=t.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" class="cw-bc-link">$1</a>'),t=t.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),t=t.replace(/_(.*?)_/g,"<i>$1</i>"),t=t.replace(/\n/g,"<br>"),t=oo(t),t}function vi(e){let t=[],a=(e||"").split(`
`),n=/\d{1,2}\/\d{1,2}/,o="\u{1F4C5}";if(a.forEach(i=>{/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(i)?o="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(i)&&(o="\u{1F1EA}\u{1F1F8}");let r=i.match(n);if(r){let l=r[0],c=o;/🇧🇷|🇵🇹|PT|BR/i.test(i)?c="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(i)&&(c="\u{1F1EA}\u{1F1F8}"),t.some(p=>p.flag===c&&p.date===l)||t.push({flag:c,date:l})}}),t.length===0){let i=(e||"").match(/\d{1,2}\/\d{1,2}/g);i&&[...new Set(i)].forEach(r=>t.push({flag:"\u{1F4C5}",date:r}))}return t}function an(){let e="v4.9",t=!1,a=null,n=null,o="",i=!1,r=!1,l=null,c=0,h=null;yi();let p=document.createElement("div");p.id="broadcast-popup",p.classList.add("cw-module-window"),Object.assign(p.style,De,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let f={popup:p,googleLine:null};function b(){if(t=!t,Le(t,p,"cw-btn-broadcast"),t){Se();let v=document.getElementById("cw-btn-broadcast");v&&v.classList.remove("has-new"),_()}else Ee()}let g=Ie(p,ne("headerTitle"),e,ne("headerDesc"),f,()=>b()),O=g.querySelector("span"),C=g.querySelector(".cw-header-actions")||g.lastElementChild,x=null;function L(){let v=null;try{v=ke()}catch{console.warn("TechSol: Auth Pending")}if(v){if(l=v.split("@")[0].toLowerCase(),r=Ut.includes(l),r&&C&&!C.querySelector("#cw-admin-btn")){let $=document.createElement("div");$.id="cw-admin-btn",$.className="cw-btn-interactive",$.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign($.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),$.title=ne("newNotice"),$.onclick=s=>{s.stopPropagation(),q()},C.insertBefore($,C.firstChild),x||T(),ee()}}else c<5&&(c++,setTimeout(L,2e3))}if(C){let v=document.createElement("button");v.textContent=ne("clear"),v.className="cw-btn-interactive",Object.assign(v.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),v.onclick=$=>{$.stopPropagation(),S.playSuccess();let s=lt.map(u=>u.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(s)),ee(),Z()},C.insertBefore(v,C.firstChild)}p.appendChild(g);let j=document.createElement("div");j.className="cw-bc-search-wrap";let I=document.createElement("div");I.className="cw-bc-search-icon",I.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';let F=document.createElement("input");F.className="cw-bc-search-input no-drag",F.type="text",F.placeholder=ne("searchPlaceholder");let N=document.createElement("div");N.className="cw-bc-search-clear cw-btn-interactive",N.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',j.append(I,F,N),p.appendChild(j),F.addEventListener("input",v=>{o=v.target.value,N.classList.toggle("visible",o.length>0),ee()}),N.onclick=()=>{F.value="",o="",N.classList.remove("visible"),ee(),F.focus()};let R=document.createElement("div");R.id="cw-update-status",R.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",p.appendChild(R);function T(){x=document.createElement("div"),x.className="cw-editor-overlay",x.innerHTML=`
        <div class="cw-bc-editor-body">
            <div class="cw-bc-editor-head">
                <span id="cw-editor-title-label" class="cw-bc-editor-title">${ne("newNotice")}</span>
                <button id="cw-bc-close-x" class="cw-btn-interactive cw-bc-editor-close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            </div>

            <div class="cw-bc-editor-field">
                <label class="cw-bc-field-label js-bc-type-label">${ne("noticeTypeLabel")}</label>
                <div class="cw-radio-group">
                    <div class="cw-radio-option info" onclick="this.querySelector('input').click()">
                        <input type="radio" name="cw-bc-type" value="info" checked> <span class="js-bc-type-info">${ne("typeInfo")}</span>
                    </div>
                    <div class="cw-radio-option critical" onclick="this.querySelector('input').click()">
                        <input type="radio" name="cw-bc-type" value="critical"> <span class="js-bc-type-critical">${ne("typeCritical")}</span>
                    </div>
                    <div class="cw-radio-option success" onclick="this.querySelector('input').click()">
                        <input type="radio" name="cw-bc-type" value="success"> <span class="js-bc-type-success">${ne("typeSuccess")}</span>
                    </div>
                </div>
            </div>

            <div class="cw-bc-editor-field">
                 <label class="cw-bc-field-label js-bc-title-label">${ne("titleLabel")}</label>
                 <input id="cw-bc-title" class="cw-hd-input" placeholder="${ne("titlePlaceholder")}">
            </div>

            <div class="cw-bc-editor-field">
                 <label class="cw-bc-field-label js-bc-message-label">${ne("messageLabel")}</label>
                 <textarea id="cw-bc-text" class="cw-hd-input" placeholder="${ne("messagePlaceholder")}" style="height:160px; resize:none; line-height:1.6;"></textarea>
            </div>
        </div>

        <div class="cw-bc-editor-foot">
            <button id="cw-bc-cancel" class="cw-btn-interactive cw-bc-btn-secondary">${ne("cancel")}</button>
            <button id="cw-bc-send" class="cw-btn-interactive cw-bc-btn-primary">${ne("publish")}</button>
        </div>
      `,x.querySelectorAll('input[name="cw-bc-type"]').forEach(u=>{u.addEventListener("change",()=>{x.querySelectorAll(".cw-radio-option").forEach(m=>m.classList.remove("checked")),u.parentElement.classList.add("checked")})}),setTimeout(()=>{let u=x.querySelector(".cw-radio-option.info");u&&u.classList.add("checked")},100);let v=x.querySelector("#cw-bc-cancel"),$=x.querySelector("#cw-bc-close-x"),s=x.querySelector("#cw-bc-send");v.onclick=B,$.onclick=B,s.onclick=P,p.appendChild(x)}function q(v=null){if(!x)return;let $=x.querySelector("#cw-editor-title-label"),s=x.querySelector("#cw-bc-title"),u=x.querySelector("#cw-bc-text"),m=x.querySelector("#cw-bc-send");if(v){n=v.id,$.textContent=ne("editNotice"),s.value=v.title||"",u.value=v.text||"",m.textContent=ne("saveChanges");let E=v.type||"info",y=x.querySelector(`input[name="cw-bc-type"][value="${E}"]`);y&&y.click()}else{n=null,$.textContent=ne("newNotice"),s.value="",u.value="",m.textContent=ne("publish");let E=x.querySelector('input[name="cw-bc-type"][value="info"]');E&&E.click()}x.classList.add("active"),setTimeout(()=>s.focus(),300)}function B(){x&&x.classList.remove("active"),n=null}async function P(){let v=x.querySelector("#cw-bc-send"),$=x.querySelector("#cw-bc-title"),s=x.querySelector("#cw-bc-text"),u=x.querySelector('input[name="cw-bc-type"]:checked'),m=u?u.value:"info";if(!$.value.trim()||!s.value.trim()){S.playError(),J(ne("fillAllFields"),{error:!0});return}v.textContent=ne("saving"),v.style.opacity="0.7";let E=!1;n?E=await he.updateBroadcast(n,{title:$.value,text:s.value,type:m}):E=await he.sendBroadcast({title:$.value,text:s.value,type:m,author:l||"admin"}),E?(J(ne(n?"updatedToast":"publishedToast")),S.playSuccess(),B(),setTimeout(()=>_(),1500)):(S.playError(),J(ne("saveErrorToast"),{error:!0}),v.textContent=ne(n?"saveChanges":"publish"),v.style.opacity="1")}async function U(v){if(await Te(ne("deleteConfirm"),{danger:!0}))if(await he.deleteBroadcast(v)){J(ne("deletedToast")),S.playClick();let u=lt.findIndex(m=>m.id===v);u>-1&&lt.splice(u,1),ee(),setTimeout(()=>_(),1500)}else S.playError(),J(ne("deleteErrorToast"),{error:!0})}let V=document.createElement("div");V.className="cw-nice-scroll cw-bc-feed",p.appendChild(V);async function _(){t&&(R.style.display="block",R.innerHTML=ne("syncing"));try{let v=await he.fetchData();if(v&&v.broadcast){if(h&&!t){let $=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");v.broadcast.some(u=>!h.has(u.id)&&!$.includes(u.id))&&S.playNotification()}h=new Set(v.broadcast.map($=>$.id)),Sa(v.broadcast),Z(),t&&(ee(),R.innerHTML=ne("updated"),setTimeout(()=>{R.style.display="none"},1500))}}catch{t&&(R.innerHTML=ne("offline"))}}function Z(){let v=document.getElementById("cw-btn-broadcast");if(!v)return;let $=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(lt.some(u=>!$.includes(u.id))){if(v.classList.add("has-new"),!v.querySelector(".cw-badge")){let u=document.createElement("div");u.className="cw-badge",Object.assign(u.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),v.appendChild(u)}}else{v.classList.remove("has-new");let u=v.querySelector(".cw-badge");u&&u.remove()}}function ie(v,$){return $?`${v.title||""} ${v.text||""}`.toLowerCase().includes($):!0}function re(v){let $=p.querySelector("#cw-bau-widget");$&&$.remove();let s=document.createElement("div");s.id="cw-bau-widget",s.className="cw-bc-bau";let u=vi(v.text),m="",E=`<button id="cw-bau-toggle-btn" class="cw-btn-interactive cw-bc-bau-toggle-btn">${ne("details")}</button>`;r&&(E=`
            <button class="cw-bau-edit cw-btn-interactive cw-bc-bau-edit-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            ${E}
          `),u.length>0?m=`
              <div class="cw-bc-bau-slots">
                  <div class="cw-bc-bau-slots-row">${u.map(D=>`
              <div class="cw-bc-bau-slot">
                  <span class="cw-bc-bau-flag">${D.flag}</span>
                  <span class="cw-bc-bau-date">${D.date}</span>
              </div>
          `).join("")}</div>
                  <div class="cw-bc-bau-actions">${E}</div>
              </div>
              <div id="cw-bau-full" class="cw-bc-bau-full">${Aa(v.text)}</div>
          `:m=`
            <div class="cw-bc-bau-plain">
                <div class="cw-bc-bau-plain-text">${Aa(v.text)}</div>
                ${r?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive cw-bc-bau-edit-btn compact">\u270F\uFE0F</button></div>':""}
            </div>
          `;let y=[...new Set(u.map(z=>z.flag))].join(""),A=u.length>0?`${y} \xB7 ${u.length} ${u.length>1?ne("dates"):ne("date")}`:ne("viewDetails");s.className="cw-bc-bau"+(i?" expanded":""),s.innerHTML=`
          <div class="cw-bc-bau-header cw-btn-interactive">
              <div class="cw-bc-live-indicator">
                  <div class="cw-bc-pulse-dot"></div>
                  <span class="cw-bc-bau-label">${ne("bauAvailability")}</span>
              </div>
              <div class="cw-bc-bau-right">
                  <span class="cw-bc-bau-hint">${A}</span>
                  <span class="cw-bc-bau-timestamp">${Ca(v.date)}</span>
                  <svg class="cw-bc-bau-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
          </div>
          <div class="cw-bc-bau-detail">${m}</div>
      `,R.after(s);let d=s.querySelector(".cw-bc-bau-header");d.onclick=()=>{i=!i,s.classList.toggle("expanded",i),S.playClick()};let w=s.querySelector("#cw-bau-toggle-btn"),k=s.querySelector("#cw-bau-full");if(w&&k&&(w.onclick=z=>{z.stopPropagation();let D=k.style.display==="none"||!k.style.display;k.style.display=D?"block":"none",w.textContent=ne(D?"hide":"details")}),r){let z=s.querySelector(".cw-bau-edit");z&&(z.onclick=D=>{D.stopPropagation(),q(v)})}}function W(v,$,s){let u=v.sort((A,d)=>{let w=$.includes(A.id),k=$.includes(d.id);return w===k?0:w?1:-1}),m=o.trim().length>0;if(u.length===0&&!s){let A=document.createElement("div");A.className="cw-bc-empty",A.innerHTML=m?`<div style="font-weight:500;">${ne("nothingFound")}</div>`:`
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
                <div style="font-weight:500;">${ne("allRead")}</div>
               `,V.appendChild(A);return}let E=u.filter(A=>!$.includes(A.id)),y=u.filter(A=>$.includes(A.id));if(E.forEach(A=>V.appendChild(G(A,!1))),y.length>0){let A=document.createElement("div");A.className="cw-bc-history-divider",A.innerHTML=`<span>${ne("history")(y.length)}</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let d=document.createElement("div");d.className="cw-bc-history-container",y.forEach(k=>d.appendChild(G(k,!0)));let w=!1;A.onclick=()=>{S.playClick(),w=!w,d.style.display=w?"flex":"none",A.querySelector("svg").style.transform=w?"rotate(180deg)":"rotate(0deg)"},V.appendChild(A),V.appendChild(d)}}function ee(){V.innerHTML="";let v=p.querySelector("#cw-bau-widget");v&&v.remove();let $=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),s=[...lt].sort((A,d)=>{let w=new Date(A.date).getTime()||0;return(new Date(d.date).getTime()||0)-w}),u=s.findIndex(A=>A.title&&A.title.toLowerCase().includes("disponibilidade bau")),m=!1;if(u!==-1){let A=s[u];s.splice(u,1),re(A),m=!0}let E=o.trim().toLowerCase(),y=s.filter(A=>ie(A,E));W(y,$,m)}function G(v,$){let s=document.createElement("div");s.className="cw-bc-card"+($?" history":"");let u=Ea[v.type]||Ea.info,m=document.createElement("div");m.className="cw-bc-card-head";let E=Ea[v.type]?v.type:"info",y=document.createElement("div");y.className="cw-bc-type-tag "+E,y.innerHTML=`${u.icon} <span>${ne("typeLabel")[E]}</span>`;let A=document.createElement("span");if(A.className="cw-bc-date-tag",A.textContent=Ca(v.date),m.appendChild(y),$)m.appendChild(A);else{let D=document.createElement("button");D.className="cw-btn-interactive cw-bc-dismiss-btn",D.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',D.onclick=Y=>{Y.stopPropagation(),S.playClick(),s.style.transform="translateX(20px)",s.style.opacity="0",setTimeout(()=>{let K=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");K.push(v.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(K)),ee(),Z()},300)},m.appendChild(D)}let d=document.createElement("div");d.className="cw-bc-card-content";let w=document.createElement("div");w.className="cw-bc-msg-title",w.textContent=v.title;let k=document.createElement("div");k.className="cw-bc-msg-body",k.innerHTML=Aa(v.text);let z=document.createElement("div");if(z.className="cw-bc-msg-meta",z.innerHTML=`Publicado por <b>${v.author||"Sistema"}</b>`,$||(z.innerHTML+=` \u2022 ${Ca(v.date)}`),d.appendChild(w),d.appendChild(k),d.appendChild(z),s.appendChild(m),s.appendChild(d),r){let D=document.createElement("div");D.className="cw-card-actions";let Y=document.createElement("button");Y.className="cw-action-btn edit",Y.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> ${ne("edit")}`,Y.onclick=()=>q(v);let K=document.createElement("button");K.className="cw-action-btn delete",K.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> ${ne("delete")}`,K.onclick=()=>U(v.id),D.appendChild(Y),D.appendChild(K),s.appendChild(D)}return s}let te=he.getCachedBroadcasts();te.length>0&&(Sa(te),ee()),setTimeout(L,500),_(),a||(a=setInterval(_,xi));let Q=document.createElement("div");Object.assign(Q.style,Ze),Q.className="no-drag",p.appendChild(Q),et(p,Q),document.body.appendChild(p);let oe=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),ae=lt.some(v=>!oe.includes(v.id));return ye(()=>{O&&(O.textContent=ne("headerTitle"));let v=p.querySelector(".cw-help-title");v&&(v.textContent=ne("headerTitle"));let $=p.querySelector(".cw-help-description");$&&($.textContent=ne("headerDesc")),F.placeholder=ne("searchPlaceholder");let s=document.getElementById("cw-admin-btn");if(s&&(s.title=ne("newNotice")),C){let u=[...C.children].find(m=>m.tagName==="BUTTON");u&&(u.textContent=ne("clear"))}if(x){let u=K=>x.querySelector(K),m=u(".js-bc-type-label");m&&(m.textContent=ne("noticeTypeLabel"));let E=u(".js-bc-type-info");E&&(E.textContent=ne("typeInfo"));let y=u(".js-bc-type-critical");y&&(y.textContent=ne("typeCritical"));let A=u(".js-bc-type-success");A&&(A.textContent=ne("typeSuccess"));let d=u(".js-bc-title-label");d&&(d.textContent=ne("titleLabel"));let w=u("#cw-bc-title");w&&(w.placeholder=ne("titlePlaceholder"));let k=u(".js-bc-message-label");k&&(k.textContent=ne("messageLabel"));let z=u("#cw-bc-text");z&&(z.placeholder=ne("messagePlaceholder"));let D=u("#cw-bc-cancel");D&&(D.textContent=ne("cancel"));let Y=u("#cw-bc-send");Y&&(Y.textContent=ne(n?"saveChanges":"publish"))}ee()}),{toggle:b,hasUnread:ae}}var on={pt:[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],es:[{icon:"\u{1F680}",title:"Bienvenido a TechSol Suite",text:"Tu nueva central de operaciones para maximizar la productividad y la estandarizaci\xF3n en el CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Genera notas de caso (BAU/LM) perfectas en segundos. Selecciona el Estado, las Tareas y deja que el asistente escriba el texto t\xE9cnico por ti."},{icon:"\u26A1",title:"Quick Email y Scripts",text:"Responde correos con plantillas inteligentes que detectan el contexto y usa scripts de llamada interactivos que gu\xEDan tu atenci\xF3n."},{icon:"\u{1F4E2}",title:"Mantente Informado",text:"El m\xF3dulo Broadcast trae avisos importantes y disponibilidad BAU directo a tu pantalla, sin necesidad de abrir hojas de c\xE1lculo externas."},{icon:"\u2705",title:"\xA1Todo Listo!",text:"Explora el Men\xFA Flotante para empezar. \xA1Buen trabajo!",isLast:!0}]},nn={pt:{skip:"Pular",next:"Pr\xF3ximo",start:"Come\xE7ar \u{1F680}",skipConfirm:"Pular o tutorial?",readyToast:"Tudo pronto! Use o menu flutuante."},es:{skip:"Omitir",next:"Siguiente",start:"Empezar \u{1F680}",skipConfirm:"\xBFOmitir el tutorial?",readyToast:"\xA1Todo listo! Usa el men\xFA flotante."}};function rn(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let e=se(),t=on[e]||on.pt,a=nn[e]||nn.pt,n=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},i=document.createElement("div");Object.assign(i.style,o.overlay),i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-labelledby","cw-onboarding-title");let r=document.createElement("div");Object.assign(r.style,o.card);let l=document.createElement("div");Object.assign(l.style,o.icon);let c=document.createElement("div");c.id="cw-onboarding-title",Object.assign(c.style,o.title);let h=document.createElement("div");Object.assign(h.style,o.text);let p=document.createElement("div");Object.assign(p.style,o.dotsContainer);let f=document.createElement("div");Object.assign(f.style,o.btnContainer);let b=document.createElement("button");b.textContent=a.skip,Object.assign(b.style,o.btn,o.btnSkip),b.onmouseover=()=>b.style.color="#202124",b.onmouseout=()=>b.style.color="#5f6368";let g=document.createElement("button");g.textContent=a.next,Object.assign(g.style,o.btn,o.btnNext),g.onmouseover=()=>g.style.transform="scale(1.05)",g.onmouseout=()=>g.style.transform="scale(1)",f.appendChild(b),f.appendChild(g),r.appendChild(l),r.appendChild(c),r.appendChild(h),r.appendChild(p),r.appendChild(f),i.appendChild(r),document.body.appendChild(i),Se();function O(L){let j=t[L];l.textContent=j.icon,c.textContent=j.title,h.textContent=j.text,p.innerHTML="",t.forEach((I,F)=>{let N=document.createElement("div");Object.assign(N.style,o.dot),F===L&&Object.assign(N.style,o.dotActive),p.appendChild(N)}),j.isLast?(b.style.display="none",g.textContent=a.start,g.style.width="100%"):(b.style.display="block",g.textContent=a.next,g.style.width="auto")}function C(){localStorage.setItem("cw_onboarding_seen_v1","true"),i.style.opacity="0",r.style.transform="translateY(20px)",setTimeout(()=>i.remove(),400),S.playSuccess(),J(a.readyToast),document.removeEventListener("keydown",x),Ee()}g.onclick=()=>{S.playClick(),n<t.length-1?(n++,O(n)):C()},b.onclick=async()=>{await Te(a.skipConfirm)&&C()};function x(L){L.key==="Enter"?(L.preventDefault(),g.click()):L.key==="Escape"&&(L.preventDefault(),b.click())}document.addEventListener("keydown",x),O(0),requestAnimationFrame(()=>{i.style.opacity="1",r.style.transform="translateY(0)"}),setTimeout(()=>g.focus(),450)}var sn={version:"v5.1",title:"Atualiza\xE7\xE3o: v5.1 - Produtividade Blindada \u{1F6E1}\uFE0F",slides:[{icon:"\u{1F17F}\uFE0F",title:"Estacionamento de Casos",text:"Interrup\xE7\xE3o urgente? Agora voc\xEA pode 'Estacionar' seu atendimento atual (Notas + Tasks) com um clique e retomar depois exatamente de onde parou."},{icon:"\u{1F6DF}",title:"Sistema 'Airbag'",text:"Caiu a internet? Fechou a aba sem querer? O TechSol agora possui Auto-Save de emerg\xEAncia a cada 5 segundos. Seu texto est\xE1 salvo, sempre."},{icon:"\u{1F7E0}",title:"Indicador de Progresso",text:"Nunca mais esque\xE7a uma nota aberta. Um indicador laranja ('Dirty State') avisa na P\xEDlula principal se h\xE1 trabalho n\xE3o salvo/estacionado."},{icon:"\u{1F50D}",title:"Time Zone Pro",text:"O m\xF3dulo de fusos hor\xE1rios ganhou superpoderes: nova barra de pesquisa global, filtros r\xE1pidos por regi\xE3o e corre\xE7\xE3o de visualiza\xE7\xE3o."},{icon:"\u{1F916}",title:"Leitura de BAU Aprimorada",text:"O sistema de Broadcast agora \xE9 mais inteligente ao ler avisos de disponibilidade, detectando datas e bandeiras mesmo quando quebradas em v\xE1rias linhas."},{icon:"\u{1F3A8}",title:"Refinamento Visual",text:"Bot\xF5es padronizados, sombras suavizadas e micro-intera\xE7\xF5es t\xE1teis em todo o sistema para uma experi\xEAncia mais fluida e profissional."}]};var ln={pt:{updateBadge:e=>`Atualiza\xE7\xE3o ${e}`,nextBtn:"Pr\xF3ximo",doneBtn:"Entendi, vamos l\xE1! \u{1F44D}",updatedToast:e=>`TechSol atualizado para ${e}!`},es:{updateBadge:e=>`Actualizaci\xF3n ${e}`,nextBtn:"Siguiente",doneBtn:"\xA1Entendido, vamos! \u{1F44D}",updatedToast:e=>`TechSol actualizado a ${e}!`}};function Zt(e){let t=se();return ln[t]?.[e]??ln.pt[e]}function cn(e){let t=localStorage.getItem("cw_last_version");if(!t){localStorage.setItem("cw_last_version",e);return}t!==e&&wi(e)}function wi(e){let t=sn.slides,a=0,n={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},o=document.createElement("div");Object.assign(o.style,n.overlay),o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-labelledby","cw-changelog-title");let i=document.createElement("div");Object.assign(i.style,n.card);let r=document.createElement("div");Object.assign(r.style,n.badge),r.textContent=Zt("updateBadge")(e);let l=document.createElement("div");Object.assign(l.style,n.icon);let c=document.createElement("div");c.id="cw-changelog-title",Object.assign(c.style,n.title);let h=document.createElement("div");Object.assign(h.style,n.text);let p=document.createElement("div");Object.assign(p.style,n.dotsContainer);let f=document.createElement("button");Object.assign(f.style,n.btn),f.onmouseover=()=>f.style.transform="scale(1.02)",f.onmouseout=()=>f.style.transform="scale(1)",i.appendChild(r),i.appendChild(l),i.appendChild(c),i.appendChild(h),i.appendChild(p),i.appendChild(f),o.appendChild(i),document.body.appendChild(o),Se();function b(C){let x=t[C];l.textContent=x.icon,c.textContent=x.title,h.textContent=x.text,p.innerHTML="",t.forEach((L,j)=>{let I=document.createElement("div");Object.assign(I.style,n.dot),j===C&&Object.assign(I.style,n.dotActive),p.appendChild(I)}),C===t.length-1?f.textContent=Zt("doneBtn"):f.textContent=Zt("nextBtn")}function g(){localStorage.setItem("cw_last_version",e),o.style.opacity="0",i.style.transform="translateY(30px)",setTimeout(()=>o.remove(),400),S.playSuccess(),J(Zt("updatedToast")(e)),document.removeEventListener("keydown",O),Ee()}f.onclick=()=>{S.playClick(),a<t.length-1?(a++,b(a)):g()};function O(C){C.key==="Enter"?(C.preventDefault(),f.click()):C.key==="Escape"&&(C.preventDefault(),g())}document.addEventListener("keydown",O),b(0),requestAnimationFrame(()=>{o.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>f.focus(),450)}var dn="cw_timezone_pinned",mn={es:{name:"Espa\xF1a"},bo:{name:"Bolivia"},co:{name:"Colombia"},ec:{name:"Ecuador"},py:{name:"Paraguay",label:"Asunci\xF3n"},uy:{name:"Uruguay",label:"Montevideo"},ni:{name:"Nicaragua",label:"Managua"},pr:{name:"Puerto Rico"},gt:{label:"C. de Guatemala"},pa:{label:"C. de Panam\xE1"}};function it(e){return se()==="es"?mn[e.id]?.name??e.name:e.name}function ka(e){return se()==="es"?mn[e.id]?.label??e.label:e.label}var pn={pt:{headerDesc:"Monitoramento global e planejamento de chamadas.",tabLive:"Monitoramento",tabPlan:"Planejador",searchPlaceholder:"Buscar cidade ou pa\xEDs...",noLocationFound:"Nenhum local encontrado",unpin:"Desafixar",pin:"Fixar",statusOpen:"Aberto",statusOpening:"Abrindo",statusClosing:"Fechando",statusClosed:"Fechado",whereIsClient:"Onde est\xE1 o cliente?",you:"Voc\xEA",yourTimezone:"Bras\xEDlia (GMT-3)",client:"Cliente",dragToSimulate:"Arraste para simular o hor\xE1rio:",idealBusinessHours:"Hor\xE1rio Comercial Ideal",limitHours:"Hor\xE1rio Limite (Aten\xE7\xE3o)",outOfHours:"Fora de Hor\xE1rio",filters:{all:"Todos",sa:"Am\xE9rica do Sul",na:"Norte & Central",eu:"Europa"}},es:{headerDesc:"Monitoreo global y planificaci\xF3n de llamadas.",tabLive:"Monitoreo",tabPlan:"Planificador",searchPlaceholder:"Buscar ciudad o pa\xEDs...",noLocationFound:"No se encontr\xF3 ning\xFAn lugar",unpin:"Desanclar",pin:"Anclar",statusOpen:"Abierto",statusOpening:"Abriendo",statusClosing:"Cerrando",statusClosed:"Cerrado",whereIsClient:"\xBFD\xF3nde est\xE1 el cliente?",you:"T\xFA",yourTimezone:"Brasilia (GMT-3)",client:"Cliente",dragToSimulate:"Arrastra para simular el horario:",idealBusinessHours:"Horario Comercial Ideal",limitHours:"Horario L\xEDmite (Atenci\xF3n)",outOfHours:"Fuera de Horario",filters:{all:"Todos",sa:"Am\xE9rica del Sur",na:"Norte y Central",eu:"Europa"}}};function ve(e){let t=se();return pn[t]?.[e]??pn.pt[e]}var Ta=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],un=[{id:"all"},{id:"sa"},{id:"na"},{id:"eu"}];function Si(){if(document.getElementById("cw-timezone-interactive-styles"))return;let e=document.createElement("style");e.id="cw-timezone-interactive-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function gn(){Si();let e="v2.2 Pro",t=!1,a=null,n="mx",o=JSON.parse(localStorage.getItem(dn)||"[]"),i="",r="all",l=new Date;l.setHours(14,0,0,0);let c={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},h={container:{display:"flex",flexDirection:"column",height:"100%",background:c.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:c.surface,borderBottom:`1px solid ${c.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:c.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:c.primary,borderBottomColor:c.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:c.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:c.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${c.border}`,background:c.surface,color:c.textSub,transition:"all 0.2s"},chipActive:{background:c.primaryBg,color:c.primary,borderColor:c.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:c.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${c.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:c.surface,border:`1px solid ${c.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:c.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},p=document.createElement("div");p.id="timezone-popup",p.classList.add("cw-module-window"),Object.assign(p.style,De,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let f={popup:p},b=Ie(p,"Time Zone Traveler",e,ve("headerDesc"),f,()=>re());p.appendChild(b);let g=document.createElement("div");Object.assign(g.style,h.container),p.appendChild(g);let O=document.createElement("div");Object.assign(O.style,h.tabHeader);let C=document.createElement("div");C.textContent=ve("tabLive"),C.className="tz-tab-btn",C.tabIndex=0,C.setAttribute("role","tab"),Object.assign(C.style,h.tabBtn,h.tabActive);let x=document.createElement("div");x.textContent=ve("tabPlan"),x.className="tz-tab-btn",x.tabIndex=0,x.setAttribute("role","tab"),Object.assign(x.style,h.tabBtn),[C,x].forEach(W=>{W.addEventListener("keydown",ee=>{(ee.key==="Enter"||ee.key===" ")&&(ee.preventDefault(),W.click())})}),O.appendChild(C),O.appendChild(x),g.appendChild(O);let L=document.createElement("div");Object.assign(L.style,h.toolbar);let j=document.createElement("div");Object.assign(j.style,h.searchInputWrapper);let I=document.createElement("div");I.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(I.style,h.searchIcon);let F=document.createElement("input");F.placeholder=ve("searchPlaceholder"),Object.assign(F.style,h.searchInput),F.onfocus=()=>{F.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",F.style.borderColor="rgba(26,115,232,0.3)"},F.onblur=()=>{F.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",F.style.borderColor="transparent"},F.oninput=W=>{i=W.target.value.toLowerCase(),V()},j.appendChild(I),j.appendChild(F),L.appendChild(j);let N=document.createElement("div");Object.assign(N.style,h.chipsRow),un.forEach(W=>{let ee=document.createElement("div");ee.textContent=ve("filters")[W.id],ee.id=`tz-filter-${W.id}`,ee.className="tz-chip",ee.tabIndex=0,ee.setAttribute("role","button"),Object.assign(ee.style,h.chip),W.id===r&&Object.assign(ee.style,h.chipActive),ee.onclick=()=>{S.playClick(),r=W.id,Array.from(N.children).forEach(G=>{Object.assign(G.style,h.chip)}),Object.assign(ee.style,h.chipActive),V()},ee.addEventListener("keydown",G=>{(G.key==="Enter"||G.key===" ")&&(G.preventDefault(),ee.click())}),N.appendChild(ee)}),L.appendChild(N),g.appendChild(L);let R=document.createElement("div");Object.assign(R.style,h.listContainer);let T=document.createElement("style");T.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",g.appendChild(T);let q=document.createElement("div");Object.assign(q.style,h.plannerWrapper,{display:"none"}),g.appendChild(R),g.appendChild(q),C.onclick=()=>B("live"),x.onclick=()=>B("plan");function B(W){S.playClick(),W==="live"?(Object.assign(C.style,h.tabActive),Object.assign(x.style,h.tabBtn),x.style.borderBottomColor="transparent",C.setAttribute("aria-selected","true"),x.setAttribute("aria-selected","false"),R.style.display="flex",L.style.display="flex",q.style.display="none",Z()):(Object.assign(x.style,h.tabActive),Object.assign(C.style,h.tabBtn),C.style.borderBottomColor="transparent",q.style.display="flex",R.style.display="none",L.style.display="none",ie(),_())}function P(W){return W>=9&&W<17?{color:c.success,bg:c.successBg,label:ve("statusOpen"),icon:"\u{1F7E2}"}:W>=8&&W<9?{color:c.warning,bg:c.warningBg,label:ve("statusOpening"),icon:"\u{1F7E1}"}:W>=17&&W<19?{color:c.warning,bg:c.warningBg,label:ve("statusClosing"),icon:"\u{1F7E1}"}:{color:c.textSub,bg:"#F1F3F4",label:ve("statusClosed"),icon:"\u{1F534}"}}function U(W){o.includes(W)?o=o.filter(ee=>ee!==W):o.push(W),localStorage.setItem(dn,JSON.stringify(o)),V(),S.playClick()}function V(){R.innerHTML="";let W=new Date,ee=Ta.filter(te=>{let Q=it(te).toLowerCase().includes(i)||ka(te).toLowerCase().includes(i),oe=r==="all"||te.region===r;return Q&&oe});if(ee.sort((te,Q)=>{let oe=o.includes(te.id),ae=o.includes(Q.id);return oe&&!ae?-1:!oe&&ae?1:it(te).localeCompare(it(Q))}),ee.length===0){R.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">${ve("noLocationFound")}</div>
                </div>
            `;return}ee.forEach(te=>{let Q=o.includes(te.id),oe=W.toLocaleTimeString(se()==="es"?"es-ES":"pt-BR",{timeZone:te.zone,hour:"2-digit",minute:"2-digit"}),ae=parseInt(oe.split(":")[0]),v=P(ae),$=ae<6||ae>18,s=document.createElement("div");s.className="tz-hub-card",s.tabIndex=0,s.setAttribute("role","button"),s.setAttribute("aria-label",`${it(te)}, ${oe}`),Object.assign(s.style,h.hubCard),Q&&Object.assign(s.style,h.hubCardPinned);let u=Q?"\u2605":"\u2606",m=Q?"#F9AB00":"#DADCE0";s.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn tz-pin-btn" tabindex="0" role="button" aria-label="${ve(Q?"unpin":"pin")} ${it(te)}" style="cursor:pointer; font-size:22px; color:${m}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%;">${u}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${te.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${c.text}; letter-spacing:-0.2px;">${it(te)}</div>
                        <div style="font-size:12px; color:${c.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${$?"\u{1F319}":"\u2600\uFE0F"} ${ka(te)}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${c.text}; font-family:'Google Sans', sans-serif;">${oe}</div>
                    <div style="font-size:11px; font-weight:600; color:${v.color}; background:${v.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${v.label}
                    </div>
                </div>
            `;let E=s.querySelector(".cw-pin-btn");E.onclick=y=>{y.stopPropagation(),U(te.id)},E.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),y.stopPropagation(),U(te.id))}),s.onclick=()=>{n=te.id,B("plan")},s.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&y.target===s&&(y.preventDefault(),s.click())}),R.appendChild(s)});let G=document.createElement("div");G.style.height="20px",G.style.width="100%",R.appendChild(G)}function _(){q.innerHTML="";let W=document.createElement("div"),ee=document.createElement("label");ee.textContent=ve("whereIsClient"),ee.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let G=document.createElement("select");Object.assign(G.style,Za),G.style.padding="14px",[...Ta].sort((D,Y)=>it(D).localeCompare(it(Y))).forEach(D=>{let Y=document.createElement("option");Y.value=D.id,Y.textContent=`${D.flag} ${it(D)} (${D.zone})`,D.id===n&&(Y.selected=!0),G.appendChild(Y)}),G.onchange=D=>{n=D.target.value,z(),S.playClick()},W.appendChild(ee),W.appendChild(G),q.appendChild(W);let Q=document.createElement("div");Object.assign(Q.style,h.timeComparisonRow);let oe=document.createElement("div");Object.assign(oe.style,h.timeCard),oe.style.backgroundColor="#F8FAFF",oe.style.borderColor="#E8F0FE",oe.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} ${ve("you")}</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">${ve("yourTimezone")}</div>
        `;let ae=document.createElement("div");Object.assign(ae.style,h.timeCard),ae.style.backgroundColor="#FFF8E1",ae.style.borderColor="#FEF7E0",ae.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">${ve("client")}</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,Q.appendChild(oe),Q.appendChild(ae),q.appendChild(Q);let v=document.createElement("div");v.id="cw-planner-status",Object.assign(v.style,h.statusBadge),q.appendChild(v);let $=document.createElement("div");Object.assign($.style,{padding:"0 4px",marginTop:"12px"});let s=document.createElement("div");s.textContent=ve("dragToSimulate"),s.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let u=document.createElement("div");Object.assign(u.style,h.timelineContainer);let m=document.createElement("div");Object.assign(m.style,h.timelineTrack);let E=document.createElement("div");Object.assign(E.style,h.dayZone),m.appendChild(E);let y=document.createElement("input");y.type="range",y.min="0",y.max="1439",y.step="15",y.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let A=document.createElement("div");A.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",A.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",u.appendChild(m),u.appendChild(y),u.appendChild(A),$.appendChild(s),$.appendChild(u),q.appendChild($);let d=oe.querySelector("#cw-time-input-br"),w=ae.querySelector("#cw-time-display-client"),k=ae.querySelector("#cw-client-label");function z(){let D=Ta.find(Ye=>Ye.id===n);k.textContent=`${D.flag} ${ka(D)} (${D.zone})`;let Y=l.getHours(),K=l.getMinutes(),pe=`${String(Y).padStart(2,"0")}:${String(K).padStart(2,"0")}`;d.value=pe,y.value=Y*60+K;let ge=l.toLocaleTimeString(se()==="es"?"es-ES":"pt-BR",{timeZone:D.zone,hour:"2-digit",minute:"2-digit"});w.textContent=ge;let we=parseInt(ge.split(":")[0]);we>=9&&we<17?(v.style.background=c.successBg,v.style.color=c.success,v.innerHTML=`<span style="font-size:16px">\u2705</span> ${ve("idealBusinessHours")}`):we>=8&&we<9||we>=17&&we<19?(v.style.background=c.warningBg,v.style.color=c.warning,v.innerHTML=`<span style="font-size:16px">\u26A0\uFE0F</span> ${ve("limitHours")}`):(v.style.background=c.errorBg,v.style.color=c.error,v.innerHTML=`<span style="font-size:16px">\u26D4</span> ${ve("outOfHours")}`)}y.oninput=D=>{let Y=parseInt(D.target.value);l.setHours(Math.floor(Y/60)),l.setMinutes(Y%60),z()},d.oninput=D=>{let[Y,K]=D.target.value.split(":");Y&&K&&(l.setHours(parseInt(Y)),l.setMinutes(parseInt(K)),z())},z()}function Z(){V(),a||(a=setInterval(V,6e4))}function ie(){a&&(clearInterval(a),a=null)}function re(){t=!t,Le(t,p,"cw-btn-timezone"),t?(Se(),B("live")):(Ee(),ie())}return document.body.appendChild(p),ye(()=>{let W=p.querySelector(".cw-help-description");W&&(W.textContent=ve("headerDesc")),C.textContent=ve("tabLive"),x.textContent=ve("tabPlan"),F.placeholder=ve("searchPlaceholder"),Array.from(N.children).forEach(ee=>{let G=un.find(te=>`tz-filter-${te.id}`===ee.id);G&&(ee.textContent=ve("filters")[G.id])}),R.style.display!=="none"&&V(),q.style.display!=="none"&&_()}),re}var bn={pt:{headerTitle:"Minha Biblioteca",headerDesc:"Gerencie seus snippets, textos e templates.",tabs:{general:"Geral",note:"Notas",email:"Emails"},searchPlaceholder:"Buscar por t\xEDtulo ou conte\xFAdo...",newItem:"Novo item",cancel:"Cancelar",recentlyUsed:"\u{1F552} Usados recentemente",nothingFound:"Nada encontrado",nothingHereYet:"Nada aqui ainda",noItemMatches:e=>`Nenhum item bate com "${e}" nesta aba.`,clickPlusToStart:"Clique no + para come\xE7ar sua cole\xE7\xE3o.",copy:"Copiar",moreActions:"Mais a\xE7\xF5es",edit:"Editar",delete:"Excluir",deleteConfirm:e=>`Excluir "${e}"?`,itemDeletedToast:"Item exclu\xEDdo.",copiedToast:"Copiado!",titleLabel:"T\xEDtulo / Nome",subjectLabel:"Assunto do Email",contentLabel:"Conte\xFAdo",emailBodyLabel:"Corpo do Email (HTML)",noteTextLabel:"Texto da Nota",editItemTitle:"Editar Item",newItemTitle:"Novo Item",save:"Salvar",saveChanges:"Salvar Altera\xE7\xF5es",saving:"Salvando...",bold:"Negrito",italic:"It\xE1lico",codeFormat:"Formato c\xF3digo",insertImage:"Inserir imagem",imageUrlPrompt:"Cole a URL da imagem:",fillTitleAndContent:"Preencha t\xEDtulo e conte\xFAdo.",subjectRequired:"Assunto \xE9 obrigat\xF3rio para emails.",saveFailedNoUser:"N\xE3o foi poss\xEDvel salvar: usu\xE1rio n\xE3o identificado. Recarregue a p\xE1gina e tente de novo.",savedLocalOnly:"Salvo localmente \u2014 sem conex\xE3o com a nuvem no momento.",savedAndSynced:"Salvo e sincronizado!",saveError:"Erro ao salvar item."},es:{headerTitle:"Mi Biblioteca",headerDesc:"Gestiona tus snippets, textos y plantillas.",tabs:{general:"General",note:"Notas",email:"Emails"},searchPlaceholder:"Buscar por t\xEDtulo o contenido...",newItem:"Nuevo elemento",cancel:"Cancelar",recentlyUsed:"\u{1F552} Usados recientemente",nothingFound:"No se encontr\xF3 nada",nothingHereYet:"Todav\xEDa no hay nada aqu\xED",noItemMatches:e=>`Ning\xFAn elemento coincide con "${e}" en esta pesta\xF1a.`,clickPlusToStart:"Haz clic en + para empezar tu colecci\xF3n.",copy:"Copiar",moreActions:"M\xE1s acciones",edit:"Editar",delete:"Eliminar",deleteConfirm:e=>`\xBFEliminar "${e}"?`,itemDeletedToast:"Elemento eliminado.",copiedToast:"\xA1Copiado!",titleLabel:"T\xEDtulo / Nombre",subjectLabel:"Asunto del Email",contentLabel:"Contenido",emailBodyLabel:"Cuerpo del Email (HTML)",noteTextLabel:"Texto de la Nota",editItemTitle:"Editar Elemento",newItemTitle:"Nuevo Elemento",save:"Guardar",saveChanges:"Guardar Cambios",saving:"Guardando...",bold:"Negrita",italic:"Cursiva",codeFormat:"Formato c\xF3digo",insertImage:"Insertar imagen",imageUrlPrompt:"Pega la URL de la imagen:",fillTitleAndContent:"Completa el t\xEDtulo y el contenido.",subjectRequired:"El asunto es obligatorio para emails.",saveFailedNoUser:"No se pudo guardar: usuario no identificado. Recarga la p\xE1gina e int\xE9ntalo de nuevo.",savedLocalOnly:"Guardado localmente \u2014 sin conexi\xF3n con la nube en este momento.",savedAndSynced:"\xA1Guardado y sincronizado!",saveError:"Error al guardar el elemento."}};function le(e){let t=se();return bn[t]?.[e]??bn.pt[e]}var Ne={tabs:{general:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',note:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z"></path><path d="M15 3v6h6"></path><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>',email:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'},search:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',clear:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',copy:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',more:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8"></circle><circle cx="12" cy="12" r="1.8"></circle><circle cx="12" cy="19" r="1.8"></circle></svg>',edit:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',delete:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',add:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',back:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',bold:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>',italic:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>',code:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',image:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',media:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',empty:'<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>'},Ia=[{id:"general",icon:Ne.tabs.general},{id:"note",icon:Ne.tabs.note},{id:"email",icon:Ne.tabs.email}],La="cw_lib_recent_v1",fn=4;function Ei(e){try{let t=JSON.parse(localStorage.getItem(La)||"[]");t=t.filter(a=>a!==e),t.unshift(e),t=t.slice(0,fn*3),localStorage.setItem(La,JSON.stringify(t))}catch(t){console.warn("Erro ao salvar uso recente",t)}}function Ci(e){try{let t=JSON.parse(localStorage.getItem(La)||"[]");if(t.length===0)return[];let a=new Map(Fe.getSnippets(e).map(n=>[n.id,n]));return t.map(n=>a.get(n)).filter(Boolean).slice(0,fn)}catch{return[]}}function Ai(){if(document.getElementById("cw-lib-styles-v2"))return;let e=document.createElement("style");e.id="cw-lib-styles-v2",e.textContent=`
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
    `,document.head.appendChild(e)}function hn(){let e="v2.0",t=!1,a="general",n="",o=null,i=null;Ai();let r=document.createElement("div");r.id="library-popup",r.classList.add("cw-module-window"),Object.assign(r.style,De,{right:"auto",left:"50%",width:"620px",height:"680px",maxHeight:"90vh",transform:"translateX(-50%) scale(0.05)"});let l={popup:r},c=Ie(r,le("headerTitle"),e,le("headerDesc"),l,()=>$());r.appendChild(c);let h=c.querySelector("span"),p=document.createElement("div");p.className="cw-lib-container",r.appendChild(p);let f=document.createElement("div");f.className="cw-lib-toolbar";let b=document.createElement("div");b.className="cw-lib-search-wrap";let g=document.createElement("div");g.className="cw-lib-search-icon",g.innerHTML=Ne.search;let O=document.createElement("input");O.className="cw-lib-search no-drag",O.placeholder=le("searchPlaceholder"),O.type="text";let C=document.createElement("div");C.className="cw-lib-search-clear cw-tactile",C.innerHTML=Ne.clear,b.append(g,O,C);let x=document.createElement("div");x.className="cw-lib-tabs",Ia.forEach(s=>{let u=document.createElement("div");u.className="cw-lib-tab"+(s.id===a?" active":""),u.id=`lib-tab-${s.id}`,u.innerHTML=`${s.icon}<span class="js-lib-tab-label">${le("tabs")[s.id]}</span>`,u.onmouseenter=()=>S.playHover(),u.onclick=()=>_(s.id),x.appendChild(u)}),f.append(b,x),p.appendChild(f);let L=document.createElement("div");L.className="cw-lib-grid",p.appendChild(L);let j=document.createElement("div");j.className="cw-lib-fab cw-tactile",j.title=le("newItem"),j.innerHTML=Ne.add,j.onclick=()=>te(),p.appendChild(j);let I=document.createElement("div");I.className="cw-lib-sheet";let F=document.createElement("div");F.className="cw-lib-sheet-handle";let N=document.createElement("div");N.className="cw-lib-sheet-head";let R=document.createElement("div");R.className="cw-lib-sheet-back no-drag",R.innerHTML=Ne.back,R.title=le("cancel"),R.onclick=Q;let T=document.createElement("span");T.className="cw-lib-sheet-title",T.textContent=le("newItemTitle"),N.append(R,T);let q=document.createElement("div");q.className="cw-lib-sheet-body";let B=document.createElement("div");B.className="cw-lib-sheet-foot";let P=document.createElement("button");P.className="cw-lib-save-btn no-drag",P.textContent=le("save"),P.onclick=oe,B.appendChild(P);let U=document.createElement("div");U.className="cw-lib-loading",U.innerHTML=`<div class="cw-lib-spinner"></div><div class="cw-lib-loading-text js-lib-saving">${le("saving")}</div>`,I.append(F,N,q,B,U),p.appendChild(I);let V=document.createElement("div");Object.assign(V.style,Ze),V.className="no-drag",r.appendChild(V),et(r,V),document.body.appendChild(r),document.addEventListener("mousedown",s=>{i&&!i.contains(s.target)&&Z()});function _(s){S.playClick(),a=s,Ia.forEach(u=>{document.getElementById(`lib-tab-${u.id}`).classList.toggle("active",u.id===s)}),W()}function Z(){if(i){let s=i.querySelector(".cw-lib-menu");s&&s.classList.remove("open"),i.classList.remove("menu-open"),i=null}}function ie(s,u){return u?`${s.title} ${s.content}`.toLowerCase().includes(u):!0}function re(s){let u=document.createElement("div");u.className="cw-lib-recent-section",u.innerHTML=`<div class="cw-lib-recent-title">${le("recentlyUsed")}</div>`;let m=document.createElement("div");return m.className="cw-lib-recent-row",s.forEach(E=>{let y=document.createElement("div");y.className="cw-lib-recent-chip",y.tabIndex=0,y.setAttribute("role","button"),y.title=E.title,y.innerHTML=`<span>${v(E.title)}</span>`,y.onclick=()=>{S.playClick(),G(E)},y.addEventListener("keydown",A=>{(A.key==="Enter"||A.key===" ")&&(A.preventDefault(),y.click())}),m.appendChild(y)}),u.appendChild(m),u}function W(){Z(),L.innerHTML="";let s=n.trim().toLowerCase(),u=Fe.getSnippets(a).filter(m=>ie(m,s));if(!s){let m=Ci(a);m.length>0&&L.appendChild(re(m))}if(u.length===0){let m=document.createElement("div");m.className="cw-lib-empty";let E=s.length>0;m.innerHTML=`
                <div style="opacity:0.5;">${Ne.empty}</div>
                <div class="cw-lib-empty-title">${le(E?"nothingFound":"nothingHereYet")}</div>
                <div class="cw-lib-empty-sub">${E?le("noItemMatches")(n.trim()):le("clickPlusToStart")}</div>
            `,L.appendChild(m);return}u.forEach(m=>L.appendChild(ee(m)))}function ee(s){let u=document.createElement("div");u.className="cw-lib-card"+(s.isCode?" is-code":"");let m=s.content,E="";if(s.isRich){let w=document.createElement("div");w.innerHTML=s.content;let k=!!w.querySelector("img");m=w.innerText.substring(0,200),k&&(E=`<span class="cw-lib-media-tag">${Ne.media} M\xEDdia</span>`)}let y=[s.isCode?'<span class="cw-lib-badge code">CODE</span>':"",a==="email"?'<span class="cw-lib-badge template">TEMPLATE</span>':""].join("");u.innerHTML=`
            <div class="cw-lib-card-head">
                <div class="cw-lib-card-title">${v(s.title)}</div>
                <div class="cw-lib-card-badges">${y}</div>
            </div>
            ${E}
            <div class="cw-lib-card-preview${s.isCode?" code":""}">${v(m)}</div>
            <div class="cw-lib-card-foot">
                <div class="cw-lib-icon-btn cw-act-copy cw-tactile" title="${le("copy")}">${Ne.copy}</div>
                <div class="cw-lib-icon-btn cw-act-more cw-tactile" title="${le("moreActions")}">${Ne.more}</div>
                <div class="cw-lib-menu">
                    <div class="cw-lib-menu-item cw-act-edit">${Ne.edit} ${le("edit")}</div>
                    <div class="cw-lib-menu-item danger cw-act-del">${Ne.delete} ${le("delete")}</div>
                </div>
            </div>
        `,u.querySelector(".cw-act-copy").onclick=w=>{w.stopPropagation(),S.playClick(),G(s)};let A=u.querySelector(".cw-act-more"),d=u.querySelector(".cw-lib-menu");return A.onclick=w=>{w.stopPropagation(),S.playClick();let k=d.classList.contains("open");Z(),k||(d.classList.add("open"),u.classList.add("menu-open"),i=u)},u.querySelector(".cw-act-edit").onclick=w=>{w.stopPropagation(),S.playClick(),Z(),te(s)},u.querySelector(".cw-act-del").onclick=async w=>{w.stopPropagation(),S.playClick(),Z(),await Te(le("deleteConfirm")(s.title))&&(Fe.delete(s.id),W(),J(le("itemDeletedToast")))},u}function G(s){if(s.isRich){let u=new Blob([s.content],{type:"text/html"}),m=document.createElement("div");m.innerHTML=s.content;let E=new Blob([m.innerText],{type:"text/plain"});navigator.clipboard.write([new ClipboardItem({"text/html":u,"text/plain":E})])}else navigator.clipboard.writeText(s.content);Ei(s.id),J(le("copiedToast"))}function te(s=null){o=s?s.id:null,q.innerHTML="",q.appendChild(ae("title",le("titleLabel"),s?s.title:"")),a==="email"&&q.appendChild(ae("subject",le("subjectLabel"),s?s.subject:""));let u=le("contentLabel");a==="email"&&(u=le("emailBodyLabel")),a==="note"&&(u=le("noteTextLabel")),q.appendChild(ae("content",u,s?s.content:"",{isRich:!0,isCode:s?s.isCode:!1})),T.textContent=le(s?"editItemTitle":"newItemTitle"),P.textContent=le(s?"saveChanges":"save"),I.classList.add("open"),setTimeout(()=>{let m=q.querySelector("input");m&&m.focus()},500)}function Q(){S.playSwoosh(),I.classList.remove("open"),setTimeout(()=>{o=null},500)}async function oe(){U.classList.add("active"),P.disabled=!0;try{let s=q.querySelector("#cw-lib-inp-title"),u=q.querySelector("#cw-lib-inp-content"),m=s.value.trim(),E=u.contentEditable==="true"?u.innerHTML:u.value.trim(),y=u.getAttribute("data-is-code")==="true";if(!m||!E||E==="<br>"){S.playError(),J(le("fillTitleAndContent"),{error:!0});return}let A={id:o,type:a,title:m,content:E,isCode:y,isRich:u.contentEditable==="true"};if(a==="email"){let w=q.querySelector("#cw-lib-inp-subject").value.trim();if(!w){S.playError(),J(le("subjectRequired"),{error:!0});return}A.subject=w}let d=await Fe.save(A);if(d===!1){S.playError(),J(le("saveFailedNoUser"),{error:!0});return}W(),Q(),d.synced===!1?(S.playError(),J(le("savedLocalOnly"),{error:!0})):(J(le("savedAndSynced")),S.playSuccess())}catch(s){console.error("Erro ao salvar item da biblioteca:",s),S.playError(),J(le("saveError"),{error:!0})}finally{U.classList.remove("active"),P.disabled=!1}}function ae(s,u,m,E={}){let y=document.createElement("div");y.className="cw-lib-field";let A=document.createElement("label");A.className="cw-lib-label",A.textContent=u,y.appendChild(A);let d;if(E.isRich){let w=document.createElement("div");w.className="cw-lib-toolbar-mini",w.innerHTML=`
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-bold" title="${le("bold")}">${Ne.bold}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-italic" title="${le("italic")}">${Ne.italic}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-code" title="${le("codeFormat")}">${Ne.code}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-img" title="${le("insertImage")}">${Ne.image}</button>
            `,d=document.createElement("div"),d.className="cw-lib-input cw-lib-editable",d.contentEditable="true",d.innerHTML=m||"",E.isCode&&(d.style.fontFamily="'Roboto Mono', monospace",d.style.background="#F8F9FA",d.setAttribute("data-is-code","true"),w.querySelector(".cw-tb-code").classList.add("active")),w.querySelectorAll(".cw-lib-tb-btn").forEach(k=>{k.onmouseenter=()=>S.playHover(),k.onmousedown=()=>S.playClick()}),w.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),d.focus()},w.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),d.focus()},w.querySelector(".cw-tb-code").onclick=k=>{let D=!(d.getAttribute("data-is-code")==="true");d.setAttribute("data-is-code",String(D)),d.style.fontFamily=D?"'Roboto Mono', monospace":"inherit",d.style.background=D?"#F8F9FA":"#fff",k.currentTarget.classList.toggle("active",D),d.focus()},w.querySelector(".cw-tb-img").onclick=async()=>{let k=await ro(le("imageUrlPrompt"));k&&(document.execCommand("insertImage",!1,k),d.querySelectorAll("img").forEach(z=>{z.style.maxWidth="100%",z.style.borderRadius="8px"}))},d.onpaste=k=>{let z=(k.clipboardData||k.originalEvent.clipboardData).items;for(let D of z)if(D.kind==="file"&&D.type.startsWith("image/")){k.preventDefault();let Y=new FileReader;Y.onload=K=>{document.execCommand("insertHTML",!1,`<img src="${K.target.result}" style="max-width:100%;border-radius:8px;margin:8px 0;display:block;">`)},Y.readAsDataURL(D.getAsFile())}},y.appendChild(w)}else d=document.createElement("input"),d.className="cw-lib-input",d.type="text",d.value=m||"";return d.id=`cw-lib-inp-${s}`,y.appendChild(d),y}function v(s){let u=document.createElement("div");return u.textContent=s||"",u.innerHTML}O.addEventListener("input",s=>{n=s.target.value,C.classList.toggle("visible",n.length>0),W()}),C.onclick=()=>{O.value="",n="",C.classList.remove("visible"),W(),O.focus()};function $(){t=!t,Le(t,r,"cw-btn-library"),t?(Se(),W()):(Ee(),Z())}return ye(()=>{h&&(h.textContent=le("headerTitle"));let s=r.querySelector(".cw-help-title");s&&(s.textContent=le("headerTitle"));let u=r.querySelector(".cw-help-description");u&&(u.textContent=le("headerDesc")),Ia.forEach(E=>{let y=document.querySelector(`#lib-tab-${E.id} .js-lib-tab-label`);y&&(y.textContent=le("tabs")[E.id])}),O.placeholder=le("searchPlaceholder"),j.title=le("newItem"),R.title=le("cancel");let m=U.querySelector(".js-lib-saving");m&&(m.textContent=le("saving")),W()}),$}var ki={pt:{title:"Configura\xE7\xF5es",headerDesc:"Personalize sua experi\xEAncia e prefer\xEAncias.",profileNotFound:"Perfil n\xE3o localizado na base de dados.",consultant:"Consultor",overheadBadge:"Gest\xE3o / Overhead",soundSectionTitle:"Prefer\xEAncias de Som",soundLabel:"Efeitos Sonoros",soundDesc:"Ativar ou desativar sons de interface.",langSectionTitle:"Idioma da Interface",langLabel:"Idioma",langDesc:"Escolha o idioma dos menus, bot\xF5es e mensagens do Case Wizard.",supportSectionTitle:"Suporte & Feedback",reportBug:"Reportar Bug/Sugest\xF5es"},es:{title:"Configuraci\xF3n",headerDesc:"Personaliza tu experiencia y tus preferencias.",profileNotFound:"Perfil no encontrado en la base de datos.",consultant:"Consultor",overheadBadge:"Gesti\xF3n / Overhead",soundSectionTitle:"Preferencias de Sonido",soundLabel:"Efectos de Sonido",soundDesc:"Activar o desactivar los sonidos de la interfaz.",langSectionTitle:"Idioma de la Interfaz",langLabel:"Idioma",langDesc:"Elige el idioma de los men\xFAs, botones y mensajes del Case Wizard.",supportSectionTitle:"Soporte y Comentarios",reportBug:"Reportar error o sugerencia"}};function xn(){let e=Ya(ki),t="v1.1",a=!1,n={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0"},o="cw-configs-styles";if(!document.getElementById(o)){let R=document.createElement("style");R.id=o,R.innerHTML=`
            .cw-configs-container {
                display: flex; flex-direction: column; height: 100%;
                background: ${n.bg}; font-family: 'Google Sans', Roboto, sans-serif;
                padding: 20px; gap: 24px; overflow-y: auto;
            }
            .cw-configs-section { display: flex; flex-direction: column; gap: 12px; }
            .cw-configs-section-title {
                font-size: 12px; font-weight: 700; color: ${n.textSub};
                text-transform: uppercase; letter-spacing: 0.8px;
            }
            .cw-configs-card {
                background: ${n.surface}; border-radius: 12px; padding: 16px;
                border: 1px solid ${n.border}; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                display: flex; flex-direction: column; gap: 16px;
            }
            .cw-configs-row { display: flex; align-items: center; justify-content: space-between; }
            .cw-configs-label { font-size: 14px; font-weight: 500; color: ${n.text}; }
            .cw-configs-desc { font-size: 12px; color: ${n.textSub}; margin-top: 2px; }
            .cw-configs-btn {
                padding: 10px; border-radius: 8px; border: 1px solid ${n.border};
                background: white; cursor: pointer; font-weight: 500; font-family: inherit;
                transition: all 0.2s;
            }
            .cw-configs-btn:hover { background: #f1f3f4; border-color: #bdc1c6; }

            /* --- PROFILE CARD PREMIUM --- */
            .cw-profile-card {
                background: ${n.surface}; border-radius: 12px; padding: 20px;
                border: 1px solid ${n.border}; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                display: flex; align-items: center; gap: 20px; margin-bottom: 8px;
            }
            .cw-profile-avatar {
                width: 80px; height: 80px; border-radius: 50%; object-fit: cover;
                border: 2px solid #e8f0fe; box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .cw-profile-info { display: flex; flex-direction: column; gap: 4px; flex: 1; }
            .cw-profile-ldap {
                font-size: 18px; font-weight: 700; color: ${n.text}; margin: 0;
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
                position: absolute; inset: 0; background: ${n.border};
                border-radius: 100px; transition: background-color 0.2s ease; pointer-events: none;
            }
            .cw-toggle-track::before {
                content: ''; position: absolute; top: 2px; left: 2px; width: 18px; height: 18px;
                background: #fff; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .cw-toggle-switch input:checked + .cw-toggle-track { background: ${n.primary}; }
            .cw-toggle-switch input:checked + .cw-toggle-track::before { transform: translateX(18px); }
            .cw-toggle-switch input:focus-visible + .cw-toggle-track { outline: 2px solid ${n.primary}; outline-offset: 2px; }
            @media (prefers-reduced-motion: reduce) {
                .cw-toggle-track, .cw-toggle-track::before { transition: none !important; }
            }
        `,document.head.appendChild(R)}let i=document.createElement("div");i.id="configs-popup",i.classList.add("cw-module-window"),Object.assign(i.style,De,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let r={popup:i},l=Ie(i,e("title"),t,e("headerDesc"),r,()=>N());i.appendChild(l);let c=l.querySelector("span"),h=document.createElement("div");h.className="cw-configs-container",i.appendChild(h);let p=document.createElement("div");p.className="cw-profile-card",p.id="cw-user-profile-section",p.style.display="none",h.appendChild(p);let f;function b(R,T){if(f={ldap:R,profile:T},!T){p.innerHTML=`
                <div class="cw-profile-avatar" style="background: #e8eaed; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #5f6368; font-weight: bold;">
                    ${R.charAt(0).toUpperCase()}
                </div>
                <div class="cw-profile-info">
                    <h2 class="cw-profile-ldap">@${R}</h2>
                    <div class="cw-profile-badges">
                        <span class="cw-profile-badge">${e("consultant")}</span>
                    </div>
                    <div style="font-size: 12px; color: ${n.textSub}; margin-top: 4px;">
                        ${e("profileNotFound")}
                    </div>
                </div>
            `;return}p.innerHTML=`
        <img src="https://moma-teams-photos.corp.google.com/photos/${R}?sz=600&type=PLUS"
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
            <div style="font-size: 12px; color: ${n.textSub}; margin-top: 4px;">
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
        `,(async()=>{try{ke()||await kt();let R=ke(),T=R?R.split("@")[0]:"user",q=await ht(T);b(T,q)}catch(R){console.warn("Erro ao renderizar perfil:",R),p.style.display="none"}})()}g();let O=document.createElement("div");if(O.className="cw-configs-section",O.innerHTML=`
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
    `,!document.getElementById("cw-lang-toggle-styles")){let R=document.createElement("style");R.id="cw-lang-toggle-styles",R.innerHTML=`
            .cw-lang-toggle { display: flex; border: 1px solid ${n.border}; border-radius: 8px; overflow: hidden; flex-shrink: 0; }
            .cw-lang-toggle button {
                border: none; background: white; padding: 8px 14px; font-size: 12px; font-weight: 700;
                cursor: pointer; color: ${n.textSub}; font-family: inherit; transition: all 0.2s;
            }
            .cw-lang-toggle button:first-child { border-right: 1px solid ${n.border}; }
            .cw-lang-toggle button.active { background: ${n.primary}; color: #fff; }
            .cw-lang-toggle button:hover:not(.active) { background: #f1f3f4; }
        `,document.head.appendChild(R)}let C=O.querySelector("#cw-config-lang-toggle");function x(){C.querySelectorAll("button").forEach(R=>{R.classList.toggle("active",R.dataset.lang===se())})}x(),C.querySelectorAll("button").forEach(R=>{R.onclick=()=>{sa(R.dataset.lang),S.playClick()}}),h.appendChild(O);let L=document.createElement("div");L.className="cw-configs-section",L.innerHTML=`
        <div class="cw-configs-section-title js-sound-section-title"></div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label js-sound-label"></div>
                    <div class="cw-configs-desc js-sound-desc"></div>
                </div>
                <label class="cw-toggle-switch">
                    <input type="checkbox" id="cw-config-sound-toggle" ${S.isMuted()?"":"checked"}>
                    <span class="cw-toggle-track"></span>
                </label>
            </div>
        </div>
    `;let j=L.querySelector("#cw-config-sound-toggle");j.onchange=R=>{S.setMuted(!R.target.checked),R.target.checked&&S.playClick()},h.appendChild(L);let I=document.createElement("div");I.className="cw-configs-section",I.innerHTML=`
        <div class="cw-configs-section-title js-support-section-title"></div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn js-support-link" href="https://forms.gle/8icwk1TejBTDYsJS6" target="_blank"></a>
            </div>
        </div>
    `,h.appendChild(I);function F(){f&&b(f.ldap,f.profile),O.querySelector(".js-lang-section-title").textContent=e("langSectionTitle"),O.querySelector(".js-lang-label").textContent=e("langLabel"),O.querySelector(".js-lang-desc").textContent=e("langDesc"),x(),L.querySelector(".js-sound-section-title").textContent=e("soundSectionTitle"),L.querySelector(".js-sound-label").textContent=e("soundLabel"),L.querySelector(".js-sound-desc").textContent=e("soundDesc"),I.querySelector(".js-support-section-title").textContent=e("supportSectionTitle"),I.querySelector(".js-support-link").textContent=e("reportBug"),c&&(c.textContent=e("title"));let R=i.querySelector(".cw-help-title");R&&(R.textContent=e("title"));let T=i.querySelector(".cw-help-description");T&&(T.textContent=e("headerDesc"))}F(),ye(F);function N(){a=!a,Le(a,i,"cw-btn-configs"),a?(Se(),S.playClick()):Ee()}return document.body.appendChild(i),N}var ct={blue:"#1A73E8",red:"#D93025",yellow:"#F9AB00",green:"#1E8E3E",blueLight:"#E8F0FE",redLight:"#FCE8E6",yellowLight:"#FEF7E0",greenLight:"#E6F4EA",textPrimary:"#202124",textSecondary:"#5F6368",border:"#DADCE0",surface:"rgba(255, 255, 255, 0.8)",white:"#FFFFFF"};var ft="cubic-bezier(0.4, 0, 0.2, 1)",$c=`all 0.3s ${ft}`,yn=()=>{if(document.getElementById("bau-form-global-styles"))return;let e=document.createElement("style");e.id="bau-form-global-styles",e.textContent=`
    /* --- 1. POSICIONAMENTO E ANCORAGEM --- */
    .bau-popup {
      width: 650px;
      max-width: 95vw;
      max-height: 90vh;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      
      background: #FFFFFF; 
      display: flex;
      flex-direction: column;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 12px 40px rgba(0,0,0,0.12);
      border: 1px solid #DADCE0;
      
      transform-origin: center center;
      animation: cw-genie-effect-in 0.4s ${ft};
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
        animation: bauAuraCombined 5s ${ft} 0.2s infinite;
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
        color: ${ct.green};
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
        animation: bauCheckDraw 0.55s ${ft} 0.75s forwards;
    }

    .bau-success-view.active .bau-success-title {
        font-size: 24px;
        font-weight: 700;
        color: #202124;
        margin: 0 0 8px 0;
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${ft} 0.85s forwards;
    }

    .bau-success-view.active .bau-success-subtitle {
        font-size: 15px;
        color: #5F6368;
        margin-bottom: 36px;
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${ft} 0.95s forwards;
    }

    .bau-success-view.active #bau-success-back-btn {
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${ft} 1.05s forwards;
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
  `,document.head.appendChild(e)};var dt={steps:[{id:0,title:"Selecione o tipo de atendimento",isBranching:!0},{id:1,title:"Contexto e Valida\xE7\xE3o",fields:[{id:"advName",name:"advName",label:"Nome do Anunciante",type:"text",placeholder:"Nome do Anunciante",required:!0,isSmart:!0},{id:"cid",name:"cid",label:"CID",type:"text",placeholder:"000-000-0000",required:!0,isSmart:!0,tooltip:"Use o formato 000-000-0000 ou 10 d\xEDgitos",validation:{regex:"^(\\d{3}-\\d{3}-\\d{4}|\\d{10})$",error:"Formato de CID incorreto"}},{id:"amName",name:"amName",label:"Account Manager (AM)",type:"text",placeholder:"Nome do AM",required:!0,isSmart:!0},{id:"website",name:"website",label:"Website",type:"text",placeholder:"https://www.exemplo.com",required:!0,isSmart:!0},{id:"seId",name:"seId",label:"Speakeasy ID (SE ID)",type:"text-with-button",placeholder:"Speakeasy ID",required:!1,isSmart:!0,button:{id:"bau-top-se-search",icon:"wand",title:"Buscar ID automaticamente"}}]},{id:2,title:"Tasks",fields:[{id:"reason",name:"reason",label:"O que deve ser feito em BAU",type:"textarea",placeholder:"Descreva as a\xE7\xF5es esperadas...",required:!0,style:{minHeight:"80px"}},{id:"taskType",name:"taskType",label:"Tasks para BAU (Selecione 1 ou mais)",type:"checkbox-grid",required:!0,tooltip:"Selecione os tipos de implementa\xE7\xE3o t\xE9cnica",options:["Ads Conversion Tracking","Ads Dynamic Remarketing","Ads Enhanced Conversions","Ads Website Call Conversion","Ads Remarketing","Analytics Cross Domain Tracking","Analytics E-Commerce Tracking","Analytics Enhanced E-Commerce Tracking","Analytics Event Tracking","Analytics Health Check","Analytics Remarketing","Analytics Setup","Fix GA4 implementation","Consent Mode","Fix Sitewide Tagging (OGT & CT)","Google Tag Manager Installation","Customer Match"]}]},{id:3,title:"Justificativa e Agendamento",fields:[{id:"nonImplementationReason",name:"nonImplementationReason",label:"Motivo da N\xE3o Implementa\xE7\xE3o (Justificativa BAU)",type:"select",required:!0,options:[{value:"",text:"Selecione um motivo..."},{value:"Tempo da consultoria esgotado",text:"Tempo da consultoria esgotado"},{value:"Solicita\xE7\xE3o de reagendamento pelo anunciante",text:"Solicita\xE7\xE3o de reagendamento pelo anunciante"},{value:"Falta de acessos ou backup do site",text:"Falta de acessos ou backup do site"},{value:"Anunciante indispon\xEDvel ou n\xE3o preparado",text:"Anunciante indispon\xEDvel ou n\xE3o preparado"},{value:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)",text:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"},{value:"Solicita\xE7\xE3o de tarefas (tasks) adicionais",text:"Solicita\xE7\xE3o de tarefas (tasks) adicionais"},{value:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)",text:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"},{value:"Retorno de contato ap\xF3s prazo de 14 dias expirado",text:"Retorno de contato ap\xF3s prazo de 14 dias expirado"}]},{id:"description",i18nKey:"description_justificativa",name:"description",label:"Justificativa / Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva detalhadamente o que precisa ser feito...",required:!0},{id:"availability",name:"availability",label:"Disponibilidade (m\xEDnimo 1 op\xE7\xE3o)",type:"datetime-group",required:!0,fields:[{name:"availability_1",label:"Op\xE7\xE3o 1 (Prioridade)",required:!0},{name:"availability_2",label:"Op\xE7\xE3o 2 (Opcional)",required:!1},{name:"availability_3",label:"Op\xE7\xE3o 3 (Opcional)",required:!1}]}]},{id:4,title:"Confirma\xE7\xE3o",isConfirmation:!0},{id:5,title:"Solicitar Descarte",fields:[{id:"caseId",name:"caseId",label:"Case ID",type:"text",placeholder:"Case ID",required:!0,isSmart:!0},{id:"language",name:"language",label:"Idioma",type:"text",placeholder:"Idioma",required:!0,isSmart:!0},{id:"seId",i18nKey:"seId_descarte",name:"seId",label:"Speakeasy ID (SE ID)",type:"text",placeholder:"Speakeasy ID",required:!0,isSmart:!0},{id:"description",i18nKey:"description_descarte",name:"description",label:"Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva o motivo do descarte...",required:!0},{id:"discardReason",name:"reason",label:"Motivo do Descarte",type:"select",required:!0,groups:[{label:"Live Appointments",options:[{value:"Caso Filho gerado no atendimento",text:"Caso Filho gerado no atendimento"},{value:"3\xAA Tentativa de contato sem sucesso",text:"3\xAA Tentativa de contato sem sucesso"}]},{label:"Live Meet",options:[{value:"Apenas o AM presente",text:"Apenas o AM presente"},{value:"Estouro de tempo para conclus\xE3o",text:"Estouro de tempo para conclus\xE3o"},{value:"Gera\xE7\xE3o de caso BAU (Reagendamento)",text:"Gera\xE7\xE3o de caso BAU (Reagendamento)"}]}]}]}]};var Ti={advName:{label:"Nombre del Anunciante",placeholder:"Nombre del Anunciante"},cid:{label:"CID",placeholder:"000-000-0000",tooltip:"Usa el formato 000-000-0000 o 10 d\xEDgitos",error:"Formato de CID incorrecto"},amName:{label:"Account Manager (AM)",placeholder:"Nombre del AM"},website:{label:"Website",placeholder:"https://www.ejemplo.com"},seId:{label:"Speakeasy ID (SE ID)",placeholder:"Speakeasy ID",buttonTitle:"Buscar ID autom\xE1ticamente"},seId_descarte:{label:"Speakeasy ID (SE ID)",placeholder:"Speakeasy ID"},reason:{label:"Qu\xE9 debe hacerse en BAU",placeholder:"Describe las acciones esperadas..."},taskType:{label:"Tareas para BAU (Selecciona 1 o m\xE1s)",tooltip:"Selecciona los tipos de implementaci\xF3n t\xE9cnica"},nonImplementationReason:{label:"Motivo de la No Implementaci\xF3n (Justificaci\xF3n BAU)"},description_justificativa:{label:"Justificaci\xF3n / Descripci\xF3n",placeholder:"Describe detalladamente qu\xE9 se necesita hacer..."},availability:{label:"Disponibilidad (m\xEDnimo 1 opci\xF3n)"},availability_1:{label:"Opci\xF3n 1 (Prioridad)"},availability_2:{label:"Opci\xF3n 2 (Opcional)"},availability_3:{label:"Opci\xF3n 3 (Opcional)"},caseId:{label:"Case ID",placeholder:"Case ID"},language:{label:"Idioma",placeholder:"Idioma"},description_descarte:{label:"Descripci\xF3n",placeholder:"Describe el motivo del descarte..."},discardReason:{label:"Motivo del Descarte"}},Ii={"Selecione um motivo...":"Selecciona un motivo...","Tempo da consultoria esgotado":"Tiempo de la consultor\xEDa agotado","Solicita\xE7\xE3o de reagendamento pelo anunciante":"Solicitud de reprogramaci\xF3n por parte del anunciante","Falta de acessos ou backup do site":"Falta de accesos o copia de seguridad del sitio","Anunciante indispon\xEDvel ou n\xE3o preparado":"Anunciante no disponible o no preparado","Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)":"Implementaci\xF3n parcial (no todas las tareas completadas)","Solicita\xE7\xE3o de tarefas (tasks) adicionais":"Solicitud de tareas adicionales","Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)":"Necesidad de nuevos cambios (fase de seguimiento)","Retorno de contato ap\xF3s prazo de 14 dias expirado":"Retorno de contacto despu\xE9s de vencido el plazo de 14 d\xEDas","Caso Filho gerado no atendimento":"Caso Hijo generado en la atenci\xF3n","3\xAA Tentativa de contato sem sucesso":"3.\xBA intento de contacto sin \xE9xito","Apenas o AM presente":"Solo el AM presente","Estouro de tempo para conclus\xE3o":"Tiempo excedido para la conclusi\xF3n","Gera\xE7\xE3o de caso BAU (Reagendamento)":"Generaci\xF3n de caso BAU (Reprogramaci\xF3n)"};function Li(e){return e?.i18nKey||e?.id||e?.name}function Pe(e,t){let a=e?.[t];return se()!=="es"?a:Ti[Li(e)]?.[t]??a}function We(e){return se()!=="es"?e:Ii[e]??e}var vn={pt:{statusPending:"Aguardando TL",statusApproved:"Aprovado / Criado",statusDiscarded:"Descartado pelo TL",statusCanceled:"Cancelado",statusDefault:"Pendente",timezoneWarningStrong:"Aten\xE7\xE3o:",timezoneWarningText:"Para clientes fora do fuso hor\xE1rio do Brasil, o hor\xE1rio inserido deve corresponder sempre ao hor\xE1rio local do cliente, e n\xE3o ao do agente.",checkTimezone:"Consultar Time Zone",timezoneModuleNotFound:"M\xF3dulo Time Zone n\xE3o encontrado.",headerTitle:"BAU Central",headerDesc:"Dashboard de Casos BAU",openBauCase:"Abrir caso para BAU",openBauCaseDesc:"Fluxo completo para implementa\xE7\xF5es t\xE9cnicas e suporte especializado.",requestDiscard:"Solicitar Descarte",requestDiscardDesc:"Fluxo simplificado para casos que n\xE3o requerem implementa\xE7\xE3o.",back:"Voltar",next:"Pr\xF3ximo",configuringEdit:"Configurando Edi\xE7\xE3o...",loadDashboardError:"Erro ao carregar Dashboard. Verifique sua conex\xE3o.",copiedToClipboard:"Copiado para a \xE1rea de transfer\xEAncia!",noAdditionalContext:"Nenhum contexto adicional fornecido pelo agente.",notCaptured:"N\xE3o capturado",none:"Nenhuma",language:"Idioma",editPageWarning:"Aten\xE7\xE3o: Para editar as informa\xE7\xF5es, voc\xEA deve estar com a p\xE1gina deste Caso espec\xEDfico aberta no sistema. Caso contr\xE1rio, os dados capturados estar\xE3o incorretos.",onCorrectPage:"Estou na p\xE1gina correta",sending:"Enviando...",caseCreatedNoEmailConfirm:"Caso criado, mas n\xE3o conseguimos confirmar por email.",unknownError:"Erro desconhecido",newBauCase:"Novo Caso BAU",backToDashboard:"Voltar ao Dashboard",confirmDataBeforeSending:"Confirme os dados antes de enviar",submitToTl:"Enviar para o TL",saveChanges:"Salvar Altera\xE7\xF5es",editingCase:e=>`Editando Caso #${e}`,fillDetailsBelow:"Preencha os detalhes abaixo",caseSentSuccess:"Caso enviado com sucesso!",caseSentSuccessSub:"Sua solicita\xE7\xE3o foi recebida e ser\xE1 processada em breve.",genericErrorTitle:"Ops! Algo deu errado",genericErrorSub:"N\xE3o conseguimos carregar seus casos BAU no momento.",tryAgain:"Tentar Novamente",notInformed:"N\xE3o informado",reasonTooltip:"O que deve ser feito em BAU",reasonPrefix:"Motivo:",metricAwaitingTl:"Aguardando TL",caseDetailsTitle:"Detalhes do Caso",copy:"Copiar",advertiser:"Anunciante",status:"Status",cidLabel:"CID",caseIdLabel:"Case ID",speakeasyId:"Speakeasy ID",advertiserEmail:"Email do Anunciante",site:"Site",timezone:"Timezone",responsibleAm:"AM Respons\xE1vel",salesProgram:"Programa de Vendas",bauReason:"Motivo BAU",requestedTasks:"Tasks solicitadas",justification:"Justificativa",detailedDescription:"Descri\xE7\xE3o detalhada",availability:"Disponibilidade",urgent:"Urgente",undefinedName:"Nome indefinido",customerIdTooltip:"Customer ID do Anunciante",cidTooltip:"CID do Anunciante (Formato: 000-000-0000)",incompleteData:"Dados Incompletos",invalidCid:"CID Inv\xE1lido",contactSupport:"Contate o Suporte",editRequest:"Editar Solicita\xE7\xE3o",edit:"Editar",refresh:"Atualizar",noRecentCases:"Nenhum caso recente",casesWillAppear:"Seus casos BAU aparecer\xE3o aqui",createdApproved:"Criados / Aprovados",refreshDashboard:"Atualizar Dashboard",errorPrefix:e=>`Erro: ${e}`,selectAtLeastOne:e=>`Erro: Selecione pelo menos uma op\xE7\xE3o para "${e}".`,fieldRequiredDouble:e=>`Erro: O campo "${e}" \xE9 obrigat\xF3rio.`,fieldRequiredSingle:e=>`Erro: O campo '${e}' \xE9 obrigat\xF3rio.`,whatMustBeDone:"O que deve ser feito",editTasksHint:"Para editar as tasks, volte ao Passo 2",bauJustification:"Justificativa BAU",description:"Descri\xE7\xE3o",availabilityPriority:"Disponibilidade (Prioridade)",editingCaseHash:e=>`Voc\xEA est\xE1 editando o caso #${e}`,editingDiscardHash:e=>`Voc\xEA est\xE1 editando o descarte do caso #${e}`,discardReason:"Motivo do Descarte",discardDescription:"Descri\xE7\xE3o do Descarte",notInformedPlaceholder:"N\xE3o informado",caseUpdatedSuccess:"Caso atualizado com sucesso!",caseDiscardSentSuccess:"Caso enviado para descarte com sucesso!"},es:{statusPending:"Esperando al TL",statusApproved:"Aprobado / Creado",statusDiscarded:"Descartado por el TL",statusCanceled:"Cancelado",statusDefault:"Pendiente",timezoneWarningStrong:"Atenci\xF3n:",timezoneWarningText:"Para clientes fuera del huso horario de Brasil, el horario ingresado siempre debe corresponder al horario local del cliente, no al del agente.",checkTimezone:"Consultar Time Zone",timezoneModuleNotFound:"M\xF3dulo Time Zone no encontrado.",headerTitle:"BAU Central",headerDesc:"Panel de Casos BAU",openBauCase:"Abrir caso para BAU",openBauCaseDesc:"Flujo completo para implementaciones t\xE9cnicas y soporte especializado.",requestDiscard:"Solicitar Descarte",requestDiscardDesc:"Flujo simplificado para casos que no requieren implementaci\xF3n.",back:"Volver",next:"Siguiente",configuringEdit:"Configurando Edici\xF3n...",loadDashboardError:"Error al cargar el Panel. Verifica tu conexi\xF3n.",copiedToClipboard:"\xA1Copiado al portapapeles!",noAdditionalContext:"Ning\xFAn contexto adicional proporcionado por el agente.",notCaptured:"No capturado",none:"Ninguna",language:"Idioma",editPageWarning:"Atenci\xF3n: Para editar la informaci\xF3n, debes tener abierta en el sistema la p\xE1gina de este Caso espec\xEDfico. De lo contrario, los datos capturados estar\xE1n incorrectos.",onCorrectPage:"Estoy en la p\xE1gina correcta",sending:"Enviando...",caseCreatedNoEmailConfirm:"Caso creado, pero no pudimos confirmar por email.",unknownError:"Error desconocido",newBauCase:"Nuevo Caso BAU",backToDashboard:"Volver al Panel",confirmDataBeforeSending:"Confirma los datos antes de enviar",submitToTl:"Enviar al TL",saveChanges:"Guardar Cambios",editingCase:e=>`Editando Caso #${e}`,fillDetailsBelow:"Completa los detalles a continuaci\xF3n",caseSentSuccess:"\xA1Caso enviado con \xE9xito!",caseSentSuccessSub:"Tu solicitud fue recibida y ser\xE1 procesada en breve.",genericErrorTitle:"\xA1Ups! Algo sali\xF3 mal",genericErrorSub:"No pudimos cargar tus casos BAU en este momento.",tryAgain:"Intentar de Nuevo",notInformed:"No informado",reasonTooltip:"Qu\xE9 debe hacerse en BAU",reasonPrefix:"Motivo:",metricAwaitingTl:"Esperando al TL",caseDetailsTitle:"Detalles del Caso",copy:"Copiar",advertiser:"Anunciante",status:"Estado",cidLabel:"CID",caseIdLabel:"Case ID",speakeasyId:"Speakeasy ID",advertiserEmail:"Email del Anunciante",site:"Sitio",timezone:"Timezone",responsibleAm:"AM Responsable",salesProgram:"Programa de Ventas",bauReason:"Motivo BAU",requestedTasks:"Tareas solicitadas",justification:"Justificaci\xF3n",detailedDescription:"Descripci\xF3n detallada",availability:"Disponibilidad",urgent:"Urgente",undefinedName:"Nombre indefinido",customerIdTooltip:"Customer ID del Anunciante",cidTooltip:"CID del Anunciante (Formato: 000-000-0000)",incompleteData:"Datos Incompletos",invalidCid:"CID Inv\xE1lido",contactSupport:"Contacta al Soporte",editRequest:"Editar Solicitud",edit:"Editar",refresh:"Actualizar",noRecentCases:"Ning\xFAn caso reciente",casesWillAppear:"Tus casos BAU aparecer\xE1n aqu\xED",createdApproved:"Creados / Aprobados",refreshDashboard:"Actualizar Panel",errorPrefix:e=>`Error: ${e}`,selectAtLeastOne:e=>`Error: Selecciona al menos una opci\xF3n para "${e}".`,fieldRequiredDouble:e=>`Error: El campo "${e}" es obligatorio.`,fieldRequiredSingle:e=>`Error: El campo '${e}' es obligatorio.`,whatMustBeDone:"Qu\xE9 debe hacerse",editTasksHint:"Para editar las tareas, vuelve al Paso 2",bauJustification:"Justificaci\xF3n BAU",description:"Descripci\xF3n",availabilityPriority:"Disponibilidad (Prioridad)",editingCaseHash:e=>`Est\xE1s editando el caso #${e}`,editingDiscardHash:e=>`Est\xE1s editando el descarte del caso #${e}`,discardReason:"Motivo del Descarte",discardDescription:"Descripci\xF3n del Descarte",notInformedPlaceholder:"No informado",caseUpdatedSuccess:"\xA1Caso actualizado con \xE9xito!",caseDiscardSentSuccess:"\xA1Caso enviado a descarte con \xE9xito!"}};function M(e){let t=se();return vn[t]?.[e]??vn.pt[e]}var Ce={add:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',back:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',wand:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.41l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/></svg>',send:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',check:'<svg width="64" height="64" viewBox="0 0 24 24" fill="none"><path class="bau-check-path" d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',folder:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',empty:'<svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.44 2s2.75-.81 3.44-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z"/></svg>',refresh:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',expand:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>'};function wn(e){switch(e){case"PENDING_TL_CREATION":return{text:M("statusPending"),class:"status-yellow",aura:"status-yellow-aura"};case"CREATED":return{text:M("statusApproved"),class:"status-green",aura:"status-green-aura"};case"DISCARDED":return{text:M("statusDiscarded"),class:"status-red",aura:"status-red-aura"};case"CANCELED_BY_AGENT":return{text:M("statusCanceled"),class:"status-gray",aura:""};default:return{text:e||M("statusDefault"),class:"status-gray",aura:""}}}function Sn(e){let t=document.createElement("div");if(t.className="bau-dynamic-input",t.id=`wrapper-${e.id}`,e.label){let n=document.createElement("label");n.className="bau-label",n.textContent=Pe(e,"label"),e.tooltip&&n.setAttribute("data-tooltip",Pe(e,"tooltip")),t.appendChild(n)}let a;switch(e.type){case"textarea":a=document.createElement("textarea"),a.style.minHeight="80px",t.appendChild(a);break;case"select":a=document.createElement("select"),e.groups?e.groups.forEach(r=>{let l=document.createElement("optgroup");l.label=r.label,r.options.forEach(c=>{let h=document.createElement("option");h.value=c.value,h.textContent=We(c.text),l.appendChild(h)}),a.appendChild(l)}):e.options&&e.options.forEach(r=>{let l=document.createElement("option");l.value=r.value,l.textContent=We(r.text),a.appendChild(l)}),t.appendChild(a);break;case"checkbox-grid":return a=document.createElement("div"),a.className="bau-tasks-grid",e.options.forEach(r=>{let l=document.createElement("label");l.className="bau-task-item",l.innerHTML=`<input type="checkbox" name="${e.name}" value="${r}"><span>${r}</span>`,l.addEventListener("click",c=>{c.preventDefault();let h=l.querySelector("input");h.checked=!h.checked,l.classList.toggle("active",h.checked),S.playClick()}),a.appendChild(l)}),t.appendChild(a),t;case"datetime-group":a=document.createElement("div"),a.className="bau-availability-container",e.fields.forEach(r=>{let l=document.createElement("div");l.className="bau-availability-field",l.innerHTML=`
                    <span class="bau-field-hint">${Pe(r,"label")}</span>
                    <input type="datetime-local" name="${r.name}" class="bau-input" ${r.required?"required":""}>
                `,a.appendChild(l)});let n=document.createElement("div");return n.className="bau-availability-disclaimer",n.innerHTML=`
                <div class="bau-disclaimer-text">
                    <strong>${M("timezoneWarningStrong")}</strong> ${M("timezoneWarningText")}
                </div>
                <button type="button" class="bau-timezone-link" id="bau-open-timezone">
                    ${Ce.refresh}
                    ${M("checkTimezone")}
                </button>
            `,n.querySelector("#bau-open-timezone").onclick=()=>{let r=document.getElementById("cw-btn-timezone");r?(r.click(),S.playClick()):(S.playError(),J(M("timezoneModuleNotFound"),{error:!0}))},t.appendChild(a),t.appendChild(n),t;case"text-with-button":let o=document.createElement("div");o.className="bau-input-group",a=document.createElement("input"),a.type="text";let i=document.createElement("button");i.type="button",i.id=e.button.id,i.className="bau-mini-btn-input",i.title=Pe(e,"buttonTitle")||e.button.title,i.innerHTML=Ce[e.button.icon]||"",o.appendChild(a),o.appendChild(i),t.appendChild(o);break;default:a=document.createElement("input"),a.type="text",t.appendChild(a)}return a&&e.type!=="checkbox-grid"&&e.type!=="datetime-group"&&(a.id=`bau-form-${e.id}`,a.name=e.name,a.className=e.type==="select"?"bau-select":e.type==="textarea"?"bau-textarea":"bau-input",e.placeholder&&(a.placeholder=Pe(e,"placeholder")),e.required&&(a.required=!0)),t}function En(){yn();let e=!1,t="dashboard",a=null,n=0,o="BAU",i=!1,r=null,l=dt.steps.length,c=document.createElement("div");c.id="bau-form-popup",c.className="bau-popup cw-module-window",c.style.display="none";let h=M("headerTitle"),p=M("headerDesc"),f=Ie(c,h,"v2.2.0",p,{},()=>$());c.appendChild(f);let b=document.createElement("div");b.className="bau-view-container",c.appendChild(b);let g=document.createElement("div");g.id="bau-view-details",g.className="bau-details-view",b.appendChild(g);let O=document.createElement("div");O.id="bau-view-dashboard",O.className="bau-view active",O.innerHTML=`
        <div class="bau-dashboard-content">
            <div class="bau-dashboard-metrics" id="bau-dashboard-metrics"></div>
            <ul class="bau-case-list" id="bau-case-list-container"></ul>
        </div>
        <button class="bau-dashboard-fab" id="bau-new-case-btn">
            ${Ce.add}
            <span class="js-bau-new-case">${M("newBauCase")}</span>
        </button>
    `,b.appendChild(O);let C=document.createElement("div");C.id="bau-view-form",C.className="bau-view";let x=document.createElement("div");x.className="bau-view-header",x.innerHTML=`
      <button class="bau-back-btn" id="bau-form-back-btn">
        ${Ce.back}
        <span class="js-bau-back-dashboard">${M("backToDashboard")}</span>
      </button>
    `,C.appendChild(x);let L=document.createElement("div");L.className="bau-content",C.appendChild(L);let j=document.createElement("div");j.className="bau-form-loading-overlay",j.innerHTML=`
        <div class="bau-spinner"></div>
        <div class="bau-loading-text js-bau-configuring-edit">${M("configuringEdit")}</div>
    `,L.appendChild(j);let I=s=>{j.classList.toggle("active",s)},F=document.createElement("div");F.className="bau-progress-indicator",L.appendChild(F);let N=document.createElement("form");N.id="bau-escalation-form",N.noValidate=!0,L.appendChild(N),dt.steps.forEach(s=>{let u=document.createElement("div");if(u.className="bau-step"+(s.id===n?" active":""),u.id=`bau-step-${s.id}`,s.isBranching)u.innerHTML=`
                <div class="bau-branching-container">
                    <div class="bau-branching-card" id="bau-opt-full">
                        <div class="bau-branching-icon">${Ce.add}</div>
                        <h3 class="bau-branching-title">${M("openBauCase")}</h3>
                        <p class="bau-branching-subtitle">${M("openBauCaseDesc")}</p>
                    </div>
                    <div class="bau-branching-card" id="bau-opt-discard">
                        <div class="bau-branching-icon">${Ce.empty}</div>
                        <h3 class="bau-branching-title">${M("requestDiscard")}</h3>
                        <p class="bau-branching-subtitle">${M("requestDiscardDesc")}</p>
                    </div>
                </div>
            `,u.querySelector("#bau-opt-full").onclick=()=>{o="BAU",n=1,N.querySelectorAll(".bau-highlight-panel").forEach(m=>m.classList.remove("discard-theme")),W(),S.playClick()},u.querySelector("#bau-opt-discard").onclick=()=>{o="DISCARD",n=5,N.querySelectorAll(".bau-highlight-panel").forEach(m=>m.classList.add("discard-theme")),W(),S.playClick()};else if(s.isConfirmation)u.innerHTML=`
                <div class="bau-card">
                    <h3 class="bau-step-title">${M("confirmDataBeforeSending")}</h3>
                    <div id="bau-confirmation-details"></div>
                </div>
            `;else{let m=document.createElement("div");if(m.className="bau-card",s.id===1||s.id===5){m.innerHTML=`
                    <div class="bau-vital-highlights bau-highlight-panel"></div>
                    <div class="bau-dynamic-inputs-container"></div>
                    <div class="bau-all-data"></div>
                `;let E=m.querySelector(".bau-dynamic-inputs-container");s.fields.forEach(A=>{E.appendChild(Sn(A))});let y=m.querySelector("#wrapper-cid");if(y){let A=document.createElement("div");A.id="bau-cid-error",A.className="bau-cid-error-hint",A.style.display="none",A.textContent="Formato de CID incorreto",y.appendChild(A)}}else s.fields.forEach(E=>{m.appendChild(Sn(E))});u.appendChild(m)}N.appendChild(u)});let R=document.createElement("div");R.className="bau-footer";let T=document.createElement("button");T.type="button",T.id="bau-step-back-btn",T.className="bau-btn-secondary",T.textContent=M("back");let q=document.createElement("button");q.type="button",q.id="bau-step-next-btn",q.className="bau-btn-primary",q.textContent=M("next");let B=document.createElement("button");B.type="submit",B.className="bau-btn-submit",B.innerHTML=`${Ce.send} ${M("submitToTl")}`,B.style.display="none",R.appendChild(T),R.appendChild(q),R.appendChild(B),N.appendChild(R),b.appendChild(C);let P=document.createElement("div");P.id="bau-view-success",P.className="bau-view bau-success-view",P.innerHTML=`
        <div class="bau-success-content">
            <div class="bau-success-icon" style="color: ${ct.green};">${Ce.check}</div>
            <h2 class="bau-success-title js-bau-success-title">${M("caseSentSuccess")}</h2>
            <p class="bau-success-subtitle js-bau-success-sub">${M("caseSentSuccessSub")}</p>
            <button class="bau-btn-primary js-bau-success-back" id="bau-success-back-btn">${M("backToDashboard")}</button>
        </div>
    `,b.appendChild(P),document.body.appendChild(c);function U(s){t=s,c.querySelectorAll(".bau-view").forEach(A=>A.classList.remove("active"));let u=c.querySelector(`#bau-view-${s}`);u&&u.classList.add("active");let m=f.querySelector(".cw-module-header-title")||f.querySelector("h2"),E=f.querySelector(".cw-module-header-subtitle")||f.querySelector("p");m&&(s==="form"?m.textContent=i?M("editingCase")(r):M("newBauCase"):m.textContent=M("headerTitle")),E&&(E.textContent=M(s==="form"?"fillDetailsBelow":"headerDesc"));let y=N.querySelector(".bau-btn-submit");y&&(y.innerHTML=i?`${Ce.send} ${M("saveChanges")}`:`${Ce.send} ${M("submitToTl")}`)}function V(){let s=c.querySelector("#bau-case-list-container"),u=c.querySelector("#bau-dashboard-metrics");u&&(u.innerHTML=`
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
            `),s&&(s.innerHTML=Array(5).fill(0).map(()=>`
            <div class="bau-skeleton-card">
                <div class="bau-shimmer"></div>
            </div>
        `).join(""))}async function _(){let s=c.querySelector("#bau-case-list-container"),u=c.querySelector("#bau-dashboard-metrics");if(!(!s||!u)){V();try{let m=await Ra();if(!Array.isArray(m))throw new Error("API response is not a valid array");re(m)}catch(m){console.error("Critical Error loading BAU cases:",m),u&&(u.innerHTML=""),s.innerHTML=`
                <div class="bau-empty-state bau-error-state">
                    <div style="color: ${ct.red}; margin-bottom: 16px;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    </div>
                    <h3 class="bau-empty-title">${M("genericErrorTitle")}</h3>
                    <p class="bau-empty-subtitle">${M("genericErrorSub")}</p>
                    <button class="bau-btn-secondary" id="bau-retry-btn" style="margin-top: 16px;">
                        ${M("tryAgain")}
                    </button>
                </div>
            `,c.querySelector("#bau-retry-btn")?.addEventListener("click",()=>_()),S.playError(),J(M("loadDashboardError"),{error:!0})}}}function Z(s){if(!s)return;let u=wn(s.status),m=(y,A)=>{navigator.clipboard.writeText(y).then(()=>{J(M("copiedToClipboard")),S.playClick();let d=A.style.color;A.style.color="#1E8E3E",setTimeout(()=>{A.style.color=d},800)})};g.innerHTML=`
            <div class="bau-details-header">
                <h2 class="bau-details-title">${M("caseDetailsTitle")}</h2>
                <button class="bau-details-close-btn">
                    ${Ce.back}
                    ${M("back")}
                </button>
            </div>
            <div class="bau-details-content">
                <div class="bau-details-grid">
                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${M("advertiser")}</span>
                            <span class="bau-details-value">${s.advName||"---"}</span>
                            <button class="bau-copy-btn" title="${M("copy")}">${Ce.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${M("status")}</span>
                            <span class="bau-case-status-badge ${u.class}">${u.text}</span>
                        </div>
                    </div>
                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${M("cidLabel")}</span>
                            <span class="bau-details-value">${s.cid||"---"}</span>
                            <button class="bau-copy-btn" title="${M("copy")}">${Ce.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${M("caseIdLabel")}</span>
                            <span class="bau-details-value">${s.caseId||"---"}</span>
                            <button class="bau-copy-btn" title="${M("copy")}">${Ce.wand}</button>
                        </div>
                    </div>

                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${M("speakeasyId")}</span>
                            <span class="bau-details-value">${s.seId||"---"}</span>
                            <button class="bau-copy-btn" title="${M("copy")}">${Ce.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${M("advertiserEmail")}</span>
                            <span class="bau-details-value">${s.advEmail||"---"}</span>
                            <button class="bau-copy-btn" title="${M("copy")}">${Ce.wand}</button>
                        </div>
                    </div>
                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${M("site")}</span>
                            <span class="bau-details-value">${s.site||"---"}</span>
                            <button class="bau-copy-btn" title="${M("copy")}">${Ce.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${M("timezone")}</span>
                            <span class="bau-details-value">${s.timezone||"---"}</span>
                        </div>
                    </div>

                    <div class="bau-details-card full-width">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${M("language")}</span>
                            <span class="bau-details-value">${s.language||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${M("responsibleAm")}</span>
                            <span class="bau-details-value">${s.amName||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${M("salesProgram")}</span>
                            <span class="bau-details-value">${s.salesProgram||"---"}</span>
                        </div>
                    </div>

                    <div class="bau-details-card full-width">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${M("bauReason")}</span>
                            <span class="bau-details-value">${s.reason||M("notInformed")}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${M("requestedTasks")}</span>
                            <span class="bau-details-value">${s.task||s.taskType||M("none")}</span>
                        </div>
                    </div>

                    <div class="bau-details-card full-width">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${M("justification")}</span>
                            <span class="bau-details-value">${s.nonImplementationReason||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${M("detailedDescription")}</span>
                            <span class="bau-details-value">${s.description||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${M("availability")}</span>
                            <span class="bau-details-value">${$t(s.availability)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;let E=g.querySelector(".bau-details-close-btn");E.onclick=()=>{g.classList.remove("active"),S.playSwoosh(),setTimeout(()=>{g.style.display="none"},600)},g.querySelectorAll(".bau-copy-btn").forEach(y=>{y.onclick=A=>{let d=A.target.closest(".bau-details-row").querySelector(".bau-details-value").textContent;m(d,y)}}),g.style.display="flex",requestAnimationFrame(()=>{g.classList.add("active"),S.playClick()})}function ie(s){if(!s)return"";let u=wn(s?.status),m=$t(s?.date),E="",y="";if(s?.status==="PENDING_TL_CREATION"&&s?.availability_1){let z=new Date(s.availability_1),D=new Date;(z<=D||z-D<36e5*2)&&(E=`<span class="bau-sla-badge">${M("urgent")}</span>`,y="bau-pulse-attention")}let A=s?.reason&&s.reason.trim()?s.reason:M("noAdditionalContext"),w=/^(\d{3}-\d{3}-\d{4}|\d{10})$/.test(s?.cid||""),k=!s?.caseId||s.caseId==="N/A"||!w;return k&&s?.status==="PENDING_TL_CREATION"&&(y="bau-pulse-attention"),`
            <li class="bau-case-card ${u.aura} ${y}" data-case-id="${s?.id||""}">
                <div class="bau-case-main">
                    <div class="bau-case-icon">${Ce.folder}</div>
                    <div class="bau-case-info">
                        <div class="bau-case-header">
                            <h3 class="bau-case-title">${s?.advName||M("undefinedName")}</h3>
                            ${E}
                            <span class="bau-case-date">${m}</span>
                        </div>
                        <p class="bau-case-details">
                            <span data-tooltip="${M("customerIdTooltip")}">Case: ${s?.caseId||"N/A"}</span> \u2022
                            <span data-tooltip="${M("cidTooltip")}" class="${w?"":"bau-error-text"}">CID: ${s?.cid||"N/A"}</span> \u2022
                            <span data-tooltip="${M("reasonTooltip")}">${M("reasonPrefix")} ${A}</span>
                        </p>
                        ${k?`<div class="bau-data-error-hint">${!s?.caseId||s?.caseId==="N/A"?M("incompleteData"):M("invalidCid")} - ${M("contactSupport")}</div>`:""}
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                    <span class="bau-case-status-badge ${u.class}">${u.text}</span>
                    ${s?.status&&s.status.includes("PENDING")?`
                        <button class="bau-case-edit-btn" data-id="${s.id}" title="${M("editRequest")}">
                            ${Ce.edit}
                            ${M("edit")}
                        </button>
                    `:""}
                </div>
            </li>
        `}function re(s){let u=c.querySelector("#bau-case-list-container"),m=c.querySelector("#bau-dashboard-metrics");if(!u||!m)return;let E=Array.isArray(s)?s.filter(Boolean):[];if(E.length===0){m.innerHTML=`
                <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard">
                    ${Ce.refresh}
                    ${M("refresh")}
                </button>
            `,u.innerHTML=`
                <div class="bau-empty-state">
                    ${Ce.empty}
                    <h3 class="bau-empty-title">${M("noRecentCases")}</h3>
                    <p class="bau-empty-subtitle">${M("casesWillAppear")}</p>
                </div>
            `,c.querySelector("#bau-refresh-dashboard")?.addEventListener("click",()=>_());return}let y=E.filter(z=>z.status==="PENDING_TL_CREATION").length,A=E.filter(z=>z.status==="CREATED").length;m.innerHTML=`
            <div class="bau-metric-card">
                <span class="bau-metric-value">${y}</span>
                <span class="bau-metric-label">${M("metricAwaitingTl")}</span>
            </div>
            <div class="bau-metric-card">
                <span class="bau-metric-value">${A}</span>
                <span class="bau-metric-label">${M("createdApproved")}</span>
            </div>
            <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard" title="${M("refreshDashboard")}">
                ${Ce.refresh}
            </button>
        `;let d=m.querySelector("#bau-refresh-dashboard");d?.addEventListener("click",async()=>{d.classList.contains("spinning")||(d.classList.add("spinning"),S.playClick(),await _(),setTimeout(()=>d.classList.remove("spinning"),1e3))}),u.innerHTML="";let w=E.slice(0,5),k=E.slice(5);if(w.forEach(z=>{let D=ie(z),Y=document.createElement("div");Y.innerHTML=D;let K=Y.firstElementChild;K.addEventListener("click",ge=>{ge.target.closest(".bau-case-edit-btn")||Z(z)});let pe=K.querySelector(".bau-case-edit-btn");pe&&(pe.onclick=ge=>{ge.stopPropagation(),ae(z)}),u.appendChild(K)}),k.length>0){let z=document.createElement("li");z.className="bau-accordion-container";let D=document.createElement("button");D.className="bau-accordion-toggle",D.innerHTML=`${Ce.expand} <span>Mostrar ${k.length} casos mais antigos</span>`;let Y=document.createElement("ul");Y.className="bau-case-list bau-accordion-content",Y.style.display="none",k.forEach(K=>{let pe=ie(K),ge=document.createElement("div");ge.innerHTML=pe;let we=ge.firstElementChild;we.addEventListener("click",Qe=>{Qe.target.closest(".bau-case-edit-btn")||Z(K)});let Ye=we.querySelector(".bau-case-edit-btn");Ye&&(Ye.onclick=Qe=>{Qe.stopPropagation(),ae(K)}),Y.appendChild(we)}),D.addEventListener("click",()=>{let K=Y.style.display==="none";Y.style.display=K?"block":"none",D.classList.toggle("expanded",K),D.querySelector("span").textContent=K?"Esconder casos mais antigos":`Mostrar ${k.length} casos mais antigos`,S.playClick()}),z.appendChild(D),z.appendChild(Y),u.appendChild(z)}}function W(){let s=o==="BAU"?[1,2,3,4]:[5,4];N.querySelectorAll(".bau-step").forEach(E=>{let y=parseInt(E.id.replace("bau-step-","")),A=y===n,d=s.includes(y)||y===0;E.classList.toggle("active",A),E.style.display=A?"block":"none",E.querySelectorAll("input, select, textarea").forEach(w=>{w.disabled=!d})});let u=n===0;if(F.style.display=u?"none":"flex",!u){F.innerHTML="";let E=o==="BAU"?[1,2,3,4]:[5,4];E.forEach((y,A)=>{let d=document.createElement("div"),w=y===n,k=E.indexOf(n),z=A<k;d.className=`bau-progress-step ${w?"active":z?"completed":""}`,d.textContent=A+1,F.appendChild(d)})}let m=n===4;T.style.display=n>0?"inline-block":"none",q.style.display=!u&&!m?"inline-block":"none",B.style.display=m?"flex":"none",m&&oe()}function ee(s){let u=dt.steps.find(m=>m.id===s);if(!u||!u.fields||u.isConfirmation)return!0;for(let m of u.fields){let E=N.querySelector(`#bau-step-${s} #wrapper-${m.id}`);if(!(E&&E.style.display==="none")&&m.validation){let y=N.querySelector(`#bau-step-${s} [name="${m.name}"]`);if(y&&y.offsetParent!==null&&y.value.trim())if(new RegExp(m.validation.regex).test(y.value.trim())){y.classList.remove("invalid-cid");let d=N.querySelector("#bau-cid-error");d&&(d.style.display="none")}else{console.warn(`Validation failed for field "${m.name}" in step ${s}: Regex mismatch.`),S.playError(),J(M("errorPrefix")(Pe(m,"error")||m.validation.error),{error:!0}),y.classList.add("invalid-cid");let d=N.querySelector("#bau-cid-error");return d&&(d.style.display="flex"),!1}}}return!0}function G(s){if(!N.querySelector(`#bau-step-${s}`))return!1;let m=dt.steps.find(y=>y.id===s);if(!m||!m.fields||m.isConfirmation)return!0;let E=!0;for(let y of m.fields){let A=N.querySelector(`#bau-step-${s} #wrapper-${y.id}`);if(!(A&&A.style.display==="none")&&y.required){let d=!0,w="";if(y.type==="checkbox-grid")N.querySelector(`#bau-step-${s} input[name="${y.name}"]:checked`)||(w="No option selected in checkbox-grid",S.playError(),J(M("selectAtLeastOne")(Pe(y,"label")),{error:!0}),d=!1);else if(y.type==="datetime-group"){let k=N.querySelector(`#bau-step-${s} input[name="${y.fields[0].name}"]`);if(!k||k.offsetParent===null)continue;k.value.trim()||(w="Datetime group first field is empty",S.playError(),J(M("fieldRequiredDouble")(Pe(y.fields[0],"label")),{error:!0}),d=!1)}else{let k=N.querySelector(`#bau-step-${s} [name="${y.name}"]`);if(!k||k.offsetParent===null)continue;k.value.trim()||(w="Field is empty",S.playError(),J(M("fieldRequiredSingle")(Pe(y,"label")),{error:!0}),d=!1)}if(!d){console.warn(`Validation failed for required field "${y.name}" in step ${s}: ${w}`),E=!1;break}}}return E}q.addEventListener("click",()=>{if(ee(n)&&G(n)){o==="BAU"?n++:n===5?n=4:n++,W();let s=c.querySelector(".bau-content");s&&(s.scrollTop=0),S.playClick()}}),T.addEventListener("click",()=>{n>0&&(o==="BAU"?n--:n===4?n=5:n===5?n=0:n--,W(),S.playClick())});async function te(){let s=await Ge()||{};(!s.amName||s.amName==="N/A")&&(s.amName=s.internalEmail||"N/A"),a=s,N.querySelectorAll(".bau-vital-highlights").forEach(E=>{let y=[{label:"Anunciante",value:s.advName},{label:"CID",value:s.cid},{label:"Website",value:s.website||s.site},{label:"Case ID",value:s.caseId}];E.innerHTML=y.map(A=>{let d=A.value&&A.value!=="N/A"&&A.value!=="undefined"&&A.value!=="null"?A.value:M("notCaptured");return`
                    <div class="bau-highlight-item">
                        <span class="bau-highlight-label">${A.label}</span>
                        <span class="bau-highlight-value">${d}</span>
                    </div>
                `}).join("")}),dt.steps.forEach(E=>{E.fields&&E.fields.forEach(y=>{if(y.isSmart){let A=s[y.id];y.id==="language"&&s.userProfile?.defaultLanguage&&(A=s.userProfile.defaultLanguage);let d=N.querySelector(`#bau-step-${E.id} [name="${y.name}"]`),w=N.querySelector(`#bau-step-${E.id} #wrapper-${y.id}`);if(d&&(d.value=A&&A!=="N/A"?A:"",y.id==="language"&&A&&A!=="N/A"&&(d.readOnly=!0,d.style.background="#F1F3F4",d.style.cursor="not-allowed")),w){let k=A&&A!==""&&A!=="N/A"&&A!=="undefined"&&A!=="null";y.id==="language"?w.style.display="block":w.style.display=k?"none":"block"}}})}),N.querySelectorAll(".bau-all-data").forEach(E=>{let y=[{label:"Anunciante",value:s.advName},{label:"CID",value:s.cid},{label:"AM",value:s.amName},{label:"SE ID",value:s.seId},{label:"Site",value:s.website||s.site},{label:"Email",value:s.email},{label:"Timezone",value:s.timezone},{label:"Case ID",value:s.caseId},{label:"Programa",value:s.salesProgram},{label:"Idioma",value:s.language}];E.innerHTML=`
                <div class="bau-context-badges-grid">
                    ${y.filter(A=>A.value&&A.value!=="N/A"&&A.value!=="---"&&A.value!=="undefined"&&A.value!=="null").map(A=>`
                            <div class="bau-context-badge">
                                <span class="bau-badge-label">${A.label}:</span>
                                <span class="bau-badge-value">${A.value}</span>
                            </div>
                        `).join("")}
                </div>
            `})}c.querySelector("#bau-top-se-search")?.addEventListener("click",s=>{s.preventDefault(),Gt("bau-form-seId")});let Q=c.querySelector("#bau-form-cid");Q&&Q.addEventListener("input",()=>ee(1));function oe(){let s=new FormData(N),u=Object.fromEntries(s.entries()),m=c.querySelector("#bau-confirmation-details");if(m){if(o==="BAU"){let E=s.getAll("taskType"),y=E.length>0?E.join(", "):M("none");m.innerHTML=`
                ${i?`<div class="bau-highlight-panel" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${ct.yellow}; background: rgba(255, 186, 0, 0.05); border-radius: 8px; font-weight: 500;">${M("editingCaseHash")(`<span style="color: ${ct.yellow}">${r}</span>`)}</div>`:""}
                <div class="bau-confirmation-grid">
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Anunciante</span>
                        <input class="bau-confirm-value-input" data-field="advName" data-step="1" value="${u.advName||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">CID</span>
                        <input class="bau-confirm-value-input" data-field="cid" data-step="1" value="${u.cid||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">AM</span>
                        <input class="bau-confirm-value-input" data-field="amName" data-step="1" value="${u.amName||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Website</span>
                        <input class="bau-confirm-value-input" data-field="website" data-step="1" value="${u.website||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Speakeasy ID</span>
                        <input class="bau-confirm-value-input" data-field="seId" data-step="1" value="${u.seId||""}" placeholder="${M("notInformedPlaceholder")}">
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${M("whatMustBeDone")}</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="reason" data-step="2" placeholder="---">${u.reason||""}</textarea>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Tasks</span>
                        <span class="bau-confirm-value-input" style="cursor: default; opacity: 0.8;" title="${M("editTasksHint")}">${y}</span>
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${M("bauJustification")}</span>
                        <select class="bau-confirm-value-input" data-field="nonImplementationReason" data-step="3">
                            <option value="Tempo da consultoria esgotado" ${u.nonImplementationReason==="Tempo da consultoria esgotado"?"selected":""}>${We("Tempo da consultoria esgotado")}</option>
                            <option value="Solicita\xE7\xE3o de reagendamento pelo anunciante" ${u.nonImplementationReason==="Solicita\xE7\xE3o de reagendamento pelo anunciante"?"selected":""}>${We("Solicita\xE7\xE3o de reagendamento pelo anunciante")}</option>
                            <option value="Falta de acessos ou backup do site" ${u.nonImplementationReason==="Falta de acessos ou backup do site"?"selected":""}>${We("Falta de acessos ou backup do site")}</option>
                            <option value="Anunciante indispon\xEDvel ou n\xE3o preparado" ${u.nonImplementationReason==="Anunciante indispon\xEDvel ou n\xE3o preparado"?"selected":""}>${We("Anunciante indispon\xEDvel ou n\xE3o preparado")}</option>
                            <option value="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)" ${u.nonImplementationReason==="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"?"selected":""}>${We("Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)")}</option>
                            <option value="Solicita\xE7\xE3o de tarefas (tasks) adicionais" ${u.nonImplementationReason==="Solicita\xE7\xE3o de tarefas (tasks) adicionais"?"selected":""}>${We("Solicita\xE7\xE3o de tarefas (tasks) adicionais")}</option>
                            <option value="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)" ${u.nonImplementationReason==="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"?"selected":""}>${We("Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)")}</option>
                            <option value="Retorno de contato ap\xF3s prazo de 14 dias expirado" ${u.nonImplementationReason==="Retorno de contato ap\xF3s prazo de 14 dias expirado"?"selected":""}>${We("Retorno de contato ap\xF3s prazo de 14 dias expirado")}</option>
                        </select>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${M("description")}</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="3" placeholder="---">${u.description||""}</textarea>
                    </div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${M("availabilityPriority")}</span>
                        <input type="datetime-local" class="bau-confirm-value-input" data-field="availability_1" data-step="3" value="${u.availability_1||""}">
                    </div>
                </div>
            `}else m.innerHTML=`
                ${i?`<div class="bau-highlight-panel discard-theme" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${ct.red}; background: rgba(217, 48, 37, 0.05); border-radius: 8px; font-weight: 500;">${M("editingDiscardHash")(`<span style="color: ${ct.red}">${r}</span>`)}</div>`:""}
                <div class="bau-confirmation-grid">
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Case ID</span>
                        <input class="bau-confirm-value-input" data-field="caseId" data-step="5" value="${u.caseId||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Idioma</span>
                        <input class="bau-confirm-value-input" data-field="language" data-step="5" value="${u.language||""}" placeholder="---" readonly style="opacity: 0.7;">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Speakeasy ID</span>
                        <input class="bau-confirm-value-input" data-field="seId" data-step="5" value="${u.seId||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${M("discardReason")}</span>
                        <input class="bau-confirm-value-input" data-field="reason" data-step="5" value="${u.reason||""}" placeholder="---" readonly style="opacity: 0.7;">
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${M("discardDescription")}</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="5" placeholder="---">${u.description||""}</textarea>
                    </div>
                </div>
            `;m.querySelectorAll(".bau-confirm-value-input").forEach(E=>{E.addEventListener("input",y=>{let A=y.target.dataset.field,d=y.target.dataset.step;if(!A||!d)return;let w=N.querySelector(`#bau-step-${d} [name="${A}"]`);w&&(w.value=y.target.value,A==="cid"&&ee(1))})})}}async function ae(s){if(!await Te(M("editPageWarning"),{confirmText:M("onCorrectPage")}))return;I(!0),v(),i=!0,r=s.id,o=s.status==="PENDING_TL_DISCARD"||s.reason&&!s.task?"DISCARD":"BAU",U("form"),await te(),a={...a,advName:s.advName||a.advName,cid:s.cid||a.cid,caseId:s.caseId||a.caseId,seId:s.seId||a.seId,site:s.site||s.website||a.site||a.website,email:s.advEmail||a.email,timezone:s.timezone||a.timezone,language:s.language||a.language,amName:s.amName||a.amName,salesProgram:s.salesProgram||a.salesProgram};let m=s.availability?s.availability.split("|").map(E=>E.trim()):[];N.querySelectorAll("input, select, textarea").forEach(E=>{let y=E.name,d={advEmail:"advEmail",website:"site",site:"site"}[y]||y;if(y==="taskType"){let w=(s.task||s.taskType||"").split(",").map(k=>k.trim());E.type==="checkbox"&&(E.checked=w.includes(E.value),E.closest(".bau-task-item")?.classList.toggle("active",E.checked))}else if(y.startsWith("availability_")){let w=parseInt(y.split("_")[1])-1,k=m[w];if(k&&E.type==="datetime-local")try{let z=new Date(k);if(!isNaN(z.getTime())){let D=new Date(z.getTime()-z.getTimezoneOffset()*6e4).toISOString().slice(0,16);E.value=D}}catch{}}else s[d]!==void 0?E.value=s[d]:y==="reason"?E.value=s.reason:y==="description"?E.value=s.description:y==="nonImplementationReason"&&(E.value=s.nonImplementationReason||"")}),n=o==="BAU"?1:5,W(),S.playClick(),setTimeout(()=>I(!1),500)}N.onsubmit=async s=>{s.preventDefault();let u=o==="BAU"?[1,2,3]:[5];for(let w of u)if(!dt.steps.find(z=>z.id===w)?.isConfirmation&&(!ee(w)||!G(w))){console.warn(`Form submission blocked by validation failure in step ${w}`),n=w,W();return}let m=c.querySelector(".bau-btn-submit");m.disabled=!0,m.innerHTML=M("sending");let E=new FormData(N),y=Object.fromEntries(E.entries()),A=a||{},d={...A,...y,requestType:o};if(y.advEmail?d.advEmail=y.advEmail:A.email&&(d.advEmail=A.email),y.website?d.website=y.website:A.website?d.website=A.website:A.site&&(d.website=A.site),o==="BAU"){let w=E.getAll("taskType"),k=[y.availability_1,y.availability_2,y.availability_3].filter(z=>z&&z.trim()!=="").join(" | ");d.taskType=w.join(", "),d.availability=k,i?(y.nonImplementationReason?d.nonImplementationReason=y.nonImplementationReason:delete d.nonImplementationReason,y.description?d.description=y.description:delete d.description):(d.nonImplementationReason=y.nonImplementationReason||"",d.description=y.description||"",d.nonImplementationReason||console.warn("Aviso: Campo 'Justificativa' (nonImplementationReason) est\xE1 saindo vazio."),d.description||console.warn("Aviso: Campo 'Descri\xE7\xE3o detalhada' (description) est\xE1 saindo vazio."))}else d.reason=y.reason,i?(y.description?d.description=y.description:delete d.description,delete d.taskType,delete d.availability,delete d.nonImplementationReason):(d.taskType="",d.availability="",d.nonImplementationReason="",d.description=y.description||"");try{let w=null;i?await za(r,d):w=await _a(d,A.agentEmail||"anon"),S.playSuccess();let k=c.querySelector(".bau-success-title");k&&(i?k.textContent=M("caseUpdatedSuccess"):k.textContent=M(o==="DISCARD"?"caseDiscardSentSuccess":"caseSentSuccess")),U("success"),!i&&w&&w.emailSent===!1&&(S.playError(),J(M("caseCreatedNoEmailConfirm"),{error:!0}))}catch(w){S.playError(),J(M("errorPrefix")(w.message||M("unknownError")),{error:!0}),console.error("Payload que tentou enviar:",d)}finally{m.disabled=!1,m.innerHTML=`${Ce.send} ${M("submitToTl")}`}};function v(){N.reset(),n=0,o="BAU",i=!1,r=null,W(),N.querySelectorAll(".bau-task-item.active").forEach(u=>u.classList.remove("active"));let s=N.querySelector('[name="language"]');s&&(s.readOnly=!1,s.style.background="",s.style.cursor="")}c.querySelector("#bau-new-case-btn").addEventListener("click",()=>{v(),U("form"),te()}),c.querySelector("#bau-form-back-btn").addEventListener("click",()=>U("dashboard")),c.querySelector("#bau-success-back-btn").addEventListener("click",()=>U("dashboard"));async function $(){e=!e,c.style.display=e?"flex":"none",e?(Se(),U("dashboard"),_()):Ee(),Le(e,c,"cw-btn-bauform")}return W(),ye(()=>{let s=c.querySelector(".cw-help-title");s&&(s.textContent=M("headerTitle"));let u=c.querySelector(".cw-help-description");u&&(u.textContent=M("headerDesc"));let m=c.querySelector(".js-bau-new-case");m&&(m.textContent=M("newBauCase"));let E=c.querySelector(".js-bau-back-dashboard");E&&(E.textContent=M("backToDashboard"));let y=c.querySelector(".js-bau-configuring-edit");y&&(y.textContent=M("configuringEdit"));let A=c.querySelector(".js-bau-success-title");A&&(A.textContent=M("caseSentSuccess"));let d=c.querySelector(".js-bau-success-sub");d&&(d.textContent=M("caseSentSuccessSub"));let w=c.querySelector(".js-bau-success-back");w&&(w.textContent=M("backToDashboard")),T.textContent=M("back"),q.textContent=M("next"),U(t),t==="form"&&N.querySelectorAll(".bau-step").forEach(k=>{let z=parseInt(k.id.replace("bau-step-",""),10),D=dt.steps.find(Y=>Y.id===z);!D||D.isBranching||D.isConfirmation||k.querySelectorAll(".bau-dynamic-input").forEach(Y=>{let K=Y.id.replace("wrapper-",""),pe=D.fields?.find(Ye=>Ye.id===K);if(!pe)return;let ge=Y.querySelector(".bau-label");ge&&pe.label&&(ge.textContent=Pe(pe,"label"),pe.tooltip&&ge.setAttribute("data-tooltip",Pe(pe,"tooltip")));let we=Y.querySelector("input, textarea, select");if(we&&pe.placeholder&&(we.placeholder=Pe(pe,"placeholder")),pe.type==="select"){let Ye=pe.groups?pe.groups.flatMap(Qe=>Qe.options):pe.options||[];Y.querySelectorAll("option").forEach((Qe,Mt)=>{let Et=Ye[Mt];Et&&(Qe.textContent=We(Et.text))})}})}),t==="dashboard"&&_()}),$}var Oe={notes:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',library:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',timezone:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',configs:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>',broadcast:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',enter:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>',arrowDown:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',arrowUp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>',bolt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>'};function qi(){if(document.getElementById("cw-palette-styles"))return;let e=document.createElement("style");e.id="cw-palette-styles",e.textContent=`
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

        .cw-palette-footer { display: flex; gap: 16px; padding: 10px 20px; border-top: 1px solid #F1F3F4; background: #FAFAFA; font-size: 11px; color: #9AA0A6; font-weight: 600; }
        .cw-palette-footer span { display: flex; align-items: center; gap: 4px; }
        .cw-palette-footer svg { width: 12px; height: 12px; }
    `,document.head.appendChild(e)}var Cn={pt:{ariaLabel:"Busca r\xE1pida",placeholder:"Buscar um m\xF3dulo...",empty:"Nada encontrado.",navigate:"navegar",select:"selecionar",close:"esc fechar"},es:{ariaLabel:"B\xFAsqueda r\xE1pida",placeholder:"Buscar un m\xF3dulo...",empty:"No se encontr\xF3 nada.",navigate:"navegar",select:"seleccionar",close:"esc cerrar"}};function Je(e){let t=se();return Cn[t]?.[e]??Cn.pt[e]}function An(e){qi();function t(x){return x.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}let a=typeof e.toggleNotes=="function"&&typeof e.toggleNotes.openWithPreset=="function"?Object.entries(mt).filter(([,x])=>x.quickLaunch).map(([x,L])=>({id:`note-preset-${x}`,label:L.quickLaunch.label,hint:{pt:"Atalho de nota \xB7 abre pr\xE9-preenchida",es:"Atajo de nota \xB7 abre precompletada"},keywords:`nota atalho atajo preset ${L.quickLaunch.keywords||""}`,icon:Oe.bolt,isPreset:!0,run:()=>e.toggleNotes.openWithPreset(x)})):[],n=[{id:"notes",label:"Case Notes",hint:{pt:"Montar a nota t\xE9cnica do caso",es:"Armar la nota t\xE9cnica del caso"},keywords:"notas nota caso anotacoes anotaciones",icon:Oe.notes,run:e.toggleNotes},{id:"bauform",label:"BAU Form",hint:{pt:"Solicita\xE7\xE3o de cria\xE7\xE3o/descarte BAU",es:"Solicitud de creaci\xF3n/descarte BAU"},keywords:"bau formulario solicitacao solicitud criacao creacion descarte",icon:Oe.bauform,run:e.toggleBAUForm},{id:"email",label:"Email Assistant",hint:{pt:"Templates inteligentes de e-mail",es:"Plantillas inteligentes de correo"},keywords:"email e-mail correio correo template plantilla",icon:Oe.email,run:e.toggleEmail},{id:"script",label:"Call Script",hint:{pt:"Guia interativo de chamada",es:"Gu\xEDa interactiva de llamada"},keywords:"script roteiro guion chamada llamada ligacao",icon:Oe.script,run:e.toggleScript},{id:"links",label:"Central de Links",hint:{pt:"Ferramentas, SOPs e atalhos",es:"Herramientas, SOPs y atajos"},keywords:"links atalhos atajos ferramentas herramientas sop sops",icon:Oe.links,run:e.toggleLinks},{id:"library",label:"Minha Biblioteca",hint:{pt:"Snippets e respostas salvas",es:"Snippets y respuestas guardadas"},keywords:"biblioteca snippets respostas respuestas salvas guardadas",icon:Oe.library,run:e.toggleLibrary},{id:"timezone",label:"Fusos Hor\xE1rios",hint:{pt:"Monitoramento e planejador de chamada",es:"Monitoreo y planificador de llamada"},keywords:"fuso horario timezone",icon:Oe.timezone,run:e.toggleTimezone},{id:"broadcast",label:"Avisos",hint:{pt:"Comunicados e disponibilidade BAU",es:"Comunicados y disponibilidad BAU"},keywords:"avisos broadcast comunicados disponibilidade disponibilidad",icon:Oe.broadcast,run:()=>e.broadcastControl&&e.broadcastControl.toggle()},{id:"configs",label:"Configura\xE7\xF5es",hint:{pt:"Perfil, som e prefer\xEAncias",es:"Perfil, sonido y preferencias"},keywords:"configuracoes configuracion config preferencias perfil som sonido",icon:Oe.configs,run:e.toggleConfigs},...a].filter(x=>typeof x.run=="function").map(x=>({...x,_haystack:t(`${x.label} ${x.hint.pt} ${x.hint.es} ${x.keywords}`)})),o=!1,i=0,r=n,l=document.createElement("div");l.className="cw-palette-overlay",l.setAttribute("role","dialog"),l.setAttribute("aria-modal","true"),l.setAttribute("aria-label",Je("ariaLabel"));let c=document.createElement("div");c.className="cw-palette",c.innerHTML=`
        <div class="cw-palette-search">
            <span class="cw-palette-search-icon">${Oe.search}</span>
            <input type="text" class="cw-palette-input" placeholder="${Je("placeholder")}" autocomplete="off" spellcheck="false">
        </div>
        <div class="cw-palette-list"></div>
        <div class="cw-palette-footer">
            <span class="js-cp-navigate">${Oe.arrowDown}${Oe.arrowUp} ${Je("navigate")}</span>
            <span class="js-cp-select">${Oe.enter} ${Je("select")}</span>
            <span class="js-cp-close">${Je("close")}</span>
        </div>
    `,l.appendChild(c),l.onmousedown=x=>{x.target===l&&O()};let h=c.querySelector(".cw-palette-input"),p=c.querySelector(".cw-palette-list");function f(){if(p.innerHTML="",r.length===0){p.innerHTML=`<div class="cw-palette-empty">${Je("empty")}</div>`;return}r.forEach((L,j)=>{let I=document.createElement("div");I.className="cw-palette-item"+(j===i?" selected":""),I.innerHTML=`
                <span class="cw-palette-item-icon${L.isPreset?" cw-palette-item-icon--preset":""}">${L.icon}</span>
                <span class="cw-palette-item-text">
                    <span class="cw-palette-item-label">${L.label}</span>
                    <span class="cw-palette-item-hint">${L.hint[se()]||L.hint.pt}</span>
                </span>
            `,I.onmouseenter=()=>{i=j,f()},I.onclick=()=>b(j),p.appendChild(I)});let x=p.children[i];x&&x.scrollIntoView({block:"nearest"})}function b(x){let L=r[x];L&&(S.playClick(),O(),L.run())}function g(){o||(o=!0,r=n,i=0,h.value="",f(),Se(),document.body.appendChild(l),S.playGenieOpen(),requestAnimationFrame(()=>{l.classList.add("active"),h.focus()}))}function O(){o&&(o=!1,Ee(),l.classList.remove("active"),setTimeout(()=>l.remove(),200))}function C(){o?O():g()}return h.addEventListener("input",()=>{let x=t(h.value.trim());r=x?n.filter(L=>L._haystack.includes(x)):n,i=0,f()}),h.addEventListener("keydown",x=>{x.key==="ArrowDown"?(x.preventDefault(),i=Math.min(i+1,r.length-1),f()):x.key==="ArrowUp"?(x.preventDefault(),i=Math.max(i-1,0),f()):x.key==="Enter"?(x.preventDefault(),b(i)):x.key==="Escape"&&(x.preventDefault(),O())}),document.addEventListener("keydown",x=>{(x.metaKey||x.ctrlKey)&&x.key.toLowerCase()==="k"&&(x.preventDefault(),C())}),ye(()=>{l.setAttribute("aria-label",Je("ariaLabel")),h.placeholder=Je("placeholder");let x=c.querySelector(".js-cp-navigate");x&&(x.innerHTML=`${Oe.arrowDown}${Oe.arrowUp} ${Je("navigate")}`);let L=c.querySelector(".js-cp-select");L&&(L.innerHTML=`${Oe.enter} ${Je("select")}`);let j=c.querySelector(".js-cp-close");j&&(j.textContent=Je("close")),f()}),{open:g,close:O,toggle:C}}function Fi(){if(window.techSolInitialized){ca();return}window.techSolInitialized=!0;let e="v5.2";console.log(`\u{1F680} TechSol Suite Initializing (${e})...`);try{Ja();try{S.initGlobalListeners()}catch(b){console.warn("\xC1udio bloqueado:",b)}he.fetchTips();let t=ca(),a=zo(),n=Ho(),o=Yo(),i=en(),r=gn(),l=hn(),c=xn(),h=En(),p=an(),f={toggleNotes:a,toggleEmail:n,toggleScript:o,toggleLinks:i,toggleTimezone:r,toggleLibrary:l,toggleConfigs:c,toggleBAUForm:h,broadcastControl:p};Lo(f,t),An(f),setTimeout(()=>{he.logEvent("App","Start","Session Start");let b=ke();(b?ht(b.split("@")[0]).then(O=>{O&&Wa(O)}).catch(O=>console.warn("N\xE3o foi poss\xEDvel resolver o idioma do perfil:",O)):Promise.resolve()).finally(()=>{rn(),setTimeout(()=>{cn(e)},500)})},2500)}catch(t){console.error("Erro fatal na inicializa\xE7\xE3o:",t),S.playError(),J("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}Fi();})();
