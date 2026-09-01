(()=>{var bo={production:"AKfycbxkheuq28ENsHMZMH8t9-u4EIrktHC6cBi-87boDre0jJfl1lnSCPBzaEkw6hy3Cx6fAg",development:"AKfycbyUtczRMulDAyO_1ku39Rb01zarPMw1JvO7aNOdJPYeAgCC7G9mmb-P_EuXP6kvo8l2LA"},aa="development",$i=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",ho=bo[aa]||bo.development,qa=$i?"dev":"exec",Bi=`https://script.google.com/a/macros/google.com/s/${ho}/${qa}`,xo=ho.slice(-6);function Dt(){return{env:aa,isDev:aa!=="production",endpoint:qa,fingerprint:xo}}console.log(`[Case Wizard] backend: ${aa}/${qa} \xB7 implanta\xE7\xE3o \u2026${xo}`);var Pi="cw_data_broadcast",Gi="cw_data_tips",fo="cw_content_",ji=["Processando...","Mantenha o foco!","Aguarde..."];function Ke(e,t={}){return new Promise((a,o)=>{let n="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script"),r=setTimeout(()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[n],o(new Error("Timeout: A API demorou muito para responder. (Apps Script bloqueado ou erro 500)"))},15e3);window[n]=g=>{clearTimeout(r),document.body.contains(i)&&document.body.removeChild(i),delete window[n],a(g)};let l=Object.keys(t).map(g=>encodeURIComponent(g)+"="+encodeURIComponent(t[g])).join("&"),c=`${Bi}?op=${e}&callback=${n}&t=${Date.now()}&${l}`;i.src=c,i.onerror=()=>{clearTimeout(r),document.body.contains(i)&&document.body.removeChild(i),delete window[n],o(new Error("Erro de conex\xE3o JSONP."))},document.body.appendChild(i)})}var me={fetchTips:async()=>{try{await me.fetchContentModule("tips")}catch(e){console.warn("Tips offline",e)}},getCachedBroadcasts:()=>{try{return JSON.parse(localStorage.getItem(Pi)||"[]")}catch{return[]}},fetchContentModule:async e=>{let t=`${fo}${e}`;try{let a=await Ke("content_public",{module:e});if(a?.status==="success"&&Array.isArray(a.items))return localStorage.setItem(t,JSON.stringify(a.items)),a.items}catch(a){console.warn(`Conte\xFAdo '${e}' offline`,a)}return me.getCachedContent(e)},getCachedContent:e=>{try{return JSON.parse(localStorage.getItem(`${fo}${e}`)||"null")}catch{return null}},getRandomTip:()=>{let e=null,t=me.getCachedContent("tips");if(Array.isArray(t)&&t.length&&(e=t.map(a=>a.value).filter(Boolean)),!e||!e.length){let a=localStorage.getItem(Gi);if(a)try{e=JSON.parse(a)}catch{}}return(!Array.isArray(e)||!e.length)&&(e=ji),e[Math.floor(Math.random()*e.length)]},logEvent:(e,t,a="",o=null)=>{try{let n="anon";try{let r=Le();r&&(n=r.split("@")[0].toLowerCase())}catch{}let i={timestamp:new Date().toISOString(),user:n,version:"v5.1",category:e,action:t,label:a,value:o||""};Ke("log",i).catch(r=>{})}catch(n){console.warn("Analytics error",n)}},logUsage:()=>{},sendBAUEscalation:async(e,t)=>{let a={...e,user:t,date:new Date().toISOString()};try{console.log("Executando create_bau...",a);let o=await Ke("create_bau",a);if(o&&o.status==="success")return console.log("Sucesso: create_bau"),o;throw new Error(o?.error||o?.message||"Falha na opera\xE7\xE3o BAU")}catch(o){throw console.error("Erro JSONP (BAU):",o),o}},readAgentBAU:async()=>{let e=Le();if(!e)return console.warn("Email n\xE3o encontrado. N\xE3o foi poss\xEDvel buscar casos BAU."),[];try{console.log("Buscando casos BAU para:",e);let t=await Ke("read_agent_bau",{user:e});if(t&&t.status==="success"&&Array.isArray(t.cases))return t.cases;if(t&&t.status==="error")throw new Error(t.message||"Erro retornado pela API de leitura");return[]}catch(t){throw console.error("Erro ao buscar casos BAU:",t),t}},updateBAUStatus:async(e,t,a={})=>{let o=Le();try{console.log(`Atualizando status BAU ${e} para ${t}...`);let n=await Ke("update_bau_status",{id:e,status:t,user:o,...a});return n&&n.status==="success"}catch(n){return console.error("Erro ao atualizar status BAU:",n),!1}},updateBAUEscalation:async(e,t)=>{let a=Le(),o={...t,id:e,user:a,date_edited:new Date().toISOString()};try{console.log(`Executando update_bau para ${e}...`,o);let n=await Ke("update_bau",o);if(n&&n.status==="success")return console.log("Sucesso: update_bau"),n;throw new Error(n?.error||n?.message||"Falha na atualiza\xE7\xE3o BAU")}catch(n){throw console.error("Erro JSONP (Update BAU):",n),n}},fetchUserProfile:async e=>{try{console.log(`Buscando perfil para: ${e}`);let t=await Ke("get_user_profile",{ldap:e});return console.log("Resposta bruta do servidor:",t),t&&t.status==="success"&&t.profile?t.profile:null}catch(t){return console.error("Erro ao buscar perfil:",t),null}},getUserSnippets:async e=>{try{return console.log("Buscando snippets para:",e),await Ke("get_user_snippets",{user:e})}catch(t){return console.error("Erro ao carregar snippets:",t),{status:"error",snippets:[]}}},saveSnippet:async(e,t)=>{let a={id:e.id,type:e.type,title:e.title,content:e.content,subject:e.subject||"",isCode:e.isCode,isRich:e.isRich,user:t};try{console.log("Salvando snippet na nuvem:",a);let o=await Ke("save_snippet",a);return o&&o.status==="success"}catch(o){return console.error("Erro ao salvar snippet:",o),!1}},deleteSnippet:async(e,t)=>{try{console.log(`Deletando snippet ${e}...`);let a=await Ke("delete_snippet",{id:e,user:t});return a&&a.status==="success"}catch(a){return console.error("Erro ao deletar snippet:",a),!1}},getUserPrefs:async e=>{try{let t=await Ke("get_user_prefs",{user:e});return t&&t.status==="success"?t.prefs||{}:null}catch(t){return console.warn("Erro ao carregar prefer\xEAncias:",t),null}},saveUserPrefs:async(e,t)=>{try{let a=await Ke("save_user_prefs",{user:t,prefs:JSON.stringify(e||{})});return!!(a&&a.status==="success")}catch(a){return console.warn("Erro ao salvar prefer\xEAncias:",a),!1}}},vo=me.sendBAUEscalation,yo=me.readAgentBAU,bs=me.updateBAUStatus,wo=me.updateBAUEscalation,kt=me.fetchUserProfile,fs=me.getUserSnippets,hs=me.saveSnippet,xs=me.deleteSnippet,vs=me.getUserPrefs,ys=me.saveUserPrefs;var ue=e=>new Promise(t=>setTimeout(t,e));function Pe(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(a=>e.dispatchEvent(new MouseEvent(a,t)))}function qt(e){e&&["mousedown","mouseup","click"].forEach(t=>e.dispatchEvent(new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window})))}function yt(e,t,a){return Math.max(t,Math.min(e,a))}var zt=0,Tt=0;function ke(){if(zt===0&&(Tt=window.innerWidth-document.documentElement.clientWidth,Tt>0)){let e=parseFloat(getComputedStyle(document.body).paddingRight)||0;document.body.style.paddingRight=`${e+Tt}px`}zt++,document.body.style.overflow="hidden"}function Te(){if(zt=Math.max(0,zt-1),zt===0&&(document.body.style.overflow="",Tt>0)){let e=parseFloat(getComputedStyle(document.body).paddingRight)||0,t=Math.max(0,e-Tt);document.body.style.paddingRight=t?`${t}px`:"",Tt=0}}var So=!1;function Hi(){if(So||document.getElementById("cw-filled-check-styles"))return;let e=document.createElement("style");e.id="cw-filled-check-styles",e.textContent=`
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
    `,document.head.appendChild(e),So=!0}var Eo=!1;function Ui(){if(Eo||document.getElementById("cw-empty-state-styles"))return;let e=document.createElement("style");e.id="cw-empty-state-styles",e.textContent=`
        .cw-empty-illustrated { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 12px; padding: 32px 20px; }
        .cw-empty-illustrated-badge { border-radius: 50%; background: #F8F9FA; display: flex; align-items: center; justify-content: center; color: #9AA0A6; flex-shrink: 0; }
        .cw-empty-illustrated-badge svg { width: 44%; height: 44%; }
        .cw-empty-illustrated-title { font-family: 'Google Sans', Roboto, sans-serif; font-size: 15px; font-weight: 600; color: #202124; }
        .cw-empty-illustrated-subtitle { font-size: 12px; color: #5F6368; line-height: 1.5; max-width: 240px; }
    `,document.head.appendChild(e),Eo=!0}function Rt({icon:e,title:t,subtitle:a="",size:o=88}){Ui();let n=document.createElement("div");return n.className="cw-empty-illustrated",n.innerHTML=`
        <div class="cw-empty-illustrated-badge" style="width:${o}px;height:${o}px;">${e}</div>
        <div class="cw-empty-illustrated-title">${t}</div>
        ${a?`<div class="cw-empty-illustrated-subtitle">${a}</div>`:""}
    `,n}function oa(e,t){e.addEventListener("keydown",a=>{if(a.key!=="ArrowDown"&&a.key!=="ArrowUp")return;let o=document.activeElement;if(!o||!o.matches(t))return;let n=Array.from(e.querySelectorAll(t)).filter(l=>l.offsetParent!==null),i=n.indexOf(o);if(i===-1)return;a.preventDefault();let r=a.key==="ArrowDown"?Math.min(i+1,n.length-1):Math.max(i-1,0);n[r].focus()})}var Co=!1;function Vi(){if(Co||document.getElementById("cw-pending-field-styles"))return;let e=document.createElement("style");e.id="cw-pending-field-styles",e.textContent=`
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
    `,document.head.appendChild(e),Co=!0}function Ao(e,{duration:t=2400}={}){e&&(Vi(),e.classList.add("cw-quicklaunch-pending"),e.scrollIntoView({behavior:"smooth",block:"center"}),e.focus({preventScroll:!0}),setTimeout(()=>e.classList.remove("cw-quicklaunch-pending"),t))}function na(e,{minLength:t=2}={}){Hi();let a=e.parentElement;a&&getComputedStyle(a).position==="static"&&(a.style.position="relative"),e.classList.add("cw-dopamine-field");let o=document.createElement("span");o.className="cw-dopamine-check",o.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',e.insertAdjacentElement("afterend",o);let n=()=>{let i=e.value.trim().length>=t;e.classList.toggle("filled",i),o.classList.toggle("show",i)};e.addEventListener("input",n),n()}var ia="",$t="",Bt=null;async function La(){try{let e=document.querySelector('material-button[debug-id="toggle-translation-button"]');if(e){let t=e.textContent.toLowerCase();(t.includes("show original")||t.includes("mostrar original"))&&(console.log("TechSol: Tradu\xE7\xE3o detectada. Revertendo para o idioma original..."),e.click(),await ue(400))}}catch(e){console.warn("TechSol: Erro ao tentar reverter tradu\xE7\xE3o:",e)}}async function Pt(){if(ia&&$t)return ia;try{let e=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!e)return"Agente";e.click(),await ue(150);let t="Consultor",a=document.querySelector("profile-details .name");if(a)t=a.textContent.trim().split(" ")[0],t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();else{let n=document.querySelector("profile-details img");if(n&&n.src.includes("/photos/")){let i=n.src.match(/\/photos\/([^\?]+)/)[1];t=i.charAt(0).toUpperCase()+i.slice(1)}}let o=document.querySelector("profile-details .email");return o&&($t=o.textContent.trim(),console.log("TechSol: Identidade confirmada ->",$t)),e.click(),document.body.click(),ia=t,t}catch(e){return console.warn("Sherlock falhou:",e),"Consultor"}}function Gt(){return ia||"Consultor"}function Le(){return $t||null}function ko(e){let t=new Date,a=t.getHours(),o=t.getDay(),n="Ol\xE1",i="";a>=5&&a<12?(n="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):a>=12&&a<18?(n="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(n="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let r=[];a>=0&&a<5?r=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:a<12?o===1?r=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?r=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:r=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:a<18?r=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:r=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(r=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let l=r[Math.floor(Math.random()*r.length)];return{prefix:`${n},`,name:e,suffix:l,icon:i,isFriday:o===5}}async function Wi(){try{let t=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!t)return null;let a=t.parentElement,o=a.querySelector(".unmask-button")||a.querySelector('[aria-label="Click to view"]');o&&(o.click(),await ue(500));let i=Array.from(a.querySelectorAll("a, span, div, pii-value")).find(r=>{let l=r.innerText.trim();return l.includes("@")&&!l.includes("Is this:")&&l.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(e){return console.warn("Erro ao capturar email do cliente:",e),null}}function Yi(){try{let e=document.querySelector('material-input[debug-id="account-id-input"]');if(e){let t=e.querySelector("input");if(t){let a=t.value.trim();if(a)return a.includes("@")?a:`${a}@google.com`}}}catch(e){console.warn("Erro ao capturar email interno:",e)}return null}function Xi(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(n=>n.textContent.includes("Google Ads External Customer ID")||n.textContent.includes("Customer ID"));if(t){let n=t.closest("home-data-item")||t.parentElement;if(n){let i=n.querySelector(".data-pair-content");if(i)return i.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let o=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(o)return o[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(e){console.warn("Erro ao capturar CID:",e)}return"N/A"}function Ki(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(a=>a.textContent.includes("Account Manager")||a.textContent.includes("AM Name")||a.textContent.includes("Sales Rep"));if(t){let a=t.closest(".data-pair")||t.parentElement,o=a.querySelector(".data-pair-content")||a.nextElementSibling;if(o)return o.textContent.trim()}}catch(e){console.warn("Erro ao capturar AM:",e)}return null}function Ji(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(a=>a.textContent.toLowerCase().includes("customer time zone")||a.textContent.toLowerCase().includes("time zone")||a.textContent.toLowerCase().includes("timezone"));if(t){let a=t.parentElement;if(a){let o=a.querySelector("sanitized-content");if(o&&o.textContent.trim())return o.textContent.trim();let n=a.querySelector(".data-pair-content")||t.nextElementSibling;if(n&&n.textContent.trim()){let i=n.textContent.trim();if(i&&i!=="---"&&i!=="N/A")return i}}}}catch(e){console.warn("Erro ao capturar Timezone:",e)}return null}async function Zi(){let e="---";try{e=window.location.href.split("/").pop()}catch(t){console.warn("Falha URL:",t)}return e}function Qi(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(a=>a.textContent.toLowerCase().includes("sales program")||a.textContent.toLowerCase().trim()==="program"||a.textContent.toLowerCase().includes("programa"));if(t){let a=t.closest(".data-pair")||t.parentElement,o=a.querySelector('sanitized-content ng-template[debug-id="html-value"]')||a.querySelector("sanitized-content");if(o)return o.textContent.trim();let n=a.querySelector(".data-pair-content")||a.nextElementSibling;if(n)return n.textContent.trim()}}catch(e){console.warn("Erro ao capturar Sales Program:",e)}return""}function er(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(a=>a.textContent.includes("Language")||a.textContent.includes("Idioma"));if(t){let a=t.closest(".data-pair")||t.parentElement,o=a.querySelector(".data-pair-content")||a.nextElementSibling;if(o)return o.textContent.trim()}}catch(e){console.warn("Erro ao capturar Idioma:",e)}return"N/A"}function tr(){try{let t=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(n=>n.textContent.includes("Speakeasy ID")||n.textContent.includes("SE ID"));if(t){let n=t.closest(".data-pair")||t.parentElement,i=n.querySelector(".data-pair-content")||n.nextElementSibling;if(i&&i.textContent.trim())return i.textContent.trim()}let a=/Speakeasy.*?(P\d{15,25})/i,o=Array.from(document.querySelectorAll("textarea, .preview, .message-body, .notes-content"));for(let n=o.length-1;n>=0;n--){let r=(o[n].value||o[n].innerText||"").match(a);if(r&&r[1])return r[1]}}catch(e){console.warn("Erro ao capturar SE ID:",e)}return"N/A"}function To(e){e&&(Bt=e)}function jt(){return String(Bt?.defaultLanguage||"").toUpperCase()==="ES"?"ES":"PT"}async function Je(){await La(),$t||await Pt();let e="Cliente",t="";try{let p=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(p&&p.nextElementSibling){let _=p.nextElementSibling.innerText.trim();_&&(e=_)}}catch(d){console.warn("Falha Nome:",d)}try{let p=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(p&&p.nextElementSibling){let _=p.nextElementSibling.innerText.trim();_&&(t=_)}}catch(d){console.warn("Falha URL:",d)}let a=await Wi(),o=Yi(),n=Xi(),i=Ki(),r=Ji(),l=await Zi(),c=Qi(),g=er(),u=tr(),v=Le();if(v&&!Bt){let d=v.split("@")[0];try{Bt=await kt(d)}catch(p){console.warn("Falha ao carregar perfil do usu\xE1rio:",p)}}return{advertiserName:e,websiteUrl:t,clientEmail:a,internalEmail:o,cid:n,amName:i,timezone:r,agentName:Gt(),agentEmail:Le(),caseId:l,userProfile:Bt,advName:e,site:t,website:t,email:a,salesProgram:c,language:g,seId:u}}var wt=null,Na=null,Ht=null,Ia=0,nt=.3;var Ze=localStorage.getItem("cw_sounds_muted")==="true";function dt(){if(!wt){let e=window.AudioContext||window.webkitAudioContext;e&&(wt=new e)}return wt&&wt.state==="suspended"&&wt.resume(),wt}function qo(e){if(Na)return Na;let t=e.sampleRate*2,a=e.createBuffer(1,t,e.sampleRate),o=a.getChannelData(0);for(let n=0;n<t;n++)o[n]=Math.random()*2-1;return Na=a,a}var S={setMuted:e=>{Ze=e,localStorage.setItem("cw_sounds_muted",e)},isMuted:()=>Ze,playClick:()=>{if(Ze)return;let e=dt();if(!e)return;let t=e.currentTime,a=e.createBufferSource();a.buffer=qo(e);let o=e.createBiquadFilter();o.type="highpass",o.frequency.value=4e3;let n=e.createGain();n.gain.setValueAtTime(nt*.8,t),n.gain.exponentialRampToValueAtTime(.001,t+.015),a.connect(o),o.connect(n),n.connect(e.destination),a.start(t),a.stop(t+.02)},playHover:()=>{if(Ze)return;let e=dt();if(!e)return;let t=e.currentTime,a=e.createOscillator();a.type="sine",a.frequency.setValueAtTime(400,t);let o=e.createGain();o.gain.setValueAtTime(0,t),o.gain.linearRampToValueAtTime(nt*.1,t+.005),o.gain.linearRampToValueAtTime(0,t+.02),a.connect(o),o.connect(e.destination),a.start(t),a.stop(t+.03)},playSuccess:()=>{if(Ze)return;let e=dt();if(!e)return;let t=e.currentTime;[1046.5,1567.9].forEach((o,n)=>{let i=e.createOscillator(),r=e.createGain();i.type="sine",i.frequency.value=o,r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(nt*.6,t+.05),r.gain.exponentialRampToValueAtTime(.001,t+.6),i.connect(r),r.connect(e.destination),i.start(t),i.stop(t+.7)})},playGenieOpen:()=>{if(Ze)return;let e=dt();if(!e)return;let t=e.currentTime,a=e.createBufferSource();a.buffer=qo(e);let o=e.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(100,t),o.frequency.exponentialRampToValueAtTime(800,t+.2);let n=e.createGain();n.gain.setValueAtTime(0,t),n.gain.linearRampToValueAtTime(nt*.5,t+.05),n.gain.linearRampToValueAtTime(0,t+.25),a.connect(o),o.connect(n),n.connect(e.destination),a.start(t),a.stop(t+.3)},playError:()=>{if(Ze)return;let e=dt();if(!e)return;let t=e.currentTime,a=e.createOscillator(),o=e.createGain();a.type="triangle",a.frequency.setValueAtTime(120,t),a.frequency.exponentialRampToValueAtTime(80,t+.1),o.gain.setValueAtTime(nt,t),o.gain.exponentialRampToValueAtTime(.001,t+.15),a.connect(o),o.connect(e.destination),a.start(t),a.stop(t+.2)},playStartup:()=>{if(Ze)return;let e=dt();if(!e)return;let t=e.currentTime,a=.12,o=e.createOscillator(),n=e.createGain(),i=e.createBiquadFilter();o.type="square",o.frequency.setValueAtTime(400,t),o.frequency.exponentialRampToValueAtTime(50,t+.1),i.type="lowpass",i.frequency.setValueAtTime(800,t),i.frequency.exponentialRampToValueAtTime(100,t+.1),n.gain.setValueAtTime(nt*4,t),n.gain.exponentialRampToValueAtTime(.001,t+.1),o.connect(i),i.connect(n),n.connect(e.destination),o.start(t),o.stop(t+.12);let r=e.createOscillator(),l=e.createGain();r.type="sine",r.frequency.setValueAtTime(150,t),r.frequency.exponentialRampToValueAtTime(50,t+.15),l.gain.setValueAtTime(nt*1.5,t),l.gain.exponentialRampToValueAtTime(.001,t+.15),r.connect(l),l.connect(e.destination),r.start(t),r.stop(t+.15),[55,55.4,110.5].forEach(g=>{let u=e.createOscillator(),v=e.createGain(),d=e.createBiquadFilter();u.type="sawtooth",u.frequency.value=g,d.type="lowpass",d.frequency.setValueAtTime(30,t),d.frequency.linearRampToValueAtTime(900,t+a+.2),d.frequency.exponentialRampToValueAtTime(40,t+3),v.gain.setValueAtTime(0,t),v.gain.linearRampToValueAtTime(nt*.6,t+a+.1),v.gain.exponentialRampToValueAtTime(.001,t+3.5),u.connect(d),d.connect(v),v.connect(e.destination),u.start(t),u.stop(t+3.6)})},playNotification:()=>{if(Ze)return;let e=dt();if(!e)return;let t=e.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(o=>{let n=e.createOscillator(),i=e.createGain();n.type="sine",n.frequency.setValueAtTime(o.freq,t),i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(nt*o.vol,t+.004),i.gain.exponentialRampToValueAtTime(.001,t+o.dur),n.connect(i),i.connect(e.destination),n.start(t),n.stop(t+o.dur+.1)})},playReady:()=>{if(Ze)return;let e=dt();if(!e)return;let t=e.currentTime;[{freq:587.33,at:0,dur:.2,vol:.26},{freq:880,at:.09,dur:.3,vol:.3},{freq:1760,at:.09,dur:.26,vol:.08}].forEach(o=>{let n=e.createOscillator(),i=e.createGain();n.type="sine",n.frequency.value=o.freq;let r=t+o.at;i.gain.setValueAtTime(0,r),i.gain.linearRampToValueAtTime(nt*o.vol,r+.02),i.gain.exponentialRampToValueAtTime(.001,r+o.dur),n.connect(i),i.connect(e.destination),n.start(r),n.stop(r+o.dur+.05)})},startThinking:()=>{if(Ze)return;let e=dt();if(!e||Ht)return;let t=[523.25,659.25,783.99];Ia=0;let a=()=>{if(Ze)return;let o=e.currentTime,n=e.createOscillator(),i=e.createGain();n.type="sine",n.frequency.setValueAtTime(t[Ia%t.length],o),i.gain.setValueAtTime(0,o),i.gain.linearRampToValueAtTime(nt*.15,o+.02),i.gain.exponentialRampToValueAtTime(.001,o+.22),n.connect(i),i.connect(e.destination),n.start(o),n.stop(o+.25),Ia++};a(),Ht=setInterval(a,370)},stopThinking:()=>{Ht&&(clearInterval(Ht),Ht=null)},playSwoosh:()=>{S.playGenieOpen()},playReset:()=>{S.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let e=0,t=50;document.addEventListener("mouseover",a=>{if(!wt)return;let o=a.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!o||o.contains(a.relatedTarget))return;let n=Date.now();n-e<t||(S.playHover(),e=n)},{passive:!0})}};var Lo="cw_ui_lang",No=["pt","es"];function ar(){try{let e=typeof localStorage<"u"?localStorage.getItem(Lo):null;return No.includes(e)?e:null}catch{return null}}var Fa=ar(),Ut=Fa||"pt",_a=new Set;function le(){return Ut}function or(e){return No.includes(e)}function Ma(e,{persist:t=!0}={}){if(!(!or(e)||e===Ut)){if(Ut=e,t){Fa=e;try{typeof localStorage<"u"&&localStorage.setItem(Lo,e)}catch{}}_a.forEach(a=>{try{a(Ut)}catch(o){console.warn("i18n listener falhou:",o)}})}}function Io(e){if(Fa)return;let t=String(e?.defaultLanguage||"").toUpperCase(),o={"PT-BR":"pt",PT:"pt",ES:"es"}[t];o&&Ma(o,{persist:!1})}function Se(e){return _a.add(e),()=>_a.delete(e)}function _o(e){return function(a){return e[Ut]?.[a]??e.pt?.[a]??a}}var Me={MODULE_RESTING:2147483640,MODULE_FOCUSED:2147483641,PAGE_SPOTLIGHT_OVERLAY:2147483642,PAGE_SPOTLIGHT_TARGET:2147483643,TOAST:2147483644,FOCUS_BACKDROP:2147483646,TOP:2147483647};var Oa=Me.MODULE_RESTING;function Mo(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}function X(e,t={}){let a=document.createElement("div"),o=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(a.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:String(Me.TOAST),opacity:"0",transition:"all 0.4s var(--cw-ease-spring)",pointerEvents:"none"}),a.textContent=e,document.body.appendChild(a),t.error?S.playError():S.playSuccess(),requestAnimationFrame(()=>{a.style.opacity="1",a.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{a.style.opacity="0",a.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>a.remove(),400)},t.duration||4e3)}function Oo(e,t=null){let a=0,o=0,n=0,i=0,r=t||e;r.style.cursor="grab",r.onmousedown=l;function l(u){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(u.target.tagName)||u.target.closest(".no-drag"))return;u=u||window.event,r.style.cursor="grabbing",e.style.transition="none";let v=e.getBoundingClientRect();e.style.transform="none",e.style.left=v.left+"px",e.style.top=v.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",Oa=Math.min(Oa+1,Me.MODULE_FOCUSED),e.style.zIndex=Oa,n=u.clientX,i=u.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=g,document.onmousemove=c}function c(u){u=u||window.event,u.preventDefault(),a=n-u.clientX,o=i-u.clientY,n=u.clientX,i=u.clientY;let v=e.offsetTop-o,d=e.offsetLeft-a,p=16,_=window.innerWidth,w=window.innerHeight,E=e.offsetWidth,M=e.offsetHeight;d=yt(d,p,_-E-p),v=yt(v,p,w-M-p),e.style.top=v+"px",e.style.left=d+"px"}function g(){document.onmouseup=null,document.onmousemove=null,r.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s var(--cw-ease-decelerate), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var Ge={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:String(Me.MODULE_RESTING),overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08),
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var Da={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Do={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var zo={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var Fo=!1;function nr(){if(Fo||document.getElementById("techsol-google-styles"))return;let e=document.createElement("style");e.id="techsol-google-styles",e.innerHTML=`
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
    `,document.head.appendChild(e),Fo=!0}function Ro(e){nr(),e.classList.remove("google-animate-click"),e.offsetWidth,e.classList.add("google-animate-click"),setTimeout(()=>{e.classList.remove("google-animate-click")},600)}async function ir(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let a=e.querySelector(".cursor");await ue(200);for(let o=0;o<t.length;o++){let n=t.charAt(o),i=document.createElement("span");i.textContent=n,a&&a.parentNode===e?a.before(i):e.appendChild(i);let r=Math.floor(Math.random()*60)+30;o===0&&(r=150),o>t.length-3&&(r=30),await ue(r)}await ue(600),a&&(a.style.display="none")}async function za(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
            /* Google Sans j\xE1 vem via <link> logo acima em initGlobalStylesAndFont(),
               chamada antes da splash - esse @import era uma 3a requisi\xE7\xE3o redundante
               pra fonte (a 1a \xE9 o <link>, a 2a era o do command-center.js). */
            .splash-container { font-family: 'Google Sans', sans-serif; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #202124; z-index: ${Me.TOP}; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1); }
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
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await ue(200);let t=await Pt(),a=ko(t),o=e.querySelector("#w-icon"),n=e.querySelector("#p1"),i=e.querySelector("#p2"),r=e.querySelector("#p3"),l=e.querySelector("#p-sextou");o&&(o.innerHTML=a.icon),n&&(n.textContent=a.prefix),r&&(r.textContent=a.suffix),await ue(300);let c=o?o.querySelector("svg"):null;if(c&&(c.style.opacity="1",c.style.transform="scale(1)"),await ue(400),n&&(n.style.opacity="1"),S.playStartup(),i&&await ir(i,a.name),r&&(r.style.opacity="1",r.style.transform="translateY(0)"),a.isFriday&&l){await ue(400),l.style.display="block",l.offsetWidth;let g=l.querySelector(".sextou-badge");g&&(g.style.opacity="1",g.style.transform="scale(1)")}await ue(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await ue(900),e.parentNode&&e.parentNode.removeChild(e)}}function $o(e){if(!e)return;let t=e.getBoundingClientRect(),a=window.innerWidth,o=window.innerHeight,n=24,i=a-t.width-n,r=o-t.height-n,l=parseFloat(e.style.left)||t.left,c=parseFloat(e.style.top)||t.top,g=yt(l,n,i),u=yt(c,n,r);if(g!==l||u!==c){let v=e.style.transition;e.style.transition="left 0.3s var(--cw-ease-elastic), top 0.3s var(--cw-ease-elastic)",e.style.left=`${g}px`,e.style.top=`${u}px`,setTimeout(()=>{e.style.transition=v},300)}}var it={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function rt(e,t){t.onmousedown=a;function a(o){o.stopPropagation(),o.preventDefault();let n=e.style.transition;e.style.transition="none";let i=o.clientX,r=o.clientY,l=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),c=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),g=i,u=r,v=!1;function d(w){g=w.clientX,u=w.clientY,v||(window.requestAnimationFrame(()=>{p(),v=!1}),v=!0)}function p(){let w=l+(g-i),E=c+(u-r);w>360&&(e.style.width=w+"px"),E>300&&(e.style.height=E+"px")}function _(){document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",_),setTimeout(()=>{e.style.transition=n},50)}document.addEventListener("mousemove",d),document.addEventListener("mouseup",_)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}function ra(e){if(!e||e==="N/A"||e==="undefined")return"Data indispon\xEDvel";if(String(e).includes(" | "))return e.split(" | ").map(t=>ra(t.trim())).filter(t=>t!=="Data indispon\xEDvel").join(" | ");try{let t=new Date(e);if(isNaN(t.getTime()))return"Data indispon\xEDvel";let a=t.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}),o=t.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});return`${a} \xE0s ${o}`}catch{return"Data indispon\xEDvel"}}function Bo(e){if(!e)return"";let t={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return e.replace(/:([a-zA-Z0-9-_+]+):/g,a=>t[a]?t[a]:"")}function Po(){let e=document.createElement("div");return e.className="cw-dialog-overlay",Object.assign(e.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:Me.TOP,opacity:0,transition:"opacity 0.3s ease"}),e}function Go(){let e=document.createElement("div");return Object.assign(e.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s var(--cw-ease-spring)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),e}function _e(e,t={}){return new Promise(a=>{let o=Po(),n=Go(),i=t.danger?"#FF3B30":"#007AFF",r=le()==="es"?"Eliminar":"Excluir",l=t.confirmText||(t.danger?r:"Confirmar");n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${e}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${i}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${l}</button>
            </div>
        `,o.appendChild(n),document.body.appendChild(o),requestAnimationFrame(()=>{o.style.opacity=1,n.style.transform="scale(1)"});let c=v=>{o.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{o.remove(),a(v)},300)},g=n.querySelector("#cw-conf-cancel"),u=n.querySelector("#cw-conf-ok");[g,u].forEach(v=>v.onmouseenter=()=>S.playHover()),g.onclick=()=>{S.playClick(),c(!1)},u.onclick=()=>{S.playClick(),c(!0)}})}function sa(e,t=""){return new Promise(a=>{let o=Po(),n=Go();n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${e}</div>
            <input type="text" id="cw-prompt-input" value="${t}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,o.appendChild(n),document.body.appendChild(o);let i=n.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{o.style.opacity=1,n.style.transform="scale(1)",setTimeout(()=>i.focus(),100)});let r=g=>{o.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{o.remove(),a(g)},300)},l=n.querySelector("#cw-prompt-cancel"),c=n.querySelector("#cw-prompt-ok");[l,c].forEach(g=>g.onmouseenter=()=>S.playHover()),l.onclick=()=>{S.playClick(),r(null)},c.onclick=()=>{S.playClick(),r(i.value)},i.onkeydown=g=>{g.key==="Enter"&&c.click(),g.key==="Escape"&&l.click()}})}var Ra=class{constructor(){this.visible=!1,this.reset()}reset(){this.currentCaseType="bau",this.currentLang="pt",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.activeFields=[];let t=typeof localStorage<"u"?localStorage.getItem("cw-notes-favorites"):null;this.favorites=new Set(JSON.parse(t||"[]")),this.screenshotMode="implementation",this.notify()}setCaseType(t){this.currentCaseType!==t&&(this.currentCaseType=t,this.isDirty=!0,this.notify())}setLanguage(t){this.currentLang!==t&&(this.currentLang=t,this.notify())}setPortugalCase(t){this.isPortugalCase!==t&&(this.isPortugalCase=t,this.isDirty=!0,this.notify())}setConsent(t){this.consent!==t&&(this.consent=t,this.isDirty=!0,this.notify())}setTagSupportUsed(t){this.tagSupportUsed=t,t||this.forcedScreenshots.clear(),this.isDirty=!0,this.notify()}setActiveFields(t){this.activeFields=[...t],this.isDirty=!0,this.notify()}removeField(t){this.activeFields=this.activeFields.filter(a=>a!==t),this.isDirty=!0,this.notify()}addFieldAt(t,a){this.activeFields.includes(t)||(this.activeFields.splice(a,0,t),this.isDirty=!0,this.notify())}setForcedScreenshots(t){this.forcedScreenshots=new Set(t),this.isDirty=!0,this.notify()}toggleForcedScreenshot(t,a){a?this.forcedScreenshots.add(t):this.forcedScreenshots.delete(t),this.isDirty=!0,this.notify()}setStatus(t){this.currentStatus!==t&&(this.currentStatus=t,this.isDirty=!0,this.notify())}setSubStatus(t){this.currentSubStatus!==t&&(this.currentSubStatus=t,this.isDirty=!0,this.notify())}setScreenshotMode(t){this.screenshotMode=t,this.notify()}setActiveTasks(t){this.activeTasks=t,this.isDirty=!0,this.notify()}toggleFavorite(t){this.favorites.has(t)?this.favorites.delete(t):this.favorites.add(t),typeof localStorage<"u"&&localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(t,a){this.formData[t]!==a&&(this.formData[t]=a,this.isDirty=!0,this.notify())}listeners=[];subscribe(t){return this.listeners.push(t),()=>this.listeners=this.listeners.filter(a=>a!==t)}notify(){this.listeners.forEach(t=>t(this))}},V=new Ra;var jo={pt:{helpTooltip:"Sobre & Feedback",closeTooltip:"Fechar",version:"Vers\xE3o",reportLink:"Reportar Bug ou Sugest\xE3o",backBtn:"Voltar",createdBy:"criado por"},es:{helpTooltip:"Acerca de y Comentarios",closeTooltip:"Cerrar",version:"Versi\xF3n",reportLink:"Reportar error o sugerencia",backBtn:"Volver",createdBy:"creado por"}};function Qe(e){let t=le();return jo[t]?.[e]??jo.pt[e]??e}var rr={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Ho={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Oe(e,t,a,o,n,i){let r=document.createElement("div");Object.assign(r.style,rr),Oo(e,r);let l=document.createElement("div");if(Object.assign(l.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",backgroundSize:"300% auto",zIndex:"10",opacity:"0.8"}),!document.getElementById("cw-header-anim")){let A=document.createElement("style");A.id="cw-header-anim",A.innerHTML=`
            @keyframes cw-header-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `,document.head.appendChild(A)}window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||(l.style.animation="cw-header-flow 6s linear infinite"),r.appendChild(l),n&&(n.googleLine=l);let g=document.createElement("div");Object.assign(g.style,{display:"flex",alignItems:"center",gap:"12px"});let u=document.createElement("div");u.innerHTML='<svg viewBox="0 0 48 48" width="20" height="20"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/></svg>',Object.assign(u.style,{width:"20px",height:"20px",pointerEvents:"none",flexShrink:"0",display:"flex"});let v=document.createElement("span");v.textContent=t,g.appendChild(u),g.appendChild(v);let d=document.createElement("div");Object.assign(d.style,{display:"flex",alignItems:"center",gap:"4px"});let p='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',_='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',w=document.createElement("div");w.innerHTML=p,Object.assign(w.style,Ho),w.title=Qe("helpTooltip"),w.classList.add("no-drag"),w.onmouseenter=()=>{w.style.background="rgba(255,255,255,0.1)",w.style.color="#FFF"},w.onmouseleave=()=>{w.style.color!=="rgb(138, 180, 248)"&&(w.style.background="transparent",w.style.color="#9AA0A6")};let E=document.createElement("div");E.innerHTML=_,Object.assign(E.style,Ho),E.title=Qe("closeTooltip"),E.classList.add("no-drag","cw-header-close"),E.onmouseenter=()=>{E.style.background="rgba(242, 139, 130, 0.2)",E.style.color="#F28B82"},E.onmouseleave=()=>{E.style.background="transparent",E.style.color="#9AA0A6"},E.onmousedown=A=>A.stopPropagation(),w.onmousedown=A=>A.stopPropagation(),E.onclick=i;let M=sr(e,t,a,o);return w.onclick=A=>{A.stopPropagation(),M.style.opacity==="1"?(M.style.opacity="0",M.style.pointerEvents="none",w.style.color="#9AA0A6",w.style.background="transparent"):(M.style.opacity="1",M.style.pointerEvents="auto",w.style.color="#8AB4F8",w.style.background="rgba(138, 180, 248, 0.1)")},d.appendChild(w),d.appendChild(E),r.appendChild(g),r.appendChild(d),Se(()=>{w.title=Qe("helpTooltip"),E.title=Qe("closeTooltip")}),r}function sr(e,t,a,o){let n=document.createElement("div");return Object.assign(n.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),n.innerHTML=`
        <div class="cw-help-title" style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${t}</div>
        <div class="cw-help-version" style="color: #5f6368; font-size: 14px; margin-bottom: 24px;">${Qe("version")} ${a}</div>

        <div class="cw-help-description" style="color: #3c4043; font-size: 14px; max-width: 90%; line-height: 1.6; margin-bottom: 24px;">
            ${o}
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
                <span>\u{1F4AC}</span> <span class="cw-help-report-link">${Qe("reportLink")}</span>
            </a>
        </div>

        <div class="cw-help-created-by" style="font-size: 12px; color: #9aa0a6;">
            ${Qe("createdBy")} <span style="color: #1a73e8; font-weight: 500;">@lucaste</span>
        </div>

        <button id="close-help-internal" style="margin-top: 24px; padding: 8px 24px; border: 1px solid #dadce0; background: white; border-radius: 18px; color: #5f6368; cursor: pointer; font-weight: 500; transition: background 0.2s;">
            ${Qe("backBtn")}
        </button>
    `,setTimeout(()=>{let i=n.querySelector("#cw-feedback-link");i&&(i.onmouseenter=()=>{i.style.backgroundColor="#E8F0FE",i.style.transform="scale(1.02)"},i.onmouseleave=()=>{i.style.backgroundColor="#F8F9FA",i.style.transform="scale(1)"});let r=n.querySelector("#close-help-internal");r&&(r.onmouseover=()=>r.style.backgroundColor="#f8f9fa",r.onmouseout=()=>r.style.backgroundColor="white",r.onclick=()=>{n.style.opacity="0",n.style.pointerEvents="none"})},0),Se(()=>{let i=n.querySelector(".cw-help-version");i&&(i.textContent=`${Qe("version")} ${a}`);let r=n.querySelector(".cw-help-report-link");r&&(r.textContent=Qe("reportLink"));let l=n.querySelector(".cw-help-created-by");l&&(l.firstChild.textContent=`${Qe("createdBy")} `);let c=n.querySelector("#close-help-internal");c&&(c.textContent=Qe("backBtn"))}),e.appendChild(n),n}var j={blue:"#4285F4",red:"#EA4335",yellow:"#FBBC05",green:"#34A853",primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#34A853",warning:"#FBBC05",error:"#EA4335"},Ne={small:"8px",medium:"12px",large:"20px",pill:"100px"},pt={subtle:"0 1px 3px rgba(0,0,0,0.08)",card:"0 4px 12px rgba(0,0,0,0.05)",elevated:"0 12px 24px rgba(0,0,0,0.08)",apple:"0 20px 40px rgba(0,0,0,0.12)"},he="cubic-bezier(0.34, 1.56, 0.64, 1)",lr={width:"100%",padding:"14px 16px",borderRadius:Ne.medium,border:`1.5px solid ${j.border}`,backgroundColor:j.bgInput,fontSize:"14px",color:j.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`all 0.3s ${he}`,outline:"none"},$s={...lr,minHeight:"120px",resize:"vertical",lineHeight:"1.6"},Bs={fontSize:"12px",fontWeight:"700",color:j.textSub,textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px 0"},Ps={display:"block",fontSize:"14px",fontWeight:"600",color:j.text,marginBottom:"10px",marginTop:"20px"},Gs={fontSize:"12px",color:j.warning,marginTop:"8px",display:"flex",alignItems:"center",gap:"8px",fontWeight:"500"},$a={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:j.primary},js={display:"flex",alignItems:"center",marginBottom:"12px",fontSize:"14px",fontWeight:"500",color:j.text,cursor:"pointer",padding:"16px 20px",backgroundColor:j.surface,border:`1px solid ${j.border}`,borderRadius:Ne.large,transition:`all 0.4s ${he}`,userSelect:"none",boxShadow:pt.subtle},Hs={padding:"14px 28px",color:"#fff",backgroundColor:j.primary,border:"none",borderRadius:Ne.pill,fontSize:"15px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px 0 rgba(26,115,232,0.39)",transition:`all 0.25s ${he}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",outline:"none"},Us={width:"100%",padding:"12px",background:"#FFFFFF",border:`1.5px dashed ${j.primary}`,color:j.primary,borderRadius:Ne.medium,cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"16px",transition:`all 0.25s ${he}`},Vs={background:"transparent",border:`1px solid ${j.border}`,borderRadius:Ne.pill,color:j.textSub,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",margin:"20px auto",transition:`all 0.25s ${he}`};var Vt={pt:"Gera notas padronizadas com excel\xEAncia visual.",es:"Genera notas estandarizadas con excelencia visual."};function Uo(e,t){let a=document.createElement("div");a.id="notes-assistant-popup",a.classList.add("cw-module-window"),Object.assign(a.style,Ge,{right:"100px",width:"520px",height:"740px",display:"flex",flexDirection:"column",transition:`width 0.4s ${he}, height 0.4s ${he}, transform 0.4s ${he}, opacity 0.3s ease`,borderRadius:Ne.large,boxShadow:pt.apple,border:"1px solid rgba(255, 255, 255, 0.7)"});let o={popup:a,googleLine:null},n=Oe(a,"Case Notes",e,Vt[le()]||Vt.pt,o,t);a.appendChild(n);let i=document.createElement("div");i.className="cw-popup-content",Object.assign(i.style,{padding:"24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"24px",background:j.surface}),a.appendChild(i);let r=document.createElement("div");r.textContent="created by lucaste@",Object.assign(r.style,zo,{padding:"16px 24px",borderTop:`1px solid ${j.bgInput}`,color:j.textSub,fontSize:"11px",marginTop:"auto",fontWeight:"500",letterSpacing:"0.5px"}),a.appendChild(r);let l=document.createElement("div");return Object.assign(l.style,it),l.className="no-drag",a.appendChild(l),rt(a,l),cr(),{popup:a,content:i,header:n,animRefs:o,credit:r}}function cr(){if(document.getElementById("cw-notes-refactor-styles"))return;let e=document.createElement("style");e.id="cw-notes-refactor-styles",e.innerHTML=`
        .cw-popup-content::-webkit-scrollbar { width: 8px; }
        .cw-popup-content::-webkit-scrollbar-track { background: transparent; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; border: 2px solid #fff; }
        .cw-popup-content::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .cw-input, .cw-textarea, .cw-select {
            width: 100% !important;
            padding: 12px 16px !important;
            border-radius: ${Ne.medium} !important;
            border: 1.5px solid ${j.border} !important;
            font-size: 14px !important;
            font-family: 'Google Sans', Roboto, sans-serif !important;
            transition: border-color 0.2s ${he}, background-color 0.2s ${he}, box-shadow 0.2s ${he} !important;
            box-sizing: border-box !important;
            background: ${j.bgInput} !important;
            color: ${j.text} !important;
            outline: none !important;
            box-shadow: ${pt.subtle} !important;
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
            transition: border-color 0.2s ${he}, background-color 0.2s ${he}, box-shadow 0.2s ${he} !important;
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
            border-radius: ${Ne.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ${he}, transform 0.2s ${he}, box-shadow 0.2s ${he};
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
            border-radius: ${Ne.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ${he}, border-color 0.2s ${he}, color 0.2s ${he};
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
    `,document.head.appendChild(e)}var Ue={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"Selecione",substatus:"Substatus:",select_substatus:"Selecione o Status",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",preencher_email_automaticamente:"Preencher email automaticamente?",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",trechos:"Trechos",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",link_aqui:"Link aqui",tag_support_output_label:"Utilizou Tag Support?",motivo_output_label:"Motivo:",auto_busca:"\u2728 Auto Busca",utilize_marcadores:"Utilize marcadores para detalhar...",descreva_consideracoes:"Descreva as considera\xE7\xF5es...",remover:"Remover",remover_campo_confirm:'Remover o campo "{campo}"?',meus_rascunhos:"Meus Rascunhos",confirmar_guardar_rascunho:"Deseja guardar o rascunho atual e limpar os campos?",rascunho_salvo_sucesso:"Rascunho salvo com sucesso!",erro_ler_dados:"Erro: N\xE3o foi poss\xEDvel ler os dados.",erro_ao_salvar:"Erro ao salvar.",cliente_sem_nome:"Cliente Sem Nome",sem_status:"Sem Status",retomar_caso:"Retomar Caso",descartar:"Descartar",retomar_rascunho_confirm:"Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.",rascunho_carregado:"Rascunho carregado.",excluir_rascunho_confirm:"Excluir este rascunho?",acoes_plural:"A\xE7\xF5es",acao_singular:"A\xE7\xE3o",definidas_plural:"definidas",definida_singular:"definida",renomear_tooltip:"Clique para renomear esta task",renomear_hint:"\u270E Renomear",substituir_rascunho_confirm:"Isso vai substituir o rascunho atual da nota. Deseja continuar?",salvar_como_atalho:"Salvar como atalho do Ctrl+K",atalho_nome_pergunta:"Como este atalho vai se chamar no Ctrl+K?",atalho_salvo:"Atalho salvo! J\xE1 aparece no Ctrl+K.",atalho_salvo_local:"Atalho salvo neste navegador (sem conex\xE3o com a nuvem).",atalho_limite:"Voc\xEA j\xE1 tem {max} atalhos. Apague um em Configura\xE7\xF5es antes de criar outro.",atalho_cenario_sumiu:"Este atalho apontava para um cen\xE1rio que n\xE3o existe mais. Revise-o em Configura\xE7\xF5es.",restaurar_rascunho_confirm:"Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?",cole_link_placeholder:"Cole o link aqui...",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F Anunciante consentiu com a grava\xE7\xE3o?",sim:"Sim",nao:"N\xE3o",pronto_comecar:"Pronto para come\xE7ar?",selecione_status_ajuda:"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Task(s) solicitada(s):",passos_executados:"\u{1F463} O que foi feito:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 D\xFAvidas do anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implementadas na call:",proximos_passos:"\u{1F680} Pr\xF3ximos passos (Acompanhamento):",consideracoes:"\u{1F4A1} Considera\xE7\xF5es adicionais:",contexto_call:"\u{1F4AC} Contexto/O que foi feito:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Minha A\xE7\xE3o:",dia:"\u{1F4C5} Dia do Follow-up (se aplic\xE1vel):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Data do reagendamento:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evid\xEAncias de Contato",ligacao_1:"Liga\xE7\xE3o 1",ligacao_2:"Liga\xE7\xE3o 2",mensagem_am:"Mensagem para AM",tentativa_ligacao:"\u{1F4DE} Tentativa de liga\xE7\xE3o:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"Seleccione",substatus:"Subestado:",select_substatus:"Seleccione el Estado",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",preencher_email_automaticamente:"\xBFRellenar correo autom\xE1ticamente?",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",trechos:"Fragmentos",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",link_aqui:"Enlace aqu\xED",tag_support_output_label:"\xBFUtiliz\xF3 Tag Support?",motivo_output_label:"Motivo:",auto_busca:"\u2728 B\xFAsqueda Autom\xE1tica",utilize_marcadores:"Utiliza vi\xF1etas para detallar...",descreva_consideracoes:"Describe las consideraciones...",remover:"Eliminar",remover_campo_confirm:'\xBFEliminar el campo "{campo}"?',meus_rascunhos:"Mis Borradores",confirmar_guardar_rascunho:"\xBFDesea guardar el borrador actual y limpiar los campos?",rascunho_salvo_sucesso:"\xA1Borrador guardado con \xE9xito!",erro_ler_dados:"Error: No fue posible leer los datos.",erro_ao_salvar:"Error al guardar.",cliente_sem_nome:"Cliente Sin Nombre",sem_status:"Sin Estado",retomar_caso:"Retomar Caso",descartar:"Descartar",retomar_rascunho_confirm:"\xBFRetomar este borrador? El formulario actual ser\xE1 reemplazado.",rascunho_carregado:"Borrador cargado.",excluir_rascunho_confirm:"\xBFEliminar este borrador?",acoes_plural:"Acciones",acao_singular:"Acci\xF3n",definidas_plural:"definidas",definida_singular:"definida",renomear_tooltip:"Haz clic para renombrar esta tarea",renomear_hint:"\u270E Renombrar",substituir_rascunho_confirm:"Esto reemplazar\xE1 el borrador actual de la nota. \xBFDeseas continuar?",salvar_como_atalho:"Guardar como atajo de Ctrl+K",atalho_nome_pergunta:"\xBFC\xF3mo se va a llamar este atajo en el Ctrl+K?",atalho_salvo:"\xA1Atajo guardado! Ya aparece en el Ctrl+K.",atalho_salvo_local:"Atajo guardado en este navegador (sin conexi\xF3n con la nube).",atalho_limite:"Ya tienes {max} atajos. Elimina uno en Configuraci\xF3n antes de crear otro.",atalho_cenario_sumiu:"Este atajo apuntaba a un escenario que ya no existe. Rev\xEDsalo en Configuraci\xF3n.",restaurar_rascunho_confirm:"Detectamos un borrador sin guardar de tu \xFAltima sesi\xF3n. \xBFDeseas restaurarlo?",cole_link_placeholder:"Pega el enlace aqu\xED...",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F \xBFEl anunciante consinti\xF3 la grabaci\xF3n?",sim:"S\xED",nao:"No",pronto_comecar:"\xBFListo para empezar?",selecione_status_ajuda:"Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Tarea(s) solicitada(s):",passos_executados:"\u{1F463} Qu\xE9 se hizo:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 Dudas del anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resoluciones/Explicaciones:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tareas implementadas en la call:",proximos_passos:"\u{1F680} Pr\xF3ximos pasos:",consideracoes:"\u{1F4A1} Consideraciones adicionales:",contexto_call:"\u{1F4AC} Contexto/Qu\xE9 se hizo:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Mi Acci\xF3n:",dia:"\u{1F4C5} D\xEDa de Follow-up (si aplica):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Fecha de reprogramaci\xF3n:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evidencias de Contacto",ligacao_1:"Llamada 1",ligacao_2:"Llamada 2",mensagem_am:"Mensaje para AM",tentativa_ligacao:"\u{1F4DE} Intento de llamada:"}},et={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},dr={"GTM Instalado":"GTM Instalado","Vinculador de convers\xF5es":"Vinculador de conversiones","Tag criada":"Etiqueta creada","Teste GTM":"Prueba GTM","Teste Ads":"Prueba Ads","Vers\xE3o Publicada":"Versi\xF3n Publicada","Status Ads":"Estado Ads","Termos aceitos no Ads":"T\xE9rminos aceptados en Ads","Tag implementada":"Etiqueta implementada","Painel do Ads (ap\xF3s 7 dias)":"Panel de Ads (despu\xE9s de 7 d\xEDas)","Tag do evento GA4 implementado no GTM":"Etiqueta del evento GA4 implementada en GTM","Teste GTM (tagassistant.google.com)":"Prueba GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)":"Prueba GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM":"Versi\xF3n publicada en GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4":"(Si hay par\xE1metros) Dimensiones personalizadas creadas en GA4","Evento marcado como principal no GA4":"Evento marcado como principal en GA4","GA4 e Google Ads vinculados corretamente":"GA4 y Google Ads vinculados correctamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)":"Evento principal de GA4 importado en Google Ads (como secundario)","M\xE9tricas app & web ativadas no Google Ads":"M\xE9tricas app y web activadas en Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)":"(Opcional) Prueba en el Informe de Tiempo Real (GA4)","Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)":"Validaci\xF3n: Cuenta GA4 (solo flujo web, no es sector salud)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)':'"Recopilaci\xF3n de datos proporcionados por el usuario" habilitada en GA4 (Administrador > Recopilaci\xF3n de Datos)',"Confirma\xE7\xE3o de coleta de dados (UI)":"Confirmaci\xF3n de recopilaci\xF3n de datos (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM":"Etiqueta del evento GA4 optimizado (UPD) implementada en GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)":"Prueba GTM (tagassistant - par\xE1metro 'em' sin error)","Teste GA4 (DebugView - tagassistant)":"Prueba GA4 (DebugView - tagassistant)","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio":"(Capacitaci\xF3n) Evento principal importado en Google Ads como secundario","Tag implementado no GTM":"Etiqueta implementada en GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo":"Prueba del disparo de la etiqueta de configuraci\xF3n en tag assistant en m\xE1s de una p\xE1gina, mostrando ID y etiqueta","Teste usando o #google-wcc-debug":"Prueba usando #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]":"Cambio del estado de la conversi\xF3n en Google Ads [Esperar algunos minutos]","1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas":"1. OGT (gTag/GTM con etiqueta de vinculador de conversi\xF3n) a\xF1adido en todas las p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)":"2. El etiquetado autom\xE1tico (auto tagging) est\xE1 habilitado en Google Ads (Administrador > Config. de la Cuenta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".':'3. [Si es GTM] El vinculador de conversi\xF3n est\xE1 presente y el activador definido para dispararse en "Todas las P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?":"4. \xBFEl gclid se mantiene sin redirecciones y se almacena en la cookie _gcl_aw en la landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?":"5. \xBFEl gclid fue pasado a la p\xE1gina de conversi\xF3n?"};function Vo(e,t,a){let o=e?.screenshots?.[t]||[];return a!=="es"?o:o.map(n=>dr[n]||n)}function Wo(e,t,a){return a==="es"&&e?.fieldPrefixes_es?.[t]?e.fieldPrefixes_es[t]:e?.fieldPrefixes?.[t]||""}function la(e,t,a){if(t!=="es")return e;let o=Xt[a];return o?{...e,...o}:e}function ca(e,t){return Object.entries(st).filter(([,a])=>{let o=!a.type||a.type==="all"||a.type===t,n=Array.isArray(a.substatus)&&a.substatus.includes(e);return o&&n})}function Wt(e,t){let a=String(e||"");if(a.startsWith("quickfill-"))return a.slice(10);if(t){let n=`cw-${String(t).toLowerCase()}-`;if(a.startsWith(n))return a.slice(n.length)}let o=a.match(/^cw-[a-z0-9_]+-(.+)$/);return o?o[1]:a}function da(e,t){return Wt(e,t).replace(/-/g," ")}var pr=["GTM_GA4_VERIFICADO","MULTIPLE_CIDS"],ur=["REASON_COMMENTS"];function Yt(e){let t=[...ur];return e?.requiresTasks&&t.push("GTM_GA4_VERIFICADO"),t}function Yo(e){let t=[...pr,...e?.extraOptionalFields||[]],a=Yt(e);return t.filter(o=>!a.includes(o))}var Ie={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Caso Reagendado."},fieldPrefixes_es:{REASON_COMMENTS:"Caso Reprogramado."}},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Reagendamento aceit\xE1vel."},fieldPrefixes_es:{REASON_COMMENTS:"Reprogramaci\xF3n aceptable."}},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","DIA","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Aguardando Valida\xE7\xF5es no Google Ads."},fieldPrefixes_es:{REASON_COMMENTS:"Esperando Validaciones en Google Ads."}},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES"]},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","TENTATIVA_LIGACAO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PASSOS_EXECUTADOS","RESULTADO","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["PROXIMOS_PASSOS"],fieldPrefixes:{REASON_COMMENTS:"Task implementada com sucesso."},fieldPrefixes_es:{REASON_COMMENTS:"Tarea implementada con \xE9xito."}},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","DUVIDAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["PROXIMOS_PASSOS","CONSIDERACOES"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para tirar d\xFAvidas do anunciante."},fieldPrefixes_es:{REASON_COMMENTS:"Consultor\xEDa utilizada para resolver dudas del anunciante."}},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PROBLEMAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para testar e solucinar problemas da convers\xE3o."},fieldPrefixes_es:{REASON_COMMENTS:"Consultor\xEDa utilizada para probar y solucionar problemas de la conversi\xF3n."}},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,templateFields:["SPEAKEASY_ID","label_substatus","REASON_COMMENTS","COMENTARIOS"],customFooter:"Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},Lt={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},Nt=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],pa=["CONSIDERACOES","COMENTARIOS"],st={"quickfill-gtm-install":{type:"all",substatus:["SO_Implementation_Only"],"field-REASON_COMMENTS":"Instala\xE7\xE3o do GTM finalizada.","field-TASKS_SOLICITADAS":"\u2022 Instala\xE7\xE3o do GTM","field-PASSOS_EXECUTADOS":`\u2022 Criamos a conta dentro do GTM
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

Irei abrir caso em BAU para o dia solicitado e pedir a inativa\xE7\xE3o do mesmo.`}},Xt={"quickfill-gtm-install":{"field-REASON_COMMENTS":"Instalaci\xF3n de GTM finalizada.","field-TASKS_SOLICITADAS":"\u2022 Instalaci\xF3n de GTM","field-PASSOS_EXECUTADOS":`\u2022 Creamos la cuenta dentro de GTM
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

Abrir\xE9 un caso en BAU para el d\xEDa solicitado y pedir\xE9 la inactivaci\xF3n del mismo.`}};var Xo={pt:{searching:"Buscando ID...",readingMessage:"Lendo mensagem...",idFound:e=>`ID Localizado: ${e}`,noIdFound:"Nenhum ID encontrado.",notFound:"N\xE3o encontrado",processingError:"Erro ao processar."},es:{searching:"Buscando ID...",readingMessage:"Leyendo mensaje...",idFound:e=>`ID Encontrado: ${e}`,noIdFound:"Ning\xFAn ID encontrado.",notFound:"No encontrado",processingError:"Error al procesar."}};function It(e){let t=le();return Xo[t]?.[e]??Xo.pt[e]}var Ko="cw-automation-styles";if(!document.getElementById(Ko)){let e=document.createElement("style");e.id=Ko,e.innerHTML=`
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
            z-index: ${Me.PAGE_SPOTLIGHT_TARGET} !important; 
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
            z-index: ${Me.PAGE_SPOTLIGHT_OVERLAY};   /* Fica atr\xE1s do Input */
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: all;                  /* Bloqueia cliques na p\xE1gina */
        }
    `,document.head.appendChild(e)}function Jo(e){let t=document.getElementById("cw-loading-overlay");e?t?t.style.opacity="1":(t=document.createElement("div"),t.id="cw-loading-overlay",document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1")):t&&(t.style.opacity="0",setTimeout(()=>t.remove(),300))}async function ua(e){await La();let t=document.getElementById(e),a="";Jo(!0),t&&(a=t.placeholder,t.placeholder=It("searching"),t.value="",t.classList.add("cw-scanning-active"));try{let o=document.querySelector('material-button[debug-id="dock-item-case-log"]');o&&!o.classList.contains("selected")&&(qt(o),await ue(1200));let n=document.querySelector("search-filter dropdown-button .button");if(n&&!(n.innerText||"").includes("All")){qt(n),await ue(600);let d=document.querySelector('material-checkbox[debug-id="check-all-box"]');d&&d.getAttribute("aria-checked")!=="true"&&(qt(d),await ue(300));let p=document.querySelector('material-button[debug-id="apply-filter"]');p&&(qt(p),await ue(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await ue(500));let r=Array.from(document.querySelectorAll(".message-header"));for(let v=r.length-1;v>=0;v--){let d=r[v],p=d.querySelector("i.material-icons-extended"),_=p&&p.innerText.trim()==="phone_in_talk",w=d.innerText||"",E=w.includes("Agent joined")||w.includes("outbound-call")||w.includes("Speakeasy");if(_||E){d.getAttribute("aria-expanded")==="true"||(t&&(t.placeholder=It("readingMessage")),qt(d),await ue(1e3));break}}let c=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),g=/Speakeasy.*?(P\d{15,25})/i,u=null;for(let v=c.length-1;v>=0;v--){let d=c[v];if(d.offsetParent===null)continue;let p=(d.innerText||"").match(g);if(p&&p[1]){u=p[1];break}}if(t)if(u){try{await navigator.clipboard.writeText(u)}catch{}t.tagName==="INPUT"||t.tagName==="TEXTAREA"?t.value=u:t.textContent=u,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),S.playSuccess(),X(It("idFound")(u)),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}else S.playError(),X(It("noIdFound"),{error:!0}),t.placeholder=It("notFound"),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}catch(o){console.error("Erro na automa\xE7\xE3o:",o),S.playError(),X(It("processingError"),{error:!0})}finally{t&&(t.classList.remove("cw-scanning-active"),t.value||(t.placeholder=a)),Jo(!1)}}function Zo(e){e.dataset.bulletEnabled!=="true"&&(e.dataset.bulletEnabled="true",(e.value.trim()===""||e.value.trim()==="\u2022")&&(e.value="\u2022 "),e.addEventListener("keydown",function(t){let a=this.selectionStart,o=this.selectionEnd,n=this.value,i=n.lastIndexOf(`
`,a-1)+1,r=n.substring(i,a);if(t.key==="Enter"){t.preventDefault();let l=r.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(r.trim()==="\u2022"){this.value=n.substring(0,i)+`
`+n.substring(o),this.selectionStart=this.selectionEnd=i+1;return}let c=`
`+l;this.value=n.substring(0,a)+c+n.substring(o),this.selectionStart=this.selectionEnd=a+c.length}else if(t.key==="Tab")t.preventDefault(),t.shiftKey?r.startsWith("  ")&&(this.value=n.substring(0,i)+r.substring(2)+n.substring(a),this.selectionStart=this.selectionEnd=a-2):(this.value=n.substring(0,i)+"  "+r+n.substring(a),this.selectionStart=this.selectionEnd=a+2);else if(t.key==="Backspace"&&a===o&&a>0){let l=n.substring(0,a);l.endsWith("\u2022 ")?(t.preventDefault(),this.value=l.substring(0,a-2)+n.substring(o),this.selectionStart=this.selectionEnd=a-2):l.endsWith("  ")&&r.trim().startsWith("\u2022")&&(t.preventDefault(),this.value=l.substring(0,a-2)+n.substring(o),this.selectionStart=this.selectionEnd=a-2)}}))}function Kt(e,t,a){t.innerHTML="";let o=Ie[e];if(!o)return;let n=Yt(o);if(a.activeFields.forEach(r=>{if(["TAGS_IMPLEMENTED","SCREENSHOTS_LIST","CONSENTIU_GRAVACAO","CASO_PORTUGAL","label_substatus"].includes(r))return;let l=`field-${r}`,c=document.createElement("label"),g=p=>Ue[a.currentLang]?.[p]||Ue.pt?.[p]||p;c.textContent=g(r.toLowerCase())!==r.toLowerCase()?g(r.toLowerCase()):r.replace(/_/g," ").replace(/\b\w/g,p=>p.toUpperCase())+":",Object.assign(c.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px",fontWeight:"700",color:j.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let u=n.includes(r),v=document.createElement("span");if(v.textContent=c.textContent,u){let p=document.createElement("span");p.textContent=" *",p.style.color=j.error,v.appendChild(p)}if(c.innerHTML="",c.appendChild(v),r==="SPEAKEASY_ID"){let p=document.createElement("button");p.innerHTML=g("auto_busca"),p.style.cssText=`font-size: 11px; font-weight: 700; color: ${j.primary}; background-color: ${j.primaryBg}; border: none; border-radius: ${Ne.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${he};`,p.onmouseenter=()=>p.style.backgroundColor="#d2e3fc",p.onmouseleave=()=>p.style.backgroundColor=j.primaryBg,p.onclick=_=>{_.preventDefault(),S.playClick(),ua(l)},c.appendChild(p)}if(!u){let p=document.createElement("button");p.innerHTML="\u2715",p.style.cssText=`font-size: 14px; background: ${j.bgInput}; border: none; color: ${j.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${he};`,p.onmouseenter=()=>{p.style.background=j.error,p.style.color=j.surface},p.onmouseleave=()=>{p.style.background=j.bgInput,p.style.color=j.textSub},p.onclick=async _=>{_.preventDefault(),S.playClick();let w=v.textContent.replace(/:\s*$/,"").trim();await _e(g("remover_campo_confirm").replace("{campo}",w),{danger:!0,confirmText:g("remover")})&&(a.removeField(r),Kt(e,t,a))},c.appendChild(p)}let d;Nt.includes(r)?(d=document.createElement("textarea"),d.classList.add("bullet-textarea","cw-textarea"),d.placeholder=g("utilize_marcadores"),Zo(d)):pa.includes(r)?(d=document.createElement("textarea"),d.classList.add("cw-textarea"),d.placeholder=g("descreva_consideracoes")):(d=document.createElement("input"),d.type="text",d.classList.add("cw-input")),d.id=l,d.value=a.formData[l]||"",d.addEventListener("input",p=>a.updateField(l,p.target.value)),t.appendChild(c),t.appendChild(d)}),a.activeFields.includes("CONSENTIU_GRAVACAO")){let r=g=>Ue[a.currentLang]?.[g]||Ue.pt?.[g]||g,l=document.createElement("label");l.textContent=r("consentiu_gravacao"),Object.assign(l.style,{display:"block",fontSize:"13px",fontWeight:"700",color:j.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let c=document.createElement("select");c.className="cw-select",c.innerHTML=`
            <option value="false">${r("nao")}</option>
            <option value="true">${r("sim")}</option>
        `,c.value=a.consent?"true":"false",c.onchange=()=>a.setConsent(c.value==="true"),t.appendChild(l),t.appendChild(c)}let i=(o.templateFields||[]).filter(r=>!n.includes(r)&&!a.activeFields.includes(r));if(i.length>0){let r=c=>Ue[a.currentLang]?.[c]||Ue.pt?.[c]||c,l=document.createElement("div");Object.assign(l.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginTop:"24px"}),i.forEach(c=>{let g=r(c.toLowerCase())!==c.toLowerCase()?r(c.toLowerCase()):c.replace(/_/g," ").replace(/\b\w/g,v=>v.toUpperCase())+":",u=document.createElement("button");u.type="button",u.textContent=`+ ${g.replace(/:$/,"")}`,u.style.cssText=`font-size: 12px; font-weight: 600; color: ${j.primary}; background-color: ${j.primaryBg}; border: none; border-radius: ${Ne.pill}; padding: 6px 14px; cursor: pointer; transition: all 0.2s ${he};`,u.onmouseenter=()=>u.style.backgroundColor="#d2e3fc",u.onmouseleave=()=>u.style.backgroundColor=j.primaryBg,u.onclick=v=>{v.preventDefault(),S.playClick(),a.addFieldAt(c,a.activeFields.length),Kt(e,t,a)},l.appendChild(u)}),t.appendChild(l)}}function mr(e){let t=String(e.label||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");return`cw-${String(e.key||"").toLowerCase()}-${t}`}function gr(e){let t;try{t=JSON.parse(e||"{}")}catch{return null}let a=t.fields||{};return Object.keys(a).length?{fields:a,linkedTask:t.linkedTask,activeTasks:t.activeTasks}:null}function Qo(e){if(!Array.isArray(e)||!e.length)return!1;let t={},a={},o=e.slice().sort((n,i)=>(n.sortOrder||0)-(i.sortOrder||0));for(let n of o){if(!n.key)continue;let i=gr(n.value);if(!i)continue;let r=mr(n);if(String(n.lang).toUpperCase()==="ES"){a[r]={...i.fields};continue}t[r]={type:(n.field||"all").toLowerCase(),substatus:[n.key],...i.fields,...i.linkedTask?{linkedTask:i.linkedTask}:{},...i.activeTasks?{activeTasks:i.activeTasks}:{}}}if(!Object.keys(t).length)return!1;for(let n of Object.keys(st))delete st[n];Object.assign(st,t);for(let n of Object.keys(Xt))delete Xt[n];return Object.assign(Xt,a),!0}async function en(){let e=me.getCachedContent("note_template"),t=Qo(e);try{let a=await me.fetchContentModule("note_template");t=Qo(a)||t}catch(a){console.warn("Modelos de nota indispon\xEDveis; usando os embutidos.",a)}return t}function Ba(e,t,a,o=null){let n=e.currentSubStatus;if(!n)return null;let i=Ie[n],r=Ue[e.currentLang]||Ue.pt,l=u=>r[u]||Ue.pt?.[u]||u,c='style="margin-bottom: 12px; padding-left: 30px;"',g="";if(e.activeFields.forEach(u=>{let v=l(u.toLowerCase()),d="N/A";if(u==="label_substatus")v=l("label_substatus"),d=i.name;else if(u==="TAGS_IMPLEMENTED"){v=l("tags_implemented");let p=[];t.getCheckedElements().forEach(w=>{let E=w.value,M=et[E],A=w.count||1,D=E==="ads_conversion_tracking"||E==="ads_enhanced_conversions";e.tagSupportUsed&&D&&!e.forcedScreenshots.has(E)?p.push(`${M.name} - ${l("ts_output_disclaimer")}`):p.push(A>1?`${M.name} (x${A})`:M.name)}),d=p.join(", ")||"N/A"}else if(u==="SCREENSHOTS_LIST"){v=l("screenshots_list");let p="",_=t.screenshotsElement;_&&Array.from(_.querySelectorAll('input[id^="name-"]')).forEach(E=>{let M=E.value,A=E.closest(".cw-screen-card");if(A){let D=A.querySelectorAll('input[id^="screen-"]'),h=!1,q="";D.forEach(R=>{let C=R.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"Evid\xEAncia",I=R.value.trim();I&&(q+=`<li>${C} - ${I}</li>`,h=!0)}),h&&(p+=`<div style="margin-bottom: 8px;"><b>${M}</b><ul ${c}>${q}</ul></div>`)}}),d=p||"N/A"}else if(u==="CASO_PORTUGAL")v=l("caso_portugal"),d=l("sim");else if(u==="CONSENTIU_GRAVACAO")v=l("consentiu_gravacao"),d=e.consent?l("sim"):l("nao");else{let p=`field-${u}`,_=e.formData[p],w=Wo(i,u,e.currentLang),E=w?w+" ":"";if(_&&_.trim()!==""&&_.trim()!=="\u2022"){let M=_.trim();if(Nt.includes(u)){let A=M.split(`
`).map(D=>D.trim()).filter(D=>D!==""&&D!=="\u2022").map(D=>D.startsWith("\u2022 ")?D.substring(2):D).map(D=>`<li>${D}</li>`).join("");d=A?`${E}<ul ${c}>${A}</ul>`:"N/A"}else pa.includes(u)?d=E+M.split(`
`).filter(A=>A.trim()!=="").map(A=>`<p style="margin: 0 0 8px 0;">${A}</p>`).join(""):d=E+M}else E&&(d=E.trim())}g+=`<b>${v}</b><br>${d}<br><br>`}),o){let u="";o.l1&&(u+=`<li>${l("ligacao_1")}: ${o.l1}</li>`),o.l2&&(u+=`<li>${l("ligacao_2")}: ${o.l2}</li>`),o.msg&&(u+=`<li>${l("mensagem_am")}: ${o.msg}</li>`),u&&(g+=`<b>${l("evidencias_contato")}</b><br><ul ${c}>${u}</ul><br>`)}if(i.customFooter&&(g+=`${i.customFooter}<br><br>`),a?.getOutput){let u=a.getOutput();u&&(g+=`${u}<br><br>`)}return g+="<i>Nota criada atrav\xE9s do Cases Wizard.</i>",g.replace(/(<br>\s*){3,}/g,"<br><br>").trim()}var tn={pt:"Passe o mouse sobre um cen\xE1rio para visualizar o texto...",es:"Pasa el mouse sobre un escenario para ver el texto..."};function an(){return tn[le()]||tn.pt}function on(e){let t=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,a=document.createElement("div");a.className="cw-step-scenarios";let o=document.createElement("div");Object.assign(o.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let n=document.createElement("div");Object.assign(n.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"44px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"});let i=document.createElement("span");i.style.transition="opacity 0.05s ease, transform 0.05s ease",i.textContent=an(),n.appendChild(i);let r=new Set,l=null;return a.render=(c,g)=>{r.clear();let u=ca(c,g);o.innerHTML="",u.forEach(([v,d])=>{let p=document.createElement("div");p.textContent=da(v,c),p.dataset.id=v,p.dataset.sound="hover",Object.assign(p.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"});let _=la(d,le(),v),w=_["field-REASON_COMMENTS"]||_["field-CONTEXTO_CALL"]||v;p.onmouseenter=()=>{l&&clearTimeout(l),r.has(v)||(p.style.background="#f1f3f4"),i.style.opacity="0",t||(i.style.transform="translateY(5px)"),l=setTimeout(()=>{i.textContent=w.substring(0,120)+(w.length>120?"...":""),i.style.opacity="1",t||(i.style.transform="translateY(0)")},50)},p.onmouseleave=()=>{l&&clearTimeout(l),r.has(v)||(p.style.background="#ffffff"),l=setTimeout(()=>{r.size===0&&(i.style.opacity="0",setTimeout(()=>{i.textContent=an(),i.style.opacity="1"},50))},100)},p.onclick=()=>{S.playClick();let E=!r.has(v);E?(r.add(v),p.style.background="#e8f0fe",p.style.borderColor="#1a73e8",p.style.color="#1967d2"):(r.delete(v),p.style.background="#ffffff",p.style.borderColor="#dadce0",p.style.color="#3c4043"),e(v,E)},o.appendChild(p)}),u.length===0?a.style.display="none":a.style.display="block"},a.getSelectedIds=()=>[...r],a.appendChild(o),a.appendChild(n),a}function br(e){return e==="ads_conversion_tracking"||e==="ads_enhanced_conversions"}function Pa(e,t){return t.tagSupportUsed&&br(e)&&!t.forcedScreenshots.has(e)}var fe={bg:j.bgInput,white:j.surface,border:j.border,textMain:j.text,textSub:j.textSub,blue:j.blue,blueLight:j.primaryBg,brands:{ads:{id:"ads",label:"Google Ads",color:j.blue,bg:j.primaryBg,icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:j.yellow,bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:j.primary,bg:j.primaryBg,icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:j.green,bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},St={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function nn(e,t,a){let o={};a&&a.subscribe(()=>{q(),R()});function n(T){let C=T.toLowerCase();return C.includes("ads")||C.includes("conversion")||C.includes("remarketing")?fe.brands.ads:C.includes("ga4")||C.includes("analytics")?fe.brands.ga4:C.includes("gtm")||C.includes("tag manager")||C.includes("container")?fe.brands.gtm:C.includes("merchant")||C.includes("shopping")||C.includes("feed")?fe.brands.gmc:fe.brands.default}let i=Object.entries(et).filter(([T,C])=>C.popular),r={};Object.entries(et).forEach(([T,C])=>{if(C.popular)return;let I=n(C.name);r[I.label]||(r[I.label]={brand:I,tasks:[]}),r[I.label].tasks.push({key:T,...C})});let l="cw-zen-tasks";if(!document.getElementById(l)){let T=document.createElement("style");T.id=l,T.innerHTML=`
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
        `,document.head.appendChild(T)}let c=document.createElement("div");c.className="cw-zen-container";let g=document.createElement("div");Object.assign(g.style,{display:"none"});let u=document.createElement("div");u.className="cw-screens-container",g.appendChild(u),c.innerHTML=`
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
    `;let v=c.querySelector(".cw-hero-grid"),d=c.querySelector(".cw-acc-container"),p=c.querySelector(".cw-results-container"),_=c.querySelector(".cw-search-input");oa(c,".cw-acc-header, .cw-task-item");let w=c.querySelector(".cw-status-bar"),E=c.querySelector(".cw-status-text"),M=c.querySelector(".cw-footer-icons");function A(T,C){return I=>{if(I.target.closest(".cw-step-btn-hero, .cw-step-btn-list"))return;let k=o[T]?o[T].count:0;h(T,k>0?-k:1,C)}}i.forEach(([T,C])=>{let I=n(C.name),k=document.createElement("div");k.className="cw-hero-card",k.id=`hero-${T}`,k.style.setProperty("--hero-color",I.color),k.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${St[I.icon]}</div>
                <div class="cw-hero-label">${C.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn-hero minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn-hero plus">+</div>
            </div>
        `,k.onclick=A(T,C),k.querySelector(".minus").onclick=()=>h(T,-1,C),k.querySelector(".plus").onclick=()=>h(T,1,C),k.tabIndex=0,k.setAttribute("role","button"),k.setAttribute("aria-pressed","false"),k.addEventListener("keydown",F=>{(F.key==="Enter"||F.key===" ")&&(F.preventDefault(),k.click())}),k.dataset.color=I.color,v.appendChild(k)});function D(T,C){let I=n(C.name),k=document.createElement("div");return k.className="cw-task-item",k.dataset.id=T,k.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${I.bg}; color:${I.color}">
                    ${St[I.icon]||St.default}
                </div>
                <div class="cw-task-label">${C.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn-list minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn-list plus">+</div>
            </div>
        `,k.onclick=A(T,C),k.querySelector(".minus").onclick=()=>h(T,-1,C),k.querySelector(".plus").onclick=()=>h(T,1,C),k.tabIndex=0,k.setAttribute("role","button"),k.setAttribute("aria-pressed","false"),k.setAttribute("aria-label",C.name),k.addEventListener("keydown",F=>{(F.key==="Enter"||F.key===" ")&&(F.preventDefault(),k.click())}),k}Object.entries(r).forEach(([T,C])=>{let I=document.createElement("div");I.className="cw-acc-group";let k=document.createElement("div");k.className="cw-acc-header",k.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${C.brand.color}"></div>
                ${T}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,k.tabIndex=0,k.setAttribute("role","button"),k.setAttribute("aria-expanded","false"),k.onclick=()=>{d.querySelectorAll(".cw-acc-group.open").forEach(z=>{z!==I&&(z.classList.remove("open"),z.querySelector(".cw-acc-header")?.setAttribute("aria-expanded","false"))});let U=I.classList.toggle("open");k.setAttribute("aria-expanded",String(U))},k.addEventListener("keydown",U=>{(U.key==="Enter"||U.key===" ")&&(U.preventDefault(),k.click())});let F=document.createElement("div");F.className="cw-acc-body",C.tasks.forEach(U=>{let z=D(U.key,U);F.appendChild(z)}),I.appendChild(k),I.appendChild(F),d.appendChild(I)});function h(T,C,I){o[T]||(o[T]={count:0,data:I,brand:n(I.name)}),o[T].count+=C,o[T].count<=0&&delete o[T],q(),R(),e&&e()}function q(){i.forEach(([F])=>{let U=v.querySelector(`#hero-${F}`);if(!U)return;let z=o[F];z?(U.classList.add("active"),U.setAttribute("aria-pressed","true"),U.querySelector(".cw-step-val").textContent=z.count,U.querySelector(".cw-step-val").style.color=U.dataset.color,U.classList.toggle("ts-success",Pa(F,a))):(U.classList.remove("active"),U.setAttribute("aria-pressed","false"),U.classList.remove("ts-success"))}),c.querySelectorAll(".cw-task-item").forEach(F=>{let U=F.dataset.id,z=o[U];z?(F.classList.add("selected"),F.setAttribute("aria-pressed","true"),F.querySelector(".cw-step-val").textContent=z.count,F.classList.toggle("ts-success",Pa(U,a))):(F.classList.remove("selected"),F.setAttribute("aria-pressed","false"),F.classList.remove("ts-success"))});let C=Object.keys(o),I=0,k=[];if(C.forEach(F=>{let U=o[F];I+=U.count;for(let z=0;z<U.count;z++)k.length<6&&k.push(U.brand)}),I>0){w.classList.add("visible");let F=I>1?t("acoes_plural"):t("acao_singular"),U=I>1?t("definidas_plural"):t("definida_singular");E.textContent=`${I} ${F} ${U}`,M.innerHTML="",k.forEach(z=>{let K=document.createElement("div");K.className="cw-mini-icon-status",K.innerHTML=St[z.icon]||St.default;let re=K.querySelector("svg");re&&(re.style.width="14px",re.style.height="14px"),M.appendChild(K)})}else w.classList.remove("visible"),E.textContent="",M.innerHTML=""}_.addEventListener("input",T=>{let C=T.target.value.toLowerCase();if(C.length>0){d.style.display="none",p.style.display="block",p.innerHTML="";let I=!1;Object.entries(et).forEach(([k,F])=>{if(F.name.toLowerCase().includes(C)){I=!0;let U=D(k,F);o[k]&&(U.classList.add("selected"),U.setAttribute("aria-pressed","true"),U.querySelector(".cw-step-val").textContent=o[k].count),p.appendChild(U)}}),I||(p.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else d.style.display="block",p.style.display="none"});function R(){let T={};u.querySelectorAll(".cw-input-field").forEach(F=>{T[F.id]=F.value}),u.innerHTML="";let C=Object.keys(o),I=!1;if(C.length===0){u.appendChild(Rt({icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg>',title:t("selecione_tarefas")})),g.style.display="none";return}let k=document.createElement("div");k.className="cw-info-banner",k.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.
            </span>
        `,u.appendChild(k),C.forEach(F=>{let U=o[F].data,z=o[F].count,K=o[F].brand,re=Pa(F,a),W=a.screenshotMode||"implementation",B=Vo(U,W,a.currentLang);if(B.length>0||re){I=!0;for(let J=1;J<=z;J++){let G=document.createElement("div");G.className="cw-screen-card",re&&G.classList.add("ts-success"),G.style.setProperty("--brand-color",K.color),G.style.setProperty("--brand-bg",K.bg),G.style.setProperty("--brand-shadow",K.color+"40");let te=document.createElement("div");te.className="cw-card-header";let Z=document.createElement("div");Z.className="cw-card-icon",Z.innerHTML=St[K.icon]||St.default;let ne=document.createElement("div");ne.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let ie=document.createElement("input");ie.className="cw-card-title-input",ie.id=`name-${F}-${J}`,ie.value=`${U.name}${z>1?" #"+J:""}`,ie.title=t("renomear_tooltip");let Y=document.createElement("span");if(Y.className="cw-edit-hint",Y.innerHTML=t("renomear_hint"),ne.appendChild(ie),ne.appendChild(Y),te.appendChild(Z),te.appendChild(ne),G.appendChild(te),re){let ae=document.createElement("div");ae.className="cw-ts-disclaimer-box",ae.innerHTML=`
                <span>${t("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${t("incluir_mesmo_assim")}</button>
            `,ae.querySelector("button").onclick=()=>{a.toggleForcedScreenshot(F,!0)},G.appendChild(ae)}else B.forEach((ae,s)=>{let y=document.createElement("div");y.className="cw-input-group";let L=document.createElement("label");L.className="cw-input-label",L.textContent=ae;let b=document.createElement("input");b.className="cw-input-field",b.id=`screen-${F}-${J}-${s}`,b.placeholder=t("cole_link_placeholder"),b.setAttribute("autocomplete","off"),T[b.id]&&(b.value=T[b.id],b.value.trim().length>5&&b.classList.add("filled")),b.addEventListener("input",()=>{b.value.trim().length>5?b.classList.add("filled"):b.classList.remove("filled")});let f=document.createElement("div");f.className="cw-input-check",f.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',y.appendChild(L),y.appendChild(b),y.appendChild(f),G.appendChild(y)});u.appendChild(G)}}}),g.style.display=I?"block":"none"}return{selectionElement:c,screenshotsElement:g,updateSubStatus:()=>R(),getCheckedElements:()=>Object.keys(o).map(T=>({value:T,count:o[T].count})),setTaskCount:(T,C)=>{o[T]&&delete o[T],C>0&&et[T]&&h(T,C,et[T])},toggleTask:(T,C=!0)=>{let I=o[T];C&&!I?h(T,1,et[T]):!C&&I&&h(T,-I.count,et[T])},setLanguage:T=>{t=T;let C=c.querySelector(".js-hero-title");C&&(C.textContent=t("acesso_rapido"));let I=c.querySelector(".cw-search-input");I&&(I.placeholder=t("buscar_catalogo")),R(),q()},reset:()=>{for(let T in o)delete o[T];_.value="",d.style.display="block",p.style.display="none",q(),R()}}}var fr={marginTop:"24px",marginBottom:"16px",padding:"20px",background:"#fff9e6",borderRadius:"20px",border:"1.5px solid #fbbc0540",display:"none",boxShadow:"0 4px 12px rgba(251, 188, 5, 0.05)"},hr={fontSize:"12px",color:"#b06000",marginTop:"8px",lineHeight:"1.4"},xr={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #dadce0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",background:"#fff"},vr={display:"flex",gap:"20px",marginBottom:"12px"};function rn(e){let t=document.createElement("div");t.id="tag-support-container",Object.assign(t.style,fr);let a=document.createElement("label");a.className="js-ts-main-label",a.textContent=e("utilizou_tag_support"),Object.assign(a.style,Da,{marginTop:"0"});let o=document.createElement("div");Object.assign(o.style,vr);let n=document.createElement("input");n.type="radio",n.name="ts_usage_mod",n.value="Sim",Object.assign(n.style,$a);let i=document.createElement("label");i.className="js-ts-sim-label",i.textContent=e("sim");let r=document.createElement("div");Object.assign(r.style,{display:"flex",alignItems:"center"}),r.appendChild(n),r.appendChild(i);let l=document.createElement("input");l.type="radio",l.name="ts_usage_mod",l.value="N\xE3o",l.checked=!0,Object.assign(l.style,$a);let c=document.createElement("label");c.className="js-ts-nao-label",c.textContent=e("nao");let g=document.createElement("div");Object.assign(g.style,{display:"flex",alignItems:"center"}),g.appendChild(l),g.appendChild(c),o.appendChild(r),o.appendChild(g);let u=document.createElement("div");u.style.display="block";let v=document.createElement("label");v.className="js-ts-reason-label",v.textContent=e("motivo_ts"),Object.assign(v.style,Da,{fontSize:"12px"});let d=document.createElement("input");d.type="text",Object.assign(d.style,xr);let p=document.createElement("div");p.className="js-ts-warning",p.innerHTML=`\u26A0\uFE0F <strong>${e("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" rel="noopener noreferrer" style="color:#e37400; text-decoration:underline;">${e("link_aqui")}</a>`,Object.assign(p.style,hr),u.appendChild(v),u.appendChild(d),u.appendChild(p),t.appendChild(a),t.appendChild(o),t.appendChild(u),n.onchange=()=>{S.playClick(),u.style.display="none",V.setTagSupportUsed(!0)},l.onchange=()=>{S.playClick(),u.style.display="block",V.setTagSupportUsed(!1)};function _(A,D){if(t.style.display="none",!A||!D||D.length===0)return;D.some(q=>q==="ads_conversion_tracking"||q==="ads_enhanced_conversions")?t.style.display="block":(M(),V.setTagSupportUsed(!1))}function w(){if(t.style.display==="none")return"";let A=`<br><b>${e("tag_support_output_label")}</b> ${n.checked?`\u2705 ${e("sim")}`:`\u274C ${e("nao")}`}`;return l.checked&&d.value.trim()!==""&&(A+=`<br><b>${e("motivo_output_label")}</b> ${d.value}`),A+="<br>",A}function E(A){e=A,a.textContent=e("utilizou_tag_support"),v.textContent=e("motivo_ts"),i.textContent=e("sim"),c.textContent=e("nao"),p.innerHTML=`\u26A0\uFE0F <strong>${e("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" rel="noopener noreferrer" style="color:#b06000; text-decoration:underline;">${e("link_aqui")}</a>`}function M(){t.style.display="none",l.checked=!0,n.checked=!1,u.style.display="block",d.value=""}return{element:t,updateVisibility:_,getOutput:w,setLanguage:E,reset:M}}var Ga="cw_notes_parking_lot",ma="cw_notes_emergency_save";var je={getAll:()=>{try{return JSON.parse(localStorage.getItem(Ga)||"[]")}catch{return[]}},save:e=>{let t=je.getAll(),a={id:Date.now().toString(),timestamp:new Date().toISOString(),...e};return t.unshift(a),t.length>5&&t.pop(),localStorage.setItem(Ga,JSON.stringify(t)),a},delete:e=>{let t=je.getAll();return t=t.filter(a=>a.id!==e),localStorage.setItem(Ga,JSON.stringify(t)),t},getCount:()=>je.getAll().length,saveEmergency:e=>{let t={timestamp:Date.now(),data:e};localStorage.setItem(ma,JSON.stringify(t))},getEmergency:()=>{try{let e=localStorage.getItem(ma);if(!e)return null;let t=JSON.parse(e);return Date.now()-t.timestamp>432e5?(localStorage.removeItem(ma),null):!t.data||!t.data.subStatus?null:t.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(ma)}};var sn=["lucaste","ricardogi"];var ln="cw_case_streak_v1",yr=[5,10,15,20,25,30,40,50];function cn(){let e=new Date;return`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`}function ja(){try{let e=JSON.parse(localStorage.getItem(ln)||"{}");return e.date===cn()&&e.count||0}catch{return 0}}function dn(){let e=ja()+1;try{localStorage.setItem(ln,JSON.stringify({date:cn(),count:e}))}catch{}return{count:e,isMilestone:yr.includes(e)}}var pn={pt:{milestoneToast:e=>`\u{1F525} ${e} casos hoje!`,quickSearch:"Busca r\xE1pida: Ctrl/Cmd+K",casesToday:"Casos conclu\xEDdos hoje",drag:"Arrastar",cancel:"Cancelar",cancelledToast:"Cancelado!"},es:{milestoneToast:e=>`\u{1F525} \xA1${e} casos hoy!`,quickSearch:"B\xFAsqueda r\xE1pida: Ctrl/Cmd+K",casesToday:"Casos completados hoy",drag:"Arrastrar",cancel:"Cancelar",cancelledToast:"\xA1Cancelado!"}};function Et(e){let t=le();return pn[t]?.[e]??pn.pt[e]}var ye={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1",gray:"#9AA0A6"},Ha=50,Ua=null;function ga(e){let t=document.getElementById("cw-btn-notes");if(!t)return;let a=t.querySelector(".cw-dot-dirty");e?a||(a=document.createElement("div"),a.className="cw-dot-dirty",t.appendChild(a)):a&&a.remove()}function un(){let e=document.getElementById("cw-streak-badge"),t=document.getElementById("cw-streak-count");if(!e||!t)return;let a=ja();t.textContent=a,e.classList.toggle("visible",a>0);let o=document.querySelector(".cw-pill");o&&(o.classList.toggle("has-streak",a>0),o.classList.toggle("streak-tier-2",a>=5&&a<15),o.classList.toggle("streak-tier-3",a>=15&&a<30),o.classList.toggle("streak-tier-4",a>=30))}function mn(){let{count:e,isMilestone:t}=dn();if(un(),t){let a=document.querySelector(".cw-pill");S.playSuccess(),a&&Ro(a),X(Et("milestoneToast")(e))}}function gn(e,t){let a="cw-command-center-style";if(!document.getElementById(a)){let h=document.createElement("style");h.id=a,h.innerHTML=`
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
                
                background: ${ye.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${ye.glassBorder}; border-radius: 50px;
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
                width: ${Ha}px !important;
                height: ${Ha}px !important;
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
                cursor: pointer; position: relative; color: ${ye.iconIdle};
                flex-shrink: 0;
                transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn { transition: background 0.2s ease, color 0.2s ease !important; }
            }
            .cw-btn:hover {
                background: ${ye.glassHighlight};
                color: ${ye.iconActive};
                /* S\xF3 scale (cresce do centro), sem translateY: bot\xF5es redondos
                   colados lado a lado numa fileira \xFAnica - um lift vertical
                   \xE9 o caso cl\xE1ssico de flicker quando o mouse passa raspando
                   a borda entre dois \xEDcones adjacentes. */
                transform: scale(1.18) !important;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn:hover { transform: none !important; }
            }

            .cw-btn.notes.active { color: ${ye.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${ye.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${ye.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${ye.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.library.active { color: ${ye.pink} !important; background: rgba(244, 143, 177, 0.15); } /* [NOVO] */
            .cw-btn.broadcast.active { color: ${ye.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${ye.teal} !important; background: rgba(0, 191, 165, 0.15); }
            .cw-btn.configs.active { color: ${ye.gray} !important; background: rgba(154, 160, 166, 0.15); }
            .cw-btn.bauform.active { color: ${ye.blue} !important; background: rgba(66, 133, 244, 0.15); }

            .cw-btn.notes:hover { color: ${ye.blue}; filter: drop-shadow(0 0 8px rgba(138, 180, 248, 0.6)); }
            .cw-btn.email:hover { color: ${ye.red}; filter: drop-shadow(0 0 8px rgba(242, 139, 130, 0.6)); }
            .cw-btn.script:hover { color: ${ye.purple}; filter: drop-shadow(0 0 8px rgba(197, 138, 249, 0.6)); }
            .cw-btn.links:hover { color: ${ye.green}; filter: drop-shadow(0 0 8px rgba(129, 201, 149, 0.6)); }
            .cw-btn.library:hover { color: ${ye.pink}; filter: drop-shadow(0 0 8px rgba(244, 143, 177, 0.6)); }
            .cw-btn.broadcast:hover { color: ${ye.orange}; filter: drop-shadow(0 0 8px rgba(249, 171, 0, 0.6)); }
            .cw-btn.timezone:hover { color: ${ye.teal}; filter: drop-shadow(0 0 8px rgba(0, 191, 165, 0.6)); }
            .cw-btn.configs:hover { color: ${ye.gray}; filter: drop-shadow(0 0 8px rgba(154, 160, 166, 0.6)); }

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
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${ye.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            @media (prefers-reduced-motion: reduce) {
                .cw-grip:hover .cw-grip-bar { transform: none !important; }
            }
            .cw-pill.dragging .cw-grip-bar { background-color: ${ye.blue}; width: 16px; opacity: 1; }

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
                border: 1px solid ${ye.glassBorder};
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
            .cw-center-dots span:nth-child(1) { background-color: ${ye.blue}; animation-delay: -0.22s; }
            .cw-center-dots span:nth-child(2) { background-color: ${ye.red}; animation-delay: -0.11s; }
            .cw-center-dots span:nth-child(3) { background-color: ${ye.green}; }
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
                color: ${ye.green};
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
        `,document.head.appendChild(h)}function o(){let h=Dt();return h.isDev?`<div id="cw-env-tag" class="cw-env-badge" title="${`Ambiente de desenvolvimento \u2014 implanta\xE7\xE3o \u2026${h.fingerprint} (${h.endpoint})`}">Dev</div>`:""}let n={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg class="cw-logo-base" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',mainSpark:'<svg class="cw-logo-spark" viewBox="0 0 24 24"><defs><linearGradient id="cw-spark-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4285F4"/><stop offset="33%" stop-color="#EA4335"/><stop offset="66%" stop-color="#FBBC05"/><stop offset="100%" stop-color="#34A853"/></linearGradient></defs><path fill="url(#cw-spark-grad)" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',configs:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>'},i=document.createElement("div");i.id="cw-floating-trigger",i.className="cw-pill side-right collapsed"+(Dt().isDev?" cw-env-dev":""),i.innerHTML=`
        <div id="cw-command-center" style="display:none;"></div>
        <div class="cw-main-logo js-cc-quicksearch" title="${Et("quickSearch")}">${n.main}${n.mainSpark}</div>
        <div id="cw-admin-tag" class="cw-admin-badge">Admin</div>
        ${o()}
        <div id="cw-streak-badge" class="cw-streak-badge js-cc-casestoday" title="${Et("casesToday")}">\u{1F525} <span id="cw-streak-count">0</span></div>

        <div class="cw-grip js-cc-drag" title="${Et("drag")}">
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
    `;let r=document.createElement("div");r.className="cw-focus-backdrop",document.body.appendChild(r),document.body.appendChild(i),un(),Se(()=>{let h=i.querySelector(".js-cc-quicksearch");h&&(h.title=Et("quickSearch"));let q=i.querySelector(".js-cc-casestoday");q&&(q.title=Et("casesToday"));let R=i.querySelector(".js-cc-drag");R&&(R.title=Et("drag"))});let l=h=>{S.playClick(),h()};if(i.querySelector(".notes").onclick=h=>{h.stopPropagation(),l(e.toggleNotes)},i.querySelector(".bauform").onclick=h=>{h.stopPropagation(),l(e.toggleBAUForm)},i.querySelector(".email").onclick=h=>{h.stopPropagation(),l(e.toggleEmail)},i.querySelector(".script").onclick=h=>{h.stopPropagation(),l(e.toggleScript)},i.querySelector(".links").onclick=h=>{h.stopPropagation(),l(e.toggleLinks)},i.querySelector(".library").onclick=h=>{h.stopPropagation(),l(e.toggleLibrary)},i.querySelector(".timezone").onclick=h=>{h.stopPropagation(),l(e.toggleTimezone)},i.querySelector(".configs").onclick=h=>{h.stopPropagation(),l(e.toggleConfigs)},i.querySelector(".broadcast").onclick=h=>{h.stopPropagation(),l(()=>{let q=h.currentTarget.querySelector(".cw-badge");q&&q.remove(),e.broadcastControl&&e.broadcastControl.toggle()})},i.querySelectorAll(".cw-btn").forEach(h=>{h.addEventListener("mouseenter",()=>S.playHover())}),e.broadcastControl&&e.broadcastControl.hasUnread){let h=document.createElement("div");h.className="cw-badge",i.querySelector(".broadcast").appendChild(h)}let c=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function g(){if(c()){i.classList.remove("collapsed"),S.playGenieOpen();return}let h=i.getBoundingClientRect(),q=window.innerHeight,R=h.top>q/2,T=h.height;i.style.setProperty("transition","none","important"),i.classList.remove("collapsed");let C=i.scrollHeight;if(i.classList.add("collapsed"),i.style.height=`${T}px`,R){let I=q-h.bottom;i.style.top="auto",i.style.bottom=`${I}px`}else i.style.bottom="auto",i.style.top=`${h.top}px`;i.style.overflow="hidden",i.offsetWidth,i.style.removeProperty("transition"),i.classList.remove("collapsed"),i.style.height=`${C}px`,S.playGenieOpen(),setTimeout(()=>{i.style.height="",i.style.overflow=""},350)}function u(h=!0){if(i.classList.contains("collapsed"))return;if(c()){i.classList.add("collapsed"),h&&S.playSwoosh();return}let q=i.getBoundingClientRect().height;i.style.setProperty("transition","none","important"),i.style.height=`${q}px`,i.offsetWidth,i.style.removeProperty("transition"),i.classList.add("collapsed"),i.style.height=`${Ha}px`,h&&S.playSwoosh(),setTimeout(()=>{i.style.height=""},700)}Ua=u;let v=null;i.onmouseleave=()=>{document.querySelector(".cw-processing-card")||(v=setTimeout(()=>{i.querySelector(".cw-btn.active")||u()},3e3))},i.onmouseenter=()=>{v&&clearTimeout(v)},(async function(){let q=()=>{let R=Le();if(R){let T=R.split("@")[0].toLowerCase();if(sn.includes(T)){let C=i.querySelector("#cw-admin-tag");C&&C.classList.add("visible")}}else setTimeout(q,2e3)};if(q(),t&&typeof t.then=="function"){try{await t}catch{}await ue(150)}else await ue(2800);i.classList.add("arriving"),S.playReady(),i.querySelectorAll(".cw-sep").forEach(R=>R.classList.add("visible"))})();let d=!1,p,_,w,E,M=3;i.onmousedown=h=>{if(h.target.closest("button"))return;h.preventDefault(),p=h.clientX,_=h.clientY;let q=i.getBoundingClientRect();w=q.left,E=q.top,document.addEventListener("mousemove",A),document.addEventListener("mouseup",D)};function A(h){let q=h.clientX-p,R=h.clientY-_;!d&&Math.sqrt(q*q+R*R)>M&&(d=!0,i.classList.add("dragging"),i.style.transition="none",v&&clearTimeout(v)),d&&(i.style.left=`${w+q}px`,i.style.top=`${E+R}px`,i.style.right="auto",i.style.bottom="auto",i.style.transform="none")}function D(h){if(document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",D),d){d=!1,i.classList.remove("dragging");let q=window.innerWidth,R=window.innerHeight,T=i.getBoundingClientRect(),C=T.left+T.width/2,I;C<q/2?(I=24,i.classList.remove("side-right"),i.classList.add("side-left")):(I=q-T.width-24,i.classList.remove("side-left"),i.classList.add("side-right"));let k=yt(T.top,24,R-T.height-24);setTimeout(()=>{i.style.setProperty("transition","left 0.3s cubic-bezier(0.4, 0, 0.2, 1), top 0.3s cubic-bezier(0.4, 0, 0.2, 1)","important"),i.style.left=`${I}px`,i.style.top=`${k}px`,i.style.bottom="auto",i.style.transform=""},10),setTimeout(()=>{i.style.transition="",i.style.removeProperty("transition")},700)}else{let q=i.querySelector(".cw-btn.active"),R=h.target.closest("button");i.classList.contains("collapsed")?g():!q&&!R&&u(),R&&(R.style.transform="scale(0.9)",setTimeout(()=>R.style.transform="",150))}}}function Jt(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop");window._CW_ABORT_PROCESS=!1;let a=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;e&&Ua?Ua(!1):e&&e.classList.add("collapsed"),e&&e.classList.add("cw-busy");let o=document.createElement("div");o.className="cw-processing-card",o.innerHTML=`
      <div class="cw-center-slot">
        <div class="cw-center-dots"><span></span><span></span><span></span></div>
        <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
      </div>
      <div class="cw-center-text">${me.getRandomTip()}</div>
  `;let n=document.createElement("div");n.className="cw-abort-btn",n.textContent="Cancelar",n.onclick=c=>{c.stopPropagation(),window._CW_ABORT_PROCESS=!0,S.stopThinking(),X("Cancelado!",{duration:3e3}),l()},o.appendChild(n),document.body.appendChild(o),t&&t.classList.add("active"),requestAnimationFrame(()=>{requestAnimationFrame(()=>o.classList.add("visible"))}),S.startThinking();let i=Date.now(),r=!1;function l(){r||(r=!0,S.stopThinking(),t&&t.classList.remove("active"),e&&e.classList.remove("cw-busy"),o.classList.remove("visible"),setTimeout(()=>o.remove(),a?200:320))}return function(){if(window._CW_ABORT_PROCESS||r)return;let g=Math.max(0,2e3-(Date.now()-i));setTimeout(()=>{if(window._CW_ABORT_PROCESS||r)return;S.stopThinking();let u=o.querySelector(".cw-center-dots"),v=o.querySelector(".cw-center-success");u&&u.classList.add("hidden"),n.classList.add("hidden"),v&&v.classList.add("show"),setTimeout(()=>{v&&v.classList.remove("show"),setTimeout(l,200)},850)},g)}}function bn(e){let{onSaveCurrent:t,onLoadDraft:a,t:o}=e,n=document.createElement("button");n.className="js-btn-park",n.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${o("guardar")}</span>
    `,n.style.cssText=`
        flex: 1 1 0;
        padding: 12px 0;
        margin-top: 24px;
        border-radius: ${Ne.pill};
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
        transition: background-color 0.2s ${he}, border-color 0.2s ${he}, color 0.2s ${he}, box-shadow 0.2s ${he}, transform 0.1s ${he};
        box-shadow: ${pt.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `,n.onmouseenter=()=>{n.style.backgroundColor="#F8F9FA",n.style.borderColor="#202124",n.style.color="#202124",n.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)"},n.onmouseleave=()=>{n.style.backgroundColor="#FFFFFF",n.style.borderColor="#DADCE0",n.style.color="#5F6368",n.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)"},n.onmousedown=()=>n.style.transform="scale(0.96)",n.onmouseup=()=>n.style.transform="scale(1)",n.onclick=async()=>{if(await _e(o("confirmar_guardar_rascunho")))try{let E=await t();E?(je.save(E),_(),c(),S.playSuccess(),X(o("rascunho_salvo_sucesso"))):(S.playError(),X(o("erro_ler_dados"),{error:!0}))}catch(E){console.error("Erro ao salvar rascunho:",E),S.playError(),X(o("erro_ao_salvar"),{error:!0})}};let i=document.createElement("div");i.className="js-history-btn",i.title=o("meus_rascunhos"),i.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",i.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#9AA0A6"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let r=i.querySelector("svg"),l=document.createElement("div");l.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",i.appendChild(l),i.onmouseenter=()=>i.style.background="rgba(0,0,0,0.05)",i.onmouseleave=()=>i.style.background="transparent",i.onclick=w=>{w.stopPropagation(),p()};function c(){let w=je.getCount();ga(w>0),r.style.color=w>0?j.primary:"#9AA0A6",w>0?(l.style.display="block",l.textContent=w,window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||l.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):l.style.display="none"}let g=document.createElement("div");g.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${j.surface}; z-index: 100;
        border-radius: ${Ne.large} ${Ne.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${he};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;let u=document.createElement("div");u.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",u.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${o("rascunhos_salvos")}</span>`;let v=document.createElement("button");v.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',v.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",v.onmouseenter=()=>v.style.background="#F1F3F4",v.onmouseleave=()=>v.style.background="transparent",v.onclick=()=>p(!1),u.appendChild(v);let d=document.createElement("div");d.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",g.appendChild(u),g.appendChild(d);function p(w){let E=g.style.transform==="translateY(0%)";(w!==void 0?w:!E)?(_(),g.style.transform="translateY(0%)"):g.style.transform="translateY(110%)"}function _(){let w=je.getAll();if(d.innerHTML="",w.length===0){d.innerHTML=`
                <div style="text-align:center; padding:80px 20px; color:${j.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${o("nenhum_rascunho")}</div>
                </div>`;return}w.forEach(E=>{let M=document.createElement("div");M.style.cssText=`
                background: ${j.surface}; padding: 20px; border-radius: ${Ne.large};
                border: 1.5px solid ${j.bgInput}; box-shadow: ${pt.subtle};
                position: relative;
            `;let D=new Date(E.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),h="";E.summaryTags&&E.summaryTags.length>0&&(h=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${E.summaryTags.slice(0,3).join(", ")+(E.summaryTags.length>3?"...":"")}</div>`),M.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${E.clientName||o("cliente_sem_nome")}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${D}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${E.cid||"---"}</span>
                    <span style="display:block; color:${E.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${E.subStatus||E.status||o("sem_status")}</span>
                    ${h}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3);">
                        ${o("retomar_caso")}
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center;" title="${o("descartar")}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let q=M.querySelector(".cw-resume-btn");q.onclick=async()=>{await _e(o("retomar_rascunho_confirm"))&&(a(E),je.delete(E.id),_(),c(),p(!1),S.playSwoosh(),X(o("rascunho_carregado")))};let R=M.querySelector(".cw-del-btn");R.onclick=async()=>{await _e(o("excluir_rascunho_confirm"),{danger:!0})&&(je.delete(E.id),_(),c())},d.appendChild(M)})}return c(),{parkButton:n,historyBtnWrapper:i,drawer:g}}function Zt(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let a=document.createRange();a.selectNodeContents(t);let o=window.getSelection();o.removeAllRanges(),o.addRange(a);try{document.execCommand("copy")}catch{S.playError(),X(le()==="es"?"Error al copiar":"Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(t)}function ba(e){["input","change","keydown","keyup"].forEach(a=>{let o=new Event(a,{bubbles:!0,cancelable:!0});e.dispatchEvent(o)})}function fn(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function fa(){let e=fn(),t=e.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(r=>r.innerText.trim()==="description");if(o){let r=o.closest("material-fab")||o.closest("material-button");r?(r.style&&(r.style.display="block",r.style.visibility="visible"),Pe(r)):Pe(o)}else{let r=document.querySelector("material-fab-speed-dial");if(r){let l=r.querySelector(".trigger");l?(l.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),Pe(l)):r.click(),await ue(800);let g=Array.from(document.querySelectorAll("i.material-icons-extended")).find(u=>u.innerText.trim()==="description");g&&Pe(g)}}let n=null,i=0;for(;!n&&i<20;){await ue(300);let r=fn();if(r.length>t)n=r.find(l=>!e.includes(l)),n||(n=r[r.length-1]);else if(i>10){let l=r.filter(c=>c.offsetParent!==null);l.length>0&&(n=l[l.length-1])}i++}return n}var hn={pt:{back:"Voltar",generateNote:"Gerar Nota",describeIssuePlaceholder:"Descreva o erro, passos para reproduzir...",whatTestedPlaceholder:"O que voc\xEA j\xE1 testou?",fieldsFilledToast:e=>`${e} campos preenchidos!`,noNewDataToast:"Nenhum dado novo encontrado.",readPageErrorToast:"Erro ao ler p\xE1gina.",fillRequiredToast:"Preencha os campos obrigat\xF3rios.",noteGeneratedToast:"Nota gerada e inserida!",copiedOpenNoteToast:"Copiado! Abra uma nota para colar."},es:{back:"Volver",generateNote:"Generar Nota",describeIssuePlaceholder:"Describe el error, pasos para reproducirlo...",whatTestedPlaceholder:"\xBFQu\xE9 ya probaste?",fieldsFilledToast:e=>`\xA1${e} campos completados!`,noNewDataToast:"No se encontraron datos nuevos.",readPageErrorToast:"Error al leer la p\xE1gina.",fillRequiredToast:"Completa los campos obligatorios.",noteGeneratedToast:"\xA1Nota generada e insertada!",copiedOpenNoteToast:"\xA1Copiado! Abre una nota para pegar."}};function lt(e){let t=le();return hn[t]?.[e]??hn.pt[e]}function xn(e){let t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let a=document.createElement("div");a.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let o=document.createElement("div");o.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",t.appendChild(o),t.appendChild(a),a.addEventListener("scroll",()=>{o.style.boxShadow=a.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let n={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},i={};function r({id:h,label:q,type:R="text",placeholder:T="",required:C=!1,autocomplete:I="",parent:k=a}){let F=document.createElement("div");F.style.cssText=n.inputWrapper;let U=document.createElement("label");U.setAttribute("for",h),U.style.cssText=n.label,U.innerHTML=`${q} ${C?'<span style="color:#D93025">*</span>':""}`;let z;return R==="textarea"?(z=document.createElement("textarea"),z.style.cssText=n.input+n.textarea):(z=document.createElement("input"),z.type=R,z.style.cssText=n.input),z.id=h,z.placeholder=T,I&&z.setAttribute("autocomplete",I),z.addEventListener("focus",()=>{z.style.borderColor="#1a73e8",z.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),z.addEventListener("blur",()=>{z.style.borderColor="#DADCE0",z.style.boxShadow="none",C&&z.value.trim()!==""&&(z.style.backgroundColor="#FFF")}),i[h]={input:z,wrapper:F,required:C},F.appendChild(U),F.appendChild(z),R!=="textarea"&&na(z),k.appendChild(F),F}function l({id:h,label:q,options:R=["Yes","No"],defaultValue:T="No",onChange:C=null}){let I=document.createElement("div");I.style.cssText=n.inputWrapper;let k=document.createElement("label");k.style.cssText=n.label,k.textContent=q,I.appendChild(k);let F=document.createElement("div");F.style.cssText=n.radioGroup;let U=document.createElement("input");return U.type="hidden",U.id=h,U.value=T,I.appendChild(U),R.forEach(z=>{let K=document.createElement("div");K.textContent=z,K.style.cssText=n.radioLabel,z===T&&(K.style.cssText+=n.radioActive),K.onclick=()=>{Array.from(F.children).forEach(W=>W.style.cssText=n.radioLabel),K.style.cssText+=n.radioActive,U.value=z,C&&C(z)},F.appendChild(K)}),i[h]={input:U,wrapper:I,required:!1},I.appendChild(F),a.appendChild(I),I}let c=document.createElement("div");c.style.cssText=n.banner,c.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,a.appendChild(c);let g=document.createElement("div");g.style.marginBottom="24px";let u=document.createElement("button");u.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",u.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",u.onmouseover=()=>u.style.background="#E1EFFF",u.onmouseout=()=>u.style.background="#F0F7FF",g.appendChild(u),a.appendChild(g);let v=document.createElement("div");v.style.cssText=n.section,v.innerHTML=`<div style="${n.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,a.appendChild(v),r({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:v}),r({id:"ga4",label:"GA4 Property ID",parent:v}),r({id:"gtm",label:"GTM Container ID",parent:v});let d=document.createElement("div");d.style.cssText=n.hiddenField,v.appendChild(d),l({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:h=>{h==="Yes"?d.style.cssText=n.visibleField+"margin-bottom:14px;":(d.style.cssText=n.hiddenField,i.accessEmail.input.value="")}}),r({id:"accessEmail",label:"User Access Email",parent:d}),l({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let p=document.createElement("div");p.style.cssText=n.section,p.innerHTML=`<div style="${n.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,a.appendChild(p),r({id:"name",label:"Advertiser Name",required:!0,autocomplete:"name",parent:p}),r({id:"url",label:"Website URL",type:"url",autocomplete:"url",parent:p}),r({id:"phone",label:"Phone Number",type:"tel",autocomplete:"tel",parent:p}),r({id:"email",label:"Contact Email",type:"email",autocomplete:"email",parent:p}),r({id:"callback",label:"Preferred Callback Time (Timezone)",parent:p}),r({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:lt("describeIssuePlaceholder"),required:!0,parent:p}),r({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:lt("whatTestedPlaceholder"),parent:p}),r({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:p});let _=document.createElement("div");_.style.cssText=n.section,_.innerHTML=`<div style="${n.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,a.appendChild(_),r({id:"cc_adv",label:"Advertiser Contact",parent:_}),r({id:"cc_am",label:"Account Manager",parent:_});let w=document.createElement("div");w.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let E=document.createElement("button");E.innerHTML=lt("back"),E.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",E.onclick=e;let M=document.createElement("button");M.textContent=lt("generateNote"),M.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",w.appendChild(E),w.appendChild(M),t.appendChild(w),u.onclick=async()=>{let h=u.innerHTML;u.innerHTML="\u23F3 Buscando dados...";try{let q=await Je(),R=0,T=(k,F)=>{let U=i[k];F&&U&&U.input.value===""&&(U.input.value=F,U.input.style.backgroundColor="#E6F4EA",U.input.style.borderColor="#34A853",setTimeout(()=>{U.input.style.backgroundColor="#FFF",U.input.style.borderColor="#DADCE0"},1e3),R++)};T("name",q.advertiserName),T("url",q.websiteUrl),q.clientEmail&&(T("email",q.clientEmail),T("cc_adv",q.clientEmail));let I=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);I&&T("cid",I[0]),R>0?X(lt("fieldsFilledToast")(R)):X(lt("noNewDataToast"))}catch(q){console.error(q),X(lt("readPageErrorToast"))}finally{u.innerHTML=h}};let A=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,D=()=>{let h=!0,q=null,R=A();return Object.values(i).forEach(T=>{T.required&&!T.input.value.trim()&&(h=!1,T.input.style.cssText+=n.inputError,R||T.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),q||(q=T.input))}),q&&q.scrollIntoView({behavior:R?"auto":"smooth",block:"center"}),h};return M.onclick=async()=>{if(!D()){S.playError(),X(lt("fillRequiredToast"),{error:!0});return}let h=k=>i[k].input.value||"N/A",q=h("hasAccess"),R=q==="Yes"?h("accessEmail"):"N/A",C=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${h("cid")}
<b>GA4 ID:</b> ${h("ga4")}
<b>GTM ID:</b> ${h("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${q==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${R}
<b>Ghosting Access Available (Y/N):</b> ${h("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${h("name")}
<b>Website:</b> ${h("url")}
<b>Phone Number:</b> ${h("phone")}
<b>Preferred Callback:</b> ${h("callback")}
<b>Email Address:</b> ${h("email")}

<b>Detailed Issue Description:</b>
${h("desc")}

<b>Uncropped screenshots:</b>
${h("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${h("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${h("cc_adv")}
<b>Account Manager:</b> ${h("cc_am")}
`.replace(/\n/g,"<br>");Zt(C);let I=await fa();I?(I.innerText.trim()===""&&(I.innerHTML=""),document.execCommand("insertHTML",!1,C),ba(I),S.playSuccess(),X(lt("noteGeneratedToast"))):X(lt("copiedOpenNoteToast"))},t}var yn="cw_user_prefs_v1",Ya="cw_user_prefs_pending_v1",Va=!1,Qt=null;function _t(){try{let e=localStorage.getItem(yn),t=e?JSON.parse(e):null;return t&&typeof t=="object"?t:{}}catch{return{}}}function vn(e){try{localStorage.setItem(yn,JSON.stringify(e))}catch(t){console.warn("N\xE3o consegui gravar as prefer\xEAncias localmente:",t)}}function Wa(e){try{e?localStorage.setItem(Ya,"1"):localStorage.removeItem(Ya)}catch{}}function wr(){try{return localStorage.getItem(Ya)==="1"}catch{return!1}}var ct={get(e,t=null){let a=_t();return e in a?a[e]:t},async set(e,t){let a=_t();a[e]=t,vn(a);let o=Le();if(!o)return Wa(!0),{saved:!0,synced:!1};Va=!0;let n=!1;try{n=await me.saveUserPrefs(a,o)}catch(i){console.warn("Falha ao salvar prefer\xEAncias na nuvem:",i)}finally{Wa(!n),setTimeout(()=>{Va=!1},2e3)}return{saved:!0,synced:n}},sync(){return Qt||(Qt=(async()=>{let e=Le();if(!e)return _t();try{if(wr()){let a=_t(),o=await me.saveUserPrefs(a,e);return Wa(!o),a}let t=await me.getUserPrefs(e);if(t&&typeof t=="object"&&!Va){let a=_t();JSON.stringify(t)!==JSON.stringify(a)&&vn(t)}}catch(t){console.warn("Prefer\xEAncias indispon\xEDveis; seguindo com o cache local.",t)}finally{Qt=null}return _t()})(),Qt)}};var ea="shortcuts",wn="shortcutsSortByUsage",En="cw_shortcut_usage_v1",ut=8,Sr=[{id:"sc_default_ni_attempted",kind:"note",label:"NI Attempted \u2014 In\xEDcio 2 Day Rule",alias:"2day inicio",payload:{caseType:"bau",status:"NI",subStatus:"NI_Attempted_Contact",scenarios:[{id:"quickfill-ni-attempted-2day",substatus:"NI_Attempted_Contact"}]}},{id:"sc_default_in_not_reachable",kind:"note",label:"IN Not Reachable \u2014 Finaliza\xE7\xE3o 2 Day Rule",alias:"2day fim",payload:{caseType:"bau",status:"IN",subStatus:"IN_Not_Reachable",scenarios:[{id:"quickfill-in-no-show-bau",substatus:"IN_Not_Reachable"}]}}];function ta(){return"sc_"+Date.now().toString(36)+Math.floor(Math.random()*1e3).toString(36)}function Ka(e){if(!e||!e.id)return null;if(st[e.id])return e.id;let t=Wt(e.id,e.substatus),a=Object.entries(st),o=a.find(([i,r])=>Wt(i,e.substatus)===t&&Array.isArray(r.substatus)&&r.substatus.includes(e.substatus));if(o)return o[0];let n=a.find(([i])=>Wt(i,e.substatus)===t);return n?n[0]:null}function Cn(e){return(e.payload&&e.payload.scenarios||[]).filter(a=>!Ka(a)).map(a=>a.id)}function Sn(){try{return JSON.parse(localStorage.getItem(En)||"{}")}catch{return{}}}function Xa(e){return Array.isArray(e)?e.filter(t=>t&&t.id&&t.payload&&t.payload.subStatus).map((t,a)=>({id:t.id,kind:t.kind||"note",label:String(t.label||"Atalho"),alias:String(t.alias||""),order:Number.isFinite(t.order)?t.order:a,payload:{caseType:t.payload.caseType||"bau",status:t.payload.status||String(t.payload.subStatus).split("_")[0],subStatus:t.payload.subStatus,scenarios:Array.isArray(t.payload.scenarios)?t.payload.scenarios.filter(o=>o&&o.id).map(o=>({id:o.id,substatus:o.substatus||t.payload.subStatus})):[]}})):[]}var qe={list(){let e=ct.get(ea,null),t=Xa(e===null?qe.defaults():e),a=Sn();return t.slice().sort((o,n)=>{if(qe.isSortedByUsage()){let i=(a[n.id]||0)-(a[o.id]||0);if(i)return i}return o.order-n.order})},listRaw(){let e=ct.get(ea,null);return Xa(e===null?qe.defaults():e).sort((t,a)=>t.order-a.order)},defaults(){return Sr.map((e,t)=>({...e,order:t}))},isSortedByUsage(){return ct.get(wn,!0)!==!1},setSortedByUsage(e){return ct.set(wn,!!e)},async save(e){let t=qe.listRaw(),a=t.findIndex(i=>i.id===e.id);if(a===-1&&t.length>=ut)return{ok:!1,reason:"limit"};let o=Xa([{...e,id:e.id||ta()}])[0];return o?(a===-1?(o.order=t.length,t.push(o)):(o.order=t[a].order,t[a]=o),{ok:!0,synced:(await ct.set(ea,t)).synced,shortcut:o}):{ok:!1,reason:"invalid"}},async remove(e){let t=qe.listRaw().filter(a=>a.id!==e).map((a,o)=>({...a,order:o}));await ct.set(ea,t)},async reorder(e,t){let a=qe.listRaw(),o=a.findIndex(r=>r.id===e);if(o===-1)return;let[n]=a.splice(o,1),i=Math.max(0,Math.min(t,a.length));a.splice(i,0,n),await ct.set(ea,a.map((r,l)=>({...r,order:l})))},registerUse(e){try{let t=Sn();t[e]=(t[e]||0)+1,localStorage.setItem(En,JSON.stringify(t))}catch{}}};var An={pt:{emailButtonNotFound:"Erro: Bot\xE3o de email n\xE3o encontrado.",clearingOldDraft:"Limpando rascunho antigo...",editorNotLoaded:"Erro: Editor n\xE3o carregou.",cannedResponseApplied:"Canned Response aplicada!",cannedResponseTimeout:e=>`Timeout: Template '${e}' n\xE3o carregou.`,cannedResponseButtonNotFound:"Bot\xE3o Canned Response n\xE3o encontrado.",emailFilledSuccess:"Email preenchido com sucesso!",editorFocusError:"Erro ao focar no editor.",fallbackClient:"Cliente",fallbackSite:"seu site"},es:{emailButtonNotFound:"Error: Bot\xF3n de email no encontrado.",clearingOldDraft:"Limpiando borrador antiguo...",editorNotLoaded:"Error: El editor no carg\xF3.",cannedResponseApplied:"\xA1Canned Response aplicada!",cannedResponseTimeout:e=>`Tiempo agotado: la plantilla '${e}' no carg\xF3.`,cannedResponseButtonNotFound:"Bot\xF3n Canned Response no encontrado.",emailFilledSuccess:"\xA1Email completado con \xE9xito!",editorFocusError:"Error al enfocar el editor.",fallbackClient:"Cliente",fallbackSite:"su sitio"}};function tt(e){let t=le();return An[t]?.[e]??An.pt[e]}function Fe(e,t="info"){let a={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${e}`,a[t]||a.info)}function ha(e,t){if(!e)return;let a=`cw-warning-${e.id||Math.random().toString(36).substr(2,9)}`,o=document.getElementById(a);o&&o.remove();let n=e.getBoundingClientRect(),i=document.createElement("div");i.id=a,i.style.cssText=`
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
        z-index: ${Me.TOAST};
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
    `;let r=i.querySelector(".cw-close-btn");r.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&r.click()},25e3)}async function xa(e,t){if(!e||!t)return;e.focus(),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await ue(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),await ue(100),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function Za(){let t=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(a=>{let o=a.offsetParent!==null,n=a.closest("case-message-view")!==null,i=a.closest(".editor")!==null||a.closest("write-card")!==null;return o&&!n&&i});return t&&Fe("Editor visualmente detectado.","success"),t}var Ja=e=>!!e&&e.getClientRects().length>0&&e.getAttribute("aria-disabled")!=="true";async function Er(e,{timeout:t=3e3,intervalo:a=100}={}){let o=Date.now()+t;for(;Date.now()<o;){let n=e();if(n)return n;await ue(a)}return null}function kn(){let e=Array.from(document.querySelectorAll('material-button.compose, material-button.speed-dial-mini-fab[role="menuitem"]')),t=e.find(a=>a.classList.contains("compose")&&Ja(a));return t||e.find(a=>{let o=a.querySelector("i.material-icons-extended");return Ja(a)&&o&&o.textContent.trim()==="email"})||null}async function Cr(){try{let e=kn();if(e)Fe("Menu do speed dial j\xE1 estava aberto.");else{let t=document.querySelector("#action-bar-speed-dial-container material-button")||document.querySelector("material-button.action-bar-speed-dial-button");if(!Ja(t))return Fe("Speed dial (+ Open) n\xE3o encontrado.","warn"),!1;Fe("Speed dial (+ Open) encontrado. Abrindo o menu..."),Pe(t),await ue(350),e=await Er(kn,{timeout:3e3})}return e?(await ue(120),Pe(e),Fe("Compose clicado via speed dial.","success"),!0):(Fe("Menu abriu, mas o bot\xE3o Compose n\xE3o apareceu.","warn"),!1)}catch(e){return Fe(`Falha no speed dial: ${e.message}`,"error"),!1}}function Ar(){let t=Array.from(document.querySelectorAll("i.material-icons-extended")).find(o=>o.innerText.trim()==="email"&&o.offsetParent!==null);if(!t)return!1;Fe("Bot\xE3o de email direto encontrado.");let a=t.closest("material-button")||t.closest("material-fab")||t;return Pe(a),!0}async function Tn(){Fe("\u{1F680} FASE 1: Tentando abrir a janela de email...");let e=await Cr();if(e||(Fe("Speed dial indispon\xEDvel. Tentando o bot\xE3o de email direto...","warn"),e=Ar()),!e)return S.playError(),X(tt("emailButtonNotFound"),{error:!0}),!1;Fe("\u{1F680} FASE 2: Verificando rascunhos...");let t=null,a=0,o=20;for(;a<o;){await ue(250);let g=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(t=Array.from(g).find(u=>u.offsetParent!==null),t){Fe("\u26A0\uFE0F Rascunho detectado!","warn");break}a++}if(t){Fe("\u{1F5D1}\uFE0F Descartando..."),Pe(t),t.click();let g=null,u=0;for(;u<15;){await ue(300);let v=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(g=Array.from(v).find(d=>d.offsetParent!==null),g)break;u++}g&&(Pe(g),X(tt("clearingOldDraft"),{duration:2e3}),await ue(2500))}Fe("\u{1F680} FASE 3: Buscando editor final...");let n=0,i=null;for(;n<20&&(i=Za(),!i);)await ue(250),n++;if(!i)return S.playError(),X(tt("editorNotLoaded"),{error:!0}),!1;let r=i.closest('[id="email-body-content-top"]'),c=(i.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(r){if(c){let u=c.closest('[aria-hidden="true"]');u&&u.removeAttribute("aria-hidden"),c.focus(),Pe(c)}await ue(300),r.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let g=r.querySelector("#cases-body-field");if(g){let u=document.createRange();u.selectNodeContents(g),u.collapse(!0);let v=window.getSelection();v.removeAllRanges(),v.addRange(u)}return!0}return!1}async function va(e){if(!e||!await Tn())return;let a=await Je();Fe("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let o=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(o&&(o.click(),await ue(600)),a.clientEmail&&a.clientEmail!=="N/A"&&a.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await xa(i,a.clientEmail),ha(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(a.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await xa(i,a.internalEmail),ha(i,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await ue(500);let n=document.querySelector('material-button[debug-id="canned_response_button"]');if(n){Pe(n),await ue(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){Pe(i),document.execCommand("insertText",!1,e),i.dispatchEvent(new Event("input",{bubbles:!0})),Fe("\u23F3 Buscando resultado da Canned Response...","info");let r=null,l=0,c=15e3,g=500;for(;l<c&&(r=document.querySelector("material-select-dropdown-item"),!r);)await ue(g),l+=g;if(r){Pe(r),await ue(1500);let u=Za();if(u){let d=Array.from(u.querySelectorAll("span.field")).filter(_=>_.innerText.includes("{Requested Task Type}"));if(d.length>0){let _=d.map(E=>E.closest("tr")).filter(E=>E!==null),w=[...new Set(_)];if(w.length>0){let M=w[0].querySelector('td[width="100%"]');M&&(M.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let A=1;A<w.length;A++)w[A].remove()}}let p=u.innerHTML;a.advertiserName&&p.includes("{%ADVERTISER_NAME%}")&&(p=p.replace(/{%ADVERTISER_NAME%}/g,a.advertiserName)),p.includes("{%^79285%}")&&(p=p.replace(/{%\^79285%}/g,a.websiteUrl||tt("fallbackSite"))),u.innerHTML=p}X(tt("cannedResponseApplied"))}else Fe(`\u274C Timeout: Resultado '${e}' n\xE3o apareceu ap\xF3s 15s.`,"error"),S.playError(),X(tt("cannedResponseTimeout")(e),{error:!0})}}else S.playError(),X(tt("cannedResponseButtonNotFound"),{error:!0})}async function qn(e){if(Fe(`\u{1F680} Iniciando Quick Email: ${e.name}`),!await Tn())return;let a=await Je(),o=Gt();await ue(600);let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await ue(600)),a.clientEmail&&a.clientEmail!=="N/A"&&a.clientEmail!=="N/A (Bloqueado)"){let l=document.querySelector('input[aria-label="Enter To email address"]');l&&(await xa(l,a.clientEmail),ha(l,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(a.internalEmail){let l=document.querySelector('input[aria-label="Enter Bcc email address"]');l&&(await xa(l,a.internalEmail),ha(l,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let i=document.querySelector('input[aria-label="Subject"]');i&&e.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,e.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await ue(300));let r=Za();if(r){let c=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');c&&(c.focus(),Pe(c));let g=new Date;g.setDate(g.getDate()+3);let u=g.getDay();u===6?g.setDate(g.getDate()+2):u===0&&g.setDate(g.getDate()+1);let v=g.toLocaleDateString("pt-BR"),d=e.body;d=d.replace(/\[Nome do Cliente\]/g,a.advertiserName||tt("fallbackClient")),d=d.replace(/\[INSERIR URL\]/g,a.websiteUrl||tt("fallbackSite")),d=d.replace(/\[URL\]/g,a.websiteUrl||tt("fallbackSite")),d=d.replace(/\[Seu Nome\]/g,o),d=d.replace(/\[MM\/DD\/YYYY\]/g,v),document.execCommand("insertHTML",!1,d),c&&(c.dispatchEvent(new Event("input",{bubbles:!0})),c.dispatchEvent(new Event("change",{bubbles:!0}))),X(tt("emailFilledSuccess"),{duration:2e3}),Fe("\u2705 Processo finalizado com sucesso.","success")}else S.playError(),X(tt("editorFocusError"),{error:!0})}var Qa=460,eo=280,kr=200,to=.06;if(!document.getElementById("cw-module-styles")){let e=document.createElement("style");e.id="cw-module-styles",e.innerHTML=`
        /* M\xD3DULO BASE */
        .cw-module-window {
            /* Degrau de repouso da janela. Precisa estar AQUI, e n\xE3o s\xF3
               no estilo inline de stylePopup(): o fim do fechamento faz
               popup.style.zIndex = '', o que apaga o inline e deixaria a
               janela em z-index:auto na pr\xF3xima abertura. */
            z-index: ${Me.MODULE_RESTING};
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
            transform: scale(${to});

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
    `,document.head.appendChild(e)}window._cwEscapeListenerActive||(window._cwEscapeListenerActive=!0,document.addEventListener("keydown",e=>{if(e.key!=="Escape"||document.querySelector(".cw-dialog-overlay"))return;let t=document.querySelector(".cw-module-window.open");if(!t)return;let a=t.querySelector(".cw-header-close");a&&a.click()}));function On(){return!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)}function Ln(e){let t=document.querySelector(".cw-pill"),a=e?document.getElementById(e):null,o=!!(t&&t.classList.contains("collapsed")),n=i=>{if(!i)return null;let r=i.getBoundingClientRect();return!r.width||!r.height?null:{x:r.left+r.width/2,y:r.top+r.height/2}};if(!o){let i=n(a);if(i)return i}return n(t)}function Nn(e,t){let a=e.style.transition,o=e.style.transform;e.style.transition="none",e.style.transform="none";let n=e.getBoundingClientRect();return e.style.transform=o,e.offsetWidth,e.style.transition=a,{left:t?n.left:n.left-n.width/2,top:t?n.top:n.top-n.height/2,width:n.width,height:n.height}}function In(e,t,a){if(!t){e.style.transformOrigin="50% 50%",e._cwOrigin=null;return}let o=`${Math.round(t.x-a.left)}px ${Math.round(t.y-a.top)}px`;e.style.transformOrigin=o,e._cwOrigin=o}function _n(e){return e?`translate(0, 0) scale(${to})`:`translate(-50%, -50%) scale(${to})`}function Tr(e){return e?"translate(0, 0) scale(1)":"translate(-50%, -50%) scale(1)"}function Fn(e){!e||On()||(e.classList.remove("cw-absorbing"),e.offsetWidth,e.classList.add("cw-absorbing"),setTimeout(()=>e.classList.remove("cw-absorbing"),400))}function He(e){return e?typeof e._cwOpen=="boolean"?e._cwOpen:e.classList.contains("open"):!1}function De(e,t,a){let o=a?document.getElementById(a):null;if(!t)return;t._cwOpen=!!e;let n=(t._cwAnimToken||0)+1;t._cwAnimToken=n;let i=()=>t._cwAnimToken!==n;t._cwTeardown&&(t._cwTeardown(),t._cwTeardown=null);let r=On(),l=t.getAttribute("data-moved")==="true";if(e){S.playGenieOpen();let c=Nn(t,l);In(t,Ln(a),c),t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",t.style.transform=_n(l),t.style.willChange="transform, opacity",t.classList.add("cw-animating"),t.offsetWidth,requestAnimationFrame(()=>{i()||(t.classList.add("open"),t.classList.remove("idle"),o&&o.classList.add("active"),Fn(o),t.style.transition=r?"opacity 0.15s ease":`opacity ${Math.round(Qa*.6)}ms ease-out, transform ${Qa}ms var(--cw-ease-decelerate), filter 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease`,t.style.opacity="1",t.style.transform=Tr(l),Mn(t,n,r?150:Qa,()=>{t.style.willChange="auto",t.classList.remove("cw-animating"),t._cwSettled=!0}))}),t._cwSettled=!1,qr(t,a)}else{if(S.playSwoosh(),t._cwSettled||!t._cwOrigin){let c=Nn(t,l);In(t,Ln(a),c)}if(t.style.transition=r?"opacity 0.15s ease":`opacity ${Math.round(eo*.8)}ms ease, transform ${eo}ms var(--cw-ease-accelerate)`,t.style.pointerEvents="none",t.style.willChange="transform, opacity",t.classList.add("cw-animating"),o&&t.contains(document.activeElement))try{o.focus({preventScroll:!0})}catch{o.focus()}requestAnimationFrame(()=>{i()||(t.style.opacity="0",t.style.transform=_n(l),Mn(t,n,r?150:eo,()=>{t.classList.remove("open"),t.classList.remove("idle"),t.style.zIndex="",o&&o.classList.remove("active"),Fn(o),t.style.willChange="auto",t.classList.remove("cw-animating"),t.style.transition=""}))}),Dn(t)}}function Mn(e,t,a,o){let n=!1,i=()=>{e.removeEventListener("transitionend",l),clearTimeout(c),e._cwTeardown===i&&(e._cwTeardown=null)},r=()=>{n||(n=!0,i(),e._cwAnimToken===t&&o())},l=g=>{g.target===e&&g.propertyName==="transform"&&r()};e.addEventListener("transitionend",l);let c=setTimeout(r,a+kr);e._cwTeardown=i}function qr(e,t){Dn(e);let a=o=>{if(!e.classList.contains("open"))return;let n=e.contains(o.target),i=document.querySelector(".cw-pill"),r=i&&i.contains(o.target);n?(e.classList.remove("idle"),e.style.zIndex=String(Me.MODULE_FOCUSED)):r||(e.classList.add("idle"),e.style.zIndex=String(Me.MODULE_RESTING))};e._idleHandler=a,document.addEventListener("mousedown",a)}function Dn(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var zn='<svg viewBox="0 0 24 24" fill="currentColor" style="width:13px;height:13px;flex-shrink:0;"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>';function Rn(){let e="v4.0.0",{popup:t,content:a,header:o,animRefs:n,credit:i}=Uo(e,F),r=rn(m),l=nn(()=>{J(),V.setActiveTasks(l.getCheckedElements())},m,V),c=document.createElement("div");c.style.display="none";let g=on((x,O)=>{G(x,O)});c.appendChild(g);let u=document.createElement("button");u.type="button",u.className="cw-save-shortcut-btn",u.style.cssText=`
        margin-top: 10px; padding: 7px 12px; border-radius: 8px;
        border: 1px dashed ${j.border}; background: transparent;
        color: ${j.textSub}; font-family: inherit; font-size: 11.5px;
        font-weight: 600; cursor: pointer; display: inline-flex; align-items: center;
        gap: 6px; transition: all 0.2s ${he};
    `,u.onmouseenter=()=>{u.style.borderColor=j.primary,u.style.color=j.primary,S.playHover()},u.onmouseleave=()=>{u.style.borderColor=j.border,u.style.color=j.textSub},u.onclick=()=>f(),u.innerHTML=`${zn}<span>${m("salvar_como_atalho")}</span>`,c.appendChild(u);let v=document.createElement("div");v.id="evidence-container",Object.assign(v.style,{display:"none",marginTop:"16px",padding:"16px",background:j.bgInput,border:`1px solid ${j.border}`,borderRadius:Ne.medium,boxShadow:pt.subtle});let d=document.createElement("div");d.className="cw-section-title",d.textContent=m("evidencias_contato"),v.appendChild(d);let p={},_=(x,O)=>{let H=document.createElement("div");H.style.marginBottom="12px";let ee=document.createElement("label");ee.textContent=O,ee.setAttribute("for",x),ee.style.cssText=`display: block; font-size: 11px; font-weight: 700; color: ${j.textSub}; margin-bottom: 6px; text-transform: uppercase;`;let oe=document.createElement("input");return oe.type="text",oe.id=x,oe.className="cw-input",oe.placeholder="https://screenshot.googleplex.com/...",oe.style.marginBottom="0",H.appendChild(ee),H.appendChild(oe),na(oe,{minLength:8}),p[x]=oe,H};v.appendChild(_("evidence-l1",m("ligacao_1"))),v.appendChild(_("evidence-l2",m("ligacao_2"))),v.appendChild(_("evidence-msg",m("mensagem_am")));let w=bn({onSaveCurrent:async()=>{let x=await ae();return Y(),x},onLoadDraft:x=>{y(x)},t:x=>m(x)}),E=z(),M=K(),A=document.createElement("div"),D=Q(),h=te(w,m);a.appendChild(E),a.appendChild(M),a.appendChild(D),a.appendChild(c),a.appendChild(A),a.appendChild(v),l.selectionElement.style.display="none",l.screenshotsElement.style.display="none";let q=document.createElement("button");q.id="manual-task-toggle",q.textContent=m("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",q.style.cssText=`display: none; width: 100%; padding: 14px; border: 2px dashed ${j.primary}; background: ${j.surface}; color: ${j.primary}; border-radius: ${Ne.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${he}; text-transform: uppercase; letter-spacing: 0.5px;`,q.onmouseenter=()=>{q.style.background=j.primaryBg},q.onmouseleave=()=>{q.style.background=j.surface},q.onclick=()=>{l.selectionElement.style.display="block",l.screenshotsElement.style.display="block",q.style.display="none"},a.appendChild(q),a.appendChild(l.selectionElement),a.appendChild(r.element),a.appendChild(l.screenshotsElement),a.appendChild(h);let R=document.createElement("div");R.style.display="none",R.style.flexGrow="1",R.style.minHeight="0",R.style.overflow="hidden";let T=xn(()=>U());T.style.height="100%",R.appendChild(T),t.insertBefore(R,i);let C=o.lastElementChild;C&&(C.insertBefore(w.historyBtnWrapper,C.firstChild),C.insertBefore(P(),C.firstChild)),t.appendChild(w.drawer);let I=null;V.subscribe(x=>{de(x),k(),x.isDirty?(I&&clearTimeout(I),I=setTimeout(async()=>{let O=await ae(!0);O.subStatus?je.saveEmergency(O):je.clearEmergency(),x.isDirty=!1},2e3)):I&&(clearTimeout(I),I=null)});function k(){let x=je.getCount()>0,O=!!V.currentSubStatus;ga(x||O)}function F(){V.visible=!V.visible,V.visible?ke():Te(),De(V.visible,t,"cw-btn-notes")}function U(){V.isSplitView=!V.isSplitView,V.isSplitView?(a.style.display="none",R.style.display="flex",R.style.flexDirection="column",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(a.style.display="flex",R.style.display="none",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function z(){let x=document.createElement("div");if(x.innerHTML=`
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
        `,!document.getElementById("cw-segmented-styles")){let H=document.createElement("style");H.id="cw-segmented-styles",H.innerHTML=`
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
                    transition: all 0.3s ${he};
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
            `,document.head.appendChild(H)}let O=(H,ee)=>{let ce=x.querySelector(`#${H}`).querySelector(".cw-segmented-indicator");ce&&(ce.style.transform=`translateX(${ee*100}%) translateX(${ee*2}px)`)};return x.querySelectorAll("#type-selector button").forEach((H,ee)=>{H.onclick=()=>{V.setCaseType(H.dataset.type),x.querySelectorAll("#type-selector button").forEach(oe=>oe.classList.remove("active")),H.classList.add("active"),O("type-selector",ee),S.playClick(),V.currentSubStatus&&B(V.currentSubStatus)}}),x.querySelectorAll("#portugal-selector button").forEach((H,ee)=>{H.onclick=()=>{V.setPortugalCase(H.dataset.val==="true"),x.querySelectorAll("#portugal-selector button").forEach(oe=>oe.classList.remove("active")),H.classList.add("active"),O("portugal-selector",ee),S.playClick(),V.currentSubStatus&&B(V.currentSubStatus)}}),x}function K(){let x=document.createElement("div");x.className="cw-status-section",x.style.cssText="display: flex; flex-direction: column; gap: 8px;",x.innerHTML=`
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
        `;let O=x.querySelector("#main-status-select"),H=x.querySelector("#sub-status-select");return O.onchange=()=>{V.setStatus(O.value),W(O.value,H),V.setSubStatus(""),B("")},H.onchange=()=>{V.setSubStatus(H.value),B(H.value)},x}function re(){return v.style.display==="none"?null:{l1:p["evidence-l1"]?.value.trim()||"",l2:p["evidence-l2"]?.value.trim()||"",msg:p["evidence-msg"]?.value.trim()||""}}function W(x,O){if(O.innerHTML=`<option value="">${m("select_substatus")}</option>`,!x){O.disabled=!0;return}let H=x==="IN"?(()=>{let ee=document.createElement("optgroup");return ee.label="Fora de Escopo",ee})():null;for(let ee in Ie)if(Ie[ee].status===x){let oe=document.createElement("option");oe.value=ee,oe.textContent=Ie[ee].name,H&&ee.startsWith("IN_Out_of_Scope")?H.appendChild(oe):O.appendChild(oe)}H&&H.children.length>0&&O.appendChild(H),O.disabled=!1}function B(x){let O=Ie[x],H=x==="NI_Attempted_Contact"||O&&O.name&&O.name.toLowerCase().includes("attempted contact");if(g.render&&g.render(x,V.currentCaseType),!x){v.style.display="none",p["evidence-l1"]&&(p["evidence-l1"].value=""),p["evidence-l2"]&&(p["evidence-l2"].value=""),p["evidence-msg"]&&(p["evidence-msg"].value=""),c.style.display="none",A.style.display="none";let Ce=document.getElementById("manual-task-toggle");Ce&&(Ce.style.display="none"),l.selectionElement.style.display="none",l.screenshotsElement.style.display="none",D.style.display="flex",D.style.opacity="1",h.style.display="none";return}if(H?v.style.display="block":(v.style.display="none",p["evidence-l1"]&&(p["evidence-l1"].value=""),p["evidence-l2"]&&(p["evidence-l2"].value=""),p["evidence-msg"]&&(p["evidence-msg"].value="")),D.style.opacity="0",setTimeout(()=>{V.currentSubStatus&&(D.style.display="none")},400),h.style.display="grid",O&&O.templateFields){let Ce=Yo(O);V.setActiveFields(O.templateFields.filter(Ve=>!Ce.includes(Ve)))}ie(),Kt(x,A,V),A.style.display="block",c.style.display="block";let ee=x.startsWith("SO_"),oe=x==="NI_Awaiting_Validation",ce=document.getElementById("manual-task-toggle");ee||oe?(l.selectionElement.style.display="block",ce.style.display="none"):(l.selectionElement.style.display="none",l.screenshotsElement.style.display="none",ce.style.display="block");let se=x==="SO_Education_Only"?"education":"implementation";V.setScreenshotMode(se),l.updateSubStatus(x),J();let we=document.getElementById("email-automation-toggle-row");we&&(we.style.display=Lt[x]?"flex":"none")}function J(){let x=l.getCheckedElements().map(O=>O.value);r.updateVisibility(V.currentSubStatus,x)}function G(x,O){let H=la(st[x],V.currentLang,x);if(H){for(let ee in H)if(ee==="linkedTask")l.toggleTask(H.linkedTask,O);else if(ee==="activeTasks")H.activeTasks.forEach(oe=>{O?l.setTaskCount(oe.value,oe.count):l.setTaskCount(oe.value,0)});else if(ee.startsWith("field-")){let oe=ee,ce=H[ee],se=document.getElementById(oe);if(se){let we=Nt.includes(oe.replace("field-",""));if(O)if(we){let Ce=se.value.trim();Ce.includes(ce.trim())||(se.value=Ce?Ce+`
`+ce.trim():ce.trim())}else se.value=ce;else if(we){let Ce=se.value.trim(),Ve=ce.trim();Ce.includes(Ve)&&(se.value=Ce.replace(Ve,"").trim().replace(/\n{3,}/g,`

`))}else se.value.trim()===ce.trim()&&(se.value="");V.updateField(oe,se.value),se.dispatchEvent(new Event("input"))}}}}function te(x,O){let H=document.createElement("div");if(H.className="cw-actions-section",H.style.cssText=`
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 10px;
            margin-top: 16px;
            background: ${j.bgInput};
            border-radius: 12px;
            border: 1px solid ${j.border};
        `,!document.getElementById("cw-actions-hover-styles")){let Ce=document.createElement("style");Ce.id="cw-actions-hover-styles",Ce.innerHTML=`
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
            `,document.head.appendChild(Ce)}let ee=document.createElement("div");ee.id="email-automation-toggle-row",ee.style.cssText="grid-column: 1 / -1; display: none; align-items: center; justify-content: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2px;",ee.innerHTML=`
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 10.5px; font-weight: 600; color: ${j.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 13px; height: 13px; accent-color: ${j.primary};">
                <span class="js-label-email-toggle">${O("preencher_email_automaticamente")}</span>
            </label>
        `;let oe=x.parkButton;oe.classList.add("js-btn-park"),oe.style.cssText="width: 100%; margin: 0; border-radius: 10px; height: 34px; font-weight: 600; font-size: 11.5px;";let ce=document.createElement("button");ce.className="cw-btn-secondary js-btn-reset",ce.textContent=O("limpar"),ce.style.cssText=`width: 100%; height: 34px; background: ${j.surface}; color: ${j.textSub}; border: 1px solid ${j.border}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,ce.onclick=()=>Y();let se=document.createElement("button");se.className="cw-btn-secondary js-btn-copy",se.textContent=O("copiar"),se.style.cssText=`width: 100%; height: 34px; background: ${j.surface}; color: ${j.primary}; border: 1px solid ${j.primary}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,se.onclick=()=>Z();let we=document.createElement("button");return we.className="cw-btn-primary js-btn-generate",we.textContent=O("preencher"),we.style.cssText=`width: 100%; height: 38px; background: ${j.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; grid-column: 1 / -1; font-size: 12.5px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 0px;`,we.onclick=()=>ne(),H.appendChild(ee),H.appendChild(oe),H.appendChild(ce),H.appendChild(se),H.appendChild(we),H}async function Z(){if(!V.currentSubStatus){S.playError(),X(m("select_substatus"),{error:!0});return}let x=Ba(V,l,r,re());x?(Zt(x),X(m("copiado_sucesso")),S.playClick()):(S.playError(),X(m("select_substatus"),{error:!0}))}async function ne(){if(!V.currentSubStatus){S.playError(),X(m("select_substatus"),{error:!0});return}let x=Ie[V.currentSubStatus],O=Yt(x).filter(ce=>{if(!V.activeFields.includes(ce))return!1;let se=V.formData[`field-${ce}`];return!se||!se.trim()});if(O.length>0){S.playError(),X(`Preencha o campo obrigat\xF3rio antes de gerar: ${m(O[0].toLowerCase())}`,{error:!0});return}if(x?.requiresTasks&&l.getCheckedElements().length===0){S.playError(),X("Selecione ao menos uma tarefa antes de gerar a nota.",{error:!0});return}let H=Ba(V,l,r,re());Zt(H),F();let ee=Jt(),oe=await fa();if(oe){oe.focus(),document.execCommand("insertHTML",!1,H),ba(oe);let ce=document.getElementById("email-automation-checkbox");(!ce||ce.checked)&&V.currentSubStatus&&Lt[V.currentSubStatus]&&await va(Lt[V.currentSubStatus]),X(m("inserido_copiado")),S.playSuccess(),mn(),Y()}else S.playError(),X("N\xE3o foi poss\xEDvel abrir a nota no CRM. O conte\xFAdo j\xE1 est\xE1 copiado \u2014 cole manualmente.",{error:!0}),F();ee()}function ie(){if(V.currentSubStatus){if(V.currentCaseType==="lm")V.removeField("ON_CALL");else{let x=Ie[V.currentSubStatus];x&&x.templateFields.includes("ON_CALL")&&V.addFieldAt("ON_CALL",1)}V.isPortugalCase?(V.addFieldAt("CASO_PORTUGAL",1),V.addFieldAt("CONSENTIU_GRAVACAO",2)):(V.removeField("CASO_PORTUGAL"),V.removeField("CONSENTIU_GRAVACAO"))}}function Y(){V.reset(),l.reset(),r.reset(),k(),je.clearEmergency(),a.querySelectorAll("select").forEach(O=>O.value=""),a.querySelector("#sub-status-select").disabled=!0;let x=document.getElementById("email-automation-toggle-row");x&&(x.style.display="none"),A.innerHTML="",c.style.display="none",D.style.display="flex",D.style.opacity="1",h.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),l.selectionElement.style.display="none",l.screenshotsElement.style.display="none",v.style.display="none",p["evidence-l1"]&&(p["evidence-l1"].value=""),p["evidence-l2"]&&(p["evidence-l2"].value=""),p["evidence-msg"]&&(p["evidence-msg"].value="")}async function ae(x=!1){let O={};A.querySelectorAll("input, textarea, select").forEach(se=>{(se.id.startsWith("field-")||se.id==="consent-select")&&(O[se.id]=se.value)});let H="Cliente",ee="---";if(!x)try{let se=await Je();H=se.advertiserName,ee=se.cid}catch(se){console.warn("Erro ao coletar pageData:",se)}let oe=l.getCheckedElements().map(se=>({key:se.value,count:se.count})),ce=oe.map(se=>{let we=et[se.key];return we?we.name:se.key});return{currentCaseType:V.currentCaseType,currentLang:V.currentLang,isPortugalCase:V.isPortugalCase,consent:V.consent,tagSupportUsed:V.tagSupportUsed,forcedScreenshots:[...V.forcedScreenshots],activeFields:V.activeFields,status:V.currentStatus,subStatus:V.currentSubStatus,formData:O,activeTasks:oe,summaryTags:ce,clientName:H,cid:ee,timestamp:new Date().toISOString()}}let s=x=>new Promise(O=>setTimeout(O,x));async function y(x){V.setCaseType(x.currentCaseType||"bau"),V.setPortugalCase(x.isPortugalCase||!1),V.setConsent(x.consent||!1),x.activeFields&&V.setActiveFields(x.activeFields);let O=a.querySelector(`#type-selector button[data-type="${V.currentCaseType}"]`);O&&O.classList.add("active"),a.querySelectorAll("#type-selector button").forEach(ee=>{ee!==O&&ee.classList.remove("active")});let H=a.querySelector(`#portugal-selector button[data-val="${V.isPortugalCase}"]`);if(H&&H.classList.add("active"),a.querySelectorAll("#portugal-selector button").forEach(ee=>{ee!==H&&ee.classList.remove("active")}),x.status){let ee=a.querySelector("#main-status-select");ee.value=x.status,V.setStatus(x.status);let oe=a.querySelector("#sub-status-select");if(W(x.status,oe),await s(50),x.subStatus){if(oe.value=x.subStatus,V.setSubStatus(x.subStatus),B(x.subStatus),await s(100),x.tagSupportUsed!==void 0){V.setTagSupportUsed(x.tagSupportUsed);let ce=r.element.querySelector('input[value="Sim"]'),se=r.element.querySelector('input[value="N\xE3o"]');x.tagSupportUsed&&ce?ce.checked=!0:se&&(se.checked=!0),r.element.querySelector("div:last-child").style.display=x.tagSupportUsed?"none":"block"}x.forcedScreenshots&&V.setForcedScreenshots(x.forcedScreenshots);for(let ce in x.formData){let se=document.getElementById(ce);se&&(se.value=x.formData[ce],V.updateField(ce,se.value))}x.activeTasks&&(x.activeTasks.forEach(ce=>l.setTaskCount(ce.key,ce.count)),V.setActiveTasks(l.getCheckedElements()))}}V.isDirty=!1}async function L(x){let O=x&&x.payload;if(!O||!O.subStatus)return{ok:!1,reason:"invalid"};let H=O.scenarios||[],ee=H.map(We=>Ka(We)),oe=H.filter((We,vt)=>!ee[vt]);if(V.isDirty&&!await _e(m("substituir_rascunho_confirm")))return{ok:!1,reason:"cancelled"};let ce=V.visible;if(ce||F(),Y(),ce||await s(550),O.caseType&&O.caseType!==V.currentCaseType){let We=a.querySelector(`#type-selector button[data-type="${O.caseType}"]`);We&&We.click(),await s(60)}let se=a.querySelector("#main-status-select"),we=a.querySelector("#sub-status-select"),Ce=O.status||String(O.subStatus).split("_")[0];se.value=Ce,V.setStatus(Ce),W(Ce,we),await s(60),we.value=O.subStatus,V.setSubStatus(O.subStatus),B(O.subStatus),await s(160);for(let We of ee.filter(Boolean)){let vt=c.querySelector(`[data-id="${We}"]`);vt&&vt.click()}await s(120),oe.length?(S.playError(),X(m("atalho_cenario_sumiu"),{error:!0})):S.playSuccess();let Ve=b();return Ve&&Ao(Ve),{ok:!0,missing:oe.map(We=>We.id)}}function b(){let x=a.querySelectorAll('input[id^="field-"], textarea[id^="field-"], input[id^="evidence-"]');for(let O of x)if(O.offsetParent!==null&&!String(O.value||"").trim())return O;return null}async function f(){let x=N();if(!x){S.playError(),X(m("select_substatus"),{error:!0});return}if(qe.listRaw().length>=ut){S.playError(),X(m("atalho_limite").replace("{max}",ut),{error:!0});return}let O=Ie[x.payload.subStatus]?.name||x.payload.subStatus,H=await sa(m("atalho_nome_pergunta"),O);if(H!==null){u.disabled=!0,u.style.opacity="0.6";try{let ee=await qe.save({...x,id:ta(),label:String(H).trim()||O});if(!ee.ok){S.playError(),X(m("atalho_limite").replace("{max}",ut),{error:!0});return}S.playSuccess(),X(ee.synced?m("atalho_salvo"):m("atalho_salvo_local"))}finally{u.disabled=!1,u.style.opacity=""}}}function N(){if(!V.currentSubStatus)return null;let x=g.getSelectedIds?g.getSelectedIds():[];return{kind:"note",payload:{caseType:V.currentCaseType,status:V.currentStatus,subStatus:V.currentSubStatus,scenarios:x.map(O=>({id:O,substatus:V.currentSubStatus}))}}}function m(x){return Ue[V.currentLang]?.[x]||Ue.pt?.[x]||x}function P(){let x=document.createElement("div");return x.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',x.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",x.onclick=O=>{O.stopPropagation(),U()},x.title="Alternar para Split & Transfer",x}function Q(){let x=document.createElement("div");return x.id="notes-empty-state",x.style.cssText=`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${he};
        `,x.innerHTML=`
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
                    ${m("pronto_comecar")||"Pronto para come\xE7ar?"}
                </div>
                <div style="font-size: 13px; color: ${j.textSub}; line-height: 1.6; opacity: 0.8;">
                    ${m("selecione_status_ajuda")||"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica."}
                </div>
            </div>
        `,x}function de(x){let O=a.querySelector(".js-label-fluxo");O&&(O.textContent=m("fluxo"));let H=a.querySelector(".js-label-portugal");H&&(H.textContent=m("caso_portugal"));let ee=a.querySelectorAll("#portugal-selector button");ee.length===2&&(ee[0].textContent=m("nao"),ee[1].textContent=m("sim"));let oe=a.querySelector(".js-label-status");oe&&(oe.textContent=m("status_principal"));let ce=a.querySelector(".js-label-substatus");ce&&(ce.textContent=m("substatus"));let se=a.querySelector(".js-btn-copy");se&&(se.textContent=m("copiar"));let we=a.querySelector(".js-btn-generate");we&&(we.textContent=m("preencher"));let Ce=a.querySelector(".js-btn-reset");Ce&&(Ce.textContent=m("limpar"));let Ve=document.getElementById("manual-task-toggle");Ve&&(Ve.textContent=m("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let We=a.querySelector(".js-btn-park span");We&&(We.textContent=m("guardar")),d.textContent=m("evidencias_contato");let vt=v.querySelector('label[for="evidence-l1"]');vt&&(vt.textContent=m("ligacao_1"));let co=v.querySelector('label[for="evidence-l2"]');co&&(co.textContent=m("ligacao_2"));let po=v.querySelector('label[for="evidence-msg"]');po&&(po.textContent=m("mensagem_am"));let uo=t.querySelector(".js-drawer-title");uo&&(uo.textContent=m("rascunhos_salvos"));let mo=t.querySelector(".js-history-btn");mo&&(mo.title=m("meus_rascunhos"));let go=a.querySelector(".js-label-email-toggle");go&&(go.textContent=m("preencher_email_automaticamente")),u.innerHTML=`${zn}<span>${m("salvar_como_atalho")}</span>`,r&&r.setLanguage&&r.setLanguage(m),l&&l.setLanguage&&l.setLanguage(m)}return D.style.display="flex",h.style.display="none",V.setLanguage(le()),V.setCaseType("bau"),Se(x=>{V.setLanguage(x);let O=t.querySelector(".cw-help-description");O&&(O.textContent=Vt[x]||Vt.pt),V.currentSubStatus&&B(V.currentSubStatus)}),k(),setTimeout(async()=>{let x=je.getEmergency();x&&(await _e(m("restaurar_rascunho_confirm"))?(y(x),X("Sess\xE3o restaurada!")):je.clearEmergency())},3e3),document.body.appendChild(t),en().then(x=>{x&&V.currentSubStatus&&(g.render&&g.render(V.currentSubStatus,V.currentCaseType),Kt(V.currentSubStatus,A,V))}),F.openWithPreset=L,F}var wa=[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",category:"Tentativas & Agendamento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",placeholders:[{key:"[Seu Nome]",label:"Seu Nome",type:"text",auto:"agentName"},{key:"[INSERIR URL]",label:"URL do Site",type:"text"},{key:"[LINK DO MEET]",label:"Link da Reuni\xE3o",type:"text"}],template:"<p>Ol\xE1,</p><br><p>Aqui \xE9 o <strong>[Seu Nome]</strong> da equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tentei ligar no seguinte n\xFAmero: <strong>...</strong> sem sucesso, teria outro n\xFAmero para que eu pudesse entrar em contato?</p><br><p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>Em seu site: <strong>[INSERIR URL]</strong></p><p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, voc\xEA pode acessar o link da nossa reuni\xE3o: <strong>[LINK DO MEET]</strong></p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"reschedule2",name:"Proposta de Reagendamento",category:"Tentativas & Agendamento",subject:"Reagendamento de Consultoria",placeholders:[{key:"[DATA 1]",label:"Data 1",type:"text"},{key:"[HORA 1]",label:"Hora 1",type:"text"},{key:"[DATA 2]",label:"Data 2",type:"text"},{key:"[HORA 2]",label:"Hora 2",type:"text"},{key:"[DATA 3]",label:"Data 3",type:"text"},{key:"[HORA 3]",label:"Hora 3",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p><ul><li><strong>[DATA 1] \xE0s [HORA 1]</strong></li><li><strong>[DATA 2] \xE0s [HORA 2]</strong></li><li><strong>[DATA 3] \xE0s [HORA 3]</strong></li></ul><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email nas pr\xF3ximas 48 horas o caso ser\xE1 encerrado.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"max_reschedules",name:"Limite de Reagendamentos Excedido",category:"Tentativas & Agendamento",subject:"Status do Agendamento - Time de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este e-mail o encontre bem.</p><p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementa\xE7\xE3o das tags.</p><br><p>Infelizmente, <strong>n\xE3o podemos mais reagendar este caso espec\xEDfico</strong>, pois excedemos o limite m\xE1ximo de agendamentos permitido.</p><br><p>Se voc\xEA deseja prosseguir com a implementa\xE7\xE3o das tags, ser\xE1 necess\xE1rio abrir um <strong>novo caso</strong> diretamente com a <a href="https://support.google.com/google-ads">Ajuda do Google Ads</a>. Isso garantir\xE1 que voc\xEA receba o acompanhamento e o suporte necess\xE1rio para dar continuidade \xE0 sua solicita\xE7\xE3o.</p><br><p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colabora\xE7\xE3o.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"2_6_day3",name:"Dia 3 (Acompanhamento)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]",label:"A\xE7\xE3o Pendente",type:"text"},{key:"[MM/DD/YYYY]",label:"Data do Pr\xF3ximo Contato",type:"date"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Tentamos contato atrav\xE9s do N\xFAmero de Telefone, por\xE9m sem sucesso. Gostaria de saber se voc\xEA j\xE1 conseguiu <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, ou se voc\xEA j\xE1 possui uma previs\xE3o de quando essa a\xE7\xE3o ser\xE1 conclu\xEDda.</p><br><p>Continuarei monitorando o status da implementa\xE7\xE3o no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementa\xE7\xE3o.</p><p>Se voc\xEA tiver algum problema ou d\xFAvidas que impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_day6",name:"Dia 6 (Acompanhamento Final)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[URL]",label:"URL do Site",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Ap\xF3s an\xE1lise e revis\xE3o do status de implementa\xE7\xE3o da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda est\xE1 com a implementa\xE7\xE3o pendente. Tentamos contato atrav\xE9s do email, por\xE9m sem sucesso.</p><br><p>\xC9 essencial que seja implementado, pois ele oferece uma ampla gama de benef\xEDcios, como:</p><ul><li>Ajuda a rastrear convers\xF5es em tempo real</li><li>Melhora a gera\xE7\xE3o de receita, em termos de cliques</li><li>Serve para vincular o Google Analytics e os an\xFAncios e acompanhar convers\xF5es</li><li>Fornece informa\xE7\xF5es sobre a experi\xEAncia do usu\xE1rio</li></ul><br><p>Se voc\xEA tiver algum problema ou d\xFAvidas que o impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco. Teremos o maior prazer em ajudar.</p><p>Caso n\xE3o tenhamos nenhuma resposta nos pr\xF3ximos 3 dias, infelizmente o caso ser\xE1 encerrado.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_completed_reschedule",name:"A\xE7\xF5es Conclu\xEDdas (Solicitar Reagendamento)",category:"Follow Up",subject:"Continuidade da Implementa\xE7\xE3o - Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Disponibilidade em BAU]",label:"Pr\xF3xima Disponibilidade",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Maravilha! Muito bom saber que conseguiu concluir as a\xE7\xF5es pendentes. Sendo assim, agora podemos continuar com a implementa\xE7\xE3o das configura\xE7\xF5es em sua conta.</p><br><p>Para isso, pe\xE7o, por favor, que me envie algumas das pr\xF3ximas datas e hor\xE1rios em que est\xE1 dispon\xEDvel a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p><p>Assim que me enviar essa informa\xE7\xE3o, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"nrp_standard",name:"NRP - Padr\xE3o (3\xAA Tentativa)",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Task pedida pelo AM]",label:"Task Solicitada",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reuni\xE3o.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"nrp_dfa",name:"NRP - DFA",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'}],ya={attempt_10min:{name:"Intento de Contacto (Antes de los 10min)",category:"Intentos y Programaci\xF3n",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Intento de Contacto",labels:{"[Seu Nome]":"Tu Nombre","[INSERIR URL]":"URL del Sitio","[LINK DO MEET]":"Enlace de la Reuni\xF3n"},template:"<p>Hola,</p><br><p>Le habla <strong>[Seu Nome]</strong> del equipo de Soluciones T\xE9cnicas de Google. Intent\xE9 llamar al siguiente n\xFAmero: <strong>...</strong> sin \xE9xito, \xBFtendr\xEDa otro n\xFAmero para que pueda ponerme en contacto?</p><br><p>Le recuerdo que voy a ayudarle a implementar la siguiente tarea:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>En su sitio: <strong>[INSERIR URL]</strong></p><p>Intentar\xE9 llamar nuevamente en 10 minutos; si lo prefiere, puede acceder al enlace de nuestra reuni\xF3n: <strong>[LINK DO MEET]</strong></p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},reschedule2:{name:"Propuesta de Reprogramaci\xF3n",category:"Intentos y Programaci\xF3n",subject:"Reprogramaci\xF3n de Consultor\xEDa",labels:{"[DATA 1]":"Fecha 1","[HORA 1]":"Hora 1","[DATA 2]":"Fecha 2","[HORA 2]":"Hora 2","[DATA 3]":"Fecha 3","[HORA 3]":"Hora 3","[Seu Nome]":"Firma"},template:"<p>Hola, \xBFc\xF3mo est\xE1?</p><br><p>Estas son las pr\xF3ximas fechas disponibles:</p><ul><li><strong>[DATA 1] a las [HORA 1]</strong></li><li><strong>[DATA 2] a las [HORA 2]</strong></li><li><strong>[DATA 3] a las [HORA 3]</strong></li></ul><br><p>Tambi\xE9n le informo que si no hay respuesta a este correo en las pr\xF3ximas 48 horas el caso ser\xE1 cerrado.</p><p>Le recuerdo que mi agenda es din\xE1mica, por lo que en cualquier momento se puede agendar una consultor\xEDa para los d\xEDas disponibles. Por lo tanto, cuanto m\xE1s r\xE1pido pueda responderme, m\xE1s garantizada ser\xE1 la programaci\xF3n de la fecha y el horario.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},max_reschedules:{name:"L\xEDmite de Reprogramaciones Excedido",category:"Intentos y Programaci\xF3n",subject:"Estado de la Programaci\xF3n - Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este correo le encuentre bien.</p><p>Le escribo en nombre del equipo de Google Ads para informarle sobre su solicitud de reprogramaci\xF3n para la implementaci\xF3n de las etiquetas.</p><br><p>Lamentablemente, <strong>ya no podemos reprogramar este caso espec\xEDfico</strong>, pues hemos excedido el l\xEDmite m\xE1ximo de programaciones permitido.</p><br><p>Si desea continuar con la implementaci\xF3n de las etiquetas, ser\xE1 necesario abrir un <strong>nuevo caso</strong> directamente con la <a href="https://support.google.com/google-ads">Ayuda de Google Ads</a>. Esto garantizar\xE1 que reciba el seguimiento y el soporte necesarios para dar continuidad a su solicitud.</p><br><p>Agradecemos su participaci\xF3n en este proceso y la oportunidad de ayudar. Esperamos continuar nuestra colaboraci\xF3n.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'},"2_6_day3":{name:"D\xEDa 3 (Seguimiento)",category:"Follow Up",subject:"Consultor\xEDa con el Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]":"Acci\xF3n Pendiente","[MM/DD/YYYY]":"Fecha del Pr\xF3ximo Contacto","[Seu Nome]":"Firma"},template:"<p>Hola, <strong>[Nome do Cliente]</strong></p><br><p>\xA1Espero que se encuentre bien!</p><p>Intentamos contactarle por tel\xE9fono, pero sin \xE9xito. Me gustar\xEDa saber si ya pudo <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, o si ya tiene una previsi\xF3n de cu\xE1ndo se concluir\xE1 esa acci\xF3n.</p><br><p>Continuar\xE9 monitoreando el estado de la implementaci\xF3n en su sitio, y el d\xEDa <strong>[MM/DD/YYYY]</strong> har\xE9 un nuevo seguimiento para verificar el avance de la implementaci\xF3n.</p><p>Si tiene alg\xFAn problema o duda que le impida realizar la implementaci\xF3n, no dude en compartirlo con nosotros.</p><br><p>Quedo a disposici\xF3n.</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>"},"2_6_day6":{name:"D\xEDa 6 (Seguimiento Final)",category:"Follow Up",subject:"Consultor\xEDa con el Equipo de Soluciones T\xE9cnicas de Google",labels:{"[Nome do Cliente]":"Nombre del Cliente","[URL]":"URL del Sitio","[Seu Nome]":"Firma"},template:"<p>Hola, <strong>[Nome do Cliente]</strong></p><br><p>\xA1Espero que se encuentre bien!</p><p>Tras analizar y revisar el estado de implementaci\xF3n de la etiqueta en su sitio, <strong>[URL]</strong>, verificamos que la etiqueta a\xFAn est\xE1 pendiente de implementaci\xF3n. Intentamos contactarle por correo, pero sin \xE9xito.</p><br><p>Es esencial que sea implementada, pues ofrece una amplia gama de beneficios, como:</p><ul><li>Ayuda a rastrear conversiones en tiempo real</li><li>Mejora la generaci\xF3n de ingresos, en t\xE9rminos de clics</li><li>Sirve para vincular Google Analytics con los anuncios y hacer seguimiento de las conversiones</li><li>Proporciona informaci\xF3n sobre la experiencia del usuario</li></ul><br><p>Si tiene alg\xFAn problema o duda que le impida realizar la implementaci\xF3n, no dude en compartirlo con nosotros. Estaremos encantados de ayudar.</p><p>Si no recibimos ninguna respuesta en los pr\xF3ximos 3 d\xEDas, lamentablemente el caso ser\xE1 cerrado.</p><br><p>Quedo a disposici\xF3n.</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>"},"2_6_completed_reschedule":{name:"Acciones Concluidas (Solicitar Reprogramaci\xF3n)",category:"Follow Up",subject:"Continuidad de la Implementaci\xF3n - Soluciones T\xE9cnicas de Google",labels:{"[Disponibilidade em BAU]":"Pr\xF3xima Disponibilidad","[Seu Nome]":"Firma"},template:"<p>Hola, \xBFc\xF3mo est\xE1?</p><br><p>\xA1Excelente! Muy bueno saber que logr\xF3 concluir las acciones pendientes. Siendo as\xED, ahora podemos continuar con la implementaci\xF3n de las configuraciones en su cuenta.</p><br><p>Para eso, le pido, por favor, que me env\xEDe algunas de las pr\xF3ximas fechas y horarios en los que est\xE9 disponible a partir del d\xEDa <strong>[Disponibilidade em BAU]</strong>.</p><p>En cuanto me env\xEDe esa informaci\xF3n, crear\xE9 una reprogramaci\xF3n para que uno de nuestros agentes contin\xFAe ayud\xE1ndole.</p><br><p>Tambi\xE9n le informo que si no hay respuesta a este correo, realizar\xE9 un seguimiento de este caso durante 6 d\xEDas, en el que me pondr\xE9 en contacto cada 3 d\xEDas para intentar reprogramar su caso lo antes posible.</p><p>Le recuerdo que mi agenda es din\xE1mica, por lo que en cualquier momento se puede agendar una consultor\xEDa para los d\xEDas disponibles. Por lo tanto, cuanto m\xE1s r\xE1pido pueda responderme, m\xE1s garantizada ser\xE1 la programaci\xF3n de la fecha y el horario.</p><br><p>Atentamente,</p><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google.</p>"},nrp_standard:{name:"NRP - Est\xE1ndar (3.\xBA Intento)",category:"NRP / Cierre",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Cierre",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Task pedida pelo AM]":"Tarea Solicitada","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Intentamos llamarle hoy sobre el caso de Implementaci\xF3n de la etiqueta referente a la solicitud de <strong>[Task pedida pelo AM]</strong>. Se hizo otro intento despu\xE9s de 10 minutos, pero tampoco logramos contactarle.</p><p>Debido a la alta demanda, no podemos reprogramar un horario. Por eso, vamos a cerrar este caso. Sin embargo, si a\xFAn desea continuar con la implementaci\xF3n, basta con acceder a este enlace y elegir la mejor fecha y horario para hablar con nuestro equipo, o si lo prefiere, p\xF3ngase en contacto con su gerente de cuentas de Google para agendar una nueva reuni\xF3n.</p><p>Lamentamos el inconveniente y esperamos trabajar con usted nuevamente en el futuro.</p><br><p>Si desea saber m\xE1s, consulte a continuaci\xF3n algunos enlaces \xFAtiles con recursos valiosos relacionados con la implementaci\xF3n de etiquetas y el soporte de Shopping.</p><p><strong>En relaci\xF3n con las etiquetas</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Soporte para la implementaci\xF3n de etiquetas</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>En relaci\xF3n con Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">C\xF3mo configurar la cuenta y el feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Optimizaci\xF3n del feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'},nrp_dfa:{name:"NRP - DFA",category:"NRP / Cierre",subject:"Implementaci\xF3n con el Equipo de Soluciones T\xE9cnicas de Google - Cierre",labels:{"[Nome do Cliente]":"Nombre del Cliente","[Seu Nome]":"Firma"},template:'<p>Hola, <strong>[Nome do Cliente]</strong>,</p><br><p>Intentamos llamarle hoy sobre el caso de Implementaci\xF3n de la etiqueta referente a la solicitud. Se hizo otro intento despu\xE9s de 10 minutos, pero tampoco logramos contactarle.</p><p>Debido a la alta demanda, no podemos reprogramar un horario. Por eso, vamos a cerrar este caso. Sin embargo, si a\xFAn desea continuar con la implementaci\xF3n, basta con acceder a este enlace y elegir la mejor fecha y horario para hablar con nuestro equipo.</p><p>Lamentamos el inconveniente y esperamos trabajar con usted nuevamente en el futuro.</p><br><p>Si desea saber m\xE1s, consulte a continuaci\xF3n algunos enlaces \xFAtiles con recursos valiosos relacionados con la implementaci\xF3n de etiquetas y el soporte de Shopping.</p><p><strong>En relaci\xF3n con las etiquetas</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Soporte para la implementaci\xF3n de etiquetas</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>En relaci\xF3n con Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">C\xF3mo configurar la cuenta y el feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Optimizaci\xF3n del feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Equipo de Soluciones T\xE9cnicas Cognizant, en nombre de Google</p>'}};function Bn(e,t){if(t!=="es")return e;let a=ya[e?.id];return a?{...e,name:a.name??e.name,category:a.category??e.category,subject:a.subject??e.subject,template:a.template??e.template,placeholders:(e.placeholders||[]).map(o=>({...o,label:a.labels?.[o.key]??o.label}))}:e}function $n(e){if(!Array.isArray(e)||!e.length)return!1;let t=e.slice().sort((n,i)=>(n.sortOrder||0)-(i.sortOrder||0)),a=[],o={};for(let n of t){let i=n.key;if(!i)continue;let r;try{r=JSON.parse(n.value||"{}")}catch{continue}!r.subject||!r.template||(String(n.lang).toUpperCase()==="ES"?o[i]={name:n.label||"",category:n.field||"",subject:r.subject,template:r.template,labels:r.labels||{}}:a.push({id:i,name:n.label||i,category:n.field||"",subject:r.subject,template:r.template,placeholders:r.placeholders||[]}))}if(!a.length)return!1;wa.length=0,wa.push(...a);for(let n of Object.keys(ya))delete ya[n];return Object.assign(ya,o),!0}async function Pn(){let e=me.getCachedContent("email_template"),t=$n(e);try{let a=await me.fetchContentModule("email_template");t=$n(a)||t}catch(a){console.warn("Central de Conte\xFAdo indispon\xEDvel; usando modelos embutidos.",a)}return t}var Gn={_templates:null,_hydrated:!1,async getTemplates(){return this._templates?this._templates:(this._hydrated||(this._hydrated=!0,await Pn()),this._templates=wa,this._templates)}};var jn="cw_personal_library_v1",Ft=!1,Re={getSnippets:(e="all")=>{let t=Re._loadFromLocal(),a=Le();return a&&a.includes("@")&&!Ft&&Re._syncWithServer(a),e==="all"?t:t.filter(o=>o.type===e)},save:async e=>{let t=Le();if(!t)return S.playError(),X("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;Ft=!0;let a=Re._loadFromLocal(),o=new Date().toISOString(),n={id:e.id||"local_"+Date.now(),type:e.type||"general",title:e.title||"Sem t\xEDtulo",content:e.content||"",subject:e.subject||"",isCode:e.isCode||!1,isRich:e.isRich||!1,updated:o,_pendingSync:!0},i=a.filter(c=>c.id!==n.id);i.unshift(n),Re._saveToLocal(i);let r=!1;try{r=await me.saveSnippet(n,t),r?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais.")}catch(c){console.error("Erro na nuvem:",c)}finally{setTimeout(()=>{Ft=!1},2e3)}n._pendingSync=!r;let l=Re._loadFromLocal().filter(c=>c.id!==n.id);return l.unshift(n),Re._saveToLocal(l),{...n,synced:r}},delete:async e=>{let t=Le();Ft=!0;let o=Re._loadFromLocal().filter(n=>n.id!==e);return Re._saveToLocal(o),t?me.deleteSnippet(e,t).then(()=>{setTimeout(()=>{Ft=!1},2e3)}):Ft=!1,!0},_syncWithServer:async e=>{if(window._cw_library_syncing)return;window._cw_library_syncing=!0,setTimeout(()=>{window._cw_library_syncing=!1},3e4),console.log("\u{1F504} Sincronizando biblioteca...");let t=await me.getUserSnippets(e);if(t&&t.status==="success"&&Array.isArray(t.snippets)){let a=t.snippets,o=Re._loadFromLocal(),i=[...o.filter(c=>c._pendingSync),...a],r=JSON.stringify(i),l=JSON.stringify(o);r!==l&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),Re._saveToLocal(i))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(jn)||"[]")}catch{return[]}},_saveToLocal:e=>{localStorage.setItem(jn,JSON.stringify(e))}};var Hn={pt:{headerTitle:"Email Assistant",headerDesc:"Refatora\xE7\xE3o completa do m\xF3dulo de e-mail para uma experi\xEAncia moderna e eficiente.",searchPlaceholder:"Buscar templates...",previewTitle:"Preview do E-mail",noSubject:"Sem Assunto",emailCopiedToast:"E-mail copiado com sucesso!",copyErrorToast:"Erro ao copiar e-mail",fillErrorToast:"Erro ao preencher e-mail",smartCrErrorToast:"Erro ao aplicar Smart CR"},es:{headerTitle:"Email Assistant",headerDesc:"Refactorizaci\xF3n completa del m\xF3dulo de email para una experiencia moderna y eficiente.",searchPlaceholder:"Buscar plantillas...",previewTitle:"Vista Previa del Email",noSubject:"Sin Asunto",emailCopiedToast:"\xA1Email copiado con \xE9xito!",copyErrorToast:"Error al copiar el email",fillErrorToast:"Error al completar el email",smartCrErrorToast:"Error al aplicar Smart CR"}};function Ye(e){let t=le();return Hn[t]?.[e]??Hn.pt[e]}var ve={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",warning:"#E67E22",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"};function Lr(){if(document.getElementById("cw-email-styles"))return;let e=document.createElement("style");e.id="cw-email-styles",e.textContent=`
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
        .cw-email-main { display: flex; flex: 1; overflow: hidden; background-color: ${ve.bgApp}; }

        /* --- PAINEL ESQUERDO --- */
        .cw-email-left-panel { width: 320px; background-color: #EFEFF0; border-right: 1px solid ${ve.borderSubtle}; display: flex; flex-direction: column; flex-shrink: 0; }
        .cw-email-search-container { padding: 16px; border-bottom: 1px solid ${ve.borderSubtle}; position: relative; }
        .cw-email-search-input {
            width: 100%; box-sizing: border-box; padding: 10px 14px 10px 36px;
            border-radius: 10px; border: 1.5px solid transparent; background-color: #E3E3E8;
            font-size: 15px; outline: none; color: ${ve.textPrimary};
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238A8A8E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
            background-repeat: no-repeat; background-position: 12px center;
            transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
        }
        .cw-email-search-input:focus {
            background-color: #FFFFFF; border-color: ${ve.primary};
            box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1); transform: scale(1.02);
        }
        .cw-email-clear-btn {
            position: absolute; right: 26px; top: 50%; transform: translateY(-50%);
            font-size: 10px; color: #fff; cursor: pointer; display: none;
            background-color: #C7C7CC; width: 16px; height: 16px; border-radius: 50%;
            text-align: center; line-height: 16px; font-weight: bold;
        }

        #email-template-list { flex: 1; overflow-y: auto; padding: 8px; scroll-behavior: smooth; }

        .cw-email-list-empty { padding: 40px 20px; text-align: center; color: ${ve.textSecondary}; opacity: 0.6; }
        .cw-email-list-empty-icon { font-size: 32px; margin-bottom: 12px; }
        .cw-email-list-empty-text { font-size: 14px; font-weight: 500; }

        .cw-email-cat-header {
            padding: 12px 16px 12px 24px; font-size: 11px; font-weight: 700; color: ${ve.textSecondary};
            text-transform: uppercase; letter-spacing: 0.8px; position: sticky; top: -8px;
            background-color: rgba(239, 239, 240, 0.9); z-index: 10; backdrop-filter: blur(20px);
            margin: 0 -8px 8px -8px; border-bottom: 0.5px solid ${ve.borderSubtle};
            cursor: pointer; display: flex; align-items: center; justify-content: space-between;
            user-select: none; transition: background-color 0.2s ease;
        }
        .cw-email-cat-header:hover { background-color: rgba(230, 230, 232, 0.9); }
        .cw-email-cat-header:focus-visible, .cw-email-list-item:focus-visible { outline: 2px solid ${ve.primary}; outline-offset: -2px; }
        .cw-email-cat-right { display: flex; align-items: center; }
        .cw-email-cat-badge { background-color: rgba(0, 0, 0, 0.05); padding: 2px 8px; border-radius: 10px; font-size: 10px; color: ${ve.textSecondary}; }
        .cw-email-cat-arrow { margin-left: 8px; transition: transform 0.3s ease; }

        .cw-email-list-item {
            padding: 12px 14px; font-size: 14px; cursor: pointer;
            transition: background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1), transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s cubic-bezier(0.25, 1, 0.5, 1), color 0.3s cubic-bezier(0.25, 1, 0.5, 1); border-radius: 10px;
            color: ${ve.textPrimary}; margin: 4px 6px; display: flex; align-items: center; gap: 12px;
            background-color: ${ve.bgSurface}; box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            border: 1px solid ${ve.borderSubtle}; position: relative; overflow: hidden;
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
            background-color: ${ve.primary}; box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
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
        .cw-email-right-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; background-color: ${ve.bgApp}; transition: opacity 0.15s ease, transform 0.15s ease; }
        .cw-email-fields-section { padding: 20px; border-bottom: 1px solid ${ve.borderSubtle}; background-color: ${ve.bgSurface}; max-height: 250px; overflow-y: auto; display: none; }
        .cw-email-fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .cw-email-field-label { display: block; font-size: 11px; font-weight: 700; color: ${ve.textSecondary}; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-email-field-input {
            width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px;
            border: 1.5px solid ${ve.borderSubtle}; background-color: #FBFBFD; font-size: 14px;
            transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease; outline: none;
        }
        .cw-email-field-input:focus { border-color: ${ve.primary}; background-color: #FFFFFF; box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1); }

        .cw-email-smartcr-hint {
            padding: 12px; font-size: 13px; color: #856404; background: #FFF3CD; border: 1px solid #FFEEBA;
            border-radius: 8px; display: flex; align-items: center; gap: 8px;
        }
        .cw-email-smartcr-hint-icon { font-size: 18px; }

        .cw-email-preview-section { flex: 1; display: flex; flex-direction: column; padding: 20px; background-color: ${ve.bgApp}; overflow: hidden; }
        .cw-email-preview-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .cw-email-preview-title { font-size: 12px; font-weight: 600; color: ${ve.textSecondary}; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-email-preview-actions { display: flex; gap: 8px; }
        .cw-email-preview-content {
            flex: 1; background-color: ${ve.bgSurface}; border: 1px solid ${ve.borderSubtle};
            border-radius: 8px; padding: 20px; font-size: 15px; line-height: 1.6; color: ${ve.textPrimary};
            overflow-y: auto; outline: none; box-shadow: inset 0 1px 2px rgba(0,0,0,0.02);
        }

        /* --- BOT\xD5ES DE A\xC7\xC3O --- */
        .cw-email-btn {
            padding: 8px 14px; border-radius: 10px; border: 1.5px solid ${ve.primary};
            background: transparent; color: ${ve.primary}; font-size: 13px; font-weight: 600;
            cursor: pointer; transition: background-color 0.2s cubic-bezier(0.25, 1, 0.5, 1), transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .cw-email-btn:hover { background-color: rgba(0, 122, 255, 0.05); }
        .cw-email-btn:active { transform: scale(0.94); }
        .cw-email-btn.primary {
            border: none; background: ${ve.primary}; color: #fff;
            box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }
        .cw-email-btn.primary:hover { background-color: #0062CC; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0, 122, 255, 0.4); }
        .cw-email-btn.warning { border-color: ${ve.warning}; color: ${ve.warning}; display: none; }
        .cw-email-btn.warning:hover { background-color: rgba(230, 126, 34, 0.08); }

        @media (prefers-reduced-motion: reduce) {
            .cw-animate-float { animation: none !important; }
            .cw-email-search-input, .cw-email-list-item, .cw-email-btn, .cw-email-right-panel {
                transition: opacity 0.15s ease, background-color 0.15s ease !important;
                transform: none !important;
            }
        }
    `,document.head.appendChild(e)}function Nr(e,t){return e.map(a=>Bn(a,le())).filter(a=>a.name.toLowerCase().includes(t.toLowerCase())||a.category.toLowerCase().includes(t.toLowerCase()))}function Ir(e){return Object.entries(Lt).filter(([t,a])=>a&&(t.toLowerCase().includes(e.toLowerCase())||a.toLowerCase().includes(e.toLowerCase()))).map(([t,a])=>({id:t,name:t.replace(/_/g," "),category:"\u26A1 Smart CRs",code:a,isSmartCR:!0}))}function _r(e){return Re.getSnippets("email").filter(t=>t.title.toLowerCase().includes(e.toLowerCase())||t.subject&&t.subject.toLowerCase().includes(e.toLowerCase())).map(t=>{let a=[],o=t.content.match(/\[([^\]]+)\]/g);return o&&[...new Set(o)].forEach(n=>{a.push({key:n,label:n.replace("[","").replace("]",""),type:n.toLowerCase().includes("data")?"date":"text",auto:n.toLowerCase().includes("nome")&&n.toLowerCase().includes("seu")?"agentName":null})}),{id:t.id||`snippet-${Math.random()}`,name:t.title,category:"\u{1F464} Pessoal",subject:t.subject||Ye("noSubject"),template:t.content,placeholders:a}})}function Fr(e,t){return[...Nr(e,t),...Ir(t),..._r(t)]}function Un(){let e="v6.0.0",t=!1,a=[],o=null,n="",i=new Set;Lr();let r=document.createElement("div");r.id="email-assistant-popup",r.classList.add("cw-module-window","cw-email-popup"),Object.assign(r.style,Ge,{width:"850px",height:"650px"}),r.style.display="none",r.style.flexDirection="column";let l=Oe(r,Ye("headerTitle"),e,Ye("headerDesc"),{popup:r},()=>k()),c=document.createElement("div");c.className="cw-email-main";let g=document.createElement("div");g.className="cw-email-left-panel";let u=document.createElement("div");u.className="cw-email-search-container";let v=document.createElement("input");v.className="cw-email-search-input",v.placeholder=Ye("searchPlaceholder");let d=document.createElement("div");d.id="email-template-list",oa(d,".cw-email-cat-header, .cw-email-list-item");let p=document.createElement("div");p.className="cw-email-clear-btn",p.innerHTML="\u2715",p.onclick=()=>{v.value="",n="",p.style.display="none",K(),v.focus()},u.appendChild(v),u.appendChild(p),g.appendChild(u),g.appendChild(d);let _=document.createElement("div");_.className="cw-email-right-panel";let w=document.createElement("div");w.className="cw-email-fields-section";let E=document.createElement("div");E.className="cw-email-preview-section";let M=document.createElement("div");M.className="cw-email-preview-header";let A=document.createElement("span");A.textContent=Ye("previewTitle"),A.className="cw-email-preview-title";let D=document.createElement("div");D.className="cw-email-preview-actions";let h=(G,te=!1)=>{let Z=document.createElement("button");return Z.textContent=G,Z.className="cw-email-btn"+(te?" primary":""),Z},q=h("Copiar HTML"),R=h("Preencher no CRM",!0),T=h("Smart CR");T.classList.add("warning"),D.appendChild(T),D.appendChild(q),D.appendChild(R),M.appendChild(A),M.appendChild(D);let C=document.createElement("div");C.contentEditable="true",C.className="cw-email-preview-content",E.appendChild(M),E.appendChild(C),J(),_.appendChild(w),_.appendChild(E),c.appendChild(g),c.appendChild(_),r.appendChild(l),r.appendChild(c);let I=document.createElement("div");Object.assign(I.style,it),r.appendChild(I),rt(r,I),document.body.appendChild(r);function k(){t=!He(r),t?(ke(),r.style.display="flex",$o(r),a.length===0&&F()):(Te(),r.style.display="none"),De(t,r,"cw-btn-email")}async function F(){d.innerHTML='<div style="padding: 20px; text-align: center; color: #5f6368;">Carregando...</div>',a=await Gn.getTemplates(),K()}function U(G,te,Z){let ne=document.createElement("div");ne.className="cw-email-cat-header",ne.tabIndex=0,ne.setAttribute("role","button"),ne.setAttribute("aria-expanded",String(Z));let ie=document.createElement("span");ie.textContent=G,ne.appendChild(ie);let Y=document.createElement("span");Y.className="cw-email-cat-badge",Y.textContent=te;let ae=document.createElement("span");ae.className="cw-email-cat-arrow",ae.textContent=Z?"\u25BE":"\u25B8";let s=document.createElement("div");return s.className="cw-email-cat-right",s.appendChild(Y),s.appendChild(ae),ne.appendChild(s),ne.onclick=()=>{i.has(G)?i.delete(G):i.add(G),K()},ne.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),ne.click())}),ne}function z(G){let te=o&&o.id===G.id,Z=document.createElement("div");if(Z.className="cw-email-list-item"+(te?" selected":""),Z.tabIndex=0,Z.setAttribute("role","button"),Z.setAttribute("aria-pressed",String(!!te)),te){let Y=document.createElement("div");Y.className="cw-email-list-indicator",Z.appendChild(Y)}let ne=document.createElement("span");ne.className="cw-email-list-icon",ne.innerHTML=G.isSmartCR?"\u26A1":G.category==="\u{1F464} Pessoal"?"\u{1F464}":"\u{1F4C4}",Z.appendChild(ne);let ie=document.createElement("span");return ie.className="cw-email-list-text",ie.textContent=G.name,Z.appendChild(ie),Z.onclick=()=>W(G),Z.addEventListener("keydown",Y=>{(Y.key==="Enter"||Y.key===" ")&&(Y.preventDefault(),Z.click())}),Z}function K(){d.innerHTML="";let G=Fr(a,n);if(G.length===0){d.innerHTML=`
                <div class="cw-email-list-empty">
                    <div class="cw-email-list-empty-icon">\u{1F50D}</div>
                    <div class="cw-email-list-empty-text">Nenhum resultado para "${n}"</div>
                </div>`;return}[...new Set(G.map(Z=>Z.category))].sort((Z,ne)=>Z.localeCompare(ne)).forEach(Z=>{let ne=i.has(Z)||n.length>0,ie=G.filter(Y=>Y.category===Z);d.appendChild(U(Z,ie.length,ne)),ne&&ie.forEach(Y=>{d.appendChild(z(Y))})})}let re=null;async function W(G){o?.id!==G.id&&(o=G,re&&clearTimeout(re),_.style.opacity="0",_.style.transform="translateY(5px)",re=setTimeout(()=>{T.style.display=G.isSmartCR?"block":"none",R.style.display=G.isSmartCR?"none":"block",q.style.display=G.isSmartCR?"none":"block",K(),B(),J(),_.style.opacity="1",_.style.transform="translateY(0)",re=null},150))}function B(){if(w.innerHTML="",!o||o.isSmartCR){o?.isSmartCR?(w.style.display="block",w.innerHTML=`<div class="cw-email-smartcr-hint">
                    <span class="cw-email-smartcr-hint-icon">\u{1F4A1}</span>
                    <span>Este \xE9 um <b>Smart CR</b>. Clique no bot\xE3o laranja acima para aplicar o atalho diretamente no CRM.</span>
                </div>`):w.style.display="none";return}let G=o.placeholders&&o.placeholders.length>0;if(w.style.display=G?"block":"none",!G)return;let te=document.createElement("div");te.className="cw-email-fields-grid",(o.placeholders||[]).forEach(Z=>{let ne=document.createElement("div"),ie=document.createElement("label");ie.className="cw-email-field-label",ie.textContent=Z.label;let Y=document.createElement("input");Y.className="cw-email-field-input",Y.type=Z.type||"text",Y.dataset.key=Z.key,Z.auto==="agentName"&&(Y.value=Gt().split(" ")[0]),Y.addEventListener("input",J),ne.appendChild(ie),ne.appendChild(Y),te.appendChild(ne)}),w.appendChild(te)}function J(){if(!o){C.innerHTML=`
                <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center;">
                    <div class="cw-animate-float" style="width: 140px; height: 140px; margin-bottom: 24px;">
                        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="60" cy="60" r="55" fill="#f8f9fa"/>
                            <!-- Envelope Base -->
                            <path d="M30 40C30 37.7909 31.7909 36 34 36H86C88.2091 36 90 37.7909 90 40V80C90 82.2091 88.2091 84 86 84H34C31.7909 84 30 82.2091 30 80V40Z" fill="white" stroke="#e8eaed" stroke-width="2"/>
                            <!-- Detalhes decorativos (paleta Apple do m\xF3dulo, n\xE3o mais as cores oficiais do Google) -->
                            <path d="M30 40L60 60L90 40" stroke="${ve.primary}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M30 80L50 65" stroke="#FF3B30" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <path d="M90 80L70 65" stroke="#FF9500" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <!-- Small Floating icons -->
                            <circle cx="95" cy="30" r="8" fill="#34C759"/>
                            <path d="M92 30H98M95 27V33" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            <rect x="20" y="70" width="12" height="12" rx="3" fill="${ve.primary}" opacity="0.8"/>
                        </svg>
                    </div>
                    <div style="font-family: 'Google Sans', sans-serif; font-size: 18px; font-weight: 600; color: ${ve.textPrimary}; margin-bottom: 8px;">
                        Pronto para come\xE7ar?
                    </div>
                    <div style="font-size: 14px; color: ${ve.textSecondary}; line-height: 1.6; max-width: 280px; margin: 0 auto;">
                        Selecione um template \xE0 esquerda para<br>gerar o seu e-mail t\xE9cnico.
                    </div>
                </div>`;return}if(o.isSmartCR){C.innerHTML=`<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">\u26A1</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${o.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">Este atalho ir\xE1 preencher automaticamente os destinat\xE1rios e abrir o menu de Canned Responses do CRM.</div></div>`;return}let G=o.template;(w.querySelectorAll("input")||[]).forEach(Z=>{let ne=Z.dataset.key,ie=Z.value;if(Z.type==="date"&&ie){let[ae,s,y]=ie.split("-");ie=`${s}/${y}/${ae}`}ie=ie||`<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${ne}</span>`;let Y=ne.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");G=G.replace(new RegExp(Y,"g"),ie)}),C.innerHTML=G}return v.addEventListener("input",G=>{n=G.target.value,p.style.display=n?"block":"none",K()}),q.onclick=()=>{let G=C.innerHTML,te=new Blob([G],{type:"text/html"}),Z=C.innerText,ne=[new ClipboardItem({"text/html":te,"text/plain":new Blob([Z],{type:"text/plain"})})];navigator.clipboard.write(ne).then(()=>X(Ye("emailCopiedToast")),()=>{S.playError(),X(Ye("copyErrorToast"),{error:!0})})},R.onclick=async()=>{if(!o)return;let G=Jt(),te={...o,body:C.innerHTML};try{await qn(te),k()}catch{S.playError(),X(Ye("fillErrorToast"),{error:!0})}finally{G()}},T.onclick=async()=>{if(!o||!o.isSmartCR)return;let G=Jt();try{await va(o.code),k()}catch{S.playError(),X(Ye("smartCrErrorToast"),{error:!0})}finally{G()}},Se(()=>{let G=r.querySelector(".cw-help-title");G&&(G.textContent=Ye("headerTitle"));let te=r.querySelector(".cw-help-description");te&&(te.textContent=Ye("headerDesc")),v.placeholder=Ye("searchPlaceholder"),A.textContent=Ye("previewTitle")}),k}var Vn=["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],Mt={"PT BAU":{inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:Vn,fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:Vn,fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{inicio:["Introducci\xF3n (Nombre y Equipo).","La llamada puede ser grabada con fines de entrenamiento y calidad de acuerdo con nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xF3n.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar contenido sensible antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos pasos (\xBFCu\xE1nto tiempo seguir\xE1 el caso?)","Encuesta de Satisfacci\xF3n.","Estar\xE9 monitoreando su caso durante XX d\xEDas para asegurarme de que todo est\xE9 funcionando correctamente. Durante este tiempo, nuestro equipo de calidad podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la cuenta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condiciones.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las herramientas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfacci\xF3n.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes d\xEDas."]}},Mr=["inicio","meio","fim"];function Wn(e){if(!Array.isArray(e)||!e.length)return!1;let t={},a=e.slice().sort((o,n)=>(o.sortOrder||0)-(n.sortOrder||0));for(let o of a){let n=(o.lang||"").toUpperCase(),i=o.key||"",r=o.field||"",l=o.value||"";if(!n||!i||!Mr.includes(r)||!l)continue;let c=`${n} ${i}`;t[c]||(t[c]={}),(t[c][r]=t[c][r]||[]).push(l)}if(!Object.keys(t).length)return!1;for(let o of Object.keys(Mt))delete Mt[o];return Object.assign(Mt,t),!0}async function Yn(e){let t=me.getCachedContent("call_script");Wn(t)&&e?.();try{let a=await me.fetchContentModule("call_script");Wn(a)&&e?.()}catch(a){console.warn("Central de Conte\xFAdo indispon\xEDvel; usando roteiro embutido.",a)}}var Xn={pt:{headerTitle:"Call Script",headerDesc:"Guia interativo para condu\xE7\xE3o de chamadas.",loading:"Carregando...",unknownClient:"Cliente Desconhecido",notFound:"N\xE3o encontrado",activeMonitoring:"Monitoramento Ativo",cidLabel:"CID (Conta)",emailLabel:"Email de Contato",copied:"Copiado!",amMessageTitle:"Mensagem AM",amMessageSub:"Gerar aviso de insucesso",copyFinalMessage:"Copiar Mensagem Final",resize:"Redimensionar",resetScript:"Resetar Script",resetConfirm:"Resetar todo o progresso do script? Essa a\xE7\xE3o n\xE3o pode ser desfeita.",resetConfirmBtn:"Resetar",scriptNotConfigured:"Script n\xE3o configurado.",messageCopiedToast:"Mensagem copiada!",amMessage:(e,t)=>`Ol\xE1. Bom dia!

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
E-mail: ${e.clientEmail||"---"}`,dateLocale:"es-ES"}};function Kn(){return le()==="es"?"ES":"PT"}function xe(e){let t=le();return Xn[t]?.[e]??Xn.pt[e]}var ge={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",danger:"#D93025",dangerBg:"#FCE8E6",success:"#34A853",successBg:"#E6F4EA"},Or={inicio:{PT:"Abertura",ES:"Apertura"},meio:{PT:"Implementa\xE7\xE3o (Tag Support)",ES:"Implementaci\xF3n"},fim:{PT:"Fechamento",ES:"Cierre"}};function Dr(){if(document.getElementById("csa-styles-v2"))return;let e=document.createElement("style");e.id="csa-styles-v2",e.textContent=`
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
    `,document.head.appendChild(e)}function Jn(){let e="v3.1.0";Dr();let t={},a=Kn(),o="BAU",n=!1,i=document.createElement("div");i.id="call-script-popup",i.classList.add("cw-module-window"),Object.assign(i.style,Ge,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let r={popup:i,googleLine:null},l=null;function c(){n&&Je().then(Y=>{let ae=i.querySelector("#cw-ctx-name"),s=i.querySelector("#cw-ctx-cid"),y=i.querySelector("#cw-ctx-email");if(ae&&(ae.textContent=Y.advertiserName||xe("unknownClient")),s){let L=Y.cid||"---";s.textContent!==L&&(s.textContent=L)}if(y){let L=Y.clientEmail||xe("notFound");y.textContent!==L&&(y.textContent=L,y.title=L)}})}function g(){Je().then(Y=>{let ae=new Date().toLocaleDateString(xe("dateLocale")),s=i.querySelector("#cw-am-message-area"),y=i.querySelector("#cw-am-review-container"),L=xe("amMessage")(Y,ae);s&&(s.value=L),y&&(y.classList.add("visible"),y.scrollIntoView({behavior:"smooth",block:"end"}))})}function u(){n=!He(i),De(n,i,"cw-btn-script"),n?(ke(),c(),l||(l=setInterval(c,2e3))):(Te(),l&&(clearInterval(l),l=null))}let v=Oe(i,xe("headerTitle"),e,xe("headerDesc"),r,()=>{u()});i.appendChild(v);let d=v.querySelector("span"),p=document.createElement("div");p.className="csa-context-banner",p.innerHTML=`
      <div class="csa-ctx-top">
          <div class="csa-ctx-name-wrap">
              <div class="csa-live-dot js-csa-monitoring" title="${xe("activeMonitoring")}"></div>
              <span id="cw-ctx-name" class="csa-ctx-name">${xe("loading")}</span>
          </div>
          <div class="csa-live-badge">Live</div>
      </div>

      <div class="csa-ctx-grid">
          <div class="csa-data-pill" id="cw-pill-cid">
              <div class="csa-pill-label js-csa-cid-label">${xe("cidLabel")}</div>
              <div id="cw-ctx-cid" class="csa-data-value mono">---</div>
              <div class="csa-copy-hint">${xe("copied")}</div>
          </div>

          <div class="csa-data-pill" id="cw-pill-email">
              <div class="csa-pill-label js-csa-email-label">${xe("emailLabel")}</div>
              <div id="cw-ctx-email" class="csa-data-value">---</div>
              <div class="csa-copy-hint">${xe("copied")}</div>
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
                          <div class="csa-am-btn-title js-csa-am-title">${xe("amMessageTitle")}</div>
                          <div class="csa-am-btn-sub js-csa-am-sub">${xe("amMessageSub")}</div>
                      </div>
                  </button>

                  <div id="cw-am-review-container" class="csa-am-review-container">
                      <textarea id="cw-am-message-area" class="csa-am-message-area"></textarea>
                      <button id="cw-am-copy-final" class="csa-am-copy-final">${xe("copyFinalMessage")}</button>
                  </div>
              </div>
          </div>
      </div>
  `;let _=p.querySelector("#csa-toggle-options"),w=p.querySelector("#csa-options-content"),E=p.querySelector("#csa-options-arrow"),M=!1;_.onclick=()=>{M=!M,E.classList.toggle("expanded",M),w.classList.toggle("expanded",M),S.playClick()};let A=p.querySelector("#cw-pill-message"),D=p.querySelector("#cw-am-copy-final"),h=p.querySelector("#cw-am-message-area");A.addEventListener("click",()=>{g()}),D.addEventListener("click",()=>{h.value&&(navigator.clipboard.writeText(h.value),X(xe("messageCopiedToast")),S.playSuccess(),D.classList.add("copied-flash"),D.textContent=xe("copied"),setTimeout(()=>{D.classList.remove("copied-flash"),D.textContent=xe("copyFinalMessage")},2e3))});let q=(Y,ae)=>{let s=p.querySelector(Y),y=p.querySelector(ae);s.onclick=()=>{let L=y.textContent;!L||L.includes("---")||L===xe("notFound")||(navigator.clipboard.writeText(L),S.playSuccess(),s.classList.add("copied"),setTimeout(()=>s.classList.remove("copied"),1500))}};i.appendChild(p);let R=document.createElement("div");R.className="csa-progress-container";let T=document.createElement("div");T.className="csa-progress-fill",R.appendChild(T),i.appendChild(R);let C=document.createElement("div");C.id="csa-content",C.className="csa-content-area",i.appendChild(C);let I=document.createElement("div");I.className="csa-footer";let k=document.createElement("span");k.className="csa-credit",k.textContent="by lucaste@";let F=document.createElement("button");F.className="csa-reset-btn",F.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> <span class="js-csa-reset-label">${xe("resetScript")}</span>`,F.onclick=async()=>{if(await _e(xe("resetConfirm"),{danger:!0,confirmText:xe("resetConfirmBtn")})){for(let ae in t)delete t[ae];Z()}},I.appendChild(k),I.appendChild(F),i.appendChild(I);let U=document.createElement("div");U.className="csa-controls";let z=document.createElement("div");z.className="csa-segmented-control",z.innerHTML=`
      <div class="csa-segmented-indicator" id="type-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-type="BAU">BAU</button>
      <button data-type="LT">LT</button>
  `,U.appendChild(z),C.appendChild(U);let K=z.querySelectorAll("button"),re=z.querySelector("#type-indicator");K.forEach((Y,ae)=>{Y.onclick=()=>{K.forEach(s=>s.classList.remove("active")),Y.classList.add("active"),re.style.transform=`translateX(${ae*(z.offsetWidth/2-2)}px)`,o=Y.dataset.type,S.playClick(),Z()}}),Se(()=>{a=Kn(),d&&(d.textContent=xe("headerTitle"));let Y=i.querySelector(".cw-help-title");Y&&(Y.textContent=xe("headerTitle"));let ae=i.querySelector(".cw-help-description");ae&&(ae.textContent=xe("headerDesc"));let s=p.querySelector(".js-csa-monitoring");s&&(s.title=xe("activeMonitoring"));let y=p.querySelector(".js-csa-cid-label");y&&(y.textContent=xe("cidLabel"));let L=p.querySelector(".js-csa-email-label");L&&(L.textContent=xe("emailLabel")),p.querySelectorAll(".csa-copy-hint").forEach(m=>m.textContent=xe("copied"));let b=p.querySelector(".js-csa-am-title");b&&(b.textContent=xe("amMessageTitle"));let f=p.querySelector(".js-csa-am-sub");f&&(f.textContent=xe("amMessageSub")),D&&(D.textContent=xe("copyFinalMessage"));let N=F.querySelector(".js-csa-reset-label");N&&(N.textContent=xe("resetScript")),Z()});let W=document.createElement("div");W.id="csa-checklist-area",C.appendChild(W);let B=document.createElement("div");Object.assign(B.style,it),B.className="no-drag",B.title=xe("resize"),i.appendChild(B),rt(i,B),document.body.appendChild(i),q("#cw-pill-cid","#cw-ctx-cid"),q("#cw-pill-email","#cw-ctx-email");function J(Y){return Y.replace(/\n/g,"<br>")}function G(Y,ae,s,y){let L=`${Y}-${ae}-${y}`,b=!!t[L],f=document.createElement("div");f.className="csa-item-row"+(b?" completed":"");let N=document.createElement("div");N.className="csa-checkbox"+(b?" checked":""),N.innerHTML=b?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':"";let m=document.createElement("span");return m.className="csa-item-text"+(b?" completed":""),m.innerHTML=J(s),f.onclick=()=>{let P=!t[L];t[L]=P,S.playClick(),f.classList.toggle("completed",P),m.classList.toggle("completed",P),N.classList.toggle("checked",P),N.innerHTML=P?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':"",P&&(N.classList.add("pulse"),setTimeout(()=>N.classList.remove("pulse"),150)),ne(Y,Mt[Y])},f.appendChild(N),f.appendChild(m),{row:f,isDone:b}}function te(Y,ae,s){let y=document.createElement("div");y.className="csa-card";let L=document.createElement("div");L.className="csa-card-title",L.textContent=Or[ae][a]||"";let b=document.createElement("span");b.className="csa-card-counter",L.appendChild(b),y.appendChild(L);let f=0;s.forEach((m,P)=>{let{row:Q,isDone:de}=G(Y,ae,m,P);de&&f++,y.appendChild(Q)});let N=f===s.length&&s.length>0;return y.classList.toggle("done",N),b.classList.toggle("done",N),b.textContent=`${f}/${s.length}`,y}function Z(){W.innerHTML="";let Y=`${a} ${o}`,ae=Mt[Y];if(!ae){W.innerHTML=`<div class="csa-empty-state"><div class="csa-empty-state-icon">\u2615</div><div>${xe("scriptNotConfigured")}</div></div>`,T.style.width="0%";return}let s=0,y=0;["inicio","meio","fim"].forEach(L=>{ae[L]&&(s+=ae[L].length)}),["inicio","meio","fim"].forEach(L=>{let b=ae[L];!b||b.length===0||(b.forEach((f,N)=>{let m=`${Y}-${L}-${N}`;t[m]&&y++}),W.appendChild(te(Y,L,b)))}),ie(s,y)}function ne(Y,ae){let s=0,y=0;["inicio","meio","fim"].forEach(L=>{let b=ae[L]||[];s+=b.length,b.forEach((f,N)=>{t[`${Y}-${L}-${N}`]&&y++})}),ie(s,y),setTimeout(()=>Z(),200)}function ie(Y,ae){let s=Y===0?0:ae/Y*100;T.style.width=`${s}%`,T.classList.toggle("complete",s===100)}return Z(),Yn(()=>Z()),u}var zr={"Ponto Eletr\xF4nico":"Control de Asistencia","Ferramenta de ajuda":"Herramienta de ayuda","Intranet Google":"Intranet Google","Relat\xF3rio Follow-ups":"Informe de Follow-ups","Dashboard WFM":"Dashboard WFM","Tech Solutions SAO":"Tech Solutions SAO","Form Grava\xE7\xE3o":"Form Grabaci\xF3n","Form Escala\xE7\xE3o":"Form Escalaci\xF3n","Instru\xE7\xF5es Split":"Instrucciones Split","Single Page App":"Single Page App","Procedimento Padr\xE3o":"Procedimiento Est\xE1ndar","Valida\xE7\xE3o C\xF3digo":"Validaci\xF3n C\xF3digo","Convers\xE3o Chamada":"Conversi\xF3n Llamada","Valida\xE7\xE3o WCC":"Validaci\xF3n WCC",ECW4:"ECW4","Monitoramento EC":"Monitoreo EC","Resolu\xE7\xE3o problemas":"Resoluci\xF3n de problemas","Implementa\xE7\xE3o RMKT":"Implementaci\xF3n RMKT","Pontua\xE7\xE3o Leads":"Puntuaci\xF3n de Leads","Instala\xE7\xE3o Container":"Instalaci\xF3n Container","Instala\xE7\xE3o Config.":"Instalaci\xF3n Config.","Valida\xE7\xE3o GA4":"Validaci\xF3n GA4","Guia Dev":"Gu\xEDa Dev","Resolu\xE7\xE3o Problemas":"Resoluci\xF3n de Problemas","Dom\xEDnio Cruzado":"Dominio Cruzado","Lista Oficial":"Lista Oficial","Criador URLs":"Creador de URLs","Setup Inicial":"Setup Inicial","Otimiza\xE7\xE3o Feed":"Optimizaci\xF3n Feed","Ferramenta Interna":"Herramienta Interna",Avalia\u00E7\u00F5es:"Rese\xF1as","Feeds Offline":"Feeds Offline","Help Center":"Help Center","Guias CMS":"Gu\xEDas CMS","Solu\xE7\xF5es Iframes":"Soluciones Iframes","Ghost Ads":"Ghost Ads","Ghost Analytics":"Ghost Analytics","Ghost GTM":"Ghost GTM",Ferramenta:"Herramienta","Ghost MC":"Ghost MC","Playground JS":"Playground JS","Testador Regex":"Probador Regex","Doc. CSP":"Doc. CSP","Guia CoMo":"Gu\xEDa CoMo","Debug CoMo":"Debug CoMo","Portal Colaborador":"Portal del Colaborador","Apps e Sistemas":"Apps y Sistemas","Folha Pagamento":"N\xF3mina","Reportar problemas":"Reportar problemas","Registro chamadas":"Registro de llamadas","Erros de sistema":"Errores de sistema","BAU/Descarte/Monitoria":"BAU/Descarte/Monitoreo","Feedback positivo":"Feedback positivo","Casos dif\xEDceis":"Casos dif\xEDciles","Chat/Email Ads":"Chat/Email Ads","Chat/Email Shopping":"Chat/Email Shopping","Perfil da Empresa":"Perfil de la Empresa","Console API":"Console API","Lista de n\xFAmeros":"Lista de n\xFAmeros",Cursos:"Cursos"};function Zn(e){let t=e&&typeof e=="object"?e:{desc:e},a=t.desc||"";return le()!=="es"?a:t.descEs||zr[a]||a}var Qn={pt:{headerTitle:"Central de Links",headerDesc:"Navegue pelas categorias ou use a busca.",searchPlaceholder:"Buscar ferramenta ou SOP...",recent:"Recentes",nothingHereYet:"Nada por aqui ainda",nothingHereSub:"Os links que voc\xEA abrir aparecem aqui pra acesso r\xE1pido depois.",searchResults:"Resultados da busca",nothingFound:"Nada encontrado",noLinkMatches:e=>`Nenhum link bate com "${e}".`,copyUrl:"Copiar URL",linkCopiedToast:"Link copiado!",copyFailedToast:"N\xE3o foi poss\xEDvel copiar o link.",categoryLabels:{tasks:"Tarefas",ads:"Ads",analytics:"GA4",shopping:"Shop",tech:"Tech",hr:"RH",lm:"Forms",qa:"QA",suporte:"Ajuda"}},es:{headerTitle:"Central de Enlaces",headerDesc:"Navega por las categor\xEDas o usa la b\xFAsqueda.",searchPlaceholder:"Buscar herramienta o SOP...",recent:"Recientes",nothingHereYet:"Todav\xEDa no hay nada aqu\xED",nothingHereSub:"Los enlaces que abras aparecen aqu\xED para acceso r\xE1pido despu\xE9s.",searchResults:"Resultados de la b\xFAsqueda",nothingFound:"No se encontr\xF3 nada",noLinkMatches:e=>`Ning\xFAn enlace coincide con "${e}".`,copyUrl:"Copiar URL",linkCopiedToast:"\xA1Enlace copiado!",copyFailedToast:"No se pudo copiar el enlace.",categoryLabels:{tasks:"Tareas",ads:"Ads",analytics:"GA4",shopping:"Shop",tech:"Tech",hr:"RRHH",lm:"Forms",qa:"QA",suporte:"Ayuda"}}};function ze(e){let t=le();return Qn[t]?.[e]??Qn.pt[e]}function ei(e){return ze("categoryLabels")[e]??mt[e]?.label??e}var mt={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}};function ti(e){if(!Array.isArray(e)||!e.length)return!1;let t={};for(let a of e){let o=a.key;if(!o)continue;let n;try{n=JSON.parse(a.value||"{}")}catch{continue}!n.name||!n.url||(t[o]||(t[o]={label:mt[o]?.label||o,links:[]}),t[o].links.push({name:n.name,url:n.url,desc:n.desc||"",descEs:n.desc_es||""}))}if(!Object.keys(t).length)return!1;for(let a of Object.keys(mt))delete mt[a];return Object.assign(mt,t),!0}async function Rr(e){let t=me.getCachedContent("links");ti(t)&&e?.();try{let a=await me.fetchContentModule("links");ti(a)&&e?.()}catch(a){console.warn("Central de Conte\xFAdo indispon\xEDvel; usando links embutidos.",a)}}var bt={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},ft={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},Sa={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}};function $r(){if(document.getElementById("cw-links-styles"))return;let e=document.createElement("style");e.id="cw-links-styles",e.textContent=`
        .cw-links-layout { display: flex; height: calc(100% - 56px); width: 100%; position: relative; }

        /* --- SIDEBAR --- */
        .cw-links-sidebar {
            width: 80px; flex-shrink: 0; background: ${ft.bgSidebar};
            border-right: 1px solid ${ft.borderSubtle};
            display: flex; flex-direction: column; align-items: center;
            padding: 16px 0; overflow-y: auto; gap: 8px;
            scrollbar-width: none; z-index: 2;
        }
        .cw-links-nav-btn {
            width: 56px; height: 56px; border-radius: 16px;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            cursor: pointer; color: ${ft.textSecondary};
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
        .cw-links-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: ${ft.bgApp}; position: relative; z-index: 1; }

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
            padding: 0 12px; font-size: 14px; color: ${ft.textPrimary};
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
        .cw-links-card-title { font-size: 14px; font-weight: 600; color: ${ft.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-links-card-desc { font-size: 12px; color: ${ft.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

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
    `,document.head.appendChild(e)}var ao="cw_link_history_v4",Br=10;function ai(e,t){try{let a=JSON.parse(localStorage.getItem(ao)||"[]");a=a.filter(o=>o.url!==e.url),a.unshift({...e,_originalCat:t}),a=a.slice(0,Br),localStorage.setItem(ao,JSON.stringify(a))}catch(a){console.warn("Erro ao salvar hist\xF3rico",a)}}function Pr(){try{return JSON.parse(localStorage.getItem(ao)||"[]")}catch{return[]}}function oi(){let e="v4.6",t="",a=!1,o=null,n=!1;$r();let i=document.createElement("div");i.id="links-popup",i.classList.add("cw-module-window"),Object.assign(i.style,Ge,{right:"100px",width:"600px",height:"650px",background:ft.bgApp,overflow:"hidden"});let r={popup:i,googleLine:null},l=Oe(i,ze("headerTitle"),e,ze("headerDesc"),r,()=>U());i.appendChild(l);let c=l.querySelector("span"),g=document.createElement("div");g.className="cw-links-layout",i.appendChild(g);let u=document.createElement("div");u.className="cw-links-sidebar",g.appendChild(u);let v=document.createElement("div");v.className="cw-links-content",g.appendChild(v);let d=document.createElement("div");d.className="cw-links-search-bar";let p=document.createElement("div");p.className="cw-links-search-wrap";let _=document.createElement("div");_.className="cw-links-search-icon",_.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';let w=document.createElement("input");w.className="cw-links-search-input",w.type="text",w.placeholder=ze("searchPlaceholder"),p.appendChild(_),p.appendChild(w),d.appendChild(p),v.appendChild(d);let E=document.createElement("div");E.className="cw-links-scroll",v.appendChild(E);let M=null;function A(){if(M)return;M=document.createElement("div"),M.className="cw-links-history-overlay";let z=document.createElement("div");z.className="cw-links-history-head",z.innerHTML=`<span class="cw-links-history-title js-links-recent">\u{1F552} ${ze("recent")}</span>`;let K=document.createElement("button");K.className="cw-links-history-close",K.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',K.onclick=()=>D(),z.appendChild(K),M.appendChild(z);let re=document.createElement("div");re.id="cw-history-list",re.className="cw-links-history-list",M.appendChild(re),v.appendChild(M)}function D(){n&&(n=!1,q(),I())}function h(){M||A();let z=M.querySelector("#cw-history-list");z.innerHTML="";let K=Pr();K.length===0?z.appendChild(Rt({icon:bt.history,title:ze("nothingHereYet"),subtitle:ze("nothingHereSub")})):K.forEach(re=>{let W=F(re,bt[re._originalCat],!0,re._originalCat);z.appendChild(W)}),requestAnimationFrame(()=>M.style.transform="translateY(0)")}function q(){M&&(M.style.transform="translateY(100%)")}document.addEventListener("mousedown",z=>{!n||!M||!M.contains(z.target)&&!u.contains(z.target)&&D()}),document.addEventListener("keydown",z=>{z.key==="Escape"&&n&&D()});function R(){u.innerHTML="";let z=T("history",ze("recent"),bt.history);z.id="cw-sidebar-btn-history",z.onclick=()=>{S.playClick(),n=!n,n?h():q(),I()},u.appendChild(z);let K=document.createElement("div");K.className="cw-links-nav-sep",u.appendChild(K),Object.keys(mt).forEach(re=>{let W=T(re,ei(re),bt[re]);W.id=`cw-sidebar-btn-${re}`,W.onclick=()=>{S.playClick(),n&&D(),C(re)},u.appendChild(W)})}function T(z,K,re){let W=document.createElement("div");W.className="cw-links-nav-btn",W.title=K,W.dataset.key=z;let B=Sa[z];B&&(W.style.setProperty("--cat-color",B.color),W.style.setProperty("--cat-bg",B.bg));let J=document.createElement("div");J.className="cw-links-nav-icon",J.innerHTML=re||bt.tasks;let G=document.createElement("div");return G.className="cw-links-nav-label",G.textContent=K,W.appendChild(J),W.appendChild(G),W}function C(z){let K=document.getElementById(`cat-anchor-${z}`);K&&(K.scrollIntoView({behavior:"smooth",block:"start"}),o=z,I())}function I(){Object.keys(mt).forEach(K=>{let re=u.querySelector(`#cw-sidebar-btn-${K}`);re&&re.classList.toggle("active",o===K&&!n)});let z=u.querySelector("#cw-sidebar-btn-history");z&&z.classList.toggle("history-open",n)}function k(){if(E.innerHTML="",t.trim()!==""){let K=[];if(Object.entries(mt).forEach(([W,B])=>{let J=B.links.filter(G=>G.name.toLowerCase().includes(t.toLowerCase())||Zn(G).toLowerCase().includes(t.toLowerCase()));K.push(...J.map(G=>({...G,_cat:W})))}),K.length===0){E.appendChild(Rt({icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',title:ze("nothingFound"),subtitle:ze("noLinkMatches")(t.trim())}));return}let re=document.createElement("div");re.className="cw-links-search-results-label",re.textContent=ze("searchResults"),E.appendChild(re),K.forEach(W=>{let B=F(W,bt[W._cat],!1,W._cat);E.appendChild(B)});return}Object.entries(mt).forEach(([K,re])=>{let W=Sa[K],B=document.createElement("div"),J=document.createElement("div");J.id=`cat-anchor-${K}`,J.className="cw-links-cat-header",J.style.setProperty("--cat-color",W.color),J.innerHTML=`<div class="cw-links-cat-dot"></div>${ei(K)}`,B.appendChild(J);let G=document.createElement("div");G.className="cw-links-cat-grid",re.links.forEach(te=>{let Z=F(te,bt[K],!1,K);G.appendChild(Z)}),B.appendChild(G),E.appendChild(B)});let z=document.createElement("div");z.className="cw-links-spacer",E.appendChild(z)}function F(z,K,re,W){let B=document.createElement("a");B.className="cw-links-card",B.href=z.url,B.target="_blank",B.rel="noopener noreferrer";let J=Sa[W]||Sa.history;B.style.setProperty("--cat-color",J.color),B.style.setProperty("--cat-bg",J.bg);let G=document.createElement("div");G.className="cw-links-icon-box",G.innerHTML=K||bt.tasks;let te=document.createElement("div");te.className="cw-links-card-meta";let Z=document.createElement("div");Z.className="cw-links-card-title",Z.textContent=z.name;let ne=document.createElement("div");ne.className="cw-links-card-desc",ne.textContent=Zn(z),te.appendChild(Z),te.appendChild(ne);let ie=document.createElement("div");return ie.className="cw-links-copy-btn",ie.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',ie.title=ze("copyUrl"),B.onclick=()=>{!re&&W&&ai(z,W)},ie.onclick=Y=>{Y.preventDefault(),Y.stopPropagation(),navigator.clipboard.writeText(z.url).then(()=>{S.playClick(),!re&&W&&ai(z,W),X(ze("linkCopiedToast"))}).catch(()=>{S.playError(),X(ze("copyFailedToast"),{error:!0})})},B.appendChild(G),B.appendChild(te),B.appendChild(ie),B}w.addEventListener("input",z=>{t=z.target.value,k()});function U(){a=!He(i),a?ke():Te(),De(a,i,"cw-btn-links")}return document.body.appendChild(i),R(),k(),Rr(()=>{R(),k(),I()}),Se(()=>{c&&(c.textContent=ze("headerTitle"));let z=i.querySelector(".cw-help-title");z&&(z.textContent=ze("headerTitle"));let K=i.querySelector(".cw-help-description");K&&(K.textContent=ze("headerDesc")),w.placeholder=ze("searchPlaceholder"),R(),k(),I(),n&&h()}),U}var Gr=60*1e3,di="cw_read_broadcasts",ni={pt:{headerTitle:"Central de Avisos",headerDesc:"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",searchPlaceholder:"Buscar avisos\u2026",clearSearch:"Limpar a busca",markRead:e=>`Marcar \u201C${e}\u201D como lido`,markReadShort:"Marcar como lido",publishedBy:e=>`Publicado por ${e}`,system:"Sistema",bauAvailability:"Disponibilidade BAU",attention:"aten\xE7\xE3o",full:"total",noDates:"sem datas publicadas",asideLabel:"Estado da opera\xE7\xE3o",filtersTitle:"Filtrar por tipo",filterAll:"Todos",readTitle:"Leitura",readCount:e=>e===1?"1 lido":`${e} lidos`,markAllRead:"Marcar tudo como lido",updatedAgo:e=>`Atualizado ${e}`,swapTo:e=>`Ver disponibilidade de ${e}`,justNow:"agora",minutesAgo:e=>`h\xE1 ${e} min`,hoursAgo:e=>`h\xE1 ${e} h`,yesterday:"ontem",nothingFound:"Nada encontrado.",allRead:"Tudo lido!",history:e=>`Hist\xF3rico (${e})`,typeLabel:{info:"Info",critical:"Alerta",success:"Sucesso"},syncing:"Sincronizando\u2026",updated:"Atualizado",offline:"Sem conex\xE3o \u2014 mostrando o que j\xE1 estava aqui"},es:{headerTitle:"Central de Avisos",headerDesc:"Comunicaci\xF3n oficial de la operaci\xF3n.",searchPlaceholder:"Buscar avisos\u2026",clearSearch:"Limpiar la b\xFAsqueda",markRead:e=>`Marcar \u201C${e}\u201D como le\xEDdo`,markReadShort:"Marcar como le\xEDdo",publishedBy:e=>`Publicado por ${e}`,system:"Sistema",bauAvailability:"Disponibilidad BAU",attention:"atenci\xF3n",full:"total",noDates:"sin fechas publicadas",asideLabel:"Estado de la operaci\xF3n",filtersTitle:"Filtrar por tipo",filterAll:"Todos",readTitle:"Lectura",readCount:e=>e===1?"1 le\xEDdo":`${e} le\xEDdos`,markAllRead:"Marcar todo como le\xEDdo",updatedAgo:e=>`Actualizado ${e}`,swapTo:e=>`Ver disponibilidad de ${e}`,justNow:"ahora",minutesAgo:e=>`hace ${e} min`,hoursAgo:e=>`hace ${e} h`,yesterday:"ayer",nothingFound:"No se encontr\xF3 nada.",allRead:"\xA1Todo le\xEDdo!",history:e=>`Historial (${e})`,typeLabel:{info:"Info",critical:"Alerta",success:"\xC9xito"},syncing:"Sincronizando\u2026",updated:"Actualizado",offline:"Sin conexi\xF3n \u2014 mostrando lo que ya estaba aqu\xED"}};function be(e){let t=le();return ni[t]?.[e]??ni.pt[e]}var Ea={PT:{label:"PT-BR",flag:'<svg class="cw-bc-bau-flag" viewBox="0 0 21 15" aria-hidden="true"><rect width="21" height="15" fill="#009B3A"/><path d="M10.5 1.9 19.1 7.5 10.5 13.1 1.9 7.5Z" fill="#FEDF00"/><circle cx="10.5" cy="7.5" r="3.3" fill="#002776"/></svg>'},ES:{label:"ES",flag:'<svg class="cw-bc-bau-flag" viewBox="0 0 21 15" aria-hidden="true"><rect width="21" height="15" fill="#AA151B"/><rect y="3.75" width="21" height="7.5" fill="#F1BF00"/></svg>'}},jr='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="17 2 21 6 17 10"></polyline><path d="M3 12V10a4 4 0 0 1 4-4h14"></path><polyline points="7 22 3 18 7 14"></polyline><path d="M21 12v2a4 4 0 0 1-4 4H3"></path></svg>',oo={critical:!0,info:!0,success:!0};function Hr(){if(document.getElementById("cw-broadcast-styles"))return;let e=document.createElement("style");e.id="cw-broadcast-styles",e.textContent=`
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
    `,document.head.appendChild(e)}var Ur={pt:"pt-BR",es:"es-ES"};function pi(e){if(!e)return"";try{let t=new Date(e);return isNaN(t.getTime())?String(e):new Intl.DateTimeFormat(Ur[le()]||"pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(t)}catch{return String(e)}}function Vr(e){let t=String(e||"").split("-");return t.length===3?`${t[2]}/${t[1]}`:String(e||"")}function Wr(e){let t=new Date(e).getTime();if(!t||isNaN(t))return"";let a=Math.floor((Date.now()-t)/6e4);if(a<1)return be("justNow");if(a<60)return be("minutesAgo")(a);let o=Math.floor(a/60);return o<24?be("hoursAgo")(o):o<48?be("yesterday"):pi(e).split(",")[0]}function ii(e){if(!e||typeof e!="string")return"";let t=e;return t=t.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" class="cw-bc-link">$1</a>'),t=t.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),t=t.replace(/_(.*?)_/g,"<i>$1</i>"),t=t.replace(/\n/g,"<br>"),t=Bo(t),t}function ri(e){if(!e)return null;let t={};try{t=JSON.parse(e.value||"{}")}catch{return null}let a=String(t.title||e.label||"").trim(),o=String(t.text||"").trim();return!a||!o?null:{id:String(e.key||e.id||""),type:oo[t.type]?t.type:"info",title:a,text:o,date:String(t.publishedAt||e.publishedAt||""),author:String(t.author||e.publishedBy||""),lang:String(e.lang||"ALL").toUpperCase()}}function Yr(e){if(!e)return null;let t=String(e.title||"").trim(),a=String(e.text||"").trim();return!t||!a||t.toLowerCase().includes("disponibilidade bau")?null:{id:String(e.id||""),type:oo[e.type]?e.type:"info",title:t,text:a,date:String(e.date||""),author:String(e.author||""),lang:"ALL"}}function si(e){let t=(e||[])[0];if(!t)return null;let a={};try{a=JSON.parse(t.value||"{}")}catch{return null}let o=a.segments||{},n={};return Object.keys(o).forEach(i=>{let r=String(o[i]?.attention||""),l=String(o[i]?.full||"");(r||l)&&(n[i]={attention:r,full:l})}),Object.keys(n).length?{updatedAt:String(a.updatedAt||t.publishedAt||""),author:String(a.author||t.publishedBy||""),note:String(a.note||""),segments:n}:null}function li(e,t){return e.lang==="ALL"||e.lang===t}function Ot(){try{let e=JSON.parse(localStorage.getItem(di)||"[]");return Array.isArray(e)?e:[]}catch{return[]}}function ci(e){try{localStorage.setItem(di,JSON.stringify(e))}catch{}}function ui(){let e="v5.0",t=!1,a=null,o="",n=null,i=null,r=!1,l=[],c=null,g=null,u=null,v=null;Hr();let d=document.createElement("div");d.id="broadcast-popup",d.classList.add("cw-module-window"),Object.assign(d.style,Ge,{right:"auto",left:"50%",width:"760px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",overflow:"hidden"});let p={popup:d,googleLine:null};function _(){if(t=!He(d),De(t,d,"cw-btn-broadcast"),t){ke();let b=document.getElementById("cw-btn-broadcast");b&&b.classList.remove("has-new"),n=null,i=null,r=!1,K()}else Te()}let w=Oe(d,be("headerTitle"),e,be("headerDesc"),p,()=>_()),E=w.querySelector("span");d.appendChild(w);let M=document.createElement("div");M.className="cw-bc-search-wrap";let A=document.createElement("div");A.className="cw-bc-search-icon",A.setAttribute("aria-hidden","true"),A.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';let D=document.createElement("input");D.className="cw-bc-search-input no-drag",D.type="search",D.name="cw-broadcast-search",D.autocomplete="off",D.spellcheck=!1,D.placeholder=be("searchPlaceholder"),D.setAttribute("aria-label",be("searchPlaceholder"));let h=document.createElement("button");h.type="button",h.className="cw-bc-search-clear",h.setAttribute("aria-label",be("clearSearch")),h.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';let q=document.createElement("div");q.className="cw-bc-search-field",q.append(A,D,h),M.appendChild(q),d.appendChild(M),D.addEventListener("input",b=>{o=b.target.value,h.classList.toggle("visible",o.length>0),ae()}),h.onclick=()=>{D.value="",o="",h.classList.remove("visible"),ae(),D.focus()};let R=document.createElement("div");R.className="cw-bc-body",d.appendChild(R);let T=document.createElement("div");T.className="cw-nice-scroll cw-bc-feed",T.setAttribute("role","feed"),T.setAttribute("aria-label",be("headerTitle")),R.appendChild(T);let C=document.createElement("aside");C.className="cw-nice-scroll cw-bc-aside",C.setAttribute("aria-label",be("asideLabel")),R.appendChild(C);let I=document.createElement("div");I.id="cw-bau-widget",I.className="cw-bc-panel",I.style.display="none",C.appendChild(I);let k=document.createElement("div");k.className="cw-bc-panel",C.appendChild(k);let F=document.createElement("div");F.className="cw-bc-panel",C.appendChild(F);let U=document.createElement("div");U.id="cw-update-status",U.className="cw-bc-sync",U.setAttribute("role","status"),U.setAttribute("aria-live","polite"),C.appendChild(U);function z({syncing:b=!1,online:f=!0}={}){if(U.classList.toggle("offline",!b&&!f),b){U.innerHTML=`<span class="cw-bc-spinner" aria-hidden="true"></span><span>${be("syncing")}</span>`;return}let N=v?Wr(v):"",m=f?N?be("updatedAgo")(N):be("updated"):be("offline");U.innerHTML=`<span class="cw-bc-sync-dot" aria-hidden="true"></span><span>${m}</span>`}async function K(){z({syncing:!0});let b=!0,f=jt();try{let[N,m]=await Promise.all([me.fetchContentModule("broadcast"),me.fetchContentModule("bau_availability")]);if(Array.isArray(N)){let P=N.map(ri).filter(Boolean).filter(Q=>li(Q,f));l=W(P)}else b=!1;c=si(m)}catch{b=!1}b&&(v=new Date().toISOString()),re(),B(),ae(),z({online:b})}function re(){let b=c?c.updatedAt:null;if(!(g===null)&&!t){let N=Ot();(l.some(Q=>!g.has(Q.id)&&!N.includes(Q.id))||b&&b!==u)&&S.playNotification()}g=new Set(l.map(N=>N.id)),u=b}function W(b){return b.slice().sort((f,N)=>{let m=new Date(f.date).getTime()||0;return(new Date(N.date).getTime()||0)-m})}function B(){let b=document.getElementById("cw-btn-broadcast");if(!b)return;let f=Ot();if(l.some(m=>!f.includes(m.id))){if(b.classList.add("has-new"),!b.querySelector(".cw-badge")){let m=document.createElement("div");m.className="cw-badge",Object.assign(m.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),b.appendChild(m)}}else{b.classList.remove("has-new");let m=b.querySelector(".cw-badge");m&&m.remove()}}function J(){if(!c){I.style.display="none",I.innerHTML="";return}let b=Object.keys(Ea).filter(H=>c.segments[H]);if(!b.length){I.style.display="none",I.innerHTML="";return}let f=n&&b.includes(n)?n:b.includes(jt())?jt():b[0],N=Ea[f],m=c.segments[f]||{},P=(H,ee)=>`
          <span class="cw-bc-bau-date ${H}">
              <span class="cw-bc-bau-dot"></span>
              <span class="cw-bc-bau-kind">${be(H)}</span>
              <span class="cw-bc-bau-value">${Vr(ee)}</span>
          </span>`,Q=[m.attention?P("attention",m.attention):"",m.full?P("full",m.full):""].join(""),de=b.find(H=>H!==f),x=de?`<button class="cw-bc-bau-swap" type="button"
                     aria-label="${be("swapTo")(Ea[de].label)}"
                     title="${be("swapTo")(Ea[de].label)}">${jr}</button>`:"";I.style.display="flex",I.innerHTML=`
          <div class="cw-bc-bau-top">
              ${N.flag}
              <span class="cw-bc-bau-label">${be("bauAvailability")}</span>
              <span class="cw-bc-bau-seg">${N.label}</span>
              ${x}
          </div>
          <div class="cw-bc-bau-dates">
              ${Q||`<span class="cw-bc-bau-empty">${be("noDates")}</span>`}
          </div>
          ${c.note?`<div class="cw-bc-bau-note">${ii(c.note)}</div>`:""}
      `;let O=I.querySelector(".cw-bc-bau-swap");O&&(O.onclick=()=>{n=de,S.playClick(),J()})}function G(){let b={critical:0,info:0,success:0};l.forEach(m=>{b[m.type]=(b[m.type]||0)+1});let f=(m,P,Q)=>`
          <button class="cw-bc-filter" type="button" data-tipo="${m}"
                  aria-pressed="${i===m}">
              ${m==="all"?"":`<span class="cw-bc-type-dot ${m}"></span>`}
              <span>${P}</span>
              <span class="cw-bc-filter-count">${Q}</span>
          </button>`;k.innerHTML=`
          <div class="cw-bc-panel-title">${be("filtersTitle")}</div>
          <div class="cw-bc-filters">
              ${f("all",be("filterAll"),l.length)}
              ${Object.keys(b).map(m=>f(m,be("typeLabel")[m],b[m])).join("")}
          </div>
      `,k.querySelectorAll(".cw-bc-filter").forEach(m=>{m.onclick=()=>{let P=m.dataset.tipo;i=P==="all"||P===i?null:P,S.playClick(),ae()}});let N=k.querySelector('[data-tipo="all"]');N&&N.setAttribute("aria-pressed",String(i===null))}function te(){let b=Ot(),f=l.filter(m=>b.includes(m.id)).length,N=l.length-f;F.innerHTML=`
          <div class="cw-bc-panel-title">${be("readTitle")}</div>
          <button class="cw-bc-history-divider" type="button"
                  aria-expanded="${r}" aria-controls="cw-bc-history">
              <span>${be("readCount")(f)}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <button class="cw-bc-clear-btn" type="button" ${N?"":"disabled"}>
              ${be("markAllRead")}
          </button>
      `,F.querySelector(".cw-bc-history-divider").onclick=()=>{S.playClick(),r=!r,ae()},F.querySelector(".cw-bc-clear-btn").onclick=()=>{N&&(S.playSuccess(),ci(l.map(m=>m.id)),ae(),B())}}let Z=0;function ne(b,f){let N=document.createElement("article");N.className="cw-bc-card"+(f?" history":"");let m=oo[b.type]?b.type:"info",P=`cw-bc-title-${++Z}`;N.setAttribute("aria-labelledby",P);let Q=document.createElement("div");if(Q.className="cw-bc-card-meta",Q.innerHTML=`
        <span class="cw-bc-type">
            <span class="cw-bc-type-dot ${m}"></span>${be("typeLabel")[m]}
        </span>
        <span class="cw-bc-meta-sep" aria-hidden="true">\xB7</span>
        <span class="cw-bc-date-tag">${pi(b.date)}</span>
    `,!f){let H=document.createElement("button");H.type="button",H.className="cw-bc-dismiss-btn",H.setAttribute("aria-label",be("markRead")(b.title)),H.title=be("markReadShort"),H.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>',H.onclick=ee=>{ee.stopPropagation(),S.playClick(),N.style.transform="translateX(20px)",N.style.opacity="0",setTimeout(()=>{let oe=Ot();oe.push(b.id),ci(oe),ae(),B()},300)},Q.appendChild(H)}let de=document.createElement("h3");de.className="cw-bc-msg-title",de.id=P,de.textContent=b.title;let x=document.createElement("div");x.className="cw-bc-msg-body",x.innerHTML=ii(b.text);let O=document.createElement("div");return O.className="cw-bc-msg-author",O.textContent=be("publishedBy")(b.author||be("system")),N.append(Q,de,x,O),N}function ie(b,f){return i&&b.type!==i?!1:f?`${b.title||""} ${b.text||""}`.toLowerCase().includes(f):!0}function Y(b,f){let N=b.filter(P=>!f.includes(P.id)),m=b.filter(P=>f.includes(P.id));if(!N.length&&!(r&&m.length)){let P=o.trim().length>0||i!==null,Q=document.createElement("div");Q.className="cw-bc-empty",Q.innerHTML=P?`<div>${be("nothingFound")}</div>`:`
               <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
               <div>${be("allRead")}</div>
              `,T.appendChild(Q);return}if(N.forEach(P=>T.appendChild(ne(P,!1))),r&&m.length){let P=document.createElement("div");P.className="cw-bc-history-container",P.id="cw-bc-history",P.style.display="flex",m.forEach(Q=>P.appendChild(ne(Q,!0))),T.appendChild(P)}}function ae(){J(),G(),te(),T.innerHTML="";let b=Ot(),f=o.trim().toLowerCase();Y(l.filter(N=>ie(N,f)),b)}let s=me.getCachedContent("broadcast");Array.isArray(s)&&s.length?l=W(s.map(ri).filter(Boolean).filter(b=>li(b,jt()))):l=W(me.getCachedBroadcasts().map(Yr).filter(Boolean)),c=si(me.getCachedContent("bau_availability")),ae(),K(),a||(a=setInterval(K,Gr));let y=document.createElement("div");Object.assign(y.style,it),y.className="no-drag",d.appendChild(y),rt(d,y),document.body.appendChild(d);let L=l.some(b=>!Ot().includes(b.id));return Se(()=>{E&&(E.textContent=be("headerTitle"));let b=d.querySelector(".cw-help-title");b&&(b.textContent=be("headerTitle"));let f=d.querySelector(".cw-help-description");f&&(f.textContent=be("headerDesc")),D.placeholder=be("searchPlaceholder"),D.setAttribute("aria-label",be("searchPlaceholder")),h.setAttribute("aria-label",be("clearSearch")),T.setAttribute("aria-label",be("headerTitle")),C.setAttribute("aria-label",be("asideLabel")),ae(),z({online:!0})}),{toggle:_,hasUnread:L}}var mi="cw-wizard-shell-styles",gi={pt:{back:"Voltar",skip:"Pular",next:"Pr\xF3ximo",done:"Concluir",dotsGroup:"Navega\xE7\xE3o entre os slides",slideLabel:(e,t)=>`Slide ${e} de ${t}`,announce:(e,t,a,o)=>`Slide ${e} de ${t}: ${a}. ${o}`},es:{back:"Volver",skip:"Omitir",next:"Siguiente",done:"Finalizar",dotsGroup:"Navegaci\xF3n entre las diapositivas",slideLabel:(e,t)=>`Diapositiva ${e} de ${t}`,announce:(e,t,a,o)=>`Diapositiva ${e} de ${t}: ${a}. ${o}`}};function Ct(e){let t=le();return gi[t]?.[e]??gi.pt[e]}var bi=160,no=320,Xr=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function Kr(){if(document.getElementById(mi))return;let e=document.createElement("style");e.id=mi,e.textContent=`
        .cw-wiz-overlay {
            --cw-wiz-swap: ${bi}ms;
            --cw-wiz-shell: ${no}ms;

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
    `,document.head.appendChild(e)}var Jr='button:not([hidden]):not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';function Ca({slides:e,idPrefix:t,badge:a=null,nextLabel:o=null,finalLabel:n=null,skipLabel:i=null,onSkip:r=null,onClose:l=()=>{}}){let c={next:o||Ct("next"),final:n||Ct("done"),skip:i};if(!Array.isArray(e)||e.length===0)return console.warn("[wizard-shell] chamado sem slides; nada a mostrar."),{close:()=>{}};Kr();let g=`${t}-title`,u=`${t}-text`,v=document.activeElement,d=0,p=!1,_=null,w=document.createElement("div");w.className="cw-wiz-overlay",w.setAttribute("role","dialog"),w.setAttribute("aria-modal","true"),w.setAttribute("aria-labelledby",g),w.setAttribute("aria-describedby",u);let E=document.createElement("div");if(E.className="cw-wiz-card",a){let W=document.createElement("div");W.className="cw-wiz-badge",W.textContent=a,E.appendChild(W)}let M=document.createElement("div");M.className="cw-wiz-stage";let A=document.createElement("div");A.className="cw-wiz-icon",A.setAttribute("aria-hidden","true");let D=document.createElement("div");D.className="cw-wiz-title",D.id=g;let h=document.createElement("div");h.className="cw-wiz-text",h.id=u,M.appendChild(A),M.appendChild(D),M.appendChild(h);let q=document.createElement("div");q.className="cw-wiz-live",q.setAttribute("aria-live","polite"),q.setAttribute("aria-atomic","true");let R=document.createElement("div");R.className="cw-wiz-dots",R.setAttribute("role","group"),R.setAttribute("aria-label",Ct("dotsGroup"));let T=document.createElement("div");T.className="cw-wiz-actions";let C=document.createElement("button");C.type="button",C.className="cw-wiz-btn cw-wiz-btn-ghost",C.textContent=Ct("back");let I=document.createElement("button");I.type="button",I.className="cw-wiz-skip",I.textContent=i||Ct("skip"),i||(I.hidden=!0);let k=document.createElement("button");k.type="button",k.className="cw-wiz-btn cw-wiz-btn-primary",T.appendChild(C),T.appendChild(k),i&&(E.classList.add("has-skip"),E.appendChild(I)),E.appendChild(M),E.appendChild(q),E.appendChild(R),E.appendChild(T),w.appendChild(E);let F=e.map((W,B)=>{let J=document.createElement("button");return J.type="button",J.className="cw-wiz-dot",J.setAttribute("aria-label",Ct("slideLabel")(B+1,e.length)),J.onmouseenter=()=>S.playHover(),J.onclick=()=>{B!==d&&(S.playClick(),z(B))},R.appendChild(J),J});function U(W){let B=e[W];A.textContent=B.icon||"",D.textContent=B.title||"",h.textContent=B.text||"",F.forEach((G,te)=>{G.classList.toggle("active",te===W),G.setAttribute("aria-current",te===W?"true":"false")});let J=W===e.length-1;k.textContent=J?c.final:c.next,C.hidden=W===0,I.hidden=!i||J,q.textContent=Ct("announce")(W+1,e.length,B.title,B.text)}function z(W){if(p||W===d||W<0||W>=e.length)return;let B=W>d?"swapping-next":"swapping-prev";if(d=W,Xr()){U(W);return}clearTimeout(_),M.classList.add(B),_=setTimeout(()=>{U(W),M.classList.remove("swapping-next","swapping-prev")},bi)}function K({silent:W=!1}={}){p||(p=!0,clearTimeout(_),document.removeEventListener("keydown",re,!0),w.classList.add("closing"),w.classList.remove("open"),E.style.willChange="opacity, transform",W||S.playSuccess(),setTimeout(()=>{if(w.remove(),Te(),v&&document.contains(v))try{v.focus({preventScroll:!0})}catch{}l()},no))}function re(W){if(!p){if(W.key==="Tab"){let B=Array.from(E.querySelectorAll(Jr)).filter(te=>!te.hidden&&te.offsetParent!==null);if(B.length===0)return;let J=B[0],G=B[B.length-1];W.shiftKey&&document.activeElement===J?(W.preventDefault(),G.focus()):!W.shiftKey&&document.activeElement===G&&(W.preventDefault(),J.focus());return}if(W.key==="Enter"){if(document.activeElement&&document.activeElement.classList.contains("cw-wiz-dot"))return;W.preventDefault(),W.stopPropagation(),k.click()}else W.key==="Escape"?(W.preventDefault(),W.stopPropagation(),I.hidden?K():I.click()):W.key==="ArrowRight"?(W.preventDefault(),d<e.length-1&&(S.playClick(),z(d+1))):W.key==="ArrowLeft"&&(W.preventDefault(),d>0&&(S.playClick(),z(d-1)))}}return[C,I,k].forEach(W=>{W.onmouseenter=()=>S.playHover()}),k.onclick=()=>{S.playClick(),d<e.length-1?z(d+1):K()},C.onclick=()=>{S.playClick(),z(d-1)},I.onclick=async()=>{S.playClick(),!(typeof r=="function"&&!await r())&&K({silent:!0})},document.body.appendChild(w),ke(),U(0),E.style.willChange="opacity, transform",requestAnimationFrame(()=>{w.classList.add("open")}),setTimeout(()=>{E.style.removeProperty("will-change"),k.focus({preventScroll:!0})},no),document.addEventListener("keydown",re,!0),{close:K}}var fi="cw_onboarding_seen_v1",hi={pt:[{icon:"\u{1F680}",title:"Bem-vindo ao Case Wizard",text:"Uma camada de produtividade que roda por cima do CRM. Ela n\xE3o substitui nada do que voc\xEA j\xE1 usa \u2014 s\xF3 tira o trabalho repetitivo do caminho."},{icon:"\u2328\uFE0F",title:"Tudo come\xE7a em dois lugares",text:"A p\xEDlula flutuante, sempre no canto da tela, abre qualquer m\xF3dulo com um clique. E Ctrl+K (ou \u2318K) abre a paleta de comandos: digite o que quer e v\xE1 direto, sem tirar a m\xE3o do teclado."},{icon:"\u{1F4DD}",title:"Notas e BAU sem retrabalho",text:"O Case Notes monta a nota t\xE9cnica do caso a partir do status e das tasks que voc\xEA marcar. O BAU Form cuida das solicita\xE7\xF5es de cria\xE7\xE3o e descarte, passo a passo."},{icon:"\u{1F4AC}",title:"Na hora de falar com o cliente",text:"O Email Assistant sugere templates que leem o contexto do caso, e o Call Script te guia pela chamada com um roteiro interativo \u2014 sem script decorado."},{icon:"\u{1F4DA}",title:"Seu material e o do time",text:'Minha Biblioteca guarda seus snippets e respostas prontas. A Central de Links re\xFAne SOPs e ferramentas, os Avisos trazem disponibilidade BAU, e os Fusos Hor\xE1rios respondem "que horas s\xE3o pra ele agora?".'},{icon:"\u{1F6DF}",title:"Nada se perde",text:"O que voc\xEA digita \xE9 salvo sozinho a cada poucos segundos, e d\xE1 pra estacionar um caso no meio e retomar de onde parou. Fechar a aba sem querer n\xE3o custa mais nada. Bom trabalho!"}],es:[{icon:"\u{1F680}",title:"Bienvenido a Case Wizard",text:"Una capa de productividad que funciona sobre el CRM. No reemplaza nada de lo que ya usas \u2014 solo quita el trabajo repetitivo del camino."},{icon:"\u2328\uFE0F",title:"Todo empieza en dos lugares",text:"La p\xEDldora flotante, siempre en la esquina de la pantalla, abre cualquier m\xF3dulo con un clic. Y Ctrl+K (o \u2318K) abre la paleta de comandos: escribe lo que buscas y ve directo, sin soltar el teclado."},{icon:"\u{1F4DD}",title:"Notas y BAU sin rehacer trabajo",text:"Case Notes arma la nota t\xE9cnica del caso a partir del estado y de las tareas que marques. BAU Form se encarga de las solicitudes de creaci\xF3n y descarte, paso a paso."},{icon:"\u{1F4AC}",title:"A la hora de hablar con el cliente",text:"Email Assistant sugiere plantillas que leen el contexto del caso, y Call Script te gu\xEDa por la llamada con un guion interactivo \u2014 sin nada memorizado."},{icon:"\u{1F4DA}",title:"Tu material y el del equipo",text:'Mi Biblioteca guarda tus fragmentos y respuestas listas. La Central de Enlaces re\xFAne SOPs y herramientas, los Avisos traen la disponibilidad BAU, y las Zonas Horarias responden "\xBFqu\xE9 hora es para \xE9l ahora?".'},{icon:"\u{1F6DF}",title:"Nada se pierde",text:"Lo que escribes se guarda solo cada pocos segundos, y puedes aparcar un caso a mitad de camino y retomarlo donde lo dejaste. Cerrar la pesta\xF1a sin querer ya no cuesta nada. \xA1Buen trabajo!"}]},xi={pt:{next:"Pr\xF3ximo",start:"Come\xE7ar \u{1F680}",skip:"Pular",skipConfirm:"Pular a apresenta\xE7\xE3o? Voc\xEA pode explorar tudo pelo menu flutuante.",readyToast:"Tudo pronto! Use o menu flutuante ou Ctrl+K."},es:{next:"Siguiente",start:"Empezar \u{1F680}",skip:"Omitir",skipConfirm:"\xBFOmitir la presentaci\xF3n? Puedes explorar todo desde el men\xFA flotante.",readyToast:"\xA1Todo listo! Usa el men\xFA flotante o Ctrl+K."}};function vi(){if(localStorage.getItem(fi))return;localStorage.setItem(fi,"true");let e=le(),t=hi[e]||hi.pt,a=xi[e]||xi.pt;Ca({slides:t,idPrefix:"cw-onboarding",nextLabel:a.next,finalLabel:a.start,skipLabel:a.skip,onSkip:()=>_e(a.skipConfirm),onClose:()=>X(a.readyToast)})}var Aa={version:"v6.0.1",title:"Case Wizard v6.0.1",slides:[{icon:"\u{1F4E7}",title:"M\xF3dulo de e-mails estabilizado",text:"A atualiza\xE7\xE3o de interface do Connect Cases quebrou a abertura autom\xE1tica do compositor de e-mail. A corre\xE7\xE3o j\xE1 est\xE1 no ar \u2014 o Case Wizard acompanha o novo fluxo do Connect Cases e nada precisa ser feito do seu lado."}]};var Ta="cw_last_version",yi={pt:{updateBadge:e=>`Atualiza\xE7\xE3o ${e}`,nextBtn:"Pr\xF3ximo",doneBtn:"Entendi, vamos l\xE1! \u{1F44D}",updatedToast:e=>`Case Wizard atualizado para ${e}!`},es:{updateBadge:e=>`Actualizaci\xF3n ${e}`,nextBtn:"Siguiente",doneBtn:"\xA1Entendido, vamos! \u{1F44D}",updatedToast:e=>`\xA1Case Wizard actualizado a ${e}!`}};function ka(e){let t=le();return yi[t]?.[e]??yi.pt[e]}function wi(e){let t=localStorage.getItem(Ta);if(!t){localStorage.setItem(Ta,e);return}if(t!==e){if(Aa.version!==e){console.warn(`[changelog] APP_VERSION \xE9 ${e} mas RELEASE_NOTES.version \xE9 ${Aa.version}. Modal suprimido at\xE9 os dois baterem (veja src/modules/changelog/changelog-data.js).`),localStorage.setItem(Ta,e);return}Zr(e)}}function Zr(e){Ca({slides:Aa.slides,idPrefix:"cw-changelog",badge:ka("updateBadge")(e),nextLabel:ka("nextBtn"),finalLabel:ka("doneBtn"),onClose:()=>{localStorage.setItem(Ta,e),X(ka("updatedToast")(e))}})}var Si="cw_timezone_pinned",Ai={es:{name:"Espa\xF1a"},bo:{name:"Bolivia"},co:{name:"Colombia"},ec:{name:"Ecuador"},py:{name:"Paraguay",label:"Asunci\xF3n"},uy:{name:"Uruguay",label:"Montevideo"},ni:{name:"Nicaragua",label:"Managua"},pr:{name:"Puerto Rico"},gt:{label:"C. de Guatemala"},pa:{label:"C. de Panam\xE1"}};function gt(e){return le()==="es"?Ai[e.id]?.name??e.name:e.name}function io(e){return le()==="es"?Ai[e.id]?.label??e.label:e.label}var Ei={pt:{headerDesc:"Monitoramento global e planejamento de chamadas.",tabLive:"Monitoramento",tabPlan:"Planejador",searchPlaceholder:"Buscar cidade ou pa\xEDs...",noLocationFound:"Nenhum local encontrado",unpin:"Desafixar",pin:"Fixar",statusOpen:"Aberto",statusOpening:"Abrindo",statusClosing:"Fechando",statusClosed:"Fechado",whereIsClient:"Onde est\xE1 o cliente?",you:"Voc\xEA",yourTimezone:"Bras\xEDlia (GMT-3)",client:"Cliente",dragToSimulate:"Arraste para simular o hor\xE1rio:",idealBusinessHours:"Hor\xE1rio Comercial Ideal",limitHours:"Hor\xE1rio Limite (Aten\xE7\xE3o)",outOfHours:"Fora de Hor\xE1rio",filters:{all:"Todos",sa:"Am\xE9rica do Sul",na:"Norte & Central",eu:"Europa"}},es:{headerDesc:"Monitoreo global y planificaci\xF3n de llamadas.",tabLive:"Monitoreo",tabPlan:"Planificador",searchPlaceholder:"Buscar ciudad o pa\xEDs...",noLocationFound:"No se encontr\xF3 ning\xFAn lugar",unpin:"Desanclar",pin:"Anclar",statusOpen:"Abierto",statusOpening:"Abriendo",statusClosing:"Cerrando",statusClosed:"Cerrado",whereIsClient:"\xBFD\xF3nde est\xE1 el cliente?",you:"T\xFA",yourTimezone:"Brasilia (GMT-3)",client:"Cliente",dragToSimulate:"Arrastra para simular el horario:",idealBusinessHours:"Horario Comercial Ideal",limitHours:"Horario L\xEDmite (Atenci\xF3n)",outOfHours:"Fuera de Horario",filters:{all:"Todos",sa:"Am\xE9rica del Sur",na:"Norte y Central",eu:"Europa"}}};function Ee(e){let t=le();return Ei[t]?.[e]??Ei.pt[e]}var ro=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],Ci=[{id:"all"},{id:"sa"},{id:"na"},{id:"eu"}];function Qr(){if(document.getElementById("cw-timezone-interactive-styles"))return;let e=document.createElement("style");e.id="cw-timezone-interactive-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function ki(){Qr();let e="v2.2 Pro",t=!1,a=null,o="mx",n=JSON.parse(localStorage.getItem(Si)||"[]"),i="",r="all",l=new Date;l.setHours(14,0,0,0);let c={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},g={container:{display:"flex",flexDirection:"column",height:"100%",background:c.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:c.surface,borderBottom:`1px solid ${c.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:c.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:c.primary,borderBottomColor:c.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:c.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:c.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${c.border}`,background:c.surface,color:c.textSub,transition:"all 0.2s"},chipActive:{background:c.primaryBg,color:c.primary,borderColor:c.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:c.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${c.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:c.surface,border:`1px solid ${c.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:c.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},u=document.createElement("div");u.id="timezone-popup",u.classList.add("cw-module-window"),Object.assign(u.style,Ge,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let v={popup:u},d=Oe(u,"Time Zone Traveler",e,Ee("headerDesc"),v,()=>W());u.appendChild(d);let p=document.createElement("div");Object.assign(p.style,g.container),u.appendChild(p);let _=document.createElement("div");Object.assign(_.style,g.tabHeader);let w=document.createElement("div");w.textContent=Ee("tabLive"),w.className="tz-tab-btn",w.tabIndex=0,w.setAttribute("role","tab"),Object.assign(w.style,g.tabBtn,g.tabActive);let E=document.createElement("div");E.textContent=Ee("tabPlan"),E.className="tz-tab-btn",E.tabIndex=0,E.setAttribute("role","tab"),Object.assign(E.style,g.tabBtn),[w,E].forEach(B=>{B.addEventListener("keydown",J=>{(J.key==="Enter"||J.key===" ")&&(J.preventDefault(),B.click())})}),_.appendChild(w),_.appendChild(E),p.appendChild(_);let M=document.createElement("div");Object.assign(M.style,g.toolbar);let A=document.createElement("div");Object.assign(A.style,g.searchInputWrapper);let D=document.createElement("div");D.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(D.style,g.searchIcon);let h=document.createElement("input");h.placeholder=Ee("searchPlaceholder"),Object.assign(h.style,g.searchInput),h.onfocus=()=>{h.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",h.style.borderColor="rgba(26,115,232,0.3)"},h.onblur=()=>{h.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",h.style.borderColor="transparent"},h.oninput=B=>{i=B.target.value.toLowerCase(),U()},A.appendChild(D),A.appendChild(h),M.appendChild(A);let q=document.createElement("div");Object.assign(q.style,g.chipsRow),Ci.forEach(B=>{let J=document.createElement("div");J.textContent=Ee("filters")[B.id],J.id=`tz-filter-${B.id}`,J.className="tz-chip",J.tabIndex=0,J.setAttribute("role","button"),Object.assign(J.style,g.chip),B.id===r&&Object.assign(J.style,g.chipActive),J.onclick=()=>{S.playClick(),r=B.id,Array.from(q.children).forEach(G=>{Object.assign(G.style,g.chip)}),Object.assign(J.style,g.chipActive),U()},J.addEventListener("keydown",G=>{(G.key==="Enter"||G.key===" ")&&(G.preventDefault(),J.click())}),q.appendChild(J)}),M.appendChild(q),p.appendChild(M);let R=document.createElement("div");Object.assign(R.style,g.listContainer);let T=document.createElement("style");T.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",p.appendChild(T);let C=document.createElement("div");Object.assign(C.style,g.plannerWrapper,{display:"none"}),p.appendChild(R),p.appendChild(C),w.onclick=()=>I("live"),E.onclick=()=>I("plan");function I(B){S.playClick(),B==="live"?(Object.assign(w.style,g.tabActive),Object.assign(E.style,g.tabBtn),E.style.borderBottomColor="transparent",w.setAttribute("aria-selected","true"),E.setAttribute("aria-selected","false"),R.style.display="flex",M.style.display="flex",C.style.display="none",K()):(Object.assign(E.style,g.tabActive),Object.assign(w.style,g.tabBtn),w.style.borderBottomColor="transparent",C.style.display="flex",R.style.display="none",M.style.display="none",re(),z())}function k(B){return B>=9&&B<17?{color:c.success,bg:c.successBg,label:Ee("statusOpen"),icon:"\u{1F7E2}"}:B>=8&&B<9?{color:c.warning,bg:c.warningBg,label:Ee("statusOpening"),icon:"\u{1F7E1}"}:B>=17&&B<19?{color:c.warning,bg:c.warningBg,label:Ee("statusClosing"),icon:"\u{1F7E1}"}:{color:c.textSub,bg:"#F1F3F4",label:Ee("statusClosed"),icon:"\u{1F534}"}}function F(B){n.includes(B)?n=n.filter(J=>J!==B):n.push(B),localStorage.setItem(Si,JSON.stringify(n)),U(),S.playClick()}function U(){R.innerHTML="";let B=new Date,J=ro.filter(te=>{let Z=gt(te).toLowerCase().includes(i)||io(te).toLowerCase().includes(i),ne=r==="all"||te.region===r;return Z&&ne});if(J.sort((te,Z)=>{let ne=n.includes(te.id),ie=n.includes(Z.id);return ne&&!ie?-1:!ne&&ie?1:gt(te).localeCompare(gt(Z))}),J.length===0){R.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">${Ee("noLocationFound")}</div>
                </div>
            `;return}J.forEach(te=>{let Z=n.includes(te.id),ne=B.toLocaleTimeString(le()==="es"?"es-ES":"pt-BR",{timeZone:te.zone,hour:"2-digit",minute:"2-digit"}),ie=parseInt(ne.split(":")[0]),Y=k(ie),ae=ie<6||ie>18,s=document.createElement("div");s.className="tz-hub-card",s.tabIndex=0,s.setAttribute("role","button"),s.setAttribute("aria-label",`${gt(te)}, ${ne}`),Object.assign(s.style,g.hubCard),Z&&Object.assign(s.style,g.hubCardPinned);let y=Z?"\u2605":"\u2606",L=Z?"#F9AB00":"#DADCE0";s.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn tz-pin-btn" tabindex="0" role="button" aria-label="${Ee(Z?"unpin":"pin")} ${gt(te)}" style="cursor:pointer; font-size:22px; color:${L}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%;">${y}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${te.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${c.text}; letter-spacing:-0.2px;">${gt(te)}</div>
                        <div style="font-size:12px; color:${c.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${ae?"\u{1F319}":"\u2600\uFE0F"} ${io(te)}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${c.text}; font-family:'Google Sans', sans-serif;">${ne}</div>
                    <div style="font-size:11px; font-weight:600; color:${Y.color}; background:${Y.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${Y.label}
                    </div>
                </div>
            `;let b=s.querySelector(".cw-pin-btn");b.onclick=f=>{f.stopPropagation(),F(te.id)},b.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),f.stopPropagation(),F(te.id))}),s.onclick=()=>{o=te.id,I("plan")},s.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&f.target===s&&(f.preventDefault(),s.click())}),R.appendChild(s)});let G=document.createElement("div");G.style.height="20px",G.style.width="100%",R.appendChild(G)}function z(){C.innerHTML="";let B=document.createElement("div"),J=document.createElement("label");J.textContent=Ee("whereIsClient"),J.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let G=document.createElement("select");Object.assign(G.style,Do),G.style.padding="14px",[...ro].sort((x,O)=>gt(x).localeCompare(gt(O))).forEach(x=>{let O=document.createElement("option");O.value=x.id,O.textContent=`${x.flag} ${gt(x)} (${x.zone})`,x.id===o&&(O.selected=!0),G.appendChild(O)}),G.onchange=x=>{o=x.target.value,de(),S.playClick()},B.appendChild(J),B.appendChild(G),C.appendChild(B);let Z=document.createElement("div");Object.assign(Z.style,g.timeComparisonRow);let ne=document.createElement("div");Object.assign(ne.style,g.timeCard),ne.style.backgroundColor="#F8FAFF",ne.style.borderColor="#E8F0FE",ne.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} ${Ee("you")}</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">${Ee("yourTimezone")}</div>
        `;let ie=document.createElement("div");Object.assign(ie.style,g.timeCard),ie.style.backgroundColor="#FFF8E1",ie.style.borderColor="#FEF7E0",ie.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">${Ee("client")}</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,Z.appendChild(ne),Z.appendChild(ie),C.appendChild(Z);let Y=document.createElement("div");Y.id="cw-planner-status",Object.assign(Y.style,g.statusBadge),C.appendChild(Y);let ae=document.createElement("div");Object.assign(ae.style,{padding:"0 4px",marginTop:"12px"});let s=document.createElement("div");s.textContent=Ee("dragToSimulate"),s.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let y=document.createElement("div");Object.assign(y.style,g.timelineContainer);let L=document.createElement("div");Object.assign(L.style,g.timelineTrack);let b=document.createElement("div");Object.assign(b.style,g.dayZone),L.appendChild(b);let f=document.createElement("input");f.type="range",f.min="0",f.max="1439",f.step="15",f.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let N=document.createElement("div");N.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",N.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",y.appendChild(L),y.appendChild(f),y.appendChild(N),ae.appendChild(s),ae.appendChild(y),C.appendChild(ae);let m=ne.querySelector("#cw-time-input-br"),P=ie.querySelector("#cw-time-display-client"),Q=ie.querySelector("#cw-client-label");function de(){let x=ro.find(se=>se.id===o);Q.textContent=`${x.flag} ${io(x)} (${x.zone})`;let O=l.getHours(),H=l.getMinutes(),ee=`${String(O).padStart(2,"0")}:${String(H).padStart(2,"0")}`;m.value=ee,f.value=O*60+H;let oe=l.toLocaleTimeString(le()==="es"?"es-ES":"pt-BR",{timeZone:x.zone,hour:"2-digit",minute:"2-digit"});P.textContent=oe;let ce=parseInt(oe.split(":")[0]);ce>=9&&ce<17?(Y.style.background=c.successBg,Y.style.color=c.success,Y.innerHTML=`<span style="font-size:16px">\u2705</span> ${Ee("idealBusinessHours")}`):ce>=8&&ce<9||ce>=17&&ce<19?(Y.style.background=c.warningBg,Y.style.color=c.warning,Y.innerHTML=`<span style="font-size:16px">\u26A0\uFE0F</span> ${Ee("limitHours")}`):(Y.style.background=c.errorBg,Y.style.color=c.error,Y.innerHTML=`<span style="font-size:16px">\u26D4</span> ${Ee("outOfHours")}`)}f.oninput=x=>{let O=parseInt(x.target.value);l.setHours(Math.floor(O/60)),l.setMinutes(O%60),de()},m.oninput=x=>{let[O,H]=x.target.value.split(":");O&&H&&(l.setHours(parseInt(O)),l.setMinutes(parseInt(H)),de())},de()}function K(){U(),a||(a=setInterval(U,6e4))}function re(){a&&(clearInterval(a),a=null)}function W(){t=!He(u),De(t,u,"cw-btn-timezone"),t?(ke(),I("live")):(Te(),re())}return document.body.appendChild(u),Se(()=>{let B=u.querySelector(".cw-help-description");B&&(B.textContent=Ee("headerDesc")),w.textContent=Ee("tabLive"),E.textContent=Ee("tabPlan"),h.placeholder=Ee("searchPlaceholder"),Array.from(q.children).forEach(J=>{let G=Ci.find(te=>`tz-filter-${te.id}`===J.id);G&&(J.textContent=Ee("filters")[G.id])}),R.style.display!=="none"&&U(),C.style.display!=="none"&&z()}),W}var Ti={pt:{headerTitle:"Minha Biblioteca",headerDesc:"Gerencie seus snippets, textos e templates.",tabs:{general:"Geral",note:"Notas",email:"Emails"},searchPlaceholder:"Buscar por t\xEDtulo ou conte\xFAdo...",newItem:"Novo item",cancel:"Cancelar",recentlyUsed:"\u{1F552} Usados recentemente",nothingFound:"Nada encontrado",nothingHereYet:"Nada aqui ainda",noItemMatches:e=>`Nenhum item bate com "${e}" nesta aba.`,clickPlusToStart:"Clique no + para come\xE7ar sua cole\xE7\xE3o.",copy:"Copiar",moreActions:"Mais a\xE7\xF5es",edit:"Editar",delete:"Excluir",deleteConfirm:e=>`Excluir "${e}"?`,itemDeletedToast:"Item exclu\xEDdo.",copiedToast:"Copiado!",titleLabel:"T\xEDtulo / Nome",subjectLabel:"Assunto do Email",contentLabel:"Conte\xFAdo",emailBodyLabel:"Corpo do Email (HTML)",noteTextLabel:"Texto da Nota",editItemTitle:"Editar Item",newItemTitle:"Novo Item",save:"Salvar",saveChanges:"Salvar Altera\xE7\xF5es",saving:"Salvando...",bold:"Negrito",italic:"It\xE1lico",codeFormat:"Formato c\xF3digo",insertImage:"Inserir imagem",imageUrlPrompt:"Cole a URL da imagem:",fillTitleAndContent:"Preencha t\xEDtulo e conte\xFAdo.",subjectRequired:"Assunto \xE9 obrigat\xF3rio para emails.",saveFailedNoUser:"N\xE3o foi poss\xEDvel salvar: usu\xE1rio n\xE3o identificado. Recarregue a p\xE1gina e tente de novo.",savedLocalOnly:"Salvo localmente \u2014 sem conex\xE3o com a nuvem no momento.",savedAndSynced:"Salvo e sincronizado!",saveError:"Erro ao salvar item."},es:{headerTitle:"Mi Biblioteca",headerDesc:"Gestiona tus snippets, textos y plantillas.",tabs:{general:"General",note:"Notas",email:"Emails"},searchPlaceholder:"Buscar por t\xEDtulo o contenido...",newItem:"Nuevo elemento",cancel:"Cancelar",recentlyUsed:"\u{1F552} Usados recientemente",nothingFound:"No se encontr\xF3 nada",nothingHereYet:"Todav\xEDa no hay nada aqu\xED",noItemMatches:e=>`Ning\xFAn elemento coincide con "${e}" en esta pesta\xF1a.`,clickPlusToStart:"Haz clic en + para empezar tu colecci\xF3n.",copy:"Copiar",moreActions:"M\xE1s acciones",edit:"Editar",delete:"Eliminar",deleteConfirm:e=>`\xBFEliminar "${e}"?`,itemDeletedToast:"Elemento eliminado.",copiedToast:"\xA1Copiado!",titleLabel:"T\xEDtulo / Nombre",subjectLabel:"Asunto del Email",contentLabel:"Contenido",emailBodyLabel:"Cuerpo del Email (HTML)",noteTextLabel:"Texto de la Nota",editItemTitle:"Editar Elemento",newItemTitle:"Nuevo Elemento",save:"Guardar",saveChanges:"Guardar Cambios",saving:"Guardando...",bold:"Negrita",italic:"Cursiva",codeFormat:"Formato c\xF3digo",insertImage:"Insertar imagen",imageUrlPrompt:"Pega la URL de la imagen:",fillTitleAndContent:"Completa el t\xEDtulo y el contenido.",subjectRequired:"El asunto es obligatorio para emails.",saveFailedNoUser:"No se pudo guardar: usuario no identificado. Recarga la p\xE1gina e int\xE9ntalo de nuevo.",savedLocalOnly:"Guardado localmente \u2014 sin conexi\xF3n con la nube en este momento.",savedAndSynced:"\xA1Guardado y sincronizado!",saveError:"Error al guardar el elemento."}};function pe(e){let t=le();return Ti[t]?.[e]??Ti.pt[e]}var $e={tabs:{general:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',note:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z"></path><path d="M15 3v6h6"></path><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>',email:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'},search:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',clear:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',copy:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',more:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8"></circle><circle cx="12" cy="12" r="1.8"></circle><circle cx="12" cy="19" r="1.8"></circle></svg>',edit:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',delete:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',add:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',back:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',bold:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>',italic:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>',code:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',image:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',media:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',empty:'<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>'},so=[{id:"general",icon:$e.tabs.general},{id:"note",icon:$e.tabs.note},{id:"email",icon:$e.tabs.email}],lo="cw_lib_recent_v1",qi=4;function es(e){try{let t=JSON.parse(localStorage.getItem(lo)||"[]");t=t.filter(a=>a!==e),t.unshift(e),t=t.slice(0,qi*3),localStorage.setItem(lo,JSON.stringify(t))}catch(t){console.warn("Erro ao salvar uso recente",t)}}function ts(e){try{let t=JSON.parse(localStorage.getItem(lo)||"[]");if(t.length===0)return[];let a=new Map(Re.getSnippets(e).map(o=>[o.id,o]));return t.map(o=>a.get(o)).filter(Boolean).slice(0,qi)}catch{return[]}}function as(){if(document.getElementById("cw-lib-styles-v2"))return;let e=document.createElement("style");e.id="cw-lib-styles-v2",e.textContent=`
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
    `,document.head.appendChild(e)}function Li(){let e="v2.0",t=!1,a="general",o="",n=null,i=null;as();let r=document.createElement("div");r.id="library-popup",r.classList.add("cw-module-window"),Object.assign(r.style,Ge,{right:"auto",left:"50%",width:"620px",height:"680px",maxHeight:"90vh",transform:"translateX(-50%) scale(0.05)"});let l={popup:r},c=Oe(r,pe("headerTitle"),e,pe("headerDesc"),l,()=>ae());r.appendChild(c);let g=c.querySelector("span"),u=document.createElement("div");u.className="cw-lib-container",r.appendChild(u);let v=document.createElement("div");v.className="cw-lib-toolbar";let d=document.createElement("div");d.className="cw-lib-search-wrap";let p=document.createElement("div");p.className="cw-lib-search-icon",p.innerHTML=$e.search;let _=document.createElement("input");_.className="cw-lib-search no-drag",_.placeholder=pe("searchPlaceholder"),_.type="text";let w=document.createElement("div");w.className="cw-lib-search-clear cw-tactile",w.innerHTML=$e.clear,d.append(p,_,w);let E=document.createElement("div");E.className="cw-lib-tabs",so.forEach(s=>{let y=document.createElement("div");y.className="cw-lib-tab"+(s.id===a?" active":""),y.id=`lib-tab-${s.id}`,y.innerHTML=`${s.icon}<span class="js-lib-tab-label">${pe("tabs")[s.id]}</span>`,y.onmouseenter=()=>S.playHover(),y.onclick=()=>z(s.id),E.appendChild(y)}),v.append(d,E),u.appendChild(v);let M=document.createElement("div");M.className="cw-lib-grid",u.appendChild(M);let A=document.createElement("div");A.className="cw-lib-fab cw-tactile",A.title=pe("newItem"),A.innerHTML=$e.add,A.onclick=()=>te(),u.appendChild(A);let D=document.createElement("div");D.className="cw-lib-sheet";let h=document.createElement("div");h.className="cw-lib-sheet-handle";let q=document.createElement("div");q.className="cw-lib-sheet-head";let R=document.createElement("div");R.className="cw-lib-sheet-back no-drag",R.innerHTML=$e.back,R.title=pe("cancel"),R.onclick=Z;let T=document.createElement("span");T.className="cw-lib-sheet-title",T.textContent=pe("newItemTitle"),q.append(R,T);let C=document.createElement("div");C.className="cw-lib-sheet-body";let I=document.createElement("div");I.className="cw-lib-sheet-foot";let k=document.createElement("button");k.className="cw-lib-save-btn no-drag",k.textContent=pe("save"),k.onclick=ne,I.appendChild(k);let F=document.createElement("div");F.className="cw-lib-loading",F.innerHTML=`<div class="cw-lib-spinner"></div><div class="cw-lib-loading-text js-lib-saving">${pe("saving")}</div>`,D.append(h,q,C,I,F),u.appendChild(D);let U=document.createElement("div");Object.assign(U.style,it),U.className="no-drag",r.appendChild(U),rt(r,U),document.body.appendChild(r),document.addEventListener("mousedown",s=>{i&&!i.contains(s.target)&&K()});function z(s){S.playClick(),a=s,so.forEach(y=>{document.getElementById(`lib-tab-${y.id}`).classList.toggle("active",y.id===s)}),B()}function K(){if(i){let s=i.querySelector(".cw-lib-menu");s&&s.classList.remove("open"),i.classList.remove("menu-open"),i=null}}function re(s,y){return y?`${s.title} ${s.content}`.toLowerCase().includes(y):!0}function W(s){let y=document.createElement("div");y.className="cw-lib-recent-section",y.innerHTML=`<div class="cw-lib-recent-title">${pe("recentlyUsed")}</div>`;let L=document.createElement("div");return L.className="cw-lib-recent-row",s.forEach(b=>{let f=document.createElement("div");f.className="cw-lib-recent-chip",f.tabIndex=0,f.setAttribute("role","button"),f.title=b.title,f.innerHTML=`<span>${Y(b.title)}</span>`,f.onclick=()=>{S.playClick(),G(b)},f.addEventListener("keydown",N=>{(N.key==="Enter"||N.key===" ")&&(N.preventDefault(),f.click())}),L.appendChild(f)}),y.appendChild(L),y}function B(){K(),M.innerHTML="";let s=o.trim().toLowerCase(),y=Re.getSnippets(a).filter(L=>re(L,s));if(!s){let L=ts(a);L.length>0&&M.appendChild(W(L))}if(y.length===0){let L=document.createElement("div");L.className="cw-lib-empty";let b=s.length>0;L.innerHTML=`
                <div style="opacity:0.5;">${$e.empty}</div>
                <div class="cw-lib-empty-title">${pe(b?"nothingFound":"nothingHereYet")}</div>
                <div class="cw-lib-empty-sub">${b?pe("noItemMatches")(o.trim()):pe("clickPlusToStart")}</div>
            `,M.appendChild(L);return}y.forEach(L=>M.appendChild(J(L)))}function J(s){let y=document.createElement("div");y.className="cw-lib-card"+(s.isCode?" is-code":"");let L=s.content,b="";if(s.isRich){let P=document.createElement("div");P.innerHTML=s.content;let Q=!!P.querySelector("img");L=P.innerText.substring(0,200),Q&&(b=`<span class="cw-lib-media-tag">${$e.media} M\xEDdia</span>`)}let f=[s.isCode?'<span class="cw-lib-badge code">CODE</span>':"",a==="email"?'<span class="cw-lib-badge template">TEMPLATE</span>':""].join("");y.innerHTML=`
            <div class="cw-lib-card-head">
                <div class="cw-lib-card-title">${Y(s.title)}</div>
                <div class="cw-lib-card-badges">${f}</div>
            </div>
            ${b}
            <div class="cw-lib-card-preview${s.isCode?" code":""}">${Y(L)}</div>
            <div class="cw-lib-card-foot">
                <div class="cw-lib-icon-btn cw-act-copy cw-tactile" title="${pe("copy")}">${$e.copy}</div>
                <div class="cw-lib-icon-btn cw-act-more cw-tactile" title="${pe("moreActions")}">${$e.more}</div>
                <div class="cw-lib-menu">
                    <div class="cw-lib-menu-item cw-act-edit">${$e.edit} ${pe("edit")}</div>
                    <div class="cw-lib-menu-item danger cw-act-del">${$e.delete} ${pe("delete")}</div>
                </div>
            </div>
        `,y.querySelector(".cw-act-copy").onclick=P=>{P.stopPropagation(),S.playClick(),G(s)};let N=y.querySelector(".cw-act-more"),m=y.querySelector(".cw-lib-menu");return N.onclick=P=>{P.stopPropagation(),S.playClick();let Q=m.classList.contains("open");K(),Q||(m.classList.add("open"),y.classList.add("menu-open"),i=y)},y.querySelector(".cw-act-edit").onclick=P=>{P.stopPropagation(),S.playClick(),K(),te(s)},y.querySelector(".cw-act-del").onclick=async P=>{P.stopPropagation(),S.playClick(),K(),await _e(pe("deleteConfirm")(s.title))&&(Re.delete(s.id),B(),X(pe("itemDeletedToast")))},y}function G(s){if(s.isRich){let y=new Blob([s.content],{type:"text/html"}),L=document.createElement("div");L.innerHTML=s.content;let b=new Blob([L.innerText],{type:"text/plain"});navigator.clipboard.write([new ClipboardItem({"text/html":y,"text/plain":b})])}else navigator.clipboard.writeText(s.content);es(s.id),X(pe("copiedToast"))}function te(s=null){n=s?s.id:null,C.innerHTML="",C.appendChild(ie("title",pe("titleLabel"),s?s.title:"")),a==="email"&&C.appendChild(ie("subject",pe("subjectLabel"),s?s.subject:""));let y=pe("contentLabel");a==="email"&&(y=pe("emailBodyLabel")),a==="note"&&(y=pe("noteTextLabel")),C.appendChild(ie("content",y,s?s.content:"",{isRich:!0,isCode:s?s.isCode:!1})),T.textContent=pe(s?"editItemTitle":"newItemTitle"),k.textContent=pe(s?"saveChanges":"save"),D.classList.add("open"),setTimeout(()=>{let L=C.querySelector("input");L&&L.focus()},500)}function Z(){S.playSwoosh(),D.classList.remove("open"),setTimeout(()=>{n=null},500)}async function ne(){F.classList.add("active"),k.disabled=!0;try{let s=C.querySelector("#cw-lib-inp-title"),y=C.querySelector("#cw-lib-inp-content"),L=s.value.trim(),b=y.contentEditable==="true"?y.innerHTML:y.value.trim(),f=y.getAttribute("data-is-code")==="true";if(!L||!b||b==="<br>"){S.playError(),X(pe("fillTitleAndContent"),{error:!0});return}let N={id:n,type:a,title:L,content:b,isCode:f,isRich:y.contentEditable==="true"};if(a==="email"){let P=C.querySelector("#cw-lib-inp-subject").value.trim();if(!P){S.playError(),X(pe("subjectRequired"),{error:!0});return}N.subject=P}let m=await Re.save(N);if(m===!1){S.playError(),X(pe("saveFailedNoUser"),{error:!0});return}B(),Z(),m.synced===!1?(S.playError(),X(pe("savedLocalOnly"),{error:!0})):(X(pe("savedAndSynced")),S.playSuccess())}catch(s){console.error("Erro ao salvar item da biblioteca:",s),S.playError(),X(pe("saveError"),{error:!0})}finally{F.classList.remove("active"),k.disabled=!1}}function ie(s,y,L,b={}){let f=document.createElement("div");f.className="cw-lib-field";let N=document.createElement("label");N.className="cw-lib-label",N.textContent=y,f.appendChild(N);let m;if(b.isRich){let P=document.createElement("div");P.className="cw-lib-toolbar-mini",P.innerHTML=`
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-bold" title="${pe("bold")}">${$e.bold}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-italic" title="${pe("italic")}">${$e.italic}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-code" title="${pe("codeFormat")}">${$e.code}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-img" title="${pe("insertImage")}">${$e.image}</button>
            `,m=document.createElement("div"),m.className="cw-lib-input cw-lib-editable",m.contentEditable="true",m.innerHTML=L||"",b.isCode&&(m.style.fontFamily="'Roboto Mono', monospace",m.style.background="#F8F9FA",m.setAttribute("data-is-code","true"),P.querySelector(".cw-tb-code").classList.add("active")),P.querySelectorAll(".cw-lib-tb-btn").forEach(Q=>{Q.onmouseenter=()=>S.playHover(),Q.onmousedown=()=>S.playClick()}),P.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),m.focus()},P.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),m.focus()},P.querySelector(".cw-tb-code").onclick=Q=>{let x=!(m.getAttribute("data-is-code")==="true");m.setAttribute("data-is-code",String(x)),m.style.fontFamily=x?"'Roboto Mono', monospace":"inherit",m.style.background=x?"#F8F9FA":"#fff",Q.currentTarget.classList.toggle("active",x),m.focus()},P.querySelector(".cw-tb-img").onclick=async()=>{let Q=await sa(pe("imageUrlPrompt"));Q&&(document.execCommand("insertImage",!1,Q),m.querySelectorAll("img").forEach(de=>{de.style.maxWidth="100%",de.style.borderRadius="8px"}))},m.onpaste=Q=>{let de=(Q.clipboardData||Q.originalEvent.clipboardData).items;for(let x of de)if(x.kind==="file"&&x.type.startsWith("image/")){Q.preventDefault();let O=new FileReader;O.onload=H=>{document.execCommand("insertHTML",!1,`<img src="${H.target.result}" style="max-width:100%;border-radius:8px;margin:8px 0;display:block;">`)},O.readAsDataURL(x.getAsFile())}},f.appendChild(P)}else m=document.createElement("input"),m.className="cw-lib-input",m.type="text",m.value=L||"";return m.id=`cw-lib-inp-${s}`,f.appendChild(m),f}function Y(s){let y=document.createElement("div");return y.textContent=s||"",y.innerHTML}_.addEventListener("input",s=>{o=s.target.value,w.classList.toggle("visible",o.length>0),B()}),w.onclick=()=>{_.value="",o="",w.classList.remove("visible"),B(),_.focus()};function ae(){t=!He(r),De(t,r,"cw-btn-library"),t?(ke(),B()):(Te(),K())}return Se(()=>{g&&(g.textContent=pe("headerTitle"));let s=r.querySelector(".cw-help-title");s&&(s.textContent=pe("headerTitle"));let y=r.querySelector(".cw-help-description");y&&(y.textContent=pe("headerDesc")),so.forEach(b=>{let f=document.querySelector(`#lib-tab-${b.id} .js-lib-tab-label`);f&&(f.textContent=pe("tabs")[b.id])}),_.placeholder=pe("searchPlaceholder"),A.title=pe("newItem"),R.title=pe("cancel");let L=F.querySelector(".js-lib-saving");L&&(L.textContent=pe("saving")),B()}),ae}var os='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>',ns='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>',is='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',rs='<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>';function ss(e){if(document.getElementById("cw-shortcuts-styles"))return;let t=document.createElement("style");t.id="cw-shortcuts-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function Ni(e,t){ss(t);let a=document.createElement("div");a.className="cw-configs-section",a.innerHTML=`
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
    `;let o=a.querySelector(".js-sc-body"),n=a.querySelector(".js-sc-sort-toggle");n.onchange=async d=>{S.playClick(),await qe.setSortedByUsage(d.target.checked),l()};function i(d){let p=Ie[d.payload.subStatus],_=p?p.name:d.payload.subStatus,w=(d.payload.scenarios||[]).length,E=[d.payload.caseType.toUpperCase(),_,w===1?e("scOneScenario"):e("scNScenarios").replace("{n}",w)];return d.alias&&E.push(`"${d.alias}"`),E.join(" \xB7 ")}function r(d,p,_){if(d.textContent="",_){let w=document.createElement("span");w.className="cw-sc-warn",w.textContent=e("scBroken"),d.appendChild(w),d.appendChild(document.createTextNode(" \xB7 "))}d.appendChild(document.createTextNode(i(p)))}function l(){o.innerHTML="",n.checked=qe.isSortedByUsage();let d=qe.isSortedByUsage(),p=d?qe.list():qe.listRaw(),_=!d;if(!p.length){let E=document.createElement("div");E.className="cw-sc-empty",E.textContent=e("scEmpty"),o.appendChild(E)}p.forEach((E,M)=>{let A=Cn(E),D=document.createElement("div");D.className="cw-sc-item"+(A.length?" broken":""),D.dataset.id=E.id,D.dataset.index=String(M),D.innerHTML=`
                ${_?`<button type="button" class="cw-sc-grip" aria-label="${e("scReorder")}">${ns}</button>`:""}
                <span class="cw-sc-bolt">${os}</span>
                <span class="cw-sc-text">
                    <span class="cw-sc-label"></span>
                    <span class="cw-sc-meta"></span>
                </span>
                <button type="button" class="cw-sc-iconbtn js-sc-edit" aria-label="${e("scEdit")}">${is}</button>
                <button type="button" class="cw-sc-iconbtn danger js-sc-del" aria-label="${e("scDelete")}">${rs}</button>
            `;let h=D.querySelector(".cw-sc-label");h.textContent=E.label,h.title=E.label,r(D.querySelector(".cw-sc-meta"),E,A.length>0),D.querySelector(".js-sc-edit").onclick=()=>v(E),D.querySelector(".js-sc-del").onclick=()=>c(E),_&&g(D,M,p.length),o.appendChild(D)});let w=document.createElement("button");w.type="button",w.className="cw-sc-add",w.textContent=e("scAdd"),w.disabled=p.length>=ut,w.disabled&&(w.textContent=e("scLimit").replace("{max}",ut)),w.onclick=()=>v(null),o.appendChild(w)}async function c(d){await _e(e("scDeleteConfirm").replace("{name}",d.label),{danger:!0})&&(await qe.remove(d.id),S.playClick(),l())}function g(d,p,_){let w=d.querySelector(".cw-sc-grip");d.draggable=!0;let E=!1;w.onmousedown=()=>{E=!0},d.onmouseup=()=>{E=!1},w.onkeydown=async M=>{let A=M.key==="ArrowUp"?-1:M.key==="ArrowDown"?1:0;if(!A)return;M.preventDefault();let D=p+A;if(D<0||D>=_)return;await qe.reorder(d.dataset.id,D),S.playClick(),l();let h=o.querySelector(`.cw-sc-item[data-id="${d.dataset.id}"] .cw-sc-grip`);h&&h.focus()},d.ondragstart=M=>{if(!E){M.preventDefault();return}M.dataTransfer.effectAllowed="move",M.dataTransfer.setData("text/plain",d.dataset.id),d.classList.add("dragging")},d.ondragend=()=>{d.classList.remove("dragging"),E=!1,o.querySelectorAll(".drop-target").forEach(M=>M.classList.remove("drop-target"))},d.ondragover=M=>{M.preventDefault(),d.classList.add("drop-target")},d.ondragleave=()=>d.classList.remove("drop-target"),d.ondrop=async M=>{M.preventDefault(),d.classList.remove("drop-target");let A=M.dataTransfer.getData("text/plain");!A||A===d.dataset.id||(await qe.reorder(A,Number(d.dataset.index)),S.playClick(),l())}}function u(){let d=[];for(let p in Ie){let _=Ie[p].status;_&&!d.includes(_)&&d.push(_)}return d}function v(d){let _=!!d?JSON.parse(JSON.stringify(d)):{id:ta(),kind:"note",label:"",alias:"",payload:{caseType:"bau",status:"",subStatus:"",scenarios:[]}};o.innerHTML="";let w=document.createElement("div");w.style.cssText="display: flex; flex-direction: column; gap: 14px;",w.innerHTML=`
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
        `,o.appendChild(w);let E=w.querySelector("#cw-sc-name"),M=w.querySelector("#cw-sc-alias"),A=w.querySelector("#cw-sc-type"),D=w.querySelector("#cw-sc-status"),h=w.querySelector("#cw-sc-sub"),q=w.querySelector(".js-sc-scenarios");E.value=_.label,M.value=_.alias,A.value=_.payload.caseType,D.innerHTML='<option value="">\u2014</option>'+u().map(I=>`<option value="${I}">${I}</option>`).join(""),D.value=_.payload.status;function R(){let I=D.value;h.innerHTML='<option value="">\u2014</option>';for(let k in Ie){if(Ie[k].status!==I)continue;let F=document.createElement("option");F.value=k,F.textContent=Ie[k].name,h.appendChild(F)}h.disabled=!I}function T(){if(q.innerHTML="",!h.value){q.innerHTML=`<div class="cw-configs-desc">${e("scPickSubStatus")}</div>`;return}let I=ca(h.value,A.value);if(!I.length){q.innerHTML=`<div class="cw-configs-desc">${e("scNoScenarios")}</div>`;return}I.forEach(([k])=>{let F=document.createElement("button");F.type="button",F.className="cw-sc-chip",F.textContent=da(k,h.value);let U=()=>_.payload.scenarios.some(z=>z.id===k);F.classList.toggle("on",U()),F.onclick=()=>{U()?_.payload.scenarios=_.payload.scenarios.filter(z=>z.id!==k):_.payload.scenarios.push({id:k,substatus:h.value}),F.classList.toggle("on",U()),S.playClick()},q.appendChild(F)})}R(),h.value=_.payload.subStatus,T(),D.onchange=()=>{_.payload.scenarios=[],R(),h.value="",T()},h.onchange=()=>{_.payload.scenarios=[],T()},A.onchange=()=>{_.payload.scenarios=[],T()},w.querySelector(".cw-sc-cancel").onclick=()=>{S.playClick(),l()};let C=w.querySelector(".cw-sc-save");C.onclick=async()=>{if(!h.value){S.playError(),X(e("scPickSubStatus"),{error:!0});return}let I=C.textContent;C.disabled=!0,C.textContent=e("scSaving");let k=E.value.trim()||Ie[h.value].name,F=await qe.save({..._,label:k,alias:M.value.trim(),payload:{..._.payload,caseType:A.value,status:D.value||String(h.value).split("_")[0],subStatus:h.value}});if(!F.ok){C.disabled=!1,C.textContent=I,S.playError(),X(e("scLimit").replace("{max}",ut),{error:!0});return}S.playSuccess(),X(F.synced?e("scSaved"):e("scSavedLocal")),l()}}return a.refresh=l,a.applyTexts=()=>{a.querySelector(".js-sc-title").textContent=e("scSectionTitle"),a.querySelector(".js-sc-sort-label").textContent=e("scSortLabel"),a.querySelector(".js-sc-sort-desc").textContent=e("scSortDesc"),l()},l(),a}var ls={pt:{title:"Configura\xE7\xF5es",headerDesc:"Personalize sua experi\xEAncia e prefer\xEAncias.",profileNotFound:"Perfil n\xE3o localizado na base de dados.",consultant:"Consultor",overheadBadge:"Gest\xE3o / Overhead",soundSectionTitle:"Prefer\xEAncias de Som",soundLabel:"Efeitos Sonoros",soundDesc:"Ativar ou desativar sons de interface.",langSectionTitle:"Idioma da Interface",langLabel:"Idioma",langDesc:"Escolha o idioma dos menus, bot\xF5es e mensagens do Case Wizard.",supportSectionTitle:"Suporte & Feedback",reportBug:"Reportar Bug/Sugest\xF5es",diagSectionTitle:"Diagn\xF3stico",diagLabel:"Ambiente do backend",diagDesc:"Qual implanta\xE7\xE3o do Apps Script este bundle usa. O sufixo tem de bater com o do dashboard.",scSectionTitle:"Meus Atalhos (Ctrl+K)",scSortLabel:"Ordenar por frequ\xEAncia de uso",scSortDesc:"Desligue para definir voc\xEA mesmo a ordem, arrastando os atalhos.",scEmpty:"Voc\xEA ainda n\xE3o tem atalhos. Crie um aqui ou monte uma nota no Case Notes e clique em \u201CSalvar como atalho\u201D.",scAdd:"+ Criar atalho",scLimit:"Limite de {max} atalhos atingido",scEdit:"Editar atalho",scDelete:"Excluir atalho",scReorder:"Reordenar (arraste ou use as setas)",scDeleteConfirm:"Excluir o atalho \u201C{name}\u201D?",scBroken:"\u26A0 cen\xE1rio indispon\xEDvel",scOneScenario:"1 cen\xE1rio",scNScenarios:"{n} cen\xE1rios",scName:"Nome",scNamePlaceholder:"Ex: Fim do 2 Day Rule",scAlias:"Apelido de busca",scAliasPlaceholder:"Ex: 2day",scAliasDesc:"Palavra que encontra este atalho no Ctrl+K, al\xE9m do nome.",scFlow:"Fluxo",scStatus:"Status",scSubStatus:"Substatus",scScenarios:"Cen\xE1rios",scScenariosDesc:"Opcional: sem nenhum, o atalho s\xF3 abre a nota j\xE1 no substatus certo.",scPickSubStatus:"Escolha um substatus primeiro.",scNoScenarios:"Nenhum cen\xE1rio dispon\xEDvel para esta combina\xE7\xE3o.",scCancel:"Cancelar",scSave:"Salvar",scSaving:"Salvando\u2026",scSaved:"Atalho salvo!",scSavedLocal:"Atalho salvo neste navegador (sem conex\xE3o com a nuvem)."},es:{title:"Configuraci\xF3n",headerDesc:"Personaliza tu experiencia y tus preferencias.",profileNotFound:"Perfil no encontrado en la base de datos.",consultant:"Consultor",overheadBadge:"Gesti\xF3n / Overhead",soundSectionTitle:"Preferencias de Sonido",soundLabel:"Efectos de Sonido",soundDesc:"Activar o desactivar los sonidos de la interfaz.",langSectionTitle:"Idioma de la Interfaz",langLabel:"Idioma",langDesc:"Elige el idioma de los men\xFAs, botones y mensajes del Case Wizard.",supportSectionTitle:"Soporte y Comentarios",reportBug:"Reportar error o sugerencia",diagSectionTitle:"Diagn\xF3stico",diagLabel:"Entorno del backend",diagDesc:"Qu\xE9 implementaci\xF3n de Apps Script usa este bundle. El sufijo debe coincidir con el del panel.",scSectionTitle:"Mis Atajos (Ctrl+K)",scSortLabel:"Ordenar por frecuencia de uso",scSortDesc:"Desact\xEDvalo para definir t\xFA mismo el orden, arrastrando los atajos.",scEmpty:"Todav\xEDa no tienes atajos. Crea uno aqu\xED o arma una nota en Case Notes y haz clic en \u201CGuardar como atajo\u201D.",scAdd:"+ Crear atajo",scLimit:"L\xEDmite de {max} atajos alcanzado",scEdit:"Editar atajo",scDelete:"Eliminar atajo",scReorder:"Reordenar (arrastra o usa las flechas)",scDeleteConfirm:"\xBFEliminar el atajo \u201C{name}\u201D?",scBroken:"\u26A0 escenario no disponible",scOneScenario:"1 escenario",scNScenarios:"{n} escenarios",scName:"Nombre",scNamePlaceholder:"Ej: Fin del 2 Day Rule",scAlias:"Apodo de b\xFAsqueda",scAliasPlaceholder:"Ej: 2day",scAliasDesc:"Palabra que encuentra este atajo en el Ctrl+K, adem\xE1s del nombre.",scFlow:"Flujo",scStatus:"Estado",scSubStatus:"Subestado",scScenarios:"Escenarios",scScenariosDesc:"Opcional: sin ninguno, el atajo solo abre la nota ya en el subestado correcto.",scPickSubStatus:"Elige un subestado primero.",scNoScenarios:"Ning\xFAn escenario disponible para esta combinaci\xF3n.",scCancel:"Cancelar",scSave:"Guardar",scSaving:"Guardando\u2026",scSaved:"\xA1Atajo guardado!",scSavedLocal:"Atajo guardado en este navegador (sin conexi\xF3n con la nube)."}};function Ii(){let e=_o(ls),t="v1.1",a=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0",warnBorder:"#F9AB00",warnBg:"#FFFBF0",warnText:"#B06000"},n="cw-configs-styles";if(!document.getElementById(n)){let k=document.createElement("style");k.id=n,k.innerHTML=`
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
        `,document.head.appendChild(k)}let i=document.createElement("div");i.id="configs-popup",i.classList.add("cw-module-window"),Object.assign(i.style,Ge,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let r={popup:i},l=Oe(i,e("title"),t,e("headerDesc"),r,()=>I());i.appendChild(l);let c=l.querySelector("span"),g=document.createElement("div");g.className="cw-configs-container",i.appendChild(g);let u=document.createElement("div");u.className="cw-profile-card",u.id="cw-user-profile-section",u.style.display="none",g.appendChild(u);let v;function d(k,F){if(v={ldap:k,profile:F},!F){u.innerHTML=`
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
            `;return}u.innerHTML=`
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
    `}async function p(){u.style.display="flex",u.innerHTML=`
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
        `,(async()=>{try{Le()||await Pt();let k=Le(),F=k?k.split("@")[0]:"user",U=await kt(F);d(F,U)}catch(k){console.warn("Erro ao renderizar perfil:",k),u.style.display="none"}})()}p();let _=document.createElement("div");if(_.className="cw-configs-section",_.innerHTML=`
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
        `,document.head.appendChild(k)}let w=_.querySelector("#cw-config-lang-toggle");function E(){w.querySelectorAll("button").forEach(k=>{k.classList.toggle("active",k.dataset.lang===le())})}E(),w.querySelectorAll("button").forEach(k=>{k.onclick=()=>{Ma(k.dataset.lang),S.playClick()}}),g.appendChild(_);let M=Ni(e,o);g.appendChild(M);let A=document.createElement("div");A.className="cw-configs-section",A.innerHTML=`
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
    `;let D=A.querySelector("#cw-config-sound-toggle");D.onchange=k=>{S.setMuted(!k.target.checked),k.target.checked&&S.playClick()},g.appendChild(A);let h=document.createElement("div");h.className="cw-configs-section",h.innerHTML=`
        <div class="cw-configs-section-title js-support-section-title"></div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn js-support-link" href="https://forms.gle/8icwk1TejBTDYsJS6" target="_blank"></a>
            </div>
        </div>
    `,g.appendChild(h);let q=Dt(),R=document.createElement("div");R.className="cw-configs-section",R.innerHTML=`
        <div class="cw-configs-section-title js-diag-section-title"></div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label js-diag-label"></div>
                    <div class="cw-configs-desc js-diag-desc"></div>
                </div>
                <div class="cw-env-chip ${q.isDev?"is-dev":"is-prod"}"></div>
            </div>
        </div>
    `,R.querySelector(".cw-env-chip").textContent=`${q.isDev?"DEV":"PROD"} \xB7 \u2026${q.fingerprint}`,g.appendChild(R);let T=document.createElement("style");T.innerHTML=`
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
    `,R.appendChild(T);function C(){v&&d(v.ldap,v.profile),_.querySelector(".js-lang-section-title").textContent=e("langSectionTitle"),_.querySelector(".js-lang-label").textContent=e("langLabel"),_.querySelector(".js-lang-desc").textContent=e("langDesc"),E(),M.applyTexts(),A.querySelector(".js-sound-section-title").textContent=e("soundSectionTitle"),A.querySelector(".js-sound-label").textContent=e("soundLabel"),A.querySelector(".js-sound-desc").textContent=e("soundDesc"),h.querySelector(".js-support-section-title").textContent=e("supportSectionTitle"),h.querySelector(".js-support-link").textContent=e("reportBug"),R.querySelector(".js-diag-section-title").textContent=e("diagSectionTitle"),R.querySelector(".js-diag-label").textContent=e("diagLabel"),R.querySelector(".js-diag-desc").textContent=e("diagDesc"),c&&(c.textContent=e("title"));let k=i.querySelector(".cw-help-title");k&&(k.textContent=e("title"));let F=i.querySelector(".cw-help-description");F&&(F.textContent=e("headerDesc"))}C(),Se(C);function I(){a=!He(i),De(a,i,"cw-btn-configs"),a?(M.refresh(),ke(),S.playClick()):Te()}return document.body.appendChild(i),I}var ht={blue:"#1A73E8",red:"#D93025",yellow:"#F9AB00",green:"#1E8E3E",blueLight:"#E8F0FE",redLight:"#FCE8E6",yellowLight:"#FEF7E0",greenLight:"#E6F4EA",textPrimary:"#202124",textSecondary:"#5F6368",border:"#DADCE0",surface:"rgba(255, 255, 255, 0.8)",white:"#FFFFFF"};var At="cubic-bezier(0.4, 0, 0.2, 1)",Up=`all 0.3s ${At}`,_i=()=>{if(document.getElementById("bau-form-global-styles"))return;let e=document.createElement("style");e.id="bau-form-global-styles",e.textContent=`
    /* --- 1. POSICIONAMENTO E ANCORAGEM --- */
    .bau-popup {
      width: 650px;
      max-width: 95vw;
      max-height: 90vh;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: ${Me.MODULE_RESTING};
      
      background: #FFFFFF; 
      display: flex;
      flex-direction: column;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 12px 40px rgba(0,0,0,0.12);
      border: 1px solid #DADCE0;
      
      transform-origin: center center;
      animation: cw-genie-effect-in 0.4s ${At};
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
        animation: bauAuraCombined 5s ${At} 0.2s infinite;
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
        color: ${ht.green};
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
        animation: bauCheckDraw 0.55s ${At} 0.75s forwards;
    }

    .bau-success-view.active .bau-success-title {
        font-size: 24px;
        font-weight: 700;
        color: #202124;
        margin: 0 0 8px 0;
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${At} 0.85s forwards;
    }

    .bau-success-view.active .bau-success-subtitle {
        font-size: 15px;
        color: #5F6368;
        margin-bottom: 36px;
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${At} 0.95s forwards;
    }

    .bau-success-view.active #bau-success-back-btn {
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${At} 1.05s forwards;
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
  `,document.head.appendChild(e)};var xt={steps:[{id:0,title:"Selecione o tipo de atendimento",isBranching:!0},{id:1,title:"Contexto e Valida\xE7\xE3o",fields:[{id:"advName",name:"advName",label:"Nome do Anunciante",type:"text",placeholder:"Nome do Anunciante",required:!0,isSmart:!0},{id:"cid",name:"cid",label:"CID",type:"text",placeholder:"000-000-0000",required:!0,isSmart:!0,tooltip:"Use o formato 000-000-0000 ou 10 d\xEDgitos",validation:{regex:"^(\\d{3}-\\d{3}-\\d{4}|\\d{10})$",error:"Formato de CID incorreto"}},{id:"amName",name:"amName",label:"Account Manager (AM)",type:"text",placeholder:"Nome do AM",required:!0,isSmart:!0},{id:"website",name:"website",label:"Website",type:"text",placeholder:"https://www.exemplo.com",required:!0,isSmart:!0},{id:"seId",name:"seId",label:"Speakeasy ID (SE ID)",type:"text-with-button",placeholder:"Speakeasy ID",required:!1,isSmart:!0,button:{id:"bau-top-se-search",icon:"wand",title:"Buscar ID automaticamente"}}]},{id:2,title:"Tasks",fields:[{id:"reason",name:"reason",label:"O que deve ser feito em BAU",type:"textarea",placeholder:"Descreva as a\xE7\xF5es esperadas...",required:!0,style:{minHeight:"80px"}},{id:"taskType",name:"taskType",label:"Tasks para BAU (Selecione 1 ou mais)",type:"checkbox-grid",required:!0,tooltip:"Selecione os tipos de implementa\xE7\xE3o t\xE9cnica",options:["Ads Conversion Tracking","Ads Dynamic Remarketing","Ads Enhanced Conversions","Ads Website Call Conversion","Ads Remarketing","Analytics Cross Domain Tracking","Analytics E-Commerce Tracking","Analytics Enhanced E-Commerce Tracking","Analytics Event Tracking","Analytics Health Check","Analytics Remarketing","Analytics Setup","Fix GA4 implementation","Consent Mode","Fix Sitewide Tagging (OGT & CT)","Google Tag Manager Installation","Customer Match"]}]},{id:3,title:"Justificativa e Agendamento",fields:[{id:"nonImplementationReason",name:"nonImplementationReason",label:"Motivo da N\xE3o Implementa\xE7\xE3o (Justificativa BAU)",type:"select",required:!0,options:[{value:"",text:"Selecione um motivo..."},{value:"Tempo da consultoria esgotado",text:"Tempo da consultoria esgotado"},{value:"Solicita\xE7\xE3o de reagendamento pelo anunciante",text:"Solicita\xE7\xE3o de reagendamento pelo anunciante"},{value:"Falta de acessos ou backup do site",text:"Falta de acessos ou backup do site"},{value:"Anunciante indispon\xEDvel ou n\xE3o preparado",text:"Anunciante indispon\xEDvel ou n\xE3o preparado"},{value:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)",text:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"},{value:"Solicita\xE7\xE3o de tarefas (tasks) adicionais",text:"Solicita\xE7\xE3o de tarefas (tasks) adicionais"},{value:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)",text:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"},{value:"Retorno de contato ap\xF3s prazo de 14 dias expirado",text:"Retorno de contato ap\xF3s prazo de 14 dias expirado"}]},{id:"description",i18nKey:"description_justificativa",name:"description",label:"Justificativa / Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva detalhadamente o que precisa ser feito...",required:!0},{id:"availability",name:"availability",label:"Disponibilidade (m\xEDnimo 1 op\xE7\xE3o)",type:"datetime-group",required:!0,fields:[{name:"availability_1",label:"Op\xE7\xE3o 1 (Prioridade)",required:!0},{name:"availability_2",label:"Op\xE7\xE3o 2 (Opcional)",required:!1},{name:"availability_3",label:"Op\xE7\xE3o 3 (Opcional)",required:!1}]}]},{id:4,title:"Confirma\xE7\xE3o",isConfirmation:!0},{id:5,title:"Solicitar Descarte",fields:[{id:"caseId",name:"caseId",label:"Case ID",type:"text",placeholder:"Case ID",required:!0,isSmart:!0},{id:"language",name:"language",label:"Idioma",type:"text",placeholder:"Idioma",required:!0,isSmart:!0},{id:"seId",i18nKey:"seId_descarte",name:"seId",label:"Speakeasy ID (SE ID)",type:"text",placeholder:"Speakeasy ID",required:!0,isSmart:!0},{id:"description",i18nKey:"description_descarte",name:"description",label:"Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva o motivo do descarte...",required:!0},{id:"discardReason",name:"reason",label:"Motivo do Descarte",type:"select",required:!0,groups:[{label:"Live Appointments",options:[{value:"Caso Filho gerado no atendimento",text:"Caso Filho gerado no atendimento"},{value:"3\xAA Tentativa de contato sem sucesso",text:"3\xAA Tentativa de contato sem sucesso"}]},{label:"Live Meet",options:[{value:"Apenas o AM presente",text:"Apenas o AM presente"},{value:"Estouro de tempo para conclus\xE3o",text:"Estouro de tempo para conclus\xE3o"},{value:"Gera\xE7\xE3o de caso BAU (Reagendamento)",text:"Gera\xE7\xE3o de caso BAU (Reagendamento)"}]}]}]}]};var cs={advName:{label:"Nombre del Anunciante",placeholder:"Nombre del Anunciante"},cid:{label:"CID",placeholder:"000-000-0000",tooltip:"Usa el formato 000-000-0000 o 10 d\xEDgitos",error:"Formato de CID incorrecto"},amName:{label:"Account Manager (AM)",placeholder:"Nombre del AM"},website:{label:"Website",placeholder:"https://www.ejemplo.com"},seId:{label:"Speakeasy ID (SE ID)",placeholder:"Speakeasy ID",buttonTitle:"Buscar ID autom\xE1ticamente"},seId_descarte:{label:"Speakeasy ID (SE ID)",placeholder:"Speakeasy ID"},reason:{label:"Qu\xE9 debe hacerse en BAU",placeholder:"Describe las acciones esperadas..."},taskType:{label:"Tareas para BAU (Selecciona 1 o m\xE1s)",tooltip:"Selecciona los tipos de implementaci\xF3n t\xE9cnica"},nonImplementationReason:{label:"Motivo de la No Implementaci\xF3n (Justificaci\xF3n BAU)"},description_justificativa:{label:"Justificaci\xF3n / Descripci\xF3n",placeholder:"Describe detalladamente qu\xE9 se necesita hacer..."},availability:{label:"Disponibilidad (m\xEDnimo 1 opci\xF3n)"},availability_1:{label:"Opci\xF3n 1 (Prioridad)"},availability_2:{label:"Opci\xF3n 2 (Opcional)"},availability_3:{label:"Opci\xF3n 3 (Opcional)"},caseId:{label:"Case ID",placeholder:"Case ID"},language:{label:"Idioma",placeholder:"Idioma"},description_descarte:{label:"Descripci\xF3n",placeholder:"Describe el motivo del descarte..."},discardReason:{label:"Motivo del Descarte"}},ds={"Selecione um motivo...":"Selecciona un motivo...","Tempo da consultoria esgotado":"Tiempo de la consultor\xEDa agotado","Solicita\xE7\xE3o de reagendamento pelo anunciante":"Solicitud de reprogramaci\xF3n por parte del anunciante","Falta de acessos ou backup do site":"Falta de accesos o copia de seguridad del sitio","Anunciante indispon\xEDvel ou n\xE3o preparado":"Anunciante no disponible o no preparado","Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)":"Implementaci\xF3n parcial (no todas las tareas completadas)","Solicita\xE7\xE3o de tarefas (tasks) adicionais":"Solicitud de tareas adicionales","Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)":"Necesidad de nuevos cambios (fase de seguimiento)","Retorno de contato ap\xF3s prazo de 14 dias expirado":"Retorno de contacto despu\xE9s de vencido el plazo de 14 d\xEDas","Caso Filho gerado no atendimento":"Caso Hijo generado en la atenci\xF3n","3\xAA Tentativa de contato sem sucesso":"3.\xBA intento de contacto sin \xE9xito","Apenas o AM presente":"Solo el AM presente","Estouro de tempo para conclus\xE3o":"Tiempo excedido para la conclusi\xF3n","Gera\xE7\xE3o de caso BAU (Reagendamento)":"Generaci\xF3n de caso BAU (Reprogramaci\xF3n)"};function ps(e){return e?.i18nKey||e?.id||e?.name}function Xe(e,t){let a=e?.[t];return le()!=="es"?a:cs[ps(e)]?.[t]??a}function at(e){return le()!=="es"?e:ds[e]??e}var Fi={pt:{statusPending:"Aguardando TL",statusApproved:"Aprovado / Criado",statusDiscarded:"Descartado pelo TL",statusCanceled:"Cancelado",statusDefault:"Pendente",timezoneWarningStrong:"Aten\xE7\xE3o:",timezoneWarningText:"Para clientes fora do fuso hor\xE1rio do Brasil, o hor\xE1rio inserido deve corresponder sempre ao hor\xE1rio local do cliente, e n\xE3o ao do agente.",checkTimezone:"Consultar Time Zone",timezoneModuleNotFound:"M\xF3dulo Time Zone n\xE3o encontrado.",headerTitle:"BAU Central",headerDesc:"Dashboard de Casos BAU",openBauCase:"Abrir caso para BAU",openBauCaseDesc:"Fluxo completo para implementa\xE7\xF5es t\xE9cnicas e suporte especializado.",requestDiscard:"Solicitar Descarte",requestDiscardDesc:"Fluxo simplificado para casos que n\xE3o requerem implementa\xE7\xE3o.",back:"Voltar",next:"Pr\xF3ximo",configuringEdit:"Configurando Edi\xE7\xE3o...",loadDashboardError:"Erro ao carregar Dashboard. Verifique sua conex\xE3o.",copiedToClipboard:"Copiado para a \xE1rea de transfer\xEAncia!",noAdditionalContext:"Nenhum contexto adicional fornecido pelo agente.",notCaptured:"N\xE3o capturado",none:"Nenhuma",language:"Idioma",editPageWarning:"Aten\xE7\xE3o: Para editar as informa\xE7\xF5es, voc\xEA deve estar com a p\xE1gina deste Caso espec\xEDfico aberta no sistema. Caso contr\xE1rio, os dados capturados estar\xE3o incorretos.",onCorrectPage:"Estou na p\xE1gina correta",sending:"Enviando...",caseCreatedNoEmailConfirm:"Caso criado, mas n\xE3o conseguimos confirmar por email.",unknownError:"Erro desconhecido",newBauCase:"Novo Caso BAU",backToDashboard:"Voltar ao Dashboard",confirmDataBeforeSending:"Confirme os dados antes de enviar",submitToTl:"Enviar para o TL",saveChanges:"Salvar Altera\xE7\xF5es",editingCase:e=>`Editando Caso #${e}`,fillDetailsBelow:"Preencha os detalhes abaixo",caseSentSuccess:"Caso enviado com sucesso!",caseSentSuccessSub:"Sua solicita\xE7\xE3o foi recebida e ser\xE1 processada em breve.",genericErrorTitle:"Ops! Algo deu errado",genericErrorSub:"N\xE3o conseguimos carregar seus casos BAU no momento.",tryAgain:"Tentar Novamente",notInformed:"N\xE3o informado",reasonTooltip:"O que deve ser feito em BAU",reasonPrefix:"Motivo:",metricAwaitingTl:"Aguardando TL",caseDetailsTitle:"Detalhes do Caso",copy:"Copiar",advertiser:"Anunciante",status:"Status",cidLabel:"CID",caseIdLabel:"Case ID",speakeasyId:"Speakeasy ID",advertiserEmail:"Email do Anunciante",site:"Site",timezone:"Timezone",responsibleAm:"AM Respons\xE1vel",salesProgram:"Programa de Vendas",bauReason:"Motivo BAU",requestedTasks:"Tasks solicitadas",justification:"Justificativa",detailedDescription:"Descri\xE7\xE3o detalhada",availability:"Disponibilidade",urgent:"Urgente",undefinedName:"Nome indefinido",customerIdTooltip:"Customer ID do Anunciante",cidTooltip:"CID do Anunciante (Formato: 000-000-0000)",incompleteData:"Dados Incompletos",invalidCid:"CID Inv\xE1lido",contactSupport:"Contate o Suporte",editRequest:"Editar Solicita\xE7\xE3o",edit:"Editar",refresh:"Atualizar",noRecentCases:"Nenhum caso recente",casesWillAppear:"Seus casos BAU aparecer\xE3o aqui",createdApproved:"Criados / Aprovados",refreshDashboard:"Atualizar Dashboard",errorPrefix:e=>`Erro: ${e}`,selectAtLeastOne:e=>`Erro: Selecione pelo menos uma op\xE7\xE3o para "${e}".`,fieldRequiredDouble:e=>`Erro: O campo "${e}" \xE9 obrigat\xF3rio.`,fieldRequiredSingle:e=>`Erro: O campo '${e}' \xE9 obrigat\xF3rio.`,whatMustBeDone:"O que deve ser feito",editTasksHint:"Para editar as tasks, volte ao Passo 2",bauJustification:"Justificativa BAU",description:"Descri\xE7\xE3o",availabilityPriority:"Disponibilidade (Prioridade)",editingCaseHash:e=>`Voc\xEA est\xE1 editando o caso #${e}`,editingDiscardHash:e=>`Voc\xEA est\xE1 editando o descarte do caso #${e}`,discardReason:"Motivo do Descarte",discardDescription:"Descri\xE7\xE3o do Descarte",notInformedPlaceholder:"N\xE3o informado",caseUpdatedSuccess:"Caso atualizado com sucesso!",caseDiscardSentSuccess:"Caso enviado para descarte com sucesso!"},es:{statusPending:"Esperando al TL",statusApproved:"Aprobado / Creado",statusDiscarded:"Descartado por el TL",statusCanceled:"Cancelado",statusDefault:"Pendiente",timezoneWarningStrong:"Atenci\xF3n:",timezoneWarningText:"Para clientes fuera del huso horario de Brasil, el horario ingresado siempre debe corresponder al horario local del cliente, no al del agente.",checkTimezone:"Consultar Time Zone",timezoneModuleNotFound:"M\xF3dulo Time Zone no encontrado.",headerTitle:"BAU Central",headerDesc:"Panel de Casos BAU",openBauCase:"Abrir caso para BAU",openBauCaseDesc:"Flujo completo para implementaciones t\xE9cnicas y soporte especializado.",requestDiscard:"Solicitar Descarte",requestDiscardDesc:"Flujo simplificado para casos que no requieren implementaci\xF3n.",back:"Volver",next:"Siguiente",configuringEdit:"Configurando Edici\xF3n...",loadDashboardError:"Error al cargar el Panel. Verifica tu conexi\xF3n.",copiedToClipboard:"\xA1Copiado al portapapeles!",noAdditionalContext:"Ning\xFAn contexto adicional proporcionado por el agente.",notCaptured:"No capturado",none:"Ninguna",language:"Idioma",editPageWarning:"Atenci\xF3n: Para editar la informaci\xF3n, debes tener abierta en el sistema la p\xE1gina de este Caso espec\xEDfico. De lo contrario, los datos capturados estar\xE1n incorrectos.",onCorrectPage:"Estoy en la p\xE1gina correcta",sending:"Enviando...",caseCreatedNoEmailConfirm:"Caso creado, pero no pudimos confirmar por email.",unknownError:"Error desconocido",newBauCase:"Nuevo Caso BAU",backToDashboard:"Volver al Panel",confirmDataBeforeSending:"Confirma los datos antes de enviar",submitToTl:"Enviar al TL",saveChanges:"Guardar Cambios",editingCase:e=>`Editando Caso #${e}`,fillDetailsBelow:"Completa los detalles a continuaci\xF3n",caseSentSuccess:"\xA1Caso enviado con \xE9xito!",caseSentSuccessSub:"Tu solicitud fue recibida y ser\xE1 procesada en breve.",genericErrorTitle:"\xA1Ups! Algo sali\xF3 mal",genericErrorSub:"No pudimos cargar tus casos BAU en este momento.",tryAgain:"Intentar de Nuevo",notInformed:"No informado",reasonTooltip:"Qu\xE9 debe hacerse en BAU",reasonPrefix:"Motivo:",metricAwaitingTl:"Esperando al TL",caseDetailsTitle:"Detalles del Caso",copy:"Copiar",advertiser:"Anunciante",status:"Estado",cidLabel:"CID",caseIdLabel:"Case ID",speakeasyId:"Speakeasy ID",advertiserEmail:"Email del Anunciante",site:"Sitio",timezone:"Timezone",responsibleAm:"AM Responsable",salesProgram:"Programa de Ventas",bauReason:"Motivo BAU",requestedTasks:"Tareas solicitadas",justification:"Justificaci\xF3n",detailedDescription:"Descripci\xF3n detallada",availability:"Disponibilidad",urgent:"Urgente",undefinedName:"Nombre indefinido",customerIdTooltip:"Customer ID del Anunciante",cidTooltip:"CID del Anunciante (Formato: 000-000-0000)",incompleteData:"Datos Incompletos",invalidCid:"CID Inv\xE1lido",contactSupport:"Contacta al Soporte",editRequest:"Editar Solicitud",edit:"Editar",refresh:"Actualizar",noRecentCases:"Ning\xFAn caso reciente",casesWillAppear:"Tus casos BAU aparecer\xE1n aqu\xED",createdApproved:"Creados / Aprobados",refreshDashboard:"Actualizar Panel",errorPrefix:e=>`Error: ${e}`,selectAtLeastOne:e=>`Error: Selecciona al menos una opci\xF3n para "${e}".`,fieldRequiredDouble:e=>`Error: El campo "${e}" es obligatorio.`,fieldRequiredSingle:e=>`Error: El campo '${e}' es obligatorio.`,whatMustBeDone:"Qu\xE9 debe hacerse",editTasksHint:"Para editar las tareas, vuelve al Paso 2",bauJustification:"Justificaci\xF3n BAU",description:"Descripci\xF3n",availabilityPriority:"Disponibilidad (Prioridad)",editingCaseHash:e=>`Est\xE1s editando el caso #${e}`,editingDiscardHash:e=>`Est\xE1s editando el descarte del caso #${e}`,discardReason:"Motivo del Descarte",discardDescription:"Descripci\xF3n del Descarte",notInformedPlaceholder:"No informado",caseUpdatedSuccess:"\xA1Caso actualizado con \xE9xito!",caseDiscardSentSuccess:"\xA1Caso enviado a descarte con \xE9xito!"}};function $(e){let t=le();return Fi[t]?.[e]??Fi.pt[e]}var Ae={add:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',back:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',wand:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.41l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/></svg>',send:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',check:'<svg width="64" height="64" viewBox="0 0 24 24" fill="none"><path class="bau-check-path" d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',folder:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',empty:'<svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.44 2s2.75-.81 3.44-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z"/></svg>',refresh:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',expand:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>'};function Mi(e){switch(e){case"PENDING_TL_CREATION":return{text:$("statusPending"),class:"status-yellow",aura:"status-yellow-aura"};case"CREATED":return{text:$("statusApproved"),class:"status-green",aura:"status-green-aura"};case"DISCARDED":return{text:$("statusDiscarded"),class:"status-red",aura:"status-red-aura"};case"CANCELED_BY_AGENT":return{text:$("statusCanceled"),class:"status-gray",aura:""};default:return{text:e||$("statusDefault"),class:"status-gray",aura:""}}}function Oi(e){let t=document.createElement("div");if(t.className="bau-dynamic-input",t.id=`wrapper-${e.id}`,e.label){let o=document.createElement("label");o.className="bau-label",o.textContent=Xe(e,"label"),e.tooltip&&o.setAttribute("data-tooltip",Xe(e,"tooltip")),t.appendChild(o)}let a;switch(e.type){case"textarea":a=document.createElement("textarea"),a.style.minHeight="80px",t.appendChild(a);break;case"select":a=document.createElement("select"),e.groups?e.groups.forEach(r=>{let l=document.createElement("optgroup");l.label=r.label,r.options.forEach(c=>{let g=document.createElement("option");g.value=c.value,g.textContent=at(c.text),l.appendChild(g)}),a.appendChild(l)}):e.options&&e.options.forEach(r=>{let l=document.createElement("option");l.value=r.value,l.textContent=at(r.text),a.appendChild(l)}),t.appendChild(a);break;case"checkbox-grid":return a=document.createElement("div"),a.className="bau-tasks-grid",e.options.forEach(r=>{let l=document.createElement("label");l.className="bau-task-item",l.innerHTML=`<input type="checkbox" name="${e.name}" value="${r}"><span>${r}</span>`,l.addEventListener("click",c=>{c.preventDefault();let g=l.querySelector("input");g.checked=!g.checked,l.classList.toggle("active",g.checked),S.playClick()}),a.appendChild(l)}),t.appendChild(a),t;case"datetime-group":a=document.createElement("div"),a.className="bau-availability-container",e.fields.forEach(r=>{let l=document.createElement("div");l.className="bau-availability-field",l.innerHTML=`
                    <span class="bau-field-hint">${Xe(r,"label")}</span>
                    <input type="datetime-local" name="${r.name}" class="bau-input" ${r.required?"required":""}>
                `,a.appendChild(l)});let o=document.createElement("div");return o.className="bau-availability-disclaimer",o.innerHTML=`
                <div class="bau-disclaimer-text">
                    <strong>${$("timezoneWarningStrong")}</strong> ${$("timezoneWarningText")}
                </div>
                <button type="button" class="bau-timezone-link" id="bau-open-timezone">
                    ${Ae.refresh}
                    ${$("checkTimezone")}
                </button>
            `,o.querySelector("#bau-open-timezone").onclick=()=>{let r=document.getElementById("cw-btn-timezone");r?(r.click(),S.playClick()):(S.playError(),X($("timezoneModuleNotFound"),{error:!0}))},t.appendChild(a),t.appendChild(o),t;case"text-with-button":let n=document.createElement("div");n.className="bau-input-group",a=document.createElement("input"),a.type="text";let i=document.createElement("button");i.type="button",i.id=e.button.id,i.className="bau-mini-btn-input",i.title=Xe(e,"buttonTitle")||e.button.title,i.innerHTML=Ae[e.button.icon]||"",n.appendChild(a),n.appendChild(i),t.appendChild(n);break;default:a=document.createElement("input"),a.type="text",t.appendChild(a)}return a&&e.type!=="checkbox-grid"&&e.type!=="datetime-group"&&(a.id=`bau-form-${e.id}`,a.name=e.name,a.className=e.type==="select"?"bau-select":e.type==="textarea"?"bau-textarea":"bau-input",e.placeholder&&(a.placeholder=Xe(e,"placeholder")),e.required&&(a.required=!0)),t}function Di(){_i();let e=!1,t="dashboard",a=null,o=0,n="BAU",i=!1,r=null,l=xt.steps.length,c=document.createElement("div");c.id="bau-form-popup",c.className="bau-popup cw-module-window",c.style.display="none";let g=$("headerTitle"),u=$("headerDesc"),v=Oe(c,g,"v2.2.0",u,{},()=>ae());c.appendChild(v);let d=document.createElement("div");d.className="bau-view-container",c.appendChild(d);let p=document.createElement("div");p.id="bau-view-details",p.className="bau-details-view",d.appendChild(p);let _=document.createElement("div");_.id="bau-view-dashboard",_.className="bau-view active",_.innerHTML=`
        <div class="bau-dashboard-content">
            <div class="bau-dashboard-metrics" id="bau-dashboard-metrics"></div>
            <ul class="bau-case-list" id="bau-case-list-container"></ul>
        </div>
        <button class="bau-dashboard-fab" id="bau-new-case-btn">
            ${Ae.add}
            <span class="js-bau-new-case">${$("newBauCase")}</span>
        </button>
    `,d.appendChild(_);let w=document.createElement("div");w.id="bau-view-form",w.className="bau-view";let E=document.createElement("div");E.className="bau-view-header",E.innerHTML=`
      <button class="bau-back-btn" id="bau-form-back-btn">
        ${Ae.back}
        <span class="js-bau-back-dashboard">${$("backToDashboard")}</span>
      </button>
    `,w.appendChild(E);let M=document.createElement("div");M.className="bau-content",w.appendChild(M);let A=document.createElement("div");A.className="bau-form-loading-overlay",A.innerHTML=`
        <div class="bau-spinner"></div>
        <div class="bau-loading-text js-bau-configuring-edit">${$("configuringEdit")}</div>
    `,M.appendChild(A);let D=s=>{A.classList.toggle("active",s)},h=document.createElement("div");h.className="bau-progress-indicator",M.appendChild(h);let q=document.createElement("form");q.id="bau-escalation-form",q.noValidate=!0,M.appendChild(q),xt.steps.forEach(s=>{let y=document.createElement("div");if(y.className="bau-step"+(s.id===o?" active":""),y.id=`bau-step-${s.id}`,s.isBranching)y.innerHTML=`
                <div class="bau-branching-container">
                    <div class="bau-branching-card" id="bau-opt-full">
                        <div class="bau-branching-icon">${Ae.add}</div>
                        <h3 class="bau-branching-title">${$("openBauCase")}</h3>
                        <p class="bau-branching-subtitle">${$("openBauCaseDesc")}</p>
                    </div>
                    <div class="bau-branching-card" id="bau-opt-discard">
                        <div class="bau-branching-icon">${Ae.empty}</div>
                        <h3 class="bau-branching-title">${$("requestDiscard")}</h3>
                        <p class="bau-branching-subtitle">${$("requestDiscardDesc")}</p>
                    </div>
                </div>
            `,y.querySelector("#bau-opt-full").onclick=()=>{n="BAU",o=1,q.querySelectorAll(".bau-highlight-panel").forEach(L=>L.classList.remove("discard-theme")),B(),S.playClick()},y.querySelector("#bau-opt-discard").onclick=()=>{n="DISCARD",o=5,q.querySelectorAll(".bau-highlight-panel").forEach(L=>L.classList.add("discard-theme")),B(),S.playClick()};else if(s.isConfirmation)y.innerHTML=`
                <div class="bau-card">
                    <h3 class="bau-step-title">${$("confirmDataBeforeSending")}</h3>
                    <div id="bau-confirmation-details"></div>
                </div>
            `;else{let L=document.createElement("div");if(L.className="bau-card",s.id===1||s.id===5){L.innerHTML=`
                    <div class="bau-vital-highlights bau-highlight-panel"></div>
                    <div class="bau-dynamic-inputs-container"></div>
                    <div class="bau-all-data"></div>
                `;let b=L.querySelector(".bau-dynamic-inputs-container");s.fields.forEach(N=>{b.appendChild(Oi(N))});let f=L.querySelector("#wrapper-cid");if(f){let N=document.createElement("div");N.id="bau-cid-error",N.className="bau-cid-error-hint",N.style.display="none",N.textContent="Formato de CID incorreto",f.appendChild(N)}}else s.fields.forEach(b=>{L.appendChild(Oi(b))});y.appendChild(L)}q.appendChild(y)});let R=document.createElement("div");R.className="bau-footer";let T=document.createElement("button");T.type="button",T.id="bau-step-back-btn",T.className="bau-btn-secondary",T.textContent=$("back");let C=document.createElement("button");C.type="button",C.id="bau-step-next-btn",C.className="bau-btn-primary",C.textContent=$("next");let I=document.createElement("button");I.type="submit",I.className="bau-btn-submit",I.innerHTML=`${Ae.send} ${$("submitToTl")}`,I.style.display="none",R.appendChild(T),R.appendChild(C),R.appendChild(I),q.appendChild(R),d.appendChild(w);let k=document.createElement("div");k.id="bau-view-success",k.className="bau-view bau-success-view",k.innerHTML=`
        <div class="bau-success-content">
            <div class="bau-success-icon" style="color: ${ht.green};">${Ae.check}</div>
            <h2 class="bau-success-title js-bau-success-title">${$("caseSentSuccess")}</h2>
            <p class="bau-success-subtitle js-bau-success-sub">${$("caseSentSuccessSub")}</p>
            <button class="bau-btn-primary js-bau-success-back" id="bau-success-back-btn">${$("backToDashboard")}</button>
        </div>
    `,d.appendChild(k),document.body.appendChild(c);function F(s){t=s,c.querySelectorAll(".bau-view").forEach(N=>N.classList.remove("active"));let y=c.querySelector(`#bau-view-${s}`);y&&y.classList.add("active");let L=v.querySelector(".cw-module-header-title")||v.querySelector("h2"),b=v.querySelector(".cw-module-header-subtitle")||v.querySelector("p");L&&(s==="form"?L.textContent=i?$("editingCase")(r):$("newBauCase"):L.textContent=$("headerTitle")),b&&(b.textContent=$(s==="form"?"fillDetailsBelow":"headerDesc"));let f=q.querySelector(".bau-btn-submit");f&&(f.innerHTML=i?`${Ae.send} ${$("saveChanges")}`:`${Ae.send} ${$("submitToTl")}`)}function U(){let s=c.querySelector("#bau-case-list-container"),y=c.querySelector("#bau-dashboard-metrics");y&&(y.innerHTML=`
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
            `),s&&(s.innerHTML=Array(5).fill(0).map(()=>`
            <div class="bau-skeleton-card">
                <div class="bau-shimmer"></div>
            </div>
        `).join(""))}async function z(){let s=c.querySelector("#bau-case-list-container"),y=c.querySelector("#bau-dashboard-metrics");if(!(!s||!y)){U();try{let L=await yo();if(!Array.isArray(L))throw new Error("API response is not a valid array");W(L)}catch(L){console.error("Critical Error loading BAU cases:",L),y&&(y.innerHTML=""),s.innerHTML=`
                <div class="bau-empty-state bau-error-state">
                    <div style="color: ${ht.red}; margin-bottom: 16px;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    </div>
                    <h3 class="bau-empty-title">${$("genericErrorTitle")}</h3>
                    <p class="bau-empty-subtitle">${$("genericErrorSub")}</p>
                    <button class="bau-btn-secondary" id="bau-retry-btn" style="margin-top: 16px;">
                        ${$("tryAgain")}
                    </button>
                </div>
            `,c.querySelector("#bau-retry-btn")?.addEventListener("click",()=>z()),S.playError(),X($("loadDashboardError"),{error:!0})}}}function K(s){if(!s)return;let y=Mi(s.status),L=(f,N)=>{navigator.clipboard.writeText(f).then(()=>{X($("copiedToClipboard")),S.playClick();let m=N.style.color;N.style.color="#1E8E3E",setTimeout(()=>{N.style.color=m},800)})};p.innerHTML=`
            <div class="bau-details-header">
                <h2 class="bau-details-title">${$("caseDetailsTitle")}</h2>
                <button class="bau-details-close-btn">
                    ${Ae.back}
                    ${$("back")}
                </button>
            </div>
            <div class="bau-details-content">
                <div class="bau-details-grid">
                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${$("advertiser")}</span>
                            <span class="bau-details-value">${s.advName||"---"}</span>
                            <button class="bau-copy-btn" title="${$("copy")}">${Ae.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${$("status")}</span>
                            <span class="bau-case-status-badge ${y.class}">${y.text}</span>
                        </div>
                    </div>
                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${$("cidLabel")}</span>
                            <span class="bau-details-value">${s.cid||"---"}</span>
                            <button class="bau-copy-btn" title="${$("copy")}">${Ae.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${$("caseIdLabel")}</span>
                            <span class="bau-details-value">${s.caseId||"---"}</span>
                            <button class="bau-copy-btn" title="${$("copy")}">${Ae.wand}</button>
                        </div>
                    </div>

                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${$("speakeasyId")}</span>
                            <span class="bau-details-value">${s.seId||"---"}</span>
                            <button class="bau-copy-btn" title="${$("copy")}">${Ae.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${$("advertiserEmail")}</span>
                            <span class="bau-details-value">${s.advEmail||"---"}</span>
                            <button class="bau-copy-btn" title="${$("copy")}">${Ae.wand}</button>
                        </div>
                    </div>
                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${$("site")}</span>
                            <span class="bau-details-value">${s.site||"---"}</span>
                            <button class="bau-copy-btn" title="${$("copy")}">${Ae.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${$("timezone")}</span>
                            <span class="bau-details-value">${s.timezone||"---"}</span>
                        </div>
                    </div>

                    <div class="bau-details-card full-width">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${$("language")}</span>
                            <span class="bau-details-value">${s.language||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${$("responsibleAm")}</span>
                            <span class="bau-details-value">${s.amName||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${$("salesProgram")}</span>
                            <span class="bau-details-value">${s.salesProgram||"---"}</span>
                        </div>
                    </div>

                    <div class="bau-details-card full-width">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${$("bauReason")}</span>
                            <span class="bau-details-value">${s.reason||$("notInformed")}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${$("requestedTasks")}</span>
                            <span class="bau-details-value">${s.task||s.taskType||$("none")}</span>
                        </div>
                    </div>

                    <div class="bau-details-card full-width">
                        <div class="bau-details-row">
                            <span class="bau-details-label">${$("justification")}</span>
                            <span class="bau-details-value">${s.nonImplementationReason||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${$("detailedDescription")}</span>
                            <span class="bau-details-value">${s.description||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">${$("availability")}</span>
                            <span class="bau-details-value">${ra(s.availability)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;let b=p.querySelector(".bau-details-close-btn");b.onclick=()=>{p.classList.remove("active"),S.playSwoosh(),setTimeout(()=>{p.style.display="none"},600)},p.querySelectorAll(".bau-copy-btn").forEach(f=>{f.onclick=N=>{let m=N.target.closest(".bau-details-row").querySelector(".bau-details-value").textContent;L(m,f)}}),p.style.display="flex",requestAnimationFrame(()=>{p.classList.add("active"),S.playClick()})}function re(s){if(!s)return"";let y=Mi(s?.status),L=ra(s?.date),b="",f="";if(s?.status==="PENDING_TL_CREATION"&&s?.availability_1){let de=new Date(s.availability_1),x=new Date;(de<=x||de-x<36e5*2)&&(b=`<span class="bau-sla-badge">${$("urgent")}</span>`,f="bau-pulse-attention")}let N=s?.reason&&s.reason.trim()?s.reason:$("noAdditionalContext"),P=/^(\d{3}-\d{3}-\d{4}|\d{10})$/.test(s?.cid||""),Q=!s?.caseId||s.caseId==="N/A"||!P;return Q&&s?.status==="PENDING_TL_CREATION"&&(f="bau-pulse-attention"),`
            <li class="bau-case-card ${y.aura} ${f}" data-case-id="${s?.id||""}">
                <div class="bau-case-main">
                    <div class="bau-case-icon">${Ae.folder}</div>
                    <div class="bau-case-info">
                        <div class="bau-case-header">
                            <h3 class="bau-case-title">${s?.advName||$("undefinedName")}</h3>
                            ${b}
                            <span class="bau-case-date">${L}</span>
                        </div>
                        <p class="bau-case-details">
                            <span data-tooltip="${$("customerIdTooltip")}">Case: ${s?.caseId||"N/A"}</span> \u2022
                            <span data-tooltip="${$("cidTooltip")}" class="${P?"":"bau-error-text"}">CID: ${s?.cid||"N/A"}</span> \u2022
                            <span data-tooltip="${$("reasonTooltip")}">${$("reasonPrefix")} ${N}</span>
                        </p>
                        ${Q?`<div class="bau-data-error-hint">${!s?.caseId||s?.caseId==="N/A"?$("incompleteData"):$("invalidCid")} - ${$("contactSupport")}</div>`:""}
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                    <span class="bau-case-status-badge ${y.class}">${y.text}</span>
                    ${s?.status&&s.status.includes("PENDING")?`
                        <button class="bau-case-edit-btn" data-id="${s.id}" title="${$("editRequest")}">
                            ${Ae.edit}
                            ${$("edit")}
                        </button>
                    `:""}
                </div>
            </li>
        `}function W(s){let y=c.querySelector("#bau-case-list-container"),L=c.querySelector("#bau-dashboard-metrics");if(!y||!L)return;let b=Array.isArray(s)?s.filter(Boolean):[];if(b.length===0){L.innerHTML=`
                <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard">
                    ${Ae.refresh}
                    ${$("refresh")}
                </button>
            `,y.innerHTML=`
                <div class="bau-empty-state">
                    ${Ae.empty}
                    <h3 class="bau-empty-title">${$("noRecentCases")}</h3>
                    <p class="bau-empty-subtitle">${$("casesWillAppear")}</p>
                </div>
            `,c.querySelector("#bau-refresh-dashboard")?.addEventListener("click",()=>z());return}let f=b.filter(de=>de.status==="PENDING_TL_CREATION").length,N=b.filter(de=>de.status==="CREATED").length;L.innerHTML=`
            <div class="bau-metric-card">
                <span class="bau-metric-value">${f}</span>
                <span class="bau-metric-label">${$("metricAwaitingTl")}</span>
            </div>
            <div class="bau-metric-card">
                <span class="bau-metric-value">${N}</span>
                <span class="bau-metric-label">${$("createdApproved")}</span>
            </div>
            <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard" title="${$("refreshDashboard")}">
                ${Ae.refresh}
            </button>
        `;let m=L.querySelector("#bau-refresh-dashboard");m?.addEventListener("click",async()=>{m.classList.contains("spinning")||(m.classList.add("spinning"),S.playClick(),await z(),setTimeout(()=>m.classList.remove("spinning"),1e3))}),y.innerHTML="";let P=b.slice(0,5),Q=b.slice(5);if(P.forEach(de=>{let x=re(de),O=document.createElement("div");O.innerHTML=x;let H=O.firstElementChild;H.addEventListener("click",oe=>{oe.target.closest(".bau-case-edit-btn")||K(de)});let ee=H.querySelector(".bau-case-edit-btn");ee&&(ee.onclick=oe=>{oe.stopPropagation(),ie(de)}),y.appendChild(H)}),Q.length>0){let de=document.createElement("li");de.className="bau-accordion-container";let x=document.createElement("button");x.className="bau-accordion-toggle",x.innerHTML=`${Ae.expand} <span>Mostrar ${Q.length} casos mais antigos</span>`;let O=document.createElement("ul");O.className="bau-case-list bau-accordion-content",O.style.display="none",Q.forEach(H=>{let ee=re(H),oe=document.createElement("div");oe.innerHTML=ee;let ce=oe.firstElementChild;ce.addEventListener("click",we=>{we.target.closest(".bau-case-edit-btn")||K(H)});let se=ce.querySelector(".bau-case-edit-btn");se&&(se.onclick=we=>{we.stopPropagation(),ie(H)}),O.appendChild(ce)}),x.addEventListener("click",()=>{let H=O.style.display==="none";O.style.display=H?"block":"none",x.classList.toggle("expanded",H),x.querySelector("span").textContent=H?"Esconder casos mais antigos":`Mostrar ${Q.length} casos mais antigos`,S.playClick()}),de.appendChild(x),de.appendChild(O),y.appendChild(de)}}function B(){let s=n==="BAU"?[1,2,3,4]:[5,4];q.querySelectorAll(".bau-step").forEach(b=>{let f=parseInt(b.id.replace("bau-step-","")),N=f===o,m=s.includes(f)||f===0;b.classList.toggle("active",N),b.style.display=N?"block":"none",b.querySelectorAll("input, select, textarea").forEach(P=>{P.disabled=!m})});let y=o===0;if(h.style.display=y?"none":"flex",!y){h.innerHTML="";let b=n==="BAU"?[1,2,3,4]:[5,4];b.forEach((f,N)=>{let m=document.createElement("div"),P=f===o,Q=b.indexOf(o),de=N<Q;m.className=`bau-progress-step ${P?"active":de?"completed":""}`,m.textContent=N+1,h.appendChild(m)})}let L=o===4;T.style.display=o>0?"inline-block":"none",C.style.display=!y&&!L?"inline-block":"none",I.style.display=L?"flex":"none",L&&ne()}function J(s){let y=xt.steps.find(L=>L.id===s);if(!y||!y.fields||y.isConfirmation)return!0;for(let L of y.fields){let b=q.querySelector(`#bau-step-${s} #wrapper-${L.id}`);if(!(b&&b.style.display==="none")&&L.validation){let f=q.querySelector(`#bau-step-${s} [name="${L.name}"]`);if(f&&f.offsetParent!==null&&f.value.trim())if(new RegExp(L.validation.regex).test(f.value.trim())){f.classList.remove("invalid-cid");let m=q.querySelector("#bau-cid-error");m&&(m.style.display="none")}else{console.warn(`Validation failed for field "${L.name}" in step ${s}: Regex mismatch.`),S.playError(),X($("errorPrefix")(Xe(L,"error")||L.validation.error),{error:!0}),f.classList.add("invalid-cid");let m=q.querySelector("#bau-cid-error");return m&&(m.style.display="flex"),!1}}}return!0}function G(s){if(!q.querySelector(`#bau-step-${s}`))return!1;let L=xt.steps.find(f=>f.id===s);if(!L||!L.fields||L.isConfirmation)return!0;let b=!0;for(let f of L.fields){let N=q.querySelector(`#bau-step-${s} #wrapper-${f.id}`);if(!(N&&N.style.display==="none")&&f.required){let m=!0,P="";if(f.type==="checkbox-grid")q.querySelector(`#bau-step-${s} input[name="${f.name}"]:checked`)||(P="No option selected in checkbox-grid",S.playError(),X($("selectAtLeastOne")(Xe(f,"label")),{error:!0}),m=!1);else if(f.type==="datetime-group"){let Q=q.querySelector(`#bau-step-${s} input[name="${f.fields[0].name}"]`);if(!Q||Q.offsetParent===null)continue;Q.value.trim()||(P="Datetime group first field is empty",S.playError(),X($("fieldRequiredDouble")(Xe(f.fields[0],"label")),{error:!0}),m=!1)}else{let Q=q.querySelector(`#bau-step-${s} [name="${f.name}"]`);if(!Q||Q.offsetParent===null)continue;Q.value.trim()||(P="Field is empty",S.playError(),X($("fieldRequiredSingle")(Xe(f,"label")),{error:!0}),m=!1)}if(!m){console.warn(`Validation failed for required field "${f.name}" in step ${s}: ${P}`),b=!1;break}}}return b}C.addEventListener("click",()=>{if(J(o)&&G(o)){n==="BAU"?o++:o===5?o=4:o++,B();let s=c.querySelector(".bau-content");s&&(s.scrollTop=0),S.playClick()}}),T.addEventListener("click",()=>{o>0&&(n==="BAU"?o--:o===4?o=5:o===5?o=0:o--,B(),S.playClick())});async function te(){let s=await Je()||{};(!s.amName||s.amName==="N/A")&&(s.amName=s.internalEmail||"N/A"),a=s,q.querySelectorAll(".bau-vital-highlights").forEach(b=>{let f=[{label:"Anunciante",value:s.advName},{label:"CID",value:s.cid},{label:"Website",value:s.website||s.site},{label:"Case ID",value:s.caseId}];b.innerHTML=f.map(N=>{let m=N.value&&N.value!=="N/A"&&N.value!=="undefined"&&N.value!=="null"?N.value:$("notCaptured");return`
                    <div class="bau-highlight-item">
                        <span class="bau-highlight-label">${N.label}</span>
                        <span class="bau-highlight-value">${m}</span>
                    </div>
                `}).join("")}),xt.steps.forEach(b=>{b.fields&&b.fields.forEach(f=>{if(f.isSmart){let N=s[f.id];f.id==="language"&&s.userProfile?.defaultLanguage&&(N=s.userProfile.defaultLanguage);let m=q.querySelector(`#bau-step-${b.id} [name="${f.name}"]`),P=q.querySelector(`#bau-step-${b.id} #wrapper-${f.id}`);if(m&&(m.value=N&&N!=="N/A"?N:"",f.id==="language"&&N&&N!=="N/A"&&(m.readOnly=!0,m.style.background="#F1F3F4",m.style.cursor="not-allowed")),P){let Q=N&&N!==""&&N!=="N/A"&&N!=="undefined"&&N!=="null";f.id==="language"?P.style.display="block":P.style.display=Q?"none":"block"}}})}),q.querySelectorAll(".bau-all-data").forEach(b=>{let f=[{label:"Anunciante",value:s.advName},{label:"CID",value:s.cid},{label:"AM",value:s.amName},{label:"SE ID",value:s.seId},{label:"Site",value:s.website||s.site},{label:"Email",value:s.email},{label:"Timezone",value:s.timezone},{label:"Case ID",value:s.caseId},{label:"Programa",value:s.salesProgram},{label:"Idioma",value:s.language}];b.innerHTML=`
                <div class="bau-context-badges-grid">
                    ${f.filter(N=>N.value&&N.value!=="N/A"&&N.value!=="---"&&N.value!=="undefined"&&N.value!=="null").map(N=>`
                            <div class="bau-context-badge">
                                <span class="bau-badge-label">${N.label}:</span>
                                <span class="bau-badge-value">${N.value}</span>
                            </div>
                        `).join("")}
                </div>
            `})}c.querySelector("#bau-top-se-search")?.addEventListener("click",s=>{s.preventDefault(),ua("bau-form-seId")});let Z=c.querySelector("#bau-form-cid");Z&&Z.addEventListener("input",()=>J(1));function ne(){let s=new FormData(q),y=Object.fromEntries(s.entries()),L=c.querySelector("#bau-confirmation-details");if(L){if(n==="BAU"){let b=s.getAll("taskType"),f=b.length>0?b.join(", "):$("none");L.innerHTML=`
                ${i?`<div class="bau-highlight-panel" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${ht.yellow}; background: rgba(255, 186, 0, 0.05); border-radius: 8px; font-weight: 500;">${$("editingCaseHash")(`<span style="color: ${ht.yellow}">${r}</span>`)}</div>`:""}
                <div class="bau-confirmation-grid">
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Anunciante</span>
                        <input class="bau-confirm-value-input" data-field="advName" data-step="1" value="${y.advName||""}" placeholder="---">
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
                        <input class="bau-confirm-value-input" data-field="seId" data-step="1" value="${y.seId||""}" placeholder="${$("notInformedPlaceholder")}">
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${$("whatMustBeDone")}</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="reason" data-step="2" placeholder="---">${y.reason||""}</textarea>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Tasks</span>
                        <span class="bau-confirm-value-input" style="cursor: default; opacity: 0.8;" title="${$("editTasksHint")}">${f}</span>
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${$("bauJustification")}</span>
                        <select class="bau-confirm-value-input" data-field="nonImplementationReason" data-step="3">
                            <option value="Tempo da consultoria esgotado" ${y.nonImplementationReason==="Tempo da consultoria esgotado"?"selected":""}>${at("Tempo da consultoria esgotado")}</option>
                            <option value="Solicita\xE7\xE3o de reagendamento pelo anunciante" ${y.nonImplementationReason==="Solicita\xE7\xE3o de reagendamento pelo anunciante"?"selected":""}>${at("Solicita\xE7\xE3o de reagendamento pelo anunciante")}</option>
                            <option value="Falta de acessos ou backup do site" ${y.nonImplementationReason==="Falta de acessos ou backup do site"?"selected":""}>${at("Falta de acessos ou backup do site")}</option>
                            <option value="Anunciante indispon\xEDvel ou n\xE3o preparado" ${y.nonImplementationReason==="Anunciante indispon\xEDvel ou n\xE3o preparado"?"selected":""}>${at("Anunciante indispon\xEDvel ou n\xE3o preparado")}</option>
                            <option value="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)" ${y.nonImplementationReason==="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"?"selected":""}>${at("Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)")}</option>
                            <option value="Solicita\xE7\xE3o de tarefas (tasks) adicionais" ${y.nonImplementationReason==="Solicita\xE7\xE3o de tarefas (tasks) adicionais"?"selected":""}>${at("Solicita\xE7\xE3o de tarefas (tasks) adicionais")}</option>
                            <option value="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)" ${y.nonImplementationReason==="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"?"selected":""}>${at("Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)")}</option>
                            <option value="Retorno de contato ap\xF3s prazo de 14 dias expirado" ${y.nonImplementationReason==="Retorno de contato ap\xF3s prazo de 14 dias expirado"?"selected":""}>${at("Retorno de contato ap\xF3s prazo de 14 dias expirado")}</option>
                        </select>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${$("description")}</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="3" placeholder="---">${y.description||""}</textarea>
                    </div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${$("availabilityPriority")}</span>
                        <input type="datetime-local" class="bau-confirm-value-input" data-field="availability_1" data-step="3" value="${y.availability_1||""}">
                    </div>
                </div>
            `}else L.innerHTML=`
                ${i?`<div class="bau-highlight-panel discard-theme" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${ht.red}; background: rgba(217, 48, 37, 0.05); border-radius: 8px; font-weight: 500;">${$("editingDiscardHash")(`<span style="color: ${ht.red}">${r}</span>`)}</div>`:""}
                <div class="bau-confirmation-grid">
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Case ID</span>
                        <input class="bau-confirm-value-input" data-field="caseId" data-step="5" value="${y.caseId||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Idioma</span>
                        <input class="bau-confirm-value-input" data-field="language" data-step="5" value="${y.language||""}" placeholder="---" readonly style="opacity: 0.7;">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Speakeasy ID</span>
                        <input class="bau-confirm-value-input" data-field="seId" data-step="5" value="${y.seId||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">${$("discardReason")}</span>
                        <input class="bau-confirm-value-input" data-field="reason" data-step="5" value="${y.reason||""}" placeholder="---" readonly style="opacity: 0.7;">
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">${$("discardDescription")}</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="5" placeholder="---">${y.description||""}</textarea>
                    </div>
                </div>
            `;L.querySelectorAll(".bau-confirm-value-input").forEach(b=>{b.addEventListener("input",f=>{let N=f.target.dataset.field,m=f.target.dataset.step;if(!N||!m)return;let P=q.querySelector(`#bau-step-${m} [name="${N}"]`);P&&(P.value=f.target.value,N==="cid"&&J(1))})})}}async function ie(s){if(!await _e($("editPageWarning"),{confirmText:$("onCorrectPage")}))return;D(!0),Y(),i=!0,r=s.id,n=s.status==="PENDING_TL_DISCARD"||s.reason&&!s.task?"DISCARD":"BAU",F("form"),await te(),a={...a,advName:s.advName||a.advName,cid:s.cid||a.cid,caseId:s.caseId||a.caseId,seId:s.seId||a.seId,site:s.site||s.website||a.site||a.website,email:s.advEmail||a.email,timezone:s.timezone||a.timezone,language:s.language||a.language,amName:s.amName||a.amName,salesProgram:s.salesProgram||a.salesProgram};let L=s.availability?s.availability.split("|").map(b=>b.trim()):[];q.querySelectorAll("input, select, textarea").forEach(b=>{let f=b.name,m={advEmail:"advEmail",website:"site",site:"site"}[f]||f;if(f==="taskType"){let P=(s.task||s.taskType||"").split(",").map(Q=>Q.trim());b.type==="checkbox"&&(b.checked=P.includes(b.value),b.closest(".bau-task-item")?.classList.toggle("active",b.checked))}else if(f.startsWith("availability_")){let P=parseInt(f.split("_")[1])-1,Q=L[P];if(Q&&b.type==="datetime-local")try{let de=new Date(Q);if(!isNaN(de.getTime())){let x=new Date(de.getTime()-de.getTimezoneOffset()*6e4).toISOString().slice(0,16);b.value=x}}catch{}}else s[m]!==void 0?b.value=s[m]:f==="reason"?b.value=s.reason:f==="description"?b.value=s.description:f==="nonImplementationReason"&&(b.value=s.nonImplementationReason||"")}),o=n==="BAU"?1:5,B(),S.playClick(),setTimeout(()=>D(!1),500)}q.onsubmit=async s=>{s.preventDefault();let y=n==="BAU"?[1,2,3]:[5];for(let P of y)if(!xt.steps.find(de=>de.id===P)?.isConfirmation&&(!J(P)||!G(P))){console.warn(`Form submission blocked by validation failure in step ${P}`),o=P,B();return}let L=c.querySelector(".bau-btn-submit");L.disabled=!0,L.innerHTML=$("sending");let b=new FormData(q),f=Object.fromEntries(b.entries()),N=a||{},m={...N,...f,requestType:n};if(f.advEmail?m.advEmail=f.advEmail:N.email&&(m.advEmail=N.email),f.website?m.website=f.website:N.website?m.website=N.website:N.site&&(m.website=N.site),n==="BAU"){let P=b.getAll("taskType"),Q=[f.availability_1,f.availability_2,f.availability_3].filter(de=>de&&de.trim()!=="").join(" | ");m.taskType=P.join(", "),m.availability=Q,i?(f.nonImplementationReason?m.nonImplementationReason=f.nonImplementationReason:delete m.nonImplementationReason,f.description?m.description=f.description:delete m.description):(m.nonImplementationReason=f.nonImplementationReason||"",m.description=f.description||"",m.nonImplementationReason||console.warn("Aviso: Campo 'Justificativa' (nonImplementationReason) est\xE1 saindo vazio."),m.description||console.warn("Aviso: Campo 'Descri\xE7\xE3o detalhada' (description) est\xE1 saindo vazio."))}else m.reason=f.reason,i?(f.description?m.description=f.description:delete m.description,delete m.taskType,delete m.availability,delete m.nonImplementationReason):(m.taskType="",m.availability="",m.nonImplementationReason="",m.description=f.description||"");try{let P=null;i?await wo(r,m):P=await vo(m,N.agentEmail||"anon"),S.playSuccess();let Q=c.querySelector(".bau-success-title");Q&&(i?Q.textContent=$("caseUpdatedSuccess"):Q.textContent=$(n==="DISCARD"?"caseDiscardSentSuccess":"caseSentSuccess")),F("success"),!i&&P&&P.emailSent===!1&&(S.playError(),X($("caseCreatedNoEmailConfirm"),{error:!0}))}catch(P){S.playError(),X($("errorPrefix")(P.message||$("unknownError")),{error:!0}),console.error("Payload que tentou enviar:",m)}finally{L.disabled=!1,L.innerHTML=`${Ae.send} ${$("submitToTl")}`}};function Y(){q.reset(),o=0,n="BAU",i=!1,r=null,B(),q.querySelectorAll(".bau-task-item.active").forEach(y=>y.classList.remove("active"));let s=q.querySelector('[name="language"]');s&&(s.readOnly=!1,s.style.background="",s.style.cursor="")}c.querySelector("#bau-new-case-btn").addEventListener("click",()=>{Y(),F("form"),te()}),c.querySelector("#bau-form-back-btn").addEventListener("click",()=>F("dashboard")),c.querySelector("#bau-success-back-btn").addEventListener("click",()=>F("dashboard"));async function ae(){e=!He(c),e&&(c.style.display="flex"),e?(ke(),F("dashboard"),z()):Te(),De(e,c,"cw-btn-bauform")}return B(),Se(()=>{let s=c.querySelector(".cw-help-title");s&&(s.textContent=$("headerTitle"));let y=c.querySelector(".cw-help-description");y&&(y.textContent=$("headerDesc"));let L=c.querySelector(".js-bau-new-case");L&&(L.textContent=$("newBauCase"));let b=c.querySelector(".js-bau-back-dashboard");b&&(b.textContent=$("backToDashboard"));let f=c.querySelector(".js-bau-configuring-edit");f&&(f.textContent=$("configuringEdit"));let N=c.querySelector(".js-bau-success-title");N&&(N.textContent=$("caseSentSuccess"));let m=c.querySelector(".js-bau-success-sub");m&&(m.textContent=$("caseSentSuccessSub"));let P=c.querySelector(".js-bau-success-back");P&&(P.textContent=$("backToDashboard")),T.textContent=$("back"),C.textContent=$("next"),F(t),t==="form"&&q.querySelectorAll(".bau-step").forEach(Q=>{let de=parseInt(Q.id.replace("bau-step-",""),10),x=xt.steps.find(O=>O.id===de);!x||x.isBranching||x.isConfirmation||Q.querySelectorAll(".bau-dynamic-input").forEach(O=>{let H=O.id.replace("wrapper-",""),ee=x.fields?.find(se=>se.id===H);if(!ee)return;let oe=O.querySelector(".bau-label");oe&&ee.label&&(oe.textContent=Xe(ee,"label"),ee.tooltip&&oe.setAttribute("data-tooltip",Xe(ee,"tooltip")));let ce=O.querySelector("input, textarea, select");if(ce&&ee.placeholder&&(ce.placeholder=Xe(ee,"placeholder")),ee.type==="select"){let se=ee.groups?ee.groups.flatMap(we=>we.options):ee.options||[];O.querySelectorAll("option").forEach((we,Ce)=>{let Ve=se[Ce];Ve&&(we.textContent=at(Ve.text))})}})}),t==="dashboard"&&z()}),ae}var Be={notes:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',library:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',timezone:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',configs:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>',broadcast:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',enter:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>',arrowDown:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',arrowUp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>',bolt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>'};function us(){if(document.getElementById("cw-palette-styles"))return;let e=document.createElement("style");e.id="cw-palette-styles",e.textContent=`
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
    `,document.head.appendChild(e)}var zi={pt:{ariaLabel:"Busca r\xE1pida",placeholder:"Buscar um m\xF3dulo...",empty:"Nada encontrado.",navigate:"navegar",select:"selecionar",close:"esc fechar",groupShortcuts:"Meus atalhos",groupModules:"M\xF3dulos"},es:{ariaLabel:"B\xFAsqueda r\xE1pida",placeholder:"Buscar un m\xF3dulo...",empty:"No se encontr\xF3 nada.",navigate:"navegar",select:"seleccionar",close:"esc cerrar",groupShortcuts:"Mis atajos",groupModules:"M\xF3dulos"}};function ot(e){let t=le();return zi[t]?.[e]??zi.pt[e]}function Ri(e){us();function t(A){return A.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function a(){return typeof e.toggleNotes!="function"||typeof e.toggleNotes.openWithPreset!="function"?[]:qe.list().map(A=>({id:`shortcut-${A.id}`,label:A.label,hint:{pt:"Atalho de nota \xB7 abre pr\xE9-preenchida",es:"Atajo de nota \xB7 abre precompletada"},keywords:`nota atalho atajo preset ${A.alias||""}`,icon:Be.bolt,group:"shortcuts",isPreset:!0,run:()=>{qe.registerUse(A.id),e.toggleNotes.openWithPreset(A)}}))}let o=[{id:"notes",label:"Case Notes",hint:{pt:"Montar a nota t\xE9cnica do caso",es:"Armar la nota t\xE9cnica del caso"},keywords:"notas nota caso anotacoes anotaciones",icon:Be.notes,run:e.toggleNotes},{id:"bauform",label:"BAU Form",hint:{pt:"Solicita\xE7\xE3o de cria\xE7\xE3o/descarte BAU",es:"Solicitud de creaci\xF3n/descarte BAU"},keywords:"bau formulario solicitacao solicitud criacao creacion descarte",icon:Be.bauform,run:e.toggleBAUForm},{id:"email",label:"Email Assistant",hint:{pt:"Templates inteligentes de e-mail",es:"Plantillas inteligentes de correo"},keywords:"email e-mail correio correo template plantilla",icon:Be.email,run:e.toggleEmail},{id:"script",label:"Call Script",hint:{pt:"Guia interativo de chamada",es:"Gu\xEDa interactiva de llamada"},keywords:"script roteiro guion chamada llamada ligacao",icon:Be.script,run:e.toggleScript},{id:"links",label:"Central de Links",hint:{pt:"Ferramentas, SOPs e atalhos",es:"Herramientas, SOPs y atajos"},keywords:"links atalhos atajos ferramentas herramientas sop sops",icon:Be.links,run:e.toggleLinks},{id:"library",label:"Minha Biblioteca",hint:{pt:"Snippets e respostas salvas",es:"Snippets y respuestas guardadas"},keywords:"biblioteca snippets respostas respuestas salvas guardadas",icon:Be.library,run:e.toggleLibrary},{id:"timezone",label:"Fusos Hor\xE1rios",hint:{pt:"Monitoramento e planejador de chamada",es:"Monitoreo y planificador de llamada"},keywords:"fuso horario timezone",icon:Be.timezone,run:e.toggleTimezone},{id:"broadcast",label:"Avisos",hint:{pt:"Comunicados e disponibilidade BAU",es:"Comunicados y disponibilidad BAU"},keywords:"avisos broadcast comunicados disponibilidade disponibilidad",icon:Be.broadcast,run:()=>e.broadcastControl&&e.broadcastControl.toggle()},{id:"configs",label:"Configura\xE7\xF5es",hint:{pt:"Perfil, som e prefer\xEAncias",es:"Perfil, sonido y preferencias"},keywords:"configuracoes configuracion config preferencias perfil som sonido",icon:Be.configs,run:e.toggleConfigs}].map(A=>({...A,group:"modules"}));function n(){return[...a(),...o].filter(A=>typeof A.run=="function").map(A=>({...A,_haystack:t(`${A.label} ${A.hint.pt} ${A.hint.es} ${A.keywords}`)}))}let i=!1,r=0,l=n(),c=l,g=document.createElement("div");g.className="cw-palette-overlay",g.setAttribute("role","dialog"),g.setAttribute("aria-modal","true"),g.setAttribute("aria-label",ot("ariaLabel"));let u=document.createElement("div");u.className="cw-palette",u.innerHTML=`
        <div class="cw-palette-search">
            <span class="cw-palette-search-icon">${Be.search}</span>
            <input type="text" class="cw-palette-input" placeholder="${ot("placeholder")}" autocomplete="off" spellcheck="false">
        </div>
        <div class="cw-palette-list"></div>
        <div class="cw-palette-footer">
            <span class="js-cp-navigate">${Be.arrowDown}${Be.arrowUp} ${ot("navigate")}</span>
            <span class="js-cp-select">${Be.enter} ${ot("select")}</span>
            <span class="js-cp-close">${ot("close")}</span>
        </div>
    `,g.appendChild(u),g.onmousedown=A=>{A.target===g&&E()};let v=u.querySelector(".cw-palette-input"),d=u.querySelector(".cw-palette-list");function p(){if(d.innerHTML="",c.length===0){d.innerHTML=`<div class="cw-palette-empty">${ot("empty")}</div>`;return}let A=[],D=null;c.forEach((q,R)=>{if(q.group!==D){D=q.group;let C=document.createElement("div");C.className="cw-palette-group",C.textContent=ot(q.group==="shortcuts"?"groupShortcuts":"groupModules"),C.setAttribute("aria-hidden","true"),d.appendChild(C)}let T=document.createElement("div");T.className="cw-palette-item"+(R===r?" selected":""),T.innerHTML=`
                <span class="cw-palette-item-icon${q.isPreset?" cw-palette-item-icon--preset":""}">${q.icon}</span>
                <span class="cw-palette-item-text">
                    <span class="cw-palette-item-label">${q.label}</span>
                    <span class="cw-palette-item-hint">${q.hint[le()]||q.hint.pt}</span>
                </span>
            `,T.onmouseenter=()=>{r=R,p()},T.onclick=()=>_(R),d.appendChild(T),A.push(T)});let h=A[r];h&&h.scrollIntoView({block:"nearest"})}function _(A){let D=c[A];D&&(S.playClick(),E(),D.run())}function w(){i||(i=!0,l=n(),c=l,r=0,v.value="",p(),ke(),document.body.appendChild(g),S.playGenieOpen(),requestAnimationFrame(()=>{g.classList.add("active"),v.focus()}))}function E(){i&&(i=!1,Te(),g.classList.remove("active"),setTimeout(()=>g.remove(),200))}function M(){i?E():w()}return v.addEventListener("input",()=>{let A=t(v.value.trim());c=A?l.filter(D=>D._haystack.includes(A)):l,r=0,p()}),v.addEventListener("keydown",A=>{A.key==="ArrowDown"?(A.preventDefault(),r=Math.min(r+1,c.length-1),p()):A.key==="ArrowUp"?(A.preventDefault(),r=Math.max(r-1,0),p()):A.key==="Enter"?(A.preventDefault(),_(r)):A.key==="Escape"&&(A.preventDefault(),E())}),document.addEventListener("keydown",A=>{(A.metaKey||A.ctrlKey)&&A.key.toLowerCase()==="k"&&(A.preventDefault(),M())}),Se(()=>{g.setAttribute("aria-label",ot("ariaLabel")),v.placeholder=ot("placeholder");let A=u.querySelector(".js-cp-navigate");A&&(A.innerHTML=`${Be.arrowDown}${Be.arrowUp} ${ot("navigate")}`);let D=u.querySelector(".js-cp-select");D&&(D.innerHTML=`${Be.enter} ${ot("select")}`);let h=u.querySelector(".js-cp-close");h&&(h.textContent=ot("close")),p()}),{open:w,close:E,toggle:M}}function ms(){if(window.techSolInitialized){za();return}window.techSolInitialized=!0;let e="v6.0.1";console.log(`\u{1F680} TechSol Suite Initializing (${e})...`);try{Mo();try{S.initGlobalListeners()}catch(d){console.warn("\xC1udio bloqueado:",d)}me.fetchTips();let t=za(),a=Rn(),o=Un(),n=Jn(),i=oi(),r=ki(),l=Li(),c=Ii(),g=Di(),u=ui(),v={toggleNotes:a,toggleEmail:o,toggleScript:n,toggleLinks:i,toggleTimezone:r,toggleLibrary:l,toggleConfigs:c,toggleBAUForm:g,broadcastControl:u};gn(v,t),Ri(v),setTimeout(()=>{me.logEvent("App","Start","Session Start");let d=Le();ct.sync(),(d?kt(d.split("@")[0]).then(_=>{_&&(Io(_),To(_))}).catch(_=>console.warn("N\xE3o foi poss\xEDvel resolver o idioma do perfil:",_)):Promise.resolve()).finally(()=>{vi(),setTimeout(()=>{wi(e)},500)})},2500)}catch(t){console.error("Erro fatal na inicializa\xE7\xE3o:",t),S.playError(),X("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}ms();})();
